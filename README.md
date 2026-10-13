# Borderline – Orientierung für Angehörige

Psychoedukative Website der Fachstelle Angehörigenarbeit, Psychiatrische Universitätsklinik Zürich, nach dem PUK Website-Profil 2026.10.1. Kontakt: angehoerigenarbeit@pukzh.ch

## Inhalt dieses Repositorys

Die veröffentlichbare Website liegt im Ordner `site/`: 17 Seiten, `css/site.css`, Schriften, `js/interaktion.js`, `assets/`, `_headers`, `_redirects` und `robots.txt`. Netlify liefert `site/` ohne Build aus (`netlify.toml`). Die Website ist mit `noindex, nofollow`, dem HTTP-Header `X-Robots-Tag` und `robots.txt` von der Suchmaschinenaufnahme ausgeschlossen; deshalb wird keine Sitemap ausgeliefert. Im Stamm liegen nur diese Datei, `CLAUDE.md`, `netlify.toml` und `.gitignore`.

- **Quelle:** Repository `puk-website-profil`, Ordner `templates/website/borderline-angehoerige`. Dort stehen Inhalte, Visualisierungsplan, Prüfbericht und Abgleich. Hier wird nichts von Hand geändert.
- **Entstehung:** im Ordner der Website `node tools/export.mjs <ziel>`, für die Veröffentlichung mit `--production`. Den Export nach `site/` schreiben, danach `_redirects` von Hand nach `site/` kopieren (UMBAUPLAN, Abschnitt 7), weil `tools/export.mjs` die Datei nicht kopiert.
- **Frühere Fassung:** Die React-Fassung steht im Branch `react-archiv`.

## Stand

Produktions-Export vom 13.10.2026 aus dem freigegebenen Quellenstand nach Abschluss der IA- und Usability-Überarbeitung. Institutionelle Verantwortung der PUK und unabhängige Prüfung der Änderungen sind im Prüfbericht des Quellen-Repositorys dokumentiert; der Export mit `--production` ist ohne blockierende Befunde durchgelaufen.
