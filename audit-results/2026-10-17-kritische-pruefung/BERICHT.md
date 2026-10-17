# Kritische Prüfung · Borderline – Orientierung für Angehörige

17. Oktober 2026 · Commit `6ac0255c23d09e63aeb4b2485fdf417b701839de` · https://borderline-angehoerige.netlify.app

Die aktuelle Website funktioniert in den geprüften Zuständen stabil. Vorrang hat die missverständliche Rechtsmittel-Formulierung im Glossar. Daneben passen Telefonregeln und globale Fusszeile nicht zur aktuellen Zielsetzung. Der nicht angepasste Gate-Selbsttest ist die grösste technische Prüflücke.

Es gibt keine offenen GitHub-Issues oder Pull Requests beim Bestandsabruf. Das bedeutet nicht, dass die im Repository dokumentierten Sachfragen erledigt sind. In diesem Lauf werden 5 handlungsrelevante Punkte geführt (P0: 0, P1: 1, P2: 3, P3: 1); 0 gezielt nachgeprüfte ältere Befunde sind verifiziert abgeschlossen. P1 bezeichnet hier folgenreiche Rechtsformulierungen bzw. bereits bestehenden wichtigen Klärungsbedarf, keinen festgestellten IT-Notfall.

## Wichtigste Befunde

| ID | Priorität | Befund | Fundstelle |
|---|---|---|---|
| A03-178 | P1 | Im Glossar fehlt die schriftliche Form für die gerichtliche Eingabe | authoring/content/begriffe.html: #b-fu, Beispiel; Zeile 4 |
| A01-1001 | P2 | Telefonverbot widerspricht der aktuellen Nutzervorgabe | authoring/tools/contract.js: Zeilen 502–505; PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md, «Keine Krisenintervention» |
| A04-1001 | P2 | Globale Krisen- und Abgrenzungstexte machen die Fusszeile schwer | authoring/site.config.json: footer Zeile 53; responsibility Zeile 74; Fusszeile jeder Seite |
| R3C-A11 | P2 | Gate-Selbsttest ist noch auf fremde Seiten zugeschnitten | authoring/tools/contract.js: selftest, ab Zeile 669; .github/workflows/verify-authoring.yml |
| R29-P12 | P3 | Mobiler Kopfbereich beansprucht viel Platz | authoring/css/site.css: mobiler Kopf und Navigation; R29-P12 |

Die vollständige Befundmatrix nennt Ist-Zustand, Auswirkung, Methode, Evidenzstatus, Quellen, Abnahme und Nachtest. Ausführbare Vorschläge und gegebenenfalls Original-/Ersatztexte stehen in KORREKTUREN.md. Es wurden keine neuen GitHub-Pendenzen eröffnet.

## 01 · Struktur und Nutzeraufgaben

23 Runtime-Seiten sind inventarisiert. Die lokal auflösbaren internen Ziele und Assetpfade sind vorhanden; keine doppelten IDs und keine doppelten Seitentitel. Alle sieben konkreten Nutzerwege bestehen. Die Architektur und aktuellen Statusquellen wurden getrennt von historischen Auditberichten beurteilt. Aktuelle Anforderungen erlauben nützliche reguläre Telefonnummern; sie verlangen keine automatische allgemeine Krisenrahmung.

## 02 · Fachliche und rechtliche Inhalte

Gegenprüft wurden insbesondere Genesungszahlen (93 % zweijährige Remission und 50 % Recovery in der 290-Personen-Kohorte; 85 % Remission in der zweiten Kohorte), die Unterscheidung von Gruppenbefund und individueller Prognose, Psychotherapie als zentrale Behandlung sowie die vorsichtige Einordnung von Angehörigenprogrammen. Zanarini 2010, Gunderson 2011, Cochrane 2020 und der Family-Connections-RCT stützen diese untersuchten Kernaussagen; der RCT wird nicht als gesicherte Überlegenheit dargestellt. Bei den Rechtsstellen wurde Art. 439 wörtlich gegengelesen. Die bestehenden Fragen zu PatG, KJPP-Abstimmung und einzelnen Detailaussagen werden dadurch nicht pauschal als juristisch oder fachärztlich freigegeben.

## 03 · Sprache und Ton

Schweizer Standardsprache, verständliche Rollen und eine entlastende Ansprache sind überwiegend konsistent. Die Prüfung unterscheidet tatsächliche Bedeutungs-/Handlungsrisiken von optionalem Stil. Bereits akzeptierte Testverzichte und blosse Vorlieben werden nicht als neue Pflicht-Pendenzen eröffnet. Schutz- und Rechtsformulierungen werden nicht im Namen einer Sprachglättung stillschweigend verschärft oder abgeschwächt. Die konkreten Ersatztexte dieses Laufs sind Vorschläge, noch keine neu behaupteten institutionellen Freigaben.

## 04 · Darstellung, Bilder und Druck

Startseite und Fusszeile wurden bei 375/1440 px visuell betrachtet, zusätzlich die Informationswege-Abbildung auf Behandlung. Der frühere Wortbruch bei «Behandlungsteam» ist in dieser Gegenprobe nicht vorhanden. Alle Seiten und damit alle eingebetteten Darstellungen durchlaufen die Layoutmatrix; es liegt keine neue vollständige fachliche Einzelabnahme sämtlicher 13 Abbildungen vor.

Die aktuelle Fusszeile ist bei 375 px rund 801 px hoch und umfasst 102 Wörter. Die reine Höhenmessung allein begründet keinen WCAG-Verstoss. Die Empfehlung zur Kürzung beruht auf Lesefluss und gewünschter Dezenz. Druckproben wurden als Browser-PDF geprüft; ein tatsächlicher Papierdruck wurde nicht behauptet.

## 05 · Technik und Zugänglichkeit

230 Layoutzustände ohne Dokumentüberlauf, 46 axe-Läufe ohne gemeldete WCAG-A/AA-Verstösse, 23 No-JS-Seiten mit vorhandenem Hauptinhalt sowie null JS-/Konsolenfehler und null Fremdanfragen im unabhängigen lokalen Lauf. Absichtlich auf 1 × 1 px zugeschnittene zugängliche Textalternativen wurden nach Gegenprüfung korrekt aus dem Abschneidungsbefund herausgenommen. Die vollständige HTML-Struktur aller 23 Live-Seiten stimmt nach Netlify-Normalisierung mit dem geprüften Stand überein. Sicherheitsheader und `noindex` sind auf dem produktiven Root vorhanden; unbekannte Pfade liefern echte 404-Antworten.

Zusätzlich: Export 34/34 bytegleich; 216/216 festgeschriebene Sucherwartungen unter CSP bestanden. Das Standard-Suchskript liess sich zunächst mangels des von Playwright erwarteten Browsercaches nicht starten; derselbe 216er-Datensatz wurde deshalb im unabhängigen, explizit auf System-Chromium gesetzten Browserlauf geprüft. Das ist keine Anwendungspanne. Der Gate-Selbsttest besteht dagegen nur 29/76, siehe R3C-A11; diese echte Lücke wird nicht durch die grünen positiven Tests verdeckt.

## Bereits korrigierte Punkte und bewusste Grenzen

Es werden keine alten Befunde pauschal für erledigt erklärt. Frühere Freigaben, akzeptierte Einschränkungen und terminiertes Profilpaket bleiben in ihren dokumentierten Grenzen gültig. Der neue Lauf erzeugt keine 182 bzw. 331 duplizierten Sprach-Pendenzen.

Keine reale Screenreader-, Hardware-, Touch-, Safari-/Firefox-/WebKit- oder Nutzendenprüfung; kein nativer Browserzoom; keine ärztliche, juristische oder Datenschutz-Gesamtfreigabe. Diese Grenzen sind Nachweisgrenzen, keine automatisch neu eröffneten Aufgaben. Eine fehlende formale Abnahme allein wird nicht als pauschaler Veröffentlichungsblocker erfunden.

## Empfohlene Reihenfolge

1. Die P1-Rechtsstellen bzw. den genau bezeichneten Klärungsbedarf bearbeiten; bei Änderungen Kurz- und Langfassungen gemeinsam abgleichen.
2. Aktuelle Telefon-/Footer-Entscheide in Regeln und Darstellung abbilden; thematisch sinnvolle Schutzinformationen erhalten.
3. Prüfapparat und Statusquellen bereinigen; technische Korrekturen auf dem korrigierten Stand gezielt nachtesten.

## Ergebnisse und Unterlagen

- METADATEN.json: festgehaltener Stand und Testbedingungen.
- PRUEFUMFANG.md: jede Seite, tatsächliche Prüfungen und Grenzen.
- BEFUNDE.csv: stabile Befund-IDs, Quellen und Akzeptanzkriterien.
- TESTMATRIX.csv: konkrete reproduzierbare Tests, auch nicht durchgeführte.
- QUELLEN.csv: Abrufstatus und inhaltliche Prüftiefe; HTTP 200 ist kein Beleg für den passenden Inhalt.
- KORREKTUREN.md: umsetzbare Vorschläge, Original-/Ersatztexte und Abnahme.

Neue Audit-Arbeitsdateien liegen lokal vor. Es wurde nichts committed, gemergt oder veröffentlicht. Gemäss `.agents/skills/website-audit/SKILL.md` folgt eine Umsetzung auf einen separaten konkreten Auftrag. Ein FREIGABE.md wird für diesen Analysemodus bewusst nicht erzeugt.
