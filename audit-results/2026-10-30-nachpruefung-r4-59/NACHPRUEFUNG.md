# Nachprüfung r4-59 · 30.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-59 starten».
- **Gegenstand:** die Änderungen von r4-59 auf `main`, also `git diff 84cce4c 0c7d1729`. `0c7d1729` ist der Merge von [PR #769](https://github.com/christaegger-dot/borderline-angehoerige/pull/769), gemergt am 30.10.2026, 06:39:42 UTC. Sein erster Elternteil `84cce4c` ist `main` mit r4-58 und dem Nachtrag zu N54-2 ([PR #768](https://github.com/christaegger-dot/borderline-angehoerige/pull/768)). PR #768 selbst ist nicht Gegenstand.
- **Selbstbericht der bauenden Sitzung:** `audit-results/2026-10-30-n58-1-n58-2-r4-59/BERICHT.md`. Er setzt N58-1 und N58-2 aus `audit-results/2026-10-30-nachpruefung-r4-58/NACHPRUEFUNG.md` um.
- **Wer prüft:** eine Claude-Sitzung, die an r4-59 nicht gebaut hat.
  - **Einschränkung der Unabhängigkeit:** Dieselbe Sitzung hat die Nachprüfung r4-58 verfasst, also die Befunde N58-1 und N58-2 gestellt. r4-59 setzt eine ihrer Angaben um, die sich als falsch herausstellt (siehe N59-1). Die Sitzung prüft hier also auch ihre eigene Vorgabe.
  - Sie hat keine Inhalte und keinen Code geändert und committet nur diesen Ordner.
  - `site/` ist nicht beschrieben worden: `git status --short` war nach allen Läufen leer, `dist/` ist ignoriert.
- **Umgebung:**
  - Node 22.22.0.
  - Chromium 153.0.8010.12 mit Playwright global (`PLAYWRIGHT_MODULE=$(npm root -g)/playwright`).
  - axe-core 4.14.0 in einem eigenen Ordner ausserhalb des Repositorys.
  - Den Stand r4-58 (`84cce4c`) habe ich mit `git archive` ausserhalb des Repositorys entpackt.
- **Beilagen in diesem Ordner:**
  - `mutationen.mjs`: das Prüfskript der Nachprüfung r4-58, erweitert um F1–F21. Aufruf: `node mutationen.mjs <authoring-Ordner>`.
  - `mutationen-ausgabe.txt`: die Ausgabe für r4-58 und r4-59.
  - `aria-hidden-chromium.cjs` und `inert-chromium.cjs`: Abfrage des Zugänglichkeitsbaums von Chromium.
  - `aria-hidden-chromium-ausgabe.txt`: die Ausgabe dieser Abfragen.

## Ergebnis

**Empfehlung: «Nachbesserung nötig, ohne Blocker».**

N58-2 ist behoben. N58-1 ist so umgesetzt, wie die Nachprüfung r4-58 es vorgab: `aria-hidden` in Grossschrift, `inert` und verborgener Linktext blockieren jetzt, und die Falschmeldung bei einem dekorativen Zeichen ist weg. Die vier neuen Selbsttestfälle scheitern mit den Regeln von r4-58 (100/104). Die Seiten ändern sich nur in der Build-Kennung, und alle Tests laufen wie berichtet.

Es bleiben zwei geringe Befunde:
- **N59-1:** Die Vorgabe der Nachprüfung r4-58, dass Chromium `aria-hidden=" true "` nicht verbirgt, ist falsch. Chromium verbirgt bei jedem Wert ausser `false`, `undefined` und leer.
- **N59-2:** Kennzahlen und Status in der Pendenzendatei sind nach dem Merge veraltet.

## Befunde

### N59-1 · gering · `aria-hidden` mit Leerraum oder anderem Wert verbirgt in Chromium, das Gate meldet nichts

- **Ort:**
  - `authoring/tools/contract.js:35–37`: Kommentar «Chromium verbirgt auch «TRUE», aber nicht « true » mit Leerraum» und `hiddenFlag` mit `… .toLowerCase() === 'true'`.
  - Ursprung der falschen Angabe: `audit-results/2026-10-30-nachpruefung-r4-58/NACHPRUEFUNG.md`, N58-1 und Tabelle D8 («Chromium verbirgt die Zeile damit nicht»).
  - Übernommen in `audit-results/2026-10-30-n58-1-n58-2-r4-59/BERICHT.md` (D8 «zu Recht ohne Meldung»), in die Pendenzendatei (Abschnitt r4-59) und in die Beschreibung von PR #769.
- **Beleg:**
  - **Chromium:** `aria-hidden-chromium.cjs` liest den Zugänglichkeitsbaum, den Chromium an Hilfsmittel gibt (`Accessibility.getFullAXTree` über CDP). Getestet ist `<nav aria-label="Direkteinstiege" aria-hidden="…"><a href="a">Kurz und klar</a></nav>`.
    - Verborgen, mit `ignoredReasons: ariaHiddenSubtree`, sind die Werte `"true"`, `"TRUE"`, `"True"`, `"true "`, `" true"`, `" true "`, `"true\t"`, `"yes"`, `"0"`, `"x"`, `"false "` und `" false "`.
    - Sichtbar bleiben nur `"false"`, `"False"`, `"FALSE"`, `"undefined"` und `""`.
  - **Gate:** Mit r4-59 ergeben D8 (`aria-hidden=" true "`) und F4 (`aria-hidden="true "`) keinen Blocker (`mutationen-ausgabe.txt`).
  - **Ursache des Fehlers in N58-1:** Die Nachprüfung r4-58 stützte sich auf Playwrights `locator.ariaSnapshot()`. Das berechnet Playwright selbst, nicht Chromium. Für `"true "`, `" true "`, `"yes"` und `"0"` zeigt `ariaSnapshot` die Zeile als sichtbar, Chromium verbirgt sie (gleiche Ausgabe, rechte Spalte).
- **Einordnung:**
  - Das ARIA-Attribut kennt nur `true`, `false` und `undefined`. Ein ungültiger Wert verbirgt in Chromium trotzdem.
  - Der Renderer setzt an Direkteinstiegen kein `aria-hidden`. Eine Folge hätte die Lücke nur bei einem künftigen Eingriff in den Renderer.
  - Die Lücke ist enger als vor r4-59: Grossschrift ist jetzt abgedeckt. Neu ist aber, dass Kommentar und Nachweise ausdrücklich das Falsche festhalten.
  - Firefox und Safari sind nicht geprüft; sie können anders entscheiden.
- **Vorschlag:** Bei der nächsten Arbeit an `contract.js`:
  - `hiddenFlag` umkehren: als verborgen gilt jedes vorhandene `aria-hidden`, dessen Wert in Kleinschrift nicht `false`, `undefined` oder leer ist. Damit ist die Regel im Zweifel strenger.
  - Den Kommentar `:35–36` berichtigen und einen Selbsttestfall mit `aria-hidden=" true "` aufnehmen.
  - In den Nachweisen r4-58 und r4-59 die Angabe zu D8 als Berichtigung kennzeichnen.

### N59-2 · gering · Selbsttestzahl und Status in der Pendenzendatei veraltet

- **Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` auf `0c7d1729`.
  - `:3` und `:9–11`: «Offener Entwurf: r4-59 … **nicht gemergt**», «Entwurf vom 30.10.2026».
  - Abschnitt r4-59, «Technischer Stand»: «Selbsttest 102/102».
  - Tabelle der Nachprüfung r4-58: N58-1 und N58-2 «in r4-59 … (Entwurf)».
- **Beleg:**
  - PR #769 ist gemergt (`merged: true`, `merged_at: 2026-10-30T06:39:42Z`), und die Live-Site liefert r4-59 aus.
  - `node authoring/tools/selftest.mjs` auf `0c7d1729` ergibt `Selbsttest: 104/104 bestanden`. Grund: PR #768 hat parallel zwei Fälle für den Rückfall ergänzt. `84cce4c` hat 100 Fälle, r4-59 bringt 4 dazu.
  - Die Zahl 102 im Selbstbericht stimmt für den Ausgangsstand `d65a6f3`, nicht für `main`.
- **Vorschlag:** Bei der Nachführung nach dieser Nachprüfung r4-59 als gemergt eintragen und den Selbsttest mit 104 angeben, mit Hinweis auf PR #768. Diese Nachprüfung ändert die Datei nicht.

## Was bestätigt ist

### 1. Diff vollständig

- `git diff --stat 84cce4c 0c7d1729`: 29 Dateien, 210 Zeilen hinzugefügt, 88 entfernt.
- Geändert sind:
  - `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`;
  - `audit-results/2026-10-30-n57-1-n57-2-r4-58/BERICHT.md` (N58-2);
  - `audit-results/2026-10-30-n58-1-n58-2-r4-59/BERICHT.md` (neu);
  - `authoring/site.config.json` und `authoring/tools/contract.js`;
  - 24 Seiten in `site/`.

**Unverändert:** Die Ausgabe dieses Befehls ist leer:

```
git diff --stat 84cce4c 0c7d1729 -- authoring/content authoring/css authoring/js authoring/tools/search-index.mjs authoring/tests authoring/tools/selftest.mjs authoring/tools/layouttest.cjs authoring/tools/sprachtest.mjs authoring/tools/suchtest.mjs authoring/tools/build.mjs site/css site/js site/assets
```

Unverändert sind also:
- Fragmente, also Wortlaut, Akuthinweise und Sprungziele;
- Stylesheet und Skript;
- Suche und `suche-ersttreffer.tsv`;
- die Testskripte und `build.mjs`;
- der Renderer (`renderPage`, nicht im Diff).

**`contract.js`** (ganzer Diff gelesen):
- `BUILD` ist «r4-59» (`:11`).
- Neu sind `hiddenFlag`, das umgebaute `concealed` und `accTxt` (`:35–39`), mit Kommentar «r4-59 (Nachprüfung N58-1)».
- Zeile und Menü vergleichen die Beschriftung mit `accTxt` statt `txt` (`:522`, `:547`).
- Der Wortlaut zweier Meldungen ist um «inert» ergänzt (`:535`, `:552`).
- Vier neue `MUTATIONS`-Zeilen mit «(r4-59, N58-1)» (`:701–704`).
- Sonst nichts.

**`site.config.json`:** Ein Vergleich der Schlüssel mit `json` zeigt genau vier geänderte Werte: `assetVersion`, `independentReviewWaiver.version` (je «r4-59»), `pendingScope` (vorangestellt «r4-59 …») und `appliedTo` (angehängt). `$comment`, `utilityNav` und die Seitenliste sind unverändert. Die Nummerierung ist stimmig.

**N58-2:** `audit-results/2026-10-30-n57-1-n57-2-r4-58/BERICHT.md:40–41` heisst jetzt «39 Läufe … (berichtigt am 30.10.2026, Befund N58-2; vorher hiess es «39 Mutationen»): den Bestand M0 und 38 Mutationen, nämlich die 37 aus der Tabelle der Nachprüfung r4-57 und M11». Das passt zu meiner Zählung (37 Mutationen und M0 in der Tabelle). Die Angabe ist als Berichtigung gekennzeichnet. **Behoben.**

**Seiten in `site/`:** Ich habe alle 35 Dateien verglichen, je mit «r4-58» bzw. «r4-59» → «rX», über `md5sum`. Ergebnis: `Abweichungen: 0 von 35`. Im Diff von `site/` sind genau 72 Vorkommen von «r4-58» durch «r4-59» ersetzt (24 Seiten × 3).

**Merge-Ergebnis stimmig:** Auf `0c7d1729` ergibt `node authoring/tools/build.mjs --production --verify-site` die Ausgabe `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/`. Der Merge von PR #768 und PR #769 hat also keinen widersprüchlichen `site/`-Stand erzeugt.

### 2. Gate-Regeln mit eigenen Mutationen

Das Vorgehen ist wie in der Nachprüfung r4-58: `C.renderPage`, `C.gate` im Modus `production`, `report` und `exists` wie in `build.mjs:44–58`. Gezählt sind neue Befunde gegenüber dem Bestand. Bestand: in beiden Ständen 0 Blocker, 20 Hinweise. Die volle Ausgabe steht in `mutationen-ausgabe.txt`.

**Fälle der Nachprüfung r4-58 (A1–E3):**
- **Neu blockiert:** D1 (`aria-hidden="TRUE"`), D2 (`inert`) und D5 (Linktext in `<span aria-hidden="true">`, Meldung «weichen vom Seitenvertrag ab: (kurz.html)»).
- **Bei A1–A12, C7, C8, D6 und D7** ändert sich nur der Wortlaut der Meldung (neu mit «inert»).
- **Alle übrigen Fälle sind gleich:**
  - A13–A16 (`aria-hidden="false"`): keiner;
  - B1–B7 (`aria-label` und `aria-labelledby`): wie r4-58;
  - C1–C6 (Fälle von r4-57): wie r4-58;
  - D3 (`display:none`), D4 (`role="presentation"`) und D9 (Fehlerseite): wie r4-58;
  - D8 (`aria-hidden=" true "`): keiner, siehe N59-1;
  - E1 (Rückfall ohne `utilityNav`): 0 Blocker; E2 und E3 blockieren.
- Die Angaben im Selbstbericht dazu stimmen.

**Zusätzliche Fälle F1–F21:**

| Nr. | Mutation (auf `index.html`, wo nicht anders angegeben) | r4-58 | r4-59 |
|---|---|---|---|
| F1 | `aria-hidden="True"` auf der Zeile | keiner | 1 × `utility-nav` |
| F2 | `aria-hidden="TRUE"` auf einem Menülink | keiner | 1 × `nav` |
| F3 | `aria-hidden="FALSE"` auf der Zeile | keiner | **keiner** (zulässig) |
| F4 | `aria-hidden="true "` (Leerzeichen hinten) auf der Zeile | keiner | **keiner** (N59-1; Chromium verbirgt) |
| F5 | `inert` auf einem Link der Zeile | keiner | 1 × `utility-nav` |
| F6 | `inert` auf `<li>` im Menü | keiner | 1 × `nav` |
| F7 | `inert` auf `.puk-site-subbar` | keiner | 1 × `utility-nav` |
| F8 | `inert` auf `header` | keiner | `utility-nav` + `nav` |
| F9 | `inert` auf der Menüliste `<ul>` | keiner | 1 × `nav` |
| F10 | dekoratives `<span aria-hidden="true"> →</span>` nach dem Linktext (Zeile) | 1 × `utility-nav` (falsch) | **keiner** |
| F11 | dasselbe im Menü | 1 × `nav` (falsch) | **keiner** |
| F12 | Linktext im Menü nur in `<span aria-hidden="true">` | keiner | 1 × `nav` |
| F13 | «Kurz <span hidden>und</span> klar» | keiner | 1 × `utility-nav` («Kurz klar») |
| F14 | Linktext in `<span inert>` | keiner | 1 × `utility-nav` (Beschriftung leer) |
| F15 | Linktext in `<span aria-hidden="false">` | keiner | **keiner** |
| F16 | Linktext in `<span>` ohne Attribut | keiner | **keiner** |
| F17 | Linktext in `<strong>`, dazu `<span hidden>x</span>` | 1 × `utility-nav` (falsch) | **keiner** |
| F18 | `<script>` im Link | 1 × `inline-script` | 1 × `inline-script` (keine Meldung zu Direkteinstiegen) |
| F19 | `inert` auf der ganzen Hauptnavigation | keiner | 1 × `nav` |
| F20 | Fehlerseite: `inert` auf `header` | keiner | **keiner** |
| F21 | `behandlung.html`: `inert` auf der Zeile | keiner | 1 × `utility-nav` |

**Abgleich mit Chromium** (`inert-chromium.cjs`, CDP-Baum):
- `<a><span inert>…</span></a>` ergibt einen Link mit dem Namen `""`. Der Blocker bei F14 ist also richtig.
- `inert` auf `nav` oder Link nimmt den Link aus dem Baum und aus dem Fokus. Der Blocker bei F5 ist richtig.
- Der dekorative Pfeil ergibt den Namen `"Kurz und klar"`. Kein Blocker bei F10 ist richtig.

**Ergebnis:**
- Alle verlangten Fälle von N58-1 blockieren mit r4-59, auch über Vorfahren, im Menü, auf anderen Seiten und beim Rückfall (E2, E3).
- Die drei Falschmeldungen von r4-58 bei dekorativem Markup (F10, F11, F17) sind weg.
- **Keine Falsch-Positiven:**
  - beim Bestand;
  - bei `aria-hidden="false"` und `"FALSE"`;
  - bei `<span aria-hidden="false">` und `<span>` ohne Attribut;
  - beim Rückfall ohne `utilityNav`;
  - auf der Fehlerseite.
- Offen bleibt nur N59-1.

**Greifen die vier neuen Selbsttestfälle?**
- Ich habe `contract.js:701–704` in eine Kopie von r4-58 (`84cce4c`) eingesetzt.
- Ergebnis: `Selbsttest: 100/104 bestanden`. Genau diese vier scheitern, z. B. `FAIL | Zeile der Direkteinstiege mit inert gesperrt (r4-59, N58-1) | erwartet: utility-nav | erhalten: crisis-number-check`.
- `84cce4c` unverändert ergibt `Selbsttest: 100/100 bestanden`.
- Der Selbstbericht nennt 98/102, gemessen auf `d65a6f3` ohne PR #768. Das ist für jenen Stand plausibel, für `main` gilt 100/104 (siehe N59-2).

### 3. Tests und Gate: abgeschwächt, gleichwertig oder verschärft?

- **Testskripte gleichwertig:** `selftest.mjs`, `layouttest.cjs`, `sprachtest.mjs` und `suchtest.mjs` sind nicht geändert (`git diff --stat` leer).
- **Regeln `utility-nav` und `nav` verschärft:** Sie erkennen mehr Formen des Verbergens. Keine bisher blockierte Mutation fällt weg (A1–C8 blockieren weiter).
- **Beschriftungsvergleich mit `accTxt` gelockert, aber nur dort, wo r4-58 falsch meldete:** dekoratives Markup in `aria-hidden` oder `hidden` (F10, F11, F17). Sichtbarer und zugänglicher Text müssen weiter dem Seitenvertrag entsprechen (C1, C5, C6 blockieren). Damit ist die Regel gleichwertig bis genauer, nicht abgeschwächt.
- **Selbsttest verschärft:** 4 Fälle mehr, keiner entfernt oder gelockert.

### 4. Tests selbst ausgeführt (Stand `0c7d1729`)

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site`. Alle 20 Hinweise sind `crisis-number-check` |
| `node authoring/tools/build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `node authoring/tools/selftest.mjs` | `Selbsttest: 104/104 bestanden`: 104 PASS, 0 FAIL, Exit 0 |
| `node authoring/tools/suchtest.mjs dist/site` | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0`, Exit 0 |
| `node authoring/tools/sprachtest.mjs` | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0`, Exit 0 |
| `node authoring/tools/layouttest.cjs` | `Audit-04-Layouttest: 240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` mit `tension core exceeds 1800px`, Exit 1. Das ist die bekannte Ausnahme B2c |

### 5. Barrierefreiheit (Stichprobe)

- **Vorgehen:**
  - axe-core 4.14.0 per `page.addScriptTag` auf `dist/site` (byte-gleich mit `site/`).
  - Eigener lokaler Server, Chromium, 390 und 1280 px.
  - Tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`.
- **Ergebnis:** `axe 4.14.0, build r4-59 · Läufe: 48 · Seiten: 24 · Verstösse: 0`.

### 6. Merge und Codex-Review

Die Merge-Regeln R28-O01 und R29-P20 sind bei PR #769 **eingehalten**.
- Das Codex-Review auf `7a3d47b` (Kopf von PR #769) ist abgeschlossen: «✅ Completed 2026-10-30T06:39:29.839103Z», Auslöser «Draft marked ready», `"has_any_findings":false`.
- Review-Threads: `totalCount: 0`.
- Gemergt wurde um 06:39:42 UTC, also 13 Sekunden nach dem Abschluss des Reviews.

### 7. Live-Site (keine Prüfstufe, nur Hinweis)

`curl -sS https://borderline-angehoerige.netlify.app/` ergab am 30.10.2026, 06:50 UTC: HTTP `200` und `data-puk-site-build="r4-59"`.

## Was nicht prüfbar war

- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack). Der Zugänglichkeitsbaum ist nur in Chromium über CDP gelesen.
- Safari und Firefox: Wie sie ungültige `aria-hidden`-Werte und `inert` behandeln, ist nicht geprüft.
- Reale Geräte, Zoom und Systemschrift auf Geräten.
- Wirkung im Netlify-Deployment über die Build-Kennung der Startseite hinaus.
- Fachliche, rechtliche und Sicherheitsfreigaben: nicht Gegenstand, weil kein Wortlaut geändert ist.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**
- N59-1 und N59-2 sind gering und können bei der nächsten Arbeit an `contract.js` bzw. an der Pendenzendatei mitgehen.
- Für den veröffentlichten Stand r4-59 besteht kein Hindernis.
- Weil N59-1 auf einer Angabe dieser Prüfsitzung beruht, sollte die Umsetzung von einer anderen Sitzung nachgeprüft werden.
