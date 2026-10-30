# N58-1 und N58-2 · r4-59 · 30.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N58-1 und N58-2 umsetzen».

- **Ausgangsstand:** `main` = `d65a6f3` (r4-58 mit Nachprüfung r4-58, PR #765, und Pendenzen, PR #766).
- **Befunde:** aus `audit-results/2026-10-30-nachpruefung-r4-58/NACHPRUEFUNG.md` (N58-1, N58-2). N58-3 und N58-4 sind mit PR #766 in der Pendenzendatei nachgetragen.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die auch r4-58 gebaut und die Nachprüfung r4-57 verfasst hat. Die Nachprüfung von r4-59 muss eine andere Sitzung machen.

## Befunde

- **N58-1 (gering):** `concealed` erkannte drei Fälle nicht:
  - `aria-hidden="TRUE"` in Grossschrift; Chromium verbirgt die Zeile damit trotzdem;
  - `inert`;
  - einen Linktext, der nur in `<span aria-hidden="true">` steht; der Link hat dann keinen zugänglichen Namen.
- **N58-2 (gering):** Der Nachweis r4-58 und PR #764 sprachen von «39 Mutationen». Die Tabelle der Nachprüfung r4-57 hat aber 37 Mutationen und den Bestand.

## Umsetzung

**N58-1**, alle Änderungen in `authoring/tools/contract.js`:
- **`hiddenFlag`:** Ein Element gilt als verborgen bei `hidden`, `inert` oder `aria-hidden`, wenn dessen Wert in Kleinschrift `true` ist.
  - Leerraum wird nicht entfernt, weil Chromium `aria-hidden=" true "` nicht als verborgen behandelt (Nachprüfung r4-58, Prüfung im Zugänglichkeitsbaum).
  - `concealed` prüft `hiddenFlag` am Element und an allen Vorfahren.
- **`accTxt`:** Der zugängliche Text eines Links ohne verborgene Teile. Die Regeln für Zeile und Menü vergleichen die Beschriftung jetzt mit `accTxt` statt `txt`.
  - Damit ergibt ein Linktext nur in `<span aria-hidden="true">` eine leere Beschriftung und blockiert.
  - Ein zusätzliches dekoratives Zeichen in `<span aria-hidden="true">` hinter dem Text blockiert nicht mehr. Mit r4-58 war das eine Falschmeldung (Y1 unten).
- **Meldungen:** «… mit hidden, inert oder aria-hidden verborgen».
- **Vier neue Selbsttestfälle:**
  - Zeile mit `aria-hidden="TRUE"`;
  - Zeile mit `inert`;
  - Linktext nur in `<span aria-hidden="true">`;
  - Menüeintrag mit `inert`.

  Der Selbsttest hat jetzt 102 statt 98 Fälle.

**N58-2:** Die Zahl im Nachweis r4-58 (`audit-results/2026-10-30-n57-1-n57-2-r4-58/BERICHT.md`) ist berichtigt und als Berichtigung gekennzeichnet.
- Das Prüfskript der Nachprüfung r4-57 hatte 39 Läufe: den Bestand M0 und 38 Mutationen.
- 37 dieser Mutationen stehen in der Tabelle der Nachprüfung r4-57. M11 (`Kurz&shy;und klar` als Entität, ändert den sichtbaren Text) war im Skript enthalten, aber nicht in der Tabelle.
- Von den 39 Läufen ergaben 36 dasselbe wie mit r4-57, nämlich der Bestand und 35 Mutationen. 3 waren neu blockiert.
- Die Beschreibung des gemergten PR #764 ist nicht geändert.

**Build-Kennung r4-59:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet, kein Skript und kein Renderer ist geändert.

## Wirkung

**Seiten:** Die 24 Seiten in `site/` sind bis auf die Build-Kennung byte-gleich mit r4-58. Geprüft mit `diff` je Seite nach Ersetzen der Kennung; 0 Abweichungen.

**Neue Fälle greifen:** Die vier neuen Einträge habe ich in eine Kopie von r4-58 (`d65a6f3`) eingesetzt. Ergebnis mit den Regeln von r4-58: `Selbsttest: 98/102 bestanden`, genau diese vier scheitern.

**Prüfskript der Nachprüfung r4-58** (`audit-results/2026-10-30-nachpruefung-r4-58/mutationen.mjs`, 43 Fälle und Bestand), gegen r4-58 und r4-59 ausgeführt:
- **Neu blockiert:** D1 (`aria-hidden="TRUE"`), D2 (`inert`) und D5 (Linktext in `<span aria-hidden>`).
- **Nur der Wortlaut der Meldung ändert sich** («hidden, inert oder aria-hidden») bei A1–A12, C7, C8, D6 und D7.
- **Alle übrigen Fälle sind gleich**, darunter:
  - D3 (`style="display:none"`, bekannte Grenze);
  - D4 (`role="presentation"`);
  - D8 (`aria-hidden=" true "`, in Chromium nicht verborgen, zu Recht ohne Meldung);
  - E1 (Rückfall ohne `utilityNav`: 0 Blocker).

**Eigene zusätzliche Mutationen:**

| Mutation | r4-58 | r4-59 |
|---|---|---|
| Y1 dekoratives `<span aria-hidden="true"> →</span>` nach dem Linktext | 1 × `utility-nav` (Falschmeldung) | keiner |
| Y2 `inert` am `<li>` im Menü | keiner | 1 × `nav` |
| Y3 `aria-hidden="True"` am Menülink | keiner | 1 × `nav` |
| Y4 Linktext im Menü in `<span hidden>` | keiner | 1 × `nav` (Beschriftung leer) |

Damit gibt es keine Falsch-Positiven: weder beim Bestand noch beim Rückfall noch bei `aria-hidden="false"` oder `aria-hidden=" true "`.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium und Playwright über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | 102/102, darunter die vier neuen Fälle |
| Suchtest (`dist/site`) | 216 von 216, JS-Fehler 0 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys) | 48 Läufe (24 Seiten, 390 und 1280 px), 0 Verstösse |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
