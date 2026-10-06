import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import {
  buildHandoutAssetManifest,
  compareHandoutAssetManifest,
  serializePlainHandoutContent,
  type HandoutAssetManifest,
} from "../../../qa/scripts/handout-asset-register";
import { handoutGovernance } from "@/content/handoutGovernance";
import { HANDOUT_TEXT_VERSION_IDS } from "@/content/handoutTextMetas";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../..");
let manifest: HandoutAssetManifest;
const clone = () =>
  JSON.parse(JSON.stringify(manifest)) as HandoutAssetManifest;

beforeAll(async () => {
  manifest = await buildHandoutAssetManifest(REPO_ROOT);
});

describe("complete handout asset register", () => {
  it("is deterministic and includes withdrawn IDs without inventing current files or approvals", async () => {
    expect(await buildHandoutAssetManifest(REPO_ROOT)).toEqual(manifest);
    expect(manifest.issues).toEqual([]);
    expect(manifest.entries.map(entry => entry.id).sort()).toEqual(
      Object.keys(handoutGovernance).sort()
    );
    expect(
      manifest.entries
        .filter(entry => entry.webPath)
        .map(entry => entry.id)
        .sort()
    ).toEqual([...HANDOUT_TEXT_VERSION_IDS].sort());
    for (const entry of manifest.entries) {
      expect(Object.values(entry.realApprovals)).toEqual([
        "unknown",
        "unknown",
        "unknown",
        "unknown",
        "unknown",
      ]);
      if (entry.webPath)
        expect(entry.webContent?.sha256).toMatch(/^[a-f0-9]{64}$/);
      else expect(entry.webContent).toBeNull();
    }
    expect(
      manifest.entries.find(entry => entry.id === "notfallkarte-zuerich")
    ).toMatchObject({
      registeredVersion: null,
      webPath: null,
      observedFiles: [],
    });
  });

  it("hashes plain content independently of object-key order and rejects non-JSON values", () => {
    expect(
      serializePlainHandoutContent({
        intro: ["first", "second"],
        title: "Example",
      })
    ).toEqual(
      serializePlainHandoutContent({
        title: "Example",
        intro: ["first", "second"],
      })
    );
    expect(
      serializePlainHandoutContent({ intro: ["second", "first"] })
    ).not.toEqual(serializePlainHandoutContent({ intro: ["first", "second"] }));
    expect(() => serializePlainHandoutContent({ date: new Date() })).toThrow(
      /plain JSON objects/
    );
    expect(() =>
      serializePlainHandoutContent({ content: () => "text" })
    ).toThrow(/plain JSON values/);
  });

  it("detects web-content drift when every physical PDF and image is unchanged", () => {
    const actual = clone();
    const changed = actual.entries.find(entry => entry.webPath)!;
    changed.webContent!.sha256 = "0".repeat(64);
    expect(actual.observedFiles).toEqual(manifest.observedFiles);
    expect(compareHandoutAssetManifest(actual, manifest)).toContain(
      `Registered web content changed: ${changed.id}`
    );
  });

  it("keeps the registered legacy catalog paths separate from a candidate package", () => {
    const entry = manifest.entries.find(item => item.id === "leuchtturm")!;
    expect(entry.registeredCatalogPaths).toContain(
      "/infografiken/manus-leuchtturm-v1.pdf"
    );
    expect(
      entry.expectedAssets.find(asset => asset.role === "pdf")?.paths
    ).toEqual(["/infografiken/puk-leuchtturm-orientierung-v2.pdf"]);
    expect(entry.observedFiles).toContain(
      "qa/withheld-handouts/issue-615-visual-refresh-2026-10-05/infografiken/puk-leuchtturm-orientierung-v2.pdf"
    );
    expect(
      manifest.observedFiles.find(file =>
        file.path.endsWith("extras/thumbnails/puk-garten-v1.webp")
      )?.sha256
    ).not.toEqual(
      manifest.observedFiles.find(
        file => file.path === "client/public/infografiken/puk-garten-v1.webp"
      )?.sha256
    );
  });

  it("fails when a registered observed file disappears", () => {
    const actual = clone();
    const removed = actual.observedFiles.shift()!;
    expect(compareHandoutAssetManifest(actual, manifest)).toContain(
      `Registered file missing: ${removed.path}`
    );
  });

  it("fails when an observed file changes bytes", () => {
    const actual = clone();
    const changed = actual.observedFiles.find(
      file => file.storage === "public"
    )!;
    changed.sha256 = "0".repeat(64);
    expect(compareHandoutAssetManifest(actual, manifest)).toContain(
      `Registered file changed: ${changed.path}`
    );
  });

  it("fails on a new public file and retains physical/package guard failures", () => {
    const actual = clone();
    actual.observedFiles.push({
      path: "client/public/infografiken/unregistered.pdf",
      storage: "public",
      sizeBytes: 1,
      sha256: "0".repeat(64),
      publicPath: "/infografiken/unregistered.pdf",
      publicPathBasis: "public-root",
    });
    actual.issues.push(
      "Unexpected public handout asset: client/public/infografiken/unregistered.pdf",
      "Package asset differs from manifest: candidate.pdf"
    );
    expect(compareHandoutAssetManifest(actual, manifest)).toEqual(
      expect.arrayContaining([
        "Unregistered observed file: client/public/infografiken/unregistered.pdf",
        "Unexpected public handout asset: client/public/infografiken/unregistered.pdf",
        "Package asset differs from manifest: candidate.pdf",
      ])
    );
  });
});
