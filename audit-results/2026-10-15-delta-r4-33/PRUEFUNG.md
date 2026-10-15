# Unabhängige Prüfung r4-33

| | |
| --- | --- |
| Gegenstand | Website «Borderline – Orientierung für Angehörige» (Fachstelle Angehörigenarbeit PUK), Entwurf r4-33 |
| Stand | Branch `claude/r4-33-suche-codex-1792093748`, Commit `ca2a601`, auf `origin` gleich. Abgezweigt von `main` `4790653` (Merge von #694, Stand `37b963f`). Übernommen sind `975c02f` (inhaltlich gleich `ea8dc1a`) und `20b93ae` (meine Nachprüfung `5de69c8`, unverändert) |
| Diff zu `main` | <br>• `authoring/js/interaktion.js`: Korrektur von #694 und Variante Q. <br>• Testliste: +12, jetzt 209. <br>• Build und Assetversion r4-33, `independentReview` «ausstehend», `reviewScope`. <br>• Neu `2026-10-15-delta-r4-33/FREIGABE.md`; in `2026-10-15-delta-r4-32/FREIGABE.md` die Nachträge 3 und 4; Pendenzen. <br>• `site/` gleich `main`, also gleich der Produktion r4-32 (`37b963f`) |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d33a`, verglichen mit der Produktion (`site/` = `37b963f`) und meinen Nachbildungen |
| Massstab | Kriterien aus der Prüfung von r4-32; R31-P03 gegenüber der Produktion `37b963f` |
| Prüfsitzung | unabhängig, hat r4-33 nicht gebaut. Code und Inhalt sind unverändert. Auf Auftrag ist nur diese Datei committet. Probenlisten liegen nicht im Repository |
| Zeitpunkt | 15.10.2026, etwa 21:50 bis 22:00 MESZ |

## Ergebnis

**Freigabefähig.** r4-33 enthält genau die geprüfte Korrektur von #694 und Variante Q. Alle Abgleiche laufen ohne Abweichung durch. Gegenüber der Produktion ändern sich nur die neun beabsichtigten Anfragen. Keine Suizidsorge geht auf Gewalt, und keine Anfrage verliert ihren Treffer.

**`independentReview` kann auf «bestaetigt» gesetzt werden.** Die Bestätigung gilt für den Inhalt von `ca2a601`. Ändern sich danach Code, Testliste oder Seiteninhalt, braucht es einen neuen Abgleich; reine Nachweis-Nachträge sind davon nicht betroffen.

## Ergebnis je Punkt

| Punkt | Ergebnis | Beleg |
| --- | --- | --- |
| Code | **erfüllt** | `authoring/js/interaktion.js` ist bytegleich mit meiner Nachbildung `d32/varQ/site/js/interaktion.js`. `dist/d33a` unterscheidet sich von `d32/varQ/site` nur im Buildmarker r4-32 → r4-33. `975c02f` hat in `authoring/` denselben Inhalt wie `ea8dc1a`. |
| Suchtest | **erfüllt** | `suchtest.mjs dist/d33a`: «Suchtest: 209 von 209 Erwartungen wie festgeschrieben · JS-Fehler 0», Exit 0. Gegenprobe auf der Produktion (`site/`): 203 von 209. Die 6 Abweichungen sind die Codex-Zeilen und «… Sorgen um sie» ohne Komma. Die R32-03-Zeilen bestehen dort schon. |
| Abgleich mit meinen Nachbildungen | **erfüllt, ohne Abweichung** | Neu im Browser abgefragt: <br>• 885 Proben bytegleich mit `d32/p_P.tsv`. <br>• `q-r32a`, `q-edge`, `harmlos.q` und `cx694.q` bytegleich mit `d32/ea_*.tsv`. <br>• `q-r32c` und `q-r32d` bytegleich mit `d32/Q2_*.tsv`. <br>0 JS-Fehler. |
| Gegen die Produktion `37b963f` | **erfüllt** | Über 885 + 15 + 19 + 21 + 11 + 11 + 4 Proben unterscheiden sich die ersten drei Treffer nur bei den 9 Anfragen, die `FREIGABE.md` nennt: <br>• 8 Codex-Fälle bekommen Suizid und Gewalt angeheftet; vorher hatten sie keinen Treffer, «Riskantes Verhalten» oder «Vertrauensperson». <br>• «die Therapie bringt nichts ich mache mir Sorgen um sie» geht von Gewalt › Suizid auf `behandlung#rollen`, wie in r4-31. <br>Keine Anfrage verliert ihren Treffer. Neu mit Gewalt zuerst stehen nur Drohungen anderer («Mein Mann bringt mich heute Nacht in unserer Wohnung um», «Er tötete mich fast», «Du tötest mich», «Sie brachten ihn um»). Suizid fällt nur beim harmlosen Satz aus den ersten drei. Nach R31-P03 (beide Lesarten) verschlechtert r4-33 also nichts. |
| Produktionsbuild | **erfüllt** | 23/23 Seiten `data-puk-site-build="r4-33"`, 46 × `?v=r4-33`, CSS-Kopf und `BUILD` r4-33, `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive ca2a601`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d33a` (SHA-256 von 34 Dateien gleich). |
| `FREIGABE.md` r4-33 | **richtig** | Die Zeiten stimmen mit `gh api` überein: «@codex review» um 19:28:46, Review um 19:32:24, Merge um 19:32:36 UTC durch `christaegger-dot`, Merge-Commit `4790653`. Ebenso der Umfang, «209 Anfragen, 12 davon neu» (197 + 12), die Vergleichstabelle und die neun Änderungen. Der Merge ist offen benannt, R28-O01 und R29-P20 als nicht eingehalten. |
| Nachtrag 4 r4-32 und Pendenzen | **richtig** | Nachtrag 4 stellt den Merge, den veröffentlichten Stand und die überholten Sätze von Nachtrag 3 richtig dar. In den Pendenzen sind der Abschnitt «r4-32 veröffentlicht, nicht nachgeprüft» und R32-P01 eingetragen. |

## Hinweise

- **Dringlichkeit:** In der Produktion (r4-32) hat «Mein Mann bringt mich heute Nacht in unserer Wohnung um» weiterhin keinen Treffer, und «die Therapie bringt nichts ich mache mir Sorgen um sie» heftet Gewalt an. Beides behebt r4-33.
- **Merge-Regel:** Bei #689 und #694 wurde jeweils innerhalb von Sekunden nach dem Codex-Review gemergt. Ich empfehle, im nächsten Pull Request den Merge ausdrücklich der bauenden Sitzung nach geprüftem Review zu überlassen oder ihn technisch zu sperren, etwa mit einer Branch-Regel, die ein bestandenes Review verlangt. Die Entscheidung liegt bei der Auftraggeberin.
- **Produktionsprüfung:** Die Produktionsprüfung von r4-32 ist offen. Zusammen mit r4-33 sollte sie in der Produktion von Hand bestätigen, dass Suizid und Gewalt oben stehen. Dazu gehören der Codex-Fall, eine Anfrage mit Kindern, eine mit «Wenn Suizid angesprochen wird» und ein harmloser Satz mit «bring… um» (`suchtest.mjs` läuft nicht gegen Pretty URLs, R31-P01).
- **Weiter offen:** R32-P01 (Sohn und Tochter) und die Bestätigung der Lesart von R31-P03. Beides entscheidet die Auftraggeberin.

## Vor dem Merge

1. Export und Prüfung, dass `site/` bytegleich mit dem Produktionsbuild ist.
2. Pull Request von diesem Branch.
3. Codex-Review auf dem exportierten Kopf und dessen Prüfung nach R31-P03 (R28-O01, R29-P20).
4. Erst dann der Merge.

## Belege

Im Scratchpad der Prüfsitzung (`/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/`), nicht im Repository:

- `d33/suchtest-ca2a601.txt`, `d33/suchtest-37b-on-209.txt`.
- `d33/ca_*.tsv` (`ca2a601`), `d33/prod_*.tsv` (Produktion `37b963f`).
- `d33/prodcopy/`, `d33/prod-a.log`, `d33/d33a.sha`, `d33/prod.sha`.
- Referenzen `d32/p_P.tsv`, `d32/ea_*.tsv`, `d32/Q2_*.tsv`.
- Entwurf: `/home/claude/borderline-angehoerige/dist/d33a` (von `.gitignore` erfasst).
