# Nachprüfung r4-55 und r4-56 · 30.10.2026

## Auftrag, Stand, Prüfende

- **Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-55 und r4-56 starten».
- **Gegenstand:** [PR #753](https://github.com/christaegger-dot/borderline-angehoerige/pull/753), gemergt als `3780ee5`. Verglichen wird mit dessen erstem Elternteil `9c3521e`. Das ist `main` vor dem Merge; an `authoring/` und `site/` ist es gleich r4-54 (`060aa8f`), `git diff --stat 060aa8f 9c3521e -- authoring site` ist leer.
  - **r4-55:** Absenderzeile im Kopf 16 statt 15 px.
  - **r4-56:** sehr dezenter Footer (keine Fläche, Haarlinie, 16 px, grau).
- **Selbstberichte:** `audit-results/2026-10-29-absender-r4-55/BERICHT.md` und `audit-results/2026-10-29-footer-r4-56/BERICHT.md`.
- **Heutiger Stand:** Seit `3780ee5` sind CSS, Fragmente und Skripte unverändert. `git diff --stat 3780ee5 b6777ec -- authoring/css site/css authoring/content` ist leer, `b6777ec` ist `main` mit r4-60. In `site/index.html` ändert sich seither nur die Build-Kennung. Geprüft ist also auch der veröffentlichte Footer.
- **Prüfende:** eine Claude-Sitzung, die r4-55 und r4-56 nicht gebaut hat. Sie hat die zweite Nachprüfung r4-53 erstellt und die Pendenzen dazu nachgeführt. Inhalte und Code hat sie nie geändert. Sie committet nur diesen Ordner.
- **Umgebung:**
  - Node 22.22.0, Chromium mit Playwright (global, `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`).
  - axe-core 4.14.0 in einem eigenen Ordner ausserhalb des Repositorys, per `page.addScriptTag` geladen.
  - Arbeitsbäume ausserhalb des Repositorys: `9c3521e` (r4-54) und `3780ee5` (r4-56).
  - `site/` wurde nie beschrieben.
- **Beilagen:** Die Prüfskripte liegen in `skripte/`. Die Rohmessung liegt in `messung.json.gz` (480 Zustände), die Auswertung in `auswertung.txt`, dazu acht Fotos.

## Ergebnis in Kürze

r4-55 und r4-56 sind so umgesetzt, wie die Selbstberichte sagen. Alle nachgerechneten Kennzahlen stimmen auf den Pixel. Kein Wortlaut, keine Suche, kein Akuthinweis und kein Sprungziel ist verändert. Die Tests sind gleichwertig, keiner ist abgeschwächt.

| Befund | Schweregrad | Kurz |
|---|---|---|
| N56-1 | gering | Die zwei Überschriften im Footer sehen aus wie der Text darunter. Der Pflichthinweis «Diese Website ersetzt keine …» geht ohne Abstand in den Namen der Klinik über |

**Empfehlung: «keine Nachbesserung nötig».** N56-1 ist eine Gestaltungsfrage innerhalb des Entscheids «16 px, grau». Er kann bei einer nächsten Arbeit am Footer mitlaufen.

## Befund

### N56-1 · gering · Überschriften und Hinweis im Footer optisch nicht abgesetzt

**Ort:** `authoring/css/site.css:794–795`

```
.puk-web-footer__heading{margin:0;color:var(--tinte-leise);font-size:1rem;line-height:1.5;font-weight:var(--fw-regular);…}
.puk-web-footer__copy{max-width:var(--lesebreite);margin:0;color:var(--tinte-leise);font-size:1rem}
```

**Beleg** (`skripte/messung.cjs`, Startseite 1440 px, Standardschrift):

| | r4-54 | r4-56 |
|---|---|---|
| `h2` «Kontakt», «Fachstelle Angehörigenarbeit» | 17 px, 500, `rgb(34, 34, 34)` | **16 px, 400, `rgb(100, 100, 100)`** |
| erster Absatz darunter | 19 px, 400, `rgb(34, 34, 34)` | **16 px, 400, `rgb(100, 100, 100)`** |
| Abstand zwischen den Absätzen | `--space-2` bzw. `--space-4` | `0` |

- Überschrift und Text sind in Grösse, Gewicht und Farbe gleich. Abstand dazwischen gibt es keinen.
- In `vergleich-footer-1440.png` und `vergleich-footer-390.png` (oben bzw. links r4-54) liest sich die rechte Spalte als ein Block aus drei Zeilen: «Fachstelle Angehörigenarbeit / Psychiatrische Universitätsklinik Zürich / Diese Website ersetzt keine individuelle Abklärung, Beratung oder Behandlung.»
- Der Hinweis ist nach Profil auf jeder Seite Pflicht. Er stand vorher mit Abstand und in `tinte` da und ist jetzt optisch Teil der Absenderangabe.
- Für Screenreader ändert sich nichts. Die `h2` und die Regionen «Kontakt» und «Fachstelle Angehörigenarbeit» bleiben, das HTML ist unverändert. Ein WCAG-Verstoss ist das nicht: 1.3.1 verlangt, dass sichtbare Struktur auch im Code steht, nicht umgekehrt.
- Gedeckt ist es vom Entscheid «16 px, grau». Die Tabelle im Selbstbericht r4-56 nennt «16 px Regular, `tinte-leise`» für die Überschriften. Den fehlenden Abstand vor dem Hinweis nennt sie nicht.

**Vorschlag** (Entscheid Christa Egger, nicht selbst behoben): Die Gruppen ohne grössere Schrift abheben, etwa so:
- Überschriften in `fw-medium` (oder `tinte`), weiterhin 16 px.
- Vor `.puk-web-footer__boundary` wieder etwas Abstand, zum Beispiel `margin-top:var(--space-2)`.

So bleibt der Footer dezent, und Überschrift, Absender und Hinweis sind trotzdem auseinanderzuhalten. Nach einer Änderung die Footerhöhe nachmessen.

## Bestätigt

### 1 · Diff vollständig

`git diff --stat 9c3521e 3780ee5` ergibt 46 Dateien, +9483/−112. Davon sind die meisten Beilagen der Selbstberichte (Messwerte und Fotos). In `authoring/` und `site/`:

| Datei | Änderung |
|---|---|
| `authoring/css/site.css` | `.puk-site-sender` hat `font-size:1rem` statt `.9375rem` (`:656`). Der Footer-Block ist ersetzt (`:787–802`): keine Fläche, `border-top:1px solid var(--linie)`, Abstände 24/32 px, alles 16 px und `tinte-leise`, Links unterstrichen. Entfernt sind die 19-px-Regel, der Pfeil und das Medium-Gewicht von «Kontakt und Beratungsangebot» sowie die Trennlinie vor «Stand» |
| `authoring/DARSTELLUNGSREGELN.md` | Satz zum dezenten Footer, mit Auftrag und Entscheid |
| `authoring/tools/contract.js` | nur `const BUILD = 'r4-56';` |
| `authoring/site.config.json` | Build-Kennung, `pendingScope`, `appliedTo` |
| `site/css/site.css` | dieselben geänderten Zeilen wie `authoring/css/site.css` (`diff` leer) |
| `site/*.html` (24) | nur `data-puk-site-build`, `site.css?v=` und `interaktion.js?v=`. Zeilen ohne Build-Kennung: `0` |

**Nicht geändert:**
- Fragmente, `interaktion.js`, `suche-ersttreffer.tsv` und `build.mjs`.
- Die Tests `selftest.mjs`, `layouttest.cjs`, `suchtest.mjs` und `sprachtest.mjs`.

`git diff --stat 9c3521e 3780ee5 -- authoring/content authoring/js authoring/tests authoring/tools/selftest.mjs authoring/tools/layouttest.cjs authoring/tools/suchtest.mjs authoring/tools/sprachtest.mjs authoring/tools/build.mjs` ist leer.

**Wortlaut, Akuthinweise, Sprungziele** (`skripte/wortlaut.mjs`, r4-54 gegen r4-56):

```
authoring/tests/suche-ersttreffer.tsv d69788c1eb87 d69788c1eb87 gleich
authoring/js/interaktion.js f2102a65e8a9 f2102a65e8a9 gleich
Dateien verglichen: 48 Abweichungen: 0
site/ gesamt (B): {"resp":6,"t144":6,"t117":6}
```

### 2 · Messung, r4-54 gegen r4-56

`skripte/messung.cjs` misst alle 24 Seiten bei 320, 390, 768, 1100 und 1440 px, je mit Standardschrift und mit 200 % Schrift (`--blink-settings=defaultFontSize=32,defaultFixedFontSize=26`). Das sind 240 Zustände je Stand. Auszug aus `auswertung.txt`:

| Zustand | Footer r4-54 → r4-56 | Kopf r4-54 → r4-56 | Absenderzeile | kleinster Kontrast im Footer | Schriften im Footer | kleinste Linkhöhe | Überlauf |
|---|---|---|---|---|---|---|---|
| 320 | 622 → **489** | 169–213 → **195–239** | 15 → 16 px, Name 1 → **2 Zeilen** | 5,52 → 5,92 | 16/17/19 → 16 | 44 | 0 |
| 390 | 574 → **441** | 147–191 → 148–192 | 15 → 16 px | 5,52 → 5,92 | 16/17/19 → 16 | 44 | 0 |
| 768 | 401 → 309 | 147–191 → 148–192 | 15 → 16 px | 5,52 → 5,92 | 16/17/19 → 16 | 44 | 0 |
| 1100 | 357 → 241 | 130–174 → 130–174 | 15 → 16 px | 5,52 → 5,92 | 16/17/19 → 16 | 44 | 0 |
| 1440 | 333 → **217** | 138 → 138 | 15 → 16 px | 5,52 → 5,92 | 16/17/19 → 16 | 44 | 0 |
| 320, 200 % | 1575 → 1321 | 418 → **435** | 30 → 32 px | 5,52 → 5,92 | 32/34/38 → 32 | 48 | 0 |
| 390, 200 % | 1288 → 1081 | 418 → 435 | 30 → 32 px | 5,52 → 5,92 | 32/34/38 → 32 | 48 | 0 |
| 768, 200 % | 790 → 649 | 288–339 → 296–347 | 30 → 32 px | 5,52 → 5,92 | 32/34/38 → 32 | 48 | 0 |
| 1440, 200 % | 637 → 457 | 245–296 → 250–301 | 30 → 32 px | 5,52 → 5,92 | 32/34/38 → 32 | 48 | 0 |

- **Selbstberichte:** Alle Werte in den Tabellen von r4-55 (Kopf) und r4-56 (Footer) stimmen. Ebenso der E-Mail-Link mit 44 × 228 statt 44 × 213 px, «der PUK» auf zweiter Zeile bei 320 px (`vergleich-kopf-320.png`) und der Kontrast 5,92 : 1 (`tinte-leise`, `rgb(100, 100, 100)` auf Weiss).
- **Waagrechtes Scrollen:** keines. In keinem der 480 Zustände ragt etwas in Kopf oder Footer über den Rand.
- **404-Seite:** Der Footer hat dieselben Masse und sechs Links, über den Webserver geladen (absolute Pfade).
- **Fläche:** In r4-56 ist der Footer transparent. Die Haarlinie hat 1,21 : 1 (`rgb(233, 233, 233)`). Das ist zulässig, weil die Linie nur schmückt und nicht zur Bedienung nötig ist; sie ist auf der ganzen Seite sichtbar (`seitenende-grenzen-1440-r4-56.png`).
- **Links:** Alle sechs Footer-Links sind grau und unterstrichen. Damit sind sie nicht nur an der Farbe zu erkennen (WCAG 1.4.1). Die Zielfläche ist mindestens 44 px, bei 200 % Schrift 48 px.

### 3 · Bedienung, erzwungene Farben, Druck

Geprüft mit `skripte/fokus.cjs` und `skripte/seitenende.cjs` auf der Seite «Grenzen setzen».

- **Fokus:** Alle sechs Footer-Links bekommen bei Tastaturbedienung `:focus-visible`, mit `box-shadow: rgb(255,255,255) 0 0 0 2px, rgb(60,100,255) 0 0 0 4px`. Das zeigt `footer-1440-r4-56-fokus.png`, bei 390 und 1440 px.
- **Hover:** Nach dem Übergang (0,12 s) wechselt die Farbe zu `rgb(34, 34, 34)`, die Unterstreichung wird 2 px dick.
- **Erzwungene Farben:** Die Linie ist `1px solid rgb(0, 0, 0)`. Die Links sind `rgb(0, 0, 159)` und unterstrichen (`footer-390-r4-56-erzwungene-farben.png`).
- **Druck:** Der Footer wird gedruckt (`display:block`), grau auf weiss, mit Linie, 204 statt 315 px hoch.

### 4 · Barrierefreiheit

axe-core 4.14.0 (`skripte/axe.cjs`, Regeln `wcag2a` bis `wcag22aa` und `best-practice`) auf der Site von `3780ee5`:

```
100 % 390px: 24 Läufe, 0 Verstösse
100 % 1280px: 24 Läufe, 0 Verstösse
200 % 320px Menü offen 24/24: 24 Läufe, 0 Verstösse
200 % 1440px Menü offen 24/24: 24 Läufe, 0 Verstösse
```

Der Barrierefreiheitsbaum ändert sich nicht, weil das HTML ausser der Build-Kennung byte-gleich ist. Footer-Region (`contentinfo`), Überschriften und Navigation «Informationen zur Website» bleiben wie in r4-54.

### 5 · Tests selbst ausgeführt (Arbeitsbaum `3780ee5`)

| Befehl | Ausgabe |
|---|---|
| `node authoring/tools/build.mjs --production` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site` |
| `node authoring/tools/build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `node authoring/tools/selftest.mjs` | `Selbsttest: 89/89 bestanden` |
| `node authoring/tools/suchtest.mjs dist/site` | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| `node authoring/tools/sprachtest.mjs` | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| `node authoring/tools/layouttest.cjs` | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` `tension core exceeds 1800px` (bekannte Ausnahme B2c) |

**Tests gleichwertig:** Kein Test ist geändert. Der Selbsttest zählt 89 Fälle wie in r4-54.

### 6 · Profil und Entscheide

- **Absenderzeile:** Sie erfüllt jetzt «Nichts unter 16 px». Wortlaut und Aufbau bleiben («Fachstelle Angehörigenarbeit der PUK», «Beratung:», `mailto:`-Link). Nach Profil 2026.10.2 (P-3) bräuchte der E-Mail-Link keine 44 px; er hat sie trotzdem.
- **Footer:** Er weicht in drei Punkten bewusst ab. Diese Abweichungen sind in Pendenzen, Selbstbericht und `DARSTELLUNGSREGELN.md` mit dem Entscheid von Christa Egger («16 px, grau») belegt:
  - Leitlinie 03 sieht Kontakttexte in Lesegrösse vor.
  - Das Gestaltungssystem nennt Blau als Linkfarbe.
  - «Kontakt und Beratungsangebot» hat keinen Pfeil mehr.
- **Merge vor abgeschlossenem Codex-Review:** In der Pendenzendatei ist bereits vermerkt, dass die Regeln R28-O01 und R29-P20 nicht eingehalten wurden. Nicht selbst nachgeprüft.

## Hinweise ohne Befund

- **Keine automatische Probe für den Footer:** Weder `layouttest.cjs` noch das Gate messen Zielflächen, Schriftgrösse oder Kontrast im Footer (`grep -c footer authoring/tools/layouttest.cjs` → `0`). Die Werte oben beruhen auf den Messskripten der Selbstberichte und dieser Prüfung. Eine Probe «Footer-Links ≥ 44 px, Kontrast ≥ 4,5 : 1» würde eine spätere Regression melden.
- **Texte unter 16 px** ausserhalb von Absenderzeile und Footer (13 und 15 px in Abbildungen, Legenden und Direkteinstiegen unter 22,5 rem) bestehen weiter. Die Entscheidung darüber ist in der Pendenzendatei offen. r4-55 und r4-56 verändern daran nichts.
- **Live-Site** (Abfrage mit `curl`, 30.10.2026, 07:25 UTC, keine Prüfstufe): Sie liefert `data-puk-site-build="r4-60"`. `site.css?v=r4-60` ist byte-gleich mit `site/css/site.css` auf `main` und enthält die Footer- und Absenderregeln von r4-56 unverändert.

## Nicht prüfbar

- Echter Screenreader, Safari und Firefox, reale Geräte.
- Druck auf Papier (nur Chromium-Druckansicht und PDF).
- Ob die Fachstelle den Footer als ausreichend auffindbar für «Kontakt und Beratungsangebot» beurteilt. Das ist eine fachliche Einschätzung.
- CI-Lauf `build-and-compare` auf `c69e24f`: nicht selbst nachgeprüft. Die Pendenzendatei nennt ihn grün.

## Empfehlung

**«keine Nachbesserung nötig».**

- r4-55 und r4-56 sind wie beauftragt und entschieden umgesetzt. Die Messwerte stimmen.
- Kontrast, Zielflächen, Fokus, erzwungene Farben und Druck sind in Ordnung. axe-core meldet 0 Verstösse.
- N56-1 (gering) betrifft nur, wie Überschriften und Hinweis im Footer voneinander abgehoben sind. Er kann bei einer nächsten Arbeit am Footer mitlaufen.
