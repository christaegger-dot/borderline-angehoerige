# P1-Illustrationspaket · Nachbearbeitung des redaktionellen Reviews

## Einordnung

Die am 04.10.2026 übermittelte Rückmeldung ist ein KI-gestütztes
redaktionelles Review mit fachlicher Plausibilitätsprüfung. Sie ist **keine
institutionelle Fachfreigabe**. Der Gesamtentscheid lautet «Korrekturen
erforderlich; erneut vorlegen».

Die berechtigten Hinweise wurden in den gemeinsam aus einer Inhaltsquelle
erzeugten Web-, PDF-, WebP- und Thumbnail-Fassungen der Version 2 umgesetzt.
Der Status bleibt «Entwurf – fachlich-redaktionelle Freigabe ausstehend».

## Übernommene Korrekturen

### Radikale Akzeptanz

- neutraler Materialtitel ohne impliziten Vorwurf;
- gegenwärtige Tatsachen klar von einer unveränderbaren Zukunft getrennt;
- Übung ausdrücklich als freiwilliges Angebot bezeichnet;
- Gefühle, Grenzen, Unterstützung und Einsatz für Veränderung sichtbar
  gemacht;
- Schritt «Loslassen» durch ein vorsichtigeres «Anerkennen» ersetzt;
- Entscheiden, Beeinflussen, Unterstützung und nicht alleinige Verantwortung
  unterschieden;
- Beispiel ohne akute Gefährdung ergänzt;
- layoutabhängige Formulierung «rechte Spalte» entfernt;
- Vier-Schritte-Folge als vereinfachte eigene Übung in Anlehnung an die DBT
  nach Linehan bezeichnet.

### Wenn Gespräche kippen

- Merkhilfe in «Sie entscheiden, welche Schritte gerade passen» umbenannt;
- Gewalt oder Bedrohung von vermuteter unmittelbarer Selbstgefährdung
  unterschieden;
- Eigenschutz, professionelle Hilfe und die Grenze eigenständiger
  Risikobeurteilung ergänzt;
- 117 und 144 aus `client/src/data/kontakte.ts` bezogen.

### Beispiel-Dialog

- vorhandene Wahlfreiheit, fehlende Wirkungsgarantie, fehlende
  Rückkehrpflicht und alltagstaugliche Grenzsätze beibehalten;
- Sicherheitsabgrenzung wie beim Gesprächsblatt präzisiert;
- 117 und 144 aus `client/src/data/kontakte.ts` bezogen.

## Aufklärung des vermeintlich fehlenden PDF-Inhalts

Der Hinweis, bei «Wenn Gespräche kippen» fehlten die drei Schritte und beim
«Beispiel-Dialog» der Dialog, liess sich für die eigentlichen P1-Handout-PDFs
nicht reproduzieren. Die geprüften neun Seiten waren Browser-Drucke der drei
Web-Textseiten (fünf, zwei und zwei Seiten), nicht die separaten einseitigen
Handout-PDFs.

Die damaligen `v1`-Handout-PDFs enthielten nachweislich bereits:

- bei «Wenn Gespräche kippen» alle drei Schritte, Pausenregelung und
  Sicherheitsblock;
- beim «Beispiel-Dialog» den Ausgangssatz, alle fünf Dialogbewegungen,
  Wahlfreiheit und Sicherheitsblock.

Die Verwechslung hat dennoch einen echten Druckfehler sichtbar gemacht: Eine
globale CSS-Regel blendete im Browser-Druck jedes HTML-`header` aus. Weil die
semantische Darstellung innerhalb des Seitenkopfs lag, verschwand sie im
Browser-Druck. Die Druckregel ist nun auf ausdrücklich mit
`nav`-Elemente und ausdrücklich mit `data-print-hidden` markierte
Seitenelemente begrenzt. Semantische Inhalts-`header` bleiben sichtbar; der
P1-Webaudit prüft die Darstellung und ausgeblendete Navigation zusätzlich im
Druckmodus.

## Sicherheitsquellen

Die Zuordnung entspricht dem kanonischen Kontaktregister der Website und den
offiziellen Zürcher Hinweisen:

- 117 bei Gewalt, akuter Bedrohung oder wenn sofort Schutz vor Ort nötig ist;
- 144 bei akuter Lebensgefahr oder unmittelbar vermuteter Selbstgefährdung;
- bei der Person bleiben nur, soweit dies ohne Eigengefährdung möglich ist;
- Angehörige müssen das Risiko nicht allein beurteilen oder bewältigen.

Offizielle Referenzen:

- Kanton Zürich, Notfall & Rettung:
  <https://www.zh.ch/de/gesundheit/notfall-rettung.html>
- Kanton Zürich, Häusliche Gewalt:
  <https://www.zh.ch/de/sicherheit-justiz/delikte-praevention/gewalt-extremismus/haeusliche-gewalt.html>

## Weiterhin offen

- fachredaktionelle Prüfung und dokumentierter Einzelentscheid für alle drei
  `v2`-Blätter;
- verantwortete Matterhorn-/PDF-Barrierefreiheitsprüfung;
- erneuter realer Screenreader-Durchgang nach den Inhaltsänderungen;
- NVDA/Windows und Tests mit Angehörigen.

Automatisierte Tests und dieses Protokoll sind kein Freigabenachweis.
