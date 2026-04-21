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
    const rolleKlaerenPdf = materials.find(
      item => item.id === "rolle-klaeren"
    )?.downloadUrl;
    const krisenPdf = materials.find(
      item => item.id === "krisenkommunikation"
    )?.downloadUrl;
    const warnsignalePdf = materials.find(
      item => item.id === "warnsignale"
    )?.downloadUrl;

    expect(getHandoutTextVersion("leuchtturm")?.path).toBe(
      "/materialien/text/leuchtturm"
    );
    expect(getHandoutTextVersion("rolle-klaeren")?.path).toBe(
      "/materialien/text/rolle-klaeren"
    );
    expect(getHandoutTextVersion("krisenkommunikation")?.path).toBe(
      "/materialien/text/krisenkommunikation"
    );
    expect(getHandoutTextVersion("warnsignale")?.path).toBe(
      "/materialien/text/warnsignale"
    );
    expect(getHandoutTextVersionHrefBySource(leuchtturmPdf)).toBe(
      "/materialien/text/leuchtturm"
    );
    expect(getHandoutTextVersionHrefBySource(rolleKlaerenPdf)).toBe(
      "/materialien/text/rolle-klaeren"
    );
    expect(getHandoutTextVersionHrefBySource(krisenPdf)).toBe(
      "/materialien/text/krisenkommunikation"
    );
    expect(getHandoutTextVersionHrefBySource(warnsignalePdf)).toBe(
      "/materialien/text/warnsignale"
    );
    expect(getHandoutTextVersionBySource("/notfallplan-krise-v03.pdf")).toBe(
      null
    );
  });
});
