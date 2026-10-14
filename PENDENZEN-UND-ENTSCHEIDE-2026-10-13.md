# Aktueller Pendenzen- und Entscheidstatus

**Stand: 14. Oktober 2026**

Dieses Dokument ist nach der Migration die verbindliche Übersicht für offene Arbeiten an der Website. Der ausführliche Bericht unter `authoring/PRUEFBERICHT.md` dokumentiert frühere Prüfungen und Entscheidungen, ist aber kein aktueller Aufgabenplan.

## Produktionsstand

### r4-22 veröffentlicht und nachgeprüft

PR #676 wurde als Merge-Commit `7864dab6f48ef4e52db1e783387032a0c0de8e93` übernommen. Die öffentliche Website liefert r4-22. Der anschliessende Produktions-Smoke-Test bestand 169 von 169 Browserprüfungen ohne Laufzeitfehler. Bestätigt wurden alle 21 regulären Seiten, die eigene 404-Seite, 320-Pixel-Reflow, Tastaturbasis, No-JavaScript-Fallback, alle 36 festgeschriebenen Such-Ersttreffer, Sicherheitsheader, Robots-Steuerung und repräsentative Weiterleitungen. Das Produktionsergebnis ist in PR #676 und unter `audit-results/2026-10-14-delta-review-r4-22/` dokumentiert.

Das abschliessende Audit 06 wurde auf dem aktuellen `main`-Commit `160a42f92eb78e4a0af806fc74babea1ab712937` und der öffentlichen Produktion wiederholt. Es fand keine neuen P0-/P1-Befunde oder Release-Blocker und bestätigt ein **CONDITIONAL GO** für den fortgesetzten Betrieb von r4-22. Die Einschränkung betrifft weiterhin die fehlende interne Rechts-/Datenschutz-Gesamtprüfung und die bewusst nicht durchgeführten realen Screenreader-, Geräte- und Nutzendentests; sie ist keine technische Releaseblockade. Der aktuelle Abschlussnachweis liegt unter `audit-results/2026-10-14-abschluss-r4-22/`.

### r4-21 veröffentlicht und nachgeprüft

Die P1- sowie die fachlichen, rechtlichen, sprachlichen und visuellen P2-Korrekturen des Bestandsaudits vom 13. Oktober 2026 wurden mit PR #672 gemergt. Die Produktion unter `https://borderline-angehoerige.netlify.app` lieferte danach zunächst Build r4-19; der aktuelle, nachgeprüfte Produktionsstand ist Build r4-21.

Der anschliessende Produktions-Smoke-Test bestätigte Seiten, Nutzerwege, 404, Weiterleitungen, Header, Robots-Steuerung, Cache-Regeln und Buildparität. Er fand jedoch eine P1-Suchlücke: direkte Begriffe wie «Suizidgedanken» funktionierten, gleichbedeutende Mehrwortformulierungen wie «Mein Kind will nicht mehr leben» führten nicht zuverlässig zu den Kriseninhalten. Damit war die Produktionsbedingung aus Audit 06 nicht vollständig erfüllt.

Der eng begrenzte Hotfix wurde mit PR #673 gemergt. Build r4-20 erkennt Mehrwort-Intentionen vor Einzelwörtern und priorisiert die längste passende Phrase. Der lokale Delta-Smoke-Test bestand 134 von 134 Prüfungen; der anschliessende Produktions-Smoke-Test bestand 154 von 154 Prüfungen. Alle 14 gezielten Safety-/Überlastungssuchen führen zum vorgesehenen Ersttreffer. Der P1-Suchbefund ist damit geschlossen. Der Nachweis liegt unter `audit-results/2026-10-13-delta-suche-r4-20/`; das Produktionsergebnis ist zusätzlich in PR #673 dokumentiert.

Die Rechts-/Datenschutzdurchsicht bleibt zudem als Evidenzgrenze bestehen: Die Texte sind am Zürcher IDG ausgerichtet, aber noch nicht nachweislich durch die zuständige interne Stelle geprüft. Die technische Umsetzung ist dadurch nicht blockiert; eine vollständige Schliessung der rechtlichen Audit-Akzeptanzkriterien wäre ohne diesen Nachweis jedoch falsch.

### P3-Optimierungspaket r4-21

Mit PR #674 wurden die redaktionellen Befunde A03-010 bis A03-018 und die visuell-didaktischen Befunde A04-005 bis A04-007 umgesetzt. Die Änderungen vereinfachen Schnellorientierungen, bereinigen Grammatik und Satzzeichen, entlasten dichte Passagen und schärfen die Aussagen der drei betroffenen Wissensdarstellungen. Der Krisenhinweis beim DEAR-Modell steht nun ausserhalb der Figur im zugehörigen Abschnitt.

Die Altersinklusion der Angehörigenberatung wurde über alle 22 ausgelieferten Seiten und die kanonischen Quellen geprüft. Es gibt keine Aussage, welche die Beratung auf Erwachsene begrenzt. Der bestätigte Satz steht im Footer nun auch typografisch als eigener vollständiger Satz: «Die Fachstelle Angehörigenarbeit der PUK berät Angehörige kostenlos und vertraulich.»

Der lokale Produktions-Build meldet 22 Seiten, 0 Blocker und 0 Hinweise; 33 Dateien sind bytegleich zum generierten Export. Eine Browsermatrix aus 22 Seiten, vier Breiten und zwei Textgrössen bestand 1150 von 1150 Einzelprüfungen ohne Laufzeitfehler. Alle 36 Such-Ersttreffer sind gegenüber der Produktion r4-20 unverändert; die sechs Safety- und drei Überlastungssuchen bleiben korrekt. Die drei geänderten Wissensdarstellungen wurden bei 320 und 1440 CSS-Pixel visuell kontrolliert.

A03-H01 bleibt als nicht empirisch überprüfte Wirkungshypothese dokumentiert. Der Titel «Krisen begleiten» wurde nicht geändert; ohne reale Nutzendentests wird weder eine belastende noch eine entlastende Wirkung behauptet.

PR #674 wurde als Merge-Commit `1cb33e0a1bd499c7b8367213851373b6dd027ab5` übernommen. Die öffentliche Website liefert r4-21. Der anschliessende Produktions-Smoke-Test bestand 169 von 169 Browserprüfungen ohne Laufzeitfehler. Alle 21 regulären Seiten, die eigene 404-Seite, Tastaturbasis, No-JavaScript-Fallback, alle 36 festgeschriebenen Such-Ersttreffer, Sicherheitsheader, Robots-Steuerung und repräsentative Weiterleitungen wurden bestätigt. Das Produktionsergebnis ist in PR #674 dokumentiert.

## Aktuell sofort umsetzbare Pendenzen

### r4-23 · Sprachmassnahmen A03-019 bis A03-038

Die 20 bestätigten Befunde des unabhängigen Audit 03 vom 14. Oktober 2026 sind auf dem Branch `codex/audit-03-massnahmen-r4-23` in der kanonischen Quelle `authoring/` umgesetzt. Dazu gehören die Korrektur der versehentlichen Erwachsenenbegrenzung, die motivneutrale Formulierung zu Absicht, die institutionelle Buchauswahl, präzisere Krisen-, Grenz- und Dialogtexte, die Verdichtung von «Nach der Krise» sowie die P3-Redaktionspolitur. A03-H01 und A03-H02 bleiben als ungetestete Wirkungshypothesen bewusst unverändert.

Der Draft-Build meldete vor der Freigabe 22 Seiten, 0 Blocker und den erwarteten Hinweis zum ausstehenden Änderungsreview. Der Abschnitt «Nach der Krise» wurde von 749 auf 379 Wörter reduziert; die Sicherheits- und Zuständigkeitsgrenzen bleiben sichtbar. Der Nachweis liegt unter `audit-results/2026-10-14-delta-sprach-r4-23/`.

Die konkreten r4-23-Fassungen zu A03-019 bis A03-038 wurden am 14. Oktober 2026 im Namen der PUK geprüft und freigegeben. Das Produktionsgate besteht danach mit 22 Seiten, 0 Blockern und 0 Hinweisen; 33 Exportdateien sind bytegleich reproduzierbar. Der vollständige Delta-Smoke-Test auf dem erzeugten `site/`-Export bestand 44 von 44 Seiten-/Viewport-Läufe, 28 von 28 axe-Läufe, 36 von 36 unveränderte Such-Ersttreffer, sechs Safety-/Überlastungssuchen, zwölf Textnachweise, Akkordeon, Deep-Link und No-JavaScript-Fallback. r4-23 ist lokal releasebereit. Commit, Pull Request, Merge und Veröffentlichung sind noch nicht erfolgt und benötigen einen separaten Auftrag; die öffentliche Produktion bleibt bis dahin auf r4-22.

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

Die Informationsarchitektur, Schnellorientierung, kanonischen Inhalte, Begriffskonsistenz, globale Kurzorientierung, Footer-Wege, Fokusführung und automatisierten Strukturprüfungen des bisherigen Massnahmenplans sind umgesetzt. Der aktuell veröffentlichte und nachgeprüfte Stand ist Build r4-22. Der im Produktions-Smoke-Test von r4-19 gefundene Suchbefund ist seit r4-20 behoben.

Die früheren GitHub-Issues #631, #641 und #645 bis #651 bezogen sich auf die abgelöste React-/Handout-Architektur. Sie wurden nach dem Abgleich mit dem aktuellen statischen Neubau, den Audits 01–06, den Delta-Prüfungen und den dokumentierten Institutionsentscheiden als überholt geschlossen. Noch gültige Aussage- und Evidenzgrenzen bleiben in diesem Dokument erhalten; die Schliessung der alten Issues ist keine nachträgliche Behauptung einer Rechts-, Fach-, WCAG- oder Nutzendenfreigabe.
