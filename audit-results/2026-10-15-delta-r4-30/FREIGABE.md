# Freigabe r4-30

r4-30 ist die Korrektur nach Release C (r4-29) und umfasst drei Punkte:

1. den P1-Befund aus dem Codex-Review von Pull Request #687;
2. die Suchlücken aus R3 (R3C-A9);
3. die Linkregel auf «Quellen» (R3C-A10).

Dazu kommt der Zwischenspeicher der Suche (W3C-12).

Zeiten: GitHub-Zeiten in UTC, Antworten der Auftraggeberin in Schweizer Ortszeit (MESZ, UTC+2).

## Anlass: Pull Request #687 und das Codex-Review

- Am 15.10.2026 um 09:48 UTC wurde vom Branch `claude/release-c-r4-29-1792043306` der Pull Request #687 eröffnet und um 09:49:24 UTC gemergt, mit dem Stand `a7c5ec1`, dem Produktionsexport vor der Annahme von R3. Eröffnet und gemergt hat ihn das Konto `christaegger-dot`.
- Das Codex-Review von #687 war um 09:53:30 UTC fertig, also nach dem Merge. Damit ist die Regel R28-O01 («erst nach abgeschlossenem und geprüftem Codex-Review mergen») bei #687 nicht eingehalten.
- Die bauende Sitzung hat #687 nicht bemerkt. Ihr lokaler Stand von `main` war veraltet, weil `git fetch` an einem gelöschten alten Branch abbrach. Sie hat danach #688 eröffnet. Dessen Codex-Review («keine Befunde», 10:06:51 UTC) sah nur noch die Nachweis-Commits, weil der Inhalt schon auf `main` lag. Ihre Meldung «Codex-Review ohne Befund» war deshalb irreführend und wurde am 15.10.2026 gegenüber der Auftraggeberin berichtigt. Die Fetch-Einstellung ist inzwischen bereinigt.

Codex meldete auf #687 zwei Befunde:

| Befund | Inhalt | Stand |
| --- | --- | --- |
| P2 | `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` führt E4, E7 und E9 als offen; die Pendenzen R29-P01 bis -P08 fehlen. | erledigt mit #688 (`be3fbe1`) |
| P1 | «bei einem nicht urteilsfähigen Kind die Eltern» schliesst Eltern ohne elterliche Sorge ein. Das gilt für «Fragen und Nachschlagen», «Behandlung» › «Wenn die Person keine Behandlung möchte oder abbricht» und «Wenn Ihr jugendliches Kind betroffen ist». Für «Fragen» und «Behandlung» hatte der Rechtsabgleich (Nr. 8) «die sorgeberechtigten Eltern» vorgeschlagen; die bauende Sitzung hat das wegen des Wortziels zu «die Eltern» gekürzt. Für die Jugendlichen-Seite stammt «entscheiden Sie als Eltern» wörtlich aus dem Rechtsabgleich (Nr. 10b). | korrigiert in r4-30 |

## Freigabe des Wortlauts (15.10.2026, 13:13 Uhr MESZ)

Die Frage an die Auftraggeberin lautete:

> «Korrektur des P1-Befunds von Codex für r4-30. Neuer Wortlaut: (1) Fragen: «Ob jemand eine Therapie beginnt, entscheidet die betroffene Person, bei einem nicht urteilsfähigen Kind die sorgeberechtigten Eltern.» (2) Behandlung: «Ob jemand eine Therapie beginnt oder weiterführt, entscheidet die betroffene Person, bei einem nicht urteilsfähigen Kind die sorgeberechtigten Eltern.», dazu als Ausgleich im nächsten Satz «etwa Scham» statt «zum Beispiel Scham». (3) Jugendliche: «Ist Ihr Kind für eine Behandlungsfrage nicht urteilsfähig, entscheiden die sorgeberechtigten Eltern über die Einwilligung.» Gibst du diesen Wortlaut frei?»

Ihre Antwort, wörtlich:

> «Freigeben (Recommended)»

Grundlage der übrigen Punkte sind ihre Entscheide vom 15.10.2026, 11:59 Uhr (`2026-10-15-release-c-r4-29/FREIGABE.md`, Nachtrag 2, 11:59 Uhr MESZ): «Links entfernen (Recommended)» und «r4-30 direkt nach Merge (Recommended)».

## Umfang von r4-30

| Punkt | Änderung | sichtbar |
| --- | --- | --- |
| P1 | Die drei Sätze lauten wie oben freigegeben; «zum Beispiel Scham» → «etwa Scham» auf «Behandlung» | ja |
| R3C-A10 | Auf «Quellen» stehen drei Angaben ohne Link, der Text bleibt: Pro Juventute «Wenn ein Elternteil psychisch krank ist», Kanton Zürich «Opferbetreuung durch Forensic Nurses», Opferhilfe Schweiz «Schutz». Der Link «Für wen ist die Opferhilfe?» bleibt; seine Seite zeigt keinen Notfallblock. Nach D30-02 ausserdem ohne Link: EBG-Informationsblatt A1 «Definition, Formen und Folgen häuslicher Gewalt» (PDF, Seite 16 mit Kasten «Im Notfall … 117 … 144»), wie B1. | ja, die Links fehlen |
| R3C-A9 | Suizid-Wortfeld ergänzt, u. a. «Selbstmordgedanken», «Selbstmordversuch», «lebensmüde», «Todeswunsch», «Suizidandrohung», «Abschiedsbrief», «Überdosis», «Suizidalität», «Suizidgefahr», «Tabletten genommen». ~~Drohungen gegen die eigene Person («bedroht mich», «mich umzubringen» usw.) gehören als Phrasen zum Wortfeld Gewalt und gehen der Suizidgruppe vor.~~ Überholt durch D30-01 und D30-09: Bei Tötungsverben entscheiden Sprecher und Objekt (siehe Nachtrag 2). «bedroht mich» bleibt im Wortfeld Gewalt. «gegen» ist ein Stoppwort. Aliase: «Psychiatrie Notfall» für «Krisen begleiten» › Kurzbox, «trinkt» für «Grenzen setzen» › riskant. | nur Suchtreffer |
| W3C-12 | Die normalisierten Felder je Sucheintrag werden einmal berechnet und am Element zwischengespeichert. | nein |
| Build | r4-30, Assetversion r4-30 | nein |

Wortbilanz mit Quellenblock: «Behandlung» 2399 (Ziel < 2400), «Fragen» 2398 (≤ 2400), «Jugendliche» 898 (≤ 900), Website 30 667 (≤ 33 000).

`releaseApproval.independentReview` steht auf «ausstehend», bis die unabhängige Prüfung von r4-30 vorliegt. Erst danach folgt der Produktionsexport.

## Nachtrag · Delta-Prüfung und Entscheide (15.10.2026, 13:59 Uhr MESZ)

Die unabhängige Delta-Prüfung (`PRUEFUNG.md`, Stand `9f5ebfe`) ergab «freigabefähig mit Auflagen». Kritische Befunde gab es keine. Umgesetzt ist:

- **D30-01 (wichtig):** Die ersten Gewaltphrasen leiteten Ich-Aussagen («ich will mich umbringen») auf «Gewalt». Neu gehören Ich-Aussagen als Phrase zur Suizidgruppe («ich will mich umbringen», «mich umbringen», «mich zu töten» usw.). Zur Gewaltgruppe gehören nur Drohungen und Taten anderer («droht mich umzubringen», «will mich umbringen», «er bringt mich um», «mit dem Tod bedroht»). Das galt nur für die aufgezählten Phrasen; nicht aufgezählte Formen blieben falsch zugeordnet (D30-09, Nachtrag 2). Die längere Phrase gewinnt. Gestrichen sind «droht mich» und «mit dem Tod» allein. Nachprüfung durch die Prüfsitzung: siehe `PRUEFUNG.md`, Nachprüfung.
- **D30-03 (wichtig):** Die Anfragen sind festgeschrieben in `authoring/tests/suche-ersttreffer.tsv`, damals 168 Anfragen (nach Nachtrag 4: 243) mit erwartetem Ersttreffer. Die Prüfung läuft mit `node authoring/tools/suchtest.mjs <site-ordner>` (Playwright, nicht in der CI).
- **D30-04, teilweise:** ergänzt sind «gewürgt», «Frauenhaus», «Angst vor meinem Partner/Mann, meiner Partnerin/Frau», Pluralformen («Abschiedsbriefe», «Selbstmordversuche», «Todeswünsche», «Suiziddrohungen», «Suizidandrohungen», «Überdosen»), «lebensmüder», «ist lebensmüde», «sich umbringen», «bringt sich um», «Tabletten geschluckt». (Überholt für «sich umbringen» und «bringt sich um»: Diese Phrasen sind seit Nachtrag 2 durch die Regel für Tötungsverben ersetzt; «bringt sie sich um» bleibt nach R25-010 bei «Wenn Worte treffen».) Offen bleiben «Sorgerecht», «Klinik sagt mir nichts», «sie trinkt jeden Abend» und «er zerstört Sachen in der Wohnung» (R30-P01).
- **D30-08:** Im Code ist vermerkt, dass der Zwischenspeicher unveränderte Attribute voraussetzt. «Überdosis Alkohol» ist nicht festgeschrieben, weil der Treffer schwach ist (R30-P01).
- **D30-06:** Die Herkunft der gekürzten Fassung und die Zeitzonen sind berichtigt.

Die Auftraggeberin wurde zu zwei Befunden gefragt. Ihre Antworten, wörtlich:

| Frage | Antwort |
| --- | --- |
| D30-02: Auf «Quellen» ist seit r4-27 das EBG-Informationsblatt A1 … verlinkt. Auf Seite 16 von 17 steht ein blauer Kasten «Im Notfall: Polizei 117, Medizinische Hilfe 144» … Was gilt für A1? | «Link entfernen (Recommended)»: Die Angabe bleibt als Text, die Linkregel bleibt. |
| D30-05: Die vier verlinkten PUK-Seiten haben oben rechts einen fixierten Knopf «Notfall». Die 24-Stunden-Nummern erscheinen erst nach einem Klick. Zählt das als Notfallblock im Sinne der Linkregel? | «Nein, Links bleiben (Recommended)» |

**Auslegung der Linkregel (D30-05), festgehalten:** Ein eingeklappter Notfall-Knopf, dessen Nummern erst nach einem Klick erscheinen, gilt nicht als Notfallblock. Das betrifft die PUK-Seiten auf «Quellen», «Behandlung», «Unterstützung finden» und im Impressum. Der Nachweis zu R3C-A4 ist damit präzisiert.

**D30-07 (optional):** Zwei rechtliche Unschärfen ausserhalb von P1 sind als Pendenz R30-P02 vermerkt: «entscheidet die betroffene Person» gilt nur für Urteilsfähige, und der Fall des Vormunds (Art. 327a ZGB) fehlt.

## Nachtrag 2 · Nachprüfung und Korrektur D30-09 (15.10.2026)

Die Nachprüfung (`PRUEFUNG.md`, Abschnitt «Nachprüfung», Stand `cc370c4`) ergab «freigabefähig mit Auflagen». Auflage vor dem Export war D30-09: Die Korrektur von D30-01 wirkte nur für die aufgezählten Phrasen. Umgesetzt ist:

- **D30-09:** Die Phrasenlisten mit «mich umbringen», «mich zu töten» usw. sind ersetzt durch eine Regel für Tötungsverben («umbringen», «umzubringen», «umbringt», «umgebracht», «töten», «tötet», «getötet» und «bringt … mich … um»). Massgebend ist, wer spricht und wer gemeint ist:
  - Objekt «sich» → Suizid;
  - Objekt «uns», «dich», «ihn», «euch», «die Kinder», «das Kind», «meine Familie» → Gewalt;
  - Objekt «mich» → das nächste Subjekt davor entscheidet: «ich» → Suizid; «er», «sie», «mein Mann», «meine Partnerin», «mein Sohn» usw. → Gewalt; ohne Subjekt bei einem Drohwort («droht», «gedroht», «Drohung» …) Gewalt, sonst Suizid.
  - Unverändert bleiben «Wenn du gehst bringe ich mich um» und «Wenn ich gehe bringt sie sich um» → «Zugewandt und klar sprechen» › «Wenn Worte treffen» (festgelegt in R25-010). Die erste Fassung der Regel hatte «bringt sie sich um» auf «Suizid» geleitet; das ist zurückgenommen.
- **Testliste (D30-11):** 194 Anfragen, darunter alle Proben aus der Nachprüfung (Punkt 1). Verneinende Erwartung `!href` ist möglich; die drei Proben «… mit dem Tod» erwarten jetzt `!grenzen.html#gewalt` statt «kein Treffer». «Medikamente gegen Angst» ist nicht mehr festgeschrieben (schwacher Treffer, wie «Überdosis Alkohol»). Die Kopfzeile nennt die Browser-Variable und den Entwurfsordner vor dem Export.
- **Teil von D30-12, ohne Auflage:** «Morddrohung», «Todesdrohung», «Würgen», «droht mit dem Tod», «Angst vor meinem Sohn, meiner Tochter, meinem Vater, meiner Mutter, meinem Bruder, meiner Schwester» und Drohungen gegen «uns», «die Kinder», «meine Familie» → «Grenzen setzen» › Gewalt; «ich habe mich fast umgebracht», «ich will mich jetzt umbringen» → «Suizid». Die fachliche Zuordnung bestätigt die Fachstelle (R30-P01). Weitere Lücken stehen in R30-P01.
- **D30-10:** Die Zeile R3C-A9 der Tabelle «Umfang» ist als überholt markiert, der Satz im Nachtrag ist eingeschränkt, R30-P01 ist ergänzt, die Reihenfolge in den Pendenzen geordnet.

Ergebnis auf dem Entwurf: «Suchtest: 194 von 194 Ersttreffern wie festgeschrieben · JS-Fehler 0». Gegen `site/` (r4-29) weichen 62 Anfragen ab, keine davon aus dem Bestand (91 und 54). Die Nachprüfung durch die Prüfsitzung steht aus; `releaseApproval.independentReview` bleibt bis dahin «ausstehend».

## Nachtrag 3 · Zweite Nachprüfung und D30-13 (15.10.2026)

Die zweite Nachprüfung (`PRUEFUNG.md`, Abschnitt «Zweite Nachprüfung», Stand `43d6b21`) ergab «freigabefähig»; die Auflage D30-09 ist erfüllt. Für D30-13 empfahl die Prüfsitzung eine Korrektur vor dem Export, weil vier Anfragen gegenüber `cc370c4` zurückfielen. Umgesetzt ist:

- **D30-13:** Die Regel kennt mehr Subjekte und Objekte. Subjekte vor «mich»: zusätzlich «du», «jemand», «man», «Kind», «Ehemann», «Ehefrau», «Exmann», «Exfrau», «Lebenspartner», «Eltern» u. a. Objekte vor dem Verb: zusätzlich «sie» und Personen («meine Mutter», «meine Frau», «meinen Vater» …); ~~«sich» geht vor, weil es näher am Verb steht.~~ Unrichtig: Das galt nur, wenn «sich» direkt vor dem Verb steht; in Nebensätzen und Fragen («dass sich meine Tochter umbringt») zählte die Person als Objekt (D30-16, Nachtrag 4). «droht mit Mord», «mit Mord gedroht», «mit Mord bedroht» gehören zum Wortfeld Gewalt.
- **Aus D30-15:** «umbringe», «umbringst», «umbrachte», «töte» gelten als Tötungsverben; «Angst vor meinem Ex» und «Angst vor meiner Ex» gehören zum Wortfeld Gewalt.
- **Nachweis D30-04 (Nachtrag 1):** «sich umbringen» und «bringt sich um» als überholt markiert.

Ergebnis auf dem Entwurf: «Suchtest: 216 von 216 Ersttreffern wie festgeschrieben · JS-Fehler 0» (22 neue Zeilen: 13 Fälle aus D30-13 und D30-15, sechs Gegenproben mit «sich», drei weitere Gegenproben wie «Zeit totschlagen»). Gegen `site/` (r4-29) weichen 78 Anfragen ab, keine aus dem Bestand (91 und 54). Alle 346 Proben der Prüfsitzung (`q-*.txt`) gegen den Stand `43d6b21`: 16 Ersttreffer anders, alle aus D30-13 und D30-15 oder gleichartig; dazu gehört «ich könnte sie umbringen» → Gewalt wie schon «ich könnte ihn umbringen» (D30-14). Offen bleiben D30-14 und der Rest von D30-15 (R30-P01). Die Nachprüfung dieser Änderung steht aus; `releaseApproval.independentReview` bleibt bis dahin «ausstehend».

## Nachtrag 4 · Dritte Nachprüfung und D30-16 (15.10.2026)

Die dritte Nachprüfung (`PRUEFUNG.md`, Abschnitt «Dritte Nachprüfung», Stand `9299251`) ergab «freigabefähig mit Auflagen»: D30-13 ist behoben, aber die neuen Objekte («sie» und Personen) leiteten Sätze mit «sich» vor der Person auf «Gewalt» («ich habe Angst dass sich meine Tochter umbringt», «warum hat sich meine Mutter umgebracht»), 17 von 17 geprüften Sätzen dieser Form (D30-16). Die Prüfsitzung hat ausserdem ihr Urteil zur zweiten Nachprüfung berichtigt: Schon in `43d6b21` gingen zwei solche Sätze mit «Kind» auf «Gewalt».

Umgesetzt ist die Regel nach Teilsätzen:

1. Gewertet wird der Teilsatz vor dem Verb, begrenzt durch «dass», «wenn», «weil», «ob», «falls», «damit», «nachdem», «seit», «warum», «was», «wie» u. a.
2. Steht «sich» im Teilsatz → Suizid. Ist «sich» mit «und» verbunden («sich und meine Mutter», «die Kinder und sich», «mich und sich») → Gewalt.
3. Sonst das nächste Objekt vor dem Verb: «mich» → das nächste Subjekt davor entscheidet wie bisher; «uns», «dich», «ihn», «euch», «die Kinder», «das Kind», «meine Familie» → Gewalt.
4. Sonst «sie» oder eine Person als Objekt → Gewalt, aber nur mit einem Subjekt davor im Teilsatz («er will meine Mutter umbringen»). Ohne Subjekt («Tochter umbringen») gilt die übliche Suche wie in r4-29.

Ergebnis auf dem Entwurf: «Suchtest: 243 von 243 Ersttreffern wie festgeschrieben · JS-Fehler 0» (27 neue Zeilen: die 17 Sätze mit «sich» vor der Person, «wenn sich jemand umbringen will», drei Stichwortanfragen, drei Sätze mit «sich und …», drei Subjekte aus D30-13). Gegen `site/` (r4-29) weichen 99 Anfragen ab, keine aus dem Bestand (91 und 54). Alle 399 Proben der Prüfsitzung gegen `9299251`: 26 Ersttreffer anders, alle aus D30-16 oder der Ausnahme «sich und …»; dazu gehen «meine Mutter wurde umgebracht», «Angst Tochter umbringt sich» ohne Treffer aus (wie r4-29), «Mutter töten» und «Sohn umbringen Angst» wieder wie r4-29. Die Nachprüfung dieser Änderung steht aus; `releaseApproval.independentReview` bleibt bis dahin «ausstehend».
