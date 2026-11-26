# Nachprüfung r4-65, gemergter Stand · 30.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger (Fachstelle Angehörigenarbeit, PUK Zürich), 30.10.2026: «Nachprüfung r4-62 starten». Auf Rückfrage präzisiert: Nachprüfung des gemergten Stands r4-65. Die Nachprüfung r4-62 liegt schon vor (#790, `f1ec49f`). Begonnen hat r4-65 als r4-62.
- **Gegenstand:** r4-65 aus PR #784, gemergt als `19a72dc` am 30.10.2026 um 09:52:58 UTC. Geprüft ist `git diff a55ecb1 19a72dc`; `a55ecb1` ist r4-64, die Basis von #784.
- **Abgrenzung:**
  - Die Nachprüfung r4-62 (#790) prüfte die Regeln auf `d6dd542`.
  - Die Nachprüfung r4-65 in PR #793 (Entwurf) prüfte einen früheren Stand von #787 (`f7f8d18`), nicht #784. Ihre Befunde heissen N65-1 bis N65-6. Damit es keine Doppelnummern gibt, zählt dieser Bericht ab N65-7 weiter.
- **Wer prüft:** eine Claude-Sitzung, die an r4-62 bis r4-65 nicht gebaut hat. Offenzulegen ist:
  - Sie hat die Nachprüfungen r4-54 und r4-60 erstellt.
  - Sie hat den Nachtrag zu N54-2 (#768) und zu N60-1 (#783) gebaut. Die Selbsttestfälle aus #783 sind in r4-65 enthalten.
  - Eine eigene Fassung von r4-60 hat sie verworfen und nie gepusht.
- **Umgebung:**
  - Node 22.22.0, Playwright 1.63.0, Chromium 153, axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.
  - Arbeitsbäume von `19a72dc` (r4-65) und `5cbaf1c` (r4-61) liegen ausserhalb des Repositorys.
  - `site/` im Repository ist nicht beschrieben.
- **Beilagen:**
  - `abgleich-svg.cjs`: eigenes Skript, Gate gegen den Zugänglichkeitsbaum von Chromium über CDP;
  - `abgleich-svg-r4-65.txt` und `abgleich-svg-r4-61.txt`: die Ausgaben.

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Befunde

### N65-7 · wichtig · #784 ist ohne abgeschlossenes Codex-Review gemergt, ein Entscheid dazu ist auf GitHub nicht belegt

- **Ort:** PR #784, Merge `19a72dc`.
- **Beleg:**
  - **Codex:** Die einzige Codex-Zusammenfassung auf #784 meldet «Failed» um 09:11:52 UTC auf `d6dd542`. Danach kam die Meldung zum Nutzungslimit (09:11:56 UTC).
  - **Kopf:** Auf dem gemergten Kopf `2810994` gibt es kein Codex-Review.
  - **Merge:** `merged_at` 09:52:58 UTC.
  - **Widerspruch:** Die Beschreibung von #784 verlangt «Merge auf ‹bitte merge #784› erst nach Codex ‹Completed› ohne Befund». Ein Kommentar auf #784 von 09:53:08 UTC sagt: «Ein Merge von #784 folgt weiterhin erst, wenn das Codex-Review ‹Completed› ohne Befund meldet». Er kam 10 Sekunden nach dem Merge und widerspricht ihm.
  - **Auftrag:** Laut Beschreibung des Pendenzen-PR #797 hat die Review-Sitzung auf den Auftrag «ja, #784 mergen» gemergt. Das war eine Mitteilung in der Sitzung, auf GitHub ist der Auftrag nicht belegt.
- **Einordnung:** Die Abweichung betrifft R28-O01 und R29-P20, wie N58-3 und N59-4. Ersatzweise haben Review-Sitzungen geprüft (K1 bis K4 auf `e1db2da`, auf `2810994` ohne Befund, laut #797). Die Nachprüfung r4-62 (#790) und dieser Bericht prüfen den Inhalt. Auf die Seiten wirkt das nicht.
- **Vorschlag:** In der Pendenzendatei als Abweichung führen, mit dem Wortlaut des Auftrags und seiner Quelle. Den Kommentar von 09:53:08 UTC als überholt kennzeichnen. Ob Merges ohne Codex-Review bis zum Ende des Nutzungslimits allgemein erlaubt sind, entscheidet Christa Egger einmal ausdrücklich, damit nicht jeder Merge als Einzelfall gilt.

### N65-8 · gering · `pendingScope` auf `main` führt r4-64 und r4-61 doppelt

- **Ort:** `authoring/site.config.json` › `releaseApproval.pendingScope` auf `19a72dc`.
- **Beleg:** Die Abschnitte stehen in dieser Reihenfolge: r4-65 (Stelle 0), r4-64 (884), r4-61 (1333), «Vorher: r4-64» (1738), r4-61 (2195), «Vorher: r4-60» (2600). r4-64 und r4-61 kommen je zweimal vor, und r4-64 steht einmal vor und einmal nach r4-61. Vermutlich ist das beim Merge von `main` in #784 entstanden. Dasselbe Muster meldet N65-2 in #793 für #787.
- **Einordnung:** Nur Text im Verzichtsvermerk, keine Wirkung auf Gate oder Seiten.
- **Vorschlag:** Bei der nächsten Arbeit an `site.config.json` die doppelten Abschnitte entfernen. Danach muss die Reihenfolge absteigend sein: r4-65, r4-64, r4-61, r4-60 …

## Bestätigt

### 1. Diff und Umbenennung

- **Geändert in `authoring/`:** nur `tools/contract.js` und `site.config.json`.
- **Nicht geändert:** Für Fragmente, Stylesheet, Skript, Tests, `selftest.mjs`, `layouttest.cjs`, `sprachtest.mjs`, `suchtest.mjs`, `search-index.mjs` und `build.mjs` ist `git diff --stat a55ecb1 19a72dc` leer. Wortlaut, Akuthinweise, Sprungziele und Suche sind unverändert, die Footer-Regeln von r4-64 bleiben erhalten.
- **`site/`:** Im Diff gibt es keine Zeile ohne `r4-64`/`r4-65`.
- **`contract.js`:** Auf `19a72dc` ist die Datei gleich wie auf `d6dd542`, dem nachgeprüften Stand von #790. Abgesehen von den Kennungen r4-62/r4-65 gibt `diff` keine Zeile aus. Die Umbenennung hat also keine Regel verändert.
- **Kennung:** `BUILD`, `assetVersion` und `independentReviewWaiver.version` stehen auf r4-65. «r4-62» kommt nur noch in `pendingScope` und `appliedTo` vor, als «begonnen als r4-62».
- **Pendenzendatei:** gleich wie nach #791 (`git diff --stat d20973b 19a72dc` leer).

### 2. Selbsttest und Gegenprobe

- `selftest.mjs` auf `19a72dc`: `122/122`.
- In Kopien ausserhalb des Repositorys sind Regeln auf den Stand von r4-61 zurückgesetzt. Die Ergebnisse bestätigen die Angaben im Selbstbericht:

| zurückgesetzt | Selbsttest | gescheiterte Fälle |
|---|---|---|
| `hiddenFlag` und SVG-Prüfung | 117/122 | die fünf neuen (2 × N61-1, 3 × N60-3) |
| nur `hiddenFlag` | 120/122 | die zwei N61-1-Fälle |
| nur SVG-Prüfung | 121/122 | «SVG unter einem Vorfahren mit hidden und eigener display-Regel» |

- Keine bisherige Selbsttestzeile ist entfernt oder geändert. Die Tests sind verschärft.

### 3. Abgleich mit Chromium, eigene Messung

`abgleich-svg.cjs` prüft 18 Mutationen: SVG in Zeile und Menü auf `index.html` und das Bild der Abbildung auf `verstehen.html`. Verglichen wird der Name des Links bzw. ob das SVG ein unbenanntes Bild ist, im Zugänglichkeitsbaum über CDP, mit dem Blocker des Gates.

| Gate | Übereinstimmung |
|---|---|
| r4-61 (`5cbaf1c`) | 12 von 18 |
| r4-65 (`19a72dc`) | **16 von 18** |

- **Neu richtig:**
  - **Direkteinstieg:** `<svg hidden aria-label="Pfeil">` und `<svg inert><title>` in Zeile und Menü. Chromium nennt den Link «Kurz und klar Pfeil», das Gate blockiert jetzt (L1, L2, M1, M2).
  - **Abbildung:** `hidden` oder `inert` am SVG selbst. Chromium zeigt ein Bild ohne Namen, das Gate meldet jetzt `figure-alt` (F2, F3).
- **Unverändert richtig:**
  - `aria-hidden` in jeder Form, die Chromium verbirgt (F4, F5, L3, L6), und `aria-hidden="false"` (F6);
  - `inert` an einem HTML-Vorfahren (F7);
  - ein SVG mit `<title>` (F9);
  - `<span hidden>` um ein SVG im Link (L4).
- **Die zwei Abweichungen sind bewusst streng und im Selbstbericht genannt:**
  - **L5:** `<svg><g hidden><title>Pfeil</title></g>` im Link heisst in Chromium «Kurz und klar». Das Gate blockiert, weil `hidden` im SVG nicht zählt (Q6.4/Q6.12 in #784).
  - **F8:** Bei einem SVG ohne `aria-hidden` in `<span hidden>` verbirgt Chromium das SVG. Das Gate meldet `figure-alt`, weil eine eigene `display`-Regel das `hidden` aufheben kann (Q5.17 in #784, Selbsttestfall «… eigener display-Regel»). r4-61 meldete hier nichts.
- **Falsch-Positive:** nur L5 und F8, beide gewollt. Falsch-Negative gibt es in diesen 18 Fällen keine.

### 4. Tests selbst ausgeführt (auf `19a72dc`)

| Befehl | Ergebnis |
|---|---|
| `build.mjs --production` | `24 Seiten · 0 Blocker · 20 Hinweise` |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `selftest.mjs` | `122/122` |
| `suchtest.mjs dist/site` | `216 von 216 … JS-Fehler 0` |
| `sprachtest.mjs` | `73 Prüfungen bestanden · JS-Fehler 0` |
| `layouttest.cjs` | Exit 1, `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen`, `tension core exceeds 1800px` (bekannte Ausnahme B2c) |
| axe-core 4.14.0, 24 Seiten, 390 × 844 und 1280 × 800 | `48 Läufe, Verstösse gesamt 0` |

### 5. CI und Live-Site

- **CI:** `build-and-compare` war auf `2810994` grün (09:30:22–09:31:09 UTC), vor dem Merge.
- **Live-Site** (Hinweis, keine Prüfstufe): `curl` um 11:02 UTC ergab `data-puk-site-build="r4-65"`.

## Hinweise ohne Befund

- **Bekannt und offen, nicht Gegenstand von r4-65:**
  - N62-2: `foreignObject` (`inSvg` endet nicht dort), in PR #795;
  - N61-2: `alt` und `value` im Linktext, in PR #787.

  `inSvg` auf `19a72dc` ist `x.tag === 'svg' || !!up(x, y => y.tag === 'svg')`, ohne Halt an `foreignObject`.
- **Doppelte Kennung r4-66:** #795 und #787 tragen beide r4-66. Vor dem zweiten Merge ist die Kennung neu zu vergeben.

## Nicht prüfbar

- Echter Screenreader, Firefox und Safari (insbesondere ob `hidden` an SVG dort wirkt), reale Geräte.
- Der mündliche Merge-Auftrag zu #784 (siehe N65-7).
- Fachliche, juristische und institutionelle Freigabe: nicht Gegenstand.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.** Die Regeln von r4-65 entsprechen dem nachgeprüften Stand `d6dd542`. In 16 von 18 eigenen SVG-Fällen stimmen sie mit Chromium überein, die zwei übrigen Fälle sind bewusst streng. Die Seiten ändern sich nur in der Kennung. N65-7 (Verfahren) und N65-8 (Text im Verzichtsvermerk) wirken nicht auf die Website.
