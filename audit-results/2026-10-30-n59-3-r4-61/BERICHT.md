# N59-3 · r4-61 · 30.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 30.10.2026:** «Nachbesserung N59-1 bis N59-3 umsetzen».

- **Ausgangsstand:** `main` = `b6777ec` (r4-60, PR #775).
- **Befunde:** aus `audit-results/2026-10-30-nachpruefung-r4-59/NACHPRUEFUNG.md` (PR #772).
- **N59-1 und N59-2** hat eine andere Sitzung parallel als r4-60 umgesetzt (PR #775, gemergt als `b6777ec` am 30.10.2026, 07:18:27 UTC, 17 Sekunden nach dem Abschluss des Codex-Reviews auf `7cbdd40`; Nachweis `audit-results/2026-10-30-n59-1-n59-2-r4-60/BERICHT.md`). Die Sitzung, die diese Arbeit gestartet hat, hat darauf hingewiesen.
- Meine erste Fassung (Branch `pruefung/2026-10-30-n59-1-bis-n59-3-r4-60`, PR #777) setzte vor #775 an und trug dieselbe Build-Kennung. Sie wird durch diesen Stand ersetzt.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

**Unabhängigkeit:** Gebaut hat die Sitzung, die die Nachprüfung r4-59 verfasst und N59-3 selbst gestellt hat. Die Nachprüfung von r4-61 muss eine andere Sitzung machen.

## Abgleich mit r4-60 (PR #775)

Bevor ich nur N59-3 umsetze, habe ich geprüft, ob #775 bei N59-1 und N59-2 alles abdeckt, was die Nachprüfung r4-59 gefunden hat:

- **Mutationen:** Das Skript der Nachprüfung r4-59 mit den Fällen Q1–Q13 (`mutationen.mjs`) habe ich gegen `main` = r4-60 und gegen meine erste Fassung laufen lassen. Ergebnis: in allen Fällen gleich, ausser den drei N59-3-Fällen P5.4, Q7 und Q8.
- **Eine Abweichung, zugunsten von #775:** #775 wertet `aria-hidden="undefined"` als nicht verborgen, meine erste Fassung als verborgen. Eigene Messung im Zugänglichkeitsbaum von Chromium 153 (CDP): `"undefined"` und `"UNDEFINED"` → `Link im Baum`, `"true"` → `Link VERBORGEN`. #775 hat recht. Meine erste Fassung hätte dort falsch blockiert.
- **Berichtigungen** zu `aria-hidden=" true "` im Selbstbericht r4-59 und in der Nachprüfung r4-58 hat #775 schon angefügt.

Offen war damit nur **N59-3**.

## Befund

- **N59-3 (gering):** `relabelled` prüfte `aria-label` und `aria-labelledby` nur am Link. Ein `<span aria-label="Mehr">` im Link ändert in Chromium den Namen zu «Mehr», das Gate meldete nichts (P5.4).

## Umsetzung

Alles in `authoring/tools/contract.js`:

- **`relabelled`:** blockiert auch `aria-label` oder `aria-labelledby` an einem Element im Link, wenn dieses Element nicht verborgen ist (`hiddenBelow`: weder das Element selbst noch eines zwischen ihm und dem Link trägt `hiddenFlag`).
  - Ein dekoratives `<svg aria-hidden="true" aria-label="Pfeil">` im Link bleibt zulässig; Chromium nennt den Link dann weiter «Kurz und klar» (Q5).
  - Die Meldungen bleiben gleich («Direkteinstieg mit aria-label oder aria-labelledby: …»).
- **Selbsttest:** drei neue Fälle (114 statt 111).
  - `<span aria-label="Mehr">` im Zeilenlink → `utility-nav`;
  - `<span aria-labelledby="x">` im Menülink → `nav`;
  - Gegenprobe: verborgenes SVG mit `aria-label` im Zeilenlink → kein `utility-nav`.
- **Build-Kennung r4-61:** in `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`. `site/` ist neu gebaut.

Kein Wortlaut, kein Stylesheet, kein Skript und kein Renderer ist geändert. N59-1 und N59-2 sind nicht noch einmal angefasst.

## Wirkung

**Seiten:** Die 24 Seiten in `site/` sind bis auf die Build-Kennung byte-gleich mit r4-60 (`diff` je Seite nach Ersetzen der Kennung: `abweichend 0, geändert 24`). Bestand: 0 Blocker, 20 Hinweise.

**Neue Fälle greifen:** Die drei Einträge habe ich in eine Kopie von `b6777ec` (r4-60) eingesetzt:

```
FAIL | Direkteinstieg mit aria-label an einem span im Link (r4-61, N59-3) | erwartet: utility-nav | erhalten: crisis-number-check
FAIL | Direkteinstieg im Menü mit aria-labelledby an einem span im Link (r4-61, N59-3) | erwartet: nav | erhalten: crisis-number-check
Selbsttest: 112/114 bestanden
```

Die Gegenprobe besteht auch mit r4-60. Sie soll eine zu breite Regel verhindern.

**Mutationen** (`mutationen-ausgabe.txt`, r4-60 gegen r4-61): Nur drei Fälle ändern sich, alle von «keine neuen Blocker» zu einem Blocker:
- P5.4 `<span aria-label>` im Zeilenlink → `utility-nav`;
- Q7 `<span aria-labelledby="x">` im Zeilenlink → `utility-nav`;
- Q8 `<span aria-label="Mehr">` im Menülink → `nav`.

Alle übrigen Fälle sind gleich, auch die Gegenproben Q5 und Q6 (verborgene Elemente mit `aria-label`) und P5.5 (`title`).

**Vergleich mit Chromium** (`aria.mjs`, `aria-ausgabe.txt`, CDP auf den mutierten Seiten aus `site/`):
- P5.4: `link «Mehr»`; Q8: Menülink `link «Mehr»`. Gate blockiert, richtig.
- Q5, Q6, P4.1, P4.4, P5.5, P7.5: `link «Kurz und klar»`. Gate meldet nichts, richtig.
- Q7: `aria-labelledby="x"` mit nicht vorhandener ID, Chromium bleibt bei `link «Kurz und klar»`; das Gate blockiert. Das ist bewusst streng, wie bisher bei `aria-labelledby` am Link selbst (P5.3, N57-2).

## Ausgeführte Prüfungen

Lokal mit Node 22.22.0, Chromium 153 und Playwright 1.63.0 über `PLAYWRIGHT_MODULE`:

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `build.mjs --production --verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `Selbsttest: 114/114 bestanden` |
| Suchtest (`dist/site`) | `Suchtest: 216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `Sprach-/UI-Test: 73 Prüfungen bestanden · JS-Fehler 0` |
| Layouttest | `240 Seitenzustände, 27 Bedienproben, 1 Abweichungen.` `tension core exceeds 1800px` (bekannte Ausnahme B2c, Exit 1 wie bisher) |
| axe-core 4.14.0 (eigener Ordner ausserhalb des Repositorys) | `axe 4.14.0, build r4-61 · Läufe: 48 · Seiten: 24 · Verstösse: 0` |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.
