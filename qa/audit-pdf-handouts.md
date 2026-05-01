# Audit: PDF-Handouts

## Meta

- Repo: `/Users/christaegger/Downloads/borderline-angehoerige`
- Stand: `1. Mai 2026`
- Fokus: Abschluss des Rest-Audits fuer die ehemals `9`
  Remote-Manus-PDFs in der Materialbibliothek
- Reproduzierbar ueber:
  - [`qa/scripts/build-canonical-remote-material-pdfs.py`](./scripts/build-canonical-remote-material-pdfs.py)
  - [`qa/scripts/audit-canonical-remote-material-pdfs.py`](./scripts/audit-canonical-remote-material-pdfs.py)
  - gebuendelte Python-Runtime mit `reportlab`, `Pillow` und `pypdf`

## Kurzfazit

- Der fruehere Remote-Restbestand ist technisch geschlossen.
- Die ehemals `9` Manus-PDFs wurden durch lokal kontrollierte kanonische
  WebP-/PDF-Paare ersetzt.
- Alle `9/9` lokalen Ersatz-PDFs sind jetzt:
  - A4-nah
  - mit PDF-`Title`-Metadaten
  - mit extrahierbarem Textlayer
  - ueber den kontrollierten Proxy auslieferbar
- Die sichtbaren Textversionen bleiben zusaetzlich erhalten.

## Audit-Urteil

Der bisher offene Restblock ist **abgeschlossen**.

Fuer die frueheren neun Manus-Materialien gibt es in der Materialbibliothek
keinen offenen PDF-/Download-Befund mehr. Der Audit ist fuer diesen Scope
jetzt gruen.

## Scope

Abgeloest wurden diese neun Eintraege:

1. `leuchtturm`
2. `grenzen-spickzettel`
3. `warnsignale`
4. `schuld-verantwortung`
5. `wenn-worte-treffen`
6. `dear`
7. `radikale-akzeptanz`
8. `genesung-zahlen`
9. `kinder`

Die kanonischen lokalen Assets liegen jetzt unter:

- `/infografiken/manus-<id>-v1.webp`
- `/infografiken/manus-<id>-v1.pdf`

## Wichtigste Ergebnisse

### 1. Keine verbleibenden Remote-Manus-PDFs in der Materialbibliothek

Die betroffenen Materialeintraege verweisen nicht mehr auf `files.manuscdn.com`
als PDF-Quelle, sondern auf lokal kontrollierte PDF-Dateien.

### 2. PDF-Qualitaet ist fuer die 9 Ersatzdateien jetzt gruen

Die lokalen Ersatz-PDFs wurden als A4-Dateien mit Titel-Metadaten und
extrahierbarem Textlayer erzeugt. Damit sind die drei frueheren Hauptbefunde
fuer diesen Restbestand geschlossen:

- kein offener Textlayer-Befund mehr
- kein offener `Title`-Metadaten-Befund mehr
- kein offener A4-Befund mehr

### 3. Delivery und Textversion bleiben sauber

Die Download- und Oeffnen-Pfade laufen weiter ueber den kontrollierten Proxy.
Zusaetzlich bleiben fuer alle neun Materialien die sichtbaren Textversionen in
der Website erhalten.

## Zusammenfassung als Matrix

| Kriterium                            | Ergebnis |
| ------------------------------------ | -------- |
| Ehemals offene Remote-Manus-PDFs     | `9`      |
| Durch lokale kanonische PDFs ersetzt | `9/9`    |
| Mit lokaler Preview-WebP ersetzt     | `9/9`    |
| Proxy `inline` verfuegbar            | `9/9`    |
| Proxy `attachment` verfuegbar        | `9/9`    |
| A4-nah                               | `9/9`    |
| Mit Textlayer                        | `9/9`    |
| Mit `Title`-Metadatum                | `9/9`    |
| Mit sichtbarer Textversion           | `9/9`    |

## Relevante Umsetzung

- Die Materialbibliothek und die betroffenen Themen-Content-Dateien zeigen fuer
  diese neun Eintraege jetzt auf lokale Assets.
- Die Ersatz-PDFs wurden so erzeugt, dass die visuelle Vorschau auf Seite `1`
  erhalten bleibt und die strukturierte Textversion im selben PDF integriert
  ist.
- Damit bleibt der inhaltliche Wiedererkennungswert erhalten, ohne das A11y-
  und Metadaten-Defizit der alten Manus-PDFs mitzuschleppen.

## Release-Einordnung

Der bisherige Restblock `PDF- und Download-Audit` fuer diese neun
Remote-Manus-Dateien ist **gruen**.

Gruen:

- lokale Dateierreichbarkeit
- lokale Preview-WebPs
- Proxy-Verdrahtung
- `inline` vs. `attachment`
- Textversions-Abdeckung
- A4-Konsistenz
- Textlayer
- PDF-`Title`-Metadaten

Weiterhin als generelle Zukunftsregel sinnvoll:

- neue bildbasierte PDFs nur zusammen mit sichtbarer Textversion ausrollen
- lokal kontrollierte PDFs bevorzugen
- fuer neue Materialpakete A4, Metadaten und Textlayer als Standard beibehalten

## Grenze dieses Audits

- Das Audit bewertet technische und strukturelle PDF-Qualitaet, nicht die
  fachliche Richtigkeit der Inhalte.
- Es wurde bewusst keine vollstaendige PDF/UA-Zertifizierung geprueft.
