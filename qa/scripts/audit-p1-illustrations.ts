import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { JSDOM } from "jsdom";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

type ManifestAsset = {
  path: string;
  bytes: number;
  sha256: string;
  width?: number;
  height?: number;
};

type ManifestEntry = {
  id: string;
  sourceHtml: string;
  sourceHtmlSha256: string;
  pdf: ManifestAsset & { pages: number; tagged: boolean };
  webp: ManifestAsset;
  thumbnail: ManifestAsset;
  safetyText: string;
};

type Manifest = {
  sourceStylesheet: { path: string; sha256: string };
  exportContract: {
    editorialStatus: string;
    editorialStatusLabel: string;
    pdfUaClaim: boolean;
  };
  entries: ManifestEntry[];
};

const repoRoot = process.cwd();
const manifestPath = path.join(
  repoRoot,
  "handouts/p1-illustrations/manifest.json"
);
const expectedIds = [
  "radikale-akzeptanz",
  "gespraeche-kippen",
  "beispiel-dialog",
];

function sha256(filePath: string) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function fail(message: string): never {
  throw new Error(`P1 illustration audit failed: ${message}`);
}

function normalizeText(value: string) {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

if (!existsSync(manifestPath)) {
  fail("manifest.json is missing; run pnpm generate:p1-illustrations first");
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest;
if (manifest.exportContract.pdfUaClaim !== false) {
  fail("PDF/UA must not be claimed before the responsible final review");
}
if (
  manifest.exportContract.editorialStatus !== "draft-editorial-review-pending"
) {
  fail("P1 package must remain a draft until editorial approval is recorded");
}
if (
  manifest.exportContract.editorialStatusLabel !==
  "Entwurf – fachlich-redaktionelle Freigabe ausstehend"
) {
  fail("P1 package is missing the explicit editorial draft label");
}

const stylesheetPath = path.join(repoRoot, manifest.sourceStylesheet.path);
if (!existsSync(stylesheetPath)) {
  fail(`${manifest.sourceStylesheet.path} is missing`);
}
if (sha256(stylesheetPath) !== manifest.sourceStylesheet.sha256) {
  fail(`${manifest.sourceStylesheet.path} changed after export`);
}

if (
  manifest.entries.map(entry => entry.id).join("|") !== expectedIds.join("|")
) {
  fail("manifest IDs or ordering do not match the P1 contract");
}

for (const entry of manifest.entries) {
  const htmlPath = path.join(repoRoot, entry.sourceHtml);
  if (!existsSync(htmlPath)) fail(`${entry.sourceHtml} is missing`);
  if (sha256(htmlPath) !== entry.sourceHtmlSha256) {
    fail(`${entry.sourceHtml} changed after export`);
  }
  const html = readFileSync(htmlPath, "utf8");
  const sourceDocument = new JSDOM(html).window.document;
  for (const required of [
    'lang="de-CH"',
    '<main class="p1-main">',
    "<h1",
    'role="note"',
  ]) {
    if (!html.includes(required)) {
      fail(`${entry.sourceHtml} is missing: ${required}`);
    }
  }
  const normalizedSourceText = normalizeText(
    sourceDocument.body.textContent ?? ""
  );
  for (const requiredText of [
    "Dieses Blatt ersetzt keine persönliche Beratung oder Behandlung.",
    "Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich",
    manifest.exportContract.editorialStatusLabel,
    entry.safetyText,
  ]) {
    if (!normalizedSourceText.includes(normalizeText(requiredText))) {
      fail(`${entry.sourceHtml} is missing: ${requiredText}`);
    }
  }
  if (/https?:\/\//u.test(html)) {
    fail(`${entry.sourceHtml} contains a network dependency`);
  }
  if (/<article[^>]*class="p1-sheet"/u.test(html)) {
    fail(`${entry.sourceHtml} nests the main landmark inside an article`);
  }
  if (
    entry.id === "beispiel-dialog" &&
    !sourceDocument.querySelector('ol.p1-dialog[role="list"]')
  ) {
    fail(
      `${entry.sourceHtml} must expose the dialog sequence as an ordered list`
    );
  }

  for (const asset of [entry.pdf, entry.webp, entry.thumbnail]) {
    const assetPath = path.join(repoRoot, asset.path);
    if (!existsSync(assetPath)) fail(`${asset.path} is missing`);
    if (sha256(assetPath) !== asset.sha256) {
      fail(`${asset.path} hash differs from manifest`);
    }
  }

  const pdfPath = path.join(repoRoot, entry.pdf.path);
  const { stdout: pdfInfo } = await execFileAsync("pdfinfo", [pdfPath]);
  if (!/^Pages:\s+1$/mu.test(pdfInfo)) {
    fail(`${entry.pdf.path} must contain exactly one page`);
  }
  if (!/^Tagged:\s+yes$/mu.test(pdfInfo)) {
    fail(`${entry.pdf.path} must retain its tagged export`);
  }
  await execFileAsync("qpdf", ["--check", pdfPath]);

  const { stdout: extractedText } = await execFileAsync("pdftotext", [
    pdfPath,
    "-",
  ]);
  const normalizedPdfText = normalizeText(extractedText);
  const walker = sourceDocument.createTreeWalker(
    sourceDocument.body,
    sourceDocument.defaultView?.NodeFilter.SHOW_TEXT ?? 4
  );
  const sourceFragments = [];
  while (walker.nextNode()) {
    const parent = walker.currentNode.parentElement;
    const fragment = normalizeText(walker.currentNode.textContent ?? "");
    if (fragment.length >= 2 && parent && !parent.closest("script, style")) {
      sourceFragments.push(fragment);
    }
  }
  for (const fragment of sourceFragments) {
    if (!normalizedPdfText.includes(fragment)) {
      fail(`${entry.pdf.path} text layer differs from source: ${fragment}`);
    }
  }

  const orderedSections = [
    sourceDocument.querySelector("h1")?.textContent,
    sourceDocument.querySelector(".p1-safety p")?.textContent,
    sourceDocument.querySelector(".p1-next p")?.textContent,
  ].map(value => normalizeText(value ?? ""));
  let orderCursor = -1;
  for (const fragment of orderedSections) {
    const index = normalizedPdfText.indexOf(fragment, orderCursor + 1);
    if (!fragment || index < 0) {
      fail(`${entry.pdf.path} reorders a major source section`);
    }
    orderCursor = index;
  }

  const fullMetadata = await sharp(
    path.join(repoRoot, entry.webp.path)
  ).metadata();
  if (fullMetadata.width !== 1600 || fullMetadata.height !== 2263) {
    fail(`${entry.webp.path} must be 1600 x 2263 px`);
  }
  const thumbnailMetadata = await sharp(
    path.join(repoRoot, entry.thumbnail.path)
  ).metadata();
  if (thumbnailMetadata.width !== 600 || thumbnailMetadata.height !== 849) {
    fail(`${entry.thumbnail.path} must be 600 x 849 px`);
  }
}

console.log(
  `P1 illustration audit passed: ${manifest.entries.length} packages`
);
