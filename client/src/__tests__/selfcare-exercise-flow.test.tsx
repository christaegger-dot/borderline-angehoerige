import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SelbstfuersorgeExercisesSection } from "@/sections/SelbstfuersorgeExercisesSection";
import { materials } from "@/content/materialien";
import { getHandoutOpenHref, resolveHandoutAsset } from "@/content/handouts";

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe("self-care guidance", () => {
  it("moves directly from inhaling to exhaling and permits stopping and restarting", () => {
    vi.useFakeTimers();
    render(<SelbstfuersorgeExercisesSection immediateDefaultOpen />);
    fireEvent.click(screen.getByRole("button", { name: "Übung starten" }));
    expect(screen.getByText("Einatmen...")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(4000));
    expect(screen.getByText("Langsam ausatmen...")).toBeInTheDocument();
    expect(screen.queryByText("Halten...")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Übung beenden" }));
    act(() => vi.advanceTimersByTime(10000));
    fireEvent.click(screen.getByRole("button", { name: "Übung starten" }));
    expect(screen.getByText("Einatmen...")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(10000));
    expect(
      screen.getByRole("button", { name: "Übung starten" })
    ).toBeInTheDocument();
  });

  it("makes topic recommendations discoverable without changing saved download links", () => {
    for (const id of [
      "stopp-technik",
      "energie-konto",
      "4-arten-von-grenzen",
      "grenzen-erkennen",
      "gespraeche-kippen",
      "pause-statt-streit",
    ]) {
      expect(materials.some(item => item.id === id)).toBe(true);
    }
    const source = "/infografiken/manus-stopp-technik-v3.pdf";
    expect(getHandoutOpenHref(source)).toBe(
      "/api/material-download/selbstfuersorge-stopp-technik?disposition=inline"
    );
    expect(
      resolveHandoutAsset("selbstfuersorge-stopp-technik")?.sourceUrl
    ).toBe(source);
  });
});
