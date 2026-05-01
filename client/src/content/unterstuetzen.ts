import { Compass, Filter, Heart, Users } from "lucide-react";

export const unterstuetzenSubcategories = [
  { id: "alle", label: "Alle", icon: Filter },
  { id: "grundlagen", label: "Grundlagen", icon: Compass },
  { id: "haltung", label: "Haltung", icon: Heart },
  { id: "alltag", label: "Alltag", icon: Users },
];

export const unterstuetzenItems = [
  {
    id: "im-krisenmodus",
    title: "Im Krisenmodus – Orientierung geben",
    url: "/infografiken/ampel-das-ampel-system-v3.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/ampel-das-ampel-system-v3.png",
    pdfUrl: "/infografiken/ampel-das-ampel-system-v3.pdf",
    category: "grundlagen",
  },
  {
    id: "rolle-klaeren",
    title: "Ihre Rolle klären",
    url: "/infografiken/sphären-die-einfluss-sphären-v3.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/sphären-die-einfluss-sphären-v3.png",
    pdfUrl: "/infografiken/sphären-die-einfluss-sphären-v3.pdf",
    category: "grundlagen",
  },
  {
    id: "drei-saeulen",
    title: "Drei Säulen hilfreicher Unterstützung",
    url: "/infografiken/manus-drei-saeulen-v1.webp",
    pdfUrl: "/infografiken/manus-drei-saeulen-v1.pdf",
    category: "grundlagen",
  },
  {
    id: "konsistenz-prinzip",
    title: "Konsistenz-Prinzip",
    url: "/infografiken/manus-konsistenz-prinzip-v1.webp",
    pdfUrl: "/infografiken/manus-konsistenz-prinzip-v1.pdf",
    category: "haltung",
  },
  {
    id: "beziehungs-achtsamkeit",
    title: "Beziehungs-Achtsamkeit",
    url: "/infografiken/manus-beziehungs-achtsamkeit-v1.webp",
    pdfUrl: "/infografiken/manus-beziehungs-achtsamkeit-v1.pdf",
    category: "haltung",
  },
  {
    id: "6-leitlinien",
    title: "6 Leitlinien für Angehörige",
    url: "/infografiken/manus-6-leitlinien-v1.webp",
    pdfUrl: "/infografiken/manus-6-leitlinien-v1.pdf",
    category: "alltag",
  },
  {
    id: "4-alltags-tipps",
    title: "4 Alltags-Tipps",
    url: "/infografiken/manus-4-alltags-tipps-v1.webp",
    pdfUrl: "/infografiken/manus-4-alltags-tipps-v1.pdf",
    category: "alltag",
  },
];
