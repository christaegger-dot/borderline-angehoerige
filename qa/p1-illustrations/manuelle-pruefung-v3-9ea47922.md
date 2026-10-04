# Durchführungsmappe: manuelle V3-Prüfungen zu PR #618

> **Historischer Bezugsstand:** Die Testaufgaben und das Matterhorn-Register
> bleiben verwendbar. Die hier genannten PDF-Hashes, Kandidatenhinweise und
> technischen Strukturbefunde sind jedoch überholt. Für alle neuen Durchgänge
> gilt ausschliesslich der
> [technische R2-Nachweis](technische-nachpruefung-r2-2026-10-04.md) mit dem
> dauerhaft gespeicherten R2-Kandidatenpaket.

Stand: 04.10.2026, Europe/Zurich. Bezugscommit: `9ea47922ab1f2dd6ae317d102b547a97f981af42`.
Ergänzende Liveprüfung am Kopf `92d0c354e5f9e7130f03609b905c35323e2bb4d6`: siehe [Live-Nachweis](live-preview-v3-92d0c354-2026-10-04.md). Die übrigen Erstprüfungen beziehen sich weiterhin auf den oben genannten Bezugscommit.

Diese Mappe ergänzt den [bestehenden Prüfplan](qualitaetspruefung-v3-2026-10-04.md). Sie bereitet die tatsächlichen Durchgänge vor und dokumentiert die in dieser Sitzung durchgeführte Vorprüfung. Sie erteilt keine institutionelle oder PDF/UA-Freigabe.

## 1. Ergebnis dieser Sitzung

| Prüfung                           | Ergebnis / Reichweite                                                                                                                                                                                                                                                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub-Stand                      | PR #618 offen, Draft, ungemergt; Kopf beim Abgleich `9ea47922`.                                                                                                                                                                                                                                                                              |
| CI und Preview-Deployment         | Typecheck/Lint/Test/Build und visuelle Regression erfolgreich; Netlify-Deploy-Preview erfolgreich. «Pages changed» neutral, kein Fehler.                                                                                                                                                                                                     |
| Drei Repository-PDFs              | Vom Bezugscommit gelesen; alle SHA-256-Werte stimmen mit dem Manifest überein.                                                                                                                                                                                                                                                               |
| Sichtkontrolle                    | Alle drei einseitigen A4-Renderings geprüft; in dieser Ansicht keine abgeschnittenen Texte oder Überlagerungen festgestellt. Keine reale Druckprüfung.                                                                                                                                                                                       |
| Unabhängiger Vergleich mit #617   | Logische und layoutbezogene Poppler-Textextraktion exakt gleich; RGB-Pixel bei identischer Rasterung auf 1800 px lange Kante exakt gleich.                                                                                                                                                                                                   |
| Strukturvorprüfung                | XMP vorhanden, kein PDF/UA-Identifier; 4/3/5 nummerierte Schritte als Lbl/LBody. Nach korrekter Behandlung verschachtelter ActualText-Spans keine sichtbaren Glyphen ohne übergeordnete MCID-Zuordnung gefunden.                                                                                                                             |
| veraPDF                           | Vorhandenen Bericht gelesen und dessen Quellhashes abgeglichen: temporäre Kandidaten je 106/0/0. In dieser Sitzung kein neuer veraPDF-Lauf; qpdf und veraPDF sind hier nicht installiert.                                                                                                                                                    |
| Live-Browserprüfung               | Zunächst am Netlify-Ursprung blockiert; nach ausdrücklicher Zustimmung am 04.10.2026 erfolgreich nachgeprüft: drei Tastatur-/Beschreibungspfade, sechs PDF-Bedienelemente, drei abgeschlossene Downloads mit passenden Hashes. Umfang und Grenzen im [Live-Nachweis](live-preview-v3-92d0c354-2026-10-04.md). Kein realer Screenreader-Test. |
| Echte Screenreader-Prüfung        | Nicht durchgeführt: native VoiceOver-/NVDA-Bedienung und menschliches Anhören sind in dieser Umgebung nicht verfügbar.                                                                                                                                                                                                                       |
| Nutzenden- / physische Drucktests | Geplant, nicht durchgeführt.                                                                                                                                                                                                                                                                                                                 |

Der [Strukturnachweis mit Lesehilfe](pdf-strukturreview-v3-9ea47922.json) enthält Dateihashes, Rollen, MCIDs, normalisierte Textabschnitte und die Grenzen der Prüfung. Er ist keine Aufnahme einer Sprachausgabe. Insbesondere die Interpretation als Dekoration sowie tatsächliche Ansage und Bedienbarkeit bleiben offen.

Die vorhandenen automatisierten Ergebnisse zu den temporären Prüfkandidaten werden nicht auf eine vollständige Freigabe der ausgelieferten PDFs übertragen. Die 106 veraPDF-Regeln sind auch nicht mit 106 abgearbeiteten Matterhorn-Einträgen gleichzusetzen.

## 2. Prüffassungen eindeutig festlegen

### Aktuell im PR enthaltene PDFs ohne PDF/UA-Identifier

| Blatt                      | Datei am Bezugscommit                                                                                                                                                               | SHA-256                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Radikale Akzeptanz (RA)    | [Repository-PDF](https://github.com/christaegger-dot/borderline-angehoerige/blob/9ea47922ab1f2dd6ae317d102b547a97f981af42/client/public/infografiken/puk-radikale-akzeptanz-v3.pdf) | `9c89e918e072bc8fa18941355b3040b4913fdd9ea4e035c4f41a23e7e34cc06d` |
| Wenn Gespräche kippen (GK) | [Repository-PDF](https://github.com/christaegger-dot/borderline-angehoerige/blob/9ea47922ab1f2dd6ae317d102b547a97f981af42/client/public/infografiken/puk-gespraeche-kippen-v3.pdf)  | `c5e7ea393526f166844d3f68114fd3ab54f20147c591959245267493b20aa505` |
| Beispiel-Dialog (BD)       | [Repository-PDF](https://github.com/christaegger-dot/borderline-angehoerige/blob/9ea47922ab1f2dd6ae317d102b547a97f981af42/client/public/infografiken/puk-beispiel-dialog-v3.pdf)    | `7f1e740927baa7fa238fe549c15dadb315331ab62bc0b381f8fa0d1214ed182e` |

Diese Links ersetzen die im Übergabetext leeren PDF-Angaben. Es sind verifizierte GitHub-Dateilinks. Die ergänzende [Liveprüfung](live-preview-v3-92d0c354-2026-10-04.md) bestätigt inzwischen auch das Öffnen und Herunterladen aller drei Preview-PDFs; die dort protokollierten Downloadhashes stimmen mit diesen Dateien überein.

**Zwei Prüfgegenstände auseinanderhalten:** Bedienbarkeit der aktuellen Preview und Repository-PDFs kann sofort auf den richtigen Geräten getestet werden. Die abschliessende manuelle PDF/UA-Prüfung und deren Screenreader-Nachweis müssen sich hingegen auf dauerhaft aufbewahrte, identifiertragende Kandidaten beziehen. Ergebnisse zwischen beiden Fassungen dürfen nur mit dokumentiertem Abgleich übertragen werden.

### Dauerhafte Kandidaten vor dem abschliessenden PDF-Durchgang

Im vorhandenen Bericht steht `candidate_files_persisted: false`. Die darin genannten Kandidatenhashes sind historische Nachweise; die damaligen Dateien sind nicht als Übergabepaket verfügbar.

Vor dem abschliessenden Durchgang eine benannte Person mit einer passenden lokalen Prüfumgebung einsetzen. Voraussetzungen: Python-Umgebung gemäss `requirements.txt`, qpdf, Poppler und veraPDF; verwendete Versionen protokollieren. Das vorhandene Kandidatenskript unverändert verwenden. Der Ablageort muss dauerhaft und ausserhalb des Repository liegen; Kandidaten vor Freigabe nicht in Website-Pfade kopieren.

Beispielbefehle zur späteren Ausführung, mit einem realen Archivpfad und bereits gesetztem `P1_PDF_PYTHON_PATH`:

```bash
P1_REVIEW_DIR="/absoluter/Pfad/zum/Pruefarchiv/p1-v3-9ea47922"
mkdir -p "$P1_REVIEW_DIR"
"$P1_PDF_PYTHON_PATH" qa/p1-illustrations/validate-pdfua-candidates.py \
  --repo-root . --candidate-dir "$P1_REVIEW_DIR/kandidaten" \
  > "$P1_REVIEW_DIR/verapdf-kandidaten.json"
```

Zusätzlich die vollständigen Einzelberichte des Validators archivieren. Danach Dateinamen, frisch berechnete Kandidatenhashes, Werkzeugversionen und Archivverweise in das Prüfregister eintragen. Ein abweichender Kandidatenhash ist ein neuer Prüfgegenstand und muss als solcher dokumentiert werden. In dieser Sitzung wurden keine Kandidaten erzeugt oder als aufbewahrt ausgegeben.

Für die Webprüfung die [Deploy-Preview #618](https://deploy-preview-618--borderline-angehoerige.netlify.app/) mit berechtigtem Zugang verwenden. Die Hauptwebsite enthält vor dem Merge weiterhin einen anderen PDF-Stand. Vor jedem Durchgang Deployment-Commit und heruntergeladenen PDF-Hash abgleichen.

## 3. Manuelle Matterhorn-Prüfung

**Zuständig:** benannte PDF-Fachperson; Name und Funktion noch einzutragen.
**Arbeitsmittel:** dauerhaft gespeicherte Kandidaten, vollständiger Validatorbericht, Tag-Inspektor, passende assistive Technik und das [Matterhorn-Protokoll 1.1](https://pdfa.org/download-area/publications/Matterhorn-Protocol-1-1.pdf).

Das folgende Register enthält alle 47 im Original als «H» gekennzeichneten Einträge, mit Suchworten statt verkürzten Ersatzdefinitionen. Die exakte Fehlerbedingung jeweils im Original lesen. Die 141 Blattentscheide bleiben offen. Die 87 «M»-Einträge weiterhin über vollständige maschinelle Nachweise abdecken; 23-001 und 27-001 bei der Gesamtprüfung berücksichtigen, obwohl sie keinen eigenen spezifischen Test verlangen.

Status je Zelle: **O** offen, **B** geprüft ohne Befund, **K** Korrektur erforderlich, **N** nicht anwendbar mit Begründung. Fehlende Funktionalität nicht bloss aus einem erfolgreichen Validatorlauf ableiten. Jede Entscheidung erhält Beleg, prüfende Person, Datum und Kandidatenhash. Ein «N» braucht eine kontrollierte Begründung.

| Matterhorn-ID | Suchwort               | RA    | GK    | BD    |
| ------------- | ---------------------- | ----- | ----- | ----- |
| 01-001        | Dekoration             | offen | offen | offen |
| 01-002        | Nutzinhalt             | offen | offen | offen |
| 01-006        | Semantik               | offen | offen | offen |
| 02-002        | Rollenzuordnung        | offen | offen | offen |
| 03-001        | Aktionsflackern        | offen | offen | offen |
| 03-002        | Medienflackern         | offen | offen | offen |
| 03-003        | Skriptflackern         | offen | offen | offen |
| 04-001        | Visuelle Bedeutung     | offen | offen | offen |
| 05-001        | Medienalternative      | offen | offen | offen |
| 05-002        | Audioalternative       | offen | offen | offen |
| 05-003        | Signalalternative      | offen | offen | offen |
| 06-004        | Dokumenttitel          | offen | offen | offen |
| 08-001        | OCR-Text               | offen | offen | offen |
| 08-002        | OCR-Tags               | offen | offen | offen |
| 09-001        | Lesereihenfolge        | offen | offen | offen |
| 09-002        | Verschachtelung        | offen | offen | offen |
| 09-003        | Strukturrolle          | offen | offen | offen |
| 11-007        | Sprache                | offen | offen | offen |
| 12-001        | Zeichenstreckung       | offen | offen | offen |
| 13-001        | Grafiksemantik         | offen | offen | offen |
| 13-002        | Grafiklink             | offen | offen | offen |
| 13-003        | Bildunterschrift       | offen | offen | offen |
| 13-005        | Textalternative        | offen | offen | offen |
| 13-006        | Grafikgruppen          | offen | offen | offen |
| 13-007        | Darstellungswahl       | offen | offen | offen |
| 13-008        | Textgrafik             | offen | offen | offen |
| 14-001        | Überschrift            | offen | offen | offen |
| 14-004        | Überschriftstyp        | offen | offen | offen |
| 14-005        | Tiefe Überschrift      | offen | offen | offen |
| 15-001        | Zeilenkopf             | offen | offen | offen |
| 15-002        | Spaltenkopf            | offen | offen | offen |
| 15-004        | Tabellensemantik       | offen | offen | offen |
| 15-005        | Kopfzuordnung          | offen | offen | offen |
| 16-001        | Listennummerierung     | offen | offen | offen |
| 16-002        | Nummerierungsart       | offen | offen | offen |
| 16-003        | Listensemantik         | offen | offen | offen |
| 17-001        | Formelsemantik         | offen | offen | offen |
| 18-001        | Seiteninventar         | offen | offen | offen |
| 18-002        | Inventaruntertyp       | offen | offen | offen |
| 19-001        | Anmerkung              | offen | offen | offen |
| 19-002        | Referenz               | offen | offen | offen |
| 24-001        | Papierformular         | offen | offen | offen |
| 28-001        | Annotationsreihenfolge | offen | offen | offen |
| 28-003        | Annotationssemantik    | offen | offen | offen |
| 28-013        | Imagemap               | offen | offen | offen |
| 29-001        | Tastenzeit             | offen | offen | offen |
| 31-010        | Schriftlizenz          | offen | offen | offen |

### Schwerpunkte an genau diesen Blättern

| Stelle                       | Konkrete manuelle Aufgabe                                                                                                 | Erwartung / Dokumentation                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RA: Gegenüberstellung        | Erst die linke Gruppe samt Überschrift, danach die rechte Gruppe lesen lassen.                                            | «Akzeptanz ist nicht» gehört zu Aufgeben, Gutheissen, Passivität, Resignation; kein zeilenweiser Wechsel zwischen den Gruppen.                                    |
| RA: vier Schritte            | Jeden Eintrag vollständig lesen, danach zum nächsten springen.                                                            | 1 Benennen, 2 Spüren, 3 Anerkennen, 4 Handlungsspielraum; die zugehörige Erklärung bleibt beim Eintrag.                                                           |
| GK: drei Schritte            | Nummern und ganze Beispielsätze im Tag-Inspektor und hörend vergleichen.                                                  | 1 Beruhigen, 2 Verbinden, 3 Begrenzen oder beenden; der Satz «Ein neues Gespräch ist nur eine Möglichkeit, keine Pflicht» bleibt vollständig erhalten.            |
| GK: Pausenblock              | Die drei nebeneinander stehenden Punkte nacheinander lesen lassen.                                                        | Kein Vermischen von Zeilen unterschiedlicher Punkte; ein Rückkehrversprechen wird nicht verlangt.                                                                 |
| BD: fünf Möglichkeiten       | Eine ganze Spalte lesen, erst dann zur nächsten wechseln.                                                                 | Verbinden, Vorsichtig spiegeln, Grenze, Pause, Optionaler Wiedereinstieg; keine gemeinsame Ansage aller Nummern vor den Sätzen.                                   |
| BD: Hinweis unter dem Ablauf | Den gesamten fett gesetzten Absatz anhören.                                                                               | Auswahlcharakter und «Es gibt keine Rückkehrpflicht» werden vollständig vermittelt.                                                                               |
| Alle: Ligaturen              | «finden», «beeinflussen», «Pflichtfolge» und «Rückkehrpflicht» an den jeweiligen Stellen anhören und Zeichenfolge prüfen. | Keine Auslassung ab fi/fl-Ligaturen; kein Abbruch des Satzes durch verschachtelte ActualText-Spans.                                                               |
| Alle: Vektorelemente         | Jede im Postprozessor als Layout-Artefakt eingeordnete Gruppe visuell und im Tag-Baum vergleichen.                        | Keine Schrittnummer, Inhaltsbeziehung oder Warninformation geht verloren. Rahmen, Trennlinien und Flächen einzeln begründet einordnen.                            |
| Alle: PUK-Logo               | Alternativtext und Position im Lesefluss prüfen.                                                                          | Identifikation der Institution verständlich; keine störende Mehrfachansage desselben grafischen Bestandteils.                                                     |
| Alle: unterer Seitenbereich  | Seitenzahl, Quellen, Entwurfsstatus, Beratungsgrenze und Institution einzeln einordnen.                                   | Reines Seiteninventar von inhaltlich notwendiger Herkunfts- und Statusinformation unterscheiden; nicht pauschal den ganzen Fussbereich als Dekoration ausblenden. |
| Alle: Farbe / Graustufen     | Blaue Flächen und Nummern ohne Farbe sowie mit Vergrösserung beurteilen.                                                  | Zuordnung und Bedeutung bleiben auch ohne Farberkennung erhalten; tatsächliche Lesbarkeit separat prüfen.                                                         |
| GK/BD: Sicherheit            | Sicherheitshinweis vollständig anhören und die beiden Situationen erklären lassen.                                        | Gewalt/Bedrohung und vermutete unmittelbare Selbstgefährdung bleiben unterscheidbar; Eigenschutz und professionelle Hilfe bleiben hörbar.                         |

Die Sicht- und Strukturvorprüfung legt für diese Aufgaben passende Soll-Reihenfolgen nahe. Sie ersetzt keinen der offenen Entscheide im Register.

## 4. Screenreader-Durchführung auf realen Geräten

**Durchführende:** möglichst Personen, die die jeweilige assistive Technik regelmässig verwenden. Eine zweite Person protokolliert. Name, Betriebssystem, Browser/Reader, Screenreader-Version, Tastaturlayout, Stimme und besondere Einstellungen festhalten.

| Lauf            | Umgebung                      | Umfang                               | Status             |
| --------------- | ----------------------------- | ------------------------------------ | ------------------ |
| SR-MAC-RA/GK/BD | macOS, Safari, VoiceOver      | drei Preview-Seiten                  | nicht durchgeführt |
| SR-WIN-RA/GK/BD | Windows, Firefox, NVDA        | drei Preview-Seiten                  | nicht durchgeführt |
| SR-PDF-RA/GK/BD | Windows, Acrobat Reader, NVDA | drei aufbewahrte Kandidaten mit Hash | nicht durchgeführt |

Pro Web-Kombination zunächst 30–45 Minuten für das Paket einplanen, für den PDF-Durchgang 30–45 Minuten. Dies sind Planungswerte; Befunde und Nachprüfungen können zusätzliche Zeit benötigen.

### Gleicher Ablauf pro Blatt

1. **Einstieg ohne Maus:** Titel, Hauptbereich und Überschriften finden. Ansage und Orientierung protokollieren.
2. **Aufklappen:** Textbeschreibung erreichen; Name und Zustand vor sowie nach Aktivierung festhalten. Mit Tastatur öffnen, Inhalt lesen, wieder schliessen und weiter navigieren. Kein Fokusverlust und keine Tastaturfalle.
3. **Vollständig hören:** Alle Inhalte lesen lassen. Insbesondere die Prüfpunkte aus Abschnitt 3 abhören; eine reine Überschriftenliste genügt nicht.
4. **PDF-Linkzweck:** Öffnen und Herunterladen anhand der Linkansage unterscheiden; richtige Datei kontrollieren. Anschliessend zur Seite zurückkehren und Fokus prüfen.
5. **PDF separat:** Kandidat anhand des Hashes auswählen, in Reader öffnen, Dokumenttitel und Überschriften prüfen, gesamte Seite lesen und zwischen Listenpunkten navigieren.
6. **Ergebnis notieren:** Tatsächlich gehörte problematische Passage oder genaue Bedienfolge festhalten; hilfreich sind kurze freiwillig erstellte Mitschriften ohne personenbezogene Daten. Eine synthetisch erzeugte Vorlesedatei oder ein DOM-Snapshot gilt nicht als ausgeführter Screenreader-Test.

Orientierungshilfen: VoiceOver lässt sich auf dem Mac mit Command-F5 ein-/ausschalten; gerätespezifische Funktionstasten beachten. NVDA bietet im Lesemodus mit NVDA+F7 eine Elementliste für Überschriften und Links. Diese Hilfen ersetzen keine Einarbeitung. Quellen: [Apple](https://support.apple.com/en-euro/guide/voiceover/vo2682/mac), [NV Access](https://download.nvaccess.org/documentation/userGuide.html).

### Protokoll pro Lauf / Befund

```yaml
test_id:
blatt:
pruefende_person_rolle:
datum:
quelle: # Preview / Repository-PDF / aufbewahrter Kandidat
commit:
url_oder_archivverweis:
pdf_sha256:
betriebssystem_version:
browser_oder_reader_version:
screenreader_version:
tastaturlayout_stimme_einstellungen:
ausgefuehrte_schritte:
erwartung:
tatsaechliche_ansage_oder_beobachtung:
status: nicht durchgeführt
befund_id:
nachpruefung_commit_hash:
```

Bei Auslassungen, falscher Zuordnung oder fehlendem Zugang zu Sicherheitsinformationen den Durchgang für diese Fassung als korrekturbedürftig dokumentieren. Andere unabhängige Tests dürfen weiterlaufen. Nach Korrektur betroffene und angrenzende Stellen erneut testen.

## 5. Nutzendentests verbindlich vorbereiten

**Planung:** zunächst 3–5 freiwillige Angehörige, je etwa 25 Minuten; unterschiedliche Lesegewohnheiten und digitale Erfahrung. Keine Repräsentativitätsbehauptung. Koordination, Moderation und Protokollführung noch benennen; keine Personen wurden kontaktiert.

**Einstieg der Moderation:** «Wir prüfen, ob die Materialien verständlich sind. Sie können Aufgaben auslassen oder jederzeit aufhören. Sie müssen nichts Persönliches erzählen.»

Ablauf: 2 Minuten Einstieg, 5 Minuten selbstständige Orientierung, 12 Minuten Aufgaben, 4 Minuten Rückmeldung, 2 Minuten Abschluss. Die Blattreihenfolge zwischen Personen wechseln. Vor den Aufgaben keine gewünschte Interpretation erklären. Hauptmedium zwischen Web und PDF variieren; danach dasselbe Blatt im anderen Format auffinden lassen.

| Aufgabe                                                                        | Beobachtung                                                                         |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Akzeptanz in eigenen Worten erklären; was bleibt veränderbar?                  | Gegenwart/Zukunft und Anerkennen/Gutheissen unterschieden?                          |
| Bei einem fiktiven anstrengenden Gespräch eine passende Möglichkeit auswählen. | Auswahl, Auslassen und Beenden erkannt? Späterer Kontakt als freiwillig verstanden? |
| Einen Satz in die eigene Sprache übertragen oder begründet nicht verwenden.    | Alltagstauglichkeit und fehlende Erfolgsgarantie verstanden?                        |
| Im Blatt nach Hinweisen für zwei verschiedene Gefahrensituationen suchen.      | Sicherheitshinweise gefunden und voneinander unterschieden?                         |
| Beschreibung und mitnehmbares PDF finden; Bild und Thumbnail zuordnen.         | Zugang und Zuordnung ohne Anleitung möglich?                                        |
| «Was war unklar oder hat sich belastend angefühlt?»                            | Schuld, Druck, Überverantwortung oder unpassende Ansprache?                         |

Auswertung pro Aufgabe: selbstständig verstanden / nach Rückfrage verstanden / anders verstanden / ausgelassen. Beobachtete Worte und Fundstelle notieren; keine Diagnose oder Bewertung der Person. Jedes sicherheitsrelevante Missverständnis mit der Fachperson klären. Wiederkehrende Verständnishürden verbessern und erneut testen.

Nur anonyme Kennungen wie U01–U05 verwenden. Ergebnisnotizen mit Einverständnis aufbewahren; keine Gesundheitsgeschichten, Kontaktdaten oder Aufnahmen in GitHub. Bei Belastung unterbrechen, nicht zu persönlichen Krisenerfahrungen nachfragen. Es werden keine realen Notrufe oder Krisensituationen zu Testzwecken ausgelöst.

## 6. Physische Drucktests

**Durchführende / Drucker:** noch zu benennen. Für das Paket zunächst 20–30 Minuten vorsehen. Prüffassung und Kandidatenhash vor dem Druck festhalten.

| Variante                               | Umfang                   | Einstellungen                                               | Status             |
| -------------------------------------- | ------------------------ | ----------------------------------------------------------- | ------------------ |
| PDF Farbe                              | alle drei Blätter        | A4 hoch, 100 %, einseitig; Drucker/Reader notieren          | nicht durchgeführt |
| PDF Graustufen                         | alle drei Blätter        | gleiche Geometrie; Graustufenmodus notieren                 | nicht durchgeführt |
| Browserdruck, Beschreibung geschlossen | alle drei Preview-Seiten | genutzter Browser; Skalierung und Kopf-/Fusszeilen notieren | nicht durchgeführt |
| Browserdruck, Beschreibung geöffnet    | alle drei Preview-Seiten | gleiche Einstellungen                                       | nicht durchgeführt |

Das sind sechs PDF-Ausdrucke und sechs Web-Druckaufträge; die Seitenzahl der Webdruckfassung kann höher sein. Beide Aufklappzustände prüfen, damit notwendiger Inhalt nicht vom Zustand des Bedienelements abhängt.

Auf dem echten Papier kontrollieren: vollständige Ränder und Fusszeilen; lesbare kleinste Schrift bei normalem Abstand; klare Zahlen und Trennlinien; vollständige Sicherheits- und Freiwilligkeitstexte; keine abgeschnittenen Kästen oder unerwünschten Leerseiten. Beim Webdruck müssen die vorgesehenen Handout-Inhalte in beiden Zuständen vorhanden sein. Für eine nur durch «An Seite anpassen» brauchbare Ausgabe den Unterschied zur 100-%-Fassung dokumentieren, nicht stillschweigend überschreiben.

Je Variante Ergebnis, Problemstelle und Druckparameter notieren. Fotos nur vom Blatt ohne private Umgebung aufnehmen. Nach einer Layoutkorrektur alle betroffenen Formate einschliesslich WebP und Thumbnail gemeinsam abgleichen.

## 7. Reihenfolge und Abschluss

1. Koordination, PDF-Fachperson und durchführende Personen benennen; dauerhafte Kandidaten erzeugen und archivieren.
2. Matterhorn-Prüfung und reale Screenreader-Durchgänge an denselben Kandidaten durchführen. Die Preview-Zugänglichkeit separat protokollieren.
3. Nutzendentests und Drucktests durchführen; fachliche, technische und gestalterische Befunde zusammenführen.
4. Korrekturen umsetzen, erforderliche Wiederholungen durchführen, genaue finale Hashes und gemeinsame Version von Web/PDF/WebP/Thumbnail festhalten.
5. Zuständige Person entscheidet über technische Konformität, institutionelle Kennzeichnung und öffentliche Publikation jeweils mit eindeutigem Geltungsbereich.

```yaml
verantwortliche_person_rolle:
entscheid_datum:
paket_commit:
kandidaten_archiv:
kandidaten_sha256:
matterhorn_47_h_eintraege_je_blatt: offen
maschinenpruefung_finale_kandidaten: offen
reale_screenreader_web_pdf: offen
nutzendentests: offen
physischer_druck: offen
formatabgleich_web_pdf_webp_thumbnail: offen
verbleibende_befunde:
entscheid_geltungsbereich:
institutionelle_kennzeichnung: nicht bestätigt
oeffentliche_publikation: nicht bestätigt
```

Eine technische PDF/UA-Entscheidung genehmigt nicht automatisch institutionelle Kennzeichnung oder Veröffentlichung. PR #618 bleibt während dieser Vorbereitung Draft und ungemergt. Website-Dateien, PDFs, WebP, Thumbnails und die private lokale Datei `handoutVisualizations 2.ts` werden durch diese Dokumentation nicht verändert.
