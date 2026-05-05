# Phase 3 — Stream 2a — Materialien-Hub Migration

**Repo:** `christaegger-dot/borderline-angehoerige`
**Branch-Pattern:** `claude/editorial-phase3-stream2a-materialien-{ts}`
**Datum:** 05.05.2026
**Auftraggeberin:** Christa Egger
**Bezug:** Phase 3 Stream 1 (Unterstützen-Hub) abgeschlossen — alle 4 Sub-Pages im Editorial-Pattern. Stream 2 wurde vorher als «UX-Veredelung kleinerer Elemente» grob umrissen; bei der Code-Inventur am 05.05.2026 zeigte sich, dass der Materialien-Hub (`/materialien`) der **letzte Filter-Tab-Konsument im alten «(count)»-Pattern** ist und gleichzeitig eine substantielle Library-Page mit 8 Sektionen — also kein UX-Element-Polish, sondern eine eigene Stream-2a-Migration.

---

## Was diese Migration ist (und nicht ist)

**Ist:** Migration der Materialien-Hub-Page (`/materialien`) in das EditorialSection-Pattern + Konsolidierung der Filter-Tabs auf das NEU-Pattern. Zwei Commits in einer PR — Commit 1 = Layout-Migration, Commit 2 = Tab-Konsolidierung.

**Ist nicht:** Inhaltliche Erweiterung. Restrukturierung der Material-Daten (`@/content/materialien`). Anpassung der Filter-Logik. Eingriff in die Preview-Modal-Komponente. Migration der HandoutTextPage (`/materialien/text/:id`).

### Strategischer Kontext

Materialien-Hub ist substantieller, als die ursprüngliche Stream-2-Skizze («UX-Veredelung kleinerer Elemente») nahegelegt hat. Bei der Code-Inventur am 05.05.2026 zeigte sich:

- 8 Sektionen auf der Page (Hero, Hinweis, QuickStarts, Kernmaterialien, Filter+Bibliothek, Spezialfälle, Weiter, Preview-Modal)
- 431 Zeilen `MaterialienLibrarySection.tsx` + 74 Zeilen `Materialien.tsx`
- Letzter unmigrierter Filter-Tab-Konsument (verbleibend nach PR #401 Honesty-Note: «Tab-Konsolidierung über alle 4 Pages sprengt Hotfix-Scope, separater Refactor-PR später»)
- Eigene Mini-Komponente `MaterialEntry` für Tile-Rendering mit Preview-Lightbox
- **Stateful Filter-Logik** mit `useState<MaterialCategory>` und programmatischen State-Settern aus QuickStarts + Spezialfälle-Buttons

Daher: eigene Migration als Stream 2a, getrennt von der noch ausstehenden UX-Veredelung-Liste (Stream 2b).

### Architektonische Entscheidung: Hub-Page mit eigenem Charakter

Materialien-Hub ist eine **Library-/Catalog-Page**, kein Content-Page wie die Tier-1-Pages. Funktion = Auffindbarkeit + Filter, nicht edukative Vertiefung. Migration soll diesen funktionalen Charakter erhalten:

- Hero ohne Tier-A-Illustration (analog Sub-Pages — kein neuer Tier-A-Anker)
- Filter + Tile-Grid in voller Container-Breite (analog Materialien-Sektionen auf Tier-1-Pages)
- QuickStarts + Spezialfälle bleiben als interaktive Navigations-Buttons funktional (kein reiner Inhalts-Block)

---

## Phase-2/Phase-3-Lehren angewandt

1. **MarginNote ≠ Body-Eyebrow** — keine Doppelung
2. **Tile-Grids ausserhalb Body-Spalte** — full container width
3. **Standard-Breakpoints** (`xl:` statt `min-[Npx]:`) — saubere CSS-Cascade
4. **Filter-Tabs typografisch veredelt** — Sage-Caps, Aubergine-Hairline, `mx-2.5` Punkt-Separator, keine Lucide-Icons (NEU-Pattern)
5. **Etappe 1 + 2 in EINEM PR** (Phase-2-Lehre nach Genesung-Mishap PR #404)
6. **Disclaimer typografisch markieren** — Hairline-Trenner + Sage-Akzent + italic (Phase-3-Stream-1-Polish-Pattern aus PR #411)

NEU für Stream 2a:

7. **Hub-Page-Identität durch funktionale Sektion-Hierarchie** — Hero + Disclaimer + QuickStarts + Kernmaterialien + Bibliothek (Filter+Grid) + Spezialfälle + Weiter. Alle als EditorialSection-Wrapper, aber Inhalt orientiert sich an Library-Funktion, nicht Edukations-Narrativ.
8. **Filter-State bleibt funktional unverändert** — `useState<MaterialCategory>` + programmatische Setter aus QuickStarts/Spezialfälle. Layout-Migration darf Filter-Logik nicht brechen.

---

## Ausgeklammerter Scope

- **Material-Daten** (`@/content/materialien`) bleiben unverändert. Material-Inventar, Kategorien, Priority-Flags (core/secondary), Reihenfolge — alles bleibt.
- **HandoutTextPage** (`/materialien/text/:handoutId`) ist eine separate Route, nicht Teil dieser Migration.
- **Preview-Modal** (Image-Lightbox) bleibt funktional unverändert.
- **Routing** bleibt unverändert. Keine eingehenden Hash-Anchor-Links zu spezifischen Sektionen (verifiziert in Vor-Implementierungs-Aufgabe 3).
- **Selbsttest-Page-Link** zu /materialien bleibt funktional (kein Hash-Anchor-Spezialfall).

---

## Pattern-Vorgaben

### Hero-Sektion

- `<EditorialSection variant="cream">`
- `MarginNote`: **«MATERIALIEN UND HILFEN»** _(empfohlen)_ — folgt Site-Pattern «zwei Substantive mit UND»
- `Body`:
  - Eyebrow «Materialien»
  - H1 «Materialien für _Angehörige_» (italic auf «Angehörige» analog Selbstfürsorge-Pattern)
  - Lede unverändert
  - Lede-Width `max-w-[40em]` (analog Sub-Pages ohne Aside)
- `Aside`: **leer** (intentional, analog Sub-Pages — keine Tier-A-Illustration)

### Hinweis-Disclaimer

- `<EditorialSection variant="cream">`
- `MarginNote`: **«HINWEIS»** oder **«ZUM LESEN»**
- `Body`: Disclaimer-Text typografisch markiert nach **PR #411-Pattern**:
  - Wrapper `<div className="border-t pt-5">` mit `border-color: var(--rule-color)`
  - Body-Text in `var(--accent-label)` (Sage-muted), `font-style: italic`
  - Strong-Hervorhebungen («Notfallkarte», ggf. Auszeichnungen) in `var(--fg-primary)`

### QuickStarts «Was hilft gerade jetzt?»

- `<EditorialSection variant="cream">`
- `MarginNote`: **«SCHNELLER EINSTIEG»**
- `Body`: H2 «Was hilft gerade jetzt?» + `<ul>` mit QuickStart-Items unverändert
- Buttons «Materialien dieser Kategorie ansehen» bleiben funktional (programmatische `setActiveCategory` + `scrollToResults`)

### Kernmaterialien «Empfohlene Kernmaterialien»

Header in EditorialSection + Tile-Grid in eigener full-width-section (analog Verstehen-Materialien-Pattern):

- Header-Section: `<EditorialSection variant="cream">` mit MarginNote **«KERNMATERIALIEN»**, Eyebrow «Bibliothek», H2 «Empfohlene Kernmaterialien», Lede + «Nach Kategorien filtern»-Button
- Tile-Grid: separate `<section>` mit `max-w-[1240px]`, `xl:grid-cols-3` (Standard-Breakpoint)

### Bibliothek (Filter + Sekundär-Grid)

Header in EditorialSection + Filter-Tabs + Tile-Grid in full-width-section:

- Header: `<EditorialSection variant="cream">` mit MarginNote **«BIBLIOTHEK»**, Eyebrow «Bibliothek», H2 «Weitere Materialien nach Kategorie»
- Filter-Tabs auf **NEU-Pattern**: `role="tablist"`, `«Label · {count}»` mit `mx-2.5`-Punkt-Separator, keine Lucide-Icons, `aria-selected` an aktivem Tab
- Tile-Grid: full-width, `xl:grid-cols-3`

### Spezialfälle «Besondere Konstellationen»

- `<EditorialSection variant="cream">`
- `MarginNote`: **«SPEZIALFÄLLE»** oder **«BESONDERE LAGEN»**
- `Body`: H2 «Besondere Konstellationen» + Lede + 3 Filter-Setting-Buttons (Kinder & Familie / Schuld & Erschöpfung / Grenzen & Selbstschutz) bleiben funktional unverändert

### Weiter «Von hier aus weiter»

- `<EditorialSection variant="cream">`
- `MarginNote`: **«WEITER»**
- `Body`: Schluss-Verweise zu Tier-1-Pages

### Preview-Modal

Bleibt unverändert (motion.div + framer-motion). Nicht Teil der Migration.

### Filter-Tabs (Tab-Konsolidierung — Commit 2)

Letzter Konsument der `EditorialPillButton variant="filter"`-Komponente. NEU-Pattern:

- `role="tablist"` (vorher `role="group"`)
- Counter-Format: `«Label · {count}»` mit `mx-2.5`-Punkt-Separator (vorher `«Label ({count})»` mit Klammern)
- `aria-hidden="true"` auf Separator
- `aria-selected="true"` am aktiven Tab (vorher `aria-pressed`)
- Lucide-Icons: keine vorhanden, kein Eingriff nötig

### Was NICHT verändert wird

- Material-Daten und Kategorien (Inhalt, Reihenfolge, Priority-Flags)
- QuickStarts-Items (Anzahl, Reihenfolge, Wortlaut)
- Spezialfälle-Buttons (Anzahl, Labels, Filter-Targets)
- Preview-Modal (Lightbox-Verhalten)
- Filter-State-Logik (`useState<MaterialCategory>`, `setActiveCategory`, `scrollToResults`)
- `gridRef` als Scroll-Target
- Tile-Komponente `MaterialEntry` (Inhalt + Verhalten unverändert)
- Routing (Path, Redirects, Sub-Routen)

---

## Migrations-Plan

### Commit 1 — Layout-Migration

- `Materialien.tsx`: Hero + Disclaimer in EditorialSection-Pattern, EditorialLayout-Wrapper raus
- `MaterialienLibrarySection.tsx`: 8 EditorialSectionBlocks in EditorialSection cream wrappen, Tile-Grids in full-width-Sections rausziehen
- Disclaimer-Typografie-Polish (Hairline + Sage-Akzent, analog PR #411)
- Filter-Tabs **noch NICHT** auf NEU-Pattern (bleibt OLD «(count)» bis Commit 2)

### Commit 2 — Tab-Konsolidierung

- Filter-Tabs in `MaterialienLibrarySection.tsx` Zeile 270-298: «(count)» → «· {count}» mit `mx-2.5`-Spacing
- `role="group"` → `role="tablist"`
- `aria-pressed` → `aria-selected`

### STOP-Gates

- **Nach Commit 1** (Layout-Migration): Christa-Verifikation am Deploy-Preview. Filter-Tabs noch im alten Stand — als Vorher/Nachher-Vergleich für Commit 2.
- **Nach Commit 2** (Tab-Konsolidierung): Christa-Verifikation. Bei grün → Mergen.

Beide Commits in einer PR (kein separater PR pro Commit) — Phase-2-Lehre nach Genesung-Mishap.

---

## Akzeptanzkriterien

Nach Phase 3 Stream 2a muss gelten:

1. **Visuelle Konsistenz** — Materialien-Hub im Editorial-Pattern, konsistent zu den 9 Tier-1-Pages und 4 Sub-Pages
2. **Filter-Logik unverändert** — `useState<MaterialCategory>`, programmatische Setter aus QuickStarts/Spezialfälle, Scroll-zum-Ergebnis funktional
3. **Filter-Tabs auf NEU-Pattern** — Sage-Caps, Aubergine-Hairline, `«Label · {count}»` mit Punkt-Separator, `role="tablist"`, `aria-selected`
4. **Tile-Grids in voller Container-Breite** — Kernmaterialien (sm:grid-cols-2) + Bibliothek-Sekundär-Grid (xl:grid-cols-3)
5. **Disclaimer typografisch differenziert** — Hairline-Trenner + Sage-Akzent + italic (analog Krise-Disclaimer aus PR #411)
6. **Eingehende Links bleiben funktional** — alle Verweise auf `/materialien` von Tier-1-Pages, Sub-Pages und Selbsttest
7. **HandoutTextPage-Route bleibt funktional** — `/materialien/text/:handoutId` unberührt
8. **Preview-Modal bleibt funktional** — Image-Lightbox + Klick-Schliessen
9. **Mobile (390 px)** — alle Sektionen einspaltig, Filter-Tabs scrollen horizontal
10. **WCAG-AA-Kontraste bleiben** — neue Sage-Akzente verifiziert
11. **Tests grün** — `materialien-library.test.tsx` muss nach Migration weiterlaufen (Filter-Logik bleibt unverändert)

---

## Was nicht passieren darf

- Kein neuer Text in den Sektionen
- Keine Änderung an Material-Daten oder Kategorien
- Keine Änderung an QuickStarts- oder Spezialfälle-Buttons (Labels, Targets)
- Kein neues Routing
- Keine neue Tier-A-Illustration für Hero
- Filter-State-Logik nicht verändern
- Preview-Modal nicht anfassen

---

## Vor-Implementierungs-Aufgaben

Vor Commit 1: drei Befunde als Mini-Bericht vorlegen.

### Aufgabe 1 — JS-Filter-Logik

Prüfen und beschreiben:

- Wo lebt der Filter-State? (`useState<MaterialCategory>` in welcher Komponente)
- Welche Komponenten setzen den State? (QuickStarts-Buttons, Spezialfälle-Buttons, Filter-Tabs selbst)
- Wie wird der `gridRef`-Scroll ausgelöst? (Welche Buttons rufen `scrollToResults`)
- Welche `useMemo`-Berechnungen hängen am State?
- Risiken bei Layout-Migration: was könnte den State oder den Scroll brechen?

### Aufgabe 2 — Disclaimer-Pattern

Prüfen und beschreiben:

- Wo sitzt aktuell der Disclaimer-Block? (`Materialien.tsx` Zeile ~59-68)
- Welche Inhalte? (Vorschau, Textversion-Hinweis, Notfallkarte)
- Soll der Disclaimer als eigene EditorialSection mit MarginNote werden, oder als Inline-Hinweis mit Hairline+Sage analog Krise?
- **Honesty-Note**: PR #411 hat den Krise-Disclaimer mit Hairline+Sage-italic in einer EditorialSection.Body gemacht (innerhalb «ORIENTIERUNG»-Sektion). Hier wäre der Disclaimer eine eigene Hinweis-Sektion zwischen Hero und QuickStarts. MarginNote-Vorschlag oder ohne MarginNote (rein typografischer Block)?

### Aufgabe 3 — Eingehende Spezialfälle-Anker

Prüfen und beschreiben:

- Gibt es Hash-Anchor-Links zu spezifischen Sektionen auf `/materialien` von anderen Pages? (z. B. `/materialien#bibliothek`)
- Gibt es Routing-Redirects, die auf `/materialien#xyz` zeigen? (analog `/therapieangebote` → `/unterstuetzen/therapie#therapieangebote`)
- Falls keine externen Hash-Anchors: Stream 2a kann Layout frei migrieren ohne Anchor-Erhaltung
- Falls externe Anchors existieren: ID-Targets entsprechend setzen

---

## Kontext-Dateien

Vor Implementations-Start lesen:

- `CLAUDE.md`
- `docs/redesign/phase-2-verstehen-pilot.md`
- `docs/redesign/phase-2-restmigration.md`
- `docs/redesign/phase-3-stream-1-unterstuetzen-hub.md`
- diesen Brief

Plus Code-Dateien:

- `client/src/pages/Materialien.tsx`
- `client/src/sections/MaterialienLibrarySection.tsx`
- `client/src/content/materialien.ts` (Daten — read-only)
- `client/src/sections/VerstehenMaterialsSection.tsx` (Referenz für NEU-Filter-Tab-Pattern)

---

## Was nach Phase 3 Stream 2a kommt

```
Phase 1 + Phase 2 + Phase 3 Stream 1                  ✓ abgeschlossen
PR #411 (Krise-Disclaimer-Polish)                     ✓ gemerged
Phase 3 Stream 2a — Materialien-Hub                   ← jetzt
Phase 3 Stream 2b — UX-Veredelung kleinerer Elemente  verschoben (braucht konkrete Beobachtungs-Liste
                                                       aus weiterer Klick-Erfahrung)
Phase 3 Stream 3 — Cluster 4 Feinschliff              verschoben (Mapping in
                                                       _dev/CLUSTER-4-MAPPING-2026-04-30.md, commit 035d8f8)
```

**Erwartung an Phase 3 Stream 2a:** 1-2 Sessions. Vor-Implementierungs-Aufgaben + Mini-Bericht in 1 Session, dann Commit 1 + Commit 2 in 1 PR über 1 Session.
