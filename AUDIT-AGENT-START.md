# Website-Audit-Agent – borderline-angehoerige

## Quellenmodell nach Migration

**Vorrang hat der eigenständige Website-Quellordner `authoring/` dieses Repositories.** Seit dem Merge von PR #671 am 13. Oktober 2026 liegen alle bearbeitbaren Inhalte, CSS, JavaScript, Konfiguration und lokale Ressourcen hier.

- `authoring/content/`: Kapitel und Informationen
- `authoring/site.config.json`: Seitenvertrag, Navigation, Zuständigkeit, Veröffentlichungsdaten
- `authoring/css/site.css`, `authoring/js/interaktion.js`: Design- und Bediencode
- `site/`: generierte, von Netlify veröffentlichte Dateien
- `authoring/PRUEFBERICHT.md`: historische, versionsgebundene Freigabeunterlage; bei Änderungen nicht automatisch aktuell

Das separate Repository `christaegger-dot/puk-website-profil` dient künftig als **Design- und Qualitätsreferenz**. Inhaltliche Korrekturen NICHT mehr dort verorten und NICHT ausschliesslich in den generierten `site/`-Dateien vornehmen.

Fehlt die `authoring/`-Struktur in einem geprüften Stand, markiere das ausdrücklich und führe das Audit nur im Bestand-/read-only-Modus durch.

## Startauftrag
Verwende `$website-audit` im Modus `bestand`. Ermittle die aktuelle Repository-Version und den Deployment-Stand, inventarisiere alle bisherigen Audit-/Freigabenachweise und prüfe offen gebliebene Befunde. Starte keine automatische Korrektur, keinen Merge oder Veröffentlichung.

Bei einem späteren Korrekturauftrag müssen die freigegebenen Änderungen in `authoring/` erfolgen, die Website durch `node authoring/tools/build.mjs --production --out=site --write-site` erzeugt und mit `--verify-site` gegen den generierten Export geprüft werden.
