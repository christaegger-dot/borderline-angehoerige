import assert from "node:assert/strict";
import fs from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

// Automatisierte Browserprüfung; keine reale Journey- oder Hilfsmittelprüfung.
const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:4173";
const viewports = [
  { width: 360, height: 800 },
  { width: 768, height: 900 },
  { width: 1440, height: 1000 },
];
const learningPath = [
  "/",
  "/verstehen",
  "/unterstuetzen/uebersicht",
  "/kommunizieren",
  "/grenzen",
  "/selbstfuersorge",
  "/genesung",
  "/materialien",
];
const results = [];
const browser = await chromium.launch();

async function openContentSections(page) {
  // Die Auswahl geschlossener Buttons schrumpft bei jedem Klick. Stabile
  // aria-controls-Werte verhindern, dass indexbasierte Locators Fragen auslassen.
  const controls = await page
    .locator('main button[aria-expanded="false"][aria-controls]')
    .evaluateAll(buttons =>
      buttons.map(button => button.getAttribute("aria-controls"))
    );
  for (const id of controls) {
    const button = page.locator(
      `main button[aria-controls=${JSON.stringify(id)}]`
    );
    if (await button.isVisible()) await button.click();
  }
  await page.waitForTimeout(500);
}

async function checkPage(page, route, viewport) {
  await page.getByRole("heading", { level: 1 }).first().waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(resolve => setTimeout(resolve, 500));
    window.scrollTo(0, 0);
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1
  );
  assert.equal(overflow, false, `${route}: Overflow bei ${viewport.width}px`);
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  assert.deepEqual(
    axe.violations.map(item => ({
      id: item.id,
      nodes: item.nodes.map(node => node.target),
    })),
    [],
    `${route}: axe bei ${viewport.width}px`
  );
  results.push({ route, viewport, state: "page", status: "passed" });
}

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const explanationLinks = new Set();

    for (const [index, route] of learningPath.entries()) {
      const response = await page.goto(new URL(route, baseUrl).href, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, `${route}: HTTP`);
      await checkPage(page, route, viewport);
      const nav = page.getByRole("navigation", {
        name: "Im Lernweg weitergehen",
        exact: true,
      });
      for (const link of await nav.locator('a[href*="#"]').all()) {
        explanationLinks.add(await link.getAttribute("href"));
      }
      assert.equal(await nav.count(), 1, `${route}: ein Lernweg-Navigator`);
      assert.match(
        await nav.innerText(),
        new RegExp(`Schritt ${index + 1} von 8`)
      );
      assert.equal(
        await page.locator("[data-learning-goal]").count(),
        1,
        `${route}: sichtbares Seitenziel`
      );
      await page.locator("[data-learning-goal]").waitFor({ state: "visible" });
      assert.equal(
        await nav.getByRole("link", { name: /^Weiter:/ }).count(),
        index < learningPath.length - 1 ? 1 : 0,
        `${route}: Vorwärtspfad`
      );
      assert.equal(
        await nav.getByRole("link", { name: /^Zurück:/ }).count(),
        index > 0 ? 1 : 0,
        `${route}: Rückwärtspfad`
      );
      for (const link of await nav.locator('a[href*="#"]').all()) {
        const href = await link.getAttribute("href");
        const target = new URL(href, baseUrl);
        if (target.pathname !== route || !target.hash) continue;
        await link.click();
        await page.waitForURL(target.href);
        const id = decodeURIComponent(target.hash.slice(1));
        await page
          .locator(`[id=${JSON.stringify(id)}]`)
          .waitFor({ state: "visible" });
        await page.waitForFunction(anchorId => {
          const anchor = document.getElementById(anchorId);
          if (!anchor) return false;
          const top = anchor.getBoundingClientRect().top;
          return top >= 0 && top < window.innerHeight;
        }, id);
        results.push({
          route: href,
          viewport,
          state: "same-page-explanation-click",
          status: "passed",
        });
        break;
      }
      if (index < learningPath.length - 1) {
        const forward = nav.getByRole("link", { name: /^Weiter:/ });
        await forward.focus();
        await page.keyboard.press("Enter");
        await page.waitForURL(new URL(learningPath[index + 1], baseUrl).href);
        await page.locator("[data-learning-goal]").waitFor();
        results.push({
          route,
          viewport,
          state: "keyboard-forward",
          status: "passed",
        });
      }
      if (index > 0) {
        await page.goto(new URL(route, baseUrl).href, {
          waitUntil: "networkidle",
        });
        const back = page
          .getByRole("navigation", {
            name: "Im Lernweg weitergehen",
            exact: true,
          })
          .getByRole("link", { name: /^Zurück:/ });
        await back.focus();
        await page.keyboard.press("Enter");
        await page.waitForURL(new URL(learningPath[index - 1], baseUrl).href);
        await page.locator("[data-learning-goal]").waitFor();
        results.push({
          route,
          viewport,
          state: "keyboard-back",
          status: "passed",
        });
      }
    }

    await page.goto(new URL("/materialien", baseUrl).href, {
      waitUntil: "networkidle",
    });
    const models = page.locator("[data-learning-models] > li");
    assert.equal(
      await models.count(),
      15,
      "15 transparent eingeordnete Modelle"
    );
    for (const model of await models.all()) {
      explanationLinks.add(
        await model.locator("a").first().getAttribute("href")
      );
    }
    for (const href of explanationLinks) {
      assert(href?.startsWith("/"), `Interner Erklärungslink ${href}`);
      const target = new URL(href, baseUrl);
      const response = await page.goto(target.href, {
        waitUntil: "networkidle",
      });
      // Ein reiner Fragmentwechsel lädt kein neues Dokument; dann die
      // Zielroute zusätzlich direkt abrufen und weiterhin den DOM-Anker prüfen.
      const status = response
        ? response.status()
        : (
            await page.request.get(new URL(target.pathname, baseUrl).href)
          ).status();
      assert.equal(status, 200, `${href}: Erklärung erreichbar`);
      const heading = page.getByRole("heading", { level: 1 }).first();
      await heading.waitFor({ state: "visible" });
      assert.doesNotMatch(await heading.innerText(), /Seite nicht gefunden/i);
      assert.equal(new URL(page.url()).pathname, target.pathname);
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      assert(canonical, `${href}: kanonische Zielroute vorhanden`);
      assert.equal(
        new URL(canonical, baseUrl).pathname,
        target.pathname,
        `${href}: kein SPA-404-Fallback hinter HTTP 200`
      );
      if (target.pathname.startsWith("/materialien/text/")) {
        await page
          .getByText("Quelle & Stand", { exact: true })
          .waitFor({ state: "visible" });
      }
      if (target.hash) {
        const id = decodeURIComponent(target.hash.slice(1));
        const anchor = page.locator(`[id=${JSON.stringify(id)}]`);
        assert.equal(await anchor.count(), 1, `${href}: eindeutiger Anker`);
        await anchor.waitFor({ state: "visible" });
      }
      results.push({
        route: href,
        viewport,
        state: "explanation-target",
        status: "passed",
      });
    }

    await page.goto(new URL("/faq", baseUrl).href, {
      waitUntil: "networkidle",
    });
    await openContentSections(page);
    const questions = page.locator("[data-faq-id]");
    assert.equal(await questions.count(), 27, "alle 27 FAQ-Antworten sichtbar");
    for (const question of await questions.all()) {
      const id = await question.getAttribute("data-faq-id");
      assert(
        (await question.locator("[data-claim-evidence]").count()) > 0,
        `${id}: Aussagebeleg`
      );
      assert(await question.isVisible(), `${id}: Antwort sichtbar`);
      assert(
        await question.locator("[data-claim-evidence]").first().isVisible(),
        `${id}: Belegbereich sichtbar`
      );
    }
    for (const link of await page.locator("a[data-claim-source]").all()) {
      const href = await link.getAttribute("href");
      assert(href?.startsWith("https://"), `FAQ-Quellenlink ${href}`);
      assert(await link.isVisible(), `FAQ-Quelle sichtbar: ${href}`);
      assert(
        (await link.innerText()).trim().length > 0,
        "Quelle mit zugänglichem Namen"
      );
    }
    await checkPage(page, "/faq", viewport);
    results.push({
      route: "/faq",
      viewport,
      state: "all-answers-and-evidence",
      status: "passed",
    });

    const extensions = [
      "/verstehen/diagnostik",
      "/verstehen/begleiterkrankungen",
      "/verstehen/beziehungen",
      "/unterstuetzen/alltag",
      "/unterstuetzen/therapie",
      "/unterstuetzen/krise",
    ];
    for (const route of ["/quellen", "/soforthilfe", ...extensions]) {
      const response = await page.goto(new URL(route, baseUrl).href, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, `${route}: HTTP`);
      if (extensions.includes(route)) {
        await openContentSections(page);
        assert.equal(
          await page.locator("[data-learning-goal]").count(),
          1,
          `${route}: Vertiefungsziel`
        );
        await page
          .locator("[data-learning-goal]")
          .waitFor({ state: "visible" });
        assert.equal(
          await page
            .getByRole("navigation", {
              name: "Von der Vertiefung zum Lernweg",
              exact: true,
            })
            .count(),
          1,
          `${route}: Rückkehr zum Lernweg`
        );
      }
      if (
        route === "/verstehen/diagnostik" ||
        route === "/unterstuetzen/therapie"
      ) {
        const ambulatorium = page.locator('main a[href="tel:+41583846600"]');
        assert(
          (await ambulatorium.count()) > 0,
          `${route}: Ambulatoriumkontakt`
        );
        for (const link of await ambulatorium.all()) {
          assert.match(await link.innerText(), /Ambulatorium Zürich/);
          assert.doesNotMatch(await link.innerText(), /HYPE/);
        }
        assert.equal(
          await page
            .locator('main a[href="mailto:kjpp.ambizh@pukzh.ch"]')
            .count(),
          0
        );
      }
      await checkPage(page, route, viewport);
    }
    assert.deepEqual(errors, [], `${viewport.width}px: Laufzeitfehler`);
    await context.close();
  }
  await fs.mkdir("audit-results", { recursive: true });
  await fs.writeFile(
    "audit-results/sources-learning-web-2026-10-06.json",
    JSON.stringify({ baseUrl, results }, null, 2) + "\n"
  );
  console.log(`${results.length} Browserfälle bestanden.`);
} finally {
  await browser.close();
}
