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
- **D30-03 (wichtig):** Die Anfragen sind festgeschrieben in `authoring/tests/suche-ersttreffer.tsv`, damals 168 Anfragen (nach Nachtrag 9: 277) mit erwartetem Ersttreffer. Die Prüfung läuft mit `node authoring/tools/suchtest.mjs <site-ordner>` (Playwright, nicht in der CI).
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
2. ~~Steht «sich» im Teilsatz → Suizid. Ist «sich» mit «und» verbunden («sich und meine Mutter», «die Kinder und sich», «mich und sich») → Gewalt.~~ Unrichtig beschrieben und überholt: Der Code wertete jedes «und» neben dem ersten «sich» als Gewalt, auch bei reflexiven Verben («ritzt sich und will sich umbringen», D30-17). Ersetzt durch den Suizid-Vorrang (Nachtrag 5).
3. Sonst das nächste Objekt vor dem Verb: «mich» → das nächste Subjekt davor entscheidet wie bisher; «uns», «dich», «ihn», «euch», «die Kinder», «das Kind», «meine Familie» → Gewalt.
4. Sonst «sie» oder eine Person als Objekt → Gewalt, aber nur mit einem Subjekt davor im Teilsatz («er will meine Mutter umbringen»). Ohne Subjekt («Tochter umbringen») gilt die übliche Suche wie in r4-29.

Ergebnis auf dem Entwurf: «Suchtest: 243 von 243 Ersttreffern wie festgeschrieben · JS-Fehler 0» (27 neue Zeilen: die 17 Sätze mit «sich» vor der Person, «wenn sich jemand umbringen will», drei Stichwortanfragen, drei Sätze mit «sich und …», drei Subjekte aus D30-13). Gegen `site/` (r4-29) weichen 99 Anfragen ab, keine aus dem Bestand (91 und 54). Alle 399 Proben der Prüfsitzung gegen `9299251`: 26 Ersttreffer anders, alle aus D30-16 oder der Ausnahme «sich und …»; dazu gehen «meine Mutter wurde umgebracht», «Angst Tochter umbringt sich» ohne Treffer aus (wie r4-29), «Mutter töten» und «Sohn umbringen Angst» wieder wie r4-29. Die Nachprüfung dieser Änderung steht aus; `releaseApproval.independentReview` bleibt bis dahin «ausstehend».

## Nachtrag 5 · Vierte Nachprüfung, D30-17 und Suizid-Vorrang (15.10.2026)

Die vierte Nachprüfung (`PRUEFUNG.md`, Abschnitt «Vierte Nachprüfung», Stand `ca89da2`) ergab «nicht freigabefähig in diesem Stand». D30-16 ist behoben, aber drei Anfragen zu Selbstverletzung mit Suizidgedanken («mein Sohn ritzt sich und will sich umbringen») gingen auf «Gewalt» statt wie in r4-29 auf «Krisen begleiten» (D30-17). Die Prüfsitzung hält die zweiseitige Regel für grundsätzlich zu fehleranfällig: In vier Runden brachte jede Korrektur eine neue Klasse von Fehlleitungen, dreimal in der Richtung «Suizidsorge → Gewalt». Sie hat eine einseitige Regel vorgeschlagen (Variante F) und im Scratchpad nachgebildet.

Umgesetzt ist Variante F mit einer Ergänzung:

1. **Suizid-Vorrang:** Steht «sich» irgendwo in der Anfrage, gilt bei Tötungsverben Suizid, ohne Ausnahme. Das gilt auch beim erweiterten Suizid («meine Frau will die Kinder und sich umbringen»); der Abschnitt «Wenn Suizidgedanken ein Thema sind» nennt ebenfalls Hilfe. Die drei Erwartungen «sich und …» in der Testliste stehen jetzt auf `krise.html#suizid`.
2. «bringt … um» wird weiterhin nur mit «mich» gewertet (R25-010).
3. **«mich» vor dem Subjekt (D30-18):** Steht direkt nach «mich» ein Subjekt, gilt Gewalt («dass mich mein Mann umbringt», «wenn mich mein Partner umbringen will»). Davor darf ein Wort wie «mein», «meine» oder «der» stehen.
4. **Ergänzung der bauenden Sitzung:** Enthält die Anfrage eine Suizid-Phrase der Suche («will nicht mehr leben» u. a.), gilt Suizid, auch wenn die Regel sonst Gewalt ergäbe. Beispiel: «ich will nicht mehr leben er droht mich umzubringen» → Suizid; in F wäre das Gewalt.
5. Alles Übrige bleibt wie in `ca89da2`: Teilsatz, Objekte, Subjekte, Drohwörter.

Ergebnis auf dem Entwurf: «Suchtest: 251 von 251 Ersttreffern wie festgeschrieben · JS-Fehler 0». Neu sind acht Zeilen: drei aus D30-17 (`!grenzen.html#gewalt`), vier aus D30-18 und die Probe zu Punkt 4. Gegen `site/` (r4-29) weichen 103 Anfragen ab, keine aus dem Bestand (91 und 54). Die 458 Proben der Prüfsitzung (`q-alle.txt`) ergeben dieselben Ersttreffer wie ihre Nachbildung von F, mit einer Ausnahme: die Probe zu Punkt 4. ~~Keine Anfrage mit «sich» geht auf «Gewalt».~~ Ungenau: Das gilt nur für Tötungsverben; beim Muster «bringt … um» gehen Drohungen wie «er bringt sich und mich um» auf «Gewalt» (hinnehmbar, Drohung gegen die eigene Person).

Bekannte Grenzen ~~, alle in der sicheren Richtung (wie r4-29 oder besser),~~ in R30-P01 (ungenau: wegen D30-19 nicht alle in der sicheren Richtung, siehe Nachtrag 6): Drohungen mit einem reflexiven Verb in einem früheren Teilsatz («er regt sich auf und droht mich umzubringen») und der erweiterte Suizid gehen auf «Suizid». Ob der erweiterte Suizid dorthin gehört, entscheidet die Fachstelle.

Die Nachprüfung dieser Änderung steht aus; `releaseApproval.independentReview` bleibt bis dahin «ausstehend».

## Nachtrag 6 · Fünfte Nachprüfung und D30-19 (15.10.2026)

Die fünfte Nachprüfung (`PRUEFUNG.md`, Abschnitt «Fünfte Nachprüfung», Stand `f8c8ce2`) ergab «freigabefähig mit Auflagen». Variante F und die Ergänzung (Suizid-Phrase) sind richtig umgesetzt. Auflage vor dem Export war D30-19: Steht «Familie», «Kind» oder «Kinder» zwischen «mich» und dem Verb, gingen Ich-Aussagen auf «Gewalt» («ich will mich wegen meiner Familie umbringen»), 11 Proben, einige schlechter als r4-29. Die Objektschleife bestand seit `43d6b21`.

Umgesetzt ist Korrektur G der Prüfsitzung:

1. Steht «mich» im Teilsatz, entscheidet die «mich»-Wertung. Erst danach zählen «uns», «dich», «ihn», «euch», «Kind(er)» und «Familie» als Objekt.
2. Die «mich»-Wertung sucht zuerst das nächste Subjekt vor «mich» im Teilsatz («ich» → Suizid, Dritte → Gewalt). Steht dort keines, folgt ein Subjekt direkt nach «mich» («dass mich mein Mann …»), dann ein Subjekt in einem früheren Teilsatz, dann ein Drohwort.

Ergebnis auf dem Entwurf: «Suchtest: 258 von 258 Ersttreffern wie festgeschrieben · JS-Fehler 0». Neu sind die sieben Zeilen, die die Prüfsitzung verlangt hat. Gegen `site/` (r4-29) weichen 108 Anfragen ab, keine aus dem Bestand (91 und 54). Mechanischer Abgleich mit der Nachbildung von G durch die Prüfsitzung: `q-alle2.txt` 492 von 492 und `q-fuenft3.txt` 8 von 8 Ersttreffern gleich wie in `q-alle2.resultG.tsv` und `q-fuenft3.resultG.tsv`, keine Abweichung. Die beiden ungenauen Sätze in Nachtrag 5 sind markiert.

Die Bestätigung des Abgleichs durch die Prüfsitzung steht aus; `releaseApproval.independentReview` bleibt bis dahin «ausstehend».

## Nachtrag 7 · Abschlussbestätigung, Export und Codex-Review von #689 (15.10.2026)

Die Prüfsitzung bestätigte den Stand `a8fe194` als «freigabefähig» (`PRUEFUNG.md`, Abschnitt «Abschlussbestätigung»); den mechanischen Abgleich hat sie selbst durchgeführt. Danach wurde `releaseApproval.independentReview` auf «bestaetigt» gesetzt und exportiert (`085c732`: 23 Seiten · 0 Blocker · 0 Hinweise, Parität 34 Dateien, `suchtest.mjs site` 258/258, axe und Überlauf auf allen 23 Seiten ohne Befund). Pull Request #689 wurde um 13:11 UTC eröffnet; er ist der einzige offene Pull Request.

Das Codex-Review von #689 (13:17 UTC, Stand `085c732`) meldete zwei P1-Befunde, beide in der heiklen Richtung:

| Befund | Inhalt | Korrektur |
| --- | --- | --- |
| P1 (Suizid-Phrase) | Enthält eine Anfrage eine Suizid-Phrase und eine längere Phrase einer anderen Gruppe, gewinnt die längere: «ich will sterben und habe Angst vor meiner Partnerin» → «Gewalt». | Eine Suizid-Phrase oder ein eindeutiges Suizidwort («Suizidgedanken», «Selbstmord» …; nicht «sterben», «umbringen») in der Anfrage geht jeder anderen Phrase vor. Eine verneinte Phrase («ich will nicht tot sein») zählt nicht. |
| P1 (Beiwort) | Nach «mich» wird die Person nur direkt nach dem Artikel erkannt: «Ich habe Angst, dass mich mein eigener Mann umbringt» → «Suizid». | Nach dem Artikel dürfen bis zu zwei Wörter vor der Person stehen; die Suche bricht beim Verb, bei «und» und bei einem Einleitewort ab. |

Ergebnis auf dem Entwurf: «Suchtest: 266 von 266 Ersttreffern wie festgeschrieben · JS-Fehler 0» (acht neue Zeilen zu den beiden Befunden, darunter zwei Gegenproben). Die 500 Proben der Prüfsitzung (alle `q-*.txt`) ergeben gegenüber dem Export `085c732` dieselben Ersttreffer.

`releaseApproval.independentReview` steht wieder auf «ausstehend», bis die Prüfsitzung die Korrektur nachgeprüft hat; `site/` ist bis zum neuen Export der Stand `085c732`. Danach folgen der neue Export und ein neues Codex-Review auf dem vollständigen Stand.

## Nachtrag 8 · Nachprüfung der Codex-Korrektur und D30-20 (15.10.2026)

Die Nachprüfung der Codex-Korrektur (`PRUEFUNG.md`, Abschnitt «Nachprüfung Codex #689», Stand `e93f9dd`) ergab «freigabefähig mit Auflagen»: Beide P1-Korrekturen sind richtig. Auflage vor dem Export war D30-20: In Infinitivsätzen («meine Familie hält mich davon ab, mich umzubringen», «er bittet mich, mich nicht umzubringen») fand die Regel links eine andere Person und meldete «Gewalt». Betroffen waren 13 Ich-Aussagen, fünf davon schlechter als r4-29. Die Klasse steckt schon im Export `085c732`. Die Prüfsitzung hat berichtigt, dass diese Klasse und der Fall aus Codex-P1 (1) schon in `a8fe194` vorhanden waren und in der Abschlussbestätigung nicht erkannt wurden.

Umgesetzt ist Variante I der Prüfsitzung: Folgt auf «mich» innerhalb von vier Wörtern ein Tötungsverb und kommt weder ein Drohwort noch «versucht», «versuchte», «Versuch», «plant» oder «geplant» vor, gilt Suizid, wenn (a) das Verb ein zu-Infinitiv ist («umzubringen», «zu töten») und schon vorher ein «mich» steht, oder (b) «nicht» oder «nie» zwischen «mich» und dem Verb steht.

Ergebnis auf dem Entwurf: «Suchtest: 272 von 272 Ersttreffern wie festgeschrieben · JS-Fehler 0» (sechs neue Zeilen, wie verlangt). Mechanischer Abgleich mit der Nachbildung von I durch die Prüfsitzung: `q-alle4.txt` 575 von 575 Ersttreffern gleich wie in `q-alle4.resultI.tsv`. Die Bestandszeilen (91 und 54) sind in der Testliste enthalten und bestehen.

Offen und in R30-P01: D30-21 (optional, sichere Richtung): Verneinte Einzelwörter zählen als Suizid-Signal («er ist nicht suizidal aber droht mich umzubringen» → «Suizid»).

`releaseApproval.independentReview` bleibt «ausstehend», bis die Prüfsitzung den Abgleich bestätigt hat.

## Nachtrag 9 · Neuer Export und zweites Codex-Review von #689 (15.10.2026)

Nach der Abschlussbestätigung 2 (`PRUEFUNG.md`, Stand `0c711b8`, «freigabefähig») wurde `releaseApproval.independentReview` auf «bestaetigt» gesetzt und neu exportiert (`615bdd3`: 23 Seiten · 0 Blocker · 0 Hinweise, Parität 34 Dateien, `suchtest.mjs site` 272/272, axe und Überlauf auf allen 23 Seiten ohne Befund). Das zweite Codex-Review von #689 (13:50 UTC, Stand `615bdd3`, auf Anforderung) meldete zwei weitere P1-Befunde:

| Befund | Inhalt | Korrektur |
| --- | --- | --- |
| P1 (früheres «mich») | Variante I wertete jedes frühere «mich» als Infinitivsatz: «er hat mich geschlagen und will mich umzubringen» → «Suizid». | Fall (a) von Variante I gilt nur, wenn zwischen dem früheren und diesem «mich» kein «und» und kein Einleitewort steht und in diesem Bereich ein Steuerverb vorkommt («hält … davon ab», «bittet», «hindert … daran», «zwingt», «treibt … dazu», «überredet», «angefleht» u. a.). |
| P1 (mehrere Tötungsverben) | Nur das erste Tötungsverb wurde gewertet: «er will mich umbringen und ich will mich töten» → «Gewalt». | Jedes Tötungsverb wird gewertet; ergibt eines «Suizid», gilt Suizid. |

Ergebnis auf dem Entwurf: «Suchtest: 277 von 277 Ersttreffern wie festgeschrieben · JS-Fehler 0» (fünf neue Zeilen). Die 575 Proben der Prüfsitzung (`q-alle4.txt`) ergeben dieselben Ersttreffer wie der Export `615bdd3`; die 13 Fälle aus D30-20 bleiben bei «Suizid».

`releaseApproval.independentReview` steht wieder auf «ausstehend», bis die Prüfsitzung die Korrektur nachgeprüft hat; `site/` ist bis zum neuen Export der Stand `615bdd3`.
