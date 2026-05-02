# Infografik-Workflow

Stand: 2026-05-02

## Ziel

Der Ordner `client/public/infografiken` ist produktiv wichtig, aber als
Binarausgabe teuer in Pflege, Review und CI. Dieses Dokument beschreibt, wie
aktive Web-Assets, Hilfsdateien und alte Versionsstaende auseinandergehalten
werden.

## Aktueller Inventarstand

Der aktuelle Snapshot liegt in
[`qa/infografik-inventory.json`](../qa/infografik-inventory.json) und wird
ueber `pnpm audit:infografiken` erzeugt.

Stand `2026-05-02`:

- `167` Dateien insgesamt (`287.85 MB`)
- `88` aktiv referenzierte Produktdateien (`131.18 MB`)
- `5` Support-Dateien ausserhalb des Produktpfads (`41.26 MB`)
- `74` unreferenzierte Kandidaten (`115.40 MB`)
- `10` Versionsfamilien mit aktiven Dateien plus alten Geschwistern

## Source of Truth

- Produktiv aktive Pfade werden in `client/src/content/**` referenziert.
- Das Audit-Skript liest genau diese Content-Register aus und behandelt sie als
  kanonische Sicht auf den Bestand.
- Eine Datei unter `client/public/infografiken` ist erst dann "aktiv", wenn sie
  in diesen Content-Dateien referenziert wird.

## Dateiklassen

### 1. Aktive Produktdateien

Direkt im Produkt referenzierte Assets, zum Beispiel:

- `/infografiken/manus-<id>-v1.webp`
- `/infografiken/manus-<id>-v1.pdf`
- `/infografiken/<slug>-vN.png`
- `/infografiken/<slug>-vN.pdf`
- `/infografiken/extras/thumbnails/<slug>-vN.png`

### 2. Support-Dateien

Nicht direkt im Produkt referenziert, aber bewusst im Repo behalten:

- `/infografiken/infografiken-final.zip`
- `/infografiken/extras/README.txt`
- `/infografiken/extras/infografiken-extras.zip`
- `/infografiken/extras/uebersichtsbogen.png`
- `/infografiken/extras/uebersichtsbogen.pdf`

### 3. Legacy-Kandidaten

Alte Versionsdateien, die im Produkt nicht mehr verwendet werden, aber noch im
Ordner liegen, zum Beispiel fruehere `-v1` bis `-v13` Varianten einer aktuell
nur noch mit `-v14` referenzierten Infografik.

## Arbeitsregeln

### Neue oder aktualisierte Infografik

1. Kanonisches Asset-Paar erzeugen:
   - Vorschau fuer Web (`.webp` oder `.png`)
   - PDF fuer Download/Druck
2. Falls Karten-/Galerielayout eine kleinere Vorschau braucht:
   - Thumbnail unter `client/public/infografiken/extras/thumbnails/`
3. Produktpfade in `client/src/content/**` aktualisieren.
4. Audit laufen lassen:

```sh
pnpm audit:infografiken
```

5. Snapshot in `qa/infografik-inventory.json` pruefen:
   - keine fehlenden referenzierten Dateien
   - erwartete aktive Pfade
   - keine unerwarteten neuen Legacy-Kandidaten

### Lokalisierte ehemalige Remote-Assets

- fuer lokal kontrollierte Ersatzdateien gilt weiter:
  - `manus-<id>-v1.webp`
  - `manus-<id>-v1.pdf`
- die Versionsnummer bleibt bewusst ruhig, bis ein inhaltlich neuer Export
  wirklich einen Nachfolger braucht

### Alte Versionen nicht still mitschleppen

- neue Exportversion nur dann im Produkt referenzieren, wenn der Content-Pfad
  wirklich umgestellt wurde
- nach Umstellung mit `pnpm audit:infografiken` pruefen, welche alten
  Geschwister unreferenziert geworden sind
- alte Versionen nicht automatisch loeschen; zuerst in Audit/Doku entscheiden,
  ob sie fuer Historie, Druckarchiv oder externe Weitergabe noch gebraucht
  werden

## Benennung

- Produktive Handout-Ersatzdateien:
  - `manus-<id>-v1.webp`
  - `manus-<id>-v1.pdf`
- Produktive gestaltete Serien:
  - `<slug>-vN.png`
  - `<slug>-vN.pdf`
- Thumbnail-Ableitungen:
  - `extras/thumbnails/<slug>-vN.png`

## Was das Audit bewusst nicht tut

- Es loescht keine Dateien.
- Es bewertet nicht die fachliche Richtigkeit des Inhalts.
- Es ersetzt keine PDF-Qualitaetspruefung.
- Es entscheidet nicht selbst, ob Legacy-Dateien archiviert oder entfernt
  werden.

## Empfohlener naechster Hygiene-Schritt

Die groessten Altlasten liegen derzeit in den alten PNG/PDF-Versionsreihen der
nicht-Manus-Infografiken. Wenn der Bestand weiter bereinigt werden soll, ist der
naechste sinnvolle Schritt:

1. Legacy-Kandidaten aus `qa/infografik-inventory.json` familyweise pruefen
2. nur noch historisch relevante Reihen behalten
3. den Rest aus dem produktiven Ordner in ein bewusstes Archiv ausserhalb des
   Laufzeitpfads verschieben
