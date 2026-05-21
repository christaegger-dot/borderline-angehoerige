import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { pageGovernance } from "@/data/pageGovernance";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");
const SITE_URL = "https://borderline-angehoerige.netlify.app";

function readSitemap() {
  return fs.readFileSync(
    path.join(repoRoot, "client/public/sitemap.xml"),
    "utf8"
  );
}

function parseSitemapEntries(xml: string) {
  const entries = new Map<string, { lastmod: string }>();

  const urlBlocks = xml.match(/<url\b[\s\S]*?<\/url\s*>/g) ?? [];

  for (const block of urlBlocks) {
    const url = block.match(/<loc\b[^>]*>\s*([^<]+)\s*<\/loc\s*>/)?.[1];
    const lastmod = block.match(
      /<lastmod\b[^>]*>\s*([^<]+)\s*<\/lastmod\s*>/
    )?.[1];
    const routePath = url?.replace(SITE_URL, "");

    if (routePath && lastmod) {
      entries.set(routePath, { lastmod });
    }
  }

  return entries;
}

describe("sitemap", () => {
  it("contains the newly added diagnostik and begleiterkrankungen routes", () => {
    const entries = parseSitemapEntries(readSitemap());

    expect(entries.has("/verstehen/diagnostik")).toBe(true);
    expect(entries.has("/verstehen/begleiterkrankungen")).toBe(true);
  });

  it("keeps all governed sitemap pages in sync with page governance lastReviewed dates", () => {
    const entries = parseSitemapEntries(readSitemap());
    const governedPaths = Object.entries(pageGovernance)
      .filter(([, meta]) => Boolean(meta.lastReviewed))
      .map(([routePath]) => routePath);

    for (const routePath of governedPaths) {
      expect(entries.get(routePath)?.lastmod).toBe(
        pageGovernance[routePath]?.lastReviewed
      );
    }
  });
});
