# Aktueller Pendenzen- und Entscheidstatus

**Stand: 15. Oktober 2026**

Dieses Dokument ist nach der Migration die verbindliche Übersicht für offene Arbeiten an der Website. Der ausführliche Bericht unter `authoring/PRUEFBERICHT.md` dokumentiert frühere Prüfungen und Entscheidungen, ist aber kein aktueller Aufgabenplan.

## Produktionsstand

### r4-31 in Arbeit

r4-31 korrigiert zwei P1-Befunde aus dem zweiten Codex-Review von #689. Beide betreffen nur die Suche:

- Jedes Tötungsverb wird gewertet, und Suizid hat Vorrang. Bisher ging «er will mich umbringen und ich will mich töten» in r4-30 auf «Gewalt».
- Die Infinitivregel gilt nur noch mit Steuerverb. Bisher ging «er hat mich geschlagen und will mich umzubringen» auf «Suizid».

Den Entscheid hat die Auftraggeberin am 15. Oktober 2026 gefällt: «r4-31 jetzt». Nachweis: `audit-results/2026-10-15-delta-r4-31/`.

### r4-30 veröffentlicht und nachgeprüft

#689 wurde am 15. Oktober 2026 um 13:50:44 UTC gemergt (Merge-Commit `0fda233`, Stand `615bdd3`). Das war 13 Sekunden nach den zwei Codex-Befunden auf diesem Stand und bevor sie geprüft waren. R28-O01 und R29-P20 sind damit nicht eingehalten. Der veröffentlichte Stand ist von der Prüfsitzung bestätigt (Abschlussbestätigung 2, `0c711b8`). Die zwei Codex-Befunde behebt r4-31.

Die Produktionsprüfung lief am 15. Oktober 2026 von 13:59 bis 14:25 UTC in einer eigenen Sitzung (`audit-results/2026-10-15-delta-r4-30/PRODUKTIONSPRUEFUNG.md`). Ergebnis: bestanden mit Hinweisen, alle 11 Punkte erfüllt.

- 23 Seiten mit Build r4-30
- 207 von 207 Textvergleichen gleich
- 9 von 9 Nicht-HTML-Dateien bytegleich
- 44 von 44 Sprungziele
- 88 von 88 Weiterleitungen
- 272 von 272 Such-Ersttreffer gleich wie in der lokalen Kopie und wie festgeschrieben
- Header, Robots und kein `Set-Cookie` wie entschieden; 0 `tel:`

Optionale Hinweise: PC30-1 (Zählkorrektur im r4-29-Bericht) und PC30-2 (`suchtest.mjs` um eine Basis-URL und die Umrechnung auf Pretty URLs ergänzen, damit die Produktion direkt geprüft werden kann; Pendenz R31-P01).

r4-30 korrigiert drei Punkte aus r4-29:

- den P1-Befund aus dem Codex-Review von #687: «die sorgeberechtigten Eltern» auf «Fragen», «Behandlung» und der Jugendlichen-Seite; der Wortlaut ist von der Auftraggeberin am 15. Oktober 2026 um 13:13 Uhr freigegeben;
- die Suchlücken aus R3 (R3C-A9);
- die Linkregel auf «Quellen» (R3C-A10), dazu nach D30-02 das EBG-Blatt A1 ohne Link.

Dazu kommen der Zwischenspeicher der Suche (W3C-12) und die festgeschriebenen Suchtests (`authoring/tests/suche-ersttreffer.tsv`, `authoring/tools/suchtest.mjs`). Nachweis: `audit-results/2026-10-15-delta-r4-30/`.

Auslegung der Linkregel (Entscheid vom 15. Oktober 2026, D30-05): Ein eingeklappter Notfall-Knopf, dessen Nummern erst nach einem Klick erscheinen, gilt nicht als Notfallblock. Die PUK-Seiten bleiben deshalb verlinkt.

### r4-29 (Release C) veröffentlicht und nachgeprüft

Release C (r4-29) setzt die Pakete 4 und 6 des Massnahmenplans vom 14. Oktober 2026 um, dazu die Befunde W2-001 bis W2-023 und die Entscheide E4, E7 und E9: neue Seite «Wenn Ihr jugendliches Kind betroffen ist», Kürzungen auf fast allen Seiten (30 666 statt 35 422 Wörter), Verweis im Text 7-mal statt 28-mal. Die Fassungen hat die Auftraggeberin am 15. Oktober 2026 freigegeben. Geprüft wurde in eigenen Sitzungen: Rechtsabgleich, Sprach-Review S, W3 und R3 («Go mit Auflagen», angenommen).

Ablauf des Merge:

- Pull Request #687 (Stand `a7c5ec1`, Produktionsexport) wurde am 15. Oktober 2026 um 09:48 UTC eröffnet und um 09:49:24 UTC gemergt (Merge-Commit `0fc0474`). Das war vor der Annahme von R3 und bevor das Codex-Review fertig war (09:53:30 UTC). R28-O01 ist damit nicht eingehalten.
- Codex meldete danach zwei Befunde. Der P2-Befund (Pendenzen nicht nachgeführt) ist mit #688 erledigt. Der P1-Befund («die Eltern» statt «die sorgeberechtigten Eltern») wird in r4-30 korrigiert.
- Die Nachweise kamen mit #688 (Merge-Commit `53c5655`, 10:11:46 UTC); `site/` blieb dabei unverändert. Das Codex-Review von #688 sah nur die Nachweis-Commits.

Die Produktionsprüfung (R3C-A6) lief am 15. Oktober 2026 von 10:18 bis 10:44 UTC in einer eigenen Sitzung. Ergebnis: bestanden mit Hinweisen, alle 11 Punkte erfüllt.

- 23 Seiten mit Build r4-29
- 207 von 207 Textvergleichen gleich
- 9 von 9 Nicht-HTML-Dateien bytegleich
- 36 von 36 Sprungziele
- 88 von 88 Weiterleitungen
- 102 von 102 Such-Ersttreffer wie lokal
- Header, Robots und kein `Set-Cookie` wie entschieden

Nachweis: `audit-results/2026-10-15-release-c-r4-29/`, darin `PRODUKTIONSPRUEFUNG.md`.

### r4-28 veröffentlicht und nachgeprüft

r4-28 korrigiert fünf Aussagen aus r4-27, die das Codex-Review von PR #684 beanstandet hat: den Fristbeginn für das Verlängerungsgesuch beim Gewaltschutz (§ 6 Abs. 1 GSG) und die Höchstdauer im Gesetzeswortlaut (§ 6 Abs. 3 GSG), die Aussage zur ipw, die Definition hinter 85 % Remission, die neun Kriterien nach DSM-5-TR und die Einschränkung von Blades et al. (2018) auf Befragungen in Studien. Die konkreten Fassungen wurden am 14. Oktober 2026 im Namen der PUK freigegeben. Der Produktionsbuild meldet 22 Seiten, 0 Blocker und 0 Hinweise; 33 Dateien sind bytegleich. PR #685 wurde als Merge-Commit `86304d428e8fd7de7eb3d9a0d4b3d9ed13527b41` übernommen. Netlify veröffentlichte am 15. Oktober 2026 um 04:37 UTC den Produktionsdeploy `6ad05887e9398ce80e74cab8`. Der anschliessende Produktionstest bestand 44 von 44 Seitenläufen mit Buildmarker und Assets r4-28, 54 von 54 Such-Ersttreffer wie lokal, 26 von 26 Suchintentionen, alle 7 neuen und 5 entfernten Formulierungen, 8 von 8 Sprungziele, den No-JavaScript-Fallback, die 404-Seite, Sicherheitsheader und `robots.txt`; die 9 ausgelieferten Nicht-HTML-Dateien sind bytegleich mit `site/`. Die fünf beanstandeten Stellen standen vom 14. Oktober 2026, 20:53 UTC, bis zum 15. Oktober 2026, 04:37 UTC, online. Der Nachweis liegt unter `audit-results/2026-10-14-delta-codex-r4-28/`. Neu offen ist R28-O01: einen Pull Request erst nach abgeschlossenem und geprüftem Codex-Review mergen.

### r4-27 veröffentlicht und nachgeprüft

Release B (r4-27) setzt die Pakete 2 (Kernwissen), 3 (Schweizer Recht), 5 (Anlaufstellen und Literatur) und 7 (Quellen) des Massnahmenplans vom 14. Oktober 2026 um und zieht M6.7 vor. Die konkreten Fassungen wurden am 14. Oktober 2026 im Namen der PUK freigegeben; Paket 3 hat der Auftraggeber ohne Prüfung durch den Rechtsdienst freigegeben. PR #684 wurde als Merge-Commit `8dbf1be6b291cb3fd8f5daa5db5202e9f8eac3fb` übernommen. Netlify veröffentlichte am 14. Oktober 2026 um 20:53 UTC den Produktionsdeploy `6acfebd961b825c290b87077`. Der anschliessende Produktionstest bestand 44 von 44 Seitenläufen mit Buildmarker und Assets r4-27, 54 von 54 Such-Ersttreffer wie lokal, 26 von 26 Suchintentionen, alle 40 neuen und 14 entfernten Formulierungen, 8 von 8 Sprungziele, den No-JavaScript-Fallback auf vier Seiten, die 404-Seite, Sicherheitsheader und `robots.txt`; die 9 ausgelieferten Nicht-HTML-Dateien sind bytegleich mit `site/`. Der Nachweis liegt unter `audit-results/2026-10-14-delta-release-b-r4-27/`. Offen bleiben R27-O01 bis R27-O05: die juristische Prüfung der Rechtstexte, R2 für die neue Abbildung auf «Genesung», die Wortbilanz (+1312 Wörter; «Behandlung» 3145, Ziel nach Release C unter 2400), die Teilwortsuche bei «FU» und die direkte Bestätigung der Angebote von ipw und iks.

### r4-26 veröffentlicht und nachgeprüft

Die Nachbesserung von Release A (r4-26) wurde mit PR #682 als Merge-Commit `b1815260ff77901e29fdfcd001a92391aa907b77` übernommen. Netlify veröffentlichte am 14. Oktober 2026 um 17:12 UTC den Produktionsdeploy `6acfb7f924705af6e61b1e33`. Der anschliessende Produktionstest bestand 42 von 42 Seitenläufen mit Buildmarker und Assets r4-26, 54 von 54 Such-Ersttreffer wie lokal, 11 von 11 festgeschriebene Suchintentionen, alle neuen und entfernten Formulierungen, den No-JavaScript-Fallback, die 404-Seite, Sicherheitsheader und `robots.txt`; die 9 ausgelieferten Nicht-HTML-Dateien sind bytegleich mit `site/`. r4-26 schliesst die nur teilweise erfüllten Abnahmekriterien von M1.1, M1.5, M1.6 und M1.8 sowie R25-O01 und R25-O03. Der Nachweis liegt unter `audit-results/2026-10-14-delta-nachbesserung-r4-26/`. Offen bleiben R26-O01 bis R26-O04, darunter die Wortbilanz von «Krisen begleiten» (1949 Wörter, Ziel nach Release C höchstens 1800).

### r4-25 veröffentlicht und nachgeprüft

Release A (r4-25, Paket 1 Sicherheit: Suizidalität und Selbstverletzung) wurde mit PR #681 als Merge-Commit `d29ca85d207ae9162bda329bec3d9073748e50ab` übernommen. Netlify veröffentlichte am 14. Oktober 2026 um 15:18 UTC den Produktionsdeploy `6acf9d4d6d2b65496d1a1775`. Der anschliessende Produktionstest bestand 42 von 42 Seitenläufen mit Buildmarker und Assets r4-25, 54 von 54 Such-Ersttreffer wie lokal, 9 von 9 neue Suchintentionen, alle neuen und entfernten Formulierungen, den No-JavaScript-Fallback, die 404-Seite, Sicherheitsheader und `robots.txt`. Grundlage sind der inhaltliche Review W1 (`audit-results/2026-10-14-inhalt-w1-r4-24/`) und der Massnahmenplan vom 14. Oktober 2026; der Nachweis liegt unter `audit-results/2026-10-14-delta-sicherheit-r4-25/`.

### r4-23 und r4-24 gemergt und ausgeliefert

PR #679 (r4-23, Sprachmassnahmen A03-019 bis A03-038) wurde als Merge-Commit `9dad4ba9b5b24b055ce0defb23e9de32b7e8f5ad` übernommen, PR #680 (r4-24, Footer als visuelle Sekundärebene) als Merge-Commit `38007a024e73703b132ab7ae9e34c6b4623e54b5`. Laut Netlify war vom 14. Oktober 2026, 12:26 UTC, bis zur Veröffentlichung von r4-25 der Produktionsdeploy `6acf74dbec424b04acd344d1` mit Commit `38007a0` aktiv. Ein eigener Produktions-Smoke-Test für r4-23 und r4-24 ist nicht dokumentiert; ihre Seiten wurden im Produktionstest von r4-25 strukturell mitgeprüft. Der Nachweis zu r4-23 liegt unter `audit-results/2026-10-14-delta-sprach-r4-23/`.

### r4-22 veröffentlicht und nachgeprüft

PR #676 wurde als Merge-Commit `7864dab6f48ef4e52db1e783387032a0c0de8e93` übernommen. Die öffentliche Website lieferte danach r4-22. Der anschliessende Produktions-Smoke-Test bestand 169 von 169 Browserprüfungen ohne Laufzeitfehler. Bestätigt wurden alle 21 regulären Seiten, die eigene 404-Seite, 320-Pixel-Reflow, Tastaturbasis, No-JavaScript-Fallback, alle 36 festgeschriebenen Such-Ersttreffer, Sicherheitsheader, Robots-Steuerung und repräsentative Weiterleitungen. Das Produktionsergebnis ist in PR #676 und unter `audit-results/2026-10-14-delta-review-r4-22/` dokumentiert.

Das abschliessende Audit 06 wurde auf dem damals aktuellen `main`-Commit `160a42f92eb78e4a0af806fc74babea1ab712937` und der öffentlichen Produktion wiederholt. Es fand keine neuen P0-/P1-Befunde oder Release-Blocker und bestätigt ein **CONDITIONAL GO** für den fortgesetzten Betrieb von r4-22. Die Einschränkung betrifft weiterhin die fehlende interne Rechts-/Datenschutz-Gesamtprüfung und die bewusst nicht durchgeführten realen Screenreader-, Geräte- und Nutzendentests; sie ist keine technische Releaseblockade. Der aktuelle Abschlussnachweis liegt unter `audit-results/2026-10-14-abschluss-r4-22/`.

### r4-21 veröffentlicht und nachgeprüft

Die P1- sowie die fachlichen, rechtlichen, sprachlichen und visuellen P2-Korrekturen des Bestandsaudits vom 13. Oktober 2026 wurden mit PR #672 gemergt. Die Produktion unter `https://borderline-angehoerige.netlify.app` lieferte danach zunächst Build r4-19; der danach nachgeprüfte Produktionsstand war Build r4-21.

Der anschliessende Produktions-Smoke-Test bestätigte Seiten, Nutzerwege, 404, Weiterleitungen, Header, Robots-Steuerung, Cache-Regeln und Buildparität. Er fand jedoch eine P1-Suchlücke: direkte Begriffe wie «Suizidgedanken» funktionierten, gleichbedeutende Mehrwortformulierungen wie «Mein Kind will nicht mehr leben» führten nicht zuverlässig zu den Kriseninhalten. Damit war die Produktionsbedingung aus Audit 06 nicht vollständig erfüllt.

Der eng begrenzte Hotfix wurde mit PR #673 gemergt. Build r4-20 erkennt Mehrwort-Intentionen vor Einzelwörtern und priorisiert die längste passende Phrase. Der lokale Delta-Smoke-Test bestand 134 von 134 Prüfungen; der anschliessende Produktions-Smoke-Test bestand 154 von 154 Prüfungen. Alle 14 gezielten Safety-/Überlastungssuchen führen zum vorgesehenen Ersttreffer. Der P1-Suchbefund ist damit geschlossen. Der Nachweis liegt unter `audit-results/2026-10-13-delta-suche-r4-20/`; das Produktionsergebnis ist zusätzlich in PR #673 dokumentiert.

Die Rechts-/Datenschutzdurchsicht bleibt zudem als Evidenzgrenze bestehen: Die Texte sind am Zürcher IDG ausgerichtet, aber noch nicht nachweislich durch die zuständige interne Stelle geprüft. Die technische Umsetzung ist dadurch nicht blockiert; eine vollständige Schliessung der rechtlichen Audit-Akzeptanzkriterien wäre ohne diesen Nachweis jedoch falsch.

### P3-Optimierungspaket r4-21

Mit PR #674 wurden die redaktionellen Befunde A03-010 bis A03-018 und die visuell-didaktischen Befunde A04-005 bis A04-007 umgesetzt. Die Änderungen vereinfachen Schnellorientierungen, bereinigen Grammatik und Satzzeichen, entlasten dichte Passagen und schärfen die Aussagen der drei betroffenen Wissensdarstellungen. Der Krisenhinweis beim DEAR-Modell steht nun ausserhalb der Figur im zugehörigen Abschnitt.

Die Altersinklusion der Angehörigenberatung wurde über alle 22 ausgelieferten Seiten und die kanonischen Quellen geprüft. Es gibt keine Aussage, welche die Beratung auf Erwachsene begrenzt. Der bestätigte Satz steht im Footer nun auch typografisch als eigener vollständiger Satz: «Die Fachstelle Angehörigenarbeit der PUK berät Angehörige kostenlos und vertraulich.»

Der lokale Produktions-Build meldet 22 Seiten, 0 Blocker und 0 Hinweise; 33 Dateien sind bytegleich zum generierten Export. Eine Browsermatrix aus 22 Seiten, vier Breiten und zwei Textgrössen bestand 1150 von 1150 Einzelprüfungen ohne Laufzeitfehler. Alle 36 Such-Ersttreffer sind gegenüber der Produktion r4-20 unverändert; die sechs Safety- und drei Überlastungssuchen bleiben korrekt. Die drei geänderten Wissensdarstellungen wurden bei 320 und 1440 CSS-Pixel visuell kontrolliert.

A03-H01 bleibt als nicht empirisch überprüfte Wirkungshypothese dokumentiert. Der Titel «Krisen begleiten» wurde nicht geändert; ohne reale Nutzendentests wird weder eine belastende noch eine entlastende Wirkung behauptet.

PR #674 wurde als Merge-Commit `1cb33e0a1bd499c7b8367213851373b6dd027ab5` übernommen. Die öffentliche Website lieferte danach r4-21. Der anschliessende Produktions-Smoke-Test bestand 169 von 169 Browserprüfungen ohne Laufzeitfehler. Alle 21 regulären Seiten, die eigene 404-Seite, Tastaturbasis, No-JavaScript-Fallback, alle 36 festgeschriebenen Such-Ersttreffer, Sicherheitsheader, Robots-Steuerung und repräsentative Weiterleitungen wurden bestätigt. Das Produktionsergebnis ist in PR #674 dokumentiert.

## Aktuell sofort umsetzbare Pendenzen

### Entscheide zum Massnahmenplan vom 14. Oktober 2026

| Nr. | Frage | Stand | Datum | Entschieden von |
| --- | --- | --- | --- | --- |
| E1 | Zahl zu Suizidversuchen nennen? | entschieden: keine Zahl, qualitativ «häufig» | 14.10.2026 | Auftraggeber, Fachstelle Angehörigenarbeit |
| E2 | Erblichkeit beziffern? | entschieden: «rund 40 bis 50 %» mit Einordnung (M2.8, r4-27) | 14.10.2026 | Auftraggeber |
| E3 | Bezeichnung zu F60.31 ergänzen (Neuentscheid zu V-1)? | entschieden: ICD-10-GM-Wortlaut ergänzt (M2.2, r4-27) | 14.10.2026 | Auftraggeber |
| E4 | Wie Eltern von Jugendlichen ansprechen? | entschieden: eigene Seite «Wenn Ihr jugendliches Kind betroffen ist» (r4-29) | 15.10.2026 | Auftraggeberin |
| E5 | Mason und Kreger als Beleg? | entschieden: (a) auf «Krisen begleiten» ersetzt, sonst als Praxisanregung kennzeichnen | 14.10.2026 | Claude, vom Auftraggeber delegiert |
| E6 | Nicht zitierte Quellen im öffentlichen Verzeichnis? | entschieden: ins interne Prüfprotokoll `authoring/QUELLEN-HINTERGRUND.md` verschoben (M7.2, r4-27) | 14.10.2026 | Claude, vom Auftraggeber delegiert |
| E7 | Zuständigkeitssatz im Text | entschieden: höchstens einmal pro Seite, nur auf Seiten zu Selbstgefährdung, Gewalt oder akuter Krise (sieben Seiten, r4-29) | 15.10.2026 | Auftraggeberin |
| E8 | Am 14.10.2026 freigegebene Stellen wieder öffnen? | entschieden: A03-019 nach «Behandlung» verschoben (M3.4), A03-025 nur ergänzt (M3.5), A03-026 nicht geöffnet (r4-27) | 14.10.2026 | Claude, vom Auftraggeber delegiert |
| E9 | Redaktionsregel für Vorbehalte | entschieden: höchstens ein Vorbehalt pro Abschnitt, ausgenommen Sicherheits- und Rechtsgrenzen; dieselbe Regel für Entlastungssätze, ein Kernsatz pro Seite (r4-29) | 15.10.2026 | Auftraggeberin |
| E10 | Abbildung 2 auf «Genesung» | entschieden: ersetzt durch «Was sich oft zuerst bessert, was länger bleibt» (M2.6, r4-27; R2 offen) | 14.10.2026 | Claude, vom Auftraggeber delegiert |

Zu Paket 3 (Schweizer Recht) entschied der Auftraggeber am 14. Oktober 2026, es in Release B umzusetzen und die Fassungen selbst freizugeben, ohne Prüfung durch den Rechtsdienst. Das Abnahmekriterium «Rechtsdienst hat den Wortlaut bestätigt» (M3.1, M3.3) ist damit nicht erfüllt; die juristische Prüfung bleibt als R27-O01 empfohlen.

Für Release C hat die Auftraggeberin am 15. Oktober 2026 ausserdem entschieden:

- Selbstbeschreibung in der Fusszeile: «Sie richtet sich an Angehörige und Bezugspersonen und ergänzt die Beratung der Fachstelle.» (W2-012)
- neue Seite ohne vorherige KJPP-Abstimmung veröffentlichen (F0, Option A)
- W3-Korrekturen «Suche und Kleines jetzt»
- R3 «Go mit Auflagen» annehmen; W1 und R1 für r4-29 «entfällt»
- drei Links auf «Quellen» entfernen, die auf Seiten mit Notfallblock führen
- Suchlücken und Linkentfernung in r4-30 direkt nach dem Merge

Belege: `audit-results/2026-10-15-release-c-r4-29/FREIGABE.md` mit den Nachträgen 1 und 2.

### Release C (r4-29) · Auflagen aus R3 und neue Pendenzen

| Nr. | Pendenz | Frist | Wer |
| --- | --- | --- | --- |
| R3C-A5 | Codex-Review abschliessen und prüfen; Merge nur auf ausdrücklichen Auftrag (wie R28-O01) | bei #687 nicht eingehalten (siehe «r4-29 veröffentlicht»); gilt weiter für jeden Pull Request | bauende Sitzung, Auftraggeberin |
| R3C-A6 | Produktionsprüfung r4-29 | erledigt 15.10.2026: bestanden mit Hinweisen (`PRODUKTIONSPRUEFUNG.md`) | Prüfsitzung, die nicht gebaut hat |
| R3C-A8 | Visualisierungs-Check und R2 für die 12 Abbildungen mit neuem Wortlaut und für `v-ge-forschung` (R27-O02) | 31.10.2026 | Prüfsitzung; Korrekturen nur nach Freigabe |
| R3C-A9 | Suchlücken schliessen: «Selbstmordgedanken», «Selbstmordversuch», «lebensmüde», «Todeswunsch», «Suizidandrohung», «Überdosis» u. a. ohne Treffer; «er droht mich umzubringen» auf Gewalt statt Suizid; Anfragen festschreiben | in r4-30 umgesetzt; festgeschrieben in `authoring/tests/suche-ersttreffer.tsv` (317 Anfragen); Tötungsverben nach Teilsatz, Sprecher und Objekt gewertet, mit Suizid-Vorrang bei «sich», Suizid-Phrasen und Suizidwörtern (D30-09, D30-13, D30-16 bis D30-20, Codex P1 auf #689); veröffentlicht mit r4-30 (#689) und in der Produktion nachgeprüft; Suchregel ergänzt in r4-31 | bauende Sitzung; Nachprüfung durch Prüfsitzung |
| R3C-A10 | Drei Links auf «Quellen» entfernen (Forensic Nurses, Opferhilfe «Schutz», Pro Juventute), nach D30-02 auch EBG-Blatt A1; Angabe bleibt als Text, Linkregel bleibt | in r4-30 umgesetzt; veröffentlicht mit r4-30 (#689) und in der Produktion nachgeprüft; Suchregel ergänzt in r4-31 | bauende Sitzung |
| R3C-A11 | Selbsttest des Gates auf diese Website umstellen, Aufruf über Schalter und CI; R3 im Gate an die Änderungsrunde binden (W3C-07, R3C-04) | 13.11.2026 | bauende Sitzung; Nachprüfung durch Prüfsitzung |
| R29-P01 | PatG ZH § 15 Abs. 2 (vermutetes Einverständnis gegenüber Bezugspersonen in Spitälern): mit der PUK klären; Musterbrief auf «Behandlung» allenfalls anpassen | offen | Auftraggeberin, PUK |
| R29-P02 | Mögliche Ergänzungen aus dem Rechtsabgleich: Bezugsperson und Patientenverfügung ab 18, gewaltfreie Erziehung (Art. 302 ZGB), Auskunft für Eltern ohne elterliche Sorge (Art. 275a ZGB) | offen | Auftraggeberin |
| R29-P03 | KJPP-Abstimmung der Seite «Wenn Ihr jugendliches Kind betroffen ist» (M4.3) | offen | Auftraggeberin, KJPP |
| R29-P04 | Impressum: rechtliche Bezeichnung der PUK; wessen «schriftliche Zustimmung» | offen | Auftraggeberin |
| R29-P05 | Bücher › Aguirre: ist «leitet das McLean-Hospital-Programm» aktuell? | offen | bauende Sitzung |
| R29-P06 | Stellen mit Platzbedarf aus S: «Remission» und DBT, MBT, TFP auf «Fragen», DSM-5-TR und ICD-11 im Glossar, zwei Verweise auf «Grenzen setzen» | offen | bauende Sitzung, Freigabe |
| R29-P07 | Quellenzuordnung: äussere Zeichen der Anspannungskurve; Mason und Kreger auf «Auf sich achten» | offen | bauende Sitzung, Freigabe |
| R29-P08 | Angebote für junge Erwachsene auf «Behandlung» (M5.5) | offen | Auftraggeberin |
| R29-P09 | W3C-04 Validierungstabelle: ARIA-Rollen, doppelte Ansage, Container-Abfrage | Profilentscheid | Auftraggeberin (Profil) |
| R29-P10 | W3C-05 Silbentrennung in Überschriften und `-webkit-hyphens` (dazu R3C-06 «Behandlungsteam») | Profilentscheid | Auftraggeberin (Profil) |
| R29-P11 | W3C-07 Selbsttest (siehe R3C-A11) | 13.11.2026 | bauende Sitzung |
| R29-P12 | W3C-10 Kopfbereich auf dem Smartphone (`NAV_MAX`) | Profilentscheid | Auftraggeberin (Profil) |
| R29-P13 | W3C-11 Strategie für `aria-label` an Inhaltslinks | Wartung | bauende Sitzung |
| R29-P14 | W3C-12 Leistung der Suche (Zwischenspeicher) | in r4-30 umgesetzt | bauende Sitzung |
| R29-P15 | W3C-13 Kommentare im ausgelieferten CSS und JS | Wartung | bauende Sitzung |
| R29-P16 | W2-017 Begriffe in «Wann Sie Auskunft erhalten können»: Reihenfolge nach Häufigkeit prüfen | offen | bauende Sitzung, Freigabe |
| R29-P17 | R3C-05 `responsibility.reviewedAt` nachführen; R3C-07 «Quellen» beim nächsten S lesen; R3C-08 Alias-Anker `begriffe#b-set` nur bei Bedarf | optional | bauende Sitzung |
| R29-P18 | PC29-1: Netlify setzt die Kopfzeilen aus `_headers` auf 301-Antworten nur teilweise (114 von 440 Abrufen); Seiten und Dateien nicht betroffen. PC29-2: Netlify liefert `Strict-Transport-Security` mit `preload`, das in `_headers` nicht steht (strenger). | optional, nur vermerken | – |
| R29-P19 | P1 aus #687 (sorgeberechtigte Eltern) | erledigt: in r4-30 korrigiert, veröffentlicht mit #689 und in der Produktion nachgeprüft | bauende Sitzung |
| R29-P20 | Vor jedem Merge prüfen, dass genau ein Pull Request für die Änderung offen ist und das Codex-Review auf dessen Stand mit dem vollständigen Inhalt lief. Die bauende Sitzung holt `main` jeweils frisch (Fetch ohne veraltete Branches). | ab sofort; bei #689 nicht eingehalten (Merge 13 s nach den Codex-Befunden, siehe r4-31) | bauende Sitzung, Auftraggeberin |
| R30-P01 | Weitere Suchlücken aus D30-04, D30-08 und D30-12: «Sorgerecht», «Klinik sagt mir nichts», «sie trinkt jeden Abend», «er zerstört Sachen in der Wohnung», «er hat mir gedroht», «er sagt ich bringe mich um», «lebensmüde Frau» (Ersttreffer «Quellen»); schwache Treffer «Überdosis Alkohol», «Medikamente gegen Angst»; mehrdeutig «sie hat ihre Tabletten genommen» (→ «Suizid») und «Mord» allein (→ «Suizid», weil «mord» in «Selbstmord» steckt). Aus D30-14 (fachlich abwägen): Redewendungen «das bringt mich um», «der Stress bringt mich um» → «Suizid»; «ich will mich nicht umbringen aber ich kann nicht mehr» → «Suizid» (r4-29: «Warnsignale»). Aus D30-15: Zitate mit «bringe … mich … um» («sie hat geschrieben ich bringe mich um», «er sagt ich bringe mich um») und «bringt … sich … um» mit Nebensatz («Mein Sohn hat gesagt er bringt sich um wenn ich ausziehe») ohne Treffer; «töten» und «umgebracht» allein ohne Treffer. Aus der dritten Nachprüfung: «meine Mutter wurde umgebracht», «Angst Tochter umbringt sich» ohne Treffer; «er sagt ich bringe dich um», «er hat gesagt ich bring dich um» ohne Treffer oder unpassend; «dass sich meine Mutter etwas antut» → «Schuld»; Stichwörter «Mutter töten», «Sohn umbringen Angst» unpassend (wie r4-29). Aus der vierten Nachprüfung, bewusst in der sicheren Richtung: Drohungen mit reflexivem Verb in einem früheren Teilsatz («er regt sich auf und droht mich umzubringen», «seit sie sich getrennt hat droht er mich umzubringen») → «Suizid»; erweiterter Suizid («meine Frau will die Kinder und sich umbringen») → «Suizid» statt «Gewalt», Zuordnung durch die Fachstelle zu bestätigen. D30-21 (optional): verneinte Suizidwörter zählen als Suizid-Signal («er ist nicht suizidal aber droht mich umzubringen» → «Suizid»). Aus der Nachprüfung von #690 (Grenzfälle nach R31-P02): G1 «er will die Kinder umbringen ich fürchte mich» (mit Variante K wieder Gewalt), G2 «er schlägt mich er will mich umzubringen» → «Suizid» wie in r4-30, G3 «… dann bringe ich mich um» → «Gewalt» («bringe ich mich um» nach R25-010 ausgenommen, Fachstelle bestätigen), G4 mehrdeutige Sätze wie «ich will töten sie hat mich verlassen»; mit Variante K gehen fünf Gewaltsätze in die sichere Richtung auf «Suizid», z. B. «er schwört mir mich umzubringen». Aus Abschlussbestätigung 3: G5 (mit Variante L behoben; nach dem Code auch ohne Satzzeichen, dafür keine eigene Probe), G6 fehlende Hilfsverben («werde», «sollte», «habe», «darf», «mag»; wie r4-29); offen bleibt ein Infinitiv am Anfang ohne Satzzeichen («umbringen wird er mich vermissen» wie «umbringen wird er mich»). Hinweis der Prüfsitzung: Meldet Codex an der Stelle «Infinitiv mit Hilfsverb» nochmals einen Rückschritt, auf die einseitige Form M′ wechseln (nach Infinitiv nur «ich» → Suizid), statt L weiter zu verfeinern. Die in r4-30 schon zugeordneten Fälle aus D30-12 (Drohungen gegen «uns», «die Kinder», «meine Familie»; «Angst vor meinem Sohn, meiner Tochter, meinem Vater …»; «Morddrohung», «Todesdrohung», «Würgen», «droht mit dem Tod», «droht mit Mord», «Angst vor meinem Ex») führen zu «Grenzen setzen» › Gewalt; die fachliche Zuordnung bestätigt die Fachstelle. Synonyme auch über Wortanfang oder Beugung prüfen | offen | bauende Sitzung; Nachprüfung durch Prüfsitzung; Zuordnung: Fachstelle |
| R30-P02 | D30-07: «entscheidet die betroffene Person» gilt nur für Urteilsfähige; der Fall des Vormunds (Art. 327a ZGB) fehlt | optional | Auftraggeberin |
| R31-P01 | PC30-2: `suchtest.mjs` um eine Basis-URL und die Umrechnung `.html` → Pretty URL ergänzen, damit die Produktionsprüfung die Testliste direkt nutzen kann | optional | bauende Sitzung |
| R31-P02 | Stopp-Regel für Codex-Befunde zur Suchregel (Entscheid vom 15.10.2026, «Nur Rückschritte blockieren»): blockierend nur, wenn eine Anfrage schlechter liegt als in r4-29 (Suizidsorge → Gewalt oder klare Ich-Aussage ohne Treffer). Andere Grenzfälle kommen als Testzeile in R30-P01. Jeder Befund wird gegen r4-29 geprüft und gemeldet. | ersetzt durch R31-P03 | bauende Sitzung, Prüfsitzung |
| R31-P03 | Stopp-Regel ab 15.10.2026 abends (Entscheid «N veröffentlichen»): Ein Pull Request mit Änderungen an der Suchregel blockiert nur, wenn er eine Anfrage gegenüber der Produktion verschlechtert (Suizidsorge → Gewalt oder klare Ich-Aussage ohne Treffer). Abweichungen gegenüber r4-29, die schon in der Produktion stehen, gehen sofort in den nächsten Patch (r4-32). | ab sofort | bauende Sitzung, Prüfsitzung |
| R31-P04 | r4-32: die in der Produktion verbliebenen Abweichungen gegenüber r4-29, etwa zehn reine Gewaltaussagen, die mit N in sicherer Richtung auf «Suizid» gehen («er schwört mir mich umzubringen»), die Phrase «ans Umbringen»/«ans Töten», die auch Gewaltsorgen («er denkt ans Töten und bedroht mich») in sicherer Richtung auf «Suizid» führt, und die Idee eines Sicherheitsnetzes (ergibt die Regel «Gewalt» und enthält die Anfrage eine Suizidaussage in der ersten Person, gilt Suizid) | als Nächstes nach r4-31 | bauende Sitzung; Prüfsitzung; Entscheid zum Sicherheitsnetz: Auftraggeberin |

### r4-22 · visuelle Befunde A04-008 bis A04-013, abgeschlossen

Die technische und redaktionelle Umsetzung der visuellen Befunde A04-008 bis A04-013 liegt als r4-22 vor. Die unabhängige Delta-Prüfung fand für A04-009 bis A04-013 keinen fachlichen, rechtlichen, sicherheitsbezogenen oder didaktischen Korrekturbedarf. Der Auftraggeber bestätigte am 14. Oktober 2026 ausdrücklich im Namen der PUK die institutionelle Freigabe dieser fünf Befunde. Der Nachweis liegt unter `audit-results/2026-10-14-delta-review-r4-22/`.

Die vier zuvor blockierenden Visualisierungen sind damit freigegeben. Der anschliessende Produktionsbuild meldete 22 Seiten, 0 Blocker und 0 Hinweise; 33 Dateien sind bytegleich. Der vollständige lokale Delta-Smoke-Test umfasste 110 Seiten-/Viewport-Läufe, 66 axe-Läufe, 22 Prüfungen bei 200 Prozent Basisschrift, 140 vertiefte Zustandsprüfungen der geänderten Seiten und 36 Such-Ersttreffer. Es gab keinen blockierenden Befund und keine Suchregression. GitHub-Build, Netlify-Regelprüfungen und Deploy-Build waren erfolgreich; der externe Preview-Browsertest blieb wegen des vorgesehenen Netlify-Teamzugangs mit HTTP 401 nicht durchführbar. Die Produktion wurde nach dem Merge vollständig nachgeprüft. Aus diesem Paket besteht keine weitere inhaltliche, institutionelle oder technische Pendenz.

Die nachfolgenden Punkte sind entweder terminiert und noch nicht fällig, von einer internen institutionellen Prüfung abhängig, nur nach neuen bestätigten Angaben umsetzbar oder als Evidenzgrenze bewusst akzeptiert. Sie dürfen nicht als von der Website-Entwicklung eigenständig lösbare Restarbeiten behandelt werden.

## Terminiert, derzeit nicht fällig

### AR3-5 · gemeinsames Profilpaket P-1 bis P-15

Die für diese Website relevanten Entscheidungen P-1 bis P-15 wurden in r4-19 lokal vorgezogen und nachgeprüft. P-8 ist in diesem eigenständigen Repository nicht anwendbar; P-13 bleibt aufgrund des bestätigten Institutionsentscheids zu `noindex, nofollow` und `Disallow: /` bewusst eine websitespezifische Ausnahme.

Offen bleibt die Übernahme in das gemeinsame PUK-Website-Profil sowie die getrennte Prüfung und Übernahme für die Depressions-Website. Diese Arbeiten dürfen nicht aus dem lokalen Nachweis dieser Website abgeleitet werden.

Für diese Website besteht daraus aktuell keine lokale Implementierungspendenz.

- Umsetzung nach der Veröffentlichung der Depressions-Website, spätestens ab **16. November 2026**
- Abschlussfrist: **13. Januar 2027**
- Beschluss und Abnahmekriterien: `christaegger-dot/puk-website-profil`, Datei `ENTSCHEIDE-PROFIL-2026-10-2.md`
- Bis zum geprüften Neubau gelten die dokumentierten Ausnahmen R1-1 und SPZ-F-32 weiter.

Änderungen aus dem Profilpaket werden künftig in diesem Repository in `authoring/` übernommen, geprüft und anschliessend kontrolliert nach `site/` gebaut. Das archivierte Website-Verzeichnis im Profil-Repository ist keine Bearbeitungsquelle mehr.

## Dauerhaft akzeptierte Einschränkung

### AR3-3 · reale Nutzungs- und Geräteprüfungen

Die Fachstelle hat am 13. Oktober 2026 entschieden, die vorgeschlagenen Tests mit Angehörigen, Menschen mit Borderline-Erfahrung, AT-Nutzenden und unabhängigen Fachpersonen nicht durchzuführen. Ebenso sind derzeit keine vollständigen realen Läufe mit NVDA/Firefox, VoiceOver/Safari, Hardwaretastatur, Touchgeräten oder Windows-Hochkontrastmodus vorgesehen.

Damit ist AR3-3 **materiell nicht erfüllt, aber organisatorisch abgeschlossen**: Die frühere Umsetzungsfrist vom 13. Januar 2027 ist aufgehoben. Die fehlenden Tests bleiben als dauerhaft akzeptierte Aussage- und Evidenzgrenze dokumentiert und dürfen weder als durchgeführt noch durch KI-Personas oder simulierte Nutzerforschung ersetzt werden.

Eine WCAG- oder ISO-Gesamtkonformität wird nicht behauptet. Eine erneute operative Pendenz entsteht nur durch einen neuen Institutionsentscheid.

Im Auftrag für R3 vom 15. Oktober 2026 nannte die bauende Sitzung für AR3-3 irrtümlich noch die Frist 13. Januar 2027. R3 ist diesem Dokument gefolgt und hat keine Frist gesetzt. Es gilt der Text oben.

## Empfohlen, nicht blockierend

### Rechtliche Durchsicht

Die Durchsicht von Impressum und Datenschutz durch den Rechtsdienst bleibt empfohlen. Sie ist keine technische Veröffentlichungs- oder Mergevoraussetzung. Die vorbereitete Unterlage liegt im archivierten Quellstand des Profil-Repositorys unter `templates/website/borderline-angehoerige/UNTERLAGE-RECHTSDIENST.md`.

## Nur nach institutioneller Bestätigung ergänzen

Folgende Angaben fehlen nicht versehentlich. Sie werden erst veröffentlicht, wenn die Fachstelle sie verbindlich bestätigt:

- eine veröffentlichbare Telefonnummer, falls das geltende Verbot von Telefonnummern aufgehoben wird;
- verbindliche Erreichbarkeitszeiten;
- eine garantierbare oder typische Antwortzeit;
- bestätigte Angaben zur baulichen Zugänglichkeit des Beratungsorts.

## Bewusste Institutionsentscheide · keine Pendenz

### Altersinklusive Angehörigenberatung

Die Angehörigenberatung der Fachstelle ist nicht auf Erwachsene begrenzt; auch junge Angehörige werden beraten. Der öffentliche Satz «Die Fachstelle Angehörigenarbeit der PUK berät Angehörige kostenlos und vertraulich.» ist absichtlich altersinklusiv. Eine Kennzeichnung als Erwachsenenangebot darf nicht ergänzt werden. Die vollständige Fundstellenprüfung vom 13. Oktober 2026 fand in den Beratungs- und Fachstellentexten keine ausdrückliche oder indirekte Altersbegrenzung.

### Keine Krisenintervention

Die Fachstelle bietet keine Krisenintervention. Die Website enthält deshalb keine Krisennummern, keine `tel:`-Links und keinen globalen Notfallblock. Die ursprünglichen Auditkriterien P0-01 und P0-02 bleiben formal unerfüllt, widersprechen aber dem geltenden Angebotsprofil. Eine Änderung verlangt einen neuen Institutionsentscheid und eine fachliche Prüfung.

## Wiederkehrende Wartung

Die zehn dynamischen Beratungs-, Austausch- und Behandlungsangebote wurden am 13. Oktober 2026 geprüft. Die nächste Prüfung ist spätestens am **14. April 2027** fällig. Das Produktionsgate blockiert überfällige Einträge.

## Abgeschlossene Hauptarbeiten

Die Informationsarchitektur, Schnellorientierung, kanonischen Inhalte, Begriffskonsistenz, globale Kurzorientierung, Footer-Wege, Fokusführung und automatisierten Strukturprüfungen des bisherigen Massnahmenplans sind umgesetzt. Ausgeliefert und in der Produktion nachgeprüft ist seit dem 15. Oktober 2026 Build r4-29. AR3-4 (Quellenangaben vollständig, mit Jahr und Abrufdatum) ist seit dem 13. Oktober 2026 erfüllt (`authoring/PRUEFBERICHT.md`, «Freigabe AR3-4»). R3 vom 15. Oktober 2026 hat das bestätigt (Punkt 14: 82 Einträge, alle mit Jahr oder «laufend»). Der im Produktions-Smoke-Test von r4-19 gefundene Suchbefund ist seit r4-20 behoben.

Die früheren GitHub-Issues #631, #641 und #645 bis #651 bezogen sich auf die abgelöste React-/Handout-Architektur. Sie wurden nach dem Abgleich mit dem aktuellen statischen Neubau, den Audits 01–06, den Delta-Prüfungen und den dokumentierten Institutionsentscheiden als überholt geschlossen. Noch gültige Aussage- und Evidenzgrenzen bleiben in diesem Dokument erhalten; die Schliessung der alten Issues ist keine nachträgliche Behauptung einer Rechts-, Fach-, WCAG- oder Nutzendenfreigabe.
