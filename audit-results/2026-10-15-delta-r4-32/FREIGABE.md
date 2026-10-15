# Freigabe r4-32

r4-32 setzt die Entscheide der Auftraggeberin zu R31-P05 um und vereinfacht die Suchregel für Anfragen mit Tötungswort. Betroffen sind nur die Suche, ein Anker und die Testliste. Der Text der Seiten ändert sich nicht.

Zeiten: Antworten der Auftraggeberin in Schweizer Ortszeit (MESZ, UTC+2).

## Anlass

- r4-30 und r4-31 brauchten zusammen über zwanzig Runden mit Prüfsitzung und Codex. Jede Korrektur der Satzstellungsregel öffnete neue Grenzfälle (D30-09 bis D30-20, R31-01 bis R31-09, Codex-Befunde auf #689 und #690). Daraus entstanden die Stopp-Regeln R31-P02 und R31-P03 und die Pendenzen R31-P04 und R31-P05.
- Die Testliste war auf 317 Anfragen angewachsen, davon gut die Hälfte Sätze mit «umbringen» oder «töten». Dazu die Auftraggeberin am 15.10.2026, wörtlich:

  > «weshalb hat es in dem borderline repo so viele gewalttätige Stellen? und über töten und so weiter? das irritiert mich»

## Entscheide (15.10.2026)

Die Fragen gaben die Vorschläge (1) bis (4) aus R31-P05 wieder (`PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`). Den Wortlaut der Fragen hat die bauende Sitzung nicht festgehalten; die Antworten lauten wörtlich:

| R31-P05 | Vorschlag | Antwort |
| --- | --- | --- |
| (1) | Statt eines Sicherheitsnetzes bei jeder Anfrage mit Tötungsverb beide Abschnitte oben zeigen («Wenn Suizidgedanken ein Thema sind» und «Wenn Gewalt oder Bedrohung vorkommt»); die Regel bestimmt nur die Reihenfolge. | «Ja, beide oben (Recommended)» |
| (2) | Erweiterter Suizid und Drohungen gegen Kinder zuerst auf «Kinder» › «Bei Eskalation, Gewalt oder fehlender Betreuung», dann «Gewalt», dann «Suizid». | «Kinder › Eskalation zuerst (Recommended)» |
| (3) | R25-010 beibehalten; «Wenn Suizid angesprochen wird» in «Wenn Worte treffen» erhält einen eigenen Anker und Sucheintrag. | «Ja, eigener Anker (Recommended)» |
| (4) | Prüfbedarf: «Würgen» als Warnzeichen im Gewalt-Abschnitt. | «Nicht aufnehmen» |

Danach schlug die bauende Sitzung vor (gekürzt):

> «Mein Vorschlag für r4-32: Die Regel wird radikal vereinfacht. Enthält eine Anfrage ein Tötungswort, stehen «Suizid» und «Gewalt» oben, bei genannten Kindern zuerst «Kinder › Eskalation». Für die Reihenfolge reicht eine einfache Faustregel. Die Satzstellungslogik fällt weg, ebenso die meisten Wortlisten. Die Testliste schrumpft auf etwa 30 bis 40 typische Anfragen …»

Antwort der Auftraggeberin: «ja».

## Umfang von r4-32

| Punkt | Änderung | sichtbar |
| --- | --- | --- |
| Sicherheitsabschnitte (1) | Enthält eine Anfrage ein Tötungswort («umbringen», «töten» und Formen, «bringt … um»), stehen «Wenn Suizidgedanken ein Thema sind» (`krise.html#suizid`) und «Wenn Gewalt oder Bedrohung vorkommt» (`grenzen.html#gewalt`) beide zuoberst. Eine Faustregel bestimmt nur die Reihenfolge. Dasselbe gilt ohne Tötungswort, wenn eine Anfrage ein Suizid- und ein Gewaltsignal enthält (Suizid zuerst). | nur Suchtreffer |
| Kinder (2) | Sind Kinder Betroffene («die Kinder umbringen», «mich und die Kinder», «die Kinder und sich»), steht `kinder.html#eskalation` zuerst, dann Gewalt, dann Suizid. Nicht, wenn Kinder nur erwähnt sind («der Kinder wegen», «vor dem Kind», «die Kinder halten mich davon ab, mich umzubringen», «sich mein Kind»). | nur Suchtreffer |
| Anker (3) | `id="suizid-angesprochen"` an der bestehenden Zwischenüberschrift «Wenn Suizid angesprochen wird» auf «Zugewandt und klar sprechen»; der Wortlaut bleibt. Die Suche erhält dafür einen eigenen Eintrag. Bei einer Suiziddrohung als Druck mit trennbarem Verb («Wenn du gehst, bringe ich mich um», «bringt sie sich um») steht dieser Eintrag zuerst, dann Suizid, dann Gewalt (R25-010). | Anker, Suchtreffer |
| Alias | Der Suchalias «Wenn ich gehe bringt sie sich um … Suiziddrohung» an «Wenn Worte treffen» ist entfernt. Auf den neuen Anker verschoben, hätte er bei 24 Suizidanfragen den Ersttreffer «Suizid» verdrängt. | nur Suchtreffer |
| Würgen (4) | keine Änderung | nein |
| Suchindex | Jeder Eintrag trägt `data-search-target` mit dem ursprünglichen Link, damit das Anheften auch nach dem Umschreiben der Links durch Netlify greift. | nein |
| Testliste | `authoring/tests/suche-ersttreffer.tsv`: 192 Anfragen (vorher 317). Die 162 Anfragen ohne Tötungswort bleiben, zwei davon jetzt mit Reihenfolge. Von den 155 Anfragen mit Tötungswort bleiben 30 typische, alle mit festgeschriebener Reihenfolge (Erwartung «a > b > c»); 15 davon standen schon in der Liste. | nein |
| `suchtest.mjs` | prüft die neue Erwartung «a > b > c» | nein |
| Build | r4-32, Assetversion r4-32 | nein |

Die Regel liegt in `authoring/js/interaktion.js` (Block «Sicherheitsabschnitte»).

## Wie weit die Vereinfachung reicht

Vereinfacht ist vor allem die Wirkung: Eine Fehleinschätzung der Reihenfolge kostet einen Platz, nicht mehr die passende Hilfe. Die Reihenfolgeregel selbst ist weniger geschrumpft als angekündigt:

| | r4-31 (Produktion) | r4-32 |
| --- | --- | --- |
| Codezeilen der Regel | 123 | 108 |
| Einträge in Wortlisten | 135 | 90 |
| Testanfragen mit Tötungswort | 155 | 30 |

Ganz ohne Satzstellung geht es nicht. Eine Regel von sechs Zeilen (Suizid zuerst bei «sich», «du … dich» oder «ich» kurz vor «mich», sonst Gewalt bei «mich», «dich», «uns», «ihn», «euch» oder «droht») setzt bei 184 von 618 Proben einen anderen Abschnitt zuerst, darunter klare Fälle wie «er will meine Mutter umbringen» (Suizid zuerst) oder «mich umbringen» (Gewalt zuerst). Die bauende Sitzung hat deshalb die Faustregel behalten: Teilsätze, die Stellung von «ich» und «mich», Personen und Drohwörter.

## Vergleich mit der Produktion

Methode: 885 Proben aus allen bisherigen Runden, die ersten drei Treffer auf der Produktion r4-31 (`site/`) und auf dem Entwurf r4-32 (`dist/site`), Suche mit dem echten `interaktion.js` im Browser. Die Probenliste und die Ergebnisse liegen bewusst nicht im Repository (Anlass oben), sondern im Scratchpad der bauenden Sitzung (`u885.q`, `t3_r31.tsv`, `t3_r32.tsv`, Skript `top3.mjs`).

**618 Proben mit Tötungswort**

| Erste drei Treffer r4-32 | Anzahl |
| --- | --- |
| Suizid › Gewalt › «Krisen begleiten» | 390 |
| Gewalt › Suizid › Kinder › Eskalation | 199 |
| «Wenn Suizid angesprochen wird» › Suizid › Gewalt | 18 |
| Kinder › Eskalation › Gewalt › Suizid | 11 |

- In allen 618 Proben stehen Suizid und Gewalt unter den ersten drei Treffern. In der Produktion standen bei 186 Proben nur Gewalt, bei 383 nur Suizid und bei 49 keiner der beiden unter den ersten drei.
- Gegenüber der Produktion steht bei 15 Proben Gewalt statt Suizid zuerst, Suizid folgt an zweiter Stelle. 12 davon sind Drohungen: sechs gingen in der Produktion wegen eines «sich» in einem anderen Teilsatz auf Suizid («er regt sich auf und droht mich umzubringen», R30-P01), drei blieben nach G2 auf Suizid («er schlägt mich er will mich umzubringen»), dazu «ob mich sie umbringen will», «umbringen will mein Mann mich» und «umbringen darf er mich nicht». Nicht ideal sind die Redewendungen «dass mich die Sorge um meine Tochter umbringt» und «dass mich die Angst vor meinem Mann umbringt»; «er droht mich umzubringen und dann sich selbst» ist ein angedrohter erweiterter Suizid gegen die Lesende.
- Bei 3 Proben steht Suizid statt Gewalt zuerst: «er will mich umbringen und dann bringe ich mich um» (zwei Formen) und «er will mich umbringen ich will mich aber nicht umbringen».
- Bei 11 Proben steht nach Entscheid (2) Kinder › Eskalation zuerst, in der Produktion Suizid (4) oder Gewalt (7). Darunter «ich will mich und die Kinder umbringen»: Suizid steht dort an dritter Stelle.
- Bei 2 Proben steht «Wenn Suizid angesprochen wird» zuerst, in der Produktion Gewalt: «er bringt sich und mich um», «wenn ich gehe bringt er sich und mich um».
- 49 Proben hatten in der Produktion einen anderen oder keinen Ersttreffer (18 ohne Treffer, 16 «Wenn Worte treffen»); sie haben jetzt einen der Sicherheitsabschnitte zuerst.

**267 Proben ohne Tötungswort**

- Ersttreffer: 0 Änderungen.
- Zweiter und dritter Treffer: 64 Änderungen. Bei 63 fällt «Wenn Worte treffen» aus den ersten drei, weil der Absatz zu R25-010 jetzt einen eigenen Eintrag hat und der Alias entfernt ist; meist rückt «Suizidalität» (`diagnose.html#suizidalitaet`) nach.

**Testliste:** «Suchtest: 192 von 192 Erwartungen wie festgeschrieben · JS-Fehler 0» (Entwurf).

## Stopp-Regel R31-P03 unter «beide oben»

R31-P03 blockiert eine Änderung der Suchregel nur, wenn eine Anfrage gegenüber der Produktion schlechter liegt (Suizidsorge → Gewalt, oder eine klare Ich-Aussage ohne Treffer). Mit Entscheid (1) bestimmt die Regel nur noch die Reihenfolge. Die bauende Sitzung liest R31-P03 deshalb so: Schlechter liegt eine Anfrage, wenn Suizid nicht mehr unter den ersten drei Treffern steht oder eine klare Ich-Aussage keinen Treffer hat. Eine andere Reihenfolge innerhalb der Sicherheitsabschnitte wird gemeldet und kommt als Testzeile in die Liste, blockiert aber nicht. Diese Lesart ist von der Auftraggeberin noch zu bestätigen.

Nach dieser Lesart verschlechtert r4-32 keine Probe. Nach der wörtlichen Lesart (Ersttreffer) wären es 15 + 4 Proben, darunter die Ich-Aussage «ich will mich und die Kinder umbringen», die nach Entscheid (2) auf Kinder › Eskalation geht.

`releaseApproval.independentReview` steht auf «ausstehend», bis die unabhängige Prüfung von r4-32 vorliegt. Erst danach kommt der Produktionsexport.
