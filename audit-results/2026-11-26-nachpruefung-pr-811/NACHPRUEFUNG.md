# Nachprüfung PR #811 · Layouttest B2c, Nachbesserung N809-2 bis N809-6 · 26.11.2026

**Nachträgliche Prüfung eines gemergten PR.** #811 ist seit 26.11.2026, 15:50:00 UTC auf `main`. Diese Prüfung kann den Merge nicht mehr beeinflussen. Sie beschreibt den Stand von #811 und prüft, ob seine Wirkung auf dem heutigen `main` noch besteht.

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger, 26.11.2026: «Starte eine Nachprüfung von #811 in einer neuen Sitzung».
- **Gegenstand:** [PR #811](https://github.com/christaegger-dot/borderline-angehoerige/pull/811) «Layouttest B2c: Nachbesserung N809-2 bis N809-6».
  - Branch `korrektur/2026-11-26-n809-layouttest-b2c`, Kopf `dec530f`, Basis `5b7e799`. Zwei Commits: `9663ad5` und `dec530f`.
  - Gemergt als `f91db68` am 26.11.2026, 15:50:00 UTC, über das Konto `christaegger-dot`.
  - Geprüft ist `git diff 5b7e799 dec530f`, 7 Dateien, +298/−9: `authoring/tools/layouttest.cjs`, `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`, `authoring/UEBERGABE-GESTALTUNG-2026-10-21.md` und der Nachweis `audit-results/2026-11-26-n809-layouttest-b2c/` (`BERICHT.md`, `gates.txt`, `mut.sh`, `mutationen.txt`).
- **Wer prüft:** eine Claude-Sitzung (`session_011SWztnA8NFS4zzAfqi2ZvA`). Die bauende Sitzung ist laut Commits `session_011SWztmTg34e6BWQNtQDquh`. Sie hat auch #810, #812 und #819 verfasst.
- **Zur Unabhängigkeit:**
  - An #810, #811, #812 und #819 habe ich nicht gearbeitet, auch nicht an #809, #813 bis #818 oder an B2c, NP708-N2 und A04-2014.
  - Gelesen habe ich vor und während der Prüfung: `AGENTS.md`, `AUDIT-AGENT-START.md`, in der Pendenzendatei auf `main` die Kopfzeile und den ganzen Abschnitt «Layouttest · Ausnahme B2c». Dieser Abschnitt beschreibt #811 bereits, mit den Angaben der bauenden Sitzung (aus #812 und #819). Dazu die PR-Beschreibung von #811, den Nachweis von #811, `audit-results/2026-11-26-nachpruefung-pr-809/` (NACHPRUEFUNG.md, mut.sh), `audit-results/2026-11-26-nachpruefung-pr-813/mut.sh` und `mutate.py` und die B2c-Zeilen der Übergabedatei.
  - Der Auftrag an diese Sitzung nennt die Werte 1992 und 1603 px und die 13 Proben. Ich habe sie nicht übernommen, sondern neu gemessen. Proben und Messung sind mit eigenen Skripten gemacht (Beilagen). Für die Gates habe ich die Werkzeuge des Repositorys benutzt.
- **Umgebung:**
  - Node 22.23.5. Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright` (`PLAYWRIGHT_MODULE` gesetzt). Chromium 156.0.8078.4 (Playwright-Revision 1248), headless.
  - Arbeitsbäume von `5b7e799`, `dec530f` und `b72d59d` (`main` heute) ausserhalb des Repositorys. Mutationen an Kopien von `site/` ausserhalb des Repositorys. `site/` im Repository habe ich nicht verändert.
- **Beilagen in diesem Ordner:**
  - `mutate.py`, `mut.sh`, `proben.txt`: eigene Mutationsproben. Jede Probe läuft auf `site/` von `dec530f` gegen den Layouttest von #809 (`5b7e799`), von #811 (`dec530f`) und von `main` (`b72d59d`). Die Commits sind fest, nicht `origin/main`.
  - `mutationen.txt`: Ergebnisse aller 43 Proben.
  - `messung.cjs`, `messung-breiten.json`: eigene Messung der Figur bei 320, 360, 375, 390, 414 und 768 px, mit Standardschrift und 200 % Schrift.
  - `gates.txt`: Schlusszeilen der Gates auf `dec530f` und `b72d59d`.
  - `gegenprobe-mut-sh-811.txt`: das Probenskript aus #811, unverändert ausgeführt (N811-2).

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Ergebnis

**Technisch korrekt; Nachbesserung bei Ablauf und Nachweis empfohlen, ohne Blocker.** #811 setzt N809-2, N809-3 und N809-4 so um, wie es N809-2 bis N809-4 vorschlagen. Alle 13 Fehlerproben werden erkannt, die erlaubte Probe besteht, und die Grenzen 1800 und 2400 px gelten genau. Die Werte 1992 und 1603 px stimmen. Der Merge-Baum entspricht genau `dec530f`. Alle Gates sind auf `dec530f` und auf `main` grün. Auf `main` wirkt #811 unverändert.

Offen ist Folgendes:
- Gemergt wurde vor dem Ende des Codex-Reviews und ohne die Nachprüfung, die #811 selbst als offen nennt (N811-1).
- Neun der 13 Proben lassen sich mit dem Nachweis nicht wiederholen (N811-2).
- Die Prüfung «sichtbar» erkennt einige konstruierte Arten nicht, eine Karte oder den Schutzhinweis zu verstecken (N811-3).
- Pendenzen-, Übergabedatei und Code-Kommentar waren beim Merge veraltet; #812 hat das 4½ Minuten später nachgeführt (N811-4).

## Befunde

### N811-1 · wichtig (Ablauf) · Gemergt vor dem Ende des Codex-Reviews und ohne die eigene Nachprüfung

- **Beleg (GitHub):**
  - PR angelegt um 15:27:14 UTC, gemergt um 15:50:00 UTC über das Konto `christaegger-dot`.
  - Codex-Review auf `dec530f`, Auslöser «Draft marked ready»: «Completed» ohne Befund um 15:50:26 UTC, also **26 Sekunden nach dem Merge**. Der Codex-Kommentar entstand um 15:50:01 UTC.
  - PR-Beschreibung, `BERICHT.md` und der Pendenzenabschnitt von #811 nennen als offen: «Nachprüfung durch eine andere Sitzung; Merge nur auf Auftrag» und «Wert 2400 px bestätigen».
  - Weder die PR-Beschreibung noch der Merge-Commit `f91db68` nennen einen Merge-Auftrag. Der Merge-Commit hat nur den Standardtext.
  - Keine Reviews, keine Review-Threads. Zwei Kommentare: Netlify und Codex.
  - Wann der Entwurf auf «bereit zur Prüfung» gestellt wurde, kann ich mit den verfügbaren Schnittstellen nicht ablesen. Die Pendenzendatei auf `main` nennt «4 Sekunden» davor; diese Angabe stammt aus #812, nicht aus #811. Der Codex-Auslöser «Draft marked ready» und sein Kommentar um 15:50:01 UTC passen dazu.
- **Einordnung:**
  - Das ist dasselbe Muster wie bei N809-1 und N813-1. Inhaltlich folgt kein Schaden: `site/` ist unverändert, Codex fand nichts, und diese Prüfung bestätigt die Wirkung.
  - Die Pendenzendatei auf `main` führt diesen Ablauf schon zutreffend («R28-O01 nicht eingehalten», «Merge-Auftrag auf GitHub nicht belegt»).
- **Vorschlag:** Keine Änderung an #811. Den Merge-Auftrag belegen, wie es die Pendenzendatei für #809 bis #812 schon als offen führt (Christa Egger).

### N811-2 · gering · Neun der 13 Mutationsproben sind mit dem Nachweis nicht wiederholbar

- **Ort:** `audit-results/2026-11-26-n809-layouttest-b2c/mut.sh`, `mutationen.txt`, `BERICHT.md`.
- **Beleg:**
  - `mut.sh` nimmt für alle Proben ausser M0, M5, M8, M10 und M11 das CSS als zweites Argument (`$2`). Die Aufrufe mit diesem CSS stehen nirgends im Nachweis. Für M1, M2, M3, M4, M6, M7, M9, M12 und M13 ist damit nicht festgehalten, was genau geändert wurde.
  - Ohne zweites Argument läuft die Probe **still ohne Mutation**: `mut.sh` setzt dann `<style></style>` ein. Unverändert ausgeführt ergibt `mut.sh M1-vierte-display-none` «0 Abweichungen, Exit 0» statt «only 3 of 4 phase cards visible» (`gegenprobe-mut-sh-811.txt`).
  - Die Vergleichsspalte «#809» entsteht aus `origin/main`. Damals war das `5b7e799`, heute ist es `b72d59d` mit dem Test von #813 und #816. Wer die Proben heute wiederholt, vergleicht nicht mehr mit #809.
  - `mut.sh` erwartet einen Arbeitsbaum `$S/wt809`; im Kommentar steht nur, was er enthalten muss.
- **Gegenprobe:** Ich habe M0 bis M13 mit eigenem CSS nachgebaut (`mutate.py`). Das Ergebnis stimmt in jeder Probe mit `mutationen.txt` überein: #811 rot in allen 13 Fehlerproben, #809 grün in denselben 9 (M1, M2, M3, M4, M7, M9, M10, M11, M12), M13 bei beiden grün. Wo das Markup gleich ist, stimmen auch die Werte: M3 4992 px, M4 1926 px, M11 1960/1571 px, M13 2192 px, M7 bei #809 «931 px». Bei M6 und M7 messe ich 1883 statt 1903 px, weil mein CSS anders vergrössert.
- **Einordnung:** Die Aussagen im Nachweis stimmen. Belegen lassen sie sich aber nur durch Nachbauen. N813-4 hat dasselbe bei #813 festgestellt.
- **Vorschlag:** Einen datierten Nachtrag mit den Aufrufen und dem CSS jeder Probe ablegen, so wie `NACHTRAG-N813-4.md`, und den Vergleichsstand als Commit (`5b7e799`) nennen. Oder auf diese Beilagen verweisen. Den historischen Nachweis nicht ändern.

### N811-3 · gering (Entscheid) · «Sichtbar» erkennt einige Arten nicht, eine Karte oder den Schutzhinweis zu verstecken

- **Ort:** `layouttest.cjs` auf `dec530f`, Zeilen 28 bis 31 (`vis`, `schutzBeforeDetails`); unverändert auf `main`.
- **Beleg (`mutationen.txt`, Werte aus `BROWSER.json` der Läufe):** Bei diesen Proben ist eine Karte oder der Schutzhinweis für Lesende nicht zu sehen. #811 und `main` sind trotzdem grün:

  | Probe | Mutation | #811 und `main` |
  |---|---|---|
  | E6 | vierte Karte visuell versteckt (übliches «sr-only»: 1 × 1 px, `clip`, `position:absolute`) | grün; 4 sichtbare Karten, Ende 1311 px, Figur 1700 px |
  | E7 | vierte Karte `clip-path:inset(100%)` | grün, B2c bestanden, 1603 px |
  | E8 | Liste `max-height:400px; overflow:hidden`, Karten 3 und 4 abgeschnitten | grün; Ende 1603 px, Figur 1439 px |
  | E9 | Text der Karten `color:transparent` | grün, B2c bestanden |
  | E10 | vierte Karte seitlich aus dem Bild verschoben (`translateX(-200vw)`) | grün, B2c bestanden |
  | E21 | vierte Karte auf 2 % verkleinert (`scale(.02)`) | grün, Ende 1328 px |
  | E26 | vierte Karte `opacity:.01` | grün, B2c bestanden |
  | E12 | Überschrift und Absatz der vierten Karte nur ein Nullbreite-Leerzeichen (U+200B) | grün, Ende 1461 px |
  | E14 | Schutzhinweis per `position:relative; top:420px` unter die Aufklappbereiche geschoben | grün, «Schutzhinweis sichtbar» |

  Erkannt werden dagegen `display:none`, `visibility:hidden`, `opacity:0`, `content-visibility:hidden` (E4), `hidden="until-found"` (E1b), Text nur aus Leerzeichen oder `&nbsp;` (E11), ein leerer Schutzhinweis (E16), ein Schutzhinweis mit `opacity:0` (E15) und eine Handlungszeile in einem geschlossenen `<details>` in der Karte (E13).
- **Einordnung:**
  - Alle Fälle sind konstruiert. Das heutige Markup und CSS verstecken nichts davon. #811 verspricht «sichtbar» im Sinn von `checkVisibility`, Höhe und Text. Das hält der Code ein; Pendenzendatei und Bericht beschreiben es so.
  - Bei E14 prüft der Test die Reihenfolge im Quelltext, nicht die Lage auf dem Bildschirm. Im Bericht steht «steht im Quelltext vor dem ersten Aufklappbereich»; das ist korrekt beschrieben. Die Pendenzendatei sagt nur «vor dem ersten Aufklappbereich».
- **Vorschlag (Entscheid, ob der Aufwand lohnt):** Zusätzlich die Lage prüfen: Jede Karte liegt waagrecht innerhalb der Figur und ist mindestens etwa 40 px hoch; ein Punkt in der Überschrift trifft über `elementFromPoint` nach dem Scrollen die Überschrift selbst. Der Schutzhinweis endet oberhalb des ersten Aufklappbereichs (`getBoundingClientRect`). Transparente Schrift, `opacity:.01` und Nullbreite-Zeichen würde auch das nicht erkennen.

### N811-4 · gering · Pendenzen-, Übergabedatei und Code-Kommentar waren beim Merge veraltet

- **Beleg (Stand `dec530f` = `f91db68`):**
  - Pendenzendatei: Überschrift «… · Nachbesserung N809-2 bis N809-6 offen»; #811 «Entwurf, **nicht gemergt**»; «Der Wert 2400 px ist ein Vorschlag … und von Christa Egger zu bestätigen»; unter «Offen» «Merge nur auf Auftrag».
  - Übergabedatei, Nachtrag bei B2c: «(Nachbesserung N809-2 bis N809-4, nicht gemergt)».
  - `layouttest.cjs`, Kommentar: «Wert zur Bestätigung durch die Fachstelle». `BERICHT.md` und PR nennen dagegen Christa Egger als die Person, die bestätigt.
  - Für 2400 px liegt laut Pendenzendatei auf `main` eine Bestätigung von Christa Egger vom 26.11.2026 vor, «auf GitHub nicht belegt». Ob sie vor dem Merge von #811 vorlag, lässt sich nicht feststellen.
- **Einordnung:** Behoben mit [PR #812](https://github.com/christaegger-dot/borderline-angehoerige/pull/812) (`0ddacc5`, 15:54:31 UTC, 4 Minuten 31 Sekunden nach dem Merge). Auf `main` stehen heute Merge, Bestätigung und «bestätigt von Christa Egger» in allen drei Dateien. Das ist dieselbe Folge wie in N809-5: Wer vor der Nachprüfung mergt, hinterlässt einen Text, der von einem offenen PR ausgeht.
- **Vorschlag:** Keiner mehr für den Inhalt. Für künftige PRs: die Dateien so schreiben, dass sie auch nach dem Merge stimmen, oder vor dem Merge nachführen.

### N811-5 · Hinweis · Fehlalarme und Messartefakte in nicht vorhandenen Layouts

- **E18:** Die Karten mit `display:contents` (Inhalt bleibt sichtbar) ergeben «only 0 of 4 phase cards visible». `checkVisibility` ist bei einem Element ohne eigene Box falsch. Das wäre ein Fehlalarm, falls das CSS das je so baut.
- **E5:** Mit `content-visibility:auto` auf den Karten misst der Test die Figur mit 1235 px und das Ende mit 846 px statt 1992 und 1603 px. Die Karten liegen beim Messen ausserhalb des Bildschirms und werden ohne Inhaltshöhe gerechnet. Der Test bleibt grün. Er würde dann auch eine Karte, die in Wirklichkeit unter 1800 px endet, nicht melden.
- **E13b:** Steht in einer Karte ein offenes `<details>`, meldet der Test «protection note not visible before the disclosures». Der Schutzhinweis ist aber sichtbar und steht vor «Mehr zu den vier Phasen». Als erster Aufklappbereich gilt jedes `<details>` in der Figur, auch eines in einer Karte. Die Meldung trifft die Ursache nicht. Ob ein Aufklappbereich in einer Karte zulässig ist, wäre ohnehin zu entscheiden.
- **E1 (Website, nicht Werkzeug):** Das Attribut `hidden` an einer Phasenkarte versteckt sie nicht. `.puk-vis-figure .bl-phase-actions>li{display:flex}` überschreibt die Browser-Regel `[hidden]{display:none}`. Der Test misst richtig, nämlich eine sichtbare Karte, und ist grün.
- **E2, E3:** `inert` und `aria-hidden="true"` auf der Kartenliste lassen den Test grün. Das passt zu einem Kriterium über das, was man sieht. Mit `aria-hidden` wären die Phasen aber für Screenreader weg. Das prüft der Layouttest nicht, und axe-core meldet es nicht zuverlässig.
- **Vorschlag:** Keiner in diesem Auftrag.

### N811-6 · Hinweis · Geltungsbereich und Spielraum

- Die Prüfung gilt nur bei 375 px und mit Standardschrift. Das entspricht A04-2014: «Bei 375 px …», «Bei 200 % gilt die Höhenzielzahl nicht».
- Eigene Messung (`messung-breiten.json`), Figurhöhe / Ende der vierten Karte ab oberem Rand der Figur:

  | Breite | 100 % Schrift | 200 % Schrift |
  |---|---|---|
  | 320 px | 2335 / **1876** | 6942 / 5711 |
  | 360 px | 2095 / 1683 | 6023 / 4931 |
  | 375 px | **1992 / 1603** | 5745 / 4700 |
  | 390 px | 1938 / 1549 | 5402 / 4403 |
  | 414 px | 1924 / 1535 | 4860 / 3955 |
  | 768 px | 1505 / 1191 | 3216 / 2636 |

- Bei 375 px bleiben bis 1800 px 197 px Spielraum, bis 2400 px 408 px. Die Grenzen gelten genau: Ende 1800 px besteht, 1801 px ist rot (E24, E25); Figur 2400 px besteht, 2401 px ist rot (E22, E23).
- Bei 320 px endet die vierte Karte bei 1876 px. Das verletzt A04-2014 nicht, weil das Kriterium 375 px nennt; es zeigt aber, wie nah die Grenze liegt.

### N811-7 · Hinweis · CI prüft den Layouttest weiterhin nicht

- **Beleg:** `.github/workflows/verify-authoring.yml` auf `dec530f` führt Selbsttest, `--verify-site`, Build-Vergleich und Suchtest aus, nicht `layouttest.cjs`. Die grüne CI auf `dec530f` sagt deshalb nichts über die geänderte Prüfung. Das ist N809-7 und in der Pendenzendatei als Entscheid offen.

## Bestätigt

### 1. Merge-Baum

- `git merge-base 5b7e799 dec530f` ist `5b7e799`; `dec530f` liegt also direkt auf der Basis.
- Eltern von `f91db68`: `5b7e799` und `dec530f`.
- `git merge-tree --write-tree 5b7e799 dec530f`, der Baum von `f91db68` und der Baum von `dec530f` sind alle `c3b99580555777cf85b4164b1f04d30587ccd990`. `git diff --stat dec530f f91db68` ist leer. Der Merge enthält genau `dec530f`.

### 2. Umsetzung von N809-2 bis N809-4

- **N809-2:** Eine Karte zählt als sichtbar mit `checkVisibility({opacityProperty:true, visibilityProperty:true})`, Höhe über 0 und nicht leerem Text. Vollständig ist sie mit sichtbarer `h3` und mindestens einem sichtbaren `p`. Das entspricht dem Vorschlag in N809-2. Erkannt: M1, M2, M9, M11, M12, E1b, E4, E11, E13.
- **N809-3:** Das Ende ist das Maximum über alle sichtbaren Karten. Erkannt: M7 (#809: «931 px», #811: 1883 px), E19.
- **N809-4:** Schutzhinweis sichtbar, nicht in einem `<details>`, im Quelltext vor dem ersten `<details>` der Figur; ganze Figur höchstens 2400 px. Erkannt: M3, M4, M10, E15, E16, E23. M13 (+200 px, Figur 2192 px) besteht.
- **Reihenfolge der Bedingungen:** Anzahl, sichtbar, vollständig, Ende, Schutzhinweis, Figurhöhe. Die erste verletzte ergibt die einzige Meldung. Bei zwei Fehlern zugleich (E20: vierte Karte weg und Figur 4700 px) meldet der Test nur «only 3 of 4 phase cards visible». Das ist sinnvoll: Die Bedingungen bauen aufeinander auf, und das Ende wird erst gemessen, wenn alle vier Karten sichtbar sind. Die zweite Abweichung erscheint nach der Behebung der ersten.
- **Bekannt, nicht neu:** Steht die ganze Figur in einem offenen `<details>`, meldet #811 «0 phase cards outside disclosures» (E17). Das haben #813 und #816 geändert; auf `main` lautet die Meldung «figure inside a disclosure» (Entscheid N813-3).

### 3. Messwerte

| Grösse | #811 | gemessen |
|---|---|---|
| Höhe der ganzen Figur bei 375 px | 1992 px | **1992 px** (Layouttest und `messung.cjs`) |
| Ende der vierten Karte ab oberem Rand | 1603 px | **1603 px** |
| Schutzhinweis | – | 1623 bis 1670 px |
| erster Aufklappbereich | – | 1690 px |

### 4. Mutationsproben aus #811

Siehe N811-2: Mit eigenem CSS nachgebaut stimmen alle 14 Ergebnisse (M0 bis M13) in rot/grün mit `mutationen.txt` überein. «13 erkannt, mit #809 blieben 9 grün» stimmt. Die Gegenprobe M0 ist eine Änderung am Test, keine an der Website. Bei #811 nennt ihre Meldung fest «1800px», auf `main` richtig «1500px», weil die Grenze dort eine Konstante ist.

### 5. Gates (`gates.txt`)

| Gate | #811 (Angabe) | `dec530f` | `main` `b72d59d` |
|---|---|---|---|
| `node authoring/tools/selftest.mjs` | 125/125 | **125/125**, Exit 0 | **125/125**, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | 35 byte-gleich | **35 Dateien byte-gleich**, 24 Seiten · 0 Blocker · 20 Hinweise | **35 Dateien byte-gleich**, 24 · 0 · 20 |
| `node authoring/tools/suchtest.mjs site` | 216/216 | **216/216**, JS-Fehler 0 | **216/216**, JS-Fehler 0 |
| `node authoring/tools/sprachtest.mjs site` | 73 | **73**, JS-Fehler 0 | **73**, JS-Fehler 0 |
| `node authoring/tools/layouttest.cjs` | 240 / 27 / 0 | **240 Zustände, 27 Bedienproben, 0 Abweichungen**, Exit 0, B2c bestanden 1992/1603 px | **240 / 27 / 0**, Exit 0, B2c bestanden 1992/1603 px |

Nach den Läufen ist `git status` in beiden Arbeitsbäumen leer.

### 6. Wirkung auf `main`

`git diff dec530f b72d59d -- authoring/tools/layouttest.cjs` zeigt: `vis`, `complete`, das Maximum für das Ende, die Prüfung des Schutzhinweises und die Reihenfolge der Bedingungen sind unverändert. Neu sind die Konstanten `B2C_PHASES`, `B2C_PHASE_END_MAX`, `B2C_FIGURE_MAX` mit denselben Werten (4, 1800, 2400), die Einschränkung auf `<details>` innerhalb der Figur, die vorgeschaltete Bedingung «figure inside a disclosure» und das Feld `exceptions`. In allen 43 Proben ergibt `main` dasselbe rot/grün wie `dec530f`. Anders lautet nur die Meldung bei E17 (gewollt geändert, siehe 2.) und bei M0 (Grenze als Konstante). Die Wirkung von #811 ist erhalten.

### 7. N809-5 und N809-6

- **N809-5 (Pendenzendatei auf `dec530f`):** Alle Punkte des Vorschlags sind umgesetzt: neue Überschrift, Zeile **GitHub:** zu #809, Merge-Angaben, Codex nach dem Merge, «auf GitHub nicht belegt», Chromium 156.0.8078.4 mit Revision 1248, Berichtigung zu «sichtbar», Nachprüfung #810, die Nachbesserung und die offenen Punkte. Kopfzeile und #787 sind wie vorgeschlagen nur als offen vermerkt. Die Beschreibung der Regeln stimmt mit dem Code überein. Veraltet beim Merge: siehe N811-4. Die Angaben zu #809 selbst habe ich nicht neu gegen GitHub geprüft; das hat #810 getan.
- **N809-6 (Übergabedatei):** Der datierte Nachtrag steht direkt unter B2c, nennt Auftrag, #809 und `5b7e799`, erklärt den überholten Satz und verweist auf die Pendenzendatei. Der übrige Text bleibt als Herkunft, `authoring/PRUEFBERICHT.md` ist unverändert. Die Tabelle (Zeile 85) und die Kennzahlen (Zeile 124) mit «1 Abweichung (B2c)» sind Messungen vom 22.10.2026 und ohne Nachtrag vertretbar. Veraltet beim Merge: «nicht gemergt» (N811-4).

### 8. Ablauf auf GitHub

- **CI:** «Standalone authoring verification» (`verify-authoring.yml`), Job `build-and-compare` auf `dec530f`: Erfolg, 15:27:36 bis 15:28:29 UTC ([Lauf 45849294264](https://github.com/christaegger-dot/borderline-angehoerige/actions/runs/45849294264/job/140011107166)). Auf `9663ad5` vorher ebenfalls grün (Lauf 45849252711). Ohne Layouttest (N811-7).
- **Netlify:** Redirect und Header «success», Pages changed «neutral».
- **Codex:** «Completed» ohne Befund um 15:50:26 UTC, Auslöser «Draft marked ready» (N811-1).
- **Merge:** 15:50:00 UTC, Konto `christaegger-dot`, ohne Merge-Auftrag auf GitHub (N811-1).
- Die Angaben dazu in der Pendenzendatei auf `main` (CI 15:27:36 bis 15:28:29, Codex 15:50:26, 26 Sekunden nach dem Merge, keine Review-Threads) stimmen.

### 9. Nicht verändert

`git diff --stat 5b7e799 dec530f` zeigt nur die sieben genannten Dateien. Website, Stylesheet, Skript, Renderer, Konfiguration und `site/` sind unverändert.

## Was diese Prüfung nicht getan hat

Keine Korrektur, kein Kommentar auf #811, keine Änderung an `site/` oder an der Pendenzendatei, kein Merge, kein Deployment. Die Vorschläge in N811-2 und N811-3 bleiben einem eigenen Auftrag vorbehalten.
