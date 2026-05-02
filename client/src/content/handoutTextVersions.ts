import {
  getHandoutTextVersionBySource as getHandoutTextMetaBySource,
  getHandoutTextVersionHrefBySource as getHandoutTextMetaHrefBySource,
  getHandoutTextVersionMeta,
  handoutTextVersionMetas,
} from "./handoutTextMetas";
import type {
  HandoutTextVersion,
  HandoutTextVersionMeta,
} from "./handoutTextVersionTypes";

type HandoutTextVersionContentModule = {
  handoutTextVersions: HandoutTextVersion[];
};

type HandoutTextVersionCategory = HandoutTextVersionMeta["category"];

const lazyContentModules = import.meta.glob(
  "./handoutTextVersionContent/*.content.ts"
);

const loadedHandoutTextVersionsById = new Map<string, HandoutTextVersion>();
const loadedContentModulesByCategory = new Map<
  HandoutTextVersionCategory,
  Promise<HandoutTextVersionContentModule | null>
>();

export { getHandoutTextVersionMeta, handoutTextVersionMetas };

function cacheContentModule(contentModule: HandoutTextVersionContentModule) {
  for (const version of contentModule.handoutTextVersions) {
    loadedHandoutTextVersionsById.set(version.id, version);
  }
}

async function loadContentModule(category: HandoutTextVersionCategory) {
  const cachedLoader = loadedContentModulesByCategory.get(category);
  if (cachedLoader) {
    return cachedLoader;
  }

  const loader =
    lazyContentModules[`./handoutTextVersionContent/${category}.content.ts`];
  const promise = !loader
    ? Promise.resolve(null)
    : loader().then(module => module as HandoutTextVersionContentModule);

  loadedContentModulesByCategory.set(category, promise);

  const contentModule = await promise;
  if (contentModule) {
    cacheContentModule(contentModule);
  }

  return contentModule;
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

  const handoutMeta = getHandoutTextVersionMeta(id);
  if (!handoutMeta) {
    return null;
  }

  await loadContentModule(handoutMeta.category);

  return getHandoutTextVersion(id);
}

export function getHandoutTextVersionBySource(sourceUrl: string | undefined) {
  return getHandoutTextMetaBySource(sourceUrl);
}

export function getHandoutTextVersionHrefBySource(
  sourceUrl: string | undefined
) {
  return getHandoutTextMetaHrefBySource(sourceUrl);
}

export function resetHandoutTextVersionCacheForTests() {
  loadedHandoutTextVersionsById.clear();
  loadedContentModulesByCategory.clear();
}
