export type HandoutDocumentType =
  | "ORIENTIERUNGSBLATT"
  | "PRAXISBLATT"
  | "KRISEN-HANDOUT";

export type HandoutVisualAssetStatus = "published" | "text-only";
export type HandoutApprovalStatus =
  | "approved"
  | "draft-editorial-review-pending";

export interface HandoutGovernanceEntry {
  id: string;
  documentType: HandoutDocumentType;
  /**
   * Freigegebener Asset-Dateistamm ohne Erweiterung.
   * Nicht automatisch die hoechste vorhandene Version: alte Assets koennen
   * bewusst gelockt bleiben, bis sie fachlich/designseitig freigegeben sind.
   */
  approvedVersion?: string;
  /**
   * Dateistamm eines Entwurfs, der technisch eingebunden ist, aber noch keine
   * fachlich-redaktionelle Freigabe besitzt. Darf nicht zugleich mit
   * `approvedVersion` gesetzt werden.
   */
  assetVersion?: string;
  approvalStatus?: HandoutApprovalStatus;
  /**
   * `text-only` zieht eine fachlich oder visuell veraltete Druckgrafik aus den
   * Empfehlungsflächen zurück. Die aktuelle HTML-Textversion bleibt verfügbar.
   * Ohne Angabe gilt das freigegebene Asset als publiziert.
   */
  visualAssetStatus?: HandoutVisualAssetStatus;
}

export const HANDOUT_STANDARD_DISCLAIMER =
  "Dieses Blatt ersetzt keine persönliche Beratung oder Behandlung.";

export const HANDOUT_VISUAL_REFRESH_NOTE =
  "Die Druckgrafik und das PDF werden fachlich und visuell überarbeitet. Nutzen Sie bis dahin die aktuelle Textversion.";

export const HANDOUT_EDITORIAL_DRAFT_NOTE =
  "Entwurf – fachlich-redaktionelle Freigabe ausstehend.";

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
    visualAssetStatus: "text-only",
  },
  gehirn: {
    id: "gehirn",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-gehirn-v1",
    visualAssetStatus: "text-only",
  },
  kinder: {
    id: "kinder",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-kinder-v3",
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
    assetVersion: "puk-gespraeche-kippen-v3",
    approvalStatus: "draft-editorial-review-pending",
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
    assetVersion: "puk-beispiel-dialog-v3",
    approvalStatus: "draft-editorial-review-pending",
  },
  dear: {
    id: "dear",
    documentType: "PRAXISBLATT",
    approvedVersion: "puk-dear-v1",
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
    approvedVersion: "puk-4-arten-von-grenzen-v1",
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
    approvedVersion: "manus-stopp-technik-v3",
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
    assetVersion: "puk-radikale-akzeptanz-v3",
    approvalStatus: "draft-editorial-review-pending",
  },
  garten: {
    id: "garten",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "puk-garten-v1",
  },
  "genesung-zahlen": {
    id: "genesung-zahlen",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-genesung-zahlen-v3",
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
    visualAssetStatus: "text-only",
  },
  "5-faktoren-genesung": {
    id: "5-faktoren-genesung",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-5-faktoren-genesung-v1",
    visualAssetStatus: "text-only",
  },
  "rolle-genesungsprozess": {
    id: "rolle-genesungsprozess",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-rolle-genesungsprozess-v1",
    visualAssetStatus: "text-only",
  },
} as const satisfies Record<string, HandoutGovernanceEntry>;

export function getHandoutGovernance(
  id: string | undefined
): HandoutGovernanceEntry | null {
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

export function getHandoutAssetVersion(
  governance: HandoutGovernanceEntry
): string {
  const version = governance.approvedVersion ?? governance.assetVersion;
  if (!version) {
    throw new Error(`Missing handout asset version: ${governance.id}`);
  }
  return version;
}

export function getHandoutApprovalStatus(id: string | undefined) {
  return getHandoutGovernance(id)?.approvalStatus ?? "approved";
}

export function isHandoutVisualPublished(id: string | undefined) {
  const governance = getHandoutGovernance(id);
  return governance?.visualAssetStatus !== "text-only";
}

export function allowsCrisisNumbers(id: string) {
  return requireHandoutGovernance(id).documentType === "KRISEN-HANDOUT";
}

export function requiresStandardDisclaimer(id: string) {
  return requireHandoutGovernance(id).documentType !== "KRISEN-HANDOUT";
}
