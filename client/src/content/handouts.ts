import { genesungItems } from "./genesung";
import { grenzenItems } from "./grenzen";
import { kommItems } from "./kommunizieren";
import { materials } from "./materialien";
import { selbstfuersorgeInfografiken } from "./selbstfuersorge";
import { unterstuetzenItems } from "./unterstuetzen";
import { verstehenInfografiken } from "./verstehen";

export type HandoutDisposition = "attachment" | "inline";

export interface HandoutAsset {
  id: string;
  title: string;
  sourceUrl: string;
  fileName: string;
}

const HANDOUT_ASSET_PATH_PREFIX = "/api/material-download";
const REMOTE_ASSET_RE = /^https?:\/\//i;

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

function registerAsset(
  registry: Map<string, HandoutAsset>,
  sourceUrl: string | undefined,
  id: string,
  title: string
) {
  if (
    !sourceUrl ||
    !REMOTE_ASSET_RE.test(sourceUrl) ||
    registry.has(sourceUrl)
  ) {
    return;
  }

  registry.set(sourceUrl, {
    id,
    title,
    sourceUrl,
    fileName: buildFileName(id),
  });
}

function buildRegistry() {
  const registry = new Map<string, HandoutAsset>();

  for (const item of materials) {
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

  if (!REMOTE_ASSET_RE.test(sourceUrl)) {
    return sourceUrl;
  }

  const asset = getHandoutAssetBySource(sourceUrl);
  return asset ? buildHandoutAssetPath(asset.id, "inline") : sourceUrl;
}

export function getHandoutDownloadHref(sourceUrl: string | undefined) {
  if (!sourceUrl) {
    return null;
  }

  if (!REMOTE_ASSET_RE.test(sourceUrl)) {
    return sourceUrl;
  }

  const asset = getHandoutAssetBySource(sourceUrl);
  return asset ? buildHandoutAssetPath(asset.id, "attachment") : sourceUrl;
}
