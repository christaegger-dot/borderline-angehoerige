# N66-1 bis N66-5 · r4-66 · 30.10.2026 · Nachbesserung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N66-1 bis N66-5 umsetzen».
- **Befunde:** aus der Nachprüfung r4-66 in [PR #800](https://github.com/christaegger-dot/borderline-angehoerige/pull/800), `audit-results/2026-10-30-nachpruefung-r4-66/NACHPRUEFUNG.md`. Die zweite Nachprüfung r4-66 ([PR #803](https://github.com/christaegger-dot/borderline-angehoerige/pull/803)) vergibt eigene Nummern N66-1 bis N66-4; gemeint sind hier die Nummern aus #800.
- **Entscheide von Christa Egger** (in dieser Sitzung, auf Rückfrage):
  - Ort: «Auf #787 selbst»; die Kennung bleibt r4-66;
  - zu N66-4: «Ja, sichtbaren Text verlangen».
- **Branch:** `pruefung/2026-10-30-nachpruefung-r4-61` (Name historisch), [PR #787](https://github.com/christaegger-dot/borderline-angehoerige/pull/787). Ausgangsstand ist `0cf8267`.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Diese Nachbesserung hat die Sitzung gebaut, die die Nachprüfung r4-66 in #800 verfasst hat. Sie prüft deshalb ihre eigene Arbeit. Eine Nachprüfung dieser Nachbesserung muss eine andere Sitzung machen.

## Änderungen

Geändert sind nur `authoring/tools/contract.js` und in `authoring/site.config.json` zwei Texte (siehe N66-5). Dazu kommen die Pendenzendatei und dieser Nachweis. `site/` ist unverändert, weil die Kennung r4-66 bleibt und die Texte nicht auf den Seiten stehen.

| Befund | Umsetzung in `contract.js` |
|---|---|
| N66-1 (`<img title>` ohne `alt`) | `imgTxt`: Bei einem Bild ohne `alt`-Attribut zählt der `title`, wie in Chromium. Mit `alt=""` zählt der `title` nicht, ebenfalls wie in Chromium. |
| N66-2 (Gate strenger als Chromium, Kommentar ungenau) | `imgTxt`: Bei `role="presentation"` oder `"none"` zählt das Bild nicht. `NONAME`: Der Inhalt von `noscript` und `template` zählt nicht. Eingabefelder bildet `accTxt` nicht mehr nach. Stattdessen blockiert `formCtl` jedes Formularelement (`input` ausser `type="hidden"`, `button`, `select`, `textarea`) im Direkteinstieg, auch verborgen oder unter `inert`. Der Kommentar nennt das als bewusste Strenge. Damit sind auch zwei Fälle aus #803 gedeckt: eine Schaltfläche unter `inert` und der Platzhalter einer leeren `textarea`. |
| N66-3 (`type="hidden"` ohne Selbsttest) | Die neue Gegenprobe enthält `<input type="hidden" value="Mehr">` in Zeile und Menü. |
| N66-4 (Bild oder Feld statt sichtbarem Text) | Neu ist `visTxt`: der sichtbare Text, in dem ein Bild nur als Zwischenraum zählt. `unlabelledText` blockiert, wenn er vom zugänglichen Namen abweicht. Ein Link, der nur aus einem Bild mit `alt` = Beschriftung besteht, ist nicht mehr zulässig. Verborgene Zusätze (P4.6) zählen weiter nicht. |
| N66-5 (Nummernhistorie) | In `pendingScope` und `appliedTo` steht jetzt «begonnen als r4-63, dann r4-65 in PR #787». |

Die Regel `unlabelledText` meldet in der Zeile `utility-nav`, im Menü `nav`. Die Meldung lautet: «… mit Formularelement oder ohne die Beschriftung als sichtbaren Text».

Neu im Selbsttest sind sechs Mutationen und eine Gegenprobe:

| Fall | erwartet |
|---|---|
| Bild ohne `alt`, mit `title` (N66-1) | `utility-nav` |
| Checkbox im Link (N66-2) | `utility-nav` |
| Menü: Schaltfläche unter `inert` (N66-2) | `nav` |
| leeres Textfeld mit Platzhalter (N66-2) | `utility-nav` |
| nur Bild mit `alt` = Beschriftung (N66-4) | `utility-nav` |
| Menü: nur Bild mit `alt` = Beschriftung (N66-4) | `nav` |
| Gegenprobe in Zeile und Menü: Bild mit `role="presentation"` und `alt`, Bild in `noscript` und `template`, `input type="hidden"`, Bild mit leerem `alt` zwischen zwei Wörtern | kein `nav`, kein `utility-nav` |

## Wirkung

- **Selbsttest:** `132/132` (vorher 125/125).
- **Jede neue Regel greift** (`gegenproben-ausgabe.txt`). Die Regeln wurden einzeln in einer Kopie von `authoring/` ausserhalb des Repositorys zurückgenommen:

| zurückgenommen | Ergebnis |
|---|---|
| `title` (N66-1) | `131/132` |
| Präsentationsrolle (N66-2) | `131/132` |
| `noscript`/`template` (N66-2) | `131/132` |
| `formCtl` (N66-2) | `128/132` |
| Ausnahme `type="hidden"` (N66-3) | `131/132` |
| sichtbarer Text (N66-4) | `130/132` |
| Zwischenraum für Bilder im sichtbaren Text | `131/132` |

- **Abgleich mit Chromium 153** (`chromium-abgleich-ausgabe.txt`, Skript `chromium-abgleich.mjs`, gleiche 61 Fälle wie in #800, Name des Links über CDP `Accessibility.getPartialAXTree`):
  - Kein Fall mehr, den das Gate durchlässt, obwohl Chromium einen anderen Namen bildet. Vorher war es einer: Bild mit `title`.
  - In 14 Fällen ist das Gate strenger als Chromium, alle gewollt: 12 Formularelemente, darunter verborgene, und zwei Direkteinstiege, deren Beschriftung nur als Bild bzw. nur als Feldwert dasteht (N66-4).
  - Bild mit `role="presentation"`, `noscript` und `template` stimmen jetzt mit Chromium überein.
- **Seiten:** `--write-site` ändert nichts in `site/` (`git status --porcelain site`: 0 Zeilen). Gate: 24 Seiten, 0 Blocker, 20 Hinweise.

## Ausgeführte Prüfungen

Lokal, Node 22.22.0, Playwright über `PLAYWRIGHT_MODULE`, axe-core 4.14.0 aus einem eigenen Ordner ausserhalb des Repositorys (`tests-ausgabe.txt`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site`, `site/` unverändert |
| `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `Selbsttest: 132/132 bestanden` |
| Suchtest (`dist/site`) | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` / `tension core exceeds 1800px` (bekannte Ausnahme B2c, Exit 1) |
| axe-core 4.14.0, 390 und 1280 px | `axe 4.14.0 · Build r4-66 · Seiten 24 · Läufe 48 · Verstösse 0` |

## Offen

- Nachprüfung dieser Nachbesserung durch eine andere Sitzung.
- Aus #803: N66-3 ist mit `formCtl` teilweise gedeckt; das Bild mit `title` entspricht N66-1 hier. Ob weitere Punkte aus #803 offen sind, hat diese Sitzung nicht beurteilt.
- Nicht geprüft: Screenreader, Safari und Firefox, reale Geräte.
