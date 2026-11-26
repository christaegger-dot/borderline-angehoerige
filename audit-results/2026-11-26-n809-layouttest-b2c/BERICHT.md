# Nachbesserung N809-2 bis N809-6 · Layouttest B2c · 26.11.2026

## Auftrag, Grundlage, wer baut

- **Auftrag:** Christa Egger, 26.11.2026: «Nachbesserung N809-2 bis N809-6 umsetzen».
- **Grundlage:**
  - Nachprüfung von PR #809 ([PR #810](https://github.com/christaegger-dot/borderline-angehoerige/pull/810), Entwurf), Nachweis `audit-results/2026-11-26-nachpruefung-pr-809/NACHPRUEFUNG.md`.
  - `main` auf `5b7e799` (Merge von #809).
- **Branch:** `korrektur/2026-11-26-n809-layouttest-b2c`. Vor dem Anlegen geprüft: Es gab keinen Branch mit diesem Namen.
- **Wer baut:** die Sitzung, die die Nachprüfung #810 verfasst hat. **Diese Nachbesserung muss eine andere Sitzung prüfen.**
- **Nicht umgesetzt:**
  - N809-1 (Ablauf, Merge-Auftrag zu #809): Das kann nur Christa Egger belegen.
  - N809-7 (Hinweis, Layouttest in der CI): Das ist ein Entscheid.
- **Umgebung:** Node 22.23.5, Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright`, Chromium 156.0.8078.4 (Revision 1248).

Dies ist eine technische Änderung am Prüfwerkzeug. Sie ist keine fachliche Freigabe. Website, Stylesheet, Skript und Renderer sind unverändert.

## Änderungen

### `authoring/tools/layouttest.cjs`

Die Prüfung gilt bei 375 px auf «Verstehen», ohne vergrösserte Schrift, wie bisher. Die Bedingungen werden in dieser Reihenfolge geprüft; die erste verletzte ergibt die Abweichung:

1. Es gibt genau 4 Phasenkarten (`ol.bl-phase-actions > li`) ausserhalb der Aufklappbereiche. Das war schon in #809 so.
2. **N809-2:** Alle 4 Karten sind sichtbar. Geprüft wird `checkVisibility({opacityProperty:true, visibilityProperty:true})`; die Karte muss höher als 0 px sein und Text haben.
3. **N809-2:** Jede Karte ist vollständig: Sie hat eine sichtbare Überschrift (`h3`) und mindestens einen sichtbaren Absatz (`p`), also ihre Handlungsmöglichkeit.
4. **N809-3:** Die *tiefste* sichtbare Karte endet höchstens 1800 px nach dem oberen Rand der Figur. #809 nahm die letzte Karte im Quelltext.
5. **N809-4:** Der Schutzhinweis `.bl-fig-schutz` ist sichtbar, steht nicht in einem Aufklappbereich und steht im Quelltext vor dem ersten Aufklappbereich der Figur.
6. **N809-4:** Die ganze Figur ist höchstens **2400 px** hoch. **Dieser Wert ist mein Vorschlag**, heute misst die Figur 1992 px. Er lässt rund 400 px Spielraum für Textänderungen und fängt grobe Fehler ab. **Christa Egger muss ihn bestätigen oder ändern.**
7. Ist die Figur höher als 1800 px, aber alles erfüllt, meldet der Test «Bekannte Ausnahme B2c bestanden …, Schutzhinweis sichtbar» und zählt keine Abweichung.

### `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (N809-5)

- Der Abschnitt zu #809 heisst jetzt «… auf `main` seit 26.11.2026 · Nachbesserung N809-2 bis N809-6 offen».
- Neu ist eine Zeile **GitHub:**. Sie nennt den Merge um 14:52:50 UTC, den Merge-Auftrag als «auf GitHub nicht belegt», die CI und das Codex-Review nach dem Merge.
- Berichtigt sind «sichtbar» und die Chromium-Version.
- Ergänzt sind die Nachprüfung #810, diese Nachbesserung und die offenen Punkte.
- Kopfzeile und Stand von #787 sind als offen vermerkt, aber nicht nachgeführt. Sie gehören nicht zu N809-5.

### `authoring/UEBERGABE-GESTALTUNG-2026-10-21.md` (N809-6)

Bei B2c steht ein datierter Nachtrag. Er verweist auf #809 und die Pendenzendatei. Der übrige Text bleibt als Herkunft stehen. Den historischen Prüfbericht `authoring/PRUEFBERICHT.md` habe ich nicht geändert.

## Prüfung

### Mutationsproben (`mutationen.txt`, `mut.sh`)

Jede Probe läuft gegen eine Kopie von `site/`, einmal mit dem neuen Test («neu») und einmal mit dem Test von #809 auf `main`.

| Probe | neu | #809 |
|---|---|---|
| M0 Grenze 1500 px (Gegenprobe) | rot: fourth phase ends at 1603px | rot |
| M1 vierte Karte `display:none` | **rot:** only 3 of 4 phase cards visible | grün |
| M2 Handlungszeilen ausgeblendet | **rot:** 4 phase card(s) without visible heading or text | grün |
| M3 unterhalb der Karten +3000 px | **rot:** whole figure 4992px exceeds 2400px | grün |
| M4 Schutzhinweis ausgeblendet | **rot:** protection note not visible before the disclosures | grün |
| M5 Karten in einen Aufklappbereich verschoben | rot: 0 phase cards outside disclosures | rot |
| M6 Karten +300 px | rot: fourth phase ends at 1903px | rot |
| M7 Reihenfolge per CSS umgekehrt, +300 px | **rot:** fourth phase ends at 1903px | grün (falsch 931 px) |
| M8 fünfte Karte | rot: 5 phase cards | rot |
| M9 vierte Karte `visibility:hidden` | **rot:** only 3 of 4 phase cards visible | grün |
| M10 Schutzhinweis hinter die Aufklappbereiche verschoben | **rot:** protection note not visible before the disclosures | grün |
| M11 Überschrift der Karte 2 entfernt | **rot:** 1 phase card(s) without visible heading or text | grün |
| M12 Karte 2 `opacity:0` | **rot:** only 3 of 4 phase cards visible | grün |
| M13 unterhalb der Karten +200 px (erlaubt) | grün, Figur 2192 px | grün |

Alle 13 Fehlerproben werden erkannt; mit #809 blieben 9 davon grün. Die erlaubte Änderung M13 besteht. Die Meldung bei M0 nennt fest «1800px», weil die Probe nur den Vergleichswert ändert.

### Gates auf dem Branch (`gates.txt`)

| Gate | Ergebnis |
|---|---|
| `node authoring/tools/selftest.mjs` | 125/125, Exit 0 |
| `node authoring/tools/build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise; `git status` danach: `site/` unverändert |
| `node authoring/tools/build.mjs --production --verify-site` | 35 Dateien byte-gleich, Exit 0. Auch nach der Änderung der Übergabedatei wiederholt. |
| `node authoring/tools/suchtest.mjs site` | 216/216, JS-Fehler 0 |
| `node authoring/tools/sprachtest.mjs site` | 73, JS-Fehler 0 |
| `node authoring/tools/layouttest.cjs` | 240 Zustände, 27 Bedienproben, 0 Abweichungen, Exit 0. Meldung «Bekannte Ausnahme B2c bestanden: Figur 1992 px hoch, vierte Phase endet bei 1603 px (Grenze 1800 px, ganze Figur höchstens 2400 px), Schutzhinweis sichtbar.» |

## Offen

- Nachprüfung durch eine andere Sitzung; Merge nur auf Auftrag.
- Wert 2400 px bestätigen (Christa Egger).
- N809-1 und N809-7 (siehe oben).
