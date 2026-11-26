# Layouttest B2c · Korrekturen aus dem Code-Review · 26.11.2026

## Auftrag, Stand, wer

- **Auftrag:** Christa Egger, 26.11.2026: «Behebe die Punkte in einem neuen PR». Gemeint sind die neun Punkte des Code-Reviews, das dieselbe Sitzung an #809 gemacht hat (nur im Gespräch berichtet, nicht auf GitHub).
- **Grundlage:** `main` bei `7d5723e` (Nachprüfung #810 gemergt). #811 (`f91db68`) und #812 (`0ddacc5`) waren schon auf `main`.
- **Wer:** die Sitzung, die #809 gebaut und die Nachprüfung #810 angestossen hat. An #810 und #811 hat sie nicht mitgeschrieben. Sie hat aber ihr eigenes Werkzeug korrigiert. **Prüfen muss diese Korrektur eine andere Sitzung.**
- **Umgebung:** Node 22.23.5, Playwright 1.64.0, Chrome Headless Shell 156.0.8078.4 (Playwright-Revision 1248), aus `/opt/borderline-browser` (Setup-Skript der Cloud-Umgebung).

Dies ist eine technische Korrektur am Prüfwerkzeug. Sie ist keine fachliche Freigabe, und die Website ist nicht betroffen.

## Die neun Punkte und was daraus wurde

| Punkt | Stand vor diesem PR | In diesem PR |
|---|---|---|
| 1 · Sichtbarkeit der Phasenkarten nicht geprüft; letzte statt tiefster Karte; `closest('details')` sucht über die Figur hinaus | Sichtbarkeit und tiefste Karte mit #811 erledigt (N809-2, N809-3) | Als Aufklappbereich zählt nur noch ein `<details>` **innerhalb** der Figur, für Karten und Schutzhinweis (`inDisc`). |
| 2 · Keine Obergrenze für die ganze Figur | mit #811 erledigt (2400 px, N809-4) | – |
| 3 · Grenzwerte mehrfach von Hand im Code | offen; mit #811 kam 2400 an zwei Stellen dazu | Konstanten `B2C_PHASES`, `B2C_PHASE_END_MAX`, `B2C_FIGURE_MAX` für Prüfung und Meldungen. |
| 4 · Bestandene Ausnahme nur auf der Konsole | offen | Neues Feld `exceptions` in `ERGEBNIS.json` mit Figurhöhe, Ende der vierten Phase und beiden Grenzen. |
| 5 · Pendenzeintrag ohne PR-Link und mit überholtem Status; Kopfzeile nicht nachgeführt | PR-Link mit #811/#812 erledigt; #810 noch als «Entwurf, nicht gemergt» geführt; Kopfzeile auf dem 30.10.2026 | Status von #810 berichtigt, Kopfzeile auf den 26.11.2026 nachgeführt, mit Liste der offenen PRs. |
| 6 · «Chromium 1248» statt Version | mit #811 erledigt | – |
| 7 · Übergabedatei ohne Verweis auf den geänderten Entscheid | mit #811 erledigt (N809-6) | – |
| 8 · `--write-site` vor dem PR nicht ausgeführt | Ablauf | Diesmal vor dem PR ausgeführt; `site/` unverändert. |
| 9 · Branch-Name ohne Beschreibung und Datum | Ablauf | **Nicht behoben:** Die Cloud-Sitzung darf nur auf `claude/sharp-mendel-6ecwbi` pushen. Der Name verstösst weiter gegen die Konvention in `AGENTS.md`. |

## Messung

| Prüfung | Ergebnis |
|---|---|
| `layouttest.cjs` | 240 Zustände, 27 Bedienproben, 0 Abweichungen, Exit 0. `ERGEBNIS.json`: `exceptions` = B2c, Figur 1992 px, vierte Phase 1603 px, Grenzen 1800/2400 px |
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise; `git status site` leer |
| `build.mjs --production --verify-site` | 35 Dateien byte-gleich |
| `selftest.mjs` | 125/125 |
| `suchtest.mjs site` | 216/216, JS-Fehler 0 |
| `sprachtest.mjs site` | 73 bestanden, JS-Fehler 0 |

## Gegenproben

Skript `mut.sh`, Ausgaben `mutationen.txt`. Jede Probe läuft in einer Wegwerfkopie mit dem neuen Werkzeug («neu») und mit dem Stand von `main` («main»).

| Probe | neu | main | Bedeutung |
|---|---|---|---|
| G1b · Figur in offenem `<details>` | 0 Abweichungen | 1 Abweichung («0 phase cards outside disclosures») | Die Karten sind ohne Aufklappen sichtbar. `main` meldete hier fälschlich einen Fehler. |
| G2 · Grenze 1500 px | Meldung «beyond 1500px» | Meldung «beyond 1800px» | Die Meldung nennt jetzt die geprüfte Grenze. |
| G3 · vierte Karte `display:none` | erkannt | erkannt | unverändert |
| G4 · Figur +700 px | erkannt (2692 > 2400) | erkannt | unverändert |
| G5 · Figur in geschlossenem `<details>` | Exit 1, `TimeoutError` | Exit 1, `TimeoutError` | Der Test bricht schon beim Screenshot der Figur ab, bevor B2c geprüft wird. Er schlägt also fehl, prüft dabei aber nicht die B2c-Logik. |

**Hinweis:** `audit-results/2026-11-26-n809-layouttest-b2c/mut.sh` (Probe M0) ersetzt `c.end>1800` per `sed`. Gegen das neue Werkzeug greift diese Ersetzung nicht mehr; dafür gibt es hier G2.
