#!/usr/bin/env node
// Audit-Regression-Guard — schuetzt die acht Fixes aus dem Audit Mai 2026
// vor Regressionen. Laeuft als Standalone-Skript via Playwright-as-library
// (nicht Playwright-Test-Runner).
//
// Verwendung:
//   pnpm audit:smoke               — Smoke (4 Routen, 3 Breakpoints, ~3 min)
//   pnpm audit:full                — Voll (~25 Routen, 6 Breakpoints, ~20 min)
//   node scripts/audit-regression-guard.mjs --smoke --url=http://localhost:5173
//   node scripts/audit-regression-guard.mjs --label=2026-05-12
//
// Exit-Codes:
//   0 — alle Checks bestanden
//   1 — mindestens ein Check fehlgeschlagen
//   2 — Laufzeitfehler (Browser-Start, Server-unreachable, etc.)

import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── CLI ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const SMOKE = args.includes("--smoke");
const BASE_URL =
  args.find((a) => a.startsWith("--url="))?.split("=")[1] ??
  process.env.GUARD_URL ??
  "http://127.0.0.1:4173";
const LABEL =
  args.find((a) => a.startsWith("--label="))?.split("=")[1] ??
  new Date().toISOString().slice(0, 10);
const OUT_DIR = join(__dirname, "..", "audit-results", LABEL);

// ── EXPECT — neue Erwartungen hier ergaenzen, dann Check unten registrieren ─

const EXPECT = {
  filterCounterOpacity: "1",
  separatorOpacity: "0.9",
  containerPageWidth: "1240px",
  skipLinkHref: "#main-content",
  mainContentId: "main-content",
  fachstelleHeadings: ["H1", "H2", "H3", "H3", "H3", "H3", "H2", "H2", "H2"],
};

// ── Routes — synchron mit client/src/app/routes.ts, Stand 2026-05-12. ───────
// Bei neuen Routes hier ergaenzen (non-redirect, non-dynamic).

const FULL_ROUTES = [
  "/",
  "/soforthilfe",
  "/verstehen",
  "/verstehen/diagnostik",
  "/verstehen/begleiterkrankungen",
  "/unterstuetzen/uebersicht",
  "/unterstuetzen/alltag",
  "/unterstuetzen/therapie",
  "/unterstuetzen/krise",
  "/kommunizieren",
  "/grenzen",
  "/selbstfuersorge",
  "/materialien",
  "/selbsttest",
  "/impressum",
  "/datenschutz",
  "/genesung",
  "/beratung",
  "/feedback",
  "/glossar",
  "/buchempfehlungen",
  "/therapieangebote",
  "/faq",
  "/ueber-uns",
  "/fachstelle",
];

const SMOKE_ROUTES = ["/", "/materialien", "/fachstelle", "/grenzen"];

const ROUTES = SMOKE ? SMOKE_ROUTES : FULL_ROUTES;

const OVERFLOW_BREAKPOINTS = SMOKE
  ? [320, 768, 1440]
  : [320, 375, 768, 1024, 1280, 1440];

const AXE_VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile-375", width: 375, height: 700 },
];

// ── State ──────────────────────────────────────────────────────────────────

const issues = [];

function log(...a) {
  console.log(...a);
}
function fail(check, detail) {
  issues.push({ check, detail });
  log("    ✗ FAIL " + check + " — " + detail);
}
function pass(check, detail = "") {
  log("    ✓ " + check + (detail ? " — " + detail : ""));
}

// ── Helpers ────────────────────────────────────────────────────────────────

async function gotoIdle(page, path) {
  await page.goto(BASE_URL + path, { waitUntil: "networkidle", timeout: 30000 });
  await page.evaluate(() => document.fonts?.ready);
  // Trigger lazy-loaded sections so axe sees them.
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });
}

// ── Check 1: axe-core WCAG 2.1 AA ──────────────────────────────────────────

async function checkAxe(page, route, viewport) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await gotoIdle(page, route);
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  if (result.violations.length === 0) {
    pass("axe", `${route} @ ${viewport.name}`);
  } else {
    for (const v of result.violations) {
      fail(
        "axe",
        `${route} @ ${viewport.name}: ${v.id} (${v.impact}) — ${v.help} [${v.nodes.length} node(s)]`
      );
    }
  }
}

// ── Check 2: Horizontaler Overflow ─────────────────────────────────────────

async function checkOverflow(page, route, width) {
  await page.setViewportSize({ width, height: 800 });
  await gotoIdle(page, route);
  const m = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    inner: window.innerWidth,
  }));
  // 1 px Toleranz fuer Sub-Pixel-Rounding.
  if (m.scroll > m.inner + 1) {
    fail(
      "overflow",
      `${route} @ ${width}px: scrollWidth=${m.scroll} > innerWidth=${m.inner} (Δ ${m.scroll - m.inner}px)`
    );
  } else {
    pass("overflow", `${route} @ ${width}px`);
  }
}

// ── Check 3: /fachstelle Heading-Order ─────────────────────────────────────

async function checkHeadingOrder(page) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await gotoIdle(page, "/fachstelle");
  const actual = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        "main h1, main h2, main h3, main h4, main h5, main h6"
      )
    ).map((h) => h.tagName)
  );
  const expected = EXPECT.fachstelleHeadings;
  const same =
    actual.length === expected.length &&
    actual.every((t, i) => t === expected[i]);
  if (same) {
    pass("heading-order", `[${expected.join(", ")}]`);
  } else {
    fail(
      "heading-order",
      `/fachstelle\n      expected: ${expected.join(", ")}\n      actual:   ${actual.join(", ")}`
    );
  }
}

// ── Check 4: Header-Layout (Main-Nav vs Hamburger × lg-Breakpoint) ─────────

async function checkHeaderLayout(page) {
  for (const width of [375, 1024]) {
    await page.setViewportSize({ width, height: 800 });
    await gotoIdle(page, "/");
    const r = await page.evaluate(() => {
      const mainNav = document.querySelector(
        'nav[aria-label="Hauptnavigation"]'
      );
      const hamburger = document.querySelector(
        'button[aria-controls="mobile-navigation-dialog"]'
      );
      return {
        mainNavVisible: mainNav
          ? getComputedStyle(mainNav).display !== "none"
          : null,
        hamburgerVisible: hamburger
          ? getComputedStyle(hamburger).display !== "none"
          : null,
      };
    });
    const lg = width >= 1024;
    if (lg) {
      if (!r.mainNavVisible)
        fail("header-layout", `Hauptnav sollte bei ${width}px sichtbar sein`);
      if (r.hamburgerVisible)
        fail(
          "header-layout",
          `Hamburger sollte bei ${width}px ausgeblendet sein`
        );
      if (r.mainNavVisible && !r.hamburgerVisible)
        pass("header-layout", `${width}px: main-nav ✓ hamburger hidden ✓`);
    } else {
      if (r.mainNavVisible)
        fail("header-layout", `Hauptnav sollte bei ${width}px ausgeblendet sein`);
      if (!r.hamburgerVisible)
        fail("header-layout", `Hamburger sollte bei ${width}px sichtbar sein`);
      if (!r.mainNavVisible && r.hamburgerVisible)
        pass("header-layout", `${width}px: main-nav hidden ✓ hamburger ✓`);
    }
  }
}

// ── Check 5+6: Filter-Counter opacity 1 + Separator opacity 0.9 ────────────

async function checkFilterButtons(page) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await gotoIdle(page, "/materialien");
  const r = await page.evaluate(() => {
    const buttons = Array.from(
      document.querySelectorAll('button[role="tab"]')
    );
    if (buttons.length === 0) return { found: false };
    const spans = buttons[0].querySelectorAll("span");
    if (spans.length < 3) return { found: true, spanCount: spans.length };
    return {
      found: true,
      separatorOpacity: getComputedStyle(spans[1]).opacity,
      counterOpacity: getComputedStyle(spans[2]).opacity,
      separatorAriaHidden: spans[1].getAttribute("aria-hidden"),
    };
  });
  if (!r.found) {
    fail("filter-buttons", "/materialien: keine filter buttons gefunden");
    return;
  }
  if (r.spanCount !== undefined) {
    fail(
      "filter-buttons",
      `Filter-Button hat nur ${r.spanCount} spans (erwartet ≥ 3)`
    );
    return;
  }
  if (r.counterOpacity === EXPECT.filterCounterOpacity) {
    pass("counter-opacity", `opacity ${r.counterOpacity}`);
  } else {
    fail(
      "counter-opacity",
      `expected ${EXPECT.filterCounterOpacity}, got ${r.counterOpacity}`
    );
  }
  if (r.separatorOpacity === EXPECT.separatorOpacity) {
    pass("separator-opacity", `opacity ${r.separatorOpacity}`);
  } else {
    fail(
      "separator-opacity",
      `expected ${EXPECT.separatorOpacity}, got ${r.separatorOpacity}`
    );
  }
  if (r.separatorAriaHidden !== "true") {
    fail(
      "separator-aria-hidden",
      `Separator-Span muss aria-hidden bleiben, got "${r.separatorAriaHidden}"`
    );
  } else {
    pass("separator-aria-hidden", 'aria-hidden="true"');
  }
}

// ── Check 7: Ressourcen-Menü aria-controls bedingt ─────────────────────────

async function checkRessourcenAriaControls(page) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await gotoIdle(page, "/");
  const r = await page.evaluate(() => {
    const triggers = Array.from(
      document.querySelectorAll('button[aria-haspopup="menu"]')
    );
    const trigger = triggers.find((b) =>
      b.textContent?.toLowerCase().includes("ressourcen")
    );
    if (!trigger) return { found: false };
    return {
      found: true,
      hasAriaControlsAttr: trigger.hasAttribute("aria-controls"),
      ariaExpanded: trigger.getAttribute("aria-expanded"),
    };
  });
  if (!r.found) {
    fail("ressourcen-aria-controls", "Desktop Ressourcen-Trigger nicht gefunden");
    return;
  }
  if (r.hasAriaControlsAttr) {
    fail(
      "ressourcen-aria-controls",
      `aria-controls darf bei geschlossenem Menü nicht im DOM stehen (aria-expanded=${r.ariaExpanded})`
    );
  } else {
    pass(
      "ressourcen-aria-controls",
      `kein aria-controls, aria-expanded=${r.ariaExpanded}`
    );
  }
}

// ── Check 8: max-w-page Container-Token loest auf 1240px ───────────────────

async function checkContainerPageWidth(page) {
  await page.setViewportSize({ width: 1440, height: 800 });
  await gotoIdle(page, "/materialien");
  const r = await page.evaluate(() => {
    const el = document.querySelector(".max-w-page");
    if (!el) return { found: false };
    return { found: true, maxWidth: getComputedStyle(el).maxWidth };
  });
  if (!r.found) {
    fail("container-page", "/materialien: .max-w-page Element nicht gefunden");
    return;
  }
  if (r.maxWidth === EXPECT.containerPageWidth) {
    pass("container-page", `max-width ${r.maxWidth}`);
  } else {
    fail(
      "container-page",
      `expected max-width ${EXPECT.containerPageWidth}, got ${r.maxWidth}`
    );
  }
}

// ── Check 9: Skip-Link erstes Tab-Stop ─────────────────────────────────────

async function checkSkipLink(page) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await gotoIdle(page, "/");
  await page.evaluate(() => {
    // Fokus zuruecksetzen, damit Tab am Body startet.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    window.scrollTo(0, 0);
  });
  await page.keyboard.press("Tab");
  const r = await page.evaluate(() => {
    const a = document.activeElement;
    if (!a) return { tagName: null };
    return {
      tagName: a.tagName,
      href: a.getAttribute("href"),
      text: a.textContent?.trim() ?? "",
    };
  });
  if (r.tagName === "A" && r.href === EXPECT.skipLinkHref) {
    pass("skip-link", `<a href="${r.href}"> "${r.text}"`);
  } else {
    fail(
      "skip-link",
      `Erstes Tab-Ziel sollte <a href="${EXPECT.skipLinkHref}"> sein. Got: ${r.tagName} href="${r.href}" text="${r.text}"`
    );
  }
}

// ── Check 10: Hamburger-Dialog bei vw 768 ──────────────────────────────────

async function checkHamburgerDialog(page) {
  await page.setViewportSize({ width: 768, height: 1000 });
  await gotoIdle(page, "/");
  const hamburger = await page.$(
    'button[aria-controls="mobile-navigation-dialog"]'
  );
  if (!hamburger) {
    fail(
      "hamburger-dialog",
      'Hamburger-Button (aria-controls="mobile-navigation-dialog") nicht gefunden bei vw 768'
    );
    return;
  }
  await hamburger.click();
  // kurze Wartezeit fuer Mount + framer-motion-Initial.
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const dialog = document.getElementById("mobile-navigation-dialog");
    if (!dialog) return { mounted: false };
    const links = dialog.querySelectorAll("a[href]");
    return { mounted: true, linkCount: links.length };
  });
  if (!r.mounted) {
    fail("hamburger-dialog", "Dialog nach Klick nicht gemountet");
    return;
  }
  if (r.linkCount < 3) {
    fail(
      "hamburger-dialog",
      `Dialog enthält nur ${r.linkCount} Links (erwartet ≥ 3)`
    );
  } else {
    pass("hamburger-dialog", `mounted, ${r.linkCount} Nav-Links`);
  }
}

// ── Report ─────────────────────────────────────────────────────────────────

function writeReport() {
  mkdirSync(OUT_DIR, { recursive: true });
  const reportPath = join(OUT_DIR, "report.md");
  const lines = [
    `# Audit-Regression-Guard Report`,
    ``,
    `- **Mode:** ${SMOKE ? "smoke" : "full"}`,
    `- **URL:** ${BASE_URL}`,
    `- **Label:** ${LABEL}`,
    `- **Routes:** ${ROUTES.length}`,
    `- **Issues:** ${issues.length}`,
    ``,
  ];
  if (issues.length === 0) {
    lines.push("## Alle Checks bestanden");
  } else {
    lines.push("## Failures");
    lines.push("");
    const byCheck = {};
    for (const i of issues) {
      (byCheck[i.check] ??= []).push(i.detail);
    }
    for (const [check, details] of Object.entries(byCheck)) {
      lines.push(`### ${check} (${details.length})`);
      for (const d of details) lines.push(`- ${d}`);
      lines.push("");
    }
  }
  writeFileSync(reportPath, lines.join("\n"));
  log(`\nReport: ${reportPath}`);
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  log(`Audit-Regression-Guard — ${SMOKE ? "SMOKE" : "FULL"}-Modus`);
  log(`URL:    ${BASE_URL}`);
  log(`Routes: ${ROUTES.length}`);
  log(`Output: ${OUT_DIR}`);
  log("");

  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  try {
    log("[1/10] axe-core WCAG 2.1 AA");
    for (const route of ROUTES) {
      for (const viewport of AXE_VIEWPORTS) {
        await checkAxe(page, route, viewport);
      }
    }

    log("\n[2/10] Horizontaler Overflow");
    for (const route of ROUTES) {
      for (const width of OVERFLOW_BREAKPOINTS) {
        await checkOverflow(page, route, width);
      }
    }

    log("\n[3/10] /fachstelle Heading-Order");
    await checkHeadingOrder(page);

    log("\n[4/10] Header-Layout (Main-Nav vs Hamburger × lg)");
    await checkHeaderLayout(page);

    log("\n[5+6/10] Filter-Counter + Separator Opacity");
    await checkFilterButtons(page);

    log("\n[7/10] Ressourcen-Menü aria-controls bedingt");
    await checkRessourcenAriaControls(page);

    log("\n[8/10] Container-Token max-w-page → 1240px");
    await checkContainerPageWidth(page);

    log("\n[9/10] Skip-Link erstes Tab-Stop");
    await checkSkipLink(page);

    log("\n[10/10] Hamburger-Dialog bei vw 768");
    await checkHamburgerDialog(page);
  } catch (err) {
    fail("runtime", err?.message ?? String(err));
    console.error(err);
  } finally {
    await browser.close();
  }

  writeReport();
  log(`\nIssues: ${issues.length}`);
  process.exit(issues.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(2);
});
