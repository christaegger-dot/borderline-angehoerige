import { existsSync, statSync } from "node:fs";
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
      .filter(
        asset =>
          !existsSync(asset.filePath) || statSync(asset.filePath).size === 0
      )
      .map(asset => ({
        path: asset.path,
        usages: asset.usages,
      }));

    expect(missingAssets).toEqual([]);
  });

  it("withholds the superseded Validierungstreppe assets", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/validierung-die-validierungs-treppe-v10.pdf",
        "/infografiken/validierung-die-validierungs-treppe-v10.webp",
        "/infografiken/extras/thumbnails/validierung-die-validierungs-treppe-v10.webp",
        "/infografiken/validierung-die-validierungs-treppe-v5.pdf",
        "/infografiken/validierung-die-validierungs-treppe-v5.webp",
        "/infografiken/extras/thumbnails/validierung-die-validierungs-treppe-v5.webp",
      ]
    );
  });

  it("withholds the superseded Krisenkommunikation assets", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/deeskalation-der-deeskalations-pfad-v11.pdf",
        "/infografiken/deeskalation-der-deeskalations-pfad-v11.webp",
        "/infografiken/extras/thumbnails/deeskalation-der-deeskalations-pfad-v11.webp",
        "/infografiken/deeskalation-der-deeskalations-pfad-v9.pdf",
        "/infografiken/deeskalation-der-deeskalations-pfad-v9.webp",
        "/infografiken/extras/thumbnails/deeskalation-der-deeskalations-pfad-v9.webp",
      ]
    );
  });

  it("withholds the superseded Wenn-Worte-Treffen visuals", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/manus-wenn-worte-treffen-v3.pdf",
        "/infografiken/manus-wenn-worte-treffen-v3.webp",
        "/infografiken/extras/thumbnails/manus-wenn-worte-treffen-v3-thumb.png",
        "/infografiken/manus-wenn-worte-treffen-v2.pdf",
        "/infografiken/manus-wenn-worte-treffen-v2.webp",
        "/infografiken/extras/thumbnails/manus-wenn-worte-treffen-v2.webp",
        "/infografiken/manus-wenn-worte-treffen-v1.pdf",
        "/infografiken/manus-wenn-worte-treffen-v1.webp",
        "/infografiken/extras/thumbnails/manus-wenn-worte-treffen-v1.webp",
      ]
    );
  });

  it("withholds the superseded Pause-statt-Streit assets", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/manus-pause-statt-streit-v3.pdf",
        "/infografiken/manus-pause-statt-streit-v3.webp",
        "/infografiken/extras/thumbnails/manus-pause-statt-streit-v3-thumb.png",
        "/infografiken/manus-pause-statt-streit-v2.pdf",
        "/infografiken/manus-pause-statt-streit-v2.webp",
        "/infografiken/extras/thumbnails/manus-pause-statt-streit-v2.webp",
        "/infografiken/manus-pause-statt-streit-v1.pdf",
        "/infografiken/manus-pause-statt-streit-v1.webp",
        "/infografiken/extras/thumbnails/manus-pause-statt-streit-v1.webp",
      ]
    );
  });

  it("withholds the superseded Grenzen-ohne-Eskalation assets", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/manus-grenzen-ohne-eskalation-v3.pdf",
        "/infografiken/manus-grenzen-ohne-eskalation-v3.webp",
        "/infografiken/extras/thumbnails/manus-grenzen-ohne-eskalation-v3-thumb.png",
        "/infografiken/manus-grenzen-ohne-eskalation-v2.pdf",
        "/infografiken/manus-grenzen-ohne-eskalation-v2.webp",
        "/infografiken/extras/thumbnails/manus-grenzen-ohne-eskalation-v2.webp",
        "/infografiken/manus-grenzen-ohne-eskalation-v1.pdf",
        "/infografiken/manus-grenzen-ohne-eskalation-v1.webp",
        "/infografiken/extras/thumbnails/manus-grenzen-ohne-eskalation-v1.webp",
      ]
    );
  });

  it("uses the freigegebene Spiegeln-statt-Aufsaugen v3 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-spiegeln-statt-aufsaugen-v3.pdf",
        "/infografiken/manus-spiegeln-statt-aufsaugen-v3.webp",
        "/infografiken/extras/thumbnails/manus-spiegeln-statt-aufsaugen-v3-thumb.png",
      ],
      [
        "/infografiken/manus-spiegeln-statt-aufsaugen-v2.pdf",
        "/infografiken/manus-spiegeln-statt-aufsaugen-v2.webp",
        "/infografiken/extras/thumbnails/manus-spiegeln-statt-aufsaugen-v2.webp",
        "/infografiken/manus-spiegeln-statt-aufsaugen-v1.pdf",
        "/infografiken/manus-spiegeln-statt-aufsaugen-v1.webp",
        "/infografiken/extras/thumbnails/manus-spiegeln-statt-aufsaugen-v1.webp",
      ]
    );
  });

  it("withholds the superseded Rolle-klaeren assets", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/manus-rolle-klaeren-v3.pdf",
        "/infografiken/manus-rolle-klaeren-v3.webp",
        "/infografiken/extras/thumbnails/manus-rolle-klaeren-v3-thumb.png",
        "/infografiken/manus-rolle-klaeren-v2.pdf",
        "/infografiken/manus-rolle-klaeren-v2.webp",
        "/infografiken/extras/thumbnails/manus-rolle-klaeren-v2.webp",
      ]
    );
  });

  it("uses the freigegebene Warnsignale v3 assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/manus-warnsignale-v3.pdf",
        "/infografiken/manus-warnsignale-v3.webp",
        "/infografiken/extras/thumbnails/manus-warnsignale-v3-thumb.png",
      ],
      [
        "/infografiken/manus-warnsignale-v2.pdf",
        "/infografiken/manus-warnsignale-v2.webp",
        "/infografiken/extras/thumbnails/manus-warnsignale-v2.webp",
        "/infografiken/manus-warnsignale-v1.pdf",
        "/infografiken/manus-warnsignale-v1.webp",
        "/infografiken/extras/thumbnails/manus-warnsignale-v1.webp",
      ]
    );
  });

  it("withholds the superseded Eisberg assets", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/eisberg-der-eisberg-v8.pdf",
        "/infografiken/eisberg-der-eisberg-v8.webp",
        "/infografiken/extras/thumbnails/eisberg-der-eisberg-v8.webp",
        "/infografiken/eisberg-der-eisberg-v6.pdf",
        "/infografiken/eisberg-der-eisberg-v6.webp",
        "/infografiken/extras/thumbnails/eisberg-der-eisberg-v6.webp",
      ]
    );
  });

  it("withholds the superseded Pendel visuals", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/pendel-das-bewertungs-pendel-v16.pdf",
        "/infografiken/pendel-das-bewertungs-pendel-v16.webp",
        "/infografiken/extras/thumbnails/pendel-das-bewertungs-pendel-v16.webp",
        "/infografiken/pendel-das-bewertungs-pendel-v14.pdf",
        "/infografiken/pendel-das-bewertungs-pendel-v14.webp",
        "/infografiken/extras/thumbnails/pendel-das-bewertungs-pendel-v14.webp",
      ]
    );
  });

  it("withholds the superseded Schuld-Verantwortung assets", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/manus-schuld-verantwortung-v3.pdf",
        "/infografiken/manus-schuld-verantwortung-v3.webp",
        "/infografiken/extras/thumbnails/manus-schuld-verantwortung-v3-thumb.png",
        "/infografiken/manus-schuld-verantwortung-v2.pdf",
        "/infografiken/manus-schuld-verantwortung-v2.webp",
        "/infografiken/extras/thumbnails/manus-schuld-verantwortung-v2.webp",
        "/infografiken/manus-schuld-verantwortung-v1.pdf",
        "/infografiken/manus-schuld-verantwortung-v1.webp",
        "/infografiken/extras/thumbnails/manus-schuld-verantwortung-v1.webp",
      ]
    );
  });

  it("withholds the superseded Drei-Saeulen and Fortschritt-Paradox assets", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/manus-drei-saeulen-v2.pdf",
        "/infografiken/manus-drei-saeulen-v2.webp",
        "/infografiken/extras/thumbnails/manus-drei-saeulen-v2-thumb.png",
        "/infografiken/manus-drei-saeulen-v1.pdf",
        "/infografiken/manus-drei-saeulen-v1.webp",
        "/infografiken/extras/thumbnails/manus-drei-saeulen-v1.webp",
        "/infografiken/fortschritt-das-fortschritt-paradox-v5.pdf",
        "/infografiken/fortschritt-das-fortschritt-paradox-v5.webp",
        "/infografiken/extras/thumbnails/fortschritt-das-fortschritt-paradox-v5.webp",
      ]
    );
  });

  it("withholds the superseded Bruecke-Gelaender assets", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/manus-bruecke-gelaender-v2.pdf",
        "/infografiken/manus-bruecke-gelaender-v2.webp",
        "/infografiken/extras/thumbnails/manus-bruecke-gelaender-v2-thumb.png",
        "/infografiken/manus-bruecke-gelaender-v1.pdf",
        "/infografiken/manus-bruecke-gelaender-v1.webp",
        "/infografiken/extras/thumbnails/manus-bruecke-gelaender-v1.webp",
      ]
    );
  });

  it("withholds the superseded Anspannungskurve assets", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [],
      [
        "/infografiken/manus-anspannungskurve-v2.pdf",
        "/infografiken/manus-anspannungskurve-v2.webp",
        "/infografiken/extras/thumbnails/manus-anspannungskurve-v2-thumb.png",
        "/infografiken/manus-anspannungskurve-v1.pdf",
        "/infografiken/manus-anspannungskurve-v1.webp",
        "/infografiken/extras/thumbnails/manus-anspannungskurve-v1.webp",
      ]
    );
  });

  it("uses the synchronized PUK Garten assets in productive references", () => {
    const referencedPaths = collectReferencedInfografikAssets().map(
      asset => asset.path
    );

    expectProductiveAssetVersion(
      referencedPaths,
      [
        "/infografiken/puk-garten-v1.pdf",
        "/infografiken/puk-garten-v1.webp",
        "/infografiken/extras/thumbnails/puk-garten-v1.webp",
      ],
      [
        "/infografiken/manus-garten-v1.pdf",
        "/infografiken/manus-garten-v1.webp",
        "/infografiken/extras/thumbnails/manus-garten-v1.webp",
      ]
    );
  });
});
