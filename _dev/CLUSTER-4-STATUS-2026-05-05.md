---
Datum: 2026-05-05
Quelle: `_dev/CLUSTER-4-MAPPING-2026-04-30.md` (commit 035d8f8)
Zweck: Strukturierter Status-Bericht über die 16 Christa-Rückfragen aus dem Cluster-4-Mapping, sortiert nach Komplexität (klein zuerst). Vorbereitung für Stream 3, kein Implementations-Auftrag.
---

# Cluster 4 — Status der 16 Rückfragen

## Reality-Check vs. Mapping (2026-04-30 → 2026-05-05)

Alle 16 Rückfragen aus `§9` des Mappings sind weiterhin offen. Kein Cluster-4-PR wurde seit 2026-04-30 gemergt. Eine Detail-Notiz: Rückfrage #9 Option D ist durch Cluster-3-PR #327 bereits teilweise gelebt — der Cross-Link `/diagnostik` im Result-Bucket «verstehen» bei `vermutung`-Selektion im Selbsttest ist live.

---

## 16 Rückfragen sortiert nach Komplexität (klein → gross)

### KLEIN — 6 direkte Entscheide, kein Editorial-Aufwand

| # | Rückfrage | Mapping-Referenz | Optionen | Empfehlung Mapping |
|---|---|---|---|---|
| #6 | Recovery-Zeit: Zeitangabe in 50%-Zelle ergänzen oder Über-/Unter-Satz? | §3 | A (Zelle) / B (Satz) | — |
| #16 | Sitzungs-Modell: I (eine Sitzung), II (zwei nach Aufwand), III (drei nach Thema)? | §8 | I / II / III | II |
| #5 | Geschlechterverteilung: Wortlaut kurz-neutral oder ausführlich mit NESARC-Bezug? | §2 | kurz / ausführlich | — |
| #12 | Home.tsx:204 «erkrankte Person» → «betroffene Person» normalisieren? | §6 | ja / nein | — |
| #13 | Aguirre: Option A (Eltern-Kategorie), B (eigene Unterkategorie englisch), C (Verzicht)? | §7 | A / B / C | A |
| #14 | Aguirre: `highlight: true` wie Trasselli in derselben Kategorie? | §7 | ja / nein | — |

### KLEIN (bedingt) — 4 Entscheide, die von vorgelagerten Entscheiden abhängen

| # | Rückfrage | Abhängigkeit | Optionen |
|---|---|---|---|
| #15 | Aguirre zusätzlich in Quellen.tsx aufnehmen (analog Mason & Kreger)? | bedingt durch #13 ≠ C | ja / nein |
| #11 | Sprachregelung: Option A (Glossar), B (Memo), C (Memo + Konsistenz-Pass), D (Status quo)? | unabhängig, aber beeinflusst #12 | A / B / C / D |
| #10 | Selbsttest: 8 statt 7 Fragen für die UX akzeptabel? | bedingt durch #9 = A | ja / nein |
| #3 | Mythen-Sub-Nav: Eintrag in welcher Gruppe? | bedingt durch #1 = B | Gruppe wählen |

### MITTEL — 4 Entscheide mit Editorial-Aufwand oder Architektur-Spannung

| # | Rückfrage | Mapping-Referenz | Kern-Spannung |
|---|---|---|---|
| #4 | Geschlechterverteilung: Architektur Option A (Verstehen-Satz), B (Glossar), C (FAQ), D (mit Mythen verschränkt)? | §2 | verschränkt mit #1 |
| #2 | Mythen-Inhalt: Welche Mythen aufnehmen? (Vorschlag: Behandelbarkeit, Manipulation, Trauma/PTBS, Suizid-Direktansprache, Geschlecht) | §1 | bedingt durch #1 ≠ D |
| #7 | DSM-5-Kriterien: Option A (Verstehen-Aufklapp), B (Glossar), C (Diagnostik-Sektion), D (Verzicht)? | §4 | Brief-Spannung «kein Etikett-Framing» |
| #8 | DSM-5 vs. ICD-11: Nur DSM-5, nur ICD-11, oder beides? | §4 | bedingt durch #7 ≠ D |

### GROSS — 2 Entscheide mit strukturellen Konsequenzen

| # | Rückfrage | Mapping-Referenz | Konsequenz |
|---|---|---|---|
| #1 | Mythen-Sektion-Architektur: Option A (Sektion auf Verstehen), B (eigene `/mythen`-Page), C (FAQ-Kategorie), D (Status quo)? | §1 | bestimmt #2, #3, #4 |
| #9 | Selbsttest Frage 3: Option A (Splitting 3a/3b), B (Umformulierung), C (vierte Option entfernen), D (Status quo)? | §5 | A wäre Mechanik-Umbau |

---

## Mappings-Empfehlung Sitzungs-Modell II

**Sitzung 1 — niedrige Hängefrucht (~30 Min Implementation):**
- #6 Recovery-Zeit (1-Wort-Edit auf /genesung)
- #13/#14/#15 Aguirre-Block (Buchempfehlungen + optional Quellen.tsx)
- #11/#12 Sprachregelung-Memo + Home.tsx-Normalisierung
- #5 Geschlechterverteilung Mini-Variante (Option A oder B)

**Sitzung 2 — eigentliche Editorial-Arbeit:**
- #1 Mythen-Sektion-Architektur (Entscheid zieht #2, #3, #4 nach sich)
- #7/#8 DSM-5-Kriterien-Architektur
- #9/#10 Selbsttest Frage 3

---

## Nächster Schritt

Sobald Christas Antworten auf die 16 Rückfragen vorliegen, werden sie in `_dev/CLUSTER-4-DECISIONS-2026-05-05.md` zusammengefasst. Danach folgen die Briefs für Sitzung 1 (und 2) — kein Code-Edit vor Decisions-Bestätigung.
