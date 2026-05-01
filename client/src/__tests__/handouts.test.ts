import { describe, expect, it } from "vitest";
import {
  getHandoutAssetBySource,
  getHandoutDownloadHref,
  getHandoutOpenHref,
  resolveHandoutAsset,
} from "@/content/handouts";
import { kommItems } from "@/content/kommunizieren";
import { verstehenInfografiken } from "@/content/verstehen";

describe("handout delivery helpers", () => {
  it("maps known materials to proxied open and download URLs", () => {
    const sourceUrl = verstehenInfografiken[0].pdfUrl;

    expect(getHandoutOpenHref(sourceUrl)).toBe(
      "/api/material-download/leuchtturm?disposition=inline"
    );
    expect(getHandoutDownloadHref(sourceUrl)).toBe(
      "/api/material-download/leuchtturm"
    );
    expect(resolveHandoutAsset("leuchtturm")?.sourceUrl).toBe(sourceUrl);
  });

  it("allowlists non-library handouts through generated ids", () => {
    const sourceUrl = kommItems[0].pdfUrl;

    expect(getHandoutOpenHref(sourceUrl)).toBe(
      "/api/material-download/kommunizieren-wenn-gespraeche-kippen-3-schritte?disposition=inline"
    );
    expect(
      resolveHandoutAsset("kommunizieren-wenn-gespraeche-kippen-3-schritte")
        ?.sourceUrl
    ).toBe(sourceUrl);
  });

  it("routes local pdf paths through the controlled download endpoint", () => {
    expect(getHandoutOpenHref("/notfallplan-krise-v03.pdf")).toBe(
      "/api/material-download/notfallplan-krise?disposition=inline"
    );
    expect(
      getHandoutDownloadHref("/Notfallkarte-Zuerich-Psychische-Krise.pdf")
    ).toBe("/api/material-download/notfallkarte-zuerich");
    expect(
      getHandoutAssetBySource("/infografiken/eisberg-der-eisberg-v6.pdf")
    ).toMatchObject({
      id: "eisberg",
      sourceKind: "local",
      textLayer: "present",
      preferredReadingFormat: "pdf",
    });
  });

  it("marks localized material pdfs as text-layer-present local assets", () => {
    expect(
      getHandoutAssetBySource(verstehenInfografiken[0].pdfUrl)
    ).toMatchObject({
      id: "leuchtturm",
      sourceKind: "local",
      textLayer: "present",
      preferredReadingFormat: "pdf",
    });
  });
});
