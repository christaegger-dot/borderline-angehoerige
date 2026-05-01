import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { INFO } from "@/data/kontakte";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

const KIZ = INFO.find(kontakt => kontakt.id === "INFO_KIZ");
const FACHSTELLE = INFO.find(kontakt => kontakt.id === "INFO_FACHSTELLE");
const AERZTEFON = INFO.find(kontakt => kontakt.id === "INFO_AERZTEFON");

describe("notfallkarte architecture", () => {
  it("keeps the personal tool off the static /notfallkarte URL", () => {
    const routesIndex = fs.readFileSync(
      path.join(repoRoot, "client/src/app/routes.ts"),
      "utf8"
    );

    expect(routesIndex).not.toContain('path: "/notfallkarte", component');
    expect(routesIndex).toContain("PERSONAL_NOTFALLKARTE_PATH");
  });

  it("uses localStorage for the print handoff that must survive window.open", () => {
    const pageSource = fs.readFileSync(
      path.join(repoRoot, "client/src/pages/Notfallkarte.tsx"),
      "utf8"
    );
    const printTemplate = fs.readFileSync(
      path.join(repoRoot, "client/public/notfallkarte-print.html"),
      "utf8"
    );

    expect(pageSource).toMatch(
      /localStorage\.setItem\(\s*NOTFALLKARTE_PRINT_STORAGE_KEY,\s*JSON\.stringify\(data\)\s*\)/
    );
    expect(printTemplate).toContain(
      'localStorage.getItem("notfallkarte-print-data")'
    );
    expect(printTemplate).toContain(
      'localStorage.removeItem("notfallkarte-print-data")'
    );
    expect(printTemplate).not.toContain(
      'sessionStorage.getItem("notfallkarte-print-data")'
    );
  });

  it("keeps static crisis pages aligned with the canonical contact register", () => {
    const browserCard = fs.readFileSync(
      path.join(repoRoot, "client/public/notfallkarte.html"),
      "utf8"
    );
    const soforthilfePrint = fs.readFileSync(
      path.join(repoRoot, "client/public/soforthilfe-print.html"),
      "utf8"
    );

    expect(AERZTEFON).toBeDefined();
    expect(KIZ).toBeDefined();
    expect(FACHSTELLE).toBeDefined();

    expect(browserCard).toContain(AERZTEFON!.nummer);
    expect(browserCard).not.toContain("044 360 44 44");

    expect(soforthilfePrint).toContain(KIZ!.nummer);
    expect(soforthilfePrint).toContain(FACHSTELLE!.nummer);
    expect(soforthilfePrint).not.toContain("044 296 73 00");
    expect(soforthilfePrint).not.toContain("058 384 27 00");
  });

  it("keeps the static browser card responsive without scaled mobile hitboxes", () => {
    const browserCardStyles = fs.readFileSync(
      path.join(repoRoot, "client/public/notfallkarte.css"),
      "utf8"
    );
    const browserCardScript = fs.readFileSync(
      path.join(repoRoot, "client/public/notfallkarte.js"),
      "utf8"
    );

    expect(browserCardStyles).toContain("@media (max-width: 860px)");
    expect(browserCardStyles).toContain("transform: none !important;");
    expect(browserCardStyles).toContain("grid-template-columns: 1fr;");
    expect(browserCardScript).toContain("RESPONSIVE_BREAKPOINT = 860");
    expect(browserCardScript).toContain('pageWrapper.style.transform = "";');
  });
});
