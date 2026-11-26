# Nachprüfung r4-66 · 30.10.2026

**Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-66 starten». Eine andere Sitzung hat diese Prüfsitzung gestartet und den Auftrag weitergegeben.

- **Gegenstand:** r4-66 auf [PR #787](https://github.com/christaegger-dot/borderline-angehoerige/pull/787), Branch `pruefung/2026-10-30-nachpruefung-r4-61` (der Name ist historisch).
  - Beauftragter Kopf: **`7aa64b6`**, aufgesetzt auf `main` = `19a72dc` (r4-65, #784).
  - Geprüft wurde `git diff 19a72dc 7aa64b6`. Selbstbericht: `audit-results/2026-10-30-n61-2-r4-66/BERICHT.md`.
- **Stand während der Prüfung:** #787 steht inzwischen auf **`13f471f`**.
  - Dazu kamen `6fd2153` (Merge von `main` `a323fed`, also #794 und #796) und `13f471f` (Entscheid zur Kennung in der Pendenzendatei und im Selbstbericht vermerkt).
  - `authoring/` und `site/` sind auf `13f471f` gleich wie auf `7aa64b6` (`git diff --quiet 7aa64b6 13f471f -- authoring site`, Exit 0; `merge-ausgabe.txt`). Die Befunde zum Code gelten also auch für `13f471f`.
  - `main` ist während der Prüfung auf `ec821ab` gerückt (#797 um 11:12 UTC, #798).
- **Wer prüft:** eine dritte Sitzung.
  - Sie hat weder N61-2 gebaut noch r4-66 neu gefasst, und sie hat weder die Nachprüfung r4-61 noch die Nachprüfung r4-65 verfasst.
  - Alle Prüfskripte sind neu geschrieben. Die Skripte aus `audit-results/2026-10-30-nachpruefung-r4-61/`, `…-r4-65/` und `…-n61-2-r4-6*/` sind nicht verwendet. Jede Kennzahl ist selbst nachgerechnet.
  - Inhalte und Code sind nicht geändert. `site/` ist nicht beschrieben: Gebaut wurde nur in Arbeitsbäumen ausserhalb des Repositorys, und jeder davon blieb ohne Änderung (`git status`: 0).
  - Committet ist nur dieser Ordner.

Diese Nachprüfung ist keine fachliche, juristische oder institutionelle Freigabe.

**Hinweis zum Ordner und Branch:** Der beauftragte Branch `pruefung/2026-10-30-nachpruefung-r4-66` existierte bei der ersten Abfrage (`git ls-remote`) noch nicht. Um 11:13:36 UTC hat aber eine andere Sitzung dort eine eigene «Nachprüfung r4-66» gepusht (`76613e2`, Ordner `audit-results/2026-10-30-nachpruefung-r4-66/`).
- Diesen fremden Branch habe ich nicht überschrieben.
- Diese Nachprüfung liegt darum auf `pruefung/2026-10-30-nachpruefung-r4-66-b` im Ordner `audit-results/2026-10-30-nachpruefung-r4-66-b/`.
- Den Bericht der anderen Sitzung habe ich nicht gelesen, nur ihre Commit-Nachricht. Beide Prüfungen sind also unabhängig voneinander.
- Welche gilt oder ob beide auf `main` kommen, entscheidet Christa Egger.

**Beilagen in diesem Ordner:**

| Datei | Inhalt |
|---|---|
| `gate-cdp-r4-66.mjs`, `gate-cdp-ausgabe.txt` | 228 Mutationen (57 Fälle × Zeile/Menü × mit/ohne `utilityNav`) über `C.gate` von r4-65 und r4-66, verglichen mit Chromium über CDP; dazu Fehlerseite, gewöhnlicher Link, Ausgangslage |
| `inert-probe.cjs`, `inert-ausgabe.txt` | Gegenprobe in Chromium: Inhalte unter `inert`, Platzhalter, `title` |
| `selbsttest-varianten.cjs`, `selbsttest-varianten-ausgabe.txt` | Selbsttest mit elf Fassungen von `ctlTxt`/`accTxt` |
| `axe-r4-66.cjs`, `axe-ausgabe.txt` | axe-core 4.14.0 |
| `tests-ausgabe.txt` | Tests des Repositorys auf `7aa64b6` und `13f471f`, Selbsttest auf `19a72dc` |
| `merge-ausgabe.txt` | Merge-Proben mit `git merge-tree` |
| `live-ausgabe.txt` | Abfrage der Live-Site |

## Befunde

### N66-1 · wichtig · #787 hat mit dem aktuellen `main` einen Konflikt in der Pendenzendatei

**Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`, Kopfzeile (Zeile 3) und neuer Abschnitt «Korrektur · r4-66» auf `13f471f`.

**Beleg** (`merge-ausgabe.txt`, 11:14:56 UTC):
```
$ git merge-tree --write-tree --name-only a323fed 13f471f
Exit 0
$ git merge-tree --write-tree --name-only origin/main 13f471f
CONFLICT (content): Merge conflict in PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md
Exit 1
origin/main = ec821ab7
```
- `git diff --name-only a323fed origin/main` ergibt nur `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`. #797 (11:12:04 UTC) und #798 haben den Kopf der Datei auf r4-65 nachgeführt («GitHub main: r4-65 … Offen, nicht gemergt: r4-67 ([PR #795] …), r4-66 ([PR #787] …»).
- GitHub meldete um 11:12 UTC für #787 noch `"mergeable_state":"clean"` gegen die Basis `a323fed`. Dieser Stand ist überholt.
- Das hat die bauende Sitzung im Review-Thread zu L2 vorausgesehen: «Sobald diese Nachführung auf `main` liegt, bringe ich `main` in #787 ein.»

**Folge:** #787 lässt sich so nicht mergen. Der Konflikt betrifft nur die Dokumentation. `authoring/` und `site/` sind auf `main` seit `19a72dc` unverändert (`git diff --stat 19a72dc a323fed` und `a323fed..ec821ab` berühren beide Ordner nicht).

**Vorschlag:**
- Die bauende Sitzung bringt `main` (`ec821ab` oder neuer) in #787 ein und übernimmt die Pendenzendatei aus `main`. Obenauf kommt nur der Abschnitt r4-66, der Hinweis am Anfang des Kopfs entfällt. Damit erledigt sich auch N65-3.
- Danach Build, `--verify-site` und CI erneut.
- Eine kurze Nachprüfung durch eine Sitzung, die nicht gebaut hat, genügt: Konfliktauflösung in der Pendenzendatei, dazu `git diff --quiet <alt> <neu> -- authoring site`.

### N66-2 · wichtig · Mergebedingung von #787 nicht erfüllt: Codex-Review gescheitert, PR nicht mehr Entwurf

**Ort:** PR #787, Kopf `13f471f`.

**Beleg** (GitHub, abgefragt 11:12 UTC):
- `"draft": false`. Das Codex-Review wurde durch «Draft marked ready» ausgelöst. Die Pendenzendatei auf `13f471f` nennt #787 aber noch «Entwurf» (Abschnittstitel «Entwurf vom 30.10.2026», Zeile «Entwurf, **nicht gemergt**»).
- Codex-Zusammenfassung um 11:11:57 UTC: «Code Review ⚠️ **Failed** … We couldn’t complete this review», Commit `13f471f`. Um 11:12:03 UTC folgt: «You have reached your Codex usage limits for code reviews.» Ein Review gibt es nicht.
- Drei Review-Threads sind offen (`is_resolved: false`), nämlich L1 (Kennung, inzwischen entschieden), «Zur Regel `ctlTxt`: ohne Befund» und L2 (Pendenzendatei). Inhaltlich sind sie beantwortet.
- Der PR-Text selbst sagt: «Nicht mergen ohne Auftrag und erst nach Codex-Review «Completed» oder auf ausdrücklichen Entscheid von Christa Egger.»
- CI ist grün auf `13f471f`: `build-and-compare` «success» (11:00:57 bis 11:01:53 UTC), Netlify-Prüfungen «success» und «neutral».

**Folge:** R29-P20 («Codex-Review abgeschlossen und geprüft») ist nicht erfüllt. Die zweite Lesart, genau ein offener PR für die Änderung, ist erfüllt (siehe «Bestätigtes», Abschnitt 6).

**Vorschlag:**
- Christa Egger entscheidet, ob #787 ohne Codex-Review gemergt wird (wie bei #788 und #784) oder ob das Review wiederholt wird, wenn das Kontingent wieder frei ist.
- Die bauende Sitzung führt beim Auflösen von N66-1 «Entwurf» nach und schliesst die erledigten Threads.

### N66-3 · gering · Drei Fallarten bleiben milder als Chromium; zwei davon sind neu belegt

**Ort:** `authoring/tools/contract.js:44` (`hiddenFlag` vor `ctlTxt`), `:50–52` (`ctlTxt`, `accTxt`).

**Beleg** (`gate-cdp-ausgabe.txt` und `inert-ausgabe.txt`, Chromium 153.0.8010.12): Von 228 Mutationen ist r4-66 in 12 milder als Chromium, und zwar in drei Fällen, jeweils in Zeile und Menü, mit und ohne `utilityNav`:
```
I5|Zeile: img ohne alt, title="Mehr"|–|–|link «Kurz und klar Mehr»|«Kurz und klar»|nein|MILDER|–
N21|Zeile: input type=button value="Mehr" in span inert|–|–|link «Kurz und klar Mehr»|«Kurz und klar»|nein|MILDER|–
X3|Zeile: textarea placeholder="Mehr"|–|–|link «Kurz und klar Mehr»|«Kurz und klar»|nein|MILDER|–
```
- **I5** ist N65-5 und weiterhin offen.
- **N21 ist neu.** Ein `<input type="button">` unter `inert` geht in Chromium in den Namen ein. Das gilt mit `inert` am Vorfahren wie am Feld selbst. Text, `<img>`, `<button>`, `<select>`, `<textarea>` und `<input type="text">` unter `inert` gehen dagegen nicht ein:
  ```
  Text in span inert | … | link «Kurz und klar»
  input value in span inert | Kurz und klar<span inert><input type="button" value="Mehr"></span> | link «Kurz und klar Mehr»
  input value mit inert am Feld | Kurz und klar<input type="button" value="Mehr" inert> | link «Kurz und klar Mehr»
  input type=text value in span inert | … | link «Kurz und klar»
  ```
  Das Gate lässt alles unter `inert` weg (`hiddenFlag`), auch dieses Feld. Andere Schaltflächentypen (`submit`, `reset`) sind nicht gemessen.
- **X3 ist neu.** Der Platzhalter einer leeren `<textarea>` geht in Chromium in den Namen ein. Das Gate sieht nur den Inhalt der `<textarea>`. Bei `<input type="text" placeholder>` blockiert das Gate über `[Eingabefeld]` ohnehin (N15, «gleich (blockiert)»).

**Einordnung:** Der Renderer erzeugt keine Formularelemente in Direkteinstiegen, also ist keine Seite betroffen. Der Kommentar `contract.js:47` verspricht aber «wie in Chromium».

**Vorschlag:** Bei einer späteren Arbeit an `contract.js` jedes Formularelement (`input` ausser `hidden`, `button`, `select`, `textarea`) in einem Direkteinstieg ohne Rücksicht auf `inert` blockieren, zusammen mit N65-4 bis N65-6. Das ist einfacher und strenger als eine Nachbildung der Sonderfälle von Chromium. Alternativ den Kommentar auf «weitgehend wie in Chromium» einschränken.

### N66-4 · gering · Die Herkunft der Kennung r4-66 ist an zwei Stellen verschieden beschrieben

**Ort:** `authoring/site.config.json` (`releaseApproval.independentReviewWaiver.appliedTo` und `pendingScope`) gegenüber `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (Abschnitt r4-66, «Nummer») auf `7aa64b6`/`13f471f`.

**Beleg:**
- `appliedTo`: «r4-66 (begonnen als r4-65 in PR #787)». `pendingScope`: «… (begonnen als r4-65 in PR #787): …»
- Pendenzendatei und Selbstbericht: «begonnen als r4-63 (`f2fac13`, überholt), dann r4-65 (`f7f8d18`)».

Beides ist für sich nicht falsch, `site.config.json` lässt aber die erste Nummer r4-63 weg.

**Vorschlag:** Beim Auflösen von N66-1 in `site.config.json` «begonnen als r4-63, dann r4-65 in PR #787» schreiben. Das ist nicht dringend.

## Was aus N65-1 bis N65-6 geworden ist

| Befund | Stand auf `7aa64b6`/`13f471f` | Beleg |
|---|---|---|
| N65-1 (wichtig, doppelte Kennung, Konflikt mit #784) | **erledigt.** r4-66 ist eigen, auf `19a72dc` aufgesetzt, und `git merge-tree a323fed 7aa64b6` ergibt Exit 0. #795 trägt jetzt r4-67 (`BUILD = 'r4-67'`, `assetVersion` und `version` r4-67, `data-puk-site-build="r4-67"` auf `51b9b1e`). Der neue Konflikt mit `main` ist N66-1 | `merge-ausgabe.txt` |
| N65-2 (gering, `pendingScope` doppelt) | **betrifft #787 nicht mehr, auf `main` offen.** `pendingScope` von r4-66 ist genau «Eintrag r4-66 + «Vorher: » + `pendingScope` von `19a72dc`» (Vergleich: `true`). Auf `main` stehen «r4-61 (Befund N59-3» und «r4-64 (Befund N56-1» je 2-mal | Abschnitt 1 unten |
| N65-3 (gering, Kopf der Pendenzendatei veraltet) | **teilweise.** Auf `13f471f` steht der Kopf noch auf «GitHub main: r4-64», mit Hinweis «dieser Kopf … noch nicht nachgeführt». `main` hat ihn mit #797 berichtigt. Er erledigt sich mit N66-1 | Kopfzeile auf `ec821ab` |
| N65-4 (gering, Bild/Feld ersetzt den Text) | **offen, bestätigt.** I3 und N16 sind in allen vier Lagen «NICHT MEHR BLOCKIERT» gegenüber r4-65. Chromium nennt den Link richtig, der sichtbare Text ist aber leer (`«»`) | `gate-cdp-ausgabe.txt` |
| N65-5 (gering, `img title`) | **offen, bestätigt** (I5, 4-mal MILDER), siehe N66-3 | ebenda |
| N65-6 (gering, Selbsttest-Lücken) | **offen, bestätigt.** V5 bis V8 bleiben bei 125/125, ebenso V9 (ohne Leerzeichen um `alt`) | `selbsttest-varianten-ausgabe.txt` |

Laut Selbstbericht sind N65-4 bis N65-6 «offen, nicht in diesem Auftrag». Das stimmt. Die Regel ist gegenüber `f7f8d18` unverändert (siehe unten).

## Bestätigtes

1. **Diff `19a72dc..7aa64b6`.**
   - **Geänderte Dateien:** `git diff --stat` ergibt nur `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`, `authoring/site.config.json`, `authoring/tools/contract.js`, 24 Dateien in `site/` und drei Ordner unter `audit-results/` (`n61-1-n61-3-r4-63`, `n61-2-r4-65`, `n61-2-r4-66`). Bei Ausschluss dieser Pfade ist `git diff --stat 19a72dc 7aa64b6 -- . ':!site' ':!audit-results' ':!authoring/tools/contract.js' ':!authoring/site.config.json' ':!PENDENZEN…'` leer.
   - **Unverändert:** Fragmente (`authoring/content/`), Stylesheet, `interaktion.js`, Renderer, Suche, die Testskripte, `authoring/tests/suche-ersttreffer.tsv`, Akuthinweise und Sprungziele.
   - **`site/`:** Alle 96 geänderten Zeilen in `site/` sind Kennungen: je 24-mal `data-puk-site-build`, `site.css?v=` und `interaktion.js?v=` von r4-65 auf r4-66. `git diff -U0 origin/main 7aa64b6 -- site` ergibt 0 Zeilen ohne `r4-65`/`r4-66`.
   - **`contract.js` gegenüber `19a72dc`:** nur `BUILD = 'r4-66'` (`:11`), `ctlTxt` mit neuem `accTxt` und Kommentar (`:47–52`), zwei Einträge in `MUTATIONS` (`:745–746`) und eine Gegenprobe (`:937–941`). Entfernt sind nur die alte `BUILD`- und die alte `accTxt`-Zeile.
   - **Kennung:** `assetVersion`, `independentReviewWaiver.version` und `BUILD` stehen auf r4-66. Ein Feldvergleich von `site.config.json` ergibt als geänderte Felder nur `.assetVersion .releaseApproval.pendingScope .releaseApproval.independentReviewWaiver.version .releaseApproval.independentReviewWaiver.appliedTo`. `appliedTo` beginnt wörtlich mit der Fassung von `main` und ergänzt «r4-65 am 30.10.2026 gemergt (PR #784); r4-66 …». Kein Stand fehlt, keiner kommt durch r4-66 doppelt hinzu.
   - **Regel gleich wie im nachgeprüften Stand:** `git diff f7f8d18 7aa64b6 -- authoring/tools/contract.js` ändert nur Kennungen in Kommentaren und Testnamen (r4-62 → r4-65, r4-65 → r4-66) sowie `BUILD`. Die Zeilen `ctlTxt` und `accTxt` (`:50–52`), `hiddenFlag`, `inSvg` und `svgSilenced` sind wortgleich.
   - **Pendenzenabschnitt r4-66:** Inhalt, Grundlage `19a72dc`, Nummernfolge und die Hinweise zur Unabhängigkeit stimmen mit Git und GitHub überein. Ausnahmen sind «Entwurf» (N66-2) und der nicht nachgeführte Kopf (N65-3, N66-1). «Seit 09:52 UTC ist r4-65 auf `main`» stimmt (`19a72dc`, `2026-10-30T10:52:58+01:00`).
   - **Entscheide an der Quelle:** «#787 behält r4-66, #795 wird r4-67» steht auf `13f471f` in der Pendenzendatei und im Selbstbericht, ebenso im Review-Thread L1 auf #787 (11:00:54 UTC). Belegt ist das nur über Mitteilungen von Sitzungen, ein Wortlaut von Christa Egger selbst ist auf GitHub nicht zu sehen. Der frühere gegenteilige Wortlaut ist als überholt vermerkt. #795 heisst auf GitHub «r4-67 (begonnen als r4-66) …».
2. **Gate-Regeln gegen Chromium über CDP** (`gate-cdp-ausgabe.txt`).
   - **Methode:**
     - Eingabe wie in `build.mjs`: veröffentlichte Seiten über `C.renderPage`, Suchindex über `injectSearchIndex`, Modus `production`, `report` aus `authoring/PRUEFBERICHT.md`, `exists` wie dort. Der Rückfall ohne `utilityNav` ist neu gerendert.
     - Chromium 153: `Accessibility.getPartialAXTree` am Link, die Zeile bei 390 px, das Menü bei 300 px und geöffnet (Direkteinstiege im Menü zeigt das Stylesheet nur unter 20 rem, `site.css:642`).
   - **Ausgangslage:** 0 Blocker in beiden Fassungen. Alle 20 Befunde (Stufe, Seite, Regel, Meldung) sind in r4-65 und r4-66 gleich.
   - **Bilanz r4-66 gegen Chromium** über 228 Fälle: 94 «gleich (frei)», 86 «gleich (blockiert)», 36 «STRENGER», 12 «MILDER» (N66-3).
   - **Bilanz gegen r4-65:** 98 neu blockiert, davon 66 richtig und 32 bewusst strenger; 8 nicht mehr blockiert (N65-4).
   - **Richtig erkannt** wie Chromium, in Zeile, Menü und Rückfall:
     - `alt` in jeder Schreibweise (I1, I15 `IMG ALT`), `aria-hidden="false"` am Bild oder Vorfahren (I16, I22), `<picture>` (I18), `alt` gleich der Beschriftung neben dem Text (I21), `alt=""` mitten im Wort (I19: Chromium «Kurz un d klar», Gate blockiert);
     - `value` bei `button`, `submit`, `text`, `BUTTON` (N1, N3, N5, N20); `submit` ohne `value` (Chromium «Submit», N2); `image` mit und ohne `alt` (N11, N12); `range` (Chromium «50», N18); Platzhalter (N15);
     - `<button>` mit Text oder Bild (B1, B5), `<select>` (S1, S3), `<textarea>` mit Inhalt (X1).
   - **Richtig frei:**
     - `alt=""`, kein `alt`, `alt=""` mit `title`, `alt` nur aus Leerraum (I2, I4, I6, I17);
     - verborgen mit `aria-hidden`, `hidden` oder `inert`, am Bild oder an einem Zwischenelement (I7 bis I12);
     - `type="hidden"`, `HIDDEN`, `TYPE="Hidden"` (N6 bis N8), Feld mit `hidden` oder `aria-hidden` (N13, N14);
     - leere `<button>` und leere `<select>`, leere `<textarea>`, `<button>` mit der Beschriftung (B3, B4, S2, X2).
   - **Bewusst strenger** (Gate blockiert, Chromium nicht): `role="presentation"`/`"none"` am Bild (I13, I14), `style="display:none"` (I20, CSS sieht das Gate nicht), Platzhalter `[Eingabefeld]` bei `text`, `checkbox`, `button` mit `value=""` und Feld ohne `type` (N4, N9, N10, N17, N19). Dazu kommt `input type=image` mit `alt` gleich der Beschriftung statt Text (N22, schon in r4-65 blockiert, sichtbarer Text leer). Das deckt sich mit dem Kommentar «in einem Link ohnehin unzulässig». Keine Seite ist betroffen.
   - **Kein Übergriff:**
     - `accTxt` wird nur in `utilityOf` (`:541`) und `menuUtility` (`:566`) verwendet.
     - Ein gewöhnlicher Link im Inhalt mit `<img alt>` und `<input value>` ergibt in r4-65 und r4-66 dieselben Befunde.
     - Auf der Fehlerseite wertet das Gate die Zeile nicht aus (`isNotFound`). Eine eingeschobene Zeile mit `<img alt>` ergibt in beiden Fassungen dieselben Befunde.
     - Die unveränderte Fehlerseite hat 0 Blocker.
3. **Selbsttest und Gate** (`selbsttest-varianten-ausgabe.txt`, `tests-ausgabe.txt`).
   - **Zahl der Fälle:** `19a72dc` hat «Selbsttest: 122/122 bestanden», `7aa64b6` «125/125». Neu sind drei Fälle, keiner ist entfernt oder gelockert. Die Testskripte sind unverändert.
   - **Die neuen Fälle greifen:**
     - V1 ohne `ctlTxt` ergibt `123/125`, mit genau `FAIL | Direkteinstieg mit img alt im Link (r4-66, N61-2)` und `FAIL | Direkteinstieg im Menü mit input value im Link (r4-66, N61-2)`.
     - V2 (nur `img`) und V3 (nur `input`) scheitern je am anderen Fall (`124/125`).
     - Die Gegenprobe greift: V4 («leeres `alt` zählt als ‹Bild›») ergibt `FAIL | Bild mit leerem alt und verborgenes Bild …`, `124/125`.
   - **Einordnung:** Die Prüfung ist gleichwertig oder strenger, ausser in den Lockerungen von N65-4. Die Meldungstexte sind unverändert.
4. **Tests selbst ausgeführt** (Node 22.22.0, Playwright über `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`, Arbeitsbaum ausserhalb des Repositorys).

   | Prüfung | `7aa64b6` | `13f471f` (mit `main` `a323fed`) |
   |---|---|---|
   | `build.mjs --production` | `24 Seiten · 0 Blocker · 20 Hinweise` | gleich |
   | `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` | gleich |
   | Selbsttest | `125/125 bestanden` | gleich |
   | Suchtest (`dist/site`) | `216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` | gleich |
   | Sprach-/UI-Test | `73 Prüfungen bestanden · JS-Fehler 0` | gleich |
   | Layouttest | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` / `tension core exceeds 1800px`, Exit 1 (bekannte Ausnahme B2c) | gleich |

   Ein Stand, der `ec821ab` enthält, ist nicht getestet, weil der Merge einen Konflikt hat (N66-1). `authoring/` und `site/` sind dort aber gleich wie auf `a323fed`.
5. **axe-core 4.14.0**, in einem eigenen Ordner ausserhalb des Repositorys installiert und mit `page.addScriptTag` geladen, auf `dist/site` von `7aa64b6` über HTTP: `axe 4.14.0 · Build r4-66 · Chromium 153.0.8010.12 · Seiten 24 · Läufe 48 · Verstösse 0` (390 und 1280 px).
6. **Merge und Review.**
   - **#787:** offen, kein Entwurf, Kopf `13f471f`, Basis `main`, CI grün. Zu Codex und den Threads siehe N66-2.
   - **Merge:** `7aa64b6` und `13f471f` lassen sich mit `a323fed` ohne Konflikt zusammenführen, und `13f471f` (enthält `a323fed`) besteht alle Tests. Gegen `ec821ab` gibt es einen Konflikt (N66-1).
   - **#795:** Die Kennung kollidiert nicht mehr (r4-67). Die Dateien überschneiden sich erwartungsgemäss: `git merge-tree 13f471f 51b9b1e` meldet Konflikte in `site.config.json`, `contract.js` und allen Seiten in `site/`. Bei der beschlossenen Reihenfolge (zuerst #787) muss #795 danach `main` einbringen und neu bauen. Seine `pendingScope` beginnt mit «r4-67 … Vorher: r4-65» und braucht dann r4-66 dazwischen. #795 enthält kein `ctlTxt` (`git grep`).
   - **Genau ein PR:** Für N61-2 ist nur #787 offen. Auch die übrigen offenen PRs enthalten `ctlTxt` nicht: #795, #799 (Nachprüfung des gemergten r4-65), #793 (Nachprüfung), #713. #797 und #798 sind inzwischen gemergt.
7. **Live-Site** (nur Hinweis, `live-ausgabe.txt`, 11:14:16 UTC): `data-puk-site-build="r4-65"`, `site.css?v=r4-65`. r4-66 ist nicht veröffentlicht, wie erwartet.

## Nicht prüfbar

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack). Die Aussagen zum Namen beruhen auf dem Zugänglichkeitsbaum von Chromium 153.
- Safari und Firefox. Wie sie `alt`, `title`, `value`, Platzhalter und `inert` in den Linknamen aufnehmen, ist nicht gemessen.
- Reale Geräte, Zoom und Systemeinstellungen ausserhalb von Playwright.
- Der mit `ec821ab` zusammengeführte Stand, wegen des Konflikts (N66-1).
- Ein Codex-Review, weil es am Nutzungslimit gescheitert ist (N66-2).
- Ob Christa Egger die Entscheide zur Kennung wörtlich so gefasst hat. Belegt sind sie nur durch Vermerke von Sitzungen.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**

- **N61-2 ist erfüllt.**
  - `alt` und `value` gehen in Zeile, Menü und Rückfall in den Namen eines Direkteinstiegs ein, wie in Chromium.
  - Die Regel ist dieselbe wie im nachgeprüften Stand `f7f8d18`.
  - Die neuen Selbsttestfälle greifen.
  - Die Seiten sind bis auf die Kennung byte-gleich mit `main`.
  - Alle Tests und axe-core bestehen.
- **Vor einem Merge:**
  - N66-1 lösen: `main` einbringen, Pendenzendatei aus `main` übernehmen, nur den Abschnitt r4-66 obenauf setzen.
  - Für N66-2 einen Entscheid von Christa Egger einholen: Merge ohne Codex-Review oder Review wiederholen.
  - Die Kontrolle des Merges braucht nur eine kurze Nachprüfung der Pendenzendatei und der Gleichheit von `authoring/` und `site/`.
- **N66-3, N66-4 und N65-4 bis N65-6** sind gering und betreffen keine Seite. Sie können in einer späteren Arbeit an `contract.js` mitlaufen.
