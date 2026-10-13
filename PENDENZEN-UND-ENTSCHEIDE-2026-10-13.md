# Aktueller Pendenzen- und Entscheidstatus

**Stand: 13. Oktober 2026**

Dieses Dokument ist nach der Migration die verbindliche Übersicht für offene Arbeiten an der Website. Der ausführliche Bericht unter `authoring/PRUEFBERICHT.md` dokumentiert frühere Prüfungen und Entscheidungen, ist aber kein aktueller Aufgabenplan.

## Produktionsstand und offener Hotfix

### r4-19 veröffentlicht; Safety-Suchhotfix r4-20 in PR #673

Die P1- sowie die fachlichen, rechtlichen, sprachlichen und visuellen P2-Korrekturen des Bestandsaudits vom 13. Oktober 2026 wurden mit PR #672 gemergt. Die Produktion unter `https://borderline-angehoerige.netlify.app` liefert seit dem 13. Oktober 2026 Build r4-19.

Der anschliessende Produktions-Smoke-Test bestätigte Seiten, Nutzerwege, 404, Weiterleitungen, Header, Robots-Steuerung, Cache-Regeln und Buildparität. Er fand jedoch eine P1-Suchlücke: direkte Begriffe wie «Suizidgedanken» funktionierten, gleichbedeutende Mehrwortformulierungen wie «Mein Kind will nicht mehr leben» führten nicht zuverlässig zu den Kriseninhalten. Damit war die Produktionsbedingung aus Audit 06 nicht vollständig erfüllt.

Der eng begrenzte Hotfix ist in Commit `6f3f5fa` und PR #673 umgesetzt. Build r4-20 erkennt Mehrwort-Intentionen vor Einzelwörtern und priorisiert die längste passende Phrase. Der lokale Delta-Smoke-Test bestand 134 von 134 Prüfungen; 14 von 14 gezielten Safety-/Überlastungssuchen führen zum vorgesehenen Ersttreffer. Im Vergleich von 36 Suchfragen blieben 31 Ersttreffer unverändert, fünf wurden gezielt korrigiert. GitHub-Build, Netlify Header-/Redirect-Prüfungen und Deploy-Preview-Status sind erfolgreich; das Preview selbst bleibt ausserhalb des Netlify-Teamzugangs mit HTTP 401 geschützt.

PR #673 ist noch nicht gemergt und r4-20 noch nicht in Produktion. Nach dem Produktionsdeployment ist ein gezielter Runtime-Smoke-Test der korrigierten Suchformulierungen sowie von Buildmarker und JavaScript-Asset zwingend. Der Nachweis liegt unter `audit-results/2026-10-13-delta-suche-r4-20/`.

Die Rechts-/Datenschutzdurchsicht bleibt zudem als Evidenzgrenze bestehen: Die Texte sind am Zürcher IDG ausgerichtet, aber noch nicht nachweislich durch die zuständige interne Stelle geprüft. Die technische Umsetzung ist dadurch nicht blockiert; eine vollständige Schliessung der rechtlichen Audit-Akzeptanzkriterien wäre ohne diesen Nachweis jedoch falsch.

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

## Bewusster Institutionsentscheid · keine Pendenz

Die Fachstelle bietet keine Krisenintervention. Die Website enthält deshalb keine Krisennummern, keine `tel:`-Links und keinen globalen Notfallblock. Die ursprünglichen Auditkriterien P0-01 und P0-02 bleiben formal unerfüllt, widersprechen aber dem geltenden Angebotsprofil. Eine Änderung verlangt einen neuen Institutionsentscheid und eine fachliche Prüfung.

## Wiederkehrende Wartung

Die zehn dynamischen Beratungs-, Austausch- und Behandlungsangebote wurden am 13. Oktober 2026 geprüft. Die nächste Prüfung ist spätestens am **14. April 2027** fällig. Das Produktionsgate blockiert überfällige Einträge.

## Abgeschlossene Hauptarbeiten

Die Informationsarchitektur, Schnellorientierung, kanonischen Inhalte, Begriffskonsistenz, globale Kurzorientierung, Footer-Wege, Fokusführung und automatisierten Strukturprüfungen des bisherigen Massnahmenplans sind umgesetzt. Der aktuell veröffentlichte Stand ist Build r4-19. Die im Produktions-Smoke-Test gefundene Suchlücke ist in r4-20 lokal behoben und über PR #673 zur Veröffentlichung vorbereitet.
