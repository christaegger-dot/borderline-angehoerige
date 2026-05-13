#!/usr/bin/env node
// Lighthouse-Performance-Audit fuer die Hauptrouten.
//
// Voraussetzung: lokaler Preview-Build laeuft auf BASE_URL.
//   pnpm build && pnpm preview &
//   pnpm audit:lighthouse
//
// Oder gegen Live: AUDIT_BASE_URL=https://borderline-angehoerige.netlify.app pnpm audit:lighthouse
//
// Output: qa/output/lighthouse-<slug>-mobile.json + Summary-Tabelle auf stdout.

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "playwright";
import { BASE_URL, LIGHTHOUSE_ROUTES, QA_DIR } from "./a11y-shared.mjs";

// Lighthouse braucht eine Chrome-Binary. Falls CHROME_PATH gesetzt: nutzen.
// Sonst Playwrights Chromium nehmen (existiert im CI/dev-Setup ohnehin).
if (!process.env.CHROME_PATH) {
  process.env.CHROME_PATH = chromium.executablePath();
}

const OUTPUT_DIR = path.join(QA_DIR, "output");

const LIGHTHOUSE_OPTIONS = {
  output: "json",
  onlyCategories: ["performance"],
  formFactor: "mobile",
  screenEmulation: {
    mobile: true,
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    disabled: false,
  },
  throttling: {
    rttMs: 150,
    throughputKbps: 1638.4,
    cpuSlowdownMultiplier: 4,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  },
};

function routeSlug(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
}

function formatMs(value) {
  return value == null ? "—" : `${Math.round(value)} ms`;
}

await mkdir(OUTPUT_DIR, { recursive: true });

const chrome = await launch({
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});

const results = [];
try {
  for (const route of LIGHTHOUSE_ROUTES) {
    const url = new URL(route, BASE_URL).toString();
    process.stdout.write(`Lighthouse ${url} ... `);

    const runner = await lighthouse(url, {
      ...LIGHTHOUSE_OPTIONS,
      port: chrome.port,
    });

    const lhr = runner.lhr;
    const score = lhr.categories.performance.score;
    const audits = lhr.audits;
    const summary = {
      route,
      url,
      score: score == null ? null : Math.round(score * 100),
      lcp: audits["largest-contentful-paint"]?.numericValue ?? null,
      fcp: audits["first-contentful-paint"]?.numericValue ?? null,
      tbt: audits["total-blocking-time"]?.numericValue ?? null,
      cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
      tti: audits["interactive"]?.numericValue ?? null,
    };
    results.push(summary);

    const slug = routeSlug(route);
    await writeFile(
      path.join(OUTPUT_DIR, `lighthouse-${slug}-mobile.json`),
      runner.report,
    );
    console.log(`${summary.score ?? "??"} (LCP ${formatMs(summary.lcp)})`);
  }
} finally {
  await chrome.kill();
}

await writeFile(
  path.join(OUTPUT_DIR, "lighthouse-summary.json"),
  JSON.stringify({ baseUrl: BASE_URL, generatedAt: new Date().toISOString(), results }, null, 2),
);

console.log("");
console.log("Route                       Score   LCP        FCP        TBT      CLS");
console.log("------------------------    -----   --------   --------   ------   -----");
for (const r of results) {
  const label = r.route.padEnd(24);
  const score = String(r.score ?? "??").padStart(5);
  const lcp = formatMs(r.lcp).padStart(8);
  const fcp = formatMs(r.fcp).padStart(8);
  const tbt = formatMs(r.tbt).padStart(6);
  const cls = (r.cls == null ? "—" : r.cls.toFixed(3)).padStart(5);
  console.log(`${label}    ${score}   ${lcp}   ${fcp}   ${tbt}   ${cls}`);
}
console.log("");
console.log(`Reports: ${OUTPUT_DIR}/`);
