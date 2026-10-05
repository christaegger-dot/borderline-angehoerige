import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const basisPath = path.join(
  repoRoot,
  "qa/issue-615/fachreview-paket/review-basis.json"
);

type LockedAsset = { path: string; bytes: number; sha256: string };
type LockedEntry = {
  id: string;
  title: string;
  version: string;
  documentType: string;
  visualKind: string;
  sourceHtml: string;
  sourceHtmlSha256: string;
  sourceTextSha256: string;
  pdf: LockedAsset;
  webp: LockedAsset;
  thumbnail: LockedAsset;
};
type ReviewBasis = {
  baselineCommit: string;
  reviewRound: number;
  supersedesBaselineCommit: string;
  manifest: string;
  status: string;
  publicationAuthorized: boolean;
  expectedEditorialStatus: string;
  expectedPublicAssetsWritten: boolean;
  entries: LockedEntry[];
};

function fail(message: string): never {
  throw new Error(`Issue 615 fachreview audit failed: ${message}`);
}

function resolveInsideRepo(relativePath: string) {
  if (path.isAbsolute(relativePath) || relativePath.split("/").includes("..")) {
    fail(`unsafe path: ${relativePath}`);
  }
  const resolved = path.resolve(repoRoot, relativePath);
  if (!resolved.startsWith(`${repoRoot}${path.sep}`)) {
    fail(`path leaves repository: ${relativePath}`);
  }
  return resolved;
}

function sha256(filePath: string) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

if (!existsSync(basisPath)) fail("review-basis.json is missing");
const basis = JSON.parse(readFileSync(basisPath, "utf8")) as ReviewBasis;
const expectedIds = [
  "remission-heilung",
  "5-faktoren-genesung",
  "rolle-genesungsprozess",
  "grenzen-erkennen",
  "lmk",
];

if (basis.status !== "human-review-pending") {
  fail("review basis must remain human-review-pending");
}
if (basis.reviewRound !== 2) {
  fail("active review basis must identify review round 2");
}
if (
  basis.baselineCommit !== "79091246f78411e283e48fdabba3ac4f751b3f6b" ||
  basis.supersedesBaselineCommit !== "6ae32c08e6841650537ea4a644f63c31fe54153f"
) {
  fail("review-round lineage is not locked to the approved pre-cleanup commit");
}
if (basis.publicationAuthorized !== false) {
  fail("review package must not authorize publication");
}
if (basis.entries.map(entry => entry.id).join("|") !== expectedIds.join("|")) {
  fail("locked entry IDs or order changed");
}

const manifestPath = resolveInsideRepo(basis.manifest);
const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
  exportContract: {
    editorialStatus: string;
    publicAssetsWritten: boolean;
  };
  entries: LockedEntry[];
};
if (
  manifest.exportContract.editorialStatus !== basis.expectedEditorialStatus ||
  manifest.exportContract.publicAssetsWritten !==
    basis.expectedPublicAssetsWritten
) {
  fail("manifest no longer describes a withheld editorial draft");
}

for (const locked of basis.entries) {
  const current = manifest.entries.find(entry => entry.id === locked.id);
  if (!current) fail(`${locked.id} is missing from the manifest`);
  for (const key of [
    "version",
    "documentType",
    "visualKind",
    "sourceHtml",
    "sourceHtmlSha256",
    "sourceTextSha256",
  ] as const) {
    if (current[key] !== locked[key]) {
      fail(`${locked.id}/${key} changed; prior human decisions are invalid`);
    }
  }

  const sourcePath = resolveInsideRepo(locked.sourceHtml);
  if (
    !existsSync(sourcePath) ||
    sha256(sourcePath) !== locked.sourceHtmlSha256
  ) {
    fail(`${locked.id} editable source changed`);
  }

  for (const [kind, asset] of Object.entries({
    pdf: locked.pdf,
    webp: locked.webp,
    thumbnail: locked.thumbnail,
  })) {
    const currentAsset = current[kind as "pdf" | "webp" | "thumbnail"];
    if (
      currentAsset.path !== asset.path ||
      currentAsset.bytes !== asset.bytes ||
      currentAsset.sha256 !== asset.sha256
    ) {
      fail(`${locked.id}/${kind} manifest metadata changed`);
    }
    const assetPath = resolveInsideRepo(asset.path);
    if (
      !existsSync(assetPath) ||
      statSync(assetPath).size !== asset.bytes ||
      sha256(assetPath) !== asset.sha256
    ) {
      fail(`${locked.id}/${kind} differs from the locked review asset`);
    }
  }

  for (const publicPath of [
    `client/public/infografiken/${locked.version}.pdf`,
    `client/public/infografiken/${locked.version}.webp`,
    `client/public/infografiken/extras/thumbnails/${locked.version}.webp`,
  ]) {
    if (existsSync(path.join(repoRoot, publicPath))) {
      fail(`${locked.id} review draft leaked into ${publicPath}`);
    }
  }
}

for (const requiredFile of [
  "qa/issue-615/fachreview-paket/README.md",
  "qa/issue-615/fachreview-paket/quellen-und-aussagen.md",
  "qa/issue-615/fachreview-paket/01-remission-recovery.md",
  "qa/issue-615/fachreview-paket/02-genesungsbereiche.md",
  "qa/issue-615/fachreview-paket/03-angehoerigenrolle.md",
  "qa/issue-615/fachreview-paket/04-belastung-und-grenzen.md",
  "qa/issue-615/fachreview-paket/05-grenze-und-eigener-schritt.md",
  "qa/issue-615/fachreview-paket/06-befundauswertung.md",
  "docs/governance/issue-615-fach-und-perspektivenpruefung-2026-10-05.md",
]) {
  const filePath = resolveInsideRepo(requiredFile);
  if (!existsSync(filePath))
    fail(`required review file is missing: ${requiredFile}`);
}

console.log(
  `Issue 615 fachreview audit passed: ${basis.entries.length} immutable withheld candidates, publication not authorized.`
);
