import type { SearchEntry } from "./searchIndex";

export interface NormalizedSearchEntry {
  item: SearchEntry;
  normalizedTitle: string;
  searchText: string;
}

let cachedIndex: NormalizedSearchEntry[] | null = null;
let cachedPromise: Promise<NormalizedSearchEntry[]> | null = null;

function normalizeEntry(entry: SearchEntry): NormalizedSearchEntry {
  return {
    item: entry,
    normalizedTitle: entry.title.toLowerCase(),
    searchText: [
      entry.title,
      entry.description,
      ...entry.keywords,
      entry.section,
    ]
      .join(" ")
      .toLowerCase(),
  };
}

export function loadNormalizedSearchIndex() {
  if (cachedIndex) {
    return Promise.resolve(cachedIndex);
  }

  if (!cachedPromise) {
    cachedPromise = import("./searchIndex").then(({ searchableContent }) => {
      cachedIndex = searchableContent.map(normalizeEntry);
      return cachedIndex;
    });
  }

  return cachedPromise;
}

export function resetSearchIndexCacheForTests() {
  cachedIndex = null;
  cachedPromise = null;
}
