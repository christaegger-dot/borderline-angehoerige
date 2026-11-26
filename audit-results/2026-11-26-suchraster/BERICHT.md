# Suchraster als Prüfwerkzeug · Wiederaufbau der Suche, Schritt 1

Stand 26.11.2026 · gebaut von der Sitzung, die r4-74 bis r4-76 gebaut hat · Ausgangsstand `main` `7809d52` (Website r4-76).

Dieser Bericht und die Dateien unter `ergebnis/` enthalten Suchanfragen im Wortlaut, auch zu Suizid, Selbstverletzung und Gewalt. Sie gehören nicht in die Pendenzendatei.

## 1 Auftrag

Vorschlag der bauenden Sitzung nach dem Rückbau r4-76: «Das Raster als festes Prüfwerkzeug im Repository und in der CI. Damit fällt eine Verschlechterung wie heute Abend vor dem Merge auf. Die Website ändert sich dabei nicht.» Antwort von Christa Egger, 26.11.2026: «ok, leg los!»

Die Website ändert sich nicht. `--write-site` lässt `site/` unverändert; es gibt keine neue Versionskennung.

## 2 Was neu ist

| Datei | Inhalt |
|---|---|
| `authoring/tools/suchraster.mjs` | Werkzeug: vergleicht die Suche eines Stands mit einem Bezugsstand im Browser |
| `authoring/tests/suchraster.json` | Rasterdefinition: Sätze aus Handelnden, Aussagen und Nachsätzen; Ich-Aussagen aus Bausteinen; Ich-Rahmen um Aussagen über Dritte; Kombinationen; Gruppen für das Tippen |
| `authoring/tests/suchraster-proben.txt` | 926 Einzelproben in 38 Gruppen, mit Quelle je Gruppe |
| `authoring/tests/suchraster-ausnahmen.tsv` | Liste gewollter Verluste mit Begründung und Entscheid; heute leer |
| `.github/workflows/verify-authoring.yml` | zwei Schritte: Basis des Pull Requests auschecken (nur `site/`), Raster gegen die Basis |

**Herkunft der Proben.** Die Proben stammen aus beiden Nachprüfungen dieses Tages und aus den Nachweisen der bauenden Sitzung: Nachprüfung von r4-74 (PR #839, Gruppen A bis P, dazu die Bausteine für Ich-Aussagen, Kombinationen und das Tippen), Nachprüfung von r4-75 (PR #841, Gruppen Q bis S), Gegenprüfung von r4-76 (PR #844, Gruppen GA bis GC) und die Nachweise zu r4-74, r4-75 und r4-76 (Gruppen ZA bis ZZ). Dazu kommen alle Anfragen aus `suche-ersttreffer.tsv` und `suche-ausbau-offen.tsv`. Eine Anfrage, die in mehreren Quellen vorkommt, steht nur in der ersten Gruppe.

## 3 Was das Werkzeug prüft

Sechs Anfragemengen, zusammen 45 603 Anfragen:

| Menge | Anfragen | Aufbau |
|---|---|---|
| `saetze` | 23 328 | 18 Handelnde × 54 Aussagen zu Suizid, Selbstverletzung oder Gewalt × 24 Nachsätze |
| `ich` | 4 416 | 92 Kerne × 8 Füllungen × 6 Rahmen |
| `ichRahmen` | 4 320 | 5 Ich-Rahmen («Ich habe Angst, …», «…, was kann ich machen?») × 16 Handelnde × 54 Aussagen; auf Hinweis der Gegenprüfung (N840-2) |
| `proben` | 1 125 | Einzelproben und festgeschriebene Anfragen |
| `kombinationen` | 5 622 | Proben der Gruppen A, B, N und ZY mal 34 Zusätze und 4 Vorsätze, dazu gross und klein geschrieben |
| `tippen` | 6 792 | jede Zwischenstufe beim Tippen der Proben aus neun Gruppen, ab drei Zeichen |

Beide Stände laufen gleichzeitig in Chromium mit ihrem eigenen `interaktion.js`. Das Werkzeug liest die ersten drei Treffer und die Anheftung. Die Anheftung liest es über eine Messzeile, die `queryGroups` nach aussen reicht; fehlt die Stelle dafür, bricht es ab, statt ohne sie weiterzuprüfen.

**Als Verschlechterung zählt** (Stopp-Regel R34-P01, auf alle Sicherheitsabschnitte erweitert):

| Art | Bedeutung |
|---|---|
| VERLOREN | Ein Sicherheitsabschnitt steht im Bezug unter den ersten zwei Treffern, im Prüfstand nicht, und an seiner Stelle steht kein anderer |
| VERDRAENGT | wie VERLOREN, aber an seiner Stelle steht neu ein anderer Sicherheitsabschnitt oder die Schnellorientierung von «Krisen begleiten» («Wenn Sie sich jetzt Sorgen machen») |
| ANHEFTUNG | Der Bezug heftet einen Sicherheitsabschnitt an, der Prüfstand nicht |
| LEER | Der Bezug hat einen Treffer, der Prüfstand keinen |

Sicherheitsabschnitte: «Wenn Suizidgedanken ein Thema sind», «Wenn Sie eine Selbstverletzung bemerken», «Wenn Gewalt oder Bedrohung vorkommt», «Bei Eskalation, Gewalt oder fehlender Betreuung», «Wenn Suizid angesprochen wird».

VERDRAENGT zählt bewusst auch als Verschlechterung. Der Vergleich mit r4-75 zeigt, warum: Dort verdrängt der Gewaltabschnitt bei einer Anfrage mit Tötungswendung den Suizidabschnitt aus den ersten zwei. Ob eine Verdrängung gewollt ist, entscheidet ein Mensch und trägt sie in die Ausnahmen ein.

**Ausnahmen.** Eine Zeile in `suchraster-ausnahmen.tsv` erlaubt einen Verlust: Muster (genaue Anfrage oder regulärer Ausdruck), verlorener Abschnitt (oder `LEER`, `ANHEFTUNG:<Abschnitt>`), Ersatz (der Abschnitt, der dann unter den ersten zwei stehen muss, oder «–»), Begründung, Entscheid. Eine Anfrage gilt nur als erlaubt, wenn jeder ihrer Verluste gedeckt ist. Nicht angewendete Ausnahmen meldet das Werkzeug, damit die Liste nicht veraltet. Am Ende jedes Laufs steht eine Vorlage für die Liste.

**Abkürzung.** Sind `suche.html`, `js/interaktion.js` und `_headers` in beiden Ständen bis auf die Versionskennung byte-gleich, liefert die Suche dieselben Treffer. Das Werkzeug meldet das und endet ohne Browserlauf. Ersetzt wird nur die Kennung als Wert (`data-puk-site-build="…"`, `?v=…`), nicht ihre Erwähnung in Kommentaren. `--immer` erzwingt den vollen Lauf.

## 4 Nachweis: Das Raster hätte r4-74 und r4-75 aufgehalten

Bezug ist jeweils r4-73 (`3764d45`), der Stand der Suche vor heute Abend.

| Prüfstand | Ergebnis | Verschlechterungen | Dauer |
|---|---|---|---|
| r4-74 (`8d95e6a`) | scheitert | 4 955 | 568 s |
| r4-75 (`e8efa78`) | scheitert | 1 227 | 584 s |
| r4-76 (`b529695`, `main`) | besteht, Abkürzung | 0 | unter 1 s |
| r4-76, voller Lauf (`--immer`) | besteht | 0 | 539 s |

Die drei langen Läufe liefen gleichzeitig auf demselben Rechner; allein dauerte ein Lauf mit der etwas kleineren ersten Fassung (40 789 Anfragen) 240 bis 300 s.

Aufschlüsselung r4-73 gegen r4-75:

| Menge | verloren | verdrängt | leer |
|---|---|---|---|
| saetze | 630 | 130 | 185 |
| ich | 0 | 0 | 1 |
| ichRahmen | 68 | 3 | 28 |
| proben | 36 | 6 | 12 |
| kombinationen | 34 | 48 | 0 |
| tippen | 177 | 18 | 19 |

Darunter sind alle Fälle, die der Nachweis zu r4-76 als Grund für den Rückbau nennt («Mein Mann schlägt zu», «Mein Mann schlägt unseren Sohn», Selbstverletzung mit Nachsatz), und die klaren Ich-Aussagen, mit denen die Gegenprüfung (PR #844, N840-2) das Urteil «blockiert nicht» der Nachprüfung von r4-75 (PR #841) widerlegt hat, zum Beispiel «Ich habe Angst, mein mann wird gewalttätig»: in r4-73 der Gewaltabschnitt, in r4-75 kein Treffer. Die Menge `ichRahmen` ist auf diesen Hinweis hin dazugekommen.

**Ausnahmen geprüft:** Mit drei Probe-Einträgen (ein Muster, eine genaue Anfrage, eine nie zutreffende) gegen r4-75, nur Menge `proben`, noch mit der ersten Fassung der Probenliste: 5 Fälle als Ausnahme erlaubt, 13 bleiben Verschlechterungen, die nie zutreffende Ausnahme wird gemeldet (`ergebnis/probe-ausnahmen-r4-73-gegen-r4-75-proben-erste-fassung.txt`). Danach ist die Liste wieder leer.

## 5 Was das für die nächsten Schritte heisst

r4-73 hat viele Sicherheitstreffer nur zufällig: In r4-75 stehen gegenüber r4-73 bei 3 096 Sätzen der Menge `saetze` neu Sicherheitsabschnitte oben, und viele Verluste betreffen Abschnitte, die vorher ohne Bezug zur Anfrage oben standen. Schritt 2 (ein erkanntes Signal heftet den passenden Abschnitt fest an) wird deshalb viele Fälle als VERDRAENGT melden. Sie gehören dann nicht einzeln, sondern als begründete Muster in die Ausnahmen, und die Nachprüfung prüft jedes Muster. Das ist Absicht: Jede Verschiebung eines Sicherheitsabschnitts wird sichtbar und braucht eine Begründung.

## 6 CI

Nach den bestehenden Schritten (Selbsttest, Parität, Suchtest, Layouttest) checkt die CI bei einem Pull Request `site/` der Basis in `suchraster-basis/` aus und ruft `node authoring/tools/suchraster.mjs suchraster-basis/site site` auf. Eine Verschlechterung lässt den Job scheitern. Ändert ein Pull Request die Suche nicht, endet der Schritt über die Abkürzung sofort; sonst dauert er rund vier bis fünf Minuten. Bei einem manuellen Lauf (`workflow_dispatch`) gibt es keine Basis; der Schritt entfällt.

Ob ein roter Lauf das Mergen verhindert, hängt von den Einstellungen des Repositorys ab (erforderliche Prüfungen). Das ist nicht Teil dieses Pull Requests.

## 7 Prüfungen

| Prüfung | Ergebnis |
|---|---|
| `--production --out=site --write-site` | 24 Seiten, 0 Blocker, 20 Hinweise; `site/` unverändert |
| `--production --verify-site` | Parität bestanden, 35 Dateien byte-gleich |
| Selbsttest | 127 von 127 |
| Suchtest | 235 von 235, 0 JS-Fehler (eine Erwartung gelockert, siehe unten) |
| Suchraster `main` gegen `main` | Abkürzung, 0 |

**Gelockerte Erwartung (N840-6):** In `suche-ersttreffer.tsv` verlangte eine Gegenprobe «kein Treffer» für ein Wort, das thematisch nahe am Suizidabschnitt liegt. Die Gegenprüfung von r4-76 hat darauf hingewiesen, dass eine spätere sachgerechte Verknüpfung den Test dann bricht. Die Erwartung lautet jetzt «nicht der Suizidabschnitt» (`!krise.html#suizid`). r4-76 erfüllt sie wie vorher.

Der neue CI-Schritt läuft erst auf GitHub. Für diesen Pull Request greift die Abkürzung, weil er die Suche nicht ändert; der volle Lauf in der CI ist damit noch nicht auf GitHub beobachtet. Lokal ist er belegt (Abschnitt 4).

## 8 Grenzen

- Das Raster prüft nur, was in seinen Anfragen vorkommt. Echte Suchanfragen sind nicht bekannt; die Wortliste und die Bausteine sind allgemeines Deutsch, Mundart nur punktuell.
- Es vergleicht mit der Basis des Pull Requests, nicht mit einem festen Stand. Was einmal gemergt ist, wird zum neuen Bezug; dagegen schützen nur die begründeten Ausnahmen und die Nachprüfung.
- Es prüft Reihenfolge und Treffer, nicht, ob ein Treffer fachlich passt. Ein Verlust eines Abschnitts, der vorher zufällig oben stand, zählt genauso wie ein echter.
- Die Messzeile für die Anheftung setzt voraus, dass `interaktion.js` die Funktion `queryGroups` und die Zeile `input.addEventListener('input', renderSearch);` enthält.
- Chromium über Playwright 1.64.0; keine anderen Browser.

## 9 Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
mkdir -p /tmp/r73 /tmp/r75 && git archive 3764d45 site | tar -x -C /tmp/r73 && git archive e8efa78 site | tar -x -C /tmp/r75
node authoring/tools/suchraster.mjs /tmp/r73/site /tmp/r75/site --ausgabe=/tmp/raster-r75
node authoring/tools/suchraster.mjs /tmp/r73/site site
node authoring/tools/suchraster.mjs /tmp/r73/site site --immer
```
