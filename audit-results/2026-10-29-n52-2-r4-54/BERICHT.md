# N52-2 · r4-54 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** «Nachbesserung N52-2 umsetzen». Ausgangsstand ist `main` = `37d8326` (r4-53; Nachprüfung r4-53 und Pendenzen sind gemergt). Der Befund stammt aus `audit-results/2026-10-29-nachpruefung-r4-52/NACHPRUEFUNG.md` (N52-2).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfungen r4-43 bis r4-51 und r4-53 erstellt und r4-52 gebaut hat. Für r4-54 ist sie nicht unabhängig. Eine Nachprüfung von r4-54 muss eine andere Sitzung machen.

## Befund

Seit r4-52 prüft das Gate die Direkteinstiege im Menü nur, wenn die Seite auch die Zeile `<nav aria-label="Direkteinstiege">` hat. Ob die Zeile selbst vorhanden ist und stimmt, prüfte keine Regel, denn `utility-nav` prüfte nur die Konfiguration. Fehlten Zeile und Menüeinträge zugleich, blieb das Gate grün. Dann gäbe es «Kurz und klar», «Nachschlagen» und «Suchen» auf dieser Seite bei keiner Breite.

## Umsetzung

`authoring/tools/contract.js`, im Gate je Seite vor der Prüfung der Hauptnavigation:

- **Neue Prüfung, Regel `utility-nav`:** Ist `utilityNav` konfiguriert, braucht jede veröffentlichte Seite ausser der Fehlerseite (`role: "not-found"`) die Zeile «Direkteinstiege».
  - Fehlt die Zeile, blockiert das Gate mit «Zeile «Direkteinstiege» fehlt».
  - Sind die Links der Zeile nicht genau die Seiten aus `utilityNav` in dieser Reihenfolge, blockiert es mit «Direkteinstiege weichen vom Seitenvertrag ab: …».
- **Neuer Selbsttestfall** «Zeile und Menüeinträge der Direkteinstiege fehlen (r4-54, N52-2)»: Er entfernt auf `index.html` Zeile und Menüeinträge und erwartet `utility-nav`. Der Selbsttest hat jetzt 89 statt 88 Fälle.
- **Unverändert:** die Regel aus r4-52 für die Einträge im Menü.
- **Build-Kennung r4-54:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut. Dort ändern sich nur die Build-Kennung und die Versionsangabe der Dateien (24 Seiten).

Kein Wortlaut, kein Stylesheet und kein Skript ist geändert. Die gerenderten Seiten sind bis auf die Build-Kennung gleich wie in r4-53.

## Wirkung, mit eigenen Mutationen geprüft

Meine Mutationen laufen über `C.gate` auf den gerenderten Seiten. Gezählt sind die Blocker `nav` und `utility-nav`:

| Mutation | r4-53 | r4-54 |
|---|---|---|
| Bestand | – | – |
| `index.html`: Zeile und Menüeinträge entfernt | **kein Blocker** | `utility-nav` |
| `index.html`: nur die Zeile entfernt | **kein Blocker** | `utility-nav` |
| `index.html`: Reihenfolge in der Zeile vertauscht | **kein Blocker** | `utility-nav` |
| 404-Seite (hat keine Zeile) | – | – |

Die zweite und dritte Zeile zeigen: Auch eine fehlende oder vertauschte Zeile allein fiel bisher nicht auf. Die Fehlerseite meldet die Regel nicht fälschlich.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium und Playwright über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien byte-gleich mit `site/` |
| Selbsttest | 89/89, darunter der neue Fall |
| Suchtest | 216 von 216 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c) |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte. Da sich am Rendern nichts ändert, gibt es keine neue Sichtprüfung und keinen neuen axe-Lauf.
