# Nachprüfung r4-61 · 30.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger (Fachstelle Angehörigenarbeit), 30.10.2026: «Nachprüfung r4-61 starten».
- **Gegenstand:** `git diff b6777ec 9fe243e`. Das ist r4-61 (N59-3) auf [PR #780](https://github.com/christaegger-dot/borderline-angehoerige/pull/780), Branch `pruefung/2026-10-30-n59-3-r4-61`, Kopf `9fe243e`, aufgesetzt auf `main` = `b6777ec` (r4-60, PR #775). Selbstbericht: `audit-results/2026-10-30-n59-3-r4-61/BERICHT.md`.
- **Stand von `main` bei der Prüfung:** `db56243`. Seit `b6777ec` sind zwei PRs dazugekommen, beide nur in `audit-results/`: #778 (`2e3530d`, Nachprüfung r4-60) und #779 (`db56243`, Nachprüfung r4-55 und r4-56).
- **Wer prüft:** eine eigene Sitzung. Sie hat r4-60 und r4-61 nicht gebaut und keine der Nachprüfungen r4-57 bis r4-60 verfasst. Sie ändert keine Inhalte und keinen Code. Committet ist nur dieser Ordner.
- **Umgebung:** Node 22.22.0; Chromium 153.0.8010.12 mit Playwright (global, `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`); axe-core 4.14.0 in einem eigenen Ordner ausserhalb des Repositorys.
- **Arbeitsbäume:** von `9fe243e`, `b6777ec` und `main` + `9fe243e`, alle ausserhalb des Repositorys (`git worktree add --detach`). `site/` im Repository ist nicht beschrieben.
- **Unabhängige Methode:** Die bauende Sitzung hat N59-3 selbst gestellt und ihre Skripte aus der Nachprüfung r4-59 wiederverwendet. Die Prüfskripte hier sind neu geschrieben, nicht aus ihren abgeleitet:
  - `gate-mutationen.mjs`: 67 eigene Fälle über `C.gate`;
  - `chromium-name.mjs`: Name im Zugänglichkeitsbaum über CDP `Accessibility.getFullAXTree`, Zuordnung über `backendDOMNodeId`, nicht über `ariaSnapshot`;
  - `svg-hidden.mjs`: Zusatzprobe zu N61-1;
  - `axe.cjs`.

  Die Ausgaben stehen in den `*-ausgabe.txt` dieses Ordners.

## Befunde

### N61-1 · wichtig · `hidden` und `inert` an einem `<svg>` gelten im Gate als verborgen, in Chromium nicht

**Ort:**
- `authoring/tools/contract.js:39` (`hiddenFlag`);
- genutzt von `hiddenBelow`/`relabelled` (`:45–46`, neu in r4-61), `accTxt` (`:41`), `concealed` und der SVG-Prüfung `figure-alt` (`:639`, seit r4-60).

**Beleg:** `hiddenFlag` setzt `has(x, 'hidden') || has(x, 'inert')` für jedes Element. Das sind aber HTML-Attribute. An einem `<svg>` blendet Chromium damit nichts aus.

`svg-hidden-ausgabe.txt`, gleich mit r4-60 und r4-61:

```
S1 Zeilenlink: <svg hidden aria-label="Pfeil"> | Gate: frei | SVG: 8×8 px, display block | Chromium (…): link «Kurz und klar Pfeil»
S2 Zeilenlink: <svg inert aria-label="Pfeil"> | Gate: frei | SVG: 8×8 px, display block | Chromium (…): link «Kurz und klar Pfeil»
S3 Zeilenlink: <svg hidden><title>Mehr</title></svg> | Gate: frei | SVG: 8×8 px, display block | Chromium (…): link «Kurz und klar Mehr»
S4 Zeilenlink: <svg aria-hidden="true" aria-label="Pfeil"> (Gegenprobe) | Gate: frei | … | Chromium (…): link «Kurz und klar»
S5 Figur verstehen.html: aria-hidden="true" am SVG durch hidden ersetzt | Gate: frei | SVG: 760×356 px, display block | Chromium (#probe): image «»
S6 Figur verstehen.html: aria-hidden="true" am SVG entfernt (Gegenprobe) | Gate: BLOCK figure-alt@verstehen | … | Chromium (#probe): image «»
```

**Was daraus folgt:**
- **Direkteinstiege (S1, S2):** Die neue Regel `relabelled` lässt einen Namenswechsel durch, obwohl sie ihn verhindern soll. Der Kommentar `contract.js:42–43` sagt «Ein verborgenes Element zählt nicht». Für `hidden` und `inert` an SVG stimmt das nicht.
- **Linktext (S3):** Über `accTxt` geht derselbe Fehler auch in den Vergleich der Beschriftung ein. Diese Lücke gab es schon in r4-60.
- **Abbildungen (S5):** Ein sichtbares SVG ohne Textalternative von 760 × 356 px erscheint in Chromium als `image «»`, und `figure-alt` meldet nichts. Bis r4-59 prüfte die SVG-Regel nur `aria-hidden="true"` (`git show b6777ec~1:authoring/tools/contract.js`, Zeile 631). Ein `<svg hidden>` blockierte dort also. Die Lücke ist mit r4-60 (N59-2) entstanden und hat die Nachprüfung r4-60 (#778) nicht erfasst.
- **Selbsttest:** Die Gegenprobe in r4-61 (`contract.js:896–900`) nutzt nur `aria-hidden="true"` und deckt das nicht ab.

**Schweregrad:** wichtig, nicht blockierend.
- Wichtig, weil `figure-alt` hier eine fehlende Textalternative (WCAG 1.1.1) durchlässt und das Gate damit schwächer ist als in r4-59. Die neue Regel hat dieselbe Lücke.
- Nicht blockierend, weil keine veröffentlichte Seite betroffen ist: Bestand 0 Blocker, axe 0 Verstösse. Der Fehler entsteht erst durch ungewöhnliches Markup.

**Vorschlag:**
- `hidden` und `inert` nur an HTML-Elementen werten. Ein Element im SVG-Namensraum ist dann nur mit `aria-hidden` (oder über einen verborgenen HTML-Vorfahren) verborgen.
- Selbsttestfälle ergänzen:
  - `<svg hidden aria-label>` im Direkteinstieg → `utility-nav`;
  - `<svg hidden>` in einer Abbildung ohne Textalternative → `figure-alt`.
- Kommentar `:42–43` präzisieren.

### N61-2 · gering · `alt` und `value` im Link ändern den Namen, das Gate meldet nichts

**Ort:** `authoring/tools/contract.js:41` (`accTxt` berücksichtigt nur Textknoten) und `:46`.

**Beleg:** `mutationen-ausgabe.txt`:

```
D2 <img alt="Mehr"> nach dem Text · Zeile | r4-60: frei | r4-61: frei | Chromium: link «Kurz und klar Mehr»
D4 <input value="Mehr"> nach dem Text · Zeile | r4-60: frei | r4-61: frei | Chromium: link «Kurz und klar Mehr»
```

Dasselbe gilt im Menü. `<svg><title>` wird dagegen erkannt (D3 blockiert in beiden Fassungen), weil `accTxt` den Text des `<title>` mitliest.

**Einordnung:** N59-3 betraf nur `aria-label`/`aria-labelledby`. r4-61 setzt das richtig um. Diese Lücke bestand schon vorher und ist nicht durch r4-61 entstanden. Sie widerspricht aber demselben Grundsatz (Meldung: «der zugängliche Name muss die sichtbare Beschriftung sein», WCAG 2.5.3).

**Vorschlag:**
- Entweder in `accTxt` `alt` von `<img>` (und `<area>`) sowie den Wert von Eingabefeldern einrechnen,
- oder in Direkteinstiegen jedes nicht verborgene `<img>`/`<input>` mit nicht leerem `alt`/`value` blockieren.

### N61-3 · gering · Die Pendenzendatei auf #780 ist durch #778 und #779 überholt und nennt den PR «Entwurf»

**Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` auf `9fe243e`: Kopfzeile (Zeile 3), Abschnitt r4-61 (Zeilen 9–31) und Abschnitt Nachprüfung r4-59 (Zeile 59).

**Beleg:**
- **Nachprüfung r4-60:** Zeile 31 führt «Nachprüfung von r4-60 und r4-61» als offen, ebenso Zeile 59. Die Nachprüfung r4-60 liegt aber seit #778 auf `main` (`2e3530d`, «Nachbesserung nötig, ohne Blocker», Befunde N60-1 und N60-2). Weder sie noch #779 (`db56243`) erscheinen in der Datei. N60-2 («Die Pendenzendatei auf `main` führt r4-60 nicht») würde #780 beheben; vermerkt ist das nicht. N60-1 ist nicht als offen geführt.
- **«Entwurf»:** Die Datei nennt #780 «Entwurf», laut GitHub ist der PR das nicht mehr (`"draft": false`, Codex-Auslöser «Draft marked ready»).
- **Merge:** Nach einem Merge würde `main` den alten Stand zeigen. Der Zusammenführungsversuch läuft ohne Konflikt, siehe «Bestätigt» Punkt 6. Er korrigiert die Datei also nicht.

**Vorschlag:** Vor dem Merge die Pendenzendatei auf #780 nachführen:
- Nachprüfung r4-60 (#778) mit N60-1 und N60-2;
- Nachprüfung r4-55 und r4-56 (#779);
- diese Nachprüfung r4-61 mit N61-1 bis N61-3;
- Status von #780 («bereit zur Prüfung», nicht Entwurf).

## Bestätigt

1. **Diff vollständig und eng begrenzt.** `git diff --stat b6777ec 9fe243e`: 32 Dateien.
   - **Ausserhalb von `site/`, `audit-results/` und der Pendenzendatei** ändern sich nur `authoring/site.config.json` (8 Zeilen) und `authoring/tools/contract.js` (+13/−2).
   - **Unverändert:** Fragmente (`authoring/content/`), Stylesheet, Skript, `build.mjs`, `search-index.mjs`, `selftest.mjs`, `layouttest.cjs`, `sprachtest.mjs`, `suchtest.mjs` und `authoring/tests/suche-ersttreffer.tsv`, jeweils ohne Diff. Akuthinweise und Sprungziele sind damit ebenfalls unverändert: Renderer und Fragmente bleiben gleich, und die Seiten sind bis auf die Kennung byte-gleich (Punkt 2).
2. **`site/` nur Build-Kennung.**
   - Nach Ersetzen von `r4-60`/`r4-61` durch einen Platzhalter sind alle 24 HTML-Seiten byte-gleich: `Seiten 24, abweichend 0`. Die Dateiliste ist gleich, und keine Nicht-HTML-Datei weicht ab.
   - Die einzigen geänderten Zeilen (`git diff … -- site/`, normiert) sind `data-puk-site-build` sowie `?v=` an `site.css` und `interaktion.js`, je 24-mal.
3. **Build-Kennung stimmig.**
   - **Kennung r4-61:** `contract.js:11` `BUILD = 'r4-61'`; `assetVersion` `r4-61`; `releaseApproval.independentReviewWaiver.version` `r4-61`.
   - **`pendingScope`** beginnt mit «r4-61 (Befund N59-3 …)» und führt r4-60 als «Vorher».
   - **`appliedTo`** endet mit «… r4-61 am 30.10.2026 im Auftrag «Nachbesserung N59-1 bis N59-3 umsetzen» (davon offen nur N59-3) …, Nachweis audit-results/2026-10-30-n59-3-r4-61/BERICHT.md».
   - Die Seiten tragen je dreimal `r4-61`.
4. **Angaben zu r4-60 im neuen Pendenzenabschnitt stimmen** (gegen GitHub und den Nachweis r4-60):
   - **Merge:** PR #775 gemergt am 30.10.2026 um 07:18:27 UTC, `merged_by` christaegger-dot. Das Codex-Review auf `7cbdd40` ist um 07:18:10 UTC «Completed», ohne Befund (`has_any_findings: false`), 17 Sekunden davor.
   - **Selbsttest auf `b6777ec`:** `Selbsttest: 111/111 bestanden` (eigener Lauf).
   - **Inhalt** (N59-1, N59-2) wie im PR-Text von #775.
   - **Live-Site 07:28 UTC:** Die frühere Abfrage ist nicht nachprüfbar. Um 08:00 UTC lieferte sie `r4-60` aus (Punkt 8).
5. **Die neue Regel wirkt wie beschrieben**, auf r4-61 gegen r4-60 (`mutationen-ausgabe.txt`, 67 Fälle; Chromium über CDP `getFullAXTree`):
   - **Falsch-Negative von r4-60 behoben:** In allen nicht verborgenen Fällen mit `aria-label`/`aria-labelledby` ändert sich der Name in Chromium. r4-61 blockiert in Zeile und Menü (`utility-nav` bzw. `nav`), r4-60 nicht. Das sind A1–A7, A11–A14 sowie E1 und E2 im Rückfall ohne `utilityNav`. Geprüft an `<span>`, `<strong>`, `<svg>`, `<svg role="img">`, `<img>`, verschachtelt (`<span><em>`), `aria-labelledby` mit vorhandener ID (Chromium: «Mitgefühl und Selbstschutz gehören zusammen») und auf `krise.html`. Auch bei `aria-hidden="false"`, `""` und `"undefined"` (Chromium: «Mehr»).
   - **Keine Falschmeldung bei echt Verborgenem:** In allen 24 B-Fällen bleibt der Name in Chromium «Kurz und klar», und r4-61 meldet nichts. Ausgenommen sind `hidden` und `inert` am SVG selbst, siehe N61-1. Geprüft:
     - SVG mit `aria-hidden` = `true`, `TRUE`, ` true `, `yes`;
     - `<img aria-hidden="true">`;
     - Zwischenelement mit `aria-hidden="true"`, `hidden` oder `inert`;
     - inneres `aria-hidden="false"` unter verborgenem Zwischenelement;
     - Rückfall E3.
   - **`aria-describedby` und `title` blockieren nicht** (C1, C2, D1). Chromium bleibt bei «Kurz und klar».
   - **Bewusst streng:** A8 (`aria-labelledby` mit fehlender ID), A9 (`aria-label` gleich der Beschriftung) und A10 (leeres `aria-label`) blockieren, obwohl Chromium «Kurz und klar» behält. Das entspricht der dokumentierten Strenge am Link selbst (N57-2) und dem Selbstbericht (Q7). Es ist kein Fehler, denn die Meldung verlangt, dass der Name aus der sichtbaren Beschriftung kommt.
   - **Rückfall ohne `utilityNav`:** E0 rendert «Website durchsuchen» (Chromium), 0 Blocker in beiden Fassungen.
   - **Fehlerseite und gewöhnliche Menülinks:** F1 (404) und G1 werden nicht erfasst. Das ist richtig, denn `relabelled` gilt nur für Direkteinstiege (`contract.js:543`, `:560`). Die Fehlerseite hat keine Zeile «Direkteinstiege» und keine Menüeinträge dafür (`grep` in `site/404.html`).
   - **Bilanz:** Gate r4-61 und Chromium stimmen in 51 von 67 Fällen überein. Abweichend: 6 bewusst streng (A8–A10), 4 N61-1, 4 N61-2, 2 ausserhalb des Geltungsbereichs (F1, G1).
6. **Selbsttest und Gate.**
   - **Die neuen Fälle greifen:** In einer Kopie von `9fe243e` mit der `relabelled`-Zeile von r4-60:
     ```
     FAIL | Direkteinstieg mit aria-label an einem span im Link (r4-61, N59-3) | erwartet: utility-nav | erhalten: crisis-number-check
     FAIL | Direkteinstieg im Menü mit aria-labelledby an einem span im Link (r4-61, N59-3) | erwartet: nav | erhalten: crisis-number-check
     Selbsttest: 112/114 bestanden
     ```
   - **Die Gegenprobe wirkt:** Mit einer zu breiten Regel (`all(a, relabels).length > 0`) scheitert sie: `FAIL | Verborgenes SVG mit aria-label im Direkteinstieg ist zulässig … | erhalten: utility-nav` → `113/114`. Beide Kopien sind danach zurückgesetzt (`git checkout`, `cmp`).
   - **Nichts abgeschwächt:** Die Testskripte (`selftest.mjs`, `layouttest.cjs`, `sprachtest.mjs`, `suchtest.mjs`) sind unverändert. Am Selbsttest sind drei Fälle hinzugekommen, keiner entfernt oder gelockert. Eine nicht anwendbare Mutation zählt weiter als Fehler (`contract.js:904`).
   - **Kein Übergriff:** `hiddenBelow` und `relabels` kommen nur in `relabelled` vor, und `relabelled` nur in den Regeln `utility-nav` und `nav` (`grep -n`). Gewöhnliche Links und andere Regeln sind nicht betroffen (G1, F1). Die einzige unerwünschte Wirkung ist die geerbte SVG-Lücke (N61-1).
   - **Gleichwertig:** Die Meldungstexte sind unverändert.
7. **Tests selbst ausgeführt** (`tests-ausgabe.txt`).
   - **Auf `9fe243e`:**

     | Prüfung | Ergebnis |
     |---|---|
     | Build | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise` |
     | `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
     | Selbsttest | `Selbsttest: 114/114 bestanden` |
     | Suchtest | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
     | Sprach-/UI-Test | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
     | Layouttest | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` mit `tension core exceeds 1800px`, Exit 1 |

     Die Abweichung im Layouttest ist die in der Pendenzendatei geführte bekannte Ausnahme B2c, wie im Selbstbericht.
   - **Zusammenführung:** `9fe243e` lässt sich ohne Konflikt mit `main` = `db56243` zusammenführen (lokal `c9789ea`, nicht gepusht). Ausserhalb von `audit-results/` ist der zusammengeführte Stand gleich `9fe243e` (`git diff --stat 9fe243e HEAD -- . ':!audit-results'` leer). Dort sind dieselben sechs Prüfungen gelaufen, mit denselben Ergebnissen.
8. **axe-core 4.14.0:** `axe 4.14.0 · Build r4-61 · Seiten 24 · Läufe 48 · Verstösse 0` (390 und 1280 px, `axe-ausgabe.txt`).
9. **PR #780** (GitHub, abgefragt am 30.10.2026 um 08:00 UTC):
   - **Status:** offen, nicht gemergt, nicht Entwurf, `mergeable_state: clean`, Basis-SHA `2e3530d`.
   - **Codex:** Das Review auf `9fe243e` steht auf «⚠️ Failed» (2026-10-30T07:43:46Z, Auslöser «Draft marked ready»). Der Bot meldet: «You have reached your Codex usage limits for code reviews.» Es gibt keine Reviews und keine Review-Threads (`get_reviews` leer, `review_threads: []`).
   - **Hinweis:** Die versteckten Metadaten des Codex-Kommentars nennen `"has_any_findings": true, "has_unresolved_findings": true` bei `"status": "failed"`. Ein sichtbarer Befund ist nicht vorhanden, die Angabe ist bei abgebrochenem Review nicht aussagekräftig.
   - **CI** auf `9fe243e`: `build-and-compare` success; Netlify «Header rules» und «Redirect rules» success; «Pages changed» neutral.
   - **Merge-Regel:** Nach R28-O01/R29-P20 und dem Entscheid von Christa Egger ist ohne Codex-Review «Completed» nicht zu mergen.
10. **Live-Site** (nur Hinweis, keine Prüfstufe): `curl -sS https://borderline-angehoerige.netlify.app/` um 08:00:01 UTC → HTTP 200, `data-puk-site-build="r4-60"`. Das ist erwartet, solange #780 nicht gemergt ist.

## Nicht prüfbar

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack). Gemessen ist nur der Zugänglichkeitsbaum von Chromium 153 über CDP.
- Safari und Firefox, also wie sie `hidden`/`inert` an SVG, `aria-label` an generischen Elementen und `aria-hidden` mit Leerraum auswerten. Die Aussagen zu N61-1 und N61-2 gelten für Chromium.
- Reale Geräte, Zoom und Systemeinstellungen ausserhalb von Playwright.
- Die Abfrage der Live-Site um 07:28 UTC aus dem Pendenzenabschnitt r4-60 (nur der Stand um 08:00 UTC).
- Der Inhalt eines Codex-Reviews, weil keines abgeschlossen ist.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**

- **r4-61 erfüllt N59-3:** In allen nicht verborgenen Fällen mit `aria-label`/`aria-labelledby` im Direkteinstieg blockiert das Gate jetzt, im Einklang mit Chromium. Die neuen Selbsttestfälle greifen, und die Seiten sind bis auf die Kennung unverändert.
- **N61-1 (wichtig)** zeigt, dass die gemeinsame Hilfsfunktion `hiddenFlag` `hidden`/`inert` auch an SVG als verborgen wertet. Dadurch erbt die neue Regel eine Lücke, und `figure-alt` ist seit r4-60 schwächer als in r4-59.
- **N61-2 und N61-3** sind gering.

Für den Merge von #780 gilt weiter: erst nach Codex-Review «Completed» und auf Auftrag. N61-3 sollte vorher nachgeführt sein. N61-1 kann in #780 oder in einer folgenden Kennung behoben werden; in beiden Fällen ist danach eine Nachprüfung durch eine Sitzung nötig, die nicht gebaut hat.
