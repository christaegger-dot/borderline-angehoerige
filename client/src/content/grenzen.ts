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
    pdfUrl: "/infografiken/manus-dear-v1.pdf",
    category: "kommunizieren",
  },
  {
    id: "spiegeln-statt-aufsaugen",
    title: "Spiegeln statt Aufsaugen",
    description: "Mitfühlen ohne Übernehmen",
    url: "/infografiken/manus-spiegeln-statt-aufsaugen-v1.webp",
    pdfUrl: "/infografiken/manus-spiegeln-statt-aufsaugen-v1.pdf",
    category: "kommunizieren",
  },
  {
    id: "4-arten-von-grenzen",
    title: "Die 4 Arten von Grenzen",
    description: "Physisch, emotional, zeitlich, materiell",
    url: "/infografiken/grenzen-die-4-arten-von-grenzen-v4.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/grenzen-die-4-arten-von-grenzen-v4.png",
    pdfUrl: "/infografiken/grenzen-die-4-arten-von-grenzen-v4.pdf",
    category: "erkennen",
  },
  {
    id: "grenzen-erkennen",
    title: "Grenzen erkennen",
    description: "5 Warnsignale Ihres Körpers",
    url: "/infografiken/manus-grenzen-erkennen-v1.webp",
    pdfUrl: "/infografiken/manus-grenzen-erkennen-v1.pdf",
    category: "erkennen",
  },
  {
    id: "lmk",
    title: "L.M.K. (Lebe Mit Konsequenzen)",
    description: "Wenn Grenzen nicht respektiert werden",
    url: "/infografiken/manus-lmk-v1.webp",
    pdfUrl: "/infografiken/manus-lmk-v1.pdf",
    category: "handeln",
  },
  {
    id: "grenzen-spickzettel",
    title: "Spickzettel Grenzen",
    description: "A4 mit den wichtigsten Sätzen",
    url: "/infografiken/manus-grenzen-spickzettel-v1.webp",
    pdfUrl: "/infografiken/manus-grenzen-spickzettel-v1.pdf",
    category: "handeln",
  },
];
