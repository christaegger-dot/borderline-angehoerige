# r4-77 · Bauweise der Suche: Sicherheitsabschnitte bei erkanntem Signal fest oben

Stand 26.11.2026 · gebaut von der Sitzung, die r4-74 bis r4-76 und das Suchraster gebaut hat · Ausgangsstand `main` `451b20f` (Website r4-76, Suche wie r4-73).

Dieser Bericht und die Dateien dieses Ordners enthalten Suchanfragen im Wortlaut, auch zu Suizid, Selbstverletzung und Gewalt. Sie gehören nicht in die Pendenzendatei.

## 1 Auftrag

Vorschlag nach dem Rückbau r4-76, Schritt 2: «Die Bauweise der Suche ändern: Erkennt die Suche ein Signal für Suizid, Selbstverletzung oder Gewalt, steht der passende Sicherheitsabschnitt fest oben, egal welche Wörter sonst in der Anfrage stehen.» Antwort von Christa Egger, 26.11.2026: «ok, leg los!»

Schritt 2 ergänzt **keine neuen Wörter**. Er nutzt nur die Signale, die die Suche schon heute erkennt. Neue Wörter, Beugungen, Tippfehler und Mundart folgen in Schritt 3.

## 2 Warum

Bisher heftete die Suche Sicherheitsabschnitte nur bei Tötungswörtern an (R34-P01) und bei Suizid und Gewalt zusammen. In allen anderen Fällen musste ein Treffer jeden Begriff der Anfrage enthalten. Ein zusätzliches Wort konnte so den passenden Sicherheitsabschnitt ausschliessen, und ein Sicherheitsabschnitt erschien oft nur zufällig oben. Das war die Ursache der Verschlechterungen in r4-74 und r4-75.

## 3 Was sich ändert

Nur `authoring/js/interaktion.js`, Funktion `queryGroups` und die Anheftung in `renderSearch`:

1. **Signale.** Ohne Tötungswort heftet die Suche an:
   - «Wenn Suizidgedanken ein Thema sind», wenn die Anfrage ein Suizid-Signal enthält (dieselbe Erkennung wie bisher: Suizid-Wendung ohne vorangehendes «nicht»/«nie» oder eindeutiges Suizidwort);
   - «Wenn Sie eine Selbstverletzung bemerken» bei «Selbstverletzung», «selbstverletzen», «ritzen» («verletzt» ist mehrdeutig und zählt nicht);
   - «Wenn Gewalt oder Bedrohung vorkommt» bei einem Wort oder einer Wendung der bestehenden Gewaltgruppe;
   - «Bei Eskalation, Gewalt oder fehlender Betreuung» vor dem Gewaltabschnitt, wenn zusätzlich «Kind», «Kinder» oder «Kindern» als mögliche Betroffene genannt sind (nicht nach «vor», «mit», «meiner» usw., wie bei den Tötungswörtern).
2. **Verneinung.** Ein Wort für Selbstverletzung oder Gewalt direkt nach «nicht», «nie», «niemals», «kein», «keine», «keinen», «keiner» zählt nicht.
3. **Reihenfolge** bei mehreren Signalen: Suizid, Selbstverletzung, Kinderschutz, Gewalt. Suizid und Gewalt zusammen laufen wie bisher über die bestehende Regel.
4. **Vorrang eines schon führenden Sicherheitsabschnitts.** Stand in der bisherigen Rangfolge ein anderer Sicherheitsabschnitt zuoberst (etwa Kinderschutz bei «Gewalt gegen Kinder»), bleibt er an erster Stelle, und die angehefteten Abschnitte folgen direkt danach.
5. **Übrige Treffer wie bisher.** Nach den angehefteten Abschnitten folgen die Treffer der bisherigen Suche aus der ganzen Anfrage. Hat sie keine Treffer, stehen trotzdem die angehefteten Abschnitte da.
6. **Unverändert:** Anfragen mit Tötungswort (Regel `safetyOrder`, R34-P01), Suizid und Gewalt zusammen, alle Wortlisten, der Suchindex.

Die Reihenfolge in Punkt 3 und der Vorrang in Punkt 4 sind Abwägungen der bauenden Sitzung, keine fachlichen Entscheide.

## 4 Suchraster gegen r4-76 (live)

| Lauf | Ergebnis |
|---|---|
| ohne Ausnahmen (Testliste vor den sieben neuen Erwartungen, 45 603 Anfragen) | 298 Verschlechterungen, alle «verdrängt»: 0 verloren, 0 leer, 0 Anheftung verloren (`ergebnis/raster-ohne-ausnahmen.txt`) |
| mit vier begründeten Mustern | keine Verschlechterung; 298 Fälle als Ausnahme erlaubt (`ergebnis/raster-mit-ausnahmen.txt`) |
| Sicherheitsabschnitt neu unter den ersten zwei | 7 655 von 45 605 Anfragen |

**Die 298 Verdrängungen** entstehen alle gleich: Ein angehefteter Abschnitt kommt neu nach oben, und ein Sicherheitsabschnitt, der vorher auf Platz 2 stand, rückt auf Platz 3. Kein Fall verliert einen Sicherheitsabschnitt ganz, keine Anfrage verliert jeden Treffer.

| Fälle | rückt auf Platz 3 | neu oben | Einordnung |
|---|---|---|---|
| 208 | «Wenn Suizid angesprochen wird» | «Wenn Suizidgedanken ein Thema sind» | Anfragen mit Suizid-Signal und «was kann ich machen»; vorher stand die Schnellorientierung oben, der Suizidabschnitt fehlte |
| 68 | Kinderschutz | Gewaltabschnitt | Gewalt ohne genannte Kinder; Kinderschutz stand über andere Wörter oben (z. B. über «fu» in «für») |
| 16 | Suizidabschnitt | Selbstverletzung | «Selbstverletzung» mit «oft» oder «ständig»; der Suizidabschnitt stand nur über diese Füllwörter oben |
| 6 | Gewaltabschnitt | Selbstverletzung | «Selbstverletzung» mit «Frau» oder «Notfall»; der Gewaltabschnitt stand nur über Quellenangaben oben |

**Ein Zwischenstand** ohne die Kinderschutz-Regel aus Punkt 1 verlor bei «… schlägt die Kinder …» den Kinderschutz auf Platz 3 (35 Fälle mit «Kind», «Kinder», «Kindern»). Das Raster hat das gemeldet; deshalb gibt es die Regel. Die Ausnahme für Kinderschutz gilt nur für Anfragen ohne diese Wörter.

**Die vier Muster** in `authoring/tests/suchraster-ausnahmen.tsv` sind eng gefasst: Sie gelten nur, wenn der angeheftete Abschnitt dann unter den ersten zwei steht, und drei schliessen Anfragen mit Wörtern aus, bei denen der verdrängte Abschnitt selbst angeheftet würde. Sie gelten nur für den Übergang von r4-76 auf r4-77: Ist r4-77 die Basis, braucht es sie nicht mehr; das Raster meldet sie dann als «ohne Anwendung», und sie werden entfernt.

## 5 Beispiele

Aus `proben-neu.txt`, Bezug r4-73 = r4-76 (`ergebnis/proben-neu-r4-73-r4-76-r4-77.txt`):

| Anfrage | r4-76 (live) | r4-77 |
|---|---|---|
| Ich habe Suizidgedanken | zuerst «Suizidgedanken und Selbstverletzung» (Diagnoseseite) | zuerst «Wenn Suizidgedanken ein Thema sind» |
| Ich habe eine Überdosis genommen | zuerst «Einen Krisenplan vereinbaren» | zuerst «Wenn Suizidgedanken ein Thema sind» |
| Ich werde immer wieder geschlagen | kein Sicherheitsabschnitt oben | zuerst «Wenn Gewalt oder Bedrohung vorkommt» |
| mein Bruder schlägt die Kinder | kein Sicherheitsabschnitt oben | Kinderschutz, dann Gewaltabschnitt |
| Selbstverletzung bei Jugendlichen | zuerst «Wenn Sie nur die nächsten Schritte brauchen» (Seite zu Jugendlichen) | zuerst «Wenn Sie eine Selbstverletzung bemerken» |
| Gewalt gegen Kinder | Kinderschutz, Gewaltabschnitt | unverändert |
| Er hat mich nie geschlagen | kein Sicherheitsabschnitt oben | unverändert (Verneinung) |

## 6 Testlisten

- `suche-ersttreffer.tsv`: 242 Erwartungen (vorher 235). Neu: fünf Erwartungen zu den Signal-Anheftungen und zwei, die bisher in `suche-ausbau-offen.tsv` standen und jetzt erfüllt sind (Kinderschutz zuerst bei Gewalt gegen Kinder ohne Tötungswort; Gewaltabschnitt, wenn «meiner Kinder» den Täter beschreibt). r4-76 erfüllt 235 der 242.
- `suche-ausbau-offen.tsv`: 29 Erwartungen bleiben für Schritt 3.

## 7 Prüfungen

| Prüfung | Ergebnis |
|---|---|
| Build `--production --out=site --write-site` | 24 Seiten, 0 Blocker, 20 Hinweise |
| `--production --verify-site` | Parität bestanden, 35 Dateien byte-gleich |
| Selbsttest | 127 von 127 |
| Suchtest | 242 von 242, 0 JS-Fehler |
| Suchtest `suche-ausbau-offen.tsv` | 0 von 29 (wie vorgesehen, Schritt 3) |
| Suchraster gegen r4-76 | keine Verschlechterung (mit vier Mustern) |
| Sprach-/UI-Test | 74 Prüfungen bestanden |
| Layouttest | 240 Seitenzustände, 38 Bedienproben, 2 Abweichungen (2 bekannt, 0 neu) |
| axe-core 4.14.0 | 24 Seiten, 96 Läufe, 0 Verstösse |

Geändert in `site/`: 24 HTML-Dateien (nur Versionskennung) und `js/interaktion.js`. Kein sichtbarer Wortlaut, kein Stylesheet, kein Suchindex.

## 8 Beobachtungen und Grenzen

- **Verneinte Suizidwörter** heften weiter an: «Ich habe keine Suizidgedanken» zeigt neu zuerst den Suizidabschnitt. Die Erkennung von Suizidwörtern ist unverändert (sie prüft Verneinung nur bei Wendungen); das zu ändern, berührt die Regel für Suizid und Gewalt zusammen und gehört in einen eigenen Schritt.
- **Wenige Signalwörter.** Schritt 2 erkennt nur, was die Suche schon kannte. «ritzt», «geritzt», «suizidgefährdet», «Ohrfeige» und Ähnliches heften erst mit Schritt 3 an.
- **Kinderschutz** steht vor dem Gewaltabschnitt auch dann, wenn das Kind der Täter ist («Mein Kind schlägt mich»). Das war schon in r4-73 so (dort über die Rangfolge) und ist eine fachliche Frage (N836-4).
- **Plätze 3 und folgende** ändern sich bei vielen Anfragen; das Raster prüft nur die ersten zwei.
- Gemessen in Chromium (Playwright 1.64.0). Keine echten Geräte, keine Screenreader (AR3-3). Keine fachliche Prüfung.
- Das Suchraster, an dem dieser Schritt gemessen ist, wird gerade nachträglich nachgeprüft (Nachprüfung von PR #847). Ein Befund dort kann diesen Nachweis betreffen.

## 9 Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
mkdir -p /tmp/r76 && git archive 451b20f site | tar -x -C /tmp/r76
node authoring/tools/build.mjs --production --out=site --write-site
node authoring/tools/suchtest.mjs site
node authoring/tools/suchraster.mjs /tmp/r76/site site
```

## 10 Nachtrag nach dem Merge: Abdeckung (26.11.2026, 23:55 UTC)

Die parallele Gegenprüfung von r4-76 (PR #846, G846-2) hat darauf hingewiesen, dass das Suchraster nur Verluste zählt und keine Gewinne. Mit ihrem Skript `audit-results/2026-11-26-gegenpruefung-r4-76-saldo/abdeckung.cjs` gemessen: In wie vielen der 23 328 Sätze des Rasters steht der **passende** Sicherheitsabschnitt unter den ersten zwei (Suizid → Suizidabschnitt; Selbstverletzung → Abschnitt zur Selbstverletzung; Gewalt → Gewalt- oder Kinderschutzabschnitt)?

| Thema | r4-76 (= r4-73) | r4-75 | r4-77 (live) |
|---|---|---|---|
| Suizid | 4 886 von 10 800 (45,2 %) | 5 603 (51,9 %) | 7 310 (67,7 %) |
| Selbstverletzung | 980 von 3 456 (28,4 %) | 1 102 (31,9 %) | 1 304 (37,7 %) |
| Gewalt | 4 230 von 9 072 (46,6 %) | 5 278 (58,2 %) | 6 583 (72,6 %) |
| zusammen | 10 096 von 23 328 (43,3 %) | 11 983 (51,4 %) | 15 197 (65,1 %) |
| leere Antworten | 5 645 | 3 869 | 4 257 |

r4-77 findet den passenden Abschnitt ohne ein einziges neues Wort häufiger als r4-75 und verliert gegenüber r4-76 nichts. Weniger leere Antworten als r4-75 hat es nicht, weil die neuen Wörter erst mit Schritt 3 kommen. Messung: `ergebnis/abdeckung-r4-76-r4-75-r4-77.txt` (Stände `451b20f`, `e8efa78`, `9d3b7d4`).
