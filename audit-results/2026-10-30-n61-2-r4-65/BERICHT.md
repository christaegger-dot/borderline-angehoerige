# N61-2 · r4-65 · 30.10.2026 · Umsetzung und Selbstprüfung

> **Umbenannt (30.10.2026):** Dieser Stand (`f7f8d18`) ist nachgeprüft (Nachprüfung r4-65, PR #793). Weil r4-65 inzwischen #784 auf `main` trägt, ist er auf Entscheid von Christa Egger («#787 als r4-66 neu fassen») als r4-66 neu gefasst, mit unveränderter Regel: [`audit-results/2026-10-30-n61-2-r4-66/BERICHT.md`](../2026-10-30-n61-2-r4-66/BERICHT.md).

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N61-1 bis N61-3 umsetzen». Nach N62-1 der Nachprüfung r4-62 (PR #790) hat sie entschieden: «#787 neu fassen, dann prüfen».

- **Befund:** N61-2 aus `audit-results/2026-10-30-nachpruefung-r4-61/NACHPRUEFUNG.md` (PR #785).
- **Nicht mehr hier:**
  - N61-1 setzt r4-62 in der Neufassung um (#784, `d6dd542`).
  - N61-3 ist mit PR #789 erledigt.
- **Ausgangsstand:** r4-62 neu gefasst ([PR #784](https://github.com/christaegger-dot/borderline-angehoerige/pull/784), `d6dd542`), danach `main` (`a55ecb1`, r4-64 mit #788 und #790) per Merge eingebracht.
- **Branch:** `pruefung/2026-10-30-nachpruefung-r4-61`, PR [#787](https://github.com/christaegger-dot/borderline-angehoerige/pull/787), Ziel weiterhin der Branch von #784.
- **Erste Fassung:** r4-63 (`f2fac13`, Nachweis `audit-results/2026-10-30-n61-1-n61-3-r4-63/`) ist durch diesen Stand ersetzt. Sie ist dort als überholt gekennzeichnet.
  - **`contract.js`, `site.config.json` und `site/`:** im ersten Merge-Commit auf den Stand von #784 zurückgesetzt.
  - **Pendenzendatei:** stammt nach dem zweiten Merge aus `main`.
- **Nummer:** r4-65. r4-63 trägt die erste Fassung dieses PR, r4-64 ist #788 (auf `main`).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfung r4-61 verfasst und N61-2 gestellt hat. Die Nachprüfung von r4-65 muss eine andere Sitzung machen.

## Umsetzung

**`authoring/tools/contract.js`** (gegenüber `d6dd542`):
- **N61-2:** neue Hilfsfunktion `ctlTxt`. `accTxt` nimmt jetzt Folgendes in den zugänglichen Text eines Links auf:
  - den `alt` eines `<img>`;
  - den `value` eines `<input>`, ausser bei `type="hidden"`;
  - bei einem sichtbaren Eingabefeld ohne Wert den Platzhalter «[Eingabefeld]», damit es auffällt.

  Weicht der Name ab, greift die bestehende Meldung «Direkteinstiege weichen vom Seitenvertrag ab». Verborgene Teile bleiben wie bisher ausgeschlossen (`hiddenFlag` aus r4-62).
- **Selbsttest:** zwei neue Fälle und eine Gegenprobe, 125 statt 122 (#784):
  - `<img alt="Mehr">` im Zeilenlink → `utility-nav`;
  - `<input type="button" value="Mehr">` im Menülink → `nav`;
  - Gegenprobe: `<img alt="">` und ein Bild mit `alt` in `<span hidden>` im Zeilenlink → kein `utility-nav`.
- **Build-Kennung r4-65:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`.
  - `pendingScope` beginnt mit r4-65, dann folgen r4-64 (`main`) und r4-62 (#784).
  - `appliedTo` führt die Kette von #784 weiter, mit den Einträgen zu r4-64 und r4-65.

**Weitere Dateien:**
- **`site/`:** neu gebaut.
- **Stylesheet und Darstellungsregeln:** kommen unverändert aus `main` (r4-64).
- **`PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`:** neuer Abschnitt r4-65, die Verweise auf #787 sind nachgeführt.

Kein Wortlaut, kein Skript, kein Renderer, keine Suche und keine Testdatei ausser `contract.js` (Selbsttest) ist geändert.

## Wirkung

**Seiten:** Die 35 Dateien in `site/` sind bis auf die Build-Kennung byte-gleich mit `main` (r4-64). `site/css/site.css` ist byte-gleich; die Kennung r4-64 steht dort nur in Kommentaren. Bestand: 0 Blocker, 20 Hinweise.

**Neue Fälle greifen:** Ich habe zwei Kopien von `contract.js` mit veränderter Regel laufen lassen. Danach ist die Datei zurückgesetzt (`cmp`).

| Kopie | Ergebnis |
|---|---|
| ohne `ctlTxt` in `accTxt` | genau die zwei N61-2-Fälle scheitern, `123/125` |
| zu breit: jedes Bild zählt mit Text, auch bei leerem `alt` | die Gegenprobe scheitert, `124/125` |

**Vergleich mit Chromium:** Gemessen mit den Skripten der Nachprüfung r4-61, Chromium 153, CDP `getFullAXTree`.
- **Mutationen** (`mutationen-ausgabe.txt`): Gate und Chromium stimmen in 59 von 67 Fällen überein.
  - **N61-2:** D2 (`<img alt>`) und D4 (`<input value>`) stimmen jetzt überein.
  - **Bewusst streng:** A8–A10 (6 Fälle).
  - **Ausserhalb des Geltungsbereichs:** F1, G1 (2 Fälle).
- **Zusatzprobe zu N61-1** (`svg-hidden-ausgabe.txt`, Regel aus r4-62):
  - S1–S3 blockieren `utility-nav`, S5 blockiert `figure-alt`.
  - Die Gegenprobe S4 bleibt frei.

**Nicht hier behoben:** N62-2 (gering) aus der Nachprüfung r4-62: `inSvg` zählt HTML in `<foreignObject>` zum SVG. Nicht im Auftrag. Eine Fassung, die an `<foreignObject>` endet, enthielt die erste Fassung r4-63 (`inSvgNs`).

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium 153 und Playwright über `PLAYWRIGHT_MODULE` (`tests-ausgabe.txt`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `Selbsttest: 125/125 bestanden` |
| Suchtest (`dist/site`) | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` `tension core exceeds 1800px` (bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys) | `axe 4.14.0 · Build r4-65 · Seiten 24 · Läufe 48 · Verstösse 0` |

**Merge-Reihenfolge:** zuerst #787 in den Branch von #784, danach #784 in `main`. Dieser Branch enthält `main` (`a55ecb1`), die Folge ist darum konfliktfrei, solange `main` sich nicht weiter ändert. #784 trägt danach die Kennung r4-65.

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
