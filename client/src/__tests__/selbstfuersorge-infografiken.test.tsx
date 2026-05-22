import { render, screen } from "@testing-library/react";
import { Router } from "wouter";
import { describe, expect, it } from "vitest";
import SelbstfuersorgeInfografikenSection from "@/sections/SelbstfuersorgeInfografikenSection";

describe("SelbstfuersorgeInfografikenSection", () => {
  it("shows curated text version links for Selbstfürsorge-Handouts", () => {
    render(
      <Router>
        <SelbstfuersorgeInfografikenSection />
      </Router>
    );

    // Section ist nach Phase-2-Migration kein collapsible ContentSection mehr —
    // Content ist immer sichtbar. Kein vorheriges fireEvent.click nötig.

    expect(
      screen.getByRole("heading", {
        name: /Drei Materialien, die Selbstfürsorge greifbar machen/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Die Sauerstoffmaske/i,
      })
    ).toHaveAttribute("href", "/materialien/text/sauerstoffmaske");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Die STOPP-Technik/i,
      })
    ).toHaveAttribute("href", "/materialien/text/stopp-technik");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Ihr Energie-Konto/i,
      })
    ).toHaveAttribute("href", "/materialien/text/energie-konto");
    expect(
      screen.getByRole("link", {
        name: /PDF öffnen: Die Sauerstoffmaske \(neuer Tab\)/i,
      })
    ).toHaveAttribute(
      "href",
      "/api/material-download/selbstfuersorge-sauerstoffmaske?disposition=inline"
    );
  });
});
