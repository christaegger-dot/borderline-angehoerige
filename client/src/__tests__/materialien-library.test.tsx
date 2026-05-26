import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "wouter";
import { describe, expect, it } from "vitest";
import MaterialienLibrarySection from "@/sections/MaterialienLibrarySection";

describe("MaterialienLibrarySection", () => {
  it("shows starter materials and filters the full library by category", () => {
    render(
      <Router>
        <MaterialienLibrarySection />
      </Router>
    );

    expect(screen.getByText("Empfohlen für den Anfang")).toBeInTheDocument();
    expect(
      screen.getAllByText("Notfallkarte Zürich – Psychische Krise")
    ).toHaveLength(2);
    expect(
      screen.getByText("Genesung in Zahlen – Was die Forschung zeigt")
    ).toBeInTheDocument();
    const localizedDownloadLink = screen.getAllByRole("link", {
      name: /Der Leuchtturm – Orientierung für Angehörige herunterladen/i,
    })[0];
    expect(localizedDownloadLink).toHaveAttribute(
      "href",
      "/api/material-download/leuchtturm"
    );
    expect(localizedDownloadLink).toHaveAttribute("download", "");

    const notfallkarteDownloadLinks = screen.getAllByRole("link", {
      name: /Notfallkarte Zürich – Psychische Krise herunterladen/i,
    });
    expect(notfallkarteDownloadLinks).toHaveLength(2);
    expect(notfallkarteDownloadLinks[0]).toHaveAttribute(
      "href",
      "/api/material-download/notfallkarte-zuerich"
    );
    expect(notfallkarteDownloadLinks[0]).toHaveAttribute("download", "");
    expect(
      screen.getAllByRole("link", {
        name: /Notfallkarte Zürich – Psychische Krise öffnen/i,
      })[0]
    ).toHaveAttribute("href", "/notfallkarte");
    expect(
      screen.getAllByRole("link", {
        name: /Textversion lesen: Notfallplan Krise – Suizidgedanken & Selbstverletzung/i,
      })[0]
    ).toHaveAttribute("href", "/materialien/text/notfallplan-krise");

    const textVersionLink = screen.getAllByRole("link", {
      name: /Textversion lesen: Der Leuchtturm – Orientierung für Angehörige/i,
    })[0];
    expect(textVersionLink).toHaveAttribute(
      "href",
      "/materialien/text/leuchtturm"
    );
    expect(
      screen.getAllByRole("link", {
        name: /Textversion lesen: Ihre Rolle klären – Was Sie sein können/i,
      })[0]
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
        name: /Textversion lesen: Radikale Akzeptanz – Aufhören zu kämpfen, anfangen zu handeln/i,
      })
    ).toHaveAttribute("href", "/materialien/text/radikale-akzeptanz");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Wenn Worte treffen – 5 häufige Schuldzuweisungen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/wenn-worte-treffen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Die DEAR-Technik – Grenzen setzen ohne Vorwürfe/i,
      })
    ).toHaveAttribute("href", "/materialien/text/dear");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Genesung in Zahlen – Was die Forschung zeigt/i,
      })
    ).toHaveAttribute("href", "/materialien/text/genesung-zahlen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Wenn Mama oder Papa grosse Gefühle hat/i,
      })
    ).toHaveAttribute("href", "/materialien/text/kinder");
    expect(
      screen.queryByText(
        /Für bildbasierte PDFs ist die Textversion die empfohlene Lesefassung\./i
      )
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: /Genesung\s*·?\s*2/ }));

    expect(
      screen.getByText("Genesung in Zahlen – Was die Forschung zeigt")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Der Garten – Unterstützen, ohne Wachstum zu erzwingen")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Schuld, Verantwortung und was dazwischen liegt")
    ).not.toBeInTheDocument();
  });
});
