import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { genesungItems } from "@/content/genesung";
import { grenzenItems } from "@/content/grenzen";
import {
  getHandoutAssetVersion,
  getHandoutApprovalStatus,
  getHandoutGovernance,
  HANDOUT_STANDARD_DISCLAIMER,
  isHandoutVisualPublished,
  isHandoutWebVersionPublished,
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
import { kontaktByIdStrict } from "@/data/kontakte";

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
    if (!isHandoutVisualPublished(candidate.id)) {
      continue;
    }

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
  it("fails closed for unknown handout ids", () => {
    expect(isHandoutVisualPublished("nicht-registriert")).toBe(false);
    expect(getHandoutApprovalStatus("nicht-registriert")).toBe(
      "draft-editorial-review-pending"
    );
  });

  it("keeps unresolved P1 drift assets text-only and publishes rebuilt visuals", () => {
    const textOnlyIds = [
      "notfallplan-krise",
      "gehirn",
      "leuchtturm",
      "eisberg",
      "spaltung",
      "alarm-modus",
      "rolle-klaeren",
      "drei-saeulen",
      "konsistenz-prinzip",
      "beziehungs-achtsamkeit",
      "6-leitlinien",
      "4-alltags-tipps",
      "wenn-worte-treffen",
      "krisenkommunikation",
      "anspannungskurve",
      "grenzen-ohne-eskalation",
      "pause-statt-streit",
      "zuhoeren-ohne-zustimmen",
      "bruecke-gelaender",
      "sauerstoffmaske",
      "remission-heilung",
      "5-faktoren-genesung",
      "rolle-genesungsprozess",
      "fortschritt-paradox",
      "schuld-verantwortung",
    ];

    for (const id of textOnlyIds) {
      expect(isHandoutVisualPublished(id), id).toBe(false);
      expect(getHandoutGovernance(id)?.visualAssetStatus, id).toBe("text-only");
    }

    expect(getHandoutGovernance("4-phasen")?.publicationStatus).toBe(
      "withdrawn"
    );
    expect(isHandoutVisualPublished("4-phasen")).toBe(false);
    expect(HANDOUT_TEXT_VERSION_IDS).not.toContain("4-phasen");
    expect(verstehenInfografiken.some(item => item.id === "4-phasen")).toBe(
      false
    );
    expect(verstehenTextVersions.some(item => item.id === "4-phasen")).toBe(
      false
    );

    expect(getHandoutGovernance("im-krisenmodus")?.publicationStatus).toBe(
      "withdrawn"
    );
    expect(isHandoutVisualPublished("im-krisenmodus")).toBe(false);
    expect(HANDOUT_TEXT_VERSION_IDS).not.toContain("im-krisenmodus");

    for (const id of [
      "genesung-zahlen",
      "kinder",
      "stopp-technik",
      "dear",
      "garten",
      "4-arten-von-grenzen",
    ]) {
      expect(isHandoutVisualPublished(id), id).toBe(true);
    }
  });

  it("keeps the notfallkarte web-only and permanently blocks its retired assets", () => {
    expect(isHandoutVisualPublished("notfallkarte-zuerich")).toBe(false);
    expect(isHandoutWebVersionPublished("notfallkarte-zuerich")).toBe(true);
    expect(isHandoutWebVersionPublished("kinder")).toBe(false);
    expect(isHandoutWebVersionPublished("nicht-registriert")).toBe(false);
    expect(
      getHandoutGovernance("notfallkarte-zuerich")?.visualAssetStatus
    ).toBe("web-only");
    expect(
      getHandoutGovernance("notfallkarte-zuerich")?.webVersionPublished
    ).toBe(true);
    expect(HANDOUT_TEXT_VERSION_IDS).not.toContain("notfallkarte-zuerich");
    expect(
      getHandoutGovernance("notfallkarte-zuerich")?.approvedVersion
    ).toBeUndefined();
    expect(
      getHandoutGovernance("notfallkarte-zuerich")?.retiredAssetSources
    ).toEqual([
      "/Notfallkarte-Zuerich-Psychische-Krise.pdf",
      "/notfallkarte-preview.webp",
    ]);
    expect(
      materials.find(item => item.id === "notfallkarte-zuerich")
    ).toMatchObject({
      isHtml: true,
      url: "/notfallkarte",
    });
    expect(
      materials.find(item => item.id === "notfallkarte-zuerich")?.downloadUrl
    ).toBeUndefined();
    expect(
      materials.find(item => item.id === "notfallkarte-zuerich")?.pdfUrl
    ).toBeUndefined();
    expect(
      materials.find(item => item.id === "notfallkarte-zuerich")?.previewUrl
    ).toBeUndefined();
  });

  it("keeps retired notfallkarte binaries out of the current project tree", () => {
    const retiredRoot = path.resolve(
      process.cwd(),
      "qa/retired-handouts/notfallkarte-static-2026-10-05"
    );
    const oldWithheldRoot = path.resolve(
      process.cwd(),
      "qa/withheld-handouts/notfallkarte-safety-refresh-2026-10-05"
    );

    expect(fs.existsSync(path.join(retiredRoot, "README.md"))).toBe(true);
    expect(
      fs.existsSync(
        path.join(retiredRoot, "Notfallkarte-Zuerich-Psychische-Krise.pdf")
      )
    ).toBe(false);
    expect(
      fs.existsSync(path.join(retiredRoot, "notfallkarte-preview.webp"))
    ).toBe(false);
    expect(fs.existsSync(oldWithheldRoot)).toBe(false);
  });

  it("requires document type, asset version and an explicit approval state for every text version", () => {
    for (const id of HANDOUT_TEXT_VERSION_IDS) {
      const governance = getHandoutGovernance(id);

      expect(governance, id).toBeTruthy();
      expect(governance?.documentType, id).toMatch(
        /^(ORIENTIERUNGSBLATT|PRAXISBLATT|KRISEN-HANDOUT)$/
      );
      expect(getHandoutAssetVersion(governance!), id).not.toBe("");
      expect(governance?.approvalStatus ?? "approved", id).toMatch(
        /^(approved|draft-editorial-review-pending)$/
      );
    }
  });

  it("does not present the three P1 illustration drafts as approved assets", () => {
    for (const id of [
      "radikale-akzeptanz",
      "gespraeche-kippen",
      "beispiel-dialog",
    ]) {
      const governance = getHandoutGovernance(id);

      expect(governance?.approvalStatus, id).toBe(
        "draft-editorial-review-pending"
      );
      expect(governance?.approvedVersion, id).toBeUndefined();
      expect(governance?.assetVersion, id).toMatch(/^puk-.+-v3$/);
      expect(isHandoutVisualPublished(id), id).toBe(false);
    }
  });

  it("keeps productive pdf sources on their approved asset version", () => {
    for (const item of collectProductiveHandoutSources()) {
      const governance = getHandoutGovernance(item.id);

      expect(governance, item.id).toBeTruthy();
      expect(pdfStem(item.sourceUrl), item.id).toBe(
        getHandoutAssetVersion(governance!)
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

  it("keeps crisis numbers out of non-acute handouts and limits the safety-critical exceptions", () => {
    const crisisNumberPattern =
      /\b(?:112|117|143|144|145)\b|058\s*384|0800\s*33\s*66\s*55|0848\s*800\s*858/i;
    const handlungsnaheExceptions = new Set([
      "gespraeche-kippen",
      "beispiel-dialog",
      "pause-statt-streit",
    ]);

    for (const version of allTextVersions) {
      if (version.documentType === "KRISEN-HANDOUT") {
        continue;
      }

      if (handlungsnaheExceptions.has(version.id)) {
        const serialized = JSON.stringify(version);
        expect(serialized, `${version.id} must carry 117`).toContain(
          kontaktByIdStrict("ROT_117").nummer
        );
        expect(serialized, `${version.id} must carry 144`).toContain(
          kontaktByIdStrict("ROT_144").nummer
        );
        expect(
          serialized,
          `${version.id} must not add other crisis numbers`
        ).not.toMatch(
          /\b(?:112|143|145)\b|058\s*384|0800\s*33\s*66\s*55|0848\s*800\s*858/i
        );
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
