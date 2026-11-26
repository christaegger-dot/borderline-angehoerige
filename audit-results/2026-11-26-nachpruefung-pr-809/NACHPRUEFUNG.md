# Nachprüfung PR #809 · Layouttest B2c · 26.11.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger, 26.11.2026: «Starte eine Nachprüfung von #809 in einer neuen Sitzung».
- **Gegenstand:** [PR #809](https://github.com/christaegger-dot/borderline-angehoerige/pull/809), Branch `claude/sharp-mendel-6ecwbi`, Kopf `2949b00`. Geprüft ist `git diff cec2bbc 2949b00`: `authoring/tools/layouttest.cjs` (+5/−2) und ein neuer Abschnitt oben in `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (+10). Auftrag an den PR: «Lass den Layouttest die Ausnahme B2c als bestanden werten».
- **Abweichung vom Auftrag dieser Prüfung:** Der Auftrag nennt #809 «Entwurf, nicht gemergt». Das stimmt nicht mehr. #809 ist **gemergt** als `5b7e799` am 26.11.2026 um 14:52:50 UTC über das Konto `christaegger-dot`. Der Baum von `5b7e799` ist gleich wie `2949b00` (`git diff --stat` leer). Diese Prüfung betrifft damit den Stand auf `main`. Der Branch `claude/sharp-mendel-6ecwbi` ist auf GitHub gelöscht; geprüft ist `refs/pull/809/head`. Siehe N809-1.
- **Wer prüft:** eine Claude-Sitzung, die an #809 nicht gebaut hat. Die bauende Sitzung ist laut Commit `session_011SWztjZmbGyZgChekUu8gC`. Zur Unabhängigkeit ist offenzulegen:
  - Der Auftrag an diese Sitzung zitiert die Angaben aus #809 (Werte 1992 und 1603 px, 0 Abweichungen, Gegenprobe). Die PR-Beschreibung habe ich gelesen.
  - Die Messungen unten sind mit eigenen Skripten neu gemacht (`messung.cjs`, `mut.sh`). Für die Gates habe ich die Werkzeuge des Repositorys benutzt.
  - Diese Sitzung hat an B2c, NP708-N2 und A04-2014 nicht mitgearbeitet.
- **Umgebung:**
  - Node 22.23.5. Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright` (`PLAYWRIGHT_MODULE` gesetzt). Chromium 156.0.8078.4 (Playwright-Revision 1248), headless.
  - Arbeitsbaum von `2949b00` ausserhalb des Repositorys. Mutationen an Kopien von `site/` ausserhalb des Repositorys. `site/` im Repository habe ich nicht verändert.
- **Beilagen in diesem Ordner:**
  - `messung.cjs`: eigene Messung der Figur bei 375 px (Karten, Handlungszeilen, Schutzhinweis, Aufklappbereiche, Bildlegende);
  - `messung-375.json`: die Ausgabe;
  - `mut.sh`: Mutationsproben, jede gegen den Layouttest aus #809 (`pr`) und den von `main` vor #809 (`main`, `cec2bbc`);
  - `mutationen.txt`: die Ergebnisse;
  - `gates.txt`: Schlusszeilen der Gate-Läufe.

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Ergebnis

**Nachbesserung empfohlen, ohne Blocker.** Die Werte in #809 stimmen. Die neue Prüfung setzt die Lesart von B2c richtig um: vier Phasen in höchstens 1800 px ab dem oberen Rand der Figur, ohne Aufklappen. Alle Gates laufen grün. Die Website ist nicht betroffen.

Folgendes ist offen:
- Gemergt wurde vor der Nachprüfung, die der PR selbst als offen nennt, und vor dem Ende des Codex-Reviews (N809-1).
- Die Prüfung misst nicht, ob die Karten sichtbar sind und eine Handlungszeile haben. Sie misst die letzte Karte im Quelltext, nicht die tiefste (N809-2, N809-3).
- Unterhalb der Karten hat die Figur keine Obergrenze mehr (N809-4).
- Pendenzen- und Übergabedatei sind nicht vollständig nachgeführt (N809-5, N809-6).

## Befunde

### N809-1 · wichtig (Ablauf) · Gemergt vor der eigenen Nachprüfung und vor dem Ende des Codex-Reviews, ohne genannten Merge-Auftrag

- **Beleg:**
  - PR angelegt um 14:51:08 UTC und gemergt um 14:52:50 UTC, also nach 102 Sekunden.
  - Codex-Review auf `2949b00`, ausgelöst durch «Draft marked ready»: «Completed» um 14:53:43 UTC ohne Befund. Das war **53 Sekunden nach dem Merge**.
  - CI `build-and-compare` grün, 14:51:16 bis 14:51:43 UTC.
  - Die PR-Beschreibung und der neue Pendenzenabschnitt nennen beide als offen: «Nachprüfung durch eine andere Sitzung; Merge nur auf Auftrag».
  - Weder die PR-Beschreibung noch der Merge-Commit `5b7e799` nennen einen Merge-Auftrag. Der Merge-Commit enthält nur den Standardtext.
  - Die Pendenzendatei führt seit 30.10.2026 den Grundsatz «nur auf meinen Auftrag mergen». R28-O01 verlangt: erst mergen, wenn das Codex-Review abgeschlossen und geprüft ist.
- **Einordnung:**
  - Ob Christa Egger selbst gemergt hat, lässt sich aus GitHub nicht ablesen. Gemergt hat das Konto `christaegger-dot`.
  - Inhaltlich folgt daraus kein Schaden. `site/` ist unverändert, und das Codex-Review fand nichts.
  - Diese Nachprüfung ist aber nachträglich, nicht vorgängig. Der Pendenzenabschnitt auf `main` ist dadurch schon beim Merge veraltet (N809-5).
- **Vorschlag:** In der Pendenzendatei vermerken: Merge um 14:52:50 UTC, Codex danach ohne Befund, Merge-Auftrag mit Quelle oder «auf GitHub nicht belegt». Dazu diese Nachprüfung.

### N809-2 · gering · «Sichtbar» und «Handlungsmöglichkeiten» werden nicht geprüft

- **Ort:** `authoring/tools/layouttest.cjs:26` (Zählung), `:58` (Bewertung).
- **Beleg:**
  - Der Code filtert nur nach `!li.closest('details')`. Ob eine Karte sichtbar ist, prüft er nicht.
  - PR und Pendenzendatei sprechen trotzdem von «genau vier sichtbare Phasenkarten».
  - Mutationsproben (`mutationen.txt`):
    - **M1**, vierte Karte `display:none`: Zählung 4, Ende negativ. #809 meldet 0 Abweichungen, Exit 0, ohne B2c-Meldung. Der alte Test war hier ebenfalls grün.
    - **M9**, vierte Karte `visibility:hidden`: #809 meldet «Bekannte Ausnahme B2c bestanden … vierte Phase endet bei 1603 px», Exit 0. Der alte Test war rot.
    - **M2**, alle Handlungszeilen der vier Karten ausgeblendet: #809 grün, der alte Test grün.
  - Das Kriterium A04-2014 verlangt «die vier Phasen **und ihre grundlegenden Handlungsmöglichkeiten**». Den zweiten Teil prüft weder der alte noch der neue Test.
- **Einordnung:** Keine dieser Regressionen hat der alte Test erkannt. M9 wäre im alten Test zwar rot gewesen, aber mit derselben Meldung wie dauernd seit B2c. Die Beschreibung der Prüfung verspricht mehr, als der Code prüft.
- **Vorschlag:** Nur Karten zählen, die `li.checkVisibility({visibilityProperty:true,opacityProperty:true})` erfüllen und höher als 0 px sind. Je Karte eine sichtbare, nicht leere Überschrift und einen Absatz verlangen. Oder in der Pendenzendatei «vorhandene» statt «sichtbare» schreiben.

### N809-3 · gering · Gemessen wird die letzte Karte im Quelltext, nicht die tiefste

- **Ort:** `layouttest.cjs:26`, `phases[phases.length-1].getBoundingClientRect().bottom`.
- **Beleg:** Mutation **M7** kehrt die Liste per CSS um (`flex-direction:column-reverse`) und vergrössert sie um 300 px. #809 meldet «vierte Phase endet bei 931 px» und besteht. Die tiefste Karte endet tatsächlich bei etwa 1903 px. Der alte Test war rot.
- **Einordnung:** Konstruiert. Das heutige Markup ordnet nicht um. Robuster und gleich kurz wäre es trotzdem, das Maximum über alle gezählten Karten zu nehmen.
- **Vorschlag:** `Math.max(...phases.map(li=>li.getBoundingClientRect().bottom))`.

### N809-4 · gering (Entscheid) · Unterhalb der vierten Karte gibt es keine Höhengrenze mehr; der Schutzhinweis wird nicht geprüft

- **Beleg:**
  - **M3**: Der Schutzhinweis bekommt 3000 px Innenabstand. #809 meldet «Figur 4992 px hoch … bestanden», Exit 0. Der alte Test war rot.
  - **M4**: Der Schutzhinweis `.bl-fig-schutz` ist ausgeblendet. #809 ist grün, der alte Test rot.
  - A04-2014 verlangt ausserdem «Schutz und Unsicherheit bleiben sichtbar».
- **Einordnung:**
  - Das folgt aus der Lesart von B2c und ist so beauftragt. NP708-N2 liess ausdrücklich offen, ob die Grenze für die ganze Figur gelten soll.
  - Weil der alte Test seit B2c dauernd rot war, hätte er solche Veränderungen praktisch auch nicht gemeldet: Die Meldung blieb immer dieselbe, ohne Messwert.
  - In einem Stand, in dem die Figur wieder unter 1800 px läge, hätte der alte Test sie aber erkannt.
  - **Neu erkannt** werden dafür: Karten im Aufklappbereich (**M5**: #809 rot, «0 visible phase cards», alter Test grün) und eine fünfte Karte (**M8**).
- **Vorschlag (Entscheid Christa Egger):** Optional eine lockere Obergrenze für die ganze Figur, zum Beispiel heutige Höhe plus Reserve. Dazu die Bedingung, dass `.bl-fig-schutz` sichtbar ist und vor dem ersten Aufklappbereich steht.

### N809-5 · gering · Pendenzenabschnitt unvollständig und schon beim Merge veraltet

- **Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:9–17` auf `main`.
- **Beleg:**
  - Es fehlt die in der Datei übliche Zeile **GitHub:** mit Branch, PR-Link, Kopf, Merge-Commit und Zeit.
  - Die Überschrift sagt «offen seit 26.11.2026», «Offen» sagt «Merge nur auf Auftrag». Der Abschnitt steht aber seit 14:52:50 UTC gemergt auf `main`.
  - «Chromium 1248» ist die Playwright-Revision. Die Browserversion ist 156.0.8078.4.
  - «vier sichtbare Phasenkarten» trifft nicht zu (N809-2).
  - Die Kopfzeile «Dokumentationsstand: 30. Oktober 2026 · GitHub main: r4-65 …» ist nicht nachgeführt. Schon vor #809 bestehend: Der Abschnitt «Korrektur · r4-66» führt #787 als «nicht gemergt». #787 ist aber seit 30.10.2026, 11:46 UTC gemergt (`cec2bbc`).
  - Kein eigener Nachweis unter `audit-results/`. Für eine Änderung dieser Grösse ist das vertretbar; die Werte stehen in der PR-Beschreibung.
- **Bestätigt:** Auftrag wörtlich, Verweis auf B2c und NP708-N2, Inhalt der Regel, alle Messwerte und Kennzahlen (siehe unten). Stil und Satzlänge entsprechen der Datei.
- **Vorschlag:** Den Abschnitt in «… · auf `main` seit 26.11.2026» umbenennen. Eine GitHub-Zeile ergänzen, die Merge-Angaben aus N809-1, die Chromium-Version und eine Berichtigung zu «sichtbar». Kopfzeile und Stand von #787 gesondert nachführen.

### N809-6 · gering · Übergabedatei ohne Verweis auf den geänderten Entscheid

- **Ort:** `authoring/UEBERGABE-GESTALTUNG-2026-10-21.md:62` («Die Abweichung im Layouttest ist deshalb begründet und bleibt stehen; Werkzeug und Darstellung bleiben unverändert.»), dazu `:84` und `:123`.
- **Beleg:** #809 ändert diese Datei nicht. Wer B2c dort nachliest, erfährt nicht, dass das Werkzeug seit 26.11.2026 grün ist. Die Pendenzendatei nennt die Änderung des Entscheids, die Übergabedatei verweist nicht zurück.
- **Einordnung:** `authoring/PRUEFBERICHT.md` (`:645`, «bleibt rot») ist ein historischer Nachweis und soll nicht geändert werden. Bei der Übergabedatei genügt ein datierter Nachtrag.
- **Vorschlag:** An B2c anfügen: «Nachtrag 26.11.2026: Auf Auftrag von Christa Egger wertet `layouttest.cjs` B2c als bestanden ([PR #809](https://github.com/christaegger-dot/borderline-angehoerige/pull/809)); siehe Pendenzendatei.»

### N809-7 · Hinweis · CI prüft die Änderung nicht

- **Beleg:** `.github/workflows/verify-authoring.yml` führt Selbsttest, `--verify-site`, Build-Vergleich und Suchtest aus, aber nicht `layouttest.cjs`. Die grüne CI auf #809 sagt deshalb nichts über die geänderte Prüfung. Der Layouttest läuft nur lokal mit Playwright.
- **Vorschlag:** Keiner in diesem Auftrag. Bei Bedarf entscheiden, ob der Layouttest in die CI soll.

## Bestätigt

### 1. Kriterium und Selektor

- **Kriterium:** Massgebend ist A04-2014 (`audit-results/2026-10-18-a04-umsetzung/AUDIT-BEFUNDE.csv:13`): «Bei 375 px sind die vier Phasen und ihre grundlegenden Handlungsmöglichkeiten in höchstens 1800 px Figurhöhe ohne Aufklappen erfassbar.» Dazu der Zusatz: «Bei 200 % gilt die Höhenzielzahl nicht.»
  - Wie B2c misst #809 vom oberen Rand der Figur bis zum Ende der vierten Karte.
  - Die Prüfung gilt nur bei 375 px und ohne vergrösserte Schrift (`!r.large`), wie vorher und wie A04-2014.
  - Die Grenze ist `> 1800` und damit gleich wie vorher.
- **Selektor:**
  - Der Selektor ist `:scope ol.bl-phase-actions > li` innerhalb von `[data-visual-id="v-vs-anspannung"]`.
  - In der Figur gibt es zwei Listen. Nur die erste trägt `bl-phase-actions` (4 Einträge, nicht in `details`). Die zweite steht in «Mehr zu den vier Phasen» (`details`, geschlossen) und hat keine Klasse `bl-phase-actions`. Sie wird nicht gezählt.
  - Der Filter `closest('details')` schliesst sie auch dann aus, wenn sich die Klasse ändert.
- **Fehlerfälle:** Fehlt die Figur, gibt es eine Abweichung («0 visible phase cards»), statt dass der Test abstürzt. Beim alten Test wäre `r.curve.h` an `null` gescheitert.

### 2. Messwerte (eigene Messung, `messung-375.json`)

| Grösse | #809 | gemessen |
|---|---|---|
| Höhe der ganzen Figur bei 375 px | 1992 px | **1992 px** |
| Ende der vierten Phasenkarte ab oberem Rand | 1603 px | **1603 px** |
| Karten 1 bis 4 (oben/unten) | – | 650/818, 830/1102, 1114/1311, 1323/1603 |
| Handlungszeile je Karte | – | vorhanden: «Was hilft», «Argumentieren Sie nicht weiter …», «Was hilft», «Bieten Sie neuen Kontakt nur an …» |
| Schutzhinweis | – | 1623 bis 1670 px, also vor 1800 |
| «Mehr zu den vier Phasen» / «Grenzen des Bildes» | – | 1691 / 1756 px, beide geschlossen |
| Bildlegende | – | 1824 bis 1980 px |

Zum Vergleich der Verlauf: NP708-N2 mass 1942/1508 px, die Nachprüfung 2 1974/1540 px.

### 3. Gates auf `2949b00` (`gates.txt`)

| Gate | #809 | gemessen |
|---|---|---|
| `node authoring/tools/selftest.mjs` | 125/125 | **125/125**, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | 35 Dateien bytegleich | **35 Dateien byte-gleich**, 24 Seiten · 0 Blocker · 20 Hinweise, Exit 0 |
| `node authoring/tools/suchtest.mjs site` | 216/216 | **216/216**, JS-Fehler 0 |
| `node authoring/tools/sprachtest.mjs site` | 73/73 | **73**, JS-Fehler 0 |
| `node authoring/tools/layouttest.cjs` | 240 / 27 / 0, Exit 0 | **240 Zustände, 27 Bedienproben, 0 Abweichungen**, Exit 0, mit der Meldung «Bekannte Ausnahme B2c bestanden: Figur 1992 px hoch, vierte Phase endet bei 1603 px» |
| alter Layouttest (`cec2bbc`) auf derselben `site/` | – | 1 Abweichung `tension core exceeds 1800px`, Exit 1 |
| Gegenprobe: Grenze 1500 px (M0) | 1 Abweichung, Exit 1 | **1 Abweichung, Exit 1** |

Die Meldung der Gegenprobe nennt fest «beyond 1800px», weil nur der Vergleichswert geändert wurde. Für die Prüfung ist das ohne Bedeutung.

### 4. Mutationsproben (`mutationen.txt`)

| Probe | #809 | alt |
|---|---|---|
| M0 Grenze 1500 px | rot | rot |
| M1 vierte Karte `display:none` | grün (N809-2) | grün |
| M2 Handlungszeilen ausgeblendet | grün (N809-2) | grün |
| M3 unterhalb der Karten +3000 px | grün, Meldung B2c (N809-4) | rot |
| M4 Schutzhinweis ausgeblendet | grün (N809-4) | rot |
| M5 Karten in einen Aufklappbereich verschoben | **rot** | grün |
| M6 Karten +300 px | rot | rot |
| M7 Reihenfolge per CSS umgekehrt, +300 px | grün, Ende falsch 931 px (N809-3) | rot |
| M8 fünfte Karte | rot | rot |
| M9 vierte Karte `visibility:hidden` | grün, Meldung B2c (N809-2) | rot |

Zur Frage, ob eine Regression jetzt unbemerkt durchfällt, die vorher aufgefallen wäre: Formal ja, bei M3, M4, M7 und M9. Praktisch war der alte Test seit B2c aber dauernd rot, mit derselben Meldung und ohne Messwert. Diese Fälle wären deshalb auch vorher kaum aufgefallen. M5 erkennt nur der neue Test.

### 5. CI und Reviews von #809

- **CI:** `build-and-compare` (Workflow `verify-authoring.yml`) auf `2949b00` erfolgreich, 14:51:16 bis 14:51:43 UTC ([Lauf](https://github.com/christaegger-dot/borderline-angehoerige/actions/runs/45843158317/job/139989842920)). Den Layouttest enthält die CI nicht (N809-7).
- **Netlify:** Redirect und Header «success», Pages changed «neutral» (Deploy Preview).
- **Codex:** «Completed» ohne Befund um 14:53:43 UTC, nach dem Merge (N809-1). Es gibt keine Review-Threads.
- **Status:** gemergt (`5b7e799`), Branch gelöscht.

### 6. Nicht verändert

`git diff --stat cec2bbc 2949b00` zeigt nur die zwei genannten Dateien. Website, Stylesheet, Skript, Renderer, Konfiguration und `site/` sind unverändert. Die Build-Kennung bleibt deshalb zu Recht dieselbe.

## Was diese Prüfung nicht getan hat

Keine Korrektur, kein Kommentar auf #809, keine Änderung an `site/`, kein Merge, kein Deployment. Die Pendenzendatei ist nicht nachgeführt. Das schlägt N809-5 vor und bleibt einem eigenen Auftrag vorbehalten.
