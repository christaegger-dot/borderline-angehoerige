# Nachprüfung r4-66 · PR #787 · 30.10.2026

## Auftrag, Stand, wer prüft

- **Auftrag:** Christa Egger (Fachstelle Angehörigenarbeit), 30.10.2026: «Nachprüfung r4-66 starten». Den Auftrag hat die Sitzung weitergegeben, die die Nachprüfung r4-65 verfasst hat ([PR #793](https://github.com/christaegger-dot/borderline-angehoerige/pull/793)).
- **Gegenstand:** [PR #787](https://github.com/christaegger-dot/borderline-angehoerige/pull/787), Branch `pruefung/2026-10-30-nachpruefung-r4-61` (Name historisch), Kopf **`13f471f`**, Ziel `main` = `a323fed`. Dazu der Vergleich mit `19a72dc` (r4-65, #784).
- **Während der Prüfung:**
  - Um 11:14:09 UTC kam der neue Kopf **`b87dbf5`** dazu. Das ist nur ein Merge von `main` `dd884e6` (#797), aufgelöst in der Pendenzendatei.
  - `main` stand bei Beginn auf `dd884e6` und beim Abschluss auf `ec821ab` (#798). Beide ändern nur die Pendenzendatei.
  - `authoring/` und `site/` sind auf `b87dbf5` gegenüber `main` gleich wie auf `13f471f` gegenüber `a323fed`. Der Diff ist byte-gleich (`diff <(git diff origin/main b87dbf5 -- authoring/ site/) <(git diff a323fed 13f471f -- authoring/ site/)` ist leer).
  - Alle Befunde zur Regel gelten deshalb für beide Köpfe.
- **Wer prüft:** eine Sitzung, die weder N61-2 gebaut noch r4-66 neu gefasst hat und keine frühere Nachprüfung dazu verfasst hat. Sie ändert keine Inhalte und keinen Code. Committet wird nur dieser Ordner.
- **Eigene Werkzeuge:** Alle Kennzahlen sind mit eigenen Skripten in diesem Ordner neu gerechnet. Die Skripte von #793 und aus dem Selbstbericht sind nicht verwendet. Gerechnet ist in Arbeitsbäumen ausserhalb des Repositorys; `site/` ist nirgends beschrieben.
- **Abweichung bei Branch und Ordner:** Der vorgegebene Branch `pruefung/2026-10-30-nachpruefung-r4-66` existierte bereits, von einer anderen Sitzung (PR #800, Entwurf, «Nachprüfung r4-66», `76613e2`). Er ist nicht überschrieben. Ebenso existierte `…-r4-66-b` (PR #803). Diese Nachprüfung liegt deshalb auf `pruefung/2026-10-30-nachpruefung-r4-66-c`, im Ordner `audit-results/2026-10-30-nachpruefung-r4-66-c/`. Mit dem Ordner von #800 gibt es so keinen Konflikt (siehe N66-1).

## Befunde

### N66-1 · wichtig · Drei parallele Nachprüfungen r4-66 (R29-P20)

**Ort:** offene Entwurfs-PR #800 (`pruefung/2026-10-30-nachpruefung-r4-66`, `76613e2`, 11:13:36 UTC) und #803 (`…-r4-66-b`, `9352ff8`, 11:17:29 UTC), dazu dieser PR.

**Beleg:**
- `git ls-remote origin 'refs/heads/pruefung/2026-10-30-nachpruefung-r4-66*'` liefert:
  ```
  76613e2…	refs/heads/pruefung/2026-10-30-nachpruefung-r4-66
  9352ff8…	refs/heads/pruefung/2026-10-30-nachpruefung-r4-66-b
  ```
- Beide PR heissen «Nachprüfung r4-66», beide kommen zum Ergebnis «Nachbesserung nötig, ohne Blocker» (Commit-Betreff).
- #800 legt `audit-results/2026-10-30-nachpruefung-r4-66/` an, also den Ordner, den auch dieser Auftrag vorschreibt.
- #803 ändert zusätzlich `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md` (`git diff --name-only origin/main...origin/pruefung/2026-10-30-nachpruefung-r4-66-b`). Das ist bei einer Nachprüfung nicht vorgesehen und überschneidet sich mit der Pendenzen-Nachführung.

Ähnlich bei r4-65: #799 («Nachprüfung r4-65 (gemergter Stand, #784)») und #801 («Nachprüfung r4-65 (PR #784)») prüfen beide #784, neben #793 zur früheren Fassung von #787. R29-P20 verlangt genau einen PR je Änderung. Mehrere Prüfberichte zum selben Stand mit eigenen Nummern N66-… machen die Befundnummern mehrdeutig.

**Vorschlag:** Christa Egger entscheidet, welche Nachprüfung r4-66 gilt. Die anderen werden geschlossen oder ausdrücklich als Zweitprüfung gekennzeichnet, und die Befundnummern erhalten ein Präfix. Künftig vergibt eine Sitzung den Auftrag nur einmal.

### N66-2 · gering · Abschnitt r4-66 der Pendenzendatei teils überholt

**Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md:11` und `:24` auf `b87dbf5` (auf `13f471f`: `:11`, `:25`). Dazu `:39` auf `main`.

**Beleg:**
- **«Entwurf»:** Die Datei nennt #787 «Entwurf, **nicht gemergt**». Laut GitHub-API ist #787 kein Entwurf mehr (`"draft": false`). Codex vermerkt als Auslöser «Draft marked ready» (Kommentar um 11:12:00 UTC).
- **N65-3:** Der Satz «Der Kopf dieser Datei ist nur um r4-66 ergänzt; den Merge von r4-65 führt er noch nicht nach» stimmt auf `b87dbf5` nicht mehr. Der Kopf stammt jetzt aus `main` und nennt r4-65 als Stand von `main`.
- **`main`:** Die Datei auf `main` (`:39`) nennt «#787, Entwurf, Kopf `13f471f`». Der Kopf ist inzwischen `b87dbf5`.

**Vorschlag:** Beim nächsten Angleichen den Status «bereit zur Prüfung» und den aktuellen Kopf eintragen und den Satz zu N65-3 streichen. Laut L2 gehört das in einen einzigen Pendenzen-PR.

### N66-3 · gering · `13f471f` liess sich nicht konfliktfrei in das aktuelle `main` mergen (inzwischen behoben)

**Ort:** `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`.

**Beleg:** `merge-ausgabe.txt`:
```
## 2. #787 in aktuelles main dd884e6
exit 1 · Konflikte: 1
CONFLICT (content): Merge conflict in PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md
```
Der Konflikt entstand durch #797. Der neue Kopf `b87dbf5` löst ihn. Er ist auch gegen `ec821ab` konfliktfrei (`## 7 … Konflikte: 0`).

Als Gegenprobe ist der Merge `dd884e6` + `13f471f` lokal hergestellt, mit der Pendenzendatei aus `main`, ohne Push (`merge-probe-ausgabe.txt`):
- `0 Blocker · 20 Hinweise`
- `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/`
- `Selbsttest: 125/125 bestanden`
- `Suchtest: 216 von 216`

**Vorschlag:** keiner, nur festgehalten. Die Nachprüfung gilt für den Code auf beiden Köpfen.

## Bestätigtes

### 1. Diff gegenüber `main`

- **Dateiliste:** `git diff --stat a323fed 13f471f` umfasst 38 Dateien:
  - `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`;
  - `audit-results/` (3 Nachweisordner);
  - `authoring/site.config.json`;
  - `authoring/tools/contract.js`;
  - 24 Dateien in `site/`.
- **`contract.js`:** Der Diff zeigt nur Folgendes (Zeilen auf `13f471f`):
  - `:11` `BUILD = 'r4-66'`;
  - `:47–52` Kommentar, `ctlTxt` und das neue `accTxt`;
  - `:745–746` zwei `MUTATIONS`;
  - `:937–941` die Gegenprobe.
- **Gleich wie `f7f8d18`:** `git diff f7f8d18 13f471f -- authoring/tools/contract.js` zeigt in den N61-2-Teilen nur «r4-65» → «r4-66». Die übrigen Unterschiede sind die Kommentare «r4-62» → «r4-65» aus #784, also der Stand von `main`.
- **`site.config.json`:** Ein eigener JSON-Vergleich (Node, Schlüssel für Schlüssel) ergibt genau vier Änderungen:
  - `assetVersion`: r4-65 → r4-66;
  - `independentReviewWaiver.version`: r4-65 → r4-66;
  - `pendingScope`: Die Fassung von `main` (13 254 Zeichen) ist exakt das Ende der neuen Fassung (`endsWith` = true). Davor steht nur der Eintrag «r4-66 (Befund N61-2 … begonnen als r4-65 in PR #787): … Vorher: »;
  - `appliedTo`: beginnt mit der Fassung von `main` (`startsWith` = true). Ergänzt ist nur «; r4-65 am 30.10.2026 gemergt (PR #784); r4-66 … Nachweis audit-results/2026-10-30-n61-2-r4-66/BERICHT.md».
- **Pendenzendatei:** Auf `13f471f` sind der Hinweis am Anfang des Kopfs und der Abschnitt «Korrektur · r4-66» (`:9–25`) neu. Auf `b87dbf5` ist es gegenüber `main` nur dieser Abschnitt.
- **`site/`:** Alle 35 Dateien sind gleich wie auf `a323fed`, wenn man in `13f471f` «r4-66» durch «r4-65» ersetzt (`diff -rq` leer, Ausgabe «SITE_IDENT_BIS_AUF_KENNUNG»). Pro Seite ändern sich drei Zeilen: `data-puk-site-build`, `site.css?v=` und `interaktion.js?v=`.
- **Unverändert:** `git diff --stat a323fed 13f471f` ist leer für:
  - Fragmente `authoring/content/`;
  - Stylesheet `authoring/css/`;
  - Skript `authoring/js/`;
  - `build.mjs`, `search-index.mjs` und die anderen Testwerkzeuge;
  - `authoring/tests/suche-ersttreffer.tsv`.

  Der Renderer liegt in `contract.js` (`renderPage`) und ist ausserhalb von N61-2 unverändert. Akuthinweise und Sprungziele stehen in den Fragmenten und im Renderer; die Seiten sind bis auf die Kennung byte-gleich.
- **Copilot-Fassung:** Der Copilot-Merge `d4bc6cf` hat nur in der Pendenzendatei eigene Zeilen, also Zeilen, die in keinem Elternteil `9033857` oder `7a21ee5` stehen. Es sind 3, und davon steht keine in `13f471f` (`copilot-ausgabe.txt`). `site.config.json` auf `13f471f` ist `main` plus r4-66, siehe oben.

### 2. Kennung

- **Durchgehend r4-66:**
  - `contract.js:11`;
  - `site.config.json:5` (`assetVersion`), `:37` (`pendingScope`), `:39` (`independentReviewWaiver.version`), `:44` (`appliedTo`);
  - `site/`: 24 × `data-puk-site-build="r4-66"` (`git grep -h -o … | uniq -c`).
- **Vermerk zum Entscheid:** Der Absatz «**Kennung bestätigt:** … «#787 behält r4-66», #795 wird r4-67 …» steht wortgleich in der Pendenzendatei (`:13`) und in `audit-results/2026-10-30-n61-2-r4-66/BERICHT.md` (Shell-Vergleich: «Vermerk wortgleich»). Er stimmt mit der Antwort im Review-Faden zu L1 überein (11:00:54 UTC).
- **#795:** Kopf `51b9b1e`, `contract.js:11` `const BUILD = 'r4-67';`, `site.config.json:5` `"assetVersion": "r4-67"`. Titel: «r4-67 (begonnen als r4-66) …» (nur Feststellung).

### 3. Gate-Regeln gegen Chromium

**Methode:** `gate-cdp-r4-66.mjs` rendert wie `build.mjs`:
- `C.renderPage` mit `injectSearchIndex`;
- `C.gate` im Modus `production`;
- `report` aus `PRUEFBERICHT.md`;
- `exists` wie dort.

Es gibt 47 Fälle an 4 Orten, zusammen 188 Mutationen:
- Zeile `z` bei 1280 px;
- Menü `m` bei 300 px, also unter 20 rem, geöffnet;
- Rückfall ohne `utilityNav`, Zeile `rz` und Menü `rm`.

Chromium 153.0.8010.12 liefert den Namen des Links über CDP (`DOM.querySelector` → `Accessibility.getPartialAXTree`). Dieselben Mutationen laufen gegen r4-65 in einem Arbeitsbaum von `a323fed`. Ausgabe: `gate-cdp-ausgabe.txt`.

| | übereinstimmend | falsch-negativ | falsch-positiv (strenger) |
|---|---|---|---|
| r4-66 | 164 | 4 | 20 |
| r4-65 (`main`) | 120 | 60 | 8 |

- **Behoben:** In r4-66 sind 56 Falsch-Negative von r4-65 behoben, zum Beispiel:
  - `img alt="Mehr"`, auch in einem sichtbaren Zwischenelement (I17) und mit `ALT` in Grossbuchstaben (I18);
  - `input` mit `value` für `button`, `submit`, `text` und ohne `type`;
  - `submit`/`reset` ohne `value` (Chromium: «Submit»/«Reset»);
  - `placeholder` (I7: «Kurz und klar Mehr»);
  - `type=image`, `number` und `range` («… 50»).
- **Richtig frei:**
  - `alt=""`;
  - `img` ohne `alt`;
  - verborgen über `hidden`, `inert` oder `aria-hidden` am Bild, am Feld oder an einem Zwischenelement (I8–I13, N13, N14);
  - `type=hidden` und `HIDDEN`;
  - `area`, auch in `map`;
  - leerer `button` und leere `textarea`.
- **Weiterhin richtig blockiert (wie r4-65):** `button`, `select` (auch mit zwei Optionen) und `textarea` mit «Mehr».
- **Verbleibende Falsch-Negative (4):** nur I6, also `img` ohne `alt` mit `title="Mehr"`, an allen vier Orten (Chromium: «Kurz und klar Mehr»). Das ist N65-5, unverändert.
- **Falsch-Positive (20), alle strenger:**
  - I14/I15: `img alt="Mehr"` mit `role="presentation"` oder `role="none"`. Chromium lässt den Alternativtext weg, das Gate zählt ihn;
  - I16: `style="display:none"`. Das Gate wertet kein CSS aus, eine bekannte Grenze des Parsers;
  - N6: `input type=text` ohne Wert (`[Eingabefeld]`, so kommentiert);
  - N10: `checkbox`.

  Alle fünf Muster sind in einem Link ohnehin unerwünscht, keines kommt auf den Seiten vor. Sie schwächen die Prüfung nicht ab.
- **Lockerung gegenüber r4-65 (N65-4):** I4 und N16, also `img alt` oder `input value` gleich der Beschriftung statt des Textes. Chromium nennt den Link richtig «Kurz und klar», darum hier «richtig frei». r4-65 hat beides blockiert, r4-66 nicht mehr. Ohne sichtbaren Text besteht der Eintrag also.
- **Fehlerseite:** `404.html` hat keine Zeile «Direkteinstiege» und keine Menüeinträge `puk-site-menu__utility-link` (Zähler 0). Ein `<img alt="Mehr">` in einem Menülink ergibt 0 Blocker. Eine künstlich ergänzte Zeile ergibt nur den `nav`-Befund «Direkteinstiege im Menü weichen vom Seitenvertrag ab: leer …». `accTxt` wirkt dort also nicht.
- **Verwendung von `accTxt`:** `grep -n accTxt contract.js` findet nur:
  - die Definition (`:52`);
  - einen Kommentar (`:35`);
  - `utilityOf` (`:541`, Zeile «Direkteinstiege»);
  - `menuUtility` (`:566`, Menü).

  Es wird also nur für Direkteinstiege verwendet.
- **Selbsttestfälle greifen** (`selbsttest-varianten-ausgabe.txt`, Kopie von `authoring/` ausserhalb des Repositorys):

  | Variante | Ergebnis |
  |---|---|
  | V0 unverändert | 125/125 |
  | V1 ohne `ctlTxt` (wie r4-65) | 123/125, genau die zwei N61-2-Fälle scheitern |
  | V2 nur `img` | 124/125, nur der `input`-Fall scheitert |
  | V3 nur `input` | 124/125, nur der `img`-Fall scheitert |

  Jeder neue Fall prüft also seinen eigenen Zweig. Ohne Wirkung bleiben vier falsche Fassungen, je 125/125:
  - V4: `ctlTxt` vor `hiddenFlag`;
  - V5: `alt` ohne Leerzeichen;
  - V6: `img` ohne `alt` als «[Bild]»;
  - V7: `type=hidden` zählt mit.

  V4 und V7 entsprechen N65-6. Ein Fehler in V4 oder V7 fiele aber im Abgleich oben auf (I8–I10, N8).

**N65-4 bis N65-6** (nicht im Auftrag, nur Feststellung):
- **N65-4:** besteht weiter (I4, N16).
- **N65-5:** besteht weiter (I6).
- **N65-6:** besteht weiter (V4 bis V7).

Die Regel ist gegenüber `f7f8d18` unverändert.

### 4. Tests und Gate: abgeschwächt, gleichwertig oder verschärft?

- **Selbsttest:** verschärft. Dazu kommen zwei `MUTATIONS` und eine Gegenprobe. Kein bestehender Fall ist entfernt, und keine Erwartung ist geändert. Der Diff zeigt in `MUTATIONS` und `selftest` nur Zeilen mit `+`. Die Zahl steigt von 122 auf 125.
- **Gate:** insgesamt verschärft, in zwei Mustern gelockert:
  - Falsch-Negative sinken von 60 auf 4.
  - In 76 Mutationen blockiert r4-66 neu (Spalte «Änderung» in `gate-cdp-ausgabe.txt`).
  - 8 sind gelockert: I4 und N16 an je vier Orten (N65-4). Das entspricht Chromium, aber nicht mehr der sichtbaren Beschriftung.
  - Andere Prüfungen sind nicht berührt; ausserhalb von N61-2 ist `contract.js` unverändert.

### 5. Tests auf `13f471f`

Node v22.22.0, `PLAYWRIGHT_MODULE=$(npm root -g)/playwright`, Arbeitsbaum ausserhalb des Repositorys (`tests-ausgabe.txt`):

| Befehl | Ergebnis |
|---|---|
| `node authoring/tools/build.mjs --production` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel dist/site` |
| `… --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| `node authoring/tools/selftest.mjs` | `Selbsttest: 125/125 bestanden` |
| `node authoring/tools/suchtest.mjs dist/site` | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| `node authoring/tools/sprachtest.mjs` | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| `node authoring/tools/layouttest.cjs` | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` / `tension core exceeds 1800px`, Exit 1 (bekannte Ausnahme B2c) |

Kurzprobe auf `b87dbf5`: `PARITÄT BESTANDEN: 35`, `0 Blocker · 20 Hinweise`, `125/125`.

### 6. Barrierefreiheit (Stichprobe)

axe-core 4.14.0 ist in einem eigenen Ordner ausserhalb des Repositorys installiert. Es wird per `page.addScriptTag` geladen, auf allen 24 Seiten von `dist/site` (Build `13f471f`, über `http-server`) bei 390 und 1280 px:

`axe 4.14.0 · Build r4-66 · Seiten 24 · Läufe 48 · Verstösse 0` (`axe-ausgabe.txt`).

### 7. Merge und Review

Stand von #787 beim Abruf um 11:13 bis 11:25 UTC:
- **Status:** nicht Entwurf (`draft: false`), offen, `mergeable_state: unknown`. Copilot ist weiterhin zugewiesen, und ein Check «copilot» läuft seit 11:12:23 UTC (`in_progress`).
- **Codex:** Auf `13f471f` um 11:11:57 UTC «⚠️ Failed», Nutzungslimit erreicht (Kommentar 11:12:03 UTC). Kein abgeschlossenes Codex-Review.
- **Review-Threads:** 3, alle offen (`is_resolved: false`):
  - L1: entschieden, #795 trägt r4-67;
  - Regel `ctlTxt`: ohne Befund;
  - L2: Pendenzen; Antwort «erst nach der Nachführung angleichen».

  Folge-Review auf `13f471f`: «L1 erledigt; L2 und L3 offen».
- **CI auf `13f471f`:**
  - `build-and-compare` success (11:00:57 bis 11:01:53 UTC);
  - Netlify-Prüfungen success bzw. neutral;
  - Deploy Preview bereit.
- **Merge** (`merge-ausgabe.txt`, `merge-probe-ausgabe.txt`, nur `git merge-tree`; der lokale Probe-Merge ist nicht gepusht):

  | Probe | Ergebnis |
  |---|---|
  | `13f471f` in `a323fed` | konfliktfrei |
  | `13f471f` in `dd884e6` | 1 Konflikt, Pendenzendatei (N66-3) |
  | `b87dbf5` in `ec821ab` | konfliktfrei |
  | Merge-Stand `dd884e6` + `13f471f` | Tests bestanden (siehe N66-3) |
  | #795 (`51b9b1e`) allein in `ec821ab` | konfliktfrei |
  | #787 und #795 nacheinander, gleich in welcher Reihenfolge | 26 Konflikte: `site.config.json`, `contract.js`, 24 × `site/*.html` (zuerst #795, dann `13f471f`: dazu die Pendenzendatei) |

  Die Konflikte bei #787 und #795 kommen von den Kennungen r4-66 und r4-67 und den beiden Regeländerungen. Wer als Zweiter merged, muss `main` einbringen, `contract.js` und `site.config.json` von Hand zusammenführen und `site/` neu bauen. So beschreibt es auch #795 («zuerst #787 (r4-66). Danach bringt dieser PR `main` ein und baut neu»).
- **R29-P20:**
  - Für die Änderung N61-2 gibt es genau einen Code-PR (#787). Eingehalten.
  - Für die Pendenzen-Nachführung lagen #797 und #798 parallel vor und sind beide gemergt. #787 selbst ändert die Pendenzendatei ebenfalls (L2, offen).
  - Für die Nachprüfung r4-66 gibt es drei PR (N66-1). Nicht eingehalten.

### 8. Live-Site (nur Hinweis)

`curl -sS https://borderline-angehoerige.netlify.app/` um 11:22:05 UTC: `HTTP 200`, `data-puk-site-build="r4-65"`. Ebenso `/kurz.html` und die Fehlerseite (`HTTP 404`, r4-65). r4-66 ist nicht veröffentlicht (`live-ausgabe.txt`).

## Nicht prüfbar

- echte Screenreader (NVDA, JAWS, VoiceOver, TalkBack);
- Safari und Firefox mit ihren Zugänglichkeitsbäumen;
- reale Geräte;
- Zoom auf 200 % mit Systemschrift;
- ob der Copilot-Check auf #787 noch Commits erzeugt;
- welcher der Entscheide aus den Sitzungen von Christa Egger gilt, soweit er auf GitHub nicht belegt ist. Hier zählt nur das, was in Dateien und Review-Faden steht.

## Empfehlung

**Nachbesserung nötig, ohne Blocker.**

Die Regel N61-2 erfüllt ihren Zweck:
- Die Falsch-Negativen gegenüber Chromium sinken von 60 auf 4.
- Die neuen Selbsttestfälle greifen.
- Die Seiten sind bis auf die Kennung byte-gleich mit `main`.
- Alle Tests bestehen, axe meldet 0 Verstösse.

Nachzubessern ist:
- **N66-1:** Entscheid, welche der drei Nachprüfungen r4-66 gilt;
- **N66-2:** Pendenzendatei angleichen;
- offen und nicht im Auftrag: N65-4 bis N65-6.

Für den Merge braucht es weiterhin einen Entscheid von Christa Egger, weil Codex nicht abgeschlossen hat. Ausserdem muss die Merge-Reihenfolge mit #795 feststehen.

## Beilagen

- `gate-cdp-r4-66.mjs`, `gate-cdp-ausgabe.txt`: Mutationen über `C.gate` und Abgleich mit Chromium (CDP), r4-66 und r4-65;
- `selbsttest-varianten-r4-66.sh`, `selbsttest-varianten-ausgabe.txt`: Rückproben zum Selbsttest;
- `axe-r4-66.mjs`, `axe-ausgabe.txt`: axe-core;
- `tests-ausgabe.txt`: Testläufe auf `13f471f` und Kurzprobe auf `b87dbf5`;
- `merge-ausgabe.txt`, `merge-probe-ausgabe.txt`: Merge-Proben;
- `copilot-ausgabe.txt`: Rückstände des Copilot-Merges;
- `live-ausgabe.txt`: Abfrage der Live-Site.

In den Beilagen steht `<Prüfordner>` an Stelle des lokalen Arbeitsverzeichnisses.
