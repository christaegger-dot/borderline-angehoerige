# Visual-Regression-Tests

Screenshot-basierte Tests, die unbeabsichtigte visuelle Drift nach Refactors
erkennen. Baseline-Screenshots liegen in
`e2e/visual-regression.spec.ts-snapshots/` und sind Source-of-Truth.

## Setup (einmalig)

```bash
# Browsers installieren — falls noch nicht vorhanden
pnpm playwright install chromium

# Production-Build, gegen den die Tests laufen
pnpm build
```

## Tests laufen lassen

```bash
# Vergleicht gegen Baseline, schlaegt fehl bei Diffs > 2 %
pnpm test:visual

# Aktualisiert Baselines — nach absichtlichen Layout-Aenderungen
pnpm test:visual:update

# Nur ein Projekt (Default: alle 3 Viewports)
pnpm test:visual --project=desktop-chromium
pnpm test:visual --project=tablet-chromium
pnpm test:visual --project=mobile-chromium
```

## Projekte (Viewports)

| Projekt          | Viewport   | Geraet        |
| ---------------- | ---------- | ------------- |
| desktop-chromium | 1280 x 900 | Desktop       |
| tablet-chromium  | 820 x 1180 | iPad portrait |
| mobile-chromium  | Pixel 7    | Mobile        |

## Was getestet wird

- Volle Seite Screenshot (`fullPage: true`) der wichtigsten Pages.
- Hero-Region der Home (Editorial-Section mit Leuchtturm-Illustration).
- Editorial-Section mit Aside auf Verstehen (Eisberg-Illustration).

Pages-Auswahl folgt strukturellen Unterschieden, nicht jede Detail-Page
einzeln. Detail-Pages folgen demselben Komponenten-Pattern und werden
durch die Hauptseiten-Tests indirekt abgedeckt.

## Threshold

`maxDiffPixelRatio: 0.02` — 2 % der Pixel duerfen abweichen.
Kompensiert Anti-Aliasing-Drift, framer-motion-Initial-Frames und
Font-Rendering-Unterschiede zwischen Headless-Modi.

## Bewusst NICHT in der Test-Suite

- `/grenzen` und `/materialien`: zeigten Drift zwischen Runs trotz
  `animations: "disabled"`. Vermutlich timing-sensitive Inhalte oder
  framer-motion-Animations. Koennen lokal mit `pnpm test:visual:update`
  generiert und ergaenzt werden, sobald die Quelle der Drift gefunden ist.
- Detail-Pages (Diagnostik, Begleiterkrankungen, Buchempfehlungen, etc.):
  folgen Page-Pattern, durch FAQ + Glossar + Fachstelle abgedeckt.

## Workflow nach Code-Aenderungen

1. Aenderung machen.
2. `pnpm test:visual` laufen lassen.
3. Bei Failures: `playwright-report/index.html` oeffnen — zeigt
   Side-by-Side Baseline / Actual / Diff fuer jede fehlgeschlagene Seite.
4. Wenn der Diff **gewollt** ist: `pnpm test:visual:update` und die neuen
   Baseline-Screenshots committen.
5. Wenn der Diff **ungewollt** ist: Code anpassen.

## CI

Visual-Regression-Tests laufen automatisch bei jedem Pull-Request gegen
`main` über die GitHub-Action `.github/workflows/visual-regression.yml`.

- Trigger: Änderungen an `client/**`, `e2e/**`, `playwright.config.ts`,
  oder den Dependencies.
- Bei Failures: Playwright-Report und Diff-Screenshots werden als
  Artifact hochgeladen (14 Tage Aufbewahrung). Öffnen via Actions-Tab
  → fehlgeschlagener Run → `playwright-report` herunterladen →
  `index.html` öffnen.
