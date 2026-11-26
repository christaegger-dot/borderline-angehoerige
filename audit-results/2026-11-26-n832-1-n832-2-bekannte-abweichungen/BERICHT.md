# N832-1 und N832-2 · Bekannte Abweichungen mit Messwertgrenze · 26.11.2026

## Auftrag, Grundlage, wer baut

- **Auftrag:** Christa Egger, 26.11.2026: «1-2: einverstanden». Die zwei Punkte waren:
  1. «N832-1 und N832-2 beheben? Mein Vorschlag: Jeder Listeneintrag bekommt eine Obergrenze für den Messwert, zum Beispiel den heutigen Wert plus eine kleine Reserve. Jeder Eintrag darf höchstens einmal treffen. JavaScript-Fehler gelten nie als bekannt. N832-5 würde ich im selben PR nachführen.»
  2. «Probe-Branch löschen?»
- **Grundlage:** `main` auf `9d0d237` (Merge von #835). Befunde aus der Nachprüfung von #832 ([PR #837](https://github.com/christaegger-dot/borderline-angehoerige/pull/837), Entwurf); ihr Nachweis liegt auf dem Branch von #837.
- **Wer baut:** die Sitzung, die #832 gebaut hat. Diese Änderung muss eine andere Sitzung prüfen.
- **Umgebung:** Node 22.23.5, Playwright 1.64.0, Chromium 156.0.8078.4.

Website, Stylesheet, Skript und Renderer sind unverändert.

## Änderungen

### `authoring/tools/layouttest.cjs`

- **N832-1:** Jeder Eintrag in `KNOWN_ISSUES` hat eine Grenze `maxTop`: 810 px für 375 × 667 (gemessen 802 px) und 871 px für 360 × 740 (gemessen 863 px), also je 8 px Reserve. Das Muster erfasst jetzt die ganze Meldung samt Messwert. Liegt die Karte tiefer als `maxTop`, ist die Abweichung **neu**.
- **N832-2:** Jeder Eintrag deckt höchstens eine Meldung. JS-Fehler der Seite sind immer neu; sie werden nach der Einstufung angehängt.
- `knownNotSeen` nennt einen Eintrag nur noch, wenn gar keine Prüfmeldung zu seinem Muster passt. Eine verschlechterte Abweichung löst keinen Hinweis «Eintrag entfernen» aus.
- **N832-6:** Ein altes `ERGEBNIS.json` im Ausgabeordner wird am Anfang des Laufs gelöscht.
- **Unverändert:** der Exit-Code (1 bei jeder Abweichung) und alle Prüfungen selbst.

### `authoring/tools/layouttest-report.cjs` (N832-6)

- Schritt «failure» oder «cancelled» ohne Abweichung in `ERGEBNIS.json` gilt als Widerspruch und lässt den Job scheitern.
- JSON `null` oder ein Wert, der kein Objekt ist, ergibt die Meldung «ERGEBNIS.json enthält kein Ergebnisobjekt».
- In der Zusammenfassung stehen Meldungen einzeilig, HTML- und Markdown-Zeichen sind maskiert.

### `PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md`

- N832-5: #831 steht im Eintrag zu N813-5 als gemergt, mit Verweis auf den Nachweis auf `main`.
- #835 als gemergt, #837 und diese Nachbesserung eingetragen.

## Prüfung (`proben.txt`, `probe.sh`)

Jede Probe läuft auf einer Kopie von `site/` ausserhalb des Repositorys; verändert ist dort nur `index.html`.

| Probe | Layouttest | Bericht |
|---|---|---|
| A · unverändert | 2 Abweichungen (2 bekannt, 0 neu) | Warnung, **Exit 0** |
| V1 · Sicherheitskarte bei ≤ 375 × ≤ 760 px rund 2000 px tiefer (2782 / 2843 px) | 2 Abweichungen (0 bekannt, **2 neu**) | 2 Fehlermeldungen, **Exit 1** |
| V1b · Karte 5 px tiefer (807 / 868 px, innerhalb der Reserve) | 2 bekannt, 0 neu | Warnung, **Exit 0** |
| V1c · Karte 20 px tiefer (822 / 883 px) | 0 bekannt, **2 neu** | **Exit 1** |
| V4 · Startseite wirft einen String mit dem Text der bekannten Meldung | 18 Abweichungen (2 bekannt, **16 neu**) | 16 Fehlermeldungen, **Exit 1** |
| Schritt «failure» oder «cancelled» ohne Abweichung | – | Widerspruch, **Exit 1** |
| Schritt «success» ohne Abweichung | – | **Exit 0** |
| JSON `null` | – | **Exit 1** |
| Meldung mit HTML, Backticks, «###» und Zeilenumbruch | – | einzeilig und maskiert, Exit 1 |

Vor dieser Änderung blieben V1 und V4 grün (Nachprüfung von #832, Proben `v1` und `v4`).

Gates auf dem Branch (`gates.txt`): Selbsttest 127/127; `--write-site` ändert `site/` nicht; `--verify-site` 35 Dateien byte-gleich; Suchtest 216/216; Sprach-/UI-Test 74; Layouttest wie Probe A (240 Zustände, 38 Bedienproben).

## Nicht erledigt

- **Probe-Branch:** `probe/2026-11-26-n832-neue-abweichung-ci-nicht-mergen` (`1d90c2c`, angelegt von der Nachprüfsitzung für den CI-Beleg, kein PR) besteht weiter. Das Löschen hat die Umgebung dieser Sitzung abgewiesen. Christa Egger kann ihn auf GitHub löschen; er darf nicht gemergt werden.
- **N832-7:** Hinweis, keine Änderung.

## Offen

- Nachprüfung durch eine andere Sitzung; Merge nur auf Auftrag.
- Reserve von 8 px bestätigen oder ändern (Christa Egger); zugestimmt hat sie «eine kleine Reserve».
