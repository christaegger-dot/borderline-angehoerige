# Delta-Umsetzung Audit 03 · r4-23

## Ergebnis

Die 20 bestätigten Sprachbefunde A03-019 bis A03-038 sind in der kanonischen Quelle `authoring/` umgesetzt. Die beiden Wirkungshypothesen A03-H01 und A03-H02 wurden entsprechend dem Massnahmenplan nicht als Fehler umgeschrieben.

Der lokale Draft-Build und sämtliche technischen Delta-Tests bestehen. Die konkreten r4-23-Fassungen wurden am 14. Oktober 2026 im Namen der PUK geprüft und freigegeben. Danach bestanden der Produktionsbuild mit 22 Seiten, 0 Blockern und 0 Hinweisen, die bytegleiche Parität aller 33 Exportdateien sowie der vollständige Delta-Smoke-Test auf dem erzeugten `site/`-Export. r4-23 ist damit lokal releasebereit, aber noch nicht committet, gemergt oder veröffentlicht.

## Wesentliche Änderungen

- Der lokale Erwachsenen-Ausschluss auf der Genesungsseite ist entfernt; die rechtlich relevanten Aussagen zu Minderjährigen, Urteilsfähigkeit und Vertretung bleiben erhalten.
- Die sichere Aussage über fehlende Absicht ist durch eine motivneutrale Formulierung ersetzt.
- Die Buchauswahl spricht institutionell als Auswahl der Fachstelle.
- Mehrdeutige Krisen-, Schweige- und Finanzpassagen sind präzisiert.
- «Nach der Krise» ist von 749 auf 379 Wörter reduziert und nach drei Aufgaben geordnet.
- Vier Mustersätze sind kürzer und alltagsnäher.
- Die Genesungsaussage enthält keine ungebundene Wahrscheinlichkeit mehr.
- 34 Vorkommen der Vollformel «steht auf der Seite» wurden entfernt; die Zahl sinkt von 95 auf 61.
- Jargon, unnatürliche Satzkonstruktionen, konkurrierende Metaphern und isolierte substantivierte Personenbezeichnungen wurden an den Befundstellen bereinigt.

## Technischer Nachtest

- Draft-Build: 22 Seiten, 0 Blocker, 1 erwarteter Reviewhinweis.
- Browser: 44 von 44 Seiten-/Viewport-Läufen bestanden.
- axe: 28 von 28 automatisierte Läufe ohne gemeldete Violation.
- Suche: 36 von 36 Ersttreffer unverändert gegenüber r4-22.
- Safety-/Überlastungssuche: 6 von 6 bestanden.
- Neue Textstellen: 12 von 12 repräsentative Browsernachweise bestanden.
- Akkordeon, Deep-Link, erhaltener Abschnitt `#bleibt` und No-JavaScript-Fallback bestanden.
- Produktionsbuild: 22 Seiten, 0 Blocker, 0 Hinweise.
- Exportparität: 33 von 33 Dateien bytegleich reproduzierbar.

## Freigabe und verbleibende Evidenzgrenzen

Die zuvor offenen Fach-, Safety-, Rechts- und Institutionsfragen zu A03-019 bis A03-038 wurden für den konkreten r4-23-Wortlaut im Namen der PUK bestätigt. Der Freigabenachweis liegt in `FREIGABE.md`. Nicht behauptet werden reale Screenreader-, Hardwaregeräte- oder Nutzendentests, eine empirische Entscheidung der Hypothesen A03-H01 und A03-H02 oder eine vollständige WCAG-, ISO-, fachmedizinische beziehungsweise rechtliche Gesamtfreigabe.

## Nächster administrativer Schritt

Die lokale Umsetzung und Nachprüfung sind abgeschlossen. Commit, Pull Request, Merge und Deployment erfolgen nur auf separaten Auftrag.
