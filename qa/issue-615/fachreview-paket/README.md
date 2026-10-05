# Issue 615: Fach- und Perspektivenreview für fünf zurückgehaltene Handouts

Dieses Paket macht die menschliche Prüfung von fünf fachlich oder ethisch
sensiblen Handouts reproduzierbar. Es verändert weder die Handouts noch ihre
Auslieferung. Sämtliche Kandidaten bleiben unter `qa/withheld-handouts/` und
sind nicht als öffentliche Website-Assets freigegeben.

## Verbindlicher Prüfstand

- Basis-Commit: `1b806c27c8a52cbbabd7560c17f2f250a77256c3`
- Reviewrunde: 3
- ersetzt Reviewrunde 2 (`79091246f78411e283e48fdabba3ac4f751b3f6b`). Zu
  Runde 2 liegt eine KI-Simulation aller drei Perspektiven vor (Issue 625);
  ihre angenommenen Befunde sind in Runde 3 umgesetzt. Menschliche Entscheide
  liegen weiterhin nicht vor.
- maschinenlesbare Sperrdatei: `review-basis.json`
- Status: `human-review-pending`
- Veröffentlichung durch dieses Paket: **nein**
- Kandidaten: vier Orientierungsblätter und ein Praxisblatt

Die Sperrdatei hält je Blatt die Text-, HTML-, PDF-, WebP- und
Thumbnail-Prüfsummen fest. Ändert sich eine davon, gelten frühere Entscheide
für das betroffene Blatt nicht mehr. Das Audit
`pnpm audit:issue615-fachreview` bricht dann absichtlich ab.

Vor Reviewrunde 2 wurden ausschliesslich die freigegebenen Vorbereinigungen
umgesetzt: Mindestschriftgrösse 8 pt im Footer, präzisierte WHO- und
AWMF-Angaben, Web–PDF-Parität für vier bereits vorhandene Hinweise sowie die
diagnoseunabhängige Einordnung der Schutzregel. Die weitergehenden fachlichen,
rechtlichen und didaktischen Prüfhypothesen bleiben offen.

## Prüfreihenfolge

1. `review-basis.json` und die vier Fassungen jedes Blatts gemeinsam prüfen:
   Website-Textquelle, editierbares HTML, PDF und WebP/Thumbnail.
2. Verantwortete Fachperson füllt den jeweiligen Einzelbogen aus.
3. Eine Person mit eigener Borderline-Erfahrung und eine angehörige Person
   prüfen denselben Stand unabhängig voneinander. Sie sollen die Rückmeldung
   der jeweils anderen Person vorher nicht kennen.
4. Befunde in `06-befundauswertung.md` einzeln annehmen, verwerfen oder
   zurückstellen. Unterschiedliche Perspektiven bleiben sichtbar.
5. Bestätigte Korrekturen gezielt umsetzen und alle betroffenen Fassungen neu
   erzeugen. Danach einen neuen Prüfstand mit neuen Hashes anlegen und nur die
   betroffenen Prüfungen wiederholen.
6. Erst nach inhaltlicher Stabilität folgen reale Screenreader-Prüfung,
   PDF-UA-/Matterhorn-Prüfung, Nutzendentest und physischer Drucktest.

## Rollen und Datenschutz

Dokumentiert werden Funktion oder Perspektive, Datum und Entscheid. Es werden
keine Diagnosen, Krankengeschichten oder unnötigen personenbezogenen Daten der
Prüfenden erfasst. Fachprüfung und Erfahrungsperspektiven ersetzen einander
nicht.

## Prioritäten

- **P1 – wesentlich:** Risiko für fachliche Falschaussage, Stigmatisierung,
  Sicherheit, Rechte oder eine irreführende Handlungsanweisung.
- **P2 – wichtig:** relevante Unklarheit, fehlende Differenzierung,
  Quellenlücke oder erschwerte Verständlichkeit.
- **P3 – Feinschliff:** sprachliche oder visuelle Verbesserung ohne
  wesentliche Bedeutungsänderung.

## Dateien

- `01-remission-recovery.md`
- `02-genesungsbereiche.md`
- `03-angehoerigenrolle.md`
- `04-belastung-und-grenzen.md`
- `05-grenze-und-eigener-schritt.md`
- `quellen-und-aussagen.md`
- `06-befundauswertung.md`

Die KI-gestützte Vorprüfung ist in den Bögen als **offene Prüfhypothese**
eingetragen. Sie ist kein menschlicher Fachentscheid.

## Klare Freigabegrenze

Ein grüner Build, ein Merge, ein ausgefüllter Einzelbogen oder ein positives
KI-Review ist keine Publikationsfreigabe. Dieses Paket kann höchstens den
Übergang in die nachgelagerten technischen und realen Prüfungen begründen. Die
institutionelle Publikationsfreigabe bleibt ein eigener, ausdrücklicher
Entscheid.
