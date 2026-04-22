import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "wouter";
import { describe, expect, it } from "vitest";
import SelbstfuersorgeInfografikenSection from "@/sections/SelbstfuersorgeInfografikenSection";

describe("SelbstfuersorgeInfografikenSection", () => {
  it("shows text version links for Selbstfürsorge-Handouts", () => {
    render(
      <Router>
        <SelbstfuersorgeInfografikenSection />
      </Router>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Abschnitt Materialien zum Download aufklappen/i,
      })
    );

    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Radikale Akzeptanz/i,
      })
    ).toHaveAttribute("href", "/materialien/text/radikale-akzeptanz");
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
        name: /Textversion lesen: Erlaubnis-Karte/i,
      })
    ).toHaveAttribute("href", "/materialien/text/erlaubnis-karte");
    expect(
      screen.getByRole("link", {
        name: /PDF öffnen: Radikale Akzeptanz \(neuer Tab\)/i,
      })
    ).toHaveAttribute(
      "href",
      "/api/material-download/radikale-akzeptanz?disposition=inline"
    );
  });
});
