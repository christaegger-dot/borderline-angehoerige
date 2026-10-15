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
| Codex P1 (früheres «mich») | Fall (a) der Infinitivregel (D30-20) greift nur, wenn zwischen dem früheren und dem späteren «mich» ein Steuerverb steht, kein «und» und kein Einleitewort. Beispiel: «er hat mich geschlagen und will mich umzubringen» → «Gewalt» (r4-30: «Suizid»). | nur Suchtreffer |
| Testliste | 277 Anfragen, fünf davon neu | nein |
| Build | r4-31, Assetversion r4-31 | nein |

Die Einzelheiten stehen in `2026-10-15-delta-r4-30/FREIGABE.md`, Nachtrag 9.

`releaseApproval.independentReview` steht auf «ausstehend», bis die unabhängige Prüfung von r4-31 vorliegt. Erst danach kommt der Produktionsexport.
