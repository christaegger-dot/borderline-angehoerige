# Review Website Teil 1: Fachliche Prüfung Seite für Seite – Runde 4A

Prüfstand: `main` @ `36e4aae6` (06.10.2026). Geprüft wurden die
Textversionen der Themen «Grenzen», «Selbstfürsorge» und «Genesung» sowie die
Textversion `notfallplan-krise`. Dieses Dokument ist ein KI-gestütztes
redaktionelles Review. Es ist weder eine fachliche, rechtliche noch
institutionelle Freigabe. In dieser Runde wurden keine Produktionsinhalte
geändert.

## 1. Umfang und Grenzen

### Vollständig gelesen

- sieben Textversionen «Grenzen»
- sieben Textversionen «Selbstfürsorge»
- sechs Textversionen «Genesung»
- `notfallplan-krise` als einundzwanzigste verbleibende Textversion
- referenzierte Inhalte in `learningGuides.json`, `revisedHandouts.json`,
  Materialregister, Textversionsregister und Governance-Status

Zusammen mit Runde 3 sind damit alle 42 Textversionen inhaltlich gelesen. Beim
`notfallplan-krise` bleibt der Publikations- und Architekturentscheid
vorläufig, solange der institutionelle Governance-Entscheid in Issue #631 offen
ist. Die klinischen Aussagen und ihre fehlende aussagengenaue Belegung sind
davon unabhängig als Reviewbefunde dokumentiert.

### Noch nicht Bestandteil von Runde 4A

- Paritätsprüfung derselben Version zwischen Web, PDF, WebP und Thumbnail
- visuelle Prüfung aller Fassungen in den definierten Viewports
- PDF-UA-/Matterhorn-Prüfung und reale Ausdrucke
- echte Screenreader- und Nutzendentests
- institutionelle, medizinische und schweizerisch-rechtliche Freigaben
- abschliessende Krisenlogik; Draft-PR #642 ist technisch grün, aber noch nicht
  institutionell entschieden oder gemergt; die Umsetzung liegt in Issue #641

## 2. Gesamturteil

Die Themen «Grenzen», «Selbstfürsorge» und «Genesung» enthalten mehrere der
stärksten Texte der Website. Besonders gelungen sind `dear`,
`4-arten-von-grenzen`, `grenzen-erkennen`, `stopp-technik`, `energie-konto`,
`erlaubnis-karte`, `radikale-akzeptanz`, `garten`, `genesung-zahlen`,
`remission-heilung` und `5-faktoren-genesung`.

Die wichtigsten Risiken konzentrieren sich auf ältere Fassungen:

1. `schuld-verantwortung` enthält zu absolute Aussagen zu Verursachung,
   Vererbung, Familie und Erziehungsstil sowie eine moralisch-binäre
   Gegenüberstellung von Schuld und Verantwortung.
2. `rolle-genesungsprozess` formuliert Pflichten und Ausnahmen bei
   Minderjährigkeit, Urteilsfähigkeit und Beistandschaft zu pauschal; `lmk`
   braucht eine engere Einordnung tatsächlicher Sorge- und Versorgungspflichten.
3. `warnsignale` präsentiert ein nicht validiertes Ampelmodell als scheinbar
   feste Belastungs- und Handlungsstufen.
4. `notfallplan-krise` veröffentlicht Kontakte ausserhalb der zentralen
   Soforthilfe-Seite und enthält hochriskante Handlungsregeln, obwohl die
   vorgeschlagene Governance genau einen nutzersichtbaren Krisenweg vorsieht.
5. Mehrere ältere Blätter versprechen Wirkungen oder rahmen Grenzen als
   «Konsequenzen», obwohl die neueren Texte Grenzen korrekt als selbst
   steuerbare Schutzhandlung verstehen.

## 3. Stärken

- `dear` trennt Bitte, eigene Grenze und eigenen Schritt und nennt ausdrücklich,
  dass Kooperation nicht garantiert ist.
- `4-arten-von-grenzen` macht körperliche, emotionale, zeitliche und materielle
  Bedürfnisse konkret, ohne Kontrolle der anderen Person zu versprechen.
- `grenzen-erkennen` behandelt Signale als unspezifisch, nennt äussere
  Belastungsquellen und vermeidet Diagnose- oder Schuldlogik.
- `stopp-technik` erlaubt Auslassen und Abbrechen, vermeidet erzwungene
  Atemübungen und setzt Sicherheit vor Üben.
- `energie-konto` sagt klar, dass nicht jede Belastung durch persönliche
  Selbstfürsorge lösbar ist, und macht Wohnen, Finanzen, Arbeit sowie praktische
  Entlastung sichtbar.
- `radikale-akzeptanz` grenzt Akzeptanz von Gutheissen, Passivität und
  Gewalttoleranz ab und lässt Nichtgelingen zu.
- `genesung-zahlen` gibt Stichprobe, Zeitraum und Definitionen korrekt an und
  warnt ausdrücklich vor individueller Prognose. Die Werte 93 Prozent und
  50 Prozent stimmen mit der zitierten Zehnjahresstudie überein.
- `remission-heilung` trennt Symptome, Alltag/Teilhabe und persönliche Recovery,
  ohne daraus eine Rangfolge oder Wertung abzuleiten.
- `5-faktoren-genesung` kennzeichnet die fünf Bereiche als redaktionelle
  Orientierung, nicht als validiertes Vorhersagemodell.
- `garten` verteilt keine feste Retterrolle und beschreibt Kontaktpause und
  eigene Beratung als legitime Möglichkeiten.

## 4. P1 – wesentliche Befunde

### R4A-P1-01 – `schuld-verantwortung` vereinfacht Ätiologie und Familie unzulässig

- **Stelle:** Abschnitte «Was die Forschung zeigt» und «5 Sätze …»
- **Beobachtung:** «Vererbt werden Temperamentszüge»; «Eine
  Borderline-Persönlichkeitsstörung kommt in allen Familien vor – unabhängig von
  … Erziehungsstil»; «Dass Sie jetzt da sind, zeigt Ihre Fürsorge» und «Sie tun
  bereits viel».
- **Problem und Wirkung:** Borderline hat eine komplexe, multifaktorielle
  Ätiologie mit genetischen und Umweltanteilen. Die Verengung auf vererbte
  Temperamentszüge ist zu einfach. Die absolute Unabhängigkeit vom
  Erziehungsstil ist durch die angegebene Quelle nicht gedeckt und kann reale
  schädliche Beziehungserfahrungen unsichtbar machen. Die Entlastungssätze
  unterstellen Fürsorge und ausreichenden Einsatz und können Personen, die sich
  ambivalent verhalten haben, erneut beschämen.
- **Zusatzbefund:** Die Aussage, die Erkrankung werde «selbst von Fachpersonen
  oft erst spät erkannt», wird in der Textversion nicht aussagengenau belegt.
- **Empfehlung:** Entlastend, aber präzise formulieren: Es gibt keine einzelne
  Ursache und aus einer Diagnose lässt sich weder eine Einzelschuld noch eine
  bestimmte Familiengeschichte ableiten. Genetische, psychologische, soziale
  und weitere Umweltfaktoren können sich über die Entwicklung wechselseitig
  beeinflussen. Keine pauschale Aussage über alle Familien oder Erziehungsstile.
  Fürsorge nicht aus dem Lesen des Blattes ableiten.
- **Quellenbedarf:** Gunderson et al. 2018; aktuelle Ätiologie- und
  Gen-Umwelt-Reviews; fachlich verantwortete Prüfung.

### R4A-P1-02 – Schuld und Verantwortung werden moralisch-binär gegenübergestellt

- **Stelle:** `schuld-verantwortung`, Abschnitte «Kernaussage» und «Schuld vs.
  Verantwortung»
- **Beobachtung:** «Schuld hilft weder Ihnen noch der betroffenen Person»;
  «Schuld lähmt … Verantwortung macht handlungsfähiger»; Schuld wird mit
  Rückzug/Überanpassung, Verantwortung mit Klarheit und gesunden Grenzen
  verbunden.
- **Problem und Wirkung:** Schuldgefühle können belastend, aber auch Hinweise auf
  eigene Werte oder tatsächlich verletzendes Verhalten sein. Die binäre Wertung
  kann Gefühle abwerten und Verantwortung mit Selbstoptimierung verwechseln.
  Sie erschwert zugleich die wichtige Unterscheidung zwischen Nichtschuld an
  einer Erkrankung und Verantwortung für eigenes Verhalten.
- **Empfehlung:** Gefühle nicht als nützlich oder nutzlos sortieren. Trennen:
  keine Person verursacht allein die Erkrankung; jede Person kann Verantwortung
  für eigenes aktuelles Verhalten, Wiedergutmachung, Grenzen und Hilfeholen
  übernehmen. Schuldgefühle dürfen besprochen werden, ohne dass sie eine
  objektive Schuld beweisen.
- **Prüfbedarf:** fachliche und unabhängige Perspektivenprüfung beider Seiten.

### R4A-P1-03 – `rolle-genesungsprozess` formuliert Schweizer Rechtsfragen zu pauschal

- **Stelle:** «Angehörige … müssen Behandlung nicht koordinieren – ausser etwa
  als Eltern Minderjähriger oder Beistand»; «Auskünfte … grundsätzlich nur mit
  Zustimmung; gesetzliche Ausnahmen etwa bei Minderjährigen oder fehlender
  Urteilsfähigkeit»
- **Problem und Wirkung:** Minderjährigkeit allein bestimmt weder
  Urteilsfähigkeit noch Vertraulichkeit oder Vertretung. Beistandschaften haben
  unterschiedliche Aufträge. Eltern Minderjähriger koordinieren nicht
  automatisch jede Behandlung. Die Formulierung kann Rechte der erkrankten
  Person verkürzen und Angehörigen unzutreffende Pflichten zuschreiben.
- **Empfehlung:** Keine Kategorien-Ausnahme formulieren. Allgemein erklären:
  Rollen hängen von Urteilsfähigkeit in der konkreten Frage, Sorge- oder
  Vertretungsbefugnissen, Auftrag und Situation ab. Individuelle Klärung mit der
  behandelnden Stelle beziehungsweise fachlich-rechtlicher Beratung empfehlen.
- **Quellenbedarf:** BAG Berufs-/Arztgeheimnis und Einwilligung; schweizerisch-
  rechtliche Freigabe. NICE/APA dürfen diese Rechtsaussage nicht tragen.

### R4A-P1-04 – `warnsignale` wirkt wie ein validiertes Stufen- und Triageinstrument

- **Stelle:** Grün/Gelb/Rot mit den Aussagen «noch gut beeinflussbar», «blosses
  Durchhalten reicht meist nicht mehr» und «hier braucht es Unterstützung von
  aussen»
- **Beobachtung:** Die Einleitung nennt eine «Ampellogik» mit
  «unterschiedlichen Belastungsstufen». Maslach/Leiter und Mason/Kreger werden
  als Quellen genannt, belegen aber dieses konkrete Angehörigen-Ampelmodell
  nicht.
- **Problem und Wirkung:** Unspezifische Symptome werden in feste Stufen und
  Handlungsregeln sortiert. Leserinnen und Leser könnten sich anhand der Farbe
  selbst triagieren oder bei vermeintlichem Grün zu lange warten. Das Modell
  individualisiert zudem Belastung, obwohl äussere Entlastung entscheidend sein
  kann.
- **Empfehlung:** Als eigene, nicht validierte Orientierung ohne feste
  Stufenfolge kennzeichnen oder in eine nicht-hierarchische Sammlung möglicher
  Signale und nächster Optionen überführen. Hilfe darf in jeder Phase genutzt
  werden. Äussere und materielle Belastungen ergänzen.
- **Prüfbedarf:** fachlich verantwortete Prüfung sowie Nutzendentest mit
  erschöpften Angehörigen.

### R4A-P1-05 – `notfallplan-krise` widerspricht der vorgeschlagenen zentralen Krisen-Governance

- **Stelle:** gesamte Textversion, besonders zwei Kontaktlisten, direkte
  Kontaktdarstellung in Fliesstext und Kurzreferenz sowie der Governance-Eintrag
  in `handoutGovernance.ts`
- **Beobachtung:** Die Nummern innerhalb der Textversion werden zwar zentral aus
  `AKUT_KONTAKT_IDS` beziehungsweise `kontakte.ts` gerendert. Die Textversion
  veröffentlicht diese Kontakte aber zusätzlich zu `/soforthilfe`; ihre eigenen
  Labels, Beschreibungen und Materialmetadaten bilden eine weitere
  pflegebedürftige Publikationsfläche. `kontakte.ts` nennt den 30.05.2026 als
  letzte Verifikation und ist damit am Prüfdatum 06.10.2026 älter als das in
  Draft-PR #642 vorgeschlagene Quartalsintervall. Gleichzeitig trägt
  `notfallplan-krise` in `handoutGovernance.ts` noch
  `approvedVersion: notfallplan-krise-v04`, obwohl die visuellen Assets
  zurückgezogen sind, nur die Textversion angeboten wird und die neue
  Krisen-Governance noch offen ist. Der Block «Akute Gefahr? Sofort handeln»
  ordnet ausserdem einen «konkreten Suizidplan» direkt der Nummer 144 zu.
- **Problem und Wirkung:** Nutzer:innen sehen operative Kontakte und
  Krisenlogik an mehr als einer Stelle; Text, Prüfdatum und Status können
  auseinanderlaufen. Dies widerspricht dem in Draft-PR #642 dokumentierten Ziel:
  `kontakte.ts` als strukturierte Datenquelle, `/soforthilfe` als einzige
  nutzersichtbare Publikationsstelle und keine Kontaktwiedergabe in Materialien.
  Die automatische Zuordnung «konkreter Suizidplan → 144» ist zudem eine eigene
  Triage-Regel und kollidiert mit dem vorgeschlagenen Verzicht auf
  automatisierte Risikoeinschätzung oder Triage.
- **Empfehlung:** Bis zum institutionellen Entscheid nicht einzeln reparieren.
  Der bereits vollzogene Rückzug der PDF-/WebP-Fassung ist beizubehalten. Nach
  Annahme von #642 die Textversion auf eine nummernfreie psychoedukative
  Orientierung mit genau einem Link zur zentralen Soforthilfe reduzieren oder
  aus der allgemeinen Materialsammlung entfernen. Veraltete Registry-,
  `approvedVersion`-, URL- und Download-Metadaten im Folgepaket bereinigen und
  die Kontaktverifikation vor einer Publikation erneuern. Die konkrete
  Suizidplan-Zuordnung klinisch prüfen und nicht als automatisches
  Entscheidungsinstrument veröffentlichen.
- **Abhängigkeit:** Issue #631, Draft-PR #642, Umsetzungs-Issue #641.

### R4A-P1-06 – Hochriskante Aussagen im Notfallplan sind nicht aussagengenau belegt

- **Stelle:** «Direktes Ansprechen erhöht das Risiko nicht, sondern kann
  entlastend sein»; «Jede Äusserung … sollte ernst genommen werden»;
  «Suizidgedanken sollten nicht als Geheimnis mitgetragen werden»;
  Mittelbeschränkung und Dabeibleiben
- **Problem und Wirkung:** Die Aussagen können sinnvoll sein, sind aber
  sicherheitsrelevant und werden nur pauschal mit älteren Family Guidelines und
  Project Air belegt. Die Quelle ist nicht einzelnen Handlungsregeln zugeordnet;
  lokale Schweizer Zuständigkeit und Ausnahmen sind nicht dokumentiert.
- **Empfehlung:** Nach Governance-Entscheid jede verbleibende Aussage an eine
  aktuelle Leitlinie oder offizielle Schweizer Quelle binden. Kollaborative
  Sicherheitsplanung klar von spontanen Eingriffen Angehöriger unterscheiden;
  keine Aufforderung zum körperlichen Eingreifen oder Alleinüberwachen.
- **Quellenbedarf:** NICE NG225 als aktuelle fachliche Grundlage; offizielle
  Schweizer Notfall- und Versorgungspfade; verantwortete klinische Freigabe.

## 5. P2 – wichtige Befunde

### R4A-P2-01 – `spiegeln-statt-aufsaugen` ist eine eigene Metapher mit zu schwacher Quellenzeile

- Der Text ist vorsichtig und freiwillig formuliert, nennt aber ausschliesslich
  Mason/Kreger als «Quelle». Diese Quelle belegt weder die konkrete Metapher noch
  ihre Kartenstruktur.
- **Empfehlung:** Als eigene didaktische Metapher kennzeichnen; Beobachtung,
  vorsichtige Vermutung und offene Rückfrage mit passender Validierungsquelle
  absichern.

### R4A-P2-02 – Brücken-Metapher verspricht Schutz vor Eskalation und Stabilität

- `bruecke-gelaender`: Grenzen «schützen beide Seiten vor weiterer Eskalation»;
  Pfeiler «machen Beziehung stabiler».
- **Problem:** Eine Grenze kann Orientierung geben und den eigenen Schutz
  erhöhen, garantiert aber weder Deeskalation noch Beziehungsstabilität.
- **Empfehlung:** Wirkung offen formulieren: «kann Orientierung geben»;
  «unterstützt, Verantwortung zu verteilen».

### R4A-P2-04 – `grenzen-spickzettel` fällt hinter die neuere Grenzlogik zurück

- **Stellen:** «ohne die Beziehung zu gefährden»; «logische Konsequenz»;
  «Konsequenz hat mit dem Verhalten zu tun»; «Exit-Strategie mit klaren
  Konsequenzen».
- **Problem und Wirkung:** Die Beziehungsgarantie ist nicht haltbar. Die
  Konsequenzsprache klingt verhaltenssteuernd oder strafend und widerspricht
  `lmk`, wonach eine Grenze ein eigener Schutzschritt ist.
- **Empfehlung:** «Eigener, machbarer Schutzschritt» statt «Konsequenz»;
  Wirkungsgarantie entfernen; Schritt ausschliesslich an eigener Handlung
  festmachen. «Ich liebe dich …» als beziehungsspezifisches Beispiel durch eine
  neutrale Alternative ergänzen. Zudem einen ausdrücklichen
  Sicherheits- und Freiwilligkeitsrahmen ergänzen: Das Gespräch ist optional,
  darf beendet werden und die Formel garantiert weder Kooperation noch Schutz.

### R4A-P2-05 – Sauerstoffmasken-Text instrumentalisiert Selbstfürsorge teilweise erneut

- **Stellen:** «Selbstfürsorge entlastet innerlich»; «Mit mehr Kraft … reagieren
  Sie ruhiger und gezielter».
- **Problem und Wirkung:** Der Einstieg sagt zu Recht, Selbstfürsorge brauche
  keine Begründung durch späteres Helfen. Die Karten versprechen dann
  Schuldreduktion und bessere Reaktion. Das ist weder garantiert noch für den
  Eigenwert der Selbstfürsorge nötig.
- **Empfehlung:** Bei Wahlfreiheit und eigenem Wert bleiben: Selbstfürsorge kann
  Raum, Klarheit oder Erholung ermöglichen; sie muss keine bestimmte Wirkung
  erzeugen. Mason/Kreger nicht als alleinige Fachquelle verwenden.

### R4A-P2-07 – `fortschritt-paradox` nennt eine schwache Zusatzquelle

- Zanarini trägt die Aussage zu unterschiedlichen Verläufen. Mason/Kreger ist
  dafür weder nötig noch eine gleichwertige wissenschaftliche Quelle.
- **Empfehlung:** Die Verlaufsquelle aussagengenau angeben; «Veränderung braucht
  Zeit» nicht als allgemeines Gesetz, sondern als mögliche Erfahrung
  formulieren.

### R4A-P2-08 – Pause wird als Nicht-Beziehungsabbruch garantiert

- `rolle-genesungsprozess`: «Eine Pause ist kein Beziehungsabbruch.»
- **Problem:** Für manche Beziehungen kann eine Pause in einen Abbruch
  übergehen; entscheidend ist, dass keine Fortsetzungspflicht entsteht.
- **Empfehlung:** «Eine Pause muss keinen Beziehungsabbruch bedeuten. Sie dürfen
  später neu entscheiden, ob und welcher Kontakt tragbar ist.»

### R4A-P2-09 – Grenzen-Inhalte sind stark überlappend

- `dear`, `4-arten-von-grenzen`, `lmk`, `grenzen-spickzettel`,
  `bruecke-gelaender` und `spiegeln-statt-aufsaugen` wiederholen Grenze,
  Beispielsatz, Pause und eigenen Schritt.
- **Empfehlung Lernweg:** Belastung wahrnehmen → Bereich wählen → eigenen
  Schutzschritt festlegen → optional DEAR für ein ruhiges Gespräch → kurze
  Beispielsätze. Metaphern als Vertiefung, nicht als zusätzliche Grundmodelle.

### R4A-P2-10 – Selbstfürsorge-Inhalte konkurrieren statt aufeinander aufzubauen

- Ampel, Sauerstoffmaske, STOPP, Energie-Konto, Erlaubnis-Karte, Schuld und
  radikale Akzeptanz stehen ohne Funktion oder Reihenfolge nebeneinander.
- **Empfehlung Lernweg:** Belastung beobachten → äussere und innere
  Entlastungsmöglichkeiten → Erlaubnis und Grenzen → eine freiwillige Übung für
  den Moment → vertiefende Einordnung von Schuld/Akzeptanz. Ampel und
  Sauerstoffmaske erst nach fachlicher Überarbeitung.

### R4A-P2-11 – Garten und Angehörigenrolle wiederholen sich

- Beide Texte sagen: freiwillig unterstützen, eigene Kraft schützen, Genesung
  nicht herstellen.
- **Empfehlung:** `garten` als zugängliche Metapher; `rolle-genesungsprozess`
  nur als sachliche Vertiefung zu Einwilligung, Information und Rollen – nach
  rechtlicher Freigabe. Wiederholte Karten reduzieren.

### R4A-P2-12 – Krisensätze sind über zahlreiche Alltagshandouts verteilt

- Direkte oder implizite Krisenhinweise stehen in `dear`,
  `4-arten-von-grenzen`, `grenzen-erkennen`, `lmk`, `stopp-technik`,
  `erlaubnis-karte` und `radikale-akzeptanz`.
- **Problem:** Unterschiedliche Formulierungen und direkte Nummern schaffen
  Parallelpflege und machen die allgemeine Sammlung krisenlastiger.
- **Empfehlung:** Nach #631 auf das definierte `persistent-subdued`-Muster mit
  genau einem zentral gepflegten Weg vereinheitlichen. Situationsbezogene
  Schutzsätze können bleiben, aber ohne kopierte Kontakte.

### R4A-P2-13 – Freigabestatus widerspricht erneut dem sichtbaren Textstand

- Ein direkter Text-/Statuswiderspruch besteht bei `dear`,
  `spiegeln-statt-aufsaugen`, `4-arten-von-grenzen`, `stopp-technik`, `garten`
  und `genesung-zahlen`: Sie tragen technisch `approvedVersion`, während die
  Textfassung ausdrücklich «Erneute fachliche Prüfung ausstehend» nennt.
- `bruecke-gelaender`, `warnsignale`, `sauerstoffmaske`,
  `schuld-verantwortung` und `fortschritt-paradox` tragen ebenfalls technisch
  `approvedVersion`, obwohl Runde 4A neue fachliche oder redaktionelle Befunde
  dokumentiert; sie enthalten den ausdrücklichen Hinweis in der Textfassung
  jedoch nicht.
- **Empfehlung:** Wie in Runde 3: fachlichen Inhalt, Assetversion, technische
  Freigabe und institutionelle Publikationsfreigabe getrennt modellieren.

### R4A-P2-14 – Zwei verschiedene Recovery-Begriffe werden nicht verbunden

- `genesung-zahlen` verwendet «Recovery» als Studiendefinition aus
  symptomatischer Remission plus guter sozialer und beruflicher
  Funktionsfähigkeit. `remission-heilung` erklärt persönliche Recovery als
  selbstbestimmten Weg zu einem sinnvollen Leben.
- **Problem und Wirkung:** Beide Verwendungen sind fachlich möglich, können aber
  ohne Übergang widersprüchlich wirken. Soziale oder berufliche Funktion darf
  nicht zum universellen Recovery-Massstab werden.
- **Empfehlung:** Durchgehend «Recovery nach der Studiendefinition» verwenden und
  ausdrücklich von persönlicher Recovery unterscheiden.

### R4A-P2-15 – `5-faktoren-genesung` klingt nach getrennter Versorgung

- «Körperliche Beschwerden und weitere psychische Erkrankungen werden
  eigenständig behandelt» kann wie unkoordinierte Parallelversorgung klingen.
- **Empfehlung:** «eigenständig beurteilt und in einem abgestimmten
  Behandlungsplan berücksichtigt». Die Aussage, Medikamente seien bei
  Borderline keine Kernbehandlung, direkt einer aktuellen Leitlinienempfehlung
  zuordnen.

### R4A-P2-16 – Garten-Metapher braucht eine gezielte Perspektivenprüfung

- Der Text begrenzt die Metapher sorgfältig. Das Bild kann dennoch die erkrankte
  Person als passives «Gewächs» und Angehörige als kultivierende Instanz lesen
  lassen.
- **Empfehlung:** Mit Menschen mit Borderline-Erfahrung prüfen. Gegebenenfalls
  noch klarer sagen, dass das Bild nur Bedingungen und Einflussgrenzen
  beschreibt, nicht den Menschen.

### R4A-P2-17 – Zwei Blätter widersprechen sich bei Belastungssignalen

- `grenzen-erkennen` erklärt ähnliche körperliche, emotionale und soziale
  Signale sorgfältig als mehrdeutig und nicht diagnostisch. `warnsignale`
  ordnet sie festen Grün-/Gelb-/Rot-Stufen und Handlungsregeln zu.
- **Wirkung:** Leserinnen und Leser erhalten zwei konkurrierende Logiken für
  dieselben Erfahrungen.
- **Empfehlung:** Die differenziertere, nicht-hierarchische Logik von
  `grenzen-erkennen` zum gemeinsamen Standard machen und `warnsignale`
  entsprechend überarbeiten oder zusammenführen.

### R4A-P2-18 – `lmk` braucht eine engere Einordnung tatsächlicher Sorge- und Versorgungspflichten

- **Stelle:** «Der Schritt darf niemandem Versorgung oder Sicherheit entziehen,
  für die Sie tatsächlich zuständig sind, etwa minderjährigen Kindern» und
  «Wenn Kinder oder andere Personen auf Ihre Versorgung angewiesen sind …»;
  Sicherheitshinweis mit den Nummern 117 und 144
- **Problem und Wirkung:** «Tatsächlich zuständig» begrenzt die Aussage bereits
  sinnvoll. Welche Zuständigkeit besteht, bleibt jedoch alters-,
  urteilsfähigkeits-, vertretungs- und situationsabhängig; «andere Personen» ist
  sehr weit. Angehörige könnten daraus eine umfassendere Sicherungs- oder
  Überwachungspflicht ableiten. Die direkten Nummern bleiben ein P1-relevanter
  Governance-Punkt von #631.
- **Empfehlung:** Den Sicherheitsgrundsatz beibehalten, individuelle Klärung der
  konkreten Sorge- oder Versorgungspflicht empfehlen und keine Pflicht allein
  aus Beziehung, Diagnose oder Minderjährigkeit ableiten. Direkte Nummern nach
  dem Entscheid zu #631 durch den zentral gepflegten Weg ersetzen.
- **Quellenbedarf:** schweizerisch-rechtliche Prüfung; Krisenlogik abhängig von
  #631/#641.

### Quellen-, Prüf- und Governance-Bedarf der P2-Befunde

| Befund    | Noch erforderlich                                                                               |
| --------- | ----------------------------------------------------------------------------------------------- |
| R4A-P2-01 | Validierungsquelle und Perspektivenprüfung; Metapher als eigene Synthese kennzeichnen           |
| R4A-P2-02 | redaktionelle Prüfung auf Wirkungsgarantien; keine neue Fachquelle nötig, wenn enger formuliert |
| R4A-P2-04 | Angehörigen- und Betroffenenperspektive; Abgleich mit neuer Grenzlogik                          |
| R4A-P2-05 | aktuelle Angehörigenleitlinie und Nutzendenprüfung des Selbstfürsorge-Framings                  |
| R4A-P2-07 | Primärquelle Zanarini aussagengenau zuordnen; Praxisquelle entfernen oder einordnen             |
| R4A-P2-08 | Perspektivenprüfung; rechtliche Prüfung nur für die übrigen Rollenaussagen                      |
| R4A-P2-09 | Informationsarchitektur- und Konsolidierungsentscheid                                           |
| R4A-P2-10 | Informationsarchitektur-Entscheid und Test mit erschöpften Angehörigen                          |
| R4A-P2-11 | Informationsarchitektur-Entscheid; Rechtsprüfung vor sachlicher Rollenvertiefung                |
| R4A-P2-12 | abhängig von #631/#641 und zentralem Krisenmuster                                               |
| R4A-P2-13 | Governance-Entscheid zum einheitlichen Freigabestatus                                           |
| R4A-P2-14 | redaktionelle Begriffsklärung; Studien- und persönliche Recovery getrennt belegen               |
| R4A-P2-15 | aktuelle Leitlinienquelle zu abgestimmter Behandlung und Medikamenten                           |
| R4A-P2-16 | unabhängige Prüfung aus Borderline-Erfahrung und Angehörigenperspektive                         |
| R4A-P2-17 | fachliche Konsolidierung und Nutzbarkeitstest mit Angehörigen                                   |
| R4A-P2-18 | schweizerisch-rechtliche Prüfung und Abgleich mit #631/#641                                     |

## 6. P3 – redaktioneller Feinschliff

- `grenzen-spickzettel`: «A – Behaupten» alltagssprachlich als «Anliegen klar
  sagen» bezeichnen; DEAR-Buchstaben in der Quellenzeile erklären.
- `4-arten-von-grenzen`: «Vier Bereiche, in denen Grenzen wichtig sein können»
  wäre präziser als ein Titel, der wie eine formale Taxonomie klingt.
- Beziehungsspezifische Beispielsätze wie «Ich liebe dich» immer um eine neutrale
  Alternative ergänzen.
- `warnsignale`: «Kontrollverlust-Angst» durch eine verständliche Beschreibung
  ersetzen; zusammengesetzte Diagnosewirkung vermeiden.
- `erlaubnis-karte`: «Gültig ab sofort. Unbefristet.» als spielerische Gestaltung
  beibehalten, aber nicht wie eine formale Erlaubnis wirken lassen.
- `erlaubnis-karte`: «Wählen Sie … die Erlaubnis, die Ihnen am schwersten fällt»
  freiwilliger formulieren: «Wenn Sie möchten, wählen Sie einen Satz, der heute
  hilfreich sein könnte.»
- `radikale-akzeptanz`: «macht gezielteres Handeln wieder möglich» zu «kann
  helfen, einen nächsten Schritt zu klären» abschwächen.
- `radikale-akzeptanz`: Die ähnlichen Titel «Kraft für Handlungsspielraum
  bewahren» und «Mehr Handlungsspielraum gewinnen» klarer voneinander
  unterscheiden; die inhaltlich verschiedenen Karten nicht allein wegen der
  Titel zusammenführen.
- `notfallplan-krise`: «Selbstfürsorge» in einer Akutsituation eher
  «Unterstützung für Angehörige nach oder neben der Akutsituation» nennen.
- Quellenzeilen vollständig und einheitlich mit Titel, Jahr, DOI/URL und
  konkretem Verwendungszweck angeben.

## 7. Vollständige Coverage der verbleibenden 21 Textversionen

| Thema          | ID                         | Status dieser Runde                                              |
| -------------- | -------------------------- | ---------------------------------------------------------------- |
| Grenzen        | `dear`                     | geprüft; inhaltlich stark, Krisenhinweis #631-abhängig           |
| Grenzen        | `spiegeln-statt-aufsaugen` | geprüft; P2 Quellen-/Metapherstatus                              |
| Grenzen        | `bruecke-gelaender`        | geprüft; P2 Wirkungsgarantien                                    |
| Grenzen        | `4-arten-von-grenzen`      | geprüft; P2 Taxonomiebezeichnung                                 |
| Grenzen        | `grenzen-erkennen`         | geprüft; keine zusätzliche zwingende Einzelkorrektur             |
| Grenzen        | `lmk`                      | geprüft; P2 Recht/Zuständigkeit, #631-P1-Abhängigkeit            |
| Grenzen        | `grenzen-spickzettel`      | geprüft; P2 ältere Konsequenzlogik                               |
| Selbstfürsorge | `warnsignale`              | geprüft; P1 nicht validiertes Stufenmodell                       |
| Selbstfürsorge | `sauerstoffmaske`          | geprüft; P2 Wirkung/Instrumentalisierung                         |
| Selbstfürsorge | `stopp-technik`            | geprüft; keine zusätzliche zwingende Einzelkorrektur             |
| Selbstfürsorge | `energie-konto`            | geprüft; keine zusätzliche zwingende Einzelkorrektur             |
| Selbstfürsorge | `erlaubnis-karte`          | geprüft; Krisenhinweis #631-abhängig                             |
| Selbstfürsorge | `schuld-verantwortung`     | geprüft; P1 Ätiologie und moralische Binärlogik                  |
| Selbstfürsorge | `radikale-akzeptanz`       | geprüft; P2 Redundanz, Krisenhinweis #631-abhängig               |
| Genesung       | `garten`                   | geprüft; inhaltlich stark, P2 Redundanz und Perspektivenprüfung  |
| Genesung       | `genesung-zahlen`          | geprüft; Zahlen korrekt, P2 Abgrenzung zur persönlichen Recovery |
| Genesung       | `fortschritt-paradox`      | geprüft; P2 Quellenreichweite                                    |
| Genesung       | `remission-heilung`        | geprüft; keine zusätzliche zwingende Einzelkorrektur             |
| Genesung       | `5-faktoren-genesung`      | geprüft; P2 abgestimmte Behandlung/Medikamentenquelle            |
| Genesung       | `rolle-genesungsprozess`   | geprüft; P1 schweizerisch-rechtliche Pauschalisierung            |
| Soforthilfe    | `notfallplan-krise`        | klinisch geprüft; Architekturentscheid #631-abhängig             |

## 8. Empfohlener Erkenntnisweg

### Grenzen

1. Belastung und eigene Bedürfnisse wahrnehmen.
2. Den betroffenen Lebensbereich benennen.
3. Einen eigenen, machbaren Schutzschritt wählen.
4. Falls gewünscht und sicher: Bitte oder Grenze mit DEAR vorbereiten.
5. Kurze Beispiele nutzen; Metaphern nur als optionale Vertiefung.

### Selbstfürsorge

1. Belastung ohne starre Stufen beobachten.
2. Innere und äussere Entlastungsmöglichkeiten unterscheiden.
3. Eigenes Recht auf Bedürfnisse, Grenzen und Unterstützung sichtbar machen.
4. Eine freiwillige Momentübung anbieten.
5. Schuld und Akzeptanz differenziert vertiefen.

### Genesung

1. Remission, Alltag/Teilhabe und persönliche Recovery unterscheiden.
2. Verlaufszahlen mit ihren Grenzen einordnen.
3. Mögliche persönliche, soziale, materielle und professionelle Bedingungen
   zeigen.
4. Angehörigenrolle mit der Garten-Metapher entlasten.
5. Rechtliche und versorgungsbezogene Details erst nach Schweizer Freigabe
   ergänzen.

## 9. Quellen- und Prüfgrundlagen

- BAG, Berufs- oder Arztgeheimnis:
  https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis
- BAG, freie Einwilligung auf Behandlung oder Pflege:
  https://www.bag.admin.ch/de/freie-einwilligung-auf-behandlung-oder-pflege-nach-umfassender-aufklaerung
- NICE CG78, Borderline personality disorder:
  https://www.nice.org.uk/guidance/cg78/chapter/Recommendations
- NICE NG150, Supporting adult carers:
  https://www.nice.org.uk/guidance/ng150/chapter/Recommendations
- NICE NG225, Self-harm:
  https://www.nice.org.uk/guidance/ng225/chapter/recommendations
- APA Practice Guideline for Borderline Personality Disorder (2024):
  https://psychiatryonline.org/doi/full/10.1176/appi.ajp.24181010
- Gunderson et al. (2018), Borderline personality disorder:
  https://doi.org/10.1038/nrdp.2018.29
- Winsper (2018), Ätiologie:
  https://pubmed.ncbi.nlm.nih.gov/29182951/
- Zanarini et al. (2010), Zehnjahresverlauf:
  https://pubmed.ncbi.nlm.nih.gov/20395399/
- Opferhilfe Schweiz, Schutz:
  https://opferhilfe-schweiz.ch/de/was-ist-opferhilfe/schutz/

## 10. Offene menschliche Gates

1. Fachlich verantwortete Prüfung der Ätiologie-, Selbstfürsorge-, Grenzen- und
   Genesungsmodelle.
2. Schweizer rechtliche Prüfung von Urteilsfähigkeit, Minderjährigkeit,
   Vertraulichkeit, Vertretung, Sorge- und Versorgungspflichten.
3. Institutioneller Entscheid zu #631 und anschliessende Umsetzung von #641.
4. Unabhängige Gesamtstrecken-Prüfung durch mindestens eine Person mit eigener
   Borderline-Erfahrung und eine angehörige Person.
5. Nutzbarkeitstest mit erschöpften Angehörigen, besonders Ampel,
   Grenzreihenfolge und Materialauswahl.
6. Paritätsprüfung aller vorhandenen Web-, PDF-, WebP- und Thumbnail-Fassungen.
7. PDF-UA-/Matterhorn-, reale Druck-, VoiceOver-/NVDA- und weitere
   Nutzendentests.
8. Institutionelle Fach- und Publikationsfreigabe.

## 11. Nächster Review-Schritt

Mit Runde 4A sind alle 42 Textversionen gelesen. Als Nächstes folgt Runde 4B:
ein automatisierter und manueller Abgleich von Textversion, PDF, WebP und
Thumbnail derselben Assetfamilie. Danach werden die noch offenen
Informationsseiten aus Issue #630 geprüft und alle bestätigten Befunde in
getrennte, umsetzbare Folge-Issues überführt.
