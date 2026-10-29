# Absenderzeile 16 px · r4-55 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** «setz die Absenderzeile auf 16 px». Anlass ist die Nachführung des Gestaltungssystems «Borderline Angehörige» auf r4-53. Dabei zeigte sich, dass die Absenderzeile im Kopf 15 px gross war. Das System verlangt: «Nichts unter 16 px (`klein`), auch keine Quellen und keine Legenden.» Ausgangsstand `main` = `d5229c6` (r4-54). Begonnen auf `fe745f9` (r4-53) als r4-54; weil eine andere Sitzung inzwischen r4-54 (N52-2, nur Gate) veröffentlicht hatte, ist `main` eingebracht und die Änderung heisst r4-55. r4-54 ändert kein CSS, die Messung «vorher» gilt also für r4-53 und r4-54.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung. **Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte, axe-core.

## Was sich ändert

- **`authoring/css/site.css`:** `.puk-site-sender` hat `font-size:1rem` statt `.9375rem`, mit Kommentar und Auftrag. Das gilt für «Eine Orientierungshilfe der», den Namen, «Beratung:» und den E-Mail-Link.
- **Build-Kennung r4-55:** in `contract.js`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`.
- **Kein Wortlaut geändert.** Farben, Abstände, Zielfläche des E-Mail-Links (44 px) und die Direkteinstiege bleiben gleich.

## Messung

Gemessen sind alle 24 Seiten aus `site/`, über einen lokalen Webserver in Chromium. Die Breiten sind 320, 390, 768, 1100 und 1440 px, je mit Standardschrift und mit 200 % Schrift (`defaultFontSize=32`), zusammen 240 Zustände je Stand. Das Skript liegt in [`messung.cjs`](messung.cjs), die Rohwerte stehen in [`messwerte.json`](messwerte.json). Die Kopfhöhe ist für Seiten ohne Brotkrumen und mit Brotkrumen getrennt angegeben, wo sie sich unterscheidet.

| Zustand | Schrift der Zeile | Kopf vorher (r4-53, r4-54) | Kopf nachher (r4-55) |
|---|---|---|---|
| 320 px | 15 → 16 px | 169 / 213 px | **195 / 239 px** |
| 390 px | 15 → 16 px | 147 / 191 px | 148 / 192 px |
| 768 px | 15 → 16 px | 147 / 191 px | 148 / 192 px |
| 1100 px | 15 → 16 px | 130 / 174 px | unverändert |
| 1440 px | 15 → 16 px | 138 px | unverändert |
| 320 und 390 px, 200 % | 30 → 32 px | 418 px | 435 px |
| 768 px, 200 % | 30 → 32 px | 288 / 339 px | 296 / 347 px |
| 1100 und 1440 px, 200 % | 30 → 32 px | 245 / 296 px | 250 / 301 px |

- **320 px:** «Fachstelle Angehörigenarbeit der PUK» passt nicht mehr in eine Zeile, «der PUK» rutscht auf eine zweite Zeile. Der Kopf wird dadurch 26 px höher. Ab 390 px steht der Name weiter in einer Zeile. Siehe [`kopf-320-vorher-nachher.png`](kopf-320-vorher-nachher.png) und [`kopf-390-vorher-nachher.png`](kopf-390-vorher-nachher.png).
- **1440 px:** Absenderin und Direkteinstiege stehen weiter in einer Zeile ([`kopf-1440-nachher.png`](kopf-1440-nachher.png)).
- **200 % Schrift:** Die Adresse bricht wie vorher mitten im Wort um ([`kopf-390-200prozent-vorher-nachher.png`](kopf-390-200prozent-vorher-nachher.png)).
- **In keinem der 240 Zustände** gibt es waagrechtes Scrollen oder abgeschnittenen Text, vorher wie nachher.
- **Der E-Mail-Link** ist bei Standardschrift 44 × 228 px gross (vorher 44 × 213 px).
- **Nach dem Einbringen von `main` (r4-54)** neu gebaut und erneut gemessen: alle 240 Zustände gleich wie bei der ersten Messung.

Bei einer ersten Messung über `file://` meldete die 404-Seite bei 200 % Schrift einen Überlauf. Ursache: Die Seite lädt ihr Stylesheet mit absolutem Pfad (`/css/site.css`), der über `file://` nicht gefunden wird. Über den Webserver gab es keinen Überlauf. Das war kein Befund.

## Ausgeführte Prüfungen

| Prüfung | Ergebnis |
|---|---|
| Selbsttest | 89/89 bestanden (mit dem neuen Fall aus r4-54) |
| Produktionsgate | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| Parität `--verify-site` | bestanden, 35 Dateien byte-gleich mit `site/` |
| Suchtest | 216 von 216 Erwartungen |
| Sprach-/UI-Test | 73 Prüfungen bestanden, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, Ausnahme B2c) |

## Hinweis, nicht geändert: weitere Texte unter 16 px

Eine Durchsicht aller 24 Seiten bei 320, 390 und 1440 px mit Standardschrift findet weitere sichtbare Texte unter 16 px. Ausgenommen sind ausgeblendete und für Screenreader verborgene Texte.
- **13 px:** Schlüssel und Etiketten in Abbildungen, zum Beispiel `puk-say__label`, `bl-stufen__key`, `bl-caremap__key`, `puk-vis-compare__key`, Nummernmarken und `bl-buch__label`.
- **15 px:**
  - Direkteinstiege unter 22,5 rem (`.puk-site-utility__link`)
  - «Geprüft am» (`puk-site-reviewed`, `time`)
  - Filterstatus und Datenschutzhinweis der Suche
  - aufklappbare Titel (`summary`) und Bildlegenden
  - Sätze in Abbildungen und Tabellen, darunter der sichtbare Schutzsatz `bl-fig-schutz`

Diese Werte bestanden schon vor r4-55 und sind nicht Teil dieses Auftrags. Ob die Regel des Gestaltungssystems «Nichts unter 16 px» auch für sie gilt oder ob das System Ausnahmen nennt, entscheidet Christa Egger.

## Beilagen

- `kopf-320-vorher-nachher.png`, `kopf-390-vorher-nachher.png`, `kopf-390-200prozent-vorher-nachher.png`: jeweils links r4-53, rechts die neue Fassung, «Grenzen setzen»
- `kopf-1440-nachher.png`
- `messung.cjs`, `messwerte.json`
