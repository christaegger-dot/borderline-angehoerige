import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CONTENT_SECURITY_POLICY,
  SECURITY_HEADERS,
} from "@shared/securityHeaders";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

describe("security headers", () => {
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
});
