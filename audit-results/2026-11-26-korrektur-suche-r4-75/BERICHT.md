# r4-75 · Korrektur von r4-74 (Suchregeln)

Stand 26.11.2026 · gebaut von der Sitzung, die r4-74 gebaut hat · Ausgangsstand `main` `8d95e6a` (r4-74, live seit 19:34 UTC).

Dieser Bericht enthält Suchanfragen im Wortlaut, auch solche zu Suizid, Selbstverletzung und Gewalt. Sie stehen nur hier und in den Dateien dieses Ordners, nicht in der Pendenzendatei.

## 1 Anlass

PR #836 (r4-74) wurde um 19:33:31 UTC gemergt, rund 6 Sekunden nach «bereit zur Prüfung» und bevor die Nachprüfung fertig war. Die Prüfsitzung hat danach mit eigenen Proben gezeigt, dass r4-74 Sicherheitsanfragen gegenüber r4-73 verschlechtert. Ein Bericht der Prüfsitzung liegt noch nicht vor; dieser Bericht stützt sich auf ihre Zwischenergebnisse (Stand 19:40 UTC, aus dem Verlauf der Sitzung gelesen) und auf eigene Messungen.

**Eigene Berichtigung.** Der Bericht zu r4-74 schrieb: «Stopp-Regel R34-P01: kein blockierender Fall.» Das war falsch. Zwei Zusatzproben mit «immer wieder» verloren dort den Suizidabschnitt; die bauende Sitzung stufte sie als Zufallstreffer ein und prüfte nicht, ob dieselben Füllwörter auch in Aussagen zu Suizid und in Sätzen mit einer Tötungswendung vorkommen. Genau dort liegt die Verschlechterung.

## 2 Was r4-74 verschlechtert hat

Bezug ist r4-73, der Stand vor der Änderung der Suche.

### 2.1 Die 13 Füllwörter (aus PR #713, SU-01)

vom, redet, spricht, sagt, sagte, schreibt, erzählt, immer, wieder, oft, gegeben, gemacht, getan.

Vor r4-74 waren das gewöhnliche Suchwörter. Der Suizidabschnitt enthält «immer wieder» und «oft»; viele Aussagen fanden ihn nur über diese Wörter. Seit r4-74 werden sie übergangen, und die Aussage hat einen anderen oder keinen Treffer:

| Anfrage | r4-73 | r4-74 |
|---|---|---|
| Ich denke immer wieder an den Tod | Suizidabschnitt | kein Treffer |
| Ich denke sehr oft ans Sterben | Suizidabschnitt | kein Treffer |
| Sie sagt immer wieder das Leben hat keinen Sinn | Suizidabschnitt | «Was Genesung beeinflussen kann» |
| Sie bringt sich um sagt sie immer wieder | Suizidabschnitt | «Wer was beitragen kann» |
| Er sagt immer wieder er bringt sich um was soll ich tun | Suizidabschnitt | «Ihre Rolle und Kontakt zum Behandlungsteam» |

Die letzten zwei Zeilen fallen unter Kriterium a) der Stopp-Regel (Anfrage mit Tötungswendung, Suizid fällt aus den ersten zwei Treffern), die ersten zwei unter Kriterium c) (klare Ich-Aussage ohne Treffer). **r4-74 hätte nach R34-P01 nicht gemergt werden dürfen.**

Dahinter steht eine ältere Schwäche, die r4-74 nicht verursacht, aber sichtbar gemacht hat: Die Regel für «bring… um» erkennt die Wendung nur, wenn «um» am Ende oder vor einem Bindewort oder Subjekt steht. Folgen andere Wörter («… um sagt sie», «… um heute Nacht»), greift sie nicht. Siehe Abschnitt 6.

### 2.2 «FU» und «IV» als ganzes Wort (aus PR #713, SU-06)

Vor r4-74 traf «FU» jedes «für» und wirkte in einer Anfrage mit mehreren Begriffen wie ein Füllwort. Seit r4-74 muss ein Treffer das Kürzel oder einen Einweisungsbegriff enthalten. Der Suizidabschnitt tut das nicht:

| Anfrage | r4-73 | r4-74 |
|---|---|---|
| Suizidgefahr FU | Suizidabschnitt | nur «Begriffe» |
| FU bei Suizidgefahr | Suizidabschnitt | nur «Begriffe» |
| Suizidgedanken FU | Suizidabschnitt | nur «Begriffe» |

Diese Fälle hat die bauende Sitzung selbst gefunden (`proben-kuerzel.txt`).

## 3 Korrektur

| Änderung | Wirkung |
|---|---|
| Die 13 Wörter sind keine Füllwörter mehr | Verhalten wie r4-73 für alle Anfragen, die diese Wörter enthalten |
| «FU» und «IV» zählen nur als ganzes Wort, wenn die Anfrage aus diesem einen Begriff besteht | «FU» allein führt weiter auf den Begriff und die Frage zur Einweisung; mit weiteren Begriffen gilt das Verhalten von r4-73 |
| Wendungen «Ohrfeige gegeben», «Ohrfeigen gegeben» in der Gewaltgruppe | hält die Erwartung aus PR #713 ohne das Füllwort «gegeben» |

Alles andere aus r4-74 bleibt: die weiteren Begriffe und Wendungen, die Tippfehlerregel, die Regel für Anfragen des Nicht-mehr-Wollens, Kinder als Betroffene von Gewalt, Gewalt gegen die eigene Person, der Quellenblock im Suchindex, die drei Suchbegriffe und die Ergänzung (Wortstamm-Regel, Formen von «ritzen»).

Geändert: `authoring/js/interaktion.js` und `authoring/tests/suche-ersttreffer.tsv`. In `site/`: 24 HTML-Dateien (nur Versionskennung) und `js/interaktion.js`. Der Suchindex ist unverändert.

## 4 Messung über drei Stände

`drei-staende.cjs` lässt jede Anfrage im Browser gegen r4-73, r4-74 und r4-75 laufen. «Schlechter» heisst: Ein Sicherheitsabschnitt, der in r4-73 unter den ersten zwei stand, fehlt dort, oder die Anfrage hat keinen Treffer mehr.

| Anfragemenge | Anfragen | schlechter in r4-74 | schlechter in r4-75 |
|---|---|---|---|
| Proben der Prüfsitzung (aus ihrem Verlauf, `proben-pruefsitzung.txt`) | 395 | 61 | 6 |
| Tötungswendung mit Nachsatz (`proben-toetungswendung-nachsatz.txt`) | 26 | 8 | 0 |
| Kürzel mit weiteren Begriffen (`proben-kuerzel.txt`) | 17 | 7 | 0 |
| Festgeschriebene Liste (261) | 261 | 8 | 1 |
| Zusatzproben aus r4-74 | 205 | 5 | 2 |

Die verbleibenden Fälle in r4-75, alle einzeln angesehen:

- «Selbstverletzungen» (in drei Mengen): neu zuerst der Abschnitt zu Selbstverletzung statt «Suizidgedanken und Selbstverletzung» der Diagnoseseite. Beabsichtigt.
- «suizidgefährdet und gewalttätig», «Er ist suizidgefährdet und schlägt mich»: neu Suizid- und Gewaltabschnitt zuoberst; in r4-73 fehlte der Suizidabschnitt. Als «schlechter» gezählt, weil der Kinderschutz von Platz 2 rückt. Beabsichtigt.
- «Berufsgeheimnis»: neu zuerst «Wann Sie Auskunft erhalten können». Beabsichtigt.
- «Ich weine oft»: Treffer in r4-73 nur über einen Quellenblock (SU-05). Kein Sicherheitsbezug.
- «Wenn du gehst bringe ich mich um Angst um mein Leben»: zwei Proben ohne Satzzeichen aneinandergehängt. Die Wendung «Angst um mein Leben» aus r4-74 heftet den Gewaltabschnitt an; die Suiziddrohung wird nicht erkannt, weil auf «um» ein Wort folgt (ältere Schwäche, Abschnitt 6). Mit Satzzeichen dazwischen wird sie erkannt.

Ergebnisse je Anfrage: Ordner `drei-staende/`.

## 5 Prüfungen

| Prüfung | Ergebnis |
|---|---|
| Build `--production --out=site --write-site` | 24 Seiten, 0 Blocker, 20 Hinweise |
| `--production --verify-site` | Parität bestanden, 35 Dateien byte-gleich |
| Selbsttest | 127 von 127 |
| Suchtest, 261 Erwartungen | r4-73: 229 · r4-74: 254 · r4-75: 261, 0 JS-Fehler |
| Sprach-/UI-Test | 74 Prüfungen bestanden |
| Layouttest | 240 Seitenzustände, 38 Bedienproben, 2 Abweichungen (2 bekannt, 0 neu) |
| axe-core 4.14.0 | 24 Seiten, 96 Läufe, 0 Verstösse |
| Wörter mit Suizid-Wortstamm (320) | alle zuerst auf dem Suizidabschnitt, wie in r4-74 |

Acht neue Regressionsproben stehen in der festgeschriebenen Liste; r4-74 besteht sieben davon nicht.

Vergleich r4-73 → r4-75 mit dem Skript aus r4-74 (`gegen-r4-73/`), Stopp-Regel R34-P01:

| Kriterium | Fälle | Einordnung |
|---|---|---|
| a) Anfrage mit Tötungswort: Suizid fällt aus den ersten zwei | 0 | – |
| b) Sicherheitsabschnitt stand unter den ersten zwei und fehlt unter den ersten drei | 14 | 11 Einzelwörter aus dem Quellenblock des Gewaltabschnitts; «Selbstverletzungen» in drei Mengen |
| c) Vorher Treffer, nachher keiner | 24 | Einzelwörter, die nur in einem Quellenblock stehen |

Diese Tabelle ersetzt keine unabhängige Prüfung. Dieselbe Auswertung hat bei r4-74 «kein blockierender Fall» ergeben, weil die Proben die Verschlechterung nicht enthielten.

## 6 Offen, nicht Teil dieser Korrektur

1. **Tötungswendung mit Nachsatz (ältere Schwäche, auch in r4-73).** Folgt auf «bringt sich um» ein Wort, das kein Bindewort und kein Subjekt ist, erkennt die Regel die Wendung nicht. Ohne Treffer in allen drei Ständen: «Er bringt sich um heute Nacht», «Sie bringt sich um wegen mir», «Er bringt sich um hat er gesagt», «Er hat gesagt er bringt sich um gestern Abend». Die Leermeldung nennt den Einstieg zur Sicherheit, die Anfrage selbst führt nirgends hin. Vorschlag für ein eigenes Release mit Nachprüfung vor dem Merge: Füllwörter und Zeitangaben nach «um» wie das Satzende behandeln.
2. **Zufallstreffer über «immer wieder» und «oft».** r4-75 stellt sie wieder her, weil Sicherheitsanfragen davon abhängen. Damit führen auch harmlose Anfragen wie «immer wieder Krisen» oder «Sie ruft immer wieder an» zuerst auf den Suizidabschnitt, wie vor r4-74. Das ist der Bezugsstand, aber kein entworfenes Verhalten.
3. **Die Füllwörter aus PR #713** liessen sich nur dann wieder einführen, wenn zuerst Punkt 1 gelöst ist und Aussagen zu Suizid ohne die Zufallstreffer auskommen.
4. **Proben der Prüfsitzung, die hier fehlen.** Sie hat 4416 Ich-Aussagen aus Bausteinen und 5452 Zwischenstufen beim Tippen gemessen; diese Listen lagen der bauenden Sitzung nicht vor.

## 7 Grenzen des Nachweises

- Geprüft in Chromium (Chrome Headless Shell 156.0.8078.4, Playwright 1.64.0); keine echten Geräte, keine Screenreader (AR3-3).
- Die Korrektur ist von der Sitzung gebaut und gemessen, die den Fehler gemacht hat. Die Proben der Prüfsitzung sind aus ihrem Verlauf übernommen, nicht aus einem Bericht.
- Keine fachliche Prüfung.

## 8 Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
git worktree add /tmp/r73 3764d45   # r4-73
git worktree add /tmp/r74 8d95e6a   # r4-74
node authoring/tools/suchtest.mjs site
A=audit-results/2026-11-26-korrektur-suche-r4-75
node $A/drei-staende.cjs /tmp/r73/site /tmp/r74/site site $A/proben-pruefsitzung.txt
```
