# Nachtrag zur Nachprüfung r4-60 · 30.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger (Fachstelle Angehörigenarbeit, PUK Zürich), 30.10.2026: «Nachprüfung r4-60 starten». Als diese Sitzung ihre Prüfung abschloss, lag die Nachprüfung r4-60 schon auf `main` ([PR #778](https://github.com/christaegger-dot/borderline-angehoerige/pull/778), gemergt als `2e3530d`, Ordner `audit-results/2026-10-30-nachpruefung-r4-60/`). Auf Rückfrage entschied Christa Egger: «ja, als Nachtrag mit Entwurfs-PR einreichen».
- **Gegenstand:** r4-60 aus [PR #775](https://github.com/christaegger-dot/borderline-angehoerige/pull/775), Kopf `7cbdd40`, gemergt als `b6777ec` am 30.10.2026, 07:18:27 UTC. Geprüft ist `git diff 330a9af 7cbdd40`. `git diff --stat 7cbdd40 origin/main -- authoring site` ist leer; der geprüfte Stand ist also der veröffentlichte.
  - Selbstbericht: `audit-results/2026-10-30-n59-1-n59-2-r4-60/BERICHT.md`.
- **Wer prüft:** eine eigene Claude-Sitzung. Sie hat an r4-58, r4-59 und r4-60 nicht gebaut und weder die Nachprüfungen r4-58 und r4-59 noch die Nachprüfung r4-60 (#778) verfasst. Die bauende Sitzung hat sie nur mit dem Auftrag gestartet. Den Bericht von #778 hat sie erst nach ihren eigenen Messungen gelesen. Sie ändert keine Inhalte und keinen Code; committet ist nur dieser Ordner.
- **Umgebung:** Node 22.22.0, Playwright global (`PLAYWRIGHT_MODULE=$(npm root -g)/playwright`), Chromium 153.0.8010.12, axe-core 4.14.0 aus einem eigenen Ordner ausserhalb des Repositorys. Arbeitsbäume von `330a9af` (r4-59) und `7cbdd40` (r4-60) ausserhalb des Repositorys; `site/` im Repository ist nicht beschrieben.
- **Nummerierung:** Der Befund schliesst an N60-1 und N60-2 von #778 an und heisst deshalb N60-3.

Dies ist eine technische Prüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

**Beilagen in diesem Ordner:**
- `mutationen.mjs`, `mutationen-r4-59-ausgabe.txt`, `mutationen-r4-60-ausgabe.txt`: 175 eigene Mutationen über `C.gate` (Eingabe wie `build.mjs`), gegen r4-59 und r4-60;
- `aria.mjs`, `aria-ausgabe.txt`: dieselben Mutationen im Zugänglichkeitsbaum von Chromium (CDP `Accessibility.getPartialAXTree`, kein `ariaSnapshot`);
- `abgleich.py`, `abgleich-ausgabe.txt`: Gate gegen Chromium, je Fall;
- `svg-probe.cjs`, `svg-probe-ausgabe.txt`: Minimalprobe ohne Stylesheet der Website zu `hidden` und `inert` an SVG;
- `selbsttest-rueckprobe-ausgabe.txt`: Selbsttest mit Regeln von r4-59, gesamt und je Regel;
- `axe.mjs` (aus der Nachprüfung r4-59 übernommen), `axe-ausgabe.txt`.

## Befund

### N60-3 · gering · N59-2 lockert die SVG-Prüfung: `hidden` und `inert` gelten als ausgeblendet, auch wo Chromium das SVG zeigt

- **Ort:**
  - `authoring/tools/contract.js:634–635`: `for (const sv of all(f, x => x.tag === 'svg')) if (!hiddenFlag(sv) && !up(sv, x => hiddenFlag(x) || x.attrs.role === 'img') && …) add('block', pid, 'figure-alt', …)`. `hiddenFlag` (`:39`) zählt `hidden` und `inert` mit.
  - `audit-results/2026-10-30-n59-1-n59-2-r4-60/BERICHT.md:98`: «Ein SVG unter einem Vorfahren mit `hidden` oder `inert` braucht jetzt keinen Namen mehr, weil es nicht im Zugänglichkeitsbaum steht.»
  - `audit-results/2026-10-30-nachpruefung-r4-60/NACHPRUEFUNG.md:96` («keiner abgeschwächt») und `:78` (keine Falsch-Positiven, 60 von 60 übereinstimmend). Die 60 Mutationen dort enthalten keine SVG-Fälle mit `hidden` oder `inert`.
- **Beleg 1, auf der gerenderten Seite** (`verstehen.html`, SVG der Szene `svg.puk-vis-scene__art`, ohne `<title>`, `aria-hidden="true"` entfernt; `abgleich-ausgabe.txt`):

  | Fall | Chromium (CDP) | Gate r4-59 | Gate r4-60 |
  |---|---|---|---|
  | Q5.8 SVG ohne `aria-hidden` | `image «»` | `figure-alt` | `figure-alt` |
  | Q5.9 SVG mit `hidden` | **`image «»`** | `figure-alt` | **keiner** |
  | Q5.10 SVG mit `inert` | **`image «»`** | `figure-alt` | **keiner** |
  | Q5.11 Vorfahre `.puk-vis-scene` mit `hidden` | **`image «»`** | `figure-alt` | **keiner** |
  | Q5.12 Vorfahre `.puk-vis-scene` mit `inert` | verborgen (`inertElement`) | `figure-alt` | keiner |
  | Q5.13, Q5.14 Vorfahre mit `aria-hidden="TRUE"`, `"yes"` | verborgen | `figure-alt` | keiner |
  | Q5.17 SVG in `<div hidden>` ohne eigene Anzeigeregel | verborgen (`notRendered`) | `figure-alt` | keiner |
  | Q5.1–Q5.4 SVG mit `aria-hidden` `TRUE`, `" true "`, `yes`, `True` | verborgen (`ariaHiddenElement`) | `figure-alt` | keiner |

  In Q5.9 bis Q5.11 bleibt das SVG für Screenreader ein Bild ohne Namen. r4-59 meldete das, r4-60 nicht mehr.
- **Beleg 2, Ursache** (`svg-probe-ausgabe.txt`, Minimalseite ohne Stylesheet der Website):
  - `svg hidden => CDP: image «» | display: inline, Breite 40` und `svg inert => CDP: image «» | …`. `hidden` und `inert` sind HTML-Attribute. An einem Element im SVG-Namensraum wirken sie in Chromium nicht.
  - `div.grid hidden > svg (div{display:grid} im Autor-Stylesheet) => CDP: image «» | display: block`. `hidden` verbirgt nur über die Standardregel `display:none` des Browsers. Eine eigene `display`-Regel überschreibt sie. Auf der Website setzt `site.css:1144` `.puk-vis-scene{display:grid}` und `:1147` `.puk-vis-scene__art{…display:block…}`.
  - `div inert > svg => VERBORGEN(inertElement)`, `div hidden > svg => VERBORGEN(notRendered)`: Ein `inert`-Vorfahre aus HTML verbirgt zuverlässig, ein `hidden`-Vorfahre ohne eigene Anzeigeregel auch.
- **Einordnung:**
  - Keine Wirkung auf die veröffentlichten Seiten. Alle SVGs im Bestand tragen `aria-hidden="true"` (`verstehen`, `genesung`, `kommunizieren`, `rolle`, `selbstfuersorge`, `beziehungen`, `index`), und kein statisches `hidden` liegt über einer Abbildung. Statisch verborgen sind nur Suchtreffer und Leermeldungen.
  - Die Regel schützt vor künftigen Eingriffen. In dieser Richtung ist sie jetzt schwächer als in r4-59. Das widerspricht dem Grundsatz des Selbstberichts, die Regel sei «im Zweifel strenger».
  - N59-2 der Nachprüfung r4-59 hatte vorgeschlagen, die SVG-Prüfung auf dieselbe Hilfsfunktion zu stützen. Für Zeile, Menü und Absenderin ist `hidden` als Verbergung die strenge Richtung: Das Gate blockiert eher zu viel. Bei der SVG-Prüfung kehrt sich das um, weil «verborgen» hier eine Ausnahme vom Blocker ist.
  - Der Satz im Selbstbericht (`BERICHT.md:98`) trifft für `inert`-Vorfahren zu, für `hidden` nur ohne eigene Anzeigeregel. Für `hidden` und `inert` am SVG selbst trifft er nicht zu.
- **Vorschlag:**
  - In der SVG-Prüfung als ausgeblendet nur gelten lassen: `aria-hidden` nach `hiddenFlag`-Regel am SVG oder an einem Vorfahren, und `inert` an einem HTML-Vorfahren. `hidden` (am SVG oder an Vorfahren) und `inert` am SVG selbst nicht als Ausnahme werten; das war das Verhalten von r4-59.
  - Zwei Selbsttestfälle: SVG der Szene ohne `aria-hidden`, mit `hidden` am SVG, erwartet `figure-alt`; ebenso mit `hidden` an `.puk-vis-scene`.
  - Den Satz in `BERICHT.md:98` als Berichtigung kennzeichnen.

## Hinweise ohne Befund

- **Q5.16, älter als r4-60:** Steht das SVG ohne Namen unter einem Vorfahren mit `role="img" aria-label="Szene"`, führt Chromium (CDP) das SVG selbst als `image «»`. Das Gate wertet `role="img"` am Vorfahren als Ausnahme, in r4-59 wie in r4-60. Ob Screenreader das innere Bild lesen, ist hier nicht geprüft; die Kinder von `role="img"` gelten nach ARIA als präsentational. Nicht Teil von r4-60.
- **Paralleler Bau r4-60:** [PR #777](https://github.com/christaegger-dot/borderline-angehoerige/pull/777) (Branch `pruefung/2026-10-30-n59-1-bis-n59-3-r4-60`, N59-1 bis N59-3) ist ohne Merge geschlossen (07:30:29 UTC). Der Branch besteht noch. Massgeblich ist r4-60 aus #775.

## Bestätigt

Die Ergebnisse von #778 decken sich mit diesen eigenen Messungen. Im Einzelnen:

- **Diff vollständig:**
  - In `authoring/` ändern sich nur `tools/contract.js` und `site.config.json` (`git diff --name-only 330a9af 7cbdd40 -- authoring`). Für Fragmente, Stylesheet, Skript, `build.mjs`, `search-index.mjs`, die Testskripte und `authoring/tests/` (mit `suche-ersttreffer.tsv`) ist `git diff --stat` leer.
  - `site/`: Alle 35 Dateien sind nach Ersetzen von `r4-59` durch `r4-60` mit `md5sum` gleich (`Dateien 35, abweichend nach Ersetzen 0`), die Dateiliste ist gleich. Es sind genau 72 Vorkommen ersetzt; in `site/` von r4-60 steht kein `r4-59` mehr.
  - Nummerierung r4-60 in `BUILD` (`contract.js:11`), `assetVersion`, `releaseApproval.independentReviewWaiver.version`, `pendingScope` und `appliedTo` stimmig.
  - Die Pendenzendatei ist gegenüber `330a9af` netto unverändert (`git diff 330a9af 7cbdd40 -- PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` leer). Die Nachführungen in `143bd5a` und `a62ee47` hat der Merge `c79b878` wieder auf `main` gesetzt.
  - Zeilenangaben im Selbstbericht (`:38–39`, `:480–481`, `:634–635`, `:709–710`) stimmen.
- **Gate-Regeln, eigene Mutationen** (`mutationen-r4-60-ausgabe.txt`, `abgleich-ausgabe.txt`): 175 Fälle. Gate und Chromium weichen bei r4-59 in 87 Fällen ab, bei r4-60 in 4: Q5.9, Q5.10, Q5.11 (N60-3) und Q5.16 (Hinweis oben).
  - **`aria-hidden` an Zeile, Zeilenlink, Menü-`<li>`, Menülink, `.puk-site-subbar` und `header`:** `true`, `TRUE`, `" true "`, `"true "`, `yes`, `0`, `" false "`, `"FALSE "`, `null`, `"  "` und `&#116;rue` blockieren, wie Chromium verbirgt. `false`, `False`, `FALSE`, `undefined`, `UNDEFINED`, leer, ohne Wert und `&#102;alse` blockieren nicht; Chromium verbirgt nicht. Der Parser löst Entitäten auf und schreibt Attributnamen klein.
  - **`inert`** an allen sechs Orten blockiert, an Subbar und Kopf neu auch `sender`.
  - **Linktext:** `<span aria-hidden="yes">`, `" true "` und `"0"` um den ganzen Text blockieren (Chromium: Name leer). Dekoratives `<span aria-hidden=" true "> →</span>`, `"yes"` und `"0"` blockiert nicht mehr (Chromium: «Kurz und klar»); mit `"undefined"` oder `"false"` blockiert es (Chromium: «Kurz und klar →»).
  - **Regel `sender`, auch Fehlerseite:** `inert`, `aria-hidden="TRUE"`, `" true "` und `"yes"` am Kopf sowie `inert`, `TRUE` und `"0"` an der Absenderin melden `sender` auf `index` und `404`. `false`, `undefined` und leer melden nichts. Mit r4-59 blieb jeder dieser Fälle ohne `sender`.
  - **Keine Falsch-Positiven** ausser den bekannten, absichtlich strengen (siehe unten).
- **Prüfskript der Nachprüfung r4-59** (`audit-results/2026-10-30-nachpruefung-r4-59/mutationen.mjs`) gegen r4-59 und r4-60: Die Unterschiede entsprechen genau der Liste im Selbstbericht (P1.3/4, 10/11, 17/18, 24/25, 29–32, 36–39, P2.5/6, P4.6, P6.3/4).
- **Kennzahlen der bauenden Sitzung nachgerechnet:** `abgleich-chromium.py` des Selbstberichts auf die Chromium-Messungen von #772 (`aria-ausgabe.txt`, 87 Fälle) und meine Gate-Läufe: `Abweichungen Gate↔Chromium: 27` (r4-59) und `6` (r4-60), wie angegeben. Die sechs: P5.1–P5.3 (absichtlich strenge `aria-label`-Regel), P5.4 (N59-3), P7.1/P7.2 (`display:none`, bekannte Grenze).
- **Selbsttest** (`selbsttest-rueckprobe-ausgabe.txt`):
  - r4-60: `Selbsttest: 111/111 bestanden`.
  - Mit `hiddenFlag`, `sender` und SVG-Prüfung von r4-59: `105/111`, genau die sechs neuen Fälle scheitern.
  - Je Regel einzeln: nur `hiddenFlag` 109/111, nur `sender` 108/111, nur SVG 110/111. Eine zu strenge Regel (jedes `aria-hidden` verbirgt) fängt die Gegenprobe ab (110/111).
  - Keine bestehende Selbsttestzeile ist entfernt oder geändert. Die Gate-Regeln sind für Direkteinstiege, Linktext und `sender` verschärft; die SVG-Prüfung ist für `aria-hidden` richtiggestellt und für `hidden`/`inert` gelockert (N60-3).
- **Berichtigungen** in `audit-results/2026-10-30-nachpruefung-r4-58/NACHPRUEFUNG.md` (N58-1, D8) und `audit-results/2026-10-30-n58-1-n58-2-r4-59/BERICHT.md` (drei Stellen) sind als «Berichtigung vom 30.10.2026» gekennzeichnet und inhaltlich richtig (Chromium-Messung oben).
- **Tests** auf `7cbdd40`:
  - `build.mjs --production`: `24 Seiten · 0 Blocker · 20 Hinweise`
  - `--verify-site`: `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/`
  - `suchtest.mjs dist/site`: `216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0`
  - `sprachtest.mjs`: `73 Prüfungen bestanden · JS-Fehler 0`
  - `layouttest.cjs`: `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen`, `tension core exceeds 1800px` (bekannte Ausnahme B2c, Exit 1 wie bisher)
- **axe-core 4.14.0** (`axe-ausgabe.txt`): `build r4-60 · Läufe: 48 · Seiten: 24 · Verstösse: 0` (390 und 1280 px).
- **Merge und Review von #775:** Codex-Review auf `7cbdd40` «Completed» um 07:18:10 UTC, ohne Befund, keine Review-Threads. Merge um 07:18:27 UTC, 17 Sekunden danach, über das Konto von Christa Egger. R28-O01 und R29-P20 sind eingehalten. CI `build-and-compare` und die Netlify-Prüfungen waren grün. Die Nachprüfung #778 wurde um 07:25:53 UTC gemergt, nach «Completed» um 07:25:39 UTC.
- **Live-Site** (keine Prüfstufe): `curl -sS https://borderline-angehoerige.netlify.app/` um 07:26:43 UTC liefert `data-puk-site-build="r4-60"`.

## Nicht prüfbar

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack).
- Safari und Firefox, insbesondere wie sie `aria-hidden` mit ungewöhnlichen Werten und `hidden`/`inert` an SVG auswerten.
- Reale Geräte.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.** N60-3 betrifft nur das Prüfwerkzeug und wirkt nicht auf die Seiten. Er kann zusammen mit N60-1 bei der nächsten Arbeit an `contract.js` behoben werden.
