import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import VerstehenBeziehungen from "@/pages/VerstehenBeziehungen";

describe("Bedeutungsschleife: zugängliches Tabmuster", () => {
  it("wechselt mit Pfeiltasten, Home und End zwischen den Stationen", () => {
    render(<VerstehenBeziehungen />);
    const tabs = screen.getAllByRole("tab");

    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("tabindex", "-1");

    fireEvent.keyDown(tabs[1], { key: "End" });
    expect(tabs.at(-1)).toHaveFocus();

    fireEvent.keyDown(tabs.at(-1)!, { key: "Home" });
    expect(tabs[0]).toHaveFocus();
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      tabs[0].id
    );
  });
});
