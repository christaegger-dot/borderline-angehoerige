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
    const spaltungPdf = materials.find(
      item => item.id === "spaltung"
    )?.downloadUrl;
    const alarmModusPdf = materials.find(
      item => item.id === "alarm-modus"
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
    const schuldVerantwortungPdf = materials.find(
      item => item.id === "schuld-verantwortung"
    )?.downloadUrl;
    const radikaleAkzeptanzPdf = materials.find(
      item => item.id === "radikale-akzeptanz"
    )?.downloadUrl;
    const wennWorteTreffenPdf = materials.find(
      item => item.id === "wenn-worte-treffen"
    )?.downloadUrl;
    const dearPdf = materials.find(item => item.id === "dear")?.downloadUrl;
    const genesungZahlenPdf = materials.find(
      item => item.id === "genesung-zahlen"
    )?.downloadUrl;
    const kinderPdf = materials.find(item => item.id === "kinder")?.downloadUrl;

    expect(getHandoutTextVersion("leuchtturm")?.path).toBe(
      "/materialien/text/leuchtturm"
    );
    expect(getHandoutTextVersion("eisberg")?.path).toBe(
      "/materialien/text/eisberg"
    );
    expect(getHandoutTextVersion("spaltung")?.path).toBe(
      "/materialien/text/spaltung"
    );
    expect(getHandoutTextVersion("alarm-modus")?.path).toBe(
      "/materialien/text/alarm-modus"
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
    expect(getHandoutTextVersion("schuld-verantwortung")?.path).toBe(
      "/materialien/text/schuld-verantwortung"
    );
    expect(getHandoutTextVersion("radikale-akzeptanz")?.path).toBe(
      "/materialien/text/radikale-akzeptanz"
    );
    expect(getHandoutTextVersion("wenn-worte-treffen")?.path).toBe(
      "/materialien/text/wenn-worte-treffen"
    );
    expect(getHandoutTextVersion("dear")?.path).toBe("/materialien/text/dear");
    expect(getHandoutTextVersion("genesung-zahlen")?.path).toBe(
      "/materialien/text/genesung-zahlen"
    );
    expect(getHandoutTextVersion("kinder")?.path).toBe(
      "/materialien/text/kinder"
    );
    expect(getHandoutTextVersionHrefBySource(leuchtturmPdf)).toBe(
      "/materialien/text/leuchtturm"
    );
    expect(getHandoutTextVersionHrefBySource(eisbergPdf)).toBe(
      "/materialien/text/eisberg"
    );
    expect(getHandoutTextVersionHrefBySource(spaltungPdf)).toBe(
      "/materialien/text/spaltung"
    );
    expect(getHandoutTextVersionHrefBySource(alarmModusPdf)).toBe(
      "/materialien/text/alarm-modus"
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
    expect(getHandoutTextVersionHrefBySource(schuldVerantwortungPdf)).toBe(
      "/materialien/text/schuld-verantwortung"
    );
    expect(getHandoutTextVersionHrefBySource(radikaleAkzeptanzPdf)).toBe(
      "/materialien/text/radikale-akzeptanz"
    );
    expect(getHandoutTextVersionHrefBySource(wennWorteTreffenPdf)).toBe(
      "/materialien/text/wenn-worte-treffen"
    );
    expect(getHandoutTextVersionHrefBySource(dearPdf)).toBe(
      "/materialien/text/dear"
    );
    expect(getHandoutTextVersionHrefBySource(genesungZahlenPdf)).toBe(
      "/materialien/text/genesung-zahlen"
    );
    expect(getHandoutTextVersionHrefBySource(kinderPdf)).toBe(
      "/materialien/text/kinder"
    );
    expect(getHandoutTextVersionBySource("/notfallplan-krise-v03.pdf")).toBe(
      null
    );
  });
});
