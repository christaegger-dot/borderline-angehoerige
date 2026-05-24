import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { collectReferencedInfografikAssets } from "@/content/infografikAssetRefs";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../..");
const PUBLIC_ROOT = path.join(REPO_ROOT, "client", "public");

function expectProductiveAssetVersion(
  referencedPaths: string[],
  currentPaths: string[],
  legacyPaths: string[]
) {
  for (const assetPath of currentPaths) {
    expect(referencedPaths).toContain(assetPath);
  }

  for (const assetPath of legacyPaths) {
    expect(referencedPaths).not.toContain(assetPath);
  }
}

describe("infografik assets", () => {
  it("keeps every referenced infografik asset available in public/", () => {
    const missingAssets = collectReferencedInfografikAssets()
      .map(asset => ({
        ...asset,
        filePath: path.join(PUBLIC_ROOT, asset.path.replace(/^\//, "")),
      }))
      .filter(asset => !existsSync(asset.filePath))
      .map(asset => ({
        path: asset.path,
        usages: asset.usages,
      }));

    expect(missingAssets).toEqual([]);
  });

  it("uses the freigegebene Validierungstreppe v9 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/validierung-die-validierungs-treppe-v9.pdf",
        "/infografiken/validierung-die-validierungs-treppe-v9.webp",
        "/infografiken/extras/thumbnails/validierung-die-validierungs-treppe-v9.webp",
      ],
      [
        "/infografiken/validierung-die-validierungs-treppe-v5.pdf",
        "/infografiken/validierung-die-validierungs-treppe-v5.webp",
        "/infografiken/extras/thumbnails/validierung-die-validierungs-treppe-v5.webp",
      ]
    );
  });

  it("uses the freigegebene Krisenkommunikation v10 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/deeskalation-der-deeskalations-pfad-v10.pdf",
        "/infografiken/deeskalation-der-deeskalations-pfad-v10.webp",
        "/infografiken/extras/thumbnails/deeskalation-der-deeskalations-pfad-v10.webp",
      ],
      [
        "/infografiken/deeskalation-der-deeskalations-pfad-v9.pdf",
        "/infografiken/deeskalation-der-deeskalations-pfad-v9.webp",
        "/infografiken/extras/thumbnails/deeskalation-der-deeskalations-pfad-v9.webp",
      ]
    );
  });

  it("uses the freigegebene Wenn-Worte-Treffen v2 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-wenn-worte-treffen-v2.pdf",
        "/infografiken/manus-wenn-worte-treffen-v2.webp",
        "/infografiken/extras/thumbnails/manus-wenn-worte-treffen-v2.webp",
      ],
      [
        "/infografiken/manus-wenn-worte-treffen-v1.pdf",
        "/infografiken/manus-wenn-worte-treffen-v1.webp",
        "/infografiken/extras/thumbnails/manus-wenn-worte-treffen-v1.webp",
      ]
    );
  });

  it("uses the freigegebene Pause-statt-Streit v2 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-pause-statt-streit-v2.pdf",
        "/infografiken/manus-pause-statt-streit-v2.webp",
        "/infografiken/extras/thumbnails/manus-pause-statt-streit-v2.webp",
      ],
      [
        "/infografiken/manus-pause-statt-streit-v1.pdf",
        "/infografiken/manus-pause-statt-streit-v1.webp",
        "/infografiken/extras/thumbnails/manus-pause-statt-streit-v1.webp",
      ]
    );
  });

  it("uses the freigegebene Grenzen-ohne-Eskalation v2 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-grenzen-ohne-eskalation-v2.pdf",
        "/infografiken/manus-grenzen-ohne-eskalation-v2.webp",
        "/infografiken/extras/thumbnails/manus-grenzen-ohne-eskalation-v2.webp",
      ],
      [
        "/infografiken/manus-grenzen-ohne-eskalation-v1.pdf",
        "/infografiken/manus-grenzen-ohne-eskalation-v1.webp",
        "/infografiken/extras/thumbnails/manus-grenzen-ohne-eskalation-v1.webp",
      ]
    );
  });
});
