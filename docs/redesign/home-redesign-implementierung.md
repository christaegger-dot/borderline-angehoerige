# Phase 1 — Editorial Redesign Home + Header (Variante B)

**Repo:** `christaegger-dot/borderline-angehoerige`
**Auftraggeberin:** Christa Egger, Fachstelle Angehörigenarbeit, PUK Zürich
**Datum:** 03.05.2026
**Mockup-Referenz:** `borderline-home-mockup-v2.zip`, Variante B (Illustriert / Organisch)
**Branch-Pattern:** `claude/editorial-home-phase1-$(date +%s)`
**Workflow:** Phasen mit STOP-Gates. Jede Phase einzeln freigeben lassen.

**Begleitdokumente:**

- `docs/redesign/home-redesign-pain-points.md` — Diagnose der sechs Pain-Points
- `docs/redesign/home-redesign-bildsprache.md` — Bildsprache-Doktrin (drei Schichten, Wahl Variante B)
- `docs/redesign/home-redesign-mockup/` — Visueller Referenz-Mockup mit Screenshots
  - `01-hero-fold-desktop.png` — Hero auf 1280 px Desktop
  - `02-aubergine-block.png` — Aubergine-Block mit Drop-Cap und Kontrast-Ziel
  - `03-header-detail.png` — Header mit Brand-Mark, Wordmark, Trenner, Nav, Tools
  - `04-vollseite.png` — Komplette Home auf Desktop
  - `mockup-variant-b.html` — Lauffähiger Mockup, lokal im Browser öffnen

---

## Kontext und Selbstbeschränkung

Die Live-Site `borderline-angehoerige.netlify.app` ist inhaltlich, fachlich
und governance-seitig auf hohem Niveau. Der Editorial-Redesign vom April
ist technisch sauber umgesetzt (Source Serif 4, Cream-Hintergrund,
Aubergine-Akzent, Sage-Labels, Lese-Mass 608 px). Aber: **Editorial wurde
umgesetzt, nicht gestaltet.** Die Folge ist eine zentrierte Spalte Text in
einer fast leeren Bildschirmhälfte, ohne visuellen Anker, ohne Bild, ohne
Akzentfläche. Für die Zielgruppe — Angehörige in Belastung — wirkt das
steril, nicht beruhigend.

**Was du in dieser Phase NICHT tust:**

- Inhaltliche Texte umschreiben. Die Texte stammen von Christa und sind
  sorgfältig erarbeitet. Du arbeitest am Layout, nicht am Wort.
- Andere Pages als Home und Header anfassen. Die anderen Pages folgen in
  späteren Phasen.
- Neue Routen, neuen Content, neue Daten. Du nutzt ausschliesslich
  bestehende Inhalte aus `client/src/content/` und `client/src/data/`.
- Tokens umdefinieren. Die `--bg-primary`, `--accent-primary`,
  `--accent-label` etc. in `client/src/index.css` bleiben unverändert.
  Du nutzt sie konsequent.

---

## Die sechs Pain-Points als Akzeptanzkriterien

Diese sechs Punkte sind die Gründe für den Redesign. **Jeder Punkt ist ein
Akzeptanzkriterium für die Phase-1-Abnahme. Wenn auch nur einer nicht
sichtbar gelöst ist, gilt die Phase als nicht abgenommen.**

### Pain-Point 1 — Leere Cream-Fläche rechts oben auf Desktop

**Problem:** Bei 1280 px Viewport sind 60 % der ersten Bildschirmhälfte
leer. Die Lese-Spalte ist 608 px schmal, rechts daneben sind 670 px
ungenutzte Cream-Fläche.

**Lösung:** Hero-Sektion wird zu einem zwei-spaltigen Grid-Layout
(`grid-template-columns: 1.2fr 1fr`, gap 80 px, max-width 1240 px). Links:
H1, Lede, Hero-Meta. Rechts: Leuchtturm-Illustration als visueller Anker
(siehe Pain-Point 3).

**Verifikation:** Auf 1280 px Viewport ist im Hero-Bereich keine
zusammenhängende Cream-Fläche grösser als 200 px Breite ohne
Inhalt.

### Pain-Point 2 — H1 zu klein (42 px) für Editorial-Wirkung

**Problem:** Der Hero-H1 ist auf der Live-Site ca. 42 px in normaler
Stärke. NYT-Feature-Headlines liegen bei 64–80 px. Aktuell wirkt der H1
fast genauso gross wie die Lede direkt darunter.

**Lösung:** Hero-H1-Skalierung neu auf `clamp(40px, 5.5vw, 72px)`. Auf
1280 px Desktop ergibt das ca. 70 px. Die `--text-3xl` und `--text-4xl`
Tokens bleiben für andere H1s; **aber die Home-Hero bekommt eine eigene
explizite Skalierung**, weil sie als Site-Hero anders funktioniert als
Page-H1s. Setze dafür ein neues Token `--text-hero: clamp(40px, 5.5vw,
72px)` in `index.css` und nutze es in der Hero-Komponente.

**Verifikation:** Auf 1280 px Viewport ist der H1 mindestens 4× so gross
wie die Lede darunter (nach `font-size`, nicht nach Render-Höhe).

### Pain-Point 3 — Kein visueller Anker, roter Soforthilfe-Button dominiert

**Problem:** Oben gibt es kein Bild, keine Illustration, keine
Akzentfläche. Der einzige Farbpunkt ist der knallrote
Soforthilfe-Button rechts oben. Das menschliche Auge findet keinen Halt
und springt auf den Notfall-Button — was den ersten Eindruck verfälscht.

**Lösung:** Eine neue Komponente `<HeroLeuchtturmIllustration />` mit
einer Inline-SVG-Illustration eines stilisierten Leuchtturms in
Aubergine, mit warmem Cream-Halo, Sage-Hügel im Vordergrund und kleinen
Stern-Punkten in der Atmosphäre. Die Illustration verbindet sich
inhaltlich mit deinem bestehenden Leuchtturm-Infografik
(`manus-leuchtturm-v1.webp`) und mit dem Kompass-Logo der Marke.

**SVG-Quelltext** liegt im Mockup unter `index.html`,
`<div class="hero-illustration">`. Diese SVG kannst du 1:1 in eine
React-Komponente überführen. Wichtig: alle Farben kommen aus den
Tokens (`var(--accent-primary)`, `var(--accent-label)`,
`var(--bg-primary)`), nicht aus Hex-Codes.

**Verifikation:** Auf der Hero-Seite sind mindestens drei farbige
Anker sichtbar (Aubergine-Logo-Mark, Leuchtturm-Body, sage-Hügel) —
nicht nur der rote Button.

### Pain-Point 4 — Palette unsichtbar (Aubergine nur in Inline-Links, Sage nur in 12-px-Caps)

**Problem:** Auf einer 4000-px-langen Seite ist Aubergine nur in 3-Wort-
Schnipseln im Fliesstext, Sage nur in 12-px-Caps-Labels sichtbar.
Praktisch unsichtbar.

**Lösung:** Aubergine und Sage werden zu strukturellen Akzentflächen.
Konkret:

- **`<EditorialColorBlock variant="aubergine">`** als neue
  wiederverwendbare Komponente. Auf der Home wickelt sie die
  Grundgedanke-Sektion ein. Vollflächig, 120 px Padding oben/unten,
  mit dunkel-aubergine Hintergrund (`--accent-primary`) und
  expliziten Cream-Tönen für Text. **Kontrast-Werte sind nicht
  verhandelbar** (siehe Akzeptanzkriterien-Block unten).

- **`<EditorialColorBlock variant="sage-wash">`** für die
  Testimonial-Sektion («Aus der Beratungsarbeit»). Heller
  Sage-Wash-Hintergrund (`#eef0ea`), sage-akzentuiert.

- **Logo-Mark im Header** ist ein Aubergine-Kreis (42 px) mit weissem
  Kompass-Symbol — als wiederkehrender Marken-Anker.

**Verifikation:** Aubergine erscheint als sichtbare Fläche an
mindestens drei Stellen auf der Home (Logo-Mark, Leuchtturm-Body,
Aubergine-Block). Sage-Wash ist mindestens einmal als vollflächige
Sektion erkennbar.

### Pain-Point 5 — Alle Sektionen mit identischem Rhythmus (Eyebrow → H2 → Prosa)

**Problem:** Die ganze Seite folgt einem Muster: Eyebrow → H2 → Prosa
→ Eyebrow → H2 → Prosa. Keine Pausen, keine Akzentflächen, keine
Display-Quotes. Eine 4 m lange Wand aus Text in immer gleichem Muster.

**Lösung:** Sechs unterschiedliche Sektions-Modi auf der Home:

1. **Hero** (asymmetrisches 2-Spalten-Grid mit Leuchtturm rechts)
2. **Anerkennung** (zentrierte schmale Spalte, optional mit
   Ornament-Marker oben)
3. **Grundgedanke** (Aubergine-Block, vollflächig, mit Drop-Cap)
4. **Visuelle Orientierung** (4-Spalten-Grid mit 8 Infografik-Tiles)
5. **Aus der Beratungsarbeit** (Sage-Wash-Block, zentriert, mit
   illustriertem Marker)
6. **Fachstelle CTA** (zentriert auf Cream, mit kleinem Ornament)

Zwischen den Sektionen sind die visuellen Wechsel klar lesbar
(Hintergrundwechsel, Layout-Wechsel, Akzentwechsel).

**Verifikation:** Eine Person, die durch die Seite scrollt, sieht
**mindestens drei verschiedene Hintergrundfarben** (Cream, Aubergine,
Sage-Wash) und **mindestens zwei verschiedene Layout-Modi**
(2-Spalten-Hero, zentrierte Lese-Spalte, 4-Spalten-Grid).

### Pain-Point 6 — Header verliert sich

**Problem:** Aktuelles Logo ist «Borderline · Hilfe für Angehörige»
mit zweizeiliger Subline «Orientierung für belastete
Beziehungssituationen» — drei Hierarchien in 60 px Höhe. Daneben sechs
gleichgewichtete Nav-Items in voller Schriftstärke. Es gibt keinen
klaren Marken-Anker.

**Lösung:** Header neu strukturiert:

- **Brand-Mark:** Aubergine-Kreis 42 px mit weissem Kompass-Symbol,
  Box-Shadow `0 2px 8px -2px rgba(91, 58, 78, 0.35)`.
- **Brand-Wordmark:** «Borderline · Angehörige» (gekürzt von «Hilfe
  für Angehörige»), Source Serif 4, 19 px, Weight 500, Single-Line.
- **Brand-Sub:** «FACHSTELLE · PUK ZÜRICH» in Sage-Caps 11 px,
  Letter-Spacing 0.08em, Margin-Top 4 px.
- **Vertikaler Trenner:** 1 px Hairline, 32 px Höhe, in
  `--rule-color-strong` zwischen Brand und Nav.
- **Nav-Items:** in `--fg-secondary` (nicht `--fg-primary`), Weight
  400 (nicht 500), 14 px. Nur das aktive Item bekommt
  `--fg-primary` und Weight 500.
- **Suche:** Pillen-Button mit Icon + Text.
- **Soforthilfe:** Roter Pill mit kleinem weissen Punkt davor (8 px,
  signalisiert «live»).

**Verifikation:** Beim Aufruf der Seite ist der Aubergine-Marken-Mark
visuell der dominante Punkt im Header — nicht das Notfall-Knöpfchen,
nicht ein Nav-Item.

---

## Komponenten-Architektur

Diese neuen Komponenten kommen in dieser Phase neu hinzu:

```
client/src/components/editorial/
  EditorialHero.tsx              → Home-Hero mit 2-Spalten-Layout, akzeptiert
                                   `illustrationSlot` als ReactNode-Prop
  EditorialColorBlock.tsx        → variant="aubergine" | "sage-wash" | "cream-deep"
  EditorialOrnament.tsx          → variant="dots-line" | "wave" | "small-arc"
  HeroLeuchtturmIllustration.tsx → Inline-SVG, alle Farben aus Tokens
  TestimonialMark.tsx            → Inline-SVG, kleiner illustrierter Marker

client/src/components/visualizations/
  VisualOrientationGrid.tsx      → liest aus verstehenInfografiken,
                                   selbstfuersorgeInfografiken,
                                   kommunizierenInfografiken etc., zeigt
                                   8 Infografiken als Hero-Tiles auf der Home

client/src/components/layout/
  SiteHeader.tsx                 → refactored: Brand-Mark + Wordmark +
                                   Brand-Sub + Trenner + Nav + Tools
```

Bestehende Komponenten, die du **anpasst** (nicht ersetzt):

```
client/src/pages/Home.tsx         → nutzt die neuen Komponenten
client/src/index.css              → fügt --text-hero und ggf.
                                    --bg-cream-deep, --bg-sage-wash hinzu
                                    (falls noch nicht vorhanden)
```

---

## WCAG-Akzeptanzkriterien (nicht verhandelbar)

Auf dem Aubergine-Block (`--accent-primary` ≈ `#5b3a4e`) müssen folgende
Mindest-Kontraste gegen den Hintergrund eingehalten werden. Alle Farben
**explizit als Hex** setzen, nicht über `rgba(..., opacity)` und nicht
über CSS-Inheritance — Spezifizitäts-Falle vermeiden.

| Element       | Farbe     | Kontrast-Mindest |
| ------------- | --------- | ---------------- |
| H2 / Display  | `#f5ece6` | 8.0:1 (AAA)      |
| Lede primär   | `#f0e5db` | 7.5:1 (AAA)      |
| Lede sekundär | `#e2d4cb` | 6.0:1 (AA)       |
| Eyebrow       | `#d6c8be` | 5.5:1 (AA)       |

**Test:** ein Vitest-Test in `client/src/__tests__/editorial-color-block.test.tsx`,
der die Computed-Style der H2 in einer gerenderten
`EditorialColorBlock variant="aubergine"`-Instanz prüft (sollte exakt
`#f5ece6` ergeben, nicht `var(--fg-primary)`).

**Hintergrund (wichtig zu verstehen, damit es nicht wieder passiert):**
Die globale Regel `h2.display { color: var(--fg-primary) }` hat dieselbe
Spezifität wie `.grundgedanke h2`. Wenn die spätere Regel keine eigene
`color` setzt, schlägt der parent-color **nicht** durch — es bleibt der
Wert der globalen Regel. Daher: auf jeder dunklen Akzentfläche müssen
die Text-Farben der Children explizit gesetzt werden.

---

## Umsetzungsreihenfolge (linear, mit STOP-Gates)

### Schritt 1 — Tokens und Header

1. In `client/src/index.css` ergänzen (falls nicht vorhanden):
   - `--text-hero: clamp(40px, 5.5vw, 72px)`
   - `--bg-cream-deep: #f3eee3`
   - `--bg-sage-wash: #eef0ea`
2. `SiteHeader.tsx` neu strukturieren laut Pain-Point 6.
3. Sicherstellen, dass alle bestehenden Tests grün bleiben
   (`pnpm test`, `pnpm typecheck`, `pnpm lint`).

**STOP-Gate 1:** PR mit Screenshots (Desktop + Mobile) zur Freigabe.

### Schritt 2 — Hero-Komponente und Leuchtturm-Illustration

1. `HeroLeuchtturmIllustration.tsx` als Inline-SVG-Komponente, Farben
   ausschliesslich aus CSS-Tokens.
2. `EditorialHero.tsx` als neue 2-Spalten-Komponente. Akzeptiert
   `eyebrow`, `title`, `lede`, `meta` (Array), `illustrationSlot`
   (ReactNode) als Props.
3. In `Home.tsx` die alte Hero-Markup durch `<EditorialHero ...>`
   ersetzen.

**STOP-Gate 2:** Screenshot-Vergleich Vorher/Nachher.

### Schritt 3 — EditorialColorBlock und Aubergine-Sektion

1. `EditorialColorBlock.tsx` mit Variants `aubergine`, `sage-wash`,
   `cream-deep`. Setzt explizit Hex-Farben für Text-Children — nicht
   `var(...)`-Tokens.
2. In `Home.tsx` die «Grundgedanke»-Sektion mit
   `<EditorialColorBlock variant="aubergine">` umschliessen.
3. Drop-Cap im ersten Lede-Absatz beibehalten (existiert bereits,
   muss aber explizit `color: #f5ece6` haben).

**STOP-Gate 3:** Vitest-Tests für Kontrast-Werte grün, manueller
Check via Browser-Devtools Computed-Style.

### Schritt 4 — VisualOrientationGrid

1. `VisualOrientationGrid.tsx` liest aus den bestehenden
   `verstehenInfografiken`, `selbstfuersorgeInfografiken`,
   `kommunizierenInfografiken`-Listen (oder einer von dir neu
   anzulegenden zentralen Liste in
   `client/src/content/homeFeaturedInfografiken.ts`, wenn das sauberer
   ist).
2. Wählt 8 Infografiken aus, ordnet sie nach klinischem Lese-Pfad:
   Verstehen × 2, Krise begleiten × 2, Kommunizieren × 1,
   Beziehungsdynamik × 1, Grenzen × 1, Selbstfürsorge × 1.
3. Jeder Tile: Kategorie-Eyebrow (Sage), Thumbnail
   (`thumbnailUrl` falls vorhanden, sonst `webpUrl`), Titel
   (Source Serif 18 px), Kurzbeschreibung (Inter 14 px).
4. 4-Spalten auf Desktop, 2 auf Tablet, 1 auf Mobile.

**STOP-Gate 4:** Live-Screenshot zur Abnahme der
Tile-Reihenfolge und Bild-Schärfe.

### Schritt 5 — Testimonial-Sektion und Ornament-Komponente

1. `EditorialOrnament.tsx` als wiederverwendbare SVG-Komponente.
2. `TestimonialMark.tsx` als Inline-SVG.
3. Testimonial-Sektion auf der Home mit
   `<EditorialColorBlock variant="sage-wash">` umwickeln, Marker oben
   zentriert.

**STOP-Gate 5:** Sektions-Rhythmus prüfen — sechs verschiedene
Visual-Modi sichtbar.

### Schritt 6 — Konsolidierung und Tests

1. `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build` müssen alle
   grün sein.
2. Neue Vitest-Tests:
   - `editorial-color-block.test.tsx` (Kontrast-Werte)
   - `visual-orientation-grid.test.tsx` (8 Tiles, korrekte Reihenfolge,
     keine duplizierten Slugs)
   - `site-header.test.tsx` (Brand-Mark vorhanden, Trenner vorhanden,
     Nav-Items in fg-secondary)
3. Lighthouse-Mobile + Desktop nochmal laufen lassen
   (`pnpm audit:browser-matrix`, falls vorhanden) und sicherstellen,
   dass keine Regression entstanden ist.

**STOP-Gate 6:** PR-Review und merge.

---

## Akzeptanz-Check vor Merge

Vor dem Merge in `main` wird jeder der sechs Pain-Points
**nochmal namentlich abgehakt**. Die Person, die abnimmt, schaut sich
die Seite auf 1280 px Desktop und 390 px Mobile an und prüft:

- [ ] Pain-Point 1: Keine zusammenhängende leere Cream-Fläche grösser
      als 200 px Breite ohne Inhalt im Hero-Bereich auf Desktop.
- [ ] Pain-Point 2: H1 mindestens 4× so gross wie die Lede darunter.
- [ ] Pain-Point 3: Mindestens drei farbige Anker im Hero-Bereich
      sichtbar (nicht nur Soforthilfe-Button).
- [ ] Pain-Point 4: Aubergine als sichtbare Fläche an mindestens drei
      Stellen, Sage-Wash an mindestens einer.
- [ ] Pain-Point 5: Mindestens drei verschiedene Hintergrundfarben und
      zwei Layout-Modi auf der Home.
- [ ] Pain-Point 6: Aubergine-Marken-Mark ist visuell der dominante
      Header-Punkt, nicht der Soforthilfe-Button.
- [ ] Alle WCAG-Kontraste auf Aubergine-Block: AAA für H2, AAA für
      Lede primär, AA für Lede sekundär, AA für Eyebrow.
- [ ] Tests: alle bisherigen + die neuen drei sind grün.

---

## Was du im PR-Description schreibst

```
Phase 1 — Editorial Redesign Home + Header (Variante B)

Adressiert die sechs Pain-Points aus dem Mockup-Vergleich
borderline-home-mockup-v2.zip:

1. Leere Cream-Fläche → 2-Spalten-Hero mit Leuchtturm-Illustration
2. H1 zu klein         → --text-hero clamp(40px, 5.5vw, 72px)
3. Kein visueller Anker → HeroLeuchtturmIllustration in Aubergine
4. Palette unsichtbar  → EditorialColorBlock (Aubergine + Sage-Wash)
5. Gleicher Rhythmus   → 6 Sektions-Modi mit verschiedenen Layouts
6. Header verliert sich → Brand-Mark + Wordmark + Trenner + Nav-Hierarchie

Neue Komponenten:
- EditorialHero, EditorialColorBlock, EditorialOrnament
- HeroLeuchtturmIllustration, TestimonialMark
- VisualOrientationGrid
- SiteHeader (refactored)

Neue Tests:
- editorial-color-block.test.tsx (Kontrast-Werte)
- visual-orientation-grid.test.tsx (Tile-Logik)
- site-header.test.tsx (Brand-Hierarchie)

Keine inhaltlichen Änderungen. Texte unverändert. Tokens unverändert.
```

---

## Notiz für Phase 2 (nicht jetzt umsetzen)

Phase 2 wird sein:

1. Photographie ergänzen — 4 strategische Fotos beauftragen oder kuratieren
   (Hero-Backing, Testimonial-Backing, Selbstfürsorge-Page-Opener,
   «Aus der Beratungspraxis»-Block)
2. Editorial-Komponenten so erweitern, dass sie ein optionales
   `imageUrl?: string`-Prop akzeptieren — wenn vorhanden, ersetzt es den
   illustrierten Anker, sonst bleibt die Illustration.
3. Übertragung des gleichen Patterns auf Verstehen, Kommunizieren,
   Grenzen, Selbstfürsorge, Genesung als jeweilige Page-Opener.

Phase 2 wird in einem separaten Prompt aufgesetzt. Die in Phase 1 gebauten
Komponenten müssen so geschrieben sein, dass Phase 2 nichts umbauen muss
— nur ergänzen.
