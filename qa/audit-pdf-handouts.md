# Audit: PDF-Handouts

## Meta

- Repo: `/Users/christaegger/Downloads/borderline-angehoerige`
- Stand: `1. Mai 2026`
- Fokus: Rest-Audit fuer die verbliebenen `9` Remote-Manus-PDFs
- Methode:
  - Inventarabgleich gegen
    [`materialien.ts`](../client/src/content/materialien.ts)
  - technische PDF-Pruefung mit `pypdf`
  - Live-Checks gegen Production fuer Proxy `inline` und `attachment`
  - Preview- und Direktdatei-Checks gegen die realen Manus-URLs
- Reproduzierbar ueber:
  - [`qa/scripts/scan-pdf-handouts.py`](./scripts/scan-pdf-handouts.py)
  - gebuendelte Python-Runtime mit `pypdf`

## Kurzfazit

- Der fruehere lokale PDF-Befund ist technisch weitgehend geschlossen.
- Offen ist jetzt nur noch der Remote-Restbestand:
  - `9/9` Remote-Manus-PDFs haben keinen Textlayer
  - `9/9` Remote-Manus-PDFs haben kein PDF-`Title`-Metadatum
- Technisch gruen sind diese neun Dateien bei:
  - Dateierreichbarkeit
  - Preview-WebP
  - Proxy-Auslieferung ueber Production
  - `inline` vs. `attachment`
  - A4-Format
  - sichtbarer Textversion

## Audit-Urteil

Das Audit ist **noch offen**, aber der offene Teil ist jetzt klar eingegrenzt.

Es geht nicht mehr um kaputte Downloads, fehlende Dateien oder uneinheitliche
Formate, sondern nur noch um die eigentliche PDF-Qualitaet der `9`
Remote-Manus-Artefakte:

1. kein Textlayer
2. kein `Title`-Metadatum

## Scope und Inventar

Aus [`materialien.ts`](../client/src/content/materialien.ts) bleiben noch diese
`9` Remote-PDFs auf `files.manuscdn.com` als Restbestand:

1. `leuchtturm`
2. `grenzen-spickzettel`
3. `warnsignale`
4. `schuld-verantwortung`
5. `wenn-worte-treffen`
6. `dear`
7. `radikale-akzeptanz`
8. `genesung-zahlen`
9. `kinder`

Alle neun Eintraege haben:

- eine sichtbare Textversion in der Website
- eine Manus-PDF-Quelle
- eine WebP-Preview
- einen funktionierenden Production-Proxy ueber
  `/api/material-download/:id`

## Wichtigste Befunde

### 1. Textlayer fehlt weiterhin bei allen 9 Remote-PDFs

Bei allen `9/9` Remote-Manus-PDFs wurden `0` extrahierbare Textzeichen
gefunden.

Das bedeutet praktisch:

- Screenreader erhalten in den PDF-Dateien selbst keinen nutzbaren Inhalt
- Copy/Paste und PDF-Suche funktionieren nicht
- Browser-Suche innerhalb der PDFs greift nicht
- die PDF-Datei bleibt ein Layout-Asset, nicht eine barrierearme Textquelle

Wichtig ist aber auch:

- fuer alle neun Dateien existiert bereits eine Web-Textversion
- das Rest-Risiko liegt damit primaer auf dem PDF-Artefakt selbst, nicht auf
  dem Informationszugang insgesamt

### 2. PDF-Metadaten fehlen weiterhin bei allen 9 Remote-PDFs

Bei allen `9/9` Dateien fehlt ein PDF-`Title`-Metadatum.

Das ist kein akuter Nutzungsblocker, aber ein klarer Qualitaetsmangel fuer:

- PDF-Reader-Anzeige
- langlebige Download-Artefakte
- saubere Archiv- und Dokumenteigenschaften

### 3. Delivery-Pfade sind jetzt technisch sauber

Alle `9/9` Remote-Dateien liefern:

- direkte Manus-PDF-URL mit `200`
- Preview-WebP mit `200`
- Production-Proxy mit `200` fuer `inline`
- Production-Proxy mit `200` fuer `attachment`

Damit ist der fruehere Infrastruktur-Teil dieses Audits fuer den
Remote-Restbestand gruen.

### 4. Format ist bei allen 9 Remote-Dateien A4-nah

Alle `9/9` Remote-Manus-PDFs wurden als A4-nah bewertet.

Es gibt in diesem Restbestand also keinen offenen Format- oder Print-Befund
mehr.

## Zusammenfassung als Matrix

| Kriterium                | Ergebnis |
| ------------------------ | -------- |
| Remote-Manus-PDFs gesamt | `9`      |
| Mit Textversion          | `9/9`    |
| Preview `200`            | `9/9`    |
| Proxy `inline` `200`     | `9/9`    |
| Proxy `attachment` `200` | `9/9`    |
| A4-nah                   | `9/9`    |
| Mit Textlayer            | `0/9`    |
| Ohne Textlayer           | `9/9`    |
| Mit `Title`-Metadatum    | `0/9`    |
| Ohne `Title`-Metadatum   | `9/9`    |

## Was bereits gut ist

### Textversionen als tragfaehiger Primaerpfad

Die Website hat fuer alle `9` Remote-Manus-Dateien bereits sichtbare
Textversionen. Das ist der zentrale Grund, warum dieser Restbefund heute eher
ein Qualitaets- als ein Verfuegbarkeitsproblem ist.

### Proxy- und Download-Verhalten

Der Production-Proxy fuer `/api/material-download/:id` arbeitet fuer diese
Dateien inzwischen sauber:

- `inline` funktioniert
- `attachment` funktioniert
- die Dateiauslieferung ist konsistent

### Kein offener A4-Befund mehr

Im verbliebenen Remote-Bestand ist die fruehere Format-Sorge nicht mehr
relevant. Alle neun Manus-PDFs sind A4-nah.

## Priorisierung

### P1 - Remote-PDF-Strategie explizit entscheiden

Fuer die `9` `files.manuscdn.com`-Dateien braucht es jetzt eine bewusste
Produktentscheidung:

1. entweder image-only PDFs dauerhaft akzeptieren und die Textversion als
   Primaerpfad fuehren
2. oder die Dateien mittelfristig durch lokal kontrollierte, textbasierte
   kanonische PDFs ersetzen

Solange diese Entscheidung nicht explizit getroffen ist, bleibt das Audit
inhaltlich offen.

### P2 - Textversion als gleichwertigen Primaerpfad beibehalten

Falls die Remote-PDFs vorerst bleiben:

- Textversionen sichtbar und gleichwertig anbieten
- nicht suggerieren, dass die PDF die bessere Lesefassung ist
- Review-Stand der Textversionen weiter pflegen

### P3 - Ersatz durch lokale kanonische PDFs vorbereiten

Falls die Remote-Dateien abgeloest werden sollen, sollte der Ersatzstandard
klar sein:

- A4-Export
- `Title`-Metadaten
- extrahierbarer Textlayer
- gleiche fachliche Inhalte wie in der Textversion

## Konkrete Fixliste

1. Produktentscheidung dokumentieren:
   `Remote-Manus-PDFs akzeptieren` oder `durch lokale kanonische PDFs ersetzen`
2. Falls akzeptiert:
   Textversion als sichtbaren Primaerpfad beibehalten und diesen Status bewusst
   in Release-Audits dokumentieren.
3. Falls ersetzt:
   fuer die `9` Remote-Dateien lokale textbasierte PDFs mit Metadaten und
   Textlayer erzeugen.

## Release-Einordnung

Der Audit-Block `PDF- und Download-Audit` ist nach diesem Lauf noch **nicht
abgeschlossen**.

Gruen:

- Dateierreichbarkeit
- Preview-WebPs
- Proxy-Verdrahtung
- `inline` vs. `attachment`
- Textversions-Abdeckung fuer alle `9` Remote-Dateien
- A4-Konsistenz des Remote-Restbestands

Offen:

- Textlayer fuer alle `9` Remote-Manus-PDFs
- PDF-`Title`-Metadaten fuer alle `9` Remote-Manus-PDFs
- die explizite Produktentscheidung fuer den langfristigen Umgang mit diesen
  Artefakten

## Grenze dieses Audits

- Es wurde bewusst keine OCR als Produktionsinhalt uebernommen.
- Die A11y-Bewertung bezieht sich auf extrahierbaren Text und
  Downloadeigenschaften, nicht auf eine vollstaendige PDF/UA-Pruefung.
- Das Audit bewertet technische und strukturelle PDF-Qualitaet, nicht die
  fachliche Richtigkeit der Inhalte.
