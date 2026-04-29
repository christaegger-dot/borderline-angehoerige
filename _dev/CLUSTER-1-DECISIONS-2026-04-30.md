# Cluster-1-Decisions – Christas Antworten zu §10 + Bateman/Fonagy-Verifikation

**Datum:** 30. April 2026
**Brief:** `_dev/CLUSTER-1-BRIEF-2026-04-30.md`
**Mapping:** `_dev/CLUSTER-1-MAPPING-2026-04-30.md`
**Audit:** `_dev/AUDIT-CONTENT-QUALITY-2026-04-28.md`
**Scope:** Persistente Referenz für Sitzung 1 + 2. Bei jedem Implementations-Schritt zurückkommen, um Halluzinationen zu vermeiden.

---

## 1. Christa-Antworten zu den 10 §10-Fragen

### F1 — Zaccaro et al. 2018 ✅ Bestätigt

**Quellenangabe vollständig:**

> Zaccaro A, Piarulli A, Laurino M et al. (2018). _How Breath-Control Can Change Your Life: A Systematic Review on Psycho-Physiological Correlates of Slow Breathing._ Frontiers in Human Neuroscience 12:353.
> DOI: 10.3389/fnhum.2018.00353
> PubMed: 30245619

**Aktion:** Aufnehmen mit DOI/PubMed-Link.

### F2 — Paris (2020) ⚠ Vor Aufnahme verifizieren

**Vermutete Quelle:** Paris J. (2020) _Treatment of Borderline Personality Disorder: A Guide to Evidence-Based Practice._ 2nd Edition. Guilford Press.

**Methodik:** Vor Aufnahme die Inline-Aussagen in den Handouts (`handoutTextVersionContent.ts` Z. 2787 + Z. 2840) im Kontext lesen, prüfen ob die Aussagen zu _diesem_ Buch passen. Wenn nicht eindeutig zuordenbar → bei Christa nachfragen, **nicht raten**.

**Sitzung-2-Aufgabe** (nicht Sitzung 1).

### F3 — Porges (2011) Polyvagal-Theorie ✅ Aufnehmen mit Kontext-Hinweis

**Quellenangabe:** Porges, S. W. (2011). _The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-Regulation._ New York: W. W. Norton.

**Hinweis-Wortlaut (genehmigt von Christa):**

> «In der klinischen Praxis – insbesondere in Trauma- und Körpertherapien – breit verwendet. Die zugrundeliegenden neurobiologischen Mechanismen sind in peer-reviewed Forschung umstritten.»

**Aktion:** Aufnehmen in Sitzung 1 mit dem Hinweis-Text. Darauf achten, dass der Hinweis als `hinweis`-Feld der Quellen-Page-Struktur eingebettet wird (analog zu bestehenden Einträgen).

### F4 — Aguirre ↪ Verschoben in Cluster 4

**Entscheidung:** Nicht in Sitzung 1 oder 2. Aguirre wird im Body nirgends referenziert — Aufnahme wäre rein additiv, keine Konsistenzkorrektur. Falls später aufgenommen: Aguirre, B. A. (2014) _Borderline Personality Disorder in Adolescents._ 2nd Ed. → in **Buchempfehlungen-Section**, nicht in Quellen-Page.

**Aktion:** `_dev/IDEAS-FUTURE.md` Cluster 4 ergänzen mit diesem Hinweis (siehe §3).

### F5 — Mason & Kreger – Variante (c) ✅ Auflagen-Hinweis

**Eintrag in `Quellen.tsx` ändern auf:**

> Mason, P. T. & Kreger, R. _Stop Walking on Eggshells / Schluss mit dem Eiertanz._ Original 1998, deutsche Ausgabe Junfermann 2010, englische 3. Auflage New Harbinger 2014.

**Inline-Verweise:** Handout-Verweise auf «Mason & Kreger (2014)» bleiben so (referenzieren englische 3. Aufl.). `UeberUns.tsx` ergänzen mit Jahr **2010** für die deutsche Ausgabe (für deutschsprachige Lesende relevanter).

**Sitzung 1**: Quellen.tsx + UeberUns.tsx anpassen.

### F6 — TFP – Variante A ✅ In Therapie-Page als 4. Option ergänzen

**Aktion:**

1. `UnterstuetzenTherapie.tsx` Z. 116-130: TFP als 4. Therapieform ergänzen.
2. Hinweis bei TFP einfügen: «In der Schweizer Versorgungsrealität weniger verbreitet als DBT, aber als evidenzbasierte Therapie etabliert.»
3. `Glossar.tsx`: Kurzer Eintrag «Übertragungsfokussierte Psychotherapie (TFP)» — analog zu DBT-Eintrag (Tonalität, Länge).

**Sitzung 2** (TFP-Sync).

### F7 — BPS-Glossar – Variante (a) ✅ Knapp analog DBT-Eintrag

**Aktion:** Neuer Glossar-Eintrag «Borderline-Persönlichkeitsstörung (BPS)»:

- Tonalität analog zu DBT-Eintrag (Glossar.tsx Z. 43-52, ~3-4 Sätze + Beispiel)
- Konsistent mit Verstehen-Page-Beschreibung (Z. 248-266) — kein Widerspruch
- ICD-11 6D11.5 erwähnen (konsistent mit Quellen-Page)
- DSM-5 als Diagnoseklassifikation erwähnen
- **Keine** DSM-5-Aufklapp-9-Kriterien-Sektion (würde Konsistenz der 21 anderen Einträge brechen)
- Falls DSM-5-Kriterien später gewünscht: eigener Cluster-4-Schritt für _alle_ fachlich-zentralen Begriffe

**Sitzung 1**.

### F8 — Gunderson & Berkowitz Family Guidelines (NEABPD) – Variante (c) ✅ Kombiniert

**Eintrag in neuer Quellen-Page-Kategorie «Versorgungs-Materialien / Praxis-Manuale»:**

- Autor:innen: Gunderson, J. G. & Berkowitz, C.
- Jahr: vermutlich 2006 mit späteren Updates → **vor Aufnahme via PubMed/NEABPD-Site verifizieren**
- Verlag: «National Education Alliance for Borderline Personality Disorder (NEABPD)»
- Online-Link: neabpd.org

**Sitzung 2** (nach Jahr-Verifikation).

### F9 — Kreger (2014) Solo-Werk ⚠ Inline-Klärung

**Vorgehen:**

1. `handoutTextVersionContent.ts` Z. 489 + Z. 2931 im Kontext lesen.
2. Prüfen, ob die Aussage zu Mason & Kreger (2014) passt — _oder_ spezifisch zu Kreger (2008) _The Essential Family Guide to BPD_.
3. Falls Mason/Kreger 2014 passt → Verweis korrigieren auf «Mason & Kreger (2014)».
4. Falls Kreger 2008 passt → Verweis ändern auf «Kreger (2008)».
5. Bei Unklarheit → bei Christa nachfragen, **nicht raten**.

**Sitzung 2**.

### F10 — Project Air Strategy – Variante (a) ✅ Eigene Kategorie

**Eintrag in neuer Quellen-Page-Kategorie «Versorgungs-Materialien / Praxis-Manuale»** (zusammen mit F8):

> Project Air Strategy (University of Wollongong, Australien). _Understanding Self-Harm & Suicidal Thinking for Families & Carers._ Online verfügbar: projectairstrategy.org

**Sitzung 1** (additiv, keine Verifikation nötig).

---

## 2. Bateman & Fonagy PubMed-Verifikation (§6.2)

PubMed-Suche durchgeführt am 2026-04-30. **Wichtige Nuance gegenüber Christas Vermutung:**

Christa schrieb: «z.B. die 2009 RCT-Studie zu MBT Outpatient, und 2013 Replication». Die 2009er-Studie ist tatsächlich der zentrale RCT. **Die 2013er-Publikation ist aber keine unabhängige Replikation, sondern eine Severity-Sub-Analyse derselben 2009-Daten.** Das sollte in der Quellen-Page nicht als «Replikation» bezeichnet werden.

Drei verifizierte Bateman/Fonagy-Publikationen, die für die MBT-Aktualisierung relevant sind:

### Kandidat A (Hauptquelle) — RCT 2009 [PMID 19833787]

> Bateman, A. & Fonagy, P. (2009). _Randomized controlled trial of outpatient mentalization-based treatment versus structured clinical management for borderline personality disorder._ American Journal of Psychiatry 166(12), 1355-1364.

[DOI: 10.1176/appi.ajp.2009.09040539](https://doi.org/10.1176/appi.ajp.2009.09040539) · PubMed: 19833787

**Inhalt:** 134 Patient:innen, 18-monatiger ambulanter MBT-RCT vs. Structured Clinical Management. Beide Gruppen verbessern sich; MBT-Gruppe zeigt steilere Verbesserung bei Suizidversuchen, Selbstverletzung, Hospitalisierungen und selbstberichteten Symptomen. **Das ist die zentrale RCT-Quelle für ambulante MBT.**

### Kandidat B (Severity-Analyse 2013) [PMID 23887998]

> Bateman, A. & Fonagy, P. (2013). _Impact of clinical severity on outcomes of mentalisation-based treatment for borderline personality disorder._ British Journal of Psychiatry 203(3), 221-227.

[DOI: 10.1192/bjp.bp.112.121129](https://doi.org/10.1192/bjp.bp.112.121129) · PubMed: 23887998

**Inhalt:** Severity-Sub-Analyse der 2009-Daten. Untersucht, welche Patient:innen besonders von MBT profitieren (Achse-II-Komorbidität als Indikator). **Keine eigenständige Replikation.** Wenn aufgenommen, dann mit dem Hinweis «Sub-Analyse der 2009er-RCT-Daten», nicht «Replikation».

### Kandidat C (Übersichtsartikel 2010) [PMID 20148147]

> Bateman, A. & Fonagy, P. (2010). _Mentalization based treatment for borderline personality disorder._ World Psychiatry 9(1), 11-15.

[DOI: 10.1002/j.2051-5545.2010.tb00255.x](https://doi.org/10.1002/j.2051-5545.2010.tb00255.x) · PubMed: 20148147 · PMC: PMC2816926

**Inhalt:** Frei zugänglicher Übersichtsartikel zu MBT als Methode (kein neuer RCT, sondern konzeptuelle Zusammenfassung). Pragmatisch, gut verlinkbar.

### Empfehlung an Christa für MBT-Update

Drei Implementierungs-Optionen für Sitzung 1:

- **Option 1 (minimal):** Beim bestehenden Bateman/Fonagy-2004-Eintrag einen Hinweis-Satz ergänzen: «Aktualisierte Wirksamkeitsdaten siehe Bateman & Fonagy (2009), American Journal of Psychiatry; sowie Storebø et al. (2020) Cochrane.» — kein neuer Eintrag.
- **Option 2 (mittlere Tiefe):** Bateman & Fonagy 2009 als eigener Eintrag in Kategorie «Klinische Studien & Forschung» mit DOI/PubMed-Link.
- **Option 3 (vollständig):** Beide 2009 RCT + 2010 World-Psychiatry-Review als eigene Einträge; 2013 Severity-Analyse weglassen, weil keine RCT-Replikation.

⚠ **Christa-Klärung vor Sitzung 1:** Welche Option? Default-Vorschlag wäre **Option 2** — sauber, ohne Inflation der Quellen-Liste, deckt den Audit-Befund ab.

(Quellen-Attribution: According to PubMed.)

---

## 3. Backlog-Updates für `_dev/IDEAS-FUTURE.md`

Werden in einem separaten Schritt eingearbeitet:

- **Cluster 1, P1-9 Routen-Aufgabe:** «Entfällt — Audit-Fehlbefund laut Mapping §0.1. `/uebungen` ist die kanonische Route, `/uebungsszenarien` existiert nicht im Code.»
- **Cluster 4 Aguirre:** «Aguirre, B. A. (2014) _Borderline Personality Disorder in Adolescents,_ 2nd Ed. → ggf. in Buchempfehlungen-Section aufnehmen, nicht Quellen-Page. Rein additiv, keine Konsistenzkorrektur.»

---

## 4. Aktualisierte Sitzung-1- und Sitzung-2-Plans

### Sitzung 1 (selbständig, keine Christa-Block ausser MBT-Option-Wahl)

| Schritt | Inhalt                                    | Aktion                                                                                                                           |
| ------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 1.1     | BPS-Glossar (F7)                          | Neuer Glossar-Eintrag, knapp analog DBT, mit ICD-11 6D11.5 + DSM-5-Erwähnung. Konsistent mit Verstehen-Page.                     |
| 1.2     | Zaccaro 2018 (F1)                         | Quellen-Page-Eintrag, Kategorie «Klinische Studien & Forschung» (oder neue passende Kategorie). DOI + PubMed.                    |
| 1.3     | Porges 2011 (F3)                          | Quellen-Page-Eintrag mit Kontext-Hinweis (von Christa genehmigter Wortlaut).                                                     |
| 1.4     | Project Air Strategy (F10)                | **Neue Kategorie «Versorgungs-Materialien / Praxis-Manuale»** in Quellen-Page anlegen. Eintrag mit Online-Link.                  |
| 1.5     | Mason/Kreger Auflagen-Konsolidierung (F5) | Quellen-Page-Eintrag aktualisieren (Variante c). UeberUns.tsx Jahr 2010 ergänzen.                                                |
| 1.6     | APA Practice Guideline (2024)             | Quellen-Page-Eintrag, Kategorie «Diagnostik & Klassifikation» oder eigene (analog Verstehen-Page-EvidenceNote, PubMed 39482953). |
| 1.7     | Storebø Cochrane (2020)                   | Quellen-Page-Eintrag (PubMed 32368793).                                                                                          |
| 1.8     | Gunderson 2011 CLPS                       | Quellen-Page-Eintrag (PubMed 21464343 — bereits in Genesung verlinkt).                                                           |
| 1.9     | Linehan 2015 DBT Skills 2nd Ed            | Quellen-Page-Eintrag (in Selbstfuersorge zitiert).                                                                               |
| 1.10    | Maslach & Leiter 2016                     | Quellen-Page-Eintrag (in Selbstfuersorge zitiert).                                                                               |
| 1.11    | Gunderson et al. 2018 Nature Reviews      | Quellen-Page-Eintrag (in Handouts zitiert; vor Aufnahme PubMed-Lookup).                                                          |
| 1.12    | Bateman/Fonagy MBT-Update                 | **Christa-Klärung Option 1/2/3 nötig.** Default Vorschlag: Option 2 (2009 RCT als eigener Eintrag).                              |
| 1.13    | Backlog-Updates                           | `IDEAS-FUTURE.md` aktualisieren (P1-9 entfällt, Aguirre nach Cluster 4).                                                         |

**Reine Additionen:** 1.1, 1.2, 1.3, 1.4, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12 (keine Risiken)
**Modifikationen:** 1.5 (Quellen-Page + UeberUns)
**Doku-Update:** 1.13

**Aufwand-Schätzung:** ~2-2.5 Std bei einem Commit pro logische Änderung. Mehrere Commits in einem Branch.

### Sitzung 2 (nach Christa-Antworten zu Sitzung-1-Folgefragen)

| Schritt | Inhalt                                                                | Christa-Block?              |
| ------- | --------------------------------------------------------------------- | --------------------------- |
| 2.1     | TFP-Sync (F6, Variante A): Therapie-Page + Glossar                    | nein                        |
| 2.2     | Paris (2020) Inline-Verifikation (F2)                                 | ggf. Rückfrage falls unklar |
| 2.3     | Kreger (2014) Inline-Klärung (F9)                                     | ggf. Rückfrage falls unklar |
| 2.4     | Gunderson & Berkowitz Family Guidelines (F8) — nach Jahr-Verifikation | nein                        |

---

## 5. Methodische Erinnerung (Christas rote Linie)

Aus dem Brief §1.3 und Christas Antwortblock:

> Bei Unklarheit: lieber Lücke dokumentieren als Halluzination committen. Falls Claude Code an einer Stelle unsicher wird, ist das _kein_ Failure — es ist genau die richtige Reaktion.

**Konkrete Anwendung in Sitzung 1+2:**

- Bei jedem Quellen-Eintrag: bibliografische Vollständigkeit prüfen, lieber Lücke ausweisen als Felder erfinden.
- Bei jedem Inline-Verweis: Aussage und Quellenpassung verifizieren, bei Unklarheit stoppen + Christa fragen.
- Beim BPS-Glossar-Eintrag: **nicht** über den klinischen Konsens hinausgehen (DSM-5-Kriterien-Logik andeuten ohne sie aufzulisten — Brief §2.6 + Audit-Brief-Konvention «kein Etikett-Framing»).
