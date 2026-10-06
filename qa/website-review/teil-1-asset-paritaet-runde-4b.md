# Review Website Teil 1: Asset-Parität – Runde 4B

Prüfstand: `main` @ `36e4aae6` (06.10.2026). Geprüft wurden Register,
Governance-Status, tatsächliche Ablageorte und Paketvollständigkeit aller 42
Handoutfamilien. Bei publizierten beziehungsweise fachlich besonders relevanten
Familien wurden Textfassungen und extrahierbare beziehungsweise per OCR lesbare
PDF-Inhalte gezielt verglichen. Dieses Dokument ist ein KI-gestütztes
redaktionelles und technisches Review; es ist keine fachliche, rechtliche oder
institutionelle Freigabe. Produktionsinhalte wurden nicht verändert.

## 1. Ergebnis in Zahlen

- 42 Textversionen sind registriert.
- Für alle 42 IDs existieren PDF, Vollbild-WebP und Thumbnail beziehungsweise
  Preview-Datei an einem Public-, Withheld- oder Archivort.
- 24 Einträge tragen den technischen Status `approved`, 18 den Status
  `draft-editorial-review-pending`.
- Nur sieben visuelle Familien sind tatsächlich produktiv veröffentlicht; sie
  bilden genau 21 Dateien in `client/public/infografiken`.
- 20 vollständige Familien werden bewusst in QA-Verzeichnissen zurückgehalten.
- 15 vollständige Familien liegen nur im Archiv.
- Im produktiven Infografik-Verzeichnis wurden keine zusätzlichen oder
  verwaisten Dateien gefunden.

Damit ist die Dateivollständigkeit besser als die sichtbaren Metadaten vermuten
lassen. Vollständige Dateien bedeuten jedoch noch keine Inhaltsparität oder
Publikationsfreigabe.

## 2. Legende

- **A/P:** approved / visuell publiziert
- **A/T:** approved / text-only
- **D/P:** Draft / formal visuell `published`, durch den Draftstatus aber
  zurückgehalten
- **D/T:** Draft / text-only
- **Public:** `client/public/infografiken`
- **W615:** `qa/withheld-handouts/issue-615-visual-refresh-2026-10-05`
- **WP1:** `qa/withheld-handouts/p1-illustrations-v3-2026-10-04`
- **W633:** `qa/withheld-handouts/issue-633-fachquellen-2026-10-05`
- **Archiv:** `qa/archived-handouts/anti-stigma-p1-2026-10-04`

«Vollständiges Trio» bezeichnet in der Inventartabelle zunächst nur die
Dateivollständigkeit. Ausserhalb der hashgebundenen W615-/P1-Pakete ist damit
noch keine visuelle oder semantische Gleichheit von PDF, WebP und Thumbnail
bewiesen.

## 3. Vollständiges Inventar

|   # | ID                         | Assetversion                              | Status | Tatsächlicher Ablageort                        |
| --: | -------------------------- | ----------------------------------------- | ------ | ---------------------------------------------- |
|   1 | `notfallplan-krise`        | `notfallplan-krise-v04`                   | A/T    | Archiv `public-root`, PDF und Preview-WebP/PNG |
|   2 | `leuchtturm`               | `puk-leuchtturm-orientierung-v2`          | D/T    | W615, vollständiges Trio                       |
|   3 | `rolle-klaeren`            | `manus-rolle-klaeren-v3`                  | A/T    | Archiv, vollständiges Trio                     |
|   4 | `drei-saeulen`             | `puk-drei-orientierungspunkte-v2`         | D/T    | W615, vollständiges Trio                       |
|   5 | `konsistenz-prinzip`       | `puk-verlaessliche-absprachen-v2`         | D/T    | W615, vollständiges Trio                       |
|   6 | `beziehungs-achtsamkeit`   | `puk-beziehungs-achtsamkeit-v2`           | D/T    | W615, vollständiges Trio                       |
|   7 | `6-leitlinien`             | `puk-sechs-leitlinien-v2`                 | D/T    | W615, vollständiges Trio                       |
|   8 | `4-alltags-tipps`          | `puk-vier-alltagsfragen-v2`               | D/T    | W615, vollständiges Trio                       |
|   9 | `eisberg`                  | `eisberg-der-eisberg-v8`                  | A/T    | Archiv, vollständiges Trio                     |
|  10 | `spaltung`                 | `pendel-das-bewertungs-pendel-v16`        | A/T    | Archiv, vollständiges Trio                     |
|  11 | `zustands-landkarte`       | `puk-zustands-landkarte-v1`               | D/T    | W615, vollständiges Trio                       |
|  12 | `krisenkommunikation`      | `deeskalation-der-deeskalations-pfad-v11` | A/T    | Archiv, vollständiges Trio                     |
|  13 | `anspannungskurve`         | `manus-anspannungskurve-v2`               | A/T    | Archiv, vollständiges Trio                     |
|  14 | `alarm-modus`              | `alarm-der-alarm-modus-v4`                | A/T    | Archiv, vollständiges Trio                     |
|  15 | `gehirn`                   | `puk-hohe-anspannung-v1`                  | D/T    | W615, vollständiges Trio                       |
|  16 | `warnsignale`              | `manus-warnsignale-v3`                    | A/P    | Public, vollständiges Trio                     |
|  17 | `sauerstoffmaske`          | `sauerstoff-die-sauerstoffmaske-v5`       | A/T    | Archiv, vollständiges Trio                     |
|  18 | `stopp-technik`            | `manus-stopp-technik-v3`                  | A/P    | Public, vollständiges Trio                     |
|  19 | `energie-konto`            | `puk-energie-konto-v2`                    | D/T    | W615, vollständiges Trio                       |
|  20 | `erlaubnis-karte`          | `puk-erlaubnis-karte-v2`                  | D/T    | W615, vollständiges Trio                       |
|  21 | `schuld-verantwortung`     | `manus-schuld-verantwortung-v3`           | A/T    | Archiv, vollständiges Trio                     |
|  22 | `radikale-akzeptanz`       | `puk-radikale-akzeptanz-v3`               | D/P    | WP1, vollständiges Trio                        |
|  23 | `wenn-worte-treffen`       | `manus-wenn-worte-treffen-v3`             | A/T    | Archiv, vollständiges Trio                     |
|  24 | `gespraeche-kippen`        | `puk-gespraeche-kippen-v3`                | D/P    | WP1, vollständiges Trio                        |
|  25 | `grenzen-ohne-eskalation`  | `manus-grenzen-ohne-eskalation-v3`        | A/T    | Archiv, vollständiges Trio                     |
|  26 | `pause-statt-streit`       | `manus-pause-statt-streit-v3`             | A/T    | Archiv, vollständiges Trio                     |
|  27 | `zuhoeren-ohne-zustimmen`  | `validierung-die-validierungs-treppe-v10` | A/T    | Archiv, vollständiges Trio                     |
|  28 | `beispiel-dialog`          | `puk-beispiel-dialog-v3`                  | D/P    | WP1, vollständiges Trio                        |
|  29 | `dear`                     | `puk-dear-v1`                             | A/T    | W633, vollständiges Trio                       |
|  30 | `bruecke-gelaender`        | `manus-bruecke-gelaender-v2`              | A/T    | Archiv, vollständiges Trio                     |
|  31 | `spiegeln-statt-aufsaugen` | `manus-spiegeln-statt-aufsaugen-v3`       | A/P    | Public, vollständiges Trio                     |
|  32 | `4-arten-von-grenzen`      | `puk-4-arten-von-grenzen-v1`              | A/P    | Public, vollständiges Trio                     |
|  33 | `grenzen-erkennen`         | `puk-grenzen-ueberlastung-v2`             | D/T    | W615, vollständiges Trio                       |
|  34 | `lmk`                      | `puk-grenze-in-handlung-v2`               | D/T    | W615, vollständiges Trio                       |
|  35 | `garten`                   | `puk-garten-v1`                           | A/P    | Public, vollständiges Trio                     |
|  36 | `genesung-zahlen`          | `manus-genesung-zahlen-v3`                | A/P    | Public, vollständiges Trio                     |
|  37 | `fortschritt-paradox`      | `fortschritt-das-fortschritt-paradox-v5`  | A/T    | Archiv, vollständiges Trio                     |
|  38 | `remission-heilung`        | `puk-remission-recovery-v2`               | D/T    | W615, vollständiges Trio                       |
|  39 | `5-faktoren-genesung`      | `puk-genesungsbedingungen-v2`             | D/T    | W615, vollständiges Trio                       |
|  40 | `rolle-genesungsprozess`   | `puk-rolle-genesungsprozess-v2`           | D/T    | W615, vollständiges Trio                       |
|  41 | `kinder`                   | `manus-kinder-v3`                         | A/P    | Public, vollständiges Trio                     |
|  42 | `grenzen-spickzettel`      | `manus-grenzen-spickzettel-v2`            | A/T    | W633, vollständiges Trio                       |

## 4. P1 – Releaseblocker

### R4B-P1-01 – `warnsignale` ist nicht mehr inhaltsgleich mit der publizierten Grafik

- **Beobachtung:** Die aktuelle Textversion verwendet andere Abschnittstitel,
  Signale, Einordnungen und Handlungssätze als das veröffentlichte PDF/WebP.
  Das PDF ist ein ungetaggtes Bild-PDF ohne Textschicht; der Unterschied wurde
  deshalb zusätzlich anhand des gerenderten Blatts und OCR kontrolliert.
- **Wirkung:** Textversion und Download vermitteln nicht dieselbe Fassung. Eine
  Nutzerin kann je nach Format unterschiedliche Aussagen zu einer vermeintlichen
  Ampellogik und zu nächsten Schritten erhalten.
- **Empfehlung:** Bis zu einer fachlich überarbeiteten Neugenerierung auf
  `text-only` setzen. Wegen des P1-Befunds zum nicht validierten Stufenmodell aus
  Runde 4A nicht bloss die alte Grafik aus dem neuen Text reproduzieren, sondern
  Inhalt und Modell zuerst fachlich entscheiden.

### R4B-P1-02 – `spiegeln-statt-aufsaugen` ist nicht mehr inhaltsgleich mit der publizierten Grafik

- **Beobachtung:** Die Web-Textversion unterscheidet Beobachtung, vorsichtige
  Vermutung, offene Rückfrage, mögliche Wirkung und eigene Orientierung. Die
  publizierte Grafik nutzt weiterhin das ältere dreistufige Modell
  «Wahrnehmen – Spiegeln – Bei mir bleiben» mit anderen Beispiel- und
  Sicherheitssätzen.
- **Wirkung:** Die ältere Grafik enthält weniger Korrekturmöglichkeit für die
  Perspektive der anderen Person und trägt nicht die inzwischen ergänzten
  Grenzen der Methode.
- **Empfehlung:** Publizierte Grafik/PDF bis zur Neugenerierung aus der aktuellen,
  fachlich geprüften Fassung auf `text-only` setzen.

### R4B-P1-03 – `gespraeche-kippen` ist schon vor einer Freigabe überholt

- **Beobachtung:** Die aktuelle Webfassung nennt Schritt 1 «Eigenes Tempo
  senken». Das zurückgehaltene V3-Paket nennt denselben Schritt «Beruhigen».
- **Wirkung:** Eine spätere Freigabe des vorhandenen Pakets würde unmittelbar
  wieder eine veraltete und stärker steuernde Benennung publizieren.
- **Empfehlung:** Das Trio nach dem fachlichen Entscheid zum Kommunikationsmodell
  aus dem aktuellen Text neu erzeugen und erneut gemeinsam prüfen; nicht nur den
  Titel in einer einzelnen Datei ändern.

## 5. P2 – wichtige Governance- und Paritätsbefunde

### R4B-P2-01 – P1-Manifest nennt nicht mehr die tatsächlichen Ablageorte

`handouts/p1-illustrations/manifest.json` nennt für alle neun V3-Dateien
weiterhin die vorgesehenen Zielpfade unter `client/public/...`. Tatsächlich
liegen sie in WP1. Das Audit übersetzt die Pfade intern mit
`resolveWithheldAsset()`. Damit mischt das Manifest Zielpfad und Ist-Ablage und
ist allein kein verlässliches Bestandsregister.

**Empfehlung:** Tatsächlichen Ablageort und vorgesehenen Zielpfad getrennt
modellieren; keine implizite Pfadumschreibung im Audit.

### R4B-P2-02 – 35 zurückgehaltene Einträge tragen nicht existente Public-URLs

`previewImageUrl` und `pdfSourceUrl` zeigen weiterhin auf Dateien, die bewusst
nicht in `client/public` liegen. Die Laufzeit unterdrückt die Bedienelemente
derzeit korrekt über `isHandoutVisualPublished()`. Bei 13 der 15 W615-Entwürfe
zeigen die Felder zusätzlich auf retirierte `manus-*`-Pfade, während
`assetVersion` bereits das neue `puk-*`-Paket bezeichnet. `zustands-landkarte`
und `gehirn` verweisen schon auf ihre `puk-*`-Fassung.

**Empfehlung:** Soll-, Ist- und Veröffentlichungs-URL getrennt modellieren. Für
nicht publizierte Assets keine scheinbar gültige Public-URL als Bestandsangabe
führen.

### R4B-P2-03 – W615 ist der belastbarste, aber nur partielle Standard

Für alle 15 W615-Familien stimmen aktuelles Web-Textobjekt,
`sourceTextSha256`, HTML-Quelle, Manifestdateien, Asset-Hashes und Dateigrössen.
Das Fachreview-Audit für die fünf gelockten Kandidaten lief erfolgreich.

**Empfehlung:** Dieses Modell als Grundlage für alle 42 Familien verwenden und
um menschliche Freigabe, PDF-UA/Matterhorn sowie Druck- und Perspektiventests
ergänzen.

### R4B-P2-04 – Für die sieben Public-Familien fehlt ein gemeinsamer Freigabenachweis

`stopp-technik`, `genesung-zahlen` und `kinder` zeigen eine hohe Textnähe.
`4-arten-von-grenzen` und `garten` besitzen grössere, möglicherweise bewusst
erweiterte Webfassungen. Ohne gemeinsamen Quellhash und dokumentierten
Paritätsentscheid lässt sich nicht unterscheiden, ob eine Abweichung beabsichtigt
und freigegeben oder lediglich historisch gewachsen ist.

### R4B-P2-05 – W633 ist vollständig, aber nicht gleichwertig reproduzierbar dokumentiert

Die Pakete `dear` und `grenzen-spickzettel` sind vollständig und korrekt
zurückgehalten, besitzen aber kein W615 entsprechendes, hashgebundenes
Paketmanifest.

### R4B-P2-06 – Release-Gates sollten weiterhin mehrere Statusdimensionen gemeinsam prüfen

`radikale-akzeptanz`, `gespraeche-kippen` und `beispiel-dialog` haben formal
keinen `text-only`-Status, werden aber wegen
`draft-editorial-review-pending` korrekt nicht ausgeliefert. Der aktuelle Code
`isHandoutVisualPublished()` und die zugehörigen Tests werten Approval,
Publication und Visual-Status bereits gemeinsam aus; ein aktueller Defekt wurde
nicht gefunden.

**Empfehlung:** Diese Defense-in-depth beibehalten und für manuelle Releases um
physische Datei, Text-Hash, Asset-Hashes und dokumentierten Reviewentscheid
ergänzen. `visualAssetStatus` darf weder technisch noch organisatorisch als
alleiniges Freigabesignal verwendet werden.

## 6. P3 – struktureller Feinschliff

- Ein kanonisches Gesamtmanifest für alle 42 IDs einführen: Web-Text-Hash,
  Assetversion, Approval, Ablageklasse, PDF-/WebP-/Thumbnail-Pfade, Hashes,
  Masse und Prüfnachweise.
- Thumbnail-Namen und -Formate vereinheitlichen (`.webp` gegenüber
  `-thumb.png`).
- Archiv-, Withheld- und Public-Status nicht aus Pfadkonventionen ableiten,
  sondern explizit führen.
- `approvedVersion` bei text-only oder archivierten Grafiken sprachlich als
  «zuletzt redaktionell referenzierte Version» präzisieren, damit das Feld nicht
  wie eine aktuelle visuelle Publikationsfreigabe wirkt.

## 7. Vorhandene Sicherungen

- `client/src/__tests__/handout-governance.test.ts`
- `client/src/__tests__/infografik-assets.test.ts`
- `client/src/__tests__/handout-text-versions.test.tsx`
- `client/src/__tests__/materialien-library.test.tsx`
- `qa/scripts/audit-infografik-inventory.ts`
- `qa/scripts/audit-issue615-handouts.ts`
- `qa/scripts/audit-issue615-fachreview.ts`
- `qa/scripts/audit-p1-illustrations.ts`
- `scripts/prune-built-infografiken.mjs`

## 8. Grenzen dieser Runde

- Die Runde bestätigt Dateibestand und ausgewählte Inhaltsdrift, nicht die
  vollständige semantische Gleichheit aller 42 Familien.
- Der normalisierte Fragmentabgleich ist eine Wortlaut-Heuristik. Klare
  Textdrift und konkrete Gegenbeispiele sind belastbar; eine niedrige
  Trefferzahl allein beweist keine vollständige semantische Nichtgleichheit.
- Bild-PDFs ohne Textschicht erfordern visuelle beziehungsweise OCR-gestützte
  Prüfung; ein reiner `pdftotext`-Vergleich ist dafür ungeeignet.
- Ausserhalb der W615-/P1-Pakete wurden WebP und Thumbnail auf Existenz und
  Ablage, nicht pixelgenau auf Gleichheit mit dem PDF geprüft.
- PDF-UA/Matterhorn, Lesereihenfolge, reale Drucke, VoiceOver/NVDA und
  Nutzendentests bleiben gesonderte Gates.
- Die vollständigen Audits benötigen ein angeschlossenes `node_modules`; im
  isolierten Review-Worktree wurde das W615-Fachreview-Audit ausgeführt und die
  übrigen Befunde anhand von Manifest-Hashes, physischen Pfaden und Inhaltsdaten
  gegengeprüft.

## 9. Empfohlene Reihenfolge

1. `warnsignale` und `spiegeln-statt-aufsaugen` sofort auf `text-only` setzen;
   noch keine neue Grafik freigeben.
2. Das Kommunikationsmodell aus Runde 3 entscheiden und danach
   `gespraeche-kippen` neu erzeugen.
3. Ein Gesamtmanifest aus dem W615-Modell ableiten und Public-, Withheld- und
   Archivzustände aller 42 Familien darin erfassen.
4. Erst danach weitere visuelle Familien gemeinsam als Text, PDF, WebP und
   Thumbnail fachlich, visuell und barrierefrei prüfen.
