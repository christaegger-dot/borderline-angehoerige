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
    expect(html).toContain("schicken aber keinen");
    expect(html).toContain("Einsatzdienst");
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
});
