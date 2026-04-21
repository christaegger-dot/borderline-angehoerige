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
    const krisenPdf = materials.find(
      item => item.id === "krisenkommunikation"
    )?.downloadUrl;

    expect(getHandoutTextVersion("leuchtturm")?.path).toBe(
      "/materialien/text/leuchtturm"
    );
    expect(getHandoutTextVersion("krisenkommunikation")?.path).toBe(
      "/materialien/text/krisenkommunikation"
    );
    expect(getHandoutTextVersionHrefBySource(leuchtturmPdf)).toBe(
      "/materialien/text/leuchtturm"
    );
    expect(getHandoutTextVersionHrefBySource(krisenPdf)).toBe(
      "/materialien/text/krisenkommunikation"
    );
    expect(getHandoutTextVersionBySource("/notfallplan-krise-v03.pdf")).toBe(
      null
    );
  });
});
