# Gesamtbild und Folgepakete des Website-Reviews

Prüfstand: `main` @ `fc4adaad` (06.10.2026). Dieses Dokument führt die
Reviewrunden 1 bis 5 sowie den Asset-Abgleich der Runde 4B zusammen. Es ist ein
KI-gestütztes fachlich-redaktionelles, konzeptionelles und didaktisches Review.
Es ist keine klinische, rechtliche, datenschutzrechtliche, institutionelle oder
barrierefreiheitsbezogene Freigabe.

Produktionsinhalte wurden für dieses Gesamtbild nicht verändert. Die
Einzelbefunde bleiben in den jeweiligen Rundenberichten massgeblich; dieses
Dokument ordnet sie zu einem Gesamturteil, einer Zielarchitektur und
umsetzbaren Folgepaketen.

## 1. Reviewabdeckung

| Runde | Geprüfter Bereich                                                                                                                                                          | Ergebnis und verbleibende Grenze                                                                                                                                                    |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Kopf- und Fusszeile, Startseite, `/verstehen` mit Unterseiten, `/unterstuetzen` mit Unterseiten                                                                            | Seiten vollständig gelesen; Quellen-, Begriffs-, Redundanz- und Krisenbefunde erfasst. Der damalige offene Grundsatzentscheid zu Krisenwegen ist inzwischen durch #631 entschieden. |
| 2     | `/kommunizieren`, `/grenzen`, `/selbstfuersorge`, `/genesung`, `/selbsttest`; Statusaufnahme von `/notfallkarte/erstellen` und `/wegweiser`                                | Hauptinhalte vollständig gelesen. Die Krisenwerkzeuge wurden ausdrücklich bis zum Governance-Entscheid zurückgestellt.                                                              |
| 3     | `/materialien` und 21 Textversionen aus Verstehen, Unterstützen und Kommunizieren                                                                                          | Alle 21 Texte gelesen; Fachstatus, Modelle, Lernreihenfolge und kumulative Anti-Stigma-Wirkung geprüft.                                                                             |
| 4A    | 21 Textversionen aus Grenzen, Selbstfürsorge und Genesung                                                                                                                  | Damit wurden alle 42 Textversionen inhaltlich gelesen.                                                                                                                              |
| 4B    | Bestand und Parität von Webtext, PDF, WebP und Thumbnail, soweit vorhanden                                                                                                 | Vollständiges Familieninventar; drei P1-Paritätsbefunde. Kein Ersatz für vollständigen semantischen, pixelgenauen, PDF-UA- oder Druckabgleich aller Familien.                       |
| 5     | `/faq`, `/glossar`, `/buchempfehlungen`, `/quellen`, `/beratung`, `/fachstelle`, `/ueber-uns`, `/impressum`, `/datenschutz`, `/barrierefreiheit`, `/feedback`, `/uebungen` | Alle zwölf Inhaltsquellen sowie relevante Governance- und Interaktionslogik geprüft.                                                                                                |

### Noch nicht abschliessend abgedeckt

Der in #631 getroffene und über PR #642 dokumentierte Entscheid zu Krisenwegen
ist verbindliche Projektgrundlage. Seine Codeumsetzung ist im aktuellen Stand
jedoch nicht abgeschlossen. Deshalb sind die folgenden Routen und
Querschnittselemente noch nicht in ihrem vorgesehenen Endzustand prüfbar:

- `/soforthilfe` einschliesslich Kontaktregister, Aktualität, Zuständigkeit und
  Direktseiten-Parität;
- `/wegweiser` und der Krisenausgang von `/selbsttest` nach Entfernung jeder
  automatischen Risikoeinstufung und Nummernkopie;
- die dauerhafte Umleitung von `/notfallkarte` auf `/soforthilfe`;
- der Produktionsausschluss von `/notfallkarte/erstellen`;
- der nummernfreie, visuell nachgeordnete Sicherheitszugang in Kopf- und
  Fusszeile;
- Entfernung der operativen Kontakte aus Übungen, Impressum, Suche,
  Textversionen und sonstigen psychoedukativen Seiten;
- Entfernung alter statischer Kontaktableitungen aus der öffentlichen
  Auslieferung.

Damit ist der Leseumfang des Reviews nahezu vollständig, das Abschlusskriterium
«alle öffentlich erreichbaren Inhaltsseiten im vorgesehenen Zustand geprüft»
aber noch nicht erfüllt.

## 2. Gesamturteil

Die Website hat bereits eine erkennbare und fachlich sinnvolle Grundbewegung:

> Orientierung → Verständnis → Unterstützung und Beziehung → Kommunikation
> und Grenzen → Selbstfürsorge → Genesung → passende Materialien und Beratung

Viele neuere Texte sind autonomieorientiert, differenziert und respektvoll.
Sie reduzieren Menschen nicht auf eine Diagnose, vermeiden einfache
Wirkungsgarantien und entlasten Angehörige von alleiniger Behandlungs- oder
Genesungsverantwortung. Die neueren Handout-Texte zeigen zudem, wie komplexe
Inhalte mit Erklärmodellen und Illustrationen zugänglich gemacht werden können.

Als Ganzes ist die Website dennoch noch **kein vollständig kohärenter
Erkenntnisweg**. Sie ist eher eine umfangreiche Sammlung mehrheitlich guter
Seiten, Modelle und Materialien, deren Beziehungen, Prioritäten und
Freigabestatus noch nicht konsequent kuratiert sind. Besonders sichtbar wird
dies an fünf Querschnittsproblemen:

1. **Krisenlogik und psychoedukative Aufgabe sind im Code noch vermischt.** Der
   aktuelle Stand setzt den verbindlichen Entscheid aus #631 nicht vollständig
   um.
2. **Mehrere Modelle erklären ähnliche Vorgänge ohne geklärte Funktion.**
   Alarm-/Denk-Modus, Anspannungskurve, Zustands-Landkarte, Eisberg, Pendel und
   weitere Metaphern konkurrieren teilweise statt aufeinander aufzubauen.
3. **Seiten und Handouts wiederholen Inhalte ohne eindeutige Lernreihenfolge.**
   Dies betrifft besonders Krise, Kommunikation, Grenzen, Belastungszeichen,
   Angehörigenrolle und Genesung.
4. **Quellen-, Inhalts-, Asset- und Freigabestatus werden nicht überall sauber
   getrennt.** Ein aktueller Text kann fachlich ungeprüft sein; ein vorhandenes
   PDF kann inhaltlich veraltet sein; ein Reviewbadge kann einen engeren
   Prüfumfang haben als die Seite vermuten lässt.
5. **Die Gesamtwirkung bleibt teilweise einseitig.** Trotz guter Caveats zeigen
   mehrere Beispiele die erkrankte Person überwiegend in Konflikt, Drohung,
   Hoffnungslosigkeit oder Behandlungszögern und die angehörige Person als
   methodisch regulierende Seite.

Der Stand ist daher als gut entwickelter Arbeitsstand geeignet, aber nicht als
öffentlich freigegebene Gesamtwebsite.

## 3. Übergreifende Stärken

- Person, Diagnose, Verhalten und Absicht werden in vielen neueren Texten
  sorgfältig getrennt.
- Unterstützung wird überwiegend als freiwilliges Angebot formuliert;
  Autonomie und Behandlungshoheit bleiben bei der betroffenen Person.
- Grenzen, Pause und Gesprächsende werden zunehmend als legitime Möglichkeiten
  statt als Versagen oder Beziehungsabbruch erklärt.
- Angehörige werden nicht zur Überwachung, Rettung oder emotionalen Regulation
  der anderen Person verpflichtet.
- Recovery wird grundsätzlich als individuell und nicht linear beschrieben.
- Schwierige oder ältere Angehörigenliteratur wird teilweise bereits kritisch
  eingeordnet.
- Alle 42 Handout-Textversionen sind auffindbar und wurden inhaltlich gelesen;
  nicht freigegebene Druckgrafiken werden technisch vielfach zurückgehalten.
- Für neuere Pakete bestehen bereits belastbare Hash-, Manifest- und
  Paritätstests, auf denen ein einheitliches Releaseverfahren aufbauen kann.
- Der Anti-Stigma- und Perspektivenstandard ist dokumentiert und bietet eine
  tragfähige Grundlage für menschliche Prüfungen aus beiden
  Erfahrungsperspektiven.
- Der Entscheid zu Krisenwegen trennt die psychoedukative Website konzeptionell
  klar von einer einzelnen, direkt erreichbaren Kontaktseite.

## 4. Querschnittsbefunde P1

### P1-A – Der Entscheid aus #631 ist noch nicht vollständig umgesetzt

Der gemergte Governance-Entscheid verlangt unter anderem:

- keine Diagnose-, Risiko- oder Triagefunktion;
- `/soforthilfe` als einzigen nutzerseitigen Publikationsort operativer
  Krisenkontakte;
- einen nummernfreien, `persistent-subdued` Sicherheitszugang auf nicht akuten
  Seiten;
- keine roten oder gefüllten Krisenbuttons als Hauptaktion;
- Werkzeuge mit genau einem primären, nummernfreien nächsten Weg;
- Redirect von `/notfallkarte` und Produktions-`404` für
  `/notfallkarte/erstellen`;
- keine neuen statischen Kontaktableitungen.

Der aktuelle Code enthält weiterhin gegenteilige Muster, unter anderem:

- hervorgehobene Soforthilfe-Aktionen in `HeaderNav.tsx` und `MobileMenu.tsx`;
- keinen vollständigen zentralen, nummernfreien Footer-Hinweis in `Layout.tsx`;
- operative Nummern und Gefährdungslogik in
  `KommunikationsUebung.tsx`, `Selbsttest.tsx`, `Wegweiser.tsx` und
  `Impressum.tsx`;
- öffentliche Route, Navigation und Sitemap-Einträge für die Notfallkarte;
- keine dauerhafte Redirect- und `404`-Umsetzung gemäss Entscheid;
- fortbestehende Links auf Notfallkarten- und statische Kontaktmaterialien aus
  `/soforthilfe`.

**Folge:** Issue #641 wurde inhaltlich nicht abgeschlossen, auch wenn seine
Checkliste markiert und das Issue geschlossen wurde. Es soll **wieder geöffnet
und anhand des aktuellen Codes nachgeführt werden**. Es darf dafür kein
inhaltlich gleiches neues Issue angelegt werden. #631 bleibt der
Governance- und institutionelle Freigabegate; #641 bleibt das zugehörige
Umsetzungspaket.

### P1-B – Hochriskante Fach-, Rechts- und Quellenangaben sind nicht publikationsreif

Die Runden 1, 2 und 5 zeigen konkrete Quellenfehler, zu breite
Leitlinienzusammenfassungen, unbelegte Zahlen, veraltete oder unvollständige
FAQ-Prüfstände und pauschale Aussagen zu Schweizer Rechtsfragen. Besonders
betroffen sind `/quellen`, `/faq`, `/glossar`, Diagnose- und
Begleiterkrankungsseiten sowie Aussagen zu Einwilligung, Schweigepflicht,
Minderjährigkeit, FU/KESB und Kindeswohl.

**Folge:** Konkrete Fehler zuerst korrigieren; jede risikorelevante Aussage mit
Claim, Quelle, Reichweite, Stand und verantworteter Fach- oder Rechtsprüfung
verbinden. Eine Bibliografie allein reicht dafür nicht.

### P1-C – Datenschutz, Feedback und institutionelle Verantwortung sind nicht widerspruchsfrei

Datenschutzseite, Impressum und Website-Einordnung nennen offene Rollen und
gleichzeitig weitreichende Verantwortungs- oder Datenschutzaussagen. Der
E-Mail-Feedbackweg bildet Gesundheits- und Drittpersonendaten nicht hinreichend
ab. Angaben zu Hosting, Weitergabe, Logs und Drittanbietern sind nicht
vollständig technisch und vertraglich verifiziert. Die Datenschutzseite
beschreibt zudem weiterhin ein Werkzeug, das öffentlich ausgeschlossen sein
soll.

**Folge:** Ein gemeinsames Rollenmodell verbindlich festlegen: redaktionell
erstellt von, fachlich geprüft durch, datenschutzrechtlich verantwortlich,
technisch betrieben von und institutionell freigegeben durch. Datenflüsse und
Aufbewahrung tatsächlich prüfen, bevor absolute Aussagen publiziert werden.

### P1-D – Die Kommunikationsübungen widersprechen der Sicherheits- und Didaktik-Governance

Die Übungen veröffentlichen operative Nummern, automatisieren Gefährdungslogik
und markieren eine Antwort als richtig. Damit verbinden sie Triage,
Sicherheitsinformation und eine kontextabhängige Gesprächssituation in einem
Quiz. Dynamische Rückmeldungen sind zudem nicht ausreichend als Statusänderung
für assistive Technologien umgesetzt.

**Folge:** Die Übung als Perspektivenvergleich neu konzipieren: keine
Risikoeinstufung, keine Nummernkopie, mehrere vertretbare Optionen, transparente
Voraussetzungen und Grenzen, mögliche statt garantierte Wirkung sowie
barrierefreie Rückmeldung und Fokusführung.

### P1-E – Text, PDF, WebP und Thumbnail sind nicht durchgehend dieselbe Fassung

`warnsignale` und `spiegeln-statt-aufsaugen` zeigen klare Inhaltsdrift zwischen
Webtext und publizierter Grafik. `gespraeche-kippen` war bereits vor einer
Freigabe gegenüber dem aktuellen Text überholt. Für grosse Teile des Bestands
fehlt ein einheitlicher, hashgebundener Freigabenachweis.

**Folge:** Betroffene Familien bis zur Neugenerierung auf `text-only` setzen.
Jede spätere Freigabe umfasst gemeinsam Webtext, PDF, WebP, Thumbnail,
Textbeschreibung, Hashes, fachlichen Entscheid, PDF-UA-/Matterhorn-Prüfung und
realen Drucktest.

### P1-F – Kontakt- und Angebotsdaten wirken verifizierter, als sie belegt sind

`/beratung` und `/fachstelle` pflegen überlappende dynamische Inhalte. Badges
und Prüfdaten beziehen sich nicht immer auf den gesamten sichtbaren Umfang.
Auch `/soforthilfe` braucht vor einer Publikation namentliche
Inhaltsverantwortung, aktuelle Primärquellen und eine vollständige
Kontaktprüfung.

**Folge:** Strukturierte kanonische Datenquellen mit Feldgenauigkeit für Quelle,
Prüfdatum, Status, Ablauf und Verantwortlichkeit. Seiten dürfen daraus nur den
tatsächlich geprüften Umfang ableiten.

### P1-G – Die Barrierefreiheitserklärung beansprucht mehr, als nachgewiesen ist

Die Seite nennt umfassende Tastatur-, ARIA-, Kontrast-, Responsive- und
Screenreader-Erfolge. Vorhandene reale Nachweise decken jedoch nur Teilbereiche
ab und ersetzen weder einen Gesamtaudit noch NVDA-, Zielgruppen- und
Gerätetests. In den Übungen fehlen zudem programmatisch angekündigte
Statuswechsel.

**Folge:** Erklärung auf belegten Ist-Stand und WCAG-2.2-Zielstand umstellen.
Offene Prüfschritte ausdrücklich nennen; Behauptungen erst nach reproduzierbarem
Nachweis ergänzen.

## 5. Querschnittsbefunde P2

### P2-A – Zu viele parallele Erklärmodelle ohne Rollenklärung

Die Website nutzt mehrere starke Bilder und Modelle. Problematisch ist nicht
ihre Zahl allein, sondern dass unklar bleibt, welches Modell eine
wissenschaftliche Theorie, eine klinische Heuristik oder eine eigene
didaktische Darstellung ist und wann welches Modell weiterhilft.

**Empfehlung:** Ein Basismodell je Lernschritt bestimmen. Weitere Visualisierungen
als Vertiefung kennzeichnen und mit einem Satz zur Reichweite und Grenze
versehen. Eigene Synthesen ausdrücklich so benennen.

### P2-B – Wiederholungen haben noch keine didaktische Funktion

Warnzeichen, Kinder, Krisensätze, Rollenbeschreibungen, Grenzen, Selbstfürsorge
und Recovery werden mehrfach in Seiten und Handouts erklärt. Teilweise ändern
sich dabei Begriffe, Kategorien oder Handlungssätze.

**Empfehlung:** Für jedes Kernthema eine kanonische Erklärung definieren.
Wiederaufnahme nur als kurze Erinnerung oder anwendungsbezogene Vertiefung;
sonst zusammenführen oder verlinken.

### P2-C – Materialbibliothek ist Bestandskatalog statt Lernweg

Die Bibliothek mischt Entwürfe, zurückgehaltene und publizierte Visuals sowie
unterschiedliche Modellfamilien. «Aktuell», «approved» und vorhandene
Assetversion sagen nicht zuverlässig dasselbe aus.

**Empfehlung:** Materialien nach Erkenntnisweg und Anliegen kuratieren, nicht
nur nach Themenordner. Redaktioneller Stand, Quellenabgleich, Fachfreigabe,
Publikationsstatus und Assetparität getrennt anzeigen.

### P2-D – Die Gesamtwirkung der Beispiele bleibt teilweise stigmatisierend

Einzelne Texte sind differenziert; kumulativ erscheint die erkrankte Person
jedoch häufig als konflikt-, drohungs-, suizid- oder behandlungsbezogener
Auslöser. Angehörige erscheinen als ruhige, korrekt reagierende und methodisch
geschulte Gegenposition.

**Empfehlung:** Neutrale Alltagssituationen, beidseitige Missverständnisse und
wechselnde Sprecherpositionen ergänzen. Explizit zeigen, dass alle Beteiligten
Grenzen setzen, Fehler machen, sich entschuldigen, Unterstützung ablehnen oder
annehmen und Verantwortung für eigenes Verhalten übernehmen können.

### P2-E – Quellen sind auffindbar, aber nicht aussagengenau zugeordnet

`/quellen` ist eine umfangreiche Bibliografie. Sie zeigt jedoch nicht
zuverlässig, welche Quelle welche konkrete Aussage in welcher Version stützt
und welche Formulierung eine redaktionelle Synthese ist.

**Empfehlung:** Claim-to-source-Matrix mit Quellen-ID, Claim, Verwendungsort,
Version, Evidenzrolle, Einschränkung, Prüfdatum und verantworteter Prüfung.

### P2-F – Begriffe und Zuständigkeiten driften

Bezeichnungen für Borderline, Diagnoseklassifikation, DEAR/DEAR MAN,
Belastungszeichen, Recovery, Grenzen, Dienste und die Fachstelle variieren.
Ähnliche Seiten pflegen Leistungen und Kontaktdaten doppelt.

**Empfehlung:** Kanonisches Glossar, Begriffsliste und strukturierte
Leistungsdaten als redaktionelle Quelle. Abweichungen nur aus fachlichem Grund
und explizit erklären.

### P2-G – Übergänge und Fortschrittslogik sind unvollständig

Die Hauptnavigation folgt grob einem Lernweg. Innerhalb der Seiten führen
«Weiter»-Links jedoch teilweise zurück, überspringen Genesung oder wechseln
abrupt zwischen Erklärung, Krise, Gesprächstechnik und Ressource.

**Empfehlung:** Jede Hauptseite mit ihrer Funktion im Erkenntnisweg beginnen und
mit einem sinnvollen nächsten Schritt schliessen. Sicherheitszugang bleibt
querschnittlich und wird nicht als didaktische Stufe behandelt.

## 6. Empfohlene optimierte Gesamtstruktur

### Ebene 0 – Ständiger Rahmen

- klare Herkunft, Zielgruppe und Grenzen des Angebots;
- normaler Zugang zu Fachstelle und Beratung;
- stabiler, nummernfreier und visuell nachgeordneter Link zu `/soforthilfe`;
- `/soforthilfe` als eigenständige Direktseite ausserhalb des Lernwegs.

### 1. Orientierung: Wo bin ich und was brauche ich?

- Startseite mit Wahl zwischen Verstehen, Alltag/Beziehung, eigener Entlastung
  und Beratung;
- knappe Einordnung, dass Menschen, Beziehungen und Anliegen verschieden sind;
- Inhaltsfinder als Navigation, nicht als Selbsttest oder Risikoeinstufung.

**Lernziel:** Die lesende Person versteht Zweck, Grenze und passende
Einstiegsmöglichkeiten der Website.

### 2. Verstehen: Diagnose, Erleben und Kontext auseinanderhalten

- Borderline-Muster und Diagnosegrenzen;
- Diagnostik und wichtige Differenzial- beziehungsweise Begleiterkrankungen;
- Beziehungen und Belastung ohne diagnosekausale Zuschreibung;
- ein grundlegendes Erklärmodell, danach klar markierte Vertiefungsmodelle.

**Lernziel:** Diagnose, individuelles Erleben, Verhalten, Beziehung und Kontext
werden nicht gleichgesetzt.

### 3. Eigene Rolle klären: unterstützen, ohne zu übernehmen

- Freiwilligkeit, Autonomie und Nicht-Aufgaben;
- Alltagshilfe und Zusammenarbeit mit Behandlung;
- Kinder und unterschiedliche Angehörigenrollen;
- institutionelle, rechtliche und vertraulichkeitsbezogene Grenzen nur dort,
  wo sie verantwortlich geprüft sind.

**Lernziel:** Unterstützung ist möglich, aber weder Steuerung noch alleinige
Verantwortung.

### 4. Kommunizieren: Kontakt, Wahlfreiheit und gegenseitige Verantwortung

- Gesprächsbereitschaft und Kontext prüfen;
- zuhören, nachfragen, validieren und die eigene Sicht ausdrücken;
- mehrere mögliche Reaktionen statt einer idealen Satzfolge;
- Wirkung als Möglichkeit, nicht als Versprechen.

**Lernziel:** Kommunikation ist ein gemeinsamer, kontextabhängiger Prozess und
kein Werkzeug zur Regulation der anderen Person.

### 5. Grenzen und Sicherheit: Schutz ohne Stigmatisierung

- persönliche Grenze, gemeinsame Abmachung und professionelle Zuständigkeit
  unterscheiden;
- Pause, Abstand und Gesprächsende ohne Rückkehrpflicht;
- Gewalt und Bedrohung anhand beobachtbarer Situationen, nie als
  Diagnoseeigenschaft;
- nummernfreier Verweis auf den zentralen Sicherheitsweg.

**Lernziel:** Selbstschutz und Unterstützung können gleichzeitig bestehen;
akute Hilfe bleibt eine externe Zuständigkeit.

### 6. Eigene Gesundheit und Unterstützung

- Belastung wahrnehmen, ohne Angehörige erneut funktional für die erkrankte
  Person zu machen;
- Entlastung, eigene Beratung, soziale und materielle Ressourcen;
- konkrete kleine Schritte mit Wahlfreiheit.

**Lernziel:** Das Wohl der angehörigen Person ist ein eigenständiges Ziel.

### 7. Genesung und Zukunft

- symptomatische Remission, Funktionsniveau und persönliche Recovery trennen;
- Studienzahlen als Gruppendaten, nicht als Individualprognose;
- Hoffnung ohne Garantie und ohne Zuschreibung der Genesungsverantwortung an
  Angehörige.

**Lernziel:** Verläufe sind verschieden; Entwicklung ist möglich und bleibt
individuell.

### 8. Vertiefung und Unterstützung finden

- Materialien entlang der vorherigen Lernschritte kuratieren;
- Beratung, Fachstelle und externe Angebote nach Anliegen;
- Glossar, FAQ, Literatur und Quellen als Referenzebene statt konkurrierende
  Vollerklärungen;
- Meta-Seiten zu Verantwortung, Datenschutz und Barrierefreiheit separat.

**Lernziel:** Die lesende Person findet einen passenden nächsten Schritt, ohne
die ganze Sammlung durchsuchen zu müssen.

## 7. Vorgeschlagene Folge-Issue-Gruppen

Die Gruppierung soll Befunde bündeln, ohne bereits abgeschlossene Issues nur
wegen neuer Detailbefunde wiederzuverwenden. Ausgenommen ist #641: Es ist das
bereits definierte Umsetzungspaket für #631 und soll wieder geöffnet statt
dupliziert werden.

| Paket                                                                                 | Priorität | Vorgeschlagener Umfang                                                                                                                                                                       | Abhängigkeit / Abschlussnachweis                                                                                                                                              |
| ------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A. #641 wieder öffnen: Krisenwege technisch gemäss #631 konsolidieren**             | P1        | Header, Mobile Menu, Footer, Startseite, `/soforthilfe`, Kontaktregister, `/wegweiser`, `/selbsttest`, Übungen, Impressum, Notfallkarten-Routen, Sitemap, Redirects, Suche, Assets und Tests | Kein neues paralleles Issue. Codeaudit gegen jede Anforderung aus `12-krisenwege-und-soforthilfe-entscheid-2026-10-06.md`; danach Routenreview und menschliche Freigabegates. |
| **B. Quellen, FAQ und Glossar fachlich korrigieren**                                  | P1        | konkrete Quellenfehler; risikorelevante Medizin-, Diagnose-, Sicherheits- und Rechtsclaims; Claim-to-source-Matrix                                                                           | Primärquellen; klinische und schweizerisch-rechtliche Prüfung; dokumentierter Prüfstand.                                                                                      |
| **C. Datenschutz, Feedback, Impressum und institutionelle Rollen klären**             | P1        | Verantwortliche Stelle, Hosting/Logs, E-Mail-Datenfluss, Drittanbieter, Speicherung, Lizenz- und Verantwortungswortlaut                                                                      | technische/vertragliche Datenschutzprüfung und institutioneller Entscheid.                                                                                                    |
| **D. Barrierefreiheit ehrlich dokumentieren und vollständig prüfen**                  | P1        | Barrierefreiheitserklärung, dynamische Rückmeldungen, Fokus, Tastatur, Viewports, Screenreader, PDF-UA/Matterhorn                                                                            | automatisierte Nachweise plus reale VoiceOver-, NVDA-, Geräte- und Nutzendentests.                                                                                            |
| **E. Kommunikationsübungen anti-stigmatisierend und kontextsensitiv neu konzipieren** | P1/P2     | keine Triage oder Nummern, keine Richtig/Falsch-Logik, mehrere vertretbare Optionen, vielfältigere Rollenbilder, barrierefreie Rückmeldung                                                   | abhängig von A; klinisches Review sowie unabhängige betroffene und angehörige Perspektive.                                                                                    |
| **F. Kontakt- und Angebots-Governance zentralisieren**                                | P1/P2     | `/beratung`, `/fachstelle`, Leistungs- und Kontaktdaten, Prüfbadges, Ablauf und Zuständigkeit                                                                                                | strukturierte Datenquelle; feldgenaue Primärquelle und Verantwortlichkeit; Linktest.                                                                                          |
| **G. Handout-Assetregister und Formatparität vereinheitlichen**                       | P1/P2     | `warnsignale`, `spiegeln-statt-aufsaugen`, `gespraeche-kippen`; danach alle 42 Familien; Soll-/Ist-/Public-Pfade und Statusdimensionen                                                       | gemeinsames Manifest, Hashes, Inhaltsreview, PDF-UA/Matterhorn, Druck- und Perspektiventests.                                                                                 |
| **H. Informationsarchitektur, Redundanzen und Modellrollen konsolidieren**            | P2        | optimierter Lernweg, kanonische Kernerklärungen, Übergänge, Nomenklatur, Bibliothekskuratierung und kumulative Anti-Stigma-Wirkung                                                           | nach den P1-Korrekturen; Tree-/Journey-Test mit Angehörigen und unabhängige Betroffenenperspektive.                                                                           |

## 8. Empfohlene Reihenfolge

1. #641 wieder öffnen und die Krisen-Governance tatsächlich implementieren.
2. P1-Pakete B bis D parallel vorbereiten; institutionelle Entscheidungen nicht
   durch redaktionelle Annahmen ersetzen.
3. Kontakt- und Übungslogik nach dem Sicherheits- und Rollenentscheid
   überarbeiten.
4. Fehlerhafte oder divergierende Handoutfamilien zurückhalten und das
   Gesamtmanifest vereinheitlichen.
5. Danach Informationsarchitektur, Redundanzen und Modellrollen konsolidieren.
6. Die gesamte Strecke erneut in drei Viewports, nur mit Tastatur, mit
   VoiceOver und NVDA sowie mit betroffenen und angehörigen Personen prüfen.
7. Erst nach dokumentierter klinischer, rechtlicher, datenschutzrechtlicher und
   institutioneller Freigabe über eine öffentliche Publikation entscheiden.

## 9. Abschlusslogik für Issue #630

Issue #630 kann geschlossen werden, wenn:

- dieser Gesamtbericht und alle Einzelberichte versioniert vorliegen;
- #641 wieder geöffnet und die noch ungeprüften Krisenrouten ausdrücklich als
  abhängiger Restumfang markiert ist;
- jeder P1- und P2-Befund einem konkreten Folge-Issue oder einem dokumentierten
  Nicht-Umsetzungsentscheid zugeordnet ist;
- die optimierte Zielarchitektur als Arbeitsgrundlage bestätigt ist;
- der KI-gestützte Reviewstatus sichtbar von Fach-, Rechts-, Datenschutz-,
  Accessibility- und Publikationsfreigabe getrennt bleibt.

Das Schliessen von #630 bedeutet dann nur: **Der Review- und
Zuordnungsauftrag ist abgeschlossen.** Es bedeutet nicht, dass die Befunde
behoben oder die Website zur Veröffentlichung freigegeben sind.

## 10. Offene menschliche Gates

- namentlich verantwortete klinische Prüfung aller Medizin-, Sicherheits- und
  Selbsthilfeaussagen;
- schweizerisch-rechtliche Prüfung von FU, KESB, Kindeswohl, Einwilligung,
  Schweigepflicht, Haftung und Lizenz;
- formelle Datenschutzprüfung der tatsächlichen Datenflüsse;
- institutionelle Bestätigung von Verantwortlichkeit, Leistungsumfang und
  Publikationsrolle;
- unabhängige Prüfung der Gesamtwirkung durch mindestens eine Person mit
  eigener Borderline-Erfahrung und eine angehörige Person;
- reale VoiceOver-, NVDA-, Tastatur-, mobile Geräte- und Zielgruppentests;
- PDF-UA-/Matterhorn- und reale Druckprüfung jedes freizugebenden Handoutpakets.
