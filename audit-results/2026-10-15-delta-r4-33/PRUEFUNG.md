# Unabhängige Prüfung r4-33

| | |
| --- | --- |
| Gegenstand | Website «Borderline – Orientierung für Angehörige» (Fachstelle Angehörigenarbeit PUK), Entwurf r4-33 |
| Stand | Branch `claude/r4-33-suche-codex-1792093748`, Commit `ca2a601`, auf `origin` gleich. Abgezweigt von `main` `4790653` (Merge von #694, Stand `37b963f`). Übernommen sind `975c02f` (inhaltlich gleich `ea8dc1a`) und `20b93ae` (meine Nachprüfung `5de69c8`, unverändert) |
| Diff zu `main` | <br>• `authoring/js/interaktion.js`: Korrektur von #694 und Variante Q. <br>• Testliste: +12, jetzt 209. <br>• Build und Assetversion r4-33, `independentReview` «ausstehend», `reviewScope`. <br>• Neu `2026-10-15-delta-r4-33/FREIGABE.md`; in `2026-10-15-delta-r4-32/FREIGABE.md` die Nachträge 3 und 4; Pendenzen. <br>• `site/` gleich `main`, also gleich der Produktion r4-32 (`37b963f`) |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d33a`, verglichen mit der Produktion (`site/` = `37b963f`) und meinen Nachbildungen |
| Massstab | Kriterien aus der Prüfung von r4-32; R31-P03 gegenüber der Produktion `37b963f` |
| Prüfsitzung | unabhängig, hat r4-33 nicht gebaut. Code und Inhalt sind unverändert. Auf Auftrag ist nur diese Datei committet. Probenlisten liegen nicht im Repository |
| Zeitpunkt | 15.10.2026, etwa 21:50 bis 22:00 MESZ |

## Ergebnis

**Freigabefähig.** r4-33 enthält genau die geprüfte Korrektur von #694 und Variante Q. Alle Abgleiche laufen ohne Abweichung durch. Gegenüber der Produktion ändern sich nur die neun beabsichtigten Anfragen. Keine Suizidsorge geht auf Gewalt, und keine Anfrage verliert ihren Treffer.

**`independentReview` kann auf «bestaetigt» gesetzt werden.** Die Bestätigung gilt für den Inhalt von `ca2a601`. Ändern sich danach Code, Testliste oder Seiteninhalt, braucht es einen neuen Abgleich; reine Nachweis-Nachträge sind davon nicht betroffen.

## Ergebnis je Punkt

| Punkt | Ergebnis | Beleg |
| --- | --- | --- |
| Code | **erfüllt** | `authoring/js/interaktion.js` ist bytegleich mit meiner Nachbildung `d32/varQ/site/js/interaktion.js`. `dist/d33a` unterscheidet sich von `d32/varQ/site` nur im Buildmarker r4-32 → r4-33. `975c02f` hat in `authoring/` denselben Inhalt wie `ea8dc1a`. |
| Suchtest | **erfüllt** | `suchtest.mjs dist/d33a`: «Suchtest: 209 von 209 Erwartungen wie festgeschrieben · JS-Fehler 0», Exit 0. Gegenprobe auf der Produktion (`site/`): 203 von 209. Die 6 Abweichungen sind die Codex-Zeilen und «… Sorgen um sie» ohne Komma. Die R32-03-Zeilen bestehen dort schon. |
| Abgleich mit meinen Nachbildungen | **erfüllt, ohne Abweichung** | Neu im Browser abgefragt: <br>• 885 Proben bytegleich mit `d32/p_P.tsv`. <br>• `q-r32a`, `q-edge`, `harmlos.q` und `cx694.q` bytegleich mit `d32/ea_*.tsv`. <br>• `q-r32c` und `q-r32d` bytegleich mit `d32/Q2_*.tsv`. <br>0 JS-Fehler. |
| Gegen die Produktion `37b963f` | **erfüllt** | Über 885 + 15 + 19 + 21 + 11 + 11 + 4 Proben unterscheiden sich die ersten drei Treffer nur bei den 9 Anfragen, die `FREIGABE.md` nennt: <br>• 8 Codex-Fälle bekommen Suizid und Gewalt angeheftet; vorher hatten sie keinen Treffer, «Riskantes Verhalten» oder «Vertrauensperson». <br>• «die Therapie bringt nichts ich mache mir Sorgen um sie» geht von Gewalt › Suizid auf `behandlung#rollen`, wie in r4-31. <br>Keine Anfrage verliert ihren Treffer. Neu mit Gewalt zuerst stehen nur Drohungen anderer («Mein Mann bringt mich heute Nacht in unserer Wohnung um», «Er tötete mich fast», «Du tötest mich», «Sie brachten ihn um»). Suizid fällt nur beim harmlosen Satz aus den ersten drei. Nach R31-P03 (beide Lesarten) verschlechtert r4-33 also nichts. |
| Produktionsbuild | **erfüllt** | 23/23 Seiten `data-puk-site-build="r4-33"`, 46 × `?v=r4-33`, CSS-Kopf und `BUILD` r4-33, `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive ca2a601`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d33a` (SHA-256 von 34 Dateien gleich). |
| `FREIGABE.md` r4-33 | **richtig** | Die Zeiten stimmen mit `gh api` überein: «@codex review» um 19:28:46, Review um 19:32:24, Merge um 19:32:36 UTC durch `christaegger-dot`, Merge-Commit `4790653`. Ebenso der Umfang, «209 Anfragen, 12 davon neu» (197 + 12), die Vergleichstabelle und die neun Änderungen. Der Merge ist offen benannt, R28-O01 und R29-P20 als nicht eingehalten. |
| Nachtrag 4 r4-32 und Pendenzen | **richtig** | Nachtrag 4 stellt den Merge, den veröffentlichten Stand und die überholten Sätze von Nachtrag 3 richtig dar. In den Pendenzen sind der Abschnitt «r4-32 veröffentlicht, nicht nachgeprüft» und R32-P01 eingetragen. |

## Hinweise

- **Dringlichkeit:** In der Produktion (r4-32) hat «Mein Mann bringt mich heute Nacht in unserer Wohnung um» weiterhin keinen Treffer, und «die Therapie bringt nichts ich mache mir Sorgen um sie» heftet Gewalt an. Beides behebt r4-33.
- **Merge-Regel:** Bei #689 und #694 wurde jeweils innerhalb von Sekunden nach dem Codex-Review gemergt. Ich empfehle, im nächsten Pull Request den Merge ausdrücklich der bauenden Sitzung nach geprüftem Review zu überlassen oder ihn technisch zu sperren, etwa mit einer Branch-Regel, die ein bestandenes Review verlangt. Die Entscheidung liegt bei der Auftraggeberin.
- **Produktionsprüfung:** Die Produktionsprüfung von r4-32 ist offen. Zusammen mit r4-33 sollte sie in der Produktion von Hand bestätigen, dass Suizid und Gewalt oben stehen. Dazu gehören der Codex-Fall, eine Anfrage mit Kindern, eine mit «Wenn Suizid angesprochen wird» und ein harmloser Satz mit «bring… um» (`suchtest.mjs` läuft nicht gegen Pretty URLs, R31-P01).
- **Weiter offen:** R32-P01 (Sohn und Tochter) und die Bestätigung der Lesart von R31-P03. Beides entscheidet die Auftraggeberin.

## Vor dem Merge

1. Export und Prüfung, dass `site/` bytegleich mit dem Produktionsbuild ist.
2. Pull Request von diesem Branch.
3. Codex-Review auf dem exportierten Kopf und dessen Prüfung nach R31-P03 (R28-O01, R29-P20).
4. Erst dann der Merge.

## Belege

Im Scratchpad der Prüfsitzung (`/tmp/claude-0/-home-claude-borderline-angehoerige/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/`), nicht im Repository:

- `d33/suchtest-ca2a601.txt`, `d33/suchtest-37b-on-209.txt`.
- `d33/ca_*.tsv` (`ca2a601`), `d33/prod_*.tsv` (Produktion `37b963f`).
- `d33/prodcopy/`, `d33/prod-a.log`, `d33/d33a.sha`, `d33/prod.sha`.
- Referenzen `d32/p_P.tsv`, `d32/ea_*.tsv`, `d32/Q2_*.tsv`.
- Entwurf: `/home/claude/borderline-angehoerige/dist/d33a` (von `.gitignore` erfasst).

## Nachprüfung Codex #695 (Stand 8f605a8)

| | |
| --- | --- |
| Stand | Branch `claude/r4-33-suche-codex-1792093748`, Commit `8f605a8`, auf `origin` gleich. Diff zu `ce56c1d`: `authoring/js/interaktion.js` (zweistufiges `particleUm`, Kinder nach gebeugter Form, neue Formen), `suchtest.mjs` («!sicher»), Testliste (jetzt 214), `independentReview` «ausstehend», `FREIGABE.md` (Nachträge 1 und 2). `site/` ist `ce56c1d` und bytegleich mit meinem `dist/d33a` |
| Prüfobjekt | eigener Entwurf `node authoring/tools/build.mjs --out=dist/d33b`, verglichen mit r4-32 (`37b963f`), `ce56c1d` und meiner Nachbildung R (unten) |
| Zeitpunkt | 15.10.2026, etwa 22:00 bis 22:25 MESZ |

### Heikel, vorab: #695 ist gemergt, und die Produktion ist r4-33 auf Stand `ce56c1d`

Laut `gh api`:

- #695 wurde um 19:59:16 UTC als Entwurf eröffnet. Das Codex-Review kam um 20:05:31 UTC.
- Um 20:06:22 UTC setzte `christaegger-dot` den Entwurf auf «ready for review» und mergte ihn um **20:06:30 UTC** (Merge-Commit `7bd5e6a`, Kopf `ce56c1d`). Das war eine Minute nach dem Review und vor dessen Prüfung.
- Um 20:06:35 UTC wurde der Branch gelöscht. Danach wurde er mit `8f605a8` neu angelegt.

Die öffentliche Seite trägt `r4-33`, und ihr `interaktion.js` ist bytegleich mit `ce56c1d` (per GET gelesen, 20:18 UTC). Damit gilt:

- Die Aussagen «#695 ist weiter ein Entwurf» (Auftrag) und «#695 bleibt bis dahin ein Entwurf» (Nachtrag 2) stimmen nicht. Auch die Sicherung über den Entwurf aus Nachtrag 1 hat den Merge nicht verhindert.
- R28-O01 und R29-P20 sind zum dritten Mal nicht eingehalten (#689, #694, #695).
- **Die drei blockierenden Rückschritte aus Nachtrag 2 sind seit 20:06 UTC in der Produktion:** «Er bringt mich wenn ich ihn verlasse um», «Mein Mann bringt mich um sie sieht es» und «Er bringt mich und auch die Kinder um». `8f605a8` behebt sie. Die Korrektur ist deshalb dringend.
- Für den nächsten Pull Request braucht es nach `CLAUDE.md` einen neuen Branch-Namen. Ich empfehle der Auftraggeberin dringend eine Branch-Regel auf `main`, die den Merge technisch sperrt, bis das Codex-Review geprüft ist; der Entwurf allein reicht nicht.

### Ergebnis

**Freigabefähig mit Auflagen.** Die drei Rückschritte und die vier übrigen Codex-Befunde sind behoben. Die Garantie «Nahbereich = Produktion r4-32» hält im Code, und die 971 Proben bestätigen sie. Die neue Vorwärtssuche bei Kindern macht aber aus einer Ich-Aussage zum Suizid eine Kinder-Anfrage, wenn danach ein neuer Satz mit «die Kinder» folgt (R33-01). Gegenüber beiden Produktionsständen steht Suizid dann nur noch an dritter Stelle. Meine Nachbildung R behebt das mit einer Zeile, ohne eine der 971 Proben zu ändern.

**`independentReview` kann noch nicht auf «bestaetigt» gesetzt werden.** Das geht, sobald R oder Gleichwertiges umgesetzt ist und der Abgleich unten ohne Abweichung durchläuft.

| Punkt | Ergebnis | Beleg |
| --- | --- | --- |
| Garantie «Nahbereich = Produktion» im Code | **hält gegenüber `37b963f`** | `particleNear` hat dieselbe Schleife wie `particleUm` in `37b963f`: sechs Wörter, Abbruch bei `satzende0`. Die Bedingung für das Folgewort «particleNext oder sie oder ihr» deckt genau das alte `particleNext` ab. `particleUm` gibt einen Treffer im Nahbereich unverändert zurück. Die Erweiterung trifft dasselbe erste «um» und ist dort strenger. Sie kann also nur etwas hinzufügen, was die Produktion nicht erkennt, und nichts ablehnen, was die Produktion erkennt. `killWords` und `separableVerbs` sind Obermengen der Produktion. |
| Suchtest | **erfüllt** | `suchtest.mjs dist/d33b`: «214 von 214 Erwartungen wie festgeschrieben · JS-Fehler 0», Exit 0. Auf `37b963f`: 207 von 214; die 7 Abweichungen sind Verbesserungen. |
| 971 Proben (`all33.q`) | **erfüllt** | Meine Läufe auf `37b963f`, `ce56c1d` und `8f605a8` sind bytegleich mit `all33_p32.tsv`, `all33_r33a.tsv` und `all33_r33b.tsv`. Gegenüber `37b963f` sind 12 anders, alles Verbesserungen: 10 neu angeheftet, 0 Anheftungen verloren, 0 Treffer verloren, Suizid fällt nie aus den ersten drei. Gegenüber `ce56c1d` sind 9 anders: die 7 Codex-Fälle, «er tötet die Kinder» und «… Sorgen um sie» ohne Komma (wieder angeheftet wie in r4-32, als Preis dokumentiert). |
| Subjekt als Grenze | **kein Fehler gegenüber `37b963f`** | Die Grenze wirkt nur in der Erweiterung, also über sechs Wörter. Erkannt bleibt «Mein Mann bringt mich irgendwann einmal in unserem Haus ganz sicher um». Gegenüber der jetzigen Produktion `ce56c1d` geht aber eine Anheftung verloren: «Er bringt mich nach dem Streit in der Küche er sagt es um» → kein Treffer (`ce56c1d`: Gewalt, `37b963f`: kein Treffer). Der Satz ist konstruiert, und r4-32 erkannte ihn auch nicht. |
| Vorwärtssuche bei Kindern | **Befund R33-01** | Richtig: «Er tötete die Kinder», «er tötet die Kinder» → Kinder › Gewalt › Suizid. «er tötet mich und die Kinder schauen zu» → Kinder zuerst ist vertretbar. Falsch: siehe R33-01. |
| Produktionsbuild | **erfüllt** | 23/23 Seiten r4-33, 46 × `?v=r4-33`, `node --check` ohne Fehler, 0 `tel:`. In einer Kopie (`git archive 8f605a8`) blockiert «ausstehend» (Exit 1). Mit «bestaetigt»: «23 Seiten · 0 Blocker · 0 Hinweise», bytegleich mit `dist/d33b` (SHA-256 von 34 Dateien gleich). |
| Nachtrag 2 | **inhaltlich richtig, eine falsche Aussage** | Befunde, Werte, Ursache, Korrektur und Zahlen stimmen mit `gh api` und meinen Messungen überein. Falsch ist nur «#695 bleibt bis dahin ein Entwurf»; siehe oben. |

### Befund

| ID | Priorität | Befund | Belege (r4-32 `37b963f` / Produktion `ce56c1d` → `8f605a8`) |
| --- | --- | --- | --- |
| R33-01 | **wichtig, Auflage vor dem Export** | Die neue Suche nach `finiteKill` geht bis zu vier Wörter weiter über Pronomen, Artikel und «und». Sie trifft dadurch auch «die Kinder» als Subjekt eines neuen Satzes nach einer Ich-Form. Eine Suizidaussage beginnt dann mit Kinder › Gewalt, Suizid steht an dritter Stelle. Nach der Lesart der bauenden Sitzung bleibt Suizid unter den ersten drei, also kein Rückschritt. Nach der wörtlichen und nach der von mir empfohlenen Lesart («Suizid unter den ersten zwei, ausser bei Kindern als Betroffenen») ist es einer. Entscheid (2) deckt den Fall nicht, denn das ist kein erweiterter Suizid. | <br>• «ich töte mich und die Kinder wissen nichts davon»: Suizid / Suizid → **Kinder › Gewalt › Suizid**. <br>• «ich töte mich die Kinder sind bei meiner Mutter»: Suizid / Suizid → **Kinder › Gewalt › Suizid**. |

**Hinweise:**

- **Kein Fehler, gleich wie r4-32:** «ich bringe mich um die Kinder sind versorgt» (ohne Satzzeichen) wird nicht als Tötungswort erkannt, weil «um» vor einem Artikel steht. Der erste Treffer ist «Geschwister». Das war in r4-32 und ist in `ce56c1d` genauso; ein Fall für eine spätere Runde.
- **Wieder angeheftet:** «Er bringt die Kinder und zieht sich um» bekommt im Nahbereich wieder «Wenn Suizid angesprochen wird» angeheftet, genau wie in r4-32 (`ce56c1d`: keine Anheftung). Das ist der Preis der Garantie, wie «… Sorgen um sie».

### Vorschlag: Variante R (nur nachgebildet, nicht umgesetzt)

Gepatcht in einer Kopie von `dist/d33b` (`d33/varR/site/js/interaktion.js`, Diff in `d33/varR.diff`). In `childVictim` läuft die Vorwärtssuche nach einer gebeugten Form nicht, wenn «ich» bis zu drei Wörter vor dem Verb oder direkt danach steht («ich töte mich …», «töte ich mich …»).

Ergebnis:

- Suchtest 214 von 214, 0 JS-Fehler.
- Die 971 Proben sind 971/971 gleich wie `8f605a8`.
- Die beiden R33-01-Sätze gehen wieder auf Suizid › Gewalt, wie in beiden Produktionsständen.
- Gleich bleiben «Er tötete die Kinder» und «er tötet die Kinder» (Kinder zuerst) sowie «Er bringt mich und auch die Kinder um» (Kinder zuerst, über die Rückwärtssuche).
- **Preis:** «ich töte mich und die Kinder» geht wieder auf Suizid › Gewalt wie in beiden Produktionsständen, nicht auf Kinder zuerst. Die Form mit Infinitiv («ich will mich und die Kinder umbringen») bleibt bei Kinder zuerst.

**Für den Export:**

1. R oder Gleichwertiges umsetzen.
2. In die Testliste aufnehmen:

   | Anfrage | Erwartung |
   | --- | --- |
   | «ich töte mich und die Kinder wissen nichts davon» | `krise.html#suizid > grenzen.html#gewalt` |
   | «er tötet die Kinder» | `kinder.html#eskalation > grenzen.html#gewalt > krise.html#suizid` |

3. Danach mechanisch prüfen:
   - Suchtest 100 %.
   - `all33.q` gleich `d33/all_R.tsv`.
   - `d33/q-r33b.txt` gleich `d33/b_R.tsv`.
   - Produktionsbuild in einer Kopie bytegleich.

Dann kann `independentReview` gesetzt werden. Danach kommen:

1. ein neuer Pull Request auf einem neuen Branch;
2. das Codex-Review auf dem exportierten Kopf und dessen Prüfung;
3. erst dann der Merge, möglichst technisch gesperrt bis dahin (siehe oben).

Massstab ist R31-P03 gegenüber der Produktion. Die Auftraggeberin sollte festlegen, ob die Garantie weiter an `37b963f` hängt oder an der jetzigen Produktion `ce56c1d`. Für `ce56c1d` spricht der Wortlaut von R31-P03. Dagegen spricht, dass `ce56c1d` die drei blockierenden Rückschritte enthält. Ich empfehle `37b963f`. Die Abweichungen gegenüber `ce56c1d` (zwei Anheftungen weniger oder mehr, siehe oben) sind dann bewusst hingenommen.

**Belege (Scratchpad der Prüfsitzung, `d33/`):** `suchtest-8f605a8.txt`, `suchtest-37b-on-214.txt`, `suchtest-varR.txt`; `all_prod.tsv`, `all_ce5.tsv`, `all_neu.tsv`, `all_R.tsv` (971 Proben); `q-r33b.txt` mit `b_*.tsv`; `sce5/site` (`ce56c1d`); `varR/`, `varR.diff`; `prodcopy2/`, `prod2-a.log`, `d33b.sha`, `prod2.sha`. Entwurf: `/home/claude/borderline-angehoerige/dist/d33b` (von `.gitignore` erfasst).
