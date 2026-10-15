# Freigabe r4-30

r4-30 ist die Korrektur nach Release C (r4-29) und umfasst drei Punkte:

1. den P1-Befund aus dem Codex-Review von Pull Request #687;
2. die Suchlücken aus R3 (R3C-A9);
3. die Linkregel auf «Quellen» (R3C-A10).

Dazu kommt der Zwischenspeicher der Suche (W3C-12).

## Anlass: Pull Request #687 und das Codex-Review

- Am 15.10.2026 um 09:48 UTC wurde vom Branch `claude/release-c-r4-29-1792043306` der Pull Request #687 eröffnet und um 09:49:24 UTC gemergt, mit dem Stand `a7c5ec1`, dem Produktionsexport vor der Annahme von R3. Eröffnet und gemergt hat ihn das Konto `christaegger-dot`.
- Das Codex-Review von #687 war um 09:53:30 UTC fertig, also nach dem Merge. Damit ist die Regel R28-O01 («erst nach abgeschlossenem und geprüftem Codex-Review mergen») bei #687 nicht eingehalten.
- Die bauende Sitzung hat #687 nicht bemerkt. Ihr lokaler Stand von `main` war veraltet, weil `git fetch` an einem gelöschten alten Branch abbrach. Sie hat danach #688 eröffnet. Dessen Codex-Review («keine Befunde», 10:06:51 UTC) sah nur noch die Nachweis-Commits, weil der Inhalt schon auf `main` lag. Ihre Meldung «Codex-Review ohne Befund» war deshalb irreführend und wurde am 15.10.2026 gegenüber der Auftraggeberin berichtigt. Die Fetch-Einstellung ist inzwischen bereinigt.

Codex meldete auf #687 zwei Befunde:

| Befund | Inhalt | Stand |
| --- | --- | --- |
| P2 | `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` führt E4, E7 und E9 als offen; die Pendenzen R29-P01 bis -P08 fehlen. | erledigt mit #688 (`be3fbe1`) |
| P1 | «bei einem nicht urteilsfähigen Kind die Eltern» schliesst Eltern ohne elterliche Sorge ein. Das gilt für «Fragen und Nachschlagen», «Behandlung» › «Wenn die Person keine Behandlung möchte oder abbricht» und «Wenn Ihr jugendliches Kind betroffen ist». Der Rechtsabgleich hatte «die sorgeberechtigten Eltern» vorgeschlagen; die bauende Sitzung hat das wegen des Wortziels gekürzt. | korrigiert in r4-30 |

## Freigabe des Wortlauts (15.10.2026, 13:13 Uhr)

Die Frage an die Auftraggeberin lautete:

> «Korrektur des P1-Befunds von Codex für r4-30. Neuer Wortlaut: (1) Fragen: «Ob jemand eine Therapie beginnt, entscheidet die betroffene Person, bei einem nicht urteilsfähigen Kind die sorgeberechtigten Eltern.» (2) Behandlung: «Ob jemand eine Therapie beginnt oder weiterführt, entscheidet die betroffene Person, bei einem nicht urteilsfähigen Kind die sorgeberechtigten Eltern.», dazu als Ausgleich im nächsten Satz «etwa Scham» statt «zum Beispiel Scham». (3) Jugendliche: «Ist Ihr Kind für eine Behandlungsfrage nicht urteilsfähig, entscheiden die sorgeberechtigten Eltern über die Einwilligung.» Gibst du diesen Wortlaut frei?»

Ihre Antwort, wörtlich:

> «Freigeben (Recommended)»

Grundlage der übrigen Punkte sind ihre Entscheide vom 15.10.2026, 11:59 Uhr (`2026-10-15-release-c-r4-29/FREIGABE.md`, Nachtrag 2): «Links entfernen (Recommended)» und «r4-30 direkt nach Merge (Recommended)».

## Umfang von r4-30

| Punkt | Änderung | sichtbar |
| --- | --- | --- |
| P1 | Die drei Sätze lauten wie oben freigegeben; «zum Beispiel Scham» → «etwa Scham» auf «Behandlung» | ja |
| R3C-A10 | Auf «Quellen» stehen drei Angaben ohne Link, der Text bleibt: Pro Juventute «Wenn ein Elternteil psychisch krank ist», Kanton Zürich «Opferbetreuung durch Forensic Nurses», Opferhilfe Schweiz «Schutz». Der Link «Für wen ist die Opferhilfe?» bleibt; die Seite ist regelkonform. | ja, die Links fehlen |
| R3C-A9 | Suizid-Wortfeld ergänzt, u. a. «Selbstmordgedanken», «Selbstmordversuch», «lebensmüde», «Todeswunsch», «Suizidandrohung», «Abschiedsbrief», «Überdosis», «Suizidalität», «Suizidgefahr», «Tabletten genommen». Drohungen gegen die eigene Person («bedroht mich», «mich umzubringen» usw.) gehören als Phrasen zum Wortfeld Gewalt und gehen der Suizidgruppe vor. «gegen» ist ein Stoppwort. Aliase: «Psychiatrie Notfall» für «Krisen begleiten» › Kurzbox, «trinkt» für «Grenzen setzen» › riskant. | nur Suchtreffer |
| W3C-12 | Die normalisierten Felder je Sucheintrag werden einmal berechnet und am Element zwischengespeichert. | nein |
| Build | r4-30, Assetversion r4-30 | nein |

Wortbilanz mit Quellenblock: «Behandlung» 2399 (Ziel < 2400), «Fragen» 2398 (≤ 2400), «Jugendliche» 898 (≤ 900), Website 30 667 (≤ 33 000).

`releaseApproval.independentReview` steht auf «ausstehend», bis die unabhängige Prüfung von r4-30 vorliegt. Erst danach folgt der Produktionsexport.
