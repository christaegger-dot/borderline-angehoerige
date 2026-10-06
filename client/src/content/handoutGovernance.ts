export type HandoutDocumentType =
  | "ORIENTIERUNGSBLATT"
  | "PRAXISBLATT"
  | "KRISEN-HANDOUT";

export type HandoutVisualAssetStatus = "published" | "text-only" | "web-only";
export type HandoutPublicationStatus = "active" | "withdrawn";
export type HandoutApprovalStatus =
  | "approved"
  | "draft-editorial-review-pending";

export interface HandoutGovernanceEntry {
  id: string;
  documentType: HandoutDocumentType;
  /**
   * Eine eigenständig gepflegte HTML-Webfassung darf auch dann aktiv bleiben,
   * wenn die zugehörigen statischen Visual-/PDF-Assets zurückgehalten werden.
   * Ohne explizites `true` gilt die Webfassung als nicht freigegeben.
   */
  webVersionPublished?: boolean;
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
   * Empfehlungsflächen zurück, bis ein freigegebenes Folge-Asset vorliegt.
   * `web-only` ist dagegen eine dauerhafte Formatentscheidung ohne separates
   * PDF-, Bild- oder Thumbnail-Asset. Eine HTML-Text- oder Webfassung bleibt
   * verfügbar, wenn sie separat gepflegt wird. Ohne Angabe gilt das
   * freigegebene Asset als publiziert.
   */
  visualAssetStatus?: HandoutVisualAssetStatus;
  /**
   * Frühere Asset-Pfade, die nicht mehr publiziert werden dürfen. Sie bleiben
   * explizit gesperrt, auch wenn die zugehörige Webfassung aktiv ist.
   */
  retiredAssetSources?: readonly string[];
  /**
   * `withdrawn` hält eine veraltete Fassung für die Historie im Register,
   * entfernt sie aber aus den produktiven Katalogen und Textversionen.
   */
  publicationStatus?: HandoutPublicationStatus;
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
    webVersionPublished: false,
    publicationStatus: "withdrawn",
    retiredAssetSources: [
      "/Notfallkarte-Zuerich-Psychische-Krise.pdf",
      "/notfallkarte-preview.webp",
    ],
  },
  "notfallplan-krise": {
    id: "notfallplan-krise",
    documentType: "KRISEN-HANDOUT",
    approvedVersion: "notfallplan-krise-v04",
    visualAssetStatus: "text-only",
  },
  leuchtturm: {
    id: "leuchtturm",
    documentType: "ORIENTIERUNGSBLATT",
    assetVersion: "puk-leuchtturm-orientierung-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-leuchtturm-v1.pdf",
      "/infografiken/manus-leuchtturm-v1.webp",
      "/infografiken/extras/thumbnails/manus-leuchtturm-v1.webp",
    ],
  },
  eisberg: {
    id: "eisberg",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "eisberg-der-eisberg-v8",
    visualAssetStatus: "text-only",
  },
  spaltung: {
    id: "spaltung",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "pendel-das-bewertungs-pendel-v16",
    visualAssetStatus: "text-only",
  },
  "alarm-modus": {
    id: "alarm-modus",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "alarm-der-alarm-modus-v4",
    visualAssetStatus: "text-only",
  },
  "4-phasen": {
    id: "4-phasen",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-4-phasen-v1",
    visualAssetStatus: "text-only",
    publicationStatus: "withdrawn",
  },
  "zustands-landkarte": {
    id: "zustands-landkarte",
    documentType: "ORIENTIERUNGSBLATT",
    assetVersion: "puk-zustands-landkarte-v1",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
  },
  gehirn: {
    id: "gehirn",
    documentType: "ORIENTIERUNGSBLATT",
    assetVersion: "puk-hohe-anspannung-v1",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: ["/infografiken/manus-gehirn-v1.pdf"],
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
    visualAssetStatus: "text-only",
  },
  "im-krisenmodus": {
    id: "im-krisenmodus",
    documentType: "KRISEN-HANDOUT",
    approvedVersion: "ampel-das-ampel-system-v4",
    visualAssetStatus: "text-only",
    publicationStatus: "withdrawn",
  },
  "drei-saeulen": {
    id: "drei-saeulen",
    documentType: "ORIENTIERUNGSBLATT",
    assetVersion: "puk-drei-orientierungspunkte-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-drei-saeulen-v1.pdf",
      "/infografiken/manus-drei-saeulen-v1.webp",
      "/infografiken/extras/thumbnails/manus-drei-saeulen-v1.webp",
    ],
  },
  "konsistenz-prinzip": {
    id: "konsistenz-prinzip",
    documentType: "PRAXISBLATT",
    assetVersion: "puk-verlaessliche-absprachen-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-konsistenz-prinzip-v1.pdf",
      "/infografiken/manus-konsistenz-prinzip-v1.webp",
      "/infografiken/extras/thumbnails/manus-konsistenz-prinzip-v1.webp",
    ],
  },
  "beziehungs-achtsamkeit": {
    id: "beziehungs-achtsamkeit",
    documentType: "PRAXISBLATT",
    assetVersion: "puk-beziehungs-achtsamkeit-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-beziehungs-achtsamkeit-v1.pdf",
      "/infografiken/manus-beziehungs-achtsamkeit-v1.webp",
      "/infografiken/extras/thumbnails/manus-beziehungs-achtsamkeit-v1.webp",
    ],
  },
  "6-leitlinien": {
    id: "6-leitlinien",
    documentType: "ORIENTIERUNGSBLATT",
    assetVersion: "puk-sechs-leitlinien-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-6-leitlinien-v1.pdf",
      "/infografiken/manus-6-leitlinien-v1.webp",
      "/infografiken/extras/thumbnails/manus-6-leitlinien-v1.webp",
    ],
  },
  "4-alltags-tipps": {
    id: "4-alltags-tipps",
    documentType: "PRAXISBLATT",
    assetVersion: "puk-vier-alltagsfragen-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-4-alltags-tipps-v1.pdf",
      "/infografiken/manus-4-alltags-tipps-v1.webp",
      "/infografiken/extras/thumbnails/manus-4-alltags-tipps-v1.webp",
    ],
  },
  krisenkommunikation: {
    id: "krisenkommunikation",
    documentType: "KRISEN-HANDOUT",
    approvedVersion: "deeskalation-der-deeskalations-pfad-v11",
    visualAssetStatus: "text-only",
  },
  anspannungskurve: {
    id: "anspannungskurve",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-anspannungskurve-v2",
    visualAssetStatus: "text-only",
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
    visualAssetStatus: "text-only",
  },
  "pause-statt-streit": {
    id: "pause-statt-streit",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-pause-statt-streit-v3",
    visualAssetStatus: "text-only",
  },
  "wenn-worte-treffen": {
    id: "wenn-worte-treffen",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-wenn-worte-treffen-v3",
    visualAssetStatus: "text-only",
  },
  "zuhoeren-ohne-zustimmen": {
    id: "zuhoeren-ohne-zustimmen",
    documentType: "PRAXISBLATT",
    approvedVersion: "validierung-die-validierungs-treppe-v10",
    visualAssetStatus: "text-only",
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
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/puk-dear-v1.pdf",
      "/infografiken/puk-dear-v1.webp",
      "/infografiken/extras/thumbnails/puk-dear-v1.webp",
    ],
  },
  "bruecke-gelaender": {
    id: "bruecke-gelaender",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-bruecke-gelaender-v2",
    visualAssetStatus: "text-only",
  },
  "spiegeln-statt-aufsaugen": {
    id: "spiegeln-statt-aufsaugen",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-spiegeln-statt-aufsaugen-v3",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-spiegeln-statt-aufsaugen-v3.pdf",
      "/infografiken/manus-spiegeln-statt-aufsaugen-v3.webp",
      "/infografiken/extras/thumbnails/manus-spiegeln-statt-aufsaugen-v3-thumb.png",
    ],
  },
  "4-arten-von-grenzen": {
    id: "4-arten-von-grenzen",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "puk-4-arten-von-grenzen-v1",
  },
  "grenzen-erkennen": {
    id: "grenzen-erkennen",
    documentType: "ORIENTIERUNGSBLATT",
    assetVersion: "puk-grenzen-ueberlastung-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-grenzen-erkennen-v1.pdf",
      "/infografiken/manus-grenzen-erkennen-v1.webp",
      "/infografiken/extras/thumbnails/manus-grenzen-erkennen-v1.webp",
    ],
  },
  lmk: {
    id: "lmk",
    documentType: "PRAXISBLATT",
    assetVersion: "puk-grenze-in-handlung-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-lmk-v1.pdf",
      "/infografiken/manus-lmk-v1.webp",
      "/infografiken/extras/thumbnails/manus-lmk-v1.webp",
    ],
  },
  "grenzen-spickzettel": {
    id: "grenzen-spickzettel",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-grenzen-spickzettel-v2",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-grenzen-spickzettel-v2.pdf",
      "/infografiken/manus-grenzen-spickzettel-v2.webp",
      "/infografiken/extras/thumbnails/manus-grenzen-spickzettel-v2-thumb.png",
    ],
  },
  warnsignale: {
    id: "warnsignale",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-warnsignale-v3",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-warnsignale-v3.pdf",
      "/infografiken/manus-warnsignale-v3.webp",
      "/infografiken/extras/thumbnails/manus-warnsignale-v3-thumb.png",
    ],
  },
  sauerstoffmaske: {
    id: "sauerstoffmaske",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "sauerstoff-die-sauerstoffmaske-v5",
    visualAssetStatus: "text-only",
  },
  "stopp-technik": {
    id: "stopp-technik",
    documentType: "PRAXISBLATT",
    approvedVersion: "manus-stopp-technik-v3",
  },
  "energie-konto": {
    id: "energie-konto",
    documentType: "PRAXISBLATT",
    assetVersion: "puk-energie-konto-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-energie-konto-v1.pdf",
      "/infografiken/manus-energie-konto-v1.webp",
      "/infografiken/extras/thumbnails/manus-energie-konto-v1.webp",
    ],
  },
  "erlaubnis-karte": {
    id: "erlaubnis-karte",
    documentType: "PRAXISBLATT",
    assetVersion: "puk-erlaubnis-karte-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-erlaubnis-karte-v1.pdf",
      "/infografiken/manus-erlaubnis-karte-v1.webp",
      "/infografiken/extras/thumbnails/manus-erlaubnis-karte-v1.webp",
    ],
  },
  "schuld-verantwortung": {
    id: "schuld-verantwortung",
    documentType: "ORIENTIERUNGSBLATT",
    approvedVersion: "manus-schuld-verantwortung-v3",
    visualAssetStatus: "text-only",
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
    visualAssetStatus: "text-only",
  },
  "remission-heilung": {
    id: "remission-heilung",
    documentType: "ORIENTIERUNGSBLATT",
    assetVersion: "puk-remission-recovery-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-remission-heilung-v1.pdf",
      "/infografiken/manus-remission-heilung-v1.webp",
      "/infografiken/extras/thumbnails/manus-remission-heilung-v1.webp",
    ],
  },
  "5-faktoren-genesung": {
    id: "5-faktoren-genesung",
    documentType: "ORIENTIERUNGSBLATT",
    assetVersion: "puk-genesungsbedingungen-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-5-faktoren-genesung-v1.pdf",
      "/infografiken/manus-5-faktoren-genesung-v1.webp",
      "/infografiken/extras/thumbnails/manus-5-faktoren-genesung-v1.webp",
    ],
  },
  "rolle-genesungsprozess": {
    id: "rolle-genesungsprozess",
    documentType: "ORIENTIERUNGSBLATT",
    assetVersion: "puk-rolle-genesungsprozess-v2",
    approvalStatus: "draft-editorial-review-pending",
    visualAssetStatus: "text-only",
    retiredAssetSources: [
      "/infografiken/manus-rolle-genesungsprozess-v1.pdf",
      "/infografiken/manus-rolle-genesungsprozess-v1.webp",
      "/infografiken/extras/thumbnails/manus-rolle-genesungsprozess-v1.webp",
    ],
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
  const governance = getHandoutGovernance(id);
  if (!governance) return "draft-editorial-review-pending";
  return governance.approvalStatus ?? "approved";
}

export function isHandoutVisualPublished(id: string | undefined) {
  const governance = getHandoutGovernance(id);
  return Boolean(
    governance &&
    governance.publicationStatus !== "withdrawn" &&
    (governance.visualAssetStatus === undefined ||
      governance.visualAssetStatus === "published") &&
    getHandoutApprovalStatus(governance.id) === "approved"
  );
}

export function isHandoutWebVersionPublished(id: string | undefined) {
  const governance = getHandoutGovernance(id);
  return Boolean(
    governance &&
    governance.publicationStatus !== "withdrawn" &&
    governance.webVersionPublished === true &&
    getHandoutApprovalStatus(governance.id) === "approved"
  );
}

export function allowsCrisisNumbers(id: string) {
  return requireHandoutGovernance(id).documentType === "KRISEN-HANDOUT";
}

export function requiresStandardDisclaimer(id: string) {
  return requireHandoutGovernance(id).documentType !== "KRISEN-HANDOUT";
}
