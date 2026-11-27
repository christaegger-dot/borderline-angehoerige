# r4-78 · Korrektur der Suche nach der Nachprüfung von r4-77 (N848-1 bis N848-3)

Stand 27.11.2026 · Ausgangsstand `main` `69bb868` (Website r4-77) · **gebaut von der Sitzung, die r4-77 nachgeprüft hat** (PR #851). Diese Sitzung ist für r4-78 damit nicht unabhängig: **Vor dem Merge braucht es eine Nachprüfung durch eine Sitzung, die weder r4-77 noch r4-78 gebaut oder geprüft hat.**

Dieser Bericht und die Dateien dieses Ordners enthalten Suchanfragen im Wortlaut, auch zu Suizid, Selbstverletzung und Gewalt. Sie gehören nicht in die Pendenzendatei.

## 1 Auftrag

Nach der Nachprüfung von r4-77 standen drei Entscheide offen (Pendenzendatei, Abschnitt «r4-77»):
- N848-1: Den Druck-Abschnitt bei einer Suiziddrohung anheften oder den Verlust hinnehmen.
- N848-2: Die Vorrang-Regel behalten oder streichen; die Prüfsitzung hat «streichen» empfohlen.
- N848-3: Die Verneinungsregel behalten oder streichen; die Prüfsitzung hat «streichen» empfohlen.

Antwort von Christa Egger, 27.11.2026: «ok, leg los».

Bei N848-2 und N848-3 setzt diese Sitzung die Empfehlung um. Bei N848-1 hat sie die Variante «anheften» gewählt, weil nur sie den Verlust gegenüber r4-76 rückgängig macht. **Diese Wahl ist eine Lesart der Antwort und muss bestätigt werden.**

## 2 Was sich ändert

Nur das Verhalten in `authoring/js/interaktion.js` (Funktion `queryGroups` und die Anheftung in `renderSearch`). Dazu kommt die Versionskennung (`contract.js`, `site.config.json`). Neu sind nur die Drohwörter für N848-1; der Suchindex und die übrigen Wortlisten bleiben unverändert.

1. **N848-1:** Enthält die Anfrage ohne Tötungswort ein Suizid-Signal und ein Wort des Drohens, folgt «Wenn Suizid angesprochen wird» direkt auf den Suizidabschnitt. Als Drohwort zählt «droht», «drohen», «drohte», «drohten», «drohst», «drohe», «gedroht», «androht» oder «angedroht», oder ein Wort mit «drohung» (z. B. «Suiziddrohung»). «bedroht» zählt nicht, weil es zur Gewaltgruppe gehört. Mit Tötungswort bleibt der Druck-Abschnitt wie bisher zuerst (R25-010).
2. **N848-2:** Die Regel `pinsAfterSafetyLead` ist entfernt. Angeheftete Abschnitte stehen immer zuerst; `renderSearch` ist dort wieder wie in r4-76.
3. **N848-3:** Die Verneinungsregel ist entfernt. Ein verneintes Wort für Selbstverletzung oder Gewalt heftet an, wie schon ein verneintes Suizidwort.
4. **Unverändert** bleiben die Anfragen mit Tötungswort und die Anfragen mit Suizid und Gewalt zusammen.

## 3 Messung

Gemessen in Chromium (Playwright aus `/opt/borderline-browser`). Als Bezug dienen r4-77 (`69bb868`, `site/`) und r4-76 (`451b20f`).

| Messung | Ergebnis |
|---|---|
| Suchraster gegen r4-77 (45 610 Anfragen, leere Ausnahmenliste) | **0 Verschlechterungen** (`ergebnis/raster-gegen-r4-77.txt`) |
| Suchraster gegen r4-76 | 268 Verdrängungen, alle von Platz 2 auf Platz 3: 178 × «Wenn Suizid angesprochen wird», 68 × Kinderschutz, 16 × Suizid, 6 × Gewalt. Das sind die schon in r4-77 hingenommenen Fälle ohne die 30 Suiziddrohungen aus N848-1. 0 verloren, 0 leer, 0 Anheftung verloren (`ergebnis/raster-gegen-r4-76.txt`) |
| Anfragen mit alter Anheftung (Tötungswort, Suizid und Gewalt): 5 687 | Treffer und Anheftung in r4-78 gleich wie in r4-77, alle 5 687 |
| Vollauswertung erste sechs Treffer gegen r4-77 | kein Sicherheitsabschnitt fällt aus den ersten zwei, keine Anfrage leer, keine Anheftung verloren, jeder angeheftete Abschnitt steht oben. Getauscht werden nur Platz 1 und 2 unter Sicherheitsabschnitten: 733 × Gewalt vor Kinderschutz (vorher Kinderschutz zufällig zuerst), 47 × Selbstverletzung vor Suizid, 22 × Selbstverletzung vor Gewalt, 4 × Suizid vor Druck, 1 × Suizid vor Selbstverletzung |
| Rasteranfragen mit «droh», bei denen r4-76 den Druck-Abschnitt unter den ersten zwei hatte (66) | Druck-Abschnitt unter den ersten zwei: r4-77 bei 36, r4-78 bei allen 66 |
| alle Rasteranfragen mit «droh» und «Suizid»/«Selbstmord» (925; viele mit Tötungswort) | Druck-Abschnitt unter den ersten zwei: r4-76 45, r4-77 15, r4-78 690 |
| Abdeckung (Skript der Gegenprüfung #846, 23 328 Sätze) | unverändert 65,1 % (r4-76: 43,3 %), leere Antworten unverändert 4 257 (`ergebnis/abdeckung-r4-76-r4-77-r4-78.txt`) |
| 281 Proben der Nachprüfung r4-77 | gegen r4-76 kein Sicherheitsabschnitt aus den ersten zwei verloren, keine Anfrage leer (`ergebnis/proben-r4-76-r4-78.tsv`, `ergebnis/proben-r4-77-r4-78.tsv`) |

Beispiele (r4-77 → r4-78, erste zwei Treffer):

| Anfrage | r4-77 | r4-78 |
|---|---|---|
| Er droht mit Suizid, wenn ich ihn verlasse | Suizid > «Verlassen» | Suizid > Druck |
| Suiziddrohung | Suizid > Krisenseite | Suizid > Druck |
| Ich brauche Hilfe, mein Partner schlägt mich | Kinderschutz > Gewalt | Gewalt > Kinderschutz |
| Ich will nicht geschlagen werden | kein Sicherheitsabschnitt | Gewalt zuerst |
| Ich will nicht ritzen, aber der Druck ist gross | kein Sicherheitsabschnitt | Selbstverletzung zuerst |
| Er schlägt mich vor den Kindern | Kinderschutz > Gewalt | Gewalt > Kinderschutz |
| Er hat mich nie geschlagen | kein Sicherheitsabschnitt | Gewalt zuerst (gewollte Folge von N848-3) |

## 4 Gates

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise |
| `build.mjs --production --verify-site` | 35 Dateien byte-gleich |
| `selftest.mjs` | 127/127 |
| `suchtest.mjs site` | 247/247 (r4-77: 242/247; die 5 neuen Zeilen weichen ab) |
| `suchtest.mjs site authoring/tests/suche-ausbau-offen.tsv` | 0/29 (unverändert, Schritt 3) |
| `sprachtest.mjs site` | 74 bestanden |
| `layouttest.cjs` | 2 Abweichungen (2 bekannt, 0 neu) |

Geändert in `site/`: in den 24 HTML-Dateien nur die Kennung, dazu `js/interaktion.js`. Neu in `suche-ersttreffer.tsv` sind fünf Zeilen, die N848-1 bis N848-3 festhalten.

## 5 Abwägungen und Grenzen

- **N848-1, Lesart:** «anheften» statt «hinnehmen» (Abschnitt 1). Der Druck-Abschnitt steht auf Platz 2, nicht auf Platz 1 wie bei Tötungswörtern, weil der Suizidabschnitt bei jedem Suizid-Signal zuerst steht. Ein Drohwort, das sich nicht auf den Suizid bezieht («Er droht mir, ich habe Suizidgedanken»), heftet den Druck-Abschnitt ebenfalls an; das kostet einen Platz.
- **N848-2:** Bei Kindern als Zeugen («vor den Kindern») steht der Kinderschutz jetzt auf Platz 2, vorher auf Platz 1. Diese Anfragen enthalten das Schutzwort «vor» und zählen deshalb nicht als «Kinder betroffen». Ob Kinder als Zeugen den Kinderschutz zuerst bekommen sollen, ist eine fachliche Frage für Schritt 3.
- **N848-3:** Verneinte Sätze ohne Anlass («Er hat mich nie geschlagen», «Es gab nie Gewalt») zeigen jetzt zuerst einen Sicherheitsabschnitt. Das ist die gewollte Seite der Abwägung.
- Das Raster ist laut N847-2 bis N847-5 noch nicht gehärtet; eine grüne CI gilt nicht als Freigabe nach R34-P01. Deshalb gibt es die Vollauswertung und die Proben oben. N848-4 bis N848-6 sind nicht Teil dieses Schritts.
- Keine echten Geräte, keine Screenreader, keine fachliche Prüfung.

## 6 Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
mkdir -p /tmp/r477 /tmp/r476 && git archive 69bb868 site | tar -x -C /tmp/r477 && git archive 451b20f site | tar -x -C /tmp/r476
node authoring/tools/build.mjs --production --out=site --write-site
node authoring/tools/suchtest.mjs site
node authoring/tools/suchraster.mjs /tmp/r477/site site
node authoring/tools/suchraster.mjs /tmp/r476/site site
node audit-results/2026-11-26-gegenpruefung-r4-76-saldo/abdeckung.cjs audit-results/2026-11-26-rueckbau-suche-r4-76/raster.cjs /tmp/abdeckung.txt r4-76=/tmp/r476/site r4-77=/tmp/r477/site r4-78=site
node audit-results/2026-11-26-nachpruefung-r4-77/werkzeug/probe.cjs /tmp/r477/site site <proben.tsv> /tmp/proben.tsv
```
Die Vollauswertung über die ersten sechs Treffer folgt `audit-results/2026-11-26-nachpruefung-r4-77/werkzeug/auswertung.md`.
