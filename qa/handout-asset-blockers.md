# Handout Asset Blocker Report

Stand: 2026-10-04
Quelle der Wahrheit: `client/src/content/handoutGovernance.ts`

## Zweck

Dieser Report trennt freigegebene, aktuell auslieferbare Druckgrafiken von
Textversionen, deren PDF-, WebP- oder Thumbnail-Fassung fachlich,
sicherheitsbezogen oder perspektivisch nicht mehr anschlussfähig ist. Eine
vorhandene Datei gilt nicht automatisch als publizierbar.

## Aktueller Freigabestand

- Die Website veröffentlicht Visuals ausschliesslich fail-closed: unbekannte,
  zurückgezogene, als `text-only` markierte oder nicht freigegebene Entwürfe
  werden weder in Katalogen noch über die Download-Funktion ausgeliefert.
- Zurückgezogene und überholte Dateien liegen ausserhalb von `client/public`
  unter `qa/archived-handouts/anti-stigma-p1-2026-10-04/`.
- Das neue P1-Paket `radikale-akzeptanz`, `gespraeche-kippen` und
  `beispiel-dialog` bleibt als HTML-Textversion lesbar. Seine V3-Visuals liegen
  bis zur verantworteten institutionellen Freigabe unter
  `qa/withheld-handouts/p1-illustrations-v3-2026-10-04/`.
- Die Notfallplan-Textversion ist aktuell; die ältere PDF- und Bildfassung ist
  wegen fehlender Schutzklauseln vorläufig zurückgezogen.

## Weiterhin freigegebene Visuals

Diese Familien bleiben als Visual, PDF und Textversion auslieferbar, solange
die automatischen und manuellen Freigabegates grün bleiben:

| ID                         | Freigegebene Version                    |
| -------------------------- | --------------------------------------- |
| `notfallkarte-zuerich`     | `Notfallkarte-Zuerich-Psychische-Krise` |
| `kinder`                   | `manus-kinder-v3`                       |
| `dear`                     | `puk-dear-v1`                           |
| `spiegeln-statt-aufsaugen` | `manus-spiegeln-statt-aufsaugen-v3`     |
| `4-arten-von-grenzen`      | `puk-4-arten-von-grenzen-v1`            |
| `garten`                   | `puk-garten-v1`                         |
| `genesung-zahlen`          | `manus-genesung-zahlen-v3`              |
| `stopp-technik`            | `manus-stopp-technik-v3`                |

Weitere in der Governance als publiziert geführte P2-Handouts bleiben
freigegeben, sofern ihre referenzierten Dateien vorhanden sind. Die Tabelle ist
eine hervorgehobene Kernliste und ersetzt nicht das maschinenlesbare Register.

## Vorläufig nur als HTML-Textversion

Die folgenden Familien haben `visualAssetStatus: "text-only"`. Ihre aktuelle
HTML-Textversion bleibt erreichbar; alte Grafiken werden nicht mehr beworben
oder direkt ausgeliefert:

- sicherheits- oder krisenbezogen: `notfallplan-krise`, `alarm-modus`,
  `krisenkommunikation`, `anspannungskurve`, `grenzen-ohne-eskalation`,
  `pause-statt-streit`, `zuhoeren-ohne-zustimmen`, `bruecke-gelaender`;
- erklärende Modelle: `leuchtturm`, `eisberg`, `spaltung`, `gehirn`,
  `fortschritt-paradox`, `remission-heilung`, `5-faktoren-genesung`,
  `rolle-genesungsprozess`;
- Angehörigenrolle und Alltag: `rolle-klaeren`, `drei-saeulen`,
  `konsistenz-prinzip`, `beziehungs-achtsamkeit`, `6-leitlinien`,
  `4-alltags-tipps`, `schuld-verantwortung`, `sauerstoffmaske`,
  `wenn-worte-treffen`.

`4-phasen` und `im-krisenmodus` sind zusätzlich vollständig `withdrawn` und
erscheinen auch nicht mehr als aktive Textversion.

## Entwürfe ohne Publikationsfreigabe

| ID                   | Asset-Version               | Status                                   |
| -------------------- | --------------------------- | ---------------------------------------- |
| `radikale-akzeptanz` | `puk-radikale-akzeptanz-v3` | redaktioneller Entwurf, nicht publiziert |
| `gespraeche-kippen`  | `puk-gespraeche-kippen-v3`  | redaktioneller Entwurf, nicht publiziert |
| `beispiel-dialog`    | `puk-beispiel-dialog-v3`    | redaktioneller Entwurf, nicht publiziert |

## Operative Regeln

1. Nie automatisch die höchste Dateiversion aktivieren.
2. Inhalt, Sicherheitslogik und Perspektivenstandard zuerst in der
   HTML-Textversion prüfen.
3. Flache PDF- oder WebP-Dateien nicht punktuell übermalen; aus einer
   editierbaren Quelle neu produzieren.
4. Eine Visualfamilie erst nach fachlicher, visueller,
   barrierefreiheitsbezogener und institutioneller Freigabe wieder auf
   `published` setzen.
5. Danach Registry, Suchindex, Materialbibliothek, direkte Asset-URLs,
   Download-Funktion, Responsive Layout und Tastaturbedienung erneut prüfen.

## Mindestverifikation

```bash
pnpm test -- handout-governance
pnpm test -- anti-stigma-governance
pnpm test -- material-download-function
pnpm build
pnpm audit:release-http-gates
```

Eine neue Grafik wird erst sichtbar, wenn HTML, Abbildung, PDF und Thumbnail
denselben freigegebenen fachlichen Stand zeigen.
