# Nachprüfung r4-57 · 29.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag von Christa Egger, 29.10.2026:** «Nachprüfung r4-57 starten».
- **Gegenstand:** die Änderungen von r4-57 gegenüber r4-56, also `git diff 3780ee5 5226917` (Merge von [PR #756](https://github.com/christaegger-dot/borderline-angehoerige/pull/756), gemergt am 29.10.2026, 23:26 UTC). r4-55 und r4-56 selbst sind nicht Gegenstand.
- **Selbstbericht der bauenden Sitzung:** `audit-results/2026-10-29-n54-1-n54-2-r4-57/BERICHT.md`. Er setzt N54-1 und N54-2 aus `audit-results/2026-10-29-nachpruefung-r4-54/NACHPRUEFUNG.md` um.
- **Wer prüft:** eine Claude-Sitzung, die an r4-57 nicht gebaut hat. Sie hat keine Inhalte und keinen Code geändert und committet nur diesen Ordner. `site/` ist nicht beschrieben worden (`git status --short` leer nach allen Läufen; `dist/` ist ignoriert).
- **Umgebung:** Node 22.22.0, Chromium mit Playwright global (`PLAYWRIGHT_MODULE=$(npm root -g)/playwright`), axe-core 4.14.0 in einem eigenen Ordner ausserhalb des Repositorys. Den Stand r4-56 habe ich mit `git archive 3780ee5` ausserhalb des Repositorys entpackt, ebenso r4-57 (`5226917`).

## Ergebnis

**Empfehlung: «Nachbesserung nötig, ohne Blocker».**

N54-1 und N54-2 sind behoben. Die Seiten ändern sich nur in der Build-Kennung. Alle Tests laufen wie berichtet. Es bleiben zwei geringe Befunde: falsche Versionsangabe in Kommentaren und Testnamen (N57-1) und eine Lücke der Regel bei verborgener Zeile oder abweichendem zugänglichem Namen (N57-2). Beides kann bei der nächsten Arbeit am Prüfwerkzeug mitgehen.

## Befunde

### N57-1 · gering · Kommentare und Selbsttestfälle nennen «r4-55» statt «r4-57»

- **Ort:** `authoring/tools/contract.js:24`, `:511`, `:534` (Kommentare) und `:676–679` (Namen der vier neuen Selbsttestfälle).
- **Beleg:** `grep -n 'r4-55' authoring/tools/contract.js` ergibt sechs Treffer, z. B.
  - `24:/* r4-55 (Nachprüfung N54-2): Direkteinstiege an einer Stelle berechnet, …`
  - `676:  ['Beschriftung eines Direkteinstiegs weicht ab (r4-55, N54-1)', …`
  - Ausgabe des Selbsttests: `PASS | Zeile der Direkteinstiege doppelt (r4-55, N54-1) | …`
- **Warum es zählt:** r4-55 ist auf `main` die Absenderzeile 16 px (PR #753). Der Selbstbericht sagt selbst, dass der Stand nur im ersten Entwurf r4-55 hiess. Wer später über die Versionsangabe im Code den Nachweis sucht, landet beim falschen Bericht (`audit-results/2026-10-29-absender-r4-55/`).
- **Vorschlag:** bei der nächsten Änderung an `contract.js` die sechs Stellen auf «r4-57» setzen. Keine Wirkung auf Seiten oder Prüfergebnis.

### N57-2 · gering · Verborgene Zeile und abweichender zugänglicher Name bleiben ohne Blocker

- **Ort:** `authoring/tools/contract.js:513–525` (Regel `utility-nav`) und `:535–537` (Menüregel).
- **Beleg:** eigene Mutationen über `C.gate` auf `index.html` (Tabelle unten, M15, M16, M16b): `aria-label="Mehr"` auf dem Link «Kurz und klar», `aria-hidden="true"` auf der Zeile und `hidden` auf der Zeile ergeben mit r4-57 **keinen** Blocker. Die Regel vergleicht den Textinhalt (`norm(txt(a))`, `:514`), nicht den zugänglichen Namen und nicht, ob die Zeile verborgen ist.
- **Einordnung:** Der Auftrag N54-1 verlangte Beschriftung, Lage und Anzahl; das ist erfüllt. Die Lücke ist neu benannt, nicht übersehen. Der Renderer erzeugt keines dieser Attribute; ein Fehler entstünde nur durch einen künftigen Eingriff in den Renderer. Mit `aria-hidden` wären die Direkteinstiege für Screenreader weg, mit einem anderen `aria-label` wiche der zugängliche Name von der sichtbaren Beschriftung ab (WCAG 2.5.3).
- **Vorschlag:** nicht dringend. Bei Gelegenheit in beiden Regeln `aria-label`, `aria-hidden` und `hidden` auf Zeile und Links ausschliessen, mit je einem Selbsttestfall. Alternativ die Beschreibung in Pendenzen und Bericht präzisieren («Textinhalt der Links»).

## Was bestätigt ist

### 1. Diff vollständig

`git diff --stat 3780ee5 5226917` (28 Dateien, 208 +, 92 −):

- `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (31 Zeilen), `audit-results/2026-10-29-n54-1-n54-2-r4-57/BERICHT.md` (neu, 69 Zeilen)
- `authoring/site.config.json` (8 Zeilen), `authoring/tools/contract.js` (48 Zeilen)
- 24 Seiten in `site/` (je 6 Zeilen)

**Unverändert** (leere Ausgabe von `git diff --stat 3780ee5 5226917 -- authoring/content authoring/css authoring/js authoring/tests authoring/tools/selftest.mjs authoring/tools/layouttest.cjs authoring/tools/sprachtest.mjs authoring/tools/suchtest.mjs authoring/tools/build.mjs site/css site/js`):

- Fragmente, also Wortlaut, Akuthinweise und Sprungziele
- Stylesheet und Skript (Quelle und `site/`)
- Suche und `authoring/tests/suche-ersttreffer.tsv`
- alle vier Testskripte und `build.mjs`

**`site.config.json`:** Ein Vergleich der Schlüssel (Python, `json.loads` beider Stände) zeigt Unterschiede nur in `assetVersion` und `releaseApproval`. Im Einzelnen:
- `assetVersion` und `releaseApproval.independentReviewWaiver.version`: «r4-56» → «r4-57»;
- `pendingScope` und `appliedTo`: je ein vorangestellter bzw. angehängter Eintrag zu r4-57;
- `$comment` ist gleich lang und gleich (3676 Zeichen, gemeinsames Präfix 3676).
- `utilityNav` und die Seitenliste sind unverändert.

**`contract.js`:**
- `BUILD` ist «r4-57».
- Neu sind `utilityEntriesOf` und `utilityLabel` (`:24–32`).
- Der Renderer ruft `utilityEntriesOf(cfg)` auf (`:208`) statt der eigenen Berechnung.
- Die Regel `utility-nav` ist neu gefasst (`:510–525`), ebenso die Menüregel (`:534–537`).
- Dazu kommen vier neue Einträge in `MUTATIONS` (`:676–679`).
- Sonst nichts.

**Seiten in `site/`:** Je Seite habe ich den Stand von `3780ee5` gegen `5226917` verglichen (`diff`), nachdem «r4-56» und «r4-57» durch dieselbe Kennung ersetzt waren. Ergebnis: 24 Seiten, 0 Abweichungen. Geändert sind je Seite nur `data-puk-site-build` sowie `?v=` an Stylesheet und Skript.

**Renderer-Umbau ohne Wirkung:** Ich habe `renderPage` aus r4-56 und r4-57 mit derselben Konfiguration und denselben Fragmenten verglichen, nach Ersetzen der Build-Kennung. In allen sieben Varianten weicht keine Seite ab:

| Variante | Seiten | abweichend |
|---|---|---|
| Bestand | 24 | 0 |
| ohne `utilityNav` | 24 | 0 |
| `utilityNav` leer | 24 | 0 |
| Eintrag ohne `label` | 24 | 0 |
| Ziel `fragen` als Entwurf | 23 | 0 |
| ohne `utilityNav`, `suche` als Entwurf | 23 | 0 |
| Beschriftung «Kurz & <klar>» | 24 | 0 |

### 2. Gate-Regeln mit eigenen Mutationen

So bin ich vorgegangen:
- Jede Mutation läuft über `C.gate` im Modus `production`, mit `PRUEFBERICHT.md` als `report` und `exists` wie in `build.mjs`.
- Eingabe sind die gerenderten Seiten, wie `build.mjs` sie dem Gate gibt (`C.renderPage`).
  - `site/404.html` ist nach dem Export auf Wurzelpfade umgeschrieben. Als Gate-Eingabe ergibt sie deshalb vier Fremdblocker, die nichts mit dieser Regel zu tun haben.
- Bestand: 0 Blocker, 20 Hinweise, in beiden Ständen.
- Gezählt sind nur neue Blocker.
- Konfigurationsmutationen sind neu gerendert, wo angegeben.

| Nr. | Mutation | r4-56 | r4-57 |
|---|---|---|---|
| M0 | Bestand | keiner | keiner |
| M1 | Zeile: «Kurz und klar» → «Mehr» (index) | keiner | 1 × `utility-nav` «weichen vom Seitenvertrag ab» |
| M1b | Zeile: «Suchen» → «Suche» (kurz) | keiner | 1 × `utility-nav` |
| M2 | Menü: «Kurz und klar» → «Mehr» | keiner | 1 × `nav` «im Menü weichen … ab» |
| M3 | Zeile doppelt, hintereinander | keiner | 1 × `utility-nav` «steht 2-mal auf der Seite» |
| M3b | Zeile doppelt, Kopie in der Fusszeile | keiner | 1 × `utility-nav` «2-mal» |
| M4 | Zeile in `main` verschoben | keiner | 1 × `utility-nav` «steht nicht im Kopf (.puk-site-subbar)» |
| M5 | Zeile in die Fusszeile verschoben | keiner | 1 × `utility-nav` «nicht im Kopf» |
| M5b | Zeile im `header`, aber ausserhalb `.puk-site-subbar` | keiner | 1 × `utility-nav` «nicht im Kopf» |
| M5c | Zeile auf allen 23 Seiten in der Fusszeile | keiner | 23 × `utility-nav` «nicht im Kopf» |
| M6 | Zeile fehlt (index) | 1 × «fehlt» | 1 × «fehlt» |
| M6b | Zeile fehlt (grenzen) | 1 × «fehlt» | 1 × «fehlt» |
| M7 | Zeile: Reihenfolge vertauscht | 1 × `utility-nav` | 1 × `utility-nav` |
| M7b | Menü: Reihenfolge vertauscht | 1 × `nav` | 1 × `nav` |
| M7c | Zeile: Beschriftungen zweier Einträge getauscht, Ziele gleich | keiner | 1 × `utility-nav` |
| M8 | `utilityNav` entfernt, neu gerendert (Rückfall) | 23 × `nav` (falsch) | **keiner** |
| M9 | wie M8, Rückfallzeile auf index entfernt | 23 × `nav` (falsch), Zeile ungeprüft | 1 × `utility-nav` «fehlt» |
| M9b | wie M8, Rückfall-Menüeintrag «Suche» statt «Website durchsuchen» | 23 × `nav` (falsch) | 1 × `nav` |
| M9d | wie M8, Rückfallzeile «Suche» statt «Website durchsuchen» | 23 × `nav` (falsch) | 1 × `utility-nav` |
| M9c | wie M8, Rückfall-Menüeintrag entfernt | 22 × `nav` (falsch) | 1 × `nav` «leer statt Website durchsuchen» |
| M10 | Fehlerseite: Zeile in den Kopf von 404 eingefügt | 1 × `nav` | 1 × `nav` |
| M11b | Zeile: «Nach&amp;shy;schlagen» als Entität im HTML | keiner | 1 × `utility-nav` (siehe Hinweis) |
| M12 | Zeile: Leerraum «␣␣Kurz⏎ und␣␣␣klar␣» | keiner | keiner |
| M12b | Zeile: «Kurz&amp;nbsp;und klar» | keiner | keiner |
| M12c | Zeile: Beschriftung teilweise in `<span>` | keiner | keiner |
| M13 | Konfiguration: `label` «Kurzfassung», Seiten nicht neu gerendert | keiner | 23 × `utility-nav` und 23 × `nav` |
| M13b | wie M13, neu gerendert | keiner | keiner |
| V1 | Konfiguration: `label` «Kurz & <klar>», neu gerendert | keiner | keiner |
| V2 | Konfiguration: `label` mit Leerraum, neu gerendert | keiner | keiner |
| V3 | Konfiguration: `label` mit U+00AD («Nach­schlagen»), neu gerendert | keiner | keiner |
| V4 | Ziel `fragen` als Entwurf, neu gerendert | Konfig.-Blocker | gleich wie r4-56 |
| M14 | Zeile: vierter Eintrag | 1 × `utility-nav` | 1 × `utility-nav` |
| M15 | `aria-label="Mehr"` auf erstem Link | keiner | **keiner** (N57-2) |
| M16 | `aria-hidden="true"` auf der Zeile | keiner | **keiner** (N57-2) |
| M16b | `hidden` auf der Zeile | keiner | **keiner** (N57-2) |
| M17 | zweite, leere `nav aria-label="Direkteinstiege"` in `main` | keiner | 1 × «2-mal» |
| M18 | Kopfzeile leer, volle Zeile in `main` | 1 × «leer statt …» | 2 × (`2-mal` und «weichen ab») |
| M19 | Klasse `puk-site-utility` entfernt, Lage gleich | keiner | keiner |

**Ergebnis:**
- Alle verlangten Fälle blockieren mit r4-57:
  - Beschriftung in Zeile und Menü;
  - Zeile doppelt;
  - Zeile in `main` und in der Fusszeile;
  - Zeile fehlt;
  - Reihenfolge vertauscht;
  - Rückfall ohne `utilityNav` und Rückfallzeile entfernt.
- **Keine Falsch-Positiven:**
  - beim Bestand;
  - beim Rückfall (M8; die 23 falschen Blocker von r4-56 sind weg);
  - bei Leerraum und geschütztem Leerzeichen;
  - bei verschachteltem Markup;
  - bei Sonderzeichen, Leerraum oder U+00AD in der Konfiguration (V1–V3);
  - auf der Fehlerseite (M0: keine Meldung; die Regel überspringt `role: not-found`, `:516`).
- Die Angabe im Selbstbericht (K1 keiner, K2 «fehlt», M11–M13) stimmt.

**Hinweis zu `&shy;` (kein Befund):**
- Die Entität `&shy;` direkt im HTML einer Beschriftung ergibt einen Blocker (M11b). Dabei ist die sichtbare Beschriftung gleich.
- Grund: `dec` kennt nur `amp`, `lt`, `gt`, `quot`, `apos` und `nbsp` (`contract.js:67`). `&shy;` bleibt deshalb als Text stehen.
- Der Renderer erzeugt diese Entität in Direkteinstiegen nie. `esc` macht aus `&` ein `&amp;`, und U+00AD als Zeichen besteht (V3). `site/` ist generiert, ein Handeingriff ist ausgeschlossen. Deshalb ist das ohne praktische Folge.
- Das gilt für alle Textvergleiche des Gates, nicht erst seit r4-57.

**Hinweis zum Renderer (kein Befund):**
- `renderPage` bildet die Beschriftung weiterhin selbst mit `entry.label || entry.page.title` (`:210`, `:214`). `utilityLabel` (`:32`) nutzt es nicht.
- Beides ist heute gleich (siehe Renderervergleich). Die Berechnung der Beschriftung steht aber noch an zwei Stellen.

**Greifen die vier neuen Selbsttestfälle?**
- Ich habe die vier Einträge aus `contract.js:676–679` in eine Kopie von r4-56 eingesetzt (Regeln von r4-56).
- Ergebnis: `Selbsttest: 89/93 bestanden`. Genau diese vier scheitern, z. B. `FAIL | Zeile der Direkteinstiege doppelt (r4-55, N54-1) | erwartet: utility-nav | erhalten: crisis-number-check`.
- r4-56 unverändert ergibt 89/89.

### 3. Tests und Gate: abgeschwächt, gleichwertig oder verschärft?

- **Testskripte unverändert:** `selftest.mjs`, `layouttest.cjs`, `sprachtest.mjs` und `suchtest.mjs` sind nicht geändert (`git diff --stat` leer). Damit gleichwertig.
- **Regel `utility-nav` verschärft:** Neu geprüft werden Beschriftung, Anzahl und Lage. Ohne `utilityNav` gilt sie jetzt für den Rückfall statt gar nicht. Keine bisher erkannte Mutation fällt weg: M6, M6b, M7, M14 und M18 blockieren weiter.
- **Menüregel verschärft:** Neu geprüft wird die Beschriftung. Sie ist berichtigt für den Rückfall (keine Falschmeldung mehr), und M7b blockiert weiter.
- **Selbsttest verschärft:** 4 Fälle mehr (93 statt 89), keiner entfernt oder gelockert. Alle `MUTATIONS`-Zeilen von r4-56 stehen unverändert in r4-57; der Diff zeigt in `MUTATIONS` nur Zusätze.

### 4. Tests selbst ausgeführt (Stand `5226917`)

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site`, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/`, Exit 0 |
| `node authoring/tools/selftest.mjs` | `Selbsttest: 93/93 bestanden` (93 PASS, 0 FAIL gezählt), Exit 0 |
| `node authoring/tools/suchtest.mjs dist/site` | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0`, Exit 0 |
| `node authoring/tools/sprachtest.mjs` | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0`, Exit 0 |
| `node authoring/tools/layouttest.cjs` | `Audit-04-Layouttest: 240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` mit `tension core exceeds 1800px`, Exit 1 – bekannte Ausnahme B2c, wie in der Nachprüfung r4-54 |

Die 20 Hinweise sind alle `crisis-number-check`, wie in r4-56. Die Kennzahlen des Selbstberichts stimmen.

### 5. Barrierefreiheit (Stichprobe)

- **Vorgehen:** axe-core 4.14.0 per `page.addScriptTag` auf `dist/site`. `dist/site` ist byte-gleich mit `site/` (Parität oben). Die Seiten liefen über einen lokalen Server, Chromium, bei 390 und 1280 px. Regeln: Tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`.
- **Ergebnis:** `axe 4.14.0, build r4-57` · `Läufe: 48 · Seiten: 24 · Verstösse: 0`.

### 6. Live-Site (keine Prüfstufe, nur Hinweis)

`curl -sS https://borderline-angehoerige.netlify.app/ | grep -o 'data-puk-site-build="[^"]*"'` ergibt am 29.10.2026, 23:32 UTC: `data-puk-site-build="r4-57"` (HTTP 200).

### Hinweis zur Pendenzendatei (kein Befund dieser Prüfung)

Auf `5226917` führt die Pendenzendatei r4-57 noch als «nicht gemergt» und r4-55 und r4-56 als Entwurf. PR #753 und PR #756 sind aber gemergt, und die Live-Site liefert r4-57. Die Nachführung liegt bereits in zwei offenen Entwürfen mit gleichem Titel vor: [PR #759](https://github.com/christaegger-dot/borderline-angehoerige/pull/759) und [PR #760](https://github.com/christaegger-dot/borderline-angehoerige/pull/760), Status geprüft am 29.10.2026, 23:33 UTC. Einer davon dürfte überzählig sein. Diese Nachprüfung ändert die Datei nicht.

## Was nicht prüfbar war

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack).
- Safari und Firefox; nur Chromium über Playwright.
- Reale Geräte, Zoom und Systemschrift auf Geräten (der Layouttest simuliert Breiten und Schriftgrössen).
- Wirkung im Netlify-Deployment über die Build-Kennung der Startseite hinaus.
- Fachliche, rechtliche und Sicherheitsfreigaben: nicht Gegenstand, weil kein Wortlaut geändert ist.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.** N57-1 und N57-2 sind gering und können bei der nächsten Arbeit an `contract.js` mitgehen. Für die Veröffentlichung von r4-57 besteht kein Hindernis.
