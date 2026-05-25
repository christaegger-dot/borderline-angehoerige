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

  it("uses the freigegebene Spiegeln-statt-Aufsaugen v2 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-spiegeln-statt-aufsaugen-v2.pdf",
        "/infografiken/manus-spiegeln-statt-aufsaugen-v2.webp",
        "/infografiken/extras/thumbnails/manus-spiegeln-statt-aufsaugen-v2.webp",
      ],
      [
        "/infografiken/manus-spiegeln-statt-aufsaugen-v1.pdf",
        "/infografiken/manus-spiegeln-statt-aufsaugen-v1.webp",
        "/infografiken/extras/thumbnails/manus-spiegeln-statt-aufsaugen-v1.webp",
      ]
    );
  });

  it("uses the freigegebene Rolle-klaeren v2 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-rolle-klaeren-v2.pdf",
        "/infografiken/manus-rolle-klaeren-v2.webp",
        "/infografiken/extras/thumbnails/manus-rolle-klaeren-v2.webp",
      ],
      [
        "/infografiken/sphären-die-einfluss-sphären-v3.pdf",
        "/infografiken/sphären-die-einfluss-sphären-v3.webp",
        "/infografiken/extras/thumbnails/sphären-die-einfluss-sphären-v3.webp",
      ]
    );
  });

  it("uses the freigegebene Warnsignale v2 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-warnsignale-v2.pdf",
        "/infografiken/manus-warnsignale-v2.webp",
        "/infografiken/extras/thumbnails/manus-warnsignale-v2.webp",
      ],
      [
        "/infografiken/manus-warnsignale-v1.pdf",
        "/infografiken/manus-warnsignale-v1.webp",
        "/infografiken/extras/thumbnails/manus-warnsignale-v1.webp",
      ]
    );
  });

  it("uses the freigegebene Eisberg v7 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/eisberg-der-eisberg-v7.pdf",
        "/infografiken/eisberg-der-eisberg-v7.webp",
        "/infografiken/extras/thumbnails/eisberg-der-eisberg-v7.webp",
      ],
      [
        "/infografiken/eisberg-der-eisberg-v6.pdf",
        "/infografiken/eisberg-der-eisberg-v6.webp",
        "/infografiken/extras/thumbnails/eisberg-der-eisberg-v6.webp",
      ]
    );
  });

  it("uses the freigegebene Spaltung v15 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/pendel-das-bewertungs-pendel-v15.pdf",
        "/infografiken/pendel-das-bewertungs-pendel-v15.webp",
        "/infografiken/extras/thumbnails/pendel-das-bewertungs-pendel-v15.webp",
      ],
      [
        "/infografiken/pendel-das-bewertungs-pendel-v14.pdf",
        "/infografiken/pendel-das-bewertungs-pendel-v14.webp",
        "/infografiken/extras/thumbnails/pendel-das-bewertungs-pendel-v14.webp",
      ]
    );
  });

  it("uses the freigegebene Schuld-Verantwortung v2 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-schuld-verantwortung-v2.pdf",
        "/infografiken/manus-schuld-verantwortung-v2.webp",
        "/infografiken/extras/thumbnails/manus-schuld-verantwortung-v2.webp",
      ],
      [
        "/infografiken/manus-schuld-verantwortung-v1.pdf",
        "/infografiken/manus-schuld-verantwortung-v1.webp",
        "/infografiken/extras/thumbnails/manus-schuld-verantwortung-v1.webp",
      ]
    );
  });

  it("uses the freigegebene Bruecke-Gelaender v1 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-bruecke-gelaender-v1.pdf",
        "/infografiken/manus-bruecke-gelaender-v1.webp",
        "/infografiken/extras/thumbnails/manus-bruecke-gelaender-v1.webp",
      ],
      []
    );
  });

  it("uses the freigegebene Anspannungskurve v1 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-anspannungskurve-v1.pdf",
        "/infografiken/manus-anspannungskurve-v1.webp",
        "/infografiken/extras/thumbnails/manus-anspannungskurve-v1.webp",
      ],
      []
    );
  });
});
