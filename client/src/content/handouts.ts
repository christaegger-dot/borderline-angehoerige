import { genesungItems } from "./genesung";
import { grenzenItems } from "./grenzen";
import { kommItems } from "./kommunizieren";
import { materials } from "./materialien";
import { selbstfuersorgeInfografiken } from "./selbstfuersorge";
import { unterstuetzenItems } from "./unterstuetzen";
import { verstehenInfografiken } from "./verstehen";

export type HandoutDisposition = "attachment" | "inline";
export type HandoutSourceKind = "local" | "remote";
export type HandoutTextLayer = "present" | "missing";
export type HandoutPreferredReadingFormat = "pdf" | "textversion";

export interface HandoutAsset {
  id: string;
  title: string;
  sourceUrl: string;
  fileName: string;
  sourceKind: HandoutSourceKind;
  textLayer: HandoutTextLayer;
  preferredReadingFormat: HandoutPreferredReadingFormat;
}

const HANDOUT_ASSET_PATH_PREFIX = "/api/material-download";
const REMOTE_ASSET_RE = /^https?:\/\//i;
const LOCAL_PDF_RE = /^\/.+\.pdf(?:[?#].*)?$/i;

function slugifySegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildFileName(id: string) {
  return `${id}.pdf`;
}

function getSourceKind(sourceUrl: string): HandoutSourceKind | null {
  if (REMOTE_ASSET_RE.test(sourceUrl)) {
    return "remote";
  }

  if (LOCAL_PDF_RE.test(sourceUrl)) {
    return "local";
  }

  return null;
}

function getFileName(sourceUrl: string, id: string) {
  const kind = getSourceKind(sourceUrl);
  if (kind !== "local") {
    return buildFileName(id);
  }

  const withoutQuery = sourceUrl.split(/[?#]/, 1)[0] ?? sourceUrl;
  const lastSegment = withoutQuery.split("/").pop();
  return lastSegment && lastSegment.length > 0
    ? lastSegment
    : buildFileName(id);
}

function registerAsset(
  registry: Map<string, HandoutAsset>,
  sourceUrl: string | undefined,
  id: string,
  title: string
) {
  if (!sourceUrl || registry.has(sourceUrl)) {
    return;
  }

  const sourceKind = getSourceKind(sourceUrl);
  if (!sourceKind) {
    return;
  }

  registry.set(sourceUrl, {
    id,
    title,
    sourceUrl,
    fileName: getFileName(sourceUrl, id),
    sourceKind,
    textLayer: sourceKind === "local" ? "present" : "missing",
    preferredReadingFormat: sourceKind === "local" ? "pdf" : "textversion",
  });
}

function buildRegistry() {
  const registry = new Map<string, HandoutAsset>();

  for (const item of materials) {
    if (item.topicRecommendation) continue;
    registerAsset(
      registry,
      item.pdfUrl ?? item.downloadUrl,
      item.id,
      item.title
    );
  }

  for (const item of verstehenInfografiken) {
    registerAsset(registry, item.pdfUrl, `verstehen-${item.id}`, item.title);
  }

  for (const item of unterstuetzenItems) {
    registerAsset(
      registry,
      item.pdfUrl,
      `unterstuetzen-${slugifySegment(item.title)}`,
      item.title
    );
  }

  for (const item of kommItems) {
    registerAsset(
      registry,
      item.pdfUrl,
      `kommunizieren-${slugifySegment(item.title)}`,
      item.title
    );
  }

  for (const item of grenzenItems) {
    registerAsset(
      registry,
      item.pdfUrl,
      `grenzen-${slugifySegment(item.title)}`,
      item.title
    );
  }

  for (const item of selbstfuersorgeInfografiken) {
    registerAsset(registry, item.pdf, `selbstfuersorge-${item.id}`, item.title);
  }

  for (const item of genesungItems) {
    registerAsset(
      registry,
      item.pdf,
      `genesung-${slugifySegment(item.title)}`,
      item.title
    );
  }

  return registry;
}

const handoutAssetsBySource = buildRegistry();
const handoutAssetsById = new Map(
  Array.from(handoutAssetsBySource.values()).map(asset => [asset.id, asset])
);

// The library exposes recommended materials with their short public IDs, while
// topic pages historically registered the same files under section-prefixed
// IDs. Keep both routes valid: the source registry remains canonical for links
// generated from a PDF URL, and these aliases make every public material ID a
// resolvable download endpoint as well.
for (const item of materials) {
  const sourceUrl = item.pdfUrl ?? item.downloadUrl;
  const sourceKind = sourceUrl ? getSourceKind(sourceUrl) : null;

  if (!sourceUrl || !sourceKind || handoutAssetsById.has(item.id)) {
    continue;
  }

  handoutAssetsById.set(item.id, {
    id: item.id,
    title: item.title,
    sourceUrl,
    fileName: getFileName(sourceUrl, item.id),
    sourceKind,
    textLayer: sourceKind === "local" ? "present" : "missing",
    preferredReadingFormat: sourceKind === "local" ? "pdf" : "textversion",
  });
}

export function buildHandoutAssetPath(
  id: string,
  disposition: HandoutDisposition = "attachment"
) {
  const path = `${HANDOUT_ASSET_PATH_PREFIX}/${encodeURIComponent(id)}`;
  return disposition === "inline" ? `${path}?disposition=inline` : path;
}

export function resolveHandoutAsset(id: string): HandoutAsset | null {
  return handoutAssetsById.get(id) ?? null;
}

export function getHandoutAssetBySource(
  sourceUrl: string | undefined
): HandoutAsset | null {
  if (!sourceUrl) {
    return null;
  }

  return handoutAssetsBySource.get(sourceUrl) ?? null;
}

export function getHandoutOpenHref(sourceUrl: string | undefined) {
  if (!sourceUrl) {
    return null;
  }

  const asset = getHandoutAssetBySource(sourceUrl);
  if (!asset) {
    return sourceUrl;
  }

  // Same-origin PDFs are deployed as static assets. Linking to them directly
  // keeps protected Deploy Previews usable: a serverless function cannot
  // forward the viewer's Edge Access session when it fetches that deploy again.
  return asset.sourceKind === "local"
    ? asset.sourceUrl
    : buildHandoutAssetPath(asset.id, "inline");
}

export function getHandoutDownloadHref(sourceUrl: string | undefined) {
  if (!sourceUrl) {
    return null;
  }

  const asset = getHandoutAssetBySource(sourceUrl);
  if (!asset) {
    return sourceUrl;
  }

  return asset.sourceKind === "local"
    ? asset.sourceUrl
    : buildHandoutAssetPath(asset.id, "attachment");
}

export function prefersHandoutTextVersion(sourceUrl: string | undefined) {
  return (
    getHandoutAssetBySource(sourceUrl)?.preferredReadingFormat === "textversion"
  );
}
