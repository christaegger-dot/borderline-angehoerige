# Nachprüfung r4-66 · PR #787 · 30.10.2026

**Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-66 starten».

- **Gegenstand:** r4-66 = [PR #787](https://github.com/christaegger-dot/borderline-angehoerige/pull/787), Branch `pruefung/2026-10-30-nachpruefung-r4-61` (Name historisch). Befund N61-2 der Nachprüfung r4-61: `accTxt` nimmt `alt` von Bildern und `value` von Eingabefeldern in die Beschriftung der Direkteinstiege auf (`ctlTxt`).
- **Geprüfter Stand:** Kopf `13f471f2c4bdc8bc7c23065aabff445a8be7004d` (11:00:47 UTC). Basis `main` `a323fed` (r4-65 mit #784, dazu #796 und #794). `git merge-base` ergibt `a323fed`.
- **Stabilität:** Der Kopf trug schon bei Beginn (10:57:56 UTC, damals `6fd2153`) `BUILD = 'r4-66'`. Um 11:00:47 UTC kam `13f471f`; er ändert nur die Pendenzendatei (1 Zeile) und `BERICHT.md` (+2). Bei der Abfrage um 11:11:03 UTC war das immer noch der Kopf, also mehr als 10 Minuten ohne neuen Commit. Alle Messungen unten liefen auf `13f471f`. Die Gate-Messung lief schon um ca. 11:00 UTC auf `6fd2153`; `authoring/` ist dort gleich wie auf `13f471f` (`git diff 6fd2153 13f471f -- authoring site` leer).
- **Wer prüft:** eine Sitzung, die r4-66 weder gebaut noch neu gefasst hat und keine der Nachprüfungen r4-61 oder r4-65 verfasst hat. Sie ändert keinen Inhalt und keinen Code und committet nur diesen Ordner. Die Prüfskripte sind neu geschrieben (`mess.mjs`, `axe.cjs`).
- **Umgebung:** Node 22.22.0, Chromium 153.0.8010.12 (Playwright über `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`). Arbeitsbäume ausserhalb des Repositorys im Arbeitsordner der Sitzung (`git worktree`, `main` und #787). axe-core 4.14.0 in einem eigenen Ordner, geladen per `page.addScriptTag`. `site/` ist nie beschrieben worden: `git status --porcelain site` ergab vor und nach den Tests 0 Zeilen (`tests-ausgabe.txt`).

**Beilagen:** `mess.mjs` (Gate gegen Chromium), `axe.cjs`, `mutationen-r4-66.txt`, `mutationen-r4-65.txt`, `tests-ausgabe.txt`, `axe-ausgabe.txt`.

## Ergebnis

**Empfehlung: «Nachbesserung nötig, ohne Blocker».**

r4-66 behebt N61-2 wie verlangt. Gegenüber `main` ändern sich nur `contract.js`, `site.config.json`, die Pendenzendatei, `audit-results/` und in `site/` nur die Kennung. Die Kennzahlen des Selbstberichts stimmen. Im Abgleich mit Chromium sinkt die Zahl der Fälle, die das Gate durchlässt, obwohl Chromium einen anderen Namen bildet, von 23 auf 1. Das Gate wird an keiner Stelle schwächer, ausser wo es bisher strenger als Chromium war (N66-4). Es bleiben fünf geringe Befunde. Keiner davon wirkt auf die veröffentlichten Seiten, und keiner muss vor einem Merge behoben sein.

## Befunde

| Befund | Schweregrad | Kurz |
|---|---|---|
| N66-1 | gering | `<img title>` ohne `alt` im Direkteinstieg: Chromium nimmt `title` in den Namen auf, das Gate nicht (Falsch-Negativ) |
| N66-2 | gering | Gate strenger als Chromium bei `role="presentation"`/`"none"`, Checkbox, Radio, Farbe, `noscript`, `template`; der Kommentar sagt «wie in Chromium» |
| N66-3 | gering | Die Ausnahme für `input type="hidden"` ist durch keinen Selbsttestfall gedeckt |
| N66-4 | gering | Ein Bild oder Eingabefeld kann den sichtbaren Linktext ganz ersetzen; r4-65 blockierte das, r4-66 nicht |
| N66-5 | gering | `pendingScope` und `appliedTo`: «begonnen als r4-65 in PR #787» stimmt nicht; begonnen wurde als r4-63 |

### N66-1 · gering · `title` eines Bildes ohne `alt`

- **Ort:** `authoring/tools/contract.js:50` (`ctlTxt`).
- **Beleg:** `mutationen-r4-66.txt`, Fall «img ohne alt mit title="Mehr"»:
  `img ohne alt mit title="Mehr" | kein Blocker | "Kurz und klar Mehr" | ja | FALSCH-NEGATIV (Gate lässt durch)`.
  Chromium nimmt den `title` eines Bildes ohne `alt` in den Namen des Links auf. `ctlTxt` liest nur `c.attrs.alt || ''`. Mit `alt=""` ignoriert Chromium den `title` («img alt="" title="Mehr"» → «Kurz und klar», gleich). Bei Eingabefeldern mit `title` blockiert das Gate ohnehin über den Platzhalter `[Eingabefeld]`.
- **Wirkung:** keine auf die Website. Der Renderer erzeugt die Direkteinstiege selbst, kein Fragment setzt dort ein Bild.
- **Vorschlag:** In `ctlTxt` für `img` ohne `alt`-Attribut den `title` verwenden (`has(c, 'alt') ? c.attrs.alt : c.attrs.title || ''`) und einen Selbsttestfall ergänzen.

### N66-2 · gering · Gate in einigen Fällen strenger als Chromium

- **Ort:** `contract.js:47–52` (Kommentar «wie in Chromium» und `ctlTxt`/`accTxt`).
- **Beleg:** `mutationen-r4-66.txt`. In diesen Fällen blockiert das Gate, Chromium bildet aber den Namen «Kurz und klar»:
  - `img role="presentation" alt="Mehr"` und `img role="none" alt="Mehr"`;
  - `input type="checkbox"` (mit und ohne `value`, auch im Menü), `input type="radio" value="Mehr"`, `input type="color"`;
  - `input type="text"` ohne oder mit leerem `value`, `input type="button"` ohne `value`. Das ist laut Kommentar Absicht («zählt als Platzhalter, damit es auffällt»);
  - `<noscript>` und `<template>` mit `<img alt="Mehr">`: Chromium lässt den Inhalt weg, `accTxt` steigt hinein.
- **Wirkung:** keine auf die Website. Das Gate blockiert hier nur Markup, das in einem Link ohnehin unzulässig oder ungewöhnlich ist (interaktive Elemente in `<a>`). Ungenau ist aber die Aussage im Kommentar und im Nachweis, die Regel gelte «wie in Chromium».
- **Vorschlag:** Entweder angleichen (Präsentationsrolle bei `img`, Checkbox, Radio und Farbe ohne Beitrag, `noscript` und `template` wie `RAW`) oder im Kommentar festhalten, wo das Gate bewusst strenger ist.

### N66-3 · gering · Ausnahme `type="hidden"` ohne Selbsttest

- **Ort:** `contract.js:51` (`=== 'hidden' ? ''`) und die Selbsttestfälle zu N61-2.
- **Beleg:** In einer Kopie von `authoring/` ausserhalb des Repositorys ist `'hidden'` durch `'hiddenX'` ersetzt. Damit gilt `<input type="hidden">` als sichtbares Eingabefeld. Der Selbsttest meldet trotzdem `Selbsttest: 125/125 bestanden`.
  Gegenproben, die greifen: Ohne `ctlTxt` in `accTxt` scheitern beide neuen Mutationen (`123/125`, wie im Selbstbericht). Mit `alt || '[Bild]'` scheitert die Gegenprobe (`124/125`). Ohne den Zweig für `img` scheitert «Direkteinstieg mit img alt im Link» (`124/125`).
- **Vorschlag:** `<input type="hidden" value="…">` in die Gegenprobe aufnehmen, wenn `contract.js` das nächste Mal bearbeitet wird.

### N66-4 · gering · Bild oder Feld statt sichtbarem Text

- **Ort:** `contract.js:52` und Regel `utility-nav`/`nav` (`contract.js:541`, `566`).
- **Beleg:** `mutationen-r4-65.txt` und `mutationen-r4-66.txt`:
  - «img alt = Beschriftung, Text entfernt» (`<a …><img alt="Kurz und klar"></a>`): r4-65 `utility-nav`, r4-66 `kein Blocker`, Chromium «Kurz und klar».
  - «input value = Beschriftung, Text entfernt»: ebenso.
  Der zugängliche Name stimmt dann mit Chromium überein, r4-66 rechnet also richtig. Die sichtbare Beschriftung ist aber kein Text mehr, sondern ein Bild oder ein Eingabefeld. Das Gate prüft seit r4-58, dass der Name «die sichtbare Beschriftung» ist (WCAG 2.5.3).
- **Wirkung:** keine auf die Website. Es ist die einzige Stelle, an der r4-66 etwas durchlässt, das r4-65 blockierte. In der Gegenrichtung behebt r4-66 auch ein Falsch-Positiv von r4-65: «Kurz und<img alt="">klar» heisst in Chromium «Kurz und klar».
- **Vorschlag:** Entscheiden, ob ein Direkteinstieg zusätzlich sichtbaren Text in der Länge der Beschriftung braucht, zum Beispiel `norm(txt(a))` gleich der Beschriftung neben `norm(accTxt(a))`. Sonst so lassen und im Kommentar vermerken.

### N66-5 · gering · Nummernhistorie in `site.config.json`

- **Ort:** `authoring/site.config.json`, `releaseApproval.pendingScope` (Eintrag r4-66) und `releaseApproval.independentReviewWaiver.appliedTo` (Zusatz).
- **Beleg:** Dort steht «r4-66 (begonnen als r4-65 in PR #787)». Begonnen wurde #787 aber als r4-63: `git grep -n "BUILD = '" f2fac13 -- authoring/tools/contract.js` ergibt `const BUILD = 'r4-63';` (Commit `f2fac13`, 08:30:37 UTC). Pendenzendatei und `BERICHT.md` nennen das richtig: «begonnen als r4-63 (`f2fac13`, überholt), dann r4-65 (`f7f8d18`)».
- **Vorschlag:** In beiden Feldern «begonnen als r4-63, dann r4-65» schreiben, wenn #787 das nächste Mal angepasst wird (nach dem angekündigten Merge der Pendenzen-PR, siehe unten).

## Bestätigtes

### 1. Diff vollständig, Kennung stimmig

`git diff --stat a323fed 13f471f`: 38 Dateien. Ausser `site/` und `audit-results/` ändern sich nur:

```
$ git diff a323fed 13f471f --name-only | grep -v '^site/\|^audit-results/'
PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md
authoring/site.config.json
authoring/tools/contract.js
```

- **Unverändert:** Fragmente, Stylesheet, Skript, Renderer, Suche und Testdateien. `git diff --stat a323fed 13f471f -- authoring/content authoring/css authoring/js authoring/tests authoring/tools/build.mjs authoring/tools/search-index.mjs authoring/tools/suchtest.mjs authoring/tools/sprachtest.mjs authoring/tools/layouttest.cjs authoring/tools/selftest.mjs` ist leer, also auch `suche-ersttreffer.tsv`. Der Renderer steckt in `contract.js`; dort ändern sich nur die Zeilen unten.
- **`contract.js`:**
  - `BUILD = 'r4-66'` (Z. 11);
  - Kommentar, `ctlTxt` und `accTxt` (Z. 47–52);
  - zwei Einträge in `MUTATIONS` (Z. 745–746);
  - eine Gegenprobe im Selbsttest (Z. 937–941).

  `accTxt` wird nur in `utilityOf` (Z. 541) und für die Direkteinstiege im Menü (Z. 566) aufgerufen. `ctlTxt` wirkt also nirgends sonst.
- **`site.config.json`:** Ein Vergleich der JSON-Bäume zeigt genau vier geänderte Werte: `assetVersion` (r4-65 → r4-66), `releaseApproval.pendingScope`, `releaseApproval.independentReviewWaiver.version` (r4-65 → r4-66) und `releaseApproval.independentReviewWaiver.appliedTo`. `pendingScope` ist der Eintrag r4-66 vor dem unveränderten Wert von `main` («… Vorher: » + alter Wert). `appliedTo` ist der alte Wert plus «; r4-65 am 30.10.2026 gemergt (PR #784); r4-66 …».
- **`site/`:** 35 Dateien. Nach Ersetzen von `r4-66` durch `r4-65` sind sie gleich wie auf `main`: `diff -r` leer, Dateiliste gleich. 24 Seiten tragen `data-puk-site-build="r4-66"`.

### 2. Keine r4-67 mehr für #787

- **Branch:** Auf dem Kopf steht r4-67 nur im vermerkten Entscheid. `git grep -n "r4-67" 13f471f` trifft nur `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:13` und `audit-results/2026-10-30-n61-2-r4-66/BERICHT.md:14`: «entschied Christa Egger am 30.10.2026: «#787 behält r4-66», #795 wird r4-67 … eine vorbereitete Umbenennung in r4-67 ist verworfen und nie gepusht worden».
- **Ordner und Branches:** Es gibt keinen Ordner `n61-2-r4-67` (`git ls-tree -d --name-only 13f471f audit-results/ | grep r4-67` leer) und keinen Branch mit «r4-67» (`git ls-remote origin | grep r4-67` leer).
- **`site/` und Konfiguration:** nur r4-66.
- **PR-Titel:** «r4-66: alt und value im Direkteinstieg wie Chromium (N61-2), neu gefasst auf main (r4-65)».
- **#795:** Der PR trägt r4-67 (`git grep "BUILD = '" 51b9b1e` → `'r4-67'`). Sein Branch heisst weiterhin `korrektur/2026-10-30-n62-2-r4-66`; der Name ist historisch und betrifft #787 nicht.
- **Übrige Ordner:** `audit-results/2026-10-30-n61-1-n61-3-r4-63/` und `…-n61-2-r4-65/` aus früheren Fassungen sind im Diff enthalten und laut Selbstbericht und Review als «Überholt» bzw. «Umbenannt» gekennzeichnet.

### 3. Gate-Regeln gegen Chromium (CDP)

`mess.mjs` rendert die Seiten wie `build.mjs` (`renderPage` mit `injectSearchIndex`) und ändert `index.html` am Direkteinstieg «Kurz und klar». Danach prüft es mit `C.gate(…, { mode: 'production' })`. Dieselbe Seite lädt es in Chromium und liest den Namen des Links über CDP (`DOM.querySelector`, `DOM.describeNode`, `Accessibility.getPartialAXTree`). Die Zeile wird bei 1280 px gemessen, das Menü bei 300 px mit offenem Menü. Das Gate soll genau dann blockieren, wenn der Chromium-Name von «Kurz und klar» abweicht.

| Stand | Fälle | gleich wie Chromium | Gate strenger | Gate lässt durch |
|---|---|---|---|---|
| r4-65 (`main`, `a323fed`) | 61 | 35 | 3 | 23 |
| r4-66 (`13f471f`) | 61 | 48 | 12 | 1 (N66-1) |

Richtig erkannt sind unter anderem:
- **Bilder:** `alt` leer, nur Leerraum (Chromium «Kurz und klar »), fehlend, gleich der Beschriftung zusätzlich zum Text, abweichend, mitten im Wort (Chromium «Kurz und kl ar», wie das Gate), Grossschrift, in `<picture>`, in `<span aria-hidden="false">`;
- **verborgene Bilder:** `aria-hidden="true"` und `hidden` am Bild;
- **`<area alt>`**, im Link und über `usemap`: Chromium nimmt es nicht auf, das Gate auch nicht;
- **Eingabefelder:** `text` mit `value`, ohne `type`, mit `placeholder`; `hidden` und `HIDDEN`; `button` und `submit` mit `value`; `submit` und `reset` ohne `value` (Chromium «Submit», «Reset»); `image` mit und ohne `alt` (Chromium «Mehr» bzw. «Submit»); `range` (Chromium «50»); `file`; `hidden`- und `aria-hidden`-Attribut;
- **weitere Elemente:** `<textarea>` gefüllt und leer, `<select>` (auch zweite Option gewählt und leere Option), `<button>`, SVG mit `aria-hidden` um `foreignObject` mit Bild;
- **Menü:** Bild mit und ohne `alt`, `button`, `hidden`; das Gate meldet dort `nav`.

Weitere Fälle (nur Gate):
- **Rückfall ohne `utilityNav`** (Eintrag «Website durchsuchen»): Basis ohne Blocker; `<img alt="Mehr">` → `utility-nav`; `<img alt="">` plus `<input type="hidden">` → ohne Blocker.
- **Fehlerseite:** Sie hat keine Zeile «Direkteinstiege» und ohne Änderung keinen Blocker. Ein `<a>…<img alt="Mehr"></a>` im Inhalt löst kein `utility-nav` aus. Es meldet nur `placeholder-status`, auf `main` gleich (`mutationen-r4-65.txt`), also unabhängig von `ctlTxt`.
- **Unveränderte Seiten:** 0 Blocker, 20 Hinweise, wie auf `main`.

**Neue Selbsttestfälle greifen:** Ohne `ctlTxt` in `accTxt` (Kopie ausserhalb des Repositorys) scheitern genau die zwei neuen Mutationen:

```
FAIL | Direkteinstieg mit img alt im Link (r4-66, N61-2) | erwartet: utility-nav | erhalten: crisis-number-check
FAIL | Direkteinstieg im Menü mit input value im Link (r4-66, N61-2) | erwartet: nav | erhalten: crisis-number-check
Selbsttest: 123/125 bestanden
```

Auf `main` (r4-65) meldet `selftest.mjs` `122/122`. r4-66 fügt drei Fälle hinzu (125).

### 4. Tests und Gate: verschärft

- **Gate:** In 22 Fällen blockiert das Gate jetzt wie Chromium, wo es bisher durchliess. Durchgelassen wird neu nur, was r4-65 strenger als Chromium blockierte (N66-4).
- **Selbsttest:** Kein bestehender Fall ist entfernt oder abgeschwächt; drei sind neu. Alle 122 Fälle von `main` bestehen weiter (125/125).
- **Übrige Regeln:** `hiddenFlag`, `concealed`, `relabelled` und die SVG-Regeln von r4-65 sind unverändert. Sie greifen vor `ctlTxt`.

### 5. Tests selbst ausgeführt (`tests-ausgabe.txt`)

Auf `13f471f`, im Arbeitsbaum ausserhalb des Repositorys, nur nach `dist/`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site` |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `selftest.mjs` | `Selbsttest: 125/125 bestanden` |
| `suchtest.mjs dist/site` | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| `sprachtest.mjs` | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| `layouttest.cjs` | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` / `tension core exceeds 1800px`, Exit 1; auf `main` gleich (bekannte Ausnahme B2c) |

Die Kennzahlen des Selbstberichts (`audit-results/2026-10-30-n61-2-r4-66/BERICHT.md`) stimmen alle, auch «ohne `ctlTxt` 123/125».

### 6. axe-core (`axe-ausgabe.txt`)

```
axe 4.14.0 · Build r4-66 · Seiten 24 · Läufe 48 · Verstösse 0
```

Alle 24 Seiten von `dist/site` (inklusive `404.html`), je bei 390 und 1280 px, axe-core aus eigenem Ordner per `page.addScriptTag`.

### 7. Merge und Review (Stand 11:01–11:11 UTC)

- **#787:**
  - Entwurf, offen, `mergeable_state: clean`, Basis `a323fed` = aktuelles `main`.
  - CI auf `13f471f`: `build-and-compare` success (11:00:57–11:01:53 UTC). Netlify: Redirect rules und Header rules success, Pages changed neutral.
  - Kein Codex-Review.
  - Zwei Reviews einer eigenen Review-Sitzung, auf `7aa64b6` und `13f471f`, beide mit dem Urteil «Befunde, nicht mergen». Deren L1 (doppelte Kennung) ist erledigt. Offen sind L2 (Pendenzendatei überschneidet sich mit den Pendenzen-PR #797 und #798) und L3 (Entscheid an Stelle von Codex, #793 nicht gemergt, diese Nachprüfung).
  - Drei Review-Threads, alle nicht aufgelöst.
  - #787 ist weiterhin Copilot zugewiesen.
  - Die bauende Sitzung kündigt an, nach dem Merge der Pendenzen-Nachführung `main` erneut einzubringen. Danach ändert sich der Kopf, aber laut Ankündigung nur in der Pendenzendatei.
- **Nachtrag 11:12 UTC:** Kurz nach der Prüfung wurde [PR #797](https://github.com/christaegger-dot/borderline-angehoerige/pull/797) (Pendenzen) gemergt. `main` steht jetzt auf `dd884e6`; geändert ist nur die Pendenzendatei (`git diff --stat a323fed dd884e6`: 1 Datei). `git merge-tree --write-tree dd884e6 13f471f` meldet einen Konflikt, nur in `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`. #787 ist damit nicht mehr konfliktfrei mergebar. Die bauende Sitzung hat angekündigt, nach dieser Nachführung `main` einzubringen (L2). Eine Änderung, die nur diese Datei betrifft, berührt diese Nachprüfung nicht. Jede Änderung an `authoring/` oder `site/` über die Kennung hinaus bräuchte eine neue Prüfung.
- **Reihenfolge mit #795 (r4-67, Kopf `51b9b1e`):** zuerst #787, dann #795. So steht es auch in der Beschreibung von #795.
- **Konflikte:** `git merge-tree --write-tree 13f471f 51b9b1e` ergibt 26 Konflikte:
  - `authoring/tools/contract.js`, zwei Stellen: `BUILD` (r4-66 gegen r4-67) und die angrenzenden Selbsttestblöcke. Die Gegenprobe zu N61-2 und der neue Fall zu N62-2 stehen an derselben Stelle; beide bleiben.
  - `authoring/site.config.json`;
  - alle 24 Seiten in `site/`.

  `ctlTxt`/`accTxt` und `inSvg` von #795 gehen ohne Konflikt zusammen.
- **Probe:** In einer Kopie ausserhalb des Repositorys sind die Konflikte von Hand aufgelöst: beide Blöcke behalten, `BUILD` und `assetVersion` r4-67. Ergebnis: `Selbsttest: 126/126 bestanden`, unveränderte Seiten `0 Blocker, 20 Hinweise`. Die Gate-Urteile aller 61 Fälle sind gleich wie auf r4-66. Für #795 heisst das: nach dem Merge von #787 `main` einbringen, die Konflikte so auflösen, `site/` neu bauen und `pendingScope` sowie `appliedTo` ergänzen.

### 8. Live-Site (nur Hinweis)

```
$ curl -sS https://borderline-angehoerige.netlify.app/   (11:04:25 UTC, HTTP 200)
data-puk-site-build="r4-65"
```

Das entspricht `main`. r4-66 ist nicht veröffentlicht.

## Nicht prüfbar

- Echte Screenreader (NVDA, JAWS, VoiceOver, TalkBack). Der Abgleich gilt nur für den Zugänglichkeitsbaum von Chromium 153.
- Safari, Firefox und deren Namensberechnung (zum Beispiel für `title`, `noscript` und Eingabefelder).
- Reale Geräte.
- CSS-abhängige Sichtbarkeit (`display:none` an einem Bild im Link): Das Gate wertet kein CSS aus.

## Offen ausserhalb dieses Auftrags

Diese Nachprüfung prüft sie nicht, sie werden nur festgehalten:
- N65-2 bis N65-6 der Nachprüfung r4-65 (#793, nicht gemergt) und N62-2 (mit #795);
- die Pendenzendatei auf #787: Kopf und Abschnitte zu r4-65, #794, #796 nur als Hinweis (L2, N65-3);
- der Merge-Entscheid ohne Codex-Review liegt bei Christa Egger.

Nicht gemergt, nichts an #787 geändert.
