import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  getGeneratedStaticRouteHeadMetadata,
  getStaticRouteHeadMetadata,
  renderStaticRouteHtml,
} from "../../../shared/staticRouteShells";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

describe("static route shells", () => {
  it("registers exact html shells for known routes and handout text pages", () => {
    const routes = getGeneratedStaticRouteHeadMetadata().map(meta => meta.path);

    expect(routes).toContain("/verstehen/diagnostik");
    expect(routes).toContain("/notfallkarte/erstellen");
    expect(routes).toContain("/materialien/text/leuchtturm");
    expect(routes).not.toContain("/soforthilfe");
  });

  it("renders route-specific metadata and json-ld into the startup shell html", () => {
    const baseHtml = fs.readFileSync(
      path.join(repoRoot, "client/index.html"),
      "utf8"
    );
    const diagnostikMeta = getStaticRouteHeadMetadata("/verstehen/diagnostik");

    expect(diagnostikMeta).not.toBeNull();

    const html = renderStaticRouteHtml(baseHtml, diagnostikMeta!);

    expect(html).toContain(
      "<title>Diagnostik – Borderline · Hilfe für Angehörige</title>"
    );
    expect(html).toContain(
      'href="https://borderline-angehoerige.netlify.app/verstehen/diagnostik"'
    );
    expect(html).toContain(
      'property="og:title" content="Diagnostik – Borderline · Hilfe für Angehörige"'
    );
    expect(html).toContain('"@type":"MedicalWebPage"');
    expect(html).toContain(">Diagnostik</h1>");
  });

  it("marks the dedicated 404 shell as noindex", () => {
    const baseHtml = fs.readFileSync(
      path.join(repoRoot, "client/index.html"),
      "utf8"
    );
    const notFoundMeta = getStaticRouteHeadMetadata("/404");

    expect(notFoundMeta).not.toBeNull();

    const html = renderStaticRouteHtml(baseHtml, notFoundMeta!);

    expect(html).toContain('name="robots" content="noindex, nofollow"');
    expect(html).toContain(
      "<title>Seite nicht gefunden – Borderline · Hilfe für Angehörige</title>"
    );
    expect(html).toContain(">Seite nicht gefunden</h1>");
  });
});
