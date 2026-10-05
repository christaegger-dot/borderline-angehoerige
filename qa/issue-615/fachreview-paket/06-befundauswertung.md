# Gemeinsame Befundauswertung und Paketentscheid

Dieses Blatt wird erst ausgefüllt, nachdem die verantwortete Fachprüfung und
beide unabhängigen Erfahrungsperspektiven für denselben gesperrten Stand
vorliegen. Unterschiedliche Rückmeldungen bleiben sichtbar.

## Ausfüllstatus: KI-Simulation

> Am 05.10.2026 wurden alle drei Perspektiven auf ausdrücklichen Wunsch des
> Repository-Inhabers durch eine KI (Claude) **simuliert**. Die Auswertung
> dient dem privaten Gebrauch. Menschen haben nicht geprüft. Die Spalte
> «angenommen / verworfen / zurückgestellt» enthält **Vorschläge** der
> Simulation; verbindlich werden sie erst durch die Bestätigung des
> Repository-Inhabers. Rechtliche Hinweise sind keine Rechtsberatung.
>
> Am 05.10.2026 hat der Repository-Inhaber die Umsetzung der angenommenen
> Befunde freigegeben. Sie sind in `2fb8367` umgesetzt und als Reviewrunde 3
> gesperrt. Die Nachprüfung erfolgte wiederum durch die KI-Simulation.

## Entscheidregister Reviewrunde 3

| Handout                                      | Fachentscheid        | Borderline-Erfahrung | Angehörigenperspektive          | P1 offen | P2 offen | Gesamtstatus                           |
| -------------------------------------------- | -------------------- | -------------------- | ------------------------------- | -------: | -------: | -------------------------------------- |
| Remission, Alltag und persönliche Recovery   | KI: Auflagen erfüllt | KI: stimmig          | KI: stimmig                     |        0 |        1 | KI: bereit für nachgelagerte Prüfungen |
| Fünf Bereiche rund um Genesung               | KI: Auflagen erfüllt | KI: stimmig          | KI: stimmig                     |        0 |        0 | KI: bereit für nachgelagerte Prüfungen |
| Freiwillige Unterstützung und eigene Grenzen | KI: Auflagen erfüllt | KI: stimmig          | KI: stimmig                     |        0 |        0 | KI: bereit für nachgelagerte Prüfungen |
| Belastung wahrnehmen, Grenzen prüfen         | KI: Auflagen erfüllt | KI: stimmig          | KI: stimmig mit Hinweis (BG-09) |        0 |        1 | KI: bereit für nachgelagerte Prüfungen |
| Grenze benennen – eigenen Schritt wählen     | KI: Auflagen erfüllt | KI: stimmig          | KI: stimmig                     |        0 |        0 | KI: bereit für nachgelagerte Prüfungen |

Offene P2 sind nur zurückgestellte Quellenabgleiche (RR-02, BG-06), die ohne
Zugriff auf WHO und AWMF nicht möglich waren.

## Entscheidregister Reviewrunde 2 (historisch)

| Handout                                      | Fachentscheid                | Borderline-Erfahrung         | Angehörigenperspektive       | P1 offen | P2 offen | Gesamtstatus                  |
| -------------------------------------------- | ---------------------------- | ---------------------------- | ---------------------------- | -------: | -------: | ----------------------------- |
| Remission, Alltag und persönliche Recovery   | KI: mit Auflagen             | KI: stimmig mit Hinweisen    | KI: stimmig mit Hinweisen    |        0 |        5 | KI: erst nach Auflagen bereit |
| Fünf Bereiche rund um Genesung               | KI: Korrekturen erforderlich | KI: Korrekturen erforderlich | KI: stimmig mit Hinweisen    |        2 |        3 | KI: nicht bereit              |
| Freiwillige Unterstützung und eigene Grenzen | KI: Korrekturen erforderlich | KI: stimmig mit Hinweisen    | KI: stimmig mit Hinweisen    |        1 |        4 | KI: nicht bereit              |
| Belastung wahrnehmen, Grenzen prüfen         | KI: mit Auflagen             | KI: Korrekturen erforderlich | KI: stimmig mit Hinweisen    |        0 |        5 | KI: erst nach Auflagen bereit |
| Grenze benennen – eigenen Schritt wählen     | KI: Korrekturen erforderlich | KI: stimmig mit Hinweisen    | KI: Korrekturen erforderlich |        5 |        4 | KI: nicht bereit              |

«P2 offen» zählt angenommene und zurückgestellte P2-Befunde, die noch nicht
umgesetzt oder abgeglichen sind.

## Disposition aller Befunde

| Befund-ID | Herkunft / Perspektive                                | Priorität                | angenommen / verworfen / zurückgestellt        | Begründung                                                                                                    | verantwortliche Rolle | Änderungscommit | betroffene Fassungen       | Nachprüfung durch                              | Ergebnis                            |
| --------- | ----------------------------------------------------- | ------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------- | --------------- | -------------------------- | ---------------------------------------------- | ----------------------------------- |
| RR-01     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Begriff der Verlaufsstudien ist «symptomatische Remission»                                                    | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich nach Neuerzeugung                  | umgesetzt; KI-nachgeprüft (Runde 3) |
| RR-02     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | zurückgestellt                                 | Kapitelangabe ohne Quellenzugriff nicht verifizierbar                                                         | Repository-Inhaber    | –               | alle                       | Quellenabgleich                                | offen                               |
| RR-03     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | quellennah überprüfbare Formulierung statt eigener Einordnung                                                 | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| RR-04     | KI-Vorprüfung; Angehörige (Sim.)                      | P2                       | geschlossen                                    | Hinweis im PDF vorhanden                                                                                      | –                     | `7909124`       | PDF                        | KI-Simulation                                  | bestätigt                           |
| RR-05     | KI-Vorprüfung; Fach (Sim.)                            | P2 (von P3 hochgestuft)  | angenommen (Umsetzung vom Inhaber freigegeben) | Kastentitel «Vier Begriffe» widerspricht Lead                                                                 | Repository-Inhaber    | `2fb8367`       | HTML, PDF, WebP, Thumbnail | visuelle Kontrolle                             | umgesetzt; KI-nachgeprüft (Runde 3) |
| RR-06     | KI-Vorprüfung; Borderline-Erfahrung (Sim.)            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Begriffe uneinheitlich; «Funktionsfähigkeit» defizitorientiert                                                | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| RR-07     | Borderline-Erfahrung (Sim.)                           | P3                       | angenommen (Umsetzung vom Inhaber freigegeben) | Nachfragen kann Druck erzeugen                                                                                | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| GB-01     | KI-Vorprüfung; Fach und Borderline-Erfahrung (Sim.)   | P1                       | angenommen (Umsetzung vom Inhaber freigegeben) | Nummerierung widerspricht dem Modell-Disclaimer                                                               | Repository-Inhaber    | `2fb8367`       | HTML, PDF, WebP, Thumbnail | visuelle Kontrolle                             | umgesetzt; KI-nachgeprüft (Runde 3) |
| GB-02     | KI-Vorprüfung; Fach (Sim.)                            | P1                       | angenommen (Umsetzung vom Inhaber freigegeben) | pauschaler Medikamentensatz kann nötige Behandlung infrage stellen                                            | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| GB-03     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Nichtlinearität nicht durch APA/NICE getragen                                                                 | Repository-Inhaber    | `2fb8367`       | alle                       | Quellenabgleich                                | umgesetzt; KI-nachgeprüft (Runde 3) |
| GB-04     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Liste reicht weiter als Quellenzeile                                                                          | Repository-Inhaber    | `2fb8367`       | alle                       | Quellenabgleich                                | umgesetzt; KI-nachgeprüft (Runde 3) |
| GB-05     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | verworfen (Vorschlag)                          | bereits als redaktionelle Orientierung gekennzeichnet; keine Leitlinienzuschreibung                           | Repository-Inhaber    | –               | –                          | –                                              | –                                   |
| GB-06     | KI-Vorprüfung; Fach (Sim.)                            | P3 (von P2 herabgestuft) | angenommen (Umsetzung vom Inhaber freigegeben) | weniger kausaler Begriff                                                                                      | Repository-Inhaber    | `2fb8367`       | HTML, PDF, WebP, Thumbnail | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| GB-07     | Borderline-Erfahrung (Sim.)                           | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Selbstbestimmung und Peer-Ressourcen fehlen                                                                   | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| GB-08     | Angehörige (Sim.)                                     | P3                       | zurückgestellt                                 | nur bei freiem Platz nach GB-01                                                                               | Repository-Inhaber    | –               | PDF                        | –                                              | offen                               |
| GB-09     | Angehörige (Sim.)                                     | P3                       | angenommen (Umsetzung vom Inhaber freigegeben) | Beobachtungsauftrag vermeiden; Anlaufstelle nennen                                                            | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| AR-01     | KI-Vorprüfung; Fach (Sim.)                            | P1                       | angenommen (Umsetzung vom Inhaber freigegeben) | Behandlungsentscheid hängt von Urteilsfähigkeit ab                                                            | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich; juristische Prüfung nicht erfolgt | umgesetzt; KI-nachgeprüft (Runde 3) |
| AR-02     | KI-Vorprüfung; Fach (Sim.)                            | P1                       | geschlossen                                    | Parität Web/PDF hergestellt                                                                                   | –                     | `7909124`       | PDF                        | KI-Simulation                                  | bestätigt                           |
| AR-03     | KI-Vorprüfung; Fach und Angehörige (Sim.)             | P2 (von P1 herabgestuft) | angenommen (Umsetzung vom Inhaber freigegeben) | Aussage unvollständig, nicht falsch; Vertraulichkeit ergänzen                                                 | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| AR-04     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | über Geltungsbereich (AR-05) gelöst                                                                           | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| AR-05     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Geltungsbereich fehlt                                                                                         | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| AR-06     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | verworfen (Vorschlag)                          | Fusszeile kennzeichnet eigene Darstellung                                                                     | Repository-Inhaber    | –               | –                          | –                                              | –                                   |
| AR-07     | Borderline-Erfahrung (Sim.)                           | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Pause soll nicht wie Beziehungsabbruch wirken                                                                 | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| AR-08     | Borderline-Erfahrung (Sim.)                           | P3                       | angenommen (Umsetzung vom Inhaber freigegeben) | PDF ohne Nachfrage-Angebot                                                                                    | Repository-Inhaber    | `2fb8367`       | HTML, PDF, WebP, Thumbnail | PDF-Textabgleich                               | umgesetzt; KI-nachgeprüft (Runde 3) |
| AR-09     | Angehörige (Sim.)                                     | P3                       | angenommen (Umsetzung vom Inhaber freigegeben) | Verständlichkeit                                                                                              | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| AR-10     | Angehörige (Sim.)                                     | P3                       | angenommen (Umsetzung vom Inhaber freigegeben) | Kartentitel missverständlich                                                                                  | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| BG-01     | KI-Vorprüfung; Fach (Sim.)                            | P1                       | geschlossen                                    | Abklärungshinweis im PDF-Hauptinhalt                                                                          | –                     | `7909124`       | PDF                        | KI-Simulation                                  | bestätigt                           |
| BG-02     | KI-Vorprüfung; Fach (Sim.)                            | P2 (von P1 herabgestuft) | angenommen (Umsetzung vom Inhaber freigegeben) | Beispiele gekennzeichnet, aber Quellenreichweite überschritten                                                | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| BG-03     | KI-Vorprüfung; Borderline-Erfahrung (Sim.)            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Diagnosekriterium vermischt Perspektiven                                                                      | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| BG-04     | KI-Vorprüfung; Borderline-Erfahrung (Sim.)            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Ursachen offen benennen                                                                                       | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| BG-05     | KI-Vorprüfung; Fach (Sim.)                            | P3 (von P2 herabgestuft) | angenommen (Umsetzung vom Inhaber freigegeben) | Kategorie sprachlich präzisieren                                                                              | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| BG-06     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | zurückgestellt                                 | Datum ohne Quellenzugriff nicht verifizierbar                                                                 | Repository-Inhaber    | –               | alle                       | Quellenabgleich                                | offen                               |
| BG-07     | Fach und Angehörige (Sim.)                            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Anlaufstelle und Krisenkontakt fehlen                                                                         | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich; Nummer mit Notfallseite           | umgesetzt; KI-nachgeprüft (Runde 3) |
| BG-08     | Borderline-Erfahrung (Sim.)                           | P3                       | verworfen (Vorschlag)                          | durch BG-04 abgedeckt                                                                                         | Repository-Inhaber    | –               | –                          | –                                              | –                                   |
| GS-01     | KI-Vorprüfung; Fach (Sim.)                            | P1                       | angenommen (Umsetzung vom Inhaber freigegeben) | Quellen tragen die Technik nicht                                                                              | Repository-Inhaber    | `2fb8367`       | alle                       | Quellenabgleich                                | umgesetzt; KI-nachgeprüft (Runde 3) |
| GS-02     | KI-Vorprüfung; Fach (Sim.)                            | P1                       | angenommen (Umsetzung vom Inhaber freigegeben) | Rechtsbegriff unscharf; nur KI-Rechtseinschätzung                                                             | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich; juristische Prüfung nicht erfolgt | umgesetzt; KI-nachgeprüft (Runde 3) |
| GS-03     | KI-Vorprüfung; Fach und Angehörige (Sim.)             | P1                       | angenommen (Umsetzung vom Inhaber freigegeben) | Pflichtenhinweis nur in 8 pt                                                                                  | Repository-Inhaber    | `2fb8367`       | HTML, PDF, WebP, Thumbnail | visuelle Kontrolle                             | umgesetzt; KI-nachgeprüft (Runde 3) |
| GS-04     | KI-Vorprüfung; Fach und Angehörige (Sim.)             | P1                       | angenommen (Umsetzung vom Inhaber freigegeben) | Ankündigung in Gefahr nicht nötig                                                                             | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| GS-05     | KI-Vorprüfung; Borderline-Erfahrung (Sim.)            | P2                       | geschlossen                                    | diagnoseunabhängige Rahmung vorhanden                                                                         | –                     | `7909124`       | alle                       | KI-Simulation                                  | bestätigt                           |
| GS-06     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | über GS-02 gelöst                                                                                             | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| GS-07     | KI-Vorprüfung; Fach (Sim.)                            | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | über GS-01 gelöst                                                                                             | Repository-Inhaber    | `2fb8367`       | alle                       | Quellenabgleich                                | umgesetzt; KI-nachgeprüft (Runde 3) |
| GS-08     | Fach (Sim.)                                           | P1                       | angenommen (Umsetzung vom Inhaber freigegeben) | Selbstgefährdung der anderen Person fehlt; Website-Formulierung vorhanden                                     | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich; Nummern mit Notfallseite          | umgesetzt; KI-nachgeprüft (Runde 3) |
| GS-09     | Angehörige (Sim.)                                     | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Schrittnamen fehlen im PDF                                                                                    | Repository-Inhaber    | `2fb8367`       | HTML, PDF, WebP, Thumbnail | visuelle Kontrolle                             | umgesetzt; KI-nachgeprüft (Runde 3) |
| GS-10     | Borderline-Erfahrung (Sim.); Divergenz zu Angehörigen | P2                       | angenommen (Umsetzung vom Inhaber freigegeben) | Website-Satz erfüllt beide Perspektiven                                                                       | Repository-Inhaber    | `2fb8367`       | alle                       | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| GS-11     | Angehörige (Sim.)                                     | P3                       | angenommen (Umsetzung vom Inhaber freigegeben) | Verständlichkeit im Webtext                                                                                   | Repository-Inhaber    | `2fb8367`       | Web                        | KI-Abgleich                                    | umgesetzt; KI-nachgeprüft (Runde 3) |
| G-01      | Angehörige (Sim.)                                     | P3                       | angenommen (Umsetzung vom Inhaber freigegeben) | «Ein nächster Schritt» über mehreren Hinweisen in den vier Orientierungsblättern; «Mögliche nächste Schritte» | Repository-Inhaber    | `2fb8367`       | HTML, PDF, WebP, Thumbnail | visuelle Kontrolle                             | umgesetzt; KI-nachgeprüft (Runde 3) |
| BG-09     | Angehörige (Sim., Runde 3)                            | P3                       | zurückgestellt                                 | Krisenverweis ohne Nummer nennt im Ausdruck keinen Ort                                                        | Repository-Inhaber    | –               | alle                       | –                                              | offen                               |
| G-04      | Fach (Sim., Runde 3)                                  | Folge von GS-08          | angenommen (Umsetzung vom Inhaber freigegeben) | Praxisblatt als handlungsnahe Ausnahme mit genau 117 und 144 im Governance-Test erfasst                       | Repository-Inhaber    | `2fb8367`       | Web, Test                  | Testlauf                                       | umgesetzt                           |
| G-02      | Fach (Sim.)                                           | P3                       | zurückgestellt                                 | A4 hoch statt quer; vertikale Leselogik vertretbar                                                            | Repository-Inhaber    | –               | –                          | –                                              | offen                               |
| G-03      | Fach (Sim.)                                           | P3                       | zurückgestellt                                 | Visualisierungen sind überwiegend Textkarten im Raster                                                        | Repository-Inhaber    | –               | –                          | –                                              | offen                               |

Ein Befund darf nur verworfen werden, wenn die Begründung fachlich und für die
betroffene Perspektive nachvollziehbar dokumentiert ist. Eine abweichende
Erfahrung wird nicht als «falsch» gelöscht.

### Sichtbare Divergenzen

- **GS-10:** Aus Borderline-Erfahrung (simuliert) wirkt ein Gesprächsende ohne
  jeden Hinweis wie ein Abbruch. Aus Angehörigensicht (simuliert) darf keine
  Rückkehr versprochen werden müssen. Der vorgeschlagene Website-Satz lässt
  offen, ob und wann man wieder ansprechbar ist, und berücksichtigt damit
  beides.
- **GB-01:** Fach (simuliert) hält die drei Disclaimer für teilweise wirksam.
  Aus Borderline-Erfahrung (simuliert) überwiegt die Checklistenwirkung der
  Nummerierung. Die höhere Einstufung P1 gilt.
- **AR-03, BG-02:** Die Simulation stuft diese Befunde gegenüber der
  Vorprüfung herab. Die ursprüngliche Einstufung bleibt in den Einzelbögen
  sichtbar.

## Nachweis allfälliger Korrekturen

- neuer Kandidaten-Commit: `2fb83676c946489713ac23b53fb11226aa300ed5`
  (ersetzt `79091246f78411e283e48fdabba3ac4f751b3f6b`)
- neue Sperrdatei / Manifest: `review-basis.json`, Reviewrunde 3 /
  `handouts/issue-615-refresh/manifest.json`
- betroffene Handouts: nur die fünf Reviewkandidaten. Die übrigen zehn Blätter
  wurden nicht neu gerendert; ihre HTML-Quellen entstehen beim Neurendern
  byte-gleich.
- Webtext, HTML, PDF, WebP und Thumbnail neu erzeugt: [x] ja [ ] nein
- alte Entscheide als historisch gekennzeichnet: [x] ja; die Entscheide der
  Runde 2 stehen als Verlauf in den Einzelbögen
- P1-Befunde erneut geprüft: [x] ja [ ] nein – KI-Abgleich von Webtext und
  PDF-Text sowie Sichtkontrolle
- angenommene P2-Befunde erneut geprüft: [x] ja [ ] nein – wie P1

## Übergreifende Design- und Formatfragen

- [x] Sämtlicher Text ist mindestens 8 pt; der bisherige 7,2-pt-Footer ist
      technisch korrigiert und digital visuell kontrolliert. Realer Ausdruck
      bleibt offen.
- [x] Für jedes Orientierungsblatt ist A4 quer als bevorzugter Standard geprüft; eine Hochformat-Ausnahme ist mit vertikaler Visualisierungs- oder Leselogik begründet. → KI-Simulation: Hochformat vertretbar, Lesefolge Titel → Visualisierung → Kernsatz → Schritte (G-02)
- [ ] Jedes Blatt hat einen echten visuellen Erkenntnisanker, nicht nur Textkarten. → überwiegend Textkarten im Raster (G-03)
- [x] Sicherheits-, Autonomie- und Rechtehinweise stehen lesbar im Hauptinhalt. → Runde 3: Handlungshinweise des Praxisblatts im Hauptinhalt (GS-03)
- [x] Visuelle Verdichtung ändert keine fachliche Aussage des Volltexts. → Runde 3: Nummerierung entfernt (GB-01), Nachfragen im PDF (AR-08)

## Übergang in nachgelagerte Prüfungen

Erst nach abgeschlossenem Inhaltsreview:

- [ ] reale VoiceOver-Prüfung mit Webtext und Downloadwegen
- [ ] reale NVDA-Prüfung mit Webtext und Downloadwegen
- [ ] manuelle PDF-UA-/Matterhorn-Prüfung inklusive Lesereihenfolge
- [ ] Nutzendentest mit Menschen aus beiden Erfahrungsperspektiven
- [ ] physischer Ausdruck in 100 % und realistischem Bürodruck

## Paketentscheid

- [x] Alle fünf Blätter sind inhaltlich stabil. → KI-Simulation, Reviewrunde 3
- [x] Alle P1-Befunde sind geschlossen. → alle acht in `2fb8367` umgesetzt und KI-nachgeprüft
- [x] Notwendige P2-Befunde sind entschieden oder geschlossen. → nur RR-02 und BG-06 zurückgestellt (Quellenabgleich)
- [x] Divergierende Perspektiven sind sichtbar dokumentiert.
- [x] Alle vier Fassungen je Blatt stimmen inhaltlich überein. → PDF verdichtet ohne Bedeutungsänderung; GB-08 zurückgestellt
- [ ] Das Paket darf in die nachgelagerten technischen und realen Prüfungen übergehen. → Entscheid des Repository-Inhabers; aus Sicht der Simulation spricht nichts dagegen

Datum: 05.10.2026 (Runde 2: Befunde; Runde 3: Nachprüfung)

Verantwortliche Person / Funktion: keine Person – KI-Simulation (Claude);
Umsetzung vom Repository-Inhaber freigegeben

Begründung:

- Runde 2: drei Blätter mit offenen P1-Befunden (02, 03, 05), kein Blatt ohne
  Korrekturen bereit.
- Runde 3: alle P1 sowie die angenommenen P2- und P3-Befunde umgesetzt; Web und
  PDF stimmen an allen geprüften Stellen überein.
- Rechts- und Quellenfragen sind nur KI-eingeschätzt; das Restrisiko bleibt
  für den privaten Gebrauch dokumentiert.

Dieser Entscheid ist **keine institutionelle Publikationsfreigabe**. Eine
Veröffentlichung benötigt nach Abschluss der technischen und realen Prüfungen
einen separaten, ausdrücklichen Entscheid.
