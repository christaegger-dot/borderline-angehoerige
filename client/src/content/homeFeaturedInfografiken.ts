/**
 * Acht kuratierte Infografiken für das Visual-Orientation-Grid auf der Home.
 *
 * Reihenfolge folgt einem narrativen Lese-Pfad für Erstbesucher:
 * verstehen → begleiten → schützen → sich halten → vertiefen.
 *
 * Wichtige Info-Architektur-Entscheidung: Jede Tile verlinkt zur
 * **dazugehörigen Inhaltsseite**, nicht zu einer isolierten Infografik-
 * Detail-Seite. Die Infografik ist Eintritt zur Page, nicht Endpunkt.
 *
 * Thumbnails kommen aus `/public/infografiken/extras/thumbnails/` (600 px
 * breit) — nicht aus den vollen High-Res-PNGs (200-500 KB pro Stück).
 */
export interface HomeFeaturedInfografik {
  id: string;
  /** Tile-Titel (Source Serif 18 px) */
  title: string;
  /** Kurzbeschreibung (Inter 14 px) */
  description: string;
  /** Sage-Eyebrow oberhalb des Tiles */
  categoryLabel: string;
  /** Ziel-Inhaltsseite (NICHT Infografik-Detail-Seite) */
  href: string;
  /** Thumbnail aus /public/infografiken/extras/thumbnails/ — 600 px breit */
  thumbnailUrl: string;
  /** Native Pixel-Höhe der Thumbnail-Datei (Breite ist immer 600) — verhindert image-aspect-ratio-Mismatch und Layout-Shift. */
  thumbnailHeight: number;
  /** Alt-Text für Screen-Reader */
  alt: string;
}

export const homeFeaturedInfografiken: HomeFeaturedInfografik[] = [
  {
    id: "eisberg",
    title: "Der Eisberg",
    description: "Wut ist oft die Spitze — darunter liegen Schmerz und Angst.",
    categoryLabel: "Verstehen",
    href: "/verstehen",
    thumbnailUrl: "/infografiken/extras/thumbnails/eisberg-der-eisberg-v6.png",
    thumbnailHeight: 855,
    alt: "Der Eisberg – Wut ist oft die Spitze",
  },
  {
    id: "alarm-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description:
      "Erst beruhigen, dann klären — warum Logik manchmal nicht ankommt.",
    categoryLabel: "Verstehen",
    href: "/verstehen",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/alarm-der-alarm-modus-v3.png",
    thumbnailHeight: 848,
    alt: "Alarm-Modus vs. Denk-Modus",
  },
  {
    id: "ampel-system",
    title: "Das Ampel-System",
    description: "Anspannung, Eskalation und akute Gefahr schneller einordnen.",
    categoryLabel: "Krise begleiten",
    href: "/unterstuetzen/krise",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/ampel-das-ampel-system-v3.png",
    thumbnailHeight: 803,
    alt: "Ampel-System für Krisenphasen",
  },
  {
    id: "validierungs-treppe",
    title: "Die Validierungs-Treppe",
    description: "Zuhören und validieren — ohne nachzugeben.",
    categoryLabel: "Kommunizieren",
    href: "/kommunizieren",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/validierung-die-validierungs-treppe-v5.png",
    thumbnailHeight: 848,
    alt: "Die Validierungs-Treppe",
  },
  {
    id: "vier-arten-grenzen",
    title: "Die 4 Arten von Grenzen",
    description:
      "Physisch, emotional, zeitlich, materiell — was wo gemeint ist.",
    categoryLabel: "Grenzen",
    href: "/grenzen",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/grenzen-die-4-arten-von-grenzen-v4.png",
    thumbnailHeight: 803,
    alt: "Die 4 Arten von Grenzen",
  },
  {
    id: "sauerstoffmaske",
    title: "Die Sauerstoffmaske",
    description:
      "Selbstfürsorge ist keine Selbstsucht — sie ist die Voraussetzung.",
    categoryLabel: "Selbstfürsorge",
    href: "/selbstfuersorge",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/sauerstoff-die-sauerstoffmaske-v4.png",
    thumbnailHeight: 803,
    alt: "Die Sauerstoffmaske – Selbstfürsorge zuerst",
  },
  {
    id: "fortschritt-paradox",
    title: "Das Fortschritt-Paradox",
    description: "Warum Rückfälle zum Weg gehören.",
    categoryLabel: "Genesung",
    href: "/genesung",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/fortschritt-das-fortschritt-paradox-v4.png",
    thumbnailHeight: 848,
    alt: "Das Fortschritt-Paradox – Rückfälle als Teil des Wegs",
  },
  {
    id: "deeskalations-pfad",
    title: "Der Deeskalations-Pfad",
    description: "Klare Sätze für akute Spannungszustände.",
    categoryLabel: "Krise begleiten",
    href: "/unterstuetzen/krise",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/deeskalation-der-deeskalations-pfad-v9.png",
    thumbnailHeight: 848,
    alt: "Der Deeskalations-Pfad für Krisenkommunikation",
  },
];
