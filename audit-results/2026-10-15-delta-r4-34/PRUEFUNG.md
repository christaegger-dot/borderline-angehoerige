# Unabhängige Prüfung r4-34

| | |
| --- | --- |
| Gegenstand | Website «Borderline – Orientierung für Angehörige» (Fachstelle Angehörigenarbeit PUK), Entwurf r4-34 |
| Stand | Branch `claude/r4-34-suche-1792095694`, Commit `e4a4013`, auf `origin` gleich. Abgezweigt von `main` `7bd5e6a` (Merge von #695, Stand `ce56c1d`). Übernommen sind `d228c13` (in `authoring/` gleich `8f605a8`) und `89cf160` (meine Nachprüfung `6ea195a`, unverändert) |
| Diff zu `main` | <br>• `authoring/js/interaktion.js`: Korrektur von #695 und Variante R. <br>• `suchtest.mjs` mit «!sicher». <br>• Testliste: 216 Anfragen. <br>• Build und Assetversion r4-34, `independentReview` «ausstehend», `reviewScope`. <br>• Neu `2026-10-15-delta-r4-34/FREIGABE.md`; in `2026-10-15-delta-r4-33/FREIGABE.md` die Nachträge 2 und 3; Pendenzen. <br>• `site/` gleich `main`, also gleich der Produktion r4-33 (`ce56c1d`) |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d34a`, verglichen mit r4-32 (`37b963f`) und der Produktion r4-33 (`ce56c1d`) |
| Massstab | Kriterien aus der Prüfung von r4-32; R31-P03 gegenüber beiden möglichen Bezugsständen |
| Prüfsitzung | unabhängig, hat r4-34 nicht gebaut. Code und Inhalt sind unverändert. Auf Auftrag ist nur diese Datei committet. Probenlisten liegen nicht im Repository |
| Zeitpunkt | 15.10.2026, etwa 22:20 bis 22:30 MESZ |

## Ergebnis

**Freigabefähig.** r4-34 enthält genau die geprüfte Korrektur von #695 und Variante R. Alle Abgleiche laufen ohne Abweichung durch.

- **Gegenüber r4-32 (`37b963f`):** keine Verschlechterung.
- **Gegenüber der Produktion r4-33 (`ce56c1d`):** Die drei Rückschritte sind behoben. Ein konstruierter Satz verliert seine Anheftung, und zwei harmlose Sätze ohne Satzzeichen bekommen wieder eine, wie in r4-32. `FREIGABE.md` nennt das offen. Welcher Stand als Bezug gilt, entscheidet die Auftraggeberin.

**`independentReview` kann auf «bestaetigt» gesetzt werden.** Die Bestätigung gilt für den Inhalt von `e4a4013`. Ändern sich danach Code, Testliste oder Seiteninhalt, braucht es einen neuen Abgleich; reine Nachweis-Nachträge sind davon nicht betroffen.

Sie gilt unter dem vorgeschlagenen Bezugsstand r4-32. Legt die Auftraggeberin r4-33 als Bezug fest, ist der Satz «Er bringt mich nach dem Streit in der Küche er sagt es um» nach R31-P03 zu bewerten. Er ist keine Suizidaussage und keine Ich-Aussage ohne Treffer, blockiert also auch dann nicht. Es bleibt aber eine verlorene Anheftung.

## Ergebnis je Punkt

| Punkt | Ergebnis | Beleg |
| --- | --- | --- |
| Code | **erfüllt** | `authoring/js/interaktion.js` ist bytegleich mit meiner Nachbildung `d33/varR/site/js/interaktion.js`. `dist/d34a` unterscheidet sich von `d33/varR/site` nur im Buildmarker r4-33 → r4-34. `d228c13` hat in `authoring/` denselben Inhalt wie `8f605a8`. |
| Suchtest | **erfüllt** | `suchtest.mjs dist/d34a`: «216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0», Exit 0. Auf der Produktion r4-33 (`site/`): 209 von 216. Die 7 Abweichungen sind die Codex-Fälle und die zwei Kinder-Zeilen. Auf r4-32: 208 von 216. |
| Abgleich mit meinen Nachbildungen | **erfüllt, ohne Abweichung** | Neu im Browser abgefragt: `all33.q` (971) bytegleich mit `d33/all_R.tsv`, `d33/q-r33b.txt` (10) bytegleich mit `d33/b_R.tsv`. 0 JS-Fehler. |
| Gegen r4-32 (`37b963f`) | **erfüllt** | Über 981 Proben sind 16 anders. 13 sind neu angeheftet (Codex-Fälle, Beugungs- und Pluralformen, langer Abstand). 3 haben jetzt Kinder zuerst: «Er tötete die Kinder», «er tötet die Kinder», «er tötet mich und die Kinder schauen zu». 0 Anheftungen und 0 Treffer verloren; Suizid fällt nie aus den ersten drei. |
| Gegen die Produktion r4-33 (`ce56c1d`) | **erfüllt, mit der genannten Ausnahme** | 12 anders. Behoben sind die drei Rückschritte; neu angeheftet sind «Ihr tötetet mich» und «Ihr brachtet mich um». Kinder zuerst haben jetzt die drei Kinder-Sätze oben. Nicht mehr angeheftet ist der harmlose Satz «… ich stelle … meine Medikamente um». Wieder angeheftet wie in r4-32 sind die harmlosen Sätze «die Therapie bringt nichts ich mache mir Sorgen um sie» und «Er bringt die Kinder und zieht sich um» (ohne Satzzeichen). Verloren ist die Anheftung von «Er bringt mich nach dem Streit in der Küche er sagt es um». Keine Suizidaussage geht auf Gewalt. |
| Produktionsbuild | **erfüllt** | 23/23 Seiten `data-puk-site-build="r4-34"`, 46 × `?v=r4-34`, CSS-Kopf und `BUILD` r4-34, `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive e4a4013`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d34a` (SHA-256 von 34 Dateien gleich). |
| `FREIGABE.md` r4-34 | **richtig, eine Lücke** | Anlass, Zeiten, Umfang, die Testliste (209 + 8 − 1 = 216) und die Zahlen im Vergleich stimmen. Ebenso die offene Nennung des konstruierten Satzes und des Bezugsstands. **Lücke:** In der Liste «gegenüber der Produktion r4-33» fehlen die drei Sätze, die jetzt mit Kinder beginnen, darunter «er tötet mich und die Kinder schauen zu» (vorher Gewalt zuerst). Das sind Änderungen der Reihenfolge, keine Rückschritte; sie sollten aber genannt sein. |
| Nachtrag 3 r4-33, Pendenzen | **richtig** | Die Zeiten stimmen mit `gh api` überein: «ready for review» 20:06:22, Merge 20:06:30 UTC, `7bd5e6a`. «Im Verlauf ist keine App angegeben» stimmt (`performed_via_github_app` leer, auch beim Merge von #694). Ob der Merge über den Zugang der bauenden Sitzung lief, kann ich aus der API nicht prüfen. Die Berichtigung der Sätze zum Entwurf in den Nachträgen 1 und 2 ist richtig. Die offenen Punkte für die Auftraggeberin stehen in den Pendenzen: Merge-Sperre, Bezugsstand und Lesart von R31-P03. |

## Hinweise

- **Dringlichkeit:** In der Produktion (r4-33) stehen die drei Rückschritte gegenüber r4-32. Sie gehen auf Verschärfungen zurück, die ich vorgeschlagen und bestätigt hatte (Variante Q, «sie» als Folgewort); r4-34 behebt sie.
- **Merge-Ablauf:** Dass der Pull Request erst nach dem Entscheid der Auftraggeberin eröffnet wird, halte ich für richtig. Bei #689, #694 und #695 wurde jeweils Sekunden bis eine Minute nach dem Codex-Review gemergt. Ich empfehle eine Branch-Regel auf `main`: Der Merge bleibt technisch gesperrt, bis das Codex-Review auf dem exportierten Kopf geprüft ist.
- **Produktionsprüfung:** Die Produktionsprüfungen von r4-32 und r4-33 sind offen. Nach der Auslieferung von r4-34 sollte eine gemeinsame Handprüfung folgen, mit:
  - den Codex-Fällen von #694 und #695;
  - einem Fall mit Kindern;
  - einem Fall mit «Wenn Suizid angesprochen wird»;
  - zwei harmlosen Sätzen mit «bring… um» (`suchtest.mjs` läuft nicht gegen Pretty URLs, R31-P01).
- **Offen bei der Auftraggeberin:** R32-P01 (Sohn und Tochter), der Bezugsstand und die Lesart von R31-P03.

## Vor dem Merge

1. Entscheid der Auftraggeberin zum Merge-Ablauf und zum Bezugsstand.
2. Export und Prüfung, dass `site/` bytegleich mit dem Produktionsbuild ist.
3. Pull Request von diesem Branch.
4. Codex-Review auf dem exportierten Kopf und dessen Prüfung nach R31-P03 (R28-O01, R29-P20).
5. Erst dann der Merge.

## Belege

Im Scratchpad der Prüfsitzung (`/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/`), nicht im Repository:

- `d34/suchtest-e4a4013.txt`, `d34/suchtest-ce5-on-216.txt`, `d34/suchtest-37b-on-216.txt`.
- `d34/all_e4a.tsv`, `d34/b_e4a.tsv`; zum Vergleich `d33/all_prod.tsv`, `d33/b_prod.tsv` (r4-32) und `d33/all_ce5.tsv`, `d33/b_ce5.tsv` (r4-33).
- `d34/prodcopy/`, `d34/prod-a.log`, `d34/d34a.sha`, `d34/prod.sha`.
- Entwurf: `/home/claude/borderline-angehoerige/dist/d34a` (von `.gitignore` erfasst).
