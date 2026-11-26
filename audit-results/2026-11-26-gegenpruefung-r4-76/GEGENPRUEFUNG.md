# Gegenprüfung r4-76 · Rückbau der Suche auf den Stand r4-73

**Identisch mit r4-73 bis auf die Kennung: ja.**

**Widerspruch #841 gegen Bericht r4-76:** In der Sache hat der Bericht zu r4-76 recht: r4-75 war gegenüber r4-73 schlechter (Raster nachgemessen: 646 verloren, 185 leer, Datei identisch). Die Beispiele aus dessen Abschnitt 2 fallen zwar nicht unter R34-P01, insofern ist das Urteil von #841 für diese Fälle richtig. Es ist aber trotzdem zu weit: Mit klaren Ich-Aussagen («Ich habe Angst, mein Mann wird gewalttätig») finde ich Fälle nach R34-P01 c), die die Proben von #841 nicht enthalten (N840-2).

Stand 26.11.2026, 22:05 bis 22:40 UTC · unabhängige Prüfsitzung: nicht die Sitzung, die r4-74 bis r4-76 gebaut hat, und auch nicht die Sitzung von #839/#841 · zweiter Versuch (der erste brach um 21:08 UTC an einem Nutzungslimit ohne Bericht ab) · geprüft: `main` `7809d52` (enthält #840 `b529695`, #843 `9f7f052`, #842) · Vergleichsstände r4-73 `3764d45`, r4-75 `e8efa78`.

Dieser Ordner enthält Suchanfragen im Wortlaut, auch zu Suizid, Selbstverletzung und Gewalt. Sie stehen nur hier.

## Befunde

| Kennung | Schweregrad | Befund |
|---|---|---|
| N840-1 | Hinweis (bestätigt) | `site/` auf `main` ist bis auf die Kennung identisch mit r4-73; live ausgeliefert |
| N840-2 | mittel (Nachweis) | Das Urteil von #841 «blockiert nicht nach R34-P01» hält nicht: r4-75 hatte Fälle nach c) |
| N840-3 | Hinweis | Die Beispiele aus Abschnitt 2 des Berichts zu r4-76 sind Verschlechterungen ausserhalb der Stopp-Regel |
| N840-4 | mittel (vorbestehend, live) | Auch r4-73 und damit die Live-Website haben Lücken bei klaren Sicherheitsanfragen |
| N840-5 | niedrig | R34-P01 deckt einen Fall nicht ab: eine Anfrage mit Tötungswort, die jeden Treffer verliert |
| N840-6 | niedrig | Testliste: 216 Erwartungen von r4-73 unverändert; zwei der 19 Zusätze legen Zufälliges fest |
| N840-7 | niedrig | Pendenzendatei: Zitierregel eingehalten, Zeiten stimmen; #841 fehlt, zwei Überschriften sind veraltet |
| N840-8 | Hinweis | Kleinigkeiten in den Nachweisen: `_headers` nicht genannt; Layouttest endet mit Rückgabewert 1 |

## A · Kernfrage (N840-1)

| Prüfung | Ergebnis | Nachweis |
|---|---|---|
| Build `--production --out=site --write-site` auf `main` | 24 Seiten, 0 Blocker, 20 Hinweise; `git status` danach ohne Änderung an `site/` | Sitzungsprotokoll |
| `--production --verify-site` auf `main` | Parität bestanden, 35 Dateien byte-gleich | Sitzungsprotokoll |
| `--production --verify-site` im Worktree `3764d45` | Parität bestanden, 35 Dateien: Der Bezugsstand lässt sich selbst reproduzieren | Sitzungsprotokoll |
| Dateiliste `site/` von `main` und `3764d45` | gleich, 35 Dateien | `ergebnis/a-dateivergleich.txt` |
| `js/interaktion.js`, `css/site.css`, `_redirects`, `_headers` | alle vier byte-gleich | ebd. |
| 24 HTML-Dateien nach Gleichsetzen von `r4-76` und `r4-73` | 24 von 24 gleich | ebd. |
| Wo steht die Kennung? | In jeder HTML-Datei genau 3-mal: `data-puk-site-build="r4-76"`, `css/site.css?v=r4-76`, `js/interaktion.js?v=r4-76` (in 404.html mit führendem `/`). Das sind 72 Vorkommen, eine andere Form gibt es nicht. `r4-73` steht in `site/` von `main` nur in den drei byte-gleichen Dateien CSS, JS und `_redirects`, dort in Kommentaren («umgesetzt in r4-73»). `r4-76` kommt in `site/` von `3764d45` nicht vor. Das Gleichsetzen verdeckt also nichts. | ebd. |
| `authoring/js/interaktion.js`, `authoring/tools/search-index.mjs`, `authoring/css/site.css` | byte-gleich mit `3764d45` | ebd. |
| `authoring/site.config.json` ohne `assetVersion` und `releaseApproval` | gleich | ebd. |
| Live, 22:10 bis 22:11 UTC | `data-puk-site-build="r4-76"`. `js/interaktion.js?v=r4-76` und `css/site.css?v=r4-76` sind byte-gleich mit `site/` auf `main`. Die 215 Sucheinträge auf `/suche` (Titel, Text, Schlüsselwörter, Ziel) sind gleich wie in `site/suche.html`. | `ergebnis/a-live.txt`, `live-suchindex.cjs` |

**Was in `authoring/` sonst anders ist als in `3764d45`** (`git diff --stat 3764d45 HEAD -- authoring/`):

- `site.config.json`: nur `assetVersion` und `releaseApproval` (Kennung und Release-Text).
- `tools/contract.js`: nur `BUILD = 'r4-76'`.
- `tests/suche-ersttreffer.tsv` (19 Zeilen mehr) und neu `tests/suche-ausbau-offen.tsv` (31 Erwartungen): Testdaten, sie wirken nicht auf `site/` (siehe N840-6).
- `tools/layouttest.cjs`, `tools/layouttest-report.cjs`: aus #832 und #842 (bekannte Abweichungen im Layouttest). Prüfwerkzeug, wirkt nicht auf `site/`.

Keine dieser Änderungen betrifft die erzeugte Website. Das Urteil beruht auf einem Dateivergleich und hängt nicht von Suchproben ab. Gegenprobe im Browser: Auf meinen 94 eigenen Proben (`proben-b*.tsv`) sind die ersten drei Treffer in r4-76 überall dieselben wie in r4-73.

## B · Widerspruch zwischen den Berichten

### Grundlage

R34-P01 (`audit-results/2026-10-15-delta-r4-34/FREIGABE.md`, Bezugsstand seit r4-76 wieder r4-73) blockiert in drei Fällen: **a)** Bei einer Anfrage mit Tötungswort fällt Suizid aus den ersten zwei Treffern, ausser Kinder stehen zuerst. Reine Gewaltanfragen ohne Tötungswort sind nicht gemeint. **b)** Eine Anheftung geht verloren. Angeheftet wird in r4-73 nur bei erkannten Tötungswörtern. **c)** Eine klare Ich-Aussage hat keinen Treffer. Frühere Praxis (r4-34, `PRODUKTIONSPRUEFUNG.md`): «Mein Mann bringt mich … um» gilt nicht als Ich-Aussage; Sätze in der dritten Person mit «mich» zählen also nicht.

Beide Berichte haben dieselben Stände gemessen: `9d0d237` und `dd49ce8` (#841) haben dasselbe `site/` wie `3764d45` und `e8efa78` (`git diff` leer).

### Messungen

| Menge | Anfragen | gleich wie r4-73 | a) | b) | c) | schlechter ausserhalb der Stopp-Regel | Datei |
|---|---|---|---|---|---|---|---|
| Raster der bauenden Sitzung, `NUR=saetze` | 23 328 | – | 0 | 0 | 1 eng (ungrammatisch), 24 weit | 646 verloren, 185 leer | `ergebnis/b-raster-saetze-r4-73-gegen-r4-75.txt`, `ergebnis/b-raster-einordnung.txt` |
| Eigene Proben (Gewalt ohne «mich», «schneidet sich», Suizid, Tötungswort) | 70 | 44 | 0 | 0 | 0 | 14 | `proben-b.tsv`, `ergebnis/b-eigene-proben.txt` |
| Nachproben zu Rasterfällen | 11 | 4 | 0 | 0 ¹ | 5 weit | 1 | `proben-b2.tsv`, `ergebnis/b-nachproben.txt` |
| Klare Ich-Aussagen zu Gewalt und Selbstverletzung | 13 | 6 | 0 | 0 | 1 | 4 | `proben-b3.tsv`, `ergebnis/b-ich-aussagen.txt` |

¹ Mein Skript zählt in `b-nachproben.txt` einen Fall unter b), weil es breit misst (Sicherheitsabschnitt bei Tötungswort verloren). Eine Anheftung lag dort in r4-73 nicht vor (siehe N840-5). Nach R34-P01 ist das kein b).

Die Rasterzahlen 646 und 185 habe ich mit `raster.cjs` selbst erzeugt. Die Ergebnisdatei ist byte-gleich mit der Datei der bauenden Sitzung (bis auf Leerzeilen verglichen).

### N840-3 · Abschnitt 2 des Berichts zu r4-76: richtig, aber ausserhalb der Stopp-Regel (Hinweis)

Selbst nachgemessen (r4-73 → r4-75):

- Gewalt durch den Mann oder die Frau ohne «mich»: «Mein Mann schlägt zu», «Meine Frau schlägt zu», «Frau schlägt Mann», «Gewalt gegen den Mann», «häusliche Gewalt mein Mann», «Mann gewalttätig was tun» führen in r4-73 zuerst auf den Gewaltabschnitt, in r4-75 nur noch auf die Quellenseite. «Meine Frau ist gewalttätig geworden» und «Mein Mann schlägt unseren Sohn» haben in r4-75 gar keinen Treffer mehr. Ursache wie berichtet: Der Gewaltabschnitt fand diese Anfragen über «Gleichstellung von Frau und Mann (EBG)» im Quellenblock (`site/suche.html`, Eintrag «Wenn Gewalt oder Bedrohung vorkommt»).
- «schneidet sich» mit Nachsatz: «Er schneidet sich immer noch» und «Mein Sohn schneidet sich mit einer Klinge» verlieren den Abschnitt zur Selbstverletzung aus den ersten zwei Treffern.

Einordnung: Keiner dieser Fälle enthält ein Tötungswort (also nicht a)), keiner hatte in r4-73 eine Anheftung (also nicht b)), und keiner ist eine Ich-Aussage im Sinn der Praxis von r4-34 (also nicht c)). Es sind echte Verschlechterungen für Hilfesuchende, aber die Stopp-Regel greift bei ihnen nicht. Für diese Fälle ist #841 also nicht widerlegt; die Proben von #841 enthalten sie schlicht nicht.

### N840-2 · Das Urteil von #841 hält nicht: Fälle nach c) in r4-75 (mittel, Nachweis)

| Anfrage | r4-73 | r4-75 |
|---|---|---|
| Ich habe Angst, mein Mann wird gewalttätig | Gewaltabschnitt | kein Treffer |
| Ich bin verzweifelt, mein Mann schlägt zu | Gewaltabschnitt | kein Treffer |
| Mein Mann wird gewalttätig und ich habe Angst | Gewaltabschnitt | kein Treffer |
| Meine Frau wird gewalttätig, was kann ich machen? | Gewaltabschnitt | kein Treffer |
| Ich brauche Hilfe, mein Mann ist gewalttätig | Gewaltabschnitt, Quellenseite | nur Quellenseite |
| Ich werde von meiner Frau geschlagen | Gewaltabschnitt, Quellen | nur Quellen |

Die ersten beiden Sätze beginnen mit «Ich» und sind nach meinem Verständnis klare Ich-Aussagen. Sie haben in r4-75 keinen Treffer, und damit ist R34-P01 c) erfüllt. Die nächsten beiden enthalten den Teilsatz «ich habe Angst» oder «was kann ich machen»; ob sie zählen, ist eine Frage der Lesart. Das Raster zeigt 24 solche Fälle (Liste `ergebnis/b-raster-einordnung.txt`, «c) weit»). Die letzten beiden haben noch einen Treffer, verlieren aber den Gewaltabschnitt; das ist kein c).

**Urteil:** Nach R34-P01 c) war r4-75 gegenüber r4-73 blockierend. Die Aussage von #841 «nach c) nur einen ohne Sicherheitsbezug» gilt nur für die dort geprüften Proben. Die Ursache ist dieselbe wie in N840-3, der Quellenblock (SU-05). Das hat schon #841 selbst bei «Ich weine oft» gesehen (N838-2), es aber nicht mit Gewaltsätzen geprüft. Praktisch ändert das nichts mehr, weil r4-75 seit 20:54 UTC nicht mehr live ist. Es betrifft den Nachweis: #841 sollte vor einem Merge berichtigt werden, und für den Wiederaufbau zeigt es, dass Proben aus Ich-Satz und Gewalt durch Dritte zusammen in die Gates gehören. Wie c) zu lesen ist, entscheidet Christa Egger.

**Reproduktion:** `node proben-b.cjs proben-b3.tsv r4-73=<3764d45>/site r4-75=<e8efa78>/site r4-76=site` (siehe unten).

## C · Weitere Prüfungen

### Gates auf `main` (`ergebnis/gates/`)

| Prüfung | Ergebnis |
|---|---|
| `selftest.mjs` | 127 von 127 |
| `suchtest.mjs site` | 235 von 235, 0 JS-Fehler |
| `suchtest.mjs site authoring/tests/suche-ausbau-offen.tsv` | 0 von 31, wie vorgesehen (Gegenprobe: r4-75 erfüllt 31 von 31; r4-75 erfüllt von den 235 nur 229, die sechs Abweichungen sind die Regressionsproben aus N840-3 und «Geheimnis») |
| `sprachtest.mjs site` | 74 Prüfungen bestanden, 0 JS-Fehler |
| `layouttest.cjs` | 240 Seitenzustände, 38 Bedienproben, 2 Abweichungen (2 bekannt, 0 neu); Rückgabewert 1 (siehe N840-8) |

### N840-6 · Testliste (niedrig)

- Die 216 Erwartungen aus r4-73 stehen unverändert und in gleicher Reihenfolge am Anfang von `authoring/tests/suche-ersttreffer.tsv` (`diff` leer). Dazu kommen 19 Zeilen; keine bestehende ist geändert oder gelöscht. Zusammen sind es 235.
- Die 19 Zusätze sind überwiegend sinnvolle Ziele (Suizid, Gewalt, Selbstverletzung auf den richtigen Abschnitt, harmlose Gegenproben mit `!sicher`). Zwei legen Zufälliges fest:
  - Die vier Regressionsproben zu Mann und Frau (zum Beispiel «Mein Mann schlägt zu») sind als Ziel richtig. In r4-73 erfüllt sie aber nur der Name «Büro für die Gleichstellung von Frau und Mann» im Quellenblock. Die Herkunftsspalte nennt das («Quellenblock zählt wieder zum Abschnitt»). Ein Wiederaufbau, der SU-05 wieder einführt, muss sie mit eigenen Suchbegriffen des Gewaltabschnitts erfüllen und nicht über die Quellen. So verstanden ist die Festlegung kein Fehler, aber leicht falsch zu lesen.
  - «Lebensmut → –» verlangt *keinen* Treffer. Gemeint ist nur, dass «Lebensmut» nicht über den Wortstamm auf Suizid führen soll. Es liegt aber thematisch nahe («keinen Lebensmut mehr»): Eine spätere sachgerechte Verknüpfung, etwa mit Warnsignalen, würde den Test brechen. `!sicher` oder `!krise.html#suizid` wäre die engere Fassung. Das ist die Festlegung, die man später bereuen könnte.

### N840-4 · Gegenargumente: Was r4-73 schlechter macht (mittel, vorbestehend, live)

Ehrlich die stärksten Punkte gegen den Rückbau, alle auf der heutigen Live-Website (r4-76 = r4-73) gemessen:

1. **Suizidwörter in gebeugter oder zusammengesetzter Form finden nichts.** «Meine Tochter ist suizidgefährdet», «suizidgefährdet», «Selbstmorddrohung», «lebensmüden», «Medikamentenüberdosis»: kein Treffer. «nach Suizidversuchen» führt nur auf einen Quelleneintrag. In r4-75 führten alle zuerst auf den Suizidabschnitt. Wer diese Wörter eintippt, ist am ehesten in akuter Sorge.
2. **Alltagsnahe Sätze zum Sterben und zur Selbstverletzung finden nichts.** «Sie redet vom Sterben», «Meine Mutter spricht ständig vom Sterben», «Sie hat sich geritzt», «Er hat sich geschnitten», «Sie schneidet sich nach jedem Streit», «Mein Kind schneidet sich und ich weiss nicht weiter»: kein Treffer oder ein sachfremder. «Er schreibt vom Tod» führt auf «Begriffe».
3. **«Ich will nicht mehr»** führt zuerst auf «Wenn die Person keine Behandlung möchte oder abbricht», nicht auf den Suizidabschnitt.
4. **Klare Ich-Aussagen zu Gewalt ohne Treffer auch in r4-73:** «Ich habe Angst, meine Frau schlägt zu» und «Ich habe Angst, mein Mann schlägt unseren Sohn» haben in r4-73 und in r4-75 keinen Treffer. Das ist keine Regression und deshalb nach R34-P01 nicht blockierend, für Hilfesuchende aber derselbe Schaden wie N840-2.
5. **Tippfehler und Mundart** («Suizit», «Selbsmord», «Si wott nüme läbe»): kein Treffer.

Abschwächung: Bei leerem Ergebnis nennt die Leermeldung seit r4-73 den Einstieg «Ich sorge mich um Sicherheit, Selbstgefährdung oder Gewalt» (in `site/suche.html` geprüft). Ein Weg zur Hilfe bleibt also, nur ein Klick weiter.

Abwägung, ohne Entscheid: r4-75 war bei Einzelwörtern und kurzen Sätzen zu Suizid deutlich besser, bei Gewalt durch Dritte und bei «schneidet sich» mit Nachsatz schlechter, und es verletzte c). Der Rückbau tauscht also bekannte Lücken gegen Verluste ein, die eine neue Regel verursacht hatte. Er ist mit der Stopp-Regel vereinbar, weil R34-P01 nur Verschlechterungen gegenüber dem Bezugsstand misst. Er ist aber kein Zustand, der für Hilfesuchende gut ist. Die Lücken aus 1 bis 4 gehören beim Wiederaufbau nach vorn.

### N840-5 · Lücke der Stopp-Regel: Tötungswort, danach kein Treffer (niedrig)

«mein mann bringt sich um polizei» führt in r4-73 auf den Gewaltabschnitt, in r4-75 auf keinen Treffer. «mein bruder bringt sich um ständig» (r4-73 sachfremd) ist in r4-75 ebenfalls leer. a) greift nicht, weil Suizid schon in r4-73 nicht unter den ersten zwei stand. b) greift nicht, weil r4-73 die trennbare Wendung ohne Komma nicht erkennt und deshalb nichts anheftet. Mit Komma («Mein Mann bringt sich um, Polizei?») heftet r4-73 an, in beiden Ständen gleich. Das ist die ältere Schwäche N836-12. Vorschlag für den Wiederaufbau (Entscheid Christa Egger): Die Stopp-Regel soll auch dann blockieren, wenn eine Anfrage mit Tötungswort ihren letzten Sicherheitstreffer oder jeden Treffer verliert.

### N840-7 · Pendenzendatei auf `main` (niedrig)

- **Zitierregel:** In den Abschnitten r4-73 bis r4-76 und im Kopf steht keine Suchprobe im Wortlaut, die ein Töten, eine Suizidabsicht oder eine Gewalttat ausdrückt. Wörtlich stehen nur Einzelwörter («schneiden», «ritzen», «Mann», «Frau», «Notfall») und Abschnittstitel. Eingehalten.
- **Zeiten** (Commit-Zeit der Merge-Commits, UTC): #833 `3764d45` 19:06:39 ✓, #836 `8d95e6a` 19:33:31 ✓, #838 `e8efa78` 19:51:28 ✓, #840 `b529695` 20:54:23 ✓. #839 `6f06888` wurde um 20:42:50 gemergt; die Datei nennt nur «erstellt 19:49 UTC», keine Merge-Zeit. #843 `9f7f052` (22:07:59) ist die Nachführung selbst und steht deshalb nicht darin. Ebenfalls nicht genannt ist #842 `7809d52` (22:08:29), der Layouttest betrifft und nicht die Website.
- **Status:** Die Aussage «Die Gegenprüfung des Rückbaus läuft seit 20:53 UTC … noch kein Bericht» war um 22:10 UTC richtig. **#841** (Entwurf, offen, Nachprüfung von r4-75, Urteil «blockiert nicht») erscheint in der Datei nicht, obwohl es den Stand einordnet, der 63 Minuten live war; der Status sollte mit Link und dem Hinweis auf N840-2 nachgeführt werden. Die Überschriften der Abschnitte r4-74 und r4-75 lauten noch «auf `main` seit 26.11.2026», obwohl beide zurückgenommen sind. Im Text steht das richtig, in der Überschrift fehlt es.
- Die Zahlen der Datei zu r4-76 (Raster 646/185, Suchtest 235 und 229, 0 von 31) habe ich nachgemessen und bestätigt. Die Zahlen zum Zwischenstand (298, davon 144 echte Verluste) habe ich nicht nachgemessen.

### N840-8 · Kleinigkeiten (Hinweis)

- Der Bericht zu r4-76 (Abschnitt 3) nennt `_headers` in der Liste der byte-gleichen Dateien nicht. Gemessen: `_headers` ist byte-gleich mit r4-73.
- `layouttest.cjs` endet mit Rückgabewert 1, sobald es überhaupt Abweichungen gibt, auch wenn alle bekannt sind (`process.exitCode=1` bei `issues.length`). Die Berichte nennen nur die Ergebniszeile «2 bekannt, 0 neu». Ob die CI das über `layouttest-report.cjs` richtig unterscheidet, habe ich nicht geprüft.

## Grenzen

- Gemessen in Chromium über Playwright (`/opt/borderline-browser`), lokal über einen eigenen HTTP-Server; keine echten Geräte, kein Screenreader, kein axe-core-Lauf.
- Live: HTML wird von Netlify umgeschrieben (einfache Anführungszeichen, Pfade ohne `.html`). Deshalb sind live nur JS, CSS und der Suchindex im DOM verglichen, nicht jedes HTML-Byte. `_headers` und `_redirects` sind live nicht direkt lesbar.
- «Anheftung» ist nicht direkt aus dem Skript gelesen, sondern aus den Treffern erschlossen. Angeheftet wird in r4-73 nur bei erkannten Tötungswörtern; das gilt für den Code, der byte-gleich ist.
- Was eine «klare Ich-Aussage» ist, steht in R34-P01 nicht genau. Ich folge der Praxis aus r4-34 und trenne enge und weite Lesart. Die Entscheidung liegt bei Christa Egger.
- Das Raster stammt von der bauenden Sitzung; nachgemessen ist nur Teil `saetze`, nicht `wortpaare`. Meine eigenen 94 Proben sind von mir formuliert, eine Stichprobe und keine Vollerhebung.
- Den Zwischenstand der bauenden Sitzung (298/144) und den Teil 2 des Rasters habe ich nicht nachgemessen. Keine fachliche Prüfung.

## Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
D=audit-results/2026-11-26-gegenpruefung-r4-76
git worktree add /tmp/r73 3764d45; git worktree add /tmp/r75 e8efa78
node authoring/tools/build.mjs --production --out=site --write-site && git status --short
node authoring/tools/build.mjs --production --verify-site
bash $D/vergleich-a.sh /tmp/r73                      # Abschnitt A
node $D/live-suchindex.cjs "$PWD/site"               # Suchindex live gegen site/
NUR=saetze node audit-results/2026-11-26-rueckbau-suche-r4-76/raster.cjs /tmp/r73/site /tmp/r75/site /tmp/raster r73-r75
node $D/einordnung-raster.cjs /tmp/raster/r73-r75-saetze.txt
for f in proben-b proben-b2 proben-b3; do node $D/proben-b.cjs $D/$f.tsv r4-73=/tmp/r73/site r4-75=/tmp/r75/site r4-76=site; done
```

Kein Merge, kein Deployment, keine Änderung an `authoring/`, `site/`, Netlify oder der DSG-Konfiguration; keine Kommentare auf anderen PRs.
