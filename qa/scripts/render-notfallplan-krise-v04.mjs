import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const sourcePath = path.join(
  repoRoot,
  "qa/handout-render-sources/notfallplan-krise-v04.html"
);
const outputDir = path.join(
  repoRoot,
  "qa/withheld-handouts/notfallplan-krise-v04-draft"
);
const pdfPath = path.join(outputDir, "notfallplan-krise-v04.pdf");
const pngPath = path.join(outputDir, "notfallplan-krise-v04-preview.png");
const webpPath = path.join(outputDir, "notfallplan-krise-v04-preview.webp");

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: {
      width: 1240,
      height: 1754,
    },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.goto(`file://${sourcePath}`, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
  });

  await page.emulateMedia({ media: "screen" });
  const preview = await page.locator("#page-1").screenshot({
    omitBackground: false,
  });

  await sharp(preview).resize({ width: 1240 }).png().toFile(pngPath);

  await sharp(preview)
    .resize({ width: 1240 })
    .webp({ quality: 92, effort: 6 })
    .toFile(webpPath);
} finally {
  await browser.close();
}

console.log(`Wrote ${path.relative(repoRoot, pdfPath)}`);
console.log(`Wrote ${path.relative(repoRoot, pngPath)}`);
console.log(`Wrote ${path.relative(repoRoot, webpPath)}`);
