# Phase 2 — Restmigration der vier Tier-1-Pages

**Repo:** `christaegger-dot/borderline-angehoerige`
**Branch-Pattern:** `claude/editorial-phase2-rest-{page}-{ts}`
**Datum:** 04.05.2026
**Auftraggeberin:** Christa Egger
**Bezug:** Phase-2-Pilot Verstehen erfolgreich abgeschlossen (PR #399 + Hotfixes #400, #401 gemerged). Diese Restmigration trägt das Pattern auf die vier verbleibenden Tier-1-Pages: Kommunizieren, Grenzen, Selbstfürsorge, Genesung.

---

## Was diese Restmigration ist (und nicht ist)

**Ist:** Migration der vier Tier-1-Pages in das EditorialSection-Pattern, jeweils mit Hero (eigene Tier-A-Illustration), durchgängige MarginNote-Anker pro Sektion, typografische Veredelung der Filter-Tabs, Konsolidierung der Tab-Komponente über alle Pages hinweg.

**Ist nicht:** Inhaltliche Erweiterung. Restrukturierung von Akkordeon-Items oder Tile-Listen. Anpassung der Routing-Struktur. Eingriff auf Unterstützen-Hub (kommt in Phase 3).

**Pilot-Lehren, die hier eingeflossen sind:**

1. **MarginNote und Body-Eyebrow müssen unterschiedliche Funktionen haben.** Im Pilot hatten wir die Doppelung «WEITERFÜHREN»/«WEITERFÜHREN» gefixt zu «VERWANDT»/«WEITERFÜHREN». MarginNote ist die fachliche/redaktionelle Verortung der Sektion, Body-Eyebrow ist die funktionale Bezeichnung des Inhalts. Sie sollen sich ergänzen, nicht wiederholen.

2. **Tile-Grids gehören explizit ausserhalb der Body-Spalte.** Im Pilot war der Materialien-Tile-Grid implizit innerhalb der 608-px-Body-Spalte gelandet, was zu schmalen Spalten geführt hat. Tile-Grids müssen wie das VisualOrientationGrid auf der Home die volle Container-Breite (1240 px) nutzen.

3. **Standard-Breakpoints statt arbiträrer.** Der Tile-Grid-Bug war ein Tailwind-v4-Cascade-Sortierungsproblem mit `min-[1100px]:grid-cols-3`, das durch `xl:grid-cols-3` gelöst wurde. Auf den Restpages: keine arbiträren Breakpoints, nur Standard sm/md/lg/xl/2xl.

4. **Filter-Tabs typografisch veredelt, ohne Lucide-Icons.** Sage-Caps-Labels, kein Button-Background, 2 px Aubergine-Hairline am aktiven Tab, Punkt-Separator (`·`) zwischen Label und Counter mit `mx-2.5`-Spacing. Lucide-Icons werden bei dieser Migration entfernt.

5. **Eisberg-Refresh hat gezeigt, dass File-Replace robust verifiziert werden muss.** Bei jedem Tier-A-Illustrations-Einsatz: nach dem Migrations-Schritt verifizieren, dass die Hero-Illustration im Deploy-Preview wirklich die richtige ist — entweder per File-Hash oder per visuellem Check.

---

## Ausgeklammerter Scope

**Unterstützen-Hub** (4 Sub-Pages: /uebersicht, /alltag, /therapie, /krise) **wird NICHT** in dieser Restmigration migriert.

Begründung: Der Hub stellt eine inhaltlich-strategische Frage (behalten als Hub mit Tab-Subnavigation oder auflösen zu einer einzigen Page), die nicht unter Migrations-Zeitdruck entschieden werden soll. Diese Frage gehört in Phase 3 mit eigenem Brief.

**Akzeptierter Mix-Stand nach dieser Restmigration:**

- 5 Tier-1-Pages editorial migriert (Verstehen aus Pilot + die vier hier neuen)
- Unterstützen-Hub im alten Stil
- Eventuell weitere Sekundärseiten (FAQ, Glossar, Diagnostik etc.) im alten Stil

Dies ist gewollter Zwischenstand vor Phase 3, nicht Bug.

---

## Pattern-Vorgaben — gelten für alle vier Pages

Diese Vorgaben sind das Pattern-Skelett. Pro-Page-Variationen folgen in den Sub-Briefs darunter.

### Hero-Sektion

- `<EditorialSection variant="cream">`
- `MarginNote`: thematischer Sage-Caps-Anker (siehe Pro-Page-Variation)
- `Body`:
  - Eyebrow (sage-caps, klein) — meist der Bereichsname
  - H1 in Source Serif gross gesetzt (siehe Pro-Page-Variation)
  - Lede typografisch wie auf Verstehen (~22 px Source Serif Regular)
  - Meta-Zeile mit Hairline-Trenner und Lesedauer-Schätzung
- `Aside`: zugewiesene Tier-A-Illustration mit `ariaLabel`-Prop

### Inhalts-Sektionen

- Pro Sektion `<EditorialSection variant="cream">`
- `MarginNote`: Sage-Caps-Wort, das die fachliche Funktion der Sektion verortet
- `Body`: bestehender Inhalt, Eyebrow + H2 + Text/Akkordeon/etc.
- `Aside`: leer, ausser bei Sektionen mit explizitem Aside-Inhalt

### Pull-Quote (falls vorhanden)

- `<EditorialSection variant="cream">` als eigene Sektion
- `MarginNote`: leer (keine MarginNote — der Pull-Quote selbst ist die Geste)
- `Body`: Pull-Quote inline, Source Serif italic ~28-32 px, Aubergine-Color, mit «»-Marken in Aubergine-niedrige-Opacity, generöser vertikaler Padding (mindestens 64 px oben und unten)
- `Aside`: leer

### Materialien-Sektion (falls vorhanden)

- `<EditorialSection variant="cream">` für Header (Eyebrow + H2 + Lede + Filter-Tabs)
- `MarginNote`: «MATERIALIEN ZUM VERTIEFEN» oder Page-spezifische Variation
- Tile-Grid darunter, **AUSSERHALB der Body-Spalte**, in voller Container-Breite (analog VisualOrientationGrid auf Home), mit `xl:grid-cols-3` für Tablet+ und `sm:grid-cols-2` für Mobile

### Querverweise-Sektion (am Ende der Page)

- `<EditorialSection variant="cream-deep">` (warmer Akzent zur Abhebung)
- `MarginNote`: «VERWANDT» (analog Verstehen-Pilot)
- `Body`: Eyebrow «WEITERFÜHREN» + H2 «Das könnte Sie auch interessieren» + Querverweis-Karten

### Filter-Tabs (Tab-Konsolidierung)

Alle vier Pages, die Filter-Tabs haben, werden auf das **NEU-Pattern** angeglichen:

- Sage-Caps-Labels (font-size 13 px, letter-spacing 0.14em, uppercase, color var(--accent-label))
- Kein Button-Background, kein Border, keine abgerundeten Ecken
- Aktiver Tab markiert durch 2 px Aubergine-Hairline darunter
- Punkt-Separator (`·`) zwischen Label und Counter, mit `mx-2.5`-Spacing (10 px links und rechts)
- **Lucide-Icons entfernt** (Heart, ShieldAlert, MessageCircle etc.)
- Hover-State: Hairline scheint subtil auf
- Focus-State: sichtbarer Aubergine-Outline-Ring
- A11y: `aria-selected="true"` am aktiven Tab, `role="tab"`, `role="tablist"` am Container

Die zentrale Komponente `EditorialPillButton variant="filter"` ist bereits im Repo. Bei der Restmigration werden die **Konsumenten-Markups** auf den vier Pages so angepasst, dass alle das gleiche Pattern aufrufen.

### Was NICHT verändert wird

- Akkordeon-Item-Inhalte und -Reihenfolge bleiben unverändert
- Tile-Auswahl und -Reihenfolge bleibt unverändert
- Inhaltliche Texte werden nicht angefasst
- Routing bleibt unverändert

---

## Sub-Brief 1 — /kommunizieren

### Aktueller Stand (von Christa zu verifizieren beim Implementations-Start)

Page-Title aktuell: «Gespräche in belasteten Beziehungen»

Vermutete Sektionen (Claude Code prüft beim Start):

- Hero
- Eingangs-Sektion mit Lead-Text
- Inhalts-Sektionen (möglicherweise mit Akkordeon zu Gesprächstechniken: DEAR MAN, GIVE, FAST?)
- Pull-Quote (Vorhandensein bitte prüfen)
- Materialien-Sektion mit Filter-Tabs
- «Weiter»-Hinweis
- Querverweise

### Migration

**Hero:**

- `MarginNote`: «GESPRÄCH UND VERBINDUNG»
- `H1`: **«Gespräche in belasteten Beziehungen — wie Verbindung möglich bleibt.»**
- Eyebrow: «Kommunizieren»
- Lede: bestehende Lede behalten oder leicht erweitern, falls aktuell zu kurz
- Meta-Zeile: Lesedauer (Claude Code schätzt anhand der Wörter-Anzahl)
- `Aside`: `<FadenIllustration ariaLabel="Ein dünner Faden, der zwischen zwei Punkten gespannt ist und trotz Belastung trägt." />`

**Inhalts-Sektionen — MarginNote-Vorschläge** (Claude Code wählt pro Sektion das passende, falls die tatsächliche Sektionsstruktur abweicht):

- Eingangs-Übersicht: «KERNHALTUNG» oder «AUSGANGSPUNKT»
- Akkordeon (falls vorhanden): «WERKZEUGE» oder «GESPRÄCHSTECHNIKEN»
- Eskalations-Sektion (falls vorhanden): «WENN ES KIPPT»

**Pull-Quote** (falls vorhanden): inline, Pattern wie auf Verstehen.

**Materialien:** «MATERIALIEN ZUM VERTIEFEN» als MarginNote, Filter-Tabs auf NEU-Pattern, Tile-Grid in voller Container-Breite.

**Weiter-Hinweis:** MarginNote «WEITER».

**Querverweise:** MarginNote «VERWANDT», Body-Eyebrow «WEITERFÜHREN», cream-deep variant.

---

## Sub-Brief 2 — /grenzen

### Aktueller Stand (von Christa zu verifizieren beim Implementations-Start)

Page-Title aktuell: «Grenzen setzen»

Vermutete Sektionen:

- Hero
- Eingangs-Übersicht
- Inhalts-Sektionen zu verschiedenen Grenz-Typen (physisch, emotional, zeitlich?)
- Pull-Quote (Vorhandensein bitte prüfen)
- Materialien-Sektion mit Filter-Tabs
- Querverweise

### Migration

**Hero:**

- `MarginNote`: «GRENZE UND BEZIEHUNG»
- `H1`: **«Grenzen setzen, ohne die Beziehung aufzugeben.»**
- Eyebrow: «Grenzen»
- Lede: bestehende, falls vorhanden
- Meta-Zeile: Lesedauer
- `Aside`: `<InnenraeumeIllustration ariaLabel="Zwei Räume, die sich respektieren — durch eine durchlässige Membran getrennt, nicht durch eine Mauer." />`

**Inhalts-Sektionen — MarginNote-Vorschläge:**

- Eingangs-Übersicht: «KERNFRAGE»
- Grenz-Typen-Sektion: «ARTEN VON GRENZEN»
- Praxis-Sektion: «IN DER PRAXIS»
- Wenn-es-schwierig-Sektion: «WENN ES SCHWER WIRD»

**Pull-Quote** (falls vorhanden): inline.

**Materialien:** «MATERIALIEN ZUM VERTIEFEN», Tabs auf NEU-Pattern.

**Querverweise:** «VERWANDT» / «WEITERFÜHREN», cream-deep.

---

## Sub-Brief 3 — /selbstfuersorge

### Aktueller Stand (von Christa zu verifizieren beim Implementations-Start)

Page-Title aktuell: «Selbstfürsorge für Angehörige»

Vermutete Sektionen:

- Hero
- Eingangs-Übersicht
- Inhalts-Sektionen (Warnsignale erkennen, Regeneration, Belastungsindikatoren?)
- Pull-Quote (Vorhandensein bitte prüfen)
- Selbsttest-Verweis oder integrierter Selbsttest
- Materialien-Sektion mit Filter-Tabs
- Querverweise

### Migration

**Hero:**

- `MarginNote`: «BELASTUNG UND SCHUTZ»
- `H1`: **«Selbstfürsorge für Angehörige — was trägt, wenn die Belastung bleibt.»**
- Eyebrow: «Selbstfürsorge»
- Lede: bestehende
- Meta-Zeile: Lesedauer
- `Aside`: `<SchaleIllustration ariaLabel="Eine offene Schale, die etwas hält ohne zu greifen — selbst tragend, selbst geformt." />`

**Inhalts-Sektionen — MarginNote-Vorschläge:**

- Eingangs-Übersicht: «KERNFRAGE»
- Warnsignale: «SIGNALE WAHRNEHMEN»
- Praxis-Sektion: «WAS HILFT»
- Wenn-es-zu-viel-wird: «WENN ES NICHT MEHR REICHT»

**Pull-Quote** (falls vorhanden): inline.

**Materialien:** «MATERIALIEN ZUM VERTIEFEN», Tabs auf NEU-Pattern.

**Querverweise:** «VERWANDT» / «WEITERFÜHREN», cream-deep.

**Honesty-Note für Christa:** Falls auf Selbstfürsorge ein integrierter Selbsttest existiert (interaktive Komponente), bleibt diese funktional unverändert. Die umliegende EditorialSection-Hülle wird drumherum gelegt, aber die Selbsttest-Komponente selbst nicht angefasst.

---

## Sub-Brief 4 — /genesung

### Aktueller Stand (von Christa zu verifizieren beim Implementations-Start)

Page-Title aktuell: «Genesung ist möglich»

Vermutete Sektionen:

- Hero
- Eingangs-Übersicht (Was Genesung heisst, was nicht)
- Inhalts-Sektionen (Phasen, Rückfälle, Hoffnung)
- Pull-Quote (Vorhandensein bitte prüfen — bei einer Genesungs-Page sehr wahrscheinlich)
- Materialien-Sektion mit Filter-Tabs (möglicherweise weniger oder keine — bitte prüfen)
- Querverweise

### Migration

**Hero:**

- `MarginNote`: «WEG UND BEWEGUNG»
- `H1`: **«Genesung ist möglich — und sieht selten geradlinig aus.»**
- Eyebrow: «Genesung»
- Lede: bestehende
- Meta-Zeile: Lesedauer
- `Aside`: `<GewundenerWegIllustration ariaLabel="Ein gewundener Weg mit Wegmarkern, der nicht zu einem Ziel führt, sondern in Bewegung hält." />`

**Inhalts-Sektionen — MarginNote-Vorschläge:**

- Eingangs-Übersicht: «KERNGEDANKE»
- Phasen-Sektion: «BEWEGUNGSMUSTER»
- Rückfall-Sektion (falls vorhanden): «WENN ES RÜCKWÄRTS GEHT»
- Hoffnungs-Sektion: «WAS TRÄGT»

**Pull-Quote** (sehr wahrscheinlich vorhanden, fachlich passend): inline.

**Materialien:** falls vorhanden, gleiches Pattern.

**Querverweise:** «VERWANDT» / «WEITERFÜHREN», cream-deep.

---

## Migrations-Reihenfolge

### Empfohlene Reihenfolge: parallel, aber pro Page eigener PR

Vier separate Pull-Requests, einer pro Page. Begründung:

1. **Saubere Diff-Lesbarkeit.** Vier Pages in einem PR wäre unübersichtlich, jede Page in eigenem PR macht den Visual-Review präzise.
2. **Risikoisolierung.** Falls eine Page hakt, blockiert sie nicht die anderen drei.
3. **Christa kann pro Page einzeln freigeben** — bei Bug auf Genesung können Kommunizieren, Grenzen, Selbstfürsorge schon gemerged sein.

Die vier PRs können **parallel** erstellt werden — Claude Code arbeitet sie aber **seriell** ab, damit Christa pro Page einen klaren Visual-Review machen kann. Sie kann die anderen drei in der Wartezeit für andere Sachen nutzen.

### STOP-Gates pro Page

Jede Page hat einen STOP-Gate **nach Hero und Eingangs-Sektion** (Etappe 1) und einen weiteren **nach allen Inhalts-Sektionen + Materialien** (Etappe 2). Das spiegelt das Pilot-Pattern.

```
Page 1 — Kommunizieren:
  Etappe 1 — Hero + Eingangs-Übersicht
  STOP — Christa prüft
  Etappe 2 — Inhalt + Materialien + Querverweise
  STOP — Christa prüft, gibt frei, mergt

Page 2 — Grenzen: gleiches Pattern
Page 3 — Selbstfürsorge: gleiches Pattern
Page 4 — Genesung: gleiches Pattern
```

### Tab-Konsolidierung als Cross-Cutting-Concern

Die Tab-Konsolidierung (NEU-Pattern, Lucide-Icons weg) wird **bei der jeweiligen Page** mitgemacht, nicht in einem separaten PR. Begründung: jede Page hat eigene Materialien-Sektion mit Tabs, und der Tab-Refactor ist pro Page eine kleine Operation (anders als beim Pilot-Verstehen, wo wir ihn separat hatten).

---

## Akzeptanzkriterien

Nach Phase 2 Restmigration muss gelten:

1. **Visuelle Konsistenz mit Verstehen-Pilot und Home.** Klick durch alle fünf Tier-1-Pages: gleiche Site, gleiches Pattern, keine Brüche.

2. **Hero auf jeder Page.** Tier-A-Illustration mindestens 400 px hoch, rechtsbündig, H1 mit Editorial-Wirkung, MarginNote tragend.

3. **Pull-Quotes als Lese-Pause.** Falls vorhanden: typografisch deutlich (28-32 px Source Serif italic, Aubergine), inline.

4. **Filter-Tabs auf vier Pages konsistent.** Alle Sage-Caps, alle Punkt-Separator, alle ohne Lucide-Icons, alle mit Aubergine-Hairline am aktiven Tab.

5. **Tile-Grids in voller Container-Breite.** Drei Spalten ab 1280 px (`xl:grid-cols-3`), zwei Spalten dazwischen, eine auf Mobile.

6. **Alle Inhalte vollständig erhalten.** Keine Akkordeon-Items entfernt, keine Tile-Daten verändert, keine Texte gekürzt.

7. **WCAG-AA-Kontraste bleiben bestehen.** Aubergine-Hairlines, Sage-Caps-Labels, alle neuen Elemente.

8. **A11y der Tabs verbessert sich.** `aria-selected`, `role="tab"`, sichtbarer Focus-Ring auf allen vier Pages.

9. **Mobile (390 px) funktioniert.** Alle Sektionen einspaltig, MarginNotes als Inline-Eyebrows.

---

## Was nicht passieren darf

- Kein neuer Text in den Sektionen. Alle Inhalte aus den bestehenden Pages.
- Keine Akkordeon-Restrukturierung. Items bleiben wie sie sind.
- Keine Tile-Anpassung. Bestehende Reihenfolge und Auswahl.
- Kein neues Routing.
- Kein Eingriff auf Unterstützen-Hub (kommt in Phase 3).

---

## Vor-Implementierungs-Aufgaben für Claude Code

Bevor Claude Code mit der ersten Page (empfohlen: Kommunizieren) beginnt, bitte:

1. **Pull-Quote-Inventur** für alle vier Pages: gibt es jeweils einen Pull-Quote? Wo sitzt er? Welcher Wortlaut? — als Liste an Christa zurückmelden, dann startet Implementierung.

2. **Sektions-Inventur** für alle vier Pages: welche Sektionen, in welcher Reihenfolge, mit welchen aktuellen Eyebrows? — als Liste an Christa zurückmelden. Dann verifiziert Christa die MarginNote-Vorschläge oder passt sie an.

3. **Materialien-Sektions-Inventur:** auf welchen Pages gibt es Filter-Tabs, mit welchen aktuellen Lucide-Icons? Damit Christa entscheiden kann, ob die Tabs jetzt das NEU-Pattern bekommen oder ob es Pages gibt, die gar keine Tabs haben.

Diese drei Inventuren werden Christa als Mini-Bericht vorgelegt **vor der ersten Implementation-Etappe**. Damit kann sie pro Page noch nachjustieren, falls die Pattern-Vorschläge nicht zur Realität passen.

---

## Kontext-Dateien für Claude Code

Vor Implementations-Start lesen:

- `CLAUDE.md`
- `docs/redesign/home-redesign-pain-points.md`
- `docs/redesign/phase-1-5-editorial-layout-shell.md` (Layout-Hülle als Referenz)
- `docs/redesign/phase-2-verstehen-pilot.md` (Pilot-Brief mit allen Pattern-Details)
- diesen Brief

---

## Was nach Phase 2 Restmigration kommt

```
Phase 1 (Home, Layout-Hülle, Konsolidierung)        ✓ abgeschlossen
PR #398 (Tier-A-Illustrationen ins Repo)            ✓ gemerged
Phase 2 — Verstehen (Pilot)                         ✓ abgeschlossen
Phase 2 — Kommunizieren / Grenzen / Selbstfürsorge / Genesung   ← jetzt
Phase 3 — Unterstützen-Hub mit eigener strategischer Frage
Phase 3 (parallel oder seriell) — UX-Veredelung kleinerer Elemente
Phase 3 (parallel oder seriell) — Cluster 4 (Feinschliff, 16 Christa-Rückfragen)
```

**Erwartung an Phase 2 Restmigration:** Falls smooth, die vier Pages innerhalb von zwei bis drei Sessions migriert. Falls nicht smooth (z.B. eine Page hat unerwartete Strukturen), seriell weitermachen, andere Pages warten.
