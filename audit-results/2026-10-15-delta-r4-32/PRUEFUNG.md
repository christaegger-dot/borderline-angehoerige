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
