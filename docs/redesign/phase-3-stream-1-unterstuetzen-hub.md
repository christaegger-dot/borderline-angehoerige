# Phase 3 — Stream 1 — Unterstützen-Hub Migration

**Repo:** `christaegger-dot/borderline-angehoerige`
**Branch-Pattern:** `claude/editorial-phase3-stream1-{page}-{ts}`
**Datum:** 04.05.2026
**Auftraggeberin:** Christa Egger
**Bezug:** Phase 2 abgeschlossen — 5 Tier-1-Pages (Verstehen, Kommunizieren, Grenzen, Selbstfürsorge, Genesung) im Editorial-Pattern live. Phase 3 Stream 1 migriert die 4 Sub-Pages des Unterstützen-Hubs.

---

## Was diese Migration ist (und nicht ist)

**Ist:** Migration der 4 Unterstützen-Sub-Pages (`/unterstuetzen/uebersicht`, `/alltag`, `/krise`, `/therapie`) in das EditorialSection-Pattern. Plus typografische Konsolidierung der `UnterstuetzenSubNav`-Component (Cross-Cutting in Übersicht-PR mitgemacht).

**Ist nicht:** Inhaltliche Erweiterung. Restrukturierung von Akkordeon-Items oder Tile-Listen. Anpassung der Routing-Struktur. Tier-A-Illustrationen für Sub-Pages.

### Strategische Decision (Christa, 04.05.2026)

**Option A — Hub behalten.** Begründung:

- Inhaltliche Überlappung zwischen den 4 Sub-Pages ist minimal — jede hat eine klare Domäne (Übersicht/Alltag/Krise/Therapie)
- 30+ eingehende Links sind keine versteckte Architektur, sondern etablierte Navigations-Realität
- Beraterinnen nutzen die Sub-Page-URLs als funktionale Referenzen («schauen Sie auf der Krisen-Seite»)
- Konsistent zu den 5 migrierten Tier-1-Pages

Bewusst NICHT gewählt:

- **Option B (Hub auflösen zu einer Page):** ~3'200 Zeilen Content auf einer Page, plus 30+ inbound-Link-Umlenkungen
- **Option C/D (Übersicht entschlacken):** redaktionelle Operation, soll nicht mit Layout-Migration vermischt werden — falls Übersicht nach Migration zu schwer wirkt, separater PR

### Architektonische Aussage: Sub-Pages ohne Hero-Illustration

Die 4 Sub-Pages bekommen **keine** Tier-A-Illustrationen. Drei Gründe:

1. **Architektonische Differenzierung.** Die SubNav ist bereits der visuelle Anker für die Hub-Identität. Wenn nur Übersicht eine Illustration bekäme, würden die anderen sich als «Stiefkinder» anfühlen. Wenn alle 4 keine bekommen, signalisiert das eine kohärente Aussage: «Diese 4 Pages sind Sub-Sektionen unter Unterstützen, nicht 4 weitere standalone Tier-1-Pages.»
2. **Konservierung der Tier-A-Familie.** Die 6 Illustrationen (Leuchtturm, Eisberg, Faden, Innenräume, Schale, Aufgang) sind narrativ aufeinander abgestimmt — eine 7. nur für den Hub-Eingang würde die Familie verwässern.
3. **Hero-Layout funktioniert ohne Aside.** Auf den migrierten Pages haben alle Body-Sektionen schon Heroes/MarginNotes ohne Aside — die rechte 1fr-Spalte bleibt leer, Body sitzt in 608 px Lese-Spalte. Etabliertes Pattern, kein neues Layout-Verhalten nötig.

---

## Phase-2-Lehren angewandt

1. **MarginNote und Body-Eyebrow sollen unterschiedliche Funktionen haben.** Keine Doppelung.
2. **Tile-Grids gehören explizit ausserhalb der Body-Spalte** — analog `VisualOrientationGrid`/`VerstehenMaterialsSection`.
3. **Standard-Breakpoints statt arbiträrer.** `xl:grid-cols-3` (1280 px), keine `min-[Npx]:`-Klassen.
4. **Filter-Tabs typografisch veredelt** (falls auf einer Sub-Page vorhanden): Sage-Caps, Aubergine-Hairline, Punkt-Separator, keine Lucide-Icons.
5. **`RelatedLinksEditorial flush`** in cream-deep-Querverweise.
6. **Etappe 1 + Etappe 2 IN EINEM PR.** Nach Genesung-Mishap (PR #404 wurde versehentlich nur mit Etappe 1 gemerged, weil Auto-Merge zu schnell war) — beide Etappen werden im selben PR gepusht, kein separater Etappe-2-PR.

NEU für Phase 3 Stream 1:

7. **Sub-Pages ohne Hero-Aside.** Keine Illustration, leere Aside-Spalte ist intentional.
8. **SubNav-Konsolidierung als Cross-Cutting-Concern.** In Übersicht-PR mitgemacht, gilt für alle 4 Pages durch Component-Refactor.

---

## Ausgeklammerter Scope

- **Routing-Struktur bleibt unverändert.** 4 Sub-Page-Routen, `/unterstuetzen` → `/unterstuetzen/uebersicht` Redirect, `/therapieangebote` → `/unterstuetzen/therapie#therapieangebote` Redirect — alle bleiben aktiv.
- **Eingehende Links werden NICHT umgeleitet.** Alle 30+ Verweise auf einzelne Sub-Pages bleiben funktional.
- **Inhaltliche Texte werden nicht angepasst.**
- **Akkordeon-Item-Inhalte und -Reihenfolge bleiben unverändert** (page-level Reorder ist erlaubt für Group-Kontiguität — analog Selbstfürsorge `beratung-netzwerke`-Reorder und Grenzen Pull-Quote-Reorder).

---

## Pattern-Vorgaben — gelten für alle 4 Sub-Pages

### Hero-Sektion

- `<EditorialSection variant="cream">`
- `MarginNote`: thematischer Sage-Caps-Anker (Pro-Page-Variation, siehe Sub-Briefs)
- `Body`:
  - Eyebrow (Page-Name in Sage-Caps)
  - H1 in Source Serif gross gesetzt (Pro-Page-Variation)
  - Lede typografisch wie Tier-1-Pages (~22 px Source Serif Regular)
  - Optional: Lede mit `max-w-[40em]` statt `max-w-[30em]` erweitern, um die fehlende Aside-Illustration zu kompensieren — Pro-Page-Decision bei Inventur
  - Meta-Zeile mit Hairline-Trenner und Lesedauer
  - LastVerifiedBadge / ReviewBadge falls vorhanden, erhalten
- `Aside`: **leer (intentional — kein Slot-Inhalt)**

### SubNav (UnterstuetzenSubNav.tsx) — Cross-Cutting

Refaktoriert in der **Übersicht-PR** (erste Page der Migration), gilt für alle 4 Sub-Pages durch Component-Wirkung:

- Tab-Labels in **Sage-Caps** uppercase: «ÜBERSICHT», «IM ALLTAG», «IN DER KRISE», «THERAPIE»
- Aktiver Tab mit **2 px Aubergine-Hairline** darunter
- Kein Button-Background, keine abgerundeten Ecken
- **Kein Punkt-Separator** (Tab-Labels haben keine Counter — Christa-Decision)
- A11y: `role="tablist"` am Container, `role="tab"` an jedem Tab, `aria-selected="true"` am aktiven
- Pattern wie Filter-Tabs auf den migrierten Tier-1-Pages, **nur ohne Counter**
- Implementation: bestehende `client/src/components/UnterstuetzenSubNav.tsx` umbauen — `EditorialPillButton variant="filter"` reusen oder ähnliche Klassen direkt setzen

### Inhalts-Sektionen

- Pro Sektion oder Sektion-Gruppe: `<EditorialSection variant="cream">`
- `MarginNote`: Sage-Caps-Wort, das die fachliche Funktion verortet
- Bestehender Inhalt (ContentSections, EditorialProse, etc.) unverändert in Body
- Aside leer

### Pull-Quote

Pro Page: **dominanter Pull-Quote als eigene EditorialSection cream mit leerer MarginNote** (analog Verstehen + Selbstfürsorge-(a)).

Falls eine Page mehr als einen Pull-Quote hat, der zweite und dritte als **Inline-Akzent** (kursiv im Body, mit `cite`-Prop falls passend) oder **ganz raus** — pro Page Detail-Decision bei Inventur (analog Selbstfürsorge-(b)/(c)).

### Materialien-Sektion (falls vorhanden)

- Header in `EditorialSection cream` mit MarginNote «MATERIALIEN ZUM VERTIEFEN», Eyebrow «Materialien», H2, Lede
- Tile-Grid in eigener `<section>` mit `max-w-[1240px]`, `xl:grid-cols-3` Standard-Breakpoint
- Falls Filter-Tabs (bei keiner der 4 Sub-Pages aktuell der Fall): NEU-Pattern (`mx-2.5` Punkt-Separator, keine Lucide-Icons, `role="tablist"`, `aria-selected`)

### Querverweise-Sektion

- `<EditorialSection variant="cream-deep">`
- MarginNote: «VERWANDT»
- Body: `RelatedLinksEditorial` mit `flush`-Prop (supprimiert Outer-Spacing in EditorialSection-Kontext)
- Body-Eyebrow «WEITERFÜHREN» + H2 «Das könnte Sie auch interessieren» bleiben

### Was NICHT verändert wird

- Akkordeon-Item-Inhalte und -Reihenfolge bleiben unverändert (page-level Reorder erlaubt für Group-Kontiguität)
- Tile-Auswahl und -Reihenfolge bleibt unverändert
- Inhaltliche Texte werden nicht angefasst
- Routing bleibt unverändert
- `#therapieangebote`-Anker bleibt funktional
- LastVerifiedBadge / ReviewBadge falls vorhanden bleiben funktional
- SubNav-Routing nicht ändern (Tab-Reihenfolge: Übersicht → Im Alltag → In der Krise → Therapie)
- Sicherheits-/Alert-Boxen (z. B. auf Krise-Seite) typografisch unverändert (kritische Inhalte)

---

## Sub-Brief 1 — /unterstuetzen/uebersicht

### Aktueller Stand (vor Implementation)

Page-Title: «Unterstützen — Übersicht»

Sektionen (vor Detail-Inventur):

- Hero
- Intro «Was auf dieser Seite besonders trägt»
- ContentSection «Unterstützung ist wichtig, aber nicht allmächtig» _(mit Pull-Quote)_
- ContentSection «Die Angehörigenrolle realistisch klären»
- ContentSection «Was Unterstützung so schwierig macht» _(mit Pull-Quote)_
- ContentSection «Was möchten Sie vertiefen?» _(Dispatch-Sektion mit Links auf die 3 anderen Sub-Pages)_
- ContentSection «Wenn mehrere Angehörige beteiligt sind»
- ContentSection «Woran hilfreiche Unterstützung erkennbar ist»
- ContentSection «Wann Unterstützung an Grenzen kommt»
- Materialien «Materialien zum Thema»

### Migration

**Hero (Vorschläge — Detail-Decision bei Inventur):**

- MarginNote: «ROLLE UND HALTUNG» oder «ZUGEWANDT UND BEGRENZT»
- Eyebrow: «Übersicht»
- H1: «Wie Angehörige hilfreich bleiben können» (bestehend, evtl. erweitern à la «… ohne sich selbst aufzugeben.»)
- Aside: leer

**Inhalts-Sektionen — MarginNote-Vorschläge:**

- Intro: «KERNFRAGE» (analog Tier-1-Pattern)
- Inhalts-Sektionen: ggf. 3 Gruppen — «WAS IST MÖGLICH» (Sektionen 1+2), «WAS HÄLT ES SCHWIERIG» (Sektion 3), «WIE WIRD ES TRAGFÄHIG» (Sektionen 5+6+7) — Detail-Decision bei Inventur
- Dispatch-Sektion «Was möchten Sie vertiefen?»: bleibt mit MarginNote «VERTIEFEN»

**Pull-Quote-Strategie:** dominanter Pull-Quote als eigene Sektion (Christa-Decision welcher), zweiter inline oder raus.

**SubNav-Konsolidierung:** in dieser PR mitgemacht. Refactor von `UnterstuetzenSubNav.tsx` als separater Commit.

---

## Sub-Brief 2 — /unterstuetzen/krise

### Aktueller Stand

Page-Title: «Krisenbegleitung»

Sektionen:

- Hero
- Intro «Was diese Seite in Krisen ordnet»
- CS «Das Ampel-System: Krisen erkennen»
- CS «4 Schritte der Deeskalation»
- CS «Was Sie in der Krise sagen können»
- CS «Was Sie in der Krise vermeiden sollten»
- CS «Nach der Krise: Verarbeitung und Neubeginn»
- Materialien «Materialien zum Thema»

Pull-Quotes: mehrere (Detail-Inventur klärt Anzahl + Position).

Sicherheits-/Alert-Box-Inhalte: möglicherweise auf der Page (analog Grenzen-gewalt-CS) — bleiben typografisch unverändert.

### Migration

**Hero:**

- MarginNote: «AKUTE LAGE» oder «WENN ES KIPPT»
- Eyebrow: «In der Krise»
- H1: «In der Krise unterstützen» (bestehend, evtl. erweitern)

**Inhalts-Sektionen — Gruppierung (Vorschlag):**

- Intro «KERNFRAGE»
- Group A «KRISE ERKENNEN»: Ampel-System
- Group B «WÄHREND DER KRISE»: Deeskalation + Was sagen + Was vermeiden
- Group C «NACH DER KRISE»: Verarbeitung

Detail-Inventur kann das anpassen.

**Pull-Quote-Strategie:** wie Übersicht.

---

## Sub-Brief 3 — /unterstuetzen/alltag

### Aktueller Stand

Page-Title: «Unterstützen im Alltag»

Sektionen (8-10 ContentSections, längste Sub-Page):

- Hero
- Intro «Was diese Seite im Alltag ordnet»
- CS «Der Alltag ist oft nicht ruhig, sondern vorspannt» _(Pull-Quote)_
- CS «Was im Alltag oft wirklich hilft»
- CS «Nach Konflikten und Rückzug» _(Pull-Quote)_
- CS «Beziehungs-Achtsamkeit im echten Alltag»
- CS «Kleine positive Inseln schaffen» _(Pull-Quote)_
- CS «Was Sie konkret tun können»
- CS «Wenn Impulsivität ausbricht» _(Pull-Quote)_
- CS «Grenzen der Alltagsunterstützung» _(Pull-Quote)_
- Materialien

**5 Pull-Quotes** — heaviest auf der Hub.

### Migration

**Hero:**

- MarginNote: «VORSPANNUNG UND ROUTINE» oder «KLARHEIT IM ALLTAG»
- Eyebrow: «Im Alltag»
- H1: «Im Alltag unterstützen» (bestehend, evtl. erweitern)

**Inhalts-Sektionen — Gruppierung:** **wahrscheinlich 4-Gruppen-Pattern wie Grenzen.** Detail-Inventur entscheidet die Gruppen. Vorschlag:

- Group A «WAS IST DER ALLTAG»: vorspannt + was hilft
- Group B «BEZIEHUNGS-FELD»: Konflikte + Achtsamkeit + Inseln
- Group C «KONKRETE ALLTAGSHILFE»: was Sie tun können
- Group D «WENN ES SCHWER WIRD»: Impulsivität + Grenzen

**Pull-Quote-Strategie:** **5 Pull-Quotes ist VIEL.** Reduktion auf 1 dominant + max 2 Inline-Akzent + ggf. 2 raus. Detail-Decision pro Quote bei Inventur — analog Selbstfürsorge-Decision-Pattern (Wortlaut + Position vorlegen, Christa entscheidet).

---

## Sub-Brief 4 — /unterstuetzen/therapie

### Aktueller Stand

Page-Title: «Therapie unterstützen»

Sektionen (8 ContentSections):

- Hero
- Intro «Was diese Seite bei Therapie ordnet»
- CS «Was Angehörige in der Therapie wirklich tun können» _(Pull-Quote)_
- CS «Mit dem Behandlungssystem zusammenarbeiten»
- CS «Therapieformen knapp eingeordnet» _(Pull-Quote, EvidenceNote)_
- CS «Wie Sie den Therapieprozess unterstützen können»
- CS «Erstkontakt mit dem Therapeuten – Musterbrief»
- CS «Rückschläge und Unterbrüche» _(Pull-Quote)_
- CS «Was Ihre Rolle ausdrücklich nicht ist»
- CS «Therapieangebote im Kanton Zürich» — **`#therapieangebote`-Anker, Ziel des `/therapieangebote`-Redirects**
- Materialien

**3 Pull-Quotes** + EvidenceNote-Block.

### Migration

**Hero:**

- MarginNote: «BEGLEITEN STATT BEHANDELN» oder «ROLLE BEI THERAPIE»
- Eyebrow: «Therapie»
- H1: «Therapie unterstützen» (bestehend, evtl. erweitern)

**Inhalts-Sektionen — Gruppierung:**

- Intro «KERNFRAGE»
- Group A «WAS HILFT»: Was Angehörige tun können + mit Behandlungssystem zusammenarbeiten
- Group B «THERAPIEFORMEN»: Therapieformen + EvidenceNote → MarginNote «FORSCHUNGSSTAND» (analog Genesung)
- Group C «PROZESS-BEGLEITUNG»: Wie Sie unterstützen + Erstkontakt + Rückschläge
- Group D «GRENZEN DER ROLLE»: Was Ihre Rolle nicht ist
- Eigener Block «THERAPIEANGEBOTE ZH» (bleibt mit `#therapieangebote`-Anker)

**Schema-Safety:** EvidenceNote-Block in Body wie auf Genesung. `MedicalPageSchema` ist JSON-LD `<script>`-Tag, separat vom DOM. Bei Migration verifizieren (Site Inspector → Strukturierte Daten).

**Anker-Erhalt:** `#therapieangebote` bleibt nach Migration als ID auf der Therapieangebote-Sektion. Redirect `/therapieangebote` → `/unterstuetzen/therapie#therapieangebote` muss weiter funktionieren.

**Pull-Quote-Strategie:** wie Selbstfürsorge.

---

## Migrations-Reihenfolge

**Empfohlen:** Übersicht → Krise → Alltag → Therapie

Begründung:

1. **Übersicht zuerst** — kürzeste Page, plus SubNav-Konsolidierung als Cross-Cutting in derselben PR validiert das Pattern für alle 4 Pages
2. **Krise zweitens** — niedrigstes Risiko, klare thematische Domäne, wenige Sektionen
3. **Alltag drittens** — anspruchsvollste Pull-Quote-Reduktion (5→2-3), 10 Sektionen wie Grenzen → 4-Gruppen-Pattern
4. **Therapie zuletzt** — heikelste mit `#therapieangebote`-Anker + EvidenceNote-Block + 9 eingehenden Links

### STOP-Gates pro Page

Pro Page: **Etappe 1 + Etappe 2 in einem PR.** STOP-Gates wie in Phase 2 (Christa prüft Etappe 1 visuell, freigegeben, dann Etappe 2 in derselben PR pushen, dann Christa prüft Etappe 2, dann mergen).

Wichtig nach Genesung-Mishap: kein separater Etappe-2-PR — Etappe 1 und 2 müssen im **selben PR** sein, sodass Auto-Merge nicht versehentlich nur Etappe 1 mergt.

### SubNav-Konsolidierung

Cross-Cutting-Concern, in der **Übersicht-PR** (erste Page der Migration) als separater Commit. Das macht den SubNav-Refactor sichtbar reviewbar, und alle 4 Sub-Pages bekommen den neuen SubNav-Render automatisch durch Component-Wirkung.

---

## Akzeptanzkriterien

Nach Phase 3 Stream 1 muss gelten:

1. **Visuelle Konsistenz:** Alle 4 Sub-Pages im Editorial-Pattern, konsistent zu den 6 Tier-1-Pages.
2. **SubNav typografisch veredelt:** Sage-Caps, Aubergine-Hairline am aktiven Tab, A11y mit `role="tablist"` + `aria-selected`.
3. **Heroes ohne Illustration** — als architektonische Aussage, keine Tier-A-Illustration für Sub-Pages.
4. **Pull-Quotes reduziert:** pro Page max 1 dominanter + max 2 Inline-Akzente.
5. **Filter-Tabs** (falls auf einer Sub-Page) auf NEU-Pattern.
6. **Tile-Grids in voller Container-Breite,** `xl:grid-cols-3`.
7. **Eingehende Links bleiben funktional** — alle 30+ Verweise auf einzelne Sub-Pages.
8. **`#therapieangebote`-Anker bleibt funktional**, Redirect `/therapieangebote` → `/unterstuetzen/therapie#therapieangebote` weiter aktiv.
9. **WCAG-AA-Kontraste bleiben** bestehen.
10. **Mobile (390 px) funktioniert** auf allen 4 Sub-Pages.
11. **Schema.org-Markup** auf Therapie-Page (`MedicalPageSchema`) durch Migration nicht gebrochen.

---

## Was nicht passieren darf

- Kein neuer Text in den Sektionen
- Keine Akkordeon-Restrukturierung (page-level Reorder für Group-Kontiguität ist erlaubt)
- Keine Tile-Anpassung
- Kein neues Routing
- Keine neuen Tier-A-Illustrationen für Sub-Pages
- SubNav-Routing nicht ändern (Tab-Reihenfolge bleibt: Übersicht → Im Alltag → In der Krise → Therapie)
- Sicherheits-/Alert-Boxen (z. B. auf Krise-Seite) typografisch unverändert (kritische Inhalte)

---

## Vor-Implementierungs-Aufgaben pro Page

Vor jeder der 4 Migrationen: Detail-Inventur als Mini-Bericht analog Phase 2 mit:

1. **Sektions-Inventur** — Eyebrow + H2 + Mini-Lede (preview) pro ContentSection
2. **Pull-Quote-Inventur** — Wortlaut + Position für jede Quote auf der Page
3. **MarginNote-Vorschläge** — pro Sektion-Gruppe ein Vorschlag
4. **Pull-Quote-Decision-Empfehlung** — welcher dominant, welche inline/raus

Christa entscheidet pro Inventur, dann startet die jeweilige Etappe 1.

---

## Kontext-Dateien für Claude Code

Vor Implementations-Start lesen:

- `CLAUDE.md`
- `docs/redesign/home-redesign-pain-points.md`
- `docs/redesign/phase-1-5-editorial-layout-shell.md` (Layout-Hülle als Referenz)
- `docs/redesign/phase-2-verstehen-pilot.md` (Pilot-Brief)
- `docs/redesign/phase-2-restmigration.md` (4-Page-Pattern)
- diesen Brief

---

## Was nach Phase 3 Stream 1 kommt

```
Phase 1 (Home, Layout-Hülle, Konsolidierung)        ✓ abgeschlossen
PR #398 (Tier-A-Illustrationen)                     ✓ gemerged
Phase 2 — Verstehen-Pilot                           ✓ abgeschlossen
Phase 2 — Restmigration (Komm/Selbst/Genes/Grenz)   ✓ abgeschlossen
Phase 3 Stream 1 — Unterstützen-Hub                 ← jetzt
Phase 3 Stream 2 — UX-Veredelung                    verschoben (braucht Beobachtungs-Liste aus Klick-Erfahrung
                                                     durch die jetzt migrierten Pages)
Phase 3 Stream 3 — Cluster 4 Feinschliff            verschoben (Mapping in _dev/CLUSTER-4-MAPPING-2026-04-30.md
                                                     im Repo, commit 035d8f8 — wartet auf Christa-Trigger)
```

**Erwartung an Phase 3 Stream 1:** Falls smooth, die 4 Sub-Pages innerhalb von 2-3 Sessions migriert. Falls eine Page hakt, seriell weitermachen; andere Pages warten.
