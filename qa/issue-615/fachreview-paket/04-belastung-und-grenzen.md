# 04 · Belastung wahrnehmen, Grenzen prüfen

## Gesperrter Kandidat

- ID / Version: `grenzen-erkennen` / `puk-grenzen-ueberlastung-v2`
- Dokumenttyp: Orientierungsblatt
- Basis-Commit: `1b806c27c8a52cbbabd7560c17f2f250a77256c3` (Reviewrunde 3)
- Text-Hash: `620d7ed3d638db6e1a630af9c7c03712b1a1d33aa6fe57b90608fd258bd6c03f`
- HTML-Hash: `0038373e21565ffc6e7d0ca0589e77b769dd14fad9fa951bda0e67702a9ecbd7`
- PDF-Hash: `98dbed3bcf17cfe6aedfb914c82be130d03ed1206c7faaedaa5d869cbb9325af`
- WebP-Hash: `0643218d50815f530606eb37cd8bbe6dfd403e54c25b729d472058395a1f9a1c`
- Thumbnail-Hash: `69bd8f514791348760d8e65193af75d74faf3c67a34fbe0c472674457726a64b`

Zweck: unspezifische Anzeichen eigener Belastung wahrnehmen, ohne Diagnose,
Ursachenzuschreibung oder Beweis einer Grenzverletzung, und einen passenden
nächsten Entlastungsschritt prüfen.

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

| ID    | vorgeschlagene Priorität | Stelle                 | Prüfhypothese                                                                                                                                                                                    | Entscheid (KI-Simulation)                                                                                                                                                                                                                                                                                                                     |
| ----- | ------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BG-01 | P1                       | PDF gegenüber Volltext | Der Sicherheitshinweis zur medizinischen Abklärung fehlte im PDF. Prüfen, ob er in Runde 2 knapp, verständlich und nicht alarmistisch integriert ist.                                            | bestätigt, geschlossen: Abklärungshinweis steht im PDF-Hauptinhalt, knapp und nicht alarmistisch                                                                                                                                                                                                                                              |
| BG-02 | P1                       | Symptomliste / Quellen | WHO und NG150 tragen mehrere Beispiele nicht direkt; insbesondere flache Atmung, Müdigkeit, Traurigkeit, innere Leere und Katastrophengedanken brauchen engere Formulierung oder weitere Quelle. | annehmen, auf P2 herabgestuft (als Beispiele und eigene Zusammenstellung gekennzeichnet, keine Falschaussage): Liste näher an die WHO-Beispiele führen, z. B. Körper «Anspannung, Schlafprobleme, Magenbeschwerden, Kopf- oder andere Schmerzen, ungewöhnliche Müdigkeit»; Gedanken «ständiges Grübeln oder Sorgen, Konzentrationsprobleme …» |
| BG-03 | P2                       | «innere Leere»         | Auf einer Borderline-Seite kann der Begriff Angehörigenbelastung mit einem Diagnosemerkmal vermischen.                                                                                           | annehmen: «innere Leere» streichen (chronische Leere ist ein Diagnosekriterium der Borderline-Störung); z. B. «Niedergeschlagenheit»                                                                                                                                                                                                          |
| BG-04 | P2                       | Ursachenrahmung        | Noch deutlicher machen, dass die Signale die lesende Person betreffen und nicht beweisen, dass die erkrankte Person sie verursacht hat.                                                          | annehmen: Kernsatz ergänzen, z. B. «Belastung hat oft mehrere Ursachen – auch Arbeit, Finanzen oder die eigene Gesundheit.»                                                                                                                                                                                                                   |
| BG-05 | P2                       | Kategorie «Erholung»   | Erholung ist eher Bedürfnis als gleichartiger Signalbereich; «Erholungsbedarf und Bedürfnisse» prüfen.                                                                                           | annehmen, auf P3 herabgestuft: Karte «Erholungsbedarf» statt «Erholung»                                                                                                                                                                                                                                                                       |
| BG-06 | P2                       | Quellenjahr            | Die WHO-Seite ist auf den 30.03.2026 datiert; dieses Datum wurde in Runde 2 sichtbar präzisiert.                                                                                                 | zurückgestellt: Datum der WHO-Seite nicht online verifizierbar (gesperrt)                                                                                                                                                                                                                                                                     |

## Verantwortete Fachprüfung

- Datum: 05.10.2026
- fachlich prüfende Person / Funktion: keine Person – KI-Simulation der Fachperspektive (Claude)
- alle vier Fassungen gemeinsam geprüft: [x] ja [ ] nein – Webtext, HTML, PDF-Textebene, WebP-Vollbild und Thumbnail (Thumbnail nur auf Übereinstimmung, Text dort nicht lesbar)

Häkchen = Kriterium aus Sicht der Simulation erfüllt; Kurzbegründung nach dem Pfeil.

- [ ] Alle Beispiele sind fachlich plausibel und in ihrer Reichweite belegt. → plausibel, aber nicht alle durch WHO/NG150 getragen (BG-02)
- [x] Kein Signal gilt als Diagnose, Beweis einer Grenzverletzung oder eindeutige Ursache. → mehrfach ausdrücklich ausgeschlossen
- [x] Medizinische Sicherheitsabklärung ist knapp, nicht alarmistisch und in allen eigenständigen Fassungen sichtbar. → ja (BG-01)
- [ ] Äussere und strukturelle Belastungen werden ausreichend mitgedacht. → nur indirekt (BG-04)
- [x] Das Blatt fördert keine Selbstdiagnostik oder Hypervigilanz. → Rahmung «Hinweise, keine Diagnose» trägt
- [x] Angehörige werden validiert, ohne als «zu wenig belastbar» beschrieben zu werden. → «Erschöpfung ist kein persönliches Versagen»

Fachentscheid (KI-Simulation): [ ] freigegeben wie vorliegend [x] mit Auflagen [ ] Korrekturen erforderlich [ ] ausserhalb der Zuständigkeit

Begründung / Auflagen:

- Auflagen: BG-02, BG-03, BG-04 und BG-07 (Hinweis auf Unterstützung und Krisenkontakt).
- BG-06 bei Quellenzugriff abgleichen.

## Unabhängige Perspektive: eigene Borderline-Erfahrung

- Datum: 05.10.2026
- prüfende Rolle/Perspektive: keine Person – KI-Simulation dieser Perspektive (Claude); ersetzt keine gelebte Erfahrung
- [x] Entsteht nirgends die Botschaft «Borderline macht Angehörige krank»? → ja; die erkrankte Person kommt im Blatt nicht vor
- [ ] Bleibt die individuelle und strukturelle Ursache von Belastung offen? → offen, aber nicht benannt; auf einer Borderline-Seite liegt die Zuschreibung nahe (BG-04)
- [ ] Werden diagnostisch aufgeladene Begriffe vermieden oder erklärt? → «innere Leere» ist ein Borderline-Kriterium (BG-03)
- [x] Wirkt die Selbstbeobachtung respektvoll und nicht wie eine Gefahrenliste über eine andere Person? → ja, konsequent auf die lesende Person bezogen

Entscheid (KI-Simulation): [ ] stimmig [ ] stimmig mit Hinweisen [x] Korrekturen erforderlich

Rückmeldung:

- «Innere Leere» als Belastungszeichen von Angehörigen auf einer Borderline-Seite vermischt die Perspektiven und kann verletzend wirken (BG-03).
- Sonst respektvoll, weil die erkrankte Person nicht als Ursache benannt wird.

## Unabhängige Angehörigenperspektive

- Datum: 05.10.2026
- prüfende Rolle/Perspektive: keine Person – KI-Simulation dieser Perspektive (Claude); ersetzt keine gelebte Erfahrung
- [x] Ist klar, dass dies Selbstbeobachtung und kein Test ist? → ja; «kein Test» steht nur im Webtext, «keine Diagnose» auch im PDF
- [x] Fühlen Sie sich mit Belastung ernst genommen, ohne Schuld- oder Versagensrahmen? → ja
- [ ] Hilft das Blatt, einen nächsten Entlastungsschritt zu wählen? → es stellt die richtigen Fragen, nennt aber keine Anlaufstelle (BG-07)
- [x] Ist verständlich, wann medizinische Abklärung sinnvoll ist? → ja: «neue, starke oder anhaltende» Beschwerden

Entscheid (KI-Simulation): [ ] stimmig [x] stimmig mit Hinweisen [ ] Korrekturen erforderlich

Rückmeldung:

- Validierend; die Verhaltensbeispiele (dauernde Erreichbarkeit, Aufschieben eigener Bedürfnisse) sind sehr wiedererkennbar.
- Es fehlt, wohin man sich wenden kann (BG-07).

## Einzelbefunde

Neue Befunde aus der Simulation; die Entscheide zu den Prüfhypothesen oben
stehen in der Tabelle «Offene KI-Prüfhypothesen».

| ID    | Perspektive                          | Priorität | Fassung / Stelle                                 | Beobachtung und Relevanz                                                                                                  | Korrekturvorschlag                                                                                                                                             | Entscheid                         | Nachprüfung                                                      |
| ----- | ------------------------------------ | --------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------------- |
| BG-07 | Fach und Angehörige (KI-Simulation)  | P2        | Abschnitt «Ein nächster Schritt», alle Fassungen | Kein Hinweis auf Unterstützungsangebote für Angehörige und kein Krisenkontakt, obwohl das Blatt Erschöpfung thematisiert. | Ergänzen: «Unterstützung finden Sie z. B. bei einer Angehörigenberatung oder in der Hausarztpraxis. In einer akuten Krise: Die Dargebotene Hand, Telefon 143.» | annehmen (Vorschlag)              | Web/PDF-Abgleich; Nummer mit Notfallseite der Website abgleichen |
| BG-08 | Borderline-Erfahrung (KI-Simulation) | P3        | Titel                                            | Der Titel kann auf einer Borderline-Seite die Ursache der Belastung bei der erkrankten Person verorten.                   | Durch BG-04 ausreichend abgedeckt; Titel beibehalten.                                                                                                          | verwerfen (durch BG-04 abgedeckt) | –                                                                |

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

| Befund | Umsetzung                                                                                                                                            | geprüfte Fassungen  | Ergebnis               |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------------------- |
| BG-02  | Signalliste näher an den WHO-Beispielen (Schlafprobleme, Schmerzen, Grübeln oder Sorgen)                                                             | Web, PDF-Text, WebP | geschlossen            |
| BG-03  | «innere Leere» gestrichen, «Niedergeschlagenheit» ergänzt                                                                                            | Web, PDF-Text, WebP | geschlossen            |
| BG-04  | Kernsatz: «Belastung hat oft mehrere Quellen, etwa auch Arbeit, Finanzen oder die eigene Gesundheit.»                                                | Web, PDF-Text, WebP | geschlossen            |
| BG-05  | Karte «Erholungsbedarf»                                                                                                                              | Web, PDF-Text, WebP | geschlossen            |
| BG-07  | Angehörigenberatung und Hausarztpraxis genannt; Krisenhinweis ohne Nummer, weil nicht-akute Handouts laut Governance-Test keine Notrufnummern tragen | Web, PDF-Text, WebP | geschlossen, angepasst |

Weiterhin offen:

- BG-06 (P2, zurückgestellt): Datum der WHO-Seite bei Quellenzugriff abgleichen.
- BG-09 (P3, neu, zurückgestellt): «separat ausgewiesene Krisen- und Notfallwege» sagt im Ausdruck nicht, wo diese stehen; ein Verweis wie «Website, Bereich Soforthilfe» wäre konkreter.

Perspektiven-Nachprüfung:

- Fach (Simulation): Auflagen erfüllt; BG-06 bleibt als Quellenabgleich offen.
- Borderline-Erfahrung (Simulation): Kein Diagnosekriterium mehr in der Liste; Ursachen werden offen benannt.
- Angehörige (Simulation): Anlaufstellen sichtbar; Krisenverweis bleibt allgemein (BG-09).

Blattstatus Runde 3 (KI-Simulation): [x] bereit für nachgelagerte technische
Prüfungen [ ] erst nach Auflagen bereit [ ] nicht bereit
