# Cluster-1-Brief – Quellen- und Konsistenz-Audit

**Datum:** 30. April 2026 (Mittwoch)
**Audit-Referenz:** `_dev/AUDIT-CONTENT-QUALITY-2026-04-28.md`
**Backlog-Referenz:** `_dev/IDEAS-FUTURE.md`, Sektion «Content-Audit 2026-04-28 – Folge-Aufgaben», Cluster 1
**Scope:** Redaktionelle Konsistenzarbeit – fünf Findings, die zusammen einen kohärenten Arbeitsblock bilden.

---

## 1. Strategischer Rahmen

### 1.1 Was übertragen wird

- Konsistenz zwischen Inline-Zitaten (in Body-Text der Seiten) und Quellen-Page.
- Konsistenz zwischen Seiten zu derselben Therapieform (TFP-Sync FAQ vs. Therapie-Page).
- Aktualität der MBT-Information.
- Aufräumen toter und widersprüchlicher Routen.
- Glossar-Vervollständigung um zentralen Begriff (BPS).

### 1.2 Was NICHT in diesem Cluster ist

- **Soforthilfe-Erweiterungen** (Cluster 2 – eigene Sitzung mit Sorgfaltspflicht).
- **Inhaltliche Erweiterungen** (Cluster 3 – Komorbidität, Diagnostik, Geografie, jeweils eigene Brief-Mapping-Projekte).
- **Polish/Feinschliff-Punkte** (Cluster 4 – Mythen-Sektion, Geschlechterverteilung, Sprachregelung).
- **Aguirre/Paris ergänzen** war ursprünglich Cluster 1, P2 – wird in diesem Brief mit aufgenommen, weil es zur Quellen-Konsistenz-Arbeit gehört und keinen Mehraufwand bedeutet.

### 1.3 Rote Linie

Inhalte werden **nicht erfunden**. Ergänzt wird nur, was in vorhandenen Quellen verifizierbar belegt ist. Bei Unsicherheit gilt: lieber Lücke dokumentieren als Halluzination committen. Falls Claude Code beim Bearbeiten an einen Punkt kommt, wo eine inhaltliche Aussage nicht durch vorhandene Quellen abgesichert ist, stoppt es und fragt zurück.

---

## 2. Findings im Detail

### 2.1 Finding P1-1 – Quellen-Page vs. Inline-Zitate inkonsistent

**Zustand:** Im Audit identifiziert: APA 2024, Storebø 2020, Gunderson 2011 werden im Body-Text mehrerer Seiten zitiert (oder thematisch referenziert), erscheinen aber nicht in der Quellen-Page (`Quellen.tsx`).

**Was zu tun ist:**

1. Vollständiges Inventar aller Inline-Zitate über alle Seiten (`grep` nach typischen Markern: `et al.`, `(20\d\d)`, Autorennamen).
2. Abgleich mit der bestehenden Quellen-Liste in `Quellen.tsx`.
3. Fehlende Quellen ergänzen, mit Beleg in welcher Seite/welchem Abschnitt sie zitiert werden.
4. Bei jeder Quelle prüfen: ist die bibliografische Angabe vollständig (Autor:innen, Jahr, Titel, Journal/Verlag, ggf. DOI)? Falls Lückenhaftigkeit: dokumentieren statt erfinden.

**Quellen, die mindestens ergänzt werden müssen:**

- APA 2024 (vermutlich DSM-5-TR oder eine APA-Leitlinie 2024)
- Storebø 2020 (vermutlich Cochrane-Review zu Borderline-Therapien, OJ Storebø et al.)
- Gunderson 2011 (vermutlich JG Gunderson, Borderline-Persönlichkeitsstörung – Übersichtsarbeit oder Buch)

Bevor diese drei in die Quellen-Liste aufgenommen werden, müssen die exakten Inline-Stellen gefunden und ihre genaue Aussage geprüft werden – damit die bibliografische Angabe zur tatsächlich getroffenen Aussage passt.

### 2.2 Finding P2-4 / P2-5 – Aguirre und Paris fehlen in der Quellen-Liste

**Zustand:** Bei den Polish-Findings notiert; gehört aber thematisch in die Quellen-Konsistenz.

**Was zu tun ist:**

1. Prüfen, ob Aguirre (vermutlich BA Aguirre, Borderline bei Jugendlichen) und Paris (vermutlich J Paris, Verlaufsforschung) im Body-Text der Site bereits referenziert sind, und falls ja, in welcher Form.
2. Falls referenziert: ergänzen wie unter 2.1.
3. Falls _nicht_ referenziert, aber als Standardquellen für das Themenfeld gelten: in einem eigenen Reflexions-Schritt entscheiden, ob sie _zusätzlich_ als weiterführende Literatur in die Quellen-Page aufgenommen werden sollten – das ist redaktionelle Erweiterung, keine reine Konsistenzarbeit, und braucht eine bewusste Entscheidung.

### 2.3 Finding P1-3 – TFP-Erwähnung inkonsistent

**Zustand:** Im Audit identifiziert: TFP (transference-focused psychotherapy / Übertragungsfokussierte Psychotherapie) wird in der FAQ erwähnt, fehlt aber in der Therapie-Page (`UnterstuetzenTherapie.tsx`), die DBT/MBT/Schematherapie auflistet.

**Was zu tun ist:**

1. Finden, wo genau TFP in der FAQ erwähnt wird (welche Frage, in welchem Wortlaut).
2. Entscheiden – das braucht deine Rückfrage:
   - **Variante A:** TFP in die Therapie-Page als vierte evidenzbasierte Therapieform aufnehmen (DBT/MBT/Schematherapie/TFP).
   - **Variante B:** TFP-Erwähnung aus der FAQ entfernen, weil sie in der Schweizer Versorgungsrealität für Angehörige weniger zugänglich ist als die anderen drei.
   - **Variante C:** TFP in der FAQ als «zusätzliche, weniger verbreitete Option» behalten, aber explizit so framen, dass kein Erwartungsanspruch entsteht.
3. Welche Variante: Christa entscheidet im Phase-1-Schritt.

### 2.4 Finding P2 – MBT-Aktualität

**Zustand:** Im Audit notiert; konkrete Aktualisierungs-Punkte sind nicht im Kurzfazit benannt.

**Was zu tun ist:**

1. Im Volltext-Audit (`AUDIT-CONTENT-QUALITY-2026-04-28.md`) nachlesen, was genau zu MBT als veraltet markiert wurde.
2. Falls dort spezifische Aussagen genannt sind: Aktualisierungsvorschlag erarbeiten (Stand der Forschung 2024/2025: Bateman & Fonagy weitergeführt, MBT-G/MBT-A Differenzierungen etc.).
3. Falls nur generisch «Aktualität» moniert wurde: zurück an Christa mit konkreter Frage, welche Aussage zur Disposition steht.

### 2.5 Finding P1-9 – Tote / widersprüchliche FAQ-Routen

**Zustand:** Im Audit identifiziert: `/uebungen` und `/uebungsszenarien` werden inkonsistent verwendet; eine der beiden Routen ist tot oder verweist falsch.

**Was zu tun ist:**

1. In `app/routes.ts` (oder dem Wouter-Routing-Setup) klären: welche Route existiert wirklich, welche ist tot.
2. Alle Verlinkungen im Code (`grep` nach beiden Strings) auf die kanonische Route umstellen.
3. Falls historisch sinnvoll, einen Redirect von der alten auf die kanonische Route in Netlify-Redirects einrichten.
4. FAQ-Antworten, die auf die falsche Route zeigen, korrigieren.

### 2.6 Finding P1-2 – BPS fehlt im Glossar

**Zustand:** Im Audit identifiziert: «Borderline-Persönlichkeitsstörung» (BPS) – der zentrale Begriff der gesamten Site – ist nicht im Glossar (`Glossar.tsx`) als eigener Eintrag definiert.

**Was zu tun ist:**

1. Glossar-Eintrag für «Borderline-Persönlichkeitsstörung (BPS)» ergänzen.
2. Definition in der Tonalität der bestehenden 21 Glossar-Einträge.
3. Inhaltlich abgesichert: DSM-5-TR-Definition oder ICD-11-Kriterien als Grundlage. Keine Abweichung von der etablierten klinischen Definition.
4. Falls in einer der bestehenden Seiten bereits eine «kompakte Definition» existiert (z.B. auf der Verstehen-Seite): den Glossar-Eintrag _konsistent_ dazu formulieren, nicht widersprüchlich.

---

## 3. Reihenfolge / Risiko-Abstufung

| Reihenfolge | Finding                          | Risiko                                                  | Aufwand                                    |
| ----------- | -------------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| 1           | P1-9 Routen aufräumen            | Niedrig (rein technisch, keine Inhaltsfrage)            | 30 Min                                     |
| 2           | P1-2 BPS-Glossar                 | Niedrig (additiv, neuer Eintrag)                        | 20 Min, dann Christa-Review der Definition |
| 3           | P1-1 + P2-4/5 Quellen-Konsistenz | Mittel (Inventar muss vollständig sein, sonst halbgar)  | 1–2 Stunden                                |
| 4           | P1-3 TFP-Sync                    | Mittel (Christa-Entscheidung A/B/C zwischendurch nötig) | 30 Min nach Entscheidung                   |
| 5           | P2 MBT-Aktualität                | Klar erst, nachdem Volltext-Audit genauer gelesen wurde | offen                                      |

**Begründung der Reihenfolge:** Routen aufräumen zuerst, weil reine Tech-Arbeit ohne inhaltliche Risiken. BPS-Glossar danach, weil isolierter additiver Eintrag. Quellen-Konsistenz als Hauptarbeit in der Mitte. TFP und MBT zum Schluss, weil sie inhaltliche Christa-Entscheidungen brauchen.

---

## 4. Verifikations-Kriterien

Jeder Schritt muss vor Merge folgendes erfüllen:

1. **Inhaltliche Korrektheit:** Quellen-Angaben mit DOI oder eindeutigen bibliografischen Daten überprüfbar. Keine erfundenen Aussagen.
2. **Konsistenz:** Begriffe und Aussagen zwischen Seiten stimmig.
3. **Schweizer Standard-Orthografie:** ss statt ß, schweizerische Begriffe wo passend.
4. **Tonalität:** Bestehende redaktionelle Stimme erhalten (laut Audit: «die unterscheidende Stärke»). Neue Texte fühlen sich nicht agentisch oder klinisch an.
5. **Test-Suite grün:** `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build`.
6. **Visual-Diff:** für jede berührte Seite, weil rein redaktionelle Änderungen manchmal Layout-Brüche verursachen, wenn Texte länger werden.

---

## 5. Phasen-Plan

| Phase  | Inhalt                                                          | Status |
| ------ | --------------------------------------------------------------- | ------ |
| **0**  | Inventar + Mapping (kein Code-Change)                           | offen  |
| **1a** | P1-9 Routen aufräumen (eigener Commit)                          | offen  |
| **1b** | P1-2 BPS-Glossar (eigener Commit)                               | offen  |
| **1c** | P1-1 + P2-4/5 Quellen-Konsistenz (eigener Commit)               | offen  |
| **1d** | P1-3 TFP-Sync (eigener Commit, nach Christa-Entscheidung)       | offen  |
| **1e** | P2 MBT-Aktualität (eigener Commit, nach Volltext-Audit-Klärung) | offen  |
| **2**  | Verifikation und Release                                        | offen  |
