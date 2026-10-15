# Unabhängige Prüfung r4-31 (Delta)

| | |
| --- | --- |
| Gegenstand | Website «Borderline – Orientierung für Angehörige» (Fachstelle Angehörigenarbeit PUK), Entwurf r4-31 |
| Stand | Branch `claude/r4-31-suche-codex-1792072594`, Commit `adba309`, auf `origin` gleich. Basis `0fda233`: Merge von #689 mit Stand `615bdd3`, das ist r4-30 in der Produktion. `site/` ist noch `0fda233` und bytegleich mit meinem Entwurf von `0c711b8` |
| Diff zu `0fda233` | `authoring/js/interaktion.js` (`01bd44a`; inhaltlich gleich wie `be53f5f`, `git diff` ohne Unterschied): neue Funktion `verbIntent()`, `killIntent()` wertet jedes Tötungsverb, Fall (a) der Infinitivregel nur mit Steuerverb. Testliste 277 Anfragen (5 neu). Build, `assetVersion` und CSS-Kopf auf r4-31; `reviewScope` nachgeführt, `independentReview` «ausstehend». Nachweise: neu `2026-10-15-delta-r4-31/FREIGABE.md`, in `2026-10-15-delta-r4-30/FREIGABE.md` Nachtrag 9, Pendenzen |
| Anlass | Zweites Codex-Review von #689 auf `615bdd3` (13:50:31 UTC), zwei P1 (per `gh api` gelesen): (1) «Evaluate every killing verb before resolving safety intent», (2) «Route repeated-object threats to the violence section». Merge von #689 um 13:50:44 UTC durch `christaegger-dot` |
| Prüfobjekt | frischer Entwurf `node authoring/tools/build.mjs --out=dist/d31a`. Verglichen in drei Ständen: r4-29 (`site/` aus `53c5655`), `0fda233` (`site/`) und `adba309` |
| Prüfsitzung | Unabhängige Prüfsitzung (dieselbe wie für r4-30). Sie hat nichts gebaut, nichts korrigiert und nichts entschieden. Im Repository ist nur diese Datei neu; sie ist nicht committet. Keine git-Schreibbefehle. Netlify nicht angefasst. `2026-10-15-delta-r4-30/PRODUKTIONSPRUEFUNG.md` (andere Sitzung) nicht angefasst |
| Zeitpunkt | 15.10.2026, etwa 16:00 bis 16:25 MESZ |
| Massstab | nie schlechter als r4-29; im Zweifel Suizid vor Gewalt |

## Ergebnis

**Freigabefähig mit Auflagen:** Beide Codex-Korrekturen wirken wie beabsichtigt, und meine 575 bisherigen Proben bleiben unverändert. Die neue Bedingung «Steuerverb» ist aber zu eng gefasst. Steht das frühere «mich» mehr als fünf Wörter vor dem zweiten, oder steht dazwischen ein Wort aus der Liste der Einleitewörter (z. B. «seit»), gilt das Steuerverb nicht. Zwei Ich-Aussagen gehen dadurch auf «Gewalt» (R31-01). Eine davon ging in r4-29 auf `krise#suizid`, das ist die heikle Richtung. Die Korrektur ist eine Zeile; ich habe sie nachgebildet (Variante J).

**`independentReview` kann noch nicht auf «bestaetigt» gesetzt werden.** Das geht, sobald Variante J umgesetzt ist und der mechanische Abgleich unten ohne Abweichung durchläuft. Vor dem Merge des neuen Pull Requests braucht es ein Codex-Review auf seinem endgültigen Kopf. Der Merge darf erst erfolgen, wenn dieses Review geprüft ist (R28-O01, R29-P20; bei #689 nicht eingehalten).

Zur Dringlichkeit: In der Produktion (r4-30) geht «er will mich umbringen und ich will mich töten» auf «Gewalt», in r4-29 auf `krise#suizid`. r4-31 behebt das.

## Ergebnis je Prüfpunkt

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| a | `suchtest.mjs` 100 % | **erfüllt** | Entwurf `dist/d31a`: «23 Seiten · 0 Blocker · 1 Hinweise» (nur change-review). `node authoring/tools/suchtest.mjs dist/d31a`: «Suchtest: 277 von 277 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Gegen `site/` (`0fda233`): 274 von 277. Die 3 Abweichungen sind die neuen Codex-Zeilen («er hat mich geschlagen und will mich umzubringen», «er will mich umbringen und ich will mich töten», «er droht mich umzubringen und ich will mich umbringen»). |
| b | Probelisten gegen `0fda233` | **erfüllt, 0 Abweichungen** | `q-alle4.txt` (575): Ersttreffer von `adba309` gleich `0fda233` (575/575). `0fda233` stimmt mit Spalte I in `q-alle4.resultI.tsv` überein (575/575). Die 13 Fälle aus D30-20 bleiben bei `krise#suizid`. `queries_all.txt` 91/91 und `queries.txt` 54/54 gleich r4-29. 0 Skriptfehler. |
| c | Gezielte Proben | **beide Korrekturen wirksam; Befund R31-01** | 50 neue Proben (`q-r431.txt`). Gegenüber `0fda233` sind 13 Ersttreffer anders. 11 davon sind beabsichtigt, 2 sind R31-01. <br>**Mehrere Tötungsverben (beabsichtigt, → Suizid):** «er will mich umbringen und ich will mich töten», «er droht mich umzubringen und ich will mich umbringen», «er droht mich umzubringen ich habe Angst und will mich umbringen», «er will mich umbringen und ich will mich nicht töten». In beiden Reihenfolgen richtig: «ich will mich töten und er will mich umbringen» und «ich will mich umbringen und er droht mich umzubringen» → Suizid. Zwei Drohungen («er droht mich umzubringen und will mich töten», «er will mich töten er hat gedroht mich umzubringen») und «er will mich umbringen und meine Kinder töten» → Gewalt. Mit «sich» → Suizid («er will mich umbringen und sich selbst töten», «mein Mann will mich töten und dann sich umbringen»). «er will mich umbringen ich will mich aber nicht umbringen» → Gewalt, weil «aber» den zweiten Teilsatz trennt; das ist richtig, die Person sagt ausdrücklich, dass sie nicht suizidal ist. <br>**Früheres «mich» ohne Steuerverb (beabsichtigt, → Gewalt):** «er hat mich geschlagen und will mich umzubringen», «er hasst mich (und) will mich umzubringen», «er schlägt mich jeden Tag will mich umzubringen», «er hält mich gefangen und will mich umzubringen», «er hält mich für verrückt und will mich umzubringen», «er sperrt mich ein und will mich umzubringen». Bei `0fda233` alle Suizid. Ebenso Gewalt: «er beschimpft mich und will mich umbringen», «er demütigt mich und plant mich umzubringen», «er hält mich fest und droht mich umzubringen». <br>**Steuerverb-Sätze (→ Suizid, unverändert):** «meine Eltern haben mich gebeten mich nicht umzubringen», «was hält mich (noch) davon ab mich umzubringen», «meine Kinder halten mich jeden Tag davon ab mich umzubringen», «meine Tochter hat mich gestern davon abgehalten mich umzubringen», «mein Mann hat mich zum Glück davon abgehalten mich umzubringen», «er hat mich dazu gebracht/getrieben mich umzubringen», «er fordert mich auf …», «mein Mann drängt mich dazu …», «er ermutigt mich …», «er hat mich (davon) überzeugt …», dazu die D30-20-Sätze. <br>**R31-01 (nicht beabsichtigt, → Gewalt):** «nur meine Kinder halten mich seit Jahren immer wieder davon ab mich umzubringen» (r4-29: `krise#suizid`, `0fda233`: Suizid); «mein Partner hat mich gestern Abend lange davon abgehalten mich umzubringen» (r4-29: 0 Treffer, `0fda233`: Suizid). |
| d | Nachweise und Build | **erfüllt, mit einer Ungenauigkeit** | **Build:** 23/23 Seiten `data-puk-site-build="r4-31"`, 46 × `?v=r4-31`, CSS-Kopf «Build r4-31», `BUILD = 'r4-31'`, `assetVersion` «r4-31». HTML aller 23 Seiten gleich `site/` bis auf den Buildmarker; CSS nur Kopf; `assets/`, `fonts/`, `_headers`, `_redirects` und `robots.txt` gleich. Kopie (`git archive adba309`) mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d31a`. Gegenprobe mit «ausstehend»: blockiert. Wortbilanz unverändert; 0 `tel:`, 0 «Notruf»; `node --check` ohne Fehler. <br>**Nachweise:** `FREIGABE.md` r4-31, Nachtrag 9 und die Pendenzen stimmen mit der GitHub-API überein: Codex-Review 13:50:31 UTC auf `615bdd3`, Merge 13:50:44 UTC durch `christaegger-dot`, Merge-Commit `0fda233`. Ebenso Entscheid «r4-31 jetzt», R29-P20 als nicht eingehalten und Inhalt der zwei P1. Der alte Branch `claude/r4-30-suche-links-1792061353` besteht auf `origin` (Stand `be53f5f`), wie beschrieben. **Ungenau:** Die Beschreibung von Fall (a) («kein ‹und› und kein Einleitewort … ein Steuerverb») nennt die Grenze von fünf Wörtern nicht. Sie nennt auch nicht, dass das Steuerverb bis zu zwei Wörter vor dem früheren «mich» stehen darf. Mit Variante J entfallen die Fünf-Wort-Grenze und der Abbruch beim Einleitewort; die Beschreibung ist dann entsprechend anzupassen. |

## Befund

| ID | Priorität | Befund | Vorschlag (nicht umgesetzt) |
| --- | --- | --- | --- |
| R31-01 | **wichtig, Auflage vor dem Export** | Fall (a) der Infinitivregel sucht das frühere «mich» nur bis fünf Wörter zurück und bricht bei einem Einleitewort ab (hier «seit»). Längere Steuerverb-Sätze erkennt die Regel deshalb nicht. Dann entscheidet die Person links, und das Ergebnis ist «Gewalt». «nur meine Kinder halten mich seit Jahren immer wieder davon ab mich umzubringen» ist damit schlechter als r4-29. «mein Partner hat mich gestern Abend lange davon abgehalten mich umzubringen» geht auf «Gewalt» statt wie bisher auf Suizid. | **Variante J**: In der Schleife für das frühere «mich» die Grenze von fünf Wörtern und den Abbruch beim Einleitewort streichen; nur «und» beendet die Suche. Das Steuerverb muss weiter zwischen den beiden «mich» oder bis zu zwei Wörter vor dem früheren «mich» stehen. Die Codex-Fälle bleiben damit bei Gewalt, weil dort «und» steht oder kein Steuerverb vorkommt. |

**Beleg für J (nur nachgebildet):** Ich habe J in einer Kopie von `dist/d31a` im Scratchpad gepatcht (`d31/varJ/site/js/interaktion.js`, eine Ersetzung). Im Repository ist nichts geändert.

- `suchtest.mjs varJ/site`: 277 von 277, 0 Skriptfehler.
- 617 verschiedene Proben (`q-alle5.txt`: alle bisherigen und die 50 neuen): gegenüber `adba309` ändern sich nur die 2 Ersttreffer aus R31-01, beide → `krise#suizid`.
- Alle Codex-Fälle bleiben bei Gewalt, z. B. «er hat mich geschlagen und will mich umzubringen» und «er hasst mich will mich umzubringen».

**Für den Export:**
1. J umsetzen.
2. Diese zwei Zeilen in die Testliste aufnehmen:
   - «nur meine Kinder halten mich seit Jahren immer wieder davon ab mich umzubringen» → `krise.html#suizid`
   - «mein Partner hat mich gestern Abend lange davon abgehalten mich umzubringen» → `!grenzen.html#gewalt`
3. Danach prüfen:
   - `suchtest.mjs` 100 %
   - Ersttreffer von `q-alle5.txt` gleich Spalte «r30 Ersttreffer» (Nachbildung J) in `q-alle5.resultJ.tsv`, 617/617
   - 91/54 gleich r4-29
4. Die Beschreibung von Fall (a) in `FREIGABE.md` r4-31 und in Nachtrag 9 anpassen.

Fällt das ohne Abweichung aus, ist die Auflage erfüllt, und `independentReview` kann auf «bestaetigt» gesetzt werden. Dann exportieren, den Pull Request eröffnen und vor dem Merge das Codex-Review auf dem Kopf abwarten und prüfen.

**Weiter offen, ohne Einfluss auf den Export:** R30-P01 (mit D30-14, -15, -21), R30-P02 und die Bestätigung der Fachstelle zum erweiterten Suizid.

## Nicht geprüft

- Produktion: r4-31 ist nicht ausgeliefert. Die Produktionsprüfung von r4-30 läuft in einer anderen Sitzung (`PRODUKTIONSPRUEFUNG.md`).
- axe und Überlauf habe ich nicht erneut geprüft. Der Quelltext der Seiten ist gegenüber `site/` bis auf den Buildmarker gleich, geändert ist nur `js/interaktion.js`.
- Nur Chromium.

## Belege

Unter `/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/d31/`:

- `q-r431.txt` (50 neue Proben), `q-r431.result3.tsv` (r4-29, `0fda233`, `adba309`)
- `q-alle4.result3.tsv`, `q-all91.result3.tsv`, `q-54.result3.tsv` (r4-29, `0fda233`, `adba309`)
- `q-alle5.txt`, `q-alle5.resultJ.tsv` (r4-29, `adba309`, Nachbildung J); `varJ/site/`; `searchJ.cjs`
- `suchtest-d31a.txt`; `prodcopy/` (Produktion mit «bestaetigt»), `prodcopy2/` (Gegenprobe)
- Entwurf: `/home/claude/borderline-angehoerige/dist/d31a` (von `.gitignore` erfasst)

## Abschlussbestätigung (Stand 57ddb4b)

| | |
| --- | --- |
| Stand | Branch `claude/r4-31-suche-codex-1792072594`, Commit `57ddb4b`, auf `origin` gleich, Arbeitsbaum gleich `57ddb4b`. Diff zu `adba309`: `authoring/js/interaktion.js` (Korrektur J), Testliste (+2), `reviewScope`, die zwei `FREIGABE.md`, Pendenzen, diese Datei (unverändert committet) und `PRODUKTIONSPRUEFUNG.md` der anderen Sitzung |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d31b` |
| Art | nur mechanischer Abgleich, wie verlangt; keine neue Probenrunde, nichts geändert ausser diesem Abschnitt |
| Zeitpunkt | 15.10.2026, etwa 16:30 bis 16:50 MESZ |

**Ergebnis: bestätigt.** Alle fünf Punkte sind ohne Abweichung erfüllt. Die Auflage R31-01 ist erfüllt.

**`independentReview` kann jetzt auf «bestaetigt» gesetzt werden.** Das gilt für den Inhalt von `57ddb4b`. Ändert sich danach Code, Testliste oder Seiteninhalt, gilt die Bestätigung nicht mehr; dann braucht es einen neuen Abgleich. Reine Nachweis-Nachträge sind davon nicht betroffen.

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | `suchtest.mjs` 100 % | **erfüllt** | Entwurf: «23 Seiten · 0 Blocker · 1 Hinweise» (nur change-review). `suchtest.mjs dist/d31b`: «Suchtest: 279 von 279 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Testliste gegenüber `0fda233`: 7 Zeilen neu, 0 entfernt. Die zwei neuen Zeilen sind die aus R31-01 mit den vorgeschlagenen Erwartungen. |
| 2 | `q-alle5` gleich `resultJ` | **erfüllt, 617/617** | Ersttreffer von `dist/d31b` gleich Spalte «r30 Ersttreffer» in `q-alle5.resultJ.tsv`: 617 von 617, 0 Abweichungen. Platz 2 und 3 sind ebenfalls 617/617 gleich. Gegenproben: Meine Nachbildung `varJ/site`, neu abgefragt, ergibt dieselben 617/617; die Spalte r4-29 ist 617/617 unverändert. 0 JS-Fehler. Der Code in `57ddb4b` ist bis auf die Kommentare zeichengleich mit meiner Nachbildung J (`diff` der beiden `interaktion.js`). Die Schleife hat keine Wortgrenze mehr; nur «und» bricht ab. Das Fenster für das Steuerverb ist unverändert: ab zwei Wörtern vor dem früheren «mich» bis zum späteren. |
| 3 | 91/54 gleich r4-29 | **erfüllt** | `q-all91.txt` 91/91 und `q-54.txt` 54/54 mit gleichem Ersttreffer wie r4-29 (`53c5655`). Alle 145 Anfragen stehen auch in der Testliste, wie es Nachtrag 1 sagt. |
| 4 | Nachtrag 1 und Beschreibungen | **erfüllt** | **Tabelle in `FREIGABE.md` r4-31:** «beim früheren ‹mich› ein Steuerverb (ab zwei Wörtern davor bis zum späteren ‹mich›) und zwischen den beiden ‹mich› kein ‹und›». Das entspricht dem Code genau. «279 Anfragen, sieben davon neu» stimmt. <br>**Nachtrag 9 r4-30:** Er beschreibt die erste Fassung richtig: fünf Wörter, «und» und Einleitewort. Er nennt auch, dass seit R31-01 nur noch «und» gilt. Das Fenster von zwei Wörtern nennt er nicht; das ist vertretbar, weil die r4-31-Tabelle es genau nennt. <br>**Nachtrag 1 r4-31:** Er gibt meinen Befund richtig wieder; der Satz «schlechter als r4-29» steht beim richtigen Satz. Die Zahlen 279/279 und 617/617 sind durch diesen Abgleich nun von mir bestätigt. Die Angaben zur Produktionsprüfung r4-30 in Nachtrag 1 und in den Pendenzen stimmen mit `PRODUKTIONSPRUEFUNG.md` überein: 13:59 bis 14:25 UTC, 207/207, 9/9, 44/44, 88/88, 272/272, PC30-1, PC30-2. Ich habe diese Datei nur gelesen. R31-P01 ist eingetragen. |
| 5 | Build und Produktionsbuild | **erfüllt** | 23/23 Seiten `data-puk-site-build="r4-31"`, 46 × `?v=r4-31`, kein anderer Wert. CSS-Kopf «Build r4-31», `BUILD = 'r4-31'`, `assetVersion` «r4-31». `dist/d31b` unterscheidet sich von `dist/d31a` (`adba309`) nur in `js/interaktion.js`. `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive 57ddb4b`) blockiert «ausstehend» mit «BLOCK … change-review», Exit 1. Mit «bestaetigt» (einzige Änderung in `site.config.json`): «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», Exit 0. Das Ergebnis ist mit `dist/d31b` bytegleich: `diff -rq` ohne Ausgabe, SHA-256 von 34 Dateien gleich. |

**Heikel, vor dem Merge:**

- Für den Branch ist noch kein Pull Request offen (`gh api`, nur gelesen). Vor dem Merge braucht es ein Codex-Review auf dem endgültigen Kopf des Pull Requests, mit dem vollständigen Inhalt. Gemergt wird erst, wenn dieses Review geprüft ist (R28-O01, R29-P20). Bei #689 kamen die zwei P1 13 Sekunden vor dem Merge. Das darf sich nicht wiederholen. Meldet Codex einen neuen Befund in der Suche, gilt diese Bestätigung erst nach einem neuen Abgleich wieder.
- Der Produktionsexport ändert `site/` und `site.config.json`. Danach muss `site/` bytegleich mit dem Produktionsbuild sein, so wie bei `615bdd3`. Diesen Vergleich lege ich der bauenden Sitzung nahe; geprüft habe ich ihn nicht, weil der Export noch nicht vorliegt.

**Hinweise (optional, ohne Einfluss auf die Bestätigung):**

- Der letzte Satz von Nachtrag 1 («bleibt ‹ausstehend›, bis …») ist nach dem Setzen überholt. Ein kurzer Nachtrag 2 mit Verweis auf diesen Abschnitt hält das fest.
- In den Pendenzen steht bei R3C-A9 und R3C-A10 noch «offen bis zur Veröffentlichung von r4-30». r4-30 ist aber veröffentlicht und nachgeprüft, und R3C-A9 hängt jetzt an r4-31.
- Die zweite R31-01-Zeile prüft nur `!grenzen.html#gewalt`. So habe ich sie selbst vorgeschlagen, weil r4-29 dort keinen Treffer hatte. J liefert `krise.html#suizid`. Ein Rückfall auf «kein Treffer» würde der Suchtest deshalb nicht melden. Eine strengere Erwartung ist möglich, aber nicht nötig.

**Belege (Scratchpad `d31/`):** `suchtest-57ddb4b.txt`; `final/q-alle5.result3.tsv`, `final/q-all91.result3.tsv`, `final/q-54.result3.tsv` (Spalten r4-29, Nachbildung J, `57ddb4b`); `prodcopy3/` (Kopie mit «bestaetigt», `dist/prod`); `prod-a.log` (Gegenprobe); `d31b.sha`, `prod3.sha`. Entwurf: `/home/claude/borderline-angehoerige/dist/d31b` (von `.gitignore` erfasst). Lokale Server beendet.

## Nachprüfung Codex #690 (Stand 17b5786)

| | |
| --- | --- |
| Stand | Branch `claude/r4-31-suche-codex-1792072594`, Commit `17b5786`, auf `origin` gleich; Kopf von #690 (offen, nicht gemergt). `authoring/` und `site/` sind gleich wie in `4658f6d`. `site/` ist `1ac8f0b` |
| Anlass | Codex-Review von #690 auf `1ac8f0b` (14:55:09 UTC), drei P1 als Inline-Kommentare (per `gh api` gelesen): «Handle all governing verbs in repeated-object suicide queries», «Isolate each killing verb before applying threat exclusions», «Inspect post-verbal objects for every killing verb». Inhalt wie vom Koordinator beschrieben |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d31c`. Er unterscheidet sich von `dist/d31b` (`57ddb4b`) nur in `js/interaktion.js` |
| Verglichen | fünf Stände: r4-29 (`53c5655`), r4-30 in der Produktion (`site/` aus `0fda233`), `1ac8f0b` (`site/`), `17b5786` und meine Nachbildung K (unten) |
| Massstab | R31-P02 («Nur Rückschritte blockieren»): Ein Befund blockiert nur, wenn eine Anfrage schlechter liegt als in r4-29 (Suizidsorge → Gewalt oder klare Ich-Aussage ohne Treffer); sonst Grenzfall (R30-P01) |
| Zeitpunkt | 15.10.2026, etwa 16:55 bis 17:30 MESZ |

**Gesamturteil nach R31-P02: nicht freigabefähig.** Die drei Codex-Korrekturen wirken für die gemeldeten Beispiele und für nahe Varianten. Korrektur (3) bringt aber einen neuen Rückschritt gegenüber r4-29 (R31-02): «ich denke ans Umbringen er versteht mich nicht» geht von Suizid auf Gewalt. Das ist auch schlechter als die Produktion. Dazu kommen vier Rückschritte gegenüber r4-29, die seit r4-30 schon in der Produktion sind (R31-03 bis R31-06). Drei davon sind Reste genau der Klassen, die Codex in #690 gemeldet hat. Der heikelste ist R31-03: Die direkte Frage «denkst du daran, dich umzubringen» führt auf «Gewalt».

**`independentReview` kann nicht auf «bestaetigt» gesetzt werden.** R31-03 bis R31-06 sind schon veröffentlicht. Wird r4-31 zurückgehalten, bleiben sie in der Produktion. Am schnellsten hilft deshalb, sie in r4-31 mitzukorrigieren. Meine Nachbildung K zeigt, dass das mit vier kleinen Änderungen geht, ohne dass sich eine meiner 762 Bestandsproben ändert.

### Ergebnis je Prüfpunkt

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| a | `suchtest.mjs` 100 % | **erfüllt** | Entwurf «23 Seiten · 0 Blocker · 1 Hinweise» (nur change-review). `suchtest.mjs dist/d31c`: «Suchtest: 286 von 286 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Gegenprobe auf `1ac8f0b`: 281 von 286. Die 5 Abweichungen sind die vier Codex-Zeilen und «umbringen will er mich»; die beiden Gegenproben für neue Sätze bestehen dort schon. |
| b | Listen gegen `1ac8f0b` und r4-29 | **erfüllt, jede Abweichung begründet** | `q-alle5.txt` (617): gegenüber `1ac8f0b` 2 Ersttreffer anders, genau die gemeldeten. «er hasst mich will mich umzubringen» (r4-29 und r4-30 Suizid) und «er schlägt mich jeden Tag will mich umzubringen» (r4-29 `kinder#eskalation`, r4-30 Suizid) gehen auf Suizid. Grund: Für Fall (a) genügt jetzt ein früheres «mich» ohne «und» dazwischen. Einstufung: Grenzfall (G2), sichere Richtung. Gegenüber r4-29 liegen 56 Anfragen nicht mehr auf Suizid. Alle 56 sind Drohungen Dritter, die nach R3C-A9 bewusst auf Gewalt gehen, gleich wie in `1ac8f0b` und r4-30; keine davon ist Suizidsorge. Keine Anfrage mit Treffer in r4-29 ist jetzt ohne Treffer. Gegenüber der Produktion (r4-30) sind 9 Ersttreffer anders, das sind genau die Codex-Fälle aus #689. `q-all91` 91/91 und `q-54` 54/54 gleich r4-29 und `1ac8f0b`. 0 JS-Fehler. |
| c | Gezielte Proben | **Korrekturen wirksam; Befunde R31-02 bis R31-06** | 130 neue Proben (`n690/q-r690.txt`, `q-r690b.txt`) in allen fünf Ständen. <br>**Korrektur (1):** «überzeugt», «nötigt», «angestiftet», «erpresst», «so weit gebracht», «provoziert», «stachelt an», «ermuntert» → Suizid; r4-29 hatte alle ausser «so weit gebracht» auf Suizid. <br>**Korrektur (2):** Sie wirkt nur mit «und»: Das P1-Beispiel geht auf Suizid, ebenso «mein Mann hat versucht mich umzubringen und jetzt hält mich nur meine Tochter davon ab mich umzubringen». Mit «aber», «doch», «nur» oder ohne Bindewort bleibt Gewalt (R31-05). <br>**Korrektur (3), Fragen und Umstellungen:** «umbringen will er mich», «töten willst du mich», «tötet er mich» → Gewalt, richtig. «töte ich mich», «danach töte ich mich», «töten will ich mich (nicht)» → Suizid; vorher ergaben sie keinen Treffer oder «Behandlung». «bringst du mich um» und «bringst du dich um» bleiben bei `grenzen#riskant`, wie in r4-29. Die Gegenproben «Ich will mich umbringen er hat mich verlassen» und «ich will mich töten er hat mich verlassen» bleiben bei Suizid. <br>**Korrektur (3), «mich» zwei bis drei Wörter nach dem Verb in einem neuen Satz:** Bei einem «mich» vor dem Verb ist das abgesichert. Ohne ein solches «mich» wird ein neuer Satz «er … mich» nach einem Infinitiv als Objekt des Tötungsverbs gelesen (R31-02). Ein neuer Satz «ich … mich» wird ebenso gelesen und kippt Gewaltsätze auf Suizid (G1). |
| d | Nachweise | **erfüllt, eine Kleinigkeit** | Nachtrag 2 stimmt mit meiner Abschlussbestätigung überein. Die Tabelle in Nachtrag 3 stimmt in allen neun Feldern (r4-29, r4-30, `1ac8f0b`, je drei Befunde) mit meinen Messungen überein. Die Zeiten stimmen mit der GitHub-API: eröffnet 14:49:40 UTC, Review 14:55:09 UTC auf `1ac8f0b`, offen, nicht gemergt. Der Entscheid R31-P02 steht gleichlautend in Nachtrag 3 und in den Pendenzen. R3C-A9, R3C-A10 und R29-P19 sind nachgeführt. `site/` von `1ac8f0b` ist bytegleich mit meinem Produktionsbuild von `57ddb4b`; damit ist mein Hinweis aus der Abschlussbestätigung erledigt. **Kleinigkeit:** R3C-A9 nennt noch «279 Anfragen», es sind jetzt 286. **Wichtig für den Merge:** Codex hat nur `1ac8f0b` geprüft. Auf `17b5786` lief kein Review, weil Codex nur beim Eröffnen, bei «ready» oder auf «@codex review» prüft. |

### Befunde

Einstufung nach R31-P02. Spalten: r4-29 → `17b5786`; r4-30 und `1ac8f0b` ergeben dasselbe wie `17b5786`, wo nichts anderes steht.

| ID | Einstufung | Befund | Beispiele |
| --- | --- | --- | --- |
| R31-02 | **Rückschritt gegenüber r4-29 (blockierend)**; neu durch Korrektur (3), auch schlechter als r4-30 und `1ac8f0b` | Nach einem Infinitiv («umbringen», «töten») ohne «mich» davor wird ein neuer Satz «er … mich» als Objekt des Tötungsverbs gelesen. Das «ich» vor dem Verb zählt dann nicht mehr. | «ich denke ans Umbringen er versteht mich nicht»: Suizid (auch r4-30, `1ac8f0b`) → **Gewalt**. «ich will mir umbringen er hat mich verlassen», «Gedanken ans Umbringen er hat mich verlassen»: `kommunizieren#worte` (auch r4-30, `1ac8f0b`) → **Gewalt**. Gleicher Mechanismus, mehrdeutig: «ich will umbringen er hat mich verlassen», «umbringen er hat mich verlassen», «ich denke ans Töten er versteht mich nicht» → Gewalt (r4-29, r4-30 und `1ac8f0b`: «Worte» bzw. «Anspannung»). |
| R31-03 | **Rückschritt gegenüber r4-29 (blockierend)**; seit r4-30 in der Produktion | «du … dich» zählt als Gewalt, weil «dich» als fremdes Objekt gilt. | «denkst du daran dich umzubringen», «hast du vor dich umzubringen»: Suizid → **Gewalt**. «willst du dich umbringen», «warum willst du dich umbringen», «wie frage ich willst du dich umbringen», «ich frage ob du dich umbringen willst»: `fragen#gespraeche` → **Gewalt**. «willst du dich töten»: kein Treffer → Gewalt. Heikel: Das ist die direkte Frage, zu der Angehörige ermutigt werden. Wer sie in die Suche übernimmt, landet bei «Gewalt». |
| R31-04 | **Rückschritt gegenüber r4-29 (blockierend)**; seit r4-30 | Fall (a) zählt nur ein früheres «mich», nicht «mir». Das ist dieselbe Klasse wie Codex P1 (1). | «er befiehlt mir mich umzubringen»: Suizid → **Gewalt**. «er rät mir mich umzubringen», «er hat mir geraten mich umzubringen», «sie empfiehlt mir mich umzubringen»: andere Treffer → **Gewalt**. |
| R31-05 | **Rückschritt gegenüber r4-29 (blockierend)**; seit r4-30 | Drohwort und «versucht» zählen im ganzen Abschnitt bis zum letzten «und», auch wenn sie zu einem anderen Verb gehören. Das ist der Rest von Codex P1 (2). | «meine Familie versucht mich davon abzuhalten mich umzubringen», «er hat versucht mich davon abzuhalten mich umzubringen», «meine Tochter versucht mich zu überzeugen mich nicht umzubringen»: kein Treffer → **Gewalt**. «er droht mich umzubringen aber/doch/nur die Kinder halten mich davon ab mich umzubringen» und dasselbe ohne Bindewort: `quellen#forschung` → **Gewalt**. |
| R31-06 | **Rückschritt gegenüber r4-29 (blockierend)**; seit r4-30 | Nach einer Drohung übernimmt «töte» das «mich» der Drohung. Korrektur (3) greift nur, wenn ein Subjekt zwischen Verb und «mich» steht; bei «ich töte mich» steht keines dazwischen. Das ist der Rest von Codex P1 (3). | «er will mich umbringen und ich töte mich vorher», ebenso ohne «und»: Suizid → **Gewalt**. «er schlägt mich und ich töte mich bald»: kein Treffer → **Gewalt**. «er will mich umbringen danach töte ich mich» und «… dann töte ich mich» (ohne «und»): kein Treffer bzw. «Diagnose» → **Gewalt**. |

**Wie ich R31-P02 lese:** Als Rückschritt zähle ich jede Suizidsorge, die auf «Gewalt» führt, auch wenn r4-29 einen anderen oder keinen Treffer hatte. r4-29 hat keinen dieser Sätze auf «Gewalt» geführt, und die Tabelle in Nachtrag 3 behandelt Codex P1 (3) genauso (r4-29: kein Treffer). Das Urteil hängt aber nicht an dieser Lesart. Auch wenn nur Fälle mit Suizid in r4-29 zählen, bleibt in jeder Klasse ausser R31-05 ein Beispiel: «ich denke ans Umbringen er versteht mich nicht», «denkst du daran dich umzubringen», «er befiehlt mir mich umzubringen», «er will mich umbringen und ich töte mich vorher». Für sich allein blockiert also schon der neue Befund R31-02.

**Grenzfälle (R30-P01), nicht blockierend:**

- **G1, neu durch Korrektur (3), Gewalt → Suizid:** «er will die Kinder umbringen ich fürchte mich», «er will meine Mutter umbringen ich fürchte mich», «mein Sohn droht seinen Vater umzubringen ich ängstige mich», «sie will ihn töten ich halte mich raus», «er will töten ich habe mich versteckt». In r4-29 ergaben sie keinen Treffer, in `1ac8f0b` Gewalt.
- **G2, Korrektur (1), Gewalt → Suizid wie in r4-30:**
  - die zwei Sätze aus Punkt b;
  - «er schlägt mich er will mich umzubringen», «er hat mich geschlagen er will mich umzubringen»;
  - «er hat mich eingesperrt um mich umzubringen», «er sucht mich um mich umzubringen», «er vergiftet mich langsam um mich umzubringen».
- **G3, «bringe ich mich um» nach einer Drohung:** «er will mich umbringen (und) dann bringe ich mich um» → Gewalt (r4-29: «Worte»). «bringe ich mich um» ist nach R25-010 bewusst ausgenommen. Die Zuordnung soll die Fachstelle bestätigen.
- **G4, mehrdeutig:** Jetzt Gewalt statt keinem Treffer bzw. «Worte»: «töten er hasst mich», «ich will töten sie hat mich verlassen», «ich habe Angst zu töten er provoziert mich», «umbringen er schlägt mich».

### Vorschlag: Variante K (nur nachgebildet, nicht umgesetzt)

Gepatcht in einer Kopie von `dist/d31c` im Scratchpad (`d31/varK/site/js/interaktion.js`, Diff in `d31/varK.diff`, 62 Zeilen). Im Repository ist nichts geändert.

- **(a) in `michIntent()`:** Drohwort und Versuchswort zählen nur zwischen dem früheren «mich» und dem Tötungsverb. Ohne früheres «mich» zählen sie wie bisher ab dem letzten «und». Als früheres Objekt zählt auch «mir». (R31-04, R31-05)
- **(b) in `verbIntent()`, Prüfung nach dem Verb:**
  - Steht «mich» direkt nach dem Verb, entscheidet das nächste Subjekt vor dem Verb im Abschnitt («und ich töte mich»).
  - Beim Infinitiv zählt ein Subjekt erst nach dem finiten Verb («umbringen will er mich»). Steht es direkt nach dem Infinitiv, beginnt ein neuer Satz («umbringen er versteht mich»). (R31-02, R31-06, G1)
- **(c):** Stehen «du» und «dich» im Teilsatz vor dem Verb, gilt das als reflexiv, also Suizid. (R31-03)
- **(d):** «ich töte mich» und «töte ich mich» gelten immer als Suizid. «dann» und «danach» trennen für die Prüfung nach dem Verb wie «und». (R31-06 ohne «und»)

Ergebnis:

- Suchtest 286 von 286, 0 JS-Fehler.
- `q-alle5` 617/617, `q-all91` 91/91 und `q-54` 54/54 sind gleich wie `17b5786`.
- In den 130 gezielten Proben gehen alle Beispiele aus R31-02 bis R31-06 auf Suizid. Die mehrdeutigen Sätze aus R31-02 haben wieder den Treffer aus r4-29.
- G1 geht wieder auf Gewalt wie in `1ac8f0b`, G4 wieder auf r4-29.
- Neu richtig: «ich töte mich», «ich töte mich bald» → Suizid; «mein Mann tötet mich», «ich glaube er tötet mich» → Gewalt (vorher kein Treffer).
- **Preis, sichere Richtung (Grenzfälle):** «er hat mir versprochen mich umzubringen», «er schwört mir mich umzubringen», «er lauert mir auf um mich umzubringen» (r4-29 Suizid) sowie «er bedroht mich ständig mich umzubringen» und «er bedroht mich er will mich umzubringen» (r4-30 Suizid) gehen auf Suizid. G3 bleibt.

**Für den Export:**

1. K oder Gleichwertiges umsetzen.
2. Mindestens diese Zeilen in die Testliste aufnehmen:

   | Anfrage | Erwartung |
   | --- | --- |
   | «ich denke ans Umbringen er versteht mich nicht» | `krise.html#suizid` |
   | «ich will mir umbringen er hat mich verlassen» | `!grenzen.html#gewalt` |
   | «denkst du daran dich umzubringen» | `krise.html#suizid` |
   | «willst du dich umbringen» | `krise.html#suizid` |
   | «er befiehlt mir mich umzubringen» | `krise.html#suizid` |
   | «meine Familie versucht mich davon abzuhalten mich umzubringen» | `krise.html#suizid` |
   | «er droht mich umzubringen aber meine Kinder halten mich davon ab mich umzubringen» | `krise.html#suizid` |
   | «er will mich umbringen und ich töte mich vorher» | `krise.html#suizid` |
   | «er will mich umbringen dann töte ich mich» | `krise.html#suizid` |
   | Gegenprobe «er will die Kinder umbringen ich fürchte mich» | `grenzen.html#gewalt` |
   | Gegenprobe «mein Mann tötet mich» | `grenzen.html#gewalt` |

3. Danach mechanisch prüfen:
   - Suchtest 100 %.
   - `n690/q-r690.txt` und `n690/q-r690b.txt` gleich Spalte «K» in den `*.result5.tsv`.
   - `q-alle5`, `q-all91` und `q-54` unverändert gegenüber `17b5786`.

Fällt das ohne Abweichung aus, kann `independentReview` gesetzt werden. Vor dem Merge braucht es ein neues Codex-Review auf dem endgültigen Kopf («@codex review» in #690), und dieses Review muss geprüft sein (R28-O01, R29-P20). Neue Codex-Befunde werden nach R31-P02 eingestuft.

**Zu meinen früheren Prüfungen:**

- In der Prüfung von `adba309` habe ich «er hat mich (davon) überzeugt …» unter Suizid aufgeführt. Geprüft hatte ich aber nur den Satz mit «davon» und die verneinte Form. Den Satz ohne «davon», das Beispiel von Codex P1 (1), hatte ich nicht geprüft.
- R31-03 bis R31-06 sind seit r4-30 veröffentlicht. Sie sind in allen meinen r4-30-Runden durchgegangen. Ich hatte weder «du … dich» noch «mir» als früheres Objekt noch «versucht» vor einem anderen Infinitiv geprüft.

**Nicht geprüft:** Produktion (r4-31 ist nicht ausgeliefert); axe und Überlauf (`site/` unverändert, im Entwurf ist nur `js/interaktion.js` anders); nur Chromium.

**Belege (Scratchpad `d31/`):** `suchtest-17b5786.txt`, `suchtest-1ac-on-286.txt`, `suchtest-varK.txt`; `n690/q-alle5.result3.tsv`, `n690/q-all91.result3.tsv`, `n690/q-54.result3.tsv` (r4-29, `1ac8f0b`, `17b5786`); `n690/*.result5.tsv` (r4-29, r4-30, `1ac8f0b`, `17b5786`, K); `search5.cjs`; `s0fd/site` (r4-30), `s1ac/site` (`1ac8f0b`); `varK/`, `varK.diff`. Entwurf: `/home/claude/borderline-angehoerige/dist/d31c` (von `.gitignore` erfasst). Lokale Server beendet.

## Abschlussbestätigung 2 (Stand b9c510f)

| | |
| --- | --- |
| Stand | Branch `claude/r4-31-suche-codex-1792072594`, Commit `b9c510f`, auf `origin` gleich und Kopf von #690 (offen, nicht gemergt). Arbeitsbaum gleich `b9c510f`. Diff zu `17b5786`: `authoring/js/interaktion.js` (Variante K), Testliste (+11), `reviewScope`, `FREIGABE.md` r4-31 (Nachtrag 4, Testlistenzeile), Pendenzen (R3C-A9, R30-P01), diese Datei (unverändert committet). `site/` unverändert (`1ac8f0b`) |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d31d` |
| Art | nur mechanischer Abgleich, wie verlangt; keine neue Probenrunde, nichts geändert ausser diesem Abschnitt |
| Zeitpunkt | 15.10.2026, etwa 17:35 bis 17:50 MESZ |

**Ergebnis: bestätigt.** Alle fünf Punkte sind ohne Abweichung erfüllt, R31-02 bis R31-06 sind behoben. Nach R31-P02 ist mir dabei nichts Blockierendes aufgefallen.

**`independentReview` kann jetzt auf «bestaetigt» gesetzt werden.** Die Bestätigung gilt für den Inhalt von `b9c510f`. Ändern sich danach Code, Testliste oder Seiteninhalt, braucht es einen neuen Abgleich; reine Nachweis-Nachträge sind davon nicht betroffen. Vor dem Merge braucht es das Codex-Review auf dem endgültigen Kopf (nach dem Export), und es muss geprüft sein (R28-O01, R29-P20). Bisher gibt es auf #690 nur das Review auf `1ac8f0b`. Neue Codex-Befunde werden nach R31-P02 eingestuft.

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Suchtest 100 % | **erfüllt** | Entwurf «23 Seiten · 0 Blocker · 1 Hinweise» (nur change-review). `suchtest.mjs dist/d31d`: «Suchtest: 297 von 297 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Die 11 neuen Zeilen sind die vorgeschlagenen, mit den vorgeschlagenen Erwartungen. |
| 2 | Abgleich mit K | **erfüllt, 922/922** | `authoring/js/interaktion.js` ist zeichengleich mit meiner Nachbildung `d31/varK/site/js/interaktion.js` (`diff` ohne Ausgabe). `dist/d31d` ist als Ganzes bytegleich mit `d31/varK/site` (`diff -rq` ohne Ausgabe). Neu im Browser abgefragt, gegen Spalte «K» in `n690/*.result5.tsv`: `q-r690` 86/86, `q-r690b` 74/74, `q-alle5` 617/617, `q-all91` 91/91, `q-54` 54/54. Gegenprobe: Die neu abgefragte Nachbildung ergibt dasselbe, und die Spalte r4-29 ist überall unverändert. 0 JS-Fehler. |
| 3 | 91/54 gleich r4-29 | **erfüllt** | `q-all91` 91/91 und `q-54` 54/54 mit gleichem Ersttreffer wie r4-29 (`53c5655`). |
| 4 | Nachtrag 4 | **erfüllt** | Die fünf Befunde, ihre Beispiele und «seit» sind richtig wiedergegeben. Die Beschreibung von K (a) bis (d) entspricht dem Code. «297 Anfragen, 25 davon neu» stimmt gegenüber r4-30 (272 + 7 + 7 + 11). Die Abgleichzahlen 922/922 sind durch Punkt 2 nun von mir bestätigt. R3C-A9 nennt 297. R30-P01 ist um G1 bis G4 und die fünf Gewaltsätze in sicherer Richtung ergänzt, je Klasse mit einem Beispiel; die vollständigen Sätze stehen in der Nachprüfung oben. |
| 5 | Produktionsbuild bytegleich | **erfüllt** | 23/23 Seiten `data-puk-site-build="r4-31"`, 46 × `?v=r4-31`. CSS-Kopf «Build r4-31», `BUILD = 'r4-31'`, `assetVersion` «r4-31». `dist/d31d` unterscheidet sich von `dist/d31c` nur in `js/interaktion.js`. `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive b9c510f`) blockiert «ausstehend» mit «BLOCK … change-review», Exit 1. Mit «bestaetigt» (einzige Änderung in `site.config.json`): «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», Exit 0. Das Ergebnis ist mit `dist/d31d` bytegleich: `diff -rq` ohne Ausgabe, SHA-256 von 34 Dateien gleich. |

**Nach dem Export:** `site/` muss bytegleich mit dem Produktionsbuild sein, wie bei `1ac8f0b`. Erst dann «@codex review» anfordern, damit das Review den exportierten Kopf sieht.

**Belege (Scratchpad `d31/`):** `suchtest-b9c510f.txt`; `nb9c/*.result3.tsv` (r4-29, Nachbildung K, `b9c510f`); `prodcopy4/` (Kopie mit «bestaetigt», `dist/prod`), `prod4-a.log` (Gegenprobe), `d31d.sha`, `prod4.sha`. Entwurf: `/home/claude/borderline-angehoerige/dist/d31d` (von `.gitignore` erfasst). Lokale Server beendet.

## Abschlussbestätigung 3 (Stand 7f7ee0f)

| | |
| --- | --- |
| Stand | Branch `claude/r4-31-suche-codex-1792072594`, Commit `7f7ee0f`, auf `origin` gleich und Kopf von #690 (offen, nicht gemergt). Arbeitsbaum gleich `7f7ee0f`. Diff zu `ebe8a30`: `authoring/js/interaktion.js` (`auxiliaryWords` und eine Zeile in `verbIntent()`), Testliste (+3), `reviewScope`, `independentReview` «ausstehend», `FREIGABE.md` r4-31 (Nachtrag 6), R3C-A9. `site/` ist `ebe8a30` und bytegleich mit meinem `dist/d31d` |
| Anlass | Zweites Codex-Review von #690 auf `ebe8a30` (15:48:01 UTC, per `gh api` gelesen), ein P1: «Stop scanning into the following question». Beispiel «Ich habe Gedanken ans Umbringen. Versteht er mich?» → Gewalt, r4-29 Suizid |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d31e`; verglichen mit r4-29, r4-30 (`0fda233`), `ebe8a30` und meiner Nachbildung L (unten) |
| Massstab | R31-P02 |
| Zeitpunkt | 15.10.2026, etwa 17:55 bis 18:15 MESZ |

**Ergebnis nach R31-P02: nicht freigabefähig.** Die mechanischen Punkte 1, 2, 3, 5 und 6 sind erfüllt, und der Codex-Fall ist behoben. Die Korrektur deckt aber nur Fragen ab, die mit einem Vollverb beginnen («Versteht er mich?»). Beginnt die nächste Frage mit einem Hilfs- oder Modalverb («Kann er mich verstehen?», «Würde er mich vermissen?»), gilt sie weiter als Umstellung «umbringen will er mich», und die Suche geht auf Gewalt. Das ist ein Rückschritt gegenüber r4-29 (R31-07, blockierend). Diesen Fehler hat meine Variante K (b) eingeführt. Ich hätte ihn in der Nachprüfung von `17b5786` finden müssen. In der Produktion (r4-30) ist er nicht; `ebe8a30` hat ihn.

**`independentReview` kann nicht auf «bestaetigt» gesetzt werden.**

### Ergebnis je Prüfpunkt

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Suchtest 100 % | **erfüllt** | Entwurf «23 Seiten · 0 Blocker · 1 Hinweise» (nur change-review). `suchtest.mjs dist/d31e`: «Suchtest: 300 von 300 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Gegenprobe auf `ebe8a30`: 298 von 300; die 2 Abweichungen sind die beiden Codex-Zeilen. |
| 2 | 922 Proben gegen `ebe8a30` | **erfüllt, 922/922** | Neu im Browser abgefragt: `q-r690` 86/86, `q-r690b` 74/74, `q-alle5` 617/617, `q-all91` 91/91 und `q-54` 54/54 sind gleich wie `ebe8a30` und gleich der Spalte «K» in `n690/*.result5.tsv`. 0 JS-Fehler. |
| 3 | 91/54 wie r4-29 | **erfüllt** | 91/91 und 54/54. |
| 4 | Gezielte Proben zur Änderung | **Codex-Fall behoben; Befund R31-07** | 58 Proben (`n7f7/q-r31p3.txt`) in vier Ständen. <br>**Behoben (Vollverb am Anfang der nächsten Frage):** «Ich habe Gedanken ans Umbringen. Versteht er mich?» und dasselbe ohne Satzzeichen, «Umbringen. Liebt sie mich noch?», «Gedanken ans Umbringen. Hasst er mich?» → Suizid wie in r4-29. «Ich denke ans Umbringen. Liebt er mich noch?» und «ich denke ans Töten versteht sie mich» haben wie in r4-29 keinen Treffer. «ans Umbringen denken hilft er mir» ist unverändert. <br>**Gegenproben mit Hilfs- oder Modalverb, richtig:** «umbringen wird er mich», «töten will sie mich», «umbringen könnte er mich», «töten würde er mich», «umbringen wollte sie mich», «töten kann er mich nicht», «umgebracht hat er mich fast», «umgebracht hätte er mich fast» → Gewalt. «töten will ich mich», «umbringen soll ich mich», «umbringen möchte ich mich», «töten würde ich mich nie» → Suizid. <br>**Nicht behoben (Hilfs- oder Modalverb am Anfang der nächsten Frage):** R31-07 und G5 unten. <br>**Hilfs- und Modalverben, die in `auxiliaryWords` fehlen:** «werde», «werden», «sollte», «habe», «darf», «mag». Mit ihnen gilt die Wertung von vor K: «umbringen werde ich mich» → `krise#waehrend`, «töten sollte ich mich» → `krise#vermeiden`, «umgebracht habe ich mich fast» → kein Treffer, jeweils wie r4-29. In `ebe8a30` gingen sie auf Suizid. Das ist nicht schlechter als r4-29, also ein Grenzfall (G6). |
| 5 | Nachtrag 6 | **erfüllt, mit einer Einschränkung** | Zeit, Stand, Beispiel und Einstufung stimmen mit der GitHub-API und meinen Messungen überein. «300 Anfragen, 28 davon neu» stimmt (272 + 28), R3C-A9 nennt 300. **Einschränkung:** Der Satz «Sonst beginnt ein neuer Satz, auch ohne Satzzeichen» gilt nicht, wenn der neue Satz mit einem Hilfs- oder Modalverb beginnt (R31-07). |
| 6 | Produktionsbuild bytegleich | **erfüllt** | 23/23 Seiten `data-puk-site-build="r4-31"`, 46 × `?v=r4-31`, CSS-Kopf, `BUILD`, `assetVersion` r4-31. `dist/d31e` unterscheidet sich von `dist/d31d` nur in `js/interaktion.js`. In einer Kopie (`git archive 7f7ee0f`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d31e` (`diff -rq` ohne Ausgabe, SHA-256 von 34 Dateien gleich). |

### Befund

| ID | Einstufung | Befund | Beispiele (r4-29 → `7f7ee0f`; `ebe8a30` gleich, r4-30 wie r4-29) |
| --- | --- | --- | --- |
| R31-07 | **Rückschritt gegenüber r4-29 (blockierend)**; eingeführt mit K (b) in `b9c510f`, mit `7f7ee0f` nur teilweise behoben; nicht in der Produktion | Nach einem Infinitiv wird ein Hilfs- oder Modalverb direkt danach als Umstellung gelesen («umbringen will er mich»), auch wenn damit eine neue Frage beginnt. | «Ich denke ans Umbringen. Kann er mich verstehen?» und dasselbe ohne Satzzeichen, «Ich habe Gedanken ans Umbringen. Hat er mich je geliebt?», «Gedanken ans Umbringen. Will er mich noch?», «ich denke ans Umbringen will er mich überhaupt», «Ich denke ans Umbringen. Muss er mich so behandeln?»: Suizid → **Gewalt**. «Gedanken ans Umbringen. Hat sie mich verlassen?», «Umbringen. Wird er mich vermissen?»: «Worte» → **Gewalt**. «Ich denke ans Umbringen. Würde er mich vermissen?»: kein Treffer → **Gewalt**. Mehrdeutig: «Ich denke ans Töten. Wird sie mich verlassen?»: «Anspannung» → Gewalt. |

**Grenzfälle (R30-P01):**

- **G5, neu mit K (b), Gewalt → Suizid:** «Er will die Kinder umbringen. Kann ich mich schützen?», «Er droht sie umzubringen. Soll ich mich trennen?», «Mein Sohn will seinen Vater töten. Muss ich mich einmischen?» → Suizid. In r4-30 gehen sie auf Gewalt. Diese Fragen von Angehörigen sind naheliegend; die Richtung ist sicher, die Zuordnung aber falsch.
- **G6:** In `auxiliaryWords` fehlen «werde», «werden», «sollte», «habe», «darf», «mag» und weitere Formen (siehe Punkt 4); die Wertung ist dort wie in r4-29.
- **Bleibt auch mit L:** Ein blosser Infinitiv am Anfang ohne Satzzeichen, etwa «umbringen wird er mich vermissen», lässt sich nicht von «umbringen wird er mich» unterscheiden und geht auf Gewalt.

**Wichtig zu den Satzzeichen:** Sie erreichen die Suchregel nie. `renderSearch()` übergibt `queryGroups()` die schon normalisierte Anfrage, und `normalized()` macht aus jedem Satzzeichen ein Leerzeichen. Deshalb sind «Kann er mich verstehen?» und «kann er mich verstehen» für die Regel gleich. Die Testzeilen mit Satzzeichen prüfen nichts anderes als die ohne.

### Vorschlag: Variante L (nur nachgebildet, nicht umgesetzt)

Gepatcht in einer Kopie von `dist/d31e` im Scratchpad (`d31/varL/site/js/interaktion.js`, Diff in `d31/varL.diff`, drei geänderte Zeilen). Im Repository ist nichts geändert.

- **L1:** `renderSearch()` übergibt `queryGroups()` den Rohtext (`input.value`). `queryGroups()` normalisiert ihn wie bisher. Nur für `killIntent()` werden vorher «.», «?», «!» und «;» durch «und» ersetzt. Ein Satzende trennt damit wie «und». Alle anderen Teile der Suche sehen dieselbe Anfrage wie bisher.
- **L2:** Nach einem Infinitiv oder Partizip zählt ein Hilfs- oder Modalverb nur dann als Umstellung, wenn der Infinitiv am Anfang seines Abschnitts steht: am Anfang der Anfrage oder nach «und», «dann», «danach», einem Einleitewort oder (mit L1) einem Satzzeichen. «ich denke ans Umbringen kann er mich verstehen» ist damit auch ohne Satzzeichen ein neuer Satz; «umbringen will er mich» bleibt Gewalt.

Ergebnis:

- Suchtest 300 von 300, 0 JS-Fehler.
- Die 922 Proben sind 922/922 gleich wie `7f7ee0f`.
- In den 58 gezielten Proben gehen alle Fälle aus R31-07 auf den Treffer aus r4-29: Suizid, «Worte», «Anspannung» oder kein Treffer.
- G5 geht wieder auf Gewalt wie in r4-30. Alle Gegenproben mit Hilfs- oder Modalverb bleiben richtig.
- 18 weitere Proben mit Satzzeichen (`n7f7/q-r31p3b.txt`): unverändert, mit einer Ausnahme. «Er hat mich geschlagen. Er will mich umzubringen.» geht jetzt auf Gewalt (vorher Suizid, r4-29 «Worte»). Inhaltlich ist das richtig; mit «und» war es schon so.

**Für den Export:**

1. L oder Gleichwertiges umsetzen.
2. In die Testliste aufnehmen:

   | Anfrage | Erwartung |
   | --- | --- |
   | «Ich denke ans Umbringen. Kann er mich verstehen?» | `krise.html#suizid` |
   | «ich denke ans Umbringen will er mich überhaupt» | `krise.html#suizid` |
   | «Ich denke ans Umbringen. Würde er mich vermissen?» | `!grenzen.html#gewalt` |
   | Gegenprobe «Er will die Kinder umbringen. Kann ich mich schützen?» | `grenzen.html#gewalt` |
   | Gegenprobe «Ich habe Angst. Umbringen will er mich.» | `grenzen.html#gewalt` |

3. Danach mechanisch prüfen:
   - Suchtest 100 %.
   - `n7f7/q-r31p3.txt` und `n7f7/q-r31p3b.txt` gleich Spalte «K» (= L) in `n7f7/*.result5.tsv`.
   - Die 922 Proben gleich wie `7f7ee0f`.

Dann kann `independentReview` gesetzt werden. Vor dem Merge braucht es wieder ein Codex-Review auf dem exportierten Kopf, und es muss geprüft sein.

**Hinweis zu `n7f7/*.result5.tsv`:** In diesen Dateien sind die Spalten anders belegt, als die Kopfzeile sagt. «1ac» steht für `ebe8a30`, «neu» für `7f7ee0f` und «K» für die Nachbildung L.

**Belege (Scratchpad `d31/`):** `suchtest-7f7ee0f.txt`, `suchtest-ebe-on-300.txt`, `suchtest-varL.txt`; `n7f7/` (Listen und `*.result5.tsv`); `sebe/site` (`ebe8a30`); `varL/`, `varL.diff`; `prodcopy5/`, `prod5-a.log`, `d31e.sha`, `prod5.sha`. Entwurf: `/home/claude/borderline-angehoerige/dist/d31e` (von `.gitignore` erfasst). Lokale Server beendet.

## Abschlussbestätigung 4 (Stand 93d972b)

| | |
| --- | --- |
| Stand | Branch `claude/r4-31-suche-codex-1792072594`, Commit `93d972b`, auf `origin` gleich und Kopf von #690 (offen, nicht gemergt). Arbeitsbaum gleich `93d972b`. Diff zu `7f7ee0f`: `authoring/js/interaktion.js` (Variante L), Testliste (+5), `reviewScope`, `FREIGABE.md` r4-31 (Nachtrag 7, Markierung in Nachtrag 6, Testlistenzeile), Pendenzen (R3C-A9, R30-P01), diese Datei (unverändert committet). `site/` unverändert (`ebe8a30`), `independentReview` «ausstehend» |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d31f` |
| Art | nur mechanischer Abgleich, wie verlangt; keine neue Probenrunde, nichts geändert ausser diesem Abschnitt |
| Zeitpunkt | 15.10.2026, etwa 18:10 bis 18:20 MESZ |

**Ergebnis: bestätigt.** Alle fünf Punkte sind ohne Abweichung erfüllt, R31-07 ist behoben. Nach R31-P02 ist mir dabei nichts Blockierendes aufgefallen.

**`independentReview` kann jetzt auf «bestaetigt» gesetzt werden.** Die Bestätigung gilt für den Inhalt von `93d972b`. Ändern sich danach Code, Testliste oder Seiteninhalt, braucht es einen neuen Abgleich; reine Nachweis-Nachträge sind davon nicht betroffen. Vor dem Merge braucht es das Codex-Review auf dem exportierten Kopf, und es muss geprüft sein (R28-O01, R29-P20). Neue Befunde werden nach R31-P02 eingestuft.

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Suchtest 100 % | **erfüllt** | Entwurf «23 Seiten · 0 Blocker · 1 Hinweise» (nur change-review). `suchtest.mjs dist/d31f`: «Suchtest: 305 von 305 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Die 5 neuen Zeilen haben die vorgeschlagenen Erwartungen. `suchtest.mjs` füllt das Suchfeld mit dem Text aus der Testliste (`page.fill`), also mit Satzzeichen. Seit L1 prüfen die Zeilen mit Satzzeichen deshalb tatsächlich den Satzzeichen-Fall. |
| 2 | Abgleich mit L | **erfüllt, 998/998** | `authoring/js/interaktion.js` ist zeichengleich mit meiner Nachbildung `d31/varL/site/js/interaktion.js`. `dist/d31f` ist als Ganzes bytegleich mit `d31/varL/site`. Neu im Browser abgefragt, gegen Spalte «K» (= L) in `n7f7/*.result5.tsv`: `q-alle5` 617, `q-r690` 86, `q-r690b` 74, `q-all91` 91, `q-54` 54, `q-r31p3` 58, `q-r31p3b` 18, zusammen 998 von 998. Die neu abgefragte Nachbildung ergibt dasselbe, und die Spalte r4-29 ist überall unverändert. 0 JS-Fehler. |
| 3 | 91/54 gleich r4-29 | **erfüllt** | 91/91 und 54/54. |
| 4 | Nachtrag 7 und Markierung in Nachtrag 6 | **erfüllt** | Nachtrag 7 gibt R31-07, die Herkunft aus K (b), «in `ebe8a30`, nicht in der Produktion» und die Satzzeichen-Feststellung richtig wieder. Die Beschreibung von L1 und L2 entspricht dem Code. Die Abgleichzahlen 998/998 sind durch Punkt 2 nun von mir bestätigt. «305 Anfragen, 33 davon neu» stimmt (272 + 33), R3C-A9 nennt 305. Die Markierung in Nachtrag 6 ist sachlich richtig. **Kleinigkeit in R30-P01:** «G5 (mit Variante L behoben, wenn Satzzeichen stehen)» ist zu vorsichtig. Nach dem Code behebt L2 G5 auch ohne Satzzeichen, weil der Infinitiv dort nicht am Anfang des Abschnitts steht. Geprüft habe ich das nur am Code, eine neue Probe habe ich nicht gemacht. |
| 5 | Produktionsbuild bytegleich | **erfüllt** | 23/23 Seiten `data-puk-site-build="r4-31"`, 46 × `?v=r4-31`, CSS-Kopf, `BUILD`, `assetVersion` r4-31. `dist/d31f` unterscheidet sich von `dist/d31e` nur in `js/interaktion.js`. `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive 93d972b`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d31f` (`diff -rq` ohne Ausgabe, SHA-256 von 34 Dateien gleich). |

**Zur Frage nach M′:** L genügt R31-P02 auf allen meinen Proben, und ich sehe keinen Grund, jetzt zu wechseln. M′ wäre an dieser Stelle robuster: Nach einem Infinitiv kann die Prüfung nach dem Verb dort nie «Gewalt» ergeben, also auch nie einen Rückschritt nach R31-P02. Der Preis wäre, dass richtige Gewaltsätze wie «umbringen will er mich» ihre Wertung verlieren. L behält sie und hat als bekannten Rest nur den blossen Infinitiv am Anfang ohne Satzzeichen («umbringen wird er mich vermissen», in R30-P01). Meldet Codex an dieser Stelle noch einmal einen Rückschritt, würde ich auf M′ wechseln, statt L weiter zu verfeinern.

**Nach dem Export:** `site/` muss bytegleich mit dem Produktionsbuild sein. Erst dann «@codex review» anfordern.

**Belege (Scratchpad `d31/`):** `suchtest-93d972b.txt`; `n93d/*.result3.tsv` (r4-29, Nachbildung L, `93d972b`); `prodcopy6/` (Kopie mit «bestaetigt», `dist/prod`), `prod6-a.log` (Gegenprobe), `d31f.sha`, `prod6.sha`. Entwurf: `/home/claude/borderline-angehoerige/dist/d31f` (von `.gitignore` erfasst). Lokale Server beendet.

## Abschlussbestätigung 5 (Stand 77614a9)

| | |
| --- | --- |
| Stand | Branch `claude/r4-31-suche-codex-1792072594`, Commit `77614a9`, auf `origin` gleich und Kopf von #690 (offen, nicht gemergt). Arbeitsbaum gleich `77614a9`. Diff zu `d4d452f`: `authoring/js/interaktion.js` (Satzmarke `satzende0`), Testliste (+3), `reviewScope`, `independentReview` «ausstehend», `FREIGABE.md` r4-31 (Nachtrag 9), R3C-A9. `site/` ist `d4d452f` und bytegleich mit meinem `dist/d31f` |
| Anlass | Drittes Codex-Review von #690 auf `d4d452f` (16:25:10 UTC, per `gh api` gelesen), ein P1: «Keep backward subject scans within punctuation boundaries». Beispiel «Er hat mich verlassen. Mich umzubringen ist mein Plan.» → Gewalt |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d31g`; verglichen mit r4-29, r4-30 (`0fda233`), `d4d452f` und meiner Nachbildung N (unten) |
| Massstab | R31-P02 |
| Zeitpunkt | 15.10.2026, etwa 18:25 bis 18:45 MESZ |

**Ergebnis nach R31-P02: nicht freigabefähig.** Die mechanischen Punkte 1, 2, 3 und 6 sind erfüllt, und der Codex-Fall ist behoben. Die Satzmarke behebt auch eine Reihe weiterer Fälle, die L1 eingeführt hatte. Zwei Klassen führen aber weiterhin Suizidaussagen auf «Gewalt» (R31-08, R31-09):

- R31-08 ist seit r4-30 in der Produktion.
- R31-09 ist seit `adba309` in r4-31, nicht in der Produktion. Mit r4-31 würde sie also neu veröffentlicht.

**`independentReview` kann nicht auf «bestaetigt» gesetzt werden.**

### Ergebnis je Prüfpunkt

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Suchtest 100 % | **erfüllt** | Entwurf «23 Seiten · 0 Blocker · 1 Hinweise» (nur change-review). `suchtest.mjs dist/d31g`: «Suchtest: 308 von 308 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Gegenprobe auf `d4d452f`: 306 von 308; die 2 Abweichungen sind die beiden Codex-Zeilen. |
| 2 | 998 Proben gegen `d4d452f` | **erfüllt, 998/998** | Neu im Browser abgefragt: `q-alle5` 617, `q-r690` 86, `q-r690b` 74, `q-all91` 91, `q-54` 54, `q-r31p3` 58, `q-r31p3b` 18 sind gleich wie `d4d452f` und gleich der Spalte «K» (= L) in `n7f7/*.result5.tsv`. 0 JS-Fehler. |
| 3 | 91/54 wie r4-29 | **erfüllt** | 91/91 und 54/54. |
| 4 | Gezielte Proben zur Satzmarke | **Codex-Fall behoben; Befunde R31-08, R31-09** | 49 Proben (`n776/q-r31p5.txt`) in vier Ständen. <br>**Richtig:** <br>• Die Codex-Probe und «… Mich zu töten wäre einfacher.» gehen auf Suizid; die Gegenprobe «Er hat mich geschlagen. Er will mich umbringen.» geht auf Gewalt. <br>• Drohung zuerst, dann die Suizidaussage → Suizid: «Er droht mir. Mich umzubringen ist mein Plan.», «Er hat mir gedroht. Mich zu töten wäre einfacher.», «Er droht mir. Ich habe Angst. Mich umzubringen wäre einfacher.». <br>• Mit «ich» in beiden Reihenfolgen → Suizid: «Er droht mich umzubringen. Ich will mich töten.» und umgekehrt, «Er will mich umbringen. Ich will mich umbringen.» und umgekehrt, die Dreiersätze mit «Er schlägt mich». <br>• Fragen: «Er droht mir. Soll ich mich umbringen?» und umgekehrt → Suizid; «Will er mich umbringen? Ich habe Angst.» und «Warum will er mich töten?» → Gewalt. <br>• Satzzeichen mitten im Infinitivsatz → Suizid: «Meine Kinder halten mich davon ab; mich umzubringen.», dasselbe mit Punkt, «Er hat mich überzeugt; mich umzubringen.», «Er droht mir; meine Kinder halten mich davon ab; mich umzubringen.», «Er bittet mich; mich nicht umzubringen.». In `d4d452f` gingen die ersten vier auf Gewalt: L1 hatte sie eingeführt, die Satzmarke behebt sie. <br>• «Sie hat mich verlassen! Mich umzubringen …» und «Er hat mich verlassen? Mich umzubringen …» → Suizid. <br>**Nicht behoben:** R31-08 und R31-09 unten. <br>**«mich» am Satzanfang:** «Mich umzubringen ist mein Plan.» → Suizid; «Mich umzubringen hat er gedroht.» → Gewalt, richtig. «Mich umbringen will er.», «Mich will er umbringen.», «Mich hat er fast umgebracht.» → Suizid wie in r4-30 (G8). |
| 5 | Nachtrag 9 | **erfüllt, mit einer Ungenauigkeit** | Zeit, Stand, Beispiel und die Werte für r4-29 (`fragen#f-verlassen`), r4-30 (Suizid) und `d4d452f` (Gewalt) stimmen. «eingeführt durch L1» stimmt. «308 Anfragen, 36 davon neu» stimmt (272 + 36), R3C-A9 nennt 308. **Ungenau:** «beendet auch die Suche … nach einem Drohwort» gilt nur rückwärts. Ein Drohwort in einem späteren Satz zählt weiter (R31-08). |
| 6 | Produktionsbuild bytegleich | **erfüllt** | 23/23 Seiten `data-puk-site-build="r4-31"`, 46 × `?v=r4-31`, CSS-Kopf r4-31. `dist/d31g` unterscheidet sich von `dist/d31f` nur in `js/interaktion.js`. `node --check` ohne Fehler. In einer Kopie (`git archive 77614a9`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d31g` (SHA-256 von 34 Dateien gleich). |

### Befunde

| ID | Einstufung | Befund | Beispiele (r4-29 / r4-30 → `77614a9`; `d4d452f` gleich) |
| --- | --- | --- | --- |
| R31-08 | **Rückschritt gegenüber r4-29 (blockierend)**; seit r4-30 in der Produktion | Findet `michIntent()` kein Subjekt, entscheidet zuletzt ein Drohwort. Gesucht wird es ab dem Satz von «mich» bis zum Ende der Anfrage, also auch in einem späteren Satz oder Teilsatz. Die Korrektur in `77614a9` begrenzt die Suche nur nach vorne, zum Anfang hin. | «Mich umzubringen ist mein Plan. Er droht mir.»: Suizid / Gewalt → **Gewalt**. «Mich umzubringen wäre einfacher. Er hat mir gedroht.» und «Mich umzubringen wäre einfacher. Ich habe Angst. Er droht mir.»: kein Treffer / Gewalt → **Gewalt**. «Mich umzubringen ist mein Plan, seit er mir droht.»: `krise#krisenplan` / Gewalt → **Gewalt**. |
| R31-09 | **Rückschritt gegenüber r4-29 (blockierend)**; seit `adba309`, nicht in der Produktion, also schlechter als r4-30 | Die Codex-Aussage mit «und» statt Punkt. Fall (a) gilt nach dem Codex-Befund auf #689 nicht über «und». Danach entscheidet das Subjekt «er» vor dem «und», wie es für «er hat mich geschlagen und will mich umzubringen» gewollt ist. | «Er hat mich verlassen und mich umzubringen ist mein Plan.»: `fragen#f-verlassen` / Suizid → **Gewalt**. «Er hat mich verlassen und mich zu töten wäre einfacher.»: kein Treffer / Suizid → **Gewalt**. |

Auch nach der strengen Lesart blockiert R31-08: «Mich umzubringen ist mein Plan. Er droht mir.» war in r4-29 Suizid. R31-09 blockiert nach meiner Lesart, also «Suizidaussage → Gewalt», wie du den Codex-Fall eingestuft hast. Ausserdem wäre es ein Rückschritt gegenüber der Produktion.

**Grenzfälle (R30-P01):**

- **G7, neu durch die Satzmarke, Gewalt → Suizid:** Eine Drohung, die durch ein Satzzeichen geteilt ist, gilt jetzt als Suizidaussage: «Er droht. Mich umzubringen.», «Er droht; mich umzubringen.», «Er hat gedroht. Mich umzubringen.», «Er droht mir. Mich umzubringen.», «Er hat versucht; mich umzubringen.». Die Werte sind r4-29 Suizid, r4-30 Gewalt. Das ist die sichere Richtung. «Er droht. Mich umzubringen …» ist ohne Fortsetzung mehrdeutig.
- **G8:** «Mich umbringen will er.», «Mich will er umbringen.», «Mich hat er fast umgebracht.» → Suizid wie in r4-30. Das Subjekt nach dem Hilfsverb wird nicht gelesen.

**Selbstkritik:** L1 stammte von mir. In der Abschlussbestätigung 4 habe ich wie verlangt nur mechanisch geprüft. L1 hatte aber ausser dem Codex-Fall auch die Infinitivsätze mit Satzzeichen in der Mitte auf «Gewalt» gebracht (Punkt 4, «Satzzeichen mitten im Infinitivsatz»). Das hätte ich beim Entwurf von L mit Proben finden müssen.

### Vorschlag: Variante N (nur nachgebildet, nicht umgesetzt)

Gepatcht in einer Kopie von `dist/d31g` im Scratchpad (`d31/varM/site/js/interaktion.js`, Diff in `d31/varN.diff`, 8 geänderte Zeilen). Im Repository ist nichts geändert.

- **N1, in `michIntent()`, letzte Zeile:** Das Drohwort zählt nur ab dem Satz von «mich» bis zum Ende seines Teilsatzes, also bis zum nächsten «und», Einleitewort oder Satzende. (R31-08)
- **N2, in `michIntent()`, im Block der Variante I:** Steht «mich» am Anfang des Abschnitts oder Satzes, folgt ein zu-Infinitiv und danach «ist», «wäre», «war», «scheint» oder «bleibt», ist der Infinitiv das Subjekt → Suizid («… und mich umzubringen ist mein Plan»). Ein Drohwort vor dem Verb schliesst das wie bisher aus. (R31-09)

Ergebnis:

- Suchtest 308 von 308, 0 JS-Fehler.
- Die 998 Proben sind 998/998 gleich wie `77614a9`.
- In den 49 gezielten Proben gehen alle Fälle aus R31-08 und R31-09 auf Suizid.
- Gegenproben bleiben Gewalt: «Mich umzubringen hat er gedroht.», «Er hat mich geschlagen und will mich umzubringen.», «Er hat mich geschlagen. Er will mich umbringen.».
- Preis, sichere Richtung: «Mich umbringen? Warum droht er mir?» → Suizid (r4-29 Suizid). Nach dem Code würde auch «mich umzubringen ist sein Plan» auf Suizid gehen; das habe ich nicht als Probe geprüft.

**Für den Export:**

1. N oder Gleichwertiges umsetzen.
2. In die Testliste aufnehmen:

   | Anfrage | Erwartung |
   | --- | --- |
   | «Mich umzubringen ist mein Plan. Er droht mir.» | `krise.html#suizid` |
   | «Mich umzubringen wäre einfacher. Er hat mir gedroht.» | `krise.html#suizid` |
   | «Mich umzubringen ist mein Plan, seit er mir droht.» | `krise.html#suizid` |
   | «Er hat mich verlassen und mich umzubringen ist mein Plan.» | `krise.html#suizid` |
   | «Meine Kinder halten mich davon ab; mich umzubringen.» | `krise.html#suizid` |
   | Gegenprobe «Mich umzubringen hat er gedroht.» | `grenzen.html#gewalt` |

3. Danach mechanisch prüfen:
   - Suchtest 100 %.
   - `n776/q-r31p5.txt` gleich Spalte «K» (= N) in `n776/q-r31p5.result5.tsv`.
   - Die 998 Proben unverändert gegenüber `77614a9`.

   In `n776/*.result5.tsv` steht «1ac» für `d4d452f`, «neu» für `77614a9` und «K» für N.

**Zur Lage:** Jede Codex-Runde und jede meiner Proberunden findet in dieser Regel eine neue Satzform. Bisher lag fast jede neue Form in der gefährlichen Richtung. Die Korrekturen sind klein, aber sie greifen ineinander. Darum sollte die Auftraggeberin entscheiden, ob vor dem Merge ein Sicherheitsnetz dazukommt: Ergibt die Regel «Gewalt», während die Anfrage eine Suizidaussage in der ersten Person enthält, gilt Suizid. Eine Suizidaussage wäre dabei «mich» mit einem zu-Infinitiv oder mit «ich» im selben Satz. So eine Regel liesse sich mit den vorhandenen 1047 Proben gut absichern. Ich schlage sie hier nur vor und habe sie nicht nachgebildet.

**Belege (Scratchpad `d31/`):** `suchtest-77614a9.txt`, `suchtest-d4d-on-308.txt`, `suchtest-varN.txt`; `n776/` (Listen und `*.result5.tsv`); `sd4d/site` (`d4d452f`); `varM/site` (Nachbildung N), `varN.diff`; `prodcopy7/`, `prod7-a.log`, `d31g.sha`, `prod7.sha`. Entwurf: `/home/claude/borderline-angehoerige/dist/d31g` (von `.gitignore` erfasst). Lokale Server beendet.

## Abschlussbestätigung 6 (Stand 800a729)

| | |
| --- | --- |
| Stand | Branch `claude/r4-31-suche-codex-1792072594`, Commit `800a729`, auf `origin` gleich und Kopf von #690 (offen, nicht gemergt). Arbeitsbaum gleich `800a729`. Diff zu `77614a9`: `authoring/js/interaktion.js` (Variante N), Testliste (+6), `reviewScope`, `FREIGABE.md` r4-31 (Nachtrag 10), Pendenzen (R3C-A9, R31-P02 «ersetzt durch R31-P03», neu R31-P03 und R31-P04), diese Datei (unverändert committet). `site/` unverändert (`d4d452f`), `independentReview` «ausstehend» |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d31h` |
| Massstab | **R31-P03** (Entscheid «N veröffentlichen»): Es blockiert nur, was r4-31 gegenüber der Produktion r4-30 (`0fda233`) verschlechtert, also Suizidsorge → Gewalt oder eine klare Ich-Aussage ohne Treffer. Was in der Produktion schon genauso steht, geht in R31-P04 (r4-32) |
| Art | mechanischer Abgleich und Vergleich mit der Produktion über alle vorhandenen Proben; keine neue Probenrunde, nichts geändert ausser diesem Abschnitt |
| Zeitpunkt | 15.10.2026, etwa 18:45 bis 19:00 MESZ |

**Ergebnis nach R31-P03: bestätigt.** Alle sechs Punkte sind ohne Abweichung erfüllt. Gegenüber der Produktion verschlechtert r4-31 auf keiner meiner Proben eine Suizidaussage zu «Gewalt», und keine Anfrage verliert ihren Treffer. Nach R31-P03 ist mir nichts Blockierendes aufgefallen.

**`independentReview` kann jetzt auf «bestaetigt» gesetzt werden.** Die Bestätigung gilt für den Inhalt von `800a729`. Ändern sich danach Code, Testliste oder Seiteninhalt, braucht es einen neuen Abgleich; reine Nachweis-Nachträge sind davon nicht betroffen. Vor dem Merge kommen:

1. der Export;
2. die Prüfung, dass `site/` bytegleich mit dem Produktionsbuild ist;
3. «@codex review» auf dem exportierten Kopf;
4. die Prüfung dieses Reviews nach R31-P03 (R28-O01, R29-P20).

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Suchtest 100 % | **erfüllt** | Entwurf «23 Seiten · 0 Blocker · 1 Hinweise» (nur change-review). `suchtest.mjs dist/d31h`: «Suchtest: 314 von 314 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Die 6 neuen Zeilen haben die vorgeschlagenen Erwartungen. Zum Vergleich ergibt die Produktion (`0fda233`) auf dieser Testliste 295 von 314. |
| 2 | Abgleich mit N | **erfüllt, 1047/1047** | `authoring/js/interaktion.js` ist zeichengleich mit meiner Nachbildung. `dist/d31h` ist als Ganzes bytegleich mit `d31/varM/site`. Neu im Browser abgefragt, gegen Spalte «K» (= N) in `n776/*.result5.tsv`: `q-alle5` 617, `q-r690` 86, `q-r690b` 74, `q-all91` 91, `q-54` 54, `q-r31p3` 58, `q-r31p3b` 18, `q-r31p5` 49, zusammen 1047 von 1047. Die Spalten r4-29 und r4-30 sind überall unverändert. 0 JS-Fehler. |
| 3 | 91/54 gleich r4-29 | **erfüllt** | 91/91 und 54/54. |
| 4 | Keine Verschlechterung gegenüber der Produktion | **erfüllt** | Abgefragt habe ich alle 885 verschiedenen Anfragen: 852 aus meinen 65 Probelisten (`d30/q-*`, `d31/q-*`, `d31/*/q-*`) und 33 Zeilen, die nur in der Testliste stehen. Je in r4-29, Produktion (`0fda233`) und `800a729` (`n800/q-union.result5.tsv`). Gegenüber der Produktion sind 93 Ersttreffer anders: <br>• **60** gehen von Gewalt auf Suizid. <br>• **8** gehen von keinem Treffer oder «Behandlung» auf Suizid («ich töte mich», «töte ich mich», «töten will ich mich» u. a.). <br>• **25** gehen neu auf Gewalt. Ich habe alle einzeln angesehen: Alle sind Drohungen anderer gegen die fragende Person, z. B. «er hasst mich und will mich umzubringen», «umbringen will er mich», «mein Mann tötet mich», «Er hat mich geschlagen. Er will mich umzubringen.». Keine ist eine Suizidaussage. <br>• **0** Anfragen verlieren ihren Treffer. <br>Damit liegt keine Suizidaussage, die in der Produktion nicht auf Gewalt lag, jetzt auf Gewalt. Das bestätigt deine Zahlen (852 Proben, 60, 25). |
| 5 | Nachtrag 10, R31-P03, R31-P04 | **erfüllt, ein Hinweis** | Nachtrag 10 gibt R31-08, R31-09, N1, N2, den Vergleich mit der Produktion (60/25/0) und den Entscheid samt Begleittext richtig wieder. R31-P03 entspricht dem Entscheid. R31-P02 ist als «ersetzt durch R31-P03» markiert. R31-P04 nennt die verbliebenen Abweichungen und das Sicherheitsnetz zum Entscheid durch die Auftraggeberin. «314 Anfragen, 42 davon neu» stimmt (272 + 42), R3C-A9 nennt 314. **Hinweis:** In der Frage an die Auftraggeberin steht «Zwei davon sind seit r4-30 in der Produktion». Tatsächlich standen fünf Klassen schon in der Produktion: R31-03, R31-04, R31-05, R31-06 und R31-08. Am Entscheid ändert das nichts, denn N behebt alle fünf, und R31-P03 vergleicht ohnehin mit der Produktion. |
| 6 | Produktionsbuild bytegleich | **erfüllt** | 23/23 Seiten `data-puk-site-build="r4-31"`, 46 × `?v=r4-31`, CSS-Kopf r4-31. `dist/d31h` unterscheidet sich von `dist/d31g` nur in `js/interaktion.js`. `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive 800a729`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d31h` (SHA-256 von 34 Dateien gleich). |

**Für R31-P04 (nicht blockierend):** Von den 60 Anfragen, die von Gewalt auf Suizid gehen, sind die meisten Suizidaussagen oder gemischte Anfragen. Etwa zehn sind reine Gewaltaussagen und gehen jetzt in der sicheren Richtung auf Suizid:

- «er lauert mir auf um mich umzubringen», «er hat mir versprochen mich umzubringen», «er schwört mir mich umzubringen»;
- die durch ein Satzzeichen geteilten Drohungen aus G7 («Er droht. Mich umzubringen.» u. a.);
- «Mich umbringen? Warum droht er mir?».

Sie stehen schon in R30-P01 bzw. in meinen Abschnitten oben und gehören in die Arbeit an r4-32.

**Belege (Scratchpad `d31/`):** `suchtest-800a729.txt`, `suchtest-r30-on-314.txt`; `n800/` (Listen, `q-union.txt` mit 885 Anfragen, `*.result5.tsv`; dort «1ac» = `d4d452f`, «neu» = `800a729`, «K» = N); `prodcopy8/`, `prod8-a.log`, `d31h.sha`, `prod8.sha`. Entwurf: `/home/claude/borderline-angehoerige/dist/d31h` (von `.gitignore` erfasst). Lokale Server beendet.

## Abschlussbestätigung 7 (Stand 120370e)

| | |
| --- | --- |
| Stand | Branch `claude/r4-31-suche-codex-1792072594`, Commit `120370e`, auf `origin` gleich und Kopf von #690 (offen, nicht gemergt). Arbeitsbaum gleich `120370e`. Diff zu `09e05f2`: in `authoring/js/interaktion.js` eine Zeile (Phrasen «ans umbringen» und «ans toeten» in der Suizidgruppe), Testliste (+3), `reviewScope`, `independentReview` «ausstehend», `FREIGABE.md` r4-31 (Nachtrag 12), R3C-A9. `site/` ist `09e05f2` und bytegleich mit meinem `dist/d31h` |
| Anlass | Viertes Codex-Review von #690 auf `09e05f2` (17:06:29 UTC, per `gh api` gelesen), ein P1: «Preserve later nominal suicide signals». Beispiel: «Umbringen will er mich. Ich habe Gedanken ans Umbringen.» geht auf Gewalt, in der Produktion auf `krise#krisenplan` |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d31i`; verglichen mit r4-29, Produktion (`0fda233`) und `09e05f2` |
| Massstab | R31-P03 |
| Zeitpunkt | 15.10.2026, etwa 19:05 bis 19:25 MESZ |

**Ergebnis nach R31-P03: bestätigt.** Alle sieben Punkte sind erfüllt. Gegenüber `09e05f2` weichen genau die 13 genannten Anfragen ab, alle begründet. Gegenüber der Produktion geht keine Suizidaussage neu auf Gewalt, und keine Anfrage verliert ihren Treffer. Die Nebenwirkungen der Phrase liegen alle in der sicheren Richtung. Nach R31-P03 ist mir nichts Blockierendes aufgefallen.

**`independentReview` kann jetzt auf «bestaetigt» gesetzt werden.** Die Bestätigung gilt für den Inhalt von `120370e`. Ändern sich danach Code, Testliste oder Seiteninhalt, braucht es einen neuen Abgleich; reine Nachweis-Nachträge sind davon nicht betroffen. Vor dem Merge kommen:

1. der Export;
2. die Prüfung, dass `site/` bytegleich mit dem Produktionsbuild ist;
3. «@codex review» auf dem exportierten Kopf;
4. die Prüfung dieses Reviews nach R31-P03 (R28-O01, R29-P20).

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Suchtest 100 % | **erfüllt** | Entwurf «23 Seiten · 0 Blocker · 1 Hinweise» (nur change-review). `suchtest.mjs dist/d31i`: «Suchtest: 317 von 317 Ersttreffern wie festgeschrieben · JS-Fehler 0», Exit 0. Gegenprobe auf `09e05f2`: 314 von 317; die 3 Abweichungen sind die neuen Zeilen. |
| 2 | `q-union` gegen `09e05f2` | **erfüllt, genau 13 begründete Abweichungen** | 885 Anfragen neu abgefragt. Die Spalte `09e05f2` ist 885/885 gleich wie mein Lauf auf `800a729`, die Spalten r4-29 und r4-30 sind unverändert. 13 Ersttreffer sind anders. Alle 13 sind Aussagen in der ersten Person mit «ans Umbringen» oder «ans Töten» und gehen jetzt auf `krise#suizid`. Vorher lagen sie in allen drei Ständen auf «Worte», «Anspannung» oder ohne Treffer: <br>• «ich denke ans Töten er versteht mich nicht», «ich denke ans Töten versteht sie mich», «Ich denke ans Töten, sie liebt mich nicht mehr», «Ich denke ans Töten. Wird sie mich verlassen?»; <br>• «Gedanken ans Umbringen er hat mich verlassen», dasselbe mit Komma, «Gedanken ans Umbringen. Hat sie mich verlassen?», «Gedanken ans Umbringen, liebt mich überhaupt jemand?», «ans Umbringen denken hilft er mir»; <br>• «Ich denke ans Umbringen. Liebt er mich noch?», «Ich denke ans Umbringen. Würde er mich vermissen?», «ich denke ans Umbringen würde sie mich vermissen», «Ich denke ans Umbringen. Würde mich jemand vermissen?». <br>Begründung: Die Phrase löst das Suizidsignal aus bzw. ist der längste Phrasentreffer. Zwei der 13 enthalten kein «ich», sind aber in der ersten Person gemeint. |
| 3 | 91/54 gleich r4-29 | **erfüllt** | 91/91 und 54/54. |
| 4 | Gegen die Produktion | **erfüllt** | Über die 885 Anfragen sind 106 Ersttreffer anders als in der Produktion. Neu auf Gewalt gehen genau dieselben 25 Drohungen anderer wie bei `800a729`; keine ist eine Suizidaussage. **0** Anfragen verlieren ihren Treffer. Die übrigen 81 gehen auf Suizid: die 60 und 8 aus Abschlussbestätigung 6 und die 13 aus Punkt 2. |
| 5 | Nebenwirkungen der Phrase | **sichere Richtung, nicht blockierend** | 27 Proben (`n120/q-r31p7.txt`). <br>**Richtig:** Die drei Codex-Zeilen → Suizid. «Gedanken ans Umbringen», «Gedanken ans Töten», «er hat Gedanken ans Töten» und «ich denke nicht ans Umbringen» bleiben bei Suizid. «er redet ständig vom Umbringen» hat wie in r4-29 keinen Treffer, weil die Phrase nur «ans» erfasst. **Verbessert:** «meine Tochter denkt ans Umbringen», «mein Sohn denkt ans Umbringen»: vorher `beziehungen#verantwortung`, jetzt Suizid. <br>**Drohungen anderer → Suizid (sichere Richtung, Grenzfälle für R31-P04):** «er denkt ans Umbringen von mir», «er droht, er denke ans Töten», «mein Mann denkt ans Töten», «mein Sohn denkt ans Umbringen seines Vaters», «er denkt ans Umbringen und schlägt mich», «Er denkt ans Umbringen. Er will mich umbringen.», «Angst vor seinen Gedanken ans Töten». Ebenso Anfragen, die in der Produktion auf Gewalt lagen: «Er will mich umbringen. Er denkt ständig ans Töten.», «mein Ex denkt ans Töten und bedroht mich», «er droht mit dem Tod und denkt ans Umbringen», «er bedroht mich und denkt ans Töten», «Gedanken ans Umbringen er bedroht mich». Verneint geht «ich denke nicht ans Umbringen aber er bedroht mich» ebenfalls auf Suizid (Produktion: Gewalt): Das Suizidsignal zählt dort nicht, aber «ans umbringen» ist der längste Phrasentreffer und schlägt «bedroht mich». Auch «ich denke ans Töten von Tieren» und «ich denke nie ans Töten» gehen auf Suizid. <br>Nach dem Code kann die Phrase eine Anfrage nur zum Suizid hin verschieben: Sie setzt das Suizidsignal oder macht die Suizidgruppe zum Phrasentreffer. Auf Gewalt oder ohne Treffer führt sie nicht. |
| 6 | Nachtrag 12 | **erfüllt** | Zeit, Stand, Beispiel und die Werte für Produktion (Krisenplan) und `09e05f2` (Gewalt) stimmen, ebenso die Einstufung nach R31-P03. «317 Anfragen, 45 davon neu» stimmt (272 + 45), R3C-A9 nennt 317. Die Zahlen 13, 25 und 0 sind durch die Punkte 2 und 4 nun von mir bestätigt. Kleinigkeit: «Alle 13 sind Ich-Aussagen» trifft zu, nur steht in zweien kein «ich» im Wortlaut. |
| 7 | Produktionsbuild bytegleich | **erfüllt** | 23/23 Seiten `data-puk-site-build="r4-31"`, 46 × `?v=r4-31`, CSS-Kopf r4-31. `dist/d31i` unterscheidet sich von `dist/d31h` nur in `js/interaktion.js`. `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive 120370e`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d31i` (SHA-256 von 34 Dateien gleich). |

**Für R31-P04:** Die Phrase wirkt unabhängig davon, wer «ans Umbringen» denkt. Gewaltsorgen mit dieser Wendung gehen deshalb auf Suizid, auch solche, die in der Produktion richtig auf Gewalt lagen («er bedroht mich und denkt ans Töten»). Nach R31-P03 ist das die sichere Richtung. Bei der Arbeit an r4-32 und am Sicherheitsnetz sollte es aber geprüft werden.

**Belege (Scratchpad `d31/`):** `suchtest-120370e.txt`, `suchtest-09e-on-317.txt`; `n120/` (`q-union.txt`, `q-r31p7.txt`, `*.result5.tsv`; Spalten r4-29, r4-30, «1ac» = `09e05f2`, «neu» = `120370e`, «K» = `120370e`); `s09e/site` (`09e05f2`); `prodcopy9/`, `prod9-a.log`, `d31i.sha`, `prod9.sha`. Entwurf: `/home/claude/borderline-angehoerige/dist/d31i` (von `.gitignore` erfasst). Lokale Server beendet.
