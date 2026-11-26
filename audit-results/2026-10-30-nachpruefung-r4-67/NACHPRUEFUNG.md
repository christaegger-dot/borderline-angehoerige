# Nachprüfung r4-67 · 30.10.2026

## Auftrag, Stand, Prüfende

- **Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-67 starten».
- **Gegenstand:** r4-67 aus [PR #795](https://github.com/christaegger-dot/borderline-angehoerige/pull/795), Branch `korrektur/2026-10-30-n62-2-r4-66` (Branchname historisch, Kennung r4-67). Der PR ist **offen, kein Entwurf, nicht gemergt** (`"state":"open"`, `"draft":false`, `"merged":false`, `"mergeable_state":"clean"`).
- **Geprüfter Stand:** `git diff a323fed 51b9b1e`.
  - `a323fed` ist die Merge-Basis mit `origin/main` (`git merge-base` → `a323fed`; r4-65 mit #796 und #794).
  - `51b9b1e` ist der Kopf des Branchs (`git rev-parse` am Anfang und vor dem Commit dieses Berichts gleich).
  - Während der Prüfung ist `main` auf `ec821ab` weitergegangen (#797, #798, um 11:12 und 11:13 UTC). Diese Merges ändern nur `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (`git diff --stat a323fed origin/main` → `1 file changed`). Die Merge-Basis von #795 bleibt `a323fed`, ein Merge mit dem neuen `main` ist konfliktfrei (`git merge-tree --write-tree origin/main 51b9b1e` → Exit 0).
- **Befunde, auf die r4-67 zurückgeht:** N62-1 und N62-2 in `audit-results/2026-10-30-nachpruefung-r4-62/NACHPRUEFUNG.md` ([PR #790](https://github.com/christaegger-dot/borderline-angehoerige/pull/790)).
- **Selbstbericht:** `audit-results/2026-10-30-n62-1-n62-2-r4-67/BERICHT.md`.
- **Prüfende:** eine Sitzung, die r4-67 nicht gebaut hat und weder die Nachprüfung r4-62 noch einen Stand dieser Website verfasst hat. Sie ändert nichts und committet nur diesen Ordner.
- **Umgebung:** Node 22.22.0, Chromium 153.0.8010.12, Playwright global über `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`.
  - r4-65 (`a323fed`) und r4-67 (`51b9b1e`) liegen als eigene Arbeitsbäume ausserhalb des Repositorys (`git worktree add --detach`).
  - In `site/` wurde nichts geschrieben; `build.mjs --write-site` habe ich nicht ausgeführt.
- **Eigene Prüfskripte in diesem Ordner:**
  - `nachpruefung-r4-67.mjs`: 86 eigene Mutationen über `C.gate`, mit derselben Eingabe wie `build.mjs` (`injectSearchIndex`, `renderPage`, Modus `production`, `exists`, `PRUEFBERICHT.md` als `report`), für r4-65, r4-67 und zwei Fehlvarianten. Abgleich mit Chromium über CDP `Accessibility.getPartialAXTree` (nicht `ariaSnapshot`). Ausgabe: `gate-chromium-ausgabe.txt`.
  - `rueckprobe.py`: setzt in Kopien von `authoring/` ausserhalb des Repositorys andere Fassungen von `inSvg` ein und lässt den Selbsttest laufen. Ausgabe: `rueckprobe-ausgabe.txt`.
  - `axe-r4-67.mjs`: axe-core 4.14.0 aus einem eigenen Ordner ausserhalb des Repositorys, geladen mit `page.addScriptTag`. Ausgabe: `axe-ausgabe.txt`.
  - `tests-ausgabe.txt`: Testläufe des Repositorys, Ausgaben mit `tail -4` gekürzt.
  - `nachrechnung-skript-r4-62-ausgabe.txt`: nur zum Nachrechnen der Kennzahl des Selbstberichts habe ich zusätzlich das Skript der Nachprüfung r4-62 unverändert auf r4-65 und r4-67 laufen lassen. Meine Aussagen stützen sich auf die eigenen Skripte.

## Befunde

### N67-1 · gering · Der Entscheid zur Kennung ist im Nachweis unvollständig und uneinheitlich dargestellt

**Ort:** `audit-results/2026-10-30-n62-1-n62-2-r4-67/BERICHT.md:5–10`, `authoring/site.config.json` (`independentReviewWaiver.appliedTo`, Eintrag r4-67), Beschreibung von PR #795, Commit `f99f29b`.

**Beleg:**
- **Bericht:** «Drei Sitzungen haben ihn übermittelt, alle gleichlautend». Genannt sind die Sitzungen von #784 und #787 und die Review-Sitzung von #787.
- **`appliedTo`:** «umbenannt auf Entscheid von Christa Egger, sinngemäss übermittelt durch die Sitzung von PR #784». Die Beschreibung von #795 nennt ebenfalls nur die Sitzung von #784. Die drei Stellen nennen also verschiedene Quellen.
- **Gegenteiliger Wortlaut nicht erwähnt:** Commit `13f471f` auf dem Branch von #787 (11:00:47 UTC) vermerkt: «Ihr früherer gegenteiliger Wortlaut in dieser Sitzung (ca. 10:55 UTC: «#795 behält r4-66, #787 wird r4-67») ist damit überholt». Bestätigt worden sei «#787 behält r4-66» «auf Rückfrage der Review-Sitzung kurz nach 10:58 UTC». Die Pendenzendatei auf `main` (`ec821ab`, Zeile 39) sagt dasselbe und hält fest: «Mitteilung an die Review-Sitzung, auf GitHub nicht belegt».
- **Reihenfolge:** Die Umbenennungs-Commits `f99f29b` (10:57:35 UTC) und `eca7fbd` (10:57:47 UTC) liegen vor der Bestätigung «kurz nach 10:58 UTC». Der Bericht führt diese Bestätigung trotzdem als Quelle.
- **Commit-Meldung:** `f99f29b` meldet «Kennung durchgehend r4-67, … site/ neu gebaut, Prüfungen neu gelaufen». `git show --stat f99f29b` zeigt aber nur fünf umbenannte Dateien (`0 insertions(+), 0 deletions(-)`). Auf `f99f29b` steht deshalb noch `BUILD = 'r4-66'` neben dem Ordner `…-r4-67`. Die Beschreibung von #795 legt das offen («`f99f29b` benennt nur den Nachweisordner um; den Inhalt bringt `eca7fbd`»).
- **Ergebnis stimmt:** #787 trägt `BUILD = 'r4-66'` (`13f471f`, `contract.js:11`), #795 trägt `r4-67`. Der Entscheid in der letzten Fassung ist damit umgesetzt.

**Vorschlag:** Im Bericht den überholten gegenteiligen Wortlaut (um 10:55 UTC) und die Zeitfolge nennen. Die Quellen in Bericht, `appliedTo` und PR-Beschreibung angleichen. Kein Code betroffen, kein Blocker.

### N67-2 · gering · Der Selbsttest sichert nicht ab, dass das `foreignObject` selbst ein SVG-Element bleibt

**Ort:** `authoring/tools/contract.js:46` (`p !== x`) und Selbsttestfall `:933–939`, auf `51b9b1e`.

**Beleg:**
- Laut Bericht und Kommentar (`:44–45`) bleibt das `foreignObject` selbst ein SVG-Element. Chromium bestätigt das: `inert` an `<foreignObject>` blendet das SVG darin nicht aus.
  ```
  K81 | Abb.: SVG role=group > fO inert > svg ohne Namen | figure-alt | figure-alt | – | figure-alt | group«Szene» / image«» | Blocker | ja | ja | NEIN | ja
  ```
  Spalten: Gate r4-65, Gate r4-67, Gate der Variante «foreignObject selbst gilt als HTML», Gate der Variante «jedes foreignObject darüber macht HTML», Chromium, Soll, Übereinstimmungen.
- Die Variante ohne `p !== x` wäre in K81 milder als Chromium. Der Selbsttest bemerkt das nicht (`rueckprobe-ausgabe.txt`):
  ```
  ## Variante: foreignObject selbst gilt als HTML (ohne p !== x)
  Selbsttest: 123/123 bestanden
  ```
- Ebenso unbemerkt bleibt die Variante, die auch ein verschachteltes `<svg>` in `foreignObject` als HTML wertet (123/123). Sie weicht in meinen Fällen aber nicht zum Milderen ab: Chromium zeigt `<svg hidden>` in `foreignObject` weiter als `image «»` (K84), und die SVG-Prüfung wertet `hidden` ohnehin nicht.
- Der neue Selbsttestfall prüft nur die Lockerung, also verborgenes HTML in `foreignObject`. Eine Gegenprobe fehlt.

**Vorschlag:** Bei der nächsten Arbeit an `contract.js` eine Gegenprobe aufnehmen, zum Beispiel K81: `<svg role="group" aria-label="…"><foreignObject inert><svg>…</svg></foreignObject></svg>` in einer Abbildung muss `figure-alt` melden. Keine Wirkung auf die Website: Kein Inhaltsfragment enthält `foreignObject` (`grep -rl foreignObject authoring/content | wc -l` → `0`).

## Bestätigt

### 1. Diff vollständig und eng begrenzt

`git diff --stat a323fed 51b9b1e`: `31 files changed, 297 insertions(+), 79 deletions(-)`.

- **Commits** (`git log a323fed..51b9b1e`):
  - `d01223f`: r4-66, N62-2, 09:58:12 UTC;
  - `1384a9d`: Merge von `main` (#796, #794);
  - `f99f29b`: nur Ordner umbenannt, siehe N67-1;
  - `eca7fbd`: Kennung, Nachweis und `site/` auf r4-67;
  - `51b9b1e`: Quellen im Nachweis.
- **`authoring/`:** Es ändern sich nur `authoring/site.config.json` und `authoring/tools/contract.js`.
- **Unverändert:** Fragmente, Stylesheet, Skript, Suche, `suche-ersttreffer.tsv`, Testskripte, `build.mjs` und Pendenzendatei. `git diff --stat a323fed 51b9b1e -- authoring/content authoring/css authoring/js authoring/tests authoring/tools/build.mjs authoring/tools/selftest.mjs authoring/tools/suchtest.mjs authoring/tools/sprachtest.mjs authoring/tools/layouttest.cjs authoring/tools/search-index.mjs PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md .github netlify.toml` ist leer.
- **`contract.js`:** Es ändern sich nur drei Stellen, alle übrigen Zeilen sind gleich. Renderer, Akuthinweise und Sprungziele sind damit unverändert.
  - `BUILD` (`:11`);
  - Kommentar und `inSvg` (`:43–46`). Entfernt ist nur die alte `inSvg`-Zeile und das Kommentarende `Dort gilt nur aria-hidden. */`;
  - ein neuer Selbsttestblock (`:933–939`), eingefügt vor der Schleife über `MUTATIONS`.
- **Der Parser schreibt Tags klein** (`contract.js:111`: `const t = m[1].toLowerCase()`). Der Vergleich mit `'foreignobject'` greift also auch bei `<foreignObject>`.
- **`site.config.json`:** Es ändern sich nur `assetVersion`, `independentReviewWaiver.version` (je `r4-65` → `r4-67`), `pendingScope` (neuer Anfang r4-67, r4-65 als «Vorher») und `appliedTo` (Zusatz r4-67), laut `git diff --word-diff`.
- **`site/`:** Alle 35 Dateien sind verglichen, die Dateilisten sind gleich. Nach Ersetzen der Build-Kennung (`r4-65` bzw. `r4-67` → Platzhalter, `sha1sum` je Datei) weichen 0 von 35 ab. Im Diff steht keine Zeile ohne `r4-65`/`r4-67`.
  - `r4-65` kommt in `site/` auf `a323fed` 72-mal vor, `r4-67` auf `51b9b1e` 72-mal.
  - Auf `51b9b1e` steht in `site/` kein `r4-65` mehr. Die drei `r4-64` in `site/css/site.css` sind Kommentare und stehen auch auf `main`.
- **Nummerierung r4-67 stimmig:**
  - `BUILD = 'r4-67'` (`contract.js:11`);
  - `assetVersion` und `independentReviewWaiver.version` (`site.config.json:39`) auf `r4-67`;
  - `pendingScope` beginnt mit «r4-67 (begonnen als r4-66; …)»;
  - `appliedTo` endet mit dem Eintrag r4-67 und dem Nachweis `audit-results/2026-10-30-n62-1-n62-2-r4-67/BERICHT.md`;
  - Kommentar `:43` und Selbsttestname «… (r4-67, N62-2)»;
  - `data-puk-site-build="r4-67"` in `site/index.html`.
- **Kein r4-66 stehen geblieben:** `grep -rn "r4-66" authoring site` findet nur die Angaben «begonnen als r4-66» in `pendingScope` und `appliedTo`. Im Bericht steht «r4-66» achtmal, immer als frühere Kennung oder als Kennung von #787.
- **`audit-results/`:** Neu ist nur der Ordner `2026-10-30-n62-1-n62-2-r4-67/` (Bericht und vier Ausgaben).
- **Zeilenangaben im Bericht stimmen:** `:43–45`, `:46`, `:933–939` (`grep -n`, `sed -n`).

### 2. Gate-Regeln gegen Chromium

`gate-chromium-ausgabe.txt`: 86 eigene Mutationen (K1 bis K86). Im Grundzustand melden alle Fassungen 0 Blocker, und Chromium nennt den Link in Zeile und Menü «Kurz und klar».

**Vorgehen:**
- **Soll:** Blocker, wenn Chromium den Link anders als «Kurz und klar» nennt oder ihn nicht im Baum führt; bei der Absenderzeile, wenn sie nicht im Baum steht; bei Abbildungen, wenn ein SVG als `image` ohne Namen im Baum steht.
- **Menü:** Chromium ohne JavaScript bei 1280 px. Das Menü ist mit einem eingefügten Stil sichtbar gemacht, damit Chromium die Menülinks im Baum führt.

**N62-2 behoben, in Zeile und Menü** (K1 bis K5, K17 bis K19, K31 bis K35, K47 bis K49):
- Fälle in `foreignObject`:
  - `<span hidden|inert aria-label>`;
  - `<span hidden|inert>` mit Text;
  - `<div><span hidden>` (tiefer);
  - `<span hidden>` um ein benanntes SVG;
  - `<div inert>` um ein benanntes SVG;
  - doppelt verschachtelt `svg > fO > svg > fO > span hidden`.
- Chromium nennt den Link jeweils «Kurz und klar». r4-65 meldete `utility-nav` bzw. `nav`, r4-67 meldet nichts.

**`<div inert>` in `foreignObject` um ein SVG in einer Abbildung** (K77, K79):
- Chromium führt das innere SVG nicht im Baum (`ign`). r4-65 meldete `figure-alt`, r4-67 nicht.
- Die Kontrollen ohne `inert` (K78, K80) melden in beiden Fassungen `figure-alt`, und Chromium zeigt dort `image «»`. Die Lockerung reicht also nicht weiter als Chromium.

**Unverändert und weiterhin wie Chromium:**
- **`foreignObject` selbst:** Mit `hidden`, `inert` oder `aria-hidden` (K9 bis K12, K39 bis K42, K81) bleibt es ein SVG-Element. Nur `aria-hidden` verbirgt (K12, K42).
- **`aria-hidden`:** an `span` in `foreignObject` (K6, K36) und am äusseren SVG (K13, K43) ohne Blocker, wie in Chromium.
- **Regression zur Nachprüfung r4-62:**
  - `<svg hidden|inert aria-label>` und `<svg hidden><title>` blockieren, Chromium nennt den Link «Kurz und klar Pfeil» bzw. «… Mehr» (K21, K22, K24, K51, K52, K54).
  - `<svg aria-hidden aria-label>` und `<g aria-hidden><title>` blockieren nicht (K23, K27, K53, K57).
  - HTML-`<span hidden|inert>` ausserhalb von SVG blockiert nicht (K29, K30, K59, K60).
  - **Links:** Zeilenlink mit `aria-hidden="true"` oder `inert`, `nav` mit `aria-hidden="yes"`, Menülink mit `inert` oder `aria-hidden="TRUE"`: je Blocker, Chromium führt den Link nicht (K61, K62, K64 bis K66). `aria-hidden="false"` am Zeilenlink: kein Blocker (K63).
  - **Regel `sender`:** Subbar mit `aria-hidden`, `hidden` oder `inert` und Kopf mit `inert` melden `sender`, Chromium führt die Absenderzeile nicht (K67 bis K70). `aria-hidden="false"` an der Absenderzeile: kein Blocker (K71).
  - **Abbildungen:** Szenen-SVG ohne `aria-hidden`, mit `hidden` oder `inert` statt `aria-hidden` meldet `figure-alt`, Chromium zeigt `image «»` (K72 bis K74). `.puk-vis-scene` mit `inert`: kein Blocker (K75).

**Strenger als Chromium, unverändert seit r4-65** (je Zeile und Menü):
- sichtbarer Text oder sichtbares `aria-label` in `foreignObject`, ein benanntes SVG in `foreignObject` und doppelt verschachtelter sichtbarer Text (K7, K8, K14, K20, K37, K38, K44, K50). Chromium nimmt Inhalt eines SVG ohne eigenen Namen nicht in den Linknamen;
- `foreignObject` mit `hidden` oder `inert` (K9 bis K11, K39 bis K41);
- verschachteltes `<svg hidden|inert aria-label>` in `foreignObject` (K15, K16, K45, K46);
- `<g hidden|inert>` mit `<title>` oder `aria-label` (K25, K26, K28, K55, K56, K58), wie in der Nachprüfung r4-62 als vertretbar eingeordnet;
- `hidden` an HTML um ein SVG in `foreignObject` in einer Abbildung (K82, K85). Die SVG-Prüfung wertet `hidden` an Vorfahren bewusst nicht, weil eine Anzeigeregel es aufheben kann (wie M75 der Nachprüfung r4-62).

**Bilanz:**
```
Abweichungen Gate ↔ Chromium: r4-65 44 (strenger 44, milder 0) · r4-67 26 (strenger 26, milder 0)
```
- **Rechnung:** 44 − 18 = 26. Es ändern sich genau 18 Fälle, alle zur Übereinstimmung: K1 bis K5, K17 bis K19, K31 bis K35, K47 bis K49, K77 und K79.
- **Keine Falschmeldung neu:** r4-67 meldet nirgends, wo r4-65 nichts meldete. Die Blocker von r4-67 sind eine Teilmenge der Blocker von r4-65.
- **Keine neue Lücke:** In keinem der 86 Fälle ist r4-67 milder als Chromium.
- **Gelockert:** nur verborgenes HTML in `foreignObject` (`hidden`/`inert` an HTML, über `hiddenFlag` in `concealed`, `accTxt`, `relabelled`) und `inert` an HTML-Vorfahren in `foreignObject` in `svgSilenced`, jeweils wie in Chromium. Das ist vertretbar.
- **Verschärft:** nichts.

**Kennzahl des Selbstberichts nachgerechnet:** Das Skript der Nachprüfung r4-62, unverändert auf r4-65 und r4-67 ausgeführt (`nachrechnung-skript-r4-62-ausgabe.txt`), ergibt:
```
86 Fälle · Abweichungen Gate ↔ Chromium: r4-61 25, r4-62 19 (r4-62: 18 strenger als Chromium, 1 milder als Chromium)
```
- Die Spalten heissen im Skript fest r4-61 und r4-62; gemeint sind r4-65 und r4-67.
- Verschieden sind genau M19 bis M21 und M46 bis M48, wie im Bericht.
- Nach Umbenennen der Spaltenköpfe ist die Ausgabe gleich wie `abgleich-ausgabe.txt` der bauenden Sitzung. Nur die Kopfzeile ist dort leicht gekürzt, ohne den Klammerzusatz `(r4-65)`.

### 3. Selbsttest

`rueckprobe-ausgabe.txt`:

| Fassung von `inSvg` | Ergebnis | scheitert |
|---|---|---|
| r4-67 unverändert | 123/123 | — |
| von r4-65 | 122/123 | genau der neue Fall: `erhalten: utility-nav, nav` |
| `foreignObject` selbst gilt als HTML (eigene Variante) | 123/123 | nichts, siehe N67-2 |
| jedes `foreignObject` darüber macht HTML (eigene Variante) | 123/123 | nichts, ohne Wirkung gegenüber Chromium (K84) |

- **Neuer Fall greift:** Mit dem `inSvg` von r4-65 scheitert er, wie im Bericht (122/123).
- **Bestehende Fälle unverändert:** `selftest.mjs` gibt auf r4-65 und r4-67 dieselben 122 Zeilen aus. `diff` zeigt nur die neue Zeile und die Summe (`122/122` → `123/123`).
- **Im Diff von `contract.js`:** Die Selbsttestblöcke und `MUTATIONS` sind nur ergänzt, nichts ist entfernt oder abgeschwächt.
- **Bewertung:** Der Test ist gleichwertig für alle bisherigen Fälle und verschärft durch den neuen Fall. Er ist aber nur einseitig, siehe N67-2.

### 4. Tests selbst ausgeführt

Auf `51b9b1e` im Arbeitsbaum ausserhalb des Repositorys (`tests-ausgabe.txt`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production` | 24 Seiten · 0 Blocker · 20 Hinweise |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `selftest.mjs` | `Selbsttest: 123/123 bestanden` |
| `suchtest.mjs dist/site` | `216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| `sprachtest.mjs` | `73 Prüfungen bestanden · JS-Fehler 0` |
| `layouttest.cjs` | 240 Seitenzustände, 27 Bedienproben, 1 Abweichung `tension core exceeds 1800px` (bekannte Ausnahme B2c), Exit 1 |

Die Parität belegt, dass der Build auf `51b9b1e` genau `site/` ergibt.

### 5. Barrierefreiheit (Stichprobe)

axe-core 4.14.0 aus einem eigenen Ordner ausserhalb des Repositorys, geladen mit `page.addScriptTag`, auf `dist/site` von `51b9b1e`, 390 und 1280 px, über einen lokalen HTTP-Server (`axe-ausgabe.txt`):

```
build r4-67 · Seiten: 24 · Läufe: 48 · Verstösse: 0 · axe-core 4.14.0 · Chromium 153.0.8010.12
```

### 6. Merge, Review und Kennung

**#795**, abgefragt um etwa 11:05 UTC und vor dem Commit erneut:
- offen, nicht gemergt, Kopf `51b9b1e`, Basis `main`.
- **Codex:** Der Zusammenfassungskommentar (10:53:14 UTC) meldet für `d01223f` «⚠️ **Failed** 2026-10-30T10:53:11Z», Auslöser «Draft marked ready». Um 10:53:17 UTC folgt «You have reached your Codex usage limits for code reviews.».
  - Ein Review auf dem aktuellen Kopf `51b9b1e` gibt es nicht.
  - Reviews: `get_reviews` → `[]`. Review-Threads: `totalCount: 0`.
  - Im Zustandsblock des Kommentars steht trotz «failed» `"has_any_findings":true,"has_unresolved_findings":true`. Sichtbare Befunde gibt es keine; dasselbe steht auf #784. Ich werte das nicht als Befund.
- **CI auf `51b9b1e`:**
  - `build-and-compare`: `success` (10:58:35 bis 10:59:16 UTC);
  - Netlify «Redirect rules» und «Header rules»: `success`;
  - «Pages changed»: `neutral`;
  - Deploy-Vorschau: bereit.
- **Merge:** nicht erfolgt. Damit stellt sich die Frage nach R28-O01 und R29-P20 noch nicht. Ein Merge ist nach diesen Regeln erst nach Codex «Completed» oder auf belegten ausdrücklichen Entscheid von Christa Egger zulässig, wie die Beschreibung von #795 selbst sagt.

**Merge-Reihenfolge mit #787:**
- **#787** ist offen und ein Entwurf, Kopf `13f471f`, Basis `main` (`a323fed`), `BUILD = 'r4-66'`, nicht gemergt.
- Damit hat #795 noch nicht `main` nach #787 eingebracht. Die verlangte Prüfung des zusammengeführten Stands ist am echten Stand noch nicht möglich.
- **Probe-Merge** in einem Arbeitsbaum ausserhalb des Repositorys, verworfen nach der Probe: `13f471f` mit `51b9b1e` zusammengeführt.
  - Konflikte gibt es in `contract.js` nur an `BUILD` und an den zwei benachbarten Selbsttestblöcken, dazu in `site.config.json` und in den 24 Seiten. Das stimmt mit der Erwartung im Bericht überein.
  - Aufgelöst mit beiden Blöcken, `BUILD = 'r4-67'` und der `site.config.json` von #795: `ctlTxt` (N61-2) und das neue `inSvg` (N62-2) stehen zusammen.
  - Ergebnis: `Selbsttest: 126/126 bestanden` und `Build production: 24 Seiten · 0 Blocker · 20 Hinweise`.
  - Beim echten Merge sind `pendingScope` und `appliedTo` von Hand zusammenzuführen.

**Darstellung der Kennungsentscheide gegen GitHub:**
- **N62-1, Entscheid «#784»:** belegt im Kommentar auf #784 vom 30.10.2026, 09:53:08 UTC: «ja, #784 behebt N61-1, nicht #787». Ausserdem steht er in der Beschreibung von #784, wie der Bericht zitiert.
- **#784:** gemergt am 30.10.2026 um 09:52:58 UTC (`"merged_at":"2026-10-30T09:52:58Z"`), wie im Bericht.
- **#787:** hat den Stand von #784 übernommen und enthält nur noch `ctlTxt`. `inSvg` steht auf `13f471f` wie auf `main` (`contract.js:43`).
- **Doppelvergabe r4-66:** `7aa64b6` (#787) um 09:58:13 UTC und `d01223f` (#795) um 09:58:12 UTC, wie im Bericht.
- **Entscheid «#787 behält r4-66, #795 wird r4-67»:** Er stimmt mit #787 (Commit `13f471f`) und der Pendenzendatei auf `main` überein. Die Darstellung im Bericht ist aber unvollständig, siehe N67-1.

### 7. Live-Site (Hinweis, keine Prüfstufe)

`curl -sS https://borderline-angehoerige.netlify.app/` um 2026-10-30T11:11:21Z: HTTP 200, `data-puk-site-build="r4-65"`, `site.css?v=r4-65`. r4-67 ist nicht veröffentlicht, wie es für einen offenen PR zu erwarten ist.

## Nicht prüfbar

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack). Die Aussagen zum Zugänglichkeitsbaum gelten für Chromium 153 über CDP.
- Safari und Firefox, also wie sie `hidden` und `inert` an HTML in `foreignObject`, an `foreignObject` selbst und an verschachtelten SVG werten.
- Reale Geräte, Zoom und Systemeinstellungen ausserhalb von Playwright.
- Das Menü in Chromium nur mit erzwungener Sichtbarkeit und ohne JavaScript. Ein geöffnetes Menü über die echte Bedienung habe ich nicht geprüft; es zählt nur der Linkname.
- Das Codex-Review von #795, weil es am Nutzungslimit scheiterte und auf dem aktuellen Kopf nicht gelaufen ist.
- Der zusammengeführte Stand nach dem Merge von #787, weil #787 noch nicht gemergt ist. Geprüft ist nur der Probe-Merge oben.
- Der Wortlaut des Entscheids zur Kennung. Er ist nur über Mitteilungen anderer Sitzungen und Commits überliefert, auf GitHub nicht direkt von Christa Egger belegt.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**

- r4-67 behebt N62-2 wie verlangt. Die Lockerung reicht genau so weit wie Chromium: 18 Fälle stimmen neu überein, kein Fall wird milder als Chromium, und es gibt keine neue Falschmeldung.
- Die Seiten ändern sich nur in der Build-Kennung, die Kennzahlen des Selbstberichts stimmen.
- N62-1 ist durch den belegten Entscheid «#784» und den Merge von #784 geklärt.
- N67-1 (Darstellung des Kennungsentscheids) und N67-2 (Gegenprobe im Selbsttest) sind gering und können bei der nächsten Arbeit mitlaufen.
- Vor einem Merge von #795 gelten weiter: zuerst #787 mergen, dann `main` einbringen und neu bauen; Codex «Completed» oder ein belegter ausdrücklicher Entscheid von Christa Egger (R28-O01, R29-P20).
