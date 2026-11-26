# N829-2 · Bekannte Abweichungen des Layouttests als Liste, neue blockieren in der CI · 26.11.2026

## Auftrag, Grundlage, wer baut

- **Auftrag:** Christa Egger, 26.11.2026: «1-3: einverstanden». Punkt 2 lautete: «N829-2: In der CI sieht eine neue Abweichung gleich aus wie die zwei bekannten. Soll der Test die bekannten als Liste führen und nur unbekannte eigens melden? Ich rate dazu, sonst gewöhnt man sich an die Dauerwarnung.»
- **Grundlage:** `main` auf `7a02774` (Merge von #829). Befund N829-2 aus der Nachprüfung von #829 (PR #831).
- **Wer baut:** die Sitzung, die #829 gebaut hat. Diese Änderung muss eine andere Sitzung prüfen.
- **Umgebung:** Node 22.23.5, Playwright 1.64.0, Chromium 156.0.8078.4.

Website, Stylesheet, Skript und Renderer sind unverändert.

## Änderungen

### `authoring/tools/layouttest.cjs`

- Neue Liste `KNOWN_ISSUES` mit den zwei bekannten Abweichungen: Sicherheitskarte der Startseite bei 375 × 667 und 360 × 740 (r4-70 und r4-71, Website-Review Punkt 2). Verglichen wird der Anfang der Meldung, ohne den Messwert.
- `ERGEBNIS.json` hat drei neue Felder: `knownIssues`, `newIssues` und `knownNotSeen` (Einträge der Liste, die nicht mehr auftreten). `issues` bleibt wie bisher.
- Die Schlusszeile nennt «… Abweichungen (n bekannt, m neu)».
- **Unverändert:** Der Exit-Code ist 1, sobald es irgendeine Abweichung gibt. Bekannte Abweichungen gelten nicht als bestanden. Alle Prüfungen selbst sind unverändert.

### `authoring/tools/layouttest-report.cjs` (neu) und `.github/workflows/verify-authoring.yml`

- Der Berichtsschritt der CI ruft das neue Skript auf. Es liest `ERGEBNIS.json` und schreibt die Zusammenfassung des Laufs.
- **Nur bekannte Abweichungen:** Warnung, der Job bleibt grün.
- **Eine neue Abweichung:** je Abweichung eine Fehlermeldung, **der Job scheitert**.
- **`ERGEBNIS.json` fehlt, ist unlesbar oder hat die neuen Felder nicht:** Fehlermeldung, der Job scheitert.
- **Bekannte Abweichung tritt nicht mehr auf:** Hinweis, den Eintrag aus `KNOWN_ISSUES` zu entfernen.
- Der Schritt «Layout test» selbst behält `continue-on-error`.

### Abweichung vom Wortlaut des Entscheids

Der Entscheid sagt «nur unbekannte eigens melden». Umgesetzt ist mehr: Eine neue Abweichung lässt den Job **scheitern**. Grund: Laut N829-2 zeigt ein Pull Request die Prüfung `build-and-compare` sonst weiter grün, und eine blosse Meldung im Lauf sieht niemand, der nur die Prüfungen ansieht. **Christa Egger muss das bestätigen.** Wer nur melden will, ersetzt im Skript das Scheitern durch Exit 0; die Meldungen bleiben.

## Prüfung (`proben.txt`)

| Probe | Layouttest | Bericht |
|---|---|---|
| A · unveränderte Website | 240 Zustände, 38 Bedienproben, 2 Abweichungen (2 bekannt, 0 neu), Exit 1 | Warnung, **Exit 0** |
| B · Figur in geschlossenem `<details>` | 5 Abweichungen (2 bekannt, 3 neu), Exit 1 | 3 Fehlermeldungen, **Exit 1** |
| C · `ERGEBNIS.json` fehlt | – | Fehlermeldung, **Exit 1** |
| D · alles behoben (konstruiert) | – | Hinweis «Eintrag entfernen», **Exit 0** |
| E · altes Format ohne die neuen Felder | – | Fehlermeldung, **Exit 1** |

Gates auf dem Branch (`gates.txt`): Selbsttest 127/127; `--write-site` ändert `site/` nicht; `--verify-site` 35 Dateien byte-gleich; Suchtest 216/216; Sprach-/UI-Test 73; Layouttest wie Probe A.

Ob der Berichtsschritt auf GitHub läuft, zeigt erst der Lauf auf dem PR.

## Offen

- Bestätigung, dass neue Abweichungen den Job scheitern lassen sollen (Christa Egger).
- Nachprüfung durch eine andere Sitzung; Merge nur auf Auftrag.
- `continue-on-error` entfernen und `KNOWN_ISSUES` leeren, sobald der Layouttest auf `main` grün ist.
