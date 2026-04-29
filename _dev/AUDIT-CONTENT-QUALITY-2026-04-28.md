# Content-Quality-Audit — borderline-angehoerige

**Datum:** 28. April 2026
**Auditor-Rolle:** Content Quality Auditor — psychoedukative Inhalte für Angehörige
**Zielgruppe der Site:** Partner:innen, Eltern, erwachsene Kinder, Geschwister von Menschen mit Borderline-Persönlichkeitsstörung in der Schweiz (Kanton Zürich)
**Träger:** Fachstelle Angehörigenarbeit, Psychiatrische Universitätsklinik Zürich (PUK)
**Methode:** Read-only-Lektüre der zentralen Content-Pages (~12'000 Zeilen TSX/HTML), Cross-Reference auf Konsistenz, Abgleich mit DSM-5/ICD-11 und Standard-Literatur (Linehan, Zanarini, Bateman/Fonagy, Mason/Kreger, Kreisman)
**Scope:** Inhalte, nicht Code; keine Wertung von Design, A11y, Performance

---

## Kurzfazit

Die Site hat ein ungewöhnlich hohes inhaltliches Niveau für ein psychoedukatives Angebot. Sie vermeidet zwei der häufigsten Fallen in diesem Feld: sie banalisiert weder die Belastung der Angehörigen noch heroisiert sie deren Rolle als Co-Therapeut:in. Das tragende Framing «Mitgefühl und Selbstschutz sind kein Widerspruch» (Home) wird über alle Tier-1-Pages konsequent gehalten und ist die stärkste konzeptuelle Leistung der Site. Fachliche Aussagen sind durchgehend korrekt, mit aktuellen Quellen (Zanarini 2010/2012, APA Practice Guideline 2024, Storebø Cochrane 2020) belegt und transparent in ihrer Begrenzung («Daten aus Spezialzentren», «nicht abschliessend»). **Es wurden keine fachlich falschen oder potenziell schädlichen Aussagen gefunden (keine P0).** Die wichtigsten Lücken liegen in (a) der Quellen-Konsistenz zwischen Inline-Zitaten und Quellen-Page, (b) fehlender Komorbiditäts- und Diagnostik-Einordnung, (c) thematischen Lücken im Soforthilfe-Static-HTML (Opferhilfe, Männer-Schutz), und (d) der geografischen Engführung auf Stadt Zürich/Winterthur bei sonst kantonsweiter Adressierung.

---

## Findings nach Priorität

### P0 — Kritisch (fachlich falsch / potenziell schädlich)

**Keine P0-Findings.** Alle fachlichen Aussagen sind solide belegt oder klar als klinische Erfahrung gekennzeichnet. Sicherheits-kritische Inhalte (Suizidgefahr, körperliche Gewalt, Krisenverhalten) sind durchgehend mit konkreten Notfallnummern und korrekter Verantwortungsweitergabe versehen.

### P1 — Relevante Lücke oder Inkonsistenz

#### P1-1 — Quellen-Page inkonsistent mit Inline-Zitaten

`client/src/pages/Quellen.tsx` listet 16 Einträge in 4 Kategorien. Mehrere Pages zitieren jedoch Quellen, die in der Quellen-Page **nicht aufgeführt** sind:

| Quelle                                         | Zitiert in                                          | In Quellen-Page? |
| ---------------------------------------------- | --------------------------------------------------- | ---------------- |
| APA Practice Guideline (2024)                  | `Verstehen.tsx` (Z. 280-284), `Home.tsx` (Footnote) | **Nein**         |
| Storebø et al. (2020) Cochrane                 | `FAQ.tsx` (Z. 425-427)                              | **Nein**         |
| Gunderson et al. (2011) CLPS                   | `Genesung.tsx` (Z. 308-310), `FAQ.tsx` (Z. 420-421) | **Nein**         |
| Zaccaro et al. (2018), Maslach & Leiter (2016) | `Selbstfuersorge.tsx` (EvidenceNote Z. 364-371)     | **Nein**         |

Eine Person, die einer Inline-Quelle nachgehen will, wird auf der Quellen-Page nicht fündig. Das untergräbt die Glaubwürdigkeitswirkung der ohnehin sorgfältig kuratierten Quellen-Liste.

#### P1-2 — «Borderline-Persönlichkeitsstörung» fehlt im Glossar

`client/src/pages/Glossar.tsx` enthält 21 Begriffe — von DBT bis Leuchtturm-Prinzip. Der **zentrale Begriff der Site selbst** (BPS / Borderline-Persönlichkeitsstörung) hat keinen eigenen Eintrag mit Abkürzung, Definition und Verweis auf DSM-5/ICD-11. Die diagnostische Definition findet sich nur im Fliesstext von `Verstehen.tsx` (Z. 249-254). Damit fehlt der naheliegendste Nachschlage-Anker für Angehörige, die zum ersten Mal mit der Diagnose konfrontiert sind.

#### P1-3 — Inkonsistente Therapieformen-Liste (TFP)

- `FAQ.tsx` Z. 184-185: «DBT, MBT, Schematherapie oder TFP (Übertragungsfokussierte Psychotherapie)»
- `UnterstuetzenTherapie.tsx` Z. 116-130: nur DBT, MBT, Schematherapie (kein TFP)
- `Glossar.tsx`: nur DBT (mit Abkürzung), keine MBT/TFP/Schematherapie als Vollformen

Eine Angehörige, die in der FAQ erstmals von TFP hört, findet keine weiterführende Erklärung auf der Therapie-Page oder im Glossar.

#### P1-4 — Soforthilfe-Static deckt Gewalt-Anlaufstellen nicht ab

`client/public/soforthilfe/index.html` ist die robuste Akut-Seite (Static-HTML, JS-frei). Sie listet:

- Lebensgefahr (144, 117, 112)
- Psychiatrische Krise (PUK 24/7-Linien)
- Entlastung (143, 0848 Elternnotruf, 147)
- Tox/Ärztefon/Kriseninterventionszentrum

**Fehlt:**

- **Opferhilfe Zürich** (`0800 040 080`, kostenlos) — wird in `Grenzen.tsx` Z. 122 als zentrale Nach-Gewalt-Anlaufstelle genannt, aber gerade in akuter Krise würde Soforthilfe der natürliche Einstieg sein.
- **Frauenhaus** (in `Grenzen.tsx` namentlich genannt, ohne konkreten Verweis)
- **Männer-Schutz-Anlaufstelle** (in `Grenzen.tsx` als «Unterstützung auch für Männer» abstrakt erwähnt; konkrete Stelle wie z.B. das Männerhaus Schweiz wird nicht benannt — weder in Soforthilfe noch in Grenzen)
- **Hinweis auf KESB** für Situationen, in denen Kinder gefährdet sind

Begründung Priorität P1: gewaltbetroffene Angehörige sind eine Subgruppe, die explizit in `Grenzen.tsx` (Z. 678-759) adressiert wird. Wenn die Soforthilfe-Seite als «schnellster funktionierender Weg» (Home) beworben wird, sollte sie diese Anlaufstellen mit-tragen.

#### P1-5 — `147` Pro Juventute in Soforthilfe nicht klar als Kinder-/Jugendkanal markiert

Soforthilfe (`/soforthilfe`, Z. 91): «`147` Pro Juventute, 24/7» unter «Entlastung und Gespräch».

Die Kernzielgruppe der Site sind erwachsene Angehörige (Partner, Eltern, Geschwister, erwachsene Kinder). Die `147` ist primär ein Kanal **für Kinder und Jugendliche selbst**. Eltern, die für ihr betroffenes Kind eine Beratung suchen, brauchen eher die **Pro Juventute Elternberatung** (`058 261 61 61` oder Live-Chat). Die aktuelle Listung kann irreführend sein.

#### P1-6 — Komorbidität wird kaum erklärt

Borderline tritt klinisch sehr häufig komorbid auf — mit Depression (~80%), Angststörungen, PTBS (Trauma-Anamnese ist hoch), Substanzgebrauch, Essstörungen, ADHS. Für Angehörige ist das relevant, weil sie selten mit «nur Borderline» konfrontiert sind, sondern mit überlagernden Diagnosen.

**Bestand:**

- `Genesung.tsx` Z. 80: «Behandlung von Begleiterkrankungen» — als Förderfaktor genannt, nicht weiter ausgeführt
- `UnterstuetzenAlltag.tsx`: Substanzkonsum als Impulsivitätsphänomen (kein Verweis auf Suchterkrankung)

**Fehlt:**

- Eigene FAQ-Frage oder Glossar-Eintrag «Was bedeutet es, wenn mehrere Diagnosen gleichzeitig genannt werden?»
- Hinweis auf typische Komorbiditäten und was sie für die Behandlung bedeuten (z.B. dass akute Suchterkrankung oft zuerst stabilisiert werden muss, bevor BPS-Therapie greifen kann)

#### P1-7 — Diagnostik-Prozess wird nicht erklärt

Der Selbsttest erfasst (Frage 3) explizit «Keine offizielle Diagnose, aber ich vermute Borderline» — eine sehr realistische Ausgangslage für Angehörige. **Was nirgendwo erklärt wird:**

- Wer stellt die Diagnose? (Psychiater:in, klinische Psycholog:in, nicht Hausarzt)
- Wie läuft Diagnostik? (klinisch-strukturiertes Interview, SCID-5-PD, IPDE)
- Wann ist eine Diagnose-Stellung sinnvoll, wann eher kontraproduktiv (Stigmatisierung)?
- Was bedeutet «Verdachtsdiagnose» vs. gesicherte Diagnose?
- Wie verhalte ich mich, wenn die betroffene Person keine Diagnose haben will?

Die FAQ-Frage «Soll ich die Diagnose ansprechen?» behandelt nur den Kommunikationsaspekt nach erfolgter Diagnose, nicht den Weg dorthin.

#### P1-8 — Geografische Engführung der Beratungsangebote

`Selbsthilfegruppen.tsx` (route `/beratung`):

- VASK-Treffpunkte nur in **Zürich** und **Winterthur**
- PUK Fachstelle: Lenggstrasse 31, 8032 Zürich
- HelpLine Stand by You: Mo-Do (Freitag implizit geschlossen — wird nicht explizit kommuniziert)

Für Angehörige in Bezirken wie Bülach, Uster, Affoltern, Hinwil, Pfäffikon, Andelfingen, Dietikon, Dielsdorf, Horgen, Meilen gibt es keinen lokalen Anlaufpunkt. Der Verweis auf Selbsthilfe Schweiz ist sehr generisch. Online-/anonyme Optionen (moderierte Foren, Online-Selbsthilfegruppen für Angehörige) fehlen ganz — gerade Letzteres wäre für die Bezirke und für Angehörige mit Schamgrenzen oder zeitlichen Restriktionen relevant.

#### P1-9 — Tote oder verwirrende interne Links in FAQ

`FAQ.tsx` verlinkt:

- Z. 78: `/uebungen` — die Route heisst `/uebungsszenarien` (siehe `pages/Uebungsszenarien.tsx`). Wenn die Route nicht aliasiert ist, läuft das in 404 oder Redirect.
- Z. 117: «SET üben →» mit demselben Link. Die `→`-Suffixnotation wird im Render-Code per Regex entfernt (Z. 387: `link.text.replace(/\s*→\s*$/, "")`), was eine Workaround-Lösung ist.

Diese Verifikation würde im Code-Audit (nicht hier) liegen — als Content-Auditor flagge ich nur, dass aus Lese-Sicht widersprüchliche Routen-Bezeichnungen existieren.

### P2 — Feinschliff

#### P2-1 — Konsolidierte «Mythen vs. Realität»-Sektion fehlt

Die Site entkräftet mehrere zentrale Borderline-Stigmata, aber verstreut über mehrere Pages:

- «Borderline-Patient:innen sind manipulativ» — entkräftet implizit in `FAQ.tsx` («Warum verhält sich mein Angehöriger bei anderen regulierter?») und in `Verstehen.tsx` («Hinter heftigen Reaktionen liegen oft Überflutung, Angst, Scham…»)
- «Borderline ist nicht behandelbar» — entkräftet in `FAQ.tsx` («Ist Borderline heilbar?») und ausführlich in `Genesung.tsx`
- «Direktes Fragen nach Suizid weckt Suizidalität» — entkräftet als Note in `UnterstuetzenKrise.tsx` Z. 165
- «Ich (als Angehörige) bin schuld» — entkräftet in `FAQ.tsx` («Bin ich schuld?»)

Eine prominente, konsolidierte Sektion («Häufige Mythen über Borderline — und was die Forschung sagt») wäre kraftvoller. Sie könnte z.B. auf der Verstehen-Page oder als eigene Meta-Page leben und gezielt das Stigma adressieren, das viele Angehörige aus dem Bekanntenkreis oder aus älteren Medien mitbringen.

#### P2-2 — Geschlechterverteilung von BPS wird nicht thematisiert

Älteres klinisches Bild: Borderline = Frauenkrankheit (DSM-5: 75% klinisch sind Frauen). Neuere Forschung (z.B. Grant et al. 2008, NESARC): Geschlechterverteilung in der Allgemeinbevölkerung ist annähernd 1:1; männliche Betroffene werden seltener diagnostiziert (oft als «antisoziale Persönlichkeitsstörung» oder «Substanzkonsum» fehlklassifiziert).

Für männliche Angehörige (Väter, Brüder, erwachsene Söhne, männliche Partner) ist das relevant: ihre betroffene Person kann genauso Borderline haben wie eine weibliche. Die Site verwendet konsequent geschlechtsneutrale Sprache («die betroffene Person», «Ihr Angehöriger»), erwähnt aber nicht explizit, dass Borderline bei allen Geschlechtern vorkommt. Eine kurze Klarstellung würde Diagnose-Vermutungen bei männlichen Betroffenen entlasten.

#### P2-3 — Recovery-50%-Zeitangabe inkonsistent

- `Glossar.tsx` Z. 83: «Etwa 50% der Betroffenen erreichen nach 10 Jahren eine vollständige Recovery»
- `Genesung.tsx` Z. 274-276: «50% — erreichen eine umfassendere Genesung mit funktioneller Stabilität» (Zeit-Horizont fehlt im selben Satz; im 85-93%-Block daneben wird «innerhalb von etwa 10 Jahren» genannt, was implizieren könnte, dass 50% denselben Horizont teilen)

Beides ist inhaltlich korrekt (Zanarini 2012), aber Lesende könnten unterschiedliche Bilder bekommen. Eine konsistente Formulierung («…nach etwa 10 Jahren») in beiden Pages wäre sauberer.

#### P2-4 — Quellenaktualität bei MBT

`Quellen.tsx` Z. 107-114 zitiert Bateman & Fonagy (2004). Seither gibt es mehrere wichtige Updates:

- Bateman & Fonagy (2009, 2013): RCT-Daten zu MBT-Wirksamkeit
- Cochrane-Updates zu psychologischen Therapien für BPS (Storebø 2020 wird in FAQ zitiert, aber nicht in Quellen-Page; siehe P1-1)

Eine Aktualisierung wäre Feinschliff, kein Defizit.

#### P2-5 — Aguirre und Paris fehlen im Quellen-Repertoire

Der Audit-Prompt nennt Aguirre («Borderline Personality Disorder in Adolescents» / «Helping Your Adult Child with BPD») und Paris («Half in Love with Death» / «Treatment of Borderline Personality Disorder») als erwartete Referenzen. Beide würden gut zur Angehörigen-Perspektive passen und sind in der internationalen Standard-Literatur etabliert. Aktuell sind sie weder zitiert noch verlinkt. Buchempfehlungen-Page wurde nicht im Detail gelesen — falls dort vorhanden, ist die Lücke nur bei Quellen-Page relevant.

#### P2-6 — Kinder-Schutz-Anlaufstellen in FAQ

`FAQ.tsx` Z. 151: «Achten Sie auf Warnsignale beim Kind […] und holen Sie bei Bedarf professionelle Hilfe.» — pauschal.

Konkretere Anlaufstellen wären:

- **KESB** (Kindes- und Erwachsenenschutzbehörde) — wenn Kindeswohl gefährdet
- **Mütter-/Väterberatung** — niederschwellig, kostenlos
- **Schulpsychologischer Dienst** — wenn Schulprobleme als Folge sichtbar werden
- **KJPD / Kinder- und Jugendpsychiatrischer Dienst** im Kanton Zürich
- **Pro Juventute Elternberatung** (siehe P1-5)

#### P2-7 — Männerspezifische Anlaufstelle fehlt konkret

`Grenzen.tsx` Z. 122: «Es gibt Unterstützung auch für Männer.» — Hinweis vorhanden, ist aber weder verlinkt noch namentlich konkretisiert. Konkrete Anlaufstellen wären z.B.:

- Männerhaus Schweiz (Genf, Zürich, Aargau-projektiert)
- mannschafft.ch
- Opferhilfe (gilt für alle Geschlechter, sollte explizit so genannt werden)

#### P2-8 — Diagnostik-Kriterien (DSM-5/ICD-11) nicht aufgelistet

`Verstehen.tsx` benennt das Störungsbild beschreibend, listet aber die DSM-5-9-Kriterien (von denen 5 erfüllt sein müssen) nicht auf. Begründung dafür ist im Code-Comment dokumentiert (Brief: kein Etikett-Framing). Für vollständige Themenabdeckung pro Audit-Prompt-Punkt 1 wäre ein optionaler «Diagnostische Kriterien»-Block (klar als Referenz, nicht als Selbst-Diagnose-Werkzeug deklariert) sinnvoll. Alternative: ein verlinkter Bereich auf der Verstehen-Page oder ein eigenes Kapitel im Glossar unter «BPS».

#### P2-9 — Selbsttest Frage 3 mischt Diagnose-Status und Erfahrungsdauer

`Selbsttest.tsx` Z. 138-162 fragt: «Wie lange begleiten Sie Ihren Angehörigen schon?» mit Optionen «unter 6 Monate», «6 Monate bis 2 Jahre», «über 2 Jahre», «Keine offizielle Diagnose, aber ich vermute Borderline». Die letzte Option ist nicht eine Zeit-Antwort, sondern eine Diagnose-Status-Antwort. Wer 5 Jahre begleitet und (noch) keine Diagnose hat, kann nur eine der vier Optionen wählen. Sollte konzeptuell entkoppelt werden (zwei Fragen statt eine).

#### P2-10 — «Erkrankte Person» vs. «Betroffene Person» — Sprachregelung fehlt

Die Site verwendet beides:

- «erkrankte Person» (Home Z. 204)
- «betroffene Person» (Verstehen, UnterstuetzenKrise, Selbsttest)
- «Ihr Angehöriger» (durchgehend)

Beide Begriffe sind respektvoll. Eine kurze Sprachregel im Glossar oder einem Style-Hinweis würde die Konsistenz erhöhen und Übersetzungen / Sprachpflege erleichtern. Aktuell ist es eher Zufallsverteilung.

---

## Stärkste Inhalte

Die folgenden Inhalte sind aus Auditor-Sicht ungewöhnlich gut umgesetzt und sollten bei Überarbeitungen **nicht angetastet werden**:

1. **`Home.tsx` Sektion «Mitgefühl und Selbstschutz sind kein Widerspruch»** (Z. 100-158). Drei Sätze konzentrieren das gesamte Anliegen der Site: «Sie können verstehen UND schützen. Sie können bleiben UND Distanz wahren. Sie können lieben UND müde sein.» Mit Footnote zu Linehan + APA Guideline. Tonalität, Schuldentlastung und konzeptuelle Klarheit gleichzeitig — selten in psychoedukativem Material.

2. **`Verstehen.tsx` «Was Angehörige oft erleben»** (Z. 215-240). Beziehungs-statt-Symptom-Framing; Pull-Quote als verdichtete Zeugenaussage (mit ehrlicher Markierung «Kompositum, keine reale Person»); explizite Begrenzung: «Verstehen ersetzt aber weder Grenzsetzung noch Selbstschutz noch professionelle Hilfe.»

3. **`Genesung.tsx` Forschungsblock + Fortschritt-Paradox** (Z. 235-489). 85-93% / 50% / Jahre als Versalziffern, mit klarer Eingrenzung «Daten aus Spezialzentren unter optimalen Bedingungen». Anti-Stigma («klar gegen das alte Bild einer hoffnungslosen Entwicklung») kombiniert mit Realismus («Rückschritte gehören dazu»). Quellenverknüpfung Zanarini 2010, 2012, Gunderson 2011.

4. **`UnterstuetzenAlltag.tsx` «Was im Alltag oft wirklich hilft»** (Z. 41-133). Vier Praktiken jeweils mit ausgearbeitetem 4-Zeilen-Dialog-Beispiel. Höchste Praxisrelevanz im ganzen Site-Korpus. «Begrenzte Verfügbarkeit» mit Beispielsatz «Nach 22 Uhr bin ich nicht mehr am Handy. Wenn es ernst wird, holen wir zusätzliche Hilfe dazu» ist die Art von konkretem Handout, die Angehörige tatsächlich verwenden können.

5. **`UnterstuetzenKrise.tsx` Suizid-Direktansprache als Anti-Mythos** (Z. 161-167). Die Note «Direktes Fragen erhöht das Risiko nicht, sondern zeigt, dass Sie die Situation ernst nehmen» ist wissenschaftlich korrekt und entkräftet einen weit verbreiteten Mythos, der Angehörige oft hindert, das Thema anzusprechen.

6. **`UnterstuetzenTherapie.tsx` «Was Ihre Rolle ausdrücklich nicht ist»** (Z. 510-536). Vier explizite Negativ-Sätze («Sie müssen nicht…»). Kraftvoll als Anti-Co-Therapeut-Botschaft. Komplementiert durch «Wie kann ich den Rahmen mittragen, ohne selbst zur Behandlung zu werden?» (Z. 326-329).

7. **`Grenzen.tsx` Sicherheits-Sektion «Wenn der Angehörige körperlich übergriffig wird»** (Z. 678-759). Klare Bot­schaft «Borderline erklärt Übergriffe nicht und entschuldigt sie nicht.» Vier konkrete Schritte mit Telefonnummern (117, 144, Opferhilfe 0800 040 080). Schluss-Hinweis «Professionelle Hilfe zu holen ist kein Verrat» entlastet typische Hemmschwelle.

8. **`FAQ.tsx` «Soll ich die Diagnose ansprechen?»** (Z. 70-79). Differenziert zwischen: Diagnose schon bekannt → offenes Gespräch möglich; Diagnose nicht bekannt → keine Labels, sondern Verhalten/Gefühle benennen. Mit Beispiel-Sätzen. Plus expliziter Warnsatz: «Diagnose nicht als Waffe nutzen.»

9. **`soforthilfe/index.html`** (vollständig). Static-HTML, lädt ohne JavaScript, sauber gegliedert nach Dringlichkeit (Lebensgefahr / Psychiatrische Krise / Entlastung). Wichtige Differenzierung: «Diese Nummern hören zu und entlasten, schicken aber keinen Einsatzdienst.» — schützt vor falschen Erwartungen.

10. **`Glossar.tsx` Angehörigen-spezifische Begriffe** (Co-Abhängigkeit Z. 194, Enabling Z. 204, Leuchtturm-Prinzip Z. 215). Begriffe, die genau die Angehörigenrolle abbilden, mit Definitionen, die nicht-pathologisierend sind. Leuchtturm-Prinzip ist ein eigenes Site-Konzept und entlastet von der Helfer-Verantwortung («ich kann nicht für dich schwimmen»).

11. **`Selbstfuersorge.tsx` Schluss-Pull-Quote** (Z. 376-383). «Selbstfürsorge ist keine Selbstsucht – sie ist die Grundlage dafür, langfristig für Ihren Angehörigen da sein zu können.» Verbindet Selbsterhaltung mit Beziehungsverpflichtung — entkräftet die Co-Abhängigkeits-Schuldfrage präzise.

---

## Grösste Lücken

Geordnet nach inhaltlicher Reichweite:

1. **Komorbidität** — nahezu nicht thematisiert. Bei einer Erkrankung mit ~80% Komorbiditätsrate zur Depression eine relevante Lücke. (P1-6)

2. **Diagnostik-Prozess** — wer stellt wie eine BPS-Diagnose? Aktuell setzt die Site eine bereits gestellte oder vermutete Diagnose voraus und führt nicht durch den Weg dorthin. (P1-7)

3. **Online- / anonyme Selbsthilfe-Optionen** — fehlen ganz. (P1-8)

4. **Geografische Reichweite über Stadt Zürich/Winterthur hinaus** — Bezirke ohne lokales Angebot. (P1-8)

5. **Konsolidierte Anti-Stigma-Sektion** — die Anti-Stigma-Botschaften sind verstreut, eine prominente «Mythen vs. Realität»-Übersicht fehlt. (P2-1)

6. **Soforthilfe-Lücken** für Gewalt-Kontext (Opferhilfe, Frauenhaus, Männer-Schutz, KESB) — die zentrale Akut-Seite deckt nur medizinisch-psychiatrische Krisen ab, nicht Gewalt-Kontexte. (P1-4)

7. **Kinderschutz-Anlaufstellen** konkret (KESB, KJPD, Mütter-/Väterberatung, Pro Juventute Eltern) — FAQ adressiert das Thema, ohne Anlaufstellen zu nennen. (P2-6)

8. **«Borderline-Persönlichkeitsstörung» / BPS / BPD** als Glossar-Eintrag — der Schlüsselbegriff hat kein eigenes Definitionsfeld. (P1-2)

9. **Geschlechterverteilung** — Borderline kommt bei allen Geschlechtern vor; die Site sagt es nirgendwo explizit. (P2-2)

10. **Konsistenz Quellen-Page mit Inline-Zitaten** — APA 2024, Storebø 2020, Gunderson 2011 fehlen in der Quellen-Page. (P1-1)

---

## Konkrete Verbesserungsvorschläge

Pro Finding ein präziser Hinweis darauf, _was_ anders oder ergänzt werden müsste. Keine fertigen Texte — die schreibt das Autor:innen-Team.

### Zu P1-1 (Quellen-Konsistenz)

In `Quellen.tsx` ergänzen: APA Practice Guideline (2024), Storebø et al. (2020) Cochrane Review, Gunderson et al. (2011) CLPS, Zaccaro et al. (2018), Maslach & Leiter (2016). Mit derselben Struktur (Autor, Jahr, Titel, Quelle, Hinweis, optional PubMed-Link) wie bestehende Einträge. Mindestens die in mehreren Pages zitierten APA 2024 und Storebø 2020 sind unverzichtbar.

### Zu P1-2 (BPS im Glossar)

In `Glossar.tsx` neuen Eintrag «Borderline-Persönlichkeitsstörung (BPS, engl. BPD)» ergänzen. Mit Definition, Verweis auf DSM-5 und ICD-11 (6D11.5 «Borderline pattern specifier»), kurze Geschichte des Begriffs (warum «borderline»), und Verweis auf Verstehen-Page. Falls vereinfachte Liste der Hauptmerkmale angefügt wird, klar als Übersicht (nicht Selbst-Diagnose-Werkzeug) markieren.

### Zu P1-3 (TFP)

Entscheidung treffen: TFP gehört in die Therapie-Page **oder** wird in der FAQ herausgenommen. Falls aufgenommen: 2-3 Sätze in `UnterstuetzenTherapie.tsx` (Therapieformen-Liste) und Glossar-Eintrag «TFP — Übertragungsfokussierte Psychotherapie».

### Zu P1-4 (Soforthilfe-Lücken)

In `client/public/soforthilfe/index.html` eine vierte oder erweiterte Karte ergänzen:

- Opferhilfe Schweiz / Zürich (`0800 040 080`, kostenlos, 24/7 für akut, Mo-Fr für Beratung — Stand prüfen)
- Frauenhaus Region Zürich (mit konkreter Telefonnummer)
- Männerhaus oder konkrete männerspezifische Anlaufstelle
- KESB-Verweis für Kinderwohl-Gefährdung (mit Hinweis, dass KESB nicht 24/7 ist)

Wichtig: jeweils mit kurzem Hinweis, **wann** diese Stelle die richtige ist (nicht nur Telefonnummer), damit Angehörige in Akutmomenten nicht raten müssen.

### Zu P1-5 (147 als Kinderkanal)

In Soforthilfe `147` umtexten oder mit klarem Hinweis versehen: «Pro Juventute, 24/7 — Beratung **für Kinder und Jugendliche**». Daneben oder ersetzt durch: «Pro Juventute Elternberatung — `058 261 61 61`» (Stand prüfen). Diese Trennung wäre auch in Verstehen-Pages und FAQ relevant, wo Pro Juventute erwähnt wird.

### Zu P1-6 (Komorbidität)

Zwei Optionen, idealerweise beide:

- (a) FAQ-Frage ergänzen: «Was bedeutet es, wenn mehrere Diagnosen genannt werden?» (Erläuterung Komorbidität, typische Begleitdiagnosen, Behandlungsreihenfolge bei Sucht).
- (b) Glossar-Eintrag «Komorbidität» mit Verweis darauf, dass Borderline selten allein auftritt.

Auf `UnterstuetzenAlltag.tsx` Impulsivität-Sektion (Substanzkonsum) einen kleinen Verweis auf Sucht-Beratung (z.B. Sucht Schweiz, Suchtberatung Kanton Zürich) ergänzen.

### Zu P1-7 (Diagnostik-Prozess)

Eigene Sektion auf Verstehen-Page oder eigene FAQ-Kategorie «Diagnose» mit ~3 Fragen:

- Wer kann eine BPS-Diagnose stellen?
- Wie läuft eine Diagnostik ab?
- Was tun, wenn die betroffene Person die Diagnose ablehnt?

Cross-Link zu Therapie-Page (Therapie-Angebote im Kanton Zürich).

### Zu P1-8 (Geografie + Online-Optionen)

In `Selbsthilfegruppen.tsx`:

- Online-Selbsthilfe-Optionen ergänzen (z.B. moderierte Foren, Webex-Selbsthilfegruppen). Recherche zu konkreten Anbietern (DBT-Dachverband, Hoffman Family Connections-Programme online).
- Wenn keine kantonsweiten lokalen Treffpunkte verfügbar: das transparent benennen («Aktuell nur in Zürich und Winterthur. Für andere Bezirke: Online-Optionen oder Selbsthilfe Schweiz»).
- HelpLine Stand by You: Freitag explizit als «geschlossen» kennzeichnen, falls so.

### Zu P1-9 (Tote Links)

Routen-Konsistenz prüfen (Code-Audit, nicht Content-Audit): Entscheiden, ob `/uebungen` als Alias zu `/uebungsszenarien` existieren soll, oder ob die FAQ-Texte angepasst werden.

### Zu P2-1 (Mythen-Sektion)

Auf Verstehen-Page (oder als eigene Mini-Page) einen prominenten Block «Häufige Mythen über Borderline» mit ~5 Mythen × kurzer Erklärung der Forschungslage. Vorschlag-Mythen:

- «Borderline ist nicht behandelbar»
- «Borderline-Patient:innen sind manipulativ»
- «Borderline = Trauma-PTBS»
- «Direktes Fragen nach Suizid weckt Suizidalität»
- «Nur Frauen haben Borderline»

Jeder Mythos mit 1-2-Satz-Antwort und Verweis auf vertiefenden Artikel/Quelle.

### Zu P2-2 (Geschlechterverteilung)

Auf Verstehen-Page oder in FAQ einen Satz: «Borderline kommt bei allen Geschlechtern vor. Klinisch werden Frauen häufiger diagnostiziert (~75%), in der Allgemeinbevölkerung ist die Verteilung jedoch annähernd gleich. Männliche Betroffene werden seltener oder anders diagnostiziert.» Mit Quellen (Grant et al. 2008 NESARC).

### Zu P2-3 (Recovery-50%-Konsistenz)

In `Genesung.tsx` Z. 274-276 die Zeitangabe «nach etwa 10 Jahren» ergänzen, analog zur 85-93%-Zelle. Damit identische Lesart wie im Glossar.

### Zu P2-4 (MBT-Aktualität)

In `Quellen.tsx` MBT-Eintrag um Verweis auf neuere RCT-Studien ergänzen (Bateman & Fonagy 2009/2013) oder einen Hinweis-Satz: «Aktualisierte Wirksamkeitsdaten siehe Storebø et al. 2020 Cochrane.»

### Zu P2-5 (Aguirre / Paris)

Falls beide Autor:innen in der Buchempfehlungen-Page bereits vertreten sind: Quellen-Page um zwei Einträge ergänzen, mit Verweis auf Buchempfehlungen. Falls nicht: Aufnahme prüfen, insbesondere Aguirre als sehr angehörigen-orientiertes Werk.

### Zu P2-6 (Kinderschutz-Stellen)

In `FAQ.tsx` Z. 151 («Wie schütze ich meine Kinder?») konkrete Schweizer Anlaufstellen ergänzen: KESB, Mütter-/Väterberatung Kanton Zürich, KJPD, Pro Juventute Elternberatung, Schulpsychologischer Dienst.

### Zu P2-7 (Männerspezifische Anlaufstelle)

In `Grenzen.tsx` Z. 122 die abstrakte Formulierung «auch für Männer» mit konkreten Stellen ersetzen (Männerhaus Schweiz, mannschafft.ch oder regionalspezifisches Angebot). Cross-Link von Soforthilfe.

### Zu P2-8 (DSM-5-Kriterien)

Optional: auf Verstehen-Page nach «Was Borderline im Kern so belastend macht» eine Aufklapp-Sektion oder ein hairline-getrennter Block mit den 9 DSM-5-Kriterien (knapp, 5 müssen erfüllt sein) — als Referenz, nicht zur Selbst-Diagnose. Alternativ: im neuen BPS-Glossar-Eintrag (P1-2) einbinden. Sicherstellen, dass die Brief-Entscheidung «kein Etikett-Framing» nicht verletzt wird — Lösung über Auf-/Zuklappen.

### Zu P2-9 (Selbsttest Frage 3)

Frage 3 in zwei Fragen aufteilen:

- Frage 3a: «Wie lange begleiten Sie Ihren Angehörigen schon?» (Zeit-Antworten)
- Frage 3b: «Gibt es eine offizielle BPS-Diagnose oder ist sie noch unklar?» (Status-Antworten)

Damit korrekt erfassbar, dass jemand 5 Jahre begleitet **und** keine Diagnose hat.

### Zu P2-10 (Sprachregelung erkrankt/betroffen)

Im Glossar oder in einem internen Style-Hinweis (nicht öffentlich) festlegen: «erkrankte Person» vs. «betroffene Person» vs. «Angehöriger» — wann welche Form. Vorschlag: «betroffene Person» als Default (weniger pathologisierend), «erkrankte Person» nur in spezifisch medizinisch-fachlichen Kontexten, «Angehöriger» konsistent mit «Sie».

---

## Auditor-Anmerkungen

- **Was nicht im Scope dieses Audits war:** Notfallkarte (`Notfallkarte.tsx`, 795 LOC) als interaktive Form-Komponente; SituationsWegweiser-Decision-Tree-Inhalt; Buchempfehlungen-Page; Materialien-Library im Detail; Handout-Textversionen (`handoutTextVersionContent.ts`, 3'089 LOC); Search-Index-Inhalte. Diese könnten in einem zweiten Audit-Lauf vertieft werden, insbesondere wenn die Notfallkarte als Druck-Material substanzielle Beratungstexte trägt.

- **Was diesem Audit auffiel, aber außerhalb Content-Scope liegt:** Die Site verwendet konsequent technische Single-Source-of-Truth-Patterns für Kontaktdaten (`data/kontakte.ts` mit `kontaktByIdStrict`) — das ist aus Content-Sicht ein wichtiger Faktor für Genauigkeit (keine veralteten Telefonnummern in Pages). Die Sicherheits-Hervorhebung (Alert-Wash-Backgrounds) bei kritischen Inhalten ist konsistent: Krise-Banner, Gewalt-Sektion in Grenzen, Notfall-Result im Selbsttest, Wegweiser-Hero. Das ist redaktionelle Sorgfalt sichtbar gemacht.

- **Was sich beim Lesen wiederholt aufdrängte:** Die Site hat eine erkennbare redaktionelle Stimme — leise, ehrlich, nicht beruhigend-im-falschen-Sinn, nicht alarmistisch. Der Pull-Quote-Hinweis «Kompositum, keine reale Person» bei Erfahrungsberichten ist wissenschaftlich sauber und vertrauensbildend. Diese Stimme ist die unterscheidende Stärke gegenüber generischer Psychoedukation.

---

**Ende des Audits.** Bericht enthält 10 P1- und 10 P2-Findings. Keine P0-Findings. Vorschläge sind gezielt formuliert, ohne Implementierung — Umsetzungs-Reihenfolge und Priorisierung beim Autor:innen-Team.
