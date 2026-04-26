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
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/kWTjVSZAwAXAymgw.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/eEpcTcWSbYQpNzJv.pdf",
    category: "techniken",
  },
  {
    id: "grenzen-ohne-eskalation",
    title: "Grenzen setzen, ohne zu eskalieren",
    description: "Die 3-Teile-Formel für klare Ansagen",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/QrgVLpdeorAWgKvg.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YyBYayMoMIGwTZtM.pdf",
    category: "konflikte",
  },
  {
    id: "pause-statt-streit",
    title: "Pause statt Streit",
    description: "Warnstufen erkennen und rechtzeitig stoppen",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VCooXJsQnRmSZGul.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/fGgpuKMuDfzJYgrc.pdf",
    category: "konflikte",
  },
  {
    id: "wenn-worte-treffen",
    title: "Wenn Worte treffen",
    description: "Schuldzuweisungen ruhiger einordnen",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/azZbLPyPkSupQskI.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/hEXKCmWYeiyUnwXr.pdf",
    category: "konflikte",
  },
  {
    id: "zuhoeren-ohne-zustimmen",
    title: "Zuhören ohne Zustimmen",
    description: "Validieren ohne nachzugeben",
    url: "/infografiken/validierung-die-validierungs-treppe-v5.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/validierung-die-validierungs-treppe-v5.png",
    pdfUrl: "/infografiken/validierung-die-validierungs-treppe-v5.pdf",
    category: "techniken",
  },
  {
    id: "beispiel-dialog",
    title: "Beispiel-Dialog",
    description: "Technik-Schritte in einem kurzen Gespräch",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YZGoCcmXszaQGVtV.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WZdsgoAKaJwvMCjp.pdf",
    category: "praxis",
  },
  {
    id: "krisenkommunikation",
    title: "Spickzettel Krisenkommunikation (A4)",
    description: "A4-Spickzettel für akute Spannungszustände",
    url: "/infografiken/deeskalation-der-deeskalations-pfad-v9.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/deeskalation-der-deeskalations-pfad-v9.png",
    pdfUrl: "/infografiken/deeskalation-der-deeskalations-pfad-v9.pdf",
    category: "praxis",
  },
];

export const escalationCards: KommunikationsTextCard[] = [
  {
    title: "Nicht sofort verteidigen",
    text: "Rechtfertigung wirkt unter hoher Anspannung oft wie Gegenangriff oder Nichtverstehen.",
  },
  {
    title: "Den emotionalen Kern benennen",
    text: "Nicht den Vorwurf, sondern die Kränkung, Angst oder Wut dahinter ansprechen.",
  },
  {
    title: "Kurz und wiederholbar bleiben",
    text: "In eskalierenden Momenten tragen wenige klare Sätze meist mehr als komplexe Erklärungen.",
  },
  {
    title: "Grenze und Pause kombinieren",
    text: "Sie können Kontakt halten und gleichzeitig sagen, dass Beschimpfungen oder Druck nicht gehen.",
  },
];

export const typicalSituationCards: KommunikationsTextCard[] = [
  {
    title: "Vorwürfe",
    text: "Reagieren Sie eher auf das Gefühl dahinter als auf die ganze Anklage. Sie müssen nicht jede Verzerrung korrigieren, bevor Sie Beziehung herstellen.",
  },
  {
    title: "Rückzug und Schweigen",
    text: "Raum geben kann hilfreich sein. Raum geben ist aber etwas anderes als strafendes Schweigen oder völliges Verschwinden aus Kontakt.",
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
