import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "wouter";
import { describe, expect, it } from "vitest";
import MaterialienLibrarySection from "@/sections/MaterialienLibrarySection";

describe("MaterialienLibrarySection", () => {
  it("shows core materials and filters secondary materials by category", () => {
    render(
      <Router>
        <MaterialienLibrarySection />
      </Router>
    );

    expect(screen.getByText("Empfohlene Kernmaterialien")).toBeInTheDocument();
    expect(
      screen.getByText("Notfallkarte Zürich – Psychische Krise")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Genesung in Zahlen – Was die Forschung zeigt")
    ).toBeInTheDocument();
    const remoteDownloadLink = screen.getByRole("link", {
      name: /Der Leuchtturm – Ihre Rolle als Angehörige\/r herunterladen/i,
    });
    expect(remoteDownloadLink).toHaveAttribute(
      "href",
      "/api/material-download/leuchtturm"
    );
    expect(remoteDownloadLink).toHaveAttribute("download", "");

    const localDownloadLink = screen.getByRole("link", {
      name: /Notfallkarte Zürich – Psychische Krise herunterladen/i,
    });
    expect(localDownloadLink).toHaveAttribute(
      "href",
      "/Notfallkarte-Zuerich-Psychische-Krise.pdf"
    );
    expect(localDownloadLink).toHaveAttribute("download", "");

    const textVersionLink = screen.getByRole("link", {
      name: /Textversion lesen: Der Leuchtturm – Ihre Rolle als Angehörige\/r/i,
    });
    expect(textVersionLink).toHaveAttribute(
      "href",
      "/materialien/text/leuchtturm"
    );
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Ihre Rolle klären – Was Sie sein können/i,
      })
    ).toHaveAttribute("href", "/materialien/text/rolle-klaeren");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Der Eisberg – Wut ist oft die Spitze/i,
      })
    ).toHaveAttribute("href", "/materialien/text/eisberg");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Spaltung – das Pendel zwischen Extremen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/spaltung");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Alarm-Modus vs\. Denk-Modus/i,
      })
    ).toHaveAttribute("href", "/materialien/text/alarm-modus");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Spickzettel Grenzen – Die wichtigsten Sätze/i,
      })
    ).toHaveAttribute("href", "/materialien/text/grenzen-spickzettel");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Warnsignale der Überlastung/i,
      })
    ).toHaveAttribute("href", "/materialien/text/warnsignale");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Schuld, Verantwortung und was dazwischen liegt/i,
      })
    ).toHaveAttribute("href", "/materialien/text/schuld-verantwortung");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Radikale Akzeptanz – Aufhören zu kämpfen, anfangen zu handeln/i,
      })
    ).toHaveAttribute("href", "/materialien/text/radikale-akzeptanz");

    fireEvent.click(screen.getByRole("button", { name: /Genesung\s*\(1\)/ }));

    expect(
      screen.getByText("Genesung in Zahlen – Was die Forschung zeigt")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Schuld, Verantwortung und was dazwischen liegt")
    ).not.toBeInTheDocument();
  });
});
