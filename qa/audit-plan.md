# Vollstaendiger Audit-Plan fuer `borderline-angehoerige`

Dieser Plan beschreibt den vollstaendigen Audit-Rahmen fuer das Repo
`borderline-angehoerige`. Er baut auf den bestehenden Artefakten in `qa/` auf
und ergaenzt sie um die noch fehlenden Audit-Spuren.

## 1. Zielbild

Der Audit-Prozess soll drei Ziele gleichzeitig absichern:

1. **Codequalitaet**
   - robuste Routing-, Render- und Download-Pfade
   - nachvollziehbare Sicherheits- und Performance-Basis
   - ausreichend abgesicherte Kernfluesse
2. **Inhaltliche Qualitaet**
   - fachlich glaubwuerdige, gut strukturierte und sprachlich tragfaehige Inhalte
   - konsequente Ausrichtung auf Angehoerige von Menschen mit
     Borderline-Persoenlichkeitsstoerung in der Schweiz
3. **Release-Readiness**
   - klare Go/No-Go-Entscheidung mit priorisierten Blockern, Quick Wins und
     Nach-Release-Themen

## 2. Repo-spezifischer Scope

### 2.1 Produktflaechen

| Bereich               | Pfad                                                                                                                                                                                | Bedeutung fuer Audits                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| SPA-App               | `client/src/**`                                                                                                                                                                     | React/Vite-Oberflaeche, Seiten, Sections, Interaktion, SEO-Helfer     |
| Server                | `server/**`                                                                                                                                                                         | Express-Server, Security-Header, Material-Downloads                   |
| Statische Sonderpfade | `client/public/soforthilfe/index.html`, `client/public/notfallkarte.html`, `client/public/fallback.css`, `client/public/startup-*`                                                  | Direktzugriff, Fallback-, Print- und Sonderarchitektur                |
| Materialien / PDFs    | `client/src/content/handouts.ts`, `client/src/content/handoutTextVersions.ts`, `client/src/pages/Materialien.tsx`, `client/src/pages/HandoutTextPage.tsx`, `client/public/**/*.pdf` | Zugaenglichkeit, Suchbarkeit, Download- und Rollenverteilung HTML/PDF |
| Audit-Artefakte       | `qa/**`                                                                                                                                                                             | Berichte, Prompt-Sammlung, reproduzierbare Audit-Dokumentation        |

### 2.2 Technische Inventur

Aktueller Repo-Scope fuer den Audit-Plan:

- `33` Route-Eintraege in `client/src/app/routes.ts`
- `29` Seitenkomponenten unter `client/src/pages`
- `13` Section-Komponenten unter `client/src/sections`
- `13` Content-Dateien unter `client/src/content`
- `59` Komponenten unter `client/src/components`
- `15` Testdateien unter `client/src/__tests__`
- `2` Server-Dateien unter `server`
- `1` statische Direktseite unter `client/public/soforthilfe/index.html`

## 3. Audit-Baseline

Jeder Audit-Worktree startet mit derselben Baseline:

1. frischer `origin/main`-basierter Temp-Worktree
2. read-only fuer Produktcode in Phase 1 und 2
3. Standard-Verifikation:
   - `npm test`
   - `npm run check`
   - `npm run build`
   - `npm run lint`

Die Verifikation wurde im Haupt-Repo erfolgreich nachvollzogen und bleibt die
verbindliche Ausgangsbasis fuer alle Audit-Spuren.

## 4. Bestehende Audit-Artefakte

Bereits vorhanden und weiterhin massgeblich:

- `qa/audit-sicherheit.md`
- `qa/audit-performance.md`
- `qa/audit-content-sprache.md`
- `qa/audit-css-hygiene.md`
- `qa/audit-pdf-handouts.md`
- `qa/codex-audit-prompts.md`
- `qa/README.md`

Diese Artefakte bleiben Referenz fuer Struktur, Priorisierung und Phase-Logik.

## 5. Vollstaendiger Audit-Katalog

| Audit-Track                                | Ziel                                                                     | Haupt-Scope                                                                                           | Bericht                         |
| ------------------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------- |
| Sicherheit und Deployment-Hygiene          | echte Angriffs- und Haertungsflaechen bewerten                           | `server/**`, `netlify.toml`, Header, CSP, Remote-Ressourcen, Downloads                                | `qa/audit-sicherheit.md`        |
| Accessibility und Interaktions-Integritaet | WCAG-, Fokus- und Bedienbarkeitsrisiken finden                           | Layout, Navigation, Search, MobileMenu, UI-Primitives, Notfallkarte, Selbsttest                       | `qa/audit-a11y-interaktion.md`  |
| Performance und Bundle-Hygiene             | Initialpfad, Bundle, Assets und Direktzugriffe bewerten                  | Build-Ausgabe, Chunks, `client/public/**`, Motion, Bilder, Cache                                      | `qa/audit-performance.md`       |
| Content-Qualitaet und Sprache              | Verstaendlichkeit, Ton und Quellenklarheit bewerten                      | `client/src/pages/**`, `client/src/sections/**`, `client/src/content/**`, `client/src/data/**`        | `qa/audit-content-sprache.md`   |
| SEO, Metadaten und Informationsarchitektur | Auffindbarkeit, Indexierbarkeit und URL-/Link-Logik pruefen              | `client/src/components/SEO.tsx`, Routen, Redirects, Sitemap, Robots, Navigation                       | `qa/audit-seo-ia.md`            |
| Modul- und Dramaturgie-Logik               | Rollenabgrenzung, Redundanzen und Journey-Stringenz pruefen              | Kernpfade Verstehen, Unterstuetzen, Kommunizieren, Grenzen, Selbstfuersorge, Soforthilfe, Materialien | `qa/audit-modul-dramaturgie.md` |
| Design-Token- und CSS-Hygiene              | visuelle Konsistenz und Style-Wartbarkeit sichern                        | `client/src/index.css`, `client/src/**/*.tsx`, statische Sonderstyles                                 | `qa/audit-css-hygiene.md`       |
| PDF- und Materialien-Integritaet           | Textversion/PDF-Rollen, Auffindbarkeit und A11y der Materialien bewerten | Materialien-Content, Handout-Textversionen, lokale und Remote-PDFs                                    | `qa/audit-pdf-handouts.md`      |
| Test- und Qualitaetsnetz                   | bestehende Absicherung und Luecken analysieren                           | `client/src/__tests__`, Routing-, Download-, SEO-, A11y-, Security-Flows                              | `qa/audit-test-qualitaet.md`    |
| Release-Readiness                          | alle Befunde in eine Go/No-Go-Entscheidung ueberfuehren                  | Ergebnisse aller vorigen Audits                                                                       | `qa/audit-release-readiness.md` |

## 6. Audit-Reihenfolge

Empfohlene Ausfuehrungsreihenfolge fuer dieses Repo:

1. `sicherheit`
2. `a11y-interaktion`
3. `performance`
4. `content-sprache`
5. `seo-ia`
6. `modul-dramaturgie`
7. `css-hygiene`
8. `pdf-materialien`
9. `test-qualitaet`
10. `release-readiness`

Begruendung:

- Die erste Welle schafft technische Baselines fuer Risiko, Bedienbarkeit und
  Ladeverhalten.
- Die zweite Welle prueft Inhalt, Architektur und Auffindbarkeit.
- Die dritte Welle konsolidiert visuelle Konsistenz und Materialien.
- Die vierte Welle verdichtet alles in Testluecken und Release-Urteil.

## 7. Audit-Spuren im Detail

### 7.1 Sicherheit und Deployment-Hygiene

- prueft Security-Header, CSP, Secrets, Dependency-Risiken und Deployment-Setup
- deckt besonders `server/index.ts`, `server/material-download.ts`,
  `netlify.toml`, `client/public/_redirects`, Remote-Downloads und
  Link-/Window-Handling ab
- Ergebnis: priorisierte echte Angriffs- und Haertungsbefunde

### 7.2 Accessibility und Interaktions-Integritaet

- prueft Tastaturpfade, Fokusmanagement, Heading-Hierarchie, Dialoge, Menues,
  Search, Motion-Reduktion und interaktive Sonderpfade
- Hotspots:
  - `client/src/components/Layout.tsx`
  - `client/src/components/Search.tsx`
  - `client/src/components/layout/MobileMenu.tsx`
  - `client/src/components/layout/HeaderNav.tsx`
  - `client/src/components/ui/**`
  - `client/src/pages/Notfallkarte.tsx`
  - `client/src/components/Selbsttest.tsx`
- Ergebnis: P0/P1/P2 mit WCAG-Bezug und Komponentenmapping

### 7.3 Performance und Bundle-Hygiene

- trennt SPA-Performance klar von statischen Direktzugriffen
- prueft Chunks, CSS, Asset-Ladekette, Motion-Abhaengigkeiten und Caching
- Hotspots:
  - Root-Route `/`
  - `client/public/soforthilfe/index.html`
  - `client/public/fallback.css`
  - `client/src/pages/Home.tsx`
  - `client/src/app/routes.ts`
- Ergebnis: Bottlenecks, Quick Wins, Architekturentscheidungen

### 7.4 Content-Qualitaet und Sprache

- prueft Ton, Verstaendlichkeit, Quellen-Transparenz, Fachjargon und
  Zielgruppenfit
- Scope:
  - `client/src/pages/**`
  - `client/src/sections/**`
  - `client/src/content/**`
  - `client/src/data/**`
- Ergebnis: priorisierte redaktionelle Risiken ohne unautorisierte
  Fachkorrekturen

### 7.5 SEO, Metadaten und Informationsarchitektur

- prueft:
  - Seitentitel, Descriptions, Canonicals, Open Graph
  - `robots.txt`, `sitemap.xml`, Redirects und URL-Konsistenz
  - Auffindbarkeit ueber Navigation, Breadcrumbs und interne Links
- Scope:
  - `client/src/components/SEO.tsx`
  - `client/public/robots.txt`
  - `client/public/sitemap.xml`
  - `client/src/app/routes.ts`
  - `client/src/components/layout/**`
- Ergebnis: technische SEO-Befunde plus IA-Empfehlungen

### 7.6 Modul- und Dramaturgie-Logik

- prueft die Hauptthemenfolge auf klare Funktion, Redundanz und Uebergaenge
- Kernpfade:
  - `Verstehen`
  - `Unterstuetzen`
  - `Kommunizieren`
  - `Grenzen`
  - `Selbstfuersorge`
  - `Soforthilfe`
  - `Materialien`
- Ergebnis: Strukturplan fuer Stringenz statt isolierter Einzelfixes

### 7.7 Design-Token- und CSS-Hygiene

- prueft Token-Nutzung, Hardcodes, visuelle Varianten und Sonderfaelle
- trennt App-Styling von statischen Sonderseiten bewusst
- Scope:
  - `client/src/index.css`
  - `client/src/components/**`
  - `client/src/pages/**`
  - `client/public/fallback.css`
  - `client/public/notfallkarte.html`
- Ergebnis: priorisierter Bereinigungsplan fuer Konsistenz und Wartbarkeit

### 7.8 PDF- und Materialien-Integritaet

- verbindet Materialbibliothek, Textversionen und PDF-Zugaenglichkeit
- Scope:
  - `client/src/pages/Materialien.tsx`
  - `client/src/pages/HandoutTextPage.tsx`
  - `client/src/content/handouts.ts`
  - `client/src/content/handoutTextVersionContent.ts`
  - `client/public/**/*.pdf`
- Ergebnis: Priorisierung fuer barrierefreie Textpendants und Material-CTAs

### 7.9 Test- und Qualitaetsnetz

- clustert bestehende Tests nach Routing, Security, SEO, Keyboard, Materialien,
  Handouts und Smoke-Coverage
- bewertet, welche Kernfluesse bereits abgesichert sind und wo Luecken bleiben
- Ergebnis: Testluecken-Matrix statt pauschaler Testforderung

### 7.10 Release-Readiness

- fuehrt alle Einzelbefunde in ein konsolidiertes Release-Urteil zusammen
- bewertet:
  - Release-Blocker
  - wichtige Verbesserungen vor Launch
  - klare Nach-Release-Themen
- Ergebnis: Go/No-Go-Dokument mit empfohlener Umsetzungsreihenfolge

## 8. Einheitliche Zielartefakte je Audit

Jeder Bericht soll dieselben Kernelemente enthalten:

1. Kurzfazit
2. P0 / P1 / P2
3. betroffene Datei / Seite / Komponente
4. Problem / Auswirkung
5. kleinster sinnvoller Fix
6. bereits gut umgesetzte Punkte
7. Quick Wins

Fuer repo-weite Vergleichbarkeit bleiben die vier Audit-Phasen verbindlich:

1. **Phase 1 - Inventur**
2. **Phase 2 - Triage / Diagnose / Massnahmenkatalog**
3. **Phase 3 - Umsetzung**
4. **Phase 4 - Verifikation**

## 9. Repo-spezifische Pruefschwerpunkte

Diese Punkte muessen in mehreren Audits bewusst wiederkehren:

- React-SPA plus separater statischer Sonderpfad
- inhaltsgetriebene Architektur mit vielen `pages`, `sections` und `content`
- Material-/PDF-Oekosystem mit HTML-Textversionen und Downloads
- downloadbezogene Serverlogik
- hohe Bedeutung von Ton, Krisentauglichkeit, Verstaendlichkeit und
  Barrierefreiheit

## 10. Konkrete naechste Schritte

1. `qa/README.md` und `qa/codex-audit-prompts.md` auf diesen Gesamtplan
   ausrichten
2. fehlende Audit-Prompts fuer:
   - `seo-ia`
   - `modul-dramaturgie`
   - `pdf-materialien`
   - `test-qualitaet`
   - `release-readiness`
     ergaenzen
3. neue Audit-Laeufe kuenftig gegen diesen Plan statt nur gegen einzelne
   Teilspuren ausrichten
