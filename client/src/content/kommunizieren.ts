export type KommunikationsKategorie =
  | "alle"
  | "techniken"
  | "konflikte"
  | "praxis";

export interface KommunikationsMaterial {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  pdfUrl: string;
  category: Exclude<KommunikationsKategorie, "alle">;
}

export interface KommunikationsTextCard {
  title: string;
  text: string;
}

export const kommSubcategories = [
  { id: "alle", label: "Alle", icon: "filter" },
  { id: "techniken", label: "Techniken", icon: "heart" },
  { id: "konflikte", label: "Konflikte", icon: "shield-alert" },
  { id: "praxis", label: "Praxis", icon: "message-circle" },
] as const;

export const kommItems: KommunikationsMaterial[] = [
  {
    id: "gespraeche-kippen",
    title: "Wenn Gespräche kippen: 3 Schritte",
    description: "Beruhigen, verbinden, begrenzen",
    url: "/infografiken/manus-gespraeche-kippen-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-gespraeche-kippen-v1.webp",
    pdfUrl: "/infografiken/manus-gespraeche-kippen-v1.pdf",
    category: "techniken",
  },
  {
    id: "grenzen-ohne-eskalation",
    title: "Grenzen setzen, ohne zu eskalieren",
    description: "Die 3-Teile-Formel für klare Ansagen",
    url: "/infografiken/manus-grenzen-ohne-eskalation-v3.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-grenzen-ohne-eskalation-v3-thumb.png",
    pdfUrl: "/infografiken/manus-grenzen-ohne-eskalation-v3.pdf",
    category: "konflikte",
  },
  {
    id: "pause-statt-streit",
    title: "Pause statt Streit",
    description: "Warnstufen erkennen und rechtzeitig stoppen",
    url: "/infografiken/manus-pause-statt-streit-v3.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-pause-statt-streit-v3-thumb.png",
    pdfUrl: "/infografiken/manus-pause-statt-streit-v3.pdf",
    category: "konflikte",
  },
  {
    id: "wenn-worte-treffen",
    title: "Wenn Worte treffen",
    description: "Schuldzuweisungen ruhiger einordnen",
    url: "/infografiken/manus-wenn-worte-treffen-v3.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-wenn-worte-treffen-v3-thumb.png",
    pdfUrl: "/infografiken/manus-wenn-worte-treffen-v3.pdf",
    category: "konflikte",
  },
  {
    id: "zuhoeren-ohne-zustimmen",
    title: "Zuhören ohne Zustimmen",
    description: "Validieren ohne nachzugeben",
    url: "/infografiken/validierung-die-validierungs-treppe-v10.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/validierung-die-validierungs-treppe-v10.webp",
    pdfUrl: "/infografiken/validierung-die-validierungs-treppe-v10.pdf",
    category: "techniken",
  },
  {
    id: "beispiel-dialog",
    title: "Beispiel-Dialog",
    description: "Technik-Schritte in einem kurzen Gespräch",
    url: "/infografiken/manus-beispiel-dialog-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-beispiel-dialog-v1.webp",
    pdfUrl: "/infografiken/manus-beispiel-dialog-v1.pdf",
    category: "praxis",
  },
  {
    id: "krisenkommunikation",
    title: "Spickzettel Krisenkommunikation (A4)",
    description: "A4-Spickzettel für akute Spannungszustände",
    url: "/infografiken/deeskalation-der-deeskalations-pfad-v11.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/deeskalation-der-deeskalations-pfad-v11.webp",
    pdfUrl: "/infografiken/deeskalation-der-deeskalations-pfad-v11.pdf",
    category: "praxis",
  },
];

export const escalationCards: KommunikationsTextCard[] = [
  {
    title: "Kurz antworten",
    text: "Wenige Worte können in hoher Anspannung leichter ankommen. Sie dürfen Ihre Sicht sagen und müssen nicht jede Beschuldigung sofort klären.",
  },
  {
    title: "Offen nachfragen",
    text: "«Das scheint dich sehr zu beschäftigen. Verstehe ich dich richtig?» Lassen Sie sich korrigieren; die Gefühle und Motive des Gegenübers sind nicht von aussen sicher erkennbar.",
  },
  {
    title: "Das eigene Handeln begrenzen",
    text: "«Ich möchte nicht angeschrien werden. Ich beende das Gespräch jetzt.» Eine Grenze braucht keine vorherige Einigung über den Konflikt.",
  },
  {
    title: "Eine Pause ermöglichen",
    text: "Sie dürfen Abstand nehmen. Ob und wann ein neuer Kontakt möglich ist, können Sie später klären. Akute Beruhigung und spätere Absprachen sind unterschiedliche Aufgaben.",
  },
];

export const typicalSituationCards: KommunikationsTextCard[] = [
  {
    title: "Vorwürfe",
    text: "Sie können nachfragen, was die Person verletzt hat, ohne ihrer Darstellung zuzustimmen. Prüfen Sie konkrete Kritik, statt jeden Vorwurf als Symptom oder Verzerrung zu verstehen.",
  },
  {
    title: "Rückzug und Schweigen",
    text: "Rückzug kann verschiedene Gründe haben. Ein Kontaktangebot darf kurz sein und muss keine ständige Verfügbarkeit versprechen. Wenn Sie sich um die Sicherheit sorgen, holen Sie professionelle Einschätzung.",
  },
  {
    title: "Schwarz-Weiss-Sätze",
    text: "Es hilft oft, Gefühle anzuerkennen und gleichzeitig bei Ihrer komplexeren Wirklichkeit zu bleiben: Beziehung und Konflikt können gleichzeitig wahr sein.",
  },
  {
    title: "Nach einem Streit",
    text: "Ein Wiedereinstieg gelingt meist besser über Ruhe, begrenzte Offenheit und Verantwortung für den eigenen Anteil als über Sieger- oder Schuldsuche.",
  },
];

export const roleCommunicationCards: {
  title: string;
  tone: string;
  text: string;
}[] = [
  {
    title: "Als Partner/in",
    tone: "terracotta",
    text: "In Partnerschaften ist die Intensität oft am höchsten. Nähe, Eifersucht, Angst vor Verlust und wechselseitige Kränkung mischen sich schnell. Gerade deshalb brauchen Gespräche oft mehr Klarheit und weniger Verschmelzung.",
  },
  {
    title: "Als Elternteil",
    tone: "slate",
    text: "Alte Eltern-Kind-Muster färben viele Gespräche mit. Es kann helfen, das erwachsene Gegenüber nicht nur als Kind von früher zu adressieren, sondern als eigenständige Person mit eigener Verantwortung.",
  },
  {
    title: "Als erwachsenes Kind",
    tone: "sage",
    text: "Wer als erwachsenes Kind kommuniziert, gerät oft schnell in Loyalitätsdruck. Gerade dann ist wichtig: Ihre eigene Wahrnehmung und Ihre Begrenzung sind nicht weniger legitim als die Not Ihres Elternteils.",
  },
];
