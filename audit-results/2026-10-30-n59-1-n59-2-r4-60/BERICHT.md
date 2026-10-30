# N59-1 und N59-2 · r4-60 · 30.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N59-1 und N59-2 umsetzen».

- **Ausgangsstand:** `main` = `18e0d750` (r4-59, PR #769; Nachtrag zu N54-2, PR #768 und #770).
- **Befunde:** aus der Nachprüfung r4-59, `audit-results/2026-10-30-nachpruefung-r4-59/NACHPRUEFUNG.md`. Sie liegt als Entwurf in [PR #771](https://github.com/christaegger-dot/borderline-angehoerige/pull/771) und war beim Aufsetzen noch nicht gemergt; die Datei ist deshalb nicht auf diesem Branch.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfungen r4-58 und r4-59 erstellt hat. N59-1 geht auf eine falsche Angabe dieser Sitzung in der Nachprüfung r4-58 zurück. Die Nachprüfung von r4-60 muss eine andere Sitzung machen.

## Befunde

- **N59-1 (gering):** Die Gate-Regel galt `aria-hidden` nur bei `true` (jede Schreibweise) als verbergend. Der Zugänglichkeitsbaum von Chromium verbirgt aber bei jedem Wert ausser `false` (jede Schreibweise), `undefined` und leer, also auch bei `" true "`, `"true "`, `"yes"`, `"0"` oder `" false "`. Kommentar und Nachweise hielten das Gegenteil fest. Die Angabe stammte aus Playwrights `ariaSnapshot()`, das den Baum selbst berechnet.
- **N59-2 (gering):** Die Pendenzendatei führte r4-59 nach dem Merge noch als Entwurf und nannte den Selbsttest mit 102. Auf `main` sind es 104, weil PR #768 parallel zwei Fälle ergänzt hat.

## Umsetzung

**N59-1**, in `authoring/tools/contract.js`:
- **`hiddenFlag` (`:38–39`):** `aria-hidden` verbirgt, wenn das Attribut vorhanden ist und sein Wert in Kleinschrift nicht `false`, `undefined` oder leer ist. Leerraum wird nicht entfernt, wie in Chromium: `" false "` verbirgt dort. `hidden` und `inert` gelten wie bisher.
- **Kommentar (`:35–37`):** berichtigt, mit Beleg (Zugänglichkeitsbaum über CDP, Chromium 153).
- **`accTxt`** nutzt `hiddenFlag` und lässt damit auch Linktext in `<span aria-hidden="yes">` weg.
- **Zwei neue Selbsttestfälle** (`:707–708`):
  - Zeile mit `aria-hidden=" true "`, erwartet `utility-nav`;
  - Menüeintrag mit `aria-hidden="yes"`, erwartet `nav`.
- **Eine Gegenprobe** (`:873–879`): `aria-hidden` mit `false`, `FALSE`, `undefined` und leer an Zeile und Menü darf weder `nav` noch `utility-nav` auslösen.

  Der Selbsttest hat jetzt 107 statt 104 Fälle.

**Berichtigung der Nachweise**, als Berichtigung gekennzeichnet:
- `audit-results/2026-10-30-nachpruefung-r4-58/NACHPRUEFUNG.md`: N58-1 (Beleg Chromium) und Tabellenzeile D8.
- `audit-results/2026-10-30-n58-1-n58-2-r4-59/BERICHT.md`: Umsetzung `hiddenFlag`, Wirkung D8 und der Satz zu Falsch-Positiven.

Die Beschreibungen der gemergten PR #765 und #769 sind nicht geändert.

**N59-2**, in `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`:
- r4-59 als veröffentlicht eingetragen, mit dem Selbsttest 104 auf `main` und dem Hinweis auf PR #768.
- Neue Abschnitte «Nachprüfung r4-59» (Entwurf, PR #771) und r4-60 (Entwurf).
- Bei N58-1, N58-2 und in der Kopfzeile ist der Stand nachgeführt.

**Build-Kennung r4-60:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet, kein Skript und kein Renderer ist geändert.

## Wirkung

**Seiten:** Die 35 Dateien in `site/` sind bis auf die Build-Kennung byte-gleich mit r4-59. Geprüft mit `md5sum` je Datei nach Ersetzen der Kennung: 0 Abweichungen. Im Diff von `site/` sind genau 72 Vorkommen von «r4-59» durch «r4-60» ersetzt.

**Neue Fälle greifen:** Ich habe `hiddenFlag` in einer Kopie von r4-60 auf die Fassung von r4-59 zurückgesetzt. Ergebnis: `Selbsttest: 105/107 bestanden`. Genau die zwei neuen Fälle scheitern. Die Gegenprobe besteht auch mit r4-59: Sie sichert gegen eine zu strenge Regel, nicht gegen die Lücke.

**Prüfskript der Nachprüfung r4-59, erweitert um G1–G12** (`mutationen.mjs`, Ausgabe in `mutationen-ausgabe.txt`). Gegen r4-59 (`18e0d750`) und r4-60 ausgeführt, ändern sich genau diese Fälle:

| Fall | r4-59 | r4-60 |
|---|---|---|
| D8 `aria-hidden=" true "` auf der Zeile | keiner | 1 × `utility-nav` |
| F4 `aria-hidden="true "` auf der Zeile | keiner | 1 × `utility-nav` |
| G1 `aria-hidden=" true "` auf der Zeile | keiner | 1 × `utility-nav` |
| G2 `aria-hidden="yes"` auf der Zeile | keiner | 1 × `utility-nav` |
| G3 `aria-hidden="0"` auf einem Link der Zeile | keiner | 1 × `utility-nav` |
| G4 `aria-hidden=" false "` auf der Zeile | keiner | 1 × `utility-nav` |
| G5 `aria-hidden="x"` auf `<li>` im Menü | keiner | 1 × `nav` |
| G6 `aria-hidden="true "` auf `.puk-site-subbar` | keiner | 1 × `utility-nav` |
| G11 Linktext in `<span aria-hidden="yes">` | keiner | 1 × `utility-nav` (Beschriftung leer) |

**Unverändert ohne Meldung**, also keine Falsch-Positiven:
- G7 `aria-hidden="False"`;
- G8 `aria-hidden="undefined"`;
- G9 `aria-hidden=""`;
- G10 `aria-hidden` ohne Wert;
- A13–A16, F3, F15 (`false` in verschiedenen Lagen);
- der Bestand und E1 (Rückfall ohne `utilityNav`).

Alle übrigen Fälle sind gleich wie mit r4-59. G12 (dekoratives `<span aria-hidden="false"> →</span>`) blockiert in beiden Ständen. Das ist richtig, weil der Pfeil dann zum zugänglichen Namen gehört.

**Abgleich mit Chromium** (`chromium-ergaenzung.cjs`, Ausgabe in `chromium-ergaenzung-ausgabe.txt`, CDP-Baum):
- `aria-hidden` ohne Wert: Der Link heisst «Kurz und klar», ist also nicht verborgen (G10 richtig).
- `<span aria-hidden="yes">` um den Linktext: Der Name ist `""` (G11 richtig).
- Dekoratives `<span aria-hidden="false"> →</span>`: Der Name ist «Kurz und klar →» (G12 richtig).
- Die übrigen Werte stehen in der Nachprüfung r4-59 (`aria-hidden-chromium-ausgabe.txt`).

**Grenze:** Firefox und Safari sind nicht geprüft. Sie können ungültige Werte anders behandeln. Die Regel folgt Chromium und ist damit im Zweifel strenger.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium 153 und Playwright über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (alle `crisis-number-check`) |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | 107/107, darunter die zwei neuen Fälle und die Gegenprobe |
| Suchtest (`dist/site`) | 216 von 216, JS-Fehler 0 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys) | 48 Läufe (24 Seiten, 390 und 1280 px), 0 Verstösse |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
