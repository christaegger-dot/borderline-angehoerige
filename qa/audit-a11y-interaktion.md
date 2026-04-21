# audit/a11y-interaktion

## Meta

- Repo: `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
- Worktree: `/tmp/borderline-a11y-interaktion.F2Sz3e`
- Branch: `audit/a11y-interaktion`
- Basis: `origin/main`
- Prompt-Sammlung: `/tmp/borderline-a11y-interaktion.F2Sz3e/qa/codex-audit-prompts.md`
- Audit-Datum: `2026-04-21`
- Lokal gepruefte URL: `http://127.0.0.1:4173`
- Repräsentative Routen:
  - `/`
  - `/soforthilfe`
  - `/materialien`
  - `/notfallkarte`

## Status

- Phase 1: abgeschlossen
- Phase 2: abgeschlossen
- Phase 3: abgeschlossen
- Phase 4: abgeschlossen

## Notizen

- Produktcode blieb in Phase 1 und 2 read-only.
- Audit-Artefakte liegen unter `qa/` und `qa/scripts/`.
- Audit-only Tools wurden lokal im Temp-Worktree installiert, ohne
  `package.json` oder Lockfiles zu aendern:
  `playwright`, `@axe-core/playwright`, `lighthouse`.
- Die App lief fuer die Browser-Audits ueber den gebauten Express-Server auf
  Port `4173`.

## Kurzfazit

Release-Readiness nach Phase 4: **B**

Warum nicht A:

1. Die groessten, klar repo-seitig loesbaren A11y-Funde wurden behoben.
2. Es bleiben aber zwei Follow-up-Bloecke:
   - sehr reduzierte Landmark-/Navigations-Struktur auf den statischen
     Direktseiten, vor allem `/materialien`
   - 25 heuristische Overlap-Funde an Scroll-Kanten auf `/` und
     `/notfallkarte`, vor allem im Zusammenspiel von Sticky-Header und mobilem
     Soforthilfe-FAB

## Findings

### 1. Vorheriger Kontrast-Bug durch globales `fallback.css`-Link-Styling

- Schwere initial: hoch
- Status: **in Phase 3 behoben**

Ursache:

- [fallback.css](/tmp/borderline-a11y-interaktion.F2Sz3e/client/public/fallback.css:41)
  setzte `a { color: var(--accent-strong); }` unscoped.
- Diese Regel ist unlayered und gewann dadurch gegen die layered Tailwind-
  Utilities der SPA.
- Sichtbare Folge auf `/`: brauner Text auf dunklem Hintergrund, obwohl
  Komponenten `text-white` bzw. `text-white/90` deklarieren.

Betroffene Stellen:

- Hero-CTA in [Home.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/pages/Home.tsx:138)
- Footer-Links in [Layout.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/components/Layout.tsx:102)
  und [Layout.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/components/Layout.tsx:163)

Automatischer Nachweis vor Fix:

- Lighthouse Accessibility `/`: `0.96`
- Axe `/`: `2` Violations
  - `color-contrast`
  - `region`
- Direkter Browser-Check vor Fix: Footer-Link und Hero-CTA renderten als
  `rgb(127, 68, 52)` statt weiss

Ergebnis nach Fix:

- Lighthouse Accessibility `/`: `1.00`
- Axe `/`: `0` Violations
- Direkter Browser-Check nach Fix:
  - Footer-Link: `oklab(... / 0.9)` = weiss mit 90% Alpha
  - Hero-CTA: `rgb(255, 255, 255)`

### 2. Unbeschriftete Formularelemente auf `/notfallkarte`

- Schwere initial: mittel
- Status: **in Phase 3 behoben**

Befund vor Fix:

- `page-structure.json` meldete auf `/notfallkarte` `4` unlabelled Controls.
- Betroffen waren placeholder-only Eingaben fuer Strategien und Notizen.

Relevante Stellen:

- Strategien:
  [Notfallkarte.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/pages/Notfallkarte.tsx:463)
- Notizen:
  [Notfallkarte.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/pages/Notfallkarte.tsx:493)
- zusaetzlich zukunftssicher fuer spaeter hinzugefuegte Kontaktzeilen:
  [Notfallkarte.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/pages/Notfallkarte.tsx:134)

Ergebnis nach Fix:

- `page-structure.json` meldet auf `/notfallkarte` jetzt `0` unlabelled Controls.

### 3. Notfall-Hinweis ausserhalb von Landmarks

- Schwere initial: mittel
- Status: **in Phase 3 behoben**

Vor Fix:

- Axe meldete auf `/` die Violation `region`.
- Ursache war der Notfall-Hinweis-Block zwischen Header und Main, der in keiner
  Landmark lag.

Relevante Stelle:

- [Layout.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/components/Layout.tsx:50)

Ergebnis nach Fix:

- Block ist jetzt ein
  [aside mit `aria-label="Notfallhinweis"`](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/components/Layout.tsx:50)
- Axe `/`: `0` Violations

### 4. Statische Direktseiten haben reduzierte Landmark-/Navigations-Parität

- Schwere: mittel
- Status: **Follow-up**

Befund:

- `/soforthilfe` direkt:
  `main=1`, `nav=0`, `header=1`, `footer=1`
- `/materialien` direkt:
  `main=1`, `nav=0`, `header=1`, `footer=0`

Relevante Stellen:

- [client/public/soforthilfe/index.html](/tmp/borderline-a11y-interaktion.F2Sz3e/client/public/soforthilfe/index.html:36)
- [client/public/materialien/index.html](/tmp/borderline-a11y-interaktion.F2Sz3e/client/public/materialien/index.html:36)

Bewertung:

- Das ist nicht "kaputt", sondern Folge der bewusst sehr schlanken
  Direktseiten-Strategie.
- Fuer Accessibility und Orientierung ist die Abweichung zur eigentlichen
  App-Huelle aber relevant, vor allem bei `/materialien`, wo direkte
  Rueckwege/Landmarks minimal sind.

### 5. Scroll-Kanten-Overlap durch Sticky-Header und mobiles Soforthilfe-FAB

- Schwere: niedrig bis mittel
- Status: **Follow-up**

Automatischer Sweep:

- `interaction-overlap.json` final:
  `25` Funde
- Verteilung:
  - `/` mobile: `6`
  - `/` tablet: `4`
  - `/` desktop: `1`
  - `/notfallkarte` mobile: `4`
  - `/notfallkarte` tablet: `4`
  - `/notfallkarte` desktop: `4`
  - `/notfallkarte` wide: `2`

Muster:

- viele Funde werden vom Sticky-Header ueberdeckt
  in [HeaderNav.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/components/layout/HeaderNav.tsx:35)
- mehrere Funde betreffen den mobilen Soforthilfe-FAB
  in [Layout.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/components/Layout.tsx:205)

Wichtige Einordnung:

- `click-reachability.json` final:
  `179` heuristisch gepruefte Ziele, `2` Failures
- beide Failures sind dieselbe `Situations-Wegweiser`-Instabilitaet
  durch detached DOM im Trial-Click und kein stabil reproduzierter
  Nutzerfehler

Bewertung:

- aktuell eher **Scroll-/Overlay-Risiko** als bestaetigter massiver
  Klick-Defekt
- sollte visuell/manual noch einmal bestaetigt werden, bevor hier ein groesserer
  Layout-Fix in Produktcode geht

## Phase 1 - Inventur

### 1.1 Lighthouse Accessibility

Desktop-Run:

| Route          | Score initial | Score final |
| -------------- | ------------- | ----------- |
| `/`            | `0.96`        | `1.00`      |
| `/soforthilfe` | `1.00`        | `1.00`      |
| `/materialien` | `1.00`        | `1.00`      |

### 1.2 Axe

Vor Fix:

- `/`: `2` Violations
  - `color-contrast`
  - `region`
- `/soforthilfe`: `0`
- `/materialien`: `0`

Nach Fix:

- `/`: `0`
- `/soforthilfe`: `0`
- `/materialien`: `0`

### 1.3 Struktur-Spotchecks

Positiv:

- alle geprueften Routen mit genau einem `h1`
- keine Heading-Spruenge auf den geprueften Routen
- Skip-Link vorhanden in
  [Layout.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/components/Layout.tsx:41)
- Such-Overlay schliesst auf `Escape`
  in [Search.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/components/Search.tsx:57)
- Reduced Motion vorhanden in
  [index.css](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/index.css:550)
- Focus-Indikatoren im Code breit vorhanden, z.B.
  [Layout.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/components/Layout.tsx:43)

### 1.4 Interaktions-Overlap-Test

Artefakt:

- `qa/interaction-overlap.json`

Befund:

- `25` heuristische Overlap-Funde
- Schwerpunkt: Sticky-Header / mobiler Soforthilfe-FAB

### 1.5 Klick-Erreichbarkeits-Test

Artefakt:

- `qa/click-reachability.json`

Befund:

- `179` Ziele geprueft
- `177` Passes
- `2` Failures, beide `Situations-Wegweiser`-detached-DOM im Trial-Click
- fuer `tel:`/`mailto:` ausdruecklich nur heuristische Reachability, kein
  echter Dialer-Nachweis

### 1.6 Z-Index-Inventar

Artefakt:

- `qa/z-stack.json`

Befund:

- `0` Anomalien `z-index > 100`

## Phase 2 - Triage

### Sofort-Fix

1. `fallback.css`-Linkfarbe auf statische Fallback-Flaechen beschraenken
2. Notfallkarten-Eingaben mit stabilen Accessible Names versehen
3. Notfall-Hinweis in Landmark ueberfuehren

### Follow-up-Ticket

1. Direktseiten `/materialien` und `/soforthilfe` semantisch und navigativ
   angleichen
2. Sticky-Header/FAB-Overlap manuell visuell bestaetigen und dann gezielt
   entschärfen

### Akzeptiert

- Keine Befunde wurden bewusst als "akzeptiert" eingeordnet.

### Release-Readiness nach Phase 2

- **B**

## Phase 3 - Umsetzung

Umgesetzt:

1. Linkfarbe in
   [fallback.css](/tmp/borderline-a11y-interaktion.F2Sz3e/client/public/fallback.css:41)
   auf `.fallback-page a, .fallback-noscript a` gescoped
2. Notfall-Hinweis in
   [Layout.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/components/Layout.tsx:50)
   als `aside` ausgezeichnet
3. Accessible Names fuer Notfallkarten-Felder in
   [Notfallkarte.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/pages/Notfallkarte.tsx:134),
   [Notfallkarte.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/pages/Notfallkarte.tsx:463)
   und
   [Notfallkarte.tsx](/tmp/borderline-a11y-interaktion.F2Sz3e/client/src/pages/Notfallkarte.tsx:493)

## Phase 4 - Verifikation

### Code-Checks

Erfolgreich ausgefuehrt:

- `npm run lint`
- `npm run build`
- `npm run check`

### Re-Runs nach Fix

- `page-structure.json`
  - `/notfallkarte` unlabeled Controls: `0`
- `axe-routes.json`
  - alle drei Routen: `0` Violations
- `lighthouse-home-desktop.json`
  - `/`: Accessibility `1.00`
- direkter Browser-Check:
  - Footer-Link auf `/` jetzt weisslich statt braun
  - Hero-CTA auf `/` jetzt weiss statt braun

### Offene Restpunkte

1. reduzierte Landmark-/Navigations-Paritaet der Direktseiten bleibt offen
2. Overlap-Sweep bleibt auf `25` heuristischen Funden
3. die zwei Click-Reachability-Failures bleiben instabile detached-DOM-
   Artefakte und sind nicht als stabiler Nutzerfehler bestaetigt

## Phase-4-Fazit

Die harten, klar reproduzierbaren A11y-Probleme aus diesem Audit wurden
behoben:

- Kontrast-Fund auf `/`
- Landmark-Fund auf `/`
- unbeschriftete Felder auf `/notfallkarte`

Der verbleibende Rest ist aktuell eher Follow-up als Release-Blocker.
Darum lautet die Schlussbewertung fuer diesen Branch: **B / weitgehend
release-tauglich, aber nicht komplett auspoliert**.
