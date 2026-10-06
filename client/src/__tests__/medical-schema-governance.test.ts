import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CURRENT_PUBLICATION_STATUS,
  pageGovernance,
} from "../data/pageGovernance";
import { buildMedicalPageSchemaData } from "../lib/seoMetadata";
import {
  STATIC_ROUTE_HEAD_METADATA,
  renderStaticRouteHtml,
} from "@shared/staticRouteShells";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.resolve(__dirname, "..", "pages");

// Medizinische Seiten brauchen eine nachvollziehbare Projektzuordnung.
// Historische Projekt-Prüfangaben sind kein Nachweis für den aktuellen Stand;
// lastReviewed ist kein Pflichtfeld des MedicalWebPage-Schemas.
// Ausnahmen: dynamische Handout-Pfade und nicht veröffentlichte Seitenquellen
// werden ausdrücklich ausgeklammert; ausgemusterte Routen bleiben entfernt.
const DYNAMIC_PATH_PAGES = new Set([
  "HandoutTextPage.tsx", // path={handoutMeta.path} - dynamisch pro Handout
  "Notfallkarte.tsx", // bewusst nicht mehr als öffentliche Route registriert
]);

// Konstanten- oder Variable-basierte Paths: Mapping auf den Laufzeitwert.
const ALIASED_PATH_PAGES: Record<string, string> = {
  "Selbsthilfegruppen.tsx": "/beratung", // path={currentPath}, canonical=/beratung
};

function extractMedicalSchemaPath(src: string): string | null {
  const match = src.match(
    /<MedicalPageSchema[\s\S]*?path=(?:"([^"]+)"|\{([A-Za-z_$][A-Za-z0-9_$.]*)\})/
  );
  if (!match) return null;
  return match[1] ?? `<expr:${match[2]}>`;
}

describe("MedicalPageSchema pageGovernance parity", () => {
  const pageFiles = fs
    .readdirSync(pagesDir)
    .filter(f => f.endsWith(".tsx") && !DYNAMIC_PATH_PAGES.has(f));

  const pagesWithMedicalSchema: { file: string; path: string }[] = [];
  for (const file of pageFiles) {
    const src = fs.readFileSync(path.join(pagesDir, file), "utf8");
    if (!src.includes("<MedicalPageSchema")) continue;

    const aliasedPath = ALIASED_PATH_PAGES[file];
    if (aliasedPath) {
      pagesWithMedicalSchema.push({ file, path: aliasedPath });
      continue;
    }

    const rawPath = extractMedicalSchemaPath(src);
    if (rawPath?.startsWith("<expr:")) {
      throw new Error(
        `${file}: MedicalPageSchema path ist Variable (${rawPath}). ` +
          "ALIASED_PATH_PAGES erweitern oder DYNAMIC_PATH_PAGES."
      );
    }
    if (!rawPath) {
      throw new Error(`${file}: MedicalPageSchema ohne path-Prop`);
    }
    pagesWithMedicalSchema.push({ file, path: rawPath });
  }

  it("findet alle MedicalPageSchema-Pages (Sanity)", () => {
    expect(pagesWithMedicalSchema.length).toBeGreaterThan(10);
  });

  it.each(pagesWithMedicalSchema)(
    "$file (path=$path) hat Governance-Daten und behauptet bei offenem Review kein Prüfdatum",
    ({ path: routePath }) => {
      const entry = pageGovernance[routePath];
      expect(entry, `${routePath} fehlt in pageGovernance`).toBeDefined();
      expect(
        entry?.owner,
        `${routePath} fehlt die Projektzuordnung`
      ).toBeTruthy();
      expect(CURRENT_PUBLICATION_STATUS.clinicalReview).toBe("pending");
      const schema = buildMedicalPageSchemaData({
        title: routePath,
        description: "Test der Review-Metadaten",
        path: routePath,
      });
      expect(schema).not.toHaveProperty("lastReviewed");
    }
  );
});

describe("Review-Metadaten der generierten medizinischen Static-Routes", () => {
  // Auch Inline-Daten und Handout-Metadaten dürfen einen ausstehenden Review
  // nicht umgehen. Geprüft wird die tatsächliche JSON-LD-Ausgabe des Generators.
  const medicalRoutes = STATIC_ROUTE_HEAD_METADATA.filter(
    meta => meta.includeMedicalSchema
  );

  it("findet medizinische Static-Routes (Sanity)", () => {
    expect(medicalRoutes.length).toBeGreaterThan(10);
  });

  it.each(medicalRoutes)(
    "$path exportiert bei ausstehendem Review kein lastReviewed",
    meta => {
      const html = renderStaticRouteHtml(
        "<!doctype html><html><head></head><body></body></html>",
        meta
      );
      expect(html).toContain('"@type":"MedicalWebPage"');
      expect(html).not.toContain('"lastReviewed"');
    }
  );
});
