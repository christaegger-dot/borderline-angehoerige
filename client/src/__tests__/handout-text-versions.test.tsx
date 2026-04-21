import { describe, expect, it } from "vitest";
import {
  getHandoutTextVersion,
  getHandoutTextVersionBySource,
  getHandoutTextVersionHrefBySource,
} from "@/content/handoutTextVersions";
import { materials } from "@/content/materialien";

describe("handout text versions", () => {
  it("maps known remote handouts to text version routes", () => {
    const leuchtturmPdf = materials.find(
      item => item.id === "leuchtturm"
    )?.downloadUrl;
    const eisbergPdf = materials.find(
      item => item.id === "eisberg"
    )?.downloadUrl;
    const rolleKlaerenPdf = materials.find(
      item => item.id === "rolle-klaeren"
    )?.downloadUrl;
    const krisenPdf = materials.find(
      item => item.id === "krisenkommunikation"
    )?.downloadUrl;
    const grenzenSpickzettelPdf = materials.find(
      item => item.id === "grenzen-spickzettel"
    )?.downloadUrl;
    const warnsignalePdf = materials.find(
      item => item.id === "warnsignale"
    )?.downloadUrl;

    expect(getHandoutTextVersion("leuchtturm")?.path).toBe(
      "/materialien/text/leuchtturm"
    );
    expect(getHandoutTextVersion("eisberg")?.path).toBe(
      "/materialien/text/eisberg"
    );
    expect(getHandoutTextVersion("rolle-klaeren")?.path).toBe(
      "/materialien/text/rolle-klaeren"
    );
    expect(getHandoutTextVersion("krisenkommunikation")?.path).toBe(
      "/materialien/text/krisenkommunikation"
    );
    expect(getHandoutTextVersion("grenzen-spickzettel")?.path).toBe(
      "/materialien/text/grenzen-spickzettel"
    );
    expect(getHandoutTextVersion("warnsignale")?.path).toBe(
      "/materialien/text/warnsignale"
    );
    expect(getHandoutTextVersionHrefBySource(leuchtturmPdf)).toBe(
      "/materialien/text/leuchtturm"
    );
    expect(getHandoutTextVersionHrefBySource(eisbergPdf)).toBe(
      "/materialien/text/eisberg"
    );
    expect(getHandoutTextVersionHrefBySource(rolleKlaerenPdf)).toBe(
      "/materialien/text/rolle-klaeren"
    );
    expect(getHandoutTextVersionHrefBySource(krisenPdf)).toBe(
      "/materialien/text/krisenkommunikation"
    );
    expect(getHandoutTextVersionHrefBySource(grenzenSpickzettelPdf)).toBe(
      "/materialien/text/grenzen-spickzettel"
    );
    expect(getHandoutTextVersionHrefBySource(warnsignalePdf)).toBe(
      "/materialien/text/warnsignale"
    );
    expect(getHandoutTextVersionBySource("/notfallplan-krise-v03.pdf")).toBe(
      null
    );
  });
});
