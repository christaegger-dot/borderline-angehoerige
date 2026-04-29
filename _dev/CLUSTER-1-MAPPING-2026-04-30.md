# Cluster-1-Mapping – Phase 0 Inventar

**Datum:** 30. April 2026
**Brief-Referenz:** `_dev/CLUSTER-1-BRIEF-2026-04-30.md`
**Audit-Referenz:** `_dev/AUDIT-CONTENT-QUALITY-2026-04-28.md`
**Scope:** Read-only. Kein Code-Change. Inventar + Diff + Empfehlung mit Christa-Rückfragen am Ende.

---

## 0. Audit-Korrektur vorab — wichtig

Bei der Durchführung des Inventars wurde **eine Aussage des Volltext-Audits widerlegt** und **eine Lücke entdeckt**. Beides sollte vor Phase-1-Start klar gelesen werden.

### 0.1 P1-9 «Tote FAQ-Routen» — Audit-Annahme war falsch

Der Audit notierte (`AUDIT-CONTENT-QUALITY-2026-04-28.md` Zeile 178-180):

> Z. 78: `/uebungen` — die Route heisst `/uebungsszenarien` (siehe `pages/Uebungsszenarien.tsx`). Wenn die Route nicht aliasiert ist, läuft das in 404 oder Redirect.

**Das stimmt nicht.** `client/src/app/routes.ts` Z. 101 deklariert:

```ts
{ path: "/uebungen", component: Uebungsszenarien, requiresMotion: true },
```

Die kanonische Route ist `/uebungen`. Der **Datei-Name** ist `Uebungsszenarien.tsx`, der **URL-Pfad** ist `/uebungen`. Alle 8 internen Verweise im Code (FAQ Z. 77 + 116, SEO-canonical, searchIndex, Breadcrumbs, UXEnhancements TOC, routeAccent) verwenden konsistent `/uebungen`. Es gibt **null Verweise** auf `/uebungsszenarien` im gesamten Repo.

**Konsequenz für Phase 1:** Finding P1-9 ist **inhaltlich erledigt** — keine Action nötig. Trotzdem in der Phase-1-Liste als «verifiziert, kein Change» markieren, damit der Audit-Bericht nicht unkommentiert stehenbleibt.

### 0.2 Neue Funde aus den Handouts — nicht im Audit erfasst

`client/src/content/handoutTextVersionContent.ts` (3'089 LOC) enthält ~37 Inline-Quellen-Verweise in `sourceLine`-Feldern und Hinweis-Texten. Diese wurden im Volltext-Audit explizit ausgenommen («Was nicht im Scope dieses Audits war: […] Handout-Textversionen»). Beim Quellen-Inventar müssen sie aber mit-erfasst werden, sonst entsteht eine zweite Inkonsistenz-Schicht. Konkrete Funde unter §3.

---

## 1. Quellen-Inventar — alle Inline-Zitate

Tabelle aller Stellen, an denen Quellen oder Studien im Body-Text der Site referenziert werden. Inkludiert Pages, Sections und Handout-Textversionen.

### 1.1 In Pages und Sections

| #   | Datei                          | Zeile   | Zitierung im Wortlaut                                                                                                                                                                                                                                            | Vermutete Quelle                                                  |
| --- | ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1   | `Home.tsx`                     | 147-152 | «Zur Bindungssensibilität und Verlassenheits-Reaktivität bei BPS: Linehan, _Cognitive-Behavioral Treatment of Borderline Personality Disorder_; APA Practice Guideline (2024).»                                                                                  | Linehan 1993 + APA 2024                                           |
| 2   | `Verstehen.tsx`                | 273-291 | EvidenceNote «Quellen zur diagnostischen und klinischen Einordnung» mit 3 Einträgen: WHO ICD-11 6D11.5 (Link who.int) / APA Practice Guideline (2024) (PubMed 39482953) / Linehan, Cognitive-Behavioral Treatment of BPD                                         | WHO ICD-11 + APA 2024 + Linehan 1993                              |
| 3   | `Genesung.tsx`                 | 296-310 | EvidenceNote «Quellen zu Prognose- und Remissionsaussagen»: Zanarini et al. (2010) – McLean Study (PubMed 20395399) / Zanarini et al. (2012) – Sustained remission (PubMed 22737693) / Gunderson et al. (2011) – Ten-year course of BPD (CLPS) (PubMed 21464343) | Zanarini 2010 + Zanarini 2012 + Gunderson 2011                    |
| 4   | `Selbstfuersorge.tsx`          | 322     | EvidenceNote «Quelle zur Radikalen Akzeptanz»: «Linehan, DBT Skills Training Manual, 2. Aufl. (2015)»                                                                                                                                                            | Linehan 2015 (DBT Skills 2nd Ed)                                  |
| 5   | `Selbstfuersorge.tsx`          | 359     | «Angehörige von Menschen mit BPS berichten in Studien häufig von erhöhter Belastung und Erschöpfung (u. a. Hoffman et al., 2005)»                                                                                                                                | Hoffman et al. 2005                                               |
| 6   | `Selbstfuersorge.tsx`          | 364     | «Atemübungen und andere kurze Regulationsübungen können helfen, akute Anspannung im Körper zu senken (u. a. Zaccaro et al., 2018)»                                                                                                                               | Zaccaro et al. 2018                                               |
| 7   | `Selbstfuersorge.tsx`          | 369     | «Soziale Unterstützung gilt als wichtiger Schutzfaktor gegen Überlastung und Erschöpfung (u. a. Maslach & Leiter, 2016)»                                                                                                                                         | Maslach & Leiter 2016                                             |
| 8   | `FAQ.tsx`                      | 408-428 | EvidenceNote «Quellen zu Prognose- und Therapieaussagen»: Zanarini 2010 / Zanarini 2012 / Gunderson 2011 / **Storebø et al. (2020) Cochrane** (PubMed 32368793)                                                                                                  | Zanarini 2010 + Zanarini 2012 + Gunderson 2011 + **Storebø 2020** |
| 9   | `Glossar.tsx`                  | 75      | «Studien zeigen, dass 85–93% der Betroffenen innerhalb von 10 Jahren eine Remission erreichen (u.a. Zanarini et al., 2010)»                                                                                                                                      | Zanarini 2010                                                     |
| 10  | `Glossar.tsx`                  | 83      | «Etwa 50% der Betroffenen erreichen nach 10 Jahren eine vollständige Recovery (Zanarini et al., 2012)»                                                                                                                                                           | Zanarini 2012                                                     |
| 11  | `UeberUns.tsx`                 | 219     | «Der Begriff «Eiertanz» aus dem Standardwerk von Paul T. Mason und Randi Kreger…»                                                                                                                                                                                | Mason & Kreger                                                    |
| 12  | `UeberUns.tsx`                 | 256-269 | EvidenceNote: APA Practice Guideline (2024) + NEA-BPD / Family Connections                                                                                                                                                                                       | APA 2024 + Family Connections (Hoffman 2005)                      |
| 13  | `UeberUns.tsx`                 | 318-340 | EvidenceNote «Was wir lesen»: Linehan / Mason & Kreger Stop Walking on Eggshells / Kreisman & Straus Ich hasse dich – verlass mich nicht / Family Connections (NEA-BPD / Alan Fruzzetti)                                                                         | Linehan + Mason/Kreger + Kreisman/Straus + Fruzzetti              |
| 14  | `Impressum.tsx`                | 252-279 | EvidenceNote «Fachliteratur-Block»: Mason/Kreger / Linehan / Fruzzetti / Gunderson & Hoffman                                                                                                                                                                     | Standard-4er                                                      |
| 15  | `VerstehenSupportSections.tsx` | 57      | «Fruzzetti, The High-Conflict Couple / DBT-informed family work»                                                                                                                                                                                                 | Fruzzetti 2006                                                    |
| 16  | `VerstehenSupportSections.tsx` | 61      | «NEA-BPD / Family Connections»                                                                                                                                                                                                                                   | Hoffman et al. 2005 (= Family Connections-Programm)               |
| 17  | `Buchempfehlungen.tsx`         | 56-68   | Buchliste: Mason & Kreger / Kreisman & Straus / weitere                                                                                                                                                                                                          | Standard-Werke                                                    |
| 18  | `Buchempfehlungen.tsx`         | 117     | «Stellt erstmals im deutschen Sprachraum die von Alan Fruzzetti und Perry Hoffman entwickelten Familienskills vor»                                                                                                                                               | Fruzzetti + Hoffman                                               |

### 1.2 In Handouts (`handoutTextVersionContent.ts`)

| #   | Zeile                                                | Zitierung                                                                                                                                                                                                  | Vermutete Quelle                                               |
| --- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| H1  | 322                                                  | «Quellen: Gunderson & Berkowitz, BPD Family Guidelines (NEABPD); Project Air Strategy, Understanding Self-Harm & Suicidal Thinking for Families & Carers.»                                                 | Gunderson & Berkowitz Family Guidelines + Project Air Strategy |
| H2  | 489                                                  | «Quelle: Gunderson et al., Family Guidelines; Kreger (2014).»                                                                                                                                              | Gunderson Family Guidelines + Kreger 2014                      |
| H3  | 609                                                  | «Quelle: Mason/Kreger (2014); Gunderson (2011).»                                                                                                                                                           | **Mason/Kreger 2014** + Gunderson 2011                         |
| H4  | 738                                                  | «Quelle: Achtsamkeitsbasierte Angehörigenarbeit, nach DBT (Linehan, 1993).»                                                                                                                                | Linehan 1993                                                   |
| H5  | 813                                                  | «Quelle: Gunderson et al., Family Guidelines for Borderline Personality Disorder.»                                                                                                                         | Gunderson Family Guidelines                                    |
| H6  | 874                                                  | «Quelle: DBT-orientierte Angehörigenarbeit; Fruzzetti (2006), Family Psychoeducation.»                                                                                                                     | Fruzzetti 2006                                                 |
| H7  | 983                                                  | «Quelle: Psychoedukation, Emotionsmodell nach DBT (Linehan, 1993).»                                                                                                                                        | Linehan 1993                                                   |
| H8  | 1058                                                 | «Quelle: Nach Linehan (2015), DBT Skills Training, Handouts 10, 15, 16. Gunderson et al. (2011), Family Psychoeducation for BPD.»                                                                          | Linehan 2015 + Gunderson 2011                                  |
| H9  | 1128                                                 | «Quelle: Mason/Kreger (2014); Linehan (1993).»                                                                                                                                                             | Mason/Kreger 2014 + Linehan 1993                               |
| H10 | 1195                                                 | «Quelle: Porges (2011), Polyvagal-Theorie; Linehan (1993).»                                                                                                                                                | **Porges 2011** + Linehan 1993                                 |
| H11 | 1267                                                 | «Quelle: Mason/Kreger (2014).»                                                                                                                                                                             | Mason/Kreger 2014                                              |
| H12 | 1444                                                 | «Quelle: Maslach/Leiter (2016), Burnout-Prävention; Mason/Kreger (2014).»                                                                                                                                  | Maslach & Leiter 2016 + Mason/Kreger 2014                      |
| H13 | 1533                                                 | «Quelle: Mason/Kreger (2014), Angehörigen-Psychoedukation.»                                                                                                                                                | Mason/Kreger 2014                                              |
| H14 | 1597                                                 | «Quelle: Linehan (1993), DBT Skills Training.»                                                                                                                                                             | Linehan 1993                                                   |
| H15 | 1702                                                 | «Quelle: Maslach und Leiter (2016), Burnout-Prävention.»                                                                                                                                                   | Maslach & Leiter 2016                                          |
| H16 | 1761                                                 | «Quelle: Selbstfürsorge-orientierte Angehörigenarbeit, nach Mason/Kreger (2014).»                                                                                                                          | Mason/Kreger 2014                                              |
| H17 | 1864                                                 | «Quellen: [1] Gunderson & Berkowitz, BPD Family Guidelines (NEABPD). [2] Fruzzetti, Hoffman & Buteau, Family Connections (NEABPD, 2005). [3] **Gunderson et al., Nature Reviews Disease Primers (2018)**.» | + **Gunderson 2018 Nature Rev**                                |
| H18 | 1959                                                 | «Quelle: Linehan (1993), DBT Skills Training.»                                                                                                                                                             | Linehan 1993                                                   |
| H19 | 2011                                                 | «Quellen: [1] Gunderson & Berkowitz, BPD Family Guidelines (NEABPD). [2] APA, DSM-5. [3] Linehan (1993).»                                                                                                  | Gunderson Family Guidelines + APA DSM-5 + Linehan 1993         |
| H20 | 2070, 2127, 2253, 2316, 2442, 2489, 2540, 2617, 3073 | Wiederholt: Mason/Kreger (2014); diverse Linehan / Fruzzetti-Kombinationen                                                                                                                                 | Bekannte Autor:innen                                           |
| H21 | 2696                                                 | «Quelle: Zanarini et al. (2012), McLean Study; Gunderson et al. (2011).»                                                                                                                                   | Zanarini 2012 + Gunderson 2011                                 |
| H22 | 2741                                                 | «Quelle: Zanarini et al. (2012); Mason/Kreger (2014).»                                                                                                                                                     | Zanarini 2012 + Mason/Kreger 2014                              |
| H23 | **2787 + 2840**                                      | «Quelle: Zanarini et al. (2012); **Paris (2020)**.»                                                                                                                                                        | Zanarini 2012 + **Paris 2020** ← _!_                           |
| H24 | 2931                                                 | «Quelle: Gunderson et al., Family Guidelines; Kreger (2014).»                                                                                                                                              | + Kreger 2014 (Solo-Werk?)                                     |
| H25 | 2195                                                 | «Quelle: Deeskalation nach DBT, Linehan (1993); Mason/Kreger (2014).»                                                                                                                                      | Linehan 1993 + Mason/Kreger 2014                               |
| H26 | 2373                                                 | «Quelle: Linehan (1993), DBT Skills Training, DEAR MAN.»                                                                                                                                                   | Linehan 1993                                                   |

### 1.3 Konsolidierte Liste der zitierten Quellen (eindeutige Werke)

Eindeutig genannt im Body-Text (Pages + Handouts):

1. Linehan, M. M. (1993) — Cognitive-Behavioral Treatment of BPD
2. Linehan, M. M. (2015) — DBT Skills Training Manual, 2. Aufl.
3. Mason, P. T. & Kreger, R. (**2014**) — _Wort: «Mason/Kreger»_ ← **Versionsdiskrepanz, siehe §3.2**
4. Mason, P. T. & Kreger, R. (2010) — Schluss mit dem Eiertanz (deutsche Ausgabe)
5. Kreisman, J. J. & Straus, H. (2004) — Ich hasse dich – verlass mich nicht
6. Bateman, A. & Fonagy, P. (2004) — Mentalization-Based Treatment
7. Fruzzetti, A. E. (2006) — High-Conflict Couple
8. Gunderson, J. G. & Hoffman, P. D. (2005) — Understanding & Treating BPD
9. Gunderson, J. G. (2011) — Ten-year course of BPD (CLPS) — auch als «Family Psychoeducation for BPD» referenziert
10. Gunderson & Berkowitz — BPD Family Guidelines (NEABPD)
11. **Gunderson et al. (2018)** — Nature Reviews Disease Primers
12. Hoffman, P. D. et al. (2005) — Family Connections (NEABPD)
13. Fruzzetti, Hoffman & Buteau (2005) — Family Connections — Variante derselben Publikation
14. Skodol, A. E. et al. (2005) — CLPS Quality of Life
15. Torgersen, S. et al. (2000) — Prävalenz
16. Zanarini, M. C. et al. (2010) — McLean Study Recovery
17. Zanarini, M. C. et al. (2012) — Sustained remission and recovery
18. **Storebø, O. J. et al. (2020)** — Cochrane Psychological therapies for BPD
19. **APA Practice Guideline (2024)** — Treatment of Patients with BPD
20. APA (2013) — DSM-5
21. WHO (2019) — ICD-11
22. **Maslach, C. & Leiter, M. P. (2016)** — Burnout-Prävention
23. **Zaccaro et al. (2018)** — Atemübungen / Atemphysiologie
24. **Porges, S. W. (2011)** — Polyvagal-Theorie
25. **Paris, J. (2020)** — Verlaufsforschung BPS
26. **Kreger (2014)** — Solo-Werk? _(unklar, ob das Mason/Kreger 2014 «Eiertanz»-Update meint oder ein eigenes Kreger-Werk)_
27. **Project Air Strategy** — Understanding Self-Harm & Suicidal Thinking for Families & Carers

---

## 2. Quellen-Page-Inventar — Aktueller Stand `Quellen.tsx`

14 Einträge in 4 Kategorien.

### 2.1 Klinische Studien & Forschung (5)

| #   | Autor:in               | Jahr | Titel                                                       | Link            |
| --- | ---------------------- | ---- | ----------------------------------------------------------- | --------------- |
| 1   | Zanarini, M. C. et al. | 2010 | Time to attainment of recovery from BPD                     | PubMed 20395399 |
| 2   | Zanarini, M. C. et al. | 2012 | Attainment and stability of sustained symptomatic remission | PubMed 22737693 |
| 3   | Linehan, M. M.         | 1993 | Cognitive-Behavioral Treatment of BPD                       | —               |
| 4   | Skodol, A. E. et al.   | 2005 | Prevalence and quality of life in PD (CLPS)                 | PubMed 16274278 |
| 5   | Torgersen, S. et al.   | 2000 | Prevalence of PD in community sample                        | PubMed 10872917 |

### 2.2 Fachliteratur Therapie & Behandlung (4)

| #   | Autor:in                          | Jahr | Titel                                                | Link |
| --- | --------------------------------- | ---- | ---------------------------------------------------- | ---- |
| 6   | Linehan, M. M.                    | 1996 | DBT der BPS (deutsche Ausgabe)                       | —    |
| 7   | Bateman, A. & Fonagy, P.          | 2004 | Psychotherapy for BPD: Mentalization-Based Treatment | —    |
| 8   | Fruzzetti, A. E.                  | 2006 | The High-Conflict Couple (DBT)                       | —    |
| 9   | Gunderson, J. G. & Hoffman, P. D. | 2005 | Understanding and Treating BPD                       | —    |

### 2.3 Angehörigen-Literatur (3)

| #   | Autor:in                     | Jahr     | Titel                       | Link            |
| --- | ---------------------------- | -------- | --------------------------- | --------------- |
| 10  | Mason, P. T. & Kreger, R.    | **2010** | Schluss mit dem Eiertanz    | —               |
| 11  | Kreisman, J. J. & Straus, H. | 2004     | I Hate You – Don't Leave Me | —               |
| 12  | Hoffman, P. D. et al.        | 2005     | Family Connections          | PubMed 15943545 |

### 2.4 Diagnostik & Klassifikation (2)

| #   | Autor:in                         | Jahr | Titel                              | Link       |
| --- | -------------------------------- | ---- | ---------------------------------- | ---------- |
| 13  | American Psychiatric Association | 2013 | DSM-5                              | —          |
| 14  | World Health Organization        | 2019 | ICD-11 (Borderline pattern 6D11.5) | WHO ICD-11 |

---

## 3. Diff Quellen-Inventar vs. Quellen-Page

### 3.1 Im Body zitiert, aber **fehlt** in der Quellen-Page

Geordnet nach Häufigkeit der Inline-Erwähnung:

| Quelle                                                       | Wo zitiert                                                                   | Status                                                                                                                                                                                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **APA Practice Guideline (2024)**                            | Home Footnote, Verstehen EvidenceNote, UeberUns EvidenceNote                 | **Fehlt komplett** in Quellen-Page (nur das ältere DSM-5 2013 ist drin). Stark belegt — muss rein.                                                                                                                     |
| **Storebø et al. (2020) Cochrane**                           | FAQ EvidenceNote (PubMed 32368793)                                           | Fehlt. PubMed-Link bereits in FAQ vorhanden, kann übernommen werden.                                                                                                                                                   |
| **Gunderson et al. (2011) – CLPS / Ten-year course**         | Genesung EvidenceNote, FAQ EvidenceNote, Glossar implizit, Handouts H8 + H21 | Fehlt. Quellen-Page hat nur Gunderson **& Hoffman (2005)**, das ist ein anderes Werk. PubMed 21464343 in Genesung verfügbar.                                                                                           |
| **Linehan (2015) — DBT Skills Training Manual, 2. Aufl.**    | Selbstfuersorge EvidenceNote, Handout H8                                     | Fehlt. Quellen-Page hat nur Linehan 1993 + 1996 (deutsche Ausgabe von 1996). 2015 ist die zweite Auflage des Skills Training.                                                                                          |
| **Maslach & Leiter (2016)**                                  | Selbstfuersorge EvidenceNote, Handouts H12 + H15                             | Fehlt. Wird zur Burnout-/Belastungs-Aussage zitiert.                                                                                                                                                                   |
| **Zaccaro et al. (2018)**                                    | Selbstfuersorge EvidenceNote                                                 | Fehlt. Wird zur Atemübungs-Aussage zitiert. ⚠ **Christa-Klärung (siehe §8.2)**: Vollständige Zitation unklar.                                                                                                          |
| **Paris (2020)**                                             | Handouts H23 (zwei Stellen)                                                  | Fehlt. In den Handouts als sekundäre Quelle für Verlaufsdaten. ⚠ **Christa-Klärung**: welche Paris-Publikation 2020?                                                                                                   |
| **Porges (2011) – Polyvagal-Theorie**                        | Handout H10                                                                  | Fehlt. Polyvagal-Theorie wird oft kontrovers diskutiert. ⚠ **Christa-Klärung**: ist Porges-Referenz fachlich gewollt oder rezent zu ersetzen?                                                                          |
| **Gunderson et al. (2018) — Nature Reviews Disease Primers** | Handout H17                                                                  | Fehlt. Aktuelle Übersichtsarbeit, gehört in die Quellen. PubMed: vermutlich 29888755 (zu prüfen).                                                                                                                      |
| **Gunderson & Berkowitz — BPD Family Guidelines (NEABPD)**   | Handouts H1, H2, H5, H17, H19, H24                                           | Fehlt. Kein klassisches Buch/Paper, sondern ein NEABPD-Material. Dokumentationsform muss geklärt werden.                                                                                                               |
| **Project Air Strategy**                                     | Handout H1                                                                   | Fehlt. Australisches Versorgungsmaterial. ⚠ **Christa-Klärung**: Aufnahme als Quelle oder als externer Link?                                                                                                           |
| **Mason/Kreger (2014)**                                      | Handouts H3, H9, H11, H12, H13, H16, H20, H22, H25, H26 (~10 Stellen)        | **Versionsdiskrepanz**: Quellen-Page hat «Mason & Kreger (2010)», Handouts zitieren «(2014)». Klärung nötig. Möglich: 2010 = deutsche Ausgabe «Eiertanz», 2014 = englisches Update «Stop Walking on Eggshells» 2nd Ed. |
| **Kreger (2014)** als Solo-Werk                              | Handouts H2, H24                                                             | Unklar — möglicherweise Synonym für Mason/Kreger 2014, oder eigenes Kreger-Werk («The Essential Family Guide», Kreger 2008?). ⚠ **Christa-Klärung**.                                                                   |
| **Aguirre**                                                  | nirgends gefunden                                                            | Im Audit als P2-5 vorgeschlagen, aber **nicht im Body referenziert**. Wenn aufgenommen, dann als reine Buchempfehlung (additiv). Siehe §8.4 für Empfehlung.                                                            |

### 3.2 In der Quellen-Page, aber **nirgends mehr im Body referenziert**

| Eintrag                                     | Status                                                                                                                                                                                                                                        |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skodol et al. (2005) — CLPS Quality of Life | Wird **nirgends im Body** zitiert. Steht als historische Referenz. Empfehlung: belassen (Prävalenz-Kontext).                                                                                                                                  |
| Torgersen et al. (2000) — Prävalenz         | Wird **nirgends im Body** zitiert. Quellen-Page-Hinweis sagt: «Häufigkeit von BPS in der Allgemeinbevölkerung (ca. 1–3%)». Empfehlung: belassen.                                                                                              |
| Linehan 1996 (deutsche Ausgabe)             | Wird **nirgends im Body** explizit referenziert. Wenn der Glossar-DBT-Eintrag oder andere deutsche Ausgaben verwiesen werden sollen, könnte sie Quelle bleiben. Ansonsten konsolidieren mit Linehan 1993.                                     |
| Bateman & Fonagy (2004)                     | Quellen-Page-einziger Eintrag zu MBT. Im Body: MBT wird in FAQ + Therapie-Page beschrieben **ohne** explizite Bateman/Fonagy-Zitation. Indirekt ist das die Standard-Quelle für die MBT-Beschreibung. Belassen (siehe §6 für Aktualisierung). |

### 3.3 Versionsdiskrepanz Mason/Kreger 2010 vs. 2014

- Quellen-Page Z. 137: «Mason, P. T. & Kreger, R. (2010) — Schluss mit dem Eiertanz»
- UeberUns.tsx Z. 219: «Standardwerk von Paul T. Mason und Randi Kreger» (kein Jahr)
- UeberUns.tsx Z. 325: «Mason & Kreger, Stop Walking on Eggshells» (kein Jahr)
- Handouts: ~10× «Mason/Kreger (2014)»
- Buchempfehlungen.tsx: noch nicht im Detail geprüft

Möglich: Das deutsche Buch «Schluss mit dem Eiertanz» erschien in mehreren Auflagen (Originalausgabe 1998, deutsche Übersetzung 2003, mehrere Reprints). Das englische Original «Stop Walking on Eggshells» hat eine **2014er-Neuauflage (3rd Ed)**. Welches Jahr in welcher Auflage stimmt: ⚠ **Christa-Klärung (§8.5)**.

---

## 4. TFP-Inventar

### 4.1 Wo erwähnt

| Datei     | Zeile | Kontext                                                                                                                                                                                                                                                                                                            |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `FAQ.tsx` | 185   | «Es gibt mehrere gut erforschte Methoden, zum Beispiel DBT (Dialektisch-Behaviorale Therapie), MBT (Mentalisierungsbasierte Therapie), Schematherapie oder TFP (Übertragungsfokussierte Psychotherapie). Alle können wirksam sein – wichtiger als die Methode ist oft die Passung zwischen Therapeut und Patient.» |

**Genau eine Stelle.** Eine FAQ-Antwort auf «Welche Therapie ist am besten?»

### 4.2 Wo erwartbar, aber fehlt

| Datei                       | Zeile              | Was steht aktuell                                                                                                                                  |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UnterstuetzenTherapie.tsx` | 115-130            | Liste der 3 Therapieformen: DBT, MBT, Schematherapie. **Kein TFP.**                                                                                |
| `UnterstuetzenTherapie.tsx` | 398                | Preview: «DBT, MBT und Schematherapie sind gut erforschte Behandlungsansätze.» **Kein TFP.**                                                       |
| `Glossar.tsx`               | (gar kein Eintrag) | Weder TFP noch MBT noch Schematherapie als Vollformen — nur «Mentalisierung» als Konzept (Z. 64-69) und DBT als einzige Vollform-Therapie (Z. 43). |

### 4.3 Was die FAQ-Erwähnung impliziert

Die FAQ-Formulierung «**zum Beispiel** DBT, MBT, Schematherapie oder TFP» suggeriert, dass die 4 als gleichwertig wirksam dargestellt werden. Diese Erwartung wird in der Therapie-Page nicht eingelöst — wer von der FAQ kommend «mehr über TFP» sucht, findet auf der Therapie-Page nur DBT/MBT/Schematherapie und kein Glossar-Eintrag.

Drei Auflösungswege (wie im Brief §2.3 vorgesehen):

- **Variante A:** TFP in Therapie-Page als 4. Option ergänzen + kurzen Glossar-Eintrag.
- **Variante B:** TFP aus FAQ-Antwort streichen, Liste auf 3 Verfahren reduzieren.
- **Variante C:** TFP in FAQ behalten, aber als «zusätzlich, weniger verbreitet» framen + ggf. Glossar-Stub.

⚠ **Christa-Entscheidung erforderlich (§8.6).**

---

## 5. Routen-Inventar

### 5.1 Alle Routen aus `client/src/app/routes.ts` (37 Einträge)

| Route                          | Component                                             | Bemerkung                                                 |
| ------------------------------ | ----------------------------------------------------- | --------------------------------------------------------- |
| `/`                            | Home                                                  |                                                           |
| `/verstehen`                   | Verstehen                                             |                                                           |
| `/unterstuetzen`               | redirect → `/unterstuetzen/uebersicht`                |                                                           |
| `/unterstuetzen/uebersicht`    | UnterstuetzenUebersicht                               |                                                           |
| `/unterstuetzen/alltag`        | UnterstuetzenAlltag                                   |                                                           |
| `/unterstuetzen/therapie`      | UnterstuetzenTherapie                                 |                                                           |
| `/unterstuetzen/krise`         | UnterstuetzenKrise                                    |                                                           |
| `/kommunizieren`               | Kommunizieren                                         |                                                           |
| `/grenzen`                     | Grenzen                                               |                                                           |
| `/selbstfuersorge`             | Selbstfuersorge                                       |                                                           |
| `/soforthilfe`                 | self-redirect (Static-HTML, siehe Memory)             |                                                           |
| `/notfall`                     | redirect → `/soforthilfe`                             |                                                           |
| `/materialien`                 | Materialien                                           |                                                           |
| `/materialien/text/:handoutId` | HandoutTextPage                                       |                                                           |
| `/selbsttest`                  | SelbsttestPage                                        |                                                           |
| `/impressum`                   | Impressum                                             |                                                           |
| `/datenschutz`                 | Datenschutz                                           |                                                           |
| `/genesung`                    | Genesung                                              |                                                           |
| `/beratung`                    | **Selbsthilfegruppen**                                | File-Name ≠ Route-Name (analog Übungen)                   |
| `/selbsthilfegruppen`          | redirect → `/beratung`                                |                                                           |
| `/feedback`                    | Feedback                                              |                                                           |
| `/glossar`                     | Glossar                                               |                                                           |
| `/buchempfehlungen`            | Buchempfehlungen                                      |                                                           |
| `/therapieangebote`            | redirect → `/unterstuetzen/therapie#therapieangebote` |                                                           |
| `/faq`                         | FAQ                                                   |                                                           |
| `/ueber-uns`                   | UeberUns                                              |                                                           |
| `/fachstelle`                  | Fachstelle                                            |                                                           |
| `/notfallkarte`                | Notfallkarte                                          |                                                           |
| `/wegweiser`                   | Wegweiser                                             |                                                           |
| **`/uebungen`**                | **Uebungsszenarien**                                  | **File-Name ≠ Route-Name. Das ist die kanonische Route.** |
| `/quellen`                     | Quellen                                               |                                                           |
| `/barrierefreiheit`            | Barrierefreiheit                                      |                                                           |

### 5.2 Verwendung von `/uebungen` und `/uebungsszenarien` im Code

| Pfad-String         | Vorkommen                                                                                                                                                                                 | Bewertung                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `/uebungen`         | 8 Stellen: `routes.ts:101`, `searchIndex.ts:1808`, `UXEnhancements.tsx:84`, `Breadcrumbs.tsx:32`, `routeAccent.ts:113`, `Uebungsszenarien.tsx:14` (SEO path), `FAQ.tsx:77`, `FAQ.tsx:116` | **Konsistent kanonisch.** Alle Verweise verwenden `/uebungen`. |
| `/uebungsszenarien` | **0 Stellen**                                                                                                                                                                             | Existiert nicht im Code.                                       |

### 5.3 Bewertung

Die Audit-Annahme «`/uebungen` ist tot, kanonisch ist `/uebungsszenarien`» ist **falsch**. Es ist umgekehrt: `/uebungen` ist die kanonische Route, `/uebungsszenarien` existiert gar nicht. Die FAQ-Verweise sind korrekt.

**Was möglicherweise im Audit zu der Verwirrung führte:** Das File-Naming-Pattern (Datei heisst `Uebungsszenarien.tsx`, Route heisst `/uebungen`). Dasselbe Muster gilt für `/beratung` ↔ `Selbsthilfegruppen.tsx`. Beide File-Name-Route-Mismatches sind funktional unproblematisch und im Code selbst-erklärend (siehe `routes.ts`).

**Konsequenz:** Phase-1-Schritt 1a entfällt inhaltlich. Bleibt nur als Verifikations-Notiz im Phase-1-Bericht.

---

## 6. MBT-Audit-Volltext-Klärung

### 6.1 Was der Audit konkret zu MBT sagt

Aus `_dev/AUDIT-CONTENT-QUALITY-2026-04-28.md`:

**Findings-Sektion (Z. 138-144):**

> #### P2-4 — Quellenaktualität bei MBT
>
> `Quellen.tsx` Z. 107-114 zitiert Bateman & Fonagy (2004). Seither gibt es mehrere wichtige Updates:
>
> - Bateman & Fonagy (2009, 2013): RCT-Daten zu MBT-Wirksamkeit
> - Cochrane-Updates zu psychologischen Therapien für BPS (Storebø 2020 wird in FAQ zitiert, aber nicht in Quellen-Page; siehe P1-1)
>
> Eine Aktualisierung wäre Feinschliff, kein Defizit.

**Empfehlungs-Sektion (Z. 319-321):**

> ### Zu P2-4 (MBT-Aktualität)
>
> In `Quellen.tsx` MBT-Eintrag um Verweis auf neuere RCT-Studien ergänzen (Bateman & Fonagy 2009/2013) oder einen Hinweis-Satz: «Aktualisierte Wirksamkeitsdaten siehe Storebø et al. 2020 Cochrane.»

### 6.2 Bewertung

Der Audit ist **konkret genug**, um Phase 1 zu starten:

- Konkrete neue Quellen genannt: Bateman & Fonagy 2009 + 2013, Storebø 2020 Cochrane (wird ohnehin im Rahmen P1-1 ergänzt)
- Konkrete Umsetzungs-Optionen: entweder neue Einträge in Quellen-Page **oder** Hinweis-Satz beim Bateman/Fonagy-2004-Eintrag
- Audit-Kategorisierung: «Feinschliff, kein Defizit» — niedrige Priorität

**Keine Christa-Rückfrage zu MBT-Aktualität nötig**, ausser zur Auswahl der Umsetzungs-Variante (Inline-Hinweis vs. neue Einträge).

⚠ Aber: **Verifikation, ob Bateman & Fonagy (2009) und (2013) die «richtigen» RCT-Studien sind** (es gibt mehrere Bateman/Fonagy-Publikationen in diesen Jahren). Vor Implementation PubMed-Lookup nötig, um die exakten DOIs zu fixieren — kein Erfinden.

---

## 7. BPS-Glossar-Definitions-Inventar

### 7.1 Wo «Borderline-Persönlichkeitsstörung» kompakt beschrieben wird

| Datei           | Zeile          | Wortlaut (gekürzt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Charakter                                                                      |
| --------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `Home.tsx`      | 65-67          | H1: «Wenn jemand, den Sie lieben, eine _Borderline-Persönlichkeitsstörung_ hat»                                                                                                                                                                                                                                                                                                                                                                                                               | **Frame, keine Definition**                                                    |
| `Verstehen.tsx` | 248-266        | «Die Borderline-Persönlichkeitsstörung ist ein komplexes Störungsbild. Typisch sind starke emotionale Reagibilität, Schwierigkeiten mit innerer Stabilität und ein Beziehungserleben, das unter Bindungsstress schnell ins Wanken geraten kann. Nicht alle Menschen mit Borderline zeigen dieselben Muster. Manche wirken vor allem impulsiv und explosiv, andere eher verzweifelt, zurückgezogen, leer oder selbstabwertend. Ausprägung, Verlauf und Belastung unterscheiden sich deutlich.» | **Engste Annäherung an eine kompakte Definition.** Empathisch, nicht-klinisch. |
| `UeberUns.tsx`  | 212            | «Wenn jemand, den man liebt, eine Persönlichkeitsstörung hat, stehen Angehörige oft vor einer»                                                                                                                                                                                                                                                                                                                                                                                                | Frame, keine Definition                                                        |
| `Quellen.tsx`   | 89             | Hinweis bei Torgersen 2000: «Häufigkeit von BPS in der Allgemeinbevölkerung (ca. 1–3%).»                                                                                                                                                                                                                                                                                                                                                                                                      | Prävalenz-Datenpunkt                                                           |
| `Quellen.tsx`   | 174            | «Diagnosekriterien für Borderline-Persönlichkeitsstörung im DSM-5.»                                                                                                                                                                                                                                                                                                                                                                                                                           | Verweis auf Diagnostik                                                         |
| `Quellen.tsx`   | 179-184        | «International Classification of Diseases (ICD-11) … Borderline pattern (6D11.5) als Spezifier»                                                                                                                                                                                                                                                                                                                                                                                               | ICD-11-Klassifikation                                                          |
| `Glossar.tsx`   | (kein Eintrag) | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Lücke**                                                                      |
| `Impressum.tsx` | 165            | «Borderline-Persönlichkeitsstörung:» (Überschrift)                                                                                                                                                                                                                                                                                                                                                                                                                                            | Strukturell, keine Definition                                                  |

### 7.2 Wo «BPS»-Abkürzung verwendet wird

- `Home.tsx` Z. 147 (Footnote): «Bindungssensibilität und Verlassenheits-Reaktivität bei BPS»
- `Selbstfuersorge.tsx` Z. 359: «Angehörige von Menschen mit BPS»
- `Quellen.tsx` Z. 89: «Häufigkeit von BPS»
- `Glossar.tsx` Z. 346 (SEO-description): «von BPS über DBT bis Dysregulation»

«BPS» wird also bereits verwendet, aber **nirgends eingeführt**. Lesende, die zum ersten Mal auf «BPS» stossen, müssen aus dem Kontext erraten, was die Abkürzung bedeutet.

### 7.3 Empfehlung für den neuen Glossar-Eintrag

Der neue BPS-Eintrag sollte:

1. Konsistent mit der Verstehen-Page-Beschreibung formuliert sein (gleiche Tonalität, kein Widerspruch).
2. Beide Bezeichnungen («Borderline-Persönlichkeitsstörung» und Abkürzung «BPS») klarstellen, ggf. auch englische Form (BPD).
3. ICD-11-Klassifikation 6D11.5 erwähnen (konsistent mit Quellen-Page).
4. DSM-5-9-Kriterien-Logik kurz andeuten («mehrere Merkmale aus einer Liste; mindestens 5 von 9 müssen erfüllt sein für Diagnose»), ohne die 9 Kriterien einzeln aufzulisten (Brief-Konvention: kein Etikett-Framing).
5. Verweis auf Verstehen-Page als Hauptinhalt.

⚠ **Christa-Klärung (§8.7):** Soll der Glossar-Eintrag auch die 9 DSM-5-Kriterien einzeln auflisten (als Aufklapp-Sektion)? Audit P2-8 hatte das als optionale Erweiterung vorgeschlagen.

---

## 8. Risiko-Hinweise & Christa-Rückfragen

### 8.1 Quellen-Vollständigkeit «zaccaro et al. 2018»

`Selbstfuersorge.tsx` Z. 364 zitiert «Zaccaro et al., 2018». Wahrscheinlich gemeint: Zaccaro et al. (2018) «How Breath-Control Can Change Your Life: A Systematic Review on Psycho-Physiological Correlates of Slow Breathing» (Frontiers in Human Neuroscience). Vor Aufnahme in Quellen-Page Bibliografie verifizieren.

⚠ **Christa-Rückfrage:** Ist die Zaccaro-2018-Referenz dieses Frontiers-Paper? Soll PubMed-Link ergänzt werden?

### 8.2 Paris (2020) — welches Werk?

Handouts H23 (Z. 2787 + 2840) zitieren «Paris (2020)». Mögliche Kandidaten:

- Paris, J. (2020) «Treatment of Borderline Personality Disorder: A Guide to Evidence-Based Practice» (Guilford Press, 2nd Ed)
- Paris, J. (2020) «Personality Disorders Over Time» (American Psychiatric Pub, 2003 wäre älter)
- Paris, J. (2020) Artikel/Review

⚠ **Christa-Rückfrage:** Welche Paris-Publikation 2020 ist gemeint? Ist sie für Aufnahme in Quellen-Page geeignet?

### 8.3 Porges (2011) Polyvagal-Theorie — fachlich kontrovers

Handout H10 zitiert Porges (2011) für Polyvagal-Theorie. Die Polyvagal-Theorie ist in der akademischen Psychologie/Psychophysiologie umstritten — sie wird in der klinischen Praxis (insbesondere Trauma-Therapie) weit verbreitet, aber ihre neurobiologischen Annahmen sind in der peer-reviewed Forschung mehrfach kritisiert worden.

⚠ **Christa-Rückfrage:** Soll die Porges-Referenz in Quellen-Page übernommen werden — und falls ja, mit welchem Hinweis (z.B. «in der klinischen Praxis verbreitet, neurobiologische Mechanismen umstritten»)?

### 8.4 Aguirre — wirklich aufnehmen?

Audit P2-5 schlug Aguirre als zu ergänzende Buchempfehlung vor. Inventar-Befund: **Aguirre wird nirgends im Body referenziert** (nicht in Pages, nicht in Sections, nicht in Handouts). Eine Aufnahme wäre rein additiv (neue Buchempfehlung), nicht eine Konsistenz-Korrektur.

Mögliches Werk: Aguirre, B. A. (2014/2018) «Borderline Personality Disorder in Adolescents» oder «Coping with BPD: DBT and CBT Skills to Soothe the Symptoms of BPD» (Aguirre & Galen 2013).

⚠ **Christa-Rückfrage:** Soll Aguirre überhaupt aufgenommen werden? Wenn ja: in Quellen-Page, in Buchempfehlungen, oder beides? Welches Aguirre-Werk?

### 8.5 Mason/Kreger — welche Auflage / welches Jahr ist «kanonisch»?

Diskrepanz: Quellen-Page hat 2010, Handouts haben durchgehend 2014, UeberUns nennt kein Jahr.

Mögliche Auflösungen:

- Beide aufnehmen (2010 deutsch, 2014 englisch 3rd Ed)
- Nur eine kanonische wählen und die Handouts-Verweise korrigieren
- Auflagen-Hinweis bei einem Eintrag («Original 1998, deutsche Ausgabe 2010, englische 3. Aufl. 2014»)

⚠ **Christa-Entscheidung:** Welche Variante soll umgesetzt werden?

### 8.6 TFP — Variante A / B / C

Wie im Brief §2.3 vorgesehen. Kann nicht ohne Christa entschieden werden.

⚠ **Christa-Entscheidung:** A (TFP in Therapie-Page ergänzen), B (aus FAQ entfernen), oder C (mit Framing «weniger verbreitet» behalten)?

### 8.7 BPS-Glossar — DSM-5-Kriterien aufklappbar oder nicht

Audit P2-8 schlug optional eine Aufklapp-Sektion mit den 9 DSM-5-Kriterien vor (klar als Referenz, nicht Selbst-Diagnose). Brief §2.6 sagt: «Definition in der Tonalität der bestehenden 21 Glossar-Einträge» — also eher knapp.

⚠ **Christa-Entscheidung:** Glossar-Eintrag knapp halten (analog DBT-Eintrag, ~3-4 Sätze + Beispiel) oder mit Aufklapp-9-Kriterien-Sektion?

### 8.8 Gunderson & Berkowitz Family Guidelines — Quellenform

In den Handouts mehrfach zitiert. Es handelt sich nicht um ein Standard-Buch oder Paper, sondern um ein NEABPD-Material («Family Guidelines for Borderline Personality Disorder», erhältlich über die National Education Alliance for Borderline Personality Disorder, neabpd.org).

⚠ **Christa-Klärung:** Wie soll dieser Quellentyp in der Quellen-Page bibliografiert werden — als Buch, als Online-Material, mit Link zu neabpd.org?

### 8.9 Kreger (2014) — Solo-Werk?

Handouts H2 + H24 zitieren «Kreger (2014)» ohne Mason. Möglich: Kreger, R. (2008) «The Essential Family Guide to Borderline Personality Disorder», nicht 2014. Wahrscheinlich Tippfehler oder gemischte Referenz.

⚠ **Christa-Klärung:** Sind die Handout-Verweise «Kreger (2014)» korrekt? Falls nein, welche Quelle ist gemeint?

### 8.10 Project Air Strategy

Handout H1 zitiert «Project Air Strategy, Understanding Self-Harm & Suicidal Thinking for Families & Carers». Dies ist ein australisches Versorgungsangebot der University of Wollongong. Aufnahme als Quelle möglich, aber unkonventionell.

⚠ **Christa-Klärung:** Project Air Strategy als Quelle aufnehmen oder nur als externer Link in Beratung-Page?

---

## 9. Empfehlung — Phase-1-Reihenfolge

Aktualisiert gegenüber Brief §3 anhand der Inventar-Funde:

### 9.1 Risikoarme, klar implementierbare Schritte (kein Christa-Block)

| Reihenfolge                  | Schritt                                                                                                                                                                                                                                                                                   | Aufwand   | Begründung                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------- |
| **1a (entfällt inhaltlich)** | P1-9 Routen — nur Verifikations-Notiz im Phase-1-Bericht. **Kein Code-Change.**                                                                                                                                                                                                           | 5 Min     | Audit-Annahme widerlegt (siehe §0.1, §5).                      |
| **1b**                       | P1-2 BPS-Glossar — neuer Eintrag analog zu DBT-Eintrag (Tonalität, Länge). Konsistent mit Verstehen-Page-Beschreibung. ICD-11 6D11.5 + DSM-5 erwähnen. **Ohne** 9-Kriterien-Aufklapp (siehe §8.7 falls Christa anders entscheidet).                                                       | 30 Min    | Additiv, isoliert, kein Risiko.                                |
| **1c**                       | P1-1 Quellen-Konsistenz — die «klaren Fälle» ergänzen: APA Practice Guideline (2024), Storebø et al. (2020) Cochrane, Gunderson et al. (2011) CLPS, Linehan (2015) DBT Skills 2nd Ed, Maslach & Leiter (2016), **Gunderson et al. (2018) Nature Reviews**. Mit PubMed-Links wo verfügbar. | 1-1.5 Std | Verifizierbare Bibliografie, Inline-Stellen sind alle bekannt. |

### 9.2 Schritte mit Christa-Vorklärung (vor Implementation entscheiden)

| Reihenfolge | Schritt                                                                                                                                                                                          | Christa-Block                                                     | Aufwand nach Klärung        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------- |
| **1d**      | Quellen-Konsistenz — unklare Fälle: Zaccaro 2018, Paris 2020, Porges 2011, Project Air Strategy, Gunderson & Berkowitz Family Guidelines, Mason/Kreger Versionsdiskrepanz, Kreger 2014 Solo-Werk | §8.1, §8.2, §8.3, §8.5, §8.8, §8.9, §8.10                         | 30-45 Min                   |
| **1e**      | TFP-Sync (FAQ ↔ Therapie-Page)                                                                                                                                                                   | §8.6 (A/B/C)                                                      | 20-30 Min je nach Variante  |
| **1f**      | MBT-Aktualität — Bateman/Fonagy 2009/2013 + Storebø-Hinweis                                                                                                                                      | Optional Christa: nur Variante (Inline-Hinweis vs. neue Einträge) | 30 Min                      |
| **1g**      | Aguirre — Aufnahme entscheiden                                                                                                                                                                   | §8.4                                                              | 15 Min wenn ja, 0 wenn nein |

### 9.3 Empfohlene Sitzungsstruktur

**Empfehlung:** Phase 1 nicht in einem Rutsch durchziehen. Stattdessen:

- **Sitzung 1 (selbstständig):** 1a (Verifikation) + 1b (BPS-Glossar) + 1c (Quellen «klare Fälle») → 1 PR mit ~2 Stunden Arbeit + Christa-Review der BPS-Definition.
- **Christa-Klärungsrunde** zwischen Sitzung 1 und 2: alle §8-Rückfragen beantworten.
- **Sitzung 2:** 1d (unklare Quellen) + 1e (TFP) + 1f (MBT) + 1g (Aguirre falls ja) → 1 PR mit ~1.5-2 Stunden Arbeit.

Vorteil: Sitzung 1 liefert sofort sichtbaren Wert (BPS im Glossar, fehlende Hauptquellen im Quellen-Page); Sitzung 2 wird durch Vorklärung effizient ohne Mid-Implementation-Stops.

---

## 10. Christa-Rückfragen — Konsolidierte Liste

Vor Phase-1-Start zu beantworten:

1. **§8.1 Zaccaro 2018** — Welches genau? PubMed-Link ergänzen?
2. **§8.2 Paris 2020** — Welche Publikation? Aufnahme geeignet?
3. **§8.3 Porges 2011 Polyvagal** — Aufnehmen, mit oder ohne Hinweis auf wissenschaftliche Kontroverse?
4. **§8.4 Aguirre** — Aufnehmen? Welches Werk? Wo (Quellen / Buchempfehlungen / beides)?
5. **§8.5 Mason/Kreger 2010 vs. 2014** — Welche Auflage(n) sind kanonisch?
6. **§8.6 TFP** — Variante A (in Therapie-Page aufnehmen), B (aus FAQ entfernen), oder C (mit «weniger verbreitet»-Framing behalten)?
7. **§8.7 BPS-Glossar-Eintrag** — Knapp (analog DBT-Eintrag) oder mit Aufklapp-9-DSM-Kriterien?
8. **§8.8 Gunderson & Berkowitz Family Guidelines** — Bibliografie-Form (Buch / Online-Material / mit neabpd.org-Link)?
9. **§8.9 Kreger 2014 Solo-Werk** — Tippfehler oder eigene Quelle? Falls Letzteres: welche?
10. **§8.10 Project Air Strategy** — Als Quelle aufnehmen oder nur als Link in Beratung-Page?

**Optional vor Sitzung 1:**

- §6.2 Bateman & Fonagy 2009 + 2013 — DOI-Lookup vor Aufnahme. Kein erfinden, sondern PubMed-Verifikation.

---

## 11. Was Phase 0 NICHT geliefert hat

- Keine Code-Änderungen (per Brief).
- Keine Auswertung der Buchempfehlungen-Page-Quellen im Detail (Buchliste dort wurde nur überflogen — vor Sitzung 2 ggf. ergänzen).
- Keine Tiefen-Analyse der `searchIndex.ts` (1'867 LOC — könnte weitere Inline-Verweise enthalten, die nicht über `et al.`-Marker greifbar sind).
- Keine Verifikation, ob in den Visualisierungen / Notfallkarte-Komponenten weitere Inline-Quellenverweise stehen.

Diese 4 Lücken sind klein, aber für 100%-Vollständigkeit bei Sitzung 2 vor Ergänzung der «unklaren Fälle» kurz zu schliessen.

---

**Ende Phase 0.** Bereit für Christa-Antworten auf §10. Sobald die da sind, kann Sitzung 1 starten — Reihenfolge 1a (Verifikation) → 1b (BPS-Glossar) → 1c (Quellen-Konsistenz klare Fälle).
