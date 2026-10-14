# Audit-06-Empfehlung für r4-22

## CONDITIONAL GO

Der veröffentlichte Stand r4-22 kann aus technischer, struktureller, redaktioneller und im dokumentierten fachlichen Umfang weiterbetrieben werden. Für `main`-Commit `160a42f92eb78e4a0af806fc74babea1ab712937` und die öffentliche Produktion wurden keine offenen P0-/P1-Befunde oder neuen Release-Blocker gefunden.

### Erfüllte Releasebedingungen

1. Der kanonische Produktionsbuild besteht mit 22 Seiten, 0 Blockern und 0 Hinweisen.
2. Alle 33 Exportdateien sind bytegleich zum kontrollierten Build.
3. Die öffentliche Produktion liefert r4-22 und bestand 169 von 169 kompakten Produktionsprüfungen.
4. Die vollständige Live-Matrix, 36 Suchfragen und sechs zentrale Nutzerreisen sind bestanden.
5. Sicherheitsheader, Robots-Steuerung, 404 und repräsentative Weiterleitungen sind korrekt ausgeliefert.
6. A04-009 bis A04-013 sind unabhängig nachgeprüft und im Namen der PUK institutionell freigegeben.

### Fortbestehende Grenzen

1. Ohne dokumentierte Prüfung durch den PUK-Rechtsdienst darf keine juristische oder Datenschutz-Gesamtfreigabe behauptet werden.
2. Ohne reale Screenreader-, Geräte- und Nutzendentests darf keine vollständige WCAG-, ISO- oder empirische Usability-Konformität behauptet werden.
3. Das `noindex`-/`robots.txt`-Konzept verhindert Suchmaschinenindexierung, aber keinen Zugriff für Personen mit dem Link.
4. Die Empfehlung gilt nur für den fixierten Stand. Jede spätere Website-Änderung benötigt einen angemessenen Delta-Nachtest.

Die Grenzen sind dokumentiert und nach geltendem Institutionsentscheid keine technischen Veröffentlichungsblocker.
