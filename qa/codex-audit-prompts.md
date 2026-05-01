# Codex Audit Prompts fuer borderline-angehoerige

Diese Prompts sind auf das Repo
`/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
zugeschnitten.

## Gemeinsame Vorbemerkung

- Arbeite fuer jedes Audit in einem frischen `origin/main`-basierten
  Temp-Worktree.
- Nutze dafuer bevorzugt `_dev/create-audit-worktree.sh <slug>`.
- Richte Scope, Reihenfolge und Zielartefakte zusaetzlich an
  `qa/audit-plan.md` aus.
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
- Nutze `pnpm build` + `pnpm preview` fuer lokale Browser-Pruefungen.

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
- `pnpm test`
- `pnpm check`
- `pnpm build`
- `pnpm lint`
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
- Verwende die echten Repo-Kommandos: `pnpm build`, `pnpm test`, `pnpm check`, `pnpm lint`.
- Falls noetig, installiere audit-only Tools wie Lighthouse oder einen Vite-Bundle-Analyzer nur im Temp-Worktree.

## Phase 1 - Inventur
- Pruefe mindestens diese Routen auf Desktop und Mobile: `/`, `/materialien`, `/soforthilfe`.
- Ermittle pro Route Lighthouse Performance, LCP, CLS, TBT/INP, FCP und Speed Index.
- Dokumentiere die Build-Ausgabe von `pnpm build` und schluessel die erzeugten Chunks nach Dateiname, raw size, gzip size und vermuteter Funktion auf.
- Identifiziere die Top-5 groessten JS-Chunks und die groessten CSS-/Asset-Treiber.
- Lies `package.json` und pruefe Dependencies auf tatsaechliche Importe, doppelte Funktionalitaet und offensichtliche Altlasten.
- Fuehre `pnpm audit` aus und dokumentiere Findings getrennt von reiner Performance.
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
- `pnpm test`
- `pnpm check`
- `pnpm build`
- `pnpm lint`
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
- `pnpm build`
- `pnpm lint`
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
- Fuehre `pnpm audit` aus und gruppiere nach Schweregrad.
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
- `pnpm audit` ohne critical/high
- keine Secrets im Code oder in der History
- Security-Headers in Code und Live-Site konsistent
- `pnpm build`
- `pnpm lint`
```

## Audit 6 - SEO, Metadaten und Informationsarchitektur

```text
# Audit: SEO, Metadaten und Informationsarchitektur (Codex / borderline-angehoerige)

## Kontext
Pruefe `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
auf technische SEO, Metadaten und Informationsarchitektur. Fokus: statische
Auffindbarkeit, URL-Logik und interne Orientierung fuer die Hauptpfade der App.

## Constraints
- Arbeite in frischem main-basiertem Temp-Worktree von `origin/main`
- Branch: `audit/seo-ia`
- Bericht: `qa/audit-seo-ia.md`
- In Phase 1/2 keine Produktcode-Aenderungen
- Audit-Artefakte unter `qa/` sind erlaubt

## Phase 1 - Inventur
- Pruefe:
  - `client/src/components/SEO.tsx`
  - `client/src/app/routes.ts`
  - `client/public/robots.txt`
  - `client/public/sitemap.xml`
  - `client/public/_redirects`
  - relevante Navigations- und Breadcrumb-Komponenten in
    `client/src/components/layout/**`
- Erfasse pro Hauptpfad mindestens:
  - Route
  - Seitentitel
  - Description
  - Canonical-/OG-Status
  - interne Einstiege
  - Redirect- oder Slash-Sonderfall
- Pruefe speziell die Pfade:
  - `/`
  - `/verstehen`
  - `/unterstuetzen/uebersicht`
  - `/kommunizieren`
  - `/grenzen`
  - `/selbstfuersorge`
  - `/soforthilfe`
  - `/materialien`
- Gleiche Routen, Redirects und Navigation gegeneinander ab:
  - verwaiste Ziele
  - doppelte Pfade
  - Umleitungen ohne klaren Nutzen
- Dokumentiere, ob wichtige Inhalte aus Navigation, Breadcrumbs, Materialkarten
  oder Querverweisen ausreichend auffindbar sind.

STOPP nach Phase 1. Warte auf Freigabe.

## Phase 2 - Diagnose
- Ordne Befunde in `P0`, `P1`, `P2`.
- Trenne klar zwischen:
  - technischem SEO-Problem
  - IA-/Verlinkungsproblem
  - akzeptiertem Produktentscheid
- Formuliere pro Befund den kleinsten sinnvollen Fix.

STOPP nach Phase 2. Warte auf Freigabe.

## Phase 3 - Umsetzung
- Pro Aenderung eigener Commit: `audit(seo): <was>`

## Phase 4 - Verifikation
- `pnpm test`
- `pnpm check`
- `pnpm build`
- `pnpm lint`
- Sitemap-, Robots- und Route-Matrix erneut gegenpruefen
```

## Audit 7 - Modul- und Dramaturgie-Logik

```text
# Audit: Modul- und Dramaturgie-Logik (Codex / borderline-angehoerige)

## Kontext
Pruefe `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
auf Stringenz der Hauptthemenfolge. Fokus: klare Seitenrollen, geringe
Redundanz, sinnvolle Uebergaenge und nachvollziehbare Journey fuer
Angehoerige.

## Constraints
- Arbeite in frischem main-basiertem Temp-Worktree von `origin/main`
- Branch: `audit/modul-dramaturgie`
- Bericht: `qa/audit-modul-dramaturgie.md`
- In Phase 1/2 keine Produktcode-Aenderungen
- Nur Struktur und Informationsarchitektur auditieren, keine visuellen Urteile

## Phase 1 - Inventur
- Analysiere mindestens diese Kernpfade:
  - `client/src/pages/Verstehen.tsx`
  - `client/src/pages/UnterstuetzenUebersicht.tsx`
  - `client/src/pages/UnterstuetzenAlltag.tsx`
  - `client/src/pages/UnterstuetzenTherapie.tsx`
  - `client/src/pages/UnterstuetzenKrise.tsx`
  - `client/src/pages/Kommunizieren.tsx`
  - `client/src/pages/Grenzen.tsx`
  - `client/src/pages/Selbstfuersorge.tsx`
  - `client/src/pages/Soforthilfe.tsx`
  - `client/src/pages/Materialien.tsx`
- Dokumentiere pro Seite:
  - Kernfunktion
  - Abgrenzung zur Nachbarseite
  - Redundanzen
  - fehlende Bruecken / Querverweise
- Beruecksichtige auch relevante Inhalte aus `client/src/content/**` und
  `client/src/sections/**`.

STOPP nach Phase 1. Warte auf Freigabe.

## Phase 2 - Diagnose
- Ordne Befunde in `P0`, `P1`, `P2`.
- Leite daraus eine empfohlene Ziel-Dramaturgie ab:
  - Verstehen
  - Handeln
  - Stabilisieren
  - Vertiefen
- Formuliere pro Befund den kleinsten strukturellen Fix.

STOPP nach Phase 2. Warte auf Freigabe.

## Phase 3 - Umsetzung
- Pro Aenderung eigener Commit: `audit(flow): <was>`

## Phase 4 - Verifikation
- `pnpm test`
- `pnpm check`
- `pnpm build`
- `pnpm lint`
- Strukturmatrix fuer Kernpfade erneut pruefen
```

## Audit 8 - PDF- und Materialien-Integritaet

```text
# Audit: PDF- und Materialien-Integritaet (Codex / borderline-angehoerige)

## Kontext
Pruefe `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
auf Konsistenz und Zugaenglichkeit der Materialien. Fokus: Materialbibliothek,
Textversionen, PDF-Rollen, Auffindbarkeit und Download-Pfade.

## Constraints
- Arbeite in frischem main-basiertem Temp-Worktree von `origin/main`
- Branch: `audit/pdf-materialien`
- Bericht: `qa/audit-pdf-handouts.md`
- In Phase 1/2 keine Produktcode-Aenderungen
- Audit-Artefakte unter `qa/` und `qa/scripts/` sind erlaubt

## Phase 1 - Inventur
- Pruefe:
  - `client/src/pages/Materialien.tsx`
  - `client/src/pages/HandoutTextPage.tsx`
  - `client/src/content/handouts.ts`
  - `client/src/content/handoutTextVersions.ts`
  - `client/src/content/handoutTextVersionContent.ts`
  - `server/material-download.ts`
  - relevante lokale PDFs unter `client/public/**/*.pdf`
- Erfasse pro Material mindestens:
  - Kategorie
  - PDF-Link
  - Textversion vorhanden ja/nein
  - CTA-Muster
  - Suchbarkeit / Index-Relevanz
  - Zugaenglichkeits-Risiko
- Trenne lokale PDFs, Remote-PDFs und HTML-Textversionen sauber.
- Bewerte, welche Materialien zwingend ein textbasiertes Pendant brauchen.

STOPP nach Phase 1. Warte auf Freigabe.

## Phase 2 - Diagnose
- Priorisiere in `P0`, `P1`, `P2`.
- Trenne:
  - technisches Download-Problem
  - Content-/Strukturproblem
  - PDF-A11y-Problem
- Formuliere pro Befund den kleinsten sinnvollen Fix.

STOPP nach Phase 2. Warte auf Freigabe.

## Phase 3 - Umsetzung
- Pro Aenderung eigener Commit: `audit(pdf): <was>`

## Phase 4 - Verifikation
- `pnpm test`
- `pnpm check`
- `pnpm build`
- `pnpm lint`
- Materialmatrix und CTA-Muster erneut pruefen
```

## Audit 9 - Test- und Qualitaetsnetz

```text
# Audit: Test- und Qualitaetsnetz (Codex / borderline-angehoerige)

## Kontext
Pruefe `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
auf vorhandene und fehlende Produktabsicherung. Fokus: Kernfluesse, die fuer
Routing, A11y, SEO, Materialien, Downloads und Security wichtig sind.

## Constraints
- Arbeite in frischem main-basiertem Temp-Worktree von `origin/main`
- Branch: `audit/test-qualitaet`
- Bericht: `qa/audit-test-qualitaet.md`
- In Phase 1/2 keine Produktcode-Aenderungen
- Nutze nur vorhandene Repo-Kommandos

## Phase 1 - Inventur
- Fuehre aus:
  - `pnpm test`
  - `pnpm check`
  - `pnpm build`
  - `pnpm lint`
- Clustere `client/src/__tests__/*` mindestens nach:
  - Routing / Architektur
  - Security Headers
  - SEO / Meta
  - Keyboard / Layout
  - Materialien / Handouts
  - Smoke / Kernseiten
- Ordne den wichtigsten Produktpfaden zu, was bereits abgesichert ist und was
  ungetestet bleibt.
- Beruecksichtige dabei auch `server/**`, Redirects und statische Sonderpfade.

STOPP nach Phase 1. Warte auf Freigabe.

## Phase 2 - Diagnose
- Erstelle eine Testluecken-Matrix:
  - Pfad / Thema
  - aktueller Schutz
  - Rest-Risiko
  - empfohlenes Testniveau
- Trenne klar zwischen:
  - echter Absicherungsluecke
  - akzeptabler Nicht-Testung
  - doppelter / wenig hilfreicher Testabdeckung

STOPP nach Phase 2. Warte auf Freigabe.

## Phase 3 - Umsetzung
- Pro Aenderung eigener Commit: `audit(test): <was>`

## Phase 4 - Verifikation
- `pnpm test`
- `pnpm check`
- `pnpm build`
- `pnpm lint`
- Matrix gegen tatsaechlich hinzugefuegte oder angepasste Absicherung abgleichen
```

## Audit 10 - Release-Readiness

```text
# Audit: Release-Readiness (Codex / borderline-angehoerige)

## Kontext
Fuehre die Ergebnisse aus Sicherheit, Accessibility, Performance, Content,
SEO/IA, Modul-Logik, CSS-Hygiene, PDF-/Materialien und Testnetz in ein
Release-Urteil fuer `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
ueber.

## Constraints
- Arbeite in frischem main-basiertem Temp-Worktree von `origin/main`
- Branch: `audit/release-readiness`
- Bericht: `qa/audit-release-readiness.md`
- In Phase 1/2 keine Produktcode-Aenderungen
- Verwende reale Befunde aus den Einzel-Audits statt Annahmen

## Phase 1 - Inventur
- Lies die vorhandenen Audit-Berichte unter `qa/`.
- Erstelle eine konsolidierte Befundliste:
  - Release-Blocker
  - wichtige Verbesserungen vor Launch
  - vertretbare Nach-Release-Themen
- Gleiche die Befunde gegen:
  - Routing-Realitaet
  - Testabdeckung
  - Materialien-/Download-Flows
  - statische Sonderpfade

STOPP nach Phase 1. Warte auf Freigabe.

## Phase 2 - Urteil
- Entscheide klar:
  - `bereit`
  - `fast bereit`
  - `nicht bereit`
- Weise jedem Befund `P0`, `P1` oder `P2` zu.
- Liefere Top-5 Quick Wins und eine empfohlene Umsetzungsreihenfolge.

STOPP nach Phase 2. Warte auf Freigabe.

## Phase 3 - Umsetzung
- Nur nach Freigabe.
- Pro Aenderung eigener Commit: `audit(release): <was>`

## Phase 4 - Verifikation
- `pnpm test`
- `pnpm check`
- `pnpm build`
- `pnpm lint`
- abschliessendes Release-Urteil mit verbleibenden Restrisiken
```
