import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  isHandoutVisualPublished,
  isHandoutWebVersionPublished,
} from "@/content/handoutGovernance";
import { getHandoutDownloadHref, getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";
import { materials } from "@/content/materialien";

/**
 * Verhindert Versions-Drift zwischen den zwei Soforthilfe-Quellen:
 *
 * 1. `client/public/soforthilfe/index.html` — Static-HTML, App-unabhängig,
 *    referenziert freigegebene PDFs und HTML-Routen direkt via `<a href=...>`
 * 2. React-Materialien-Tiles in `materials` mit `category: "soforthilfe"` —
 *    stellen dieselben aktuell freigegebenen Ziele bereit
 *
 * Zurückgezogene Visuals werden dabei durch ihre aktuelle Textversion ersetzt.
 */
describe("Soforthilfe-Quellen-Synchronisation", () => {
  it("Static-HTML und Materialien-Tiles referenzieren identische Notfall-Pfade", () => {
    const htmlPath = resolve(__dirname, "../../public/soforthilfe/index.html");
    const html = readFileSync(htmlPath, "utf-8");

    // Extrahiere alle freigegebenen PDF- und Browserziele.
    const staticHrefs = new Set(
      Array.from(
        html.matchAll(
          /href="(\/(?:[^"]*\.pdf|notfallkarte|materialien\/text\/[^"]+))"/g
        )
      ).map(m => m[1])
    );

    // Rekonstruiere die tatsächlich sichtbaren Ziele der React-Tiles.
    const reactHrefs = new Set(
      materials
        .filter(m => m.category === "soforthilfe")
        .flatMap(item => {
          const pdfSource = item.pdfUrl ?? item.downloadUrl;
          const visualPublished = isHandoutVisualPublished(item.id);
          const currentHtmlAvailable = Boolean(
            item.isHtml && isHandoutWebVersionPublished(item.id)
          );
          const openHref = item.isHtml
            ? (item.downloadUrl ?? item.url)
            : getHandoutOpenHref(pdfSource);
          const downloadHref = getHandoutDownloadHref(pdfSource);
          const textVersionHref = item.isHtml
            ? null
            : getHandoutTextVersionHrefBySource(pdfSource);

          return [
            currentHtmlAvailable || visualPublished ? openHref : null,
            visualPublished ? downloadHref : null,
            textVersionHref,
          ];
        })
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
