# Nachprüfung r4-54 · 29.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger (Fachstelle Angehörigenarbeit, PUK Zürich), 29.10.2026: «Nachprüfung r4-54 starten».
- **Gegenstand:** alle Änderungen zwischen `37d8326` (r4-53 mit Nachprüfung und Pendenzen) und `060aa8f` (r4-54, Merge PR #751). PR #750 (`19ab288`, nur Pendenzendatei, Profil 2026.10.10 bis .13) liegt dazwischen und ist nicht Gegenstand.
  - **Selbstbericht:** `audit-results/2026-10-29-n52-2-r4-54/BERICHT.md`. Er setzt N52-2 aus `audit-results/2026-10-29-nachpruefung-r4-52/NACHPRUEFUNG.md` um.
  - **Heutiger Stand:** Zwischen `060aa8f` und dem geprüften `main` (`d5229c6`) ändert sich nur `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (`git diff --stat 060aa8f HEAD`: 1 Datei). Geprüft ist also der veröffentlichte Stand.
- **Wer prüft:** eine Claude-Sitzung, die an r4-54 **nicht gebaut** hat und an keinem der Stände r4-52 bis r4-54 gebaut hat. Sie ändert keine Inhalte und keinen Code und committet nur diesen Ordner.
- **Umgebung:**
  - Node 22.22.0, Chromium, Playwright über `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`.
  - axe-core 4.14.0 aus einem eigenen Ordner ausserhalb des Repositorys, geladen per `page.addScriptTag`.
  - Vergleichsstände als `git worktree` ausserhalb des Repositorys: `37d8326` (r4-53) und `8d0d383` (r4-51). `site/` im Repository wurde nicht beschrieben; `git status` war nach allen Läufen leer.
- **Beilagen in diesem Ordner:** `mutationen.mjs` (eigenes Mutationsskript), `mutationen-r4-54.txt` und `mutationen-r4-53.txt` (Ausgaben).

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Befunde

### N54-1 · gering · Die Regel prüft nur Ziele und Reihenfolge, nicht Beschriftung, Lage und Anzahl der Zeile

- **Ort:** `authoring/tools/contract.js:506–511`.
- **Beleg:** Die Regel vergleicht nur die aufgelösten `href` der Links (`utilityGot … .map(a => resolve(path, a.attrs.href).path)`) mit `utilityWant`. Sie sucht die Zeile mit `one(doc, …)`, also nur den ersten Treffer, irgendwo im Dokument. Eigene Mutationen auf r4-54 (`mutationen-r4-54.txt`):
  - M11 `index.html`: Beschriftung «Kurz und klar» in der Zeile durch «Mehr» ersetzt → `Blocker gesamt 0`.
  - M12 `index.html`: Zeile aus dem Kopf in die Fusszeile verschoben → `Blocker gesamt 0`.
  - M13 `index.html`: Zeile verdoppelt, die zweite mit vertauschter Reihenfolge → `Blocker gesamt 0`.
- **Einordnung:** Der Renderer erzeugt die Zeile einheitlich aus `utilityNav` (`contract.js:200–204`). Diese Fehler entstehen also nur bei einer Änderung am Renderer oder an fertigen Seiten. Das Ziel von N52-2 (Zeile auf jeder Seite ausser 404 verlangen) ist erreicht. Die Formulierung «genau nach `utilityNav`» im Selbstbericht, in `site.config.json › pendingScope` und in der Pendenzendatei trifft aber nur für Ziele und Reihenfolge zu. Die Regel aus r4-52 für die Menüeinträge (`contract.js:520–523`) prüft ebenfalls nur Ziele.
- **Vorschlag:** Bei der nächsten Arbeit am Seitenrahmen auch die Beschriftung vergleichen (`entry.label || page.title`, wie bei `footer-links`, `contract.js:497–501`), genau eine Zeile verlangen und ihre Lage im Kopf (`.puk-site-subbar`) prüfen; je Fall ein Selbsttest. Oder die Beschreibung auf «Ziele und Reihenfolge nach `utilityNav`» präzisieren.

### N54-2 · gering · Ohne `utilityNav` meldet die Menüregel auf allen Seiten falsche Blocker

- **Ort:** `authoring/tools/contract.js:521–523` (Menüregel aus r4-51/r4-52); Rückfall im Renderer `contract.js:200–202`.
- **Beleg:** Ist `utilityNav` nicht konfiguriert, rendert der Renderer als Rückfall eine Zeile «Website durchsuchen» mit `suche.html`, auch als Eintrag im Menü. Die Menüregel erwartet aber `(cfg.utilityNav || [])`, also nichts. Eigene Mutation K1 (Eintrag `utilityNav` gelöscht, neu gerendert):
  - r4-54: `Blocker gesamt 23 {"nav":23}`, z. B. `index:nav: Direkteinstiege im Menü weichen vom Seitenvertrag ab: suche.html statt `.
  - r4-53: gleich, 23 Blocker. r4-51 (`8d0d383`): gleich, 23 Blocker. Der Fehler besteht also seit r4-51 und ist durch r4-54 nicht entstanden.
  - Die neue Regel greift ohne `utilityNav` bewusst nicht (`contract.js:506`), meldet also hier nichts Falsches. Sie prüft die Rückfallzeile dafür auch nicht: K2 (Rückfallzeile auf `index.html` entfernt) ergibt dieselben 23 `nav`-Blocker, keinen zusätzlichen.
  - Daneben blockiert die Konfigurationsprüfung jede Konfiguration ohne `utilityNav` (`contract.js:320`, K3). Der Rückfall ist in diesem Repository also nie erreichbar.
- **Einordnung:** Für diese Website ohne Folgen, weil `utilityNav` konfiguriert und Pflicht ist. Der Rückfall im Renderer und die Menüregel widersprechen sich aber.
- **Vorschlag:** Entweder den Rückfall im Renderer entfernen (weil `utilityNav` ohnehin Pflicht ist) oder die erwarteten Einträge im Gate genau wie im Renderer berechnen (mit Rückfall), für Zeile und Menü. Nicht dringend.

## Bestätigt

### 1. Diff vollständig

`git diff --stat 37d8326 060aa8f`: 28 Dateien, 213 Einfügungen, 81 Löschungen.

- **Geändert in `authoring/`:** nur `tools/contract.js` (12 Zeilen) und `site.config.json` (8 Zeilen).
  - `contract.js`: `BUILD` von `r4-53` auf `r4-54` (die einzige gelöschte Zeile), der neue Prüfblock (`contract.js:504–512`) und ein neuer Fall in `MUTATIONS` (`contract.js:661`).
  - `site.config.json` (`git diff -U0`): Zeilen 5 (`assetVersion`), 37 (`pendingScope`), 39 (`independentReviewWaiver.version`), 44 (`appliedTo`). Wie im Selbstbericht angegeben.
- **Nicht geändert:** `git diff --stat 37d8326 060aa8f -- authoring/content authoring/css authoring/js authoring/tests authoring/tools/selftest.mjs authoring/tools/layouttest.cjs authoring/tools/sprachtest.mjs authoring/tools/suchtest.mjs` ist leer. Damit sind Fragmente (Wortlaut, Akuthinweise, Sprungziele), Stylesheet, Skript, `suche-ersttreffer.tsv` und die Testskripte unverändert. Suchindex-Erzeugung (`search-index.mjs`) ebenfalls unverändert.
- **`site/`:** geändert sind nur die 24 HTML-Seiten, keine CSS-, JS- oder Asset-Dateien. Zeilen im Diff ohne `r4-53`/`r4-54`: `0`. Je Seite ändern sich `data-puk-site-build` sowie `?v=` an `site.css` und `interaktion.js` (Zählung nach Ersetzen der Kennung: je 24 gleiche Zeilen alt/neu).
- **Kein Wortlaut geändert,** da weder Fragmente noch Renderer-Text geändert sind und `site/` nur die Kennung ändert.

### 2. Gate-Regel mit eigenen Mutationen

Eigenes Skript `mutationen.mjs`: rendert die Seiten wie `build.mjs` (Fragmente, `injectSearchIndex`, `C.renderPage`), mutiert und ruft `C.gate` im Modus `production` auf. Gezählt sind alle Blocker.

| Mutation | r4-53 | r4-54 |
|---|---|---|
| M0 Bestand | 0 | 0 |
| M1 `index`: Zeile und Menüeinträge entfernt | **0** | `utility-nav` «Zeile «Direkteinstiege» fehlt» |
| M2 `index`: nur Zeile entfernt | **0** | `utility-nav` |
| M3 `index`: Reihenfolge vertauscht | **0** | `utility-nav` «fragen.html, kurz.html, suche.html statt kurz.html, fragen.html, suche.html» |
| M4 `index`: ein Eintrag zu viel (`verstehen.html`) | **0** | `utility-nav` |
| M5 `index`: ein Eintrag zu wenig (ohne «Suchen») | **0** | `utility-nav` |
| M6 `behandlung`: nur Zeile entfernt | **0** | `utility-nav` |
| M7 `kinder`: Zeile und Menüeinträge entfernt | **0** | `utility-nav` |
| M8 `suche` (mit `aria-current`): Reihenfolge vertauscht | **0** | `utility-nav` |
| M9 alle Seiten: Zeile und Menüeinträge entfernt | **0** | 23 × `utility-nav` (alle Seiten ausser 404) |
| M10 `index`: nur Menüeinträge entfernt (Regel r4-52) | `nav` | `nav` (unverändert) |
| M11–M13 Beschriftung, Lage, Doppelung | 0 | 0 → N54-1 |
| M14 Fehlerseite ohne Zeile | 0 | 0, keine Meldung auf `404` |
| K1/K2 `utilityNav` nicht konfiguriert | 23 × `nav` | 23 × `nav` → N54-2 |
| K4 `utilityNav` mit zusätzlich unbekannter `pageId` | 1 × `utility-nav` (Konfiguration) | gleich, keine Seitenmeldung |

- In keinem Fall meldet die neue Regel etwas auf der Fehlerseite. Falsch-Positive der neuen Regel: keine gefunden (Bestand 0; K4 erzeugt nur die schon bestehende Konfigurationsmeldung, weil Renderer und Gate unbekannte Ziele gleich filtern).
- Die Tabelle des Selbstberichts (vier Zeilen) ist bestätigt.
- **Der neue Selbsttestfall greift:** In einer Kopie von `authoring/` ausserhalb des Repositorys ist nur der neue Prüfblock entfernt. Diese Kopie unterscheidet sich von r4-53 nur durch die Kennung und den neuen Fall (`diff` gegen `git show 37d8326:authoring/tools/contract.js`). Ergebnis: `FAIL | Zeile und Menüeinträge der Direkteinstiege fehlen (r4-54, N52-2) | erwartet: utility-nav | erhalten: crisis-number-check`, `Selbsttest: 88/89 bestanden`, Exit 1.

### 3. Tests und Gate: verschärft, nichts abgeschwächt

- `selftest.mjs`, `layouttest.cjs`, `sprachtest.mjs`, `suchtest.mjs` und `authoring/tests/` sind unverändert (siehe 1).
- In `contract.js` ist ausser `BUILD` keine Zeile gelöscht (`git diff … | grep -c '^-[^-]'` = 1). Alle bisherigen Gate-Regeln und alle 88 bisherigen Selbsttestfälle bleiben, die Menüregel aus r4-52 wirkt weiter (M10).
- Neu: eine Seitenprüfung `utility-nav` und ein Selbsttestfall. **Bewertung: verschärft.**

### 4. Tests selbst ausgeführt (auf `d5229c6`, gleich `060aa8f` in `authoring/` und `site/`)

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | Exit 0, `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site` (Hinweise alle `crisis-number-check`) |
| `node authoring/tools/build.mjs --production --verify-site` | Exit 0, `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `node authoring/tools/selftest.mjs` | Exit 0, `Selbsttest: 89/89 bestanden`, 0 × `FAIL`; neuer Fall `PASS … erwartet: utility-nav | erhalten: utility-nav, crisis-number-check` |
| `node authoring/tools/suchtest.mjs dist/site` | Exit 0, `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| `node authoring/tools/sprachtest.mjs` | Exit 0, `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| `node authoring/tools/layouttest.cjs` | Exit 1, `Audit-04-Layouttest: 240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` mit `tension core exceeds 1800px` (bekannte Ausnahme B2c) |

Alle Kennzahlen des Selbstberichts stimmen mit diesen Läufen überein.

### 5. Barrierefreiheit (Stichprobe)

axe-core 4.14.0 auf allen 24 Seiten aus `dist/site` (eigener lokaler HTTP-Server), 390 × 844 und 1280 × 800, nach `document.fonts.ready`, Regeln `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`: `48 Läufe, 24 Seiten, Verstösse gesamt 0`.

### 6. Live-Site (Hinweis, keine Prüfstufe)

`curl -sS https://borderline-angehoerige.netlify.app/` am 29.10.2026, 23:10 UTC: HTTP 200, `data-puk-site-build="r4-54"`.

## Nicht prüfbar

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack).
- Safari und Firefox; nur Chromium über Playwright.
- Reale Geräte, Zoom im Browser, Systemschrift des Geräts.
- 200 % Schrift und weitere Breiten mit axe-core: in dieser Stichprobe nicht wiederholt, weil sich am Rendern nichts ändert (siehe 1).
- Fachliche, juristische und institutionelle Freigabe: nicht Gegenstand.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.** N52-2 ist behoben und durch einen greifenden Selbsttestfall gesichert. Die beiden Befunde N54-1 und N54-2 sind gering und können bei der nächsten Arbeit am Seitenrahmen mitgenommen werden; N54-2 besteht schon seit r4-51.

## Berichtigung · 30.10.2026

Bei N54-2 ist ein Satz falsch: «Daneben blockiert die Konfigurationsprüfung jede Konfiguration ohne `utilityNav` (`contract.js:320`, K3). Der Rückfall ist in diesem Repository also nie erreichbar.»

`contract.js:319–320` (Stand r4-54) prüft nur, wenn `utilityNav` angegeben ist (`if (cfg.utilityNav !== undefined)`). Blockiert wird eine leere Liste (K3). Fehlt der Eintrag ganz, meldet die Konfigurationsprüfung nichts; K1 zeigt nur die 23 falschen `nav`-Blocker, keinen Konfigurationsblocker. Der Rückfall «Website durchsuchen» ist also erreichbar. Auch die Begründung «weil `utilityNav` konfiguriert und Pflicht ist» stimmt nur zur Hälfte: `utilityNav` ist konfiguriert, aber nicht Pflicht. Schweregrad und Empfehlung bleiben gleich.

N54-2 ist in r4-57 behoben (PR #756). Zwei Selbsttestfälle für den Rückfall sind nachgereicht: `audit-results/2026-10-30-nachtrag-n54-2/BERICHT.md`.
