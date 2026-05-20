import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { pageGovernance } from "../data/pageGovernance";
import { STATIC_ROUTE_HEAD_METADATA } from "@shared/staticRouteShells";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.resolve(__dirname, "..", "pages");

// Pages mit MedicalPageSchema-Component MUESSEN einen pageGovernance-Eintrag
// mit lastReviewed haben. Build-Date != Review-Date - Compliance/Vertrauen.
// Ausnahme: dynamische Pfade (HandoutTextPage mit /materialien/text/:id),
// die werden hier explizit ausgeklammert.
const DYNAMIC_PATH_PAGES = new Set([
  "HandoutTextPage.tsx", // path={handoutMeta.path} - dynamisch pro Handout
]);

// Konstanten- oder Variable-basierte Paths: Mapping auf den Laufzeitwert.
const ALIASED_PATH_PAGES: Record<string, string> = {
  "Selbsthilfegruppen.tsx": "/beratung", // path={currentPath}, canonical=/beratung
  "Notfallkarte.tsx": "/notfallkarte/erstellen", // PERSONAL_NOTFALLKARTE_PATH
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
    "$file (path=$path) hat pageGovernance-Eintrag mit lastReviewed",
    ({ path: routePath }) => {
      const entry = pageGovernance[routePath];
      expect(entry, `${routePath} fehlt in pageGovernance`).toBeDefined();
      expect(
        entry?.lastReviewed,
        `${routePath} fehlt lastReviewed`
      ).toBeDefined();
    }
  );
});

describe("STATIC_ROUTE_HEAD_METADATA medical-schema lastReviewed", () => {
  // Statische Meta-Eintraege (inkl. Handout-Textversionen) mit
  // includeMedicalSchema: true MUESSEN eine Review-Datum-Quelle haben -
  // entweder medicalLastReviewed inline oder pageGovernance[path].lastReviewed.
  // Ohne das emittiert MedicalWebPage-Schema ohne lastReviewed = Compliance-Gap.
  const medicalRoutes = STATIC_ROUTE_HEAD_METADATA.filter(
    meta => meta.includeMedicalSchema
  );

  it("findet medizinische Static-Routes (Sanity)", () => {
    expect(medicalRoutes.length).toBeGreaterThan(10);
  });

  it.each(medicalRoutes)(
    "$path hat medicalLastReviewed oder pageGovernance-lastReviewed",
    meta => {
      const fromMeta = meta.medicalLastReviewed;
      const fromGovernance = pageGovernance[meta.path]?.lastReviewed;
      expect(
        fromMeta ?? fromGovernance,
        `${meta.path}: weder medicalLastReviewed noch pageGovernance.lastReviewed gesetzt`
      ).toBeDefined();
    }
  );
});
