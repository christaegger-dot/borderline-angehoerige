export type MaterialCategory =
  | "alle"
  | "verstehen"
  | "unterstuetzen"
  | "kommunizieren"
  | "grenzen"
  | "selbstfuersorge"
  | "genesung"
  | "soforthilfe";

export interface MaterialItem {
  id: string;
  title: string;
  description: string;
  category: Exclude<MaterialCategory, "alle">;
  kind:
    | "Infografik"
    | "Spickzettel"
    | "Checkliste"
    | "Notfallkarte"
    | "Notfallplan";
  url: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
  pdfUrl?: string;
  previewUrl?: string;
  isHtml?: boolean;
  priority?: "core" | "secondary";
  /** Datum der letzten Prüfung/Erstellung im Format MMMM YYYY (z.B. 'April 2025') */
  verifiedAt?: string;
}

export interface ResolvedMaterialDownload {
  id: string;
  title: string;
  fileName: string;
  sourceUrl: string;
}

export const materials: MaterialItem[] = [
  {
    id: "notfallkarte-zuerich",
    title: "Notfallkarte Zürich – Psychische Krise",
    description:
      "Alle wichtigen Nummern für Angehörige auf einer A4-Seite. Für akute Orientierung, wenn rasches Handeln nötig ist.",
    category: "soforthilfe",
    kind: "Notfallkarte",
    url: "/notfallkarte",
    previewUrl: "/notfallkarte-preview.webp",
    downloadUrl: "/notfallkarte",
    pdfUrl: "/Notfallkarte-Zuerich-Psychische-Krise.pdf",
    isHtml: true,
    priority: "core",
    verifiedAt: "April 2026",
  },
  {
    id: "notfallplan-krise",
    title: "Notfallplan Krise – Suizidgedanken & Selbstverletzung",
    description:
      "Knappe 4-Schritte-Anleitung für Angehörige bei Suizidgedanken oder Selbstverletzung.",
    category: "soforthilfe",
    kind: "Notfallplan",
    url: "/notfallplan-krise-v03-preview.webp",
    downloadUrl: "/notfallplan-krise-v03.pdf",
    priority: "core",
    verifiedAt: "April 2026",
  },
  {
    id: "leuchtturm",
    title: "Der Leuchtturm – Orientierung für Angehörige",
    description:
      "Orientierung zur Angehörigenrolle: stabil bleiben, ohne das Schiff steuern zu wollen.",
    category: "verstehen",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GbFCyQhEWIKomzXw.webp",
    downloadUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DNGijMOYFghXAsLm.pdf",
    priority: "core",
    verifiedAt: "März 2026",
  },
  {
    id: "eisberg",
    title: "Der Eisberg – Wut ist oft die Spitze",
    description:
      "Wut, Schmerz, Angst und Scham als Beziehungsgeschehen verständlicher einordnen.",
    category: "verstehen",
    kind: "Infografik",
    url: "/infografiken/eisberg-der-eisberg-v6.png",
    thumbnailUrl: "/infografiken/extras/thumbnails/eisberg-der-eisberg-v6.png",
    downloadUrl: "/infografiken/eisberg-der-eisberg-v6.pdf",
    priority: "core",
    verifiedAt: "April 2026",
  },
  {
    id: "rolle-klaeren",
    title: "Ihre Rolle klären – Was Sie sein können (und was nicht)",
    description:
      "Klarheit über hilfreiche Unterstützung, Verantwortung und die Grenzen der Angehörigenrolle.",
    category: "unterstuetzen",
    kind: "Infografik",
    url: "/infografiken/sphären-die-einfluss-sphären-v3.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/sphären-die-einfluss-sphären-v3.png",
    downloadUrl: "/infografiken/sphären-die-einfluss-sphären-v3.pdf",
    priority: "core",
    verifiedAt: "April 2026",
  },
  {
    id: "krisenkommunikation",
    title: "Spickzettel Krisenkommunikation (A4)",
    description:
      "Kurze Formulierungen für akute Spannungszustände, wenn klare Sprache mehr hilft als lange Erklärungen.",
    category: "kommunizieren",
    kind: "Spickzettel",
    url: "/infografiken/deeskalation-der-deeskalations-pfad-v9.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/deeskalation-der-deeskalations-pfad-v9.png",
    downloadUrl: "/infografiken/deeskalation-der-deeskalations-pfad-v9.pdf",
    priority: "core",
    verifiedAt: "April 2026",
  },
  {
    id: "grenzen-spickzettel",
    title: "Spickzettel Grenzen – Die wichtigsten Sätze",
    description:
      "Knappe Formulierungen für klare, respektvolle Grenzsetzung im Alltag und in belasteten Gesprächen.",
    category: "grenzen",
    kind: "Spickzettel",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/avGqFKFuKFfFYANu.webp",
    downloadUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/obwIZiRPiVPphIUX.pdf",
    priority: "core",
    verifiedAt: "März 2026",
  },
  {
    id: "warnsignale",
    title: "Warnsignale der Überlastung",
    description:
      "Orientierung für Angehörige, wenn Erschöpfung, Alarmbereitschaft oder Rückzug zu viel Raum einnehmen.",
    category: "selbstfuersorge",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OEUNVdTyojBBYTic.webp",
    downloadUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VdAxPxngFzgNImxg.pdf",
    priority: "core",
    verifiedAt: "März 2026",
  },
  {
    id: "schuld-verantwortung",
    title: "Schuld, Verantwortung und was dazwischen liegt",
    description:
      "Hilft, Schuldgefühle bei Angehörigen zu entlasten und Verantwortung differenzierter zu sehen.",
    category: "selbstfuersorge",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/TgzrtmiUbRscTBlg.webp",
    downloadUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/jPuhxPHHtFSjOTly.pdf",
    priority: "secondary",
    verifiedAt: "März 2026",
  },
  {
    id: "spaltung",
    title: "Spaltung – das Pendel zwischen Extremen",
    description:
      "Einordnung von Idealisierung, Entwertung und dem erschwerten Zugang zu Grautönen unter Stress.",
    category: "verstehen",
    kind: "Infografik",
    url: "/infografiken/pendel-das-bewertungs-pendel-v14.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/pendel-das-bewertungs-pendel-v14.png",
    downloadUrl: "/infografiken/pendel-das-bewertungs-pendel-v14.pdf",
    priority: "secondary",
    verifiedAt: "April 2026",
  },
  {
    id: "alarm-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description:
      "Warum logische Klärung unter starker Anspannung oft nicht erreichbar ist und zuerst Beruhigung hilft.",
    category: "verstehen",
    kind: "Infografik",
    url: "/infografiken/alarm-der-alarm-modus-v3.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/alarm-der-alarm-modus-v3.png",
    downloadUrl: "/infografiken/alarm-der-alarm-modus-v3.pdf",
    priority: "secondary",
    verifiedAt: "April 2026",
  },
  {
    id: "wenn-worte-treffen",
    title: "Wenn Worte treffen – 5 häufige Schuldzuweisungen",
    description:
      "Typische anklagende Sätze einordnen und eigene Reaktionen ruhiger und klarer gestalten.",
    category: "kommunizieren",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/azZbLPyPkSupQskI.webp",
    downloadUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/hEXKCmWYeiyUnwXr.pdf",
    priority: "secondary",
    verifiedAt: "März 2026",
  },
  {
    id: "dear",
    title: "Die DEAR-Technik – Grenzen setzen ohne Vorwürfe",
    description:
      "DBT-orientierte Struktur für klare Bitten und Grenzsetzungen ohne unnötige Eskalation.",
    category: "grenzen",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/yBSkvBJGSeNvxINq.webp",
    downloadUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DDkqUiaNJwizEtPv.pdf",
    priority: "secondary",
    verifiedAt: "März 2026",
  },
  {
    id: "radikale-akzeptanz",
    title: "Radikale Akzeptanz – Aufhören zu kämpfen, anfangen zu handeln",
    description:
      "Hilft Angehörigen, Realität anzuerkennen, ohne aufzugeben oder alles gutzuheissen.",
    category: "selbstfuersorge",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OmxdguWaaXAkElDp.webp",
    downloadUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/SkBpjnDHfNmPbmnd.pdf",
    priority: "secondary",
    verifiedAt: "März 2026",
  },
  {
    id: "genesung-zahlen",
    title: "Genesung in Zahlen – Was die Forschung zeigt",
    description:
      "Langfristige Hoffnung mit realistischen Daten: Besserung ist möglich, aber selten linear.",
    category: "genesung",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tyFTHNjsUagqrXiS.webp",
    downloadUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MunlHDCNqnsOhBFn.pdf",
    priority: "secondary",
    verifiedAt: "Februar 2026",
  },
  {
    id: "kinder",
    title: "Wenn Mama oder Papa grosse Gefühle hat",
    description:
      "Altersgerechte Erklärung für Kinder und Hinweise zum Schutz von Kindern im belasteten Familiensystem.",
    category: "verstehen",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PrnKdbomSunLKPVv.webp",
    downloadUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/birikKPATMlHGPWf.pdf",
    priority: "secondary",
    verifiedAt: "April 2026",
  },
];

const MATERIAL_DOWNLOAD_PATH_PREFIX = "/api/material-download";
const REMOTE_ASSET_RE = /^https?:\/\//i;

export function buildMaterialDownloadPath(id: string) {
  return `${MATERIAL_DOWNLOAD_PATH_PREFIX}/${encodeURIComponent(id)}`;
}

export function getMaterialDownloadHref(item: MaterialItem) {
  const sourceUrl = item.pdfUrl ?? item.downloadUrl;
  if (!sourceUrl) {
    return null;
  }

  return REMOTE_ASSET_RE.test(sourceUrl)
    ? buildMaterialDownloadPath(item.id)
    : sourceUrl;
}

export function resolveMaterialDownload(
  id: string
): ResolvedMaterialDownload | null {
  const item = materials.find(entry => entry.id === id);
  if (!item) {
    return null;
  }

  const sourceUrl = item.pdfUrl ?? item.downloadUrl;
  if (!sourceUrl || !REMOTE_ASSET_RE.test(sourceUrl)) {
    return null;
  }

  return {
    id: item.id,
    title: item.title,
    fileName: `${item.id}.pdf`,
    sourceUrl,
  };
}

export const categoryMeta = [
  { id: "alle", label: "Alle", icon: "filter" },
  { id: "soforthilfe", label: "Soforthilfe", icon: "alert-triangle" },
  { id: "verstehen", label: "Verstehen", icon: "book-open" },
  { id: "unterstuetzen", label: "Unterstützen", icon: "heart" },
  { id: "kommunizieren", label: "Kommunizieren", icon: "message-circle" },
  { id: "grenzen", label: "Grenzen", icon: "shield" },
  { id: "selbstfuersorge", label: "Selbstfürsorge", icon: "sparkles" },
  { id: "genesung", label: "Genesung", icon: "trending-up" },
] as const;

export const quickStarts = [
  {
    id: "soforthilfe",
    title: "Akute Krise",
    text: "Wenn rasche Orientierung und Notfallnummern nötig sind.",
    cardClass: "border-alert bg-alert-wash",
  },
  {
    id: "verstehen",
    title: "Ich brauche Orientierung",
    text: "Wenn Sie Dynamiken besser einordnen möchten.",
    cardClass: "border-sage-mid bg-sage-wash",
  },
  {
    id: "kommunizieren",
    title: "Schwierige Gespräche",
    text: "Wenn Worte schnell kippen oder verletzen.",
    cardClass: "border-slate-blue bg-slate-wash",
  },
  {
    id: "selbstfuersorge",
    title: "Ich bin selbst am Limit",
    text: "Wenn Erschöpfung, Schuld oder Daueranspannung dominieren.",
    cardClass: "border-terracotta-mid bg-terracotta-wash",
  },
] as const;
