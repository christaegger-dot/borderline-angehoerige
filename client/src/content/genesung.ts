export type GenesungKategorie = "alle" | "verstehen" | "handeln";

export interface GenesungItem {
  id: string;
  title: string;
  desc: string;
  img: string;
  thumbnailUrl?: string;
  pdf: string;
  category: Exclude<GenesungKategorie, "alle">;
}

export const genesungCategories = [
  { id: "alle", label: "Alle" },
  { id: "verstehen", label: "Verstehen" },
  { id: "handeln", label: "Handeln" },
] as const;

export const genesungItems: GenesungItem[] = [
  {
    id: "genesung-zahlen",
    title: "Genesung in Zahlen",
    desc: "Orientierungs-Tracker mit Langzeitdaten",
    img: "/infografiken/manus-genesung-zahlen-v3.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-genesung-zahlen-v3.webp",
    pdf: "/infografiken/manus-genesung-zahlen-v3.pdf",
    category: "verstehen",
  },
  {
    id: "fortschritt-paradox",
    title: "Veränderung verläuft unterschiedlich",
    desc: "Schwierigere Phasen können vorkommen – ohne festes Muster",
    img: "/infografiken/fortschritt-das-fortschritt-paradox-v5.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/fortschritt-das-fortschritt-paradox-v5.webp",
    pdf: "/infografiken/fortschritt-das-fortschritt-paradox-v5.pdf",
    category: "verstehen",
  },
  {
    id: "remission-heilung",
    title: "Remission, Alltag und persönliche Recovery",
    desc: "Unterschiedliche Blickwinkel auf Veränderung – ohne Heilungsversprechen oder feste Prognose",
    img: "/infografiken/manus-remission-heilung-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-remission-heilung-v1.webp",
    pdf: "/infografiken/manus-remission-heilung-v1.pdf",
    category: "verstehen",
  },
  {
    id: "5-faktoren-genesung",
    title: "Fünf Bereiche rund um Genesung",
    desc: "Eine nicht abschliessende Orientierung zu Behandlung, Gesundheit, Beziehungen, Lebensbedingungen und Verlauf",
    img: "/infografiken/manus-5-faktoren-genesung-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-5-faktoren-genesung-v1.webp",
    pdf: "/infografiken/manus-5-faktoren-genesung-v1.pdf",
    category: "handeln",
  },
  {
    id: "rolle-genesungsprozess",
    title: "Freiwillige Unterstützung und eigene Grenzen",
    desc: "Mögliche Angebote ohne Genesungsverantwortung",
    img: "/infografiken/manus-rolle-genesungsprozess-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-rolle-genesungsprozess-v1.webp",
    pdf: "/infografiken/manus-rolle-genesungsprozess-v1.pdf",
    category: "handeln",
  },
];
