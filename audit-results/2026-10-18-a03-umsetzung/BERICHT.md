# Überarbeitung der 66 Befunde aus Audit 03 · r4-38

**GitHub:** [PR #706](https://github.com/christaegger-dot/borderline-angehoerige/pull/706), offen als Entwurf. Umsetzungscommit: `968573fae9a5690b271704b4b535469b9e73e230`.

Die 66 Befunde des Sprach- und Didaktikaudits vom 18. Oktober 2026 sind in den kanonischen Quellen überarbeitet. Der Umsetzungsauftrag lautete: «sehr gut, danke. Bitte überarbeite die Befunde direkt in github». Ausgangspunkt ist `086876611dbf2909e6d6f10824d05a0ecc4eed57`; beim abschliessenden Abgleich stand `main` weiterhin auf diesem Commit.

## Umfang und Nachvollziehbarkeit

[UMSETZUNG.csv](UMSETZUNG.csv) ordnet jedem der 66 stabilen IDs den Status, die Quellpfade, den ursprünglichen Befund, den Auditvorschlag und das Abnahmekriterium zu. [AUDIT-BEFUNDE.json](AUDIT-BEFUNDE.json) bewahrt die vollständigen Eingangsbefunde. Die Ersatztexte wurden im Absatzkontext redigiert; redaktionelle Anweisungen aus den Vorschlägen wurden nicht als Website-Text übernommen.

Bearbeitet sind 22 Inhaltsfragmente, die Seitenkonfiguration, die gemeinsame Interaktion und der Renderer/Suchindex. Der Build erzeugt weiterhin 23 Seiten. `site/` wurde ausschliesslich durch den lokalen Build erzeugt. Seine 34 Dateien stimmen bytegenau mit dem erneut erzeugten Entwurf überein.

Diese Runde betrifft genau die 66 Eingangsbefunde, darunter die fünf P1-Befunde A03-223, -225, -226, -231 und -237. Die frühere Liste mit 182 Befunden vom 16. Oktober wird damit nicht pauschal geschlossen.

## Inhaltliche Änderungen

- Schuld und Verantwortung: Eine Diagnose begründet keine persönliche Schuldzuweisung. Verantwortung für eigenes verletzendes oder gewalttätiges Handeln wird davon getrennt. Die Aussagen sind auf den Seiten Rolle, Verstehen, Jugendliche, Diagnose und Fragen abgestimmt.
- Abstand und Kontakt: Eine kurze Gesprächspause wird von länger offenem Abstand unterschieden. Verletzung oder Erschöpfung werden nicht als strafendes Motiv ausgelegt. Ein Kontaktangebot bleibt freiwillig; Versorgung und Schutz minderjähriger oder konkret abhängiger Personen bleiben berücksichtigt.
- Krisenhilfe: Der bestehende thematische Akuthinweis nennt Rettungsdienst und Polizei getrennt und verlinkt die Nummern direkt. Der Hinweis bleibt an den bisherigen Themenstellen. Die Nummernzuordnung wurde anhand der [offiziellen Übersicht des Kantons Zürich](https://www.zh.ch/de/gesundheit/notfall-rettung.html) geprüft (Abruf 18.10.2026). Der Quellenbeleg ist ergänzt. Eine Übung ersetzt keine notwendige Hilfe; Erste Hilfe wird ohne bagatellisierende Wendung erklärt.
- Verständlichkeit: Therapien und Abkürzungen, die unterschiedlichen Bedeutungen von Recovery und drei Fachbegriffe der Kriterienliste werden erklärt. Die neun Diagnosekriterien bleiben erhalten. Der rechtliche Meldetatbestand «gefährdet erscheint» bleibt unverändert; «Integrität» wird mit «Unversehrtheit» erläutert. Die Erlaubnisliste zur Selbstfürsorge ist in zusammenhängende Absätze überführt.
- Navigation: Individuell redigierte Verweissätze erhalten sämtliche vorhandenen Sprungziele. Das Muster «steht auf der Seite» sinkt im Kerntext ohne Quellen- und Suchkopien von 64 auf 0 Vorkommen. Die gleichförmigen Quellenblöcke am Ende der Themenseiten bleiben als wiedererkennbare Quellenhinweise bestehen.
- Modelle: Die Bedeutungsschleife wird ausdrücklich auf das erfundene Beispiel begrenzt und weist auf ungleiche Verantwortung sowie Schutz bei Gewalt hin. DEAR erklärt den vierten Schritt als möglichen Nutzen. Der Forschungsvergleich kennzeichnet das Muster einer einzelnen Studie bereits in Titel, Kernaussage und Spaltenbeschriftung.
- Suche und Filter: Filter nennen Angebote, Begriffe oder Quellengruppen statt alle Einträge als Treffer zu bezeichnen. Bei mehr als 20 Ergebnissen wird die Begrenzung erklärt. Die Nulltreffermeldung wird nicht doppelt ausgegeben. Suchausschnitte enden an Satzgrenzen; Sicherheitsabschnitte haben zusätzlich redaktionelle Ausschnitte. Die Suche verwendet für ihre Gewichtung weiterhin den gesamten Inhalt.

A03-083 lässt den Behandlungsgrundsatz absichtlich einmal in der Kurzbox stehen. A03-247 lässt die Kriterienliste stehen und ergänzt Erklärungen. Dass die ursprünglichen Wortlaute dort noch vorkommen, ist Teil der jeweiligen Abnahme und kein offener Austauschfehler. A03-255 konzentriert den Einstieg auf den Nutzen; die örtlichen Schutzbedingungen der Modelle bleiben erhalten.

Bei A03-202 werden persönlicher nicht kommerzieller Gebrauch und Angehörigenberatung widerspruchsfrei benannt. Gesetzlich erlaubte Nutzungen bleiben vorbehalten; neue institutionelle Rechte oder Zusagen werden nicht behauptet. A03-252 beschreibt das Löschen der Daten dieser Website und fordert nicht zum Löschen der gesamten Browserchronik auf.

## Prüfung

Die vollständigen Ausgaben stehen in [TESTERGEBNISSE.txt](TESTERGEBNISSE.txt).

| Prüfung | Ergebnis |
| --- | --- |
| Entwurfsbuild | 23 Seiten, 0 Strukturblocker |
| Erneuter Entwurfsbuild mit `--verify-site` | 34 Dateien bytegleich |
| `authoring/tools/selftest.mjs` | 79/79 bestanden |
| `authoring/tools/suchtest.mjs site` | 216/216 Erwartungen, 0 JS-Fehler |
| Neuer `authoring/tools/sprachtest.mjs site` | 75/75 Prüfungen, 0 JS-Fehler |
| Bildschirmbreiten | 320, 390 und 1280 px; kein horizontaler Überlauf auf den fünf geprüften Seiten, auch bei geöffneten Vertiefungen |
| Sichtprüfung | Zehn Bildschirmaufnahmen der drei geänderten Abbildungen, des Akuthinweises und des Selbstfürsorgeabschnitts bei 390/1280 px geprüft |
| `git diff --check` | bestanden |

Der Suchtest fand zunächst zwei sprachbedingte Rückschritte: die Suche nach Manipulation und nach der Reihenfolge einer Besserung. Suchaliase stellen die bisherigen Einstiege wieder her, während die neuen Abschnitte ihre differenzierteren Aussagen behalten. Die festgeschriebenen Erwartungen wurden nicht abgeschwächt.

Reproduzierbare lokale Aufrufe (Node ab 18; Browserprüfung mit Playwright wie beim bestehenden Suchtest):

```sh
node authoring/tools/build.mjs --out=site --write-site
node authoring/tools/build.mjs --verify-site
node authoring/tools/selftest.mjs
node authoring/tools/suchtest.mjs site
node authoring/tools/sprachtest.mjs site
```

In dieser Umgebung: `PLAYWRIGHT_MODULE` zeigte auf das vorhandene Playwright-Modul, `CHROMIUM_PATH` auf `/tmp/chromium` (Chromium 153.0.8010.0). Die Aufnahmen sind nach Öffnen der Vertiefungen entstanden. Der Versuch, einen weiteren Playwright-Browser herunterzuladen, scheiterte an einer unvollständigen Archivantwort; für die Tests wurde der bereits vorhandene Chromium verwendet.

## Ausstehende Schlussfreigabe

Das Ergebnis ist ein prüfbarer PR-Entwurf. Es ist eine redaktionelle und technische Selbstprüfung, keine neue unabhängige Fach-, Rechts- oder R3-Freigabe. Die historischen Freigaben werden nicht auf die Änderungen erweitert.

Beide gemäss AGENTS.md vorgeschriebenen Produktionsaufrufe wurden ausgeführt:

```sh
node authoring/tools/build.mjs --production --out=site --write-site
node authoring/tools/build.mjs --production --verify-site
```

Sie blockieren erwartungsgemäss an genau fünf Freigabepunkten:

1. `v-bz-sichten`: geänderte Erklärung des Beispiels, Freigabe ausstehend.
2. `v-gr-dear`: verständlicher benannter Schritt R, Freigabe ausstehend.
3. `v-ge-forschung`: studienspezifische Beschriftung, Freigabe ausstehend.
4. `responsibility.inline`: neuer Akutwortlaut, fachliche Freigabe ausstehend.
5. `releaseApproval.independentReview`: unabhängige Schlussprüfung der gesamten Runde ausstehend.

Die Freigabefelder sind ausdrücklich auf «ausstehend» gesetzt. Das Gate wurde nicht umgangen. Die vorliegenden `site/`-Dateien stammen aus dem Entwurfsmodus und wurden erneut abgeglichen; eine bestandene Produktionsprüfung wird nicht behauptet. Die vorhandene r4-35-Freigabe bleibt historisch dokumentiert. Eine fachjuristische oder institutionelle Beurteilung der aktuellen Texte muss im Schlussreview erfolgen.

Es wurden weder `main` gemergt noch ein Deployment oder Änderungen an Netlify-Zugangsschutz und Datenschutzkonfiguration vorgenommen.

## Visuelle Belege

| Gegenstand | Mobil, 390 px | Desktop, 1280 px |
| --- | --- | --- |
| Studienvergleich | [Aufnahme](bilder/genesung-390.png) | [Aufnahme](bilder/genesung-1280.png) |
| DEAR | [Aufnahme](bilder/grenzen-390.png) | [Aufnahme](bilder/grenzen-1280.png) |
| Zwei mögliche Sichten | [Aufnahme](bilder/beziehungen-390.png) | [Aufnahme](bilder/beziehungen-1280.png) |
| Akuthinweis | [Aufnahme](bilder/krise-390.png) | [Aufnahme](bilder/krise-1280.png) |
| Eigenes Leben | [Aufnahme](bilder/selbstfuersorge-390.png) | [Aufnahme](bilder/selbstfuersorge-1280.png) |
