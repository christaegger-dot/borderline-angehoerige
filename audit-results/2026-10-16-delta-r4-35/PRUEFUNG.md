# Unabhängige Prüfung r4-35

| | |
| --- | --- |
| Gegenstand | Website «Borderline – Orientierung für Angehörige» (Fachstelle Angehörigenarbeit PUK), Entwurf r4-35: Korrekturrunde A8-K aus R3C-A8 |
| Stand | Branch `claude/a8k-korrektur-1792143386`, Commit `56f29e1`, auf `origin` gleich (`git fetch`, `git ls-remote`). Abgezweigt von `main` `baf366d` (Merge von #698) |
| Diff zu `main` | 7 Dateien: <br>• `authoring/content/behandlung.html`, `genesung.html`, `grenzen.html`, `verstehen.html`: je 1 Zeile, in `genesung` 2. <br>• `authoring/css/site.css`: +5 −2. <br>• `authoring/site.config.json`: Kommentar, Assetversion r4-35, `independentReview` «ausstehend», `reviewScope`, Plan `v-ge-forschung`. <br>• Neu `audit-results/2026-10-16-delta-r4-35/FREIGABE.md`. <br>• `site/`, `authoring/js/`, `authoring/tools/` und `authoring/tests/` gleich `main` |
| Prüfobjekt | Entwurf `node authoring/tools/build.mjs --out=dist/site` aus `56f29e1`, verglichen mit `site/` aus `baf366d` (r4-34). Beide über einen lokalen Server auf 127.0.0.1 |
| Massstab | <br>• `FREIGABE.md` r4-35. <br>• Akzeptanzkriterien von A8-01, A8-02, A8-08, A8-09 und A8-11 in `audit-results/2026-10-16-r3c-a8/BEFUNDE.csv`. <br>• Visualisierungs-Check, Punkte 1 bis 19 aus `07-visualisierung-umsetzen.md`, Leitlinien in derselben Fassung wie in R3C-A8 (`1792129173-abbb`). <br>• Profilausnahme SPZ-40 |
| Prüfsitzung | unabhängig: hat r4-35 weder gebaut noch korrigiert und nichts entschieden. Dieselbe Sitzung hat R3C-A8 geprüft und die Befunde A8-01 bis A8-11 geschrieben. Sie prüft hier also die Umsetzung ihrer eigenen Befunde. Die Varianten zu A8-11 und die Empfehlung V1 stammen von der bauenden Sitzung, gewählt hat die Auftraggeberin. Code und Inhalt sind unverändert; auf Auftrag ist nur diese Datei committet. Fotos und Messdaten liegen nicht im Repository |
| Zeitpunkt | 16.10.2026, etwa 11:50 bis 12:20 MESZ |

## Ergebnis

**Freigabefähig mit Auflagen.** r4-35 enthält genau den freigegebenen Wortlaut und die beschriebene CSS-Korrektur. Die Messungen zeigen nur die erwarteten Unterschiede, und die Suche läuft 216 von 216. Es gibt eine Auflage, R35-01: Die Buildkennung steht noch auf r4-34.

- **A8-01 (= R3C-06):** behoben. «Behandlungsteam» bricht bei 100 % in keiner Breite und keinem Theme mehr, auch nicht bei 1024 px (Akzeptanzkriterium «bei 1024 bis 1440 px kein Wortbruch»). Bei 200 % gilt dasselbe ab 1024 px.
- **A8-02, A8-08, A8-09:** Akzeptanzkriterien erfüllt (Punkt 4).
- **A8-11:** Der Entscheid der Fachstelle am Wortlaut ist dokumentiert (Akzeptanzkriterium). V1 hebt die Gleichsetzung auf, ist für Laien verständlich und von der Quellenangabe gedeckt (Punkt 5).
- **Keine Verschlechterung:** keine neue Überlappung, kein Seitenüberlauf und kein Text ausserhalb einer Figur. Neue Wortbrüche gibt es nur bei 320 und 360 px mit 200 % (SPZ-40).

**`independentReview` kann auf «bestaetigt» gesetzt werden, sobald R35-01 umgesetzt ist.** Die Bestätigung gilt für den Inhalt von `56f29e1`. Für die Änderung aus R35-01 genügt aus meiner Sicht ein Abgleich: Der Export darf sich von diesem Entwurf nur in `data-puk-site-build` und im Kopfkommentar von `css/site.css` unterscheiden. Ändern sich sonst Inhalt, CSS oder Code, braucht es einen neuen Abgleich. Ob dieser Abgleich genügt, entscheidet die Auftraggeberin.

## Ergebnis je Punkt

| Punkt | Ergebnis | Beleg |
| --- | --- | --- |
| 1 Wortlaut | **erfüllt** | `git diff --word-diff baf366d 56f29e1 -- authoring/content/` enthält genau diese Änderungen: «Eigene» → «Eine eigene»; «ist unabhängig davon möglich.» → «können Sie nutzen, ob Sie Auskunft erhalten oder nicht.»; «Impulsive» → «Selbstgefährdende und impulsive»; zweimal «andere» entfernt (Beispiele und Textfassung für Screenreader); «ein Versprechen.» → «eine Garantie.»; «zum Beispiel» eingefügt. Das Markup um die Stellen (`</span>`, `<h3>`, `</p><div`) ist auf beiden Seiten gleich. Eigener Abgleich des sichtbaren Texts aller 23 gebauten Seiten (ohne `script` und `style`) gegen `site/`: Unterschiede nur in `behandlung`, `genesung`, `grenzen` und `verstehen`, Wort für Wort wie in der Tabelle von `FREIGABE.md`. Ziffern, Links und Tagstruktur sind auf 23 von 23 Seiten gleich. `ge-forschung-visual-text` ist wie angekündigt angepasst. `be-kontakt-visual-text` ist unverändert; «davon» hat dort einen Bezug im Satz davor. `visualPlan` › `v-ge-forschung` › `statement` beschreibt die neue Überschrift. |
| 2 CSS | **erfüllt** | Der Diff von `authoring/css/site.css` betrifft nur `.bl-infoflow__direction` (Grid → Flex mit Umbruch, `overflow-wrap:break-word`). Neu ist `.bl-infoflow__direction>span{min-width:0}`. In `@container (max-width:40rem)` ist dieselbe Klasse angepasst (`flex-direction:column`). Dazu kommt ein zweizeiliger Kommentar. Die Klasse steht nur in `behandlung.html`, 2-mal (die zwei Richtungszeilen von `v-be-kontakt`). Im Export ist ausser den HTML-Seiten nur `css/site.css` anders. `js/interaktion.js` (`node --check` ohne Fehler), die Schriften, `_headers`, `_redirects` und `robots.txt` sind bytegleich mit `site/`. |
| 3 Messungen | **erfüllt** | Selbst gemessen mit `fotos.js`, `schrift32.js` und `tablewrap.js` aus `audit-results/2026-10-16-r3c-a8/skripte/`, 312 Ansichten je Stand, Einzelheiten unten. Unterschiede bei 100 %: nur `v-be-kontakt` bei 1280 und 1440 px, Standard und «kontrast»: «Behandlungsteam» (2-mal) bricht nicht mehr. Unterschiede bei 200 %: neu nur «Selbstgefährdende» (`v-ge-forschung`, 320 und 360 px) und «Beispiel» (`v-vs-anspannung`, 320 px), beide unter SPZ-40. In keiner Ansicht Seitenüberlauf, Überlappung oder Text ausserhalb einer Figur. Die Zahlen von `FREIGABE.md` bestätigen sich. |
| 4 Fotos und Visualisierungs-Check | **erfüllt** | Angesehen wie verlangt, Befund je Figur im Abschnitt «Visualisierungs-Check» unten. A8-02: Der Satz hat im Kasten selbst einen Bezug («ob Sie Auskunft erhalten oder nicht»). A8-08: Schritt R und Beispiel widersprechen sich nicht mehr. «So kann ich mich ausruhen und bin beim nächsten Gespräch aufmerksamer.» nennt eine mögliche Folge, keine Garantie. «Garantie» nimmt zudem den Kurztext auf («DEAR garantiert keine Kooperation»). A8-09: Die Zeichen sind als Beispiele gekennzeichnet. |
| 5 A8-11 | **erfüllt** | Begründung unten. Entscheid: Pendenzen A8-K, «Freigabe: Auftraggeberin (Fachstelle)»; `FREIGABE.md`, Antwort «V1 «Selbstgefährdend» (Recommended)». |
| 6 Suche und Sicherheit | **erfüllt** | `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node authoring/tools/suchtest.mjs dist/site`: «Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0», Exit 0. Gegenprobe auf `site/` (r4-34): ebenfalls 216 von 216. 0 `tel:` in beiden Ständen. Die Ziffernfolgen im sichtbaren Text sind auf allen 23 Seiten gleich, also keine neue Nummer. Die Links auf `krise.html` (32 in beiden Ständen) und alle Attribute mit «notfall», «krise» oder «tel:» sind gleich. Kein Notfallblock, kein Satz und kein Link ist dazugekommen. |
| Build | **erfüllt, mit Auflage R35-01** | Entwurf: «Build draft: 23 Seiten · 0 Blocker · 1 Hinweise»; einziger Hinweis `change-review` («Die aktuelle Änderungsrunde wurde noch nicht unabhängig geprüft.»). Ein zweiter Entwurf nach `dist/r435chk` ist gleich `dist/site` (danach gelöscht). Kopie ausserhalb des Repositorys (`git archive 56f29e1`): Mit «ausstehend» blockiert die Produktion («BLOCK \| site \| change-review», Exit 1). Mit «bestaetigt» meldet sie «Build production: 23 Seiten · 0 Blocker · 0 Hinweise», und die Ausgabe ist bytegleich mit dem Entwurf (SHA-256 von 34 Dateien gleich). `--verify-site` meldet dort erwartungsgemäss 24 Abweichungen gegen das alte `site/` (23 Seiten und `css/site.css`). 23 von 23 Seiten tragen `data-puk-site-build="r4-34"` bei 46 × `?v=r4-35`, und der CSS-Kopf sagt «Build r4-34»: R35-01. |

### Messungen im Einzelnen

Browser: Playwright 1.56.0, Chromium 141.0.7390.37. `chromium_headless_shell` für `fotos.js`, volles Chromium (neuer Headless-Modus) für `schrift32.js`. 200 % über das Browserprofil (`default_font_size` 32 px). Die Wurzelschrift ist in allen 84 Ansichten 32 px, auch nach jedem Foto.

| Reihe | Ansichten je Stand | Unterschied r4-34 → r4-35 |
| --- | --- | --- |
| 100 %, `fotos.js` (14 Objekte × 320, 360, 768, 1280, 1440 px Standard, 360 und 1280 px «kontrast») | 98 | nur `v-be-kontakt` 1280 Standard, 1280 «kontrast» und 1440 Standard: «Behandlungsteam» bricht nicht mehr. Gleich geblieben sind «Erwachsenenaufgaben» (`v-ki-alltag`) und «Nicht-Wissens» (`v-vs-eisberg`) bei 320 px, beide SPZ-40. |
| 100 %, 1440 px «kontrast» (`fotos.js`, auf 1440 px eingeschränkt) | 28 | nur `v-be-kontakt` 1440 Standard und «kontrast»: Wortbruch weg |
| 100 %, volles Chromium (`schrift32.js` mit 16 px; 1440, 1280, 1024, 768, 360, 320 px) | 84 | nur `v-be-kontakt` 1280 und 1440 px: Wortbruch weg. Bei 1024 px war schon vorher keiner. |
| 200 % (`schrift32.js` mit 32 px, dieselben Breiten) | 84 | neu nur «Selbstgefährdende» (`v-ge-forschung` 320 und 360 px) und «Beispiel» (`v-vs-anspannung` 320 px). An derselben Stelle brachen schon vorher rund 50 Wörter (SPZ-40). A8-10 ist unverändert: «Informationswege» (`v-be-kontakt`) und «Selbstverletzungen» (`v-ge-forschung`) bei 768 px |
| Rahmen der Tabelle (`tablewrap.js`, 9 Breiten × 100 % und 200 %) | 18 | keiner, Ausgabe zeilengleich (W3C-04 unverändert) |

Die 6 Überlappungen aus `fotos.js` liegen in beiden Ständen gleich in der Tabelle bei 320 und 360 px. Es ist ihre Kopfzeile, die unter 760 px nur für Screenreader da ist; sie zählt wie in R3C-A8 nicht.

## Visualisierungs-Check, Punkte 1 bis 19

Angesehen im Entwurf r4-35, Kontakt und Forschung zusätzlich neben r4-34:

- **Kontakt** (`v-be-kontakt`): 1280, 1440 und 360 px, je Standard und «kontrast»; mit 200 % bei 1280, 1440 und 360 px.
- **Forschung** (`v-ge-forschung`): 1280 und 360 px, je Standard und «kontrast»; 360 px mit 200 %.
- **DEAR** (`v-gr-dear`): 1280 px; 360 px Standard und «kontrast».
- **Kurve** (`v-vs-anspannung`): 1280 px; 360 px mit Stelle 2.

Matrix wie in R3C-A8: E erfüllt, T teilweise, N nicht erfüllt, – trifft nicht zu. Ein Pfeil zeigt eine Änderung gegenüber R3C-A8.

| Nr. | Prüfpunkt | Kurve | DEAR | Kontakt | Forschung |
| --- | --- | --- | --- | --- | --- |
| 1 | Plan liegt vor, Seite entspricht ihm | E | E | E | E |
| 2 | Abschnitt hat Planzeile, Begründung passt | E | E | E | E |
| 3 | Prüffrage konkret, Darstellung löst sie ein | E | E | E | E |
| 4 | Kernaussage und Erklärtext; Hauptaussage nicht nur in Vertiefung | E | E | E | E |
| 5 | Erklärmodell: Ansatzpunkt oder Verzicht; keine Verantwortung zugeschoben | E | E | – | – |
| 6 | Kein Mechanismus doppelt getrennt | E | E | E | E |
| 7 | Kartenraster-Check | E | E | T | E |
| 8 | Anordnung, Formen, Linien tragen Bedeutung | E | E | T | E |
| 9 | Über den Erkenntnisweg verteilt | E | E | E | E |
| 10 | Vereinfacht, Grenzen benannt, Kennzeichnung | E | E | E | E |
| 11 | Ohne Animation, Aufklappen, Skript verständlich | E | E | E | E |
| 12 | Bei 320 px lesbar, Textalternative vollständig | E | E | E | E |
| 13 | Theme «kontrast» | E | E | E | E |
| 14 | Fachlich freigegeben | E | E | E | E |
| 15 | Bildsprache passt zum Thema | E | E | E | E |
| 16 | Metapher ohne Code, Erleben beschriftet | E | – | – | – |
| 17 | Keine ungewollten Bedeutungen | E | E | E | T → E |
| 18 | 200 % Schrift ohne Überlappung und ohne Wortbruch | E | E | T | T |
| 19 | Versprechen des Kurztexts eingelöst | E | E | E | E |

- **Kontakt:**
  - **Richtungszeilen:** Bei 1280 und 1440 px stehen «Angehörige → Behandlungsteam» und «Behandlungsteam → Angehörige» je in einer Zeile, als Gruppe mittig über der Karte. Bei 360 px stehen sie wie bisher untereinander, linksbündig, mit Pfeil nach unten. In «kontrast» sieht es bei allen drei Breiten gleich aus. Mit 200 % stehen bei 1280 und 1440 px die Karten untereinander, und die Richtungszeile steht senkrecht mit Pfeil nach unten, ohne Wortbruch; ebenso bei 360 px.
  - **Kasten:** «Eine eigene Angehörigenberatung können Sie nutzen, ob Sie Auskunft erhalten oder nicht.» steht bei 1280 px auf zwei Zeilen und ist ohne die Karten verständlich (Punkte 4 und 19).
  - **7 und 8 bleiben T** wie in R3C-A8: zwei gleich gezeichnete Karten, die Richtung tragen nur die Wörter. Das gehört nicht zu A8-K (Entscheid «Technisch, Wortlaut bleibt»).
  - **18 bleibt T**, jetzt nur noch wegen A8-10: «Informationswe|ge» bei 768 px mit 200 % (Pendenz R29-P10).
- **Forschung:**
  - **Überschrift:** «Selbstgefährdende und impulsive Handlungen» steht bei 1280 px auf zwei Zeilen, genau so hoch wie «Belastende Gefühle und Beziehungsängste» in der rechten Spalte. Bei 360 px bricht sie nur zwischen Wörtern.
  - **18 bleibt T** wegen A8-10 («Selbstverletzun|gen» bei 768 px mit 200 %). Neu bricht «Selbstgefährd|ende» bei 360 px mit 200 %, unter SPZ-40, wie dort «Selbstverletzun|gen» und «Beziehungsän|gste».
  - **17 ist jetzt E** (Begründung unter A8-11).
- **DEAR:** Schritt R endet bei 1280 und 360 px mit «Machen Sie daraus weder eine Drohung noch eine Garantie.» Das Beispiel darunter liest sich als mögliche Folge (Punkt 19). Der Rest ist unverändert gegenüber R3C-A8.
- **Kurve:** Stelle 2 lautet bei 1280 und 360 px «Zeichen dafür können zum Beispiel sein: Die Stimme wird lauter, Vorwürfe beginnen, der Körper spannt sich an.» Bei 360 px läuft der Satz über sechs Zeilen ohne Wortbruch. Der Rest ist unverändert gegenüber R3C-A8; Punkt 25 (eigener Beispielsatz an Stelle 2) liegt ausserhalb von 1 bis 19 und ist entschieden (Korrektur 1e).

## A8-11

- **Für Laien:**
  - **Überschrift:** «Selbstgefährdend» ist ein geläufiges Wort und heisst wörtlich, was gemeint ist: sich selbst in Gefahr bringen. Die Überschrift ordnet einen Suizidversuch nicht mehr als «impulsive Handlung» ein. «Selbstgefährdende und impulsive Handlungen» liest sich wie «rote und blaue Autos»: zwei Gruppen nebeneinander.
  - **Beispiele:** «Selbstverletzungen, Suizidversuche und impulsive Handlungen» folgen dieser Teilung: die ersten zwei Beispiele für «selbstgefährdend», das dritte für «impulsiv». Ohne das gestrichene «andere» stehen Suizidversuche nicht mehr als Unterfall von «impulsiv» da.
  - **Lesart mit `verstehen` › `borderline`:** Dort steht «impulsives Handeln, etwa beim Geldausgeben …». Die Reihe «Suizidversuch wie Geldausgeben» aus R3C-A8 entsteht deshalb nicht mehr über die Überschrift. Sie entsteht nur noch über die gemeinsame Spalte, und die gibt den Befund der Studie wieder.
  - **Nebenbei:** Das dritte Beispiel wiederholt das Wort der Überschrift («impulsive Handlungen»), ohne konkret zu werden. Das war mit «andere impulsive Handlungen» schon so und ist freigegebener Wortlaut, also kein Befund.
- **Kernaussage:** «Oft gehen Selbstverletzungen und impulsive Handlungen zuerst zurück. Belastende Gefühle wie Wut, Leere oder Einsamkeit bleiben häufig länger.» Sie ist stimmig. Sie nennt eine Auswahl aus der linken Spalte, je eine aus beiden Gruppen, und verwendet «impulsive Handlungen» jetzt im selben, engeren Sinn wie das dritte Beispiel. Vor r4-35 konnte man sie mit der Überschrift «Impulsive Handlungen» so lesen, dass Suizidversuche mitgemeint sind. Dass sie Suizidversuche nicht nennt, widerspricht der Figur nicht. Es verschiebt auch nichts in eine weniger vorsichtige Richtung.
- **Quelle:** Laut PubMed schreibt die Studie: «Symptoms reflecting core areas of impulsivity (e.g., self-mutilation and suicide efforts) … seemed to resolve the most quickly». Sie deutet diese Symptome als «manifestations of acute illness» (Zanarini et al. 2007, Am J Psychiatry 164(6):929–935, PMID 17541053, [DOI 10.1176/ajp.2007.164.6.929](https://doi.org/10.1176/ajp.2007.164.6.929)); selbst nachgesehen, `FREIGABE.md` gibt das richtig wieder. Die Aussage der Spalte bleibt gleich: Diese Symptome gingen in der Studie am schnellsten zurück. Neu ist nur die Gruppenbezeichnung. «Impulsiv» bleibt in der Überschrift, die Studie wird also nicht umgedeutet. Eine Umgruppierung für Laien ist von «Eigene didaktische Darstellung nach Zanarini et al. (2007)» gedeckt. Die Grenzen (eine Studie, zweite Langzeitstudie abweichend, keine persönliche Prognose) stehen unverändert in der Vertiefung.
- **Nicht gewählt:** V3, also ein Satz zur Einschätzung in jeder Phase, mein Vorschlag (c). Entschieden hat die Fachstelle, das ist kein offener Punkt. Im Text vor der Figur steht weiter «Eine Besserung kann wieder verloren gehen.»

## Befunde

| ID | Priorität | Fundstelle | Ist-Zustand und Beleg | Nutzerwirkung | Empfehlung | Akzeptanzkriterium |
| --- | --- | --- | --- | --- | --- | --- |
| R35-01 | wichtig, Auflage vor dem Produktionsexport | `authoring/tools/contract.js`, Zeile 11; `authoring/css/site.css`, Zeile 1 | `const BUILD = 'r4-34';`, CSS-Kopf «… · Build r4-34». Im Entwurf und im Produktionsbuild der Kopie tragen 23 von 23 Seiten `data-puk-site-build="r4-34"`, aber `css/site.css?v=r4-35` und `js/interaktion.js?v=r4-35` (46 ×). `site.config.json` und `FREIGABE.md` nennen «Build r4-35». Die Warnung «Seite nicht mit Build … erzeugt» (`contract.js`, Zeile 371) vergleicht mit derselben Konstante und schlägt deshalb nicht an: «0 Hinweise». In den letzten Runden sind beide Stellen jeweils nachgezogen worden (`138033d`, `ca2a601`, `e4a4013`). | keine sichtbare. Die Produktion würde sich aber als r4-34 ausweisen. Die Produktionsprüfung prüft «Buildmarker und Assets» je Runde (r4-34, Punkt 1); sie würde abweichen oder r4-35 mit r4-34 verwechseln. | `BUILD` auf «r4-35» und den CSS-Kopf auf «Build r4-35» setzen, ohne weitere Änderung. Gegenprobe in der Kopie mit `BUILD` r4-35: «Build production: 23 Seiten · 0 Blocker · 0 Hinweise». 23 Seiten unterscheiden sich vom Entwurf nur in `data-puk-site-build`, alle übrigen Dateien sind bytegleich. Der CSS-Kopf ist ein Kommentar und ändert keine Regel. | 23 von 23 Seiten `data-puk-site-build="r4-35"`, 46 × `?v=r4-35`, CSS-Kopf «Build r4-35». Sonst ist der Export bytegleich mit diesem Entwurf (bis auf die erste Zeile von `css/site.css`). |

Sonst kein Befund. Die übrigen optionalen Befunde aus R3C-A8 (A8-03 bis A8-07, A8-10) sind nicht Teil von A8-K und unverändert.

## Vor dem Merge

1. R35-01 umsetzen und den Abgleich gegen diesen Entwurf festhalten.
2. `independentReview` auf «bestaetigt» setzen und den Produktionsexport nach `site/` schreiben, mit `--verify-site`.
3. Pull Request, Codex-Review auf dem exportierten Kopf und dessen Prüfung, wie bei den vorigen Runden.

## Belege

Im Scratchpad der Prüfsitzung (`/tmp/claude-0/-home-claude/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/r435/`), nicht im Repository:

- Messungen: `alt100/`, `neu100/` (`fotos.js`), `alt1440/`, `neu1440/` (1440 px «kontrast»), `alt16/`, `neu16/` und `alt32/`, `neu32/` (`schrift32.js`, je `messung-schrift16.json` bzw. `messung-schrift32.json`), `tablewrap-alt.txt`, `tablewrap-neu.txt`.
- Fotos: dieselben Ordner, dazu `k1440/` (1440 px mit 200 %) und die Zusammenstellungen in `m/` (`kontakt-*`, `forschung-*`, `dear-*`, `ansp-*`).
- Hilfsskripte: `skripte/fotos1440.js` (Kopie von `fotos.js`, nur 1440 px), `skripte/kontakt1440x32.js`.
- Suche: `such/suchtest-56f29e1.txt`, `such/suchtest-site-baf366d.txt`.
- Build: `prodcopy/` (`git archive 56f29e1`), `prod-ausstehend.log`, `prod-bestaetigt.log`, `prod-b35.log` (Gegenprobe mit `BUILD` r4-35), `prod.sha`, `draft.sha`.
- Entwurf: `/home/claude/borderline-angehoerige/dist/site` (von `.gitignore` erfasst).
