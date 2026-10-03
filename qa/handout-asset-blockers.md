# Handout Asset Blocker Report

Stand: 2026-10-04
Basis: aktuelles `main` nach dem fachlich-inhaltlichen und visuellen Audit
Quelle der Wahrheit: `client/src/content/handoutGovernance.ts`

## Zweck

Dieser Report trennt aktuelle, anschlussfähige Druckgrafiken von Assets, deren
Bild- oder PDF-Fassung nicht mehr zuverlässig zur aktuellen HTML-Textversion
passt. Eine vorhandene Datei gilt nicht automatisch als publizierbar. Erst die
fachliche, sprachliche, visuelle und barrierebezogene Freigabe erlaubt die
Rückkehr in Empfehlungsflächen.

## Kurzurteil

- 42 Vollgrafiken sind direkt in den Content-Registern referenziert.
- 27 davon sind aktuell anschlussfähig und bleiben sichtbar.
- 15 ältere beige «Manus»-Grafiken bilden den verbleibenden Drift-Block.
- Es fehlen keine referenzierten Dateien.
- Fünf P1-Assets werden bis zum Ersatz nur als aktuelle HTML-Textversion
  angeboten. Die veraltete Vorschau und das PDF werden nicht mehr beworben.
- Zehn P2-Assets bleiben für einen nachfolgenden visuellen Pass vorgemerkt.

## Bereits aktualisiert und beizubehalten

Diese Versionen sind mit den aktuellen Textfassungen synchronisiert und dürfen
nicht durch ältere, bloss höher nummerierte oder unreferenzierte Varianten
ersetzt werden:

| ID                    | Freigegebene Version         |
| --------------------- | ---------------------------- |
| `genesung-zahlen`     | `manus-genesung-zahlen-v3`   |
| `kinder`              | `manus-kinder-v3`            |
| `stopp-technik`       | `manus-stopp-technik-v3`     |
| `dear`                | `puk-dear-v1`                |
| `garten`              | `puk-garten-v1`              |
| `4-arten-von-grenzen` | `puk-4-arten-von-grenzen-v1` |
| `radikale-akzeptanz`  | `puk-radikale-akzeptanz-v1`  |
| `gespraeche-kippen`   | `puk-gespraeche-kippen-v1`   |
| `beispiel-dialog`     | `puk-beispiel-dialog-v1`     |

Die drei zuletzt genannten Praxisblätter bilden das P1-Illustrationspaket vom 4. Oktober 2026. Sie verwenden dieselbe korrigierte Inhaltsquelle für die
semantische Webdarstellung und den A4-Export. Vollbild und Thumbnail werden aus
dem PDF-Seitenbild erzeugt. Die früheren `manus-*`-Dateien bleiben vorerst als
Vergleichsstand erhalten, sind aber nicht mehr referenziert.

Ebenfalls anschlussfähig sind die neueren PUK-Illustrationen unter
`/puk/illustrations`, die Hero-SVGs und die aktuellen Inline-Diagramme sowie die
hochversionierten Modelle Eisberg v8, Pendel v16, Alarm v4, Ampel v4,
Deeskalation v11, Validierung v10, Sauerstoff v5 und Fortschritt v5.

## P1: vorläufig nur HTML-Textversion

Diese Assets haben `visualAssetStatus: "text-only"`. Ihre Dateien bleiben als
Arbeits- und Vergleichsstand erhalten, erscheinen aber nicht mehr als Vorschau,
PDF-Link oder Download in der Website.

| ID                       | Problem                                                            | Nächster Schritt                                  |
| ------------------------ | ------------------------------------------------------------------ | ------------------------------------------------- |
| `4-phasen`               | Starres Zyklusmodell und problematische Verantwortungszuschreibung | Fachlich neu konzipieren und illustrieren         |
| `gehirn`                 | Vereinfachende Lokalisierung und deterministische Neuroaussagen    | Funktionales Stress-/Anspannungsmodell entwickeln |
| `remission-heilung`      | Unzutreffende Dichotomie; Recovery fehlt                           | Begriffe fachlich neu ordnen und illustrieren     |
| `5-faktoren-genesung`    | Kausale Übervereinfachungen und starke Forschungsbehauptung        | Evidenz prüfen, danach neu illustrieren           |
| `rolle-genesungsprozess` | Legt zu viel Genesungsverantwortung bei Angehörigen                | Neu illustrieren und klar entlasten               |

## P2: nächstes Asset-Paket

### Neu illustrieren

- `leuchtturm`
- `konsistenz-prinzip`
- `energie-konto`
- `grenzen-erkennen`
- `lmk`

### Aus den aktuellen Textversionen neu exportieren

- `drei-saeulen`
- `beziehungs-achtsamkeit`
- `6-leitlinien`
- `4-alltags-tipps`
- `erlaubnis-karte`

## Operative Regeln

1. Eine unreferenzierte v2-Datei nie automatisch aktivieren. Mehrere davon sind
   nur Varianten derselben überholten Gestaltung.
2. Inhalt zuerst in der aktuellen HTML-Textversion prüfen und freigeben.
3. Flache WebP-/PDF-Dateien nicht punktuell übermalen. Aus einer editierbaren
   Quelle neu aufbauen und exportieren.
4. Nach fachlicher und visueller Freigabe eine neue Assetversion vergeben,
   `approvedVersion` aktualisieren und `visualAssetStatus` entfernen.
5. Danach Inventar, Governance, Textversionen, Responsive Layout,
   Tastaturbedienung und PDF-Vorschau erneut prüfen.

## Verifikation

Mindestens ausführen:

```bash
pnpm test -- handout-governance
pnpm test -- handout-text-versions
pnpm build
pnpm audit:release-http-gates
```

Eine neue Grafik wird erst wieder sichtbar geschaltet, wenn Text, Abbildung und
PDF denselben fachlichen Stand zeigen.
