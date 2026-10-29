# N54-1 und N54-2 · r4-55 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** «Nachbesserung N54-1 und N54-2 umsetzen».

- **Ausgangsstand:** `main` = `854bdbc`, also r4-54 mit gemergter Nachprüfung und Pendenzen.
- **Befunde:** aus `audit-results/2026-10-29-nachpruefung-r4-54/NACHPRUEFUNG.md` (N54-1, N54-2).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die auch r4-52 und r4-54 gebaut hat. Für r4-55 ist sie nicht unabhängig. Die Nachprüfung von r4-55 muss eine andere Sitzung machen.

## Befunde

- **N54-1 (gering):** Die Regel `utility-nav` aus r4-54 verglich nur die Linkziele und ihre Reihenfolge. Diese Fehler blieben deshalb ohne Blocker:
  - eine falsche Beschriftung;
  - eine Zeile ausserhalb des Kopfs;
  - eine zweite Zeile.

  Die Regel für die Einträge im Menü verglich ebenfalls nur Ziele.
- **N54-2 (gering, seit r4-51):** Ohne `utilityNav` rendert der Renderer als Rückfall «Website durchsuchen» mit `suche.html`, auch als Eintrag im Menü. Die Menüregel erwartete dann aber keinen Eintrag. Das ergab 23 falsche Blocker `nav`.

## Umsetzung

Alle Änderungen betreffen `authoring/tools/contract.js`:

- **Eine gemeinsame Berechnung:** `utilityEntriesOf(cfg)` berechnet die Direkteinstiege. Ist `utilityNav` gesetzt, sind es die veröffentlichten Seiten daraus. Ohne `utilityNav` gilt der bisherige Rückfall «Website durchsuchen». Der Renderer nutzt die Funktion statt seiner eigenen Berechnung, das Gate erwartet genau dieselben Einträge. Damit ist N54-2 behoben.
  - Die Beschriftung ergibt sich wie bisher aus `label` oder dem Seitentitel (`utilityLabel`).
  - Die gerenderten Seiten sind bis auf die Build-Kennung byte-gleich mit r4-54 (`diff` je Seite nach Ersetzen der Kennung, 24 Seiten, 0 Abweichungen).
- **Zeile «Direkteinstiege» (N54-1):** Auf jeder veröffentlichten Seite ausser der Fehlerseite verlangt das Gate jetzt:
  - genau eine Zeile;
  - im Kopf, innerhalb von `header` und `.puk-site-subbar`;
  - mit Zielen, Reihenfolge und Beschriftung nach `utilityEntriesOf`.
- **Einträge im Menü (N54-1):** Sie werden ebenfalls mit Zielen und Beschriftung verglichen.
- **Vier neue Selbsttestfälle:** Beschriftung in der Zeile falsch, Zeile doppelt, Zeile ausserhalb des Kopfs, Beschriftung im Menü falsch. Der Selbsttest hat jetzt 93 statt 89 Fälle.
- **Build-Kennung r4-55:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut, nur die Build-Kennung ändert sich.

Kein Wortlaut, kein Stylesheet und kein Skript ist geändert.

## Wirkung, mit eigenen Mutationen über `C.gate` geprüft

Die Fälle entsprechen denen der Nachprüfung r4-54 (K1, K2, M11–M13).

| Mutation | r4-54 (laut Nachprüfung) | r4-55 |
|---|---|---|
| Bestand | – | – |
| K1: `utilityNav` entfernt (Rückfall) | 23 × `nav`, falsch | **keiner** |
| K2: wie K1, Rückfallzeile auf `index.html` entfernt | 23 × `nav` (wie K1), Zeile nicht geprüft | `utility-nav`: «Zeile «Direkteinstiege» fehlt» |
| M11: Beschriftung «Kurz und klar» → «Mehr» | keiner | `utility-nav`: weicht ab |
| M12: Zeile in die Fusszeile verschoben | keiner | `utility-nav`: «steht nicht im Kopf» |
| M13: Zeile verdoppelt, zweite vertauscht | keiner | `utility-nav`: «steht 2-mal auf der Seite» |
| Fehlerseite | – | – |

Die Nachprüfung r4-54 nennt noch K3: Die Konfigurationsprüfung blockiere jede Konfiguration ohne `utilityNav` (`contract.js:320`). Das habe ich nicht geändert. Die Prüfung greift nur, wenn `utilityNav` gesetzt, aber leer oder ungültig ist. K1 ergibt mit r4-55 keinen Blocker `nav` oder `utility-nav`.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium und Playwright über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien byte-gleich mit `site/` |
| Selbsttest | 93/93, darunter die vier neuen Fälle |
| Suchtest | 216 von 216 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c) |
| Seitenvergleich | 24 Seiten bis auf die Build-Kennung gleich wie r4-54 |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte. Am Rendern ändert sich nichts, daher gibt es keinen neuen axe-Lauf.
