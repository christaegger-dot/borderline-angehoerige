# Umgesetzte Reparaturen · Borderline – Orientierung für Angehörige

Die im kritischen Audit konkret belegten Code-, Gestaltungs- und Statusprobleme wurden nach dem selbstständigen Umsetzungsauftrag bearbeitet. Schriftliche gerichtliche Eingabe im Glossar präzisiert; reguläre Telefonkontakte erlaubt; ruhige Fusszeile; vorhandenes Mobilmenü für sechs Hauptthemen aktiviert; Selbsttests auf aktuelle Seiten und Figuren umgestellt und in CI ergänzt.

Anwendungscode: `348507b465f8f3e149ce5271a45a527fae390083`; Ausgangsstand: `6ac0255c23d09e63aeb4b2485fdf417b701839de`. Die Ergebnisdateien unterscheiden Korrektur, Nachtest und externe Evidenzgrenze. Der frühere Auditlauf wird nicht rückwirkend umgeschrieben.

## Tatsächliche Prüfung

79/79 Selbsttests, 216/216 Sucherwartungen ohne JS-Fehler und 34/34 bytegleiche Exportdateien. Neues Mobilmenü mit Enter, Escape, Fokusrückgabe und sechs sichtbaren Links geprüft; ohne JavaScript bleiben alle sechs Navigationslinks sichtbar.

Zusätzlicher Browserlauf: 230 Layoutzustände, kein horizontaler Überlauf; 46 axe-Zustände ohne gemeldete Verstösse; 7/7 Nutzerwege; 23 Seiten ohne JavaScript. Die geometrisch als Abschneidung gemeldeten Elemente sind ausschliesslich absichtlich ausgeblendete Textalternativen von 1 × 1 px. Kein vollständiger WCAG-Nachweis.

Die Fusszeile misst bei 375 px rund 496 px und 35 Wörter. Situative Schutzanleitungen bleiben im passenden Thema; reguläre Kontakte werden nicht mehr pauschal als Krisennummern gesperrt.

## Einordnung

R3C-A11 ist im Selbsttest- und CI-Teil erledigt. Der weitergehende Prozesspunkt zur versionsgebundenen unabhängigen R3-Freigabe wird nicht durch eine als unabhängig umbenannte Selbstprüfung ersetzt.

Dieser Nachtest ist eine technische und redaktionelle Selbstprüfung und keine neue externe Freigabe. `FREIGABE.md` wird daher nicht angelegt. Die exakten Nachteststatus stehen in `BEFUNDE.csv`; weder ein nicht geleisteter juristischer Prüfauftrag noch fehlende Vertragsdaten werden als erledigte Prüfung dargestellt.

Die Rohbelege liegen unter `/workspace/scratch/umsetzung4/` und werden nicht eingecheckt. `QUELLEN.csv` übernimmt die am selben Tag abgerufenen Quellen des Ausgangsaudits; damit wird kein zusätzlicher späterer Quellenabruf behauptet. Der Produktionsvergleich nach Merge wird separat dokumentiert.
