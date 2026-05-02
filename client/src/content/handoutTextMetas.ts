import { genesungItems } from "./genesung";
import { grenzenItems } from "./grenzen";
import { kommItems } from "./kommunizieren";
import { materials, type MaterialCategory } from "./materialien";
import { selbstfuersorgeInfografiken } from "./selbstfuersorge";
import type { HandoutTextVersionMeta } from "./handoutTextVersionTypes";
import { unterstuetzenItems } from "./unterstuetzen";
import { verstehenInfografiken } from "./verstehen";

const TOPIC_META: Record<
  Exclude<MaterialCategory, "alle">,
  { label: string; href: string }
> = {
  verstehen: { label: "Verstehen", href: "/verstehen" },
  unterstuetzen: { label: "Unterstützen", href: "/unterstuetzen/uebersicht" },
  kommunizieren: { label: "Kommunizieren", href: "/kommunizieren" },
  grenzen: { label: "Grenzen", href: "/grenzen" },
  selbstfuersorge: { label: "Selbstfürsorge", href: "/selbstfuersorge" },
  genesung: { label: "Genesung", href: "/genesung" },
  soforthilfe: { label: "Soforthilfe", href: "/soforthilfe" },
};

export const HANDOUT_TEXT_VERSION_IDS = [
  "notfallplan-krise",
  "leuchtturm",
  "rolle-klaeren",
  "im-krisenmodus",
  "drei-saeulen",
  "konsistenz-prinzip",
  "beziehungs-achtsamkeit",
  "6-leitlinien",
  "4-alltags-tipps",
  "eisberg",
  "spaltung",
  "krisenkommunikation",
  "alarm-modus",
  "4-phasen",
  "gehirn",
  "warnsignale",
  "sauerstoffmaske",
  "stopp-technik",
  "energie-konto",
  "erlaubnis-karte",
  "schuld-verantwortung",
  "radikale-akzeptanz",
  "wenn-worte-treffen",
  "gespraeche-kippen",
  "grenzen-ohne-eskalation",
  "pause-statt-streit",
  "zuhoeren-ohne-zustimmen",
  "beispiel-dialog",
  "dear",
  "spiegeln-statt-aufsaugen",
  "4-arten-von-grenzen",
  "grenzen-erkennen",
  "lmk",
  "genesung-zahlen",
  "fortschritt-paradox",
  "remission-heilung",
  "5-faktoren-genesung",
  "rolle-genesungsprozess",
  "kinder",
  "grenzen-spickzettel",
] as const;

function requireMaterial(id: string) {
  const material = materials.find(item => item.id === id);
  if (material) {
    const pdfSourceUrl = material.pdfUrl ?? material.downloadUrl;
    if (!pdfSourceUrl) {
      throw new Error(`Material item is missing a PDF source: ${id}`);
    }

    return {
      title: material.title,
      description: material.description,
      category: material.category,
      kind: material.kind,
      previewImageUrl: material.url,
      topic: TOPIC_META[material.category],
      pdfSourceUrl,
    };
  }

  const verstehenMaterial = verstehenInfografiken.find(item => item.id === id);
  if (verstehenMaterial) {
    return {
      title: verstehenMaterial.title,
      description: verstehenMaterial.description,
      category: "verstehen" as const,
      kind: "Infografik" as const,
      previewImageUrl: verstehenMaterial.webpUrl,
      topic: TOPIC_META.verstehen,
      pdfSourceUrl: verstehenMaterial.pdfUrl,
    };
  }

  const unterstuetzenMaterial = unterstuetzenItems.find(item => item.id === id);
  if (unterstuetzenMaterial) {
    return {
      title: unterstuetzenMaterial.title,
      description: unterstuetzenMaterial.description,
      category: "unterstuetzen" as const,
      kind: "Infografik" as const,
      previewImageUrl: unterstuetzenMaterial.url,
      topic: TOPIC_META.unterstuetzen,
      pdfSourceUrl: unterstuetzenMaterial.pdfUrl,
    };
  }

  const kommunizierenMaterial = kommItems.find(item => item.id === id);
  if (kommunizierenMaterial) {
    return {
      title: kommunizierenMaterial.title,
      description: kommunizierenMaterial.description,
      category: "kommunizieren" as const,
      kind: "Infografik" as const,
      previewImageUrl: kommunizierenMaterial.url,
      topic: TOPIC_META.kommunizieren,
      pdfSourceUrl: kommunizierenMaterial.pdfUrl,
    };
  }

  const grenzenMaterial = grenzenItems.find(item => item.id === id);
  if (grenzenMaterial) {
    return {
      title: grenzenMaterial.title,
      description: grenzenMaterial.description,
      category: "grenzen" as const,
      kind: "Infografik" as const,
      previewImageUrl: grenzenMaterial.url,
      topic: TOPIC_META.grenzen,
      pdfSourceUrl: grenzenMaterial.pdfUrl,
    };
  }

  const selbstfuersorgeMaterial = selbstfuersorgeInfografiken.find(
    item => item.id === id
  );
  if (selbstfuersorgeMaterial) {
    return {
      title: selbstfuersorgeMaterial.title,
      description: selbstfuersorgeMaterial.desc,
      category: "selbstfuersorge" as const,
      kind: "Infografik" as const,
      previewImageUrl: selbstfuersorgeMaterial.webp,
      topic: TOPIC_META.selbstfuersorge,
      pdfSourceUrl: selbstfuersorgeMaterial.pdf,
    };
  }

  const genesungMaterial = genesungItems.find(item => item.id === id);
  if (genesungMaterial) {
    return {
      title: genesungMaterial.title,
      description: genesungMaterial.desc,
      category: "genesung" as const,
      kind: "Infografik" as const,
      previewImageUrl: genesungMaterial.img,
      topic: TOPIC_META.genesung,
      pdfSourceUrl: genesungMaterial.pdf,
    };
  }

  throw new Error(`Unknown material item: ${id}`);
}

function createHandoutTextVersionMeta(id: string): HandoutTextVersionMeta {
  const {
    title,
    description,
    category,
    kind,
    previewImageUrl,
    topic,
    pdfSourceUrl,
  } = requireMaterial(id);

  return {
    id,
    path: `/materialien/text/${id}`,
    title,
    description,
    topicLabel: topic.label,
    topicHref: topic.href,
    category,
    kind,
    previewImageUrl,
    pdfSourceUrl,
  };
}

export const handoutTextVersionMetas = HANDOUT_TEXT_VERSION_IDS.map(id =>
  createHandoutTextVersionMeta(id)
);

const handoutTextVersionMetasById = new Map(
  handoutTextVersionMetas.map(version => [version.id, version])
);
const handoutTextVersionMetasBySource = new Map(
  handoutTextVersionMetas.map(version => [version.pdfSourceUrl, version])
);

export function getHandoutTextVersionMeta(id: string | undefined) {
  if (!id) {
    return null;
  }

  return handoutTextVersionMetasById.get(id) ?? null;
}

export function getHandoutTextVersionBySource(sourceUrl: string | undefined) {
  if (!sourceUrl) {
    return null;
  }

  return handoutTextVersionMetasBySource.get(sourceUrl) ?? null;
}

export function getHandoutTextVersionHrefBySource(
  sourceUrl: string | undefined
) {
  return getHandoutTextVersionBySource(sourceUrl)?.path ?? null;
}
