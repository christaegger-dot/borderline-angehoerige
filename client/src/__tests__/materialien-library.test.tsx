import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "wouter";
import { describe, expect, it } from "vitest";
import MaterialienLibrarySection from "@/sections/MaterialienLibrarySection";

describe("MaterialienLibrarySection", () => {
  it("shows each material once and filters the full library by category", () => {
    render(
      <Router>
        <MaterialienLibrarySection />
      </Router>
    );

    expect(screen.getByText("Alle Materialien")).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", {
        name: "Notfallkarte Zürich – Psychische Krise",
      })
    ).toHaveLength(1);
    expect(screen.getByText("Genesung in Zahlen")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: /Der Leuchtturm.*herunterladen/i,
      })
    ).not.toBeInTheDocument();

    const notfallkarteDownloadLinks = screen.queryAllByRole("link", {
      name: /Notfallkarte Zürich – Psychische Krise herunterladen/i,
    });
    expect(notfallkarteDownloadLinks).toHaveLength(0);
    expect(
      screen.getAllByRole("link", {
        name: /Notfallkarte Zürich – Psychische Krise öffnen/i,
      })[0]
    ).toHaveAttribute("href", "/notfallkarte");
    expect(
      screen.getByText(
        /Diese Notfallkarte wird ausschliesslich als Webfassung angeboten\. Eine separate PDF- oder Bildfassung gibt es nicht/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Materialformat: Webfassung · keine separate PDF- oder Bildfassung"
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /Notfallkarte Zürich – Psychische Krise öffnen/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /Notfallkarte Zürich – Psychische Krise: Webfassung verfügbar; keine separate PDF- oder Bildfassung/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Webfassung")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", {
        name: /Textversion lesen: Notfallplan Krise – Suizidgedanken & Selbstverletzung/i,
      })[0]
    ).toHaveAttribute("href", "/materialien/text/notfallplan-krise");

    const textVersionLink = screen.getAllByRole("link", {
      name: /Textversion lesen: Der Leuchtturm – eigene Orientierung finden/i,
    })[0];
    expect(textVersionLink).toHaveAttribute(
      "href",
      "/materialien/text/leuchtturm"
    );
    expect(
      screen.getAllByRole("link", {
        name: /Textversion lesen: Ihre Rolle klären – Was Sie freiwillig anbieten können/i,
      })[0]
    ).toHaveAttribute("href", "/materialien/text/rolle-klaeren");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Der Eisberg – sichtbares Verhalten und mögliche Kontexte/i,
      })
    ).toHaveAttribute("href", "/materialien/text/eisberg");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Wenn Bewertungen unter Stress einseitiger werden/i,
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
      screen.getAllByRole("link", {
        name: /Textversion lesen: Warnsignale der Überlastung/i,
      })[0]
    ).toHaveAttribute("href", "/materialien/text/warnsignale");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Schuld, Verantwortung und was dazwischen liegt/i,
      })
    ).toHaveAttribute("href", "/materialien/text/schuld-verantwortung");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Radikale Akzeptanz – die Realität anerkennen und Handlungsspielraum finden/i,
      })
    ).toHaveAttribute("href", "/materialien/text/radikale-akzeptanz");
    expect(
      screen.queryByRole("button", {
        name: /Radikale Akzeptanz.*öffnen/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Beispiel-Dialog/i,
      })
    ).toHaveAttribute("href", "/materialien/text/beispiel-dialog");
    expect(
      screen.queryByRole("link", {
        name: /Radikale Akzeptanz.*herunterladen/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Wenn Worte treffen – belastende Aussagen einordnen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/wenn-worte-treffen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Die DEAR-Technik – Grenzen setzen ohne Vorwürfe/i,
      })
    ).toHaveAttribute("href", "/materialien/text/dear");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Genesung in Zahlen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/genesung-zahlen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Kinder verstehen und entlasten/i,
      })
    ).toHaveAttribute("href", "/materialien/text/kinder");
    expect(
      screen.queryByText(
        /Für bildbasierte PDFs ist die Textversion die empfohlene Lesefassung\./i
      )
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: /Genesung\s*·?\s*2/ }));

    expect(screen.getByText("Genesung in Zahlen")).toBeInTheDocument();
    expect(
      screen.getByText("Der Garten – Unterstützen, ohne Wachstum zu erzwingen")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Schuld, Verantwortung und was dazwischen liegt")
    ).not.toBeInTheDocument();
  });
});
