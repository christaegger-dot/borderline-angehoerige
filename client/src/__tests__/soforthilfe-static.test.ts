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
});
