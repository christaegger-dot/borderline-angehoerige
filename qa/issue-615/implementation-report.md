# Issue #615 · Umsetzungs- und Prüfbericht

Stand: 5. Oktober 2026

## Ergebnis

Der im Issue beschriebene Drift-Block von 18 Visualfamilien ist technisch und
redaktionell aufgelöst:

- Die drei P1-Familien `radikale-akzeptanz`, `gespraeche-kippen` und
  `beispiel-dialog` liegen im separat geprüften V3-Paket.
- Die übrigen 15 Familien wurden aus den synchronisierten HTML-Textversionen
  neu aufgebaut. Jede Familie besitzt eine editierbare HTML-Quelle, eine
  einseitige PDF-Kandidatin, ein Vollbild-WebP und ein Thumbnail.
- Kein neuer Entwurf wird aus `client/public` ausgeliefert. Die Governance
  bleibt bis zur verantworteten Freigabe fail-closed auf `text-only`.
- Zwölf noch öffentlich erreichbare Binärdateien der vier V1-Familien
  `energie-konto`, `erlaubnis-karte`, `grenzen-erkennen` und `lmk` wurden in
  ein internes, mit SHA-256 dokumentiertes QA-Archiv verschoben.

## Inhaltliche Modernisierung

Besonders risikoreiche Aussagen wurden neu gefasst:

- Remission, Alltag und Teilhabe sowie persönliche Recovery werden getrennt;
  «Heilung» wird nicht als einheitlicher fachlicher Endpunkt behauptet.
- Die fünf Genesungsbereiche sind ausdrücklich eine redaktionelle Orientierung
  und kein validiertes Kausal- oder Prognosemodell.
- Körperliche oder psychische Stresszeichen werden nicht als Beweis einer
  Grenzverletzung dargestellt.
- «LMK / Lebe mit Konsequenzen» wurde aus allen öffentlichen Titeln und
  Inhalten entfernt. Die neutrale Ersatzfassung fokussiert den eigenen,
  sicheren Handlungsspielraum ohne Strafe oder Wirkungsgarantie.
- Das Energie-Konto ist eine Reflexionsmetapher, keine Messung und keine
  individuelle Pflicht, strukturelle Belastung durch Selbstfürsorge
  auszugleichen.

Fachliche Hauptbezüge:

- APA, _Practice Guideline for the Treatment of Patients With Borderline
  Personality Disorder_ (2024)
- NICE CG78, NG150 und NG225
- AWMF-S3 _Psychosoziale Therapien bei schweren psychischen Erkrankungen_
  (2025)
- Zanarini et al., Langzeitverlauf (2024)
- WHO und BAG zu Stress, psychischer Gesundheit und Angehörigenunterstützung

## Produktions- und Sicherheitsvertrag

Quelle: `handouts/issue-615-refresh/manifest.json`

- Ziel: `qa/withheld-handouts/issue-615-visual-refresh-2026-10-05/`
- 15 editierbare HTML-Quellen
- 15 PDFs, A4 hoch, je eine Seite
- 15 Vollbild-WebP, 1600 × 2263 px
- 15 Thumbnails, 600 × 849 px
- synchrone SHA-256-Prüfsummen für Quelle und Ausgabe
- XMP-Metadaten vorhanden
- keine PDF/UA-Konformitätsbehauptung
- Matterhorn-Prüfung ausstehend

Der Generator prüft unter anderem sichere Pfade, Textstand-Parität,
Seitenanzahl, Rastermasse und Überlauf der zentralen Visualelemente. Der
separate Audit verweigert den Erfolg, wenn Entwürfe oder ausgeschiedene
V1-Dateien in `client/public` auftauchen.

## Visuelle Prüfung

Alle 15 frisch erzeugten Thumbnails wurden gemeinsam als Kontaktbogen geprüft.
Die komplexeren Vollbilder zu Remission/Recovery, Genesungsbereichen und
Leuchtturm wurden zusätzlich in voller Auflösung kontrolliert. Festgestellte
Überläufe und zu enge Visualflächen wurden vor dem finalen Export korrigiert.

## Bewusste Freigabegrenze

Das Issue schliesst die Modernisierung, die reproduzierbare Produktion und die
kontrollierte Ablösung veralteter Dateien ab. Es erteilt **keine**
Publikationsfreigabe. Vor einer späteren Aktivierung jeder Familie bleiben
erforderlich:

1. verantwortete fachliche und institutionelle Freigabe;
2. reale Screenreader- und Nutzendentests;
3. PDF-UA-/Matterhorn-Prüfung einschliesslich Lesereihenfolge;
4. reale Druckprüfung;
5. ein separater atomarer Promote-Schritt mit erneuter Gesamtprüfung.

## Reproduzierbare Verifikation

```bash
HANDOUT_PDF_PYTHON_PATH=/pfad/zu/python-mit-pypdf \
  pnpm generate:issue615-handouts
pnpm audit:issue615-handouts
pnpm audit:infografiken
pnpm test -- handout-governance
pnpm test -- anti-stigma-governance
pnpm test -- material-download-function
pnpm build
```
