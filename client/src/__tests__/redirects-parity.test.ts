import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { APP_REDIRECTS } from "@shared/redirects";
import { STATIC_ROUTE_REDIRECTS } from "@shared/staticRouteShells";
import { routes } from "../app/routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

function parseNetlifyTomlRedirects(toml: string): Map<string, string> {
  const blocks = toml.split(/^\[\[redirects\]\]/m).slice(1);
  const map = new Map<string, string>();
  for (const block of blocks) {
    const fromMatch = block.match(/from\s*=\s*"([^"]+)"/);
    const toMatch = block.match(/to\s*=\s*"([^"]+)"/);
    if (fromMatch && toMatch) {
      map.set(fromMatch[1], toMatch[1]);
    }
  }
  return map;
}

function parseRedirectsFile(content: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const [from, to] = line.split(/\s+/);
    if (from && to) map.set(from, to);
  }
  return map;
}

describe("redirects parity (single source: shared/redirects.ts)", () => {
  const netlifyToml = fs.readFileSync(
    path.join(repoRoot, "netlify.toml"),
    "utf8"
  );
  const redirectsFile = fs.readFileSync(
    path.join(repoRoot, "client/public/_redirects"),
    "utf8"
  );
  const netlifyMap = parseNetlifyTomlRedirects(netlifyToml);
  const redirectsMap = parseRedirectsFile(redirectsFile);

  it.each(APP_REDIRECTS)("netlify.toml hat $from -> $to", ({ from, to }) => {
    expect(netlifyMap.get(from), `from=${from}`).toBe(to);
  });

  it.each(APP_REDIRECTS)("_redirects hat $from -> $to", ({ from, to }) => {
    expect(redirectsMap.get(from), `from=${from}`).toBe(to);
  });

  it.each(APP_REDIRECTS)(
    "routes.ts hat client-redirect $from -> $to",
    ({ from, to }) => {
      const route = routes.find(r => r.path === from);
      expect(route, `routes.ts hat keinen Eintrag fuer ${from}`).toBeDefined();
      expect(route?.redirectTo, `routes.ts ${from} redirectTo`).toBe(to);
    }
  );

  it("STATIC_ROUTE_REDIRECTS === APP_REDIRECTS", () => {
    expect(STATIC_ROUTE_REDIRECTS).toBe(APP_REDIRECTS);
  });
});
