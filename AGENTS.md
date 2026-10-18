# Gemeinsame Arbeitsregeln – borderline-angehoerige

Dieses Repository ist jetzt die **eigenständige Quelle für seine Website-Inhalte**.

- Bearbeite HTML-Fragmente in `authoring/content/`, die Seitenkonfiguration in `authoring/site.config.json`, Styles in `authoring/css/site.css` und Funktionen in `authoring/js/interaktion.js`.
- Lies vor Änderungen `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`; diese Datei ist der aktuelle operative Status. `authoring/PRUEFBERICHT.md` ist ein historischer Nachweis, kein Aufgabenplan.
- `site/` ist der generierte Veröffentlichungsexport. Verändere seine HTML-Dateien niemals direkt; nutze ausschliesslich den lokalen Build und die dokumentierte Freigabe.
- Das separate Repository `christaegger-dot/puk-website-profil` dient nur noch als Design-/Qualitätsreferenz und für beschlossene gemeinsame Profiländerungen. Das dortige Borderline-Verzeichnis ist archiviert; keine Website-Inhaltskorrekturen dort vornehmen.
- Vor jeder Korrektur relevante Belege prüfen und die Fach-/Rechts-/Sicherheitsfreigabegrenzen beachten. Die historische `authoring/PRUEFBERICHT.md` betrifft den früheren Release, nicht ungeprüfte neue Änderungen.
- Vor PR: `node authoring/tools/build.mjs --production --out=site --write-site` und `node authoring/tools/build.mjs --production --verify-site`.
- Kein eigenständiger Merge, kein Deployment, keine Änderung an Netlify-Zugangsschutz oder DSG-Konfiguration ohne gesonderten Auftrag.
- Gemeinsame Audit-Werkzeuge dürfen die eigenständige Quellenordnung nicht überschreiben. Hinweise auf einen offenen Pull Request nur mit überprüfbarem Link und aktuellem Status führen.

## Branches und mögliche Dateidubletten

- Beschreibende Branch-Namen mit Datum oder Zeitkennung verwenden und vor der Anlage auf Eindeutigkeit prüfen. Das ist eine Projektkonvention. GitHub verbietet keine weiteren Pull Requests allein wegen eines nach einem Merge wiederverwendeten Branch-Namens; entscheidend sind neue Unterschiede zum Zielbranch.
- Dateinamen wie « 2.ext» können aus Sync-Konflikten stammen. Ihr Name belegt weder Alter noch Entbehrlichkeit. Inhalt, Herkunft und Git-Verlauf vergleichen; unklare Unterschiede erhalten. Nur nach belegtem Abgleich gezielt per Dateiliste löschen, nie per Wildcard, und danach `git status` prüfen.
