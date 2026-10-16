# Audit 03 · Gruppe G3 · Teilbericht

Lauf `2026-10-16-modul-03-r4-35` · Prüfstand Branch `claude/a8k-korrektur-1792143386`, Commit `ff5016b` (r4-35) · Seiten `behandlung` und `kommunizieren` sowie ihre Einträge in `site.config.json` · unabhängige Prüfsitzung, die weder gebaut noch korrigiert hat. Im Repository wurde nichts geändert; gelesen wurden die Lesefassungen, `authoring/content/*.html`, `authoring/site.config.json`, `authoring/js/interaktion.js`, der gebaute Export `site/` (nur gelesen) und die früheren Befunde (A03, S1 bis S3, WORTLAUT und FREIGABE von Release C, A8, FREIGABE r4-35, Pendenzen).

Befunde: `G3-befunde.csv`, 24 Zeilen · P0: 0 · P1: 0 · P2: 8 · P3: 16. Alle Ersatzfassungen zusammen machen die Seitentexte um rund 70 Wörter länger (gezählt wie `kennzahlen.py`; `behandlung` rund +42, `kommunizieren` rund +25, Beschreibung +3; der Filterstatus G3-005 ändert die Länge nicht). `behandlung` lag nach Release C knapp unter dem Wortziel (2399 von < 2400 mit Quellenblock); wird das Ziel weiter angewendet, braucht es dort einen Ausgleich oder eine Auswahl unter den P3-Befunden.

| ID | Prio | Fundstelle | Kurz |
| --- | --- | --- | --- |
| G3-001 | P2 | behandlung › kopf › §3 | Einleitung wiederholt die Kurzbox wortgleich |
| G3-002 | P2 | behandlung › therapieformen › §16 | «brauchen sofortige Aufmerksamkeit» unbestimmt |
| G3-003 | P3 | behandlung › angebote › §3, §55 | «Suchweg», Prüfdatum im Nominalstil |
| G3-004 | P3 | behandlung › angebote › §7 | HYPE: grammatisch unvollständige Reihung |
| G3-005 | P3 | behandlung › angebote › §4 | Filterstatus «von … Treffern» (interaktion.js) |
| G3-006 | P2 | behandlung › wartezeit › §5 | Kostenfragen wieder verdichtet (A03-007) |
| G3-007 | P2 | behandlung › kontakt › §17 | «Eine Mitteilung hebt die Schweigepflicht nicht auf» mehrdeutig |
| G3-008 | P3 | behandlung › kontakt › §20 | wessen Unterstützungsbedarf |
| G3-009 | P3 | behandlung › kontakt › §35 | Musterbrief: Artikel, «Kontaktweg» |
| G3-010 | P3 | behandlung › keine-behandlung › §4 | Beispiel «nach Angeboten schauen» |
| G3-011 | P2 | behandlung › keine-behandlung › §10 | Sicherheitssatz zirkulär («ob … Hilfe nötig ist») |
| G3-012 | P3 | behandlung › rueckschlaege › §4 | offene Fragen im Passiv |
| G3-013 | P3 | kommunizieren › zuhoeren › §19 | «Not und Grenze» ohne Bezug |
| G3-014 | P2 | kommunizieren › anerkennen › §6 | Kurztext Abbildung: Bildbeschreibung, unterstellter «Schmerz» (A8-03) |
| G3-015 | P3 | kommunizieren › anerkennen › §11 | Satzzeichen «nicht.», (A03-018-Typ) |
| G3-016 | P2 | kommunizieren › anerkennen › §13 | Grenzbeispiel mit «– aber» widerspricht Stolperstein; «klingt belastend» doppelt |
| G3-017 | P3 | kommunizieren › anerkennen › §16 | Tabellen-Einleitung ohne Zweck (A8-06) |
| G3-018 | P3 | kommunizieren › moment › §19 | «Beruhigung ist nicht dasselbe wie Klärung» |
| G3-019 | P3 | kommunizieren › kippen › §3 | «keine Beruhigung erreichen» mehrdeutig |
| G3-020 | P3 | kommunizieren › kippen › §24 | «Ich möchte wieder sprechen» |
| G3-021 | P3 | kommunizieren › worte › §3 | «keine verlässliche Auskunft über ein verborgenes Motiv» |
| G3-022 | P2 | kommunizieren › worte › §6, §8 | zweimal «Ich höre, dass …» |
| G3-023 | P3 | kommunizieren › beispiele › §17 | «keine tragfähige Lösung» im Gesprächsbeispiel |
| G3-024 | P3 | site.config.json › kommunizieren › description | Aufzählung ohne Satz, fehlendes Komma |

## 1. Je Seite

### behandlung (Behandlung und Ihre Rolle darin)

**Blöcke gelesen: 219 von 219.** Davon 190 Blöcke und 12 Attribute der Lesefassung, dazu 11 Texte, die nur im HTML stehen (Kapitelübersicht mit Beschriftung, `aria-label` und sechs Sprungzielen; Filterbeschriftung «Angebot filtern» und Platzhalter; Beschriftung «Muster-E-Mail»), 4 Felder in `site.config.json` (Titel, Navigationsbeschriftung, Beschreibung, `primaryTask`) und 2 Statustexte des Filters aus `interaktion.js`. Gelesen auch der Rechtsteil «Wann Sie Auskunft erhalten können» mit der Vertretungsfolge, alle fünf Angebotseinträge, alle Akkordeons und der Musterbrief.

**Gesamturteil.** Die Seite ist sachlich verlässlich und ruhig. Sie respektiert die Selbstbestimmung der betroffenen Person und beschreibt Rollen, Schweigepflicht und die Grenzen der Angehörigen klar und ohne Schuldzuweisung («Therapieziele bestimmen, den Fortschritt überwachen oder Behandlung und Krisenhilfe ersetzen gehört nicht zu Ihrer Rolle»). Schwächen zeigen sich an drei Stellen: am Einstieg (wörtliche Doppelung von Einleitung und Kurzbox), in verdichteten Verwaltungs- und Rechtssätzen (Kosten, Schweigepflicht nach einer Mitteilung, Ausnahme bei der Vertretung) und in zwei Gefahrensätzen, deren Wendung unbestimmt («sofortige Aufmerksamkeit») oder zirkulär («holen Sie sofort Hilfe; ob … Hilfe nötig ist») ist. Die Gesprächsbeispiele sind brauchbar, klingen aber stellenweise nach Institution («nach Angeboten schauen», «Kontaktweg»). Es gibt keinen kritischen und keinen wichtigen Befund.

**Kennzahlen und Deutung** (`kennzahlen.py`, Stand `ff5016b`): 2155 Wörter, 198 Sätze, Mittel 10,9 und Median 10 Wörter, 3,0 % über 25 Wörter, 25,8 % bis 6 Wörter, 18,2 % mit Verneinung, 2 × «Sie müssen/sollten/dürfen», 1,5 «kann/können» je 100 Wörter, 0 Gedankenstriche, 49 Doppelpunkte, 1 × «nicht … sondern», längster Satz 37 Wörter.

- **Kurze Sätze:** Der Anteil von 25,8 % kommt fast ganz aus der Angebotsliste (Begriffslisten mit «Jugendliche», «Kanton Zürich», Prüfdatum). Ohne Angebote und Quellen sind es 12,6 %; ein Stakkato-Problem gibt es im Fliesstext nicht. Auffällig sind nur die beiden doppelt stehenden Kurzsätze «Borderline ist behandelbar.» (G3-001).
- **Lange Sätze:** Die Sätze über 25 Wörter stehen im Rechtsteil («Ist die Person für eine medizinische Entscheidung nicht urteilsfähig und hat sie sich dazu nicht in einer Patientenverfügung geäussert, plant …», 31 Wörter ohne Label; die gemessenen 37 und 35 Wörter entstehen, weil die Lesefassung den Text nach der eingebetteten Liste anhängt), bei der generalistischen Behandlung (27), im Kostenschritt (26, G3-006) und in Sätzen mit eingebettetem Beispiel. Sie sind logisch gebaut; nur der Kostenschritt ist für Laien zu dicht.
- **Verneinung:** Ohne Angebote 26 %, am höchsten in «Ablehnung oder Abbruch» (42 %) und «Wer was beitragen kann» (40 %). Das ist meist inhaltlich bedingt (Rollengrenzen, «nicht als Drohung», «nicht als Druckmittel», «nicht urteilsfähig»). Eine Verneinungslast im Sinn von «der Text sagt vor allem, was nicht gilt» sehe ich nicht.
- **Bevormundung und Absicherung:** Zweimal «Sie dürfen/müssen»: einmal als rechtliche Erlaubnis (Kurzbox), einmal entlastend («Sie müssen den Verlauf nicht von aussen bewerten»). Keine Häufung von «kann». 
- **Doppelpunkte:** Fast alle sind strukturell (Schrittlabels, Listenlabels im Rechtsteil, «zum Beispiel:», «Was Sie tun können:»). Telegrammstil im Fliesstext gibt es nicht.

### kommunizieren (Zugewandt und klar sprechen)

**Blöcke gelesen: 176 von 176.** Davon 159 Blöcke und 4 Attribute der Lesefassung, dazu 10 Texte, die nur im HTML oder im Export stehen (Kapitelübersicht mit Beschriftung, `aria-label` und sechs Sprungzielen; der eingesetzte Verweis im Text nach «Wenn Suizid angesprochen wird»; die vom Build erzeugte Schaltfläche «Vertiefung anzeigen: So könnte es klingen»), 3 Felder in `site.config.json` (Titel, Beschreibung, `primaryTask`; `navLabel` ist leer). Gelesen auch die ganze Tabelle «Sechs Stufen der Validierung» (Zeilenköpfe, Beispiele, Stolpersteine, `aria-label`), alle Gesprächsbeispiele einschliesslich der Satzbausteine im Akkordeon und die Textfassung der Abbildung für Screenreader. Jedes Gesprächsbeispiel habe ich laut gelesen.

**Gesamturteil.** Die Seite erfüllt Nahbarkeit und Selbstbestimmung am stärksten: Grenzen erscheinen als eigene Entscheidungen, Schutz geht vor, und die meisten Beispiele sind kurz und sprechbar. Abzüge gibt es für wiederkehrende Formeln in den Beispielen («Ich höre, dass …» zweimal, «Das klingt … belastend» zweimal, «Ich merke …» dreimal), für ein Grenzbeispiel mit «– aber», das genau den Stolperstein der Validierungstabelle vorführt, für einen Abbildungstext, der der anderen Person «Schmerz» unterstellt, und für einige abstrakte Nominalsätze («Beruhigung ist nicht dasselbe wie Klärung», «keine verlässliche Auskunft über ein verborgenes Motiv»). Der Abschnitt zu Suizidäusserungen ist ruhig und klar, mit genau einem Verweis im Text (E7). Es gibt keinen kritischen und keinen wichtigen Befund.

**Kennzahlen und Deutung:** 2139 Wörter, 197 Sätze, Mittel 10,9 und Median 10 Wörter, 1,5 % über 25 Wörter, 24,9 % bis 6 Wörter, 31,5 % mit Verneinung, 5 × «Sie müssen/sollten/dürfen», 2,3 «kann/können» je 100 Wörter, 2 Gedankenstriche, 39 Doppelpunkte, 1 × «nicht … sondern», längster Satz 30 Wörter.

- **Kurze Sätze:** Die 24,9 % stammen fast nur aus Gesprächsbeispielen («Ich esse für mich.», «So kann ich nicht weiterreden.»), Schrittnamen («Verbinden.», «Begrenzen oder beenden.») und den Listen «Eher jetzt / Eher später». In gesprochener Sprache ist das erwartbar; im erklärenden Text gibt es kein Stakkato.
- **Verneinung:** 31,5 % ist der zweithöchste Wert der Website (nach `krise` mit 33,1 %), am höchsten in «Beispiele» (39 %) und «Anerkennen» (35 %). Ein grosser Teil ist inhaltlich bedingt: Das Thema heisst «anerkennen, ohne zuzustimmen», und Grenzsätze sind oft verneint. Ein kleinerer Teil sind Formeln, die man abbauen kann: «nicht automatisch» (2 ×), «… heisst nicht …» (2 × im Abschnitt «Anerkennen»), «ist nicht dasselbe wie» (G3-018).
- **Bevormundung:** Alle fünf «Sie müssen/dürfen» sind verneint oder Erlaubnisse («Eine pauschale Schuldzuweisung müssen Sie nicht übernehmen», «Sie dürfen das Gespräch … trotzdem verlassen»). Keine Bevormundung.
- **«kann/können»:** 2,3 je 100 Wörter liegt über dem Mittel der Website, kommt aber zu einem guten Teil aus Beispielsätzen («Wir können später …», «So kann ich nicht …»). Absicherungshäufungen sehe ich im Fliesstext nicht.
- **Gedankenstriche:** zwei, einer davon im Grenzbeispiel (G3-016 entfernt ihn).

## 2. Musterstellen (bleiben unverändert)

**behandlung**

- «Die betroffene Person bringt ihre Ziele ein und übernimmt, soweit möglich, Verantwortung für ihr Handeln. Fachpersonen planen mit ihr die Behandlung, begleiten Krisen und beziehen Angehörige mit Einwilligung ein, sind aber nicht rund um die Uhr erreichbar. … Therapieziele bestimmen, den Fortschritt überwachen oder Behandlung und Krisenhilfe ersetzen gehört nicht zu Ihrer Rolle.» (rollen › §2) – Drei Rollen in je einem Satz, respektvoll gegenüber allen; die Entlastung ergibt sich aus der Sache statt aus einer Formel.
- «Es gibt kein Medikament, das Borderline selbst behandelt. Bei Begleiterkrankungen können Medikamente helfen … Ob ein Medikament passt, klärt die behandelnde ärztliche Fachperson. Geändert oder abgesetzt wird es nur in Absprache mit ihr.» (therapieformen › §17) – Präzise und ruhig; die Sicherheitsregel steht klar da, ohne Alarm.
- «Ich habe den Eindruck, dass die Therapie gerade schwierig für dich ist. Magst du mir sagen, was daran schwer ist?» (rueckschlaege › §3) – Vorsichtig, als eigene Wahrnehmung formuliert, natürliches Schweizer «Magst du».

**kommunizieren**

- «Sie können nachfragen, was die Person verletzt hat, ohne ihrer Darstellung zuzustimmen. Prüfen Sie konkrete Kritik, statt jeden Vorwurf als Symptom oder Verzerrung zu verstehen.» (beispiele › §21) – Nicht stigmatisierend und fair gegenüber beiden Seiten; ein Satz, der die Diagnose ausdrücklich nicht als Erklärung für alles nimmt.
- «Überlegen Sie in Ruhe, woran Sie merken, dass ein Gespräch kippt. Legen Sie sich einen Satz für eine Pause zurecht, der für Sie natürlich klingt und kein Versprechen enthält, zurückzukommen. Dann müssen Sie ihn unter Anspannung nicht erst suchen.» (moment › §16) – Konkret, alltagstauglich und selbstbestimmt; die Begründung im letzten Satz ist praktisch statt belehrend.
- «Es ist jetzt das dritte Mal, dass du mich anschreist.» · «So kann ich nicht weiterreden.» · «Ich gehe jetzt eine Runde spazieren.» (kippen › §13 bis §17) – Kurz, gesprochen, und der dritte Teil ist eine eigene Handlung statt einer Forderung an die andere Person.

## 3. Seitenübergreifende Muster

- **Feste Formeln am Absatzanfang.** «Was Sie tun können:» steht fünfmal (vier auf `kommunizieren`, einmal auf `behandlung`), «Mehr dazu …»/«… steht auf der Seite … im Abschnitt …» in fast jedem Abschnitt. Das ist ein bewusstes Muster der Website und hilft beim Überfliegen; als Hinweis für künftige Texte: nicht in jedem Unterabschnitt verwenden.
- **Gefahrensatz in drei Fassungen auf einer Seite.** `behandlung` hat drei Sätze mit «sofort Hilfe» (wartezeit › §7 «Bei unmittelbarer Gefahr oder unklarer Dringlichkeit …», kontakt › §18 «Bei möglicher akuter Gefahr …», keine-behandlung › §10 «Bei unmittelbarer Gefahr …»). Die Handlung ist einheitlich (W2), der Auslöser wechselt («unmittelbar», «möglich akut», in der Abbildung «akut»). Als Sicherheitsgrenzen sind sie nach E9 erlaubt; eine einheitliche Auslöserformel wäre ruhiger. Kein eigener Befund, ausser G3-011 (Logik). Ebenso stehen auf `kommunizieren` drei Fassungen von «Bei Bedrohung oder Gewalt …» (Kurzbox «hat Schutz Vorrang», zuhoeren «geht Schutz vor Gesprächsführung», kippen «beenden Sie das Gespräch, schaffen Abstand …»).
- **Eigene Beratung, mehrfach.** Auf `behandlung` steht der Hinweis auf eigene Beratung fünfmal (Kurzbox, Abbildung, Screenreadertext, Akkordeon «eigene Belastung», «Holen Sie sich selbst Unterstützung …»), «unabhängig davon/von» ebenso oft. Für Quereinstiege über Akkordeons vertretbar; bei der nächsten Kürzung ein Kandidat.
- **Wiederholte Wendungen in Gesprächsbeispielen** (`kommunizieren`): «Ich merke, …» dreimal, «Das klingt …» dreimal, «Ich höre, dass …» zweimal, «Ich beende/unterbreche das Gespräch jetzt» viermal. Die Pausensätze sind nach W2-010 bewusst einheitlich; die übrigen Formeln nicht (G3-016, G3-022).
- **«… heisst nicht …» und «nicht automatisch».** Im Abschnitt «Anerkennen» stehen «Validieren heisst nicht, verletzendes Verhalten gutzuheissen» und die Überschrift «Mitgefühl heisst nicht übernehmen» kurz nacheinander; «nicht automatisch» steht zweimal auf `kommunizieren` und einmal in der Abbildung auf `behandlung`. Jede Stelle ist für sich vertretbar; zusammen ein KI-typisches Muster. Ich habe nur die abstrakteste Stelle als Befund aufgenommen (G3-018).
- **Dritte Person statt «Sie».** In Abbildungs- und Einleitungstexten stehen «Angehörige» in der dritten Person, wo die Lesenden gemeint sind (behandlung Kurztext Abbildung 1, kontakt › §20, kommunizieren › worte › §3). S1 hat das auf `beziehungen` schon vereinheitlicht.
- **Seitenbeschreibungen als Inhaltsverzeichnis.** Die `description`-Felder vieler Seiten zählen Abschnittstitel auf (z. B. `grenzen`, `rolle`, `selbstfuersorge`, `behandlung`). Für `kommunizieren` ergibt das keinen Satz (G3-024); `behandlung` ist lang (37 Wörter), aber grammatisch in Ordnung und deshalb ohne Befund.
- **«Musterbrief» und «Muster-E-Mail».** Überschrift und Seitenbeschreibung sagen «Musterbrief», die Beschriftung «Muster-E-Mail»; S2 hat das bewusst so gelassen. Kein neuer Befund.

## 4. Prüfbedarf

### Fachlich

1. **G3-001:** Ist «in erster Linie» gleich stark wie «Mittel der Wahl»?
2. **G3-002:** Meint «sofortige Aufmerksamkeit» sofortige fachliche Hilfe oder nur Vorrang innerhalb der Behandlung?
3. **G3-003:** Bezeichnet «Verzeichnis» die verlinkte Seite des Dachverbands DBT zutreffend?
4. **G3-011:** Sicherheitssatz nach F11; Fachstelle bestätigt «welche Hilfe dann nötig ist».
5. **G3-013:** Ist mit «Not» die Not der anderen Person gemeint?
6. **G3-014:** Abbildungstext einer freigegebenen Figur (R2); nach einer Änderung braucht es den Visualisierungs-Check.
7. **G3-017:** Zwecksatz der Tabelle (wie A8-06).
8. **Ohne Befund · kommunizieren › schnell:** Die Kurzbox «Wenn ein Gespräch gerade kippt» verweist mit «Die drei Schritte ausführlich» auf «Wenn Gespräche kippen». Ihr Schritt 2 («Benennen Sie Wahrnehmung und Grenze: «Ich merke, dass es gerade zu viel wird. So kann ich nicht weiterreden.»») entspricht aber nicht Schritt 2 im Abschnitt («Verbinden. Spiegeln Sie vorsichtig …»), sondern eher Schritt 3. Wer dem Link folgt, findet andere drei Schritte. Ob die Kurzbox bewusst nur Selbstschutz zeigt oder angeglichen werden soll, ist eine didaktische Entscheidung; ohne sie keine Ersatzfassung.
9. **Ohne Befund · kommunizieren › beispiele › §25:** «Ein Neuanfang gelingt meist besser mit Ruhe, begrenzter Offenheit und …» – was «begrenzte Offenheit» meint (dosiert, nur zum eigenen Anteil, nicht alles auf einmal?), ist für Laien unklar. Ohne Klärung kann ich keine sichere Ersatzfassung geben.
10. **Ohne Befund · Tabelle, Stufe 6 «Radikale Echtheit: auf Augenhöhe bleiben»:** «radikal» kann als schonungslose Ehrlichkeit gelesen werden; der Untertitel fängt das auf, und S1 hat den Namen bewusst behalten. Bei einer künftigen Überarbeitung prüfen, ob «Echtheit: auf Augenhöhe bleiben» genügt.
11. **Ohne Befund · behandlung › therapieformen:** «Übertragungsfokussierte Psychotherapie» – «Übertragung» wird nicht erklärt; der Kurztext beschreibt die Methode, nicht den Namen. Verwandt: A03-004 (Glossar).

### Recht

1. **G3-007:** Sagt «Ihre Mitteilung allein gibt Ihnen auch kein Recht auf Auskunft; die Schweigepflicht des Teams gilt weiter» dasselbe wie «Eine Mitteilung hebt die Schweigepflicht nicht auf», auch mit Blick auf R29-P01 (PatG ZH § 15 Abs. 2)?
2. **Ohne Befund · behandlung › auskunft › §6, Ausnahme nach Art. 380 ZGB:** «Eine Ausnahme gilt, wenn eine nicht urteilsfähige Person wegen einer psychischen Störung in einer psychiatrischen Klinik behandelt wird: Dann gelten die Regeln der fürsorgerischen Unterbringung. …» Für Laien bleibt offen, was das für vertretungsberechtigte Angehörige heisst, und gerade bei Borderline ist die psychiatrische Klinik der häufige Fall. Ein klärender Satz (sinngemäss «Ihr Vertretungsrecht gilt dann für diese Behandlung nicht; einbezogen werden Sie gegebenenfalls als Vertrauensperson») wäre eine neue Rechtsaussage. Deshalb nur als Prüfbedarf, ohne Ersatzfassung.
3. **Ohne Befund · behandlung › wartezeit › §5, Satz 2:** «nicht alle Ärztinnen und Ärzte dürfen sie im regulären Verfahren ausstellen» – «im regulären Verfahren» ist für Laien unbestimmt. Vereinfachen («im Normalfall») nur nach Rechtsprüfung; in G3-006 unverändert.
4. **Bekannt und unverändert:** R29-P01 (Satz 2 des Musterbriefs); R30-P02 («entscheidet die betroffene Person» in der Einleitung, ohne Einschränkung für nicht urteilsfähige Kinder, und in keine-behandlung › §3 ohne den Fall des Vormunds).

### Hinweis ausserhalb der Sprache

- `site.config.json` › `visualPlan` › `v-be-wartezeit` › `reason` nennt bei Schritt 4 «die Handlungsanleitung bei akuter Gefahr mit dem Verweis im Text». Seit E7 (r4-29) hat `behandlung` keinen Verweis im Text mehr; die Planzeile ist veraltet. Das ist Dokumentation, nicht Wortlaut.
- Die Seite `kommunizieren` klappt den Abschnitt «So könnte es klingen» als «Vertiefung anzeigen: …» ein (`collapsedSections`), obwohl die Kurzbox mit «Konkrete Beispielsätze» dorthin führt. Struktur und Bedienung, nicht Modul 03.

## 5. Nicht geprüft

- **Darstellung im Browser:** Akkordeons, die eingeklappte Vertiefung, die Tabelle auf dem Smartphone und die Abbildungen habe ich nicht gerendert angesehen; geprüft sind Quelltext, Lesefassung und der Text im Export. Ob Ersatzfassungen in Kästen oder Tabellenzellen Platz haben, ist nicht geprüft (W3).
- **Screenreader:** keine reale Ansage geprüft; gelesen sind die Texte für Screenreader, `aria-label` und die Statustexte des Filters im Quelltext.
- **Fachliche und rechtliche Richtigkeit:** nicht Gegenstand; nur als Prüfbedarf markiert. Die Angebotsseiten, die BAG-Seite und die Quellen habe ich nicht abgerufen.
- **Wortbilanz:** `authoring/tools/wortbilanz.mjs` nicht ausgeführt (kein Werkzeuglauf im Repository); die Wortdifferenzen sind mit der Zählweise von `kennzahlen.py` geschätzt.
- **Suche:** Ob G3-024 (Beschreibung im Suchindex) Treffer verschiebt, ist nicht getestet; das Akzeptanzkriterium verlangt den Suchtest.
- **Verweis im Text** (`responsibility.inline`) und Fusszeile: geprüfter Wortlaut der Fachstelle, nur gelesen, ohne Befund (E7 auf `kommunizieren` eingehalten: genau ein Verweis, direkt nach der Handlungsanleitung zu Suizidäusserungen).
