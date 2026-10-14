# Inhaltlicher Review Borderline-Website

> Ablage gemäss Massnahme M0.2 des Massnahmenplans vom 14.10.2026. Der Text entspricht dem Dokument «Inhaltlicher Review Borderline-Website» vom 14.10.2026 (Stand r4-24, Commit 38007a0). Für die Ablage ergänzt sind nur die Befund-IDs W1-001 bis W1-063 in der ersten Tabellenspalte; dieselben IDs stehen in `BEFUNDE.csv`. Umgesetzt sind bisher die Befunde von Release A, siehe `audit-results/2026-10-14-delta-sicherheit-r4-25/`.

Stand 14.10.2026 · Review W1 für die Fachstelle Angehörigenarbeit PUK

## Gesamturteil

Die Website ist fachlich weitgehend korrekt, in der Haltung stark und in den Sprechbeispielen oft konkret. Sie ist aber zu einem Text geworden, der sich mehr gegen Missverständnisse absichert, als dass er Angehörige informiert. Viele Aussagen werden im selben Absatz relativiert: «individuell» steht mit Endungen 40-mal im Inhalt, Formen von «garantieren» 13-mal, Wendungen mit «ableiten» («lässt sich … nicht ableiten») 17-mal. Zehn von 13 Abbildungen haben einen Aufklappteil «Grenzen des Bildes» oder «Grenzen der Darstellung». Diese Vertiefungen verlangt das PUK Website-Profil; zu kürzen ist ihr Inhalt, nicht ihr Platz.

Darunter leidet das Kernwissen. Als Merkmale der Diagnose benannt werden Angst vor dem Verlassenwerden, Selbstverletzung, chronische Leere und heftige Wut nur im Glossar hinter einem Aufklappelement. Die Themenseiten beschreiben einzelne davon, aber ohne diesen Bezug. Am schwersten wiegt: Keine Themenseite sagt, dass Suizidgedanken und Selbstverletzungen zum Störungsbild gehören und häufig sind. Die einzige Aussage zu erhöhtem Suizidrisiko ist an die Begleitdepression gehängt. Für Angehörige, die wiederholte Suizidäusserungen erleben, ist das der wichtigste Korrekturpunkt.

Erhalten bleiben sollten die Schuldentlastung, die Seite «Grenzen setzen», die Bedeutungsschleife, der Musterbrief ans Behandlungsteam, die kommentierte Buchliste und die konsequente Trennung zwischen Mitteilen und Auskunft.

**Bilanz:** 2 kritische, 28 wichtige und 33 optionale Befunde. Die beiden kritischen Befunde (Verstehen, Diagnose) und ein wichtiger auf «Krise» betreffen dasselbe Thema: Suizidalität als Merkmal von Borderline. Einige Vorschläge berühren Entscheide oder Freigaben vom 13. und 14. Oktober 2026; das ist bei den Befunden vermerkt.

**Die drei wichtigsten Handlungsfelder:**

**Suizidalität und Selbstverletzung klar benennen und anleiten.** Häufigkeit ehrlich sagen, Gewöhnung an wiederholte Äusserungen ansprechen, konkret beschreiben, was Angehörige nach einer Selbstverletzung tun (Verstehen, Diagnose, Krise, Beziehungen, Kommunizieren).

**Die Absicherungsschicht abtragen und Wiederholungen bündeln.** Pro Abschnitt höchstens ein Vorbehalt, ausgenommen Sicherheits- und Rechtsgrenzen. Mehrfachdarstellungen zusammenführen: Schweigepflicht auf «Behandlung», Validierungsstufen und Anspannungskurve, Zuständigkeitssatz siebenmal auf «Krise».

**Lücken bei Kernwissen, Schweizer Recht und Zielgruppen schliessen.** Kernmerkmale und ICD-10-Bezeichnung, Verlauf nach Symptomgruppen, Rechte bei fürsorgerischer Unterbringung, Zürcher Gewaltschutzgesetz, Eltern minderjähriger Kinder, NAP und iks als Anlaufstellen.

## Prüfgrundlage und Seitenliste

Geprüft wurde der Stand `main` vom 14. Oktober 2026 (Commit 38007a0, Build r4-24), identisch mit der hochgeladenen ZIP-Datei. Gelesen wurden alle Inhaltsfragmente in `authoring/content/` vollständig, einschliesslich Abbildungen, Aufklappteile und Quellenblöcke, sowie die gerenderten Zuständigkeitsverweise. Massstab sind die Kriterien A–D aus Review-Prompt W1 (A Fachlichkeit und Quellen, B Zielgruppe und Haltung, C Verständlichkeit, D Praxisbezug). Zentrale Fakten wurden gegen Primärquellen geprüft (ZGB, EG KESR und GSG Zürich, KLV, BFS, NICE, AWMF, PubMed, Verlagsseiten).

Nicht enthalten: das Seiteninventar für W2 (auf Wunsch als zweiter Tab), eine Rechtsprüfung von Impressum und Datenschutz (institutionell offen) sowie Suche und 404-Seite als reine Funktionsseiten.

**Prioritäten:** kritisch = fachlich falsch, irreführend oder potenziell schädlich · wichtig = beeinträchtigt Verständnis, Zielgruppenbezug oder Haltung erheblich · optional = Verbesserung.

| Seite | Pfad | Wörter | Status | kritisch | wichtig | optional |
| --- | --- | --- | --- | --- | --- | --- |
| Startseite | index | 349 | geprüft | 0 | 0 | 0 |
| Kurz und klar | kurz | 394 | geprüft | 0 | 1 | 1 |
| Borderline verstehen | verstehen | 2120 | geprüft | 1 | 2 | 2 |
| Alltag und Beziehungen | beziehungen | 1833 | geprüft | 0 | 1 | 3 |
| Ihre Rolle klären | rolle | 3133 | geprüft | 0 | 2 | 2 |
| Grenzen setzen | grenzen | 1847 | geprüft | 0 | 2 | 2 |
| Diagnose und Begleiterkrankungen | diagnose | 2174 | geprüft | 1 | 2 | 3 |
| Behandlung und Ihre Rolle darin | behandlung | 3001 | geprüft | 0 | 4 | 3 |
| Zugewandt und klar sprechen | kommunizieren | 3541 | geprüft | 0 | 3 | 3 |
| Krisen begleiten | krise | 1724 | geprüft | 0 | 3 | 3 |
| Wenn Kinder mitbetroffen sind | kinder | 906 | geprüft | 0 | 1 | 0 |
| Auf sich achten | selbstfuersorge | 2902 | geprüft | 0 | 0 | 1 |
| Genesung | genesung | 1774 | geprüft | 0 | 2 | 2 |
| Unterstützung finden | unterstuetzung | 679 | geprüft | 0 | 1 | 0 |
| Bücher für Angehörige | buecher | 947 | geprüft | 0 | 1 | 2 |
| Fragen und Nachschlagen | fragen | 2818 | geprüft | 0 | 1 | 1 |
| Begriffe verständlich erklärt | begriffe | 1285 | geprüft | 0 | 0 | 1 |
| Quellen | quellen | 4835 | geprüft | 0 | 2 | 2 |
| Über diese Website | ueber | 645 | geprüft | 0 | 0 | 2 |
| Impressum und Datenschutz | impressum-datenschutz | 636 | geprüft, ohne Rechtsprüfung | 0 | 0 | 0 |
| Website durchsuchen | suche | 260 | nicht geprüft (Funktion) | – | – | – |

Ohne Quellen- und Funktionsseiten umfasst die Website rund 33’000 Wörter, gezählt mit den Quellenblöcken und den Bildbeschreibungen für Screenreader. «Behandlung», «Ihre Rolle», «Kommunizieren» und «Auf sich achten» haben je zwischen rund 2900 und 3500 Wörter. Für Leserinnen und Leser unter Stress ist das zu viel.

## Startseite und «Kurz und klar»

**Startseite:** Keine Befunde. Der Einstieg über Anliegen funktioniert. Die abweichenden Linktitel stehen unter den seitenübergreifenden Auffälligkeiten.

**Kurz und klar:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-001 | wichtig | B | «Sie müssen aber nicht die Behandlung, die Gefühle oder die Genesung eines anderen erwachsenen Menschen übernehmen.» | Schliesst Eltern minderjähriger Kinder aus. Gerade sie haben Sorge- und Aufsichtspflichten, also eine andere Rolle als Partnerinnen oder erwachsene Kinder. Das Muster zieht sich durch die ganze Website (siehe Grenzen, Kommunizieren). | «… eines anderen Menschen übernehmen. Sind Sie Mutter oder Vater eines minderjährigen Kindes, tragen Sie mehr Verantwortung, aber auch dann nicht allein: [Link auf neuen Abschnitt für Eltern].» |
| W1-002 | optional | B/C | «Sie ist keine geprüfte Fassung in Leichter Sprache.» | Bewusst gesetzt (Massnahmenplan «Kurz und klar», 13.10.2026), im Wortlaut aber eine interne Qualitätsangabe. Sie wirkt wie eine Entschuldigung. | Umformulieren statt streichen, z. B. «Sie ist bewusst kurz und nicht in Leichter Sprache geschrieben.» |

## «Borderline verstehen» und «Alltag und Beziehungen»

**Borderline verstehen:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-003 | kritisch | A | «**Die Diagnose allein sagt nichts darüber, ob von einem Menschen Gefahr ausgeht.**» | Fett und ohne Einschränkung gelesen, heisst der Satz: kein erhöhtes Risiko. Gemeint ist Gefahr für andere. Das Risiko für die Person selbst ist aber deutlich erhöht: In einer Metaanalyse von 35 Studien mit klinischen Stichproben hatten 52 % mindestens einen Suizidversuch, rund 6 % starben durch Suizid (Lak et al., 2025). | Umformulierung unten. |
| W1-004 | wichtig | A/C | «Die Diagnose Borderline-Persönlichkeitsstörung kann unter anderem beschreiben: sehr starke oder schnell wechselnde Gefühle und Schwierigkeiten mit der inneren Stabilität …» | Die Hauptseite zum Verstehen nennt die Merkmale nicht, an denen Angehörige die Erkrankung im Alltag erleben. Als Merkmale der Diagnose stehen Angst vor dem Verlassenwerden, Leere, Wut, Impulsivität und Selbstverletzung nur im Glossar hinter einem Aufklappelement. Einzelne Themenseiten beschreiben Teile davon (Beziehungen, Rolle), ohne Bezug zur Diagnose. | Kernmerkmale in Alltagssprache nennen, z. B.: «Häufig sind: grosse Angst, verlassen zu werden; heftige, rasch wechselnde Gefühle und starke Wut; ein unsicheres Bild von sich selbst und ein Gefühl innerer Leere; impulsives Handeln, etwa beim Geld oder beim Konsum; Selbstverletzung und Suizidgedanken; unter starkem Stress Misstrauen oder das Gefühl, neben sich zu stehen.» Dazu ein Link auf die neun Kriterien im Glossar. |
| W1-005 | wichtig | B | «Die Schuld bei der betroffenen Person oder bei Angehörigen zu suchen, ist zu einfach.» | «Zu einfach» heisst: Es ist nicht ganz falsch, nur unvollständig. Für Eltern ist das genau der falsche Unterton. Derselbe Text sagt weiter unten klar: «Angehörige sind nicht schuld.» | «Niemand ist schuld: weder die betroffene Person noch ihre Angehörigen.» |
| W1-006 | optional | A | Abbildung 1 «Beobachten, nicht Gedanken lesen», «Bezug: Linehan (1993)» | Beobachtung von Deutung trennen und die Vermutung nachfragen: Das ist der Kern der Mentalisierung (MBT, «Haltung des Nicht-Wissens»), weniger der DBT. Die Quelle deckt die Abbildung nur schwach. | Prüfbedarf: Bateman und Fonagy (2009), bereits im Verzeichnis, zuordnen. McLaren et al. (2022) ist bereits im Quellenverzeichnis. |
| W1-007 | optional | C | «Die Kurve zeigt kein «Borderline-Gehirn», und solche Verläufe sind nicht auf Borderline beschränkt.» | Das Dementi führt einen Begriff ein, den der Text sonst nicht verwendet. | Ersten Teil streichen: «Solche Verläufe sind nicht auf Borderline beschränkt.» |

**Umformulierung (kritisch):**

Original: «**Die Diagnose allein sagt nichts darüber, ob von einem Menschen Gefahr ausgeht.**»

Vorschlag: «**Die Diagnose sagt nichts darüber, ob jemand für andere gefährlich ist.** Suizidgedanken, Suizidversuche und Selbstverletzungen kommen bei Borderline aber häufig vor. Nehmen Sie solche Äusserungen immer ernst, auch wenn sie sich wiederholen.» Dazu ein Link auf «Krisen begleiten», Abschnitt Suizidgedanken. Verankern lässt sich der Text im bestehenden Zwischentitel «Wenn Sie sich wegen Suizid sorgen».

**Alltag und Beziehungen:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-008 | wichtig | D | «Denkt die Person an Suizid oder verletzt sie sich, braucht sie Hilfe und Zuwendung, auch wenn Sie gehört haben, Zuwendung könne solches Verhalten verstärken.» | Das Dilemma ist real und wird in der DBT ernst genommen. Der Satz wischt es weg und sagt ausser «fachliche Einschätzung holen» nicht, wie Angehörige konkret reagieren sollen. | «Reagieren Sie ruhig und sachlich: Fragen Sie nach Suizidgedanken, sorgen Sie für medizinische Versorgung und ziehen Sie Fachpersonen bei. Weder Rückzug als Strafe noch grosse Aufregung helfen. Zeigen Sie Zuwendung auch in ruhigen Zeiten, nicht nur in der Krise.» Grundlage: Gunderson und Berkowitz (2006), Family Guidelines; Project Air (2018). Prüfbedarf: Wortlaut gegen beide Quellen abgleichen. |
| W1-009 | optional | C | «Ob und wie stark jemand mitfühlt, lässt sich aus der Diagnose nicht ablesen.» und «Etwas stark mitzufühlen, zutreffend zu verstehen und hilfreich zu reagieren sind verschiedene Fähigkeiten.» | Das ist ein Forschungsbefund (Blunden et al., 2024), aber nicht in den Alltag übersetzt. Für Laien bleibt er rätselhaft. | Streichen oder konkret machen: «Stark mitfühlen heisst nicht, richtig zu erraten, was der andere braucht. Das gilt für beide Seiten.» |
| W1-010 | optional | D | «Und ich darf ernst nehmen, was dein Verhalten bei mir ausgelöst hat.» | Klingt wie ein Satz an sich selbst, nicht wie ein Satz an die andere Person. | «Und deine Nachrichten haben mich verletzt.» |
| W1-011 | optional | C | «Studien beschreiben Gruppen, nicht eine bestimmte Person oder Beziehung.» | Steht ohne Bezug am Ende des Abschnitts. | Streichen. |

## «Ihre Rolle klären» und «Grenzen setzen»

**Ihre Rolle klären:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-012 | wichtig | A/B | «Behandlung, Sicherheitseinschätzung und Genesung sind nicht Ihre Aufgabe.» | «Verstehen» und «Krise» verlangen, dass Angehörige nach Suizidgedanken fragen und entscheiden, wann sie Hilfe holen. Das ist eine Laieneinschätzung. Der kategorische Satz lässt offen, ob sie handeln dürfen. | «Eine fachliche Einschätzung der Gefährdung ist nicht Ihre Aufgabe. Wenn Sie sich sorgen, dürfen Sie Hilfe holen, auch ohne sicher zu sein.» |
| W1-013 | wichtig | C | ganze Seite (3133 Wörter, 7 Abschnitte) | Die längste Themenseite nach «Kommunizieren». «Wenn Entscheidungen oder Verhalten riskant werden» (Geld, Kündigung, Substanzen) und «Mehrere Angehörige» gehören thematisch zu anderen Seiten oder doppeln sie. | Auf die Rollenklärung beschränken (Anbieten und Nicht-Aufgabe, Schuld, Alltag). Riskante Entscheidungen zu «Grenzen» (Geld, Trennung) und «Krise» (Substanzen) verschieben. Ziel: unter 2000 Wörter. |
| W1-014 | optional | C | «Manche Angehörige berichten von belastenden Phasen im Alltag. […] Andere erleben den Alltag anders. Aus einer Diagnose lässt sich nicht vorhersagen, wie eine Beziehung verläuft.» | Drei Sätze ohne Information. Ähnlich: «Was daraus folgt und ob eine Absprache wirkt, lässt sich weder aus einer Diagnose ableiten noch vorhersagen …» und «Die Fragen sind eine Hilfe zum Nachdenken, kein geprüftes Modell …» | Alle drei Stellen streichen. |
| W1-015 | optional | A | «in Ruhe prüfen, ob getrennte Konten oder klar geregelte Verfügungsrechte nötig sind; bei Unsicherheit fachliche Beratung nutzen» | Welche Beratung? Schweizer Wege fehlen. Der Satz wurde am 14.10.2026 freigegeben (A03-025); eine Ergänzung braucht einen Neuentscheid. | Budget- und Schuldenberatung nennen. Prüfbedarf: ob bei anhaltender Selbstschädigung durch Geldausgaben die Beistandschaft (KESB) erwähnt werden soll. |

**Grenzen setzen:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-016 | wichtig | A | «Bei akuter Gefahr oder Unsicherheit: Bringen Sie sich in Sicherheit und holen Sie Hilfe.» | Das wichtigste Schutzinstrument im Kanton Zürich fehlt: das Gewaltschutzgesetz. Dass die Polizei die gewaltausübende Person aus der gemeinsamen Wohnung weisen kann, ist für Angehörige eine zentrale Information. | Ergänzen: «Bei häuslicher Gewalt kann die Polizei die gewaltausübende Person für 14 Tage aus der Wohnung weisen und ein Kontakt- und Rayonverbot verfügen. Sie können innert acht Tagen beim Gericht eine Verlängerung beantragen, insgesamt höchstens drei Monate.» Quelle: GSG Zürich, LS 351, § 3 und § 6. |
| W1-017 | wichtig | B/D | Abschnitt «Grenzen in verschiedenen Angehörigenrollen»: Partnerin oder Partner, Eltern eines erwachsenen Kindes, erwachsenes Kind | Eltern minderjähriger Kinder und Geschwister fehlen. Für Eltern einer 15-Jährigen gelten «Kontakt beenden», «getrenntes Wohnen» oder «Trennung» nicht. Nur «Konsequenz heisst nicht Härte» erwähnt minderjährige Kinder, als Grenze der Konsequenz. Die PUK hat mit HYPE Züri und der Elterngruppe genau für diese Gruppe Angebote. | Zwei Einträge ergänzen. **Eltern eines minderjährigen Kindes:** «Sie bleiben für Sicherheit und Versorgung verantwortlich. Grenzen betreffen hier Ton, Regeln im Haushalt und Ihre eigene Erholung, nicht den Kontakt. Holen Sie früh Unterstützung.» Dazu Links auf HYPE Züri und die Elterngruppe. **Geschwister:** «Auch Geschwister dürfen Abstand nehmen und brauchen eigene Unterstützung.» |
| W1-018 | optional | C | Abschnitt «Welche Grenzen zuerst?» (vier Felder nach Dringlichkeit und emotionaler Belastung) | Die Matrix sieht systematisch aus, orientiert aber kaum. «Langfristig und emotional weniger belastend: Behalten Sie Gewohnheiten und Alltagsabsprachen im Blick» ist keine Handlung. Dazu kommt ein Vorbehalt («keine fachliche Einstufung»). | Drei Sätze: «Zuerst Sicherheit und Gesundheit. Dann Erreichbarkeit und Gesprächsregeln. Grosse Themen wie Geld oder Wohnen in Ruhe vorbereiten.» |
| W1-019 | optional | A | «**Körperliche Gewalt ist kein Beziehungsproblem, sondern eine Sicherheitsfrage.**» | Häusliche Gewalt umfasst in der Schweiz auch psychische Gewalt, Drohungen und Stalking. Das EBG-Blatt B2 «Stalking» ist bereits als Quelle angegeben. | «Gewalt, ob körperlich, durch Drohungen, Kontrolle oder Stalking, ist kein Beziehungsproblem, sondern eine Sicherheitsfrage.» |

## «Diagnose und Begleiterkrankungen» und «Behandlung»

**Diagnose und Begleiterkrankungen:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-020 | kritisch | A | «Die britische Behandlungsleitlinie NICE beschreibt einen beobachteten Zusammenhang zwischen Borderline mit einer zusätzlichen Depression (Major Depression) und Suizidversuchen.» | Die einzige Risikoaussage der Website steht unter «Depression» und legt nahe, Suizidalität sei eine Folge der Begleiterkrankung. Wiederkehrende suizidale Handlungen und Selbstverletzung sind aber ein Diagnosekriterium von Borderline selbst. In klinischen Stichproben hatte etwa jede zweite Person mindestens einen Suizidversuch, rund 6 % starben durch Suizid. Den Einfluss einer zusätzlichen Depression fand die Metaanalyse unklar (Lak et al., 2025). | Umformulierung unten. |
| W1-021 | wichtig | A | «Deshalb kann in entsprechenden Unterlagen der Code F60.31 erscheinen.» | Der Code steht da, die Bezeichnung nicht, und zwar auf der ganzen Website: «emotional instabile Persönlichkeitsstörung, Borderline-Typ». Genau dieser Name steht in Schweizer Berichten und Zeugnissen. Angehörige erkennen ihn sonst nicht wieder. Laut Prüfbericht fehlt die Bezeichnung bewusst (Entscheid V-1); die Ergänzung braucht einen Neuentscheid. | «In Berichten kann deshalb «emotional instabile Persönlichkeitsstörung, Borderline-Typ» (F60.31) stehen. Gemeint ist dasselbe.» Dazu ein Glossareintrag. |
| W1-022 | wichtig | A/C | «Häufigkeitsangaben unterscheiden sich je nach Stichprobe, Erhebungszeitraum und Diagnoseverfahren. Die Liste sagt deshalb nichts über die Wahrscheinlichkeit bei einer einzelnen Person aus.» | Die Seite zitiert Zanarini (1998, 2004) und erklärt dann im Abschnitt Depression, warum deren Ergebnisse nicht verallgemeinerbar seien. Die Seite sagt nur, Depressionen würden «häufig beschrieben»; wie häufig, bleibt offen. Das Quellenverzeichnis sagt es selbst: «sehr hohe Raten», die «im Verlauf abnehmen». | «Depressionen und Angststörungen gehören zu den häufigsten Begleiterkrankungen. In klinischen Studien hatte die grosse Mehrheit im Lauf des Lebens mindestens eine depressive Episode. Wenn sich Borderline bessert, gehen oft auch die Begleiterkrankungen zurück.» |
| W1-023 | optional | C | «Das ist eine begrenzte Vorgabe für die stationäre Kodierung. Diese Vorgabe bedeutet nicht, dass ICD-10-GM, DSM-5-TR und ICD-11 inhaltlich gleich aufgebaut sind …» | Fachwissen für Kodierende, nicht für Angehörige. | Durch den Satz aus dem vorherigen Befund ersetzen. |
| W1-024 | optional | A | (fehlt auf allen Themenseiten) | Wie häufig Borderline ist, steht auf keiner Themenseite. Nur das Quellenverzeichnis nennt 0,7 % aus einer Osloer Stichprobe (Torgersen, 2001). Die Zahl entlastet Angehörige: Sie sind nicht allein. | «Borderline betrifft etwa 1 bis 2 von 100 Erwachsenen.» Quellen: Ellison et al. (2018), Median rund 1 %; Gunderson et al. (2018), 1,7 %; Leichsenring et al. (2024), 0,7–2,7 %. |
| W1-025 | optional | C | «Eine Diagnose ist ein Anfang, kein Etikett.» und gleich danach fett: «Die Diagnose ist eine fachliche Beurteilung über Zeit, nicht ein Stempel aus einem einzelnen Gespräch.» | Zweimal dieselbe Aussage hintereinander. | Einen der beiden Sätze streichen. |

**Umformulierung (kritisch):**

Original: Zwischentitel «Wenn Suizidgedanken dazukommen» im Abschnitt Depression, mit dem zitierten NICE-Satz.

Vorschlag: einen eigenen Zwischentitel «Suizidgedanken und Selbstverletzung» *vor* den Abschnitt Depression stellen: «Suizidgedanken, Suizidversuche und Selbstverletzungen gehören zu den Merkmalen von Borderline. Sie kommen häufig vor, auch ohne Depression. Eine zusätzliche Depression kann das Risiko weiter erhöhen. Nehmen Sie solche Äusserungen deshalb immer ernst, auch wenn sie sich wiederholen.»

Inhaltlicher Entscheid: ob eine Zahl dazukommt, z. B. «In klinischen Studien hatte etwa jede zweite Person mit Borderline mindestens einen Suizidversuch.» (Lak et al., 2025). Den Suizidanteil von rund 6 % würde ich auf der Website nicht nennen. Er ist korrekt, hilft Angehörigen aber nicht beim Handeln.

**Behandlung und Ihre Rolle darin:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-026 | wichtig | A | «Professionelle Behandlung kann ein wichtiger Teil eines individuellen Genesungswegs sein. Behandlung kann Veränderung unterstützen.» und «Mehrere strukturierte Psychotherapien können bei Borderline helfen. Für viele Einzelvergleiche sind die Forschungsergebnisse nur begrenzt sicher …» | Der Text untertreibt. Die APA-Leitlinie (2024) und der Cochrane-Review (2020) sagen: Strukturierte Psychotherapie ist die Behandlung der Wahl und verringert die Schwere der Beschwerden klinisch relevant. Die Evidenzsicherheit ist niedrig, die Richtung aber eindeutig. Diese Hoffnung geht im Vorbehalt unter. | «Borderline ist behandelbar. Mittel der Wahl ist eine auf Borderline ausgerichtete Psychotherapie. Sie verringert in Studien die Schwere der Beschwerden. Welches Verfahren gewählt wird, ist weniger wichtig als ein verlässlicher Rahmen und eine Fachperson mit Erfahrung.» |
| W1-027 | wichtig | C | ganze Seite: «vertrauliche(n)» 12-mal, «Rechtsgrundlage» 7-mal | Der Grundsatz «Mitteilen und Auskunft erhalten sind zwei verschiedene Informationswege.» steht in der Kurzliste, im Rollenblock, in der Definitionsliste, in der Abbildung und ihrem Aufklappteil, in drei Situationsblöcken, im Musterbrief und im Absatz danach. | Einmal erklären (Abbildung plus ein Absatz). Danach nur noch Situationen und Musterbrief, ohne den Grundsatz zu wiederholen. |
| W1-028 | wichtig | A | «Informationen über Diagnose, Sitzungen oder Verlauf dürfen grundsätzlich nur mit entsprechender Einwilligung oder einer anderen Rechtsgrundlage weitergegeben werden.» | «Andere Rechtsgrundlage» bleibt bei sechs von sieben Nennungen leer. Die Rechte, die Angehörige tatsächlich haben, fehlen. Bei einer FU kann die Person eine Vertrauensperson beiziehen (Art. 432 ZGB), die über den Behandlungsplan informiert wird (Art. 433 f.). Bei einer ärztlich angeordneten FU wird eine nahestehende Person, wenn möglich, schriftlich über die FU und das Recht informiert, ans Gericht zu gelangen (Art. 430 Abs. 5). | Einmal konkret machen: Entbindung von der Schweigepflicht, Vertrauensperson bei FU, Vertretung bei Urteilsunfähigkeit. Prüfbedarf durch den Rechtsdienst. |
| W1-029 | wichtig | D | «Daraus folgt weder gesicherte Überlegenheit noch Gleichwertigkeit.» (Family Connections) | Methodenkritik statt Orientierung. Angehörige wissen danach nicht, ob sich eine Teilnahme lohnt. In der Schweiz ist Family Connections nur auf Französisch belegt (Genf, Freiburg; Cohen et al., 2024); ein deutschsprachiges Angebot wurde nicht gefunden. | «Angehörigenprogramme können Belastung verringern. Welches Programm es ist, scheint weniger wichtig als die Teilnahme. Family Connections wird in der Schweiz bisher nur auf Französisch angeboten.» Dazu Links auf die Elterngruppe der KJPP und VASK Zürich. Prüfbedarf: aktuelle Verfügbarkeit. |
| W1-030 | optional | C | «Eine pauschale Wartefrist von einem Jahr gibt es dafür nicht.» | Widerlegt eine Annahme, die vorher nirgends genannt wird. | Streichen. |
| W1-031 | optional | A | «Nach der britischen Behandlungsleitlinie NICE sollen Medikamente nicht gezielt zur Behandlung von Borderline selbst … eingesetzt werden.» | Inhaltlich korrekt, aber umständlich. | «Es gibt kein Medikament, das Borderline selbst behandelt. Bei Begleiterkrankungen können Medikamente helfen.» |
| W1-032 | optional | A | Angebot «ipw, Psychotherapiestation für junge Erwachsene» im Abschnitt «Angebote im Kanton Zürich» («Aufgeführt sind spezialisierte Angebote …») | Die Angebotsseite nennt Lebenskrisen, Depression und Persönlichkeitsstörungen, aber weder Borderline noch DBT. | Als allgemeines Angebot kennzeichnen oder die Spezialisierung bei der ipw bestätigen lassen. |

## «Zugewandt und klar sprechen» und «Krisen begleiten»

**Zugewandt und klar sprechen:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-033 | wichtig | C | Abschnitte «Sechs Stufen der Validierung» und «Die sechs Stufen im Detail» | Die sechs Stufen stehen zweimal da, teils mit denselben Beispielsätzen. «Ich bin da. Erzähl mir, was los ist.» und «Du fühlst dich gerade allein gelassen und vergessen. Stimmt das so?» kommen je zweimal vor. | Eine Fassung: Stufe, ein Beispiel, ein typischer Stolperstein. Das halbiert den Abschnitt. |
| W1-034 | wichtig | A/C | «Drei Stellen der Anspannungskurve können eine Orientierung geben …» | Auf «Verstehen» hat die Kurve vier Stellen, und dort steht: «Wo jemand gerade steht, lässt sich von aussen nicht sicher erkennen.» Hier werden drei Stellen an äusseren Zeichen festgemacht: «Die Stimme wird lauter, Vorwürfe beginnen, der Körper spannt sich an.» Dasselbe Modell gibt es also in zwei Fassungen. Die Seite relativiert selbst («erlauben keine sichere Beurteilung»), die Spannung bleibt. | Ein Modell, eine Zählung. Hier nur ein Link und der Satz für die Pause. Zeichen als Hinweis für die eigene Gesprächsführung formulieren, nicht als Einschätzung des Zustands. |
| W1-035 | wichtig | D | «Eine Aussage wie «Wenn du gehst, bringe ich mich um» gehört nicht in eine Liste von Vorwürfen. Nehmen Sie sie ernst, und holen Sie eine professionelle Einschätzung oder Hilfe dazu.» | Die eigentliche Frage dahinter bleibt offen: Muss ich bleiben? Die Antwort steht nur in den FAQ («Darf ich die betroffene Person verlassen? Ja.»). | Ergänzen: «Sie können die Äusserung ernst nehmen und Hilfe holen, ohne Ihre Entscheidung davon abhängig zu machen. Für das Leben eines anderen Menschen tragen Sie nicht allein die Verantwortung.» Dazu ein Link auf die FAQ. |
| W1-036 | optional | D | «Beispiel-Dialog: von der Anspannung bis zur Pause» | Nur die Sätze der Angehörigen. Nach dem ersten Vorwurf sagt die andere Person nichts mehr, und in vier Sätzen geht es von der Validierung zum Gesprächsende. So liest es sich wie ein Abbruchskript. | Reaktionen der anderen Person einfügen oder den Abschnitt in «Satzbausteine» umbenennen. |
| W1-037 | optional | D | Teil «Nächster Schritt»: «Nennen Sie einen Schritt, den Sie selbst in der Hand haben.» | Der einzige der drei Teile ohne Beispielsatz. | «Ich gehe jetzt eine Runde spazieren.» |
| W1-038 | optional | B | «Ich verstehe, dass du das so empfindest.» | «So empfindest» kann distanzierend wirken, im Sinn von: Du siehst das halt so. | «Ich verstehe, dass dich das trifft.» |

**Krisen begleiten:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-039 | wichtig | A/D | Abschnitt «Wenn Suizidgedanken ein Thema sind» | Der Abschnitt erklärt, wie man fragt. Er sagt nicht, dass Suizidgedanken und Selbstverletzungen bei Borderline häufig sind und sich oft wiederholen. Erneute Äusserungen erscheinen nur als Warnzeichen im Abschnitt «Wenn Gefahr bleibt». Dass wiederholte Äusserungen weniger ernst genommen werden können, spricht die Seite nicht an; «immer ernst nehmen» steht nur in den FAQ. Die Anleitung selbst ist korrekt, deshalb wichtig statt kritisch. | Ergänzung unten. |
| W1-040 | wichtig | D | «Selbstverletzung kann ohne Todesabsicht erfolgen, schliesst Suizidgedanken aber nicht aus. Auch eine klein wirkende Verletzung erlaubt keine Entwarnung.» | Die Seite sagt: nach Suizidgedanken fragen und fachlich einschätzen lassen. Praktische Schritte nach einer entdeckten Selbstverletzung fehlen. Bei Borderline ist das eine häufige Situation (Goodman et al., 2017). | Kurzer Block «Wenn Sie eine Selbstverletzung bemerken»: ruhig bleiben; nach Suizidgedanken fragen; die Wunde versorgen und ärztlich behandeln lassen, wenn sie tief ist, stark blutet oder unklar ist; nicht moralisieren und nicht bestrafen; keine Geheimhaltung versprechen; mit Einverständnis das Behandlungsteam einbeziehen; die eigene Erschütterung ernst nehmen. Grundlagen: NICE NG225; Project Air (2018), bisher nur als Hintergrund gelistet; Family Guidelines. Prüfbedarf: Wortlaut gegen die Quellen abgleichen. |
| W1-041 | optional | A | «Begrenzen Sie den Zugang zu Medikamenten oder gefährlichen Gegenständen nur, wenn das für Sie selbst ohne Gefahr möglich ist, möglichst gemeinsam und nach professioneller Anleitung.» | Der Satz beginnt einschränkend («nur, wenn …») und rahmt eine gut belegte Massnahme der Suizidprävention als Ausnahme. Audit 02 hat ihn als «fachlich vorsichtig» bestätigt; das stimmt, positiv formuliert wäre er hilfreicher. | «Wenn es für Sie ohne Gefahr möglich ist, verringern Sie den Zugang zu Medikamentenvorräten, Waffen oder anderen gefährlichen Mitteln, am besten gemeinsam mit der Person.» Der bestehende Satz «Nehmen Sie nichts aus der Hand oder gegen Widerstand weg» bleibt. Prüfbedarf: eine Quelle zur Mittelbegrenzung ergänzen, z. B. WHO LIVE LIFE. |
| W1-042 | wichtig | C | «**Die Bereiche sind keine Sicherheitsbewertung.**» | Die drei «Bereiche» haben drei Vorbehalte hintereinander: «bewerten keine Diagnose», «keine Sicherheitsbewertung», «Kein Bereich bedeutet automatisch «sicher» oder «gefährlich»». Dazu steht der Zuständigkeitssatz («Sorgen Sie sich akut …») siebenmal im Seitentext und einmal in der Fusszeile. Auf der Seite, die unter Druck gelesen wird, ist die Wiederholung am dichtesten. | Ein Vorbehalt. Den Zuständigkeitssatz höchstens zweimal einbinden: in der Kurzbox oben und im Abschnitt Suizidgedanken. |
| W1-043 | optional | D | Liste «Was Sie in einer Krise vermeiden sollten» | Es fehlt der klassische Punkt: versprechen, Suizidgedanken für sich zu behalten. | Ergänzen: «… zu versprechen, Suizidgedanken geheim zu halten». |
| W1-044 | optional | B | «Niemand ist verpflichtet, eine nächste Krise vorherzusagen oder rechtzeitig zu melden.» | «Rechtzeitig zu melden» kann als Widerspruch zum Krisenplan im selben Abschnitt missverstanden werden. Der Wortlaut wurde am 14.10.2026 freigegeben (A03-026). | «Niemand muss eine nächste Krise vorhersagen können.» |

**Ergänzung (wichtig):**

Original: Der Abschnitt «Wenn Suizidgedanken ein Thema sind» beginnt mit «Wenn Sie sich konkret sorgen, fragen Sie ruhig und direkt, ob die Person Suizidgedanken oder einen Plan hat.»

Vorschlag: davor einfügen: «Bei Borderline kommen Suizidgedanken und Selbstverletzungen häufig vor, oft wiederholt. Auch wiederholte Äusserungen verdienen jedes Mal eine ernsthafte Reaktion. Das heisst nicht, dass Sie jedes Mal allein handeln müssen.»

## «Kinder», «Auf sich achten» und «Genesung»

**Wenn Kinder mitbetroffen sind:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-045 | wichtig | A | «Wenn ein Kind selbst stark belastet ist, können je nach Situation die Kinderarztpraxis, der schulpsychologische Dienst, die Kinder- und Jugendpsychiatrie, eine Familienberatung oder die örtliche Mütter- und Väterberatung passende Unterstützung anbieten.» | Die zentrale Schweizer Fachorganisation für Kinder psychisch erkrankter Eltern fehlt: das Institut Kinderseele Schweiz (iks, Winterthur, kinderseele.ch). | iks mit einem konkreten Angebot ergänzen. Prüfbedarf: Welches iks-Angebot sich direkt an Familien richtet, liess sich nicht klären. |

Sonst keine Befunde. Die Seite ist knapp, klar und richtig zum Melderecht (Art. 314c ZGB).

**Auf sich achten:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-046 | optional | C | «Lesen Sie nicht alles.» | Guter Rat, aber die Seite hat 2900 Wörter. Dazu kommen viele Vorbehalte: «Die Liste ist kein Test, keine Diagnose und kein Beweis …», «Fehlende Anzeichen bedeuten keine Entwarnung.» Die Atemübung hat fünf Einschränkungen. | Die Vertiefung «Belastung und Entlastung» mit den Warnsignalen zusammenlegen. Höchstens ein Vorbehalt pro Übung. |

**Genesung:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-047 | wichtig | A/D | Abschnitt «Realistische Hoffnung ohne Erfolgsdruck» | Der für Angehörige nützlichste Verlaufsbefund fehlt: Impulsive Symptome wie Selbstverletzung und Suizidversuche bessern sich am schnellsten. Leere, Wut, Einsamkeit und die Angst vor dem Alleinsein bleiben am längsten (Zanarini et al., 2007). Dass Remission wieder verloren gehen kann, wird nur angedeutet («Sie sagen nicht, wie vielen es am Ende der Studie dauerhaft gut ging.»). Zanarini et al. (2024) ist zitiert, aber im Text nicht erklärt. | «Oft bessern sich zuerst Selbstverletzungen und impulsive Handlungen. Gefühle von Leere, Einsamkeit oder Wut bleiben häufig länger. Eine ruhigere Phase heisst deshalb nicht, dass alles überstanden ist, und ein Rückfall nicht, dass nichts erreicht wurde.» |
| W1-048 | wichtig | A | «Für Minderjährige und bei einer Beistandschaft gelten zusätzliche Regeln. Klären Sie die konkrete Rolle mit den zuständigen Fachpersonen.» | Sechs Sätze ohne konkreten Inhalt, und das auf der falschen Seite. Der Abschnitt wurde am 14.10.2026 freigegeben (A03-019); die Verschiebung braucht einen Neuentscheid. Der Satz davor zur Vertretung bei Urteilsunfähigkeit greift für psychiatrische Kliniken zu kurz. Dort gelten nach Art. 380 ZGB die Regeln der FU mit der Vertrauensperson, nicht die allgemeine Vertretung nach Art. 378. | Nach «Behandlung» verschieben und mit dem dortigen Rechtsbefund zusammenführen. Prüfbedarf durch den Rechtsdienst. |
| W1-049 | optional | C | Abbildung 2 «Verschiedene Einflüsse, ein individueller Weg» | Fünf Begriffe um «Individueller Weg», ohne Pfeile, dazu ein Vorbehalt im Kurztext und ein Aufklappteil. Die Abbildung wiederholt die Liste darunter wörtlich und erklärt nichts, was der Text nicht schon sagt. | Streichen oder ersetzen durch eine Darstellung, die etwas zeigt, z. B. welche Beschwerden sich zuerst und welche zuletzt bessern (siehe oben). |
| W1-050 | optional | A | Quellenblock: «Gunderson et al. (2011) … Verwendet in: «Was die Forschung zeigt»» | Der Text nennt die CLPS-Ergebnisse (85 % Remission, 12 % Rückfälle) nicht. | Einen Satz ergänzen oder die Zuordnung korrigieren. |

## Unterstützung, Bücher, Fragen, Begriffe, Über, Impressum

**Unterstützung finden:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-051 | wichtig | A | «Für andere Kantone führt der schnellste Weg über Selbsthilfe Schweiz.» | Selbsthilfe Schweiz vermittelt Selbsthilfegruppen, keine professionelle Angehörigenberatung. Das Netzwerk Angehörigenarbeit Psychiatrie (NAP, angehoerige.ch) führt eine Karte der Angehörigenberatungsstellen in Schweizer psychiatrischen Institutionen und fehlt auf der ganzen Website. | NAP als ersten Weg für andere Kantone nennen, auch für Beratungsstellen anderer Zürcher Kliniken. Selbsthilfe Schweiz für Gruppen behalten. |

**Bücher für Angehörige:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-052 | wichtig | A | «Ein englischsprachiger Titel, aufgenommen, weil es für Jugendliche mit Borderline keinen vergleichbaren deutschsprachigen Eltern-Ratgeber gibt.» | Falsch, und auf derselben Seite widerlegt: von Auer und Kaess (2022), Hogrefe, Untertitel «Informationen für Eltern und weitere Bezugspersonen», ist ausdrücklich für Eltern von Jugendlichen geschrieben. Dazu kommt Wewetzer und Bohus (2016), «Borderline-Störung im Jugendalter. Ein Ratgeber für Jugendliche und Eltern», Hogrefe. | Begründung streichen. Aguirre als englische Vertiefung führen. Wewetzer und Bohus unter «Für Eltern» ergänzen. |
| W1-053 | optional | A | «DBT-Familienskills: Ein Praxisleitfaden · Claudia Trasselli · Hogrefe, 2022» | Die Autorenschaft ist unvollständig. | «Claudia Trasselli, Anne Kristin von Auer und Hans Gunia». |
| W1-054 | optional | A | «Mama, Mia und das Schleuderprogramm · Psychiatrie-Verlag, 2012, 3. Aufl. 2025» | Die Erstausgabe 2012 erschien bei BALANCE buch + medien, heute Teil des Psychiatrie Verlags. | «BALANCE buch + medien, 2012; Psychiatrie Verlag, 3. Aufl. 2025». |

Geprüft wurden zwölf der 19 Titel. Die übrigen zehn geprüften sind korrekt angegeben. «Mamas Monster» ist ein Buch über Depression, das ist auf der Seite vermerkt. Nicht geprüft: Glistrup, Homeier, Gliemann und Faichney, Sendera und Sendera, Aguirre, Kreisman und Straus sowie Lawson.

**Fragen und Nachschlagen:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-055 | wichtig | A | «Zuständig ist grundsätzlich die Kindes- und Erwachsenenschutzbehörde (KESB). Kantonal bezeichnete Ärztinnen und Ärzte können ebenfalls befugt sein.» | Bundesrechtlich korrekt, für Zürich aber falsch gewichtet. In einer akuten Lage wird eine FU häufig ärztlich angeordnet. Was Angehörige dann tun können, fehlt ganz: Sie werden informiert, sie können ans Gericht gelangen und sie können Vertrauensperson sein. | «Im Kanton Zürich können Ärztinnen und Ärzte eine FU für höchstens sechs Wochen anordnen. Als nahestehende Person werden Sie, wenn möglich, schriftlich informiert. Sie können innert zehn Tagen beim Gericht eine Überprüfung verlangen. Die betroffene Person kann Sie als Vertrauensperson beiziehen.» Quellen: EG KESR Zürich § 27 und § 29; ZGB Art. 430 Abs. 5, 432 und 439. |
| W1-056 | optional | A | «Genetische Einflüsse können die Anfälligkeit mitbestimmen.» | Die Grössenordnung fehlt. Zwillings- und Registerstudien schätzen den Anteil der Erbanlagen auf rund 40 bis 50 % (Distel et al., 2008: 42 %; Skoglund et al., 2021: 46 %). | Inhaltlicher Entscheid: Die Zahl kann Eltern entlasten (nicht nur Erziehung) oder belasten (Gene). Wenn ja: «Zwillings- und Familienstudien schätzen den Anteil der Erbanlagen an der Anfälligkeit auf rund 40 bis 50 %. Das heisst nicht, dass die Diagnose vererbt wird.» |

**Begriffe verständlich erklärt:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-057 | optional | A | (fehlende Einträge) | Es fehlen Begriffe, die auf der Website vorkommen oder in Berichten stehen: emotional instabile Persönlichkeitsstörung, fürsorgerische Unterbringung (FU), Vertrauensperson, Selbstverletzung, Schematherapie, Urteilsfähigkeit. | Ergänzen. Der erste Begriff braucht einen Neuentscheid zu V-1 (siehe Diagnose). |

**Über diese Website:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-058 | optional | B/C | «Das durchgeführte Aufgaben-, Such- und Kohärenzaudit belegt deshalb keine tatsächliche Verständlichkeit, emotionale Wirkung oder Wirksamkeit.» | Interne Prüfsprache auf einer öffentlichen Seite. Die Einschränkung (AR3-3) ist richtig dokumentiert, der Wortlaut richtet sich aber nicht an die Leserinnen und Leser. | Nur den Audit-Satz streichen. Der Satz davor nennt die fehlende Erprobung schon, und «Rückmeldung geben» lädt zu Hinweisen ein. |
| W1-059 | optional | C | «Der in der älteren Angehörigenliteratur verbreitete Begriff «Eiertanz» …» | Führt einen Begriff aus einem kritisch eingeordneten Buch ein, nur um ihn einzuordnen. | Streichen. Der Absatz davor trägt allein. |

**Impressum und Datenschutz:** Keine inhaltlichen Befunde. Die Durchsicht durch den Rechtsdienst bleibt eine dokumentierte Pendenz.

## Quellenprüfung

Die zentralen Quellen sind solide und meist korrekt wiedergegeben. Die Probleme liegen woanders: Einige Quellen werden im Text entwertet oder untertrieben, eine kritisch eingestufte Quelle trägt sechs Seiten, und das Verzeichnis führt verworfene Quellen weiter. Die Links wurden nicht einzeln aufgerufen; Audit 02 hat 27 PubMed-Links geprüft.

| Seite | Quelle | vollständig? | aktuell? | deckt die Aussage? | Bemerkung |
| --- | --- | --- | --- | --- | --- |
| Genesung, Begriffe | Zanarini et al. (2010) | ja | ja, ergänzt durch 2012 und 2024 | ja | 93 %, 50 % und 290 Personen korrekt wiedergegeben |
| Genesung | Gunderson et al. (2011) | ja | ja | nein | im Text nicht verwendet, Zuordnung korrigieren |
| Behandlung | Storebø et al. (2020), APA (2024) | ja | ja | ja, aber untertrieben | siehe Befund zu «Behandlung» |
| Diagnose, Behandlung | AWMF S3 038-015 (2022) | ja | abgelaufen, in Überarbeitung | ja | korrekt so gekennzeichnet |
| mehrere Seiten | NICE CG78 (2009) | ja | 2024 überprüft, keine Aktualisierung in Arbeit | ja | korrekt |
| Diagnose | Zanarini et al. (1998, 2004) | ja | klassisch, alt | ja | wird im Text entwertet, siehe Befund zu «Diagnose» |
| Diagnose | BFS, Kodierungshandbuch 2026 | ja | ja | ja | ICD-10-GM 2024 gilt seit 1.1.2025 und 2026 weiterhin, korrekt |
| Krise | Dazzi et al. (2014) | nein | ja | ja | Autorinnen, Titel und Zeitschrift fehlen: Psychol Med 44(16), 3361–3363. In PubMed als Editorial erfasst. |
| mehrere Seiten | Hoffman et al. (2005) | nein | – | teilweise | Band und Seiten fehlen: Family Process 44(2), 217–225 |
| mehrere Seiten | Mason und Kreger (2014) | ja | Originalausgabe 1998 | als Praxisquelle | siehe erster Befund unten |
| Verstehen | Linehan (1993) zu Abbildung 1 | ja | Grundlagenwerk | schwach | MBT passender, siehe Befund zu «Verstehen» |
| Fragen | ZGB Art. 426, 428, 429 | ja | Stand 1.7.2026 | teilweise | Art. 430 Abs. 5, 432, 439 und EG KESR Zürich fehlen |
| Grenzen | Opferhilfe Schweiz, EBG | teilweise | ja | ja | «Schutz» ohne URL; GSG Zürich fehlt |
| Grenzen | Kanton Zürich, Forensic Nurses | nein | – | ja | URL fehlt |
| Rolle, Kinder | Pro Juventute | nein | – | ja | URL nur als Text, nicht verlinkt |
| Auf sich achten | WHO Europa (2025) | nein | – | – | URL und Abrufdatum fehlen |
| Bücher | Seitenaussage zu Eltern-Ratgebern | – | – | widerlegt | von Auer und Kaess (2022); Wewetzer und Bohus (2016) |

**Befunde zur Seite «Quellen»:**

| ID | Priorität | Krit. | Zitat | Problem | Vorschlag |
| --- | --- | --- | --- | --- | --- |
| W1-060 | wichtig | A | Mason und Kreger: «Krisenhinweise sind nicht als heutige Notfallanleitung zu verwenden. Als Erfahrungs- und Praxisquelle kritisch lesen.», daneben «Verwendet auf: «Ihre Rolle», «Grenzen», «Auf sich achten», «Zugewandt und klar sprechen», «Krisen begleiten», «Genesung»» | Die Website warnt vor dem Buch und stützt sich gleichzeitig auf sechs Seiten darauf, auch auf «Was Sie sagen können» in «Krisen begleiten». Auf der Bücherseite steht es unter «historisch einflussreich oder kritisch einzuordnen». | Auf «Krise» durch Family Guidelines (Gunderson und Berkowitz, 2006) oder Project Air (2018) ersetzen. Sonst als Praxisanregung kennzeichnen, nicht als Beleg. |
| W1-061 | wichtig | A/C | 18 von 86 Einträgen: «Hintergrund, auf den Seiten nicht einzeln zitiert» | Darunter Quellen mit dem Vermerk, dass sie nicht tragen: Porges (2011) «in der Forschung umstritten … nur als didaktisches Modell mit Vorbehalt», LeDoux (1996) «nicht mehr als zentrale Begründung … verwendet». Ein öffentliches Verzeichnis mit verworfenen Quellen verwirrt und schwächt die Glaubwürdigkeit. Der BAG-Eintrag «Neuregelung der psychologischen Psychotherapie» ist als nicht zitiert markiert, wird auf «Behandlung» aber verlinkt. | Nicht zitierte Quellen ins interne Prüfprotokoll verschieben. BAG-Eintrag korrekt zuordnen. |
| W1-062 | optional | A | unvollständige Angaben (siehe Tabelle) | Dazzi, Hoffman, Forensic Nurses, Pro Juventute, WHO Europa und Opferhilfe «Schutz» sind unvollständig. | Ergänzen wie in der Tabelle angegeben. |
| W1-063 | optional | A | Dazzi et al. (2014): «Übersicht über mehrere Studien» | Literaturübersicht in Form eines Editorials. Die Beschreibung stimmt, der Beleg ist schmal. | Prüfbedarf: die Metaanalyse von Blades et al. (2018, Clinical Psychology Review) ergänzen. |

## Seitenübergreifende Auffälligkeiten

| Thema | Vorkommen | Beobachtung |
| --- | --- | --- |
| Absicherungsschicht | alle Inhaltsseiten ohne Quellen und Impressum | «individuell» mit Endungen 40-mal, Wendungen mit «ableiten» 17-mal, Formen von «garantieren» 13-mal, «nicht bei allen» 8-mal; zehn Aufklappteile «Grenzen des Bildes» oder «Grenzen der Darstellung». Vorschlag für eine Regel: höchstens ein Vorbehalt pro Abschnitt, ausgenommen Sicherheits- und Rechtsgrenzen. Die Vertiefungen zu Abbildungen verlangt das PUK Website-Profil; zu kürzen ist ihr Inhalt. |
| Suizidalität und Selbstverletzung | Verstehen, Diagnose, Krise; das Kriterium steht nur im Glossar | an keiner Stelle als häufiges Merkmal benannt, siehe die beiden kritischen Befunde und den wichtigen Befund zu «Krise» |
| Eltern minderjähriger Kinder | Kurz («erwachsenen»), Grenzen (Rollen; «Konsequenz» erwähnt minderjährige Kinder einmal), Kommunizieren («Bei Minderjährigen gelten andere Schutz- und Sorgepflichten.»), Genesung | Einzig «Diagnose» hat einen inhaltlichen Abschnitt «Bei Jugendlichen». Ein eigener kurzer Abschnitt oder eine eigene Seite für Eltern von Jugendlichen würde die verstreuten Sätze ersetzen. |
| Anspannungskurve | Verstehen (vier Stellen), Kommunizieren (drei Stellen) | zwei Fassungen; Spannung bei der Erkennbarkeit von aussen |
| Zuständigkeitssatz «Sorgen Sie sich akut …» | per Platzhalter auf 13 Seiten, auf «Krise» siebenmal plus Fusszeile | durch den Profilentscheid vom 9.10.2026 gedeckt; das Problem ist die Dichte auf «Krise» |
| Schuldformulierungen | Verstehen («ist zu einfach») gegen Verstehen-Mythen, Diagnose, Fragen («nicht schuld») | uneinheitlich stärker und schwächer |
| Seitennamen | Startseite «Was Borderline beschreiben kann», «Behandlung und Angebote», «Verlauf und Genesung»; Navigation «Eigene Entlastung»; Suche «Unterstützung anbieten und eigene Grenzen wahren» | Die Seiten heissen jeweils anders: «Borderline verstehen», «Behandlung und Ihre Rolle darin», «Genesung», «Unterstützung finden», «Ihre Rolle klären». Thema für W2. |
| Sprunglisten «Direkt zu» | Krise, Auf sich achten, Kommunizieren | andere Reihenfolge als die Abschnitte auf der Seite, Thema für W2 und W3 |
| Mason und Kreger | sechs Themenseiten, Bücherseite, Quellen | als Beleg genutzt und zugleich als kritisch eingestuft |

## Offene Prüfpunkte

**Rechtsdienst:** FU-Rechte von Angehörigen (ZGB Art. 430 Abs. 5, 432, 439; EG KESR Zürich § 27 und § 29), Art. 380 statt 378 ZGB bei Behandlung in einer psychiatrischen Klinik, Wortlaut zum Zürcher Gewaltschutzgesetz.

**Fachliche Entscheide:** ob eine Zahl zu Suizidversuchen genannt wird; ob die Erblichkeit beziffert wird; Wortlaut des neuen Blocks zu Selbstverletzung gegen NICE NG225, Project Air und Family Guidelines.

**Quellen ergänzen:** Mittelbegrenzung (z. B. WHO LIVE LIFE), Blades et al. (2018) zum Fragen nach Suizid, Bateman und Fonagy (2009) der Abbildung 1 auf «Verstehen» zuordnen, Zanarini et al. (2007) für den Verlauf nach Symptomgruppen.

**Angebote prüfen:** konkretes iks-Angebot für Familien, Verfügbarkeit von Family Connections in der Deutschschweiz, Borderline-Schwerpunkt der ipw-Station, Swissmedic-Zulassungen.

**Bücher:** sieben nicht geprüfte Titel (siehe Bücherbefunde).

**Neuentscheide:** Bezeichnung zu F60.31 (Entscheid V-1); Abschnitte mit Freigabe vom 14.10.2026 (A03-019 Genesung, A03-025 Rolle, A03-026 Krise); Dichte des Zuständigkeitssatzes (Profilentscheid 9.10.2026).

## Quellen dieses Reviews

Recht und Verwaltung: [ZGB, Fassung 1.7.2026](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/24/233_245_233/20260701/de/html/fedlex-data-admin-ch-eli-cc-24-233_245_233-20260701-de-html-2.html) · [EG KESR Zürich, LS 232.3](https://www.zh.ch/de/politik-staat/gesetze-beschluesse/gesetzessammlung/zhlex-ls/erlass-232_3-2012_06_25-2013_01_01-115.html) · [Gewaltschutzgesetz Zürich, LS 351](https://www.notes.zh.ch/appl/zhlex_r.nsf/WebView/9E289501A2802D72C1258BF900219038/$File/351_19.6.06_127.pdf) · [KLV, Fassung 1.8.2026](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1995/4964_4964_4964/20260801/de/html/fedlex-data-admin-ch-eli-cc-1995-4964_4964_4964-20260801-de-html.html) · [BFS, Kodierungshandbuch 2026](https://dam-api.bfs.admin.ch/hub/api/dam/assets/36144081/master)

Leitlinien: [NICE CG78, Update-Informationen](https://www.nice.org.uk/guidance/cg78/chapter/Update-information) · [AWMF S3 Borderline 038-015](https://register.awmf.org/assets/guidelines/038-015l_S3_Borderline-Persoenlichkeitsst%C3%B6rungen_2022-11-abgelaufen.pdf)

Studien: [Lak et al. (2025), Metaanalyse Suizidalität](https://pubmed.ncbi.nlm.nih.gov/40279864/) · [Temes et al. (2019), 24-Jahres-Verlauf](https://pubmed.ncbi.nlm.nih.gov/30688417/) · [Goodman et al. (2017), Selbstverletzung](https://pubmed.ncbi.nlm.nih.gov/28544496/) · [Ellison et al. (2018), Prävalenz](https://pubmed.ncbi.nlm.nih.gov/30447724/) · [Zanarini et al. (2007), Verlauf der Symptome](https://pubmed.ncbi.nlm.nih.gov/17541053/) · [Dazzi et al. (2014)](https://pubmed.ncbi.nlm.nih.gov/24998511/) · [Hoffman et al. (2005)](https://pubmed.ncbi.nlm.nih.gov/16013747/) · [Cohen et al. (2024), Family Connections in Frankreich und der Schweiz](https://link.springer.com/article/10.1186/s40479-024-00254-3)

Weitere Studien: [Gunderson et al. (2018), Nature Reviews Disease Primers](https://doi.org/10.1038/nrdp.2018.29) · [Leichsenring et al. (2024), World Psychiatry](https://doi.org/10.1002/wps.21156) · [Distel et al. (2008), Erblichkeit](https://doi.org/10.1017/S0033291707002024) · [Skoglund et al. (2021), Erblichkeit](https://doi.org/10.1038/s41380-019-0442-0)

Angebote und Bücher: [PUK KJPP, Persönlichkeitsstörungen (HYPE Züri)](https://www.pukzh.ch/unsere-angebote/kinder-und-jugendpsychiatrie/behandlungsschwerpunkte/persoenlichkeitsstoerungen/) · [PUK KJPP, Gruppenangebote](https://www.pukzh.ch/unsere-angebote/kinder-und-jugendpsychiatrie/behandlung-wo-und-wie/gruppen-intensivwochen/gruppen/) · [NAP, Angehörigenberatungsstellen](https://www.angehoerige.ch/angehoerige/) · [ipw, Psychotherapiestation für junge Erwachsene](https://ipw.ch/angebot/kinder-jugendliche-junge-erwachsene/psychotherapiestation-fuer-junge-erwachsene) · [Hogrefe, von Auer und Kaess](https://www.hogrefe.com/ch/shop/ratgeber-borderline-persoenlichkeitsstoerung-96001.html) · [Hogrefe, Wewetzer und Bohus](https://www.hogrefe.com/ch/shop/borderline-stoerung-im-jugendalter.html) · [Hogrefe, DBT-Familienskills](https://www.hogrefe.com/ch/shop/dbt-familienskills-96021.html)
