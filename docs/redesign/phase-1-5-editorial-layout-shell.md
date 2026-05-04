# Phase 1.5 — Editorial-Layout-Hülle (Margin / Body / Aside)

**Repo:** `christaegger-dot/borderline-angehoerige`
**Branch-Pattern:** `claude/editorial-home-phase1-5-$(date +%s)`
**Datum:** 03.05.2026
**Auftraggeberin:** Christa Egger
**Bezug:** Pain-Point 1 aus `docs/redesign/home-redesign-pain-points.md` —
nach Schritt 4 von Phase 1 wurde im Deploy-Preview sichtbar, dass das
Problem der leeren Cream-Flächen über die ganze Seite hinweg auftritt,
nicht nur im Hero. Phase 1.5 schiebt sich vor Schritt 5+6 ein und löst
das systemisch, bevor das Pattern in Phase 2 auf die Tier-1-Pages
getragen wird.

---

## Was Phase 1.5 ist (und nicht ist)

**Ist:** Eine wiederverwendbare Layout-Hülle, die jede Sektion in drei
Slots strukturiert: `margin` (links), `body` (Lese-Inhalt), `aside`
(rechts). Jeder Slot ist optional. Die Lese-Spalte bleibt typografisch
auf 608 px Komfortbreite, aber das Layout drumherum trägt jetzt
Inhalt-Reichtum statt leerer Flächen.

**Ist nicht:** Eine Tokens-Änderung. Eine Inhalts-Erweiterung (kein
neuer Text, keine neuen Daten). Ein Eingriff auf nicht-Home-Pages.
Phase 1.5 baut die Hülle und wendet sie auf die Home an. Phase 2 trägt
sie auf die Tier-1-Pages.

---

## Komponenten-Architektur

Eine neue zentrale Komponente plus drei Slot-Subkomponenten:

```
client/src/components/editorial/
  EditorialSection.tsx
  EditorialSection.MarginNote.tsx     ← Subkomponente, exportiert über EditorialSection.MarginNote
  EditorialSection.Body.tsx
  EditorialSection.Aside.tsx
```

Bevorzugtes Compound-Component-Pattern (passt zu Christas Stil):

```tsx
<EditorialSection variant="cream" | "aubergine" | "sage-wash" | "cream-deep">
  <EditorialSection.MarginNote>
    {/* optional — eyebrow, anker, quellenverweise, sage-caps-labels */}
  </EditorialSection.MarginNote>
  <EditorialSection.Body>
    {/* die Lese-Spalte, max 608px breit */}
  </EditorialSection.Body>
  <EditorialSection.Aside>
    {/* optional — Bild, Pull-Quote, Kontakt-Karte, Ornament */}
  </EditorialSection.Aside>
</EditorialSection>
```

### Layout-Spezifikation (Desktop, ≥ 1024 px)

Container max-width 1240 px, zentriert.

Innerhalb der Section drei Spalten:

```
| MarginNote |   Body                           | Aside                   |
| 200px      |   608px                          | flex                    |
|  ---       |   ---                            | flex                    |
| Optional.  |   Lese-Mass, immer 608px breit.  | Wenn vorhanden, nimmt   |
| Wenn leer  |   Wenn keine Aside da, bleibt    | sich die restliche      |
| → 200px    |   trotzdem auf 608px (nicht      | Breite. Mindestens      |
| Leerraum   |   verbreitern!), aber rückt      | 240px, sonst gerade     |
| (das ist   |   nach links zur MarginNote.     | nicht rendern.          |
| Magazine-  |                                  |                         |
| Marge,     |                                  |                         |
| akzeptabel |                                  |                         |
| weil sie   |                                  |                         |
| Strukturf- |                                  |                         |
| unktion    |                                  |                         |
| hat).      |                                  |                         |
```

CSS-Grid mit `grid-template-columns: 200px minmax(0, 608px) 1fr` und
gap 32 px zwischen den Spalten.

### Layout-Spezifikation (Tablet, 768–1023 px)

Zwei Spalten: `body` und (falls vorhanden) `aside`. Die `MarginNote`
wird zu einer **kleinen Zeile oben über dem body** umgesetzt — d.h.
ihr Inhalt erscheint horizontal vor dem Body-Eyebrow.

Falls keine Aside da: einspaltig zentriert, MarginNote oben.

### Layout-Spezifikation (Mobile, < 768 px)

Einspaltig. Reihenfolge: `MarginNote` (als Inline-Eyebrow oben), dann
`Body`, dann `Aside`. Keine Marge an den Seiten ausser dem normalen
Section-Padding.

### Variants und Hintergrundfarben

```
variant="cream"        → bg: var(--bg-primary), Text dunkel
variant="aubergine"    → bg: var(--accent-primary), Text cream
                         (mit den expliziten Hex-Werten für H2/Lede,
                         siehe home-redesign-implementierung.md
                         WCAG-Block — diese Logik existiert schon im
                         bisherigen EditorialColorBlock und muss in
                         EditorialSection migriert werden)
variant="sage-wash"    → bg: var(--bg-sage-wash), Text dunkel
variant="cream-deep"   → bg: var(--bg-cream-deep), Text dunkel
```

### Aside-Verhalten je nach Variant

Auf Aubergine-Variant: Aside-Inhalt darf eigene Box mit Sage-Wash-
Hintergrund bekommen (per Prop `asideBackground="sage-wash"`), damit
ein Pull-Quote darin sich abhebt. Default: Aside ist transparent auf
dem Aubergine-Block.

Auf Cream/Sage-Wash-Variants: Aside ist standardmässig transparent,
kann aber per Prop einen Cream-Deep-Container bekommen, falls der
Inhalt eine Karte werden soll (z.B. Fachstelle-Kontaktkarte).

---

## Migration der bestehenden Sektionen auf der Home

Sechs Stellen werden umgebaut. Eine nach der anderen, jede mit eigenem
STOP-Gate, damit du nach jeder visuell prüfen kannst.

### Sektion 1 — EditorialHero

Aktueller Stand: `1.2fr / 1fr` Grid mit Text links und Leuchtturm
rechts mittig in seiner Zelle.

Neu:

- `<EditorialSection variant="cream">`
- `MarginNote`: leer (oder optional: kleines Sage-Caps-Datum «Stand
  30.04.2026» — du entscheidest)
- `Body`: Eyebrow «Fachstelle Angehörigenarbeit · PUK Zürich», dann H1,
  dann Lede, dann Meta-Zeile mit Hairline-Trenner.
- `Aside`: Leuchtturm-Illustration, an die rechte Kante der Aside-
  Spalte gesetzt (`margin-left: auto`), max-width 560 px, height
  passt sich der Body-Höhe an (`height: 100%; object-fit: contain`).

H1-Skalierung: nach Migration prüfen, ob H1 jetzt drei Zeilen statt
vier bricht. Falls noch vier Zeilen: clamp anpassen auf
`clamp(40px, 6vw, 76px)` oder Body-Spalte kurz auf 660 px ausweiten
(nicht permanent, nur Hero — als Ausnahme zur 608-Regel, weil H1 keine
Lese-Spalte ist).

### Sektion 2 — Anerkennung

Aktueller Stand: zentrierte 608px-Spalte mit Eyebrow + drei Absätzen.

Neu:

- `<EditorialSection variant="cream">`
- `MarginNote`: Sage-Caps-Anker «AMBIVALENZ» (ein einziges Wort, gross
  gesetzt — z.B. font-size 13 px, letter-spacing 0.14em, color
  var(--accent-label), uppercase, mit einem zarten Hairline-Trenner
  darunter)
- `Body`: Eyebrow «Anerkennung», dann die drei Absätze
- `Aside`: leer (Sektion bleibt zweispaltig: MarginNote + Body)

### Sektion 3 — Aubergine-Block (Grundgedanke)

Aktueller Stand: vollflächige Aubergine-Sektion mit zentrierter Lese-
Spalte.

Neu:

- `<EditorialSection variant="aubergine">`
- `MarginNote`: Sage-Caps-Quellenanker
  - Zeile 1: «AUS DER DBT-TRADITION»
  - Zeile 2 (kleiner, kursiv): «Linehan 1993 · Lebowitz 2020»
  - Farbe: rgba(245, 236, 230, 0.65) — also sage-Caps-äquivalent auf
    dunklem Hintergrund.
    Ersetzt die Fussnote-1 weiter unten in der Sektion (die wandert in
    die Marginalie als Quellen-Anker, der inhaltliche Linehan-Verweis
    bleibt als Fussnote).
- `Body`: Eyebrow «Grundgedanke», H2, alle bisherigen Absätze inkl.
  Drop-Cap. Fussnote-1 zur Bindungssensibilität bleibt unten in
  der Body-Spalte.
- `Aside`: Pull-Quote der Schlüssel-Zeile, gross gesetzt:

  ```
  «Selbstschutz ist
  deshalb keine
  Gegenkraft zur
  Beziehung,
  sondern ihre
  Voraussetzung.»
  ```

  Source Serif 4, 28 px, line-height 1.25, color #f5ece6, italic.
  Mit «»-Anführungszeichen in Sage (rgba 0.4, kleinerer dezenter Akzent).

  Darunter ein dezentes Aubergine-Ornament — wiederverwendet aus dem
  bestehenden EditorialOrnament wenn schon vorhanden, sonst ein
  zarter Hand-drawn Curve in #f5ece6 mit opacity 0.25.

### Sektion 4 — Visual Orientation Grid

Aktueller Stand: Section-Header oben, dann 4-Spalten-Grid mit
8 Tiles.

Neu:

- `<EditorialSection variant="cream">` als Wrapper
- `MarginNote`: Sage-Caps-Anker «ORIENTIERUNG» plus dezente
  Hairline-Trenner-Linie
- `Body`: nur der Section-Header und die Section-Lede («Acht Konzepte,
  in Lese-Reihenfolge — ein Bild pro Idee.»)
- `Aside`: leer

ABER: das Tile-Grid selbst durchbricht die normale Container-Logik und
nimmt die volle 1240px-Containerbreite ein. Es liegt unterhalb der
EditorialSection, technisch in einer eigenen Wrapper-Section ohne
Margin/Aside. So bleibt das Tile-Grid weit, aber der Section-Header
folgt der Editorial-Hülle.

### Sektion 5 — Orientierung-Sektion (Lese-Hilfe nach dem Tile-Grid)

Aktueller Stand: zentrierte 608px-Spalte mit Eyebrow «Orientierung»
und Lese-Text mit Inline-Links.

Neu:

- `<EditorialSection variant="cream">`
- `MarginNote`: Sage-Caps-Anker «WEGWEISER»
- `Body`: bisheriger Inhalt
- `Aside`: leer

### Sektion 6 — Testimonial («Aus der Angehörigenarbeit»)

**STATUS:** Sage-Wash-Hintergrund + TestimonialMark + Pull-Quote
bereits umgesetzt in PR #393. Phase 1.5 wickelt nur die bestehende
Logik in die neue EditorialSection-Hülle und ergänzt MarginNote

- Aside (kursive Schlüsselzeile).

Aktueller Stand: zentrierte Sektion auf Cream (Sage-Wash kommt erst in
Schritt 5 von Phase 1). Phase 1.5 baut den Wrapper, Phase-1-Schritt-5
nutzt ihn dann.

Neu (für Phase 1.5):

- `<EditorialSection variant="sage-wash">` (statt Cream)
- `MarginNote`: Sage-Caps-Anker «AUS DER PRAXIS» — etwas grösser
  gesetzt als die anderen Marginalien (font-size 14 px), weil
  Testimonial-Sektion eine emotionale Pause sein soll
- `Body`: TestimonialMark als Marker oben (kommt in Schritt 5),
  dann Pull-Quote, dann Attribution
- `Aside`: kursive Schlüssel-Zeile, gross gesetzt:

  ```
  «Was mir
  schliesslich
  geholfen hat,
  war zu
  verstehen,
  dass die
  Dynamik nicht
  an mir lag.»
  ```

  Source Serif 4, 24 px, italic, color var(--accent-primary). Optional
  ein kleines illustriertes Marker-SVG darunter (TestimonialMark in
  klein, opacity 0.5, als Wiedererkennungs-Geste).

### Sektion 7 — Fachstelle-CTA

Aktueller Stand: zentrierte Cream-Sektion mit H2, Prosa und
Kontaktangaben.

Neu:

- `<EditorialSection variant="cream-deep">` (statt Cream — gibt der
  CTA-Sektion einen leichten warmen Akzent zur Abhebung)
- `MarginNote`: Sage-Caps-Anker «FACHSTELLE»
- `Body`: H2, Prosa
- `Aside`: Kontakt-Karte mit:
  - Adresse (Lenggstrasse 31, 8032 Zürich)
  - Telefon (058 384 38 00) — als anrufbarer Link
  - E-Mail (angehoerigenarbeit@pukzh.ch) — als mailto-Link
  - Öffnungszeiten (falls Du die hast — sonst lassen)
  - Optional: kleines Foto der Fachstelle, falls verfügbar; sonst
    rein typografisch

  Karte hat eigenen Cream-Container mit hairline-Border, padding
  24 px, border-radius 4 px.

  WICHTIG: Falls Du keine Foto- oder Öffnungszeit-Daten findest, baue
  die Karte rein typografisch und setze dafür einen `// TODO:
Öffnungszeiten ergänzen, Foto optional`-Kommentar.

---

## Migrations-Reihenfolge mit STOP-Gates

Sieben Schritte, jeder ein eigener Commit auf demselben PR-Branch.

```
Schritt 1 → EditorialSection-Komponente bauen + Tests
Schritt 2 → Hero migrieren                    ← STOP-Gate, Deploy-Preview prüfen
Schritt 3 → Anerkennung migrieren             ← STOP-Gate
Schritt 4 → Aubergine-Block migrieren         ← STOP-Gate (das ist der härteste)
Schritt 5 → Visual-Grid-Wrapper migrieren     ← STOP-Gate
Schritt 6 → Orientierung-Sektion migrieren    ← STOP-Gate
Schritt 7 → Fachstelle-CTA migrieren          ← STOP-Gate
```

Testimonial-Sektion (Sektion 6 oben) kommt in Phase-1-Schritt-5 nach
Phase 1.5. Phase 1.5 baut nur den Wrapper, Schritt 5 von Phase 1 setzt
ihn um.

---

## Akzeptanzkriterien

Nach Phase 1.5 muss gelten:

1. Auf 1280 px Viewport gibt es **keine zusammenhängende leere Cream-
   Fläche grösser als 200 px Breite** in irgendeiner Sektion. Ausnahme:
   die linke 200-px-Marginalie in Sektionen, die keine MarginNote
   haben — diese 200 px sind eine bewusste strukturelle Marge, nicht
   eine ungenutzte Fläche.

2. Jede Sektion hat **mindestens einen** der folgenden Inhalts-Anker:
   - eine MarginNote, oder
   - eine Aside, oder
   - vollflächigen Hintergrund (Aubergine-Block, Sage-Wash) als
     visueller Akzent.

3. Lese-Spalte bleibt überall auf 608 px (mit Hero als optionaler
   Ausnahme, falls H1 anders nicht atmet).

4. Bestehende WCAG-Kontraste bleiben gewahrt (insbesondere Aubergine-
   Block H2 8.34:1, Lede 7.84:1, etc.).

5. Alle bisherigen Tests bleiben grün. Neue Tests:
   - `editorial-section.test.tsx` — prüft die drei Slot-Renderings,
     die Variants, die Aside-Visibility-Logik
   - Snapshot-Test, falls Christas Stil dafür ist (sonst weglassen)

6. Mobile (390 px) ist nicht schlechter als jetzt — alle Sektionen
   bleiben einspaltig, MarginNotes als Inline-Eyebrows.

---

## Was nicht passieren darf

- Keine Tokens umdefinieren. Alle Farben kommen aus den bestehenden
  CSS-Variablen, Aubergine bleibt #5b3a4e, Sage bleibt #4f6b5e.
- Kein neuer Text. Inhaltliche Erweiterungen (Pull-Quotes, Marginalien-
  Anker) kommen aus bereits geschriebenen Texten oder sind Ein-Wort-
  Anker, die eindeutig dem Sektionsthema entsprechen.
- Kein Refactoring der bestehenden Komponenten ausserhalb der Section-
  Hülle. EditorialHero nutzt EditorialSection intern, aber die
  Public-API bleibt gleich, damit Pages nicht angepasst werden müssen.
- Keine A/B-Test-Logik. Wir liefern eine Variante, die ich bestätige.
- Kein neues Routing.

---

## Zur Frage von Hero-Anker-Tuning aus PR #392

In der Diskussion zu PR #392 standen drei Hero-Varianten zur Wahl
(zentrierter Leuchtturm, Leuchtturm right-bleed, Leuchtturm
left-bleed). Phase 1.5 löst das implizit über die EditorialSection-
Hülle: Aside ist die rechte Spalte, der Leuchtturm sitzt rechtsbündig.
Falls nach Migration die Hero-Wirkung immer noch nicht trifft, machen
wir die Variante-B-Variante (Leuchtturm bricht aus dem Container
heraus bis an den Viewport-Rand) als Folge-Iteration — aber erst nach
Sichtprüfung.

---

## Reihenfolge in der Phase

```
Phase 1, Schritte 1-3 (Header, Hero, Aubergine)     ✓ gemerged
Phase 1, Schritt 4 (Visual-Grid)                    ✓ gemerged
Phase 1, Schritt 5 (Sage-Wash-Testimonial)          ✓ gemerged
Phase 1.5 (diese Datei)                             ← jetzt
Phase 1, Schritt 6 (Konsolidierung + Tests + Lighthouse)
Phase 2 (Tier-1-Pages mit Tier-A-Illustrationen)
```
