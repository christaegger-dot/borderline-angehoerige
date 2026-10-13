# Systematisches Website-Audit 01–05

**Prüfobjekt:** Borderline – Orientierung für Angehörige  
**Prüfstand:** `main` / `13a7e4f62754ab3c1c68c49329d88be3e0845912` / Build `r4-18`  
**Deployment:** `https://borderline-angehoerige.netlify.app`, Netlify-Deploy `6ace511614762f5a379993dd`  
**Auditdatum:** 13. Oktober 2026  
**Modus:** `bestand` nach Website-Audit-Koordinator V1.2  
**Gegenstand:** Audits 01–05. Audit 06 und eine Freigabeentscheidung sind ausdrücklich nicht Teil dieses Laufs.

## 1. Gesamturteil

Die Website hat gegenüber den früheren Auditständen einen deutlich konsolidierten, insgesamt tragfähigen Stand erreicht. Informationsarchitektur, mobile Darstellung, technische Stabilität, respektvolle Sprache und die Grundlogik der medizinischen und sicherheitsbezogenen Inhalte sind überwiegend stark. Die Produktion entspricht exakt dem geprüften Commit. Es bestehen keine Sackgassen, keine fehlenden internen Links oder Anker, keine in der 110-Läufe-Matrix erkannten Axe-Verletzungen, keine horizontalen Überläufe und keine neue technische Regression.

Der Stand ist dennoch nicht korrekturfrei. Drei unabhängige P1-Befunde sollten vor einem späteren Abschlussaudit behoben werden:

1. **A01-001 – Suchqualität:** Die Suche lädt ausdrücklich zu Fragen «mit eigenen Worten» ein, produziert bei natürlichen Formulierungen aber Null- oder Fehlertreffer. Das betrifft auch eine Suizidfrage.
2. **A02-001 – Datenschutzrecht:** Die Datenschutzerklärung ordnet die institutionelle Anbieterin pauschal dem Bundes-DSG zu, obwohl die PUK grundsätzlich dem Zürcher IDG untersteht. Weitere Transparenzangaben sind zu präzisieren.
3. **A04-001 – visuelle Priorisierung:** 30 sicherheits- und zuständigkeitsrelevante Hinweise werden deutlich kleiner als der Lesetext dargestellt.

Daneben bestehen 18 unabhängige P2- und 14 P3-Befunde beziehungsweise begründet zurückgestellte Hypothesen. Die Befundmatrix enthält zusätzlich zwei technische Querverweise auf bereits unter Audit 04 gezählte Befunde; diese werden nicht doppelt gezählt.

| Priorität | Unabhängige Befunde | Bedeutung |
|---|---:|---|
| P0 | 0 | Kein bestätigter akuter Blocker |
| P1 | 3 | Vor Abschlussaudit vorrangig korrigieren |
| P2 | 18 | Relevante fachliche, verständlichkeits-, visuelle oder funktionale Mängel |
| P3 | 14 | Redaktionelle Optimierungen, Robustheitsziele oder Hypothesen |

Dieses Urteil ist **keine** medizinische, juristische, Datenschutz-, WCAG- oder Produktionsfreigabe.

## 2. Nachweis des aktuellen Projektstands

- Repository: `https://github.com/christaegger-dot/borderline-angehoerige.git`
- Branch: `main`
- Commit: `13a7e4f62754ab3c1c68c49329d88be3e0845912`
- Commit: Merge von PR #670, Installation des Audit-Skills V1.2
- Kanonische Quelle: `authoring/`
- Erzeugtes Artefakt: `site/`
- Build: `r4-18`
- Produktionsprojekt: Netlify-Projekt `73a027a4-ef26-4767-b8c7-2784a75bb421`
- Produktionsdeploy: `6ace511614762f5a379993dd`, Zustand `ready`, Commit identisch
- Veröffentlichung: 13.10.2026, 15:41:25 UTC
- Produktions-URL: `https://borderline-angehoerige.netlify.app`
- Buildprüfung: 22 Seiten, 33 Dateien bytegleich, 0 Blocker, ein bekannter bibliografischer Hinweis `144`
- Indexierung: `robots.txt` sperrt Crawling, Meta- und HTTP-Header setzen `noindex,nofollow`. Dies ist Suchmaschinensteuerung, kein Zugangsschutz.

Der letzte inhaltliche Stand wurde mit PR #669 erreicht. PR #671 migrierte die Autorenquelle, PR #670 installierte das Auditverfahren. Gegenüber der Migration wurde keine Inhaltsänderung festgestellt.

## 3. Audit 01 – Informationsarchitektur und Nutzerführung

### Verifiziert erledigt

- 21 Inhaltsseiten plus 404 sind vollständig inventarisiert.
- Sechs Hauptbereiche, globale Direkteinstiege, Brotkrümel, Bereichsmarkierung, Seiten-Roadmaps und Anschlussnavigation bilden eine nachvollziehbare Grundstruktur.
- 897 interne Links, davon 507 Fragmentlinks, führen auf vorhandene Dateien und Anker.
- Es bestehen keine inhaltlichen Sackgassen. Alle regulären Seiten sind vom Hauptinhalt der Startseite in höchstens drei Übergängen erreichbar, die meisten in einem.
- Bücher, Begriffe, Quellen, Suche, Kinderseite und Kurzübersicht haben getrennte Funktionen. Keine neue überflüssige Seitendoppelung wurde festgestellt.
- Die früher fehlenden Startseiteneinstiege für Diagnose und Behandlung sind vorhanden.

### Offene Befunde

**A01-001, P1, belegt:** Die Suchlogik verwendet ein striktes UND über unveränderte Wörter. Reproduzierbare Beispiele:

- «Mein Sohn droht sich umzubringen» → 0 Treffer, obwohl `/krise#suizid` vorhanden ist.
- «Meine Tochter will keine Therapie» → 0 Treffer, obwohl `/fragen#f-keine-therapie` vorhanden ist.
- «Mein Partner lehnt Therapie ab» → 0 Treffer.
- «Warum ist sie bei anderen normal» → 0 Treffer trotz passender Frage.
- «Darf ich mit dem Arzt sprechen» → drei Treffer, aber «Nach der Krise» vor «Kontakt zum Behandlungsteam».
- Einwortsuchen wie «Suizidgedanken», «DBT» und «Einweisung» funktionieren.

Das verletzt Erwartungskonformität und Fehlertoleranz nach ISO 9241-110 sowie Nielsens Übereinstimmung mit der Lebenswelt. Der Sicherheitsbezug erhöht die Priorität.

**A01-002, P2, Struktur belegt/Wirkung heuristisch:** Die vorhandene Krisenorientierung ist von der Startseite nur über «Kurz und klar» und einen zweiten Link erreichbar. Der Zwischenlink signalisiert Sicherheit, Selbstgefährdung oder Gewalt nicht. Dies verlangt weder eine Telefonnummer noch einen globalen Notfallblock und widerspricht deshalb nicht dem aktuellen Institutionsentscheid.

### Aufgabenwege

| Aufgabe | Ergebnis |
|---|---|
| Ein Gespräch kippt | Start → Kommunikation, bestanden |
| Eigene Rolle unklar | Start → Rolle, bestanden |
| Grenze oder Gewalt | Start → Grenzen → Gewalt, bestanden |
| Kinder schützen | Start → Kinder, bestanden |
| Noch keine Diagnose | Start → Diagnose → ohne Diagnose, bestanden |
| Behandlung/Angebot Zürich | Hauptnavigation → Behandlung → Angebote, bestanden |
| Eigene Beratung | Start → Unterstützung → Beratung, bestanden |
| DBT nachschlagen | Suche → Glossar, bestanden |
| Akute Sorge um Sicherheit | technisch erreichbar, aber indirekt; A01-002 |
| Natürliche Suizidfrage | nicht bestanden; A01-001 |

## 4. Audit 02 – Fachlichkeit, Evidenz, Sicherheit und Praxisrelevanz

### Verifiziert erledigt beziehungsweise ohne Regression

- Diagnose- und Klassifikationslogik, Borderline-Musterqualifikator, DSM-Abgrenzung und Schweizer Kodierung sind im geprüften Detaillierungsgrad plausibel.
- Strukturierte Psychotherapie als Kernbehandlung, DBT/MBT/Schematherapie/TFP/generalistische Ansätze, fehlende gesicherte Rangfolge und Medikamente nicht als Kernbehandlung stimmen mit den geprüften Leitlinien und Reviews überein.
- Die Krisenseite delegiert keine Risikoeinschätzung an Angehörige. Direktes Fragen nach Suizidgedanken, professionelle Abklärung, Eigenschutz und sichere Mittelbeschränkung werden fachlich vorsichtig dargestellt.
- Gewalt wird weder erklärt noch entschuldigt. Distanz, Schutz und Polizei bei Gefahr haben Vorrang.
- Allgemeine Hinweise zu Kindesschutz und fürsorgerischer Unterbringung waren im geprüften Detaillierungsgrad vereinbar mit den herangezogenen offiziellen Quellen.
- 27 direkt verlinkte PubMed-Datensätze waren vorhanden und die verlinkten Metadaten plausibel.
- Neun zentrale regionale Angebote wurden auf ihren offiziellen Seiten nachgeprüft. Die nächste planmässige Angebotsprüfung ist am 14.04.2027 fällig.
- Die abgelaufene AWMF-Leitlinie wird transparent als in Überarbeitung bezeichnet.

### Offene Befunde

**A02-001, P1, belegt – Datenschutzrecht:** Die Aussage «Sie unterliegt dem Bundesgesetz über den Datenschutz» ist für die kantonal öffentlich-rechtliche PUK pauschal falsch. Die PUK selbst nennt das Zürcher IDG als grundsätzlich anwendbar. Zweck/Rechtsgrundlage, verantwortliches öffentliches Organ, Kategorien, Empfänger, Auslandbearbeitung und konkret ausübbare Rechte müssen mit einer freigegebenen institutionellen Fassung abgeglichen werden.

**A02-002, P2, belegt – zwei Literaturangaben:**

- Die Scham-Metaanalyse 2021 ist als Cavicchioli angegeben. Die identifizierbare Arbeit stammt von Buchman-Wildbaum et al., DOI `10.1521/pedi_2021_35_515`.
- Eine Metaanalyse «Leonards et al. (2024)» zur Empathie war nicht identifizierbar. Die passende Arbeit stammt von Blunden et al., DOI `10.1016/j.jad.2024.08.215`.

**A02-003, P2, belegt – Rückverfolgbarkeit:** Mehrere Einträge bestehen nur aus Autor, Jahr und Schlagwort. «Zanarini et al. (2024)» ist mehrdeutig. Alle neun Beziehungsquellen werden pauschal dem Abschnitt Verantwortung zugeordnet, obwohl mehrere erkennbar andere Aussagen stützen. Die frühere formale Quellenprüfung reicht deshalb nicht als semantischer Nachweis.

**A02-004, P2, belegt – Vertraulichkeit:** Minderjährigkeit ist keine generelle Ausnahme vom Berufsgeheimnis. Urteilsfähige Minderjährige haben ein eigenes Recht auf Vertraulichkeit. Bei Urteilsunfähigkeit entscheidet die konkrete gesetzliche oder mandatsspezifische Vertretungsbefugnis. Die Genesungsseite ist pauschaler als die Diagnose-Seite und intern inkonsistent.

## 5. Audit 03 – Verständlichkeit, Sprache, Empathie und Didaktik

### Gesamtqualität

Die Grundqualität ist hoch: respektvoll, entstigmatisierend, selbstbestimmungsorientiert und meist handlungsnah. Es gibt keine sprachlichen P0- oder P1-Befunde. Schweizer Standarddeutsch, Guillemets und Anrede sind grundsätzlich konsistent. Etikettierende Begriffe wurden nicht gefunden. «Manipulation» erscheint nur als kritisch widerlegte Annahme. Schuld, konkrete Verantwortung, Freiwilligkeit, Grenzen, Kontaktpausen und Trennung werden sorgfältig differenziert.

### P2-Befunde

| ID | Kurzbefund | Konkrete Richtung |
|---|---|---|
| A03-001 | Alte Seitennamen nach IA-Umbenennung | «Fragen und Nachschlagen» sowie «Alltag und Beziehungen» konsistent verwenden |
| A03-002 | «Psychoedukation» an drei Einstiegen unerklärt | Durch alltagssprachliche Erklärung ersetzen |
| A03-003 | «Ihre Belastung beraten lassen» grammatisch falsch | «sich wegen Ihrer Belastung beraten lassen» |
| A03-004 | TFP-Definition mit mehrdeutigem Genitiv | explizit sagen, wer die therapeutische Person wie erlebt |
| A03-005 | «versprechen, wie die andere Person reagiert» | «Wie die andere Person reagiert, liegt nicht bei Ihnen» |
| A03-006 | Diagnose-Einstieg zu abstrakt | Ort, Fachpersonen und Schritte konkret erklären |
| A03-007 | Kostenweg zu verwaltungsnah und dicht | vier konkrete Fragen an Praxis/Versicherung sichtbar machen |
| A03-008 | «emotional hoch/niedriger» unnatürlich | Dringlichkeit und Stärke der Belastung definieren |
| A03-009 | «Hilfe hat keine Wartefrist» kann Verfügbarkeit versprechen | Bezug zur Nachbesprechung ausdrücklich machen |

### P3 und Hypothese

- **A03-010:** Schnellorientierungen natürlicher und handlungsnäher formulieren.
- **A03-011:** grammatisch falsche Zielgruppenklammern auf der Bücherseite korrigieren.
- **A03-012:** zwei Glossardefinitionen grammatisch vervollständigen.
- **A03-013:** Schuld/Erleichterung erwachsener Kinder auf Grenzsetzung oder Abstand beziehen.
- **A03-014:** dichten 36-Wort-Methodensatz zur Selbstfürsorge teilen.
- **A03-015:** «Beziehung und Konflikt können gleichzeitig wahr sein» durch natürliche Zustandsbeschreibung ersetzen.
- **A03-016:** «Leisten Sie keine Aufarbeitung» natürlicher und weniger befehlend formulieren.
- **A03-017:** Co-Abhängigkeit sachlich einordnen statt mit einem Verbot beginnen.
- **A03-018:** doppelte Satzzeichen in drei textlichen Alternativen entfernen.
- **A03-H01:** Die mögliche Pflichtwirkung von «Krisen begleiten» bleibt eine nicht empirisch geprüfte Hypothese. Nur institutionell entscheiden, nicht als belegte Nutzendenwirkung darstellen.

Die sofort verwendbaren Ersatzformulierungen stehen in `BEFUNDE.csv` beziehungsweise sind dort als konkrete Formulierungsrichtung beschrieben. Fachlich sensible Ersatztexte sind vor Umsetzung auf Bedeutungsidentität zu prüfen.

## 6. Audit 04 – Visuelle Wissensvermittlung und PUK-Profil

### Verifiziert erledigt

- 105 Seiten-/Profil-Läufe und 50 Figurenläufe zeigten keinen horizontalen Überlauf und keine ausserhalb des Viewports liegenden Elemente.
- Alle zehn Figuren besitzen `aria-labelledby`, `aria-describedby`, genau eine strukturierte Screenreader-Beschreibung und dekorativ verborgene SVGs.
- Logo, Rubik, Blau-Weiss, ruhige Flächen und zurückhaltende Bildsprache entsprechen dem PUK-Profil grundsätzlich gut.
- Es gibt keine Fotos oder KI-Personen, dekorative Icon-Flut, Schatten- oder Verlaufseffekte.
- Historische Überlagerungen bei Eisberg, Schleife und Zwei Sichten sind behoben.
- Die Figuren sind über sieben Themenseiten sinnvoll verteilt und haben überwiegend konkreten Erkenntnisnutzen.

### Offene Befunde

**A04-001, P1, belegt:** 30 `.puk-longform__boundary`-Hinweise auf 13 Seiten stehen mit 16 px statt 21 px Lesetext, mobil 19 px. Ausgerechnet Safety- und Zuständigkeitsinformationen sind typografisch abgeschwächt.

**A04-002, P2, belegt:** Die 28-px-Ziffernmarker der Anspannungskurve skalieren bei 200 Prozent nicht mit dem Text. Ziffern berühren oder überschreiten den Kreisrand.

**A04-003, P2, belegt:** Bei schmaler Breite und 200 Prozent können Figurenwörter ohne sichtbaren Trennstrich mitten im Wort umbrechen. Ein realer Safari-Nachtest ist im aktuellen Projektstatus organisatorisch nicht vorgesehen. P-6 muss deshalb in den verfügbaren Zielbrowsern geprüft werden; die Safari-Lücke ist entweder ausdrücklich beizubehalten oder durch einen neuen Institutionsentscheid zu schliessen.

**A04-004, P2, belegt:** Die zehn zentralen Erklärungstexte der Figuren stehen mit 15 px deutlich unter dem Lesegrad. Sie sind keine blossen Bildunterschriften, sondern tragen wesentliche Einordnung.

**A04-005 bis A04-007, P3, heuristisch:** Eine doppelte Verneinung bei Momentaufnahmen, begrenzter zusätzlicher Erkenntnisnutzen der Tassenillustration und die Vermischung von Alltagsgrenze und Krisenplanung im DEAR-Kurztext sollten redaktionell/visuell optimiert werden. Ohne Nutzendentest wird keine Wirkung behauptet.

## 7. Audit 05 – Funktion, Interaktion, Technik und Barrierefreiheit

### Verifiziert erledigt

- 110 Chromium-Läufe: 22 Seiten × 320, 375, 768, 1024 und 1440 CSS-Pixel.
- 0 Axe-Verletzungen für die aktivierten WCAG-2.x-AA-Tags.
- 0 horizontale Überläufe, doppelte IDs, fehlende Hauptbereiche oder H1-Fehler.
- 0 JavaScript-, Konsolen- oder Ressourcenfehler, abgesehen von der erwarteten 404-Dokumentmeldung.
- Akkordeons funktionieren mit Maus, Enter und Leertaste; Pfeiltaste verschiebt den Fokus.
- Suche und drei Filter liefern Treffer, Nulltreffer und Statusmeldungen.
- Repräsentative FAQ-/Glossar-Deep-Links öffnen und fokussieren das Ziel.
- Der Skiplink ist beim ersten Tab sichtbar und fokussiert den Hauptinhalt.
- Eine unbekannte Route liefert HTTP 404 und einen verständlichen Rückweg.
- CSP, HSTS, `nosniff`, Referrer- und Permissions-Policy sowie X-Robots-Tag sind vorhanden.

### Offene Befunde

**A05-001, P2, belegt:** Mit deaktiviertem JavaScript bleiben auf Begriffe, Quellen, Behandlung und Suche sichtbare, fokussierbare, aber funktionslose Eingabefelder. Die Inhalte bleiben erreichbar; es entsteht deshalb kein P1-Inhaltsverlust, aber eine klare Erwartungsverletzung.

**A05-002/A05-003:** technische Querverweise auf A04-001 und A04-002, nicht separat gezählt.

**A05-004, P3, belegt:** Das E-Mail-Ziel im globalen Absender ist nur 23,25 CSS-px hoch. Die WCAG-Abstands-Ausnahme verhindert einen bestätigten 2.5.8-Verstoss; 44 px bleiben ein beschlossenes Robustheitsziel.

**A05-005, P2, belegt:** Das bekannte Druckpaket ist teilweise offen. Die frühere konkrete Leerseite vor «Zwei Sichten» ist lokal behoben und wurde in sechs A4-Einstellungen ohne Leerseite nachgeprüft. Noch offen sind die Ablösung dieser Lokallösung durch die allgemeine Profilregel P-1 und P-15: Sticky Abschnittsüberschriften werden für Druck nicht global auf statisch zurückgesetzt. Ein aktueller physischer Druck wurde nicht durchgeführt.

### WCAG-Einordnung

Die automatisierte Matrix ist ein starker Regressionsnachweis, aber keine WCAG-Konformitätserklärung. Reale Screenreader, Firefox/Safari, physische Tastatur, Touchgeräte, echter Browserzoom und Windows-Hochkontrastmodus wurden in diesem Lauf nicht vollständig real geprüft.

## 8. Abgleich mit älteren Audits und Pendenzen

| Älterer Punkt | Aktueller Status | Nachweis/Einordnung |
|---|---|---|
| P0-01/P0-02 direkte Krisenkontakte | formal unerfüllt, institutionell bewusst keine operative Pendenz | akzeptierte Restbeschränkung, nicht als neuer Blocker gewertet |
| P0-03 Angaben zur Angehörigenberatung/Kontaktkonsolidierung | teilweise erfüllt | kanonischer Kontaktweg umgesetzt; Telefon, Zeiten, Antwortfrist und bauliche Zugänglichkeit mangels bestätigter Angaben nicht erfüllt beziehungsweise nicht überprüfbar |
| P1-01/P1-02 Navigation/Position | verifiziert abgeschlossen | Hierarchie, Einstieg und Bereichsorientierung vorhanden |
| P1-03/P1-06 Stresslogik/lange Seiten | technisch und heuristisch umgesetzt | Wirkung ohne Nutzende nicht empirisch belegt |
| P1-04 FAQ | verifiziert abgeschlossen | Seite, Deep Links und Tastaturzustände funktionieren |
| P1-05 Redundanz/Content Ownership | verifiziert abgeschlossen | keine überflüssige Seitendoppelung gefunden |
| P1-07 Bücher | verifiziert abgeschlossen | eigenständige Seite und klare Zielgruppenstruktur, kleine Grammatikpunkte A03-011 |
| P1-08 Suche | technisch umgesetzt, inhaltlich wiedereröffnet | A01-001 zeigt systematischen Mangel bei natürlichen Fragen |
| P2 Glossar/Quellen | formal umgesetzt, inhaltlich teilweise wiedereröffnet | A02-002/003 und A03-004/012 |
| P2 Angebotsprüfung | aktuell verifiziert | nächste Prüfung 14.04.2027 |
| P2 Visualisierungen | technisch/heuristisch weitgehend erledigt | A04-001 bis 007 und AR3-5-Restpunkte |
| P3 reale Evaluation/AR3-3 | materiell nicht erfüllt, organisatorisch abgeschlossen | als Evidenzgrenze ausgewiesen, keine erneute Rekrutierungsauflage |
| Kurz und klar | umgesetzt | keine Behauptung Leichter Sprache, tatsächliche Wirkung ungetestet |
| AR3-1 Links | aktuell ohne bestätigten Defekt | 68 externe Ziele, ein temporär nicht verifizierbares NHS-Ziel |
| AR3-2 Produktion | aktuell unabhängig bestätigt | Deploy und Commit identisch |
| AR3-4 Quellenpaket | teilweise wiedereröffnet | formale Links gut, bibliografische/semantische Mängel A02-002/003 |
| AR3-5 Profilpaket P-1 bis P-15 | offen und terminiert | Start nach Depressionspublikation/16.11.2026, Zieltermin 13.01.2027 laut Projektstatus |
| R1-1 | offen | primär A04-001, technisch A05-002 |
| R2-1 bis R2-9 | verifiziert ohne Regression | zentrale Sprach- und Laienkorrekturen erhalten |
| SPZ-1 bis SPZ-6 | historisch verifiziert abgeschlossen | aktuelle einschlägige Inhalts-/Technikprüfungen und Migrationparität ohne festgestellte Regression; Abschlussnachweis am historischen Stand `d44c765` bleibt versionsgebunden |

### Veraltete Governance-Dokumentation

Einige historische Texte sind nicht mehr aktuell: Der Migrationsnachweis bezeichnet PR #671 noch als künftig/draft, `AGENTS.md` beschreibt den Audit-Skill-PR als Draft, ältere Berichte nennen veraltete Seitenzahlen, Indexierungsstände oder AR3-3-Fristen, und der PR-#669-Text nennt `r4-16` statt des tatsächlichen `r4-18`. Diese Stellen beeinflussen die Website-Nutzung nicht unmittelbar, sollten aber bei der nächsten Dokumentationspflege auf einen eindeutigen Statusverweis reduziert werden. Der aktuelle Pendenzenstatus hat für dieses Audit Vorrang.

## 9. Priorisierter Korrekturplan

### Paket 1 – P1 vor allen weiteren Optimierungen

1. **A01-001 Suche robust machen.**
   - Natürliche Fragen normalisieren, Stoppwörter und kontrollierte Synonyme behandeln, semantisch kontrollierten Fallback ergänzen.
   - Safety-Fragen gesondert regressionssichern.
   - **Akzeptanz:** mindestens 20 festgeschriebene Fragen, alle mit vorgesehenem Ziel in Top 3; keine Nulltreffer für vorhandene Safety-Inhalte; bisherige Einwortsuchen bleiben korrekt.

2. **A02-001 Datenschutztext rechtlich richtigstellen.**
   - Zürcher IDG als grundsätzlich anwendbares Recht, DSG nur konditional, vollständige Transparenzangaben.
   - **Akzeptanz:** widerspruchsfreie Fassung und dokumentierte Prüfung durch zuständige PUK-Rechts-/Datenschutzstelle.

3. **A04-001 Safety-/Zuständigkeitshinweise auf Lesegrad setzen.**
   - Profilpaket P-2 vorziehen oder gemeinsam mit AR3-5 umsetzen.
   - **Akzeptanz:** 30 von 30 Hinweisen entsprechen bei 100/200 Prozent dem angrenzenden Lesetext, ohne Reflow-Regressionsfehler.

### Paket 2 – fachliche und rechtliche P2

1. **A02-002/A02-003:** falsche Kurzbelege korrigieren, vollständige Bibliografie und Claim-to-Source-Zuordnung herstellen.
2. **A02-004:** Vertraulichkeit, Urteilsfähigkeit und Vertretungsbefugnis konsistent differenzieren.
3. **A03-009:** Krisennachsorge so formulieren, dass keine Verfügbarkeitsgarantie entsteht.

**Gemeinsame Akzeptanz:** DOI/PMID-Auflösung stimmt, 9/9 Stichprobenzuordnungen plausibel, rechtliche Logik auf Diagnose/Behandlung/Genesung konsistent und intern geprüft.

### Paket 3 – IA, Sprache und progressive Enhancement

1. **A01-002:** fachlich geprüften, direkten Sicherheitseinstieg auf der Startseite ergänzen.
2. **A03-001 bis A03-008:** Seitennamen, Fachbegriffe, grammatische Mehrdeutigkeiten und zentrale Verwaltungs-/Diagnosetexte bereinigen.
3. **A05-001:** Such-/Filterfelder erst nach erfolgreicher JavaScript-Initialisierung anzeigen.

**Gemeinsame Akzeptanz:** direkter Sicherheitsweg in einem Schritt, keine alten Seitennamen, jeder «Psychoedukation»-Einstieg erklärt, fachlich sensible Ersatztexte gegengeprüft, ohne JS keine funktionslosen Felder und weiterhin vollständige Inhalte.

### Paket 4 – terminiertes Profil- und Druckpaket AR3-5

- **A04-002/P-5:** skalierende Ziffernmarker.
- **A04-003/P-6:** robuste Worttrennung in den institutionell verfügbaren Zielbrowsern; fehlender realer Safari-Nachtest bleibt dokumentierte Evidenzgrenze, solange kein neuer Institutionsentscheid vorliegt.
- **A05-004/P-3:** 44-px-E-Mail-Ziel.
- **A05-005/P-1/P-15:** die bereits behobene spezifische Leerseite regressionsfrei in eine allgemeine Profilregel überführen und sticky Überschriften für Druck zurücksetzen.
- Übrige verbindliche P-1-bis-P-15-Punkte nach aktuellem AR3-5-Plan.

**Akzeptanz:** vollständige Profil-Regression bei 320/375/768/1024/1440 und 100/200 Prozent, Worttrennung in den verfügbaren Zielbrowsern sowie reale A4-Druckabnahme in den festgelegten Varianten. Nicht verfügbare reale Browser werden als nicht geprüft ausgewiesen.

### Separate P2-Profilerweiterung

- **A04-004:** Die Erklärungstexte der Figuren auf einen angemessenen Lesegrad setzen oder einen dokumentierten Designentscheid treffen. Dieser Punkt gehört nicht zum bereits beschlossenen Paket P-1 bis P-15 und benötigt einen eigenen Profilentscheid.

**Akzeptanz:** Erklärungstexte verwenden im breiten und schmalen Layout den Lesetextgrad oder einen dokumentierten, nachvollziehbar geprüften Lesetoken; kein Überlauf bei 320 bis 1440 px und 200 Prozent.

### Paket 5 – P3-Redaktion und visuelle Feinabstimmung

- A03-010 bis A03-018 redaktionell bereinigen.
- A04-005 bis A04-007 auf Satzverarbeitung, Visualisierungsnutzen und thematische Fokussierung optimieren.
- A03-H01 institutionell dokumentiert entscheiden, ohne eine ungetestete Wirkung zu behaupten.
- Historische Governance-Dokumente auf aktuelle Statusverweise reduzieren.

**Akzeptanz:** Regex-/Textprüfung ohne bekannte Fehler, fachredaktioneller Review, Text-Bild-Kongruenz bei 320/1440, keine neue semantische oder technische Regression.

## 10. Verbindliche Nachprüfung nach Korrektur

Nach Umsetzung der beschlossenen Pakete sollte zunächst ein Delta-Nachtest gegen exakt diesen Commit durchgeführt werden:

1. alle geänderten Befund-IDs gegen ihre Einzelakzeptanzkriterien;
2. vollständige Suchregression mit mindestens 20 natürlichen Fragen;
3. Quellen-/Rechtsprüfung mit dokumentierter institutioneller Bestätigung;
4. vollständige Build-, Link-, Browser-, Axe-, No-JS- und 200-Prozent-Matrix;
5. Prüfung der Worttrennung in den institutionell verfügbaren Zielbrowsern und reale A4-Druckprüfung für AR3-5; ein realer Safari-Lauf nur nach neuem Institutionsentscheid, andernfalls transparente Kennzeichnung als nicht geprüft;
6. erst danach Audit 06 an einem fixierten korrigierten Commit und dem dazugehörigen Deployment.

Reale Nutzenden- und Screenreader-Tests bleiben eine materielle Evidenzlücke. Da das Projekt den Nutzendentest organisatorisch ausdrücklich ausgeschlossen hat, wird daraus in diesem Bericht keine erneute formale Rekrutierungsauflage gemacht. Entsprechend dürfen aber Effektivität, Zufriedenheit, emotionale Wirkung und vollständige WCAG-Konformität weiterhin nicht als empirisch belegt bezeichnet werden.

## 11. Nächste Schritte

1. P1-Paket beschliessen und auf einem eigenen Korrekturbranch umsetzen.
2. Datenschutz- und Vertraulichkeitstexte parallel der zuständigen PUK-Rechts-/Datenschutzstelle vorlegen.
3. Fachlich sensible Sprachänderungen und Literaturkorrekturen durch die fachliche Redaktion bestätigen.
4. AR3-5 gemäss bestehendem Terminplan gebündelt durchführen.
5. Delta-Nachprüfung und anschliessend separates Audit 06.

Die vollständigen, maschinenlesbaren Fundstellen und Akzeptanzkriterien stehen in `BEFUNDE.csv`; tatsächliche und nicht durchgeführte Prüfungen in `TESTMATRIX.csv`; Quellen und Evidenzgrenzen in `QUELLEN.csv`.
