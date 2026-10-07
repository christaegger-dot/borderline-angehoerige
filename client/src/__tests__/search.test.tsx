import { act, fireEvent, render, screen } from "@testing-library/react";
import { Router } from "wouter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Search, { getSearchTerms } from "@/components/Search";
import { searchableContent } from "@/content/searchIndex";

const { loadNormalizedSearchIndex } = vi.hoisted(() => ({
  loadNormalizedSearchIndex: vi.fn(),
}));

vi.mock("@/content/searchIndexLoader", () => ({
  loadNormalizedSearchIndex,
  resetSearchIndexCacheForTests: vi.fn(),
}));

const normalizedSearchEntries = searchableContent.map(item => ({
  item,
  normalizedTitle: item.title.toLowerCase(),
  searchText: [item.title, item.description, ...item.keywords, item.section]
    .join(" ")
    .toLowerCase(),
}));

describe("Search helpers", () => {
  it("ignores whitespace-only and one-letter search tokens", () => {
    expect(getSearchTerms("  ")).toEqual([]);
    expect(getSearchTerms(" a")).toEqual([]);
    expect(getSearchTerms("a ")).toEqual([]);
    expect(getSearchTerms(" a ")).toEqual([]);
    expect(getSearchTerms("db t")).toEqual(["db"]);
  });
});

describe("Search", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollTo", {
      value: vi.fn(),
      writable: true,
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      value: vi.fn(),
      writable: true,
    });
    vi.useFakeTimers();
    loadNormalizedSearchIndex.mockReset();
    loadNormalizedSearchIndex.mockResolvedValue(normalizedSearchEntries);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("clears the active descendant when the query is no longer searchable", async () => {
    render(
      <Router>
        <Search isOpen onClose={() => {}} />
      </Router>
    );

    const input = screen.getByRole("combobox", {
      name: /website durchsuchen/i,
    });

    await act(async () => {
      await Promise.resolve();
    });

    fireEvent.change(input, { target: { value: "Validierung" } });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getAllByRole("option").length).toBeGreaterThan(0);

    fireEvent.keyDown(input, { key: "ArrowDown" });

    expect(input).toHaveAttribute("aria-activedescendant", "search-result-0");

    fireEvent.change(input, { target: { value: " a" } });

    expect(input).not.toHaveAttribute("aria-activedescendant");
    expect(
      screen.getByText(/mindestens einen suchbegriff mit 2 zeichen/i)
    ).toBeInTheDocument();
  });

  it("shows a loading state while the search index is still loading", async () => {
    loadNormalizedSearchIndex.mockReturnValueOnce(
      new Promise(() => {
        /* keep pending to assert the loading UI */
      })
    );

    await act(async () => {
      render(
        <Router>
          <Search isOpen onClose={() => {}} />
        </Router>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "Krise" },
      });
    });

    expect(screen.getByText(/suchindex wird geladen/i)).toBeInTheDocument();
  });

  it("does not open a stale selected result after the query changes", async () => {
    const onClose = vi.fn();
    render(
      <Router>
        <Search isOpen onClose={onClose} />
      </Router>
    );
    await act(async () => {
      await Promise.resolve();
    });
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Validierung" } });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-activedescendant", "search-result-0");

    fireEvent.change(input, { target: { value: "Krise" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onClose).not.toHaveBeenCalled();
    expect(input).not.toHaveAttribute("aria-activedescendant");
    expect(screen.queryAllByRole("option")).toHaveLength(0);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.getAllByRole("option").length).toBeGreaterThan(0);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
