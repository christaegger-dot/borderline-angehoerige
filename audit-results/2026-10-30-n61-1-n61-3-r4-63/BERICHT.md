# N61-1 bis N61-3 · r4-63 · 30.10.2026 · Umsetzung und Selbstprüfung

> **Überholt (30.10.2026):** Diese erste Fassung (`f2fac13`) setzte auf r4-62 in der Fassung `a5d18e7` auf und überschnitt sich bei N61-1 mit der Neufassung von #784 (N62-1 der Nachprüfung r4-62). Auf Entscheid von Christa Egger («#787 neu fassen, dann prüfen») ersetzt sie r4-65, nur mit N61-2: [`audit-results/2026-10-30-n61-2-r4-65/BERICHT.md`](../2026-10-30-n61-2-r4-65/BERICHT.md). Der Text unten ist unverändert als Beleg erhalten.

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N61-1 bis N61-3 umsetzen». Grundlage auf ihren Entscheid «Auf #784, r4-63».

- **Befunde:** aus `audit-results/2026-10-30-nachpruefung-r4-61/NACHPRUEFUNG.md` (PR #785, gemergt als `3e16eeb`).
- **Ausgangsstand:** r4-62 ([PR #784](https://github.com/christaegger-dot/borderline-angehoerige/pull/784), `a5d18e7`, Entwurf). Er baut auf r4-61 ([PR #780](https://github.com/christaegger-dot/borderline-angehoerige/pull/780), `9fe243e`) auf. Danach ist `main` (`aefdf06`) per Merge eingebracht.
- **Branch:** `pruefung/2026-10-30-nachpruefung-r4-61`. Das ist der Branch, der dieser Sitzung zugewiesen ist; sein PR #785 ist gemergt. Er ist neu auf `a5d18e7` aufgesetzt; sein bisheriger Inhalt liegt vollständig auf `main`.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfung r4-61 verfasst und N61-1 bis N61-3 selbst gestellt hat. Die Nachprüfung von r4-63 muss eine andere Sitzung machen, ebenso die von r4-62.

## Abgleich mit r4-62 (PR #784)

#784 setzt N60-3 aus dem Nachtrag zur Nachprüfung r4-60 um. Dieser Befund ist der Abbildungsteil von N61-1: Die SVG-Prüfung `figure-alt` nutzt dort `svgSilenced` statt `hiddenFlag`. Mit #784 blockiert die Zusatzprobe S5 (`<svg hidden>` in einer Abbildung) wieder `figure-alt`, siehe `svg-hidden-ausgabe.txt`.

Offen waren:
- N61-1 für Direkteinstiege, also `relabelled`/`hiddenBelow`, `accTxt` und `concealed`;
- N61-2;
- N61-3.

## Umsetzung

**`authoring/tools/contract.js`:**
- **N61-1:** neue Hilfsfunktion `inSvgNs` (ein `svg` und alles darin, ausser unter `foreignObject`). `hiddenFlag` wertet `hidden` und `inert` nur ausserhalb des SVG-Namensraums; `aria-hidden` gilt überall.
  - **Wirkung:** `concealed`, `accTxt`, `hiddenBelow`/`relabelled` und die Regel `sender` folgen damit Chromium.
  - **Unverändert:** `svgSilenced` aus r4-62.
- **N61-2:** neue Hilfsfunktion `ctlTxt`.
  - **`accTxt`** nimmt den `alt` eines `<img>` und den `value` eines `<input>` in den zugänglichen Text auf.
  - **Ausnahme:** `type="hidden"` zählt nicht.
  - **Ohne Wert:** Ein sichtbares Eingabefeld ohne Wert zählt als Platzhalter «[Eingabefeld]», damit es auffällt. Ein Eingabefeld in einem Link ist ohnehin unzulässig.
  - **Meldung:** Ein abweichender Name führt zur bestehenden Meldung «Direkteinstiege weichen vom Seitenvertrag ab».
- **Selbsttest:** vier neue Fälle und eine Gegenprobe, 127 statt 122. Das sind 120 aus r4-62 und 2 aus dem Nachtrag zu N60-1 auf `main`, `c5bbf90`.
  - `<svg hidden aria-label="Pfeil">` im Zeilenlink → `utility-nav`;
  - `<svg inert><title>Mehr</title></svg>` im Menülink → `nav`;
  - `<img alt="Mehr">` im Zeilenlink → `utility-nav`;
  - `<input type="button" value="Mehr">` im Menülink → `nav`;
  - **Gegenprobe:** `<img alt="">`, ein Bild mit `alt` in `<span hidden>` und `<svg aria-hidden="true"><title>` im Zeilenlink → kein `utility-nav`.
- **Build-Kennung r4-63:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

**`PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (N61-3):**
- **Konflikt:** Beim Merge von `main` gab es einen Konflikt. Gelöst mit der Fassung von `main` (#776, #779, #781) als Grundlage.
- **Neue Abschnitte:**
  - r4-63, r4-62 und r4-61 (Entwürfe);
  - Nachprüfung r4-61 (#785, mit der Ausnahme ohne Codex-Review);
  - Nachtrag zur Nachprüfung r4-60 (#781).
- **Nachgeführt:** Kopfzeile sowie der Stand von N59-3, N60-1 und N60-3.

Kein Wortlaut, kein Stylesheet, kein Skript, kein Renderer, keine Suche und keine Testdatei ausser `contract.js` (Selbsttest) ist geändert.

## Wirkung

**Seiten:** Die 35 Dateien in `site/` sind bis auf die Build-Kennung byte-gleich mit r4-62 (`a5d18e7`): `abweichend 0 von 35`, 24 Seiten mit je drei Ersetzungen. Bestand: 0 Blocker, 20 Hinweise.

**Neue Fälle greifen:** Dafür habe ich je eine Änderung in einer Kopie zurückgenommen:

| Kopie von `contract.js` | Ergebnis |
|---|---|
| ohne N61-1 (`hiddenFlag` wie r4-62) | die zwei N61-1-Fälle scheitern, `125/127` |
| ohne N61-2 (`accTxt` wie r4-62) | die zwei N61-2-Fälle scheitern, `125/127` |
| ohne beide | alle vier scheitern, `123/127` |
| zu breite Regel (auch `aria-hidden` im SVG unwirksam) | die Gegenprobe r4-63 und die Gegenprobe r4-61 scheitern, `125/127` |

Nach jedem Lauf ist die Datei zurückgesetzt (`cmp`).

**Vergleich mit Chromium:** Gemessen mit den Skripten der Nachprüfung r4-61 (`audit-results/2026-10-30-nachpruefung-r4-61/`), Chromium 153, CDP `getFullAXTree`.
- **Mutationen** (`mutationen-ausgabe.txt`): Gate und Chromium stimmen in 59 von 67 Fällen überein. In der Nachprüfung r4-61 waren es 51.
  - **Behoben:** B `svg hidden`/`svg inert` mit `aria-label` (4 Fälle, N61-1), D2 `<img alt>` und D4 `<input value>` (4 Fälle, N61-2).
  - **Bewusst streng:** A8–A10 (6 Fälle), unverändert.
  - **Ausserhalb des Geltungsbereichs:** F1 und G1 (2 Fälle). `relabelled` gilt nur für Direkteinstiege.
- **Zusatzprobe** (`svg-hidden-ausgabe.txt`):
  - S1–S3 blockieren jetzt `utility-nav`. Chromium nennt die Links «Kurz und klar Pfeil» bzw. «Kurz und klar Mehr».
  - S5 blockiert `figure-alt` (seit r4-62).
  - Die Gegenprobe S4 (`aria-hidden="true"`) bleibt frei.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium 153 und Playwright über `PLAYWRIGHT_MODULE` (`tests-ausgabe.txt`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `Selbsttest: 127/127 bestanden` |
| Suchtest (`dist/site`) | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` `tension core exceeds 1800px` (bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys) | `axe 4.14.0 · Build r4-63 · Seiten 24 · Läufe 48 · Verstösse 0` |

**Merge-Reihenfolge:** Dieser Branch enthält `main`. Die drei Entwürfe lassen sich darum von oben nach unten ohne Konflikt einbringen:
1. diesen PR in den Branch von #784;
2. #784 in den Branch von #780;
3. #780 in `main`.

In umgekehrter Reihenfolge gibt es beim Merge von #780 in `main` einen Konflikt in der Pendenzendatei.

**Hinweis:** `main` (Nachtrag zu N60-1, `c5bbf90`) und r4-62 sichern dieselben zwei Fälle zu N60-1 im Selbsttest je einmal ab. Beide bleiben drin; das ist doppelt, aber nicht falsch.

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
