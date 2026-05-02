import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { INFO } from "@/data/kontakte";
import { pageGovernance } from "@/data/pageGovernance";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

const KIZ = INFO.find(kontakt => kontakt.id === "INFO_KIZ");
const FACHSTELLE = INFO.find(kontakt => kontakt.id === "INFO_FACHSTELLE");
const AERZTEFON = INFO.find(kontakt => kontakt.id === "INFO_AERZTEFON");

function formatDate(date?: string) {
  if (!date) return null;

  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;

  return `${day}.${month}.${year}`;
}

describe("notfallkarte architecture", () => {
  it("keeps the personal tool off the static /notfallkarte URL", () => {
    const routesIndex = fs.readFileSync(
      path.join(repoRoot, "client/src/app/routes.ts"),
      "utf8"
    );

    expect(routesIndex).not.toContain('path: "/notfallkarte", component');
    expect(routesIndex).toContain("PERSONAL_NOTFALLKARTE_PATH");
  });

  it("keeps both persisted and direct print handoff paths available", () => {
    const pageSource = fs.readFileSync(
      path.join(repoRoot, "client/src/pages/Notfallkarte.tsx"),
      "utf8"
    );
    const printTemplate = fs.readFileSync(
      path.join(repoRoot, "client/public/notfallkarte-print.html"),
      "utf8"
    );
    const printScript = fs.readFileSync(
      path.join(repoRoot, "client/public/notfallkarte-print.js"),
      "utf8"
    );

    expect(pageSource).toMatch(/savePrintData\(data\)/);
    expect(pageSource).toMatch(
      /printWindow\.postMessage\(\s*payload,\s*window\.location\.origin\s*\)/
    );
    expect(printTemplate).toContain(
      '<script src="/notfallkarte-print.js"></script>'
    );
    expect(printScript).toContain(
      'localStorage.getItem("notfallkarte-print-data")'
    );
    expect(printScript).toContain('window.addEventListener("message"');
    expect(printScript).toContain(
      'localStorage.removeItem("notfallkarte-print-data")'
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
    expect(browserCard).toMatch(
      /Nicht lebensbedrohlicher medizinischer oder psychiatrischer\s+Notfall\?/
    );

    const lifeThreatSection = browserCard.split(
      "<!-- BLOCK 2: PSYCHIATRISCHE KRISE -->"
    )[0];

    expect(lifeThreatSection).not.toContain(AERZTEFON!.nummer);
    expect(lifeThreatSection).not.toContain("Ärztedienst Zürich");

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

  it("shows the same review metadata on the static browser card as in governance", () => {
    const browserCard = fs.readFileSync(
      path.join(repoRoot, "client/public/notfallkarte.html"),
      "utf8"
    );
    const governance = pageGovernance["/notfallkarte"];

    expect(governance).toBeDefined();
    expect(browserCard).toContain(
      `Fachlich geprüft am: ${formatDate(governance?.lastReviewed)}`
    );
    expect(browserCard).toContain(
      `Nächste Prüfung: ${formatDate(governance?.nextReviewDue)}`
    );
    expect(browserCard).toContain(`Verantwortlich: ${governance?.owner ?? ""}`);
  });
});
