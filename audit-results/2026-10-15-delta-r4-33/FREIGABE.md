# Freigabe r4-33

r4-33 ist die Korrektur nach r4-32. Sie behebt die zwei P1-Befunde aus dem Codex-Review von Pull Request #694 und den Befund R32-03 der Prüfsitzung. Betroffen sind nur die Suche und die Testliste. Inhalte und Texte der Seiten ändern sich nicht.

Zeiten: GitHub-Zeiten in UTC, Antworten der Auftraggeberin in Schweizer Ortszeit (MESZ, UTC+2).

## Anlass

- Pull Request #694 (r4-32) wurde um 19:28 UTC mit Stand `37b963f` eröffnet; das Codex-Review wurde um 19:28:46 UTC angefordert.
- Um 19:32:24 UTC meldete das Review zwei P1-Befunde und einen P2-Befund.
- Um 19:32:36 UTC hat das Konto `christaegger-dot` #694 gemergt (Merge-Commit `4790653`). Das war 12 Sekunden nach dem Review. Die Befunde waren zu diesem Zeitpunkt nicht geprüft, wie schon bei #689. R28-O01 und R29-P20 sind damit erneut nicht eingehalten. Die bauende Sitzung hatte vorher mitgeteilt, #694 erst nach geprüftem Codex-Review zu mergen.
- Die bauende Sitzung bemerkte den Merge nicht sofort. Ihre Antworten auf die drei Codex-Threads (19:37 UTC) und die Korrektur `ea8dc1a` auf dem alten Branch entstanden nach dem Merge. Nachtrag 3 in `2026-10-15-delta-r4-32/FREIGABE.md` behandelt deshalb noch r4-31 als Produktion. Die Prüfsitzung hat den Merge bei ihrer Nachprüfung festgestellt (`2026-10-15-delta-r4-32/PRUEFUNG.md`, Commit `5de69c8`).
- Beide Commits sind hier übernommen (`975c02f`, `20b93ae`). Der Branch ist neu, nach `CLAUDE.md` mit neuem Namen.

**In der Produktion (r4-32, `37b963f`) sichtbar:**

- «Mein Mann bringt mich heute Nacht in unserer Wohnung um» hat keinen Treffer. In r4-31 kam «Gewalt».
- «die Therapie bringt nichts ich mache mir Sorgen um sie» (ohne Komma) heftet Gewalt und Suizid an. In r4-31 kam «Behandlung» › «Rollen».

## Umfang von r4-33

| Punkt | Änderung | sichtbar |
| --- | --- | --- |
| Codex P1 auf #694 (Abstand) | «um» gehört zu «bring… um», solange es im selben Teilsatz steht, höchstens zwölf Wörter nach dem Verb statt sechs. Den Teilsatz beenden Satzmarke und Komma sowie «dass», «wenn», «weil», «ob», «falls», «denn», «aber», «oder», «sondern», «obwohl» und «damit». «sie» und «ihr» gelten nach «um» nicht als neues Subjekt («Sorgen um sie»). | nur Suchtreffer |
| Codex P1 auf #694 (Beugungsformen) | Neu erkannt werden «tötest», «tötete», «töteten», «tötetest», «umbrachten» und «umbrachtest», dazu «brachte», «brachten» und «brachtest» als trennbares Verb. Die Druck-Variante (R25-010) gilt nur in der Gegenwart: «mein Sohn brachte sich um» beginnt mit Suizid. | nur Suchtreffer |
| R32-03 (Prüfsitzung, Variante Q) | Fragewörter («wie», «was», «warum», «wieso», «weshalb», «wo», «wann», «wer») beenden den Teilsatz. «und» beendet ihn ebenfalls, ausser es verbindet Objekte («sich und mich um», «mich und die Kinder um»). So gilt «Was bringt eine Kontaktpause und wie gehe ich mit ihr um?» nicht mehr als Tötungswort. | nur Suchtreffer |
| Codex P2 auf #694 (Sohn, Tochter) | nicht umgesetzt; fachliche Zuordnung, Pendenz R32-P01 | nein |
| Testliste | 209 Anfragen, 12 davon neu | nein |
| Build | r4-33, Assetversion r4-33 | nein |

Variante Q stammt von der Prüfsitzung und ist unverändert übernommen. `interaktion.js` ist bytegleich mit ihrer Nachbildung (`d32/varQ/site/js/interaktion.js`).

## Vergleich

Vergleichsstand ist die Produktion r4-32 (`37b963f`, `site/` auf `main`).

| Probenmenge | Proben | erste drei Treffer anders als `37b963f` |
| --- | --- | --- |
| 885 Proben aus allen Runden | 885 | 0 (bytegleich mit `d32/p_P.tsv` der Prüfsitzung) |
| Codex-Fälle von #694 (`cx694.q`) | 15 | 8, alle beabsichtigt (unten) |
| harmlose Sätze mit «bring…» und «um» (`harmlos.q`) | 19 | 1, beabsichtigt (unten) |
| Proben der Prüfsitzung (`q-r32a`, `q-edge`, `q-r32c`, `q-r32d`) | 47 | 0 |

Die neun Änderungen gegenüber der Produktion:

- «Mein Mann bringt mich heute Nacht in unserer Wohnung um»: kein Treffer → Gewalt › Suizid
- «ich bringe mich heute Nacht in meiner Wohnung um»: kein Treffer → «Wenn Suizid angesprochen wird» › Suizid › Gewalt (R25-010)
- «Er tötete mich fast», «Sie brachten ihn um»: kein Treffer → Gewalt › Suizid
- «Du tötest mich»: «Riskantes Verhalten» → Gewalt › Suizid
- «er brachte sich um», «mein Sohn brachte sich um»: «Vertrauensperson» → Suizid › Gewalt
- «ich tötete mich fast»: kein Treffer → Suizid › Gewalt
- «die Therapie bringt nichts ich mache mir Sorgen um sie»: Gewalt › Suizid → «Behandlung» › «Rollen» wie in r4-31

Mechanischer Abgleich mit den Nachbildungen der Prüfsitzung: 885 Proben gleich `d32/p_P.tsv`. `q-r32a`, `q-edge`, `harmlos.q` und `cx694.q` sind gleich `d32/ea_*.tsv`, `q-r32c` und `q-r32d` gleich `d32/Q2_*.tsv`. Die Probenlisten liegen im Scratchpad, nicht im Repository.

Testliste auf dem Entwurf: «Suchtest: 209 von 209 Erwartungen wie festgeschrieben · JS-Fehler 0».

Nach R31-P03 (beide Lesarten) verschlechtert r4-33 keine Probe gegenüber der Produktion.

`releaseApproval.independentReview` steht auf «ausstehend», bis die Prüfsitzung den Stand bestätigt hat. Erst danach kommt der Produktionsexport.
