import { genesungItems } from "./genesung";
import { grenzenItems } from "./grenzen";
import { kommItems } from "./kommunizieren";
import { materials } from "./materialien";
import { selbstfuersorgeInfografiken } from "./selbstfuersorge";
import { unterstuetzenItems } from "./unterstuetzen";
import { verstehenInfografiken } from "./verstehen";

export type InfografikAssetUsage = {
  source:
    | "materials"
    | "verstehen"
    | "unterstuetzen"
    | "kommunizieren"
    | "grenzen"
    | "selbstfuersorge"
    | "genesung";
  id: string;
  field: string;
};

export type ReferencedInfografikAsset = {
  path: string;
  usages: InfografikAssetUsage[];
};

type AssetCandidate = {
  source: InfografikAssetUsage["source"];
  id: string;
  fields: Record<string, string | undefined>;
};

function pushAssetReference(
  registry: Map<string, ReferencedInfografikAsset>,
  usage: InfografikAssetUsage,
  assetPath: string | undefined
) {
  if (!assetPath || !assetPath.startsWith("/infografiken/")) {
    return;
  }

  const existing = registry.get(assetPath);
  if (existing) {
    existing.usages.push(usage);
    return;
  }

  registry.set(assetPath, {
    path: assetPath,
    usages: [usage],
  });
}

function getAssetCandidates(): AssetCandidate[] {
  return [
    ...materials.map(item => ({
      source: "materials" as const,
      id: item.id,
      fields: {
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
        downloadUrl: item.downloadUrl,
        pdfUrl: item.pdfUrl,
        previewUrl: item.previewUrl,
      },
    })),
    ...verstehenInfografiken.map(item => ({
      source: "verstehen" as const,
      id: item.id,
      fields: {
        webpUrl: item.webpUrl,
        thumbnailUrl: item.thumbnailUrl,
        pdfUrl: item.pdfUrl,
      },
    })),
    ...unterstuetzenItems.map(item => ({
      source: "unterstuetzen" as const,
      id: item.id,
      fields: {
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
        pdfUrl: item.pdfUrl,
      },
    })),
    ...kommItems.map(item => ({
      source: "kommunizieren" as const,
      id: item.id,
      fields: {
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
        pdfUrl: item.pdfUrl,
      },
    })),
    ...grenzenItems.map(item => ({
      source: "grenzen" as const,
      id: item.id,
      fields: {
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
        pdfUrl: item.pdfUrl,
      },
    })),
    ...selbstfuersorgeInfografiken.map(item => ({
      source: "selbstfuersorge" as const,
      id: item.id,
      fields: {
        webp: item.webp,
        thumbnailUrl: item.thumbnailUrl,
        pdf: item.pdf,
      },
    })),
    ...genesungItems.map(item => ({
      source: "genesung" as const,
      id: item.id,
      fields: {
        img: item.img,
        thumbnailUrl: item.thumbnailUrl,
        pdf: item.pdf,
      },
    })),
  ];
}

export function collectReferencedInfografikAssets() {
  const registry = new Map<string, ReferencedInfografikAsset>();

  for (const candidate of getAssetCandidates()) {
    for (const [field, assetPath] of Object.entries(candidate.fields)) {
      pushAssetReference(
        registry,
        {
          source: candidate.source,
          id: candidate.id,
          field,
        },
        assetPath
      );
    }
  }

  return Array.from(registry.values()).sort((left, right) =>
    left.path.localeCompare(right.path)
  );
}
