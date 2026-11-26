# Nachtrag zu den Gegenproben · N813-4 · 26.11.2026

`BERICHT.md`, `mut.sh` und `mutationen.txt` in diesem Ordner sind ein historischer Nachweis zu [PR #813](https://github.com/christaegger-dot/borderline-angehoerige/pull/813). Sie bleiben unverändert. Die Nachprüfung ([PR #814](https://github.com/christaegger-dot/borderline-angehoerige/pull/814), [`NACHPRUEFUNG.md`](../2026-11-26-nachpruefung-pr-813/NACHPRUEFUNG.md), Befund N813-4) hat festgestellt, dass sich die Gegenproben nicht wiederholen lassen. Wer sie wiederholen will, muss Folgendes beachten.

- **Vergleichsstand:** `mut.sh` holt die Fassung «main» mit `git show origin/main:authoring/tools/layouttest.cjs`. Gemeint war der Stand vor #813, also **`7d5723e`**. Seit dem Merge von #813 (`c937f8e`, 26.11.2026, 16:11:04 UTC) liefert `origin/main` das neue Werkzeug. Ein erneuter Lauf vergleicht dann das Werkzeug mit sich selbst. Für eine Wiederholung `origin/main` durch `7d5723e` ersetzen.
- **Parameter:** Der Kopfkommentar nennt «`$1 Name, $2 Art …, $3 Wert`». Tatsächlich belegt das Skript die Parameter so: `$1` Repository, `$2` Arbeitsordner, `$3` Name der Probe, `$4` Art (`css`, `wrapdetails`, `grenze`), `$5` Wert.
- **Aufrufe:** Die Aufrufe von G1b bis G5 sind nicht festgehalten. Vor allem fehlt der CSS-Text von G3 (vierte Karte `display:none`) und G4 (Figur +700 px). Ableiten lassen sich nur:
  - G1b: `wrapdetails offen`;
  - G5: `wrapdetails` ohne Wert;
  - G2: `grenze`.
- **Ersatz:** Wiederholbare, fest an Commits gebundene Gegenproben stehen hier:
  - [`../2026-11-26-nachpruefung-pr-813/`](../2026-11-26-nachpruefung-pr-813/): P0 bis P7, `7d5723e` gegen `91e4ac0`;
  - [`../2026-11-26-n813-layouttest-b2c/`](../2026-11-26-n813-layouttest-b2c/): Nachbesserung N813-3, `55d006e` gegen den neuen Stand.
- Die Ergebnisse in `mutationen.txt` sind durch die Nachprüfung bestätigt: G1b entspricht P1, G5 entspricht P2.
