# Audit: PDF-Handouts

## Meta

- Repo: `/Users/christaegger/Downloads/borderline-angehoerige`
- Stand: `1. Mai 2026`
- Fokus: Abschluss des gesamten frueheren Manus-Restbestands im
  Handout-/Textversions-Scope
- Reproduzierbar ueber:
  - [`qa/scripts/build-canonical-remote-material-pdfs.py`](./scripts/build-canonical-remote-material-pdfs.py)
  - [`qa/scripts/audit-canonical-remote-material-pdfs.py`](./scripts/audit-canonical-remote-material-pdfs.py)
  - gebuendelte Python-Runtime mit `reportlab`, `Pillow` und `pypdf`

## Kurzfazit

- Der fruehere Remote-Bestand ist technisch geschlossen.
- Alle ehemals `29` Manus-basierten Handout-PDFs im produktiven
  Textversions-Scope wurden durch lokal kontrollierte kanonische WebP-/PDF-Paare
  ersetzt.
- Davon entfallen:
  - `9` auf die Materialbibliothek
  - `20` auf thematische Handouts ausserhalb der Materialbibliothek
- Die lokalen Ersatz-PDFs sind jetzt:
  - A4-nah
  - mit PDF-`Title`-Metadaten
  - mit extrahierbarem Textlayer
  - ueber den kontrollierten Proxy auslieferbar
- Die sichtbaren Textversionen bleiben fuer alle betroffenen Handouts erhalten.

## Audit-Urteil

Der fruehere offene Restblock ist **abgeschlossen**.

Fuer den produktiven Handout-/Textversions-Scope gibt es aktuell keinen
verbleibenden `files.manuscdn.com`-PDF-Pfad mehr. Der PDF-/Download-Befund ist
fuer diesen Scope jetzt gruen.

## Scope

Abgeloest wurden insgesamt `29` frueher remote ausgelieferte Handout-PDFs.

Die lokalen kanonischen Assets liegen jetzt unter:

- `/infografiken/manus-<id>-v1.webp`
- `/infografiken/manus-<id>-v1.pdf`

## Wichtigste Ergebnisse

### 1. Keine verbleibenden Remote-Handout-PDFs im produktiven Content-Scope

Die produktiven Content-Dateien unter `client/src/content/**` verweisen fuer den
Handout-/Textversions-Scope nicht mehr auf `files.manuscdn.com` als PDF-Quelle.

### 2. PDF-Qualitaet ist fuer den frueheren Remote-Bestand jetzt gruen

Die lokalen Ersatz-PDFs wurden als A4-Dateien mit Titel-Metadaten und
extrahierbarem Textlayer erzeugt. Damit sind die frueheren Hauptbefunde fuer
diesen Scope geschlossen:

- kein offener Textlayer-Befund mehr
- kein offener `Title`-Metadaten-Befund mehr
- kein offener A4-Befund mehr

### 3. Delivery und Textversion bleiben sauber

Die Download- und Oeffnen-Pfade laufen weiter ueber den kontrollierten Proxy.
Zusaetzlich bleiben die sichtbaren Textversionen fuer alle betroffenen Handouts
in der Website erhalten.

### 4. CSP konnte enger gezogen werden

Weil im produktiven Handout-Content keine `manuscdn`-Assets mehr benoetigt
werden, konnte die Client-CSP fuer `img-src` und `media-src` auf reine
Self-Hosting-Pfade zurueckgezogen werden.

## Zusammenfassung als Matrix

| Kriterium                                        | Ergebnis |
| ------------------------------------------------ | -------- |
| Ehemals remote Handout-PDFs im Scope             | `29`     |
| Durch lokale kanonische PDFs ersetzt             | `29/29`  |
| Mit lokaler Preview-WebP ersetzt                 | `29/29`  |
| Proxy `inline` verfuegbar                        | `29/29`  |
| Proxy `attachment` verfuegbar                    | `29/29`  |
| A4-nah                                           | `29/29`  |
| Mit Textlayer                                    | `29/29`  |
| Mit `Title`-Metadatum                            | `29/29`  |
| Mit sichtbarer Textversion                       | `29/29`  |
| Verbleibende Remote-PDF-Quellen im Handout-Scope | `0`      |

## Relevante Umsetzung

- Die betroffenen Themen-Content-Dateien zeigen jetzt auf lokale Assets.
- Die Ersatz-PDFs wurden so erzeugt, dass die visuelle Vorschau auf Seite `1`
  erhalten bleibt und die strukturierte Textversion im selben PDF integriert
  ist.
- Damit bleibt der inhaltliche Wiedererkennungswert erhalten, ohne das fruehere
  A11y- und Metadaten-Defizit der Manus-PDFs mitzuschleppen.

## Release-Einordnung

Der bisherige Restblock `PDF- und Download-Audit` ist fuer den aktuellen
produktiven Handout-/Textversions-Scope **gruen**.

Gruen:

- lokale Dateierreichbarkeit
- lokale Preview-WebPs
- Proxy-Verdrahtung
- `inline` vs. `attachment`
- Textversions-Abdeckung
- A4-Konsistenz
- Textlayer
- PDF-`Title`-Metadaten
- keine verbleibenden produktiven Remote-Handout-PDFs

Weiterhin als generelle Zukunftsregel sinnvoll:

- neue bildbasierte PDFs nur zusammen mit sichtbarer Textversion ausrollen
- lokal kontrollierte PDFs bevorzugen
- fuer neue Materialpakete A4, Metadaten und Textlayer als Standard beibehalten

## Grenze dieses Audits

- Das Audit bewertet technische und strukturelle PDF-Qualitaet, nicht die
  fachliche Richtigkeit der Inhalte.
- Es wurde bewusst keine vollstaendige PDF/UA-Zertifizierung geprueft.
