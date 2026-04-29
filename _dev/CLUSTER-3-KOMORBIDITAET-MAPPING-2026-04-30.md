# Cluster-3-Mapping – Komorbidität (Phase 0 Inventar)

**Datum:** 30. April 2026
**Brief-Referenz:** `_dev/CLUSTER-3-KOMORBIDITAET-BRIEF-2026-04-30.md`
**Audit-Referenz:** `_dev/AUDIT-CONTENT-QUALITY-2026-04-28.md` — P1-6 (Komorbidität wird kaum erklärt)
**Scope:** Read-only. Kein Code-Change. Inventar + Architektur-Bewertung + Quellen-Verifikation + Christa-Rückfragen am Ende.

---

## 1. Bestehende Komorbiditäts-Inhalte (Inventar)

### 1.1 Direkte Komorbiditäts-Bezüge (sehr wenig)

| Datei                     | Zeile                          | Wortlaut / Kontext                                                                                                                                                                                                                        | Charakter                                                                                                                     |
| ------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `Genesung.tsx`            | 79                             | `"Behandlung von Begleiterkrankungen"` — als 5. Eintrag in der Förderfaktoren-Liste «Was Entwicklung eher fördert»                                                                                                                        | **Einziger expliziter Komorbiditäts-Verweis auf der ganzen Site.** Sehr knapp, ohne Inhalt.                                   |
| `UnterstuetzenAlltag.tsx` | 188-194, 226-237, 767, 783-785 | Substanzkonsum als eines von 6 «Zeichen einer impulsiven Phase»; 3-Szenario-Block «Substanzkonsum / Risikoverhalten» (was hilft/was nicht); ContentSection-Preview «dieser Alltag ist anders als Depression».                             | **Substanzkonsum als Verhalten thematisiert**, nicht als Komorbidität. Keine fachliche Einordnung als Komorbiditäts-Phänomen. |
| `Diagnostik.tsx`          | 376-389                        | Sektion «Differenzialdiagnostik — kurz»: «Bei der Diagnose werden auch andere Erkrankungen geprüft, die ähnliche Muster zeigen können — etwa bipolare Störungen, posttraumatische Belastungsstörungen, ADHS oder dissoziative Störungen.» | **Differenzialdiagnostik, nicht Komorbidität** — semantisch verwandt, aber abgrenzend.                                        |
| `Diagnostik.tsx`          | 463-470                        | Selbstreflexions-Sektion («Bin ich auch betroffen?»): «...Erschöpfungsdepression, Angststörungen oder Schlafstörungen»                                                                                                                    | Bezieht sich auf **Angehörige**, nicht auf erkrankte Person.                                                                  |

### 1.2 Indirekte Bezüge (Stimmungs-/Angst-Begriffe, ohne Komorbiditäts-Frame)

| Datei                     | Stellen                                                                                                          | Charakter                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `Verstehen.tsx`           | Z. 229, 263, 301, 365, 382 — «Angst, Wut, Scham», «Angst vor Verlust oder Abwertung», Stressmodus-Beschreibungen | Borderline-eigene Affekt-Themen, kein Komorbiditäts-Frame                                                                  |
| `UnterstuetzenAlltag.tsx` | Z. 767, 785                                                                                                      | «dieser Alltag ist anders als Depression» / «belastender als depressive Phasen»                                            | Erwähnt Depression als Vergleichsphänomen, nicht als Komorbidität    |
| `Selbstfuersorge.tsx`     | Z. 209-214                                                                                                       | «Studien zeigen ein erhöhtes Risiko für: Erschöpfungsdepression, Angststörungen, Schlafstörungen, Körperliche Beschwerden» | Bezieht sich auf **Angehörige**, nicht erkrankte Person              |
| `Glossar.tsx`             | Z. 171 (Verlassensangst), Z. 145 (Dissoziation), Z. 158-162 (Identitätsdiffusion)                                | Borderline-Symptom-Begriffe, kein Komorbiditäts-Eintrag                                                                    |
| `Buchempfehlungen.tsx`    | Z. 171, 179, 195                                                                                                 | Kinderbücher zu Depression, Trauma, Psychiatrie für Eltern-Kontext                                                         | Niederschwellige Familien-Materialien, nicht Komorbiditäts-Erklärung |

### 1.3 Audit-P1-6-Befund (zur Erinnerung)

Aus `AUDIT-CONTENT-QUALITY-2026-04-28.md`:

> #### P1-6 — Komorbidität wird kaum erklärt
>
> Borderline tritt klinisch sehr häufig komorbid auf — mit Depression (~80%), Angststörungen, PTBS (Trauma-Anamnese ist hoch), Substanzgebrauch, Essstörungen, ADHS.
>
> **Bestand:** Genesung Z. 80, UnterstuetzenAlltag Substanzkonsum
>
> **Fehlt:** Eigene FAQ-Frage / Glossar-Eintrag «Was bedeutet es, wenn mehrere Diagnosen gleichzeitig genannt werden?»; typische Komorbiditäten und was sie für die Behandlung bedeuten.

### 1.4 Was komplett fehlt (= Cluster-3-Komorbidität-Auftrag)

Die sechs Brief-Bausteine 2.1-2.6 sind **nicht abgedeckt**:

- 2.1 «Was Komorbidität bei Borderline bedeutet» — Definition, Liste, entstigmatisierende Einordnung
- 2.2 «Depression bei Borderline – die häufigste Komorbidität» — ~80%-Zahl, Differenzierung BPS-Stimmungsschwankungen vs. depressive Episode, Erkennungszeichen
- 2.3 «Was Sie als Angehörige wissen sollten» — Validieren statt diagnostizieren, Verhalten bei Rückzug, Erschöpfung
- 2.4 «Andere häufige Komorbiditäten — knapp» — Angststörungen, PTBS, Essstörungen, Substanzgebrauchsstörungen
- 2.5 «Was bedeutet das für die Behandlung?» — sequenziell vs. integriert, Medikation-Hinweis
- 2.6 «Wenn die Belastung gross wird — auch bei Ihnen» — Mini-Sektion, Cross-Link Selbstfürsorge

---

## 2. Architektur-Bewertung der vier Optionen

Brief §3 listet A / B / C / D. Hier pro Option Site-Fit, Risiken, betroffene Bestände.

### Option A — Section auf der Verstehen-Seite

**Site-Fit:**

- Verstehen-Seite ist 624 LOC mit 10 Sections (6 ContentSections + 3 Sub-Component-Sections + Hero). Die ähnliche Cluster-3-Diagnostik-Phase-0-Analyse zeigte, dass eine volle Diagnostik-Strecke (250-350 LOC) Verstehen überlädt. Komorbidität-Strecke ist vergleichbar gross (Brief §3 schätzt 150-200 LOC).
- Editorial-Pattern verfügbar. Logischer Anker: nach «Was Borderline im Kern so belastend macht» (Z. 242-293) oder nach «Verstehen hat Grenzen» (Z. 552-576).

**Vorteile:**

- Komorbidität ist konzeptuell Teil von «Was ist Borderline» — passt thematisch.
- Lesefluss: Wer Verstehen liest, findet Komorbidität direkt.

**Nachteile:**

- Verstehen würde auf ~775-825 LOC wachsen (von 624). Editorial-Migration-Ziel war kompakt-lesbare Strecken.
- Brief 2.4 «Andere Komorbiditäten knapp» + Brief 2.5 «Behandlung» passen schwer in den «Was-ist-Borderline»-Lesefluss — sie sind eher Therapie-bezogen.
- Bestehende Verstehen-Sub-Komponenten (`VerstehenSupportSections.tsx`) sind out-of-scope für Editorial-Migration; eine Erweiterung würde Pattern-Inkonsistenz verfestigen.

**Risiken:**

- Zwei verschiedene Cluster (Diagnostik schon erledigt, Komorbidität jetzt) erweitern Verstehen punktuell. Verstehen wird zu einer «Anhang-Sammlung».

### Option B — Section auf der Diagnostik-Seite

**Site-Fit:**

- Diagnostik-Seite ist gerade frisch entstanden (~782 LOC) mit 10 ContentSections inklusive «Differenzialdiagnostik — kurz» (Section 3, ein Absatz).
- Komorbidität ist inhaltlich tatsächlich die «andere Seite» der Differenzialdiagnostik — beide behandeln, wie Borderline gegen / mit anderen Erkrankungen einzuordnen ist.
- Logischer Anker: direkt nach Sektion 3 «Differenzialdiagnostik — kurz» würde eine Sektion «Komorbidität — was meist mit Borderline zusammen auftritt» einfügen.

**Vorteile:**

- Inhaltlicher Lesefluss: Differenzialdiagnostik (was IST Borderline und was nicht) → Komorbidität (was tritt MIT Borderline auf) ist eine natürliche Sequenz.
- Quellen sind teilweise dieselben (Zanarini-Daten, APA Guideline 2024, Gunderson 2018 Nature Reviews — alle bereits in Quellen-Page).
- Keine neue Route, keine Navigations-Erweiterung.

**Nachteile:**

- Diagnostik-Seite würde von ~782 auf ~950-1000 LOC wachsen. Verändert ihren Charakter Richtung «Diagnostik + Anhang».
- Brief 2.6 «Auch bei Ihnen» passt schwer in den Diagnostik-Lesefluss — Diagnostik ist Prozess-fokussiert, nicht Angehörigen-Belastungs-fokussiert.
- Diagnostik-Hero sagt aktuell «Wie eine Borderline-Diagnose entsteht und was sie für Sie als Angehörige bedeutet». Eine Komorbiditäts-Section würde den Hero-Scope verändern (jetzt auch «Was MIT Borderline auftritt»).

**Risiken:**

- Zwei Cluster-3-Themen in einer Seite konzentriert — ähnliches Pattern wie A, nur auf Diagnostik statt Verstehen.

### Option C — Eigene Seite `/komorbiditaet` (oder anderer Slug)

**Site-Fit:**

- Site hat aktuell 33 Routes (nach Cluster-3-Diagnostik-Erweiterung). Eine weitere ändert das System nicht qualitativ.
- Editorial-Pattern verfügbar, analog zu `/genesung` oder `/diagnostik`.
- URL-Slug-Frage: Brief nennt drei Optionen — `/komorbiditaet` (sperrig), `/depression-bei-borderline` (eng), `/begleiterkrankungen` (neutral). Bestehende Site-Konvention nutzt deutsche Slugs (verstehen, genesung, grenzen, selbstfuersorge, kommunizieren). `/begleiterkrankungen` würde am besten passen.

**Vorteile:**

- Alle 6 Brief-Bausteine 2.1-2.6 finden Platz, ohne andere Seiten zu überladen.
- Cross-Link-fähig aus mehreren Richtungen: Verstehen, Diagnostik, Genesung, Soforthilfe.
- Klare Slug «Begleiterkrankungen» ist suchbar und SEO-fähig.
- Sub-Navigation in Ressourcen-Menü Gruppe «Wissen & Materialien» möglich (analog zu `/diagnostik`).

**Nachteile:**

- Zweite Cluster-3-Seite in kurzer Zeit (Diagnostik gerade frisch) — Kombi-Pflege-Aufwand wächst.
- Suchindex (`searchIndex.ts`) muss gepflegt werden.

**Risiken:**

- Wenn die Komorbidität-Strecke zu kurz wird, wirkt eine eigene Seite unverhältnismässig. Brief schätzt 150-200 LOC. Vergleich: `/genesung` ist 696 LOC, `/diagnostik` ist 782 LOC — eine 250-350-LOC-Page wäre auf der dünnen Seite, aber vertretbar (analog zu z. B. `/buchempfehlungen` mit ~300 LOC).

### Option D — Hybrid: Diagnostik-Section (kurz) + eigene Seite (tief)

**Site-Fit:**

- Variante 1: kurze 1-2-Absatz-Section in Diagnostik (nach Differenzialdiagnostik), zusätzlich eigene Komorbidität-Seite mit Tiefe. Cross-Link von Diagnostik auf Komorbidität-Seite.
- Variante 2: nur Cross-Link in Diagnostik, kein eigener Section-Inhalt dort. Faktisch dann Option C + ein Cross-Link.

**Vorteile:**

- Lesefluss: Diagnostik-Lesende stossen auf den Begriff, finden via Cross-Link die Tiefe.
- Wenig Doppelpflege bei Variante 2.

**Nachteile:**

- Variante 1: doppelte Pflege (Konsistenz Diagnostik-Section vs. Komorbidität-Seite).
- Variante 2: ist eigentlich Option C minus eine kleine Diagnostik-Anpassung — kaum Hybrid-Charakter.

---

## 3. Verstehen-Seite Stand-der-Dinge

Aktueller Stand nach Cluster-3-Diagnostik-Sitzung-1:

- `Verstehen.tsx`: 624 LOC, unverändert (Cluster 3 hat sie nicht angefasst).
- `VerstehenSupportSections.tsx`: 154 LOC (war 144 vor Cluster 3, +10 für den `/diagnostik`-Cross-Link in `VerstehenDiagnosticSection`).

Die Cross-Link-Erweiterung in `VerstehenDiagnosticSection` war minimal (10 LOC, Z. 143-150). Eine Komorbidität-Section in Verstehen wäre struktureller — entweder neue ContentSection (~150-200 LOC) oder neuer Sub-Komponente in `VerstehenSupportSections`.

**Verfügbarer Platz:** ContentSection-Anker-Position wäre nach Z. 576 «Verstehen hat Grenzen» und vor Z. 578 `<VerstehenDiagnosticSection />`. Würde Verstehen von 624 LOC auf ~775-825 LOC bringen.

**Konsequenz:** Option A ist machbar, aber Verstehen-Seite verliert die Editorial-Kompaktheit.

---

## 4. Diagnostik-Seite Stand-der-Dinge

Aktueller Stand:

- `Diagnostik.tsx`: 782 LOC, 10 ContentSections + Hero + Schluss + RelatedLinks
- Sektion 3 «Differenzialdiagnostik — kurz» (Z. 376-389) ist ein einzelner Absatz: «Bei der Diagnose werden auch andere Erkrankungen geprüft, die ähnliche Muster zeigen können — etwa bipolare Störungen, posttraumatische Belastungsstörungen, ADHS oder dissoziative Störungen.»

**Logischer Anker für Option B:** Eine neue Sektion 3.5 «Komorbidität — was meist mit Borderline zusammen auftritt» direkt nach «Differenzialdiagnostik — kurz». Wichtig: Die Aussagen müssen sauber abgegrenzt werden — Differenzialdiagnostik (Bipolar) vs. Komorbidität (Depression, Angst, PTBS, etc.).

**Achtung Konsistenz-Risiko:** Differenzialdiagnostik nennt aktuell «posttraumatische Belastungsstörungen» und «dissoziative Störungen» als auszuschliessende Erkrankungen. Wenn dieselben in einer Komorbidität-Section als «häufig mit BPS auftretend» genannt werden, entsteht Widerspruch. Müsste klar disambiguiert werden («im Diagnostik-Prozess wird unterschieden, ob… auch separat bestehen oder ob Borderline-Symptomatik primär ist»).

**Verfügbarer Platz:** ~150-200 LOC zusätzlich. Würde Diagnostik von 782 auf ~950-1000 LOC bringen.

---

## 5. FAQ-Stand

### 5.1 Bestehende Q&A in Kategorie «Diagnose & Krankheitsverständnis»

Nach Cluster-3-Diagnostik-Sitzung-1 sind dort 7 Fragen:

1. «Soll ich die Diagnose ansprechen?»
2. «Ist Borderline heilbar?»
3. «Ist Borderline erblich? Bin ich schuld?»
4. «Warum verhält sich mein Angehöriger bei anderen regulierter und stabiler?»
5. «Wer kann eine Borderline-Diagnose stellen?» (neu)
6. «Was, wenn die betroffene Person die Diagnose ablehnt?» (neu)
7. «Wie lange dauert es, bis eine Diagnose feststeht?» (neu)

Keine berührt Komorbidität direkt. Frage 3 («erblich?») kommt thematisch am nächsten, behandelt aber Ursachen, nicht Komorbidität.

### 5.2 Was sich für FAQ-Erweiterung anböte (Cluster-3-Komorbidität)

Audit P1-6 Empfehlung (Audit-Z. 288): «Was bedeutet es, wenn mehrere Diagnosen gleichzeitig genannt werden?» — gut FAQ-fähig.

Weitere mögliche Q&A:

- **«Mein Angehöriger hat zusätzlich zur Borderline-Diagnose auch eine Depression — was bedeutet das?»** — direkt zum Brief-Baustein 2.2
- **«Werden Komorbiditäten getrennt oder zusammen behandelt?»** — Brief-Baustein 2.5
- **«Wie unterscheide ich Borderline-Stimmungsschwankungen von einer depressiven Episode?»** — Brief-Baustein 2.2 (mit Anti-Diagnostik-Drängen-Caveat)

⚠ **Risiko bei der dritten Frage:** Im Brief §1.4 ist explizit «Anti-Diagnostik-Drängen» als rote Linie. Eine FAQ-Frage, die Angehörige zur Differenzierung anleitet, kollidiert direkt damit. Wenn Frage aufgenommen, dann mit klarem Caveat «das ist klinische Aufgabe, nicht Ihre».

---

## 6. Quellen-Lage + Zanarini-PubMed-Verifikation (zentral)

### 6.1 Brief-Vorgabe §1.5

> «Die ‹~80%›-Zahl muss durch eine konkrete Quelle belegt werden, nicht als gerundete Daumenregel im Raum stehen. Konkret: Zanarini et al. haben in mehreren Verlaufsstudien die Komorbiditätsraten bei Borderline ausgewertet. Vor Aufnahme der Aussage: Inline-Verweis identifizieren, der die Zahl trägt.»

### 6.2 PubMed-Recherche (durchgeführt)

According to PubMed gibt es zwei zentrale Zanarini-Komorbiditäts-Studien:

**Kandidat A — Zanarini et al. (1998) Axis I comorbidity** [PMID 9842784]:

> Zanarini, M. C., Frankenburg, F. R., Dubo, E. D., Sickel, A. E., Trikha, A., Levin, A. & Reynolds, V. (1998). _Axis I comorbidity of borderline personality disorder._ American Journal of Psychiatry 155(12), 1733-1739.
> [DOI: 10.1176/ajp.155.12.1733](https://doi.org/10.1176/ajp.155.12.1733) · PubMed: 9842784

**Inhalt (laut Abstract):** 504 stationäre Patient:innen mit Persönlichkeitsstörungen; lebenszeitige Achse-I-Komorbidität bei BPS. **Kein Prozentsatz im Abstract genannt** — das «80%»-Zitat müsste aus dem Volltext stammen. Diese Studie ist die klassisch-zitierte Quelle für hohe Komorbiditätsraten bei BPS, besonders Mood Disorders + Anxiety Disorders.

**Kandidat B — Zanarini et al. (2004) 6-Year Follow-up** [PMID 15514413]:

> Zanarini, M. C., Frankenburg, F. R., Hennen, J., Reich, D. B. & Silk, K. R. (2004). _Axis I comorbidity in patients with borderline personality disorder: 6-year follow-up and prediction of time to remission._ American Journal of Psychiatry 161(11), 2108-2114.
> [DOI: 10.1176/appi.ajp.161.11.2108](https://doi.org/10.1176/appi.ajp.161.11.2108) · PubMed: 15514413

**Inhalt (laut Abstract):** 290 BPS-Patient:innen über 6 Jahre. Hohe Raten von Mood- und Anxiety-Disorders, abnehmend über Zeit. **Wieder keine konkrete %-Zahl im Abstract.**

### 6.3 Stand der Quellen-Page

Aktuell in Quellen-Page (nach Cluster 3 Sitzung 1):

- Zanarini et al. 2010 (McLean Recovery)
- Zanarini et al. 2012 (Sustained remission/recovery)
- Gunderson et al. 2018 Nature Reviews Disease Primers — enthält Komorbiditäts-Daten in der Übersichts-Sektion (Volltext nötig zur Verifikation)
- APA Practice Guideline (2024) — enthält ebenfalls Komorbiditäts-Daten
- Storebø et al. 2020 Cochrane

Nicht in Quellen-Page: Zanarini 1998 (Axis I) und Zanarini 2004 (6-Year Follow-up) — die zwei Komorbiditäts-zentralen Studien fehlen. Das ist der Hauptverstärkungs-Punkt für Phase 1.

### 6.4 ⚠ Christa-Klärung nötig (Quellen)

**Welche genaue Studie + welche genaue Zahl soll im Body zitiert werden?**

Die «~80%»-Zahl ist eine in der Literatur verbreitete Daumenregel. Mögliche konkrete Belege (alle nicht ohne Volltext-Zugang verifizierbar):

- Zanarini 1998 Axis I-Studie: typischerweise zitiert mit ~83% lebenszeitige Major Depression bei BPS-Patient:innen
- Gunderson 2018 Nature Reviews Disease Primers: aktuelle Übersicht, gibt vermutlich konsolidierte Komorbiditätsraten
- APA Practice Guideline 2024: enthält Versorgungs-Übersicht inklusive Komorbiditätsraten

⚠ **Vor Phase 1: Christa muss entscheiden, welcher Inline-Verweis die ~80%-Aussage trägt.** Mit Buchzugang oder Fachexpertise kann sie verifizieren, welche Studie + welche genaue Zahl genannt werden soll.

**Default-Vorschlag:** Inline-Wording «laut Zanarini-Verlaufsstudien zeigen sich Lebenszeitprävalenzen depressiver Erkrankungen von rund 80%» mit Cross-Verweis auf Quellen-Page (Zanarini 1998 + 2004 als neue Einträge).

---

## 7. Risiko-Hinweise (Konflikte mit bestehenden Site-Inhalten)

### 7.1 Stimmungsschwankungs-Differenzierung

Brief 2.2 sagt: «Borderline-typische Stimmungsschwankungen sind kürzer (Stunden bis Tage), eine depressive Episode ist anhaltender (Wochen bis Monate).»

Bestehende Site-Aussagen, die mit dieser Differenzierung interagieren:

- **Verstehen.tsx Z. 297-371** «Scham, Wut und innere Überflutung» — beschreibt rasche Affekt-Schwankungen bei BPS, ohne Zeitangabe. Wenn Komorbiditäts-Section eine konkrete Stunden/Tage-vs-Wochen-Differenzierung einführt, muss das konsistent zur Verstehen-Sektion sein.
- **UnterstuetzenAlltag.tsx Z. 767, 783-785** «dieser Alltag ist anders als Depression» / «belastender als depressive Phasen» — implizit eine Differenzierung Borderline-Alltag vs. depressive Phase. Wenn Komorbiditäts-Section explizite Zeitfenster nennt, müsste das mit der Alltag-Beschreibung kompatibel sein.

**Mitigation:** Brief 2.3 hat dies bereits erkannt: «Angehörige sollen nicht selbst differenzieren ‹ist das jetzt Borderline-Stimmung oder depressive Episode?› — das ist klinische Aufgabe.» Diese Klausel muss in der finalen Implementation prominent stehen, damit Verstehen + Komorbiditäts-Section nicht widersprüchlich wirken.

### 7.2 Suizidrisiko

Brief 1.2 (Punkt 3): «Komorbide Depression erhöht das Suizidrisiko deutlich.» Die Site behandelt Suizidalität in:

- `UnterstuetzenKrise.tsx` — «Direktes Fragen» nicht erhöht Risiko, Krisen-Triage-System
- `Soforthilfe (static HTML)` — Notfallnummern für akute Suizidgefahr
- `Notfallkarte.tsx` — persönliche Notfallkarte
- `FAQ.tsx` — Frage «Wie reagiere ich auf bedrohlich wirkende Aussagen?» (Z. 138)

**Risiko:** Eine «erhöhtes Suizidrisiko durch Komorbidität»-Aussage in Komorbiditäts-Section muss klar an die bestehenden Krisen-Verweise anknüpfen und darf keine neue, isolierte Risiko-Beschreibung schaffen.

**Mitigation:** Cross-Link auf `/soforthilfe` und `/unterstuetzen/krise` in der Komorbiditäts-Section, sobald Suizidrisiko erwähnt wird (Brief 2.2: «erhöhtes Suizidrisiko»; Brief 2.3: «bei Hinweisen auf Suizidalität → Soforthilfe»).

### 7.3 Anti-Diagnostik-Drängen-Linie

Cluster-3-Diagnostik-Seite hat eine sehr klare Linie: Angehörige werden nicht in eine Diagnostiker-Rolle gedrängt. Brief §1.4 (Komorbidität) bestätigt: «Wir bleiben auf der Verständnis-Ebene für Angehörige, nicht auf der Behandlungsplanungs-Ebene für Fachpersonen.»

**Risiko:** Brief 2.2 nennt Erkennungszeichen einer depressiven Phase (anhaltender Rückzug, Antriebslosigkeit etc.). Wenn diese Zeichen ohne Anti-Diagnostik-Caveat aufgelistet werden, geraten Angehörige in eine Differenzierungs-Rolle.

**Mitigation:** Brief §2.3 hat den Caveat bereits formuliert. In der Implementation muss er **vor** den Erkennungszeichen-Aussagen stehen (nicht erst danach).

### 7.4 Konsistenz mit Diagnostik-Seite Differenzialdiagnostik-Section

Diagnostik-Sektion 3 nennt PTBS und dissoziative Störungen als **Differenzialdiagnose**. Brief 2.4 nennt PTBS als **häufige Komorbidität**.

**Konflikt:** Beide Aussagen sind klinisch korrekt — PTBS kann sowohl differenzialdiagnostisch geprüft als auch komorbid bestehen. Aber für Lesende ohne klinischen Hintergrund kann das verwirren.

**Mitigation:** In Komorbiditäts-Section (welche Architektur-Option auch immer) explizit machen: «Manche Erkrankungen werden im Diagnostik-Prozess zunächst geprüft (Differenzialdiagnostik) und können dann auch parallel zur Borderline-Diagnose bestehen (Komorbidität).»

### 7.5 Verstehen-Seite-Sub-Komponenten Editorial-Migration

Falls Option A: `VerstehenSupportSections.tsx` ist Legacy-Card-Pattern, out-of-scope für Editorial-Migration laut Code-Comment in Verstehen.tsx. Eine Komorbiditäts-Erweiterung dort verstärkt das Pattern-Inkonsistenz-Risiko.

**Mitigation:** Falls Option A: neue ContentSection direkt auf Verstehen.tsx im Editorial-Pattern, NICHT als zusätzliche `Verstehen…Section`-Komponente.

### 7.6 Diagnostik-Hero-Scope

Falls Option B: Diagnostik-Hero sagt aktuell «Wie eine Borderline-Diagnose entsteht und was sie für Sie als Angehörige bedeutet». Eine Komorbiditäts-Section würde den Hero-Scope inhaltlich erweitern.

**Mitigation:** Hero-Wortlaut ggf. anpassen auf «Diagnose & Begleiterkrankungen» — aber das ist eine Inhalts-Verschiebung, die Christa absegnen muss.

---

## 8. Architektur-Empfehlung (Site-Architektur-Sicht)

**Empfehlung: Option C (eigene Seite `/begleiterkrankungen`).**

Begründung:

1. **Inhalts-Volumen rechtfertigt eigene Seite.** Brief schätzt 150-200 LOC für die volle Strecke; mit Editorial-Pattern, Hero, Quellen-Verweisen wird es realistisch 250-350 LOC. Das ist im Bereich anderer eigenständiger Editorial-Seiten (Buchempfehlungen ~300 LOC, Quellen ~470 LOC nach Cluster-1-Erweiterung).

2. **Mehrere Cross-Link-Quellen.** Komorbidität ist von Verstehen, Diagnostik, Genesung, Soforthilfe relevant — eine eigene Seite ist die natürliche Ankerung. Option A (nur Verstehen) oder B (nur Diagnostik) bindet das Thema an eine Seite, obwohl es viele Lese-Pfade gibt.

3. **Vermeidet Verstehen- und Diagnostik-Überladung.** Beide Seiten sind nach Cluster 3 Sitzung 1 bereits dicht.

4. **Slug-Wahl: `/begleiterkrankungen`** (nicht `/komorbiditaet`). Begründung: konsistent mit deutscher Slug-Konvention der Site, suchbar, niedrigschwelliger als das Fachwort. Die Site-interne Verlinkung kann «Begleiterkrankungen» als Label und «Komorbidität» als Erläuterungs-Begriff in der Seite verwenden.

5. **Sub-Navigation analog `/diagnostik`.** Eintrag in `domain/navigation.ts` Gruppe «Wissen & Materialien», direkt nach Diagnostik (oder vor Genesung & Hoffnung — Christa-Wahl).

6. **Editorial-Pattern verfügbar.** Hero + Intro + 6 ContentSections (analog zu Brief 2.1-2.6) + RelatedLinksEditorial. Bewährte Struktur.

7. **FAQ-Erweiterung minimal.** 1-2 Q&A in Kategorie «Diagnose & Krankheitsverständnis» (z. B. «Was bedeutet es, wenn mehrere Diagnosen gleichzeitig genannt werden?»). Cross-Link auf Begleiterkrankungen-Seite.

**Gegen Option B (Diagnostik-Section):** Diagnostik-Seite verliert ihren scharf umrissenen Charakter, wenn sie zur «Diagnostik + Komorbidität»-Seite wird. Das ist konzeptuell unschön und macht die Seite schwerer verständlich für Lesende.

**Gegen Option A (Verstehen-Section):** Verstehen ist konzeptuell, Komorbidität ist klinisch-praktisch. Pattern-Mismatch.

**Gegen Option D (Hybrid):** Doppelte Pflege ohne klaren Mehrwert. Wenn schon eine eigene Seite, dann ohne zusätzliche Diagnostik-Section.

---

## 9. Phase-1-Reihenfolge-Empfehlung

Falls Christa Option C bestätigt:

| Reihenfolge | Schritt                                                                                                                   | Risiko                                                                         | Aufwand         | Christa-Block?              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------- | --------------------------- |
| 1           | Christa-Klärungen §10 abarbeiten (Quellen-Verifikation, Slug-Bestätigung)                                                 | —                                                                              | 1 Antwort-Runde | ja                          |
| 2           | Quellen-Page: Zanarini 1998 + Zanarini 2004 ergänzen (Komorbidität-Studien)                                               | niedrig (additiv, PubMed-verifizierte Bibliografien)                           | 30 Min          | nein                        |
| 3           | Neue Seite `Begleiterkrankungen.tsx` mit Editorial-Pattern — Hero + 6 ContentSections für Brief 2.1-2.6                   | mittel (neuer Seitenfluss, Stimmungsschwankungs-Differenzierung sauber halten) | 2-3 Std         | nein, falls §10 geklärt     |
| 4           | Route in `routes.ts` ergänzen, `searchIndex.ts`-Einträge anlegen                                                          | niedrig                                                                        | 20 Min          | nein                        |
| 5           | Sub-Navigation: Begleiterkrankungen in `domain/navigation.ts` Gruppe «Wissen & Materialien»                               | niedrig                                                                        | 5 Min           | optional Christa (Position) |
| 6           | FAQ-Erweiterung um 1-2 Q&A mit Cross-Link                                                                                 | niedrig (Wortlaut-Freigabe vorab)                                              | 30 Min          | ja (Wortlaut)               |
| 7           | Cross-Link in `Diagnostik.tsx` Section 3 «Differenzialdiagnostik»: «Mehr zu Komorbidität → /begleiterkrankungen»          | niedrig                                                                        | 10 Min          | nein                        |
| 8           | Cross-Link in `VerstehenDiagnosticSection`: ggf. ergänzend zum bestehenden Diagnostik-Cross-Link auch Begleiterkrankungen | niedrig                                                                        | 10 Min          | optional                    |
| 9           | Cross-Link in `Genesung.tsx` Förderfaktor «Behandlung von Begleiterkrankungen» (Z. 79): Anker-Verweis auf neue Seite      | niedrig                                                                        | 10 Min          | nein                        |

**Total Phase 1: ~4-5 Std** (kleiner als Cluster-3-Diagnostik-Sitzung-1, weil Anbieter-Box-Recherche entfällt). Aufteilung in eine Sitzung wahrscheinlich machbar, falls keine Christa-Block-Iterationen während der Implementation.

---

## 10. Christa-Rückfragen — Konsolidierte Liste

Vor Phase-1-Start zu beantworten:

### Architektur (zwingend vor Implementation)

1. **§3 Architektur-Wahl:** A (Verstehen-Section) / B (Diagnostik-Section) / C (eigene Seite) / D (Hybrid)? Empfehlung: C.
2. **Slug** falls Option C: `/begleiterkrankungen` (Empfehlung) oder `/komorbiditaet` oder `/depression-bei-borderline`?
3. **Sub-Navigation-Position** falls Option C: in Gruppe «Wissen & Materialien» direkt nach Diagnostik (Empfehlung) oder vor «Genesung & Hoffnung» oder andere Position?

### Quellen (zwingend vor Phase 1)

4. **§6.4 Inline-Quellenangabe der ~80%-Rate:** Welche genaue Studie (Zanarini 1998 / Zanarini 2004 / Gunderson 2018 / APA Guideline 2024) und welche genaue Zahl soll im Body erscheinen? Default-Vorschlag im Mapping war «laut Zanarini-Verlaufsstudien rund 80% Lebenszeitprävalenz depressiver Erkrankungen».
5. **§6.3** Zanarini 1998 (PMID 9842784, Axis I) und Zanarini 2004 (PMID 15514413, 6-Year Follow-up) als zwei neue Einträge in Quellen-Page «Klinische Studien & Forschung» — bestätigt? Oder nur eine der beiden?

### Inhaltliche Klärungen

6. **§7.1 Stimmungsschwankungs-Differenzierung:** Brief 2.2 will Stunden/Tage (BPS) vs. Wochen/Monate (depressive Episode). Wie genau formulieren, ohne in Diagnostik-Anleitung für Angehörige zu kippen? Möglich: Caveat «das ist klinische Aufgabe» direkt **vor** der Differenzierung statt danach.
7. **§7.2 Suizidrisiko:** Brief 1.2 nennt «strukturelle Erhöhung des Risikos durch Komorbidität». Wie prominent in der Seite? Mit Cross-Link auf `/soforthilfe` und `/unterstuetzen/krise` — explizit oder implizit?
8. **§7.4 PTBS Differenzialdiagnostik vs. Komorbidität:** Diagnostik-Seite nennt PTBS als Differenzialdiagnose; Brief 2.4 als Komorbidität. Wie disambiguieren? Empfehlung: kurzer Hinweis-Satz in der neuen Seite («wird im Diagnostik-Prozess geprüft und kann auch parallel bestehen»).
9. **Brief 2.4 «Andere Komorbiditäten knapp»:** Welche Tiefe? Brief sagt «ein Absatz pro Erkrankung». Bei vier Erkrankungen (Angststörungen, PTBS, Essstörungen, Substanzgebrauchsstörungen) ergibt das ~4 kurze Absätze. Christa-Bestätigung der Liste erforderlich?
10. **Brief 2.5 Medikation-Hinweis:** «Borderline selbst ist nicht primär medikamentös behandelbar, das ist seit langem Konsens.» Als allgemeine Aussage übernehmen oder mit Quellenverweis (APA Guideline 2024)?

### FAQ-Erweiterung

11. **Welche FAQ-Frage(n)?** Vorschläge:

- «Was bedeutet es, wenn mehrere Diagnosen gleichzeitig genannt werden?» (Audit-Empfehlung)
- «Mein Angehöriger hat zusätzlich zur Borderline auch eine Depression — was bedeutet das?»
- Beide?
- Andere Wortlaute?

Wortlaut-Freigabe vor Implementation analog zu Cluster-3-Diagnostik-FAQ-Workflow.

### Optional

12. **§7.6 Diagnostik-Hero-Scope:** Falls Option B oder D: Diagnostik-Hero anpassen auf «Diagnose & Begleiterkrankungen»? Bei Option C (Empfehlung) entfällt diese Frage.
13. **Glossar-Eintrag «Komorbidität»:** Audit-Empfehlung war «Glossar-Eintrag mit Verweis darauf, dass Borderline selten allein auftritt». Aufnehmen in Sitzung 1 oder als separater Cluster-4-Polish-Punkt?

---

## 11. Was Phase 0 NICHT geliefert hat

- Keine Volltext-Verifikation der ~80%-Rate (Zanarini 1998 oder 2004 Volltext nicht zugänglich; Abstract enthält keine konkrete %-Zahl). **Wichtigste Christa-Klärung in §10.**
- Keine inhaltliche Vorformulierung der Begleiterkrankungen-Seite (das macht Phase 1 nach Christa-Klärungen).
- Keine Detail-Recherche zu APA-Guideline-2024-Komorbiditäts-Kapitel oder Gunderson-2018-Übersichts-Daten.
- Keine Bewertung, ob `/begleiterkrankungen` mit anderen Site-Routes oder externen Backlinks kollidiert (vermutlich nicht, aber nicht systematisch geprüft).

---

**Ende Phase 0.** Bereit für Christa-Antworten auf §10. Sobald die da sind (insbesondere Architektur-Wahl §10.1, Slug §10.2 und Quellen-Verifikation §10.4), kann Phase-1-Sitzung-1 starten.
