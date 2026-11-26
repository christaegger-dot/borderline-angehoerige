**Blockiert nach R34-P01: nein.** Empfehlung: **Merge nach Entscheid zu N848-1 bis N848-3 vertretbar**; ohne diese Entscheide nicht mergen, weil die Ausnahme-Muster N848-1 verdecken und N848-2 dem Auftrag «fest oben» widerspricht. Kein Befund verlangt den Rückbau, keiner verschlechtert eine Anfrage nach R34-P01.

# Nachprüfung r4-77 (PR #848) · Bauweise der Suche

Stand 26.11.2026, Prüfung vor dem Merge · geprüft: [PR #848](https://github.com/christaegger-dot/borderline-angehoerige/pull/848), Branch `claude/sharp-mendel-6ecwbi`, Kopf `ad6eba0`, Basis `main` `451b20f` (r4-76) · PR-Status zu Beginn und am Ende der Prüfung: Entwurf, offen, nicht gemergt.

**Unabhängigkeit.** Diese Sitzung hat weder r4-74 bis r4-77 noch das Suchraster gebaut. Alle Zahlen unten sind selbst gemessen; Aussagen des Berichts der bauenden Sitzung (`audit-results/2026-11-26-bauweise-suche-r4-77/BERICHT.md`) sind nur übernommen, wo sie hier nachgemessen sind.

Dieser Bericht und die Dateien dieses Ordners enthalten Suchanfragen im Wortlaut, auch zu Suizid, Selbstverletzung und Gewalt. Sie gehören nicht in die Pendenzendatei.

## 1 Ergebnis in Kürze

| Frage | Ergebnis |
|---|---|
| R34-P01 a) Tötungswort, Suizid fällt aus den ersten zwei | 0 Fälle. Keine einzige Anfrage mit Tötungswort oder bisheriger Anheftung ändert Treffer oder Anheftung (Raster 45 605 Anfragen, erste sechs Treffer verglichen; 12 eigene Proben) |
| R34-P01 b) Anheftung verloren | 0 |
| R34-P01 c) klare Ich-Aussage ohne Treffer | 0; überhaupt keine Anfrage verliert jeden Treffer (Raster und 281 eigene Proben) |
| Sicherheitsabschnitt aus den ersten zwei verloren | Raster: 298 (alle «verdrängt», von Platz 2 auf 3); eigene Proben: 1 (N848-1) |
| Sicherheitsabschnitt aus den ersten drei ganz verschwunden (erste sechs) | 0 |
| angehefteter Abschnitt nicht unter den ersten zwei | 0 von 15 759 neu angehefteten Rasteranfragen |
| Gates | alle wie im PR angegeben (Abschnitt 2) |
| CI `build-and-compare` auf `ad6eba0` | grün, 23:34:01–23:39:28 UTC; voller Rasterlauf, Zahlen identisch mit meinem lokalen Lauf |

Warum R34-P01 hier strukturell nicht verletzt werden kann, und die Messung das bestätigt: Der neue Zweig in `queryGroups` wird erst nach `if (order) return …` erreicht, also nie bei Tötungswort oder Suizid und Gewalt zusammen. Er hängt nur `pins` an das unveränderte Ergebnis von `baseGroups()`; `score` und die Trefferliste bleiben gleich. Neue Anheftungen können also nur andere Abschnitte nach unten schieben, nie Treffer entfernen. Genau das misst das Raster (298 Verdrängungen, 0 sonst).

## 2 Gates auf `ad6eba0`

`PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright`, Chromium aus Playwright, im Arbeitsbaum des PR-Kopfs.

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise; `git status` danach leer, `site/` unverändert |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien byte-gleich |
| `selftest.mjs` | 127/127 |
| `suchtest.mjs site` | 242/242, JS-Fehler 0 |
| `suchtest.mjs site authoring/tests/suche-ausbau-offen.tsv` | 0/29 (Exit 1, wie vorgesehen für Schritt 3) |
| `sprachtest.mjs site` | 74 bestanden, JS-Fehler 0 |
| `layouttest.cjs` | 240 Seitenzustände, 38 Bedienproben, 2 Abweichungen (2 bekannt, 0 neu; Exit 1 wegen der bekannten) |
| Diff `site/` gegen `main` | 24 HTML-Dateien nur Kennung (`data-puk-site-build`, `?v=r4-76` → `r4-77` an Skript und Stylesheet) und `js/interaktion.js`; dieses ist byte-gleich mit `authoring/js/interaktion.js` |
| Weitere geänderte Dateien | `authoring/tools/contract.js` und `authoring/site.config.json` nur Kennung; Testlisten; Ausnahmenliste; Pendenzendatei; Nachweisordner |

axe-core habe ich nicht wiederholt (nicht im Auftrag; die Änderung berührt kein Markup).

## 3 Code

`git diff origin/main -- authoring/js/interaktion.js`: neue Ziele (`selbstverletzung`), Wortlisten `selfHarmWords`, `signalChildWords`, `negations`, die Anheftung nach `baseGroups()` und in `renderSearch` die Regel `pinsAfterSafetyLead`. Die Beschreibung im PR stimmt, mit diesen Präzisierungen:

| Fall | Verhalten (gemessen) |
|---|---|
| Tötungswort | unverändert (siehe oben) |
| Suizid und Gewalt zusammen | unverändert `suizid, gewalt`; Selbstverletzung und Kinderschutz werden dort **nicht** angeheftet (N848-6) |
| Verneinung | nur das Wort **unmittelbar** vor einem Einzelwort für Selbstverletzung oder Gewalt; Satzzeichen zählen nicht als Grenze, weil `normalized` sie entfernt; **Phrasen** der Gewaltgruppe («angst vor ihm») werden nicht auf Verneinung geprüft; Suizidwörter auch nicht (N848-3) |
| Kinder | `kind`, `kinder`, `kindern`, nicht nach den Schutzwörtern `childGuards` an den zwei Stellen davor; «nicht die Kinder», «kein Kind» zählen als genannte Kinder (N848-5); «meine/unsere Kinder» zählen, «meiner/unserer Kinder» nicht |
| Vorrang | steht in der bisherigen Rangfolge **irgendein** anderer Sicherheitsabschnitt zuoberst, bleibt er dort, auch wenn er nur zufällig oben stand (N848-2) |
| keine normalen Treffer | die angehefteten Abschnitte stehen trotzdem da (gemessen: «Er hört nicht auf. Geschlagen werde ich jeden Abend» r4-76 ohne Treffer, r4-77 Gewaltabschnitt) |
| Seiten | die Suche mit Index gibt es nur auf `suche.html`; jedes Ziel kommt dort genau einmal vor |

## 4 Befunde

### N848-1 · mittel · Suiziddrohung als Druck verliert «Wenn Suizid angesprochen wird»

**Messung.** Ohne Tötungswort, mit «droht mit Suizid/Selbstmord»: Bei 66 Rasteranfragen stand in r4-76 «Wenn Suizid angesprochen wird» (`kommunizieren.html#suizid-angesprochen`) unter den ersten zwei; in r4-77 nur noch bei 36. Die 30 übrigen («er droht mit suizid was kann ich machen», «mein mann droht mit suizid, was kann ich machen?» usw.) rücken auf Platz 3, weil der Suizidabschnitt neu oben steht. Eigene Probe: «Er droht mit Suizid, wenn ich ihn verlasse» r4-76 `fragen#f-verlassen > kommunizieren#suizid-angesprochen`, r4-77 `krise#suizid > fragen#f-verlassen > kommunizieren#suizid-angesprochen`.

**Bewertung.** Für Drohungen als Druck ist dieser Abschnitt der passende; mit Tötungswort steht er nach R25-010 sogar zuerst («Wenn du gehst, bringe ich mich um»: `kommunizieren#suizid-angesprochen > krise#suizid`, unverändert). Ohne Tötungswort verliert die gleiche Lage ihn jetzt aus den ersten zwei. Nicht R34-P01 (das misst Suizid, nicht diesen Abschnitt), aber eine echte Verschlechterung. Das erste Ausnahme-Muster `/./` (jede Anfrage) erlaubt sie ohne Unterscheidung; der Bericht beschreibt die 208 Fälle nur als «Suizid-Signal und ‹was kann ich machen›».

**Vorschlag.** Entscheid Christa Egger: hinnehmen (dann das Muster so benennen) oder bei einem Suizid-Signal zusammen mit «droh…»/«Drohung» den Druck-Abschnitt direkt nach dem Suizidabschnitt anheften. In jedem Fall Muster 1 enger fassen, mindestens `(?!.*droh)`.

**Reproduktion.** `ergebnis/raster-ohne-ausnahmen.txt` (Zeilen mit «droht mit suizid»), `ergebnis/proben-r4-76-r4-77.tsv` Kategorie `S-sig`.

### N848-2 · mittel · Die Vorrang-Regel bewirkt nicht, wofür sie begründet ist, und widerspricht «fest oben»

**Messung.**
- In r4-77 steht bei **807** Rasteranfragen ein nicht angehefteter Sicherheitsabschnitt vor dem angehefteten. In **733** davon ist es der Kinderschutz vor dem Gewaltabschnitt, in **614** ohne «Kind», «Kinder» oder «Kindern» in der Anfrage. Beispiele: «Ich brauche Hilfe, mein Partner schlägt mich», «Gewalt was tun», «schlägt notfall»: zuerst «Bei Eskalation, Gewalt oder fehlender Betreuung». Weitere: 28 × Suizidabschnitt vor Selbstverletzung («selbstverletzung immer wieder», über die Füllwörter aus N836-1), 22 × Gewalt vor Selbstverletzung, 19 × Suizid vor Gewalt.
- **Ohne die Regel** (Experiment: `groups.pinsAfterSafetyLead = true` entfernt, Raster mit leerer Ausnahmenliste gegen r4-76): ebenfalls genau 298 Verdrängungen, gleiche Verteilung. Die Regel verhindert keinen einzigen Rasterfall.
- Das Beispiel des Berichts, «Gewalt gegen Kinder», ergibt mit und ohne Regel `kinder#eskalation > gefahr#gewalt`, weil die Kinderschutz-Anheftung (`childNamed`) es schon löst.

**Bewertung.** Die Regel hält Zufallstreffer der alten Suche oben, deren Ursache r4-77 beheben will (Bericht, Abschnitt 2). Der Auftrag sagt «steht der passende Sicherheitsabschnitt fest oben». Der passende Abschnitt bleibt zwar immer unter den ersten zwei (0 Ausnahmen gemessen), aber für 807 Anfragen nicht oben. Dafür spricht nur: Ein Sicherheitsabschnitt bleibt dort, wo er war, und Kinder als Zeugen («Er schlägt mich vor den Kindern») bekommen den Kinderschutz zuerst. Dagegen: Bei Gewalt unter Erwachsenen steht ein Abschnitt über Kinder an erster Stelle; das Ergebnis hängt an Wörtern wie «hilfe» und «notfall».

**Vorschlag.** Regel streichen. Wo Kinder als Zeugen zuerst gemeint sind, gehört das in die Kinderschutz-Regel, nicht in einen Vorrang für jeden Zufallstreffer. Entscheid Christa Egger (Abwägung der bauenden Sitzung).

**Reproduktion.** `ergebnis/vorrang-faelle.txt` (alle 807), `ergebnis/raster-ohne-vorrang-regel.txt`, `ergebnis/vorrang-mit-ohne.tsv`.

### N848-3 · mittel · Die Verneinungsregel nimmt klaren Ich-Aussagen die neue Anheftung und ist uneinheitlich

**Messung** (r4-76 → r4-77, erste drei):

| Anfrage | r4-76 | r4-77 | angeheftet |
|---|---|---|---|
| Ich will nicht geschlagen werden | kein Sicherheitsabschnitt | gleich | nein |
| Ich möchte nicht bedroht werden | kein Sicherheitsabschnitt | gleich | nein |
| Die Kinder sollen nicht geschlagen werden | kein Sicherheitsabschnitt | gleich | nein |
| Ich will nicht ritzen, aber der Druck ist gross | kein Sicherheitsabschnitt | gleich | nein |
| Ich weiss es nicht, Gewalt gibt es schon lange | kein Sicherheitsabschnitt | gleich | nein (Verneinung über das Komma) |
| Es ist nicht Gewalt, oder doch? | kein Sicherheitsabschnitt | gleich | nein |
| Ich will nicht mehr geschlagen werden | kein Sicherheitsabschnitt | Gewalt zuerst | ja |
| Ich habe keine Angst vor ihm | Gewalt zuerst | gleich | ja (Phrase, keine Prüfung) |
| Ich habe keine Suizidgedanken | Krisenplan zuerst | Suizid zuerst | ja (Suizidwörter ohne Prüfung) |

**Bewertung.** Keine Verschlechterung gegenüber r4-76, also nicht blockierend. Aber genau die ersten vier Zeilen sind klare Ich-Aussagen oder Sorgen von Betroffenen, die der Schritt erreichen soll; «nicht» steht dort vor dem Signalwort, weil Deutsch so verneint («will nicht geschlagen werden»), nicht weil keine Gewalt vorkommt. Die Regel ist zudem zu weit (über Satzzeichen hinweg) und zu eng («nicht mehr», «nicht nur» heften an). Suizidwörter, Phrasen und Einzelwörter werden verschieden behandelt.

**Vorschlag.** Verneinungsregel für Selbstverletzung und Gewalt streichen. Eine unnötige Anheftung kostet einen Platz; eine fehlende kostet die Hilfe. So wäre es auch mit der Behandlung der Suizidwörter einheitlich (siehe Abschnitt 6, letzte Abwägung). Wer die Regel behalten will, sollte sie mindestens auf den Teilsatz begrenzen (Satzzeichen vor `normalized` als Grenze, wie bei `satzende0`) und Modalsätze («will/möchte/soll nicht … werden») ausnehmen.

**Reproduktion.** `proben-2.tsv`, `ergebnis/proben-2-r4-76-r4-77.tsv`; `proben.tsv` Kategorien `V-neg`, `H-neg`, `S-neg`.

### N848-4 · niedrig · Fehltreffer «schlagen … vor»

«Welche Bücher schlagen Sie vor?» r4-76 `kinder#hilfe`, r4-77 `gefahr#gewalt > kinder#hilfe`; «Schlagen Sie Literatur vor» ebenso neu mit dem Gewaltabschnitt zuerst. («Was schlagen Sie vor?» hatte ihn schon in r4-76 zuerst.) Ursache: «schlagen» in der Gewaltgruppe. Harmlos für die Sicherheit, aber ein sichtbarer Fehltreffer. Vorschlag für Schritt 3: «schlagen … vor» im selben Teilsatz nicht als Signal werten. «gewaltfreie Kommunikation», «Herzschlag», «Schlaganfall» heften nicht an.

### N848-5 · niedrig · Verneinte oder ausgenommene Kinder gelten als genannt

«Mein Mann schlägt mich, aber nicht die Kinder»: r4-77 `kinder#eskalation > gefahr#gewalt` (r4-76 `gefahr#gewalt > quellen#schweiz`). «Kein Kind wurde geschlagen»: neu Kinderschutz, dann Gewalt. Kostet dem Gewaltabschnitt Platz 1 bzw. ist ein Fehltreffer; der Gewaltabschnitt bleibt unter den ersten zwei. Vorschlag: «nicht», «kein» als weitere Schutzwörter vor «Kind…».

### N848-6 · Hinweis · Kombinationen mit Suizid und Gewalt bleiben beim alten Paar

«Mein Mann schlägt die Kinder und ich habe Suizidgedanken» und «… und ich will nicht mehr leben»: `krise#suizid > gefahr#gewalt > krise`, kein Kinderschutz unter den ersten drei. «Selbstverletzung, Suizidgedanken, Gewalt»: kein Selbstverletzungsabschnitt unter den ersten drei. Wie in r4-76, also keine Verschlechterung; aber die neue Regel «Kinderschutz vor Gewalt, wenn Kinder genannt sind» gilt dort nicht. Für Schritt 3 vormerken.

### N848-7 · niedrig · Ausnahmen und Testlisten kommen aus dem geprüften Stand

`suchraster.mjs` liest `suchraster-ausnahmen.tsv` und die Testlisten aus dem Arbeitsbaum des PR. Ein PR kann also seine eigenen Verschlechterungen erlauben; die grüne CI belegt hier nur, dass die vier Muster greifen, nicht, dass sie richtig sind. Dazu: Die Muster sollen nach dem Merge entfernt werden; das Raster meldet ungenutzte Ausnahmen nur, es scheitert nicht daran. Bleibt Muster 1 (`/./`) stehen, verdeckt es künftig jeden Verlust von «Wenn Suizid angesprochen wird», sobald der Suizidabschnitt oben steht. Vorschlag: Entfernen als eigene, sofortige Pendenz mit PR; prüfen, ob «Ausnahme ohne Anwendung» die CI scheitern lassen soll. Betrifft das Werkzeug aus #847; die dortige Nachprüfung kann das anders sehen.

### N848-8 · Hinweis · Nachweis der bauenden Sitzung

- Bericht Abschnitt 4: Die Begründung der Vorrang-Regel mit «Gewalt gegen Kinder» trägt nicht (N848-2).
- Die 208 Fälle des ersten Musters enthalten 30 Drohungen als Druck; der Bericht nennt das nicht (N848-1).
- «Nur `authoring/js/interaktion.js`» stimmt für das Verhalten; geändert sind ausserdem die Kennung in `contract.js` und `site.config.json`.
- Alles andere habe ich bestätigt gefunden: 45 605 Anfragen, 298 Verdrängungen in vier Mustern mit 208/68/16/6 Fällen, 0 verloren/leer/Anheftung verloren, 7 655 «Sicherheitsabschnitt neu oben» (Summe der Mengen), die Gates und alle Zeilen der Beispieltabelle in Abschnitt 5 des Berichts.
- Der volle Rasterlauf ist jetzt auch auf GitHub beobachtet (CI zu `ad6eba0`), was der Nachweis zu #847 als offen führte.

## 5 Die vier Ausnahme-Muster

Raster mit leerer Ausnahmenliste (Kopie ausserhalb des Repositorys) gegen r4-76: 298 Verschlechterungen, alle `VERDRAENGT`; mit der Liste des PR: 0. Alle 298 Fälle habe ich nach verlorenem und neuem Abschnitt gruppiert (`ergebnis/raster-ohne-ausnahmen.txt`):

| Muster | Fälle | eng genug? |
|---|---|---|
| 1 `/./`, Verlust Druck-Abschnitt, Ersatz Suizidabschnitt | 208 | **nein.** Gilt für jede Anfrage; deckt die 30 Drohungen als Druck (N848-1). Für diesen Übergang verdeckt es keinen R34-P01-Fall (Tötungswort-Anfragen ändern sich gar nicht, gemessen), wohl aber eine fachliche Verschlechterung |
| 2 ohne «kind/kinder/kindern», Verlust Kinderschutz, Ersatz Gewalt | 68 | ja; Fälle sind Gewalt mit «fu» oder Ähnlichem, wo der Kinderschutz zufällig auf Platz 2 stand |
| 3 ohne Suizid-Teilwörter, Verlust Suizid, Ersatz Selbstverletzung | 16 | ja für diesen Übergang; die Teilwortliste ist breit genug (`leben`, `tod`, `sterb` …). Grenze: «will nicht mehr» ohne «leben» ist nicht ausgeschlossen; im Raster kommt das hier nicht vor |
| 4 ohne Gewalt-Teilwörter, Verlust Gewalt, Ersatz Selbstverletzung | 6 | knapp; «droht» fehlt in der Ausschlussliste, und einer der 6 Fälle enthält «droht» («meine frau selbstverletzung und droht»). Der Gewaltabschnitt stand dort über andere Wörter oben; trotzdem sollte «droh» ausgeschlossen sein |

Kein Muster verdeckt in diesem Lauf einen Verlust nach R34-P01. Das habe ich nicht aus den Mustern geschlossen, sondern aus der Vollauswertung aller 45 605 Anfragen gemessen (Abschnitt 1).

## 6 Abwägungen der bauenden Sitzung · Einschätzung (kein fachlicher Entscheid)

- **Reihenfolge Suizid, Selbstverletzung, Kinderschutz, Gewalt.** Dafür: Die Gefahr für das eigene Leben zuerst, wie R34-P01 und die bisherige Regel für Suizid und Gewalt. Dagegen: Bei akuter Gewalt gegen Kinder kann der Kinderschutz zeitkritischer sein als ein Selbstverletzungsabschnitt; das betrifft nur Anfragen mit Selbstverletzung und Gewalt zugleich, weil Suizid und Gewalt zusammen über die alte Regel laufen. **Einschätzung: vertretbar.**
- **Vorrang eines führenden Sicherheitsabschnitts.** **Einschätzung: streichen** (N848-2).
- **Kinderschutz zuerst auch bei Kind als Täter** («Mein Kind schlägt mich»: Kinderschutz, dann Gewalt, wie in r4-76). Der Kinderschutzabschnitt behandelt Kinder, die «psychische Belastung oder Konflikte miterleben» und geschützt werden müssen; die angegriffene Person ist hier der Elternteil, für den der Gewaltabschnitt passt. Dagegen spricht wenig, solange beide unter den ersten zwei stehen; Risiko gering. **Einschätzung: fachlich klären (N836-4), für diesen Schritt nicht blockierend.** «Mein Sohn/meine Tochter schlägt mich» ergibt Gewalt zuerst, die Regel ist also schon heute uneinheitlich.
- **Verneinte Suizidwörter heften an** («Ich habe keine Suizidgedanken», «Ich habe nicht keine Suizidgedanken», «Er hat nie einen Suizidversuch gemacht»: Suizidabschnitt zuerst). Der Bericht nennt das eine Schwäche. **Einschätzung: eher richtig so.** Wer auf einer Seite für Angehörige «Suizid» eintippt, auch verneint, ist mit dem Suizidabschnitt an erster Stelle nicht falsch bedient; ein Fehler kostet einen Platz. Folgerichtig wäre, auch für Selbstverletzung und Gewalt auf die Verneinung zu verzichten (N848-3).

## 7 Testlisten

- Die sieben neuen Zeilen in `suche-ersttreffer.tsv` prüfen das, was die Regel tun soll: Suizid-Signal, Überdosis, wiederholte Gewalt, Kinder als Betroffene (zweimal, Reihenfolge Kinderschutz > Gewalt), Selbstverletzung, «der Vater meiner Kinder» (Schutzwort). Die Ergebnisse kommen aus der Anheftung, nicht aus Punktwerten; sie legen also nichts Zufälliges fest. Die zwei aus `suche-ausbau-offen.tsv` übernommenen Zeilen sind erfüllt und gehören jetzt in die feste Liste. **Sinnvoll.**
- r4-76 erfüllt 235 der 242 (gemessen: `suchtest.mjs` mit der Testliste des PR gegen `site/` von `451b20f`; genau die sieben neuen Zeilen weichen ab).
- Lücke: Keine Zeile prüft, dass eine Tötungswort-Anfrage gleich bleibt, wenn zusätzlich ein neues Signalwort vorkommt (z. B. Selbstverletzung), und keine die Verneinung oder den Vorrang. Für Verneinung und Vorrang empfehle ich das bewusst erst nach dem Entscheid zu N848-2 und N848-3.

## 8 Pendenzendatei (Stand PR-Kopf)

- **Zitierregel eingehalten.** Im neuen Abschnitt «r4-77» und im geänderten Kopf stehen keine Suchproben, die ein Töten, eine Suizidabsicht oder eine Gewalttat ausdrücken; Guillemets nur um Auftrag, Antwort, Status und Kennungen.
- **#847:** gemergt als `451b20f` am 26.11.2026, 23:05:45 UTC (GitHub `merged_at`, geprüft); Kopf `0259793`; so steht es im Abschnitt «Suchraster». Status r4-77 «Entwurf, nicht gemergt» stimmt (geprüft am Ende dieser Prüfung).
- Der Abschnitt nennt die Abwägungen als offen für Christa Egger und das Entfernen der Muster als Pendenz; die Befunde N848-1 bis N848-3 gehören zu diesen Entscheiden dazu.

## 9 Grenzen

- Gemessen in Chromium (Playwright aus `/opt/borderline-browser`), lokal gegen die Dateien von `451b20f` und `ad6eba0`, nicht gegen die Live-Website (PR nicht gemergt). Keine echten Geräte, keine Screenreader.
- Das Raster und meine Proben vergleichen nur die ersten zwei bis sechs Treffer. Was ab Platz 7 passiert, ist nicht gemessen.
- Die Proben sind meine Auswahl (281 eigene, alle im Wortlaut in `proben.tsv` und `proben-2.tsv`); Mundart nur in sechs Beispielen, ohne Unterschied zu r4-76.
- Keine fachliche Prüfung der Abschnittsinhalte; die Einschätzungen in Abschnitt 6 sind keine Freigabe.
- Das Suchraster selbst (#847) habe ich nur so weit geprüft, wie es diese Messung betrifft (N848-7).

## 10 Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
git worktree add /tmp/pr ad6eba0
mkdir -p /tmp/r476 && git archive 451b20f site | tar -x -C /tmp/r476
cd /tmp/pr
node authoring/tools/build.mjs --production --out=site --write-site && git status --porcelain
node authoring/tools/build.mjs --production --verify-site
node authoring/tools/selftest.mjs
node authoring/tools/suchtest.mjs site
node authoring/tools/suchtest.mjs site authoring/tests/suche-ausbau-offen.tsv
node authoring/tools/sprachtest.mjs site
node authoring/tools/layouttest.cjs
node authoring/tools/suchraster.mjs /tmp/r476/site site
# Raster ohne Ausnahmen, Vollauswertung, Vorrang-Experiment: werkzeug/auswertung.md
# eigene Proben:
node <nachweisordner>/werkzeug/probe.cjs /tmp/r476/site site <nachweisordner>/proben.tsv /tmp/proben-aus.tsv
```
