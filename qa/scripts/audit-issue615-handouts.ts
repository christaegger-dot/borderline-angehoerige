import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";
import { handoutTextVersions as genesungVersions } from "../../client/src/content/handoutTextVersionContent/genesung.content";
import { handoutTextVersions as grenzenVersions } from "../../client/src/content/handoutTextVersionContent/grenzen.content";
import { handoutTextVersions as selbstfuersorgeVersions } from "../../client/src/content/handoutTextVersionContent/selbstfuersorge.content";
import { handoutTextVersions as unterstuetzenVersions } from "../../client/src/content/handoutTextVersionContent/unterstuetzen.content";
import { handoutTextVersions as verstehenVersions } from "../../client/src/content/handoutTextVersionContent/verstehen.content";

const execFileAsync = promisify(execFile);
const repoRoot = process.cwd();
const manifestPath = path.join(
  repoRoot,
  "handouts/issue-615-refresh/manifest.json"
);
const expectedIds = [
  "zustands-landkarte",
  "gehirn",
  "remission-heilung",
  "5-faktoren-genesung",
  "rolle-genesungsprozess",
  "leuchtturm",
  "konsistenz-prinzip",
  "energie-konto",
  "grenzen-erkennen",
  "lmk",
  "drei-saeulen",
  "beziehungs-achtsamkeit",
  "6-leitlinien",
  "4-alltags-tipps",
  "erlaubnis-karte",
];

const retiredPublicVersions = [
  "manus-energie-konto-v1",
  "manus-erlaubnis-karte-v1",
  "manus-grenzen-erkennen-v1",
  "manus-lmk-v1",
];

const requiredSourceText: Record<string, string[]> = {
  "remission-heilung": [
    "Achten Sie zugleich auf Ihre eigenen Grenzen und Ihren Unterstützungsbedarf.",
    "Kap. 7.2.",
  ],
  "rolle-genesungsprozess": [
    "Über Behandlung entscheidet die betroffene Person gemeinsam mit den Behandelnden.",
  ],
  "grenzen-erkennen": [
    "Neue, starke oder anhaltende körperliche Beschwerden sollten medizinisch abgeklärt werden.",
    "WHO, Stress – Questions and Answers (30. März 2026)",
  ],
  lmk: ["Diese Schutzregel gilt diagnoseunabhängig in jeder Beziehung."],
};

type Asset = {
  path: string;
  bytes: number;
  sha256: string;
  width?: number;
  height?: number;
  pages?: number;
  taggedCandidate?: boolean;
};

type Entry = {
  id: string;
  version: string;
  sourceHtml: string;
  sourceHtmlSha256: string;
  sourceTextSha256: string;
  pdf: Asset;
  webp: Asset;
  thumbnail: Asset;
};

type Manifest = {
  sourceStylesheet: { path: string; sha256: string };
  exportContract: {
    destination: string;
    publicAssetsWritten: boolean;
    editorialStatus: string;
    xmpMetadata: string;
    pdfUaClaim: boolean;
    matterhornReview: string;
  };
  entries: Entry[];
};

const versions = [
  ...verstehenVersions,
  ...unterstuetzenVersions,
  ...grenzenVersions,
  ...selbstfuersorgeVersions,
  ...genesungVersions,
];

function fail(message: string): never {
  throw new Error(`Issue 615 handout audit failed: ${message}`);
}

function sha256(filePath: string) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function normalizeText(value: string) {
  return value.normalize("NFKC").replace(/\s+/gu, " ").trim();
}

function assertExactInventory(
  directory: string,
  extension: string,
  expected: string[],
  label: string
) {
  const actual = readdirSync(directory)
    .filter(name => name.endsWith(extension))
    .sort();
  const wanted = [...expected].sort();
  if (actual.join("|") !== wanted.join("|")) {
    fail(`${label} inventory differs from the manifest`);
  }
}

function resolveInsideRepo(relativePath: string) {
  if (path.isAbsolute(relativePath) || relativePath.split("/").includes("..")) {
    fail(`unsafe manifest path: ${relativePath}`);
  }
  const resolved = path.resolve(repoRoot, relativePath);
  if (!resolved.startsWith(`${repoRoot}${path.sep}`)) {
    fail(`path leaves repository: ${relativePath}`);
  }
  return resolved;
}

if (!existsSync(manifestPath)) fail("manifest is missing; run the generator");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest;

if (manifest.exportContract.publicAssetsWritten !== false) {
  fail("review builds must never write public assets");
}
if (
  manifest.exportContract.editorialStatus !== "draft-editorial-review-pending"
) {
  fail("package must remain an explicitly labelled editorial draft");
}
if (
  manifest.exportContract.pdfUaClaim !== false ||
  manifest.exportContract.matterhornReview !== "pending"
) {
  fail("PDF/UA or Matterhorn completion must not be claimed");
}
if (manifest.exportContract.xmpMetadata !== "present") {
  fail("XMP metadata contract is missing");
}
if (
  manifest.entries.map(entry => entry.id).join("|") !== expectedIds.join("|")
) {
  fail("manifest IDs or ordering differ from the Issue 615 contract");
}

for (const version of retiredPublicVersions) {
  for (const publicPath of [
    `client/public/infografiken/${version}.pdf`,
    `client/public/infografiken/${version}.webp`,
    `client/public/infografiken/extras/thumbnails/${version}.webp`,
  ]) {
    if (existsSync(path.join(repoRoot, publicPath))) {
      fail(`retired legacy asset is still public: ${publicPath}`);
    }
  }
}

const stylesheet = resolveInsideRepo(manifest.sourceStylesheet.path);
if (
  !existsSync(stylesheet) ||
  sha256(stylesheet) !== manifest.sourceStylesheet.sha256
) {
  fail("stylesheet is missing or changed after export");
}
const stylesheetText = readFileSync(stylesheet, "utf8");
if (!/\.footer\s*\{[^}]*font-size:\s*8pt\s*;/su.test(stylesheetText)) {
  fail("footer minimum size is not locked to 8pt");
}

for (const entry of manifest.entries) {
  const source = resolveInsideRepo(entry.sourceHtml);
  if (!existsSync(source) || sha256(source) !== entry.sourceHtmlSha256) {
    fail(`${entry.id} editable HTML source is missing or stale`);
  }
  const sourceHtml = readFileSync(source, "utf8");
  for (const required of [
    'lang="de-CH"',
    "<main",
    "<h1",
    "Entwurf",
    "Dieses Blatt ersetzt keine persönliche Beratung oder Behandlung.",
  ]) {
    if (!sourceHtml.includes(required)) {
      fail(`${entry.id} source misses ${required}`);
    }
  }
  for (const required of requiredSourceText[entry.id] ?? []) {
    if (!normalizeText(sourceHtml).includes(normalizeText(required))) {
      fail(`${entry.id} source misses approved correction: ${required}`);
    }
  }
  const handout = versions.find(item => item.id === entry.id);
  if (!handout) fail(`${entry.id} has no current HTML text version`);
  const sourceTextSha256 = createHash("sha256")
    .update(JSON.stringify(handout))
    .digest("hex");
  if (sourceTextSha256 !== entry.sourceTextSha256) {
    fail(`${entry.id} was not regenerated from the current text version`);
  }

  for (const [kind, asset] of Object.entries({
    pdf: entry.pdf,
    webp: entry.webp,
    thumbnail: entry.thumbnail,
  })) {
    const assetPath = resolveInsideRepo(asset.path);
    if (!asset.path.startsWith(`${manifest.exportContract.destination}/`)) {
      fail(`${entry.id}/${kind} is outside the withheld package`);
    }
    if (!existsSync(assetPath)) fail(`${entry.id}/${kind} is missing`);
    if (
      statSync(assetPath).size !== asset.bytes ||
      sha256(assetPath) !== asset.sha256
    ) {
      fail(`${entry.id}/${kind} differs from the manifest`);
    }
  }

  for (const publicPath of [
    `client/public/infografiken/${entry.version}.pdf`,
    `client/public/infografiken/${entry.version}.webp`,
    `client/public/infografiken/extras/thumbnails/${entry.version}.webp`,
  ]) {
    if (existsSync(path.join(repoRoot, publicPath))) {
      fail(`${entry.id} draft leaked into ${publicPath}`);
    }
  }

  const [{ stdout: pdfInfo }, { stdout: pdfText }, webpMeta, thumbnailMeta] =
    await Promise.all([
      execFileAsync("pdfinfo", [resolveInsideRepo(entry.pdf.path)]),
      execFileAsync("pdftotext", [resolveInsideRepo(entry.pdf.path), "-"]),
      sharp(resolveInsideRepo(entry.webp.path)).metadata(),
      sharp(resolveInsideRepo(entry.thumbnail.path)).metadata(),
    ]);
  if (!/^Pages:\s+1$/mu.test(pdfInfo) || !/^Tagged:\s+yes$/mu.test(pdfInfo)) {
    fail(`${entry.id} is not a one-page tagged PDF candidate`);
  }
  if (!/^Metadata Stream:\s+yes$/mu.test(pdfInfo)) {
    fail(`${entry.id} PDF has no XMP metadata stream`);
  }
  for (const required of requiredSourceText[entry.id] ?? []) {
    if (!normalizeText(pdfText).includes(normalizeText(required))) {
      fail(`${entry.id} PDF misses approved correction: ${required}`);
    }
  }
  if (webpMeta.width !== 1600 || webpMeta.height !== 2263) {
    fail(`${entry.id} full WebP dimensions are wrong`);
  }
  if (thumbnailMeta.width !== 600 || thumbnailMeta.height !== 849) {
    fail(`${entry.id} thumbnail dimensions are wrong`);
  }
}

assertExactInventory(
  path.join(repoRoot, "handouts/issue-615-refresh/sources"),
  ".html",
  manifest.entries.map(entry => path.basename(entry.sourceHtml)),
  "HTML source"
);
const withheldOutputRoot = path.dirname(
  resolveInsideRepo(manifest.entries[0].pdf.path)
);
assertExactInventory(
  withheldOutputRoot,
  ".pdf",
  manifest.entries.map(entry => path.basename(entry.pdf.path)),
  "PDF"
);
assertExactInventory(
  withheldOutputRoot,
  ".webp",
  manifest.entries.map(entry => path.basename(entry.webp.path)),
  "full WebP"
);
assertExactInventory(
  path.join(withheldOutputRoot, "extras/thumbnails"),
  ".webp",
  manifest.entries.map(entry => path.basename(entry.thumbnail.path)),
  "thumbnail"
);

console.log(
  `Issue 615 handout audit passed: ${manifest.entries.length} withheld families, no public draft assets.`
);
