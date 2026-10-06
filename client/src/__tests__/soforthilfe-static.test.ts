import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { kontaktByIdStrict, kontaktNachweisByIdStrict } from "@/data/kontakte";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

function readSoforthilfeDirectPage() {
  return fs.readFileSync(
    path.join(repoRoot, "client/public/soforthilfe/index.html"),
    "utf8"
  );
}

const REQUIRED_CONTACT_IDS = [
  "ROT_144",
  "ROT_117",
  "ROT_112",
  "ROT_145",
  "GRUEN_143",
  "GRUEN_147",
  "GRUEN_ELTERN",
  "GELB_PUK_ERW",
  "GELB_PUK_KJP",
  "GELB_PUK_65",
  "INFO_KIZ",
  "INFO_OPFERHILFE_142",
  "INFO_OPFERHILFE_ZH_24_7",
  "INFO_FORENSIC_NURSES",
  "INFO_OPFERBERATUNG_ZH",
] as const;

describe("static soforthilfe page", () => {
  it("keeps all critical phone numbers aligned with the canonical contact register", () => {
    const html = readSoforthilfeDirectPage();

    for (const contactId of REQUIRED_CONTACT_IDS) {
      expect(html).toContain(kontaktByIdStrict(contactId).nummer);
    }
  });

  it("uses the directly published PUK-KIZ number and extension while preserving the source conflict", () => {
    const page = new DOMParser().parseFromString(
      readSoforthilfeDirectPage(),
      "text/html"
    );
    const kizCard = [...page.querySelectorAll("li")].find(item =>
      item.textContent?.includes("Krisenintervention Zürich (KIZ)")
    );
    const kiz = kontaktByIdStrict("INFO_KIZ");
    const nachweis = kontaktNachweisByIdStrict(kiz.id);
    expect(kizCard).toBeDefined();
    expect(kizCard?.textContent?.replace(/\s+/g, " ")).toContain(
      "Durchwahlnummer 4 wählen"
    );
    expect(
      kizCard?.querySelector('a[href^="tel:"]')?.getAttribute("href")
    ).toBe(`tel:${kiz.tel}`);
    expect(
      kizCard?.querySelector('a[href^="https:"]')?.getAttribute("href")
    ).toBe(nachweis.primarySourceUrl);
    expect(kizCard?.textContent).toContain(
      "abweichende Kantonsangabe bleibt ungeklärt"
    );
    expect(page.querySelector('a[href="tel:+41442967310"]')).toBeNull();
    const sources = page.querySelector('[aria-labelledby="kontaktpruefung"]');
    const sourceText = sources?.textContent?.replace(/\s+/g, " ");
    expect(sourceText).toContain("weiterhin 044 296 73 10");
    expect(sourceText).toContain("Weiterleitung sind nicht geklärt");
    expect(sourceText).toContain("nicht als gleichwertige Kontaktwege");
  });

  it("documents the official general emergency numbers with a limited verification scope", () => {
    const page = new DOMParser().parseFromString(
      readSoforthilfeDirectPage(),
      "text/html"
    );
    const sources = page.querySelector('[aria-labelledby="kontaktpruefung"]');
    const sourceText = sources?.textContent?.replace(/\s+/g, " ");

    expect(
      sources?.querySelector(
        'a[href="https://www.ch.ch/de/sicherheit-und-recht/gefahren-und-notfalle/"]'
      )
    ).not.toBeNull();
    expect(sourceText).toContain(
      "Veröffentlichte Nummern 144, 117 und 112 am 06.10.2026"
    );
    expect(sourceText).toContain(
      "nur die veröffentlichten Nummern, keine aktuelle Erreichbarkeit"
    );
    expect(sourceText).toContain("fachliche Publikationsfreigabe");
  });

  it("limits the crisis examples without linking them to character or diagnosis", () => {
    const html = readSoforthilfeDirectPage();

    expect(html).toContain(
      "Krisensituationen treten nicht bei allen Menschen mit Borderline"
    );
    expect(html).toContain("sind nicht diagnosespezifisch");
    expect(html).toContain("Charakter oder Wert einer Person");
  });

  it("routes self-harm by immediate danger and medical urgency instead of the label alone", () => {
    const rescue = kontaktByIdStrict("ROT_144");

    expect(rescue.hinweis).toContain("unmittelbarer Lebensgefahr");
    expect(rescue.hinweis).toContain("schwerer Verletzung");
    expect(rescue.hinweis).toContain("sofort medizinische Hilfe nötig");
    expect(rescue.hinweis).not.toMatch(/Lebensgefahr, Selbstverletzung/i);
  });

  it("links to the current crisis-plan text instead of the withdrawn PDF", () => {
    const html = readSoforthilfeDirectPage();

    expect(html).toContain('href="/materialien/text/notfallplan-krise"');
    expect(html).toContain("Notfallplan im Browser");
    expect(html).not.toContain('href="/notfallplan-krise-v04.pdf"');
  });

  it("does not link to the retired notfallkarte or promise new static assets", () => {
    const html = readSoforthilfeDirectPage();

    expect(html).not.toContain('href="/notfallkarte"');
    expect(html).not.toContain(
      'href="/Notfallkarte-Zuerich-Psychische-Krise.pdf"'
    );
    expect(html).not.toContain("/notfallkarte-preview.webp");
    expect(html).not.toContain("neu bereitgestellt");
    expect(html).not.toContain("in Überarbeitung");
  });
});
