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
