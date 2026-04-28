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
- Nachpflege auf aktuellem `origin/main`: teilweise durchgefuehrt

## Notizen

- Produktcode blieb in Phase 1 und 2 read-only.
- Audit-Artefakte liegen unter `qa/` und `qa/scripts/`.
- Audit-only Tools wurden lokal im Temp-Worktree installiert, ohne
  `package.json` oder Lockfiles zu aendern:
  `playwright`, `@axe-core/playwright`, `lighthouse`.
- Die App lief fuer die Browser-Audits ueber den gebauten Express-Server auf
  Port `4173`.
- Nach den spaeter gemergten Mini-PRs `#185` und `#186` wurden
  `interaction-overlap.json` und `click-reachability.json` noch einmal gegen
  einen frischen `origin/main`-Build auf Port `4174` neu erzeugt.

## Kurzfazit

Release-Readiness nach Phase 4 plus Nachpflege: **B**

Warum nicht A:

1. Die klar reproduzierbaren repo-seitigen A11y-Funde wurden behoben.
2. Die waehrend des Audits noch offene Landmark-/Direktseiten-Abweichung wurde
   nachgelagert in PR `#185` behoben.
3. Der waehrend des Audits noch sichtbare mobile Footer/FAB-Konflikt wurde
   nachgelagert in PR `#186` gezielt entschaerft.
4. Es bleibt aber ein kleiner Restblock heuristischer Top-Edge-Overlap-Funde
   rund um den Sticky-Header. Der aktuelle Re-Run zeigt dort keine
   Click-Reachability-Failures mehr, produziert im Sweep aber weiterhin
   Scrollkanten-Rauschen.

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
- Status: **nach Audit-Follow-up behoben**

Befund waehrend des Audits:

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
- Nachgelagerte Umsetzung:
  - PR `#185` fuehrt auf beiden Direktseiten eine `Direktnavigation` als
    `nav` ein.
  - `/materialien` erhielt zusaetzlich einen Footer mit Rueckwegen.
- Dieser Follow-up-Block ist repo-seitig damit abgearbeitet.

### 5. Scroll-Kanten-Overlap durch Sticky-Header und mobiles Soforthilfe-FAB

- Schwere: niedrig bis mittel
- Status: **nach Audit-Follow-up reduziert, kleiner Rest offen**

Automatischer Sweep waehrend des Audits:

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

Nachpflege auf aktuellem `origin/main`:

- Re-Run `interaction-overlap.json`:
  `26` heuristische Funde
- davon nur noch `1` Fund mit `blockedBy: "Soforthilfe"` statt zuvor `3`
- Re-Run `click-reachability.json`:
  `191` gepruefte Ziele, `0` Failures
- PR `#186` entschaerft den echten mobilen Footer/FAB-Konflikt, ohne den
  Sticky-Header selbst umzubauen

Bewertung:

- aktuell vor allem **Heuristik-/Scrollkanten-Risiko** am oberen Viewportrand
  statt bestaetigter Klick-Defekt
- der fruehere Footer/FAB-Konflikt ist repo-seitig reduziert
- ein groesserer Header-Layout-Fix ist ohne manuellen Produktentscheid weiter
  nicht gerechtfertigt

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
- spaeterer Re-Run auf aktuellem `main`:
  `26` Funde, Schwerpunkt fast nur noch Sticky-Header

### 1.5 Klick-Erreichbarkeits-Test

Artefakt:

- `qa/click-reachability.json`

Befund:

- `179` Ziele geprueft
- `177` Passes
- `2` Failures, beide `Situations-Wegweiser`-detached-DOM im Trial-Click
- fuer `tel:`/`mailto:` ausdruecklich nur heuristische Reachability, kein
  echter Dialer-Nachweis
- spaeterer Re-Run auf aktuellem `main`:
  `191` Ziele geprueft, `0` Failures

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
   Status nach Audit: in PR `#185` umgesetzt
2. Sticky-Header/FAB-Overlap manuell visuell bestaetigen und dann gezielt
   entschaerfen
   Status nach Audit: mobiler Footer/FAB-Konflikt in PR `#186` entschaerft,
   verbleibender Rest weiter visuell zu bestaetigen

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
4. Nachgelagert in PR `#185`: Landmark-/Footer-Paritaet auf den statischen
   Direktseiten erhoeht
5. Nachgelagert in PR `#186`: Footer-Linkzeile auf Mobilgeraeten vom
   schwebenden Soforthilfe-FAB freigehalten

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
- Nachpflege-Re-Run auf aktuellem `main`:
  - `interaction-overlap.json`: `26` heuristische Funde, davon nur noch `1`
    mit `blockedBy: "Soforthilfe"` statt `3`
  - `click-reachability.json`: `191` Ziele, `0` Failures

### Offene Restpunkte

1. Overlap-Sweep produziert weiter heuristische Sticky-Header-Funde an
   Scroll-Kanten
2. ein einzelner Restfund mit `blockedBy: "Soforthilfe"` ist nach dem
   Nachpflege-Re-Run kein mobiler Footer-Fall mehr, sondern ein
   Top-Edge-/Header-Kontext auf Desktop

## Phase-4-Fazit

Die harten, klar reproduzierbaren A11y-Probleme aus diesem Audit wurden
behoben:

- Kontrast-Fund auf `/`
- Landmark-Fund auf `/`
- unbeschriftete Felder auf `/notfallkarte`

Der verbleibende Rest ist aktuell eher Follow-up als Release-Blocker.
Nach den spaeter gemergten Mini-PRs `#185` und `#186` ist der Rest nun im
Wesentlichen heuristisches Sticky-Header-Rauschen ohne
Click-Reachability-Failures.
Darum lautet die Schlussbewertung fuer diesen Branch weiterhin konservativ:
**B / release-tauglich mit kleinem Rest an Scrollkanten-Heuristik**.

## Reaktivierung 2026-04-28

Audit-Infrastruktur wiederbelebt. Smoke-Test gegen aktuelles `main`
(76db735, nach Editorial-Migration + Phase-7-Cleanup + Phase-8/9-Polish):
5 von 6 `.mjs`-Skripten laufen ohne Anpassung. `playwright` und
`@axe-core/playwright` jetzt als devDeps in `package.json` (vorher nur
im Temp-Worktree).

### Vorgehen fuer kuenftige Audit-Laeufe

```bash
pnpm install                # zieht playwright + @axe-core/playwright
pnpm build && pnpm preview --host 127.0.0.1 --port 4173 &
node qa/scripts/axe-routes.mjs
```

Auf macOS nutzen die Skripte automatisch System-Chrome
(`/Applications/Google Chrome.app/...`). Auf Linux/CI:
`PLAYWRIGHT_EXECUTABLE_PATH` setzen oder `playwright install chromium`.

### Wichtig: `/soforthilfe` ist Sonderfall (Static-HTML)

Die Page wird seit PR `#314`/`#315` als statische HTML-Direktseite
ausgeliefert (`client/public/soforthilfe/index.html`), nicht ueber die
React-SPA. Die Aufloesung der URL haengt an drei Stellen:

1. `client/public/_redirects` (Netlify):
   `/soforthilfe    /soforthilfe/index.html   200!`
2. `server/index.ts` (Production-Express): `STATIC_DIRECT_PAGE_ROUTES`
3. `client/src/app/routes.ts` (React-Router): self-referential redirect,
   damit die SPA den Pfad nicht intercepted

In **Production** funktioniert das. `axe` gegen die Live-Site:

```bash
AUDIT_BASE_URL=https://borderline-angehoerige.netlify.app \
  node qa/scripts/axe-routes.mjs
# /: 0 violations
# /soforthilfe: 0 violations
# /materialien: 0 violations
```

In **Vite-Preview lokal** gibt es zwei axe-Findings auf `/soforthilfe`
(`landmark-one-main`, `page-has-heading-one`). Das sind **False
Positives**: Vite Preview emuliert die Netlify-Redirects nicht und ist
nicht der Express-Server, also serviert es fuer `/soforthilfe` (ohne
trailing slash) die SPA-Shell statt die Static-HTML. Mit trailing slash
(`/soforthilfe/`) liefert Vite die Static-HTML korrekt aus.

Die in `qa/axe-routes.json` festgehaltene Baseline enthaelt diese zwei
False Positives bewusst, damit die Local-Reproduzierbarkeit klar bleibt
(`pnpm preview` reicht). Fuer einen ehrlichen a11y-Befund auf
`/soforthilfe` immer mit `AUDIT_BASE_URL=https://...` gegen die
Live-Site oder mit `pnpm start` (Express) testen.
