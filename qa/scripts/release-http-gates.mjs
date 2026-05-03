import fs from "node:fs/promises";
import path from "node:path";
import { BASE_URL, qaPath, writeJson } from "./a11y-shared.mjs";

const REPORT_NAME = "release-http-gates.json";
const MARKDOWN_NAME = "release-http-gates.md";

const PDF_CASES = [
  "/api/material-download/notfallplan-krise?disposition=inline",
  "/api/material-download/leuchtturm",
  "/api/material-download/grenzen-spickzettel",
];

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

async function checkResponse(route, expectedContentType) {
  const url = new URL(route, BASE_URL).toString();
  const startedAt = nowIso();

  try {
    const response = await fetch(url, { redirect: "follow" });
    const contentType = response.headers.get("content-type") ?? "";

    const ok =
      response.ok && contentType.toLowerCase().includes(expectedContentType);

    return {
      route,
      url,
      status: ok ? "passed" : "failed",
      httpStatus: response.status,
      contentType,
      expectedContentType,
      startedAt,
      finishedAt: nowIso(),
      finalUrl: response.url,
      ...(ok
        ? {}
        : {
            message: `erwartet ${expectedContentType}, erhalten ${response.status} ${contentType || "ohne content-type"}`,
          }),
    };
  } catch (error) {
    return {
      route,
      url,
      status: "failed",
      expectedContentType,
      startedAt,
      finishedAt: nowIso(),
      message: normalizeError(error),
    };
  }
}

function markdownReport(report) {
  const lines = [
    "## Letzter Lauf",
    "",
    `- Datum: ${new Date().toISOString().slice(0, 10)}`,
    `- Basis-URL: ${report.baseUrl}`,
    "",
    "| Route | Ergebnis | HTTP | Content-Type |",
    "| --- | --- | --- | --- |",
  ];

  for (const result of report.results) {
    lines.push(
      `| ${result.route} | ${result.status} | ${result.httpStatus ?? "-"} | ${(result.contentType ?? "-").replace(/\|/g, "\\|")} |`
    );
  }

  lines.push("", "### Befunde", "");

  const failures = report.results.filter(result => result.status === "failed");
  if (failures.length === 0) {
    lines.push("- keine Blocker in den HTTP-Release-Gates");
  } else {
    for (const failure of failures) {
      lines.push(`- ${failure.route}: ${failure.message}`);
    }
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const write = process.argv.includes("--write");
  const results = [];

  for (const route of PDF_CASES) {
    results.push(await checkResponse(route, "application/pdf"));
  }

  for (const route of PAGE_CASES) {
    results.push(await checkResponse(route, "text/html"));
  }

  const report = {
    createdAt: nowIso(),
    baseUrl: BASE_URL,
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
