# Prüfumfang · Borderline – Orientierung für Angehörige

Stand `6ac0255c23d09e63aeb4b2485fdf417b701839de`, Branch `main`. Prüfung am 17. Oktober 2026. Kanonisches Deployment: https://borderline-angehoerige.netlify.app.

Kanonische Bearbeitungsquelle: authoring/content/, authoring/site.config.json, authoring/css/, authoring/js/; site/ ist Export. Kein Wechsel auf das Profil-Repository als Inhaltsquelle. Die aktuellen lokalen Arbeitsregeln und der Website-Audit-Skill wurden berücksichtigt.

## Vollständig inventarisierte Runtime

| Datei | Route | Seitentitel |
|---|---|---|
| 404.html | /404.html | Seite nicht gefunden \| Borderline – Orientierung für Angehörige |
| begriffe.html | /begriffe.html | Begriffe verständlich erklärt \| Borderline – Orientierung für Angehörige |
| behandlung.html | /behandlung.html | Behandlung und Ihre Rolle darin \| Borderline – Orientierung für Angehörige |
| beziehungen.html | /beziehungen.html | Alltag und Beziehungen \| Borderline – Orientierung für Angehörige |
| buecher.html | /buecher.html | Bücher für Angehörige \| Borderline – Orientierung für Angehörige |
| diagnose.html | /diagnose.html | Diagnose und Begleiterkrankungen \| Borderline – Orientierung für Angehörige |
| fragen.html | /fragen.html | Fragen und Nachschlagen \| Borderline – Orientierung für Angehörige |
| genesung.html | /genesung.html | Genesung \| Borderline – Orientierung für Angehörige |
| grenzen.html | /grenzen.html | Grenzen setzen \| Borderline – Orientierung für Angehörige |
| impressum-datenschutz.html | /impressum-datenschutz.html | Impressum und Datenschutz \| Borderline – Orientierung für Angehörige |
| index.html | / | Startseite \| Borderline – Orientierung für Angehörige |
| jugendliche.html | /jugendliche.html | Wenn Ihr jugendliches Kind betroffen ist \| Borderline – Orientierung für Angehörige |
| kinder.html | /kinder.html | Wenn Kinder mitbetroffen sind \| Borderline – Orientierung für Angehörige |
| kommunizieren.html | /kommunizieren.html | Zugewandt und klar sprechen \| Borderline – Orientierung für Angehörige |
| krise.html | /krise.html | Krisen begleiten \| Borderline – Orientierung für Angehörige |
| kurz.html | /kurz.html | Kurz und klar \| Borderline – Orientierung für Angehörige |
| quellen.html | /quellen.html | Quellen \| Borderline – Orientierung für Angehörige |
| rolle.html | /rolle.html | Ihre Rolle klären \| Borderline – Orientierung für Angehörige |
| selbstfuersorge.html | /selbstfuersorge.html | Auf sich achten \| Borderline – Orientierung für Angehörige |
| suche.html | /suche.html | Website durchsuchen \| Borderline – Orientierung für Angehörige |
| ueber.html | /ueber.html | Über diese Website \| Borderline – Orientierung für Angehörige |
| unterstuetzung.html | /unterstuetzung.html | Unterstützung finden \| Borderline – Orientierung für Angehörige |
| verstehen.html | /verstehen.html | Borderline verstehen \| Borderline – Orientierung für Angehörige |

## Tatsächlich geprüfte Zustände

- Alle 23 HTML-Seiten bei 320, 375, 768, 1024 und 1440 CSS-Pixeln; je 100 % und 200 % Wurzelschrift: 230 Zustände unter der lokalen Netlify-CSP.
- 46 axe-Läufe: alle Seiten bei 1440 px/100 % sowie 320 px/200 %. Zusätzliche offene interaktive Zustände gemäss Nutzerwegen.
- Alle 23 Seiten ohne JavaScript bei 375 px auf vorhandenen Hauptinhalt, Verweise und Dokumentüberlauf.
- Lokale Link-/Fragment-/Asset-Ziele, doppelte IDs, Seitentitel; vollständiger semantischer HTML-Abgleich aller 23 Seiten mit dem öffentlichen Deployment. Netlify ändert Linkschreibweise und Attributreihenfolge; das wurde normalisiert, nicht als Produktabweichung gewertet.
- 7 konkrete Nutzerwege einschliesslich Sprunglink; siehe unten. Die Tastaturereignisse kommen aus Playwright, nicht aus einer Hardwareprüfung mit einer Person.
- Quellenabruf von 87 unterschiedlichen externen URLs dieses Repos. HTTP 200 allein wurde nicht als fachlicher Nachweis verwendet. Schwerpunktquellen und Abrufgrenzen sind in QUELLEN.csv getrennt markiert.
- Aktueller getrackter Baum: 250 Dateien. Heuristische Geheimnismustersuche in Dateien unter 1,5 MB; kein Scan der vollständigen Git-Geschichte. 32 entfernte Branches inventarisiert; ihre Zahl allein wurde nicht als Fehler oder Löschauftrag gewertet.

## Konkrete Nutzerwege

- J00: Sprunglink mit Tab und Enter zum Hauptinhalt — bestanden.
- J01: Suche: alle 216 festgeschriebenen Erwartungen unter CSP — bestanden.
- J02: Knapper Einstieg führt zur passenden Krisenhilfe — bestanden.
- J03: Behandlungsangebote nach ipw filtern und zurücksetzen — bestanden.
- J04: Glossar nach FU filtern, Erklärung per Enter öffnen — bestanden.
- J05: Eltern Jugendlicher erreichen Einwilligung und Behandlung — bestanden.
- J06: Keine Suchtreffer: Alternative bleibt erreichbar und axe ohne Verstoss — bestanden.

## Inhaltliche Tiefe und Grenzen

Gegenprüft wurden insbesondere Genesungszahlen (93 % zweijährige Remission und 50 % Recovery in der 290-Personen-Kohorte; 85 % Remission in der zweiten Kohorte), die Unterscheidung von Gruppenbefund und individueller Prognose, Psychotherapie als zentrale Behandlung sowie die vorsichtige Einordnung von Angehörigenprogrammen. Zanarini 2010, Gunderson 2011, Cochrane 2020 und der Family-Connections-RCT stützen diese untersuchten Kernaussagen; der RCT wird nicht als gesicherte Überlegenheit dargestellt. Bei den Rechtsstellen wurde Art. 439 wörtlich gegengelesen. Die bestehenden Fragen zu PatG, KJPP-Abstimmung und einzelnen Detailaussagen werden dadurch nicht pauschal als juristisch oder fachärztlich freigegeben.

Startseite und Fusszeile wurden bei 375/1440 px visuell betrachtet, zusätzlich die Informationswege-Abbildung auf Behandlung. Der frühere Wortbruch bei «Behandlungsteam» ist in dieser Gegenprobe nicht vorhanden. Alle Seiten und damit alle eingebetteten Darstellungen durchlaufen die Layoutmatrix; es liegt keine neue vollständige fachliche Einzelabnahme sämtlicher 13 Abbildungen vor.

Bestehende Auditberichte und operative Entscheide wurden als Vorwissen eingeordnet, aber nicht als Ersatz für den neuen Browser- und Live-Abgleich verwendet. Es erfolgte kein vollständiger neuer Wortlautnachtest jedes historischen Sprachvorschlags und kein vollständiger Volltextreview aller Studien. Die tiefere Inhaltsprüfung konzentriert sich auf folgenreiche Aussagen, Widersprüche und aktuelle Nutzeranforderungen. Reale Screenreader-, Geräte-, Nutzer- und Fachprüfungen wurden nicht simuliert oder als erfolgt eingetragen.

Eine private GitHub-Ablage schützt die veröffentlichten Websites nicht vor öffentlichem Zugriff. Alle vier produktiven Root-Adressen waren anonym erreichbar; dies entspricht den vorhandenen Projektentscheiden. Bestehende `noindex`- und bewusste `robots.txt`-Ausnahmen wurden nicht eigenmächtig verändert. Für Loslassen wurde zusätzlich die konfigurierte Vorschau anonym inklusive Assets geprüft; ein berechtigter Login und Berechtigungsentzug wurden nicht getestet. Für die anderen Projekte wird kein neuer Vorschau-Authentifizierungsnachweis behauptet.

## Arbeitsweise und Dateien

Keine getrackte Runtime-Datei wurde geändert, kein Commit/PR/Merge/Deploy erstellt und keine Hosting-/Schutzeinstellung verändert. Neue Auditdateien liegen nur in diesem Laufverzeichnis. Rohdaten, Screenshots und PDFs liegen ausserhalb des Repositories unter `/workspace/scratch/audit4` bzw. `/workspace/scratch/audit4-loslassen-qa`; sie werden nicht als Website-Dateien oder Repository-Belege veröffentlicht.

Der hinterlegte Skill verlangt: «Zuerst konsolidierte Auditberichte liefern. Änderungen nur nach separater konkreter Freigabe auf eigenem Branch.» Quelle: `.agents/skills/website-audit/SKILL.md`, Abschnitt «Nach der Analyse». Dieser Lauf liefert die konkrete Prüfung und Korrekturvorlagen; er ist kein Freigabe-Audit 06.
