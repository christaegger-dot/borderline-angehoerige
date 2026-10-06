import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { APP_REDIRECTS } from "../../../shared/redirects";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

describe("retired emergency card", () => {
  it("redirects the legacy overview and excludes personal and print routes", () => {
    expect(APP_REDIRECTS).toContainEqual({
      from: "/notfallkarte",
      to: "/soforthilfe",
      status: 301,
    });
    expect(APP_REDIRECTS).toContainEqual({
      from: "/notfallkarte.html",
      to: "/soforthilfe",
      status: 301,
    });

    const routes = fs.readFileSync(
      path.join(repoRoot, "client/src/app/routes.ts"),
      "utf8"
    );
    const netlify = fs.readFileSync(
      path.join(repoRoot, "netlify.toml"),
      "utf8"
    );

    expect(routes).not.toContain("PERSONAL_NOTFALLKARTE_PATH");
    expect(netlify).toMatch(
      /from = "\/notfallkarte\/erstellen"[\s\S]*?status = 404[\s\S]*?force = true/
    );
    expect(netlify).toMatch(
      /from = "\/notfallkarte-print\.html"[\s\S]*?status = 404[\s\S]*?force = true/
    );
    expect(netlify).toMatch(
      /from = "\/soforthilfe-print\.html"[\s\S]*?status = 404[\s\S]*?force = true/
    );
  });

  it("does not package retired browser-card or print assets", () => {
    for (const asset of [
      "client/public/notfallkarte.html",
      "client/public/notfallkarte.js",
      "client/public/notfallkarte.css",
      "client/public/notfallkarte-print.html",
      "client/public/notfallkarte-print.js",
      "client/public/soforthilfe-print.html",
    ]) {
      expect(fs.existsSync(path.join(repoRoot, asset)), asset).toBe(false);
    }
  });

  it("keeps the independent Soforthilfe page and its overdue review status visible", () => {
    const directPage = fs.readFileSync(
      path.join(repoRoot, "client/public/soforthilfe/index.html"),
      "utf8"
    );

    expect(directPage).toContain("Soforthilfe bei akuter Gefahr");
    expect(directPage).toContain(
      "Erneute Fachprüfung ausstehend (fällig seit 31.07.2026)"
    );
    expect(directPage).not.toContain('href="/notfallkarte"');
  });
});
