# Nachprüfung r4-62 · 30.10.2026

## Auftrag, Stand, Prüfende

- **Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-62 starten».
- **Gegenstand:** r4-62 aus [PR #784](https://github.com/christaegger-dot/borderline-angehoerige/pull/784), Branch `korrektur/2026-10-30-n60-1-n60-3-r4-62`. Der PR ist **offen, Entwurf, nicht gemergt**.
- **Geprüfter Stand:** `git diff 5cbaf1c d6dd542`.
  - `5cbaf1c` ist die Merge-Basis mit `origin/main` (r4-61, #780).
  - `d6dd542` ist der Kopf des Branchs, zuletzt abgefragt um 08:55 UTC (`git rev-parse`).
- **Befunde, auf die r4-62 zurückgeht:**
  - N60-3 im Nachtrag zur Nachprüfung r4-60 (#781);
  - N61-1 in der Nachprüfung r4-61 (#785);
  - N60-1 im Nachtrag #783.
- **Selbstbericht:** `audit-results/2026-10-30-n60-1-n60-3-r4-62/BERICHT.md`.
- **Prüfende:** eine Sitzung, die r4-62 nicht gebaut hat und an keinem Stand dieser Website Inhalte oder Code geändert hat. Sie ändert auch hier nichts und committet nur diesen Ordner.
- **Umgebung:** Node 22.22.0, Chromium 153.0.8010.12, Playwright global über `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`.
  - r4-61 (`5cbaf1c`) und r4-62 (`d6dd542`) liegen als eigene Arbeitsbäume ausserhalb des Repositorys (`git worktree add --detach`).
  - In `site/` des Repositorys wurde nichts geschrieben.
- **Eigene Prüfskripte in diesem Ordner** (keine Skripte der bauenden Sitzung übernommen):
  - `nachpruefung-r4-62.mjs`: Mutationen über `C.gate` für r4-61 und r4-62, mit derselben Eingabe wie `build.mjs` (`renderPage` mit `injectSearchIndex`, Modus `production`, `exists`, `report`). Dazu der Abgleich mit Chromium über CDP `Accessibility.getPartialAXTree` und `getFullAXTree`, nicht über `ariaSnapshot`. Ausgabe: `gate-chromium-ausgabe.txt`.
  - `rueckprobe.py`: setzt die Regeln in einer Kopie von r4-62 einzeln auf r4-61 zurück und lässt den Selbsttest laufen. Ausgabe: `rueckprobe-ausgabe.txt`.
  - `axe-r4-62.mjs`: axe-core 4.14.0 aus einem eigenen Ordner ausserhalb des Repositorys, geladen mit `page.addScriptTag`. Ausgabe: `axe-ausgabe.txt`.
  - `tests-ausgabe.txt`: die Testläufe des Repositorys, Ausgaben gekürzt mit `tail`.

## Befunde

### N62-1 · wichtig · Ein zweiter offener PR behebt N61-1 anders und kollidiert mit #784

**Ort:** [PR #787](https://github.com/christaegger-dot/borderline-angehoerige/pull/787) «r4-63: hidden/inert an SVG und alt/value im Direkteinstieg wie Chromium (N61-1 bis N61-3)». Der PR ist offen und ein Entwurf. Sein Kopf ist `f2fac13`, sein Ziel der Branch von #784.

**Beleg:**
- **Gleiche Regel, andere Fassung:** Die Beschreibung von #787 sagt: «`hiddenFlag` wertet `hidden` und `inert` nur ausserhalb des SVG-Namensraums (neu `inSvgNs`)». r4-62 ändert dieselbe Zeile mit `inSvg` (`contract.js:43–44` auf `d6dd542`).
- **Veraltete Basis:** #787 setzt laut GitHub auf `a5d18e7` auf (`"base": {"sha": "a5d18e76…"}`). Das ist die erste Fassung von r4-62, die `d6dd542` ersetzt hat.
- **Konflikte:** `git merge-tree --write-tree --name-only d6dd542 origin/pruefung/2026-10-30-nachpruefung-r4-61` meldet:
  ```
  CONFLICT (content): Merge conflict in PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md
  CONFLICT (content): Merge conflict in authoring/site.config.json
  CONFLICT (content): Merge conflict in authoring/tools/contract.js
  ```
- **Überholte Reihenfolge:** #787 nennt als Reihenfolge: «diesen PR in den Branch von #784; #784 in den Branch von #780; #780 in `main`». #780 ist aber seit 08:25:17 UTC gemergt.
- **Merge-Regel:** R29-P20 verlangt vor jedem Merge, dass «genau ein Pull Request für die Änderung offen ist». Für N61-1 sind zwei offen.

**Vorschlag:** Christa Egger entscheidet, welche Fassung N61-1 behebt. Wenn es #784 ist:
- #787 auf `d6dd542` neu aufsetzen und auf N61-2 und N61-3 beschränken, oder #787 schliessen;
- #784 erst danach mergen.

Wenn es #787 ist, braucht er selbst eine Nachprüfung. Diese Nachprüfung deckt #787 nicht ab.

### N62-2 · gering · `inSvg` zählt auch HTML in `<foreignObject>` zum SVG

**Ort:** `authoring/tools/contract.js:43` (`inSvg`) mit dem Kommentar `:40–42` («an `<svg>` und an Elementen darin … gilt nur aria-hidden»), auf `d6dd542`.

**Beleg:** `inSvg` sucht nur einen Vorfahren `svg`. Ein HTML-Element in `<foreignObject>` gilt damit als SVG-Element, obwohl `hidden` und `inert` dort als HTML-Attribute wirken. Aus `gate-chromium-ausgabe.txt`:

```
M19|Zeile: foreignObject > span hidden aria-label|utility-nav|–|utility-nav|link «Kurz und klar»|kein|ja|NEIN
M20|Zeile: foreignObject > span hidden Text|utility-nav|–|utility-nav|link «Kurz und klar»|kein|ja|NEIN
M21|Zeile: foreignObject > span inert Text|utility-nav|–|utility-nav|link «Kurz und klar»|kein|ja|NEIN
```

Spalten: Nr, Fall, Regel, Gate r4-61, Gate r4-62, Chromium, Soll, Übereinstimmung r4-61, Übereinstimmung r4-62. Im Menü verhalten sich M46 bis M48 gleich.

**Bewertung:**
- r4-62 meldet hier neu einen Blocker, den Chromium nicht rechtfertigt. Das ist die strenge Richtung.
- Das Gate liest Inhalt in `<foreignObject>` auch sonst mit: Sichtbarer Text oder ein `aria-label` darin blockiert schon in r4-61, obwohl Chromium nichts davon in den Linknamen nimmt (M22, M25, M49, M52, je `NEIN|NEIN`).
- Kein Inhaltsfragment enthält `foreignObject` (`grep -rl foreignObject authoring/content | wc -l` → `0`).
- Keine Wirkung auf die Website.

**Vorschlag:** Bei der nächsten Arbeit an `contract.js` `inSvg` an `<foreignObject>` enden lassen oder den Kommentar `:40–42` einschränken. Nicht dringend.

## Bestätigt

### 1. Diff vollständig und eng begrenzt

`git diff --stat 5cbaf1c d6dd542`: `37 files changed, 1572 insertions(+), 81 deletions(-)`.

- **`authoring/`:** Es ändern sich nur `authoring/site.config.json` und `authoring/tools/contract.js` (`git diff --name-only 5cbaf1c d6dd542 -- authoring`).
- **Unverändert:** Fragmente, Stylesheet, Skript, Suche, `suche-ersttreffer.tsv`, Testskripte, `build.mjs` und Pendenzendatei. `git diff --stat` über `authoring/content authoring/css authoring/js authoring/tests authoring/tools/{build,selftest}.mjs authoring/tools/{suchtest,sprachtest}.mjs authoring/tools/layouttest.cjs authoring/tools/search-index.mjs PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` ist leer.
- **Renderer, Akuthinweise, Sprungziele:** In `contract.js` ändern sich nur `BUILD` (`:11`), die Hilfsfunktionen `:39–46`, die SVG-Prüfung `:645–649`, fünf Einträge in `MUTATIONS` (`:738–742`) und ein Selbsttestblock (`:925–929`). Es gibt fünf entfernte Zeilen: `BUILD`, `hiddenFlag`, eine Kommentarzeile zu r4-61, Kommentar und Zeile der SVG-Prüfung.
- **`site/`:** Alle 35 Dateien sind verglichen. Nach Ersetzen der Build-Kennung (`r4-61` bzw. `r4-62` → Platzhalter, `sha1sum` je Datei) weichen 0 von 35 ab. Im Diff steht keine Zeile ohne `r4-61`/`r4-62`.
  - `r4-61` kommt auf `5cbaf1c` 72-mal vor, `r4-62` auf `d6dd542` 72-mal.
  - Auf `d6dd542` steht in `site/` kein `r4-61` mehr.
  - Die Angabe «72 Vorkommen» im Selbstbericht stimmt.
- **Nummerierung r4-62 stimmig:**
  - `BUILD = 'r4-62'` (`contract.js:11`);
  - `assetVersion` und `independentReviewWaiver.version` stehen auf `r4-62`;
  - `pendingScope` beginnt mit «r4-62 (Befund N60-3 … und N61-1 …)» und führt r4-61 als «Vorher»;
  - `appliedTo` endet mit «r4-62 am 30.10.2026 im Auftrag «Nachbesserung N60-1 und N60-3 umsetzen» … Nachweis audit-results/2026-10-30-n60-1-n60-3-r4-62/BERICHT.md».
- **`audit-results/`:** Neu ist nur der Ordner `2026-10-30-n60-1-n60-3-r4-62/` (Bericht, Skripte, Ausgaben).
- **Zeilenangaben im Selbstbericht stimmen:** `:39`, `:43`, `:44`, `:46`, `:649`, `:738–742`, `:925–929` (`grep -n`).

### 2. Gate-Regeln gegen Chromium

`gate-chromium-ausgabe.txt` enthält 86 eigene Mutationen, je für r4-61 und r4-62 sowie in Chromium (CDP). Im Grundzustand meldet das Gate 0 Blocker, bei beiden Ständen.

- **N61-1 behoben** (M1 bis M4, M28 bis M31):
  - Fälle: `<svg hidden|inert aria-label="Pfeil">` und `<svg hidden|inert><title>Mehr</title></svg>` im Linktext, je in Zeile und Menü.
  - Chromium nennt den Link «Kurz und klar Pfeil» bzw. «Kurz und klar Mehr».
  - r4-61 meldet nichts; r4-62 meldet `utility-nav` bzw. `nav`.
- **N60-3 behoben:**
  - `hidden` statt `aria-hidden` am SVG (M70);
  - `inert` statt `aria-hidden` am SVG (M71);
  - `.puk-vis-scene` mit `hidden` (M74). `site.css:1144` setzt dort `display:grid` und hebt das `hidden` damit auf.

  Chromium zeigt das SVG jeweils als `image «»`. r4-61 meldet nichts, r4-62 meldet `figure-alt`.
- **Keine neue Falschmeldung bei echt Verborgenem.** Chromium und r4-62 stimmen überein, keiner meldet etwas:
  - **Zeile:**
    - `<svg aria-hidden="true"|"yes" aria-label>` und `<svg aria-hidden="true"><title>` (M5 bis M7);
    - `<span hidden|inert aria-label>` und `<span hidden|inert> mehr</span>` (M10 bis M13);
    - `<g aria-hidden><title>` (M16);
    - SVG mit `aria-hidden` um `foreignObject` (M18);
    - `<span hidden|inert>` um ein benanntes SVG (M26, M27).
  - **Menü:** dieselben Fälle (M32 bis M34, M37 bis M40, M43, M45, M53, M54).
  - **Abbildungen:**
    - SVG mit `aria-hidden="yes"` (M72);
    - Szene mit `inert`, `aria-hidden="true"` oder `hidden inert` (M76 bis M78);
    - verschachteltes SVG unter einem SVG mit `aria-hidden` (M82) und in `foreignObject` (M85).
- **Regression unverändert** (M55 bis M68):
  - Alle Fälle bis auf M58 stimmen mit Chromium überein (`ja|ja`); M58 steht unten unter «Strenger als Chromium».
  - Blocker `utility-nav` bzw. `nav`:
    - Zeilenlink mit `aria-hidden="true"`, `" true "` oder `inert`;
    - `nav` mit `aria-hidden="yes"`;
    - Menülink mit `aria-hidden="TRUE"` oder `inert`.
  - Blocker `sender`:
    - Subbar mit `aria-hidden="true"`, `"0"` oder `hidden`;
    - Kopf mit `inert`;
    - Fehlerseite mit `aria-hidden="TRUE"` am Kopf.
  - Kein Blocker: `aria-hidden="false"` am Zeilenlink und an der Absenderzeile.
- **Strenger als Chromium, vertretbar:**
  - **M75 (= Q5.17):** SVG in `<div hidden>` ohne eigene `display`-Regel. Chromium führt es nicht im Baum, r4-62 meldet `figure-alt`. Ob `hidden` wirkt, hängt vom Stylesheet ab, das das Gate statisch nicht auswertet. Richtig ausgezeichnet ist ein dekoratives SVG mit `aria-hidden`.
  - **M14, M15, M17 und M41, M42, M44:** `<g hidden|inert>` mit `<title>` oder `aria-label` im SVG im Link. Chromium nennt den Link «Kurz und klar», r4-62 blockiert. Die Kontrollen ohne `hidden` (M23, M24, M50, M51) blockieren schon in r4-61. r4-62 behandelt `hidden` in SVG also nur so wie fehlendes `hidden`.
    - Der Selbstbericht nennt davon nur Q6.4 und Q6.12 (`<g hidden><title>`).
    - `<g inert>` und `<g hidden aria-label>` gehören in dieselbe Gruppe.
  - **M83:** Ein verschachteltes `<svg hidden>` in einem SVG mit `aria-label`. Chromium führt das innere SVG nicht im Baum, weil ein Bild seine Kinder nicht zeigt. r4-62 meldet `figure-alt`, r4-61 nicht. Die Kontrolle ohne `hidden` (M84) meldet schon in r4-61.
  - **M58:** `hidden` am Zeilenlink. Die eigene Anzeigeregel des Links hebt es auf, Chromium zeigt den Link. Das Gate blockiert in r4-61 und r4-62 gleich.
  - **M19 bis M21 und M46 bis M48:** HTML in `foreignObject`, siehe N62-2.
- **Milder als Chromium, unverändert:** M86 (= Q5.16), ein SVG ohne Namen unter `role="img" aria-label`. Chromium zeigt `image «»`, beide Stände melden nichts. Das ist ein Hinweis aus #781 und nicht Gegenstand von r4-62.
- **Ohne Blocker, auch in Chromium nicht als Bild ohne Namen:** M80, ein SVG ohne `aria-hidden` mit `<g hidden><title>` darin. Chromium führt es als `SvgRoot «»`, nicht als Bild. Das Gate meldet nichts, weil ein `<title>` vorhanden ist.
- **Bilanz:**
  ```
  86 Fälle · Abweichungen Gate ↔ Chromium: r4-61 22, r4-62 25 (r4-62: 24 strenger als Chromium, 1 milder als Chromium)
  ```
  - Die Zahl steigt, weil ich gezielt SVG-Gruppen, verschachtelte SVG und `foreignObject` mit Kontrollen ohne `hidden` aufgenommen habe.
  - r4-62 behebt 11 Fälle, die r4-61 zu mild wertete: M1 bis M4, M28 bis M31, M70, M71, M74.
  - Dazu kommen 14 strengere Fälle: M14, M15, M17, M19 bis M21, M41, M42, M44, M46 bis M48, M75, M83.
  - Rechnung: 22 − 11 + 14 = 25.
  - Zu mild ist r4-62 nur in M86, unverändert seit r4-59.
  - Gelockert wird nichts. Verschärft wird nur, wo `hidden` oder `inert` an SVG-Elementen nach HTML-Regeln gewertet wurden.
- **Kennzahlen der bauenden Sitzung nachgerechnet:** Ihre Skripte `mutationen.mjs` und `aria.mjs` habe ich in eigenen Arbeitsbäumen neu ausgeführt. `mutationen-r4-61-ausgabe.txt`, `mutationen-r4-62-ausgabe.txt` und `aria-ausgabe.txt` sind byte-gleich (`cmp`). `abgleich.py` ergibt erneut:
  ```
  # 191 Fälle · Abweichungen Gate ↔ Chromium: r4-61 10, r4-62 4
  ```
  - Die vier verbleibenden Abweichungen sind Q5.16, Q5.17, Q6.4 und Q6.12, wie im Bericht.
  - Die zwölf geänderten Fälle sind Q5.9 bis Q5.11, Q5.17, Q6.1 bis Q6.4 und Q6.9 bis Q6.12 (`diff` der Gate-Ausgaben), wie im Bericht.
  - Die Einordnung von Q5.17, Q6.4 und Q6.12 als «bewusst streng» ist richtig (siehe M75, M14/M41 und die Kontrollen M23/M50). Sie gilt auch für die weiteren Fälle oben.

### 3. Selbsttest

`rueckprobe-ausgabe.txt`:

| Fassung | Ergebnis | scheitert |
|---|---|---|
| r4-62 unverändert | 122/122 | — |
| `hiddenFlag` und SVG-Prüfung von r4-61 | 117/122 | genau die fünf neuen Fälle |
| nur `hiddenFlag` von r4-61 | 120/122 | die zwei N61-1-Fälle |
| nur SVG-Prüfung von r4-61 | 121/122 | `hidden` an `.puk-vis-scene` |
| zu streng: `inert` am HTML-Vorfahren zählt nicht | 121/122 | die Gegenprobe |
| zu mild: `hidden` am HTML-Vorfahren zählt in der SVG-Prüfung (eigene Variante) | 121/122 | `hidden` an `.puk-vis-scene` |
| zu mild: `hidden` an SVG zählt in `hiddenFlag` (eigene Variante) | 121/122 | `<svg hidden aria-label>` |

- **Kennzahlen bestätigt:** Die Zahlen des Selbstberichts (117, 120, 121, 121 von 122) stimmen. r4-61 selbst besteht 116/116.
- **Verschärft:** Fünf Blockerfälle und eine Gegenprobe kommen dazu. Kein bestehender Fall ist entfernt oder abgeschwächt: Die Diff-Zeilen in `MUTATIONS` und `selftest` sind reine Zusätze.
- **Die zwei Fälle aus #783 (N60-1) sind unverändert:** Der Block «Nachtrag zu N60-1» (`contract.js:833–841` auf `d6dd542`) ist auf `5cbaf1c` und `d6dd542` gleich (`sha1sum` je `0f5fd12…`). Er kommt je dreimal vor (`grep -c "N60-1"` → `3`). Die doppelten Fälle der ersten Fassung `a5d18e7` sind nicht mehr enthalten.
- **Meldungstexte der Regeln:** unverändert.

### 4. Tests selbst ausgeführt

Auf `d6dd542` im Arbeitsbaum ausserhalb des Repositorys (`tests-ausgabe.txt`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production` | 24 Seiten · 0 Blocker · 20 Hinweise |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `selftest.mjs` | `Selbsttest: 122/122 bestanden` |
| `suchtest.mjs dist/site` | `216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| `sprachtest.mjs` | `73 Prüfungen bestanden · JS-Fehler 0` |
| `layouttest.cjs` | 240 Seitenzustände, 27 Bedienproben, 1 Abweichung `tension core exceeds 1800px` (bekannte Ausnahme B2c), Exit 1 |

`build.mjs --production --out=site --write-site` habe ich nicht ausgeführt. `site/` wird nicht beschrieben. Die Parität belegt, dass der Build `site/` auf `d6dd542` genau ergibt.

### 5. Barrierefreiheit (Stichprobe)

axe-core 4.14.0, eigener Ordner ausserhalb des Repositorys, geladen mit `page.addScriptTag`, auf `dist/site` von `d6dd542`:

```
build r4-62 · Seiten: 24 · Läufe: 48 · Verstösse: 0 · Chromium 153.0.8010.12
```

### 6. Merge und Review

- **#784**, abgefragt um 08:55 UTC:
  - `"state":"open"`, `"draft":true`, `"merged":false`, Kopf `d6dd542`, Basis `main` (`5cbaf1c`), `"mergeable_state":"clean"`.
  - **Codex:** Es gibt keinen Zusammenfassungskommentar, keine Reviews (`get_reviews` → `[]`) und keine Review-Threads (`totalCount: 0`). Weil der PR ein Entwurf ist, hat das Review nicht begonnen.
  - **Merge:** Ein Merge ist nach R28-O01 und R29-P20 noch nicht zulässig. Dazu kommt N62-1.
  - **CI:**
    - `build-and-compare` auf `d6dd542`: `success`, 08:32:40 bis 08:33:09 UTC;
    - Netlify «Redirect rules» und «Header rules»: `success`;
    - Netlify «Pages changed»: `neutral`;
    - Deploy-Vorschau für `d6dd542`: bereit.
- **#780 (r4-61), nur Feststellung:**
  - gemergt am 30.10.2026 um 08:25:17 UTC (`"merged_at":"2026-10-30T08:25:17Z"`), Kopf `e2edaf7`, Merge-Commit `5cbaf1c`.
  - Einziger Codex-Zusammenfassungskommentar (`codex-review-state`): `"commit_sha":"9fe243e…"`, `"status":"failed"`, «⚠️ **Failed** 2026-10-30T07:43:46Z», Auslöser «Draft marked ready».
  - Um 07:43:50 UTC folgt: «You have reached your Codex usage limits for code reviews.»
  - Ein Review mit «Completed» gibt es weder auf `9fe243e` noch auf dem gemergten Kopf `e2edaf7`.
  - Die Pendenzendatei auf `main` sagt im Abschnitt r4-61 dagegen: «Merge … erst nach einem erneuten Review mit Status «Completed» ohne Befund».

### 7. Live-Site (Hinweis, keine Prüfstufe)

`curl -sS https://borderline-angehoerige.netlify.app/` um 2026-10-30T08:55:43Z: HTTP 200, `data-puk-site-build="r4-61"`, `site.css?v=r4-61`. r4-62 ist nicht veröffentlicht, wie es für einen offenen PR zu erwarten ist.

## Nicht prüfbar

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack). Die Aussagen zum Zugänglichkeitsbaum gelten für Chromium 153 über CDP.
- Safari und Firefox, also wie sie `hidden` und `inert` an SVG, `<g>` mit `<title>` und HTML in `foreignObject` werten.
- Reale Geräte, Zoom und Systemeinstellungen ausserhalb von Playwright.
- Das Codex-Review von #784, weil es noch nicht gelaufen ist.
- PR #787 als eigener Stand. Geprüft ist nur, dass er sich mit #784 überschneidet und kollidiert (N62-1).

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**

r4-62 behebt N60-3 und N61-1 wie verlangt. Die Kennzahlen des Selbstberichts stimmen, und die Seiten ändern sich nur in der Build-Kennung. Das Gate ist nirgends gelockert. Verschärft ist es nur in Fällen, die es ohne `hidden` schon meldet; das ist vertretbar.

Vor einem Merge von #784 ist N62-1 zu klären: Für N61-1 ist genau ein PR festzulegen (R29-P20), und das Codex-Review muss «Completed» melden (R28-O01). N62-2 kann bei der nächsten Arbeit an `contract.js` mitlaufen.
