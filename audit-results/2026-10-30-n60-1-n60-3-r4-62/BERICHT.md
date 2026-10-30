# N60-3 und N61-1 · r4-62 · 30.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N60-1 und N60-3 umsetzen». Danach Entscheid von Christa Egger: «#780 mergen, r4-62 neu fassen». Gemeint ist: N60-1 ohne Dubletten, N60-3 zusammen mit N61-1 beheben, Selbsttest für Abbildung und Direkteinstieg.

- **Befunde:**
  - **N60-3** aus dem Nachtrag zur Nachprüfung r4-60, `audit-results/2026-10-30-nachtrag-nachpruefung-r4-60/NACHTRAG.md` (PR #781, gemergt als `aefdf06`).
  - **N61-1** aus der Nachprüfung r4-61, `audit-results/2026-10-30-nachpruefung-r4-61/NACHPRUEFUNG.md` (PR #785, gemergt). Gleiche Ursache wie N60-3, aber breiter: Auch die Regeln für die Direkteinstiege (`relabelled`, `accTxt`) werten `hidden` und `inert` an SVG als verborgen.
  - **N60-1** aus der Nachprüfung r4-60 (PR #778) ist mit PR #783 (`c5bbf90`, «Nachtrag zu N60-1») schon auf `main`. Die erste Fassung dieses Stands brachte dieselben zwei Fälle noch einmal; sie sind in dieser Fassung entfernt.
  - Nicht im Auftrag: N61-2 (`alt` und `value` im Link) und N61-3 (Pendenzendatei).
- **Ausgangsstand:** `main` = `5cbaf1c` (r4-61, PR #780, gemergt am 30.10.2026, 08:25:17 UTC). Der Branch hatte zuerst auf #780 aufgebaut (`a5d18e7`). Danach ist `main` per Merge eingebracht (`171a6e0`, ohne Konflikt) und dieser Stand neu gefasst. Der Diff dieses Stands ist `git diff 5cbaf1c <Kopf dieses Branchs>`.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die den Nachtrag zur Nachprüfung r4-60 (#781) verfasst hat; N60-3 stammt also von ihr. An r4-58 bis r4-61 hat sie nicht gebaut. Die Nachprüfung von r4-62 muss eine andere Sitzung machen.

## Befunde

- **N60-3 (gering):** Seit r4-60 galt ein SVG in einer Abbildung bei `hidden` oder `inert` als ausgeblendet. Chromium zeigt es aber als Bild ohne Namen:
  - bei `hidden` oder `inert` am `<svg>`, weil beide HTML-Attribute im SVG-Namensraum nicht wirken;
  - bei `hidden` an `.puk-vis-scene`, weil `site.css:1144` dort `display:grid` setzt und das `hidden` damit aufhebt.
- **N61-1 (wichtig):** Derselbe Fehler steckt in `hiddenFlag` selbst. Damit lassen auch die Regeln für die Direkteinstiege einen Namenswechsel durch:
  - `<svg hidden aria-label="Pfeil">` im Link: Chromium nennt den Link «Kurz und klar Pfeil»;
  - `<svg hidden><title>Mehr</title></svg>` im Link: Chromium nennt ihn «Kurz und klar Mehr».

## Umsetzung

Alles in `authoring/tools/contract.js`:

- **`hiddenFlag` (`:44`, Kommentar `:40–42`):** `hidden` und `inert` zählen nur an HTML-Elementen. An `<svg>` und an Elementen darin (neue Hilfsfunktion `inSvg`, `:43`) zählt nur `aria-hidden`, nach der Regel von r4-60 (neue Hilfsfunktion `ariaHiddenFlag`, `:39`).
  - Das wirkt in `concealed` (Zeile und Menü), `accTxt` (Linktext) und `relabelled` (seit r4-61, Kommentar `:49–50` ergänzt).
- **SVG-Prüfung in Abbildungen (`:649`, Kommentar `:645–648`):** Neue Hilfsfunktion `svgSilenced` (`:46`). Als ausgeblendet gilt ein SVG nur in zwei Fällen:
  - `aria-hidden` steht am SVG oder an einem Vorfahren;
  - `inert` steht an einem HTML-Vorfahren.

  `hidden` an einem Vorfahren zählt hier nicht, weil eine eigene `display`-Regel es aufheben kann. Statisch lässt sich das nicht sicher erkennen, deshalb gilt die strenge Richtung wie bis r4-59. Die Ausnahme `role="img"` am Vorfahren und die Prüfung auf `aria-label` und `<title>` bleiben.
- **Selbsttest: fünf neue Fälle und eine Gegenprobe** (122 statt 116):
  - **N61-1** (`:738–739`):
    - `<svg hidden aria-label="Pfeil">` hinter dem Text des Zeilenlinks ergibt `utility-nav`;
    - `<svg inert><title>Mehr</title></svg>` hinter dem Text des Menülinks ergibt `nav`.
  - **N60-3** (`:740–742`), Szene auf `verstehen` ohne `aria-hidden`, jeweils `figure-alt`:
    - mit `hidden` am SVG;
    - mit `inert` am SVG;
    - mit `hidden` an `.puk-vis-scene`.
  - **N60-3, Gegenprobe** (`:925–929`): `inert` an `.puk-vis-scene` ergibt kein `figure-alt`, weil Chromium das SVG dann verbirgt.
  - Die Gegenprobe aus r4-61 (`<svg aria-hidden="true" aria-label="Pfeil">` ist zulässig) und die zwei Fälle aus #783 (N60-1) bleiben unverändert und bestehen.
- **Build-Kennung r4-62:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet, kein Skript und kein Renderer ist geändert. Die Pendenzendatei ändert dieser Stand nicht; das ist eine eigene Pendenz (N61-3).

## Wirkung

**Seiten:** Die 35 Dateien in `site/` sind bis auf die Build-Kennung byte-gleich mit `main` (r4-61). Geprüft mit `md5sum` je Datei nach Ersetzen von `r4-61` durch `r4-62`: 0 Abweichungen. Im Diff von `site/` sind genau 72 Vorkommen ersetzt, in `site/` steht kein `r4-61` mehr.

**Neue Fälle greifen** (`selbsttest-rueckprobe-ausgabe.txt`, Regeln einzeln auf `main` = r4-61 zurückgesetzt):
- **`hiddenFlag` und SVG-Prüfung von r4-61:** `117/122`, genau die fünf neuen Fälle scheitern.
- **Nur `hiddenFlag` von r4-61:** `120/122`, es scheitern die zwei N61-1-Fälle.
- **Nur SVG-Prüfung von r4-61:** `121/122`, es scheitert der Fall `hidden` an `.puk-vis-scene`. `hidden` und `inert` am SVG selbst fängt dann schon das neue `hiddenFlag` ab.
- **Zu streng** (`inert` am HTML-Vorfahren zählt nicht als ausgeblendet): `121/122`, die Gegenprobe scheitert.

**Mutationen** (`mutationen.mjs` aus dem Nachtrag #781, erweitert um Q6 für Links mit SVG, 191 Fälle; Ausgaben `mutationen-r4-61-ausgabe.txt` und `mutationen-r4-62-ausgabe.txt`). Es ändern sich nur zwölf Fälle, alle zu einem Blocker:
- **Abbildungen:** Q5.9, Q5.10, Q5.11 (N60-3) und Q5.17, jeweils `figure-alt`.
- **Zeile:** Q6.1 `<svg hidden aria-label>`, Q6.2 `<svg inert aria-label>`, Q6.3 `<svg hidden><title>` und Q6.4 `<svg><g hidden><title>`, jeweils `utility-nav`.
- **Menü:** dieselben vier Fälle, Q6.9 bis Q6.12, jeweils `nav`.

Unverändert ohne Blocker bleiben:
- **Ausgeblendet über `aria-hidden` oder einen HTML-Vorfahren:** Q6.5/Q6.13 (`<svg aria-hidden="true" aria-label>`), Q6.6/Q6.14 (`<svg aria-hidden="yes"><title>`), Q5.12 (`inert` am HTML-Vorfahren) und Q5.13/Q5.14 (`aria-hidden` am Vorfahren).
- **Verborgene HTML-Elemente:** Q6.7/Q6.15 (`<span hidden aria-label>`) und Q6.8/Q6.16 (`<span inert>`).

**Abgleich mit Chromium** (`aria.mjs`, `abgleich.py`, Ausgaben `aria-ausgabe.txt`, `abgleich-ausgabe.txt`; CDP `Accessibility.getPartialAXTree`, Chromium 153): `191 Fälle · Abweichungen Gate ↔ Chromium: r4-61 10, r4-62 4`.
- **Behoben:**
  - Q5.9, Q5.10, Q5.11: Chromium `image «»`, Gate jetzt `figure-alt`.
  - Q6.1–Q6.3 und Q6.9–Q6.11: Chromium «Kurz und klar Pfeil» bzw. «… Mehr», Gate jetzt `utility-nav` bzw. `nav`.
- **Bewusst streng:**
  - **Q5.17:** Ein SVG in `<div hidden>` ohne eigene Anzeigeregel verbirgt Chromium (`notRendered`), das Gate meldet `figure-alt`. Siehe oben: Ob ein `hidden` wirkt, hängt vom Stylesheet ab. Richtig ausgezeichnet ist ein dekoratives SVG mit `aria-hidden="true"`.
  - **Q6.4 und Q6.12:** Bei `<svg><g hidden><title>Mehr</title></g></svg>` nennt Chromium den Link «Kurz und klar», das Gate meldet `utility-nav` bzw. `nav`. Ein `<title>` in einer Gruppe benennt nur die Gruppe, nicht das SVG. `accTxt` liest jedes `<title>` mit, wie bisher. Ohne `hidden` an der Gruppe meldet auch r4-61 diesen Fall. Für die Direkteinstiege ist das die strenge Richtung.
- **Unverändert seit r4-59:** Q5.16, ein SVG ohne Namen unter `role="img" aria-label="…"`. Das ist ein Hinweis aus dem Nachtrag #781 und nicht im Auftrag.

**Grenze:** Firefox und Safari sind nicht geprüft.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium 153 und Playwright über `PLAYWRIGHT_MODULE`, auf diesem Branch nach dem Merge von `main` (`5cbaf1c`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (alle `crisis-number-check`) |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | 122/122, darunter die fünf neuen Fälle und die Gegenprobe |
| Suchtest (`dist/site`) | 216 von 216, JS-Fehler 0 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys, `axe.mjs`) | `build r4-62 · Läufe: 48 · Seiten: 24 · Verstösse: 0` |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
