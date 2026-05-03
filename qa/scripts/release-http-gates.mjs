import fs from "node:fs/promises";
import path from "node:path";
import {
  getMaterialDownloadHref,
  materials,
} from "../../client/src/content/materialien.ts";
import { getHandoutTextVersionBySource } from "../../client/src/content/handoutTextMetas.ts";
import { BASE_URL, qaPath, writeJson } from "./a11y-shared.mjs";

const REPORT_NAME = "release-http-gates.json";
const MARKDOWN_NAME = "release-http-gates.md";
const IMAGE_PATH_RE = /\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i;
const MIN_PDF_BYTES = 1024;

const PAGE_CASES = ["/notfallkarte", "/notfallkarte/erstellen"];

function nowIso() {
  return new Date().toISOString();
}

function normalizeError(error) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function looksLikeImagePath(url) {
  return IMAGE_PATH_RE.test(url);
}

function materialPdfCases() {
  return materials
    .map(item => {
      const sourceUrl = item.pdfUrl ?? item.downloadUrl;
      const downloadHref = getMaterialDownloadHref(item);

      if (!sourceUrl || !downloadHref) {
        return null;
      }

      return {
        id: item.id,
        title: item.title,
        kind: "pdf",
        route: downloadHref,
        sourceUrl,
        expectsTextVersion: !item.isHtml,
      };
    })
    .filter(Boolean);
}

function materialPreviewCases() {
  return materials
    .map(item => {
      const previewHref =
        item.previewUrl ?? (looksLikeImagePath(item.url) ? item.url : null);

      if (!previewHref) {
        return null;
      }

      return {
        id: item.id,
        title: item.title,
        kind: "preview",
        route: previewHref,
      };
    })
    .filter(Boolean);
}

function textVersionCases() {
  return materials
    .map(item => {
      if (item.isHtml) {
        return {
          id: item.id,
          title: item.title,
          kind: "textversion",
          route: null,
          expectsTextVersion: false,
        };
      }

      const sourceUrl = item.pdfUrl ?? item.downloadUrl;
      const meta = getHandoutTextVersionBySource(sourceUrl);

      return {
        id: item.id,
        title: item.title,
        kind: "textversion",
        route: meta?.path ?? null,
        expectsTextVersion: true,
      };
    })
    .filter(Boolean);
}

async function fetchBuffer(url) {
  const response = await fetch(url, { redirect: "follow" });
  const contentType = response.headers.get("content-type") ?? "";
  const buffer = new Uint8Array(await response.arrayBuffer());

  return {
    response,
    contentType,
    buffer,
  };
}

async function checkPdfRoute(item) {
  const url = new URL(item.route, BASE_URL).toString();
  const startedAt = nowIso();

  try {
    const { response, contentType, buffer } = await fetchBuffer(url);
    const signature = new TextDecoder("ascii").decode(buffer.slice(0, 5));
    const ok =
      response.ok &&
      contentType.toLowerCase().includes("application/pdf") &&
      buffer.byteLength >= MIN_PDF_BYTES &&
      signature === "%PDF-";

    return {
      id: item.id,
      title: item.title,
      kind: item.kind,
      route: item.route,
      url,
      status: ok ? "passed" : "failed",
      httpStatus: response.status,
      contentType,
      byteLength: buffer.byteLength,
      pdfSignature: signature,
      startedAt,
      finishedAt: nowIso(),
      finalUrl: response.url,
      ...(ok
        ? {}
        : {
            message:
              `erwartet PDF 200 mit plausibler Groesse und %PDF- Signatur, erhalten ` +
              `${response.status} ${contentType || "ohne content-type"} ${buffer.byteLength}B ${signature || "ohne-signatur"}`,
          }),
    };
  } catch (error) {
    return {
      id: item.id,
      title: item.title,
      kind: item.kind,
      route: item.route,
      url,
      status: "failed",
      startedAt,
      finishedAt: nowIso(),
      message: normalizeError(error),
    };
  }
}

async function checkHtmlRoute(route, kind, id = route, title = route) {
  const url = new URL(route, BASE_URL).toString();
  const startedAt = nowIso();

  try {
    const response = await fetch(url, { redirect: "follow" });
    const contentType = response.headers.get("content-type") ?? "";
    const ok = response.ok && contentType.toLowerCase().includes("text/html");

    return {
      id,
      title,
      kind,
      route,
      url,
      status: ok ? "passed" : "failed",
      httpStatus: response.status,
      contentType,
      startedAt,
      finishedAt: nowIso(),
      finalUrl: response.url,
      ...(ok
        ? {}
        : {
            message: `erwartet HTML 200, erhalten ${response.status} ${contentType || "ohne content-type"}`,
          }),
    };
  } catch (error) {
    return {
      id,
      title,
      kind,
      route,
      url,
      status: "failed",
      startedAt,
      finishedAt: nowIso(),
      message: normalizeError(error),
    };
  }
}

async function checkPreviewRoute(item) {
  const url = new URL(item.route, BASE_URL).toString();
  const startedAt = nowIso();

  try {
    const response = await fetch(url, { redirect: "follow" });
    const contentType = response.headers.get("content-type") ?? "";
    const ok = response.ok && contentType.toLowerCase().startsWith("image/");

    return {
      id: item.id,
      title: item.title,
      kind: item.kind,
      route: item.route,
      url,
      status: ok ? "passed" : "failed",
      httpStatus: response.status,
      contentType,
      startedAt,
      finishedAt: nowIso(),
      finalUrl: response.url,
      ...(ok
        ? {}
        : {
            message: `erwartet Bild-Asset 200, erhalten ${response.status} ${contentType || "ohne content-type"}`,
          }),
    };
  } catch (error) {
    return {
      id: item.id,
      title: item.title,
      kind: item.kind,
      route: item.route,
      url,
      status: "failed",
      startedAt,
      finishedAt: nowIso(),
      message: normalizeError(error),
    };
  }
}

async function checkTextVersion(item) {
  const startedAt = nowIso();

  if (!item.expectsTextVersion) {
    return {
      id: item.id,
      title: item.title,
      kind: item.kind,
      route: null,
      status: "passed",
      startedAt,
      finishedAt: nowIso(),
      note: "HTML-Notfallkarte erwartet keine Textversion",
    };
  }

  if (!item.route) {
    return {
      id: item.id,
      title: item.title,
      kind: item.kind,
      route: null,
      status: "failed",
      startedAt,
      finishedAt: nowIso(),
      message: "erwartete Textversion fehlt in der Registry",
    };
  }

  return checkHtmlRoute(item.route, item.kind, item.id, item.title);
}

function markdownReport(report) {
  const lines = [
    "## Letzter Lauf",
    "",
    `- Datum: ${new Date().toISOString().slice(0, 10)}`,
    `- Basis-URL: ${report.baseUrl}`,
    "",
    "| Typ | ID | Ergebnis | HTTP | Content-Type |",
    "| --- | --- | --- | --- | --- |",
  ];

  for (const result of report.results) {
    lines.push(
      `| ${result.kind} | ${result.id} | ${result.status} | ${result.httpStatus ?? "-"} | ${(result.contentType ?? "-").replace(/\|/g, "\\|")} |`
    );
  }

  lines.push("", "### Befunde", "");

  const failures = report.results.filter(result => result.status === "failed");
  if (failures.length === 0) {
    lines.push("- keine Blocker in den HTTP-Release-Gates");
  } else {
    for (const failure of failures) {
      lines.push(`- ${failure.kind} ${failure.id}: ${failure.message}`);
    }
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const write = process.argv.includes("--write");
  const results = [];

  for (const item of materialPdfCases()) {
    results.push(await checkPdfRoute(item));
  }

  for (const item of materialPreviewCases()) {
    results.push(await checkPreviewRoute(item));
  }

  for (const item of textVersionCases()) {
    results.push(await checkTextVersion(item));
  }

  for (const route of PAGE_CASES) {
    results.push(await checkHtmlRoute(route, "page"));
  }

  const report = {
    createdAt: nowIso(),
    baseUrl: BASE_URL,
    counts: {
      pdfs: results.filter(result => result.kind === "pdf").length,
      previews: results.filter(result => result.kind === "preview").length,
      textversions: results.filter(result => result.kind === "textversion")
        .length,
      pages: results.filter(result => result.kind === "page").length,
    },
    results,
    status: results.every(result => result.status === "passed")
      ? "passed"
      : "failed",
  };

  if (write) {
    await writeJson(REPORT_NAME, report);
    await fs.writeFile(
      path.resolve(qaPath(MARKDOWN_NAME)),
      markdownReport(report),
      "utf8"
    );
  }

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);

  if (report.status !== "passed") {
    process.exitCode = 1;
  }
}

await main();
