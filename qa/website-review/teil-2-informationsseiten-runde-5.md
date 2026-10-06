# Review Website Teil 2: Informations- und Interaktionsseiten – Runde 5

Prüfstand: `main` @ `fc4adaad` (06.10.2026). Geprüft wurden die zwölf in
Issue #630 noch offenen Informations- und Interaktionsseiten:

- `/faq`
- `/glossar`
- `/buchempfehlungen`
- `/quellen`
- `/beratung`
- `/fachstelle`
- `/ueber-uns`
- `/impressum`
- `/datenschutz`
- `/barrierefreiheit`
- `/feedback`
- `/uebungen`

Dieses Dokument ist ein KI-gestütztes fachlich-redaktionelles, konzeptionelles
und didaktisches Review. Es ist keine klinische, rechtliche, institutionelle
oder datenschutzrechtliche Freigabe. In dieser Runde wurden keine
Produktionsinhalte geändert.

## 1. Umfang und Grenzen

### Geprüft

- vollständige Inhaltsquellen der zwölf Routen
- zugehörige Laufzeit-Governance in `pageGovernance.ts`
- zentrale Einordnung in `WebsiteEinordnung.tsx`
- Szenarien, Antwortlogik und Ergebnisdarstellung der Kommunikationsübungen
- Abgleich mit dem projektinternen Entscheid zu Krisenwegen und Soforthilfe vom
  06.10.2026
- gezielte Primärquellenprüfung bei klar überprüfbaren bibliografischen,
  Leitlinien- und Accessibility-Aussagen

### Nicht durch dieses Review ersetzt

- klinische Prüfung von Sicherheits-, Medizin- und Selbsthilfeaussagen
- schweizerisch-rechtliche Prüfung von FU, KESB, Kindeswohl, Schweigepflicht,
  Haftung und Datenschutz
- formelle Festlegung der datenschutzrechtlich verantwortlichen Stelle
- institutionelle Bestätigung von Leistungen, Zuständigkeit und Publikation
- reale VoiceOver-, NVDA-, Tastatur- und Nutzendentests
- vollständige WCAG-2.2-Konformitätsprüfung
- vertragliche und technische Prüfung der tatsächlichen Netlify-Datenflüsse

## 2. Gesamturteil

Die Informationsseiten bieten viele nützliche Einordnungen und sind sprachlich
überwiegend respektvoll. Mehrere Seiten trennen inzwischen Diagnose, Person,
Autonomie und Angehörigenrolle sorgfältig. Für eine öffentliche Freigabe reicht
der Stand dennoch nicht:

1. Die Quellenseite enthält drei konkrete Tatsachen- beziehungsweise
   Reichweitenfehler.
2. Die FAQ bündelt medizinische, sicherheitsbezogene und schweizerisch-
   rechtliche Handlungsorientierung, ohne dass der aktuelle Text als
   entsprechend geprüft nachgewiesen ist.
3. Dynamische Angebots- und Kontaktdaten wirken durch Prüfbadges aktueller
   verifiziert, als die Governance belegt.
4. Datenschutz, Feedback und Impressum nennen noch keine abschliessend
   bestätigte Verantwortlichkeit und bilden wesentliche Datenflüsse oder
   Projektgrenzen nicht widerspruchsfrei ab.
5. Die Kommunikationsübungen wiederholen Nummern, verlangen eine
   Gefährdungseinschätzung und markieren eine Antwort als richtig. Das
   widerspricht dem gemergten projektinternen Entscheid, wonach Werkzeuge weder
   operative Kontakte duplizieren noch Triage vornehmen sollen.
6. Die Erklärung zur Barrierefreiheit listet umfassende Umsetzungserfolge auf,
   obwohl reale Screenreader- und vollständige Konformitätstests offen sind.

Die Seiten sind damit als Arbeitsstand brauchbar, aber noch nicht
publikationsreif.

## 3. Stärken

- Die FAQ unterscheidet Person, Diagnose und Absicht an mehreren Stellen und
  wahrt grundsätzlich die Behandlungsautonomie.
- Das Glossar macht Fachsprache auffindbar und ist nach Begriffen strukturiert.
- Die Buchempfehlungen kennzeichnen einzelne ältere oder problematische Werke
  bereits kritisch und behandeln Praxisliteratur nicht pauschal als
  wissenschaftliche Evidenz.
- `/beratung` bietet eine regionale Orientierung über verschiedene
  Unterstützungsformen statt nur eine einzelne Stelle zu nennen.
- `/fachstelle` nennt Beratungsgrenzen und beschreibt, dass keine Behandlung an
  der PUK und keine Vollmacht vorausgesetzt werden.
- `/ueber-uns` formuliert ausdrücklich einen Anti-Stigma- und
  Perspektivenstandard und trennt wissenschaftliche Evidenz von
  Angehörigenliteratur.
- `/datenschutz` nennt Hosting, lokale Speicherung und offene
  Verantwortlichkeitsfragen sichtbar, statt Sicherheit oder Anonymität einfach
  zu behaupten.
- Die Übungen enthalten bereits wichtige Caveats: keine universellen Rezepte,
  keine Wirkungsgarantie, freiwillige Behandlung und die Möglichkeit von Pause
  oder Gesprächsende.

## 4. P1 – vor einer Publikationsfreigabe korrigieren oder verantwortlich klären

### R5-P1-00 – Der gemergte Krisenweg-Entscheid ist im aktuellen Code noch nicht umgesetzt

- **Stelle:** `docs/governance/12-krisenwege-und-soforthilfe-entscheid-2026-10-06.md:39–145`;
  `client/src/components/HeaderNav.tsx:136–152`;
  `client/src/components/MobileMenu.tsx:192–199`;
  `client/src/components/Layout.tsx:116–129`;
  `client/src/components/interactive/KommunikationsUebung.tsx:83–119`;
  `client/src/components/Selbsttest.tsx:454–459, 619–665`;
  `client/src/pages/Wegweiser.tsx:57–103`;
  `client/src/pages/Impressum.tsx:143–146`;
  `client/src/routes.ts:111`;
  `client/src/domain/navigation.ts:30–49`;
  `client/public/sitemap.xml:99–107` und
  `client/public/soforthilfe/index.html:92, 112–117, 304–310`.
- **Beobachtung:** Der verbindliche Arbeitsentscheid aus #631 legt fest, dass
  nur `/soforthilfe` operative Kontakte publiziert, nicht akute Seiten einen
  zurückhaltenden nummernfreien Zugang verwenden, Werkzeuge keine automatische
  Gefährdungseinstufung vornehmen und die persönliche Notfallkarte öffentlich
  nicht mehr angeboten wird. Der aktuelle Code zeigt dagegen weiterhin einen
  hervorgehobenen Soforthilfezugang in Header und Mobilmenü, kopiert Nummern in
  Impressum, Wegweiser, Selbsttest und Kommunikationsübung, lässt Werkzeuge eine
  Krise beziehungsweise unmittelbare Gefahr ableiten und führt
  `/notfallkarte/erstellen` weiterhin als Route, Ressource und Sitemap-Ziel.
  Der beschlossene feste, nummernfreie Footer-Link fehlt. Selbst die zentrale
  Soforthilfe-Seite verlinkt noch auf die ausgeschlossene Notfallkarte und
  bezeichnet sich mit überfälliger Fachprüfung als redaktionellen
  Arbeitsentwurf.
- **Problem und Wirkung:** Issue #641 ist zwar geschlossen und seine
  Checkliste vollständig abgehakt, die überprüfbaren Produktionsdateien und
  Tests bilden diese Umsetzung jedoch nicht ab. Damit bestehen parallel zwei
  widersprüchliche Sicherheitsarchitekturen. Nutzer:innen können Werkzeuge als
  Triage verstehen; operative Angaben sind mehrfach verteilt und können
  auseinanderlaufen. Die abgehakten Prüf- und Freigabepunkte sind nicht durch
  die vorhandenen Nachweise gedeckt.
- **Empfehlung:** Das bestehende Umsetzungsissue #641 wieder öffnen und anhand
  des gemergten Entscheids tatsächlich abarbeiten. Keine zweite konkurrierende
  Krisen-Governance und kein Duplikat-Issue anlegen. Erst nach Codeänderung,
  aktualisierten Tests, namentlicher Inhaltsverantwortung, institutionellem
  Publikationsentscheid sowie den dokumentierten realen Perspektiven- und
  Accessibility-Prüfungen erneut schliessen.

### R5-P1-01 – Drei konkrete Fehler beziehungsweise Überdehnungen auf `/quellen`

- **Stelle:** `client/src/pages/Quellen.tsx:255–262`, `379–385` und
  `566–574`.
- **Beobachtung:**
  - Torgersen et al. wird mit PMID `10872917` verlinkt. Der passende
    PubMed-Eintrag ist PMID `11386989`. Die Oslo-Stichprobe berichtet für BPS
    0,7 Prozent, nicht die dort zusammengefassten «ca. 1–3 %».
  - Die englische dritte Auflage von _Stop Walking on Eggshells_ wird auf 2014
    datiert; der Verlag nennt Dezember 2020.
  - NICE CG78 wird als allgemeine Empfehlung von DBT bei BPS und wiederholter
    Selbstverletzung zusammengefasst. Empfehlung 1.3.4.5 ist enger: Frauen mit
    BPS, wenn die Reduktion wiederholter Selbstverletzung Priorität hat.
- **Problem und Wirkung:** Quelle, Aussage und Reichweite stimmen nicht überein.
  Die Quellenseite kann dadurch fachliche Sicherheit suggerieren, obwohl
  mindestens drei ihrer überprüfbaren Angaben falsch oder zu breit sind.
- **Empfehlung:** PMID und bibliografische Angaben berichtigen; die 0,7 Prozent
  als Ergebnis dieser konkreten Stichprobe darstellen; die NICE-Einschränkung
  wortgetreu abbilden oder neutral auf die Leitlinie verweisen.
- **Primärquellen:** PubMed PMID 11386989, offizielle New-Harbinger-Produktseite,
  NICE CG78 Empfehlung 1.3.4.5.

### R5-P1-02 – Die Hochrisiko-FAQ ist nach ihrer letzten Überarbeitung nicht ausreichend fachlich und rechtlich belegt

- **Stelle:** `client/src/pages/FAQ.tsx:86–205`, `231–313`, `414` und
  `569–596`; `client/src/data/pageGovernance.ts:130–135`.
- **Beobachtung:** Die Seite gibt Orientierung zu Suizid und Gewalt,
  fürsorgerischer Unterbringung, Kindesschutz/KESB, Diagnostik, Behandlung und
  Medikamenten. Der sichtbare Quellenblock deckt im Wesentlichen Prognose und
  Therapie ab. Der Text wurde am 02.10.2026 aktualisiert; als letzte fachliche
  Prüfung steht weiterhin der 16.04.2026. Trotzdem erscheint ein
  «Dokumentierte Fachprüfung»-Badge.
- **Problem und Wirkung:** Aktueller redaktioneller Text kann als medizinisch und
  schweizerisch-rechtlich geprüft gelesen werden, obwohl die dokumentierte
  Prüfung vor der Änderung liegt und zentrale Aussagen keine claim-nahe Quelle
  haben.
- **Empfehlung:** Sicherheits-, Rechts- und Medizinblöcke einzeln mit
  Primärquellen versehen; FU, KESB und Kindeswohl fachlich-rechtlich prüfen;
  erst danach ein neues Reviewdatum setzen. Das Badge muss eine spätere
  Textänderung gegenüber der älteren Fachprüfung sichtbar unterscheiden.

### R5-P1-03 – `/beratung` kennzeichnet dynamische Angebotsdaten irreführend als geprüft

- **Stelle:** `client/src/pages/Selbsthilfegruppen.tsx:141–142`, `326–418`;
  `client/src/data/pageGovernance.ts:110–115`;
  `client/src/components/LastVerifiedBadge.tsx:23–45`.
- **Beobachtung:** Derselbe Badge steht am Seitenkopf sowie unmittelbar bei
  HelpLine-Zeiten und VASK-Terminen. Für `/beratung` existiert aber kein
  `contactCheck`; der Badge fällt auf die allgemeine Fachprüfung vom 30.04.2026
  zurück.
- **Problem und Wirkung:** Veränderliche Zeiten, Termine, Kosten und Zugänge
  wirken organisationsbezogen und aktuell verifiziert, obwohl die Metadaten das
  nicht belegen. VASK-Telefon und die sichtbaren Termine stimmten beim
  Stichprobenabgleich; der Befund betrifft die fehlende belastbare Governance,
  nicht diese beiden Werte.
- **Empfehlung:** Pro Organisation Primärquelle, Prüfdatum, Geltungsbereich,
  Region, Zugang und Kosten hinterlegen. Organisationsbezogene Badges nur aus
  diesen Daten rendern; Stand by You und Pro Mente Sana separat bestätigen.

### R5-P1-04 – `/fachstelle` überschreitet den Umfang des dokumentierten Kontaktabgleichs

- **Stelle:** `client/src/pages/Fachstelle.tsx:24–45`, `58–155`;
  `client/src/data/pageGovernance.ts:144–155`.
- **Beobachtung:** Die Seite nennt unter anderem Psychoedukation, Vermittlung,
  Materialien sowie Schulungen und Weiterbildung. Der dokumentierte
  Kontaktabgleich deckt nur «Telefon und Zugang zur Angehörigenberatung» ab; die
  fachliche Wiederprüfung ist seit dem 24.09.2026 fällig.
- **Problem und Wirkung:** Ein institutionell wirkendes Leistungsversprechen
  wird weiter gefasst als sein ausgewiesener Nachweis.
- **Empfehlung:** Leitung beziehungsweise benannte Inhaltsverantwortung bestätigt
  jede Leistung, Zielgruppe, Zugangsvoraussetzung und den aktuellen Stand. Den
  Nachweisumfang von Telefon-/Zugangskontrolle und Leistungsprüfung trennen.

### R5-P1-05 – Das Glossar gibt eine unmittelbar anwendbare Kälteübung ohne Sicherheitsrahmen

- **Stelle:** `client/src/pages/Glossar.tsx:68–75`.
- **Beobachtung:** «Hände in eiskaltes Wasser» wird als Beispiel für einen Skill
  genannt, ohne Kontraindikationen, Dosierung, therapeutische Einordnung oder
  sichere Alternative.
- **Problem und Wirkung:** Ein Definitionsnachschlagewerk wird zur konkreten
  Selbsthilfeanleitung. Leser:innen können das Beispiel als allgemein sicher
  verstehen.
- **Empfehlung:** Durch ein risikoarmes Beispiel ersetzen oder nur mit
  klinisch geprüfter Sicherheits- und Individualisierungseinordnung führen.

### R5-P1-06 – Datenschutz und Feedback bilden Verantwortung und E-Mail-Datenfluss nicht publikationsreif ab

- **Stelle:** `client/src/pages/Datenschutz.tsx:50–71`, `84–107`, `125–164`,
  `229–242`; `client/src/pages/Feedback.tsx:37–52`.
- **Beobachtung:** Die Datenschutzerklärung sagt selbst, dass Rechtsgrundlagen,
  Rollenverteilung, Aufbewahrungsdauer und Verantwortlichkeit noch bestätigt
  werden. Gleichzeitig lädt `/feedback` zu einer «kurzen Schilderung Ihres
  Anliegens» per gewöhnlicher E-Mail ein. Verarbeitung, Aufbewahrung,
  Verantwortlichkeit und Zweck dieser E-Mails werden auf der Datenschutzseite
  nicht erklärt; ein Hinweis, keine sensiblen Gesundheits- oder
  Personendaten unverschlüsselt zu senden, fehlt.
- **Problem und Wirkung:** Gerade auf einer psychiatrischen Angehörigenseite
  können Rückmeldungen besonders schützenswerte Gesundheits- und
  Beziehungsdaten enthalten. Eine als Datenschutzerklärung publizierte Seite
  bleibt zugleich in zentralen Rollenfragen offen.
- **Empfehlung:** Vor Publikation verantwortliche Stelle, Kontakt, tatsächlichen
  E-Mail-Prozess, Zweck, Empfänger:innen, Aufbewahrung/Löschung und sichere
  Kontaktalternative verantwortlich klären. Bis dahin die Feedbackaufforderung
  auf nicht personenbezogene technische oder redaktionelle Hinweise begrenzen
  und ausdrücklich vor sensiblen Angaben in unverschlüsselter E-Mail warnen.
- **Prüfbedarf:** formelle Datenschutzprüfung; dieses Review trifft keinen
  Rechtsentscheid.

### R5-P1-07 – Die Datenschutzseite beschreibt ein Werkzeug, das öffentlich ausgeschlossen sein soll

- **Stelle:** `client/src/pages/Datenschutz.tsx:168–224`, `320–325`,
  `364–368`; Governance-Entscheid
  `docs/governance/12-krisenwege-und-soforthilfe-entscheid-2026-10-06.md:110–123`.
- **Beobachtung:** Die Seite erklärt die persönliche Notfallkarte als regulär
  nutzbares Werkzeug, beschreibt lokale Speicherung und verlinkt es. Der
  gemergte Projektentscheid verlangt dagegen für `/notfallkarte/erstellen` in
  der öffentlichen Produktion `404`, bis klinische, datenschutzrechtliche und
  nutzerbezogene Prüfung abgeschlossen sind. Bereits gespeicherte Krisenpläne
  existieren laut Entscheid nicht.
- **Problem und Wirkung:** Datenschutzerklärung und Navigationsangebot erwecken
  den Eindruck eines freigegebenen Produkts und widersprechen dem geltenden
  Zielzustand.
- **Empfehlung:** Solange das Werkzeug zurückgehalten wird, nicht als
  öffentliches Angebot beschreiben oder verlinken. Stattdessen den
  Entwicklungsstatus knapp dokumentieren; Detailtext erst zusammen mit einer
  allfälligen späteren Freigabe aktivieren.

### R5-P1-08 – `/uebungen` widerspricht der verbindlichen Krisen-Governance und automatisiert Gefährdungslogik

- **Stelle:** `client/src/components/interactive/KommunikationsUebung.tsx:83–119`;
  `docs/governance/12-krisenwege-und-soforthilfe-entscheid-2026-10-06.md:39–50`,
  `71–95` und `110–123`.
- **Beobachtung:** Szenario `set-2` verlangt von Angehörigen die Auswahl einer
  als korrekt markierten Antwort, die mögliche Selbstgefährdung und
  unmittelbare Gefahr abfragt und danach 144, psychiatrischen Notfalldienst und
  143 zuordnet. Nummern und eine abgestufte Handlungsregel werden direkt im
  Werkzeug wiederholt.
- **Problem und Wirkung:** Der gemergte Entscheid bestimmt, dass die Website
  keine Risikoeinschätzung oder Triage vornimmt, Werkzeuge keine operativen
  Kontakte duplizieren und `/soforthilfe` der einzige nutzerseitige
  Publikationsort dafür ist. Das Szenario verschiebt zudem erhebliche
  Abklärungsverantwortung auf die angehörige Person.
- **Empfehlung:** Krisenszenario aus dem Kommunikationstraining entfernen oder
  als nummernfreien Hinweis auf den zentralen Sicherheitsweg neu konzipieren.
  Keine Antwortoption soll eine eigenständige Triageleistung trainieren.
  Klinische und unabhängige Perspektivenprüfung vor Wiederveröffentlichung.

### R5-P1-09 – Das Impressum dupliziert operative Nummern und beansprucht ungeklärte institutionelle Verantwortung

- **Stelle:** `client/src/pages/Impressum.tsx:45–87`, `90–147`;
  `client/src/components/WebsiteEinordnung.tsx:4–17`.
- **Beobachtung:** Das Impressum nennt 144, 117 und 143 im Seitentext, obwohl
  `/soforthilfe` gemäss neuem Entscheid der einzige nutzerseitige
  Publikationsort ist. Gleichzeitig heisst es, die inhaltliche Verantwortung
  sei der Fachstelle zugeordnet, während institutionelle Freigabe und formelle
  Verantwortlichkeiten weiterhin offen sind.
- **Problem und Wirkung:** Kontaktkopien schaffen erneut Drift. Die
  Verantwortungsformulierung kann wie eine bestätigte institutionelle
  Zuweisung wirken, die der unmittelbar folgende Freigabevorbehalt nicht
  auflöst.
- **Empfehlung:** Nummern durch den zentralen nummernfreien Zuständigkeitshinweis
  ersetzen. Redaktionelle Urheberschaft, fachliche Inhaltsverantwortung,
  datenschutzrechtliche Verantwortung und institutionelle Publikationsfreigabe
  getrennt und nur bestätigt benennen.

### R5-P1-10 – Die Erklärung zur Barrierefreiheit macht unbelegte Vollständigkeitsbehauptungen

- **Stelle:** `client/src/pages/Barrierefreiheit.tsx:14–28`, `64–103` und
  `130–132`; dynamische Übung
  `client/src/components/interactive/KommunikationsUebung.tsx:450–575`.
- **Beobachtung:** Die Seite listet Tastaturnavigation für alle interaktiven
  Elemente, ARIA, AA-Kontraste, Fokusmanagement, responsives Design für alle
  Bildschirmgrössen und semantische Struktur als bereits umgesetzt. Zugleich
  sind reale Screenreader- und vollständige Nutzendentests offen; dynamisch
  eingeblendetes Übungsfeedback besitzt keine erkennbare Live-Region oder
  Fokusführung. Als Ziel wird WCAG 2.1 AA genannt, Stand April 2026.
- **Problem und Wirkung:** Eine Erklärung zur Barrierefreiheit darf keine
  umfassende Konformität nahelegen, die noch nicht geprüft ist. Seit Dezember
  2024 ist WCAG 2.2 eine W3C Recommendation; W3C empfiehlt für neue oder
  aktualisierte Accessibility-Policies die aktuelle Fassung.
- **Empfehlung:** Zwischen Ziel, automatisiert geprüft, manuell geprüft,
  geräte-/assistenztechnisch geprüft und noch offen unterscheiden. WCAG 2.2 AA
  als Ziel prüfen, Testumfang, Datum und bekannte Grenzen konkret nennen. Die
  Übungsrückmeldungen real mit VoiceOver und NVDA prüfen und Statusmeldungen
  semantisch zugänglich machen.
- **Primärquelle:** W3C, Web Content Accessibility Guidelines 2.2.

## 5. P2 – wichtige fachliche, konzeptionelle und didaktische Befunde

### R5-P2-01 – Governance-Risikoklassen widersprechen sich

`docs/governance/08-seiten-risikoklassifikation.md:59–69` führt FAQ als niedrig
und mehrere Informationsseiten nur als redaktionelle Pflege. In
`pageGovernance.ts:116–155` sind FAQ, Datenschutz, Quellen und Fachstelle hoch
eingestuft. Glossar, Buchempfehlungen, Übungen, Impressum, Barrierefreiheit,
Feedback und Über uns fehlen im Laufzeitregister vollständig.

**Empfehlung:** Eine normative Quelle festlegen. Risikostufe aus tatsächlichem
Inhalt ableiten: FAQ und Übungen wegen Safety/Legal hoch; Datenschutz hoch;
dynamische Angebote hoch; Bücher/Glossar und rechtliche Transparenzseiten mit
Owner, Reviewdatum und auslösendem Änderungsereignis erfassen.

### R5-P2-02 – Glossar vereinfacht Diagnose und Fachbegriffe

- **Stelle:** `client/src/pages/Glossar.tsx:30–55`, `94–103`, `189–194`.
- **Beobachtung:** Der Kriterienblock «5 von 9» steht ohne unmittelbaren Hinweis,
  dass daraus keine Selbst- oder Fremddiagnose folgt, und nennt DSM-5 statt
  DSM-5-TR. Dissoziation wird kategorisch als «Schutzreaktion des Gehirns»
  bezeichnet. Die Verbreitung von TFP in der Schweiz wird ohne Quelle
  eingeordnet.
- **Empfehlung:** Diagnostischen Kontext direkt am Kriterienblock nennen;
  Klassifikationsstand präzisieren; probabilistische statt kausale Sprache;
  medizinische Begriffe mit konkreten Quellen verbinden.

### R5-P2-03 – Buchempfehlungen vermischen institutionelle Empfehlung und persönliche Auswahl

- **Stelle:** `client/src/pages/Buchempfehlungen.tsx:151–180`, `260–274`,
  `401–407`, `448–480`, `505–520`.
- **Beobachtung:** Eine Rubrik heisst «Aktuell empfohlen», am Ende wird die Liste
  als «persönliche Auswahl» beschrieben. Verantwortliche Kurationsrolle,
  Kriterien und Prüfstichtag fehlen. Dynamische Absolutaussagen wie «einzige[s]
  deutschsprachige[s] Kinderbuch» oder «kein vergleichbarer deutschsprachiger
  Eltern-Ratgeber» sind nicht belastbar belegt.
- **Wirkung:** Die institutionell gestaltete Seite wirkt objektiver und
  aktueller als ihr dokumentierter Auswahlprozess.
- **Empfehlung:** «Redaktionell kuratierte Auswahl» mit Scope, Kriterien,
  Verantwortlichkeit und Stand. Absolutaussagen entfernen oder systematisch
  belegen.

### R5-P2-04 – Kinder- und Angehörigenliteratur braucht eine unabhängige Anti-Stigma-Perspektive

Beschreibungen wie Eltern könnten Liebe «nicht zeigen» und die breite
Übertragung einer Depressions-«Monster»-Metapher auf weitere Erkrankungen
vereinfachen Familienerleben und psychische Erkrankung. Problematische ältere
Titel sind teilweise gut eingeordnet, werden aber weiterhin stark sichtbar
geführt.

**Empfehlung:** Beschreibungen kontextspezifisch und nicht diagnosekausal
formulieren; kuratierte Liste unabhängig aus betroffener, angehöriger und – bei
Kinderbüchern – fachkundiger Kinder-/Elternperspektive prüfen. Aktuelle
Own-Voice- und Recovery-Perspektiven systematisch suchen.

### R5-P2-05 – Die Quellenseite ist eine Bibliografie, aber keine Claim-to-source-Matrix

Thematische Hinweise wie «bestätigt Recovery-Perspektive», Prävalenzangaben oder
«Grundlage für Anspannungskurve» sind redaktionelle Interpretationen. Sie werden
weder versionierten Seitenaussagen noch einem Prüfstand zugeordnet. Der
Suchindex verspricht pauschal «Studien, auf denen diese Website basiert».

**Empfehlung:** Quellen-ID, konkrete Aussage, Verwendungsort, Stand und
Evidenzrolle abbilden. Redaktionelle Synthesen als solche kennzeichnen; den
Suchtext relativieren.

### R5-P2-06 – `/beratung` und `/fachstelle` pflegen dieselben Leistungen doppelt

Fachstellenangebot, Kontakt und Nutzenversprechen stehen in
`Selbsthilfegruppen.tsx` und `Fachstelle.tsx`. Das erhöht das Veraltungs- und
Abweichungsrisiko.

**Empfehlung:** `/fachstelle` als kanonisches Profil mit strukturierten
Leistungs- und Kontaktdaten; `/beratung` als Angebotsfinder, der denselben
Datensatz nur kurz ausspielt und klar weiterverlinkt.

### R5-P2-07 – `/ueber-uns` beginnt trotz Anti-Stigma-Prinzip mit einem Konflikt- und Liebesskript

- **Stelle:** `client/src/pages/UeberUns.tsx:26–45`, `69–73`, `149–177`.
- **Beobachtung:** Der Prinzipienblock ist differenziert, die Motivation
  verallgemeinert jedoch «Sie lieben», Erschöpfung, Angst vor Fehlern und die
  nächste «Eskalation». Die ältere «Eiertanz»-Metapher erhält erneut prominenten
  Raum. «Tragfähiger reagieren» kann Angehörigen eine Regulationsaufgabe
  zuschreiben.
- **Empfehlung:** Unterschiedliche Beziehungen und Motive sichtbar machen; mit
  Orientierung und freiwilliger Unterstützung beginnen. Den historischen Titel
  nur dort nennen, wo seine kritische Einordnung fachlich notwendig ist.
  Handlungsfähigkeit als Arbeit an der eigenen Seite, nicht als Steuerung der
  erkrankten Person formulieren.

### R5-P2-08 – Family Connections wird positiver zusammengefasst, als die aktuelle Vergleichsevidenz erlaubt

`UeberUns.tsx:69–73` nennt «vielversprechende Studienergebnisse». Die neuere
randomisierte Studie fand gegenüber einer aktiven Vergleichsbedingung keine
statistisch signifikanten Gruppenunterschiede in den primären und sekundären
Ergebnissen, auch wenn sich beide Gruppen verbesserten.

**Empfehlung:** Programm und Evidenz getrennt beschreiben: untersuchtes
Angehörigenprogramm mit begrenzter Evidenz; keine Überlegenheit gegenüber
anderen aktiven Angeboten behaupten. Vollständige Studienreferenz auf der
Quellenseite zuordnen.

### R5-P2-09 – Die Übung sagt «kein starres richtig», programmiert aber eine richtige Antwort

- **Stelle:** `client/src/pages/Uebungsszenarien.tsx:41–59`;
  `client/src/components/interactive/KommunikationsUebung.tsx:17–24`,
  `44–271`, `459–550`.
- **Beobachtung:** Im Einführungstext gibt es kein starres Richtig/Falsch. Das
  Datenmodell verwendet dennoch `correct: boolean`, grüne Haken und eine
  «bevorzugte Alternative». Andere Optionen werden nach einem Klick deaktiviert.
- **Wirkung:** Kontextabhängige Kommunikation wird zu einer Quizlogik. Unter
  Stress kann dies die Botschaft vermitteln, Angehörige müssten nur den
  richtigen Satz finden, um das Gegenüber angemessen zu regulieren.
- **Empfehlung:** Auswahl als Perspektivenvergleich statt Test gestalten:
  mögliche Wirkung, Voraussetzungen, eigene Grenze und Situationen, in denen
  die Option nicht passt. Mehrere vertretbare Antworten zulassen und Wirkung
  nicht aus Farbe oder Haken ableiten.

### R5-P2-10 – Die Szenarien erzeugen kumulativ ein einseitiges Rollenbild

Die sechs Übungen zeigen die andere Person wiederholt vorwurfsvoll,
fordernd/suizidandeutend, absagend, behandlungszögerlich, stark beschwerdeführend
oder hoffnungslos. Die Angehörigenrolle soll jeweils ruhig, korrekt und
methodisch reagieren.

**Empfehlung:** Mindestens ein neutrales Beispiel für beidseitiges
Missverständnis und eines mit vertauschter Sprecherposition. Explizit machen,
dass alle Beteiligten verletzend reagieren, Grenzen setzen, pausieren und
Verantwortung für eigenes Verhalten übernehmen können. Gesamtablauf durch eine
Person mit eigener Borderline-Erfahrung und eine angehörige Person prüfen.

### R5-P2-11 – Rechtliche und institutionelle Einordnung ist nicht konsistent

`WebsiteEinordnung.tsx` sagt gleichzeitig, die Fachstelle trage die inhaltliche
Verantwortung, die Website sei kein offizieller PUK-Kanal und die
institutionelle Freigabe stehe aus. Das Impressum nennt dennoch
«Verantwortlich für den Inhalt» und umfassende evidenzbasierte Zwecke. Die
Datenschutzseite kann die formelle Verantwortlichkeit nicht benennen.

**Empfehlung:** Ein einziges Rollenmodell für alle Meta-Seiten:

1. redaktionell erstellt von,
2. fachlich geprüft durch,
3. datenschutzrechtlich verantwortlich,
4. technisch betrieben von,
5. institutionell zur Publikation freigegeben durch.

Offene Rollen nicht als zugeordnet darstellen.

### R5-P2-12 – Absolute Datenschutzaussagen brauchen technische und vertragliche Verifikation

`Datenschutz.tsx:103–107`, `212–215` und `235–242` sagt «keine weiteren
Drittanbieter-Dienste», beim geprüften Seitenaufruf kein Hosting-Cookie, keine
Weitergabe an Dritte und keine Nutzungsprofile. Hosting über Netlify wird
gleichzeitig beschrieben.

**Empfehlung:** Tatsächliche produktive Requests, Netlify-Funktionen, Logs,
Deploy-/Access-Schutz, Schrift- und Assetquellen sowie Verträge prüfen. Danach
präzise nach Zweck und Empfänger formulieren; Momentaufnahme eines einzelnen
Aufrufs nicht als dauerhafte Eigenschaft ausgeben.

## 6. P3 – redaktioneller und struktureller Feinschliff

- `/faq` ist mit vielen Akkordeons eher Wissenssammlung als kurze FAQ.
  Sicherheits- und Rechtsfragen als sichtbar geprüfte Wegweiser zu kanonischen
  Seiten führen, nicht als zweite Vollerklärung.
- `searchIndex.ts` beschreibt die FAQ als «Kriterien für psychiatrische
  Einweisung», obwohl die Seite gerade keine einfachen Kriterien liefern kann.
- Auf `/feedback` unterstellt «Ihr Engagement zeigt, dass Ihnen die Beziehung
  wichtig ist» ein bestimmtes Verhältnis und Motiv. Neutral danken, ohne Liebe,
  Fürsorge oder Bindung aus der Rückmeldung abzuleiten.
- Der Ausdruck «psychisch kranke Menschen» im Impressum kann durch
  personenzentrierte Sprache ersetzt werden.
- Die Aktualitätsangaben «Februar 2026» im Impressum und «April 2026» auf der
  Barrierefreiheitsseite sind nach den umfangreichen Änderungen im Oktober
  überholt.
- Urheberrechtlich ist «nur privat und nicht kommerziell» nicht eindeutig mit
  der gleichzeitig erlaubten Nutzung in der Angehörigenberatung abgestimmt.
  Nutzungsrechte als eigenes, juristisch geprüftes Lizenzmodell formulieren.
- Der formale historische Name einer Organisation soll nur als Eigenname,
  nicht als redaktionelle Personenbezeichnung verwendet werden.

## 7. Empfohlene Reihenfolge der Korrekturpakete

1. **Quellen und Hochrisiko-Fakten:** drei klare Quellenfehler, FAQ,
   Glossar-Sicherheitsbeispiel, Quellenmatrix.
2. **Krisen-Governance in Meta-Seiten und Übungen:** Nummernkopien entfernen,
   Übung ohne Triage, Datenschutztext zum zurückgehaltenen Werkzeug bereinigen.
3. **Datenschutz, Impressum und Feedback:** Rollen und tatsächliche Datenflüsse
   verantwortlich klären; danach Text neu freigeben.
4. **Kontakt- und Angebots-Governance:** `/beratung` und `/fachstelle`
   strukturieren, prüfen und aus einer Quelle rendern.
5. **Accessibility:** ehrliche Erklärung auf WCAG-2.2-Zielstand, technische
   Nachprüfung und reale Screenreader-/Tastaturtests.
6. **Anti-Stigma und Didaktik:** Übungsszenarien, Über-uns-Einstieg und
   Buchempfehlungen aus beiden Erfahrungsperspektiven prüfen.

## 8. Quellen und Prüfgrundlagen

- W3C: Web Content Accessibility Guidelines 2.2,
  https://www.w3.org/TR/WCAG22/
- NICE CG78, Empfehlung 1.3.4.5,
  https://www.nice.org.uk/guidance/cg78/chapter/Recommendations
- Torgersen et al. (2001), PubMed PMID 11386989,
  https://pubmed.ncbi.nlm.nih.gov/11386989/
- New Harbinger: _Stop Walking on Eggshells_, Third Edition,
  https://www.newharbinger.com/9781684036899/stop-walking-on-eggshells/
- Family Connections RCT, PubMed PMID 39624006,
  https://pubmed.ncbi.nlm.nih.gov/39624006/
- PUK Zürich, Informationen für Angehörige,
  https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/
- projektinterner Arbeitsentscheid zu Krisenwegen und Soforthilfe:
  `docs/governance/12-krisenwege-und-soforthilfe-entscheid-2026-10-06.md`

## 9. Offene menschliche Gates

- klinisch verantwortete Prüfung von FAQ, Glossar, Übungen und sämtlichen
  Sicherheitsformulierungen
- schweizerisch-rechtliche Prüfung der FAQ- und Impressumsangaben
- formelle Datenschutzprüfung von Hosting, E-Mail und allfälliger lokaler
  Speicherung
- institutionelle Bestätigung von Verantwortung, Leistungsspektrum und
  Publikationsrolle
- unabhängige Perspektivenprüfung durch mindestens eine Person mit eigener
  Borderline-Erfahrung und eine angehörige Person
- reale Tests mit VoiceOver, NVDA, Tastatur, mobilen Geräten und Zielgruppe
