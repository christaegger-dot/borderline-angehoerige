import { isHandoutVisualPublished } from "./handoutGovernance";

/**
 * Kuratierte Infografiken für das Visual-Orientation-Grid auf der Home.
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

const homeFeaturedCandidates: HomeFeaturedInfografik[] = [
  {
    id: "radikale-akzeptanz",
    title: "Radikale Akzeptanz",
    description:
      "Gegenwärtige Realität anerkennen, ohne sie gutzuheissen oder hinnehmen zu müssen.",
    categoryLabel: "Selbstfürsorge",
    href: "/selbstfuersorge",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/puk-radikale-akzeptanz-v3.webp",
    thumbnailHeight: 849,
    alt: "Radikale Akzeptanz – freiwillige Schritte zu mehr Handlungsspielraum",
  },
  {
    id: "gespraeche-kippen",
    title: "Wenn Gespräche kippen",
    description:
      "Wählbare Schritte: Tempo senken, offen nachfragen, begrenzen oder beenden.",
    categoryLabel: "Kommunizieren",
    href: "/kommunizieren",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/puk-gespraeche-kippen-v3.webp",
    thumbnailHeight: 849,
    alt: "Wenn Gespräche kippen – drei wählbare Schritte",
  },
  {
    id: "beispiel-dialog",
    title: "Beispiel-Dialog",
    description:
      "Mögliche Sätze für eine offene Frage, eine Grenze und einen freiwilligen Wiedereinstieg.",
    categoryLabel: "Kommunizieren",
    href: "/kommunizieren",
    thumbnailUrl: "/infografiken/extras/thumbnails/puk-beispiel-dialog-v3.webp",
    thumbnailHeight: 849,
    alt: "Beispiel-Dialog mit anpassbaren Gesprächssätzen",
  },
  {
    id: "4-arten-von-grenzen",
    title: "Die 4 Arten von Grenzen",
    description:
      "Physisch, emotional, zeitlich, materiell — was wo gemeint ist.",
    categoryLabel: "Grenzen",
    href: "/grenzen",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/puk-4-arten-von-grenzen-v1.webp",
    thumbnailHeight: 849,
    alt: "Die 4 Arten von Grenzen",
  },
  {
    id: "stopp-technik",
    title: "STOPP: einen Moment innehalten",
    description:
      "Eine freiwillige kurze Pause, um sich zu orientieren und den nächsten Schritt zu wählen.",
    categoryLabel: "Selbstfürsorge",
    href: "/selbstfuersorge",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-stopp-technik-v3.webp",
    thumbnailHeight: 849,
    alt: "STOPP-Technik – fünf freiwillige Schritte zum Innehalten",
  },
  {
    id: "garten",
    title: "Der Garten der Genesung",
    description:
      "Genesung braucht unterschiedliche Bedingungen und bleibt der Weg der betroffenen Person.",
    categoryLabel: "Genesung",
    href: "/genesung",
    thumbnailUrl: "/infografiken/extras/thumbnails/puk-garten-v1.webp",
    thumbnailHeight: 849,
    alt: "Garten-Metapher für unterschiedliche Bedingungen von Genesung",
  },
  {
    id: "fortschritt-paradox",
    title: "Veränderung verläuft unterschiedlich",
    description:
      "Genesungswege unterscheiden sich; einzelne Phasen legen den weiteren Verlauf nicht fest.",
    categoryLabel: "Genesung",
    href: "/genesung",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/fortschritt-das-fortschritt-paradox-v5.webp",
    thumbnailHeight: 849,
    alt: "Schematische Darstellung unterschiedlicher Genesungsverläufe",
  },
];

// Fail closed: Home darf nie ein altes oder noch nicht freigegebenes Visual
// über einen direkten Thumbnail-Pfad wieder sichtbar machen.
export const homeFeaturedInfografiken = homeFeaturedCandidates.filter(item =>
  isHandoutVisualPublished(item.id)
);
