# Prüfumfang r4-28

Geprüft wurden die fünf Codex-Befunde zu Pull Request #684 und ihre Korrekturen auf dem Branch `claude/r4-28-codex-korrekturen-1792011773`, ausgehend von `origin/main` @ `8dbf1be6b291cb3fd8f5daa5db5202e9f8eac3fb` (r4-27).

## Tatsächlich ausgeführt

- Prüfung jedes Befunds an der Primärquelle: GSG Zürich (Fassung 127), zwei Informationsseiten des Kantons Zürich, Therapiekonzept der ipw, Volltext von Gunderson et al. (2011) und PubMed-Metadaten zu Blades et al. (2018);
- Draft-Build vor der Freigabe, Produktionsbuild danach und bytegleiche Exportparität aller 33 Dateien;
- Vergleich des Exports r4-27 gegen r4-28 ohne Buildmarker;
- 54 Such-Ersttreffer r4-27 gegen r4-28 und 26 Suchintentionen;
- 12 Chromium- und axe-Läufe bei 320 und 1440 CSS-Pixel und 48 Läufe bei vier Breiten und zwei Wurzelschriftgrössen auf den sechs geänderten Seiten;
- 7 Textnachweise mit Sichtbarkeit und 5 Nachweise für entfernte Formulierungen; 8 Deep-Links; No-JavaScript-Fallback auf vier Seiten;
- Skriptvergleich der Quellenblöcke; Volltextprüfung auf `tel:`-Links; Wortzählung.

## Nicht ausgeführt oder nicht behauptet

- keine Prüfung durch den Rechtsdienst, auch nicht zur Auslegung von § 6 Abs. 3 GSG;
- keine Bestätigung des ipw-Therapiekonzepts beim Anbieter;
- kein Merge und kein Deployment durch Claude;
- keine realen Screenreader-, Hardwaregeräte- oder Nutzendentests; keine Textvergrösserung über die Browsereinstellung;
- keine vollständige WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe.
