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
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/yBSkvBJGSeNvxINq.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DDkqUiaNJwizEtPv.pdf",
    category: "kommunizieren",
  },
  {
    id: "spiegeln-statt-aufsaugen",
    title: "Spiegeln statt Aufsaugen",
    description: "Mitfühlen ohne Übernehmen",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/rbDvjxTUWJMXQCPj.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/jJFieYXEiIxbrazO.pdf",
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
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/pPRcjWVKERfSWUPL.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FftUeWuOzmxjrUEi.pdf",
    category: "erkennen",
  },
  {
    id: "lmk",
    title: "L.M.K. (Lebe Mit Konsequenzen)",
    description: "Wenn Grenzen nicht respektiert werden",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/izBLuzTFtMDeQYoc.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/eyhngTnxXoekiWwJ.pdf",
    category: "handeln",
  },
  {
    id: "grenzen-spickzettel",
    title: "Spickzettel Grenzen",
    description: "A4 mit den wichtigsten Sätzen",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/avGqFKFuKFfFYANu.webp",
    pdfUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/obwIZiRPiVPphIUX.pdf",
    category: "handeln",
  },
];
