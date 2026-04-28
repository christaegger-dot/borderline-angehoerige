import { chromium } from "playwright";
import { writeFileSync } from "fs";
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

function safeClass(el) {
  if (!el) return "";
  const cn = el.className;
  if (typeof cn === "string") return cn.substring(0, 150);
  if (cn && typeof cn.baseVal === "string") return cn.baseVal.substring(0, 150); // SVGAnimatedString
  return String(cn).substring(0, 150);
}

async function getLayoutData(page) {
  return await page.evaluate(
    safeClassStr => {
      // eslint-disable-next-line no-new-func
      const safeClass = new Function("el", safeClassStr);

      const main = document.querySelector("main");
      const firstChild = main ? main.firstElementChild : null;
      const secondChild = firstChild ? firstChild.firstElementChild : null;

      function getStyles(el) {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          tagName: el.tagName,
          className: safeClass(el),
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

      function domTree(el, depth) {
        if (!el || depth > 4) return "";
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const indent = "  ".repeat(depth);
        const tag = el.tagName.toLowerCase();
        const cls = safeClass(el) ? ` class="${safeClass(el)}"` : "";
        const dims = ` [${Math.round(rect.width)}×${Math.round(rect.height)} @ left:${Math.round(rect.left)}]`;
        const bg =
          cs.backgroundColor !== "rgba(0, 0, 0, 0)"
            ? ` bg:${cs.backgroundColor}`
            : "";
        const shadow = cs.boxShadow !== "none" ? " shadow:YES" : "";
        const br = cs.borderRadius !== "0px" ? ` br:${cs.borderRadius}` : "";
        let result = `${indent}<${tag}${cls}>${dims}${bg}${shadow}${br}\n`;
        if (depth < 4 && el.children.length > 0) {
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

      const anomalies = [];

      // 1. Sidebar/TOC
      const toc =
        document.querySelector("aside") ||
        Array.from(document.querySelectorAll("nav")).find(n => {
          const rect = n.getBoundingClientRect();
          return rect.width < 300 && rect.height > 200 && rect.left < 250;
        });
      if (toc) {
        const tocRect = toc.getBoundingClientRect();
        anomalies.push(
          `TOC/Sidebar: ${toc.tagName} class="${safeClass(toc)}" w=${Math.round(tocRect.width)}px left=${Math.round(tocRect.left)}px`
        );
      }

      // 2. Cards with backgrounds/shadows
      const allElements = document.querySelectorAll("div, section, article");
      const cardInfo = [];
      let cardCount = 0;
      allElements.forEach(el => {
        if (cardCount >= 8) return;
        const cs = window.getComputedStyle(el);
        const hasBg =
          cs.backgroundColor !== "rgba(0, 0, 0, 0)" &&
          cs.backgroundColor !== "rgb(255, 255, 255)" &&
          cs.backgroundColor !== "rgb(250, 247, 240)"; // cream/base
        const hasShadow = cs.boxShadow !== "none";
        const hasBorderRadius = parseFloat(cs.borderRadius) > 4;
        if ((hasBg || hasShadow) && hasBorderRadius) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 100 && rect.height > 50) {
            cardInfo.push(
              `  - ${el.tagName} class="${safeClass(el).substring(0, 80)}" bg=${cs.backgroundColor} shadow=${hasShadow} br=${cs.borderRadius}`
            );
            cardCount++;
          }
        }
      });
      if (cardInfo.length > 0) {
        anomalies.push(
          "Card-Wrapper mit Hintergrund/Schatten/BorderRadius:\n" +
            cardInfo.join("\n")
        );
      }

      // 3. Empty whitespace blocks > 200px
      const emptyBlocks = [];
      allElements.forEach((div, i) => {
        if (i > 300) return;
        const rect = div.getBoundingClientRect();
        if (
          rect.height > 200 &&
          div.textContent.trim().length < 5 &&
          div.children.length === 0
        ) {
          emptyBlocks.push(
            `  - ${div.tagName} class="${safeClass(div).substring(0, 80)}" h=${Math.round(rect.height)}px`
          );
        }
      });
      if (emptyBlocks.length > 0) {
        anomalies.push(
          "Leere Whitespace-Blöcke (>200px):\n" + emptyBlocks.join("\n")
        );
      }

      // 4. Content alignment
      if (main) {
        const mainRect = main.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const leftMargin = Math.round(mainRect.left);
        const rightMargin = Math.round(viewportWidth - mainRect.right);
        const asymmetry = Math.abs(leftMargin - rightMargin);
        if (asymmetry > 30) {
          anomalies.push(
            `Layout-Asymmetrie: left=${leftMargin}px right=${rightMargin}px (diff=${asymmetry}px)`
          );
        } else {
          anomalies.push(
            `Layout OK: left=${leftMargin}px right=${rightMargin}px (diff=${asymmetry}px)`
          );
        }
      }

      // 5. Sage/teal backgrounds
      const sageElements = Array.from(document.querySelectorAll("*"))
        .filter(el => {
          const cls = safeClass(el);
          return (
            cls.includes("sage") ||
            cls.includes("teal-wash") ||
            cls.includes("bg-teal")
          );
        })
        .slice(0, 5);
      if (sageElements.length > 0) {
        const sageInfo = sageElements
          .map(
            el => `  - ${el.tagName} class="${safeClass(el).substring(0, 80)}"`
          )
          .join("\n");
        anomalies.push(
          `Sage/Teal-Token-Reste (${sageElements.length}):\n${sageInfo}`
        );
      }

      // 6. Check if content is left-aligned (not centered)
      if (firstChild) {
        const rect = firstChild.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const centerOffset = Math.abs(
          (rect.left + rect.right) / 2 - viewportWidth / 2
        );
        if (centerOffset > 50) {
          anomalies.push(
            `Inhalt NICHT zentriert: center-offset=${Math.round(centerOffset)}px (firstChild left=${Math.round(rect.left)}px)`
          );
        } else {
          anomalies.push(
            `Inhalt zentriert: center-offset=${Math.round(centerOffset)}px`
          );
        }
      }

      return {
        mainStyles: getStyles(main),
        firstChildStyles: getStyles(firstChild),
        secondChildStyles: getStyles(secondChild),
        domTree: domTree(main, 0),
        anomalies,
        viewportWidth: window.innerWidth,
        pageHeight: document.body.scrollHeight,
      };
    },
    `
    const cn = el ? el.className : '';
    if (typeof cn === 'string') return cn.substring(0, 150);
    if (cn && typeof cn.baseVal === 'string') return cn.baseVal.substring(0, 150);
    return String(cn || '').substring(0, 150);
  `
  );
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
        await page.waitForTimeout(1500);

        const screenshotPath = join(OUT_DIR, `${key}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });

        const data = await getLayoutData(page);
        data.screenshotPath = screenshotPath;
        results[key] = data;
        console.log(
          `  ✓ Anomalien: ${data.anomalies.length}, pageHeight: ${data.pageHeight}px`
        );
      } catch (err) {
        console.error(`  FEHLER bei ${key}: ${err.message}`);
        results[key] = { error: err.message };
      }
    }

    await context.close();
  }

  await browser.close();
  writeFileSync(
    join(OUT_DIR, "raw-results.json"),
    JSON.stringify(results, null, 2)
  );
  console.log("\nFertig. Rohdaten gespeichert in raw-results.json");
}

run().catch(console.error);
