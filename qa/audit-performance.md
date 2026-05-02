# audit/performance

> Historischer Audit-Stand:
> Dieser Bericht beschreibt den damaligen Mess- und Architekturstand.
> Einzelne Hinweise zu entfernten `files.manuscdn.com`-Assets sind
> inzwischen technisch ueberholt und nicht als aktueller
> Produktionsbefund zu lesen. Fuer den aktuellen Stand siehe
> `docs/manus-cdn-audit.md` und `qa/audit-pdf-handouts.md`.

## Meta

- Repo: `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
- Worktree: `/tmp/borderline-performance.Sw92ge`
- Branch: `audit/performance`
- Basis: `origin/main`
- Prompt-Sammlung: im Audit-Worktree erzeugt; Rohartefakte bleiben optional

## Status

- Phase 1: abgeschlossen
- Phase 2: abgeschlossen
- Phase 3: offen
- Phase 4: offen

## Notizen

- Produktcode bleibt in Phase 1 und 2 read-only.
- Audit-Artefakte duerfen unter `qa/` und `qa/scripts/` entstehen.
- Wichtiger Caveat fuer dieses Repo:
  - `22` statische Direktseiten unter `client/public/**/index.html` ueberschreiben viele SPA-Routen beim direkten Laden.
  - Lighthouse auf `/materialien` oder `/selbstfuersorge` misst deshalb aktuell die statische Fallback-Seite, nicht die React-Seite aus `client/src/pages/*`.

## Phase 1 - Inventur

### 1.1 Lighthouse Performance

- Gemessen wurde auf lokal gebautem Produktionsstand (`npm run build` + Node-Server auf Port `4317`).
- Mobile und Desktop wurden fuer drei repraesentative Direktpfade gemessen:
  - `/`
  - `/materialien`
  - `/selbstfuersorge`
- HTML- und JSON-Reports wurden lokal erzeugt und in eine zusammenfassende Tabelle ueberfuehrt.
- Die oeffentliche Netlify-URL `https://borderline-angehoerige.netlify.app` antwortete am `21. April 2026` mit `503`, daher war keine Produktions-Gegenprobe moeglich.

| Route              | Dokumenttyp beim Direktaufruf                                    | Formfaktor | Score | FCP      | LCP      | Speed Index | TBT    | CLS        | Hinweis                                     |
| ------------------ | ---------------------------------------------------------------- | ---------- | ----- | -------- | -------- | ----------- | ------ | ---------- | ------------------------------------------- |
| `/`                | SPA `client/index.html`                                          | Mobile     | `66`  | `5.18 s` | `5.71 s` | `5.18 s`    | `0 ms` | `0`        | echter SPA-Load                             |
| `/`                | SPA `client/index.html`                                          | Desktop    | `97`  | `0.86 s` | `1.06 s` | `0.86 s`    | `0 ms` | `0.000178` | echter SPA-Load                             |
| `/materialien`     | statische Direktseite `client/public/materialien/index.html`     | Mobile     | `100` | `0.90 s` | `0.90 s` | `0.90 s`    | `0 ms` | `0`        | vorher echter `301` auf `/materialien/`     |
| `/materialien`     | statische Direktseite `client/public/materialien/index.html`     | Desktop    | `100` | `0.24 s` | `0.24 s` | `0.24 s`    | `0 ms` | `0`        | vorher echter `301` auf `/materialien/`     |
| `/selbstfuersorge` | statische Direktseite `client/public/selbstfuersorge/index.html` | Mobile     | `100` | `0.90 s` | `0.90 s` | `0.90 s`    | `0 ms` | `0`        | vorher echter `301` auf `/selbstfuersorge/` |
| `/selbstfuersorge` | statische Direktseite `client/public/selbstfuersorge/index.html` | Desktop    | `100` | `0.24 s` | `0.24 s` | `0.24 s`    | `0 ms` | `0`        | vorher echter `301` auf `/selbstfuersorge/` |

#### Wichtigste Lighthouse-Befunde

1. Root-Route `/`
   - Mobile-LCP ist klar im roten Bereich.
   - LCP-Element ist der Hero-Absatz in `client/src/pages/Home.tsx`.
   - Die LCP-Zerlegung zeigt `92%` Render-Delay statt Server- oder Bild-Delay.
   - Haupttreiber laut Lighthouse:
     - render-blocking `assets/index-*.css`
     - global geladenes `fallback.css`
     - viel ungenutztes JS in `index-*.js`, `vendor-motion`, `vendor-radix`, `vendor-utils`

2. Unterseiten `/materialien` und `/selbstfuersorge`
   - Die perfekten Scores sind nur fuer die statischen Fallback-Dokumente gueltig.
   - Diese Direktaufrufe landen nicht in der React-App, sondern in separaten HTML-Dateien unter `client/public/`.
   - Zusaetzlich entsteht ein echter `301` von ohne Slash auf mit Slash.

3. Diagnose-Relevanz
   - Route-zu-Route-Vergleiche sind in dieser Architektur nur eingeschraenkt sinnvoll.
   - Fuer echte SPA-Performance ist die Root-Route im Moment die aussagekraeftigste Messstelle.

### 1.2 Bundle-Analyse

- `npm run build` lief erfolgreich.
- Auslieferungsvolumen in `dist/public/assets`:
  - JavaScript gesamt: `1,198,874` Bytes raw / `335,231` Bytes gzip
  - CSS gesamt: `142,917` Bytes raw / `23,185` Bytes gzip
  - Gesamt Assets: `1,341,791` Bytes raw / `358,416` Bytes gzip

#### Top-10 Chunks nach Raw-Groesse

| Chunk                      | Typ | Raw         | Gzip       | Einordnung                                          |
| -------------------------- | --- | ----------- | ---------- | --------------------------------------------------- |
| `index-*.js`               | JS  | `235.47 kB` | `70.87 kB` | groesster Initial-Chunk                             |
| `index-*.css`              | CSS | `142.13 kB` | `22.87 kB` | global render-blocking                              |
| `vendor-motion-*.js`       | JS  | `126.13 kB` | `41.33 kB` | `framer-motion`, schwer fuer Root                   |
| `vendor-utils-*.js`        | JS  | `77.68 kB`  | `24.39 kB` | `clsx`, `tailwind-merge`, `wouter`, `sonner`, u. a. |
| `vendor-radix-*.js`        | JS  | `53.82 kB`  | `18.74 kB` | viele UI-Primitives im Shared-Pfad                  |
| `Selbstfuersorge-*.js`     | JS  | `51.87 kB`  | `12.13 kB` | groesster Route-Chunk                               |
| `UnterstuetzenKrise-*.js`  | JS  | `40.63 kB`  | `8.50 kB`  | grosser Route-Chunk                                 |
| `UnterstuetzenAlltag-*.js` | JS  | `36.56 kB`  | `8.92 kB`  | grosser Route-Chunk                                 |
| `Verstehen-*.js`           | JS  | `36.10 kB`  | `9.23 kB`  | grosser Route-Chunk                                 |
| `Grenzen-*.js`             | JS  | `32.55 kB`  | `8.09 kB`  | grosser Route-Chunk                                 |

#### Einordnung

- Positiv:
  - Alle Seiten in `client/src/app/routes.ts` werden per `React.lazy()` geladen.
  - Route-Level-Code-Splitting ist also grundsaetzlich vorhanden.
- Negativ:
  - Der Initialpfad bleibt trotzdem schwer:
    - `index-*.js`
    - `vendor-motion`
    - `vendor-radix`
    - `vendor-utils`
    - globales CSS
- Auffaellig:
  - `vendor-react` wird als leerer Chunk ausgegeben.
  - Das deutet auf eine Manual-Chunk-Regel ohne echten Nutzwert hin.

### 1.3 Dependency-Audit

- `dependencies`: `28`
- `devDependencies`: `29`
- Scanscope fuer Import-Abgleich: `141` Quell- und Konfigurationsdateien

#### Wahrscheinlich ungenutzte Runtime-Dependencies

- `unmute-ios-audio`
  - im Repo nicht importiert gefunden
- `zod`
  - im Repo nicht importiert gefunden
  - taucht aber noch in `vite.config.ts` innerhalb von `manualChunks.vendor-utils` auf

#### Wahrscheinlich ungenutzte Dev-Dependency

- `@tailwindcss/typography`
  - im Repo nicht referenziert gefunden

#### Sicherheitslage

- `npm audit` war hier nicht belastbar, weil `npm` ohne eigenes Lockfile abbricht.
- Ueber `pnpm-lock.yaml` liess sich ein Audit mit `pnpm` auswerten.
- Ergebnis:
  - `0` critical
  - `4` high
  - `5` moderate
- Betroffene Module:
  - `vite`
  - `rollup`
  - `picomatch`
  - `esbuild`
- Einordnung:
  - Der Schwerpunkt liegt in Build-/Dev-Tooling, nicht in der Runtime-App selbst.
  - Trotzdem ist das fuer Repo-Hygiene und lokale Entwicklungs-Sicherheit relevant.

### 1.4 Bild-Audit

- Lokale Bilddateien im Repo: `6`
- Formate:
  - `2` WebP
  - `3` PNG
  - `1` JPG
- Lokale Bildgroessen:
  - groesste lokale Datei: `client/public/favicon-512.png` mit `218,077` Bytes
  - groesste inhaltliche Preview: `client/public/notfallplan-krise-v03-preview.webp` mit `150,688` Bytes

#### Wichtiger Kontext

- Viele inhaltliche Karten und Infografiken kommen nicht aus dem Repo, sondern als entfernte WebP-Dateien von `files.manuscdn.com`.
- Das lokale Bildinventar bildet deshalb nur den statischen Sockel ab, nicht die gesamte echte Bildoberflaeche der App.

#### Konkreter Bild-Befund

- Lighthouse meldet auf `/` Bildverschwendung fast ausschliesslich durch `favicon-192.png`.
- Diese Datei wird als 40x40-Brand-Logo in
  - `client/src/components/Layout.tsx`
  - `client/src/components/layout/HeaderNav.tsx`
    verwendet.
- Dadurch entstehen auf der Home-Route je nach Audit rund `22-25 KiB` vermeidbare Mehrlast.

### 1.5 Lazy-Loading und Code-Splitting

- Routing:
  - gut: alle Seitenkomponenten lazy-loaded
- Shared Bundle:
  - schlecht: der Startpfad zieht weiterhin viel Shared-JS
- Motion:
  - `framer-motion` liegt in einem eigenen Chunk, aber Home nutzt es above the fold
  - dadurch wird `vendor-motion` fuer den Root-Load effektiv Teil des kritischen Pfads
- Sonderfall Direktseiten:
  - `22` statische `client/public/**/index.html`-Dateien umgehen das SPA-Routing bei Direktaufruf ganz
  - das ist kein klassischer Performance-Gewinn, sondern eine zweite Auslieferungsarchitektur

### 1.6 Layout-Shift-Quellen

- CLS ist ueber alle gemessenen Direktpfade praktisch null.
- Positive Indikatoren:
  - asynchrones Google-Font-Loading mit Fallback-Metrik-Overrides in `client/index.html`
  - Breite/Hoehe an den geprueften `img`-Elementen gesetzt
  - keine auffaelligen Layout-Shifts in den Lighthouse-Werten
- Fazit:
  - CLS ist aktuell kein heisser Performance-Hotspot.

### 1.7 Gesamtbild

| Bereich                  | Befund                                                                        |
| ------------------------ | ----------------------------------------------------------------------------- |
| Root-Route `/`           | Mobile deutlich zu langsam, LCP `5.71 s`                                      |
| Unterseiten-Direct-Loads | schnell, aber oft nur statische Fallback-Seiten statt SPA                     |
| Bundle                   | Initialpfad zu gross, besonders `index-*.js` und `vendor-motion`              |
| CSS                      | globales `index.css` plus `fallback.css` blockieren den Root-Render           |
| Bilder                   | lokaler Sockel klein; konkrete Verschwendung beim 192px-Favicon als 40px-Logo |
| Dependencies             | wenige wahrscheinliche Orphans, aber Tooling-Audit nicht sauber               |
| Security im Tooling      | `4 high`, `5 moderate` via `pnpm`                                             |
| CLS                      | unauffaellig                                                                  |

## Top-5 Hotspots

1. `client/index.html`
   - globale Fallback-Shell plus `fallback.css` im normalen Root-Dokument
   - direkt relevant fuer Root-FCP/LCP

2. `client/public/**/index.html`
   - `22` statische Direktseiten ueberschreiben viele SPA-Routen
   - verfremden Unterseiten-Performance und erzeugen Direktzugriffs-Inkonsistenzen

3. `vite.config.ts`
   - der Initialpfad bleibt trotz Lazy-Routes gross
   - `vendor-motion`, `vendor-radix` und `vendor-utils` sind starke Shared-Kosten

4. `client/src/pages/Home.tsx`
   - Above-the-fold-Nutzung von `framer-motion`
   - LCP-Element ist Text mit dominantem Render-Delay

5. `client/src/components/Layout.tsx` und `client/src/components/layout/HeaderNav.tsx`
   - uebergrosse PNG-Datei als kleines Brand-Logo

## Vorlaeufige Phase-1-Hauptbefunde

1. Die eigentliche Performance-Schwachstelle sitzt nicht breit im Routing, sondern konzentriert sich auf die Root-SPA.
2. Die Unterseiten-Scores sind ohne Architektur-Hinweis irrefuehrend, weil Direktaufrufe auf statische Fallback-Dokumente gehen.
3. Das groesste Performance-Thema ist damit nicht nur Bundle-Groesse, sondern die doppelte Entry-Architektur.
4. Kleinere Optimierungen wie ein leichteres Logo lohnen sich, aber sie loesen das Kernproblem nicht.

## Phase 2 - Massnahmenkatalog

### P1 - Groesster Nutzen zuerst

1. Direktzugriffs-Architektur entscheiden und vereinheitlichen
   - Problem:
     - `22` statische Direktseiten unter `client/public/**/index.html` konkurrieren mit der SPA.
   - Optionen:
     - SPA soll Direktaufrufe selbst bedienen:
       - statische Route-HTMLs abbauen oder auf wenige echte Spezialfaelle reduzieren
     - statische Direktseiten sollen bewusst bleiben:
       - dann muessen sie fachlich und technisch als Primaerziel gepflegt werden
       - inklusive klarer Weiterfuehrung in die SPA
   - Erwarteter Gewinn:
     - konsistente User-Journey
     - valide Route-Performance-Messung
     - Wegfall der Slash-Redirects fuer direkte Routeinstiege
   - Aufwand:
     - `mittel-hoch`
   - Risiko:
     - `hoch`, weil Produktverhalten und SEO betroffen sind

2. Root-Fallback aus dem kritischen JS-Pfad herausnehmen
   - Problem:
     - `client/index.html` laedt `fallback.css` global und rendert eine komplette Fallback-Shell, die erst nach React-Start entfernt wird.
   - Moegliche Richtung:
     - nur noch echtes `noscript`-Fallback
     - oder deutlich kleineres Inline-Fallback statt voller Direktseiten-Shell
   - Erwarteter Gewinn:
     - beste Chance auf spuerbaren Gewinn bei Mobile-FCP/LCP auf `/`
   - Aufwand:
     - `mittel`
   - Risiko:
     - `mittel-hoch`, weil Resilienz-/Fallback-Verhalten bewusst beruehrt wird

3. Initialen Root-Pfad leichter machen
   - Problem:
     - `Home` zieht einen schweren Shared-Pfad, insbesondere `framer-motion`
   - Vorschlag:
     - Above-the-fold-Animationen reduzieren oder per CSS ersetzen
     - spaeter sichtbare Motion-Teile spaeter laden
   - Erwarteter Gewinn:
     - geringerer Initial-Download auf `/`
   - Aufwand:
     - `mittel`
   - Risiko:
     - `niedrig-mittel`

### P2 - Klar und wahrscheinlich risikoarm

1. Brand-Logo korrekt groessieren
   - Problem:
     - `favicon-192.png` wird als kleines UI-Logo missbraucht
   - Vorschlag:
     - eigene kleine Logo-Datei oder SVG fuer `40x40`
   - Erwarteter Gewinn:
     - kleiner, aber sauberer Bild-Fix
   - Aufwand:
     - `klein`
   - Risiko:
     - `niedrig`

2. `fallback.css` nur dort laden, wo es wirklich gebraucht wird
   - Problem:
     - Root-Seite laedt Fallback-Styles auch im normalen JS-Fall
   - Vorschlag:
     - Root separat behandeln; statische Direktseiten duerfen ihr eigenes Stylesheet behalten
   - Erwarteter Gewinn:
     - weniger render-blocking CSS auf `/`
   - Aufwand:
     - `klein-mittel`
   - Risiko:
     - `mittel`, weil Fallback-Verhalten getestet werden muss

3. Orphans und Tooling-Schlacken aufraeumen
   - Kandidaten:
     - `unmute-ios-audio`
     - `zod`
     - `@tailwindcss/typography`
   - Erwarteter Gewinn:
     - weniger Wartungslast, klareres Paketbild
   - Aufwand:
     - `klein`
   - Risiko:
     - `niedrig`

4. Vite/Rollup/Picomatch/esbuild auf Audit-Stand bringen
   - Problem:
     - `pnpm audit` meldet mehrere `high`/`moderate` Tooling-Treffer
   - Erwarteter Gewinn:
     - sauberere Build-/Dev-Hygiene
   - Aufwand:
     - `klein-mittel`
   - Risiko:
     - `mittel`, weil Toolchain-Upgrades Regressionspotenzial haben

### P3 - Spaeter oder nur bei weiterem Perf-Fokus

1. Preconnect-Hinweise straffen
   - Befund:
     - Lighthouse warnt, dass mehr als zwei `preconnect`-Verbindungen gesetzt sind
   - Nutzen:
     - eher Feintuning als grosser Hebel

2. Bundle-Analyzer nur temporar zuschalten
   - Nutzen:
     - fuer spaetere Vertiefung hilfreich
   - Risiko:
     - derzeit kein direkter Nutzergewinn

## Vorlaeufige Phase-2-Hauptbefunde

1. Die naechste sinnvolle Performance-Arbeit ist keine Kleinoptimierung, sondern eine Entscheidung ueber Direktseiten vs. echte SPA-Direktloads.
2. Solange `client/index.html` globale Fallback-Last und Home-Initialgewicht traegt, bleibt `/` mobil der eigentliche Engpass.
3. Die leichtesten Sofortgewinne sitzen danach beim kleinen Brand-Logo und bei potenziellen Paket-Leichen.

## Stopp

- Phase 2 ist hiermit abgeschlossen.
- Phase 3 sollte erst beginnen, wenn entschieden ist, wie die Direktseiten-/Fallback-Architektur kuenftig aussehen soll.
