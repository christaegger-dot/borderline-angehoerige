# P1-Illustrationspaket

Dieses Verzeichnis enthält die wartbare Quelle für drei neu aufgebaute
Praxisblätter:

- Radikale Akzeptanz
- Wenn Gespräche kippen
- Beispiel-Dialog

## Vertrag

- Inhaltsquelle: die freigegebenen Textversionen unter
  `client/src/content/handoutTextVersionContent/`.
- Strukturzuordnung und Textalternativen: das optionale `visualization`-Feld der
  jeweiligen Textversion.
- Webdarstellung: semantisches HTML in `HandoutSemanticVisual.tsx`; die mobile
  DOM-Reihenfolge ist zugleich die Lesereihenfolge.
- Druckquelle: die beim Export erzeugten semantischen HTML-Dateien in
  `sources/`, gemeinsam gestaltet durch `p1-illustrations.css`.
- PDF: A4 hoch, eine Seite, Tagged-PDF-Export angefordert. Eine PDF/UA-Aussage
  ist damit ausdrücklich noch nicht verbunden.
- Vollbild-WebP: 1600 × 2263 px.
- Thumbnail-WebP: 600 × 849 px.

Alle drei Blätter sind Praxisblätter, enthalten keine Krisennummern und führen
den Schutz- oder Sicherheitsabbruch sichtbar ausserhalb optionaler Inhalte.

## Erzeugen und prüfen

```sh
pnpm generate:p1-illustrations
pnpm audit:p1-illustrations
```

Die PDF-Seiten werden zuerst erzeugt, anschliessend mit Poppler gerastert und
erst dann in WebP umgewandelt. Dadurch bleiben PDF, Vollbild und Thumbnail
visuell deckungsgleich. `manifest.json` dokumentiert Browser, Dateigrössen,
Abmessungen und SHA-256-Werte.

Vor einer PDF/UA-Freigabe bleiben eine verantwortete Matterhorn-Prüfung und ein
realer Screenreader-Durchgang erforderlich.
