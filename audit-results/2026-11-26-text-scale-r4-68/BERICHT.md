# r4-68 · Schriftgrösse des Betriebssystems (`text-scale`) · 26.11.2026 · Selbstprüfung

**Auftrag von Christa Egger, 26.11.2026:** «Setz Punkt 1 hier in einem PR um».

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

- **Ausgangsstand:** `main` bei `c937f8e` (#813), Website r4-66.
- **Kennung:** r4-67 ist durch [PR #795](https://github.com/christaegger-dot/borderline-angehoerige/pull/795) belegt (Entscheid vom 30.10.2026), darum r4-68.
- **Unabhängigkeit:** Gebaut von der Sitzung, die #809 und #813 gebaut hat. Prüfen muss eine andere Sitzung.
- **Umgebung:** Node 22.23.5, Playwright 1.64.0, Chrome Headless Shell 156.0.8078.4 (Revision 1248), axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.

## Anlass: Rückmeldung zum Abgleich mit «Modern Web Guidance»

Christa Egger hat eine Rückmeldung mit neun Punkten eingefügt. Geprüft gegen `authoring/` und `site/` auf `c937f8e`:

| Punkt | Befund in diesem Repository |
|---|---|
| 1 · `<meta name="text-scale" content="scale">` | fehlte; **umgesetzt** |
| 2 · mitlaufende Kapitelleiste 74 px | keine mitlaufende Kapitelleiste auf kleinen Bildschirmen; mitlaufend ist nur die Seitenleiste ab 72rem (`site.css:730`) |
| 3 · Statusmeldung «… wurden kopiert.» | weder Kopierknöpfe noch dieser Text in `authoring/` oder `site/` |
| 4 · `text-wrap: pretty`/`balance` | schon umgesetzt (`site.css:394`, `688`, `746`, `747`, `1215`) |
| 5 · Brotkrümel als Liste | schon umgesetzt: 22 Seiten mit `<ol>` und `aria-current="page"` |
| 6 · Lesefortschritt per CSS | kein Fortschrittsbalken vorhanden |
| 7 · Menü mit `details`/`summary` | das Hauptmenü ist ein `div` mit Knopf (`puk-disclosure`), kein `details` |
| 8 · Kapitelleiste ausblenden | siehe Punkt 2 |
| 9 · Überblendung, Vorabladen | nicht vorhanden; die Rückmeldung rät selbst davon ab |

Die Rückmeldung betrifft vermutlich eine andere Website. Belegt ist das nicht.

## Änderung

- **`authoring/tools/contract.js`:** Im Seitenrahmen steht nach `viewport` die Zeile `<meta name="text-scale" content="scale">`, mit Kommentar «r4-68». Ausserdem `BUILD = 'r4-68'`.
- **`authoring/site.config.json`:**
  - `assetVersion` und `independentReviewWaiver.version` stehen auf r4-68.
  - `pendingScope` hat einen neuen Eintrag r4-68 vor der Kette.
  - `appliedTo` ist ergänzt um «r4-66 am 30.10.2026 gemergt (PR #787)» und den Eintrag r4-68. Er stützt sich wie frühere Releases auf den fortgeltenden Entscheid vom 18.10.2026. **Christa Egger muss das bestätigen.**
- **`site/`:** neu gebaut.
- **Pendenzendatei:** neuer Abschnitt r4-68. Nachgeführt sind ausserdem die Kopfzeile und der Status von #813 (gemergt als `c937f8e`, 16:11:04 UTC).

Nicht geändert sind Wortlaut, Stylesheet, Skript, Suche und Testdateien.

**Voraussetzungen aus dem Leitfaden `respect-os-text-scale`:**
- «Do not set a custom font size on `:root` or `html`» ist am Bildschirm erfüllt; `html{font-size:81.25%}` steht nur in `@media print`.
- Die Schriftgrössen sind `rem`-basiert. Die Tokens in `px` (`site.css:188`, `299`) werden später mit `rem` überschrieben (`site.css:340`, `341`, `385`).
- Fliessende Grössen mischen `rem` und `vw` (`site.css:886`, `894`), wie es der Leitfaden zulässt.
- Gemessen bei 390 px, `verstehen.html`: Mit Standardschrift 16 px ergeben sich `html` 16 px, `body` 17 px, Absatz 20 px und `h1` 32 px. Mit 32 px Standardschrift verdoppeln sich alle Werte (32, 34, 40 und 64 px).

## Wirkung

- In `site/` sind die 24 HTML-Seiten geändert, darunter `404.html`. Ersetzt man in der alten Fassung r4-66 durch r4-68, bleibt als einziger Unterschied je Seite die neue Zeile 6 `<meta name="text-scale" content="scale">`. Die übrigen 11 Dateien sind unverändert.
- Die Wirkung des Tags ist hier **nicht messbar**: Chromium auf dem Desktop kennt keine Schriftgrösse des Betriebssystems. Geprüft ist stattdessen die Darstellung mit doppelter Schrift, im Layouttest und mit axe. Eine Prüfung auf einem echten Gerät steht aus (Android, Chrome, vergrösserte Systemschrift).

## Ausgeführte Prüfungen

Ausgaben in `tests-ausgabe.txt` und `axe-ausgabe.txt`; das axe-Skript `axe.cjs` ist aus `audit-results/2026-10-30-nachpruefung-r4-64/axe-r4-64.cjs` übernommen.

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `Selbsttest: 125/125 bestanden` |
| Suchtest | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 27 Bedienproben, 0 Abweichungen.` (B2c bestanden, Exit 0) |
| axe-core 4.14.0, 390 und 1280 px mit Standardschrift, 320 und 1440 px mit 200 % Schrift | `build r4-68 · Seiten: 24 · Läufe: 96 · Verstösse: 0` |
