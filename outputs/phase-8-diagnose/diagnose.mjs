import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BASE_URL = "https://borderline-angehoerige.netlify.app";
const OUT_DIR = "/home/ubuntu/borderline-angehoerige/outputs/phase-8-diagnose";

const PAGES = [
  { slug: "home", path: "/" },
  { slug: "verstehen", path: "/verstehen" },
  { slug: "kommunizieren", path: "/kommunizieren" },
  { slug: "grenzen", path: "/grenzen" },
  { slug: "wegweiser", path: "/wegweiser" },
  { slug: "soforthilfe", path: "/soforthilfe" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 375, height: 812 },
];

async function getLayoutData(page) {
  return await page.evaluate(() => {
    // Find EditorialLayout wrapper or main
    const main = document.querySelector("main");
    const editorialLayout =
      document.querySelector('[class*="editorial"]') ||
      document.querySelector('[class*="max-w"]') ||
      main;

    // Find the first content wrapper inside main
    const firstChild = main ? main.firstElementChild : null;
    const secondChild = firstChild ? firstChild.firstElementChild : null;

    function getStyles(el) {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tagName: el.tagName,
        className: el.className.substring(0, 200),
        paddingLeft: cs.paddingLeft,
        paddingRight: cs.paddingRight,
        maxWidth: cs.maxWidth,
        marginLeft: cs.marginLeft,
        marginRight: cs.marginRight,
        width: Math.round(rect.width) + "px",
        left: Math.round(rect.left) + "px",
        right: Math.round(rect.right) + "px",
      };
    }

    // DOM structure from main down 4 levels
    function domTree(el, depth = 0) {
      if (!el || depth > 4) return "";
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const indent = "  ".repeat(depth);
      const tag = el.tagName.toLowerCase();
      const cls = el.className
        ? ` class="${el.className.substring(0, 120)}"`
        : "";
      const dims = ` [${Math.round(rect.width)}×${Math.round(rect.height)} @ left:${Math.round(rect.left)}]`;
      const bg =
        cs.backgroundColor !== "rgba(0, 0, 0, 0)"
          ? ` bg:${cs.backgroundColor}`
          : "";
      const shadow = cs.boxShadow !== "none" ? " shadow:YES" : "";
      const br = cs.borderRadius !== "0px" ? ` br:${cs.borderRadius}` : "";
      let result = `${indent}<${tag}${cls}>${dims}${bg}${shadow}${br}\n`;
      if (depth < 4 && el.children.length > 0) {
        // Only show first 3 children at each level
        const children = Array.from(el.children).slice(0, 3);
        for (const child of children) {
          result += domTree(child, depth + 1);
        }
        if (el.children.length > 3) {
          result += `${indent}  ... (${el.children.length - 3} more children)\n`;
        }
      }
      return result;
    }

    // Check for specific anomalies
    const anomalies = [];

    // 1. TableOfContents sidebar
    const toc = document.querySelector(
      '[class*="toc"], [class*="TableOfContents"], aside'
    );
    if (toc) {
      const tocRect = toc.getBoundingClientRect();
      anomalies.push(
        `TOC/Sidebar present: ${toc.tagName} class="${toc.className.substring(0, 100)}" width=${Math.round(tocRect.width)}px`
      );
    }

    // 2. Cards with backgrounds/shadows
    const cards = document.querySelectorAll(
      '[class*="card"], [class*="Card"], [class*="bg-sage"], [class*="bg-teal"], [class*="shadow"]'
    );
    const cardInfo = [];
    cards.forEach((card, i) => {
      if (i > 10) return;
      const cs = window.getComputedStyle(card);
      const hasBg =
        cs.backgroundColor !== "rgba(0, 0, 0, 0)" &&
        cs.backgroundColor !== "rgb(255, 255, 255)";
      const hasShadow = cs.boxShadow !== "none";
      if (hasBg || hasShadow) {
        cardInfo.push(
          `  - ${card.tagName} class="${card.className.substring(0, 80)}" bg=${cs.backgroundColor} shadow=${hasShadow}`
        );
      }
    });
    if (cardInfo.length > 0) {
      anomalies.push(
        "Card-Wrapper mit Hintergrund/Schatten:\n" + cardInfo.join("\n")
      );
    }

    // 3. Empty whitespace blocks > 200px
    const allDivs = document.querySelectorAll("div, section");
    const emptyBlocks = [];
    allDivs.forEach((div, i) => {
      if (i > 200) return;
      const rect = div.getBoundingClientRect();
      if (
        rect.height > 200 &&
        div.textContent.trim().length < 10 &&
        div.children.length === 0
      ) {
        emptyBlocks.push(
          `  - ${div.tagName} class="${div.className.substring(0, 80)}" h=${Math.round(rect.height)}px`
        );
      }
    });
    if (emptyBlocks.length > 0) {
      anomalies.push(
        "Leere Whitespace-Blöcke (>200px):\n" + emptyBlocks.join("\n")
      );
    }

    // 4. Content alignment check
    if (main) {
      const mainRect = main.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const leftMargin = Math.round(mainRect.left);
      const rightMargin = Math.round(viewportWidth - mainRect.right);
      const asymmetry = Math.abs(leftMargin - rightMargin);
      if (asymmetry > 20) {
        anomalies.push(
          `Layout-Asymmetrie: left=${leftMargin}px right=${rightMargin}px (diff=${asymmetry}px)`
        );
      }
    }

    // 5. Sage/teal backgrounds (old token remnants)
    const sageElements = document.querySelectorAll(
      '[class*="sage"], [class*="teal-wash"], [class*="bg-teal"]'
    );
    if (sageElements.length > 0) {
      const sageInfo = Array.from(sageElements)
        .slice(0, 5)
        .map(el => `  - ${el.tagName} class="${el.className.substring(0, 80)}"`)
        .join("\n");
      anomalies.push(
        `Sage/Teal-Token-Reste (${sageElements.length} Elemente):\n${sageInfo}`
      );
    }

    return {
      mainStyles: getStyles(main),
      firstChildStyles: getStyles(firstChild),
      secondChildStyles: getStyles(secondChild),
      domTree: domTree(main),
      anomalies,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      pageHeight: document.body.scrollHeight,
    };
  });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = {};

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();

    for (const pg of PAGES) {
      const key = `${pg.slug}-${viewport.name}`;
      console.log(`Prüfe: ${key} ...`);

      try {
        await page.goto(BASE_URL + pg.path, {
          waitUntil: "networkidle",
          timeout: 30000,
        });
        await page.waitForTimeout(2000); // React hydration

        // Full-page screenshot
        const screenshotPath = join(OUT_DIR, `${key}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`  Screenshot: ${screenshotPath}`);

        const data = await getLayoutData(page);
        data.screenshotPath = screenshotPath;
        results[key] = data;
        console.log(`  Anomalien: ${data.anomalies.length}`);
      } catch (err) {
        console.error(`  FEHLER bei ${key}: ${err.message}`);
        results[key] = { error: err.message };
      }
    }

    await context.close();
  }

  await browser.close();

  // Save raw results as JSON
  writeFileSync(
    join(OUT_DIR, "raw-results.json"),
    JSON.stringify(results, null, 2)
  );
  console.log("\nFertig. Rohdaten gespeichert.");
  return results;
}

run().catch(console.error);
