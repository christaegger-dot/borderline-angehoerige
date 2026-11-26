# Gegenprüfung r4-76 · Rückbau der Suche auf den Stand r4-73

**Identisch mit r4-73 bis auf die Kennung: ja.**

**Widerspruch #841 gegen Bericht r4-76:** in Arbeit (Abschnitt B folgt).

Stand 26.11.2026, ab 22:05 UTC · unabhängige Prüfsitzung, nicht die Sitzung, die r4-74 bis r4-76 gebaut hat · zweiter Versuch (der erste brach um 21:08 UTC ohne Bericht ab) · geprüft: `main` `7809d52` (enthält #840 `b529695`, #843 `9f7f052`, #842).

Dieser Ordner kann Suchanfragen im Wortlaut enthalten, auch zu Suizid, Selbstverletzung und Gewalt. Sie stehen nur hier.

## A · Kernfrage

| Prüfung | Ergebnis | Nachweis |
|---|---|---|
| Build `--production --out=site --write-site` auf `main` | 24 Seiten, 0 Blocker, 20 Hinweise; `git status` danach leer (`site/` unverändert) | Sitzungsprotokoll |
| `--production --verify-site` auf `main` | Parität bestanden, 35 Dateien byte-gleich | Sitzungsprotokoll |
| `--production --verify-site` im Worktree `3764d45` | Parität bestanden, 35 Dateien (Bezugsstand ist selbst reproduzierbar) | Sitzungsprotokoll |
| Dateiliste `site/` main gegen `3764d45` | gleich, 35 Dateien | `ergebnis/a-dateivergleich.txt` |
| `js/interaktion.js`, `css/site.css`, `_redirects`, `_headers` | alle vier byte-gleich | ebd. |
| 24 HTML-Dateien nach Gleichsetzen `r4-76`/`r4-73` | 24 von 24 gleich | ebd. |
| Wo steht die Kennung? | je HTML-Datei genau 3-mal: `data-puk-site-build="r4-76"`, `css/site.css?v=r4-76`, `js/interaktion.js?v=r4-76` (404.html mit führendem `/`); 72 Vorkommen, keine andere Form. `r4-73` steht in `site/` von main nur in den drei byte-gleichen Dateien CSS, JS, `_redirects` (Kommentare «umgesetzt in r4-73»); `r4-76` kommt in `3764d45/site` nicht vor. Das Gleichsetzen verdeckt also nichts. | ebd. |
| `authoring/js/interaktion.js`, `authoring/tools/search-index.mjs`, `authoring/css/site.css` | byte-gleich mit `3764d45` | ebd. |
| `authoring/site.config.json` ohne `assetVersion` und `releaseApproval` | gleich | ebd. |
| Live (22:10 UTC) | `data-puk-site-build="r4-76"`; `js/interaktion.js?v=r4-76` und `css/site.css?v=r4-76` byte-gleich mit `site/` auf main; die 215 Sucheinträge (Titel, Text, Schlüsselwörter, Ziel) auf `/suche` gleich wie in `site/suche.html` | `ergebnis/a-live.txt`, `live-suchindex.cjs` |

**Was in `authoring/` sonst anders ist als in `3764d45`** (`git diff --stat 3764d45 HEAD -- authoring/`):

- `site.config.json`: nur `assetVersion` und `releaseApproval` (Kennung und Release-Text).
- `tools/contract.js`: nur `BUILD = 'r4-76'`.
- `tests/suche-ersttreffer.tsv` (+19 Zeilen) und neu `tests/suche-ausbau-offen.tsv` (31 Erwartungen): Testdaten, wirken nicht auf `site/` (siehe C 6).
- `tools/layouttest.cjs`, `tools/layouttest-report.cjs`: aus #832 und #842 (N829-2, N832-1/-2, bekannte Abweichungen im Layouttest); Prüfwerkzeug, wirkt nicht auf `site/`.

Einordnung: Keine dieser Änderungen betrifft die erzeugte Website. Das Urteil «identisch bis auf die Kennung» ist ein Dateivergleich und gilt unabhängig von Suchproben.

**Grenze A:** Die Live-HTML-Dateien sind nicht byte-gleich mit `site/`, weil Netlify sie beim Ausliefern umschreibt (einfache Anführungszeichen, Pfade ohne `.html`, z. B. `href='/verstehen'`). Live verglichen sind deshalb nur JS, CSS und der Suchindex im DOM, nicht jedes HTML-Byte. `_headers` und `_redirects` sind live nicht direkt lesbar.
