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
    title: "Der Leuchtturm – eigene Orientierung finden",
    description:
      "Eine Metapher für die eigenen Werte, Grenzen, Möglichkeiten und passende Unterstützung — nicht für die Steuerung einer anderen Person.",
    category: "grundlagen",
    webpUrl: "/infografiken/manus-leuchtturm-v1.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-leuchtturm-v1.webp",
    pdfUrl: "/infografiken/manus-leuchtturm-v1.pdf",
    alt: "Leuchtturm-Metapher für die Selbstorientierung von Angehörigen",
    featured: true,
  },
  {
    id: "eisberg",
    title: "Der Eisberg",
    description:
      "Sichtbares Verhalten ist ein Teil der Situation. Gefühle, Bedürfnisse und Belastungen können mitwirken, ohne von aussen sicher erkennbar zu sein.",
    category: "grundlagen",
    webpUrl: "/infografiken/eisberg-der-eisberg-v8.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/eisberg-der-eisberg-v8.webp",
    pdfUrl: "/infografiken/eisberg-der-eisberg-v8.pdf",
    alt: "Eisberg-Metapher mit sichtbarem Verhalten und möglichen Kontexten",
  },
  {
    id: "spaltung",
    title: "Wenn Bewertungen unter Stress einseitiger werden",
    description:
      "Eine Pendel-Metapher für einen vorübergehend verengten Blick – nicht für eine feste Eigenschaft oder Absicht.",
    category: "grundlagen",
    webpUrl: "/infografiken/pendel-das-bewertungs-pendel-v16.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/pendel-das-bewertungs-pendel-v16.webp",
    pdfUrl: "/infografiken/pendel-das-bewertungs-pendel-v16.pdf",
    alt: "Pendel-Metapher: Bewertungen können unter Stress einseitiger werden",
  },
  {
    id: "alarm-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description:
      "Vereinfachtes Stressmodell: weniger Druck, Pause, Abstand und eigene Sicherheit statt Beruhigungspflicht.",
    category: "neurobiologie",
    webpUrl: "/infografiken/alarm-der-alarm-modus-v4.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/alarm-der-alarm-modus-v4.webp",
    pdfUrl: "/infografiken/alarm-der-alarm-modus-v4.pdf",
    alt: "Alarm-Modus vs. Denk-Modus",
  },
  {
    id: "kinder",
    title: "Kinder verstehen und entlasten",
    description:
      "Borderline altersgerecht erklären und Kinder mit Klarheit, Entlastung und Schutz begleiten.",
    category: "grundlagen",
    webpUrl: "/infografiken/manus-kinder-v3.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-kinder-v3.webp",
    pdfUrl: "/infografiken/manus-kinder-v3.pdf",
    alt: "Kinder verstehen und entlasten",
  },
  {
    id: "gehirn",
    title: "Das Gehirn verstehen",
    description:
      "Vereinfachtes Stressmodell mit freiwilligen Schritten zur eigenen Orientierung – ohne Regulationsauftrag für Angehörige.",
    category: "neurobiologie",
    webpUrl: "/infografiken/manus-gehirn-v1.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-gehirn-v1.webp",
    pdfUrl: "/infografiken/manus-gehirn-v1.pdf",
    alt: "Das Gehirn verstehen",
  },
];

export const relationshipPatterns: VerstehenTextCard[] = [
  {
    title: "Sorge vor Beziehungsverlust",
    text: "Verzögerungen, Unklarheiten oder Distanzsignale können als drohender Verlust erlebt werden. Das kann für Angehörige schwer nachvollziehbar sein; das Erleben der betroffenen Person ist dennoch real.",
  },
  {
    title: "Nähe und Distanz",
    text: "Es kann vorkommen, dass jemand Nähe sucht und sich später zurückzieht oder Abstand wünscht. Bindungsstress kann dabei mitwirken; aus dem Wechsel allein lässt sich weder eine Ursache noch eine Absicht ableiten.",
  },
  {
    title: "Einseitigere Bewertungen unter Stress",
    text: "In Belastungssituationen kann es schwieriger werden, positive und schwierige Aspekte einer Person gleichzeitig im Blick zu behalten. Diese mögliche Verengung ist keine Absicht und lässt sich nicht aus einer Diagnose vorhersagen.",
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
