# Nachtrag zu N54-2 · 30.10.2026 · zwei Selbsttestfälle und Berichtigung

**Auftrag von Christa Egger, 29./30.10.2026:** den Nachtrag und die Testfälle aus dem geschlossenen PR #758 nach dem Merge von PR #756 nachreichen («#758 schliessen», dann «Nachtrag und Testfälle nach Merge von #756 nachreichen»). Ausgangsstand ist `main` = `ea4e056` (r4-58 mit Nachprüfung r4-58).

Diese Datei ist der Nachweis der Sitzung, die die Nachprüfung r4-54 erstellt und den geschlossenen PR #758 gebaut hat (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

## Ausgangslage

- PR #758 und PR #756 setzten N54-1 und N54-2 parallel um. #756 ist als r4-57 gemergt, #758 ohne Merge geschlossen.
- Aus #758 fehlten auf `main` noch zwei Dinge:
  - **Ein Nachtrag:** Die Nachprüfung r4-54 nannte `utilityNav` fälschlich Pflicht.
  - **Zwei Selbsttestfälle zum Rückfall «Website durchsuchen»:** Ohne `utilityNav` prüfte kein Selbsttestfall den Rückfall.
- Der dritte zusätzliche Fall aus #758, eine abweichende Beschriftung im Menü, ist auf `main` schon vorhanden. r4-57 hat ihn als «Beschriftung eines Direkteinstiegs im Menü weicht ab (r4-57, N54-1)» aufgenommen. Er wird nicht doppelt aufgenommen.

## Änderung

- **`authoring/tools/contract.js`:** Der Selbsttest hat zwei neue Zeilen, 100 statt 98. Das Gate und der Renderer sind nicht geändert.
  - **«Ohne utilityNav besteht der Rückfall «Website durchsuchen» das Gate»:** Der Fall entfernt `utilityNav` und ersetzt auf allen Seiten Zeile und Menüeinträge durch den Rückfall, wie ihn der Renderer schreibt. Erwartet ist kein `nav`- und kein `utility-nav`-Blocker.
  - **«Ohne utilityNav fehlt die Rückfallzeile»:** Gleich wie oben, dazu wird auf `index.html` die Zeile entfernt. Erwartet ist `utility-nav`.
- **`audit-results/2026-10-29-nachpruefung-r4-54/NACHPRUEFUNG.md`:** Berichtigung am Ende angefügt. Die übrige Datei ist unverändert.
- **Build-Kennung:** bleibt r4-58. Gate, Renderer und Seiten sind unverändert, `site/` ist byte-gleich, neu gebaut ohne Unterschied.

## Wirkung

- In einer Kopie ausserhalb des Repositorys kennt das Gate den Rückfall nicht mehr, wie vor r4-57. Dafür wird in der Zeilenregel die Erwartung ohne `utilityNav` leer gesetzt; die Menüregel nutzt dieselbe Erwartung. Dort scheitern genau die zwei neuen Fälle: `Selbsttest: 98/100 bestanden`, erhalten jeweils `nav`. Die 98 bisherigen Fälle bestehen dabei alle. Bisher deckte also kein Fall den Rückfall ab.
- Auf `main` mit dem Gate von r4-58: 100/100.

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium und Playwright über `PLAYWRIGHT_MODULE`, auf dem Endstand:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise; `git status` danach ohne Änderung in `site/` |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien byte-gleich mit `site/` |
| Selbsttest | 100/100 |
| Suchtest | 216 von 216 |
| Sprach-/UI-Test | 73 Prüfungen, JS-Fehler 0 |
| Layouttest | 240 Zustände, 27 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, bekannte Ausnahme B2c) |

**Nicht geändert:** die Pendenzendatei, weil PR #766 sie gerade nachführt. Der Eintrag zu diesem Nachtrag folgt nach dessen Merge.
