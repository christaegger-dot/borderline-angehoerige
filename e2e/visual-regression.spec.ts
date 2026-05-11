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
