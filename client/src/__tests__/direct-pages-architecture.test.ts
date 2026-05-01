import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

function findStaticDirectPages(directory: string) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      results.push(...findStaticDirectPages(absolutePath));
      continue;
    }

    if (entry.isFile() && entry.name === "index.html") {
      results.push(path.relative(repoRoot, absolutePath));
    }
  }

  return results.sort();
}

describe("direct pages architecture", () => {
  it("keeps static direct pages limited to the echte Sonderfaelle", () => {
    const staticDirectPages = findStaticDirectPages(
      path.join(repoRoot, "client/public")
    );

    expect(staticDirectPages).toEqual(["client/public/soforthilfe/index.html"]);
  });

  it("keeps redirects focused on real redirects instead of a SPA catch-all", () => {
    const redirects = fs.readFileSync(
      path.join(repoRoot, "client/public/_redirects"),
      "utf8"
    );

    expect(redirects).toContain("/notfallkarte.html    /notfallkarte   301!");
    expect(redirects).toContain(
      "/soforthilfe    /soforthilfe/index.html   200!"
    );
    expect(redirects).toContain(
      "/unterstuetzen    /unterstuetzen/uebersicht   301!"
    );
    expect(redirects).toContain("/404    /404.html   404!");
    expect(redirects).not.toContain("/*    /index.html   200");
  });

  it("hardens the production server to explicit html shells plus a dedicated 404", () => {
    const serverIndex = fs.readFileSync(
      path.join(repoRoot, "server/index.ts"),
      "utf8"
    );

    expect(serverIndex).toContain("STATIC_ROUTE_REDIRECTS");
    expect(serverIndex).toContain("getStaticHtmlCandidates");
    expect(serverIndex).toContain('path.join(staticPath, "404.html")');
  });

  it("keeps static direct pages out of the SPA route registry", () => {
    const routesIndex = fs.readFileSync(
      path.join(repoRoot, "client/src/app/routes.ts"),
      "utf8"
    );

    expect(routesIndex).not.toContain('path: "/soforthilfe"');
    expect(routesIndex).not.toContain('path: "/notfall"');
  });
});
