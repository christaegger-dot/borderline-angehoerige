# Unabhängige Prüfung r4-30 (Delta)

| | |
| --- | --- |
| Gegenstand | Website «Borderline – Orientierung für Angehörige» (Fachstelle Angehörigenarbeit PUK), Entwurf r4-30 |
| Stand | Branch `claude/r4-30-suche-links-1792061353`, Commit `9f5ebfe` (15.10.2026, 13:21 MESZ). Basis `origin/main` = `53c5655` (r4-29, live). Diff `git diff 53c5655 9f5ebfe`: 11 Dateien |
| Prüfobjekt | Entwurf aus `node authoring/tools/build.mjs --out=dist/d30`, verglichen mit `site/` (r4-29) |
| Auftrag | Delta-Prüfung nach `FREIGABE.md` (r4-30), acht Prüfpunkte |
| Prüfsitzung | Unabhängige Prüfsitzung. Sie hat nichts gebaut, nichts korrigiert und nichts entschieden. Keine Datei im Repository geändert ausser diesem Bericht; keine git-Schreibbefehle; Netlify nicht angefasst. GitHub nur lesend (`gh api`). |
| Zeitpunkt | 15.10.2026, etwa 13:25 bis 13:50 MESZ |
| Werkzeuge | Node 22.22, Playwright mit Chromium 1194 (lokal und über den Proxy), axe-core (WCAG 2.2 AA), curl, pdftotext/pdftoppm, Python 3, `python3 -m http.server` für `site/` (Port 8129) und `dist/d30` (Port 8130) |

## Ergebnis

**Freigabefähig mit Auflagen:** Wortlaut, Rechtsbezug, Linkentfernung, Gate, Build, Barrierefreiheit und Wortbilanz sind in Ordnung; aber die neuen Gewaltphrasen der Suche leiten Ich-Aussagen mit Suizidbezug («ich will mich umbringen») neu auf «Wenn Gewalt oder Bedrohung vorkommt» (D30-01), und ein weiterer Link auf «Quellen» verletzt die Linkregel (D30-02). Deshalb soll r4-30 erst nach Korrektur und Nachprüfung von D30-01 exportiert werden.

## Ergebnis je Prüfpunkt

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Freigabe gegen Umsetzung | **erfüllt** | **Wortlaut:** Die drei freigegebenen Sätze stehen wörtlich und je 1-mal in `authoring/content` und im Entwurf: `fragen` «Ob jemand eine Therapie beginnt, entscheidet die betroffene Person, bei einem nicht urteilsfähigen Kind die sorgeberechtigten Eltern.», `behandlung` «Ob jemand eine Therapie beginnt oder weiterführt, … die sorgeberechtigten Eltern.» mit «etwa Scham» statt «zum Beispiel Scham», `jugendliche` «Ist Ihr Kind für eine Behandlungsfrage nicht urteilsfähig, entscheiden die sorgeberechtigten Eltern über die Einwilligung.» Die alten Fassungen («… Kind die Eltern», «entscheiden Sie als Eltern») kommen nicht mehr vor. <br>**Sichtbarer Text aller 23 Seiten** (Chromium, 1280 px, alle `details` offen; verglichen `innerText` von `body`, Titel, Meta-Angaben, alle Links mit Ziel, Text und `aria-label`, alle `aria-label`): 19 Seiten gleich; 4 Seiten verschieden, jede Differenz zugeordnet: `behandlung` (P1 und «etwa»), `fragen` (P1), `jugendliche` (P1), `quellen` (kein Textunterschied; 105 statt 102 Links: die drei entfernten Links, dazu entfällt das `aria-label` «Schutz, Informationsseite der Opferhilfe Schweiz»). <br>**Quelltext** (Buildmarker vereinheitlicht): sonst nur Unterschiede im verborgenen Suchindex von `suche` (Auszüge der drei geänderten Abschnitte, Aliase «trinkt trinken» und «Psychiatrie Notfall psychiatrischer Notfall») und in `js/interaktion.js`. `css/site.css` nur Buildkommentar; `_headers`, `_redirects`, `robots.txt`, `assets/`, `fonts/` bytegleich. |
| 2 | Rechtlich (nur Gesetzeswortlaut) | **erfüllt** | Fedlex, ZGB Stand 1.7.2026 (Abruf 15.10.2026): Art. 19c Abs. 2 «Für urteilsunfähige Personen handelt der gesetzliche Vertreter …»; Art. 304 Abs. 1 «Die Eltern haben von Gesetzes wegen die Vertretung des Kindes gegenüber Drittpersonen im Umfang der ihnen zustehenden elterlichen Sorge.»; Art. 296 Abs. 2 und 3 (gemeinsame Sorge als Grundsatz; minderjährige Eltern und Eltern unter umfassender Beistandschaft ohne Sorge). «die sorgeberechtigten Eltern» entspricht damit Art. 304 Abs. 1 und dem Vorschlag des Rechtsabgleichs Nr. 8; für Nr. 10b schliesst die neue Fassung jetzt auch Eltern ohne Sorge aus, was der Befund P1 verlangt. **Widerspruchsfrei** zum übrigen Text: `jugendliche` › «Ihre Rolle als Mutter oder Vater» sagt «meist gemeinsam im Rahmen der elterlichen Sorge» und mit 18 «endet» die Sorge; `behandlung` › «Wann Sie Auskunft erhalten können» sagt «Als Eltern eines minderjährigen Kindes: Ist das Kind für die konkrete Frage nicht urteilsfähig, vertreten Sie es im Rahmen der elterlichen Sorge.» Beides passt. Restunschärfen ausserhalb von P1 siehe D30-07. |
| 3 | Linkregel | **erfüllt für die drei Links; neuer Verstoss gefunden (D30-02)** | **Umsetzung:** Pro Juventute «Wenn ein Elternteil psychisch krank ist», Kanton Zürich «Opferbetreuung durch Forensic Nurses» und Opferhilfe Schweiz «Schutz» stehen ohne Link, der Text ist unverändert; «Für wen ist die Opferhilfe?» bleibt verlinkt (auf `quellen` und `grenzen`). Keine andere Seite verlinkt eine der drei Adressen. Die Entfernung ist weiter begründet (Abruf 15.10.2026): Pro Juventute zeigt in der Navigation «147 – für Kinder & Jugendliche … Die Notrufnummer für Kinder und Jugendliche»; Forensic Nurses «Brauchen Sie dringend Hilfe? 24/7-Nummer der Opferhilfe 142 anrufen» und `tel:`-Links; «Schutz» «… akuter Gefahr … rufen Sie die Polizei an (117)». <br>**Alle externen Links des Entwurfs:** 88 Adressen (91 in r4-29 minus 3): 23 PubMed, 18 DOI, 47 weitere. Die 47 mit curl abgerufen (42 × 200, 5 × 403), die 40 HTML-Ziele zusätzlich in Chromium über den Proxy (erster Bildschirm 1280 × 900 und ganze Seite, Suche nach Notrufnummern und `tel:`), die 7 PDF mit pdftotext und Seitenbild. Ergebnis: <br>– **Verstoss:** EBG-Informationsblatt A1 (PDF, auf `quellen`): Seite 16 von 17, blauer Kasten «Hilfsangebote bei häuslicher Gewalt … Im Notfall: Polizei … Telefon 117, Medizinische Hilfe … Telefon 144» (D30-02). <br>– **Zur Auslegung:** die 4 PUK-Adressen haben oben rechts einen fixierten Notfall-Knopf; die 24-Stunden-Nummern erscheinen erst nach Klick (D30-05). <br>– **Regelkonform nach Wortlaut:** `angehoerige.ch` (fetter Satz «Im Notfall … Sanitätsnotruf 144.» in der Seitenmitte, kein Kasten), `kinderseele.ch` (143 im Fliesstext unten, wie R3), NICE NG225 («call 111 or 999» im Fliesstext); Beratungs- und Kontakttelefone: Stand by You (HelpLine oben in einem Kreis), VASK, Pro Mente Sana («Rat & Hilfe» im Menü), Selbsthilfe Schweiz, ipw (Stationstelefon, Knopf «Soforthilfe» ohne Nummer), Clienia (Menüpunkt «Eintritt / Notfall» ohne Nummer), Budget- und Schuldenberatung (Adresslisten). Übrige Ziele ohne Notrufnummer. <br>– **Nicht prüfbar:** siehe Abschnitt «Nicht prüfbar». |
| 4 | Suche (Code-Review und Test) | **erfüllt für die Vorgaben; Nebenwirkungen gefunden (D30-01)** | **Code:** Diff gelesen (`interaktion.js`: 14 neue Suizidbegriffe, 7 neue Gewaltphrasen, «gegen» als Stoppwort, Zwischenspeicher; `site.config.json`: zwei Aliase). <br>**Vorgaben (Chromium, beide Stände):** `queries_all.txt` 91/91 und `queries.txt` 54/54 Ersttreffer gleich wie r4-29. R3-Lücken 16/16 mit passendem Ersttreffer: 11 Suizidanfragen (darunter «Lebensmüdigkeit») → `krise#suizid`, «Psychiatrie Notfall» → `krise#krise-schnell`, «er droht mich umzubringen», «bedroht mich mit dem Tod», «fühle mich bedroht» → `grenzen#gewalt`, «Gewalt gegen Kinder» → `kinder#eskalation`. Gegenproben 8/8 unverändert («er droht sich umzubringen», «sie droht mit Suizid», «Suizid», «Selbstmord», «Mein Kind will nicht mehr leben» → `krise#suizid`; «Wenn du gehst bringe ich mich um» → `kommunizieren#worte`; «Tabletten» → `fragen#f-medikamente`; «Medikamente gegen Angst» → `behandlung#keine-behandlung`, schon in r4-29 schwach). <br>**Eigene Anfragen (87):** 43 realistische Anfragen belasteter Angehöriger: r4-29 17 passend, 7 teilweise, 8 unpassend, 11 ohne Treffer; r4-30 20, 7, 7, 9; schlechter nur «meine Frau ist lebensmüde» (vorher 0 Treffer, jetzt unpassend `quellen#leitlinien`). 25 Proben auf Nebenwirkungen: 11 schlechter, 4 besser, 2 gleichwertig anders, 8 gleich. 19 Proben zu Beugung und Ich-Form: 4 besser, 15 gleich. Tabellen im Anhang. <br>**Nebenwirkungen:** «mich umbringen», «mich umzubringen», «mich zu toeten» erfassen Ich-Aussagen; «droht mich» erfasst «droht mich zu verlassen»; «mit dem tod» erfasst «Umgang mit dem Tod» (D30-01). «gegen» als Stoppwort: unauffällig, nur Verschiebungen bei schwachen Treffern (D30-08). <br>**Zwischenspeicher `item.__pukSearch`:** korrekt, solange die `data-search-*`-Attribute nach dem ersten Suchen nicht ändern; im Code ändert sie nichts (kein `setAttribute`, `cloneNode` oder `innerHTML` darauf). Ein nachträglich geändertes Attribut bleibt unberücksichtigt (im Browser nachgestellt). Laufzeit je Eingabe (516 Eingaben, 207 Einträge): Mittel 14,2 → 1,9 ms, Median 12,4 → 0,8 ms, 95 % 23,3 → 6,0 ms. |
| 5 | Gate und Build | **erfüllt** | Entwurf: «23 Seiten · 0 Blocker · 1 Hinweise», einziger Hinweis `WARN … change-review`. Kopie ausserhalb des Repositorys (`git archive 9f5ebfe`), nur `independentReview` auf «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise». Diese Produktionsausgabe ist bytegleich mit `dist/d30` (`diff -rq` leer). Gegenprobe: dieselbe Kopie mit «ausstehend» blockiert («BLOCK … change-review»). `BUILD = 'r4-30'` in `contract.js`, `assetVersion` «r4-30»; 23/23 Seiten `data-puk-site-build="r4-30"`, 46 × `?v=r4-30`, CSS-Kopf «Build r4-30». |
| 6 | Barrierefreiheit und Layout | **erfüllt** | axe (wcag2a, 2aa, 21a, 21aa, 22aa) auf `quellen`, `behandlung`, `fragen`, `jugendliche`, `suche` bei 320 und 1280 px mit offenen `details`: 0 Verstösse; dazu `suche` mit Treffern («Selbstmordgedanken») 0 Verstösse. «Unvollständig» nur `color-contrast` (2) auf `behandlung`, gleich in r4-29. Kein waagrechter Überlauf (`scrollWidth` = Breite, geschlossen und offen). **Tastatur:** Suchfeld nach 14 × Tab erreicht, Eingabe «Tabletten genommen», Status `role=status`, `aria-live=polite` («20 von 37 passenden Inhalten sichtbar.»), Tab auf den ersten Treffer `krise.html#suizid` mit sichtbarem Fokusring, Enter öffnet das Ziel, Fokus auf `section#suizid`. 0 Skriptfehler und 0 Konsolenfehler in allen Läufen. |
| 7 | Wortbilanz und Zuständigkeit | **erfüllt** | `wortbilanz.mjs` (mit Quellenblock): `behandlung` 2399 (< 2400; r4-29 2399), `fragen` 2398 (≤ 2400; 2397), `jugendliche` 898 (≤ 900; 898), Website 30 667 (≤ 33 000; 30 666). Alle übrigen Seiten gleich; `quellen` 5418 statt 5420, weil nach dem entfernten `</a>` der Punkt nicht mehr als eigene Einheit zählt. 0 `tel:` und 0 «Notruf» im Quelltext aller 23 Seiten. Zuständigkeitssatz «Sorgen Sie sich akut um …» im `main` je 1-mal auf `diagnose`, `grenzen`, `kinder`, `kommunizieren`, `krise`, `kurz`, `verstehen`, wie in r4-29. |
| 8 | Nachweise | **teilweise erfüllt** | **GitHub-API (lesend):** #687 eröffnet 09:48:26 UTC, gemergt 09:49:24 UTC durch `christaegger-dot`, Kopf `a7c5ec1`, Merge-Commit `0fc0474`; Codex-Review eingereicht 09:53:27 UTC, Zusammenfassung «Completed» 09:53:30 UTC, zwei Befunde P2 und P1 mit dem in `FREIGABE.md` wiedergegebenen Inhalt. #688 eröffnet 10:05:09 UTC, gemergt 10:11:46 UTC, Merge-Commit `53c5655`, 2 Commits (`76a3c3f`, `be3fbe1`), 6 Dateien; Codex «Completed» 10:06:51 UTC, 👍 um 10:06:55 UTC, keine Befunde. Kein Pull Request für r4-30 offen; `origin/main` = `53c5655`; Fetch-Refspec nur noch `main` und der r4-30-Branch. **Pendenzen:** Die Angaben zur Produktionsprüfung r4-29 (10:18 bis 10:44 UTC, 11 Punkte, 207/207, 9/9, 36/36, 88/88, 102/102) stimmen mit `PRODUKTIONSPRUEFUNG.md` überein; R29-P18 bis -P20 sind sachlich richtig. **Ungenau:** R3C-A9 «umgesetzt», obwohl die Anfragen nicht festgeschrieben sind (D30-03); «die Seite ist regelkonform» für `quellen` (D30-02); Herkunft der gekürzten Fassung und Zeitzonen (D30-06). |

## Befunde

| ID | Priorität | Befund | Beleg | Vorschlag (nicht umgesetzt) |
| --- | --- | --- | --- | --- |
| D30-01 | **wichtig, Auflage vor dem Export** | **Neue Fehlleitungen der Suche durch die Gewaltphrasen.** Weil eine erkannte Phrase allein gewertet wird, gehen Ich-Aussagen mit Suizidbezug jetzt auf «Wenn Gewalt oder Bedrohung vorkommt». Das trifft auch Zitate der betroffenen Person, wie sie Angehörige eintippen (vgl. die Gegenprobe «Wenn du gehst bringe ich mich um»). Ausserdem erfasst «droht mich» eine Trennungsdrohung, und «mit dem tod» erfasst allgemeine Wendungen. | r4-29 → r4-30, Ersttreffer: «ich will mich umbringen», «ich denke daran mich umzubringen», «manchmal möchte ich mich umbringen», «ich könnte mich umbringen»: `krise#suizid` → `grenzen#gewalt`; «ich habe Gedanken mich zu töten»: `verstehen#eisberg` → `grenzen#gewalt`; «er/sie droht mich zu verlassen»: `fragen#f-verlassen` → `grenzen#gewalt`; «er spielt mit dem Tod», «Umgang mit dem Tod», «Konfrontation mit dem Tod»: 0 Treffer → `grenzen#gewalt`. Ursache in `queryGroups`: Phrase vor Einzelwort, längste Phrase gewinnt; «mich umbringen» (14) usw. stehen nur in der Gewaltgruppe. Die Fusszeile der Suchseite zeigt weiter «holen Sie sofort Hilfe»; deshalb nicht kritisch. Es ist aber eine Verschlechterung genau in der Sicherheitssuche, die r4-30 verbessern soll. | Gewaltphrasen nur mit Drohungs- oder Fremdbezug werten, z. B. «droht mich umzubringen», «gedroht mich umzubringen», «versucht mich umzubringen», «bedroht mich», «mich bedroht», «mit dem tod bedroht», «mit dem tod gedroht». Enthält die Anfrage «ich» und reflexiv «mich umbringen», «mich umzubringen», «mich zu toeten» oder «mich toeten» ohne Drohungswort, die Suizidgruppe werten. «droht mich» und «mit dem tod» allein streichen; die R3-Anfragen bleiben über «bedroht mich» und «mich umzubringen» mit Drohungsbezug gedeckt. Danach 91 + 54 + R3-Liste + Gegenproben + die Proben dieses Berichts erneut prüfen (Nachprüfung durch eine Prüfsitzung, nur Suche). |
| D30-02 | **wichtig, Auflage vor dem Export (Entscheid)** | **Weiterer Link auf «Quellen» verletzt die Linkregel.** Der Eintrag EBG «Häusliche Gewalt» verlinkt das Informationsblatt A1 «Definition, Formen und Folgen häuslicher Gewalt» (PDF). Das PDF zeigt auf Seite 16 einen hervorgehobenen Kasten mit Notrufnummern. Nach Entscheid E1 (AR3-4) blieben B1 und B2 aus genau diesem Grund unverlinkt. Der Satz in `FREIGABE.md` «die Seite ist regelkonform» stimmt deshalb nicht. | `https://www.ebg.admin.ch/dam/de/sd-web/RAHHlO0AJ0IV/A1%20Definition%2C%20Formen%20und%20Folgen_EBG_2020.pdf`, Abruf 15.10.2026, 17 Seiten; Seite 16: blauer Kasten «HILFSANGEBOTE BEI HÄUSLICHER GEWALT · Für gewaltbetroffene Personen · Im Notfall · Polizei: www.polizei.ch, Telefon 117 · Medizinische Hilfe: www.erstehilfe.ch, Telefon 144». Link seit Release B (`41920bb`, r4-27); in R3 nicht als Verstoss genannt. `authoring/PRUEFBERICHT.md` › «Freigabe AR3-4», E1: B1 und B2 «nicht verlinkt, weil die PDF am Ende 117 und 144 nennen». | Fachstelle entscheidet wie bei R3C-A10. Bei «Link entfernen»: A1 als Text ohne Link, wie B1; in r4-30 mitnehmen (kein sichtbarer Textunterschied). `FREIGABE.md` und R3C-A10 in den Pendenzen berichtigen. |
| D30-03 | wichtig | **R3C-A9 «Anfragen festschreiben» ist nicht umgesetzt.** Die Anfragen und die erwarteten Ersttreffer stehen weder im Repository noch in `FREIGABE.md`; die Pendenzen melden R3C-A9 trotzdem als «in r4-30 umgesetzt». Die Testlisten liegen nur im Scratchpad der Sitzung und gehen mit ihr verloren. Das war schon R25 bekannt («liegen nicht im Repository»). | `git diff --stat 53c5655 9f5ebfe`: keine Testdatei; `FREIGABE.md` nennt nur die Wörter, keine Ersttreffer; R3-BERICHT R3C-A9: «die Anfragen in die festgeschriebenen Suchtests aufnehmen». | Eine Datei mit Anfrage → erwartetem Ersttreffer ins Repository (z. B. unter `authoring/tools/` oder im Nachweisordner): R3-Liste, Gegenproben, 91/54-Liste und die Proben aus D30-01. Mit einem kleinen Skript in jeder Delta-Prüfung ausführen. Pendenz R3C-A9 bis dahin offen lassen. |
| D30-04 | wichtig (nächster Patch, keine Auflage für r4-30) | **Weitere sicherheitsrelevante Suchlücken**, schon in r4-29, keine Verschlechterung. | 0 Treffer: «er hat mich gewürgt», «Frauenhaus», «er zerstört Sachen in der Wohnung», «Sorgerecht», «Klinik sagt mir nichts», «sie trinkt jeden Abend»; Beugung der neuen Begriffe: «Abschiedsbriefe», «Selbstmordversuche», «Todeswünsche», «Suiziddrohungen», «Suizidandrohungen», «Überdosen», «lebensmüder Sohn». Schwacher Ersttreffer: «ich habe Angst vor meinem Partner» → `ueber#warum`, «meine Frau ist lebensmüde» → `quellen#leitlinien`, «Freundin schreibt dass sie sich umbringen will» → `quellen#leitlinien`, «Er sagt er will sich umbringen» → `beziehungen#verantwortung`, «er sagt er bringt mich um» und «sie sagt sie bringt sich um» → `kommunizieren#worte`, «Sohn hat Tabletten geschluckt» → `fragen#f-medikamente`, «ich will mich töten» → `behandlung#keine-behandlung`. Ursache: Synonyme gelten nur für das exakte Wort, und jede weitere Wortgruppe muss im Abschnitt vorkommen. | Synonymsuche auch über den Wortanfang (z. B. ab 7 Zeichen) oder Pluralformen ergänzen; Wörter der Gruppen Suizid und Gewalt wie eine Phrase vorrangig werten, damit Zusätze wie «Frau», «Freundin», «Sohn» den Treffer nicht verdrängen; «gewürgt/würgen», «Frauenhaus», «Angst vor meinem/meiner», «sich umbringen», «bringt mich um», «bringt sich um» ergänzen. Fachliche Zuordnung von «Frauenhaus» und «gewürgt» durch die Fachstelle. |
| D30-05 | optional | **PUK-Seiten mit Notfall-Knopf.** Die 4 verlinkten PUK-Seiten (`quellen`, `behandlung`, `unterstuetzung`, `impressum-datenschutz`) zeigen oben rechts einen fixierten roten Knopf mit dem Namen «Notfall». Nach Klick erscheint «Benötigen Sie Hilfe? Wir sind 24 Stunden für Sie da» mit drei 24-Stunden-Nummern. Ohne Klick ist keine Nummer sichtbar; nach dem Wortlaut der Regel («zeigt») ist das wohl regelkonform. Der Nachweis zu R3C-A4 («keine hat einen Notfallblock», WebFetch) ist aber unvollständig. | Chromium über den Proxy, 1280 und 390 px: `.float-popup` bei x 1207, y 132 (1280 px), Text «Notfall Anmeldung»; `.float-popup-content` vor dem Klick 0 px sichtbar, nach dem Klick 1280 px breit, mit +41 58 384 66 66, +41 58 384 20 00, +41 58 384 46 82 (Bildschirmfoto `extshots/puk-1-1280-nach.png`). Ähnlich zur Auslegung: Stand by You zeigt die Beratungs-HelpLine oben in einem hervorgehobenen Kreis. | Fachstelle hält die Auslegung fest: zählen eingeklappte Notfall-Knöpfe und hervorgehobene Beratungstelefone oben als Notfallblock? Nachweis R3C-A4 präzisieren. Keine Änderung nötig, wenn die Auslegung «nein» lautet. |
| D30-06 | optional | **Ungenauigkeiten in `FREIGABE.md`.** (a) Die P1-Zeile sagt für alle drei Stellen, die bauende Sitzung habe «die sorgeberechtigten Eltern» wegen des Wortziels gekürzt. Das gilt für «Fragen» und «Behandlung» (Rechtsabgleich Nr. 8). Für die Jugendlichen-Seite stammt «entscheiden Sie als Eltern» wörtlich aus dem Rechtsabgleich Nr. 10b. (b) Die Zeiten mischen UTC («09:48 UTC») und Ortszeit ohne Angabe («13:13 Uhr», «11:59 Uhr» = MESZ). | `RECHTSABGLEICH.md` Nr. 10b; `2026-10-15-release-c-r4-29/FREIGABE-VORLAGE.md`, Zeilen 48 und 56; Commit `9f5ebfe` 13:21 MESZ (nach der Freigabe 13:13 MESZ, also stimmig). | Satz präzisieren; Zeiten einheitlich mit Zone angeben. |
| D30-07 | optional | **Restunschärfen im Rechtsbezug, ausserhalb von P1.** (a) «entscheidet die betroffene Person» gilt nur für Urteilsfähige; der Rechtsabgleich Nr. 8 schlug «Ob eine urteilsfähige Person … entscheidet sie selbst» vor. Auf `behandlung` deckt «Wann Sie Auskunft erhalten können» die urteilsunfähige erwachsene Person ab, ein Widerspruch besteht nicht. (b) Hat kein Elternteil die Sorge, entscheidet der Vormund (Art. 327a ZGB); der Satz nennt ihn nicht. Er ist dadurch nicht falsch. | ZGB Art. 19c, 327a; `behandlung` › `#auskunft` «Ist die Person für eine medizinische Entscheidung nicht urteilsfähig …». | Bei der nächsten Rechtsrunde mit R29-P02 prüfen; für r4-30 nichts ändern. |
| D30-08 | optional | **Kleinere Verschiebungen und Wartung der Suche.** «gegen» als Stoppwort und «Überdosis» in der Suizidgruppe verschieben einzelne schwache Treffer. Der Zwischenspeicher wird nicht ungültig, wenn Attribute später ändern. | «Was hilft gegen Wut»: `selbstfuersorge#akzeptanz` → `verstehen#erleben`; «Überdosis Alkohol»: `grenzen#riskant` → `verstehen#borderline`; «Medikamente gegen Angst» in beiden Ständen `behandlung#keine-behandlung` statt `fragen#f-medikamente`. Zwischenspeicher: Schlüsselwort nach dem ersten Suchen per `setAttribute` gesetzt → bleibt unberücksichtigt. | Mit D30-04 betrachten. Im Code kurz vermerken, dass `__pukSearch` statische Attribute voraussetzt (bei späterer Änderung löschen). |

Kein kritischer Befund.

**Auflagen vor dem Export von r4-30:** D30-01 korrigieren und die Suche nachprüfen lassen; zu D30-02 entscheidet die Fachstelle, und `FREIGABE.md` wird berichtigt; D30-03 (Anfragen festschreiben) am besten zusammen mit D30-01. Erst danach `independentReview` auf «bestaetigt» setzen.

## Nicht prüfbar oder nicht geprüft

- **PubMed (23 Adressen):** Der Proxy liefert nur eine Platzhalterseite (Status 203); die Artikelseiten waren nicht auf Notfallblöcke prüfbar.
- **DOI (18):** 9 lösen auf Verlagsseiten mit Status 200 auf (Text ohne Notrufnummer, nur Zitatnummern); 9 antworten mit 403 (Bot-Schutz) und waren nicht prüfbar.
- **Nur Text, kein Bild:** Die 4 BAG-Seiten und die EBG-Seite «Häusliche Gewalt» antworteten in Chromium mit 502, NHS inform mit 403. Ihr Text ist über curl geprüft (keine Notrufnummer; beim BAG nur die Kontaktnummer in der Fusszeile); der erste Bildschirm ist nicht gesehen.
- **Rechtsbezug:** nur Gesetzeswortlaut (ZGB Art. 19c, 296, 301, 304, 327a); keine Rechtsprechung, Lehre oder PUK-Praxis; keine Prüfung durch den Rechtsdienst.
- **Browser und Hilfsmittel:** nur Chromium; Firefox, Safari und Screenreader nicht geprüft. Die Laufzeit der Suche ist auf einem Rechner gemessen, nicht auf einem schwachen Smartphone.
- **Produktion:** r4-30 ist nicht ausgeliefert; geprüft ist nur der Entwurf lokal. Netlify wurde nicht angefasst.
- **Ansicht ohne JavaScript und Druck:** nicht erneut geprüft (r4-30 ändert daran nichts ausser drei Sätzen und drei Links).

## Anhang: eigene Suchanfragen (Ersttreffer)

**43 realistische Anfragen** (Bewertung: + passend, ~ teilweise, − unpassend, 0 ohne Treffer):

| Anfrage | r4-29 | r4-30 | Bewertung r4-29 → r4-30 |
| --- | --- | --- | --- |
| «mein Mann bedroht mich» | `grenzen#gewalt` | `grenzen#gewalt` | + → + |
| «meine Tochter hat Abschiedsbriefe geschrieben» | 0 Treffer | 0 Treffer | 0 → 0 |
| «Sohn hat Tabletten geschluckt» | `fragen#f-medikamente` | `fragen#f-medikamente` | − → − |
| «sie hat zu viele Tabletten genommen» | `quellen#forschung` | `krise#suizid` | − → + |
| «er hat eine Überdosis genommen» | 0 Treffer | `krise#krisenplan` | 0 → ~ |
| «meine Frau ist lebensmüde» | 0 Treffer | `quellen#leitlinien` | 0 → − |
| «mein Sohn sagt er will nicht mehr leben» | `krise#suizid` | `krise#suizid` | + → + |
| «Freundin schreibt dass sie sich umbringen will» | `quellen#leitlinien` | `quellen#leitlinien` | − → − |
| «er schlägt mich» | `grenzen#gewalt` | `grenzen#gewalt` | + → + |
| «ich habe Angst vor meinem Partner» | `ueber#warum` | `ueber#warum` | − → − |
| «er hat mich gewürgt» | 0 Treffer | 0 Treffer | 0 → 0 |
| «Polizei rufen» | `krise#krise-schnell` | `krise#krise-schnell` | + → + |
| «er zerstört Sachen in der Wohnung» | 0 Treffer | 0 Treffer | 0 → 0 |
| «Gewalt gegen mich» | `fragen#f-medikamente` | `grenzen#gewalt` | − → + |
| «Schutz vor Gewalt» | `grenzen#gewalt` | `grenzen#gewalt` | + → + |
| «Frauenhaus» | 0 Treffer | 0 Treffer | 0 → 0 |
| «ich bin völlig erschöpft» | `selbstfuersorge#unterstuetzung` | `selbstfuersorge#unterstuetzung` | + → + |
| «ich schaffe das nicht mehr» | `verstehen#einordnung` | `verstehen#einordnung` | − → − |
| «Burnout Angehörige» | `unterstuetzung#beratung` | `unterstuetzung#beratung` | + → + |
| «meine 15-jährige Tochter ritzt sich» | `jugendliche` | `jugendliche` | ~ → ~ |
| «Tochter 16 Borderline Diagnose» | `verstehen#einordnung` | `verstehen#einordnung` | ~ → ~ |
| «Jugendliche Borderline Eltern» | `grenzen#rollen` | `grenzen#rollen` | ~ → ~ |
| «Schule und Borderline» | `kurz#borderline` | `kurz#borderline` | ~ → ~ |
| «Kind will keine Therapie» | `behandlung#keine-behandlung` | `behandlung#keine-behandlung` | + → + |
| «Mein Sohn ist 14 und verweigert die Therapie» | `behandlung#angebote` | `behandlung#angebote` | ~ → ~ |
| «Elterliche Sorge» | `jugendliche#rolle` | `jugendliche#rolle` | + → + |
| «Sorgerecht» | 0 Treffer | 0 Treffer | 0 → 0 |
| «geschiedene Eltern Auskunft» | `behandlung#auskunft` | `behandlung#auskunft` | + → + |
| «darf ich als Vater informiert werden» | 0 Treffer | 0 Treffer | 0 → 0 |
| «Klinik sagt mir nichts» | 0 Treffer | 0 Treffer | 0 → 0 |
| «Wartezeit Therapieplatz» | `behandlung#wartezeit` | `behandlung#wartezeit` | + → + |
| «DBT Therapie Zürich» | `behandlung#therapieformen` | `behandlung#therapieformen` | + → + |
| «Wer bezahlt die Therapie» | `behandlung#angebote` | `behandlung#angebote` | ~ → ~ |
| «Einweisung gegen seinen Willen» | `begriffe#b-fu` | `begriffe#b-fu` | + → + |
| «gegen ihren Willen in die Klinik» | 0 Treffer | 0 Treffer | 0 → 0 |
| «fürsorgerische Unterbringung» | `begriffe#b-fu` | `begriffe#b-fu` | + → + |
| «er trinkt zu viel» | `grenzen#kontakt` | `grenzen#riskant` | ~ → + |
| «sie trinkt jeden Abend» | 0 Treffer | 0 Treffer | 0 → 0 |
| «Schulden» | `grenzen#riskant` | `grenzen#riskant` | + → + |
| «Notfall» | `krise#krise-schnell` | `krise#krise-schnell` | + → + |
| «psychiatrischer Notfall» | `krise#krise-schnell` | `krise#krise-schnell` | + → + |
| «Notfall Psychiatrie Zürich» | `unterstuetzung#kantone` | `unterstuetzung#kantone` | − → − |
| «Krise in der Nacht» | `grenzen#saetze` | `grenzen#saetze` | − → − |

**Proben auf Nebenwirkungen** (Auswahl der Änderungen; alle 25 Proben und 19 Beugungsproben in den Ergebnisdateien):

| Anfrage | r4-29 | r4-30 | Wertung |
| --- | --- | --- | --- |
| «ich will mich umbringen» | `krise#suizid` | `grenzen#gewalt` | schlechter (D30-01) |
| «ich denke daran mich umzubringen» | `krise#suizid` | `grenzen#gewalt` | schlechter (D30-01) |
| «manchmal möchte ich mich umbringen» | `krise#suizid` | `grenzen#gewalt` | schlechter (D30-01) |
| «ich könnte mich umbringen» | `krise#suizid` | `grenzen#gewalt` | schlechter (D30-01) |
| «ich habe Gedanken mich zu töten» | `verstehen#eisberg` | `grenzen#gewalt` | schlechter (D30-01) |
| «er droht mich zu verlassen» | `fragen#f-verlassen` | `grenzen#gewalt` | schlechter (D30-01) |
| «sie droht mich zu verlassen» | `fragen#f-verlassen` | `grenzen#gewalt` | schlechter (D30-01) |
| «er spielt mit dem Tod» | 0 Treffer | `grenzen#gewalt` | schlechter (D30-01) |
| «Umgang mit dem Tod» | 0 Treffer | `grenzen#gewalt` | schlechter (D30-01) |
| «Konfrontation mit dem Tod» | 0 Treffer | `grenzen#gewalt` | schlechter (D30-01) |
| «Überdosis Alkohol» | `grenzen#riskant` | `verstehen#borderline` | schlechter (D30-08) |
| «Was hilft gegen Wut» | `selbstfuersorge#akzeptanz` | `verstehen#erleben` | gleichwertig |
| «Selbstmordgedanken Jugendliche» | `kinder` | `fragen#schutz` | gleichwertig, beide schwach |
| «er droht mit dem Tod» | `krise#selbstverletzung` | `grenzen#gewalt` | besser |
| «er hat versucht mich umzubringen» | `krise#suizid` | `grenzen#gewalt` | besser |
| «er will mich umbringen», «sie will mich umbringen», «mein Vater droht mich umzubringen», «er hat gedroht mich umzubringen» | `krise#suizid` | `grenzen#gewalt` | besser |
| «sie nimmt zu viele Tabletten» | `begriffe#begriffe` | `krise#suizid` | besser |
| «Lebensmüde Angehörige» | `unterstuetzung#beratung` | `krise#suizid` | besser |
| «er droht sich umzubringen», «er will sich umbringen», «er hat versucht sich umzubringen», «ich will nicht mehr leben» | `krise#suizid` | `krise#suizid` | gleich, passend |
| «bedroht mich mit einem Messer» | `grenzen#gewalt` | `grenzen#gewalt` | gleich, passend |

## Vorgehen und Belege

Skripte und Ergebnisse liegen ausserhalb des Repositorys unter `/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/d30/`:

- `text.cjs`, `text/`: sichtbarer Text, Links und `aria-label` aller 23 Seiten in beiden Ständen
- `search.cjs`: Suche in beiden Ständen; Listen `q-all91.txt`, `q-54.txt`, `q-r3.txt`, `q-gegen.txt`, `q-eigen.txt`, `q-neben.txt`, `q-flex.txt`, Ergebnisse `*.result.tsv`
- `perf.cjs`: Laufzeit und Zwischenspeicher
- `a11y.cjs`, `a11y-r29.txt`, `a11y-r30.txt`: axe, Überlauf, Tastatur
- `ext-by-page.tsv`, `fetch/`, `fetch2/`, `phones.py`, `phones2.txt`: externe Links mit curl und PDF-Text; `extshot.cjs`, `extshots/`, `findtext.cjs`, `puk2.cjs`: externe Ziele in Chromium; `a1-notfall-16.png`: Seite 16 des EBG-Blatts A1
- `dl-zgb/`: ZGB von Fedlex
- `prodcopy/`, `prodcopy2/`: Produktionsbuild mit «bestaetigt» und Gegenprobe mit «ausstehend»
- `wb29.txt`, `wb30.txt`: Wortbilanz beider Stände

Im Repository ist nur diese Datei neu; sie ist nicht committet. Der Entwurf liegt in `dist/d30` (von `.gitignore` erfasst).

*Nachtrag:* Die bauende Sitzung hat diese Datei unverändert in `cc370c4` committet (Prüfsumme gleich). Der Abschnitt unten ist danach ergänzt und nicht committet.

## Nachprüfung (Stand cc370c4)

| | |
| --- | --- |
| Stand | Branch `claude/r4-30-suche-links-1792061353`, Commit `cc370c4` (15.10.2026, 14:00 MESZ), auf `origin` gleich. Diff zu `9f5ebfe`: 7 Dateien (`interaktion.js`, `quellen.html`, neue `authoring/tests/suche-ersttreffer.tsv` und `authoring/tools/suchtest.mjs`, `FREIGABE.md`, Pendenzen, dieser Bericht) |
| Prüfobjekt | frischer Entwurf `node authoring/tools/build.mjs --out=dist/d30b`, verglichen mit `site/` (r4-29) und `dist/d30` (`9f5ebfe`) |
| Prüfsitzung | dieselbe unabhängige Prüfsitzung; nichts gebaut, korrigiert oder entschieden; nur diese Datei geändert; keine git-Schreibbefehle; Netlify nicht angefasst |
| Zeitpunkt | 15.10.2026, etwa 14:05 bis 14:35 MESZ |

### Ergebnis der Nachprüfung

**Freigabefähig mit Auflagen:** D30-02, -03, -05, -06 und -08 sind erledigt, und alle Bestandsanfragen, Builds und Texte sind in Ordnung; die Korrektur von D30-01 wirkt aber nur für die aufgezählten Phrasen. Drohungen anderer in nicht aufgezählter Form («er will mich töten», «er versucht mich zu töten», «er würde mich umbringen») landen auf der Suizidseite, und zwei Ich-Aussagen in der Vergangenheit («ich habe versucht mich umzubringen») landen auf «Gewalt» (D30-09). Auflage vor dem Export ist deshalb D30-09.

Zur Einordnung: Gegenüber der Produktion (r4-29) ist der Stand auch so klar besser. Die Fehlleitungen von Drohungen auf «Suizid» gibt es in r4-29 genauso (Klasse R3C-02). Neu falsch sind nur die zwei Ich-Aussagen in der Vergangenheit; r4-29 hatte für sie keinen Treffer. Die Korrektur ist klein und mit `suchtest.mjs` prüfbar; deshalb empfehle ich, sie vor dem Export zu machen.

### Beleg je Punkt

| Nr. | Punkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | D30-01 behoben? | **teilweise** | 87 neue Proben in drei Ständen (r4-29, `9f5ebfe`, `cc370c4`), dazu alle Proben aus D30-01 und D30-04. <br>**Behoben:** Die 5 Ich-Aussagen aus D30-01 → `krise#suizid`. Ebenso: «ich möchte mich umbringen», «ich denke daran mich zu töten», «ich will mich töten», Zitate wie «sie hat gesagt ich will mich umbringen» und «mein Sohn schreibt ich will mich umbringen», «ich will mich umbringen weil er mich schlägt». «er/sie droht mich zu verlassen» → `fragen#f-verlassen`. «er spielt mit dem Tod», «Umgang mit dem Tod», «Konfrontation mit dem Tod» → 0 Treffer, also nicht mehr «Gewalt». Drohungen anderer in den aufgezählten Formen → `grenzen#gewalt`: «er/sie/mein Partner will mich umbringen», «ich glaube er will mich umbringen», «sie sagte sie will mich umbringen», «er droht mich umzubringen», «er versucht mich umzubringen», «er hat versucht mich umzubringen», «er droht mich zu töten», «er bringt mich um», «er sagt er bringt mich um», «ich habe Angst er bringt mich um», «er hat mir mit dem Tod gedroht», «er hat mich mit dem Tod bedroht». <br>**Nicht behoben:** Drohungen anderer → `krise#suizid`: «er will mich töten», «sie will mich töten», «mein Mann will mich töten», «er versucht mich zu töten», «er hat gedroht mich zu töten», «er würde mich umbringen», «er könnte mich umbringen», «er wollte mich umbringen», «Drohung mich umzubringen», «sie droht mir mich umzubringen». Sieben davon waren in `9f5ebfe` auf `grenzen#gewalt`. Ich-Aussagen → `grenzen#gewalt`: «ich habe versucht mich umzubringen», «ich habe gedroht mich umzubringen» (r4-29: 0 Treffer). Mehrdeutig, hinnehmbar: «will mich umbringen» ohne Subjekt → «Gewalt». Ursache: «mich umbringen», «mich umzubringen», «mich toeten» und «mich zu toeten» stehen ohne Subjekt in der Suizidgruppe. Jede nicht aufgezählte Drohung fällt deshalb auf «Suizid» zurück. Umgekehrt sind «versucht mich umzubringen» und «gedroht mich umzubringen» länger als jede passende Ich-Phrase (D30-09). |
| 2 | Bestandsanfragen | **erfüllt** | `queries_all.txt` 91/91 und `queries.txt` 54/54: Ersttreffer gleich wie `site/` (r4-29). R3-Liste 16/16 und Gegenproben 8/8 gleich wie in `9f5ebfe`. Die 54 sind in den 91 enthalten. 0 Skriptfehler. |
| 3 | `suchtest.mjs` | **erfüllt, mit Hinweisen** | `node authoring/tools/suchtest.mjs dist/d30b`: «168 von 168 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Gegenprobe auf `site/` (r4-29): 129 von 168. Der Test erkennt also Abweichungen. Die 91 Bestandszeilen entsprechen genau `queries_all.txt`, und ihre Erwartungen entsprechen genau den Ersttreffern von r4-29. Das Skript wählt den ersten sichtbaren Eintrag in `[data-search-results]`; das ist der beste Treffer, weil `renderSearch` die Treffer der Reihe nach ans Ende hängt. **Sinnvoll** sind die Erwartungen der R3-Liste, der Gegenproben und der D30-04-Zeilen. **Nicht sinnvoll festgeschrieben:** «Medikamente gegen Angst» → `behandlung#keine-behandlung` ist ein schwacher Treffer (D30-08); er ist trotzdem fest, während «Überdosis Alkohol» wegen Schwäche bewusst nicht festgeschrieben ist. «er spielt mit dem Tod», «Umgang mit dem Tod» und «Konfrontation mit dem Tod» → «–» schreiben «kein Treffer» fest, obwohl nur «nicht Gewalt» gemeint ist. **Es fehlen** die Proben aus D30-09 (D30-11). |
| 4 | A1-Link und Text | **erfüllt** | `quellen`: «Mit den Informationsblättern A1 «Definition, Formen und Folgen häuslicher Gewalt» und B1 «Gewalt in Trennungssituationen» (2020).» steht ohne Link. Die A1-Adresse kommt in keiner Seite des Entwurfs mehr vor. Sichtbarer Text aller 23 Seiten (Chromium, `details` offen): gleich wie `9f5ebfe`; gegenüber r4-29 weiter nur `behandlung`, `fragen`, `jugendliche` (P1) und `quellen` (101 statt 105 Links, Text gleich). Quelltext `9f5ebfe` → `cc370c4`: nur `quellen.html` (A1) und `js/interaktion.js` verschieden; `suche.html` gleich. |
| 5 | `FREIGABE.md` und Pendenzen | **weitgehend richtig** | **Richtig:** Zeitzonen jetzt angegeben, die Herkunft der Fassung für die Jugendlichen-Seite berichtigt. Nachtrag mit den wörtlichen Antworten zu D30-02 und D30-05; Entscheid 13:59 MESZ, Commit 14:00:53 MESZ. Pendenzen: R3C-A9 mit Testliste, R3C-A10 mit A1, Auslegung D30-05, R30-P01 und R30-P02. **Unrichtig oder unvollständig:** (a) In `FREIGABE.md`, Tabelle «Umfang», Zeile R3C-A9, steht weiter «Drohungen gegen die eigene Person («bedroht mich», «mich umzubringen» usw.) gehören … zum Wortfeld Gewalt». Das ist durch den Nachtrag überholt, aber nicht als überholt markiert. (b) Der Nachtrag sagt, die Gewaltgruppe enthalte «nur Drohungen und Taten anderer». Das stimmt für die Liste, im Ergebnis aber nicht vollständig (D30-09). (c) R30-P01 nennt die Lücken aus D30-12 nicht. (d) R30-P01 und -P02 stehen in der Tabelle vor R29-P20 (nur Reihenfolge) (D30-10). |
| 6 | Build und Wortbilanz | **erfüllt** | Entwurf: «23 Seiten · 0 Blocker · 1 Hinweise» (change-review). Kopie (`git archive cc370c4`) mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d30b`. Gegenprobe mit «ausstehend»: blockiert. 23/23 `data-puk-site-build="r4-30"`, 46 × `?v=r4-30`. Wortbilanz gleich wie `9f5ebfe`: `behandlung` 2399, `fragen` 2398, `jugendliche` 898, Website 30 667, `quellen` 5418. 0 `tel:`, 0 «Notruf». axe auf `quellen` und `suche` (mit Treffern) bei 320 und 1280 px: 0 Verstösse, kein Überlauf; Tastaturweg der Suche wie zuvor; 0 Skriptfehler; `node --check` ohne Fehler. |

### Status der Befunde

| ID | Status | Beleg |
| --- | --- | --- |
| D30-01 | **teilweise behoben**, Rest in D30-09 | siehe Punkt 1 |
| D30-02 | **erledigt** | Entscheid «Link entfernen (Recommended)», 13:59 MESZ; Link entfernt, Text unverändert (Punkt 4) |
| D30-03 | **erledigt**, mit Hinweisen in D30-11 | 168 Anfragen, Skript läuft, 168/168 (Punkt 3) |
| D30-04 | **teilweise erledigt** | Jetzt passend: «er hat mich gewürgt», «er würgt mich», «Frauenhaus», «Frauenhaus Zürich», «ich habe Angst vor meinem Partner», «Angst vor meinem Mann», «Angst vor meiner Frau» → `grenzen#gewalt`; «Abschiedsbriefe», «Selbstmordversuche», «Todeswünsche», «Suiziddrohungen», «Suizidandrohungen», «Überdosen», «lebensmüder Sohn», «meine Frau ist lebensmüde», «Freundin schreibt dass sie sich umbringen will», «Er sagt er will sich umbringen», «sie sagt sie bringt sich um», «Sohn hat Tabletten geschluckt» → `krise#suizid`; «er sagt er bringt mich um» → `grenzen#gewalt`. Offen: R30-P01 und D30-12 |
| D30-05 | **erledigt durch Entscheid** | «Nein, Links bleiben (Recommended)»; Auslegung in `FREIGABE.md` und Pendenzen festgehalten |
| D30-06 | **erledigt** | Punkt 5 |
| D30-07 | **vermerkt** (R30-P02, optional) | keine Textänderung, wie vorgeschlagen |
| D30-08 | **erledigt** | Code-Vermerk zum Zwischenspeicher; «Überdosis Alkohol» und «Medikamente gegen Angst» in R30-P01 |

### Neue Befunde

| ID | Priorität | Befund | Vorschlag (nicht umgesetzt) |
| --- | --- | --- | --- |
| D30-09 | **wichtig, Auflage vor dem Export** | **Rest von D30-01.** Die reflexiven Phrasen «mich umbringen», «mich umzubringen», «mich toeten» und «mich zu toeten» gelten ohne Rücksicht auf das Subjekt als Suizid. Nicht aufgezählte Drohungen anderer gehen deshalb auf `krise#suizid`: «er will mich töten», «sie will mich töten», «mein Mann will mich töten», «er versucht mich zu töten», «er hat gedroht mich zu töten», «er würde mich umbringen», «er könnte mich umbringen», «er wollte mich umbringen», «Drohung mich umzubringen», «sie droht mir mich umzubringen». Umgekehrt gehen «ich habe versucht mich umzubringen» und «ich habe gedroht mich umzubringen» auf `grenzen#gewalt`. | Das Subjekt entscheidet, nicht die Liste. Bei «mich» mit Tötungsverb: steht «ich» in den zwei Wörtern vor der Phrase oder ist es das Subjekt der Anfrage, dann Suizid; sonst Gewalt. Mindestens aber diese Phrasen ergänzen. Gewalt: «will mich toeten», «wollte mich umbringen», «wuerde mich umbringen», «koennte mich umbringen», «versucht mich zu toeten», «gedroht mich zu toeten», «mir mich umzubringen», «drohung mich umzubringen». Suizid, jeweils länger: «ich will mich toeten», «ich wuerde mich umbringen», «habe versucht mich umzubringen», «habe gedroht mich umzubringen». Alle Proben aus Punkt 1 in die Testliste aufnehmen, dann `suchtest.mjs` (100 %) und die 91/54 erneut prüfen. |
| D30-10 | optional | **Nachweise:** In `FREIGABE.md` ist die R3C-A9-Zeile der Tabelle «Umfang» überholt («mich umzubringen» → Gewalt). Der Satz «nur Drohungen und Taten anderer» im Nachtrag gilt nur für die Liste. In den Pendenzen stehen R30-P01 und -P02 vor R29-P20. | Zeile als überholt kennzeichnen oder anpassen; Nachtrag nach D30-09 nachführen; Reihenfolge ordnen. |
| D30-11 | optional | **Testliste:** «Medikamente gegen Angst» schreibt einen schwachen Treffer fest. «–» bei den drei «mit dem Tod»-Proben schreibt «kein Treffer» fest statt «nicht Gewalt». Die Proben aus D30-09 fehlen. Die Kopfzeile empfiehlt `suchtest.mjs site`; bis zum Export ergibt das 129/168, weil `site/` noch r4-29 ist. Das Skript braucht `PLAYWRIGHT_BROWSERS_PATH`; in dieser Umgebung ist es gesetzt, ohne die Variable bricht es ab. | Schwache Treffer kennzeichnen (z. B. Spalte «bekannt schwach») oder nicht festschreiben, wie bei «Überdosis Alkohol». Verneinende Erwartung zulassen (z. B. `!grenzen.html#gewalt`). Hinweis «vor dem Export: `dist/…`» und die Browser-Variable in die Kopfzeile. |
| D30-12 | wichtig (nächster Patch, keine Auflage) | **Weitere Suchlücken, schon in r4-29 und `9f5ebfe`.** 0 Treffer: «Morddrohung», «Todesdrohung», «er hat mir gedroht», «ich habe Angst dass er mich umbringt», «Würgen», «ich habe mich fast umgebracht», «er sagt ich bringe mich um». Unpassend: «ich habe Angst vor meinem Sohn» und «… vor meiner Tochter» → `ueber#warum`. Drohungen gegen Dritte gehen auf Suizid oder einen allgemeinen Abschnitt: «er droht uns umzubringen» und «er will uns alle umbringen» → `krise#suizid`, «er droht die Kinder umzubringen» → `fragen#schutz`. Ausserdem: «er droht mit dem Tod» → `krise#selbstverletzung`, «ich will mich jetzt umbringen» → `kommunizieren#worte`, «lebensmüde Frau» → `quellen#leitlinien`. Mehrdeutig: «sie hat ihre Tabletten genommen» → `krise#suizid` (könnte eine Frage zur Einnahme sein). | In R30-P01 aufnehmen; Wörter «morddrohung», «todesdrohung», «gedroht», «wuergen» und Drohungen gegen «uns», «die Kinder», «meine Familie» der Gewaltgruppe zuordnen; «Angst vor meinem Sohn/meiner Tochter/meinem Vater …» wie «Angst vor meinem Partner». Fachliche Zuordnung durch die Fachstelle. |

Kein kritischer Befund.

**Auflage vor dem Export:** D30-09 korrigieren und die Proben in die Testliste aufnehmen. Für die Nachprüfung genügen `suchtest.mjs` mit 100 %, die 91/54 gleich wie r4-29 und die Proben aus Punkt 1. Danach `independentReview` auf «bestaetigt». D30-10 bis -12 können folgen.

### Nicht geprüft in der Nachprüfung

- Externe Links nicht erneut abgerufen; geändert ist nur der entfernte A1-Link.
- axe nur auf `quellen` und `suche`. Die übrigen Seiten haben gegenüber `9f5ebfe` keinen anderen Quelltext.
- Laufzeit der Suche nicht neu gemessen; die Änderung betrifft nur die Synonymlisten.

### Belege der Nachprüfung

Unter `/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/d30/`:

- `search3.cjs`: Suche in drei Ständen (r4-29 Port 8129, `9f5ebfe` 8132, `cc370c4` 8130)
- `q-nach.txt` und `q-nach2.txt` (87 neue Proben), Ergebnisse `*.result3.tsv`, auch für alle früheren Listen
- `text2.cjs` und `text2/`: sichtbarer Text
- `prodcopy3/` (Produktion mit «bestaetigt»), `prodcopy4/` (Gegenprobe), `wb30b.txt`
- `tsv91.txt` und `qa91.txt`: Abgleich der Bestandszeilen

*Nachtrag:* Die bauende Sitzung hat den Abschnitt «Nachprüfung» unverändert in `43d6b21` committet. Der folgende Abschnitt ist nicht committet.

## Zweite Nachprüfung (Stand 43d6b21)

| | |
| --- | --- |
| Stand | Branch `claude/r4-30-suche-links-1792061353`, Commit `43d6b21` (15.10.2026, 14:19 MESZ). Diff zu `cc370c4`: `interaktion.js` (Regel `killIntent()` statt Tötungsphrasen, neue Gewaltwörter), Testliste (194 Anfragen), `suchtest.mjs` (verneinende Erwartung), `FREIGABE.md` (Nachtrag 2), Pendenzen, dieser Bericht |
| Prüfobjekt | frischer Entwurf `node authoring/tools/build.mjs --out=dist/d30c`. Verglichen in drei Ständen: `site/` (r4-29, Port 8129), `dist/d30b` (`cc370c4`, Port 8132) und `dist/d30c` (`43d6b21`, Port 8130) |
| Prüfsitzung | dieselbe unabhängige Prüfsitzung; nichts gebaut, korrigiert oder entschieden; nur diese Datei geändert; keine git-Schreibbefehle; Netlify nicht angefasst |
| Zeitpunkt | 15.10.2026, etwa 14:25 bis 14:55 MESZ |

### Ergebnis der zweiten Nachprüfung

**Freigabefähig:** Die Auflage D30-09 ist erfüllt. Alle Fälle daraus werden jetzt richtig zugeordnet. Keine Ich-Aussage mit Suizidbezug geht mehr auf «Gewalt», und in keiner Probe ist der Entwurf schlechter als die Produktion (r4-29).

Offen bleiben Lücken der Regel: Für Subjekte und Objekte, die die Regel nicht kennt, gilt weiter «Suizid» (D30-13), dazu Redewendungen und fehlende Verbformen (D30-14, D30-15). Sie sind keine Auflage, weil r4-29 dieselben Anfragen ebenso falsch oder gar nicht zuordnet. D30-13 enthält aber vier Rückschritte gegenüber `cc370c4`, darunter «mein Kind will mich umbringen». Die Korrektur ist klein. Ich empfehle sie vor dem Export, sonst im nächsten Patch.

### Beleg je Punkt

| Nr. | Punkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| a | `suchtest.mjs` auf eigenem Entwurf | **erfüllt** | `node authoring/tools/build.mjs --out=dist/d30c`: «23 Seiten · 0 Blocker · 1 Hinweise» (change-review). `node authoring/tools/suchtest.mjs dist/d30c`: «Suchtest: 194 von 194 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Gegen `site/` (r4-29): 132 von 194, 62 Abweichungen, keine aus dem Bestand. Die Bestandszeilen sind weiter genau `queries_all.txt` (90 als «Bestand r4-28 (91)» bezeichnet, «Wenn ich gehe bringt sie sich um» neu als «Bestand Produktion (54), R25-010»). Die verneinende Erwartung (`!href`) ist richtig umgesetzt: Sie besteht, wenn der Ersttreffer nicht `href` ist. |
| b | 91/54 wie r4-29 | **erfüllt** | `queries_all.txt` 91/91 und `queries.txt` 54/54 Ersttreffer gleich `site/`. R3-Liste 16/16 und Gegenproben 8/8 wie in `cc370c4`. 0 Skriptfehler. |
| c | Eigene Proben gegen die Regel | **erfüllt für D30-09; Lücken in D30-13 bis -15** | 97 neue Proben (`q-zweit.txt` 77, `q-zweit2.txt` 20) in drei Ständen; dazu alle früheren Listen erneut. <br>**Richtig:** <br>– Ich-Aussagen, auch in Zitaten, in der Vergangenheit und im Konjunktiv → `krise#suizid`: «ich habe versucht/gedroht mich umzubringen», «ich habe/hätte mich fast umgebracht», «ich würde mich am liebsten umbringen», «ich möchte mich töten», «Meine Tochter sagt ich will mich umbringen», «seit er mich schlägt will ich mich umbringen», «Mein Mann hat mich verlassen ich will mich umbringen», «ich glaube ich will mich umbringen», «manchmal denke ich daran mich umzubringen». <br>– Drohungen und Taten anderer → `grenzen#gewalt`: «er will/wollte/würde/könnte mich umbringen», «will er mich umbringen», «er/sie/meine Tochter will mich töten», «er versucht mich zu töten», «er hat gedroht mich zu töten», «mein Sohn droht mich zu töten», «er hat/hätte mich fast umgebracht», «ich habe Angst dass er mich umbringt», «ich habe Angst mein Mann bringt mich um», «wenn ich gehe bringt er mich um», «Mein Sohn hat gesagt er bringt mich um wenn ich ausziehe», «ich glaube meine Tochter will mich umbringen», «der Vater meiner Kinder will mich umbringen», «mein Ex-Mann will mich umbringen», «mein Kind droht mich umzubringen». <br>– Fragen: «was tun wenn er droht mich umzubringen» → Gewalt, «was tun wenn mein Kind droht sich umzubringen» und «was mache ich wenn sie sich umbringen will» → Suizid. <br>– Drohungen gegen Dritte und neue Wörter: «er droht uns umzubringen», «er droht die Kinder umzubringen», «er will uns alle umbringen», «Morddrohung», «Todesdrohung (per SMS)», «er droht mit dem Tod», «sie drohte mit dem Tod», «Würgen», «Angst vor meinem Bruder/meiner Schwester/meiner Mutter» → Gewalt. <br>– Suizid anderer und Verlust: «sie hat sich umgebracht», «mein Bruder hat sich umgebracht», «er hat sich getötet», «er hat versucht sich zu töten», «ich habe Angst dass er sich umbringt» → Suizid. «Wenn du gehst bringe ich mich um», «Wenn ich gehe bringt sie sich um» und «er sagt wenn ich gehe bringt er sich um» → `kommunizieren#worte` (R25-010). <br>– Gegenproben ohne Tötungsabsicht: «Zeit totschlagen» → `kurz`, «die Stimmung umbringen» → `fragen#f-depression`, also weder «Gewalt» noch «Suizid». «er spielt mit dem Tod» → 0 Treffer. <br>**Falsch oder schwach:** siehe D30-13 bis D30-15. Eine Ich-Aussage auf «Gewalt» gibt es in keiner Probe. Gegenüber r4-29 wird keine Probe falsch, die dort richtig war. Einzige Verschiebung von einem passenden auf einen weniger passenden Treffer: «ich will mich nicht umbringen aber ich kann nicht mehr» (`selbstfuersorge#warnsignale` → `krise#suizid`, also vorsichtiger; D30-14). <br>**Code:** `killIntent()` läuft einmal je Anfrage (keine Leistungsfrage). `synonyms['suizid']` und `synonyms['gewalt']` sind definiert. `node --check` ohne Fehler. Gegenüber `cc370c4` ist in der Ausgabe nur `js/interaktion.js` verschieden. |
| d | Nachweise | **erfüllt, mit einer Kleinigkeit** | **`FREIGABE.md`:** Die R3C-A9-Zeile ist durchgestrichen und als überholt markiert. Der Satz «nur Drohungen und Taten anderer» ist eingeschränkt. Nachtrag 2 beschreibt die Regel so, wie der Code sie umsetzt (Objekte, Subjekt, Drohwort, Ausnahme R25-010). Die Zahlen stimmen: 194/194; gegen `site/` 62 Abweichungen, keine im Bestand. `independentReview` steht auf «ausstehend». Kleinigkeit: Im Nachtrag 1 stehen unter D30-04 noch «sich umbringen» und «bringt sich um» als ergänzte Phrasen. «bringt sich um» ist seit Nachtrag 2 bewusst nicht mehr «Suizid», «sich umbringen» geht über die Regel; der Nachtrag 1 ist damit überholt, aber nicht markiert (optional). **Pendenzen:** R3C-A9 mit 194 Anfragen und der Regel; R30-P01 mit den offenen D30-12-Lücken, den schwachen und den mehrdeutigen Treffern und der Bestätigung der Zuordnung durch die Fachstelle; Reihenfolge jetzt R29-P20, R30-P01, R30-P02. D30-13 bis -15 fehlen naturgemäss noch. |
| – | Build und Wortbilanz | **erfüllt** | Kopie (`git archive 43d6b21`) mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d30c`. Mit «ausstehend» blockiert der Build. Wortbilanz unverändert (2399 / 2398 / 898 / 30 667); 0 `tel:`. Inhalt und sichtbarer Text unverändert gegenüber `cc370c4` (nur `interaktion.js` geändert). |

### Status der Befunde

| ID | Status |
| --- | --- |
| D30-01 | erledigt (mit D30-09) |
| D30-02, -03, -05, -06, -08 | erledigt (wie in der Nachprüfung) |
| D30-04 | teilweise erledigt; Rest in R30-P01 |
| D30-07 | vermerkt (R30-P02) |
| D30-09 | **erledigt**: alle 12 Fälle aus der Nachprüfung, Punkt 1, richtig und festgeschrieben |
| D30-10 | erledigt; Kleinigkeit zu Nachtrag 1 siehe Punkt d |
| D30-11 | erledigt: schwache Treffer nicht mehr festgeschrieben, verneinende Erwartung, Kopfzeile mit Browser-Variable und Entwurfsordner |
| D30-12 | teilweise erledigt: «Morddrohung», «Todesdrohung», «Würgen», «droht mit dem Tod», «Angst vor meinem Sohn/meiner Tochter/…», Drohungen gegen «uns», «die Kinder», «meine Familie»; Rest in R30-P01 |

### Neue Befunde

| ID | Priorität | Befund | Vorschlag (nicht umgesetzt) |
| --- | --- | --- | --- |
| D30-13 | wichtig (vor dem Export empfohlen, keine Auflage) | **Drohungen anderer gehen auf «Suizid», wenn die Regel Subjekt oder Objekt nicht kennt.** <br>Subjekt nicht in der Liste, deshalb «ohne Subjekt, ohne Drohwort → Suizid»: «mein Ehemann will mich umbringen», «mein Exmann will mich umbringen», «mein Kind will mich umbringen», «jemand will mich umbringen». Diese vier waren in `cc370c4` auf «Gewalt»; in r4-29 sind sie ebenfalls falsch. Ebenso «du willst mich umbringen». <br>Objekt nicht in der Liste: «er droht sie umzubringen», «er will sie umbringen», «er hat gedroht sie umzubringen», «er will meine Mutter umbringen» → Suizid; «er droht meine Frau umzubringen» → `quellen#leitlinien`; «mein Sohn will meinen Vater töten» → `rolle#schuld`. Diese Fälle sind gleich wie in r4-29. <br>Auch «er droht mit Mord» und «Mord» → Suizid: Die Wörter «mord» und «toetung» finden die Textstellen mit «Selbstmord» und «Selbsttötung», wie schon in r4-29. | In `thirdParty` ergänzen: «kind», «ehemann», «ehefrau», «exmann», «exfrau», «lebenspartner», «jemand», «du» usw. Besser: Steht links von «mich» irgendein Wort, aber kein «ich», gilt Gewalt; Suizid nur bei «ich» oder ganz ohne weiteres Wort («mich umbringen»). Als Objekt direkt vor dem Verb auch «sie» und Personen («meine Mutter», «meine Frau», «meinen Vater» …) werten; «sich» geht vor, weil es näher am Verb steht. «Mord», «Morddrohung» und «droht mit Mord» der Gewaltgruppe zuordnen. Die Proben in die Testliste aufnehmen. |
| D30-14 | optional | **Redewendungen und Verneinung.** «das bringt mich um», «der Stress bringt mich um», «die Arbeit bringt mich noch um» → Suizid; in r4-29 gingen sie auf `kommunizieren#worte` oder `behandlung#rollen`, also auch nicht passend. «ich will mich nicht umbringen aber ich kann nicht mehr» → Suizid (r4-29: `selbstfuersorge#warnsignale`). Ärger-Redewendungen: «ich könnte ihn umbringen», «ich würde ihn am liebsten umbringen», «er bringt mich noch um» → Gewalt; «ich könnte sie umbringen» → Suizid. | Fachlich abwägen. Die Vorsicht in Richtung Suizid ist bei einer Sicherheitssuche vertretbar. Möglich: «nicht» direkt vor dem Verb und Sachsubjekte («das», «Stress», «Arbeit») als Überlastung werten (`selbstfuersorge#warnsignale`). |
| D30-15 | wichtig (nächster Patch) | **Fehlende Verbformen und Zitate.** «ich habe Angst dass ich mich umbringe» → 0 Treffer («umbringe» ist kein Tötungsverb der Regel); «sie hat geschrieben ich bringe mich um» und «er sagt ich bringe mich um» → 0 Treffer; «Mein Sohn hat gesagt er bringt sich um wenn ich ausziehe» → 0 Treffer (in `cc370c4` noch `krise#suizid`, in r4-29 ebenfalls 0); «er will dass ich mich umbringe» → `behandlung#keine-behandlung`; «Angst vor meinem Ex» → `begriffe#b-borderline`; «töten» und «umgebracht» allein → 0 Treffer. | «umbringe», «umbringst», «umbrachte», «toete» in die Verbliste; «bringe … mich … um» bei einem Zitat («sagt», «schreibt», «hat gesagt») wie R25-010 auf `kommunizieren#worte` oder `krise#suizid`; «bringt … sich … um» mit Nebensatz wie «Wenn ich gehe bringt sie sich um» behandeln; «Angst vor meinem Ex» ergänzen. In R30-P01 aufnehmen. |

Kein kritischer Befund.

### Belege der zweiten Nachprüfung

Unter `/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/d30/`:

- `q-zweit.txt` und `q-zweit2.txt` (97 neue Proben); Ergebnisse `q-zweit.result3.tsv`, `q-zweit2.result3.tsv` und alle früheren Listen als `*.result3.tsv` (Spalten: r4-29, `cc370c4`, `43d6b21`)
- `suchtest-site-43d.txt`: Suchtest gegen `site/` (62 Abweichungen)
- `prodcopy5/` (Produktion mit «bestaetigt»), `prodcopy6/` (Gegenprobe)
- Entwurf: `/home/claude/borderline-angehoerige/dist/d30c` (von `.gitignore` erfasst)

*Nachtrag:* Die bauende Sitzung hat den Abschnitt «Zweite Nachprüfung» unverändert in `9299251` committet. Der folgende Abschnitt ist nicht committet.

## Dritte Nachprüfung (Stand 9299251)

| | |
| --- | --- |
| Stand | Branch `claude/r4-30-suche-links-1792061353`, Commit `9299251` (15.10.2026, 14:30 MESZ). Diff zu `43d6b21`: `interaktion.js` (mehr Subjekte und Objekte in `killIntent()`, neue Verbformen, Wörter zu «Mord» und «Ex»), Testliste (216 Anfragen), `FREIGABE.md` (Nachtrag 3, Nachtrag 1 markiert), Pendenzen, dieser Bericht |
| Prüfobjekt | frischer Entwurf `node authoring/tools/build.mjs --out=dist/d30d`. Verglichen in drei Ständen: `site/` (r4-29, Port 8129), `dist/d30c` (`43d6b21`, Port 8132), `dist/d30d` (`9299251`, Port 8130) |
| Prüfsitzung | dieselbe unabhängige Prüfsitzung; nichts gebaut, korrigiert oder entschieden; nur diese Datei geändert; keine git-Schreibbefehle; Netlify nicht angefasst |
| Zeitpunkt | 15.10.2026, etwa 14:35 bis 15:00 MESZ |

### Ergebnis der dritten Nachprüfung

**Freigabefähig mit Auflagen:** D30-13 ist für die genannten Fälle behoben. Die neue Regel «Personen als Objekt» leitet aber die häufigste Satzstellung besorgter Angehöriger auf «Gewalt». Steht «sich» vor der Person, zählt die Person als Objekt, zum Beispiel «ich habe Angst, dass sich meine Tochter umbringt», «wenn sich mein Sohn umbringen will», «warum hat sich meine Mutter umgebracht». Das ist dieselbe Art von Fehler wie D30-01, nur in der umgekehrten Satzstellung (D30-16). Der Stand `9299251` darf so nicht exportiert werden. Auflage vor dem Export ist D30-16.

**Berichtigung zur zweiten Nachprüfung:** Diese Satzstellung hatte ich für `43d6b21` nicht geprüft. Dort betrifft sie schon «Kind», «Kinder» und «Familie», weil diese damals als Objekte galten: «was tun wenn sich mein Kind umbringen will» und «Angst dass sich mein Kind umbringt» gehen auch in `43d6b21` auf `grenzen#gewalt`. Mein Urteil «freigabefähig» für `43d6b21` war deshalb zu günstig.

### Beleg je Punkt

| Nr. | Punkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| a | `suchtest.mjs` auf eigenem Entwurf | **erfüllt** | Entwurf: «23 Seiten · 0 Blocker · 1 Hinweise» (change-review). `suchtest.mjs dist/d30d`: «Suchtest: 216 von 216 Ersttreffern wie festgeschrieben · JS-Fehler 0». Gegen `site/`: 138 von 216, also 78 Abweichungen, keine im Bestand. |
| b | 91/54 wie r4-29 | **erfüllt** | 91/91 und 54/54 Ersttreffer gleich `site/`; R3-Liste 16/16 und Gegenproben 8/8 unverändert. |
| c | Eigene Proben | **D30-13 behoben; neuer Fehler D30-16** | 75 neue Proben (`q-dritt.txt` 65, `q-dritt2.txt` 10) in drei Ständen; dazu alle 346 früheren Proben erneut. <br>**Frühere Proben:** gegenüber `43d6b21` 16 Ersttreffer anders, wie die bauende Sitzung angibt. Darunter sind alle D30-13-Fälle, die jetzt auf `grenzen#gewalt` gehen: «mein Ehemann/Exmann/Kind will mich umbringen», «jemand/du …», «er droht sie umzubringen», «er will meine Mutter umbringen», «er droht meine Frau umzubringen», «mein Sohn will meinen Vater töten», «er droht mit Mord». Aus D30-15: «ich habe Angst dass ich mich umbringe» → Suizid, «Angst vor meinem Ex» → Gewalt. Ausserdem «ich könnte sie umbringen» → Gewalt (D30-14) und «er will dass ich mich umbringe» → Suizid. <br>**Richtig bei «sich» direkt vor dem Verb:** «(meine) Mutter hat sich umgebracht», «meine Frau will sich das Leben nehmen und sich umbringen», «Angst dass meine Tochter sich umbringt», «ich habe Angst dass sie sich irgendwann wirklich umbringt», «will sie sich wirklich umbringen», «sie hat versucht sich mit Tabletten umzubringen», «meine Schwester hat versucht sich zu töten», «meine Freundin redet davon sich umzubringen», «meine Tochter droht sich umzubringen wenn wir sie in die Klinik bringen» → `krise#suizid`. Ebenso richtig auf `grenzen#gewalt`: «meine Mutter/meine Eltern will/wollen mich umbringen», «mein Stiefvater will mich töten», «man will mich umbringen», «er hat gedroht er bringt mich um», «mein Vater hat meine Mutter umgebracht», «er hat mir mit Mord gedroht». <br>**Falsch, «sich» vor der Person** (17 Proben, alle in `9299251` → `grenzen#gewalt`): «ich habe Angst dass sich meine Tochter umbringt», «ob sich meine Tochter umbringt», «wenn sich mein Sohn umbringen will», «wie verhindere ich dass sich mein Sohn umbringt», «wird sich mein Sohn umbringen», «dass sich mein Mann umbringt», «falls sich mein Mann umbringt», «ich fürchte dass sich meine Frau umbringt», «was kann ich tun damit sich meine Schwester nicht umbringt», «will sich meine Tochter umbringen», «hat sich mein Vater umgebracht», «nachdem sich mein Vater umgebracht hat», «warum hat sich meine Mutter umgebracht», «seit sich meine Schwester umgebracht hat», «was tun wenn sich die Partnerin umbringen will», «was tun wenn sich mein Kind umbringen will», «Angst dass sich mein Kind umbringt». In `43d6b21` gingen 15 davon auf `krise#suizid`; die zwei mit «Kind» schon dort auf «Gewalt». **Gegenüber r4-29 schlechter:** «wenn sich mein Sohn umbringen will», «will sich meine Tochter umbringen», «was tun wenn sich die Partnerin umbringen will» (r4-29: `krise#suizid`). <br>**Falsch bei Stichwortanfragen ohne Subjekt:** «Tochter umbringen» (r4-29 und `43d6b21`: Suizid), «Sohn umbringen Angst», «Angst Tochter umbringt sich» → Gewalt. <br>**Hinnehmbar:** «mein Vater hat sich und meine Mutter umgebracht» und «… sich und die Kinder umbringt» → Gewalt (erweiterter Suizid, Gefahr für andere); «meine Frau will die Kinder und sich umbringen» → Suizid. Uneinheitlich, aber beides führt zu Hilfe. <br>**Unverändert offen** (R30-P01): «er sagt ich bringe dich um» → 0 Treffer, «er hat gesagt ich bring dich um» → `fragen#f-einweisung`, «Mein Sohn hat gesagt er bringt sich um wenn ich ausziehe» → 0, «meine Tochter will sich in den nächsten Tagen umbringen» und «… mit einer Überdosis Tabletten umzubringen» → 0 Treffer, weil «sich» mehr als vier Wörter vor dem Verb steht. Redewendungen «der Stress bringt mich um» → Suizid (D30-14). |
| d | Nachweise | **teilweise richtig** | Richtig: Zahlen (216/216; gegen `site/` 78 Abweichungen, keine im Bestand; 16 geänderte Ersttreffer in den 346 Proben), Nachtrag 1 als überholt markiert, R30-P01 mit D30-14, D30-15 und «Mord» ergänzt, `independentReview` auf «ausstehend». **Unrichtig:** Nachtrag 3 sagt «‹sich› geht vor, weil es näher am Verb steht». Das gilt nur, wenn «sich» direkt vor dem Verb steht. In Nebensätzen und Fragen steht «sich» vor dem Subjekt («dass sich meine Tochter umbringt»), dann gewinnt die Person (D30-16). Die sechs neuen Gegenproben mit «sich» haben alle «sich» direkt vor dem Verb und decken diesen Fall nicht ab. |
| – | Build und Wortbilanz | **erfüllt** | Produktionsbuild in einer Kopie mit «bestaetigt»: 0 Blocker, 0 Hinweise, bytegleich mit `dist/d30d`. Gegenüber `43d6b21` ist nur `js/interaktion.js` verschieden; Inhalt, Text und Wortbilanz sind unverändert; `node --check` ohne Fehler; 0 Skriptfehler in allen Läufen. |

### Status der Befunde

| ID | Status |
| --- | --- |
| D30-09 | erledigt (wie in der zweiten Nachprüfung) |
| D30-13 | **erledigt** für alle genannten Fälle, aber mit der Nebenwirkung D30-16 |
| D30-14 | offen (R30-P01), fachlich abwägen |
| D30-15 | teilweise erledigt («umbringe», «Angst vor meinem Ex»); Rest in R30-P01 |
| übrige D30-Befunde | wie in der zweiten Nachprüfung |

### Neuer Befund

| ID | Priorität | Befund | Vorschlag (nicht umgesetzt) |
| --- | --- | --- | --- |
| D30-16 | **wichtig, Auflage vor dem Export** | **«sich» vor dem Subjekt wird als Gewalt gewertet.** `killIntent()` nimmt das nächste Objekt links vom Verb. Seit `9299251` gelten Personen und «sie» als Objekte. In der deutschen Satzstellung «dass/wenn/ob/falls/damit/nachdem/seit + sich + Person + Verb» und in Fragen («will sich meine Tochter umbringen», «warum hat sich meine Mutter umgebracht») steht die Person näher am Verb als «sich». Die Person ist dort aber das Subjekt, nicht das Opfer. Betroffen sind 17 von 17 geprüften Sätzen dieser Form, darunter typische Anfragen besorgter Angehöriger. Drei davon sind schlechter als die Produktion (r4-29). Stichwortanfragen ohne Subjekt («Tochter umbringen») gehen ebenfalls auf «Gewalt». Die Fusszeile zeigt weiter «holen Sie sofort Hilfe»; deshalb nicht kritisch. | Kommt «sich» im Teilsatz vor dem Verb vor (bis zum letzten «dass», «wenn», «ob», «falls», «damit», «nachdem», «seit», «weil», «wie» oder bis zum Satzanfang), gilt Suizid. Ausnahme: Ist «sich» mit «und» an eine andere Person oder «die Kinder» gebunden («sich und meine Mutter», «die Kinder und sich»), gilt Gewalt. Personen und «sie» zählen nur als Objekt, wenn im Teilsatz weder «sich» noch «mich» steht und ein Subjekt davor steht («er will meine Mutter umbringen»). Ohne Subjekt bleibt es bei der bisherigen Wertung («Tochter umbringen» → Suizid). Wenn das vor dem Export nicht gehen soll: die Objektregel von `43d6b21` nehmen und nur die neuen Subjekte übernehmen. Dann bleiben «er droht sie umzubringen» usw. wie in r4-29, und «Kind», «Kinder» und «Familie» als Objekte nur mit vorangehendem Subjekt werten. Die 17 Proben und die drei Stichwortanfragen in die Testliste aufnehmen; danach `suchtest.mjs` (100 %) und die 91/54 erneut. |

Kein kritischer Befund.

**Auflage vor dem Export:** D30-16 korrigieren und mit `suchtest.mjs` samt den neuen Zeilen nachprüfen lassen. Erst danach `independentReview` auf «bestaetigt».

### Belege der dritten Nachprüfung

Unter `/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/d30/`:

- `q-dritt.txt` und `q-dritt2.txt` (75 neue Proben); Ergebnisse `q-dritt.result3.tsv`, `q-dritt2.result3.tsv` und alle früheren Listen als `*.result3.tsv` (Spalten: r4-29, `43d6b21`, `9299251`)
- `suchtest-site-929.txt`: Suchtest gegen `site/` (78 Abweichungen)
- `prodcopy7/`: Produktion mit «bestaetigt»
- Entwurf: `/home/claude/borderline-angehoerige/dist/d30d` (von `.gitignore` erfasst)

*Nachtrag:* Die bauende Sitzung hat den Abschnitt «Dritte Nachprüfung» unverändert in `ca89da2` committet. Der folgende Abschnitt ist nicht committet.

## Vierte Nachprüfung (Stand ca89da2)

| | |
| --- | --- |
| Stand | Branch `claude/r4-30-suche-links-1792061353`, Commit `ca89da2` (15.10.2026, 14:40 MESZ). Diff zu `9299251`: `interaktion.js` (`killIntent()` nach Teilsätzen, `michIntent()`), Testliste (243 Anfragen), `FREIGABE.md` (Nachtrag 4, Satz in Nachtrag 3 markiert), Pendenzen, dieser Bericht |
| Prüfobjekt | frischer Entwurf `node authoring/tools/build.mjs --out=dist/d30e`. Verglichen in drei Ständen: `site/` (r4-29), `dist/d30d` (`9299251`) und `dist/d30e` (`ca89da2`). Zusätzlich eine Variante F, die ich nur im Scratchpad nachgebildet habe (siehe unten); im Repository ist nichts geändert |
| Prüfsitzung | dieselbe unabhängige Prüfsitzung; nichts gebaut, korrigiert oder entschieden; nur diese Datei geändert; keine git-Schreibbefehle; Netlify nicht angefasst |
| Zeitpunkt | 15.10.2026, etwa 14:45 bis 15:20 MESZ |

### Ergebnis der vierten Nachprüfung

**Nicht freigabefähig in diesem Stand:** D30-16 ist für alle 17 Sätze mit «sich» vor der Person behoben. Die neue Ausnahme «sich» neben «und» → Gewalt trifft aber auch reflexive Verben. Damit gehen drei typische Anfragen zu Selbstverletzung mit Suizidgedanken auf «Wenn Gewalt oder Bedrohung vorkommt», die in r4-29 auf `krise#selbstverletzung` gingen: «mein Sohn ritzt sich und will sich umbringen», «meine Tochter verletzt sich und will sich umbringen», «sie schneidet sich und spricht davon sich umzubringen» (D30-17). Nach dem Massstab dieser Nachprüfung ist das ein Befund, und zwar in der heiklen Richtung.

**Grundsätzliche Einschätzung, ausdrücklich:** Die zweiseitige Regel ist grundsätzlich zu fehleranfällig. Sie soll aus der Satzstellung ableiten, ob ein Tötungswort Suizid oder Gewalt meint. In vier Runden hat jede Korrektur eine neue Klasse von Fehlleitungen erzeugt, dreimal in der heiklen Richtung «Suizidsorge → Gewalt»: D30-01 (Ich-Aussagen), D30-16 («sich» vor der Person), D30-17 (reflexive Verben vor «und»). Die deutsche Satzstellung, reflexive Verben («sich aufregen», «sich trennen», «ritzt sich»), Nebensätze ohne Einleitewort und Kurzanfragen lassen sich mit Wortlisten nicht zuverlässig fassen.

Die beiden Fehlerrichtungen kosten nicht gleich viel. «Drohung → Suizidseite» ist der Zustand von r4-29 (Klasse R3C-02, «wichtig, nicht kritisch»). «Suizidsorge → Gewaltseite» ist der schädliche Fehler. Exportierbar ist deshalb nur eine einseitige Regel: «Gewalt» nur bei eindeutigem Fremdbezug, nie wenn «sich» in der Anfrage steht (Variante F, unten).

### Beleg je Punkt

| Nr. | Punkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| a | `suchtest.mjs` auf eigenem Entwurf | **erfüllt** | Entwurf `dist/d30e`: «23 Seiten · 0 Blocker · 1 Hinweise». `suchtest.mjs dist/d30e`: «243 von 243 … JS-Fehler 0». Gegen `site/`: 144 von 243, also 99 Abweichungen, keine im Bestand. |
| b | 91/54 wie r4-29 | **erfüllt** | 91/91 und 54/54 gleich `site/`; R3-Liste 16/16 und Gegenproben 8/8 wie in `9299251`. |
| c | Eigene Proben | **D30-16 behoben; neue Befunde D30-17 und D30-18** | 84 neue Proben (`q-viert.txt`); alle 458 verschiedenen Proben aus allen Listen in r4-29, `ca89da2` und Variante F. <br>**Richtig in `ca89da2`:** alle 17 Sätze mit «sich» vor der Person → `krise#suizid`. Inversion und Fragen → Gewalt: «hat er gedroht sie umzubringen», «droht er sie umzubringen», «will er sie umbringen», «will sie ihn umbringen», «will er mich umbringen», «bringt er mich um». Nebensatz ohne Einleitewort: «ich glaube sie will sich umbringen» → Suizid; «ich glaube er will sie/mich umbringen», «ich fürchte er bringt mich um» → Gewalt. «und» zwischen Teilsätzen: «er schlägt mich und will sich umbringen», «sie weint und sagt sie will sich umbringen», «er schlägt mich und ich will mich umbringen», «ich will mich umbringen und er lacht nur» → Suizid. Kurzanfragen «sich umbringen», «mich umbringen», «umbringen», «Tochter umbringen», «Sohn umbringen» → Suizid wie r4-29. <br>**D30-17 (schlechter als r4-29, heikle Richtung):** «mein Sohn ritzt sich und will sich umbringen», «meine Tochter verletzt sich und will sich umbringen», «sie schneidet sich und spricht davon sich umzubringen» → `grenzen#gewalt` (r4-29: `krise#selbstverletzung`; `9299251`: `krise#suizid`). Ursache: Der Code prüft nur das erste «sich» im Teilsatz und wertet jedes «und» daneben als «sich und andere». <br>**D30-18 (Fremdbedrohung → Suizid, Richtung wie r4-29):** «mich» vor dem Subjekt: «ich habe Angst dass mich mein Mann umbringt», «ich glaube dass mich mein Ex umbringen will» (r4-29: 0 Treffer), «wenn mich mein Partner umbringen will», «was tun wenn mich mein Sohn umbringen will» (r4-29: Suizid) → `krise#suizid`; in `9299251` gingen alle vier auf Gewalt. Ursache: `michIntent()` sucht das Subjekt nur links von «mich». Ein reflexives Verb in einem früheren Teilsatz macht die ganze Anfrage zu Suizid: «er regt sich auf und droht mich umzubringen», «er hat sich verändert und droht mich umzubringen», «er betrinkt sich jeden Abend und droht …», «er fühlt sich provoziert und droht …», «er kümmert sich nicht und will mich umbringen», «seit/nachdem/weil sie sich getrennt hat … droht er mich/will er sie umbringen». r4-29 gab hier Suizid, 0 Treffer oder einen schwachen Abschnitt. <br>**Erweiterter Suizid** («sich und die Kinder», «die Kinder und sich», «sich und meine Mutter», «mich und sich») → Gewalt, wie beabsichtigt. <br>**Weiter offen** (R30-P01, unverändert gegenüber r4-29): «ich habe Angst sie/er bringt sich um», «sie sagt sonst bringt sie sich um» → 0 Treffer; «sie hat sich das Leben genommen» → `verstehen#bewertungen`; «mein Bruder hat Suizid begangen» → 0 Treffer; «Ich bringe dich um wenn du gehst» → `kommunizieren#worte`; «er hat gesagt ich bring dich um» → `fragen#f-einweisung`. Auch «ich habe Angst ihn umzubringen» und «ich habe Angst meine Mutter umzubringen» (mögliche Zwangsgedanken) sowie «ich will meine Mutter nicht umbringen» → Gewalt (D30-14, fachlich abwägen). |
| d | Nachweise | **teilweise richtig** | Richtig: Markierung in Nachtrag 3, Berichtigung zu `43d6b21`, Zahlen (243/243, 99 Abweichungen, keine im Bestand), R3C-A9 und R30-P01 nachgeführt, `independentReview` auf «ausstehend». **Unrichtig:** Nachtrag 4, Punkt 2, nennt als Ausnahme «sich und meine Mutter», «die Kinder und sich», «mich und sich». Der Code wertet aber jedes «und» neben dem ersten «sich» im Teilsatz als Gewalt, auch «ritzt sich und will …» (D30-17). |
| – | Build | **erfüllt** | Produktionsbuild in einer Kopie mit «bestaetigt»: 0 Blocker, 0 Hinweise, bytegleich mit `dist/d30e`. Gegenüber `9299251` ist nur `js/interaktion.js` verschieden; `node --check` ohne Fehler; 0 Skriptfehler. |

### Neue Befunde

| ID | Priorität | Befund | Vorschlag (nicht umgesetzt) |
| --- | --- | --- | --- |
| D30-17 | **wichtig, Auflage vor dem Export** | Die Ausnahme «sich» neben «und» → Gewalt trifft reflexive Verben vor «und». Drei Anfragen zu Selbstverletzung mit Suizidgedanken gehen auf «Gewalt»; in r4-29 gingen sie auf `krise#selbstverletzung`. | Variante F (unten): «sich» in der Anfrage schliesst «Gewalt» ganz aus. Wenn die Fachstelle «erweiterter Suizid → Gewalt» behalten will: «Gewalt» nur, wenn auf der anderen Seite von «und» ein Objekt steht («die Kinder», «meine Mutter», «mich», «uns»), und jedes «sich» prüfen, nicht nur das erste. |
| D30-18 | wichtig (nächster Patch; keine Auflage, Richtung wie r4-29) | Fremdbedrohung → Suizid in zwei Fällen. Steht «mich» vor dem Subjekt («dass mich mein Mann umbringt»), findet `michIntent()` das Subjekt nicht. Steht ein reflexives Verb in einem früheren Teilsatz («er regt sich auf und droht mich umzubringen»), gilt die ganze Anfrage als Suizid. | Prüfen, ob direkt nach «mich» ein Subjekt im Nominativ steht («mein», «meine», «dein», «sein», «ihr», «der», «die» + Person) → Gewalt. Das reflexive Verb in einem früheren Teilsatz bleibt bei Variante F bewusst bei «Suizid» (sichere Richtung). |

### Exportierbare Rückfallvariante (meine Empfehlung)

Die vorgeschlagene Rückfallvariante «Objektregel von `43d6b21` mit nur den neuen Subjekten» ist **ohne Zusatz nicht exportierbar**. In `43d6b21` zählen «Kind», «Kinder» und «Familie» als nächstes Objekt, auch wenn «sich» davor steht. «was tun wenn sich mein Kind umbringen will» und «Angst dass sich mein Kind umbringt» gehen dort auf «Gewalt» (Berichtigung in der dritten Nachprüfung).

**Variante F (Suizid-Vorrang)**, auf `ca89da2` aufgesetzt:

1. Steht «sich» irgendwo in der Anfrage, gilt bei Tötungsverben Suizid. Es gibt keine Ausnahme mit «und»; der erweiterte Suizid geht damit auf `krise#suizid`, wo die Hilfe ebenfalls steht.
2. Bei «bringt … um» mit «sich» irgendwo in der Anfrage gilt die übliche Suche (R25-010 bleibt).
3. `michIntent()`: Steht direkt nach «mich» ein Subjekt (optional nach «mein», «meine», «dein», «deine», «sein», «seine», «ihr», «ihre», «der», «die», «das»; nicht «sie»), gilt Gewalt; sonst wie bisher. Empfehlung für die Umsetzung: nur Nominativformen zulassen, damit «mich meiner Familie zuliebe» nicht als Subjekt zählt.
4. Alles Übrige bleibt wie in `ca89da2`: Teilsatz, Objekte «mich», «uns», «dich», «ihn», «euch», «Kind(er)», «Familie», Personen und «sie» nur mit Subjekt davor.

**Beleg (nur nachgebildet):** Ich habe F in einer Kopie von `dist/d30e` im Scratchpad gepatcht (`varF/site/js/interaktion.js`, 3 Ersetzungen) und lokal ausgeführt.

- `suchtest.mjs varF/site`: 240 von 243. Die 3 Abweichungen sind die drei festgeschriebenen Fälle «sich und …» (erweiterter Suizid), die F bewusst auf `krise#suizid` leitet. 0 Skriptfehler.
- Alle 458 verschiedenen Proben aus allen Listen (darunter die 91/54, die R3-Liste und die Gegenproben):
  - Keine Anfrage mit «sich» geht auf «Gewalt».
  - Alle Ich-Aussagen gehen auf Suizid.
  - Die vier Fälle «mich mein …» aus D30-18 gehen auf Gewalt.
  - Gegenüber `ca89da2` ändern sich nur 16 Ersttreffer: die drei aus D30-17 und «Angst Tochter umbringt sich» (→ Suizid, ca89da2 ohne Treffer), acht Fälle von erweitertem Suizid oder Drohung mit «sich» (→ Suizid), dazu die vier aus D30-18 (→ Gewalt).
- Bekannte Grenzen von F, alle in der Richtung von r4-29 oder besser: Drohungen mit reflexivem Verb in einem früheren Teilsatz und der erweiterte Suizid gehen auf Suizid. Redewendungen und Verneinungen bleiben wie in D30-14.

Für den Export: F im Repository umsetzen, die drei Erwartungen «sich und …» auf `krise#suizid` ändern und als Proben aufnehmen. Ebenfalls aufnehmen: die drei Sätze aus D30-17 (mindestens `!grenzen.html#gewalt`) und die vier aus D30-18. Dann `suchtest.mjs` (100 %) und eine kurze Nachprüfung mit meinen Probelisten.

### Belege der vierten Nachprüfung

Unter `/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/d30/`:

- `q-viert.txt` (84 neue Proben); `q-viert.result3.tsv` (r4-29, `9299251`, `ca89da2`)
- `q-alle.txt` (458 verschiedene Proben aus allen Listen); `q-alle.resultF.tsv` (r4-29, `ca89da2`, Variante F)
- `varF/site/`: nachgebildete Variante F (nur Scratchpad); `searchF.cjs`
- `suchtest-site-ca8.txt`: Suchtest gegen `site/` (99 Abweichungen)
- `prodcopy8/`: Produktion mit «bestaetigt»
- Entwurf: `/home/claude/borderline-angehoerige/dist/d30e` (von `.gitignore` erfasst)

*Nachtrag:* Die bauende Sitzung hat den Abschnitt «Vierte Nachprüfung» unverändert in `f8c8ce2` committet. Der folgende Abschnitt ist nicht committet.

## Fünfte Nachprüfung (Stand f8c8ce2)

| | |
| --- | --- |
| Stand | Branch `claude/r4-30-suche-links-1792061353`, Commit `f8c8ce2` (15.10.2026, 14:53 MESZ). Diff zu `ca89da2`: `interaktion.js` (Suizid-Vorrang bei «sich», Subjekt nach «mich», Suizid-Phrase vor Gewalt), Testliste (251 Anfragen), `FREIGABE.md` (Nachtrag 5, Nachtrag 4 Punkt 2 markiert), Pendenzen, dieser Bericht |
| Prüfobjekt | frischer Entwurf `node authoring/tools/build.mjs --out=dist/d30f`. Verglichen mit `site/` (r4-29) und meiner Nachbildung von Variante F (`varF/site`). Zusätzlich eine Variante G, die ich nur im Scratchpad auf `dist/d30f` nachgebildet habe |
| Prüfsitzung | dieselbe unabhängige Prüfsitzung; nichts gebaut, korrigiert oder entschieden; nur diese Datei geändert; keine git-Schreibbefehle; Netlify nicht angefasst |
| Zeitpunkt | 15.10.2026, etwa 14:55 bis 15:25 MESZ |

### Ergebnis der fünften Nachprüfung

**Freigabefähig mit Auflagen:** Variante F ist mit der Ergänzung richtig umgesetzt. Die Ergänzung (Suizid-Phrase geht vor Gewalt) wirkt nur in der sicheren Richtung und stellt r4-29 wieder her. Es bleibt aber ein Fehler in der heiklen Richtung, den es schon seit `43d6b21` gibt und den ich bisher nicht geprüft hatte. Steht «Familie», «Kind» oder «Kinder» zwischen «mich» und dem Verb, zählt dieses Wort als Objekt vor «mich». Ich-Aussagen gehen dann auf «Gewalt», etwa «ich will mich wegen meiner Familie umbringen» oder «ich will mich der Familie zuliebe nicht umbringen» (D30-19). Auflage vor dem Export ist D30-19; die Korrektur ist klein und nachgebildet (Variante G).

**`independentReview` jetzt noch nicht auf «bestaetigt» setzen und noch nicht exportieren.** Das ist möglich, sobald Variante G umgesetzt ist und eine kurze Nachprüfung bestätigt: `suchtest.mjs` mit 100 % und die Ersttreffer meiner Probelisten gleich wie in der Nachbildung von G. Sonst fand ich nichts, was gegen den Export spricht.

### Beleg je Punkt

| Nr. | Punkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| a | `suchtest.mjs` auf eigenem Entwurf | **erfüllt** | Entwurf `dist/d30f`: «23 Seiten · 0 Blocker · 1 Hinweise». `suchtest.mjs dist/d30f`: «251 von 251 … JS-Fehler 0». Gegen `site/`: 148 von 251, also 103 Abweichungen, keine im Bestand. |
| b | 91/54 wie r4-29 | **erfüllt** | 91/91 und 54/54 gleich `site/`. |
| c | Probelisten und neue Proben | **F richtig umgesetzt; neuer Befund D30-19** | **Abgleich mit F:** Die 458 Proben aus `q-alle.txt` ergeben dieselben Ersttreffer wie meine Nachbildung von F, ausser der Probe zu Punkt 3 («ich will nicht mehr leben er droht mich umzubringen» → `krise#suizid`, wie r4-29). Keine Anfrage mit «sich» und Tötungsverb geht auf «Gewalt». <br>**Punkt 2 (Artikel und Person nach «mich»), 55 neue Proben (`q-fuenft.txt`, `q-fuenft2.txt`, `q-fuenft3.txt`):** richtig auf Gewalt: «ich habe Angst dass mich mein Mann umbringt», «dass mich ein Mann umbringt», «wenn mich jemand umbringen will», «ob mich meine Tochter umbringen will», «will mich mein Sohn umbringen», «was tun wenn mich mein Ex umbringen will», «dass mich der Vater umbringt», «dass mich die Mutter umbringen will». Richtig auf Suizid: «ich will mich wegen meinem Mann umbringen», «ich will mich umbringen mein Mann weiss es nicht», «ich hasse mich mein Mann sagt ich soll mich umbringen», «ich will mich vor meinem Mann umbringen», «ich habe mich die ganze Nacht gefragt ob ich mich umbringen soll». <br>**Punkt 3 (Suizid-Phrase und Drohung):** «ich will nicht mehr leben er droht mich umzubringen», «er droht mich umzubringen ich will nicht mehr leben», «er sagt er will sterben und mich umbringen», «mein Mann will sterben und droht mich umzubringen», «ich will sterben weil er mich umbringen will», «sie hat Tabletten genommen und droht mich umzubringen» → `krise#suizid`. Das sind fünfmal dieselben Ersttreffer wie in r4-29; einmal ist es besser (r4-29: `quellen#forschung`). «er will mich umbringen ich will nicht tot sein» → Gewalt (richtig: «will nicht» ist die längere Phrase, keine Suizid-Phrase). Die Ergänzung verschiebt nur in Richtung Suizid. <br>**D30-19 (schlechter als r4-29, heikle Richtung):** Steht «Familie», «Kind» oder «Kinder» zwischen «mich» und dem Verb, prüft die Objektschleife das Wort vor «mich» und meldet Gewalt: «ich will mich wegen meiner Familie umbringen», «ich will mich der Familie zuliebe nicht umbringen» (r4-29: `krise#suizid`), «ich will mich meiner Familie zuliebe nicht umbringen» (r4-29: `krise#suizid`), «soll ich mich der Familie zuliebe nicht umbringen», «ich würde mich der Kinder wegen nie umbringen», «ich habe mich der Familie zuliebe nicht umgebracht», «ich will mich vor dem Kind umbringen» (r4-29: `krise#bleibt`), «er sagt ich will mich wegen der Kinder umbringen», «meine Mutter sagt ich will mich wegen der Familie umbringen», «ich möchte mich für meine Familie nicht umbringen», «ich will mich und die Kinder umbringen» → `grenzen#gewalt`. Bei «der Familie zuliebe» greift zusätzlich die neue Prüfung «Artikel + Person nach ‹mich›», weil «der» auch Dativ ist. Die Objektschleife gibt es seit `43d6b21`. <br>**Hinnehmbar:** Beim Muster «bringt … um» gilt der Suizid-Vorrang nicht. «er bringt sich und mich um», «wenn ich gehe bringt er sich und mich um», «mein Sohn ritzt sich und sagt er bringt mich um» → Gewalt; das sind Drohungen gegen die eigene Person. <br>**Gesamtvergleich mit r4-29** (500 Proben in der Nachbildung von G, siehe unten): Mit G geht keine Ich-Aussage und keine Anfrage mit «sich» und Tötungsverb mehr auf «Gewalt». Ausnahmen sind die drei Drohungen «bringt … sich und mich um». Was ausserhalb von D30-19 schlechter liegt als in r4-29, liegt in der sicheren Richtung: Redewendungen und Verneinungen → Suizid (D30-14) sowie Drohungen mit reflexivem Verb in einem früheren Teilsatz (R30-P01). |
| d | Nachweise | **weitgehend richtig** | Richtig: Nachtrag 4 Punkt 2 markiert; Nachtrag 5 beschreibt F und die Ergänzung so, wie der Code sie umsetzt; Zahlen (251/251, 103 Abweichungen, keine im Bestand; `q-alle` gleich F ausser der Probe zu Punkt 3); R30-P01 mit den Grenzen und der offenen Zuordnung des erweiterten Suizids; `independentReview` auf «ausstehend». **Ungenau:** «Keine Anfrage mit ‹sich› geht auf ‹Gewalt›» gilt nur für Tötungsverben, nicht für «bringt … sich und mich um». «Bekannte Grenzen, alle in der sicheren Richtung» stimmt wegen D30-19 nicht. |
| – | Build | **erfüllt** | Produktionsbuild in einer Kopie mit «bestaetigt»: 0 Blocker, 0 Hinweise, bytegleich mit `dist/d30f`. Gegenüber `ca89da2` ist nur `js/interaktion.js` verschieden. Wortbilanz unverändert; `node --check` ohne Fehler; 0 Skriptfehler. |

### Neuer Befund und Korrektur (Variante G)

| ID | Priorität | Befund | Vorschlag (nicht umgesetzt) |
| --- | --- | --- | --- |
| D30-19 | **wichtig, Auflage vor dem Export** | Ich-Aussagen mit «Familie», «Kind» oder «Kinder» zwischen «mich» und dem Verb gehen auf «Gewalt» (11 Proben, mindestens drei schlechter als r4-29). Ursache 1: Die Objektschleife in `killIntent()` prüft «mich» und «Familie/Kind/Kinder» in einem Durchgang und nimmt das Wort, das näher am Verb steht. Ursache 2: Die neue Prüfung «Artikel + Person nach ‹mich›» läuft vor der Suche nach «ich», und «der» ist auch Dativ («mich der Familie zuliebe»). | **Variante G**, zwei Änderungen: (1) Steht «mich» im Teilsatz, entscheidet `michIntent()`; erst danach zählen «uns», «dich», «ihn», «euch», «Kind(er)», «Familie». (2) `michIntent()` sucht zuerst das nächste Subjekt links von «mich» im Teilsatz («ich» → Suizid, Dritte → Gewalt). Erst wenn dort keines steht, folgt die Prüfung «Subjekt nach ‹mich›», danach die Suche links vom Teilsatz und das Drohwort wie bisher. |

**Beleg für G (nur nachgebildet):** Ich habe G in einer Kopie von `dist/d30f` im Scratchpad gepatcht (`varG/site/js/interaktion.js`). Im Repository ist nichts geändert.

- `suchtest.mjs varG/site`: 251 von 251, 0 Skriptfehler.
- 492 verschiedene Proben (`q-alle2.txt`): gegenüber `f8c8ce2` ändern sich nur 5 Ersttreffer, alle aus D30-19, alle → `krise#suizid`.
- 8 weitere Proben (`q-fuenft3.txt`): die Ich-Aussagen mit «wegen meiner Familie», «vor dem Kind», «für meine Familie», «mich und die Kinder» → Suizid. Fremdbedrohungen bleiben bei Gewalt: «er will mich und die Kinder umbringen», «ich habe Angst er will mich und die Kinder umbringen».
- Mit G geht in allen 500 Proben keine Ich-Aussage und keine Anfrage mit «sich» und Tötungsverb auf «Gewalt», ausser den drei Drohungen «bringt … sich und mich um».

Für den Export:
1. G im Repository umsetzen.
2. In die Testliste aufnehmen, mindestens:
   - «ich will mich wegen meiner Familie umbringen» → `krise.html#suizid`
   - «ich will mich vor dem Kind umbringen» → `krise.html#suizid`
   - «er sagt ich will mich wegen der Kinder umbringen» → `krise.html#suizid`
   - «ich will mich der Familie zuliebe nicht umbringen» → `!grenzen.html#gewalt`
   - «ich würde mich der Kinder wegen nie umbringen» → `!grenzen.html#gewalt`
   - «ich will mich und die Kinder umbringen» → `krise.html#suizid`
   - «er will mich und die Kinder umbringen» → `grenzen.html#gewalt`
3. Danach prüfen: `suchtest.mjs` 100 %; die Ersttreffer von `q-alle2.txt` und `q-fuenft3.txt` gleich wie in `q-alle2.resultG.tsv` und `q-fuenft3.resultG.tsv` (Spalte G); 91/54 gleich r4-29. Das ist ein mechanischer Abgleich. Fällt er ohne Abweichung aus, ist die Auflage erfüllt, und `independentReview` kann auf «bestaetigt» gesetzt werden.

Nachweise dazu: In Nachtrag 5 den Satz «Keine Anfrage mit ‹sich› …» auf Tötungsverben eingrenzen und D30-19 nennen.

### Belege der fünften Nachprüfung

Unter `/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/d30/`:

- `q-fuenft.txt`, `q-fuenft2.txt`, `q-fuenft3.txt` (55 neue Proben); `q-alle2.txt` (492 verschiedene Proben)
- `q-alle.result3.tsv`, `q-fuenft*.result3.tsv` (r4-29, Nachbildung F, `f8c8ce2`); `q-alle2.resultG.tsv`, `q-fuenft3.resultG.tsv` (r4-29, `f8c8ce2`, Nachbildung G)
- `varG/site/`: nachgebildete Variante G (nur Scratchpad); `searchG.cjs`
- `suchtest-site-f8c.txt`: Suchtest gegen `site/` (103 Abweichungen)
- `prodcopy9/`: Produktion mit «bestaetigt»
- Entwurf: `/home/claude/borderline-angehoerige/dist/d30f` (von `.gitignore` erfasst)

*Nachtrag:* Die bauende Sitzung hat den Abschnitt «Fünfte Nachprüfung» unverändert in `a8fe194` committet. Der folgende Abschnitt ist nicht committet.

## Abschlussbestätigung (Stand a8fe194)

| | |
| --- | --- |
| Stand | Branch `claude/r4-30-suche-links-1792061353`, Commit `a8fe194` (15.10.2026, 15:03 MESZ), auf `origin` gleich. Diff zu `f8c8ce2`: `interaktion.js` (Korrektur G, Hilfsfunktion `clauseStart`), Testliste (258 Anfragen), `FREIGABE.md` (Nachtrag 5 markiert, Nachtrag 6), Pendenzen (R3C-A9), dieser Bericht |
| Prüfobjekt | frischer Entwurf `node authoring/tools/build.mjs --out=dist/d30g`. Abgleich gegen meine eigene Nachbildung von G (`varG/site`) und gegen `site/` (r4-29) |
| Umfang | der mechanische Abgleich, den ich in der fünften Nachprüfung festgelegt habe, und die Nachweise; keine neuen Probenrunden. Ich habe den Abgleich selbst durchgeführt, nicht die bauende Sitzung |
| Prüfsitzung | dieselbe unabhängige Prüfsitzung; nichts gebaut, korrigiert oder entschieden; nur diese Datei geändert; keine git-Schreibbefehle; Netlify nicht angefasst |
| Zeitpunkt | 15.10.2026, etwa 15:05 bis 15:20 MESZ |

### Ergebnis

**Freigabefähig.** Der mechanische Abgleich ergibt keine Abweichung. **Die Auflage D30-19 ist erfüllt.** **`releaseApproval.independentReview` kann auf «bestaetigt» gesetzt werden, und r4-30 kann exportiert werden.**

### Beleg je Punkt

| Nr. | Punkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | `suchtest.mjs` zu 100 % | **erfüllt** | Entwurf `dist/d30g`: «23 Seiten · 0 Blocker · 1 Hinweise» (nur change-review). `node authoring/tools/suchtest.mjs dist/d30g`: «Suchtest: 258 von 258 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Die Testliste hat 258 Zeilen, darunter die sieben verlangten Zeilen zu D30-19 mit den verlangten Erwartungen. Gegen `site/` (r4-29): 150 von 258, also 108 Abweichungen, keine im Bestand. |
| 2 | Abgleich mit den resultG-Dateien | **erfüllt, 0 Abweichungen** | Neuer Lauf in Chromium mit drei Ständen (r4-29, meine Nachbildung von G, `a8fe194`), Ergebnisse `q-alle2.resultA.tsv` und `q-fuenft3.resultA.tsv`. Ersttreffer von `a8fe194` gegen Spalte G in `q-alle2.resultG.tsv`: 492 von 492 gleich. Gegen `q-fuenft3.resultG.tsv`: 8 von 8 gleich. Gegen die Nachbildung von G im selben Lauf: ebenfalls 0 Abweichungen. 0 Skriptfehler. Die Umsetzung bestimmt den Teilsatz für «mich» mit `clauseStart` ab «mich», meine Nachbildung ab dem Verb. Auf allen 500 Proben ergibt das keinen Unterschied. |
| 3 | 91/54 wie r4-29 | **erfüllt** | `queries_all.txt` 91 von 91 und `queries.txt` 54 von 54 Ersttreffer gleich `site/`. |
| 4 | Nachtrag 6 und Markierungen in Nachtrag 5 | **erfüllt** | Nachtrag 5: «Keine Anfrage mit ‹sich› geht auf ‹Gewalt›» ist durchgestrichen und auf Tötungsverben eingegrenzt; «alle in der sicheren Richtung» ist durchgestrichen und mit Verweis auf D30-19 als ungenau markiert. Nachtrag 6 gibt Anlass (D30-19, 11 Proben, Objektschleife seit `43d6b21`), die beiden Änderungen von G und die Zahlen richtig wieder: 258/258; 108 Abweichungen gegen `site/`, keine im Bestand; 492/492 und 8/8. `independentReview` steht bis zu dieser Bestätigung auf «ausstehend». Die Pendenzen nennen bei R3C-A9 258 Anfragen und D30-16 bis -19. |
| – | Build und Gate | **erfüllt** | Kopie (`git archive a8fe194`) mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d30g`. Gegenprobe mit «ausstehend»: blockiert (change-review). Gegenüber `f8c8ce2` ist in der Ausgabe nur `js/interaktion.js` verschieden; Inhalt und sichtbarer Text sind damit gleich wie in der Nachprüfung belegt. Wortbilanz unverändert (2399 / 2398 / 898 / 30 667); 0 `tel:`, 0 «Notruf»; `node --check` ohne Fehler. |

### Status der Befunde zum Abschluss

| ID | Status |
| --- | --- |
| D30-01, -09, -13, -16, -17, -19 (Suche, Auflagen) | erledigt |
| D30-02, -03, -05, -06, -08, -10, -11 | erledigt |
| D30-18 | erledigt für «mich» vor dem Subjekt. Drohungen mit reflexivem Verb in einem früheren Teilsatz gehen bewusst auf Suizid (sichere Richtung, R30-P01) |
| D30-04, -12, -15 | teilweise erledigt; Rest in R30-P01 |
| D30-07 | vermerkt (R30-P02) |
| D30-14 | offen, fachlich abwägen (R30-P01) |
| Erweiterter Suizid → Suizid | Zuordnung durch die Fachstelle zu bestätigen (R30-P01) |

Kein Befund ist offen, der den Export hindert.

**Hinweis für das Setzen der Freigabe (kein Befund):** `releaseApproval.reviewScope` sagt noch «Unabhängige Prüfung ausstehend». Es nennt weder das EBG-Blatt A1 (D30-02) noch die Testliste. Beim Setzen von «bestaetigt» sollte es nachgeführt werden, z. B. mit Verweis auf `audit-results/2026-10-15-delta-r4-30/PRUEFUNG.md` (Delta-Prüfung, fünf Nachprüfungen, Abschlussbestätigung auf `a8fe194`). `releaseApproval` wird nicht gerendert; das ändert also nichts an `site/`. Nach dem Export folgt wie bei r4-29 die Produktionsprüfung auf der Ziel-Adresse; dazu gehört `suchtest.mjs site`, das dann 258/258 ergeben muss.

### Belege der Abschlussbestätigung

Unter `/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/d30/`:

- `searchA.cjs`: Lauf mit drei Ständen (r4-29 Port 8129, Nachbildung G 8133, `a8fe194` 8130)
- `q-alle2.resultA.tsv`, `q-fuenft3.resultA.tsv`, `q-all91.resultA.tsv`, `q-54.resultA.tsv`
- Referenz: `q-alle2.resultG.tsv`, `q-fuenft3.resultG.tsv` (fünfte Nachprüfung)
- `suchtest-site-a8f.txt`: Suchtest gegen `site/` (108 Abweichungen)
- `prodcopy10/` (Produktion mit «bestaetigt»), `prodcopy11/` (Gegenprobe)
- Entwurf: `/home/claude/borderline-angehoerige/dist/d30g` (von `.gitignore` erfasst)

*Nachtrag:* Die bauende Sitzung hat den Abschnitt «Abschlussbestätigung» unverändert mitcommittet. Der folgende Abschnitt ist nicht committet.

## Nachprüfung Codex #689 (Stand e93f9dd)

| | |
| --- | --- |
| Stand | Branch `claude/r4-30-suche-links-1792061353`, Commit `e93f9dd` (15.10.2026, 15:27 MESZ), auf `origin` gleich; Kopf des einzigen offenen Pull Requests #689. Diff zu `085c732` (Export nach der Abschlussbestätigung): `interaktion.js` (Suizid-Signal, Beiwörter nach «mich»), Testliste (266 Anfragen), `site.config.json` (`independentReview` «ausstehend», `reviewScope`), `FREIGABE.md` (Nachtrag 7), Pendenzen. `site/` ist unverändert `085c732` und bytegleich mit meinem Entwurf von `a8fe194` |
| Anlass | Codex-Review von #689 auf `085c732` (13:17 UTC), zwei P1 (per `gh api` gelesen): (1) Die längste Phrase verdrängt eine Suizid-Phrase («ich will sterben und habe Angst vor meiner Partnerin» → Gewalt). (2) Nach «mich» wird nach dem Artikel kein Beiwort zugelassen («dass mich mein eigener Mann umbringt» → Suizid) |
| Prüfobjekt | frischer Entwurf `node authoring/tools/build.mjs --out=dist/d30h`. Verglichen in drei Ständen: r4-29 (`site/` aus `53c5655`), `085c732` (`site/`) und `e93f9dd` |
| Prüfsitzung | dieselbe unabhängige Prüfsitzung; nichts gebaut, korrigiert oder entschieden; nur diese Datei geändert; keine git-Schreibbefehle; Netlify nicht angefasst |
| Zeitpunkt | 15.10.2026, etwa 15:30 bis 16:00 MESZ |

### Ergebnis

**Freigabefähig mit Auflagen:** Beide P1-Korrekturen sind richtig und ohne Nebenwirkung auf meine 500 bisherigen Proben. Die gezielten Proben zeigen aber eine weitere Klasse in der heiklen Richtung, die schon im Export `085c732` steckt (D30-20). Es geht um Ich-Aussagen mit Infinitiv: Eine Person hält, bittet, hindert oder überredet «mich», «mich (nicht) umzubringen». Diese Sätze gehen auf «Gewalt», darunter «meine Familie hält mich davon ab, mich umzubringen» und «er bittet mich, mich nicht umzubringen». In r4-29 gingen sie auf `krise#suizid`.

**`independentReview` kann noch nicht wieder auf «bestaetigt» gesetzt werden.** Das geht, sobald D30-20 korrigiert ist und der mechanische Abgleich unten ohne Abweichung durchläuft. Vor dem Merge braucht es zusätzlich ein neues Codex-Review auf dem endgültigen Kopf von #689 (R29-P20). Das bisherige Review lief nur auf `085c732`.

**Berichtigung:** Die Klasse D30-20 und der Fall aus Codex-P1 (1) waren schon in `a8fe194` vorhanden. Beide hatte ich in der Abschlussbestätigung nicht erkannt.

### Beleg je Punkt

| Nr. | Punkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| a | `suchtest.mjs` auf eigenem Entwurf | **erfüllt** | `dist/d30h`: «23 Seiten · 0 Blocker · 1 Hinweise». `suchtest.mjs dist/d30h`: «266 von 266 … JS-Fehler 0», Exit 0. Gegen `site/` (`085c732`): 261 von 266. Die 5 Abweichungen sind genau die neuen Fälle zu den beiden P1. |
| b | Probelisten gegen `085c732` und resultG | **erfüllt, 0 Abweichungen** | `q-alle2.txt` (492) und `q-fuenft3.txt` (8): Ersttreffer von `e93f9dd` gleich `085c732` (500/500) und gleich Spalte G in den resultG-Dateien (500/500). `085c732` stimmt ebenfalls mit resultG überein. 91/91 und 54/54 gleich r4-29. 0 Skriptfehler. |
| c | Gezielte Proben | **beide P1 behoben; neuer Befund D30-20; kleiner Befund D30-21** | 89 neue Proben (`q-codex.txt`, `q-codex2.txt`, `q-codex3.txt`). <br>**P1 (1):** «ich will sterben und habe Angst vor meiner Partnerin», «ich will nicht mehr leben und habe Angst vor meinem Mann», «Suizidgedanken und Angst vor meinem Partner», «lebensmüde und Angst vor ihm» → `krise#suizid` (in `085c732`: Gewalt). Ebenso besser: «ich bin lebensmüde ich kann nicht mehr» und «Suizidgedanken keine Kraft» → `krise#suizid` (r4-29: `selbstfuersorge#warnsignale`). <br>**Nebenwirkungen bei anderen Themen:** Ohne weitere Phrase bleibt die übliche Suche. «Suizid Kinder erklären» → `kinder`, «Suizidgedanken Medikamente» → `krise#waehrend`, «Suizid Jugendliche Eltern» → `jugendliche#schnell`, «Suizid Angehörige Hilfe» → `krise#suizid`, gleich wie in `085c732` und r4-29. «Selbstmord in der Familie Trauer» und «Selbstmord Trauer Geschwister» → 0 Treffer wie in r4-29 (Lücke, R30-P01). <br>**Verneinungen:** «er will mich umbringen ich will nicht tot sein», «… nie tot sein» und «ich will nicht sterben er droht mich umzubringen» → Gewalt (richtig). Verneinte Einzelwörter zählen dagegen als Suizid-Signal, siehe D30-21. <br>**P1 (2), Beiwörter:** «dass mich mein eigener Mann umbringt», «dass mich die ganze Familie umbringen will», «wenn mich mein neuer Freund umbringen will», «dass mich mein ehemaliger Partner umbringt», «ob mich mein eigener Sohn umbringen will» → Gewalt (in `085c732`: Suizid). Gegenproben bleiben bei Suizid: «ich will mich wegen meinem eigenen Mann umbringen», «ich will mich der Familie zuliebe nicht umbringen», «wenn mich die Kinder nicht bräuchten würde ich mich umbringen». <br>**«mich das»:** «wenn mich das alles umbringt», «mich das umbringt», «wenn mich das noch umbringt», «das bringt mich um», «das alles bringt mich noch um» → Suizid wie in `085c732` (Redewendung, sichere Richtung, D30-14). «dass mich das Kind umbringt» → Gewalt (richtig). Die Suche nach der Person endet nach drei Wörtern. «dass mich die Sorge um meine Tochter umbringt» und «dass mich die Angst vor meinem Mann umbringt» bleiben deshalb bei Suizid, wie in `085c732`. <br>**D30-20:** siehe unten. |
| d | Nachweise | **erfüllt** | Nachtrag 7 gibt Abschlussbestätigung, Export `085c732`, #689 (13:11 UTC eröffnet, einziger offener Pull Request) und die zwei P1 (13:17 UTC, Stand `085c732`) richtig wieder. Das stimmt mit der GitHub-API überein. Die Korrekturen sind so beschrieben, wie der Code sie umsetzt (verneinte Phrase nur direkt nach «nicht» oder «nie»; bis zu zwei Wörter zwischen Artikel und Person). Die Zahlen stimmen: 266/266; 500 Proben gleich wie `085c732`. `independentReview` und `reviewScope` stehen wieder auf «ausstehend». Ein neues Codex-Review auf dem vollständigen Stand ist angekündigt. Pendenzen R3C-A9 mit 266 Anfragen. |
| – | Build | **erfüllt** | Kopie (`git archive e93f9dd`) mit «bestaetigt»: 0 Blocker, 0 Hinweise, bytegleich mit `dist/d30h`. Gegenüber `site/` ist nur `js/interaktion.js` verschieden. Wortbilanz unverändert; `node --check` ohne Fehler. |

### Neue Befunde

| ID | Priorität | Befund | Vorschlag (nicht umgesetzt) |
| --- | --- | --- | --- |
| D30-20 | **wichtig, Auflage vor dem Export** | In Infinitivsätzen steht «mich» vor dem Tötungsverb für die sprechende Person selbst: «X hält mich davon ab, mich umzubringen» und «X bittet mich, mich nicht umzubringen». `michIntent()` findet links eine Person und meldet Gewalt. Betroffen sind 13 Ich-Aussagen. Schlechter als r4-29 (dort `krise#suizid`) sind «meine Familie hält mich davon ab mich umzubringen», «meine Tochter hat mich davon abgehalten mich umzubringen», «er bittet mich mich nicht umzubringen», «er hat mich überredet mich nicht umzubringen» und «sie hat mich angefleht mich nicht umzubringen». Ebenso betroffen: «nur meine Kinder halten mich davon ab mich umzubringen», «meine Kinder sind der (einzige) Grund mich nicht umzubringen», «mein Mann hindert mich daran mich umzubringen», «meine Mutter bittet mich mich nicht umzubringen», «mein Mann zwingt mich mich umzubringen», «er treibt mich dazu mich umzubringen», «mein Mann bringt mich dazu mich umzubringen». Gleich in `085c732` und `e93f9dd`. | **Variante I** in `michIntent()`, zu Beginn: Folgt auf «mich» innerhalb von vier Wörtern ein Tötungsverb, und kommt kein Drohwort und kein «versucht», «versuchte», «Versuch», «plant» oder «geplant» vor, dann gilt Suizid, (a) wenn das Verb ein zu-Infinitiv ist («umzubringen», «zu töten») und schon vorher ein «mich» steht, oder (b) wenn zwischen «mich» und dem Verb «nicht» oder «nie» steht. |
| D30-21 | optional | Verneinte Einzelwörter zählen als Suizid-Signal. «er ist nicht suizidal aber droht mich umzubringen», «er hat keine Suizidgedanken aber droht mich umzubringen» und «kein Suizid sondern er droht mich umzubringen» gehen auf Suizid (in `085c732`: Gewalt; r4-29: Suizid oder schwach). Ebenso «… ich will auf keinen Fall tot sein» → Suizid. Die Richtung ist sicher. | Bei den Einzelwörtern ebenfalls «nicht», «nie», «kein», «keine», «keinen» direkt davor ausnehmen; bei Gelegenheit. |

**Beleg für I (nur nachgebildet):** Ich habe I in einer Kopie von `dist/d30h` im Scratchpad gepatcht (`varI/site/js/interaktion.js`). Im Repository ist nichts geändert.

- `suchtest.mjs varI/site`: 266 von 266, 0 Skriptfehler.
- 575 verschiedene Proben (`q-alle4.txt`, alle bisherigen und die neuen): gegenüber `e93f9dd` ändern sich nur 15 Ersttreffer, alle → `krise#suizid`. Darunter sind die 13 Fälle aus D30-20. Dazu kommen zwei verneinte Fremdaussagen: «er will mich nicht umbringen sagt er» (r4-29: `beziehungen#verantwortung`) und «er hat versprochen mich nicht umzubringen» (r4-29: `krise#suizid`). Beides geht in die sichere Richtung.
- Unverändert bei Gewalt bleiben: «er hat vor mich umzubringen», «er plant mich umzubringen», «er hat mich geschlagen und versucht mich umzubringen», «er schlägt mich und droht mich umzubringen», «er hasst mich und will mich umbringen», «er hat mir gesagt er will mich umbringen», «er versucht mich umzubringen» und alle festgeschriebenen Gewalt-Zeilen.

**Für den neuen Export:**
1. I im Repository umsetzen.
2. Mindestens diese Zeilen in die Testliste aufnehmen:
   - «meine Familie hält mich davon ab mich umzubringen» → `krise.html#suizid`
   - «er bittet mich mich nicht umzubringen» → `krise.html#suizid`
   - «meine Kinder sind der einzige Grund mich nicht umzubringen» → `krise.html#suizid`
   - «mein Mann hindert mich daran mich umzubringen» → `!grenzen.html#gewalt`
   - «er hat mich geschlagen und versucht mich umzubringen» → `grenzen.html#gewalt`
   - «er plant mich umzubringen» → `grenzen.html#gewalt`
3. Danach prüfen: `suchtest.mjs` 100 %; Ersttreffer von `q-alle4.txt` gleich Spalte I in `q-alle4.resultI.tsv` (575/575); 91/54 gleich r4-29.

Fällt das ohne Abweichung aus, ist die Auflage erfüllt. Dann `independentReview` auf «bestaetigt», neu exportieren und ein Codex-Review auf dem neuen Kopf von #689 abwarten.

### Belege dieser Nachprüfung

Unter `/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/d30/`:

- `q-codex.txt`, `q-codex2.txt`, `q-codex3.txt` (89 neue Proben); `q-alle4.txt` (575 verschiedene Proben)
- `q-alle2.resultH.tsv`, `q-fuenft3.resultH.tsv`, `q-all91.resultH.tsv`, `q-54.resultH.tsv` (Spalten: r4-29, `085c732`, `e93f9dd`)
- `q-codex*.result3.tsv` (r4-29, `085c732`, `e93f9dd`); `q-alle4.resultI.tsv` (r4-29, `e93f9dd`, Nachbildung I)
- `varI/site/`: nachgebildete Variante I (nur Scratchpad); `searchI.cjs`
- `suchtest-d30h.txt`; `prodcopy12/` (Produktion mit «bestaetigt»)
- Entwurf: `/home/claude/borderline-angehoerige/dist/d30h` (von `.gitignore` erfasst)
