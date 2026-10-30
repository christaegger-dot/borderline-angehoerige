# Nachprüfung r4-65 (PR #784) · 30.10.2026

## Auftrag, Stand, Prüfende

- **Auftrag von Christa Egger, 30.10.2026:** «Nachprüfung r4-65 starten».
- **Gegenstand:** das veröffentlichte r4-65 aus [PR #784](https://github.com/christaegger-dot/borderline-angehoerige/pull/784), Branch `korrektur/2026-10-30-n60-1-n60-3-r4-62`.
  - Kopf `2810994`, gemergt als **`19a72dc`** am 30.10.2026 um 09:52:58 UTC, über das Konto von Christa Egger.
  - Erster Elternteil `d20973b` (`main` mit #791, Gate r4-64).
  - Geprüft ist `git diff d20973b 19a72dc`, dazu die Zwischenstände `e1db2da`, `7a21ee5` und `2810994`.
- **Selbstbericht:** `audit-results/2026-10-30-n60-1-n60-3-r4-62/BERICHT.md`. Er ist als r4-62 begonnen und hat einen Nachtrag zur Umbenennung.
- **Schwerpunkt:** Was die Nachprüfung r4-62 ([PR #790](https://github.com/christaegger-dot/borderline-angehoerige/pull/790), geprüft auf `d6dd542`) nicht gesehen hat:
  - den Merge `e1db2da` durch `copilot-swe-agent[bot]`;
  - die Umbenennung in r4-65 und die Reparatur in `7a21ee5`;
  - die Berichtigung in `2810994`;
  - den Merge selbst.
- **Wer prüft:** eine eigene Sitzung. Sie hat r4-65 nicht gebaut und an keinem Stand dieser Website Inhalte oder Code geändert.
  - Sie hat weder die Nachprüfung r4-62 (#790) noch die Nachprüfung #793 verfasst.
  - Alle Prüfskripte in diesem Ordner sind neu geschrieben. Skripte der bauenden Sitzung, von #790 und von #793 sind nicht verwendet.
  - Inhalte und Code sind nicht geändert. `site/` ist nicht beschrieben. Committet ist nur dieser Ordner.
- **Umgebung:**
  - Node 22.22.0, Playwright 1.63.0 global (`PLAYWRIGHT_MODULE=$(npm root -g)/playwright`), Chromium 153.0.8010.12.
  - r4-64 (`d20973b`) und r4-65 (`19a72dc`) liegen als eigene Arbeitsbäume ausserhalb des Repositorys (`git worktree add --detach`).
  - axe-core 4.14.0 liegt in einem eigenen Ordner ausserhalb des Repositorys.

Diese Nachprüfung ist keine fachliche, juristische oder institutionelle Freigabe.

### Namenskollision mit #793

Es gibt schon einen Entwurf «Nachprüfung r4-65»: [PR #793](https://github.com/christaegger-dot/borderline-angehoerige/pull/793), Branch `pruefung/2026-10-30-nachpruefung-r4-65`, Ordner `audit-results/2026-10-30-nachpruefung-r4-65/`, Kopf `d4f43ff`. Er prüft den Stand `f7f8d18` von [PR #787](https://github.com/christaegger-dot/borderline-angehoerige/pull/787).
- `f7f8d18` hiess damals ebenfalls r4-65 (`const BUILD = 'r4-65'`, Commit 09:24:00 UTC, `diff-ausgabe.txt`). Heute heisst #787 r4-66 (N61-2).
- #793 prüft also **nicht** das veröffentlichte r4-65.

Diese Nachprüfung gilt dem veröffentlichten r4-65 aus #784. Deshalb heissen Ordner und Branch `…-nachpruefung-r4-65-pr784`. #793 ist weder gedoppelt noch geändert.

**Befundnummern:** #793 vergibt N65-1 bis N65-6. Damit die Nummern eindeutig bleiben, heissen die Befunde hier **N65b-1, N65b-2, N65b-3**.

**Doppelprüfung ausgeschlossen:** Vor dem Anlegen gab es keinen Branch mit «pr784» und keinen PR, der #784 (r4-65) nachprüft (`git ls-remote`, `list_pull_requests`). Der offene [PR #797](https://github.com/christaegger-dot/borderline-angehoerige/pull/797) führt nur die Pendenzen nach. Er nennt diese Nachprüfung als laufend.

### Beilagen in diesem Ordner

| Datei | Inhalt |
|---|---|
| `diff-pruefung.sh`, `diff-ausgabe.txt` | Diff `d20973b..19a72dc` und die Zwischenstände: Dateien, Seiten nach Ersetzen der Kennung, `contract.js` gegen `d6dd542`, Pendenzendatei, `site.config.json` |
| `gate-cdp-pr784.mjs`, `gate-cdp-ausgabe.txt` | 95 Mutationen über `C.gate` für r4-64 und r4-65, Abgleich mit Chromium über CDP |
| `selbsttest-varianten.cjs`, `selbsttest-varianten-ausgabe.txt` | Selbsttest von r4-65 mit Regeln von r4-64, gesamt und einzeln |
| `axe-pr784.mjs`, `axe-ausgabe.txt` | axe-core 4.14.0 auf 24 Seiten bei 390 und 1280 px |
| `tests-ausgabe.txt` | die Tests des Repositorys auf `19a72dc`, Ausgaben gekürzt |
| `live-ausgabe.txt` | Abfrage der Live-Site mit `curl` (nur Hinweis) |

## Befunde

### N65b-1 · wichtig · #784 ist ohne Codex «Completed» gemergt, eine Ausnahme ist nicht belegt

**Ort:** Merge `19a72dc` (09:52:58 UTC). Die Regeln stehen in `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`:
- **R28-O01** (`:1121`): «einen Pull Request erst nach abgeschlossenem und geprüftem Codex-Review mergen»;
- **R29-P20** (`:1228`): «Vor jedem Merge prüfen, dass genau ein Pull Request für die Änderung offen ist und das Codex-Review auf dessen Stand mit dem vollständigen Inhalt lief».

**Beleg** (GitHub, alle Zeiten UTC):

| Zeit | Ereignis | Quelle |
|---|---|---|
| 09:11:52 | Codex-Review auf `d6dd542`: «Failed» | Kommentar `codex-review-state … "status":"failed"` |
| 09:11:56 | Codex: «You have reached your Codex usage limits for code reviews» | Kommentar von `chatgpt-codex-connector[bot]` |
| 09:18:17 | Lauf «Agent Merge on PR #784» (Nr. 57), Akteur `Copilot`, Ereignis `dynamic`; wer ihn ausgelöst hat, ist nicht vermerkt | `list_workflow_runs` |
| 09:24:06 | Merge `e1db2da` durch `copilot-swe-agent[bot]` | `git log` |
| 09:25:44 | CI `build-and-compare` auf `e1db2da` (Lauf 131, Akteur Copilot) gestartet; Ergebnis `failure`, zuletzt geändert 09:52:59 | `list_workflow_runs` |
| 09:29:09 | Review der Review-Sitzung auf `e1db2da`: «**Befunde, nicht mergen**» (K1 bis K4) | `get_reviews` |
| 09:29:13–09:29:57 | CI auf `7a21ee5` (Lauf 133): `success` | `list_workflow_runs` |
| 09:30:19–09:31:09 | CI auf `2810994` (Lauf 134): `success` | `get_check_runs`, `list_workflow_runs` |
| 09:31:02 | Folge-Review auf `2810994`: «inhaltlich ohne Befund; **mergebar erst nach Bestätigung von N62-1 und grüner CI auf `2810994`**». Weiter: «Die Beschreibung verlangt für den Merge «Codex «Completed» ohne Befund». Ist Codex weiter am Nutzungslimit, braucht es einen Entscheid von Christa Egger.» | `get_reviews` |
| 09:52:58 | Merge `19a72dc` über das Konto von Christa Egger. Die Nachricht nennt nur den PR-Titel. | `git show -s 19a72dc` |
| 09:53:08 | Kommentar auf #784, **10 s nach dem Merge**: Entscheid zu N62-1 («ja, #784 behebt N61-1, nicht #787»). Derselbe Kommentar sagt: «Ein Merge von #784 folgt weiterhin erst, wenn das Codex-Review «Completed» ohne Befund meldet (R28-O01).» | `get_comments` |

- **Codex:** Auf keinem Stand von #784 meldet Codex «Completed». Auf `e1db2da`, `7a21ee5` und `2810994` lief kein Codex-Review.
- **Die PR-Beschreibung sagt das Gegenteil des Merges.** Sie schliesst mit: «Merge auf «bitte merge #784» erst nach Codex «Completed» ohne Befund.»
- **Die Bedingung der Review-Sitzung:**
  - Die CI war beim Merge grün.
  - Der Entscheid zu N62-1 steht auf GitHub erst 10 s nach dem Merge.
- **Genau ein PR (R29-P20):** Beim Merge war #787 offen. Sein Kopf `d4bc6cf` (09:35:41 UTC, ebenfalls ein Merge durch `copilot-swe-agent[bot]`) enthält den Branch von #784, also dieselbe Änderung an N61-1. Der Entscheid, dass #784 N61-1 behebt, ist erst nach dem Merge belegt.
- **Ausnahme nicht belegt:**
  - Weder der PR noch der Merge-Commit noch die Pendenzendatei auf `main` (`19a72dc`, `a323fed`) nennen einen Entscheid, ohne Codex-Review zu mergen.
  - Bei #788 stand ein solcher Entscheid in der Beschreibung («ja, ohne Codex-Review mergen»). Die Pendenzendatei vermerkt dort deshalb eine «Ausnahme von R28-O01 und R29-P20» (`:17–20`).
  - Der offene #797 (Kopf `20e0431`) beschreibt den Merge so: «Gemergt hat die eigene Review-Sitzung auf den Auftrag von Christa Egger «ja, #784 mergen» (Mitteilung an die Review-Sitzung, auf GitHub nicht belegt).» Diese Mitteilung liegt dieser Sitzung nicht vor.
- **Copilot-Zuweisung:** #784 ist `Copilot` zugewiesen (`"assignees":["Copilot"]`), ebenso #787, #786 und #792. Vermerkt, nicht bewertet.

**Folge:** Auf die Website wirkt sich das nicht aus. Logik, Seiten und Tests sind unten bestätigt. Aber R28-O01 und R29-P20 sind nicht eingehalten. Eine ausdrückliche Ausnahme ist auf GitHub nicht belegt, und die Texte auf #784 verlangen vor wie nach dem Merge das Gegenteil.

**Vorschlag:**
- Christa Egger bestätigt den Merge-Auftrag mit Quelle.
- Die Pendenzendatei hält den Merge danach als «Ausnahme von R28-O01 und R29-P20» fest, wie bei #788. Fehlt die Bestätigung, steht dort «Abweichung». Das kann #797 aufnehmen.
- Die Copilot-Zuweisung klärt Christa Egger. #797 führt das schon als Pendenz.

### N65b-2 · gering · Der Copilot-Merge hat einen Eintrag in `appliedTo` verloren, `7a21ee5` hat ihn nicht wiederhergestellt

**Ort:** `authoring/site.config.json`, `releaseApproval.independentReviewWaiver.appliedTo`, auf `19a72dc` (also auf `main` und live).

**Beleg** (`diff-ausgabe.txt`, Abschnitt «site.config.json»):
```
appliedTo: Einträge von d6dd542, die auf e1db2da fehlen: ["r4-61 am 30.10.2026 gemergt (PR #780), Nachprüfung r4-61 durch eine Sitzung, die an r4-61 nicht gebaut hat (PR #785)"]
appliedTo: Einträge von a55ecb1, die auf 19a72dc fehlen: []
```
- `d6dd542` (r4-62) hatte 39 Einträge, darunter «r4-61 am 30.10.2026 gemergt (PR #780), Nachprüfung r4-61 … (PR #785)».
- `a55ecb1` (r4-64, `main`) hatte diesen Eintrag nie; r4-64 ist auf einem älteren Stand gebaut.
- `e1db2da` löste den Konflikt zugunsten von `main` auf. Dabei fiel der Eintrag weg.
- `7a21ee5` übernahm nach eigener Angabe «die Konfiguration von `main` mit dem Eintrag dieses Stands obenauf». Der Eintrag zu r4-61 und #785 kam so nicht zurück.
- Auf `19a72dc` steht `PR #785` nirgends in `site.config.json` (`grep -c 'PR #785'` ergibt 0).
- Weder der Selbstbericht noch das Review auf `2810994` nennen das. Das Review prüfte nur, ob r4-64 erhalten ist.

**Folge:** Das Protokoll in `appliedTo`, wofür die Ausnahme von der unabhängigen Prüfung galt, ist lückenhaft: Merge von r4-61 und Nachprüfung #785 fehlen. Der Wortlaut der Website ist nicht betroffen.

**Vorschlag:** beim nächsten Build den Eintrag in `appliedTo` wieder aufnehmen, an seiner zeitlichen Stelle zwischen r4-61 und r4-64.

### N65b-3 · gering · Die Begründung der Kennung r4-65 war schon beim Umbenennen überholt, der Nachtrag ist unvollständig

**Ort:** `pendingScope` auf `19a72dc` («r4-65 (begonnen als r4-62, umbenannt, weil r4-63 in PR #787 vergeben und r4-64 mit PR #788 veröffentlicht ist …»). Dazu `BERICHT.md`, Abschnitt «Nachtrag», Punkte «Umbenennung in r4-65» und «Merge durch Copilot».

**Beleg** (`diff-ausgabe.txt`, Abschnitt «Build-Kennung in den Zwischenständen»):
```
f7f8d18: const BUILD = 'r4-65' · site/index.html data-puk-site-build="r4-65" · Commit 2026-10-30T09:24:00+00:00
7a21ee5: const BUILD = 'r4-65' · site/index.html data-puk-site-build="r4-65" · Commit 2026-10-30T09:29:04+00:00
```
- **Kennung schon vergeben:** Als `7a21ee5` die Kennung r4-65 setzte, trug #787 sie seit fünf Minuten selbst (`f7f8d18`, Branch `pruefung/2026-10-30-nachpruefung-r4-61`). #787 hatte r4-63 da schon abgegeben.
- **Zwei Stände, eine Kennung:** Bis zur Umbenennung von #787 in r4-66 (`7aa64b6`, 09:58 UTC) gab es zwei verschiedene Gate-Stände unter r4-65. Das ist dieselbe Kollision, die #793 von #787 her als N65-1 meldet. Hier ist sie nur von #784 her festgehalten.
- **Nachtrag unvollständig:** Die berichtigte Fassung sagt, Copilot habe «`BUILD`, `independentReviewWaiver.version` und die Kennung in `site/` auf r4-64 gesetzt». Auch `assetVersion` stand auf `e1db2da` auf r4-64 (`e1db2da: assetVersion=r4-64`). Die erste Fassung in `7a21ee5` hatte `assetVersion` noch genannt.
- **Berichtigung selbst zutreffend:** Der Kern der Berichtigung in `2810994` stimmt, siehe «Bestätigt».

**Folge:** Die veröffentlichte Begründung der Nummer stimmt nicht. Heute ist die Kennung eindeutig: r4-65 ist nur noch #784, #787 heisst r4-66.

**Vorschlag:** In der Pendenzendatei festhalten, dass r4-65 von 09:24 bis 09:58 UTC doppelt vergeben war. Im nächsten `pendingScope` die Begründung berichtigen und im Nachtrag `assetVersion` ergänzen. Nicht dringlich.

## Bestätigt

### 1. Diff vollständig (`diff-ausgabe.txt`)

- **Umfang:** `git diff --stat d20973b 19a72dc` ergibt 38 Dateien:
  - 12 neue Dateien im Nachweisordner `audit-results/2026-10-30-n60-1-n60-3-r4-62/`;
  - `authoring/site.config.json` (+4/−4);
  - `authoring/tools/contract.js` (+25/−5);
  - 24 HTML-Seiten in `site/` (je +3/−3).
- **Unverändert** (`git diff --quiet`, Exit 0):
  - Fragmente (`authoring/content`), Stylesheet (`authoring/css`), Skript (`authoring/js`);
  - `authoring/tests` (darin `suche-ersttreffer.tsv`);
  - `build.mjs`, `search-index.mjs` (Suche), `selftest.mjs`, `suchtest.mjs`, `sprachtest.mjs`, `layouttest.cjs`, `wortbilanz.mjs`;
  - `DARSTELLUNGSREGELN.md`;
  - Pendenzendatei.
  - Renderer (`renderPage`), Akuthinweise und Sprungziele erzeugen `contract.js` und die Fragmente. Der Diff von `contract.js` betrifft nur `BUILD`, die Hilfsfunktionen zu `hiddenFlag`, die SVG-Prüfung im Gate und den Selbsttest. Dass Renderer, Akuthinweise und Sprungziele unberührt sind, zeigen auch die Seiten: Sie sind bis auf die Kennung byte-gleich.
- **Seiten:**
  - Alle 35 Dateien in `site/` sind nach Ersetzen von `r4-64` durch `r4-65` byte-gleich mit `d20973b` (0 Abweichungen).
  - `site/css/site.css` ist ohne Ersetzung gleich. Es enthält «r4-64» nur in drei Kommentaren zu N56-1.
  - Im Diff sind genau 72 Kennungen ersetzt: je drei in 24 Seiten (`data-puk-site-build`, `site.css?v=`, `interaktion.js?v=`).
  - Kein Nicht-HTML in `site/` ist geändert.
- **`contract.js`:** `d6dd542` mit `r4-62` → `r4-65` ist byte-gleich mit `2810994`. Der Blob ist `7a41374…` auf `2810994` und auf `19a72dc`. `r4-62` kommt auf `2810994` nicht mehr vor.
  - Damit ist die Gate-Logik von r4-65 dieselbe wie auf `d6dd542`, bis auf Kennung, Kommentare und Selbsttestnamen (elf Vorkommen von r4-65).
  - Die Gate-Logik von r4-64 ist dieselbe wie von r4-61: `git diff 5cbaf1c d20973b -- authoring/tools/contract.js` zeigt nur `BUILD`.
  - Die Ergebnisse von #790 (r4-61 gegen r4-62) gelten deshalb für r4-64 gegen r4-65 weiter, auch der offene Befund N62-2 (`foreignObject`).
- **Nummerierung r4-65:**
  - durchgehend in `BUILD` (`contract.js:11`), `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`;
  - in den Kommentaren (`:40`, `:50`, `:646`, `:925`) und den sechs Selbsttestnamen (`:738–742`, `:929`).
  - In `site.config.json` ändern sich gegenüber `a55ecb1` nur diese vier Schlüssel.
- **`pendingScope`** enthält den Eintrag von r4-64 aus `a55ecb1` vollständig, unter «Zusätzlich auf main:».
- **`appliedTo`** enthält alle 38 Einträge von `a55ecb1` und zwei neue: «r4-64 am 30.10.2026 gemergt (PR #788)» und den Eintrag zu r4-65. Zum fehlenden Eintrag aus `d6dd542` siehe N65b-2.
- **Pendenzendatei:** durch #784 netto unverändert. `git diff d20973b 19a72dc` ist leer, der Blob ist auf beiden `f6b6c82…`.

### 2. Copilot-Merge, Reparatur und Berichtigung

- **`e1db2da`:**
  - Pendenzendatei gleich wie `a55ecb1` (Blob `20c6081…` auf beiden).
  - `pendingScope` enthält den Eintrag r4-64 vollständig.
  - In `contract.js` ist gegenüber `d6dd542` nur `BUILD` geändert, und zwar auf `'r4-64'`.
  - Falsch waren also nur die Kennungen: `BUILD`, `assetVersion`, `independentReviewWaiver.version` und `site/` standen auf r4-64. Dazu kommt der verlorene Eintrag in `appliedTo` (N65b-2).
- **`7a21ee5`:** Die Commit-Nachricht sagt: «hatte die Pendenzendatei auf den Stand vor #788/#789 zurückgesetzt und den Eintrag r4-64 in pendingScope überschrieben». Das ist **falsch**. Die Pendenzendatei auf `e1db2da` ist die von `a55ecb1`, und der Eintrag r4-64 war vorhanden.
  - Zutreffend ist: `7a21ee5` brachte die Pendenzendatei von `d20973b` (mit #791) ein. Seither ist `git diff d20973b 7a21ee5` für die Datei leer.
- **`2810994`:** ändert nur `BERICHT.md` (5 Zeilen hinzugefügt, 6 entfernt). Die Berichtigung stimmt im Kern («`e1db2da` hat dieselbe Pendenzendatei wie `a55ecb1`, und sein `pendingScope` enthält den Eintrag r4-64»). Zur fehlenden Angabe `assetVersion` siehe N65b-3.

### 3. Gate-Regeln, Stichprobe gegen Chromium (`gate-cdp-ausgabe.txt`)

**Methode:**
- Eingabe wie in `build.mjs:41–58`: `injectSearchIndex`, `renderPage`, `C.gate` mit `mode: 'production'`, `exists` und `report`.
- Je Mutation die Blocker von r4-64 und r4-65.
- Chromium-Urteil über CDP:
  - Links: `Accessibility.getPartialAXTree` am Link. Ein Blocker ist richtig, wenn der Name nicht «Kurz und klar» ist oder der Link ignoriert wird.
  - Abbildungen: am SVG. Ein Blocker ist richtig, wenn das SVG im Baum ist und keinen Namen hat.
  - Absenderin: `Accessibility.getFullAXTree`, Knoten aus dem Teilbaum von `[data-sender]`. Ein Blocker ist richtig, wenn kein nicht ignorierter Knoten den Namen der Fachstelle trägt.
- Zeile und Abbildung bei 390 px. Das Menü bei 300 px und geöffnet, weil die Direkteinstiege im Menü nur unter 20 rem erscheinen (`authoring/css/site.css:638`, `:642–645`).
- Seiten und Stylesheet aus `site/` von r4-65, damit eigene `display`-Regeln wirken.

**Ergebnis:** `# Fälle: 95 · r4-64 ≠ r4-65: 21 · Abweichungen Gate ↔ Chromium: r4-64 22, r4-65 9`
- **r4-65 lässt nichts durch, was Chromium falsch zeigt:** In keiner der 95 Mutationen fehlt bei r4-65 ein Blocker.
  - r4-64 liess 16 Fälle durch: LZ1–LZ6 und LM1–LM6 (`<svg hidden|inert|HIDDEN|hidden="until-found">` mit `aria-label` oder `<title>` im Link; Chromium: «Kurz und klar Pfeil» bzw. «… Mehr»), F1–F3 und F12 (Abbildung; Chromium: `image «»`).
- **Die 21 Unterschiede zwischen r4-64 und r4-65** liegen alle bei SVG: LZ1–LZ8, LM1–LM8, F1–F3, F12 und S-svg.
- **Die neun Abweichungen von r4-65** gehen alle in die strenge Richtung (Blocker, wo Chromium keinen verlangt):
  - **LZ17, LZ18, LM17, LM18:** Kontrollen ohne `hidden` oder `inert`, nämlich `<svg><g aria-label>` und `<svg><text>`. Das Gate meldet sie schon in r4-64, das ist also unverändert. Ursache: `relabelled` und `accTxt` lesen `aria-label` und Text im SVG mit, Chromium nicht.
  - **LZ7, LZ8, LM7, LM8:** dieselben Fälle mit `inert` an `<g>` bzw. `hidden` an `<text>`. Weil `hidden` und `inert` in SVG nicht mehr zählen, gilt jetzt dieselbe Strenge wie bei den Kontrollen. Das entspricht der beabsichtigten Regel («Dort gilt nur aria-hidden», `contract.js:40–42`) und dem «bewusst streng» des Selbstberichts (Q6.4, Q6.12).
  - **S-hidden-sub:** `hidden` an `.puk-site-subbar`. Chromium zeigt die Absenderin trotzdem, weil eine eigene `display`-Regel `hidden` aufhebt. Beide Stände melden `sender`. Das ist unverändert.
- **`aria-hidden`-Werte:** Alle 40 Fälle sind in r4-64 und r4-65 gleich und stimmen mit Chromium. Geprüft sind `true`, `TRUE`, ` true `, `yes`, `0`, `false`, `False`, ` false `, `undefined` und der leere Wert, jeweils an Zeile, Menülink, Subbar und Kopf (404).
  - Zum Beispiel AZ8: ` false ` verbirgt (`ariaHiddenSubtree`), Gate `utility-nav`. AZ9: `undefined` verbirgt nicht, kein Blocker.
- **Regel `sender`:**
  - `hidden` und `inert` an Subbar und Kopf ergeben in beiden Ständen `sender`.
  - S-svg (Absenderin in `<svg hidden><foreignObject>`): r4-64 meldet `sender`, r4-65 nicht. Chromium zeigt die Absenderin. r4-65 ist hier richtig, r4-64 war zu streng.
- **Abbildungen, weitere Fälle:** `inert` an der Szene (F4) und `aria-hidden` an der Szene (F5) gelten in beiden Ständen als ausgeblendet, wie in Chromium (`inertElement`, `ariaHiddenSubtree`). F13 (SVG mit `aria-label`): kein Blocker, Chromium `image «Szene»`.

### 4. Selbsttestfälle greifen (`selbsttest-varianten-ausgabe.txt`)

| Fassung von `contract.js` auf `19a72dc` | Ergebnis | scheitert |
|---|---|---|
| unverändert | 122/122 | – |
| `hiddenFlag` von r4-64 | 120/122 | die zwei N61-1-Fälle (Zeile `<svg hidden aria-label>`, Menü `<svg inert><title>`) |
| SVG-Prüfung in Abbildungen von r4-64 | 121/122 | `hidden` an `.puk-vis-scene` |
| beide von r4-64 | 117/122 | genau die fünf neuen Fälle |
| zu streng: `inert` am HTML-Vorfahren zählt nicht | 121/122 | die Gegenprobe |
| `inSvg` immer falsch | 120/122 | die zwei N61-1-Fälle |

Die Zahlen des Selbstberichts (117, 120, 121, 121) stimmen, hier gegen r4-64 statt r4-61. Die Regeln sind dieselben, siehe 1. Die Ersetzungen sind je genau einmal angewandt; das Skript bricht sonst ab. Auf r4-64 (`d20973b`) ergibt der Selbsttest 116/116, also kommen sechs Fälle hinzu: fünf Mutationen und eine Gegenprobe, wie in `pendingScope` angegeben.

### 5. Tests des Repositorys auf `19a72dc` (`tests-ausgabe.txt`)

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production` | 24 Seiten · 0 Blocker · 20 Hinweise |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `selftest.mjs` | 122/122 |
| `suchtest.mjs dist/site` | 216 von 216 · JS-Fehler 0 |
| `sprachtest.mjs` | 73 Prüfungen · JS-Fehler 0 |
| `layouttest.cjs` | 240 Zustände, 27 Bedienproben, 1 Abweichung `tension core exceeds 1800px` (bekannte Ausnahme B2c), Exit 1 wie bisher |

Die Kennzahlen des Selbstberichts und der PR-Beschreibung stimmen.

### 6. Barrierefreiheit, Stichprobe (`axe-ausgabe.txt`)

axe-core 4.14.0, aus einem Ordner ausserhalb des Repositorys mit `page.addScriptTag` geladen. Geprüft sind die 24 veröffentlichten Seiten aus `site/` von `19a72dc` bei 390 und 1280 px. Jede Seite meldet `build r4-65`.

`Läufe: 48 · Seiten: 24 · Verstösse: 0`

### 7. Live-Site (nur Hinweis, `live-ausgabe.txt`)

- **Kennung:** Um 11:06:29 UTC lieferte https://borderline-angehoerige.netlify.app `data-puk-site-build="r4-65"`, ebenso `verstehen.html` und `404.html`.
- **Byte-Vergleich:** 26 von 35 Dateien weichen von `site/` ab.
  - Die Seiten weichen ab, weil Netlify Links umschreibt (zum Beispiel `href="index.html"` → `href='/'`). Das ist die Nachbearbeitung «Pretty URLs», die frühere Prüfungen beschreiben, etwa `audit-results/2026-10-15-delta-r4-30/PRODUKTIONSPRUEFUNG.md`.
  - `_headers` und `_redirects` liefert Netlify nicht aus (HTTP 404).
- Das ist keine Prüfstufe.

### 8. Nummerierung im Repository (nur Feststellung)

- **Beim Auftrag:** Zwei offene PRs hiessen «r4-66»:
  - #787: «r4-66: alt und value im Direkteinstieg wie Chromium (N61-2) …», Entwurf;
  - #795: «r4-66: HTML in foreignObject wieder als HTML (N62-2) …», Kopf `d01223f` mit `const BUILD = 'r4-66'`, 09:58:12 UTC.
- **Stand 11:07 UTC:** #795 heisst «r4-67 (begonnen als r4-66) …», Kopf `51b9b1e`, `const BUILD = 'r4-67'`. #787 behält r4-66 (Kopf `13f471f`, Commit «Entscheid zur Kennung vermerkt (#787 behält r4-66, #795 wird r4-67)»).

## Nicht prüfbar

- echter Screenreader (NVDA, JAWS, VoiceOver, TalkBack);
- Safari und Firefox: Der Abgleich gilt nur für Chromium 153;
- reale Geräte;
- ein Codex-Review: Codex ist am Nutzungslimit;
- der mündliche Merge-Auftrag «ja, #784 mergen»: Er liegt nur als Angabe in #797 vor;
- wer den Lauf «Agent Merge on PR #784» ausgelöst hat: GitHub nennt nur den Akteur `Copilot`;
- die Bereitstellung bei Netlify über die Abfrage mit `curl` hinaus.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**

r4-65 setzt N60-3 und N61-1 um wie in #790 geprüft. Die Gate-Logik ist byte-gleich mit `d6dd542`. In 95 eigenen Mutationen lässt r4-65 nichts durch, was Chromium falsch benennt oder zeigt. Die Seiten ändern sich nur in der Build-Kennung, und alle Tests bestehen.

Nachzubessern ist ohne Wirkung auf die Website:
- **N65b-1 (wichtig):** den Merge ohne Codex «Completed» mit Quelle als Ausnahme oder Abweichung festhalten;
- **N65b-2, N65b-3 (gering):** Lücke in `appliedTo`, überholte Begründung der Kennung.
