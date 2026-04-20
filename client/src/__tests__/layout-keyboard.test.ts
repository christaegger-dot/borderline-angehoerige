import { describe, expect, it } from "vitest";
import { isSearchShortcut } from "@/components/Layout";

describe("Layout keyboard helpers", () => {
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
});
