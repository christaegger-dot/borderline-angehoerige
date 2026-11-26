# Nachbesserung N813-1 bis N813-4 · Layouttest B2c · 26.11.2026

## Auftrag, Stand, wer

- **Auftrag:** Christa Egger, 26.11.2026: «Nachbesserung N813-1 bis N813-4 umsetzen». Die Befunde stammen aus der Nachprüfung von #813 ([PR #814](https://github.com/christaegger-dot/borderline-angehoerige/pull/814), [`NACHPRUEFUNG.md`](../2026-11-26-nachpruefung-pr-813/NACHPRUEFUNG.md)).
- **Entscheide von Christa Egger, 26.11.2026** (Antworten an diese Sitzung, auf GitHub nicht belegt):
  - **N813-3:** «Melden als unzulässig». Ein `<details>` um die Figur wird als eigene Abweichung gemeldet.
  - **N813-1:** «Nicht belegt eintragen». Der Merge-Auftrag zu #813 wird als «auf GitHub nicht belegt» geführt.
  - **N813-4:** «Nachtrag, Original bleibt». Der historische Nachweis aus #813 bleibt unverändert und bekommt einen datierten Nachtrag.
- **Grundlage:** `main` bei `55d006e`. Darin sind #813 (`c937f8e`), r4-68 (#815, `c7d8c01`) und die Nachprüfung #814 enthalten.
- **Wer:** die Sitzung, die die Nachprüfung #814 verfasst hat (`session_011SWztidZmE3W5VdqDiLYPK`). Sie setzt hier ihre eigenen Befunde um. **Prüfen muss diese Nachbesserung eine andere Sitzung.**
- **Umgebung:**
  - Node 22.23.5;
  - Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright` (`PLAYWRIGHT_MODULE` gesetzt);
  - Chrome Headless Shell 156.0.8078.4 (Playwright-Revision 1248).

Dies ist eine technische Korrektur am Prüfwerkzeug und an der Dokumentation. Sie ist keine fachliche Freigabe. Die Website ist nicht betroffen.

## Umsetzung

| Befund | Änderung |
|---|---|
| **N813-1** · Ablauf | In der Pendenzendatei (Abschnitt «Layouttest · Ausnahme B2c»): Merge-Angaben zu #813 ergänzt (CI-Zeiten, keine Nachprüfung vor dem Merge). Die Angabe «etwa 10 Sekunden» ist als nicht nachprüfbar gekennzeichnet. Der Merge-Auftrag ist auf Entscheid als «auf GitHub nicht belegt» geführt. Neu ist ein Absatz zur Nachprüfung #814 mit Merge-Angaben: 16:40:15 UTC, Codex 34 s danach. |
| **N813-2** · Pendenzendatei veraltet | Kopfzeile auf `55d006e` nachgeführt, mit #814, #815 und #813 als gemergt. Die Liste der offenen PRs ist gegen GitHub geprüft: zwölf PRs, gleich wie vorher ohne #814 und #815. Im Abschnitt «r4-68» steht jetzt der Merge von #815 (`c7d8c01`, 16:37:48 UTC, Codex 33 s danach, Merge-Auftrag nicht belegt); die übrigen Angaben dort sind nicht neu geprüft. Im Abschnitt «Korrektur · r4-66» ist #787 als gemergt berichtigt (`cec2bbc`, 30.10.2026, 11:46:37 UTC). |
| **N813-3** · Entscheid | `authoring/tools/layouttest.cjs`: `curvePhases.wrapped` ist wahr, wenn ein Vorfahre der Figur ein `<details>` ist. Dann meldet der Test als erste B2c-Abweichung «tension core: figure inside a disclosure (<details>); the figure itself must not be collapsible». Die Regel innerhalb der Figur (`inDisc`) bleibt unverändert. |
| **N813-4** · Gegenproben | Neu: [`../2026-11-26-code-review-nach-811/NACHTRAG-N813-4.md`](../2026-11-26-code-review-nach-811/NACHTRAG-N813-4.md) mit festem Vergleichsstand `7d5723e`, der richtigen Belegung der Parameter, den ableitbaren Aufrufen und Verweisen auf die wiederholbaren Proben. `BERICHT.md`, `mut.sh` und `mutationen.txt` dort sind unverändert. |

**Nicht in diesem Auftrag:**
- **N813-5:** Ein *geschlossenes* `<details>` um die Figur bricht weiterhin schon beim Screenshot mit `TimeoutError` ab, ohne `ERGEBNIS.json` (P2). Der Test schlägt damit laut fehl, aber die neue Meldung erscheint nur, wenn der Screenshot gelingt (P3). Steht in der Pendenzendatei unter «Offen».
- **N813-6:** Branch-Name von #813 und CI ohne Layouttest.

## Messung

| Prüfung | Ergebnis |
|---|---|
| `layouttest.cjs` | 240 Zustände, 27 Bedienproben, 0 Abweichungen, Exit 0. `exceptions`: B2c, Figur 1992 px, vierte Phase 1603 px, Grenzen 1800/2400 px. Die Werte sind nach r4-68 unverändert. |
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise; `site/` unverändert (`git status` leer) |
| `build.mjs --production --verify-site` | 35 Dateien byte-gleich |
| `selftest.mjs` | 125/125 |
| `suchtest.mjs site` | 216/216, JS-Fehler 0 |
| `sprachtest.mjs site` | 73 bestanden, JS-Fehler 0 |

Schlusszeilen: `gates.txt`.

## Gegenproben

Skript `mut.sh` mit `mutate.py`, Ausgaben in `mutationen.txt`. Der Vergleich ist fest: «main» ist `layouttest.cjs` aus `55d006e`, «neu» ist der Arbeitsbaum dieses PR. Gemessen wird an Kopien von `site/` ausserhalb des Repositorys.

| Probe | main (`55d006e`) | neu | Bedeutung |
|---|---|---|---|
| P0 · unverändert | B2c bestanden, Exit 0 | B2c bestanden, Exit 0 | keine ungewollte Wirkung |
| P1 · Figur in `<details open>` | **0 Abweichungen**, Exit 0 | «figure inside a disclosure», Exit 1 | N813-3 umgesetzt |
| P2 · Figur in geschlossenem `<details>` | `TimeoutError` | `TimeoutError` | unverändert, N813-5 |
| P3 · wie P2, Platzhalterfigur davor | «only 0 of 4 phase cards visible» | «figure inside a disclosure» | erkannt, jetzt mit der genaueren Ursache |
| P4 · `<details open>` in der Figur um die Karten | «0 phase cards outside disclosures» | gleich | Regel in der Figur unverändert |
| P7 · Figur in `<details open>`, Schutzhinweis +700 px | «whole figure 2692px exceeds 2400px» | «figure inside a disclosure» | Es wird nur die erste Abweichung gemeldet (`else if`-Kette wie bisher) |
