# Nachprüfung PR #832 · Layouttest: bekannte Abweichungen als Liste, neue blockieren in der CI (N829-2) · 26.11.2026

**Nachträgliche Prüfung eines gemergten PR.** #832 war bei Beginn dieser Prüfung bereits auf `main`. Eine Nachprüfung vor dem Merge gab es nicht.

## Auftrag, Stand, wer prüft

- **Auftrag:** Der Auftrag kam als Startnachricht dieser Sitzung. Er nennt als Grundlage: Christa Egger, 26.11.2026, antwortete «ok» auf den Vorschlag der bauenden Sitzung «Nachprüfung von #832: Ich kann sie nachträglich in einer neuen Sitzung starten». Den Wortlaut kenne ich nur aus diesem Auftrag; auf GitHub steht er nicht.
- **Gegenstand:** [PR #832](https://github.com/christaegger-dot/borderline-angehoerige/pull/832).
  - Branch `korrektur/2026-11-26-n829-2-bekannte-abweichungen`, ein Commit, Kopf `a26bcca`, Grundlage `7a02774` (Merge von #829).
  - Gemergt als `8ef8394` am 26.11.2026 um 19:07:31 UTC, `merged_by` `christaegger-dot`. Eltern: `3764d45` (Merge von #833) und `a26bcca`.
  - Geprüft ist `git diff 7a02774 a26bcca`, 7 Dateien, +194/−20: `authoring/tools/layouttest.cjs`, neu `authoring/tools/layouttest-report.cjs`, `.github/workflows/verify-authoring.yml`, `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` und der Nachweis `audit-results/2026-11-26-n829-2-bekannte-abweichungen/` (`BERICHT.md`, `gates.txt`, `proben.txt`).
  - **`main` ist während der Prüfung weitergelaufen:** von `8ef8394` auf `9d0d237` ([#834](https://github.com/christaegger-dot/borderline-angehoerige/pull/834), 19:14:55 UTC, und [#835](https://github.com/christaegger-dot/borderline-angehoerige/pull/835), 19:17:18 UTC). Beide ändern nur die Pendenzendatei (`git diff --stat 8ef8394 9d0d237`: 1 Datei). «Aktueller `main`» heisst in diesem Bericht `9d0d237`.
- **Wer prüft:** eine Claude-Sitzung (`session_011SWztn5nvf8QFh74uHvpFt`). Die bauende Sitzung ist laut Commit `session_011SWztmTg34e6BWQNtQDquh`. Sie hat nach Angabe des Auftrags auch #810 bis #812, #819, #820, #826 und #829 verfasst.
- **Zur Unabhängigkeit:**
  - Diese Sitzung ist neu. An #832, an #809 bis #835, am Layouttest, am Workflow und an der Pendenzendatei habe ich nicht gearbeitet.
  - Gelesen habe ich: `AGENTS.md`, `AUDIT-AGENT-START.md`; in der Pendenzendatei den Überblick und die Einträge zu #829, N829-2, den Merge-Aufträgen und #834 im Abschnitt «Layouttest · Ausnahme B2c» (Stand `a26bcca`, `8ef8394` und `9d0d237`); `audit-results/2026-11-26-nachpruefung-pr-829/NACHPRUEFUNG.md` ganz (Befund N829-2 und Format); den Diff, die PR-Beschreibung und den Nachweis von #832; auf GitHub die Daten zu #829, #831, #832 und die Beschreibungen von #833 bis #835.
  - Der Auftrag nennt Erwartungen (Commits, Zeiten, zwei bekannte Abweichungen, Playwright 1.64.0, die zu stellenden Fragen). Ich habe sie gemessen oder gegen GitHub gelesen, nicht übernommen. Varianten, Läufe und Proben sind mit eigenen Skripten gemacht (Beilagen). Für die Gates habe ich die Werkzeuge des Repositorys benutzt.
  - Aussagen von Christa Egger gegenüber der bauenden Sitzung («1-3: einverstanden», «ok», «ja, scheitern lassen») kann ich nicht prüfen. Ich prüfe nur, ob Pendenzendatei und Nachweis aus dem von ihnen selbst zitierten Wortlaut nicht mehr ableiten, als er hergibt.
- **Umgebung:**
  - Node 22.23.5. Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright` (`PLAYWRIGHT_MODULE` zeigte darauf), Chromium headless.
  - Arbeitsbäume ausserhalb des Repositorys: `7a02774` («base»), `a26bcca` («pr»); «main» ist das Repository selbst (`8ef8394` bei den Läufen in `laeufe.txt`, `9d0d237` bei den Gates).
  - `site/` ist in `7a02774` und `a26bcca` identisch (`diff -rq`). Auf `main` ist `site/` durch #833 (r4-73) anders. Werkzeug und Workflow sind zwischen `a26bcca` und `main` identisch (`vergleich.txt`).
  - Varianten entstanden an Kopien von `site/` ausserhalb des Repositorys.
- **Beilagen in diesem Ordner:**
  - `varianten.py`: sieben Varianten von `site/` (v0 bis v6, im Kopf der Datei beschrieben).
  - `lauf.sh`, `laeufe.txt`: je ein Lauf des Layouttests einer Fassung gegen eine Variante, mit eigener Kopie und leerem Ausgabeordner, danach der Berichtsschritt; 11 Läufe.
  - `vergleich.txt`: Vergleich `7a02774` gegen `a26bcca` bei unveränderter Website.
  - `report-probe.sh`, `report-probe-ausgabe.txt`: `layouttest-report.cjs` mit 32 konstruierten Fällen.
  - `workflow-probe.py`, `workflow-probe-ausgabe.txt`: die zwei Schritte aus der YAML-Datei gelesen und wie im Runner ausgeführt (`bash -e`, `continue-on-error` nachgebildet).
  - `ci-probe.txt`: ein echter Lauf auf GitHub mit einer neuen Abweichung.
  - `gates.sh`, `gates.txt`: die fünf Gates auf `a26bcca` und auf `main` (`9d0d237`).

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Ergebnis

**Technisch korrekt und auf `main` wirksam. Eine Lücke mittlerer Schwere: Eine Verschlechterung der zwei bekannten Abweichungen fällt nicht auf (N832-1). Kein Anlass, #832 zurückzunehmen.**

- **Der Merge-Baum stimmt.** Ein eigener Merge von `a26bcca` in `3764d45` ergibt den Baum `79edcc4`, denselben wie `8ef8394`. `git diff 3764d45 8ef8394` zeigt genau die 7 Dateien von #832 mit +194/−20.
- **`layouttest.cjs`** trennt bekannte und neue Abweichungen richtig. Der Exit-Code bleibt 1 bei jeder Abweichung und 0 ohne. Bei unveränderter Website sind `BROWSER.json` und alle 19 Screenshots byte-gleich mit dem Stand davor; in `ERGEBNIS.json` kommen nur die drei neuen Felder dazu.
- **Der Berichtsschritt** lässt den Job in allen geprüften Fällen scheitern, in denen er soll: neue Abweichung, fehlendes, leeres, kaputtes oder altes `ERGEBNIS.json`, widersprüchliche Angaben.
- **«Neue Abweichung lässt den Job scheitern» ist jetzt auf GitHub belegt:** Lauf 174 auf einem Probe-Branch endete mit «failure» im Berichtsschritt (`ci-probe.txt`).
- **Alle fünf Gates** liefern auf `a26bcca` die Werte des Nachweises und auf `main` dieselben, mit 74 statt 73 Sprach-/UI-Prüfungen (aus #833).

Einschränkungen:
- Die Liste vergleicht nur den Anfang der Meldung. Rutscht die Sicherheitskarte bei den zwei bekannten Formaten viel tiefer, bleibt der Job grün (N832-1). Ein passend lautender JS-Fehler der Seite gilt ebenfalls als bekannt (N832-2).
- #832 wurde ohne Nachprüfung, ohne belegten Auftrag und vor dem Ende des Codex-Reviews gemergt, obwohl PR und Pendenzendatei selbst «Bestätigung», «Nachprüfung» und «Merge nur auf Auftrag» als offen führten (N832-3).

## Befunde

| Kennung | Schwere | Kurz |
|---|---|---|
| N832-1 | mittel | Bekannte Abweichung ohne Messwert verglichen: eine starke Verschlechterung gilt als «bekannt», der Job bleibt grün |
| N832-2 | gering | JS-Fehler der Seite laufen durch denselben Vergleich; ein Eintrag kann beliebig viele Meldungen decken |
| N832-3 | mittel (Ablauf) | Merge rund 7 s nach «bereit zur Prüfung», ohne Nachprüfung, ohne belegten Auftrag, Codex erst danach; die unbestätigte Wirkung war damit auf `main` |
| N832-4 | gering | Stand #832: Überblick und Überschrift nennen N829-2 «entschieden und umgesetzt», ohne die offene Bestätigung; inzwischen durch #835 erledigt |
| N832-5 | gering | Pendenzendatei führt #831 im Eintrag N813-5 weiter als «Entwurf» und «auf dem Branch von #831», auch auf aktuellem `main` |
| N832-6 | Hinweis | Randfälle des Berichtsskripts (Schritt gescheitert ohne Abweichung; JSON `null`; Markdown nicht maskiert; altes `ERGEBNIS.json` lokal) |
| N832-7 | Hinweis | Die Einstufung «bekannt» entsteht in der geprüften Datei selbst; der Workflow läuft nicht auf `main` |

### N832-1 · mittel · Verschlechterung einer bekannten Abweichung fällt nicht auf

- **Ort:** `authoring/tools/layouttest.cjs`, `KNOWN_ISSUES`: `/^safety card starts in first screen 375x667 /` und `/^safety card starts in first screen 360x740 /`. Der Kommentar sagt es selbst: «Der Vergleich nimmt den Anfang der Meldung, ohne den Messwert.»
- **Beleg (`laeufe.txt`, `pr-v1` und `main-v1`):** In v1 liegt die Sicherheitskarte nur bei Breite ≤ 375 px und Höhe ≤ 760 px um 2000 px tiefer. Der Layouttest meldet «375x667 (top 2802px)» und «360x740 (top 2863px)», zählt «2 bekannt, 0 neu», der Berichtsschritt endet mit Exit 0 und derselben Warnung wie heute. `workflow-probe-ausgabe.txt`: «JOB: success».
- **Einordnung:**
  - Heute liegt die Karte bei 802 und 863 px. Vor r4-70 und r4-71 waren es laut Kommentar im Werkzeug 846 und 907 px. Ein Rückfall auf diese Werte oder weit darüber bliebe in der CI unsichtbar; sichtbar wäre nur die Zahl in der Zusammenfassung.
  - Genau das sollte N829-2 verhindern: dass man sich an die Dauerwarnung gewöhnt und eine Änderung übersieht. Für neue Meldungen ist das gelöst, für diese zwei nicht.
  - Der Schaden ist begrenzt: Betroffen sind nur die zwei Proben der Liste. Die Nachbarproben greifen weiter. In v2 (Karte überall 60 px tiefer) werden «1024x768» und «375x812 (top 862px)» als neu gemeldet, der Job scheitert. Bei 375 × 812 liegt die Karte heute 10 px über der Grenze.
- **Vorschlag:** Den dokumentierten Wert in den Eintrag aufnehmen (zum Beispiel `maxTop: 802` und `863`) und eine Meldung nur dann als bekannt führen, wenn der gemessene Wert nicht darüber liegt; sonst ist sie neu. Dazu eine Probe wie v1 im Nachweis.

### N832-2 · gering · JS-Fehler laufen durch denselben Vergleich; keine Obergrenze je Eintrag

- **Ort:** `layouttest.cjs`: `if(errors.length)issues.push(...errors)` und danach `issues.filter(i=>KNOWN_ISSUES.some(k=>k.match.test(i)))`.
- **Beleg (`laeufe.txt`):**
  - `pr-v4`: Die Startseite wirft einen String, der wie die bekannte Meldung beginnt. Ergebnis: 18 Abweichungen, «18 bekannt, 0 neu», Berichtsschritt Exit 0, Job grün. 16 JS-Fehler gelten als bekannt.
  - `pr-v5`: dasselbe als `Error`-Objekt. Die Meldung beginnt dann mit «Error: », gilt als neu, 16 Fehlermeldungen, Job rot.
- **Einordnung:** Konstruiert. Ein gewöhnlicher JS-Fehler (v5) wird richtig als neu gemeldet. Der Fall zeigt aber zwei Lücken im Aufbau: Der Vergleich unterscheidet nicht zwischen Prüfmeldungen des Werkzeugs und Text, den die Seite liefert, und zwei Listeneinträge können beliebig viele Meldungen decken. Andere Meldungen des Werkzeugs beginnen nicht mit «safety card starts in first screen 375x667 » oder «… 360x740 » (am Code gelesen); eine Verwechslung mit «375x812» oder «390x844» ist durch Format und Leerzeichen ausgeschlossen (v2).
- **Vorschlag:** `errors` nie als bekannt einstufen und je Eintrag höchstens eine Meldung zulassen. Zusammen mit N832-1 lösbar.

### N832-3 · mittel (Ablauf) · Merge ohne Nachprüfung, ohne belegten Auftrag, vor dem Codex-Review

- **Beleg (GitHub):**
  - Commit `a26bcca` um 18:57:34 UTC, PR angelegt um 18:57:51 UTC als Entwurf, über das Konto `christaegger-dot`.
  - CI `build-and-compare` ([Lauf 171](https://github.com/christaegger-dot/borderline-angehoerige/actions/runs/45880009303/job/140116684595)) auf `a26bcca`: 18:57:58 bis 18:59:02 UTC, «success». Netlify-Prüfungen grün (18:57:55 bis 18:58:08 UTC), «Pages changed» neutral.
  - Gemergt um 19:07:31 UTC. Der Merge-Commit trägt nur den Standardtext, keinen Auftrag.
  - Codex: Kommentar angelegt um 19:07:33 UTC, Auslöser «Draft marked ready», «Completed» ohne Befund auf `a26bcca` um 19:08:01 UTC, also 30 Sekunden nach dem Merge. Keine Reviews, keine Review-Threads; zwei Kommentare (Netlify, Codex).
  - Den Zeitpunkt von «bereit zur Prüfung» kann ich mit den verfügbaren Schnittstellen nicht ablesen. Er liegt nach dem Ende der CI und vor 19:07:33 UTC. Die Pendenzendatei nennt seit #834 19:07:24 UTC; das widerspricht meinen Daten nicht.
  - PR-Beschreibung und Pendenzendatei von #832 führten selbst als offen: «Bestätigung zum Scheitern bei neuen Abweichungen», «Nachprüfung durch eine andere Sitzung», «Merge nur auf Auftrag».
- **Einordnung:**
  - R28-O01 (Review abgeschlossen und gelesen) ist nicht eingehalten. Ein Auftrag nach R65-P01 ist auf GitHub nicht belegt.
  - Mit dem Merge galt auf `main` ein Verhalten, das die bauende Sitzung selbst als «von Christa Egger zu bestätigen» geführt hat: Ein Pull Request mit einer neuen Abweichung scheitert. Laut Pendenzendatei (Stand #835) kam die Bestätigung «ja, scheitern lassen» danach, zwischen dem Merge von #834 (19:14:55 UTC) und dem Anlegen von #835 (19:16:32 UTC).
  - Technisch ist kein Schaden entstanden. Die CI war grün, der Probe-Merge stimmt, und die Wirkung ist geprüft.
  - Die Pendenzendatei auf `main` hält das alles seit #834 fest («ohne Nachprüfung vor dem Merge», «R28-O01 nicht eingehalten», Merge-Auftrag nicht belegt). Dort steht auch, die bauende Sitzung habe weder «bereit» noch den Merge ausgelöst; das kann ich nicht prüfen, `merged_by` ist bei allen PRs dasselbe Konto.
- **Vorschlag:** Kein neuer. Der offene Punkt «Merge-Aufträge zu #831, #832 und #834 belegen» steht im Überblick. Für künftige PRs: den Auftrag im Merge-Commit nennen, wie bei #820 und #823.

### N832-4 · gering · Darstellung des Entscheids im Stand von #832

- **Frage des Auftrags:** Christa Egger stimmte dem Satz zu «Soll der Test die bekannten als Liste führen und nur unbekannte eigens melden?». Umgesetzt ist ein Scheitern. Ist das zurückhaltend genug dargestellt?
- **Zurückhaltend genug:**
  - Eintrag N829-2 im Abschnitt B2c: zitiert Frage und Antwort und sagt: «Das geht über „eigens melden“ hinaus und ist von Christa Egger zu bestätigen».
  - `BERICHT.md`: eigener Abschnitt «Abweichung vom Wortlaut des Entscheids» mit «**Christa Egger muss das bestätigen.**» und dem Weg zurück; unter «Offen» an erster Stelle.
  - PR-Beschreibung: «Zu bestätigen» und «Offen».
- **Nicht zurückhaltend genug:**
  - Überblick (Stand `a26bcca`, Zeile 20): «N829-2 (neue Abweichungen sollen in der CI auffallen): entschieden am 26.11.2026 und umgesetzt, nicht gemergt … Offen: Nachprüfung dieser Umsetzung». Die offene Bestätigung fehlt dort. Wer nur den Überblick liest, hält auch das Scheitern für entschieden.
  - Überschrift des Eintrags «**N829-2: entschieden und umgesetzt, nicht gemergt.**» und Titel von PR und Commit («neue blockieren in der CI») nennen das Scheitern ohne Vorbehalt.
  - Der Kommentar im Workflow beschreibt das Scheitern als Stand, ohne Vorbehalt. Für Code ist das üblich.
- **Stand heute:** Durch #834 und #835 überholt. Der Überblick auf `main` sagt: «**Bestätigt von Christa Egger am 26.11.2026:** Eine neue Abweichung soll den Lauf scheitern lassen („ja, scheitern lassen“)». Der Eintrag nennt Frage und Antwort im Wortlaut und hält fest, dass das frühere «ok» nicht als Bestätigung gelesen wurde und dass die Antwort auf GitHub nicht belegt ist. Das ist sorgfältig.
- **Vorschlag:** Keiner mehr. Im selben Eintrag steht weiter oben noch «ist von Christa Egger zu bestätigen»; wer mag, setzt dort «(bestätigt, siehe unten)» dazu.

### N832-5 · gering · #831 im Eintrag N813-5 weiter als «Entwurf»

- **Ort:** Pendenzendatei, Abschnitt B2c, Eintrag N813-5: «Vor dem Merge nachgeprüft: PR #831 (Entwurf), Nachweis `audit-results/2026-11-26-nachpruefung-pr-829/NACHPRUEFUNG.md` (auf dem Branch von #831)».
- **Beleg:** #831 wurde um 18:54:55 UTC gemergt (`7e17a7c`), also vor dem Commit `a26bcca` (18:57:34 UTC). Der Überblick im selben Commit nennt #831 schon ohne «Entwurf»; die PR-Beschreibung von #832 nennt «#831 mergen» als Punkt 3. Der Eintrag N813-5 wurde nicht angepasst und steht auch auf `9d0d237` noch so (Zeile 274). Der Nachweis liegt seit dem Merge auf `main`.
- **Einordnung:** `AGENTS.md` verlangt für Hinweise auf PRs den aktuellen Status. Kleine Unstimmigkeit, kein Sachfehler.
- **Vorschlag:** Bei der nächsten Nachführung «(Entwurf)» und «(auf dem Branch von #831)» streichen und den Nachweis verlinken.

### N832-6 · Hinweis · Randfälle des Berichtsskripts

Alle aus `report-probe-ausgabe.txt`; keiner lässt in der CI eine neue Abweichung durch.

- **Schritt gescheitert, aber keine Abweichung (M2, M3):** `outcome` «failure» oder «cancelled» mit einem `ERGEBNIS.json` ohne Abweichungen ergibt Exit 0 und «Keine Abweichungen». Geprüft wird nur der umgekehrte Widerspruch («success» mit Abweichungen). Im Werkzeug habe ich keinen Weg gefunden, auf dem das eintritt: Nach dem Schreiben von `ERGEBNIS.json` folgt nur noch die Ausgabe, und ein Abbruch davor schreibt die Datei nicht. Vorschlag: «nicht success» ohne Abweichung ebenfalls als Widerspruch scheitern lassen.
- **JSON `null` (G):** scheitert richtig, aber die Meldung ist leer («### Layouttest: » und `::error title=Layouttest ohne Ergebnis::`).
- **Sonderzeichen (S):**
  - Annotation: `%`, Zeilenumbruch und Wagenrücklauf werden zu `%25`, `%0A`, `%0D`. Eine Meldung mit Zeilenumbruch und «::warning::» kann deshalb keinen eigenen Befehl einschleusen. `::` innerhalb des Texts ist unkritisch, Backticks ebenso.
  - Zusammenfassung: Der Text steht unverändert im Markdown. Zeilenumbrüche, «###», Backticks und HTML in einer Meldung verändern die Darstellung. Meldungen mit Seitentext gibt es (zerlegte Titelwörter, JS-Fehler). Das ist kosmetisch; ob GitHub das HTML filtert, habe ich nicht geprüft.
- **Altes `ERGEBNIS.json` (lokal):** `layouttest.cjs` löscht ein altes Ergebnis nicht. Bricht ein zweiter Lauf vor dem Schreiben ab, liest der Bericht das alte und endet grün (`workflow-probe-ausgabe.txt`, letzter Fall). In der CI ist das ausgeschlossen: `dist/` steht in `.gitignore`, im Repository liegt nichts darunter, der Checkout ist frisch. Vorschlag: die Datei am Anfang des Laufs löschen.
- **`outcome` «skipped» oder nicht gesetzt:** Das Skript entscheidet dann allein nach der Datei. Im Workflow läuft der Schritt bei «skipped» nicht.

### N832-7 · Hinweis · Grenzen des Ansatzes

- **Die Einstufung entsteht in `layouttest.cjs`.** Der Bericht glaubt `knownIssues` und `newIssues`. Ein Pull Request, der einen Eintrag in `KNOWN_ISSUES` ergänzt, macht seine Abweichung bekannt und den Job grün (Fall P). Sichtbar ist das nur im Diff. Für den Zweck (Versehen bemerken) genügt das; wer `layouttest.cjs` ändert, sollte es wissen.
- **Der Workflow läuft nur bei Pull Requests** mit Änderungen unter `authoring/**`, `site/**` oder am Workflow, und von Hand. Auf `main` nach einem Merge läuft er nicht. Das ist nicht neu (N829-2).
- **`knownNotSeen`:** In v6 (Karte an beiden Formaten behoben) endet der Layouttest mit Exit 0, und der Bericht gibt den Hinweis «Eintrag in KNOWN_ISSUES entfernen» als `::notice`. Der Job bleibt grün; der Hinweis kann übersehen werden. Vertretbar.
- **Zähler in der Warnung:** «1 bekannte Abweichungen» (Mehrzahl bei 1), kosmetisch.

## Bestätigt

### 1. `layouttest.cjs`

11 Läufe, je mit eigener Kopie und leerem Ausgabeordner (`laeufe.txt`). Angaben: Abweichungen (bekannt / neu), Exit des Layouttests, Exit des Berichtsschritts.

| Variante | Fassung | Layouttest | Bericht | Job |
|---|---|---|---|---|
| v0 unverändert | base `7a02774` | 2, Exit 1, ohne die neuen Felder | – | – |
| v0 unverändert | pr `a26bcca` | 2 (2 / 0), Exit 1 | Warnung, Exit 0 | grün |
| v0 unverändert | main `8ef8394` | 2 (2 / 0), Exit 1 | Warnung, Exit 0 | grün |
| v1 Karte bei den zwei bekannten Formaten 2000 px tiefer | pr, main | 2 (2 / 0), Exit 1 | Warnung, Exit 0 | **grün** (N832-1) |
| v2 Karte überall 60 px tiefer | pr | 4 (2 / 2), Exit 1 | 2 Fehler, Exit 1 | rot |
| v3 Figur von «Verstehen» in geschlossenem `<details>` | pr, main | 5 (2 / 3), Exit 1 | 3 Fehler, Exit 1 | rot |
| v4 JS-Fehler als String mit bekanntem Anfang | pr | 18 (18 / 0), Exit 1 | Warnung, Exit 0 | **grün** (N832-2) |
| v5 derselbe JS-Fehler als `Error` | pr | 18 (2 / 16), Exit 1 | 16 Fehler, Exit 1 | rot |
| v6 Karte an beiden Formaten behoben | pr | 0, `knownNotSeen` beide, Exit 0 | Hinweis, Exit 0 | grün |

- **Trennung:** In allen Läufen gilt `issues` = `knownIssues` + `newIssues`, ohne Überschneidung. `knownNotSeen` ist leer, solange beide Abweichungen auftreten, und nennt in v6 beide Kennungen.
- **Exit-Code:** 1 in allen Läufen mit mindestens einer Abweichung, auch bei nur bekannten; 0 nur in v6.
- **Unveränderte Website, `7a02774` gegen `a26bcca`** (`vergleich.txt`): `BROWSER.json` byte-gleich; 19 Screenshots, sha256 alle gleich; in `ERGEBNIS.json` sind `states`, `interactions`, `issues` und `exceptions` gleich, neu sind nur `knownIssues`, `newIssues`, `knownNotSeen`. Die Schlusszeile hat neu den Zusatz «(2 bekannt, 0 neu)».
- **v3 entspricht Probe B des Nachweises** und liefert dieselben fünf Meldungen.
- Einschränkungen: N832-1, N832-2.

### 2. `layouttest-report.cjs` und Workflow

- **32 Fälle** (`report-probe-ausgabe.txt`), Ergebnis des Berichtsschritts:

| Fall | `outcome` | Exit |
|---|---|---|
| A nur bekannte | failure, cancelled, skipped, nicht gesetzt | 0 |
| A nur bekannte | success | 1 («Widerspruch») |
| B eine neue und zwei bekannte | alle fünf | 1 |
| C nur neue | failure | 1 |
| D Datei fehlt | failure, cancelled, success | 1 |
| E leere Datei, F abgeschnittenes JSON | failure | 1 |
| G `null`, H Array, I String | failure | 1 |
| J altes Format, K `newIssues` fehlt, L `knownIssues` kein Array | failure | 1 |
| M keine Abweichung | success | 0 |
| M2, M3 keine Abweichung | failure, cancelled | 0 (N832-6) |
| N, O Zählung stimmt nicht | failure | 1 |
| P neue Abweichung steht in `knownIssues`, Zählung stimmt | failure | 0 (N832-7) |
| S Sonderzeichen in neuen Abweichungen | failure | 1 |
| T ohne `states` und `interactions` | success | 0 |

- **Gibt es einen Weg, auf dem eine neue Abweichung den Job grün lässt?** Bei unverändertem Werkzeug habe ich zwei gefunden: N832-1 (Verschlechterung einer bekannten) und N832-2 (JS-Fehler mit passendem Text). Sonst keinen: Steht eine Meldung in `newIssues`, endet der Bericht in jedem `outcome` mit Exit 1; fehlt die Datei oder ist sie unbrauchbar, ebenfalls.
- **Workflow:**
  - Die Datei lässt sich als YAML lesen (PyYAML), 9 Schritte. Der Berichtsschritt ist der letzte, hat kein `continue-on-error` und die Bedingung `always() && steps.layouttest.outcome != 'skipped'`.
  - `LAYOUT_OUTCOME` kommt über `env` aus `steps.layouttest.outcome`, nicht mehr als Ausdruck im Skript. `outcome` nennt das Ergebnis vor `continue-on-error` und ist richtig gewählt.
  - Scheitert ein früherer Schritt, werden Layouttest und Bericht übersprungen; der Job ist dann ohnehin rot.
  - Nachgestellt (`workflow-probe-ausgabe.txt`): v0 Job «success», v3 «failure», v1 «success» (N832-1), Abbruch vor dem Schreiben «failure».
  - `actionlint` stand nicht zur Verfügung.
- **Lauf auf dem PR** (Lauf 171, Job 140116684595, `a26bcca`; `ci-probe.txt`):
  - Layouttest 18:58:32 bis 18:58:59 UTC mit `PLAYWRIGHT_MODULE=/tmp/borderline-browser/node_modules/playwright` (Playwright 1.64.0, Chrome Headless Shell 156.0.8078.4).
  - Ausgabe: B2c bestanden (Figur 2029 px, vierte Phase 1603 px); «240 Seitenzustände, 38 Bedienproben, 2 Abweichungen (2 bekannt, 0 neu).»; 802 px und 863 px; «Process completed with exit code 1».
  - Berichtsschritt mit `LAYOUT_OUTCOME: failure`; «##[warning]2 bekannte Abweichungen, keine neue». Beide Schritte «success», Job «success». Die Werte stimmen mit meinem Lauf `pr-v0` überein.
- **«Neue Abweichung lässt den Job scheitern», auf GitHub belegt** (`ci-probe.txt`):
  - Branch `probe/2026-11-26-n832-neue-abweichung-ci-nicht-mergen` von `8ef8394`, ein Commit `1d90c2c`: in `layouttest.cjs` der Eintrag `safety-card-360x740` entfernt. `site/` unverändert, kein PR.
  - Start von Hand (`workflow_dispatch`), [Lauf 174](https://github.com/christaegger-dot/borderline-angehoerige/actions/runs/45883245049/job/140127520140), 19:23:09 bis 19:24:39 UTC.
  - Schritt 9 (Layouttest) «success» wegen `continue-on-error`; Schritt 10 (Bericht) **«failure»**: «##[error]safety card starts in first screen 360x740 (top 863px)», «##[warning]1 bekannte Abweichungen, 1 neue», «Process completed with exit code 1». Job und Lauf **«failure»**.
  - Nicht auf GitHub belegt: fehlendes `ERGEBNIS.json` und die Darstellung der Zusammenfassung. Beides nur lokal.

### 3. Entscheid und Wortlaut

Siehe N832-4. Abschnitt, Nachweis und PR-Beschreibung von #832 waren zurückhaltend genug; Überblick und Überschrift nicht. Auf `main` ist der Punkt seit #835 mit Frage und Antwort im Wortlaut geklärt.

### 4. Pendenzendatei im Stand von #832

- **#829, gegen GitHub geprüft:** Kopf `5ddfe5b`, gemergt als `7a02774` am 26.11.2026 um 18:52:13 UTC, `merged_by` `christaegger-dot`; 3 Commits; CI `build-and-compare` (Lauf 170) auf `5ddfe5b` 18:50:29 bis 18:51:13 UTC, «success», mit dem Layouttest-Schritt; Codex «Completed» ohne Befund auf `56a56df` um 18:37:58 UTC. Der Eintrag stimmt in allen Angaben. Dass Codex die zwei späteren Commits nicht geprüft hat, steht richtig da. «Die bauende Sitzung hat den Merge nicht ausgelöst» kann ich nicht prüfen.
- **Bestätigung der Merge-Aufträge:**
  - Der Eintrag zitiert die Frage («Bestätigen Sie, dass die Merges von #809 bis #812, #819, #826 und #829 von Ihnen gewollt waren? …») und die Antwort («1-3: einverstanden») wörtlich und nennt die Quelle («auf GitHub nicht belegt»).
  - Anders als bei N829-3 ist die Vorlage jetzt eine Ja-Nein-Frage. «einverstanden» darauf ist als Ja lesbar. Der angebotene Satz («Ja, diese Merges habe ich beauftragt») wurde nicht wörtlich gegeben; der Eintrag behauptet das auch nicht und schreibt «gelten damit als von ihr gewollt». Das trägt der Wortlaut.
  - Der Eintrag lässt die Merge-Commits unverändert, führt die frühere offene Lesart nach und #816 weiter als nicht belegt. Der Überblick ist dazu stimmig (#821, #822, #824, #784, #816 offen).
- **N829-2:** Die Beschreibung der Änderung stimmt mit dem Code überein. «Nicht gemergt» stimmte beim Commit und war 10 Minuten später überholt; #834 hat es nachgeführt.
- **Stil:** wie die übrigen Einträge des Abschnitts.
- Einschränkungen: N832-4, N832-5.

### 5. Gates (`gates.txt`)

| Gate | `a26bcca` | `main` (`9d0d237`) |
|---|---|---|
| `node authoring/tools/selftest.mjs` | 127/127, Exit 0 | 127/127, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | 35 Dateien byte-gleich; 24 Seiten · 0 Blocker · 20 Hinweise; Exit 0 | gleich |
| `node authoring/tools/suchtest.mjs site` | 216 von 216, JS-Fehler 0, Exit 0 | gleich |
| `node authoring/tools/sprachtest.mjs site` | 73 Prüfungen, JS-Fehler 0, Exit 0 | 74 Prüfungen (eine neue aus #833), Exit 0 |
| `node authoring/tools/layouttest.cjs` | 240 / 38 / 2 (2 bekannt, 0 neu), Exit 1; B2c bestanden | gleich |

Die Arbeitsbäume waren danach unverändert (`git status`; auf `main` nur dieser Ordner als neu).

### 6. Ablauf

Siehe N832-3. Zusammengefasst, alles gegen GitHub:

| Zeit (UTC) | Ereignis |
|---|---|
| 18:52:13 | #829 gemergt (`7a02774`) |
| 18:54:55 | #831 gemergt (`7e17a7c`) |
| 18:57:34 | Commit `a26bcca` |
| 18:57:51 | #832 angelegt, Entwurf |
| 18:57:58 bis 18:59:02 | CI `build-and-compare` auf `a26bcca`, «success» |
| 19:06:39 | #833 gemergt (`3764d45`), wird erster Elternteil |
| vor 19:07:33 | «bereit zur Prüfung» (löst Codex aus; genaue Zeit nicht ablesbar) |
| 19:07:31 | #832 gemergt (`8ef8394`), Standardtext, kein Auftrag genannt |
| 19:08:01 | Codex «Completed» ohne Befund auf `a26bcca` |

`3764d45` (#833) enthält `7e17a7c`; #832 und #833 überschneiden sich nur in der Pendenzendatei, der Merge war textlich sauber.

### 7. Nachweis von #832

`BERICHT.md`, `gates.txt` und `proben.txt` geben die Werte richtig wieder. Die Proben A und B liessen sich genau wiederholen (`pr-v0`, `pr-v3`); C, D und E entsprechen meinen Fällen D, M und J. Zu den Proben liegt kein Skript bei; D und E sind von Hand gebaute Dateien, was der Bericht für D sagt. Der Nachweis sagt offen, dass der Berichtsschritt auf GitHub erst durch den Lauf am PR belegt wird, und dieser Lauf zeigt nur den grünen Fall.

## Nicht geprüft

- Den Inhalt der Website, Fach- und Rechtsfragen.
- Die Darstellung der Zusammenfassung und der Meldungen in der Oberfläche von GitHub; ich habe Logs und API gelesen.
- Die Aussagen von Christa Egger gegenüber der bauenden Sitzung und wer «bereit zur Prüfung» und den Merge ausgelöst hat.
- #833, #834 und #835 selbst. Von #834 und #835 habe ich nur gelesen, was sie zu #832 in die Pendenzendatei schreiben.
- Geräte, andere Browser als Chromium.

## Was diese Prüfung getan und nicht getan hat

- Keine Korrektur, kein Kommentar auf #832, kein Merge, kein Deployment, keine Änderung an `site/` oder an der Pendenzendatei.
- **Ein Probe-Branch auf GitHub:** `probe/2026-11-26-n832-neue-abweichung-ci-nicht-mergen` (`1d90c2c`), nur für den Lauf 174. Er ändert eine Zeile in `layouttest.cjs`, hat keinen PR und ist nicht zum Mergen bestimmt. Das Löschen wurde von der Umgebung dieser Sitzung abgewiesen; **der Branch besteht noch und kann gelöscht werden.**
- Die Probe-Merges und Varianten lagen ausserhalb des Repositorys und sind verworfen.
