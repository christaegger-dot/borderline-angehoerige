# Nachprüfung r4-64 · 30.10.2026

## Auftrag, Stand, Prüfende

- **Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-64 starten».
- **Gegenstand:** r4-64 (Befund N56-1), [PR #788](https://github.com/christaegger-dot/borderline-angehoerige/pull/788).
  - Gemergt als `a55ecb1` am 30.10.2026 um 09:16:30 UTC (`merged_at`), Kopf `b62d061`.
  - Geprüft ist `git diff f1ec49f a55ecb1`. `f1ec49f` ist `main` direkt vor dem Merge (r4-61, nach #789 und #790). Der Diff enthält also genau die Änderungen von #788.
  - Danach kam auf `main` nur noch #791 (`d20973b`, nur Pendenzendatei). Die Tests liefen auf `d20973b`.
- **Selbstbericht:** `audit-results/2026-10-30-n56-1-r4-64/BERICHT.md`.
- **Befund, auf den r4-64 zurückgeht:** N56-1 in `audit-results/2026-10-30-nachpruefung-r4-55-r4-56/NACHPRUEFUNG.md`.
- **Prüfende:** eine Sitzung, die r4-64 nicht gebaut hat und N56-1 nicht gefunden hat.
  - Sie hat früher r4-60 gebaut (Gate, `contract.js`) und führt die Pendenzendatei nach. Am Footer, an `site.css` und an r4-64 hat sie nichts geändert.
  - Hier ändert sie nichts und committet nur diesen Ordner.
- **Umgebung:** Node 22.22.0, Chromium 153.0.8010.12, Playwright global über `PLAYWRIGHT_MODULE`, axe-core 4.14.0 aus einem eigenen Ordner ausserhalb des Repositorys.
  - r4-61 (`f1ec49f`) und r4-64 (`a55ecb1`) liegen als eigene Arbeitsbäume ausserhalb des Repositorys (`git worktree add --detach`).
  - Beide `site/` werden über einen lokalen HTTP-Server geladen. Über `file://` erhält `404.html` sein Stylesheet nicht, weil es Pfade ab `/` nutzt; ein erster Lauf über `file://` ist darum verworfen.
  - 200 % Schrift über CDP `Page.setFontSizes` (Standardschrift 32 px).
- **Eigene Prüfskripte in diesem Ordner** (keine Skripte der bauenden Sitzung übernommen):
  - `footer-messung.cjs`: alle 24 Seiten bei 320, 390, 768, 1100 und 1440 px, je mit 100 % und 200 % Schrift, für r4-61 und r4-64, also 240 Zustände je Stand. Gemessen werden Footerhöhe, Gewicht, Zeilen und `hyphens` der Überschriften, Kontrast, Abstand vor dem Hinweis und waagrechtes Scrollen. Rohwerte: `messung.json.gz`.
  - `auswertung.cjs`: fasst die Messung je Zustand zusammen. Ausgabe: `auswertung-ausgabe.txt`.
  - `trennung.cjs`: Zeilen und Bild der Überschrift «Fachstelle Angehörigenarbeit» bei 320 und 390 px mit 200 % Schrift. Ausgabe: `trennung-ausgabe.txt` und `trennung-*.png`.
  - `axe-r4-64.cjs`: axe-core auf allen Seiten, Ausgabe `axe-ausgabe.txt`.
  - `tests-ausgabe.txt`: die Testläufe des Repositorys, gekürzt.

## Befunde

Keine.

## Bestätigt

### 1. Diff eng begrenzt

`git diff --stat f1ec49f a55ecb1`, ohne `audit-results/` und Pendenzendatei:

- **`authoring/css/site.css` und `site/css/site.css`, je 9 Zeilen:**
  - `.puk-web-footer__heading`: `font-weight:var(--fw-regular)` → `var(--fw-medium)` (500, `site.css:179`);
  - neu `@media (max-width:22.5rem){.puk-web-footer__heading{hyphens:auto;hyphenate-limit-chars:8 4 4}}`;
  - `.puk-web-footer__boundary`: neu `margin-top:var(--space-2)` (8 px, `site.css:238`);
  - dazu Kommentare mit Auftrag und Begründung.
- **`authoring/DARSTELLUNGSREGELN.md`:** zwei Zeilen zu r4-64.
- **Build-Kennung r4-64:** `contract.js` (`BUILD`) und `site.config.json` (`assetVersion`, `independentReviewWaiver.version`, `pendingScope`, `appliedTo`).
- **`site/*.html` (24 Dateien):** Geändert sind nur die Build-Kennung in `data-puk-site-build` und die Versionsangaben `?v=` von Stylesheet und Skript (Zeilen nach Ersetzen der Kennung gezählt).
- **Nicht geändert:** Wortlaut, Fragmente, Skript, Renderer und Gate-Regeln.

### 2. N56-1 ist erfüllt

N56-1 bemängelte zwei Dinge: Die Überschriften sahen aus wie der Text darunter (16 px, Regular, grau). Und der Hinweis «Diese Website ersetzt keine …» ging ohne Abstand in den Namen der Klinik über.

Messung, 24 Seiten je Zustand, alle Seiten gleich (`auswertung-ausgabe.txt`):

| Zustand | Footer r4-61 → r4-64 | Gewicht | Zeilen «Fachstelle …» | `hyphens` | Abstand vor Hinweis | Kontrast min. | Überlauf |
|---|---|---|---|---|---|---|---|
| 320 px | 489 → 497 | 400 → 500 | 1 → 1 | `auto` | 0 → 8 px | 5,92 : 1 | 0 |
| 390 px | 441 → 449 | 400 → 500 | 1 → 1 | `manual` | 0 → 8 px | 5,92 : 1 | 0 |
| 768 px | 309 → 317 | 400 → 500 | 1 → 1 | `manual` | 0 → 8 px | 5,92 : 1 | 0 |
| 1100 px | 241 → 249 | 400 → 500 | 1 → 1 | `manual` | 0 → 8 px | 5,92 : 1 | 0 |
| 1440 px | 217 → 225 | 400 → 500 | 1 → 1 | `manual` | 0 → 8 px | 5,92 : 1 | 0 |
| 320 px, 200 % | 1321 → 1377 | 400 → 500 | 2 → 3 | `auto` | 0 → 8 px | 5,92 : 1 | 0 |
| 390 px, 200 % | 1081 → 1089 | 400 → 500 | 2 → 2 | `auto` | 0 → 8 px | 5,92 : 1 | 0 |
| 768 px, 200 % | 649 → 657 | 400 → 500 | 1 → 1 | `manual` | 0 → 8 px | 5,92 : 1 | 0 |
| 1100 px, 200 % | 505 → 513 | 400 → 500 | 1 → 1 | `manual` | 0 → 8 px | 5,92 : 1 | 0 |
| 1440 px, 200 % | 457 → 465 | 400 → 500 | 1 → 1 | `manual` | 0 → 8 px | 5,92 : 1 | 0 |

- **Überschriften:** auf allen 24 Seiten in 500 statt 400, weiter 16 px (bzw. 32 px bei 200 %) und `tinte-leise`. Bild: `footer-r4-64-1440.png`.
- **Abstand:** Zwischen «Psychiatrische Universitätsklinik Zürich» und dem Hinweis stehen jetzt in allen Zuständen 8 px, vorher 0.
- **Höhe:** Der Footer ist überall 8 px höher. Bei 320 px mit 200 % Schrift sind es 56 px, weil «Fachstelle Angehörigenarbeit» drei statt zwei Zeilen braucht. Das stimmt mit dem Selbstbericht überein, in allen zehn Zeilen.
- **Kein waagrechtes Scrollen** in allen 480 Zuständen, auch auf `404.html`.
- **Kontrast:** unverändert 5,92 : 1 (Überschrift gegen Hintergrund).

### 3. Silbentrennung unter 22,5 rem

- **Wann sie gilt:** `hyphens:auto` greift bei 320 px mit 100 % Schrift und bei 320 und 390 px mit 200 % Schrift. 22,5 rem sind 360 px bzw. 720 px. Sonst bleibt `manual`.
- **Wo sie wirkt:** nur bei 320 px mit 200 % Schrift. In Medium passt «Angehörigenarbeit» nicht mehr in 280 px.
  - Chromium trennt «Angehörigenar-beit» (`trennung-r4-64-320-200.png`).
  - Mit r4-61 (Regular) passte das Wort in eine Zeile (`trennung-r4-61-320-200.png`).
  - Bei 390 px mit 200 % Schrift bleibt das Wort ganz (`trennung-r4-64-390-200.png`).
- **«Kontakt»** hat 7 Zeichen, weniger als die 8 aus `hyphenate-limit-chars`, und wird nie getrennt.
- **Messgrenze:** `trennung.cjs` und `footer-messung.cjs` bestimmen die Zeilen über die Lage einzelner Zeichen. Bei der Trennung melden sie «Angehörigenarb | eit». Das eingefügte Trennzeichen verschiebt die Zeichenrechtecke; das Bild zeigt die richtige Trennung «Angehörigenar-beit». Es ist ein Messartefakt, kein Befund.

### 4. Tests selbst ausgeführt

Auf `main` = `d20973b` (`tests-ausgabe.txt`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production` | 24 Seiten · 0 Blocker · 20 Hinweise |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien |
| Selbsttest | 116/116 |
| Suchtest (`dist/site`) | 216 von 216, JS-Fehler 0 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c), Exit 1 wie bisher |
| axe-core 4.14.0 | 96 Läufe (24 Seiten; 390 und 1280 px mit 100 %, 320 und 1440 px mit 200 % Schrift), 0 Verstösse |

### 5. Merge und Veröffentlichung

- **#788:** gemergt um 09:16:30 UTC (`merged_at`), über das Konto von Christa Egger.
  - CI `build-and-compare` grün auf `b62d061`, 09:12:52 bis 09:13:28 UTC (`get_check_runs`).
  - Das Codex-Review brach ab (Nutzungslimit).
  - Den Entscheid «ja, ohne Codex-Review mergen» nennt die Beschreibung von #788. Die Pendenzendatei führt den Merge darum als Ausnahme von R28-O01 und R29-P20, mit dieser Quelle.
- **Live-Site:** `curl` um 2026-10-30T09:34:08Z lieferte HTTP 200, `data-puk-site-build="r4-64"` und `site.css?v=r4-64`.
  - Das ausgelieferte `site.css` ist byte-gleich mit `site/css/site.css` auf `d20973b` (md5 `d041e9fd…` auf beiden Seiten).
  - Es enthält die drei neuen Regeln.

## Hinweise (keine Befunde)

- **H1 · Abstand bei 200 % Schrift:** Die 8 px sind als `--space-2:8px` in Pixeln festgelegt und wachsen mit der Schrift nicht mit. Bei 200 % Schrift ist der Abstand ein Viertel der Schriftgrösse. Der Auftrag nannte «Abstand vor Hinweis» ohne Mass, der Selbstbericht sagt das offen. Ob ein mitwachsender Abstand (`rem`) gewünscht ist, ist eine Gestaltungsfrage.
- **H2 · Überschrift und Text:** Die Überschriften unterscheiden sich nur im Gewicht vom Text. Grösse und Farbe bleiben gleich, wie es der Entscheid «16 px, grau» und der Auftrag «Überschriften in Medium» verlangen. Auf dem Bild sind sie als Überschriften erkennbar (`footer-r4-64-1440.png`).
- **H3 · Gestaltungssystem:** Die Pendenzendatei führt «Gestaltungssystem nachführen (Fusszeile: Überschriften in Medium)» als offen. Das ist weiterhin offen.
- **H4 · Parallele Nachführung:** [PR #792](https://github.com/christaegger-dot/borderline-angehoerige/pull/792) einer anderen Sitzung führt die Pendenzen zu r4-64 ebenfalls nach. Viele dieser Punkte sind mit #791 (`d20973b`) schon auf `main`. Abfrage 09:48 UTC: offen, kein Entwurf, Kopf `31a1775`, Basis `d20973b`, `mergeable_state` `clean`. Vor einem Merge ist zu prüfen, ob #792 noch etwas Eigenes enthält.

## Nicht prüfbar

- Echter Screenreader. Die Überschriften bleiben `h2` mit denselben `id`; geändert ist nur CSS.
- Safari und Firefox, also wie sie `hyphens:auto` mit `hyphenate-limit-chars` umsetzen. Ältere Fassungen kennen `hyphenate-limit-chars` nicht und trennen dann ohne Mindestlängen.
- Reale Geräte, Zoom und Systemeinstellungen ausserhalb von Playwright.
- Erzwungene Farben, Druck und Fokusbild habe ich nicht eigens gemessen. Die Änderung berührt weder Farben noch Linkgestaltung noch Fokusregeln (Diff unter 1).

## Empfehlung

**Keine Nachbesserung nötig.**

r4-64 setzt N56-1 so um, wie es der Auftrag verlangt: Überschriften in Medium, 8 px vor dem Hinweis, kein neuer Wortlaut. Die Messwerte des Selbstberichts stimmen in allen Zuständen. Die Website hat kein waagrechtes Scrollen, keinen Kontrastverlust und keine Verstösse in axe-core. Die Hinweise H1 bis H4 brauchen keine Änderung an r4-64.
