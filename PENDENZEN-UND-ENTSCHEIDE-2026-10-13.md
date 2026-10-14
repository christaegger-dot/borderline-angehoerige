# Aktueller Pendenzen- und Entscheidstatus

**Stand: 14. Oktober 2026**

Dieses Dokument ist nach der Migration die verbindliche Übersicht für offene Arbeiten an der Website. Der ausführliche Bericht unter `authoring/PRUEFBERICHT.md` dokumentiert frühere Prüfungen und Entscheidungen, ist aber kein aktueller Aufgabenplan.

## Produktionsstand

### r4-27 freigegeben, Pull Request offen

Release B (r4-27) setzt die Pakete 2 (Kernwissen), 3 (Schweizer Recht), 5 (Anlaufstellen und Literatur) und 7 (Quellen) des Massnahmenplans vom 14. Oktober 2026 um und zieht M6.7 vor. Die konkreten Fassungen wurden am 14. Oktober 2026 im Namen der PUK freigegeben; Paket 3 hat der Auftraggeber ohne Prüfung durch den Rechtsdienst freigegeben. Der Produktionsbuild meldet 22 Seiten, 0 Blocker und 0 Hinweise; 33 Dateien sind bytegleich. Der Pull Request ist offen und nicht gemergt. Der Nachweis liegt unter `audit-results/2026-10-14-delta-release-b-r4-27/`. Offen bleiben R27-O01 bis R27-O05: die juristische Prüfung der Rechtstexte, R2 für die neue Abbildung auf «Genesung», die Wortbilanz (+1312 Wörter; «Behandlung» 3145, Ziel nach Release C unter 2400), die Teilwortsuche bei «FU» und die direkte Bestätigung der Angebote von ipw und iks.

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
| E4 | Wie Eltern von Jugendlichen ansprechen? | offen; Empfehlung: eigene kurze Seite, im W2-Durchgang bestätigen | – | – |
| E5 | Mason und Kreger als Beleg? | entschieden: (a) auf «Krisen begleiten» ersetzt, sonst als Praxisanregung kennzeichnen | 14.10.2026 | Claude, vom Auftraggeber delegiert |
| E6 | Nicht zitierte Quellen im öffentlichen Verzeichnis? | entschieden: ins interne Prüfprotokoll `authoring/QUELLEN-HINTERGRUND.md` verschoben (M7.2, r4-27) | 14.10.2026 | Claude, vom Auftraggeber delegiert |
| E7 | Zuständigkeitssatz auf «Krisen begleiten» | offen; Empfehlung: höchstens zweimal | – | – |
| E8 | Am 14.10.2026 freigegebene Stellen wieder öffnen? | entschieden: A03-019 nach «Behandlung» verschoben (M3.4), A03-025 nur ergänzt (M3.5), A03-026 nicht geöffnet (r4-27) | 14.10.2026 | Claude, vom Auftraggeber delegiert |
| E9 | Redaktionsregel für Vorbehalte | offen; Empfehlung: höchstens ein Vorbehalt pro Abschnitt, ausgenommen Sicherheits- und Rechtsgrenzen | – | – |
| E10 | Abbildung 2 auf «Genesung» | entschieden: ersetzt durch «Was sich oft zuerst bessert, was länger bleibt» (M2.6, r4-27; R2 offen) | 14.10.2026 | Claude, vom Auftraggeber delegiert |

Zu Paket 3 (Schweizer Recht) entschied der Auftraggeber am 14. Oktober 2026, es in Release B umzusetzen und die Fassungen selbst freizugeben, ohne Prüfung durch den Rechtsdienst. Das Abnahmekriterium «Rechtsdienst hat den Wortlaut bestätigt» (M3.1, M3.3) ist damit nicht erfüllt; die juristische Prüfung bleibt als R27-O01 empfohlen.

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

Die Informationsarchitektur, Schnellorientierung, kanonischen Inhalte, Begriffskonsistenz, globale Kurzorientierung, Footer-Wege, Fokusführung und automatisierten Strukturprüfungen des bisherigen Massnahmenplans sind umgesetzt. Ausgeliefert und in der Produktion nachgeprüft ist seit dem 14. Oktober 2026 Build r4-26. Der im Produktions-Smoke-Test von r4-19 gefundene Suchbefund ist seit r4-20 behoben.

Die früheren GitHub-Issues #631, #641 und #645 bis #651 bezogen sich auf die abgelöste React-/Handout-Architektur. Sie wurden nach dem Abgleich mit dem aktuellen statischen Neubau, den Audits 01–06, den Delta-Prüfungen und den dokumentierten Institutionsentscheiden als überholt geschlossen. Noch gültige Aussage- und Evidenzgrenzen bleiben in diesem Dokument erhalten; die Schliessung der alten Issues ist keine nachträgliche Behauptung einer Rechts-, Fach-, WCAG- oder Nutzendenfreigabe.
