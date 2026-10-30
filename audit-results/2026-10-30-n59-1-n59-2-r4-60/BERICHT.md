# N59-1 und N59-2 · r4-60 · 30.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N59-1 und N59-2 umsetzen».

- **Ausgangsstand:** `main` = `18e0d750` (r4-59, PR #769; Nachtrag zu N54-2, PR #768 und #770). Danach ist `main` = `330a9afa` per Merge eingebracht: Nachprüfung r4-59 (PR #772) und Pendenzen (PR #773).
- **Befunde:** aus der gültigen Nachprüfung r4-59, `audit-results/2026-10-30-nachpruefung-r4-59/NACHPRUEFUNG.md` (PR #772, gemergt).
  - Die parallele Nachprüfung PR #771 dieser Sitzung ist ohne Merge geschlossen. Dort trug N59-2 einen anderen Inhalt (Pendenzendatei).
  - Massgeblich ist die Nummerierung von #772:
    - **N59-1:** `aria-hidden` wie Chromium;
    - **N59-2:** Regel `sender` und SVG-Prüfung.
  - Die Pendenzendatei (N59-5 in #772) führen PR #773 und #774 nach. r4-60 ändert sie nicht.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfung r4-58 und die geschlossene Nachprüfung #771 erstellt hat. N59-1 geht auf eine falsche Angabe dieser Sitzung in der Nachprüfung r4-58 zurück. Die Nachprüfung von r4-60 muss eine andere Sitzung machen.

## Befunde (nach Nachprüfung r4-59, PR #772)

- **N59-1 (wichtig):** Die Regel galt `aria-hidden` nur bei `true` (jede Schreibweise) als verbergend.
  - Chromium verbirgt laut Zugänglichkeitsbaum (CDP) aber bei jedem Wert ausser `false` (jede Schreibweise) und leer, also auch bei `" true "`, `"yes"`, `"0"` oder `" false "`. Auch `undefined` verbirgt nicht (eigene Messung der Sitzung #771).
  - Kommentar, Selbstbericht r4-59 und Nachprüfung r4-58 (D8) hielten das Gegenteil fest.
  - Dazu kam eine Falschmeldung: Ein dekoratives `<span aria-hidden=" true "> →</span>` blockierte (P4.6).
- **N59-2 (gering):** Die Regel `sender` (Absenderin versteckt) und die SVG-Prüfung in Abbildungen verglichen exakt mit `aria-hidden === 'true'` und kannten `inert` nicht.
  - Ein Kopf mit `inert` oder `aria-hidden="TRUE"` blieb ohne `sender`, auch auf der Fehlerseite.
  - Ein SVG mit `aria-hidden="TRUE"` ohne `<title>` hätte `figure-alt` ausgelöst, obwohl es verborgen ist.

## Umsetzung

Alles in `authoring/tools/contract.js`:

- **N59-1, `hiddenFlag` (`:38–39`):** `aria-hidden` verbirgt, wenn das Attribut vorhanden ist und sein Wert in Kleinschrift nicht `false`, `undefined` oder leer ist.
  - Leerraum wird nicht entfernt, wie in Chromium: `" false "` verbirgt dort.
  - `hidden` und `inert` gelten wie bisher.
  - `concealed` und `accTxt` nutzen `hiddenFlag`, also gilt die Regel für Zeile, Menü, Vorfahren und Linktext.
  - Kommentar `:35–37` berichtigt, mit Beleg.
- **N59-2:**
  - Die Regel `sender` (`:480–481`) nutzt `hiddenFlag` statt des eigenen Vergleichs. Die Prüfung auf `display:none`, `visibility:hidden` und versteckte Klassen bleibt.
  - Die SVG-Prüfung (`:634–635`) gilt ein SVG als ausgeblendet, wenn `hiddenFlag` am SVG oder an einem Vorfahren zutrifft.
- **Selbsttest, sechs neue Fälle und eine Gegenprobe** (111 statt 104):
  - N59-1: Zeile mit `aria-hidden=" true "` (`utility-nav`) und Menüeintrag mit `aria-hidden="yes"` (`nav`), `:709–710`.
  - N59-1, Gegenprobe: `aria-hidden` mit `false`, `FALSE`, `undefined` und leer an Zeile und Menü löst weder `nav` noch `utility-nav` aus.
  - N59-2:
    - `inert` am Kopf von `index` (`sender`);
    - `aria-hidden="TRUE"` auf `.puk-site-subbar` (`sender`);
    - `inert` am Kopf der Fehlerseite (`sender`).
  - N59-2: SVG der Szene auf `verstehen` mit `aria-hidden="TRUE"` löst kein `figure-alt` aus.

**Berichtigung der Nachweise** (nach dem Vorschlag zu N59-1, als Berichtigung gekennzeichnet):
- `audit-results/2026-10-30-nachpruefung-r4-58/NACHPRUEFUNG.md`: N58-1 (Beleg Chromium) und Tabellenzeile D8.
- `audit-results/2026-10-30-n58-1-n58-2-r4-59/BERICHT.md`: Umsetzung `hiddenFlag`, Wirkung D8 und der Satz zu Falsch-Positiven.

Die Beschreibungen der gemergten PR #765 und #769 sind nicht geändert. Die Pendenzendatei berichtigt PR #774.

**Build-Kennung r4-60:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet, kein Skript und kein Renderer ist geändert.

**Nicht umgesetzt:** N59-3 (`aria-label` an einem `<span>` im Link) und N59-4 (Merge von #768 vor dem Codex-Review) gehören nicht zum Auftrag.

## Wirkung

**Seiten:** Die 35 Dateien in `site/` sind bis auf die Build-Kennung byte-gleich mit r4-59. Geprüft mit `md5sum` je Datei nach Ersetzen der Kennung: 0 Abweichungen. Im Diff von `site/` sind genau 72 Vorkommen von «r4-59» durch «r4-60» ersetzt.

**Neue Fälle greifen:** Ich habe in einer Kopie von r4-60 `hiddenFlag`, die Regel `sender` und die SVG-Prüfung auf die Fassung von r4-59 zurückgesetzt. Ergebnis: `Selbsttest: 105/111 bestanden`.
- Genau die sechs neuen Fälle scheitern, darunter `SVG mit aria-hidden="TRUE" gilt als ausgeblendet … erhalten: figure-alt`.
- Die Gegenprobe zu N59-1 besteht auch mit r4-59. Sie sichert gegen eine zu strenge Regel, nicht gegen die Lücke.

**Prüfskript der Nachprüfung r4-59 (#772)**, `audit-results/2026-10-30-nachpruefung-r4-59/mutationen.mjs`, gegen r4-59 (`18e0d750`) und r4-60. Die Ausgabe steht in `mutationen-nachpruefung-r4-59-ausgabe.txt`. Neu blockiert sind:
- **`" true "` und `"true "`:** P1.3, P1.4 (Zeile), P1.10, P1.11 (Zeilenlink), P1.17, P1.18 (Menü-`<li>`), P1.24, P1.25 (Menülink), P1.31, P1.32 (Subbar) und P1.38, P1.39 (Kopf).
- **`sender` neu dazu:** P1.29 bis P1.32 (Subbar), P1.36 bis P1.39 (Kopf), P2.5 und P2.6 (`inert` auf Subbar und Kopf).
- **Fehlerseite:** P6.3 (`inert`) und P6.4 (`aria-hidden="TRUE"`) melden `sender`.
- **Falschmeldung weg:** P4.6, dekoratives `<span aria-hidden=" true "> →</span>`, ergibt keinen Blocker mehr.

**Abgleich mit Chromium** (`abgleich-chromium.py`, Ausgabe in `abgleich-chromium-ausgabe.txt`):
- **Grundlage:** die von #772 in Chromium gemessenen Ergebnisse (`aria-ausgabe.txt`: Zeilenlink, Menülink und Absenderin verborgen oder ihr Name), verglichen mit den Gate-Ergebnissen.
- **Ergebnis:** In 87 Fällen weichen Gate und Chromium bei r4-59 in **27** Fällen ab, bei r4-60 in **6**:
  - P5.1, P5.2 und P5.3: Die Regel blockiert absichtlich jedes `aria-label` oder `aria-labelledby` am Link, auch wenn der Name gleich bleibt (seit r4-58, strenger als WCAG 2.5.3).
  - P5.4: `aria-label` an einem `<span>` im Link, Befund N59-3 von #772, nicht im Auftrag.
  - P7.1 und P7.2: `display:none` über `style`, die bekannte Grenze der statischen Prüfung.

**Eigenes Prüfskript der Nachprüfung r4-58, erweitert um G1–G12** (`mutationen.mjs`, Ausgabe in `mutationen-ausgabe.txt`):
- **Neu blockiert:**
  - D8, F4, G1–G6 und G11 (verschiedene Werte von `aria-hidden`);
  - F7 und F8 (`inert` auf Subbar und Kopf) neu auch `sender`;
  - F20 (Fehlerseite, `inert` am Kopf): `sender`.
- **Keine Meldung, also keine Falsch-Positiven:**
  - G7 `False`, G8 `undefined`, G9 leer, G10 ohne Wert;
  - A13–A16, F3, F15 (`false`);
  - der Bestand und E1 (Rückfall).

**Chromium-Ergänzung** (`chromium-ergaenzung.cjs`, Ausgabe in `chromium-ergaenzung-ausgabe.txt`):
- `aria-hidden` ohne Wert: Der Link heisst «Kurz und klar».
- Linktext in `<span aria-hidden="yes">`: Der Name ist `""`.
- Dekoratives `<span aria-hidden="false"> →</span>`: Der Name ist «Kurz und klar →».

Das Gate entscheidet in allen drei Fällen gleich (G10, G11, G12).

**Grenze:** Firefox und Safari sind nicht geprüft. Die Regel folgt Chromium und ist damit im Zweifel strenger. Ein SVG unter einem Vorfahren mit `hidden` oder `inert` braucht jetzt keinen Namen mehr, weil es nicht im Zugänglichkeitsbaum steht. Der Bestand hat kein solches SVG.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium 153 und Playwright über `PLAYWRIGHT_MODULE`, auf dem Stand nach dem Merge von `main` (`330a9afa`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (alle `crisis-number-check`) |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | 111/111, darunter die sechs neuen Fälle und die Gegenprobe |
| Suchtest (`dist/site`) | 216 von 216, JS-Fehler 0 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys) | 48 Läufe (24 Seiten, 390 und 1280 px), 0 Verstösse |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
