# r4-74 · Suchregeln aus PR #713 (zweiter Teil)

Stand 26.11.2026 · gebaut von der Sitzung, die auch PR #822, #824, #830 und #833 gebaut hat · Ausgangsstand `main` `3764d45` (r4-73).

Dieser Bericht enthält Suchanfragen im Wortlaut, auch solche zu Suizid, Selbstverletzung und Gewalt. Sie stehen nur hier und in den Dateien dieses Ordners, nicht in der Pendenzendatei.

## 1 Auftrag

PR #713 (Entwurf vom 23.10.2026, Stand r4-42) lag seit einem Monat offen. Entscheid von Christa Egger vom 26.11.2026: «Neu aufsetzen als Release». Der erste Teil ohne die Suchregeln ist als r4-73 gemergt (PR #833). Dieser zweite Teil enthält nur die Suchregeln. Der Bericht von PR #713 empfahl dafür eine Nachprüfung vor dem Merge durch eine Sitzung, die nicht gebaut hat; das gilt hier unverändert.

Sichtbarer Wortlaut ändert sich nicht. Geändert sind `authoring/js/interaktion.js` (Suche), `authoring/tools/search-index.mjs`, drei Suchbegriffe in `authoring/site.config.json` und die Liste `authoring/tests/suche-ersttreffer.tsv`.

## 2 Was sich ändert

### 2.1 Aus PR #713 übernommen

| Kürzel in #713 | Änderung | Beispiel |
|---|---|---|
| SU-01 | 13 Füllwörter aus Alltagssätzen werden übergangen (vom, redet, spricht, sagt, sagte, schreibt, erzählt, immer, wieder, oft, gegeben, gemacht, getan) | «Sie redet vom Sterben» |
| SU-01 | Weitere Suizidbegriffe, auch Mundart | «Abschiedsnachricht», «Si wott nüme läbe» |
| SU-01 | Tippfehler in 34 Schlüsselwörtern: ein Wort ab fünf Zeichen, das auf der Website nicht vorkommt und von genau einem Schlüsselwort um ein Zeichen abweicht | «Suizit», «Selbsmord», «Boderline» |
| SU-01 | Eine Anfrage, die auf «will / möchte / mag nicht mehr» endet: zuerst «Wenn Suizidgedanken ein Thema sind», danach «Warnsignale für Überlastung» | «Er sagt er will nicht mehr» |
| SU-01 | Weitere Begriffe für Selbstverletzung | «Er hat sich geschnitten» |
| SU-02 | Weitere Gewaltbegriffe; Gewalt gegen die eigene Person | «Ohrfeige», «Angst um mein Leben» |
| SU-02 | Kinder als Betroffene von Gewalt ohne Tötungswort: Kinderschutz zuerst | «mein Mann schlägt die Kinder» |
| SU-02, SU-09 | Neue Gruppen: Streit und Aggression, Beschimpfung, Kindesschutzbehörde, Mentalisierung, Krisenplan | «aggressiv», «Jugendamt», «Notfallplan» |
| SU-05 | «Quellen zu dieser Seite» zählt nicht mehr zum vorangehenden Abschnitt | «Geheimnis» führte auf «Weitere Fragen», weil dort der Quellenblock folgt |
| SU-05 | Drei Suchbegriffe in der Konfiguration | «Zweitmeinung», «Arztgeheimnis», «Zwangseinweisung» |
| SU-06 | Begriffe zur Einweisung; «FU» und «IV» nur als ganzes Wort | «FU» traf vorher jedes «für» |

### 2.2 An den heutigen Stand angepasst

Der Gewaltabschnitt liegt seit r4-46 auf «Wenn es gefährlich wird» (`gefahr.html#gewalt`), nicht mehr auf «Grenzen setzen». Fünf Erwartungen aus PR #713 nennen deshalb das heutige Ziel. Die Regeln selbst verwenden das Ziel aus dem Skript und brauchten keine Anpassung.

### 2.3 Ergänzt gegenüber PR #713

Die Prüfung mit einer Wortliste (Abschnitt 5) hat eine Lücke gezeigt, die schon vor PR #713 bestand und von dessen Regeln nicht geschlossen wird: Die Suche kannte eindeutige Suizidwörter nur in den aufgezählten Formen. Von 320 Wörtern der Wortliste mit einem Suizid-Wortstamm führten 22 zuerst auf «Wenn Suizidgedanken ein Thema sind», 294 hatten keinen Treffer, 4 einen anderen Ersttreffer. Ohne Treffer blieben zum Beispiel «suizidgefährdet», «Selbstmorddrohung», «Suizidrisiko» und «lebensmüden»; «Suizidversuchen» führte nur auf einen Quelleneintrag.

| Ergänzung | Umfang |
|---|---|
| Wortstamm-Regel: Ein Wort, das einen von zehn Stämmen enthält (suizid, selbstmord, selbstmörd, selbsttötung, lebensmüd, abschiedsbrief, todeswunsch, todeswünsch, freitod, überdos), zählt wie das Grundwort | eine kurze Funktion in `interaktion.js`, vor der Tippfehlerregel |
| Vier Formen von «ritzen» (geritzt, ritzte, aufritzen, aufgeritzt) und «Selbstverletzungen» | Gruppe Selbstverletzung |
| «Beleidigungen» | Gruppe Beschimpfung aus #713, dort fehlte die Mehrzahl |
| «schreibt vom Tod» | neben «redet / spricht vom Tod» aus #713 |

Nach der Ergänzung führen alle 320 Wörter zuerst auf den Suizidabschnitt (`ergebnis/wortliste-suizidstamm.txt`). Die Regel wendet einen bestehenden Entscheid an (eindeutige Suizidwörter führen zum Suizidabschnitt, D30-17); sie legt keine neue Reihenfolge von Sicherheitsabschnitten fest.

### 2.4 Nicht enthalten

X1/KR-01 (Silbentrennung) aus PR #713 bleibt offen, wie in r4-73 festgehalten. Der Platzhalter des Suchfelds (P4-3) ist unverändert.

## 3 Prüfungen

| Prüfung | Ergebnis |
|---|---|
| Build `--production --out=site --write-site` | 24 Seiten, 0 Blocker, 20 Hinweise (unverändert) |
| `--production --verify-site` | Parität bestanden, 35 Dateien byte-gleich |
| Selbsttest | 127 von 127 |
| Suchtest, Liste mit 253 Erwartungen | r4-73: 222 von 253 · r4-74: 253 von 253, 0 JS-Fehler |
| Sprach-/UI-Test | 74 Prüfungen bestanden |
| Layouttest | 240 Seitenzustände, 38 Bedienproben, 2 Abweichungen (dieselben wie in r4-73: Sicherheitskarte bei 375 × 667 und 360 × 740) |
| axe-core 4.14.0 | 24 Seiten, 96 Läufe, 0 Verstösse |

Die Liste wuchs von 216 auf 253 Erwartungen: 25 aus PR #713, 12 zur Ergänzung (davon 2 Gegenproben), eine geändert («Geheimnis», SU-05). Die übrigen 215 bestehenden Erwartungen gelten unverändert.

Geändert in `site/`: 24 HTML-Dateien (Versionskennung; `suche.html` zusätzlich mit dem Suchindex) und `js/interaktion.js`. (Berichtigt am 26.11.2026 nach dem Merge: hier stand `assets/interaktion.js`.)

## 4 Vorher-Nachher-Vergleich

`vergleich.cjs` lässt jede Anfrage im Browser gegen beide Stände laufen (r4-73 aus `main`, r4-74 aus diesem Branch), mit dem echten Skript der jeweiligen Website.

| Anfragemenge | Anfragen | erste drei Treffer geändert | Datei |
|---|---|---|---|
| Festgeschriebene Liste | 253 | 42 | `ergebnis/festgeschrieben.txt` |
| Zusatzproben dieser Sitzung (13 Gruppen) | 205 | 147 | `ergebnis/zusatzproben-ergebnis.txt` |
| Jedes Wort des Suchindex einzeln | 5046 | 348 | `ergebnis/wortschatz-aenderungen.txt` |
| Wortliste gegen die Tippfehlerregel | 27 Kandidaten aus 1 680 838 Wörtern | 25 | `ergebnis/wortliste-tippfehlerregel.txt` |

Suchindex: 215 Einträge vorher und nachher. 15 Abschnitte verlieren den Text des Quellenblocks, 3 erhalten die neuen Suchbegriffe (`ergebnis/suchindex-aenderungen.txt`).

Bilder: `bilder/suche-zusammensetzung-375-vorher-nachher.png`, `bilder/suche-will-nicht-mehr-375-vorher-nachher.png`.

## 5 Wortlisten-Prüfung

Wortliste: npm-Paket `all-the-german-words` 1.1.0 (MIT-Lizenz, 1 680 838 Wörter, mit gebeugten Formen). Sie ist nicht Teil des Repositorys.

**Tippfehlerregel.** Gesucht waren harmlose Wörter, die die Regel in ein Schlüsselwort umschreibt. 27 Wörter der Liste weichen von einem der 34 Schlüsselwörter um ein Zeichen ab (gleicher Anfangsbuchstabe, ab fünf Zeichen). 26 davon sind Formen oder Ableitungen des Schlüsselworts selbst («Suizids», «Therapien», «Borderliner», «selbstverletzend»). Das einzige andere Wort ist «Selbstversetzung»; es führt neu auf den Abschnitt zu Selbstverletzung. Kein Alltagswort wird in ein Suizidwort umgeschrieben. Die Gegenprobe «schlafen» aus PR #713 bleibt ohne Sicherheitsabschnitt.

**Wortstamm.** Siehe 2.3. Aufruf: `node wortstamm.cjs <vorher> <nachher> <woerter.json> <ausgabe>`.

## 6 Stopp-Regel R34-P01

Geprüft über alle vier Anfragemengen (`ergebnis/stoppregel.txt`).

| Kriterium | Fälle | Einordnung |
|---|---|---|
| a) Anfrage mit Tötungswort: Suizid fällt aus den ersten zwei Treffern (ausser Kinder zuerst) | 0 | – |
| b) Sicherheitsabschnitt stand unter den ersten zwei und fehlt nachher unter den ersten drei | 16 | keine Anheftung betroffen, siehe unten |
| c) Vorher Treffer, nachher keiner | 26 | keine Ich-Aussage betroffen, siehe unten |
| d) Gegenprobe: Sicherheitsabschnitt neu unter den ersten zwei | 105 | beabsichtigt; Nebenwirkungen in Abschnitt 7 |

Zu b): 11 Einzelwörter aus dem Quellenblock des Gewaltabschnitts («EBG», «Opferbetreuung», «polizeiliche»); der Abschnitt war dort nur Treffer, weil sein Quellenblock mitgezählt wurde. «Selbstverletzungen» (drei Zeilen, in drei Mengen) führt neu zuerst auf den Abschnitt zu Selbstverletzung statt auf «Suizidgedanken und Suizidalität» der Diagnoseseite. Zwei Zusatzproben mit «immer wieder» hatten den Suizidabschnitt nur zufällig oben, weil die beiden Füllwörter dort vorkommen. Keine dieser Anfragen war angeheftet.

Zu c): 24 Einzelwörter kommen nur in einem Quellenblock vor, vor allem in den Angaben «Verwendet in» («Akuthinweis», «Risikostufen», «Atemzüge»). Dazu die Zusatzproben «Rückfall immer wieder» und «IV Rente»; beide hatten vorher einen zufälligen Treffer (über «immer wieder» und über «iv» in «positiv»).

Ergebnis: kein blockierender Fall nach R34-P01.

## 7 Nebenwirkungen und Beobachtungen

1. **Quellenblock (SU-05).** Wörter, die nur in «Quellen zu dieser Seite» stehen, führen nicht mehr auf den Abschnitt davor. Die Quellen selbst bleiben über die Seite «Quellen» auffindbar; die Angaben «Verwendet in» stehen dort nicht.
2. **«will nicht mehr» am Ende.** Jede solche Anfrage beginnt neu mit dem Suizidabschnitt, vorher mit «Wenn die Person keine Behandlung möchte oder abbricht». Das gilt auch für «Ich mag nicht mehr», das oft Erschöpfung meint; «Warnsignale für Überlastung» steht an zweiter Stelle. Folgt eine Ergänzung («will nicht mehr streiten», «… in die Schule»), bleibt alles wie vorher. Die Reihenfolge stammt aus PR #713 und ist eine Sicherheitsabwägung, keine fachliche Aussage.
3. **Gewalt und «will nicht mehr» zusammen** («er schlägt mich und ich will nicht mehr»): zuerst der Gewaltabschnitt, dann Kinderschutz; der Suizidabschnitt steht nicht unter den ersten fünf. Vorher stand keiner der Sicherheitsabschnitte oben.
4. **Harmlose Fehltreffer.** «Haare geschnitten» führt auf den Abschnitt zu Selbstverletzung. «Selbstmordattentäter» und «Suizidprävention» führen auf den Suizidabschnitt.
5. **Leere Ergebnisse.** «Rückfall» hat weiterhin keinen Treffer (die Website spricht von Rückschlägen), «IV Rente» neu keinen. Die Leermeldung nennt seit r4-73 zwei Einstiege.
6. **Alltagssatz mit neuem Füllwort.** «Er sagt er liebt mich nicht» führt neu auf zwei Bücherabschnitte, vorher auf «Beziehungen». Beide Treffer sind zufällig.
7. **Grenzen der Tippfehlerregel.** Sie gilt für 34 Schlüsselwörter. Vertauschte Buchstaben («Krisenpaln») und Fehler in anderen Wörtern korrigiert sie nicht.
8. **Mundart** ist nur punktuell abgedeckt («Chind», «cha nümme», «wott nümme»). «mini Chind» führt auf einen Quelleneintrag.
9. **Beim Tippen** erscheinen Treffer für ein Schlüsselwort einen Buchstaben früher («Suizi»).

## 8 Grenzen des Nachweises

- Geprüft in Chromium (Chrome Headless Shell 156.0.8078.4, Playwright 1.64.0). Keine Prüfung auf echten Geräten und mit Screenreadern (AR3-3).
- Die Zusatzproben hat die bauende Sitzung selbst gewählt. Die Wortliste ist allgemeines Deutsch, kein Schweizerdeutsch.
- Keine fachliche Prüfung der Reihenfolgen und keine Prüfung mit Nutzerinnen und Nutzern.
- Die Wortstamm-Regel und die übrigen Ergänzungen aus 2.3 gehen über PR #713 hinaus und sind von niemandem ausser der bauenden Sitzung geprüft.

## 9 Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
git worktree add /tmp/vorher 3764d45
node authoring/tools/build.mjs --production --out=site --write-site
node authoring/tools/build.mjs --production --verify-site
node authoring/tools/suchtest.mjs site
node audit-results/2026-11-26-pr713-teil2-suche-r4-74/vergleich.cjs /tmp/vorher/site site /tmp/ergebnis <woerter.json>
```

`<woerter.json>` ist `node_modules/all-the-german-words/woerter.json` nach `npm install all-the-german-words@1.1.0` in einem Ordner ausserhalb des Repositorys. Ohne Wortliste läuft der Vergleich für die ersten drei Anfragemengen.
