import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { materials } from "@/content/materialien";

/**
 * Verhindert Versions-Drift zwischen den zwei Soforthilfe-Quellen:
 *
 * 1. `client/public/soforthilfe/index.html` — Static-HTML, App-unabhängig,
 *    referenziert PDFs und HTML-Routen direkt via `<a href=...>`
 * 2. React-Materialien-Tiles in `materials` mit `category: "soforthilfe"` —
 *    referenzieren dieselben Files via `pdfUrl` / `downloadUrl`
 *
 * Wenn jemand künftig eine PDF-Version aktualisiert (z.B. `v03` → `v04`)
 * und nur eine der beiden Quellen anpasst, schlägt dieser Test fehl.
 */
describe("Soforthilfe-Quellen-Synchronisation", () => {
  it("Static-HTML und Materialien-Tiles referenzieren identische Notfall-Pfade", () => {
    const htmlPath = resolve(__dirname, "../../public/soforthilfe/index.html");
    const html = readFileSync(htmlPath, "utf-8");

    // Extrahiere alle href="/..." auf PDF-Files und /notfallkarte (HTML-Variante)
    const staticHrefs = new Set(
      Array.from(html.matchAll(/href="(\/(?:[^"]*\.pdf|notfallkarte))"/g)).map(
        m => m[1]
      )
    );

    // Materialien-Tiles mit category="soforthilfe": pdfUrl + downloadUrl
    const reactHrefs = new Set(
      materials
        .filter(m => m.category === "soforthilfe")
        .flatMap(m => [m.pdfUrl, m.downloadUrl])
        .filter((href): href is string => Boolean(href))
    );

    // Jeder Static-HTML-Pfad muss in den React-Tiles vorkommen
    for (const href of staticHrefs) {
      expect(reactHrefs).toContain(href);
    }
    // Und umgekehrt: jeder Materialien-Pfad muss im Static-HTML vorkommen
    for (const href of reactHrefs) {
      expect(staticHrefs).toContain(href);
    }
  });
});
