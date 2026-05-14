import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

describe("startup shell static assets", () => {
  // Architektur-Regel: Shell-CSS (route-prerender) lebt extern in
  // startup-shell.css, damit der Browser sie unabhaengig von index.html
  // cachen und ueber Page-Loads wiederverwenden kann. Critical-Path-CSS
  // wie @font-face-Decls darf inline sein (Render-Blocking-Save), solange
  // die Shell-Rules nicht mit-inlinet werden.
  it("keeps the startup shell stylesheet external (cacheable across page loads)", () => {
    const indexHtml = fs.readFileSync(
      path.join(repoRoot, "client/index.html"),
      "utf8"
    );

    expect(indexHtml).toContain(
      '<link rel="stylesheet" href="/startup-shell.css" />'
    );
    // Shell-Selektoren (.route-prerender-*) duerfen nicht innerhalb eines
    // <style>-Blocks auftauchen - sie gehoeren in startup-shell.css. Der
    // Negative-Lookahead begrenzt das Match auf den <style>-Inhalt, damit
    // spaetere Vorkommen (z.B. in Kommentaren) nicht versehentlich ausloesen.
    expect(indexHtml).not.toMatch(
      /<style[^>]*>(?:(?!<\/style>)[\s\S])*\.route-prerender/
    );
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
