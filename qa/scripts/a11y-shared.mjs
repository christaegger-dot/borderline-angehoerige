import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const QA_DIR = path.resolve(__dirname, "..");
export const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:4173";

export const ROUTES = ["/", "/soforthilfe", "/materialien", "/notfallkarte"];
export const LIGHTHOUSE_ROUTES = ["/", "/soforthilfe", "/materialien"];

export const VIEWPORTS = [
  {
    name: "mobile",
    width: 375,
    height: 812,
    isMobile: true,
    hasTouch: true,
  },
  {
    name: "tablet",
    width: 768,
    height: 1024,
    isMobile: false,
    hasTouch: true,
  },
  {
    name: "desktop",
    width: 1280,
    height: 900,
    isMobile: false,
    hasTouch: false,
  },
  {
    name: "wide",
    width: 1920,
    height: 1080,
    isMobile: false,
    hasTouch: false,
  },
];

export const CLICK_VIEWPORTS = [VIEWPORTS[0], VIEWPORTS[2]];

export function qaPath(name) {
  return path.resolve(QA_DIR, name);
}

export async function writeJson(name, data) {
  await fs.writeFile(qaPath(name), `${JSON.stringify(data, null, 2)}\n`);
}

export function routeUrl(route) {
  return new URL(route, BASE_URL).toString();
}

function chromeExecutablePath() {
  if (process.env.PLAYWRIGHT_EXECUTABLE_PATH) {
    return process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  }

  if (process.platform === "darwin") {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }

  return undefined;
}

export async function launchBrowser() {
  const executablePath = chromeExecutablePath();
  return chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
}

export async function openRoute(browser, route, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.isMobile,
    hasTouch: viewport.hasTouch,
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();
  await page.goto(routeUrl(route), {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });
  await page.waitForSelector("body", { timeout: 15_000 });
  await page.waitForTimeout(1_500);

  return { context, page };
}

export function interactiveSelector() {
  return [
    "a[href]",
    "button",
    "input",
    "textarea",
    "select",
    "[role='button']",
    "[role='link']",
  ].join(",");
}
