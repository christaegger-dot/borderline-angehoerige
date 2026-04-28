import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BASE_URL = "https://borderline-angehoerige.netlify.app";
const OUT_DIR =
  "/home/ubuntu/borderline-angehoerige/outputs/phase-8-rediagnose";

mkdirSync(OUT_DIR, { recursive: true });

// ─── Schritt 1: Whitespace-Bug Verstehen ──────────────────────────────────────
async function diagnoseWhitespaceBug(page) {
  await page.goto(BASE_URL + "/verstehen", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(1500);

  // Screenshot des Bereichs Y=400 bis Y=1400 (volle Breite)
  await page.screenshot({
    path: join(OUT_DIR, "verstehen-whitespace-area.png"),
    clip: { x: 0, y: 400, width: 1280, height: 1000 },
  });

  // DOM-Inspektion: alle Elemente zwischen Y=500 und Y=1400
  const elementsInRange = await page.evaluate(() => {
    const results = [];
    const main = document.querySelector("main");
    if (!main) return results;

    function walk(el, depth) {
      if (depth > 8) return;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const top = rect.top + window.scrollY;
      const bottom = rect.bottom + window.scrollY;

      // Elemente die im Bereich Y=400-1400 liegen
      if (bottom > 400 && top < 1400 && rect.width > 0) {
        const cn =
          typeof el.className === "string"
            ? el.className.substring(0, 120)
            : "";
        results.push({
          tag: el.tagName,
          className: cn,
          top: Math.round(top),
          bottom: Math.round(bottom),
          height: Math.round(rect.height),
          width: Math.round(rect.width),
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom,
          marginTop: style.marginTop,
          marginBottom: style.marginBottom,
          minHeight: style.minHeight,
          display: style.display,
          visibility: style.visibility,
          overflow: style.overflow,
          depth,
        });
      }
      for (const child of el.children) {
        walk(child, depth + 1);
      }
    }
    walk(main, 0);
    return results;
  });

  // Leere Bereiche finden: Gaps zwischen Elementen (auf gleicher Tiefe)
  // Fokus auf direkte Kinder des Content-Divs
  const contentChildren = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return [];
    // Finde das bg-primary Div (zweites Kind nach TOC)
    let contentDiv = null;
    for (const child of main.children) {
      const rect = child.getBoundingClientRect();
      if (rect.width > 100) {
        contentDiv = child;
        break;
      }
    }
    if (!contentDiv) return [];

    // mx-auto div
    const mxAuto =
      contentDiv.querySelector(".mx-auto") || contentDiv.firstElementChild;
    if (!mxAuto) return [];

    const results = [];
    let prevBottom = 0;
    for (const child of mxAuto.children) {
      const rect = child.getBoundingClientRect();
      const style = window.getComputedStyle(child);
      const top = rect.top + window.scrollY;
      const bottom = rect.bottom + window.scrollY;
      const cn =
        typeof child.className === "string"
          ? child.className.substring(0, 120)
          : "";
      const gap = prevBottom > 0 ? Math.round(top - prevBottom) : 0;
      results.push({
        tag: child.tagName,
        className: cn,
        top: Math.round(top),
        bottom: Math.round(bottom),
        height: Math.round(rect.height),
        gap_from_prev: gap,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        marginTop: style.marginTop,
        marginBottom: style.marginBottom,
        minHeight: style.minHeight,
        display: style.display,
        id: child.id || "",
        // Heading text if any
        heading:
          child.querySelector("h1,h2,h3")?.textContent?.substring(0, 60) || "",
      });
      prevBottom = bottom;
    }
    return results;
  });

  return { elementsInRange, contentChildren };
}

// ─── Schritt 2: Sidebar-Architektur ───────────────────────────────────────────
async function diagnoseSidebar(page, slug, path) {
  // Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE_URL + path, {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(1000);

  const sidebarData = await page.evaluate(() => {
    // Suche nach TOC-Sidebar-Elementen
    const tocFixed = document.querySelector('[class*="fixed"][class*="left-"]');
    const tocAside = document.querySelector("aside");
    const tocNav = document.querySelector(
      'nav[aria-label*="Inhalt"], nav[aria-label*="content"], nav[aria-label*="toc"]'
    );

    function elInfo(el) {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const cn =
        typeof el.className === "string" ? el.className.substring(0, 200) : "";
      return {
        tag: el.tagName,
        className: cn,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        left: Math.round(rect.left),
        top: Math.round(rect.top),
        visible: rect.width > 0 && rect.height > 0,
        position: style.position,
        display: style.display,
        zIndex: style.zIndex,
        overflow: style.overflow,
        text: el.textContent?.substring(0, 150) || "",
      };
    }

    // Alle divs mit "fixed" und "left" in der Klasse (TOC-Sidebar)
    const allFixed = Array.from(document.querySelectorAll('[class*="fixed"]'))
      .filter(el => {
        const cn = el.className;
        return (
          typeof cn === "string" && cn.includes("left-") && cn.includes("top-")
        );
      })
      .map(elInfo);

    return {
      tocFixed: elInfo(tocFixed),
      tocAside: elInfo(tocAside),
      tocNav: elInfo(tocNav),
      allFixed,
    };
  });

  // Screenshot Desktop
  await page.screenshot({
    path: join(OUT_DIR, `${slug}-sidebar-desktop.png`),
    fullPage: false,
  });

  // Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE_URL + path, {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(1000);

  const sidebarMobile = await page.evaluate(() => {
    const allFixed = Array.from(document.querySelectorAll('[class*="fixed"]'))
      .filter(el => {
        const cn = el.className;
        return (
          typeof cn === "string" && cn.includes("left-") && cn.includes("top-")
        );
      })
      .map(el => {
        const rect = el.getBoundingClientRect();
        const cn =
          typeof el.className === "string"
            ? el.className.substring(0, 200)
            : "";
        return {
          tag: el.tagName,
          className: cn,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          visible: rect.width > 0 && rect.height > 0,
        };
      });
    return { allFixed };
  });

  return { desktop: sidebarData, mobile: sidebarMobile };
}

// ─── Schritt 3: Soforthilfe-Architektur ───────────────────────────────────────
async function diagnoseSoforthilfe(page) {
  await page.setViewportSize({ width: 1280, height: 800 });

  // Network-Requests aufzeichnen
  const requests = [];
  const responses = [];

  page.on("request", req => {
    if (req.url().includes("soforthilfe") || req.url().includes("index.html")) {
      requests.push({
        url: req.url(),
        method: req.method(),
        resourceType: req.resourceType(),
      });
    }
  });

  page.on("response", async resp => {
    if (
      resp.url().includes("soforthilfe") ||
      resp.url().includes("index.html")
    ) {
      responses.push({
        url: resp.url(),
        status: resp.status(),
        contentType: resp.headers()["content-type"] || "",
      });
    }
  });

  await page.goto(BASE_URL + "/soforthilfe", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(1000);

  // Was ist tatsächlich im DOM?
  const domInfo = await page.evaluate(() => {
    const root = document.getElementById("root");
    const main = document.querySelector("main");
    const fallbackPage = document.querySelector(".fallback-page");
    const reactApp =
      document.querySelector("[data-reactroot]") ||
      document.querySelector("#root > *");

    return {
      hasRoot: !!root,
      rootChildren: root ? root.children.length : 0,
      rootFirstChildClass:
        root?.firstElementChild?.className?.substring(0, 100) || "",
      hasMain: !!main,
      mainClass: main?.className?.substring(0, 100) || "",
      hasFallbackPage: !!fallbackPage,
      bodyClass: document.body.className?.substring(0, 100) || "",
      title: document.title,
      // Suche nach React-spezifischen Attributen
      hasReactFiber: !!document.querySelector("[data-reactroot]"),
      // Prüfe ob es ein React-rendered DOM ist
      scriptTags: Array.from(document.querySelectorAll("script[src]"))
        .map(s => s.src)
        .filter(s => s.includes("assets/"))
        .slice(0, 3),
      // Prüfe ob Soforthilfe-React-Komponente vorhanden
      hasTriage: !!document.querySelector('[class*="triage"]'),
      hasEditorialLayout: !!document.querySelector('[class*="editorial"]'),
    };
  });

  await page.screenshot({
    path: join(OUT_DIR, "soforthilfe-live.png"),
    fullPage: false,
  });

  return { requests, responses, domInfo };
}

// ─── Schritt 4: Visuelle Wirkung Home ─────────────────────────────────────────
async function diagnoseHomeVisual(page) {
  const viewports = [
    { name: "desktop-1280", width: 1280, height: 800 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "mobile-375", width: 375, height: 812 },
  ];

  const results = [];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(BASE_URL + "/", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(1500);

    // Screenshot above-the-fold
    await page.screenshot({
      path: join(OUT_DIR, `home-${vp.name}.png`),
      fullPage: false,
    });

    // Metriken
    const metrics = await page.evaluate(vpWidth => {
      const main = document.querySelector("main");
      if (!main) return null;

      // Content-Div finden
      let contentDiv = null;
      for (const child of main.children) {
        const rect = child.getBoundingClientRect();
        if (rect.width > 100) {
          contentDiv = child;
          break;
        }
      }
      if (!contentDiv) return null;

      const mxAuto =
        contentDiv.querySelector(".mx-auto") || contentDiv.firstElementChild;
      const mxRect = mxAuto ? mxAuto.getBoundingClientRect() : null;

      // Bilder im sichtbaren Bereich
      const images = Array.from(
        document.querySelectorAll('img, [class*="bg-[url"]')
      ).filter(img => {
        const rect = img.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.width > 0;
      }).length;

      // Drop-Cap
      const dropCap = document.querySelector(
        '[class*="drop-cap"], [class*="first-letter"], .prose > p:first-child::first-letter'
      );

      // Hero-Bereich
      const hero = document.querySelector('header, [class*="hero"], h1');
      const heroRect = hero ? hero.getBoundingClientRect() : null;

      return {
        viewportWidth: vpWidth,
        contentWidth: mxRect ? Math.round(mxRect.width) : 0,
        contentLeft: mxRect ? Math.round(mxRect.left) : 0,
        contentRatio: mxRect ? Math.round((mxRect.width / vpWidth) * 100) : 0,
        leftMargin: mxRect ? Math.round(mxRect.left) : 0,
        rightMargin: mxRect ? Math.round(vpWidth - mxRect.right) : 0,
        imagesAboveFold: images,
        heroTop: heroRect ? Math.round(heroRect.top) : 0,
        heroHeight: heroRect ? Math.round(heroRect.height) : 0,
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        mainBg: window.getComputedStyle(main).backgroundColor,
      };
    }, vp.width);

    results.push({ viewport: vp, metrics });
  }

  return results;
}

// ─── Schritt 5: Whitespace-Bug auf anderen Tier-1-Pages ───────────────────────
async function diagnoseWhitespaceBugOtherPages(page) {
  const pages = [
    { slug: "kommunizieren", path: "/kommunizieren" },
    { slug: "grenzen", path: "/grenzen" },
  ];
  const results = {};

  for (const p of pages) {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL + p.path, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: join(OUT_DIR, `${p.slug}-area-400-1400.png`),
      clip: { x: 0, y: 400, width: 1280, height: 1000 },
    });

    const contentChildren = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return [];
      let contentDiv = null;
      for (const child of main.children) {
        const rect = child.getBoundingClientRect();
        if (rect.width > 100) {
          contentDiv = child;
          break;
        }
      }
      if (!contentDiv) return [];
      const mxAuto =
        contentDiv.querySelector(".mx-auto") || contentDiv.firstElementChild;
      if (!mxAuto) return [];

      const results = [];
      let prevBottom = 0;
      for (const child of mxAuto.children) {
        const rect = child.getBoundingClientRect();
        const style = window.getComputedStyle(child);
        const top = rect.top + window.scrollY;
        const bottom = rect.bottom + window.scrollY;
        const cn =
          typeof child.className === "string"
            ? child.className.substring(0, 120)
            : "";
        const gap = prevBottom > 0 ? Math.round(top - prevBottom) : 0;
        results.push({
          tag: child.tagName,
          className: cn,
          top: Math.round(top),
          bottom: Math.round(bottom),
          height: Math.round(rect.height),
          gap_from_prev: gap,
          heading:
            child.querySelector("h1,h2,h3")?.textContent?.substring(0, 60) ||
            "",
        });
        prevBottom = bottom;
      }
      return results;
    });

    results[p.slug] = contentChildren;
  }

  return results;
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("=== Schritt 1: Whitespace-Bug Verstehen ===");
  await page.setViewportSize({ width: 1280, height: 800 });
  const whitespaceData = await diagnoseWhitespaceBug(page);
  console.log(
    "Content-Kinder auf Verstehen:",
    whitespaceData.contentChildren.length
  );

  // Grosse Gaps finden
  const bigGaps = whitespaceData.contentChildren.filter(
    c => c.gap_from_prev > 100
  );
  console.log("Grosse Gaps (>100px):", bigGaps.length);
  bigGaps.forEach(g =>
    console.log(
      `  Gap ${g.gap_from_prev}px vor "${g.heading || g.className.substring(0, 50)}" (top=${g.top})`
    )
  );

  console.log("\n=== Schritt 2: Sidebar-Architektur ===");
  const sidebarPages = [
    { slug: "verstehen", path: "/verstehen" },
    { slug: "kommunizieren", path: "/kommunizieren" },
    { slug: "grenzen", path: "/grenzen" },
    { slug: "home", path: "/" },
    { slug: "wegweiser", path: "/wegweiser" },
  ];
  const sidebarResults = {};
  for (const sp of sidebarPages) {
    console.log(`  Sidebar auf ${sp.slug}...`);
    sidebarResults[sp.slug] = await diagnoseSidebar(page, sp.slug, sp.path);
  }

  console.log("\n=== Schritt 3: Soforthilfe-Architektur ===");
  const soforthilfeData = await diagnoseSoforthilfe(page);
  console.log("hasFallbackPage:", soforthilfeData.domInfo.hasFallbackPage);
  console.log("hasReactFiber:", soforthilfeData.domInfo.hasReactFiber);
  console.log("scriptTags:", soforthilfeData.domInfo.scriptTags);
  console.log(
    "Requests:",
    soforthilfeData.requests.map(r => r.url)
  );
  console.log(
    "Responses:",
    soforthilfeData.responses.map(r => `${r.status} ${r.url}`)
  );

  console.log("\n=== Schritt 4: Visuelle Wirkung Home ===");
  const homeVisual = await diagnoseHomeVisual(page);
  homeVisual.forEach(r => {
    console.log(
      `  ${r.viewport.name}: contentWidth=${r.metrics?.contentWidth}px, ratio=${r.metrics?.contentRatio}%, leftMargin=${r.metrics?.leftMargin}px, images=${r.metrics?.imagesAboveFold}`
    );
  });

  console.log("\n=== Schritt 5: Whitespace-Bug andere Pages ===");
  const otherPagesData = await diagnoseWhitespaceBugOtherPages(page);
  for (const [slug, children] of Object.entries(otherPagesData)) {
    const bigGaps = children.filter(c => c.gap_from_prev > 100);
    console.log(`  ${slug}: ${bigGaps.length} grosse Gaps`);
    bigGaps.forEach(g =>
      console.log(
        `    Gap ${g.gap_from_prev}px vor "${g.heading || g.className.substring(0, 50)}" (top=${g.top})`
      )
    );
  }

  // Ergebnisse speichern
  const allResults = {
    whitespace: whitespaceData,
    sidebar: sidebarResults,
    soforthilfe: soforthilfeData,
    homeVisual,
    otherPages: otherPagesData,
  };
  writeFileSync(
    join(OUT_DIR, "rediagnose-results.json"),
    JSON.stringify(allResults, null, 2)
  );
  console.log(
    "\nErgebnisse gespeichert in:",
    OUT_DIR + "/rediagnose-results.json"
  );

  await browser.close();
})();
