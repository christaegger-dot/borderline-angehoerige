# Audit 03 · Teilbericht G6

Lauf `2026-10-16-modul-03-r4-35` · Prüfstand Branch `claude/a8k-korrektur-1792143386`, Commit `ff5016b` (r4-35). Repository nur gelesen; `git status` nach dem Audit leer.

Seiten: `begriffe`, `quellen`, `suche`, `ueber`, `impressum-datenschutz` und die seitenweiten Texte (`site.config.json`, Kopf und Fusszeile aus `authoring/tools/contract.js`, Bedientexte aus `authoring/js/interaktion.js`, Trefferbeschriftung aus `authoring/tools/search-index.mjs`).

Befunde: `G6-befunde.csv`, 24 Einträge. P0: 0 · P1: 1 · P2: 7 · P3: 16. Alle Originale habe ich per Skript wörtlich in der Quelle wiedergefunden.

| ID | Seite | Stelle | Prio | Kern |
| --- | --- | --- | --- | --- |
| G6-001 | begriffe | §41 FU, Beispiel | P1 | «das Gericht anrufen» ohne «schriftlich» lädt zum Telefonieren ein; Frist zehn Tage |
| G6-002 | begriffe | §6 Borderline | P2 | DSM-5-TR und ICD-11 unerklärt (Pendenz R29-P06) |
| G6-003 | begriffe | §55 Recovery | P2 | Eintrag beginnt mit Studienendpunkt statt Wortbedeutung |
| G6-004 | begriffe | §89 Vertrauensperson | P2 | «Nicht gemeint ist die Person …» liest sich als Ausschluss |
| G6-005 | begriffe | §25–26 DEAR MAN | P3 | DBT unaufgelöst; doppelter Doppelpunkt im Beispiel |
| G6-006 | begriffe | §48 Komorbidität | P3 | PTBS unaufgelöst |
| G6-007 | begriffe | §51–52 Mentalisierung | P3 | vage Definition; Beispiel klingt nach Therapiesprache |
| G6-008 | begriffe | §74 Skills | P3 | Hinweise unter dem Etikett «Beispiel:» |
| G6-009 | quellen | einordnung §3–5 | P2 | Einordnung in Fachsprache, Verneinungskette |
| G6-010 | quellen | Kopf §3, description | P3 | «nach Funktion geordnet»; «Vollständige» gegen «nicht abschliessend» |
| G6-011 | quellen | §66 Porter | P3 | «weder notwendig noch hinreichend» |
| G6-012 | quellen | §9 Baranger, §24 Degasperi | P3 | Methodenjargon, «nicht essentialistisch» |
| G6-013 | quellen | §60 Linehan 1997 | P3 | Kunstwort «Pflichtfolge» |
| G6-014 | quellen | §84, §69, §93 | P3 | «der/die Review» neben «Übersichtsarbeit» |
| G6-015 | suche | §4 Leermeldung | P3 | Satz doppelt mit Statuszeile; Linktext nicht Seitentitel |
| G6-016 | suche | search-index.mjs Z. 67 | P3 | aria-label «… Fundstelle auf der Seite … öffnen», doppelt bei Seitentreffern |
| G6-017 | ueber | §8 | P3 | «Grenzen und Unterstützung» mehrdeutig |
| G6-018 | impressum | §9 Urheberrecht | P2 | Nominalstil; «nur privat» gegen «Angehörigenberatung» (Recht) |
| G6-019 | impressum | §2 Zwischentitel | P3 | «Anbieterin und verantwortlich» ungrammatisch |
| G6-020 | seitenweit | interaktion.js Z. 174/192 | P2 | Filterstatus «x von y Treffern» falsch; überschreibt HTML-Texte |
| G6-021 | seitenweit | interaktion.js Z. 517 | P3 | Status bei > 20 Treffern ohne Handlung |
| G6-022 | seitenweit | description diagnose, krise, kommunizieren | P2 | aneinandergereihte Abschnittstitel, unlesbar |
| G6-023 | seitenweit | acht weitere descriptions | P3 | Doppelungen, Kunstwörter, Erlaubniston |
| G6-024 | seitenweit | Fusszeile «Zuständigkeit» | P3 | nur Prüfbedarf, keine Ersatzfassung (Entscheid) |

## 1. Je Seite

### begriffe · Begriffe verständlich erklärt

**Blöcke gelesen: 94 von 94** (Lesefassung), dazu 9 von 9 `aria-label` und aus dem HTML die Texte, die in der Lesefassung fehlen: Sprungliste («Auf dieser Seite», «Begriffe von A bis Z»), Filter («Begriff suchen», Platzhalter «Zum Beispiel DBT oder Validierung», Status «Alle Begriffe sind sichtbar.», Leermeldung «Kein Begriff gefunden. …»). Alle 20 Links der 19 «Mehr dazu»-Zeilen führen auf die genannte Überschrift (geprüft gegen die Zielseiten); nur «Dissoziation» hat keine solche Zeile.

**Urteil.** Das Glossar ist sorgfältig und meist gut verständlich. Die Definitionen sind knapp, die Grenzen (keine Selbstdiagnose, keine individuelle Prognose, Grenze ohne Zustimmung) stehen klar und ohne Pathos. Die Schwächen liegen beim Quereinstieg: Abkürzungen ohne Auflösung (DSM-5-TR, ICD-11, DBT im Eintrag DEAR MAN, PTBS) und ein Eintrag «Recovery», der mit einer Studiendefinition beginnt. Rechtlich heikel ist ein Beispiel: «das Gericht anrufen» ohne «schriftlich», wo «Fragen und Nachschlagen» dieselbe Frist korrekt mit «schriftlich» nennt (G6-001). Der Satz zur Patientenverfügung im Eintrag «Vertrauensperson» kann als Ausschluss gelesen werden (G6-004).

**Kennzahlen** (1560 Wörter, 131 Sätze): Mittel 11,9 Wörter, Median 11, über 25 Wörter 3,8 % (fünf Sätze: Merkmalsliste Borderline 26, Co-Abhängigkeit 26, Buchstabenliste DEAR MAN 34, TFP 27 und 30; vertretbar, weil Aufzählungen), bis 6 Wörter 16 % (fast nur «Mehr dazu: «…»»-Zeilen), Verneinung 17,6 % (überwiegend nötige Grenzen wie «keine individuelle Prognose», «weder Zustimmung noch …»), «Sie müssen» 1 (Fehltreffer: «Sie» meint die Merkmale), «können» 1,5 je 100 Wörter, 41 Doppelpunkte (Etiketten «Beispiel:» und «Mehr dazu:»), «nicht … sondern» 1 (Komorbidität, sachlich begründet). Die Zahlen zeigen keinen Stakkato- oder Absicherungsüberhang.

### quellen · Quellen

**Blöcke gelesen: 269 von 269** (Lesefassung, identisch nummeriert in `text-v2`), dazu 6 von 6 `aria-label`, Sprungliste (acht Einträge), Filter («Quellen durchsuchen», Platzhalter «Autor, Thema oder Seite», Status «Alle Quellengruppen sind sichtbar.», Leermeldung). 82 Quellen, davon 7 ohne Einordnung; alle 82 Zeilen «Verwendet auf: …» gelesen. Bibliografische Angaben nur auf Sprache.

**Urteil.** Die Einordnungen sind fachlich vorsichtig und genau; viele Grenzen der Evidenz sind vorbildlich klar benannt. Die Seite ist aber für Fachleute geschrieben. Ausgerechnet der Abschnitt, der Laien sagen soll, wie verlässlich die Quellen sind, steht in Fachsprache («tragen medizinische Aussagen», «Evidenzstatus», «kuratiert, nicht vollständig bibliografisch») und widerspricht scheinbar der Seitenbeschreibung «Vollständige Quellenliste» (G6-009, G6-010). Einzelne Einordnungen, die Aussagen für Angehörige begründen (Ursache und Schuld, Neurobiologie, Validierung), brauchen eine laienverständliche Fassung (G6-011 bis G6-013). Die Zeilen «Verwendet auf: «Seite»» sind einheitlich, stimmen mit den Seitentiteln überein und sind als Metadatenzeile angemessen; kein Befund. (Der Auftrag nennt sie «Verwendet für …»; der tatsächliche Wortlaut ist «Verwendet auf:».)

**Kennzahlen** (5453 Wörter, 689 «Sätze»): Die 47,2 % Sätze bis 6 Wörter und die 156 Doppelpunkte entstehen fast ganz durch bibliografische Bruchstücke («Guilford Press.», «DOI: …», «WHO.») und die 82 Zeilen «Verwendet auf:»; sie sind kein Stakkato-Befund. Mittel 7,9 Wörter. Über 25 Wörter 1,6 %; die längsten Sätze (39, 37, 32) stehen in der Artikelliste zum ZGB, die als Nachschlageliste vertretbar ist. Verneinung 9,6 %, niedrig. Der Notizstil der Einordnungen («Klinische Stichprobe; stützt die Aussage «häufig», keine individuelle Prognose.») ist für eine Quellenliste üblich.

### suche · Website durchsuchen

**Blöcke gelesen: 46 von 46**, dazu 1 von 1 `aria-label`, aus dem HTML Label «Suchwort oder Frage» und Platzhalter, aus `interaktion.js` die Statusmeldungen (Zeilen 494 und 517) und aus `search-index.mjs` die Trefferbeschriftung (Zeile 67: Linkname, «Auf der Seite «…»», Auszug).

**Urteil.** Die Einleitung ist eine der besten Stellen der Website: kurz, konkret, mit klarer Datenschutzaussage. Das Seitenverzeichnis ist als Stichwortliste angemessen. Schwach sind der Zustand ohne Treffer (derselbe Satz zweimal untereinander, abstrakter Verweis; G6-015) und die vorgelesenen Linknamen der Treffer (G6-016). Bei mehr als 20 Treffern fehlt ein Hinweis, wie man eingrenzt (G6-021). Die Seitentreffer zeigen als Auszug die `description` der Seite; deshalb wirken die Befunde zu den Beschreibungen (G6-022, G6-023) direkt auf dieser Seite.

**Kennzahlen** (219 Wörter): Mittel 8,1 Wörter, kein Satz über 25 Wörter; die kurzen Einheiten sind Stichwortlisten des Verzeichnisses. Verneinung 11,1 % («weder übertragen noch gespeichert», «Ohne Suchwort», Leermeldung), sachlich.

### ueber · Über diese Website

**Blöcke gelesen: 41 von 41**, dazu 4 von 4 `aria-label` und die Sprungliste (vier Einträge).

**Urteil.** Die Seite ist zugewandt, ohne Pathos, und ehrlich über ihre Grenzen («nicht mit Angehörigen … getestet», keine vollständige Konformität, keine rasche Antwort). Die Rückmeldebitte mit dem Hinweis auf Anhänge und Bildschirmfotos ist konkret und respektvoll. Ein Satz im Grundsatz «Auf sich achten» ist mehrdeutig (G6-017). Ohne Befund, aber erwähnt: In «Warum es diese Website gibt» stehen drei Dreierreihen in einem Absatz und das Muster «Es geht nicht darum … Es geht darum …»; die Dreierreihe «Gespräche, Krisen und belastende Situationen» kehrt bei «Praxisnah» fast wörtlich wieder. Beides ist in Release C freigegeben und nicht klar verbesserungsbedürftig.

**Kennzahlen** (546 Wörter, 47 Sätze): Mittel 11,6, kein Satz über 25 Wörter. Verneinung 29,8 % ist hoch; sie stammt fast ganz aus notwendigen Offenlegungen (keine Krisenintervention, keine vollständige Konformität, nicht getestet, keine Diagnosen senden, keine rasche Antwort). Ich werte sie nicht als Befund.

### impressum-datenschutz · Impressum und Datenschutz

**Blöcke gelesen: 35 von 35**, dazu die Adresse (`address`, nicht in der Lesefassung) und die zwei externen Linktexte.

**Urteil.** Der Datenschutzteil ist konkret und verständlich (keine Cookies, was Netlify protokolliert, frühere Browser-Einträge, unverschlüsselte E-Mail). Der Impressumsteil hat übliche Haftungsformeln im Passiv, die ich als Rechtstext stehen lasse, einen ungrammatischen Zwischentitel (G6-019) und einen Urheberrechtsabsatz, dessen erlaubter Gebrauch widersprüchlich ist (G6-018, Recht). Weitere Vereinfachungen (etwa «Eine E-Mail wird nicht über diese Website verarbeitet.» → «Diese Website verarbeitet keine E-Mails.», der Abschnitt «Ihre Rechte») wären möglich, sind aber zu klein oder zu nah am Gesetzeswortlaut; ich habe sie nicht als Befund geführt.

**Kennzahlen** (570 Wörter, 48 Sätze): Mittel 11,9, über 25 Wörter 4,2 % (IDG/DSG-Absatz, Satz zu Auskunftsrechten mit 27 Wörtern), Verneinung 22,9 % (keine Cookies, keine Gewähr, keine Haftung), inhaltlich bedingt.

### Seitenweite Texte

**Gelesen:** alle 89 Konfigurationsfelder in `_seitenweit.md` (Titel, Navigationsnamen, 23 Beschreibungen, 23 `primaryTask`, Fusszeile, Absender), Kopf und Fusszeile zweier gebauter Seiten (74 Einträge, 10 Attribute), `interaktion.js` vollständig (572 Zeilen), dazu `contract.js` (Kopf, Brotkrumen, Logo-Name) und `search-index.mjs` (Trefferbeschriftung).

- **Titel und Navigation:** ohne Befund. «Übersicht» (Navigation, Brotkrumen) und «Startseite» (Titel, Suchtreffer) bezeichnen dieselbe Seite; das ist eine Strukturentscheidung, kein Sprachbefund.
- **Beschreibungen:** Elf der 23 sind gut. Drei sind aus Abschnittstiteln verschiedener Satzart zusammengesetzt und nicht lesbar (G6-022, P2), acht haben kleinere Mängel (G6-023, P3), eine widerspricht der eigenen Seite («Vollständige Quellenliste», G6-010). Sie sind sichtbar: als Auszug jedes Seitentreffers in der Suche und als `og:description` in Linkvorschauen. Suchmaschinen zeigen sie wegen `noindex` derzeit nicht.
- **`primaryTask`:** steht nur im unsichtbaren Suchindex (`data-search-text`), nirgends sichtbar oder vorgelesen. Deshalb keine Befunde. Hinweis: `genesung.primaryTask` «… den eigenen Einfluss begrenzen» meint vermutlich «die Grenzen des eigenen Einflusses kennen».
- **Fusszeile:** Selbstbeschreibung (W2-012) und Hinweis zur Abklärung ohne Befund; zum geprüften Zuständigkeitsverweis nur Prüfbedarf (G6-024).
- **Bedientexte `interaktion.js`:** Sichtbar oder vorgelesen sind nur die Texte von Filter (Zeile 192) und Suche (Zeilen 494, 517); die Akkordeons übernehmen die Überschrift. Die Schrittsteuerung («Ganzes Modell zeigen», «Schritt für Schritt aufbauen», «Schritt … von …», «Ganzes Modell sichtbar») und der Reiter-Rückfall («Reiter n») kommen auf keiner Seite vor (`data-vis-build`, `data-puk-tabs`: 0 Treffer in `site/`). Die Stoppwort- und Synonymlisten (`_seitenweit.md`, Zeilen 206 bis 254) sind interne Suchdaten.

## 2. Musterstellen (unverändert lassen)

**begriffe**
- Grenzen setzen: «Klar sagen, was für Sie möglich, sicher und tragbar ist. Grenzen können beide Seiten schützen. Eine Grenze braucht weder Zustimmung noch ein Versprechen auf späteren Kontakt.» Drei kurze Sätze, jeder mit eigener Funktion; entlastet, ohne zu bevormunden.
- Urteilsfähigkeit: «Sie wird immer für eine bestimmte Frage beurteilt: Jemand kann für eine Entscheidung urteilsfähig sein und für eine andere nicht.» mit dem Beispiel der 15-Jährigen. Ein schwieriger Rechtsbegriff wird in einem Satz und einem Alltagsfall greifbar.
- Schematherapie, Beispiel: «In der Therapie wird untersucht, welche alte Erfahrung bei einer heutigen Kränkung mitschwingt.» Konkret, bildhaft, ohne Fachwort.

**quellen**
- Bateman und Fonagy (2013): «die Haltung des Nicht-Wissens: neugierig nachfragen, wie etwas erlebt wird, statt innere Zustände zu unterstellen.» Ein Fachbegriff wird sofort in eine Handlung übersetzt.
- Blades et al. (2018): «Wurden Teilnehmende in Forschungsstudien nach Suizid gefragt, nahmen Suizidgedanken nicht zu, sondern leicht ab. Untersucht wurden Forschungssituationen, nicht Gespräche unter Angehörigen.» Befund und Geltungsgrenze in zwei klaren Sätzen.
- Guillén et al. (2024): «Günstigere Mittelwerte in der Gruppe mit Family Connections belegen keine Überlegenheit. Ein fehlender signifikanter Unterschied beweist auch keine Gleichwertigkeit der Angebote.» Präzise und ehrlich in beide Richtungen.

**suche**
- «Suchen Sie mit Ihren eigenen Worten.» und «Ihre Eingabe bleibt in Ihrem Browser. Sie wird weder übertragen noch gespeichert.» Kurz, beruhigend durch Information statt durch Floskel.
- «Ohne Suchwort können Sie eine Seite direkt auswählen.» Nennt die Handlung.

**ueber**
- «Prüfen Sie auch Anhänge und Bildschirmfotos auf solche Angaben.» Konkreter Schutzhinweis, den man sofort umsetzen kann.
- «Die Website wurde nicht mit Angehörigen oder Menschen mit Borderline-Erfahrung getestet.» Offen, ohne Rechtfertigung.
- «Menschen sind mehr als eine Diagnose. Die Texte beschreiben konkrete Situationen, ohne Motive, Beziehungsfähigkeit oder eine Gefahr für andere aus Borderline abzuleiten.»

**impressum-datenschutz**
- «Eine frühere Fassung dieser Website bot ein Werkzeug für persönliche Einträge an. Falls Sie es genutzt haben, können Ihre Einträge noch lokal im Browser auf Ihrem Gerät liegen. Sie wurden nicht an die Website übertragen. Entfernen können Sie sie in den Einstellungen Ihres Browsers.» Situation, Folge, Entwarnung, Handlung in vier einfachen Sätzen.
- «Gewöhnliche E-Mails sind nicht durchgehend verschlüsselt. Schreiben Sie nur, was Sie auf diesem Weg mitteilen möchten.» Klar und respektiert die Entscheidung der Lesenden.

**seitenweit**
- `kurz.description`: «Eine kurze Orientierung zu Gesprächen, Rolle, Grenzen, Erschöpfung, Kindern, Sicherheit und den wichtigsten nächsten Schritten.» Gleichartige Glieder, lesbar.
- `404.description`: «Diese Seite gibt es nicht. Von der Startseite aus erreichen Sie alle Seiten.»

## 3. Seitenübergreifende Muster

1. **Beschreibungen aus Abschnittstiteln.** Mehrere `description` reihen die H2 einer Seite aneinander, auch wenn diese verschiedene Satzarten sind (Nomen, Infinitiv, Wenn-, Was-Satz). Das ergibt Telegrammsätze, die in der Suche unter dem Seitentitel erscheinen (G6-022, G6-023). Bei neuen Beschreibungen: Themen in gleicher Satzart verbinden.
2. **Abkürzungen beim Quereinstieg.** Das Glossar setzt DSM-5-TR, ICD-11, DBT (im Eintrag vor «DBT»), PTBS und KESB voraus. Andere Seiten schreiben sie aus («Fragen und Nachschlagen»: KESB, PTBS). KESB habe ich nicht als Befund geführt, weil die Abkürzung in der Schweiz verbreitet ist.
3. **Etikett «Beispiel:» über Nicht-Beispielen.** S3 hat das beim Eintrag «Borderline» behoben, beim Eintrag «Skills» steht es noch (G6-008); grenzwertig auch beim Eintrag DBT (§30, eher Beschreibung als Beispiel).
4. **Methodenjargon auf «Quellen».** «multiples Testen», «Sensitivitätsanalysen», «nicht essentialistisch», «weder notwendig noch hinreichend», «Pflichtfolge», «Studienendpunkt», «Opt-in-Online-Panel». Für eine Quellenseite ist manches angemessen; wo die Einordnung eine Aussage für Angehörige begründet, sollte sie laienverständlich sein.
5. **Begriffswechsel.** «Evidenzstatus» (Quellen) gegen «wissenschaftlicher Stellenwert» (Über, freigegeben); «kuratiert» (Quellen) und «Eingeordnete Buchauswahl» (description) gegen «kommentierte Auswahl» (A03-033); «der/die Review» gegen «Übersichtsarbeit»; «Suchwörter» gegen «mit eigenen Worten».
6. **Generische Statusmeldungen im Profilcode** überschreiben seitenspezifische HTML-Texte (Filter) und arbeiten mit anderen Wörtern als die Suche («Treffern», «Einträge verfügbar» gegen «passende Inhalte»).
7. **Formel «keine individuelle Prognose»** (Begriffe 2-mal, Quellen 6-mal). Sachlich nötig und als Fachgrenze von E9 gedeckt; kein Befund, aber bei neuen Texten nicht weiter vermehren.
8. **Profiltexte ohne Befund:** `aria-label` «Weg durch die Seite» der Sprunglisten (sichtbar «Auf dieser Seite»), «Brotkrümelnavigation», «Zum Hauptinhalt», Logo-Name «Psychiatrische Universitätsklinik Zürich – Startseite Borderline – Orientierung für Angehörige». Frühere Prüfungen haben «Weg durch die Seite» als Profiltext gewertet; ich schliesse mich an.

## 4. Prüfbedarf

### Recht

- **G6-001** Begriffe › FU: «schriftlich» aus fragen › f-einweisung übernommen; Formerfordernis bestätigen.
- **G6-004** Begriffe › Vertrauensperson: Schliesst Art. 432 ZGB die in einer Patientenverfügung bezeichnete Person als Vertrauensperson aus? Die Ersatzfassung lässt es offen wie das Original.
- **G6-018** Impressum › Urheberrecht: Rechteinhaberin («der PUK», R29-P04) und Verhältnis «nur für den privaten, nicht kommerziellen Gebrauch» zu «im Rahmen der Angehörigenberatung» klären.
- **G6-019** Impressum › Zwischentitel, **G6-023 Teil 8** Beschreibung Impressum: sinngleich bestätigen.
- **R29-P04, unverändert offen:** «ein kantonal öffentlich-rechtliches Spital» (Datenschutz §2); rechtliche Bezeichnung der PUK prüfen.

### Fachlich

- **G6-002** Kurzerklärungen von DSM-5-TR und ICD-11 gegenlesen.
- **G6-009 / G6-010** Bezug von «nicht abschliessend» (Auswahl aus der Literatur) und Aussage «Alle Quellen dieser Website» bestätigen; Lesart von «schweizerisch-rechtliche Freigabe».
- **G6-012** Umschreibungen von «nicht essentialistisch» und «Sensitivitätsanalysen nicht robust».
- **G6-024** Fusszeile «Zuständigkeit» (geprüfter Wortlaut, keine Ersatzfassung): Überschrift als Signal für akute Sorgen; was «bei Gefahr» meint; E-Mail im Block nicht verlinkt; Satz zur Krisenintervention in einem anderen Block.
- **Quellen › Leichsenring et al. (2024), §54, ohne Befund:** «Für Medikamente gegen die Kernmerkmale fehlt eine verlässliche Wirksamkeit.» lässt sich als «wirken nicht» oder als «Wirksamkeit ist nicht verlässlich belegt» lesen. Welche Aussage die Quelle trägt, entscheidet die Fachstelle.
- **Begriffe › Die neun Kriterien, ohne Befund:** «Dysphorie», «dissoziative Symptome», «paranoide Vorstellungen» stehen ohne Erklärung. Die Liste gibt die DSM-Kriterien wieder; ob kurze Klammererklärungen zulässig sind, ist eine fachliche Entscheidung (S3 hat eine Gegenlesung empfohlen).
- **`genesung.primaryTask`, ohne Befund, nicht sichtbar:** «den eigenen Einfluss begrenzen».

## 5. Nicht geprüft

- **Darstellung und Verhalten im Browser.** Ich habe keine Seite gerendert. Was sichtbar oder vorgelesen ist, habe ich aus HTML, CSS und Skript abgeleitet (z. B. Sichtbarkeit der Statuszeile über `.puk-site-filter__status`, Überschreiben beim Laden über den Aufruf `renderFilter()` in Zeile 196). Umbrüche der längeren Ersatzfassungen (Beschreibungen, Glossar) prüft W3.
- **Screenreader-Ausgabe.** Nicht mit echtem Screenreader geprüft; die Befunde zu `aria-label` und Statusmeldungen beruhen auf dem Quelltext.
- **Fachliche und rechtliche Richtigkeit** der Glossarerklärungen, der Quellenangaben und Einordnungen; bibliografische Angaben nur sprachlich.
- **Produktion.** Geprüft ist `ff5016b`; `main` (`baf366d`) unterscheidet sich laut Freigabe r4-35 nur in fünf Textstellen anderer Seiten.
- **Lesefassung.** Filter, Sprunglisten und die Adresse im Impressum fehlen in `text/*.md`; ich habe sie im HTML gelesen. `text-v2/quellen.md` unterscheidet sich von `text/quellen.md` nur durch das Rollenmerkmal «Quellenliste»; die Nummern §n sind gleich.
- **Technischer Hinweis ohne Sprachbefund:** Die Suchtreffer der sieben Quellengruppen zeigen als Auszug den Schaltflächentext «Quellen dieser Gruppe anzeigen (n)» und danach den Anfang der ersten Literaturangabe (`search-index.mjs`, Auszug aus dem Abschnittstext). Das betrifft die Auszugslogik, nicht den Wortlaut.
