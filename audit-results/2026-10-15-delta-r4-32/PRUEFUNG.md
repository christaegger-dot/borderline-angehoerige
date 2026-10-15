# Unabhängige Prüfung r4-32

| | |
| --- | --- |
| Gegenstand | Website «Borderline – Orientierung für Angehörige» (Fachstelle Angehörigenarbeit PUK), Entwurf r4-32 |
| Stand | Branch `claude/r4-32-suche-1792088993`, Commit `138033d`, auf `origin` gleich. Basis `ef645fa` (= `main`). Die Produktion r4-31 ist `site/`, bytegleich mit dem Export `bd3d903` |
| Diff zu `ef645fa` | <br>• `authoring/js/interaktion.js`: Block «Sicherheitsabschnitte» mit `childVictim`, `suicideFirst`, `safetyOrder` und dem Anheften in `renderSearch`. <br>• `kommunizieren.html`: `id="suizid-angesprochen"`. <br>• Suchalias entfernt. <br>• `search-index.mjs`: `data-search-target`. <br>• `suchtest.mjs`: Erwartung «a > b > c». <br>• Testliste mit 192 Anfragen. <br>• Build r4-32, `independentReview` «ausstehend». <br>• `FREIGABE.md`, Pendenzen |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d32a`, verglichen mit der Produktion (`site/`) |
| Massstab | die Prüfkriterien 1 bis 6 des Auftrags; R31-P03 in beiden Lesarten |
| Prüfsitzung | unabhängig, hat r4-32 nicht gebaut. Code und Inhalt sind unverändert. Auf Auftrag ist nur diese Datei committet. Probenlisten liegen nicht im Repository |
| Zeitpunkt | 15.10.2026, etwa 20:30 bis 21:30 MESZ |

## Ergebnis

**Freigabefähig mit Auflagen.** Die Vereinfachung wirkt wie beschrieben. In allen 618 Proben mit Tötungswort stehen Suizid und Gewalt unter den ersten drei Treffern. Bei den 267 Proben ohne Tötungswort ändert sich kein Ersttreffer. Seitentext, Anker, Suchindex und Gate sind in Ordnung. Alle Zahlen in `FREIGABE.md` habe ich nachgerechnet; sie stimmen.

Zwei Fehler im Code betreffen aber Anfragen, die in den 885 Proben nicht vorkommen:

- **R32-01:** Jedes «bring…» mit einem späteren «um» gilt als Tötungswort. Harmlose Fragen zu Therapie, Schule oder Hilfe bekommen dadurch die Abschnitte Suizid und Gewalt oben angeheftet, zum Teil mit «Wenn Suizid angesprochen wird» zuerst. Das verletzt Kriterium 2.
- **R32-02:** «mein Kind sich umbringen» gilt als Kind als Opfer. Die Sorge um ein suizidales Kind beginnt dadurch mit «Kinder › Eskalation» und «Gewalt», Suizid steht erst an dritter Stelle.

Beide lassen sich mit wenigen Zeilen beheben. Ich habe die Korrektur nachgebildet (Variante P, unten): Sie ändert keine der 885 Proben und besteht die Testliste.

**`independentReview` kann noch nicht auf «bestaetigt» gesetzt werden.** Das geht, sobald P oder eine gleichwertige Korrektur umgesetzt ist und der mechanische Abgleich unten ohne Abweichung durchläuft.

## Ergebnis je Prüfkriterium

| Nr. | Kriterium | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Bei Tötungswort Suizid und Gewalt oben; Kinder zuerst; R25-010 | **erfüllt für die 885 Proben; R32-02** | Ich habe die 885 Proben selbst abgefragt (`top3.mjs`). Meine Produktionsergebnisse stimmen 885/885 mit `t3_r31.tsv` überein. <br>• 618 Proben haben ein Tötungswort, 267 keines. <br>• Erste drei Treffer in r4-32: Suizid › Gewalt 390, Gewalt › Suizid › Kinder 199, «Wenn Suizid angesprochen wird» › Suizid › Gewalt 18, Kinder › Gewalt › Suizid 11. <br>• In allen 618 Proben stehen Suizid und Gewalt unter den ersten drei. <br>• In der Produktion standen bei 383 Proben nur Suizid, bei 186 nur Gewalt und bei 49 keiner der beiden unter den ersten drei. <br>• Keine Probe verliert ihren Treffer. 0 JS-Fehler. <br>• Kinder zuerst ist richtig bei «die Kinder umbringen», «mich und die Kinder», «die Kinder und sich». Falsch ist es, wenn das Kind selbst suizidal ist (R32-02). |
| 2 | Ohne Tötungswort kein anderer Ersttreffer | **erfüllt für die 267 Proben; verletzt durch R32-01** | 267 Proben: 0 Ersttreffer anders. 64 haben einen anderen zweiten oder dritten Treffer; bei 63 davon fällt «Wenn Worte treffen» aus den ersten drei. Das Kriterium hängt aber daran, was als Tötungswort gilt. Laut Code ist das jedes «bring…» mit einem späteren «um» (R32-01). Damit ändern harmlose Anfragen ihren Ersttreffer. |
| 3 | R31-P03 in beiden Lesarten | **siehe Abschnitt unten** | Lesart der bauenden Sitzung: kein Fall in den 885 Proben. Wörtliche Lesart: 15 + 4 Fälle in den 885 Proben, dazu R32-02. |
| 4 | Seitentext, Anker, Sucheintrag, `data-search-target` | **erfüllt** | <br>• Von 23 Seiten unterscheiden sich gegenüber der Produktion nur `kommunizieren.html` und `suche.html` (Buildmarker ausgenommen). In `kommunizieren.html` ist die einzige Änderung `id="suizid-angesprochen"` an der bestehenden h3 «Wenn Suizid angesprochen wird»; der Wortlaut ist gleich. <br>• `suche.html`: 224 statt 223 Einträge. Neu ist der Eintrag «Wenn Suizid angesprochen wird» mit Link `kommunizieren.html#suizid-angesprochen`. Bei «Wenn Worte treffen» ist der Alias entfernt. Sonst ist alles gleich, auch die Reihenfolge. <br>• `data-search-target` ist bei allen 208 Einträgen gleich dem ursprünglichen Link. Jeder der vier Sicherheitslinks kommt genau einmal vor. Das Anheften liest nur `data-search-target`; Pretty URLs von Netlify ändern daran nichts. <br>• 0 `tel:`, kein neuer Krisenzugang, kein Notfallblock. CSS nur Buildmarker. |
| 5 | Code-Review der Regel | **zwei Befunde (R32-01, R32-02), Hinweise** | Leere Anfrage, nur Satzzeichen, nur «um», «um um um», Grossschreibung, «UND DANN», sehr lange Anfrage: 0 JS-Fehler, Verhalten wie in der Produktion. Einzelheiten unter «Befunde» und «Hinweise». |
| 6 | Zahlen in `FREIGABE.md` und «weniger geschrumpft als angekündigt» | **richtig dargestellt** | <br>• Alle Zahlen im Vergleich stimmen mit meiner Rechnung: 390/199/18/11; 383/186/49; 15 (12 + 2 + 1); 3; 11 (4/7); 2; 49 (18 ohne Treffer, 16 «Worte»); 0/64/63; 15 + 4. <br>• Testliste: 317 → 192. 155 → 30 Anfragen mit Tötungswort, 15 davon schon vorher in der Liste. Die 162 Anfragen ohne Tötungswort sind alle erhalten, 2 davon jetzt mit Reihenfolge. <br>• Wortlisten: nach meiner Zählung 136 → 90. 135 ist eine andere Zählweise. <br>• Codezeilen: grob 122 → 107, passt zu 123 → 108. <br>• Die Einschränkung ist ehrlich: Die Satzstellungslogik bleibt (`suicideFirstIn`), und Code und Wortlisten sind nur um gut ein Zehntel bzw. ein Drittel kürzer. <br>• Ergänzen würde ich nur: Angekündigt waren «etwa 30 bis 40 typische Anfragen» für die Testliste. Das gilt für die Anfragen mit Tötungswort; die ganze Liste hat 192. <br>• Nicht nachgeprüft: «hätte bei 24 Suizidanfragen … verdrängt» und die Sechs-Zeilen-Regel mit «184 von 618». |
| – | Testliste und Build | **erfüllt** | <br>• `suchtest.mjs dist/d32a`: «Suchtest: 192 von 192 Erwartungen wie festgeschrieben · JS-Fehler 0», Exit 0. <br>• Build r4-32: 23/23 Seiten, 46 × `?v=r4-32`, CSS-Kopf, `BUILD`, `assetVersion`. <br>• In einer Kopie (`git archive 138033d`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d32a` (SHA-256 von 34 Dateien gleich). |

## Befunde

| ID | Priorität | Befund | Belege (Produktion → r4-32, erste Treffer) |
| --- | --- | --- | --- |
| R32-01 | **wichtig, Auflage vor dem Export** | `hasKill`, `killIndex`, `childVictim` und `safetyOrder` werten jedes «bring…» (bring, bringe, bringt, bringst, bringen) als trennbares Tötungsverb, wenn irgendwo danach «um» steht. Das gilt ohne Abstandsgrenze und über Satzzeichen hinweg. «um» ist aber meist Präposition oder «um … zu». Steht zusätzlich «sich» in der Anfrage, kommt «Wenn Suizid angesprochen wird» zuerst. Das widerspricht Kriterium 2 und der Beschreibung «Tötungswort («…», «bringt … um»)» in `FREIGABE.md`. Es zeigt Gewalt und Suizid bei Fragen, die damit nichts zu tun haben. | <br>• «Wie bringe ich ihn dazu, sich um einen Therapieplatz zu kümmern?»: kein Treffer → **«Wenn Suizid angesprochen wird» › Suizid › Gewalt**. <br>• «Was bringt es, sich um sich selbst zu kümmern?»: ebenso. <br>• «Wer bringt die Kinder um acht Uhr zur Schule, wenn ich in der Klinik bin?»: kein Treffer → **Kinder › Gewalt › Suizid**. <br>• «Die Therapie bringt nichts, ich mache mir Sorgen um sie.»: `behandlung#rollen` → **Gewalt › Suizid**. <br>• «Was bringt eine Beratung, um besser mit ihr umzugehen?»: `kommunizieren#worte` → **Suizid › Gewalt**. <br>• Ebenso «Bringt es etwas, um Hilfe zu bitten?», «Ich bringe sie um 10 Uhr in die Klinik.», «Wir bringen unseren Sohn um 9 Uhr zur Therapie.». |
| R32-02 | **wichtig, Auflage vor dem Export** | `childVictim` lässt «sich» und «mich» als Bindeglied zwischen «Kind» und Tötungswort zu, damit «die Kinder und sich» erkannt wird. Dadurch gilt auch «mein Kind sich umbringen» (das Kind ist suizidal) als Kind als Opfer. Das widerspricht dem Kommentar und `FREIGABE.md` («nicht, wenn Kinder nur erwähnt sind»). Die Produktion setzte Suizid zuerst. In r4-32 kommen zuerst Eskalation und Gewalt, Suizid erst an dritter Stelle. Für eine Website, auf der Suizidalität von Jugendlichen ein Kernthema ist, ist das heikel. | <br>• «Was tun, wenn mein Kind sich umbringen will?», «Ich habe Angst, dass mein Kind sich umbringt.», «dass meine Kinder sich umbringen», «wenn mein Kind sich töten will»: Suizid → **Kinder › Gewalt › Suizid**. <br>• Richtig bleibt «mein Kind will sich umbringen» → Suizid › Gewalt, weil «will» dazwischen steht. <br>• Dieselbe Ursache: «Angst dass mein Kind mich umbringt» (das Kind droht): Gewalt → Kinder › Gewalt › Suizid. |

**Hinweise (ohne Auflage):**

- **Teilsätze und «und»:** `suicideFirst` trennt die Rohanfrage auch bei «und». Bei «bringt er sich und mich um» liegen «bringt» und «um» deshalb in verschiedenen Teilsätzen. Kein Teilsatz hat dann ein Tötungswort, und die Funktion gibt nur über `!any` «Suizid zuerst» zurück. Das Ergebnis ist wie beabsichtigt, aber nicht aus dem Grund, den der Kommentar nennt.
- **Redewendungen:** «Er bringt mich um den Schlaf» und «… um den Verstand» gingen in der Produktion auf Gewalt; das war ein Fehlgriff der alten Regel. In r4-32 sind Gewalt und Suizid angeheftet, mit P gibt es keinen Treffer. Das ist keine klare Ich-Aussage, also nach R31-P03 kein Rückschritt.
- **Produktionsprüfung:** `suchtest.mjs` vergleicht `href` und läuft deshalb nicht direkt gegen die Pretty URLs der Produktion (R31-P01). Nach dem Export sollte jemand in der Produktion mindestens eine Anfrage mit Tötungswort ansehen und bestätigen, dass Suizid und Gewalt oben stehen.

## R31-P03 in beiden Lesarten

**Lesart der bauenden Sitzung** (blockierend nur, wenn Suizid nicht unter den ersten drei steht oder eine klare Ich-Aussage keinen Treffer hat):

- In den 885 Proben gibt es keinen solchen Fall.
- In meinen Proben auch nicht. Bei R32-02 steht Suizid an dritter Stelle, also noch innerhalb der Regel.
- R32-01 fällt nicht unter R31-P03, weil die Anfragen keine Suizidsorge enthalten. Es verletzt aber Kriterium 2.

**Wörtliche Lesart** (Ersttreffer gegenüber der Produktion; Suizidsorge, die nicht mehr mit Suizid beginnt): 19 Fälle in den 885 Proben.

- **15 von Suizid auf Gewalt:**
  - 12 sind Drohungen anderer gegen die fragende Person, aufgeführt in `FREIGABE.md`. Gewalt zuerst ist dort richtig, also eine Verbesserung.
  - 2 sind Redewendungen: «dass mich die Sorge um meine Tochter umbringt» und «dass mich die Angst vor meinem Mann umbringt».
  - 1 ist ein angedrohter erweiterter Suizid: «er droht mich umzubringen und dann sich selbst».
- **4 von Suizid auf Kinder › Eskalation:** erweiterter Suizid mit Kindern, darunter die Ich-Aussage «ich will mich und die Kinder umbringen». Das hat die Auftraggeberin mit Entscheid (2) ausdrücklich so festgelegt.
- **Dazu R32-02:** 4 von meinen 5 Proben zur Suizidsorge um ein Kind beginnen nicht mehr mit Suizid. Nach dieser Lesart blockierend.

Nur nach der wörtlichen Lesart schlechter liegen also die beiden Redewendungen, «… und dann sich selbst» und die R32-02-Fälle. Die vier Fälle mit Kindern deckt Entscheid (2).

**Meine Einschätzung:** Die Lesart der bauenden Sitzung folgt aus Entscheid (1). Wenn Suizid immer oben mit angezeigt wird, ist die Reihenfolge kein Sicherheitsrisiko mehr. Ich empfehle sie der Auftraggeberin mit einer Verschärfung: Suizid steht unter den ersten zwei Treffern, ausser wenn nach Entscheid (2) Kinder zuerst stehen. Mit P gilt das für alle 885 Proben und alle meine Proben. Die Bestätigung durch die Auftraggeberin steht noch aus.

## Vorschlag: Variante P (nur nachgebildet, nicht umgesetzt)

Gepatcht in einer Kopie von `dist/d32a` im Scratchpad der Prüfsitzung (`d32/varP/site/js/interaktion.js`, Diff in `d32/varP.diff`). Im Repository ist nichts geändert.

- **P1 (R32-01):** Eine neue Funktion `particleUm(words, i)` gilt für `hasKill`, `killIndex`, `childVictim` und `safetyOrder`. «um» zählt nur dann als Teil von «bring… um», wenn alle drei Bedingungen erfüllt sind:
  1. Es steht höchstens sechs Wörter nach dem Verb.
  2. Dazwischen steht kein Satzzeichen und kein Komma.
  3. Es steht am Ende oder vor «und», «oder», «aber», «wenn», «falls», «weil», «dass», «ob», «sonst», «dann», einem Satzzeichen oder einem Subjekt («ich», «er», «sie», «du», «wir», «ihr», «man»).

  Dafür gibt `queryGroups()` an `safetyOrder()` die Wörter mit Satzmarke weiter, nach dem Muster von L1.
- **P2 (R32-02):** In `childVictim` gelten «sich» und «mich» nur nach «und» als Bindeglied («die Kinder und sich», «die Kinder und mich»), nicht direkt nach «Kind».

Ergebnis:

- Suchtest 192 von 192, 0 JS-Fehler.
- Die 885 Proben haben dieselben ersten drei Treffer wie `138033d` (0 Abweichungen).
- Bei den R32-01-Proben ist nichts mehr angeheftet, und sie liegen wie in der Produktion. Ausnahmen sind «Was bringt eine Beratung, um besser mit ihr umzugehen?» (dort wirkt die bewusste Entfernung des Alias) und die Redewendungen «… um den Schlaf» und «… um den Verstand» (siehe Hinweise).
- R32-02: Die Sorge um ein suizidales Kind geht auf Suizid › Gewalt. «Angst dass mein Kind mich umbringt» geht auf Gewalt › Suizid › Kinder.
- «Wenn du gehst bringe ich mich um», «wenn ich gehe bringt er sich und mich um» und «ich bringe mich der Familie zuliebe nicht um» bleiben wie in r4-32.

**Für den Export:**

1. P oder Gleichwertiges umsetzen.
2. In die Testliste aufnehmen:

   | Anfrage | Erwartung |
   | --- | --- |
   | «Wie bringe ich ihn dazu, sich um einen Therapieplatz zu kümmern?» | `!kommunizieren.html#suizid-angesprochen` |
   | «Wer bringt die Kinder um acht Uhr zur Schule, wenn ich in der Klinik bin?» | `!kinder.html#eskalation` |
   | «Die Therapie bringt nichts, ich mache mir Sorgen um sie.» | `behandlung.html#rollen` |
   | «Was tun, wenn mein Kind sich umbringen will?» | `krise.html#suizid > grenzen.html#gewalt` |
   | «Ich habe Angst, dass mein Kind sich umbringt.» | `krise.html#suizid > grenzen.html#gewalt` |

3. Danach mechanisch prüfen:
   - Suchtest 100 %.
   - Die ersten drei Treffer der 885 Proben gleich `d32/p_P.tsv`.
   - Die 21 gezielten Proben gleich `d32/a_P.tsv`.
   - Produktionsbuild in einer Kopie bytegleich.

Dann kann `independentReview` gesetzt werden. Vor dem Merge braucht es das Codex-Review auf dem exportierten Kopf, und es muss geprüft sein (R28-O01, R29-P20). Neue Codex-Befunde werden nach R31-P03 in der bestätigten Lesart eingestuft.

## Nicht geprüft

- Produktion: r4-32 ist nicht ausgeliefert.
- axe und Überlauf. Der Seitentext ist bis auf ein `id` unverändert, geändert ist nur die Suche.
- Nur Chromium.
- In `FREIGABE.md` nicht nachgeprüft: die Wirkung des verschobenen Alias («24 Suizidanfragen») und die Sechs-Zeilen-Regel («184 von 618»).

## Belege

Im Scratchpad der Prüfsitzung (`/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/`), nicht im Repository:

- `d32/p_r31.tsv`, `d32/p_r32.tsv`, `d32/p_P.tsv`: erste drei Treffer der 885 Proben in der Produktion, in r4-32 und mit P.
- `d32/q-r32a.txt` mit 21 gezielten Proben; `d32/a_r31.tsv`, `d32/a_r32.tsv`, `d32/a_P.tsv`.
- `d32/q-edge.txt`, `d32/e_r31.tsv`, `d32/e_r32.tsv`: Randfälle.
- `d32/varP/`, `d32/varP.diff`; `d32/suchtest-varP.txt`; `d31/suchtest-138033d.txt`.
- `d32/prodcopy/`, `d32/prod-a.log`, `d32/d32a.sha`, `d32/prod.sha`.
- Entwurf: `/home/claude/borderline-angehoerige/dist/d32a` (von `.gitignore` erfasst).

## Abschlussbestätigung (Stand 306c4e4)

| | |
| --- | --- |
| Stand | Branch `claude/r4-32-suche-1792088993`, Commit `306c4e4`, auf `origin` gleich. Diff zu `19cd451`: `authoring/js/interaktion.js` (Korrektur P), Testliste (+5, jetzt 197), `reviewScope`, `FREIGABE.md` (Nachtrag 1). `site/` und Seiteninhalt unverändert, `independentReview` «ausstehend», diese Datei unverändert |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d32b` |
| Art | nur mechanischer Abgleich; keine neue Probenrunde, nichts geändert ausser diesem Abschnitt |
| Zeitpunkt | 15.10.2026, etwa 21:20 bis 21:30 MESZ |

**Ergebnis: bestätigt.** Die Auflagen R32-01 und R32-02 sind erfüllt; alle Punkte sind ohne Abweichung durchgelaufen.

- **Code:** `authoring/js/interaktion.js` ist zeichengleich mit meiner Nachbildung `d32/varP/site/js/interaktion.js`. `dist/d32b` ist als Ganzes bytegleich mit `d32/varP/site` und unterscheidet sich von `dist/d32a` (`138033d`) nur in `js/interaktion.js`.
- **Suchtest:** «Suchtest: 197 von 197 Erwartungen wie festgeschrieben · JS-Fehler 0», Exit 0. Gegenprobe auf `138033d`: 192 von 197; die 5 Abweichungen sind genau die fünf neuen Zeilen.
- **885 Proben:** Neu im Browser abgefragt, sind die ersten drei Treffer bytegleich mit `d32/p_P.tsv` und mit dem Lauf auf `138033d` (`cmp` ohne Abweichung). Die Zahlen in `FREIGABE.md` gelten damit unverändert.
- **21 gezielte Proben:** bytegleich mit `d32/a_P.tsv`.
- **Randfälle:** 0 JS-Fehler. Einzige Änderung gegenüber `138033d` ist die Unsinnseingabe «bring bring um um», die jetzt nicht mehr angeheftet wird.
- **Build:** 23/23 Seiten `data-puk-site-build="r4-32"`, 46 × `?v=r4-32`, `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive 306c4e4`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d32b` (SHA-256 von 34 Dateien gleich).
- **Nachtrag 1:** gibt R32-01, R32-02, P1, P2, die Testliste und den Abgleich richtig wieder, ebenso meine Empfehlung zu R31-P03.

**Urteil: freigabefähig.** **`independentReview` kann auf «bestaetigt» gesetzt werden.** Die Bestätigung gilt für den Inhalt von `306c4e4`. Ändern sich danach Code, Testliste oder Seiteninhalt, braucht es einen neuen Abgleich; reine Nachweis-Nachträge sind davon nicht betroffen. Vor dem Merge kommen:

1. der Export;
2. die Prüfung, dass `site/` bytegleich mit dem Produktionsbuild ist;
3. «@codex review» auf dem exportierten Kopf und dessen Prüfung (R28-O01, R29-P20);
4. nach der Auslieferung eine Sichtprüfung in der Produktion: Bei einer Anfrage mit Tötungswort stehen Suizid und Gewalt oben.

Neue Befunde werden nach R31-P03 eingestuft; die Lesart muss die Auftraggeberin noch bestätigen.

**Belege (Scratchpad der Prüfsitzung, `d32/`):** `suchtest-306c4e4.txt`, `suchtest-d32a-on-197.txt`; `p_306.tsv`, `a_306.tsv`, `e_306.tsv`; `prodcopy2/`, `prod2-a.log`, `d32b.sha`, `prod2.sha`. Entwurf: `/home/claude/borderline-angehoerige/dist/d32b` (von `.gitignore` erfasst).

## Nachprüfung Codex #694 (Stand ea8dc1a)

| | |
| --- | --- |
| Stand | Branch `claude/r4-32-suche-1792088993`, Commit `ea8dc1a`, auf `origin` gleich. Diff zu `37b963f`: `authoring/js/interaktion.js` (Erweiterung von P1, neue Wortformen, Druck nur in der Gegenwart), Testliste (+7, jetzt 204), `reviewScope`, `independentReview` «ausstehend», `FREIGABE.md` (Nachträge 2 und 3), R32-P01. `site/` ist `37b963f` und bytegleich mit meinem `dist/d32b` |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d32c`, verglichen mit r4-31 (`bd3d903`), `37b963f` und meiner Nachbildung Q (unten) |
| Zeitpunkt | 15.10.2026, etwa 21:35 bis 21:55 MESZ |

### Heikel, vorab: #694 ist gemergt, und die Produktion ist r4-32 auf Stand `37b963f`

- **Merge vor geprüftem Codex-Review:** Laut `gh api` hat `christaegger-dot` #694 um **19:32:36 UTC** gemergt (Merge-Commit `4790653`, Kopf `37b963f`). Das war 12 Sekunden nach dem Codex-Review um 19:32:24 UTC und vor dessen Prüfung. R28-O01 und R29-P20 sind damit wieder nicht eingehalten, wie bei #689.
- **Was jetzt veröffentlicht ist:** Die öffentliche Seite (`/suche`, per GET gelesen, 19:44 UTC) trägt `data-puk-site-build="r4-32"`. Ihr `interaktion.js` ist bytegleich mit `37b963f`.
- **Folgen für die Produktion:**
  - Der Codex-Fall, den Nachtrag 3 als blockierend einstuft, ist in der Produktion: «Mein Mann bringt mich heute Nacht in unserer Wohnung um» hat dort keinen Treffer, in r4-31 Gewalt.
  - Ebenso ein Fehler meiner Variante P, den die bauende Sitzung jetzt behoben hat: «die Therapie bringt nichts ich mache mir Sorgen um sie» (ohne Komma) heftet Gewalt an. Bei meiner Prüfung von P hatte ich diese Form nicht.
- **Ungenaue Nachweise:** Nachtrag 3 und der Auftrag nennen den Merge nicht und behandeln r4-31 noch als Produktion. Für die Korrektur ist der Vergleichsstand nach R31-P03 jetzt die Produktion `37b963f`. Gegenüber r4-31 bleiben die Aussagen von Nachtrag 3 richtig.
- **Nächster Pull Request:** `ea8dc1a` liegt einen Commit vor `main`. Nach `CLAUDE.md` braucht der nächste Pull Request einen neuen Branch-Namen mit Zeitstempel.

### Ergebnis

**Freigabefähig mit Auflagen.** Die drei Codex-Befunde sind richtig bewertet. Beide P1 sind behoben:

- Der lange Abstand wird erkannt.
- Die Beugungsformen werden erkannt.
- «mein Sohn brachte sich um» beginnt mit Suizid.

Die Bestandsproben sind unverändert. Der grössere Abstand bringt aber neue Fehlanheftungen (R32-03): «… und wie gehe ich mit ihr um» oder «… und stellen die Medikamente um» nach einem «bring…» gelten jetzt als Tötungswort. Meine Nachbildung Q behebt das, ohne eine andere Probe zu ändern.

**`independentReview` kann noch nicht auf «bestaetigt» gesetzt werden.** Das geht, sobald Q oder Gleichwertiges umgesetzt ist und der Abgleich unten ohne Abweichung durchläuft. Weil der Codex-Fall in der Produktion steht, ist die Korrektur dringend.

| Punkt | Ergebnis | Beleg |
| --- | --- | --- |
| Suchtest | **erfüllt** | `suchtest.mjs dist/d32c`: «204 von 204 Erwartungen wie festgeschrieben · JS-Fehler 0», Exit 0. |
| 885 Proben | **erfüllt** | Die ersten drei Treffer sind bytegleich mit `d32/p_P.tsv`, also gleich wie `306c4e4` und `37b963f`. |
| Gezielte Proben und Randfälle | **erfüllt** | `q-r32a` (21) und `q-edge` (11) gleich wie `37b963f`. 0 JS-Fehler. |
| `harmlos.q` (19) | **erfüllt** | Alle ohne Anheftung. Gegenüber `37b963f` ist nur «die Therapie bringt nichts ich mache mir Sorgen um sie» anders: vorher Gewalt, jetzt `behandlung#rollen`, wie in r4-31. |
| Codex-Fälle `cx694.q` (15) | **erfüllt** | Alle mit Tötungswort angeheftet. <br>• «Mein Mann bringt mich heute Nacht in unserer Wohnung um», «er bringt mich irgendwann noch im Streit um», «Er tötete mich fast», «Du tötest mich», «Sie brachten ihn um» → Gewalt › Suizid. <br>• «ich bringe mich heute Nacht in meiner Wohnung um», «… bald irgendwo im Wald um», «sie bringt sich bestimmt bald irgendwann einmal um» → «Wenn Suizid angesprochen wird» › Suizid › Gewalt (R25-010). <br>• «er brachte sich um», «mein Sohn brachte sich um», «ich tötete mich fast» → Suizid › Gewalt. <br>• «Er droht, meine Tochter umzubringen» und «Sie will meinen Sohn töten» → Gewalt › Suizid. Das ist die richtige Grundlage für R32-P01. |
| Neue Fehlanheftungen | **Befund R32-03** | 11 eigene harmlose Sätze. 8 bekommen jetzt Suizid und Gewalt angeheftet, einer davon mit «Wenn Suizid angesprochen wird» zuerst. Auf `37b963f` war das bei keinem der Fall. |
| Produktionsbuild | **erfüllt** | 23/23 Seiten r4-32, 46 × `?v=r4-32`, `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive ea8dc1a`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d32c` (SHA-256 von 34 Dateien gleich). |
| Nachträge 2 und 3 | **richtig, eine Lücke** | Zeiten, Beispiele, Werte und Bewertungen stimmen mit `gh api` und meinen Messungen überein. Es fehlen der Merge um 19:32:36 UTC und der neue Produktionsstand (siehe oben). |

### Befund

| ID | Priorität | Befund | Belege (Produktion `37b963f` → `ea8dc1a`, erste Treffer) |
| --- | --- | --- | --- |
| R32-03 | **wichtig, Auflage vor dem Export** | Der Teilsatz endet bei der neuen Suche nicht an «und» und nicht an Fragewörtern; das Fenster ist zwölf Wörter lang. Folgt einem «bring…»/«bracht…» ein zweiter Hauptsatz mit einem anderen Verb auf «um-» (umgehen, umstellen, umziehen, umdrehen, umschauen), gilt dessen «um» als Teil von «bring… um». Das verletzt Kriterium 2 gegenüber der Produktion und zeigt Suizid und Gewalt bei Alltagsfragen. Nach R31-P03 (beide Lesarten) blockiert es nicht, weil keine Suizidsorge betroffen ist. | <br>• «Was bringt eine Kontaktpause und wie gehe ich mit ihr um?»: `kommunizieren#kippen` → **Suizid › Gewalt**. <br>• «Was bringt eine Klinik wie geht man dort mit Angehörigen um»: `behandlung#therapieformen` → **Suizid › Gewalt**. <br>• «Meine Tochter bringt mich jeden Abend zum Weinen und dreht sich dann einfach um»: kein Treffer → **«Wenn Suizid angesprochen wird» › Suizid › Gewalt**. <br>• Kein Treffer → **Suizid › Gewalt**: «Die Therapie bringt nichts und wir stellen die Medikamente um», «Ich bringe die Kinder zur Schule und ziehe mich danach um», «Er brachte die Einkäufe herein und drehte sich wortlos um», «Ich brachte ihn in die Klinik und schaute mich dort um», «Was bringt Validierung und wie gehe ich mit seiner Wut um». |

**Hinweise:**

- **«sie» nicht mehr als neues Subjekt:** Ohne Komma wird ein Satz wie «er bringt mich um sie weiss es» nicht mehr erkannt. Das ist selten; mit Komma oder Punkt wird er erkannt.
- **Entfernter Alias:** Bei harmlosen «Was bringt …»-Fragen fehlt jetzt ein zufälliger Treffer. In r4-31 trafen sie wegen des Wortes «bringt» im Alias «Wenn Worte treffen» (etwa «Was bringt es mir wenn ich mich umstelle»). Das folgt aus der gewollten Entfernung des Alias und ist kein Rückschritt nach R31-P03.

### Vorschlag: Variante Q (nur nachgebildet, nicht umgesetzt)

Gepatcht in einer Kopie von `dist/d32c` im Scratchpad der Prüfsitzung (`d32/varQ/site/js/interaktion.js`, Diff in `d32/varQ.diff`, 15 geänderte Zeilen). Im Repository ist nichts geändert.

- Fragewörter beenden in `particleUm` den Teilsatz: «wie», «was», «warum», «wieso», «weshalb», «wo», «wann», «wer».
- «und» beendet ihn ebenfalls, ausser es verbindet Objekte. Dann folgt ein Pronomen, Artikel oder Possessiv («sich und mich um», «mich und die Kinder um»), und «um» steht höchstens drei Wörter nach dem «und».

Ergebnis:

- Suchtest 204 von 204, 0 JS-Fehler.
- 885 Proben bytegleich mit `d32/p_P.tsv`.
- `q-r32a`, `q-edge`, `harmlos.q` und alle 15 Codex-Fälle gleich wie `ea8dc1a`; der lange Abstand und die Beugungsformen bleiben erkannt.
- Die 8 Fehlanheftungen aus R32-03 sind weg, dazu zwei weitere mit «und sie …» bzw. «und die Ärztin …» als neuem Satz.
- «er bringt mich und die Kinder um» → Kinder › Gewalt › Suizid und «er bringt sich und mich um» → «Wenn Suizid angesprochen wird» › Suizid › Gewalt bleiben wie bisher.

**Für den Export:**

1. Q oder Gleichwertiges umsetzen.
2. In die Testliste aufnehmen:

   | Anfrage | Erwartung |
   | --- | --- |
   | «Was bringt eine Kontaktpause und wie gehe ich mit ihr um?» | `!krise.html#suizid` |
   | «Die Therapie bringt nichts und wir stellen die Medikamente um» | `!krise.html#suizid` |
   | «Meine Tochter bringt mich jeden Abend zum Weinen und dreht sich dann einfach um» | `!kommunizieren.html#suizid-angesprochen` |
   | «Ich bringe die Kinder zur Schule und sie zieht sich um» | `!kommunizieren.html#suizid-angesprochen` |
   | Gegenprobe «er bringt mich und die Kinder um» | `kinder.html#eskalation > grenzen.html#gewalt > krise.html#suizid` |

3. Danach mechanisch prüfen:
   - Suchtest 100 %.
   - 885 Proben gleich `d32/p_P.tsv`.
   - `q-r32a`, `q-edge`, `harmlos.q`, `cx694.q` gleich `d32/ea_*.tsv`.
   - `q-r32c`, `q-r32d` gleich `d32/Q2_*.tsv`.
   - Produktionsbuild in einer Kopie bytegleich.

Dann kann `independentReview` gesetzt werden. Danach kommen der neue Pull Request auf einem neuen Branch, das Codex-Review auf dessen exportiertem Kopf und die Prüfung dieses Reviews. **Gemergt wird erst danach.** Die Sichtprüfung in der Produktion steht noch aus; sie sollte auch «Mein Mann bringt mich heute Nacht in unserer Wohnung um» enthalten.

**Belege (Scratchpad der Prüfsitzung, `d32/`):** `suchtest-ea8dc1a.txt`, `suchtest-varQ.txt`; `ea_*.tsv` (`ea8dc1a`), `37b_*.tsv` (`37b963f`), `prod_*.tsv` (r4-31, `bd3d903`), `Q2_*.tsv` (Nachbildung Q); `q-r32c.txt`, `q-r32d.txt` (eigene harmlose Sätze und Gegenproben); `varQ/`, `varQ.diff`; `prodcopy3/`, `prod3-a.log`, `d32c.sha`, `prod3.sha`. Entwurf: `/home/claude/borderline-angehoerige/dist/d32c` (von `.gitignore` erfasst).
