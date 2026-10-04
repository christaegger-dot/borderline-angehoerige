# P1-Illustrationspaket

Dieses Verzeichnis enthält die wartbare Quelle für drei neu aufgebaute
Praxisblätter:

- Radikale Akzeptanz
- Wenn Gespräche kippen
- Beispiel-Dialog

**Status: Entwurf – fachlich-redaktionelle Freigabe ausstehend.** Die
technische Integration und die automatisierten Prüfungen sind kein inhaltlicher
Freigabenachweis.

Das unabhängige KI-gestützte V3-Review hat den Wortlaut redaktionell
unbeanstandet gelassen. Der sichtbare Entwurfsstatus bezeichnet weiterhin die
noch ausstehende verantwortete institutionelle Fachfreigabe; beide Stufen sind
nicht gleichzusetzen.

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

Alle drei Blätter sind Praxisblätter und führen Schutz vor Gesprächstechnik
sichtbar ausserhalb optionaler Inhalte. Das nicht-akute Blatt «Radikale
Akzeptanz» bleibt ohne Krisennummern. Die beiden handlungsnahen
Kommunikationsblätter unterscheiden Gewalt oder Bedrohung von vermuteter
unmittelbarer Selbstgefährdung und nennen zurückhaltend die aus dem kanonischen
Kontaktregister bezogenen Nummern 117 beziehungsweise 144.

## Erzeugen und prüfen

```sh
python3 -m venv /tmp/p1-pdf-venv
P1_PDF_PYTHON_PATH=/tmp/p1-pdf-venv/bin/python3
"$P1_PDF_PYTHON_PATH" -m pip install -r qa/p1-illustrations/requirements.txt
P1_PDF_PYTHON_PATH="$P1_PDF_PYTHON_PATH" pnpm generate:p1-illustrations
"$P1_PDF_PYTHON_PATH" qa/p1-illustrations/pdf-preflight-v3.py --repo-root . \
  > qa/p1-illustrations/pdf-preflight-v3-2026-10-04.json
"$P1_PDF_PYTHON_PATH" qa/p1-illustrations/validate-pdfua-candidates.py --repo-root . \
  > qa/p1-illustrations/verapdf-ua1-candidates-v3-2026-10-04.json
pnpm audit:p1-illustrations
```

Wenn die Abhängigkeit in einer separaten Python-Laufzeit installiert ist, kann
diese mit `P1_PDF_PYTHON_PATH=/pfad/zu/python3` an den Generator übergeben
werden.

Die PDF-Seiten werden zuerst mit Chromium erzeugt und danach kontrolliert für
die PDF/UA-Prüfung vorbereitet. Der Postprozess ergänzt XMP-Metadaten,
bereinigt die Listenstruktur und markiert nur durch harte Operator-Prüfungen
abgesicherte, quellenspezifisch als Dekoration zugeordnete Vektorgruppen als
Artefakt. Die semantische Einordnung bleibt Teil der manuellen
Matterhorn-Prüfung. Der Generator bricht ab, falls sich die exakte logische oder
layoutbezogene Textextraktion oder die gerasterte Seite gegenüber dem Roh-PDF
verändert. Erst danach wird die Seite mit Poppler gerastert und in WebP
umgewandelt. Dadurch bleiben PDF, Vollbild und Thumbnail visuell deckungsgleich.
`manifest.json` dokumentiert Browser, Dateigrössen, Abmessungen und
SHA-256-Werte. Der P1-Audit lehnt veraltete Preflight- oder veraPDF-Berichte ab.

Vor einer Freigabe bleiben die verantwortete institutionelle Fachfreigabe, eine
manuelle Matterhorn-Prüfung und die vorgesehenen realen
Screenreader-Durchgänge erforderlich.

Das ausgefüllte KI-gestützte redaktionelle Freigabeprotokoll steht unter
[`docs/governance/fachliche-freigabe-p1-illustrationen-2026-10-04.md`](../../docs/governance/fachliche-freigabe-p1-illustrationen-2026-10-04.md)
bereit. Es dokumentiert den Prüfstand, die prüfende Rolle, die drei
Einzelentscheide und die Regeln für die anschliessende Versionierung. Es ist
ausdrücklich keine verantwortete institutionelle Fachfreigabe.

Die Nachbearbeitung des redaktionellen Reviews und die Abgrenzung zwischen
Browser-Druck und den eigentlichen einseitigen Handout-PDFs sind unter
[`qa/p1-illustrations/editorial-review-follow-up-2026-10-04.md`](../../qa/p1-illustrations/editorial-review-follow-up-2026-10-04.md)
dokumentiert.
