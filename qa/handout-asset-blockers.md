# Handout Asset Blocker Report

Stand: 2026-10-06
Technischer Publikationsstatus: `client/src/content/handoutGovernance.ts`
Vollständiges Dateiregister: `qa/handout-asset-manifest.json`

## Zweck

Dieser Report trennt technisch aktuell auslieferbare Druckgrafiken von
Textversionen, deren PDF-, WebP- oder Thumbnail-Fassung fachlich,
sicherheitsbezogen oder perspektivisch nicht mehr anschlussfähig ist. Eine
vorhandene Datei gilt nicht automatisch als fachlich oder institutionell
freigegeben. Auch der Codewert `approved` belegt keine menschliche Freigabe.

Das deterministische Vollregister erfasst alle 45 Governance-IDs, 42
registrierte Textpfade und die tatsächlich vorhandenen Dateien in `public`,
`withheld`, `archived` und `retired` mit SHA-256. Registrierte Katalogpfade
und Kandidatenversionen werden getrennt geführt. Historische Dateien ohne
belegte Zuordnung bleiben unzugeordnet; die entfernten Notfallkartenbytes
werden nicht anhand der README-Prüfsummen als vorhanden ausgegeben.

Für jeden registrierten Webpfad bindet ein zusätzlicher SHA-256 die tatsächliche
`HandoutTextVersion` mit Metadaten und Inhalt an den Snapshot. Die Serialisierung
prüft reine JSON-Werte, sortiert Objektschlüssel und erhält die Reihenfolge von
Listen. Sie misst weder gerendertes HTML noch semantische Text/PDF-Parität und
stellt keine gemeinsame Veröffentlichungs- oder Freigabeversion her.

Klinische, institutionelle, Perspektiven-, PDF/UA- und Druckfreigaben bleiben
im Register `unknown`. Das Dateiinventar, PDF-Tags und bestandene technische
Prüfungen ersetzen diese Entscheide nicht.

## Aktueller technischer Publikationsstand

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
- Die V3-Grafiken zu `warnsignale` und `spiegeln-statt-aufsaugen` stimmen
  nicht mit den vorsichtigeren aktuellen Texten überein. Ihre sechs PDF-,
  WebP- und Thumbnail-Dateien liegen unverändert mit geprüftem
  `SHA256SUMS` unter
  `qa/withheld-handouts/issue-650-content-drift-2026-10-06/`. Beide Familien
  bleiben `text-only`; alte Direkt-URLs und Download-IDs werden auf 404 geprüft.
- Die Notfallplan-Textversion ist aktuell; die ältere PDF- und Bildfassung ist
  wegen fehlender Schutzklauseln vorläufig zurückgezogen.
- Die allgemeine Notfallkarte wird gemäss
  `docs/governance/12-krisenwege-und-soforthilfe-entscheid-2026-10-06.md`
  dauerhaft auf `/soforthilfe` umgeleitet und darf nicht als zweite operative
  Kontaktquelle bestehen. Die
  frühere PDF- und WebP-Fassung bleibt dauerhaft ausgemustert; ihre Prüfsummen
  und Herkunft sind unter
  `qa/retired-handouts/notfallkarte-static-2026-10-05/` dokumentiert. Die alten
  Direktpfade bleiben dauerhaft gesperrt.

## Weiterhin technisch ausgelieferte Visuals

Diese fünf Familien werden durch die aktuelle Codekonfiguration ausgeliefert.
Die Tabelle dokumentiert diese Konfiguration und erteilt keine Freigabe:

| ID                    | Registrierte Version         |
| --------------------- | ---------------------------- |
| `kinder`              | `manus-kinder-v3`            |
| `4-arten-von-grenzen` | `puk-4-arten-von-grenzen-v1` |
| `garten`              | `puk-garten-v1`              |
| `genesung-zahlen`     | `manus-genesung-zahlen-v3`   |
| `stopp-technik`       | `manus-stopp-technik-v3`     |

Die 15 tatsächlich öffentlichen Dateien dieser fünf Familien werden gegen
die referenzierten Pfade und den Manifest-Snapshot geprüft. Dateiänderungen
benötigen eine überprüfbare Aktualisierung dieses technischen Registers.

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
  `grenzen-spickzettel`, `warnsignale`, `spiegeln-statt-aufsaugen` und
  `wenn-worte-treffen`.

`4-phasen` und `im-krisenmodus` sind zusätzlich vollständig `withdrawn` und
erscheinen auch nicht mehr als aktive Textversion.

`notfallkarte-zuerich` bleibt dauerhaft ohne PDF-, WebP- oder
Thumbnail-Fassung. Die frühere HTML-Webfassung wird nicht mehr als eigenes
Material angeboten; ihr Pfad leitet auf `/soforthilfe` um.

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
pnpm audit:handout-assets
pnpm build
pnpm audit:release-http-gates
```

Nach einer bewusst geprüften Datei- oder Registryänderung kann der technische
Snapshot mit `pnpm refresh:handout-assets` aktualisiert werden. Der Guard
meldet unregistrierte öffentliche Dateien, fehlende oder geänderte
registrierte Dateien, abweichende Paketprüfsummen und veraltete Snapshots.
Er liest keine fachlichen Freigaben aus Codeflags ab.

Eine neue Grafik darf erst sichtbar werden, wenn HTML, Abbildung, PDF und
Thumbnail gemeinsam geprüft und die erforderlichen menschlichen Freigaben
nachvollziehbar dokumentiert sind.
