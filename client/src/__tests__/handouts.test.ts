import { describe, expect, it } from "vitest";
import {
  getHandoutDownloadHref,
  getHandoutOpenHref,
  resolveHandoutAsset,
} from "@/content/handouts";
import { kommItems } from "@/content/kommunizieren";
import { verstehenInfografiken } from "@/content/verstehen";

describe("handout delivery helpers", () => {
  it("maps known remote materials to proxied open and download URLs", () => {
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

  it("keeps local pdf paths untouched", () => {
    expect(getHandoutOpenHref("/notfallplan-krise-v03.pdf")).toBe(
      "/notfallplan-krise-v03.pdf"
    );
    expect(
      getHandoutDownloadHref("/Notfallkarte-Zuerich-Psychische-Krise.pdf")
    ).toBe("/Notfallkarte-Zuerich-Psychische-Krise.pdf");
  });
});
