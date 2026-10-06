import { describe, expect, it } from "vitest";
import { handoutTextVersions as soforthilfe } from "@/content/handoutTextVersionContent/soforthilfe.content";
import { handoutTextVersions as kommunizieren } from "@/content/handoutTextVersionContent/kommunizieren.content";

/**
 * Handout-Textversionen dürfen operative Kontaktdaten nicht zusätzlich zur
 * zentralen Soforthilfe-Seite veröffentlichen.
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

const notfallplanText = collectStrings(soforthilfe).join("\n");
const kommunizierenText = collectStrings(kommunizieren).join("\n");
const operationalContactPattern =
  /\b(?:112|117|143|144|145)\b|058\s*384|0800\s*33\s*66\s*55|0848\s*800\s*858/i;

describe("Operative Kontakte bleiben der Soforthilfe-Seite vorbehalten", () => {
  it("keeps crisis handout text free of copied contact numbers", () => {
    expect(notfallplanText).not.toMatch(operationalContactPattern);
    expect(kommunizierenText).not.toMatch(operationalContactPattern);
    expect(notfallplanText).toContain("zentrale Soforthilfe-Seite");
    expect(kommunizierenText).toContain("Akute Hilfe und Notfallkontakte");
  });
});
