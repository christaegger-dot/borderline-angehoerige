# Release A · Sicherheit r4-25

## Ergebnis

Release A setzt Paket 1 des Massnahmenplans vom 14. Oktober 2026 um. «Verstehen», «Diagnose» und «Krisen begleiten» nennen Suizidgedanken und Selbstverletzung jetzt als häufig bei Borderline. «Krisen begleiten» beschreibt, was Angehörige bei einer bemerkten Selbstverletzung konkret tun können; «Beziehungen», «Kommunizieren» und «Ihre Rolle» sagen genauer, wie Angehörige reagieren und wann sie Hilfe holen dürfen. Damit sind die beiden kritischen Befunde des inhaltlichen Reviews W1 (W1-003 «Verstehen», W1-020 «Diagnose») geschlossen.

Umgesetzt sind M1.1 bis M1.9, der Teil «Krisen begleiten» von M7.1 und der Release-A-Teil von M7.4. Grundlage sind die Entscheide E1 (keine Zahl zu Suizidversuchen, qualitativ «häufig») und E5 (Mason und Kreger auf «Krisen begleiten» als Beleg ersetzt). Die konkreten Fassungen wurden am 14. Oktober 2026 im Namen der PUK freigegeben (`FREIGABE.md`).

Danach bestanden der Produktionsbuild mit 22 Seiten, 0 Blockern und 0 Hinweisen, die bytegleiche Parität aller 33 Exportdateien und der erweiterte Delta-Test auf dem erzeugten `site/`-Export. r4-25 wurde am 14. Oktober 2026 mit PR #681 gemergt und veröffentlicht; der Produktionsnachtest bestand (siehe unten).

## Wesentliche Änderungen

- **Verstehen (M1.1):** Der fette Satz grenzt jetzt auf eine Gefahr für andere ein. Der folgende Satz nennt das erhöhte Risiko für die Person selbst.
- **Diagnose (M1.2):** Ein eigener Zwischentitel «Suizidgedanken und Selbstverletzung» steht vor «Depression». Suizidales Verhalten und Selbstverletzung sind als Diagnosekriterium benannt, eine Depression als zusätzliches Risiko.
- **Krisen begleiten (M1.3, M1.4, M1.8, M1.9):** Der Abschnitt `#suizid` beginnt mit Häufigkeit und wiederholten Äusserungen. Der neue Block «Wenn Sie eine Selbstverletzung bemerken» hat fünf Schritte. Die Mittelbegrenzung ist positiv formuliert, der Schutzsatz gegen Wegnehmen unter Widerstand bleibt. Die Vermeiden-Liste nennt jetzt «zu versprechen, Suizidgedanken oder Selbstverletzungen geheim zu halten».
- **Beziehungen, Kommunizieren, Rolle (M1.5 bis M1.7):** Der Verstärkungssatz ist durch konkretes Verhalten ersetzt. Bei «Wenn du gehst, bringe ich mich um» ist die Frage «Muss ich bleiben?» beantwortet und auf die FAQ verlinkt. «Sicherheitseinschätzung» heisst jetzt «fachliche Einschätzung einer Gefährdung»; Hilfe holen ohne Gewissheit ist ausdrücklich erlaubt.
- **Quellen (M7.1, M7.4):** Goodman et al. (2017) und Lak et al. (2025) sind neu, ohne Häufigkeitsangaben (E1). Family Guidelines und Project Air ersetzen Mason und Kreger auf «Krisen begleiten».
- **Suche (R25-T01):** Von neun neu festgeschriebenen Suchintentionen ergaben in r4-24 sechs und im ersten r4-25-Build noch fünf null Treffer, darunter «ritzt sich» und «Selbstverletzung entdeckt». Ergänzt wurden Suchaliase für `krise #suizid-title` und `kommunizieren #worte-title`. Das ist eine technische Ergänzung nach der Freigabe; sie ändert keinen sichtbaren Wortlaut.

## Abweichungen vom Reviewvorschlag

Die freigegebenen Fassungen weichen an diesen Stellen vom Wortlaut des Reviews W1 ab:

- **M1.1 (W1-003):** Der Halbsatz «auch wenn sie sich wiederholen» fehlt; die Wiederholung behandeln «Diagnose» und «Krisen begleiten». Neben dem Satz steht kein eigener Link auf «Krisen begleiten», und der Text ist nicht zusätzlich im Zwischentitel «Wenn Sie sich wegen Suizid sorgen» verankert. Dieser Abschnitt verweist weiterhin auf «Krisen begleiten».
- **M1.4 (W1-040):** Die Fachpersonen sollen «wenn möglich gemeinsam mit der Person» informiert werden, nicht «mit Einverständnis». Die freigegebene Fassung gibt damit dem Verzicht auf Geheimhaltung Vorrang. Ärztliche Hilfe ist ausdrücklich auch dann zu holen, «wenn die Person das nicht möchte». «Nicht moralisieren und nicht bestrafen» steht nicht wörtlich da; sinngemäss decken es «Zeigen Sie, dass Sie die Not ernst nehmen» und das spätere Besprechen in Ruhe ab. Das Nachfragen nach Suizidgedanken steht im vorangehenden Absatz.
- **M1.5 (W1-008):** Der Reviewvorschlag nannte Nachfragen nach Suizidgedanken, medizinische Versorgung, keinen Rückzug als Strafe und Zuwendung auch in ruhigen Zeiten. Die freigegebene Fassung nennt ruhig reagieren, nicht übergehen, keine Panik und keine Geheimhaltung; für das konkrete Vorgehen verweist sie auf «Krisen begleiten».
- **M1.8 (W1-041):** «Waffen» ist nicht genannt. Die Fassung sagt «möglichst gemeinsam und nach professioneller Anleitung» statt «am besten gemeinsam mit der Person». Die im Plan verlangte Quelle zur Mittelbegrenzung, zum Beispiel WHO LIVE LIFE, ist nicht ergänzt (siehe `BEFUNDE.csv`, Zeilen M1.8 und M7.4).

## Technischer Nachtest

- Produktionsbuild: 22 Seiten, 0 Blocker, 0 Hinweise. Exportparität 33 von 33 Dateien.
- Alle Seiten: 44 von 44 Läufen bei 320 und 1440 CSS-Pixel mit Buildmarker r4-25, ohne Überlauf und ohne Laufzeitfehler.
- Geänderte Seiten: 56 von 56 Läufen bei 320, 768, 1024 und 1440 CSS-Pixel und bei 100 und 200 Prozent Wurzelschrift; axe ohne gemeldete Violation.
- Suche: 54 von 54 Ersttreffer unverändert gegenüber r4-24, davon 14 Safety- und Überlastungsfragen. 9 von 9 neu festgeschriebenen Suchintentionen führen zum vorgesehenen Abschnitt.
- Texte: 14 von 14 neuen Formulierungen vorhanden, 5 von 5 ersetzten entfernt; 9 von 9 Stellen sichtbar, auch im Aufklappteil.
- Deep-Links 3 von 3, No-JavaScript-Fallback auf «Krisen begleiten», 0 `tel:`-Links.
- Quellen: Für die fünf geänderten Einträge stimmen Verzeichnis und Quellenblöcke der zwölf Themenseiten mit Quellenblock überein. Das Gate prüft diese Übereinstimmung nicht; geprüft wurde per Skript.

## Wortbilanz

Der Fliesstext der sechs Themenseiten wächst um 255 Wörter; der Plan rechnete mit rund 250. Dazu kommen 171 Wörter in den Quellenblöcken und 179 im Quellenverzeichnis. «Krisen begleiten» hat jetzt 1934 Wörter mit Quellenblock, vorher 1717. Gezählt wurde im Fragment, Wörter mit Bindestrich als ein Wort; der Review W1 kam für dieselbe Seite mit seiner Zählweise auf 1724. Das Ziel nach Release C liegt bei höchstens 1800; M6.5 muss auf dieser Seite also mindestens 134 Wörter einsparen.

## Offene Punkte

- R25-O01: Auf «Kurz und klar» lässt sich «Aus der Diagnose allein lassen sich Motive, Gefährlichkeit oder Beziehungsfähigkeit nicht ableiten» wie der alte Satz auf «Verstehen» lesen. Ähnliches gilt für «Über diese Website». Der Wortlaut braucht eine eigene Freigabe; vorgeschlagen für Release B.
- R25-O02: Bei zwei Suchwörtern verlangt die gelockerte Suche weiterhin beide Treffer. Eine Safety-Anfrage mit einem unbekannten Zusatzwort kann deshalb ins Leere laufen.
- R25-O03: «Darf ich gehen» führt nicht zuerst auf die FAQ «Darf ich die betroffene Person verlassen?».
- R25-O04: Wortbilanz «Krisen begleiten», siehe oben.
- R25-O05: Das Gate prüft «Verwendet auf» nicht, anders als der Massnahmenplan annimmt.

## Evidenzgrenzen

Nicht behauptet werden reale Screenreader-, Hardwaregeräte- oder Nutzendentests, eine vollständige WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe und ein Produktionsnachweis. Die 200-Prozent-Textgrösse ist über die Wurzelschrift simuliert, nicht über die Browsereinstellung. Die 36 festgeschriebenen Suchfragen früherer Releases liegen nicht im Repository; verglichen wurde mit einer eigenen Liste von 54 Fragen.

## Produktionsnachweis

PR #681 wurde am 14. Oktober 2026 als Merge-Commit `d29ca85d207ae9162bda329bec3d9073748e50ab` übernommen. Netlify veröffentlichte den Produktionsdeploy `6acf9d4d6d2b65496d1a1775` um 15:18 UTC. Der anschliessende Test gegen `https://borderline-angehoerige.netlify.app` bestand:

- 42 von 42 Läufen über 21 Seiten bei 320 und 1440 CSS-Pixel, alle mit Buildmarker r4-25, Assets r4-25 und ohne Lade- oder Laufzeitfehler;
- 54 von 54 Such-Ersttreffern wie im lokalen Export und 9 von 9 neuen Suchintentionen;
- 14 von 14 neuen und 5 von 5 entfernten Formulierungen;
- No-JavaScript-Fallback auf «Krisen begleiten», eigene 404-Seite, unveränderte Sicherheitsheader und `robots.txt`.

Netlify schreibt beim Ausliefern die internen Links der HTML-Seiten auf saubere Pfade um. Die 23 HTML-Dateien sind deshalb nicht bytegleich mit `site/`; die übrigen 9 ausgelieferten Dateien (CSS, JavaScript, Schriften, Bilder, `robots.txt`) sind es. `_headers` und `_redirects` sind Konfigurationsdateien und werden nicht ausgeliefert.

## Nachfolgende Nachbesserung

R25-O01 und R25-O03 sowie die nur teilweise erfüllten Abnahmekriterien von M1.1, M1.5, M1.6 und M1.8 behandelt r4-26 (`audit-results/2026-10-14-delta-nachbesserung-r4-26/`).
