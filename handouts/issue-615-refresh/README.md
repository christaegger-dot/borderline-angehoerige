# Issue 615 · Infografik-Modernisierung

Dieses Paket erzeugt die 15 noch fehlenden Visualfamilien aus den aktuellen
HTML-Textversionen. Die drei bereits erstellten P1-Blätter `radikale-akzeptanz`,
`gespraeche-kippen` und `beispiel-dialog` bleiben in ihrem separat geprüften
V3-Paket.

## Sicherheitsprinzip

- Ausgabe erfolgt ausschliesslich nach
  `qa/withheld-handouts/issue-615-visual-refresh-2026-10-05/`.
- Der Generator schreibt nie nach `client/public`.
- `draft-editorial-review-pending` und `pdfUaClaim: false` sind verbindlich.
- Eine spätere Publikation braucht eine ausdrücklich dokumentierte,
  verantwortete Freigabe und einen separaten atomaren Promote-Schritt.

## Reproduzierbarer Build

```bash
HANDOUT_PDF_PYTHON_PATH=/pfad/zu/python-mit-pypdf \
  pnpm generate:issue615-handouts
pnpm audit:issue615-handouts
```

Die editierbaren HTML-Quellen werden unter `sources/` versioniert. PDF,
Vollbild-WebP und Thumbnail entstehen aus derselben gerenderten Seite. Das
Manifest dokumentiert Prüfsummen, Masse und den Entwurfsstatus.

## Freigabegrenzen

Die PDFs werden mit angeforderter Tag-Struktur und synchronen XMP-Metadaten
erzeugt. Das ist eine technische Vorprüfung, keine PDF/UA-Konformitätserklärung.
Lesereihenfolge, Semantik, Matterhorn, reale Screenreader, Ausdrucke und
Nutzendenperspektiven bleiben manuell zu prüfen.
