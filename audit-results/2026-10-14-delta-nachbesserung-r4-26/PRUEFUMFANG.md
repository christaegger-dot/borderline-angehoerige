# Prüfumfang r4-26

Geprüft wurde die Nachbesserung von Release A auf dem Branch `claude/release-a2-nachbesserung-r4-26-1791994180`, ausgehend von `origin/main` @ `d29ca85d207ae9162bda329bec3d9073748e50ab` und Release r4-25.

## Tatsächlich ausgeführt

- Prüfung der Abnahmekriterien von Release A gegen den veröffentlichten Stand r4-25;
- Abgleich der Wortlaute M1.4 und M1.5 mit Project Air (2018), Family Guidelines (2006) und NICE NG225;
- Draft-Build vor der Freigabe und Produktionsbuild danach; bytegleiche Exportparität aller 33 Dateien;
- 44 Chromium-Läufe aus 22 Seiten und zwei Breiten;
- 56 Chromium- und axe-Läufe auf den 7 geänderten Seiten bei vier Breiten und zwei Wurzelschriftgrössen;
- 54 Such-Ersttreffer im Vergleich r4-25 gegen r4-26 und 11 festgeschriebene Suchintentionen;
- 14 Textnachweise für neue und 3 für entfernte Formulierungen; Sichtbarkeit mit Öffnen von Aufklappteil und Quellenakkordeon per Tastatur;
- 3 Deep-Link-Klicks und No-JavaScript-Fallback auf «Krisen begleiten»;
- Skriptvergleich «Verwendet auf» für fünf betroffene Quellen; Volltextprüfung auf `tel:`-Links;
- Wortzählung der geänderten Fragmente;
- Produktionstest nach dem Merge gegen `https://borderline-angehoerige.netlify.app` (Netlify-Deploy `6acfb7f924705af6e61b1e33`), siehe `BERICHT.md`, Abschnitt «Produktionsnachweis».

## Nicht ausgeführt oder nicht behauptet

- kein Merge und kein Deployment durch Claude; den Merge von PR #682 hat der Auftraggeber ausgelöst;
- keine realen Screenreader-, Hardwaregeräte- oder Nutzendentests;
- keine Textvergrösserung über die Browsereinstellung;
- keine vollständige WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe.
