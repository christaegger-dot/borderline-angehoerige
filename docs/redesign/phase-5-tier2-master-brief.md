# Phase 5 — Tier-2-Migration (Funktionale Referenz-Pages)

**Vorgeschichte:** Phase 4 (Tier 1) ist vollständig auf `main` (Home + 11 psychoeduktive Long-Form-Pages). Phase 5 migriert die funktionalen Pages: Listen, FAQs, Glossare, interaktive Tools.

**Grund-Unterschied zu Phase 4:** Diese Pages sind nicht Lesetexte mit Akkordeons. Sie sind Werkzeuge. Ein Wegweiser ist ein Entscheidungsbaum, ein Selbsttest ist eine Form, eine Notfallkarte ist ein Editor mit localStorage. Diese **funktionalen Strukturen bleiben strukturell unverändert**. Was sich ändert: Hero, Layout-Wrapper, Typografie, Farb-Tokens, Buttons-zu-Inline-Links wo sinnvoll.

## Geltungsbereich

Neun Pages, gruppiert nach Charakter:

**Gruppe A — Listen und Verzeichnisse** (Pattern ähnlich, kann seriell migriert werden):

1. Materialien (Handouts und PDFs, Filterleiste, Card-Grid)
2. FAQ (Akkordeon mit Fragen-Antworten)
3. Glossar (alphabetische Begriffsliste)
4. Buchempfehlungen (Buchkarten mit Coverbild)
5. Quellen (Literaturliste mit Zitationen)
6. Beratung & Netzwerke (Kontaktkarten)

**Gruppe B — Interaktive Tools** (jede Page hat eigene Mechanik, kein gemeinsames Pattern):

7. Wegweiser (Entscheidungsbaum mit sechs Krisensituationen)
8. Selbsttest (Form mit Routing-Empfehlung)
9. Notfallkarte (Editor mit localStorage-Persistenz)

## Strikte Reihenfolge

Gruppe A zuerst, weil sie ein gemeinsames Pattern entwickelt, das Gruppe B später nicht mehr braucht. Innerhalb Gruppe A nach aufsteigender Komplexität:

1. **Glossar** (einfachste — alphabetische Liste, keine Filter, keine Karten)
2. **Quellen** (Literatur-Liste, ähnlich Glossar)
3. **Buchempfehlungen** (Cards mit Bild)
4. **Beratung & Netzwerke** (Kontaktkarten mit Tel/Mail)
5. **FAQ** (Akkordeon — analog Tier 1, aber kürzere Items)
6. **Materialien** (komplexester Fall in Gruppe A — Filterleiste, Tag-Filter, Suche)
7. **Wegweiser** (Gruppe B beginnt)
8. **Selbsttest**
9. **Notfallkarte**

## Branch- und PR-Konvention

- Branch-Pattern: `claude/editorial-tier2-<page-slug>` — z.B. `claude/editorial-tier2-glossar`
- Auto-Merge bleibt durch das `claude/editorial-*`-Pattern unterdrückt (deckt auch tier2 ab)
- Pro PR genau eine Page

## Gemeinsame Migrationsschritte (alle 9 Pages)

Identisch zu Tier 1 für die strukturellen Teile:

1. **Layout** zu `EditorialLayout`. Width-Wahl pro Page entscheidet sich danach: `narrow` (38rem) für Listen mit Lesetext, `wide` (46rem) für Pages mit Filterleisten oder Card-Grids, die mehr Breite brauchen.
2. **Hero** editorial: Caps-Kicker, H1 Source Serif 4 weight 400, Lead in `--fg-secondary`. Lesezeit-Hinweis nur wenn die Page substanziellen Lesefluss hat (FAQ ja, Glossar nein, Wegweiser nein).
3. **Buttons im Lesefluss zu Inline-Links** (`editorial-link`-Klasse), wo sinnvoll. Form-Submit-Buttons und CTA-Buttons in funktionalen Tools (z.B. «Ergebnis anzeigen», «Karte speichern») bleiben **echte Buttons** — das ist eine Funktion, nicht ein Link.
4. **Reine Fade-In-Motion-Wrapper entfernen**, funktionale Animationen behalten.
5. **Typografie und Farb-Tokens** angleichen: keine `bg-sand-*` / `bg-navy-*` / `bg-cream-*` mehr, sondern `--bg-primary` und `--bg-elevated`.

## Page-spezifische Anweisungen

### Page 1 — Glossar

**Datei:** `client/src/pages/Glossar.tsx`
**Branch:** `claude/editorial-tier2-glossar`
**Width:** `narrow`

Strukturell:

- Alphabetische Liste mit Einträgen `Begriff — Definition` als `<dl>` mit `<dt>` und `<dd>`
- `<dt>` als Display-Serif H4-Stil
- `<dd>` als Body-Fliesstext
- Keine Karten, keine Hintergründe pro Eintrag
- Anker-Sprungleiste am Anfang (A B C … Z) als kleine Kapitälchen-Zeile in `--fg-tertiary`, Inline-Links zu `#letter-a` etc.
- Wenn Quervweise zwischen Begriffen vorhanden (z.B. «siehe auch …»): als `editorial-link` inline

### Page 2 — Quellen

**Datei:** `client/src/pages/Quellen.tsx`
**Branch:** `claude/editorial-tier2-quellen`
**Width:** `narrow`

Strukturell:

- Literatur-Liste, gruppiert nach Kategorie (z.B. «Klinische Manuale», «Praxisliteratur», «Studien»)
- Pro Eintrag: Autor (Jahr), _Titel_, Verlag/Journal, ggf. ISBN/DOI als Inline-Link
- Keine Karten — semantisch eine `<ol>` oder `<ul>` mit hängender Einrückung
- Quervweise zu `<EditorialFootnotes>`-Aufrufern auf anderen Pages (z.B. wenn `/verstehen` eine Fussnote auf einen Quellen-Eintrag verweist) als `id`-Anker erhalten

### Page 3 — Buchempfehlungen

**Datei:** `client/src/pages/Buchempfehlungen.tsx`
**Branch:** `claude/editorial-tier2-buchempfehlungen`
**Width:** `wide`

Strukturell:

- Bücher mit Cover, Titel, Autor, Kurzbeschreibung
- Cover bleibt — Bilder sind editorial-konform (siehe Über uns)
- Kein Card-Wrapper mit Schatten und Border-Radius — stattdessen: 2-Spalten-Layout pro Buch, Cover links (Thumbnail max. 120px breit), Text rechts; getrennt durch Hairline
- Mobile: gestackt
- «Bei [Buchhandlung] bestellen»-Buttons werden zu Inline-Links

### Page 4 — Beratung & Netzwerke

**Datei:** `client/src/pages/BeratungNetzwerke.tsx` (oder ähnlicher Name — Phase-0-Inventur prüfen)
**Branch:** `claude/editorial-tier2-beratung-netzwerke`
**Width:** `narrow`

Strukturell:

- Kontaktstellen mit Name, Beschreibung, Telefon, Mail, Webseite
- Pattern wie Home-Sektion 6 «Beratungseinladung»: H4 als Stellen-Name, kurzer Body-Absatz, Inline-Links für Tel/Mail/Web
- Telefon- und Mail-Daten ausschliesslich aus `client/src/data/kontakte.ts`
- Gruppierung nach Kategorie (z.B. «Beratungsstellen», «Selbsthilfegruppen», «Notfallkontakte») durch `EditorialSection`-Labels
- Keine Karten

### Page 5 — FAQ

**Datei:** `client/src/pages/FAQ.tsx`
**Branch:** `claude/editorial-tier2-faq`
**Width:** `narrow`

Strukturell:

- Akkordeon mit `ContentSection` (selbe Komponente wie Tier 1, gleiches Editorial-Treatment)
- Gruppierung nach Themenfeld (z.B. «Verstehen», «Verhalten in der Beziehung», «Therapie», «Eigene Belastung») durch `EditorialSection`-Labels
- Lesezeit-Hinweis im Hero: «Vollständig ca. X Min · Springen Sie zu einer Frage über das Inhaltsverzeichnis.»
- TableOfContents am Anfang, falls vorhanden — bleibt
- Anker-Klicks öffnen das Akkordeon (`openSection()`-Pattern aus Tier 1)

### Page 6 — Materialien

**Datei:** `client/src/pages/Materialien.tsx` (mit Section-Komponente `MaterialienLibrarySection.tsx` — Phase-0-Inventur zeigte 29 distinct Background-Farben, der heftigste Fall)
**Branch:** `claude/editorial-tier2-materialien`
**Width:** `wide`

Strukturell:

- Filterleiste (Suche, Tag-Filter, Sortierung) bleibt funktional, wird typografisch entschärft: Filter-Buttons als Inline-Pills mit `--rule-color`-Border, Active-State in `--accent-primary`, kein Schatten
- Item-Grid mit Thumbnails, Titel, Beschreibung, Action-Links (Pattern wie Grenzen-Materialien-Block)
- 29 Background-Farben aus Phase-0-Inventur konsolidieren auf `--bg-primary` und `--bg-elevated`
- «PDF öffnen» / «Textversion lesen» / «Download» als Inline-Links, **nicht** Buttons

### Page 7 — Wegweiser

**Datei:** `client/src/pages/Wegweiser.tsx` (mit Komponente `SituationsWegweiser.tsx`, 723 LOC)
**Branch:** `claude/editorial-tier2-wegweiser`
**Width:** `narrow`

Strukturell:

- Hero editorial — Caps-Kicker «Wegweiser», H1, Lead. **Kein** Lesezeit-Hinweis (das ist kein Lesetool).
- Eine Hairline (`border-t` mit `--rule-color`) als Übergang vom editorialen Hero in das funktionale Tool
- `SituationsWegweiser` selbst: Frage-Antwort-Pattern bleibt funktional. Aber die «Choices» (heute typischerweise grosse farbige Karten) werden zu **textuellen Multiple-Choice-Buttons**:
  - Layout: vertikale Liste, je `<button>` als ganze Zeile
  - Styling: `--bg-elevated`-Hintergrund, `--rule-color`-Border 1px, Hover: Border zu `--accent-primary`, Padding generös
  - Kein Icon links neben dem Text
  - Text in Body-Schrift, links-bündig
- Resultat-Seiten (Empfehlungen am Ende eines Pfades): editorial geschrieben, mit Inline-Links zu den passenden Tier-1-Seiten
- Sicherheits-kritische Pfade (Suizidalität, Selbstverletzung, Aggression): Resultat-Block darf farbig hervorgehoben sein — analog Grenzen-`gewalt`-Sektion

### Page 8 — Selbsttest

**Datei:** `client/src/pages/SelbsttestPage.tsx` (mit Komponente `Selbsttest.tsx`)
**Branch:** `claude/editorial-tier2-selbsttest`
**Width:** `narrow`

**WICHTIG — Identitätsklärung vor Migration:** In meinem ursprünglichen Walkthrough am Anfang dieses Projekts hatte ich diagnostiziert, dass `SelbsttestPage` eine Identitätskrise hat: in Navigation und Home als «Selbsttest — Belastung einschätzen» beworben, aber die Page selbst hat einen H1 «Finden Sie Ihren Weg» und ist in Wahrheit ein Routing-Tool. Vor der editorialen Migration: Christa entscheidet, was die Page sein soll (Belastungs-Test oder Routing-Tool), und der H1 plus alle Verlinkungen werden konsistent gemacht. Falls bereits in Phase 4 oder einem Polish-PR aufgelöst: nur prüfen, dass Konsistenz besteht.

Strukturell (sobald Identität geklärt):

- Hero editorial
- Form-Pattern mit klaren Skalen-Buttons oder Likert-Items
- Kein Card-Layout pro Frage — vertikaler Lesefluss mit Hairlines
- Submit-Button bleibt **echter Button** (Function), in Aubergine
- Resultat-Anzeige: editorial geschrieben, Empfehlungen als Inline-Links zu Tier 1

### Page 9 — Notfallkarte

**Datei:** `client/src/pages/Notfallkarte.tsx`
**Branch:** `claude/editorial-tier2-notfallkarte`
**Width:** `narrow`

Strukturell:

- Hero editorial — Kicker «Notfallkarte», H1, Lead, **kein** Lesezeit-Hinweis
- Editor-UI bleibt strukturell unverändert — Form-Felder, Print-Vorschau, localStorage-Persistenz, alle Texte
- Form-Felder bekommen die neuen Tokens: Border in `--rule-color`, Focus in `--accent-primary`, Background `--bg-elevated`
- localStorage-Fallback-Warnung («Speichern nicht möglich — jetzt drucken bevor Sie die Seite verlassen»): bleibt mit Alert-Styling, aber tonal entschärft (Hairline statt voller Kachel-Hintergrund, falls aktuell so)
- «Karte speichern» / «Drucken» / «Zurücksetzen» bleiben **echte Buttons** (Funktionen), nicht Inline-Links

## Was NICHT angefasst wird (gilt für alle 9 Pages)

- Inhaltstext (kein Wort umformulieren ausser Lesezeit-Hinweisen wo sinnvoll)
- Funktionale Logik der interaktiven Tools (Wegweiser-Tree, Selbsttest-Routing, Notfallkarte-Editor)
- localStorage-Persistenz und alle Privacy-relevanten Mechanismen
- SEO-Meta, Schema.org-Markup
- Anker-IDs und Cross-Page-Verweise

## Verifikation pro Page

`pnpm typecheck` / `lint` / `test` / `build` grün. Bei interaktiven Tools (Wegweiser, Selbsttest, Notfallkarte) zusätzlich: manueller Smoke-Test der Hauptfunktion.

PR-Body: Diff-Statistik, Liste der entfernten Motion-Wrapper, Liste der konvertierten Buttons (Inline-Link vs. echter Button — beide auflisten), Deploy-Preview-URL.

## STOP-Disziplin

Pro Page eigener PR, eigener STOP-Gate. Christa reviewt, freigibt, mergt. Die nächste Page beginnt erst nach explizitem «weiter mit \<Page>».

Ausnahme — falls Christa explizit «Gruppe A am Stück» sagt: dann Pages 1–6 ohne STOP-Gates, ein zusammenfassender Review nach Page 6, dann Pause vor Gruppe B. Aber nicht der Default.
