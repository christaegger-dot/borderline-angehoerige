import { Compass, Filter, Heart, Users } from "lucide-react";

export const unterstuetzenSubcategories = [
  { id: "alle", label: "Alle", icon: Filter },
  { id: "grundlagen", label: "Grundlagen", icon: Compass },
  { id: "haltung", label: "Haltung", icon: Heart },
  { id: "alltag", label: "Alltag", icon: Users },
];

export const unterstuetzenItems = [
  {
    id: "rolle-klaeren",
    title: "Ihre Rolle klären",
    description:
      "Klarheit darüber, was Sie freiwillig anbieten können und was nicht zu Ihrer Verantwortung gehört.",
    url: "/infografiken/manus-rolle-klaeren-v3.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-rolle-klaeren-v3-thumb.png",
    pdfUrl: "/infografiken/manus-rolle-klaeren-v3.pdf",
    category: "grundlagen",
  },
  {
    id: "drei-saeulen",
    title: "Drei Säulen hilfreicher Unterstützung",
    description:
      "Präsenz, Selbstorientierung, Pause und Grenze als freiwillige Wahlmöglichkeiten.",
    url: "/infografiken/manus-drei-saeulen-v1.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-drei-saeulen-v1.webp",
    pdfUrl: "/infografiken/manus-drei-saeulen-v1.pdf",
    category: "grundlagen",
  },
  {
    id: "konsistenz-prinzip",
    title: "Konsistenz-Prinzip",
    description:
      "Transparente, anpassbare Absprachen ohne starre Einheitsreaktion oder Wirkungsgarantie.",
    url: "/infografiken/manus-konsistenz-prinzip-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-konsistenz-prinzip-v1.webp",
    pdfUrl: "/infografiken/manus-konsistenz-prinzip-v1.pdf",
    category: "haltung",
  },
  {
    id: "beziehungs-achtsamkeit",
    title: "Beziehungs-Achtsamkeit",
    description:
      "Beobachtung und Vermutung trennen und frei zwischen Satz, Grenze, Pause oder Hilfe wählen.",
    url: "/infografiken/manus-beziehungs-achtsamkeit-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-beziehungs-achtsamkeit-v1.webp",
    pdfUrl: "/infografiken/manus-beziehungs-achtsamkeit-v1.pdf",
    category: "haltung",
  },
  {
    id: "6-leitlinien",
    title: "6 Leitlinien für Angehörige",
    description:
      "Sechs freiwillige Orientierungspunkte zu Autonomie, Sicherheit, Absprachen und Selbstschutz.",
    url: "/infografiken/manus-6-leitlinien-v1.webp",
    thumbnailUrl: "/infografiken/extras/thumbnails/manus-6-leitlinien-v1.webp",
    pdfUrl: "/infografiken/manus-6-leitlinien-v1.pdf",
    category: "alltag",
  },
  {
    id: "4-alltags-tipps",
    title: "4 Alltags-Tipps",
    description:
      "Vier Fragen dazu, ob Hilfe gewünscht ist, was möglich ist und wo eigene Grenzen liegen.",
    url: "/infografiken/manus-4-alltags-tipps-v1.webp",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/manus-4-alltags-tipps-v1.webp",
    pdfUrl: "/infografiken/manus-4-alltags-tipps-v1.pdf",
    category: "alltag",
  },
];
