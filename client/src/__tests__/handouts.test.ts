import { describe, expect, it } from "vitest";
import {
  getHandoutAssetBySource,
  getHandoutDownloadHref,
  getHandoutOpenHref,
  resolveHandoutAsset,
} from "@/content/handouts";
import { unterstuetzenItems } from "@/content/unterstuetzen";
import { verstehenInfografiken } from "@/content/verstehen";

describe("handout delivery helpers", () => {
  it("maps known local materials to their same-origin open and download URLs", () => {
    const sourceUrl = verstehenInfografiken.find(
      item => item.id === "kinder"
    )!.pdfUrl;

    expect(getHandoutOpenHref(sourceUrl)).toBe(sourceUrl);
    expect(getHandoutDownloadHref(sourceUrl)).toBe(sourceUrl);
    expect(resolveHandoutAsset("kinder")?.sourceUrl).toBe(sourceUrl);
  });

  it("withholds text-only non-library handouts and their generated ids", () => {
    const sourceUrl = unterstuetzenItems.find(
      item => item.id === "drei-saeulen"
    )!.pdfUrl;

    expect(getHandoutOpenHref(sourceUrl)).toBeNull();
    expect(getHandoutDownloadHref(sourceUrl)).toBeNull();
    expect(
      resolveHandoutAsset(
        "unterstuetzen-drei-saeulen-hilfreicher-unterstuetzung"
      )
    ).toBeNull();
    expect(getHandoutAssetBySource(sourceUrl)).toBeNull();
  });

  it.each(["4-arten-von-grenzen", "stopp-technik"])(
    "keeps the public material id %s resolvable",
    id => {
      expect(resolveHandoutAsset(id)).toMatchObject({
        id,
        sourceKind: "local",
        textLayer: "present",
      });
    }
  );

  it("keeps local pdf paths on the same protected deploy", () => {
    expect(
      getHandoutOpenHref("/Notfallkarte-Zuerich-Psychische-Krise.pdf")
    ).toBeNull();
    expect(
      getHandoutDownloadHref("/Notfallkarte-Zuerich-Psychische-Krise.pdf")
    ).toBeNull();
    expect(
      getHandoutDownloadHref("/infografiken/puk-4-arten-von-grenzen-v1.pdf")
    ).toBe("/infografiken/puk-4-arten-von-grenzen-v1.pdf");
    expect(
      getHandoutAssetBySource("/infografiken/manus-kinder-v3.pdf")
    ).toMatchObject({
      id: "kinder",
      sourceKind: "local",
      textLayer: "present",
      preferredReadingFormat: "pdf",
    });
  });

  it("marks localized material pdfs as text-layer-present local assets", () => {
    const sourceUrl = verstehenInfografiken.find(
      item => item.id === "kinder"
    )!.pdfUrl;
    expect(getHandoutAssetBySource(sourceUrl)).toMatchObject({
      id: "kinder",
      sourceKind: "local",
      textLayer: "present",
      preferredReadingFormat: "pdf",
    });
  });

  it.each([
    ["radikale-akzeptanz", "/infografiken/puk-radikale-akzeptanz-v3.pdf"],
    ["gespraeche-kippen", "/infografiken/puk-gespraeche-kippen-v3.pdf"],
    ["beispiel-dialog", "/infografiken/puk-beispiel-dialog-v3.pdf"],
  ])("withholds the unapproved draft asset %s", (id, sourceUrl) => {
    expect(resolveHandoutAsset(id)).toBeNull();
    expect(getHandoutAssetBySource(sourceUrl)).toBeNull();
    expect(getHandoutOpenHref(sourceUrl)).toBeNull();
    expect(getHandoutDownloadHref(sourceUrl)).toBeNull();
  });

  it.each([
    ["notfallkarte-zuerich", "/Notfallkarte-Zuerich-Psychische-Krise.pdf"],
    ["4-phasen", "/infografiken/manus-4-phasen-v1.pdf"],
    ["im-krisenmodus", "/infografiken/ampel-das-ampel-system-v4.pdf"],
    ["notfallplan-krise", "/notfallplan-krise-v04.pdf"],
    ["spaltung", "/infografiken/pendel-das-bewertungs-pendel-v16.pdf"],
    ["wenn-worte-treffen", "/infografiken/manus-wenn-worte-treffen-v3.pdf"],
    ["leuchtturm", "/infografiken/manus-leuchtturm-v1.pdf"],
    ["eisberg", "/infografiken/eisberg-der-eisberg-v8.pdf"],
    ["alarm-modus", "/infografiken/alarm-der-alarm-modus-v4.pdf"],
    [
      "krisenkommunikation",
      "/infografiken/deeskalation-der-deeskalations-pfad-v11.pdf",
    ],
    ["anspannungskurve", "/infografiken/manus-anspannungskurve-v2.pdf"],
    [
      "grenzen-ohne-eskalation",
      "/infografiken/manus-grenzen-ohne-eskalation-v3.pdf",
    ],
    ["pause-statt-streit", "/infografiken/manus-pause-statt-streit-v3.pdf"],
    [
      "zuhoeren-ohne-zustimmen",
      "/infografiken/validierung-die-validierungs-treppe-v10.pdf",
    ],
    ["bruecke-gelaender", "/infografiken/manus-bruecke-gelaender-v2.pdf"],
    ["grenzen-erkennen", "/infografiken/manus-grenzen-erkennen-v1.pdf"],
    ["lmk", "/infografiken/manus-lmk-v1.pdf"],
    ["energie-konto", "/infografiken/manus-energie-konto-v1.pdf"],
    ["erlaubnis-karte", "/infografiken/manus-erlaubnis-karte-v1.pdf"],
    ["rolle-klaeren", "/infografiken/manus-rolle-klaeren-v3.pdf"],
    ["drei-saeulen", "/infografiken/manus-drei-saeulen-v1.pdf"],
    ["konsistenz-prinzip", "/infografiken/manus-konsistenz-prinzip-v1.pdf"],
    [
      "beziehungs-achtsamkeit",
      "/infografiken/manus-beziehungs-achtsamkeit-v1.pdf",
    ],
    ["6-leitlinien", "/infografiken/manus-6-leitlinien-v1.pdf"],
    ["4-alltags-tipps", "/infografiken/manus-4-alltags-tipps-v1.pdf"],
    ["sauerstoffmaske", "/infografiken/sauerstoff-die-sauerstoffmaske-v5.pdf"],
    ["gehirn", "/infografiken/manus-gehirn-v1.pdf"],
    ["gehirn", "/infografiken/puk-hohe-anspannung-v1.pdf"],
    ["zustands-landkarte", "/infografiken/puk-zustands-landkarte-v1.pdf"],
    ["remission-heilung", "/infografiken/manus-remission-heilung-v1.pdf"],
    ["5-faktoren-genesung", "/infografiken/manus-5-faktoren-genesung-v1.pdf"],
    [
      "rolle-genesungsprozess",
      "/infografiken/manus-rolle-genesungsprozess-v1.pdf",
    ],
    [
      "fortschritt-paradox",
      "/infografiken/fortschritt-das-fortschritt-paradox-v5.pdf",
    ],
    ["schuld-verantwortung", "/infografiken/manus-schuld-verantwortung-v3.pdf"],
  ])("withholds the superseded visual asset %s", (id, sourceUrl) => {
    expect(resolveHandoutAsset(id)).toBeNull();
    expect(getHandoutAssetBySource(sourceUrl)).toBeNull();
    expect(getHandoutOpenHref(sourceUrl)).toBeNull();
    expect(getHandoutDownloadHref(sourceUrl)).toBeNull();
  });
});
