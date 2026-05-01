# Audit: PDF-Handouts

## Meta

- Repo: `/Users/christaegger/Downloads/borderline-angehoerige`
- Stand: `1. Mai 2026`
- Fokus: PDF- und Download-Audit fuer Materialien, Handouts und Textversionen
- Methode:
  - technische Textlayer-Pruefung mit `pypdf`
  - Inventarabgleich gegen `materialien.ts`, `handouts.ts`,
    `handoutTextMetas.ts` und `handoutTextVersions.ts`
  - Live-Checks gegen Production fuer Proxy- und Direkt-PDFs
  - Format- und Metadaten-Spotcheck ueber die reale Materialbibliothek
- Reproduzierbar ueber:
  - [`qa/scripts/scan-pdf-handouts.py`](./scripts/scan-pdf-handouts.py)
  - gebuendelte Python-Runtime mit `pypdf`

## Kurzfazit

- Die Download-Pfade sind technisch weitgehend sauber:
  - Proxy-IDs loesen korrekt auf
  - gepruefte Live-URLs liefern `200`
  - Remote-PDFs unterscheiden korrekt zwischen `inline` und `attachment`
- Die Textversions-Abdeckung ist stark:
  - `15/16` Materialeintraege haben eine Textversion
  - die einzige Ausnahme ist `notfallkarte-zuerich`, die bewusst HTML-first ist
    und deren PDF selbst textdurchsuchbar ist
- Das eigentliche PDF-Qualitaetsgate ist aber noch nicht gruen:
  - `39/40` textversionsgestuetzte Handout-PDFs haben keinen extrahierbaren
    Text
  - `5/15` Material-PDFs sind nicht A4-nah
  - `14/15` Material-PDFs haben kein PDF-`Title`-Metadatum

## Audit-Urteil

Das Audit ist **noch offen**.

Der offene Teil betrifft nicht kaputte Downloads oder fehlende Dateien,
sondern drei systemische Qualitaetsluecken:

1. PDF-A11y und Textlayer
2. uneinheitliche Print-/A4-Formate
3. duenne oder fehlende PDF-Metadaten

## Scope und Inventar

### Textversionsgestuetzte Handouts

Aus [`handoutTextMetas.ts`](../client/src/content/handoutTextMetas.ts) wurden
alle `40` PDF-Quellen der textbasierten Handout-Pendants geprueft.

| Bereich                                  | Anzahl | Mit Textlayer | Ohne Textlayer |
| ---------------------------------------- | -----: | ------------: | -------------: |
| Remote-PDFs (`files.manuscdn.com`)       |     29 |             0 |             29 |
| Lokale PDFs innerhalb der 40 Handout-IDs |     11 |             1 |             10 |
| Gesamt                                   |     40 |             1 |             39 |

Einziger positive Ausreisser:

- `notfallplan-krise-v03.pdf`: `4577` extrahierbare Zeichen

### Materialbibliothek

Aus [`materialien.ts`](../client/src/content/materialien.ts) ergeben sich:

| Bereich                            | Anzahl | Bemerkung                                    |
| ---------------------------------- | -----: | -------------------------------------------- |
| Materialeintraege gesamt           |     16 | Bibliothek inklusive HTML-first Notfallkarte |
| PDF-basierte Materialeintraege     |     15 | fuer Format- und Metadaten-Check ausgewertet |
| Materialeintraege mit Textversion  |     15 | starke Abdeckung                             |
| Materialeintraege ohne Textversion |      1 | `notfallkarte-zuerich`, bewusst HTML-first   |

## Wichtigste Befunde

### 1. Textlayer bleibt das groesste Problem

Die Textversionen kompensieren aktuell ein breites PDF-A11y-Defizit, nicht nur
bei Remote-Handouts, sondern auch bei vielen lokalen Infografik-PDFs.

Beispiele mit `0` extrahierbaren Zeichen:

- Remote:
  - `leuchtturm`
  - `grenzen-spickzettel`
  - `warnsignale`
  - `dear`
  - `genesung-zahlen`
  - `kinder`
- Lokal:
  - `eisberg`
  - `rolle-klaeren`
  - `krisenkommunikation`
  - `spaltung`
  - `alarm-modus`
  - `sauerstoffmaske`
  - `zuhoeren-ohne-zustimmen`

Das bedeutet praktisch:

- Screenreader erhalten in den meisten PDFs keinen nutzbaren Inhalt
- Copy/Paste und PDF-Suche funktionieren nicht
- Browser-Suche innerhalb der Dateien greift nicht
- die PDFs taugen als Layout-Asset, aber nicht als barrierearme Textquelle

### 2. A4-/Print-Konsistenz ist nur teilweise gegeben

Von `15` geprueften Material-PDFs sind `10` A4-nah und `5` klar ausserhalb des
erwarteten A4-Rahmens.

Nicht A4-nah:

| ID                    | Format erster Seite |
| --------------------- | ------------------: |
| `eisberg`             |  `457.2 x 651.9 mm` |
| `rolle-klaeren`       |  `244.5 x 345.8 mm` |
| `krisenkommunikation` |  `656.2 x 928.2 mm` |
| `spaltung`            |  `656.2 x 928.2 mm` |
| `alarm-modus`         |  `656.2 x 928.2 mm` |

Wenn die Materialbibliothek mit `PDF oeffnen` und `PDF herunterladen` als
drucktaugliche Hilfen auftritt, ist diese Inkonsistenz ein echter
Qualitaetsbefund.

### 3. PDF-Metadaten sind fast nirgends gepflegt

Bei `14/15` Material-PDFs fehlt ein `Title`-Metadatum.

Positiv auffaellig:

- `Notfallkarte-Zuerich-Psychische-Krise.pdf`
- `notfallplan-krise-v03.pdf`

Das erschwert saubere Anzeige in PDF-Readern und ist fuer langlebige Downloads
eine unnötige Qualitaetsluecke.

### 4. Download-Semantik ist technisch gemischt

Remote-PDFs laufen ueber den Proxy aus
[`server/material-download.ts`](../server/material-download.ts) und liefern
korrekt:

- `Content-Type: application/pdf`
- `Content-Disposition: inline`
- `Content-Disposition: attachment`

Lokale PDFs liefern live ebenfalls `200` und `application/pdf`, aber kein
eigenes `Content-Disposition`. Dort haengt die Unterscheidung zwischen
`Oeffnen` und `Herunterladen` am Frontend-`download`-Attribut statt an der
HTTP-Response.

Das ist nicht zwingend falsch, aber uneinheitlich.

## Was bereits gut ist

### Textversionen als Sicherheitsnetz

Die Web-Textversionen sind inzwischen ein echter repo-weiten Vorteil:

- `15/16` Materialien haben ein Text-Pendant
- das reduziert das Risiko fuer Suche, Mobilnutzung und A11y deutlich
- die einzige Ausnahme ist fachlich vertretbar, weil `notfallkarte-zuerich`
  bereits HTML-first ist

### Krisen-PDFs als Referenzstandard

Die beiden lokalen Krisen-PDFs zeigen, wie ein tragfaehiger Standard aussehen
kann:

| Datei                                       | Seiten | Format             | Titel-Metadatum | Text extrahierbar |
| ------------------------------------------- | -----: | ------------------ | --------------- | ----------------: |
| `Notfallkarte-Zuerich-Psychische-Krise.pdf` |      1 | `209.9 x 297.0 mm` | ja              |              2633 |
| `notfallplan-krise-v03.pdf`                 |      2 | `209.9 x 297.0 mm` | ja              |              4577 |

Diese beiden Dateien sind der beste technische Referenzpunkt fuer kuenftige
lokale PDF-Erzeugung.

### Download-Infrastruktur

Die technische Verdrahtung der Bibliothek ist stabil:

- Proxy-IDs aus [`handouts.ts`](../client/src/content/handouts.ts) loesen
  korrekt auf
- lokale PDF-Pfade existieren
- gepruefte Production-URLs waren erreichbar
- `inline` vs. `attachment` funktioniert fuer Remote-Dateien sauber

## Priorisierung

### P1 - Gate fuer kuenftige Materialien festziehen

- Bildbasierte PDFs duerfen nur zusammen mit gepflegter Textversion
  ausgerollt werden.
- Diese Regel sollte fuer neue Handouts als harter Release-Gate gelten.
- Die Materialkarten sollten Textversionen weiter sichtbar und gleichwertig
  anbieten.

### P2 - Lokale PDFs technisch aufraeumen

Fuer lokal kontrollierte PDFs:

- A4-Export vereinheitlichen
- `Title`-Metadaten durchgaengig setzen
- wenn moeglich textbasierte Exporte statt reiner Bild-PDFs erzeugen

Prioritaet innerhalb der Materialbibliothek:

1. `eisberg`
2. `rolle-klaeren`
3. `krisenkommunikation`
4. `spaltung`
5. `alarm-modus`

### P3 - Remote-PDF-Strategie entscheiden

Fuer die `files.manuscdn.com`-Dateien braucht es eine bewusste Produktentscheidung:

1. entweder bei image-only PDFs dauerhaft auf HTML-/Textversion als Primaerpfad
   setzen
2. oder die PDFs mittelfristig durch lokal kontrollierte, textbasierte Exporte
   ersetzen

Solange diese Entscheidung nicht explizit getroffen ist, bleibt das Audit
inhaltlich gelb bis rot.

### P4 - Download-Verhalten optional vereinheitlichen

Falls gewuenscht, kann die Bibliothek noch technischer vereinheitlicht werden:

- auch lokale PDFs ueber einen kontrollierten Pfad mit explizitem
  `Content-Disposition` ausliefern
- oder die heutige Mischung bewusst dokumentieren und akzeptieren

Das ist kein Blocker gegenueber Textlayer und Format, aber ein sauberer
Hygiene-Fix.

## Konkrete Fixliste

1. PDF-Policy dokumentieren:
   `image-only PDF nur mit sichtbarer Textversion und gepflegtem Review-Stand`
2. Fuer die 5 nicht-A4-Materialien neue drucktaugliche Exporte erzeugen.
3. Fuer lokal kontrollierte PDFs `Title`-Metadaten nachziehen.
4. Fuer kuenftige lokale Exporte textbasierte PDF-Erzeugung bevorzugen.
5. Fuer Remote-Manus-PDFs entscheiden:
   behalten plus Textversion,
   oder ersetzen durch lokale kanonische PDFs.

## Release-Einordnung

Der Audit-Block `PDF- und Download-Audit` ist nach diesem Lauf noch **nicht
abgeschlossen**.

Gruen:

- Dateierreichbarkeit
- Proxy-Verdrahtung
- Textversions-Abdeckung in der Materialbibliothek
- Krisen-PDFs

Offen:

- Textlayer fuer den grossen Restbestand
- A4-Konsistenz der Material-PDFs
- PDF-Metadaten

## Grenze dieses Audits

- Es wurde bewusst keine OCR als Produktionsinhalt uebernommen.
- Die A11y-Bewertung bezieht sich auf extrahierbaren Text und
  Downloadeigenschaften, nicht auf eine vollstaendige PDF/UA-Pruefung.
- Das Audit bewertet technische und strukturelle PDF-Qualitaet, nicht die
  fachliche Richtigkeit der Inhalte.
