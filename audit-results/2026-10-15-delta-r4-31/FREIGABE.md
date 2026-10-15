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
| Testliste | 279 Anfragen, sieben davon neu | nein |
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
