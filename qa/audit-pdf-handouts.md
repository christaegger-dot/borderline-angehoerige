# Audit: PDF-Handouts

## Meta

- Repo: `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
- Branch: `codex/audit-pdf-handouts`
- Fokus: PDF-Handouts inhaltlich, layoutbezogen und funktional einordnen
- Methode:
  - technische Textlayer-Prüfung mit `pypdf`
  - visuelle Stichprobe über die 6 priorisierten Core-Handouts
  - Vergleich mit den 2 lokalen Notfall-PDFs
- Reproduzierbar über: [`qa/scripts/scan-pdf-handouts.py`](./scripts/scan-pdf-handouts.py)
  - für den Lauf ist eine Python-Umgebung mit `pypdf` nötig

## Kurzfazit

- Die beiden lokalen Notfall-PDFs sind technisch in deutlich besserem Zustand:
  - `Notfallkarte-Zuerich-Psychische-Krise.pdf`: 1 Seite, `2633` extrahierbare Zeichen
  - `notfallplan-krise-v03.pdf`: 2 Seiten, `4577` extrahierbare Zeichen
- Die eigentliche Handout-Bibliothek hat dagegen ein systemisches A11y-Problem:
  - `39` von `39` Remote-PDFs von `files.manuscdn.com` liefern `0` extrahierbare Zeichen
  - damit sind sie für Screenreader, Copy/Paste, Browser-Suche und Suchindex praktisch blind
- Der bereits gemergte Proxy-Fix löst die Zustellung sauber, aber nicht die Zugänglichkeit des Inhalts.

## Inventar

| Bereich                            | Anzahl | Textlayer-Status       | Bemerkung                        |
| ---------------------------------- | -----: | ---------------------- | -------------------------------- |
| Lokale PDFs im Repo                |      2 | vorhanden              | Notfall-PDFs bereits textbasiert |
| Remote-PDFs (`files.manuscdn.com`) |     39 | `39/39` ohne Textlayer | systemisches Problem             |
| Priorisierte Core-Remote-Handouts  |      6 | `6/6` ohne Textlayer   | höchste Umsetzungspriorität      |

## Priorisierte Core-Handouts

| ID                    | Titel                                                   | Kategorie      | Seiten | Grösse | Text extrahierbar | Einordnung                                      |
| --------------------- | ------------------------------------------------------- | -------------- | -----: | -----: | ----------------: | ----------------------------------------------- |
| `leuchtturm`          | Der Leuchtturm – Ihre Rolle als Angehörige/r            | verstehen      |      1 | 1.0 MB |                 0 | Core-Psychoedukation, zentrale Angehörigenrolle |
| `eisberg`             | Der Eisberg – Wut ist oft die Spitze                    | verstehen      |      1 | 5.0 MB |                 0 | zentrale Emotions- und Konflikteinordnung       |
| `rolle-klaeren`       | Ihre Rolle klären – Was Sie sein können (und was nicht) | unterstützen   |      1 | 6.0 MB |                 0 | wichtig für Grenz- und Rollenklärung            |
| `krisenkommunikation` | Spickzettel Krisenkommunikation (A4)                    | kommunizieren  |      1 | 5.6 MB |                 0 | akute Formulierungshilfe, hoch praxisrelevant   |
| `grenzen-spickzettel` | Spickzettel Grenzen – Die wichtigsten Sätze             | grenzen        |      1 | 5.2 MB |                 0 | konkrete Satzbausteine, hoher Copy/Paste-Bedarf |
| `warnsignale`         | Warnsignale der Überlastung                             | selbstfürsorge |      1 | 5.2 MB |                 0 | stark alltagsbezogen, wichtig für Selbstschutz  |

## Inhaltliche und visuelle Beobachtungen

Die 6 Core-Handouts wirken gestalterisch konsistent und sorgfältig aufgebaut:

- einheitliches A4-Hochformat mit klarer Titelzone, Farbcodierung und Footer
- starke visuelle Metaphern wie Leuchtturm, Eisberg oder Warnsignale
- strukturierte Infoboxen, Legenden und 3- bis 5-Schritte-Logik
- hohe Praxisnähe: Formulierungshilfen, Einordnungshilfen, Krisen- und Rollenklärung

Gerade diese Stärken verschärfen aber das A11y-Problem:

- der fachliche Nutzen steckt sichtbar in Textblöcken, Kästen und Schrittlisten
- Nutzerinnen und Nutzer können diese Inhalte weder zuverlässig vorlesen lassen noch markieren, durchsuchen oder übernehmen
- besonders die beiden Spickzettel sind funktional darauf angelegt, einzelne Sätze nachzuschlagen oder zu kopieren, was im aktuellen PDF-Format technisch nicht gelingt

## Funktionale Auswirkungen

### Für Nutzerinnen und Nutzer

- Screenreader erhalten bei den Remote-Handouts keinen verwertbaren Inhalt.
- Browser-Suche innerhalb des PDFs funktioniert nicht.
- Copy/Paste einzelner Formulierungen funktioniert nicht.
- Mobile Nutzung bleibt mühsam, weil kleine Textflächen nur als Bild gezoomt werden können.

### Für die Website

- Die Suche kann den eigentlichen PDF-Inhalt nicht indexieren.
- Der Inhalt der Handouts ist im aktuellen Webauftritt nur über Titel und Kurzbeschreibung auffindbar.
- Der PDF-Proxy macht das Öffnen und Herunterladen konsistent, aber nicht barrierefrei.

## Vergleich zu den lokalen Notfall-PDFs

Die beiden lokalen Notfall-Dokumente sind der richtige technische Referenzpunkt:

- sie enthalten extrahierbaren Text
- sie sind damit deutlich besser für Screenreader, Suche und Weiterverarbeitung geeignet
- das Hauptproblem liegt also nicht bei PDF als Format an sich, sondern bei der Art, wie die 39 Remote-Handouts erzeugt wurden

## Priorisierung

### P1 – zuerst umsetzen

Für die 6 Core-Remote-Handouts sollte je ein zugängliches Text-Pendant entstehen.

Empfohlene Form:

1. eigene HTML-/Textversion pro Handout
2. PDF bleibt zusätzlich als Druck- und Downloadformat bestehen
3. von Materialkarten und Themen-Sections aus sowohl auf `PDF öffnen` als auch auf `Textversion` verlinken

### P2 – danach

- die restlichen `33` Remote-Handouts nach derselben Logik nachziehen
- erst die fachlich wichtigsten Übersichts- und Spickzettel, dann sekundäre Vertiefungsblätter

## Umsetzungsempfehlung

Die sinnvollste Reihenfolge ist:

1. die 6 Core-Handouts als HTML-/Textversionen nachbauen
2. dafür nicht OCR-Rohtext ungeprüft ausliefern, sondern redaktionell saubere Pendants erzeugen
3. PDFs weiterhin für Druck und Original-Layout behalten
4. Suchindex und Materialkarten später um die Textversionen erweitern

## Nächster konkreter Schritt

Ein kleines, sauberes Folgepaket wäre:

1. Inhaltsstruktur für die 6 Core-Handouts als textbasierte Datenmodelle erfassen
2. erste 1 bis 2 Handouts als Referenz-HTML umsetzen
3. CTA-Muster festlegen:
   - `Textversion lesen`
   - `PDF öffnen`
   - `PDF herunterladen`

## Grenze dieses Audits

- Die visuelle Inhaltsprüfung basiert auf den Vorschauen der 6 Core-Handouts.
- Es wurde bewusst keine automatisierte OCR als Quelltext-Ersatz in Produktcode übernommen.
- Für die eigentliche Umsetzung braucht es deshalb eine redaktionell saubere Übertragung der Inhalte in HTML oder strukturierte Daten.
