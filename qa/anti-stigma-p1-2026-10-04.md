# Anti-Stigma-P1/P2: Umsetzungs- und Prüfbericht

**Stand:** 4. Oktober 2026

**Branch:** `codex/anti-stigma-p1-20261004`

**Status:** technisch sowie KI-gestützt redaktionell nachgeprüft; menschliche
Fach- und Perspektivenprüfung offen; nicht gemergt, nicht veröffentlicht

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

## Redaktionelle Nachbesserung zu PR #619

Die fünf Befunde der redaktionellen Prüfung des Stands `e64c2a09` wurden im Draft-PR nachgezogen:

- «Zuhören ohne Zustimmen» trennt pauschale Schuldzuweisung von Verantwortung und Entschuldigung für eigenes konkretes verletzendes Verhalten.
- «Pause statt Streit» bindet eine Fortsetzung an den Wunsch beider Seiten. Pause und Gesprächsende brauchen weder ein Rückkehrversprechen noch die Begründung, dass die Beziehung wichtig sei.
- Die Kommunikationsübung nach einem Arztbesuch beschreibt mögliche Wirkungen statt eine innere Reaktion sicher vorherzusagen. Eigene Erfahrungen oder Lösungsvorschläge werden nicht pauschal als falsch eingeordnet.
- «Absprachen klar und anpassbar halten» stellt klar, dass sich Verfügbarkeit, Grenzen und Möglichkeiten ändern dürfen und Verlässlichkeit keine unveränderte Reaktion verlangt.
- «Genesung in Zahlen» ordnet Langzeitdaten ein, ohne daraus einen individuellen oder bevorzugten Verlauf abzuleiten.

Gezielte Regressionstests sichern die Freiwilligkeit, die Unterscheidung von Schuld und konkreter Verantwortung, die offene Wirkungsbeschreibung sowie die nicht-prognostische Einordnung der Langzeitdaten. Die Änderungen benötigen weiterhin die im Review verlangte erneute Perspektiven- und Fachprüfung; dieser technische Nachzug ist keine institutionelle Freigabe.

## KI-gestützte redaktionelle Nachprüfung

Der nachgezogene Stand wurde am 5. Oktober 2026 anhand des Commits
`39102f95241bd942237a893bc7f6100bfc203361` erneut redaktionell beurteilt.
Im geprüften Umfang wurden die fünf bisherigen Befunde als behoben bewertet:

- Prüfgrundlage: GitHub-Commit `39102f95` und die geschützte Netlify-Vorschau
  von PR #619;
- Rolle: KI-gestütztes redaktionelles Review, keine menschliche Fach- oder
  Erfahrungsperspektivenprüfung.

| Prüfpunkt                        | Ergebnis der Nachprüfung                                                                                                                                              |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Verantwortung und Schuld         | Verantwortung für eigenes konkretes verletzendes Verhalten und eine Entschuldigung bleiben möglich. Verantwortung für Erkrankung oder Genesung wird davon abgegrenzt. |
| Gesprächsfortsetzung und Abstand | Eine Fortsetzung setzt den Wunsch beider Seiten voraus. Pause und Gesprächsende sind auch vor einer Eskalation möglich; eine spätere Rückkehr ist keine Pflicht.      |
| Gesprächswirkungen               | Interaktives Feedback beschreibt mögliche statt sicher behauptete Wirkungen. Eigene Erfahrungen und Lösungsvorschläge werden kontextabhängig eingeordnet.             |
| Verlässlichkeit                  | Klare, anpassbare Absprachen ersetzen die Forderung, stets gleich zu reagieren. Grenzen und Verfügbarkeit dürfen sich verändern.                                      |
| Genesungsdaten                   | Langzeitbefunde werden ausdrücklich von einer individuellen Verlaufsprognose getrennt.                                                                                |

**Redaktioneller Entscheid:** Im geprüften Umfang sind keine weiteren
KI-redaktionellen Korrekturen erforderlich. Dieser Entscheid ist weder eine
verantwortete fachliche oder institutionelle Freigabe noch ein Nachweis realer
Nutzenden- oder Screenreader-Tests.

Für die ausstehenden menschlichen Prüfungen steht das verbindlich auf diesen
Commit bezogene Arbeitsblatt
`docs/governance/pr619-menschliche-fach-und-perspektivenpruefung.md` bereit.
Rückmeldungen aus den beiden Erfahrungsperspektiven werden unabhängig erhoben;
abweichende Einschätzungen bleiben sichtbar und werden pro Befund begründet
angenommen, verworfen oder zurückgestellt.

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
| Vitest-Gesamtsuite                      | 61 Dateien, 533 Tests bestanden |
| Produktions-Build                       | bestanden                       |
| Öffentliche Infografik-Assets           | genau 39 registrierte Dateien   |
| P1-Entwurfsnachweise                    | 3 Pakete, 9 Assets geprüft      |
| XML-Prüfung der Begleiterkrankungen-SVG | bestanden                       |
| `git diff --check`                      | bestanden                       |

Die Anti-Stigma-Regressionstests prüfen unter anderem:

- keinen Kontrollauftrag in therapiebezogenen Checklisten;
- den Sicherheitsweg auch bei nicht-körperlicher Bedrohung;
- sechs gleichwertige, unverbundene Einträge in der Begleiterkrankungen-Grafik;
- mehrere unbewertete Genesungsverläufe ohne normative Einheitsform;
- freiwillige Gesprächsfortsetzung sowie Verantwortung ohne pauschale Schuldübernahme;
- mögliche statt behauptete Wirkungen von Gesprächsantworten und anpassbare Absprachen;
- Langzeitdaten ohne Prognose eines individuellen Genesungsverlaufs;
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

Der anschliessende Linux-CI-Lauf verglich die vorhandenen Referenzen: 12 unveränderte Kontrollen bestanden, 21 Aufnahmen wichen auf den bewusst überarbeiteten Seiten ab. Alle 21 Differenzpaare wurden einzeln geprüft und waren über Erstlauf und zwei Wiederholungen byteidentisch. Die Abweichungen entsprachen den vorgesehenen Text-, Sicherheits- und Visual-Governance-Änderungen; es fanden sich keine Überläufe, Überlagerungen, abgeschnittenen Inhalte oder globale Schrift- und Layoutdrift. Nur diese 21 Linux-Referenzen wurden aktualisiert. Bereits bestandene Referenzen blieben unverändert. Die drei `krise-cta`-Referenzen wurden im fehlschlagenden Lauf nach dem vorgelagerten `krise-hero`-Vergleich nicht erreicht und deshalb nicht ungeprüft ersetzt; ihre Kontrolle erfolgt im nachfolgenden CI-Lauf.

Das generische PUK-Audit interpretierte wegen der Repository-Struktur den Projektstamm statt des ausgelieferten Vite-Builds als Delivery-Root. Dadurch wurden auch Quellvorlagen, A4- und QA-Dateien als Webseiten geprüft (91 Seiten, 1'216 vermeintlich ausgelieferte Dateien, 4'776 fehlgeschlagene lokale Requests, 32 gemeldete Überläufe und 470 Source-Failures). Diese Werte sind Scope-Artefakte des Werkzeugs und kein Befund zur gebauten Website. Massgeblich sind deshalb der Produktions-Build und die oben dokumentierte Laufzeitprüfung.

## Bewusst offen

Vor einer institutionellen Veröffentlichung bleiben erforderlich:

- verantwortete fachliche und institutionelle Publikationsfreigabe;
- unabhängige Reviews durch eine Person mit eigener Borderline-Erfahrung und
  eine angehörige Person;
- reale Tests mit VoiceOver/Safari und NVDA/Firefox am aktuellen Commit;
- reale Nutzendentests mit typischen Aufgaben, beobachteter Orientierung und
  emotionaler Wirkung;
- PDF-UA-/Matterhorn-Prüfung und reale Drucktests für künftig freigegebene PDF-Fassungen.

Diese offenen Punkte sind keine Merge-Automatik. Die weitere Freigabe bleibt eine bewusste Entscheidung der verantwortlichen Stelle.
