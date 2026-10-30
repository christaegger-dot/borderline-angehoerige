# N56-1 · r4-63 · 30.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «N56-1: Überschriften in Medium und Abstand vor Hinweis umsetzen». Der Befund stammt aus `audit-results/2026-10-30-nachpruefung-r4-55-r4-56/NACHPRUEFUNG.md` (N56-1). Ausgangsstand ist `main` = `aefdf06` (Build r4-60).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Rollenwechsel:** Diese Sitzung hat die Nachprüfung r4-55 und r4-56 erstellt und N56-1 gefunden. Jetzt baut sie r4-63 und ist dafür nicht unabhängig. Eine Nachprüfung von r4-63 muss eine andere Sitzung machen.

**Nummer:** r4-61 ([PR #780](https://github.com/christaegger-dot/borderline-angehoerige/pull/780)) und r4-62 ([PR #784](https://github.com/christaegger-dot/borderline-angehoerige/pull/784)) sind offen und noch nicht gemergt. Deshalb heisst dieser Stand r4-63. Die Pull Requests ändern alle die Build-Kennung in `site/`. Wer später mergt, muss `main` einbringen und neu bauen.

## Befund

Die Überschriften «Kontakt» und «Fachstelle Angehörigenarbeit» sahen aus wie der Text darunter: 16 px, Regular, `tinte-leise`, ohne Abstand. Der Pflichthinweis «Diese Website ersetzt keine individuelle Abklärung, Beratung oder Behandlung.» ging deshalb ohne Abstand in den Namen der Klinik über.

## Umsetzung

Geändert ist nur CSS, in `authoring/css/site.css` im Block der Fusszeile:

- **Überschriften:** `.puk-web-footer__heading` steht in `font-weight:var(--fw-medium)` (500) statt Regular. Grösse und Farbe bleiben: 16 px und `tinte-leise`.
- **Abstand vor dem Hinweis:** `.puk-web-footer__boundary` hat `margin-top:var(--space-2)`, also 8 px.
- **Silbentrennung:** In Medium ist «Angehörigenarbeit» breiter. Bei 320 px und 200 % Schrift passte das Wort nicht mehr in eine Zeile und brach mitten im Wort um, ohne Trennstrich («Angehörigenarbei|t»). Deshalb gilt neu `@media (max-width:22.5rem){.puk-web-footer__heading{hyphens:auto;hyphenate-limit-chars:8 4 4}}`. Die Breite ist dieselbe wie bei den Direkteinstiegen, die Grenzwerte sind dieselben wie beim Titel der Startseite. Jetzt wird «Angehörigenar-beit» getrennt (`vergleich-footer-320-200.png`).
- **Gestaltungsregeln:** In `authoring/DARSTELLUNGSREGELN.md` steht jetzt ein Satz zu r4-63.
- **Build-Kennung r4-63:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`.

Kein Wortlaut ist geändert, auch kein Aufbau, keine Farbe und keine Linkgestaltung.

## Messung

Gemessen sind alle 24 Seiten bei 320, 390, 768, 1100 und 1440 px, je mit Standardschrift und mit 200 % Schrift (`defaultFontSize=32`). Das ergibt 240 Zustände je Stand. Verglichen werden r4-60 (`main`, «vorher») und r4-63 («nachher»). Die Skripte liegen in `skripte/`, die Rohwerte in `messung.json.gz`, die Auswertung in `auswertung.txt`.

| Zustand | Footer vorher → nachher | Überschriften | kleinster Kontrast | kleinste Linkhöhe | Überlauf |
|---|---|---|---|---|---|
| 320 px | 489 → 497 px | 400 → **500** | 5,92 : 1 | 44 px | 0 |
| 390 px | 441 → 449 px | 400 → 500 | 5,92 : 1 | 44 px | 0 |
| 768 px | 309 → 317 px | 400 → 500 | 5,92 : 1 | 44 px | 0 |
| 1100 px | 241 → 249 px | 400 → 500 | 5,92 : 1 | 44 px | 0 |
| 1440 px | 217 → 225 px | 400 → 500 | 5,92 : 1 | 44 px | 0 |
| 320 px, 200 % | 1321 → 1377 px | 400 → 500 | 5,92 : 1 | 48 px | 0 |
| 390 px, 200 % | 1081 → 1089 px | 400 → 500 | 5,92 : 1 | 48 px | 0 |
| 768 px, 200 % | 649 → 657 px | 400 → 500 | 5,92 : 1 | 48 px | 0 |
| 1440 px, 200 % | 457 → 465 px | 400 → 500 | 5,92 : 1 | 48 px | 0 |

**Was die Zahlen zeigen:**
- Der Footer ist überall 8 px höher. Das ist der neue Abstand. Der Abstand ist in px festgelegt und wächst deshalb mit der Schrift nicht mit.
- Bei 320 px mit 200 % Schrift sind es 56 px. «Fachstelle Angehörigenarbeit» braucht dort drei statt zwei Zeilen, also 48 px mehr (`skripte/zeilen.cjs`).
- Kopf, Absenderzeile, Schriftgrössen und Kontrast sind unverändert.
- In keinem Zustand gibt es waagrechtes Scrollen.

**Fotos:**
- `vergleich-footer-1440.png`: oben vorher, unten nachher
- `vergleich-footer-390.png` und `vergleich-footer-320-200.png`: links vorher, rechts nachher
- `footer-1440-nachher-fokus.png`: Fokus auf «Kontakt und Beratungsangebot»

**Bedienung** (`skripte/fokus.cjs`):
- Das Fokusbild an allen sechs Footer-Links ist unverändert (`box-shadow`, 2 px weiss, 4 px Blau).
- Bei erzwungenen Farben ist die Linie schwarz, und die Links bleiben unterstrichen.
- Im Druck wird der Footer gedruckt, 212 statt 204 px hoch.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium und Playwright über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien byte-gleich mit `site/` |
| Selbsttest | 113/113 bestanden |
| Suchtest | 216 von 216 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c) |
| axe-core 4.14.0 | 0 Verstösse auf 24 Seiten bei 390 und 1280 px (48 Läufe), dazu 0 Verstösse mit 200 % Schrift und offenem Menü bei 320 und 1440 px (48 Läufe) |
| Wortlaut (r4-60 gegen r4-63, ohne Tags und `&shy;`) | 48 Dateien, 0 Abweichungen; je 6 × `data-responsibility-inline`, `tel:144`, `tel:117`; `id`-Attribute und `suche-ersttreffer.tsv` unverändert |

**Nicht geprüft:** echter Screenreader, Safari und Firefox, reale Geräte. Dort gibt es auch eine eigene Silbentrennung, die hier nicht geprüft ist.
