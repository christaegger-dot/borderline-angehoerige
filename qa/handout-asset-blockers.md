# Handout Asset Blocker Report

Stand: 2026-10-06
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
- Für Issue #615 wurden weitere 15 Visualfamilien quellbasiert aus den
  synchronen HTML-Textversionen neu erzeugt. PDF, Vollbild-WebP, Thumbnail und
  editierbare HTML-Quelle liegen als gemeinsamer, manifestierter Entwurfsstand
  unter `qa/withheld-handouts/issue-615-visual-refresh-2026-10-05/` und werden
  bis zur verantworteten Freigabe nicht öffentlich ausgeliefert.
- Für die fünf fachlich oder ethisch sensiblen Kandidaten ist ein
  commit- und hashgebundenes Fach- und Perspektivenreview unter
  `qa/issue-615/fachreview-paket/` vorbereitet. Es erteilt keine Freigabe und
  hält die Kandidaten bis zu drei unabhängigen menschlichen Entscheiden sowie
  den nachgelagerten technischen und realen Prüfungen zurück.
- Die noch öffentlich erreichbaren V1-Dateien zu `energie-konto`,
  `erlaubnis-karte`, `grenzen-erkennen` und `lmk` wurden kontrolliert nach
  `qa/archived-handouts/issue-615-legacy-v1-2026-10-05/` verschoben. Ihre alten
  Direktpfade existieren nicht mehr.
- Die überholten Druckgrafiken zu `dear` und `grenzen-spickzettel` wurden im
  Rahmen von Issue #633 aus `client/public` entfernt. Sie liegen zur
  Nachvollziehbarkeit unter
  `qa/withheld-handouts/issue-633-fachquellen-2026-10-05/`; die korrigierten
  HTML-Textversionen bleiben erreichbar.
- Die Notfallplan-Textversion ist aktuell; die ältere PDF- und Bildfassung ist
  wegen fehlender Schutzklauseln vorläufig zurückgezogen.
- Die aktuelle Notfallkarte bleibt unter `/notfallkarte` verfügbar und wird
  dauerhaft ausschliesslich als Webfassung geführt. Die frühere PDF- und
  WebP-Fassung ist aus dem aktuellen Projektbestand entfernt; ihre Prüfsummen
  und Herkunft sind unter
  `qa/retired-handouts/notfallkarte-static-2026-10-05/` dokumentiert. Die alten
  Direktpfade bleiben dauerhaft gesperrt.

## Weiterhin freigegebene Visuals

Diese Familien bleiben als Visual, PDF und Textversion auslieferbar, solange
die automatischen und manuellen Freigabegates grün bleiben:

| ID                         | Freigegebene Version                |
| -------------------------- | ----------------------------------- |
| `kinder`                   | `manus-kinder-v3`                   |
| `spiegeln-statt-aufsaugen` | `manus-spiegeln-statt-aufsaugen-v3` |
| `4-arten-von-grenzen`      | `puk-4-arten-von-grenzen-v1`        |
| `garten`                   | `puk-garten-v1`                     |
| `genesung-zahlen`          | `manus-genesung-zahlen-v3`          |
| `stopp-technik`            | `manus-stopp-technik-v3`            |

Weitere in der Governance als publiziert geführte P2-Handouts bleiben
freigegeben, sofern ihre referenzierten Dateien vorhanden sind. Die Tabelle ist
eine hervorgehobene Kernliste und ersetzt nicht das maschinenlesbare Register.

## Vorläufig nur als HTML-Textversion

Die folgenden Familien haben `visualAssetStatus: "text-only"`. Ihre aktuelle
HTML-Textversion bleibt erreichbar; alte Grafiken werden nicht mehr beworben
oder direkt ausgeliefert:

- sicherheits- oder krisenbezogen: `notfallplan-krise`, `alarm-modus`,
  `krisenkommunikation`, `anspannungskurve`, `grenzen-ohne-eskalation`,
  `pause-statt-streit`, `zuhoeren-ohne-zustimmen` und `bruecke-gelaender`;
- erklärende Modelle: `leuchtturm`, `eisberg`, `spaltung`,
  `zustands-landkarte`, `gehirn`,
  `fortschritt-paradox`, `remission-heilung`, `5-faktoren-genesung`,
  `rolle-genesungsprozess`;
- Angehörigenrolle und Alltag: `rolle-klaeren`, `drei-saeulen`,
  `konsistenz-prinzip`, `beziehungs-achtsamkeit`, `6-leitlinien`,
  `4-alltags-tipps`, `grenzen-erkennen`, `lmk`, `energie-konto`,
  `erlaubnis-karte`, `schuld-verantwortung`, `sauerstoffmaske`, `dear`,
  `grenzen-spickzettel` und `wenn-worte-treffen`.

`4-phasen` und `im-krisenmodus` sind zusätzlich vollständig `withdrawn` und
erscheinen auch nicht mehr als aktive Textversion.

`notfallkarte-zuerich` ist kein vorläufiger Text-only-Blocker. Der Status
`web-only` ist eine dauerhafte Formatentscheidung: Die gepflegte
HTML-Webfassung bleibt aktiv, während keine separate PDF-, WebP- oder
Thumbnail-Fassung angeboten oder neu erstellt wird. Die Materialbibliothek
kennzeichnet diesen Stand ausdrücklich und verlinkt nur die Webfassung.

## Entwürfe ohne Publikationsfreigabe

Die drei V3-P1-Blätter bleiben in ihrem separaten, bereits geprüften Paket:

| ID                   | Asset-Version               | Status                                   |
| -------------------- | --------------------------- | ---------------------------------------- |
| `radikale-akzeptanz` | `puk-radikale-akzeptanz-v3` | redaktioneller Entwurf, nicht publiziert |
| `gespraeche-kippen`  | `puk-gespraeche-kippen-v3`  | redaktioneller Entwurf, nicht publiziert |
| `beispiel-dialog`    | `puk-beispiel-dialog-v3`    | redaktioneller Entwurf, nicht publiziert |

Das reproduzierbare Issue-615-Paket enthält folgende 15 neu erzeugte
Visualfamilien. Alle bleiben `draft-editorial-review-pending` und `text-only`:

| ID                       | Asset-Version                     |
| ------------------------ | --------------------------------- |
| `zustands-landkarte`     | `puk-zustands-landkarte-v1`       |
| `gehirn`                 | `puk-hohe-anspannung-v1`          |
| `remission-heilung`      | `puk-remission-recovery-v2`       |
| `5-faktoren-genesung`    | `puk-genesungsbedingungen-v2`     |
| `rolle-genesungsprozess` | `puk-rolle-genesungsprozess-v2`   |
| `leuchtturm`             | `puk-leuchtturm-orientierung-v2`  |
| `konsistenz-prinzip`     | `puk-verlaessliche-absprachen-v2` |
| `energie-konto`          | `puk-energie-konto-v2`            |
| `grenzen-erkennen`       | `puk-grenzen-ueberlastung-v2`     |
| `lmk`                    | `puk-grenze-in-handlung-v2`       |
| `drei-saeulen`           | `puk-drei-orientierungspunkte-v2` |
| `beziehungs-achtsamkeit` | `puk-beziehungs-achtsamkeit-v2`   |
| `6-leitlinien`           | `puk-sechs-leitlinien-v2`         |
| `4-alltags-tipps`        | `puk-vier-alltagsfragen-v2`       |
| `erlaubnis-karte`        | `puk-erlaubnis-karte-v2`          |

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
6. Für `web-only`-Materialien keine statischen Download-Assets erzeugen; alte
   Pfade dauerhaft fail-closed halten.

## Mindestverifikation

```bash
pnpm test -- handout-governance
pnpm test -- anti-stigma-governance
pnpm test -- material-download-function
pnpm audit:issue615-handouts
pnpm audit:infografiken
pnpm build
pnpm audit:release-http-gates
```

Eine neue Grafik wird erst sichtbar, wenn HTML, Abbildung, PDF und Thumbnail
denselben freigegebenen fachlichen Stand zeigen.
