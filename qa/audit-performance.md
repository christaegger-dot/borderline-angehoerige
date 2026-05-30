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

| Kennzahl                             | Wert                 | Bewertung        |
| ------------------------------------ | -------------------- | ---------------- |
| Performance-Score                    | **95**               | grün (≥ 90)      |
| First Contentful Paint               | 2,2 s (2206 ms)      | gelb             |
| Largest Contentful Paint (simuliert) | **2,6 s (2584 ms)**  | knapp über 2,5 s |
| LCP **beobachtet** (Trace)           | **~0,25 s (246 ms)** | sehr schnell     |
| Speed Index                          | 2,2 s                | gelb             |
| Total Blocking Time                  | 12 ms                | grün (< 200 ms)  |
| Cumulative Layout Shift              | 0                    | grün             |

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

## Diagnose & Entscheidung (kein Code-Eingriff)

Nach der Diagnose-Logik des Audit-Briefs:

1. Das LCP-Element **ist** der Shell → die Mitigation greift.
2. **Kein** Shell→React-Sprung (der React-Hero paintet kein grösseres Element
   später nach) → die im Brief skizzierten Fixes (React-Hero deckungsgleich
   halten / Shell-Removal-Timing) zielen auf ein Problem, das die Messung
   **nicht** zeigt.
3. `render-blocking-resources` meldet **0 ms** Einsparung; jede weitere
   Änderung wäre spekulativ und ohne stützende Messung — laut Audit-Regel
   ausgeschlossen.
4. TBT 12 ms (grün) → framer-motion bleibt am Root (Phase 3).

→ **Bewusst kein Code-Eingriff.** Der simulierte LCP von 2,6 s liegt knapp über
der 2,5-s-Linie; die beobachtete Paint-Zeit (246 ms) und der Score (95) sind
klar im grünen Bereich, und es gibt keinen messbar wirksamen Hebel.

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

## Phase 3 — JavaScript-Pfad (geprüft — kein Eingriff nötig)

`framer-motion` wird am Root geladen (`MotionProviders`,
`LazyMotion`/`domAnimation`) und betrifft TBT/INP, **nicht** LCP. Die Messung
zeigt **TBT 12 ms** (grün) — kein Blocking-Engpass. Ein Herauslösen aus dem
kritischen Pfad erfolgt laut Vorgabe nur bei auffälligem TBT; das ist nicht der
Fall. Daher **bewusst kein Eingriff**. Bleibt Beobachtungspunkt, falls TBT
künftig steigt. Route-Level-Splitting (lazy routes) ist vorhanden.

## Phase 4 — Verifikation (abgeschlossen)

Re-Audit gegen den Production-Build durchgeführt. Score 95 (≥ 90), TBT 12 ms,
CLS 0; LCP beobachtet ~246 ms (simuliert 2,6 s). Der `route-prerender`-Shell
trägt die LCP; es war **kein** weiterer Code-Eingriff erforderlich und keiner
messbar begründbar.

## Anhang — Nebenbeobachtungen (nicht Scope dieses Tasks)

Im selben Lauf lagen Routen **ohne** Prerender-Shell höher (simuliert):
`/soforthilfe` 1,5 s · `/wegweiser` 3,0 s · `/notfallkarte/erstellen` 3,5 s ·
`/materialien` 3,5 s · `/grenzen` 3,8 s. Für eine spätere, separate Betrachtung
vorgemerkt — hier nicht behandelt.
