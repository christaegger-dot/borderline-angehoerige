# Aktueller Pendenzen- und Entscheidstatus

**Stand: 13. Oktober 2026**

Dieses Dokument ist nach der Migration die verbindliche Übersicht für offene Arbeiten an der Website. Der ausführliche Bericht unter `authoring/PRUEFBERICHT.md` dokumentiert frühere Prüfungen und Entscheidungen, ist aber kein aktueller Aufgabenplan.

## Produktionsstand

### r4-21 veröffentlicht und nachgeprüft

Die P1- sowie die fachlichen, rechtlichen, sprachlichen und visuellen P2-Korrekturen des Bestandsaudits vom 13. Oktober 2026 wurden mit PR #672 gemergt. Die Produktion unter `https://borderline-angehoerige.netlify.app` liefert seit dem 13. Oktober 2026 Build r4-19.

Der anschliessende Produktions-Smoke-Test bestätigte Seiten, Nutzerwege, 404, Weiterleitungen, Header, Robots-Steuerung, Cache-Regeln und Buildparität. Er fand jedoch eine P1-Suchlücke: direkte Begriffe wie «Suizidgedanken» funktionierten, gleichbedeutende Mehrwortformulierungen wie «Mein Kind will nicht mehr leben» führten nicht zuverlässig zu den Kriseninhalten. Damit war die Produktionsbedingung aus Audit 06 nicht vollständig erfüllt.

Der eng begrenzte Hotfix wurde mit PR #673 gemergt. Build r4-20 erkennt Mehrwort-Intentionen vor Einzelwörtern und priorisiert die längste passende Phrase. Der lokale Delta-Smoke-Test bestand 134 von 134 Prüfungen; der anschliessende Produktions-Smoke-Test bestand 154 von 154 Prüfungen. Alle 14 gezielten Safety-/Überlastungssuchen führen zum vorgesehenen Ersttreffer. Der P1-Suchbefund ist damit geschlossen. Der Nachweis liegt unter `audit-results/2026-10-13-delta-suche-r4-20/`; das Produktionsergebnis ist zusätzlich in PR #673 dokumentiert.

Die Rechts-/Datenschutzdurchsicht bleibt zudem als Evidenzgrenze bestehen: Die Texte sind am Zürcher IDG ausgerichtet, aber noch nicht nachweislich durch die zuständige interne Stelle geprüft. Die technische Umsetzung ist dadurch nicht blockiert; eine vollständige Schliessung der rechtlichen Audit-Akzeptanzkriterien wäre ohne diesen Nachweis jedoch falsch.

### P3-Optimierungspaket r4-21

Mit PR #674 wurden die redaktionellen Befunde A03-010 bis A03-018 und die visuell-didaktischen Befunde A04-005 bis A04-007 umgesetzt. Die Änderungen vereinfachen Schnellorientierungen, bereinigen Grammatik und Satzzeichen, entlasten dichte Passagen und schärfen die Aussagen der drei betroffenen Wissensdarstellungen. Der Krisenhinweis beim DEAR-Modell steht nun ausserhalb der Figur im zugehörigen Abschnitt.

Die Altersinklusion der Angehörigenberatung wurde über alle 22 ausgelieferten Seiten und die kanonischen Quellen geprüft. Es gibt keine Aussage, welche die Beratung auf Erwachsene begrenzt. Der bestätigte Satz steht im Footer nun auch typografisch als eigener vollständiger Satz: «Die Fachstelle Angehörigenarbeit der PUK berät Angehörige kostenlos und vertraulich.»

Der lokale Produktions-Build meldet 22 Seiten, 0 Blocker und 0 Hinweise; 33 Dateien sind bytegleich zum generierten Export. Eine Browsermatrix aus 22 Seiten, vier Breiten und zwei Textgrössen bestand 1150 von 1150 Einzelprüfungen ohne Laufzeitfehler. Alle 36 Such-Ersttreffer sind gegenüber der Produktion r4-20 unverändert; die sechs Safety- und drei Überlastungssuchen bleiben korrekt. Die drei geänderten Wissensdarstellungen wurden bei 320 und 1440 CSS-Pixel visuell kontrolliert.

A03-H01 bleibt als nicht empirisch überprüfte Wirkungshypothese dokumentiert. Der Titel «Krisen begleiten» wurde nicht geändert; ohne reale Nutzendentests wird weder eine belastende noch eine entlastende Wirkung behauptet.

PR #674 wurde als Merge-Commit `1cb33e0a1bd499c7b8367213851373b6dd027ab5` übernommen. Die öffentliche Website liefert r4-21. Der anschliessende Produktions-Smoke-Test bestand 169 von 169 Browserprüfungen ohne Laufzeitfehler. Alle 21 regulären Seiten, die eigene 404-Seite, Tastaturbasis, No-JavaScript-Fallback, alle 36 festgeschriebenen Such-Ersttreffer, Sicherheitsheader, Robots-Steuerung und repräsentative Weiterleitungen wurden bestätigt. Das Produktionsergebnis ist in PR #674 dokumentiert.

## Übergreifend offen

### AR3-5 · gemeinsames Profilpaket P-1 bis P-15

Die für diese Website relevanten Entscheidungen P-1 bis P-15 wurden in r4-19 lokal vorgezogen und nachgeprüft. P-8 ist in diesem eigenständigen Repository nicht anwendbar; P-13 bleibt aufgrund des bestätigten Institutionsentscheids zu `noindex, nofollow` und `Disallow: /` bewusst eine websitespezifische Ausnahme.

Offen bleibt die Übernahme in das gemeinsame PUK-Website-Profil sowie die getrennte Prüfung und Übernahme für die Depressions-Website. Diese Arbeiten dürfen nicht aus dem lokalen Nachweis dieser Website abgeleitet werden.

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

Die Informationsarchitektur, Schnellorientierung, kanonischen Inhalte, Begriffskonsistenz, globale Kurzorientierung, Footer-Wege, Fokusführung und automatisierten Strukturprüfungen des bisherigen Massnahmenplans sind umgesetzt. Der aktuell veröffentlichte und nachgeprüfte Stand ist Build r4-21. Der im Produktions-Smoke-Test von r4-19 gefundene Suchbefund ist seit r4-20 behoben.
