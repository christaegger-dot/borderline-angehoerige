import { describe, expect, it } from "vitest";
import { AKUT_KONTAKT_IDS, kontaktByIdStrict } from "@/data/kontakte";
import { handoutTextVersions as soforthilfe } from "@/content/handoutTextVersionContent/soforthilfe.content";
import { handoutTextVersions as kommunizieren } from "@/content/handoutTextVersionContent/kommunizieren.content";

/**
 * Drift-Schutz: Die Krisennummern in den Handout-Textversionen müssen aus
 * kontakte.ts stammen. Dieser Test fängt künftige Hartkodierung ab — wird eine
 * Nummer in kontakte.ts geändert, müssen die Handouts automatisch mitziehen.
 */

// Alle Strings einer Textversion rekursiv einsammeln.
function collectStrings(node: unknown, out: string[] = []): string[] {
  if (typeof node === "string") {
    out.push(node);
  } else if (Array.isArray(node)) {
    for (const item of node) collectStrings(item, out);
  } else if (node && typeof node === "object") {
    for (const value of Object.values(node)) collectStrings(value, out);
  }
  return out;
}

const soforthilfeText = collectStrings(soforthilfe).join("\n");
const kommunizierenText = collectStrings(kommunizieren).join("\n");

describe("Krisennummern — Single Source (kontakte.ts)", () => {
  it("soforthilfe-Handout zeigt alle Akutblock-Nummern aus kontakte.ts", () => {
    for (const id of AKUT_KONTAKT_IDS) {
      expect(soforthilfeText).toContain(kontaktByIdStrict(id).nummer);
    }
  });

  it("soforthilfe rendert beide Notfalllisten identisch aus dem Akutblock", () => {
    const lists = (soforthilfe[0].sections ?? []).filter(s =>
      /Wichtige Nummern im Akutfall|Notfallnummern – Kurzreferenz/.test(s.title)
    );
    expect(lists).toHaveLength(2);

    const akutNummern = AKUT_KONTAKT_IDS.map(
      id => kontaktByIdStrict(id).nummer
    );

    for (const list of lists) {
      const titles = (list.cards ?? []).map(c => c.title);
      // Die ersten N Karten beider Listen entsprechen — in identischer
      // Reihenfolge — exakt dem Akutblock (die «Kurzreferenz» hängt danach
      // bewusst die Fachstelle als Ergänzung an).
      const akutTitles = titles.slice(0, akutNummern.length);
      akutNummern.forEach((nummer, i) => {
        expect(akutTitles[i]).toContain(nummer);
      });
    }
  });

  it("kommunizieren-Handout bezieht Krisennummern aus kontakte.ts", () => {
    const ids = [
      "ROT_144",
      "ROT_117",
      "GELB_PUK_ERW",
      "GELB_PUK_KJP",
      "GELB_PUK_65",
      "GRUEN_143",
      "INFO_PROMENTE",
    ];
    for (const id of ids) {
      expect(kommunizierenText).toContain(kontaktByIdStrict(id).nummer);
    }
  });
});
