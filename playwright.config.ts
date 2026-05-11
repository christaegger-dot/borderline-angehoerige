import { defineConfig, devices } from "@playwright/test";

/**
 * Visual-Regression-Tests für die Editorial-Komponenten und Hauptseiten.
 *
 * Test-Setup:
 * - Startet automatisch `pnpm preview` (production build auf 4173) als Server.
 * - Vor dem ersten Run: `pnpm build` damit `dist/public` existiert.
 * - Vor dem ersten Run: `pnpm playwright install chromium` falls Browser
 *   nicht via PLAYWRIGHT_BROWSERS_PATH gesetzt ist.
 *
 * Run:
 * - `pnpm test:visual` — vergleicht gegen Baseline. Schlägt fehl bei Diffs.
 * - `pnpm test:visual:update` — aktualisiert die Baseline-Screenshots.
 *
 * Threshold: maxDiffPixelRatio 0.01 (1% der Pixel dürfen abweichen) —
 * kompensiert Anti-Aliasing-Drift zwischen Headless-Modi.
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:4173",
    trace: "on-first-retry",
    // Stabile Screenshots: keine animations, system font fallback identisch
    screenshot: "only-on-failure",
  },

  expect: {
    toHaveScreenshot: {
      // 2 % der Pixel duerfen abweichen — kompensiert Anti-Aliasing,
      // Font-Rendering-Drift zwischen Runs, framer-motion-Initial-Frames.
      maxDiffPixelRatio: 0.02,
      // Animations vor dem Screenshot stoppen
      animations: "disabled",
      // Caret unsichtbar
      caret: "hide",
    },
  },

  projects: [
    {
      name: "desktop-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 900 },
      },
    },
    {
      name: "tablet-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 820, height: 1180 },
      },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],

  webServer: {
    command: "pnpm preview",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
