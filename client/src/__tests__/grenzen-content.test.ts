import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

describe("Grenzen content", () => {
  it("uses the corrected violence-help contacts and removes the wrong victim-help number", () => {
    const pageSource = fs.readFileSync(
      path.join(repoRoot, "client/src/pages/Grenzen.tsx"),
      "utf8"
    );

    expect(pageSource).toContain('kontaktByIdStrict("INFO_OPFERHILFE_142")');
    expect(pageSource).toContain(
      'kontaktByIdStrict("INFO_OPFERHILFE_ZH_24_7")'
    );
    expect(pageSource).toContain('kontaktByIdStrict("INFO_FORENSIC_NURSES")');
    expect(pageSource).toContain('kontaktByIdStrict("INFO_OPFERBERATUNG_ZH")');
    expect(pageSource).not.toContain("0800 040 080");
  });
});
