# Zweite, unabhängige Nachprüfung r4-53 · 29.10.2026

> **Einordnung (nachgetragen am 29.10.2026 im Auftrag von Christa Egger: «als zweite unabhängige Nachprüfung kennzeichnen»):**
> Dies ist die **zweite** Nachprüfung von r4-53. Sie ergänzt die erste, [`NACHPRUEFUNG.md`](NACHPRUEFUNG.md) in diesem Ordner ([PR #747](https://github.com/christaegger-dot/borderline-angehoerige/pull/747), `9e2c570`, gemergt als `0667a69`). Sie ersetzt die erste nicht.
>
> - **Unabhängig:** Beide Prüfungen liefen getrennt; diese hat die erste beim Prüfen nicht gekannt. Die prüfende Sitzung hat weder r4-52 noch r4-53 gebaut. Die erste Nachprüfung stammt von der Sitzung, die r4-52 gebaut hat; sie legt das selbst offen.
> - **Übereinstimmung:** Beide kommen zur Empfehlung «keine Nachbesserung nötig». Wo beide dasselbe gemessen haben (z. B. 1024 × 768: r4-52 842–959, r4-53 724–841 px; Selbsttest 88/88; Suchtest 216/216; axe 0 Verstösse), stimmen die Werte überein.
> - **Ergänzung:** Diese Prüfung meldet zusätzlich N53-1 (gering). N53-2 deckt sich mit dem «Hinweis ohne Befund» der ersten Nachprüfung zur unsichtbaren Band-Fassung (siehe Berichtigung bei N53-2).
> - **Dateiname:** Beim Abgleich mit `main` (Merge `eba1297`) wurde diese Datei von `NACHPRUEFUNG.md` in `NACHPRUEFUNG-pr749.md` umbenannt. Der Befundtext ist bis auf diese Einordnung und die Berichtigung bei N53-2 unverändert.
> - **Nicht nachgeführt:** Die Befundnummern N53-1 und N53-2 stehen nur hier. In die Pendenzendatei trägt sie diese Sitzung nicht ein.

## Auftrag, Stand, Prüfende

- **Auftrag von Christa Egger, 29.10.2026:** «Nachprüfung r4-53 starten».
- **Gegenstand:** alle Änderungen von `bf2156e` (r4-52 mit nachgeführten Pendenzen) bis `2324026` (r4-53, Merge von PR #745). Geprüft ist der Stand auf `main` = `ae97997`.
  - An `authoring/` und `site/` ist `ae97997` gleich `2324026`. `git diff --quiet 2324026 ae97997 -- authoring site` endet mit 0.
  - An `authoring/` und `site/` ist `bf2156e` gleich `d8d78f5` (r4-52). `git diff --stat bf2156e d8d78f5 -- authoring site` ist leer.
- **Selbstbericht der bauenden Sitzung:** `audit-results/2026-10-29-n52-1-r4-53/BERICHT.md`.
- **Prüfende:** eine Claude-Sitzung, die an r4-53 nicht gebaut hat. Sie hat keine Inhalte und keinen Code geändert und committet nur diesen Ordner.
- **Umgebung:**
  - Node 22.22.0, Chromium mit Playwright (global, `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`).
  - axe-core 4.14.0 in einem eigenen Ordner ausserhalb des Repositorys, per `page.addScriptTag` geladen.
  - Vergleichsstände als `git worktree` ausserhalb des Repositorys: `bf2156e` (r4-52) und `2324026` (r4-53).
  - `site/` wurde nie beschrieben. `git status` war vor dem Commit bis auf diesen Ordner sauber.
- **Prüfskripte:** im Unterordner `skripte/`. Sie lesen nur und schreiben nicht ins Repository. `axe.cjs` und `aria.cjs` stammen aus der Nachprüfung r4-52; `aria.cjs` misst hier bei 1024 statt 390 px. Die Rohmessung liegt in `messung.json`.

## Ergebnis in Kürze

N52-1 ist so umgesetzt, wie der Selbstbericht sagt. Alle Kennzahlen des Selbstberichts stimmen nachgerechnet. Kein Wortlaut ist geändert. Die Tests sind verschärft, keiner ist abgeschwächt.

Es gibt zwei neue Befunde, beide gering:

| Befund | Schweregrad | Kurz |
|---|---|---|
| N53-1 | gering | Bei 1024 × 768 beginnt die Sicherheitskarte im ersten Bildschirm, ihre erste Textzeile ist aber um 12 px abgeschnitten. Die neue Probe prüft nur den oberen Kartenrand |
| N53-2 | gering | Die schmale Fassung des Titelbilds (`.bl-titelbild__band`) ist seit r4-52 in keinem Zustand mehr sichtbar. Markup, CSS und ein Kommentar sind damit toter Bestand |

**Empfehlung: «keine Nachbesserung nötig».** Beide Befunde können bei der nächsten Arbeit an der Startseite mitlaufen.

## Befunde

### N53-1 · gering · Sicherheitskarte bei 1024 × 768 nur am Rand, erste Zeile abgeschnitten

**Ort:**
- `authoring/tools/layouttest.cjs:46`, Probe `safety card starts in first screen 1024x768`. Sie verlangt nur `top < 768`.
- Startseite, `.bl-paths-cards li:first-child`.

**Beleg** (`skripte/kartenzeile.cjs`, Standardschrift, r4-53):

```
1024×768: erste Textzeile 752–780 px → abgeschnitten («Ich sorge mich um Sicherheit, Selbstgefährdung od…»)
1112×834: erste Textzeile 754–782 px → ganz lesbar
1150×800: erste Textzeile 755–783 px → ganz lesbar
```

- Die Karte selbst liegt bei 724–841 px. Im ersten Bildschirm von 768 px sind nur 44 px sichtbar: der gelbe Rand und die obere Hälfte der ersten Zeile (Foto `startseite-1024x768-r4-53.png`, unterer Rand).
- Das ist genau der Stand von r4-48. Christa Egger hat ihn als Ziel gesetzt («Titelbild erst ab 75 rem zeigen»). r4-53 erfüllt den Auftrag.
- Ein echter Browser hat bei 1024 × 768 weniger als 768 px Höhe, weil Adressleiste und Bedienleisten Platz brauchen. Auf einem iPad quer in Safari dürfte die Karte darum ganz unter dem ersten Bildschirm liegen. Auf einem realen Gerät ist das nicht geprüft.
- Die Probe bei 1024 × 768 wäre auch dann grün, wenn nur 1 px der Karte sichtbar wäre.

**Vorschlag:**
- Bei der Arbeit am Rest von N52-3 die Proben strenger fassen: Die erste Textzeile der Karte soll ganz im ersten Bildschirm liegen, nicht nur der obere Kartenrand.
- Ob die Karte bei 1024 × 768 höher rücken soll, entscheidet Christa Egger. Möglich wäre etwa weniger Abstand zwischen Einleitung und «Was beschäftigt Sie im Moment?». Das ist eine Gestaltungsfrage und keine Korrektur von r4-53.

### N53-2 · gering · schmale Fassung des Titelbilds wird nie mehr gezeigt

**Ort:**
- `authoring/content/index.html:1`: `<svg class="bl-titelbild__band" viewBox="0 0 480 120" …>`
- `authoring/css/site.css:941`: `.bl-titelbild{…max-width:480px} /* r4-50 (Prüfschritt 4, P4-2): Das Band wächst nicht mit Breite und Schrift, höchstens 120 px hoch */`
- `authoring/css/site.css:954`: `.bl-titelbild__band .bl-titelbild__kurve{stroke-width:3}`
- `authoring/css/site.css:961`: `.bl-titelbild .bl-titelbild__band{display:none}`

**Beleg:**
- Unter 75 rem ist das ganze Titelbild ausgeblendet (`site.css:946`). Ab 75 rem ist die schmale Fassung ausgeblendet (`site.css:961`).
- Gemessen in 13 Zuständen (`skripte/zeilen.cjs`, 320 bis 1920 px, dazu 200 % Schrift bei 1984, 2399 und 2400 px). Die schmale Fassung war überall «aus». Auf r4-52 war das Ergebnis gleich.
- Der Zustand besteht also schon seit r4-52. Mit r4-53 ist er endgültig, weil es keinen Bereich mehr gibt, in dem das Band stehen könnte.
- **Berichtigung (nachgetragen):** Hier stand zuerst «Die Nachprüfung r4-52 nennt ihn nicht.» Das stimmt für die Nachprüfung r4-52, aber der Selbstbericht r4-52 vermerkt die Band-Fassung bereits (`audit-results/2026-10-29-n49-1-n51-1-r4-52/BERICHT.md:31`: «Die Band-Fassung des SVG bleibt in `index.html`. … Sie kann bei der nächsten Arbeit an der Startseite wegfallen.»). Die erste Nachprüfung r4-53 führt das als Hinweis ohne Befund. Neu ist an N53-2 nur der veraltete Kommentar zu P4-2 (`site.css:941`).
- Für Nutzende hat das keine Wirkung, denn das Titelbild ist `aria-hidden="true"`. Wer aber den Kommentar zu P4-2 liest, nimmt an, das Band werde noch gezeigt.

**Vorschlag:** bei der nächsten Arbeit am Titelbild das Band-SVG und seine Regeln entfernen oder ausdrücklich als Reserve kennzeichnen. Den Kommentar zu P4-2 nachführen. Danach den Wortlautvergleich wiederholen, mit dem Erwartungswert «keine Änderung».

## Bestätigt

### 1 · Diff vollständig

`git diff --stat bf2156e 2324026` zeigt 33 Dateien, +195/−90. In `authoring/` sind es vier Dateien:

| Datei | Änderung |
|---|---|
| `authoring/css/site.css` | `@media (max-width:61.99rem)` → `(max-width:74.99rem)` (`:946`) und `@media (min-width:62rem)` → `(min-width:75rem)` (`:956`), dazu Kommentare. Sonst nichts |
| `authoring/site.config.json` | `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo` auf r4-53 |
| `authoring/tools/contract.js` | nur `const BUILD = 'r4-53';` (`:11`) |
| `authoring/tools/layouttest.cjs` | eine neue Probe bei 1024 × 768 (`:46`). Die bestehende Zeile ist unverändert enthalten |

- **`site/`:** In allen 24 HTML-Seiten ändern sich je drei Zeilen: `data-puk-site-build`, `site.css?v=` und `interaktion.js?v=`. Geändert sind nur Zeilen mit der Build-Kennung. `git diff bf2156e 2324026 -- 'site/*.html' | grep -E '^[-+][^-+]' | grep -vcE 'r4-5[23]'` ergibt `0`.
- **`site/css/site.css`:** gleiche Änderung wie in `authoring/css/site.css`. Die geänderten Zeilen sind identisch (`diff` leer).
- **Nicht in `authoring/` und `site/`:** die Pendenzendatei und der Selbstbericht mit zwei Fotos.
- **Nicht geändert:** `selftest.mjs`, `sprachtest.mjs`, `suchtest.mjs`, `interaktion.js`, Fragmente in `authoring/content/`. `git diff bf2156e 2324026 -- authoring/tools/selftest.mjs authoring/tools/sprachtest.mjs authoring/tools/suchtest.mjs | wc -l` ergibt `0`.

**Wortlaut, Suche, Akuthinweise, Sprungziele** (`skripte/wortlaut.mjs`). Das Skript entfernt Skripte, Styles, Tags und `&shy;` und vergleicht danach. Ausgabe:

```
authoring/tests/suche-ersttreffer.tsv d69788c1eb87 d69788c1eb87 gleich
authoring/js/interaktion.js f2102a65e8a9 f2102a65e8a9 gleich
site/js/interaktion.js f2102a65e8a9 f2102a65e8a9 gleich
Dateien verglichen: 48 Abweichungen: 0
site/ gesamt (B): {"resp":6,"t144":6,"t117":6}
```

- Die Prüfung umfasst je Datei den Wortlaut, die `id`-Attribute und die Anzahl von `data-responsibility-inline`, `href="tel:144"` und `href="tel:117"`. Die 48 Dateien sind 24 Fragmente und 24 Seiten.
- Die Suchdaten stehen in den Seiten selbst. Dort hat sich ausser der Build-Kennung nichts geändert (siehe oben). Der Suchtest ergibt 216/216.

### 2 · N52-1: Lage der Sicherheitskarte, Titelbild, Raster

Gemessen mit `skripte/messung.cjs`. Gemessen ist `.bl-paths-cards li:first-child`, nach `document.fonts.ready`. «Lage» bezieht sich auf die Fensterhöhe.

| Fenster | Schrift | r4-52 | **r4-53** | Titelbild r4-53 | Hero r4-53 |
|---|---|---|---|---|---|
| 320 × 568 | 100 % | 989–1248, nicht sichtbar | 989–1248, nicht sichtbar | aus | block |
| 390 × 844 | 100 % | 783–990, angeschnitten | 783–990, angeschnitten | aus | block |
| 768 × 1024 | 100 % | 743–915, ganz sichtbar | 743–915, ganz sichtbar | aus | block |
| 1024 × 768 | 100 % | 842–959, nicht sichtbar | **724–841, angeschnitten** | aus | block |
| 1112 × 834 | 100 % | 844–961, nicht sichtbar | **726–843, angeschnitten** | aus | block |
| 1150 × 800 | 100 % | 811–928, nicht sichtbar | **727–844, angeschnitten** | aus | block |
| 1199 × 800 | 100 % | 728–845, angeschnitten | 728–845, angeschnitten | aus | block |
| 1200 × 800 | 100 % | 729–845, angeschnitten | 729–845, angeschnitten | 480 × 288 | grid 576 px / 480 px |
| 1280 × 800 | 100 % | 686–803, angeschnitten | 686–803, angeschnitten | 480 × 288 | grid 656 px / 480 px |
| 1440 × 900 | 100 % | 690–806, ganz sichtbar | 690–806, ganz sichtbar | 480 × 288 | grid 720 px / 480 px |
| 320 × 568 | 200 % | 3179–3952 | 3179–3952 | aus | block |
| 1024 × 768 | 200 % | 1218–1477 | 1218–1477 | aus | block |
| 1984 × 1000 | 200 % | 1413–1584 | 1177–1348 | aus | block |
| 2399 × 1000 | 200 % | 1136–1308 | 1133–1304 | aus | block |
| 2400 × 1000 | 200 % | 1136–1308 | 1136–1308 | 960 × 576 | grid 1296 px / 960 px |
| 2560 × 1200 | 200 % | 1136–1308 | 1136–1308 | 960 × 576 | grid 1440 px / 960 px |

Was die Messung zeigt:

- **Selbstbericht:** Alle elf Zeilen der Messtabelle stimmen auf den Pixel.
- **Schwelle:** Bei Standardschrift liegt sie zwischen 1199 und 1200 px (75 × 16). Bei 200 % Schrift liegt sie zwischen 2399 und 2400 px (75 × 32). Unter der Schwelle ist das Titelbild ausgeblendet, ab der Schwelle sichtbar.
- **Unter 992 px und ab 1200 px:** jeder Wert gleich wie in r4-52.
- **Waagrechtes Scrollen:** keines. In allen 32 Messungen ist `scrollWidth` gleich der Fensterbreite.
- **Zwischen 62 und 75 rem** (992–1199 px):
  - Der Einstieg ist einspaltig (`display:block`). Es gibt kein Raster und darum keine leere Spalte. Das ausgeblendete Titelbild ist 0 px breit.
  - Titel 636 px und Absätze 720 px breit, also `--lesebreite` (45 rem).
  - Zeilenlängen nach `skripte/zeilen.cjs`: Einleitung höchstens 62 Zeichen, zweiter Absatz höchstens 73 Zeichen. Das sind dieselben Werte wie bei 1440 und 1920 px in r4-52 und r4-53, also nicht überbreit.
  - Der Kopfbereich ist 390 px hoch statt 508 px wie in r4-52 bei 992–1112 px.
- **Fotos:** `startseite-1024x768-r4-52.png` / `-r4-53.png` und `startseite-1150x800-r4-52.png` / `-r4-53.png`.

**Die neue Layoutprobe greift.** Die Layoutprobe von r4-53 lief auch gegen die Site von r4-52, als Kopie im Worktree `bf2156e`:

```
r4-52: Audit-04-Layouttest: 240 Seitenzustände, 27 Bedienproben, 2 Abweichungen.
       tension core exceeds 1800px
       safety card starts in first screen 1024x768
r4-53: Audit-04-Layouttest: 240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.
       tension core exceeds 1800px
```

Gegen r4-52 ist sie also rot, gegen r4-53 grün. Die Probe bei 390 × 844 ist in beiden Ständen grün.

**Nebenbemerkung ohne Befund:** Zwischen `max-width:74.99rem` und `min-width:75rem` bleibt eine Lücke von 0,16 px (1199,84–1200 px). Dort gälte keine der beiden Regeln, und die schmale Fassung des Titelbilds stünde unter der Einleitung. Bei ganzzahligen Fensterbreiten und den üblichen Zoomstufen (90, 110, 125, 150 %) liegt keine erreichbare Breite in dieser Lücke. Dasselbe Muster gab es schon in r4-52 mit 61.99/62 rem. Fällt N53-2 weg, erledigt sich das von selbst. Man könnte auch `@media not (min-width:75rem)` schreiben.

### 3 · Tests und Gate

- **`layouttest.cjs`:** verschärft. Neu ist eine Probe bei 1024 × 768 mit `document.fonts.ready`. Die Probe bei 390 × 844 ist unverändert, keine Probe wurde entfernt. Statt 26 gibt es nun 27 Bedienproben.
- **`contract.js`:** nur die Build-Kennung. Das ist gleichwertig.
- **`selftest.mjs`, `sprachtest.mjs`, `suchtest.mjs`:** unverändert.
- **N52-3 ist teilweise erledigt**, wie der Selbstbericht sagt. Erledigt sind die zweite Fenstergrösse und das Warten auf die Schriften.
  - Offen ist die Probe bei 768 × 1024 mit «ganz sichtbar».
  - Ebenfalls offen: Die Probe bei 390 × 844 wartet weiter nicht auf `document.fonts.ready` (`layouttest.cjs:46`).
  - Ebenfalls offen: Beide Proben prüfen nur den oberen Kartenrand, siehe N53-1.

### 4 · Barrierefreiheit

axe-core 4.14.0 (`skripte/axe.cjs`) prüft mit den Regeln `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` und `best-practice`. Ausgabe auf r4-53:

```
100 % 390px: 24 Läufe, 0 Verstösse
100 % 1280px: 24 Läufe, 0 Verstösse
200 % 320px Menü offen 24/24: 24 Läufe, 0 Verstösse
200 % 1440px Menü offen 24/24: 24 Läufe, 0 Verstösse
```

**Barrierefreiheitsbaum der Startseite** bei 1024 und 1440 px (`skripte/aria.cjs`):

- 159 Zeilen. Einziges Bild ist das Logo («Psychiatrische Universitätsklinik Zürich»).
- Das Titelbild kommt im Baum nicht vor. Es hat `aria-hidden="true"`, 0 fokussierbare Elemente und `focusable="false"` an beiden SVG.
- Landmarks: `banner` (mit `navigation` «Hauptnavigation» und «Direkteinstiege»), `main`, `contentinfo`.
- Überschriften: eine Überschrift der Ebene 1, «Borderline – Orientierung für Angehörige». Dazu vier Regionen mit Überschriften der Ebene 2: «Was beschäftigt Sie im Moment?», «Mitgefühl und Selbstschutz gehören zusammen», «Ich möchte etwas verstehen oder nachschlagen» und «Beratung für Sie».
- Die Ausgabe ist für r4-52 und r4-53 zeichengleich (`diff` leer).

### 5 · Tests selbst ausgeführt (auf `ae97997`, an `authoring/` und `site/` gleich `2324026`)

| Befehl | Ausgabe |
|---|---|
| `node authoring/tools/build.mjs --production` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site` |
| `node authoring/tools/build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `node authoring/tools/selftest.mjs` | `Selbsttest: 88/88 bestanden` |
| `node authoring/tools/suchtest.mjs dist/site` | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| `node authoring/tools/sprachtest.mjs` | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| `node authoring/tools/layouttest.cjs` | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` `tension core exceeds 1800px` (bekannte Ausnahme B2c), Exit 1 |

Die 20 Hinweise des Gates sind alle `crisis-number-check`. Ihre Zahl ist wie in r4-52 unverändert.

### 6 · Live-Site (Hinweis, keine Prüfstufe)

Abfrage mit `curl` am 29.10.2026, 22:51 UTC:

- `https://borderline-angehoerige.netlify.app/` antwortet mit HTTP 200 und `data-puk-site-build="r4-53"`.
- `css/site.css?v=r4-53` enthält `@media (max-width:74.99rem){.bl-titelbild{display:none}}`.
- Die ausgelieferte `index.html` weicht von `site/index.html` nur in den umgeschriebenen Links ab (`href='/verstehen'` statt `verstehen.html`). Das kommt von der Netlify-Nachbearbeitung («Pretty URLs») und ist aus früheren Produktionsprüfungen bekannt.

## Nicht prüfbar

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack).
- Safari (macOS, iOS) und Firefox. Geprüft ist nur Chromium.
- Reale Geräte. Bei einem iPad quer ist der sichtbare Bereich kleiner als 1024 × 768, siehe N53-1. Die Textgrösse von iOS ist nicht geprüft.
- Bruchteilige Fensterbreiten bei Browserzoom (Lücke 74.99/75 rem): nur rechnerisch geprüft.
- Der CI-Lauf `build-and-compare` auf `ab44b18` ist nicht selbst nachgeprüft. Die Pendenzendatei nennt ihn grün.

## Empfehlung

**«keine Nachbesserung nötig».**

- N52-1 ist wie entschieden umgesetzt und wirkt. Die Kennzahlen stimmen.
- Kein Wortlaut, keine Suche, kein Akuthinweis und kein Sprungziel ist verändert.
- Die Tests sind verschärft.
- N53-1 und N53-2 sind gering. Sie können bei der nächsten Arbeit an der Startseite oder am Rest von N52-3 mitlaufen.
- Weiter offen sind:
  - N52-2
  - der Rest von N52-3
  - N49-2 (Bestätigung durch Christa Egger)
  - N51-2
  - die Prüfung mit echtem Screenreader, in Safari, in Firefox und auf realen Geräten
