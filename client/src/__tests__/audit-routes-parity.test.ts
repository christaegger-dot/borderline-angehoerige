import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { routes } from "../app/routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

// Statische Direktseiten ohne SPA-Route - zaehlen trotzdem als Audit-Target.
const STATIC_DIRECT_PAGES = ["/soforthilfe", "/notfallkarte"];

function extractScriptArray(scriptSrc: string, name: string): string[] {
  const match = scriptSrc.match(
    new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`)
  );
  if (!match) {
    throw new Error(`${name} not found in audit script`);
  }
  return [...match[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
}

describe("audit-regression-guard route parity", () => {
  const scriptPath = path.join(
    repoRoot,
    "scripts",
    "audit-regression-guard.mjs"
  );
  const scriptSrc = fs.readFileSync(scriptPath, "utf8");
  const fullRoutes = extractScriptArray(scriptSrc, "FULL_ROUTES");

  const expectedRoutes = new Set([
    ...routes
      .filter(r => r.component && !r.redirectTo && !r.path.includes(":"))
      .map(r => r.path),
    ...STATIC_DIRECT_PAGES,
  ]);

  it("FULL_ROUTES enthaelt alle aktiven SPA-Routen aus routes.ts", () => {
    const missing = [...expectedRoutes].filter(p => !fullRoutes.includes(p));
    expect(missing, `Audit-Script fehlt ${missing.join(", ")}`).toEqual([]);
  });

  it("FULL_ROUTES enthaelt keine Redirect-/Dynamic-Routes", () => {
    const redirectPaths = new Set(
      routes.filter(r => r.redirectTo).map(r => r.path)
    );
    const dynamicPaths = new Set(
      routes.filter(r => r.path.includes(":")).map(r => r.path)
    );
    const invalid = fullRoutes.filter(
      p => redirectPaths.has(p) || dynamicPaths.has(p)
    );
    expect(
      invalid,
      `FULL_ROUTES enthaelt Redirect/Dynamic: ${invalid.join(", ")}`
    ).toEqual([]);
  });

  it("FULL_ROUTES enthaelt keine unbekannten Pfade", () => {
    const unknown = fullRoutes.filter(p => !expectedRoutes.has(p));
    expect(
      unknown,
      `FULL_ROUTES enthaelt Pfade ohne routes.ts-Pendant: ${unknown.join(", ")}`
    ).toEqual([]);
  });
});
