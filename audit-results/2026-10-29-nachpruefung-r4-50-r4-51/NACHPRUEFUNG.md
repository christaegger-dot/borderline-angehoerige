# Nachprüfung r4-50 bis r4-51 · 29.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger (Fachstelle Angehörigenarbeit, PUK Zürich), 29.10.2026: «Nachprüfung r4-50 bis r4-51 starten».
- **Gegenstand:** alle Änderungen zwischen `f300e7d` (r4-49) und `5e0ad1a` (r4-51, Merge PR #735).
  - Laut `git diff --stat f300e7d 5e0ad1a -- authoring` sind geändert: `css/site.css` (+14/−1), `js/interaktion.js` (+2/−1), `site.config.json` (Build-Kennung, Verzichtsvermerk) und `tools/contract.js` (Renderer, Gate, Selbsttest).
  - **Nicht geändert:** alle Fragmente in `authoring/content/`, `suche-ersttreffer.tsv`, `selftest.mjs`, `sprachtest.mjs`, `suchtest.mjs` und `layouttest.cjs`.
  - Zwischen `5e0ad1a` und dem heutigen `main` (`5380e80`) ist an `authoring/` und `site/` nichts geändert, es gibt nur Pendenzen und Prüfberichte. Der geprüfte Stand ist also der heute veröffentlichte.
  - Die Selbstberichte heissen `audit-results/2026-10-29-pruefschritt4-r4-50/BERICHT.md` (Sichtprüfung, P4-2 und P4-4 behoben) und `…/2026-10-29-kopf-r4-51/BERICHT.md` (P4-1 behoben).
- **Wer prüft:** die Claude-Sitzung, die die Nachprüfungen r4-43 bis r4-46 und r4-47 bis r4-49 erstellt hat. Sie hat an r4-50 und r4-51 **nicht gebaut**. Sie ändert keine Inhalte und keinen Code und committet nur diesen Ordner.
- **Umgebung:**
  - Node 22.22.0, Playwright über `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`, Chromium.
  - axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.
  - Die Tests liefen in einem eigenen Arbeitsbaum von `5e0ad1a` ausserhalb des Repositorys. `site/` wurde nicht beschrieben.
  - 200 % Schrift wird wie im Bericht r4-50 über die Browsereinstellung erzeugt (`--blink-settings=defaultFontSize=32,defaultFixedFontSize=26`).
  - Zum Vergleich dient `site/` aus `f300e7d`.

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Befunde

### N51-1 · gering · Das Gate merkt nicht, wenn die Direkteinstiege im Menü ganz fehlen

- **Ort:** `authoring/tools/contract.js:510–511`: `if (menuUtility.length && menuUtility.join('|') !== utilityExp.join('|')) add('block', …)`.
- **Beleg:** eigene Mutationen über `C.gate` auf den gerenderten Seiten, gezählt sind neue Blocker gegenüber dem Bestand.
  - Ein Direkteinstieg im Menü zeigt auf eine andere Seite: +1 Blocker `nav`.
  - Ein Direkteinstieg im Menü fehlt (nur «Suchen»): +1 Blocker `nav`.
  - **Alle** Direkteinstiege im Menü fehlen, auf allen Seiten: **0 neue Blocker**.
  - Der Selbsttest deckt nur den Fall «weicht ab» ab (`MUTATIONS`, «Direkteinstieg im Menü weicht vom Seitenvertrag ab»).
- **Folge:** Unter 20 rem blendet das Stylesheet die Zeile unter dem Kopf aus (`site.css:642`). Fielen die Einträge im Menü weg, etwa durch eine spätere Änderung am Renderer, wären «Kurz und klar», «Nachschlagen» und «Suchen» bei 200 % Schrift auf dem Handy gar nicht mehr erreichbar, ohne dass das Gate es meldet. Heute rendert der Renderer sie auf allen 23 Seiten mit Menü (die 404-Seite hat keine Direkteinstiege).
- **Vorschlag:** die Bedingung `menuUtility.length &&` streichen, wenn die Seite ein Menü und `utilityNav` hat. Dazu einen Selbsttestfall «Direkteinstiege im Menü fehlen» ergänzen.

### N51-2 · gering · Ohne JavaScript ist der Kopf bei 200 % Schrift noch etwas höher

- **Ort:** Kopf ohne Skript, 320 px, 200 % Schrift, auf `grenzen.html`.
- **Beleg:**

| Zustand | r4-49 (`f300e7d`) | r4-51 (`5e0ad1a`) |
|---|---|---|
| mit JavaScript, 200 % | Kopf 562 px, Titel ab 746 px | **418 px**, Titel ab 602 px |
| ohne JavaScript, 200 % | Kopf 896 px, Titel ab 1080 px | **937 px**, Titel ab 1121 px |
| ohne JavaScript, Standardschrift | 510 px | 510 px |

- **Erklärung:** Ohne Skript steht das Menü offen. Unter 20 rem stehen dort jetzt acht statt fünf Links mit Trennlinien, die Zeile darunter fällt weg. Der Bericht r4-51 sagt nur «Die Liste ist offen wie bisher».
- **Bewertung:** Das ist ein Randfall: ohne Skript, mit grosser Schrift, auf dem Handy. Er ist um 41 px schlechter. Der Kopf war dort schon vorher höher als ein Bildschirm.
- **Vorschlag:** keine Änderung nötig. Den Randfall im Bericht r4-51 ergänzen. Wird der Kopf ohne Skript einmal überarbeitet, diesen Fall mitprüfen.

### Aus der Nachprüfung r4-47 bis r4-49 weiter offen: N49-1

r4-50 begrenzt das Titelbild-Band auf 480 × 120 px (P4-2). Bei 768 × 1024 beginnt die Sicherheitskarte der Startseite jetzt bei 895 statt 952 px, ist aber weiter nur angeschnitten. Bei 390 × 844 ändert sich nichts: Die Karte beginnt bei 902 px, also unterhalb des ersten Bildschirms. Der Befund bleibt offen und braucht den Gestaltungsentscheid von Christa Egger.

## Bestätigt, mit Beleg

### r4-50 · Prüfschritt 4

- **P4-2, Titelbild-Band:** `site.css:941` `max-width:480px`. Gemessen ist das Band 280 × 70 px bei 320, 350 × 88 bei 390 und 480 × 120 bei 768 px. Breit steht es mit 447 × 268 bei 1024 und 480 × 288 bei 1280 und 1440 px, wie berichtet.
- **P4-4, Druck:** Mit `emulateMedia({media:'print'})` ist die Linie über dem Sicherheitshinweis auf «Grenzen setzen» und über der Sicherheitskarte der Startseite `rgb(100, 100, 100)` und 4 px stark. Am Bildschirm ist sie `rgb(240, 235, 150)`. Der rote Akuthinweis behält im Druck `rgb(220, 80, 60)`.
- **P4-3, Platzhalter im Suchfeld:** bleibt laut Bericht offen (Wortlaut). Ich habe ihn nicht erneut geprüft.

### r4-51 · Direkteinstiege bei grosser Schrift

- **Kopfhöhe mit JavaScript** (`grenzen.html`):
  - 200 % Schrift: 418 px bei 320 und 390 px (vorher 562 px bei 320), 293 bei 640, 339 bei 768 und 296 bei 1440 px.
  - Standardschrift: 213 / 191 / 169 / 191 / 138 px bei 320 / 390 / 640 / 768 / 1440 px, unverändert.
  - Waagrechtes Scrollen gibt es in keinem Zustand.
- **Genau eine Fassung sichtbar:**
  - Unter 20 rem (200 % Schrift, 320 und 390 px) ist die Zeile unter dem Kopf leer, und das offene Menü zeigt 8 Links.
  - Ab 640 px mit 200 % Schrift und bei Standardschrift zeigt die Zeile die 3 Direkteinstiege, die Einträge im Menü sind ausgeblendet. Die Grenze `max-width:19.99rem` liegt bei 639,7 px.
  - Im Barrierefreiheitsbaum stehen die Direkteinstiege in jedem Zustand genau einmal.
- **Tastatur:**
  - 320 und 390 px mit 200 % Schrift: Pfeil nach unten geht von «Menü» über Verstehen, Im Alltag, Krisen, Familie, Für Sie zu Kurz und klar, Nachschlagen, Suchen und bleibt am Ende stehen.
  - Bei Standardschrift und bei 640 px und mehr mit 200 % Schrift: nur die fünf Bereiche. Die ausgeblendeten Links werden übersprungen (`interaktion.js:96`, Filter `getClientRects().length > 0`).
- **`aria-current` im Menü** (320 px, 200 %):
  - `quellen.html`: «Nachschlagen = location».
  - `kurz.html`: «Kurz und klar = page».
  - `suche.html`: «Nachschlagen = location» und «Suchen = page».
  - Das entspricht der Zeile unter dem Kopf.
- **Gate:** Die neue Prüfung erkennt abweichende und einzelne fehlende Einträge. Lücke siehe N51-1.

### Wortlaut und Sicherheit

- Kein Fragment ist geändert. Die Bedienwörter im Menü sind dieselben wie in `utilityNav`.
- Akuthinweise, `tel:144` und `tel:117`, die Suche (216/216) und die Sprungziele sind unverändert.

### Barrierefreiheit

- **axe-core 4.14.0, Standardschrift:** 24 Seiten × 390 und 1280 px = 48 Läufe, **0 Verstösse**.
- **axe-core 4.14.0, 200 % Schrift mit geöffnetem Menü:** 24 Seiten × 320 und 1440 px = 48 Läufe, **0 Verstösse**.
- **Farben im Menü:** Die Direkteinstiege stehen in Blau 100 auf Weiss (4,71 : 1), der aktuelle Eintrag in Tinte (15,9 : 1).

### Tests selbst ausgeführt (Arbeitsbaum `5e0ad1a`)

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`) · Ziel dist/site, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/, Exit 0 |
| `node authoring/tools/selftest.mjs` | Selbsttest: 87/87 bestanden, Exit 0 |
| `node authoring/tools/suchtest.mjs dist/site` | 216 von 216 Erwartungen · JS-Fehler 0, Exit 0 |
| `node authoring/tools/sprachtest.mjs` | 73 Prüfungen bestanden · JS-Fehler 0, Exit 0 |
| `node authoring/tools/layouttest.cjs` | 240 Seitenzustände, 25 Bedienproben, 1 Abweichung «tension core exceeds 1800px» (bekannte Ausnahme B2c), Exit 1 wie seit r4-42 |

Die Kennzahlen der Berichte stimmen mit meinen Messungen überein:

- Kopf 418 px bei 200 % Schrift, 339 px bei 768 px.
- Selbsttest 87.
- Titelbild-Band höchstens 480 × 120 px.
- Druckfarbe der Linie `rgb(100, 100, 100)`.

## Nicht prüfbar oder nicht geprüft

- **Echte Screenreader:** im Container nicht vorhanden. Die Anleitung für VoiceOver steht in `audit-results/2026-10-29-nachpruefung-r4-43-r4-46/NACHPRUEFUNG.md`.
- **Art der Schriftvergrösserung:** r4-51 wirkt, wenn die Schriftgrösse des Browsers erhöht ist. Vergrössert man stattdessen per CSS nur die Wurzelschrift, bleibt der Kopf bei 572 px, weil Medienabfragen in `rem` die Grundgrösse des Browsers nutzen. Wie sich Safari unter iOS («Textgrösse» im Menü aA) und die dynamische Schrift verhalten, ist nicht geprüft und braucht ein reales Gerät.
- **Weiteres nicht Geprüftes:** Safari und Firefox, reale Geräte, Druck auf Papier.
- **Die Sichtprüfung aus r4-50** (Übersichtsbilder aller Seiten) habe ich nicht wiederholt. Geprüft sind die zwei Korrekturen und die Zahlen.

## Empfehlung

**Keine Nachbesserung nötig.**

r4-50 und r4-51 tun, was sie berichten. Die Messwerte stimmen, axe meldet auch bei 200 % Schrift mit offenem Menü keinen Verstoss, und kein Wortlaut ist geändert. N51-1 und N51-2 sind gering und können bei der nächsten Arbeit am Seitenrahmen mitgenommen werden. Aus der Nachprüfung r4-47 bis r4-49 bleibt **N49-1** (Sicherheitskarte der Startseite auf dem Handy nicht im ersten Bildschirm) offen und braucht weiter den Gestaltungsentscheid.
