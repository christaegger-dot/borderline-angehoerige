export type HandoutDocumentType =
  | "ORIENTIERUNGSBLATT"
  | "PRAXISBLATT"
  | "KRISEN-HANDOUT";

export interface HandoutGovernanceEntry {
  id: string;
  documentType: HandoutDocumentType;
  /**
   * Freigegebener Asset-Dateistamm ohne Erweiterung.
   * Nicht automatisch die hoechste vorhandene Version: alte Assets koennen
   * bewusst gelockt bleiben, bis sie fachlich/designseitig freigegeben sind.
   */
  approvedVersion: string;
}

export const HANDOUT_STANDARD_DISCLAIMER =
  "Dieses Blatt ersetzt keine persönliche Beratung oder Behandlung.";

export const handoutGovernance = {
  "notfallkarte-zuerich": {
    id: "notfallkarte-zuerich",
    documentType: "KRISEN-HANDOUT",
    approvedVersion: "Notfallkarte-Zuerich-Psychische-Krise",
  },
  "notfallplan-krise": {
    id: "notfallplan-krise",
    documentType: "KRISEN-HANDOUT",
    approvedVersion: "notfallplan-krise-v04",
  },
  leuchtturm: {
    id: "leuchtturm",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-leuchtturm-v1",
  },
  eisberg: {
    id: "eisberg",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "eisberg-der-eisberg-v8",
  },
  spaltung: {
    id: "spaltung",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "pendel-das-bewertungs-pendel-v16",
  },
  "alarm-modus": {
    id: "alarm-modus",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "alarm-der-alarm-modus-v4",
  },
  "4-phasen": {
    id: "4-phasen",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-4-phasen-v1",
  },
  gehirn: {
    id: "gehirn",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-gehirn-v1",
  },
  kinder: {
    id: "kinder",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-kinder-v1",
  },
  "rolle-klaeren": {
    id: "rolle-klaeren",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-rolle-klaeren-v3",
  },
  "im-krisenmodus": {
    id: "im-krisenmodus",
    documentType: "KRISEN-HANDOUT",
    approvedVersion: "ampel-das-ampel-system-v4",
  },
  "drei-saeulen": {
    id: "drei-saeulen",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-drei-saeulen-v1",
  },
  "konsistenz-prinzip": {
    id: "konsistenz-prinzip",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-konsistenz-prinzip-v1",
  },
  "beziehungs-achtsamkeit": {
    id: "beziehungs-achtsamkeit",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-beziehungs-achtsamkeit-v1",
  },
  "6-leitlinien": {
    id: "6-leitlinien",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-6-leitlinien-v1",
  },
  "4-alltags-tipps": {
    id: "4-alltags-tipps",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-4-alltags-tipps-v1",
  },
  krisenkommunikation: {
    id: "krisenkommunikation",
    documentType: "KRISEN-HANDOUT",
    approvedVersion: "deeskalation-der-deeskalations-pfad-v11",
  },
  anspannungskurve: {
    id: "anspannungskurve",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-anspannungskurve-v2",
  },
  "gespraeche-kippen": {
    id: "gespraeche-kippen",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-gespraeche-kippen-v1",
  },
  "grenzen-ohne-eskalation": {
    id: "grenzen-ohne-eskalation",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-grenzen-ohne-eskalation-v3",
  },
  "pause-statt-streit": {
    id: "pause-statt-streit",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-pause-statt-streit-v3",
  },
  "wenn-worte-treffen": {
    id: "wenn-worte-treffen",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-wenn-worte-treffen-v3",
  },
  "zuhoeren-ohne-zustimmen": {
    id: "zuhoeren-ohne-zustimmen",
    documentType: "PRAXISBLATT",
    approvedVersion: "validierung-die-validierungs-treppe-v10",
  },
  "beispiel-dialog": {
    id: "beispiel-dialog",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-beispiel-dialog-v1",
  },
  dear: {
    id: "dear",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-dear-v1",
  },
  "bruecke-gelaender": {
    id: "bruecke-gelaender",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-bruecke-gelaender-v2",
  },
  "spiegeln-statt-aufsaugen": {
    id: "spiegeln-statt-aufsaugen",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-spiegeln-statt-aufsaugen-v3",
  },
  "4-arten-von-grenzen": {
    id: "4-arten-von-grenzen",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "grenzen-die-4-arten-von-grenzen-v5",
  },
  "grenzen-erkennen": {
    id: "grenzen-erkennen",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-grenzen-erkennen-v1",
  },
  lmk: {
    id: "lmk",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-lmk-v1",
  },
  "grenzen-spickzettel": {
    id: "grenzen-spickzettel",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-grenzen-spickzettel-v2",
  },
  warnsignale: {
    id: "warnsignale",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-warnsignale-v3",
  },
  sauerstoffmaske: {
    id: "sauerstoffmaske",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "sauerstoff-die-sauerstoffmaske-v5",
  },
  "stopp-technik": {
    id: "stopp-technik",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-stopp-technik-v1",
  },
  "energie-konto": {
    id: "energie-konto",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-energie-konto-v1",
  },
  "erlaubnis-karte": {
    id: "erlaubnis-karte",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-erlaubnis-karte-v1",
  },
  "schuld-verantwortung": {
    id: "schuld-verantwortung",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-schuld-verantwortung-v3",
  },
  "radikale-akzeptanz": {
    id: "radikale-akzeptanz",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-radikale-akzeptanz-v1",
  },
  garten: {
    id: "garten",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-garten-v2",
  },
  "genesung-zahlen": {
    id: "genesung-zahlen",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-genesung-zahlen-v1",
  },
  "fortschritt-paradox": {
    id: "fortschritt-paradox",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "fortschritt-das-fortschritt-paradox-v5",
  },
  "remission-heilung": {
    id: "remission-heilung",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-remission-heilung-v1",
  },
  "5-faktoren-genesung": {
    id: "5-faktoren-genesung",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-5-faktoren-genesung-v1",
  },
  "rolle-genesungsprozess": {
    id: "rolle-genesungsprozess",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-rolle-genesungsprozess-v1",
  },
} as const satisfies Record<string, HandoutGovernanceEntry>;

export function getHandoutGovernance(id: string | undefined) {
  if (!id) {
    return null;
  }

  return handoutGovernance[id as keyof typeof handoutGovernance] ?? null;
}

export function requireHandoutGovernance(id: string) {
  const governance = getHandoutGovernance(id);
  if (!governance) {
    throw new Error(`Missing handout governance entry: ${id}`);
  }

  return governance;
}

export function allowsCrisisNumbers(id: string) {
  return requireHandoutGovernance(id).documentType === "KRISEN-HANDOUT";
}

export function requiresStandardDisclaimer(id: string) {
  return requireHandoutGovernance(id).documentType !== "KRISEN-HANDOUT";
}
