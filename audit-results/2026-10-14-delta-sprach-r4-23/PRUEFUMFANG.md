# Prüfumfang r4-23

Geprüft wurde die Umsetzung der Sprachbefunde A03-019 bis A03-038 auf dem Branch `codex/audit-03-massnahmen-r4-23`, ausgehend von `origin/main` @ `5b92474bb971092b5453533060641cdbb3c96f4e` und Release r4-22.

## Tatsächlich ausgeführt

- Gegenprüfung aller 20 Befundstellen in den kanonischen Fragmenten unter `authoring/content/`;
- gezielte Suche nach den ersetzten Altformulierungen, versehentlichen Altersausschlüssen und privater Betreiberstimme;
- Wort- und Inhaltsvergleich des Abschnitts `/krise#danach`;
- Draft-Build aller 22 Seiten und Gate-Prüfung;
- bewusste Gegenprobe des Produktionsgates vor der Freigabe sowie erneuter Produktionslauf nach dokumentierter PUK-Freigabe;
- Produktionsbuild nach `site/` und bytegleiche Exportparität aller 33 Dateien;
- 44 Chromium-Läufe aus 22 Seiten und zwei Breiten (320 und 1440 CSS-Pixel);
- 28 axe-Läufe auf den 14 geänderten Inhaltsseiten;
- 36 Such-Ersttreffer im direkten Vergleich zwischen eingechecktem r4-22-Export und lokalem r4-23-Build;
- sechs kontrollierte Safety-/Überlastungssuchen;
- zwölf Browser-Textnachweise, Akkordeon-Tastaturtest, Sprungzieltest und No-JavaScript-Fallback.

## Nicht ausgeführt oder nicht behauptet

- kein Commit, Pull Request, Merge oder Deployment;
- keine realen Screenreader-, Hardwaregeräte- oder Nutzendentests;
- keine empirische Entscheidung der Wirkungshypothesen A03-H01 und A03-H02;
- keine vollständige WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe.

Die konkreten r4-23-Fassungen zu A03-019 bis A03-038 wurden am 14. Oktober 2026 im Namen der PUK geprüft und freigegeben; der Umfang ist in `FREIGABE.md` dokumentiert. Die Browser- und axe-Prüfung belegt technische Regressionen innerhalb des geprüften Rahmens. Sie ersetzt weder reale Nutzenden- und Hilfsmitteltests noch eine vollständige WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe.
