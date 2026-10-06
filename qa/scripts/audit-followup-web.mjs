import assert from "node:assert/strict";
import fs from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

// Automatisierte Stichprobe: kein Ersatz für reale Screenreader-/Nutzungstests.
const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:4173";
const viewports = [
  { width: 360, height: 800 },
  { width: 768, height: 900 },
  { width: 1440, height: 1000 },
];
const routes = [
  "/",
  "/soforthilfe",
  "/uebungen",
  "/barrierefreiheit",
  "/datenschutz",
  "/feedback",
  "/fachstelle",
  "/beratung",
  "/verstehen/diagnostik",
  "/selbstfuersorge",
  "/selbsttest",
  "/grenzen",
  "/unterstuetzen/therapie",
  "/materialien/text/warnsignale",
  "/materialien/text/spiegeln-statt-aufsaugen",
];
const results = [];

async function checkAxe(page, label) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  assert.deepEqual(
    result.violations.map(item => ({
      id: item.id,
      nodes: item.nodes.map(node => node.target),
    })),
    [],
    `${label}: axe`
  );
}

// Gegen den gebauten Express-Server oder Netlify ausführen: Vite-Preview bildet
// die Download-API und die Netlify-Header nicht vollständig ab.
for (const [id, alias, stem] of [
  ["warnsignale", "selbstfuersorge-warnsignale", "manus-warnsignale-v3"],
  [
    "spiegeln-statt-aufsaugen",
    "grenzen-spiegeln-statt-aufsaugen",
    "manus-spiegeln-statt-aufsaugen-v3",
  ],
]) {
  for (const route of [
    `/api/material-download/${id}?disposition=inline`,
    `/api/material-download/${alias}?disposition=inline`,
    `/infografiken/${stem}.pdf`,
    `/infografiken/${stem}.webp`,
    `/infografiken/extras/thumbnails/${stem}-thumb.png`,
  ]) {
    const response = await fetch(new URL(route, baseUrl), {
      redirect: "manual",
    });
    assert.equal(response.status, 404, `${route}: Rückhaltung`);
    results.push({ route, status: "passed", httpStatus: response.status });
  }
}
const browser = await chromium.launch();

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const runtimeErrors = [];
    page.on("pageerror", error => runtimeErrors.push(error.message));

    for (const route of routes) {
      runtimeErrors.length = 0;
      const response = await page.goto(new URL(route, baseUrl).href, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, `${route}: HTTP`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 400));
        window.scrollTo(0, 0);
      });
      await page.getByRole("heading", { level: 1 }).first().waitFor();

      if (route === "/soforthilfe") {
        const kiz = page.locator('a[href="tel:+41583846500"]');
        assert.equal(await kiz.count(), 1);
        assert(await kiz.isVisible());
        assert.match(await kiz.locator("..").innerText(), /Durchwahlnummer 4/);
        assert.equal(await page.locator('a[href="tel:0442967310"]').count(), 0);
        assert(
          await page.getByText(/nennt weiterhin\s+044 296 73 10/).isVisible()
        );
      }

      if (route === "/datenschutz") {
        const toggles = page.locator('main button[aria-expanded="false"]');
        for (const toggle of await toggles.all()) {
          if (await toggle.isVisible()) await toggle.click();
        }
        // Die Accordion-Inhalte blenden mit Framer Motion ein. Kontrast erst
        // nach der Öffnungsanimation messen, nicht im halbtransparenten Frame.
        await page.waitForTimeout(450);
        assert(await page.locator("#email").isVisible());
      }

      if (route === "/uebungen") {
        const cards = page.locator("main article").filter({
          has: page.locator("button[aria-pressed]"),
        });
        assert.equal(await cards.count(), 6, "sechs Vergleichsszenarien");
        await checkAxe(page, `${route} ${viewport.width}px initial`);
        results.push({ route, viewport, state: "initial", status: "passed" });
        for (const [index, card] of (await cards.all()).entries()) {
          const choices = card.locator("button[aria-pressed]");
          assert.equal(await choices.count(), 3);
          const first = choices.nth(0);
          const second = choices.nth(1);
          const status = card.getByRole("status");
          await first.focus();
          await page.keyboard.press("Enter");
          assert.equal(await first.getAttribute("aria-pressed"), "true");
          assert(
            await first.evaluate(element => element === document.activeElement)
          );
          const firstAnnouncement = await status.textContent();
          assert(firstAnnouncement.trim().length > 0, "Auswahlansage");
          await page.keyboard.press("Tab");
          assert(
            await second.evaluate(element => element === document.activeElement)
          );
          await page.keyboard.press("Shift+Tab");
          assert(
            await first.evaluate(element => element === document.activeElement)
          );
          await page.keyboard.press("Tab");
          await page.keyboard.press("Space");
          assert.equal(await first.getAttribute("aria-pressed"), "false");
          assert.equal(await second.getAttribute("aria-pressed"), "true");
          assert.notEqual(await status.textContent(), firstAnnouncement);
          const reset = card.getByRole("button", {
            name: /zurücksetzen|noch einmal|erneut/i,
          });
          await reset.focus();
          await page.keyboard.press("Enter");
          assert(
            await second.evaluate(element => element === document.activeElement)
          );
          assert.equal(await second.getAttribute("aria-pressed"), "false");
          assert((await status.textContent()).trim().length > 0, "Resetansage");
          for (const choice of await choices.all())
            assert(await choice.isEnabled());
          if (index === 0) {
            await checkAxe(page, `${route} ${viewport.width}px reset`);
            results.push({ route, viewport, state: "reset", status: "passed" });
          }
          await second.focus();
          await page.keyboard.press("Enter");
          assert.equal(await second.getAttribute("aria-pressed"), "true");
          assert(
            await second.evaluate(element => element === document.activeElement)
          );
          await card.getByRole("button", { name: /zurücksetzen/i }).focus();
          await page.keyboard.press("Enter");
        }
        // Auch den eingeblendeten Vergleichsbereich auf Struktur/Kontrast prüfen.
        await cards.first().locator("button[aria-pressed]").first().click();
      }

      const geometry = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }));
      assert(
        geometry.scroll <= geometry.viewport + 1,
        `${route} ${viewport.width}px: horizontaler Überlauf ${JSON.stringify(geometry)}`
      );
      await checkAxe(page, `${route} ${viewport.width}px`);
      assert.deepEqual(runtimeErrors, [], `${route}: Laufzeitfehler`);
      results.push({ route, viewport, status: "passed" });
      console.log(`PASS ${route} ${viewport.width}×${viewport.height}`);
    }
    await context.close();
  }

  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(new URL("/soforthilfe", baseUrl).href);
  assert(await page.locator('a[href="tel:144"]').first().isVisible());
  assert(await page.locator('a[href="tel:+41583846500"]').isVisible());
  await context.close();
  results.push({ case: "Soforthilfe ohne JavaScript", status: "passed" });
  await fs.mkdir("qa/output", { recursive: true });
  await fs.writeFile(
    "qa/output/followup-web-audit.json",
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseUrl,
        browser: await browser.version(),
        scope:
          "Chromium-Automation und Viewport-Emulation; keine reale Hilfsmittelprüfung",
        results,
      },
      null,
      2
    ) + "\n"
  );
  console.log(`Follow-up web audit passed: ${results.length} cases`);
} finally {
  await browser.close();
}
