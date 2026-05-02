import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { collectReferencedInfografikAssets } from "@/content/infografikAssetRefs";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../..");
const PUBLIC_ROOT = path.join(REPO_ROOT, "client", "public");

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
});
