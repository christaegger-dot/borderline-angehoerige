import { afterEach, describe, expect, it, vi } from "vitest";
import { focusMainContent, isSearchShortcut } from "@/components/Layout";

describe("Layout keyboard helpers", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    window.history.replaceState(null, "", "/");
  });

  it("recognizes Cmd+K as a search shortcut", () => {
    expect(
      isSearchShortcut({
        metaKey: true,
        ctrlKey: false,
        key: "k",
      } as KeyboardEvent)
    ).toBe(true);
  });

  it("recognizes Ctrl+K as a search shortcut", () => {
    expect(
      isSearchShortcut({
        metaKey: false,
        ctrlKey: true,
        key: "k",
      } as KeyboardEvent)
    ).toBe(true);
  });

  it("accepts uppercase K", () => {
    expect(
      isSearchShortcut({
        metaKey: true,
        ctrlKey: false,
        key: "K",
      } as KeyboardEvent)
    ).toBe(true);
  });

  it("ignores unrelated shortcuts", () => {
    expect(
      isSearchShortcut({
        metaKey: true,
        ctrlKey: false,
        key: "p",
      } as KeyboardEvent)
    ).toBe(false);
    expect(
      isSearchShortcut({
        metaKey: false,
        ctrlKey: false,
        key: "k",
      } as KeyboardEvent)
    ).toBe(false);
  });

  it("focuses and scrolls the main content for the skip link", () => {
    document.body.innerHTML = '<main id="main-content" tabindex="-1"></main>';
    const main = document.getElementById("main-content") as HTMLElement;
    main.scrollIntoView = vi.fn();

    expect(focusMainContent()).toBe(true);
    expect(main).toHaveFocus();
    expect(window.location.hash).toBe("#main-content");
    expect(main.scrollIntoView).toHaveBeenCalledWith({ block: "start" });
  });
});
