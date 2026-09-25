# Zusammenführung der Website-Fassungen

Stand: 23. September 2026. Umsetzung lokal auf `codex/puk-interactive-refresh`, ausgehend von `6a375ce`. Noch nicht online veröffentlicht.

Die bestehende Website bleibt die Grundlage. Aus dem zuletzt gelieferten Projekt wurden fünf Illustrationen und zentrale Gedanken des Textsets v05 übernommen und für die vorhandenen Seiten überarbeitet. Die neue ZIP ersetzt weder das Projekt noch die ausgebauten Themenseiten.

## Was sich für Angehörige verändert

| Bereich              | Umgesetzt                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Situations-Wegweiser | Selbstverletzung verlangt keine Einstufung in «leicht» oder «schwer». Unsicherheit führt zu medizinischer Abklärung. Auch ohne auffällige körperliche Folgen gibt es keine Entwarnung. Rettungsdienst, Vergiftungsberatung und psychiatrische Anlaufstellen für die Altersgruppen sind direkt erreichbar.                                                      |
| Krisensprache        | Pauschale Empfehlungen zu Eiswürfeln, kalter Dusche und körperlicher Entladung entfernt. Begleitung und Übungen bleiben Angebote; Angehörige müssen keine Beruhigung erreichen. Sicherheitsbedingungen stehen bei der jeweiligen Handlung.                                                                                                                     |
| Druck und Rückzug    | Auch Suizidankündigungen im Konflikt führen zu professioneller Hilfe. Bei Sicherheitsbedenken wird keine Kontaktfrist abgewartet. Rückzug wird nicht als Beweis für ein bestimmtes Motiv erklärt.                                                                                                                                                              |
| Krisenseite          | Starre Zeitangaben zum Krisenverlauf, zur Nachbesprechung und zur Wiederherstellung von Vertrauen entfernt. Keine verpflichtende Gesprächsfolge und kein festes Tagesprogramm.                                                                                                                                                                                 |
| Grenzen              | Bewertender Fragebogen durch frei auswählbare Reflexionsfragen ersetzt. Keine Punktzahl, Schwellenwerte oder Gesamtbeurteilung. Schuldgefühl, eigenes Verhalten, praktische Hindernisse und Schutzbedarf werden unterschieden.                                                                                                                                 |
| Entlastung im Alltag | Vorgegebene Energiestärken und Balken entfernt. Stattdessen konkrete Belastungen und mögliche Veränderungen: Aufgaben abgeben, Verfügbarkeit begrenzen, eigene Unterstützung und Freiraum.                                                                                                                                                                     |
| Selbstfürsorge       | «Auch ich brauche Unterstützung» mit vier anschaulich gegliederten Möglichkeiten, Beispielsätzen und freiwilligen Reflexionsfragen integriert. Eigene Interessen und Gesundheit zählen unabhängig davon, wie viel Hilfe jemand leisten kann.                                                                                                                   |
| Kommunikation        | Nachfragen ohne Motive festzulegen; kurze Antworten, Grenze und Pause als frei wählbare Möglichkeiten. Eine Pause verpflichtet nicht zu einer sofort vereinbarten Wiederaufnahme.                                                                                                                                                                              |
| Therapiebegleitung   | Bei Entlassung wird keine automatische Betreuung oder Rund-um-die-Uhr-Verfügbarkeit durch Angehörige vorausgesetzt. Freiwillige Zusagen und professionelle Zuständigkeiten werden getrennt.                                                                                                                                                                    |
| Übungen              | STOPP-Kurzfassung, ausführliche Anleitung und Druckfassung nutzen dieselben Schrittbezeichnungen. «T – Tempo senken» vermeidet den bisherigen Widerspruch zwischen «tief atmen» und «nicht besonders tief einatmen». Der bereits korrigierte 4–6-Atemtimer bleibt ohne Haltephase. Grounding erlaubt das Auslassen nicht zugänglicher oder unangenehmer Sinne. |
| Gestaltung           | Fünf gelieferte Illustrationen zu Zuhören, Abstand, eigener Pause, unterschiedlichen Perspektiven und gemeinsamen guten Momenten integriert. Erläuternde Bildunterschriften bleiben als lesbarer Text zugänglich.                                                                                                                                              |

Direkte Einstiege im künftigen veröffentlichten Stand: `/wegweiser`, `/grenzen#grenzen-check`, `/selbstfuersorge#eigene-unterstuetzung`, `/kommunizieren#eskalation` und `/verstehen/beziehungen`.

## Umfang und Grenzen

- Die drei bereits illustrierten Druckfassungen «Vier Arten von Grenzen», «DEAR» und «Garten» bleiben erhalten. Die STOPP-Druckfassung und ihre Vorschauen wurden nachgeführt.
- Die übrigen älteren Material-PDFs sind nicht vollständig neu gestaltet oder fachlich erneut geprüft. Insbesondere die älteren Blätter zu Gesprächsabläufen, Sauerstoffmaske und Energie-Konto benötigen weiterhin einen Abgleich ihrer vollständigen Bild- und Textfassungen. Die Änderungen an den Website-Komponenten sind keine Freigabe dieser Altbestände.
- Es wird keine institutionelle Freigabe, klinische Prüfung oder PDF/UA-Zertifizierung behauptet. Prüfhinweise wurden nicht pauschal auf das Änderungsdatum gesetzt.
- Der Prototyp mit seinen Platzhalterseiten, dem separaten Laufzeitsystem und den künstlichen Bewertungen wurde nicht übernommen.

## Prüfung

- TypeScript-Prüfung und ESLint erfolgreich.
- Gesamtlauf: 395 von 397 Tests erfolgreich. Die beiden Fehler betrafen die absichtlich geänderte Überschrift des Grenzen-Checks. Nach Korrektur dieser Selektoren bestand der betroffene Test mit allen fünf Fällen. Damit sind sämtliche 397 Fälle durch Gesamtlauf und gezielten Nachtest abgedeckt.
- Sechs Wegweiser-Tests bestanden, darunter die neuen Fälle zu Selbstverletzung mit unklaren körperlichen Folgen, fehlender Entwarnung bei unauffälligen Folgen und Suizidankündigungen im Konflikt. Rücknavigation und die bereits vorhandenen Unsicherheitspfade bleiben geprüft.
- Der Produktionsbuild ist erfolgreich. Alle fünf neuen Bilddateien sind lokale Projektdateien.
- Das aktualisierte STOPP-PDF wurde neu gerendert und visuell kontrolliert: eine A4-Seite, lesbarer Text, keine abgeschnittenen Inhalte.
- Eine aktuelle visuelle Prüfung der Website im Browser ist weiterhin offen. Die zuvor gescheiterte betreute Vorschau wurde nicht als erfolgreicher Test gewertet. Alte Screenshot-Vergleiche sind keine Belege für diese Fassung. Ein echtes iPhone und umfassende Barrierefreiheit wurden nicht geprüft.

## Veröffentlichungsstatus

Nachtrag vom 24.09.2026: Christa hat den öffentlichen Upload der Änderungen einschliesslich der Bilder und das Bereitstellen einer Vorschau ausdrücklich genehmigt. Die folgende Beschreibung dokumentiert den vorherigen Blocker. Vor dem Upload wurden zwei leere WebP-Vorschauen aus ihren vorhandenen PDFs wiederhergestellt; alle 174 Rasterbilder wurden erfolgreich auf Lesbarkeit geprüft. Der bestehende Asset-Test weist jetzt auch leere Dateien zurück.

Die automatische Freigabeprüfung hat den früheren GitHub-Upload abgelehnt: Für die Übertragung der Änderungen einschliesslich gelieferter Gestaltungsmaterialien in das öffentliche Repository war keine ausreichend konkrete Zustimmung dokumentiert. Das Ziel ist inzwischen als bestehendes Projekt verifiziert: https://github.com/christaegger-dot/borderline-angehoerige . Eine ausdrückliche Zustimmung zum öffentlichen Upload der Änderungen samt Bildern ist noch erforderlich. Es wurde weder ein anderer Uploadweg noch eine alternative Veröffentlichung benutzt.

## Herkunft und fachlicher Abgleich

- Gelieferte ZIP `8d62a354-b278-4494-b7b3-7a9d6b575783.zip`, insbesondere `Reduziertes-Publikationsset-Handouttexte-v05.md` und `assets/illustrations/`.
- PUK Zürich, aktuelle Notfallnummern: https://www.pukzh.ch/ueber-uns/kontakt/notfall/ — Webabgleich am 23.09.2026; kein Testanruf.
- PUK Zürich, eigenständige Angehörigenberatung: https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/ — kostenlos, ohne Vollmacht, nach Voranmeldung.
- Tox Info Suisse, Vergiftungsnotruf: https://www.toxinfo.ch/notruf-145 — Abgrenzung zur Rettung bei Bewusstlosigkeit beziehungsweise Atem- und Kreislaufstillstand.
- NICE NG225, Empfehlungen zu bedürfnisorientierter Abklärung und gegen globale Risikoeinstufungen: https://www.nice.org.uk/guidance/ng225/chapter/Recommendations . Die offizielle Suchquelle war verfügbar; der direkte Seiten-/PDF-Abruf lieferte in dieser Umgebung HTTP 403. Kein erneuter vollständiger Leitlinienabgleich wird behauptet.
- STOPP: Carol Vivyan / Getselfhelp, angepasste deutschsprachige Fassung: https://www.getselfhelp.co.uk/stopp/ . Der vorhandene Quellenhinweis zu angenehmem Atmen ohne Anstrengung bleibt erhalten.
