# Anti-Stigma-P1/P2: Umsetzungs- und Prüfbericht

**Stand:** 4. Oktober 2026

**Branch:** `codex/anti-stigma-p1-20261004`

**Status:** technisch und redaktionell als Entwurf umgesetzt; nicht gemergt, nicht veröffentlicht

## Ziel und Prüfmassstab

Die Website soll weder Menschen mit Borderline-Erkrankung noch Angehörige pauschalisieren, beschuldigen oder auf starre Rollen festlegen. Inhalte müssen individuelle Unterschiede sichtbar machen, Autonomie und Zustimmung respektieren, reale Belastungen anerkennen und bei Bedrohung oder Gewalt einen diagnose- und motivneutralen Sicherheitsweg anbieten.

Massgeblich waren der PUK-Website- und Gestaltungsrahmen, der Borderline-Handout-Workflow sowie der neue verbindliche Perspektivenstandard in `docs/governance/11-anti-stigma-und-perspektivenstandard.md`.

## Umgesetzte P1-Korrekturen

- Diagnose, Begleiterkrankungen, Genesung und Beziehungsverläufe werden als individuell und nicht deterministisch beschrieben.
- Krisen- und Sicherheitsinhalte unterscheiden klar zwischen Belastung, Selbstgefährdung sowie Bedrohung, Einschüchterung, Stalking, Zwang oder Gewalt.
- Der Sicherheitsweg verlangt keine Einschätzung von Diagnose oder Motiven; bei akuter Bedrohung oder Gewalt wird auf Abstand, einen sicheren Ort und 117 verwiesen.
- Zustimmung, Schweigepflicht, Datenschutz und Autonomie wurden präzisiert.
- Therapiebezogene Inhalte geben Angehörigen keinen Kontroll-, Bewertungs- oder Prognoseauftrag.
- Rollenbeispiele werden als mögliche, nicht als typische oder vorgeschriebene Erfahrungen ausgewiesen.
- Die Begleiterkrankungen-Grafik zeigt sechs gleichwertige, unverbundene Einträge ohne Borderline als hierarchisches Zentrum.
- Die Genesungsdarstellung zeigt mehrere unbewertete Verläufe statt eines einheitlichen oder linearen Weges.

## Bild- und Handout-Governance

- Die Auslieferung ist fail-closed: Nur im Register ausdrücklich freigegebene kanonische Assets verbleiben im öffentlichen Build.
- Veraltete, ungeprüfte oder stigmatisierungsgefährdete Varianten wurden unter `qa/archived-handouts/` nachvollziehbar archiviert.
- Das P1-Illustrationspaket «Radikale Akzeptanz», «Wenn Gespräche kippen» und «Beispiel-Dialog» bleibt als barrierefreie HTML-Textfassung zugänglich; PDF-, WebP- und Thumbnail-Entwürfe liegen bis zur verantworteten Freigabe unter `qa/withheld-handouts/`.
- Der Notfallplan bleibt als HTML-Textfassung verfügbar. Nicht abschliessend freigegebene PDF- und Bildfassungen werden nicht öffentlich ausgeliefert.
- ZIP-Sammlungen, Generatoren und Übersichtsbögen sind nicht mehr Teil des öffentlichen Webverzeichnisses.
- Der Produktions-Build prüft und spiegelt genau 39 registrierte kanonische Infografikdateien.

## Automatisierte Prüfungen

| Prüfung                                 | Ergebnis                        |
| --------------------------------------- | ------------------------------- |
| TypeScript                              | bestanden                       |
| ESLint                                  | bestanden                       |
| Vitest-Gesamtsuite                      | 59 Dateien, 529 Tests bestanden |
| Produktions-Build                       | bestanden                       |
| Öffentliche Infografik-Assets           | genau 39 registrierte Dateien   |
| XML-Prüfung der Begleiterkrankungen-SVG | bestanden                       |
| `git diff --check`                      | bestanden                       |

Die Anti-Stigma-Regressionstests prüfen unter anderem:

- keinen Kontrollauftrag in therapiebezogenen Checklisten;
- den Sicherheitsweg auch bei nicht-körperlicher Bedrohung;
- sechs gleichwertige, unverbundene Einträge in der Begleiterkrankungen-Grafik;
- mehrere unbewertete Genesungsverläufe ohne normative Einheitsform;
- die Sperre nicht freigegebener Handout- und Bilddateien.

## Browser- und Responsive-Prüfung

Zehn relevante Routen wurden in allen drei definierten Viewports geprüft:

- 360 × 800 px
- 768 × 900 px
- 1440 × 1000 px

Damit wurden 30 Routen-/Viewport-Kombinationen kontrolliert. In allen Fällen waren genau ein Hauptinhalt und eine H1 vorhanden, der Sprunglink war verfügbar und es trat kein horizontaler Überlauf auf.

Zusätzlich geprüft:

- mobile Navigation per Tastatur, einschliesslich Fokusübergabe und Fokus-Rückgabe mit Escape;
- Sprunglink als erstes fokussierbares Element;
- der Wegweiser für Bedrohung, Einschüchterung, Stalking, Zwang und Gewalt;
- die Begleiterkrankungen-Grafik auf Mobilbreite;
- die unbewerteten Genesungsverläufe auf Desktopbreite;
- Browser-Konsole ohne Warnungen oder Fehler.

## Einordnung begrenzter Werkzeuge

Der Playwright-Lauf konnte auf diesem Mac keine vollständige visuelle Regression bewerten: 30 Darwin-Referenzbilder fehlten und wurden vom Werkzeug lediglich als neue Ist-Bilder erzeugt. Drei referenzunabhängige Tests bestanden. Die erzeugten Referenzbilder wurden nicht übernommen. Dieser Befund ist kein nachgewiesener Darstellungsfehler, ersetzt aber auch keinen belastbaren Bildvergleich.

Das generische PUK-Audit interpretierte wegen der Repository-Struktur den Projektstamm statt des ausgelieferten Vite-Builds als Delivery-Root. Dadurch wurden auch Quellvorlagen, A4- und QA-Dateien als Webseiten geprüft (91 Seiten, 1'216 vermeintlich ausgelieferte Dateien, 4'776 fehlgeschlagene lokale Requests, 32 gemeldete Überläufe und 470 Source-Failures). Diese Werte sind Scope-Artefakte des Werkzeugs und kein Befund zur gebauten Website. Massgeblich sind deshalb der Produktions-Build und die oben dokumentierte Laufzeitprüfung.

## Bewusst offen

Vor einer institutionellen Veröffentlichung bleiben erforderlich:

- verantwortete fachliche und institutionelle Publikationsfreigabe;
- reale Tests mit VoiceOver und NVDA;
- Tests mit betroffenen Personen und Angehörigen;
- PDF-UA-/Matterhorn-Prüfung und reale Drucktests für künftig freigegebene PDF-Fassungen.

Diese offenen Punkte sind keine Merge-Automatik. Die weitere Freigabe bleibt eine bewusste Entscheidung der verantwortlichen Stelle.
