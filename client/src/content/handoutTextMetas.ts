import { createHandoutTextVersionMeta } from "./handoutTextVersionRegistry";

export const HANDOUT_TEXT_VERSION_IDS = [
  "notfallplan-krise",
  "leuchtturm",
  "rolle-klaeren",
  "im-krisenmodus",
  "drei-saeulen",
  "konsistenz-prinzip",
  "beziehungs-achtsamkeit",
  "6-leitlinien",
  "4-alltags-tipps",
  "eisberg",
  "spaltung",
  "krisenkommunikation",
  "alarm-modus",
  "4-phasen",
  "gehirn",
  "warnsignale",
  "sauerstoffmaske",
  "stopp-technik",
  "energie-konto",
  "erlaubnis-karte",
  "schuld-verantwortung",
  "radikale-akzeptanz",
  "wenn-worte-treffen",
  "gespraeche-kippen",
  "grenzen-ohne-eskalation",
  "pause-statt-streit",
  "zuhoeren-ohne-zustimmen",
  "beispiel-dialog",
  "dear",
  "spiegeln-statt-aufsaugen",
  "4-arten-von-grenzen",
  "grenzen-erkennen",
  "lmk",
  "genesung-zahlen",
  "fortschritt-paradox",
  "remission-heilung",
  "5-faktoren-genesung",
  "rolle-genesungsprozess",
  "kinder",
  "grenzen-spickzettel",
] as const;

export const handoutTextVersionMetas = HANDOUT_TEXT_VERSION_IDS.map(id =>
  createHandoutTextVersionMeta(id)
);

const handoutTextVersionMetasById = new Map(
  handoutTextVersionMetas.map(version => [version.id, version])
);
const handoutTextVersionMetasBySource = new Map(
  handoutTextVersionMetas.map(version => [version.pdfSourceUrl, version])
);

export function getHandoutTextVersionMeta(id: string | undefined) {
  if (!id) {
    return null;
  }

  return handoutTextVersionMetasById.get(id) ?? null;
}

export function getHandoutTextVersionBySource(sourceUrl: string | undefined) {
  if (!sourceUrl) {
    return null;
  }

  return handoutTextVersionMetasBySource.get(sourceUrl) ?? null;
}

export function getHandoutTextVersionHrefBySource(
  sourceUrl: string | undefined
) {
  return getHandoutTextVersionBySource(sourceUrl)?.path ?? null;
}
