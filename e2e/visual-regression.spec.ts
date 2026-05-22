import { expect, test } from "@playwright/test";

/**
 * Visual-Regression-Tests: schiesst Screenshots der wichtigsten Pages und
 * vergleicht sie gegen Baseline. Erkennt unbeabsichtigte visuelle Drift
 * nach Refactors (Layout-Shifts, Font-Probleme, Farb-Drifts, etc.).
 *
 * Pages-Auswahl: die strukturell unterschiedlichsten Seiten der Site, damit
 * eine breite Komponenten-Abdeckung entsteht. Nicht jede Page einzeln —
 * Detailpages folgen demselben Pattern.
 */

/**
 * Stable-Pages: Pages mit reproduzierbarem Rendering (kein timing-
 * sensitives Content). Home, Verstehen, Grenzen und Materialien
 * zeigten Drift zwischen Runs — vermutlich framer-motion-Animations
 * oder lazy-loaded Inhalte. Home wird ueber den separaten Hero-Region-
 * Test abgedeckt (siehe unten).
 */
const PAGES = [
  { path: "/soforthilfe", name: "soforthilfe" },
  { path: "/glossar", name: "glossar" },
  { path: "/faq", name: "faq" },
  { path: "/fachstelle", name: "fachstelle" },
  { path: "/wegweiser", name: "wegweiser" },
];

for (const { path, name } of PAGES) {
  test(`page ${name} matches baseline`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });

    // Fonts müssen geladen sein, bevor Screenshot
    await page.evaluate(() => document.fonts.ready);

    // Scroll-Position auf 0 fixieren
    await page.evaluate(() => window.scrollTo(0, 0));

    // Lazy-Loading-Bilder anstossen + framer-motion-Initial-Animations
    // ausklingen lassen.
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 800));
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 800));
    });

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
    });
  });
}

test("home hero region matches baseline", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const hero = page.locator("section.editorial-section").first();
  await expect(hero).toHaveScreenshot("home-hero.png");
});

test("editorial section with aside matches baseline", async ({ page }) => {
  await page.goto("/verstehen", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  // Erste EditorialSection mit Aside (Eisberg-Illustration)
  const section = page.locator("section.editorial-section").first();
  await expect(section).toHaveScreenshot("verstehen-hero-eisberg.png");
});

test("grenzen key sections match baseline", async ({ page }) => {
  await page.goto("/grenzen", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const hero = page.locator("section.editorial-section").first();
  await expect(hero).toHaveScreenshot("grenzen-hero.png");

  const allSections = page.locator("section.editorial-section");
  const targetSection = allSections.nth(2);
  await expect(targetSection).toHaveScreenshot("grenzen-konfliktbereich.png");
});

test("materialien filter and first cards match baseline", async ({ page }) => {
  await page.goto("/materialien", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const filterBar = page.locator(
    "div[role='tablist'][aria-label='Filter Materialien nach Kategorie']"
  );
  await expect(filterBar).toHaveScreenshot("materialien-filterbar.png");

  const firstGrid = page.locator(
    "section[aria-label='Empfohlene Kernmaterialien — Tile-Liste']"
  );
  await firstGrid
    .locator("img")
    .evaluateAll(images =>
      Promise.all(images.map(image => image.decode().catch(() => undefined)))
    );
  await expect(firstGrid).toHaveScreenshot("materialien-erste-karten.png");
});

test("krise key CTA region matches baseline", async ({ page }) => {
  await page.goto("/unterstuetzen/krise", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const sections = page.locator("section.editorial-section");
  await expect(sections.first()).toHaveScreenshot("krise-hero.png");
  await expect(sections.nth(1)).toHaveScreenshot("krise-cta.png");
});
