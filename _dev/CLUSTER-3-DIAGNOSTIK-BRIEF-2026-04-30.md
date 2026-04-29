# Cluster-3-Brief – Diagnostik

**Datum:** 30. April 2026 (Mittwoch, später Vormittag)
**Audit-Referenz:** `_dev/AUDIT-CONTENT-QUALITY-2026-04-28.md`
**Backlog-Referenz:** `_dev/IDEAS-FUTURE.md`, Sektion «Content-Audit 2026-04-28 – Folge-Aufgaben», Cluster 3
**Scope:** Eine eigene Inhalts-Strecke zum Diagnostik-Prozess bei Borderline-Persönlichkeitsstörung – wer, wie, wo, was bedeutet das für Angehörige.

---

## 1. Strategischer Rahmen

### 1.1 Audit-Befund

Im Content-Audit vom 28. April 2026 als P1-Lücke identifiziert: «Diagnostik-Prozess (wer stellt wie eine Diagnose?) fehlt». Die Site erklärt ausführlich, _was_ Borderline ist, und _welche Therapien_ es gibt – aber der Schritt dazwischen, nämlich _wie eine Diagnose entsteht_, fehlt.

### 1.2 Warum das wichtig ist

Angehörige wenden sich oft an die Fachstelle in einem Stadium, in dem die Diagnose entweder noch nicht gestellt ist (sie vermuten Borderline, sind unsicher), gerade gestellt wurde (Schock, Fragen zum Verfahren), oder von der erkrankten Person abgelehnt wird (Konflikt um Diagnose-Wert). Alle drei Situationen brauchen Orientierung über den Diagnostik-Prozess. Die aktuelle Site lässt diese Gruppe ohne Antwort.

### 1.3 Was übertragen wird

- Eine eigene Inhalts-Sektion oder -Seite zum Diagnostik-Prozess.
- Klärung: wer ist diagnostisch befugt (Psychiater:innen, klinische Psycholog:innen mit entsprechender Qualifikation)?
- Klärung: wie verläuft der Diagnostik-Prozess (Anamnese, strukturierte Interviews wie SCID-5-PD oder IPDE, Differenzialdiagnostik, Verlaufsbeobachtung)?
- Klärung: wo geschieht das in der Schweiz (ambulant, stationär, Spezialambulanzen)?
- Spezifisch für Angehörige: was bedeutet eine Diagnose-Stellung für sie, was nicht? Was, wenn die erkrankte Person die Diagnose ablehnt?

### 1.4 Was NICHT in diesem Brief ist

- **Komorbidität** (separater Brief, danach – die ~80% Depression-Rate ist eigene Inhalts-Strecke).
- **Selbstdiagnose-Anleitung** – wir liefern _keine_ Anleitung, wie Angehörige selbst diagnostizieren oder wie sie eine erkrankte Person zur Diagnose drängen. Selbsttest auf der Site (`SelbsttestPage.tsx`) ist ein Orientierungs-Tool, kein Diagnose-Ersatz – diese Trennung muss gewahrt bleiben.
- **Diagnose-Kritik / Abolitionismus** – die fachliche Debatte über Persönlichkeitsstörungs-Diagnostik (z. B. ICD-11-Reform, Pathologisierungs-Kritik) gehört nicht in dieses psychoedukative Format. Falls Bezug nötig: kurz, neutral, nicht ideologisch.

### 1.5 Rote Linie

Inhalte werden nicht erfunden. Aussagen zur Diagnostik müssen durch Fachliteratur (DSM-5-TR, ICD-11, APA Guideline 2024, einschlägige Lehrbücher) abgesichert sein. Aussagen zur Schweizer Versorgungsrealität – wer macht was wo – brauchen entweder eine vertrauenswürdige Quelle oder Christas eigene Fachexpertise als PUK-Mitarbeiterin.

---

## 2. Inhaltliche Bausteine

Ich entwerfe hier, _was_ die Inhalts-Strecke abdecken sollte. _Wie_ (eigene Seite vs. Section auf bestehender Seite) klärt das Mapping.

### 2.1 «Wer stellt eine Borderline-Diagnose?»

- Psychiater:innen (FMH-Anerkennung Psychiatrie und Psychotherapie).
- Klinische Psycholog:innen mit Berufsausübungsbewilligung Psychotherapie und entsprechender klinischer Qualifikation.
- Hausärzt:innen oder andere Fachärzt:innen können den Verdacht äussern und überweisen, stellen die Diagnose aber in der Regel nicht selbst.
- In der Schweiz: ambulant in Praxen, in Polikliniken, an Spezialambulanzen (z. B. PUK Zürich Borderline-Sprechstunde).

### 2.2 «Wie läuft eine Diagnostik ab?»

- Anamnese (Lebensgeschichte, aktuelle Beschwerden, Beziehungsmuster).
- Strukturierte oder halbstrukturierte Interviews: SCID-5-PD (Structured Clinical Interview for DSM-5 Personality Disorders), IPDE (International Personality Disorder Examination).
- DSM-5-TR-Kriterien (9 Kriterien, mindestens 5 müssen erfüllt sein) oder ICD-11 «Borderline-Muster» (6D11.5 als Qualifikator zur Persönlichkeitsstörung 6D10).
- Differenzialdiagnostik: Abgrenzung gegen andere Persönlichkeitsstörungen, affektive Störungen (besonders Bipolar), PTBS, ADHS, dissoziative Störungen.
- Verlaufsbeobachtung: Diagnose oft nicht in einem Termin gestellt, sondern über mehrere Sitzungen.
- Ergebnis-Mitteilung: in der Regel im Gespräch, mit Erklärung was die Diagnose bedeutet und welche Behandlungs-Optionen bestehen.

### 2.3 «Was bedeutet die Diagnose für Sie als Angehörige?»

- Diagnose ist _kein_ Etikett, sondern eine Behandlungs-Eintrittskarte.
- Sie verändert oft das Verständnis: «es ist nicht Charakter, sondern eine Erkrankung mit Verlaufsmuster».
- Sie öffnet Zugang zu evidenzbasierter Therapie (DBT, MBT, Schematherapie, TFP).
- Sie ist nicht dauerhaft fixiert: Recovery ist möglich (Verweis auf bestehende Genesung-Inhalte).
- Wichtige Differenzierung: Eine Diagnose hilft _nicht_ automatisch der Beziehung. Manche Angehörige hoffen, dass die Diagnose «alles erklärt» – das ist eine zu hohe Erwartung.

### 2.4 «Was, wenn die erkrankte Person die Diagnose ablehnt?»

- Häufige Reaktion, kein Versagen.
- Mögliche Gründe: Stigma, Scham, Angst vor «Etikettierung», Misstrauen gegenüber Psychiatrie.
- Was Angehörige _nicht_ tun sollten: drängen, beweisen, mit der Diagnose argumentieren in Konflikten.
- Was Angehörige tun können: für sich selbst die Diagnose als Orientierung nutzen, Beratung der Fachstelle in Anspruch nehmen, geduldig bleiben.
- Klare Grenze: bei akuter Gefahr (Suizidalität, Selbstverletzung, Fremdgefährdung) ist die Diagnose-Frage nachrangig – dann zählt die Soforthilfe.

### 2.5 «Bin ich auch betroffen?» – die Selbstreflexions-Frage

- Manche Angehörige fragen sich nach langer Belastung, ob sie selbst eine psychische Erkrankung entwickelt haben.
- Verweis auf bestehende Selbstfürsorge-Inhalte und Hinweis auf eigene Beratung/Therapie als legitime Option.
- _Keine_ Selbstdiagnose-Anleitung.

### 2.6 «Was, wenn die Diagnose noch nicht gestellt ist, aber wir vermuten es?»

- Hinweis: Selbsttest auf der Site (`/selbsttest`) ist Orientierungshilfe für Angehörige, kein Diagnose-Werkzeug für die erkrankte Person.
- Schritte: Hausärzt:in ansprechen, Überweisung an Psychiater:in/Psycholog:in mit Borderline-Erfahrung, ggf. PUK-Borderline-Sprechstunde anfragen.
- Hinweis auf Fachstelle Angehörigenarbeit: Beratung _unabhängig_ davon, ob die erkrankte Person bereits in Behandlung ist.

---

## 3. Architektur-Frage – im Mapping zu klären

Drei Optionen, wie die Inhalts-Strecke in der Site verankert werden kann:

**Option A – Eigene Seite `/diagnostik`:**

- Vorteil: prominent platziert, vollständig adressierbar, eigene Route.
- Nachteil: Site hat schon 27 Seiten, weitere Seite erhöht Navigation-Komplexität.
- Verweis-Logik: aus Verstehen, FAQ, Wegweiser anlinken.

**Option B – Section auf der Verstehen-Seite:**

- Vorteil: thematisch wo es hingehört, Verstehen-Seite ist eh die «was ist Borderline»-Seite.
- Nachteil: Verstehen-Seite ist mit 617 Zeilen schon umfangreich, Erweiterung könnte sie überladen.
- Risiko: Diagnostik-Inhalt wird in Verstehen-Fluss «versenkt» und nicht direkt findbar.

**Option C – Eigenes FAQ-Cluster mit mehreren Fragen:**

- Vorteil: niedrigschwellig, suchbar, ergänzt bestehende FAQ-Struktur.
- Nachteil: weniger zusammenhängend, schwieriger als Lesefluss zu konsumieren.

**Option D – Hybrid: kurze Section auf Verstehen + ausführliche eigene Seite mit Cross-Links:**

- Vorteil: niedrigschwellig im Lesefluss + tiefes Material verfügbar für die, die es brauchen.
- Nachteil: doppelte Pflegearbeit, Konsistenz muss gewahrt werden.

Christa-Entscheidung im Mapping nötig.

---

## 4. Verifikations-Kriterien

Jeder Implementations-Schritt muss vor Merge folgendes erfüllen:

1. **Fachliche Korrektheit:** Aussagen zu Diagnostik-Verfahren durch DSM-5-TR / ICD-11 / APA Guideline 2024 abgesichert. Aussagen zur Schweizer Versorgungsrealität durch Christas Fachexpertise oder Verweis auf offizielle Quellen (FMH, BAG).
2. **Tonalität:** Die im Audit gewürdigte redaktionelle Stimme erhalten – nicht klinisch, nicht banalisierend, würdevoll.
3. **Anti-Drängen-Haltung:** Keine Formulierung, die Angehörige zur «Diagnose-Durchsetzung» verleiten könnte.
4. **Konsistenz mit Bestehendem:** Keine Widersprüche zu Verstehen, Genesung, Wegweiser, FAQ. Kreuzlinks korrekt.
5. **Schweizer Standard-Orthografie:** ss statt ß.
6. **Test-Suite grün:** `pnpm typecheck`, `pnpm test`, `pnpm lint`, `pnpm build`.
7. **Visual-Diff:** Auf Mobile und Desktop, mindestens drei Seiten (neue Diagnostik-Strecke + zwei verlinkte Seiten).

---

## 5. Phasen-Plan

| Phase | Inhalt                                                                         | Status |
| ----- | ------------------------------------------------------------------------------ | ------ |
| **0** | Inventar + Mapping (kein Code-Change) – inkl. Architektur-Entscheidung A/B/C/D | offen  |
| **1** | Implementation der gewählten Architektur                                       | offen  |
| **2** | Quellen ergänzen (falls neue Werke nötig – APA Guideline 2024 ist schon drin)  | offen  |
| **3** | Verifikation und Release                                                       | offen  |

**Phase 0 wird Christa wieder mehrere Rückfragen stellen** – mindestens zur Architektur-Entscheidung und zu Schweizer Versorgungsrealität. Das ist erwartet, nicht ein Effizienzproblem.
