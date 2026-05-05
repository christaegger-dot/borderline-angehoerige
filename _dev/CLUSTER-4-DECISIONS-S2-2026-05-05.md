---
Datum: 2026-05-05
Quelle: CLUSTER-4-MAPPING-2026-04-30.md + CLUSTER-4-STATUS-2026-05-05.md
Zweck: Verbindliche Entscheide für Sitzung 2 — Mythen-Sektion, DSM-5-Kriterien, Selbsttest Frage 3
---

# Cluster 4 — Entscheide Sitzung 2

## Entscheid #1 — Mythen-Sektion: Architektur

**Entscheid: Option A — Sektion auf Verstehen-Page (Erweiterung des bestehenden Blocks)**

Begründung: Block ist bereits vorhanden und gut platziert. Kein eigener URL-Raum nötig, solange der Inhalt nicht deutlich wächst.

---

## Entscheid #2 — Mythen-Inhalt: Ergänzung

**Entscheid: Einen neuen Mythos ergänzen — «Borderline ist dasselbe wie Trauma.»**

Einfüge-Position: Zwischen «Grenzen setzen ist lieblos.» und «Suizid direkt anzusprechen macht es schlimmer.»

Formulierungsvorschlag:

```
«Borderline ist dasselbe wie Trauma.»

Viele Menschen mit Borderline haben traumatische Erfahrungen gemacht — das ist
dokumentiert und klinisch relevant. Borderline und PTBS sind aber eigenständige
Diagnosen mit unterschiedlichen Kernmerkmalen und Behandlungsansätzen. Eine
PTBS-Diagnose allein erklärt nicht die emotionale Dysregulation, das instabile
Selbstbild oder die Beziehungsmuster, die für Borderline charakteristisch sind.
Beide Diagnosen können gleichzeitig vorliegen (Komorbidität). Mehr dazu auf
[Begleiterkrankungen].
```

Quelle für EvidenceNote: `quellenLinks.zanarini1998` (Komorbidität BPS/PTBS) — bereits vorhanden.

---

## Entscheid #4 — Geschlechterverteilung: Architektur

**Entscheid: D — Status quo nach Sitzung 1**

Sitzung 1 hat den Satz bereits ergänzt. Kein weiterer Edit nötig.

---

## Entscheid #7 — DSM-5-Kriterien: Architektur

**Entscheid: Option B — Glossar-Aufklapp unter «Borderline-Persönlichkeitsstörung»**

Einfüge-Ort: Im bestehenden BPS-Eintrag in `Glossar.tsx` als `expandable`-Block (analog zu bestehenden Einträgen mit `example`-Feld).

Inhalt: Die 9 DSM-5-Kriterien mit 5-Schwelle, kompakt formuliert für Angehörige ohne Fachjargon.

---

## Entscheid #8 — DSM-5 vs. ICD-11

**Entscheid: Nur DSM-5 (9 Kriterien, 5-Schwelle)**

Begründung: DSM-5 ist die Diagnosesprache, mit der Angehörige in der Schweiz am häufigsten konfrontiert werden. ICD-11 noch nicht flächendeckend eingeführt. Beide erzeugen Verwirrung ohne Mehrwert für Angehörige.

DSM-5-Kriterien (9 Kriterien, mindestens 5 für Diagnose):
1. Verzweifeltes Bemühen, reales oder vorgestelltes Verlassenwerden zu vermeiden
2. Instabile und intensive zwischenmenschliche Beziehungen (Idealisierung ↔ Entwertung)
3. Instabiles Selbstbild oder Selbstwahrnehmung
4. Impulsivität in mindestens zwei potenziell selbstschädigenden Bereichen
5. Wiederkehrende suizidale Handlungen, Drohungen oder Selbstverletzungen
6. Ausgeprägte Stimmungsinstabilität
7. Chronisches Gefühl der Leere
8. Unangemessene, intensive Wut oder Schwierigkeiten, Wut zu kontrollieren
9. Vorübergehende, stressabhängige paranoide Vorstellungen oder Dissoziation

Formulierung für Angehörige: Kriterien knapp, nicht klinisch-trocken — mit kurzem Einleitungssatz «Für eine Diagnose müssen mindestens 5 der folgenden 9 Merkmale zutreffen.»

---

## Entscheid #9 — Selbsttest Frage 3

**Entscheid: Option B — Frage umformulieren auf Intensität statt Dauer**

Neue Frage: «Wie intensiv war die Belastung in den letzten Wochen?»
Neuer Subtext: «Dies hilft uns, passende Ressourcen zu empfehlen.» (unverändert)

Neue Optionen mit angepassten Gewichtungen:

| Option | value | Gewichtung |
|---|---|---|
| Kaum spürbar — ich komme gut zurecht | `niedrig` | `{ verstehen: 4, unterstuetzen: 4 }` |
| Deutlich spürbar — es kostet mich Kraft | `mittel` | `{ kommunizieren: 4, grenzen: 3, selbstfuersorge: 3 }` |
| Sehr stark — ich bin oft erschöpft | `hoch` | `{ selbstfuersorge: 6, grenzen: 3, kommunizieren: 2 }` |
| Ich bin am Limit | `limit` | `{ selbstfuersorge: 8, krise: 3, grenzen: 2 }` |

Hinweis: 4 Optionen statt 3 — UX-Mehraufwand minimal, da kein zusätzlicher Schritt.

---

## Zusammenfassung: 4 Edits in 3 Dateien

| Edit | Datei | Was |
|---|---|---|
| A | `client/src/pages/Verstehen.tsx` | Neuer Mythos «Borderline ist dasselbe wie Trauma.» einfügen |
| B | `client/src/pages/Glossar.tsx` | DSM-5-Kriterien als Aufklapp-Block im BPS-Eintrag ergänzen |
| C | `client/src/components/Selbsttest.tsx` | Frage 3 umformulieren — Dauer → Intensität, 3 → 4 Optionen |
| D | `client/src/__tests__/` | Tests für Selbsttest-Frage-3-Optionen anpassen (neue values) |
