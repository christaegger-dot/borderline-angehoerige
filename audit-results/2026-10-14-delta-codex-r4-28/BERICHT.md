# r4-28 · Korrekturen nach dem Codex-Review von PR #684

## Ergebnis

r4-28 korrigiert fünf Aussagen aus r4-27, die das automatische Codex-Review von Pull Request #684 beanstandet hat. Die Prüfung an den Primärquellen bestätigte vier Befunde vollständig und einen zur Hälfte. Die konkreten Fassungen wurden am 14. Oktober 2026 im Namen der PUK freigegeben (`FREIGABE.md`). Danach bestanden der Produktionsbuild mit 22 Seiten, 0 Blockern und 0 Hinweisen, die bytegleiche Parität aller 33 Exportdateien und der Delta-Test auf dem erzeugten `site/`-Export. Der Pull Request ist offen und nicht gemergt.

Das Codex-Review wurde um 20:53:02 UTC veröffentlicht, 41 Sekunden vor dem Merge von PR #684 um 20:53:43 UTC; geprüft war es beim Merge noch nicht. Seit der Veröffentlichung von r4-27 (14. Oktober 2026, 20:53 UTC) stehen die fünf beanstandeten Stellen auf der öffentlichen Website, bis r4-28 veröffentlicht ist. Am schwersten wiegt der Fristbeginn beim Gewaltschutz. Er entstand bei der Einarbeitung der unabhängigen Prüfung von r4-27.

## Befunde und Korrekturen

| Nr. | Seite | Codex | Prüfung | Korrektur |
| --- | --- | --- | --- | --- |
| R28-C01 | Grenzen | P1: Fristbeginn und Höchstdauer beim Gewaltschutz | Fristbeginn bestätigt, Höchstdauer nicht | Frist ab Beginn der Massnahmen; Höchstdauer im Gesetzeswortlaut |
| R28-C02 | Behandlung | P2: ipw nennt Borderline doch | bestätigt | Satz «Borderline wird nicht eigens genannt» ersetzt |
| R28-C03 | Genesung | P2: Definition hinter 85 % fehlt | bestätigt | Zwölf-Monats-Definition ergänzt, auch im Quellenblock und im Verzeichnis |
| R28-C04 | Verstehen | P2: neun Kriterien gelten für das DSM-5-TR | bestätigt | DSM-5-TR genannt |
| R28-C05 | Krisen begleiten | P2: Einschränkung von Blades et al. fehlt | bestätigt | Einschränkung auf Befragungen in Studien ergänzt |

- **R28-C01, Gewaltschutz.**
  - § 6 Abs. 1 GSG: «Die gefährdete Person kann innert acht Tagen nach Geltungsbeginn der Schutzmassnahmen beim Gericht um deren Verlängerung ersuchen.» Die Massnahmen gelten ab der Mitteilung an die gefährdende Person (§ 3 Abs. 3). «Nach Erhalt der schriftlichen Verfügung» war falsch, wenn die gefährdete Person die Verfügung später erhält; die Frist kann dann schon laufen.
  - § 6 Abs. 3 GSG: «Die gerichtlich verfügten Schutzmassnahmen dürfen insgesamt drei Monate nicht übersteigen.» Codex las das als Gesamtdauer einschliesslich der 14 Tage. Die kantonalen Informationen sind uneinheitlich: Das Sozialhilfehandbuch schreibt «Verlängerung der Schutzmassnahme um maximal drei Monate», die Seite des Kantons zum polizeilichen Schutz «auf bis zu drei Monate». Die neue Fassung übernimmt den Gesetzeswortlaut, der bei beiden Lesarten zutrifft. Die Auslegung bleibt Teil von R27-O01.
  - Alt: «Brauchen Sie länger Schutz, können Sie innert acht Tagen nach Erhalt der schriftlichen Verfügung beim Gericht eine Verlängerung beantragen. Das Gericht kann die Massnahmen um höchstens drei Monate verlängern.»
  - Neu: «Brauchen Sie länger Schutz, können Sie innert acht Tagen ab Beginn der Massnahmen beim Gericht eine Verlängerung beantragen. Die vom Gericht verfügten Massnahmen dürfen insgesamt höchstens drei Monate dauern.»
- **R28-C02, ipw.** Das Therapiekonzept der Psychotherapiestation für junge Erwachsene (Version 2.0 vom 13.02.2024) heisst «Therapiekonzept der Psychotherapiestation für junge Erwachsene (PTSJ) und das dialektisch-behaviorale Therapiekonzept (DBT) für Menschen mit Schwierigkeiten in der Gefühlsregulation und/oder einer Borderline-Persönlichkeitsstörung». Die Aussage aus W1-032 stützte sich nur auf die Angebotsseiten.
  - Alt: «…; zum Angebot gehört ein DBT-Programm. Borderline wird nicht eigens genannt.»
  - Neu: «…; zum Angebot gehört ein DBT-Programm. Laut Therapiekonzept der Station richtet es sich an Menschen mit Schwierigkeiten in der Gefühlsregulation oder einer Borderline-Persönlichkeitsstörung.»
- **R28-C03, Remission.** Gunderson et al. (2011) berichten 85 % bei einer Remission über zwölf Monate und 91 % bei zwei Monaten. Gleich darüber steht die Zahl 93 % aus einer anderen Studie mit einer Definition über zwei Jahre.
  - Alt: «…erreichten 85 % eine Remission.»
  - Neu: «…erreichten über zehn Jahre 85 % eine Remission, hier definiert als mindestens zwölf Monate mit höchstens zwei der neun Kriterien.»
  - Quellenblock: «85 % Remission über mindestens zwölf Monate»; Verzeichnis: «85 % Remission (mindestens zwölf Monate mit höchstens zwei Kriterien)».
- **R28-C04, neun Kriterien.** Die neun Kriterien beschreibt das DSM-5-TR. Die ICD-10-GM und die ICD-11 arbeiten anders, wie «Diagnose» und das Glossar ausführen.
  - Alt: «Für die Diagnose prüfen Fachpersonen neun Kriterien.»
  - Neu: «Für die Diagnose nennt das Diagnosehandbuch DSM-5-TR neun Kriterien.»
- **R28-C05, direkt fragen.** Blades et al. (2018) werteten 18 Studien aus, in denen Teilnehmende in Forschungsstudien nach Suizid gefragt wurden. Die Einschränkung stand nur im Quellenverzeichnis.
  - Alt: «… eher eine leichte Abnahme (Dazzi et al., 2014; Blades et al., 2018). Das garantiert keine bestimmte Wirkung im einzelnen Gespräch.»
  - Neu: «… eher eine leichte Abnahme (Dazzi et al., 2014; Blades et al., 2018). Untersucht wurden Befragungen in Studien, nicht Gespräche unter Angehörigen; eine bestimmte Wirkung im einzelnen Gespräch ist damit nicht garantiert.»

## Technischer Nachtest

- Produktionsbuild: 22 Seiten, 0 Blocker, 0 Hinweise. Exportparität 33 von 33 Dateien. Ausser dem Buildmarker unterscheiden sich gegenüber r4-27 nur «Verstehen», «Behandlung», «Genesung», «Grenzen», «Krisen begleiten», «Quellen» und der Suchindex.
- Delta-Test r4-27 gegen r4-28: 54 von 54 Such-Ersttreffern unverändert; 12 von 12 Läufen auf den sechs geänderten Seiten bei 320 und 1440 CSS-Pixel mit axe ohne Befund; 7 von 7 neuen Formulierungen vorhanden und 5 von 5 ersetzten entfernt; No-JavaScript-Fallback auf vier Seiten.
- Erweiterter Test: 48 von 48 Läufen bei vier Breiten und zwei Wurzelschriftgrössen ohne Überlauf, Laufzeitfehler oder axe-Violation; 7 von 7 Stellen sichtbar; 8 von 8 Deep-Links; 26 von 26 Suchintentionen mit demselben Ziel wie in r4-27.
- Quellen: 82 Einträge, 0 Abweichungen zwischen Quellenblöcken und «Verwendet auf». 0 `tel:`-Links.

## Wortbilanz

r4-28 fügt ohne Quellenblöcke 40 Wörter hinzu (32 925 auf 32 965): «Genesung» +15, «Behandlung» +12, «Krisen begleiten» +11, «Verstehen» +2; «Quellen» +7. «Behandlung» hat jetzt 3157 Wörter ohne Quellenblock. R27-O03 bleibt offen.

## Offene Punkte

- **R27-O01** bleibt und umfasst neu die Auslegung von § 6 Abs. 3 GSG.
- **R27-O05** bleibt: Das ipw-Therapiekonzept ist über ein Abrufwerkzeug gelesen, nicht beim Anbieter bestätigt.
- **R28-O01:** PR #684 wurde 41 Sekunden nach dem Codex-Review gemergt, bevor dessen Befunde geprüft waren. Empfehlung: einen Pull Request erst mergen, wenn das Codex-Review abgeschlossen ist und seine Befunde geprüft sind.
- R27-O02 bis R27-O04 und R26-O04 bleiben unverändert.

## Evidenzgrenzen

Nicht behauptet werden eine juristische Prüfung, reale Screenreader-, Hardwaregeräte- oder Nutzendentests sowie eine vollständige WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe. Die 200-Prozent-Textgrösse ist über die Wurzelschrift simuliert.
