# Nachprüfung PR #813 · Layouttest B2c, Korrekturen aus dem Code-Review · 26.11.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger, 26.11.2026: «Starte eine Nachprüfung von #813 in einer neuen Sitzung».
- **Gegenstand:** [PR #813](https://github.com/christaegger-dot/borderline-angehoerige/pull/813), Branch `claude/sharp-mendel-6ecwbi`, Kopf `91e4ac0`, zwei Commits (`3168c8a`, `91e4ac0`). Geprüft ist `git diff 7d5723e 91e4ac0`, 5 Dateien, +115/−16:
  - `authoring/tools/layouttest.cjs` (+19/−10);
  - `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (Kopfzeile und Abschnitt «Layouttest · Ausnahme B2c»);
  - neuer Ordner `audit-results/2026-11-26-code-review-nach-811/` (`BERICHT.md`, `mut.sh`, `mutationen.txt`).
- **Stand:** #813 ist **gemergt**, als `c937f8e` am 26.11.2026 um 16:11:04 UTC. Die Eltern sind `7d5723e` und `91e4ac0`. **Der Baum von `c937f8e` ist gleich wie der von `91e4ac0`** (beide `c1b5b8c`, `git diff --stat` leer). Diese Nachprüfung ist also nachträglich und betrifft den Stand auf `main`.
- **Wer prüft:** eine Claude-Sitzung (`session_011SWztidZmE3W5VdqDiLYPK`). Sie hat an #809, #810, #811, #812 und #813 nicht mitgearbeitet. Zur Unabhängigkeit ist offenzulegen:
  - #813 hat die Sitzung `session_011SWztjZmbGyZgChekUu8gC` gebaut (laut Commit). Dieselbe Sitzung hat #809 gebaut und diese Nachprüfung gestartet. In #813 hat sie ihr eigenes Werkzeug korrigiert.
  - Der Startauftrag an diese Sitzung stammt von der bauenden Sitzung. Er nennt die zu prüfenden Punkte und einzelne Angaben, etwa «rund 10 Sekunden» und «G5 TimeoutError». Den Auftrag, die PR-Beschreibung und den `BERICHT.md` aus #813 habe ich gelesen.
  - Messungen und Gegenproben habe ich mit eigenen Skripten neu gemacht (`mut.sh`, `mutate.py`). Jede Probe lief gegen das Werkzeug **vor** #813 (`7d5723e`) und **nach** #813 (`91e4ac0`), beide fest per `git show <commit>:…` geholt. Für die Gates habe ich die Werkzeuge des Repositorys benutzt.
- **Umgebung:**
  - Node 22.23.5;
  - Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright` (`PLAYWRIGHT_MODULE` gesetzt);
  - Chrome Headless Shell 156.0.8078.4 (Playwright-Revision 1248, `/opt/pw-browsers`);
  - Gates auf dem Arbeitsbaum von `c937f8e`. Die Gegenproben liefen an Kopien von `site/` ausserhalb des Repositorys. `site/` im Repository habe ich nicht verändert.
- **Beilagen in diesem Ordner:**
  - `mut.sh`, `mutate.py`: acht Gegenproben P0 bis P7, jede gegen `7d5723e` und `91e4ac0`;
  - `mutationen.txt`: die Ergebnisse;
  - `gates.txt`: Exit-Code und Schlusszeilen der fünf Gates.

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe. Werkzeug, Pendenzendatei und `site/` habe ich nicht geändert. Auf #813 habe ich nicht kommentiert.

## Ergebnis

**Technisch korrekt. Nachbesserung bei Ablauf und Dokumentation empfohlen, ohne Blocker.**

- Die Änderung an `layouttest.cjs` macht, was sie beschreibt. Alle Gates sind grün, die Werte im Bericht stimmen, und die Website ist nicht betroffen.
- **Keine Regression fällt jetzt unbemerkt durch, die mit `7d5723e` aufgefallen wäre.** Neu grün wird nur genau ein Fall: die ganze Figur in einem *offenen* `<details>` (P1). Ein geschlossenes `<details>` um die Figur erkennt auch die neue B2c-Logik, mit genauerer Meldung (P3).
- Offen sind:
  - der Ablauf: Merge vor dem Ende des Codex-Reviews und vor jeder Nachprüfung, ohne belegten Merge-Auftrag (N813-1);
  - die Pendenzendatei: schon beim Merge veraltet (N813-2);
  - ein fachlicher Entscheid: Ein offenes `<details>` wird ungleich behandelt, je nachdem, ob es um die Figur oder in der Figur steht (N813-3);
  - die Nachvollziehbarkeit der Gegenproben in #813 (N813-4).

## Befunde

### N813-1 · wichtig (Ablauf) · Gemergt vor dem Ende des Codex-Reviews und vor der eigenen Nachprüfung, ohne belegten Merge-Auftrag

- **Beleg (GitHub, abgefragt am 26.11.2026):**
  - Der PR wurde um 16:09:42 UTC angelegt und um 16:11:04 UTC gemergt (`merged_by` `christaegger-dot`), nach 82 Sekunden.
  - Codex-Review auf `91e4ac0`, ausgelöst durch «Draft marked ready». Der Zusammenfassungskommentar wurde um 16:11:03 UTC angelegt, «Completed» ohne Befund um 16:11:29.73 UTC. Das Review war also **rund 26 Sekunden nach dem Merge** fertig.
  - Den Zeitpunkt «bereit zur Prüfung» liefert die verfügbare Schnittstelle nicht. Die Angabe «rund 10 Sekunden» aus dem Startauftrag konnte ich nicht selbst bestätigen. Belegt ist, dass das Codex-Review spätestens 1 Sekunde vor dem Merge begann.
  - Es gibt keine Reviews und keine Review-Threads. Kommentiert haben nur Netlify und Codex.
  - CI `build-and-compare` war grün auf `91e4ac0` (16:10:02 bis 16:10:38 UTC). Die Netlify-Prüfungen waren grün oder neutral. Den Layouttest enthält die CI nicht (siehe N809-7). Die grüne CI sagt deshalb nichts über die geänderte Prüfung.
  - Die PR-Beschreibung nennt unter «Offen» ausdrücklich «Nachprüfung durch eine andere Sitzung» und «Merge nur auf Auftrag». Ein Merge-Auftrag steht weder im PR noch im Merge-Commit; `c937f8e` trägt nur den Standardtext.
- **Einordnung:**
  - Das ist das dritte Mal an diesem Tag nach demselben Muster: #809 (Codex 53 s nach dem Merge), #811 (26 s danach), #813 (rund 26 s danach). R28-O01 ist jedes Mal nicht eingehalten.
  - Inhaltlich folgt daraus kein Schaden. Codex fand nichts, `site/` ist unverändert, und diese Nachprüfung bestätigt den Code.
  - Wer gemergt hat, lässt sich aus GitHub nicht ablesen, nur das Konto.
- **Vorschlag:** In der Pendenzendatei vermerken: Merge um 16:11:04 UTC, Codex danach ohne Befund, Merge-Auftrag mit Quelle oder «auf GitHub nicht belegt», dazu diese Nachprüfung.

### N813-2 · gering · Pendenzendatei beim Merge veraltet

- **Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:3` (Kopfzeile), `:11` (Überschrift), `:31` (Absatz «Korrekturen aus dem Code-Review»), `:40` (Liste «Offen»).
- **Beleg:** Der Commit `91e4ac0` (16:09:53 UTC) entstand vor dem Merge. Seit 16:11:04 UTC steht deshalb auf `main`:
  - «GitHub main: `7d5723e`». Das ist jetzt `c937f8e`.
  - In der Kopfzeile «PR #813 (…, Entwurf)», in der Überschrift «#813 offen», im Absatz «[PR #813] …, Entwurf, nicht gemergt», unter «Offen» «Merge nur auf Auftrag». Alles überholt.
- **Gegen GitHub bestätigt:**
  - Merge-Zeiten: #809 14:52:50 UTC (`5b7e799`), #811 15:50:00 UTC (`f91db68`), #812 15:54:31 UTC (`0ddacc5`), #810 15:56:02 UTC (`7d5723e`). Alle stimmen.
  - #810 wird richtig als gemergt geführt.
  - #787 ist gemergt am 30.10.2026 um 11:46:37 UTC als `cec2bbc`. Die Kopfzeile stimmt. Der Abschnitt «Korrektur · r4-66» (`:47`) führt #787 weiter als «nicht gemergt»; das räumt #813 selbst ein.
  - Die Liste der offenen PRs stimmt genau mit GitHub überein. Bereit zur Prüfung sind #793, #795, #799 und #801. Entwürfe sind #713, #800 und #802 bis #807. Weitere offene PRs gibt es nicht.
- **Einordnung:** Das gleiche Muster wie bei N809-5. Wer den Status im PR selbst nachführt und vor dem Auftrag mergt, hinterlässt zwangsläufig einen veralteten Eintrag.
- **Vorschlag:** In einem eigenen Pendenzen-PR #813 als gemergt führen (mit `c937f8e` und den Angaben aus N813-1), die Kopfzeile auf `c937f8e` setzen und diese Nachprüfung eintragen. Bei der Gelegenheit den Abschnitt r4-66 zu #787 berichtigen.

### N813-3 · gering (Entscheid) · Ein offenes `<details>` zählt um die Figur als «ohne Aufklappen», in der Figur nicht

- **Ort:** `authoring/tools/layouttest.cjs:32`, `inDisc=e=>{const d=e.closest('details');return !!d&&fig.contains(d);}`.
- **Beleg (`mutationen.txt`):**
  - **P1:** Die Figur steht in `<details open>`. Mit `7d5723e` gibt es 1 Abweichung, «0 phase cards outside disclosures». Mit `91e4ac0` gilt «B2c bestanden», mit 0 Abweichungen und Exit 0.
  - **P4:** Ein `<details open>` steht *innerhalb* der Figur um `ol.bl-phase-actions`. Mit beiden Fassungen gibt es 1 Abweichung, «0 phase cards outside disclosures».
  - Die Karten sind in beiden Fällen beim Laden ohne Klick sichtbar. Das Werkzeug behandelt sie trotzdem verschieden.
- **Einordnung zu A04-2014** («… ohne Aufklappen erfassbar … kein klickpflichtiges Modell»):
  - Technisch ist die neue Wertung vertretbar. Ein offenes `<details>` zeigt den Inhalt ohne Klick, und das Skript schliesst keine `<details>` (`interaktion.js` öffnet sie nur, Zeilen 191, 575 und 587).
  - Fachlich bleibt eine Lücke: Ein solches `<details>` macht die ganze Figur einklappbar. Ob das noch der Absicht von A04-2014 entspricht, ist eine Gestaltungsfrage. Weder B2c noch NP708-N2 haben sie entschieden.
  - Dass `7d5723e` hier «fälschlich» gemeldet habe, ist eine Wertung der bauenden Sitzung, kein Entscheid.
  - Heute steht die Figur in keinem `<details>` (0 öffnende `<details>` vor der Figur in `site/verstehen.html`). Praktisch ändert sich deshalb nichts.
- **Vorschlag (Entscheid Christa Egger):** Entweder jedes `<details>`-Vorfahrenelement gleich behandeln, also nur über die Sichtbarkeit (`vis`) urteilen, auch für offene `<details>` in der Figur. Oder ein `<details>` um die Figur als nicht zulässig melden. Oder die heutige Asymmetrie ausdrücklich in der Pendenzendatei festhalten.

### N813-4 · gering · Gegenproben in #813 nicht nachvollziehbar

- **Ort:** `audit-results/2026-11-26-code-review-nach-811/mut.sh`.
- **Beleg:**
  - Die Vergleichsfassung «main» kommt aus `git show origin/main:authoring/tools/layouttest.cjs`. Seit dem Merge zeigt `origin/main` auf `c937f8e`. Ein erneuter Lauf vergleicht also das neue Werkzeug mit sich selbst. Gemeint war `7d5723e`.
  - Die Aufrufe von G1b bis G5 fehlen. Vor allem der CSS-Text von G3 («vierte Karte `display:none`») und G4 («Figur +700 px») ist nirgends festgehalten.
  - Der Kopfkommentar «`$1 Name, $2 Art …, $3 Wert`» passt nicht zur Belegung im Skript (`$1` Repo, `$2` Arbeitsordner, `$3` Name, `$4` Art, `$5` Wert).
- **Einordnung:** Die Ergebnisse selbst stimmen; G1b und G5 habe ich als P1 und P2 nachgestellt. Nur die Wiederholbarkeit leidet. Der `BERICHT.md` ist ein historischer Nachweis und sollte nicht umgeschrieben werden.
- **Vorschlag:** Künftig Commits fest angeben und die Aufrufe im Skript festhalten, wie in `mut.sh` dieser Nachprüfung. Für #813 genügt dieser Hinweis.

### N813-5 · Hinweis · G5 ist eine Lücke der Probe, nicht des Werkzeugs

- **Beleg:**
  - **P2** (= G5): Die Figur steht in einem geschlossenen `<details>`. Beide Fassungen brechen mit `TimeoutError` ab, und `ERGEBNIS.json` wird nicht geschrieben. Ursache ist die Zeile `p.locator('figure').first()…screenshot` (`layouttest.cjs:41`): Die erste Figur von «Verstehen» ist die Anspannungskurve, und im geschlossenen `<details>` ist sie unsichtbar.
  - **P3** ist gleich wie P2, aber mit einer sichtbaren Platzhalterfigur davor, damit der Screenshot gelingt. Mit `7d5723e`: «0 phase cards outside disclosures». Mit `91e4ac0`: «**only 0 of 4 phase cards visible**», Exit 1. Die neue Logik erkennt den Fall also selbst, über die Sichtbarkeitsprüfung aus N809-2.
- **Einordnung:**
  - Ein eigener Befund zur B2c-Logik ist nicht nötig.
  - Der Abbruch selbst schon vor #813 bestanden. Er ist laut (Exit 1), aber unspezifisch und ohne `ERGEBNIS.json`.
  - Der Satz im Bericht («prüft dabei aber nicht die B2c-Logik») ist richtig. Die naheliegende Gegenprobe P3 fehlte aber.
- **Vorschlag:** Keiner in diesem Auftrag. Bei Bedarf den Screenshot-Schritt so ändern, dass er unsichtbare Figuren meldet statt abzubrechen.

### N813-6 · Hinweis · Branch-Name und CI

- Der Branch `claude/sharp-mendel-6ecwbi` verstösst gegen die Branch-Konvention in `AGENTS.md`. Das legt #813 selbst offen; der Name ist von der Cloud-Sitzung vorgegeben.
- N809-7 gilt weiter: Die CI führt `layouttest.cjs` nicht aus.

## Bestätigt

### 1. Änderung an `layouttest.cjs` (Code-Lesung und Proben)

- **`inDisc`:** Gilt jetzt für die Karten (`:33`) und den Schutzhinweis (`:35`). `fig.contains(d)` wird nur aufgerufen, wenn die Figur existiert. Fehlt sie, ist `cards` leer, und `vis(null)` ist `false`. Abstürzen kann der Test dadurch nicht. `schutzBeforeDetails` und `firstDetails` (`fig.querySelector('details')`) sind unverändert und schon auf die Figur begrenzt.
- **Regressionen:** Das einzige geänderte Verhalten betrifft Karten oder den Schutzhinweis in einem `<details>` *ausserhalb* der Figur. Ist es geschlossen oder anders verborgen, fängt es die Sichtbarkeitsprüfung ab (P3; P6 mit `<div hidden>` in beiden Fassungen). Neu grün wird nur der offene Fall (P1, siehe N813-3).
- **Prüfungen hinter dem offenen `<details>` greifen jetzt** (vorher wurden sie von «0 phase cards» verdeckt):
  - **P5:** Schutzhinweis `display:none` ergibt «protection note not visible before the disclosures».
  - **P7:** Schutzhinweis +700 px ergibt «whole figure 2692px exceeds 2400px».
- **Konstanten:** `B2C_PHASES=4`, `B2C_PHASE_END_MAX=1800`, `B2C_FIGURE_MAX=2400`. Sie stehen in allen sechs Bedingungen und Meldungen. Fest eingetragene Zahlen gibt es nur noch im Kommentar. `B2C_PHASE_END_MAX` ist zugleich die Schwelle, ab der eine Ausnahme gemeldet wird (`r.curve.h>B2C_PHASE_END_MAX`). Das entspricht der bisherigen Logik (`>1800`). Die Meldung «beyond ${B2C_PHASE_END_MAX}px» (G2) ist im Code bestätigt; nachgemessen habe ich sie nicht.
- **`exceptions`:**
  - Das Feld steht immer in `ERGEBNIS.json`: als leeres Array, wenn keine Ausnahme bestanden ist (P3 bis P7), und mit dem B2c-Eintrag, wenn sie besteht (P0, P1).
  - `protectionNoteVisible:true` ist fest eingetragen. Das ist richtig, weil der Zweig nur nach bestandener Schutzprüfung erreicht wird.
  - Kein Werkzeug im Repository liest `ERGEBNIS.json` aus (`grep` in `authoring/tools/*.mjs` und `.github/`). Das neue Feld bricht also nichts.
- **Unverändert:** Die Prüfung gilt nur bei 375 px, ohne vergrösserte Schrift und auf «Verstehen». Der Selektor ist `:scope ol.bl-phase-actions > li`.

### 2. Messwerte

| Grösse | #813 | gemessen |
|---|---|---|
| Layouttest | 240 Zustände, 27 Bedienproben, 0 Abweichungen, Exit 0 | **gleich** (`gates.txt`) |
| `exceptions` | B2c, 1992 px, 1603 px, Grenzen 1800/2400 | **gleich**, dazu `protectionNoteVisible:true`, `status:"bestanden"` |
| G1b · offenes `<details>` um die Figur | neu 0, main 1 Abweichung | **P1: gleich** |
| G5 · geschlossenes `<details>` | beide `TimeoutError` | **P2: gleich**; dazu P3 (N813-5) |
| G3, G4 | erkannt | nicht nachgestellt, weil der genaue CSS-Text fehlt (N813-4). Gleichwertig geprüft mit P6 (Karten verborgen) und P7 (Figur +700 px) |

### 3. Gates auf `c937f8e` (= Baum von `91e4ac0`)

| Gate | #813 | gemessen |
|---|---|---|
| `selftest.mjs` | 125/125 | **125/125**, Exit 0 |
| `build.mjs --production --verify-site` | 35 Dateien byte-gleich | **35 Dateien byte-gleich**, 24 Seiten, 0 Blocker, 20 Hinweise, Exit 0 |
| `suchtest.mjs site` | 216/216 | **216/216**, JS-Fehler 0, Exit 0 |
| `sprachtest.mjs site` | 73 | **73 bestanden**, JS-Fehler 0, Exit 0 |
| `layouttest.cjs` | 0 Abweichungen | **0 Abweichungen**, Exit 0 |

`--write-site` habe ich nicht ausgeführt, um `site/` nicht zu berühren. `--verify-site` belegt, dass der Build mit `site/` übereinstimmt.

### 4. Nicht geprüft

- Den Zeitpunkt «bereit zur Prüfung» (siehe N813-1).
- Die Angaben zu den neun Punkten des Code-Reviews, das nur im Gespräch berichtet wurde. Geprüft sind nur die Änderungen im Diff.
