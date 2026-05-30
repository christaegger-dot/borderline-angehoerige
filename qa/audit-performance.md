# Performance-Audit

**Stand:** 2026-05-30 · **Scope:** Startseite `/` (mobil, simuliertes Throttling)

## Methodik

Lighthouse (mobil, `simulate`-Throttling: 4× CPU, ~Slow-4G) gegen den
**Production-Build** (`pnpm build && pnpm preview`, `http://localhost:4173/`).
Der `route-prerender`-Shell existiert nur im Production-Build, nicht im
`vite dev` — daher niemals gegen den Dev-Server messen.

Runner: `pnpm audit:lighthouse` (`qa/scripts/lighthouse-audit.mjs`,
`lighthouse` als devDependency, schreibt nach `qa/output/`). In Umgebungen
ohne System-Chrome die Chromium-Binary über `CHROME_PATH` setzen, z. B.
`CHROME_PATH=…/chrome-linux/chrome pnpm audit:lighthouse`. Die `qa/output/`-
Reports sind regenerierbar und nicht eingecheckt.

Das LCP-**Element** zusätzlich live ermittelt (Playwright +
`PerformanceObserver` `largest-contentful-paint`, mobil emuliert/gedrosselt):
Lighthouse weist das LCP-Element als „n/a" aus, weil der Shell-Knoten beim
React-Mount entfernt ist und im späteren DOM-Snapshot nicht mehr auflösbar
ist. Der Live-Observer erfasst es zum Paint-Zeitpunkt korrekt.

## LCP-Mitigation: `route-prerender`-Shell (umgesetzt, greift)

Die Startseite liefert den Above-the-fold-Hero bereits **statisch im
initialen HTML** aus — er hängt nicht mehr am React-/JS-Pfad:

- `<section id="route-prerender">` in `client/index.html` (Kicker, H1
  «Orientierung in belasteten Beziehungen», Copy-Absatz, CTAs,
  Soforthilfe-Aside).
- `client/public/route-prerender.js` setzt auf `/` das Attribut
  `data-route-prerender="home"`; `client/public/startup-shell.css` regelt die
  Sichtbarkeit.
- `body[data-app-ready="true"]` blendet den Shell aus; `Router.tsx` entfernt
  ihn nach dem Route-Commit.
- Injektion ins gebaute HTML über `renderStaticRouteHtml` in `vite.config.ts`.

## Aktuelle Messung — `/` mobil (2026-05-30)

| Kennzahl                             | Wert                  | Bewertung        |
| ------------------------------------ | --------------------- | ---------------- |
| Performance-Score                    | **95**                | grün (≥ 90)      |
| First Contentful Paint               | 2,2 s (2206 ms)       | gelb             |
| Largest Contentful Paint (simuliert) | **2,6 s (≈2556 ms)**  | knapp über 2,5 s |
| LCP **beobachtet** (Trace)           | **~0,25 s (≈246 ms)** | sehr schnell     |
| Speed Index                          | 2,2 s                 | gelb             |
| Total Blocking Time                  | 8–12 ms               | grün (< 200 ms)  |
| Cumulative Layout Shift              | 0                     | grün             |

**LCP-Element:** der statische Shell-Hero (`#route-prerender`, Copy/H1) —
**nicht** der React-Hero aus `Home.tsx`. Per Live-Observer bestätigt: Der LCP
feuert bei ~246 ms auf dem Shell; danach wird der Shell beim React-Mount
entfernt. **Kein** späterer, grösserer React-Paint überholt ihn — es gibt also
**keinen** Shell→React-LCP-Sprung.

**Einordnung simuliert vs. beobachtet:** Die 2,6 s sind Lighthouses
Lantern-**Simulation** (Modell für Slow-4G), nicht die reale Paint-Zeit; der
Trace zeigt den Shell-Paint **beobachtet bei 246 ms**. Der Audit
`render-blocking-resources` meldet **Score 1 / 0 ms Einsparpotenzial** — der
kritische Pfad ist bereits ausgereizt.

## Diagnose & Entscheidung (LCP)

Nach der Diagnose-Logik des Audit-Briefs:

1. Das LCP-Element **ist** der Shell → die Mitigation greift.
2. **Kein** Shell→React-Sprung (der React-Hero paintet kein grösseres Element
   später nach) → die im Brief skizzierten Fixes (React-Hero deckungsgleich
   halten / Shell-Removal-Timing) zielen auf ein Problem, das die Messung
   **nicht** zeigt.
3. `render-blocking-resources` meldet **0 ms** Einsparung → für die LCP selbst
   ist kein weiterer Hebel vorhanden.

→ **Für die LCP von `/` kein Eingriff** (Shell trägt sie, Score grün). Der
beobachtete Engpass liegt nicht bei der LCP, sondern bei der **initialen
JS-Grösse / dem Root-Preload** — siehe Phase 3 (framer-motion vom Root-Pfad
gelöst).

## Phase 1 — Baseline (historisch, **vor** dem `route-prerender`-Shell)

| Kennzahl                 | Wert   |
| ------------------------ | ------ |
| Performance-Score        | 62     |
| First Contentful Paint   | 2,1 s  |
| Largest Contentful Paint | 5,71 s |
| Total Blocking Time      | 40 ms  |
| Cumulative Layout Shift  | 0      |
| Speed Index              | 2,1 s  |

**LCP-Element (damals):** der Hero-Absatz in `Home.tsx` (clientseitig nach
Hydration gerendert). Dieser Wert ist durch den Shell überholt (Score 62 → 95;
beobachteter LCP 5,71 s → ~0,25 s) und nur noch als Ausgangspunkt dokumentiert.

## Phase 2 — Bilder & Fonts (abgeschlossen)

- Hero-Illustration als `<img>` mit `width`/`height` → kein Layout-Shift.
- `font-display: swap`; kritische Fonts (Source Serif Hero-H1, Inter Body) als
  `<link rel="preload">`, Font-Faces inline im `<head>` (kein Extra-Request).

## Phase 3 — JavaScript-Pfad (Eingriff: framer-motion vom Root-Pfad gelöst)

**Befund:** `framer-motion` (80 KB raw / ~28 KB gzip) wurde über den
`manualChunks`-Eintrag `"vendor-motion": ["framer-motion"]` in einen festen
Vendor-Chunk gezwungen, der im **Root-Critical-Path von `/` modulepreloaded**
und beim `/`-Load auch tatsächlich geladen wurde — obwohl `/` (Home) keine
Motion-Komponente above-the-fold nutzt und `MotionProviders` bereits `lazy()`
ist (nur für `requiresMotion`-Routen gemountet).

**Eingriff (minimal):** Den `manualChunks`-Eintrag für `vendor-motion`
entfernt. Rollup bündelt `framer-motion` jetzt in die Async-Chunks seiner
tatsächlichen Importeure (lazy `MotionProviders` + Seiten-Chunks), statt es
fest in den Root-Preload zu heben.

**Messbar (gegen Baseline, mobil, Production-Build):**

- `/` lädt **kein** Motion-Chunk mehr (vorher `vendor-motion` ~28 KB gzip
  geladen). JS-Requests auf `/`: **9 → 5**.
- Root-`modulepreload`: vorher `index · vendor-utils · vendor-motion` → jetzt
  `index · vendor-utils · vendor-radix-slot` (kein Motion mehr).
- Keine Chunk-Duplizierung über Routen (eine Motion-Quelle: `MotionProviders`-
  Chunk); Route-Chunk-Grössen unverändert; Gesamt-JS unverändert.
- Lighthouse `/` nach Eingriff: Score **96** (Baseline 95), LCP **2414 ms**
  (Baseline 2556), TBT **0 ms** (Baseline 8), CLS 0 — leicht **besser**, keine
  Regression. (Lantern modelliert die `/`-LCP primär über Shell-HTML/CSS; die
  Verbesserung kommt aus dem schlankeren, nicht mehr root-preloadeten JS.)
- Keine Motion-Regression: ContentSection-Akkordeons und `requiresMotion`-
  Seiten rendern/toggeln fehlerfrei; 362 Unit-Tests grün.

TBT war bereits grün (8–12 ms); der Hebel war also nicht TBT, sondern die
**initiale JS-Grösse / der Root-Preload** von `/`. Route-Level-Splitting (lazy
routes) war bereits vorhanden.

## Phase 4 — Verifikation (abgeschlossen)

Re-Audit gegen den Production-Build nach dem Eingriff: Score 96 (Baseline 95),
LCP simuliert 2414 ms (Baseline 2556) / beobachtet ~0,25 s, TBT 0 ms, CLS 0 —
leicht besser, keine Regression, plus die oben belegte Reduktion der
`/`-Initial-JS (9 → 5 Requests). `check`, `test` (362), `lint`, `build` grün.

## Optionale Kleinigkeiten

- **Erledigt:** Interner Link auf `/selbsthilfegruppen` (301 → `/beratung`)
  in `UnterstuetzenTherapie.tsx` direkt auf `/beratung` gesetzt — spart einen
  301-Hop.
- **Offen (bewusst nicht angefasst):** `uebersichtsbogen.png` (1,1 MB,
  reiner Download, nicht eingebettet) → WebP-Konvertierung. Reine
  Download-Gewichts-Optimierung, niedrige Priorität — für später vorgemerkt.

## Anhang — Nebenbeobachtungen (nicht Scope dieses Tasks)

Im selben Lauf lagen Routen **ohne** Prerender-Shell höher (simuliert):
`/soforthilfe` 1,5 s · `/wegweiser` 3,5 s · `/notfallkarte/erstellen` 3,5 s ·
`/materialien` 3,5 s · `/grenzen` 3,8 s. Für eine spätere, separate Betrachtung
vorgemerkt — hier nicht behandelt.
