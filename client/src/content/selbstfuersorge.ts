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
    desc: "Drei Stufen der Überlastung: erste Zeichen wahrnehmen, Entlastung aktivieren und Unterstützung dazuholen.",
    category: "erkennen",
    webp: "/infografiken/manus-warnsignale-v3.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-warnsignale-v3-thumb.png",
    pdf: "/infografiken/manus-warnsignale-v3.pdf",
    featured: true,
  },
  {
    id: "sauerstoffmaske",
    title: "Die Sauerstoffmaske",
    desc: "Textversion zur Selbstfürsorge als eigenem Recht – unabhängig davon, wie viel Unterstützung Angehörige geben.",
    category: "erkennen",
    webp: "/infografiken/sauerstoff-die-sauerstoffmaske-v5.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/sauerstoff-die-sauerstoffmaske-v5.webp",
    pdf: "/infografiken/sauerstoff-die-sauerstoffmaske-v5.pdf",
  },
  {
    id: "radikale-akzeptanz",
    title: "Radikale Akzeptanz",
    desc: "Gegenüberstellung und freiwillige Übung, um gegenwärtige Realität anzuerkennen und Handlungsspielraum zu finden.",
    category: "techniken",
    webp: "/infografiken/puk-radikale-akzeptanz-v3.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/puk-radikale-akzeptanz-v3.webp",
    pdf: "/infografiken/puk-radikale-akzeptanz-v3.pdf",
  },
  {
    id: "stopp-technik",
    title: "STOPP: einen Moment innehalten",
    desc: "Fünf Schritte für eine kurze Pause: Stopp, atmen, orientieren, Perspektive, Plan. Im eigenen Tempo.",
    category: "techniken",
    webp: "/infografiken/manus-stopp-technik-v3.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-stopp-technik-v3.webp",
    pdf: "/infografiken/manus-stopp-technik-v3.pdf",
  },
  {
    id: "energie-konto",
    title: "Energie-Konto: Belastungen und Ressourcen",
    desc: "Eine Reflexionshilfe für persönliche Belastungen, Entlastung und Unterstützungsbedarf – keine Bilanz.",
    category: "ressourcen",
    webp: "/infografiken/manus-energie-konto-v1.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-energie-konto-v1.webp",
    pdf: "/infografiken/manus-energie-konto-v1.pdf",
  },
  {
    id: "erlaubnis-karte",
    title: "Erlaubnis-Karte",
    desc: "9 freiwillige Sätze zu eigenen Bedürfnissen, Grenzen und Entlastung.",
    category: "ressourcen",
    webp: "/infografiken/manus-erlaubnis-karte-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-erlaubnis-karte-v1.webp",
    pdf: "/infografiken/manus-erlaubnis-karte-v1.pdf",
  },
];
