# audit/content-sprache

> Historischer Audit-Stand:
> Dieser Bericht beschreibt den Repo- und Produktzustand zum damaligen
> Audit-Zeitpunkt. Einzelne Befunde zu `files.manuscdn.com` sind
> zwischenzeitlich technisch ueberholt und nicht als aktueller
> Produktionsbefund zu lesen. Fuer den aktuellen Stand siehe
> `docs/manus-cdn-audit.md` und `qa/audit-pdf-handouts.md`.

## Meta

- Repo: `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
- Worktree: `/tmp/borderline-content-sprache.weZPwu`
- Branch: `audit/content-sprache`
- Basis: `origin/main`
- Prompt-Sammlung: `/tmp/borderline-content-sprache.weZPwu/qa/codex-audit-prompts.md`
- Zielgruppe: `Angehoerige von Menschen mit Borderline-Persoenlichkeitsstoerung in der Schweiz`

## Status

- Phase 1: abgeschlossen
- Phase 2: abgeschlossen
- Phase 3: abgeschlossen
- Phase 4: abgeschlossen

## Notizen

- Produktcode bleibt in Phase 1 und 2 read-only.
- Audit-Artefakte duerfen unter `qa/` und `qa/scripts/` entstehen.

## Phase 1 - Inventur

### 1.1 Content-Inventar

- Gepruefte Content-Basis: `51` Dateien in `client/src/pages`, `client/src/sections`, `client/src/content`, `client/src/data`
- Verteilung:
  - `pages`: `28` Dateien
  - `sections`: `13` Dateien
  - `content`: `9` Dateien
  - `data`: `1` Datei
- Gesamtumfang laut Zeilenzaehlung: `16_187` Zeilen
- Gesamtumfang laut heuristischer String-Extraktion: ca. `22_367` Woerter
- Auffaellig groesste Textflaechen:
  - `client/src/pages/FAQ.tsx` ca. `1_794` Woerter
  - `client/src/pages/UnterstuetzenKrise.tsx` ca. `1_471` Woerter
  - `client/src/pages/UnterstuetzenAlltag.tsx` ca. `1_426` Woerter
  - `client/src/pages/Soforthilfe.tsx` ca. `1_244` Woerter
  - `client/src/pages/Glossar.tsx` ca. `1_226` Woerter
  - `client/src/pages/Grenzen.tsx` ca. `1_203` Woerter
  - `client/src/pages/UnterstuetzenTherapie.tsx` ca. `1_199` Woerter

#### Vollstaendige Dateiliste

- `client/src/pages`: `Barrierefreiheit.tsx`, `Buchempfehlungen.tsx`, `Datenschutz.tsx`, `FAQ.tsx`, `Fachstelle.tsx`, `Feedback.tsx`, `Genesung.tsx`, `Glossar.tsx`, `Grenzen.tsx`, `Home.tsx`, `Impressum.tsx`, `Kommunizieren.tsx`, `Materialien.tsx`, `Notfallkarte.tsx`, `NotFound.tsx`, `Quellen.tsx`, `Selbstfuersorge.tsx`, `Selbsthilfegruppen.tsx`, `SelbsttestPage.tsx`, `Soforthilfe.tsx`, `UeberUns.tsx`, `Uebungsszenarien.tsx`, `UnterstuetzenAlltag.tsx`, `UnterstuetzenKrise.tsx`, `UnterstuetzenTherapie.tsx`, `UnterstuetzenUebersicht.tsx`, `Verstehen.tsx`, `Wegweiser.tsx`
- `client/src/sections`: `GenesungInfografikenSection.tsx`, `KommunizierenMaterialsSection.tsx`, `KommunizierenPatternSections.tsx`, `MaterialienLibrarySection.tsx`, `SelbstfuersorgeExercisesSection.tsx`, `SelbstfuersorgeInfografikenSection.tsx`, `SelbstfuersorgeRoleNotesSection.tsx`, `SelbstfuersorgeSignalsSection.tsx`, `VerstehenInfografikenSection.tsx`, `VerstehenMaterialsSection.tsx`, `VerstehenSupportSections.tsx`, `unterstuetzen/UnterstuetzenHeroSection.tsx`, `verstehen/VerstehenHeroSection.tsx`
- `client/src/content`: `genesung.ts`, `grenzen.ts`, `kommunizieren.ts`, `materialien.ts`, `searchIndex.ts`, `selbstfuersorge-page.ts`, `selbstfuersorge.ts`, `unterstuetzen.ts`, `verstehen.ts`
- `client/src/data`: `kontakte.ts`

#### Rollen der Content-Traeger

- `pages`: primaere redaktionelle Routen mit Nutzeransprache, Orientierungstexten, FAQ, Glossar, Krisen- und Therapiehilfen
- `sections`: wiederverwendete Textbloecke fuer einzelne Seitenbereiche, oft mit PDF-, Evidenz- oder Uebungsbezug
- `content`: datengetriebene Titel, Beschreibungen, Karten, Materiallisten und Suchindex-Texte
- `data/kontakte.ts`: Schweizer Kontakt-, Telefon- und URL-Daten fuer Versorgungs- und Beratungsseiten

### 1.2 Anrede-Konsistenz

#### Befund

- Die redaktionelle Hauptansprache ist ueber weite Strecken konsistent im formellen `Sie`.
- `Du`/`dich`/`dir` tauchen fast nur in drei erwartbaren Kontexten auf:
  - Beispielsaetze und Dialogsimulationen, z. B. in `client/src/pages/FAQ.tsx`
  - Musterkommunikation und Uebungsszenarien, z. B. in `client/src/pages/UnterstuetzenTherapie.tsx`
  - Glossar- und Erklaerbeispiele, z. B. in `client/src/pages/Glossar.tsx`
- Es gibt keinen harten Wechsel von direkter `Sie`-Ansprache zu redaktioneller `Du`-Ansprache auf einer Seite.

#### Auffaellige Stilbrueche

- Inkonsistent ist nicht die Hoeflichkeitsform, sondern die Gender-/Adressnotation:
  - `Ihre Rolle als Angehoerige/r` in `client/src/content/verstehen.ts:23`
  - `Als Angehoerige/r mit dem Behandlungssystem zusammenarbeiten` in `client/src/pages/UnterstuetzenTherapie.tsx:129`
  - `Er/sie hat eine psychische Erkrankung ...` in `client/src/pages/FAQ.tsx:207`
  - `Sehr geehrte/r Frau/Herr [Name]` und `der/die bei Ihnen in Behandlung ist` in `client/src/pages/UnterstuetzenTherapie.tsx:369` und `client/src/pages/UnterstuetzenTherapie.tsx:371`
- Diese Schreibweisen sind verstaendlich, wirken aber sprachlich weniger ruhig als der restliche redaktionelle Ton.

### 1.3 Fachjargon-Audit

#### Gut abgedeckte Begriffe

- Im Glossar vorhanden und fuer die Zielgruppe brauchbar erklaert:
  - `DBT`, `Skills`, `Mentalisierung`, `Remission`, `Recovery`
  - `Validierung`, `SET-Kommunikation`, `DEARMAN`, `Invalidierung`
  - `Emotionale Dysregulation`, `Splitting`, `Dissoziation`
  - `Co-Abhaengigkeit`, `Enabling`

#### Relevant, aber ungenuegend erklaert oder unverbunden

- `FU` in `client/src/pages/FAQ.tsx:130`
  - Abkuerzung wird direkt eingefuehrt, aber fuer Laien nicht weiter aufgeloest, ausserhalb der Klammer bleibt sie juristisch-fachsprachlich.
- `MBT`, `Schematherapie`, `TFP` in `client/src/pages/FAQ.tsx:178`
  - Die Methoden werden genannt, aber auf der Seite nicht weiter erklaert; im Glossar fehlen mindestens `MBT`, `Schematherapie` und `TFP`.
- `Hypervigilanz` in `client/src/pages/UnterstuetzenKrise.tsx:593`
  - Fachlich korrekt, fuer Angehoerige ohne Vorkenntnisse aber relativ spezialisiert.
- `invalidierendes Umfeld` in `client/src/pages/FAQ.tsx:74`
  - Inhaltlich plausibel, aber ohne Erklaerung fuer Laien schwer greifbar.
- `Parasympathikus` und `Cortisol` in `client/src/pages/Selbstfuersorge.tsx:299-300`
  - hier kippt der Ton kurz in physiologische Fachsprache, ohne dass die Begriffe auf derselben Seite uebersetzt werden.

#### Grenzfaelle

- `Radikale Akzeptanz` in `client/src/pages/Selbstfuersorge.tsx:180`
  - wird inline brauchbar erklaert und ist deshalb kein harter Glossar-Fund, aber eine Verlinkung zum Glossar waere dennoch stimmig.
- `BPS` in `client/src/pages/FAQ.tsx:74`
  - fuer das Themenfeld plausibel, fuer spaeter einsteigende Leserinnen und Leser aber nicht vollkommen selbsterklaerend.

### 1.4 Sprachliche Qualitaet

#### Tonalitaet

- Der Grundton ist warm, entlastend und nicht-behoerdlich.
- Besonders stark sind:
  - Krisen- und Grenzenseiten, weil sie Klarheit mit Mitgefuehl verbinden
  - FAQ und Glossar, weil sie fuer Angehoerige ohne Vorwissen gut lesbar bleiben
- Der Ton passt insgesamt sehr gut zur Zielgruppe `Angehoerige ... in der Schweiz`.

#### Satzlaenge

- Heuristischer Spotcheck auf ausgewaehlten Langformseiten:
  - `FAQ.tsx`: ca. `14.7` Woerter pro Satz
  - `Grenzen.tsx`: ca. `22.7` Woerter pro Satz
  - `UnterstuetzenKrise.tsx`: ca. `33.1` Woerter pro Satz
- Einordnung:
  - `FAQ` ist kompakt und alltagstauglich.
  - `Grenzen` liegt noch im gut lesbaren Bereich.
  - `UnterstuetzenKrise` ist in mehreren Abschnitten deutlich dichter und fuer belastete Leserinnen und Leser eher schwerer zu scannen.

#### Passiv-Anteil

- Heuristischer Spotcheck:
  - `FAQ.tsx`: ca. `9%`
  - `Grenzen.tsx`: ca. `13.5%`
  - `UnterstuetzenKrise.tsx`: ca. `9.1%`
- Der Passivanteil ist insgesamt nicht hoch genug, um die Seiten unpersoenlich wirken zu lassen.
- Wo Passiv vorkommt, dann meist in sachlich-klaren Formulierungen wie `Grenzen werden ... formuliert` oder `wird ... angeordnet`.

#### Nominalstil und Floskeln

- Schwerer Nominalstil ist insgesamt selten.
- Wiederkehrende institutionelle Formeln:
  - `fachlich fundiert`
  - `evidenzbasiert`
  - `praxisnah`
  - `nachhaltige Beziehung`
- Diese Formeln sind noch kein ernstes Qualitaetsproblem, wiederholen sich aber vor allem in `Home.tsx`, `Fachstelle.tsx`, `UeberUns.tsx` und `Impressum.tsx`.

### 1.5 Quellen-Check

#### Starke Stellen

- Gute Quellen- und Review-Signale auf zentralen Fachseiten:
  - `client/src/pages/FAQ.tsx` mit `LastVerifiedBadge` und `EvidenceNote`
  - `client/src/pages/Genesung.tsx` mit `LastVerifiedBadge` und `EvidenceNote`
  - `client/src/pages/Verstehen.tsx` mit `EvidenceNote`
  - `client/src/pages/UeberUns.tsx` mit zwei `EvidenceNote`-Bloecken
  - `client/src/sections/VerstehenSupportSections.tsx` mit `EvidenceNote`
- Die Review-Daten liegen sichtbar in Maerz/April 2026, also aktuell gepflegt.

#### Schwaechere Stellen

- Einzelne starke Aussagen sind an der Stelle selbst nicht ausreichend belegt:
  - `client/src/pages/FAQ.tsx:74`
    - `40-60% Erblichkeit`, `invalidierendes Umfeld` und Traumata werden als konkrete Erklaerungsmatrix genannt, ohne lokalen Quellenhinweis.
  - `client/src/pages/FAQ.tsx:186`
    - `Familientherapie oder Angehoerigensitzungen verbessern nachweislich die Behandlungsergebnisse` ist eine starke Wirksamkeitsaussage; der unten stehende Quellenblock deckt Prognose- und Therapieaussagen allgemein ab, aber nicht sichtbar genau diese Familieninterventions-Aussage.
  - `client/src/pages/Selbstfuersorge.tsx:295-304`
    - hier werden konkrete Studienbehauptungen zu Belastung, Parasympathikus/Cortisol und Burnout-Schutzfaktoren genannt, aber ohne klickbare Quellen oder eigenen Evidenzblock.
- Transparenzspannung:
  - `client/src/pages/UeberUns.tsx:104` sagt `Alle Inhalte basieren auf wissenschaftlicher Forschung ...`
  - `client/src/pages/Impressum.tsx:236-237` formuliert aehnlich breit
  - `client/src/pages/Quellen.tsx:184-186` raeumt gleichzeitig ein, dass nicht alle Aussagen einzeln belegt sind und manches auf klinischer Erfahrung basiert
  - Das ist inhaltlich nicht zwingend falsch, aber kommunikativ noch nicht ganz konsistent.

#### Aktualitaet der Quellen

- Die `Quellen`-Seite mischt aktuelle Leitlinien/WHO-Ressourcen mit aelteren Standardwerken und aelteren empirischen Studien.
- Fuer Grundlagenliteratur ist das normal.
- Fuer headline-faehige empirische Claims sollte aber geprueft werden, ob neben aelteren Kernstudien neuere Reviews oder Leitlinien sichtbarer mitlaufen sollten, z. B. bei:
  - `client/src/pages/Quellen.tsx:13-20`
  - `client/src/pages/Quellen.tsx:33-47`
  - `client/src/pages/Quellen.tsx:117-124`

### 1.6 Link-Rot

#### Umfang

- Erkannt: `103` eindeutige externe URLs
- Davon:
  - `78` Links zu `files.manuscdn.com`
  - `8` PubMed-Links
  - mehrere externe Versorgungs-, Verlags- und WHO-/APA-Ressourcen

#### Verifizierte Ergebnisse

- Keine bestaetigten `404`- oder `5xx`-Toten unter den realen Nutzer-Links im geprueften Set.
- Alle geprueften `files.manuscdn.com`-Assets antworteten mit `200`.
- PubMed-Links in `FAQ`, `Genesung` und `Quellen` antworteten mit `200`.
- Sichtbare Redirects, aber keine inhaltlichen Ausfaelle:
  - `https://www.borderlinepersonalitydisorder.org/family-connections/` -> `https://bpdalliance.org/family-connections/`
  - `https://www.koesel.de` -> `https://www.penguin.de/verlage/koesel`
  - `https://www.vaskzuerich.ch` -> `https://www.vaskzuerich.ch/de/`
  - WHO-Fragmentlinks normalisieren auf aktuelle Browse-Ziele

#### Nicht als Link-Rot zu zaehlen

- `https://www.` in `client/src/pages/Selbsthilfegruppen.tsx:240` ist kein echter Link, sondern ein False Positive aus `replace("https://www.", "www.")`.
- `https://psychiatryonline.org/doi/book/10.1176/appi.books.9780890424896` antwortete im Audit-Kontext mit `403`.
- `https://www.pukzh.ch/` antwortete im Audit-Kontext ebenfalls mit `403`.
- Diese beiden Faelle sehen eher nach Bot-/WAF-Blockade aus als nach kaputten Links; Browser-Manuelltest bleibt sinnvoll.

### 1.7 Stigma- und Sensibilitaets-Check

- Insgesamt sehr gute Sensibilitaet.
- Positiv:
  - `Manipulation` wird nicht behauptet, sondern explizit relativiert, z. B. `client/src/pages/FAQ.tsx:81`
  - `Borderline ist eine behandelbare Erkrankung, keine Charakterschwaeche` in `client/src/pages/UeberUns.tsx:110`
  - Gewalt- und Krisenpassagen priorisieren Schutz und klare Eskalationswege, z. B. `client/src/pages/Grenzen.tsx:599-638`
  - Kinder- und Trennungsthemen werden klar, aber nicht kalt behandelt, z. B. `client/src/pages/FAQ.tsx:134-152`
- Kein harter Stigma-Fund auf Phase-1-Niveau.
- Kleinere Sensibilitaetsnotiz:
  - Die juristisch-klinische Kurzform `FU` ohne Laienerklaerung wirkt fuer belastete Leserinnen und Leser eher hart und technisch.

### 1.8 Gesamtbild

| Bereich                               | Stand in Phase 1                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Anrede-Inkonsistenzen                 | `0` harte `Sie`/`Du`-Brueche in redaktioneller Ansprache; mehrere stilistische Gender-Notation-Brueche |
| Unerklaerter Fachjargon               | `6-8` relevante Begriffe mit Erklaerungsluecke oder fehlender Glossar-Anbindung                        |
| Sprachton                             | insgesamt warm, entlastend, zielgruppengerecht                                                         |
| Satzlaenge                            | FAQ gut, Langformseiten teils deutlich dichter                                                         |
| Passiv-Anteil                         | niedrig bis moderat                                                                                    |
| Floskeln                              | niedrig, aber institutionell wiederholt                                                                |
| Fehlende/zu schwache Quellenanbindung | mehrere konkrete Claims mit Nachschaerfungsbedarf                                                      |
| Tote externe Links                    | `0` bestaetigt                                                                                         |
| Manuell zu verifizieren               | `2` bot-geschuetzte Ziele (`psychiatryonline`, `pukzh`)                                                |
| Stigma-Risiken                        | `0` harte Funde, `1` kleinere Fachsprach-Friktion (`FU`)                                               |

## Vorlaeufige Phase-1-Hauptbefunde

1. Die groesste inhaltliche Luecke ist nicht die Grundsprache, sondern die Kombination aus starkem Evidenzanspruch und punktuell zu duennem Quellensignal bei einzelnen Fachclaims.
2. Die Zielgruppenansprache ist ueberwiegend sehr gut getroffen; das groesste Sprachrisiko liegt in vereinzelten Fachwoertern ohne Laienbruecke und in slash-lastigen Genderformen.
3. Link-Rot ist aktuell kein Kernproblem; die externe Infrastruktur ist weitgehend intakt.
4. Fuer Phase 2 sollte die Prioritaet wahrscheinlich auf `Quellen-Transparenz`, `Jargon-Entschaerfung` und `stilistischer Vereinheitlichung` liegen, nicht auf einer grossen redaktionellen Ueberarbeitung.

## Phase 2 - Diagnose

### Sofort-Fix

1. Evidenzversprechen auf Start-, Ueber-uns- und Impressumsebene praezisieren
   - Fundorte:
     - `client/src/pages/UeberUns.tsx:102-105`
     - `client/src/pages/Impressum.tsx:236-237`
     - `client/src/pages/Home.tsx:96`
     - Gegenpol: `client/src/pages/Quellen.tsx:184-186`
   - Problem:
     - Die Website beansprucht an mehreren Stellen pauschal wissenschaftliche Fundierung aller Inhalte, raeumt auf der Quellen-Seite aber selbst ein, dass nicht alle Aussagen einzeln belegt sind und manches auf klinischer Erfahrung basiert.
   - Vorschlag:
     - Globalformulierung auf `fachlich fundiert, mit wissenschaftlichen Quellen fuer medizinische/therapeutische Aussagen und zusaetzlicher klinischer Einordnung` einschaerfen.
   - Schwere: `mittel-hoch`
   - Aufwand: `klein`

2. FAQ-Claim zu Familieninterventionen enger oder sauberer belegen
   - Fundort:
     - `client/src/pages/FAQ.tsx:186`
   - Problem:
     - `verbessern nachweislich die Behandlungsergebnisse` ist eine starke Wirksamkeitsaussage, die an der Stelle selbst nicht spezifisch genug abgestuetzt wird.
   - Vorschlag:
     - Entweder direkte Quelle nachziehen oder den Satz enger formulieren, z. B. `koennen hilfreich sein und die Zusammenarbeit verbessern`.
   - Schwere: `mittel`
   - Aufwand: `klein`

3. FAQ-Aetiologieaussage zu Erblichkeit und `invalidierendem Umfeld` absichern
   - Fundort:
     - `client/src/pages/FAQ.tsx:74`
   - Problem:
     - Die Zahl `40-60%` und die Kausalkombination aus genetischer Veranlagung, Trauma und invalidierendem Umfeld wirken wissenschaftlich praezise, sind aber an der Stelle nicht transparent genug belegt oder eingeordnet.
   - Vorschlag:
     - Entweder lokale Quellenanbindung ergaenzen oder den Absatz vorsichtiger formulieren, z. B. als `Forschung spricht fuer ein Zusammenspiel mehrerer biologischer und psychosozialer Faktoren`.
   - Schwere: `mittel`
   - Aufwand: `klein-mittel`

4. Evidenzblock in `Selbstfuersorge` entweder belegen oder enttechnisieren
   - Fundort:
     - `client/src/pages/Selbstfuersorge.tsx:295-304`
   - Problem:
     - Der Block nennt konkrete Studien- und Physiologieaussagen (`Parasympathikus`, `Cortisol`, `Burnout-Schutzfaktor`) ohne klickbare Quellen oder sichtbare Einordnung.
   - Vorschlag:
     - Entweder echten `EvidenceNote`-Block mit Quellen einfuegen oder die Formulierungen laiennaeher und weniger physiologisch praezise machen.
   - Schwere: `mittel`
   - Aufwand: `klein-mittel`

5. `FU` auf Krisen-/Rechtskontextseite fuer Laien direkt aufloesen
   - Fundort:
     - `client/src/pages/FAQ.tsx:130`
   - Problem:
     - `fuersorgerische Unterbringung (FU)` ist zwar formal korrekt, bleibt fuer belastete Leserinnen und Leser aber unnoetig technisch.
   - Vorschlag:
     - Die Kurzform dort entweder ganz weglassen oder direkt im Satz alltagsnah erklaeren.
   - Schwere: `niedrig-mittel`
   - Aufwand: `klein`

### Redaktionelles Ticket

1. Glossar und interne Verlinkung fuer fehlende Therapie- und Fachbegriffe erweitern
   - Fundorte:
     - `client/src/pages/FAQ.tsx:178`
     - `client/src/pages/UnterstuetzenKrise.tsx:593`
     - `client/src/pages/Selbstfuersorge.tsx:299-300`
   - Problem:
     - `MBT`, `Schematherapie`, `TFP`, `Hypervigilanz`, `invalidierendes Umfeld`, `Parasympathikus`, `Cortisol` sind fuer die Zielgruppe nicht durchgehend gut angedockt.
   - Vorschlag:
     - Glossar erweitern und an den relevanten Seiten gezielt verlinken.
   - Schwere: `mittel`
   - Aufwand: `mittel`

2. Slash- und Platzhalternotation sprachlich beruhigen
   - Fundorte:
     - `client/src/content/verstehen.ts:23`
     - `client/src/pages/UnterstuetzenTherapie.tsx:129`
     - `client/src/pages/FAQ.tsx:207`
     - `client/src/pages/UnterstuetzenTherapie.tsx:369-371`
   - Problem:
     - Schreibungen wie `Angehoerige/r`, `Er/sie`, `Sehr geehrte/r Frau/Herr` oder `der/die` wirken im Vergleich zum restlichen Ton mechanischer und weniger ruhig.
   - Vorschlag:
     - Auf ruhigere inklusive Formulierungen umstellen, z. B. `Angehoerige`, `die betroffene Person`, `Guten Tag [Name]`.
   - Schwere: `niedrig`
   - Aufwand: `mittel`

3. Langformseiten fuer Belastungssituationen etwas scannerfreundlicher machen
   - Fundorte:
     - `client/src/pages/UnterstuetzenKrise.tsx`
     - `client/src/pages/UnterstuetzenTherapie.tsx`
     - teilweise `client/src/pages/Grenzen.tsx`
   - Problem:
     - Einzelne Abschnitte sind fuer eine emotional belastete Zielgruppe recht dicht formuliert.
   - Vorschlag:
     - Lange Abschnitte kuerzen, mehr Zwischenzeilen und konkret markierte Kernsaetze setzen.
   - Schwere: `niedrig-mittel`
   - Aufwand: `mittel`

4. Sichtbarer machen, welche Aussagen evidenzgestuetzt und welche kuratiert-didaktisch sind
   - Fundorte:
     - `client/src/pages/UeberUns.tsx`
     - `client/src/pages/Impressum.tsx`
     - `client/src/pages/Quellen.tsx`
   - Problem:
     - Die Grundlogik ist vorhanden, aber fuer Leserinnen und Leser noch nicht ganz konsistent erzaehlt.
   - Vorschlag:
     - Ein kurzes site-weites Transparenzmuster definieren: `medizinische Aussagen belegt`, `Versorgungshinweise verifiziert`, `didaktische Vereinfachungen gekennzeichnet`.
   - Schwere: `mittel`
   - Aufwand: `mittel`

### Akzeptiert

1. `Du`-Form in Beispielen und Dialogen
   - Fundorte:
     - u. a. `client/src/pages/FAQ.tsx`, `client/src/pages/Glossar.tsx`, `client/src/pages/UnterstuetzenKrise.tsx`
   - Bewertung:
     - Kein Anredefehler, sondern bewusstes Stilmittel fuer Zitate, Konfliktsaetze und Uebungen.

2. Aeltere Standardwerke auf der Quellen-Seite
   - Fundorte:
     - `client/src/pages/Quellen.tsx`
   - Bewertung:
     - Fuer Grundlagenliteratur und Standardwerke im Borderline-Feld akzeptabel; nur headline-artige empirische Claims brauchen staerkere sichtbare Aktualisierung.

3. Redirects und Bot-geschuetzte Externziele nicht als Link-Rot werten
   - Fundorte:
     - `psychiatryonline.org`, `pukzh.ch`, `family-connections`, `koesel.de`, `vaskzuerich.ch`
   - Bewertung:
     - Kein akuter Inhaltsfehler im Repo; bei Bedarf spaeter manuell im Browser gegenpruefen.

4. Grundton und Sensibilitaet des Projekts
   - Bewertung:
     - Der empathische, entstigmatisierende Gesamtton ist stark genug, dass hier keine generelle Stilkorrektur noetig ist.

## Release-Readiness nach Phase 2

- Stufe: `B`
- Begruendung:
  - Die Website ist sprachlich insgesamt tragfaehig, zielgruppengerecht und ohne bestaetigten Link-Rot oder harte Stigma-Funde.
  - Vor einem inhaltlich besonders anspruchsvollen Release sollten aber die kleinen, gut loesbaren Evidenz- und Transparenzluecken geschlossen werden.
  - Ein Sprung auf `A` wirkt nach heutigem Stand realistisch mit wenigen kompakten Textkorrekturen statt mit einer grossen Content-Ueberarbeitung.

## Phase 3 - Umsetzung

### Umgesetzte Sofort-Fixes

1. Evidenzversprechen global praezisiert
   - Dateien:
     - `client/src/pages/Home.tsx`
     - `client/src/pages/UeberUns.tsx`
     - `client/src/pages/Impressum.tsx`
   - Umsetzung:
     - `fachlich fundiert` und `wissenschaftlich fuer medizinische/therapeutische Aussagen, klinisch eingeordnet fuer Orientierungstexte` jetzt klarer voneinander getrennt.

2. FAQ-Claims in sensiblem klinischem Bereich enger gefasst
   - Datei:
     - `client/src/pages/FAQ.tsx`
   - Umsetzung:
     - Aetiologie-Absatz zu Erblichkeit und Belastungsfaktoren vorsichtiger formuliert.
     - Familieninterventionssatz von starker Wirksamkeitsbehauptung auf realistischere Hilfsaussage umgestellt.
     - `fuersorgerische Unterbringung` alltagsnah erklaert und ohne nackte Kurzform als Fachsprache stehen gelassen.

3. `Selbstfuersorge`-Evidenzblock enttechnisiert und transparenter gemacht
   - Datei:
     - `client/src/pages/Selbstfuersorge.tsx`
   - Umsetzung:
     - physiologische Kurzformeln (`Parasympathikus`, `Cortisol`) durch laiennaehere Aussagen zu Belastung, Anspannung und Schutzfaktoren ersetzt.
     - zusaetzliche Einordnung eingefuegt, dass die Seite Forschung und klinische Erfahrung verbindet.

## Phase 4 - Verifikation

### Ergebnis

- `npm run lint`: gruen
- `npm run check`: gruen
- `npm run build`: gruen

### Umgebungsnotiz

- Der Temp-Worktree hatte zunaechst keine lokale Toolchain (`eslint`, `tsc`, `vite` nicht vorhanden).
- Verifikation wurde nach lokalem Install ueber `npm install --no-package-lock --legacy-peer-deps` erfolgreich nachgezogen.
- Das ist ein Umgebungsaspekt des Temp-Worktrees, kein inhaltlicher Befund am Projektcode.

## Finale Einordnung

- Release-Readiness: `A`
- Begruendung:
  - Die im Audit identifizierten unmittelbaren Vertrauens- und Transparenzluecken wurden geschlossen.
  - Verbleibende Punkte betreffen vor allem redaktionelle Verfeinerung, Glossar-Ausbau und Stilkonsistenz, nicht akute Inhaltsrisiken.

## Stopp

- Phase 1 bis 4 sind hiermit abgeschlossen.
- Das Content-/Sprachaudit ist in dieser Iteration abgeschlossen.
