# Restpunkte der Inhaltsprüfung – 23.09.2026

Fortsetzung nach Änderung 611. Diese Übersicht präzisiert die teilweise zu weit gefassten Erledigt-Angaben vom 22.09.2026. Redaktionelle Umsetzung ist keine fachliche oder institutionelle Freigabe.

| Punkt | Stand dieser Änderung                                                                                                                                                                                                                                              |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1–5   | Bereits in Änderung 611 beziehungsweise zuvor umgesetzt; kritische Funktionen werden mit den bestehenden Tests erneut geprüft.                                                                                                                                     |
| 6     | Zusätzlich neu gesetztes Handout zu Genesungszahlen: 290 Personen, zehn Jahre, mindestens zweijährige Remission bzw. Recovery und Grenzen der Übertragbarkeit.                                                                                                     |
| 7     | Textstände auf tatsächlich geänderten Seiten nachgeführt. Fachprüfdaten nicht erneuert. Vollständige Kontaktprüfung und erneute Fachprüfung bleiben offen.                                                                                                         |
| 8     | STOPP verwendet auf Themenseite, Textseite und im neuen PDF dieselbe Quelle. Atem- und Grounding-Korrekturen aus Änderung 611 bleiben erhalten.                                                                                                                    |
| 9     | Drei überarbeitete Materialien in Themenregister, Bibliothek, Textfassungen, Bildern und Downloads synchronisiert. Alte v1-Direktlinks werden weitergeleitet. Ältere Ampel-Verweise in Unterstützungstexten präzisiert. Kein Vollabgleich sämtlicher älterer PDFs. |
| 10    | Letzte sichtbare technische Erklärung der Soforthilfe durch Nutzungshinweis ersetzt.                                                                                                                                                                               |
| 11    | Auf neun Themenseiten wiederholte Orientierungsblöcke durch drei Kernaussagen ersetzt; Sprunglinks direkt unter der Einführung.                                                                                                                                    |
| 12    | Selbstvorwürfe und Erfolgsversprechen beim Grenzensetzen reduziert. Akute Beruhigung und spätere Absprachen ausdrücklich getrennt.                                                                                                                                 |
| 13    | Selbstfürsorge unabhängig von Hilfeleistung. Überschrift und neuer Abschnitt auf Grenzen lassen Kontaktpause, Veränderung und Trennung gleichwertig zu.                                                                                                            |
| 14    | Bereits ergänzte ausgewogene Einordnung beibehalten; weitere pauschale Motivzuschreibungen entschärft.                                                                                                                                                             |
| 15    | Kinderhilfe aus Unterstützung, Grenzen und Krise verlinkt; konkrete Betreuung und Ersatzkontakt. Neues Kinderhandout ohne pauschales Verbot des Wortes «krank».                                                                                                    |
| 16    | Gemeinsamer Beratungsblock bei Selbstfürsorge, Grenzen und Therapiebegleitung: kostenlos, vertraulich, ohne Vollmacht; Termin telefonisch oder vor Ort.                                                                                                            |
| 17    | Kompaktere Überschriftenbereiche; Startseite unterscheidet akute Hilfe, konkrete Situation und vertiefendes Wissen. Prüfung auf einem echten iPhone bleibt offen.                                                                                                  |
| 18    | Über uns, Fachstelle und Impressum nutzen dieselbe Einordnung. Bestätigung der tatsächlichen institutionellen Verantwortung und des Freigabeprozesses bleibt offen.                                                                                                |

## Drei Druckfassungen aus gemeinsamer Textquelle

`client/src/content/revisedHandouts.json` enthält die Texte zu Genesungszahlen, STOPP und Kindern. `qa/scripts/render-revised-handouts.py` erzeugt je eine A4-PDF-Seite sowie Bild und Vorschaubild. Alle drei PDF-Seiten wurden nach der Erstellung als gerenderte Seiten visuell geprüft. Der sichtbare Stand lautet redaktionell aktualisiert am 23.09.2026, erneute fachliche Prüfung ausstehend.

Benötigte Python-Pakete: ReportLab, PyMuPDF, Pillow; Schrift: DejaVu Sans. Aufruf vom Repository-Stamm: `python qa/scripts/render-revised-handouts.py`.

## Für die tatsächliche Freigabe noch zu dokumentieren

- Zuständige fachlich prüfende Person und institutionell autorisierte Stelle; bisherige Zuordnung zur Fachstelle bestätigen oder korrigieren.
- Geprüfter Inhalt und konkrete Version: Seiten, Krisenkontakte, Materialien und Sprachfassungen.
- Datum, Ergebnis, verbleibende Einschränkungen und nächste Prüfung je Gegenstand.
- Umfang eines Kontaktabgleichs ausdrücklich angeben; der bisherige Abgleich der PUK-Notfallnummern deckt nicht alle aufgeführten Hilfsangebote ab.
- Sichtprüfung auf einem echten iPhone einschliesslich Navigation, Vergrösserung, PDFs und telefonischen Links. Automatisierte Chromium-Ansichten ersetzen diesen Schritt nicht.

## Quellen für diese Ergänzungen

- PUK: Angehörigenberatung und Elternberatung: <https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/>
- Pro Juventute: <https://www.projuventute.ch/de/eltern/familie-gesellschaft/psychisch-kranke-eltern>
- Carol Vivyan, STOPP: <https://www.getselfhelp.co.uk/stopp/>
- NHS, Atemhinweise: <https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/>
- Zanarini et al. (2010), Zehnjahresstudie: <https://pubmed.ncbi.nlm.nih.gov/20395399/>

## Technische Prüfung

Lokal bestanden: Lint, Prettier, TypeScript, 386 Tests in 55 Dateien und Produktionsbuild (`pnpm verify`). Zusätzlich vollständiger Textabgleich der drei einseitigen PDFs mit ihrer gemeinsamen Textquelle; keine fehlenden Textabschnitte. Neue Prüfungen decken das Öffnen eines eingeklappten Abschnitts über die Sprunglinks sowie die Weiterleitung alter Materiallinks ab.

Visuelle Regression und veröffentlichte Vorschau werden im Änderungsantrag dokumentiert.
