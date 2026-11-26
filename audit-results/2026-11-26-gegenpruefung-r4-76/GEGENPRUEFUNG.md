# Gegenprüfung r4-76 · PR #840 (Rückbau der Suche auf den Stand r4-73)

**Identisch mit r4-73 bis auf die Kennung: ja.** Die 35 Dateien von `site/` sind dieselben; 11 sind byte-gleich, die 24 HTML-Dateien unterscheiden sich in je genau drei Zeilen, und dort nur in der Zeichenfolge `r4-76` statt `r4-73`.

**Empfehlung zum Merge: Der Rückbau ist nach der Stopp-Regel R34-P01 vertretbar und soll nicht zugunsten von r4-75 zurückgenommen werden. Er ist aber nicht «sicherer» als r4-75: Auf dem Raster der bauenden Sitzung findet r4-75 den passenden Sicherheitsabschnitt in 11 983 von 23 328 Sätzen, r4-76 in 10 096 (N840-2). Deshalb rasch die verlustfreien Teile wieder aufbauen.** PR #840 ist allerdings schon gemergt (26.11.2026, 20:54:23 UTC, `b529695`), bevor diese Gegenprüfung vorlag. Diese Prüfung ist deshalb **nachträglich**. `main` (`b529695`) ist baumgleich mit dem geprüften PR-Kopf `4ecf3be`; alles Folgende gilt damit auch für `main`.

Stand 26.11.2026 · geprüft von einer Sitzung, die PR #840, r4-74 und r4-75 nicht gebaut hat · Bezug `3764d45` (r4-73) · Prüfstand PR-Kopf `4ecf3be` (r4-76) · Vergleichsstand `e8efa78` (r4-75).

Dieser Bericht und die Dateien dieses Ordners enthalten Suchanfragen im Wortlaut, auch solche zu Suizid, Selbstverletzung und Gewalt. Sie gehören nicht in die Pendenzendatei.

## Kurzfassung

- Die Kernbehauptung stimmt und ist ein Dateivergleich, kein Probenergebnis (Abschnitt 1).
- Im Browser liefert r4-76 bei jeder von 5856 eigenen und fremden Anfragen sowie bei allen 23 328 Sätzen des Rasters der bauenden Sitzung dieselbe **vollständige** Trefferliste wie r4-73, nicht nur dieselben ersten drei (Abschnitt 2).
- Alle Gates laufen wie berichtet (Abschnitt 3).
- Die Zahlen zu r4-75 gegen r4-73 stimmen (646 und 185, Ergebnisdatei byte-gleich nachgerechnet; Abschnitt 5).
- **Aber das Raster zählt nur Verluste.** In der Gegenrichtung gewinnt r4-75 auf demselben Raster deutlich mehr, als es verliert. Mit dem Rückbau sind diese Gewinne wieder weg; in r4-76 (`main`; den Live-Stand habe ich nicht geprüft) führen unter anderem Sätze mit «Ohrfeige» (0 von 432), «redet vom Sterben» (16 von 432) und «hat sich geritzt» oder «hat sich geschnitten» (je 0 von 432) nicht auf den passenden Abschnitt. Der Bericht nennt die Verluste in Abschnitt 4 in Worten und eine Zahl für die Wortliste, aber keine Gegenzählung über das Raster, mit dem er r4-75 beurteilt. Das ist die Entscheidgrundlage, auf der gemergt wurde (N840-2, hoch).
- Kein Befund gegen die Kernbehauptung. Sechs Befunde, davon einer zum Ablauf (Merge vor der Gegenprüfung, N840-1) und einer zum überholten Status auf `main` (N840-3).

| Kennung | Schweregrad | Befund |
|---|---|---|
| N840-1 | mittel (Ablauf) | Merge 2 Minuten nach dem letzten Commit und vor der Gegenprüfung, die die Pendenzendatei als offen führt; Codex-Review erst 24 Sekunden nach dem Merge fertig |
| N840-2 | hoch (Entscheidgrundlage) | Das Raster der bauenden Sitzung zählt nur Verluste von r4-75. Gegenrichtung ungezählt: r4-75 findet den passenden Abschnitt in 1887 Sätzen mehr als r4-73 (51,4 % gegen 43,3 %), leere Antworten 3869 gegen 5645. Der Rückbau ist nach R34-P01 richtig, im Saldo aber ein Rückschritt |
| N840-3 | niedrig | Status auf `main` überholt: Kopf und Abschnitt «r4-76» der Pendenzendatei und `releaseApproval` führen r4-76 als Entwurf, «nicht gemergt», r4-75 als live |
| N840-4 | niedrig | Testliste: eine der 5 neuen Regressionsproben schreibt eine Reihenfolge fest, die dem Ausbauziel widerspricht; drei hängen am Wort für die handelnde Person |
| N840-5 | Hinweis | Vorbestehend in r4-73 und damit wieder auf `main`: gleiche Gewaltaussage mit anderem Subjekt führt nicht auf den Gewaltabschnitt |
| N840-6 | niedrig | Bericht der bauenden Sitzung: kleine Ungenauigkeiten (Zählung der Proben zu Gewalt, `_headers` nicht genannt, Reproduktion setzt die Kennung pauschal gleich) |

## 1 Kernfrage: identisch mit r4-73 bis auf die Kennung

### 1.1 Build

Auf dem PR-Kopf `4ecf3be`, mit `PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright`:

- `node authoring/tools/build.mjs --production --out=site --write-site`: 24 Seiten · 0 Blocker · 20 Hinweise. `git status --porcelain` danach leer; der Build verändert `site/` nicht.
- `node authoring/tools/build.mjs --production --verify-site`: «PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/».

### 1.2 `site/` Datei für Datei gegen `3764d45`

- Dateiliste: 35 Dateien in beiden Ständen, gleiche Pfade (`diff` der sortierten Listen leer).
- Byte-gleich (`cmp`): 11 Dateien, darunter `js/interaktion.js` (sha256 `05ec5402cafbfbae…`), `css/site.css` (`d2e3d02487b8b998…`), `_redirects` (`370c02c6ae0b320b…`) und `_headers` (`cd6a524c9b64b58c…`).
- Nicht byte-gleich: genau die 24 HTML-Dateien.

### 1.3 Die 24 HTML-Dateien, ohne etwas gleichzusetzen

Ich habe die Kennung **nicht** vor dem Vergleich ersetzt, sondern die rohen Unterschiede gezählt (`ergebnis/html-rohdiff.txt`, 144 Zeilen = 24 Dateien × 3 Zeilen × 2 Stände). Jede Datei unterscheidet sich in genau diesen drei Zeilen:

| Zeile | r4-73 | r4-76 | Dateien |
|---|---|---|---|
| `<html … data-puk-site-build="…">` | `r4-73` | `r4-76` | 24 |
| `<link rel="stylesheet" href="css/site.css?v=…">` | `r4-73` | `r4-76` | 24 (in `404.html` mit `/css/…`) |
| `<script src="js/interaktion.js?v=…" defer>` | `r4-73` | `r4-76` | 24 (in `404.html` mit `/js/…`) |

Ein wortweiser Vergleich über alle 24 Dateien ergibt als einzige abweichende Zeichenfolgen 72-mal `-r4-73` und 72-mal `+r4-76`, sonst nichts. Dazu gehört `suche.html` mit dem ganzen Suchindex.

**Verdeckt das Gleichsetzen etwas?** Nein:

- In den HTML-Dateien von r4-73 kommt `r4-73` genau 72-mal vor, in denen von r4-76 kommt `r4-76` genau 72-mal vor, je dreimal pro Datei an den Stellen der Tabelle. Keine andere Kennung `r4-7x` steht in einer HTML-Datei.
- `js/interaktion.js`, `css/site.css` und `_redirects` enthalten ältere Kennungen in Kommentaren (darunter je einmal `r4-73`). Diese Dateien sind byte-gleich; dort wird nichts gleichgesetzt.
- Das Reproduktionsskript der bauenden Sitzung ersetzt `r4-73` pauschal in der ganzen Datei. Das hätte einen Unterschied verdecken können, wenn eine der beiden Kennungen noch an einer vierten Stelle stünde. Sie steht dort nicht (N840-6).

### 1.4 `authoring/` gegen `3764d45`

| Datei | Ergebnis |
|---|---|
| `authoring/js/interaktion.js` | byte-gleich |
| `authoring/tools/search-index.mjs` | byte-gleich |
| `authoring/site.config.json` | ohne `assetVersion` und `releaseApproval` gleich (als JSON verglichen); die beiden Felder kommen nur auf oberster Ebene vor |
| `authoring/tools/contract.js` | eine Zeile: `BUILD = 'r4-76'` statt `'r4-73'` |
| `authoring/tests/suche-ersttreffer.tsv` | 19 Zeilen angehängt, die ersten 224 Zeilen byte-gleich (Abschnitt 4) |
| `authoring/tests/suche-ausbau-offen.tsv` | neu, 31 Erwartungen, vom Suchtest nicht automatisch geprüft |
| `authoring/tools/layouttest.cjs`, `authoring/tools/layouttest-report.cjs` | **nicht von r4-76**: Liste bekannter Abweichungen aus PR #832 (`a26bcca`, N829-2), nach r4-73 gemergt. Testwerkzeug, erzeugt keine Website-Datei |

Sonst ist in `authoring/` nichts anders (`git diff --stat 3764d45 4ecf3be -- authoring`: 6 Dateien). Ausserhalb von `authoring/`, `site/` und `audit-results/` sind seit r4-73 die Pendenzendatei und `.github/workflows/verify-authoring.yml` geändert (Workflow ebenfalls aus #832, nicht aus #840; #840 selbst ändert den Workflow nicht).

## 2 Gegenprobe im Browser

Eigenes Skript `vergleich.cjs` (nicht `raster.cjs` oder `drei-staende.cjs` der bauenden Sitzung). Es vergleicht die **ganze** Trefferliste, nicht nur die ersten drei. Chromium über Playwright, drei Stände nebeneinander, 0 JS-Fehler in allen Läufen.

| Anfragemenge | Anfragen | r4-76: ganze Trefferliste wie r4-73 | r4-75: Sicherheitsabschnitt verloren / leer |
|---|---|---|---|
| Nachprüfung r4-74, `proben.txt` | 479 | 479 | 4 / 1 |
| Nachprüfung r4-74, Füllwort und Sicherheit | 60 | 60 | 0 / 0 |
| Nachprüfung r4-74, Tötungswort und Füllwort | 54 | 54 | 0 / 0 |
| Eigene Proben (`proben-eigene.txt`: Gewalt ohne «mich», Selbstverletzung mit Nachsatz, Suizid mit Nachsatz, harmlose) | 82 | 82 | 4 / 4 |
| Eigene Proben zum Subjekt (`proben-zufall.txt`) | 31 | 31 | 7 / 1 |
| Proben der bauenden Sitzung zu Gewalt | 22 | 22 | 10 / 1 |
| Festgeschriebene Liste | 235 | 235 | 4 / 1 |
| `suche-ausbau-offen.tsv` | 31 | 31 | 1 / 0 |
| Eigenes Raster (11 Handelnde × 26 Aussagen × 17 Nachsätze, andere Bausteine als `raster.cjs`) | 4862 | 4862 | 79 / 60 |
| Raster der bauenden Sitzung (`raster.cjs`, `NUR=saetze`) | 23 328 | 23 328 (über `raster.cjs` selbst: 0 / 0, Datei byte-gleich mit der eingecheckten) | 646 / 185 |

«Verloren» heisst wie im Raster der bauenden Sitzung: Ein Sicherheitsabschnitt aus den ersten zwei Treffern von r4-73 fehlt dort. Ergebnisse je Menge in `ergebnis/vergleich-*.txt`.

Eigene Beispiele, in denen r4-75 schlechter ist als r4-73 und r4-76 wieder wie r4-73:

| Anfrage | r4-73 und r4-76 | r4-75 |
|---|---|---|
| Mein Mann schlägt zu wenn er wütend ist | Gewaltabschnitt | kein Treffer |
| Mein Mann hat unseren Sohn geschlagen | Gewaltabschnitt | kein Treffer |
| Mann schlägt Frau | Gewaltabschnitt | nur Quellenseite |
| Schneidet sich meine Tochter wegen mir | Selbstverletzung | «Begriffe» |
| Meine Tochter schneidet sich seit Wochen | Selbstverletzung | «Begriffe» |

## 3 Gates auf dem PR-Kopf

| Prüfung | Ergebnis | wie berichtet |
|---|---|---|
| `selftest.mjs` | 127 von 127 | ja |
| `suchtest.mjs site` | 235 von 235, 0 JS-Fehler | ja |
| `suchtest.mjs site authoring/tests/suche-ausbau-offen.tsv` | 0 von 31 | ja |
| derselbe Aufruf gegen `site/` von r4-75 | 31 von 31 | (nicht berichtet) |
| `suchtest.mjs` mit der neuen Liste gegen `site/` von r4-75 | 229 von 235 | ja |
| `sprachtest.mjs site` | 74 Prüfungen bestanden, 0 JS-Fehler | ja |
| `layouttest.cjs` | 240 Seitenzustände, 38 Bedienproben, 2 Abweichungen (2 bekannt, 0 neu), Exit 1 | ja |
| CI `build-and-compare` auf `4ecf3be` | grün, 20:53:25 UTC | – |

Nicht nachgemessen: axe-core (Grenze).

## 4 Testliste `suche-ersttreffer.tsv`

- Die 216 Erwartungen von r4-73 sind unverändert enthalten: Die ersten 224 Zeilen (216 Erwartungen, Kopfzeile, Kommentare) sind byte-gleich mit `3764d45`. 19 Zeilen sind angehängt, zusammen 235.
- Alle 235 gelten in r4-73, weil die Website gleich ist. Die 19 schreiben also bestehendes Verhalten fest, kein neues.

Einordnung der 19:

| Gruppe | Anzahl | Urteil |
|---|---|---|
| Gegenproben aus r4-74 («!sicher», «kein Treffer», Behandlungsabschnitt) | 5 | sinnvoll als Leitplanken für den Wiederaufbau. «Lebensmut» mit der Erwartung «kein Treffer» schreibt eine leere Antwort fest; gemeint ist «kein Suizidabschnitt». Besser als `!sicher` formulieren |
| Regressionsproben aus r4-74 und r4-75 (Selbstverletzung, Drohung, Sterben, Füllwörter, Kürzel mit Suizidwort) | 9 | sinnvoll; sie schützen genau die Fälle der Nachprüfung N836-1 und N836-2 |
| Neue Regressionsproben r4-76 | 5 | inhaltlich richtige Ziele, aber siehe N840-4 |

**N840-4 (niedrig).** Messung in `ergebnis/vergleich-zufall.txt`:

- Die drei Proben mit «Mein Mann …» und «Meine Frau …» treffen den Gewaltabschnitt in r4-73 allein, weil «Mann» und «Frau» in dessen Quellenangaben stehen. Das Ziel (Gewaltabschnitt zuerst) ist richtig und soll bleiben; als Probe für «die Suche versteht Gewalt durch Angehörige» taugen sie nicht, siehe N840-5.
- «Mein Mann schlägt unseren Sohn → Gewaltabschnitt zuerst» widerspricht dem Ausbauziel in `suche-ausbau-offen.tsv`, das für Gewalt gegen Kinder den Kinderschutzabschnitt voranstellt. Wer die Kinder-Regel wieder einführt, muss diese Zeile bewusst ändern. Das ist kein Fehler, sollte aber in der Herkunftsspalte stehen, sonst bremst die Probe genau die Verbesserung.
- Bereuen wird man keine der 19 als Sicherheitsverlust; das Risiko ist nur, dass eine spätere Verbesserung an einer Zeile hängen bleibt.

## 5 Zahlen des Berichts zu r4-75 gegen r4-73

- `raster.cjs` der bauenden Sitzung, `NUR=saetze`, r4-73 gegen r4-75, von mir neu gelaufen: 23 328 Anfragen, verloren 646, leer 185, 0 JS-Fehler. Die Ergebnisdatei ist **byte-gleich** mit `ergebnis/raster-saetze-r4-73-gegen-r4-75.txt` der bauenden Sitzung. Mein eigenes `vergleich.cjs` über dieselben Sätze zählt ebenfalls 646 und 185.
- r4-73 gegen r4-76 mit demselben Raster: 0 und 0, Datei byte-gleich mit der eingecheckten.
- Die vier Beispiele der Tabelle in Abschnitt 2.1 sind echte Verschlechterungen von r4-75 (in `ergebnis/vergleich-testliste-235.txt` und `vergleich-zufall.txt`): dreimal nur noch die Quellenseite statt des Gewaltabschnitts, einmal kein Treffer. Die zwei Beispiele in 2.2 ebenfalls («Begriffe» statt Selbstverletzung).
- «229 von 235» für r4-75 stimmt. Eine der sechs Abweichungen («Geheimnis») ist keine Sicherheitsanfrage und in r4-75 eher besser.
- Zwischenstand (298 und 0) und die «144 echten Verluste» habe ich nicht nachgemessen; der Zwischenstand liegt nicht als Commit vor (Grenze).

**Was das Raster nicht zeigt (gehört zu N840-2).** Es zählt nur, was r4-75 gegenüber r4-73 verliert. In beide Richtungen gezählt:

| Raster | r4-75 verliert (Sicherheitsabschnitt aus den ersten zwei / leer) | r4-75 gewinnt (Sicherheitsabschnitt neu unter den ersten zwei / vorher leer, jetzt Treffer) |
|---|---|---|
| bauende Sitzung, 23 328 Sätze | 646 / 185 | 3096 / 1961 |
| eigenes, 4862 Sätze | 79 / 60 | 209 / 222 |

Die Zahl 3096 ist überhöht, weil sie auch zählt, wenn nur der Kinderschutzabschnitt an zweiter Stelle dazukommt. Deshalb zusätzlich die **Abdeckung** (`abdeckung.cjs`, `ergebnis/abdeckung-bauraster.txt`): In wie vielen der 432 Sätze je Aussage steht der *passende* Abschnitt unter den ersten zwei? (Suizid: Suizidabschnitt; Selbstverletzung: Selbstverletzungsabschnitt; Gewalt: Gewalt- oder Kinderschutzabschnitt.)

| Thema | r4-73 = r4-76 | r4-75 | leere Antworten r4-73 → r4-75 |
|---|---|---|---|
| Suizid (25 Aussagen) | 4886 von 10 800 (45,2 %) | 5603 (51,9 %) | 3363 → 2785 |
| Selbstverletzung (8) | 980 von 3456 (28,4 %) | 1102 (31,9 %) | 896 → 438 |
| Gewalt (21) | 4230 von 9072 (46,6 %) | 5278 (58,2 %) | 1386 → 646 |
| zusammen | 10 096 von 23 328 (43,3 %) | 11 983 (51,4 %) | 5645 → 3869 |

Strenge Gegenprobe ohne den Kinderschutzabschnitt (`abdeckung-streng.cjs`, aus den geänderten Zeilen; unveränderte zählen in beiden Ständen gleich): Gewaltabschnitt unter den ersten zwei +1201 für r4-75, Gewaltabschnitt an erster Stelle +807, Suizid +717 (gleich wie oben, zur Kontrolle), Selbstverletzung +122. **r4-75 ist auf dem Raster der bauenden Sitzung auch streng gezählt netto besser als r4-73 und damit als r4-76.**

Wo r4-75 gewinnt und r4-73/r4-76 versagt (je von 432 Sätzen, passend in r4-73 → r4-75): «hat mir eine Ohrfeige gegeben» 0 → 432; «redet vom Sterben» 16 → 432; «hat sich geritzt», «hat sich geschnitten» je 0 → 116; «ist suizidgefährdet» 24 → 208; «schlägt mich», «würgt mich», «hat mich geschlagen» je 206 → 432; «schlägt die Kinder» 230 → 432. Wo r4-75 verliert: «schneidet sich» 242 → 116; «schlägt zu», «ist gewalttätig», «gewalt», «bedroht uns» je 206 → 174; «häusliche Gewalt» 318 → 264; «wird gewalttätig» 203 → 164.

Einschränkung: Alle Kombinationen zählen gleich, auch ungrammatische («ich redet vom sterben»); welche echte Hilfesuchende eingeben, ist nicht messbar. Und r4-75 trägt Regelfehler, die die Nachprüfung von r4-74 fand (N836-4 bis N836-6), etwa Kinderschutz zuerst, wenn das Kind gewalttätig ist; die lockere Abdeckung zählt solche Fälle als passend. Die strenge Zählung tut das nicht und kommt zum selben Ergebnis.

## 6 Gründe gegen den Rückbau (N840-2)

Ehrlich gewogen. Der Bericht der bauenden Sitzung zählt die Verluste in Abschnitt 4 vollständig auf; ich habe sie nachgemessen (`ergebnis/vergleich-ausbau-offen-31.txt`): r4-75 erfüllt alle 31 Erwartungen, r4-76 keine.

Die stärksten Gegenargumente:

0. **Im Saldo ist r4-76 schlechter als r4-75** (Abschnitt 5): rund 1900 Sätze des Rasters der bauenden Sitzung, die in r4-75 den passenden Abschnitt fanden, finden ihn jetzt nicht, darunter Gewalt gegen die eigene Person mit Nachsatz («… würgt mich was soll ich tun»), jede Ohrfeige und jedes «redet vom Sterben». Die bauende Sitzung hat das mit ihrem eigenen Werkzeug nicht gezählt, weil es nur Verluste misst.
1. **Einzelwörter wiegen in einer Website-Suche vermutlich mehr als ganze Sätze.** Wer «suizidgefährdet», «Selbstmorddrohung», «Abschiedsnachricht», «Medikamentenüberdosis» oder «Selbstverletztung» (Tippfehler) eingibt, erhält in r4-76 wieder **keinen Treffer**; in r4-75 stand der passende Sicherheitsabschnitt zuoberst. Das Raster der bauenden Sitzung besteht dagegen aus Sätzen mit drei bis neun Wörtern. Welche Form echte Hilfesuchende häufiger wählen, ist nicht gemessen; es gibt keine Auswertung echter Suchanfragen. Wenn kurze Anfragen überwiegen, hilft r4-75 mehr Menschen als r4-76.
2. **«Ich will nicht mehr» führt wieder zuerst auf «Wenn die Person keine Behandlung möchte oder abbricht».** Das ist ein sachfremder Ersttreffer bei einer möglichen Suizidaussage; der Suizidabschnitt fehlt unter den ersten zwei.
3. **Mundart, «Er hat sich geschnitten», «Sie hat sich geritzt», «Ohrfeige», «Jugendamt», «Zwangseinweisung», «Notfallplan»:** wieder leer.
4. **Gewalt gegen Kinder:** Der Kinderschutzabschnitt steht nicht mehr voran.

Was dagegen steht, und warum ich trotzdem nicht empfehle, zu r4-75 zurückzukehren:

- Die Verluste von r4-75 sind **Rückschritte** bei Anfragen, die vorher den richtigen Abschnitt fanden, und ein Teil davon endet auf der Quellenseite oder bei «Begriffe», also mit einem Treffer, der nach einer Antwort aussieht und keine ist. Die Lücken von r4-76 enden überwiegend mit der Leermeldung, die seit r4-73 den Einstieg «Ich sorge mich um Sicherheit, Selbstgefährdung oder Gewalt» nennt. Eine leere Antwort mit Wegweiser ist bei einer Sicherheitsanfrage weniger schlecht als ein sachfremder Treffer. Punkt 2 oben ist die Ausnahme; dieser Fehler bestand aber vor r4-74 schon.
- r4-76 ist nachweislich ein Stand, der schon live war. Sein Verhalten ist bekannt; das von r4-75 war es zweimal nicht. Nach zwei übersehenen Fehlern am selben Tag ist ein Stand ohne neue Logik die sicherere Wahl.
- Die Nachprüfung von r4-74 hat in den Regeln selbst weitere Fehlreihenfolgen gefunden (N836-4 bis N836-6), die in r4-75 live blieben.
- Die Stopp-Regel R34-P01 verbietet eine Verschlechterung gegenüber dem letzten Stand, nicht einen schlechteren Saldo. r4-75 verletzt sie (646 und 185), r4-76 nicht. Ob die Regel bei einem klar positiven Saldo gelten soll, ist ein Entscheid von Christa Egger, keiner dieser Prüfung.

**Folgerung:** Der Rückbau ist nach der geltenden Regel richtig, aber er ist ein Rückschritt im Saldo und kein Endzustand. Er sollte nicht als «sicherer Stand» stehen bleiben. Die Wortstamm-Regel für Suizidwörter und die Tippfehlerregel (Punkt 1) sollten zuerst zurückkommen; die Nachprüfung von r4-74 hat die Wortstamm-Regel als korrekt und trennbar beurteilt (N836-8). Der Vorschlag der bauenden Sitzung setzt sie an die zweite und dritte Stelle; ich würde sie vorziehen, weil sie die häufigste Form der Anfrage betreffen dürfte und an den Verlusten nicht beteiligt war. Ebenso früh: die Wendungen für Ohrfeige, für Gewalt gegen die eigene Person (mit den Korrekturen aus N836-5) und für «redet vom Sterben»; in der Abdeckung haben sie keinen Verlust, nur Gewinne. Jede dieser Regeln mit `abdeckung.cjs` **und** `raster.cjs` messen, also Gewinne und Verluste. Entscheid bei Christa Egger.

## 7 Pendenzendatei und Ablauf

**Regel zum Wortlaut: eingehalten.** Der Abschnitt «r4-76» und alle von #840 geänderten Zeilen enthalten keine der 782 Proben aus den Probenlisten und Testlisten im Wortlaut (maschinell abgeglichen). Zitiert sind nur Einzelwörter («Mann», «Frau», «Notfall», «mich», «schneiden») und Abschnittsnamen; die Fälle sind umschrieben. Die Beschreibung von PR #840 auf GitHub nennt vier Proben im Wortlaut; die Regel betrifft die Pendenzendatei, nicht den PR-Text.

**Status und Zeiten:**

| Angabe | Geprüft gegen | Ergebnis |
|---|---|---|
| #838 gemergt als `e8efa78`, 19:51:28 UTC | Commit-Datum `e8efa78` (20:51:28 +01:00); GitHub nennt 19:51:29 | stimmt |
| #839 erstellt 19:49 UTC, gemergt als `6f06888` | GitHub: erstellt 19:49:04, gemergt 20:42:51 UTC; `main` enthält `6f06888` | stimmt |
| #840 «Entwurf, nicht gemergt», r4-75 live | GitHub: gemergt 20:54:23 UTC als `b529695` | **überholt (N840-3)** |
| Live-Zeiten von r4-73, r4-74, r4-75 | nicht prüfbar (Grenze) | – |

**N840-3 (niedrig).** Auf `main` stehen nach dem Merge: im Kopf «In Arbeit: r4-76 … Entwurf … Bis zum Merge ist r4-75 live», im Abschnitt «r4-76 … offen seit 26.11.2026», «nicht gemergt», und unter «Offen» die unabhängige Gegenprüfung. `releaseApproval` in `site.config.json` nennt für r4-76 keinen Merge. Nachführen: Merge-Commit `b529695`, 20:54:23 UTC, Live-Prüfung, diese Gegenprüfung.

**N840-1 (mittel, Ablauf).** Letzter Commit des PR 20:52:12 UTC, CI grün 20:53:25, Merge 20:54:23, Codex-Review fertig 20:54:47, also 24 Sekunden nach dem Merge (R28-O01). Die Pendenzendatei führt die unabhängige Gegenprüfung beim Merge noch als offen; der Vorschlag der bauenden Sitzung im selben PR lautet «Nachprüfung vor dem Merge». Ob ein Merge-Auftrag vorlag (R65-P01), ist auf GitHub nicht belegt. Mildernd: Der Rückbau ersetzt einen Stand mit bekannten Verschlechterungen, die Behauptung war in Minuten prüfbar und hat sich bestätigt. Das Muster ist trotzdem dasselbe wie bei #836 und #838.

## 8 Weitere Befunde

**N840-5 (Hinweis, vorbestehend).** In r4-73, r4-75 und r4-76 gleich (`ergebnis/vergleich-zufall.txt`): «Mein Freund schlägt zu», «Mein Bruder schlägt zu», «Mein Vater schlägt zu» und «Meine Freundin schlägt zu» führen zuerst auf «Rollen» unter «Grenzen», der Gewaltabschnitt fehlt unter den ersten drei. «Er droht ihr» führt auf einen Abschnitt zur Rolle. Mit «Mann», «Frau», «Partner», «Sohn», «Tochter», «er», «sie» steht der Gewaltabschnitt zuoberst. Das stützt den Vorschlag der bauenden Sitzung, ein erkanntes Signal für Gewalt fest anzuheften, unabhängig von den übrigen Wörtern. Kein Einwand gegen den Rückbau.

**N840-6 (niedrig, Bericht der bauenden Sitzung).**
- Abschnitt 2.1 nennt «11 von 22» Proben zu Gewalt als schlechter. Die Ergebnisdatei nennt 11, mein Lauf über die ganze Trefferliste 10 verloren und 1 leer; das ist dasselbe. Kein Fehler, nur zur Einordnung.
- Abschnitt 3 nennt `_headers` nicht; die Datei ist byte-gleich.
- Abschnitt 8 setzt die Kennung per `sed` in der ganzen Datei gleich. Das Ergebnis stimmt, der Beweis ist aber erst vollständig, wenn man zeigt, dass die Kennung nur an den drei Stellen steht (Abschnitt 1.3).
- «926 Anfragen, erste drei Treffer gleich» habe ich nicht mit denselben Mengen nachgezählt; meine eigenen Mengen bestätigen die Aussage in der strengeren Form.

## 9 Grenzen dieser Prüfung

- Chromium über Playwright aus `/opt/borderline-browser`; keine echten Geräte, keine Screenreader, kein axe-core-Lauf.
- Die Live-Website und die Netlify-Vorschau habe ich nicht aufgerufen. Dass live jetzt r4-76 läuft, ist nicht geprüft. Die Gleichheit gilt für `site/` im Repository; ob Netlify genau diese Dateien ausliefert, ist nicht Teil dieser Prüfung.
- Die Proben sind selbst gewählt, keine Stichprobe echter Suchanfragen. Die Abwägung in Abschnitt 6 hängt daran, welche Anfragen echte Hilfesuchende stellen; das ist nicht messbar. Die Abdeckung gewichtet alle Rasterkombinationen gleich.
- «Passend» ist eine grobe Zuordnung je Aussage (Abschnitt 5), keine fachliche Beurteilung des Treffers.
- Den Zwischenstand der bauenden Sitzung (298 und 0, «144 echte Verluste») und den zweiten Rasterteil «wortpaare» habe ich nicht nachgemessen.
- Ob für den Merge von #840 ein Auftrag vorlag, ist für diese Sitzung nicht einsehbar.
- Keine fachliche Prüfung der Inhalte.

## 10 Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
git worktree add /tmp/pr 4ecf3be; git worktree add /tmp/r73 3764d45; git worktree add /tmp/r75 e8efa78
cd /tmp/pr && node authoring/tools/build.mjs --production --out=site --write-site && git status --porcelain
node authoring/tools/build.mjs --production --verify-site
diff <(cd /tmp/pr/site && find . -type f | sort) <(cd /tmp/r73/site && find . -type f | sort)
for f in $(cd /tmp/pr/site && find . -type f); do cmp -s /tmp/pr/site/$f /tmp/r73/site/$f || echo "ANDERS $f"; done
for f in /tmp/pr/site/*.html; do b=$(basename $f); diff /tmp/r73/site/$b $f | grep '^[<>]' | sed "s|^|$b |"; done   # html-rohdiff.txt
grep -oh 'r4-7[0-9]' /tmp/pr/site/*.html | sort | uniq -c
A=audit-results/2026-11-26-gegenpruefung-r4-76
node $A/vergleich.cjs $A/proben-eigene.txt /tmp/aus.txt r4-73=/tmp/r73/site r4-76=/tmp/pr/site r4-75=/tmp/r75/site
node $A/vergleich.cjs -raster /tmp/aus-raster.txt r4-73=/tmp/r73/site r4-76=/tmp/pr/site r4-75=/tmp/r75/site
B=/tmp/pr/audit-results/2026-11-26-rueckbau-suche-r4-76/raster.cjs
NUR=saetze node $B /tmp/r73/site /tmp/r75/site /tmp/raster r75   # 646 / 185
node $A/vergleich.cjs -bauraster=$B /tmp/bau.txt r4-73=/tmp/r73/site r4-75=/tmp/r75/site   # beide Richtungen
node $A/abdeckung.cjs $B /tmp/abd.txt r4-73=/tmp/r73/site r4-76=/tmp/pr/site r4-75=/tmp/r75/site
node $A/abdeckung-streng.cjs /tmp/bau.txt $B
```

Keine Änderung an `authoring/`, `site/`, PR #840 oder seinem Branch; kein Kommentar, kein Merge, kein Deployment.
