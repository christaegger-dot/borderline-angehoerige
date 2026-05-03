# Home-Redesign — Bildsprache-Doktrin

**Datum:** 03.05.2026
**Auftraggeberin:** Christa Egger
**Bezug:** Pain-Point-Diagnose `home-redesign-pain-points.md`

## Drei Schichten, die zusammenwirken müssen

Für die Zielgruppe — Angehörige in akuter Belastung — sind
**Bildsprache, dekorative Elemente und psychoeduktive Visualisierungen
gleichrangig wichtig** wie der Fliesstext. Das ist die zentrale
Designentscheidung.

Lass mich präzisieren, was jede Schicht tatsächlich tun muss:

### Schicht 1 — Bildsprache (emotionaler Anker)

Was Angehörige in Belastung sehen müssen, **bevor sie lesen können**.

**Optionen:**

- **Photographische Bildsprache** — warm, menschlich, kein
  Stock-Material. Details: Hände, Sonnenlicht auf Mauer, ein Stuhl im
  Halbschatten, eine Pflanze, zwei Tassen.
  _Risiko:_ Das muss kuratiert oder beauftragt werden, sonst wirkt es
  wie Kassenwerbung.

- **Illustrierte Bildsprache** — handgezeichnete oder digital-organische
  Marken in der Aubergine/Sage/Cream-Palette. Konsistent über die Site.
  _Risiko:_ Wirkt schnell «nett-aber-nicht-ernst» wenn falsch gemacht.

- **Hybrid** — Foto für emotionale Anker, Illustration für strukturelle
  Elemente.

**Entscheidung:** **Hybrid in zwei Phasen.**

- **Phase 1 (jetzt umsetzen):** Reine Illustration als Basislinie. Alle
  Bildsprache-Elemente sind SVG-Komponenten in der Tokens-Palette. Kein
  externes Bildmaterial nötig, sofort produzierbar, konsistent über die
  Site.

- **Phase 2 (später):** Photographie ergänzen an drei oder vier
  strategischen Stellen — Home-Hero, Testimonial-Backing,
  Selbstfürsorge-Page-Opener, «Aus der Beratungspraxis»-Block.
  Komponenten werden so geschrieben, dass sie eine optionale
  `imageUrl`-Prop akzeptieren — wenn vorhanden, ersetzt die Fotografie
  den illustrierten Anker. Wenn nicht, bleibt die Illustration. **Phase
  2 baut nichts um, ergänzt nur.**

### Schicht 2 — Dekorative Elemente (visuelle Atmung)

Organische Formen, die zwischen Text-Sektionen sitzen — keine
Trennlinien, sondern weiche Akzente.

**Mittel:**

- **Aubergine-Farbflächen** für Kontrast-Sektionen. Auf der Home wird
  die Grundgedanke-Sektion (`Mitgefühl und Selbstschutz sind kein
Widerspruch`) vollflächig auf Aubergine-Hintergrund mit Cream-Text
  gesetzt.
- **Sage-Wash** als Hintergrund für ruhige Reflexions-Sektionen
  («Aus der Beratungsarbeit»).
- **Hand-illustrierte Marker** bei Sektions-Eröffnungen — kleine,
  präzise SVG-Zeichnungen (eine offene Hand, eine Linie, ein
  Punkt-Cluster).
- **Cream-auf-Cream-Kompositionen** mit Hairline-Trennlinien als
  Struktur dort, wo Akzente nicht sinnvoll sind.

### Schicht 3 — Diagramme und psychoeduktive Visualisierungen (Hauptinhalt)

Hier liegt der grösste, schnellste Hebel. Das bestehende Material muss
vom Anhang zum **primären Inhalt** werden:

- **Page-Opener auf jeder Inhaltsseite:** Statt «H1 + Lede + Wall of
  text» wird das tragende Konzept als Infografik direkt nach dem H1
  visuell eingeführt. Auf `/verstehen` → der Eisberg oder Alarm-Modus
  oben. Auf `/grenzen` → die 4 Arten von Grenzen oben. Auf
  `/selbstfuersorge` → die Sauerstoffmaske oben. _Wird in späteren
  Phasen umgesetzt._

- **Inline-Anker:** Wo eine Sektion ein Konzept aus einer Infografik
  vertieft, erscheint die Infografik direkt **dort** im Text-Fluss,
  nicht im Anhang. _Wird in späteren Phasen umgesetzt._

- **Home als visuelle Orientierung:** Statt nur Prosa-Anerkennung, eine
  «Visuelle Karte» mit 6–8 Infografiken als Hero-Tiles, die direkt in
  die jeweiligen Themen führen. Das ist gleichzeitig schöne Bildsprache
  _und_ funktionale Orientierung. _Phase 1 — wird jetzt umgesetzt._

- **Interaktive Visualisierungen sichtbar:** Krisenampel, Rollen-Orbit
  und Energie-Haushalt sollten oben in ihren Pages stehen, nicht
  versteckt. _Wird in späteren Phasen umgesetzt._

## Was Phase 1 konkret umsetzt

| Schicht                 | Phase 1                                           | Phase 2+                     |
| ----------------------- | ------------------------------------------------- | ---------------------------- |
| 1 — Bildsprache         | Illustrierte Basis (Leuchtturm-SVG)               | Fotografie ergänzen          |
| 2 — Dekorative Elemente | Aubergine-Block + Sage-Wash + Ornament-SVGs       | Auf weitere Pages tragen     |
| 3 — Diagramme           | VisualOrientationGrid mit 8 Infografiken auf Home | Page-Opener auf Tier-1-Pages |

Phase 1 beweist das Pattern auf der Home. Phase 2 trägt es auf die
restlichen Pages und ergänzt Photographie.
