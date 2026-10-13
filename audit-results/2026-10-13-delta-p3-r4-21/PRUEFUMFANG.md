# Prüfumfang P3 und Altersinklusion r4-21

Geprüft wurde Commit `a61a602fdc2e108a9e289e4bbc81e174940f2ff6` auf Branch `codex/p3-optimierungen-2026-10-13`, basierend auf `origin/main` bei `ad0023db8c325ded93d3f48f732406b01107aace`. Kanonische Quelle ist `authoring/`; `site/` wurde daraus neu erzeugt.

Ausgeführt wurden:

- Volltext- und Mustersuche in `authoring/content/`, `authoring/site.config.json` und allen 22 ausgelieferten HTML-Seiten nach ausdrücklichen oder indirekten Altersbegrenzungen der Angehörigenberatung;
- manuelle Einordnung aller einschlägigen Fundstellen zu «jung», «jugendlich», «minderjährig», «volljährig» und «erwachsen»;
- Nachprüfung der Akzeptanzkriterien A03-010 bis A03-018 und A04-005 bis A04-007;
- Produktions-Build und Byte-Parität zwischen kanonischer Quelle und `site/`;
- Chromium-Browsermatrix mit 22 Seiten, 320/390/768/1440 CSS-Pixel und 16/32 Pixel Root-Schriftgrösse;
- Prüfung auf HTTP-Erfolg, genau eine H1, `main`, Buildmarker r4-21, horizontalen Überlauf und den vollständigen altersinklusiven Beratungssatz;
- Laufzeitprüfung auf `pageerror`, Konsolenfehler und fehlgeschlagene Ressourcen;
- visueller Vergleich der Figuren `v-vs-bewertungen`, `v-ko-tassen` und `v-gr-dear` bei 320 und 1440 CSS-Pixel;
- Vergleich von 36 Such-Ersttreffern zwischen der Produktion r4-20 und dem lokalen Stand r4-21.

Nicht ausgeführt wurden reale Screenreader-, Geräte-, Firefox-, Safari-, Windows-Hochkontrast- oder Nutzendentests. Das Produktionsdeployment r4-21 kann erst nach Merge geprüft werden.
