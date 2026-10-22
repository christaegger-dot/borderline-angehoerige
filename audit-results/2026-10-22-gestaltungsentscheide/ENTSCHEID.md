# Gestaltungsentscheide F3, F4 und P708-W6 · 22. Oktober 2026

Christa Egger hat im laufenden Chat am **22.10.2026 um 09:19 Uhr (Europe/Zurich)** erklärt:

> ich übernehme deine Empfehlungen: Deine Entscheide zu F3, F4 und W6: Überschriften in Rubik Medium, hellblaue Grundfläche und doppelter Fokusrahmen an den Einstiegskarten.

Bezug: [PR #708](https://github.com/christaegger-dot/borderline-angehoerige/pull/708), Stand `397c2d1`. Die übernommenen Empfehlungen lauteten:

| Punkt | Empfehlung (übernommen) |
| --- | --- |
| **F3** · Überschriften `h1`/`h2` in Rubik Medium (500) | Behalten. Weil das PUK-Profil Gestaltungsregeln nicht in einem einzelnen Website-Repository ändert, als Profilentscheid für alle Websites der Fachstelle im Design-System nachtragen. |
| **F4** · Grundfläche `#F5F7FF` | Behalten, mit Auflage: Auf getönten Flächen steht kein kleiner Text in Hausblau `#3C64FF` (4,40:1 auf `#F5F7FF`). Ebenfalls als Profilton im Design-System nachtragen. |
| **P708-W6** · doppelter Fokusrahmen an den Einstiegskarten | Nur noch ein Rahmen um die ganze Karte, nur bei Tastaturbedienung. |

## Umsetzung in diesem Repository

- **F3:** keine Änderung; `site.css` bleibt bei `font-weight` 500 für die Überschriften.
- **F4, Auflage:** Kontrastmessung aller sichtbaren Textelemente auf 23 Seiten bei 1280 px (Playwright 1.56.1, Chromium 141; Farbe gegen die nächste nicht transparente Hintergrundfarbe). Vor der Korrektur drei Stellen unter 4,5:1, alle neu durch PR #708 (`site/` = r4-39: keine):
  - E-Mail-Link der Absenderzeile auf `#F4F4F4`: 4,28:1, alle 23 Seiten
  - `index`, Einstieg: «Das Wichtigste kurz und klar lesen» auf `#F5F7FF`: 4,40:1
  - `verstehen`, Kasten «Was Sie tun können»: Link «Beratung» auf `#F0F3FF`: 4,25:1

  Korrektur: Links in Absenderzeile, Einstieg und «Was Sie tun können» in `--puk-blue-125` (`#2B4FE0`), wie die Fusszeilenlinks seit Nachbesserung 1. Nachmessung: keine Stelle unter 4,5:1.
- **W6:** Bei Browsern mit `:has()` zeigt die Karte den Rahmen nur, wenn ihr Link per Tastatur fokussiert ist; der Ring am Linktext entfällt. Ohne `:has()` bleibt der bisherige Doppelrahmen als Rückfall, der Fokus bleibt sichtbar. Nachmessung: Tastatur 3 px `#3C64FF` um die Karte, Link ohne Ring; erzwungene Farben 3 px Systemfarbe; Mausklick ohne Rahmen.

## Offen

- Profilentscheid F3 und F4 im Design-System «PUK Zürich Website-Profil» nachtragen (Änderungsprotokoll, neues Profilpaket). Nicht Teil dieses Repositorys.
- Die unabhängige Nachprüfung von PR #708 umfasst auch diese Änderungen.
