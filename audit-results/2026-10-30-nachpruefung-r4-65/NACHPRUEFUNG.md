# Nachprüfung r4-65 · 30.10.2026

**Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-62 und r4-63 starten». r4-62 ist schon nachgeprüft (PR #790). Die erste Fassung von #787 hiess r4-63 und ist überholt. Geprüft wird darum nur **r4-65**.

- **Gegenstand:** [PR #787](https://github.com/christaegger-dot/borderline-angehoerige/pull/787), Branch `pruefung/2026-10-30-nachpruefung-r4-61`, Kopf **`f7f8d18`**.
  - Die Änderung gegenüber beiden Eltern: `git diff d6dd542 f7f8d18` (#784, r4-62) und `git diff a55ecb1 f7f8d18` (`main`, r4-64).
  - Selbstbericht: `audit-results/2026-10-30-n61-2-r4-65/BERICHT.md`.
- **Stand während der Prüfung:** #787 steht inzwischen auf `9033857`, ein Merge von `e1db2da` in `f7f8d18`. Der Dateibaum ist derselbe wie auf `f7f8d18` (`tree 7fa0f85…`, `merge-ausgabe.txt`). Die Befunde gelten also auch für `9033857`. #784 steht auf `2810994`, `main` auf `d20973b`.
- **Wer prüft:** eine eigene Sitzung. Sie hat weder r4-62 noch r4-65 gebaut und weder die Nachprüfung r4-61 noch r4-62 verfasst.
  - Alle Prüfskripte sind neu geschrieben, die Skripte der Nachprüfung r4-61 sind nicht verwendet.
  - Inhalte und Code sind nicht geändert. `site/` ist nicht beschrieben.
  - Committet ist nur dieser Ordner.

Diese Nachprüfung ist keine fachliche, juristische oder institutionelle Freigabe.

**Beilagen in diesem Ordner:**

| Datei | Inhalt |
|---|---|
| `gate-cdp-r4-65.mjs`, `gate-cdp-ausgabe.txt` | 116 Mutationen über `C.gate`, r4-62 und r4-65, verglichen mit Chromium über CDP |
| `selbsttest-varianten.sh`, `selbsttest-varianten-ausgabe.txt` | Selbsttest mit acht veränderten Fassungen von `ctlTxt` |
| `axe-r4-65.mjs`, `axe-ausgabe.txt` | axe-core 4.14.0 |
| `tests-ausgabe.txt` | die Tests des Repositorys auf `f7f8d18` |
| `kennung.cjs`, `kennung-ausgabe.txt` | Build-Kennung in `site.config.json` und `contract.js` |
| `diff-klassen.txt` | jede gegenüber `d6dd542` geänderte Datei: stammt aus `main` oder ist eigen |
| `merge-ausgabe.txt` | Merge-Proben mit `git merge-tree` |
| `live-ausgabe.txt` | Abfrage der Live-Site |

## Befunde

### N65-1 · wichtig · r4-65 ist doppelt vergeben, #787 kollidiert mit seinem Ziel

**Ort:** #787 (`f7f8d18`/`9033857`) und #784 (`2810994`). Dazu `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:19` auf `f7f8d18`: «zuerst #787 in den Branch von #784, danach #784 in `main`. #784 trägt dann die Kennung r4-65.»

**Beleg:**
- **Gleiche Kennung, anderer Stand.** #784 heisst seit `7a21ee5` (09:29 UTC) «r4-65 (begonnen als r4-62)». Es hat `BUILD = 'r4-65'` und in den Kommentaren «r4-65 (… N61-1)», aber kein `ctlTxt`. #787 trägt dieselbe Kennung für r4-62 und N61-2 zusammen (`kennung-ausgabe.txt`):
  ```
  == f7f8d18
  BUILD=r4-65 assetVersion=r4-65 waiver.version=r4-65
  == 2810994
  BUILD=r4-65 assetVersion=r4-65 waiver.version=r4-65
  ```
  Die Pendenzendatei auf `main` verlangte für #784 und #787 je eine eigene Kennung über r4-64. Das zitiert das Review K1 auf #784.
- **Merge-Konflikt mit dem Ziel.** GitHub meldet für #787 `"mergeable_state":"dirty"`, die Basis von #787 ist noch `e1db2da`. Aus `merge-ausgabe.txt`:
  ```
  $ git merge-tree --write-tree --name-only 2810994 9033857
  CONFLICT (content): Merge conflict in PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md
  CONFLICT (content): Merge conflict in authoring/site.config.json
  CONFLICT (content): Merge conflict in authoring/tools/contract.js
  Exit 1
  ```
- **Auch gegen das aktuelle `main` nicht mehr konfliktfrei:** `git merge-tree origin/main f7f8d18` ergibt «CONFLICT (content): Merge conflict in PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md», weil `main` seit `a55ecb1` #791 aufgenommen hat.
  - Der Selbstbericht schränkt selbst ein: «konfliktfrei, solange `main` sich nicht weiter ändert».
  - `authoring/` und `site/` sind auf `d20973b` gleich wie auf `a55ecb1`. Der Konflikt betrifft also nur die Pendenzendatei.

**Folge:** Die geplante Merge-Reihenfolge geht so nicht. Ohne neue Auflösung und neuen Build wären danach zwei verschiedene Gate-Stände unter r4-65 dokumentiert.

**Vorschlag:**
- Christa Egger entscheidet über die Nummer, zum Beispiel #787 als r4-66 oder #784 zurück auf r4-62.
- Danach bringt die bauende Sitzung `2810994` und das aktuelle `main` in #787 ein, baut `site/` neu und führt Pendenzen, `pendingScope` und `appliedTo` nach.
- Prüfen muss danach eine Sitzung, die nicht gebaut hat. Es genügt, das Ergebnis des Merges zu prüfen: Kennung, Konfliktauflösung in `contract.js`, Selbsttest und Parität.

### N65-2 · gering · `pendingScope` führt r4-61 doppelt und in falscher Reihenfolge

**Ort:** `authoring/site.config.json:37` (`releaseApproval.pendingScope`) auf `f7f8d18`.

**Beleg:** In `kennung-ausgabe.txt` stehen die Abschnittsanfänge:
```
== f7f8d18
pendingScope Abschnittsanfänge: r4-65 → r4-64 → r4-61 → r4-62 → r4-61 → r4-60 → …
```
Der Text «r4-61 (Befund N59-3 …)» steht zweimal wortgleich da, an Position 1000 und 2180. Er kommt einmal aus `main` (`r4-64 → r4-61 → r4-60`) und einmal aus #784 (`r4-62 → r4-61 → r4-60`). Verlangt war die Folge r4-65 → r4-64 → r4-62 → r4-61 …

`appliedTo` ist stimmig: «r4-61 am» kommt zweimal vor (Bau und Merge), «r4-62 am», «r4-64 am» und «r4-65 am» je einmal, wie in der Kette von #784. `BUILD`, `assetVersion` und `independentReviewWaiver.version` stehen auf r4-65.

**Hinweis:** Auf #784 (`2810994`) hat `pendingScope` ein ähnliches Muster (`r4-65 → r4-61 → r4-64 → r4-61 → …`). Das gehört nicht zu diesem Gegenstand.

**Vorschlag:** Den eingeschobenen zweiten r4-61-Eintrag entfernen, wenn N65-1 aufgelöst wird.

### N65-3 · gering · Kopf der Pendenzendatei auf `f7f8d18` ist veraltet

**Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:3` auf `f7f8d18`.

**Beleg:** r4-65 hat die Zeile geändert, der Rest stammt aus `a55ecb1`. Sie nennt:
- «GitHub main: r4-61». Seit `a55ecb1` ist `main` r4-64, live seit 09:16 UTC.
- «Offen, nicht gemergt: … r4-63 ([PR #787] …, zielt noch auf die erste Fassung von #784) und r4-64 ([PR #788], N56-1, bereit zur Prüfung)». #788 ist gemergt, und #787 ist neu gefasst.
- Die Nachprüfung r4-62 (#790) ist nirgends erwähnt (`grep -c "Nachprüfung r4-62"` ergibt nur eine Fundstelle, und die ist der neue Abschnitt).

`main` hat den Kopf inzwischen mit #791 berichtigt («GitHub main: r4-64 …»). Daher kommt der Konflikt in N65-1.

**Vorschlag:** Die Pendenzendatei beim Auflösen von N65-1 aus `main` übernehmen und nur den Abschnitt r4-65 obenauf setzen. Dabei ist «#784 trägt dann die Kennung r4-65» zu berichtigen.

### N65-4 · gering · Gate lockert zwei Fälle, in denen Bild oder Feld den Linktext ersetzt

**Ort:** `authoring/tools/contract.js:50–52` (`ctlTxt`, `accTxt`), verwendet in `:541` (`utilityOf`) und `:566` (`menuUtility`).

**Beleg:** Aus `gate-cdp-ausgabe.txt`:
```
I3z|Zeile: img alt gleich der Beschriftung, Text ersetzt|utility-nav|–|link «Kurz und klar»|nein|gleich|NICHT MEHR BLOCKIERT
N18z|Zeile: input type=button value gleich der Beschriftung, Text ersetzt|utility-nav|–|link «Kurz und klar»|nein|gleich|NICHT MEHR BLOCKIERT
```
Dasselbe gilt im Menü (I3m, N18m). In allen vier Fällen ist der zugängliche Name korrekt, Chromium stimmt also zu. Bisher stand `accTxt` aber auch für die sichtbare Beschriftung (Kommentar `contract.js:33–34`: «ihr zugänglicher Name ist die sichtbare Beschriftung (WCAG 2.5.3)»). Jetzt fehlt diese Prüfung:
- **I3:** Ein Link aus einem 1×1-Bild mit `alt="Kurz und klar"` hat keinen sichtbaren Text und besteht.
- **N18:** Ein `<input type="button">` im Link besteht, obwohl der neue Kommentar in `contract.js:47–49` ein Eingabefeld im Link «ohnehin unzulässig» nennt.

Der Selbstbericht erwähnt diese Lockerung nicht. Der Renderer erzeugt solche Links nicht. Es sind also keine Seiten betroffen.

**Vorschlag:** Den sichtbaren Text weiter gegen die Beschriftung prüfen, etwa `norm(txt ohne Verborgenes) === label` und zusätzlich `norm(accTxt) === label`. Oder die Lockerung bewusst entscheiden und dokumentieren.

### N65-5 · gering · `<img title>` ohne `alt` ändert den Namen, das Gate meldet nichts

**Ort:** `authoring/tools/contract.js:50` (`ctlTxt` liest bei `img` nur `alt`).

**Beleg:** Aus `gate-cdp-ausgabe.txt`:
```
I13z|Zeile: img ohne alt mit title="Mehr"|–|–|link «Kurz und klar Mehr»|ja|MILDER|–
I13m|Menü: img ohne alt mit title="Mehr"|–|–|link «Kurz und klar Mehr»|ja|MILDER|–
```
Ebenso im Rückfall ohne `utilityNav` (I13r, I13rm). Damit sind das die einzigen 4 von 116 Fällen, in denen r4-65 milder ist als Chromium. Mit `alt=""` nimmt Chromium den `title` nicht auf (I14, «gleich»). Die Lücke bestand schon in r4-62 (`–` in beiden Spalten). Sie gehört zu N61-2, weil der Kommentar «wie in Chromium» verspricht.

**Vorschlag:** Bei `img` ohne `alt`-Attribut den `title` mitzählen.

### N65-6 · gering · Selbsttest deckt Teile von `ctlTxt` nicht ab

**Ort:** die neuen Selbsttestfälle `contract.js:745–746` und die Gegenprobe `:937–941`.

**Beleg:** In `selbsttest-varianten-ausgabe.txt` bleiben vier falsche Fassungen bei 125/125:
```
== V4 ctlTxt vor hiddenFlag (verborgene Bilder/Felder zählen)
Selbsttest: 125/125 bestanden
== V6 type=hidden zählt mit
Selbsttest: 125/125 bestanden
== V7 ohne Platzhalter [Eingabefeld]
Selbsttest: 125/125 bestanden
== V8 type ohne toLowerCase
Selbsttest: 125/125 bestanden
```
Zu V4: Die Gegenprobe verbirgt das Bild nur über einen Vorfahren (`<span hidden><img alt="Mehr">`). `hidden` am Bild selbst prüft sie nicht. Meine Mutationen zeigen, dass die Regel selbst richtig wirkt (I6, N6, N7, N4, N11: «gleich» oder bewusst strenger). Abgesichert ist das aber nur in meinem Skript, nicht im Repository.

**Vorschlag:** Den Selbsttest um diese Fälle ergänzen:
- `<img alt="Mehr" hidden>` als Gegenprobe;
- `<input type="hidden" value="Mehr">` als Gegenprobe;
- `<input type="text">` ohne Wert, Erwartung `utility-nav`;
- `type="HIDDEN"` als Gegenprobe.

## Bestätigtes

1. **Diff gegenüber `d6dd542`** (`diff-klassen.txt`): Von 58 Dateien kommen 23 unverändert aus `main`. Eigen sind 35:
   - `contract.js` und `site.config.json`;
   - die Pendenzendatei;
   - zwei Nachweisordner unter `audit-results/`;
   - 24 Seiten in `site/`, nur mit der Kennung.

   In `contract.js` fallen gegenüber `d6dd542` nur zwei Zeilen weg, `BUILD` und `accTxt`. Hinzu kommen `ctlTxt`, das neue `accTxt`, zwei Einträge in `MUTATIONS` und eine Gegenprobe. Kein Test ist entfernt.
2. **Erste Fassung entfernt:** Auf `f7f8d18` gibt es unter `authoring/` weder `inSvgNs` noch «r4-63» (`git grep`; auf `f2fac13` 2- und 10-mal). Im Nachweis `2026-10-30-n61-1-n61-3-r4-63/` ist gegenüber `f2fac13` nur der Hinweis «Überholt» am Anfang von `BERICHT.md` hinzugekommen. Die drei Ausgaben sind unverändert.
3. **Unverändert gegenüber `main`:**
   - Fragmente (`authoring/content`), Stylesheet (`authoring/css`), Skript (`authoring/js`), `DARSTELLUNGSREGELN.md`;
   - Suche (`search-index.mjs`), `authoring/tests` mit `suche-ersttreffer.tsv`;
   - `build.mjs`, `selftest.mjs`, `suchtest.mjs`, `sprachtest.mjs`, `layouttest.cjs`.

   Alle sind `git diff --quiet a55ecb1 f7f8d18` gleich. Der Renderer (`renderPage` in `contract.js`) ist nicht berührt: Gegenüber `5cbaf1c`, der Basis von #784, ändert `main` in `contract.js` nur `BUILD`. Damit sind auch Akuthinweise und Sprungziele unverändert.
4. **Seiten:** Alle 35 Dateien in `site/` sind gleich wie auf `a55ecb1`, wenn man r4-65 durch r4-64 ersetzt. Die Dateiliste ist dieselbe, `site/css` und `site/js` sind byte-gleich. Pro Seite sind 3 Kennungen ersetzt.
5. **Kennung:** `BUILD`, `assetVersion`, `independentReviewWaiver.version` stehen auf r4-65, `appliedTo` führt die Kette von #784 mit r4-64 und r4-65 weiter (zu `pendingScope` siehe N65-2). Der neue Pendenzenabschnitt r4-65 beschreibt den Inhalt richtig: `ctlTxt`, 125/125, ohne Änderung 123/125. Veraltet ist nur die Merge-Angabe (N65-1, N65-3).
6. **Gate-Regeln, 116 eigene Mutationen** (`gate-cdp-ausgabe.txt`). Grundlage: Gate wie `build.mjs` (`renderPage`, Suchindex, `production`, `report`, `exists`); Chromium 153 über CDP `Accessibility.getPartialAXTree` am Link; Zeile bei 1280 px; Menü bei 300 px, geöffnet, weil die Einträge erst unter 20 rem erscheinen.
   - **Bilanz:**
     ```
     116 Fälle · r4-65 ↔ Chromium gleich 90, strenger 22, milder 4 · r4-62 ↔ Chromium gleich 84
     ```
   - **N61-2 behoben:**
     - `<img alt="Mehr">` (I2), `<input type=button|submit|text value>` (N1, N3, N5), `type=submit`/`reset` ohne Wert (N2, N13; Chromium «Submit», «Reset»), `type=image alt` (N10), `placeholder` (N14) und `range` (N16) blockieren jetzt, wie Chromium.
     - Das gilt in Zeile, Menü und im Rückfall ohne `utilityNav` (I2r, N1r). In r4-62 waren alle frei.
   - **Verborgen bleibt zulässig, wie in Chromium:**
     - `alt=""`, ohne `alt`, `alt` aus Leerraum (I1, I4, I15);
     - `aria-hidden`, `hidden`, `inert` am Bild oder an einem Vorfahren (I5–I10);
     - `type=hidden`, auch in Grossschrift (N6, N7);
     - verborgene Eingabefelder und Knöpfe (N11, N12, B9, B12).
   - **Bewusst strenger als Chromium, vertretbar:**
     - Platzhalter «[Eingabefeld]» bei Textfeld ohne Wert, Checkbox und leerem `value` (N4, N8, N9, N15, N17), wie im Kommentar angekündigt;
     - `role="presentation"`/`"none"` am Bild mit `alt` (I11, I12);
     - Bild in `foreignObject` (I17, I18; I18 ist N62-2).
   - **Unverändert gegenüber r4-62:** `<button>`, `<select>`, `<textarea>` mit Text blockieren in beiden Fassungen, wie Chromium (B1, B3–B5). Leere Felder und `<area>` (B2, B6–B8) sind in beiden frei, Chromium ebenso.
   - **Fehlerseite:** Eine eingeschobene Zeile mit `<img alt>` ergibt in keiner Fassung `utility-nav` (`isNotFound`). Die übrigen Meldungen sind in beiden Fassungen gleich.
   - **Kein Übergriff:** `accTxt` wird nur in `contract.js:541` und `:566` verwendet, also nur für Direkteinstiege in Zeile und Menü. `ctlTxt` kommt nur in `accTxt` vor, und keine andere Datei unter `authoring/` verwendet sie (`grep`). Die Grundzustände ergeben in allen vier Varianten 0 Blocker.
   - **Kennzahl des Selbstberichts:** «59 von 67» stimmt mit seiner eigenen Ausgabe überein (59 «ok», 8 «ABW»).
7. **Selbsttest** (`selbsttest-varianten-ausgabe.txt`). Jede Variante läuft in einem Arbeitsbaum ausserhalb des Repositorys und ist danach zurückgesetzt («cmp gleich»).
   - Ohne `ctlTxt` scheitern genau die zwei neuen Fälle: «Selbsttest: 123/125 bestanden».
   - Nur Bild oder nur Feld: je 124/125, also der passende Fall.
   - Bild ohne `alt` als Text: Die Gegenprobe scheitert, 124/125.
   - `d6dd542` ergibt 122/122, hinzugekommen sind also 3.
8. **Tests und Gate:** Insgesamt ist das Gate verschärft. Abgeschwächt ist es nur in den vier Fällen von N65-4. Die Meldungstexte sind unverändert. Testskripte und Testdaten sind unverändert.
9. **Tests selbst ausgeführt** auf `f7f8d18`, Node 22.22.0, Playwright global (`tests-ausgabe.txt`). Danach ist `git status --porcelain` leer.

   | Prüfung | Ergebnis |
   |---|---|
   | `build.mjs --production` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site` |
   | `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
   | `selftest.mjs` | `Selbsttest: 125/125 bestanden` |
   | `suchtest.mjs dist/site` | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
   | `sprachtest.mjs` | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
   | `layouttest.cjs` | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` / `tension core exceeds 1800px`, Exit 1 (bekannte Ausnahme B2c) |
10. **axe-core 4.14.0**, in einem eigenen Ordner ausserhalb des Repositorys installiert und per `page.addScriptTag` geladen (`axe-ausgabe.txt`):
    ```
    axe 4.14.0 · Build r4-65
    Seiten 24 · Läufe 48 · Verstösse 0
    ```
    Geprüft bei 390 und 1280 px, auf `dist/site` aus dem eigenen Build.
11. **Merge und Review**, Stand 09:31 bis 09:38 UTC:
    - **#787:** Entwurf, Kopf `9033857` (Baum gleich `f7f8d18`), Basis `e1db2da`, `mergeable_state` `dirty` (N65-1).
      - CI `build-and-compare` auf `9033857`: `success` (09:28:58 bis 09:29:30 UTC).
      - Kein Codex-Kommentar, keine Reviews, keine Review-Threads. Ein Codex-Review ist nicht ausgelöst, weil der PR ein Entwurf ist.
    - **#784:** bereit zur Prüfung, Kopf `2810994`, Basis `a55ecb1`, `mergeable_state` `clean`. Gegen `main` `d20973b` konfliktfrei (`merge-tree` Exit 0).
      - Codex auf `d6dd542`: «⚠️ **Failed** 2026-10-30T09:11:52Z», danach die Meldung zum Nutzungslimit.
      - Drei Reviews einer eigenen Sitzung, alle «COMMENTED». Das letzte auf `2810994`: «inhaltlich ohne Befund; mergebar erst nach Bestätigung von N62-1 und grüner CI».
      - Review-Threads: einer gelöst und veraltet (K1), einer offen (Logik ohne Befund).
      - CI auf `2810994`: `build-and-compare` `success`, Netlify-Regeln `success`, «Pages changed» `neutral`.
    - **Zusammenführen:** Die Folge «#787 in #784, dann #784 in `main`» geht heute nicht ohne Konflikt (N65-1). Die Tests auf `f7f8d18` bestehen. Ein zusammengeführter Stand existiert nicht und ist darum nicht getestet.
    - **R29-P20 (N62-1):** Bei N61-1 eingehalten. #787 ändert gegenüber `d6dd542` am Gate nur N61-2, und N61-1 liegt allein in #784. Das stützt der Entscheid «#784», den #784 nennt; die Folge-Review auf #784 vermisst dafür einen Beleg auf GitHub. Neu überschneiden sich die beiden PRs aber bei der Kennung r4-65 (N65-1). Für N61-2 ist #787 der einzige offene PR. Daneben sind #792 (nur Pendenzen) und #713 (Entwurf vom 23.10.) offen.
12. **Live-Site** (Hinweis, `live-ausgabe.txt`, 09:36:38 UTC): HTTP 200, `data-puk-site-build="r4-64"`, `site.css?v=r4-64`. r4-65 ist also nicht ausgeliefert.

## Nicht prüfbar

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack). Die Aussagen zum Namen beruhen auf dem Zugänglichkeitsbaum von Chromium 153.
- Safari und Firefox. Wie sie `alt`, `title`, `value` und Platzhalter in den Linknamen aufnehmen, ist nicht gemessen.
- Reale Geräte, Zoom und Systemeinstellungen ausserhalb von Playwright.
- Ein zusammengeführter Stand von #787, #784 und `main`, weil der Merge Konflikte hat (N65-1).
- Codex-Review, weil auf #787 keines gelaufen ist.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**

- **N61-2 ist erfüllt.** `alt` und `value` gehen jetzt in den Namen eines Direkteinstiegs ein, in Zeile, Menü und Rückfall, wie in Chromium.
  - Die neuen Selbsttestfälle greifen.
  - Die erste Fassung ist restlos entfernt.
  - Die Seiten sind bis auf die Kennung gleich wie auf `main`.
  - Alle Tests bestehen.
- **Vor einem Merge** ist N65-1 zu lösen: Die Kennung r4-65 ist doppelt vergeben, und #787 kollidiert mit #784 und mit dem aktuellen `main`. Dafür braucht es einen Entscheid von Christa Egger zur Nummer, eine neue Zusammenführung und eine kurze Nachprüfung des Ergebnisses durch eine Sitzung, die nicht gebaut hat.
- **N65-2 und N65-3** lassen sich dabei mit erledigen.
- **N65-4 bis N65-6** sind gering und betreffen keine Seite. Sie können in einer späteren Arbeit an `contract.js` mitlaufen, zusammen mit N62-2.
