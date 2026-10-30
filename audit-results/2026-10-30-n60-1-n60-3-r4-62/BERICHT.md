# N60-1 und N60-3 · r4-62 · 30.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N60-1 und N60-3 umsetzen».

- **Befunde:**
  - **N60-1** aus der Nachprüfung r4-60, `audit-results/2026-10-30-nachpruefung-r4-60/NACHPRUEFUNG.md` (PR #778, gemergt).
  - **N60-3** aus dem Nachtrag zur Nachprüfung r4-60, `audit-results/2026-10-30-nachtrag-nachpruefung-r4-60/NACHTRAG.md` ([PR #781](https://github.com/christaegger-dot/borderline-angehoerige/pull/781), beim Bau nicht gemergt; das Codex-Review scheiterte am Nutzungslimit).
  - N60-2 (Pendenzendatei) gehört nicht zum Auftrag.
- **Ausgangsstand:** r4-61 aus [PR #780](https://github.com/christaegger-dot/borderline-angehoerige/pull/780) (Branch `pruefung/2026-10-30-n59-3-r4-61`, `9fe243e`, N59-3), **nicht gemergt**. Auf Entscheid von Christa Egger («Auf #780 aufbauen, r4-62») baut r4-62 darauf auf, weil #780 dieselben Stellen ändert. **#780 muss vor diesem Stand gemergt werden.** Der Diff dieses Stands ist `git diff 9fe243e <Kopf dieses Branchs>`.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die den Nachtrag zur Nachprüfung r4-60 (#781) verfasst hat; N60-3 stammt also von ihr. An r4-58 bis r4-61 hat sie nicht gebaut. Die Nachprüfung von r4-62 muss eine andere Sitzung machen, ebenso die Nachprüfung von r4-61 (#780).

## Befunde

- **N60-1 (gering):** Die behobene Falschmeldung P4.6 (verborgener Zusatz `<span aria-hidden=" true "> →</span>` im Linktext) und `aria-hidden=" false "` waren durch keinen Selbsttestfall abgesichert.
- **N60-3 (gering):** Seit r4-60 (N59-2) galt ein SVG in einer Abbildung auch bei `hidden` oder `inert` als ausgeblendet. Chromium zeigt es in drei Fällen aber als Bild ohne Namen:
  - `hidden` am `<svg>`;
  - `inert` am `<svg>` (beide Attribute wirken im SVG-Namensraum nicht);
  - `hidden` an `.puk-vis-scene`, weil `site.css:1144` dort `display:grid` setzt.

## Umsetzung

Alles in `authoring/tools/contract.js`:

- **N60-3:**
  - Neue Hilfsfunktion `ariaHiddenFlag` (`:39`): nur der `aria-hidden`-Teil von `hiddenFlag`, mit derselben Regel wie Chromium (verborgen ausser bei `false`, `undefined` und leer). `hiddenFlag` (`:40`) nutzt sie; dessen Verhalten bleibt gleich.
  - Neue Hilfsfunktion `svgSilenced` (`:42`): Ein SVG gilt als ausgeblendet bei `aria-hidden` am SVG oder an einem Vorfahren und bei `inert` an einem Vorfahren ausserhalb von SVG.
  - Die SVG-Prüfung (`:644`, Kommentar `:640–643`) nutzt `svgSilenced` statt `hiddenFlag`. Die Ausnahme `role="img"` am Vorfahren und die Prüfung auf `aria-label` und `<title>` bleiben.
  - `hidden` am SVG oder an einem Vorfahren gilt damit wieder nicht als ausgeblendet, wie in r4-59. Ob ein `hidden` wirkt, hängt vom Stylesheet ab und ist statisch nicht sicher erkennbar.
- **Selbsttest, vier neue Fälle und zwei Gegenproben** (120 statt 114):
  - N60-1, Mutation (`:733`): `aria-hidden=" false "` an der Zeile ergibt `utility-nav`.
  - N60-1, Gegenprobe (`:910–914`): `<span aria-hidden=" true "> →</span>` hinter dem Linktext in Zeile und Menü ergibt weder `nav` noch `utility-nav`.
  - N60-3, Mutationen (`:734–736`), Szene auf `verstehen` ohne `aria-hidden`, jeweils `figure-alt`:
    - mit `hidden` am SVG;
    - mit `inert` am SVG;
    - mit `hidden` an `.puk-vis-scene`.
  - N60-3, Gegenprobe (`:915–919`): `inert` an `.puk-vis-scene` ergibt kein `figure-alt`.
- **Build-Kennung r4-62:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet, kein Skript und kein Renderer ist geändert. Die Pendenzendatei ist nicht geändert: PR #776 und #780 führen sie gerade nach, eine dritte Änderung gäbe Konflikte.

## Wirkung

**Seiten:** Die 35 Dateien in `site/` sind bis auf die Build-Kennung byte-gleich mit r4-61 (`md5sum` je Datei nach Ersetzen von `r4-61` durch `r4-62`: 0 Abweichungen). Im Diff von `site/` sind genau 72 Vorkommen ersetzt, in `site/` steht kein `r4-61` mehr.

**Neue Fälle greifen** (`selbsttest-rueckprobe-ausgabe.txt`):
- **SVG-Prüfung von r4-61 eingesetzt:** `Selbsttest: 117/120 bestanden`. Genau die drei N60-3-Mutationen scheitern. Die N60-3-Gegenprobe besteht auch dort; sie sichert gegen eine zu strenge Regel.
- **`hiddenFlag` von r4-59 eingesetzt** (`aria-hidden` nur bei `true`): `116/120`. Es scheitern die beiden N60-1-Fälle und die zwei N59-1-Fälle aus r4-60. Die N60-1-Fälle sichern also die Regel von r4-60 gegen einen Rückfall. Mit den Regeln von r4-61 bestehen sie, weil sie bestehendes Verhalten absichern, wie N60-1 vorschlug.

**Mutationen** (`mutationen.mjs` aus dem Nachtrag #781, 175 Fälle; Ausgaben `mutationen-r4-61-ausgabe.txt` und `mutationen-r4-62-ausgabe.txt`): Es ändern sich nur vier Fälle, alle zu `figure-alt`:
- Q5.9 (`hidden` am SVG), Q5.10 (`inert` am SVG), Q5.11 (`hidden` an `.puk-vis-scene`): N60-3;
- Q5.17 (SVG in `<div hidden>` ohne eigene Anzeigeregel).

Alle übrigen Fälle sind gleich, darunter Q5.12 (`inert` am Vorfahren: kein Blocker) und Q5.13/Q5.14 (`aria-hidden` am Vorfahren: kein Blocker).

**Abgleich mit Chromium** (`aria.mjs`, `abgleich.py`, Ausgaben `aria-ausgabe.txt`, `abgleich-ausgabe.txt`; CDP `Accessibility.getPartialAXTree`, Chromium 153): `175 Fälle · Abweichungen Gate ↔ Chromium: r4-61 4, r4-62 2`.
- **Behoben:** Q5.9, Q5.10, Q5.11. Chromium: `image «»`, Gate jetzt `figure-alt`.
- **Q5.17, bewusst streng:** Chromium verbirgt das SVG (`notRendered`), weil das `<div>` keine eigene Anzeigeregel hat. Das Gate meldet `figure-alt`. Ob `hidden` wirkt, lässt sich ohne Stylesheet nicht sicher entscheiden, deshalb gilt die strenge Richtung, wie in r4-59. Ein dekoratives SVG ist mit `aria-hidden="true"` richtig ausgezeichnet.
- **Q5.16, unverändert seit r4-59:** SVG ohne Namen unter `role="img" aria-label="…"`. Das ist ein Hinweis aus dem Nachtrag und nicht im Auftrag.

**Grenze:** Firefox und Safari sind nicht geprüft.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium 153 und Playwright über `PLAYWRIGHT_MODULE`, auf diesem Branch:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (alle `crisis-number-check`) |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | 120/120, darunter die vier neuen Fälle und die zwei Gegenproben |
| Suchtest (`dist/site`) | 216 von 216, JS-Fehler 0 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys, `axe.mjs`) | `build r4-62 · Läufe: 48 · Seiten: 24 · Verstösse: 0` |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
