# Nachprüfung r4-75 · PR #838 (Korrektur der Suchregeln aus r4-74)

**Urteil: Blockiert nach R34-P01: nein. Gegenüber r4-73 finde ich in r4-75 keinen Fall nach a) und b) und nach c) nur einen ohne Sicherheitsbezug («Ich weine oft», Folge des Quellenblocks, nicht der Korrektur). Die Verschlechterungen aus r4-74 (N836-1, N836-2) sind behoben. PR #838 war beim Auftrag zu dieser Prüfung schon gemergt (26.11.2026, 19:51:29 UTC, `e8efa78`); aus Prüfsicht kann r4-75 so stehen bleiben.**

Stand 26.11.2026 · geprüft von der Sitzung, die auch r4-74 nachgeprüft hat (PR #839) und weder r4-74 noch r4-75 gebaut hat · Auftrag von Christa Egger in dieser Sitzung: «prüfe» · Vergleichsstände: r4-73 `9d0d237`, r4-74 `b87535b`, r4-75 `dd49ce8`.

Dieser Ordner enthält Suchanfragen im Wortlaut, auch zu Suizid, Selbstverletzung und Gewalt. Sie gehören nicht in die Pendenzendatei.

## Was r4-75 ändert

Gegenüber r4-74 drei Stellen in `authoring/js/interaktion.js`, acht neue Zeilen in der Testliste, die Kennung und `releaseApproval`:

1. Die 13 Füllwörter aus r4-74 sind keine Füllwörter mehr.
2. «FU» und «IV» zählen nur noch als ganzes Wort, wenn die Anfrage aus einem einzigen Begriff besteht.
3. Zwei Wendungen zur Ohrfeige ersetzen das Füllwort «gegeben».

Alles Übrige aus r4-74 bleibt: neue Begriffe, Tippfehlerregel, Wortstamm-Regel, Regel für Anfragen des Nicht-mehr-Wollens, Kinder-Regel, Gewalt gegen die eigene Person, Quellenblock.

## Befunde

| Kennung | Schweregrad | Befund |
|---|---|---|
| N838-1 | Hinweis | Die Stopp-Regel ist gegenüber r4-73 eingehalten; N836-1 und N836-2 sind behoben |
| N838-2 | niedrig | Ein Fall nach c) ohne Sicherheitsbezug: «Ich weine oft» hat keinen Treffer mehr (Quellenblock, schon in r4-74) |
| N838-3 | niedrig | Kürzel «FU» und «IV» mit weiteren Begriffen: wieder wie r4-73, also wieder Zufallstreffer über «für» und «…iv» |
| N838-4 | niedrig | Ohrfeige: Die Wendung greift; ohne «gegeben» und ohne «mich» bleibt eine Lücke |
| N838-5 | Hinweis | Unverändert offen aus der Nachprüfung von r4-74: N836-4 bis N836-7 und N836-12 |
| N838-6 | Hinweis (Ablauf) | Auch #838 wurde vor einer unabhängigen Prüfung gemergt; ein Merge-Auftrag steht nicht im Merge-Commit |

### N838-1 · Stopp-Regel gegenüber r4-73 eingehalten

Alle Läufe der Nachprüfung von r4-74 noch einmal, jetzt r4-73 gegen r4-75, dazu 67 neue Proben, die der bauenden Sitzung nicht vorlagen (`proben-neu.txt`). Die Anheftung ist direkt gelesen.

| Menge | Anfragen | a) | b) | c) | r4-74 zum Vergleich |
|---|---|---|---|---|---|
| Eigene Proben, Gruppen A bis M | 479 | 0 | 0 | 1 | c) 4 |
| Tötungswort mit früherem Füllwort, natürliche Sätze | 54 | 0 | 0 | 0 | Suizid verloren 20 |
| Aussagen mit früherem Füllwort | 60 | 0 | 0 | 0 | Suizid verloren 14 |
| Neue Proben, Gruppen Q bis S | 67 | 0 | 0 | 0 | siehe `ergebnis/neu-drei-staende.txt` |
| Tötungswort mal Zusätze | 2000 | 2 (künstlich) | 0 | 0 | a) 11, c) 8 |
| Suizid und Gewalt mal Zusätze | 680 | 0 | 0 | 0 | 0 |
| Ich-Aussagen aus Bausteinen | 4416 | – | – | 1 | c) 330 |
| Zwischenstufen beim Tippen | 5452 | 0 | 0 | 1 | c) 15 |

- Die Sätze aus N836-1 und N836-2 führen wieder zuerst auf «Wenn Suizidgedanken ein Thema sind». Die Liste «Tötungswort mit früherem Füllwort» ist zwischen r4-73 und r4-75 in allen 54 Anfragen gleich.
- Die zwei Fälle nach a) im Kombinationslauf sind künstlich: An eine Suiziddrohung ist die neue Wendung «Angst um mein Leben» angehängt. Vorher stand zufällig Kinderschutz zuerst und der Suizidabschnitt nicht unter den ersten zwei; nachher ist der Gewaltabschnitt angeheftet. Der Suizidabschnitt fällt nicht heraus, er war vorher nicht da. Ich werte das nicht als blockierend.
- Der eine Fall beim Tippen ist eine Zwischenstufe («Meine Frau schlägt unse»), die nach dem nächsten Buchstaben wieder Treffer hat.
- In vier Proben wechselt ein Sicherheitsabschnitt den Platz, ohne dass einer verloren geht (Suizid vor Gewalt bei einem Wort mit Suizid-Wortstamm, Selbstverletzung statt Suizid bei «Selbstverletzungen», «Berufsgeheimnis» neu zuerst auf «Auskunft»). In einer neuen Probe («… er schlägt mich tot») ersetzt der angeheftete Gewaltabschnitt einen zufälligen Suizidtreffer.

Dateien: `ergebnis/auswertung-r73-r75.txt`, `ergebnis/auswertung-r74-r75.txt`, `ergebnis/kombinationen-r73-r75/`.

### N838-2 · «Ich weine oft» ohne Treffer (niedrig)

r4-73 führte auf «Begleiterkrankungen und Medikamente», r4-75 hat keinen Treffer. Ursache ist der Quellenblock (SU-05): Der Treffer kam vom Autorennamen «Weiner» in «Quellen zu dieser Seite», der seit r4-74 nicht mehr zum Abschnitt zählt. Die Korrektur r4-75 hat damit nichts zu tun. Dem Wortlaut nach ist das eine klare Ich-Aussage, die ihren Treffer verliert; der Treffer war aber sachfremd und die Aussage hat keinen Sicherheitsbezug. Ich werte es nicht als blockierend. Wer c) streng nach dem Wortlaut liest, kommt hier zu einem Fall; der Entscheid liegt bei Christa Egger.

### N838-3 · «FU» und «IV» mit weiteren Begriffen (niedrig)

- Allein: «FU» führt zuerst auf den Begriff «FU», wie in r4-74. «IV» allein führt auf einen Quelleneintrag.
- Mit einem Suizidwort: «FU Suizid», «FU nach Suizidversuch», «Zwangseinweisung Suizid» führen wieder zuerst auf den Suizidabschnitt (r4-74: nur «Begriffe»). Das war der zusätzliche Fehler in r4-74, den die bauende Sitzung gemeldet hat; ich habe ihn nachgemessen und bestätige ihn.
- Mit anderen Begriffen gilt wieder r4-73, einschliesslich der Zufallstreffer: «FU oder freiwillig» führt auf «Schuld», «Wie lange dauert eine FU» auf die Behandlungsdauer, «IV Rente» auf die Medikamentenfrage. r4-74 war hier treffender («Einweisung» zuerst), aber mit dem Preis des Suizidfehlers. Das gehört in ein späteres Release mit Prüfung vor dem Merge.

### N838-4 · Ohrfeige (niedrig)

«Er hat mir wieder eine Ohrfeige gegeben», «Sie hat mir schon oft Ohrfeigen gegeben», «Er hat dem Kind eine Ohrfeige gegeben» führen auf den Gewaltabschnitt oder den Kinderschutz (r4-73: kein Treffer). «Ich habe ihr eine Ohrfeige gegeben» führt neu auf den Gewaltabschnitt (r4-74: sachfremd). Lücke: «Sie gab mir eine Ohrfeige» führt in allen drei Ständen nicht auf den Gewaltabschnitt unter den ersten zwei.

### N838-5 · Offen aus der Nachprüfung von r4-74

r4-75 ändert nichts an: Kinder-Regel (N836-4), Gewalt gegen die eigene Person (N836-5), Anfragen des Nicht-mehr-Wollens samt Aufblitzen beim Tippen bei weiterhin 16 von 208 Sätzen (N836-6), Fehltreffern der neuen Begriffe (N836-7) und den vorbestehenden Lücken der Erkennung von Tötungsverben (N836-12). Mit der Rücknahme der Füllwörter kehren auch die Zufallstreffer zurück: Alltagssätze mit «immer wieder» führen wie vor r4-74 auf den Suizidabschnitt. Das nennt die PR-Beschreibung von #838 selbst.

### N838-6 · Ablauf

PR #838: erstellt 19:36:01 UTC, gemergt 19:51:29 UTC über das Konto von Christa Egger, rund zweieinhalb Minuten nach dem Eröffnen von PR #839 mit dem Bericht zu r4-74. Der Merge-Commit `e8efa78` enthält keinen Merge-Auftrag im Wortlaut (R65-P01). Die PR-Beschreibung nennt offen, dass die Korrektur nur von der Sitzung gemessen war, die den Fehler gemacht hat. Ob ein Auftrag in einer Sitzung erteilt wurde, kann ich nicht sehen. Dass eine verschlechterte Fassung live war, spricht für einen raschen Merge; festgehalten ist es hier, weil die Regel den Wortlaut im Merge-Commit oder in der PR-Beschreibung verlangt.

## Weitere Prüfungen

- **Gates auf `dd49ce8`** (`ergebnis/gates/`): Build 24 Seiten · 0 Blocker · 20 Hinweise, `git status` danach leer; Parität 35 Dateien byte-gleich; Selbsttest 127 von 127; Suchtest 261 von 261, 0 JS-Fehler; Sprachtest 74; Layouttest 2 bekannte Abweichungen, 0 neue (Rückgabewert 1).
- **Diff von `site/` gegenüber r4-74:** 24 HTML-Dateien nur in der Kennung, dazu `js/interaktion.js`. Suchindex, Stylesheet und sichtbarer Wortlaut unverändert. Die Bedienprüfung bei 375 px und 200 % Schrift aus der Nachprüfung von r4-74 gilt deshalb weiter; ich habe sie nicht wiederholt.
- **Testliste:** acht neue Zeilen, keine bestehende geändert.
- **Release-Felder:** `BUILD`, `assetVersion` und `independentReviewWaiver.version` «r4-75»; `pendingScope` beschreibt die Korrektur zutreffend.
- **JS-Fehler:** 0 in allen Läufen.

## Grenzen

- Chromium über Playwright; keine echten Geräte, keine Screenreader, kein axe-core-Lauf.
- Live-Stand nicht geprüft.
- Die Wortliste (Tippfehler- und Wortstamm-Regel) habe ich nicht erneut laufen lassen; der Code dieser Regeln ist zwischen r4-74 und r4-75 unverändert.
- Die Pendenzendatei auf `main` habe ich für diese Prüfung nicht gegengelesen.
- Die bauende Sitzung hat meine früheren Proben aus dem Sitzungsverlauf übernommen. Unabhängig sind deshalb vor allem die 67 neuen Proben und die Kombinationsläufe, die ihr nicht vorlagen. Alle Proben sind selbst gewählt, keine Stichprobe echter Suchanfragen.
- Dieselbe Sitzung hat r4-74 geprüft und die Eingrenzung geliefert, auf der die Korrektur beruht; ganz unbeteiligt ist sie an r4-75 damit nicht.

## Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
git worktree add /tmp/r73 9d0d237 && git worktree add /tmp/r74 b87535b && git worktree add /tmp/r75 dd49ce8
A=audit-results/2026-11-26-nachpruefung-r4-74; B=audit-results/2026-11-26-nachpruefung-r4-75
node $A/lauf.cjs /tmp/r73/site /tmp/r75/site proben $B/proben-neu.txt /tmp/neu.txt
node $B/auswertung.cjs /tmp/neu.txt
node $A/kombinationen.cjs /tmp/r73/site /tmp/r75/site /tmp/ausgabe
```
