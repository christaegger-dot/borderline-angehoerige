# Codex – Arbeitsbereich borderline-angehoerige

Dieses Repository ist jetzt die **eigenständige Quelle für seine Website-Inhalte**.

- Bearbeite HTML-Fragmente in `authoring/content/`, die Seitenkonfiguration in `authoring/site.config.json`, Styles in `authoring/css/site.css` und Funktionen in `authoring/js/interaktion.js`.
- `site/` ist der generierte Veröffentlichungsexport. Verändere seine HTML-Dateien niemals direkt; nutze ausschliesslich den lokalen Build und die dokumentierte Freigabe.
- Das separate Repository `christaegger-dot/puk-website-profil` dient nur noch als Design-/Qualitätsreferenz. Keine Website-Inhaltskorrekturen dort vornehmen.
- Vor jeder Korrektur relevante Belege prüfen und die Fach-/Rechts-/Sicherheitsfreigabegrenzen beachten. Die historische `authoring/PRUEFBERICHT.md` betrifft den früheren Release, nicht ungeprüfte neue Änderungen.
- Vor PR: `node authoring/tools/build.mjs --production --out=site --write-site` und `node authoring/tools/build.mjs --production --verify-site`.
- Kein eigenständiger Merge, kein Deployment, keine Änderung an Netlify-Zugangsschutz oder DSG-Konfiguration ohne gesonderten Auftrag.
- Es existiert parallel ein Draft-PR für den gemeinsamen Website-Audit-Skill; dessen spätere Installation darf die eigenständige Quellenordnung nicht überschreiben.
