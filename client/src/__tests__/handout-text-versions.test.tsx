import { describe, expect, it } from "vitest";
import { genesungItems } from "@/content/genesung";
import { grenzenItems } from "@/content/grenzen";
import {
  getHandoutTextVersionBySource,
  getHandoutTextVersionHrefBySource,
  getHandoutTextVersionMeta,
  handoutTextVersionMetas,
} from "@/content/handoutTextVersions";
import { kommItems } from "@/content/kommunizieren";
import { materials } from "@/content/materialien";
import { searchableContent } from "@/content/searchIndex";
import { selbstfuersorgeInfografiken } from "@/content/selbstfuersorge";
import { unterstuetzenItems } from "@/content/unterstuetzen";
import { verstehenInfografiken } from "@/content/verstehen";

type HandoutSource = {
  id: string;
  sourceUrl: string;
};

function collectExpectedHandoutSources() {
  const candidates: HandoutSource[] = [
    ...materials.flatMap(item => {
      if (item.isHtml) {
        return [];
      }

      const sourceUrl = item.pdfUrl ?? item.downloadUrl;
      return sourceUrl ? [{ id: item.id, sourceUrl }] : [];
    }),
    ...unterstuetzenItems.map(item => ({
      id: item.id,
      sourceUrl: item.pdfUrl,
    })),
    ...verstehenInfografiken.map(item => ({
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

  const byId = new Map<string, HandoutSource>();

  for (const candidate of candidates) {
    const existing = byId.get(candidate.id);
    if (existing && existing.sourceUrl !== candidate.sourceUrl) {
      throw new Error(
        `Inconsistent handout source for ${candidate.id}: ${existing.sourceUrl} vs ${candidate.sourceUrl}`
      );
    }

    byId.set(candidate.id, candidate);
  }

  return Array.from(byId.values()).sort((left, right) =>
    left.id.localeCompare(right.id)
  );
}

const expectedHandoutSources = collectExpectedHandoutSources();
const expectedTextVersionIds = expectedHandoutSources.map(item => item.id);
const expectedTextVersionHrefs = expectedTextVersionIds.map(
  id => `/materialien/text/${id}`
);

describe("handout text versions", () => {
  it("covers every pdf-backed handout with a text version", () => {
    const actualIds = handoutTextVersionMetas
      .map(version => version.id)
      .sort((left, right) => left.localeCompare(right));

    expect(actualIds).toEqual(expectedTextVersionIds);
  });

  it("maps every handout source url to the matching text version route", () => {
    for (const item of expectedHandoutSources) {
      expect(getHandoutTextVersionMeta(item.id)?.path).toBe(
        `/materialien/text/${item.id}`
      );
      expect(getHandoutTextVersionHrefBySource(item.sourceUrl)).toBe(
        `/materialien/text/${item.id}`
      );
      expect(getHandoutTextVersionBySource(item.sourceUrl)?.id).toBe(item.id);
    }
  });

  it("keeps a search entry for every text version", () => {
    const searchHrefs = searchableContent
      .filter(entry => entry.href.startsWith("/materialien/text/"))
      .map(entry => entry.href)
      .sort((left, right) => left.localeCompare(right));

    expect(searchHrefs).toEqual(expectedTextVersionHrefs);
  });

  it("keeps the html notfallkarte outside the text-version route set", () => {
    const notfallkarte = materials.find(
      item => item.id === "notfallkarte-zuerich"
    );

    expect(notfallkarte?.isHtml).toBe(true);
    expect(getHandoutTextVersionHrefBySource(notfallkarte?.pdfUrl)).toBeNull();
  });
});
