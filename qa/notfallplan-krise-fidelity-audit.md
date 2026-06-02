# Notfallplan Krise Fidelity Audit

Stand: 2026-06-02  
Asset: `notfallplan-krise-v03`  
Dateien:

- `client/public/notfallplan-krise-v03.pdf`
- `client/public/notfallplan-krise-v03-preview.webp`
- Web-Textversion: `/materialien/text/notfallplan-krise`

## Kurzurteil

`notfallplan-krise-v03` ist als PDF/WebP nicht mehr vollständig synchron mit
der gehärteten Web-Textversion. Der Drift ist P0-relevant, weil er
Krisenlogik, Notfallhierarchie und Selbstschutz-Caveats betrifft.

Empfehlung: v03 nicht als final fachlich synchrones Release-Asset behandeln.
Für den formalen Release ein neues `notfallplan-krise-v04` aus editierbarer
Quelle exportieren oder v03 bewusst als Restrisiko dokumentieren.

## Geprüfte Kriterien

| Kriterium                                                                                   | Web-Textversion                           | PDF/WebP v03                                                                         | Ergebnis        |
| ------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------ | --------------- |
| 144 bei akuter Lebensgefahr, laufender Selbstgefährdung, schwerer Intoxikation              | vorhanden                                 | vorhanden                                                                            | ok              |
| 117 bei Gewalt oder akuter Bedrohung                                                        | vorhanden                                 | nur in Kurzreferenz, nicht im Haupt-Akutblock                                        | Drift           |
| PUK 058er-Nummern nach Altersgruppen                                                        | Erwachsene, KJP, 65+ vorhanden            | nur Erwachsene `058 384 20 00` im Haupt-Akutblock; KJP/65+ fehlen                    | Drift           |
| 143 als Entlastung/Gespräch, kein Einsatzdienst                                             | vorhanden                                 | vorhanden, aber in Kurzreferenz vor 117 gruppiert                                    | teilweise Drift |
| Selbstschutz-Caveat beim Nicht-allein-Lassen                                                | `sofern Sie selbst sicher bleiben können` | fehlt im Haupt-Akutblock                                                             | Drift           |
| Selbstschutz-Caveat bei `dableiben`                                                         | `wenn es für Sie sicher ist`              | `ruhig bleiben und dableiben` ohne Caveat                                            | Drift           |
| Akute Gefahr nicht allein lassen nur mit Hilfe/Sicherheitsplan/professioneller Einschätzung | vorhanden                                 | `die Person trotz akuter Gefahr allein lassen` ohne Hilfe-/Einschätzungspräzisierung | Drift           |
| Keine Suizidmethoden-Details                                                                | keine methodenspezifischen Details        | keine methodenspezifischen Details                                                   | ok              |
| Disclaimer professionelle Beurteilung                                                       | vorhanden                                 | vorhanden                                                                            | ok              |

## Konkrete Drift-Befunde aus PDF/WebP v03

### 1. Selbstschutz-Caveat fehlt im Haupt-Akutblock

PDF v03:

> Person möglichst nicht allein lassen. Gefährliche Gegenstände, Medikamente,
> Alkohol oder andere Mittel wenn möglich entfernen.

Web-Textversion:

> Die Person nach Möglichkeit nicht ohne Hilfe, Notfallplan oder professionelle
> Einschätzung allein lassen – sofern Sie selbst sicher bleiben können.

Bewertung: Das PDF sagt fachlich das Richtige in der Grundrichtung, aber nicht
präzise genug. Der heutige Selbstschutz-Zusatz ist wichtig, damit Angehörige
sich nicht selbst in Gefahr bringen.

### 2. `Dableiben` steht ohne Sicherheitsbedingung

PDF v03:

> ruhig bleiben und dableiben

Web-Textversion:

> ruhig bleiben und, wenn es für Sie sicher ist, dableiben

Bewertung: Auf einem Krisenhandout ist dieser Unterschied relevant. Dableiben
darf nicht als Pflicht verstanden werden, wenn Angehörige bedroht oder selbst
überfordert sind.

### 3. Notfallnummern-Hierarchie ist nicht mehr vollständig

PDF v03 Haupt-Akutblock:

- `144 Sanität`
- `0800 33 66 55 AERZTEFON`
- `058 384 20 00 PUK Zürich Notfall Erwachsene`

Web-Textversion:

- `144 Sanität`
- `117 Polizei`
- `0800 33 66 55 Ärztefon`
- `058 384 20 00 PUK Zürich Notfall Erwachsene`
- `058 384 66 66 PUK Kinder und Jugendliche`
- `058 384 46 82 PUK ab 65`
- `143 Dargebotene Hand`

Bewertung: Das PDF ist nicht falsch im engeren Sinn, aber unvollständig und
anders priorisiert. Vor allem `117`, KJP und 65+ fehlen im Haupt-Akutblock.

### 4. Kurzreferenz enthält zusätzliche/anders gewichtete Kontakte

PDF v03 Kurzreferenz:

- `143 Dargebotene Hand`
- `117 Polizei`
- `058 384 38 00 Fachstelle Angehörigenarbeit PUK`

Web-Textversion Kurzreferenz:

- `117 Polizei`
- `143 Dargebotene Hand`
- `058 384 66 66 PUK Kinder und Jugendliche`
- `058 384 46 82 PUK ab 65`
- Fachstelle Angehörigenarbeit PUK als Angehörigen-Ergänzung

Bewertung: Die Fachstelle darf als Angehörigen-Ergänzung vorkommen, sollte aber
nicht wie ein Akutkontakt wirken. Die Reihenfolge und Gruppierung sollten klarer
zwischen Einsatzdienst, psychiatrischer Krise und Entlastung unterscheiden.

## Anforderungen an `notfallplan-krise-v04`

Ein neues Asset sollte mindestens diese Punkte erfüllen:

1. Akut-Hierarchie klar trennen:
   - `144` bei akuter Lebensgefahr, laufender Selbstgefährdung, schwerer
     Selbstverletzung, Bewusstlosigkeit oder schwerer Intoxikation.
   - `117` bei Gewalt, akuter Bedrohung oder wenn sofort Schutz vor Ort nötig
     ist.
   - PUK-058er-Nummern für psychiatrische Krise ohne unmittelbare
     Lebensgefahr: Erwachsene, Kinder/Jugendliche, 65+.
   - `143` als Entlastung/Gespräch, ausdrücklich kein Einsatzdienst.
2. Alle Nummern aus `client/src/data/kontakte.ts` übernehmen.
3. Nicht-allein-lassen immer mit Selbstschutz rahmen:
   - `sofern Sie selbst sicher bleiben können`
   - oder gleichwertige Formulierung.
4. `Dableiben` nur mit Sicherheitsbedingung formulieren.
5. Keine zusätzlichen methodenspezifischen Suizidinformationen ergänzen.
6. Fachstelle Angehörigenarbeit höchstens als Angehörigen-Ergänzung, nicht als
   Akut-Einsatzdienst darstellen.
7. Footer/Stand eindeutig halten:
   - `Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich`
   - Asset-Version `v04`
   - Stand-/Review-Logik konsistent zur Materialkarte.

## Operativer nächster Schritt

Neues `notfallplan-krise-v04` aus editierbarer Quelle exportieren. Danach:

1. `client/public/notfallplan-krise-v04.pdf` und Preview ablegen.
2. `client/src/content/handoutGovernance.ts` auf `notfallplan-krise-v04`
   aktualisieren.
3. `client/src/content/materialien.ts` auf v04 aktualisieren.
4. Release-HTTP-Gates gegen das neue PDF/Preview laufen lassen.
