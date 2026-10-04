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
  it("maps known local materials to their same-origin open and download URLs", () => {
    const sourceUrl = verstehenInfografiken[0].pdfUrl;

    expect(getHandoutOpenHref(sourceUrl)).toBe(sourceUrl);
    expect(getHandoutDownloadHref(sourceUrl)).toBe(sourceUrl);
    expect(resolveHandoutAsset("leuchtturm")?.sourceUrl).toBe(sourceUrl);
  });

  it("allowlists non-library handouts through generated local ids", () => {
    const sourceUrl = kommItems[0].pdfUrl;

    expect(getHandoutOpenHref(sourceUrl)).toBe(sourceUrl);
    expect(
      resolveHandoutAsset("kommunizieren-wenn-gespraeche-kippen-3-schritte")
        ?.sourceUrl
    ).toBe(sourceUrl);
    expect(getHandoutAssetBySource(sourceUrl)).toMatchObject({
      sourceKind: "local",
      textLayer: "present",
      preferredReadingFormat: "pdf",
    });
  });

  it.each([
    "4-arten-von-grenzen",
    "grenzen-erkennen",
    "gespraeche-kippen",
    "pause-statt-streit",
    "zuhoeren-ohne-zustimmen",
    "sauerstoffmaske",
    "stopp-technik",
    "energie-konto",
  ])("keeps the public material id %s resolvable", id => {
    expect(resolveHandoutAsset(id)).toMatchObject({
      id,
      sourceKind: "local",
      textLayer: "present",
    });
  });

  it("keeps local pdf paths on the same protected deploy", () => {
    expect(getHandoutOpenHref("/notfallplan-krise-v04.pdf")).toBe(
      "/notfallplan-krise-v04.pdf"
    );
    expect(
      getHandoutDownloadHref("/Notfallkarte-Zuerich-Psychische-Krise.pdf")
    ).toBe("/Notfallkarte-Zuerich-Psychische-Krise.pdf");
    expect(
      getHandoutAssetBySource("/infografiken/eisberg-der-eisberg-v8.pdf")
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
