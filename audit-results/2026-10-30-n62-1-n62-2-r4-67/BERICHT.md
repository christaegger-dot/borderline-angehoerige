# N62-1 und N62-2 · r4-66 · 30.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N62-1 und N62-2 umsetzen». Beide Befunde stammen aus der Nachprüfung r4-62, `audit-results/2026-10-30-nachpruefung-r4-62/NACHPRUEFUNG.md` ([PR #790](https://github.com/christaegger-dot/borderline-angehoerige/pull/790), gemergt als `f1ec49f`).

- **Ausgangsstand:** `main` = `19a72dc`, r4-65 ([PR #784](https://github.com/christaegger-dot/borderline-angehoerige/pull/784), gemergt am 30.10.2026 um 09:52:58 UTC).
- **Diff dieses Stands:** `git diff 19a72dc <Kopf dieses Branchs>`.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfung r4-62 verfasst und N62-1 und N62-2 gemeldet hat. An r4-62 bis r4-65 hat sie nicht gebaut. Die Nachprüfung von r4-66 muss eine andere Sitzung machen.

## N62-1 · durch Entscheid geklärt, kein Code

**Befund:** Zwei offene PR behoben N61-1 verschieden: #784 mit `inSvg`, #787 mit `inSvgNs`. Sie kollidierten miteinander (R29-P20).

**Stand beim Bau** (`git fetch`, GitHub um 09:55 UTC):
- **Entscheid:** Christa Egger hat auf die Frage, welcher PR N61-1 behebt, mit «#784» geantwortet. Quelle ist die Beschreibung von #784: «Nach der Nachprüfung r4-62 kam der Entscheid «#784» auf die Frage, welcher PR N61-1 behebt (N62-1).»
- **#784:** in r4-65 umbenannt und gemergt (`19a72dc`). Auf `main` gilt damit die Regel `inSvg` aus #784.
- **#787:** neu gefasst. Er hat den Stand von #784 übernommen (`53a2521`, «Stand von #784 übernommen») und enthält keine eigene Regel für N61-1 mehr. Es bleibt nur N61-2 (`ctlTxt`).

N62-1 braucht deshalb keine Codeänderung. Ich habe den Branch von #787 nicht verändert, weil er einer anderen Sitzung gehört.

**Rest für #787 (Hinweis, nicht in diesem Stand):**
- **Basis:** #787 zielt noch auf den Branch von #784 (Basis `7a21ee5`), der inzwischen gemergt ist.
- **Build-Kennung:** #787 trägt r4-65 wie `main`. Mit diesem Stand ist r4-66 vergeben, also braucht #787 vor einem Merge r4-67 oder höher.
- **Abgleich:** #787 muss `main` einbringen. `contract.js` ändert #787 an anderen Stellen (`accTxt`, Selbsttest) als dieser Stand (`inSvg`, Selbsttest); Konflikte sind nur bei der Build-Kennung, in `site/` und in den Selbsttest-Einschüben zu erwarten.

## N62-2 · umgesetzt

**Befund:** `inSvg` suchte nur einen Vorfahren `svg`. Damit galt auch HTML in `<foreignObject>` als SVG-Element, und `hidden` und `inert` zählten dort nicht. Chromium wertet sie dort aber als HTML-Attribute.

**Umsetzung** in `authoring/tools/contract.js`:
- **`inSvg` (`:46`, Kommentar `:43–45`):** Die Funktion läuft die Vorfahren hoch.
  - Trifft sie zuerst auf `svg`, ist das Element ein SVG-Element.
  - Trifft sie zuerst auf ein `foreignObject` oberhalb des Elements, ist es HTML.
  - Das `foreignObject` selbst bleibt ein SVG-Element. Ein `<svg>` in `foreignObject` ist wieder ein SVG-Element.
  - Der Parser schreibt Tags klein, deshalb steht `foreignobject` im Vergleich.
- **Wirkung:** über `hiddenFlag` auf `concealed`, `accTxt`, `relabelled` und `svgSilenced`. Ein `inert` an einem HTML-Element in `foreignObject` blendet damit ein SVG darin auch in der SVG-Prüfung aus, wie in Chromium.
- **Selbsttest** (`:933–939`): ein neuer Fall, 123 statt 122.
  - Zeile: `<svg><foreignObject><span hidden aria-label="Mehr">x</span></foreignObject></svg>` hinter dem Text des Links.
  - Menü: `<svg><foreignObject><span inert> mehr</span></foreignObject></svg>` hinter dem Text des Links.
  - Erwartet: kein `utility-nav`, kein `nav`.
- **Build-Kennung r4-66:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet, kein Skript und kein Renderer ist geändert. Die Pendenzendatei ändert dieser Stand nicht.

## Wirkung

**Seiten:** Die 35 Dateien in `site/` sind bis auf die Build-Kennung byte-gleich mit `main`. Geprüft mit `sha1sum` je Datei nach Ersetzen von `r4-65` bzw. `r4-66`: 0 Abweichungen. In `site/` steht 72-mal `r4-66` und kein `r4-65` mehr.

**Neuer Fall greift** (`rueckprobe-ausgabe.txt`): Mit dem `inSvg` von r4-65 in einer Kopie ausserhalb des Repositorys scheitert genau der neue Fall:

```
FAIL | Verborgenes HTML in foreignObject im Direkteinstieg ist zulässig (r4-66, N62-2) | erwartet: kein nav, kein utility-nav | erhalten: utility-nav, nav
Selbsttest: 122/123 bestanden
```

**Abgleich mit Chromium** (`abgleich-ausgabe.txt`):
- **Werkzeug:** das Skript der Nachprüfung r4-62, `audit-results/2026-10-30-nachpruefung-r4-62/nachpruefung-r4-62.mjs`, unverändert. Es misst 86 Mutationen über `C.gate` und CDP `Accessibility.getPartialAXTree`/`getFullAXTree` in Chromium 153.0.8010.12.
- **Spalten:** In der Ausgabe sind sie auf r4-65 (`main`) und r4-66 umbenannt; das Skript beschriftet sie sonst fest mit r4-61 und r4-62.

```
86 Fälle · Abweichungen Gate ↔ Chromium: r4-65 25, r4-66 19 (r4-66: 18 strenger als Chromium, 1 milder als Chromium)
```

- **Geändert:** genau sechs Fälle, M19 bis M21 und M46 bis M48 (`hidden`/`inert` an HTML in `foreignObject`, Zeile und Menü). Chromium nennt den Link jeweils «Kurz und klar». r4-65 meldete `utility-nav` bzw. `nav`, r4-66 meldet nichts.
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
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys) | `build r4-66 · Seiten: 24 · Läufe: 48 · Verstösse: 0` |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
