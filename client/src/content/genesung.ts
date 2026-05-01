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
    img: "/infografiken/manus-genesung-zahlen-v1.webp",
    pdf: "/infografiken/manus-genesung-zahlen-v1.pdf",
    category: "verstehen",
  },
  {
    id: "fortschritt-paradox",
    title: "Das Fortschritt-Paradox",
    desc: "Warum Rückfälle zum Weg gehören",
    img: "/infografiken/fortschritt-das-fortschritt-paradox-v4.png",
    thumbnailUrl:
      "/infografiken/extras/thumbnails/fortschritt-das-fortschritt-paradox-v4.png",
    pdf: "/infografiken/fortschritt-das-fortschritt-paradox-v4.pdf",
    category: "verstehen",
  },
  {
    id: "remission-heilung",
    title: "Remission vs. Heilung",
    desc: "Was Besserung wirklich bedeutet",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/HPRsNmCUFirjnraj.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KMjqRDjDjWVZpjhJ.pdf",
    category: "verstehen",
  },
  {
    id: "5-faktoren-genesung",
    title: "5 Faktoren, die Genesung fördern",
    desc: "Säulen-Modell: Was positiv beeinflusst",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/mFhtxtPMBkCEVPII.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qgrRYtMKOvwWmuah.pdf",
    category: "handeln",
  },
  {
    id: "rolle-genesungsprozess",
    title: "Ihre Rolle im Genesungsprozess",
    desc: "Was Sie tun können (und was nicht)",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GhgPDkJhqlqJkYzE.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/CZdiDaadpIWNOBFb.pdf",
    category: "handeln",
  },
];
