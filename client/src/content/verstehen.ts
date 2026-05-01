export type VerstehenMaterialCategory = "alle" | "grundlagen" | "neurobiologie";

export interface VerstehenInfografik {
  id: string;
  title: string;
  description: string;
  category: Exclude<VerstehenMaterialCategory, "alle">;
  webpUrl: string;
  thumbnailUrl?: string;
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
    description: "Orientierung für Angehörige: stabil bleiben trotz Sturm.",
    category: "grundlagen",
    webpUrl: "/infografiken/manus-leuchtturm-v1.webp",
    pdfUrl: "/infografiken/manus-leuchtturm-v1.pdf",
    alt: "Der Leuchtturm – Orientierung für Angehörige",
    featured: true,
  },
  {
    id: "eisberg",
    title: "Der Eisberg",
    description:
      "Wut ist oft nur die Spitze – darunter liegen Schmerz und Angst.",
    category: "grundlagen",
    webpUrl: "/infografiken/eisberg-der-eisberg-v6.png",
    thumbnailUrl: "/infografiken/extras/thumbnails/eisberg-der-eisberg-v6.png",
    pdfUrl: "/infografiken/eisberg-der-eisberg-v6.pdf",
    alt: "Der Eisberg – Wut ist oft die Spitze",
  },
  {
    id: "spaltung",
    title: "Spaltung",
    description: "Das Pendel zwischen Extremen – die Grauzone stärken.",
    category: "grundlagen",
    webpUrl: "/infografiken/pendel-das-bewertungs-pendel-v14.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/pendel-das-bewertungs-pendel-v14.png",
    pdfUrl: "/infografiken/pendel-das-bewertungs-pendel-v14.pdf",
    alt: "Spaltung – das Pendel zwischen Extremen",
  },
  {
    id: "alarm-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description:
      "Erst beruhigen, dann klären – warum Logik manchmal nicht ankommt.",
    category: "neurobiologie",
    webpUrl: "/infografiken/alarm-der-alarm-modus-v3.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/alarm-der-alarm-modus-v3.png",
    pdfUrl: "/infografiken/alarm-der-alarm-modus-v3.pdf",
    alt: "Alarm-Modus vs. Denk-Modus",
  },
  {
    id: "kinder",
    title: "Wenn Mama oder Papa grosse Gefühle hat",
    description:
      "Borderline altersgerecht erklären und Kinder mit Klarheit, Entlastung und Schutz begleiten.",
    category: "grundlagen",
    webpUrl: "/infografiken/manus-kinder-v1.webp",
    pdfUrl: "/infografiken/manus-kinder-v1.pdf",
    alt: "Wenn Mama oder Papa grosse Gefühle hat",
  },
  {
    id: "4-phasen",
    title: "Der 4-Phasen-Zyklus",
    description:
      "Ein häufiges Muster in belasteten Beziehungen, nicht ein fixes Schicksal.",
    category: "neurobiologie",
    webpUrl: "/infografiken/manus-4-phasen-v1.webp",
    pdfUrl: "/infografiken/manus-4-phasen-v1.pdf",
    alt: "Der 4-Phasen-Zyklus",
  },
  {
    id: "gehirn",
    title: "Das Gehirn verstehen",
    description:
      "Neurobiologie einfach erklärt – warum Stress Denken blockiert.",
    category: "neurobiologie",
    webpUrl: "/infografiken/manus-gehirn-v1.webp",
    pdfUrl: "/infografiken/manus-gehirn-v1.pdf",
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
