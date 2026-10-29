# N54-1 und N54-2 · r4-55 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** «Nachbesserung N54-1 und N54-2 umsetzen». Ausgangsstand ist `main` = `854bdbc` (r4-54; Nachprüfung r4-54 und Pendenzen sind gemergt). Die Befunde stammen aus `audit-results/2026-10-29-nachpruefung-r4-54/NACHPRUEFUNG.md`.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfung r4-54 erstellt hat. Für r4-55 ist sie nicht unabhängig. Eine Nachprüfung von r4-55 muss eine andere Sitzung machen.

## Befunde

- **N54-1 (gering):** Die Regel `utility-nav` verglich nur Linkziele und Reihenfolge der Zeile «Direkteinstiege». Diese Fälle meldete sie nicht:
  - eine geänderte Beschriftung;
  - eine in die Fusszeile verschobene Zeile;
  - eine doppelte Zeile.

  Die Menüregel aus r4-52 verglich ebenfalls nur Ziele.
- **N54-2 (gering):** Ohne `utilityNav` rendert der Renderer den Rückfall «Website durchsuchen». Die Menüregel kannte ihn nicht und meldete auf 23 Seiten falsche Blocker. Die neue Regel prüfte den Rückfall nicht.

**Berichtigung zu N54-2:** Die Nachprüfung r4-54 schrieb, die Konfigurationsprüfung blockiere jede Konfiguration ohne `utilityNav`, der Rückfall sei also nie erreichbar. Das stimmt nicht. `contract.js:326` prüft nur, wenn `utilityNav` angegeben ist (`cfg.utilityNav !== undefined`); blockiert wird eine leere Liste (Mutation K3). Fehlt der Eintrag ganz, meldet die Konfigurationsprüfung nichts (Mutation K1). Der Rückfall ist also erreichbar, und die falschen Blocker hätten jede Seite ohne `utilityNav` gesperrt. Der Schweregrad bleibt gering, weil diese Website `utilityNav` konfiguriert hat. Die Berichtigung ist auch in der Nachprüfung r4-54 nachgetragen.

## Umsetzung

Nur `authoring/tools/contract.js` und die Build-Kennung in `authoring/site.config.json`:

- **Gemeinsame Funktion `utilityEntriesOf(cfg)`** (`contract.js:150–159`). Renderer und Gate bestimmen die Direkteinstiege damit gleich, mit dem Rückfall «Website durchsuchen», wenn `utilityNav` fehlt (N54-2). Der Renderer nutzt sie statt der bisherigen eigenen Berechnung. Die gerenderten Seiten bleiben gleich (siehe unten).
- **Regel `utility-nav`** (`contract.js:511–525`). Sie gilt jetzt auch für den Rückfall und verlangt auf jeder veröffentlichten Seite ausser der Fehlerseite:
  - genau eine Zeile; sonst «Zeile «Direkteinstiege» fehlt» oder «… 2-mal statt einmal»;
  - die Zeile im Kopf (`header › .puk-site-subbar`); sonst «… steht nicht im Kopf»;
  - genau die erwarteten Einträge, mit Beschriftung und Ziel, in dieser Reihenfolge. Die Beschriftung ist `label`, ersatzweise der Seitentitel, wie im Renderer.
- **Menüregel** (`contract.js:530–535`). Sie vergleicht ebenfalls Beschriftung und Ziel und erwartet dieselben Einträge wie die Zeile, also auch den Rückfall.
- **Sechs neue Selbsttestfälle** (95 statt 89):
  - Beschriftung in der Zeile geändert → `utility-nav`
  - Zeile doppelt → `utility-nav`
  - Zeile in der Fusszeile → `utility-nav`
  - Beschriftung eines Direkteinstiegs im Menü geändert → `nav`
  - ohne `utilityNav` mit Rückfall auf allen Seiten → kein `nav`, kein `utility-nav`
  - ohne `utilityNav`, Rückfallzeile auf `index.html` entfernt → `utility-nav`
- **Build-Kennung r4-55:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet und kein Skript ist geändert.

## Wirkung

**Die neuen Fälle greifen:** In einer Kopie ausserhalb des Repositorys sind nur die beiden Gate-Regeln auf den Stand r4-54 zurückgesetzt. Dort scheitern genau die sechs neuen Fälle: `Selbsttest: 89/95 bestanden`. Zum Beispiel:
- «Ohne utilityNav besteht der Rückfall … | erhalten: nav»
- «Zeile «Direkteinstiege» doppelt … | erhalten: crisis-number-check»

**Mutationen über `C.gate` auf echt gerenderten Seiten:** Das Skript ist `audit-results/2026-10-29-nachpruefung-r4-54/mutationen.mjs`, die Ausgabe steht in `mutationen-r4-55.txt`.

| Mutation | r4-54 | r4-55 |
|---|---|---|
| M0 Bestand | 0 | 0 |
| M1–M10 (Zeile fehlt, vertauscht, Eintrag zu viel/zu wenig, andere Seiten, nur Menü) | erkannt | weiter erkannt |
| M11 Beschriftung in der Zeile geändert | **0** | `utility-nav` |
| M12 Zeile in der Fusszeile | **0** | `utility-nav` «steht nicht im Kopf» |
| M13 Zeile doppelt, zweite vertauscht | **0** | `utility-nav` «2-mal statt einmal» |
| M14 Fehlerseite ohne Zeile | 0 | 0 |
| K1 ohne `utilityNav` (Rückfall, echt gerendert) | **23 × `nav`** | 0 |
| K2 ohne `utilityNav`, Rückfallzeile auf `index` entfernt | 23 × `nav` | 1 × `utility-nav` |
| K3 `utilityNav: []` | 1 × Konfiguration + 23 × `nav` | nur 1 × Konfiguration |

**Falschmeldungen:** In einer zusätzlichen Probe heisst ein Eintrag «Kurz & «klar»». Das Gate meldet dabei 0 Blocker `nav` und `utility-nav`. Der Parser dekodiert Entitäten; der Vergleich mit der Beschriftung aus der Konfiguration ist also auch bei Sonderzeichen gleich.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium und Playwright über `PLAYWRIGHT_MODULE`, auf dem Endstand:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien byte-gleich mit `site/` |
| Selbsttest | 95/95 |
| Suchtest | 216 von 216 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c) |

**`site/`:** Es ändern sich nur die 24 HTML-Seiten. Zeilen im Diff ohne `r4-54`/`r4-55`: 0. Auch die Umstellung des Renderers auf `utilityEntriesOf` ändert also nichts am Ergebnis.

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte. Am Rendern ändert sich nichts. Deshalb gibt es keine neue Sichtprüfung und keinen neuen axe-Lauf; der letzte Lauf (Nachprüfung r4-54) ergab 0 Verstösse.
