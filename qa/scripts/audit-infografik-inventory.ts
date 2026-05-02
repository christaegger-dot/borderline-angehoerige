import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectReferencedInfografikAssets } from "../../client/src/content/infografikAssetRefs";

type InventoryRecord = {
  path: string;
  sizeBytes: number;
};

type InventoryReference = InventoryRecord & {
  usages: ReturnType<
    typeof collectReferencedInfografikAssets
  >[number]["usages"];
};

type VersionInfo = {
  family: string;
  version: number;
};

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const INFOGRAFIKEN_ROOT = path.join(
  REPO_ROOT,
  "client",
  "public",
  "infografiken"
);
const INVENTORY_OUTPUT_PATH = path.join(
  REPO_ROOT,
  "qa",
  "infografik-inventory.json"
);

function normalizePublicPath(absolutePath: string) {
  return (
    "/" +
    path
      .relative(path.join(REPO_ROOT, "client", "public"), absolutePath)
      .split(path.sep)
      .join("/")
  );
}

async function walkFiles(rootDir: string): Promise<string[]> {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async entry => {
      const absolutePath = path.join(rootDir, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(absolutePath);
      }

      if (entry.isFile()) {
        return [absolutePath];
      }

      return [];
    })
  );

  return nested.flat().sort((left, right) => left.localeCompare(right));
}

function getVersionInfo(publicPath: string): VersionInfo | null {
  const parsedPath = path.posix.parse(publicPath);
  const match = parsedPath.name.match(/^(.*)-v(\d+)$/);
  if (!match) {
    return null;
  }

  return {
    family: `${parsedPath.dir}/${match[1]}`,
    version: Number.parseInt(match[2], 10),
  };
}

function isSupportFile(publicPath: string) {
  return (
    publicPath.startsWith("/infografiken/extras/") ||
    publicPath === "/infografiken/infografiken-final.zip"
  );
}

function sumSizes(items: InventoryRecord[]) {
  return items.reduce((total, item) => total + item.sizeBytes, 0);
}

function toMegabytes(sizeBytes: number) {
  return Number((sizeBytes / (1024 * 1024)).toFixed(2));
}

function buildFamilyIndex(files: InventoryRecord[]) {
  const families = new Map<string, InventoryRecord[]>();

  for (const file of files) {
    const versionInfo = getVersionInfo(file.path);
    if (!versionInfo) {
      continue;
    }

    const existing = families.get(versionInfo.family);
    if (existing) {
      existing.push(file);
      continue;
    }

    families.set(versionInfo.family, [file]);
  }

  for (const familyFiles of families.values()) {
    familyFiles.sort((left, right) => left.path.localeCompare(right.path));
  }

  return families;
}

async function main() {
  const writeOutput = process.argv.includes("--write");
  const printJson = process.argv.includes("--json");
  const referencedAssets = collectReferencedInfografikAssets();
  const referencedByPath = new Map(
    referencedAssets.map(asset => [asset.path, asset.usages])
  );

  const allFiles = await walkFiles(INFOGRAFIKEN_ROOT);
  const fileStats = await Promise.all(
    allFiles.map(async absolutePath => {
      const stat = await fs.stat(absolutePath);
      return {
        path: normalizePublicPath(absolutePath),
        sizeBytes: stat.size,
      };
    })
  );

  const allRecords = fileStats.sort((left, right) =>
    left.path.localeCompare(right.path)
  );
  const familyIndex = buildFamilyIndex(allRecords);

  const activeReferences: InventoryReference[] = [];
  const supportFiles: InventoryRecord[] = [];
  const unreferencedCandidates: Array<
    InventoryRecord & {
      versionFamily: string | null;
      version: number | null;
      referencedSiblingPaths: string[];
    }
  > = [];
  const missingReferences = referencedAssets.filter(
    asset => !allRecords.some(record => record.path === asset.path)
  );

  for (const record of allRecords) {
    const usages = referencedByPath.get(record.path);
    if (usages) {
      activeReferences.push({
        ...record,
        usages,
      });
      continue;
    }

    if (isSupportFile(record.path)) {
      supportFiles.push(record);
      continue;
    }

    const versionInfo = getVersionInfo(record.path);
    const relatedReferencedSiblings = versionInfo
      ? activeReferences
          .filter(item => {
            const activeVersion = getVersionInfo(item.path);
            return activeVersion?.family === versionInfo.family;
          })
          .map(item => item.path)
      : [];

    unreferencedCandidates.push({
      ...record,
      versionFamily: versionInfo?.family ?? null,
      version: versionInfo?.version ?? null,
      referencedSiblingPaths: relatedReferencedSiblings,
    });
  }

  const versionFamilies = Array.from(familyIndex.entries())
    .map(([family, files]) => {
      const referencedPaths = activeReferences
        .map(item => item.path)
        .filter(itemPath => getVersionInfo(itemPath)?.family === family);
      const legacyCandidates = unreferencedCandidates
        .filter(item => item.versionFamily === family)
        .map(item => item.path);

      return {
        family,
        availableFiles: files.map(file => file.path),
        referencedFiles: referencedPaths,
        legacyCandidateFiles: legacyCandidates,
      };
    })
    .filter(
      item =>
        item.referencedFiles.length > 0 || item.legacyCandidateFiles.length > 0
    )
    .sort((left, right) => left.family.localeCompare(right.family));

  const inventory = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalFiles: allRecords.length,
      totalSizeMb: toMegabytes(sumSizes(allRecords)),
      activeReferencedFiles: activeReferences.length,
      activeReferencedSizeMb: toMegabytes(sumSizes(activeReferences)),
      supportFiles: supportFiles.length,
      supportFilesSizeMb: toMegabytes(sumSizes(supportFiles)),
      unreferencedCandidates: unreferencedCandidates.length,
      unreferencedCandidatesSizeMb: toMegabytes(
        sumSizes(unreferencedCandidates)
      ),
      missingReferencedFiles: missingReferences.length,
      versionFamiliesWithLegacyCandidates: versionFamilies.filter(
        item => item.legacyCandidateFiles.length > 0
      ).length,
    },
    missingReferences,
    activeReferences,
    supportFiles,
    unreferencedCandidates,
    versionFamilies,
  };

  if (writeOutput) {
    await fs.writeFile(
      INVENTORY_OUTPUT_PATH,
      `${JSON.stringify(inventory, null, 2)}\n`,
      "utf8"
    );
  }

  if (missingReferences.length > 0) {
    console.error(
      `Missing referenced infografik assets: ${missingReferences
        .map(item => item.path)
        .join(", ")}`
    );
    process.exitCode = 1;
  }

  if (printJson) {
    console.log(JSON.stringify(inventory, null, 2));
    return;
  }

  const summaryLines = [
    "Infografik inventory summary",
    `- total files: ${inventory.summary.totalFiles} (${inventory.summary.totalSizeMb} MB)`,
    `- active referenced files: ${inventory.summary.activeReferencedFiles} (${inventory.summary.activeReferencedSizeMb} MB)`,
    `- support files: ${inventory.summary.supportFiles} (${inventory.summary.supportFilesSizeMb} MB)`,
    `- unreferenced candidates: ${inventory.summary.unreferencedCandidates} (${inventory.summary.unreferencedCandidatesSizeMb} MB)`,
    `- version families with legacy candidates: ${inventory.summary.versionFamiliesWithLegacyCandidates}`,
    `- missing referenced files: ${inventory.summary.missingReferencedFiles}`,
  ];

  if (writeOutput) {
    summaryLines.push(
      `- wrote snapshot: ${path.relative(REPO_ROOT, INVENTORY_OUTPUT_PATH)}`
    );
  }

  console.log(summaryLines.join("\n"));
}

await main();
