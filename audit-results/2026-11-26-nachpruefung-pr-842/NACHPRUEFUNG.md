# Nachprüfung PR #842 · Layouttest: bekannte Abweichungen mit Messwertgrenze (N832-1, N832-2) · 26.11.2026

**Nachträgliche Prüfung eines gemergten PR.** #842 war bei Beginn dieser Prüfung bereits auf `main` (gemergt als `7809d52` am 26.11.2026 um 22:08:30 UTC). Beauftragt war eine Nachprüfung **vor** dem Merge; ein erster Versuch brach ohne Bericht ab. Dies ist der zweite Versuch.

## Auftrag, Stand, wer prüft

- **Auftrag:** Startnachricht dieser Sitzung. Sie nennt als Grundlage: Christa Egger, 26.11.2026, antwortete «ok» auf «Prüfung vor dem Merge: Soll ich wie bei #829 zuerst eine unabhängige Sitzung prüfen lassen? Ich rate dazu, weil #842 das Prüfwerkzeug ändert.» Nach dem Abbruch des ersten Versuchs (Sitzung `session_011SWztmZ5U8nMBHGcBVhbM7`, Nutzungslimit) antwortete sie «Versuch es noch einmal». Den Wortlaut kenne ich nur aus dem Auftrag; auf GitHub steht er nicht.
- **Gegenstand:** [PR #842](https://github.com/christaegger-dot/borderline-angehoerige/pull/842), Branch `korrektur/2026-11-26-n832-1-n832-2-bekannte-abweichungen` (auf GitHub inzwischen gelöscht), Kopf `cb603b7`, drei Commits: `740d88b` (Änderung), `0001cd3` (Merge von `main` = `6f06888`), `cb603b7` (Dokumentation).
  - Merge-Commit `7809d52`, Eltern `9f7f052` (Merge von #843) und `cb603b7`.
  - Geprüft ist der Unterschied zwischen Merge-Basis und Kopf, `git diff 6f06888 cb603b7`: 7 Dateien, +194/−12. `git diff 7809d52^1 7809d52` ergibt genau dieselben 7 Dateien und Zeilenzahlen. (`git diff 7809d52^1 cb603b7` zeigt dagegen 48 Dateien, weil `cb603b7` r4-76 aus #840/#843 nicht enthält; das ist kein Inhalt von #842.)
- **Wer prüft:** eine Claude-Sitzung (`session_011SWztmaTZQ5XNCQfbzo2oC`). Die bauende Sitzung ist laut Commits `session_011SWztmTg34e6BWQNtQDquh`; sie hat auch #829 und #832 gebaut.
- **Zur Unabhängigkeit:**
  - Diese Sitzung ist neu. An #842, #829, #832, am Layouttest, am Workflow und an der Pendenzendatei habe ich nicht gearbeitet.
  - Gelesen habe ich vor und während der Prüfung: `AGENTS.md`, `AUDIT-AGENT-START.md`; in der Pendenzendatei den Kopf, den Überblick (Zeilen 1 bis 30) und die von #842 geänderten Einträge im Abschnitt «Layouttest · Ausnahme B2c»; den Diff von #842 und den Merge `0001cd3` samt Konfliktlösung; den Nachweis von #842 ganz; aus `audit-results/2026-11-26-nachpruefung-pr-832/NACHPRUEFUNG.md` den Kopf, die Befunde N832-1, N832-2, N832-5 bis N832-7 und die Abschnitte «Bestätigt» 1, 2 und 4 bis 7, dazu `varianten.py`, `lauf.sh` und `workflow-probe.py` dieser Nachprüfung; von `audit-results/2026-11-26-nachpruefung-pr-829/NACHPRUEFUNG.md` nur die Gliederung (Format); auf GitHub die Daten zu #831, #835, #837 und #842, die CI-Läufe 174, 180 und 181 und das Log von Job 140165741184.
  - Die Angaben im Auftrag, im PR und im Nachweis (Grenzen, Messwerte, Zeiten, Playwright-Version) habe ich gemessen oder gegen GitHub gelesen, nicht übernommen. Varianten, Läufe und Proben sind eigene Skripte (Beilagen). `workflow-probe.py` der Nachprüfung #832 habe ich unverändert benutzt, um die zwei Workflow-Schritte nachzubilden. Für die Gates habe ich die Werkzeuge des Repositorys benutzt.
  - Aussagen von Christa Egger gegenüber der bauenden Sitzung («1-2: einverstanden», «ok» zur Reserve) kann ich nicht prüfen. Ich prüfe nur, ob Pendenzendatei und Nachweis aus dem zitierten Wortlaut nicht mehr ableiten, als er hergibt.
- **Umgebung:**
  - Node v22.23.5. Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright` (`PLAYWRIGHT_MODULE` zeigte bei allen Läufen darauf), Chromium headless. Die CI nutzt dieselbe Playwright-Version (Chrome Headless Shell 156.0.8078.4) und misst dieselben Werte.
  - Arbeitsbäume ausserhalb des Repositorys: `6f06888` («base», Merge-Basis, Stand vor #842), `cb603b7` («pr»), `7809d52` («main»).
  - `site/` ist in `6f06888` und `cb603b7` identisch (`diff -rq`), ebenso in `9f7f052` und `7809d52`. `layouttest.cjs`, `layouttest-report.cjs` und `.github/` sind in `cb603b7` und `7809d52` identisch (`vergleich.txt`).
  - Varianten entstanden an Kopien von `site/` ausserhalb des Repositorys.
- **Beilagen in diesem Ordner:**
  - `varianten.py`: elf Varianten von `site/` (im Kopf der Datei beschrieben). Verschiebungen der Sicherheitskarte über `position:relative; top`, damit der Wert genau ist.
  - `lauf.sh`, `laeufe.txt`: je ein Lauf des Layouttests einer Fassung gegen eine Variante, eigene Kopie, danach der Berichtsschritt wie im Workflow; 12 Läufe.
  - `rohwert.cjs`, `rohwert.txt`: ungerundete Lage der ersten Sicherheitskarte bei fünf Formaten.
  - `muster.cjs`, `muster-ausgabe.txt`: `KNOWN_ISSUES` und die Einstufung wörtlich aus `layouttest.cjs` gelesen und mit 22 konstruierten Meldungsfolgen ausgeführt.
  - `report-probe.sh`, `report-probe-ausgabe.txt`: `layouttest-report.cjs` mit 18 Eingaben × 5 Werten von `outcome` (90 Fälle) und Einzelausgaben.
  - `altes-ergebnis.txt`: altes `ERGEBNIS.json` bei Abbruch vor und nach dem Löschen.
  - `workflow-probe-ausgabe.txt`: die zwei Workflow-Schritte nachgebildet, mit `workflow-probe.py` aus der Nachprüfung #832.
  - `probe-sh-wiederholung.txt`: Wiederholung von `probe.sh` aus dem Nachweis.
  - `vergleich.txt`: `6f06888` gegen `cb603b7` bei unveränderter Website.
  - `gates.sh`, `gates.txt`: die fünf Gates auf `cb603b7`, `7809d52` und `6f06888`.

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Ergebnis

**Technisch korrekt und auf `main` wirksam. N832-1 und N832-2 sind behoben, die Grenzen stimmen auf den Pixel. Kein Weg gefunden, auf dem eine neue Abweichung in der CI den Job grün lässt (ausser innerhalb der bestätigten Reserve von 8 px), und kein Fehlalarm bei unveränderter Website. Kein Anlass, #842 zurückzunehmen.**

- **Merge-Baum:** `git merge-tree --write-tree 9f7f052 cb603b7` ergibt ohne Konflikt den Baum `5343fe8`, genau den Baum von `7809d52`.
- **N832-1:** Liegt die Sicherheitskarte bei 375 × 667 oder 360 × 740 tiefer als 810 bzw. 871 px, ist die Abweichung neu und der Berichtsschritt scheitert. Gemessen an der Grenze: 810/871 px bekannt, 811/872 px neu.
- **N832-2:** Jeder Eintrag deckt höchstens eine Meldung; JS-Fehler sind immer neu, auch mit genau dem Text der heutigen Meldung (Proben v4 und v5 nachgestellt: vorher grün, jetzt rot).
- **Unveränderte Website:** `issues`, `BROWSER.json` und alle 19 Screenshots sind gleich wie vor #842, Exit-Code 1.
- **Gates** auf `cb603b7` und `main` (`7809d52`) bestanden; Layouttest 240 / 38 / 2 (2 bekannt, 0 neu), Exit 1.
- **Ablauf:** gemergt vor der beauftragten Nachprüfung und vor dem Ende des Codex-Reviews (N842-1).

## Befunde

| Kennung | Schwere | Kurz |
|---|---|---|
| N842-1 | mittel (Ablauf) | Merge vor der beauftragten Nachprüfung, ohne belegten Merge-Auftrag; Codex «Completed» 24 s nach dem Merge |
| N842-2 | gering | Pendenzendatei und Nachweis führen #837 als «Entwurf, nicht gemergt», obwohl #837 seit 19:34:41 UTC gemergt war |
| N842-3 | gering | Altes `ERGEBNIS.json` wird nicht in jedem Fall gelöscht: Bricht der Lauf beim Laden von Playwright ab, bleibt es liegen und der Bericht endet grün (nur lokal) |
| N842-4 | gering | `probe.sh` nur teilweise wiederholbar: Aufrufe und Werte der Proben fehlen, Voraussetzungen sind nicht genannt |
| N842-5 | Hinweis | Nach dem Merge überholt: Pendenzendatei führt #842 als «nicht gemergt»; die CI am PR lief gegen `6f06888`, nicht gegen den gemergten Stand |
| N842-6 | Hinweis | Randfälle: falscher Hinweis «Eintrag entfernen» bei passendem JS-Fehler; Markdown-Maskierung unvollständig; veralteter Kommentar im Werkzeug |

### N842-1 · mittel (Ablauf) · Merge vor der beauftragten Nachprüfung

- **Beleg (GitHub):**
  - PR-Beschreibung von #842 unter «Offen»: «Nachprüfung durch eine andere Sitzung.» und «Merge nur auf Auftrag.» Der Kopf-Commit `cb603b7` (20:57:29 UTC) trägt «Nachprüfung vor dem Merge beauftragt» ein, Pendenzendatei und Nachweis ebenso: «Offen: Nachprüfung dieser Umsetzung (vor dem Merge beauftragt am 26.11.2026)».
  - Gemergt am 26.11.2026 um 22:08:30 UTC, `merged_by` `christaegger-dot`, Merge-Commit mit Standardtext; einen Merge-Auftrag nennen weder PR noch Merge-Commit. Reviews auf GitHub: keine.
  - Codex: Auslöser «Draft marked ready», Kommentar angelegt 22:08:35 UTC, «Completed» ohne Befund auf `cb603b7` um 22:08:54 UTC, also 24 s **nach** dem Merge. Den genauen Zeitpunkt von «bereit zur Prüfung» kann ich mit den verfügbaren Werkzeugen nicht ablesen; er liegt vor 22:08:30 UTC.
  - Ein Bericht der Nachprüfung lag beim Merge nicht vor (erster Versuch ohne Bericht abgebrochen, laut Auftrag).
- **Einordnung:** Dasselbe Muster wie N832-3 (#832) und #836. Technisch hat es hier nicht geschadet: Diese Prüfung findet nichts, was eine Rücknahme nahelegt. Der Zweck der Nachprüfung vor dem Merge, gerade weil #842 das Prüfwerkzeug selbst ändert, war aber verfehlt. Ob Christa Egger den Merge gewollt hat, kann ich nicht prüfen.
- **Vorschlag:** Merge-Auftrag zu #842 von Christa Egger belegen lassen und in der Liste der offenen Merge-Aufträge führen.

### N842-2 · gering · #837 als «Entwurf, nicht gemergt» geführt

- **Ort:** Pendenzendatei, Überblick, Zeile «Layouttest in der CI»: «Die nachträgliche Nachprüfung von #832 liegt vor ([#837](…), Entwurf)»; Abschnitt B2c, Eintrag «Nachprüfung von #832»: «Kopf `ff916aa`, **Entwurf, nicht gemergt**; Nachweis auf dem Branch» und «Ergebnis laut Meldung der Nachprüfsitzung … Die Befunde sind aus der Meldung übernommen». Ebenso `BERICHT.md` des Nachweises: «([PR #837](…), Entwurf); ihr Nachweis liegt auf dem Branch von #837».
- **Beleg (GitHub):** #837, Kopf `ff916aa`, ist gemergt am 26.11.2026 um 19:34:41 UTC als `624ceea`, `merged_by` `christaegger-dot`. Das war 1 h 16 min vor dem ersten Commit von #842 (`740d88b`, 20:50:15 UTC). `624ceea` ist Vorfahre der Merge-Basis `6f06888`; der Nachweis lag also beim Bau auf dem Branch selbst (`audit-results/2026-11-26-nachpruefung-pr-832/`). Die übrigen Angaben zu #837 (Kopf, Branch, Befunde und ihre Schwere) stimmen.
- **Einordnung:** `AGENTS.md` verlangt für Hinweise auf PRs den aktuellen Status. Kein Sachfehler im Werkzeug; aber genau die Art Unstimmigkeit, die N832-5 berichtigen sollte, und sie steht jetzt auf `main` (Zeile 20 und im Abschnitt B2c).
- **Vorschlag:** Bei der nächsten Nachführung #837 als gemergt (`624ceea`, 19:34:41 UTC) führen, den Nachweis verlinken und «laut Meldung … aus der Meldung übernommen» durch den Verweis auf den Bericht ersetzen.

### N842-3 · gering · Altes `ERGEBNIS.json` nicht in jedem Fall gelöscht

- **Ort:** `layouttest.cjs`, Zeilen 2 bis 6: `require(process.env.PLAYWRIGHT_MODULE || …)` steht **vor** `fs.rmSync(out+'/ERGEBNIS.json',{force:true})`.
- **Beleg (`altes-ergebnis.txt`):**
  - Altes Ergebnis mit den zwei bekannten Abweichungen im Ausgabeordner, `PLAYWRIGHT_MODULE` auf einen fehlenden Pfad: Der Layouttest bricht mit Exit 1 ab, `ERGEBNIS.json` bleibt liegen, der Bericht (`outcome` failure) meldet «0 neue, 2 bekannte» und endet mit **Exit 0**.
  - Abbruch nach dem Löschen (falscher `CHROMIUM_PATH`): Datei weg, Bericht «ERGEBNIS.json fehlt», Exit 1. Richtig.
- **Einordnung:** In der CI ausgeschlossen: `dist/` steht in `.gitignore`, im Repository liegt nichts darunter (`git ls-files dist` leer), der Checkout ist frisch. Lokal kann ein Lauf mit falschem Modulpfad aber grün aussehen. N832-6 ist damit für diesen Teil nicht ganz erledigt; PR und Nachweis sagen «wird am Anfang des Laufs gelöscht».
- **Vorschlag:** Das Löschen vor das `require` stellen (Ausgabeordner ermitteln, löschen, dann Playwright laden).

### N842-4 · gering · `probe.sh` nur teilweise wiederholbar

- **Ort:** `audit-results/2026-11-26-n832-1-n832-2-bekannte-abweichungen/probe.sh`, `proben.txt`, `BERICHT.md`.
- **Beleg (`probe-sh-wiederholung.txt`):**
  - Die CSS- und JS-Werte der Proben V1, V1b, V1c und V4 stehen nirgends; `proben.txt` zeigt nur die Ausgaben. Mit einem eigenen Wert (+5 px über `position:relative`) liefert `probe.sh` 807/868 px, «2 bekannt, 0 neu», Exit 0, wie V1b.
  - Ohne `PLAYWRIGHT_MODULE` fällt das Werkzeug auf `/opt/npm-tools/node_modules/playwright` zurück; dort gibt es hier kein Playwright, der Lauf bricht ab («ERGEBNIS.json fehlt»). Mit relativem Arbeitsordner ebenso, weil das Skript nach `cd $R` den Pfad `$R/out` nochmals relativ benutzt. Beides steht nicht im Kopf des Skripts.
  - Die Randfälle des Berichtsskripts in `proben.txt` (failure/cancelled ohne Abweichung, `null`, Sonderzeichen) erzeugt `probe.sh` nicht; die Eingaben fehlen.
- **Einordnung:** Die Ergebnisse selbst stimmen mit meinen Läufen überein (`laeufe.txt`, `report-probe-ausgabe.txt`). Es fehlt nur, was man zum genauen Wiederholen braucht.
- **Vorschlag:** Aufrufe mit Werten in `proben.txt` oder in ein Rahmenskript schreiben; Voraussetzungen (absoluter Arbeitsordner, `PLAYWRIGHT_MODULE`) im Kopf nennen.

### N842-5 · Hinweis · Nach dem Merge überholt

- **Pendenzendatei auf `main`:** führt #842 weiterhin als «entschieden und umgesetzt, nicht gemergt» und unter «Offen: Nachprüfung durch eine andere Sitzung; Merge nur auf Auftrag». Das stimmte beim Commit `cb603b7` und ist seit 22:08:30 UTC überholt. Eine Nachführung ist nötig (nicht Teil dieses Auftrags).
- **CI am PR:** Lauf 181 auf `cb603b7` (20:57:35 bis 20:58:45 UTC) prüfte den Merge mit der damaligen Basis `6f06888` (Suchtest 235/235, r4-75). `main` hatte bis zum Merge #840 und #843 (r4-76) aufgenommen; der Workflow läuft auf `main` nicht (N832-7). Meine Gates auf `7809d52` decken den gemergten Stand ab und sind bestanden.
- **`gates.txt` des Nachweises** zeigt den Stand vor dem Merge von `main` (Suchtest 216/216). Die Werte nach `0001cd3` (Suchtest 261/261) stehen nur in der Commit-Nachricht. Auf `cb603b7` habe ich 261/261 gemessen.

### N842-6 · Hinweis · Randfälle

- **`knownNotSeen` bei passendem JS-Fehler:** `knownNotSeen` schliesst Meldungen aus, deren Text in `errors` vorkommt. Wirft die Seite genau den Text einer verschlechterten Meldung, meldet das Werkzeug «nicht mehr aufgetreten, Eintrag entfernen», obwohl die Abweichung (verschlechtert) auftritt. Belegt in `laeufe.txt` (`pr-v4o2000`: `knownNotSeen ["safety-card-375x667"]`) und `muster-ausgabe.txt`. Der Job scheitert trotzdem (18 neue). Konstruiert; nur ein falscher `::notice`.
- **Markdown-Maskierung:** `< > & \` * _ # | [ ]` und Zeilenumbrüche werden ersetzt; `~~`, `@name`, `(…)` und nackte URLs nicht. Kosmetisch: `~~d~~` erscheint durchgestrichen, eine URL als Link. `@name` benachrichtigt in einer Zusammenfassung niemanden.
- **Veralteter Kommentar:** `layouttest.cjs`, Zeile 81 (nicht von #842 geändert), nennt «gemessen 846 px bei 375 × 812 und 375 × 667, 907 px bei 360 × 740»; heute sind es 802 und 863 px.

## Bestätigt

### 1. N832-1 · `maxTop`

12 Läufe, je mit eigener Kopie (`laeufe.txt`). Angaben: Abweichungen (bekannt / neu), Exit des Layouttests, Exit des Berichtsschritts mit `outcome` wie im Workflow.

| Variante | Fassung | gemessen 375×667 / 360×740 | Layouttest | Bericht | Job |
|---|---|---|---|---|---|
| unverändert | pr, main, base (Gates) | 802 / 863 | 2 (2 / 0), Exit 1 | Warnung, Exit 0 | grün |
| o8 · +8 px | pr | 810 / 871 | 2 (2 / 0), Exit 1 | Warnung, Exit 0 | grün |
| o9 · +9 px | pr | 811 / 872 | 2 (0 / 2), Exit 1 | 2 Fehler, Exit 1 | **rot** |
| o8.4 · +8,4 px | pr | 810 / 872 | 2 (1 / 1), Exit 1 | 1 Fehler, Exit 1 | **rot** |
| o8.4 · +8,4 px | base `6f06888` | 810 / 872 | 2 (2 / 0), Exit 1 | Warnung, Exit 0 | grün (vor #842) |
| o2000 · +2000 px (v1 der Nachprüfung #832) | pr | 2802 / 2863 | 2 (0 / 2), Exit 1 | 2 Fehler, Exit 1 | **rot** |
| nur667 · +9 px nur bei 375 × 667 | pr | 811 / 863 | 2 (1 / 1), Exit 1 | 1 Fehler, Exit 1 | **rot** |
| fix · −400 px | pr | im ersten Bildschirm | 0, Exit 0, `knownNotSeen` beide | Hinweis, Exit 0 | grün |

- **Grenzen genau:** 810 und 871 px gelten als bekannt, 811 und 872 px als neu. Die Verschiebung wirkt nur bei Breite ≤ 375 px und Höhe ≤ 760 px; 375 × 812, 390 × 844 und 1024 × 768 bleiben unberührt, die Meldungen betreffen nur die zwei Formate.
- **Heutige Werte (`rohwert.txt`):** ungerundet 801,77 px (375 × 812 und 375 × 667, gleiche Breite) und 863,16 px (360 × 740); gerundet 802 und 863 px wie im Werkzeug und in der CI (Log Job 140165741184). Die Angaben im Eintrag stimmen.
- **Reserve:** Wegen der Rundung ist die wirksame Reserve 8,23 px bei 375 × 667 und 7,84 px bei 360 × 740 (o8.4: einmal bekannt, einmal neu). Für eine Grenze gegen Rückfälle ist das gleichwertig. Lokal und in der CI sind die Werte gleich; Schwankungen habe ich in keinem der Läufe gesehen. Bei 375 × 812 liegt die Karte 10 px über der eigenen Grenze; verschiebt sie sich um mehr als 10 px, meldet schon diese Probe neu. Die Reserve von 8 px ist vertretbar; sie lässt eine Verschlechterung um bis zu 8 px ohne Meldung zu, das ist ihr Zweck.
- **Muster (`muster-ausgabe.txt`):**
  - Das Muster ist auf die ganze Meldung verankert (`^…\(top (\d+)px\)$`). Dezimalwert, Zusatz vorn oder hinten, fehlender Messwert, negativer Wert, abschliessender Zeilenumbruch, Unicode-Ziffern und ein anderes Format (375 × 812) sind **neu**. Alle Abweichungen vom Muster gehen in die strenge Richtung.
  - Das Werkzeug erzeugt den Wert mit `Math.round`, also immer eine ganze Zahl; das Muster passt dazu. Führende Nullen würden passen; das Werkzeug erzeugt sie nicht.
  - Eine bessere, aber noch nicht behobene Lage (668 / 741 px) bleibt bekannt. Richtig.
  - Ändert jemand den Wortlaut der Meldung, passt kein Eintrag mehr: beide Meldungen werden neu, die CI scheitert. Das Muster ist damit eher eng; das ist gewollt.

### 2. N832-2 · ein Eintrag, eine Meldung; JS-Fehler

| Variante | Fassung | Layouttest | Bericht | Job |
|---|---|---|---|---|
| v4 · Startseite wirft String «safety card starts in first screen 375x667 (top 802px)», genau der heutige Text | pr | 18 (2 / 16), Exit 1 | 16 Fehler, Exit 1 | **rot** |
| v4 · dasselbe | base `6f06888` | 18 (18 / 0), Exit 1 | Warnung, Exit 0 | grün (vor #842) |
| v4alt · String wie in der Nachprüfung #832 («(vorgetaeuscht)») | pr | 18 (2 / 16), Exit 1 | 16 Fehler, Exit 1 | **rot** |
| v5 · dasselbe als `Error` | pr | 18 (2 / 16), Exit 1 | 16 Fehler, Exit 1 | **rot** |
| v4o2000 · +2000 px und geworfener String «… (top 2802px)» | pr | 18 (0 / 18), Exit 1 | 18 Fehler, Exit 1 | **rot** (N842-6) |

- **JS-Fehler immer neu:** `errors` werden nach der Einstufung an `issues` und `newIssues` angehängt und laufen nie durch `KNOWN_ISSUES`, auch mit genau dem Text einer bekannten Meldung (v4, `muster-ausgabe.txt` «JS-Fehler mit genauem Text»).
- **Höchstens eine Meldung je Eintrag:** Zwei gleiche Prüfmeldungen ergeben eine bekannte und eine neue («doppelt»). Die Einträge sind an das Format gebunden (375x667 bzw. 360x740), eine fremde Meldung passt also nie auf einen Eintrag.
- **Reihenfolge:** Vertauschte Reihenfolge ändert nichts. Kommt bei doppelter Meldung zuerst eine zu tiefe (900 px) und dann eine passende (802 px), ist die erste neu und die zweite bekannt; der Job scheitert. Eine fremde Meldung kann keinen Eintrag verbrauchen, weil jede verbrauchende Meldung Format und Grenze erfüllen muss. Im Werkzeug entsteht jede der zwei Meldungen ohnehin nur einmal je Lauf.
- **`knownNotSeen`:** leer, solange die Meldung auftritt, auch über `maxTop` (o2000, o9: `knownNotSeen []`); nennt beide Einträge, wenn die Karte im ersten Bildschirm liegt (fix), und nur den einen, wenn nur ein Format behoben ist (`muster-ausgabe.txt`). Einschränkung: N842-6.
- **Zählung:** In allen Läufen und Mustern gilt `issues` = `knownIssues` + `newIssues`.

### 3. N832-6 · Berichtsskript

90 Fälle (`report-probe-ausgabe.txt`): 18 Eingaben × `outcome` success, failure, cancelled, skipped und nicht gesetzt.

| Eingabe | success | failure | cancelled | skipped | nicht gesetzt |
|---|---|---|---|---|---|
| A nur bekannte | 1 (Widerspruch) | 0 | 0 | 0 | 0 |
| B neue und bekannte, C nur neue | 1 | 1 | 1 | 1 | 1 |
| M keine Abweichung | 0 | **1** (Widerspruch, neu) | **1** (Widerspruch, neu) | 0 | 0 |
| E leere Datei, F abgeschnittenes JSON | 1 «nicht lesbar» | 1 | 1 | 1 | 1 |
| G `null`, H Array, I Zahl, Js String, T `true` | 1 «enthält kein Ergebnisobjekt» | 1 | 1 | 1 | 1 |
| Alt altes Format, L `knownIssues: null` | 1 «ohne die Felder» | 1 | 1 | 1 | 1 |
| Nz Zählung stimmt nicht, Ni `issues` fehlt | 1 | 1 | 1 | 1 | 1 |
| Ks `knownNotSeen` als String | 1 (Absturz, ohne Zusammenfassung) | 1 | 1 | 1 | 1 |
| S Sonderzeichen, neue Abweichung | 1 | 1 | 1 | 1 | 1 |
| Sk HTML in bekannter Abweichung | 1 (Widerspruch) | 0 | 0 | 0 | 0 |
| Datei fehlt | – | 1 | – | – | – |

- **JSON `null`** hat jetzt eine klare Meldung («ERGEBNIS.json enthält kein Ergebnisobjekt»), ebenso Array, Zahl, String und `true`.
- **«failure» oder «cancelled» ohne Abweichung** scheitert jetzt (N832-6 behoben). «skipped» und nicht gesetzt entscheiden allein nach der Datei; im Workflow läuft der Schritt bei «skipped» nicht.
- **Sonderzeichen:**
  - Annotation: `%`, `\r`, `\n` werden zu `%25`, `%0D`, `%0A`; ein eingebetteter Zeilenumbruch mit «::warning::» erzeugt keinen eigenen Befehl.
  - Zusammenfassung: einzeilig; `<`, `>`, `&`, Backtick, `*`, `_`, `#`, `|`, `[`, `]` als Entitäten. Rest: N842-6.
- **Altes `ERGEBNIS.json`:** wird gelöscht, sobald Playwright geladen ist; davor nicht (N842-3).
- **Neue Abweichung bei grünem Job?** Nicht gefunden. Steht eine Meldung in `newIssues`, endet der Bericht bei jedem `outcome` mit Exit 1; ist die Datei fehlend oder unbrauchbar, ebenfalls. Grün bleibt eine verschlechterte bekannte Abweichung nur innerhalb von 8 px (bestätigte Reserve). Weiter gilt N832-7: Wer einen Eintrag in `KNOWN_ISSUES` ergänzt, macht seine Abweichung bekannt.
- **Fehlalarm bei unveränderter Website?** Nein: Layouttest Exit 1 (2 bekannt, 0 neu), Bericht mit `outcome` failure Exit 0, Job grün (Gates, CI-Lauf 181, `workflow-probe-ausgabe.txt`). «success» mit bekannten Abweichungen wäre ein Widerspruch; der Layouttest endet aber bei jeder Abweichung mit Exit 1, das tritt also nicht ein.
- **Workflow nachgebildet (`workflow-probe-ausgabe.txt`):** o8 Job «success», o9 Job «failure». Beide Kopien enthielten noch das `ERGEBNIS.json` des vorigen Laufs; es wurde überschrieben. Einen CI-Beleg auf GitHub habe ich nicht angelegt (Auftrag: nur lokal).

### 4. Unveränderte Website (`vergleich.txt`)

- `6f06888` gegen `cb603b7`: `site/` identisch; `BROWSER.json` byte-gleich; 19 Screenshots, sha256 alle gleich; in `ERGEBNIS.json` sind `states` (240), `interactions` (38), `issues`, `knownIssues`, `newIssues`, `knownNotSeen` und `exceptions` gleich.
- Exit-Code 1 bei jeder Abweichung, auch nur bekannten (alle Läufe); 0 nur ohne Abweichung (fix).
- Die Prüfungen selbst sind unverändert: Der Diff von `layouttest.cjs` betrifft nur `KNOWN_ISSUES`, die Einstufung, `knownNotSeen`, das Löschen am Anfang und Kommentare.

### 5. Pendenzendatei, Konfliktlösung, Nachweis

- **Konfliktlösung in `0001cd3`** (`git show --remerge-diff`): Konflikt nur im Überblick, zwei Zeilen. Übernommen ist die Zeile «Bestätigen» von `main` («r4-68 bis r4-74» statt «r4-71») und die Zeile «Layouttest in der CI» des Branchs, darin der überholte Halbsatz «die nachträgliche Nachprüfung ist … beauftragt, noch kein PR» entfernt; sonst wortgleich mit `740d88b`. `git diff 6f06888 0001cd3` enthält nur die 7 Dateien des Branchs, `main` ist also vollständig erhalten; Werkzeug und Nachweis sind zwischen `740d88b` und `0001cd3` unverändert. Die Lösung ist richtig.
- **`cb603b7`:** ändert nur Dokumentation (Pendenzendatei 2 Zeilen, `BERICHT.md` 2 Zeilen), wie die Commit-Nachricht sagt.
- **Einträge, gegen GitHub geprüft:**
  - **#835:** Branch `pendenzen/2026-11-26-nach-834-bestaetigung`, Kopf `f8175e8`, gemergt als `9d0d237` um 19:17:18 UTC, `merged_by` `christaegger-dot`, ändert nur die Pendenzendatei: stimmt. «etwa 7 Sekunden nach „bereit zur Prüfung“ (19:17:11 UTC)»: nicht ablesbar. «Codex-Review: beim Merge noch nicht abgeschlossen»: stimmt; ergänzend: «Completed» ohne Befund um 19:17:48 UTC, 30 s nach dem Merge.
  - **#837:** siehe N842-2.
  - **N832-5 / #831:** #831 gemergt am 26.11.2026 um 18:54:55 UTC: stimmt. Der Verweis auf den Nachweis ist jetzt ein Link und die Datei liegt auf `main`. N832-5 ist erledigt.
  - **N832-1, N832-2:** Die Beschreibung (`maxTop` 810 und 871 px, je 8 px Reserve; JS-Fehler neu; Randfälle N832-6) stimmt mit dem Code überein.
  - **Reserve:** Der Eintrag zitiert Frage («Reserve von 8 px: bestätigen oder ändern.») und Antwort («ok») und schreibt «Gelesen als Bestätigung der 8 px» sowie «auf GitHub nicht belegt». Das trägt der Wortlaut; «ok» auf eine Frage mit zwei Möglichkeiten ist als «bestätigen» lesbar, und der Eintrag legt die Lesart offen.
  - **Probe-Branch:** `probe/2026-11-26-n832-neue-abweichung-ci-nicht-mergen` (`1d90c2c`) besteht auf GitHub weiterhin: stimmt.
  - **Stil:** wie die übrigen Einträge des Abschnitts (fett gesetzter Kopf, Wortlaut in «», Belegkette, «Offen:»).
- **Nachweis:** `BERICHT.md` und `proben.txt` geben die Werte richtig wieder (A, V1 mit 2782/2843 px, V1b, V1c, V4 und die Randfälle stimmen mit meinen Läufen überein). Einschränkungen: N842-2, N842-4, N842-5.

### 6. Gates (`gates.txt`)

| Gate | `cb603b7` | `main` (`7809d52`) | `6f06888` (vor #842) |
|---|---|---|---|
| `node authoring/tools/selftest.mjs` | 127/127, Exit 0 | 127/127, Exit 0 | 127/127, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | 35 Dateien byte-gleich; 24 Seiten · 0 Blocker · 20 Hinweise; Exit 0 | gleich | gleich |
| `node authoring/tools/suchtest.mjs site` | 261 von 261, JS-Fehler 0, Exit 0 | 235 von 235 (r4-76), Exit 0 | 261 von 261, Exit 0 |
| `node authoring/tools/sprachtest.mjs site` | 74, JS-Fehler 0, Exit 0 | 74, Exit 0 | 74, Exit 0 |
| `node authoring/tools/layouttest.cjs` | 240 / 38 / 2 (2 bekannt, 0 neu), Exit 1; B2c bestanden (Figur 2029 px, vierte Phase 1603 px) | gleich | gleich |

Die Suchtest-Zahlen unterscheiden sich wegen r4-75 (`6f06888`, `cb603b7`) und r4-76 (`main`), nicht wegen #842. Die Arbeitsbäume waren nach den Gates sauber (`git status`).

**CI auf dem PR:**
- Lauf 180 auf `0001cd3` (20:52:29 bis 20:53:43 UTC) und Lauf 181 auf `cb603b7` (20:57:35 bis 20:58:45 UTC), beide «success».
- Log Job 140165741184 (Lauf 181): `PLAYWRIGHT_MODULE=/tmp/borderline-browser/node_modules/playwright`, Chrome for Testing 156.0.8078.4 (Playwright chromium v1248); Suchtest 235/235; Layouttest «240 Seitenzustände, 38 Bedienproben, 2 Abweichungen (2 bekannt, 0 neu)», 802 und 863 px, «Process completed with exit code 1»; Berichtsschritt mit `LAYOUT_OUTCOME: failure`, «##[warning]2 bekannte Abweichungen, keine neue», Job grün.
- Netlify-Prüfungen (Header, Redirects) «success», «Pages changed» «neutral».

### 7. Ablauf

Alles gegen GitHub und `git log`:

| Zeit (UTC) | Ereignis |
|---|---|
| 19:34:41 | #837 gemergt (`624ceea`) |
| 20:42:50 | #839 gemergt (`6f06888`), spätere Merge-Basis |
| 20:50:15 | Commit `740d88b` |
| 20:50:35 | #842 angelegt |
| 20:52:23 | Commit `0001cd3` (Merge von `main`); CI Lauf 180, 20:52:29 bis 20:53:43, «success» |
| 20:54:23 | #840 gemergt (`b529695`, r4-76) |
| 20:57:29 | Commit `cb603b7`; CI Lauf 181, 20:57:35 bis 20:58:45, «success» |
| 22:07:59 | #843 gemergt (`9f7f052`), wird erster Elternteil |
| vor 22:08:30 | «bereit zur Prüfung» (löst Codex aus; genaue Zeit nicht ablesbar) |
| 22:08:30 | #842 gemergt (`7809d52`), Standardtext, kein Auftrag genannt |
| 22:08:35 | Codex-Kommentar angelegt |
| 22:08:54 | Codex «Completed» ohne Befund auf `cb603b7` |

Siehe N842-1.

## Nicht geprüft

- Den Inhalt der Website, Fach- und Rechtsfragen.
- Die Darstellung der Zusammenfassung in der Oberfläche von GitHub; ich habe Logs und API gelesen.
- Die Aussagen von Christa Egger gegenüber der bauenden Sitzung, wer «bereit zur Prüfung» und den Merge ausgelöst hat, und die genauen Zeitpunkte von «bereit zur Prüfung» (#835, #842).
- Den Workflow auf GitHub mit einer neuen Abweichung nach #842 (kein Probe-Branch, Auftrag: CI-Beleg nur lokal). Belegt ist das Scheitern auf GitHub nur für den Stand von #832 (Lauf 174).
- Geräte, andere Browser als Chromium, andere Schriftdarstellung als die von Chromium headless.

## Was diese Prüfung getan und nicht getan hat

- Keine Korrektur, kein Kommentar auf #842, kein Merge, kein Deployment, keine Änderung an `site/` oder an der Pendenzendatei.
- Kein Branch auf GitHub ausser dem Branch dieses Berichts. Varianten, Kopien und Arbeitsbäume lagen ausserhalb des Repositorys.
