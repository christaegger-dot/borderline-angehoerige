import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "wouter";
import { describe, expect, it } from "vitest";
import SelbstfuersorgeInfografikenSection from "@/sections/SelbstfuersorgeInfografikenSection";

describe("SelbstfuersorgeInfografikenSection", () => {
  it("shows the new text version link for Radikale Akzeptanz", () => {
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
        name: /PDF öffnen: Radikale Akzeptanz \(neuer Tab\)/i,
      })
    ).toHaveAttribute(
      "href",
      "/api/material-download/radikale-akzeptanz?disposition=inline"
    );
  });
});
