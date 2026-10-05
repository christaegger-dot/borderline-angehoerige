import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import {
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
import { handoutTextVersions as genesungVersions } from "../client/src/content/handoutTextVersionContent/genesung.content";
import { handoutTextVersions as grenzenVersions } from "../client/src/content/handoutTextVersionContent/grenzen.content";
import { handoutTextVersions as selbstfuersorgeVersions } from "../client/src/content/handoutTextVersionContent/selbstfuersorge.content";
import { handoutTextVersions as unterstuetzenVersions } from "../client/src/content/handoutTextVersionContent/unterstuetzen.content";
import { handoutTextVersions as verstehenVersions } from "../client/src/content/handoutTextVersionContent/verstehen.content";
import type {
  HandoutTextSection,
  HandoutTextVersion,
} from "../client/src/content/handoutTextVersionTypes";

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const packageRoot = path.join(repoRoot, "handouts/issue-615-refresh");
const sourceRoot = path.join(packageRoot, "sources");
const stylesheetPath = path.join(packageRoot, "issue-615-refresh.css");
const manifestPath = path.join(packageRoot, "manifest.json");
const withheldRoot = path.join(
  repoRoot,
  "qa/withheld-handouts/issue-615-visual-refresh-2026-10-05"
);
const outputRoot = path.join(withheldRoot, "infografiken");
const thumbnailRoot = path.join(outputRoot, "extras/thumbnails");
const metadataScript = path.join(
  repoRoot,
  "scripts/add-handout-pdf-metadata.py"
);
const pdfPythonPath = process.env.HANDOUT_PDF_PYTHON_PATH ?? "python3";
const chromePath =
  process.env.HANDOUT_CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

type VisualKind =
  | "alignment"
  | "balance"
  | "beacon"
  | "boundary"
  | "constellation"
  | "decision"
  | "flow"
  | "lenses"
  | "map"
  | "path"
  | "permissions"
  | "pillars"
  | "questions"
  | "signals";

type NodeSelector = {
  section: string;
  take?: number;
  prefix?: string;
  collapse?: boolean;
};

type HandoutSpec = {
  id: string;
  version: string;
  visualKind: VisualKind;
  visualTitle: string;
  nodeSections: NodeSelector[];
  keySection: string;
  actionSection?: string;
  safetySection?: string;
};

const specs: HandoutSpec[] = [
  {
    id: "zustands-landkarte",
    version: "puk-zustands-landkarte-v1",
    visualKind: "map",
    visualTitle: "Drei Dimensionen statt fester Phasen",
    nodeSections: [{ section: "Drei getrennt betrachtete Dimensionen" }],
    keySection: "Einordnung des Modells",
    actionSection: "Freiwillige Fragen zur eigenen Orientierung",
    safetySection: "Sicherheit ist keine Phase",
  },
  {
    id: "gehirn",
    version: "puk-hohe-anspannung-v1",
    visualKind: "flow",
    visualTitle: "Hohe Anspannung verändert vorübergehend den Spielraum",
    nodeSections: [
      { section: "Was vorübergehend schwerer werden kann" },
      { section: "Was Handlungsspielraum erweitern kann" },
    ],
    keySection: "Einordnung des Modells",
    safetySection: "Verstehen ist nicht entschuldigen",
  },
  {
    id: "remission-heilung",
    version: "puk-remission-recovery-v2",
    visualKind: "lenses",
    visualTitle: "Vier Begriffe – unterschiedliche Blickwinkel",
    nodeSections: [
      { section: "Diagnostische Remission", collapse: true },
      { section: "Alltag und Teilhabe", collapse: true },
      { section: "Persönliche Recovery", collapse: true },
      { section: "Zum Begriff «Heilung»", collapse: true },
    ],
    keySection: "Kernaussage",
    actionSection: "Was können Sie tun?",
  },
  {
    id: "5-faktoren-genesung",
    version: "puk-genesungsbedingungen-v2",
    visualKind: "constellation",
    visualTitle: "Mögliche Bedingungen – keine Genesungsformel",
    nodeSections: [{ section: "Fünf mögliche Bereiche" }],
    keySection: "Kernaussage",
    actionSection: "Was können Sie tun?",
  },
  {
    id: "rolle-genesungsprozess",
    version: "puk-rolle-genesungsprozess-v2",
    visualKind: "boundary",
    visualTitle: "Freiwilliges Angebot und klare Nicht-Aufgaben",
    nodeSections: [
      {
        section: "Was Sie freiwillig anbieten können",
        take: 3,
        prefix: "Anbieten",
      },
      {
        section: "Was nicht Ihre Aufgabe ist",
        take: 3,
        prefix: "Nicht Ihre Aufgabe",
      },
    ],
    keySection: "Orientierung",
    actionSection: "Was können Sie tun?",
  },
  {
    id: "leuchtturm",
    version: "puk-leuchtturm-orientierung-v2",
    visualKind: "beacon",
    visualTitle: "Orientierung für den eigenen nächsten Schritt",
    nodeSections: [{ section: "Die Bildidee" }],
    keySection: "Kernaussage",
    actionSection: "3 Schritte",
  },
  {
    id: "konsistenz-prinzip",
    version: "puk-verlaessliche-absprachen-v2",
    visualKind: "alignment",
    visualTitle: "Verlässlich heisst transparent und anpassbar",
    nodeSections: [{ section: "Zwei Kommunikationssituationen im Vergleich" }],
    keySection: "Merkhilfe",
    actionSection: "Was können Sie tun?",
  },
  {
    id: "energie-konto",
    version: "puk-energie-konto-v2",
    visualKind: "balance",
    visualTitle: "Was kann heute Kraft geben – was kostet Kraft?",
    nodeSections: [
      { section: "Was entlasten kann", take: 3, prefix: "Kann entlasten" },
      { section: "Was belasten kann", take: 3, prefix: "Kann belasten" },
    ],
    keySection: "Kernaussage",
    actionSection: "Was können Sie tun?",
  },
  {
    id: "grenzen-erkennen",
    version: "puk-grenzen-ueberlastung-v2",
    visualKind: "signals",
    visualTitle: "Mögliche Signale wahrnehmen und im Kontext prüfen",
    nodeSections: [{ section: "Mögliche Signale", take: 5 }],
    keySection: "Kernaussage",
    actionSection: "Abschluss",
  },
  {
    id: "lmk",
    version: "puk-grenze-in-handlung-v2",
    visualKind: "decision",
    visualTitle: "Eine Grenze in eigenes Handeln übersetzen",
    nodeSections: [
      { section: "1. Grenze benennen" },
      { section: "2. Eigenen Spielraum klären" },
      { section: "3. Schutzschritt umsetzen" },
    ],
    keySection: "Kernaussage",
    actionSection: "Was können Sie tun?",
    safetySection: "Sicherheit",
  },
  {
    id: "drei-saeulen",
    version: "puk-drei-orientierungspunkte-v2",
    visualKind: "pillars",
    visualTitle: "Drei freiwillige Orientierungspunkte",
    nodeSections: [{ section: "Drei Fragen zur Selbstklärung" }],
    keySection: "Kernaussage",
    actionSection: "Was können Sie tun?",
  },
  {
    id: "beziehungs-achtsamkeit",
    version: "puk-beziehungs-achtsamkeit-v2",
    visualKind: "path",
    visualTitle: "Vier mögliche Schritte aus der Automatik",
    nodeSections: [{ section: "4 Schritte im Alltag" }],
    keySection: "Merksatz",
    actionSection: "Was können Sie tun?",
  },
  {
    id: "6-leitlinien",
    version: "puk-sechs-leitlinien-v2",
    visualKind: "path",
    visualTitle: "Sechs Angebote zur Orientierung",
    nodeSections: [{ section: "Die 6 Leitlinien" }],
    keySection: "Merkhilfe",
    actionSection: "Mögliche nächste Schritte",
  },
  {
    id: "4-alltags-tipps",
    version: "puk-vier-alltagsfragen-v2",
    visualKind: "questions",
    visualTitle: "Vier Fragen vor einem Unterstützungsangebot",
    nodeSections: [{ section: "4 Fragen für den Alltag" }],
    keySection: "Merksatz",
    actionSection: "Was können Sie tun?",
  },
  {
    id: "erlaubnis-karte",
    version: "puk-erlaubnis-karte-v2",
    visualKind: "permissions",
    visualTitle: "Neun Erlaubnisse – keine neue Pflichtliste",
    nodeSections: [{ section: "Erlaubnis" }],
    keySection: "Wie Sie die Karte lesen können",
    actionSection: "Was können Sie tun?",
  },
];

const versions = [
  ...verstehenVersions,
  ...unterstuetzenVersions,
  ...grenzenVersions,
  ...selbstfuersorgeVersions,
  ...genesungVersions,
];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeText(value: string) {
  return value.normalize("NFKC").replace(/\s+/gu, " ").trim();
}

function requireVersion(id: string) {
  const version = versions.find(item => item.id === id);
  if (!version) throw new Error(`Missing handout text source: ${id}`);
  return version;
}

function requireSection(handout: HandoutTextVersion, title: string) {
  const section = handout.sections.find(item => item.title === title);
  if (!section) {
    throw new Error(`Missing section for ${handout.id}: ${title}`);
  }
  return section;
}

function sectionText(section: HandoutTextSection) {
  if (section.calloutText) return section.calloutText;
  if (section.intro) return section.intro;
  if (section.bullets?.length) return section.bullets.join(" ");
  if (section.cards?.length) {
    return section.cards.map(card => card.text).join(" ");
  }
  return section.title;
}

function extractNodes(handout: HandoutTextVersion, selectors: NodeSelector[]) {
  return selectors.flatMap(selector => {
    const section = requireSection(handout, selector.section);
    const prefix = selector.prefix ? `${selector.prefix} · ` : "";
    if (section.cards?.length) {
      return section.cards.slice(0, selector.take).map(card => ({
        title: `${prefix}${card.title}`,
        text: card.text,
      }));
    }
    if (section.bullets?.length) {
      if (selector.collapse) {
        return [
          {
            title: `${prefix}${section.title}`,
            text: section.bullets.join(" "),
          },
        ];
      }
      return section.bullets.slice(0, selector.take).map(item => ({
        title: `${prefix}${item}`,
        text: "",
      }));
    }
    return [
      {
        title: `${prefix}${section.calloutTitle ?? section.title}`,
        text: sectionText(section),
      },
    ];
  });
}

function extractActions(handout: HandoutTextVersion, title?: string) {
  if (!title) return [];
  const section = requireSection(handout, title);
  if (section.cards?.length) {
    return section.cards.slice(0, 3).map(card => `${card.title}: ${card.text}`);
  }
  if (section.bullets?.length) return section.bullets.slice(0, 3);
  return [sectionText(section)];
}

function sourceReference(sourceLine: string) {
  return sourceLine.replace(
    /^(?:Quelle|Quellen|Fachlicher Bezugspunkt|Fachliche Bezugspunkte):\s*/u,
    ""
  );
}

function metadataDate(standLine: string) {
  const matches = [...standLine.matchAll(/(\d{2})\.(\d{2})\.(\d{4})/gu)];
  const match = matches.at(-1);
  if (!match) throw new Error(`Missing source-controlled date: ${standLine}`);
  return `${match[3]}-${match[2]}-${match[1]}`;
}

function renderHtml(spec: HandoutSpec, handout: HandoutTextVersion) {
  const nodes = extractNodes(handout, spec.nodeSections);
  const key = requireSection(handout, spec.keySection);
  const actions = extractActions(handout, spec.actionSection);
  const safety = spec.safetySection
    ? requireSection(handout, spec.safetySection)
    : null;
  const columns =
    spec.visualKind === "permissions"
      ? 3
      : nodes.length <= 3
        ? nodes.length
        : nodes.length === 4
          ? 4
          : nodes.length <= 6
            ? 3
            : 3;
  const documentLabel =
    handout.documentType === "PRAXISBLATT"
      ? "Praxisblatt"
      : "Orientierungsblatt";
  const actionText = actions.length
    ? `<ul>${actions.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : `<p>${escapeHtml(
        handout.intro.find(item => !item.startsWith("Dieses Blatt ersetzt")) ??
          handout.summary
      )}</p>`;

  return `<!doctype html>
<html lang="de-CH">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(handout.title)} · ${documentLabel}</title>
    <meta name="description" content="${escapeHtml(handout.summary)}">
    <link rel="stylesheet" href="../issue-615-refresh.css">
  </head>
  <body>
    <article class="sheet" data-id="${spec.id}" data-version="${spec.version}">
      <header class="header">
        <div class="brand-row">
          <img src="../../../client/public/puk/logo.svg" alt="Psychiatrische Universitätsklinik Zürich">
          <p class="eyebrow">${documentLabel} · Fachstelle Angehörigenarbeit</p>
        </div>
        <h1>${escapeHtml(handout.title)}</h1>
        <p class="lead">${escapeHtml(handout.summary)}</p>
      </header>
      <main class="main">
        <section class="visual" data-visual="${spec.visualKind}" aria-labelledby="visual-title">
          <h2 id="visual-title">${escapeHtml(spec.visualTitle)}</h2>
          <div class="visual__nodes" style="--columns: ${columns}">
            ${nodes
              .map(
                (
                  node,
                  index
                ) => `<section class="node" data-index="${index + 1}">
                  <h3>${escapeHtml(node.title)}</h3>
                  ${node.text ? `<p>${escapeHtml(node.text)}</p>` : ""}
                </section>`
              )
              .join("")}
          </div>
        </section>
        <aside class="key" role="note" aria-labelledby="key-title">
          <h2 id="key-title">${escapeHtml(key.calloutTitle ?? key.title)}</h2>
          <p>${escapeHtml(sectionText(key))}</p>
        </aside>
        <section class="next" aria-labelledby="next-title">
          <h2 id="next-title">${safety ? escapeHtml(safety.calloutTitle ?? safety.title) : "Ein nächster Schritt"}</h2>
          ${safety ? `<p>${escapeHtml(sectionText(safety))}</p>` : actionText}
        </section>
      </main>
      <footer class="footer">
        ${
          safety && actions.length
            ? `<p><strong>Handlungsmöglichkeiten:</strong> ${escapeHtml(actions.join(" · "))}</p>`
            : ""
        }
        <p>Eigene didaktische Darstellung der Fachstelle Angehörigenarbeit. Fachlicher Bezug: ${escapeHtml(sourceReference(handout.sourceLine))}</p>
        <p>Dieses Blatt ersetzt keine persönliche Beratung oder Behandlung.</p>
        <div class="footer__meta">
          <p>${escapeHtml(handout.standLine)}</p>
          <p class="footer__draft">Entwurf · verantwortete Freigabe ausstehend · Seite 1 / 1</p>
        </div>
      </footer>
    </article>
  </body>
</html>`;
}

function sha256(filePath: string) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function atomicCopy(source: string, target: string) {
  mkdirSync(path.dirname(target), { recursive: true });
  const temporary = `${target}.issue615-${process.pid}`;
  copyFileSync(source, temporary);
  renameSync(temporary, target);
}

async function render() {
  mkdirSync(sourceRoot, { recursive: true });
  mkdirSync(outputRoot, { recursive: true });
  mkdirSync(thumbnailRoot, { recursive: true });

  const browser = await chromium.launch(
    existsSync(chromePath) ? { executablePath: chromePath } : undefined
  );
  const temporaryRoot = mkdtempSync(path.join(tmpdir(), "issue615-handouts-"));
  const stagedRepo = path.join(temporaryRoot, "repo");
  const stagedSources = path.join(
    stagedRepo,
    "handouts/issue-615-refresh/sources"
  );
  const stagedOutput = path.join(temporaryRoot, "output");
  const stagedThumbnails = path.join(stagedOutput, "extras/thumbnails");
  mkdirSync(stagedSources, { recursive: true });
  mkdirSync(stagedThumbnails, { recursive: true });
  mkdirSync(path.join(stagedRepo, "handouts/issue-615-refresh"), {
    recursive: true,
  });
  copyFileSync(
    stylesheetPath,
    path.join(stagedRepo, "handouts/issue-615-refresh/issue-615-refresh.css")
  );
  const stagedLogo = path.join(stagedRepo, "client/public/puk/logo.svg");
  mkdirSync(path.dirname(stagedLogo), { recursive: true });
  copyFileSync(path.join(repoRoot, "client/public/puk/logo.svg"), stagedLogo);
  const stagedFonts = path.join(stagedRepo, "client/public/fonts");
  mkdirSync(stagedFonts, { recursive: true });
  for (const font of [
    "Rubik-Light.ttf",
    "Rubik-Regular.ttf",
    "Rubik-Medium.ttf",
  ]) {
    copyFileSync(
      path.join(repoRoot, "client/public/fonts", font),
      path.join(stagedFonts, font)
    );
  }

  const entries = [];
  try {
    for (const spec of specs) {
      const handout = requireVersion(spec.id);
      const stagedHtml = path.join(stagedSources, `${spec.version}.html`);
      const stagedPdf = path.join(stagedOutput, `${spec.version}.pdf`);
      const stagedWebp = path.join(stagedOutput, `${spec.version}.webp`);
      const stagedThumbnail = path.join(
        stagedThumbnails,
        `${spec.version}.webp`
      );
      const rawPdf = path.join(temporaryRoot, `${spec.version}-raw.pdf`);
      const pngBase = path.join(temporaryRoot, spec.version);
      const png = `${pngBase}.png`;
      const rawPngBase = path.join(temporaryRoot, `${spec.version}-raw`);
      const rawPng = `${rawPngBase}.png`;

      writeFileSync(
        stagedHtml,
        await format(renderHtml(spec, handout), { parser: "html" }),
        "utf8"
      );
      const page = await browser.newPage({
        viewport: { width: 794, height: 1123 },
      });
      await page.goto(pathToFileURL(stagedHtml).href, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({ media: "print" });
      const overflow = await page.locator(".sheet").evaluate(element => ({
        horizontal: element.scrollWidth > element.clientWidth + 1,
        vertical: element.scrollHeight > element.clientHeight + 1,
        bodyHorizontal:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
        bodyVertical:
          document.documentElement.scrollHeight >
          document.documentElement.clientHeight + 1,
        clippedNodes: (() => {
          const visual = element.querySelector<HTMLElement>(".visual");
          if (!visual) return true;
          const visualRect = visual.getBoundingClientRect();
          return Array.from(
            element.querySelectorAll<HTMLElement>(".node")
          ).some(node => {
            const nodeRect = node.getBoundingClientRect();
            return (
              nodeRect.top < visualRect.top - 1 ||
              nodeRect.left < visualRect.left - 1 ||
              nodeRect.right > visualRect.right + 1 ||
              nodeRect.bottom > visualRect.bottom + 1
            );
          });
        })(),
      }));
      if (Object.values(overflow).some(Boolean)) {
        throw new Error(`${spec.id} overflow: ${JSON.stringify(overflow)}`);
      }
      await page.pdf({
        path: stagedPdf,
        format: "A4",
        preferCSSPageSize: true,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        tagged: true,
        outline: true,
      });
      await page.close();
      copyFileSync(stagedPdf, rawPdf);
      await execFileAsync(pdfPythonPath, [
        metadataScript,
        "--pdf",
        stagedPdf,
        "--title",
        `${handout.title} · ${handout.documentType === "PRAXISBLATT" ? "Praxisblatt" : "Orientierungsblatt"}`,
        "--description",
        handout.summary,
        "--metadata-date",
        metadataDate(handout.standLine),
      ]);
      const [{ stdout: info }, { stdout: rawText }, { stdout: processedText }] =
        await Promise.all([
          execFileAsync("pdfinfo", [stagedPdf]),
          execFileAsync("pdftotext", [rawPdf, "-"]),
          execFileAsync("pdftotext", [stagedPdf, "-"]),
        ]);
      if (!/^Pages:\s+1$/mu.test(info) || !/^Tagged:\s+yes$/mu.test(info)) {
        throw new Error(`${spec.id} is not a one-page tagged candidate`);
      }
      if (normalizeText(rawText) !== normalizeText(processedText)) {
        throw new Error(`${spec.id} metadata pass changed text extraction`);
      }
      for (const requiredText of [handout.title, handout.summary, "Entwurf"]) {
        if (
          !normalizeText(processedText).includes(normalizeText(requiredText))
        ) {
          throw new Error(`${spec.id} PDF misses text: ${requiredText}`);
        }
      }
      await execFileAsync("qpdf", ["--check", stagedPdf]);
      await execFileAsync("pdftoppm", [
        "-f",
        "1",
        "-singlefile",
        "-png",
        "-scale-to-x",
        "1600",
        "-scale-to-y",
        "-1",
        stagedPdf,
        pngBase,
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
        rawPdf,
        rawPngBase,
      ]);
      const [pixels, rawPixels] = await Promise.all([
        sharp(png).raw().toBuffer(),
        sharp(rawPng).raw().toBuffer(),
      ]);
      if (!pixels.equals(rawPixels)) {
        throw new Error(`${spec.id} metadata pass changed rendered pixels`);
      }
      await sharp(png)
        .resize(1600, 2263, { fit: "fill" })
        .webp({ quality: 92, effort: 6 })
        .toFile(stagedWebp);
      await sharp(png)
        .resize(600, 849, { fit: "fill" })
        .webp({ quality: 84, effort: 6 })
        .toFile(stagedThumbnail);

      const targetHtml = path.join(sourceRoot, `${spec.version}.html`);
      const targetPdf = path.join(outputRoot, `${spec.version}.pdf`);
      const targetWebp = path.join(outputRoot, `${spec.version}.webp`);
      const targetThumbnail = path.join(thumbnailRoot, `${spec.version}.webp`);
      atomicCopy(stagedHtml, targetHtml);
      atomicCopy(stagedPdf, targetPdf);
      atomicCopy(stagedWebp, targetWebp);
      atomicCopy(stagedThumbnail, targetThumbnail);

      entries.push({
        id: spec.id,
        version: spec.version,
        documentType: handout.documentType,
        visualKind: spec.visualKind,
        sourceHtml: path.relative(repoRoot, targetHtml),
        sourceHtmlSha256: sha256(targetHtml),
        pdf: {
          path: path.relative(repoRoot, targetPdf),
          bytes: statSync(targetPdf).size,
          sha256: sha256(targetPdf),
          pages: 1,
          taggedCandidate: true,
        },
        webp: {
          path: path.relative(repoRoot, targetWebp),
          bytes: statSync(targetWebp).size,
          sha256: sha256(targetWebp),
          width: 1600,
          height: 2263,
        },
        thumbnail: {
          path: path.relative(repoRoot, targetThumbnail),
          bytes: statSync(targetThumbnail).size,
          sha256: sha256(targetThumbnail),
          width: 600,
          height: 849,
        },
        sourceTextSha256: createHash("sha256")
          .update(JSON.stringify(handout))
          .digest("hex"),
      });
    }
  } finally {
    await browser.close();
    rmSync(temporaryRoot, { recursive: true, force: true });
  }

  const manifest = {
    schemaVersion: 1,
    package: "borderline-issue-615-visual-refresh",
    generatedAt: "2026-10-05",
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
      destination: path.relative(repoRoot, withheldRoot),
      publicAssetsWritten: false,
      editorialStatus: "draft-editorial-review-pending",
      pdf: "A4 portrait, one page, tagged export requested",
      xmpMetadata: "present",
      pdfUaClaim: false,
      matterhornReview: "pending",
      fullWebp: "1600 x 2263 px",
      thumbnailWebp: "600 x 849 px",
    },
    entries,
  };
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

await render();
