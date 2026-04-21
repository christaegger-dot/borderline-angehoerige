export type VerstehenMaterialCategory = "alle" | "grundlagen" | "neurobiologie";

export interface VerstehenInfografik {
  id: string;
  title: string;
  description: string;
  category: Exclude<VerstehenMaterialCategory, "alle">;
  webpUrl: string;
  pdfUrl: string;
  alt: string;
  featured?: boolean;
}

export interface VerstehenTextCard {
  title: string;
  text: string;
}

export const verstehenInfografiken: VerstehenInfografik[] = [
  {
    id: "leuchtturm",
    title: "Der Leuchtturm",
    description: "Ihre Rolle als Angehörige/r: Stabil bleiben trotz Sturm.",
    category: "grundlagen",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GbFCyQhEWIKomzXw.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DNGijMOYFghXAsLm.pdf",
    alt: "Der Leuchtturm – Ihre Rolle als Angehörige/r",
    featured: true,
  },
  {
    id: "eisberg",
    title: "Der Eisberg",
    description:
      "Wut ist oft nur die Spitze – darunter liegen Schmerz und Angst.",
    category: "grundlagen",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MLLwefeyaKvtThbK.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/RNKtfQQMvhlSyiIp.pdf",
    alt: "Der Eisberg – Wut ist oft die Spitze",
  },
  {
    id: "spaltung",
    title: "Spaltung",
    description: "Das Pendel zwischen Extremen – die Grauzone stärken.",
    category: "grundlagen",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WRORriPmZftmvKTL.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/RtdVgflJuCNAhEKk.pdf",
    alt: "Spaltung – das Pendel zwischen Extremen",
  },
  {
    id: "alarm-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description:
      "Erst beruhigen, dann klären – warum Logik manchmal nicht ankommt.",
    category: "neurobiologie",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/sSUJoOUTiuWgrkiZ.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tlKAOpYHdCNAtovE.pdf",
    alt: "Alarm-Modus vs. Denk-Modus",
  },
  {
    id: "4-phasen",
    title: "Der 4-Phasen-Zyklus",
    description:
      "Ein häufiges Muster in belasteten Beziehungen, nicht ein fixes Schicksal.",
    category: "neurobiologie",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BYDbBJaIhetrjHRq.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PBYpNxZamAxjOHYd.pdf",
    alt: "Der 4-Phasen-Zyklus",
  },
  {
    id: "gehirn",
    title: "Das Gehirn verstehen",
    description:
      "Neurobiologie einfach erklärt – warum Stress Denken blockiert.",
    category: "neurobiologie",
    webpUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ImASzOTHYdFpxOUI.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NViSBQtRBvGWOHPE.pdf",
    alt: "Das Gehirn verstehen",
  },
];

export const relationshipPatterns: VerstehenTextCard[] = [
  {
    title: "Verlassenheitsangst",
    text: "Schon kleine Verzögerungen, Unklarheiten oder Distanzsignale können als drohender Verlust erlebt werden. Für Angehörige wirkt das oft unverhältnismässig, für die betroffene Person aber sehr real.",
  },
  {
    title: "Nähe-Distanz-Pendeln",
    text: "Es kann vorkommen, dass jemand sehr viel Nähe sucht und sich kurz darauf zurückzieht, abwertet oder abbricht. Das ist nicht einfach Widersprüchlichkeit, sondern oft Ausdruck von Bindungsstress.",
  },
  {
    title: "Spaltung unter Stress",
    text: "In Belastungssituationen wird es schwerer, gleichzeitig Gutes und Schwieriges an einer Person zu halten. Dann kippt das Erleben leichter in Idealisierung oder Entwertung.",
  },
];

export const meaningForRelativesCards = [
  {
    text: "Sie können Verhalten genauer einordnen",
    sub: "ohne es automatisch zu entschuldigen oder zu dramatisieren",
  },
  {
    text: "Sie erkennen eigene Grenzen früher",
    sub: "weil Sie Belastung, Schuld und Überanpassung besser bemerken",
  },
  {
    text: "Sie können Mitgefühl und Klarheit verbinden",
    sub: "statt zwischen Härte und Aufopferung zu pendeln",
  },
  {
    text: "Sie müssen nicht alles allein tragen",
    sub: "Verstehen ist wertvoll, ersetzt aber kein Hilfesystem",
  },
];

export const diagnosticOverviewItems = [
  "starke Angst vor Verlassenwerden oder Bindungsverlust",
  "instabile, intensive Beziehungen",
  "ein schwankendes oder unsicheres Selbstbild",
  "Impulsivität oder selbstschädigendes Verhalten",
  "affektive Instabilität, Leere, Wut oder dissoziative Symptome",
];
