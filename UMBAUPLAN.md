# Umbauplan · Borderline-Website ins PUK Website-Profil

Stand 08.10.2026 · Grundlage: Bestandsaufnahme `bestand/borderline-angehoerige/` (Branch `borderline-bestand`, Commit `5c8471c` der alten Website) · Profil 2026.10, Starter Build r4-3

Dieser Plan gehört zur Website `templates/website/borderline-angehoerige/`. Er hält die Entscheide der Fachstelle fest, legt die neue Struktur und den Visualisierungsplan im Entwurf fest und teilt den Bau in Etappen. Struktur und Technik hat Claude entschieden; inhaltliche Punkte stehen unter «Offen für W1».

## 1. Entscheide der Fachstelle (08.10.2026)

| Thema | Entscheid |
| --- | --- |
| Texte | **Straffen.** Claude kürzt Wiederholungen und Absicherungen, behält jede fachliche Aussage und belegt jede Änderung im Abgleich (Abschnitt 5). Ziel: etwa ein Drittel des heutigen Umfangs. Die Fachstelle prüft in W1. |
| Krisenbegleitung | **Behalten ohne Nummern**, als Psychoedukation zum Umgang mit Krisen. Keine Verweise auf «Soforthilfe»; es gilt nur der Zuständigkeitsverweis in der Fusszeile. |
| Personenillustrationen | **Weglassen.** Die fünf Szenen (Zuhören, Verbindungsmomente, zwei Perspektiven, Pause, Abstand) sind KI-generiert; das Profil schliesst generierte Personenbilder aus. |
| Handouts und PDFs | **Modelle in die Seiten.** Die Modelle der Handouts werden Figuren auf den Themenseiten; die 42 Textseiten entfallen. PDFs gibt es erst wieder, wenn sie im Handout-System neu entstehen. |

Durch das Profil bereits entschieden und nicht verhandelbar:

- Die Seite `/soforthilfe` entfällt, ebenso der Kopf-Link «Hilfe», alle Hinweise «Bei akuter Gefahr …: Soforthilfe» und der Krisenzweig im Selbsttest.
- Keine Telefonnummern und keine `tel:`-Links, auch nicht die Nummer der Fachstelle. Kontakt über `angehoerigenarbeit@pukzh.ch`. Angebote (Therapie, Beratung, Netzwerke) werden mit ihrer Website verlinkt, nicht mit Nummer.
- Absenderin im Kopf jeder Seite; Standard-Zuständigkeitsverweis in der Fusszeile; Hinweis «ersetzt keine individuelle Abklärung, Beratung oder Behandlung».
- Statisches PUK-Logo statt Leuchtturm-Favicon, Kompass-Icon und Aquarell-Leuchtturm (`og-image.jpg`).
- Rubik, Hausfarben, keine Schatten; keine eigenen Stile ausserhalb der Profil-Tokens.
- Interaktive Elemente, die Inhalte verstecken (Reiter in der Bedeutungsschleife, klickbares Rollen-Orbit, Auswahl-Widgets), werden zu sichtbaren Darstellungen.

## 2. Neue Struktur

Aus 72 Seiten (rund 65'000 Wörter) werden 15 Seiten. Richtwerte für den Umfang danach in Klammern.

| Seite (`id`) | Titel (Vorschlag) | Navigation | Kommt aus (alte Routen) |
| --- | --- | --- | --- |
| `index` | Borderline – Orientierung für Angehörige | Start | `/`, `/selbsttest`, `/wegweiser` (300) |
| `verstehen` | Borderline verstehen | Verstehen | `/verstehen` ohne Diagnostik-Teil; Handouts eisberg, alarm-modus, gehirn, zustands-landkarte, spaltung, anspannungskurve (1100) |
| `beziehungen` | Was zwischen Ihnen geschieht | Beziehungen | `/verstehen/beziehungen` (1000) |
| `diagnose` | Diagnose und Begleiterkrankungen | – (verlinkt aus Verstehen) | `/verstehen/diagnostik`, `/verstehen/begleiterkrankungen`, Diagnostik-Teil von `/verstehen` (1300) |
| `rolle` | Ihre Rolle klären | Ihre Rolle | `/unterstuetzen/uebersicht`, `/unterstuetzen/alltag`; Handouts rolle-klaeren, garten (Einflussbereiche), leuchtturm, schuld-verantwortung, drei-saeulen, konsistenz-prinzip, 4-alltags-tipps, 6-leitlinien, beziehungs-achtsamkeit, kinder (1200) |
| `behandlung` | Behandlung und Ihre Rolle darin | – (verlinkt aus Rolle) | `/unterstuetzen/therapie` (1000) |
| `kommunizieren` | Zugewandt und klar sprechen | Kommunizieren | `/kommunizieren`, `/uebungen`; Handouts zuhoeren-ohne-zustimmen, gespraeche-kippen, pause-statt-streit, wenn-worte-treffen, beispiel-dialog (1000) |
| `grenzen` | Grenzen setzen | Grenzen | `/grenzen`; Handouts 4-arten-von-grenzen, bruecke-gelaender, dear, grenzen-erkennen, grenzen-spickzettel, grenzen-ohne-eskalation, lmk, spiegeln-statt-aufsaugen (1200) |
| `krise` | Krisen begleiten | – (verlinkt aus Rolle, Kommunizieren, Grenzen) | `/unterstuetzen/krise`; Handout krisenkommunikation (800) |
| `selbstfuersorge` | Auf sich achten | Auf sich achten | `/selbstfuersorge`; Handouts sauerstoffmaske, energie-konto, warnsignale, stopp-technik, radikale-akzeptanz, erlaubnis-karte (1000) |
| `genesung` | Genesung | Genesung | `/genesung`; Handouts genesung-zahlen, remission-heilung, fortschritt-paradox, 5-faktoren-genesung, rolle-genesungsprozess (800) |
| `unterstuetzung` | Unterstützung finden | Unterstützung | `/fachstelle`, `/beratung`, `/buchempfehlungen` (600) |
| `fragen` | Häufige Fragen | – (Fusszeile) | `/faq` (1500; kurze Antworten mit Link auf die Themenseite) |
| `quellen` | Quellen und Begriffe | – (Fusszeile) | `/quellen`, `/glossar` (Quellenliste vollständig; Glossar nur Begriffe, die im Text vorkommen) |
| `ueber` | Über diese Website | – (Fusszeile) | `/ueber-uns`, `/impressum`, `/datenschutz`, `/barrierefreiheit`, `/feedback` (900) |

Entfallen ersatzlos, mit Begründung:

- `/soforthilfe`, `/materialien/text/notfallplan-krise`: Krisenorientierung, durch das Profil ausgeschlossen.
- `/selbsttest`, `/wegweiser`: Die Startseite bietet Einstiege nach Anliegen direkt sichtbar an («sichtbar vor versteckt»). Der Krisenzweig fällt ohnehin weg.
- `/materialien` und 41 weitere Textfassungen: Inhalte gehen in die Themenseiten (Zuordnung oben).
- `/uebungen` als interaktive Szenarien: zwei bis drei Beispiele «So könnte es klingen» auf `kommunizieren` und `grenzen` ersetzen sie.
- Personenillustrationen, Leuchtturm-Bildwelt, Ornamente.

Hauptnavigation: Verstehen · Beziehungen · Ihre Rolle · Kommunizieren · Grenzen · Auf sich achten · Genesung · Unterstützung. Die Bauetappe prüft, ob acht Punkte auf kleinen Bildschirmen tragen; sonst Vorschlag mit Begründung.

## 3. Visualisierungsplan (Entwurf)

Grundsatz «Verbinden statt doppeln»: Mehrere Handouts beschreiben denselben Mechanismus. Sie werden zu einer Figur zusammengeführt.

- Alarm-Modus, Hohe Anspannung, Zustands-Landkarte und Anspannungskurve → ein Kontinuum «Anspannung» auf `verstehen`.
- Garten, Leuchtturm, Rolle klären, Schuld und Verantwortung → ein Modell «Einflussbereiche» auf `rolle`.
- Bedeutungsschleife und das Beispiel «Beide versuchen etwas Verständliches» → ein Kreislauf mit durchgehendem Beispiel auf `beziehungen`.

Zeilen ohne Figur sind Text mit Begründung. Der Bau ergänzt die Textzeilen für jeden Abschnitt (eine Zeile pro `section`).

### Etappe 1 (verbindlich als Entwurf)

| Seite | `sectionId` | Format | Aussage | `understood` (Entwurf) | `entryPoint` |
| --- | --- | --- | --- | --- | --- |
| `verstehen` | `eisberg` | `layer-model` (K) | Sichtbar: Wut, Vorwürfe, Lautwerden, Rückzug. Darunter möglich: Angst, Scham, Trauer, Einsamkeit, Stress (Handout «Eisberg»). Was darunter liegt, ist von aussen nicht sicher erkennbar. Die Figur darf keine Zuordnung zwischen oben und unten nahelegen (so steht es heute im Text). | Dass Verhalten nur die Oberfläche zeigt und das Darunter offenbleibt; die Schichten zeigen das auf einen Blick, auch die Grenze des Wissens. | – |
| `verstehen` | `anspannung` | `continuum` (J) | Von «Denk-Modus» über «zunehmend angespannt» bis «Alarm-Modus»; je Bereich, was eher möglich ist: Gespräch · kurze Sätze, weniger Druck · Pause, Sicherheit vor Klärung. | Dass Gesprächsfähigkeit sich mit der Anspannung verschiebt und was in welchem Bereich hilft. Das Kontinuum zeigt den Übergang, den ein Text nur behaupten kann. | (J: optional) Bereich «zunehmend angespannt»: Tempo senken, Pause anbieten. |
| `verstehen` | `bewertungen` | `continuum` (J) | Pendel: sehr positive Bewertung ↔ differenzierte Sicht ↔ sehr negative Bewertung; unter Stress schwingt es weiter aus. | Dass Bewertungen unter Stress zu den Polen ausschlagen und die Mitte schwerer erreichbar wird. | – |
| `verstehen` | `mythen` | `comparison` (E) | Verbreitete Annahme ↔ was realistischer ist (aus «Häufige Mythen»). | Dass jeder Mythos direkt neben seiner Korrektur steht; der Vergleich macht die Verschiebung sichtbar. | – |
| `beziehungen` | `schleife` | `cycle` (B) | Ereignis → Bedeutung → Gefühl → Reaktion → Wirkung beim Gegenüber → neues Ereignis. Durchgehendes Beispiel: Die Schwester sagt einen Besuch ab. | Dass eine Reaktion beim Gegenüber zum neuen Anlass wird. Die Schleife zeigt das sofort, ein Text nur nacheinander. | Station «Bedeutung»: Beobachtung, Deutung und Gefühl trennen und nachfragen, wie etwas gemeint war. |
| `beziehungen` | `zwei-sichten` | `comparison` (E) | Dieselben vier Schritte des Beispiels aus Sicht der betroffenen Person und aus Sicht der Angehörigen. | Dass beide in jedem Schritt etwas Verständliches versuchen und sich trotzdem verfehlen; nebeneinander wird das sichtbar. | – |
| `grenzen` | `arten` | `figure` (A) | Vier Arten von Grenzen: körperlich, emotional, zeitlich, materiell, je mit Beispiel. | Dass Grenzen mehrere Lebensbereiche betreffen; die Figur zeigt die vier Bereiche gleichwertig nebeneinander. | – |
| `grenzen` | `bruecke` | `figure` (A) | Brücke mit Geländer: Verbindung (Kontakt), Geländer (Grenzen), Pfeiler (Absprachen, Pausen, Fachpersonen, Selbstschutz). Merksatz «Kontakt braucht Geländer». | Dass Grenzen Kontakt tragen statt ihn zu beenden; das Bild verbindet beides in einer Form. | – |
| `grenzen` | `reihenfolge` | `figure` (A, Raster 2×2) oder `text` | Dringlichkeit × emotionale Belastung; Bedrohung und Gewalt stehen davor: sofort schützen. | Im Bau prüfen: Zeigt das Raster mehr als eine geordnete Liste? Sonst Text mit Begründung. | – |
| `grenzen` | `dear` | `process` (C) | D Beschreiben → E Empfinden ausdrücken → A Anliegen nennen → R Verstärken (positive Folgen benennen). Fachmodell aus der DBT, mit Quelle. | Dass eine Grenze in vier Schritten aufgebaut wird und jeder Schritt eine eigene Aufgabe hat. | entfällt: Der ganze Ablauf beschreibt das eigene Handeln der Angehörigen. |
| `grenzen` | `kontakt` | `continuum` (J) | Wie viel Kontakt ist tragbar? Stufen aus dem Text: weniger Kontakt · vereinbarte Pause · getrenntes Wohnen · Trennung. Keine Stufe ist Pflicht oder Ziel; keine lässt sich aus der Diagnose ableiten. | Dass zwischen «wie bisher» und «Trennung» mehrere Möglichkeiten liegen. Im Bau prüfen, ob die Form eine Steigerung nahelegt, die der Text nicht meint. | – |

### Etappe 2 (Kandidaten, vor dem Bau verbindlich machen)

| Seite | Abschnitt | Format | Inhalt |
| --- | --- | --- | --- |
| `diagnose` | Weg zur Abklärung | `process` (C) | Fünf Schritte aus der alten Infografik «Den Weg zur Abklärung begleiten»; `entryPoint`: Schritt 1, eine Anlaufstelle anregen (anbieten, nicht erzwingen). |
| `diagnose` | Begleiterkrankungen | `text` | Die alte Grafik war eine Liste von sechs Diagnosen und zeigte keine Beziehung; Text ist klarer. |
| `rolle` | Einflussbereiche | `figure` (A, drei Zonen) | Was Sie anbieten können · was Sie selbst entscheiden · was ausserhalb Ihres Einflusses liegt (Garten-Bild). Fasst vier Handouts zusammen. |
| `behandlung` | Rollen im Behandlungssystem | `relationship-map` (I) | Person in Behandlung, Fachpersonen, Angehörige; je Beitrag und Grenze, sichtbar statt per Klick. |
| `behandlung` | Therapieformen | `comparison` (E) | DBT, MBT, TFP, Schematherapie: Ziel, Form, Einbezug von Angehörigen. |
| `kommunizieren` | Validierung | `stepwise-model` (G) | Sechs Stufen in Anlehnung an Linehan (DBT), von «Aufmerksam sein» und «Spiegeln» an aufwärts; Fachmodell mit Quelle. Handout «Zuhören ohne Zustimmen» (anerkennen, pauschale Schuld nicht übernehmen, Grenze und Plan) als Vertiefung. `entryPoint`: Stufe 1. |
| `kommunizieren` | Wenn Gespräche kippen | `process` (C) | Drei Schritte (aus Handout gespraeche-kippen); `entryPoint`: Schritt 1. Verweist für das Timing auf das Kontinuum «Anspannung». |
| `krise` | Wenn Belastung zunimmt | `continuum` (J) | Eigene Mittel tragen noch · reichen knapp · reichen nicht mehr; ausdrücklich keine Sicherheitsbewertung. |
| `selbstfuersorge` | Für andere und für sich | `tension-field` (H) | Fürsorge für die andere Person ↔ eigene Gesundheit; beide berechtigt. Sauerstoffmaske als Vertiefung. |
| `selbstfuersorge` | STOPP | `process` (C) | Fünf Schritte; `entryPoint` entfällt (eigenes Handeln). |
| `selbstfuersorge` | Warnsignale | `text` oder `continuum` | Im Bau prüfen, ob das Kontinuum aus `krise` genügt (dann Verweis statt zweiter Figur). |
| `genesung` | Genesung in Zahlen | `figure` (A) | Remission und Recovery über zehn Jahre (Zanarini 2010/2012), mit Quelle und Grenzen der Zahlen. |
| `genesung` | Remission und Recovery | `comparison` (E) | Begriffe nebeneinander. |
| `genesung` | Veränderung verläuft unterschiedlich | `figure` (A) | Unregelmässiger Verlauf mit Rückschritten, die das Erreichte nicht aufheben. |

## 4. Etappen

1. **Etappe 1 – Gerüst und drei Kernseiten:** `site.config.json` (Absenderin, Zuständigkeitsverweis, Navigation aller 15 Seiten als Entwurf), `index`, `verstehen`, `beziehungen`, `grenzen`. Danach Prüfung nach Profil (eigene Sitzung) und W1 durch die Fachstelle. **Zweck:** Kürzungsstil und Figuren an drei Seiten kalibrieren, bevor sie auf alle übertragen werden.
2. **Etappe 2 – übrige Themenseiten:** `diagnose`, `rolle`, `behandlung`, `kommunizieren`, `krise`, `selbstfuersorge`, `genesung`, `unterstuetzung`, mit den Erkenntnissen aus Etappe 1.
3. **Etappe 3 – Rahmen und Umzug:** `fragen`, `quellen`, `ueber`; Weiterleitungen; Export ins Repo `borderline-angehoerige` auf einem eigenen Branch. Die React-Fassung wird vorher als Branch `react-archiv` gesichert. Veröffentlicht wird erst, wenn alle Seiten den Prüfbericht vollständig haben.

Die alte Website bleibt bis zum Umzug unverändert online.

## 5. Regeln für das Straffen

- **Jede fachliche Aussage bleibt** oder ihr Wegfall steht im Abgleich mit Grund. Nichts verschwindet still.
- **Abgleich je Seite** in `abgleich/<seite>.md`: alte Route und Abschnitt → neuer Abschnitt; Status «übernommen», «gekürzt», «zusammengeführt mit …», «entfällt: Grund». Das ist der Beleg für W1.
- **Einschränkungen gezielt:** Eine Einschränkung steht dort, wo sie fachlich trägt (z. B. «Die Diagnose erlaubt keine Aussage darüber, ob von einem Menschen Gefahr ausgeht»). Wiederholte Absicherungen («kann», «mögliche», «nicht bei allen») in jedem Absatz entfallen. Eine allgemeine Einordnung pro Seite genügt, meist in der Vertiefung der Figur.
- **Meta-Texte entfallen:** «Worum es hier geht», «Das können Sie mitnehmen», Lesezeit, «Schritt n von 8», «Zuletzt redaktionell geprüft», Prüfvermerke zu Telefonnummern.
- **Wortlaut der Fachstelle schonen:** Gesprächsbeispiele («So könnte es klingen») und Merksätze werden wörtlich übernommen, wenn sie stimmen; nur gekürzt, nicht umformuliert.
- **Quellen:** Je Abschnitt in der Vertiefung (`details.puk-vis-more` bei Figuren, sonst kurzer Quellenhinweis mit Link auf `quellen`). Die Quellenliste wird vollständig übernommen; Uneinheitlichkeiten werden bereinigt (z. B. drei Ausgaben von «Schluss mit dem Eiertanz»), nicht still, sondern im Abgleich vermerkt.
- **Sprache:** Schweizer Hochdeutsch, «Sie», Guillemets, aus Sicht der Lesenden. Keine neuen fachlichen Aussagen.
- **Status:** `editorialStatus` «Entwurf – fachliche Prüfung ausstehend». Keine Freigabe, kein Prüfvermerk wird gesetzt.

## 6. Offen für W1 (Fachstelle)

1. **Suizidgedanken ansprechen** (`krise`): Der Abschnitt empfiehlt direktes Fragen. Das Profil erlaubt keinen seitenweisen Verweis auf Notfalldienste. Vorschlag: allgemeiner Satz «Holen Sie bei Sorge professionelle Einschätzung», ohne Stelle oder Nummer; die Fusszeile nennt die Wege. Zu entscheiden: genügt das fachlich?
2. **Gewalt und Bedrohung** (`grenzen`): Opferhilfe als Beratungsangebot mit Link auf die Website (ohne Nummer) – ja oder nein?
3. **Titel der Website:** Vorschlag «Borderline – Orientierung für Angehörige» (bisher «Borderline · Hilfe für Angehörige»). «Hilfe» kann nach Krisenhilfe klingen.
4. **Therapieangebote im Kanton Zürich** (`behandlung`, `diagnose`): Liste mit Links übernehmen; Stand und Angaben prüft die Fachstelle.
5. **Kinder** (`rolle`): Abschnitt «Wenn Kinder mitbetroffen sind» aus dem Handout «Kinder verstehen und entlasten» – reicht ein Abschnitt, oder braucht es mehr?

## 7. Weiterleitungen (Etappe 3)

Alle alten Routen leiten auf die neue Seite und, wo möglich, den passenden Abschnitt weiter (Netlify `_redirects`, Status 301). `/soforthilfe`, `/notfall`, `/notfallkarte` und `/notfallkarte.html` leiten auf die Startseite; deren Fusszeile enthält den Zuständigkeitsverweis. `/materialien/text/<id>` leitet auf den Abschnitt, in den das Handout eingegangen ist (Zuordnung Abschnitt 2).
