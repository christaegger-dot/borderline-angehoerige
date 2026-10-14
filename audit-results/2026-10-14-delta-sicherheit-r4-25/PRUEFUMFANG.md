# Prüfumfang r4-25

Geprüft wurde die Umsetzung von Paket 1 des Massnahmenplans vom 14. Oktober 2026 auf dem Branch `claude/release-a-sicherheit-r4-25-1791988026`, ausgehend von `origin/main` @ `38007a024e73703b132ab7ae9e34c6b4623e54b5` und Release r4-24.

## Tatsächlich ausgeführt

- Gegenprüfung der Befundstellen W1-003, W1-008, W1-012, W1-020, W1-035, W1-039 bis W1-041, W1-043 und W1-060 in den Fragmenten unter `authoring/content/`;
- Draft-Build vor der Freigabe, mit erwartetem Hinweis change-review;
- Produktionsbuild nach dokumentierter Freigabe und bytegleiche Exportparität aller 33 Dateien;
- 44 Chromium-Läufe aus 22 Seiten und zwei Breiten, 320 und 1440 CSS-Pixel;
- 56 Chromium- und axe-Läufe auf den 7 geänderten Seiten bei 320, 768, 1024 und 1440 CSS-Pixel, je mit 100 und 200 Prozent Wurzelschrift;
- 54 Such-Ersttreffer im Vergleich zwischen eingechecktem r4-24-Export und r4-25-Export, darunter 14 Safety- und Überlastungsfragen;
- 9 neu festgeschriebene Suchintentionen vor und nach der Ergänzung der Suchaliase;
- 14 Textnachweise für neue und 5 für entfernte Formulierungen; Sichtbarkeitsprüfung mit Öffnen eines geschlossenen Aufklappteils per Tastatur;
- 3 Deep-Link-Klicks und No-JavaScript-Fallback auf «Krisen begleiten» bei 320 CSS-Pixel;
- Volltextprüfung auf interne Links, Anker und `tel:`-Links;
- Skriptvergleich von «Verwendet auf» im Quellenverzeichnis mit den Quellenblöcken für die geänderten Einträge;
- Wortzählung der Fragmente vor und nach dem Release.

## Nicht ausgeführt oder nicht behauptet

- kein Merge und kein Deployment;
- keine realen Screenreader-, Hardwaregeräte- oder Nutzendentests;
- keine Textvergrösserung über die Browsereinstellung, nur über die Wurzelschrift;
- kein Vergleich mit den 36 festgeschriebenen Suchfragen früherer Releases, weil sie nicht im Repository liegen;
- keine vollständige WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe.
