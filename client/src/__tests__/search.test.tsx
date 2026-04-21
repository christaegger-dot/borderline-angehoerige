import { act, fireEvent, render, screen } from "@testing-library/react";
import { Router } from "wouter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Search, { getSearchTerms } from "@/components/Search";

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
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("clears the active descendant when the query is no longer searchable", () => {
    render(
      <Router>
        <Search isOpen onClose={() => {}} />
      </Router>
    );

    const input = screen.getByRole("combobox", {
      name: /website durchsuchen/i,
    });

    fireEvent.change(input, { target: { value: "Validierung" } });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    fireEvent.keyDown(input, { key: "ArrowDown" });

    expect(input).toHaveAttribute("aria-activedescendant", "search-result-0");

    fireEvent.change(input, { target: { value: " a" } });

    expect(input).not.toHaveAttribute("aria-activedescendant");
    expect(
      screen.getByText(/mindestens einen suchbegriff mit 2 zeichen/i)
    ).toBeInTheDocument();
  });
});
