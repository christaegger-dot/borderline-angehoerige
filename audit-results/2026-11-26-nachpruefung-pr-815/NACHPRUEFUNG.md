# Nachprüfung PR #815 · r4-68 · Meta-Tag `text-scale` · 26.11.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger, 26.11.2026: «Starte eine Nachprüfung von #815 in einer neuen Sitzung».
- **Gegenstand:** [PR #815](https://github.com/christaegger-dot/borderline-angehoerige/pull/815), Release r4-68, Kopf `7ec1921`. Geprüft ist `git diff c937f8e 7ec1921`, 31 Dateien:
  - `authoring/tools/contract.js` (Tag im Seitenrahmen, `BUILD`);
  - `authoring/site.config.json` (`assetVersion`, `independentReviewWaiver.version`, `pendingScope`, `appliedTo`);
  - 24 HTML-Dateien in `site/`;
  - `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`;
  - Nachweis `audit-results/2026-11-26-text-scale-r4-68/`.
- **Stand:** #815 ist **gemergt und veröffentlicht**.
  - Gemergt als `c7d8c01` am 26.11.2026 um 16:37:48 UTC, über das Konto `christaegger-dot`.
  - Der Baum von `c7d8c01` ist gleich wie der von `7ec1921`: beide `80a22a5`, `git diff --stat` leer.
  - Der Branch `claude/sharp-mendel-6ecwbi` ist auf GitHub gelöscht.
  - Danach kam auf `main` noch #814 (`55d006e`, 16:40:15 UTC). #814 ändert nur `audit-results/`; `site/` und `authoring/` sind gegenüber `c7d8c01` gleich.
- **Wer prüft:** eine Claude-Sitzung (`session_011SWztic2EiAxVm3M82hmV1`), die an #809 bis #815 nicht gebaut hat. Gebaut hat #815 laut Commit `4271f23` die Sitzung `session_011SWztjZmbGyZgChekUu8gC`. Zur Unabhängigkeit ist offenzulegen:
  - Diese Sitzung wurde von der bauenden Sitzung gestartet. Sie hat auch #809 und #813 gebaut.
  - Der Startauftrag fasst den Inhalt von #815 zusammen. PR-Beschreibung, `BERICHT.md` und den Pendenzenabschnitt habe ich gelesen.
  - Die Messungen unten habe ich selbst gemacht, mit eigenen Skripten (`skalierung.cjs`, `detail.cjs`, `domvergleich.py`) und einer eigenen axe-Installation. Für die Gates habe ich die Werkzeuge des Repositorys benutzt. Das axe-Skript stammt aus dem PR, so verlangt es der Auftrag.
- **Umgebung:**
  - Node 22.23.5. Playwright 1.64.0 aus `/opt/borderline-browser/node_modules/playwright` (`PLAYWRIGHT_MODULE` gesetzt). Chromium (Headless Shell) 156.0.8078.4, Revision 1248.
  - axe-core 4.14.0, frisch installiert in einem Ordner ausserhalb des Repositorys (`npm install --ignore-scripts`; `axe.min.js` SHA-256 `20c09fe1…c46e878`).
  - Gates auf dem Arbeitsbaum von `c7d8c01`. Für die Browsermessungen lief ein lokaler Server (`python3 -m http.server`) auf `site/`. Die Kopien für den Vergleich lagen ausserhalb des Repositorys. `site/` im Repository habe ich nicht verändert; `git status` war danach leer.
  - Live: nur lesende `curl`-Abfragen an `borderline-angehoerige.netlify.app`.
- **Beilagen in diesem Ordner:**
  - `skalierung.cjs` und `skalierung.json`: alle 24 Seiten bei 320, 390 und 1280 px, mit Standardschrift 16, 32 und 48 px. Gemessen sind waagrechter Überlauf, abgeschnittener Text in Behältern mit `overflow:hidden/clip` und das Meta-Tag.
  - `detail.cjs` und `detail.txt`: wächst die Schrift jedes Elements mit (über einen festen DOM-Pfad abgeglichen), und welches Element verursacht den Überlauf bei 48 px?
  - `domvergleich.py` und `live-abgleich.txt`: Abgleich der Produktion mit `site/`.
  - `axe-ausgabe.txt`: eigener axe-Lauf.
  - `gates.txt`: Schlusszeilen der Gates.

Dies ist eine technische Nachprüfung. Sie ist keine fachliche, juristische oder institutionelle Freigabe.

## Ergebnis

**Technisch korrekt. Nachbesserung bei Ablauf und Dokumentation empfohlen, ohne Blocker.**

- Das Tag steht richtig, auf allen 24 Seiten. `site/` ändert sich nur um das Tag und die Kennung.
- Die Produktion liefert genau diesen Stand aus. Alle Gates und axe sind grün.
- Die Voraussetzungen, die PR und Nachweis nennen, sind erfüllt: Schrift in `rem`, keine Schriftgrösse an `html` am Bildschirm, kein reines `vw`. Bei 200 % wird kein Text abgeschnitten, und nichts läuft über.

Offen ist Folgendes:
- Anders als #809 bis #813 hat dieser Merge die **veröffentlichte Website** geändert. Er geschah vor jeder Nachprüfung, vor dem Ende des Codex-Reviews und ohne belegten Merge-Auftrag. Die Freigabe war laut PR noch zu bestätigen (N815-1).
- Die Pendenzendatei auf `main` ist veraltet (N815-2).
- Die Folge der Kennungen ist jetzt ungeordnet: r4-68 ist live, r4-67 (#795) ist noch offen (N815-3).
- Bei 300 % gibt es auf schmalen Bildschirmen einen waagrechten Überlauf. Er bestand schon vorher (N815-4).

## Befunde

### N815-1 · wichtig (Ablauf) · Veröffentlicht vor Nachprüfung und Codex-Ende, ohne belegten Merge-Auftrag und ohne bestätigte Freigabe

- **Beleg:**
  - PR angelegt um 16:32:23 UTC, gemergt um 16:37:48 UTC (`merged_at`).
  - Das Codex-Review wurde durch «Draft marked ready» ausgelöst. Sein Kommentar ist um 16:37:48 UTC angelegt, in derselben Sekunde wie der Merge. Abgeschlossen hat es um 16:38:21 UTC ohne Befund, also **33 Sekunden nach dem Merge**. Es gibt keine Reviews und keine Review-Threads.
  - Den genauen Zeitpunkt von «bereit zur Prüfung» habe ich nicht abgefragt. Der Codex-Kommentar zeigt aber, dass zwischen ihm und dem Merge höchstens Sekunden lagen.
  - CI `build-and-compare` war grün, 16:32:46 bis 16:33:18 UTC. Die Netlify-Prüfungen Redirect und Header waren «success», Pages changed «neutral».
  - Die PR-Beschreibung nennt als offen: «Nachprüfung durch eine andere Sitzung», «Test auf einem echten Gerät», «Merge nur auf Auftrag. Erst mit dem Merge ändert sich die veröffentlichte Website.» Unter «Zu entscheiden» steht: «`appliedTo` … Christa Egger muss das bestätigen.»
  - Einen Merge-Auftrag oder diese Bestätigung nennen weder PR, Kommentare noch der Merge-Commit `c7d8c01`. Der Merge-Commit hat nur den Standardtext.
  - Die Pendenzendatei führt R28-O01: erst mergen, wenn das Codex-Review abgeschlossen und geprüft ist.
- **Einordnung:**
  - Ob Christa Egger selbst gemergt hat, lässt sich auf GitHub nicht ablesen. Gemergt hat das Konto `christaegger-dot`.
  - Es ist dasselbe Muster wie bei N809-1 und N813-1. Neu ist: Dieser Merge hat die öffentliche Website geändert (live ab spätestens 16:45 UTC).
  - Einen Schaden habe ich nicht gefunden. Die Änderung ist ein einzelnes Meta-Tag, und alle Prüfungen sind grün (siehe unten).
- **Vorschlag:** In der Pendenzendatei vermerken: Merge um 16:37:48 UTC, Codex 33 Sekunden danach ohne Befund. Dazu den Merge-Auftrag und die Bestätigung von `appliedTo` mit Quelle, oder «auf GitHub nicht belegt». Dazu diese Nachprüfung.

### N815-2 · gering · Pendenzendatei auf `main` veraltet

- **Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:3`, `:11`, `:13`, `:23` und `:54` auf `main` (`55d006e`).
- **Beleg:**
  - Die Kopfzeile nennt «GitHub main: r4-66 (Website unverändert seit 30.10.2026), Stand `c937f8e`» und «In Arbeit: r4-68». Seit 16:37:48 UTC ist r4-68 auf `main` und live.
  - Die Kopfzeile führt [#814](https://github.com/christaegger-dot/borderline-angehoerige/pull/814) als Entwurf und [#815](https://github.com/christaegger-dot/borderline-angehoerige/pull/815) als «r4-68, Entwurf». Beide sind gemergt: #815 als `c7d8c01` um 16:37:48 UTC, #814 als `55d006e` um 16:40:15 UTC.
  - Der Abschnitt r4-68 heisst «offen seit 26.11.2026». Seine GitHub-Zeile sagt «Entwurf, nicht gemergt», «Offen» sagt «Merge nur auf Auftrag». Eine GitHub-Zeile mit Kopf, Merge-Commit, Zeit, CI und Codex fehlt, anders als bei #809 und #813.
  - Im Abschnitt B2c (`:54`) steht #814 als «Entwurf, nicht gemergt».
- **Bestätigt** (Status am 26.11.2026, kurz nach 16:45 UTC):
  - Die übrige Liste der offenen PRs stimmt mit GitHub überein. Offen sind genau #713, #793, #795, #799, #800, #801, #802, #803, #804, #805, #806 und #807. Bereit zur Prüfung sind #793, #795, #799 und #801, die anderen acht sind Entwürfe.
  - #813 stimmt: gemergt als `c937f8e` um 16:11:04 UTC über das Konto von Christa Egger.
  - Der Hinweis auf #787 stimmt (gemergt `cec2bbc`).
  - Der Abschnitt r4-68 nennt Auftrag, Inhalt, Kennung und Messwerte richtig (siehe unten). Er verweist auf den Nachweis, legt offen, wer gebaut hat, und vermerkt den Verstoss gegen die Branch-Konvention.
- **Vorschlag:** Kopfzeile auf «GitHub main: r4-68 (`c7d8c01`, live)» und `55d006e` nachführen. #814 und #815 als gemergt führen. Den Abschnitt r4-68 in «… · auf `main` seit 26.11.2026» umbenennen und eine GitHub-Zeile wie bei #813 ergänzen, mit den Angaben aus N815-1. Dazu diese Nachprüfung.

### N815-3 · gering (Entscheid) · Kennungsfolge: r4-68 ist live, r4-67 (#795) ist offen

- **Beleg:**
  - Kein offener PR trägt r4-68. Die Kennung war bei der Vergabe frei. `BUILD` der offenen PRs: #795 r4-67, #806 r4-66, sonst r4-65, r4-64 oder r4-43.
  - #795 hat als Basis `cec2bbc` (r4-66) und setzt `BUILD = 'r4-67'`.
  - Die PR-Beschreibung und der Pendenzenabschnitt regeln nur den Fall «Wird #795 **vorher** gemergt». Eingetreten ist der umgekehrte Fall.
  - Wird #795 jetzt eingebracht, gibt es Konflikte in `contract.js`, `site.config.json` und `site/`. Löst man sie zugunsten von #795, würde r4-67 **nach** r4-68 veröffentlicht. Die Kennung ginge dann zurück, und das Meta-Tag fiele heraus, falls der Seitenrahmen von #795 gewinnt.
- **Vorschlag (Entscheid Christa Egger):** Vor einem Merge von #795 festlegen, wie es weitergeht. Entweder #795 neu als r4-69 auf `main` fassen, mit dem Tag. Oder r4-67 ausdrücklich als übersprungen vermerken.

### N815-4 · gering (vorbestehend) · Bei 300 % Schrift läuft die Seite auf 320 und 390 px waagrecht über

- **Ort:** Absender oben auf jeder Seite, `.puk-site-sender__name` («Fachstelle Angehörigenarbeit der PUK»); `authoring/css/site.css:656–660`.
- **Beleg (`skalierung.json`, `detail.txt`):**
  - Mit Standardschrift 48 px läuft jede der 24 Seiten über: bei 320 px um 138 px, bei 390 px um 68 px.
  - Der Verursacher ist immer derselbe. Das Wort «Angehörigenarbeit» ist in dieser Grösse 438 px breit und kann nicht umbrechen. `overflow-wrap:anywhere` gilt nur für den Link (`.puk-site-sender a`), nicht für den Namen. Eine Silbentrennung ist dort nicht gesetzt.
  - Bei 32 px (200 %) gibt es auf keiner Seite und bei keiner Breite einen Überlauf.
- **Einordnung:** #815 hat das nicht verursacht. Der Fall wird aber erst mit dem Tag praktisch erreichbar, weil die Systemschrift nun durchschlägt. Chrome auf Android skaliert höchstens bis etwa 200 %. Dort tritt der Fehler nicht auf. 300 % ergeben sich höchstens mit zusätzlichem Zoom im Browser.
- **Vorschlag:** `overflow-wrap:anywhere` (oder `hyphens:auto`) auch für `.puk-site-sender__name`. Das ist eine Gestaltungsänderung mit eigener Kennung und gehört nicht in diesen Auftrag.

### N815-5 · Hinweis · Den Leitfaden konnte diese Sitzung nicht selbst abrufen

- **Beleg:** Der Aufruf `npx -y modern-web-guidance@latest retrieve "respect-os-text-scale"` wurde in dieser Sitzung vom Berechtigungssystem abgelehnt. Ich habe ihn nicht umgangen.
- **Folge:** Geprüft sind die Voraussetzungen, die PR, Nachweis und der Kommentar in `contract.js` aus dem Leitfaden zitieren: Schrift in `rem`, keine eigene Schriftgrösse an `html`/`:root` am Bildschirm, `vw` nur gemischt mit `rem`. Gemessen habe ich, ob sie erfüllt sind und ob die Darstellung hält (siehe unten). Ob der Leitfaden genau das verlangt, also Wortlaut und Stelle des Tags, ist durch diese Sitzung **nicht** unabhängig bestätigt.
- **Vorschlag:** Den Wortlaut bei Gelegenheit in einer Sitzung abrufen, in der `npx` erlaubt ist, und ihn im Nachweis festhalten.

### N815-6 · Hinweis · Wirkung des Tags nicht gemessen, keine Absicherung im Selbsttest

- **Beleg:**
  - Wie im Nachweis: Chromium auf dem Desktop hat keine Schriftgrösse des Betriebssystems. Ob das Tag wirkt, ist auch hier nicht messbar. Gemessen ist die Darstellung mit 200 % und 300 % Standardschrift. Die Prüfung auf einem echten Gerät (Android, Chrome) bleibt offen.
  - Kein Test verlangt das Tag. Der Selbsttest enthält kein `text-scale`. Fiele es aus `contract.js` heraus, bliebe `--verify-site` nach einem Neubau grün.
- **Vorschlag:** Optional eine Selbsttestprüfung «jede Seite trägt genau ein `meta[name=text-scale][content=scale]`».

### N815-7 · Hinweis · Kleinigkeiten

- Der Branch-Name `claude/sharp-mendel-6ecwbi` verstösst gegen die Konvention in `AGENTS.md`. Das ist offengelegt und von der Cloud-Sitzung vorgegeben.
- Die CI enthält weiterhin weder den Layouttest noch axe (N809-7).
- `axe.cjs:3` nennt im Aufruf noch `axe-r4-64.cjs`. Der Kopf sagt «unverändert bis auf diese Zeile»; das stimmt (`diff` mit `audit-results/2026-10-30-nachpruefung-r4-64/axe-r4-64.cjs`: nur Zeile 1).
- Die Umbrüche zwischen schmaler und breiter Ansicht sind teils in `px` gesetzt (`@media (max-width:760px)`, `site.css:517`, `606`, `669`, `1027`, `1036`), teils in `rem`. Bei grosser Systemschrift auf einem Handy ändert das nichts, denn der Bildschirm bleibt unter 760 px.

## Bestätigt

### 1. Technik

- **Tag:** `<meta name="text-scale" content="scale">` steht in Zeile 6, direkt nach `charset` und `viewport` und vor `description`, `title` und Stylesheet. Es steht genau einmal auf jeder der 24 Seiten, auch in `404.html` (`skalierung.json`: `meta` 24). Erzeugt wird es an einer Stelle, im Seitenrahmen `contract.js:280`. Name und Wert sind richtig geschrieben.
- **`html`/`:root`:** Die einzige Schriftgrösse an `html` ist `html{font-size:81.25%}` in `@media print` (`site.css:1754–1755`). Die `:root`-Blöcke setzen nur Eigenschaften (Variablen), keine `font-size`. Gemessen auf `verstehen.html`: `html` 16 / 32 / 48 px bei Standardschrift 16 / 32 / 48 px.
- **Einheiten:**
  - Alle 69 `font-size`-Angaben sind `rem`, `em`, `%`, `inherit` oder Variablen. Nur zwei mischen `vw`, und zwar mit `rem`: `clamp(1.375rem,1.2rem + .6vw,1.625rem)` (`:886`) und `clamp(1.1875rem,1rem + .6vw,1.375rem)` (`:894`).
  - Die Variablen in `px` aus dem Profil (`:182–191`, `:299–306`, `:325–327`) überschreibt `:337–344` mit `rem`. `--web-size-body` setzt `:385` auf `1.25rem`.
  - Die Überschriften (`--web-size-h*-fluid`) haben ein Minimum in `rem`. Reines `vw` gibt es nicht.
- **Feste Masse:**
  - In `px` sind nur Zierelemente und Hilfsklassen: Pfeile 8 und 9 px, Schliesskreuz 14 px, Schleifenzeichen 28 px, Legendenfeld 36 × 20 px, und die 1-px-Klassen für Bildschirmleser.
  - Textbehälter haben keine feste Höhe. Mindesthöhen sind `rem` oder `--web-touch-target`, `--kopf-hoehe` ist `4.75rem`.
  - Die Klassen mit `overflow:hidden` (`.puk-vis-illu`, `.puk-vis-layers`) und die Klassen mit `nowrap` (`.bl-fig__label`, `.puk-tabs`) kommen in `site/` nicht vor. Ausnahme ist `.puk-site-inline-ref a` auf 6 Seiten; dort gibt es keinen Überlauf.
- **Messung (`skalierung.json`, `detail.txt`):**
  - Abgeschnittener Text in Behältern mit `overflow:hidden/clip` und Text mit `nowrap` über den Rand: **0**, bei 200 % und 300 %, alle Seiten, 320, 390 und 1280 px.
  - Waagrechter Überlauf bei 200 %: **0**. Bei 300 % siehe N815-4.
  - Bei 320 und 390 px verdoppelt sich die Schrift jedes sichtbaren Textelements. Einzige Ausnahme: `a.puk-site-utility__link`, 16 → 30 px. Das liegt an der Regel `@media (max-width:22.5rem)` (`:675`), die bei grosser Schrift greift und `.9375rem` setzt.
  - Bei 1280 px wächst jede Schrift um den Faktor 1,35 bis 2. Der Faktor ist dort kleiner als 2, weil die Umbrüche in `rem` (zum Beispiel `72rem`, `47.5rem`) bei doppelter Schrift die schmale Ansicht wählen, mit kleineren Graden (zum Beispiel `h1` 44 → 64 px). Kein Text bleibt gleich gross.

### 2. Wirkung in `site/` (eigener Vergleich `git archive c937f8e` gegen `7ec1921`)

- 35 Dateien vorher und nachher, gleiche Dateiliste.
- **11 Nicht-HTML-Dateien byte-gleich:** `_headers`, `_redirects`, `robots.txt`, 2 SVG, `css/site.css`, `js/interaktion.js`, `fonts/OFL.txt`, 3 WOFF2. Die Quellen `authoring/css/site.css` und `authoring/js/` sind unverändert.
- **24 HTML-Dateien, auch `404.html`:** Ich habe in der neuen Fassung die Tag-Zeile entfernt und r4-68 durch r4-66 ersetzt. Danach sind alle 24 byte-gleich mit der alten Fassung. Je Seite ändern sich `data-puk-site-build`, `?v=` an Stylesheet und Skript, und die Tag-Zeile kommt hinzu. In `404.html` sind die Pfade absolut (`/css/site.css?v=r4-68`). Andere Änderungen gibt es nicht.
- **Quelle:** `contract.js` hat nur `BUILD` geändert, dazu die Tag-Zeile und einen Kommentar. `site.config.json` hat nur `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo` geändert (struktureller JSON-Vergleich).

### 3. Gates auf `c7d8c01` (`gates.txt`, `axe-ausgabe.txt`)

| Gate | #815 | gemessen |
|---|---|---|
| `node authoring/tools/selftest.mjs` | 125/125 | **125/125**, Exit 0 |
| `node authoring/tools/build.mjs --production --verify-site` | 35 Dateien byte-gleich | **35 Dateien byte-gleich**, 24 Seiten · 0 Blocker · 20 Hinweise, Exit 0 |
| `node authoring/tools/suchtest.mjs site` | 216/216 | **216/216**, JS-Fehler 0, Exit 0 |
| `node authoring/tools/sprachtest.mjs site` | 73 | **73**, JS-Fehler 0, Exit 0 |
| `node authoring/tools/layouttest.cjs` | 240 / 27 / 0 | **240 Zustände, 27 Bedienproben, 0 Abweichungen**, B2c bestanden (1992 px / 1603 px), Exit 0 |
| axe-core 4.14.0 mit `axe.cjs` aus dem PR, eigene Installation | 96 Läufe, 0 Verstösse | **build r4-68 · 24 Seiten · 96 Läufe · 0 Verstösse**, Chromium 156.0.8078.4 |

### 4. Live-Stand (`live-abgleich.txt`, 26.11.2026, 16:45 UTC)

- Die Startseite antwortet mit HTTP 200, `data-puk-site-build="r4-68"`, und das Tag steht in Zeile 6.
- 9 von 11 Nicht-HTML-Dateien sind byte-gleich mit `site/`, auch `css/site.css?v=r4-68`. `_headers` und `_redirects` liefert Netlify erwartungsgemäss nicht aus (404).
- Die 24 HTML-Seiten sind nicht byte-gleich. Netlify schreibt beim Ausliefern Links um, zum Beispiel `href="index.html"` zu `href='/'`. Das war schon bei der Nachprüfung r4-58 bekannt. Nach dem Abgleich im Parser (Attribute sortiert, die umgeschriebenen `href` zurückgeführt) sind **24 von 24 im Dokumentbaum gleich**.
- `/verstehen` liefert 200 mit `x-robots-tag: noindex, nofollow`. Eine Seite, die es nicht gibt, liefert 404.
- Die Produktion entspricht damit `site/` von `c7d8c01`, also auch von `55d006e`.

### 5. Freigabe und Kennung

- **Kennung:** r4-67 trägt #795 (`BUILD = 'r4-67'`, offen, bereit zur Prüfung, Entscheid vom 30.10.2026). Kein anderer offener PR trägt r4-67 oder r4-68. Die Vergabe von r4-68 ist damit richtig. Zur Folge siehe N815-3.
- **`appliedTo`:**
  - Der neue Eintrag folgt dem Muster der früheren Releases: «rX am Datum im Auftrag «…» auf denselben fortgeltenden Entscheid gestützt, gebaut von …, Nachweis …».
  - Ebenfalls ergänzt ist «r4-66 am 30.10.2026 gemergt (PR #787)». Das stimmt: `cec2bbc`, 11:46 UTC.
  - Die übrigen Felder des Verzichts sind unverändert: Entscheid vom 18.10.2026, Christa Egger, Wortlaut «ich will keine unabhänige gesamtprüfung mehr machen», Verweis auf `ENTSCHEIDE.md`.
  - Es fehlt noch der Eintrag «r4-68 am 26.11.2026 gemergt (PR #815)». Ihn haben frühere Releases jeweils mit dem nächsten Release ergänzt.
  - Dass der Verzicht für r4-68 gilt, hat Christa Egger auf GitHub nicht bestätigt (N815-1).
- **Merge-Auftrag:** Auf GitHub nicht belegt (N815-1).
- **Codex:** «Completed» ohne Befund um 16:38:21 UTC auf `7ec1921`, nach dem Merge. Keine Review-Threads.

### 6. Pendenzendatei

Siehe N815-2. Den Inhalt des Abschnitts r4-68 bestätigen die Messungen oben. Nur der Status ist veraltet.

## Was diese Prüfung nicht getan hat

- Keine Korrektur an Werkzeug, Inhalt, Konfiguration, Stylesheet oder Pendenzendatei.
- Keine Änderung in `site/`. Kein Kommentar auf #815. Kein Merge, kein Deployment, keine Änderung an Netlify-Einstellungen.
- Den Leitfaden habe ich nicht abgerufen (N815-5). Auf einem echten Gerät habe ich nicht getestet (N815-6).
- N815-2 bis N815-4 schlagen Nachführungen vor. Sie bleiben einem eigenen Auftrag vorbehalten.
