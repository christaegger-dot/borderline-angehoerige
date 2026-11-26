# r4-76 · Rückbau der Suche auf den Stand r4-73

Stand 26.11.2026 · gebaut von der Sitzung, die r4-74 und r4-75 gebaut hat · Ausgangsstand `main` `e8efa78` (r4-75, live seit 19:51 UTC).

Dieser Bericht enthält Suchanfragen im Wortlaut, auch solche zu Suizid, Selbstverletzung und Gewalt. Sie stehen nur hier und in den Dateien dieses Ordners, nicht in der Pendenzendatei.

## 1 Kurzfassung

- r4-74 (Suchregeln aus PR #713) und seine Korrektur r4-75 verschlechtern Sicherheitsanfragen gegenüber r4-73. Die Nachprüfung von r4-74 (PR #839) urteilt «blockiert nach R34-P01 a) und c)». r4-75 hat zwei Ursachen behoben; ein Raster dieser Sitzung zeigt, dass weitere bleiben.
- r4-76 nimmt die Änderungen an der Suche vollständig zurück. Die erzeugte Website ist bis auf die Versionskennung identisch mit r4-73. Das ist kein Messergebnis, sondern ein Dateivergleich.
- Verloren gehen damit auch die Verbesserungen aus r4-74. Sie sind als Ziel festgehalten (`authoring/tests/suche-ausbau-offen.tsv`, 31 Erwartungen) und sollen einzeln, mit dem Raster als Gate und mit Nachprüfung vor dem Merge, zurückkommen.

**Zweite eigene Berichtigung.** Der Bericht zu r4-75 schrieb, r4-75 sei auf den Proben der Prüfsitzung «in keinem natürlichen Fall mehr schlechter» als r4-73. Für diese Proben stimmte das. Als Aussage über r4-75 war es zu weit: Sätze über Gewalt ohne «mich» und Sätze mit «schneidet sich» und einem Nachsatz kamen in den Proben nicht vor und sind in r4-75 schlechter als in r4-73.

## 2 Was in r4-75 noch schlechter ist als in r4-73

### 2.1 Quellenblock (PR #713, SU-05)

r4-74 zählt «Quellen zu dieser Seite» nicht mehr zum vorangehenden Abschnitt. Auf 15 Seiten verliert damit der letzte Inhaltsabschnitt Wörter, die nur in den Quellenangaben stehen. Beim Gewaltabschnitt sind das unter anderem «Mann», «Frau», «Notfall». Eine Anfrage muss in jedem ihrer Begriffe treffen; fehlt dem Abschnitt «Mann», scheidet er aus.

| Anfrage | r4-73 | r4-75 (live) |
|---|---|---|
| Mein Mann schlägt zu | «Wenn Gewalt oder Bedrohung vorkommt» | Quellenseite |
| Mein Mann ist gewalttätig | «Wenn Gewalt oder Bedrohung vorkommt» | Quellenseite |
| Meine Frau schlägt zu | «Wenn Gewalt oder Bedrohung vorkommt» | Quellenseite |
| Mein Mann schlägt unseren Sohn | «Wenn Gewalt oder Bedrohung vorkommt» | kein Treffer |

Von 22 Proben zu Gewalt ohne «mich» sind 11 in r4-75 schlechter (`proben-gewalt-ohne-ich.txt`, `ergebnis/proben-gewalt-ohne-ich-r4-73-r4-75-r4-76.txt`). Die bauende Sitzung hatte die verlorenen Wörter in r4-74 gesehen (Stopp-Regel b, «11 Einzelwörter aus dem Quellenblock des Gewaltabschnitts») und als Quellenwörter eingestuft, ohne sie in Sätzen zu prüfen.

### 2.2 Neue Begriffe in bestehenden Gruppen

«schneidet» gehört seit r4-74 zur Gruppe Selbstverletzung. Vorher war es ein einzelnes Suchwort und fand den Abschnitt über dessen Suchbegriffe; als Gruppenmitglied trifft es viele Abschnitte, und ein weiteres Wort der Anfrage schliesst den richtigen aus:

| Anfrage | r4-73 | r4-75 (live) |
|---|---|---|
| Mein Sohn schneidet sich seit Wochen | «Wenn Sie eine Selbstverletzung bemerken» | «Begriffe» |
| Sie schneidet sich wegen mir | «Wenn Sie eine Selbstverletzung bemerken» | «Begriffe» |

Das zeigt die eigentliche Schwierigkeit: Die Suche verlangt, dass ein Treffer jeden Begriff der Anfrage enthält, und weicht nur dann auf eine lockere Suche aus, wenn die strenge nichts findet. Jede Erweiterung einer Gruppe, jedes Füllwort und jede Änderung am Suchindex verschiebt, welche der beiden Suchen greift. Verbesserungen an einer Stelle erzeugen so Verluste an einer anderen.

### 2.3 Raster

`raster.cjs` bildet Sätze aus 18 Handelnden, 54 Aussagen zu Suizid, Selbstverletzung oder Gewalt und 24 Nachsätzen (23 328 verschiedene Anfragen) und vergleicht zwei Stände. Gezählt wird, wo ein Sicherheitsabschnitt aus den ersten zwei Treffern des Bezugsstands im Prüfstand dort fehlt («verloren») oder eine Anfrage mit Treffer keinen mehr hat («leer»).

| Prüfstand gegen r4-73 | verloren | leer | Datei |
|---|---|---|---|
| r4-75 (live) | 646 | 185 | `ergebnis/raster-saetze-r4-73-gegen-r4-75.txt` |
| Zwischenstand: r4-75 mit dem Quellenblock wie in r4-73 | 298 | 0 | `ergebnis/raster-saetze-r4-73-gegen-zwischenstand.txt` |
| r4-76 | 0 | 0 | `ergebnis/raster-saetze-r4-73-gegen-r4-76.txt` |

Nicht jeder «verlorene» Fall ist eine Verschlechterung: Im Zwischenstand sind rund die Hälfte der 298 Fälle Sätze, bei denen der Suizidabschnitt vorher zufällig erschien und jetzt ein passenderer Abschnitt führt («Er beschimpft mich schon wieder» → «Wenn Gespräche kippen»). 144 der 298 betreffen «schneidet sich» und sind echte Verluste. Das Raster ist ein Sieb, kein Urteil; es zeigt aber, dass eine Rücknahme Stück für Stück jeweils neue Fälle übrig lässt.

Die Proben der Prüfsitzung, von dieser Sitzung gegen r4-75 gelaufen (`ergebnis/proben-pruefsitzung-r4-73-gegen-r4-75.txt`): Tötungswort mal Zusätze a) 2 statt 11, c) 0 statt 8; Ich-Aussagen c) 1 statt 330; Tippen c) 1 statt 15. Diese Proben enthalten die Fälle aus 2.1 und 2.2 nicht.

## 3 Der Rückbau

| Datei | Stand |
|---|---|
| `authoring/js/interaktion.js` | byte-gleich mit r4-73 (`3764d45`) |
| `authoring/tools/search-index.mjs` | byte-gleich mit r4-73 |
| `authoring/site.config.json` | drei Suchbegriffe aus r4-74 entfernt; ohne die Release-Felder gleich wie r4-73 |
| `authoring/tests/suche-ersttreffer.tsv` | 235 Erwartungen: die 216 von r4-73 unverändert, 14 Gegen- und Regressionsproben aus r4-74 und r4-75, die r4-73 erfüllt, 5 neue Regressionsproben zu 2.1 und 2.2 |
| `authoring/tests/suche-ausbau-offen.tsv` | neu: 31 Erwartungen aus r4-74 und r4-75, die mit dem Rückbau nicht mehr gelten; vom Suchtest nicht automatisch geprüft |

**Beweis der Gleichheit.** Nach dem Build mit `--write-site`:

- `site/js/interaktion.js`, `site/css/site.css` und `site/_redirects` sind byte-gleich mit dem Stand `3764d45`. Nachgetragen am 26.11.2026 nach der Gegenprüfung (N840-8): `site/_headers` ebenfalls.
- Alle 24 HTML-Dateien sind gleich, wenn man die Kennung `r4-76` und `r4-73` gleichsetzt. Dazu gehört `suche.html` mit dem Suchindex.
- Die Dateiliste von `site/` ist gleich (35 Dateien).

Damit verhält sich die Suche wie in r4-73. Zur Kontrolle im Browser: Auf sechs Probenmengen mit zusammen 926 Anfragen sind die ersten drei Treffer in r4-76 bei jeder Anfrage dieselben wie in r4-73; das Raster zeigt 0 und 0.

**Was r4-73 heisst.** r4-73 war am 26.11.2026 von 19:06 bis 19:34 UTC live. An den Suchregeln hat r4-73 nichts geändert (nur die Leermeldung erhielt einen zweiten Link); es ist der Stand der Suche, der vor r4-74 live war.

## 4 Was mit dem Rückbau wieder gilt

Verbesserungen aus r4-74, die verloren gehen (alle in `suche-ausbau-offen.tsv`):

- Beugungen und Zusammensetzungen von Suizidwörtern («suizidgefährdet», «Selbstmorddrohung», «nach Suizidversuchen»): wieder kein Treffer oder nur ein Quelleneintrag. Von 320 Wörtern der Wortliste führen wieder 22 zuerst auf den Suizidabschnitt.
- Tippfehler («Suizit», «Selbsmord»), Mundart («Si wott nüme läbe»), «Abschiedsnachricht», «Sie redet vom Sterben»: wieder kein Treffer.
- «Er hat sich geschnitten», «Sie hat sich geritzt», «Ohrfeige», «Angst um mein Leben»: wieder kein oder ein sachfremder Treffer.
- «Ich will nicht mehr» führt wieder zuerst auf «Wenn die Person keine Behandlung möchte oder abbricht».
- «Mein Mann schlägt die Kinder»: wieder der Gewaltabschnitt zuerst, Kinderschutz nicht vorangestellt.
- «Zwangseinweisung», «Jugendamt», «Notfallplan», «Zweitmeinung», «Arztgeheimnis»: wieder kein oder ein sachfremder Treffer. «Geheimnis» führt wieder auf «Ihre Frage ist nicht dabei?».
- «FU» allein führt wieder zuerst auf einen Beratungsabschnitt (bekannt als R27-O04).

Bei einer Anfrage ohne Treffer zeigt die Suche die Leermeldung; sie nennt seit r4-73 den Einstieg «Ich sorge mich um Sicherheit, Selbstgefährdung oder Gewalt».

## 5 Prüfungen

| Prüfung | Ergebnis |
|---|---|
| Build `--production --out=site --write-site` | 24 Seiten, 0 Blocker, 20 Hinweise |
| `--production --verify-site` | Parität bestanden, 35 Dateien byte-gleich |
| Selbsttest | 127 von 127 |
| Suchtest, 235 Erwartungen | r4-76: 235 von 235 · r4-75: 229 von 235 · 0 JS-Fehler |
| Suchtest mit `suche-ausbau-offen.tsv` | 0 von 31, wie erwartet |
| Sprach-/UI-Test | 74 Prüfungen bestanden |
| Layouttest | 240 Seitenzustände, 38 Bedienproben, 2 Abweichungen (2 bekannt, 0 neu) |
| axe-core 4.14.0 | 24 Seiten, 96 Läufe, 0 Verstösse |

## 6 Vorschlag für den Wiederaufbau

Nicht Teil dieses Release; Entscheid bei Christa Egger.

1. **Zuerst die Bauweise ändern, dann Begriffe ergänzen.** Erkennt die Suche ein eindeutiges Signal für Suizid, Selbstverletzung oder Gewalt, soll der passende Sicherheitsabschnitt fest unter den ersten Treffern stehen, unabhängig von den übrigen Wörtern der Anfrage. Heute gilt das nur für Tötungswörter. Solange es fehlt, kann jedes zusätzliche Wort den Abschnitt ausschliessen.
2. **Das Raster als Gate.** Jede Änderung an der Suche läuft vor dem PR gegen r4-73: kein verlorener Sicherheitsabschnitt, keine leere Anfrage, ausser einzeln begründet. Das Raster gehört dann nach `authoring/tools/` und in die CI.
3. **Eine Regel je Release**, in dieser Reihenfolge: Tötungswendung mit Nachsatz (ältere Schwäche, N836-12), Wortstamm-Regel (von der Nachprüfung als korrekt und trennbar beurteilt, N836-8), Tippfehler, dann die übrigen Regeln aus PR #713 mit den Befunden N836-4 bis N836-7.
4. **Nachprüfung vor dem Merge**, und der PR bleibt bis dahin ein Entwurf.

## 7 Grenzen des Nachweises

- Die Gleichheit mit r4-73 ist ein Dateivergleich und hängt nicht von Proben ab. Alles andere ist in Chromium gemessen (Chrome Headless Shell 156.0.8078.4, Playwright 1.64.0); keine echten Geräte, keine Screenreader (AR3-3).
- Das Raster ist von der bauenden Sitzung entworfen. Es deckt 54 Aussagen ab; andere Formulierungen können weitere Fälle zeigen. Der zweite Teil des Rasters (jedes Wort des Suchindex mal zehn Schlüsselwörter, rund 50 000 Anfragen) ist für r4-76 nicht zu Ende gelaufen; wegen der Dateigleichheit ändert das am Ergebnis nichts.
- r4-73 ist nicht fehlerfrei, nur der Bezugsstand. Die Lücken aus Abschnitt 4 und die ältere Schwäche bei Tötungswendungen mit Nachsatz bestehen dort.
- Keine fachliche Prüfung.

## 8 Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
git worktree add /tmp/r73 3764d45
node authoring/tools/build.mjs --production --out=site --write-site
cmp site/js/interaktion.js /tmp/r73/site/js/interaktion.js && cmp site/css/site.css /tmp/r73/site/css/site.css && cmp site/_redirects /tmp/r73/site/_redirects
for f in site/*.html; do diff <(sed 's/r4-76/r4-XX/g' $f) <(sed 's/r4-73/r4-XX/g' /tmp/r73/$f) > /dev/null || echo "ungleich: $f"; done
node authoring/tools/suchtest.mjs site
A=audit-results/2026-11-26-rueckbau-suche-r4-76
NUR=saetze node $A/raster.cjs /tmp/r73/site site /tmp/raster r4-76
```
