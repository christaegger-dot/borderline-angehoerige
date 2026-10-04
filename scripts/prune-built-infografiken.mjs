import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const sourceRoot = path.join(repoRoot, "client/public/infografiken");
const buildRoot = path.join(repoRoot, "dist/public/infografiken");

function listFiles(root, relativeDir = "") {
  const absoluteDir = path.join(root, relativeDir);
  if (!fs.existsSync(absoluteDir)) return [];

  return fs
    .readdirSync(absoluteDir, { withFileTypes: true })
    .flatMap(entry => {
      const relativePath = path.join(relativeDir, entry.name);
      return entry.isDirectory()
        ? listFiles(root, relativePath)
        : [relativePath.split(path.sep).join("/")];
    })
    .sort();
}

function removeEmptyDirectories(root) {
  if (!fs.existsSync(root)) return;

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const directory = path.join(root, entry.name);
    removeEmptyDirectories(directory);
    if (fs.readdirSync(directory).length === 0) {
      fs.rmdirSync(directory);
    }
  }
}

const sourceFiles = listFiles(sourceRoot);
const sourceSet = new Set(sourceFiles);
const removed = [];

for (const relativePath of listFiles(buildRoot)) {
  if (sourceSet.has(relativePath)) continue;
  fs.rmSync(path.join(buildRoot, relativePath));
  removed.push(relativePath);
}

removeEmptyDirectories(buildRoot);

const builtFiles = listFiles(buildRoot);
if (JSON.stringify(builtFiles) !== JSON.stringify(sourceFiles)) {
  throw new Error(
    "Built infographic assets do not match client/public/infografiken."
  );
}

console.log(
  `Verified ${builtFiles.length} canonical built infographic assets; removed ${removed.length} stale file(s).`
);
