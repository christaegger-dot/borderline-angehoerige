# Phase 2 — Verstehen-Page als Pilot

**Repo:** `christaegger-dot/borderline-angehoerige`
**Branch-Pattern:** `claude/editorial-verstehen-phase2-$(date +%s)`
**Datum:** 03.05.2026
**Auftraggeberin:** Christa Egger
**Bezug:** Phase 1 abgeschlossen (Home in EditorialSection-Hülle migriert,
Tier-A-Illustrationen via PR #398 ins Repo gebracht). Phase 2 trägt das
Pattern auf die fünf Tier-1-Pages. Verstehen ist der **Pilot** —
beweist das Pattern auf einer Inhaltsseite, bevor die anderen vier
parallel migriert werden.

---

## Was Phase 2 — Verstehen ist (und nicht ist)

**Ist:** Migration der `/verstehen`-Page in das EditorialSection-
Pattern, Hero mit EisbergIllustration, durchgängige MarginNote-
Anker, typografische Veredelung der Filter-Tabs.

**Ist nicht:** Inhaltliche Erweiterung. Restrukturierung der
Akkordeon-Items. Anpassung der Tile-Daten oder Reihenfolge. Eingriff
auf andere Pages (kommen separat).

**Pilot-Funktion:** Wenn Verstehen funktioniert, ist das Pattern für
Kommunizieren, Grenzen, Selbstfürsorge, Genesung verifiziert. Wenn
Verstehen hakt, lernen wir an einer Page bevor wir den Fehler auf
fünf multiplizieren.

---

## Sektions-Mapping

Die Verstehen-Page hat aktuell folgenden Aufbau (von oben nach unten).
Jede Sektion bekommt eine Migration in EditorialSection.

```
1. Page-Hero                  → Sektion 1, EditorialSection cream
2. Worum es hier vor allem geht → Sektion 2, EditorialSection cream
3. Pull-Quote                 → Sektion 3, EditorialSection cream (Inline-Pull-Quote-Pattern)
4. Akkordeon (11 Items)       → Sektion 4, EditorialSection cream
5. Materialien zum Vertiefen  → Sektion 5, EditorialSection cream + Filter-Tab-Refactor
6. «Weiter»-Hinweis           → Sektion 6, EditorialSection cream
7. «Das könnte Sie auch interessieren» → Sektion 7, EditorialSection cream-deep
```

---

## Sektion 1 — Page-Hero

Aktueller Stand: kleiner Block mit Eyebrow «VERSTEHEN», Title
«Borderline verstehen», kurze Lede, Meta «Vollständig ca. 15 Min».

Neu:

- `<EditorialSection variant="cream">`
- `MarginNote`: Sage-Caps thematischer Anker
  - Erste Zeile: «BORDERLINE-PERSÖNLICHKEITSSTÖRUNG»
  - Verortet die Page thematisch, analog zur Home-MarginNote
    «FACHSTELLE ANGEHÖRIGENARBEIT · PSYCHIATRISCHE
    UNIVERSITÄTSKLINIK ZÜRICH»
  - Stil: identisch zu den anderen MarginNotes (Sage-Caps,
    13 px, letter-spacing 0.14em, color var(--accent-label))
- `Body`:
  - Eyebrow «Verstehen» (klein, Sage-Caps wie bisher)
  - H1: **«Borderline verstehen, ohne die Distanz zu verlieren.»**
    (NEU — der bisherige Title «Borderline verstehen» war zu kurz
    für Editorial-H1-Wirkung. Der neue Title öffnet eine fachliche
    Spannung, die zur Eisberg-Illustration und zur Botschaft der
    Page passt.)
  - Lede: bestehender Lede-Text «Für Angehörige ist Borderline
    oft nicht nur schwer zu begreifen, sondern schwer auszuhalten.
    Situationen kippen, Reaktionen wirken widersprüchlich, die
    eigene Rolle bleibt unklar.» — typografisch wie auf der Home,
    ~22 px Source Serif Regular, generöse line-height
  - Meta-Zeile: «Vollständig ca. 15 Min · Auch abschnittsweise
    lesbar» — mit Hairline-Trenner darüber, klein, sage-caps-
    artig
- `Aside`:
  - `<EisbergIllustration className="..." />`
  - Layout analog zum Home-Hero: max-width matching Hero-Aside-
    Logik, height: 100%, margin-left: auto (rechtsbündig)
  - Auf 1280 px Viewport sollte die Eisberg-Höhe mindestens
    400 px betragen, sonst wirkt die Illustration als Beilage
    statt als Anker (Lehre aus Phase 1.5)

Akzeptanzkriterium: Hero auf 1280 px wirkt **gleichwertig** zum
Home-Hero. Wenn Du beim Visual-Review zwischen Home und Verstehen
hin- und herklickst, sollte sich das wie zwei Sektionen derselben
Site anfühlen, nicht wie zwei verschiedene Seiten.

---

## Sektion 2 — Worum es hier vor allem geht

Aktueller Stand: zentrierte Lese-Spalte mit Eyebrow «ÜBERBLICK»,
H2 «Worum es hier vor allem geht», drei dichte Absätze.

Neu:

- `<EditorialSection variant="cream">`
- `MarginNote`: «KERNTHEMA» oder «WORUM ES GEHT»
  - **Bitte Christa für die finale Wahl fragen** — beide
    funktionieren, aber sind unterschiedlich akzentuiert. Falls
    keine Präferenz: nimm «KERNTHEMA» (kürzer, präziser,
    konsistenter mit Home-Pattern wie «GRUNDGEDANKE»)
- `Body`: bisheriger Inhalt unverändert. Eyebrow «Überblick»
  bleibt im Body als Sektions-Eyebrow.
- `Aside`: leer (Sektion bleibt zweispaltig)

---

## Sektion 3 — Pull-Quote

Aktueller Stand: Pull-Quote zwischen Eingang und Akkordeon, mit
Attribution «— Eine Angehörige (Komposition, keine reale Person)».
Aktuell typografisch klein und unauffällig.

Neu — **inline, aber typografisch deutlich aufgewertet**:

- `<EditorialSection variant="cream">` (eigene Sektion, eigene
  vertikale Atemmarge)
- `MarginNote`: leer (keine MarginNote — der Pull-Quote selbst ist
  die Geste, das wäre redundant)
- `Body`:
  - Pull-Quote: Source Serif italic, **28-32 px**, line-height 1.4,
    color var(--accent-primary) — also Aubergine, nicht Standard-
    Body-Schwarz
  - Mit «»-Anführungszeichen als typografische Marken in
    Cream mit niedriger Opacity (#f5ece6 mit opacity ~0.32),
    ähnlich der Home-Aubergine-Pull-Quote-Geste — ABER:
    da hier auf Cream-Hintergrund, müssen die «» eigentlich
    in Aubergine mit niedriger Opacity sein. Bitte teste mit
    rgba(91, 58, 78, 0.25) und passe an, falls visuell zu
    laut/zu leise.
  - Attribution darunter: kleiner, italic, sage-grau,
    «— Eine Angehörige (Komposition, keine reale Person)»
  - Quote zentriert in der Body-Spalte, generöse vertikale
    Padding (mindestens 64 px oben und unten)
- `Aside`: leer

Akzeptanzkriterium: Pull-Quote ist eine spürbare **Lese-Pause**
zwischen Eingangs-Sektion und Akkordeon-Tiefe. Beim Scrollen
sollte er den Lesefluss bremsen, nicht beschleunigen.

---

## Sektion 4 — Akkordeon (11 Items)

Aktueller Stand: 11 Akkordeon-Items hintereinander, alle gleich-
gewichtet.

Neu:

- `<EditorialSection variant="cream">`
- `MarginNote`: **«LEITFRAGEN»**
  - Begründung: jede Akkordeon-Überschrift ist eine Frage,
    die Angehörige sich (oder anderen) stellen. «LEITFRAGEN»
    beschreibt funktional, was die Liste leistet, ohne
    bevormundend zu wirken.
- `Body`:
  - Section-H2 (falls einer existiert oder gewünscht ist —
    aktuell hat die Sektion keinen, der Akkordeon-Header
    ist gleich der erste Akkordeon-Item-Trigger). Falls
    kein H2: lassen wir es so.
  - Die 11 Akkordeon-Items unverändert. UI-Pattern bleibt
    Akkordeon, nicht migriert auf andere Komponenten.
- `Aside`: leer

WICHTIG: Akkordeon-Items selbst werden **NICHT** restrukturiert.
Phase 2 Verstehen ist Layout-Migration, nicht Inhalts-Refactor.

---

## Sektion 5 — Materialien zum Vertiefen

Aktueller Stand: Eyebrow «MATERIALIEN», H2 «Materialien zum Vertiefen»,
einleitender Lede-Text, Filter-Tabs (Alle 7 / Grundlagen 4 /
Stress & Gehirn 3), 7 Tile-Karten mit Infografiken.

Neu — zwei Operationen:

### 5a — Editorial-Wrapper

- `<EditorialSection variant="cream">`
- `MarginNote`: **«MATERIALIEN ZUM VERTIEFEN»**
- `Body`: Eyebrow + H2 + Lede («Diese Materialien ergänzen die
  Seite, ersetzen sie aber nicht...»)
- `Aside`: leer

ABER: das Tile-Grid und die Filter-Tabs durchbrechen die normale
Container-Logik und nehmen die volle 1240px-Containerbreite ein
(analog zum VisualOrientationGrid auf der Home). Der Editorial-
Wrapper umschliesst nur Eyebrow + H2 + Lede; Tabs und Tiles liegen
darunter in einer eigenen Wrapper-Sektion ohne Margin/Aside.

### 5b — Filter-Tabs typografisch veredeln

Aktueller Stand: Tabs als Buttons mit Background, Border,
abgerundeten Ecken. Standard-UI, fühlt sich «Software-mässig» an
auf einer ansonsten editorialen Page.

Neu:

- Sage-Caps-Labels (gleiches typografisches Set wie MarginNotes:
  font-size 13 px, letter-spacing 0.14em, uppercase, color
  var(--accent-label))
- Kein Button-Background
- Kein Border
- Keine abgerundeten Ecken
- Aktiver Tab markiert durch **2 px Aubergine-Hairline darunter**
  (color var(--accent-primary))
- Inaktive Tabs ohne Hairline
- Trenner zwischen Labels: feine Hairlines (~1 px Sage mit
  niedriger Opacity), wie bei der Notfall-Bar oben («Schweiz ·
  Kanton Zürich · Für andere Regionen...»)
- Hover-State: Hairline scheint subtil auf (Aubergine mit
  opacity 0.4 oder ähnlich)
- Focus-State: sichtbarer Focus-Ring beim Tab-Navigation
  (Aubergine outline, 2 px, offset 2 px)
- A11y: `aria-selected="true"` am aktiven Tab, `role="tab"`,
  `role="tablist"` am Container
- Tab-Counts in Klammern bleiben («Alle 7», «Grundlagen 4»),
  aber nicht hervorgehoben

WICHTIG zur Komponenten-Struktur: Falls die Tab-Komponente
bereits zentral existiert und auch auf anderen Pages verwendet
wird (vermutlich Selbstfürsorge, Grenzen, evtl. Genesung),
bitte die zentrale Komponente anfassen, sodass das Pattern
automatisch an allen Stellen ankommt. Keine Doppel-Implementierung
nur für Verstehen. Wenn die Tabs page-spezifisch sind, dann nur
hier anfassen.

WICHTIG zur Tile-Logik: Tile-Auswahl, Tile-Reihenfolge, Tile-
Detailansichten alle UNVERÄNDERT. Phase 2 Verstehen rührt nichts
am Inhalt.

---

## Sektion 6 — «Weiter»-Hinweis

Aktueller Stand: kurzer Lese-Hinweis-Text, der zu Unterstützen
verlinkt.

Neu:

- `<EditorialSection variant="cream">`
- `MarginNote`: **«WEITER»** (kurz, klar, konsistent zur
  bisherigen Sektions-Eyebrow-Logik)
- `Body`: bisheriger Hinweis-Text mit Link zu /unterstuetzen
- `Aside`: leer

---

## Sektion 7 — «Das könnte Sie auch interessieren»

Aktueller Stand: Eyebrow «WEITERFÜHREN», H2 «Das könnte Sie auch
interessieren», drei kurze Querverweise (Unterstützen, Kommunizieren,
Selbsttest).

Neu:

- `<EditorialSection variant="cream-deep">` (warmer Akzent zur
  Abhebung, analog zum Fachstelle-CTA auf der Home)
- `MarginNote`: **«WEITERFÜHREN»** oder **«MEHR LESEN»**
  - Vorschlag: «WEITERFÜHREN» (knüpft an den bisherigen
    Eyebrow-Wortlaut an)
- `Body`: H2 + die drei Querverweis-Karten (oder Text-Links,
  je nach aktueller Implementation)
- `Aside`: leer

---

## Migrations-Reihenfolge mit STOP-Gates

Sieben Sektionen, in zwei Etappen migrieren, damit Visual-Review
machbar bleibt.

```
Etappe 1 — Hero + Eingang:
  Schritt 1 → Sektion 1 (Hero mit EisbergIllustration)
  Schritt 2 → Sektion 2 (Worum es hier vor allem geht)
  Schritt 3 → Sektion 3 (Pull-Quote)
  ← STOP-Gate, Christa prüft Eingang der Page

Etappe 2 — Tiefe + Abschluss:
  Schritt 4 → Sektion 4 (Akkordeon-Wrapper mit LEITFRAGEN)
  Schritt 5 → Sektion 5 (Materialien-Wrapper + Tab-Refactor)
  Schritt 6 → Sektion 6 (Weiter-Hinweis)
  Schritt 7 → Sektion 7 (Querverweise)
  ← STOP-Gate, Christa prüft ganze Page
```

---

## Akzeptanzkriterien

Nach Phase 2 Verstehen muss gelten:

1. **Visuelle Konsistenz mit Home.** Wenn Christa zwischen Home und
   Verstehen hin- und herklickt, fühlt es sich wie zwei Sektionen
   derselben Site an, nicht wie zwei verschiedene Seiten.

2. **Hero trägt.** Eisberg-Illustration mindestens 400 px hoch,
   rechtsbündig, H1 mit Editorial-Wirkung (mindestens 60 px font-size,
   maximal drei Zeilen Bruch).

3. **Pull-Quote als Pause.** Beim Scrollen ist der Pull-Quote
   spürbar als Lese-Pause, nicht als kleines Detail.

4. **Filter-Tabs typografisch.** Keine Button-Optik mehr, Sage-Caps-
   Labels, Aubergine-Hairline am aktiven Tab.

5. **Alle 11 Akkordeon-Items vollständig erhalten.** Kein Item
   entfernt, gekürzt, oder umstrukturiert.

6. **Alle Tile-Daten unverändert.** Sieben Materialien-Tiles in
   bestehender Reihenfolge, mit bestehenden Filter-Kategorien.

7. **Bestehende WCAG-Kontraste bleiben.** Insbesondere die
   Aubergine-Pull-Quote-Color, die neuen Sage-Caps-Tab-Labels,
   die aktiven Tab-Hairlines.

8. **A11y der Tabs verbessert sich.** `aria-selected`, `role="tab"`,
   sichtbarer Focus-Ring.

9. **Mobile (390 px) ist nicht schlechter als jetzt.** Alle Sektionen
   bleiben einspaltig, MarginNotes als Inline-Eyebrows.

---

## Was nicht passieren darf

- Kein neuer Text in den Sektionen. Alle Inhalte aus der bestehenden
  Page.
- Keine Akkordeon-Restrukturierung. Die 11 Items bleiben wie sie sind.
- Keine Tile-Anpassung. Sieben Tiles, bestehende Reihenfolge.
- Kein neues Routing.
- Kein Eingriff auf andere Pages (Kommunizieren, Grenzen, Selbstfürsorge,
  Genesung) — die kommen nach Verstehen-Pilot-Abnahme separat.

---

## Zur EisbergIllustration

Die Komponente liegt in `client/src/components/illustrations/` (PR #398
gemerged). Import:

```tsx
import { EisbergIllustration } from "@/components/illustrations";
```

Die Illustration ist standardmässig dekorativ (`aria-hidden="true"`).
Falls für Verstehen ein Accessible Label sinnvoll ist (weil die Eisberg-
Metapher zur Page-Botschaft beiträgt), kann es per Prop gesetzt werden:

```tsx
<EisbergIllustration
  ariaLabel="Eine Eisberg-Spitze über der Wasserlinie und eine grosse
             verborgene Form darunter. Symbolisiert: was sichtbar ist,
             ist nur ein kleiner Teil des Ganzen."
/>
```

**Christas Entscheidung:** Soll der ariaLabel gesetzt werden? Vorschlag:
ja, weil die Eisberg-Illustration auf Verstehen mehr trägt als reine
Dekoration. Der Text oben ist der präzise Vorschlag.

---

## Reihenfolge in der Phase

```
Phase 1 (Home, Layout-Hülle, Konsolidierung)        ✓ abgeschlossen
PR #398 (Tier-A-Illustrationen ins Repo)            ✓ gemerged
Phase 2 — Verstehen (diese Datei, als Pilot)        ← jetzt
Phase 2 — Kommunizieren (nach Verstehen-Abnahme)
Phase 2 — Grenzen
Phase 2 — Selbstfürsorge
Phase 2 — Genesung
Phase 3 — UI-Veredelung (kleinere Elemente, Konsistenz-Pass)
```

Falls die Verstehen-Migration smooth läuft, können Kommunizieren,
Grenzen, Selbstfürsorge, Genesung **parallel** gemacht werden — ein
Brief, vier Migrationen, ein zusammengefasster Visual-Review. Falls
Verstehen Stolpersteine zeigt (z.B. Pull-Quote-Pattern hakt, Filter-
Tab-Veredelung wird zu komplex), machen wir die anderen vier seriell.

Christas Erwartung: **Verstehen-Pilot smooth durchziehen, dann
entscheiden über parallele oder serielle Restmigration.**
