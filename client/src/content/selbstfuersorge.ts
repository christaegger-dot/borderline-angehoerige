export type SelbstfuersorgeKategorie =
  | "alle"
  | "erkennen"
  | "techniken"
  | "ressourcen";

export type SelbstfuersorgeInfografik = {
  id: string;
  title: string;
  desc: string;
  category: Exclude<SelbstfuersorgeKategorie, "alle">;
  webp: string;
  thumbnailUrl?: string;
  pdf: string;
  featured?: boolean;
};

export const selbstfuersorgeInfografiken: SelbstfuersorgeInfografik[] = [
  {
    id: "warnsignale",
    title: "Warnsignale der Überlastung",
    desc: "Ampel-Stufenmodell: Grün → Gelb → Rot – erkennen Sie rechtzeitig, wann es zu viel wird.",
    category: "erkennen",
    webp: "/infografiken/manus-warnsignale-v1.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-warnsignale-v1.webp",
    pdf: "/infografiken/manus-warnsignale-v1.pdf",
    featured: true,
  },
  {
    id: "sauerstoffmaske",
    title: "Die Sauerstoffmaske",
    desc: "Kreislauf-Diagramm: Teufelskreis vs. positiver Kreislauf – warum Selbstfürsorge keine Selbstsucht ist.",
    category: "erkennen",
    webp: "/infografiken/sauerstoff-die-sauerstoffmaske-v4.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/sauerstoff-die-sauerstoffmaske-v4.webp",
    pdf: "/infografiken/sauerstoff-die-sauerstoffmaske-v4.pdf",
  },
  {
    id: "radikale-akzeptanz",
    title: "Radikale Akzeptanz",
    desc: "2-Spalten-Vergleich: Was Radikale Akzeptanz NICHT ist vs. was sie IST, plus 4-Schritte-Übung.",
    category: "techniken",
    webp: "/infografiken/manus-radikale-akzeptanz-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-radikale-akzeptanz-v1.webp",
    pdf: "/infografiken/manus-radikale-akzeptanz-v1.pdf",
  },
  {
    id: "stopp-technik",
    title: "Die STOPP-Technik",
    desc: "5 Schritte aus der Stressspirale: Stopp, Tief atmen, Orientieren, Perspektive, Plan – in 30 Sekunden.",
    category: "techniken",
    webp: "/infografiken/manus-stopp-technik-v1.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-stopp-technik-v1.webp",
    pdf: "/infografiken/manus-stopp-technik-v1.pdf",
  },
  {
    id: "energie-konto",
    title: "Ihr Energie-Konto",
    desc: "Stock-&-Flow-Diagramm: Was füllt Ihre Batterie auf, was leert sie? Achten Sie auf die Balance.",
    category: "ressourcen",
    webp: "/infografiken/manus-energie-konto-v1.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-energie-konto-v1.webp",
    pdf: "/infografiken/manus-energie-konto-v1.pdf",
  },
  {
    id: "erlaubnis-karte",
    title: "Erlaubnis-Karte",
    desc: "9 Erlaubnisse, die sich Angehörige oft nicht geben – gültig ab sofort, unbefristet.",
    category: "ressourcen",
    webp: "/infografiken/manus-erlaubnis-karte-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-erlaubnis-karte-v1.webp",
    pdf: "/infografiken/manus-erlaubnis-karte-v1.pdf",
  },
];
