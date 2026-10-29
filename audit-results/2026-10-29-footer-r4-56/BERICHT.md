# Dezenter Footer · r4-56 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** «ich will einen sehr dezenten footer». Den Entwurf hat sie mit Vergleichsbildern gesehen und entschieden: «16 px, grau». Gemeint sind die Kontaktzeile in 16 statt 19 px und die Footer-Links in Grau statt Blau. Ausgangsstand ist der Branch von PR #753 mit r4-55 (Absenderzeile 16 px), auf `main` = `d5229c6` (r4-54).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung. **Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte, axe-core, Druck auf Papier.

## Was sich ändert

Nur CSS, im bestehenden Footer-Block von `authoring/css/site.css`. Die Regeln sind dort ersetzt, nicht angehängt. Der Wortlaut ist unverändert, der Aufbau auch (Renderer, Gate, `site.config.json` › `footer`).

| | vorher (r4-55) | nachher (r4-56) |
|---|---|---|
| Fläche | `flaeche-grau` | keine; oben eine Haarlinie in `linie` |
| Abstand innen | 40 / 48 px oben / unten | 24 / 32 px |
| Überschriften «Kontakt», «Fachstelle Angehörigenarbeit» | 17 px Medium, `tinte` | 16 px Regular, `tinte-leise` |
| «Kostenlose und vertrauliche Beratung für Angehörige.» | 19 px, `tinte` | 16 px, `tinte-leise` |
| Übriger Text | 16 px, `tinte` | 16 px, `tinte-leise` |
| Links | `blau-125`, «Kontakt und Beratungsangebot» Medium mit Pfeil | `tinte-leise`, unterstrichen, Regular, ohne Pfeil; Hover in `tinte` mit dickerer Unterstreichung |
| Trennlinie vor «Stand» | ja | nein; «Stand», «Impressum · Datenschutz» stehen in einer Zeile, schmal untereinander |
| Zielflächen der Links | 44 px | 44 px |

`authoring/DARSTELLUNGSREGELN.md` nennt die neue Form. Die Build-Kennung r4-56 steht in `contract.js`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. r4-55 und r4-56 gehen zusammen online.

**Bezug zum PUK-Website-Profil:** Leitlinie 03 hält fest, dass Ruhe im Footer durch knappen Inhalt und Abstände entsteht, nicht durch kleinere Leseschrift. Kontakt- und Zuständigkeitstexte gelten dort als Lesetext. Die Kontaktzeile ist jetzt kleiner (16 statt 19 px). Das hat Christa Egger nach diesem Hinweis so entschieden. Der übrige Footer stand schon vorher in 16 px. Ebenso entschieden sind die grauen Links. Das Gestaltungssystem «Borderline Angehörige» nennt Blau als Linkfarbe; es wird nach dem Merge für den Footer nachgeführt.

## Messung

Gemessen sind alle 24 Seiten über einen lokalen Webserver in Chromium. Die Breiten sind 320, 390, 768, 1100 und 1440 px, je mit Standardschrift und 200 % Schrift (`defaultFontSize=32`), zusammen 240 Zustände je Stand. Das Skript liegt in [`messung.cjs`](messung.cjs), die Rohwerte in [`messwerte.json`](messwerte.json).

| Zustand | Footer vorher | Footer nachher |
|---|---|---|
| 320 px | 622 px | 489 px |
| 390 px | 574 px | 441 px |
| 768 px | 401 px | 309 px |
| 1100 px | 357 px | 241 px |
| 1440 px | 333 px | 217 px |
| 320 px, 200 % | 1575 px | 1321 px |
| 390 px, 200 % | 1288 px | 1081 px |
| 1440 px, 200 % | 637 px | 457 px |

| Prüfgrösse | vorher | nachher |
|---|---|---|
| Schriftgrössen im Footer | 16, 17, 19 px (200 %: 32, 34, 38 px) | nur 16 px (200 %: 32 px) |
| kleinster Kontrast Text/Hintergrund | 5,52 : 1 | 5,92 : 1 (`tinte-leise` auf Weiss) |
| Links unter 44 px Höhe | 0 | 0 |
| waagrechtes Scrollen | 0 Zustände | 0 Zustände |
| Hintergrund des Footers | `flaeche-grau` | transparent (Weiss der Seite) |

- **Druck** (Chromium-Druckansicht, «Grenzen setzen»): Der Footer steht grau auf Weiss mit Haarlinie, alle Angaben vorhanden ([`grenzen-1440-druck.png`](grenzen-1440-druck.png)).
- **Erzwungene Farben** (390 px): Text, Links und Linie stehen in den Systemfarben, die Links bleiben unterstrichen ([`grenzen-390-erzwungene-farben.png`](grenzen-390-erzwungene-farben.png)).

## Ausgeführte Prüfungen

| Prüfung | Ergebnis |
|---|---|
| Selbsttest | 89/89 bestanden |
| Produktionsgate | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| Parität `--verify-site` | bestanden, 35 Dateien byte-gleich mit `site/` |
| Suchtest | 216 von 216 Erwartungen |
| Sprach-/UI-Test | 73 Prüfungen bestanden, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, Ausnahme B2c) |

## Beilagen

- `vergleich-grenzen-1440.png`, `vergleich-index-1440.png`: oben vorher, unten nachher
- `vergleich-grenzen-390.png`, `vergleich-grenzen-390-200prozent.png`: links vorher, rechts nachher
- `grenzen-1440-druck.png`, `grenzen-390-erzwungene-farben.png`
- `messung.cjs`, `messwerte.json`
