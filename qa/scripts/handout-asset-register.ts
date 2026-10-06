import { createHash } from "node:crypto";
import { createReadStream, promises as fs } from "node:fs";
import path from "node:path";
import {
  handoutGovernance,
  isHandoutVisualPublished,
  type HandoutGovernanceEntry,
} from "../../client/src/content/handoutGovernance";
import { handoutTextVersionMetas } from "../../client/src/content/handoutTextMetas";
import { collectReferencedInfografikAssets } from "../../client/src/content/infografikAssetRefs";
import { handoutTextVersions as genesungVersions } from "../../client/src/content/handoutTextVersionContent/genesung.content";
import { handoutTextVersions as grenzenVersions } from "../../client/src/content/handoutTextVersionContent/grenzen.content";
import { handoutTextVersions as kommunizierenVersions } from "../../client/src/content/handoutTextVersionContent/kommunizieren.content";
import { handoutTextVersions as selbstfuersorgeVersions } from "../../client/src/content/handoutTextVersionContent/selbstfuersorge.content";
import { handoutTextVersions as soforthilfeVersions } from "../../client/src/content/handoutTextVersionContent/soforthilfe.content";
import { handoutTextVersions as unterstuetzenVersions } from "../../client/src/content/handoutTextVersionContent/unterstuetzen.content";
import { handoutTextVersions as verstehenVersions } from "../../client/src/content/handoutTextVersionContent/verstehen.content";

const STORAGE_ROOTS = [
  ["withheld", "qa/withheld-handouts"],
  ["archived", "qa/archived-handouts"],
  ["retired", "qa/retired-handouts"],
] as const;
const PACKAGE_MANIFESTS = [
  "handouts/issue-615-refresh/manifest.json",
  "handouts/p1-illustrations/manifest.json",
];
const WEB_TEXT_VERSIONS = [
  ...genesungVersions,
  ...grenzenVersions,
  ...kommunizierenVersions,
  ...selbstfuersorgeVersions,
  ...soforthilfeVersions,
  ...unterstuetzenVersions,
  ...verstehenVersions,
];
const ROLES = ["pdf", "webp", "thumbnail"] as const;
const P1_WITHHELD_ROOT = "qa/withheld-handouts/p1-illustrations-v3-2026-10-04/";
const PUBLIC_PREFIX = "client/public/";
const EXPLICIT_RELOCATIONS: Record<string, string> = {
  "qa/withheld-handouts/issue-633-fachquellen-2026-10-05/infografiken/manus-grenzen-spickzettel-v2-thumb.png":
    "/infografiken/extras/thumbnails/manus-grenzen-spickzettel-v2-thumb.png",
};

type Storage = "public" | "withheld" | "archived" | "retired";
type Role = (typeof ROLES)[number];
type PackageAsset = { path: string; sha256: string; bytes: number };
type PackageEntry = {
  id: string;
  version: string;
  pdf: PackageAsset;
  webp: PackageAsset;
  thumbnail: PackageAsset;
};
export type ObservedHandoutFile = {
  path: string;
  storage: Storage;
  sizeBytes: number;
  sha256: string;
  publicPath: string | null;
  publicPathBasis:
    | "public-root"
    | "preserved-path"
    | "documented-relocation"
    | null;
};

const lexical = (left: string, right: string) =>
  left < right ? -1 : left > right ? 1 : 0;
const normalize = (value: string) => value.split(path.sep).join("/");

/** Canonical JSON of the actual data model, not rendered HTML or PDF content. */
export function serializePlainHandoutContent(value: unknown): string {
  const ancestors = new Set<object>();
  const normalizeValue = (current: unknown): unknown => {
    if (
      current === null ||
      typeof current === "string" ||
      typeof current === "boolean"
    )
      return current;
    if (typeof current === "number" && Number.isFinite(current)) return current;
    if (typeof current !== "object" || current === null)
      throw new Error("Handout content must contain only plain JSON values.");
    if (ancestors.has(current))
      throw new Error("Handout content must not be cyclic.");
    ancestors.add(current);
    try {
      if (Array.isArray(current)) return current.map(normalizeValue);
      if (
        Object.getPrototypeOf(current) !== Object.prototype &&
        Object.getPrototypeOf(current) !== null
      )
        throw new Error(
          "Handout content must contain only plain JSON objects."
        );
      const record = current as Record<string, unknown>;
      return Object.fromEntries(
        Object.keys(record)
          .sort(lexical)
          .map(key => [key, normalizeValue(record[key])])
      );
    } finally {
      ancestors.delete(current);
    }
  };
  return JSON.stringify(normalizeValue(value));
}

async function walkFiles(root: string): Promise<string[]> {
  const entries = await fs
    .readdir(root, { withFileTypes: true })
    .catch(error => {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    });
  const files: string[] = [];
  for (const entry of entries.sort((a, b) => lexical(a.name, b.name))) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...(await walkFiles(fullPath)));
    else if (entry.isFile()) files.push(fullPath);
    else
      throw new Error(`Unsupported non-regular inventory entry: ${fullPath}`);
  }
  return files;
}

async function sha256(filePath: string) {
  const digest = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) digest.update(chunk);
  return digest.digest("hex");
}

function observedPublicPath(filePath: string, storage: Storage) {
  if (storage === "public") {
    return {
      publicPath: `/${filePath.slice(PUBLIC_PREFIX.length)}`,
      publicPathBasis: "public-root" as const,
    };
  }
  if (EXPLICIT_RELOCATIONS[filePath]) {
    return {
      publicPath: EXPLICIT_RELOCATIONS[filePath],
      publicPathBasis: "documented-relocation" as const,
    };
  }
  const infographicIndex = filePath.indexOf("/infografiken/");
  if (infographicIndex >= 0) {
    return {
      publicPath: filePath.slice(infographicIndex),
      publicPathBasis: "preserved-path" as const,
    };
  }
  const rootIndex = filePath.indexOf("/public-root/");
  if (rootIndex >= 0) {
    return {
      publicPath: `/${filePath.slice(rootIndex + "/public-root/".length)}`,
      publicPathBasis: "preserved-path" as const,
    };
  }
  return { publicPath: null, publicPathBasis: null };
}

function assetRole(publicPath: string): Role | null {
  if (
    publicPath.includes("/extras/thumbnails/") ||
    /-thumb\./.test(publicPath)
  ) {
    return "thumbnail";
  }
  if (publicPath.endsWith(".pdf")) return "pdf";
  if (publicPath.endsWith(".webp")) return "webp";
  return null;
}

function packagePublicPath(assetPath: string) {
  if (assetPath.startsWith(PUBLIC_PREFIX)) {
    return `/${assetPath.slice(PUBLIC_PREFIX.length)}`;
  }
  return observedPublicPath(assetPath, "withheld").publicPath;
}

function safeRepoPath(repoRoot: string, relativePath: string) {
  const target = path.resolve(repoRoot, relativePath);
  const relative = path.relative(repoRoot, target);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Unsafe inventory path: ${relativePath}`);
  }
  return target;
}

export async function buildHandoutAssetManifest(repoRoot: string) {
  const issues: string[] = [];
  const webVersions = new Map(
    WEB_TEXT_VERSIONS.map(version => [version.id, version])
  );
  if (webVersions.size !== WEB_TEXT_VERSIONS.length)
    issues.push("Duplicate handout web content IDs.");
  const webContentHashes = new Map<string, string>();
  for (const meta of handoutTextVersionMetas) {
    const version = webVersions.get(meta.id);
    if (!version) {
      issues.push(`Missing actual handout web content: ${meta.id}`);
      continue;
    }
    webContentHashes.set(
      meta.id,
      createHash("sha256")
        .update(serializePlainHandoutContent(version))
        .digest("hex")
    );
  }
  const allReferences = collectReferencedInfografikAssets({
    includeUnpublished: true,
  });
  const activeReferences = collectReferencedInfografikAssets();
  const metas = new Map(handoutTextVersionMetas.map(meta => [meta.id, meta]));
  const publicRoot = path.join(repoRoot, PUBLIC_PREFIX);
  const publicFiles = await walkFiles(path.join(publicRoot, "infografiken"));
  const rootEntries = await fs.readdir(publicRoot, { withFileTypes: true });
  for (const entry of rootEntries) {
    if (
      entry.isFile() &&
      (entry.name.endsWith(".pdf") ||
        /^(?:notfallkarte|notfallplan-).*\.(?:webp|png)$/i.test(entry.name))
    ) {
      publicFiles.push(path.join(publicRoot, entry.name));
    }
  }
  const observedFiles: ObservedHandoutFile[] = [];
  const storageFiles: Array<[Storage, string[]]> = [["public", publicFiles]];
  for (const [storage, root] of STORAGE_ROOTS) {
    storageFiles.push([storage, await walkFiles(path.join(repoRoot, root))]);
  }
  for (const [storage, files] of storageFiles) {
    for (const filePath of files) {
      const relativePath = normalize(path.relative(repoRoot, filePath));
      observedFiles.push({
        path: relativePath,
        storage,
        sizeBytes: (await fs.stat(filePath)).size,
        sha256: await sha256(filePath),
        ...observedPublicPath(relativePath, storage),
      });
    }
  }
  observedFiles.sort((a, b) => lexical(a.path, b.path));
  const byPath = new Map(observedFiles.map(file => [file.path, file]));
  const byPublicPath = new Map<string, ObservedHandoutFile[]>();
  for (const file of observedFiles) {
    if (!file.publicPath) continue;
    byPublicPath.set(file.publicPath, [
      ...(byPublicPath.get(file.publicPath) ?? []),
      file,
    ]);
  }

  const packageRecords = [];
  const candidateEntries = new Map<
    string,
    { entry: PackageEntry; manifestPath: string }
  >();
  for (const manifestPath of PACKAGE_MANIFESTS) {
    const absolutePath = path.join(repoRoot, manifestPath);
    const entries = JSON.parse(await fs.readFile(absolutePath, "utf8"))
      .entries as PackageEntry[];
    packageRecords.push({
      path: manifestPath,
      sha256: await sha256(absolutePath),
    });
    for (const entry of entries) {
      if (!Object.hasOwn(handoutGovernance, entry.id)) {
        issues.push(`Package ${manifestPath} contains unknown ID ${entry.id}`);
      }
      if (candidateEntries.has(entry.id))
        issues.push(`Duplicate candidate ID ${entry.id}`);
      candidateEntries.set(entry.id, { entry, manifestPath });
      const governance = (
        handoutGovernance as Record<string, HandoutGovernanceEntry>
      )[entry.id];
      if (
        governance &&
        (governance.approvedVersion ?? governance.assetVersion) !==
          entry.version
      ) {
        issues.push(
          `Package version differs from registered version: ${entry.id}`
        );
      }
      for (const role of ROLES) {
        const asset = entry[role];
        if (
          manifestPath.includes("p1-illustrations") &&
          !asset.path.startsWith(PUBLIC_PREFIX)
        ) {
          issues.push(
            `Invalid original public path in ${manifestPath}: ${asset.path}`
          );
          continue;
        }
        const physicalPath = manifestPath.includes("p1-illustrations")
          ? `${P1_WITHHELD_ROOT}${asset.path.slice(PUBLIC_PREFIX.length)}`
          : asset.path;
        safeRepoPath(repoRoot, physicalPath);
        const actual = byPath.get(physicalPath);
        if (!actual) issues.push(`Missing package asset ${physicalPath}`);
        else if (
          actual.sha256 !== asset.sha256 ||
          actual.sizeBytes !== asset.bytes
        ) {
          issues.push(
            `Package asset differs from ${manifestPath}: ${physicalPath}`
          );
        }
      }
    }
  }

  const checksumRecords = [];
  for (const checksumFile of observedFiles.filter(file =>
    file.path.endsWith("/SHA256SUMS")
  )) {
    const lines = (
      await fs.readFile(path.join(repoRoot, checksumFile.path), "utf8")
    )
      .trim()
      .split("\n");
    for (const line of lines) {
      const match = line.match(/^([a-f0-9]{64})\s+\*?(.+)$/);
      if (!match) {
        issues.push(`Invalid checksum line in ${checksumFile.path}`);
        continue;
      }
      const recordedPath = match[2];
      const physicalPath = recordedPath.startsWith("qa/")
        ? recordedPath
        : normalize(path.join(path.dirname(checksumFile.path), recordedPath));
      const absolutePath = safeRepoPath(repoRoot, physicalPath);
      const actualHash =
        byPath.get(physicalPath)?.sha256 ??
        (await fs
          .stat(absolutePath)
          .then(() => sha256(absolutePath))
          .catch(() => null));
      checksumRecords.push({
        source: checksumFile.path,
        path: physicalPath,
        recordedSha256: match[1],
        matchesObserved: actualHash === match[1],
      });
      if (actualHash !== match[1])
        issues.push(`Checksum mismatch or missing file: ${physicalPath}`);
    }
  }

  const publishedPaths = new Set(
    activeReferences.map(reference => reference.path)
  );
  for (const reference of allReferences) {
    for (const usage of reference.usages) {
      if (!Object.hasOwn(handoutGovernance, usage.id)) {
        issues.push(`Unknown registry ID ${usage.id} at ${reference.path}`);
      }
    }
  }
  for (const meta of handoutTextVersionMetas) {
    if (isHandoutVisualPublished(meta.id)) {
      if (meta.pdfSourceUrl.startsWith("/"))
        publishedPaths.add(meta.pdfSourceUrl);
      if (meta.previewImageUrl.startsWith("/"))
        publishedPaths.add(meta.previewImageUrl);
    }
  }
  for (const publicPath of publishedPaths) {
    const file = byPath.get(`${PUBLIC_PREFIX}${publicPath.slice(1)}`);
    if (!file || file.sizeBytes === 0)
      issues.push(`Missing or empty published asset: ${publicPath}`);
  }
  for (const file of observedFiles.filter(file => file.storage === "public")) {
    if (!file.publicPath || !publishedPaths.has(file.publicPath)) {
      issues.push(`Unexpected public handout asset: ${file.path}`);
    }
  }

  const assignedPaths = new Set<string>();
  const entries = Object.entries(handoutGovernance)
    .sort(([left], [right]) => lexical(left, right))
    .map(([id, value]) => {
      const governance: HandoutGovernanceEntry = value;
      const registeredVersion =
        governance.approvedVersion ?? governance.assetVersion ?? null;
      const meta = metas.get(id);
      const catalogPaths = new Set(
        allReferences
          .filter(reference => reference.usages.some(usage => usage.id === id))
          .map(reference => reference.path)
      );
      if (meta) {
        catalogPaths.add(meta.pdfSourceUrl);
        catalogPaths.add(meta.previewImageUrl);
      }
      const candidate = candidateEntries.get(id);
      const expectedAssets = ROLES.map(role => {
        const candidatePath =
          candidate && candidate.entry.version === registeredVersion
            ? packagePublicPath(candidate.entry[role].path)
            : null;
        const registeredPaths = [
          ...catalogPaths,
          ...(governance.retiredAssetSources ?? []),
        ]
          .filter(assetPath => assetRole(assetPath) === role)
          .filter(
            assetPath =>
              !registeredVersion ||
              path.posix
                .basename(assetPath)
                .startsWith(`${registeredVersion}.`) ||
              path.posix.basename(assetPath).startsWith(`${registeredVersion}-`)
          );
        const observedVersionPaths = !registeredVersion
          ? []
          : observedFiles
              .filter(file => file.storage !== "public" && file.publicPath)
              .map(file => file.publicPath!)
              .filter(assetPath => assetRole(assetPath) === role)
              .filter(
                assetPath =>
                  path.posix
                    .basename(assetPath)
                    .startsWith(`${registeredVersion}.`) ||
                  path.posix
                    .basename(assetPath)
                    .startsWith(`${registeredVersion}-`)
              );
        const paths = candidatePath
          ? [candidatePath]
          : registeredPaths.length
            ? registeredPaths
            : observedVersionPaths;
        return {
          role,
          paths: [...new Set(paths)].sort(lexical),
          basis:
            paths.length === 0
              ? "not-registered"
              : candidatePath
                ? "package-manifest"
                : registeredPaths.length
                  ? "registered-catalog-or-retired-path"
                  : "observed-registered-version",
          observedPaths: [
            ...new Set(
              paths.flatMap(assetPath =>
                (byPublicPath.get(assetPath) ?? []).map(file => file.path)
              )
            ),
          ].sort(lexical),
        };
      });
      const relatedPublicPaths = new Set([
        ...catalogPaths,
        ...expectedAssets.flatMap(asset => asset.paths),
        ...(governance.retiredAssetSources ?? []),
      ]);
      const relatedFiles = observedFiles.filter(
        file => file.publicPath && relatedPublicPaths.has(file.publicPath)
      );
      for (const file of relatedFiles) assignedPaths.add(file.path);
      if (isHandoutVisualPublished(id)) {
        for (const expected of expectedAssets) {
          if (expected.paths.length === 0)
            issues.push(
              `Published ${id} has no registered ${expected.role} path`
            );
          for (const assetPath of expected.paths) {
            if (
              registeredVersion &&
              !path.posix.basename(assetPath).startsWith(registeredVersion)
            )
              issues.push(
                `Published path/version mismatch: ${id} ${assetPath}`
              );
          }
        }
      }
      return {
        id,
        documentType: governance.documentType,
        registeredVersion,
        versionField: governance.approvedVersion
          ? "approvedVersion"
          : governance.assetVersion
            ? "assetVersion"
            : null,
        implementationStatus: {
          publication: governance.publicationStatus ?? "active",
          visual: governance.visualAssetStatus ?? "published",
          codeApprovalFlag: governance.approvalStatus ?? "approved",
          visualDeliveryEnabled: isHandoutVisualPublished(id),
          textPathRegistered: Boolean(meta),
        },
        webPath: meta?.path ?? null,
        webContent: meta
          ? {
              sha256: webContentHashes.get(id) ?? null,
              basis:
                "Actual HandoutTextVersion including metadata and content, serialized as plain JSON with lexically sorted object keys; array order retained. Not rendered HTML, not text/PDF parity or an approval version.",
            }
          : null,
        registeredCatalogPaths: [...catalogPaths].sort(lexical),
        expectedAssets,
        retiredAssetSources: [...(governance.retiredAssetSources ?? [])].sort(
          lexical
        ),
        candidateManifest: candidate?.manifestPath ?? null,
        observedFiles: relatedFiles.map(file => file.path),
        realApprovals: {
          clinical: "unknown",
          institutional: "unknown",
          perspective: "unknown",
          pdfUa: "unknown",
          print: "unknown",
        },
      };
    });
  return {
    schemaVersion: 1,
    scope: {
      public: "client/public/infografiken plus root PDFs and crisis previews",
      historical: STORAGE_ROOTS.map(([, root]) => root),
    },
    interpretation:
      "Deterministic technical inventory only. Code flags and hashes do not establish clinical, institutional, perspective, PDF/UA or print approval. Unmatched historic files are retained without inferred family ownership.",
    summary: {
      governanceIds: entries.length,
      registeredTextPaths: handoutTextVersionMetas.length,
      observedFiles: observedFiles.length,
      publicFiles: observedFiles.filter(file => file.storage === "public")
        .length,
      unassignedHistoricalFiles: observedFiles.filter(
        file => file.storage !== "public" && !assignedPaths.has(file.path)
      ).length,
    },
    entries,
    observedFiles,
    unassignedHistoricalFiles: observedFiles
      .filter(
        file => file.storage !== "public" && !assignedPaths.has(file.path)
      )
      .map(file => file.path),
    packageManifests: packageRecords,
    checksumRecords: checksumRecords.sort((a, b) => lexical(a.path, b.path)),
    issues: issues.sort(lexical),
  };
}

export type HandoutAssetManifest = Awaited<
  ReturnType<typeof buildHandoutAssetManifest>
>;

export function compareHandoutAssetManifest(
  actual: HandoutAssetManifest,
  expected: HandoutAssetManifest
) {
  const problems = [...actual.issues];
  const expectedEntries = new Map(
    expected.entries.map(entry => [entry.id, entry])
  );
  for (const entry of actual.entries) {
    if (
      entry.webContent?.sha256 !==
      expectedEntries.get(entry.id)?.webContent?.sha256
    ) {
      problems.push(`Registered web content changed: ${entry.id}`);
    }
  }
  const actualByPath = new Map(
    actual.observedFiles.map(file => [file.path, file])
  );
  const expectedByPath = new Map(
    expected.observedFiles.map(file => [file.path, file])
  );
  for (const [filePath, file] of expectedByPath) {
    const observed = actualByPath.get(filePath);
    if (!observed) problems.push(`Registered file missing: ${filePath}`);
    else if (
      observed.sha256 !== file.sha256 ||
      observed.sizeBytes !== file.sizeBytes
    )
      problems.push(`Registered file changed: ${filePath}`);
  }
  for (const filePath of actualByPath.keys()) {
    if (!expectedByPath.has(filePath))
      problems.push(`Unregistered observed file: ${filePath}`);
  }
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    problems.push(
      "Handout manifest differs from the committed snapshot; review the change before refresh:handout-assets."
    );
  }
  return [...new Set(problems)].sort(lexical);
}
