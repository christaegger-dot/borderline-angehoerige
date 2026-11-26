# Nachtrag zu den Mutationsproben · N811-2 · 26.11.2026

`BERICHT.md`, `mut.sh`, `mutationen.txt` und `gates.txt` in diesem Ordner sind ein historischer Nachweis zu [PR #811](https://github.com/christaegger-dot/borderline-angehoerige/pull/811). Sie bleiben unverändert. Die Nachprüfung von #811 ([PR #823](https://github.com/christaegger-dot/borderline-angehoerige/pull/823), Befund N811-2) hat festgestellt, dass sich neun der 13 Proben mit diesem Nachweis allein nicht wiederholen lassen. Dieser Nachtrag ergänzt die fehlenden Angaben. Verfasst hat ihn die Sitzung, die #811 gebaut hat; die Aufrufe stammen aus ihrem Sitzungsverlauf.

## Was im Nachweis fehlte

- **Aufrufe:** `mut.sh` nimmt den Namen der Probe als `$1` und für die CSS-Proben den CSS-Text als `$2`. Die Aufrufe standen nirgends.
- **Stiller Leerlauf:** Ohne `$2` setzt `mut.sh` ein leeres `<style></style>` ein. Die Probe läuft dann ohne Mutation und ist grün. Das Skript meldet das nicht.
- **Vergleichsstand:** Die Spalte «#809» in `mutationen.txt` entstand aus `git show origin/main:authoring/tools/layouttest.cjs`. Gemeint war der Stand vor #811, also **`5b7e799`**. Seit dem Merge von #811 (`f91db68`, 26.11.2026, 15:50:00 UTC) liefert `origin/main` ein neueres Werkzeug.
- **Arbeitsbaum:** `mut.sh` erwartet unter `$S/wt809` einen Arbeitsbaum des geprüften Stands. Bei den Läufen für `mutationen.txt` war das der Branch von #811 vor dem Commit (Inhalt wie `9663ad5`, ausser der Meldung von M2, siehe unten). `$S` war ein Arbeitsordner ausserhalb des Repositorys.

## Aufrufe

Alle Selektoren beginnen mit `[data-visual-id="v-vs-anspannung"]`; unten steht dafür `F`.

| Probe | Aufruf | CSS (`$2`) oder Sonderfall |
|---|---|---|
| M0 | `mut.sh M0-grenze1500` | kein CSS; `sed` ersetzt im Test `c.end>1800` durch `c.end>1500` |
| M1 | `mut.sh M1-vierte-display-none '…'` | `F ol.bl-phase-actions>li:nth-child(4){display:none}` |
| M2 | `mut.sh M2-handlung-weg '…'` | `F ol.bl-phase-actions .bl-kurve__hilft,F ol.bl-phase-actions .puk-vis-ansatz,F ol.bl-phase-actions>li:nth-child(4) p{display:none}` |
| M3 | `mut.sh M3-unten-waechst '…'` | `F .bl-fig-schutz{padding-bottom:3000px}` |
| M4 | `mut.sh M4-schutz-weg '…'` | `F .bl-fig-schutz{display:none}` |
| M5 | `mut.sh M5-in-details` | kein CSS; die Kartenliste wird im HTML in ein `<details class="puk-vis-more">` gesetzt |
| M6 | `mut.sh M6-karten-wachsen '…'` | `F ol.bl-phase-actions>li:first-child{margin-top:300px}` |
| M7 | `mut.sh M7-umgekehrt-wachsen '…'` | `F ol.bl-phase-actions{display:flex!important;flex-direction:column-reverse}F ol.bl-phase-actions>li:last-child{margin-bottom:300px}` |
| M8 | `mut.sh M8-fuenf` | kein CSS; eine fünfte Karte wird im HTML angehängt |
| M9 | `mut.sh M9-vierte-unsichtbar '…'` | `F ol.bl-phase-actions>li:nth-child(4){visibility:hidden}` |
| M10 | `mut.sh M10-schutz-nach-details` | kein CSS; der Schutzhinweis wird im HTML vor die Bildlegende verschoben |
| M11 | `mut.sh M11-titel-weg` | kein CSS; die Überschrift der Karte 2 wird im HTML entfernt |
| M12 | `mut.sh M12-opacity '…'` | `F ol.bl-phase-actions>li:nth-child(2){opacity:0}` |
| M13 | `mut.sh M13-unten-200px-erlaubt '…'` | `F .bl-fig-schutz{padding-bottom:200px}` |

## Zwei Berichtigungen zum Ablauf

- **M2:** Der erste Lauf von M2 meldete «4 phase card(s) without visible heading **and** text». Danach habe ich die Meldung im Test in «heading **or** text» geändert und M2 neu laufen lassen. `mutationen.txt` zeigt den zweiten Lauf. Die Regel selbst war in beiden Läufen gleich.
- **M0:** In der Nachprüfung von #809 änderte die Probe nur `r.curvePhases.end>1800`. Weil #811 die Variable in `c.end` umbenennt, griff das Muster zuerst nicht, und M0 war grün. `mut.sh` in diesem Ordner enthält das berichtigte Muster für beide Schreibweisen; `mutationen.txt` zeigt den Lauf damit.

## Ersatz

Wiederholbare, fest an Commits gebundene Proben stehen in [`../2026-11-26-nachpruefung-pr-811/`](../2026-11-26-nachpruefung-pr-811/) (`mutate.py`, `mut.sh`, `mutationen.txt`; `5b7e799` gegen `dec530f` gegen `b72d59d`), sobald #823 gemergt ist. Die Nachprüfung hat M0 bis M13 dort mit eigenem CSS nachgebaut und in jeder Probe dasselbe Ergebnis erhalten. Bei M6 und M7 misst sie 1883 statt 1903 px, weil ihr CSS anders vergrössert.
