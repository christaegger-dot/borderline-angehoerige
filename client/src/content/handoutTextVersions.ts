import {
  getHandoutTextVersionBySource as getHandoutTextMetaBySource,
  getHandoutTextVersionHrefBySource as getHandoutTextMetaHrefBySource,
  getHandoutTextVersionMeta,
  handoutTextVersionMetas,
} from "./handoutTextMetas";
import type { HandoutTextVersion } from "./handoutTextVersionTypes";

type HandoutTextVersionContentModule = {
  getFullHandoutTextVersion: (
    id: string | undefined
  ) => HandoutTextVersion | null;
};

const lazyContentModules = import.meta.glob("./handoutTextVersionContent.ts");

const loadedHandoutTextVersionsById = new Map<string, HandoutTextVersion>();

export { getHandoutTextVersionMeta, handoutTextVersionMetas };

async function loadContentModule() {
  const loader = lazyContentModules["./handoutTextVersionContent.ts"];
  if (!loader) {
    return null;
  }

  return (await loader()) as HandoutTextVersionContentModule;
}

export function getHandoutTextVersion(id: string | undefined) {
  if (!id) {
    return null;
  }

  return loadedHandoutTextVersionsById.get(id) ?? null;
}

export async function loadHandoutTextVersion(id: string | undefined) {
  const cached = getHandoutTextVersion(id);
  if (cached) {
    return cached;
  }

  if (!id) {
    return null;
  }

  const contentModule = await loadContentModule();
  const version = contentModule?.getFullHandoutTextVersion(id) ?? null;
  if (version) {
    loadedHandoutTextVersionsById.set(id, version);
  }

  return version;
}

export function getHandoutTextVersionBySource(sourceUrl: string | undefined) {
  return getHandoutTextMetaBySource(sourceUrl);
}

export function getHandoutTextVersionHrefBySource(
  sourceUrl: string | undefined
) {
  return getHandoutTextMetaHrefBySource(sourceUrl);
}
