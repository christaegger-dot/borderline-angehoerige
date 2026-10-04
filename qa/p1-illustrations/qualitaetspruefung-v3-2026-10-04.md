# P1-Handouts V3: nachgelagerte Qualitäts- und Publikationsprüfung

Stand: 4. Oktober 2026. Erstellt durch Codex als technische Prüfvorbereitung; keine institutionelle Freigabe und keine Durchführung der unten noch offenen menschlichen Tests.

## Bezugsstand und bereits gesicherte Nachweise

- PR [#617](https://github.com/christaegger-dot/borderline-angehoerige/pull/617) wurde gemergt. Geprüfter Merge-Commit: `2ce8193fc5a61043b0b584c54793f0c20eae3be9`. Beim Abgleich entsprach GitHub-`main` genau diesem Commit.
- Der zugehörige [CI-Lauf 37193862447](https://github.com/christaegger-dot/borderline-angehoerige/actions/runs/37193862447) war abgeschlossen und erfolgreich.
- Die beim Merge enthaltenen drei PDFs, drei WebP-Vollbilder und drei Thumbnails stimmten mit dem damaligen Manifest überein. Der technische PDF-Nachexport in PR #618 besitzt neue, im aktuellen Manifest und Objektinventar dokumentierte Hashes; sichtbarer und redaktioneller Wortlaut sowie die WebP-Darstellungen blieben unverändert. Die redaktionelle V3-Beurteilung im [Freigabeprotokoll](../../docs/governance/fachliche-freigabe-p1-illustrationen-2026-10-04.md) bleibt bestehen.
- Erfolgreiches Netlify-Hauptdeployment, `401` ohne Anmeldung auf beiden Netlify-Adressen, gelöschter Remote-Arbeitsbranch und lokaler Gleichstand sind Angaben der Auftraggeberin. Sie wurden bei dieser Nachprüfung nicht nochmals unabhängig getestet.
- Die lokale ungetrackte Datei `handoutVisualizations 2.ts` war nicht Gegenstand dieser Arbeit, blieb unverändert und ist im GitHub-Baum nicht enthalten.

Der Merge betrifft die geschützte Entwicklung. Die folgenden offenen Prüfungen werden dadurch weder als erledigt behandelt noch rückwirkend zu einem Merge-Hindernis. Institutionelle Kennzeichen und eine öffentliche Publikation benötigen weiterhin den dafür verantworteten Entscheid.

## Technische PDF-Korrektur und automatisierte PDF/UA-1-Prüfung

Nachweis: [Objektinventar und Prüfsummen](pdf-preflight-v3-2026-10-04.json), erstellt mit pypdf 6.10.0. Reproduzierbare, nur lesende Prüfung: [pdf-preflight-v3.py](pdf-preflight-v3.py).

```bash
python3 -m venv /tmp/p1-pdf-venv
P1_PDF_PYTHON_PATH=/tmp/p1-pdf-venv/bin/python3
"$P1_PDF_PYTHON_PATH" -m pip install -r qa/p1-illustrations/requirements.txt
"$P1_PDF_PYTHON_PATH" qa/p1-illustrations/pdf-preflight-v3.py --repo-root . \
  > /tmp/p1-preflight.json
```

Ein späterer Export ist ein neuer Prüfgegenstand. Das Inventarskript prüft Objekte, Hashes und Strukturmerkmale; es ist kein Konformitätsvalidator.

| Merkmal                             | Radikale Akzeptanz                   | Wenn Gespräche kippen         | Beispiel-Dialog            |
| ----------------------------------- | ------------------------------------ | ----------------------------- | -------------------------- |
| PDF-Version im Header               | 1.7                                  | 1.7                           | 1.7                        |
| Seiten / Format                     | 1 / A4 hoch, gerundet                | 1 / A4 hoch, gerundet         | 1 / A4 hoch, gerundet      |
| Dokumenttitel / Sprache             | vorhanden / de-CH                    | vorhanden / de-CH             | vorhanden / de-CH          |
| Tag-Baum / Marked / DisplayDocTitle | vorhanden / true / true              | vorhanden / true / true       | vorhanden / true / true    |
| XMP `/Metadata` / `/XML`            | vorhanden                            | vorhanden                     | vorhanden                  |
| Listenstruktur                      | `Lbl`/`LBody`; Square/Square/Decimal | `Lbl`/`LBody`; Decimal/Square | `Lbl`/`LBody`; Decimal     |
| Ungültiger `Aside`-Tag              | keiner                               | keiner                        | keiner                     |
| PDF/UA-Identifier im Repository-PDF | bewusst noch nicht gesetzt           | bewusst noch nicht gesetzt    | bewusst noch nicht gesetzt |

Die zunächst dokumentierten Befunde sind korrigiert: Alle drei PDFs besitzen synchronisierte XMP-Metadaten, und der nicht standardmässige `Aside`-Tag wurde quellenbasiert entfernt. Eine vollständige veraPDF-Prüfung zeigte zusätzlich unmarkierte Zeichenoperationen sowie ungültige `LI`-Kinder. Der reproduzierbare Exportprozess bereitet deshalb nun auch Listen als `Lbl`/`LBody` mit `ListNumbering` auf und ordnet nur quellenspezifisch bekannte Vektorgruppen nach einer fail-closed Operator-Prüfung als Layout-Artefakt ein. Ob diese Gruppen semantisch tatsächlich dekorativ sind, bleibt ein manueller Matterhorn-Prüfpunkt. Exakte logische und layoutbezogene Textparität sowie Rasterparität zwischen Chromium-Rohdatei und nachbearbeitetem PDF sind Pflichtprüfungen des Generators.

Der PDF/UA-Identifier bleibt in den eingecheckten und von der Website ausgelieferten PDFs bewusst aus. Er wäre eine Konformitätsdeklaration, obwohl die manuelle Matterhorn-, Screenreader- und Lesereihenfolgeprüfung noch offen ist. Beim erzwungenen veraPDF-Profil `ua1` haben die Repository-PDFs deshalb je genau einen erwarteten Fehler: ISO 14289-1, Abschnitt 5-1, fehlende PDF/UA-Identifikation. Die früheren XMP-, `Aside`-, Listen- und Artefaktfehler treten nicht mehr auf.

Für die automatisierte Prüfung erzeugt [validate-pdfua-candidates.py](validate-pdfua-candidates.py) Kopien, verarbeitet deren Metadaten mit demselben Postprozessor und ergänzt nur in diesen Prüfkandidaten `pdfuaid:part=1`. Ohne `--candidate-dir` werden sie nach qpdf-, Paritäts- und veraPDF-Prüfung verworfen. Der [maschinenlesbare Bericht](verapdf-ua1-candidates-v3-2026-10-04.json) belegt mit veraPDF 1.30.0 und erzwungenem Profil `ua1` für alle drei temporären Kandidaten: **106 bestandene Regeln, 0 fehlgeschlagene Regeln und 0 fehlgeschlagene Checks**. Die Kandidaten wurden nicht publiziert und nicht als Repository-Artefakte behalten.

```bash
"$P1_PDF_PYTHON_PATH" qa/p1-illustrations/validate-pdfua-candidates.py --repo-root . \
  > /tmp/p1-verapdf-candidates.json
```

Das ist ein vollständiger Lauf der maschinenprüfbaren veraPDF-Regeln, aber **keine vollständige PDF/UA- oder Matterhorn-Freigabe**. Tagsemantik, tatsächliche Lesereihenfolge, Verständlichkeit mit assistiver Technik und alle manuellen Matterhorn-Punkte müssen an dauerhaft gespeicherten, bereits identifiertragenden Kandidaten mit exakt dokumentiertem Hash geprüft werden. Nach bestandener Prüfung ist genau derselbe Kandidat zu übernehmen; der Identifier darf nicht erst nachträglich in eine bereits geprüfte andere Datei geschrieben werden.

Quellen für die technische Einordnung:

- PDF Association: [Matterhorn Protocol 1.1](https://pdfa.org/download-area/publications/Matterhorn-Protocol-1-1.pdf), insbesondere 02, 06, 09 und 31.
- PDF Association: [Standard Structure Elements](https://pdfa.org/download-area/cheat-sheets/StandardStructureElements.pdf), Zuordnung von Aside und Standardtypen für PDF 1.7/2.0.
- PDF Association: [Tagged PDF Best Practice Guide: Syntax](https://pdfa.org/download-area/publications/Tagged-PDF-Best-Practice-Guide.pdf), Abschnitt 4.2.5 zu Listen.
- W3C: [PDF3 – Ensuring correct tab and reading order](https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF3.html), tatsächliche Reihenfolge mit assistiver Technik prüfen.

## Arbeitsstand und Zuständigkeit

| Arbeitspaket                                          | Aktueller Stand                                              | Benötigte Durchführung / Nachweis                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Redaktionelle V3-Prüfung                              | bereits dokumentiert                                         | bestehendes Freigabeprotokoll; keine neue institutionelle Freigabe hier             |
| PDF-Objektinventar                                    | aktualisiert; technische Befunde korrigiert                  | JSON und reproduzierbares Skript oben                                               |
| Automatisierte veraPDF-PDF/UA-1-Prüfung               | temporäre Kandidaten bestanden; 0 Fehlchecks                 | Bericht und reproduzierbares Kandidatenskript oben                                  |
| Manuelle PDF-UA-1-/Matterhorn-Prüfung                 | offen; kein PDF/UA-Identifier in den auszuliefernden Dateien | PDF-Fachperson, dauerhaft gespeicherter Kandidat mit Hash und manueller Prüfbericht |
| Reale Screenreader-Prüfung V3                         | nicht durchgeführt                                           | Person mit tatsächlicher Sprachausgabe und eigener Bedienung, Testmatrix unten      |
| Verständlichkeit mit Angehörigen                      | nicht durchgeführt                                           | moderierter freiwilliger Test, anonymisierte Beobachtungen                          |
| Physischer Druck                                      | nicht durchgeführt                                           | reale Ausdrucke, Druckparameter, Sichtprüfung                                       |
| Institutioneller / öffentlicher Publikationsentscheid | offen                                                        | benannte zuständige Person und dokumentierter Geltungsbereich                       |

Der vorhandene [VoiceOver-Nachweis](screenreader-voiceover-safari-2026-10-04.json) bezieht sich auf `5f1116db214177b6139c17794cf3a4c869b6bf31` und schliesst die menschliche akustische Bestätigung ausdrücklich aus. Er ersetzt keinen realen Test der aktuellen V3. Die menschlichen Prüfungen benötigen echte Geräte, Personen beziehungsweise einen Drucker und konnten in dieser Sitzung nicht durchgeführt werden.

## Durchführung ab Commit 9ea47922

Die [Durchführungsmappe für die manuellen V3-Prüfungen](manuelle-pruefung-v3-9ea47922.md) enthält verifizierte PDF-Dateilinks und Hashes, das Register aller 47 menschlich zu beurteilenden Matterhorn-Einträge pro Blatt, konkrete Screenreader-Aufgaben sowie die Nutzenden- und Druckplanung. Der [ergänzende Strukturnachweis](pdf-strukturreview-v3-9ea47922.json) ist eine Vorprüfung, kein realer Screenreader-Test. Der aktuelle Live-Browserdurchgang wurde durch die automatische Sicherheitsprüfung am Netlify-Zugang blockiert.

## Gemeinsames Protokoll pro Testlauf

Diese Vorlage kopieren. Statuswerte: `nicht durchgeführt`, `bestanden`, `Korrektur erforderlich`, `nicht anwendbar mit Begründung`. Ein leerer Eintrag bedeutet keine Freigabe.

```yaml
Prüfende Person / Rolle:
Datum:
Test-ID / Blatt:
Commit und geprüfte URL oder Dateipfad:
PDF-SHA256 (bei PDF-Prüfung):
Gerät / Betriebssystem / Version:
Browser oder PDF-Reader / Version:
Screenreader / Version (falls verwendet):
Drucker / Papier / Einstellungen (falls verwendet):
Aufgabe:
Erwartetes Ergebnis:
Tatsächliche Beobachtung:
Status: nicht durchgeführt
Beleg (ohne personenbezogene Gesundheitsdaten):
Korrektur / zuständige Person:
Nachprüfung am Commit / Hash:
```

## Reale Screenreader-Prüfung

Geplante Mindestabdeckung für dieses Paket: die drei Seiten jeweils mit VoiceOver/Safari auf macOS und NVDA/Firefox auf Windows; die drei PDFs zusätzlich mit einem tatsächlich verwendeten PDF-Reader und Screenreader (beispielsweise Acrobat Reader/NVDA). Geräte, Versionen und Abweichungen dokumentieren. Diese Auswahl ist ein Testplan und keine Behauptung allgemeiner Kompatibilität.

Für den noch ungemergten PR #618 die geschützte Deploy-Preview mit berechtigtem Zugang verwenden; die Hauptwebsite enthält vor dem Merge einen anderen PDF-Stand. Je Lauf die tatsächliche Basis-URL und den dazugehörigen Deployment-Commit festhalten; keine Zugangsdaten ins Protokoll aufnehmen.

| Blatt                 | Pfad ab Basis-URL                      | VoiceOver/Safari   | NVDA/Firefox       | PDF mit Screenreader |
| --------------------- | -------------------------------------- | ------------------ | ------------------ | -------------------- |
| Radikale Akzeptanz    | `/materialien/text/radikale-akzeptanz` | nicht durchgeführt | nicht durchgeführt | nicht durchgeführt   |
| Wenn Gespräche kippen | `/materialien/text/gespraeche-kippen`  | nicht durchgeführt | nicht durchgeführt | nicht durchgeführt   |
| Beispiel-Dialog       | `/materialien/text/beispiel-dialog`    | nicht durchgeführt | nicht durchgeführt | nicht durchgeführt   |

Pro Blatt und Web-Kombination:

1. **SR-W1 Einstieg:** Seite mit Tastatur öffnen; Seitentitel, Hauptinhalt und Überschriften ansagen lassen. Orientierung und sinnvoll geordnete Überschriften müssen ohne visuelle Hilfe möglich sein.
2. **SR-W2 Textbeschreibung:** Aufklappelement finden, Zustand vorlesen lassen, öffnen und schliessen. Name und Zustand müssen verständlich sein, Fokus muss nachvollziehbar bleiben. Geöffneten Inhalt vollständig anhören; bei geschlossenem Element darf versteckter Text nicht als sichtbarer Inhalt weitergelesen werden.
3. **SR-W3 Inhalt:** Durchgehend lesen und nach Überschriften navigieren. Nummern, Optionen und Beispielsätze müssen zusammenbleiben. Die Abgrenzung «Akzeptanz ist nicht», die freiwilligen Gesprächsmöglichkeiten, der erlaubte Gesprächsabbruch und die unterschiedlichen Sicherheitshinweise müssen vollständig und in sinnvoller Reihenfolge ankommen. Wiederholungen durch Bildalternative und Textbeschreibung als konkrete Beobachtung festhalten.
4. **SR-W4 PDF-Zugang:** Beide PDF-Links pro Seite ohne Maus auffinden und anhand ihrer Ansage unterscheiden, öffnen beziehungsweise herunterladen und zur Seite zurückkehren. Linkzweck, Datei und Fokusführung müssen nachvollziehbar sein; Download zusätzlich im Downloadbereich kontrollieren.

Pro heruntergeladenem Original-PDF:

1. **SR-P1 Orientierung:** Dokumenttitel, Sprache und Überschriftennavigation prüfen.
2. **SR-P2 Vollständiges Hören:** Gesamte Seite lesen; Spalten, Merkkästen, Beispiele, Listen und Sicherheitshinweise mit dem sichtbaren Inhalt abgleichen. Keine Auslassungen, Vermischungen oder unverständlichen Wiederholungen.
3. **SR-P3 Bedienung:** Listen- und sonstige vorhandene Navigation ausprobieren; vorhandene Links per Tastatur bedienen. Falls keine interaktiven Elemente vorhanden sind, diesen Teil begründet als nicht anwendbar markieren. Insbesondere die oben genannten Listenstrukturen prüfen.

## Verständlichkeit und Entlastung mit Angehörigen

Als ersten qualitativen Durchlauf drei bis fünf freiwillige Personen mit unterschiedlichen Lesegewohnheiten einplanen; dies ist eine pragmatische Planungsgrösse, kein Repräsentativitätsnachweis. Test abbrechen oder einzelne Aufgaben auslassen ist jederzeit möglich. Neutrale fiktive Alltagssituationen verwenden; persönliche Krisenerlebnisse müssen nicht berichtet werden. Etwa 20–30 Minuten pro Person vorsehen und bei Belastung verkürzen.

Zuerst selbstständig lesen lassen, erst danach erklären. Beobachten, welche Stellen gesucht, missverstanden oder als belastend erlebt werden. Webdarstellung, aufklappbare Beschreibung und PDF einbeziehen; Vollbild und Thumbnail auf erkennbare Zuordnung zum richtigen Blatt prüfen.

| ID  | Neutrale Aufgabe / Frage                                                                                                    | Worauf bei der Auswertung achten                                                                                                              |
| --- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| U1  | «Was bedeutet Akzeptanz hier in Ihren eigenen Worten? Was bedeutet sie nicht?»                                              | Anerkennen der Gegenwart wird von Gutheissen, Aufgeben und einer Festlegung der Zukunft unterschieden.                                        |
| U2  | «Welche Möglichkeiten haben Sie, wenn Ihnen das Gespräch zu viel wird?»                                                     | Auswahl und Abbruch werden erkannt; keine Pflichtfolge und keine Pflicht zur späteren Wiederaufnahme.                                         |
| U3  | «Was nehmen Sie aus dem Blatt darüber mit, wofür Angehörige verantwortlich sind?»                                           | Keine Schuldzuweisung, Erfolgsgarantie oder alleinige Verantwortung für die andere Person.                                                    |
| U4  | «Wo würden Sie im Blatt nach Hilfe für Bedrohung oder Gewalt suchen? Und wo bei vermuteter unmittelbarer Selbstgefährdung?» | Die beiden Situationen und Hinweise werden auseinandergehalten; keine Pflicht, sich selbst zu gefährden oder das Risiko allein zu beurteilen. |
| U5  | «Welcher Beispielsatz wäre für Sie brauchbar? Wie würden Sie ihn selbst sagen?»                                             | Sätze wirken alltagstauglich; eigene Formulierungen und das Nichtverwenden eines Satzes sind möglich.                                         |
| U6  | «Finden Sie die ausführliche Beschreibung und die passende Datei zum Mitnehmen.»                                            | Auffindbarkeit, verständliche Linktexte und korrekte Zuordnung von Web/PDF/WebP/Thumbnail.                                                    |

Missverständnisse als Beobachtung dokumentieren, nicht als Fehler der Person bewerten. Bei wiederholt gleicher Fehlinterpretation oder einer sicherheitsrelevanten Fehlinterpretation Inhalt/Präsentation mit der zuständigen Fachperson überprüfen und die betroffene Variante erneut testen. Im Repository nur anonymisierte Ergebnisse und keine Gesundheitsdaten oder unfreigegebenen Aufnahmen speichern.

## PDF-UA/Matterhorn durch eine zuständige PDF-Fachperson

1. Mit `"$P1_PDF_PYTHON_PATH" qa/p1-illustrations/validate-pdfua-candidates.py --repo-root . --candidate-dir /absoluter/prüfpfad` dauerhaft zu speichernde, identifiertragende Prüfkandidaten erzeugen. Diese Kandidaten vor Freigabe nicht in die ausgelieferten Repository- oder Website-Pfade kopieren.
2. Kandidatenhashes, veraPDF-Version und Profil dokumentieren. Den automatischen Nullfehler-Befund mit einem zweiten geeigneten Prüfwerkzeug gegenprüfen; automatisches Bestehen allein genügt nicht für die Gesamtfreigabe.
3. Alle anwendbaren manuellen Matterhorn-Punkte beurteilen, unter anderem Tag-Semantik und Lesereihenfolge, Überschriften und Listen, sinnvolle Alternativtexte, dekorative Artefakte, Sprache, Zeichenwiedergabe, Farbe/Kontrast sowie vorhandene Verknüpfungen.
4. Menschliche Screenreader-Ergebnisse mit exakt denselben Kandidatenhashes abgleichen. Nach jeder PDF-Korrektur die automatisierten und menschlichen Prüfungen wiederholen.
5. Erst nach bestandener manueller Prüfung genau die geprüften, mit `pdfuaid:part=1` gekennzeichneten Dateien übernehmen, Manifest und Bericht aktualisieren und Web, PDF, WebP sowie Thumbnail nochmals auf Inhaltsgleichheit prüfen. Technische Konformität setzt keine institutionelle oder öffentliche Publikationsfreigabe.

Der kanonische Generator und Audit bleiben bis zu diesem verantworteten Entscheid absichtlich im Modus `pdfUaClaim: false`. Die spätere Promotion der exakt geprüften Kandidaten erfordert deshalb einen eigenen, dokumentierten Release-Schritt, der Generator, Manifest und Audit gemeinsam auf den freigegebenen Stand umstellt.

## Reale Druckprüfung

Für alle drei Original-PDFs je einen physischen A4-Ausdruck im Hochformat bei 100 % anfertigen; verwendeten Reader, Drucker, Papier, Farbe/Graustufen und Skalierung notieren. Zusätzlich die Browser-Druckfunktion der drei Seiten in einem tatsächlich genutzten Browser prüfen und auf Papier ausgeben. Die bereits dokumentierte Browser-Druckansicht ersetzt diese reale Prüfung nicht.

- **D1 PDF:** genau eine vollständige A4-Seite; keine abgeschnittenen Ränder, fehlenden Zeichen oder unlesbaren Fusszeilen; Titel, Beispiele und Sicherheitstexte vorhanden.
- **D2 Lesbarkeit:** Fliesstext bei normalem Leseabstand beurteilen; blasse Linien und farbige Kästen zusätzlich in Graustufen prüfen. Probleme nicht durch unprotokolliertes Vergrössern kaschieren.
- **D3 Webdruck:** gesamter beabsichtigter Inhalt einschliesslich Textbeschreibung und Sicherheitshinweisen vorhanden; Navigation und Bedienelemente stören nicht. Die Webdruckfassung darf mehr als eine Seite umfassen, sofern Inhalt und Lesereihenfolge stimmen. Zustand des Aufklappelements und Druckeinstellungen festhalten.
- **D4 Abgleich:** tatsächlichen Ausdruck mit dem zugehörigen Web/PDF/WebP/Thumbnail-Paket abgleichen; bei Ausschnitten oder Umbrüchen Problemstelle als Foto ohne personenbezogene Daten belegen.

## Abschluss nach den realen Prüfungen

```yaml
Geprüftes Paket / Commit / Manifest:
Screenreader Web und PDF: offen
Nutzendentest: offen
Automatisierte veraPDF-Prüfung: temporäre PDF/UA-1-Kandidaten bestanden (0 Fehlchecks)
Manuelle PDF-UA/Matterhorn-Prüfung: offen
Realer Druck: offen
Gemeinsamer Abgleich Web / PDF / WebP / Thumbnail: nach Änderungen erneut erforderlich
Verbleibende Befunde und Umgang damit:
Verantwortliche Person / Rolle:
Entscheiddatum:
Entscheid und Geltungsbereich:
Institutionelle Kennzeichnung ausdrücklich bestätigt: nein
Öffentliche Publikation ausdrücklich bestätigt: nein
```

Die letzten beiden Einträge dürfen erst anhand einer ausdrücklichen Bestätigung der zuständigen Person geändert werden. Dieser Prüfplan selbst setzt keine Freigabekennzeichen und erteilt keine Publikationsfreigabe.
