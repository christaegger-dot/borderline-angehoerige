# Gestaltungsnachführung r4-41 · 23.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 23.10.2026:** «einverstanden, setze um die offenen Pendenzen. du kannst selbständig entscheiden!» nach der Beurteilung der Releasefähigkeit von r4-40 (Pendenzendatei, Abschnitt r4-41). Ausgangsstand `main` = `8aa6be8` (r4-40, veröffentlicht am 22.10.2026). Branch `gestaltung/2026-10-23-nachfuehrung-r4-41`.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung. Kein Wortlaut, keine Abbildung und keine Kontaktangabe wurden geändert; die Änderungen sind technisch-gestalterisch.

## Umgesetzte Pendenzen

| Pendenz | Entscheid und Umsetzung | Beleg |
| --- | --- | --- |
| Titel brechen bei 200 % Schrift im Wort (Profilregel 2026.10.9, W-2) | `.puk-longform__hero` ist Inline-Container; `.puk-longform__hero .puk-web-h1` erhält `hyphens:none` (bei Standardschrift keine Trennung, auch nicht an weichen Trennstellen). Ist der Einstieg schmaler als 12 em seiner Schrift – 320 bis 375 px bei 200 % Schrift (7,4 bzw. 8,8 em); bei Standardschrift mindestens 14,7 em –, gilt `hyphens:auto` mit `hyphenate-limit-chars:8 4 4` (8 statt 10 Zeichen wie im Profil, weil der Titel hier bei 200 % 68 px gross ist). Weiche Trennstellen (`&shy;`) in 17 Seitentiteln für Wörter ab 8 Zeichen, jeweils mindestens 3 Zeichen vor und nach der Trennstelle, in `authoring/content/`. Ausnahme `[data-page-id="diagnose"]`: `hyphens:manual`, weil «Begleiterkrankungen» auch bei Standardschrift länger als die Zeile ist und die gesetzte Trennstelle «Begleit-erkrankungen» dort einem Umbruch an beliebiger Stelle vorzuziehen ist (Stand vor r4-41). | `authoring/css/site.css`, Block «Einstieg»; Messung unten; Bildschirmfotos `titel-*.png` |
| Hover-Zustände in Blau 100 auf grauer Fläche (Profilregel 2026.10.9, W-3) | Token `--text-link-on-tint` (= Blau 125) ergänzt; `.puk-btn--secondary/--ghost:hover`, `.puk-carousel__btn:hover`, `.puk-disclosure__link:hover`, `.puk-dialog__close:hover`, `.puk-vis-btn:hover` zeigen Text auf `--ui-wash` in Blau 125 (5,79:1 statt 4,28:1). Befund: Keine der 23 gebauten Seiten verwendet eine dieser Klassen; die Regel ist damit vorsorglich und für die Website ohne sichtbare Wirkung. | grep über `site/*.html`: 0 Treffer je Klasse |
| Build-Kennung uneinheitlich (r4-39 / r4-40) | `contract.js` `BUILD` und `site.config.json` `assetVersion` auf r4-41. Das Produktionsgate verlangt den dokumentierten Verzicht auf die Gesamtprüfung je Build-Version (`change-review`); `independentReviewWaiver.version` auf r4-41 gesetzt, gestützt auf den fortgeltenden Entscheid vom 18.10.2026 (Pendenzendatei r4-40: «Die unabhängige Gesamtprüfung entfällt weiterhin»), mit Vermerk `appliedTo`. `pendingScope` beschreibt r4-41. | `data-puk-site-build="r4-41"`, `?v=r4-41` in allen 23 Seiten |
| P708-W4 verwaiste CSS-Regeln | Regeln für `.bl-observe*`, `.bl-knowledge-boundary` und `.bl-parallel-aspects` entfernt (in `content/` und `site/` seit PR #708 ungenutzt, grep 0 Treffer); gemeinsame Selektorlisten um diese Klassen gekürzt. `site.css` um 17 Zeilen kürzer. | `git diff authoring/css/site.css` |
| P708-W2 Markierung ohne `:has()` | Die Regel, die die eigene Markierung des Ansatzpunkts entfernt, steht jetzt in `@supports selector(:has(*))`; Browser ohne `:has()` behalten die linke Markierung des Ansatzpunkts. | `site.css`, Block Phasenkarte |
| Metadaten und Pendenzendatei | `pendingScope` r4-41; Pendenzendatei mit Abschnitt r4-41, Profilstand 2026.10.9 nachgetragen. `reviewScope`/`reviewedAt` (PUK-Prüfung r4-35) unverändert, weil keine neue PUK-Prüfung stattfand. | Dateien |

**Bewusst nicht umgesetzt:** P708-W3 (Pfeil im Fusszeilenlink; moderne `content`-Syntax mit Alternativtext bleibt, Rückfall betrifft nur alte Browser), P708-V4 (Lesebreite der zwei Figuren, im Review G als vertretbar bezeichnet), H2 (`:not()` in der Hover-Regel, ohne Rückschritt). **Nicht umsetzbar:** Screenreader-Prüfung (kein Screenreader verfügbar). **Nicht Teil des Auftrags:** Indexierung (`noindex`, Institutionsentscheid P-13), Merge, Veröffentlichung.

## Tatsächlich ausgeführte Prüfungen (lokal, Node 22.22.0, Playwright 1.62.1 über `PLAYWRIGHT_MODULE`, Chromium Headless Shell 151)

| Prüfung | Ergebnis |
| --- | --- |
| `build.mjs --production --out=site --write-site` | 23 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, unverändert) |
| `build.mjs --production --verify-site` | Parität 34 Dateien bytegleich |
| Selbsttest | 84/84 |
| Suchtest | 216/216, 0 JS-Fehler (der Suchindex entfernt weiche Trennstellen, `search-index.mjs`) |
| Sprach-/UI-Test | 73/73, 0 JS-Fehler |
| Audit-04-Layouttest, erweitert | 230 Seitenzustände, 25 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, begründete Ausnahme B2c). Neu geprüft: Titelwörter, die über mehr als eine Zeile laufen: 47 Brüche an weichen Trennstellen bei 200 % (Chromium ohne deutsches Trennmuster), 0 Brüche ohne Trennstelle; bei Standardschrift nur «Begleit-erkrankungen» (Ausnahme, s. o.) |
| Titel bei 320/375 px, Startseite, Verstehen, Diagnose, Unterstützung, Genesung | 100 %: `hyphens:none`, keine Trennung (Diagnose: `manual`, «Begleit-erkrankungen»); 200 % (`--blink-settings=defaultFontSize=32`): `hyphens:auto`, Umbruch nur an Trennstellen, z. B. «Border-line», «Orien-tierung», «Ange-hörige», «Unter-stüt-zung», «unter-schied-lich»; kein waagrechter Überlauf |
| Blau 100 unter 24 px auf nicht weisser Fläche | 0 Treffer auf 23 Seiten bei 1280 px |
| Kontraste (berechnet) | Blau 125 auf `--ui-wash` 5,79:1; Blau 100 dort 4,28:1 |

**Nicht geprüft:** automatische Silbentrennung mit deutschem Trennmuster in Chrome, Firefox und Safari (nur weiche Trennstellen messbar), reale Geräte, Screenreader, Theme «kontrast» (von dieser Website nicht angeboten).

## Bildschirmfotos

`startseite-320-100prozent.png`, `startseite-320-200prozent.png`, `startseite-375-100prozent.png`, `startseite-375-200prozent.png` (erster Bildschirm), `titel-<seite>-<breite>-<100|200>prozent.png` für index, verstehen, diagnose, unterstuetzung, genesung. Weitere Messdaten: `BROWSER.json` des Layouttests (lokal unter `dist/`-Ausgabe, nicht versioniert).

## Nachprüfung

Eine Nachprüfung durch eine Sitzung, die nicht gebaut hat, wird im Pull Request beauftragt (wie bei PR #708). Ihr Ergebnis wird hier unter `NACHPRUEFUNG.md` abgelegt. Merge und Veröffentlichung nur auf Auftrag von Christa Egger.
