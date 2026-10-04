# P1-Illustrationspaket

Dieses Verzeichnis enthält die wartbare Quelle für drei neu aufgebaute
Praxisblätter:

- Radikale Akzeptanz
- Wenn Gespräche kippen
- Beispiel-Dialog

**Status: Entwurf – fachlich-redaktionelle Freigabe ausstehend.** Die
technische Integration und die automatisierten Prüfungen sind kein inhaltlicher
Freigabenachweis.

## Vertrag

- Inhaltsquelle: die redaktionell überarbeiteten Textversionen unter
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
Schutz vor Gesprächstechnik sichtbar ausserhalb optionaler Inhalte. Gewalt oder
Bedrohung und vermutete akute Selbstgefährdung werden als unterschiedliche
Situationen beschrieben.

## Erzeugen und prüfen

```sh
pnpm generate:p1-illustrations
pnpm audit:p1-illustrations
```

Die PDF-Seiten werden zuerst erzeugt, anschliessend mit Poppler gerastert und
erst dann in WebP umgewandelt. Dadurch bleiben PDF, Vollbild und Thumbnail
visuell deckungsgleich. `manifest.json` dokumentiert Browser, Dateigrössen,
Abmessungen und SHA-256-Werte.

Vor einer Freigabe bleiben die fachlich-redaktionelle Bestätigung, eine
verantwortete Matterhorn-Prüfung und die vorgesehenen realen
Screenreader-Durchgänge erforderlich.
