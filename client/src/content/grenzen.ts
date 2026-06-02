import { AlertTriangle, Filter, Heart, Shield } from "lucide-react";

export interface GrenzenItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  pdfUrl: string;
  category: "erkennen" | "kommunizieren" | "handeln";
}

export const grenzenSubcategories = [
  { id: "alle", label: "Alle", icon: Filter },
  { id: "erkennen", label: "Erkennen", icon: AlertTriangle },
  { id: "kommunizieren", label: "Kommunizieren", icon: Heart },
  { id: "handeln", label: "Handeln", icon: Shield },
];

export const grenzenItems: GrenzenItem[] = [
  {
    id: "dear",
    title: "Die DEAR-Technik",
    description: "4 Schritte für respektvolle Grenzsetzung",
    url: "/infografiken/manus-dear-v1.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-dear-v1.webp",
    pdfUrl: "/infografiken/manus-dear-v1.pdf",
    category: "kommunizieren",
  },
  {
    id: "spiegeln-statt-aufsaugen",
    title: "Spiegeln statt Aufsaugen",
    description: "Mitfühlen ohne Übernehmen",
    url: "/infografiken/manus-spiegeln-statt-aufsaugen-v3.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-spiegeln-statt-aufsaugen-v3-thumb.png",
    pdfUrl: "/infografiken/manus-spiegeln-statt-aufsaugen-v3.pdf",
    category: "kommunizieren",
  },
  {
    id: "4-arten-von-grenzen",
    title: "Die 4 Arten von Grenzen",
    description: "Physisch, emotional, zeitlich, materiell",
    url: "/infografiken/grenzen-die-4-arten-von-grenzen-v5.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/grenzen-die-4-arten-von-grenzen-v5.webp",
    pdfUrl: "/infografiken/grenzen-die-4-arten-von-grenzen-v5.pdf",
    category: "erkennen",
  },
  {
    id: "grenzen-erkennen",
    title: "Grenzen erkennen",
    description: "5 Warnsignale Ihres Körpers",
    url: "/infografiken/manus-grenzen-erkennen-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-grenzen-erkennen-v1.webp",
    pdfUrl: "/infografiken/manus-grenzen-erkennen-v1.pdf",
    category: "erkennen",
  },
  {
    id: "lmk",
    title: "Wenn Grenzen nicht respektiert werden",
    description: "Grenze setzen, Konsequenz ankündigen, ruhig handeln",
    url: "/infografiken/manus-lmk-v1.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-lmk-v1.webp",
    pdfUrl: "/infografiken/manus-lmk-v1.pdf",
    category: "handeln",
  },
  {
    id: "grenzen-spickzettel",
    title: "Spickzettel Grenzen",
    description: "A4 mit den wichtigsten Sätzen",
    url: "/infografiken/manus-grenzen-spickzettel-v2.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-grenzen-spickzettel-v2-thumb.png",
    pdfUrl: "/infografiken/manus-grenzen-spickzettel-v2.pdf",
    category: "handeln",
  },
];
