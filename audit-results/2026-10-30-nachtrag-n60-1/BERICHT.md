# Nachtrag zu N60-1 · 30.10.2026 · zwei Selbsttestfälle

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N60-1 umsetzen». Ausgangsstand ist `main` = `2e3530d` (r4-60 mit Nachprüfung r4-60, PR #778). Der Befund stammt aus `audit-results/2026-10-30-nachpruefung-r4-60/NACHPRUEFUNG.md` (N60-1).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat dieselbe Sitzung, die die Nachprüfung r4-60 erstellt und N60-1 gemeldet hat. Für diesen Nachtrag ist sie nicht unabhängig. Weil nur zwei Selbsttestfälle dazukommen und Gate, Renderer und Seiten unverändert bleiben, entscheidet Christa Egger, ob eine eigene Nachprüfung nötig ist.

## Befund

N60-1 (gering): Zwei Verhaltensweisen von r4-60 waren durch keinen Selbsttestfall abgesichert, nur durch das Mutationsskript des Selbstberichts r4-60:
- Die behobene Falschmeldung P4.6: Ein verborgener Zusatz im Linktext, etwa `<span aria-hidden=" true "> →</span>`, zählt nicht zur Beschriftung.
- `aria-hidden=" false "` mit Leerraum verbirgt wie in Chromium.

Eine spätere Änderung an `hiddenFlag` oder `accTxt` hätte beides unbemerkt zurückdrehen können.

## Änderung

- **`authoring/tools/contract.js`:** zwei neue Zeilen im Selbsttest, 113 statt 111. Gate und Renderer sind nicht geändert.
  - **«Verborgener Zusatz im Linktext zählt nicht zur Beschriftung»:** `<span aria-hidden=" true "> →</span>` im Link «Kurz und klar» der Zeile auf `index.html`. Erwartet: kein `nav`, kein `utility-nav`.
  - **«Zeile mit aria-hidden=" false " gilt als verborgen»:** an der Zeile «Direkteinstiege» auf `index.html`. Erwartet: `utility-nav`.
- **Stelle im Selbsttest:** nach der Prüfung der Textfassung, nicht neben den Fällen von r4-58 bis r4-61. So überschneidet sich die Änderung nicht mit dem offenen PR #780 (r4-61).
- **Build-Kennung:** bleibt r4-60. `site/` ist neu gebaut und unverändert.
- **Pendenzendatei:** nicht geändert, weil PR #776 und PR #780 sie gerade nachführen.

## Wirkung

Die zwei Fälle greifen. Geprüft ist das in Kopien ausserhalb des Repositorys:

| Fassung von `hiddenFlag` | Selbsttest | gescheiterte neue Fälle |
|---|---|---|
| r4-60 (`main`) | 113/113 | keiner |
| r4-59 (nur `true`, jede Schreibweise) | 109/113 | beide, dazu zwei Fälle von r4-60 |
| r4-60, aber mit `.trim()` vor dem Vergleich | 112/113 | `aria-hidden=" false "` |

Der zweite Fall sichert also auch die Regel «Leerraum wird nicht entfernt» ab. Chromium verbirgt bei `" false "`; gemessen in der Nachprüfung r4-60.

**Zusammen mit PR #780:** Die Änderung lässt sich ohne Konflikt auf den Branch von #780 anwenden (`git apply --3way`). Der Selbsttest ergibt dort 116/116.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium und Playwright über `PLAYWRIGHT_MODULE`, auf dem Endstand:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise; `git status` danach ohne Änderung in `site/` |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien byte-gleich mit `site/` |
| Selbsttest | 113/113 |
| Suchtest | 216 von 216 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c) |

**Nicht Gegenstand:** N60-2 (Pendenzendatei, in #776 und #780 in Arbeit) und N60-3 (Nachtrag einer anderen Sitzung zur Nachprüfung r4-60, noch nicht gemergt).
