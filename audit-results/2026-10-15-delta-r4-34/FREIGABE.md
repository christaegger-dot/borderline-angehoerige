# Freigabe r4-34

r4-34 ist die Korrektur nach r4-33. Sie behebt die drei Rückschritte aus dem Codex-Review von #695 und den Befund R33-01 der Prüfsitzung. Betroffen sind nur die Suche und die Testliste. Inhalte und Texte der Seiten ändern sich nicht.

Zeiten: GitHub-Zeiten in UTC.

## Anlass

- Entwurf #695 (r4-33, Stand `ce56c1d`): Um 20:05:31 UTC meldete das Codex-Review sechs P1-Befunde und einen P2-Befund. Drei davon waren Rückschritte gegenüber r4-32.
- Um 20:06:22 UTC setzte das Konto `christaegger-dot` den Entwurf auf «ready for review», um 20:06:30 UTC folgte der Merge (Merge-Commit `7bd5e6a`). Dazu `2026-10-15-delta-r4-33/FREIGABE.md`, Nachtrag 3.
- Die bauende Sitzung hatte die Korrektur zu dieser Zeit schon begonnen. Sie ist hier übernommen (`d228c13`, aus `8f605a8`), ebenso die Nachprüfung der Prüfsitzung (`89cf160`, aus `6ea195a`). Der Branch ist neu, nach `CLAUDE.md` mit neuem Namen.

In der Produktion (r4-33, `ce56c1d`) sichtbar, jeweils schlechter als r4-32:

- «Er bringt mich wenn ich ihn verlasse um»: «Darf ich verlassen?» statt Gewalt › Suizid
- «Mein Mann bringt mich um sie sieht es»: kein Treffer statt Gewalt › Suizid
- «Er bringt mich und auch die Kinder um»: «Jugendliche» statt Kinder › Gewalt › Suizid

## Umfang von r4-34

| Punkt | Änderung | sichtbar |
| --- | --- | --- |
| Codex P1 auf #695, drei Rückschritte | «bring… um» ist zweistufig. Im Nahbereich bis sechs Wörter nach dem Verb gilt genau die Regel von r4-32 (Variante P). Darüber hinaus bis zwölf Wörter nur im selben Teilsatz, mit den Grenzen aus r4-33 und einem neuen Subjekt («ich», «du», «wir», «er», «man») als Grenze. Was r4-32 erkennt, bleibt erkannt. | nur Suchtreffer |
| Codex P1 auf #695, neuer Satz mit «um-» | «Die Therapie bringt nichts ich stelle … meine Medikamente um» wird nicht mehr angeheftet. | nur Suchtreffer |
| Codex P1 auf #695, Opfer nach gebeugtem Verb | «Er tötete die Kinder», «er tötet die Kinder» → Kinder › Gewalt › Suizid | nur Suchtreffer |
| R33-01 (Prüfsitzung, Variante R) | Die Suche nach dem Opfer hinter dem Verb gilt nicht nach einer Ich-Form. «ich töte mich und die Kinder wissen nichts davon» beginnt mit Suizid. | nur Suchtreffer |
| Codex P1 auf #695, Pluralformen | «tötetet», «umbrachtet», «brachtet» | nur Suchtreffer |
| Codex P2 auf #695 | `suchtest.mjs` kennt die Erwartung «!sicher»: Unter den ersten zwei Treffern darf keiner der vier Sicherheitsabschnitte stehen. Die sieben harmlosen Gegenproben prüfen jetzt so. | nein |
| Testliste | 216 Anfragen. Neu sind acht Zeilen; eine Zeile ohne Komma ist entfernt (unten). | nein |
| Build | r4-34, Assetversion r4-34 | nein |

Variante R stammt von der Prüfsitzung und ist unverändert übernommen. `interaktion.js` ist bytegleich mit ihrer Nachbildung (`d33/varR/site/js/interaktion.js`).

## Vergleich

971 Proben aus allen Runden, zusammengeführt (Scratchpad `all33.q`), dazu die Proben der Prüfsitzung `d33/q-r33b.txt`. Der mechanische Abgleich mit der Prüfsitzung: `all33.q` gleich `d33/all_R.tsv`, `q-r33b` gleich `d33/b_R.tsv`.

**Gegenüber r4-32 (`37b963f`):** 12 Anfragen anders, alle Verbesserungen. Keine Anheftung geht verloren.

**Gegenüber der Produktion r4-33 (`ce56c1d`):** 9 Anfragen in den 971 Proben und 3 in `q-r33b` anders:

- Wieder angeheftet wie in r4-32 sind die drei Rückschritte, dazu neu «Ihr tötetet mich» und «Ihr brachtet mich um».
- Neu mit Kinder › Eskalation zuerst (vorher Suizid oder Gewalt zuerst, beide bleiben oben): «Er tötete die Kinder», «er tötet die Kinder», «er tötet mich und die Kinder schauen zu».
- Nicht mehr angeheftet ist «Die Therapie bringt nichts ich stelle … meine Medikamente um» (harmlos).
- Wieder angeheftet wie in r4-32 sind zwei harmlose Sätze ohne Satzzeichen, «die Therapie bringt nichts ich mache mir Sorgen um sie» und «Er bringt die Kinder und zieht sich um». Das ist der Preis dafür, dass der Nahbereich genau r4-32 entspricht. Mit Komma bleiben beide richtig.
- **Nicht mehr angeheftet ist «Er bringt mich nach dem Streit in der Küche er sagt es um».** Der Satz ist konstruiert, und r4-32 hat ihn auch nicht erkannt. Gegenüber der Produktion r4-33 ist das ein Rückschritt.

Testliste auf dem Entwurf: «Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0».

## Bezugsstand für R31-P03

R31-P03 vergleicht mit «der Produktion». Seit dem Merge von #695 ist das r4-33 (`ce56c1d`), das die drei Rückschritte enthält. Die bauende Sitzung und die Prüfsitzung schlagen vor, für r4-34 r4-32 (`37b963f`) als Bezug zu nehmen.

- Gegenüber r4-32 verschlechtert r4-34 nichts.
- Gegenüber r4-33 verliert der konstruierte Satz oben seine Anheftung.

Den Bezugsstand muss die Auftraggeberin bestätigen.

`releaseApproval.independentReview` steht auf «ausstehend», bis die Prüfsitzung den Stand bestätigt hat.

## Nachtrag 1 · Unabhängige Prüfung und Export (15.10.2026)

Die Prüfsitzung hat den Stand `e4a4013` geprüft (`PRUEFUNG.md`, Commit `c3034ca`). Urteil: «freigabefähig».

Den Abgleich hat sie selbst durchgeführt:

- Suchtest 216 von 216; auf r4-33 sind es 209, auf r4-32 208.
- `all33.q` und `q-r33b` sind bytegleich mit ihren Nachbildungen.
- Gegenüber r4-32 sind 16 von 981 Proben anders. Davon sind 13 neu angeheftet, und bei 3 steht jetzt Kinder zuerst. Keine Anheftung und kein Treffer geht verloren.
- Der Produktionsbuild ist in einer Kopie bytegleich (34 Dateien).

Nach ihrer Einschätzung blockiert r4-34 auch dann nicht, wenn r4-33 der Bezugsstand ist. Der konstruierte Satz ist weder eine Suizidaussage noch eine Ich-Aussage ohne Treffer. Ihren Hinweis auf die drei Sätze mit Kinder zuerst hat die bauende Sitzung in die Liste oben aufgenommen.

`releaseApproval.independentReview` steht damit auf «bestaetigt».

Produktionsexport (`--production --out=site --write-site`):

- 23 Seiten, 0 Blocker, 0 Hinweise.
- «PARITÄT BESTANDEN: 34 Dateien byte-gleich mit site/».
- `site/` ist dateigleich mit dem Entwurf `dist/d34a` der Prüfsitzung.
- Suchtest gegen `site/`: 216 von 216, 0 JS-Fehler.
- Build r4-34 auf 23 Seiten, 0 `tel:`.
- axe (WCAG 2.2 AA) auf allen 23 Seiten bei 320 und 1280 px, auch auf der Suche mit «Mein Mann bringt mich um sie sieht es»: 0 Verstösse, kein Überlauf, keine JS-Fehler. Der erste Treffer per Tab ist dort `grenzen.html#gewalt`.

Den Pull Request eröffnet die bauende Sitzung erst, wenn die Auftraggeberin über den Merge-Ablauf entschieden hat.

## Nachtrag 2 · Entscheide der Auftraggeberin (15.10.2026)

Die Fragen an die Auftraggeberin lauteten, ihre Antworten folgen jeweils wörtlich:

> «r4-34 ist geprüft und exportiert. In der Produktion stehen noch die drei Rückschritte von r4-33, etwa «Mein Mann bringt mich um sie sieht es» ohne Treffer. #689, #694 und #695 wurden jeweils Sekunden nach dem Codex-Review gemergt, bevor ich es geprüft hatte. Wie soll es mit r4-34 laufen?»

Antwort: «PR, Merge nach Meldung (Recommended)». Die bauende Sitzung eröffnet den Pull Request und prüft das Codex-Review nach der Stopp-Regel. Danach meldet sie «mergen» oder «nicht mergen», und erst dann mergt die Auftraggeberin.

> «Mit welchem Stand vergleicht die Stopp-Regel R31-P03 ab jetzt, und wann blockiert ein Codex-Befund?»

Antwort: «r4-32, Suizid unter Top 2 (Recommended)». Der Bezugsstand ist r4-32 (`37b963f`). Ein Befund blockiert in drei Fällen:

- Suizid fällt aus den ersten zwei Treffern, ausser Kinder stehen zuerst.
- Eine Anheftung geht verloren.
- Eine klare Ich-Aussage hat keinen Treffer.

Andere Befunde werden gemeldet und kommen in den nächsten Patch.

> «R32-P01: Sollen Drohungen gegen Sohn oder Tochter («er droht, meine Tochter umzubringen») zuerst auf «Kinder › Bei Eskalation, Gewalt oder fehlender Betreuung» führen? Heute steht dort Gewalt › Suizid.»

Antwort: «Nein, so lassen (Recommended)». Der Kinder-Abschnitt gilt für minderjährige Kinder; Sohn und Tochter können erwachsen sein.

Mit dieser Stopp-Regel geprüft (971 + 10 Proben): Bei allen angehefteten Anfragen ohne Kinder zuerst steht Suizid unter den ersten zwei Treffern. Gegenüber r4-32 geht keine Anheftung verloren (Nachtrag 1).

