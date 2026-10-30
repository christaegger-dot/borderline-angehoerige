# Nachprüfung r4-60 · 30.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger (Fachstelle Angehörigenarbeit, PUK Zürich), 30.10.2026: «Nachprüfung r4-60 starten».
- **Gegenstand:** r4-60 aus PR #775, Head `7cbdd40`, gemergt als `b6777ec` am 30.10.2026, 07:18:27 UTC. Geprüft ist `git diff 330a9af 7cbdd40`.
  - **Selbstbericht:** `audit-results/2026-10-30-n59-1-n59-2-r4-60/BERICHT.md`. Er setzt N59-1 und N59-2 der Nachprüfung r4-59 aus PR #772 um.
  - **Gemergter Stand:** Mein Probe-Merge von `main` (`df7143b`) mit `7cbdd40` ergibt genau den Baum von `b6777ec` (`git diff --stat b6777ec` leer). `b6777ec` weicht von `7cbdd40` nur in der Pendenzendatei ab (aus PR #774). Geprüft ist also der veröffentlichte Stand.
- **Wer prüft:** eine Claude-Sitzung, die an r4-58, r4-59 und r4-60 auf `main` nicht gebaut hat. Zur Unabhängigkeit ist offenzulegen:
  - Diese Sitzung hat die Nachprüfung r4-54 erstellt und den Nachtrag zu N54-2 gebaut (PR #768).
  - Sie hat parallel zu #775 eine eigene Fassung von r4-60 geschrieben. Diese ist auf Entscheid von Christa Egger verworfen und nie gepusht worden. Dabei hat sie die Beschreibung von #775 gelesen.
  - Sie ist also mit dem Lösungsweg vertraut. Die Messungen unten hat sie aber mit eigenen Skripten neu gemacht.
- **Umgebung:**
  - Node 22.22.0, Playwright 1.63.0, Chromium 153.0.8010.12, axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.
  - Arbeitsbäume von `7cbdd40`, `330a9af` (r4-59) und `origin/main` mit Probe-Merge, alle ausserhalb des Repositorys. `site/` im Repository ist nicht beschrieben.
- **Beilagen in diesem Ordner:**
  - `abgleich-chromium.cjs`: eigenes Skript, Gate gegen den Zugänglichkeitsbaum von Chromium über CDP;
  - `abgleich-chromium-r4-60.txt` und `abgleich-chromium-r4-59.txt`: die Ausgaben.

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Befunde

### N60-1 · gering · Die behobene Falschmeldung P4.6 ist durch keinen Selbsttestfall abgesichert

- **Ort:** `authoring/tools/contract.js`, Selbsttest (neue Zeilen ab `:709` und die Gegenproben vor der Mutationsschleife).
- **Beleg:**
  - Der Selbstbericht nennt als Wirkung «Falschmeldung weg: P4.6, dekoratives `<span aria-hidden=" true "> →</span>`, ergibt keinen Blocker mehr» (`BERICHT.md:72`).
  - Die neuen Selbsttestfälle prüfen das nicht. Die Gegenprobe deckt nur `false`, `FALSE`, `undefined` und leer an Zeile und Menü ab; die SVG-Gegenprobe betrifft `figure-alt`.
  - Belegt ist P4.6 nur im Mutationsskript des Selbstberichts. Mein Abgleich bestätigt den Fix: «Linktext + `<span aria-hidden=" true "> →</span>`»: Chromium nennt den Link «Kurz und klar», das Gate meldet nichts (`abgleich-chromium-r4-60.txt`). Mit r4-59 meldete es `utility-nav`.
  - Ebenfalls ohne Selbsttestfall ist `aria-hidden=" false "`. Chromium verbirgt damit (gemessen), das Gate auch.
- **Einordnung:** Keine Wirkung auf die Seiten. Eine spätere Änderung an `hiddenFlag` oder `accTxt` könnte die Falschmeldung unbemerkt zurückbringen.
- **Vorschlag:** Bei der nächsten Arbeit an `contract.js` zwei Gegenproben ergänzen. Die erste: Ein verborgener Zusatz im Linktext ergibt kein `utility-nav`. Die zweite: `aria-hidden=" false "` an der Zeile ergibt `utility-nav`.

### N60-2 · gering · Die Pendenzendatei auf `main` führt r4-60 nicht

- **Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` auf `b6777ec`.
- **Beleg:**
  - Die Kopfzeile lautet «GitHub main: r4-59 (`0c7d172`, PR #769 …)».
  - `grep r4-60` in der Datei findet nichts.
  - #775 hat die Datei bewusst nicht geändert («Das übernehmen #773 und #774»). #774 lag aber vor dem Merge von #775.
- **Einordnung:** Nur Dokumentation. Auf dem Branch `pendenzen/2026-10-30-r4-60` führt eine andere Sitzung die Datei offenbar gerade nach. Den Inhalt dieses Branchs habe ich nicht geprüft.
- **Vorschlag:** r4-60 als veröffentlicht eintragen: Merge 07:18:27 UTC, Codex 07:18:10 UTC ohne Befund, CI grün, Live-Site r4-60. Dazu diese Nachprüfung.

## Bestätigt

### 1. Diff vollständig

- **Geändert in `authoring/`:** nur `tools/contract.js` und `site.config.json`. In der Konfiguration sind es die Zeilen 5, 37, 39 und 44: `assetVersion`, `pendingScope`, `independentReviewWaiver.version`, `appliedTo`.
- **`contract.js`:**
  - `BUILD` ist neu `r4-60`.
  - `hiddenFlag` gilt neu bei jedem `aria-hidden` als verborgen, ausser bei `false` (jede Schreibweise), `undefined` (jede Schreibweise) und leer. Leerraum wird nicht entfernt. Der Kommentar ist berichtigt.
  - Die Regel `sender` nutzt `hiddenFlag`, ebenso die SVG-Prüfung in Abbildungen.
  - Dazu kommen fünf neue Mutationsfälle und zwei neue Gegenproben, 111 statt 104.
- **Nicht geändert:** Für Fragmente, Stylesheet, Skript, Tests, `selftest.mjs`, `layouttest.cjs`, `sprachtest.mjs`, `suchtest.mjs`, `search-index.mjs` und `build.mjs` ist `git diff --stat 330a9af 7cbdd40 -- …` leer. Damit sind Wortlaut, Akuthinweise, Sprungziele, Suche und `suche-ersttreffer.tsv` unverändert.
- **`site/`:** Es ändern sich nur die 24 HTML-Seiten. Im Diff gibt es 0 Zeilen ohne `r4-59`/`r4-60`.
- **Berichtigungen:** Der Selbstbericht r4-59 und die Nachprüfung r4-58 (N58-1, D8) tragen die falsche Angabe zu `aria-hidden=" true "` jetzt als «Berichtigung vom 30.10.2026» gekennzeichnet.

### 2. Verhalten wie Chromium, eigene Messung

Mit `abgleich-chromium.cjs` habe ich 60 Mutationen an den gerenderten Seiten `index.html` und `404.html` aus `dist/site` geprüft. Für jede vergleicht das Skript den Blocker des Gates mit dem Zugänglichkeitsbaum von Chromium (CDP `Accessibility.getPartialAXTree` für den Zielknoten).

- **Werte:** `" true "`, `yes`, `0`, `" false "`, `TRUE`, `False`, `undefined`, `UNDEFINED`, `" undefined "`, leer und ohne Wert.
- **Wo sie gesetzt sind:**
  - an der Zeile «Direkteinstiege»;
  - am Menülink «Kurz und klar»;
  - an der Absenderzeile;
  - am Kopf der Fehlerseite;
  - als Zusatz `<span aria-hidden="…"> →</span>` im Linktext.
- **Dazu:** `inert` an Zeile, Menülink, Kopf und Kopf der Fehlerseite sowie `hidden` am Zeilenlink.

| Gate | Übereinstimmung mit Chromium |
|---|---|
| r4-59 (`330a9af`) | 31 von 60 |
| r4-60 (`7cbdd40`) | **60 von 60** |

- Chromium behandelt `undefined` und `UNDEFINED` wie `false`, das Element bleibt im Baum. `" undefined "` mit Leerraum verbirgt es. r4-60 bildet beides richtig ab.
- **Falsch-Positive:** keine. Mit r4-60 entspricht jede Gate-Meldung in diesen Fällen einer Verbergung in Chromium. Umgekehrt meldet das Gate auch den verborgenen Zusatz im Linktext nicht mehr.
- **Methodenhinweis:** Mein erster Lauf hatte bei der Absenderin 10 und dann 14 scheinbare Abweichungen. Beide Male lag der Fehler in meiner Probe, nicht im Gate:
  - Ein schlichtes `<span data-sender-unit>` ist in Chromium immer «ignored».
  - Der Name der Fachstelle steht auch in der Fusszeile.
  - Massgeblich ist der Textknoten im Kopf. Mit diesem gemessen stimmen alle 60 Fälle.

### 3. Selbsttest und Gegenprobe

- `selftest.mjs` auf `7cbdd40`: `Selbsttest: 111/111 bestanden`, 0 × `FAIL`. Auf dem Probe-Merge mit `main`: ebenfalls 111/111.
- In einer Kopie sind `hiddenFlag`, `hidden` in `sender` und die SVG-Bedingung auf r4-59 zurückgesetzt. Dort scheitern genau sechs Fälle (`Selbsttest: 105/111 bestanden`):
  - `aria-hidden=" true "` an der Zeile;
  - `aria-hidden="yes"` am Menülink;
  - `inert` am Kopf;
  - `aria-hidden="TRUE"` an der Absenderzeile;
  - `inert` am Kopf der Fehlerseite;
  - die SVG-Gegenprobe.

  Die Gegenprobe zu `false`/`undefined`/leer besteht in beiden Ständen; sie verhindert eine zu breite Erkennung. Die Angabe des Selbstberichts (105/111) ist bestätigt.
- **Tests verschärft, keiner abgeschwächt.** Keine bisherige Selbsttestzeile ist entfernt oder geändert.

### 4. Tests selbst ausgeführt (auf `7cbdd40`)

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | Exit 0, `24 Seiten · 0 Blocker · 20 Hinweise` |
| `node authoring/tools/build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` (auch auf dem Probe-Merge) |
| `node authoring/tools/selftest.mjs` | `111/111` |
| `node authoring/tools/suchtest.mjs dist/site` | `216 von 216 … JS-Fehler 0` |
| `node authoring/tools/sprachtest.mjs` | `73 Prüfungen bestanden · JS-Fehler 0` |
| `node authoring/tools/layouttest.cjs` | Exit 1, `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen`, `tension core exceeds 1800px` (bekannte Ausnahme B2c) |

### 5. Barrierefreiheit (Stichprobe)

axe-core 4.14.0 auf allen 24 Seiten aus `dist/site` von `7cbdd40`, bei 390 × 844 und 1280 × 800, Regel-Tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` und `best-practice`: `48 Läufe, 24 Seiten, Verstösse gesamt 0`.

### 6. Merge, CI, Live-Site

- **Codex-Review auf #775:** um 07:18:10 UTC ohne Befund abgeschlossen. Der Merge folgte um 07:18:27 UTC, die Merge-Regel ist eingehalten.
- **CI:** `build-and-compare` war auf `7cbdd40` grün.
- **Live-Site** (Hinweis, keine Prüfstufe): `curl` um 07:21 UTC ergab `data-puk-site-build="r4-60"`.

## Nicht prüfbar

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack).
- Firefox und Safari, vor allem wie sie Werte wie `" true "`, `yes` oder `undefined` auswerten. Gemessen ist nur Chromium.
- Reale Geräte.
- Fachliche, juristische und institutionelle Freigabe: nicht Gegenstand.
- Ausserhalb des Auftrags von r4-60 und hier nicht erneut geprüft: N59-3 (`aria-label` an einem `<span>` im Link) und N59-4 (Merge-Zeitpunkt von #768).

## Empfehlung

**Nachbesserung nötig, ohne Blocker.** N59-1 und N59-2 nach #772 sind behoben. Gate und Chromium stimmen in allen 60 gemessenen Fällen überein, und es gibt keine Falsch-Positiven. N60-1 und N60-2 sind gering und betreffen nur Selbsttest und Dokumentation.
