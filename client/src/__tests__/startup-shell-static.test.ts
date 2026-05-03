import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

describe("startup shell static assets", () => {
  it("loads root shell styles from a dedicated stylesheet instead of inline CSS", () => {
    const indexHtml = fs.readFileSync(
      path.join(repoRoot, "client/index.html"),
      "utf8"
    );

    expect(indexHtml).toContain(
      '<link rel="stylesheet" href="/startup-shell.css" />'
    );
    expect(indexHtml).not.toContain("<style>");
  });

  it("keeps startup fonts and fallback handling out of the critical HTML path", () => {
    const indexHtml = fs.readFileSync(
      path.join(repoRoot, "client/index.html"),
      "utf8"
    );
    const prerenderScript = fs.readFileSync(
      path.join(repoRoot, "client/public/route-prerender.js"),
      "utf8"
    );

    expect(indexHtml).not.toContain("startup-fallback.js");
    expect(indexHtml).not.toContain("fonts.googleapis.com/css2");
    expect(prerenderScript).not.toContain("fonts.googleapis.com");
    expect(prerenderScript).not.toContain("fonts.gstatic.com");
  });
});
