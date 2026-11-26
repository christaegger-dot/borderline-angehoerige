# r4-69 · Nachbesserung N815-2 bis N815-4 · 26.11.2026 · Selbstprüfung

**Auftrag von Christa Egger, 26.11.2026:** «Nachbesserung N815-2 bis N815-4 umsetzen». Die Befunde stammen aus der Nachprüfung von #815 ([PR #817](https://github.com/christaegger-dot/borderline-angehoerige/pull/817), `audit-results/2026-11-26-nachpruefung-pr-815/NACHPRUEFUNG.md`).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

- **Ausgangsstand:** `main` bei `b72d59d` (#819). Die Website steht auf r4-68 (#815). `site/` und `authoring/` sind seit `c7d8c01` unverändert, ausser `authoring/tools/layouttest.cjs` (#816).
- **Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfung #817 verfasst hat. Sie setzt ihre eigenen Befunde um. Prüfen muss eine andere Sitzung.
- **Umgebung:** Node 22.23.5, Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright`, Chrome Headless Shell 156.0.8078.4 (Revision 1248), axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.

## Entscheid zu N815-3

**Entscheid von Christa Egger, 26.11.2026:** «r4-67 übersprungen» (Antwort an diese Sitzung, auf GitHub nicht belegt). Die vorgelegte Option lautete: «r4-67 gilt als übersprungen. #795 wird bei einem Merge neu auf main gefasst, mit der nächsten freien Kennung (nach r4-69 also r4-70), und behält das Tag text-scale.»

Folge: Diese Nachbesserung ist **r4-69**, die nächste freie Kennung nach r4-68. Kein offener PR trägt r4-69. #795 selbst ist nicht geändert.

## Änderungen

- **N815-4** (`authoring/css/site.css`), zwei Regeln:
  - `.puk-site-sender__name` erhält `min-width:0;max-width:100%;overflow-wrap:anywhere`.
  - `.puk-site-info-links a,.puk-site-legal a` erhalten `overflow-wrap:anywhere`.
  - Beide Regeln haben einen Kommentar «r4-69».
  - Die Footer-Links hatte die Nachprüfung nicht genannt. Bei 300 % Schrift und 320 px sind «Barrierefreiheit» (341 px) und «Datenschutz» (287 px) breiter als die Spalte (280 px). Das wurde erst sichtbar, nachdem der Absendername behoben war: Die Seite lief dann nur noch um 41 statt um 138 px über (`verursacher.cjs`).
  - **Keine Silbentrennung.** Ein erster Entwurf setzte zusätzlich `hyphens:auto`. Dann trennte der Browser den Absendernamen schon bei 200 % Schrift und 390 px, und die Zeile wurde zweizeilig statt dreizeilig. Das ist eine Gestaltungsänderung über N815-4 hinaus. `overflow-wrap:anywhere` greift dagegen nur, wenn ein Wort sonst nicht passt.
- **Kennung r4-69:** `BUILD` in `authoring/tools/contract.js`. In `authoring/site.config.json` sind `assetVersion` und `independentReviewWaiver.version` geändert. `pendingScope` hat einen neuen Eintrag r4-69 vor der Kette. `appliedTo` ist ergänzt um «r4-68 am 26.11.2026 gemergt (PR #815), nachgeprüft in PR #817» und um den Eintrag r4-69. Er stützt sich wie frühere Releases auf den fortgeltenden Entscheid vom 18.10.2026. **Christa Egger muss das bestätigen.**
- **N815-2** (`PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`):
  - Die Kopfzeile ist auf `b72d59d` nachgeführt, mit #817, #818 und #819 (gemergt). #817 ist aus den offenen Entwürfen entfernt, #820 (Entwurf) ergänzt. Die Liste der offenen PRs ist gegen GitHub geprüft.
  - Der Abschnitt r4-68 ist um die Nachprüfung #817 ergänzt (Merge- und Codex-Zeiten, Ergebnis, Befunde); «Offen» ist nachgeführt.
  - Neu ist ein Abschnitt r4-69 mit dem Entscheid zu N815-3.
  - Einen Teil von N815-2 hatten schon #816 und #818 erledigt: #814, #815 und #816 als gemergt, GitHub-Zeile r4-68.
  - **Überschneidung:** [PR #820](https://github.com/christaegger-dot/borderline-angehoerige/pull/820) (Entwurf) ändert dieselbe Kopfzeile und den Absatz «Offen» bei r4-68. Wer zuletzt gemergt wird, muss zusammenführen.
- **`site/`:** neu gebaut.

Nicht geändert sind Wortlaut, Skript, Suche, Testdateien und #795.

## Wirkung

- **`site/`** gegen r4-68 (`git archive 7ec1921`):
  - 24 HTML-Seiten unterscheiden sich nur in der Kennung (r4-68 durch r4-69 ersetzt, sonst byte-gleich).
  - `css/site.css` hat nur die zwei Regeln und ihre Kommentare geändert.
  - Die übrigen 10 Dateien sind byte-gleich.
- **Lage und Grösse** von Absendername, Absenderzeile, Footer-Links und Rechtsangaben sowie die Seitenhöhe, r4-68 gegen r4-69. Gemessen auf allen 24 Seiten bei 9 Kombinationen aus Breite und Schrift (`rechtecke.txt`):
  - **Gleich bei 100 % Schrift** (320, 390, 768 und 1280 px): 96 von 96.
  - **Gleich bei 200 %** auf 390 und 1280 px: 48 von 48.
  - **320 px mit 200 %:** Nur die Breite des Absendernamens ist anders, 280 statt 289 px. Der Name ragte vorher um 9 px aus seiner Spalte. Höhe und Seitenhöhe sind gleich.
  - **300 %:** Der Absendername wird auf die Spaltenbreite begrenzt (280 bzw. 350 statt 438 px). Bei 320 px brechen auch die Footer-Links um. Die Seite wird dadurch länger.
- **Überlauf** (`skalierung-r4-69.json`, alle 24 Seiten, 320, 390 und 1280 px, 16, 32 und 48 px):
  - Waagrechter Überlauf: **0**. Vorher hatte jede Seite bei 300 % einen: +138 px bei 320 px, +68 px bei 390 px.
  - Abgeschnittener Text: 0. Das Meta-Tag steht auf allen 24 Seiten.
- **Rest:** Auf `verstehen.html` ist der Knopf «Auf dieser Seite · 7 Abschnitte» bei 320 px und 300 % innen 5 px breiter als sein Platz. Die Seite läuft nicht über, es wird kein Text verdeckt. Nicht in diesem Auftrag.
- Die Wirkung des Tags `text-scale` selbst ist hier weiterhin nicht messbar (N815-6).

## Ausgeführte Prüfungen (`gates.txt`, `axe-ausgabe.txt`)

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `Selbsttest: 125/125 bestanden` |
| Suchtest | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 27 Bedienproben, 0 Abweichungen.` (B2c bestanden, 1992 / 1603 px, Exit 0) |
| axe-core 4.14.0 mit `audit-results/2026-11-26-text-scale-r4-68/axe.cjs` | `build r4-69 · Seiten: 24 · Läufe: 96 · Verstösse: 0` |

Die Messskripte `skalierung.cjs` und `detail.cjs` liegen in `audit-results/2026-11-26-nachpruefung-pr-815/`. Neu sind `verursacher.cjs` (Elemente, die über den Rand ragen) und `vergleich-rechtecke.cjs` (r4-68 gegen r4-69). Die Aufrufe stehen jeweils im Kopf.
