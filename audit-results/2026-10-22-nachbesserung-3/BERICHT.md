# Nachbesserung 3 nach Nachprüfung 2 · PR #708 · 22. Oktober 2026

**Auftrag von Christa Egger, 22.10.2026**, nach der Nachprüfung 2 (Stand `45451ea`, Bericht `authoring/PRUEFBERICHT.md`, Abschnitt «Nachprüfung 2 PR #708 · 22.10.2026»): Die drei geringen Befunde NP2-1 bis NP2-3 und der Hinweis H1 werden vor dem Neuschreiben von `site/` behoben; danach Nachprüfung 3 durch eine unbeteiligte Sitzung, dann `site/` und Merge.

Ausgeführt hat die **Nachprüfsitzung 2**. Sie ist damit bauende Sitzung dieses Commits und für Nachprüfung 3 ausgeschlossen. Alle Messwerte unten sind eine **Selbstprüfung, keine Prüfstufe**: Playwright 1.56.1 mit Chromium 141.0.7390.37, lokaler Server mit den Kopfzeilen aus `_headers`, Fensterhöhe 900 px.

Geänderte Dateien: `authoring/css/site.css`, `authoring/tools/contract.js`, `authoring/content/selbstfuersorge.html`, `authoring/UEBERGABE-GESTALTUNG-2026-10-21.md`, dieser Nachweis. Keine Änderung an `site.config.json`, an Freigaben oder an `site/`.

## 1 · NP2-1: Beschriftung auf der Verbindungslinie (`v-ki-alltag`)

**Auftrag:** Die Beschriftung «Unterstützung je nach Situation» darf bei keiner Breite auf der Verbindungslinie liegen; Prüfung 760–1280 px in 1-px-Schritten; Wortlaut, Kennzeichnung und Screenreader-Fassung unverändert; Gestaltungskorrektur ohne neue fachliche Freigabe.

**Lösung:** Die waagrechte Linie sitzt nicht mehr auf fester Höhe (`--bl-link-y` ab Oberkante), sondern an der **Unterkante der Beschriftung**. Bricht die Beschriftung in zwei Zeilen um, rückt die Linie mit nach unten; die Pfeilspitze folgt ihr. Bei einzeiliger Beschriftung bleibt die Linie auf derselben Höhe wie in der freigegebenen Fassung (`min-height: var(--bl-link-y)` = 52 px).

`site.css`, Block `.bl-caremap--linked`:
- `.bl-caremap__link`: `min-height:calc(var(--bl-link-y) + var(--space-3))` → `min-height:var(--bl-link-y)`
- `::before` (Linie): `height:calc(…)` entfällt, neu `bottom:0`
- `::after` (Pfeilspitze): `top:calc(var(--bl-link-y) - .375rem + 1px)` → `bottom:calc(-.375rem + 1px)`

Unverändert: HTML der Figur, Beschriftungen, Pfeilzeichen der schmalen Fassung, `puk-sr`-Text, Planzeile.

**Messung, Fenster 760–1280 px in 1-px-Schritten (521 Breiten):**

| Grösse | Ergebnis |
| --- | --- |
| Breite Fassung mit Linien | 324 Breiten (957–1280 px), 648 Beschriftungen |
| Abstand Textunterkante zu Linie | **mindestens 13,3 px** (bei 957 px, zweizeilig); vorher −3,3 px bei 958–984 px |
| Zweizeilige Beschriftung | 957–985 px (29 Breiten), Text vollständig über der Linie |
| Pfeilspitze | Mitte der Spitze auf der Linienmitte, Abweichung 0 px (vorher 2 px darunter) |
| Linie trifft die Kinderbox | bei allen 324 Breiten innerhalb der Boxhöhe |
| Waagrechtes Scrollen | keines |
| Browser-Grundschrift 20 px, 760–1280 px in 4-px-Schritten | 131 Breiten, keine zweizeilige Beschriftung, Mindestabstand 25 px |
| Schrift 32 px bei 760, 924, 1280, 1440, 1920 px | gestapelte Fassung mit ↓ und ↑, keine Linien |

**1280 px (freigegebene Fassung):** Pixelvergleich des Figurfotos vorher/nachher: identisch bis auf die Pfeilspitzen, die jetzt 2 px höher und damit genau auf der Linienmitte sitzen (184 abweichende Pixel in einem 20-px-Band). Kästen gleich hoch (367,2 px), Linie bei 600,4 px wie vorher.

**Bildschirmfotos bei 970 px:** [vorher, Stand `45451ea`](bilder/kinder-caremap-970-vorher-45451ea.png) · [nachher](bilder/kinder-caremap-970-nachher.png) · [1280 px nachher](bilder/kinder-caremap-1280-nachher.png)

## 2 · NP2-2: Hover-Farbe «Zur Startseite» (404-Seite) und weitere Links auf hellblauen Flächen

**Auftrag:** Alle Zustände mindestens 4,5:1; gleiche Prüfung für alle anderen Links auf hellblauen Flächen.

**Lösung:** `site.css`, hinter den Regeln für Links auf getönten Flächen: `.puk-longform__hero .puk-link--action:not(.puk-site-start-actions .puk-link--action):hover{color:var(--puk-blue-125)}`. Die Startaktionen der Startseite sind ausgenommen und unverändert (weiss auf Blau).

**404-Seite, «Zur Startseite», 21 px, Schnitt 500, auf `#F5F7FF`:**

| Zustand | Standard | Theme «kontrast» |
| --- | --- | --- |
| Ruhe | `#222222`, 14,87:1 | `#222222`, 14,87:1 |
| Überfahren | `#2B4FE0`, **5,95:1** (vorher `#3C64FF`, 4,40:1) | `#001F99`, 11,85:1 |
| Gedrückt | `#2B4FE0`, 5,95:1 | `#001F99`, 11,85:1 |
| Tastaturfokus | weiss auf `#3C64FF`, 4,71:1 (bestehende Fokusfläche) | gleich |
| Fokus und überfahren | weiss auf `#2B4FE0`, 6,37:1 | gleich |

**Alle Links und Schaltflächen auf getönten Flächen, 23 Seiten, 1280 px:** 168 Elemente, je in Ruhe, überfahren und fokussiert gemessen (Farbe gegen die nächste nicht transparente Hintergrundfarbe): **0 unter 4,5:1**. Kleinster Wert 4,71:1 (weiss auf `#3C64FF`, Startaktion «Mit meiner Frage beginnen» in Ruhe und fokussiert, wie auf `main`); Links `#2B4FE0` auf `#D8E0FF` (Hinweiskasten «144») 4,86:1, bestehend. Startseite: «Mit meiner Frage beginnen» überfahren weiss auf `#2B4FE0` 6,37:1, «Beratung per E-Mail anfragen» überfahren weiss auf `#3C64FF` 4,71:1, beide unverändert.

## 3 · NP2-3: Selbsttest ohne freigegebene Textfassung

**Auftrag:** Klare Meldung statt Laufzeitfehler; Testfall ergänzen.

**Lösung:** `contract.js`, `selftest()`: Der Fall «Produktion blockiert ausstehende Textfassung im Visualisierungsplan» steht jetzt in einer Hilfsfunktion. Gibt es keine Planzeile mit `format: text` und `approvalStatus: freigegeben`, liefert sie die Zeile `FAIL | … | erhalten: keine freigegebene Textfassung im Visualisierungsplan – Fall nicht prüfbar`; der Selbsttest endet dann mit Exit 1 statt mit `TypeError`. Neuer Fall «Selbsttest meldet fehlende freigegebene Textfassung als Befund, nicht als Laufzeitfehler»: setzt in einer Kopie alle Textfassungen auf «entfällt», ruft die Hilfsfunktion und erwartet die Meldung.

**Messung:**
- Selbsttest am Stand: **84/84 bestanden** (vorher 83).
- Simulation in einer Wegwerfkopie, alle 118 Textfassungen auf «entfällt»: `FAIL | Produktion blockiert ausstehende Textfassung im Visualisierungsplan | … | erhalten: keine freigegebene Textfassung im Visualisierungsplan – Fall nicht prüfbar`, «Selbsttest: 83/84 bestanden», kein Laufzeitfehler. Vorher: `TypeError: Cannot set properties of undefined`.
- Simulation `v-vs-eisberg` auf «ausstehend»: `--production` weiterhin `BLOCK | verstehen | visual-approval | Textfassung v-vs-eisberg nicht freigegeben (ausstehend)`.

## 4 · H1: Fliesstext «Auf sich achten»

**Auftrag:** Neu «Sie dürfen auch zuerst für sich sorgen.» statt «Sie dürfen zuerst oder ausschliesslich für sich sorgen.», nur dieser Satz. Weitere Fundstellen von «ausschliesslich» in diesem Sinn melden, nicht ändern.

**Umsetzung:** `authoring/content/selbstfuersorge.html`, Abschnitt `#unterstuetzung`, erster Absatz: genau dieser Satz ersetzt. Build und Suchindex zeigen den neuen Wortlaut; der alte kommt in keiner Seite mehr vor.

**Fundstellen von «ausschliesslich» im übrigen Inhalt (nicht geändert):**

| Seite | Stelle | Sinn |
| --- | --- | --- |
| `diagnose` › Liste | «beobachtbares Verhalten ausschliesslich mit der Diagnose erklären» | anderer Sinn (Erklärung «nur durch die Diagnose»), nicht die Selbstfürsorge |
| `impressum-datenschutz` | «Für den Inhalt der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich.» | Rechtstext, anderer Sinn |

Im Sinn von «nur für sich sorgen» gibt es keine weitere Fundstelle. In `site.config.json` steht das Wort nur in der Begründung der Planzeile `v-sf-entlastung` (Zitat des Entscheids).

## Kennzahlen nach Nachbesserung 3

| Prüfung | Ergebnis |
| --- | --- |
| `build.mjs --selftest` | Exit 0 · **84/84 bestanden** |
| `build.mjs --production --out=dist/site` | Exit 0 · **23 Seiten · 0 Blocker · 20 Hinweise** (20 × `crisis-number-check`, unverändert) |
| `build.mjs --out=dist/site-draft` | Exit 0 · 23 Seiten · 0 Blocker · 20 Hinweise |
| `build.mjs --production --verify-site` | Exit 1, erwartet: 24 Unterschiede, weil `site/` nicht neu geschrieben ist |
| `suchtest.mjs dist/site` | Exit 0 · **216 von 216** · JS-Fehler 0 |
| `sprachtest.mjs dist/site` | Exit 0 · **73 Prüfungen bestanden** · JS-Fehler 0 |
| `layouttest.cjs` (unveränderte Kopie gegen den Entwurf) | Exit 1 · **1 Abweichung**: `tension core exceeds 1800px` (begründete Ausnahme B2c) |
| Kinder-Abbildung 760–1280 px, 1-px-Schritte | 521 Breiten, kein Überlauf, Mindestabstand Text–Linie 13,3 px |
| Links auf getönten Flächen, 23 Seiten, drei Zustände | 168 Elemente, 0 unter 4,5:1 |

Kein Merge, `site/` nicht neu geschrieben, keine Änderung an Netlify oder DSG-Konfiguration. Nachprüfung 3 macht eine Sitzung, die an PR #708 weder gebaut noch geprüft hat.
