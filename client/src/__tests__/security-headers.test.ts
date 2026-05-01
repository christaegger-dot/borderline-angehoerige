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
    expect(CONTENT_SECURITY_POLICY).not.toContain("forge.butterfly-effect.dev");
  });

  it("applies the shared security headers to material download responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("pdf", {
          status: 200,
          headers: {
            "content-type": "application/pdf",
            "cache-control": "public, max-age=600",
            "content-length": "3",
          },
        })
      )
    );

    const response = await createMaterialDownloadResponse(
      "leuchtturm",
      "inline"
    );

    expect(response.status).toBe(200);
    for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
      expect(response.headers.get(header)).toBe(value);
    }
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Cache-Control")).toBe("public, max-age=600");
    expect(response.headers.get("Content-Disposition")).toContain("inline;");
  });

  it("applies the shared security headers to local material download responses", async () => {
    const response = await createMaterialDownloadResponse(
      "notfallplan-krise",
      "attachment"
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
      'attachment; filename="notfallplan-krise-v03.pdf"'
    );
    expect(Number(response.headers.get("Content-Length"))).toBeGreaterThan(
      1000
    );
  });

  it("falls back to the public asset url when a local pdf is not on disk", async () => {
    const existsSpy = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("pdf", {
          status: 200,
          headers: {
            "content-type": "application/pdf",
            "cache-control": "public, max-age=0, must-revalidate",
            "content-length": "3",
          },
        })
      )
    );

    const response = await createMaterialDownloadResponse(
      "notfallplan-krise",
      "inline",
      "https://borderline-angehoerige.netlify.app"
    );

    expect(existsSpy).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      "https://borderline-angehoerige.netlify.app/notfallplan-krise-v03.pdf",
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: expect.stringContaining("application/pdf"),
        }),
      })
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Disposition")).toContain("inline;");
    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=0, must-revalidate"
    );
  });

  it("uses the Netlify site url when no request origin is available", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    process.env.URL = "https://borderline-angehoerige.netlify.app";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("pdf", {
          status: 200,
          headers: {
            "content-type": "application/pdf",
          },
        })
      )
    );

    const response = await createMaterialDownloadResponse(
      "notfallplan-krise",
      "inline"
    );

    expect(fetch).toHaveBeenCalledWith(
      "https://borderline-angehoerige.netlify.app/notfallplan-krise-v03.pdf",
      expect.any(Object)
    );
    expect(response.status).toBe(200);
  });
});
