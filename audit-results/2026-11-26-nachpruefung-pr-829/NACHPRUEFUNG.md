# Nachprüfung PR #829 · Layouttest in der CI (N809-7), Meldung statt Abbruch (N813-5) · 26.11.2026

**Prüfung vor dem Merge.** #829 ist offen und nicht gemergt. Diese Prüfung soll dem Merge vorausgehen.

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger, 26.11.2026. Auf die Frage, ob #829 zuerst von einer anderen Sitzung geprüft oder direkt gemergt werden soll, antwortete sie der bauenden Sitzung laut deren Auftrag an mich: «du kannst entscheiden, fahre fort». Die bauende Sitzung hat entschieden: zuerst Nachprüfung, dann Merge. Der Wortlaut ist mir nur über diesen Auftrag bekannt; auf GitHub steht er nicht.
- **Gegenstand:** [PR #829](https://github.com/christaegger-dot/borderline-angehoerige/pull/829) «Layouttest: in die CI (nicht blockierend, N809-7), Meldung statt Abbruch (N813-5)».
  - Branch `korrektur/2026-11-26-n809-7-n813-5-layouttest-ci`, Kopf `56a56df`, ein Commit, Grundlage `46753a5`.
  - Stand auf GitHub bei der Prüfung: offen, nicht gemergt, kein Entwurf mehr, `mergeable_state` «clean». Kopf unverändert `56a56df`.
  - Geprüft ist `git diff origin/main...origin/korrektur/2026-11-26-n809-7-n813-5-layouttest-ci`, 6 Dateien, +126/−4: `.github/workflows/verify-authoring.yml`, `authoring/tools/layouttest.cjs`, `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` und der Nachweis `audit-results/2026-11-26-n809-7-n813-5-layouttest-ci/` (`BERICHT.md`, `gates.txt`, `gegenprobe-details-neu-ERGEBNIS.json`).
  - **`main` ist seit dem Anlegen von #829 weitergelaufen:** GitHub nennt als Basis `4b63fa9`; `origin/main` steht bei der Prüfung auf `9a5341c` ([#828](https://github.com/christaegger-dot/borderline-angehoerige/pull/828), gemergt um 18:38:48 UTC, rund zweieinhalb Minuten nach dem Anlegen von #829). #828 ändert ebenfalls `layouttest.cjs` und die Pendenzendatei. Siehe N829-1.
- **Wer prüft:** eine Claude-Sitzung (`session_011SWztjXLUy9rZcMF85Vi5X`). Die bauende Sitzung ist laut Commit `session_011SWztmTg34e6BWQNtQDquh`. Sie hat nach Angabe des Auftrags auch #810 bis #812, #819, #820 und #826 verfasst.
- **Zur Unabhängigkeit:**
  - Diese Sitzung ist neu. An #829 und an #809 bis #828 habe ich nicht gearbeitet, auch nicht an B2c, am Layouttest oder am Workflow.
  - Gelesen habe ich: `AGENTS.md`, `AUDIT-AGENT-START.md`, in der Pendenzendatei (Stand `main` und Stand nach Probe-Merge) den Überblick und den Abschnitt «Layouttest · Ausnahme B2c»; N809-7 in `audit-results/2026-11-26-nachpruefung-pr-809/NACHPRUEFUNG.md`, N813-5 in `audit-results/2026-11-26-nachpruefung-pr-813/NACHPRUEFUNG.md`, Kopf und Befunde N811-1 bis N811-3 in `audit-results/2026-11-26-nachpruefung-pr-811/NACHPRUEFUNG.md` (für das Format); die PR-Beschreibung von #829, den Diff und den Nachweis von #829.
  - Der Auftrag an diese Sitzung nennt Erwartungen (zwei bekannte Abweichungen bei 375 × 667 und 360 × 740, Playwright 1.64.0, die zu stellenden Gegenproben). Ich habe sie nicht übernommen, sondern gemessen. Die Varianten und Läufe sind mit eigenen Skripten gemacht (Beilagen). Für die Gates habe ich die Werkzeuge des Repositorys benutzt.
  - Aussagen von Christa Egger gegenüber der bauenden Sitzung («einverstanden», «Sichtbar, nicht blockierend», «ja, mergen») kann ich nicht prüfen. Ich prüfe nur, ob die Pendenzendatei aus dem von ihr selbst zitierten Wortlaut nicht mehr ableitet, als er hergibt.
- **Umgebung:**
  - Node 22.23.5. Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright` (`PLAYWRIGHT_MODULE` gesetzt), Chromium headless.
  - Arbeitsbäume ausserhalb des Repositorys: `46753a5` (Grundlage, «base»), `56a56df` («pr»), `9a5341c` (`main` bei der Prüfung, «main») und `9a5341c` mit `git merge --no-commit 56a56df` («merged», nicht committet, nicht gepusht).
  - `site/` und `authoring/site.config.json` sind in `46753a5`, `56a56df` und `9a5341c` identisch (`diff -rq`, `cmp`). Varianten entstanden an Kopien von `site/` ausserhalb des Repositorys.
- **Beilagen in diesem Ordner:**
  - `varianten.py`: sechs Varianten von `site/` (s0 unverändert; s1 Figur von «Verstehen» in geschlossenem `<details>`; s2 «Kinder» ohne `figure`; s3 «Genesung» erste Figur `display:none`, zweite sichtbar; s4 Figur von «Verstehen» in offenem `<details>`; s5 «Behandlung» einzige Figur mit `hidden`).
  - `lauf.sh`: ein Lauf des Layouttests einer Fassung gegen eine Variante, mit eigenem leerem Ausgabeordner.
  - `laeufe.txt`: Ergebnisse aller 16 Läufe und die Vergleiche.
  - `report-probe.sh`, `report-probe-ausgabe.txt`: der Berichtsschritt des Workflows, aus der YAML-Datei gelesen und unter `bash -e` ausgeführt, in vier Fällen.
  - `gates.txt`: Schlusszeilen der fünf Gates auf `56a56df`.

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Ergebnis

**Technisch korrekt. Kein Blocker für den Merge von #829. Vor oder gleich nach dem Merge ist die Pendenzendatei mit dem Überblick aus #828 abzugleichen (N829-1).**

- **N813-5** wirkt wie beschrieben: Eine nicht sichtbare erste Abbildung wird als Abweichung gemeldet, `ERGEBNIS.json` wird geschrieben. Die Fassung von `main` vor #829 bricht in denselben Proben mit Timeout ab, ohne `ERGEBNIS.json`. Bei unveränderter Website sind `ERGEBNIS.json`, `BROWSER.json` und alle 19 Screenshots byte-gleich.
- **N809-7** wirkt wie beschrieben: Der Layouttest lief auf dem PR in der CI, endete mit Exit 1 und zwei Abweichungen, der Job blieb grün, Zusammenfassung und Warnung wurden geschrieben. YAML und Shell sind sauber.
- **Die zwei bekannten Abweichungen sind der Stand auf `main`** (`9a5341c`): Sicherheitskarte bei 375 × 667 (802 px) und 360 × 740 (863 px).
- **Mit `main` von heute verträgt sich die Änderung:** Der Probe-Merge ist ohne Konflikt, und der zusammengeführte Layouttest verhält sich wie erwartet (34 statt 30 Bedienproben wegen #828).
- **Alle fünf Gates** auf `56a56df` liefern die Werte des Nachweises.

Offen ist Folgendes:
- Nach dem Merge widerspricht sich die Pendenzendatei: Der Überblick aus #828 führt N809-7, N813-5 und die Merge-Aufträge weiter als offen (N829-1).
- Die CI-Meldung sieht bei zwei bekannten und bei einer neuen Abweichung gleich aus. Eine neue Abweichung fällt nur auf, wenn jemand die Zusammenfassung liest (N829-2).
- Der Eintrag zu den Merge-Aufträgen leitet aus «einverstanden» mehr ab, als der Wortlaut sicher hergibt (N829-3).

## Befunde

| Kennung | Schwere | Kurz |
|---|---|---|
| N829-1 | mittel | Pendenzendatei nach dem Merge widersprüchlich (Überblick aus #828); Zahlen im Nachweis durch #828 überholt |
| N829-2 | mittel (Entscheid) | CI-Signal unterscheidet bekannte nicht von neuen Abweichungen |
| N829-3 | mittel | «einverstanden» zu den Merge-Aufträgen ist weiter ausgelegt, als der Wortlaut trägt |
| N829-4 | gering | Pendenzeneintrag nennt «Entwurfs-PR» ohne Nummer, Link und aktuellen Status |
| N829-5 | Hinweis | «Bereit zur Prüfung» vor dem Ende der CI und vor dieser Nachprüfung |
| N829-6 | Hinweis | Warntext «Abweichungen» auch bei Abbruch; Schritt erscheint in der API als «success» |
| N829-7 | Hinweis | Grenzen der neuen Meldung (zweite Figur, Seite ohne Figur, Zählung als «Bedienprobe») |

### N829-1 · mittel · Pendenzendatei nach dem Merge widersprüchlich; Zahlen durch #828 überholt

- **Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` nach dem Zusammenführen von `56a56df` mit `9a5341c`; `BERICHT.md` und PR-Beschreibung von #829.
- **Beleg:**
  - #828 (`9a5341c`, 18:38:48 UTC) hat den Abschnitt «Offene Pendenzen im Überblick · Stand 26.11.2026» eingeführt. #829 ist auf `46753a5` gebaut und kennt ihn nicht.
  - Der Probe-Merge ist textlich sauber («Automatic merge went well»). Im Ergebnis stehen aber nebeneinander:
    - Überblick, Zeile 20: «Entscheide: Layouttest in die CI (N809-7); Abbruch beim Screenshot melden (N813-5).» Abschnitt B2c, aus #829: beide «**entschieden und umgesetzt**».
    - Überblick, Zeile 18: «Merge-Aufträge belegen (Christa Egger): #809 bis #812, #819, …». Abschnitt B2c, aus #829: «**Bestätigung von Christa Egger, 26.11.2026**» für #809 bis #812, #819 und #826.
  - Der Überblick sagt von sich, er fasse zusammen, «was am 26.11.2026 wirklich offen ist». Nach dem Merge stimmt das für drei Punkte nicht mehr.
  - `BERICHT.md` und die PR-Beschreibung nennen «30 Bedienproben» und «gleich wie auf `main`». Das galt für `46753a5`. Auf `9a5341c` sind es 34 (vier Proben «direct entries reachable» aus #828); nach dem Merge ebenfalls 34 (`laeufe.txt`, `main-s0`, `merged-s0`). Der CI-Lauf auf dem PR zeigt 30, weil er vor #828 lief.
- **Gegenprobe:** `merged-s0` gegen `main-s0`: `ERGEBNIS.json`, `BROWSER.json` und 19 Screenshots byte-gleich. `merged-s1` und `merged-s3` melden die nicht sichtbare Figur wie `pr-s1` und `pr-s3`. Die beiden Änderungen an `layouttest.cjs` stören sich also nicht.
- **Einordnung:** Kein technischer Mangel und kein Blocker. Die Pendenzendatei ist aber der operative Status (`AGENTS.md`); ein Widerspruch zwischen Überblick und Abschnitt sollte nicht auf `main` stehen bleiben.
- **Vorschlag:** `main` in den Branch von #829 holen und im Überblick die Zeilen zu N809-7, N813-5 und zu den Merge-Aufträgen anpassen (für die Merge-Aufträge siehe N829-3). Oder gleich nach dem Merge in einer Nachführung. Die Zahl 34 dabei nennen.

### N829-2 · mittel (Entscheid) · Die CI-Meldung unterscheidet bekannte nicht von neuen Abweichungen

- **Ort:** `.github/workflows/verify-authoring.yml`, Schritte «Layout test … - visible, not blocking» und «Report layout test result».
- **Beleg:**
  - Der Layouttest ist auf `main` rot. Der Schritt endet deshalb heute in jedem Lauf mit `outcome` «failure», und der Berichtsschritt setzt in jedem Lauf dieselbe Warnung: «Abweichungen im Layouttest (nicht blockierend), siehe Zusammenfassung des Laufs».
  - Kommt eine dritte Abweichung dazu, ändert sich nur der Inhalt des JSON in der Zusammenfassung und im Log. Warnung, Titel («…: failure») und Farbe bleiben gleich.
  - Auf dem PR ist die Prüfung `build-and-compare` grün. Die API führt auch den Layouttest-Schritt selbst als `conclusion: success` (Job 140107387064, Schritt 9); das Feld `output` des Check-Laufs ist leer. Wer nur die Prüfungen am PR ansieht, sieht keinen Hinweis.
  - Der Workflow läuft nur bei Pull Requests mit Änderungen unter `authoring/**`, `site/**` oder am Workflow, nicht auf `main` nach dem Merge. Das gilt für alle Schritte und ist nicht neu.
- **Einordnung:** Die Umsetzung erfüllt den Entscheid «Sichtbar, nicht blockierend» dem Wortlaut nach: Ergebnis und Warnung stehen im Lauf. Praktisch ist die Warnung ein Dauerzustand. **Eine echte neue Abweichung kann damit unbemerkt bleiben**, solange niemand die Zusammenfassung mit den zwei bekannten Zeilen vergleicht. Gegenüber dem Stand vorher (kein Layouttest in der CI) ist es trotzdem ein Gewinn. Kein Blocker.
- **Vorschlag (Entscheid von Christa Egger):** Die zwei bekannten Abweichungen als Liste im Workflow oder in einer Datei führen und im Berichtsschritt vergleichen. Unbekannte Abweichungen oder ein fehlendes `ERGEBNIS.json` dann eigens melden (`::error` mit den Zeilen) oder den Job scheitern lassen; die zwei bekannten bleiben eine Warnung. Sobald der Test auf `main` grün ist, `continue-on-error` entfernen, wie im Kommentar schon vorgesehen.

### N829-3 · mittel · «einverstanden» zu den Merge-Aufträgen ist weiter ausgelegt, als der Wortlaut trägt

- **Ort:** Pendenzendatei, Abschnitt B2c, «Offen», Eintrag «N809-1, N811-1 (Merge-Aufträge)».
- **Beleg:**
  - Vorgelegt waren laut Eintrag und `BERICHT.md` drei Punkte. Zwei sind Fragen («Soll der Layouttest …?», «Soll der Screenshot-Schritt …?»). Der dritte ist keine Frage, sondern eine Pendenz: «Merge-Aufträge belegen: Für #809 bis #812 und #819 nennt GitHub keinen Auftrag, jetzt auch für #826 nicht.»
  - Die Antwort auf alle drei war ein Wort: «einverstanden».
  - Der Eintrag folgert: «Diese Datei führt die Merges von #809, #810, #811, #812, #819 und #826 damit als mit ihrem Einverständnis über ihr Konto erfolgt.»
  - «einverstanden» auf «Merge-Aufträge belegen: …» kann heissen: «Ja, ich habe diese Merges gewollt.» Es kann ebenso heissen: «Ja, das ist offen und soll belegt werden.» Der Wortlaut entscheidet das nicht.
- **Was der Eintrag richtig macht:** Er zitiert Vorlage und Antwort wörtlich, nennt die Quelle («Mitteilung an die Sitzung …; auf GitHub nicht belegt»), hält fest, dass «ein eigener Wortlaut je PR» fehlt, lässt die Merge-Commits unverändert und führt #816 weiter als nicht belegt. Er behauptet nicht, R65-P01 sei damit erfüllt.
- **Einordnung:** Der Eintrag ist transparent, aber der Schlusssatz ist nicht so zurückhaltend, wie es der Wortlaut hergibt. Er schliesst sechs Pendenzen zu Merge-Aufträgen auf eine Antwort, die auch anders gelesen werden kann. Der Überblick aus #828 führt dieselben Merges weiter als «belegen» (N829-1); beide Stellen müssen ohnehin zusammengeführt werden. Kein Blocker.
- **Vorschlag:** Entweder Christa Egger einen eindeutigen Satz bestätigen lassen (zum Beispiel: «Die Merges von #809 bis #812, #819 und #826 habe ich gewollt») und diesen eintragen. Oder den Schlusssatz abschwächen: «Die Sitzung versteht das als Bestätigung, dass diese Merges mit ihrem Einverständnis erfolgt sind; ausdrücklich gesagt ist es nicht.» Bis dahin im Überblick als offen stehen lassen.

### N829-4 · gering · «Entwurfs-PR» ohne Nummer, Link und aktuellen Status

- **Ort:** Pendenzendatei, Eintrag N813-5 («Branch `korrektur/…`, Entwurfs-PR, Nachweis …»); N809-7 verweist darauf («Gleicher Branch und Nachweis»).
- **Beleg:** Der Eintrag nennt weder #829 noch einen Link. `AGENTS.md`: «Hinweise auf einen offenen Pull Request nur mit überprüfbarem Link und aktuellem Status führen.» Dazu ist #829 seit spätestens 18:37:06 UTC kein Entwurf mehr (N829-5).
- **Einordnung:** Verständlich, weil die Nummer beim Commit noch nicht feststand. Mit dem Merge wird der Eintrag ohnehin überholt («nicht gemergt»).
- **Vorschlag:** Beim Abgleich nach N829-1 «[PR #829](…)» und den Stand eintragen; nach dem Merge Kopf, Merge-Commit, Zeit, Auftrag und diese Nachprüfung nachführen.

### N829-5 · Hinweis · «Bereit zur Prüfung» vor dem Ende der CI und vor dieser Nachprüfung

- **Beleg (GitHub):**
  - PR angelegt um 18:36:16 UTC, über das Konto `christaegger-dot`.
  - CI `build-and-compare` (Lauf 167) auf `56a56df`: 18:36:23 bis 18:37:08 UTC, «success».
  - Codex-Kommentar angelegt um 18:37:06 UTC, Auslöser «Draft marked ready». Der Entwurf wurde also zwischen 18:36:16 und 18:37:06 UTC auf «bereit zur Prüfung» gestellt, vor dem Ende der CI. Die genaue Zeit kann ich mit den verfügbaren Schnittstellen nicht ablesen.
  - Codex-Review auf `56a56df`: «Completed» ohne Befund um 18:37:58 UTC. Keine Reviews, keine Review-Threads. Zwei Kommentare: Netlify und Codex.
  - Netlify-Prüfungen grün (18:36:22 bis 18:36:34 UTC), «Pages changed» neutral.
- **Einordnung:** Kein Verstoss. Das Umstellen löst das Codex-Review aus, und gemergt ist nichts. R28-O01 (Review abgeschlossen und gelesen) ist bisher eingehalten; R65-P01 verlangt für den Merge weiterhin einen ausdrücklichen Auftrag für genau diesen PR. «Du kannst entscheiden, fahre fort» ist nach dem Wortlaut von R65-P01 zu prüfen, bevor die bauende Sitzung mergt; ich habe dazu keinen eigenen Beleg.
- **Vorschlag:** Den Merge-Auftrag im Merge-Commit wörtlich nennen, wie bei #820 und #823.

### N829-6 · Hinweis · Warntext und Anzeige des Schritts

- **Beleg (`report-probe-ausgabe.txt`):**
  - `outcome` «success» mit `ERGEBNIS.json`: Zusammenfassung, keine Warnung.
  - «failure» mit `ERGEBNIS.json`: Zusammenfassung mit JSON, Warnung.
  - «failure» ohne `ERGEBNIS.json`: Zusammenfassung mit «ERGEBNIS.json fehlt (Abbruch vor dem Schreiben)», Warnung. Die Zusammenfassung stimmt also auch dann.
  - «cancelled»: wie zuvor.
  - In den beiden letzten Fällen lautet die Warnung trotzdem «Abweichungen im Layouttest». Bei einem Abbruch ist das ungenau.
- **Einordnung:** Die Zusammenfassung ist in allen Fällen richtig. Nur der Warntext passt bei einem Abbruch nicht.
- **Vorschlag:** Im Warntext den Wert von `outcome` nennen oder bei fehlendem `ERGEBNIS.json` «Abbruch» schreiben. Zusammen mit N829-2 lösbar.

### N829-7 · Hinweis · Grenzen der neuen Meldung in `layouttest.cjs`

- **Beleg (`laeufe.txt`):**
  - **s3**, erste Figur versteckt, zweite sichtbar: #829 meldet zwei Abweichungen (Schrift 100 % und 200 %) und macht kein Bild der zweiten Figur (17 statt 19 Screenshots). Das ist kein Fehlalarm im engen Sinn, denn geprüft wird ausdrücklich die erste Figur. Vorher: Abbruch.
  - **s2**, Seite ohne `figure`: beide Fassungen bleiben still, 2 Abweichungen wie ohne Änderung, 17 Screenshots. Eine entfernte Abbildung meldet der Test also weiterhin nicht. Das ist nicht neu und nicht Teil von N813-5.
  - Die Meldung wird als Zeile mit `test` geführt. Im Fehlerfall steigt deshalb die Zahl der «Bedienproben» (30 → 32, nach dem Merge 34 → 36), obwohl es keine Bedienprobe ist. Die Proben zur Sicherheitskarte sind ebenso geführt; das Muster ist im Werkzeug schon üblich. Die Zahl der Seitenzustände (240) bleibt gleich. Ich halte das für vertretbar; wer Zahlen vergleicht, muss es wissen.
  - Andere Bilder ohne Sichtbarkeitsprüfung gibt es weiter (zum Beispiel `#einstiege` bei 1440 px). Das habe ich nur am Code gelesen, nicht nachgestellt.
- **Vorschlag:** Keiner für #829. Bei Gelegenheit entscheiden, ob eine fehlende Abbildung auf den sieben Seiten eine Abweichung sein soll.

## Bestätigt

### 1. N813-5 · `layouttest.cjs`

16 Läufe, je mit eigener Kopie und leerem Ausgabeordner (`laeufe.txt`). «base» ist `46753a5`, also `main` ohne #829.

| Variante | base (`46753a5`) | pr (`56a56df`) | merged (`9a5341c` + #829) |
|---|---|---|---|
| s0 unverändert | 240 / 30 / 2, Exit 1 | 240 / 30 / 2, Exit 1 | 240 / 34 / 2, Exit 1 (`main` allein: gleich) |
| s1 Figur in geschlossenem `<details>` | **`TimeoutError`** (`locator.screenshot`), Exit 1, **kein `ERGEBNIS.json`** | 240 / 32 / **5**, Exit 1, `ERGEBNIS.json` vorhanden | 240 / 36 / 5 |
| s2 Seite ohne `figure` | 240 / 30 / 2 | 240 / 30 / 2 | – |
| s3 erste Figur versteckt, zweite sichtbar | **`TimeoutError`** (`scrollIntoViewIfNeeded`), kein `ERGEBNIS.json` | 240 / 32 / 4 | 240 / 36 / 4 |
| s4 Figur in offenem `<details>` | 240 / 30 / 3 | 240 / 30 / 3 | – |
| s5 einzige Figur mit `hidden` | **`TimeoutError`**, kein `ERGEBNIS.json` | 240 / 32 / 4 | – |

Angaben: Seitenzustände / Bedienproben / Abweichungen.

- **s1 mit #829**, die fünf Abweichungen: «tension core: figure inside a disclosure …», zweimal «verstehen 375px text200=…: first figure not visible, screenshot skipped …» (100 % und 200 %), dazu die zwei bekannten. `ERGEBNIS.json` dieses Laufs ist byte-gleich mit `gegenprobe-details-neu-ERGEBNIS.json` im Nachweis von #829.
- **Unveränderte Website (s0):** `base` und `pr` liefern byte-gleiche `ERGEBNIS.json`, `BROWSER.json` und 19 Screenshots (sha256). Dasselbe gilt für `main` und `merged`. Bei unveränderter Website ändert #829 also kein Ergebnis und kein Bild.
- **Keine Fehlalarme und keine neuen Abbrüche** in s0, s2 und s4. In s4 (offenes `<details>`) ist die Figur sichtbar, das Bild entsteht, und es bleibt bei der einen Meldung aus N813-3.
- **Schrift 200 %:** in s0 kein Unterschied; in s1, s3 und s5 je eine eigene Meldung mit `text200=true`.

### 2. N809-7 · Workflow

- **Syntax:** Die Datei lässt sich als YAML lesen (PyYAML), 9 Schritte. Der Berichtsschritt besteht `bash -n` und läuft unter `bash -e` in allen vier Fällen mit Exit 0. `actionlint` und `shellcheck` standen nicht zur Verfügung.
- **`${{ steps.layouttest.outcome }}` im Skript:** Der Ausdruck wird vor dem Start der Shell eingesetzt. `outcome` kann nur «success», «failure», «cancelled» oder «skipped» sein; fremder Text kann so nicht ins Skript gelangen. `outcome` ist richtig gewählt: Es nennt das Ergebnis vor `continue-on-error`; `conclusion` wäre immer «success».
- **Bedingung `always() && steps.layouttest.outcome != 'skipped'`:** Scheitert ein früherer Schritt, wird der Layouttest übersprungen und der Bericht auch. Das ist stimmig.
- **Kein altes `ERGEBNIS.json`:** `dist/` steht in `.gitignore`, im Repository liegt nichts darunter. Nach einem Abbruch kann die Zusammenfassung kein altes Ergebnis zeigen.
- **Lauf auf dem PR** ([Lauf 167](https://github.com/christaegger-dot/borderline-angehoerige/actions/runs/45877262920/job/140107387064), `56a56df`):
  - Layouttest 18:36:49 bis 18:37:05 UTC, mit `PLAYWRIGHT_MODULE=/tmp/borderline-browser/node_modules/playwright` (Playwright 1.64.0, Chromium 156.0.8078.4).
  - Ausgabe: B2c bestanden (Figur 2029 px, vierte Phase 1603 px); «240 Seitenzustände, 30 Bedienproben, 2 Abweichungen»; 802 px bei 375 × 667, 863 px bei 360 × 740; «Process completed with exit code 1».
  - Berichtsschritt lief mit `failure`; Warnung «Abweichungen im Layouttest (nicht blockierend), siehe Zusammenfassung des Laufs».
  - Job «success», Lauf «success». Die Werte stimmen mit meinen Läufen `base-s0` und `pr-s0` überein.
- **Stand auf `main`:** Der Layouttest von `9a5341c` meldet genau die zwei bekannten Abweichungen (`main-s0`). Der Überblick auf `main` führt sie als «Review-Punkt 2».

### 3. Pendenzendatei

- **#826**, gegen GitHub geprüft: Kopf `4bd1bba`, gemergt als `bf1712d` am 26.11.2026 um 18:27:43 UTC, `merged_by` `christaegger-dot`; Merge-Commit nur mit Standardtext; Codex «Completed» ohne Befund auf `4bd1bba` um 18:27:42.74 UTC, also rund eine Sekunde vor dem Merge. Der Diff betrifft nur die Pendenzendatei und `audit-results/2026-11-26-n809-layouttest-b2c/NACHTRAG-N811-2.md`. Der Eintrag stimmt. Die Wertung «in einer Sekunde aber kaum gelesen» ist angemessen.
- **N809-7 und N813-5:** Die Einträge beschreiben die Änderung zutreffend. «Nicht gemergt» stimmt bei der Prüfung.
- **Stil:** wie die übrigen Einträge des Abschnitts (Auftrag im Wortlaut, Branch, Nachweis, «Offen»).
- Einschränkungen: N829-1, N829-3, N829-4.

### 4. Gates auf `56a56df` (`gates.txt`)

| Gate | Ergebnis |
|---|---|
| `node authoring/tools/selftest.mjs` | 125/125, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | 35 Dateien byte-gleich; 24 Seiten · 0 Blocker · 20 Hinweise; Exit 0 |
| `node authoring/tools/suchtest.mjs site` | 216 von 216, JS-Fehler 0, Exit 0 |
| `node authoring/tools/sprachtest.mjs site` | 73 Prüfungen, JS-Fehler 0, Exit 0 |
| `node authoring/tools/layouttest.cjs` | 240 Seitenzustände, 30 Bedienproben, 2 Abweichungen, Exit 1 (die zwei bekannten); B2c bestanden |

Der Arbeitsbaum war danach unverändert (`git status` leer). `site/` ist im Diff von #829 nicht enthalten.

### 5. Nachweis von #829

`BERICHT.md` und `gates.txt` geben die Werte richtig wieder, bezogen auf `46753a5`. Die Gegenprobe liess sich mit eigenen Mitteln genau wiederholen (byte-gleiches `ERGEBNIS.json`). Durch #828 überholt ist nur die Zahl 30 (N829-1).

## Nicht geprüft

- Den Inhalt der Website, Fach- und Rechtsfragen.
- Die Darstellung der Zusammenfassung und der Warnung in der Oberfläche von GitHub; ich habe Log und API gelesen.
- Die Aussagen von Christa Egger gegenüber der bauenden Sitzung.
- Geräte, andere Browser als Chromium.

## Was diese Prüfung nicht getan hat

Keine Korrektur, kein Push auf den Branch von #829, kein Kommentar auf #829, kein Merge, kein Deployment, keine Änderung an `site/` oder an der Pendenzendatei. Der Probe-Merge lag in einem Arbeitsbaum ausserhalb des Repositorys und ist verworfen.
