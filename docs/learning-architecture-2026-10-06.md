# Redaktionelle Lernarchitektur · 06.10.2026

Bezug: [Issue #651](https://github.com/christaegger-dot/borderline-angehoerige/issues/651),
[Gesamtbefunde P2-A bis P2-G](../qa/website-review/gesamtbild-und-folgepakete-2026-10-06.md).
Diese Umsetzung ordnet Seiten, Übergänge, Erklärungsorte und ausgewählte Materialien.
Sie belegt keine fachliche Freigabe oder Wirksamkeit des Lernwegs. Ein realer
Tree-/Journey-Test mit Angehörigen, eine unabhängige Perspektive einer Person
mit Borderline-Erfahrung und ein erneuter Gesamtseitenreview bleiben offen.

## Ein gemeinsames Register

[learningArchitecture.ts](../client/src/content/learningArchitecture.ts) ist die
kanonische redaktionelle Konfiguration:

- `learningSteps`: Reihenfolge, Seitenfunktion, Lernziel, Grundthemen, freiwillige
  Vertiefungen, ein Basismodell und eine kleine Webtextauswahl pro Schritt.
- `canonicalTopics`: ein primärer Erklärungsort pro Kernthema und dessen Scope.
- `learningExtensions`: Funktion, Lernziel und Rückkehr der sechs inhaltlichen
  Vertiefungsseiten.
- `learningModels`: Klassifikation, Rolle, tatsächlicher Erklärungslink,
  Verwendungszweck, Grenze und Quellenrolle der 15 ausgewählten Modelle.
  `clinicalReview: "unknown"` bedeutet keine bekannte Freigabe dieses aktuellen
  Katalogeintrags; Quellenbezug und redaktionelle Auswahl ändern dies nicht.

[LearningPath.tsx](../client/src/components/LearningPath.tsx) rendert diese Daten.
Auch die Reihenfolge der sechs Hauptnavigationseinträge wird aus den
`learningSteps` abgeleitet. Es gibt keine zweite gepflegte Reihenfolgeliste in
den Seiten. Die nachfolgenden Tabellen erläutern den Scope dieses Stands; für
spätere Inhaltsänderungen ist das Register massgebend.

## Hauptstrecke und Seitenfunktion

| Schritt | Seite                       | Funktion und Lernziel                                                                                                                           |
| ------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1       | `/`                         | Orientierung: Zweck, Grenzen und passende Einstiege wählen; Information, eigene Beratung und Akuthilfe unterscheiden.                           |
| 2       | `/verstehen`                | Diagnose, individuelles Erleben und Kontext unterscheiden; keine Motive, Gefahr oder Rollen aus der Diagnose ableiten.                          |
| 3       | `/unterstuetzen/uebersicht` | Eigene Rolle klären: freiwillige Unterstützung, eigene Möglichkeiten und professionelle Zuständigkeiten unterscheiden.                          |
| 4       | `/kommunizieren`            | Anerkennen, nachfragen und eigene Sicht vertreten; Bereitschaft, Pausen und fehlende Wirkungsgarantie berücksichtigen.                          |
| 5       | `/grenzen`                  | Eigene Grenzen und Sicherheit wahren; Gesprächstechnik ersetzt keinen Schutz bei Bedrohung oder Gewalt.                                         |
| 6       | `/selbstfuersorge`          | Eigene Gesundheit und Unterstützung: Bedürfnisse und unspezifische Belastungszeichen wahrnehmen, bei Bedarf Abklärung und Hilfe suchen.         |
| 7       | `/genesung`                 | Unterschiedliche Verläufe, Remission und Lebensqualität einordnen; keine individuelle Prognose oder Verantwortung für fremde Genesung ableiten. |
| 8       | `/materialien`              | Nach Anliegen vertiefen, Quellen prüfen oder Unterstützung finden; die Strecke ist freiwillig und keine Prüfung.                                |

Alle acht Seiten beginnen mit einer sichtbaren Funktion und einem Lernziel und
enden mit demselben Navigator. `Schritt N von 8` bezeichnet die Position der
Seite, keinen erreichten Lernstand. Es werden keine Fortschrittsdaten gespeichert
und keine Erledigung, Risikostufe oder Kompetenz vergeben. «Weiter» und «Zurück»
folgen der Registerreihenfolge. Vertiefung, Beratung und Entlastung dürfen
jederzeit gewählt werden. `/soforthilfe` bleibt als direkte statische Hilfe
ausserhalb der Pflichtstrecke erreichbar.

## Vertiefungs- und Hilfeseiten

Diese Rollen begrenzen den Scope; sie sind kein pauschaler inhaltlicher
Freigabenachweis für alle Routen.

| Seiten                                                     | Rolle                                                                                                                                                                                                                   |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/verstehen/diagnostik`                                    | Fachliche Abklärung vertiefen; eigene Beobachtung ist keine Diagnose. Funktion, Lernziel und Rückkehr zu «Verstehen» sind eingebunden.                                                                                  |
| `/verstehen/beziehungen`                                   | Gegenseitige Deutungen und Reaktionen anhand von Beispielen betrachten; keine festen Rollen oder Motive. Gleiche Rückkehr zum Grundschritt.                                                                             |
| `/verstehen/begleiterkrankungen`                           | Weitere Beschwerden und alternative Erklärungen betrachten; keine automatische Diagnosezuordnung. Gleiche Rückkehr zum Grundschritt.                                                                                    |
| `/unterstuetzen/alltag`                                    | Freiwillige Rolle auf alltägliche Absprachen anwenden; Rückkehr zur Rollenklärung oder weiter zur Kommunikation.                                                                                                        |
| `/unterstuetzen/therapie`                                  | Behandlung, Einwilligung und freiwillige Mitwirkung unterscheiden; keine zweite allgemeine Rollentheorie. Gleiche Rückkehr zur Rollenklärung.                                                                           |
| `/unterstuetzen/krise`                                     | Schutz, professionelle Hilfe und eigene Handlungsmöglichkeiten in Krisen; keine obligatorische Zwischenstufe zwischen Alltag und Kommunikation. Gleiche Rückkehr zur Rollenklärung; Akuthilfe bleibt direkt erreichbar. |
| `/wegweiser`, `/selbsttest`                                | Alternative Einstiegshilfen nach Anliegen; keine Diagnostik, Gefährdungs- oder Belastungsbewertung.                                                                                                                     |
| `/uebungen`                                                | Freiwillige Anwendung von Gesprächsmöglichkeiten; keine Bewertung richtig reagierender Angehöriger.                                                                                                                     |
| `/faq`, `/glossar`, `/quellen`, `/buchempfehlungen`        | Fragen nachschlagen, Begriffe und Belege vertiefen; keine konkurrierende Hauptstrecke. Aussagebelege und ihre Reichweite werden separat geführt.                                                                        |
| `/beratung`, `/fachstelle`                                 | Eigene Unterstützung und Zugang zu Angeboten; keine «letzte Stufe», die erst nach Lesen erreicht werden darf.                                                                                                           |
| `/materialien/text/:handoutId`                             | Lesbare Vertiefungen; nicht alle Modelle sind zum Durcharbeiten nötig. Der Asset- und Textregisterstatus bleibt getrennt.                                                                                               |
| `/soforthilfe`                                             | Unmittelbarer Hilfszugang, unabhängig vom Lernweg.                                                                                                                                                                      |
| Herkunfts-, Rechts-, Feedback- und Barrierefreiheitsseiten | Rahmen, Verantwortlichkeit und Rückmeldung; keine didaktischen Stufen.                                                                                                                                                  |

Für die sechs inhaltlichen Vertiefungsseiten wurden eigene Lernziele und eine
einheitliche Rückkehr tatsächlich eingebunden. Die übrigen Hilfeseiten sind hier
funktional eingeordnet; dies behauptet keine vollständige neue Überarbeitung
aller ihrer Texte oder Abläufe.

## Kanonische Erklärungen und Wiederaufnahme

Das Register weist zwölf Kernthemen primären Zielorten zu. Diagnose und Erleben
werden unter «Verstehen» erklärt, die freiwillige Angehörigenrolle in der
Unterstützungsübersicht, Anerkennen ohne Zustimmung unter «Kommunizieren»,
Grenzbereiche und Schutz unter «Grenzen», eigene Belastungszeichen und
Unterstützung unter «Selbstfürsorge», Remission/Genesung unter «Genesung» und
Krisenunterstützung auf der Krisenseite. Akute Hilfe ersetzt kein anderer
Erklärungsort und bleibt über `/soforthilfe` erreichbar.

Wiederaufnahme darf eine kurze Erinnerung oder eine ausdrücklich bezeichnete
Anwendung sein. Konkrete Bereinigung in dieser Umsetzung:

- Die alten, seitenweise gepflegten Weiter-Blöcke wurden auf sechs Kernseiten
  und den drei Unterstützungsvertiefungen durch die gemeinsamen Übergänge
  ersetzt. Nach Genesung führt der Hauptweg zur Vertiefung, nicht zurück zur
  Unterstützungsübersicht. Alltag und Therapie führen nicht automatisch in die
  Krise.
- «Grenzen» enthält eine kurze Anwendung eigener Belastung auf eine Grenze und
  verweist für die ausführliche Einordnung auf
  `/selbstfuersorge#warnsignale`. Eine zweite Warnzeichenliste wurde entfernt;
  eine Grenze setzt keine Überlastung voraus.
- Die Beispiele freiwilliger Beiträge unter Genesung kennzeichnen sich als
  Anwendung der Rollenklärung und verlinken `/unterstuetzen/uebersicht#rolle`.
  Die Startseite verwendet für dieselbe Frage diesen kanonischen Zielort.
- Das Alarmbild auf der Verstehensseite ist explizit als didaktische Darstellung
  markiert. Modellgrenzen führen zum Katalog; Gesprächsbereitschaft und Pausen
  führen zur Anwendung unter `/kommunizieren#timing`.
- Die sechs Vertiefungen verlinken ihre kanonischen Grundthemen. Die Krisenseite
  bleibt eine eigenständige Sicherheitsanwendung, keine erneute allgemeine
  Einführung in Rollen, Kommunikation und Grenzen.

Sicherheitskritische Kurzangaben und Hinweise auf professionelle Hilfe werden
bewusst wiederholt. Nicht jede Wiederholung und nicht jedes historische Handout
wurde umgeschrieben. Eine vollständige kumulative Rollenbild- und
Redundanzprüfung braucht den offenen Gesamtseiten- und Perspektivenreview.

## Modellrollen und Materialauswahl

Je inhaltlichem Hauptschritt wird ein Basismodell benannt: Eisberg, Rollen und
Zuständigkeiten, Validierung, vier Grenzbereiche, Energie-Haushalt und Garten.
«Basis» ist eine redaktionelle Auswahl, kein höherer wissenschaftlicher
Evidenzstatus. Die Verwendung von «Garten» schliesst eine Pflegepflicht der
Angehörigen ausdrücklich aus. Die betroffene Person bestimmt ihre eigenen
Entscheidungen; beide Seiten dürfen Grenzen und Unterstützung wählen.

Die 15 Katalogeinträge unterscheiden einen begrenzten wissenschaftlichen
DBT-/Emotionsregulationsbezug, zwei DBT-bezogene klinische Gesprächsheuristiken
(Validierung und DEAR) sowie zwölf eigene didaktische Darstellungen. Alarmbild,
Anspannungskurve, Zustands-Landkarte und Pendel sind keine validierten
Messinstrumente. Sie erklären weder innere Motive noch Gesprächswunsch,
Gefährdung oder Zukunft zuverlässig. Weitere Bilder sind freiwillige
Vertiefungen oder Alternativen; sie bilden keine zusätzliche Diagnostik oder
obligatorische Modellkette. DEAR wird als vereinfachter DEAR-Teil von DEAR MAN
eingeordnet, nicht als vollständiges Verfahren oder Schutz bei Gewalt.

Der sichtbare Katalog unter `/materialien#modellkatalog` zeigt für jeden Eintrag
Klassifikation, Rolle, Zweck, Grenze, Quellenrolle, tatsächlichen Erklärungslink
und ausstehende fachliche Prüfung. Die Registerangabe `sources` verweist auf
kanonische Quellen-IDs unter `/quellen`; `sourceRole` trennt diese Bezugspunkte
von der redaktionellen Darstellung. Eine Fachquelle im Umfeld ist kein Beleg
für die Gültigkeit einer eigenen Grafik. Aussagegenaue Quellenprüfung wird in
der gesonderten Belegmatrix geführt.

Unter `/materialien#lernweg-materialien` werden elf vorhandene Webtexte nach
Lernschritt kuratiert. Der Einstiegsschritt benötigt kein Handout. Die volle
Bibliothek bleibt zusätzlich erreichbar. Die kuratierte Auswahl zeigt den
individuellen redaktionellen Entwurfsstatus von Energie-Konto und
Remission/Heilung. Sie verlinkt lesbare Textfassungen und publiziert keine
gesperrten PDFs oder Grafiken. Reale klinische, institutionelle, PDF-UA- und
Druckfreigaben werden dadurch nicht erteilt. Das technische
[Material-/Webtextregister](../qa/handout-asset-manifest.json) bleibt separat.

## Nachweise und offene Prüfungen

[learning-architecture.test.tsx](../client/src/__tests__/learning-architecture.test.tsx)
prüft die gemeinsame Reihenfolge, registrierte Routen, Wouter-Navigation vorwärts
und rückwärts, die Rückkehr aus Vertiefungen, echte kuratierte Webtexte,
sichtbaren Entwurfsstatus sowie Modellgrenzen und Erklärungspfade. Automatisierte
Browserprüfungen können zusätzlich sichtbare Ankerziele, Tastaturbedienung,
Responsive-Verhalten und technische Barrierefreiheit prüfen. Diese technischen
Nachweise sind getrennt von menschlichen Verständlichkeits- und
Perspektivenprüfungen zu berichten.

Offen bleiben reale Tree-/Journey-Tests mit Angehörigen, eine unabhängige
Erfahrungsperspektive einer Person mit Borderline, kumulative Rollenwirkung,
vollständiger Gesamtseitenreview und verantwortete fachliche Freigabe des
aktuellen Lernweg-/Modellkatalogs. Dafür wurden weder Erfolgsergebnisse noch
Teilnehmende oder klinische Freigaben erfunden.
