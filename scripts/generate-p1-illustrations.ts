import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { format } from "prettier";
import sharp from "sharp";
import { handoutTextVersions as kommunizierenTextVersions } from "../client/src/content/handoutTextVersionContent/kommunizieren.content";
import { handoutTextVersions as selbstfuersorgeTextVersions } from "../client/src/content/handoutTextVersionContent/selbstfuersorge.content";
import {
  HANDOUT_VISUALIZATION_IDS,
  resolveHandoutVisualization,
  type HandoutVisualization,
  type VisualizationStep,
} from "../client/src/content/handoutVisualizations";

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const sourceRoot = path.join(repoRoot, "handouts/p1-illustrations/sources");
const stylesheetPath = path.join(
  repoRoot,
  "handouts/p1-illustrations/p1-illustrations.css"
);
const outputRoot = path.join(repoRoot, "client/public/infografiken");
const thumbnailRoot = path.join(outputRoot, "extras/thumbnails");
const manifestPath = path.join(
  repoRoot,
  "handouts/p1-illustrations/manifest.json"
);
const pdfPostprocessorPath = path.join(
  repoRoot,
  "scripts/postprocess-p1-pdf.py"
);
const pdfPythonPath = process.env.P1_PDF_PYTHON_PATH ?? "python3";
const playwrightVersion = (
  JSON.parse(
    readFileSync(
      path.join(repoRoot, "node_modules/playwright/package.json"),
      "utf8"
    )
  ) as { version: string }
).version;
const chromePath =
  process.env.P1_CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const slugById = {
  "radikale-akzeptanz": "puk-radikale-akzeptanz-v3",
  "gespraeche-kippen": "puk-gespraeche-kippen-v3",
  "beispiel-dialog": "puk-beispiel-dialog-v3",
} as const;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatSourceReference(sourceLine: string) {
  return sourceLine
    .replace(
      /^(?:Quelle|Quellen|Fachlicher Bezugspunkt|Fachliche Bezugspunkte):\s*/u,
      ""
    )
    .replace(/\.$/u, "");
}

function renderSteps(steps: VisualizationStep[], modifier: string) {
  return `<ol class="p1-path ${modifier}" role="list">${steps
    .map(
      step => `<li>
        <span class="p1-step-number">${escapeHtml(step.label)}</span>
        <div class="p1-step-content">
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.text)}</p>
        </div>
      </li>`
    )
    .join("")}</ol>`;
}

function renderBulletList(items: string[]) {
  return `<ul role="list">${items
    .map(
      item => `<li>
        <span class="p1-list-label">•</span>
        <span class="p1-list-body">${escapeHtml(item)}</span>
      </li>`
    )
    .join("")}</ul>`;
}

function renderAcceptance(
  visual: Extract<HandoutVisualization, { kind: "acceptance-path" }>
) {
  return `<div class="p1-statement" role="note"><p>${escapeHtml(visual.keyStatement)}</p></div>
    <div class="p1-contrast">
      <section aria-labelledby="not-title">
        <h2 class="p1-section-title" id="not-title">Akzeptanz ist nicht</h2>
        ${renderBulletList(visual.notAcceptance.map(item => item.title))}
      </section>
      <section aria-labelledby="is-title">
        <h2 class="p1-section-title" id="is-title">Akzeptanz kann heissen</h2>
        ${renderBulletList(visual.acceptance.map(item => item.title))}
      </section>
    </div>
    <section aria-labelledby="path-title">
      <h2 class="p1-section-title" id="path-title">Vereinfachte Übung: vier mögliche Schritte</h2>
      ${renderSteps(visual.steps, "p1-path--four")}
    </section>
    <section class="p1-example" aria-labelledby="example-title">
      <h2 id="example-title">${escapeHtml(visual.example.title)}</h2>
      <p>${escapeHtml(visual.example.text)}</p>
    </section>`;
}

function renderConversation(
  visual: Extract<HandoutVisualization, { kind: "conversation-path" }>
) {
  return `<div class="p1-statement" role="note"><p>${escapeHtml(visual.keyStatement)}</p></div>
    <section aria-labelledby="path-title">
      <h2 class="p1-section-title" id="path-title">Drei mögliche Schritte</h2>
      ${renderSteps(visual.steps, "p1-path--three")}
    </section>
    <section class="p1-pause" aria-labelledby="pause-title">
      <h2 class="p1-section-title" id="pause-title">Eine Pause schafft Wahlraum</h2>
      ${renderBulletList(visual.pausePlan)}
    </section>`;
}

function renderDialog(
  visual: Extract<HandoutVisualization, { kind: "dialog-sequence" }>
) {
  return `<section class="p1-opening" aria-labelledby="opening-title">
      <h2 id="opening-title">Ausgangspunkt</h2>
      <blockquote><p>${escapeHtml(visual.opening)}</p></blockquote>
    </section>
    <section aria-labelledby="dialog-title">
      <h2 class="p1-section-title" id="dialog-title">Ein möglicher Ablauf</h2>
      <ol class="p1-dialog" role="list">${visual.steps
        .map(
          step => `<li>
          <span class="p1-step-number">${escapeHtml(step.label)}</span>
          <div class="p1-step-content">
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.text)}</p>
          </div>
        </li>`
        )
        .join("")}</ol>
    </section>
    <p class="p1-adaptation">${escapeHtml(visual.adaptationNote)}</p>
    <div class="p1-statement" role="note"><p>${escapeHtml(visual.keyStatement)}</p></div>`;
}

function renderHtml(visual: HandoutVisualization) {
  const content =
    visual.kind === "acceptance-path"
      ? renderAcceptance(visual)
      : visual.kind === "conversation-path"
        ? renderConversation(visual)
        : renderDialog(visual);

  return `<!doctype html>
<html lang="de-CH">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(visual.title)} · Praxisblatt</title>
    <meta name="description" content="${escapeHtml(visual.lead)}">
    <link rel="stylesheet" href="../p1-illustrations.css">
  </head>
  <body>
    <div class="p1-sheet" data-puk-handout-type="practice" data-visual-kind="${visual.kind}">
      <header class="p1-brand">
        <img src="../../../client/public/puk/logo.svg" alt="Psychiatrische Universitätsklinik Zürich">
        <p class="p1-eyebrow">${visual.eyebrow}</p>
        <div class="p1-title-row">
          <h1 id="document-title">${escapeHtml(visual.title)}</h1>
        </div>
        <p class="p1-lead">${escapeHtml(visual.lead)}</p>
      </header>
      <main class="p1-main">
        ${content}
        <aside class="p1-safety" role="note" aria-labelledby="safety-title">
          <h2 id="safety-title">${escapeHtml(visual.safetyTitle)}</h2>
          <p>${escapeHtml(visual.safetyText)}</p>
        </aside>
        <section class="p1-next" aria-labelledby="next-title">
          <h2 id="next-title">Ein nächster Schritt</h2>
          <p>${escapeHtml(visual.nextStep)}</p>
        </section>
      </main>
      <footer class="p1-footer">
        <p class="p1-footer__institution">Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich</p>
        <p>${escapeHtml(visual.disclaimer)}</p>
        <p>Eigene didaktische Darstellung der Fachstelle Angehörigenarbeit in Anlehnung an <cite>${escapeHtml(formatSourceReference(visual.sourceLine))}</cite>.</p>
        <div class="p1-footer__meta">
          <p>${escapeHtml(visual.standLine)}</p>
          <p>Seite 1 / 1</p>
        </div>
      </footer>
    </div>
  </body>
</html>`;
}

function sha256(filePath: string) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function promoteFile(stagedPath: string, targetPath: string) {
  const temporaryTarget = `${targetPath}.p1-promote-${process.pid}`;
  try {
    copyFileSync(stagedPath, temporaryTarget);
    chmodSync(temporaryTarget, statSync(stagedPath).mode & 0o777);
    renameSync(temporaryTarget, targetPath);
  } finally {
    if (existsSync(temporaryTarget)) {
      rmSync(temporaryTarget, { force: true });
    }
  }
}

function metadataDateFromStandLine(standLine: string) {
  const match = /Stand:\s*(\d{2})\.(\d{2})\.(\d{4})/u.exec(standLine);
  if (!match) {
    throw new Error(`No metadata date found in stand line: ${standLine}`);
  }
  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

function normalizeExtractedText(value: string) {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function contentFragments(visual: HandoutVisualization) {
  const shared = [visual.title, visual.lead];

  if (visual.kind === "acceptance-path") {
    return [
      ...shared,
      visual.keyStatement,
      ...visual.notAcceptance.map(item => item.title),
      ...visual.acceptance.map(item => item.title),
      ...visual.steps.flatMap(step => [step.title, step.text]),
      visual.example.title,
      visual.example.text,
      visual.safetyText,
      visual.nextStep,
    ];
  }

  if (visual.kind === "conversation-path") {
    return [
      ...shared,
      visual.keyStatement,
      ...visual.steps.flatMap(step => [step.title, step.text]),
      ...visual.pausePlan,
      visual.safetyText,
      visual.nextStep,
    ];
  }

  return [
    ...shared,
    visual.opening,
    ...visual.steps.flatMap(step => [step.title, step.text]),
    visual.adaptationNote,
    visual.keyStatement,
    visual.safetyText,
    visual.nextStep,
  ];
}

function assertTextLayer(visual: HandoutVisualization, extractedText: string) {
  const normalizedText = normalizeExtractedText(extractedText);

  for (const fragment of contentFragments(visual)) {
    const normalizedFragment = normalizeExtractedText(fragment);
    if (!normalizedText.includes(normalizedFragment)) {
      throw new Error(
        `${visual.id} PDF text layer is missing: ${normalizedFragment}`
      );
    }
  }

  let cursor = -1;
  for (const fragment of [
    visual.title,
    visual.lead,
    visual.safetyText,
    visual.nextStep,
  ]) {
    const normalizedFragment = normalizeExtractedText(fragment);
    const index = normalizedText.indexOf(normalizedFragment, cursor + 1);
    if (index < 0) {
      throw new Error(
        `${visual.id} PDF text layer reorders a major section: ${normalizedFragment}`
      );
    }
    cursor = index;
  }
}

async function main() {
  mkdirSync(sourceRoot, { recursive: true });
  mkdirSync(outputRoot, { recursive: true });
  mkdirSync(thumbnailRoot, { recursive: true });

  const versions = [
    ...selbstfuersorgeTextVersions,
    ...kommunizierenTextVersions,
  ];
  const visuals = HANDOUT_VISUALIZATION_IDS.map(id => {
    const handout = versions.find(item => item.id === id);
    const visual = resolveHandoutVisualization(handout);
    if (!visual) {
      throw new Error(`Missing P1 visualization source: ${id}`);
    }
    return visual;
  });

  const browser = await chromium.launch(
    existsSync(chromePath) ? { executablePath: chromePath } : undefined
  );
  const browserVersion = browser.version();
  const temporaryRoot = mkdtempSync(
    path.join(tmpdir(), "borderline-p1-illustrations-")
  );
  const stagedRepoRoot = path.join(temporaryRoot, "repo");
  const stagedSourceRoot = path.join(
    stagedRepoRoot,
    "handouts/p1-illustrations/sources"
  );
  const stagedOutputRoot = path.join(temporaryRoot, "output");
  const stagedThumbnailRoot = path.join(stagedOutputRoot, "thumbnails");
  mkdirSync(stagedSourceRoot, { recursive: true });
  mkdirSync(stagedThumbnailRoot, { recursive: true });
  copyFileSync(
    stylesheetPath,
    path.join(stagedRepoRoot, "handouts/p1-illustrations/p1-illustrations.css")
  );
  const stagedLogoPath = path.join(
    stagedRepoRoot,
    "client/public/puk/logo.svg"
  );
  mkdirSync(path.dirname(stagedLogoPath), { recursive: true });
  copyFileSync(
    path.join(repoRoot, "client/public/puk/logo.svg"),
    stagedLogoPath
  );
  const stagedFontsRoot = path.join(stagedRepoRoot, "client/public/fonts");
  mkdirSync(stagedFontsRoot, { recursive: true });
  for (const fontName of [
    "Rubik-Light.ttf",
    "Rubik-Regular.ttf",
    "Rubik-Medium.ttf",
  ]) {
    copyFileSync(
      path.join(repoRoot, "client/public/fonts", fontName),
      path.join(stagedFontsRoot, fontName)
    );
  }

  const manifestEntries = [];
  const stagedArtifacts: Array<{ staged: string; target: string }> = [];

  try {
    for (const visual of visuals) {
      const slug = slugById[visual.id];
      const htmlPath = path.join(stagedSourceRoot, `${slug}.html`);
      const pdfPath = path.join(stagedOutputRoot, `${slug}.pdf`);
      const webpPath = path.join(stagedOutputRoot, `${slug}.webp`);
      const thumbnailPath = path.join(stagedThumbnailRoot, `${slug}.webp`);
      const pngPath = path.join(temporaryRoot, `${slug}.png`);
      const rawPdfPath = path.join(temporaryRoot, `${slug}-raw.pdf`);
      const rawPngPath = path.join(temporaryRoot, `${slug}-raw.png`);
      const targetHtmlPath = path.join(sourceRoot, `${slug}.html`);
      const targetPdfPath = path.join(outputRoot, `${slug}.pdf`);
      const targetWebpPath = path.join(outputRoot, `${slug}.webp`);
      const targetThumbnailPath = path.join(thumbnailRoot, `${slug}.webp`);
      writeFileSync(
        htmlPath,
        await format(renderHtml(visual), { parser: "html" }),
        "utf8"
      );

      const page = await browser.newPage({
        viewport: { width: 794, height: 1123 },
      });
      await page.goto(pathToFileURL(htmlPath).href, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({ media: "print" });

      const overflow = await page.locator(".p1-sheet").evaluate(element => {
        const header = element.querySelector<HTMLElement>(".p1-brand");
        const main = element.querySelector<HTMLElement>(".p1-main");
        const footer = element.querySelector<HTMLElement>(".p1-footer");
        if (!header || !main || !footer) {
          throw new Error(
            "P1 sheet is missing its header, main or footer region"
          );
        }
        const sheetRect = element.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const contentBottom = Math.max(
          ...Array.from(main.children).map(
            child => child.getBoundingClientRect().bottom
          )
        );
        const footerTop = footerRect.top;

        return {
          sheetHorizontal: element.scrollWidth > element.clientWidth + 1,
          sheetVertical: element.scrollHeight > element.clientHeight + 1,
          mainHorizontal: main.scrollWidth > main.clientWidth + 1,
          mainVertical: main.scrollHeight > main.clientHeight + 1,
          headerClipped: headerRect.top < sheetRect.top - 1,
          footerClipped: footerRect.bottom > sheetRect.bottom + 1,
          contentOverlapsFooter: contentBottom > footerTop - 1,
          contentBottom: Math.round(contentBottom),
          footerTop: Math.round(footerTop),
        };
      });
      if (
        overflow.sheetHorizontal ||
        overflow.sheetVertical ||
        overflow.mainHorizontal ||
        overflow.mainVertical ||
        overflow.headerClipped ||
        overflow.footerClipped ||
        overflow.contentOverlapsFooter
      ) {
        throw new Error(
          `${visual.id} overflows its A4 sheet: ${JSON.stringify(overflow)}`
        );
      }

      await page.pdf({
        path: pdfPath,
        format: "A4",
        preferCSSPageSize: true,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        tagged: true,
        outline: true,
      });
      await page.close();
      chmodSync(pdfPath, 0o644);

      copyFileSync(pdfPath, rawPdfPath);
      const { stdout: rawLogicalText } = await execFileAsync("pdftotext", [
        rawPdfPath,
        "-",
      ]);
      const { stdout: rawLayoutText } = await execFileAsync("pdftotext", [
        "-layout",
        rawPdfPath,
        "-",
      ]);

      await execFileAsync(pdfPythonPath, [
        pdfPostprocessorPath,
        "--pdf",
        pdfPath,
        "--title",
        `${visual.title} · Praxisblatt`,
        "--description",
        visual.lead,
        "--creator",
        "Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich",
        "--creator-tool",
        `Playwright ${playwrightVersion}; Chromium ${browserVersion}; PUK-PDF-Nachbearbeitung`,
        "--metadata-date",
        metadataDateFromStandLine(visual.standLine),
      ]);

      const { stdout: pdfInfo } = await execFileAsync("pdfinfo", [pdfPath]);
      if (!/^Pages:\s+1$/mu.test(pdfInfo)) {
        throw new Error(`${visual.id} did not export as one PDF page`);
      }
      if (!/^Tagged:\s+yes$/mu.test(pdfInfo)) {
        throw new Error(`${visual.id} PDF is not tagged`);
      }

      const { stdout: extractedText } = await execFileAsync("pdftotext", [
        "-layout",
        pdfPath,
        "-",
      ]);
      if (
        !normalizeExtractedText(extractedText).includes(
          normalizeExtractedText(visual.safetyText)
        )
      ) {
        throw new Error(
          `${visual.id} safety text is missing from the PDF text layer`
        );
      }

      const { stdout: logicalText } = await execFileAsync("pdftotext", [
        pdfPath,
        "-",
      ]);
      if (rawLogicalText !== logicalText) {
        throw new Error(
          `${visual.id} PDF postprocessing changed the extracted text`
        );
      }
      if (rawLayoutText !== extractedText) {
        throw new Error(
          `${visual.id} PDF postprocessing changed the layout text extraction`
        );
      }
      assertTextLayer(visual, logicalText);

      await execFileAsync("qpdf", ["--check", pdfPath]);
      await execFileAsync("pdftoppm", [
        "-f",
        "1",
        "-singlefile",
        "-png",
        "-scale-to-x",
        "1600",
        "-scale-to-y",
        "-1",
        pdfPath,
        pngPath.replace(/\.png$/u, ""),
      ]);
      await execFileAsync("pdftoppm", [
        "-f",
        "1",
        "-singlefile",
        "-png",
        "-scale-to-x",
        "1600",
        "-scale-to-y",
        "-1",
        rawPdfPath,
        rawPngPath.replace(/\.png$/u, ""),
      ]);
      const [processedPixels, rawPixels] = await Promise.all([
        sharp(pngPath).raw().toBuffer(),
        sharp(rawPngPath).raw().toBuffer(),
      ]);
      if (!processedPixels.equals(rawPixels)) {
        throw new Error(
          `${visual.id} PDF postprocessing changed the rendered page`
        );
      }

      await sharp(pngPath)
        .resize(1600, 2263, { fit: "fill" })
        .webp({ quality: 92, effort: 6 })
        .toFile(webpPath);
      await sharp(pngPath)
        .resize(600, 849, { fit: "fill" })
        .webp({ quality: 84, effort: 6 })
        .toFile(thumbnailPath);

      stagedArtifacts.push(
        { staged: htmlPath, target: targetHtmlPath },
        { staged: pdfPath, target: targetPdfPath },
        { staged: webpPath, target: targetWebpPath },
        { staged: thumbnailPath, target: targetThumbnailPath }
      );

      manifestEntries.push({
        id: visual.id,
        version: slug,
        sourceHtml: path.relative(repoRoot, targetHtmlPath),
        sourceHtmlSha256: sha256(htmlPath),
        pdf: {
          path: path.relative(repoRoot, targetPdfPath),
          bytes: statSync(pdfPath).size,
          sha256: sha256(pdfPath),
          pages: 1,
          tagged: true,
        },
        webp: {
          path: path.relative(repoRoot, targetWebpPath),
          bytes: statSync(webpPath).size,
          sha256: sha256(webpPath),
          width: 1600,
          height: 2263,
        },
        thumbnail: {
          path: path.relative(repoRoot, targetThumbnailPath),
          bytes: statSync(thumbnailPath).size,
          sha256: sha256(thumbnailPath),
          width: 600,
          height: 849,
        },
        safetyText: visual.safetyText,
      });
    }

    for (const artifact of stagedArtifacts) {
      promoteFile(artifact.staged, artifact.target);
    }

    const manifestContents = `${JSON.stringify(
      {
        schemaVersion: 1,
        package: "borderline-p1-illustrations",
        designSystem: {
          fullSystem: "PUK Zürich Design System 1.10.1",
          websiteProfile: "PUK Zürich Website-Profil 1.10.1-r4",
          handoutProfile: "PUK Fachstelle-Handouts in Vollsystem 1.10.1",
        },
        sourceStylesheet: {
          path: path.relative(repoRoot, stylesheetPath),
          sha256: sha256(stylesheetPath),
        },
        exportContract: {
          pdf: "A4 portrait, one page, tagged export requested",
          xmpMetadata:
            "present; no PDF/UA identifier until the complete responsible review",
          postprocessing:
            "guarded PDF 1.7 semantic repair for lists, layout and pagination artifacts, sources, wrap spaces and outlines; exact text and raster parity required",
          fullWebp: "1600 x 2263 px",
          thumbnailWebp: "600 x 849 px",
          editorialStatus: "draft-editorial-review-pending",
          editorialStatusLabel:
            "Entwurf – fachlich-redaktionelle Freigabe ausstehend",
          pdfUaClaim: false,
          matterhornReview: "pending",
        },
        renderer: {
          playwright: playwrightVersion,
          browser: browserVersion,
        },
        entries: manifestEntries,
      },
      null,
      2
    )}\n`;
    const stagedManifestPath = path.join(temporaryRoot, "manifest.json");
    writeFileSync(stagedManifestPath, manifestContents, "utf8");
    promoteFile(stagedManifestPath, manifestPath);
  } finally {
    try {
      await browser.close();
    } finally {
      rmSync(temporaryRoot, { recursive: true, force: true });
    }
  }
}

await main();
