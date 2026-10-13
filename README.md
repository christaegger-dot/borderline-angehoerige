# borderline-angehoerige – eigenständige Website-Quellen

Die Website kann **direkt in diesem Repository** bearbeitet werden. Das PUK-Website-Profil ist weiterhin gemeinsame Gestaltungs- und Qualitätsreferenz, aber **nicht mehr** der Bearbeitungsort für die Inhalte dieser Website.

## Struktur
- `authoring/content/*.html`: bearbeitbare Inhaltsfragmente (eine Datei pro Seite).
- `authoring/site.config.json`: Navigation, Seitentitel, Metadaten, Freigabe- und Zuständigkeitsangaben.
- `authoring/css/site.css`: eigenständig gepflegte Website-Styles.
- `authoring/js/interaktion.js`: eigenständige JavaScript-Interaktionen.
- `authoring/assets/` und `authoring/fonts/`: lokale Grafik- und Schriftressourcen.
- `authoring/tools/`: Seitenrenderer mit übernommenem Prüfgate.
- `authoring/PRUEFBERICHT.md`: historischer Quell-Prüfbericht; er ersetzt **keine** erneute Freigabe fachlicher Änderungen.
- `site/`: versionierter, von Netlify veröffentlichter Build. HTML dort nicht von Hand bearbeiten.

## Prüfen und Bauen
Voraussetzung: Node.js ab Version 18, keine Installation weiterer Pakete nötig.

```bash
node authoring/tools/build.mjs --production --verify-site
node authoring/tools/build.mjs --production --out=dist/site
# Nach redaktioneller Prüfung und ausdrücklicher Freigabe:
node authoring/tools/build.mjs --production --out=site --write-site
```

Der erste Befehl baut nach `dist/site` und vergleicht **alle erzeugten Dateien byteweise** mit dem eingecheckten Stand in `site/`. Der zweite erstellt eine unabhängige Vorschau. Der letzte schreibt `site/` für einen separaten, kontrollierten Pull Request neu. Bei Inhaltsänderungen vor Aktualisierung von `site/` muss die Paritätsprüfung erwartungsgemäss fehlschlagen.

Die Netlify-Konfiguration bleibt unverändert: Der veröffentlichte Ordner ist weiterhin `site/`, und ein Build erfolgt nicht automatisch. Erst der nach Prüfung gemergte Export wird veröffentlicht. `main` und Produktionskonfiguration werden durch die Migration nicht verändert.

## Qualitätsprozess
1. Änderungen ausschliesslich in `authoring/` vornehmen.
2. Erneut bauen, Gate und Preview prüfen.
3. Fachlich sensible Aussagen und Grafiken von zuständigen Personen freigeben lassen; historischen Prüfbericht um aktuelle Nachweise ergänzen.
4. Freigegebenen Stand nach `site/` bauen, generierte Änderungen überprüfen.
5. Paritätsprüfung ausführen; erst danach Pull Request und Veröffentlichung.
6. Keine stillen Änderungen am Designprofil als Nebenwirkung.

**Provenienz:** Übernommen aus `christaegger-dot/puk-website-profil`, Quell-Commit [`4a6764a`](https://github.com/christaegger-dot/puk-website-profil/commit/4a6764ac2bad6c9538a1340fc0a2d691d22dd5df), Ordner `templates/website/borderline-angehoerige/`. Das veröffentlichte Release diente als Ausgangsstand. Ursprüngliche Berichte und Freigaben bleiben versionsgebunden.

**Migration:** Ausschliesslich auf dem Branch `refactor/standalone-authoring-2026-10-13` vorbereitet. Diese Dateien stellen selbst keine neue fachliche oder technische Freigabe dar.
