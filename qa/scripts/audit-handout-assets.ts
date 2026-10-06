import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "prettier";
import {
  buildHandoutAssetManifest,
  compareHandoutAssetManifest,
  type HandoutAssetManifest,
} from "./handout-asset-register";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const manifestPath = path.join(repoRoot, "qa/handout-asset-manifest.json");
const actual = await buildHandoutAssetManifest(repoRoot);
const write = process.argv.includes("--write");
let issues = [...actual.issues];
if (write && issues.length === 0) {
  await fs.writeFile(
    manifestPath,
    await format(JSON.stringify(actual), { parser: "json" })
  );
} else if (!write) {
  try {
    const expected = JSON.parse(
      await fs.readFile(manifestPath, "utf8")
    ) as HandoutAssetManifest;
    issues = compareHandoutAssetManifest(actual, expected);
  } catch (error) {
    issues.push(`Cannot read manifest snapshot: ${(error as Error).message}`);
  }
}
console.log(
  `Handout asset register: ${actual.summary.governanceIds} IDs, ${actual.summary.registeredTextPaths} text paths, ${actual.summary.publicFiles} public files, ${actual.summary.observedFiles} observed files.`
);
if (issues.length) {
  console.error(issues.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    write
      ? "Wrote deterministic snapshot; real approvals remain unknown."
      : "Snapshot and physical asset guard passed; real approvals remain unknown."
  );
}
