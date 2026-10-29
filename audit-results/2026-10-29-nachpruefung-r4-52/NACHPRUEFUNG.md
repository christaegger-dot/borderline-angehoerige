# Nachprüfung r4-52 · 29.10.2026

## Auftrag, Stand, Prüfende

- **Auftrag von Christa Egger, 29.10.2026:** «Nachprüfung r4-52 starten».
- **Gegenstand:** alle Änderungen von `5e0ad1a` (r4-51) bis `d8d78f5` (r4-52, Merge von PR #741). Geprüft ist der Stand auf `main` = `6116aff`. Seit `d8d78f5` hat sich an `authoring/` und `site/` nichts geändert (`git diff --stat d8d78f5 6116aff -- authoring site` ist leer).
- **Selbstbericht der bauenden Sitzung:** `audit-results/2026-10-29-n49-1-n51-1-r4-52/BERICHT.md`.
- **Prüfende:** eine Claude-Sitzung, die an r4-52 nicht gebaut hat. Sie hat keine Inhalte und keinen Code geändert. Sie committet nur diesen Ordner.
- **Umgebung:** Node 22.22.0, Chromium mit Playwright (global, `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`), axe-core 4.14.0 in einem eigenen Ordner ausserhalb des Repositorys, per `page.addScriptTag` geladen. Vergleichsstände als `git worktree` ausserhalb des Repositorys: `5e0ad1a` (r4-51), `d84c144` (r4-48), `d8d78f5` (r4-52). `site/` wurde nie beschrieben.
- **Prüfskripte:** im Unterordner `skripte/` dieses Ordners. Sie lesen nur, schreiben nicht ins Repository.

## Ergebnis in Kürze

N49-1 und N51-1 sind so umgesetzt, wie der Selbstbericht sagt. Die Kennzahlen stimmen nachgerechnet. Kein Wortlaut ist geändert. Die Tests sind verschärft, keiner ist abgeschwächt.

Es gibt drei neue Befunde, keiner blockierend:

| Befund | Schweregrad | Kurz |
|---|---|---|
| N52-1 | wichtig | Zwischen 62 rem (992 px) und etwa 1160 px schiebt das breite Titelbild die Sicherheitskarte aus dem ersten Bildschirm, z. B. bei 1024 × 768 (iPad quer). Seit r4-49, durch r4-52 nicht verändert |
| N52-2 | gering | Fehlen auf einer Seite die Zeile «Direkteinstiege» **und** die Einträge im Menü, meldet das Gate nichts |
| N52-3 | gering | Die neue Layoutprobe prüft nur 390 × 844 und nur, ob die Karte *beginnt*. Sie wartet nicht auf `document.fonts.ready` |

**Empfehlung: «Nachbesserung nötig, ohne Blocker».**

## Befunde

### N52-1 · wichtig · Sicherheitskarte bei 992 bis etwa 1160 px nicht im ersten Bildschirm

**Ort:** `authoring/css/site.css:954–959` (Zweispaltenlage ab 62 rem). Das Titelbild steht dort in der rechten Spalte. Titel und Einleitung bekommen nur die halbe Breite und umbrechen auf mehr Zeilen, der Einstieg wird höher.

**Beleg:** oberer und unterer Rand von `.bl-paths-cards li:first-child` («Ich sorge mich um Sicherheit …»), Startseite, Standardschrift (`skripte/messung.cjs`):

| Fenster | r4-48 (ohne Titelbild) | r4-51 | r4-52 |
|---|---|---|---|
| 1024 × 768 | 724–841, angeschnitten | 842–959, nicht sichtbar | 842–959, nicht sichtbar |
| 1112 × 834 | 726–843, angeschnitten | – | 844–961, nicht sichtbar |
| 1120 × 800 | – | – | 845–961, nicht sichtbar |
| 1150 × 800 | – | – | 811–928, nicht sichtbar |
| 1160 × 800 | – | – | 760–876, angeschnitten |
| 1180 × 820 | 728–844, angeschnitten | – | 728–844, angeschnitten |
| 1280 × 800, 1366 × 768 | 686 bzw. 688, angeschnitten | – | gleich wie r4-48 |

- Der Effekt ist derselbe wie bei N49-1, nur bei anderen Breiten. Bei 1024 × 768 rückt die Karte um 118 px nach unten und ist nicht mehr zu sehen. Mit r4-48 war sie noch angeschnitten.
- r4-52 ändert daran nichts, und das ist so entschieden: «Ab 62 rem steht es unverändert rechts». Der Selbstbericht hat 1024 × 768 aber nicht gemessen. Seine Tabelle nennt 390, 768, 375, 320 und 1440 px.
- Bildschirmfotos: `startseite-1024x768-r4-48.png`, `startseite-1024x768-r4-52.png`. Auf r4-52 endet der erste Bildschirm mit der Überschrift «Was beschäftigt Sie im Moment?».

**Am Rand:** Mit 200 % Schrift erscheint das breite Titelbild erst ab 1984 px Fensterbreite. Dort ist es 928 × 557 statt 480 × 288 gross (`max-width:none` in `site.css:957`), und die Karte rückt von 1177 auf 1413 px. Das kommt selten vor und ist hier nur vermerkt.

**Vorschlag:** Gestaltungsentscheid von Christa Egger. Zum Beispiel könnte die Schwelle für das Titelbild höher liegen (etwa 75 rem), oder es bleibt bewusst so. Gilt eine neue Schwelle, sollte die Layoutprobe auch 1024 × 768 prüfen. Nicht selbst behoben.

### N52-2 · gering · Gate merkt nicht, wenn alle Direkteinstiege einer Seite fehlen

**Ort:** `authoring/tools/contract.js:513–514`. Die neue Bedingung `needsMenuUtility` setzt voraus, dass die Seite die Zeile `<nav aria-label="Direkteinstiege">` hat. Ob die Zeile selbst vorhanden ist, prüft keine Regel. `utility-nav` (`contract.js:319–329`) prüft nur die Konfiguration.

**Beleg:** eigene Mutation über `C.gate` (`skripte/gatemut.mjs`), Ausgabe auf r4-52:

```
index: Zeile «Direkteinstiege» entfernt und Einträge entfernt | angewendet=true | Blocker=0 | nav=0
```

Auf dieser Seite gäbe es «Kurz und klar», «Nachschlagen» und «Suchen» dann bei keiner Breite. Das Gate bliebe trotzdem grün. Der Renderer erzeugt Zeile und Menüeinträge aus derselben Konfiguration (`contract.js:204` und `208`). Der Fall entsteht nur, wenn der Renderer geändert wird. Er bestand schon in r4-51 und ist kein Rückschritt.

**Vorschlag:** Bei der nächsten Arbeit am Seitenrahmen mitnehmen. Die Zeile «Direkteinstiege» sollte auf jeder veröffentlichten Seite ausser der 404-Seite Pflicht sein und genau `utilityNav` entsprechen, dazu ein Selbsttestfall.

### N52-3 · gering · Neue Layoutprobe ist schmal

**Ort:** `authoring/tools/layouttest.cjs:46`, Probe «safety card starts in first screen 390x844».

- Die Probe verlangt nur, dass der obere Rand vor 844 px liegt. Auf r4-52 sind 61 px der Karte zu sehen (783–990 px), die Karte ist angeschnitten. Das entspricht dem Zustand von r4-48. Der Selbstbericht («783 px, sichtbar») meint «beginnt im ersten Bildschirm», nicht «ganz sichtbar».
- Die Probe prüft nur 390 × 844. Ein Rückschritt bei 768 × 1024, wo die Karte jetzt ganz sichtbar ist (743–915 px), oder bei 1024 × 768 (N52-1) fiele nicht auf.
- Anders als die Hauptschleife (`layouttest.cjs:16`) wartet die Probe nicht auf `document.fonts.ready`. In meinen Läufen war das Ergebnis stabil. Kommt eine Schrift aber spät, misst die Probe vor dem endgültigen Umbruch.

**Vorschlag:** Bei der nächsten Arbeit am Layouttest `await p2.evaluate(() => document.fonts.ready)` ergänzen und 768 × 1024 mit «ganz sichtbar» aufnehmen. Je nach Entscheid zu N52-1 auch 1024 × 768.

## Bestätigt

### 1 · Diff vollständig

`git diff --stat 5e0ad1a d8d78f5`: 36 Dateien. In `authoring/` sind es vier:

- `authoring/css/site.css` (+4/−1): eine neue Regel `@media (max-width:61.99rem){.bl-titelbild{display:none}}` (`site.css:944`) und zwei Kommentare.
- `authoring/site.config.json` (+4/−4): `assetVersion`, `pendingScope`, `independentReviewWaiver.version`, `appliedTo` auf r4-52.
- `authoring/tools/contract.js` (+7/−3): `BUILD`, die Regel `needsMenuUtility` und ein neuer Fall in `MUTATIONS` (`contract.js:651`).
- `authoring/tools/layouttest.cjs` (+1/−1): eine Probe in der vorhandenen Zeile 46 eingefügt, sonst nichts verändert.

In `site/` sind 24 HTML-Dateien je mit 3 Zeilen geändert: `data-puk-site-build`, `site.css?v=` und `interaktion.js?v=`. Dazu `site/css/site.css` mit derselben Änderung wie `authoring/css/site.css`. Das zeigt `git diff 5e0ad1a d8d78f5 -- site/*.html | grep '^[-+][^-+]'`: nach Ersetzen der Versionsnummer nur diese drei Zeilenarten.

Unverändert ist laut `git diff --stat 5e0ad1a d8d78f5 -- …` (leere Ausgabe):

- `authoring/content/`
- `authoring/js/`
- `authoring/tests/` mit `suche-ersttreffer.tsv`
- `search-index.mjs`, `selftest.mjs`, `suchtest.mjs`, `sprachtest.mjs`, `build.mjs`, `wortbilanz.mjs`
- `site/js/interaktion.js`

**Wortlaut:** Ich habe Tags, Skripte und `&shy;` entfernt und alle Fragmente in `authoring/content/` sowie alle Seiten in `site/` von r4-51 und r4-52 verglichen (`skripte/text.mjs`):

```
48 Dateien verglichen, 0 Textabweichungen; r4-52 site/: data-responsibility-inline=6, tel:144=6, tel:117=6, id-Attribute=472
```

Die Zahl der Akuthinweise (`data-responsibility-inline`) und der Links `tel:144` und `tel:117` ist je Datei gleich. Auch die Liste aller `id`-Attribute, also die Sprungziele, ist je Datei gleich (keine Meldung «ZÄHLUNG ABWEICHT»).

### 2 · N49-1, Titelbild unter 62 rem ausgeblendet

Messung `skripte/messung.cjs`, Startseite, r4-51 gegen r4-52, Karte = `.bl-paths-cards li:first-child`:

| Fenster | Schrift | r4-51 Karte | r4-51 Titelbild | r4-52 Karte | r4-52 Titelbild |
|---|---|---|---|---|---|
| 320 × 568 | 100 % | 1091–1350, nicht sichtbar | Band 280 × 70 | 989–1248, nicht sichtbar | 0 × 0, `display:none` |
| 375 × 667 | 100 % | 960–1168, nicht sichtbar | Band 335 × 84 | 844–1052, nicht sichtbar | 0 × 0 |
| 390 × 844 | 100 % | 902–1110, nicht sichtbar | Band 350 × 88 | **783–990, angeschnitten** | 0 × 0 |
| 768 × 1024 | 100 % | 895–1067, angeschnitten | Band 480 × 120 | **743–915, ganz sichtbar** | 0 × 0 |
| 1024 × 768 | 100 % | 842–959, nicht sichtbar | breit 447 × 268 | 842–959, nicht sichtbar | breit 447 × 268 |
| 1440 × 900 | 100 % | 690–806, ganz sichtbar | breit 480 × 288 | 690–806, ganz sichtbar | breit 480 × 288 |
| 991 × 800 | 100 % | 876–992 | Band 480 × 120 | 724–840 | 0 × 0 |
| 992 × 800 | 100 % | 842–958 | breit 432 × 259 | 842–958 | breit 432 × 259 |
| 1440 × 900 | 200 % | 1182–1389 | Band 480 × 120 | 1030–1237 | 0 × 0 |
| 1983 × 900 | 200 % | – | – | 1177–1348 | 0 × 0 |
| 1984 × 900 | 200 % | – | – | 1413–1584 | breit 920 × 552 |

- Die Zahlen des Selbstberichts für 320, 375, 390, 768 und 1440 px stimmen auf den Pixel.
- Die Schwelle liegt genau bei 62 rem: bei 16 px Schrift zwischen 991 und 992 px, bei 200 % Schrift (32 px) zwischen 1983 und 1984 px. Das Titelbild ist also auch mit 200 % Schrift ab 62 rem sichtbar und darunter ausgeblendet.
- Waagrechtes Scrollen gibt es in keinem der 2 × 16 Zustände: `scrollWidth` ist überall gleich `innerWidth`.
- Mein Bildschirmfoto bei 390 × 844 von r4-52 ist byte-gleich mit `audit-results/2026-10-29-n49-1-n51-1-r4-52/startseite-erster-bildschirm-390x844-r4-52.png` (`cmp`). Das von r4-51 ist byte-gleich mit dem r4-49-Foto der Nachprüfung r4-47 bis r4-49.
- Bei erzwungenen Farben und im Druck bleibt das Titelbild ausgeblendet (`site.css:961–962`, unverändert).

**Die Layoutprobe greift.** Ich habe die Fassung von r4-52 (`layouttest.cjs`) gegen die r4-51-Site laufen lassen, im Worktree `5e0ad1a`:

```
Audit-04-Layouttest: 240 Seitenzustände, 26 Bedienproben, 2 Abweichungen.
tension core exceeds 1800px
safety card starts in first screen 390x844
{ test: 'safety card starts in first screen 390x844', ok: false }
```

Gegen r4-52 meldet sie nur die bekannte Ausnahme B2c, die Probe ist `ok: true`.

### 3 · N51-1, Gate bei fehlenden Direkteinstiegen im Menü

Eigene Mutationen über `C.gate` (`skripte/gatemut.mjs`, Modus `draft`), je r4-51 und r4-52:

| Mutation | r4-51 | r4-52 |
|---|---|---|
| Ausgangsstand | 0 Blocker | 0 Blocker |
| index: alle drei Menüeinträge entfernt | **0 Blocker** | **1 × `nav`** |
| alle 23 Seiten mit Menüeinträgen: alle entfernt | **0 Blocker** | **23 × `nav`** |
| index: nur «Suchen» entfernt | 1 × `nav` | 1 × `nav` |
| index: «Kurz und klar» zeigt auf `verstehen.html` | 1 × `nav` | 1 × `nav` |
| index: Reihenfolge vertauscht | 1 × `nav` | 1 × `nav` |
| index: Klasse `puk-site-menu__utility-link` entfernt (Einträge als Hauptpunkte) | 1 × `nav` | 2 × `nav` |
| 404-Seite unverändert (Menü, keine Zeile «Direkteinstiege») | 0 Blocker | 0 Blocker |
| 404-Seite: drei richtige Einträge ins Menü eingefügt | 0 Blocker | 0 Blocker |
| index: Menü (`data-puk-disclosure`) und Einträge entfernt | 1 Blocker, nicht `nav` | 1 Blocker, nicht `nav` |
| index: Zeile «Direkteinstiege» und Einträge entfernt | 0 Blocker | 0 Blocker (→ N52-2) |
| `utilityNav` leer, Menü unverändert | 24 Blocker, davon 23 × `nav` | gleich |

- Es gibt keine Falsch-Positiven. Der Ausgangsstand und die 404-Seite bleiben ohne Blocker. Das Gate in `build.mjs --production` meldet weiterhin 24 Seiten · 0 Blocker.
- **Der neue Selbsttestfall wirkt.** Ich habe die Bedingung im Worktree `d8d78f5` auf die alte Fassung `if (menuUtility.length && …` zurückgesetzt:
  ```
  FAIL | Direkteinstiege im Menü fehlen (r4-52, N51-1) | erwartet: nav | erhalten: crisis-number-check
  Selbsttest: 87/88 bestanden
  ```
  Mit der Regel von r4-52 sind es 88/88. Danach habe ich den Worktree mit `git checkout` zurückgesetzt.
- Die Regex der Mutation (`/\n<li class="puk-site-menu__utility">[\s\S]*?<\/li>/g`) trifft die drei Einträge in `site/index.html:30–32`. Jeder Eintrag beginnt auf einer eigenen Zeile.

### 4 · Tests und Gate: abgeschwächt, gleichwertig oder verschärft?

| Datei | Änderung | Urteil |
|---|---|---|
| `selftest.mjs` | keine | gleichwertig |
| `contract.js` (Selbsttestfälle `MUTATIONS`) | ein Fall dazu, keiner entfernt oder geändert (r4-51 87/87, r4-52 88/88) | verschärft |
| `contract.js` (Gate-Regel `nav`) | Bedingung erweitert; die bisherige Bedingung bleibt als Teil erhalten | verschärft |
| `layouttest.cjs` | eine Bedienprobe dazu (25 → 26), Prüfungen und Schwellen sonst unverändert | verschärft (Umfang siehe N52-3) |
| `sprachtest.mjs` | keine | gleichwertig |
| `suchtest.mjs` | keine | gleichwertig |

### 5 · Barrierefreiheit

axe-core 4.14.0 mit den Regelsätzen wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa und best-practice, auf allen 24 Seiten (`skripte/axe.cjs`):

```
100 % 390px: 24 Läufe, 0 Verstösse
100 % 1280px: 24 Läufe, 0 Verstösse
200 % 320px Menü offen 24/24: 24 Läufe, 0 Verstösse
200 % 1440px Menü offen 24/24: 24 Läufe, 0 Verstösse
```

Barrierefreiheitsbaum der Startseite bei 390 und 1440 px (`skripte/aria.cjs`, Playwright `ariaSnapshot`):

- **Landmarks:** `banner` mit `navigation "Hauptnavigation"` und `navigation "Direkteinstiege"`, dazu `main` und `contentinfo`.
- **Überschriften:** eine Überschrift der Ebene 1, «Borderline – Orientierung für Angehörige». Darunter vier Regionen mit Ebene 2: «Was beschäftigt Sie im Moment?», «Mitgefühl und Selbstschutz gehören zusammen», «Ich möchte etwas verstehen oder nachschlagen», «Beratung für Sie». Im Fuss «Kontakt» und «Fachstelle Angehörigenarbeit».
- **Bild:** Das einzige Bild im Baum ist das Logo, `img "Psychiatrische Universitätsklinik Zürich"`. Das Titelbild fehlt im Baum, auch bei 1440 px, wo es sichtbar ist. Es hat `aria-hidden="true"`, beide SVG haben `focusable="false"`, und es gibt darin keine fokussierbaren Elemente.

### 6 · Tests selbst ausgeführt (Stand `6116aff`, gleich `d8d78f5` für `authoring/` und `site/`)

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site`, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/`, Exit 0 |
| `node authoring/tools/selftest.mjs` | `Selbsttest: 88/88 bestanden`, Exit 0 |
| `node authoring/tools/suchtest.mjs dist/site` | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| `node authoring/tools/sprachtest.mjs` | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| `node authoring/tools/layouttest.cjs` | `240 Seitenzustände, 26 Bedienproben, 1 Abweichungen.` mit `tension core exceeds 1800px` (bekannte Ausnahme B2c), Exit 1 |

Danach war `git status --short` leer. `dist/` steht in `.gitignore`.

### 7 · Live-Site (Hinweis, keine Prüfstufe)

`curl -sS https://borderline-angehoerige.netlify.app/` am 29.10.2026, 22:28 UTC:

- HTTP 200 mit `data-puk-site-build="r4-52"`.
- `site.css?v=r4-52` enthält `@media (max-width:61.99rem){.bl-titelbild{display:none}}`.

## Nicht prüfbar

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack). Geprüft habe ich nur den Barrierefreiheitsbaum von Chromium.
- Safari (auch iOS mit Textgrösse), Firefox, Edge.
- Reale Geräte. Alle Masse stammen aus Chromium-Fenstergrössen und gelten nicht für die Browserleisten echter Handys und Tablets.
- 200 % Schrift über die Zoomfunktion des Betriebssystems statt über die Chromium-Grundschrift.
- Fachliche, rechtliche und institutionelle Freigaben. Es gibt keine neuen Inhalte.

## Empfehlung

**«Nachbesserung nötig, ohne Blocker».**

- N49-1 und N51-1 sind wirksam behoben, ohne Rückschritt und ohne Änderung am Wortlaut.
- N52-1 braucht einen Gestaltungsentscheid von Christa Egger: Soll das Titelbild zwischen 62 rem und etwa 1160 px bleiben?
- N52-2 und N52-3 sind gering und können bei der nächsten Arbeit am Seitenrahmen und am Layouttest mitgehen.
- Weiter offen aus früheren Nachprüfungen sind N49-2 (Bestätigung durch Christa Egger), N51-2 (gering, keine Änderung nötig) und die Prüfung mit echtem Screenreader.
