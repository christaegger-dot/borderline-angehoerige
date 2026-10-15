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

## Nachtrag 1 · Unabhängige Prüfung und Export (15.10.2026)

Die Prüfsitzung hat den Stand `ca2a601` geprüft (`PRUEFUNG.md`, Commit `76780fb`). Urteil: «freigabefähig».

Den Abgleich hat sie selbst durchgeführt:
- Suchtest 209 von 209; auf der Produktion sind es 203 von 209.
- 885 Proben bytegleich mit `d32/p_P.tsv`; die übrigen Probenmengen bytegleich mit ihren Nachbildungen.
- Über alle 966 Proben sind gegenüber `37b963f` nur die neun beabsichtigten Anfragen anders.
- Produktionsbuild in einer Kopie bytegleich (34 Dateien).

`releaseApproval.independentReview` steht damit auf «bestaetigt».

Produktionsexport (`--production --out=site --write-site`):

- 23 Seiten, 0 Blocker, 0 Hinweise.
- «PARITÄT BESTANDEN: 34 Dateien byte-gleich mit site/».
- `site/` ist dateigleich mit dem Entwurf `dist/d33a` der Prüfsitzung.
- Suchtest gegen `site/`: 209 von 209, 0 JS-Fehler.
- Build r4-33 auf 23 Seiten, 0 `tel:`.
- axe (WCAG 2.2 AA) auf allen 23 Seiten bei 320 und 1280 px, auch auf der Suche mit «Mein Mann bringt mich heute Nacht in unserer Wohnung um»: 0 Verstösse, kein Überlauf, keine JS-Fehler.
- Tastatur: Bei derselben Anfrage ist der erste Treffer per Tab `grenzen.html#gewalt`.

Der Pull Request wird als Entwurf eröffnet und bleibt einer, bis das Codex-Review auf dem exportierten Kopf geprüft ist. Ein Entwurf lässt sich nicht mergen. So ist R28-O01/R29-P20 auch technisch gesichert, nachdem #689 und #694 Sekunden nach dem Review gemergt wurden.

## Nachtrag 2 · Codex-Review von #695 (15.10.2026)

Entwurf #695 wurde um 19:59 UTC mit Stand `ce56c1d` eröffnet. Um 20:05:35 UTC meldete das Codex-Review sechs P1-Befunde und einen P2-Befund. Geprüft ist jeder gegen die Produktion r4-32 (`37b963f`, Merge-Commit `4790653`):

| Befund | Beispiel | Produktion | `ce56c1d` | Bewertung |
| --- | --- | --- | --- | --- |
| P1 eingeschobener Nebensatz | «Er bringt mich wenn ich ihn verlasse um» | Gewalt › Suizid | «Darf ich verlassen?» | **blockierend**, Rückschritt |
| P1 «sie» nach «um» | «Mein Mann bringt mich um sie sieht es» | Gewalt › Suizid | kein Treffer | **blockierend**, Rückschritt |
| P1 Zusatz nach «und» | «Er bringt mich und auch die Kinder um» | Kinder › Gewalt › Suizid | Jugendliche | **blockierend**, Rückschritt |
| P1 neuer Satz mit «um-» | «Die Therapie bringt nichts ich stelle wegen der starken Nebenwirkungen meine Medikamente um» | kein Treffer | Suizid › Gewalt | neue Fehlanheftung (Kriterium 2) |
| P1 Opfer nach gebeugtem Verb | «Er tötete die Kinder» | «Kinder» (Seite) | Suizid › Gewalt | Kinder fallen aus den ersten drei |
| P1 Pluralformen | «Ihr brachtet mich um» | kein passender Treffer | ebenso | Lücke, kein Rückschritt |
| P2 Gegenproben mit «!href» | Testliste | – | – | Testlücke |

Ursache der drei Rückschritte sind die Verschärfungen im Nahbereich: Nach dem Codex-Review von #694 kamen Wortgrenzen dazu, mit Variante Q weitere für «und» und Fragewörter, ausserdem fiel «sie» als Folgewort weg. Damit dieses Hin und Her aufhört, gilt jetzt eine einfache Garantie: **Was die Produktion erkennt, erkennt r4-33 auch.**

Die Korrektur ist zweistufig:

- **Nahbereich (bis sechs Wörter nach dem Verb):** genau wie in r4-32, also Variante P mit «sie» und «ihr» als Folgewort.
- **Erweiterung (sieben bis zwölf Wörter):** nur im selben Teilsatz. Es gelten die Grenzen aus Nachtrag 3 von r4-32 und Variante Q, dazu ein neues Subjekt («ich», «du», «wir», «er», «man») als Grenze. Damit ist auch die Fehlanheftung «… ich stelle … meine Medikamente um» behoben.

Weitere Änderungen:

- Steht nach einer gebeugten Form ein Kind als Opfer («er tötete die Kinder», «er tötet mich und die Kinder»), kommt Kinder › Eskalation zuerst.
- Neue Formen: «tötetet», «umbrachtet», «brachtet».
- `suchtest.mjs` kennt die Erwartung «!sicher»: Unter den ersten zwei Treffern darf keiner der vier Sicherheitsabschnitte stehen. Die sieben harmlosen Gegenproben prüfen jetzt so.

Nicht mehr gelöst ist «die Therapie bringt nichts ich mache mir Sorgen um sie» ohne Komma: Der Satz heftet wie in der Produktion Gewalt und Suizid an. Mit Komma bleibt er richtig. Das ist der Preis dafür, dass «Mein Mann bringt mich um sie sieht es» erkannt bleibt. Die Testzeile ohne Komma ist entfernt.

Ergebnis auf dem Entwurf:

- «Suchtest: 214 von 214 Erwartungen wie festgeschrieben · JS-Fehler 0». Auf der Produktion sind es 207 von 214; abweichend sind nur die Verbesserungen.
- 971 Proben, zusammengeführt aus allen Mengen inklusive der Codex-Fälle von #694 und #695 (Scratchpad `all33.q`):
  - Gegenüber der Produktion sind genau 12 Anfragen anders, alle Verbesserungen.
  - Bei keiner der 971 Proben geht eine Anheftung verloren, die die Produktion hat.
  - Gegenüber `ce56c1d` sind 9 Anfragen anders: die 7 Codex-Fälle, «er tötet die Kinder» und die Zeile «Sorgen um sie».

`releaseApproval.independentReview` steht wieder auf «ausstehend», bis die Prüfsitzung den neuen Stand bestätigt hat. Danach wird neu exportiert, und auf dem exportierten Kopf folgt ein neues Codex-Review. #695 bleibt bis dahin ein Entwurf.

## Nachtrag 3 · Merge von #695 (15.10.2026)

Das Konto `christaegger-dot` hat den Entwurf #695 um 20:06:22 UTC auf «ready for review» gesetzt und um 20:06:30 UTC gemergt (Merge-Commit `7bd5e6a`, Stand `ce56c1d`). Das geschah nicht über den Zugang der bauenden Sitzung; im Verlauf des Pull Requests ist keine App angegeben. Es war eine Minute nach dem Codex-Review (20:05:31 UTC) und vor dessen Prüfung. R28-O01 und R29-P20 sind damit zum dritten Mal nicht eingehalten (#689, #694, #695).

Die Sätze «#695 bleibt bis dahin ein Entwurf» (Nachtrag 2) und «Ein Entwurf lässt sich nicht mergen. So ist R28-O01/R29-P20 auch technisch gesichert» (Nachtrag 1) treffen nicht zu. Ein Entwurf verhindert keinen Merge, wenn er von Hand freigegeben wird.

Veröffentlicht ist r4-33 auf Stand `ce56c1d`. Damit sind die drei blockierenden Rückschritte aus Nachtrag 2 in der Produktion. Die Korrektur `8f605a8` und die Nachprüfung `6ea195a` gehen in r4-34 (`2026-10-15-delta-r4-34/FREIGABE.md`).

