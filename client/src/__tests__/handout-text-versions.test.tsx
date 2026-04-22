import { describe, expect, it } from "vitest";
import {
  getHandoutTextVersionMeta,
  getHandoutTextVersionBySource,
  getHandoutTextVersionHrefBySource,
} from "@/content/handoutTextVersions";
import { genesungItems } from "@/content/genesung";
import { grenzenItems } from "@/content/grenzen";
import { kommItems } from "@/content/kommunizieren";
import { materials } from "@/content/materialien";
import { selbstfuersorgeInfografiken } from "@/content/selbstfuersorge";
import { unterstuetzenItems } from "@/content/unterstuetzen";
import { verstehenInfografiken } from "@/content/verstehen";

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
    const sauerstoffmaskePdf = selbstfuersorgeInfografiken.find(
      item => item.id === "sauerstoffmaske"
    )?.pdf;
    const stoppTechnikPdf = selbstfuersorgeInfografiken.find(
      item => item.id === "stopp-technik"
    )?.pdf;
    const energieKontoPdf = selbstfuersorgeInfografiken.find(
      item => item.id === "energie-konto"
    )?.pdf;
    const erlaubnisKartePdf = selbstfuersorgeInfografiken.find(
      item => item.id === "erlaubnis-karte"
    )?.pdf;
    const schuldVerantwortungPdf = materials.find(
      item => item.id === "schuld-verantwortung"
    )?.downloadUrl;
    const radikaleAkzeptanzPdf = materials.find(
      item => item.id === "radikale-akzeptanz"
    )?.downloadUrl;
    const wennWorteTreffenPdf = materials.find(
      item => item.id === "wenn-worte-treffen"
    )?.downloadUrl;
    const gespraecheKippenPdf = kommItems.find(
      item => item.id === "gespraeche-kippen"
    )?.pdfUrl;
    const grenzenOhneEskalationPdf = kommItems.find(
      item => item.id === "grenzen-ohne-eskalation"
    )?.pdfUrl;
    const pauseStattStreitPdf = kommItems.find(
      item => item.id === "pause-statt-streit"
    )?.pdfUrl;
    const zuhoerenOhneZustimmenPdf = kommItems.find(
      item => item.id === "zuhoeren-ohne-zustimmen"
    )?.pdfUrl;
    const beispielDialogPdf = kommItems.find(
      item => item.id === "beispiel-dialog"
    )?.pdfUrl;
    const dearPdf = materials.find(item => item.id === "dear")?.downloadUrl;
    const spiegelnPdf = grenzenItems.find(
      item => item.id === "spiegeln-statt-aufsaugen"
    )?.pdfUrl;
    const vierArtenGrenzenPdf = grenzenItems.find(
      item => item.id === "4-arten-von-grenzen"
    )?.pdfUrl;
    const grenzenErkennenPdf = grenzenItems.find(
      item => item.id === "grenzen-erkennen"
    )?.pdfUrl;
    const lmkPdf = grenzenItems.find(item => item.id === "lmk")?.pdfUrl;
    const genesungZahlenPdf = materials.find(
      item => item.id === "genesung-zahlen"
    )?.downloadUrl;
    const fortschrittParadoxPdf = genesungItems.find(
      item => item.id === "fortschritt-paradox"
    )?.pdf;
    const remissionHeilungPdf = genesungItems.find(
      item => item.id === "remission-heilung"
    )?.pdf;
    const genesungFaktorenPdf = genesungItems.find(
      item => item.id === "5-faktoren-genesung"
    )?.pdf;
    const rolleGenesungsprozessPdf = genesungItems.find(
      item => item.id === "rolle-genesungsprozess"
    )?.pdf;
    const kinderPdf = materials.find(item => item.id === "kinder")?.downloadUrl;
    const notfallplanPdf = materials.find(
      item => item.id === "notfallplan-krise"
    )?.downloadUrl;
    const imKrisenmodusPdf = unterstuetzenItems.find(
      item => item.id === "im-krisenmodus"
    )?.pdfUrl;
    const dreiSaeulenPdf = unterstuetzenItems.find(
      item => item.id === "drei-saeulen"
    )?.pdfUrl;
    const konsistenzPrinzipPdf = unterstuetzenItems.find(
      item => item.id === "konsistenz-prinzip"
    )?.pdfUrl;
    const beziehungsAchtsamkeitPdf = unterstuetzenItems.find(
      item => item.id === "beziehungs-achtsamkeit"
    )?.pdfUrl;
    const sechsLeitlinienPdf = unterstuetzenItems.find(
      item => item.id === "6-leitlinien"
    )?.pdfUrl;
    const vierAlltagsTippsPdf = unterstuetzenItems.find(
      item => item.id === "4-alltags-tipps"
    )?.pdfUrl;
    const vierPhasenPdf = verstehenInfografiken.find(
      item => item.id === "4-phasen"
    )?.pdfUrl;
    const gehirnPdf = verstehenInfografiken.find(
      item => item.id === "gehirn"
    )?.pdfUrl;

    expect(getHandoutTextVersionMeta("notfallplan-krise")?.path).toBe(
      "/materialien/text/notfallplan-krise"
    );
    expect(getHandoutTextVersionMeta("leuchtturm")?.path).toBe(
      "/materialien/text/leuchtturm"
    );
    expect(getHandoutTextVersionMeta("eisberg")?.path).toBe(
      "/materialien/text/eisberg"
    );
    expect(getHandoutTextVersionMeta("spaltung")?.path).toBe(
      "/materialien/text/spaltung"
    );
    expect(getHandoutTextVersionMeta("alarm-modus")?.path).toBe(
      "/materialien/text/alarm-modus"
    );
    expect(getHandoutTextVersionMeta("rolle-klaeren")?.path).toBe(
      "/materialien/text/rolle-klaeren"
    );
    expect(getHandoutTextVersionMeta("im-krisenmodus")?.path).toBe(
      "/materialien/text/im-krisenmodus"
    );
    expect(getHandoutTextVersionMeta("drei-saeulen")?.path).toBe(
      "/materialien/text/drei-saeulen"
    );
    expect(getHandoutTextVersionMeta("konsistenz-prinzip")?.path).toBe(
      "/materialien/text/konsistenz-prinzip"
    );
    expect(getHandoutTextVersionMeta("beziehungs-achtsamkeit")?.path).toBe(
      "/materialien/text/beziehungs-achtsamkeit"
    );
    expect(getHandoutTextVersionMeta("6-leitlinien")?.path).toBe(
      "/materialien/text/6-leitlinien"
    );
    expect(getHandoutTextVersionMeta("4-alltags-tipps")?.path).toBe(
      "/materialien/text/4-alltags-tipps"
    );
    expect(getHandoutTextVersionMeta("krisenkommunikation")?.path).toBe(
      "/materialien/text/krisenkommunikation"
    );
    expect(getHandoutTextVersionMeta("grenzen-spickzettel")?.path).toBe(
      "/materialien/text/grenzen-spickzettel"
    );
    expect(getHandoutTextVersionMeta("warnsignale")?.path).toBe(
      "/materialien/text/warnsignale"
    );
    expect(getHandoutTextVersionMeta("sauerstoffmaske")?.path).toBe(
      "/materialien/text/sauerstoffmaske"
    );
    expect(getHandoutTextVersionMeta("stopp-technik")?.path).toBe(
      "/materialien/text/stopp-technik"
    );
    expect(getHandoutTextVersionMeta("energie-konto")?.path).toBe(
      "/materialien/text/energie-konto"
    );
    expect(getHandoutTextVersionMeta("erlaubnis-karte")?.path).toBe(
      "/materialien/text/erlaubnis-karte"
    );
    expect(getHandoutTextVersionMeta("schuld-verantwortung")?.path).toBe(
      "/materialien/text/schuld-verantwortung"
    );
    expect(getHandoutTextVersionMeta("radikale-akzeptanz")?.path).toBe(
      "/materialien/text/radikale-akzeptanz"
    );
    expect(getHandoutTextVersionMeta("wenn-worte-treffen")?.path).toBe(
      "/materialien/text/wenn-worte-treffen"
    );
    expect(getHandoutTextVersionMeta("gespraeche-kippen")?.path).toBe(
      "/materialien/text/gespraeche-kippen"
    );
    expect(getHandoutTextVersionMeta("grenzen-ohne-eskalation")?.path).toBe(
      "/materialien/text/grenzen-ohne-eskalation"
    );
    expect(getHandoutTextVersionMeta("pause-statt-streit")?.path).toBe(
      "/materialien/text/pause-statt-streit"
    );
    expect(getHandoutTextVersionMeta("zuhoeren-ohne-zustimmen")?.path).toBe(
      "/materialien/text/zuhoeren-ohne-zustimmen"
    );
    expect(getHandoutTextVersionMeta("beispiel-dialog")?.path).toBe(
      "/materialien/text/beispiel-dialog"
    );
    expect(getHandoutTextVersionMeta("dear")?.path).toBe(
      "/materialien/text/dear"
    );
    expect(getHandoutTextVersionMeta("spiegeln-statt-aufsaugen")?.path).toBe(
      "/materialien/text/spiegeln-statt-aufsaugen"
    );
    expect(getHandoutTextVersionMeta("4-arten-von-grenzen")?.path).toBe(
      "/materialien/text/4-arten-von-grenzen"
    );
    expect(getHandoutTextVersionMeta("grenzen-erkennen")?.path).toBe(
      "/materialien/text/grenzen-erkennen"
    );
    expect(getHandoutTextVersionMeta("lmk")?.path).toBe(
      "/materialien/text/lmk"
    );
    expect(getHandoutTextVersionMeta("genesung-zahlen")?.path).toBe(
      "/materialien/text/genesung-zahlen"
    );
    expect(getHandoutTextVersionMeta("fortschritt-paradox")?.path).toBe(
      "/materialien/text/fortschritt-paradox"
    );
    expect(getHandoutTextVersionMeta("remission-heilung")?.path).toBe(
      "/materialien/text/remission-heilung"
    );
    expect(getHandoutTextVersionMeta("5-faktoren-genesung")?.path).toBe(
      "/materialien/text/5-faktoren-genesung"
    );
    expect(getHandoutTextVersionMeta("rolle-genesungsprozess")?.path).toBe(
      "/materialien/text/rolle-genesungsprozess"
    );
    expect(getHandoutTextVersionMeta("4-phasen")?.path).toBe(
      "/materialien/text/4-phasen"
    );
    expect(getHandoutTextVersionMeta("gehirn")?.path).toBe(
      "/materialien/text/gehirn"
    );
    expect(getHandoutTextVersionMeta("kinder")?.path).toBe(
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
    expect(getHandoutTextVersionHrefBySource(imKrisenmodusPdf)).toBe(
      "/materialien/text/im-krisenmodus"
    );
    expect(getHandoutTextVersionHrefBySource(dreiSaeulenPdf)).toBe(
      "/materialien/text/drei-saeulen"
    );
    expect(getHandoutTextVersionHrefBySource(konsistenzPrinzipPdf)).toBe(
      "/materialien/text/konsistenz-prinzip"
    );
    expect(getHandoutTextVersionHrefBySource(beziehungsAchtsamkeitPdf)).toBe(
      "/materialien/text/beziehungs-achtsamkeit"
    );
    expect(getHandoutTextVersionHrefBySource(sechsLeitlinienPdf)).toBe(
      "/materialien/text/6-leitlinien"
    );
    expect(getHandoutTextVersionHrefBySource(vierAlltagsTippsPdf)).toBe(
      "/materialien/text/4-alltags-tipps"
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
    expect(getHandoutTextVersionHrefBySource(sauerstoffmaskePdf)).toBe(
      "/materialien/text/sauerstoffmaske"
    );
    expect(getHandoutTextVersionHrefBySource(stoppTechnikPdf)).toBe(
      "/materialien/text/stopp-technik"
    );
    expect(getHandoutTextVersionHrefBySource(energieKontoPdf)).toBe(
      "/materialien/text/energie-konto"
    );
    expect(getHandoutTextVersionHrefBySource(erlaubnisKartePdf)).toBe(
      "/materialien/text/erlaubnis-karte"
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
    expect(getHandoutTextVersionHrefBySource(gespraecheKippenPdf)).toBe(
      "/materialien/text/gespraeche-kippen"
    );
    expect(getHandoutTextVersionHrefBySource(grenzenOhneEskalationPdf)).toBe(
      "/materialien/text/grenzen-ohne-eskalation"
    );
    expect(getHandoutTextVersionHrefBySource(pauseStattStreitPdf)).toBe(
      "/materialien/text/pause-statt-streit"
    );
    expect(getHandoutTextVersionHrefBySource(zuhoerenOhneZustimmenPdf)).toBe(
      "/materialien/text/zuhoeren-ohne-zustimmen"
    );
    expect(getHandoutTextVersionHrefBySource(beispielDialogPdf)).toBe(
      "/materialien/text/beispiel-dialog"
    );
    expect(getHandoutTextVersionHrefBySource(dearPdf)).toBe(
      "/materialien/text/dear"
    );
    expect(getHandoutTextVersionHrefBySource(spiegelnPdf)).toBe(
      "/materialien/text/spiegeln-statt-aufsaugen"
    );
    expect(getHandoutTextVersionHrefBySource(vierArtenGrenzenPdf)).toBe(
      "/materialien/text/4-arten-von-grenzen"
    );
    expect(getHandoutTextVersionHrefBySource(grenzenErkennenPdf)).toBe(
      "/materialien/text/grenzen-erkennen"
    );
    expect(getHandoutTextVersionHrefBySource(lmkPdf)).toBe(
      "/materialien/text/lmk"
    );
    expect(getHandoutTextVersionHrefBySource(genesungZahlenPdf)).toBe(
      "/materialien/text/genesung-zahlen"
    );
    expect(getHandoutTextVersionHrefBySource(fortschrittParadoxPdf)).toBe(
      "/materialien/text/fortschritt-paradox"
    );
    expect(getHandoutTextVersionHrefBySource(remissionHeilungPdf)).toBe(
      "/materialien/text/remission-heilung"
    );
    expect(getHandoutTextVersionHrefBySource(genesungFaktorenPdf)).toBe(
      "/materialien/text/5-faktoren-genesung"
    );
    expect(getHandoutTextVersionHrefBySource(rolleGenesungsprozessPdf)).toBe(
      "/materialien/text/rolle-genesungsprozess"
    );
    expect(getHandoutTextVersionHrefBySource(vierPhasenPdf)).toBe(
      "/materialien/text/4-phasen"
    );
    expect(getHandoutTextVersionHrefBySource(gehirnPdf)).toBe(
      "/materialien/text/gehirn"
    );
    expect(getHandoutTextVersionHrefBySource(kinderPdf)).toBe(
      "/materialien/text/kinder"
    );
    expect(getHandoutTextVersionHrefBySource(notfallplanPdf)).toBe(
      "/materialien/text/notfallplan-krise"
    );
    expect(
      getHandoutTextVersionBySource("/notfallplan-krise-v03.pdf")?.path
    ).toBe("/materialien/text/notfallplan-krise");
  });
});
