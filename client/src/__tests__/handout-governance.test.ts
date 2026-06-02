import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { genesungItems } from "@/content/genesung";
import { grenzenItems } from "@/content/grenzen";
import {
  getHandoutGovernance,
  HANDOUT_STANDARD_DISCLAIMER,
} from "@/content/handoutGovernance";
import { HANDOUT_TEXT_VERSION_IDS } from "@/content/handoutTextMetas";
import { handoutTextVersions as genesungTextVersions } from "@/content/handoutTextVersionContent/genesung.content";
import { handoutTextVersions as grenzenTextVersions } from "@/content/handoutTextVersionContent/grenzen.content";
import { handoutTextVersions as kommunizierenTextVersions } from "@/content/handoutTextVersionContent/kommunizieren.content";
import { handoutTextVersions as selbstfuersorgeTextVersions } from "@/content/handoutTextVersionContent/selbstfuersorge.content";
import { handoutTextVersions as soforthilfeTextVersions } from "@/content/handoutTextVersionContent/soforthilfe.content";
import { handoutTextVersions as unterstuetzenTextVersions } from "@/content/handoutTextVersionContent/unterstuetzen.content";
import { handoutTextVersions as verstehenTextVersions } from "@/content/handoutTextVersionContent/verstehen.content";
import { kommItems } from "@/content/kommunizieren";
import { materials } from "@/content/materialien";
import { selbstfuersorgeInfografiken } from "@/content/selbstfuersorge";
import { unterstuetzenItems } from "@/content/unterstuetzen";
import { verstehenInfografiken } from "@/content/verstehen";
import type { HandoutTextVersion } from "@/content/handoutTextVersionTypes";

const allTextVersions: HandoutTextVersion[] = [
  ...genesungTextVersions,
  ...grenzenTextVersions,
  ...kommunizierenTextVersions,
  ...selbstfuersorgeTextVersions,
  ...soforthilfeTextVersions,
  ...unterstuetzenTextVersions,
  ...verstehenTextVersions,
];

type ProductiveHandoutSource = {
  id: string;
  sourceUrl: string;
};

function pdfStem(sourceUrl: string) {
  return (
    sourceUrl
      .split(/[?#]/, 1)[0]
      ?.split("/")
      .pop()
      ?.replace(/\.pdf$/i, "") ?? ""
  );
}

function localPublicPath(sourceUrl: string) {
  if (!sourceUrl.startsWith("/") || !sourceUrl.toLowerCase().endsWith(".pdf")) {
    return null;
  }

  return path.resolve(
    process.cwd(),
    "client/public",
    sourceUrl.replace(/^\//, "")
  );
}

function collectProductiveHandoutSources() {
  const candidates: ProductiveHandoutSource[] = [
    ...materials.flatMap(item => {
      const sourceUrl = item.pdfUrl ?? item.downloadUrl;
      return sourceUrl ? [{ id: item.id, sourceUrl }] : [];
    }),
    ...verstehenInfografiken.map(item => ({
      id: item.id,
      sourceUrl: item.pdfUrl,
    })),
    ...unterstuetzenItems.map(item => ({
      id: item.id,
      sourceUrl: item.pdfUrl,
    })),
    ...kommItems.map(item => ({ id: item.id, sourceUrl: item.pdfUrl })),
    ...grenzenItems.map(item => ({ id: item.id, sourceUrl: item.pdfUrl })),
    ...selbstfuersorgeInfografiken.map(item => ({
      id: item.id,
      sourceUrl: item.pdf,
    })),
    ...genesungItems.map(item => ({ id: item.id, sourceUrl: item.pdf })),
  ];

  const byId = new Map<string, ProductiveHandoutSource>();
  for (const candidate of candidates) {
    const existing = byId.get(candidate.id);
    if (existing && existing.sourceUrl !== candidate.sourceUrl) {
      throw new Error(
        `Inconsistent handout source for ${candidate.id}: ${existing.sourceUrl} vs ${candidate.sourceUrl}`
      );
    }
    byId.set(candidate.id, candidate);
  }

  return Array.from(byId.values());
}

describe("handout governance", () => {
  it("requires document type and approved version for every text version", () => {
    for (const id of HANDOUT_TEXT_VERSION_IDS) {
      const governance = getHandoutGovernance(id);

      expect(governance, id).toBeTruthy();
      expect(governance?.documentType, id).toMatch(
        /^(ORIENTIERUNGSBLATT|PRAXISBLATT|KRISEN-HANDOUT)$/
      );
      expect(governance?.approvedVersion, id).not.toBe("");
    }
  });

  it("keeps productive pdf sources on their approved asset version", () => {
    for (const item of collectProductiveHandoutSources()) {
      const governance = getHandoutGovernance(item.id);

      expect(governance, item.id).toBeTruthy();
      expect(pdfStem(item.sourceUrl), item.id).toBe(
        governance?.approvedVersion
      );
    }
  });

  it("keeps local productive pdf sources present on disk", () => {
    for (const item of collectProductiveHandoutSources()) {
      const localPath = localPublicPath(item.sourceUrl);

      if (!localPath) {
        continue;
      }

      expect(fs.existsSync(localPath), item.sourceUrl).toBe(true);
    }
  });

  it("keeps crisis numbers out of orientation and practice handouts", () => {
    const crisisNumberPattern =
      /\b(?:112|117|143|144|145)\b|058\s*384|0800\s*33\s*66\s*55|0848\s*800\s*858/i;

    for (const version of allTextVersions) {
      if (version.documentType === "KRISEN-HANDOUT") {
        continue;
      }

      expect(
        JSON.stringify(version),
        `${version.id} must not carry crisis numbers`
      ).not.toMatch(crisisNumberPattern);
    }
  });

  it("adds the standard disclaimer to non-crisis handout text versions", () => {
    for (const version of allTextVersions) {
      if (version.documentType === "KRISEN-HANDOUT") {
        continue;
      }

      expect(version.intro, version.id).toContain(HANDOUT_STANDARD_DISCLAIMER);
    }
  });
});
