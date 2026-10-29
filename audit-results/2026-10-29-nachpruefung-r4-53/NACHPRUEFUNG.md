# Nachprüfung r4-53 · 29.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger (Fachstelle Angehörigenarbeit, PUK Zürich), 29.10.2026: «Nachprüfung r4-53 starten».
- **Gegenstand:** alle Änderungen zwischen `d8d78f5` (r4-52, Merge PR #741) und `2324026` (r4-53, Merge PR #745).
  - **Geändert in `authoring/`** (laut `git diff --stat`): `css/site.css` (zwei Medienabfragen, Kommentare), `tools/layouttest.cjs` (eine neue Bedienprobe), `tools/contract.js` (nur `BUILD`) und `site.config.json` (Build-Kennung, Verzichtsvermerk).
  - **Nicht geändert:** alle Fragmente in `authoring/content/`, `interaktion.js`, `suche-ersttreffer.tsv`, `selftest.mjs`, `sprachtest.mjs` und `suchtest.mjs`. `git diff --stat d8d78f5 2324026 -- authoring/content authoring/tests authoring/js authoring/tools/selftest.mjs authoring/tools/sprachtest.mjs authoring/tools/suchtest.mjs` ist leer.
  - **Heutiger Stand:** Zwischen `2324026` und dem heutigen `main` ist an `authoring/` und `site/` nichts geändert. Die Live-Site liefert `data-puk-site-build="r4-53"` aus (Abfrage mit `curl`, keine Prüfstufe).
  - **Selbstbericht:** `audit-results/2026-10-29-n52-1-r4-53/BERICHT.md`. Er setzt N52-1 aus `audit-results/2026-10-29-nachpruefung-r4-52/NACHPRUEFUNG.md` um, nach dem Entscheid von Christa Egger «N52-1: Titelbild erst ab 75 rem zeigen».
- **Wer prüft:** eine Claude-Sitzung, die an r4-53 **nicht gebaut** hat. Sie hat aber r4-52 gebaut, auf dem r4-53 aufsetzt: Die Schwelle 62 rem, die r4-53 ändert, stammt aus r4-52. Das ist hier offengelegt. Die Sitzung ändert keine Inhalte und keinen Code und committet nur diesen Ordner.
- **Umgebung:**
  - Node 22.22.0, Chromium, Playwright über `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`.
  - axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.
  - Die Tests laufen in eigenen Arbeitsbäumen (`git worktree`) von `2324026` und `d8d78f5` ausserhalb des Repositorys. `site/` im Repository wurde nicht beschrieben.
  - Schrift 200 % wird über `--blink-settings=defaultFontSize=32,defaultFixedFontSize=26` eingestellt.

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Befunde

Keine neuen Befunde.

Aus der Nachprüfung r4-52 bleibt **N52-2** offen (gering, Gate merkt nicht, wenn Zeile und Menüeinträge der Direkteinstiege zugleich fehlen). r4-53 behandelt ihn nicht, und der Bericht r4-53 nennt ihn unter «Weiter offen». Er ist unverändert gering.

## Bestätigt, mit Beleg

### N52-1 · Schwelle für das Titelbild

- **CSS:** `authoring/css/site.css:946` `@media (max-width:74.99rem){.bl-titelbild{display:none}}` statt `61.99rem`. `site.css:956` `@media (min-width:75rem)` für die Zweispaltenlage des Einstiegs statt `62rem`. Sonst bezieht sich in `site.css` keine Regel des Titelbilds auf 62 rem. `grep 62rem` findet nur noch die zwei Containerabfragen einer Abbildung (`site.css:1731`, `:1736`).
- **Messung** (Startseite, Sicherheitskarte `.bl-paths-cards li:first-child`, nach `document.fonts.ready`, r4-52 gegen r4-53):

| Fenster | Schrift | r4-52 | r4-53 | Titelbild r4-53 | Einstieg r4-53 |
|---|---|---|---|---|---|
| 390 × 844 | 100 % | 783–990, angeschnitten | 783–990, angeschnitten | aus | einspaltig |
| 768 × 1024 | 100 % | 743–915, ganz | 743–915, ganz | aus | einspaltig |
| 992 × 744 | 100 % | 842–958, **nicht sichtbar** | 724–840, angeschnitten | aus | einspaltig, Einleitung 720 px |
| 1024 × 768 | 100 % | 842–959, **nicht sichtbar** | 724–841, angeschnitten | aus | einspaltig |
| 1080 × 810 | 100 % | 844–960, **nicht sichtbar** | 726–842, angeschnitten | aus | einspaltig |
| 1112 × 834 | 100 % | 844–961, **nicht sichtbar** | 726–843, angeschnitten | aus | einspaltig |
| 1150 × 800 | 100 % | 811–928, **nicht sichtbar** | 727–844, angeschnitten | aus | einspaltig |
| 1180 × 820 | 100 % | 728–844, angeschnitten | 728–844, angeschnitten | aus | einspaltig |
| 1199 × 800 | 100 % | 728–845, angeschnitten | 728–845, angeschnitten | aus | einspaltig |
| 1200 × 800 | 100 % | 729–845, angeschnitten | 729–845, angeschnitten | 480 × 288 | zweispaltig |
| 1280 × 800 | 100 % | 686–803, angeschnitten | gleich | 480 × 288 | zweispaltig |
| 1366 × 768 | 100 % | 688–805, angeschnitten | gleich | 480 × 288 | zweispaltig |
| 1440 × 900 | 100 % | 690–806, ganz | gleich | 480 × 288 | zweispaltig |
| 1920 × 1080 | 100 % | 690–806, ganz | gleich | 480 × 288 | zweispaltig |
| 1024 × 768 | 200 % | 1218–1477 | 1218–1477 | aus | einspaltig |
| 2399 × 1000 | 200 % | 1136–1308, Bild 960 × 576 | 1133–1304, Bild aus | aus | einspaltig |
| 2400 × 1000 | 200 % | 1136–1308 | 1136–1308 | 960 × 576 | zweispaltig |

  - Zwischen 62 und 75 rem gibt es keine leere rechte Spalte. Der Einstieg ist einspaltig, und die Einleitung steht in voller Lesebreite (720 px).
  - Die Schwelle liegt bei Standardschrift zwischen 1199 und 1200 px, bei 200 % Schrift zwischen 2399 und 2400 px.
  - In keinem gemessenen Zustand gibt es waagrechtes Scrollen (`scrollWidth` gleich Fensterbreite).
  - Die Werte stimmen mit der Tabelle im Bericht r4-53 überein.
- **Neue Bedienprobe** «safety card starts in first screen 1024x768» (`layouttest.cjs:46`):
  - Sie wartet auf `document.fonts.ready` und vergleicht den oberen Rand der Karte mit 768 px.
  - Gegen r4-53 ist sie erfüllt.
  - Gegen r4-52 meldet sie einen Fehler. Dafür lief der Layouttest von r4-53 im Arbeitsbaum von `d8d78f5` und meldete «2 Abweichungen. tension core exceeds 1800px / safety card starts in first screen 1024x768».
  - Die Probe ist damit wirksam und verschärft den Test. Die bestehende Probe bei 390 × 844 ist unverändert.
- **Barrierefreiheit:** axe-core meldet 0 Verstösse in 144 Läufen:
  - 24 Seiten × 390 und 1280 px
  - 24 Seiten × 1024 und 1200 px, also beidseits der neuen Schwelle
  - 24 Seiten mit 200 % Schrift und offenem Menü bei 320 und 1440 px

### Unverändert

- **Wortlaut:** Kein Fragment ist geändert, siehe leerer Diff oben. Die gebaute `site/index.html` enthält in beiden Ständen dieselbe Titelbild-Fassung (`bl-titelbild__breit` je 1 ×).
- **Akuthinweise:** `tel:144` steht in beiden Ständen auf 6 Seiten.
- **Suche, Menü, Gate-Regeln:** unverändert. `contract.js` ändert nur `BUILD`.

### Tests selbst ausgeführt (Arbeitsbaum `2324026`)

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`) · Ziel dist/site, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/, Exit 0 |
| `node authoring/tools/selftest.mjs` | Selbsttest: 88/88 bestanden, Exit 0 |
| `node authoring/tools/suchtest.mjs dist/site` | 216 von 216 Erwartungen · JS-Fehler 0, Exit 0 |
| `node authoring/tools/sprachtest.mjs` | 73 Prüfungen bestanden · JS-Fehler 0, Exit 0 |
| `node authoring/tools/layouttest.cjs` | 240 Seitenzustände, 27 Bedienproben, 1 Abweichung «tension core exceeds 1800px» (bekannte Ausnahme B2c), Exit 1 wie seit r4-42. Beide Proben zur Sicherheitskarte erfüllt |

Die Kennzahlen des Berichts r4-53 stimmen mit meinen Messungen überein: 27 Bedienproben, Selbsttest 88, Parität 35, Kartenlage bei 1024, 1112 und 1150 px sowie die Schwelle 1199/1200 px.

## Hinweise ohne Befund

- **Bei 200 % Schrift** liegt die Sicherheitskarte auf keinem gemessenen Bildschirm im ersten Bildschirm (1024 × 768: 1218 px, 1440 × 900: 1030 px). Das war schon vor r4-49 so und hängt mit Kopf, Titel und Einleitung zusammen, nicht mit dem Titelbild. Eine Probe dafür gibt es nicht.
- **Unsichtbare Band-Fassung:** Die Band-Fassung des Titelbilds (`bl-titelbild__band`) steht seit r4-52 unsichtbar im Markup der Startseite. Sie kann bei der nächsten Arbeit an der Startseite wegfallen. Das ist schon im Bericht r4-52 vermerkt.

## Nicht prüfbar oder nicht geprüft

- **Echte Screenreader:** im Container nicht vorhanden. Die Anleitung für VoiceOver steht in `audit-results/2026-10-29-nachpruefung-r4-43-r4-46/NACHPRUEFUNG.md`.
- **Browser und Geräte:** Safari und Firefox, reale Geräte und Tablets in Hoch- und Querformat.
- **Druck und erzwungene Farben:** nicht erneut geprüft. r4-53 ändert dort nichts, das Titelbild ist dort schon ausgeblendet.

## Empfehlung

**Keine Nachbesserung nötig.**

r4-53 behebt N52-1 wie entschieden. Zwischen 992 und 1199 px beginnt die Sicherheitskarte wieder im ersten Bildschirm, und ab 1200 px ist alles wie vorher. Die neue Bedienprobe greift. Wortlaut, Sicherheitslogik und Suche sind unverändert, und axe meldet keinen Verstoss. Offen bleibt nur N52-2 aus der Vorprüfung, gering.
