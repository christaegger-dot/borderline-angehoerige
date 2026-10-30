# N57-1 und N57-2 · r4-58 · 30.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N57-1 und N57-2 umsetzen».

- **Ausgangsstand:** `main` = `1bdea3a` (r4-57 mit Nachprüfung r4-57, PR #761, und Pendenzen, PR #759 und #760).
- **Befunde:** aus `audit-results/2026-10-29-nachpruefung-r4-57/NACHPRUEFUNG.md` (N57-1, N57-2).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfung r4-57 erstellt hat. Für r4-58 ist sie nicht unabhängig. Die Nachprüfung von r4-58 muss eine andere Sitzung machen.

## Befunde

- **N57-1 (gering):** Kommentare und die Namen der vier Selbsttestfälle zu N54-1 und N54-2 in `authoring/tools/contract.js` nannten «r4-55». r4-55 ist aber die Absenderzeile 16 px.
- **N57-2 (gering):** Die Regeln für die Direkteinstiege prüften nur den Textinhalt der Links. Diese Fälle blieben ohne Blocker:
  - die Zeile oder ein Eintrag mit `hidden` oder `aria-hidden="true"` verborgen;
  - ein `aria-label` am Link, das von der sichtbaren Beschriftung abweicht (WCAG 2.5.3).

## Umsetzung

Alle Änderungen betreffen `authoring/tools/contract.js`:

- **N57-1:** Die Stellen nennen jetzt «r4-57»: drei Kommentare (vorher `:24`, `:511`, `:534`) und vier Selbsttestnamen (vorher `:676–679`). Die Nachprüfung r4-57 spricht von «sechs Treffern»; es sind sieben Zeilen. Danach ergibt `grep -c 'r4-55' authoring/tools/contract.js` den Wert 0.
- **N57-2:** Zwei neue Hilfsfunktionen.
  - `concealed` gilt, wenn ein Element selbst oder ein Vorfahre `hidden` oder `aria-hidden="true"` trägt. `aria-hidden="false"` bleibt zulässig.
  - `relabelled` gilt, wenn ein Link `aria-label` oder `aria-labelledby` trägt.
  - **Zeile «Direkteinstiege»:** Blocker `utility-nav`, wenn die Zeile oder ein Link darin verborgen ist oder ein Link umbenannt ist.
  - **Einträge im Menü:** Blocker `nav`, mit denselben zwei Bedingungen.
- **Fünf neue Selbsttestfälle:** Zeile mit `aria-hidden`, Zeile mit `hidden`, Link der Zeile mit `aria-label`, Menüeintrag mit `aria-hidden` und Menüeintrag mit `aria-label`. Der Selbsttest hat jetzt 98 statt 93 Fälle.
- **Build-Kennung r4-58:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet und kein Skript ist geändert. Der Renderer ist nicht geändert.

## Wirkung

**Seiten:** Die 24 Seiten in `site/` sind bis auf die Build-Kennung byte-gleich mit r4-57. Geprüft mit `diff` je Seite nach Ersetzen der Kennung; 0 Abweichungen. `site/css` und `site/js` sind unverändert.

**Neue Fälle greifen:** Die fünf neuen Einträge habe ich in eine Kopie von r4-57 eingesetzt. Ergebnis mit den Regeln von r4-57: `Selbsttest: 93/98 bestanden`, genau diese fünf scheitern.

**Eigene Mutationen über `C.gate`** (Modus `production`, gerenderte Seiten wie in `build.mjs`; gezählt sind neue Blocker). Dazu habe ich die 39 Mutationen der Nachprüfung r4-57 wiederholt:
- 36 ergeben dasselbe wie mit r4-57;
- 3 sind neu blockiert: M15 (`aria-label` am Link), M16 (`aria-hidden` auf der Zeile) und M16b (`hidden` auf der Zeile).

| Mutation | r4-57 | r4-58 |
|---|---|---|
| X1 `aria-hidden` auf `.puk-site-subbar` (Vorfahre) | 1 × `sender` | zusätzlich 1 × `utility-nav` «verborgen» |
| X2 `aria-labelledby` an einem Link der Zeile | keiner | 1 × `utility-nav` |
| X3 `aria-hidden="false"` auf der Zeile | keiner | keiner |
| X4 `hidden` am `<li>` eines Menüeintrags | keiner | 1 × `nav` «im Menü … verborgen» |
| X5 ohne `utilityNav`, neu gerendert (Rückfall) | keiner | keiner |
| X6 `aria-hidden` auf dem ganzen Kopf | 1 × `sender` | zusätzlich je 1 × `utility-nav` und `nav` |

Damit gibt es keine Falsch-Positiven: weder beim Bestand noch beim Rückfall noch bei `aria-hidden="false"`.

**Grenze:** Die Regel prüft statisches HTML. Verstecken über das Stylesheet (z. B. `display: none`) erkennt sie nicht; das ist gewollt, weil das Stylesheet je nach Breite die Zeile oder die Menüeinträge ausblendet. Diese Umschaltung prüft der Layouttest.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium und Playwright über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | 98/98, darunter die fünf neuen Fälle |
| Suchtest (`dist/site`) | 216 von 216, JS-Fehler 0 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys) | 48 Läufe (24 Seiten, 390 und 1280 px), 0 Verstösse |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
