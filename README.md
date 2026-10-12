# Borderline – Orientierung für Angehörige

Psychoedukative Website der Fachstelle Angehörigenarbeit, Psychiatrische Universitätsklinik Zürich, nach dem PUK Website-Profil 2026.10.1. Kontakt: angehoerigenarbeit@pukzh.ch

## Inhalt dieses Repositorys

Hier liegt nur die veröffentlichbare Website: 17 Seiten, `css/site.css`, Schriften, `js/interaktion.js`, `assets/`, `_headers`, `_redirects` und `sitemap.xml`. Netlify liefert den Stamm ohne Build aus (`netlify.toml`).

- **Quelle:** Repository `puk-website-profil`, Ordner `templates/website/borderline-angehoerige`. Dort stehen Inhalte, Visualisierungsplan, Prüfbericht und Abgleich. Hier wird nichts von Hand geändert.
- **Entstehung:** im Ordner der Website `node tools/export.mjs <ziel>`, für die Veröffentlichung mit `--production`. Danach `_redirects` von Hand in den Zielordner kopieren (UMBAUPLAN, Abschnitt 7), weil `tools/export.mjs` die Datei nicht kopiert.
- **Frühere Fassung:** Die React-Fassung steht im Branch `react-archiv`.

## Stand

Etappe 3-2 des UMBAUPLAN (12.10.2026): Entwurfs-Export. Die Prüfstufen im Prüfbericht sind offen; veröffentlicht wird erst, wenn der Prüfbericht vollständig ist und der Export mit `--production` durchläuft.
