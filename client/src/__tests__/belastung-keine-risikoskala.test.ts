import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  handlungsraeume,
  keineSicherheitsbewertung,
  wichtigeAbgrenzung,
} from "@/content/belastungHandlungsraeume";

/**
 * Drift-Schutz für die Ablösung der Krisenampel.
 *
 * Die Freigabeprüfung vom 20.09.2026 hält fest, dass die Bereiche auf
 * /unterstuetzen/krise ausschliesslich Belastung und verfügbare
 * Handlungsmöglichkeiten ordnen dürfen: keine Einteilung von Suizid- oder
 * Selbstverletzungsrisiko, keine Farb- oder Reihenfolgelogik, die als
 * Sicherheitsskala lesbar ist (NICE NG225).
 *
 * Dieser Test fängt ab, dass eine Risikostufung unbemerkt zurückkehrt.
 */

const repoRoot = join(__dirname, "..", "..", "..");

/**
 * Kommentare ausblenden: Dokumentation darf die abgelöste Krisenampel
 * weiterhin benennen und erklären — geprüft wird, was ausgeliefert wird.
 */
function ohneKommentare(quelle: string): string {
  return quelle.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

const krisenSeite = readFileSync(
  join(repoRoot, "client/src/pages/UnterstuetzenKrise.tsx"),
  "utf8"
);
const komponente = readFileSync(
  join(
    repoRoot,
    "client/src/components/visualizations/BelastungHandlungsraeume.tsx"
  ),
  "utf8"
);

// Signale, die die Freigabeprüfung als Risikoeinstufung verworfen hat.
const verworfeneSignale = [
  "Suizidgedanken oder -drohungen",
  "Totale Dissoziation",
  "Akute psychiatrische Dekompensation",
];

// Stufenlabels der früheren Ampel.
const ampelStufenLabels = [
  "Grün – Stabil",
  "Gelb – Angespannt",
  "Orange – Eskalierend",
  "Rot – Akute Krise",
];

describe("Belastung ordnen — keine Risikoskala", () => {
  it("die drei Handlungsräume beschreiben eigene Mittel, nicht Gefahr", () => {
    expect(handlungsraeume).toHaveLength(3);
    for (const raum of handlungsraeume) {
      expect(raum.label).toMatch(/eigene Mittel/i);
      expect(raum.hilfreich.length).toBeGreaterThan(0);
    }
  });

  it("kein Bereich stuft Suizidalität oder Selbstverletzung ein", () => {
    const inhalt = JSON.stringify(handlungsraeume);
    for (const begriff of ["Suizid", "Selbstverletzung", "Fremdgefährdung"]) {
      expect(inhalt).not.toContain(begriff);
    }
  });

  it("die Abgrenzung zur Sicherheitsbewertung ist Teil des Inhalts", () => {
    expect(keineSicherheitsbewertung.text).toMatch(
      /kann nicht beurteilen, ob eine Situation sicher ist/
    );
    expect(wichtigeAbgrenzung).toMatch(/weder über Behandlung/);
  });

  it("Krisenseite und Komponente führen keine Ampellogik mehr", () => {
    for (const datei of [krisenSeite, komponente]) {
      const quelle = ohneKommentare(datei);
      expect(quelle).not.toMatch(/ampel/i);
      for (const label of ampelStufenLabels) {
        expect(quelle).not.toContain(label);
      }
      for (const signal of verworfeneSignale) {
        expect(quelle).not.toContain(signal);
      }
    }
  });

  it("die Krisenseite bindet die Handlungsräume ein", () => {
    expect(krisenSeite).toContain("<BelastungHandlungsraeume />");
    expect(krisenSeite).toContain('id="belastung-handlungsraeume"');
  });
});
