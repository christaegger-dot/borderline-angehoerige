import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { kontaktByIdStrict } from "@/data/kontakte";

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

  it("labels 147 clearly as a children and youth service", () => {
    const html = readSoforthilfeDirectPage();

    expect(html).toMatch(
      /<a href="tel:147">147<\/a>\s*Pro Juventute – Beratung für Kinder\s+und Jugendliche,\s*24\/7/
    );
  });

  it("limits the crisis examples without linking them to character or diagnosis", () => {
    const html = readSoforthilfeDirectPage();

    expect(html).toContain(
      "Krisensituationen treten nicht bei allen Menschen mit Borderline"
    );
    expect(html).toContain("sind nicht diagnosespezifisch");
    expect(html).toContain("Charakter oder Wert einer Person");
  });

  it("distinguishes listening services from emergency response", () => {
    const html = readSoforthilfeDirectPage();

    expect(html).toContain("Entlastung und Gespräch");
    expect(html).toMatch(/<a href="tel:143">143<\/a>/);
    expect(html).toContain("ersetzen aber keinen");
    expect(html).toContain("Notruf");
    expect(html).toContain("je nach Dienst weitere");
    expect(html).not.toMatch(/kommt niemand vorbei|keine Konsequenzen/i);
  });

  it("does not promise that 112 always connects or works without a SIM card", () => {
    const html = readSoforthilfeDirectPage();
    const contact = kontaktByIdStrict("ROT_112");

    expect(contact.hinweis).toContain("ohne SIM-Karte ist nicht gewährleistet");
    expect(contact.hinweis).not.toMatch(/funktioniert immer|auch ohne SIM/i);
    expect(html).not.toMatch(/funktioniert immer|auch ohne SIM/i);
  });

  it("routes self-harm by immediate danger and medical urgency instead of the label alone", () => {
    const rescue = kontaktByIdStrict("ROT_144");

    expect(rescue.hinweis).toContain("unmittelbarer Lebensgefahr");
    expect(rescue.hinweis).toContain("schwerer Verletzung");
    expect(rescue.hinweis).toContain("sofort medizinische Hilfe nötig");
    expect(rescue.hinweis).not.toMatch(/Lebensgefahr, Selbstverletzung/i);
  });

  it("separates medical emergencies from police protection", () => {
    const html = readSoforthilfeDirectPage();
    const medicalBlock = html.match(
      /<h3>Medizinische Lebensgefahr<\/h3>([\s\S]*?)<\/article>/
    )?.[1];
    const policeBlock = html.match(
      /<h3>Gewalt oder unmittelbare Bedrohung<\/h3>([\s\S]*?)<\/article>/
    )?.[1];

    expect(medicalBlock).toContain('href="tel:144"');
    expect(medicalBlock).toContain('href="tel:112"');
    expect(medicalBlock).not.toContain('href="tel:117"');
    expect(policeBlock).toContain('href="tel:117"');
    expect(policeBlock).not.toContain('href="tel:144"');
  });

  it("links to the current crisis-plan text instead of the withdrawn PDF", () => {
    const html = readSoforthilfeDirectPage();

    expect(html).toContain('href="/materialien/text/notfallplan-krise"');
    expect(html).toContain("Notfallplan im Browser");
    expect(html).not.toContain('href="/notfallplan-krise-v04.pdf"');
  });

  it("links only to the notfallkarte web page and does not promise new static assets", () => {
    const html = readSoforthilfeDirectPage();

    expect(html).toContain('href="/notfallkarte"');
    expect(html).not.toContain(
      'href="/Notfallkarte-Zuerich-Psychische-Krise.pdf"'
    );
    expect(html).not.toContain("/notfallkarte-preview.webp");
    expect(html).toContain("ausschliesslich als Webfassung angeboten");
    expect(html).not.toContain("neu bereitgestellt");
    expect(html).not.toContain("in Überarbeitung");
  });
});
