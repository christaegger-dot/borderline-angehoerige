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

  it("keeps redirects focused on soforthilfe instead of overriding SPA routes", () => {
    const redirects = fs.readFileSync(
      path.join(repoRoot, "client/public/_redirects"),
      "utf8"
    );

    expect(redirects).toContain(
      "/soforthilfe    /soforthilfe/index.html   200!"
    );
    expect(redirects).not.toContain(
      "/materialien    /materialien/index.html   200!"
    );
    expect(redirects).not.toContain(
      "/selbsttest    /selbsttest/index.html   200!"
    );
  });

  it("hardens the production server to explicit static direct-page routes", () => {
    const serverIndex = fs.readFileSync(
      path.join(repoRoot, "server/index.ts"),
      "utf8"
    );

    expect(serverIndex).toContain(
      'const STATIC_DIRECT_PAGE_ROUTES = new Set(["/soforthilfe"])'
    );
  });
});
