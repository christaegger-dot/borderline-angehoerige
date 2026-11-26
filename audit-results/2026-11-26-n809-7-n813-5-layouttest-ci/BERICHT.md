# N809-7 und N813-5 · Layouttest in der CI, Meldung statt Abbruch · 26.11.2026

## Auftrag, Grundlage, wer baut

- **Auftrag:** Christa Egger, 26.11.2026: «einverstanden» zu drei vorgelegten Punkten:
  - «N809-7: Soll der Layouttest in die automatische Prüfung auf GitHub? Ich rate dazu.»
  - «N813-5: Soll der Screenshot-Schritt einen geschlossenen Aufklappbereich um die Figur melden?»
  - «Merge-Aufträge belegen: Für #809 bis #812 und #819 nennt GitHub keinen Auftrag, jetzt auch für #826 nicht.»
- **Rückfrage zu N809-7:** Der Layouttest ist auf `main` seit r4-70 und r4-71 rot, mit zwei bekannten Abweichungen (unten). Auf die Frage, wie er in die CI soll, wählte Christa Egger: «Sichtbar, nicht blockierend».
- **Grundlage:** `main` auf `46753a5`.
- **Wer baut:** die Sitzung, die #811 gebaut und die Nachprüfung von #809 verfasst hat. Diese Änderung muss eine andere Sitzung prüfen.
- **Umgebung:** Node 22.23.5, Playwright 1.64.0, Chromium 156.0.8078.4.

Website, Stylesheet, Skript und Renderer sind unverändert.

## Änderungen

### N813-5 · `authoring/tools/layouttest.cjs`

- **Vorher:** Der Test macht bei 375 px auf sieben Seiten ein Bild der ersten Abbildung. War sie nicht sichtbar, zum Beispiel in einem geschlossenen `<details>`, brach er nach einem Timeout ab. `ERGEBNIS.json` wurde nicht geschrieben.
- **Neu:** Der Test prüft vorher mit `isVisible()`. Ist die Abbildung nicht sichtbar, lässt er das Bild aus und meldet eine Abweichung: «`<Seite>` 375px text200=…: first figure not visible, screenshot skipped (for example inside a closed `<details>`)». Der Rest des Tests läuft weiter, und `ERGEBNIS.json` wird geschrieben.
- **Unverändert:** alle übrigen Prüfungen, auch B2c.

### N809-7 · `.github/workflows/verify-authoring.yml`

- Neuer Schritt «Layout test (Audit-04, incl. B2c) - visible, not blocking» nach dem Suchtest, mit demselben Playwright 1.64.0.
- Der Schritt hat `continue-on-error: true`. Ein roter Layouttest lässt die CI also nicht scheitern.
- Ein zweiter Schritt schreibt `ERGEBNIS.json` in die Zusammenfassung des Laufs und setzt bei Abweichungen eine Warnung.
- **Warum nicht blockierend:** Auf `main` meldet der Test zwei bekannte Abweichungen aus r4-70 und r4-71: Die Sicherheitskarte der Startseite beginnt bei 375 × 667 (802 px) und 360 × 740 (863 px) unter dem ersten Bildschirm (Website-Review Punkt 2). Blockierend wäre jeder PR an `authoring/` oder `site/` rot.
- **Folgeschritt:** Sobald der Test auf `main` grün ist, `continue-on-error` entfernen. Das steht als Kommentar im Workflow.

## Prüfung

### Gegenprobe zu N813-5

Kopie von `site/` ausserhalb des Repositorys; die Anspannungskurve auf «Verstehen» steht dort in einem geschlossenen `<details>`.

| Fassung | Ergebnis |
|---|---|
| `main` (`46753a5`) | Abbruch mit `TimeoutError` beim Bild der Abbildung, Exit 1, **kein** `ERGEBNIS.json` |
| neu | Exit 1, `ERGEBNIS.json` geschrieben (`gegenprobe-details-neu-ERGEBNIS.json`): «tension core: figure inside a disclosure …», zweimal «verstehen 375px …: first figure not visible, screenshot skipped …» (Schrift 100 % und 200 %), dazu die zwei bekannten Abweichungen zur Sicherheitskarte |

### Gates auf dem Branch (`gates.txt`)

| Gate | Ergebnis |
|---|---|
| Selbsttest | 125/125 |
| `--write-site` | 24 Seiten · 0 Blocker · 20 Hinweise; `site/` unverändert |
| `--verify-site` | 35 Dateien byte-gleich |
| Suchtest | 216/216 |
| Sprach-/UI-Test | 73 |
| Layouttest | 240 Zustände, 30 Bedienproben, **2 Abweichungen**, Exit 1: die zwei bekannten zur Sicherheitskarte. Gleich wie auf `main` ohne diese Änderung. B2c bestanden (Figur 2029 px, vierte Phase 1603 px). |

Ob der neue CI-Schritt auf GitHub läuft, zeigt erst der Lauf auf dem PR.

## Offen

- Nachprüfung durch eine andere Sitzung; Merge nur auf Auftrag.
- Layouttest blockierend schalten, sobald er auf `main` grün ist.
- N811-3 ist nicht entschieden.
