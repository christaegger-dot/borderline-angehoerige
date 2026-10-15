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
