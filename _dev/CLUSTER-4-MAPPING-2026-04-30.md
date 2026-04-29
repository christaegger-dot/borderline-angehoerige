---
Cluster: 4 — Feinschliff (niedrige Priorität)
Datum: 2026-04-30
Auditor-Quelle: `_dev/AUDIT-CONTENT-QUALITY-2026-04-28.md` (P2-1, P2-2, P2-3, P2-8, P2-9, P2-10) + Verschiebung aus Cluster 1 (Aguirre 2014)
Methode: Read-only Reality-Check gegen aktuellen `main`-Stand (HEAD `7efc634`); jede Audit-Aussage gegen das Repo verifiziert
Status: Inventur fertig, redaktionelle Entscheidungen offen
---

# Cluster 4 — Feinschliff: Mapping

## §0 — Reality-Check vs. Audit-Stand

Audit datiert 2026-04-28; seither ist viel passiert (Cluster 1 + Cluster 3 vollständig umgesetzt). Mehrere Audit-Findings sind bereits beantwortet oder verschoben — die Mapping-Inventur prüft jeden Punkt gegen den **aktuellen** Stand.

| Audit-Punkt                             | Status heute                                                          |
| --------------------------------------- | --------------------------------------------------------------------- |
| P2-1 Mythen-Sektion                     | unverändert offen                                                     |
| P2-2 Geschlechterverteilung             | unverändert offen                                                     |
| P2-3 Recovery-Zeit-Konsistenz           | unverändert offen                                                     |
| P2-4 MBT-Aktualität                     | ✅ erledigt (Cluster 1 / PR #325, Bateman & Fonagy 2009 RCT)          |
| P2-5 Aguirre und Paris                  | Paris ✅ erledigt (Cluster 1 / PR #326); **Aguirre offen** (siehe §7) |
| P2-6 Kinderschutz-Stellen               | ⊘ in Cluster 2 (Soforthilfe-Erweiterung) verlagert                    |
| P2-7 Männerspezifische Anlaufstelle     | ⊘ in Cluster 2 verlagert                                              |
| P2-8 DSM-5-Kriterien                    | unverändert offen                                                     |
| P2-9 Selbsttest Frage 3                 | unverändert offen                                                     |
| P2-10 Sprachregelung erkrankt/betroffen | unverändert offen                                                     |

**Cluster-4-Skopus heute:** sechs offene Punkte (P2-1, P2-2, P2-3, P2-8, P2-9, P2-10) plus Aguirre-Buchempfehlung.

---

## §1 — Mythen-Sektion konsolidieren (P2-1)

### Inventur — bestehende Mythos-Entkräftungen verstreut

| Mythos                                             | Wo bereits adressiert                                                                                                                                                        |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| «Borderline ist nicht behandelbar / nicht heilbar» | `FAQ.tsx` Z. 81 («Ist Borderline heilbar?»); `Genesung.tsx` 85-93%/50%-Block ab Z. 240; `Glossar.tsx` Z. 105-114 (Remission/Recovery)                                        |
| «Direktes Fragen nach Suizid weckt Suizidalität»   | `UnterstuetzenKrise.tsx` Z. 165 («Hinweis: Direktes Fragen erhöht das Risiko nicht…»)                                                                                        |
| «Ich (als Angehörige) bin schuld»                  | `FAQ.tsx` Z. 87 («Ist Borderline erblich? Bin ich schuld?»)                                                                                                                  |
| «Borderline-Patient:innen sind manipulativ»        | `Verstehen.tsx` Z. 261-266 («Hinter heftigen Reaktionen liegen oft Überflutung, Angst, Scham…»); FAQ implizit «Warum verhält sich mein Angehöriger bei anderen regulierter?» |
| «Borderline = Trauma/PTBS»                         | seit Cluster 3 in `Diagnostik.tsx` (Differenzialdiagnostik) und `Begleiterkrankungen.tsx` Z. 71 (PTBS-Disambiguation) sauber adressiert                                      |
| «Nur Frauen haben Borderline»                      | **nirgendwo** adressiert (Lücke aus P2-2, hier verschränkt)                                                                                                                  |

### Architektur-Optionen für die Konsolidierung

- **Option A — Eigene Sektion auf `/verstehen`** (im Audit als erste Empfehlung): «Häufige Mythen über Borderline» zwischen «Was Borderline im Kern so belastend macht» (Z. 244) und «Scham, Wut, innere Überflutung» (Z. 299). 5-6 Mythen × kurzer Antwort. Vorteil: hohes Auffindungs-Potenzial (Verstehen ist Tier-1-Page); Nachteil: macht eine ohnehin lange Page noch länger.
- **Option B — Eigene Mini-Page `/mythen`** (oder `/mythen-realitaet`): einzelner schlanker Page-Eintrag mit Editorial-Pattern, verlinkt aus Verstehen, FAQ, Selbsttest. Vorteil: prominentes Eigengewicht, klarer Anti-Stigma-Ankerpunkt; Nachteil: Pflege einer weiteren Page; Sub-Nav-Eintrag nötig.
- **Option C — Mythen als FAQ-Kategorie**: Block «Mythen & Fakten» mit ~5 Fragen («Stimmt es, dass…?»). Vorteil: bestehendes Gefäss, niedriger Aufwand; Nachteil: weniger sichtbar als eigenständige Sektion.
- **Option D — Status quo + Cross-Verweise**: keine eigene Sektion bauen, stattdessen die bestehenden Stellen mit gegenseitigen Querverweisen verzahnen. Vorteil: kein neues Gefäss; Nachteil: löst die Audit-Diagnose «verstreut → kraftlos» nicht.

**Tendenz Auditor (2026-04-28):** Option A oder B. **Empfehlung der Inventur:** A — die Stigma-Botschaften tragen am besten dort, wo Lesende ohnehin nach Verstehen-Inhalten suchen. Eine eigene Page (B) wäre hingegen die richtige Wahl, falls Christa sie auch von der Home oder vom Selbsttest-Result-Bucket «verstehen» prominent verlinken will.

---

## §2 — Geschlechterverteilung (P2-2)

### Inventur — aktuelle Stelle, an der das Thema fehlt

- `Verstehen.tsx` Z. 244-267 (Sektion «Was Borderline im Kern so belastend macht») wäre der natürliche Ort für einen Klarstellungs-Satz.
- `Glossar.tsx` Z. 47 (BPS-Eintrag) erwähnt Diagnose-Klassifikation, nicht aber Geschlechterverteilung.
- `FAQ.tsx` adressiert kein Q&A zur Demografie.
- Aktuell verwendet die Site konsequent geschlechtsneutrale Sprache («die betroffene Person», «Ihr Angehöriger») — die Lücke ist also: das Thema **wird nicht gesetzt**, nicht falsch.

### Quellen-Lage

- DSM-5: «approximately 75% in clinical settings are female» — etablierte Zahl, in Audit zitiert.
- Grant et al. (2008), NESARC: in der Allgemeinbevölkerung Verteilung 5.6% Männer / 6.2% Frauen → annähernd 1:1 — etablierte Quelle, im Audit P2-2 zitiert.
- Aktueller Quellen-Page-Stand (`Quellen.tsx` Z. 157): «Grant et al. (2008): Prävalenz- und Verlaufsdaten zu Persönlichkeitsstörungen» bereits aufgelistet — **die Quelle ist also schon da**, nur inhaltlich nicht in einer Page genutzt.

### Optionen

- **Option A — Ein Satz auf Verstehen-Page**: 1-2 Sätze in der Sektion «Was Borderline im Kern so belastend macht», analog zur konzeptuellen Klarstellung. Niedrigster Aufwand.
- **Option B — Glossar-Eintrag «Borderline-Persönlichkeitsstörung» erweitern**: Im bestehenden BPS-Eintrag (Glossar.tsx Z. 47) ein Satz zur Verteilung. Niedrigster Aufwand, aber an versteckter Stelle.
- **Option C — Eigene FAQ-Frage**: «Bekommen nur Frauen Borderline?» in Kategorie «Diagnose & Krankheitsverständnis». Adressiert das Stigma direkt; gut auffindbar.
- **Option D — Verschränkt mit Mythen-Sektion (P2-1)**: «Nur Frauen haben Borderline» als eigener Mythos-Eintrag. Wenn P2-1 als Sektion umgesetzt wird, wäre das die ökonomischste Lösung — eine Aussage, doppelte Wirkung.

**Empfehlung der Inventur:** D, falls Mythen-Sektion gebaut wird. Sonst A (Verstehen-Page).

---

## §3 — Recovery-Zeit-Konsistenz (P2-3)

### Inventur verifiziert (Stand HEAD `7efc634`)

**`Genesung.tsx` Z. 250-290** — Drei-Spalten-Block:

| Zelle  | Wortlaut heute                                                                                | Zeit-Horizont?                                                |
| ------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 85-93% | «erreichen eine symptomatische Remission **innerhalb von etwa 10 Jahren**»                    | ✅ explizit                                                   |
| 50%    | «erreichen eine umfassendere Genesung mit funktioneller Stabilität»                           | ❌ keine Zeitangabe                                           |
| Jahre  | «nicht Wochen oder Monate – eher mindestens ein bis mehrere Jahre, oft mit mehreren Anläufen» | bezieht sich auf Therapieverlauf, nicht auf Recovery-Horizont |

**`Glossar.tsx` Z. 110-113** (Eintrag Recovery): «Etwa 50% der Betroffenen erreichen **nach 10 Jahren** eine vollständige Recovery (Zanarini et al., 2012).» — Zeitangabe vorhanden.

**`Glossar.tsx` Z. 100-105** (Eintrag Remission): «85-93% der Betroffenen **innerhalb von 10 Jahren** eine Remission (u.a. Zanarini et al., 2010).» — Zeitangabe vorhanden.

### Diagnose

Glossar ist konsistent (beide Einträge mit «10 Jahren»). **Genesung-Page hat nur in der 85-93%-Zelle die Zeitangabe; in der 50%-Zelle fehlt sie.** Das war exakt die Audit-Diagnose und sie stimmt heute noch.

### Brief-Sonderregel beachten (Genesung.tsx Z. 8-9)

Der Code-Comment am Page-Anfang dokumentiert: «Brief-Sonderregel (Page 8): Die drei Statistiken (85-93% Remission, 50% Recovery, ~10 Jahre Horizont) sind bereits inhaltlich auf der Verstehen-Page bzw. an Querstellen verankert.» Eine Ergänzung darf das Versalziffer-Trio nicht überfrachten.

### Optionen

- **Option A — Zeitangabe in 50%-Zelle ergänzen**: aus «erreichen eine umfassendere Genesung mit funktioneller Stabilität» wird «erreichen **innerhalb von etwa 10 Jahren** eine umfassendere Genesung mit funktioneller Stabilität». Identische Lesart wie 85-93%-Zelle und Glossar. Kleinste Änderung, höchster Konsistenz-Gewinn.
- **Option B — Zeitangabe in beiden Zellen löschen, stattdessen einen Über-/Unter-Satz für das ganze Trio**: «Die folgenden Angaben beziehen sich auf einen Beobachtungs-Zeitraum von etwa 10 Jahren.» Vorteil: Versalziffer-Block bleibt visuell rein; Nachteil: aktueller 85-93%-Wortlaut hat die Zeit bereits drin und müsste umgeschrieben werden.

**Empfehlung der Inventur:** A — minimal-invasiv, exakt das Audit-Finding.

---

## §4 — DSM-5-Kriterien (P2-8)

### Inventur

- `Verstehen.tsx` Z. 244-298: aktuelle Sektion «Was Borderline im Kern so belastend macht» beschreibt das Störungsbild (emotionale Reagibilität, Beziehungserleben, Bindungsstress), **listet aber die 9 DSM-5-Kriterien nicht auf**. Brief-Entscheidung dokumentiert: «kein Etikett-Framing» (im Audit als bekannte Begründung erwähnt).
- `Glossar.tsx` Z. 47 (Eintrag Borderline-Persönlichkeitsstörung): «Klassifiziert im DSM-5 als eigenständige Persönlichkeitsstörung und im ICD-11 als ‹Borderline-Muster› (Code 6D11.5).» — Klassifikation, keine Kriterien.
- `Diagnostik.tsx` Z. 64-72 (Wie wird die Diagnose gestellt): «Verfahren wie SCID-5-PD oder IPDE prüfen die Kriterien systematisch» und «Zuordnung nach ICD-11 oder DSM-5-TR (mehrere Merkmale aus einer Liste, in der Regel über längere Zeit erfüllt)». Nennt das Diagnose-Verfahren, aber ohne 9-Kriterien-Liste.
- `Diagnostik.tsx` Z. 342-347 (Quellen): DSM-5-TR und SCID-5-PD verlinkt.

### Spannungsfeld

Audit P2-8 nennt explizit: «Sicherstellen, dass die Brief-Entscheidung ‹kein Etikett-Framing› nicht verletzt wird — Lösung über Auf-/Zuklappen.» Es geht also nicht um «Kriterien fehlen», sondern um «Kriterien sollten optional erreichbar sein, ohne dass sie das Framing dominieren».

### Optionen

- **Option A — Aufklapp-Block in `/verstehen`**: nach «Was Borderline im Kern so belastend macht» ein Details/Summary-Element «Diagnostische Kriterien (DSM-5/ICD-11) — als Referenz, nicht als Selbst-Diagnose-Werkzeug». Inhalt: 9-Kriterien-Liste plus 1-Satz-Hinweis «mindestens 5 von 9 müssen über längeren Zeitraum erfüllt sein»; visueller Kontrast (zurückhaltend, kleinerer Text).
- **Option B — Block im neuen BPS-Glossar-Eintrag**: Glossar.tsx Z. 47 um eine optionale aufklappbare Liste erweitern. Vorteil: passt zu Glossar als Nachschlage-Werkzeug; Nachteil: Glossar ist aktuell sehr dezent strukturiert (kein Aufklapp-Mechanismus etabliert).
- **Option C — Eigene Sektion auf `/diagnostik`**: nach «Wie wird die Diagnose gestellt» (Z. 64-72) einen Block «Diagnostische Kriterien (DSM-5)» — als Referenz. Vorteil: thematisch genau richtig — wer Diagnostik liest, will dieses Detail; Nachteil: Diagnostik-Page ist neu und sollte nicht direkt erweitert werden, ohne ihren Brief-Skopus zu prüfen.
- **Option D — Verzicht**: Audit-Diagnose annehmen («wäre vollständig»), aber Brief-Entscheidung «kein Etikett-Framing» höher gewichten. Begründung dokumentieren in Decisions, Punkt schliessen.

**Empfehlung der Inventur:** offen — Option D ist defensibel angesichts der bestehenden Brief-Linie. Option A ist die thematisch am besten austarierte Variante (Reference, nicht Promo). Option C wäre nur sinnvoll, wenn Diagnostik ohnehin nochmal angefasst wird.

---

## §5 — Selbsttest Frage 3 (P2-9)

### Inventur verifiziert

`client/src/components/Selbsttest.tsx` Z. 137-163, Frage `id: 3`:

```
Text: "Wie lange begleiten Sie Ihren Angehörigen schon?"
Options:
  - "Die Diagnose ist neu (unter 6 Monate)"      value: neu
  - "Seit einiger Zeit (6 Monate bis 2 Jahre)"  value: mittel
  - "Schon lange (über 2 Jahre)"                 value: lang
  - "Keine offizielle Diagnose, aber ich vermute Borderline"   value: vermutung
```

**Diagnose des Audits stimmt:** Option `vermutung` antwortet auf eine andere Dimension als die drei Zeit-Optionen. Wer 5 Jahre begleitet **und** keine Diagnose hat, kann nur eine Antwort wählen.

### Weight-Ausstrahlung

Jede Option setzt ein anderes Empfehlungs-Profil (`weight`-Objekte). Aufteilen in zwei Fragen würde bedeuten:

- Die Bucket-Logik (`verstehen`, `unterstuetzen`, `kommunizieren`, `grenzen`, `selbstfuersorge`) muss neu auf zwei Fragen verteilt werden.
- Die Resultats-Auswertung in `Selbsttest.tsx` (irgendwo unten) liest summierte Weights; Aufteilung ändert die Mathematik proportional.

### Optionen

- **Option A — Audit-Empfehlung 1:1**: Frage 3 in 3a (Zeit) + 3b (Diagnose-Status) splitten. Selbsttest hat dann **8 statt 7 Fragen**. Weights neu vergeben: 3a (Zeit) → primär `verstehen`/`unterstuetzen`/`selbstfuersorge`-Variation; 3b (Diagnose) → primär `verstehen`-Boost bei «Vermutung».
- **Option B — Frage 3 umformulieren ohne Splitting**: Optionen behalten, aber Text ändern: «Wo stehen Sie aktuell?» mit 4 Lebenssituations-Optionen; die Misch-Dimension wird offen kommuniziert statt versteckt.
- **Option C — Vierte Option entfernen**: «Keine offizielle Diagnose…» rausnehmen, weil sie ohnehin in Frage 1 bzw. später adressiert ist. Risiko: verliert eine wichtige Selbsttest-Eingangstür für Angehörige in Vor-Diagnose-Phase (genau die Zielgruppe der Diagnostik-Seite).
- **Option D — Status quo, Cross-Link nachschärfen**: Nichts ändern, aber im Result-Bucket «verstehen» bei `vermutung`-Selektion einen Cross-Link auf `/diagnostik` setzen. Audit-Diagnose bleibt unbearbeitet, aber das Folge-Problem (was tue ich mit der Vermutung?) ist gelöst.

**Hinweis zur Quervernetzung:** Cluster 3 (Diagnostik PR #327) hat im Result-Bucket «verstehen» bereits einen Cross-Link auf `/diagnostik` ergänzt — Option D ist also bereits teilweise implementiert. Das schwächt die Dringlichkeit von A.

**Empfehlung der Inventur:** offen — A ist methodisch sauber, aber teurer (Selbsttest-Mechanik anfassen). D ist redaktionell vertretbar, weil ein Mismatch zwischen Frage und Antwort-Optionen kein fachlicher Fehler ist, nur eine konzeptuelle Unsauberkeit.

---

## §6 — Sprachregelung «erkrankt» / «betroffen» (P2-10)

### Inventur quantitativ (gegen HEAD `7efc634`)

Reine Wort-Counts, ohne Berücksichtigung von Mehrfach-Vorkommen pro Datei:

| Begriff                              | Vorkommen Pages                                | Auffälligkeit              |
| ------------------------------------ | ---------------------------------------------- | -------------------------- |
| `betroffene Person` (oder Flexionen) | 10 Stellen                                     | Default-Form               |
| `erkrankte Person`                   | 5 Stellen — Diagnostik (4×), Home (1×)         | konzentriert auf neue Page |
| `Borderline-Person`                  | 0                                              | nicht verwendet            |
| `Patient` (Stamm)                    | 13 Stellen, davon mehrheitlich therapiebezogen | siehe Auflistung unten     |

### Stellen-Auflistung «erkrankte Person» (alle 5)

- `Diagnostik.tsx:105` — «Beratung für Angehörige läuft unabhängig davon, ob die erkrankte Person schon in Behandlung ist»
- `Diagnostik.tsx:424` — Frage-Titel «Was, wenn die erkrankte Person die Diagnose ablehnt?»
- `Diagnostik.tsx:430` — «Wenn die erkrankte Person die Diagnose ablehnt, ist das eine häufige Reaktion»
- `Diagnostik.tsx:747` — «erkrankte Person bereits in Behandlung ist»
- `Home.tsx:204` — «erkrankte Person. Orientierung, Gespräch und Materialien für»

### Stellen «Patient» (gefiltert auf relevant)

| Datei:Zeile                                                | Kontext                                                                                                                              |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `Begleiterkrankungen.tsx:71`                               | «bei Patient:innen mit traumatischer Vorgeschichte» — fachsprachlich, Studienkontext                                                 |
| `Begleiterkrankungen.tsx:224, 255`                         | «der Borderline-Patient:innen mindestens eine depressive Episode» — Studienkontext                                                   |
| `FAQ.tsx:239`                                              | «Passung zwischen Therapeut und Patient» — Therapie-Beziehung                                                                        |
| `Glossar.tsx:95, 97`                                       | TFP-Eintrag, «Patient:in», «Patientin» — Therapie-Kontext                                                                            |
| `UnterstuetzenTherapie.tsx:62, 134, 374, 382`              | Therapie-Beziehung                                                                                                                   |
| `Verstehen.tsx:281`, `UeberUns.tsx:259`, `Quellen.tsx:201` | Quellenangabe «Treatment of Patients With Borderline Personality Disorder» (APA-Titel — Eigenbezeichnung der Quelle, nicht änderbar) |

### Beobachtungen

1. **«betroffene Person» ist faktisch der Default** (10 Stellen) — die Site folgt schon einer Linie, nur ohne dokumentiertes Style-Statement.
2. **«erkrankte Person» konzentriert sich auf Diagnostik** — wo es um Diagnose-Stellung geht, ist «erkrankt» (im Sinne von «mit einer Krankheit klassifiziert») fachlich präzise. Die 5 Stellen sind also nicht zufällig.
3. **«Patient:in»** wird ausschliesslich in **Therapie-Kontexten** und **Studienzitaten** verwendet — beides legitim und nicht durch «betroffene Person» ersetzbar (z.B. wäre «Therapeutin und betroffene Person» semantisch falsch — Therapie hat eine spezifische Rollenbezeichnung).
4. Quellen-/Buchtitel mit «Patients» sind Eigenbezeichnungen und nicht änderbar.

### Optionen für Sprachregelung

- **Option A — Style-Hinweis im Glossar**: neuer Glossar-Eintrag «Sprachregelung Site (intern/redaktionell)» mit kurzer Zusammenfassung der drei Begriffe und ihrem Anwendungsbereich. Vorteil: öffentlich nachvollziehbar; Nachteil: schiebt redaktionelles Innenleben nach aussen.
- **Option B — Nicht-öffentliches Style-Memo**: `_dev/STYLE-SPRACHREGELUNG.md` — interne Konvention. Vorteil: schützt Lesende vor Meta-Inhalten; Nachteil: bei Übersetzungen / Drittautor:innen weniger sichtbar.
- **Option C — Konsistenz-Pass + Memo kombiniert**: Memo (B) + alle 5 «erkrankte Person»-Stellen prüfen, ob sie wirklich fachlich gerechtfertigt sind oder normalisiert werden sollten. Konkrete Kandidaten:
  - `Home.tsx:204` («erkrankte Person» auf der Home — wirkt eher pathologisierend; «betroffene Person» würde besser passen)
  - `Diagnostik.tsx:105, 747` (sehr Beratungs-/Kontaktnah; «betroffene Person» würde besser passen)
  - `Diagnostik.tsx:424, 430` (echtes Diagnose-Ablehnungs-Thema; «erkrankt» fachlich vertretbar)
- **Option D — Status quo bestätigen**: Site folgt bereits einer impliziten Linie; nichts vereinheitlichen, sondern dokumentieren, dass die Mischung absichtlich ist (Therapie-Kontexte → Patient:in; Diagnose-Kontexte → erkrankt; Default → betroffen).

**Empfehlung der Inventur:** B + leichtes C — internes Memo dokumentiert die bereits gelebte Drei-Wege-Linie; eine _kleine_ Überprüfung der 5 «erkrankte Person»-Stellen ist sinnvoll, weil mindestens `Home.tsx:204` editorial wahrscheinlich «betroffene Person» sein sollte.

---

## §7 — Aguirre 2014 → Buchempfehlungen

### Inventur

- `Buchempfehlungen.tsx` Z. 51-204 enthält fünf Kategorien: Partner, Eltern, Kinderbücher, Erfahrungsberichte (sowie eine vorgelagerte erste Kategorie für Partner ab Z. 51).
- Kategorie «Eltern» Z. 106-149: enthält Trasselli (DBT-Familienskills), Bohus & Wolf-Arehult, Rahn, Psychiatrie-Verlag — alle deutschsprachig.
- **Aguirre, B. A. (2014) — _Borderline Personality Disorder in Adolescents (2nd Ed.)_** ist nirgendwo verlinkt oder zitiert (auch nicht in `Quellen.tsx`).

### Eigenschaften des Buchs (vom Audit als «sehr angehörigen-orientiert» eingestuft)

- Englischsprachig (zweite Auflage 2014; Verlag Fair Winds Press)
- Fokus: BPS bei Jugendlichen, Eltern-Perspektive
- Aguirre leitet das «Adolescent DBT Program» am McLean Hospital (Zanarini-Standort) — fachlich gewichtig
- Ergänzend zum dort bereits gelisteten Trasselli (DBT-Familienskills) — selbe Therapietradition (DBT), andere Lebensphase (Jugendliche)

### Optionen

- **Option A — Zur Kategorie «Eltern» hinzufügen**: passend zur Subtitle «Wenn Ihr Kind (Jugendliche oder Erwachsene) betroffen ist». Vorteil: thematisch korrekt, klarer Mehrwert.
- **Option B — Eigene Unterkategorie «Englischsprachige Standardwerke»**: niederschwellig signalisieren, dass Englisch erwartet wird. Vorteil: setzt Erwartungs-Honesty; Nachteil: bricht die bestehende Strukturlogik (Lebensrolle als primäres Ordnungskriterium).
- **Option C — Verzicht**: Buchempfehlungen-Page hält sich an «überwiegend deutschsprachig» (alle 18 aktuellen Einträge); Aguirre nicht aufnehmen.

**Empfehlung der Inventur:** A — mit Sprach-Hinweis im `description`-Feld («Englischsprachiges Standardwerk zu BPS bei Jugendlichen»). Aguirre ist im internationalen Kontext eine der zentralen Adoleszenz-Quellen und füllt eine echte Lücke in der Eltern-Kategorie.

---

## §8 — Architektur / Sitzungs-Vorschlag

Cluster 4 hat **niedrige Priorität**; die sechs Punkte sind heterogen (Mythen-Sektion ist stoffintensiv, Recovery-Zeit ist ein Wort-Edit). Drei Sitzungs-Modelle:

- **Sitzungs-Modell I — Eine grosse Sitzung «Cluster 4 komplett»**: alle 6 Punkte plus Aguirre in einem PR. Vorteil: ein klarer Abschluss; Nachteil: heterogen, schwerer reviewbar.
- **Sitzungs-Modell II — Zwei Sitzungen, gruppiert nach Aufwand**:
  - **Sitzung 1 (klein)**: Recovery-Zeit (§3), Aguirre-Buch (§7), Sprachregelung-Memo (§6 Option B), evtl. Geschlechterverteilung Mini-Variante (§2 Option A oder B).
  - **Sitzung 2 (gross)**: Mythen-Sektion (§1), DSM-5-Kriterien (§4), Selbsttest Frage 3 (§5).
- **Sitzungs-Modell III — Drei Sitzungen, gruppiert nach Thema**:
  - **Sitzung A — Konsistenz**: Recovery-Zeit (§3), Sprachregelung (§6).
  - **Sitzung B — Edukation**: Mythen-Sektion (§1) + Geschlechterverteilung (§2) — verschränkt; DSM-5-Kriterien (§4); Aguirre (§7).
  - **Sitzung C — Selbsttest**: Frage 3 (§5).

**Empfehlung der Inventur:** Modell II. Sitzung 1 ist niedrige Hängefrucht (~30 Minuten Implementation), Sitzung 2 ist die eigentliche Editorial-Arbeit.

---

## §9 — Christa-Rückfragen

Bitte für **jede Frage** kurz eine Antwort. Ich brauche keine Begründungen, ein Tipp reicht.

### Zu §1 — Mythen-Sektion (P2-1)

1. **Architektur**: Option A (Sektion auf Verstehen-Page), B (eigene `/mythen`-Page), C (FAQ-Kategorie) oder D (Status quo)?
2. **Falls A oder B**: Welche Mythen aufnehmen? (Vorschlag des Audits: Behandelbarkeit, Manipulationsvorwurf, Trauma/PTBS, Suizid-Direktansprache, Geschlecht). Ergänzungen / Streichungen?
3. **Falls B (eigene Page)**: Sub-Nav-Eintrag in welcher Gruppe? (Wahrscheinlich «Wissen & Materialien».)

### Zu §2 — Geschlechterverteilung (P2-2)

4. Option A (Verstehen-Satz), B (Glossar-Satz), C (FAQ-Frage), oder D (mit Mythen-Sektion verschränkt)?
5. Wenn A oder C: Wortlaut-Linie eher «Borderline kommt bei allen Geschlechtern vor — klinisch werden Frauen häufiger diagnostiziert» (kurz, neutral) **oder** ausführlicher mit NESARC-Bezug?

### Zu §3 — Recovery-Zeit (P2-3)

6. Option A (Zeit in 50%-Zelle ergänzen) oder B (Über-/Unter-Satz für ganzes Trio)?

### Zu §4 — DSM-5-Kriterien (P2-8)

7. Option A (Aufklapp-Block auf Verstehen), B (Glossar-Aufklapp), C (Diagnostik-Sektion) oder D (Verzicht mit dokumentierter Begründung)?
8. **Falls A, B oder C**: Soll die Liste aus den 9 DSM-5-Kriterien (5-Schwelle) oder aus den ICD-11-«Borderline-Muster»-Merkmalen bestehen — oder beides?

### Zu §5 — Selbsttest Frage 3 (P2-9)

9. Option A (Splitting in 3a/3b), B (Frage umformulieren), C (vierte Option entfernen) oder D (Status quo, kein Edit)?
10. Falls A: ist der zusätzliche Frage-Schritt (8 statt 7 Fragen) für die UX akzeptabel?

### Zu §6 — Sprachregelung (P2-10)

11. Option A (öffentlicher Glossar-Eintrag), B (`_dev/STYLE-SPRACHREGELUNG.md`-Memo), C (Memo + Konsistenz-Pass mit Korrektur ausgewählter Stellen), oder D (Status-quo dokumentieren)?
12. Falls C: Soll insbesondere `Home.tsx:204` («erkrankte Person») auf «betroffene Person» normalisiert werden?

### Zu §7 — Aguirre 2014 (Buchempfehlungen)

13. Option A (Eltern-Kategorie), B (eigene Unterkategorie englisch), oder C (Verzicht)?
14. Falls A: Soll das Buch als `highlight: true` markiert werden (wie Trasselli in derselben Kategorie)?
15. **Quellen-Page**: zusätzlich auch in `Quellen.tsx` als Eintrag aufnehmen (analog zu Mason & Kreger als sowohl Buchempfehlung **und** Quellen-Eintrag)?

### Zu §8 — Sitzungs-Modell

16. Sitzungs-Modell I (eine grosse), II (zwei nach Aufwand), oder III (drei nach Thema)?

---

**Nächster Schritt:** Sobald deine Antworten da sind, fasse ich sie in `_dev/CLUSTER-4-DECISIONS-2026-04-30.md` zusammen, baue die jeweiligen Briefs für Sitzung 1 (und 2) und starte die Implementation. Das Decisions-Dokument wird dann von dir final bestätigt, bevor irgendein Code-Edit folgt.
