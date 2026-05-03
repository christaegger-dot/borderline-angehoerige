# Home-Redesign — Diagnose der sechs Pain-Points

**Datum:** 03.05.2026
**Auftraggeberin:** Christa Egger, Fachstelle Angehörigenarbeit, PUK Zürich
**Scope:** Die Live-Site `borderline-angehoerige.netlify.app` ist
inhaltlich, fachlich und governance-seitig auf hohem Niveau. Aber sie
wirkt nicht ansprechend. Diese Datei dokumentiert, warum nicht — und
ist die Grundlage für die Implementierungs-Phase.

## Kontext

Der Editorial-Redesign vom April ist **technisch sauber umgesetzt**:
Source Serif 4, Cream-Hintergrund, Aubergine-Akzent, Sage-Labels,
Lese-Mass 608 px. Die Tokens stehen, der Code ist konsistent, die
Tonalität der Texte ist warm und gut.

Das Problem: **Editorial wurde umgesetzt, aber nicht gestaltet.**

Es gibt einen Unterschied zwischen _Editorial-Layout_ (eine Spalte
Source Serif auf Cream) und _Editorial-Design_ (NYT, Republik, The
Atlantic). Was auf der Site jetzt steht, ist Ersteres — eine Spalte
Text in der Mitte einer fast leeren Bildschirmhälfte. Das wirkt nicht
ruhig-elegant, sondern **steril und verloren**, gerade für eine
Zielgruppe in akuter Belastung.

## Die sechs Pain-Points

### Pain-Point 1 — Auf Desktop sind 60 % der ersten Bildschirmhälfte leer

Bei 1280 px Viewport hat die Lese-Spalte 608 px – das heisst 670 px
leere Cream-Fläche rechts oben. Magazine-Editorial nutzt diese Marge:
für Bilder, Marginalien, Pull-Quotes, asymmetrische Brüche. Hier
passiert dort _nichts_. Mobile sieht deshalb auch deutlich besser aus
als Desktop – auf 390 px ist die Spalte das ganze Bild.

### Pain-Point 2 — Der H1 ist zu klein, um Editorial-Wirkung zu haben

«Wenn jemand, den Sie lieben, eine Borderline-Persönlichkeitsstörung
hat» läuft auf Desktop bei ca. 42 px in normaler Schriftstärke. Ein
NYT-Feature-Headline ist 64–80 px. Editorial-ohne-Bild funktioniert
nur, wenn die Typografie _selbst_ das Bild ist – das passiert hier
nicht. Der H1 wirkt fast genauso gross wie die Lede direkt darunter.

### Pain-Point 3 — Es fehlt jeder visuelle Anker

Kein Bild, keine Illustration, keine Farbfläche, kein Display-Element.
Die einzigen farbigen Elemente oben sind das winzige Sage-Eyebrow
«FACHSTELLE ANGEHÖRIGENARBEIT» und der rote Soforthilfe-Button rechts
oben. Das menschliche Auge findet keinen Halt – und springt dann
reflexartig zum knallroten Notfall-Button, was den ersten Eindruck
dominiert.

### Pain-Point 4 — Die Palette ist da, aber unsichtbar

Aubergine erscheint nur in Inline-Links (3-Wort-Schnipsel im
Fliesstext), Sage nur in 12-px-Caps-Labels. Auf einer 4000-px-langen
Seite ist das auf Desktop praktisch nicht wahrnehmbar.

### Pain-Point 5 — Alle Sektionen haben denselben visuellen Rhythmus

Eyebrow → H2 → Prosa → Eyebrow → H2 → Prosa. Keine Pausen, keine
Akzentflächen, keine Display-Quotes, keine Bilder. Eine 4 m lange Wand
aus Text in immer gleichem Muster.

### Pain-Point 6 — Der Header verliert sich

Kompass-Icon plus zweizeiliger Schriftzug «Borderline · Hilfe für
Angehörige / Orientierung für belastete Beziehungssituationen» – das
ist drei Hierarchien in 60 px Höhe. Daneben sechs gleichgewichtete
Nav-Items in voller Schriftstärke. Es gibt keinen klaren Anker, was
die Marke ist.

## Die Wurzel des Problems

Anders gesagt: dein wertvollstes visuelles Material — **33
Infografiken**, **3 interaktive React-Visualisierungen** (Krisenampel,
Rollen-Orbit, Energie-Haushalt) und **6 interaktive Tools**
(Validierungs-Stufenleiter, Grenzen-Check, Grounding-Timer,
Selbstfürsorge-Check, Kommunikations-Übung, Situations-Wegweiser) —
wird wie ein wissenschaftlicher Appendix behandelt.

Sie sind alle unten als «Materialien zum Vertiefen» platziert mit dem
einleitenden Satz «Diese Materialien ergänzen die Seite, ersetzen sie
aber nicht». Auf der Home-Page kommt **keine einzige davon vor**. Auf
den Inhaltsseiten erscheinen sie erst nach dem ganzen Fliesstext,
gefiltert nach Kategorie, im Download-Tile-Modus.

Das ist die Wurzel von «nicht ansprechend» — nicht die Tokens, nicht
die Typografie, sondern eine **falsche Hierarchie zwischen Text und
Bild**.

## Konsequenz für den Redesign

Im Redesign müssen Bilder, Visualisierungen und Akzentflächen vom
Anhang zum **Hauptinhalt** werden. Konkret:

- **Auf der Home** kommt ein Visual-Orientation-Grid mit acht
  Infografiken oberhalb der ersten Lese-Sektion.
- **Auf den Inhaltsseiten** wird jeweils die wichtigste Infografik
  zum Page-Opener (im Hero-Bereich, nicht erst nach 4000 px Scrollen).
- **Die Tools und interaktiven Visualisierungen** werden inline in
  ihre Pages integriert, nicht versteckt in Material-Anhängen.

Diese Phase 1 setzt den Anfang auf der Home und im Header. Spätere
Phasen tragen das Pattern auf die Inhaltsseiten.
