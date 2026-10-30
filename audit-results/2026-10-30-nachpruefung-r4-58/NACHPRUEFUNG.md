# Nachprüfung r4-58 · 30.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-58 starten».
- **Gegenstand:** die Änderungen von r4-58 gegenüber dem Stand davor, also `git diff 95b1f7b 8fecce5`. `8fecce5` ist der Merge von [PR #764](https://github.com/christaegger-dot/borderline-angehoerige/pull/764), gemergt am 30.10.2026, 06:01:18 UTC.
- **Selbstbericht der bauenden Sitzung:** `audit-results/2026-10-30-n57-1-n57-2-r4-58/BERICHT.md`. Er setzt N57-1 und N57-2 aus `audit-results/2026-10-29-nachpruefung-r4-57/NACHPRUEFUNG.md` um.
- **Wer prüft:** eine Claude-Sitzung, die an r4-58 nicht gebaut hat. Sie hat auch die Nachprüfung r4-57 nicht verfasst. Sie hat keine Inhalte und keinen Code geändert und committet nur diesen Ordner. `site/` ist nicht beschrieben worden: `git status --short` war nach allen Läufen leer, `dist/` ist ignoriert.
- **Umgebung:**
  - Node 22.22.0.
  - Chromium mit Playwright global (`PLAYWRIGHT_MODULE=$(npm root -g)/playwright`).
  - axe-core 4.14.0 in einem eigenen Ordner ausserhalb des Repositorys.
  - Den Stand r4-57 (`95b1f7b`) habe ich mit `git archive 95b1f7b` ausserhalb des Repositorys entpackt.
- **Beilagen in diesem Ordner:** `mutationen.mjs` (Prüfskript für die Mutationen, Aufruf `node mutationen.mjs <authoring-Ordner>`) und `mutationen-ausgabe.txt` (Ausgabe für r4-57 und r4-58).

## Ergebnis

**Empfehlung: «Nachbesserung nötig, ohne Blocker».**

N57-1 und N57-2 sind behoben. Die neuen Regeln greifen in allen verlangten Fällen, auch über Vorfahren und auf anderen Seiten als `index`. Es gibt keine Falsch-Positiven. Die fünf neuen Selbsttestfälle scheitern mit den Regeln von r4-57 (93/98). Die Seiten ändern sich nur in der Build-Kennung, und alle Tests laufen wie berichtet.

Es bleiben vier Befunde:
- **N58-1, gering:** eine Lücke in `concealed` bei Schreibvarianten von `aria-hidden` und bei `inert`.
- **N58-2, gering:** eine nicht nachvollziehbare Kennzahl im Selbstbericht («39 Mutationen»).
- **N58-3, wichtig:** Der Merge kam erneut vor dem Abschluss des Codex-Reviews. Das betrifft das Verfahren; Folgen hat es keine, weil das Review ohne Befund blieb.
- **N58-4, gering:** Die Pendenzendatei auf `main` führt r4-58 noch als Entwurf.

## Befunde

### N58-1 · gering · `concealed` erkennt `aria-hidden="TRUE"` und `inert` nicht

- **Ort:** `authoring/tools/contract.js:35` (`concealed`), angewendet in `:531` (Zeile) und `:548` (Menü).
- **Beleg:**
  - **Gate:** `concealed` vergleicht exakt mit `=== 'true'`. Der Parser schreibt Attributnamen klein, Werte aber nicht (`contract.js:93`). Eigene Mutationen über `C.gate` (siehe `mutationen-ausgabe.txt`) ergeben mit r4-58 **keinen** Blocker:
    - D1 `aria-hidden="TRUE"` auf der Zeile «Direkteinstiege»;
    - D2 `inert` auf der Zeile;
    - D5 Linktext in `<span aria-hidden="true">` (der zugängliche Name des Links wird leer).
  - **Chromium:** Ich habe mit Playwright den Zugänglichkeitsbaum gelesen (`locator('main').ariaSnapshot()`). `<nav aria-label="Direkteinstiege" aria-hidden="TRUE">` ergibt `"- main"`: Die Zeile ist für Screenreader weg. Mit `aria-hidden=" true "` (mit Leerzeichen) bleibt die Zeile sichtbar; das Gate hat dort also zu Recht nichts gemeldet. Bei D5 lautet die Ausgabe `link:` ohne Namen.
  - `inert` macht die Links nicht bedienbar und nimmt sie aus dem Fokus. Die Regel will laut Kommentar (`:33–34`) aber, dass die Direkteinstiege erreichbar bleiben.
- **Einordnung:**
  - Der Renderer erzeugt keine dieser Formen, und `site/` ist generiert. Eine Folge hätte die Lücke nur bei einem künftigen Eingriff in den Renderer.
  - D5 würde axe-core als `link-name` melden.
  - `display: none` über `style` (D3) erkennt die Regel nicht. Diese Grenze nennt der Selbstbericht selbst.
- **Vorschlag:** nicht dringend. Bei der nächsten Arbeit an `contract.js`:
  - den Wert von `aria-hidden` vor dem Vergleich klein schreiben;
  - `inert` wie `hidden` behandeln.

  Alternativ die Grenze im Kommentar `:33–34` und im Bericht nennen.

### N58-2 · gering · «39 Mutationen» der Nachprüfung r4-57 ist nicht nachvollziehbar

- **Ort:** `audit-results/2026-10-30-n57-1-n57-2-r4-58/BERICHT.md:40–42` und Beschreibung von PR #764 («Die 39 Fälle der Nachprüfung ergeben 36-mal dasselbe wie r4-57, 3-mal neu einen Blocker»).
- **Beleg:** Die Tabelle in `audit-results/2026-10-29-nachpruefung-r4-57/NACHPRUEFUNG.md` hat 38 Zeilen, und darin ist «M0 Bestand» mitgezählt. Gezählt mit `grep -cE '^\| (M|V)[0-9]' …/NACHPRUEFUNG.md` → `38`. Die Zeilen sind M0, M1, M1b, M2, M3, M3b, M4, M5, M5b, M5c, M6, M6b, M7, M7b, M7c, M8, M9, M9b, M9d, M9c, M10, M11b, M12, M12b, M12c, M13, M13b, V1–V4, M14, M15, M16, M16b, M17, M18, M19. Also gibt es 37 Mutationen und den Bestand. Die Aufteilung «36 + 3 = 39» ist so nicht belegt.
- **Einordnung:** Inhaltlich ohne Folge. Die drei neu blockierten Fälle (M15, M16, M16b) habe ich selbst nachgestellt (B1, A1, A2), und sie blockieren. Das passt zur Hinweisregel, wonach Kennzahlen zu prüfen sind.
- **Vorschlag:** bei der nächsten Nachführung die Zahl berichtigen (37 Mutationen und Bestand, oder die fehlende 39. Mutation nennen).

### N58-3 · wichtig · Merge vor Abschluss des Codex-Reviews (R28-O01, R29-P20)

- **Ort:** [PR #764](https://github.com/christaegger-dot/borderline-angehoerige/pull/764).
- **Beleg** (GitHub-API, `pull_request_read`):
  - PR #764: `merged_at: 2026-10-30T06:01:18Z`, `merged_by: christaegger-dot`, Kopf `d9946b6`.
  - Zusammenfassungskommentar des Codex-Reviews (`chatgpt-codex-connector[bot]`):
    - erstellt am 2026-10-30, 06:00:56 UTC;
    - Status «✅ Completed 2026-10-30T06:01:46.334642Z»;
    - Commit `d9946b6`, Auslöser «Draft marked ready»;
    - Zustand `"has_any_findings":false,"has_unresolved_findings":false,"status":"completed"`.
  - Review-Threads: `totalCount: 0`. Reviews: keine.
- **Feststellung:**
  - Der Merge kam 28 Sekunden vor dem Abschluss des Reviews, also vor einem abgeschlossenen und gelesenen Review.
  - Die Merge-Regeln R28-O01 und R29-P20 sind damit **nicht eingehalten**.
  - Der Vermerk im Abschnitt r4-56 der Pendenzendatei (`PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:80–84`) sagt: «Ab jetzt mergt die bauende Sitzung erst nach abgeschlossenem und gelesenem Codex-Review.» Auch das ist bei diesem Merge nicht erfüllt.
- **Folgen:** keine. Das Review ist inzwischen abgeschlossen und hat keine Befunde.
- **Schweregrad:** wichtig, weil sich das Muster nach PR #753 und #759 wiederholt, obwohl die Regel ausdrücklich bekräftigt wurde. Es betrifft das Verfahren, nicht die Website.
- **Vorschlag:** Den Verstoss in der Pendenzendatei nachtragen, wie beim Vermerk zu r4-56. Vor dem Merge den Status `completed` im Zusammenfassungskommentar abwarten.

### N58-4 · gering · Pendenzendatei auf `main` führt r4-58 als Entwurf

- **Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:3`, `:9`, `:11`, `:45` auf `8fecce5`.
- **Beleg:** Dort stehen «Offener Entwurf: r4-58», «Entwurf vom 30.10.2026», «(Entwurf), **nicht gemergt**» und «in r4-58 umgesetzt (Entwurf)». PR #764 ist aber gemergt (`merged: true`), und die Live-Site liefert r4-58 aus (siehe unten).
- **Vorschlag:** Die Datei zusammen mit N58-3 und dieser Nachprüfung nachführen. Diese Nachprüfung ändert die Datei nicht.

## Was bestätigt ist

### 1. Diff vollständig

`git diff --stat 95b1f7b 8fecce5`: 28 Dateien, 213 Zeilen hinzugefügt, 86 entfernt.
- `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (43 Zeilen);
- `audit-results/2026-10-30-n57-1-n57-2-r4-58/BERICHT.md` (neu, 71 Zeilen);
- `authoring/site.config.json` (8 Zeilen), `authoring/tools/contract.js` (33 Zeilen);
- 24 Seiten in `site/`, je 6 Zeilen.

`git diff --name-only 95b1f7b 8fecce5 -- authoring/` ergibt nur `authoring/site.config.json` und `authoring/tools/contract.js`.

**Unverändert:** Die Ausgabe dieses Befehls ist leer:

```
git diff --stat 95b1f7b 8fecce5 -- authoring/content authoring/css authoring/js authoring/tools/search-index.mjs authoring/tests authoring/tools/selftest.mjs authoring/tools/layouttest.cjs authoring/tools/sprachtest.mjs authoring/tools/suchtest.mjs authoring/tools/build.mjs site/css site/js site/assets
```

Unverändert sind also:
- Fragmente, also Wortlaut, Akuthinweise und Sprungziele;
- Stylesheet und Skript, in der Quelle wie in `site/`;
- Suche und `authoring/tests/suche-ersttreffer.tsv`;
- alle vier Testskripte und `build.mjs`.

**`contract.js`** (ganzer Diff gelesen):
- `BUILD`: «r4-57» → «r4-58» (`:11`).
- **N57-1:** Drei Kommentare (`:24`, `:515`, `:542`) und vier Selbsttestnamen (`:688–691`) nennen jetzt «r4-57». Das sind sieben Zeilen. Auf `95b1f7b` ergibt `grep -c 'r4-55'` den Wert `7`. Die Angabe «sechs Treffer» der Nachprüfung r4-57 war also falsch; der Selbstbericht hat das richtig berichtigt. Auf `8fecce5` ergibt `grep -c 'r4-55' authoring/tools/contract.js` den Wert **`0`**.
- An den vier umbenannten `MUTATIONS`-Zeilen ist nur der Name geändert; Erwartung und Mutationsfunktion sind gleich.
- **N57-2:**
  - Neue Hilfsfunktionen `concealed` (`:35`) und `relabelled` (`:36`) mit Kommentar «r4-58 (Nachprüfung N57-2)» (`:33–34`).
  - Zeile «Direkteinstiege»: Blocker `utility-nav` (`:529–532`).
  - Menü: Blocker `nav` (`:546–549`).
  - Fünf neue `MUTATIONS`-Zeilen mit «(r4-58, N57-2)» (`:692–696`).
  - Sonst nichts.
- **Renderer** (`renderPage`): nicht geändert.

**`site.config.json`** (`git diff --word-diff=porcelain`): geändert sind genau vier Werte.
- `assetVersion`: «r4-57» → «r4-58».
- `releaseApproval.independentReviewWaiver.version`: «r4-57» → «r4-58».
- `pendingScope`: vorangestellter Eintrag zu r4-58 («Befunde N57-1 und N57-2 … Nur Prüfwerkzeug; Seiten bis auf die Build-Kennung unverändert, kein Wortlaut. Vorher: r4-57 …»).
- `appliedTo`: angehängt «… r4-57 von Christa Egger am 29.10.2026 gemergt (PR #756), Nachprüfung r4-57 … (PR #761); r4-58 am 30.10.2026 im Auftrag «Nachbesserung N57-1 und N57-2 umsetzen» … gebaut von der Sitzung, die die Nachprüfung r4-57 erstellt hat …».

Die Nummerierung ist stimmig: in Kommentaren, Selbsttestnamen, `BUILD` und den vier Konfigurationswerten.

**Seiten in `site/`:** Ich habe alle 35 Dateien unter `site/` verglichen. Je Datei: `git show 95b1f7b:<f>` mit «r4-57» → «rX» gegen `git show 8fecce5:<f>` mit «r4-58» → «rX», über `md5sum`. Ergebnis: `Abweichungen: 0 von 35`.
- Im Diff von `site/` kommen genau 72 Vorkommen von «r4-57» vor, die durch «r4-58» ersetzt sind (24 Seiten × 3).
- Das sind `data-puk-site-build` und `?v=` an Stylesheet und Skript.

### 2. Gate-Regeln mit eigenen Mutationen

**Vorgehen** (`mutationen.mjs`):
- Die Eingabe ist wie in `build.mjs:44–58`:
  - `C.renderPage` mit `injectSearchIndex`;
  - `C.gate` im Modus `production`;
  - `report` = `authoring/PRUEFBERICHT.md`;
  - `exists` = gerenderte Seite oder Datei unter `authoring/`.
- Gezählt sind nur Befunde, die gegenüber dem Bestand neu sind.
- Bestand: in beiden Ständen 0 Blocker, 20 Hinweise.

| Nr. | Mutation (auf `index.html`, wo nicht anders angegeben) | r4-57 | r4-58 |
|---|---|---|---|
| A1 | `aria-hidden="true"` auf der Zeile | keiner | 1 × `utility-nav` «verborgen» |
| A2 | `hidden` auf der Zeile | keiner | 1 × `utility-nav` |
| A3 | `aria-hidden="true"` auf einem Link der Zeile | keiner | 1 × `utility-nav` |
| A4 | `hidden` auf einem Link der Zeile | keiner | 1 × `utility-nav` |
| A5 | `aria-hidden="true"` auf `<li>` im Menü | keiner | 1 × `nav` «im Menü … verborgen» |
| A6 | `hidden` auf `<li>` im Menü | keiner | 1 × `nav` |
| A7 | `aria-hidden="true"` auf einem Menülink | keiner | 1 × `nav` |
| A8 | `hidden` auf einem Menülink | keiner | 1 × `nav` |
| A9 | `aria-hidden="true"` auf `.puk-site-subbar` | 1 × `sender` | `sender` + 1 × `utility-nav` |
| A10 | `hidden` auf `.puk-site-subbar` | 1 × `sender` | `sender` + 1 × `utility-nav` |
| A11 | `aria-hidden="true"` auf `header` | 1 × `sender` | `sender` + `utility-nav` + `nav` |
| A12 | `hidden` auf `header` | 1 × `sender` | `sender` + `utility-nav` + `nav` |
| A13 | `aria-hidden="false"` auf der Zeile | keiner | **keiner** (zulässig) |
| A14 | `aria-hidden="false"` auf einem Link der Zeile | keiner | **keiner** |
| A15 | `aria-hidden="false"` auf einem Menülink | keiner | **keiner** |
| A16 | `aria-hidden="false"` auf `header` | keiner | **keiner** |
| B1 | `aria-label="Mehr"` an einem Link der Zeile (M15) | keiner | 1 × `utility-nav` «aria-label oder aria-labelledby» |
| B2 | `aria-labelledby` an einem Link der Zeile | keiner | 1 × `utility-nav` |
| B3 | `aria-label="Mehr"` an einem Menülink | keiner | 1 × `nav` |
| B4 | `aria-labelledby` an einem Menülink | keiner | 1 × `nav` |
| B5 | `aria-label="Kurz und klar"` (gleich der sichtbaren Beschriftung) an einem Link der Zeile | keiner | 1 × `utility-nav` (siehe Hinweis) |
| — | `aria-label="Direkteinstiege"` an der `nav` selbst (Bestand) | keiner | **keiner** (zulässig) |
| B6 | `aria-label` der `nav` auf «Schnell» geändert | 1 × «fehlt» | 1 × «fehlt» |
| B7 | zusätzlich `aria-labelledby` an der `nav` | keiner | keiner |
| C1 | Beschriftung der Zeile «Mehr» (r4-57) | 1 × `utility-nav` | 1 × `utility-nav` |
| C2 | Zeile doppelt (r4-57) | 1 × «2-mal» | 1 × «2-mal» |
| C3 | Zeile ausserhalb des Kopfs, in `main` (r4-57) | 1 × «nicht im Kopf» | 1 × «nicht im Kopf» |
| C4 | Zeile fehlt (r4-57) | 1 × «fehlt» | 1 × «fehlt» |
| C5 | Reihenfolge der Zeile vertauscht (r4-57) | 1 × `utility-nav` | 1 × `utility-nav` |
| C6 | Beschriftung im Menü «Mehr» (r4-57) | 1 × `nav` | 1 × `nav` |
| C7 | `behandlung.html`: `aria-hidden="true"` auf der Zeile | keiner | 1 × `utility-nav` |
| C8 | `behandlung.html`: `hidden` auf einem Menülink | keiner | 1 × `nav` |
| D1 | `aria-hidden="TRUE"` auf der Zeile | keiner | **keiner** (N58-1) |
| D2 | `inert` auf der Zeile | keiner | **keiner** (N58-1) |
| D3 | `style="display:none"` auf der Zeile | keiner | keiner (benannte Grenze) |
| D4 | `role="presentation"` an einem Link der Zeile | keiner | keiner (Chromium ignoriert die Rolle am fokussierbaren Link; der Link heisst weiter «Kurz und klar») |
| D5 | Linktext in `<span aria-hidden="true">` | keiner | **keiner** (N58-1) |
| D6 | `aria-hidden="true"` auf der Menüliste `<ul>` | keiner | 1 × `nav` |
| D7 | `hidden` auf der ganzen Hauptnavigation | keiner | 1 × `nav` (nur über die Direkteinstiege) |
| D8 | `aria-hidden=" true "` mit Leerzeichen | keiner | keiner (Chromium verbirgt die Zeile damit nicht) |
| D9 | Fehlerseite: `aria-hidden="true"` auf `header` | 1 × `sender` | 1 × `sender` (keine Meldung zu Direkteinstiegen) |
| E1 | ohne `utilityNav`, neu gerendert (Rückfall) | 0 Blocker | **0 Blocker**, 20 Hinweise |
| E2 | wie E1, `hidden` auf der Rückfallzeile | keiner | 1 × `utility-nav` |
| E3 | wie E1, `aria-label` am Rückfalllink | keiner | 1 × `utility-nav` |

**Ergebnis:**
- Alle verlangten Fälle blockieren mit r4-58:
  - `hidden` und `aria-hidden="true"` auf Zeile, Link, `<li>` im Menü, `.puk-site-subbar` und `header`;
  - `aria-label` und `aria-labelledby` an Links in Zeile und Menü;
  - dasselbe auf einer anderen Seite (C7, C8) und beim Rückfall (E2, E3).
- Die Fälle der Nachprüfung r4-57 (C1–C6) blockieren unverändert.
- **Keine Falsch-Positiven:**
  - beim Bestand;
  - bei `aria-hidden="false"` (A13–A16);
  - beim `aria-label` der `nav` selbst (Bestand, B7);
  - beim Rückfall ohne `utilityNav` (E1);
  - auf der Fehlerseite (D9: nur die bestehende `sender`-Regel; die Regeln zu den Direkteinstiegen überspringen die Fehlerseite).
- **Angaben im Selbstbericht X1–X6:** Meine Fälle A9, B2, A13, A6, E1 und A11 ergeben dasselbe. Die Angaben stimmen.

**Hinweis zu B5 (kein Befund):** `relabelled` blockiert jedes `aria-label`, auch eines, das gleich der sichtbaren Beschriftung ist. WCAG 2.5.3 erlaubt das. Die Regel ist damit strenger als die Norm. Der Renderer setzt kein `aria-label` an Direkteinstiegen, deshalb gibt es heute keine Falschmeldung. Der Kommentar `:33–34` sagt die Absicht klar.

**Hinweis zu D7 (kein Befund, nicht r4-58):** Eine mit `hidden` verborgene Hauptnavigation meldet das Gate nur über die Direkteinstiege im Menü; die fünf Hauptpunkte selbst prüft keine Regel auf `hidden`. Das bestand schon vor r4-58.

**Greifen die fünf neuen Selbsttestfälle?**
- Ich habe die Zeilen `contract.js:692–696` von r4-58 in eine Kopie von r4-57 eingesetzt, direkt nach dem Fall «Beschriftung eines Direkteinstiegs im Menü weicht ab». Die Regeln sind die von r4-57.
- Ergebnis: `Selbsttest: 93/98 bestanden`. Genau diese fünf scheitern, z. B. `FAIL | Zeile der Direkteinstiege mit aria-hidden verborgen (r4-58, N57-2) | erwartet: utility-nav | erhalten: crisis-number-check`.
- Die Fälle für das Menü erwarten `nav`, eine Kennung, die auch andere Regeln setzen. Sie scheitern mit r4-57 aber ebenfalls; sie hängen also an der neuen Regel.
- r4-57 unverändert ergibt `Selbsttest: 93/93 bestanden`.

### 3. Tests und Gate: abgeschwächt, gleichwertig oder verschärft?

- **Testskripte gleichwertig:** `selftest.mjs`, `layouttest.cjs`, `sprachtest.mjs` und `suchtest.mjs` sind nicht geändert (`git diff --stat` leer).
- **Regel `utility-nav` verschärft:** Hinzu kommen zwei Bedingungen, keine bestehende ist entfernt oder gelockert (C1–C5 blockieren wie vorher).
- **Menüregel verschärft:** ebenso zwei Bedingungen mehr (C6 blockiert wie vorher).
- **Selbsttest verschärft:** 98 statt 93 Fälle. Keiner ist entfernt; vier sind nur umbenannt, mit gleicher Erwartung und Funktion.

### 4. Tests selbst ausgeführt (Stand `8fecce5`)

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site`, Exit 0. Alle 20 Hinweise sind `crisis-number-check` (20 von 20 per `grep`) |
| `node authoring/tools/build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/`, Exit 0 |
| `node authoring/tools/selftest.mjs` | `Selbsttest: 98/98 bestanden`: 98 PASS, 0 FAIL gezählt, Exit 0 |
| `node authoring/tools/suchtest.mjs dist/site` | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0`, Exit 0 |
| `node authoring/tools/sprachtest.mjs` | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0`, Exit 0 |
| `node authoring/tools/layouttest.cjs` | `Audit-04-Layouttest: 240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` mit `tension core exceeds 1800px`, Exit 1. Das ist die bekannte Ausnahme B2c, wie in den Nachprüfungen r4-54 und r4-57 |

Die Kennzahlen im Selbstbericht und in PR #764 stimmen, ausser der in N58-2 genannten.

### 5. Barrierefreiheit (Stichprobe)

- **Vorgehen:**
  - axe-core 4.14.0 per `page.addScriptTag` auf `dist/site`. `dist/site` ist byte-gleich mit `site/` (siehe Parität oben).
  - Die Seiten liefen über einen eigenen lokalen Server, in Chromium, bei 390 und 1280 px.
  - Tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`.
- **Ergebnis:** `axe 4.14.0, build r4-58 · Läufe: 48 · Seiten: 24 · Verstösse: 0`.

### 6. Merge und Codex-Review

Das Codex-Review auf `d9946b6` ist abgeschlossen und ohne Befund (06:01:46 UTC, keine Review-Threads). Gemergt wurde um 06:01:18 UTC, also vorher; siehe N58-3. Auf PR #764 gibt es sonst nur den Netlify-Kommentar «Deploy Preview … ready» zu `d9946b6`.

### 7. Live-Site (keine Prüfstufe, nur Hinweis)

`curl -sS https://borderline-angehoerige.netlify.app/` ergab am 30.10.2026, 06:08 UTC: HTTP `200` und `data-puk-site-build="r4-58"`.

Die ausgelieferte Startseite ist nicht byte-gleich mit `site/index.html`. Netlify schreibt beim Ausliefern Links um, z. B. `href="index.html"` zu `href='/'`. Das war nicht Gegenstand dieser Prüfung.

## Was nicht prüfbar war

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack). Der Zugänglichkeitsbaum ist nur in Chromium über `ariaSnapshot` gelesen.
- Safari und Firefox; geprüft ist nur Chromium über Playwright.
- Reale Geräte, Zoom und Systemschrift auf Geräten. Der Layouttest simuliert Breiten und Schriftgrössen.
- Wirkung im Netlify-Deployment über die Build-Kennung der Startseite hinaus.
- Fachliche, rechtliche und Sicherheitsfreigaben: nicht Gegenstand, weil kein Wortlaut geändert ist.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**
- N58-1 und N58-2 sind gering und können bei der nächsten Arbeit an `contract.js` oder an den Nachweisen mitgehen.
- N58-3 und N58-4 betreffen Verfahren und Dokumentation, nicht die Website.
- Für den veröffentlichten Stand r4-58 besteht kein Hindernis.

## Berichtigung · 30.10.2026 (r4-60, Befund N59-1)

Falsch sind die Angaben zu `aria-hidden=" true "` bei N58-1 («Mit `aria-hidden=" true "` (mit Leerzeichen) bleibt die Zeile sichtbar; das Gate hat dort also zu Recht nichts gemeldet.») und in der Tabelle bei D8 («Chromium verbirgt die Zeile damit nicht»). Sie beruhen auf Playwright `ariaSnapshot`, das den Zugänglichkeitsbaum selbst berechnet. Im Baum von Chromium (CDP) ist die Zeile auch damit verborgen; verborgen wird bei jedem nicht leeren Wert ausser `false`. Belege: `audit-results/2026-10-30-nachpruefung-r4-59/minimal-ausgabe.txt`. In r4-60 berücksichtigt (`audit-results/2026-10-30-n59-1-bis-n59-3-r4-60/BERICHT.md`). Schweregrad und Empfehlung dieser Nachprüfung bleiben gleich. Die übrige Datei ist unverändert.
