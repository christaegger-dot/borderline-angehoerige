# Freigabe r4-31

r4-31 ist die Korrektur nach r4-30. Sie behebt die zwei P1-Befunde aus dem zweiten Codex-Review von Pull Request #689. Beide betreffen nur die Suche. Inhalte und Texte der Seiten ändern sich nicht.

Zeiten: GitHub-Zeiten in UTC, Antworten der Auftraggeberin in Schweizer Ortszeit (MESZ, UTC+2).

## Anlass

- Das zweite Codex-Review von #689 lief auf Anforderung auf dem Stand `615bdd3`, dem Produktionsexport nach der Abschlussbestätigung 2. Um 13:50:31 UTC meldete es zwei P1-Befunde.
- Um 13:50:44 UTC hat das Konto `christaegger-dot` #689 gemergt (Merge-Commit `0fda233`). Die Befunde waren zu diesem Zeitpunkt nicht geprüft. R28-O01 und R29-P20 sind damit nicht eingehalten. Die bauende Sitzung hatte vorher mitgeteilt, #689 noch nicht zu mergen.
- Die bauende Sitzung hatte die Korrektur zu dieser Zeit schon auf dem alten Branch committet (`be53f5f`). Sie ist hier übernommen (`01bd44a`).

## Entscheid (15.10.2026)

Die Frage an die Auftraggeberin lautete:

> «#689 ist mit Stand 615bdd3 gemergt, 13 Sekunden nachdem Codex zwei neue P1-Befunde gemeldet hatte (R28-O01/R29-P20 damit nicht eingehalten). Einer davon wirkt jetzt in der Produktion in der heiklen Richtung: «er will mich umbringen und ich will mich töten» landet auf «Gewalt» (r4-29: «Suizid»). Die Korrektur ist fertig (277/277, 575 Proben unverändert). Wie weiter?»

Ihre Antwort, wörtlich:

> «r4-31 jetzt (Recommended)»

Zur Frage, ob der nach dem Merge versehentlich neu angelegte Branch `claude/r4-30-suche-links-1792061353` gelöscht werden soll, antwortete sie: «Löschen (Recommended)». Löschen kann die bauende Sitzung den Branch nicht, weil der Zugang über den Proxy das nicht erlaubt. Die Auftraggeberin löscht ihn selbst.

## Umfang von r4-31

| Punkt | Änderung | sichtbar |
| --- | --- | --- |
| Codex P1 (mehrere Tötungsverben) | Gewertet wird jedes Tötungsverb. Ergibt eines «Suizid», gilt Suizid. Beispiel: «er will mich umbringen und ich will mich töten» → «Suizid» (r4-30: «Gewalt», r4-29: «Suizid»). | nur Suchtreffer |
| Codex P1 (früheres «mich»), R31-01 | Fall (a) der Infinitivregel (D30-20) greift nur, wenn beim früheren «mich» ein Steuerverb steht (ab zwei Wörtern davor bis zum späteren «mich») und zwischen den beiden «mich» kein «und». Beispiel: «er hat mich geschlagen und will mich umzubringen» → «Gewalt» (r4-30: «Suizid»). | nur Suchtreffer |
| Testliste | 305 Anfragen, 33 davon neu (Stand Nachtrag 7) | nein |
| Build | r4-31, Assetversion r4-31 | nein |

Die Einzelheiten stehen in `2026-10-15-delta-r4-30/FREIGABE.md`, Nachtrag 9.

`releaseApproval.independentReview` steht auf «ausstehend», bis die unabhängige Prüfung von r4-31 vorliegt. Erst danach kommt der Produktionsexport.

## Nachtrag 1 · Unabhängige Prüfung und R31-01 (15.10.2026)

Die unabhängige Prüfung (`PRUEFUNG.md`, Stand `adba309`) ergab «freigabefähig mit Auflagen». Beide Codex-Korrekturen wirken wie beabsichtigt. Die Bedingung für das Steuerverb war aber zu eng: Das frühere «mich» wurde nur fünf Wörter zurück gesucht, und die Suche brach bei Einleitewörtern wie «seit» ab. Zwei Ich-Aussagen gingen deshalb auf «Gewalt», eine davon schlechter als r4-29 (R31-01): «nur meine Kinder halten mich seit Jahren immer wieder davon ab mich umzubringen».

Umgesetzt ist Korrektur J der Prüfsitzung: Das frühere «mich» wird ohne Wortgrenze gesucht, und nur «und» beendet die Suche. Die beiden Sätze aus R31-01 stehen in der Testliste.

Ergebnis auf dem Entwurf: «Suchtest: 279 von 279 Ersttreffern wie festgeschrieben · JS-Fehler 0». Beim mechanischen Abgleich mit der Nachbildung von J durch die Prüfsitzung stimmen in `q-alle5.txt` 617 von 617 Ersttreffern mit `q-alle5.resultJ.tsv` überein (Spalte «r30 Ersttreffer»). Die Bestandszeilen (91 und 54) gehören zur Testliste und bestehen.

**Produktionsprüfung r4-30:** Bestanden mit Hinweisen (`2026-10-15-delta-r4-30/PRODUKTIONSPRUEFUNG.md`, eigene Sitzung, 13:59 bis 14:25 UTC). Auf der Produktion ergeben 272 von 272 Anfragen den gleichen Ersttreffer wie die lokale Kopie von `0fda233`. Die beiden Codex-Fälle sind dort so veröffentlicht wie beschrieben.

`releaseApproval.independentReview` bleibt «ausstehend», bis die Prüfsitzung den Abgleich bestätigt hat.

## Nachtrag 2 · Abschlussbestätigung und Export (15.10.2026)

Die Prüfsitzung hat den Stand `57ddb4b` bestätigt (`PRUEFUNG.md`, Abschnitt «Abschlussbestätigung»). Den mechanischen Abgleich hat sie selbst durchgeführt: Suchtest 279 von 279, `q-alle5` 617 von 617 gleich der Nachbildung J, Bestand 91/91 und 54/54 wie r4-29, Produktionsbuild in einer Kopie bytegleich. Die Auflage R31-01 ist erfüllt. Damit ist der letzte Satz von Nachtrag 1 überholt. `releaseApproval.independentReview` steht auf «bestaetigt», danach folgt der Produktionsexport.

Vor dem Merge muss das Codex-Review auf dem endgültigen Kopf des Pull Requests abgeschlossen und geprüft sein (R28-O01, R29-P20).

## Nachtrag 3 · Codex-Review von #690 (15.10.2026)

Pull Request #690 wurde um 14:49:40 UTC eröffnet, mit Stand `1ac8f0b` (Export nach der Abschlussbestätigung). Um 14:55 UTC meldete das Codex-Review drei P1-Befunde. Wie r4-29, r4-30 (`0fda233`) und `1ac8f0b` diese Fälle behandeln:

| Befund | Beispiel | r4-29 | r4-30 | `1ac8f0b` | Korrektur |
| --- | --- | --- | --- | --- | --- |
| Steuerverb fehlt in der Liste | «er hat mich überzeugt mich umzubringen», «er nötigt mich mich umzubringen» | Suizid | Suizid | **Gewalt** | Die Liste der Steuerverben aus r4-31 ist gestrichen. Fall (a) gilt bei jedem früheren «mich» im selben Abschnitt, also ohne «und» dazwischen. Das war ein Rückschritt durch r4-31. |
| Drohwort in einem anderen Abschnitt | «er droht mich umzubringen und meine Kinder halten mich davon ab mich umzubringen» | Quellen | Gewalt | Gewalt | Drohwort, «versucht», «plant» und neu «bedroht» zählen nur noch im eigenen Abschnitt, ab dem letzten «und» vor «mich». |
| «mich» nach dem Verb | «er will mich umbringen und danach töte ich mich» | kein Treffer | Gewalt | Gewalt | Folgt «mich» bis zu drei Wörter nach dem Verb, entscheidet das Subjekt dazwischen («töte ich mich» → Suizid, «umbringen will er mich» → Gewalt). Das gilt nur, wenn vor dem Verb im selben Abschnitt kein «mich» und kein «sich» steht. Sonst gehört das spätere «mich» zu einem neuen Satz, wie in «ich will mich umbringen er hat mich verlassen». |

Ergebnis auf dem Entwurf: «Suchtest: 286 von 286 Ersttreffern wie festgeschrieben · JS-Fehler 0». Neu sind sieben Zeilen, darunter zwei Gegenproben für neue Sätze nach dem Verb. Von den 617 Proben der Prüfsitzung (`q-alle5.txt`) haben gegenüber `1ac8f0b` zwei einen anderen Ersttreffer. Beide gehen in die sichere Richtung, wie schon in r4-30: «er hasst mich will mich umzubringen» und «er schlägt mich jeden Tag will mich umzubringen» → «Suizid», weil kein «und» dazwischen steht.

`releaseApproval.independentReview` steht wieder auf «ausstehend», bis die Prüfsitzung nachgeprüft hat. `site/` bleibt bis zum neuen Export auf dem Stand `1ac8f0b`.

**Entscheid zur Stopp-Regel (15.10.2026):** Die Frage an die Auftraggeberin lautete:

> «Jede Codex-Runde findet neue Grenzfälle der Suchregel (#689: 2+2, #690: 3 P1). Die Regel ist eine Heuristik und wird nie vollständig sein. Die drei aus #690 sind korrigiert (286/286). Nach welcher Regel soll ab jetzt ein Codex-Befund zur Suche den Merge aufhalten?»

Ihre Antwort, wörtlich:

> «Nur Rückschritte blockieren (Recommended)»

Das heisst: Ein Codex-Befund zur Suchregel blockiert den Merge nur, wenn eine Anfrage schlechter liegt als in r4-29, also wenn Suizidsorge auf «Gewalt» führt oder eine klare Ich-Aussage ohne Treffer bleibt. Andere Grenzfälle werden als Testzeile in R30-P01 aufgenommen und im nächsten Patch bearbeitet. Prüfsitzung und bauende Sitzung prüfen jeden Befund gegen r4-29 und melden das Ergebnis.

## Nachtrag 4 · Nachprüfung der Codex-Korrektur, R31-02 bis R31-06 (15.10.2026)

Die Nachprüfung (`PRUEFUNG.md`, Abschnitt «Nachprüfung Codex #690», Stand `17b5786`) ergab nach R31-P02 «nicht freigabefähig». Die drei Codex-Korrekturen wirken für die gemeldeten Beispiele, aber es gibt fünf Rückschritte gegenüber r4-29 (blockierend):

| Befund | Beispiel | seit |
| --- | --- | --- |
| R31-02 | «ich denke ans Umbringen er versteht mich nicht» → «Gewalt»: nach einem Infinitiv wurde ein neuer Satz «er … mich» als Objekt gelesen | neu durch Korrektur (3) aus Nachtrag 3 |
| R31-03 | **«willst du dich umbringen»**, «denkst du daran dich umzubringen» → «Gewalt»: «dich» galt immer als Fremdobjekt. Das ist die direkte Frage, zu der die Website Angehörige ermutigt. | r4-30, in der Produktion |
| R31-04 | «er befiehlt mir mich umzubringen» → «Gewalt»: ein früheres «mir» zählte nicht | r4-30, in der Produktion |
| R31-05 | «meine Familie versucht mich davon abzuhalten mich umzubringen» → «Gewalt»: «versucht» gehörte zu einem anderen Verb | r4-30, in der Produktion |
| R31-06 | «er will mich umbringen und ich töte mich vorher», «… dann töte ich mich» → «Gewalt» | r4-30, in der Produktion |

Umgesetzt ist Variante K der Prüfsitzung (`interaktion.js`, wörtlich nach ihrem Diff):

- (a) Drohwort und «versucht» zählen nur zwischen dem früheren «mich» und dem Verb; auch ein früheres «mir» gilt als Steuerung.
- (b) Steht «mich» direkt nach dem Verb, entscheidet das Subjekt davor im Abschnitt («und ich töte mich»). Bei einem Infinitiv zählt ein Subjekt erst nach dem finiten Verb («umbringen will er mich»); «umbringen er versteht mich» ist ein neuer Satz.
- (c) «du … dich» vor dem Verb ist reflexiv → Suizid («willst du dich umbringen»).
- (d) «ich töte mich» und «töte ich mich» gelten immer als Suizid; «dann» und «danach» trennen wie «und».

Ergebnis auf dem Entwurf: «Suchtest: 297 von 297 Ersttreffern wie festgeschrieben · JS-Fehler 0». Neu sind 11 Zeilen, wie verlangt. Mechanischer Abgleich mit der Nachbildung K der Prüfsitzung (Spalte «K» in `n690/*.result5.tsv`): `q-r690` 86/86, `q-r690b` 74/74, `q-alle5` 617/617, `q-all91` 91/91, `q-54` 54/54, zusammen 922 von 922 ohne Abweichung. Der Preis sind fünf Gewaltsätze, die in die sichere Richtung auf «Suizid» gehen, z. B. «er schwört mir mich umzubringen». Sie und die Grenzfälle G1 bis G4 stehen in R30-P01.

`releaseApproval.independentReview` bleibt «ausstehend», bis die Prüfsitzung den Abgleich bestätigt hat.

## Nachtrag 5 · Abschlussbestätigung 2 und neuer Export (15.10.2026)

Die Prüfsitzung hat den Stand `b9c510f` bestätigt (`PRUEFUNG.md`, Abschnitt «Abschlussbestätigung 2»). Den mechanischen Abgleich hat sie selbst durchgeführt: Suchtest 297 von 297, 922 von 922 Proben gleich der Nachbildung K, Bestand 91/91 und 54/54 wie r4-29, Produktionsbuild in einer Kopie bytegleich. Nach R31-P02 hat sie nichts Blockierendes gefunden. `releaseApproval.independentReview` steht auf «bestaetigt». Danach folgt der Produktionsexport. Erst auf dem exportierten Kopf wird ein neues Codex-Review angefordert. Gemergt wird erst, wenn dieses Review geprüft ist (R28-O01, R29-P20, R31-P02).

## Nachtrag 6 · Zweites Codex-Review von #690 (15.10.2026)

Das zweite Codex-Review von #690 lief auf Anforderung auf dem Stand `ebe8a30`, dem Export nach der Abschlussbestätigung 2, und war um 15:48 UTC fertig. Es meldete einen neuen P1-Befund. Die beiden älteren Inline-Kommentare aus der ersten Runde sind auf den neuen Stand übertragen; ihr Inhalt ist mit Nachtrag 3 behoben und in der Testliste festgeschrieben.

| Befund | Beispiel | r4-29 | `ebe8a30` | Einstufung nach R31-P02 | Korrektur |
| --- | --- | --- | --- | --- | --- |
| Neuer Satz nach dem Infinitiv | «Ich habe Gedanken ans Umbringen. Versteht er mich?» | Suizid | **Gewalt** | Rückschritt gegenüber r4-29, **blockierend** | Nach einem Infinitiv oder Partizip wird «mich» nach dem Verb nur noch gewertet, wenn direkt danach ein Hilfs- oder Modalverb steht («umbringen will er mich», «umgebracht hat er mich»). Sonst beginnt ein neuer Satz, auch ohne Satzzeichen. (Ungenau: Beginnt der neue Satz mit einem Hilfs- oder Modalverb, galt das nicht; R31-07, Nachtrag 7.) |

Ergebnis auf dem Entwurf: «Suchtest: 300 von 300 Ersttreffern wie festgeschrieben · JS-Fehler 0». Neu sind drei Zeilen: die Codex-Probe, dieselbe ohne Satzzeichen und eine Gegenprobe. Die 922 Proben der Prüfsitzung (`n690/`) ergeben dieselben Ersttreffer wie der Export `ebe8a30`.

`releaseApproval.independentReview` steht wieder auf «ausstehend», bis die Prüfsitzung nachgeprüft hat. `site/` bleibt bis zum neuen Export auf dem Stand `ebe8a30`.

## Nachtrag 7 · Abschlussbestätigung 3, R31-07 und Variante L (15.10.2026)

Die Prüfsitzung hat den Stand `7f7ee0f` geprüft (`PRUEFUNG.md`, Abschnitt «Abschlussbestätigung 3»). Ihr Ergebnis nach R31-P02: «nicht freigabefähig». Der Codex-Fall ist behoben, aber es bleibt ein Rückschritt gegenüber r4-29 (R31-07, blockierend). Beginnt die nächste Frage mit einem Hilfs- oder Modalverb, wurde sie als Umstellung gelesen, wie bei «umbringen will er mich». Beispiele: «Ich denke ans Umbringen. Kann er mich verstehen?» → «Gewalt» (r4-29: «Suizid»). Eingeführt hatte den Fehler Variante K (b). Im Export `ebe8a30` steckt er, in der Produktion (r4-30) nicht.

Die Prüfsitzung hat ausserdem festgestellt: Bisher erreichten Satzzeichen die Suchregel nie, weil die Anfrage schon ohne Satzzeichen ankam. Testzeilen mit Satzzeichen prüften deshalb dasselbe wie Testzeilen ohne.

Umgesetzt ist Variante L der Prüfsitzung, wörtlich nach ihrem Diff:

- **L1:** Die Suche gibt der Regel für Tötungsverben den Rohtext. «.», «?», «!» und «;» trennen dort wie «und». Für alle übrigen Teile der Suche bleibt die Anfrage normalisiert.
- **L2:** Ein Hilfs- oder Modalverb nach einem Infinitiv gilt nur als Umstellung, wenn der Infinitiv am Anfang seines Abschnitts steht.

Die bauende Sitzung hat als Alternative eine einseitige Form geprüft: nach Infinitiv mit Hilfsverb nur «ich» → Suizid. Sie hätte keinen Rückschritt gebracht, aber die beiden Gegenproben der Prüfsitzung nicht erfüllt. Deshalb ist es L.

Ergebnis auf dem Entwurf: «Suchtest: 305 von 305 Ersttreffern wie festgeschrieben · JS-Fehler 0». Neu sind fünf Zeilen, wie verlangt. Der Suchtest füllt das Suchfeld mit dem Rohtext, also mit Satzzeichen. Mechanischer Abgleich mit der Nachbildung L (Spalte «K» in `n7f7/*.result5.tsv`): 998 von 998 ohne Abweichung (`q-alle5` 617, `q-r690` 86, `q-r690b` 74, `q-all91` 91, `q-54` 54, `q-r31p3` 58, `q-r31p3b` 18). Weitere Grenzfälle (G5, G6, Infinitiv am Anfang ohne Satzzeichen) stehen in R30-P01.

`releaseApproval.independentReview` bleibt «ausstehend», bis die Prüfsitzung den Abgleich bestätigt hat.

## Nachtrag 8 · Abschlussbestätigung 4 und neuer Export (15.10.2026)

Die Prüfsitzung hat den Stand `93d972b` bestätigt (`PRUEFUNG.md`, Abschnitt «Abschlussbestätigung 4»). Den mechanischen Abgleich hat sie selbst gemacht: Suchtest 305 von 305, 998 von 998 Proben gleich der Nachbildung L, Bestand 91/91 und 54/54 wie r4-29, Produktionsbuild in einer Kopie bytegleich. Nach R31-P02 fand sie nichts Blockierendes.

`releaseApproval.independentReview` steht auf «bestaetigt», danach folgt der Produktionsexport. Erst auf dem exportierten Kopf wird ein neues Codex-Review angefordert. Gemergt wird erst, wenn dieses Review geprüft ist.

Hinweis der Prüfsitzung: Meldet Codex an der Stelle «Infinitiv mit Hilfsverb» nochmals einen Rückschritt, wird auf die einseitige Form M′ gewechselt, statt L weiter zu verfeinern.
