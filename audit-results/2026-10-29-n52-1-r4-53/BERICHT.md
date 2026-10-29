# N52-1 · r4-53 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag und Entscheid von Christa Egger, 29.10.2026:** «N52-1: Titelbild erst ab 75 rem zeigen». Ausgangsstand ist `main` = `bf2156e`. Das ist r4-52; die Nachprüfung r4-52 und die nachgeführten Pendenzen sind gemergt.

Der Befund stammt aus `audit-results/2026-10-29-nachpruefung-r4-52/NACHPRUEFUNG.md` (N52-1).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Rollenwechsel:** Diese Sitzung hat die Nachprüfung r4-52 erstellt und baut jetzt r4-53. Für r4-53 ist sie damit nicht unabhängig. Eine Nachprüfung von r4-53 muss eine andere Sitzung machen.

## Befund

Ab 62 rem (992 px) stand das breite Titelbild rechts neben Titel und Einleitung. Titel und Einleitung umbrachen dadurch auf mehr Zeilen, und die Sicherheitskarte rückte zwischen 992 px und etwa 1160 px aus dem ersten Bildschirm. Bei 1024 × 768 begann sie bei 842 statt 724 px (r4-48).

## Umsetzung

`authoring/css/site.css`, Block `.bl-titelbild`:

- **Ausblenden:** `@media (max-width:74.99rem){.bl-titelbild{display:none}}` statt `61.99rem`.
- **Zweispaltenlage des Einstiegs:** `@media (min-width:75rem)` statt `62rem`. Ohne diese zweite Änderung stünde der Einstieg zwischen 62 und 75 rem in einem Raster mit leerer rechter Spalte.
- **Kommentare:** nachgeführt.

Das Titelbild ist sonst unverändert: dieselbe Grösse ab 75 rem, für Screenreader verborgen, bei erzwungenen Farben und im Druck ausgeblendet.

`authoring/tools/layouttest.cjs`: neue Bedienprobe «safety card starts in first screen 1024x768», jetzt 27 statt 26. Sie wartet auf `document.fonts.ready` und nimmt damit einen Teil von N52-3 auf. Die bestehende Probe bei 390 × 844 ist unverändert.

Build-Kennung r4-53 in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`.

Kein Wortlaut geändert. Fragmente, Suche, Akuthinweise und Sprungziele sind unverändert.

## Messung (Chromium, Startseite, Sicherheitskarte `.bl-paths-cards li:first-child`)

| Fenster | Schrift | r4-52 | **r4-53** | Titelbild r4-53 |
|---|---|---|---|---|
| 390 × 844 | 100 % | 783–990, angeschnitten | 783–990, angeschnitten | aus |
| 768 × 1024 | 100 % | 743–915, ganz sichtbar | 743–915, ganz sichtbar | aus |
| 1024 × 768 | 100 % | 842–959, nicht sichtbar | **724–841, angeschnitten** | aus |
| 1112 × 834 | 100 % | 844–961, nicht sichtbar | **726–843, angeschnitten** | aus |
| 1150 × 800 | 100 % | 811–928, nicht sichtbar | **727–844, angeschnitten** | aus |
| 1199 × 800 | 100 % | 728–845, angeschnitten | 728–845, angeschnitten | aus |
| 1200 × 800 | 100 % | 729–845, angeschnitten | 729–845, angeschnitten | 480 × 288 |
| 1280 × 800 | 100 % | 686–803, angeschnitten | 686–803, angeschnitten | 480 × 288 |
| 1440 × 900 | 100 % | 690–806, ganz sichtbar | 690–806, ganz sichtbar | 480 × 288 |
| 1024 × 768 | 200 % | 1218–1477 | 1218–1477 | aus |
| 2400 × 1000 | 200 % | 1136–1308 | 1136–1308 | 960 × 576 |

- Die Schwelle liegt bei 75 rem: bei Standardschrift zwischen 1199 und 1200 px, bei 200 % Schrift bei 2400 px.
- Bei 1024 × 768 steht die Karte wieder wie in r4-48 (724 px, vor dem Titelbild).
- Ab 1200 px ist alles wie in r4-52.
- Kein waagrechtes Scrollen in allen gemessenen Zuständen.

Fotos: `startseite-1024x768-r4-52.png` und `startseite-1024x768-r4-53.png`. Auf r4-53 beginnt unten die gelbe Sicherheitskarte.

**Die neue Probe greift:** gegen die Site von r4-52 meldet sie `safety card starts in first screen 1024x768`, gegen r4-53 ist sie erfüllt.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium und Playwright über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien byte-gleich mit `site/` |
| Selbsttest | 88/88 |
| Suchtest | 216 von 216 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c); beide Proben zur Sicherheitskarte erfüllt |
| axe-core 4.14.0 | 0 Verstösse auf 24 Seiten bei 390 und 1280 px (48 Läufe), dazu 0 Verstösse mit 200 % Schrift und offenem Menü bei 320 und 1440 px (48 Läufe) |
| Wortlaut | Fragmente und Seiten von r4-52 und r4-53 ohne Tags und `&shy;` verglichen: 48 Dateien, 0 Abweichungen; je 6 × `data-responsibility-inline`, `tel:144`, `tel:117` |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.

**Weiter offen:** N52-2 (gering, Gate), der Rest von N52-3 (gering: 768 × 1024 mit «ganz sichtbar» als Probe), N49-2, N51-2 und die Prüfung mit echtem Screenreader.
