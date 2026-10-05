# Review Website Teil 1: Fachliche Prüfung Seite für Seite – Runde 1

Prüfstand: `main` @ `b675cd4` (05.10.2026), gerenderte Fassung aus dem lokalen
Build gelesen (inklusive aufgeklappter Elemente, Alt-Texte, Grafiktexte,
Quellenblöcke). Externe Links und Quellen konnten in der Prüfumgebung nicht
aufgerufen werden; alle Linkprüfungen sind deshalb «Prüfbedarf».

## Kontext

- **Website:** «Borderline · Hilfe für Angehörige», https://borderline-angehoerige.netlify.app, Repo `christaegger-dot/borderline-angehoerige`
- **Thema / Störungsbild:** Borderline-Persönlichkeitsstörung (DSM-5-TR) bzw. Persönlichkeitsstörung mit Borderline-Muster (ICD-11, 6D11.5)
- **Zielgruppe:** Angehörige erwachsener Menschen mit Borderline (Eltern, Partnerinnen und Partner, Geschwister, Freundinnen und Freunde); einzelne Inhalte für Eltern Jugendlicher und zu mitbetroffenen Kindern
- **Anrede:** Sie
- **Einsatz:** beides – selbständig gelesen und in der Beratung der Fachstelle empfohlen (Annahme aus dem Seiteninhalt)
- **Ziel:** Borderline einordnen, ohne Menschen auf eine Diagnose zu reduzieren; Unterstützung freiwillig und begrenzt gestalten; schwierige Gespräche führen; Grenzen setzen; die eigene Gesundheit schützen
- **Rahmen:** Schweiz, Kanton Zürich; Schweizer Hochdeutsch
- **Zuständigkeit:** Fachstelle Angehörigenarbeit, keine Krisenintervention; keine Krisennummern und kein Notfallblock in psychoedukativen Materialien; höchstens ein knapper Zuständigkeitsverweis ohne Nummern an fester Stelle
- **Quellenstandard:** zentrale Aussagen vollständig und aktuell belegt; bei rechtlich-administrativen Themen amtliche Primärquellen
- **Besonderes:** Die Website enthält eine eigene Krisenseite (`/soforthilfe`), einen Notfallkarten-Generator, einen Situations-Wegweiser für Krisen und einen «Soforthilfe»-Button in der Kopfzeile. Viele Seiten tragen Review-Badges («keine neue fachliche Freigabe»). Mehrere Handout-Druckfassungen sind zurückgehalten.
- **Widerspruch zur geltenden Repo-Governance:** Die Kontextvorgabe dieses Prüfauftrags widerspricht den aktuell gültigen Regeln in `docs/governance/01-redaktionelle-grundsaetze.md` (Abschnitt «Grenzen des Angebots»), `docs/governance/04-krisen-und-sicherheitsinhalte.md` (Pflicht «Verweis auf Soforthilfe») und `docs/governance/p1-sicherheits-und-kohaerenzpaket-2026-10-05.md` (zentral gepflegte 117/144, Webfassung der Notfallkarte). Befunde zu Krisenwegen und Notfallnummern (G-1 und die zugehörigen Seitenbefunde) messen die Website an der Kontextvorgabe. Umsetzen lassen sie sich erst, wenn ein dokumentierter Governance-Entscheid diese Regeln ausdrücklich ersetzt. Bis dahin sollen keine Krisenwege entfernt werden.

## 1. Seitenliste und Status

Reihenfolge der Navigation (Hauptnavigation, Ressourcen-Menü, Fusszeile).

| Nr. | Seite                                               | Pfad                             | Status                                                          |
| --: | --------------------------------------------------- | -------------------------------- | --------------------------------------------------------------- |
|   – | Kopf- und Fusszeile (auf jeder Seite)               | –                                | geprüft                                                         |
|   1 | Startseite                                          | `/`                              | geprüft                                                         |
|   2 | Borderline verstehen                                | `/verstehen`                     | geprüft                                                         |
|   3 | Diagnostik                                          | `/verstehen/diagnostik`          | geprüft                                                         |
|   4 | Begleiterkrankungen                                 | `/verstehen/begleiterkrankungen` | geprüft                                                         |
|   5 | Borderline und Beziehungen                          | `/verstehen/beziehungen`         | geprüft                                                         |
|   6 | Unterstützen – Übersicht                            | `/unterstuetzen/uebersicht`      | geprüft                                                         |
|   7 | Im Alltag unterstützen                              | `/unterstuetzen/alltag`          | geprüft                                                         |
|   8 | In der Krise unterstützen                           | `/unterstuetzen/krise`           | geprüft                                                         |
|   9 | Therapie und Angehörigenrolle                       | `/unterstuetzen/therapie`        | geprüft                                                         |
|  10 | Kommunizieren                                       | `/kommunizieren`                 | nicht geprüft                                                   |
|  11 | Grenzen                                             | `/grenzen`                       | nicht geprüft                                                   |
|  12 | Selbstfürsorge                                      | `/selbstfuersorge`               | nicht geprüft                                                   |
|  13 | Genesung                                            | `/genesung`                      | nicht geprüft                                                   |
|  14 | Notfallkarte                                        | `/notfallkarte/erstellen`        | nicht geprüft (Krisenorientierung, siehe G-1)                   |
|  15 | Situations-Wegweiser                                | `/wegweiser`                     | nicht geprüft                                                   |
|  16 | Inhalte finden                                      | `/selbsttest`                    | nicht geprüft                                                   |
|  17 | Materialien & Handouts                              | `/materialien`                   | nicht geprüft                                                   |
| 17a | 42 Handout-Textversionen                            | `/materialien/text/:id`          | nicht geprüft                                                   |
|  18 | Häufige Fragen                                      | `/faq`                           | nicht geprüft                                                   |
|  19 | Glossar                                             | `/glossar`                       | nicht geprüft                                                   |
|  20 | Buchempfehlungen                                    | `/buchempfehlungen`              | nicht geprüft                                                   |
|  21 | Quellen & Literatur                                 | `/quellen`                       | nicht geprüft (Einträge der geprüften Seiten unter 4. bewertet) |
|  22 | Beratung & Netzwerke                                | `/beratung`                      | nicht geprüft                                                   |
|  23 | Fachstelle & Kontakt                                | `/fachstelle`                    | nicht geprüft                                                   |
|   – | Therapieangebote Zürich                             | Anker auf Seite 9                | mit Seite 9 geprüft                                             |
|  24 | Über uns                                            | `/ueber-uns`                     | nicht geprüft                                                   |
|  25 | Impressum                                           | `/impressum`                     | nicht geprüft                                                   |
|  26 | Datenschutz                                         | `/datenschutz`                   | nicht geprüft                                                   |
|  27 | Barrierefreiheit                                    | `/barrierefreiheit`              | nicht geprüft                                                   |
|  28 | Feedback                                            | `/feedback`                      | nicht geprüft                                                   |
|  29 | Übungsszenarien (nur verlinkt, nicht in Navigation) | `/uebungen`                      | nicht geprüft                                                   |
|  30 | Soforthilfe (statische Seite)                       | `/soforthilfe`                   | Teil 1 nicht anwendbar (Krisenorientierung); Kontextbefund G-1  |

## 2. Befunde und Seiteninventar pro Seite

### Kopf- und Fusszeile (seitenübergreifend)

| Priorität                                 | Kriterium | Zitat                                                                                   | Problem                                                                                                                                                                                                                                                                                                                                                                                | Vorschlag                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------- | --------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| kritisch (gemessen an der Kontextvorgabe) | A         | «Soforthilfe – Notfallnummern und Krisenberatung» (Button in der Kopfzeile jeder Seite) | **G-1:** Verstoss gegen die Kontextvorgabe. Jede Seite bietet einen Notfallzugang an, der auf eine Seite mit Krisennummern führt; dazu gehören die Ressourcen-Gruppe «Sofortige Hilfe» (Notfallkarte, Situations-Wegweiser) und die Seite `/soforthilfe`. Die geltende Repo-Governance verlangt dagegen genau diese Wege (siehe Kontext, «Widerspruch zur geltenden Repo-Governance»). | Erst einen dokumentierten Governance-Entscheid herbeiführen, der die genannten Regeln ersetzt. Danach: Button entfernen, `/soforthilfe` und die Notfallkarte aus der psychoedukativen Website herauslösen und höchstens einen Zuständigkeitsverweis ohne Nummern in der Fusszeile belassen (Formulierung unter 3.). |
| wichtig                                   | A         | «Bei akuten Krisen zählen die Notfallnummern und der schnellste erreichbare Weg.»       | Verweist auf Notfallnummern statt auf die zuständigen Stellen. Der Satz «Für andere Regionen bitte lokale Notrufnummern nutzen» verstärkt den Krisenbezug.                                                                                                                                                                                                                             | Als einzigen Zuständigkeitsverweis umformulieren (siehe 3.).                                                                                                                                                                                                                                                        |

**Seiteninventar**

- Funktion: Navigation; Herkunft und Zweck der Website ausweisen.
- Kernaussagen: Website der Fachstelle Angehörigenarbeit, kein offizieller PUK-Kanal; ersetzt keine Beratung oder Therapie.
- Eingeführte Begriffe und Modelle: keine.
- Verwendet, aber nicht erklärt: keine.
- Handlungsempfehlungen: keine.
- Zahlen und Fakten: keine.
- Quellen: keine.
- Anlaufstellen und Verweise: Soforthilfe (Kopfzeile, 2 Links); Fusszeilenhinweis auf Notfallnummern.
- Verlinkungen: alle Hauptthemen, alle Ressourcen, Fachstelle, Über uns, Impressum, Datenschutz, Barrierefreiheit, Feedback.
- Grafiken und Tabellen: keine.

### 1 Startseite `/`

| Priorität | Kriterium | Zitat                                                                                     | Problem                                                                                                                                                                     | Vorschlag                                                                                |
| --------- | --------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| kritisch  | A         | «Akute Hilfe – Notruf und Krisenberatung – auch wenn Sie unsicher sind.»                  | Die erste von drei Einstiegskacheln führt zur Notfallnummern-Seite (G-1). Die Startseite stellt damit Krisenhilfe vor Psychoedukation.                                      | Kachel ersetzen, z. B. durch «Genesung verstehen» (siehe 3.).                            |
| wichtig   | A         | «Die Fachstelle ist kein Krisendienst. Bei akuter Gefahr oder Unsicherheit: Soforthilfe.» | Der Zuständigkeitshinweis ist knapp und nennt keine Nummern. Er verlinkt aber auf die Notfallnummern-Seite (G-1). Ob er zusätzlich zur Fusszeile stehen darf, prüft Teil 2. | Ohne Link: «… In akuten Krisen sind Notruf und psychiatrische Notfalldienste zuständig.» |
| optional  | B         | «Sie sind nicht allein für die Genesung eines anderen Menschen verantwortlich.»           | «Nicht allein» legt eine Teilverantwortung nahe. Andere Seiten sagen klar «nicht verantwortlich».                                                                           | «Sie sind nicht für die Genesung eines anderen Menschen verantwortlich.»                 |

**Seiteninventar**

- Funktion: Einstieg; zeigen, wo Angehörige anfangen können und dass sie selbst Beratung erhalten.
- Kernaussagen: Hilfe für Alltag und eigene Entlastung; die Fachstelle berät kostenlos und vertraulich, auch ohne Vollmacht; Mitgefühl und Selbstschutz gehören zusammen.
- Eingeführte Begriffe und Modelle: «Lernweg» (verstehen → einordnen → Warnzeichen → unterstützen → kommunizieren/Grenzen → Entlastung).
- Verwendet, aber nicht erklärt: «Borderline».
- Handlungsempfehlungen: Beratung nutzen; passende Inhalte finden; Grenzen klären.
- Zahlen und Fakten: keine.
- Quellen: keine.
- Anlaufstellen und Verweise: Fachstelle Angehörigenarbeit (058 384 38 00); Zuständigkeitshinweis «kein Krisendienst» mit Link Soforthilfe; Kachel «Akute Hilfe».
- Verlinkungen: `/soforthilfe` (2×), `/wegweiser`, `/verstehen`, `/selbsttest`, `/kommunizieren`, `/grenzen#grenzen-arten`, `/selbstfuersorge`, `/fachstelle`, `/materialien/text/kinder`, `/genesung#garten`, `/materialien`.
- Grafiken und Tabellen: keine.

### 2 Borderline verstehen `/verstehen`

| Priorität | Kriterium | Zitat                                                                                                                        | Problem                                                                                                                                                                                                                                                                                                  | Vorschlag                                                                                                                                              |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| kritisch  | A         | «Depression (häufigste Komorbidität, ca. 75–80 %)»                                                                           | Die Zahl hat auf der Seite keinen Beleg. Die Unterseite «Begleiterkrankungen» nennt keine Zahl. Häufigkeiten hängen stark von Stichprobe (klinisch oder Bevölkerung) und Zeitraum (Lebenszeit oder aktuell) ab.                                                                                          | Zahl mit Zanarini et al. (1998) abgleichen und mit Stichprobenangabe belegen, sonst streichen (siehe 3.).                                              |
| kritisch  | A         | «Offenes Ansprechen erhöht das Risiko nicht, sondern zeigt, dass Sie die Lage ernst nehmen und Hilfe einbeziehen.»           | Sicherheitsrelevante Kernaussage ohne Beleg; der Quellenblock nennt nur Storebø, Zanarini und Lamberti. Der Link «Mehr dazu auf Soforthilfe» führt zur Notfallnummern-Seite (G-1).                                                                                                                       | Leitlinien- oder Übersichtsbeleg angeben; Link auf Krisenbegleitung statt Soforthilfe (siehe 3.).                                                      |
| kritisch  | A         | «Viele Menschen mit Borderline haben traumatische Erfahrungen gemacht — das ist dokumentiert und klinisch relevant.»         | Die Seite behauptet «dokumentiert», nennt aber keine Quelle. Die im Quellenhinweis angekündigte «Komorbidität-Studie» fehlt im Quellenblock.                                                                                                                                                             | Quelle ergänzen; «viele, aber nicht alle» formulieren (siehe 3.).                                                                                      |
| kritisch  | A         | «Lamberti (2023) – Geschlechtsunterschiede bei Borderline (Scoping Review)» (Quelle zum Mythos «nur Frauen»)                 | Die Quellenangabe ist vermutlich fehlerhaft. Laut Codex-Review zu #628 verweist die PMID 36813014 auf eine andere Arbeit, und auch Zeitschrift und Artikelnummer passen nicht; der Titel entspricht einer Scoping-Review von Qian et al. (PLOS ONE, 2022). In der Prüfumgebung nicht selbst verifiziert. | Angabe an der Primärquelle prüfen und durch die korrekte Quelle ersetzen; bis dahin nicht als Beleg verwenden.                                         |
| wichtig   | A         | «Eine PTBS-Diagnose allein erklärt nicht die emotionale Dysregulation, das instabile Selbstbild oder die Beziehungsmuster …» | Die naheliegende Abgrenzung fehlt: Die komplexe PTBS (ICD-11, 6B41) umfasst gerade Affektregulationsstörung, negatives Selbstbild und Beziehungsschwierigkeiten. Für Angehörige ist das die häufigste Verwechslungsfrage.                                                                                | Komplexe PTBS nennen und die Abgrenzung fachlich formulieren (Prüfbedarf).                                                                             |
| wichtig   | A         | «Linehan, Cognitive-Behavioral Treatment … — Grundlagenwerk zu Emotionsregulation und Bindungsstress»                        | Linehan (1993) begründet das biosoziale Modell der Emotionsdysregulation, nicht «Bindungsstress». Die Quelle deckt die Aussagen zu Verlassenheitsstress und Bindungsstress nicht.                                                                                                                        | Beschreibung korrigieren; für Bindungs- und Verlassenheitsstress eine passende Quelle angeben.                                                         |
| wichtig   | A         | «Für eine Diagnose müssen Fachpersonen mehrere Merkmale über längere Zeit … beurteilen.» (Diagnostischer Überblick)          | Klassifikation nicht genannt. Die Liste ist eine verkürzte DSM-5-TR-Kriterienliste ohne Quelle. Wiederholtes suizidales Verhalten fehlt als Merkmal, «selbstschädigendes Verhalten» vermischt Impulsivität und Selbstverletzung.                                                                         | «Nach DSM-5-TR (bzw. ICD-11-Borderline-Muster) werden u. a. beurteilt: …» mit Quelle; suizidales und selbstverletzendes Verhalten als eigenes Merkmal. |
| wichtig   | A         | «Substanzgebrauch (Alkohol, Medikamente, illegale Substanzen)»                                                               | Eine Begleiterkrankung ist die Substanzgebrauchsstörung, nicht der Gebrauch. Die Unterseite verwendet den korrekten Begriff.                                                                                                                                                                             | «Störungen durch Substanzgebrauch (Alkohol, Medikamente, andere Substanzen)».                                                                          |
| wichtig   | A         | «Unter hoher emotionaler Überflutung verengt sich das Erleben häufig stark …»                                                | Mehrere zentrale Abschnitte haben keine Quelle: «Wenn Denken unter Stress enger wird», «Ursachen sind nie monokausal», «Diagnostischer Überblick», «Begleiterkrankungen».                                                                                                                                | Quellen den Abschnitten direkt zuordnen oder Aussagen als vereinfachtes Modell kennzeichnen.                                                           |
| wichtig   | C         | «Die Diagnose kann unter anderem intensive oder rasch wechselnde Gefühle … beschreiben.»                                     | Für Leserinnen und Leser unter Stress ist die Kernaussage schwer greifbar. Fast jeder Absatz relativiert («nicht bei allen», «nicht vorhersagbar», «auch ausserhalb»), konkrete Merkmale stehen erst im «Diagnostischen Überblick» am Seitenende.                                                        | Am Anfang 3–5 Kernmerkmale in einfachen Worten nennen; Relativierungen einmal bündeln statt in jedem Absatz.                                           |
| optional  | A         | Kicker «Borderline-Persönlichkeitsstörung»                                                                                   | Die Seite verwendet den DSM-5-TR-Begriff, die Quelle zitiert ICD-11 («Borderline-Muster»). Der Unterschied wird nicht erklärt.                                                                                                                                                                           | Einen Satz zu den Bezeichnungen ergänzen oder auf Diagnostik verweisen.                                                                                |
| optional  | D         | «Fragen Sie offen nach, wenn ein Gespräch möglich ist …» (Mythos Manipulation)                                               | Kein Formulierungsbeispiel.                                                                                                                                                                                                                                                                              | z. B. «Als du das gesagt hast, habe ich mich unter Druck gefühlt. Was wolltest du mir damit sagen?»                                                    |

**Seiteninventar**

- Funktion: Borderline als vielfältiges Störungsbild einordnen und Verhalten nicht vorschnell als Absicht deuten.
- Kernaussagen: Borderline zeigt sich individuell verschieden; aus Verhalten lassen sich keine sicheren Motive ablesen; Verstehen und Selbstschutz schliessen sich nicht aus.
- Eingeführte Begriffe und Modelle:
  - Borderline-Persönlichkeitsstörung: «komplexes Störungsbild … intensive oder rasch wechselnde Gefühle, Schwierigkeiten mit innerer Stabilität, Selbstbild oder Beziehungen»
  - Eisberg: «mögliche Verständnishilfe», keine Aussage darüber, was sicher «darunterliegt»
  - Alarmmodus: inneres Alarmsystem reagiert rasch und heftig
  - Tunnelblick: Argumente kommen kaum an
  - Dissoziation: «Unwirklichkeitsgefühle, innere Abspaltung»
  - Ursachen: «Zusammenspiel biologischer Empfindlichkeit, Bindungs- und Entwicklungserfahrungen sowie Belastungsfaktoren»
- Verwendet, aber nicht erklärt: Verlassenheitsstress, Bindungsstress, Validierung (Titel eines Quellenblocks), PTBS, Komorbidität, Remission (nur Glossarlink), DEAR-Technik (Linktext).
- Handlungsempfehlungen: offen nachfragen statt deuten; bei hoher Anspannung Pause und wenige Worte; bei Suizidsorge direkt fragen; Grenzen setzen; Hilfe von aussen einbeziehen.
- Zahlen und Fakten: Depression «ca. 75–80 %»; Frauen werden klinisch häufiger diagnostiziert.
- Quellen:
  - Diagnose und Klinik: ICD-11, APA 2024, Linehan 1993
  - Beziehungsmuster: Fruzzetti 2006, Hoffman 2005, Gunderson et al. 1997
  - Mythen: Storebø 2020, Zanarini 2012, Lamberti 2023
  - Ohne Beleg: Stress-Abschnitt, Ursachen, Trauma, Suizid-Ansprechen, Diagnostischer Überblick, Komorbiditätszahl
- Anlaufstellen und Verweise: Soforthilfe (Mythos Suizid).
- Verlinkungen: `/verstehen/beziehungen` (2×), `/glossar` (Dissoziation, Remission), `/genesung`, `/kommunizieren`, `/grenzen`, `/verstehen/begleiterkrankungen` (2×), `/soforthilfe`, `/verstehen/diagnostik`, Textversionen (leuchtturm, eisberg, spaltung, zustands-landkarte, alarm-modus, kinder, gehirn), `/materialien`, `/barrierefreiheit`, `/unterstuetzen/uebersicht`, `/selbsttest`.
- Grafiken und Tabellen: Eisberg-Illustration (sichtbares Verhalten und mögliche Kontexte); sieben Materialkarten, sechs davon mit Hinweis «Druckgrafik wird überarbeitet».

### 3 Diagnostik `/verstehen/diagnostik`

| Priorität | Kriterium | Zitat                                                                                                             | Problem                                                                                                                                                                                                                                                                                            | Vorschlag                                                                                                                                                                       |
| --------- | --------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| kritisch  | A         | «… wer befugt ist, eine Borderline-Persönlichkeitsstörung zu diagnostizieren …»                                   | Suggeriert eine rechtliche Befugnisregel, die der Text weder belegt noch beschreibt; er nennt nur, wer Abklärungen «häufig» durchführt. Die Grafik nennt andere Berufsgruppen als der Text («klinische Psycholog:innen» statt «Psychologische Psychotherapeut:innen»). Eine amtliche Quelle fehlt. | «… wer eine Abklärung üblicherweise durchführt»; Berufsbezeichnungen mit amtlicher Quelle (Psychologieberufegesetz, Medizinalberufegesetz) belegen; Text und Grafik angleichen. |
| wichtig   | A         | «Zuordnung nach ICD-11 («Borderline-Muster», Code 6D11.5)»                                                        | Ungenau: Nach ICD-11 wird eine Persönlichkeitsstörung mit Schweregrad (6D10) diagnostiziert, das Borderline-Muster (6D11.5) ist eine Zusatzangabe. In Schweizer Berichten erscheint oft noch ICD-10 (F60.31), was die Seite nirgends erwähnt.                                                      | Präzisieren und die ICD-10-Bezeichnung «emotional instabile Persönlichkeitsstörung, Borderline-Typ (F60.31)» nennen (Prüfbedarf: aktueller Kodierstand in der Schweiz).         |
| wichtig   | A         | Grafik: «Quellen: S3-Leitlinie Borderline-Persönlichkeitsstörung (DGPPN 2022, AWMF 038-015) · NICE CG78 (2009)»   | Die AWMF-Leitlinie ist seit 31.05.2026 abgelaufen (so auf der Quellen-Seite vermerkt). Die Grafik zeigt sie ohne Hinweis als aktuelle Grundlage.                                                                                                                                                   | Als datiert kennzeichnen oder ersetzen.                                                                                                                                         |
| wichtig   | A         | «… etwa bipolare Störungen, posttraumatische Belastungsstörungen, ADHS oder dissoziative Störungen»               | Die komplexe PTBS fehlt in der Differenzialdiagnostik, obwohl sie die wichtigste Abgrenzungsfrage ist (vgl. Seite 2).                                                                                                                                                                              | Ergänzen.                                                                                                                                                                       |
| wichtig   | C         | «Der Passende Inhalte finden auf dieser Site ist eine Orientierungshilfe …»                                       | Satz grammatisch defekt (Seitenname mechanisch eingesetzt); «Site» ist ein Anglizismus.                                                                                                                                                                                                            | «Die Seite «Passende Inhalte finden» ist eine Orientierungshilfe …».                                                                                                            |
| wichtig   | D         | «Klären Sie die Kostenübernahme bei der Fachstelle und Ihrer Versicherung vorab.»                                 | Mehrdeutig: Die Fachstelle Angehörigenarbeit ist für die Kosten einer Abklärung nicht zuständig.                                                                                                                                                                                                   | «… bei der abklärenden Stelle und bei der Krankenversicherung».                                                                                                                 |
| wichtig   | A         | «Bei akuter Gefahr … ist die Diagnose-Frage nachrangig. Dann zählt die Soforthilfe.»                              | Krisenverweis im Inhalt, verlinkt auf die Notfallnummern-Seite (G-1).                                                                                                                                                                                                                              | Ohne Link; Zuständigkeit benennen oder streichen.                                                                                                                               |
| optional  | A         | «Psychiater:innen mit FMH-Anerkennung Psychiatrie und Psychotherapie»                                             | Ungenaue Bezeichnung.                                                                                                                                                                                                                                                                              | «mit eidgenössischem Facharzttitel Psychiatrie und Psychotherapie» (Prüfbedarf).                                                                                                |
| optional  | A         | «… eine Erschöpfungsdepression, Angststörungen oder Schlafstörungen»                                              | «Erschöpfungsdepression» ist keine Diagnosebezeichnung.                                                                                                                                                                                                                                            | «… eine Depression, eine Angststörung oder anhaltende Schlafprobleme».                                                                                                          |
| optional  | C         | «besondere Vorsichtigkeiten in der Diagnose-Stellung»; «Borderline- Persönlichkeitsstörung»; «niedrig- gelassene» | Unidiomatisch; Trennfehler.                                                                                                                                                                                                                                                                        | «besondere Sorgfalt»; Trennfehler korrigieren.                                                                                                                                  |

**Seiteninventar**

- Funktion: Ablauf, Beteiligte und Bedeutung einer Borderline-Diagnose verstehen und Anlaufstellen im Kanton Zürich kennen.
- Kernaussagen: Eine Diagnose ist eine Beurteilung über Zeit, kein Einzeltest; sie erklärt weder Person noch Beziehung vollständig und darf hinterfragt werden; Beratung für Angehörige ist auch ohne Diagnose möglich.
- Eingeführte Begriffe und Modelle:
  - Anamnese
  - Strukturierte Interviews (SCID-5-PD, IPDE): «keine Selbstauskunft, sondern Fachgespräch»
  - Klassifikation nach ICD-11 (6D11.5) bzw. DSM-5-TR («mehrere Merkmale aus einer Liste»)
  - Differenzialdiagnostik («was IST Borderline») und Komorbidität («was MIT Borderline auftreten kann»)
- Verwendet, aber nicht erklärt: FMH, Berufsausübungsbewilligung, DBT, KJPP, Grundversicherung, Urteilsfähigkeit.
- Handlungsempfehlungen: Kontakt anregen, nicht erzwingen; nicht mit der Diagnose argumentieren; Beobachtungen statt Etikett; Zweitmeinung, wenn die Person sie möchte; eigene Beratung oder Therapie; Kosten vorab klären.
- Zahlen und Fakten: HYPE Züri ab 13 Jahren.
- Quellen:
  - Klassifikation und Verfahren: ICD-11, DSM-5-TR, SCID-5-PD, IPDE
  - Grafik: AWMF S3 2022, NICE CG78
  - Ohne Beleg: Berufsgruppen/Befugnis, Kostenübernahme, Diagnostik bei Jugendlichen
- Anlaufstellen und Verweise: PUK (Zentrale, Anmeldeformular), HYPE Züri, ipw, Sanatorium Kilchberg, Clienia Schlössli, PUK-Elterngruppe, Fachstelle Angehörigenarbeit; über Beratung: Stand By You, VASK Zürich; Hausärztin oder Hausarzt; Soforthilfe.
- Verlinkungen: Seitenanker, `/quellen`, `/glossar#term-komorbiditaet`, `/verstehen/begleiterkrankungen`, `/genesung`, `/soforthilfe`, `/selbstfuersorge`, `/beratung`, `/selbsttest`, `/verstehen`, `/unterstuetzen/therapie`; extern pukzh.ch, ipw.ch, sanatorium-kilchberg.ch, clienia.ch.
- Grafiken und Tabellen: «Den Weg zur Abklärung begleiten» – fünf Schritte mit Rolle der Angehörigen, Textversion vorhanden.

### 4 Begleiterkrankungen `/verstehen/begleiterkrankungen`

| Priorität | Kriterium | Zitat                                                                                                                       | Problem                                                                                                                                                               | Vorschlag                                                                                              |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| kritisch  | A         | Grafik: «Quellen: S3-Leitlinie … · Shah & Zanarini (2018)»                                                                  | Shah & Zanarini (2018) fehlt auf der Quellen-Seite und ist nicht nachvollziehbar. ADHS erscheint nur in der Grafik und ist nicht belegt.                              | Quelle vollständig aufnehmen und prüfen, ob sie ADHS deckt; sonst ADHS streichen.                      |
| kritisch  | A         | «Bei akuter Gefahr …: Soforthilfe — Notfallnummern und Anlaufstellen für die akute Situation.»                              | Notfallblock im Inhalt, der ausdrücklich Notfallnummern bewirbt (G-1); ein zweiter Verweis folgt («Bei Hinweisen auf Suizidalität → siehe Soforthilfe»).              | Durch psychoedukativen Verweis auf «Krisenbegleitung» ersetzen (siehe 3.).                             |
| wichtig   | A         | Text: «weitere Persönlichkeitsstörungen» – Grafik/Textversion: «ADHS»                                                       | Widersprüchliche Listen auf derselben Seite.                                                                                                                          | Eine belegte Liste verwenden.                                                                          |
| wichtig   | A         | «Sie ist eine eigenständige Erkrankungs-Komponente — Sie können sie nicht durch Ihr Verhalten verursachen oder verhindern.» | Zu absolut. Der Satz widerspricht der eigenen Aussage, dass Erkrankungen sich gegenseitig beeinflussen können; psychosoziale Belastungen wirken bei Depressionen mit. | Entlastend, aber fachlich haltbar formulieren (siehe 3.).                                              |
| wichtig   | A         | «… allen voran Zanarini-Verlaufsstudien — belegen sehr hohe Komorbiditätsraten zur Major Depression.»                       | Die Zanarini-Stichproben waren klinisch (stationär behandelte Personen). Die Raten lassen sich nicht auf alle Menschen mit Borderline übertragen.                     | «… in Studien mit behandelten Patientinnen und Patienten …».                                           |
| wichtig   | A         | Grafik: «S3-Leitlinie Borderline-Persönlichkeitsstörung (DGPPN 2022 …)»                                                     | Kein Hinweis «abgelaufen», während der Quellenblock derselben Seite «Gültigkeit abgelaufen» vermerkt.                                                                 | Angleichen.                                                                                            |
| optional  | A         | «Die Borderline-Erkrankung selbst ist nicht primär medikamentös behandelbar»                                                | Die Leitlinien empfehlen Psychotherapie als primäre Behandlung; «nicht behandelbar» klingt nach Unwirksamkeit.                                                        | «… wird nicht primär medikamentös behandelt».                                                          |
| optional  | D         | «Sorge ruhig ansprechen, ohne zu drängen oder zu drohen.»                                                                   | Kein Formulierungsbeispiel.                                                                                                                                           | «Mir fällt auf, dass du seit Wochen kaum noch rausgehst. Ich mache mir Sorgen. Wie geht es dir damit?» |
| optional  | B         | «Begleiterkrankungen sind weder eine zusätzliche «Strafe» …»                                                                | Führt einen Gedanken ein, den Leserinnen und Leser vermutlich nicht haben.                                                                                            | Streichen.                                                                                             |
| optional  | C         | «Borderline- Erkrankung»                                                                                                    | Trennfehler.                                                                                                                                                          | Korrigieren.                                                                                           |

**Seiteninventar**

- Funktion: Verstehen, dass weitere Diagnosen häufig sind, und wissen, dass Angehörige sie nicht selbst zuordnen müssen.
- Kernaussagen: Viele, aber nicht alle haben weitere Diagnosen; Depression ist die häufigste Begleiterkrankung und kann das Suizidrisiko erhöhen; Borderline wird nicht primär medikamentös behandelt, Begleiterkrankungen teils schon.
- Eingeführte Begriffe und Modelle: Komorbidität («gleichzeitig oder im Verlauf an mehreren Erkrankungen leidet»); depressive Episode im Unterschied zu kurzfristigen Stimmungswechseln.
- Verwendet, aber nicht erklärt: Major Depression, DBT/MBT/Schematherapie/TFP (nur Kürzel), integrierte und sequenzielle Behandlung.
- Handlungsempfehlungen: Beobachtungen benennen; Sorge ruhig ansprechen; fachliche Einschätzung anregen; eigene Beratung nutzen.
- Zahlen und Fakten: keine Prozentangaben; «sehr hohe Komorbiditätsraten zur Major Depression»; Begleiterkrankungen nehmen über Zeit oft ab.
- Quellen:
  - Komorbidität: Zanarini 1998, 2004
  - Krise und Medikation: APA 2024, Project Air, AWMF 2022
  - Grafik: AWMF 2022, Shah & Zanarini 2018
  - Ohne Beleg: ADHS, «eigenständige Erkrankungs-Komponente», Behandlungsreihenfolge
- Anlaufstellen und Verweise: Soforthilfe (2×), Krisenbegleitung, Fachstelle Angehörigenarbeit, Stand By You, VASK Zürich.
- Verlinkungen: Seitenanker, `/quellen`, `/soforthilfe` (2×), `/unterstuetzen/krise`, `/selbstfuersorge` (2×), `/beratung`, `/verstehen/diagnostik`, `/genesung`.
- Grafiken und Tabellen: Konstellation von sechs gleich grossen Begleiterkrankungen ohne Rangfolge, Textversion vorhanden.

### 5 Borderline und Beziehungen `/verstehen/beziehungen`

| Priorität | Kriterium | Zitat                                                                                                             | Problem                                                                                                                                        | Vorschlag                                                                                                                |
| --------- | --------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| wichtig   | A         | «Foxhall et al. (2019): Zurückweisungssensibilität … Leonards et al. (2024): Empathie …»                          | Fünf Studien nur als Kurzlabel, ohne Titel, Zeitschrift oder Link; sie stehen nicht auf der Quellen-Seite und sind keinen Aussagen zugeordnet. | Vollständig angeben, auf der Quellen-Seite aufnehmen und den Abschnitten zuordnen (Prüfbedarf: Existenz und Reichweite). |
| optional  | C         | «Ein verspäteter Rückruf …» / «Eine Nachricht bleibt länger unbeantwortet» / Bild «Person schaut auf ihr Telefon» | Drei verschiedene Beispiele für ein Modell erschweren das Nachvollziehen.                                                                      | Ein durchgehendes Beispiel verwenden.                                                                                    |

**Seiteninventar**

- Funktion: Wechselwirkungen in Beziehungen als Bedeutungsschleife verstehen und an Unterbrechungsstellen ansetzen, ohne Schuld zu verteilen.
- Kernaussagen: Ereignis, Bedeutung, Gefühl, Reaktion und Wirkung können sich wechselseitig verstärken; verengter Handlungsspielraum hebt Verantwortung nicht auf; Verstehen verpflichtet nicht, Übergriffe auszuhalten.
- Eingeführte Begriffe und Modelle:
  - Bedeutungsschleife mit fünf Stationen
  - «Beziehungsalarm» (Zurückweisungsempfindlichkeit)
  - «Vermutungen wie Gewissheiten» (Hypermentalisieren, Begriff nicht genannt)
  - Dissoziation als mögliche Erklärung
  - wechselseitiger Einfluss («keine mathematische Schuldteilung»)
- Verwendet, aber nicht erklärt: Regulation, Mentalisieren.
- Handlungsempfehlungen: Beobachtung, Deutung und Gefühl trennen; klären, ob Zuhören oder Lösen gewünscht ist; zugewandt und begrenzt bleiben; Verletzungen später bearbeiten; Unterstützung verteilen; Schutz vor Verstehen bei Gewalt.
- Zahlen und Fakten: keine.
- Quellen: APA 2024, NICE, Foxhall 2019, McLaren 2022, Cavicchioli 2021, Sutherland 2020, Leonards 2024 – alle nur als Kurzlabel ohne Zuordnung.
- Anlaufstellen und Verweise: professionelle Einschätzung bei Suizidgedanken (ohne Link, ohne Nummer).
- Verlinkungen: Seitenanker, `/kommunizieren`, `/unterstuetzen/uebersicht`, `/grenzen`.
- Grafiken und Tabellen: zwei Fotos (gemeinsame Momente; Person mit Telefon); interaktive Bedeutungsschleife mit fünf Schritten.

### 6 Unterstützen – Übersicht `/unterstuetzen/uebersicht`

| Priorität | Kriterium | Zitat                                                                                                           | Problem                                                                                                                           | Vorschlag                                                                                                                       |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| wichtig   | A         | «Hilfreiche Unterstützung zeigt sich nicht daran, dass alles ruhig wird, sondern an Veränderungen wie diesen …» | Die Seite hat keine einzige Quellenangabe, obwohl sie zentrale fachliche Aussagen zu Rolle, Ambivalenz und Familiendynamik macht. | Belege ergänzen, z. B. die auf der Website bereits geführten Quellen NICE CG78, Gunderson et al. (1997), Hoffman et al. (2005). |
| optional  | C         | «Verlässlichkeit, Konflikt-Repair und kleine Kontaktangebote»                                                   | Anglizismus.                                                                                                                      | «Wiedergutmachung nach Konflikten».                                                                                             |

**Seiteninventar**

- Funktion: die eigene Unterstützungsrolle freiwillig und begrenzt bestimmen.
- Kernaussagen: Unterstützung ist ein Angebot, keine Pflicht und nicht allmächtig; Ambivalenz ist Ausdruck langer Belastung; in bestimmten Lagen geht Schutz vor Unterstützung.
- Eingeführte Begriffe und Modelle: Ambivalenz; mehrere Angehörige mit unterschiedlichen Wünschen («Familiendynamik»).
- Verwendet, aber nicht erklärt: Regulation, Konflikt-Repair.
- Handlungsempfehlungen: Liste freiwilliger Angebote und Nicht-Aufgaben; transparente, anpassbare Absprachen unter Angehörigen; Betreuungsplan für Kinder.
- Zahlen und Fakten: keine.
- Quellen: keine.
- Anlaufstellen und Verweise: «professionelle Hilfe» allgemein; bei akuter Gefahr holen Erwachsene Hilfe (ohne Nummer).
- Verlinkungen: `/grenzen`, `/materialien/text/kinder`, sechs Materialien (Textversion und PDF), `/materialien`, `/unterstuetzen/alltag`, `/verstehen`, `/unterstuetzen/krise`, `/unterstuetzen/therapie`, `/selbstfuersorge`.
- Grafiken und Tabellen: sechs Materialvorschaubilder.

### 7 Im Alltag unterstützen `/unterstuetzen/alltag`

| Priorität | Kriterium | Zitat                                                                                                                                   | Problem                                                                      | Vorschlag                                                                |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| kritisch  | A         | «Für ein entlastendes Gespräch ist 143 rund um die Uhr da. Bei medizinischer Lebensgefahr rufst du 144, bei Gewalt oder Bedrohung 117.» | Krisennummern im psychoedukativen Inhalt (Verstoss gegen Kontextvorgabe).    | Nummern streichen (siehe 3.).                                            |
| wichtig   | A         | «Regelmässigkeit und angekündigte Änderungen entlasten oft stärker als spontane intensive Zuwendung.»                                   | Die Seite hat keine Quellenangaben, obwohl sie fachliche Wirkannahmen macht. | Belegen oder als Erfahrungswert kennzeichnen.                            |
| wichtig   | A         | «Bei akuter Gefahr oder Unsicherheit führt der direkte Weg zur Soforthilfe.»                                                            | Krisenverweis in der Kernaussagen-Box (G-1).                                 | Streichen; Kernaussage zur Alltagsunterstützung ersetzen.                |
| optional  | C         | «Fahren mit unter Einfluss stehender Person ablehnen»                                                                                   | Umständlich.                                                                 | «Nicht mitfahren, wenn jemand unter Alkohol- oder Drogeneinfluss fährt». |
| optional  | C         | «Drohen und nicht handeln» (hilft weniger)                                                                                              | Legt nahe, Drohen mit Handeln sei hilfreich.                                 | «Drohungen aussprechen».                                                 |
| optional  | C         | «Lass uns das in drei Tagen nochmal besprechen.»                                                                                        | Umgangssprachlich; in der Schweiz üblich ist «nochmals».                     | «nochmals».                                                              |
| optional  | B         | «die Emotionen Ihres Angehörigen dauerhaft regulieren»                                                                                  | Generisches Maskulinum.                                                      | «der anderen Person».                                                    |
| optional  | C         | Grafik «Beispiel für die eigene Anspannung» (Mo–Do, Basislinie)                                                                         | Achsen unbeschriftet; die Grafik trägt kaum über den Text hinaus.            | Erklären oder streichen.                                                 |

**Seiteninventar**

- Funktion: konkrete, freiwillige Alltagsschritte und eigene Entlastung finden.
- Kernaussagen: Verlässliche, anpassbare Absprachen statt ständiger Verfügbarkeit; nach Konflikten ein kurzes Kontaktangebot, ohne zu drängen oder zu strafen; bei riskanten Entscheidungen eigene Grenze statt Kontrolle.
- Eingeführte Begriffe und Modelle: Beziehungs-Achtsamkeit (innehalten, Lage lesen, sich wahrnehmen, begrenzt handeln); «positive Inseln».
- Verwendet, aber nicht erklärt: Trigger, Regulation.
- Handlungsempfehlungen: zahlreiche Formulierungsbeispiele und Dialoge; Verfügbarkeit begrenzen; Aufgaben abgeben; Konten getrennt halten; nicht mitfahren; Bedenkzeit einfordern; Sorge konkret und ohne Urteil benennen.
- Zahlen und Fakten: keine.
- Quellen: keine (nur «Dokumentierte Fachprüfung: 16.04.2026»).
- Anlaufstellen und Verweise: 143, 144, 117 im Dialog; Soforthilfe (Kernaussage); Krisenbegleitung; Beratung.
- Verlinkungen: `/selbstfuersorge#eigene-unterstuetzung`, `/unterstuetzen/krise` (3×), `/unterstuetzen/uebersicht`, `/grenzen`, `/selbstfuersorge`.
- Grafiken und Tabellen: schematische Kurve der eigenen Anspannung (Mo–Do) mit Basislinie.

### 8 In der Krise unterstützen `/unterstuetzen/krise`

Die Seite behandelt Krisen als Psychoedukation (Gesprächsführung, Nachbesprechung, Warnzeichen). Das ist zulässig. Die Befunde betreffen die Krisennummern und den Notfallblock.

| Priorität | Kriterium | Zitat                                                                                                                                               | Problem                                                                                                                                               | Vorschlag                                                                                             |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| kritisch  | A         | «Bei akuter Suizidgefahr: Rufen Sie sofort den Notruf 144 …» (Banner); «144 / 117» (Box); «PUK Kinder & Jugendliche (24/7) 058 384 66 66 …» (Liste) | Notfallblock mit Krisennummern an drei Stellen, dazu «Soforthilfe & Notfallnummern … 24/7-Hotlines» unter «Verwandt» (Verstoss gegen Kontextvorgabe). | Banner, Box, Nummernliste und Verwandt-Eintrag streichen; psychoedukative Inhalte bleiben (siehe 3.). |
| kritisch  | A         | «Hinweis: Direktes Fragen erhöht das Risiko nicht, sondern zeigt, dass Sie die Situation ernst nehmen.»                                             | Sicherheitsrelevante Aussage ohne Beleg auf der Seite.                                                                                                | Leitlinien- oder Übersichtsbeleg angeben.                                                             |
| wichtig   | A         | «Grundlage: NICE NG225 und CG78; redaktionelle Freigabeprüfung vom 20.09.2026.»                                                                     | Unvollständig (kein Titel, Jahr, Link); NG225 steht nicht auf der Quellen-Seite.                                                                      | Vollständig angeben und auf der Quellen-Seite aufnehmen.                                              |
| wichtig   | C         | «Bei Bedrohung bringen Sie sich in Sicherheit und informieren die Leitstelle.»                                                                      | «Leitstelle» ist ein deutscher Begriff; in der Schweiz heisst es Einsatz- oder Notrufzentrale.                                                        | «… und holen Hilfe».                                                                                  |
| wichtig   | B         | Überschrift «Früherkennung trainieren»                                                                                                              | Suggeriert einen Überwachungsauftrag, den der Text ausdrücklich verneint («Niemand muss eine Krise vorhersagen»).                                     | «Frühe Warnzeichen gemeinsam besprechen».                                                             |
| optional  | C         | «Eigene Mittel tragen noch / reichen knapp / reichen nicht mehr»                                                                                    | Unklar, wessen Mittel gemeint sind (Angehörige oder betroffene Person).                                                                               | «Ihre eigenen Mittel …».                                                                              |
| optional  | B         | «Sind Sie und Ihr Angehöriger sicher?»                                                                                                              | Generisches Maskulinum.                                                                                                                               | «… und die andere Person …».                                                                          |

**Seiteninventar**

- Funktion: in Krisen Sicherheit vorziehen, kurz und ruhig sprechen, Hilfe holen und danach gemeinsam nachbesprechen.
- Kernaussagen: Sicherheit vor Gespräch, Hilfe holen statt allein beurteilen; wenige Worte, Gefühle anerkennen, direkt nach Suizidgedanken fragen; nach der Krise Nachsorge klären und die eigene Erschütterung ernst nehmen.
- Eingeführte Begriffe und Modelle: drei Bereiche «Eigene Mittel tragen noch / reichen knapp / reichen nicht mehr» (ausdrücklich keine Sicherheitsbewertung); gemeinsame Nachbesprechung; Vertrauenswiederaufbau.
- Verwendet, aber nicht erklärt: Leitstelle, Notfallkarte (nur Verweis), Rettungsdienst.
- Handlungsempfehlungen: Sicherheit prüfen (Zugang zu Mitteln nur ohne Eigengefährdung und nach Anleitung begrenzen); Formulierungen; Liste «vermeiden»; Fragen zur Nachbesprechung; Betreuungsplan für Kinder.
- Zahlen und Fakten: keine (nur Telefonnummern).
- Quellen: NICE NG225, CG78 (pauschal für das Bereichsmodell).
- Anlaufstellen und Verweise: 144, 117, PUK-Notfalldienste nach Altersgruppe, Soforthilfe, Fachstelle, Selbsthilfegruppe, eigene Therapie, Rettungsdienst, Situations-Wegweiser.
- Verlinkungen: `tel:144`, `tel:117`, drei PUK-Nummern, `/soforthilfe` (2×), Seitenanker, `/materialien/text/kinder`, `/wegweiser` (2×), `/kommunizieren` (2×), `/unterstuetzen/therapie`.
- Grafiken und Tabellen: interaktives Bereichsmodell mit drei Bereichen.

### 9 Therapie und Angehörigenrolle `/unterstuetzen/therapie`

| Priorität | Kriterium | Zitat                                                                                                                 | Problem                                                                                                                                    | Vorschlag                                                                                           |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| kritisch  | A         | «Notfall-Nummern PUK Zürich (24/7)» mit drei Nummern                                                                  | Notfallblock mit Krisennummern (Verstoss gegen Kontextvorgabe).                                                                            | Block streichen.                                                                                    |
| wichtig   | A         | Rollen-Visualisierung, «Person in Behandlung», nicht zu erwarten: «Angehörige therapieren»                            | Fachlich sinnlos (offenbar aus der Rolle Therapeut/in kopiert).                                                                            | Streichen oder sinnvoll ersetzen.                                                                   |
| wichtig   | A         | «Der Therapeut … darf ohne Einwilligung Ihres Angehörigen keine Inhalte der Behandlung besprechen.»                   | Absoluter als der korrekte Abschnitt weiter oben («Einwilligung oder einer anderen Rechtsgrundlage»); widersprüchlich auf derselben Seite. | «… darf ohne Einwilligung oder andere Rechtsgrundlage keine Behandlungsinhalte weitergeben».        |
| wichtig   | A         | «DBT-Therapeutensuche … Therapeutensuche» (dachverband-dbt.de)                                                        | Deutsches Verzeichnis; der Schweizer Kontext ist nicht gewährleistet.                                                                      | Schweizer Suchweg prüfen und verlinken (Prüfbedarf, ob das Verzeichnis Schweizer Angebote enthält). |
| wichtig   | A         | «Grundlage: … S3-Leitlinie Borderline-Persönlichkeitsstörung (AWMF, 2022).»                                           | Ohne Hinweis «abgelaufen».                                                                                                                 | Kennzeichnen oder ersetzen.                                                                         |
| wichtig   | A         | «In der Schweizer Versorgungsrealität weniger verbreitet als DBT, aber als evidenzbasierte Therapie etabliert.» (TFP) | Versorgungsaussage ohne Beleg.                                                                                                             | Belegen oder streichen (Prüfbedarf).                                                                |
| wichtig   | A         | «Bei akuter Gefahr oder Unsicherheit: Soforthilfe.»; mehrfach «nutzen Sie die Notfallwege»                            | Krisenverweise im Inhalt, teils verlinkt auf die Notfallnummern-Seite (G-1).                                                               | Auf einen knappen Zuständigkeitshinweis ohne Link reduzieren (Anzahl prüft Teil 2).                 |
| optional  | C         | «… eine pauschale Wartefrist von einem Jahr gibt es dafür nicht.»                                                     | Widerlegt eine Annahme, die nirgends eingeführt wird.                                                                                      | Streichen.                                                                                          |
| optional  | B         | «Der Therapeut lädt mich nicht zur Sitzung ein»; «Erstkontakt mit dem Therapeuten»; «Angehörige/r», «Therapeut/in»    | Uneinheitliche, teils generisch maskuline Formen.                                                                                          | Einheitlich geschlechtergerecht.                                                                    |
| optional  | A         | «Psychoedukative Angehörigenprogramme wie Family Connections …»                                                       | Ob das Programm in der Schweiz angeboten wird, bleibt offen; das weckt Erwartungen.                                                        | Verfügbarkeit in der Schweiz angeben (Prüfbedarf).                                                  |

**Seiteninventar**

- Funktion: die eigene Rolle gegenüber dem Behandlungssystem klären, Informationswege und Schweigepflicht verstehen und Angebote im Kanton Zürich kennen.
- Kernaussagen: Die Behandlung liegt bei der Person und den Fachpersonen; Beobachtungen mitteilen ist nicht dasselbe wie Auskünfte erhalten (Schweigepflicht); eigene Beratung ist unabhängig davon möglich.
- Eingeführte Begriffe und Modelle:
  - drei Informationswege (Beobachtungen mitteilen, vertrauliche Auskünfte erhalten, eigene Beratung)
  - Therapieformen in je 1–2 Sätzen: DBT, MBT, Schematherapie, TFP, strukturierte generalistische Behandlung
  - Settings: ambulant, teilstationär, stationär
  - Family Connections
- Verwendet, aber nicht erklärt: Skills, Austrittsbericht, «andere Rechtsgrundlage», Vollmacht.
- Handlungsempfehlungen: Formulierungen für Anfragen an das Behandlungsteam; Musterbrief; Nachsorge-Zuständigkeiten klären; professionelle Dolmetschung verlangen; Kinder nicht dolmetschen lassen.
- Zahlen und Fakten: keine.
- Quellen:
  - Schweigepflicht und Anlaufstellen: BAG, PUK, Kanton Zürich
  - Therapieverfahren und Angehörigenprogramme: APA 2024, Storebø 2020, Bateman & Fonagy 2009, Linehan 2015, Hoffman 2005, Guillén 2021, Gunderson et al. 1997
  - Visualisierung: Linehan 1993, Gunderson & Hoffman 2005, AWMF 2022
- Anlaufstellen und Verweise: Fachstelle Angehörigenarbeit, HYPE Züri, PUK Station 62b, IPW, Clienia Schlössli, DBT-Dachverband (Deutschland), PUK-Notfallnummern, Soforthilfe.
- Verlinkungen: Seitenanker, `/fachstelle` (2×), extern BAG, PUK, Kanton Zürich, Clienia, dachverband-dbt.de, `/quellen`, `/beratung` (Linktext «Selbsthilfegruppen & Netzwerke»), `/soforthilfe`, `/unterstuetzen/krise` (2×), `/unterstuetzen/alltag`, `/genesung`.
- Grafiken und Tabellen: interaktive Rollen-Visualisierung (Angehörige, Therapeut/in, Person in Behandlung mit möglichen Beiträgen und Grenzen); Muster-E-Mail.

## 3. Umformulierungen für alle kritischen Stellen

Alle Umformulierungen, die Krisenverweise oder Notfallnummern betreffen, setzen den unter «Kontext» beschriebenen Governance-Entscheid voraus.

| Seite                         | Originaltext                                                                                                                                                        | Vorschlag                                                                                                                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kopfzeile                     | Button «Soforthilfe» (Notfallnummern und Krisenberatung)                                                                                                            | Entfernen.                                                                                                                                                                                                                       |
| Fusszeile                     | «Bei akuten Krisen zählen die Notfallnummern und der schnellste erreichbare Weg. … Für andere Regionen bitte lokale Notrufnummern nutzen.»                          | «Die Fachstelle Angehörigenarbeit berät Angehörige und bietet Psychoedukation, aber keine Krisenintervention. In akuten Krisen sind der Notruf, die psychiatrischen Notfalldienste und die behandelnden Fachpersonen zuständig.» |
| Startseite                    | Kachel «Akute Hilfe – Notruf und Krisenberatung – auch wenn Sie unsicher sind.»                                                                                     | Kachel «Genesung verstehen – Was sich über Zeit verändern kann und was nicht in Ihrer Hand liegt.» → `/genesung`                                                                                                                 |
| Verstehen                     | «Depression (häufigste Komorbidität, ca. 75–80 %)»                                                                                                                  | «Depression (eine der häufigsten Begleiterkrankungen; wie häufig, hängt von der untersuchten Gruppe ab)» – Zahl nur mit geprüfter Quelle und Stichprobenangabe.                                                                  |
| Verstehen                     | «Bei konkreter Sorge ist das Gegenteil hilfreicher: ruhig, klar und direkt fragen. Offenes Ansprechen erhöht das Risiko nicht … Mehr dazu auf Soforthilfe.»         | «Bei konkreter Sorge ist es hilfreich, ruhig und direkt nachzufragen. Nach heutigem Wissensstand erhöht das Nachfragen das Risiko nicht [Quelle]. Holen Sie dann fachliche Hilfe dazu. Mehr dazu unter Krisen begleiten.»        |
| Verstehen                     | «Viele Menschen mit Borderline haben traumatische Erfahrungen gemacht — das ist dokumentiert und klinisch relevant.»                                                | «Viele, aber nicht alle Menschen mit Borderline berichten von belastenden oder traumatischen Erfahrungen [Quelle].»                                                                                                              |
| Diagnostik                    | «… wer befugt ist, eine Borderline-Persönlichkeitsstörung zu diagnostizieren …»                                                                                     | «… wer eine Borderline-Abklärung üblicherweise durchführt …»                                                                                                                                                                     |
| Begleiterkrankungen           | Grafik «Quellen: S3-Leitlinie … · Shah & Zanarini (2018)»; Eintrag «ADHS»                                                                                           | «Quellen: Zanarini et al. (1998, 2004) [weitere nur mit vollständiger Angabe auf der Quellen-Seite]»; ADHS nur mit Beleg.                                                                                                        |
| Begleiterkrankungen           | «Bei akuter Gefahr oder Hinweisen auf konkrete suizidale Absicht: Soforthilfe — Notfallnummern und Anlaufstellen …»                                                 | «Suizidale Aussagen brauchen eine professionelle Einschätzung. Wie Sie eine Krise begleiten können, ohne sich selbst zu gefährden: Krisen begleiten.»                                                                            |
| Begleiterkrankungen (wichtig) | «Sie ist eine eigenständige Erkrankungs-Komponente — Sie können sie nicht durch Ihr Verhalten verursachen oder verhindern.»                                         | «Eine Depression entsteht aus vielen Faktoren. Sie sind nicht dafür verantwortlich und müssen sie nicht verhindern können.»                                                                                                      |
| Alltag                        | «Für ein entlastendes Gespräch ist 143 rund um die Uhr da. Bei medizinischer Lebensgefahr rufst du 144, bei Gewalt oder Bedrohung 117. Morgen früh melde ich mich.» | «Wenn es dir sehr schlecht geht, nutze die Hilfe, die wir für Krisen abgemacht haben. Morgen früh melde ich mich.»                                                                                                               |
| Krise                         | Banner «Bei akuter Suizidgefahr: Rufen Sie sofort den Notruf 144 …»; Box «144 / 117»; Liste der PUK-Notfallnummern                                                  | Streichen. Im Bereichsmodell genügt: «Wenn Sie sich um die Sicherheit einer Person sorgen, holen Sie professionelle Hilfe.»                                                                                                      |
| Krise                         | «Hinweis: Direktes Fragen erhöht das Risiko nicht …»                                                                                                                | Wortlaut beibehalten, Beleg direkt anfügen.                                                                                                                                                                                      |
| Therapie                      | «Notfall-Nummern PUK Zürich (24/7)» mit drei Nummern                                                                                                                | Streichen.                                                                                                                                                                                                                       |

## 4. Quellenprüfung

Allgemein: Keine Online-Quelle auf der Quellen-Seite trägt ein Abrufdatum. Kein Link konnte aufgerufen werden; alle Links sind «Prüfbedarf».

| Seite              | Quelle                                                                         | vollständig?                                         | aktuell?                         | deckt die Aussage?                | Bemerkung                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------- | -------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2, 3               | WHO (2019) ICD-11, Borderline pattern 6D11.5                                   | weitgehend (Link, kein Abrufdatum)                   | ja                               | ja                                | Version 2025-01 verlinkt                                                                                                                                           |
| 2, 4, 9            | APA Practice Guideline (Keepers et al. 2024), Am J Psychiatry 181(11)          | weitgehend                                           | ja                               | ja (Behandlung, Medikation)       | –                                                                                                                                                                  |
| 2                  | Linehan (1993), Guilford                                                       | ja                                                   | Grundlagenwerk                   | teilweise                         | deckt biosoziales Modell, nicht «Bindungsstress»                                                                                                                   |
| 2                  | Fruzzetti (2006), The High-Conflict Couple                                     | ja                                                   | älter                            | teilweise (Paar-Ratgeber)         | Prüfbedarf                                                                                                                                                         |
| 2, 9               | Hoffman et al. (2005), Family Connections, Family Process                      | nein (Jahrgang, Seiten, DOI fehlen)                  | durch Guillén 2021 ergänzt       | ja                                | vervollständigen                                                                                                                                                   |
| 2, 9               | Gunderson, Berkowitz & Ruiz-Sancho (1997)                                      | ja                                                   | älter                            | ja                                | –                                                                                                                                                                  |
| 2, 9               | Storebø et al. (2020), Cochrane                                                | ja                                                   | ja                               | ja                                | –                                                                                                                                                                  |
| 2                  | Zanarini et al. (2012), Am J Psychiatry                                        | nein (Jahrgang, Seiten fehlen)                       | ja                               | ja                                | vervollständigen                                                                                                                                                   |
| 2                  | «Lamberti (2023)», Comprehensive Psychiatry 124, 152420                        | nein, vermutlich fehlerhaft                          | –                                | nein, Zuordnung vermutlich falsch | Laut Codex-Review führt die PMID zu einer anderen Arbeit; der Titel entspricht Qian et al. (PLOS ONE, 2022). Nicht selbst verifiziert, an der Primärquelle prüfen. |
| 2                  | angekündigte «Komorbidität-Studie»                                             | –                                                    | –                                | fehlt                             | ergänzen                                                                                                                                                           |
| 2, 8               | Beleg «Ansprechen von Suizidgedanken erhöht das Risiko nicht»                  | –                                                    | –                                | fehlt                             | ergänzen                                                                                                                                                           |
| 3                  | APA (2022) DSM-5-TR                                                            | ja                                                   | ja                               | ja                                | –                                                                                                                                                                  |
| 3                  | First et al. (2017) SCID-5-PD                                                  | ja                                                   | ja                               | ja                                | –                                                                                                                                                                  |
| 3                  | Loranger (1999) IPDE                                                           | ja                                                   | für DSM-IV/ICD-10                | als Beispiel                      | ggf. als ältere Fassung kennzeichnen                                                                                                                               |
| 3, 4, 9 (Grafiken) | AWMF S3-Leitlinie BPS (2022)                                                   | ja                                                   | nein, abgelaufen seit 31.05.2026 | zum damaligen Stand               | in Grafiken ohne Hinweis                                                                                                                                           |
| 3 (Grafik)         | NICE CG78 (2009)                                                               | ja                                                   | überprüft 2024                   | ja                                | Quellen-Seite: Prüfbedarf, ob die DBT-Empfehlung korrekt eingeschränkt wiedergegeben ist                                                                           |
| 3                  | Berufsrecht (Psychologieberufegesetz, Medizinalberufegesetz, Anordnungsmodell) | –                                                    | –                                | fehlt                             | amtliche Primärquelle ergänzen                                                                                                                                     |
| 4                  | Zanarini et al. (1998)                                                         | ja                                                   | klassisch                        | ja (klinische Stichprobe)         | Stichprobe im Text benennen                                                                                                                                        |
| 4                  | Zanarini et al. (2004)                                                         | ja                                                   | ja                               | ja                                | –                                                                                                                                                                  |
| 4 (Grafik)         | Shah & Zanarini (2018)                                                         | nein (fehlt auf Quellen-Seite)                       | –                                | Prüfbedarf                        | ergänzen                                                                                                                                                           |
| 4                  | Project Air Strategy                                                           | teilweise (Jahr «laufend»)                           | Prüfbedarf                       | ja                                | Link prüfen                                                                                                                                                        |
| 5                  | Foxhall 2019, McLaren 2022, Cavicchioli 2021, Sutherland 2020, Leonards 2024   | nein (nur Kurzlabel)                                 | –                                | Prüfbedarf                        | vollständig angeben und zuordnen                                                                                                                                   |
| 5                  | APA 2024; NICE                                                                 | Kurzlabel ohne Link                                  | ja                               | ja                                | verlinken                                                                                                                                                          |
| 6, 7               | –                                                                              | –                                                    | –                                | keine Quellen                     | ergänzen                                                                                                                                                           |
| 8                  | NICE NG225; NICE CG78                                                          | nein (nur Kürzel; NG225 nicht auf der Quellen-Seite) | NG225 ja                         | ja für das Bereichsmodell         | ergänzen                                                                                                                                                           |
| 9                  | BAG: Berufs- oder Arztgeheimnis                                                | weitgehend (kein Abrufdatum)                         | Prüfbedarf                       | ja                                | amtliche Quelle                                                                                                                                                    |
| 9                  | Kanton Zürich: Anlaufstellen und Zweitmeinung                                  | weitgehend                                           | Prüfbedarf                       | ja                                | –                                                                                                                                                                  |
| 9                  | PUK Zürich: Informationen für Angehörige                                       | weitgehend                                           | Prüfbedarf                       | ja                                | –                                                                                                                                                                  |
| 9                  | Bateman & Fonagy (2009)                                                        | ja                                                   | ja                               | ja                                | –                                                                                                                                                                  |
| 9                  | Linehan (2015) DBT Skills Training Manual                                      | ja                                                   | ja                               | ja                                | –                                                                                                                                                                  |
| 9                  | Guillén et al. (2021)                                                          | ja                                                   | ja                               | ja                                | –                                                                                                                                                                  |
| 9 (Visualisierung) | Gunderson & Hoffman (2005)                                                     | ja                                                   | älter                            | ja                                | –                                                                                                                                                                  |

## 5. Seitenübergreifende Auffälligkeiten (nur notiert)

- **Krisenverweise und Notfallnummern:**
  - Kopfzeile auf jeder Seite (2 Links); Fusszeile
  - Seite 1: Kachel und Beratungsbox
  - Seite 2: Mythos Suizid
  - Seite 3: «Klare Grenze»
  - Seite 4: zwei Verweise
  - Seite 7: Kernaussage und Dialog mit 143/144/117
  - Seite 8: Banner, Box, Nummernliste, Verwandt
  - Seite 9: Beratungsbox, Nummernblock, mehrfach «Notfallwege»
  - Insgesamt verlinken 25 Quelldateien auf `/soforthilfe`.
- **Zuständigkeitshinweis:** «Die Fachstelle ist kein Krisendienst …» steht wortgleich auf den Seiten 1 und 9.
- **Governance-Test:** Er verlangt 117 und 144 in vier Handout-Textversionen. Zu `gespraeche-kippen`, `beispiel-dialog` und `pause-statt-streit` kam mit #627 auch `lmk` dazu. Das widerspricht der Kontextvorgabe und betrifft die Materialien der nächsten Runde.
- **Depression:** Seite 2 nennt «ca. 75–80 %», Seite 4 keine Zahl.
- **Listen der Begleiterkrankungen:**
  - Seite 2: fünf Einträge, ohne ADHS und ohne weitere Persönlichkeitsstörungen
  - Seite 4, Text: sechs Einträge mit weiteren Persönlichkeitsstörungen
  - Seite 4, Grafik: sechs Einträge mit ADHS
- **Diagnosebegriff:** Seite 2 «Substanzgebrauch», Seite 4 «Substanzgebrauchsstörung».
- **Bezeichnungen der Erkrankung:** «Borderline-Persönlichkeitsstörung», «BPS», «Borderline-Störung» (Seite 9, HYPE), «Borderline-Erkrankung», «Borderline-Muster».
- **Clienia Schlössli:** Seite 3 «Spezialisierte DBT-Station», Seite 9 «Weiterführendes stationäres Emotionsregulationsprogramm». HYPE Züri wird auf den Seiten 3 und 9 beschrieben.
- **Verantwortung:** Seite 1 «nicht allein … verantwortlich», Seiten 2 und 6 «nicht … verantwortlich».
- **Doppelte Inhalte:**
  - Die Aussage zum direkten Ansprechen von Suizidgedanken steht auf den Seiten 2 und 8.
  - Der Abschnitt «Wenn Kinder mitbetroffen sind» ist auf den Seiten 6 und 8 wortgleich.
  - Fachstellen-Boxen: «Sie müssen nicht warten …» auf den Seiten 3 und 4, «Beratung für Sie» auf den Seiten 1 und 9.
- **Reihenfolge Unterstützen:** Unternavigation Übersicht → Alltag → Krise → Therapie. «Weiter»-Links: Alltag → Krise, Therapie → Krise, Krise → Kommunizieren (zurück zu Therapie).
- **Linkbezeichnung:** «Selbsthilfegruppen & Netzwerke» (Seite 9), «Beratung & Netzwerke» (Navigation).
- **Gendern:** «:innen», «/in», Paarformen und generisches Maskulinum gemischt.
- **AWMF-Leitlinie 2022:** in Quellenblöcken als «abgelaufen» markiert, in Grafiken nicht.
- **Prüfvermerke:** Review-Badges mit unterschiedlichen Daten und dem Zusatz «keine neue fachliche Freigabe» (Seiten 3, 4, 5, 8); Seiten 7 und 9 nur «Dokumentierte Fachprüfung 16.04.2026».
- **Materialien auf Seite 2:** Sechs von sieben tragen den Hinweis «Druckgrafik wird überarbeitet».

## 6. Offene Prüfpunkte

1. **Grundsatzentscheid Krisenteile:** Wie sollen Kopfzeilen-Button, `/soforthilfe`, Notfallkarte, Situations-Wegweiser und die Handout-Ausnahmen mit 117/144 (inkl. `lmk` aus #627) mit der Kontextvorgabe in Einklang gebracht werden? Die geltende Repo-Governance (`docs/governance/01-redaktionelle-grundsaetze.md` (Abschnitt «Grenzen des Angebots»), `docs/governance/04-krisen-und-sicherheitsinhalte.md` (Pflicht «Verweis auf Soforthilfe») und `docs/governance/p1-sicherheits-und-kohaerenzpaket-2026-10-05.md` (zentral gepflegte 117/144, Webfassung der Notfallkarte)) verlangt diese Wege derzeit. Den Entscheid trifft die Institution, und er muss die Governance-Dokumente ausdrücklich ersetzen, bevor Krisenwege entfernt werden.
2. Häufigkeit der Depression bei Borderline: gegen Zanarini et al. (1998) prüfen, mit Stichprobe.
3. Belege für «Ansprechen von Suizidgedanken erhöht das Risiko nicht» und für die Häufigkeit traumatischer Erfahrungen.
4. Aktueller ICD-Kodierstand in der Schweiz (ICD-10-GM / ICD-11).
5. Schweizer Berufsrecht zur Diagnostik mit amtlicher Quelle (Psychologieberufegesetz, Medizinalberufegesetz, Anordnungsmodell nach KVG).
6. Existenz und Reichweite von Shah & Zanarini (2018) und der fünf Studien auf Seite 5; die Angabe «Lamberti (2023)» ist vermutlich fehlerhaft und an der Primärquelle zu korrigieren (Hinweis auf Qian et al., PLOS ONE 2022).
7. Abgrenzung Borderline und komplexe PTBS (ICD-11): fachliche Formulierung durch eine Fachperson.
8. Schweizer Suchweg für DBT-Therapeutinnen und -Therapeuten; Verfügbarkeit von Family Connections in der Schweiz.
9. Aktualität der Kontaktangaben: HYPE Züri «ab 13 Jahren», PUK Station 62b, Clienia Station A2, Telefonnummern.
10. Beleg für die Verbreitung von TFP in der Schweiz.
11. Alle externen Links (nicht aufrufbar in der Prüfumgebung).
12. Quellen-Seite: Wiedergabe der DBT-Empfehlung aus NICE CG78 (Einschränkung der Zielgruppe).

## 7. Fortsetzung

Die nächste Runde beginnt mit **Seite 10, «Kommunizieren» (`/kommunizieren`)**. Danach folgen Grenzen, Selbstfürsorge, Genesung, die Ressourcen-Seiten (Wegweiser, Inhalte finden, Materialien mit 42 Textversionen, FAQ, Glossar, Buchempfehlungen, Quellen, Beratung, Fachstelle), die Seiten der Fusszeile und die Übungsszenarien. Die Quellenprüfung (Abschnitt 4) und die seitenübergreifenden Auffälligkeiten (Abschnitt 5) werden fortgeführt.
