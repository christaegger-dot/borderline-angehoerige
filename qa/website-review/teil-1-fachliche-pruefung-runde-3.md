# Review Website Teil 1: Fachliche Prüfung Seite für Seite – Runde 3

Prüfstand: `main` @ `36e4aae6` (06.10.2026). Geprüft wurden die
Materialbibliothek und die Textversionen der Themen «Verstehen», «Unterstützen»
und «Kommunizieren». Dieses Dokument ist ein KI-gestütztes redaktionelles
Review. Es ist weder eine fachliche, rechtliche noch institutionelle Freigabe.
In dieser Runde wurden keine Produktionsinhalte geändert.

## 1. Umfang und Grenzen

### Vollständig gelesen

- `/materialien`, einschliesslich Filter, Kartenstatus, Handlungslinks und
  verwandter Links
- Materialregister, Textversionsregister, Governance-Status und Suchindex
- sieben Textversionen «Verstehen»
- sechs Textversionen «Unterstützen»
- acht Textversionen «Kommunizieren»

Damit wurden in Runde 3 insgesamt 21 der 42 Textversionen inhaltlich geprüft.
Die übrigen 21 Textversionen folgen in Runde 4.

### In dieser Runde nicht abschliessend geprüft

- PDF-, WebP- und Thumbnail-Parität; dies ist Bestandteil von Runde 4
- visuelle Prüfung aller Fassungen in den definierten Viewports
- PDF-UA-/Matterhorn-Konformität und reale Ausdrucke
- reale Screenreader- und Nutzendentests
- Krisenwege und direkte Kontaktdaten; sie hängen vom Entscheid in Issue #631,
  Draft-PR #642 und dem Umsetzungs-Issue #641 ab
- fachlich-rechtliche Freigabe der Schweizer Aussagen zu Einwilligung,
  Vertraulichkeit, Vertretung und Minderjährigkeit

## 2. Gesamturteil

Die neueren Textversionen sind deutlich autonomieorientierter,
nicht-stigmatisierender und transparenter als mehrere ältere Blätter. Besonders
stark sind `leuchtturm`, `zustands-landkarte`, `gehirn`, `drei-saeulen`,
`beziehungs-achtsamkeit`, `4-alltags-tipps`, `wenn-worte-treffen`,
`gespraeche-kippen` und `beispiel-dialog`.

Als Gesamtstrecke ist die Sammlung jedoch noch kein klar kuratierter Lernweg.
Vier Probleme wiegen besonders schwer:

1. Die Bibliothek bezeichnet fachlich ungeprüfte Entwürfe als «aktuell» und
   mischt Inhalts-, Asset- und Freigabestatus.
2. Einige eigene didaktische Modelle wirken durch ungenaue Quellenzeilen wie
   validierte oder formale DBT-Methoden.
3. Die Kommunikationssammlung zeigt die erkrankte Person kumulativ fast nur in
   konflikt-, drohungs- oder suizidbezogenen Situationen. Gute Caveats in den
   Einzelblättern gleichen dieses Gesamtbild nicht vollständig aus.
4. Viele Materialien erklären denselben Zusammenhang mit konkurrierenden
   Metaphern, ohne Funktion, Reihenfolge oder Übergang zu klären.

## 3. Stärken

- Die meisten neueren Texte unterscheiden Beobachtung, Vermutung und Diagnose
  sorgfältig.
- Unterstützung wird überwiegend als freiwilliges Angebot beschrieben. Die
  erkrankte Person behält Entscheidungsmacht; Angehörige erhalten keine Pflicht,
  Behandlung, Genesung oder emotionale Regulation zu übernehmen.
- Grenzen, Pause und Gesprächsende werden als legitime Möglichkeiten benannt.
- `gehirn` warnt ausdrücklich vor dem Missverständnis eines einheitlichen
  «Borderline-Gehirns».
- `kinder` entlastet Kinder klar von Schuld, Behandlungskontrolle und der Aufgabe,
  die Familie zusammenzuhalten.
- Die Bibliothek hält viele veraltete Druckgrafiken technisch zurück und bietet
  stattdessen Textversionen an.
- `gespraeche-kippen` und `beispiel-dialog` vermeiden Rückkehrversprechen und
  Wirkungsgarantien bereits weitgehend.

## 4. P1 – wesentliche Befunde

### R3-P1-01 – Entwürfe werden als «aktuell» empfohlen

- **Stelle:** `/materialien`; `MaterialienLibrarySection.tsx`, Kartenhinweise und
  Materialstand; `handoutGovernance.ts`
- **Beobachtung:** Auch bei `approvalStatus: draft-editorial-review-pending`
  erscheint «Nutzen Sie bis dahin die aktuelle Textversion» beziehungsweise
  «Materialstand: Textversion aktuell».
- **Problem und Wirkung:** Eine fachlich-redaktionell ungeprüfte Fassung wirkt
  wie die verlässliche, freigegebene Empfehlung. Das widerspricht dem sichtbaren
  Entwurfsstatus auf der Textseite.
- **Empfehlung:** Kartenstatus aus dem Governance-Status ableiten. Mindestens
  getrennt ausweisen: redaktioneller Stand, Quellenabgleich, verantwortete
  Fachfreigabe, Publikationsfreigabe und Visual-/PDF-Status. «Aktuell» darf
  keine Freigabe implizieren.
- **Prüfbedarf:** interner Governance-Entscheid; kein externer Faktencheck nötig.

### R3-P1-02 – `kinder` ist gleichzeitig «approved» und fachlich ungeprüft

- **Stelle:** `handoutGovernance.ts`, Defaultstatus im Register;
  `revisedHandouts.json`; Textseite und sichtbare PDF-/Download-Links
- **Beobachtung:** Der fehlende explizite `approvalStatus` führt technisch zu
  «approved». Die Textversion nennt gleichzeitig «Erneute fachliche Prüfung
  ausstehend».
- **Problem und Wirkung:** Freigabelogik und Leserhinweis widersprechen sich;
  PDF und Download erscheinen freigegeben, obwohl der Inhalt dies nicht ist.
- **Empfehlung:** Entweder explizit als redaktionellen Entwurf führen und die
  visuellen Assets bis zur Freigabe zurückhalten oder das Statusmodell so
  aufteilen, dass technische Assetfreigabe nie als fachliche Freigabe gelesen
  werden kann.
- **Prüfbedarf:** Kinder-/Jugendfachperson sowie institutioneller Entscheid.

### R3-P1-03 – Der Begriff «Krisenplan» ist rechtlich und konzeptionell mehrdeutig

- **Stelle:** Textversion `zustands-landkarte`, Aussage «Angehörige werden nur
  mit Zustimmung … in einen Krisenplan einbezogen»
- **Beobachtung:** Die Aussage lässt offen, ob mit «Krisenplan» ein klinischer
  Behandlungsplan, das Mitteilen eigener Beobachtungen oder ein eigener
  Sicherheits- beziehungsweise Betreuungsplan von Angehörigen gemeint ist.
- **Problem und Wirkung:** Der Satz kann als absolute Rechtsregel gelesen werden
  und Angehörige davon abhalten, eigene Beobachtungen mitzuteilen oder ihre
  eigene Vorsorge zu planen. Nach BAG gilt die Vertraulichkeit auch bei
  Minderjährigen situations- und urteilsfähigkeitsbezogen; Ausnahmen dürfen
  nicht pauschal formuliert werden.
- **Empfehlung:** Die drei Ebenen klar trennen. Keine eigenen Rechtsausnahmen
  formulieren; Schweizer Wortlaut fachlich-rechtlich freigeben.
- **Quellenbedarf:** BAG Berufs-/Arztgeheimnis; NICE CG78 als fachliche, nicht
  schweizerisch-rechtliche Orientierung.

### R3-P1-04 – Kumulatives Konflikt- und Gefahrenskript in «Kommunizieren»

- **Stelle:** besonders `wenn-worte-treffen`, `gespraeche-kippen`,
  `grenzen-ohne-eskalation`, `pause-statt-streit` und `beispiel-dialog`
- **Beobachtung:** Die Beispiele zeigen fast ausschliesslich Vorwürfe,
  Anschreien, Beschimpfungen, Drohungen, Gewalt oder suizidbezogene Aussagen der
  anderen Person. Angehörige erscheinen wiederholt als ruhige, begrenzende und
  sichernde Seite.
- **Problem und Wirkung:** Als Gesamtpaket kann dies Menschen mit
  Borderline-Erfahrung als konflikthaft, gefährlich oder zu steuernd darstellen
  und Angehörige in eine dauernde Regulationsrolle setzen. Die Wirkung entsteht
  kumulativ, auch wenn einzelne Blätter gute Einschränkungen enthalten.
- **Empfehlung:** Gewalt nicht relativieren, aber Wiederholungen reduzieren;
  neutrale Beispiele für beidseitiges Missverstehen oder Überforderung ergänzen;
  klarstellen, dass alle Beteiligten verletzend reagieren und für eigenes
  Verhalten Verantwortung übernehmen können. Sicherheitsinhalte konsequent
  situationsbezogen und diagnoseunabhängig halten.
- **Prüfbedarf:** unabhängige Gesamtstrecken-Prüfung durch eine Person mit eigener
  Borderline-Erfahrung und eine angehörige Person.

### R3-P1-05 – Historische Praxisquelle wird als fachliche Hauptquelle verwendet

- **Stelle:** `krisenkommunikation`, `gespraeche-kippen`,
  `grenzen-ohne-eskalation`, `pause-statt-streit`,
  `zuhoeren-ohne-zustimmen`, `beispiel-dialog` und `rolle-klaeren`
- **Beobachtung:** Mason/Kreger wird mehrfach als Quelle für Kommunikation,
  Deeskalation und krisennahe Handlungshinweise genannt. Die eigene
  Quellen-Seite ordnet das Werk dagegen als historisch einflussreichen Ratgeber,
  nicht als wissenschaftliche Studie ein.
- **Problem und Wirkung:** Praxisempfehlungen erscheinen evidenzbasierter und
  aktueller, als die Quellenlage trägt. Zudem ist die Ausgabeangabe unklar:
  englische dritte Auflage und deutsche Ausgabe werden nicht sauber getrennt.
- **Empfehlung:** Höchstens als kritisch eingeordnete Praxis- oder
  Inspirationsquelle nennen. Eigene Strukturen als «eigene didaktische
  Darstellung» kennzeichnen. Fachliche Grundsätze mit aussagengenauen aktuellen
  Quellen absichern.
- **Quellenbedarf:** NICE CG78, NICE NG150, NICE NG225, Linehan beziehungsweise
  eine transparent gekennzeichnete Family-Connections-Übertragung.

### R3-P1-06 – `krisenkommunikation` verlangt implizit eine Reihenfolge

- **Stelle:** Textversion `krisenkommunikation`
- **Beobachtung:** «Verbindung, kurze Orientierung und eine klare Grenze helfen
  oft mehr» sowie «zuerst Verbindung herstellen, dann Kontakt halten, dann
  Grenze».
- **Problem und Wirkung:** Angehörige können daraus ableiten, dass sie vor einer
  Grenze emotional verbinden und Kontakt halten müssen. «Ich bin hier» kann als
  Verfügbarkeitsversprechen wirken. Dies widerspricht neueren Blättern, die
  Auslassen, Pause und Gesprächsende erlauben.
- **Empfehlung:** Unabhängig wählbare Möglichkeiten statt Pflichtfolge;
  Wirkungsvorteil streichen; «Ich bin hier» nur als optionalen, ehrlich passenden
  Satz. Den Begriff «Krise» nicht gleichzeitig für Streit und psychiatrischen
  Notfall verwenden.
- **Quellenbedarf:** Für die konkrete Reihenfolge und Wirkung liegt kein
  ausreichender Beleg vor.

### R3-P1-07 – Eigene Drei-Stufen-Logik wird als «Deeskalation nach DBT» ausgegeben

- **Stelle:** Textversion `pause-statt-streit`, Modell «Stabil – Warnstufe –
  Eskalation», Quellenzeile «Deeskalation nach DBT, Linehan 1993»
- **Problem und Wirkung:** Die redaktionelle Synthese erhält die Autorität einer
  formalen DBT-Methode. Sie könnte als validiertes Erkennungs- oder
  Steuerungsmodell verwendet werden.
- **Empfehlung:** Als eigene didaktische Orientierung kennzeichnen: kein Test,
  keine Risikoeinschätzung und keine allgemeingültige Eskalationsfolge. Den
  DBT-Anspruch entfernen, sofern keine genaue Primärstelle nachgewiesen wird.
- **Prüfbedarf:** verantwortete fachliche Prüfung.

### R3-P1-08 – Materialbibliothek ist für eine nicht-akute Seite Krise-zuerst gerahmt

- **Stelle:** SEO-Text «Notfallhilfen», Kategorie «Soforthilfe» an erster Stelle,
  zwei Krisenmaterialien zu Beginn; Abschnitt «Verwandt» ausschliesslich mit
  Soforthilfe, Wegweiser und Notfallkarte
- **Problem und Wirkung:** Die allgemeine Psychoedukationsbibliothek wird als
  Kriseneinstieg gelesen; Themenweg, Beratung und der nächste Lernschritt werden
  verdrängt.
- **Empfehlung nach dem Governance-Entscheid:** Auf dieser Seite das
  `persistent-subdued`-Muster anwenden, genau einen ruhigen Krisenweg anbieten
  und «Verwandt» durch Themenweg, Fachstelle/Beratung und «Inhalte finden»
  ersetzen.
- **Abhängigkeit:** Issue #631, Draft-PR #642 und Umsetzungs-Issue #641. Kein
  isolierter Umbau vor deren Entscheid.

## 5. P2 – wichtige Befunde

### R3-P2-01 – «Alle Materialien» ist sachlich nicht vollständig

- Die Bibliothek bildet nur eine Auswahl ab. Öffentlich verlinkte Textversionen
  wie `zustands-landkarte` und `gehirn` fehlen; insgesamt existieren 42
  Textversionen.
- **Empfehlung:** Entweder alle veröffentlichten Textversionen in ein kanonisches
  Register aufnehmen oder ehrlich «Ausgewählte Materialien» schreiben und die
  Auswahlkriterien erklären.

### R3-P2-02 – Es fehlt ein Erkenntnisweg für belastete Leserinnen und Leser

- Filter und Raster stellen zahlreiche Karten gleichrangig nebeneinander; die
  vorhandenen Felder `quickStarts` und `priority` werden dafür nicht sichtbar
  genutzt.
- **Empfehlung:** Vor dem vollständigen Raster ein kurzer aufgabenbezogener Weg:
  verstehen → Alltag → Gespräch/Grenzen → eigene Entlastung → Genesung. Pro Karte
  knapp «Hilft, wenn …» oder «Danach …» ergänzen.

### R3-P2-03 – Formatversprechen passt nicht zum Bestand

- «Zum Lesen, Ausdrucken und Mitnehmen» und «zu jedem Material … Textfassung und
  Druckfassung» stehen vielen bewusst zurückgehaltenen Visuals und PDFs
  gegenüber.
- **Empfehlung:** «Lesbare Webfassungen; aktuelle Druckfassungen, wenn
  freigegeben» sowie eine verständliche Statuslegende.

### R3-P2-04 – Statusdaten vermischen verschiedene Aussagen

- `verifiedAt` enthält wahlweise Erstellmonat, Textstand, Druckstand,
  Prüfhinweis oder «laut Textfassung» und erscheint immer als «Materialstand».
- **Empfehlung:** separate, semantisch eindeutige Felder und Labels; nie aus
  einem Datum eine Freigabe ableiten.

### R3-P2-05 – Eisberg bleibt trotz Caveats einseitig

- Sichtbar sind nur Wut, Vorwürfe und Lautwerden; «darunter» stehen Angst,
  Scham, Trauer, Einsamkeit und Stress.
- **Wirkung:** Das stereotype Bild «aussen aggressiv, innen verletzlich» bleibt
  bestehen und lädt zum Deuten verborgener Gefühle ein.
- **Empfehlung:** sichtbare Beispiele diversifizieren, etwa Rückzug, Schweigen,
  Selbstabwertung oder Kontaktwunsch; «erhöhen/senken» durch «können
  beeinflussen/entlasten» ersetzen.

### R3-P2-06 – Pendel-Metapher ist ungenau belegt

- Linehan und Hoffman werden als Grundlage des Stress-Pendels genannt. Hoffman
  evaluiert Family Connections, nicht dieses Modell; empirische Befunde zu
  dichotomem Denken und stressbedingter Bewertung sind differenzierter und
  nicht eindeutig BPD-spezifisch.
- **Empfehlung:** Eigene, transdiagnostische Metapher kennzeichnen; direkte
  empirische Quelle mit Limitationen zuordnen oder den BPD-spezifischen Anspruch
  entfernen.

### R3-P2-07 – Alarm-/Denk-Modus überzeichnet eine Zweiteilung

- «Impulse steuern wird schwerer» und «erst dann trägt ein Gespräch» können wie
  ein beobachtbarer Schalter oder fehlendes Denken der betroffenen Person wirken.
- **Empfehlung:** Kontinuum und allgemeinmenschliche Stressreaktion ausdrücklich
  nennen; Impulskontroll-Aussage qualifizieren; Gespräche als eher möglich
  beschreiben, wenn beide möchten.

### R3-P2-08 – Mehrere konkurrierende Stressmodelle haben keine Rollenklärung

- `spaltung`, `zustands-landkarte`, `alarm-modus`, `gehirn` und zusätzlich
  `anspannungskurve` erklären überlappend, dass hohe Anspannung den
  Handlungsspielraum verengen kann.
- **Empfehlung:** Funktionen trennen oder konsolidieren: Gehirn = begrenzte
  Erklärung; Landkarte = freiwillige Momentaufnahme; Alarm/Anspannung =
  Gesprächsentscheidung; Pendel = soziale Bewertung. Empfohlene Reihenfolge und
  Querlinks ergänzen.

### R3-P2-09 – Kinder-Metadaten versprechen Borderline-spezifischen Inhalt

- Katalog und Suchindex versprechen eine altersgerechte Erklärung von
  Borderline; Text und Pro-Juventute-Quelle behandeln psychische Erkrankung eines
  Elternteils allgemein.
- **Empfehlung:** Metadaten diagnoseoffen formulieren oder
  Borderline-spezifische Ergänzungen getrennt und belegt ausarbeiten.

### R3-P2-10 – Kinder-Quellen sind nicht nachvollziehbar im Quellenkatalog

- Pro Juventute und die PUK-Grundlage stehen in der Quellenzeile, aber nicht als
  vollständige, direkt auffindbare Einträge im zentralen Quellenkatalog.
- **Empfehlung:** vollständige offizielle Einträge und direkte Anker ergänzen;
  Prüfung durch Kinder-/Jugendfachperson und Menschen mit eigener Eltern-/Kind-
  Perspektive.

### R3-P2-11 – Leuchtturm ist im Themenpfad falsch gewichtet

- Die Metapher ist primär Rollen- und Selbstorientierung, steht jedoch zuerst in
  «Verstehen». In den Daten ist sie zusätzlich als `featured` markiert, ohne
  dass dieses Feld derzeit eine sichtbare Sonderdarstellung erzeugt. Eine
  Recovery-Aussage zu Behandlung, Beziehungen sowie materiellen und
  gesellschaftlichen Bedingungen hat keinen zugeordneten Beleg.
- **Empfehlung:** Nach den Grundlagen platzieren oder zu
  Unterstützen/Selbstfürsorge querklassifizieren; Recovery-Aussage belegen oder
  enger redaktionell formulieren.

### R3-P2-12 – «Anspannungskurve» deutet Zeichen und Wirkung zu eindeutig

- «Leere» ist kein beobachtbares Verhalten; Schweigen, Wegsehen oder Erstarren
  können verschiedene Ursachen haben. «Pausen senken Anspannung» ist eine
  Wirkungsgarantie.
- **Empfehlung:** «können mit Rückzug oder Überforderung zusammenhängen» und
  «eine Pause kann Druck verringern»; beide Gesprächsseiten nennen; Modell als
  eigene vereinfachte Orientierung kennzeichnen.

### R3-P2-13 – Erfolgsversprechen im Titel `grenzen-ohne-eskalation`

- Der Titel legt nahe, die Drei-Teile-Formel könne Eskalation verhindern.
- **Wirkung:** Angehörige könnten sich bei einer Eskalation für die falsche
  Formulierung verantwortlich fühlen; die andere Person erscheint steuerbar.
- **Empfehlung:** «Grenzen kurz und klar benennen» oder «Eine mögliche
  Drei-Teile-Formel»; ausdrücklich keine Reaktionsgarantie.

### R3-P2-14 – Alltagsspannung, Eskalation und Notfall werden sprachlich vermischt

- Begriffe wie «angespannter Moment», «Alarm», «Warnstufe», «Eskalation»,
  «Krise» und «unmittelbare Gefahr» werden nicht konsistent abgegrenzt.
- **Empfehlung:** Einmal zentral unterscheiden: angespanntes Gespräch;
  Gesprächsende/Abstand; konkrete Bedrohung oder Gewalt; vermutete akute
  Selbstgefährdung oder medizinischer Notfall.
- **Abhängigkeit:** Hilfewege und direkte Nummern mit #631/#641 abstimmen.

### R3-P2-15 – Kommunikation bleibt überwiegend Angehörigenarbeit

- Fast alle Handlungen richten sich an Angehörige; die andere Person erscheint
  vorwiegend als Empfängerin oder Auslöserin.
- **Empfehlung:** In der Kategorie-Einleitung klarstellen: Die Werkzeuge betreffen
  nur die eigene Gesprächsseite; beide Seiten dürfen pausieren, Grenzen setzen
  und Kontakt ablehnen; Absprachen brauchen Zustimmung; jede Person bleibt für
  eigenes verletzendes Verhalten verantwortlich.

### R3-P2-16 – `zuhoeren-ohne-zustimmen` moralisiert eine Formulierung

- «Das ist keine Lüge, sondern Respekt» macht eine bestimmte Validierungsform
  zur moralisch richtigen Reaktion.
- **Empfehlung:** «Das kann respektvoll sein, wenn der Satz für Sie ehrlich
  passt.» Validierung als Möglichkeit, nicht als Pflicht.

### R3-P2-17 – «Kontrolle» wird missverständlich der Fachrolle zugeordnet

- `rolle-klaeren`: «Sie müssen Behandlung, Krisenhilfe oder Kontrolle nicht
  übernehmen.»
- **Wirkung:** Der Satz kann so gelesen werden, als sei Kontrolle eine legitime
  professionelle Aufgabe.
- **Empfehlung:** «Diagnostik, Behandlung, Krisenintervention und Beratung gehören
  in professionelle Hände. Sie müssen eine andere Person weder überwachen noch
  zu einer Behandlung zwingen.»

### R3-P2-18 – Persönliche Grenze und gemeinsame Vereinbarung werden vermischt

- `konsistenz-prinzip` verwendet «gemeinsame Grenze».
- **Empfehlung:** «Gemeinsame Absprachen» oder «Grenzen transparent benennen»;
  persönliche Grenze und gemeinsame Vereinbarung klar trennen.

### R3-P2-19 – «Sechs Leitlinien» suggeriert einen formalen Standard

- Eine eigene Auswahl aus APA/NICE heisst sichtbar «Die 6 Leitlinien», obwohl
  der Katalog bereits treffender «Sechs Orientierungspunkte» verwendet.
- **Empfehlung:** Sichtbaren Titel angleichen und als eigene redaktionelle
  Synthese kennzeichnen.

### R3-P2-20 – Doppelspurigkeit ohne Lernreihenfolge

- **Unterstützen:** `rolle-klaeren`, `drei-saeulen`, `6-leitlinien` und
  `4-alltags-tipps` wiederholen Freiwilligkeit, Grenzen, gewünschte Hilfe und
  professionelle Unterstützung.
- **Kommunizieren:** `krisenkommunikation`, `gespraeche-kippen`,
  `grenzen-ohne-eskalation`, `pause-statt-streit` und `beispiel-dialog`
  wiederholen kurze Sätze, Pause und Gesprächsende.
- **Empfehlung Unterstützen:** `rolle-klaeren` als Grundlage;
  `konsistenz-prinzip` für Absprachen; eine zusammengeführte kurze
  Selbstklärungs-/Alltagsfrage; `beziehungs-achtsamkeit` als optionale Übung.
- **Empfehlung Kommunizieren:** Gesprächsfähigkeit prüfen → Zuhören ohne
  Zustimmen → Wenn Gespräche kippen → Beispieldialog. Alte Spickzettel und
  Formeln zusammenführen oder als abgeleitete Kurzfassungen kennzeichnen.

### R3-P2-21 – Freigabe- und Quellenstatus ist inkonsistent

- Ältere Blätter zeigen nur «Stand» und wirken abgeschlossen; neuere nennen
  «Entwurf – fachlich-redaktionelle Freigabe ausstehend». Gerade ältere Blätter
  haben teilweise schwächere oder unpräzisere Quellen.
- **Empfehlung:** Einheitlicher maschinenlesbarer und sichtbarer Status aus dem
  Governance-Register. Ein Datum ist kein Freigabesignal.

### Quellen-, Prüf- und Governance-Bedarf der P2-Befunde

| Befund   | Noch erforderlich                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------- |
| R3-P2-01 | interner Informationsarchitektur- und Publikationsentscheid                                        |
| R3-P2-02 | Nutzbarkeitstest mit belasteten Angehörigen; anschliessend Informationsarchitektur-Entscheid       |
| R3-P2-03 | interner Abgleich von sichtbarem Versprechen und tatsächlichem Assetstatus                         |
| R3-P2-04 | Governance-Entscheid zum Statusmodell; kein externer Faktencheck                                   |
| R3-P2-05 | unabhängige Perspektivenprüfung durch Betroffene und Angehörige                                    |
| R3-P2-06 | aussagengenaue Prüfung der empirischen Primärquellen; anschliessend Perspektivenprüfung            |
| R3-P2-07 | fachliche Prüfung der Modellvereinfachung und Quellenreichweite                                    |
| R3-P2-08 | redaktioneller Architekturentscheid; Quellen der verbleibenden Modelle einzeln prüfen              |
| R3-P2-09 | fachlich-redaktioneller Entscheid: diagnoseoffen oder Borderline-spezifisch                        |
| R3-P2-10 | Kinder-/Jugendfachperson, Eltern-/Kind-Perspektive und offizielle PUK-Quelle                       |
| R3-P2-11 | Quellenbeleg für die Recovery-Aussage und Informationsarchitektur-Entscheid                        |
| R3-P2-12 | fachliche Prüfung des Modells und Perspektivenprüfung beider Gesprächsseiten                       |
| R3-P2-13 | redaktionelle und angehörigenbezogene Perspektivenprüfung; keine Wirksamkeitsbehauptung ohne Beleg |
| R3-P2-14 | abhängig von #631/#641; fachliche Trennung der vier Zustände                                       |
| R3-P2-15 | unabhängige Prüfung durch Betroffene und Angehörige                                                |
| R3-P2-16 | Perspektivenprüfung auf Authentizität, Druck und moralische Wirkung                                |
| R3-P2-17 | fachlich-redaktionelle Prüfung; Krisenverweis abhängig von #631/#641                               |
| R3-P2-18 | redaktionelle Begriffsklärung; kein externer Faktencheck                                           |
| R3-P2-19 | Quellenreichweite von APA/NICE fachlich prüfen; als Synthese kennzeichnen                          |
| R3-P2-20 | Informationsarchitektur-Entscheid und Nutzbarkeitstest                                             |
| R3-P2-21 | Governance-Entscheid zum einheitlichen Freigabestatus                                              |

## 6. P3 – redaktioneller Feinschliff

- Farblegenden wie «Sage/Terracotta/Slate» aus eigenständigen Textversionen
  entfernen oder nur im expliziten Grafikabgleich verwenden.
- `drei-saeulen`: Satzschreibung bei «Grenze – ich schütze mich» vereinheitlichen.
- `4-alltags-tipps`: sichtbaren Titel an das bessere Katalogkonzept «Vier
  Fragen» angleichen.
- `beispiel-dialog`: «Vorwurf» neutraler als «Ausgangssatz» oder «angespannte
  Aussage» bezeichnen.
- Fachbegriffe wie «Trigger», «Alarm-/Denk-Modus» und «Ventile» knapp erklären
  oder alltagssprachlich ersetzen.
- Quellenzeilen mit Titel, Jahr, DOI/URL und Verwendungszweck standardisieren und
  direkt auf den passenden Bibliografieanker verlinken.
- Den Kinder-Beispielsatz als mögliche Formulierung kennzeichnen; Diagnoseoffenlegung
  nie als Automatismus darstellen.

## 7. Vollständige Coverage der 21 Textversionen

| Thema         | ID                        | Status dieser Runde                                   |
| ------------- | ------------------------- | ----------------------------------------------------- |
| Verstehen     | `leuchtturm`              | geprüft; P2 zur Platzierung/Quelle                    |
| Verstehen     | `eisberg`                 | geprüft; P2 zur kumulativen Bildwirkung               |
| Verstehen     | `spaltung`                | geprüft; P2 zur Quellenreichweite                     |
| Verstehen     | `zustands-landkarte`      | geprüft; P1 rechtliche/konzeptionelle Trennung        |
| Verstehen     | `alarm-modus`             | geprüft; P2 zur Modellvereinfachung                   |
| Verstehen     | `gehirn`                  | geprüft; keine zusätzliche zwingende Einzelkorrektur  |
| Verstehen     | `kinder`                  | geprüft; P1 Status, P2 Metadaten/Quellen              |
| Unterstützen  | `rolle-klaeren`           | geprüft; P2 Fachrolle/Kontrolle                       |
| Unterstützen  | `drei-saeulen`            | geprüft; keine zusätzliche zwingende Einzelkorrektur  |
| Unterstützen  | `konsistenz-prinzip`      | geprüft; P2 Grenze/Abmachung                          |
| Unterstützen  | `beziehungs-achtsamkeit`  | geprüft; keine zusätzliche zwingende Einzelkorrektur  |
| Unterstützen  | `6-leitlinien`            | geprüft; P2 formaler Anspruch                         |
| Unterstützen  | `4-alltags-tipps`         | geprüft; keine zusätzliche zwingende Einzelkorrektur  |
| Kommunizieren | `krisenkommunikation`     | geprüft; P1 Reihenfolge/Quelle                        |
| Kommunizieren | `anspannungskurve`        | geprüft; P2 Deutung/Wirkung/Quelle                    |
| Kommunizieren | `wenn-worte-treffen`      | geprüft; im Einzeltext stark, Querschnittsbefund      |
| Kommunizieren | `gespraeche-kippen`       | geprüft; im Einzeltext stark, menschliche Gates offen |
| Kommunizieren | `grenzen-ohne-eskalation` | geprüft; P2 Wirkungsgarantie                          |
| Kommunizieren | `pause-statt-streit`      | geprüft; P1 unklarer DBT-Anspruch                     |
| Kommunizieren | `zuhoeren-ohne-zustimmen` | geprüft; P2 moralische Rahmung                        |
| Kommunizieren | `beispiel-dialog`         | geprüft; im Einzeltext stark, menschliche Gates offen |

## 8. Empfohlener Erkenntnisweg für diesen Bereich

1. **Grundlagen verstehen:** diagnoseoffene Stressreaktion und Grenzen von
   Modellen erklären.
2. **Eigene Rolle klären:** freiwillige Unterstützung, Nicht-Aufgaben und
   eigene Beratung.
3. **Situation einordnen:** Beobachtung von Vermutung trennen; keine
   Ferndiagnose.
4. **Gesprächsfähigkeit prüfen:** Ist ein Gespräch gerade gewollt und möglich?
5. **Eine Gesprächsoption wählen:** zuhören, nachfragen, Grenze, Pause oder
   Gesprächsende – ohne Pflichtreihenfolge.
6. **Eigene Entlastung sichern:** Grenzen und Unterstützung für Angehörige sind
   ein eigenständiges Ziel.
7. **Vertiefen:** Metaphern und Spickzettel als optionale, klar bezeichnete
   Vertiefung statt konkurrierende Grundmodelle.

## 9. Quellen- und Prüfgrundlagen

- NICE CG78, Borderline personality disorder: recognition and management:
  https://www.nice.org.uk/guidance/cg78/chapter/Recommendations
- NICE NG150, Supporting adult carers:
  https://www.nice.org.uk/guidance/ng150/chapter/Recommendations
- NICE NG225, Self-harm:
  https://www.nice.org.uk/guidance/ng225/chapter/recommendations
- BAG, Berufs- oder Arztgeheimnis:
  https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis
- BAG, freie Einwilligung auf Behandlung oder Pflege:
  https://www.bag.admin.ch/de/freie-einwilligung-auf-behandlung-oder-pflege-nach-umfassender-aufklaerung
- Arntz & ten Haaf (2012), dichotomes Denken:
  https://pubmed.ncbi.nlm.nih.gov/22982582/
- Deckers et al. (2015), stressbezogene Bewertungen:
  https://pubmed.ncbi.nlm.nih.gov/25459898/
- Shields et al. (2016), akuter Stress und Exekutivfunktionen:
  https://pubmed.ncbi.nlm.nih.gov/27371161/
- Pro Juventute, psychisch kranke Eltern:
  https://www.projuventute.ch/de/eltern/familie-gesellschaft/psychisch-kranke-eltern
- Family Connections RCT (2024):
  https://pubmed.ncbi.nlm.nih.gov/39624006/

## 10. Offene menschliche Gates

1. Gesamtstrecken-Prüfung durch mindestens eine Person mit eigener
   Borderline-Erfahrung und eine angehörige Person.
2. Kinder-Handout durch Kinder-/Jugendpsychiatrie beziehungsweise Familien- oder
   Kindesschutzfachperson sowie Menschen mit eigener Eltern-/Kind-Perspektive.
3. Schweizer fachlich-rechtliche Prüfung von Einwilligung, Vertraulichkeit,
   Vertretung und Minderjährigkeit.
4. Nutzbarkeitstest der Bibliothek mit erschöpften Angehörigen: Startpunkt,
   Statusverständnis und Auswahlbelastung.
5. Runde 4: restliche 21 Textversionen und Parität von Web, PDF, WebP und
   Thumbnail; PDF-UA/Matterhorn und reale Druckprüfung separat.
6. Institutionelle Fach- und Publikationsfreigabe.

## 11. Nächster Review-Schritt

Runde 4 prüft die Textversionen der Themen «Grenzen», «Selbstfürsorge» und
«Genesung» sowie `notfallplan-krise` unter ausdrücklicher Abhängigkeit vom
Governance-Entscheid. Danach folgt – soweit Assets vorhanden sind – der
inhaltliche Abgleich derselben Version zwischen Web, PDF, WebP und Thumbnail.
