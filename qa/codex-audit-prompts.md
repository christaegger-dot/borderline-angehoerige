# Codex Audit Prompts fuer borderline-angehoerige

Diese Prompts sind auf das Repo
`/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
zugeschnitten.

## Gemeinsame Vorbemerkung

- Arbeite fuer jedes Audit in einem frischen `origin/main`-basierten
  Temp-Worktree.
- Nutze dafuer bevorzugt `_dev/create-audit-worktree.sh <slug>`.
- Phase 1 und Phase 2 bleiben read-only fuer `client/src`, `server`,
  `client/public`, `netlify.toml` und produktive Konfigurationsdateien.
- Audit-Artefakte unter `qa/` und `qa/scripts/` sind in Phase 1 und 2 erlaubt.

## Audit 1 - Accessibility und Interaktions-Integritaet

```text
# Audit: Accessibility und Interaktions-Integritaet (Codex / borderline-angehoerige)

## Kontext
Pruefe das Projekt `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige` systematisch auf Barrierefreiheit und interaktive Integritaet. Arbeite autonom, aber stoppe nach Phase 1 und Phase 2.

## Repo-spezifische Regeln
- Arbeite NICHT im bestehenden dirty Worktree.
- Erstelle zuerst einen frischen main-basierten Temp-Worktree von `origin/main`.
- Audit-Branch im Temp-Worktree: `audit/a11y-interaktion`
- Bericht: `qa/audit-a11y-interaktion.md`
- Audit-Artefakte unter `qa/` und `qa/scripts/` sind in Phase 1/2 erlaubt.
- Keine Aenderungen an `client/src`, `server`, `client/public`, `netlify.toml` in Phase 1/2.
- Falls noetig, installiere audit-only Tools im Temp-Worktree: `playwright`, `@playwright/test`, `lighthouse`, `pa11y`, `axe-core`, `@axe-core/playwright`.
- Nutze `npm run build` + `npm run preview` fuer lokale Browser-Pruefungen.

## Phase 1 - Inventur
- Pruefe mindestens diese Routen: `/`, `/soforthilfe`, `/materialien`, `/verstehen`.
- Ermittle Lighthouse Accessibility-Scores und liste alle nicht perfekten A11y-Audits auf.
- Fuehre zusaetzlich `axe-core` oder `pa11y` gegen dieselben Routen aus.
- Mache manuelle Spotchecks zu Heading-Hierarchie, Landmarks, Alt-Texten, Link-/Button-Labels, Formular-Labels, Kontrast-Risiken, Fokus-Reihenfolge, Fokus-Sichtbarkeit, Esc-Verhalten und `prefers-reduced-motion`.
- Richte die manuellen Checks besonders auf diese repo-spezifischen Hotspots aus: Such-Overlay, Mobile-Menue, sticky Soforthilfe-Leiste, Material-Vorschau/Modal, Dropdown-/Sheet-Komponenten aus `client/src/components/ui/`.
- Schreibe `qa/scripts/interaction-overlap.mjs`, das fuer alle interaktiven Elemente in 4 Viewports (`375`, `768`, `1280`, `1920`) per `document.elementFromPoint()` prueft, ob die Mitte des Elements wirklich beim Element selbst landet.
- Schreibe `qa/scripts/click-reachability.mjs`, aber nutze repo-taugliche Heuristiken statt "alle erwarteten Aktionen automatisch erkennen":
  - Links: Navigation/Target erreichbar
  - `tel:`-Links: als vorhanden und klickbar markieren
  - Buttons mit `aria-expanded`, `aria-controls`, Dialog-/Sheet-Triggern: Toggle/Oeffnung pruefen
  - Unklare Interaktionen als `manual-needed` klassifizieren statt falsch zu raten
- Schreibe `qa/scripts/z-stack.mjs`, das Elemente mit `position: absolute|fixed|sticky` oder explizitem `z-index` inventarisiert und Anomalien markiert.
- Erstelle eine Zusammenfassungstabelle im Bericht.

STOPP nach Phase 1. Warte auf Freigabe.

## Phase 2 - Triage
- Ordne jeden Befund ein in `Sofort-Fix`, `Follow-up-Ticket` oder `Akzeptiert`.
- Gib eine Release-Readiness-Stufe A/B/C.
- Halte Risiken fuer Search, Navigation, Modal/Overlay und Soforthilfe separat fest.

STOPP nach Phase 2. Warte auf Freigabe.

## Phase 3 - Fixes
- Nur nach Freigabe.
- Pro Fix eigener Commit: `audit(a11y): fix <was>`

## Phase 4 - Verifikation
- `npm test`
- `npm run check`
- `npm run build`
- `npm run lint`
- Lighthouse-Re-Run
- Alle drei `qa/scripts/*` erneut ausfuehren
- Finale Release-Readiness-Aussage
```

## Audit 2 - Performance und Bundle-Hygiene

```text
# Audit: Performance und Bundle-Hygiene (Codex / borderline-angehoerige)

## Kontext
Pruefe `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige` auf Performance-Probleme und Bundle-Hygiene. Arbeite in frischem main-basiertem Temp-Worktree von `origin/main`.

## Constraints
- Branch: `audit/performance`
- Bericht: `qa/audit-performance.md`
- Audit-Artefakte unter `qa/` sind erlaubt, keine funktionalen Aenderungen in Phase 1/2.
- Verwende die echten Repo-Kommandos: `npm run build`, `npm test`, `npm run check`, `npm run lint`.
- Falls noetig, installiere audit-only Tools wie Lighthouse oder einen Vite-Bundle-Analyzer nur im Temp-Worktree.

## Phase 1 - Inventur
- Pruefe mindestens diese Routen auf Desktop und Mobile: `/`, `/materialien`, `/soforthilfe`.
- Ermittle pro Route Lighthouse Performance, LCP, CLS, TBT/INP, FCP und Speed Index.
- Dokumentiere die Build-Ausgabe von `npm run build` und schluessel die erzeugten Chunks nach Dateiname, raw size, gzip size und vermuteter Funktion auf.
- Identifiziere die Top-5 groessten JS-Chunks und die groessten CSS-/Asset-Treiber.
- Lies `package.json` und pruefe Dependencies auf tatsaechliche Importe, doppelte Funktionalitaet und offensichtliche Altlasten.
- Fuehre `npm audit` aus und dokumentiere Findings getrennt von reiner Performance.
- Inventarisiere Bilder in `client/public/` und externe Bildnutzung in den Pages/Sections.
- Pruefe speziell:
  - Hero-Bilder und `srcSet`/`sizes`
  - `fetchPriority`
  - `loading="lazy"`
  - Bilder, die groesser geladen werden als angezeigt
- Pruefe Lazy-Loading und Code-Splitting anhand von `client/src/app/routes.ts`:
  - Routen sind bereits lazy-loaded
  - bewerte deshalb zusaetzlich grosse, eager geladene Komponenten innerhalb der Route-Chunks
- Suche Layout-Shift-Quellen: fehlende Dimensionen, Font-Loading, sticky UI, dynamisch eingeblendete Overlays.

STOPP nach Phase 1. Warte auf Freigabe.

## Phase 2 - Massnahmenkatalog
- Formuliere pro Hot-Spot einen konkreten Vorschlag mit erwartetem Gewinn, Aufwand und Risiko.
- Priorisierung in `P1`, `P2`, `P3`.
- Halte bundle-bezogene und asset-bezogene Massnahmen getrennt.

STOPP nach Phase 2. Warte auf Freigabe.

## Phase 3 - Umsetzung
- Pro Massnahme eigener Commit: `audit(perf): <was>`

## Phase 4 - Verifikation
- Lighthouse-Vergleich vorher/nachher
- Vergleich der Build-/Chunk-Groessen
- `npm test`
- `npm run check`
- `npm run build`
- `npm run lint`
```

## Audit 3 - Content-Qualitaet und Sprache

```text
# Audit: Content-Qualitaet und Sprache (Codex / borderline-angehoerige)

## Kontext
Pruefe die Textinhalte dieser Website sprachlich und redaktionell. Zielgruppe: Angehoerige von Menschen mit Borderline-Persoenlichkeitsstoerung in der Schweiz. Sprache: Deutsch, Schweizer Orthografie (`ss` statt `ß`).

## Constraints
- Arbeite in frischem main-basiertem Temp-Worktree von `origin/main`
- Branch: `audit/content-sprache`
- Bericht: `qa/audit-content-sprache.md`
- In Phase 1/2 nur Audit-Artefakte unter `qa/`; keine Aenderungen an Produktcode
- Fachliche Aussagen nie eigenmaechtig "korrigieren", sondern als `zu validieren` markieren

## Phase 1 - Inventur
- Erstelle ein Content-Inventar aus:
  - `client/src/content/**/*.ts`
  - `client/src/data/**/*.ts`
  - relevanten Texten in `client/src/pages/**/*.tsx`
  - relevanten Metadaten in `client/src/components/SEO.tsx`
- Schaetze die Gesamtwortmenge.
- Pruefe Anrede-Konsistenz (`Sie`, `Du`, unpersoenlich, Passiv) mit Datei- und Zeilenbezug.
- Liste Fachbegriffe auf, die fuer Angehoerige ohne Erklaerung schwer verstaendlich sind; gleiche gegen Glossar und Kontext ab.
- Pruefe sprachliche Qualitaet stichprobenartig auf Satzlaenge, Passiv-Anteil, Nominalstil, Floskeln und Tonalitaet.
- Pruefe Quellentransparenz:
  - Welche Claims sind belegt?
  - Welche empirischen Aussagen wirken veraltet oder unbelegt?
  - Was gehoert in `zu validieren` statt in `falsch`
- Pruefe externe Links per HTTP-Status und dokumentiere tote Links mit Datei, Linktext und Ziel.
- Fuehre einen Stigma- und Sensibilitaets-Check durch, besonders zu Krisen, Kindesschutz, KESB, Zwang, Schuld und problematischem Framing.
- Beruecksichtige, dass dieses Projekt warm, entlastend und psychoedukativ fuer Angehoerige formuliert sein soll, nicht klinisch-kalt und nicht paternalistisch.

STOPP nach Phase 1. Warte auf Freigabe.

## Phase 2 - Diagnose
- Ordne Befunde in `Sofort-Fix`, `redaktionelles Ticket`, `Akzeptiert`.
- Gib pro Befund einen konkreten Formulierungsvorschlag, aber aendere ohne Freigabe keine fachlichen Kernaussagen.
- Halte SEO-/Meta-Texte und sichtbare Seitentexte getrennt.

STOPP nach Phase 2. Warte auf Freigabe.

## Phase 3 - Umsetzung
- Pro Aenderung eigener Commit: `audit(content): <was>`
- Nur Formulierungs- und Konsistenz-Fixes ohne Aenderung fachlicher Substanz

## Phase 4 - Verifikation
- Anrede-Konsistenz erneut pruefen
- Link-Rot erneut pruefen
- Vorher/Nachher-Metriken fuer Ton, Passiv und Floskeln dokumentieren
```

## Audit 4 - Design-Token- und CSS-Hygiene

```text
# Audit: Design-Token- und CSS-Hygiene (Codex / borderline-angehoerige)

## Kontext
Pruefe das Styling-System dieses Projekts auf Konsistenz, Token-Nutzung und Wartbarkeit. Dieses Repo ist kein klassisches SCSS-Projekt, sondern primaer Tailwind v4 + CSS-Variablen in `client/src/index.css`, plus einzelne statische Sonderfaelle in `client/public/`.

## Constraints
- Arbeite in frischem main-basiertem Temp-Worktree von `origin/main`
- Branch: `audit/css-hygiene`
- Bericht: `qa/audit-css-hygiene.md`
- Keine visuellen Aenderungen in Phase 1/2
- Farbidentitaet hat Vorrang: kein `close enough`
- Audit-Artefakte unter `qa/` sind erlaubt

## Phase 1 - Inventur
- Erfasse das Token-System aus `client/src/index.css`:
  - Farben
  - Spacing-/Radius-/Typography-Tokens
  - Light/Dark-Definitionen
  - semantische Sonderfaelle wie Soforthilfe-Farbskala
- Suche hardcodierte Werte nicht nur in CSS, sondern auch in:
  - Tailwind arbitrary values in `className`
  - Inline `style={{ ... }}`
  - statischen Dateien `client/public/fallback.css` und `client/public/notfallkarte.html`
- Dokumentiere pro Fund: Datei, Zeile, Wert, passender Token oder `neuer Token noetig`.
- Analysiere Token-Nutzung:
  - welche Tokens sind stark genutzt
  - welche wirken ungenutzt
  - welche Regeln umgehen das Tokensystem
- Pruefe CSS-/Style-Struktur:
  - `client/src/index.css`
  - Utility-Klassen in `client/src/**/*.tsx`
  - statische Sonderfaelle in `client/public/`
- Suche tote Regeln, redundante Muster und problematische `z-*`, `shadow-*`, `top-*`, `text-[...]`, `rounded-[...]`-Werte.
- Behandle `client/public/notfallkarte.html` und `client/public/fallback.css` separat von der App-Oberflaeche.

STOPP nach Phase 1. Warte auf Freigabe.

## Phase 2 - Massnahmenkatalog
- Entscheide pro Hardcode zwischen:
  - `T1` bestehenden Token angleichen
  - `T2` neuen Token einfuehren
  - `T3` zu bestehendem Token migrieren
  - `T4` Sonderfall belassen
- Schlage Buendelungen fuer Spacing-, Radius- und Shadow-Migrationen vor.

STOPP nach Phase 2. Warte auf Freigabe.

## Phase 3 - Umsetzung
- Pro Massnahme eigener Commit: `audit(css): <was>`

## Phase 4 - Verifikation
- `npm run build`
- `npm run lint`
- visueller Vergleich auf mindestens `/`, `/soforthilfe`, `/materialien`
- Token-Coverage vorher/nachher dokumentieren
```

## Audit 5 - Sicherheit und Deployment-Hygiene

```text
# Audit: Sicherheit und Deployment-Hygiene (Codex / borderline-angehoerige)

## Kontext
Pruefe `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige` auf Sicherheitsrisiken und Deployment-Hygiene. Nutze sowohl den Code als auch, falls erreichbar, die Live-Site `https://borderline-angehoerige.netlify.app`.

## Constraints
- Arbeite in frischem main-basiertem Temp-Worktree von `origin/main`
- Branch: `audit/sicherheit`
- Bericht: `qa/audit-sicherheit.md`
- Gefundene echte Secrets SOFORT melden
- In Phase 1/2 keine funktionalen Aenderungen
- Audit-Artefakte unter `qa/` sind erlaubt

## Phase 1 - Inventur
- Fuehre einen Secret-Scan ueber Repo und Git-History aus:
  - Muster wie `sk-`, `ghp_`, `nfp_`, `apiKey`, `secret`, `token`, `password=`
  - `.env*`, private Keys, Zertifikate, Credentials in URLs, Base64-Verdachtsfaelle
- Pruefe `.gitignore` gegen reale Repo-Inhalte und gegen gaengige Sensitive-Patterns.
- Pruefe Security-Headers sowohl in der Live-Site als auch im Code:
  - `netlify.toml`
  - `server/index.ts`
  - falls relevant `client/public/_headers` oder aehnliche Dateien
- Pruefe CSP-Qualitaet und erklaere konkret, wofuer aktuelle Ausnahmen wie `'unsafe-inline'` noetig sind oder nicht.
- Fuehre `npm audit` aus und gruppiere nach Schweregrad.
- Suche inline Scripts, inline Event-Handler und andere CSP-Hindernisse in `client/public/` und im generierten App-Pattern.
- Pruefe Formulare und User-Input:
  - Validierung
  - XSS-Risiken
  - CSRF-Relevanz
  - Storage-Nutzung (`localStorage`, `sessionStorage`)
- Pruefe Deployment-Konfiguration:
  - `netlify.toml`
  - Build-/Publish-Pfade
  - Environment-Variable-Nutzung
  - Debug-/Dev-Endpunkte in `vite.config.ts` oder `server/`
- Falls moeglich, pruefe per `gh` oder GitHub-App zusaetzlich Branch-Protection fuer `main`.

STOPP nach Phase 1. Warte auf Freigabe.

## Phase 2 - Massnahmenkatalog
- Pro Befund: Schwere, Aufwand, konkreter Fix
- Kritische Punkte wie echte Secrets oder bekannte High/Critical-Vulnerabilities sind nicht verhandelbar
- Trenne klar zwischen `Code-Fix`, `Infra-/Netlify-Fix`, `GitHub-/Repo-Setting`, `manuelle Secret-Revocation`

STOPP nach Phase 2. Warte auf Freigabe.

## Phase 3 - Umsetzung
- Pro Fix eigener Commit: `audit(sec): <was>`

## Phase 4 - Verifikation
- `npm audit` ohne critical/high
- keine Secrets im Code oder in der History
- Security-Headers in Code und Live-Site konsistent
- `npm run build`
- `npm run lint`
```
