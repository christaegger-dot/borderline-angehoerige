# N62-1 und N62-2 · r4-67 · 30.10.2026 · Umsetzung und Selbstprüfung

**Umbenennung (begonnen als r4-66):**
- **Anlass:** #787 (N61-2) und dieser Stand nahmen fast gleichzeitig r4-66 an (`7aa64b6` um 09:58:13 UTC, `d01223f` um 09:58:12 UTC).
- **Entscheid:** Christa Egger hat entschieden: #787 behält r4-66, dieser Stand wird r4-67. Die bauende Sitzung hat den Entscheid nicht selbst erhalten. Drei Sitzungen haben ihn in dieser Fassung übermittelt:
  - die Sitzung von PR #784: «#787 = r4-66, #795 = r4-67»;
  - die Sitzung von PR #787: «#795 in r4-67 umbenennen» (wörtlich);
  - die Review-Sitzung von #787 (Quelle: Mitteilung an die Review-Sitzung): «#787 behält r4-66, #795 wird r4-67».
- **Früherer gegenteiliger Wortlaut (ergänzt nach N67-1):** In der Sitzung von #787 lautete der Entscheid um etwa 10:55 UTC zuerst umgekehrt: «#795 behält r4-66, #787 wird r4-67».
  - Auf Rückfrage der Review-Sitzung bestätigte Christa Egger kurz nach 10:58 UTC «#787 behält r4-66». Damit ist der frühere Wortlaut überholt.
  - Quellen: Commit `13f471f` auf dem Branch von #787 (11:00:47 UTC) und die Pendenzendatei auf `main` (`ec821ab`, Abschnitt zu N61-2: «Mitteilung an die Review-Sitzung, auf GitHub nicht belegt»).
- **Zeitfolge:**
  - Die Umbenennung `f99f29b` (10:57:35 UTC) und `eca7fbd` (10:57:47 UTC) stützte sich auf die Mitteilung der Sitzung von #784. Sie liegt vor der Bestätigung in der Review-Sitzung.
  - Die Bestätigung ändert am Ergebnis nichts: #787 trägt r4-66 (`7aa64b6`, `13f471f`), dieser Stand r4-67.
- **Commit `f99f29b`:** Seine Meldung nennt auch Kennung, `site/` und Prüfungen. Der Commit benennt aber nur den Nachweisordner um und trägt noch `BUILD = 'r4-66'`. Den Inhalt bringt `eca7fbd`.
- **Umgesetzt:** Die Kennung ist durchgehend r4-67 (`BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope`, `appliedTo`, Kommentar und Selbsttestname). Der Ordner heisst `2026-10-30-n62-1-n62-2-r4-67`.
- **Neu gebaut:** `main` ist bis `a323fed` eingebracht (#796, #794; nur `.claude/`, `.gitignore` und `audit-results/`). Danach sind `site/` neu gebaut und alle Prüfungen neu gelaufen.
- **Merge-Reihenfolge:** #787 (r4-66) zuerst; danach bringt dieser Stand `main` ein und baut neu.

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N62-1 und N62-2 umsetzen». Beide Befunde stammen aus der Nachprüfung r4-62, `audit-results/2026-10-30-nachpruefung-r4-62/NACHPRUEFUNG.md` ([PR #790](https://github.com/christaegger-dot/borderline-angehoerige/pull/790), gemergt als `f1ec49f`).

- **Ausgangsstand:** `main` = `19a72dc`, danach `a323fed` eingebracht; r4-65 ([PR #784](https://github.com/christaegger-dot/borderline-angehoerige/pull/784), gemergt am 30.10.2026 um 09:52:58 UTC).
- **Diff dieses Stands:** `git diff a323fed <Kopf dieses Branchs>`.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfung r4-62 verfasst und N62-1 und N62-2 gemeldet hat. An r4-62 bis r4-65 hat sie nicht gebaut. Die Nachprüfung von r4-67 muss eine andere Sitzung machen.

## N62-1 · durch Entscheid geklärt, kein Code

**Befund:** Zwei offene PR behoben N61-1 verschieden: #784 mit `inSvg`, #787 mit `inSvgNs`. Sie kollidierten miteinander (R29-P20).

**Stand beim Bau** (`git fetch`, GitHub um 09:55 UTC):
- **Entscheid:** Christa Egger hat auf die Frage, welcher PR N61-1 behebt, mit «#784» geantwortet. Quelle ist die Beschreibung von #784: «Nach der Nachprüfung r4-62 kam der Entscheid «#784» auf die Frage, welcher PR N61-1 behebt (N62-1).»
- **#784:** in r4-65 umbenannt und gemergt (`19a72dc`). Auf `main` gilt damit die Regel `inSvg` aus #784.
- **#787:** neu gefasst. Er hat den Stand von #784 übernommen (`53a2521`, «Stand von #784 übernommen») und enthält keine eigene Regel für N61-1 mehr. Es bleibt nur N61-2 (`ctlTxt`).

N62-1 braucht deshalb keine Codeänderung. Ich habe den Branch von #787 nicht verändert, weil er einer anderen Sitzung gehört.

**Rest für #787 (Stand beim Bau, inzwischen erledigt: #787 zielt auf `main` und trägt r4-66):**
- **Basis:** #787 zielte auf den Branch von #784 (Basis `7a21ee5`), der inzwischen gemergt ist.
- **Build-Kennung:** #787 trug r4-65 wie `main`.
- **Abgleich:** `contract.js` ändert #787 an anderen Stellen (`accTxt`, Selbsttest) als dieser Stand (`inSvg`, Selbsttest); Konflikte sind nur bei der Build-Kennung, in `site/` und in den Selbsttest-Einschüben zu erwarten.

## N62-2 · umgesetzt

**Befund:** `inSvg` suchte nur einen Vorfahren `svg`. Damit galt auch HTML in `<foreignObject>` als SVG-Element, und `hidden` und `inert` zählten dort nicht. Chromium wertet sie dort aber als HTML-Attribute.

**Umsetzung** in `authoring/tools/contract.js`:
- **`inSvg` (`:46`, Kommentar `:43–45`):** Die Funktion läuft die Vorfahren hoch.
  - Trifft sie zuerst auf `svg`, ist das Element ein SVG-Element.
  - Trifft sie zuerst auf ein `foreignObject` oberhalb des Elements, ist es HTML.
  - Das `foreignObject` selbst bleibt ein SVG-Element. Ein `<svg>` in `foreignObject` ist wieder ein SVG-Element.
  - Der Parser schreibt Tags klein, deshalb steht `foreignobject` im Vergleich.
- **Wirkung:** über `hiddenFlag` auf `concealed`, `accTxt`, `relabelled` und `svgSilenced`. Ein `inert` an einem HTML-Element in `foreignObject` blendet damit ein SVG darin auch in der SVG-Prüfung aus, wie in Chromium.
- **Selbsttest** (`:933–939`): ein neuer Fall, 123 statt 122. Dazu kommt nach N67-2 eine Gegenprobe (`:940–945`), 124, siehe Abschnitt «Nachbesserung N67-1 und N67-2».
  - Zeile: `<svg><foreignObject><span hidden aria-label="Mehr">x</span></foreignObject></svg>` hinter dem Text des Links.
  - Menü: `<svg><foreignObject><span inert> mehr</span></foreignObject></svg>` hinter dem Text des Links.
  - Erwartet: kein `utility-nav`, kein `nav`.
- **Build-Kennung r4-67:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet, kein Skript und kein Renderer ist geändert. Die Pendenzendatei ändert dieser Stand nicht.

## Wirkung

**Seiten:** Die 35 Dateien in `site/` sind bis auf die Build-Kennung byte-gleich mit `main`. Geprüft mit `sha1sum` je Datei nach Ersetzen von `r4-65` bzw. `r4-67`: 0 Abweichungen. In `site/` steht 72-mal `r4-67` und kein `r4-65` mehr.

**Neuer Fall greift** (`rueckprobe-ausgabe.txt`): Mit dem `inSvg` von r4-65 in einer Kopie ausserhalb des Repositorys scheitert genau der neue Fall:

```
FAIL | Verborgenes HTML in foreignObject im Direkteinstieg ist zulässig (r4-67, N62-2) | erwartet: kein nav, kein utility-nav | erhalten: utility-nav, nav
Selbsttest: 122/123 bestanden
```

**Abgleich mit Chromium** (`abgleich-ausgabe.txt`):
- **Werkzeug:** das Skript der Nachprüfung r4-62, `audit-results/2026-10-30-nachpruefung-r4-62/nachpruefung-r4-62.mjs`, unverändert. Es misst 86 Mutationen über `C.gate` und CDP `Accessibility.getPartialAXTree`/`getFullAXTree` in Chromium 153.0.8010.12.
- **Spalten:** In der Ausgabe sind sie auf r4-65 (`main`) und r4-67 umbenannt; das Skript beschriftet sie sonst fest mit r4-61 und r4-62.

```
86 Fälle · Abweichungen Gate ↔ Chromium: r4-65 25, r4-67 19 (r4-67: 18 strenger als Chromium, 1 milder als Chromium)
```

- **Geändert:** genau sechs Fälle, M19 bis M21 und M46 bis M48 (`hidden`/`inert` an HTML in `foreignObject`, Zeile und Menü). Chromium nennt den Link jeweils «Kurz und klar». r4-65 meldete `utility-nav` bzw. `nav`, r4-67 meldet nichts.
- **Alle anderen 80 Fälle:** gleiches Gate-Ergebnis wie r4-65. N60-3, N61-1, die Regression zu `aria-hidden` und `sender` und die bewusst strengen Fälle bleiben, wie die Nachprüfung r4-62 sie beschreibt.
- **Strenger als Chromium bleiben in `foreignObject`:**
  - sichtbarer Text oder `aria-label` darin (M22, M25, M49, M52), weil Chromium SVG-Inhalt nicht in den Linknamen nimmt;
  - das Gate liest ihn weiter mit, wie seit jeher. Das ist nicht Gegenstand von N62-2.
- **Gelockert** wird nur der Fall «verborgenes HTML in `foreignObject`», und nur dort, wo Chromium dasselbe Element ebenfalls verbirgt.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium 153.0.8010.12 und Playwright über `PLAYWRIGHT_MODULE` (`tests-ausgabe.txt`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | 123/123 |
| Suchtest (`dist/site`) | 216 von 216, JS-Fehler 0 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys) | `build r4-67 · Seiten: 24 · Läufe: 48 · Verstösse: 0` |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.

## Nachbesserung N67-1 und N67-2 · 30.10.2026

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N67-1 und N67-2 umsetzen». Beide Befunde stammen aus der Nachprüfung r4-67 ([PR #802](https://github.com/christaegger-dot/borderline-angehoerige/pull/802), Entwurf, nicht gemergt), geprüft auf `51b9b1e`.

- **Gebaut** hat diese Nachbesserung die Sitzung, die die Nachprüfung r4-67 verfasst hat. Eine Nachprüfung dieser Commits muss eine andere Sitzung machen.
- **Build-Kennung:** bleibt r4-67. r4-67 ist nicht gemergt und nicht veröffentlicht, und `site/` ändert sich nicht.

**N67-1 (Darstellung des Kennungsentscheids):**
- Der Abschnitt «Umbenennung» oben nennt jetzt den früheren gegenteiligen Wortlaut, seine Quellen und die Zeitfolge. Er sagt auch, dass `f99f29b` nur den Ordner umbenennt.
- `independentReviewWaiver.appliedTo` nennt dieselben drei übermittelnden Sitzungen wie dieser Bericht und den überholten Wortlaut. Dazu ist die Nachbesserung N67-1 und N67-2 vermerkt.
- `pendingScope` nennt die Gegenprobe.
- Die Beschreibung von PR #795 ist angeglichen.

**N67-2 (Gegenprobe im Selbsttest)** in `authoring/tools/contract.js:940–945`:
- **Fall:** In `verstehen.html` steht am Szenen-SVG `role="group" aria-label="Szene"` statt `aria-hidden`. Darin steht `<foreignObject inert>` mit einem SVG ohne Namen.
- **Erwartet:** `figure-alt`. Chromium 153 zeigt das innere SVG hier als `image` ohne Namen, `inert` am `foreignObject` verbirgt nichts (Nachprüfung r4-67, Fall K81).
- **Regeln unverändert:** Nur der Selbsttest ist ergänzt, `inSvg`, `hiddenFlag` und `svgSilenced` sind gleich wie auf `51b9b1e`.

**Rückprobe** (`rueckprobe-n67-ausgabe.txt`, Skript `rueckprobe-n67.py` aus der Nachprüfung r4-67):

| Fassung von `inSvg` | Ergebnis | scheitert |
|---|---|---|
| r4-67 | 124/124 | — |
| von r4-65 | 123/124 | der Fall N62-2 |
| `foreignObject` selbst gilt als HTML | 123/124 | die neue Gegenprobe N67-2 |
| jedes `foreignObject` darüber macht HTML | 124/124 | nichts; diese Variante weicht in den Fällen der Nachprüfung r4-67 nicht zum Milderen ab (K84) |

**Prüfungen nach der Nachbesserung** (`tests-ausgabe-n67.txt`, `axe-ausgabe-n67.txt`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise; `site/` unverändert (`git diff --quiet -- site`) |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | 124/124 |
| Suchtest (`dist/site`) | 216 von 216, JS-Fehler 0 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 | `build r4-67 · Seiten: 24 · Läufe: 48 · Verstösse: 0` |

**Merge-Reihenfolge unverändert:** #787 (r4-66) zuerst. Danach bringt #795 `main` ein und baut neu. Beim Zusammenführen bleiben beide Selbsttest-Einschübe stehen, dann sind es 127 Fälle (125 aus #787, dazu der Fall N62-2 und die Gegenprobe N67-2).

## Nachtrag · `main` mit r4-66 eingebracht (30.10.2026, nach 11:46 UTC)

**Anlass:** #787 (r4-66, N61-2) ist auf `main` gemergt (`cec2bbc`, 11:46:36 UTC). Wie vereinbart, bringt dieser Stand danach `main` ein.

**Konflikte und Auflösung:**
- **`authoring/tools/contract.js`:**
  - `BUILD` bleibt r4-67.
  - Die zwei angrenzenden Selbsttestblöcke stehen beide drin: zuerst der von r4-66 (N61-2, Bild mit leerem `alt`), dann die zwei von r4-67 (N62-2 und die Gegenprobe N67-2).
  - `ctlTxt` (N61-2) und das neue `inSvg` (N62-2) stehen jetzt zusammen in der Datei.
- **`authoring/site.config.json`:**
  - `assetVersion` und `independentReviewWaiver.version` stehen auf r4-67.
  - `pendingScope`: r4-67, danach «Vorher:» mit dem vollständigen Eintrag r4-66 von `main`.
  - `appliedTo`: der Eintrag von `main` bis r4-66, danach die Einträge zu r4-67.
- **`site/`:** Die Fassung von `main` ist übernommen und danach neu gebaut.

**Prüfungen nach dem Merge** (lokal, Node 22.22.0, Chromium 153):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | 127/127 (125 von `main` mit r4-66, dazu N62-2 und die Gegenprobe N67-2) |
| Suchtest (`dist/site`) | 216 von 216, JS-Fehler 0 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (bekannte Ausnahme B2c) |
| axe-core 4.14.0 | `build r4-67 · Seiten: 24 · Läufe: 48 · Verstösse: 0` |

**Seiten:** Die 35 Dateien in `site/` sind bis auf die Kennung byte-gleich mit `main` (r4-66 bzw. r4-67 ersetzt, `sha1sum` je Datei: 0 Abweichungen). 72-mal steht `r4-67`, kein `r4-65` und kein `r4-66`.
