# Härtung des Suchrasters · Nachweis

**Auftrag:** Die Nachprüfung des Suchrasters ([PR #849](https://github.com/christaegger-dot/borderline-angehoerige/pull/849)) stellte fest, dass das Raster falsch bestehen kann (N847-2 bis N847-5). Im Dialog mit der bauenden Sitzung entschied Christa Egger am 27.11.2026 die Reihenfolge der nächsten Arbeit. Ihre Antwort lautete «Raster härten, dann r4-78». Die Frage dazu war: «Zuerst N847-2 bis N847-5 beheben (ändert die Website nicht). Danach prüft das gehärtete Raster r4-78. Jeder Schritt bekommt eine Nachprüfung vor dem Merge.»

**Ändert die Website nicht.** Geändert sind:
- `authoring/tools/suchraster.mjs`;
- `authoring/tests/suchraster.json`, `suchraster-proben.txt` und `suchraster-ausnahmen.tsv`;
- `.github/workflows/verify-authoring.yml`;
- die Pendenzendatei.

**Wer:** die Sitzung, die r4-74 bis r4-77 und das Suchraster gebaut hat. Das ist keine unabhängige Prüfung. Die Nachprüfung vor dem Merge folgt in einer eigenen Sitzung.

## 1 Was sich ändert

| Befund | Umsetzung |
|---|---|
| **N847-2** Der PR prüft sich mit seinen eigenen Regeln | Die CI lässt das Raster zweimal laufen. Der Job `suchraster` (Matrix) nutzt in der Variante `werkzeug-der-basis` **Werkzeug, Rasterdefinition und Proben der Basis**, in der Variante `werkzeug-des-pr` die des Pull Requests. Beide müssen bestehen. Ein PR, der Werkzeug oder Proben abschwächt, besteht den ersten Lauf nicht. **Den Workflow selbst bringt der PR mit** (N855-2); deshalb lässt jede Änderung unter `.github/workflows/` den Job `suchraster-ausnahmen` scheitern. Ausnahmen kommen in beiden Läufen aus dem PR. **Jede neue Zeile in `suchraster-ausnahmen.tsv` lässt den neuen Job `suchraster-ausnahmen` scheitern**: Sie braucht den Entscheid von Christa Egger und eine Nachprüfung vor dem Merge. Der Job zeigt in der Step-Summary auch an, ob Werkzeug oder Rasterdaten geändert sind. Ausnahmen haben eine neue Spalte **Bezug** (Versionskennung). Bei einem anderen Bezug sind sie veraltet und lassen den Lauf scheitern, bis sie entfernt sind. Abgelehnt werden Muster, die eine beliebige Anfrage treffen (leer, «x», ein neutraler Satz). Eine Ausnahme deckt **höchstens 100 Anfragen**. **Jede erlaubte Anfrage steht einzeln** in `ERGEBNIS.txt` und in der Step-Summary (bis 200), das Ergebnis ist als Artefakt hochgeladen. Mit `--ungenutzt-scheitert` (Variante `werkzeug-des-pr`) lässt eine Ausnahme ohne Anwendung den vollen Lauf scheitern. |
| **N847-3** Anfragen ausserhalb des Rasters | Es gibt 11 weitere Handelnde: Ehemann, Ehefrau, Stiefvater, Mama, Papa, Nachbar, Oma, Opa, Grossmutter, Grossvater und «jemand». Die Menge «saetze» wächst damit von 23 328 auf 37 584 Anfragen, «ichRahmen» von 4 590 auf 7 290. Neu ist die Probengruppe **ZR** mit 31 Satzformen, die dem Raster fehlten: Methoden, Waffen, sexualisierte Gewalt, Grosseltern und Notrufnummern. Grundsatz im Werkzeugkopf: Jede neue Suchregel bringt ihre Proben ins Raster mit. |
| **N847-4** Blind für die Darstellung | Treffer zählen nur, wenn sie **sichtbar** sind, und zwar **in der Reihenfolge auf dem Bildschirm** (nach N855-1, siehe Abschnitt 4). Die **Leermeldung** ist ein eigener Prüfpunkt. Ein Sicherheitslink oder der Link zur Schnellorientierung, den sie im Bezug sichtbar zeigt, muss im Prüfstand sichtbar bleiben (Verlust `LEERMELDUNG:<Link>`). Die Abkürzung «Suche unverändert» vergleicht jetzt auch **alle Dateien unter `css/`**. |
| **N847-5** Rang 1 → 2 und Rang 3 | Es gibt zwei neue Kriterien. **RANG1**: Der Suizidabschnitt steht im Bezug zuoberst, im Prüfstand nicht. **RANG3**: Der Bezug hat einen Sicherheitsabschnitt nur auf Rang 3, der Prüfstand keinen in den ersten drei. Beide gelten für alle Anfragen, nicht nur für solche mit Tötungswort. |
| **N847-6** Anheftung aus `queryGroups` | Als angeheftet zählt ein Abschnitt nur, wenn `queryGroups` ihn anheftet **und** er sichtbar unter den ersten «Anzahl Anheftungen + 1» Treffern steht. |
| **N847-7** CI | Beide Jobs haben `timeout-minutes: 30`, der Job für Ausnahmen 5. Das Raster ist ein eigener Job und läuft parallel zu `build-and-compare`. Bei `workflow_dispatch` läuft es weiterhin nicht. Der Pfadfilter bleibt; er gehört zum offenen Entscheid über eine erforderliche Prüfung. |
| **N847-8** nur gegen die Basis | Die Variante `fester-bezug-r4-73` vergleicht mit dem festen Stand r4-73 (`3764d45`), ohne Ausnahmen und **ohne zu blockieren** (`--nur-bericht`). Sie zeigt in der Step-Summary, ob sich Verluste über mehrere PRs summieren. |
| **G846-2** Abdeckung | Für die Menge «saetze» meldet das Werkzeug je Thema den Anteil der Sätze, bei denen der passende Sicherheitsabschnitt unter den ersten zwei steht, für Bezug und Prüfstand. Definition wie `abdeckung.cjs` der Gegenprüfung #846: Suizid → `krise#suizid`, Selbstverletzung → `krise#selbstverletzung`, Gewalt → `gefahr#gewalt` oder `kinder#eskalation`. Das ist nur ein Bericht. |

**Nebenbefund Laufzeit:** Beide Seiten des Vergleichs liefen bisher im selben Renderer-Prozess, weil beide Server auf 127.0.0.1 laufen, also auf derselben Site. Sie liefen damit nacheinander, nicht gleichzeitig. Jetzt bekommt jeder Stand einen eigenen Browserkontext. Das halbiert die Zeit (Einzelproben: 20 s → 10 s) und gleicht die zusätzlichen Anfragen und die Prüfung der Sichtbarkeit weitgehend aus.

## 2 Messungen

Die Stände entstehen über `git archive <commit> site`: r4-73 `3764d45`, r4-75 `e8efa78`, r4-76 `b529695`, r4-77 `9d3b7d4`. Die Konstruktionen sind die Diffs der Nachprüfung #849 gegen r4-76. Reproduktion: `werkzeug/konstruktionen.sh`. Ergebnisse: `ergebnis/`.

| Fall | Altes Raster (Nachprüfung #849) | Gehärtetes Raster |
|---|---|---|
| K1: Stylesheet blendet den Suizidtreffer und die Sicherheitszeile der Leermeldung aus | 0, Abkürzung «Suche unverändert» | **313 Verschlechterungen** (Proben): 230 verloren, 70 verdrängt, 232 Suizid nicht mehr zuoberst, 157 Anheftung verloren, 59 leer; Leermeldung: Sicherheitslink verloren |
| K2: Leermeldung ohne Sicherheitszeile | 0 | **1** (Leermeldung: Link zur Schnellorientierung verloren) |
| K3: neue Synonymgruppe für Grosseltern | 0 (171 Verschlechterungen ausserhalb des Rasters) | **474 Verschlechterungen** in «saetze», davon 143 Suizid nicht mehr zuoberst |
| K5: Anheftung in der Darstellung abgeschaltet | 5 687, aber «Anheftung verloren 0» | **157 Anheftung verloren** (Proben), dazu 118 verloren und 39 verdrängt |
| K9: Anheftung in umgekehrter Reihenfolge (Gewalt vor Suizid) | 1 089 von 5 687 geänderten gemeldet | Proben: **86 Suizid nicht mehr zuoberst**, 44 verdrängt (130 von 157 geänderten) |
| K6: elf Ausnahmen `/./` im alten Format, r4-76 → r4-76 | (r4-73 → r4-75: bestanden) | **scheitert**: «Ausnahme unvollständig (sechs Spalten nötig)» |
| K6b: dieselben elf Muster mit Bezug r4-73, r4-73 → r4-75 | bestanden, «als Ausnahme erlaubt 44» | **scheitert**: 11 × «Ausnahme zu breit», 44 Verschlechterungen |
| K6c: Ausnahme mit Bezug r4-75, Bezug r4-76 | – | **scheitert**: «Ausnahme veraltet … Entfernen.» |
| Unverändert (r4-77 → r4-77), neues und altes Werkzeug | 0 | 0 (Abkürzung, jetzt mit `css/site.css`) |

**Gegenprobe r4-76 → r4-77 ohne Ausnahmen:** 62 863 Anfragen in 553 s lokal (4 Kerne). Ergebnis: **428 Verschlechterungen, alle VERDRAENGT** (Sätze 282, ichRahmen 140, Proben 5, Tippen 1). Verdrängt wurde der Abschnitt «Wenn Suizid angesprochen wird» (Platz 2 → 3), und zwar 298-mal durch den Suizidabschnitt, 108-mal durch den Gewaltabschnitt und 22-mal durch den Selbstverletzungsabschnitt. Keinen Fall gab es bei verloren, RANG1, RANG3, Anheftung, leer und Leermeldung. Mit 45 605 Anfragen und dem alten Raster waren es 298. Die zusätzlichen Fälle kommen aus den neuen Handelnden. Das bestätigt N848-1, das in r4-78 behoben wird (Entscheid «Druck-Abschnitt anheften»). Liste: `ergebnis/r4-76-r4-77-ohne-ausnahmen.txt`.

**Abdeckung** auf den 37 584 Sätzen:

| Thema | r4-76 | r4-77 |
|---|---|---|
| Suizid | 43,7 % | 67,5 % |
| Selbstverletzung | 27,6 % | 36,8 % |
| Gewalt | 45,0 % | 72,3 % |

Die Werte entsprechen der Messung auf 23 328 Sätzen in #850 (Suizid 45,2 → 67,7, Selbstverletzung 28,4 → 37,7, Gewalt 46,6 → 72,6).

**Gates:**
- `--write-site`: 24 Seiten, 0 Blocker, 20 Hinweise; `site/` unverändert.
- `--verify-site`: 35 Dateien byte-gleich.
- Selbsttest 127/127.
- Suchtest 242/242.

## 3 Grenzen

- **Eigene Prüfung der bauenden Sitzung.** Die Konstruktionen stammen von der Nachprüfung #849. Neue Umgehungen hat diese Sitzung nicht systematisch gesucht. Das ist Aufgabe der Nachprüfung.
- **Ausnahmen bleiben eine menschliche Entscheidung.** Der Job `suchraster-ausnahmen` macht neue Ausnahmen und Änderungen am Workflow rot und sichtbar. Ob eine Ausnahme richtig ist, entscheidet er nicht. Ein Muster lässt sich auf mehrere Zeilen aufteilen. Dann bleiben die Höchstzahlen, die Liste aller erlaubten Anfragen und der rote Job.
- **Erster Lauf:** In diesem PR läuft die Variante `werkzeug-der-basis` noch mit dem alten Werkzeug, weil das neue erst nach dem Merge Basis ist. Weil die Website unverändert ist, endet sie über die Abkürzung.
- **Sichtbarkeit:** Diese erste Fassung erkannte nur `display`, `visibility`, `opacity:0` und eine Fläche null. Die Nachprüfung hat das als N855-1 nachgewiesen; behoben in Abschnitt 4. Die Prüfung erzwingt je Anfrage ein Layout und verlängert den vollen Lauf um rund ein Fünftel (gemessen: 475 s nur mit `hidden`, 553 s mit Sichtbarkeit, gleiche Befunde).
- **Laufzeit auf GitHub:** Der volle Lauf gegen r4-73 dauerte 6 min 21 s, der Job 7 min 2 s (CI zu `6210121`). Lokal brauchte ein voller Lauf rund 9 Minuten. Die Varianten laufen parallel; das Zeitlimit ist 30 Minuten.
- **RANG1** gilt nur für den Suizidabschnitt. Ein anderer Sicherheitsabschnitt, der von Rang 1 auf Rang 2 rückt, bleibt unter den ersten zwei und wird nicht gemeldet. Das ist mit R34-P01 vereinbar und für r4-78 gewollt (N848-2).
- **Erforderliche Prüfung:** Ob ein roter Lauf das Mergen sperrt, hängt von den Einstellungen des Repositorys ab. Dieser Entscheid ist weiter offen.

## 4 Nachbesserung nach der Nachprüfung #856

Die Nachprüfung ([PR #856](https://github.com/christaegger-dot/borderline-angehoerige/pull/856), eigene Sitzung) urteilte: «Bereit zum Merge: nein». Vorher zu beheben waren N855-1 (hoch) und N855-2 (mittel, in der kleinen Form). Sie hat alle Zahlen dieses Berichts nachgerechnet und bestätigt. Umgesetzt:

| Befund | Umsetzung |
|---|---|
| **N855-1** Darstellung nur teilweise gemessen (V1 bis V7b: Raster 0) | Die **Reihenfolge** kommt jetzt aus der Lage auf der Seite (oben, dann links), nicht aus dem DOM. Als **sichtbar** zählt ein Treffer nur mit diesen Bedingungen: `checkVisibility`; mindestens 4 × 4 Pixel; Deckkraft mit allen Vorfahren mindestens 0,1; kein `clip` und kein `clip-path` bei sich oder einem Vorfahren; nicht durch das `overflow` eines Vorfahren abgeschnitten; nicht links oder oben ausserhalb des Dokuments. Für die ersten drei Treffer und die Links der Leermeldung prüft das Werkzeug zusätzlich den **Treffpunkt**: Nach `scrollIntoView` muss in der Mitte des Links der Link selbst liegen, sonst gilt er als überdeckt. Eine Kontrollzahl «Bildschirm anders als DOM» steht je Menge im Bericht; im unveränderten Stand ist sie 0. Neu ist der **Selbsttest** `authoring/tools/suchraster-selbsttest.mjs` mit 15 Konstruktionen (K1, K2, K5, K9, V1 bis V8 und V10, eine Überdeckung) und dem unveränderten Stand. Er baut die Konstruktionen aus dem aktuellen `site/` und verlangt, dass das Raster jede mit der erwarteten Art meldet. In der CI ist er die vierte Variante `selbsttest`. |
| **N855-2** Der Workflow ist Teil des PR | Der Job `suchraster-ausnahmen` scheitert jetzt auch bei **jeder Änderung unter `.github/workflows/`** und listet sie. **Auch dieser PR macht ihn deshalb rot.** Das ist gewollt: Er ändert den Workflow, und seine Prüfung ist die Nachprüfung #856 mit ihrer Nachkontrolle. Die Aussagen im Workflow, in diesem Bericht und in der Pendenzendatei sind berichtigt: Eine grüne CI ist eine Freigabe nach R34-P01 nur, wenn `suchraster-ausnahmen` grün ist. Offen und nicht blockierend: den Workflow ganz absichern (`pull_request_target` mit Werkzeug der Basis oder Pflichtprüfung von `.github/`); das entscheidet Christa Egger. |
| N855-3 Anfragen ausserhalb des Rasters | Ändert ein PR `interaktion.js`, aber nicht die Proben, warnt `suchraster-ausnahmen` («Jede neue Suchregel bringt ihre Proben mit»). Weitere Satzformen (Nebensätze mit Verb am Ende, weitere Handelnde, andere Zeitformen, Schreibweise ohne Umlaut) bringt Schritt 3 mit den jeweiligen Regeln. |
| N855-4 Breite Muster umgehbar | Ein Muster darf neben der Höchstzahl je Ausnahme auch **unter den Anfragen ohne jeden Verlust** höchstens 100 treffen. Die Umgehung der Nachprüfung (`/^(?!x$\|heute\|öffnungs).+/`, r4-73 → r4-75) scheitert jetzt, siehe unten. Aufteilen in mehrere Zeilen bleibt möglich; dann bleibt der rote Job. |
| N855-5 Reihenfolge bei Bedrohung durch Dritte | Nicht umgesetzt: Entscheid Christa Egger. |
| N855-6 Fester Bezug | Die Zahl des letzten bekannten Stands steht in `suchraster.json` (`festerBezug`). Der Lauf gegen r4-73 weist die Abweichung davon aus. |
| N855-7 Was das Raster nicht sieht | `netlify.toml` steht im Pfadfilter, `_redirects` in der Abkürzung. Die Leermeldung prüft weiter eine Probe und das Ziel des Links, nicht seinen Text. |
| N855-8 Pendenzendatei | Die Aussage zur Freigabe ist berichtigt (siehe N855-2). |

**Messungen nach der Nachbesserung:** Ergebnisse in `ergebnis/nachbesserung-*.txt`.
- **Selbsttest** auf r4-77: 15 von 15 Konstruktionen gemeldet, der unveränderte Stand besteht. Der Lauf dauert 162 s lokal.
- **Umgehung N855-4:** Die Probe lief von r4-73 nach r4-75, mit den Proben und der Ausnahmenliste der Nachprüfung (`werkzeug/umgehung-ausnahmen-856.tsv`). Sie **scheitert jetzt**: 6 × «Ausnahme zu breit … trifft 1114 Anfragen ohne Verlust (höchstens 100)», Rückgabe 1. Vorher bestand sie mit «44 als Ausnahme erlaubt».
- **Unverändert** (r4-77 → r4-77, Proben, `--immer`): 0 Verschlechterungen, «Bildschirm anders als DOM» 0 in beiden Ständen.
- **r4-76 → r4-77, voll:** unverändert 428 Verschlechterungen, alle VERDRAENGT, gleiche Abdeckung, «Bildschirm anders als DOM» 0 in allen Mengen und beiden Ständen (`ergebnis/nachbesserung-r4-76-r4-77.txt`). Die Zahl für den festen Bezug (428) steht in `suchraster.json`.
- **Laufzeit auf GitHub:** Der volle Lauf gegen r4-73 dauerte vor der Nachbesserung 6 min 21 s, der Job 7 min 2 s. Die Prüfung des Treffpunkts verlängert ihn kaum: Die Proben brauchen lokal 10,7 s statt 10 s.

**Grenzen nach der Nachbesserung:** Text in Hintergrundfarbe und ein Pseudo-Element des Links selbst über seinem Text bleiben unerkannt. Sichtbarkeit und Treffpunkt gelten für ein Fenster von 1280 × 720 Pixeln; schmale Bildschirme prüft das Raster nicht.

## 5 Folgen für r4-78

r4-78 setzt die Entscheide zu N848-1 bis N848-3 um. Das gehärtete Raster wird dabei Verschiebungen melden: Bei den Fällen aus N848-2 rücken Abschnitte, die zuvor zufällig führten, nach unten. Wo das gewollt ist, gehört es als enges Muster mit Bezug r4-77 in die Ausnahmen. Dann ist der Job `suchraster-ausnahmen` rot, bis Christa Egger entschieden hat und die Nachprüfung vorliegt.
