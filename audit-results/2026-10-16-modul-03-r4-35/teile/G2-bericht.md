# Audit 03 · Teilbericht G2 (rolle, grenzen, diagnose)

Lauf `2026-10-16-modul-03-r4-35` · Prüfstand Branch `claude/a8k-korrektur-1792143386`, Commit `ff5016b` (r4-35) · Prüfsitzung, die die Website weder gebaut noch korrigiert hat · reines Audit, im Repository nichts geändert (nur gelesen; `node authoring/tools/wortbilanz.mjs` lesend ausgeführt).

Befunde: `teile/G2-befunde.csv`, 30 Zeilen, IDs G2-001 bis G2-030.

| Priorität | Anzahl | IDs |
| --- | --- | --- |
| P0 | 0 | – |
| P1 | 0 | – |
| P2 | 5 | G2-003, G2-005, G2-011, G2-015, G2-020 |
| P3 | 25 | übrige |

Wortbilanz (Zählregel `wortbilanz.mjs`, mit Quellenblock), wenn alle Befunde übernommen werden:

| Seite | heute | Änderung | danach | Ziel Release C | nur P2 |
| --- | ---: | ---: | ---: | --- | ---: |
| rolle | 1981 | +39 | 2020 | < 2000 | +15 (1996) |
| grenzen | 2199 | +2 | 2201 | ≤ 2200 | +4 (2203) |
| diagnose | 1928 | +25 | 1953 | nicht wachsen | 0 |

Bei grenzen gleichen G2-016 (−4) und G2-019 (−9) die übrigen Zusätze fast aus. Die Wortziele hat die Auftraggeberin für Release C gesetzt; ob sie weiter gelten, entscheidet sie. Die Zusätze sind je Befund in `begruendung_ersatz` begründet. Die Seitenbeschreibungen (G2-013, G2-024, G2-030) zählen nicht zur Wortbilanz, ändern aber die Suchwörter (Suchtest nötig).

---

## 1. Je Seite

### rolle · Ihre Rolle klären

**Blöcke gelesen: 134 von 134** (Lesefassung), dazu 7 von 7 Attributtexten (aria-label), die Sprungliste (Label und 7 Einträge, `aria-label` «Weg durch die Seite») und die Seitenbeschreibung, im HTML kontrolliert.

**Gesamturteil.** Die Seite ist zugewandt, klar in der Haltung und trennt Schuld, Schuldgefühl und Verantwortung sorgfältig. Die meisten Gesprächsbeispiele sind natürlich und konkret, die Sicherheitsstelle in «An Grenzen» ist eindeutig. Schwächen: Ein Handlungsabsatz reiht Aufforderungen wie ein Arbeitsblatt (G2-003), ein Absatz endet in Merksätzen (G2-007), und einzelne Beispielsätze klingen nach Beratungssprache (G2-006, G2-009). An zwei Stellen widerspricht die Wortwahl der eigenen Linie der Seite: «aus Schuld nachgeben» und ein «Sie», das sich als unterstelltes Gefühl lesen lässt (G2-011), dazu der Innensatz mit «Elternteil» (G2-005). Kritisch ist nichts.

**Kennzahlen** (`kennzahlen.py`): 1745 Wörter, 160 Sätze, Mittel 10,9, Median 10, über 25 Wörter 2,5 %, bis 6 Wörter 21,2 %, Verneinung 28,8 %, «Sie müssen/sollten/dürfen» 3, «kann/können» 1,9 je 100 Wörter, Gedankenstriche 0, Doppelpunkte 44, «nicht … sondern» 3, längster Satz 30.

Deutung:
- *Kurze Sätze (21 %)* sind meist Listenpunkte («alle Probleme stellvertretend zu lösen», «ein kurzes, klares Kontaktangebot») und Kernaussagen. Echtes Stakkato gibt es nur vereinzelt: «Sie ist ein Angebot, keine feste Rolle.» (anbieten §3, vertretbar), der Absatz anbieten §26 (G2-003) und alltag §10 mit dem Satz ohne Verb «Lieber kleine, verlässliche Schritte als …» (G2-007).
- *Verneinung (29 %)* folgt aus dem Thema: Die Liste «Was nicht Ihre Aufgabe ist» hat fünf Punkte, «Schuld» ist ein Entlastungsabschnitt, und Beispiele enthalten «ohne» («ohne Handy und ohne Druck»). Auffällig ist die Formel «X ist kein Y» («keine feste Rolle», «keine Härte», «kein Versagen»); einzeln tragen sie, gesammelt siehe Abschnitt 3.
- *44 Doppelpunkte*: Die Seite ist stark gegliedert («Was Sie tun können:» fünfmal, «Zum Beispiel:» sechsmal, Listeneinleitungen). Telegrammhaft wirkt nur «Konkrete Verantwortung heisst: eigene Handlungen anschauen, …» (schuld §5, nicht als Befund aufgenommen, weil verständlich).
- *«nicht … sondern» (3)*: alltag §16 (G2-009 löst es auf), alltag §24 und an-grenzen §9 tragen die Aussage.
- *Längster Satz (30)*: an-grenzen §3; trotz Länge durch Parallelbau lesbar, das Problem ist der Bezug (G2-011).
- *«Sie müssen/dürfen» (3)*: alle drei sind Entlastung oder echte Erlaubnis («Hilfe holen dürfen Sie trotzdem jederzeit, auch ohne Gewissheit»). Keine Bevormundung.

### grenzen · Grenzen setzen

**Blöcke gelesen: 141 von 141** (Lesefassung), dazu 9 von 9 Attributtexten, Sprungliste (Label und 11 Einträge), Abbildungsbeschriftung und -nachweis von v-gr-dear, Platzhalter `data-responsibility-inline` (einmal, in «Wenn Gewalt oder Bedrohung vorkommt»; Wortlaut nicht bewertet, E7) und die Seitenbeschreibung.

**Gesamturteil.** Die Gesprächsbeispiele sind die stärksten der drei Seiten: Die DEAR-Beispiele sind beobachtbar und ohne Vorwurf, die Paare «eher problematisch / eher hilfreich» klingen echt. Der Gewaltabschnitt ist klar, nicht dramatisierend und rechtlich genau; dort habe ich keine Sicherheits- oder Rechtsaussage verändert und keinen eigenen Gewaltsatz formuliert. Schwächen: ein Beispiel im Ton von Gesprächsskript und Bescheid (G2-015), die mehrdeutige Rollenbezeichnung «Erwachsenes Kind» (G2-020), Verweise, die als Anhängsel am Satz hängen (G2-019, G2-021; offen als R29-P06), ein «Er» ohne klaren Bezug im Schutzsatz zu Versorgung und Sicherheit (G2-018) und das Fachwort «Verstärken» in DEAR (G2-017).

**Kennzahlen:** 1951 Wörter, 170 Sätze, Mittel 11,5, Median 11, über 25 Wörter 2,4 %, bis 6 Wörter 21,2 %, Verneinung 31,2 %, «Sie müssen/sollten/dürfen» 7, «kann/können» 1,9 je 100 Wörter, Gedankenstriche 5, Doppelpunkte 41, «nicht … sondern» 0, längster Satz 37.

Deutung:
- *Verneinung (31 %, dritthöchster Wert der Website nach krise und kommunizieren)*: Das Thema ist «Nein sagen»; dazu kommen Entlastungsformeln («keine Strafe und kein Liebesentzug», «Konsequenz heisst nicht Härte», «Verlässlich sein heisst nicht, starr zu sein», «kein Ziel, das Sie erreichen müssen», «kein Verrat», «kein Beziehungsproblem») und die bewusst negativen Beispiele («So rede ich nicht mit dir.»). Die hilfreichen Beispiele sind meist positiv formuliert («Unter der Woche bin ich bis 21 Uhr erreichbar»). Zwei Entlastungssätze im Gewaltabschnitt sind nach B9 gewollt.
- *«Sie müssen/dürfen» (7, höchster Wert der Website)*: vier «Sie dürfen» als echte Erlaubnis (Grenze vor der Überlastung, Gespräch oder Kontakt beenden, Berührung ablehnen, an einer Grenze festhalten) und drei «Sie müssen … nicht/keine» als Entlastung. S hat «dürfen» schon von 7 auf 4 reduziert; nichts davon wirkt bevormundend, kein Befund.
- *Gedankenstriche (5)*: funktional («– nicht, was andere tun müssen»; «– ohne etwas anzukündigen»). Zweimal steht in hilfreichen Beispielen «Ich bin da – und ich …»; das ist ein wiederkehrendes Muster (Abschnitt 3), aber verständlich.
- *Längster Satz (37)*: der Listenpunkt zur Beistandschaft (G2-022); 35 Wörter hat der GSG-Punkt (Rechtstext, unverändert, verständlich gegliedert).
- *Kurze Sätze (21 %)*: Listenpunkte und kurze Beispielsätze; der frühere Stakkato-Abschnitt «Welche Grenzen zuerst?» ist seit S in ganzen Sätzen.
- *«Garantie/garantieren»* steht dreimal (Einleitung, Kurztext DEAR, Schritt R); G2-016 nimmt die mittlere Stelle heraus, ohne die Einschränkung zu verlieren.

### diagnose · Diagnose und Begleiterkrankungen

**Blöcke gelesen: 125 von 125** (Lesefassung), dazu 4 von 4 Attributtexten, Sprungliste (Label und 6 Einträge), die Stufenliste mit den Kästen «Ihre Rolle», Akkordeons, Platzhalter `data-responsibility-inline` (einmal, in «Suizidgedanken und Selbstverletzung»; Wortlaut nicht bewertet) und die Seitenbeschreibung.

**Gesamturteil.** Die Seite ist sachlich, gut gegliedert und für Quereinsteigende meist verständlich: Die fünf Schritte haben je einen Kasten «Ihre Rolle», Komorbidität, DSM-5-TR und ICD-11 sind erklärt. Den Abschnitt zu Suizidgedanken und Selbstverletzung habe ich vollständig gelesen; er ist klar und ruhig, ich schlage dort nichts vor. Der Ton liegt näher am Fachtext als auf den beiden anderen Seiten: Es bleiben Systembegriffe («Behandlungsrahmen», «Gesamtbild»), eine Lehrbuchfügung («Davon zu unterscheiden ist …») und im Depressionsteil ein Bezug auf Zeichen, die erst im zugeklappten Akkordeon stehen (G2-028). Kritisch ist nichts.

**Kennzahlen:** 1762 Wörter, 135 Sätze, Mittel 13,1, Median 12, über 25 Wörter 3,0 %, bis 6 Wörter 7,4 %, Verneinung 17,8 %, «Sie müssen/sollten/dürfen» 0, «kann/können» 1,8 je 100 Wörter, Gedankenstriche 0, Doppelpunkte 26, «nicht … sondern» 1, längster Satz 34.

Deutung:
- *Längere Sätze, wenig kurze (7 %)*: kaum Stakkato, dafür dichter Sachtext und Nominalstil an einzelnen Stellen (G2-025, G2-026, G2-027).
- *Verneinung (18 %)* ist niedrig; trotzdem stehen in den Schrittexten mehrere «X ist kein Y» («keine Verzögerungstaktik», «kein Nichtstun», «kein Etikett», «keine Festlegung für immer», «keine Selbstauskunft»).
- *«Sie müssen» (0)*: Der Ton ist informierend, nicht anweisend.
- *Längster Satz (34)* ist eine Quellenzeile (NICE CG78); im Text haben die längsten Sätze 27 Wörter (Zanarini-Satz, Differenzialdiagnostik).
- *Verweissätze*: 11 Sätze der Art «Wie …, steht auf der Seite «…» im Abschnitt «…»» bei 1664 Wörtern ohne Quellenblock. Die Seite wirkt dadurch stellenweise wie ein Wegweiser. Für den Quereinstieg ist das vertretbar; kein Einzelbefund (Struktur, A03-028).

Hinweis zur Zählweise: Die Quellenzeilen («… Verwendet in: …») zählen als Sätze. Sie erhöhen auf allen drei Seiten den längsten Satz und leicht die Verneinungsquote («nicht als Beleg»).

---

## 2. Musterstellen (unverändert lassen)

### rolle
- schuld §3: «Schuldgefühle sind bei Angehörigen häufig und verständlich. Ein Schuldgefühl allein entscheidet nicht, ob Sie etwas falsch gemacht haben.» – Nimmt das Gefühl ernst und trennt es genau von der Frage nach Schuld, ohne zu beschwichtigen.
- alltag §5: «Regelmässiger Kontakt und angekündigte Änderungen entlasten oft mehr als spontane, intensive Zuwendung. Zum Beispiel: «Ich rufe dich heute Abend nach dem Essen an. Wenn ich mich verspäte, sage ich Bescheid.»» – Konkreter Rat mit einem Satz, den man genau so sagen kann.
- nach-konflikten §3: «Nach einem Konflikt ist oft unklar: Soll ich nachgehen oder Abstand lassen? Hilft ein Gespräch, oder kommt es zu früh?» – Greift die echte innere Frage auf, ohne ein Gefühl zu unterstellen.

### grenzen
- erkennen §7: «Was liegt wirklich bei mir? «Dass ich dich angeschrien habe, tut mir leid. Meine Pause brauche ich trotzdem.»» – Eigener Fehler und eigene Grenze in zwei natürlichen Sätzen; zeigt, dass beides zusammengeht.
- dear §10 und §18: «In den letzten drei Nächten hast du mich nach 23 Uhr angerufen.» / «Bitte ruf mich für Alltagsfragen vor 21 Uhr an. Danach stelle ich mein Telefon stumm.» – Beobachtbar und ohne Vorwurf; Bitte und eigene Handlung sind klar getrennt.
- gewalt §3: «Gewalt, ob körperlich, durch Drohungen, Kontrolle oder Stalking, ist kein Beziehungsproblem, sondern eine Sicherheitsfrage. Sie lässt sich nicht aus einer Borderline-Diagnose ableiten und wird dadurch nicht entschuldigt.» – Eindeutig, nicht stigmatisierend in beide Richtungen und ohne Dramatisierung.

### diagnose
- ohne-diagnose §3: «Vielleicht erkennen Sie Verhaltensweisen oder Erfahrungen aus den Beschreibungen auf dieser Website wieder. Das kann ein Anlass sein, Beobachtungen zu benennen und Beratung zu suchen. Für eine Diagnose der anderen Person reicht das aber nicht.» – Respektvoll und handlungsnah, mit klarer Grenze gegen Laiendiagnosen.
- begleiterkrankungen §3: «Komorbidität ist der medizinische Begriff für Begleiterkrankungen. Er bedeutet, dass eine Person gleichzeitig oder im Verlauf mehrere Erkrankungen hat.» – Fachbegriff in einem Satz erklärt, ohne Lehrbuchton.
- zweifel §3, letzter Satz: «Auch eine fachlich gestellte Diagnose darf hinterfragt werden, zum Beispiel mit einer zweiten fachlichen Einschätzung.» – Respektiert die Sicht der betroffenen Person, ohne die Fachlichkeit abzuwerten.

---

## 3. Seitenübergreifende Muster

1. **«Was Sie tun können:»** als fettes Leitwort (rolle 5, grenzen 4, diagnose 1; Website 40). Als wiederkehrendes Gestaltungsmittel trägt es. Oft folgt aber ein zweiter Doppelpunkt («Was Sie tun können: Fragen Sie sich: …», rolle schuld §6, grenzen erkennen §4, kontakt §9, konsequenz §4) oder eine Kette von Aufforderungen (rolle anbieten §26, G2-003). Empfehlung für künftige Texte: nach dem Leitwort ein ganzer Satz, höchstens ein weiterer Doppelpunkt.
2. **Entlastung als Verneinung «X ist kein Y» / «X heisst nicht Y»**: rolle 3, grenzen 6 (darunter die Überschrift «Konsequenz heisst nicht Härte» und «Verlässlich sein heisst nicht, starr zu sein» im selben Abschnitt), diagnose 5. Jede Stelle ist für sich vertretbar, zwei sind nach B9 gewollt. Zusammen ergeben sie das Muster «nicht X, sondern Y» in Serie. Ich habe keine einzelne Stelle gestrichen, weil jede eine Nuance trägt; bei künftigen Ergänzungen keine weiteren hinzufügen.
3. **Pausensatz «Ob und wann wir weiterreden, entscheide ich / entscheiden wir später.»** (W2-010, von S vereinheitlicht): rolle 1, grenzen 2 (dazu die Variante «Ob und wann ich weiterreden möchte …»). «… entscheide ich später.» steht wörtlich auch auf kommunizieren, kurz und begriffe, «… entscheiden wir später.» auch auf verstehen. Er ist entschieden und nicht Gegenstand eines Befunds. Gelesen über mehrere Seiten wirkt er aber wie eine Formel; bei der nächsten Sprachrunde prüfen, ob auf grenzen eine der beiden Stellen anders enden kann.
4. **«Ich höre, dass du … bist»** als Gesprächsformel: grenzen arten §7 (G2-015) und zweimal auf kommunizieren («Ich höre, dass es dir schlecht geht.», «Ich höre, dass du enttäuscht bist.»). Für die Gruppe mit kommunizieren zum Abgleich.
5. **«Ich bin da – und ich …»** in hilfreichen Beispielen: grenzen zweimal, beziehungen einmal. Verständlich, aber als Bauform erkennbar.
6. **Nominaler Verweis auf die Kinder-Seite** «Erklärung, Betreuungsplan (, Eskalationen) und Unterstützung …»: rolle kinder §4 (als ganzer Linktext), grenzen gewalt §13 (G2-023) und krise (andere Gruppe; S hat dort dieselbe Verbesserung vorgemerkt). Einheitlich mit Verben fassen; für rolle habe ich keinen eigenen Befund eröffnet, weil ein eigenständiger Linktext als nominale Zielbeschreibung üblich ist.
7. **Seitenbeschreibungen als Inhaltsverzeichnis** mit Bruchstücken («mehrere Angehörige, Kinder», «DEAR in vier Schritten», «mit Ihrer Rolle»). Die Beschreibung erscheint als Auszug in der Website-Suche (`search-index.mjs`, `excerpt`). Das Muster gilt für die ganze Website; G2-013, G2-024 und G2-030 behalten die Reihung und beheben nur die Bruchstücke.
8. **«Sie» nach Doppelpunkt mit «Angehörige» als Subjekt** (rolle an-grenzen §3, G2-011): Das von S unter 1.6 beschriebene Muster («Sie» liest sich als Anrede) gibt es also auch hier noch.

---

## 4. Prüfbedarf

### Fachlich
1. **rolle › anbieten › §16** «Absprachen treffen und einhalten oder gemeinsam üben, …»: Was geübt werden soll, steht nicht da (früher: «gemeinsam üben, wenn das gewünscht und vereinbart ist»). Ohne fachliche Klärung (zum Beispiel Fertigkeiten aus der Therapie?) keine Ersatzfassung, darum kein Befund.
2. **rolle › anbieten › §11** Bildnachweis «nach dem früheren Handout «Der Garten»»: Lesende kennen das Handout nicht, und seit A03-037 gibt es keine Gartenmetapher mehr. Der Vermerk ist aus Sicht der Institution geschrieben. Ob die Herkunft so sichtbar bleiben muss, entscheidet die Fachstelle (Quellenbezug, nicht geändert).
3. **grenzen › kontakt › §4 bis §7** nennt «eine Trennung» als Möglichkeit ohne den Hinweis, dass bei Gewalt eine Trennung mit einer Fachstelle geplant werden soll (steht in grenzen › gewalt › §8). Prüfen, ob ein Verweis nötig ist (Modul 02).
4. **diagnose › begleiterkrankungen › §4** «In Studien mit Menschen, die stationär behandelt wurden, …»: Plural, der Quellenblock nennt für die Aussage nur Zanarini et al. (1998). Prüfen, ob der Plural gedeckt ist.
5. **diagnose › begleiterkrankungen › §29 bis §35** (Akkordeon «Mögliche Hinweise auf eine depressive Phase»): Der Punkt «Suizidgedanken oder entsprechende Aussagen» steht zugeklappt und ohne Verweis auf das Vorgehen (sichtbar in Abschnitt 05). Prüfen, ob ein Verweis auf `#suizidalitaet` dazugehört (Profilregel «Sicherheit … bleibt direkt sichtbar»; Modul 02/05). Keine eigene Ersatzfassung, da Struktur und Sicherheit.
6. **G2-017** Schritt R von DEAR: «Bestärken» gegen die verwendete deutsche DBT-Fassung prüfen.
7. **G2-025** Umschreibung von «Behandlungsrahmen» bestätigen.

### Recht
8. **G2-022** «erledigen» statt «besorgen» (Art. 390 Abs. 1 ZGB) bei der Beistandschaft; Bedingungen und Entscheid der KESB unverändert.

### Bekannt und nicht neu geöffnet
- B12 (Krisenplan im Beispiel «Häufige Anrufe spät abends»), B11 und S-Prüfbedarf 6 (Geschwister «ohne Aufgaben der Eltern»), S-Prüfbedarf 3 (Entscheidungen Minderjähriger, durch F4 gelöst).
- E7: Auf rolle steht nach «Holen Sie Hilfe und schützen Sie sich» (an-grenzen §10) kein Verweis im Text. Das entspricht E7 (rolle gehört nicht zu den sieben Seiten); der nächste Schritt ist über den Link auf grenzen › gewalt erreichbar. Kein Befund.

---

## 5. Erwogen und verworfen (Selbstprüfung)

Diese Stellen habe ich geprüft und bewusst nicht aufgenommen, weil eine Ersatzfassung nicht klar besser wäre:
- rolle anbieten §17 «Ich wünsche dir, dass es besser wird.» (natürlich; «Zuversicht» als Etikett passt nicht ganz, eine Änderung wäre aber Geschmack).
- rolle alltag §15 «… und wann schauen wir die Aufteilung wieder an?» (gesprochen noch vertretbar).
- rolle mehrere §7 «Ausnahmen verschweigen oder gegeneinander verwenden» (Bezug auf Absprachen ergibt sich aus dem Punkt davor).
- grenzen bruecke §6 «Ich bin da – und ich brauche einen ruhigen Ton.» (verständlich; Muster siehe Abschnitt 3).
- grenzen konsequenz §6 «Verlässlich sein heisst nicht, starr zu sein.» (Streichen würde die Gegenbewegung zu «festhalten» verlieren).
- grenzen gewalt §8 «Opferhilfe und Beratung beiziehen: Opferhilfe Schweiz.» (als Label und Link sichtbar klar; im Sicherheitsabschnitt nichts ohne Not ändern).
- diagnose bedeutung §3 «weder Voraussetzung für jede Hilfe noch …» (die verbale Fassung bringt zwei Verneinungen mehr).
- diagnose bedeutung §7 «Die Beziehung zu klären, bleibt eigene Arbeit, …» (Alternativen wie «Sache der Beteiligten» sind amtlicher).
- diagnose ohne-diagnose «Bin ich auch betroffen?» («betroffen» ist mehrdeutig, die Mehrdeutigkeit kann gewollt sein).

---

## 6. Nicht geprüft

- **Gerenderte Seiten** (Umbruch, Akkordeons, Abbildungen bei 360 px und 200 %): nur Quelltext und Lesefassung gelesen. Befunde mit Text in Abbildungen (G2-002 in v-ro-weg, G2-016 und G2-017 in v-gr-dear) brauchen einen Visualisierungs-Check; das steht im Akzeptanzkriterium.
- **Suche**: Die vorgeschlagenen Seitenbeschreibungen ändern die Suchwörter der Seitentreffer. Den Suchtest habe ich nicht ausgeführt (kein Build ins Repository).
- **Screenreader, Nutzendentest**: nicht verfügbar; Wirkungsaussagen sind als «heuristisch» gekennzeichnet.
- **Fachliche und rechtliche Richtigkeit**: nicht Gegenstand von Modul 03; nur als Prüfbedarf vermerkt.
- **Zuständigkeitsverweis** (`responsibility`, `responsibility.inline`): entschiedener Wortlaut, nicht bewertet.
- **Andere Seiten**: nur für seitenübergreifende Muster stichprobenartig gelesen (kommunizieren, kinder, krise, beziehungen, begriffe).
