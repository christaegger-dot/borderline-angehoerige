# Prüfumfang der visuellen Umsetzung r4-22

Geprüft wurde der nicht commitierte lokale Arbeitsstand auf Branch `codex/pendenzenbereinigung-2026-10-13`, basierend auf Commit `e7a11453a7a3dea1298ff9f98c6b9733af3f29a4`. Kanonische Quelle ist `authoring/`; der veröffentlichte Export unter `site/` wurde nicht verändert.

Umgesetzt und geprüft wurden die Befunde A04-008 bis A04-013:

- Sichtbarkeit der Tassen- und Abenddarstellung vor den zugehörigen Vertiefungen;
- abgestufte Gewichtung der sieben identischen Zuständigkeitsverweise auf der Krisenseite;
- Ersatz des kausal lesbaren Eisbergmodells durch die gleichwertige Unterscheidung Beobachtung, offene Bedeutung und mögliche Frage;
- neue Darstellungen zu Informationswegen in der Behandlung, Aufgaben rund um Kinder und Jugendlichen sowie Einflüssen auf Genesung.

Ausgeführt wurden:

- JavaScript-Syntaxprüfung und JSON-Parsing;
- lokaler Draft-Build aller 22 Seiten mit dem produktiven Build-Gate;
- absichtlicher Produktionsbuild zur Prüfung der vier verbleibenden Freigabesperren;
- Chromium-Layoutmatrix für sieben betroffene Seiten bei 320, 375, 768, 1024 und 1440 CSS-Pixel sowie 100 und 200 Prozent Root-Schriftgrösse;
- jede Kombination mit geschlossenen und geöffneten `details`-Elementen;
- Prüfung auf horizontalen Überlauf, ausserhalb des Viewports liegende sichtbare Elemente, Laufzeit- und Konsolenfehler;
- 14 automatisierte axe-Prüfläufe bei 375 und 1440 CSS-Pixel gegen WCAG 2 A/AA, 2.1 A/AA und 2.2 AA;
- Fokusprüfung auf allen sieben Seiten;
- DOM- und Darstellungsprüfung der sieben Zuständigkeitsverweise bei 375 und 1440 CSS-Pixel;
- visuelle Kontrolle der sechs betroffenen Wissensdarstellungen bei 375 und 1440 CSS-Pixel.

Nicht ausgeführt wurden reale Screenreader-, Touchgeräte-, Hardwaretastatur-, Firefox-, Safari-, Windows-Hochkontrast- oder Nutzendentests. Die fachlichen, rechtlichen und Kinderschutz-Freigaben der vier neuen beziehungsweise grundlegend geänderten Darstellungen sind ebenfalls nicht ersetzt worden.
