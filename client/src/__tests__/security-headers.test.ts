import { createMaterialDownloadResponse } from "../../../server/material-download";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CONTENT_SECURITY_POLICY,
  SECURITY_HEADERS,
} from "@shared/securityHeaders";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

describe("security headers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete process.env.URL;
    delete process.env.DEPLOY_PRIME_URL;
    delete process.env.SITE_URL;
  });

  it("keeps Netlify headers aligned with the shared server header set", () => {
    const netlifyConfig = fs.readFileSync(
      path.join(repoRoot, "netlify.toml"),
      "utf8"
    );

    for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
      expect(netlifyConfig).toContain(`${header} = "${value}"`);
    }
  });

  it("keeps the CSP tightened with explicit non-embed directives", () => {
    expect(CONTENT_SECURITY_POLICY).toContain("object-src 'none'");
    expect(CONTENT_SECURITY_POLICY).toContain("frame-src 'none'");
    expect(CONTENT_SECURITY_POLICY).toContain("base-uri 'self'");
    expect(CONTENT_SECURITY_POLICY).toContain("form-action 'self'");
    expect(CONTENT_SECURITY_POLICY).toContain("manifest-src 'self'");
  });

  it("allows only self-hosted scripts and connections", () => {
    expect(CONTENT_SECURITY_POLICY).toContain("script-src 'self'");
    expect(CONTENT_SECURITY_POLICY).toContain("connect-src 'self'");
    expect(CONTENT_SECURITY_POLICY).not.toContain("files.manuscdn.com");
    expect(CONTENT_SECURITY_POLICY).not.toContain("forge.butterfly-effect.dev");
  });

  it("applies the shared security headers to generated local handout download responses", async () => {
    const response = await createMaterialDownloadResponse(
      "grenzen-die-4-arten-von-grenzen",
      "inline"
    );

    expect(response.status).toBe(200);
    for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
      expect(response.headers.get(header)).toBe(value);
    }
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=0, must-revalidate"
    );
    expect(response.headers.get("Content-Disposition")).toContain(
      'inline; filename="puk-4-arten-von-grenzen-v1.pdf"'
    );
    expect(Number(response.headers.get("Content-Length"))).toBeGreaterThan(
      1000
    );
  });

  it("withholds stale static notfallkarte downloads with shared security headers", async () => {
    const response = await createMaterialDownloadResponse(
      "notfallkarte-zuerich",
      "attachment"
    );

    expect(response.status).toBe(404);
    for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
      expect(response.headers.get(header)).toBe(value);
    }
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8"
    );
    await expect(response.text()).resolves.toBe("Material nicht gefunden.");
  });

  it("redirects to the relative public asset url when a local pdf is not on disk", async () => {
    const existsSpy = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const fetchPdf = vi.fn();
    vi.stubGlobal("fetch", fetchPdf);

    const response = await createMaterialDownloadResponse(
      "grenzen-die-4-arten-von-grenzen",
      "inline",
      "https://borderline-angehoerige.netlify.app"
    );

    expect(existsSpy).toHaveBeenCalled();
    expect(fetchPdf).not.toHaveBeenCalled();
    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(
      "/infografiken/puk-4-arten-von-grenzen-v1.pdf"
    );
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
      expect(response.headers.get(header)).toBe(value);
    }
  });

  it("keeps the local asset redirect relative when a Netlify site url is set", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    process.env.URL = "https://borderline-angehoerige.netlify.app";
    const fetchPdf = vi.fn();
    vi.stubGlobal("fetch", fetchPdf);

    const response = await createMaterialDownloadResponse(
      "grenzen-die-4-arten-von-grenzen",
      "inline"
    );

    expect(fetchPdf).not.toHaveBeenCalled();
    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(
      "/infografiken/puk-4-arten-von-grenzen-v1.pdf"
    );
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
  });
});
