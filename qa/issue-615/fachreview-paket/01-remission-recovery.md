# 01 · Remission, Alltag und persönliche Recovery

## Gesperrter Kandidat

- ID / Version: `remission-heilung` / `puk-remission-recovery-v2`
- Dokumenttyp: Orientierungsblatt
- Basis-Commit: `1b806c27c8a52cbbabd7560c17f2f250a77256c3` (Reviewrunde 3)
- Text-Hash: `670a36d7fa2cf9965ab023fd7a45a3050ec283e2fc67b10b0bb7b79842fa6080`
- HTML-Hash: `7627521f5dbedc0ac8ba7d4987d94f16af806fcaeb587a1c14e612e593f97050`
- PDF-Hash: `129632ee0ff82238e8b00412b387d0710691ea93e9729fa1b666ded467dd52a6`
- WebP-Hash: `245d12bbc42b517d2fcb30bba14e7f35dd004478b2b1f3a1e2a337fa4b660218`
- Thumbnail-Hash: `9bae22b8a01bf8ecff5b642101f41684011b5d490507b6b9401eb3bfa857265b`

Zweck: unterschiedliche Bedeutungen von Remission, Alltag/Teilhabe und
persönlicher Recovery verständlich trennen, Hoffnung ermöglichen und weder
eine individuelle Prognose noch ein vorgeschriebenes Genesungsziel erzeugen.

## Ausfüllstatus: KI-Simulation

> Am 05.10.2026 wurden alle drei Perspektiven auf ausdrücklichen Wunsch des
> Repository-Inhabers durch eine KI (Claude) **simuliert**. Die Auswertung
> dient dem privaten Gebrauch. Es hat **keine** Fachperson, **keine** Person
> mit eigener Borderline-Erfahrung und **keine** angehörige Person geprüft.
> Alle Einträge sind KI-Einschätzungen und Vorschläge, keine menschlichen
> Entscheide. Rechtliche Hinweise sind keine Rechtsberatung. Die
> Quellen-Websites (WHO, NICE, AWMF) waren in der Prüfumgebung gesperrt;
> Quellenaussagen stützen sich auf die Vorprüfung in `quellen-und-aussagen.md`
> und den Wissensstand des Modells.

## Offene KI-Prüfhypothesen

Diese Einträge sind **keine bestätigten Befunde**. Die Spalte «Entscheid»
enthält den Vorschlag der KI-Simulation, keinen menschlichen Entscheid.

| ID    | vorgeschlagene Priorität | Stelle                    | Prüfhypothese                                                                                                                                    | Entscheid (KI-Simulation)                                                                                                                                          |
| ----- | ------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RR-01 | P2                       | «Diagnostische Remission» | Zanarini verwendet «symptomatische Remission». Prüfen, ob der Begriff quellennäher formuliert werden muss.                                       | annehmen: Titel «Symptomatische Remission» (Begriff der Verlaufsstudien), Erklärung «Diagnosekriterien nicht mehr erfüllt» beibehalten                             |
| RR-02 | P2                       | Quellenzeile              | Die CHIME-/Recovery-Stelle der AWMF-Leitlinie liegt in Kapitel 7.2, nicht 7.1.                                                                   | zurückgestellt: Kapitel 7.2 aus der Vorprüfung übernommen; Online-Abgleich war gesperrt                                                                            |
| RR-03 | P2                       | «Heilung»                 | Die Aussage zum uneinheitlichen wissenschaftlichen Endpunkt ist eine redaktionelle Einordnung und braucht Kennzeichnung oder spezifische Quelle. | annehmen: quellennah umformulieren, z. B. «In Studien und Leitlinien wird meist nicht von «Heilung» gesprochen, sondern von …»                                     |
| RR-04 | P2                       | PDF gegenüber Volltext    | Im PDF fehlte die Handlungsorientierung zu eigenen Grenzen und Unterstützungsbedarf. Prüfen, ob sie in Runde 2 den Sinn des Volltexts bewahrt.   | bestätigt, geschlossen: alle vier Handlungshinweise inkl. eigener Grenzen und Unterstützungsbedarf stehen im PDF-Hauptinhalt                                       |
| RR-05 | P3                       | Visualisierung            | Vier gleichwertige Felder können «Heilung» als vierte fachliche Ebene erscheinen lassen; drei Ebenen plus separater Begriffshinweis prüfen.      | annehmen, auf P2 hochgestuft: Kastentitel «Vier Begriffe» widerspricht dem Lead («drei Aspekte»); «Heilung» unnummeriert und visuell abgesetzt als Begriffshinweis |
| RR-06 | P2                       | Wortwahl                  | Prüfen, ob «Funktionsfähigkeit» unnötig defizitorientiert wirkt und «Alltag und Teilhabe» genügt.                                                | annehmen: «Funktionsfähigkeit» in Heilungskarte und Kernaussage durch «Alltag und Teilhabe» ersetzen; Begriffe blattweit vereinheitlichen                          |

## Verantwortete Fachprüfung

- Datum: 05.10.2026
- fachlich prüfende Person / Funktion: keine Person – KI-Simulation der Fachperspektive (Claude)
- alle vier Fassungen gemeinsam geprüft: [x] ja [ ] nein – Webtext, HTML, PDF-Textebene, WebP-Vollbild und Thumbnail (Thumbnail nur auf Übereinstimmung, Text dort nicht lesbar)

Häkchen = Kriterium aus Sicht der Simulation erfüllt; Kurzbegründung nach dem Pfeil.

- [ ] Remission, Alltag/Teilhabe und persönliche Recovery sind fachlich sauber getrennt. → in den drei Karten ja; Kernaussage und Heilungskarte führen mit «Funktionsfähigkeit» und «Lebensqualität» andere Begriffe ein (RR-06)
- [x] Langzeitdaten werden nicht als individuelle Prognose ausgelegt. → das Blatt nennt keine Zahlen oder Verläufe
- [x] Recovery bleibt selbstbestimmt; es gibt kein vorgeschriebenes Ziel oder Tempo. → ausdrücklich in Intro, Recovery-Karte und Handlungshinweisen
- [x] Rückschritte werden weder als Scheitern noch als Beleg fehlenden Willens gedeutet. → «Erneute Beschwerden … machen bereits erreichte Veränderungen nicht ungeschehen»
- [ ] Quellen tragen jede zentrale Aussage in der behaupteten Reichweite. → Begriff «diagnostische Remission» (RR-01) und Heilungsaussage (RR-03) offen; Kapitelangabe nicht online verifiziert (RR-02)
- [ ] PDF und Bildfassungen bewahren alle wesentlichen Einschränkungen des Volltexts. → Korrektur nach Codex-Review zu #626: Die ursprüngliche Angabe «PDF-Text entspricht dem Webtext vollständig» war falsch. Der Intro-Satz «Keiner dieser Begriffe bewertet den Wert eines Menschen …» fehlte im PDF; in Runde 3 als RR-08 behoben

Fachentscheid (KI-Simulation): [ ] freigegeben wie vorliegend [x] mit Auflagen [ ] Korrekturen erforderlich [ ] ausserhalb der Zuständigkeit

Begründung / Auflagen:

- Inhaltlich tragfähig, hoffnungsorientiert und ohne Prognoseversprechen.
- Auflagen: RR-01, RR-03, RR-05, RR-06 umsetzen; RR-02 bei Quellenzugriff abgleichen.

## Unabhängige Perspektive: eigene Borderline-Erfahrung

- Datum: 05.10.2026
- prüfende Rolle/Perspektive: keine Person – KI-Simulation dieser Perspektive (Claude); ersetzt keine gelebte Erfahrung
- [x] Wirkt das Blatt hoffnungsvoll, ohne Genesungs- oder Leistungsdruck zu erzeugen? → ja; «Besserung ist möglich» ohne Zeit- oder Zielvorgabe
- [x] Bleiben Ziele, Tempo und Bedeutung von Veränderung bei der betroffenen Person? → ja, mehrfach ausdrücklich
- [ ] Entstehen keine Bewertungen des Menschen durch Diagnose, Arbeit, Beziehungen oder Funktionsfähigkeit? → «Funktionsfähigkeit» klingt nach Leistungsmassstab (RR-06); sonst respektvoll
- [x] Ist die Unterscheidung alltagsnah und emotional anschlussfähig? → ja; «geheilt oder für immer krank» greift ein reales Schwarz-Weiss-Erleben auf

Entscheid (KI-Simulation): [ ] stimmig [x] stimmig mit Hinweisen [ ] Korrekturen erforderlich

Rückmeldung:

- Entlastend, dass Remission nicht mit «alles gut» gleichgesetzt wird und Rückfälle nichts entwerten.
- Häufiges Nachfragen kann selbst Druck erzeugen; siehe RR-07.

## Unabhängige Angehörigenperspektive

- Datum: 05.10.2026
- prüfende Rolle/Perspektive: keine Person – KI-Simulation dieser Perspektive (Claude); ersetzt keine gelebte Erfahrung
- [x] Hilft die Unterscheidung, Veränderung und Rückschritte realistisch einzuordnen? → ja; drei Ebenen erklären, warum sich nicht alles gleichzeitig ändert
- [x] Entsteht kein Auftrag, Tempo, Ziele oder Genesung zu überwachen? → ja; «Vermeiden Sie Vorgaben von aussen»
- [x] Werden die eigenen Grenzen und der eigene Unterstützungsbedarf ausreichend sichtbar? → ja, auch im PDF (RR-04)
- [x] Ist klar, was Angehörige aus dem Blatt praktisch mitnehmen können? → ja; vier konkrete Hinweise, Überschrift siehe G-01

Entscheid (KI-Simulation): [ ] stimmig [x] stimmig mit Hinweisen [ ] Korrekturen erforderlich

Rückmeldung:

- Gut verständlich und entlastend.
- Die Überschrift «Ein nächster Schritt» passt nicht zu vier Hinweisen (blattübergreifend G-01 in `06-befundauswertung.md`).

## Einzelbefunde

Neue Befunde aus der Simulation; die Entscheide zu den Prüfhypothesen oben
stehen in der Tabelle «Offene KI-Prüfhypothesen».

| ID    | Perspektive                          | Priorität | Fassung / Stelle                   | Beobachtung und Relevanz                                                                                     | Korrekturvorschlag                                                                                             | Entscheid            | Nachprüfung                              |
| ----- | ------------------------------------ | --------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------- |
| RR-07 | Borderline-Erfahrung (KI-Simulation) | P3        | Handlungshinweis 2, alle Fassungen | Wiederholtes Nachfragen nach «bedeutsamen Veränderungen» kann selbst als Kontrolle oder Druck erlebt werden. | «Fragen Sie – wenn die Person darüber sprechen möchte –, welche Veränderungen für sie selbst bedeutsam sind …» | annehmen (Vorschlag) | nach Neuerzeugung Text- und PDF-Abgleich |

Blattstatus Runde 2 (KI-Simulation, historisch): [ ] bereit für nachgelagerte technische Prüfungen [x] erst nach Auflagen bereit [ ] nicht bereit

## Nachprüfung Reviewrunde 3 (KI-Simulation)

Die Korrekturen sind in `2fb8367` umgesetzt, zwei Nachbesserungen aus dem
Codex-Review zu #626 in `1b806c2`. Der Stand ist mit Basis-Commit `1b806c2`
in `review-basis.json` als Reviewrunde 3 gesperrt; die Prüfsummen oben
gelten für diesen Stand. Die
Entscheide der Runde 2 bleiben als Verlauf stehen. Auf Wunsch des
Repository-Inhabers wurden die angenommenen Befunde umgesetzt. Nachgeprüft
hat erneut die KI-Simulation, kein Mensch: automatisierter Abgleich von
Webtext und PDF-Textebene sowie Sichtkontrolle des WebP-Vollbilds.

| Befund | Umsetzung                                                                                                                                        | geprüfte Fassungen  | Ergebnis                |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ----------------------- |
| RR-01  | Titel und Definition «Symptomatische Remission»                                                                                                  | Web, PDF-Text, WebP | geschlossen             |
| RR-03  | Heilung quellennah: «Studien und Leitlinien sprechen meist nicht von «Heilung» …»                                                                | Web, PDF-Text, WebP | geschlossen             |
| RR-05  | Kastentitel «Drei Blickwinkel – und ein Begriff zur Einordnung»; Heilung unnummeriert, gestrichelt abgesetzt                                     | Web, PDF-Text, WebP | geschlossen             |
| RR-06  | «Funktionsfähigkeit» durch «Alltag und Teilhabe» ersetzt; Kernsatz vereinheitlicht                                                               | Web, PDF-Text, WebP | geschlossen             |
| RR-07  | «Fragen Sie – wenn die Person darüber sprechen möchte – …»                                                                                       | Web, PDF-Text, WebP | geschlossen             |
| G-01   | Überschrift «Mögliche nächste Schritte»                                                                                                          | Web, PDF-Text, WebP | geschlossen             |
| RR-08  | Codex-Review zu #626: Kernsatz ergänzt um «… oder bewertet den Wert eines Menschen», damit die Einschränkung aus dem Web-Intro auch im PDF steht | Web, PDF-Text, WebP | geschlossen (`1b806c2`) |

Weiterhin offen:

- RR-02 (P2, zurückgestellt): Kapitelangabe AWMF 7.2 bei Quellenzugriff abgleichen.

Perspektiven-Nachprüfung:

- Fach (Simulation): Auflagen erfüllt; RR-02 bleibt als Quellenabgleich offen.
- Borderline-Erfahrung (Simulation): «Funktionsfähigkeit» entfernt; Nachfragen ausdrücklich freiwillig.
- Angehörige (Simulation): Überschrift passt jetzt zu mehreren Hinweisen.

Blattstatus Runde 3 (KI-Simulation): [x] bereit für nachgelagerte technische
Prüfungen [ ] erst nach Auflagen bereit [ ] nicht bereit
