# Screenshot-Befunde Phase 9.3

## 1280x800

- VP-Mitte: 640px (rote Linie)
- mx-auto-Mitte: NICHT sichtbar (kein grüner Label) → mx-auto wurde nicht gefunden oder ist nicht aktiv
- Inhalt beginnt bei ca. X=337px (links)
- Inhalt endet bei ca. X=943px (rechts)
- Inhalt-Mitte: (337+943)/2 = 640px → ZENTRIERT!
- Aber: Inhalt sitzt optisch LINKS der Viewport-Mitte weil Viewport-Mitte bei 640px
- Tatsächlich: Text beginnt bei X=337, VP-Mitte bei 640 → 303px Abstand links, 337px Abstand rechts
- Das sieht links-lastig aus, ist aber korrekt zentriert bei 608px Breite

## 1600x800

- VP-Mitte: 800px (rote Linie)
- Inhalt-Mitte: ca. 800px → ZENTRIERT
- Mehr Whitespace rechts sichtbar (Viewport breiter)

## 2000x1200

- VP-Mitte: 1000px (rote Linie)
- TOC-Sidebar sichtbar (links, fixed, ~240px breit)
- Inhalt-Mitte: ca. 700px → NICHT bei 1000px!
- Inhalt sitzt bei X=487-1095px → Mitte bei 791px
- VP-Mitte 1000px, Inhalt-Mitte 791px → Differenz 209px nach links verschoben
- Das ist die echte Asymmetrie auf 2000px!

## Schlussfolgerung

- Auf 1280px und 1600px: Inhalt ist korrekt zentriert
- Auf 2000px: Inhalt ist ~200px nach links verschoben (wegen TOC-Sidebar)
- Die Asymmetrie ist NICHT auf 1280px vorhanden, sondern erst ab 1800px (Sidebar-Breakpoint)
