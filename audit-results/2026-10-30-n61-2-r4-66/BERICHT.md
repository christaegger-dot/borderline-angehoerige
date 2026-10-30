# N61-2 · r4-66 · 30.10.2026 · Neufassung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «#787 als r4-66 neu fassen». Anlass ist N65-1 der Nachprüfung r4-65 ([PR #793](https://github.com/christaegger-dot/borderline-angehoerige/pull/793)): Die Kennung r4-65 war doppelt vergeben, und #787 kollidierte mit #784.

- **Befund:** N61-2 aus `audit-results/2026-10-30-nachpruefung-r4-61/NACHPRUEFUNG.md` (PR #785).
- **Ausgangsstand:** #787 auf `d4bc6cf`. Das ist ein Merge des Copilot-Agenten von #784 (`7a21ee5`) in `9033857`. Dazu kommt `main` auf `19a72dc`: #784 ist dort als r4-65 gemergt, live seit spätestens 09:54 UTC (`data-puk-site-build="r4-65"`, eigene Abfrage mit `curl`).
- **Branch:** `pruefung/2026-10-30-nachpruefung-r4-61` (Name historisch), PR [#787](https://github.com/christaegger-dot/borderline-angehoerige/pull/787). Er zielt jetzt auf `main`, weil der Branch von #784 gemergt ist.
- **Nummer:**
  - r4-63: erste Fassung, überholt;
  - r4-64: #788;
  - r4-65: #784 auf `main`;
  - darum r4-66.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Die Regel hat die Sitzung gebaut, die die Nachprüfung r4-61 verfasst hat. Neu gefasst hat sie die Sitzung, die die Nachprüfung r4-65 (PR #793) verfasst hat. Die Nachprüfung von r4-66 muss eine dritte Sitzung machen.

## Neufassung

- **Merge:** `main` (`19a72dc`) ist in den Branch eingebracht, ohne Konflikt.
- **`authoring/tools/contract.js`:** Gegenüber `main` ändert sich nur Folgendes, gleich wie im nachgeprüften Stand `f7f8d18`:
  - `BUILD = 'r4-66'`;
  - `ctlTxt` und das neue `accTxt`, mit dem Kommentar «r4-66 (Nachprüfung r4-61, N61-2)»;
  - zwei Einträge in `MUTATIONS` und eine Gegenprobe, deren Namen jetzt «(r4-66, N61-2)» lauten.

  Die Kommentare «r4-65 (… N61-1)» und «r4-65 (… N60-3)» stammen aus #784 und bleiben.
- **`authoring/site.config.json`:** Die Datei kommt aus `main`, die Fassung des Copilot-Merges ist verworfen. Geändert ist nur:
  - `assetVersion` und `independentReviewWaiver.version` auf r4-66;
  - `pendingScope`: ein Eintrag r4-66 vor der Kette von `main`;
  - `appliedTo`: ergänzt um «r4-65 am 30.10.2026 gemergt (PR #784)» und den Eintrag r4-66.
- **`PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`:** Die Datei kommt aus `main`, die Fassung des Copilot-Merges ist verworfen. Neu sind der Abschnitt r4-66 obenauf und ein Hinweis am Anfang des Kopfs. Den Merge von r4-65 führt diese Neufassung nicht nach.
- **`site/`:** neu gebaut.
- **Nachweis r4-65:** `audit-results/2026-10-30-n61-2-r4-65/BERICHT.md` hat am Anfang den Vermerk «Umbenannt». Sonst ist der Nachweis unverändert.

Kein Wortlaut, kein Stylesheet, kein Skript, kein Renderer, keine Suche und keine Testdatei ausser `contract.js` (Selbsttest) ist geändert.

## Befunde der Nachprüfung r4-65

| Befund | Stand |
|---|---|
| N65-1 (wichtig) | erledigt: eigene Kennung r4-66, auf `main` aufgesetzt, kein Konflikt |
| N65-2 (gering) | betrifft #787 nicht mehr. `pendingScope` setzt r4-66 vor die Kette von `main`. Die Kette von r4-65 auf `main` (aus #784) führt r4-64 und r4-61 selbst doppelt; das ist nicht in diesem Auftrag |
| N65-3 (gering) | teilweise: Die Pendenzendatei stammt aus `main` (Kopf «main: r4-64»). Sie nennt den Merge von r4-65 nur im Hinweis, nicht in einem eigenen Abschnitt |
| N65-4 bis N65-6 (gering) | offen, nicht in diesem Auftrag; die Regel ist unverändert |

## Wirkung

- **Seiten:** Die 35 Dateien in `site/` sind gleich wie auf `main`, wenn man r4-66 durch r4-65 ersetzt. Die Dateiliste ist dieselbe.
- **Neue Fälle greifen:** In einer Kopie von `authoring/` ohne `ctlTxt` in `accTxt` scheitern genau die zwei N61-2-Fälle, `123/125`.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0 und Playwright über `PLAYWRIGHT_MODULE` (`tests-ausgabe.txt`, `axe-ausgabe.txt`):

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `Selbsttest: 125/125 bestanden` |
| Suchtest (`dist/site`) | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` / `tension core exceeds 1800px` (bekannte Ausnahme B2c, Exit 1) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys), 390 und 1280 px | `axe 4.14.0 · Build r4-66` · `Seiten 24 · Läufe 48 · Verstösse 0` |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
