# Nachprüfung r4-41 · 23.10.2026 · Stand `e1d0952`

**Prüfinstanz:** Nachprüfsitzung (eigene Agentensitzung ohne Kenntnis des Bauvorgangs, gestartet aus der Cloud-Sitzung session_01BMStN2dKBAcxTT7rmqqM3T). Diese Sitzung hat an [PR #711](https://github.com/christaegger-dot/borderline-angehoerige/pull/711) weder gebaut noch entschieden und vor dem Auftrag keine Datei des Branches gesehen. Sie ändert keine Inhalte, kein CSS, keine Werkzeuge und keine Konfiguration; sie trägt Befunde mit Beleg ein. Sie ist keine klinische, juristische oder institutionelle Freigabe und bezeichnet sich nicht so. Fachliche oder gestalterische Fragen sind als «Prüfbedarf» markiert.

**Geprüfter Stand:** Branch `gestaltung/2026-10-23-nachfuehrung-r4-41`, Kopf `e1d0952` (Commits `2e41c92`, `e1d0952`), Basis `main` = `8aa6be8` (r4-40). Lokaler Checkout `/home/user/borderline-angehoerige`, `git status` zu Beginn leer. Während der Prüfung hat Christa Egger den PR gemergt (`origin/main` = `67f6f6d` «Merge pull request #711», `git fetch` 23.10.2026); der Kopf des Branches blieb `e1d0952`, die Prüfung bezieht sich unverändert auf diesen Stand.

**Gelesen:** `CLAUDE.md`, `AGENTS.md`, `README.md`, `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (Abschnitte r4-41 und r4-40), `BERICHT.md` dieses Ordners (Selbstprüfung der bauenden Sitzung; ihre Zahlen sind nachgerechnet), `authoring/PRUEFBERICHT.md` (Abschnitte «Gestaltungsnachführung r4-41» und «Nachprüfung 3 PR #708»), PR-Beschreibung und alle vier PR-Kommentare (zwei Netlify-Vorschauen, zwei Codex-Meldungen ohne Review), `audit-results/2026-10-18-a04-umsetzung/ENTSCHEIDE.md`, der vollständige Diff `8aa6be8..e1d0952` (ohne `site/` und `site/` gesondert).

**Werkzeuge:** Node.js 22.22.0; Playwright 1.62.1 mit Chromium 151.0.7922.34 (Headless Shell, `PLAYWRIGHT_MODULE=/home/user/puk-website-profil/node_modules/playwright`); git 2.43.0. Lokaler Server `tools/server.mjs` des Profils auf `site/`; Fensterhöhe 900 px; 200 % Schrift als `--blink-settings=defaultFontSize=32,defaultFixedFontSize=26` und zusätzlich als `html{font-size:200%}`; Farbzustände 600 ms nach dem Hover gemessen (`--dur-fast` 120 ms). Der Headless-Browser hat kein deutsches Trennmuster; `hyphens:auto` trennt dort nur an weichen Trennstellen (U+00AD). Vergleichsstand `main` aus einem eigenen Arbeitsbaum (`git worktree add … 8aa6be8`, danach entfernt). Eigene Skripte (`titel.mjs`, `segmente.mjs`, `blau100.mjs`, `figuren.mjs`) und Rohdaten liegen ausserhalb des Repositorys; nur die 16 Fotos unter `nachpruefung/` sind versioniert.

**Schwere** wie im Repository üblich: «blockierend» verletzt WCAG 2.2 AA neu oder bricht Build/Parität; «wichtig» ist vor einem Merge zu beheben; «gering» betrifft Konsistenz oder Optionales.

## Ergebnis in Kürze

- **Empfehlung: Nachbesserung nötig (N41-W1), ohne Blocker.** Der Merge ist inzwischen durch Christa Egger erfolgt; die Nachbesserung kann als Folge-PR erfolgen. Kein Befund verletzt WCAG 2.2 AA; Build und Parität bestehen.
- **Befunde: blockierend 0, wichtig 1, gering 2.** N41-W1: Die Aussage «0 Titelbrüche ohne Trennstelle» gilt nur auf Wortebene. Auf Bruchebene brechen bei 200 % Schrift vier Segmente ohne Trennstelle: «erkrankungen» (Diagnose, 320 und 375 px), «betroffen» (Kinder, 320 px) und «schlagen» (Fragen, 320 px); der erweiterte Layouttest kann das nicht erkennen, weil er ein Wort als «an Trennstelle getrennt» zählt, sobald es eine weiche Trennstelle enthält. N41-G1: Zeilenbilanz von `site.css` im Nachweis. N41-G2: Vermerk `appliedTo` nennt die Nachprüfung vor ihrem Vorliegen als dokumentiert. Dazu zwei Hinweise ohne Befund mit Prüfbedarf (N41-H1 Grenzwerte 8 4 4 gegenüber Trennstellen mit 3 Zeichen, N41-H2 gierige Trennung «Gene-sung ist»).
- **Kennzahlen der bauenden Sitzung nachgerechnet: alle stimmen** (Parität 34 Dateien, 0 Blocker / 20 Hinweise, 84/84, 216/216, 73/73, 230 Zustände / 25 Bedienproben / 1 Abweichung, 47 mehrzeilige Titelwörter mit Trennstelle bei 200 %, 0 ohne, 0 Treffer Blau 100 unter 24 px auf nicht weisser Fläche, 5,79:1 und 4,28:1). Die Zahl 47/0 ist richtig; nur ihre Deutung «Umbruch nur an Trennstellen» ist es nicht (N41-W1).
- **Umfang bestätigt:** Nur die erwarteten Dateien; in `authoring/content/` ausschliesslich weiche Trennstellen in den `h1` von 17 Seiten, kein Wortlaut, keine Krisen- oder Kontaktangabe, keine neue externe Ressource, kein Inline-Skript.
- **W-2 im Browser:** 276 Zustände (23 Seiten × 4 Breiten × 3 Schriftvarianten), 0 waagrechter Überlauf; bei 100 % keine Trennung ausser «Begleit-erkrankungen» (Diagnose, 320 und 375 px). `container-type:inline-size` verändert den Einstieg bei 100 % nicht: alle 92 Zustände gegenüber `main` in Einstiegshöhe, h1-Lage und erstem Aktionslink gleich. Auf `main` brachen bei 200 %/320 px auf 17 von 23 Seiten 26 Titelwörter ohne Trennstelle, neu 3 Segmente (N41-W1).
- **P708-W4 und P708-W2 ohne Nebenwirkung:** 12 Elementfotos (sechs Figuren bei 375 und 1280 px) byteidentisch mit `main`.
- Screenreader bleibt offen, wie bei allen Prüfungen seit r4-38.

## Kennzahlen nachgerechnet

| Kennzahl | bauende Sitzung | nachgerechnet | Beleg |
| --- | --- | --- | --- |
| `--production --verify-site` | Parität 34 Dateien | **PARITÄT BESTANDEN: 34 Dateien byte-gleich**, Exit 0 | `node authoring/tools/build.mjs --production --verify-site` |
| Produktionsgate | 23 Seiten · 0 Blocker · 20 Hinweise | **23 Seiten · 0 Blocker · 20 Hinweise**, alle 20 `crisis-number-check` | ebenda |
| Selbsttest | 84/84 | **84/84**, Exit 0 | `node authoring/tools/selftest.mjs` |
| Suchtest | 216/216 | **216 von 216**, JS-Fehler 0, Exit 0 | `node authoring/tools/suchtest.mjs site` |
| Sprach-/UI-Test | 73/73 | **73 Prüfungen bestanden**, JS-Fehler 0, Exit 0 | `node authoring/tools/sprachtest.mjs site` |
| Layouttest | 230 Zustände, 25 Bedienproben, 1 Abweichung | **230 Seitenzustände, 25 Bedienproben, 1 Abweichung** `tension core exceeds 1800px`, Exit 1 | `node authoring/tools/layouttest.cjs <ausgabe>`; `ERGEBNIS.json` |
| Titelwörter im Layouttest | 47 an Trennstellen bei 200 %, 0 ohne | **47 / 0** auf Wortebene; bei 100 % 2 (Begleit-erkrankungen, 320 und 375). Auf Bruchebene **4 Brüche ohne Trennstelle** (N41-W1) | `BROWSER.json` des Laufs; eigenes `segmente.mjs` |
| Blau 100 unter 24 px auf nicht weisser Fläche | 0 Treffer | **0 Treffer** auf 23 Seiten bei 1280 px | eigenes Skript, Prüfpunkt 5 |
| Kontraste | 5,79:1 und 4,28:1 | **5,79:1** (#2B4FE0 auf #F4F4F4), **4,28:1** (#3C64FF auf #F4F4F4) | Prüfpunkt 10 |
| `git status` nach allen Läufen | – | leer (`dist/` ist in `.gitignore`) | `git status --short` |

## Prüfpunkte

### 1 · Umfang

**Ergebnis: bestätigt, kein Befund.** `git diff --stat 8aa6be8..e1d0952`: 73 Dateien. Ausserhalb `site/`: `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (+19/−4), `audit-results/README.md` (+4), `audit-results/2026-10-23-r4-41-nachfuehrung/BERICHT.md` (neu) und 24 PNG (neu), `authoring/PRUEFBERICHT.md` (+8), 17 Dateien `authoring/content/*.html` (je 1 Zeile), `authoring/css/site.css` (+26/−31), `authoring/site.config.json` (+5/−4), `authoring/tools/contract.js` (1 Zeile), `authoring/tools/layouttest.cjs` (+5/−1). In `site/`: 23 HTML-Seiten und `site/css/site.css` (`cmp` mit `authoring/css/site.css` gleich). Keine andere Datei.

- **Inhalt:** Für alle 23 Dateien in `authoring/content/` ist der Stand nach Entfernen aller `&shy;` byteidentisch mit `8aa6be8` (md5 je Datei). Zusätzlich: Nach Entfernen des `<h1>…</h1>` sind alle 23 Dateien byteidentisch mit `8aa6be8`, d. h. die neuen weichen Trennstellen liegen ausschliesslich in den `h1`. Sechs Dateien unverändert (`404`, `kurz`, `quellen`, `rolle`, `selbstfuersorge`, `ueber`: kein Titelwort ab 8 Zeichen). Die drei `&shy;` ausserhalb des `h1` in `behandlung.html` bestehen bereits auf `main`.
- **`site/`:** Im Diff der 23 Seiten bleiben nach Ausblenden der Zeilen mit `data-puk-site-build`, `?v=r4-41` und `<h1 class="puk-web-h1">` **0 Zeilen**. Neue `<script`-Zeilen sind nur die bestehenden `interaktion.js`-Einbindungen mit neuer Kennung; keine neue externe Ressource, kein Inline-Skript, keine `http(s)://`-Adresse ausser in Dokumentation.
- **Krisen- und Kontaktangaben:** unverändert (Inhaltsdiff nur `h1`; die 20 `crisis-number-check`-Hinweise sind dieselben wie auf `main`).

### 2 · Build und Parität

**Ergebnis: bestätigt.** Siehe Tabelle. Der Layouttest meldet wie dokumentiert nur die begründete Ausnahme B2c (Anspannungskurve 1997 px hoch bei 375 px). `git status` nach allen Läufen leer.

### 3 · Build-Kennung

**Ergebnis: bestätigt.** `data-puk-site-build="r4-41"` in 23 von 23 `site/*.html`; `?v=r4-41` 46-mal (`site.css` und `interaktion.js` je Seite), kein anderer `?v=`-Wert; `authoring/tools/contract.js:11` `BUILD = 'r4-41'`; `authoring/site.config.json:5` `"assetVersion": "r4-41"`. Verbliebene Nennungen von r4-39/r4-40 ausserhalb der Dokumentation: nur der historische Kommentar `site.css:1498` («Audit 04, r4-39») und der Vermerk `appliedTo` in `site.config.json:40` (Zitat des Entscheids). Das Gate verlangt `waiver.version === BUILD` (`contract.js:131–134`, Meldung `change-review` in Zeile 597); mit r4-41 ist es erfüllt.

### 4 · W-2 Titeltrennung

**Regeln (`authoring/css/site.css`):** Zeile 1637 `.puk-longform__hero .puk-web-h1{…;hyphens:none}`; Zeile 1643 `.puk-longform__hero{container-type:inline-size}`; Zeile 1644 `@container (max-width:12em){.puk-longform__hero .puk-web-h1{hyphens:auto;hyphenate-limit-chars:8 4 4}}`; Zeile 1647 `[data-page-id="diagnose"] .puk-longform__hero .puk-web-h1{hyphens:manual}`. Kommentar Zeilen 1638–1642 und 1645–1646.

**Weiche Trennstellen (alle 23 `h1`, `|` = U+00AD):** Border|line – Orien|tierung für Ange|hörige · Border|line ver|stehen und die eigenen Grenzen im Blick behal|ten · Dia|gnose und Begleit|erkrankungen · Alltag und Bezie|hungen · Behand|lung und Ihre Rolle darin · Zuge|wandt und klar spre|chen · Krisen beglei|ten · Wenn Kinder mit|betroffen sind · Wenn Ihr jugend|liches Kind betrof|fen ist · Grenzen setzen, das eigene Leben schüt|zen · Gene|sung ist möglich und kann unter|schied|lich aus|sehen · Unter|stüt|zung finden · Bücher für Ange|hörige · Fragen und Nach|schlagen · Begriffe ver|ständ|lich erklärt · Website durch|suchen · Impres|sum und Daten|schutz · ohne Trennstelle: Diese Seite gibt es nicht · Kurz und klar · Quellen · Ihre Rolle klären · Auf sich achten · Über diese Website.

- Jedes Titelwort ab 8 Zeichen trägt eine Trennstelle, mit einer Ausnahme: «Begriffe» (8 Zeichen) hat keine; es gibt dort keine Trennstelle mit mindestens 3 Zeichen auf beiden Seiten (Be-griffe, Begrif-fe). Kein Befund.
- Alle Trennstellen liegen an sprachlich vertretbaren Silbengrenzen mit mindestens 3 Zeichen davor und danach. Mit genau 3 Zeichen auf einer Seite: Dia|gnose, ver|stehen, ver|ständlich, aus|sehen, mit|betroffen, schüt|zen, beglei|ten, behal|ten, betrof|fen, Impres|sum (zehn Stellen). **Prüfbedarf (gestalterisch):** ob die kurzen Vorsilben «Dia-», «Ange-», «Gene-» im Titel erwünscht sind (Duden erlaubt sie; «Diag-nose» und «An-gehörige» wären Alternativen) – siehe auch N41-H1.
- Lange Wörter tragen nur **eine** Trennstelle, auch wenn der Rest nach der Trennstelle länger als die Zeile bei 320 px/200 % ist: «Begleit|erkrankungen» (Rest 12 Zeichen), «mit|betroffen» (9), «Nach|schlagen» (8). Das führt zu N41-W1.

**Browser (eigenes Skript `titel.mjs`, 23 Seiten × 320/375/768/1280 px × 100 % / 200 % blink / 200 % `html{font-size:200%}` = 276 Zustände, 0 JS-Fehler; Zählung auf Wortebene wie im Layouttest):**

| Variante / Breite | computed `hyphens` | mehrzeilige Wörter mit Trennstelle | mehrzeilige Wörter ohne Trennstelle | Überlauf |
| --- | --- | --- | --- | --- |
| 100 % / 320 | none 22, manual 1 (diagnose) | 1 (Begleit-erkrankungen) | 0 | 0 |
| 100 % / 375 | none 22, manual 1 | 1 (Begleit-erkrankungen) | 0 | 0 |
| 100 % / 768, 1280 | none 22, manual 1 | 0 | 0 | 0 |
| 200 % blink / 320 | auto 22, manual 1 | 27 | 0 | 0 |
| 200 % blink / 375 | auto 22, manual 1 | 20 | 0 | 0 |
| 200 % blink / 768, 1280 | none 22, manual 1 | 0 | 0 | 0 |
| 200 % CSS / 320, 375, 768, 1280 | identisch mit 200 % blink | 27 / 20 / 0 / 0 | 0 | 0 |

**Bruchebene (eigenes Skript `segmente.mjs`, 200 % blink, 320 und 375 px):** Für jedes der 47 mehrzeiligen Titelwörter wurde geprüft, ob jedes durch U+00AD begrenzte Segment auf genau einer Zeile liegt (Lage des zweiten und letzten Zeichens je Segment; das erste Zeichen nach einem U+00AD trägt in Chromium das Rechteck der Trennstrich-Glyphe und ist dafür ungeeignet). **43 Wörter brechen nur an Trennstellen, 4 nicht:**

| Seite / Breite | Wort | gerendert | Zeichenlage (x,y,Breite) |
| --- | --- | --- | --- |
| diagnose / 320 | Begleit\|erkrankungen | Begleit- · erkrank · ungen | k 232,1300,37 → u 20,1376,42 |
| kinder / 320 | mit\|betroffen | mit- · betroffe · n sind | e 248,1224,39 → n 20,1300,42 |
| fragen / 320 | Nach\|schlagen | Nach- · schlage · n | e 237,1163,39 → n 20,1239,42 |
| diagnose / 375 | Begleit\|erkrankungen | Begleit- · erkrank… · …ungen | wie 320 px |

Das Foto der bauenden Sitzung `titel-diagnose-320-200prozent.png` zeigt «Begleit- / erkrank / ungen» bereits; ihr Text nennt dennoch «Umbruch nur an Trennstellen». Auf Diagnose gilt `hyphens:manual`, der Bruch tritt also in jedem Browser auf. Auf Kinder und Fragen gilt `hyphens:auto` mit `8 4 4`: In Browsern mit deutschem Trennmuster wäre «be-trof-fen» nur als «betrof-fen» (3 Zeichen danach) und «schla-gen» (3 danach) trennbar, beides unter dem Grenzwert 4 – der willkürliche Bruch bleibt also auch dort. Beispiele regulärer Trennungen bei 200 %/320: Border-line, Orien-tierung, Ange-hörige, Dia-gnose, Gene-sung, unter-schied-lich, aus-sehen, Unter-stüt-zung. Computed `hyphenate-limit-chars` im Container-Fall «8 4 4». Container-Breite des Einstiegs (Inhaltsbreite ÷ Schriftgrösse des Einstiegs): 100 % 14,74 em (320 px) / 17,63 em (375 px); 200 % 7,37 em / 8,82 em / 16,82 em (768 px) – die Angaben «7,4 bzw. 8,8 em» und «mindestens 14,7 em» stimmen.

**Vergleich mit `main` (`8aa6be8`, gleiches Skript):** bei 100 % alle 92 Zustände gleich in Einstiegshöhe, h1-Lage, h1-Höhe und Lage des ersten Aktionslinks (z. B. index 375 px: Einstieg 627 px, h1 ab 281 px, 114 px hoch, «Mit meiner Frage beginnen» ab 594 px, beide Stände); `container-type` auf `main` «normal», neu «inline-size». Abweichungen nur bei 200 % auf 320/375 px und nur durch die Zeilenzahl der Trennung (±1 Zeile, ±76 px), z. B. index 320 px 6 → 7 Zeilen, verstehen 320 px 10 → 9 Zeilen. Auf `main` brachen bei 200 %/320 px auf 17 Seiten 26 Titelwörter ohne Trennstelle (375 px: 14 Seiten), neu 3 bzw. 1 Segmente (N41-W1).

**Fotos (`nachpruefung/`):** `titel-<index|verstehen|diagnose|genesung>-<320|375>-<100|200>prozent.png` (16 Dateien, Ausschnitt `h1`). Sichtkontrolle: index 320/200 «Border- / line – / Orien- / tierung / für / Ange- / hörige»; diagnose 375/100 «Diagnose / und Begleit- / erkrankungen»; genesung 320/200 «Gene- / sung ist / möglich / und / kann / unter- / schied- / lich / aus- / sehen»; verstehen 375/200 «Border- / line ver- / stehen / und die / eigenen / Grenzen / im Blick / behalten»; diagnose 320/200 «Dia- / gnose / und / Begleit- / erkrank / ungen» (N41-W1).

### 5 · W-3 Hover

**Regeln (`authoring/css/site.css`):** Token Zeile 112 `--text-link-on-tint:var(--puk-blue-125)`; Hover-Regeln Zeilen 569 (`.puk-carousel__btn`), 584 (`.puk-disclosure__link`), 603 (`.puk-btn--secondary`, `.puk-btn--ghost`), 646 (`.puk-dialog__close`), 936 (`.puk-vis-btn`), jeweils `background:var(--ui-wash);color:var(--text-link-on-tint)`.

- **Vorkommen:** Keine der sechs Klassen in `site/*.html` (0 Dateien je Klasse), in `authoring/js/interaktion.js` (einziger Treffer Zeile 82 ist ein Kommentarbeispiel), in `build.mjs` oder `contract.js`. Die Regeln sind, wie die bauende Sitzung sagt, vorsorglich.
- **Scan** aller 23 Seiten bei 1280 px nach Text unter 24 px in `rgb(60, 100, 255)` auf nicht weisser Fläche (wirksame Hintergrundfarbe über die Vorfahren ermittelt): **0 Treffer**.
- **Hover-Stichproben** (Farbe 600 ms nach Hover, Kontrast zur wirksamen Fläche): Einstiegskarten `index .bl-paths-cards a` (4 von 9): Ruhe #222 auf #F5F7FF 14,87:1, Hover #222 auf #F0F3FF 14,37:1; Pfadlinien `.bl-paths-lines a` (4 von 6): Hover #2B4FE0 auf Weiss 6,37:1; Aktionslink «Mit meiner Frage beginnen»: Weiss auf #3C64FF 4,71:1, Hover Weiss auf #2B4FE0 6,37:1; Fusszeile `index`/`verstehen .puk-web-footer a` (je 4 von 6): Ruhe #2B4FE0 auf #F5F7FF 5,95:1 (15 px/300), Hover #222 14,87:1; «Was Sie tun können» `verstehen .bl-tun a` («Beratung»): Ruhe #2B4FE0 auf #F0F3FF 5,75:1, Hover #222 14,37:1; Absender `krise .puk-site-sender a`: Ruhe #2B4FE0 auf #F4F4F4 5,79:1, Hover #222 14,47:1. **Minimum 4,71:1 (Aktionslink in Ruhe, 21 px/500), alle übrigen ≥ 5,75:1.** `kinder .bl-tun a` und `krise .puk-longform__hero a.puk-link--inline`: keine Elemente.

### 6 · P708-W4 verwaiste Regeln

**Ergebnis: bestätigt, kein Befund.** `grep` nach `bl-observe`, `bl-knowledge-boundary`, `bl-parallel-aspects` in `authoring/content`, `authoring/css`, `authoring/js`, `authoring/tools`, `site/`: **0 Treffer**. Verbliebene Selektoren gelten weiter: `.bl-infoflow__route` (Zeilen 1183, 1544, 1548, 1551), `.bl-caremap article` (1192, 1196, 1544, 1548, 1551), `.bl-relief__branches` (1594, 1602, 1607), `.bl-transition` (1595–1597, 1606). Browser-Vergleich mit `main` (Elementfoto, `reducedMotion`, byteweise und per Pixelvergleich): `.bl-relief` (selbstfuersorge) 311×932 / 1024×504 px, `.bl-transition` (jugendliche) 311×1073 / 1024×506, `.bl-infoflow` (behandlung) 311×668 / 656×395, `.bl-caremap` (kinder) 311×887 / 1024×645 – bei 375 und 1280 px **alle byteidentisch** (0 abweichende Pixel), Grid-Spalten und Masse gleich.

### 7 · P708-W2 `@supports`

**Ergebnis: bestätigt.** `site.css:1726` `@supports selector(:has(*)){.puk-vis-figure .bl-phase-actions .puk-vis-ansatz{padding-left:0;border-left:0;margin:0;background:none;color:inherit}}`; die `:has()`-Regel für die Phasenkarte steht unverändert in Zeile 1727. Browser-Vergleich mit `main` (Playwright-Chromium unterstützt `:has()`): Figur `v-vs-anspannung` 335×1997 px (375) und 1104×1267 px (1280) sowie die Phasenkarte mit Ansatzpunkt (`li:has(.puk-vis-ansatz)`) 311×242 / 247×366 px **byteidentisch**. Rückfall ohne `:has()` nur durch Lesen beurteilt: Ohne `:has()` gilt weder die weisse Textfarbe der Karte noch die Aufhebung der Ansatzpunkt-Markierung; der Ansatzpunkt behält dann seine eigene linke Markierung (`.puk-vis-ansatz`-Grundregel). Plausibel; nicht gemessen.

### 8 · Gate und Verzicht

**Ergebnis: formal bestätigt; Prüfbedarf vermerkt.** `site.config.json`: `independentReviewWaiver.version` «r4-41», `decidedBy` «Christa Egger», `decidedAt` «2026-10-18», `reference` `audit-results/2026-10-18-a04-umsetzung/ENTSCHEIDE.md`, `statement` unverändert, neu `appliedTo`. Der referenzierte Entscheid existiert und enthält sinngemäss den Verzicht («Der vorherige ausdrückliche Entscheid ‹ich will keine unabhänige gesamtprüfung mehr machen› gilt weiterhin», Absatz 7; Original unter `2026-10-18-a03-umsetzung/VERZICHT-GESAMTPRUEFUNG.md`). Die Pendenzendatei bezeichnet ihn unter r4-40 als fortgeltend («Die unabhängige Gesamtprüfung entfällt weiterhin nach dem Entscheid vom 18.10.2026», Zeile 36). `pendingScope` beschreibt r4-41. `reviewScope`, `reviewedBy`, `reviewedAt` unverändert (Diff).

**Prüfbedarf:** Die Anwendung des Verzichts auf r4-41 hat die bauende Sitzung selbst vorgenommen, gestützt auf den allgemein formulierten Entscheid («keine … mehr») und den Auftrag «du kannst selbständig entscheiden». Eine ausdrückliche Bestätigung von Christa Egger für r4-41 ist nicht dokumentiert. Der inzwischen erfolgte Merge durch Christa Egger spricht dafür, ersetzt aber keinen Vermerk; ob ein solcher Vermerk gewünscht ist, entscheidet sie. Siehe N41-G2.

### 9 · Dokumentation

**Ergebnis: Zahlen stimmen; eine Deutung ist falsch (N41-W1); zwei geringe Befunde.** Pendenzendatei (Kopfzeile mit `8aa6be8`, PR #711 als Entwurf; Abschnitt r4-41; Nachtrag zum Profilstand 2026.10.9 unter r4-40), Prüfbericht-Abschnitt, `audit-results/README.md` und `BERICHT.md` nennen dieselben Kennzahlen wie meine Messungen. Keine Aussage behauptet eine Freigabe, die nicht belegt ist; alle vier Stellen bezeichnen die Prüfung als Selbstprüfung und nennen Screenreader sowie reale Trennmuster als nicht geprüft. 24 Bildschirmfotos im Ordner, benannt wie in `BERICHT.md` beschrieben (4 × `startseite-…`, 20 × `titel-<seite>-<breite>-<100|200>prozent.png`). Abweichungen: **N41-W1** «0 Brüche ohne Trennstelle» / «Umbruch nur an Trennstellen» (BERICHT.md, PR-Beschreibung, Pendenzendatei Zeile 20, Prüfbericht Zeile 424) ist auf Bruchebene unzutreffend (Prüfpunkt 4). **N41-G1** `BERICHT.md` «`site.css` um 17 Zeilen kürzer» – tatsächlich +26/−31 Zeilen, netto 5 Zeilen kürzer (1827 → 1822); die Entfernung allein umfasst rund 17 Zeilen, die neuen W-2/W-3/P708-W2-Zeilen gleichen das teilweise aus. **N41-G2** `site.config.json` `appliedTo`: «eine Nachprüfung … ist in audit-results/2026-10-23-r4-41-nachfuehrung/ dokumentiert» – zum Zeitpunkt `e1d0952` lag dort nur die Selbstprüfung; mit dieser Datei ist die Aussage erfüllt.

### 10 · Kontraste

**Ergebnis: bestätigt.** WCAG-Relativleuchtdichte, eigene Rechnung: Blau 125 #2B4FE0 auf #F4F4F4 **5,79:1**; Blau 100 #3C64FF auf #F4F4F4 **4,28:1**. Ergänzend: #2B4FE0 auf Weiss 6,37:1, auf #F5F7FF 5,95:1; #3C64FF auf Weiss 4,71:1, auf #F5F7FF 4,40:1. Tokens: `site.css:28` `--puk-blue-100:#3C64FF`, `:34` `--puk-blue-125:#2B4FE0`, `:89` `--ui-wash:#F4F4F4`.

## Befundliste

| Nr. | Schwere | Befund | Beleg |
| --- | --- | --- | --- |
| – | blockierend | keine | – |
| N41-W1 | wichtig | Bei 200 % Schrift brechen vier Titelsegmente ohne Trennstelle: «erkrankungen» (Diagnose, 320 und 375 px), «betroffen» (Kinder, 320 px), «schlagen» (Fragen, 320 px). Die Aussage «0 Titelbrüche ohne Trennstelle» stimmt nur auf Wortebene; der erweiterte Layouttest (`layouttest.cjs`, `title.hyphenated`/`title.broken`) zählt ein mehrzeiliges Wort als «an Trennstelle getrennt», sobald es ein U+00AD enthält, und kann Brüche innerhalb eines Segments nicht erkennen. Kein WCAG-Verstoss; Rückschritt gegenüber `main` keiner (dort 26 Wörter), aber die Profilregel W-2 ist für diese drei Titel nicht erfüllt und die Dokumentation behauptet das Gegenteil. Mögliche Abhilfe (Entscheid der bauenden Sitzung bzw. von Christa Egger): weitere Trennstellen «Begleit\|erkran\|kungen», «betrof\|fen», «schla\|gen» (die beiden letzten mit 3 Zeichen danach, siehe N41-H1) und eine Prüfung auf Segmentebene im Layouttest. | Prüfpunkt 4, Tabelle Bruchebene; `titel-diagnose-320-200prozent.png` der bauenden Sitzung |
| N41-G1 | gering | `BERICHT.md` nennt `site.css` «um 17 Zeilen kürzer»; netto sind es 5 Zeilen (+26/−31, 1827 → 1822). Dokumentationsgenauigkeit, keine Wirkung auf die Website. | `git diff --numstat 8aa6be8..e1d0952 -- authoring/css/site.css`; `wc -l` |
| N41-G2 | gering | `appliedTo` in `site.config.json` bezeichnet die Nachprüfung als dokumentiert, bevor sie vorlag. Mit dieser Datei erfüllt; keine Änderung nötig. | `authoring/site.config.json:40` |

**Hinweise ohne Befund, mit Prüfbedarf:**

- **N41-H1** `hyphenate-limit-chars:8 4 4` verlangt 4 Zeichen vor und nach einer automatischen Trennung; zehn gesetzte weiche Trennstellen haben nur 3 Zeichen auf einer Seite (Dia|gnose, ver|stehen, ver|ständlich, aus|sehen, mit|betroffen, schüt|zen, beglei|ten, behal|ten, betrof|fen, Impres|sum). Chromium 151 wendet die Grenzwerte nicht auf weiche Trennstellen an (gemessen: alle zehn trennen bei 200 %/320 px an dieser Stelle, z. B. «Dia-gnose», «aus-sehen», «Impres-sum»). In Browsern mit deutschem Trennmuster entstehen damit zwei Regelwerke (automatisch 4/4, gesetzt 3/x). **Prüfbedarf gestalterisch**, ob «mindestens 3» für die gesetzten Stellen gewollt ist, ob der Grenzwert auf `8 3 3` gesenkt wird (dann könnten reale Browser auch «betrof-fen» und «schla-gen» selbst trennen) oder die gesetzten Stellen auf 4 angeglichen werden.
- **N41-H2** Die Zeilenfüllung ist gierig: bei 200 %/320 px steht «Gene- / sung ist», obwohl «Genesung» allein in die Zeile passte (Foto `titel-genesung-320-200prozent.png`). Browserverhalten bei `hyphens:auto`, kein Fehler der Umsetzung. **Prüfbedarf gestalterisch**, ob das hingenommen wird.

## Prüfbedarf (Zusammenfassung)

1. Behebung von N41-W1 (zusätzliche Trennstellen und Prüfung auf Segmentebene) und ob dafür ein Folge-PR eröffnet wird.
2. Anwendung des Verzichts auf die Gesamtprüfung auf r4-41 ohne eigenen Vermerk von Christa Egger (Prüfpunkt 8).
3. Trennstellen mit kurzer Vorsilbe im Titel: «Dia-gnose», «Ange-hörige», «Gene-sung»; Grenzwert 8 4 4 gegenüber gesetzten 3-Zeichen-Stellen (N41-H1).
4. Gierige Trennung «Gene-sung ist» (N41-H2).

## Nicht geprüft

Screenreader; Firefox und WebKit; automatische Silbentrennung mit deutschem Trennmuster in realen Browsern (nur weiche Trennstellen messbar); erzwungene Farben; reale Geräte; Netlify-Vorschau (nur der lokale Server auf `site/`); Rückfall ohne `:has()` im Browser; Wortlaut, Fachaussagen und Rechtsangaben (unverändert laut Diff, nicht beurteilt). Diese Nachprüfung ist keine unabhängige Gesamtprüfung und keine klinische, juristische oder institutionelle Freigabe.
