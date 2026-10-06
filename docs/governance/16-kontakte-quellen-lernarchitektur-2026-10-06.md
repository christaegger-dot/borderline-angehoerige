# Kontakte, Quellenmatrix und Lernarchitektur · 06.10.2026

Dieses Paket setzt die vom Nutzer beauftragten Folgearbeiten nach PR #656
(`c5b6f6b`) um. Es ergänzt Quellenbelege und eine gemeinsame Lernarchitektur.
Klinische, rechtliche, institutionelle und perspektivenbezogene Prüfungen
werden dadurch nicht als erledigt erklärt. `CURRENT_PUBLICATION_STATUS`
bleibt `pending`.

## Die neun offenen Nummernabgleiche

Für die neun zuvor offenen Kontakte wurden direkt lesbare Anbieterquellen
mit Fundstelle, Prüfdatum und HTTP-Status dokumentiert. Damit sind die
**26 Telefonnummern** des Registers im jeweils angegebenen Umfang belegt.
Die Nummern und die `tel`-Werte im Register wurden nicht geändert.

- **KIZ:** Die Betreiberseite bestätigt 058 384 65 00 mit Durchwahl 4.
  Der statische Direktlink ist wieder sichtbar, mit dieser Durchwahl und
  Anbieterbeleg. Die kantonale Nummer 044 296 73 10 weicht weiterhin ab;
  Ursache, Weiterleitung und tatsächliche Erreichbarkeit sind ungeklärt.
- **HYPE:** 058 384 66 00 ist als allgemeine Nummer des KJPP-Ambulatoriums
  Zürich belegt. Registerlabel und sichtbare Angaben in Diagnostik/Therapie
  sind berichtigt. Die historische interne ID bleibt kompatibel; eine direkte
  HYPE-Programmlinie wird nicht behauptet. Die offizielle Programmseite
  liefert den aktuellen Kontaktweg. Eine bestehende allgemeine Ambulatorium-Mail
  wurde anhand der Standortquelle berichtigt; der alte unspezifische Mail-Link
  wurde aus der HYPE-Karte entfernt.
- **IPW:** 052 264 34 00 gehört zur Psychotherapiestation für junge Erwachsene.
  Beide Seiten benennen diese Station und verlinken deren Anbieterquelle.
  Widersprüchliche Altersangaben werden nicht als bestätigte Aufnahmebedingungen
  übernommen.

Ein Nummernbeleg ist kein Testanruf und keine Prüfung aller Leistungen,
Öffnungszeiten, Aufnahmewege oder Zuständigkeiten. Namentliche Verantwortungen
und das abschliessende Fachstellenprofil bleiben offen.
Primärbelege: [Kontaktbericht](../../qa/contact-verification-followup-2026-10-06.md).

## Quellenmatrix

`client/src/content/claimSources.ts` ordnet Aussagen mit Verwendungsort,
Quellenversion, Fundstelle, Reichweite und Prüfstatus zu. Medizinische,
sicherheitsbezogene und schweizerisch-rechtliche Aussagen bleiben von
redaktionellen Gesprächsanregungen getrennt. Quellenbezug, Kontextquelle und
offene Fachprüfung sind keine gleichwertigen Nachweise.

Alle 27 FAQ-Fragen erhalten lokale Belegbereiche. Zusätzlich werden
Glossarbegriffe, DSM-Kriterien und priorisierte Kernseiten-Aussagen erfasst.
Die 79 Datensätze umfassen 40 FAQ-Teilaussagen, 23 Glossar-Zuordnungen für
22 Begriffe samt separater DSM-Kriterienliste und 16 priorisierte Kernteilaussagen.
Die Kernzuordnungen umfassen insbesondere Klassifikation/Kodierung,
Medikation, Depressions-/Suizidversuchs-Zusammenhang, die tatsächlichen
Zanarini-Kohortenendpunkte und Family-Connections-Studien. Korrekturen betreffen
insbesondere
die Voraussetzungen und Zuständigkeiten bei FU, Melderecht/Meldepflicht und
Kindesschutz sowie unbelegte pauschale Angaben zu stationären Aufenthalten.
Die rechtlichen Fundstellen beziehen sich auf die gelesene ZGB-Fassung vom
01.07.2026; sie ersetzen keine schweizerisch-rechtliche Prüfung des aktuellen
Wortlauts. Der Verlag bestätigt Dezember 2020 für die englische dritte Auflage
von _Stop Walking on Eggshells_.

Ein ergänzendes Textstelleninventar von 13 Kernseiten und den ausdrücklich
aufgeführten eingebundenen Autorendateien bindet 1’738 Textstellen in 24 Dateien.
Der genaue
Scope steht in [der Dateiliste](../../qa/claim-source-core-inventory.json).
Kontextquellen und noch nicht individuell
zugeordnete Formulierungen bleiben erkennbar; die Textinventarisierung ist kein
Beweis, dass jeder Satz durch eine passende Primärquelle gestützt wird.
Die Tests verhindern unbemerkte Drift zwischen Inventar, FAQ und Datenstruktur.
Der neue CI-Schritt prüft diese Parität bei jeder Änderung. In der Negativprobe
wurde ein vorübergehend geänderter Kerntext zurückgewiesen; nach Wiederherstellung
bestand derselbe Guard.
Scope und offene Nachweise: [Quellenmatrix](../../qa/claim-source-matrix-2026-10-06.md).

## Kanonischer Lernweg

Ein gemeinsames Register steuert acht Hauptschritte und sechs Vertiefungsrollen:
Orientierung → Verstehen → eigene Rolle → Kommunikation → Grenzen/Sicherheit →
eigene Gesundheit/Unterstützung → Genesung → Vertiefung/Unterstützung finden.
Die Reihenfolge bleibt freiwillig. Akuthilfe und Beratung sind direkt erreichbar;
die Schrittposition ist kein gespeicherter Lern- oder Sicherheitsstatus.

Die Seiten haben Funktion und Lernziel sowie gemeinsame Vorwärts-/Rückwärtslinks.
Zwölf Kernthemen haben einen führenden Erklärungsort; konkurrierende Weiterblöcke
wurden ersetzt und ausgewählte Wiederholungen auf ihre jeweilige Funktion
begrenzt. Elf Webtexte sind nach Anliegen kuratiert. Entwurfsstatus bleiben
sichtbar; die Auswahl gibt keine zurückgehaltenen Grafiken frei.

Fünfzehn Modelle unterscheiden wissenschaftlichen Theoriebezug, klinische
Gesprächsheuristiken und eigene didaktische Darstellungen. Quellen stützen
benannte Bezugspunkte, keine Grafikvalidität oder individuelle Wirkung.
Ein enger Ankerfix sorgt dafür, dass normale Links zu Abschnitten derselben
Seite auch geschlossene Inhalte öffnen und tatsächlich dorthin führen.
Materialkarten-Aktionslinks haben nach einem tatsächlichen Browserbefund
mindestens 44 Pixel Höhe. Der Hinweis zur Spurensicherung auf Grenzen und
statischer Soforthilfe verweist auf das direkt zu klärende Vorgehen statt einer
pauschalen Verfahrenszusage.
Details: [Lernarchitektur](../learning-architecture-2026-10-06.md).

## Technische Prüfung

Lokal bestanden:

- 641 Tests in 69 Dateien, Lint, Typprüfung, Formatprüfung und Produktionsbuild.
- Quellenregister-Guard für 79 Aussagen und 1’738 Textstellen sowie die oben
  beschriebene negative Driftprobe; Material- und P1-Illustrationsguards.
- 180 Fälle im neuen Quellen-/Lernweg-Browsercheck bei 360, 768 und 1440 Pixeln:
  51 Seitenprüfungen mit axe-WCAG-Regeln und ohne Overflow, 42 Vorwärts-/Rückwärts-
  Tastaturwechsel, 21 tatsächliche Abschnittsklicks auf derselben Seite,
  63 Erklärungsziele und alle 27 geöffneten FAQ-Antworten mit lokalen Belegen
  in jeder Breite. Keine JavaScript-Laufzeitfehler.
- 62 Fälle des bestehenden Folgechecks mit aktualisierten KIZ-Assertions sowie
  eine zusätzliche Prüfung der finalen statischen Soforthilfe ohne JavaScript.
  Nach der letzten statischen Formulierungskorrektur bestanden erneut ihre
  sieben Regressionstests.
- 33 visuelle Regressionstests im normalen Vergleichslauf. Absichtlich geänderte
  Ansichten wurden geprüft und ihre Referenzbilder aktualisiert. Bildtoleranzen
  und Assertions wurden nicht abgeschwächt; vor dem Dekodieren lazy geladener
  Materialbilder werden die Karten in den Viewport geholt.

Die GitHub-Checks werden vor dem Merge auf dem finalen PR-Commit geprüft.
`qa/scripts/audit-sources-learning-web.mjs` und der Quellenregister-Guard sind
zusätzlich in die PR-Workflows eingebunden. Diese Browserautomation ersetzt keine
reale Journey- oder Hilfsmittelprüfung.

## Weiter offen

- Reale klinische und schweizerisch-rechtliche Prüfung, benannte Verantwortung,
  institutioneller Entscheid und Publikationsfreigabe.
- KIZ-Kantonsabweichung, direkte HYPE-Programmlinie, IPW-Alters-/Aufnahmebedingungen,
  gesamte Angebotsdaten und tatsächliche Erreichbarkeit.
- Individuelle Quellenprüfung aller Kerntextformulierungen; das vollständig
  inventarisierte Textmaterial ist noch keine vollständig belegte Claim-Matrix.
- Reale Journey-/Tree-Tests mit Angehörigen und unabhängiger Borderline-Perspektive,
  Gesamtprüfung kumulativer Rollenbilder, reale Hilfsmittel- und Nutzendentests.
- Autorisierte Live-Abnahme: Die produktive Netlify-Seite verlangt einen Login.

Die Issues #641, #645, #649 und #651 werden nach dem Merge mit konkreten
Teilnachweisen aktualisiert und bleiben für ihre unerfüllten Kriterien offen.
