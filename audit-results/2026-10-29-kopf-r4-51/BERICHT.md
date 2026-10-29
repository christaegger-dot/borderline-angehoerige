# Kopf bei grosser Schrift · r4-51 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** «ja, setz P4-1 um». Befund P4-1 stammt aus Prüfschritt 4 ([`../2026-10-29-pruefschritt4-r4-50/BERICHT.md`](../2026-10-29-pruefschritt4-r4-50/BERICHT.md)). Bei 320 und 390 px mit 200 % Schrift war der Kopf 562 bzw. 514 px hoch. Ausgangsstand `main` = `da488fa` (r4-50).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung. **Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.

## Was sich ändert

Unter 20 rem stehen die Direkteinstiege «Kurz und klar», «Nachschlagen» und «Suchen» im Menü, unter den fünf Bereichen und durch eine Linie abgesetzt. Die eigene Zeile unter dem Kopf entfällt dann. 20 rem entsprechen bei 200 % Schrift allen Handybreiten bis 640 px, bei Standardschrift erst Breiten unter 320 px. **Bei Standardschrift ändert sich also nichts.**

Die Absenderin bleibt im Kopf, wie es das Profil verlangt. Kein Wortlaut ist geändert.

**Technisch:**

- `authoring/tools/contract.js`:
  - **Renderer:** Er schreibt die Direkteinstiege zusätzlich als `li.puk-site-menu__utility` mit `a.puk-web-nav__link.puk-site-menu__utility-link` ins Menü. `aria-current` gilt wie in der Zeile unter dem Kopf.
  - **Gate:** Es zählt als Hauptpunkte nur noch die Links ohne `puk-site-menu__utility-link`. Die Direkteinstiege im Menü müssen genau `utilityNav` entsprechen, sonst blockiert das Gate.
  - **Selbsttest:** Neu ist der Fall «Direkteinstieg im Menü weicht vom Seitenvertrag ab», der Selbsttest hat damit 87 Fälle.
- `authoring/css/site.css`:
  - Über 20 rem sind die Einträge im Menü ausgeblendet (`display:none`), darunter die Zeile unter dem Kopf.
  - Damit ist immer genau eine Fassung sichtbar und im Barrierefreiheitsbaum.
  - Im Menü stehen die Einträge in Blau und sind mit einer Linie in Schwarz 50 abgesetzt.
- `authoring/js/interaktion.js`: Die Pfeiltasten im Menü überspringen ausgeblendete Links.
- **Build-Kennung r4-51:** in `contract.js`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`.

## Messung

Gemessen auf «Grenzen setzen», auf der Startseite und auf «Kurz und klar», jeweils mit JavaScript.

| Zustand | Kopf vorher | Kopf nachher |
|---|---|---|
| 320 px, 200 % Schrift | 562 px | **418 px** |
| 390 px, 200 % Schrift | 514 px | **418 px** |
| 768 px, 200 % Schrift | 339 px | 339 px (über 20 rem, unverändert) |
| 320 / 390 / 768 / 1440 px, Standardschrift | 213 / 191 / 191 / 138 px | unverändert |

- **Tastatur, 320 px mit 200 % Schrift:** Pfeil nach unten geht von «Menü» über Verstehen, Im Alltag, Krisen, Familie und Für Sie zu Kurz und klar, Nachschlagen und Suchen.
- **Tastatur, 390 px mit Standardschrift:** nur die fünf Bereiche; die ausgeblendeten Einträge werden übersprungen.
- **Barrierefreiheitsbaum** bei 320 px mit 200 % Schrift und offenem Menü: die acht Links in der Hauptnavigation, keine zweite Liste der Direkteinstiege.
- **Ohne JavaScript:** Die Liste ist offen wie bisher. Unter 20 rem stehen die acht Links dort, darüber fünf Links und die Zeile. Waagrechtes Scrollen gibt es in keinem Zustand.

## Ausgeführte Prüfungen

| Prüfung | Ergebnis |
|---|---|
| Selbsttest | 87/87 bestanden (neu: Direkteinstieg im Menü weicht vom Seitenvertrag ab) |
| Produktionsgate | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| Parität `--verify-site` | bestanden, 35 Dateien byte-gleich mit `site/` |
| Suchtest | 216 von 216 Erwartungen |
| Sprach-/UI-Test | 73 Prüfungen bestanden, JS-Fehler 0 |
| Layouttest | 240 Zustände, 25 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, Ausnahme B2c); dazu die Probe «ohne JavaScript fünf Navigationslinks sichtbar» bei 375 px |

## Bildschirmfoto

- `kopf-320-200prozent-vorher-nachher-menue.png`: 320 px mit 200 % Schrift auf «Grenzen setzen». Links vorher, Mitte nachher, rechts das geöffnete Menü mit den Direkteinstiegen und dem Fokus auf «Suchen».
