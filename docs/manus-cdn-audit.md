# Manus CDN Audit

Stand: 2026-05-01

## Ergebnis

- Der fruehere produktive Manus-CDN-Bestand ist fuer den Website-Content jetzt
  technisch geschlossen.
- Ehemals remote ausgelieferte Handout-/Material-PDFs wurden durch lokal
  kontrollierte kanonische WebP-/PDF-Paare ersetzt.
- Im produktiven Content-Scope unter `client/src/content/**` verbleibt aktuell
  keine PDF-Quelle mehr auf `files.manuscdn.com`.

## Umfang des Abschlusses

- `9` fruehere Manus-PDFs in der Materialbibliothek wurden lokalisiert.
- `20` fruehere Manus-PDFs im thematischen Handout-/Textversions-Scope wurden
  ebenfalls lokalisiert.
- Damit wurden insgesamt `29` ehemals remote ausgelieferte PDF-Artefakte in
  lokale kanonische Assets ueberfuehrt.

## Was jetzt lokal kontrolliert ist

- Vorschauen: `/infografiken/manus-<id>-v1.webp`
- PDFs: `/infografiken/manus-<id>-v1.pdf`
- Auslieferung: ueber den kontrollierten Pfad
  `/api/material-download/:id?disposition=inline|attachment`

## Qualitaetsstatus des Ersatzbestands

Die lokalisierten Ersatz-PDFs sind jetzt:

- A4-nah
- mit PDF-`Title`-Metadaten versehen
- mit extrahierbarem Textlayer erzeugt
- zusammen mit sichtbaren Textversionen im Produkt verfuegbar

## Auswirkungen auf Security und Betrieb

- `img-src` und `media-src` in der CSP konnten wieder auf reine Self-Hosting-
  Pfade verengt werden.
- Der produktive Content benoetigt fuer PDFs und Vorschaubilder kein
  `files.manuscdn.com` mehr.
- Das reduziert externe Abhaengigkeiten und schliesst den frueheren offenen
  Audit-Punkt zur Remote-PDF-Strategie fuer diesen Scope.

## Verbleibende Einordnung

- Historische Audit-Artefakte koennen weiterhin auf fruehere
  `files.manuscdn.com`-Fundstellen verweisen; das beschreibt den damaligen
  Stand, nicht den aktuellen Produktzustand.
- Diese Notiz bewertet die technische Content-Lokalisierung, nicht die
  fachliche Freigabe der Inhalte.
