# Nachprüfung r4-59 · 30.10.2026

**Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-59 starten».

- **Gegenstand:** die Änderungen von r4-59 gegenüber dem Stand davor, `git diff d65a6f3 0c7d172`. r4-59 ist [PR #769](https://github.com/christaegger-dot/borderline-angehoerige/pull/769), gemergt als `0c7d172` am 30.10.2026, 06:39:42 UTC.
- **Selbstbericht der bauenden Sitzung:** `audit-results/2026-10-30-n58-1-n58-2-r4-59/BERICHT.md`. Er setzt N58-1 und N58-2 aus `audit-results/2026-10-30-nachpruefung-r4-58/NACHPRUEFUNG.md` um.
- **Wer prüft:** eine eigene Sitzung. Sie hat an r4-59 und r4-58 nicht gebaut und die Nachprüfungen r4-57 und r4-58 nicht verfasst. Sie ändert keine Inhalte und keinen Code. Committet ist nur dieser Ordner.
- **Parallele Nachprüfung:** Eine andere Sitzung hat gleichzeitig eine Nachprüfung r4-59 auf `pruefung/2026-10-30-nachpruefung-r4-59` gelegt ([PR #771](https://github.com/christaegger-dot/borderline-angehoerige/pull/771), Entwurf, `f846b92`). Diese Sitzung hat sie weder gelesen noch genutzt. Laut ihrem Commit hat jene Sitzung auch die Nachprüfung r4-58 verfasst. Diese Fassung liegt deshalb auf Anweisung von Christa Egger («eigener Branch, mach einen Entwurfs-PR») auf `pruefung/2026-10-30-nachpruefung-r4-59-b`. Beide Berichte nutzen denselben Ordner; vor einem Merge ist zu entscheiden, welcher gilt oder wie sie zusammengeführt werden.
- **Umgebung:** Node 22.22.0, Playwright 1.63.0 global (`PLAYWRIGHT_MODULE=$(npm root -g)/playwright`), Chromium 153.0.8010.12. r4-58 (`d65a6f3`) und der Branchstand von r4-59 (`7a3d47b`) lagen als Arbeitsbäume ausserhalb des Repositorys vor.

Diese Datei ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

**Beilagen in diesem Ordner:**
- `mutationen.mjs`, `mutationen-ausgabe.txt`: eigene Mutationen über `C.gate`, gegen r4-58 und r4-59;
- `mutationen-r4-58-skript-ausgabe.txt`: das Prüfskript der Nachprüfung r4-58, gegen r4-58 und r4-59;
- `aria.mjs`, `aria-ausgabe.txt`: dieselben Mutationen im Zugänglichkeitsbaum von Chromium (CDP) und mit Playwright `ariaSnapshot`;
- `minimal.mjs`, `minimal-ausgabe.txt`: Minimalprobe, wie Chromium Werte von `aria-hidden` auswertet;
- `axe.mjs`, `axe-ausgabe.txt`: axe-core auf allen Seiten.

## Kurzfassung

- **N58-1 ist für die genannten Fälle behoben.** `TRUE`, `True`, `inert` und ein Linktext in verborgenem `<span>` blockieren jetzt. Das dekorative Zeichen in `<span aria-hidden="true">` blockiert nicht mehr. Die vier neuen Selbsttestfälle greifen. Keine Regel ist abgeschwächt.
- **N58-2 stimmt, soweit prüfbar.** Die Tabelle der Nachprüfung r4-57 hat 37 Mutationen und den Bestand.
- **Neu, N59-1, wichtig:** Die Annahme hinter r4-59, Chromium verberge mit `aria-hidden=" true "` nicht, ist falsch. Chromium verbirgt bei **jedem** nicht leeren Wert ausser `false` (ohne Rücksicht auf Gross-/Kleinschreibung), also auch bei `" true "`, `"true "`, `"yes"`, `"1"`, `"0"`. Die Annahme stammt aus Playwright `ariaSnapshot`. Das ist eine eigene Berechnung von Playwright, nicht der Baum von Chromium. Gate, Codekommentar, Selbstbericht, PR #769 und Pendenzendatei geben das falsch wieder.
- **Neu, N59-2, gering:** Die Regel `sender` (und die SVG-Prüfung) kennen weiterhin nur `aria-hidden="true"` exakt und kein `inert`.
- **Neu, N59-3, gering:** Ein `aria-label` an einem `<span>` im Link ändert in Chromium den Namen, bleibt im Gate aber ohne Meldung.
- **Neu, N59-4, wichtig:** [PR #768](https://github.com/christaegger-dot/borderline-angehoerige/pull/768) (im Prüfbereich, Nachtrag zu N54-2) wurde vor dem Codex-Review gemergt. PR #769 und PR #766 halten die Merge-Regel ein, knapp.
- **Neu, N59-5, gering:** Die Pendenzendatei auf `main` führt r4-59 als Entwurf, nennt 102 statt 104 Selbsttestfälle und erwähnt den Nachtrag #768 nicht.
- Seiten, Wortlaut, Stylesheet, Skript, Renderer, Suche und Tests sind unverändert. Alle Tests und axe-core sind grün. Live liefert `r4-59`.

## Befunde

### N59-1 · wichtig · Chromium verbirgt auch `aria-hidden=" true "` und jeden anderen Wert ausser `false`

- **Ort:**
  - `authoring/tools/contract.js:35–37` (Kommentar «Chromium verbirgt auch «TRUE», aber nicht « true » mit Leerraum», `hiddenFlag` mit `.toLowerCase() === 'true'`), angewendet in `:535` (Zeile), `:552` (Menü) und in `accTxt` (`:39`);
  - `audit-results/2026-10-30-n58-1-n58-2-r4-59/BERICHT.md:24`, `:60`, `:72`;
  - Beschreibung von PR #769 («`aria-hidden=" true "` mit Leerraum bleibt zulässig, wie in Chromium»);
  - `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:14`;
  - Ursprung: `audit-results/2026-10-30-nachpruefung-r4-58/NACHPRUEFUNG.md:38` und `:182` (D8, «Chromium verbirgt die Zeile damit nicht»).
- **Beleg 1, Minimalprobe** (`minimal.mjs`, `minimal-ausgabe.txt`): `<nav aria-label="Probe" aria-hidden="…"><a>Probe-Link</a></nav>`, gelesen mit CDP `Accessibility.getFullAXTree` (der Baum, den Chromium den Screenreadern gibt) und mit Playwright `ariaSnapshot`:

  | Wert von `aria-hidden` | Chromium (CDP) | Playwright `ariaSnapshot` | Gate r4-59 |
  |---|---|---|---|
  | `true`, `TRUE`, `True` | verborgen | verborgen | verborgen |
  | `" true "`, `"true "`, `" true"`, Tab/Zeilenumbruch | **verborgen** | im Baum | nicht verborgen |
  | `yes`, `1`, `0`, `no`, `mixed`, `" "`, `" false "` | **verborgen** | im Baum | nicht verborgen |
  | `false`, `FALSE`, `False` | im Baum | im Baum | nicht verborgen |
  | `""` (leer), ohne Wert, ohne Attribut | im Baum | im Baum | nicht verborgen |

- **Beleg 2, auf der gerenderten Seite** (`aria-ausgabe.txt`): `index.html` aus `dist/site` mit Mutation, Breite 1280 px:
  - P1.3 `aria-hidden=" true "` auf der Zeile: `CDP Zeilenlink: VERBORGEN`, `Playwright Zeilenlink: - link "Kurz und klar"`. Gate: `keine neuen Blocker`.
  - P1.10 und P1.11 (`" true "`, `"true "` am Link): `CDP Zeilenlink: VERBORGEN (ariaHiddenElement)`. Gate: `keine neuen Blocker`.
  - Ebenso P1.17, P1.18 (Menü-`<li>`), P1.24, P1.25 (Menülink), P1.31, P1.32 (`.puk-site-subbar`), P1.38, P1.39 (`header`).
  - Umgekehrt **Falsch-Positiv** P4.6: `Kurz und klar<span aria-hidden=" true "> →</span>`. Chromium: `link «Kurz und klar»`. Gate: `utility-nav «Direkteinstiege weichen vom Seitenvertrag ab: Kurz und klar → …»`.
- **Einordnung:**
  - Keine Wirkung auf die veröffentlichten Seiten: Der Renderer schreibt an Zeile, Menü und Vorfahren kein `aria-hidden`; Bestand 0 Blocker. Die Regel schützt vor Eingriffen in generierte Seiten.
  - «Wichtig», weil die falsche Aussage jetzt an fünf Stellen steht, darunter ein Codekommentar, der künftige Arbeit leitet. Ausserdem ist die Methode betroffen: Die Nachprüfungen r4-58 und der Selbstbericht r4-59 haben `ariaSnapshot` als «Zugänglichkeitsbaum von Chromium» behandelt. Playwright rechnet ihn aber selbst. Das zeigt auch `inert`: Playwright führt einen Link in `<span inert>` als «Kurz und klar», Chromium als `link «»` (P3.7). Das Gate folgt hier zu Recht Chromium.
  - Die Abweichung betrifft nur Chromium. Wie Firefox und Safari solche Werte auswerten, ist nicht geprüft.
- **Vorschlag:**
  - `hiddenFlag` wie Chromium: verborgen, wenn `aria-hidden` vorhanden, nicht leer und nicht `false` ist (ohne Rücksicht auf Gross-/Kleinschreibung, ohne Trimmen; `" false "` gilt in Chromium als verborgen). Einfacher und ebenso streng: jedes `aria-hidden` an Zeile, Einträgen und deren Vorfahren blockieren, ausser `false` und leer.
  - Selbsttestfälle für `aria-hidden=" true "` und `aria-hidden="yes"` an der Zeile.
  - Kommentar in `contract.js:35–36` und die Aussagen im Selbstbericht r4-59, in der Pendenzendatei und in der Nachprüfung r4-58 (D8) berichtigen, dort als Berichtigung gekennzeichnet.
  - Für künftige Prüfungen im Zugänglichkeitsbaum CDP `Accessibility.getFullAXTree` oder `getPartialAXTree` nutzen, nicht `ariaSnapshot`.

### N59-2 · gering · Regel `sender` und SVG-Prüfung kennen `TRUE` und `inert` nicht

- **Ort:** `authoring/tools/contract.js:478` (`hidden` in der Regel `sender`: `x.attrs['aria-hidden'] === 'true'`, kein `inert`) und `:631` (SVG in Abbildungen: `sv.attrs['aria-hidden'] !== 'true'`).
- **Beleg** (`mutationen-ausgabe.txt`, `aria-ausgabe.txt`):
  - P1.29 `aria-hidden="TRUE"` auf `.puk-site-subbar`: Chromium `CDP Absenderin: VERBORGEN`. Gate: nur `utility-nav`, **kein** `sender`. Mit `aria-hidden="true"` meldet das Gate `sender «Fachstellen-Absenderin ist versteckt»` (Prüfskript r4-58, A9).
  - Ebenso P1.36 (`header`), P2.5 und P2.6 (`inert` auf Subbar und Kopf): Chromium verbirgt die Absenderin, Gate ohne `sender`.
  - Fehlerseite: P6.3 `inert` und P6.4 `aria-hidden="TRUE"` auf dem Kopf von `404.html` ergeben **keinen** Blocker. Chromium verbirgt die Absenderin (`VERBORGEN (inertElement)`, `VERBORGEN`). Mit `aria-hidden="true"` blockiert dieselbe Seite (Prüfskript r4-58, D9).
  - Bei `:631` wirkt es in die strenge Richtung: Ein SVG mit `aria-hidden="TRUE"` ohne `<title>` würde gemeldet, obwohl es verborgen ist.
- **Einordnung:** N58-1 betraf nur die Direkteinstiege; dieser Rest liegt ausserhalb des Auftrags. Keine Wirkung auf die Seiten. Dieselbe Lücke wie N58-1 in einer Nachbarregel.
- **Vorschlag:** `sender` und SVG-Prüfung auf dieselbe Hilfsfunktion stützen wie die Direkteinstiege (nach N59-1 berichtigt), dazu ein Selbsttestfall `inert` auf dem Kopf.

### N59-3 · gering · `aria-label` an einem `<span>` im Link bleibt ohne Meldung

- **Ort:** `authoring/tools/contract.js:40` (`relabelled` prüft nur den Link) und `:39` (`accTxt` zählt den Text des `<span>`).
- **Beleg:** P5.4 `<a …href="kurz.html"><span aria-label="Mehr">Kurz und klar</span></a>`. Chromium: `link «Mehr»`. Gate: `keine neuen Blocker`, in r4-58 und r4-59.
- **Einordnung:** bestand schon in r4-58; der Renderer erzeugt das nicht. Gehört zum Ziel von N57-2 (zugänglicher Name gleich sichtbarer Beschriftung).
- **Vorschlag:** `relabelled` auf `aria-label` und `aria-labelledby` an Nachfahren des Links ausweiten, dazu ein Selbsttestfall.

### N59-4 · wichtig · PR #768 vor dem Codex-Review gemergt (R28-O01, R29-P20)

- **Ort:** [PR #768](https://github.com/christaegger-dot/borderline-angehoerige/pull/768) «Nachtrag zu N54-2», Teil von `git diff d65a6f3 0c7d172` (`contract.js` +2 Selbsttestfälle, Berichtigung der Nachprüfung r4-54).
- **Beleg** (GitHub-API, `pull_request_read`):
  - `merged_at: 2026-10-30T06:26:31Z`, `merged_by: christaegger-dot`, Kopf `8f54e5d`.
  - Der Zusammenfassungskommentar von Codex (`chatgpt-codex-connector[bot]`) entstand erst um `06:26:39Z`, Status «Completed» um `2026-10-30T06:27:16.257842Z`, ohne Befund (`has_any_findings: false`).
  - Der CI-Lauf `build-and-compare` auf `8f54e5d` war vorher grün (06:25:33–06:26:10 UTC).
  - Die PR-Beschreibung verlangt selbst: «Vor dem Merge den Abschluss des Codex-Reviews abwarten (N58-3).»
- **Einordnung:** Folgen keine, das Review blieb ohne Befund. Es ist aber der vierte Fall in Folge nach N58-3, diesmal 45 Sekunden vor dem Abschluss.
- **Vorschlag:** in der Pendenzendatei beim Vermerk zu R28-O01 und R29-P20 nachtragen.

### N59-5 · gering · Pendenzendatei auf `main` nicht nachgeführt

- **Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:3`, `:11`, `:19`.
- **Beleg:**
  - Die Datei führt r4-59 als «Entwurf … **nicht gemergt**» (`:11`). PR #769 ist seit 06:39:42 UTC gemergt.
  - «Selbsttest 102/102» (`:19`, ebenso Selbstbericht und PR #769). Das galt für den Branchstand `7a3d47b` (selbst gemessen: `Selbsttest: 102/102 bestanden`). Auf `main` = `0c7d172` sind es mit den zwei Fällen aus #768 **104**: `Selbsttest: 104/104 bestanden`.
  - Der Nachtrag zu N54-2 (#768) fehlt (`grep -n "#768\|nachtrag-n54-2" PENDENZEN…` → leer). Sein Bericht kündigt den Eintrag an: «Der Eintrag zu diesem Nachtrag folgt nach dessen Merge.»
- **Vorschlag:** bei der nächsten Nachführung r4-59 als gemergt eintragen, 104 Selbsttestfälle nennen, #768 und N59-4 aufnehmen.

## Was bestätigt ist

### 1. Diff vollständig

`git diff --stat d65a6f3 0c7d172`: 31 Dateien, 273 Einfügungen, 88 Löschungen. Der Bereich umfasst PR #769 (`833cd0a`, `7a3d47b`) und PR #768 (`fdebf56`, `8f54e5d`), zusammengeführt in `84cce4c` und `0c7d172`.

- **`authoring/`:** nur `site.config.json` und `tools/contract.js`. Hunks in `contract.js`: `:8` (BUILD), `:32` (`hiddenFlag`, `concealed`, `accTxt`), `:519`, `:532`, `:544` (Regeln), `:698` (vier Mutationen), `:852` (zwei Fälle aus #768). `renderPage` (`:169`) ist nicht berührt.
- **Unverändert** (leere Ausgabe von `git diff --stat d65a6f3 0c7d172 -- authoring/content authoring/css authoring/js authoring/tests authoring/tools/build.mjs authoring/tools/selftest.mjs authoring/tools/layouttest.cjs authoring/tools/sprachtest.mjs authoring/tools/suchtest.mjs authoring/tools/search-index.mjs site/css site/js site/*.json authoring/PRUEFBERICHT.md`): Fragmente (damit Wortlaut, Akuthinweise, Sprungziele), Stylesheet, Skript, Suche, `suche-ersttreffer.tsv`, alle Testskripte und `build.mjs`.
- **`site/`:** 24 Seiten geändert. Je Seite `git show d65a6f3:<f> | sed 's/r4-58/r4-59/g'` gegen `git show 0c7d172:<f>` verglichen: `abweichend: 0`. In `index.html` sind genau drei Zeilen geändert (`data-puk-site-build`, `?v=` an Stylesheet und Skript).
- **Build-Kennung r4-59 stimmig:** `BUILD = 'r4-59'` (`contract.js:11`), `assetVersion: "r4-59"` (`site.config.json:5`), `releaseApproval.independentReviewWaiver.version: "r4-59"` (`:39`), `pendingScope` beginnt mit «r4-59 (Befunde N58-1 und N58-2 …)», der alte Text folgt als «Vorher: r4-58 …». `appliedTo` endet neu mit «r4-58 am 30.10.2026 gemergt (PR #764), Nachprüfung r4-58 … (PR #765); r4-59 … gebaut von der Sitzung, die r4-58 gebaut hat, Nachweis audit-results/2026-10-30-n58-1-n58-2-r4-59/BERICHT.md». Die gebauten Seiten in `dist/site` melden `data-puk-site-build="r4-59"` (axe-Lauf).
- **`audit-results/`:** neu `2026-10-30-n58-1-n58-2-r4-59/BERICHT.md` und `2026-10-30-nachtrag-n54-2/BERICHT.md`; Berichtigungen angefügt in `2026-10-30-n57-1-n57-2-r4-58/BERICHT.md:40–41` (N58-2) und `2026-10-29-nachpruefung-r4-54/NACHPRUEFUNG.md:119–125` (#768). Die übrigen Zeilen dieser Dateien sind unverändert.
- **Berichtigung N58-2:** Die Tabelle in `audit-results/2026-10-29-nachpruefung-r4-57/NACHPRUEFUNG.md:93–130` hat 38 Zeilen (`grep -cE '^\| (M|V)[0-9]'` → `38`): M0 und 37 Mutationen. M11b steht in der Tabelle, M11 nicht. Die berichtigte Fassung («39 Läufe: M0 und 38 Mutationen, 37 aus der Tabelle und M11») passt dazu. Dass das Skript M11 enthielt, ist nicht prüfbar (siehe unten). Die Aussage, `Kurz&shy;und klar` ändere den sichtbaren Text, stimmt: Ohne Leerzeichen steht «Kurzund klar».

### 2. Gate-Regeln

Eingabe wie in `build.mjs`: `C.renderPage` für alle veröffentlichten Seiten, `C.gate` im Modus `production`, `report` = `PRUEFBERICHT.md`, `exists` wie dort. Gezählt sind neue Blocker gegenüber dem Bestand. Bestand in beiden Ständen: `BASIS 0 Blocker 20 Hinweise`.

**Eigene Mutationen** (`mutationen-ausgabe.txt`, 98 Fälle, dazu E1–E6 ohne `utilityNav`), mit dem Ergebnis in Chromium (`aria-ausgabe.txt`):

| Gruppe | r4-58 | r4-59 | Chromium (CDP) | Urteil |
|---|---|---|---|---|
| `aria-hidden="TRUE"`/`"True"` auf Zeile, Link, `<li>`, Menülink, Subbar, Kopf (P1.1–2, 8–9, 15–16, 22–23, 29–30, 36–37) | keiner | blockiert (`utility-nav` bzw. `nav`, Kopf beide) | verborgen | richtig |
| `aria-hidden=" true "`/`"true "` an denselben Orten (P1.3–4 …) | keiner | keiner | **verborgen** | falsch-negativ, N59-1 |
| `aria-hidden="false"`, leer, ohne Wert (P1.5–7 …) | keiner | keiner | im Baum | richtig |
| `inert` auf Zeile, Link, `<li>`, Menülink, Subbar, Kopf, `inert="false"` (P2.1–7) | keiner | blockiert | verborgen (`inertElement`) | richtig |
| `hidden="until-found"` (P2.8) | blockiert | blockiert | verborgen (`notRendered`) | richtig |
| Linktext ganz oder teilweise in `<span aria-hidden="true">`, `"TRUE"`, `hidden`, `inert`, Zeile und Menü (P3.1–16) | keiner | blockiert (Beschriftung leer bzw. «Kurz») | Name `«»` bzw. `«Kurz»` | richtig |
| Dekoratives `→` in `<span aria-hidden="true">` davor oder danach, Zeile und Menü; `<svg aria-hidden="true"><title>` (P4.1–4) | blockiert | **keiner** | Name `«Kurz und klar»` | Falschmeldung behoben |
| `→` in `<span aria-hidden="false">` (P4.5) | blockiert | blockiert | `«Kurz und klar →»` | richtig |
| `→` in `<span aria-hidden=" true ">` (P4.6) | blockiert | blockiert | `«Kurz und klar»` | falsch-positiv, N59-1 |
| «Mehr» sichtbar, «Kurz und klar» in `aria-hidden` (P4.7) | blockiert | blockiert | `«Mehr»` | richtig |
| `aria-label` gleich, leer; `aria-labelledby` am Menülink (P5.1–3) | blockiert | blockiert | Name gleich | streng, gewollt (N57-2) |
| `aria-label` an `<span>` im Link (P5.4) | keiner | keiner | `«Mehr»` | falsch-negativ, N59-3 |
| `title="Mehr"` am Link (P5.5) | keiner | keiner | `«Kurz und klar»` | richtig |
| andere Seiten: `grenzen.html` Zeile `TRUE`, `suche.html` Menülink `inert` (P6.1–2) | keiner | blockiert | verborgen | richtig |
| Fehlerseite: Kopf `inert` oder `aria-hidden="TRUE"` (P6.3–4) | keiner | keiner | Absenderin verborgen | Rest, N59-2 |
| `display:none` im Link (P7.1), zusätzlicher Text in `display:none` (P7.2), `visually-hidden` (P7.3) | wie r4-59 | keiner / blockiert / blockiert | `«»` / `«Kurz und klar»` / `«Kurz und klar (Seite)»` | bekannte Grenze: statisches HTML, kein Stylesheet |
| `role="presentation"` am Link, `<span role="none">` (P7.4–5) | keiner | keiner | `link «Kurz und klar»` | richtig |
| E1 ohne `utilityNav` (Rückfall) | 0 Blocker | 0 Blocker | – | richtig |
| E2–E5 Rückfall mit `TRUE`, `inert`, Linktext in `aria-hidden`, Menülink `inert` | keiner | blockiert | – | richtig |
| E6 Rückfall mit dekorativem `→` | blockiert | keiner | – | Falschmeldung behoben |

Abgleich r4-58 gegen r4-59 (`diff` der beiden Ausgaben): Kein Fall, der in r4-58 blockierte, ist in r4-59 offen. Weggefallen sind nur die Falschmeldungen P4.1–P4.4 und E6.

**Prüfskript der Nachprüfung r4-58** (`mutationen-r4-58-skript-ausgabe.txt`, 43 Fälle und Bestand, je 44 Zeilen): Neu blockiert sind genau D1, D2 und D5. Bei A1–A12, C7, C8, D6 und D7 ändert sich nur der Wortlaut der Meldung («hidden, inert oder aria-hidden»). Alles übrige ist gleich, darunter D3, D4, D8 und E1–E3. Das stimmt mit dem Selbstbericht überein (`BERICHT.md:56–62`); nur die Begründung zu D8 ist falsch (N59-1). Die zusätzlichen Fälle Y1–Y4 des Selbstberichts habe ich mit P4.1, P2.3, P1.23 und P3.13 nachgestellt; die Ergebnisse stimmen.

**Greifen die vier neuen Selbsttestfälle?** In einer Kopie von `0c7d172` habe ich `concealed` auf die Fassung von r4-58 zurückgesetzt und `accTxt` durch `txt` ersetzt (Regeln von r4-58):

```
FAIL | Zeile der Direkteinstiege mit aria-hidden="TRUE" verborgen (r4-59, N58-1) | erwartet: utility-nav | erhalten: crisis-number-check
FAIL | Zeile der Direkteinstiege mit inert gesperrt (r4-59, N58-1) | erwartet: utility-nav | erhalten: crisis-number-check
FAIL | Beschriftung eines Direkteinstiegs nur in aria-hidden (r4-59, N58-1) | erwartet: utility-nav | erhalten: crisis-number-check
FAIL | Direkteinstieg im Menü mit inert gesperrt (r4-59, N58-1) | erwartet: nav | erhalten: crisis-number-check
Selbsttest: 100/104 bestanden
```

Genau diese vier scheitern. Auf dem Branchstand `7a3d47b` ohne #768: `102/102`; r4-58 (`d65a6f3`): `98/98`. Die Angabe «98/102» im Selbstbericht gilt für den Branchstand und stimmt dort.

### 3. Tests und Gate: abgeschwächt, gleichwertig oder verschärft?

- **`selftest.mjs`, `layouttest.cjs`, `sprachtest.mjs`, `suchtest.mjs`:** nicht geändert (`git diff --stat` leer). Gleichwertig.
- **Selbsttest in `contract.js`:** sechs neue Fälle (vier aus #769, zwei aus #768), keiner entfernt oder gelockert. Verschärft.
- **Regeln `utility-nav` und `nav`:** verschärft bei Verbergen (`TRUE`, `True`, `inert`, verborgener Linktext). Gelockert nur dort, wo r4-58 falsch meldete (dekorative Zeichen in `aria-hidden`); Chromium bestätigt das (P4.1–P4.4). Die Lücke bei Leerraum und anderen Werten (N59-1) bestand schon in r4-58; sie ist nicht neu, aber jetzt als Absicht festgeschrieben.
- **Wechsel von `txt` auf `accTxt`:** `accTxt` steht nur in `utilityOf` (`:522`) und `menuUtility` (`:547`). Alle übrigen Textvergleiche (`sender`, Linktexte, Überschriften, Suche) nutzen weiter `txt`. Die Seiten haben in Zeile und Menü kein verborgenes Element, der Bestand bleibt bei 0 Blockern. Keine unbeabsichtigte Wirkung gefunden.

### 4. Tests selbst ausgeführt (auf `0c7d172`)

| Befehl | Ausgabe |
|---|---|
| `node authoring/tools/build.mjs --production` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site`, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `node authoring/tools/selftest.mjs` | `Selbsttest: 104/104 bestanden`, Exit 0 |
| `node authoring/tools/suchtest.mjs dist/site` | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0`, Exit 0 |
| `node authoring/tools/sprachtest.mjs` | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0`, Exit 0 |
| `node authoring/tools/layouttest.cjs` | `Audit-04-Layouttest: 240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` `tension core exceeds 1800px` (bekannte Ausnahme B2c), Exit 1 wie bisher |

`site/` ist nicht beschrieben; `git status` war nach allen Läufen ohne Änderung.

**Zusammengeführter Stand:** PR #769 lief in CI auf `7a3d47b` (ohne #768) grün, PR #768 auf `8f54e5d` (ohne #769). Den zusammengeführten Stand `0c7d172` hat vor dem Merge niemand geprüft. Meine Läufe oben belegen, dass er besteht.

### 5. Barrierefreiheit (Stichprobe)

axe-core 4.14.0, in einem eigenen Ordner ausserhalb des Repositorys installiert und per `page.addScriptTag` geladen. Seiten aus `dist/site` (byte-gleich mit `site/`), in Chromium bei 390 und 1280 px, Tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`. Ergebnis (`axe-ausgabe.txt`): `axe 4.14.0, build r4-59 · Läufe: 48 · Seiten: 24 · Verstösse: 0`.

### 6. Merge und Codex-Review

| PR | Kopf | Codex «Completed» | `merged_at` | Regel |
|---|---|---|---|---|
| [#766](https://github.com/christaegger-dot/borderline-angehoerige/pull/766) Pendenzen, → `d65a6f3` | `72a2f97` | 06:22:02.28 UTC, ohne Befund | 06:22:10 UTC | eingehalten (8 s danach) |
| [#768](https://github.com/christaegger-dot/borderline-angehoerige/pull/768) Nachtrag N54-2 | `8f54e5d` | 06:27:16.26 UTC, ohne Befund | 06:26:31 UTC | **nicht eingehalten**, N59-4 |
| [#769](https://github.com/christaegger-dot/borderline-angehoerige/pull/769) r4-59, → `0c7d172` | `7a3d47b` | 06:39:29.84 UTC, ohne Befund | 06:39:42 UTC | eingehalten (12 s danach) |

- Quelle: GitHub-API (`pull_request_read`, `get` und `get_comments`), Zusammenfassungskommentar von `chatgpt-codex-connector[bot]` mit `codex-review-state` `"status":"completed"`, `"has_any_findings":false`. Alle drei hat `christaegger-dot` gemergt.
- Review-Threads: keine (`get_review_comments` → `totalCount: 0`) bei #766, #768 und #769.
- CI: `build-and-compare` auf `7a3d47b` grün (zwei Läufe, bis 06:27:12 UTC), Netlify-Prüfungen grün.
- Das Review von #769 galt `7a3d47b`, nicht dem Merge mit #768 (siehe Abschnitt 4).

### 7. Live-Site (keine Prüfstufe)

`curl -sS https://borderline-angehoerige.netlify.app/ | grep -o 'data-puk-site-build="[^"]*"'` → `data-puk-site-build="r4-59"` (30.10.2026, 06:53 UTC).

## Was nicht prüfbar war

- **Prüfskript der Nachprüfung r4-57:** Es liegt nicht im Repository (`audit-results/2026-10-29-nachpruefung-r4-57/` enthält nur `NACHPRUEFUNG.md`, auch im Git-Verlauf kein Skript). Dass es M11 und 38 Mutationen enthielt, beruht nur auf der Angabe der Sitzung, die es verfasst und r4-58 und r4-59 gebaut hat. Prüfbar war nur die Tabelle.
- Echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack). Geprüft ist der Zugänglichkeitsbaum von Chromium über CDP, nicht die Ausgabe eines Screenreaders.
- Safari und Firefox: Wie sie `aria-hidden` mit Leerraum oder anderen Werten auswerten, ist offen (wichtig für den Vorschlag zu N59-1).
- Reale Geräte; geprüft ist nur Chromium mit simulierter Breite.
- Fachliche, juristische und institutionelle Freigabe: nicht Gegenstand.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**

N58-1 ist für die genannten Fälle behoben, N58-2 stimmt, soweit prüfbar. Seiten, Wortlaut und Tests sind unverändert und grün. Nachzubessern sind:
- N59-1 (wichtig): `hiddenFlag` an Chromium anpassen und die falsche Aussage zu `aria-hidden=" true "` an allen fünf Stellen berichtigen.
- N59-4 (wichtig): Merge von #768 vor dem Review in der Pendenzendatei vermerken.
- N59-2, N59-3, N59-5 (gering): bei der nächsten Arbeit an `contract.js` bzw. der nächsten Nachführung.

Keiner der Befunde wirkt auf die veröffentlichten Seiten.
