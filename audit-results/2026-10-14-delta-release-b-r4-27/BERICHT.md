# Release B · Kernwissen, Schweizer Recht, Anlaufstellen und Quellen (r4-27)

## Ergebnis

r4-27 setzt die Pakete 2, 3, 5 und 7 des Massnahmenplans vom 14. Oktober 2026 um und zieht M6.7 aus Paket 6 vor. Die konkreten Fassungen wurden am 14. Oktober 2026 im Namen der PUK freigegeben (`FREIGABE.md`, Wortlaut in `FREIGABE-VORLAGE.md`). Paket 3 (Schweizer Recht) hat der Auftraggeber ohne Prüfung durch den Rechtsdienst freigegeben. Danach bestanden der Produktionsbuild mit 22 Seiten, 0 Blockern und 0 Hinweisen, die bytegleiche Parität aller 33 Exportdateien und der Delta-Test auf dem erzeugten `site/`-Export. Der Pull Request ist offen und nicht gemergt.

## Änderungen

- **Kernwissen (Paket 2):**
  - «Verstehen» nennt sechs Kernmerkmale in Alltagssprache, die Häufigkeit (etwa 1 bis 2 von 100 Erwachsenen) und verweist auf die neun Kriterien.
  - «Diagnose» nennt die ICD-10-GM-Bezeichnung «Emotional instabile Persönlichkeitsstörung, Borderline-Typ» (E3) und die häufigsten Begleiterkrankungen samt Rückgang im Verlauf.
  - «Behandlung» sagt «Borderline ist behandelbar» (auch in der Kurzbox) und vereinfacht den Medikamentensatz, ebenso «Fragen» und «Genesung».
  - «Genesung» hat eine neue Abbildung 1 «Was sich oft zuerst bessert, was länger bleibt» (E10) und nennt den möglichen Verlust der Recovery sowie die zweite Langzeitstudie.
  - «Fragen» beziffert die Erblichkeit als Gruppenaussage (E2).
  - Das Glossar hat sechs neue Begriffe.
- **Schweizer Recht (Paket 3):**
  - FU im Kanton Zürich mit Höchstdauer, Information der nahestehenden Person, Frist, Gericht, Entlassungsgesuch und Vertrauensperson.
  - Zwischentitel «Wann Sie Auskunft erhalten können» auf «Behandlung» mit Einwilligung, Vertrauensperson, Vertretung nach Art. 377 f. ZGB samt Reihenfolge, Ausnahme nach Art. 380, Eltern und Beistandschaft; «andere Rechtsgrundlage» ist überall ersetzt.
  - Der Abschnitt zu Minderjährigen und Beistandschaft auf «Genesung» ist durch einen Verweis ersetzt (E8).
  - Gewaltschutzgesetz und erweiterter Gewaltbegriff auf «Grenzen».
  - Budget- und Schuldenberatung sowie Beistandschaft auf «Ihre Rolle», ohne den freigegebenen Satz zu ändern (E8).
- **Anlaufstellen und Literatur (Paket 5):** NAP auf «Unterstützung finden» und iks auf «Wenn Kinder mitbetroffen sind», je mit Prüfdatum; Family Connections neu eingeordnet; ipw nach Haupt- und Unterseiten beschrieben; drei Buchangaben korrigiert und Wewetzer und Bohus (2016) ergänzt.
- **Quellen (Paket 7):** Mason und Kreger auf fünf Seiten als Praxisanregung; 16 nicht zitierte Einträge im internen Protokoll `authoring/QUELLEN-HINTERGRUND.md` (E6); neue und vervollständigte Einträge; Blades et al. (2018) auf «Krisen begleiten»; Abbildung 1 auf «Verstehen» mit Bateman und Fonagy (2013). Verzeichnis und Quellenblöcke stimmen per Skriptprüfung überein (82 Einträge, 0 Abweichungen).
- **Vorgezogen (M6.7):** «Niemand ist schuld an der Erkrankung: weder die betroffene Person noch ihre Angehörigen.»

## Abweichungen vom Massnahmenplan

- **M7.6:** Bateman und Fonagy (2013) statt (2009), weil nur die Arbeit von 2013 die Haltung des Nicht-Wissens beschreibt.
- **M7.4:** NAP, iks und Wewetzer und Bohus stehen nicht im Quellenverzeichnis. Angebote mit Prüfdatum und Buchempfehlungen stehen dort auch bisher nicht.
- **M2.10:** Der Begriff heisst «Selbstverletzendes Verhalten», weil «Selbstverletzung» als exakter Titeltreffer die Suche vom Handlungsabschnitt auf «Krisen begleiten» ins Glossar umgeleitet hätte.
- **M7.2:** 16 statt 18 Einträge verschoben. Seit Release A wird Project Air verwendet; der BAG-Eintrag ist als verwendet geführt.
- **M3.6:** Grundlage ist das EBG-Blatt A1. Das Blatt B2 ist seit Art. 181b StGB (1. Januar 2026) rechtlich überholt.
- **M3.1 und M3.3:** Das Abnahmekriterium «Rechtsdienst hat den Wortlaut bestätigt» ist nicht erfüllt (Entscheid des Auftraggebers).

## Unabhängige Prüfung

Eine Sitzung, die nicht gebaut hat, prüfte alle neuen Aussagen gegen die Primärquellen und meldete 29 Befunde. Die wichtigsten, vor der Freigabe eingearbeitet:

- Family Connections war als gleich wirksam wie ein anderes Programm dargestellt; die Studie prüfte das nicht.
- Bei der FU fehlte, dass die Frist schon laufen kann, bevor Angehörige informiert sind, und welches Gericht zuständig ist.
- Die Vertretungsreihenfolge nach Art. 378 ZGB war verkürzt; Art. 380 stand ohne die Bedingung «urteilsunfähig».
- Die Rolle als Beiständin oder Beistand war unklar.
- Beim Gewaltschutz war die Höchstdauer der Verlängerung falsch wiedergegeben und der Fristbeginn fehlte.
- Die Erblichkeit war nicht als Gruppenaussage eingeordnet.
- Die ipw-Unterseiten nennen ein DBT-Programm; «allgemeines Angebot» war irreführend.

Befund 1 (fehlender Rechtsdienst) trägt der Entscheid des Auftraggebers; er bleibt als R27-O01 offen. Befund 2 (Entscheide dokumentieren) ist mit diesem Nachweis und dem Pendenzendokument erledigt.

## Technischer Nachtest

- Produktionsbuild: 22 Seiten, 0 Blocker, 0 Hinweise. Exportparität 33 von 33 Dateien. Wortlaut gleich wie in der Freigabevorlage.
- Alle Seiten: 44 von 44 Läufen bei 320 und 1440 CSS-Pixel mit Buildmarker r4-27.
- Geänderte Seiten: 120 von 120 Läufen bei vier Breiten und zwei Textgrössen und 30 von 30 Läufen bei zwei Breiten; axe ohne gemeldete Violation.
- Suche: 53 von 54 Ersttreffern unverändert. Beabsichtigt geändert hat sich «Gewalt»: Die Suche führt jetzt zu «Wenn Gewalt oder Bedrohung vorkommt» (Grenzen) statt zu «Bei Eskalation, Gewalt oder fehlender Betreuung» (Kinder). 26 von 26 Suchintentionen führen zum vorgesehenen Ziel, alle Suchen zu Selbstverletzung und Suizid weiter zu «Krisen begleiten».
- Texte: 40 von 40 neuen Formulierungen vorhanden, 14 von 14 ersetzten entfernt, 18 von 18 Stellen sichtbar. Deep-Links 8 von 8, No-JavaScript-Fallback auf vier Seiten, 0 `tel:`-Links.

## Wortbilanz

r4-27 fügt ohne Quellenblöcke 1312 Wörter hinzu (31 613 auf 32 925). Am stärksten wachsen «Begriffe» (+435, sechs neue Einträge hinter Aufklappteilen) und «Behandlung» (+356, vor allem der Zwischentitel zu Auskünften). «Behandlung» hat jetzt 3145 Wörter; das Ziel nach Release C liegt unter 2400. Release C muss deshalb deutlich mehr einsparen als für Paket 6 vorgesehen.

## Offene Punkte

- **R27-O01:** Paket 3 ohne Rechtsdienst; insbesondere der Fristbeginn nach Art. 439 und 450b ZGB und die Auslegung von Art. 380 sind juristisch nicht geprüft.
- **R27-O02:** R2 für die neue Abbildung 1 auf «Genesung».
- **R27-O03:** Wortbilanz, siehe oben.
- **R27-O04:** Die Kurzsuche «FU» trifft jedes «für», weil die Suche Teilwörter vergleicht; exakte Titeltreffer bestimmen die Rangfolge stark.
- **R27-O05:** ipw.ch nur über ein Abrufwerkzeug gelesen (Bot-Sperre); das iks-Angebot nur über die Website bestätigt.
- **R26-O04** bleibt: Das Gate prüft «Verwendet auf» nicht.

## Evidenzgrenzen

Nicht behauptet werden eine juristische Prüfung, reale Screenreader-, Hardwaregeräte- oder Nutzendentests sowie eine vollständige WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe. Die 200-Prozent-Textgrösse ist über die Wurzelschrift simuliert.
