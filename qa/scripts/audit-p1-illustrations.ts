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
    xmpMetadata: string;
    postprocessing: string;
  };
  entries: ManifestEntry[];
};

const repoRoot = process.cwd();
const manifestPath = path.join(
  repoRoot,
  "handouts/p1-illustrations/manifest.json"
);
const preflightReportPath = path.join(
  repoRoot,
  "qa/p1-illustrations/pdf-preflight-v3-2026-10-04.json"
);
const veraPdfReportPath = path.join(
  repoRoot,
  "qa/p1-illustrations/verapdf-ua1-candidates-v3-2026-10-04.json"
);
const postprocessorPath = path.join(repoRoot, "scripts/postprocess-p1-pdf.py");
const preflightScriptPath = path.join(
  repoRoot,
  "qa/p1-illustrations/pdf-preflight-v3.py"
);
const validatorPath = path.join(
  repoRoot,
  "qa/p1-illustrations/validate-pdfua-candidates.py"
);
const expectedIds = [
  "radikale-akzeptanz",
  "gespraeche-kippen",
  "beispiel-dialog",
];

const editorialTextContracts: Record<
  string,
  { required: string[]; forbidden: string[] }
> = {
  "radikale-akzeptanz": {
    required: ["Aufgeben", "Gutheissen", "Passivität", "Resignation"],
    forbidden: [
      "Nicht Aufgeben",
      "Nicht Gutheissen",
      "Nicht Passivität",
      "Nicht Resignation",
    ],
  },
  "beispiel-dialog": {
    required: [
      "Ich möchte dieses Gespräch so nicht weiterführen. Ich beende es jetzt.",
    ],
    forbidden: [
      "Ich möchte nicht angeschrien werden. Ich beende das Gespräch jetzt.",
    ],
  },
};

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
const manifestSha256 = sha256(manifestPath);
if (manifest.exportContract.pdfUaClaim !== false) {
  fail("PDF/UA must not be claimed before the responsible final review");
}
if (!manifest.exportContract.xmpMetadata.startsWith("present;")) {
  fail("P1 PDFs must retain synchronized XMP metadata");
}
if (
  !manifest.exportContract.postprocessing.includes("text and raster parity")
) {
  fail("P1 PDFs must retain guarded text and raster parity checks");
}
if (
  manifest.exportContract.editorialStatus !== "draft-editorial-review-pending"
) {
  fail(
    "P1 package must remain a draft until institutional approval is recorded"
  );
}
if (
  manifest.exportContract.editorialStatusLabel !==
  "Entwurf – fachlich-redaktionelle Freigabe ausstehend"
) {
  fail("P1 package is missing the explicit institutional draft label");
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

for (const reportPath of [preflightReportPath, veraPdfReportPath]) {
  if (!existsSync(reportPath)) {
    fail(`${path.relative(repoRoot, reportPath)} is missing`);
  }
}

const preflightReport = JSON.parse(
  readFileSync(preflightReportPath, "utf8")
) as {
  manifest_sha256: string;
  preflight_script_sha256: string;
  all_asset_hashes_match_manifest: boolean;
  entries: Array<{
    id: string;
    assets: { pdf: { sha256: string; manifest_match: boolean } };
  }>;
};
if (
  preflightReport.manifest_sha256 !== manifestSha256 ||
  preflightReport.preflight_script_sha256 !== sha256(preflightScriptPath) ||
  !preflightReport.all_asset_hashes_match_manifest ||
  preflightReport.entries.map(entry => entry.id).join("|") !==
    expectedIds.join("|")
) {
  fail("PDF preflight evidence is stale or does not match the manifest");
}

const veraPdfReport = JSON.parse(readFileSync(veraPdfReportPath, "utf8")) as {
  manifest_sha256: string;
  postprocessor_sha256: string;
  validator_sha256: string;
  all_candidates_pass_verapdf_profile: boolean;
  entries: Array<{
    id: string;
    source_sha256: string;
    exact_text_parity: boolean;
    exact_layout_text_parity: boolean;
    source_raster_sha256: string;
    candidate_raster_sha256: string;
    failed_rules: number;
    failed_checks: number;
  }>;
};
if (
  veraPdfReport.manifest_sha256 !== manifestSha256 ||
  veraPdfReport.postprocessor_sha256 !== sha256(postprocessorPath) ||
  veraPdfReport.validator_sha256 !== sha256(validatorPath) ||
  !veraPdfReport.all_candidates_pass_verapdf_profile ||
  veraPdfReport.entries.map(entry => entry.id).join("|") !==
    expectedIds.join("|")
) {
  fail("veraPDF candidate evidence is stale or does not match the toolchain");
}

for (const entry of manifest.entries) {
  const preflightEntry = preflightReport.entries.find(
    candidate => candidate.id === entry.id
  );
  if (
    !preflightEntry ||
    !preflightEntry.assets.pdf.manifest_match ||
    preflightEntry.assets.pdf.sha256 !== entry.pdf.sha256
  ) {
    fail(`PDF preflight evidence is stale for ${entry.id}`);
  }
  const veraPdfEntry = veraPdfReport.entries.find(
    candidate => candidate.id === entry.id
  );
  if (
    !veraPdfEntry ||
    veraPdfEntry.source_sha256 !== entry.pdf.sha256 ||
    !veraPdfEntry.exact_text_parity ||
    !veraPdfEntry.exact_layout_text_parity ||
    veraPdfEntry.source_raster_sha256 !==
      veraPdfEntry.candidate_raster_sha256 ||
    veraPdfEntry.failed_rules !== 0 ||
    veraPdfEntry.failed_checks !== 0
  ) {
    fail(`veraPDF candidate evidence is incomplete or stale for ${entry.id}`);
  }
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
  if (sourceDocument.querySelector("aside.p1-example")) {
    fail(`${entry.sourceHtml} exports the PDF 2.0-only Aside structure type`);
  }
  if (sourceDocument.querySelector('.p1-step-number[aria-hidden="true"]')) {
    fail(
      `${entry.sourceHtml} hides a visible list label from the PDF tag tree`
    );
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
  if (!/^PDF version:\s+1\.7$/mu.test(pdfInfo)) {
    fail(`${entry.pdf.path} must remain a PDF 1.7 review candidate`);
  }
  const { stdout: xmpMetadata } = await execFileAsync("pdfinfo", [
    "-meta",
    pdfPath,
  ]);
  for (const requiredXmpFragment of [
    "<dc:title>",
    'xml:lang="de-CH"',
    "<dc:creator>",
    "<dc:language>",
  ]) {
    if (!xmpMetadata.includes(requiredXmpFragment)) {
      fail(`${entry.pdf.path} XMP is missing: ${requiredXmpFragment}`);
    }
  }
  if (xmpMetadata.includes("<pdfuaid:part>")) {
    fail(
      `${entry.pdf.path} must not claim PDF/UA before the complete responsible review`
    );
  }
  await execFileAsync("qpdf", ["--check", pdfPath]);

  const { stdout: extractedText } = await execFileAsync("pdftotext", [
    pdfPath,
    "-",
  ]);
  const normalizedPdfText = normalizeText(extractedText);
  const editorialContract = editorialTextContracts[entry.id];
  if (editorialContract) {
    for (const requiredText of editorialContract.required) {
      const normalizedRequiredText = normalizeText(requiredText);
      if (
        !normalizedSourceText.includes(normalizedRequiredText) ||
        !normalizedPdfText.includes(normalizedRequiredText)
      ) {
        fail(
          `${entry.id} must contain the reviewed wording in source and PDF: ${requiredText}`
        );
      }
    }
    for (const forbiddenText of editorialContract.forbidden) {
      const normalizedForbiddenText = normalizeText(forbiddenText);
      if (
        normalizedSourceText.includes(normalizedForbiddenText) ||
        normalizedPdfText.includes(normalizedForbiddenText)
      ) {
        fail(
          `${entry.id} retains superseded wording in source or PDF: ${forbiddenText}`
        );
      }
    }
  }
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
