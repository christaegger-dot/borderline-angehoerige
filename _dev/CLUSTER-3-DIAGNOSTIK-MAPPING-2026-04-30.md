# Cluster-3-Mapping – Diagnostik (Phase 0 Inventar)

**Datum:** 30. April 2026
**Brief-Referenz:** `_dev/CLUSTER-3-DIAGNOSTIK-BRIEF-2026-04-30.md`
**Audit-Referenz:** `_dev/AUDIT-CONTENT-QUALITY-2026-04-28.md` — P1-7 (Diagnostik-Prozess wird nicht erklärt)
**Scope:** Read-only. Kein Code-Change. Inventar + Architektur-Bewertung + Christa-Rückfragen am Ende.

---

## 1. Bestehende Diagnostik-Inhalte (Inventar)

### 1.1 In Pages und Sections

| Datei                                   | Zeile                               | Wortlaut / Kontext                                                                                                                                                                                                                                                                                                                                                      | Charakter                                                                                 |
| --------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `Verstehen.tsx`                         | 275                                 | EvidenceNote-Eintrag «WHO ICD-11: Borderline pattern specifier (6D11.5)» mit Link who.int                                                                                                                                                                                                                                                                               | Klassifikations-Verweis                                                                   |
| `sections/VerstehenSupportSections.tsx` | 102-144                             | **Komplette Section `VerstehenDiagnosticSection`** (Component im alten Card-Pattern, nicht editorial). Titel: «Diagnostischer Überblick». Anker: `#diagnostischer-ueberblick`. Inhalt: kurzer Hinweis auf «mehrere Merkmale über längere Zeit», 5-Punkte-Liste der Kriterien (aus `content/verstehen.ts:diagnosticOverviewItems`), Card «Ursachen sind nie monokausal». | **Bestehender Diagnostik-Anker** — knapp, im Legacy-Card-Pattern. **Wichtigster Befund.** |
| `content/verstehen.ts`                  | 139-145                             | `diagnosticOverviewItems` — fünf informelle DSM-5-Kriterien-Punkte (Verlassensangst, instabile Beziehungen, Selbstbild, Impulsivität, affektive Instabilität). Nur 5 von 9.                                                                                                                                                                                             | Inhalts-Konstante                                                                         |
| `Glossar.tsx`                           | 47 (BPS-Eintrag, neu aus Cluster 1) | «Klassifiziert im DSM-5 als eigenständige Persönlichkeitsstörung und im ICD-11 als ‹Borderline-Muster› (Code 6D11.5)»                                                                                                                                                                                                                                                   | Klassifikations-Verweis                                                                   |
| `Glossar.tsx`                           | 97 (Remission-Eintrag)              | «Remission bedeutet, dass eine Person nicht mehr genügend Kriterien für die Diagnose erfüllt»                                                                                                                                                                                                                                                                           | Definitions-Verweis                                                                       |
| `Glossar.tsx`                           | 516 (Schluss-Hinweis)               | «Bei Fragen zur Diagnose oder Behandlung wenden Sie sich an Fachpersonen.»                                                                                                                                                                                                                                                                                              | Disclaimer                                                                                |
| `FAQ.tsx`                               | 69-100                              | **Kategorie «Diagnose & Krankheitsverständnis»** — vier Fragen: «Soll ich die Diagnose ansprechen?», «Ist Borderline heilbar?», «Ist Borderline erblich? Bin ich schuld?», «Warum verhält sich mein Angehöriger bei anderen regulierter?». Alle vier behandeln _Folgen_ der Diagnose, keine den Diagnostik-Prozess.                                                     | **Wichtigster FAQ-Anker.**                                                                |
| `UnterstuetzenTherapie.tsx`             | 73                                  | «Ziel: Sie bekommen Orientierung – keine Mitbehandlung, keine Diagnose»                                                                                                                                                                                                                                                                                                 | Beratungs-Differenzierung                                                                 |
| `UnterstuetzenTherapie.tsx`             | 101                                 | «Fragen statt Diagnosen: ‹Mir fällt auf, dass … – Ist das Teil des Prozesses?›»                                                                                                                                                                                                                                                                                         | Anti-Drängen-Haltung                                                                      |
| `UnterstuetzenTherapie.tsx`             | 563                                 | HYPE-Züri-Beschreibung: «für Jugendliche ab 13 Jahren mit Verdacht, Risiko oder bereits diagnostizierter Borderline-Störung»                                                                                                                                                                                                                                            | Versorgungs-Hinweis (Jugendliche)                                                         |
| `Quellen.tsx`                           | 280-298                             | **Kategorie «Diagnostik & Klassifikation»** mit DSM-5 (APA 2013) und ICD-11 (WHO 2019). Plus Cluster-1-neu: APA Practice Guideline 2024 in «Fachliteratur», Gunderson 2018 Nature Reviews in «Klinische Studien».                                                                                                                                                       | Quellen-Basis                                                                             |
| `Impressum.tsx`                         | 194, 208                            | Disclaimer: «Keine Gewähr für Richtigkeit – ersetzt keine professionelle Beratung, Diagnose oder Behandlung»                                                                                                                                                                                                                                                            | Rechtlicher Disclaimer                                                                    |
| `components/SEO.tsx`                    | 94                                  | `codingSystem: "ICD-11"` — strukturierter Daten-Marker für `MedicalPageSchema`                                                                                                                                                                                                                                                                                          | Technisch (SEO-JSON-LD)                                                                   |
| `components/Selbsttest.tsx`             | 138-162                             | Frage 3 mit Option «Keine offizielle Diagnose, aber ich vermute Borderline» (Routing → verstehen+unterstuetzen). Audit P2-9 hatte das als Achsen-Mischung markiert.                                                                                                                                                                                                     | **Diagnose-Status-Logik im interaktiven Tool**                                            |

### 1.2 In Handouts (`handoutTextVersionContent.ts`)

| Zeile | Kontext                                                                                                                              | Charakter                         |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| 318   | Notfallplan-Handout: «Dieser Notfallplan ersetzt keine professionelle Beurteilung und keine psychiatrische Diagnose»                 | Disclaimer                        |
| 1830  | Handout: «Sie sind kein Diagnostik-Team. Eine Borderline-Persönlichkeitsstörung wird selbst von Fachpersonen oft erst spät erkannt.» | **Wichtige Anti-Drängen-Aussage** |
| 2013  | Quellenangabe-Liste: «APA, DSM-5»                                                                                                    | Klassifikations-Quelle            |
| 2656  | Card-Title «Diagnose» (im Handout-Kontext, vermutlich «3 C's»-Card oder Genesungs-Karte)                                             | Strukturell                       |
| 2966  | Kinder-Handout: «Mama/Papa hat eine Diagnose, die Borderline heisst…»                                                                | Kinder-Erklärung                  |

### 1.3 Was bereits gut abgedeckt ist (Bestand)

- DSM-5- und ICD-11-Klassifikations-Hinweise
- Disclaimer (kein Diagnose-Ersatz, keine Selbst-Diagnose-Werkzeuge)
- Anti-Drängen-Haltung («Sie sind kein Diagnostik-Team», «Fragen statt Diagnosen»)
- FAQ-Frage zur **Kommunikation** der Diagnose («Soll ich die Diagnose ansprechen?»)
- Knapper Diagnostik-Überblick auf Verstehen mit 5 Kriterien-Punkten
- BPS-Glossar-Eintrag (aus Cluster 1) mit ICD-11-/DSM-5-Hinweis

### 1.4 Was fehlt (= Cluster-3-Auftrag)

Die sechs Brief-Bausteine 2.1-2.6 sind **nicht abgedeckt**:

- 2.1 «Wer stellt eine Diagnose?» — keine Stelle erklärt FMH-Anerkennung, Berufsausübungsbewilligung, Hausärzt:in-Rolle
- 2.2 «Wie läuft Diagnostik ab?» — keine Stelle erklärt Anamnese, SCID-5-PD, IPDE, Differenzialdiagnostik, Verlaufsbeobachtung
- 2.3 «Was bedeutet Diagnose für Angehörige?» — teilweise in FAQ «Soll ich die Diagnose ansprechen?», aber das ist Kommunikations-Frage
- 2.4 «Was bei Diagnose-Ablehnung?» — fehlt komplett
- 2.5 «Bin ich auch betroffen?» — fehlt komplett (verwandte Selbstfürsorge-Inhalte ja, aber nicht Diagnose-Bezug)
- 2.6 «Was wenn noch keine Diagnose?» — teilweise im Selbsttest-Routing, aber kein Lese-Stoff

---

## 2. Architektur-Bewertung der vier Optionen

Brief §3 listet A / B / C / D. Hier pro Option: Site-Fit, Risiken, betroffene Bestände.

### Option A — Eigene Seite `/diagnostik`

**Site-Fit:**

- Site hat bereits 32 Routes (`routes.ts` aktuell) — eine weitere ändert das System nicht qualitativ.
- Architektur-Präzedenz: Cluster-Themen wie «Genesung», «Selbstfürsorge», «Grenzen» haben jeweils eigene Page. Diagnostik ist auf demselben Tiefen-Niveau.
- Editorial-Pattern (analog Genesung/Selbstfürsorge) gut umsetzbar: Hero + 5-7 ContentSections + RelatedLinks.

**Vorteile:**

- Alle 6 Brief-Bausteine 2.1-2.6 finden Platz, ohne andere Seiten zu überladen.
- Klare URL `/diagnostik`, gut SEO-fähig (eigener `<title>`, `<meta description>`).
- Wegweiser, FAQ, Selbsttest-Result können gezielt verlinken.
- Bestehende `VerstehenDiagnosticSection` (knappe 5-Punkte-Liste) kann bleiben mit Cross-Link «→ Mehr zur Diagnostik».

**Nachteile:**

- Eine weitere Page erhöht Footer-/Menü-Komplexität (falls Diagnostik in der Hauptnavigation auftaucht — Christa-Frage).
- `searchIndex.ts` (1'867 LOC) muss gepflegt werden.
- Bestehende `VerstehenDiagnosticSection` riskiert Doppelung mit der neuen Seite — Inhalt sollte sich klar abgrenzen (Verstehen = Kriterien-Sample, Diagnostik-Seite = Prozess + Versorgung + Angehörigen-Perspektive).

**Risiken:**

- Wenn Diagnostik zu prominent platziert wird, könnte sie als Ermutigung gelesen werden, die erkrankte Person zur Diagnose zu drängen — entgegen der Brief-§1.4-Linie. Mitigation: Anti-Drängen-Haltung muss in Hero und Schlussabsatz explizit gemacht werden.

### Option B — Section auf der Verstehen-Seite ausbauen

**Site-Fit:**

- `Verstehen.tsx` ist 624 LOC, hat ~10 Sections (6 ContentSection + 3 Sub-Component-Sections + Hero). Eine Erweiterung der bestehenden `VerstehenDiagnosticSection` ist technisch möglich.
- Aber: Die Section ist im Legacy-Card-Pattern (out-of-scope für Editorial-Migration laut Code-Comment Z. 23-26). Eine inhaltliche Erweiterung würde das Pattern verfestigen.

**Vorteile:**

- Thematisch wo es hingehört.
- Keine neue Route, kein zusätzlicher Navigationspunkt.
- Lese-Fluss: Wer Verstehen liest, findet Diagnostik im Anschluss.

**Nachteile:**

- Verstehen würde auf ~800-900 LOC wachsen — weiter weg vom «Lesbarkeit»-Ziel der Editorial-Migration.
- 6 Brief-Bausteine 2.1-2.6 in einer Section ist viel — die Section würde länger als die anderen Verstehen-Sections.
- Versorgungs-Realität (PUK-Sprechstunde, FMH-Anerkennung etc.) passt schwer in den Verstehen-Lesefluss («Verstehen» ist konzeptuell, nicht wegweiser-artig).
- Diagnose-Ablehnung als Section wirkt im Verstehen-Kontext deplatziert — Verstehen ist nicht handlungs-, sondern verstehens-fokussiert.

**Risiken:**

- Editorial-Migration der Sub-Komponenten wird durch Inhalts-Erweiterung kostspieliger (mehr Stoff zu migrieren in Phase 7).

### Option C — FAQ-Cluster mit mehreren Fragen

**Site-Fit:**

- Bestehende FAQ-Kategorie «Diagnose & Krankheitsverständnis» hat 4 Fragen, könnte um 4-6 ergänzt werden.
- FAQ-Pattern: Q&A, suchbar, niedrigschwellig.

**Vorteile:**

- Kein neuer Routenraum.
- Suchindex (`searchIndex.ts`) profitiert — Fragen werden direkt suchbar.
- Niedrigschwellig: Lesende, die nicht eine Strecke lesen wollen, finden Spitzfragen.

**Nachteile:**

- Konzeptuell tiefe Inhalte wie SCID-5-PD-Prozess oder Differenzialdiagnostik passen schwer in Q&A-Format ohne 2-Bildschirm-langen Antwort.
- Brief-Baustein 2.4 «Was bei Diagnose-Ablehnung» als FAQ-Antwort liest sich riskanter — Lesende könnten Antworten als «Drängen-Anleitung» missverstehen, weil Q&A-Format Handlungs-Tipps suggeriert.
- 6 Bausteine als 6 Fragen → Kategorie wächst von 4 auf 10 Fragen. FAQ-Page wird unwuchtig (andere Kategorien haben 4 Fragen).
- Versorgungs-Realität (Wer? Wo? Wie viele Termine?) erfordert mehr Strukturhinweise als FAQ-Antworten typischerweise tragen.

**Risiken:**

- Drängen-Risiko (Brief §1.4) ist im FAQ-Format am höchsten.

### Option D — Hybrid: Verstehen-Section + eigene Seite

**Site-Fit:**

- Variante 1 (kurz auf Verstehen + ausführlich auf eigener Seite) verdoppelt die Pflege.
- Variante 2 (bestehende `VerstehenDiagnosticSection` bleibt knapp + neue Seite + FAQ-Erweiterung) ist eigentlich Option A + minimale FAQ-Anpassung — keine echte Verstehen-Erweiterung.

**Vorteile:**

- Beste UX: Lesende auf Verstehen sehen den Anker, finden via Cross-Link die Tiefe; Suchende über FAQ finden Spitzfragen.
- Niedrigschwelligkeit + Tiefe parallel verfügbar.

**Nachteile:**

- Doppelte Pflege: Inhalte auf Verstehen-Section und Diagnostik-Seite müssen synchron bleiben.
- Konsistenz-Risiko: Aussagen können auseinanderdriften, wenn nur eine Seite gepflegt wird.

**Risiken:**

- Pflegeaufwand bei zukünftigen Updates.

---

## 3. Verstehen-Seite Stand-der-Dinge

### 3.1 Struktur (aktuell, nach Cluster-1-Sitzung-1)

`client/src/pages/Verstehen.tsx`, 624 LOC:

| Block                                                      | Pattern                                | Zeilen  | Anker                         |
| ---------------------------------------------------------- | -------------------------------------- | ------- | ----------------------------- |
| `<header>` Hero                                            | Editorial                              | 105-148 | —                             |
| EditorialSection «Überblick / Worum es geht»               | Editorial                              | 151-200 | —                             |
| EditorialSection mit Pull-Quote                            | Editorial                              | 203-210 | —                             |
| ContentSection «Was Angehörige oft erleben»                | Editorial-Variante                     | 213-240 | `#angehoerige-erleben`        |
| ContentSection «Was Borderline im Kern so belastend macht» | Editorial-Variante (mit EvidenceNote!) | 242-293 | `#was-ist-borderline`         |
| **`<VerstehenRelationshipSection />`**                     | **Legacy Card**                        | 295     | `#beziehungsdynamik`          |
| ContentSection «Scham, Wut und innere Überflutung»         | Editorial-Variante                     | 297-371 | `#scham-wut`                  |
| ContentSection «Wenn Denken unter Stress enger wird»       | Editorial-Variante                     | 373-437 | `#stressmodus`                |
| ContentSection «Typische Muster»                           | Editorial-Variante                     | 439-548 | `#muster`                     |
| **`<VerstehenMeaningSection />`**                          | **Legacy Card**                        | 550     | `#bedeutung-fuer-angehoerige` |
| ContentSection «Verstehen hat Grenzen»                     | Editorial-Variante                     | 552-576 | `#grenzen-des-verstehens`     |
| **`<VerstehenDiagnosticSection />`**                       | **Legacy Card**                        | 578     | `#diagnostischer-ueberblick`  |
| `<VerstehenMaterialsSection />`                            | (Materialien-Block)                    | 580     | `#infografiken`               |
| EditorialSection «Weiter»                                  | Editorial                              | 583-597 | —                             |
| `<RelatedLinksEditorial />`                                | Editorial                              | 599-620 | —                             |

### 3.2 Wo wäre Platz für eine Diagnostik-Section?

- Zwischen `VerstehenDiagnosticSection` (Z. 578) und `VerstehenMaterialsSection` (Z. 580) — **Erweiterung der bestehenden Section** möglich, aber nicht «mehr Platz».
- Vor dem Schluss-Block — als 11. ContentSection — möglich, aber überladet weiter.
- **Realistischer Platzbedarf für volle Diagnostik-Strecke (alle 6 Bausteine 2.1-2.6):** ~250-350 LOC zusätzlich. Das wäre eine substantielle Erweiterung der Verstehen-Seite (auf ~900 LOC).

### 3.3 Konsequenz für Architektur

Verstehen kann eine knappe Diagnostik-Section enthalten, aber nicht die volle Strecke. **Option B (alle 6 Bausteine in Verstehen) ist nicht praktikabel.** Option A oder D sind die realistischen Pfade.

---

## 4. FAQ-Stand

### 4.1 Bestehende «Diagnose & Krankheitsverständnis»-Kategorie

Vier Fragen, alle drehen sich um _Folgen_ der Diagnose, nicht den Prozess:

| Frage                                                          | Inhalt                                            |
| -------------------------------------------------------------- | ------------------------------------------------- |
| «Soll ich die Diagnose ansprechen?»                            | Kommunikations-Frage (wie über Diagnose sprechen) |
| «Ist Borderline heilbar?»                                      | Verlaufs-Frage (Recovery, Genesung)               |
| «Ist Borderline erblich? Bin ich schuld?»                      | Ursachen-Frage (Schuldentlastung)                 |
| «Warum verhält sich mein Angehöriger bei anderen regulierter?» | Beziehungs-Phänomen (Selektivität)                |

### 4.2 Was sich für FAQ-Erweiterung anböte (Cluster 3)

Gut FAQ-fähige Diagnostik-Fragen (klare Antwort in 1-2 Absätzen):

- **«Wer kann eine Borderline-Diagnose stellen?»** — Psychiater:in / Psycholog:in mit Bewilligung
- **«Was, wenn die erkrankte Person die Diagnose ablehnt?»** — Brief 2.4
- **«Wie kann ich helfen, wenn wir Borderline vermuten, aber keine Diagnose haben?»** — Brief 2.6 (Hausärzt:in-Überweisung etc.)
- **«Ist eine Diagnose-Abklärung sinnvoll, auch wenn die erkrankte Person zögert?»** — sensible Variante; **Drängen-Risiko**, vorsichtig formulieren

Schlechter FAQ-fähig (zu konzeptuell oder zu lang):

- «Wie läuft eine Diagnostik ab?» (Brief 2.2) — SCID-5-PD/IPDE-Erklärung sprengt Q&A
- «Bin ich als Angehörige auch betroffen?» (Brief 2.5) — verlinkt eher auf Selbstfürsorge

### 4.3 Konsequenz

FAQ-Erweiterung um 2-4 Fragen ist realistisch und additiv, ersetzt aber keine Tiefen-Strecke. **Option C alleine ist unzureichend** — die konzeptuellen Bausteine 2.2 und 2.5 brauchen Lese-Stoff.

---

## 5. Quellen-Lage

### 5.1 Bestand (nach Cluster 1)

`Quellen.tsx` enthält bereits:

- **DSM-5** (APA 2013) — Klassifikation
- **ICD-11** (WHO 2019) — Klassifikation, Borderline-Muster 6D11.5
- **APA Practice Guideline (2024)** — Behandlungsleitlinie, **deckt auch Diagnostik ab** (Auflage von 2024 inkl. Diagnostik-Empfehlungen)
- **Gunderson 2018 Nature Reviews** — Standard-Übersicht inkl. Diagnostik-Abschnitt
- **Linehan 1993** — DBT-Grundlagenwerk inkl. Diagnostik-Konzept

### 5.2 Was zusätzlich aufgenommen werden müsste

Für eine seriöse Diagnostik-Strecke fehlen vermutlich:

- **SCID-5-PD-Manual** (First, Williams, Benjamin, Spitzer 2016 oder 2017): «Structured Clinical Interview for DSM-5 Personality Disorders», American Psychiatric Association Publishing.
- **IPDE-Manual** (Loranger 1999): «International Personality Disorder Examination», WHO/Cambridge University Press. Lehrbuch ist von 1999, aber Standard.
- Optional: **DSM-5-TR** (APA 2022) — wenn die Site nicht nur DSM-5 (2013) sondern die TR-Variante zitieren will. Brief §1.5 nennt explizit «DSM-5-TR».

⚠ **Christa-Klärung nötig**, ob Site DSM-5 (2013) oder DSM-5-TR (2022) zitieren soll. Aktueller Quellen-Eintrag ist DSM-5 (2013).

### 5.3 Quellen-Aufnahme-Aufwand

Bei A oder D-Implementation: ca. 2-3 neue Einträge in `Quellen.tsx`. Bei C-only: möglicherweise 0-1 (FAQ-Antworten brauchen oft keine zusätzlichen Quellen).

---

## 6. Schweizer Versorgungsrealität — Christa-Klärungen

Die folgenden Punkte sind ohne Christas Fachexpertise nicht beantwortbar. Sie werden NICHT im Mapping spekuliert, sondern hier als Rückfragen markiert.

### 6.1 Spezialambulanzen für Borderline-Diagnostik in der Deutschschweiz

- Welche Spezialambulanzen ausser PUK Zürich existieren? (UPK Basel? UPD Bern? Spital Münsterlingen? Sanatorium Kilchberg?)
- Gibt es eine zentrale Übersicht / Verzeichnis?
- Soll die Diagnostik-Seite konkrete Anlaufstellen nennen (analog zur Therapie-Page mit HYPE Züri / PUK / IPW / Clienia)?

### 6.2 PUK Zürich Borderline-Sprechstunde

- Existiert eine spezifische «Borderline-Sprechstunde» an der PUK?
- Falls ja: Kontaktdaten, Zugang (Selbstanmeldung / Überweisung / Wartezeiten), Kosten?
- Falls nein: Welche Pfade nutzen erkrankte Personen aktuell konkret?

### 6.3 Diagnostik-Prozess-Dauer und -Termine

- Wie viele Termine umfasst typischerweise ein Diagnostik-Prozess in der PUK (oder generell in CH)?
- Gibt es eine «typische» Zeitschiene (4-6 Wochen? 2-3 Monate?), die kommuniziert werden kann, ohne Erwartungen falsch zu setzen?

### 6.4 Hausärztliche Schwelle

- Stellen Hausärzt:innen in der CH üblicherweise BPS-Verdachtsdiagnosen, oder überweisen sie immer ohne Verdachtsformulierung?
- Wie ist das fachlich-rechtlich geregelt (Berufspflicht / Limitation)?

### 6.5 Versicherungs-/Krankenkassenfragen

- Wird BPS-Diagnostik regulär durch Grundversicherung gedeckt?
- Gibt es Einschränkungen (z. B. Erstabklärung nur bei Psychiater:in mit FMH-Anerkennung Psychiatrie und Psychotherapie)?
- Datenweitergabe-Hinweise: Für Angehörige relevant — was landet in der Krankenkassen-Akte?

### 6.6 Psycholog:innen vs. Psychiater:innen

- Welche Borderline-Diagnose-Vollmachten haben psychologische Psychotherapeut:innen mit Bewilligung in der CH?
- Falls eingeschränkt: wie formuliert die Site das, ohne Psycholog:innen-Tätigkeit abzuwerten?

### 6.7 Differenzialdiagnostik-Prominenz

- Wie prominent soll Differenzialdiagnostik (besonders Bipolar, PTBS, ADHS) auf der Diagnostik-Seite stehen?
- Gibt es hier einen «typischen Verwechslungs-Fall» aus der PUK-Praxis, der lehrreich wäre?

### 6.8 ICD-11-Migration in der CH

- Nutzt die CH (z. B. KKL/SwissDRG, PUK) klinisch bereits ICD-11, oder noch ICD-10? (Faktisch noch ICD-10 für Abrechnung.)
- Wie spricht die Diagnostik-Seite ICD-10 vs. ICD-11 an, ohne Verwirrung zu stiften?

### 6.9 Diagnose im Jugendalter

- HYPE Züri arbeitet ab 13 Jahren. Ist die Diagnostik-Seite für Erwachsene-Angehörige + auch für Eltern jugendlicher Betroffener gedacht?
- Falls ja: eigene Section «Diagnostik bei Jugendlichen» nötig (anders als bei Erwachsenen)?

### 6.10 Akzeptanz-Sprache

- Brief 2.4 («Was bei Diagnose-Ablehnung») erfordert sehr feinfühliges Wording. Hat Christa konkrete Formulierungs-Präferenzen aus der PUK-Beratungs-Praxis?
- Soll die Seite Beispiel-Sätze für Angehörige enthalten («Du musst die Diagnose nicht akzeptieren — ich bin trotzdem hier»)?

---

## 7. Risiko-Hinweise (Konflikte mit bestehenden Site-Inhalten)

### 7.1 Selbsttest-Framing (Frage 3)

`Selbsttest.tsx` Z. 138-162 hat eine Option «Keine offizielle Diagnose, aber ich vermute Borderline» mit Routing-Gewichten `verstehen: 7, unterstuetzen: 3`. Wenn eine Diagnostik-Seite entsteht, sollte:

- Selbsttest-Result für `vermutung`-Bucket entweder einen `secondaryLink` auf `/diagnostik` bekommen, oder
- Result-Title/-Description ergänzt werden um «Mehr zur Diagnostik-Frage».

Audit P2-9 hatte zudem moniert, dass Frage 3 Achsen mischt (Zeit-Antworten + Diagnose-Status-Antwort). Eine Cluster-3-Implementation könnte das mit-adressieren oder bewusst pendingt halten.

### 7.2 FAQ-Frage «Soll ich die Diagnose ansprechen?» (FAQ.tsx Z. 72-79)

Die Antwort behandelt: «Wenn die Diagnose noch nicht gestellt oder nicht akzeptiert wurde, konzentrieren Sie sich besser auf konkrete Verhaltensweisen und Gefühle statt auf Labels.» — das ist konsistent mit Brief-2.4-Linie. Eine neue Diagnostik-Seite muss diese Aussage **nicht widersprechen** (z. B. nicht implizit zur Diagnose-Durchsetzung ermutigen).

### 7.3 FAQ-Frage «Wie schütze ich meine Kinder?» (FAQ.tsx Z. 149-156)

Erwähnt nicht direkt Diagnostik, aber: Wenn eine Diagnostik-Seite Kinder-Implikationen behandelt, muss die Konsistenz zur bestehenden FAQ-Antwort gewahrt werden.

### 7.4 Wegweiser (`SituationsWegweiser.tsx`)

Grep ergab **keine direkten Diagnose-Treffer** im Wegweiser-Code. Das ist gut — kein bestehender Konflikt. Aber: Eine neue Diagnostik-Seite könnte als zusätzlicher Wegweiser-Pfad einsteigen («Wir vermuten Borderline, aber sind unsicher» → `/diagnostik`). Christa-Frage, ob das gewünscht ist.

### 7.5 Handout-Aussage «Sie sind kein Diagnostik-Team» (handoutTextVersionContent.ts Z. 1830)

Diese Aussage muss in Diagnostik-Seite **nicht widersprochen** werden — sie ist die Brief-2.6-Linie. Empfehlung: ähnliche Formulierung als Anker in Hero oder Schlussabsatz der Diagnostik-Seite verwenden.

### 7.6 Bestehende `VerstehenDiagnosticSection` (Card-Pattern)

Falls Option A: **die bestehende Section bleibt**. Sie ist knapp und thematisch korrekt (Kriterien-Sample). Cross-Link von dort auf neue Diagnostik-Seite («Wer stellt diese Diagnose? → Diagnostik-Seite»).

Falls Option B: Section würde stark ausgebaut → Editorial-Migration der Section ggf. parallel erforderlich (sonst bleibt Inhalts-Erweiterung im Legacy-Pattern).

### 7.7 Editorial-Migration-Zustand

Die drei Sub-Komponenten in `VerstehenSupportSections.tsx` sind im Code-Comment als «out of scope» für Editorial-Migration markiert. Eine Cluster-3-Implementation, die diese Sections anfasst, müsste entweder das Legacy-Pattern beibehalten oder die Editorial-Migration mit-machen — letzteres ist Phase-7-Cleanup-Scope, nicht Cluster-3.

---

## 8. Architektur-Empfehlung (Site-Architektur-Sicht)

**Empfehlung: Option A (eigene Seite `/diagnostik`) + minimale FAQ-Ergänzung (2-3 neue Fragen).**

Begründung:

1. **Inhalts-Tiefe passt nicht in Section.** Die 6 Brief-Bausteine sind ein eigenständiges Cluster mit ~250-350 LOC Lesestoff. Verstehen-Section-Erweiterung (Option B) würde die Verstehen-Seite überladen.

2. **Option C (FAQ-only) reicht nicht.** Konzeptuelle Bausteine (Brief 2.2 «Wie läuft Diagnostik ab», 2.5 «Bin ich auch betroffen») brauchen Lese-Stoff, kein Q&A.

3. **Option D (Hybrid) ist am elegantesten, aber teuer.** Doppelte Pflege ist ein Konsistenz-Risiko. Pragmatisch: Option A jetzt, Option D als Erweiterung in Cluster-4-Polish.

4. **Editorial-Pattern verfügbar.** `/diagnostik` kann analog zu `/genesung` oder `/selbstfuersorge` aufgebaut werden — Hero, Editorial-Sections, ContentSections, RelatedLinks, EvidenceNote. Bewährte Struktur.

5. **Bestehende `VerstehenDiagnosticSection` bleibt unverändert.** Sie ist im Legacy-Card-Pattern, aber inhaltlich knapp und nicht widersprüchlich. Cross-Link ergänzen, sonst nicht anfassen — Editorial-Migration ist Phase-7-Cleanup-Scope.

6. **FAQ-Erweiterung minimal.** 2-3 neue Q&A in der bestehenden «Diagnose & Krankheitsverständnis»-Kategorie:
   - «Wer kann eine Borderline-Diagnose stellen?»
   - «Was, wenn die erkrankte Person die Diagnose ablehnt?»
   - Optional: «Was tun, wenn wir Borderline vermuten, aber keine Diagnose haben?»
     Alle drei mit Cross-Link auf `/diagnostik`.

7. **Selbsttest-Result-Anpassung als Soft-Touch.** Im `vermutung`-Bucket einen `secondaryLink` auf `/diagnostik` ergänzen — kein Routing-Algorithmus-Eingriff.

**Was Christa entscheidet:** A vs. D (mit Verstehen-Section-Erweiterung) bzw. ob Option A in der Hauptnavigation auftauchen soll.

---

## 9. Phase-1-Reihenfolge-Empfehlung

Falls Christa Option A bestätigt:

| Reihenfolge | Schritt                                                                                                      | Risiko                     | Aufwand   | Christa-Block?         |
| ----------- | ------------------------------------------------------------------------------------------------------------ | -------------------------- | --------- | ---------------------- |
| 1           | Christa-Klärungen §6 abarbeiten (Versorgungsrealität-Inhalte)                                                | —                          | 1 Sitzung | ja                     |
| 2           | Quellen-Page: SCID-5-PD-Manual + IPDE-Manual + ggf. DSM-5-TR ergänzen                                        | niedrig (additiv)          | 30 Min    | nein                   |
| 3           | Neue Seite `Diagnostik.tsx` mit Editorial-Pattern erstellen — Hero, Intro, ContentSections für Brief 2.1-2.6 | mittel (neuer Seitenfluss) | 2-3 Std   | nein, falls §6 geklärt |
| 4           | Route in `routes.ts` ergänzen, `searchIndex.ts`-Einträge anlegen                                             | niedrig                    | 20 Min    | nein                   |
| 5           | FAQ-Erweiterung um 2-3 Diagnostik-Fragen mit Cross-Links                                                     | niedrig (additiv)          | 30 Min    | nein                   |
| 6           | Selbsttest-Result `vermutung`: `secondaryLink` auf `/diagnostik`                                             | niedrig                    | 10 Min    | nein                   |
| 7           | `VerstehenDiagnosticSection`-Cross-Link auf `/diagnostik`                                                    | niedrig                    | 10 Min    | nein                   |
| 8           | Wegweiser (optional): «Diagnose unklar»-Pfad                                                                 | mittel                     | 30 Min    | ja (ob gewünscht)      |

**Total Phase 1: ~5-7 Std** (analog Cluster 1 Sitzung 1 + 2 zusammen). Aufteilung in 2 Sitzungen sinnvoll.

**Sitzung 1:** Schritte 2-7 (substantieller Inhalts-Block + FAQ-Erweiterung + kleine Cross-Links). Christa-Block §6 muss vorher beantwortet sein.

**Sitzung 2:** Schritt 8 (Wegweiser-Erweiterung) falls gewünscht — kleiner Folgeschritt.

---

## 10. Christa-Rückfragen — Konsolidierte Liste

Vor Phase-1-Start zu beantworten:

### Architektur (zwingend vor Implementation)

1. **§3 Architektur-Wahl:** A (eigene Seite) / B (Verstehen-Section) / C (FAQ-only) / D (Hybrid)?
2. **Hauptnavigation:** Soll `/diagnostik` (falls Option A) im Header-Menü erscheinen, im Footer, oder nur via Cross-Links?
3. **VerstehenDiagnosticSection:** Bleibt unverändert (Empfehlung) oder wird im Cluster 3 mitmodernisiert (Editorial-Migration vorziehen)?

### Versorgungsrealität CH (für inhaltliche Tiefe)

4. **§6.1** Welche Spezialambulanzen ausser PUK Zürich nennen?
5. **§6.2** PUK Borderline-Sprechstunde — Kontaktdaten, Zugang, Wartezeiten?
6. **§6.3** Typische Diagnostik-Prozess-Dauer in CH?
7. **§6.4** Hausärztliche Schwelle (Verdacht / Überweisung) — übliches Vorgehen?
8. **§6.5** Versicherungs-/Krankenkassen-Hinweise nötig?
9. **§6.6** Psycholog:innen vs. Psychiater:innen — wie genau formulieren?
10. **§6.7** Differenzialdiagnostik-Prominenz auf der Diagnostik-Seite?
11. **§6.8** ICD-10 (Abrechnung) vs. ICD-11 (Klassifikation) — wie ansprechen?
12. **§6.9** Jugendliche-Diagnostik (HYPE Züri ab 13) — eigene Section nötig?
13. **§6.10** Diagnose-Ablehnung — Beispiel-Formulierungen aus PUK-Praxis?

### Quellen (additiv)

14. **§5.2** DSM-5 (2013) → DSM-5-TR (2022) update? (Brief §1.5 nennt DSM-5-TR explizit, Quellen-Page hat DSM-5 von 2013.)
15. **§5.2** SCID-5-PD-Manual (First et al. 2017) und IPDE-Manual (Loranger 1999) als neue Quellen aufnehmen?

### Optional

16. **§7.4 / Schritt 8** Wegweiser-Pfad «Diagnose unklar» einbauen?
17. **§7.1** Selbsttest Frage 3 (Achsen-Mischung, Audit P2-9) im Cluster 3 mit-adressieren oder separat?

---

## 11. Was Phase 0 NICHT geliefert hat

- Keine inhaltliche Vorformulierung der Diagnostik-Seite (das macht Phase 1 nach Christa-Klärungen).
- Keine Tiefen-Recherche zu nicht-PUK-Spezialambulanzen (gehört zu Christas Versorgungsrealität-Antworten).
- Keine Bewertung der Editorial-Migration-Frage für `VerstehenDiagnosticSection` über die Markierung «out-of-scope» hinaus.

---

**Ende Phase 0.** Bereit für Christa-Antworten auf §10. Sobald die da sind (insbesondere Architektur-Wahl §10.1 + Versorgungsrealität §10.4-§10.13), kann Phase-1-Sitzung-1 starten.
