import fs from "node:fs/promises";
import path from "node:path";
import {
  getMaterialDownloadHref,
  materials,
} from "../../client/src/content/materialien.ts";
import { getHandoutTextVersionBySource } from "../../client/src/content/handoutTextMetas.ts";
import { SECURITY_HEADERS } from "../../shared/securityHeaders.ts";
import { BASE_URL, qaPath, writeJson } from "./a11y-shared.mjs";

const REPORT_NAME = "release-http-gates.json";
const MARKDOWN_NAME = "release-http-gates.md";
const IMAGE_PATH_RE = /\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i;
const MIN_PDF_BYTES = 1024;
const PAGE_CASES = ["/notfallkarte", "/notfallkarte/erstellen"];
const HEADER_CASES = [
  {
    id: "home",
    title: "Startseite",
    kind: "header",
    route: "/",
    expectedStatus: 200,
    contentTypeIncludes: "text/html",
    requiredHeaders: SECURITY_HEADERS,
  },
  {
    id: "index-html",
    title: "Index HTML",
    kind: "header",
    route: "/index.html",
    expectedStatus: 200,
    contentTypeIncludes: "text/html",
    requiredHeaders: SECURITY_HEADERS,
    cacheControlIncludes: ["public", "max-age=3600", "must-revalidate"],
  },
  {
    id: "soforthilfe",
    title: "Soforthilfe",
    kind: "header",
    route: "/soforthilfe",
    expectedStatus: 200,
    contentTypeIncludes: "text/html",
    requiredHeaders: SECURITY_HEADERS,
  },
  {
    id: "notfallkarte",
    title: "Notfallkarte",
    kind: "header",
    route: "/notfallkarte",
    expectedStatus: 200,
    contentTypeIncludes: "text/html",
    requiredHeaders: SECURITY_HEADERS,
  },
  {
    id: "not-found",
    title: "404 Seite",
    kind: "header",
    route: "/404",
    expectedStatus: 404,
    contentTypeIncludes: "text/html",
    requiredHeaders: SECURITY_HEADERS,
  },
  {
    id: "material-inline",
    title: "Material Inline Download",
    kind: "header",
    route: "/api/material-download/notfallplan-krise?disposition=inline",
    expectedStatus: 200,
    contentTypeIncludes: "application/pdf",
    contentDispositionIncludes: "inline;",
    requiredHeaders: SECURITY_HEADERS,
    cacheControlIncludes: ["public", "must-revalidate"],
  },
  {
    id: "static-pdf",
    title: "Statisches PDF",
    kind: "header",
    route: "/notfallplan-krise-v03.pdf",
    expectedStatus: 200,
    contentTypeIncludes: "application/pdf",
    requiredHeaders: SECURITY_HEADERS,
  },
];

function nowIso() {
  return new Date().toISOString();
}

function normalizeError(error) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function firstMatch(regex, text, groupIndex = 1) {
  const match = text.match(regex);
  return match?.[groupIndex] ?? null;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeRoutePath(assetPath) {
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return new URL(assetPath).pathname;
  }

  if (assetPath.startsWith("/")) {
    return assetPath;
  }

  return `/${assetPath.replace(/^\.?\//, "")}`;
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

function inferContentTypePattern(route) {
  if (/\.css(?:[?#].*)?$/i.test(route)) {
    return /text\/css/i;
  }

  if (/\.js(?:[?#].*)?$/i.test(route)) {
    return /(javascript|ecmascript)/i;
  }

  if (/\.woff2(?:[?#].*)?$/i.test(route)) {
    return /(font\/woff2|application\/octet-stream)/i;
  }

  return null;
}

async function discoverRuntimeHeaderCases() {
  const homeResponse = await fetch(new URL("/", BASE_URL).toString(), {
    redirect: "follow",
  });

  if (!homeResponse.ok) {
    throw new Error(
      `Asset-Erkennung fehlgeschlagen: Startseite liefert ${homeResponse.status}`
    );
  }

  const html = await homeResponse.text();
  const assetRoutes = [
    ...new Set(
      [...html.matchAll(/(?:src|href)=["'](\/assets\/[^"']+)["']/g)].map(
        match => match[1]
      )
    ),
  ];

  const assetRoute =
    assetRoutes.find(route => /\.(?:css|js)(?:[?#].*)?$/i.test(route)) ??
    assetRoutes[0] ??
    null;

  if (!assetRoute) {
    throw new Error("Keine /assets/* Route in der Startseite gefunden.");
  }

  let fontRoute =
    assetRoutes.find(route => /\.woff2(?:[?#].*)?$/i.test(route)) ?? null;

  if (!fontRoute) {
    const stylesheetRoutes = assetRoutes.filter(route =>
      /\.css(?:[?#].*)?$/i.test(route)
    );

    for (const stylesheetRoute of stylesheetRoutes) {
      const stylesheetResponse = await fetch(
        new URL(stylesheetRoute, BASE_URL).toString(),
        { redirect: "follow" }
      );

      if (!stylesheetResponse.ok) {
        continue;
      }

      const stylesheet = await stylesheetResponse.text();
      const discoveredFontRoute = firstMatch(
        new RegExp(`url\\((["']?)([^)"']+\\.woff2(?:\\?[^)"']*)?)\\1\\)`, "i"),
        stylesheet,
        2
      );

      if (discoveredFontRoute) {
        fontRoute = normalizeRoutePath(discoveredFontRoute);
        break;
      }
    }
  }

  const cases = [
    {
      id: "runtime-asset",
      title: "Gebautes Asset",
      kind: "header",
      route: assetRoute,
      expectedStatus: 200,
      requiredHeaders: SECURITY_HEADERS,
      cacheControlIncludes: ["public", "max-age=31536000", "immutable"],
      contentTypePattern: inferContentTypePattern(assetRoute),
    },
  ];

  if (fontRoute) {
    cases.push({
      id: "runtime-font",
      title: "Gebauter Font",
      kind: "header",
      route: fontRoute,
      expectedStatus: 200,
      requiredHeaders: SECURITY_HEADERS,
      cacheControlIncludes: ["public", "max-age=31536000", "immutable"],
      contentTypePattern: inferContentTypePattern(fontRoute),
    });
  }

  return cases;
}

async function checkHeaderCase(item) {
  const url = new URL(item.route, BASE_URL).toString();
  const startedAt = nowIso();

  function headerMatchesExpected(header, actualValue, expectedValue) {
    if (!actualValue) {
      return false;
    }

    if (header === "Strict-Transport-Security") {
      return actualValue.includes(expectedValue);
    }

    return actualValue === expectedValue;
  }

  try {
    const response = await fetch(url, { redirect: "follow" });
    const contentType = response.headers.get("content-type") ?? "";
    const cacheControl = response.headers.get("cache-control") ?? "";
    const contentDisposition =
      response.headers.get("content-disposition") ?? "";
    const problems = [];

    if (response.status !== item.expectedStatus) {
      problems.push(
        `erwartet HTTP ${item.expectedStatus}, erhalten ${response.status}`
      );
    }

    if (
      item.contentTypeIncludes &&
      !contentType
        .toLowerCase()
        .includes(item.contentTypeIncludes.toLowerCase())
    ) {
      problems.push(
        `erwartet Content-Type mit ${item.contentTypeIncludes}, erhalten ${contentType || "ohne content-type"}`
      );
    }

    if (item.contentTypePattern && !item.contentTypePattern.test(contentType)) {
      problems.push(
        `erwartet Content-Type passend zu ${item.contentTypePattern}, erhalten ${contentType || "ohne content-type"}`
      );
    }

    if (
      item.contentDispositionIncludes &&
      !contentDisposition.includes(item.contentDispositionIncludes)
    ) {
      problems.push(
        `erwartet Content-Disposition mit ${item.contentDispositionIncludes}, erhalten ${contentDisposition || "ohne content-disposition"}`
      );
    }

    for (const token of item.cacheControlIncludes ?? []) {
      if (!cacheControl.toLowerCase().includes(token.toLowerCase())) {
        problems.push(
          `erwartet Cache-Control mit ${token}, erhalten ${cacheControl || "ohne cache-control"}`
        );
      }
    }

    for (const [header, expectedValue] of Object.entries(
      item.requiredHeaders ?? {}
    )) {
      const actualValue = response.headers.get(header);
      if (!headerMatchesExpected(header, actualValue, expectedValue)) {
        problems.push(
          `Header ${header} erwartet ${expectedValue}, erhalten ${actualValue || "ohne header"}`
        );
      }
    }

    return {
      id: item.id,
      title: item.title,
      kind: item.kind,
      route: item.route,
      url,
      status: problems.length === 0 ? "passed" : "failed",
      httpStatus: response.status,
      contentType,
      cacheControl,
      contentDisposition: contentDisposition || null,
      startedAt,
      finishedAt: nowIso(),
      finalUrl: response.url,
      ...(problems.length === 0 ? {} : { message: problems.join("; ") }),
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

  let runtimeHeaderCases = [];
  try {
    runtimeHeaderCases = await discoverRuntimeHeaderCases();
  } catch (error) {
    results.push({
      id: "runtime-discovery",
      title: "Runtime Asset Discovery",
      kind: "header",
      route: "/",
      url: new URL("/", BASE_URL).toString(),
      status: "failed",
      startedAt: nowIso(),
      finishedAt: nowIso(),
      message: normalizeError(error),
    });
  }

  for (const item of [...HEADER_CASES, ...runtimeHeaderCases]) {
    results.push(await checkHeaderCase(item));
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
      headers: results.filter(result => result.kind === "header").length,
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
