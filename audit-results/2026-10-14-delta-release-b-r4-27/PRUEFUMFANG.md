# Prüfumfang r4-27

Geprüft wurde Release B des Massnahmenplans vom 14. Oktober 2026 auf dem Branch `claude/release-b-r4-27-1792000693`, ausgehend von `origin/main` @ `6a0f8cc64db6a410ad0ffc1d6e75932a7e6d9825` und Release r4-26.

## Tatsächlich ausgeführt

- Faktenprüfung aller neuen Aussagen an Primärquellen: ZGB (Stand 1. Juli 2026), GSG und EG KESR Zürich, StGB Art. 181b, EBG-Informationsblätter, Abstracts und Metadaten über PubMed und Crossref, BfArM ICD-10-GM 2024, DNB und Verlagsseiten, Angebotsseiten von NAP, iks, ipw, Budget- und Schuldenberatung;
- unabhängige Prüfung durch eine Sitzung, die nicht gebaut hat (29 Befunde, siehe `BERICHT.md`), danach Einarbeitung und erneute Tests;
- Draft-Build vor der Freigabe und Produktionsbuild danach; bytegleiche Exportparität aller 33 Dateien;
- 44 Chromium-Läufe aus 22 Seiten und zwei Breiten;
- 120 Chromium- und axe-Läufe auf den 15 geänderten Seiten bei vier Breiten und zwei Wurzelschriftgrössen, dazu 30 Läufe bei 320 und 1440 CSS-Pixel;
- 54 Such-Ersttreffer im Vergleich r4-26 gegen r4-27 und 26 Suchintentionen;
- 40 Textnachweise für neue und 14 für entfernte Formulierungen; Sichtbarkeit von 18 Stellen mit Öffnen von Vertiefungen und Akkordeons per Tastatur;
- 8 Deep-Link-Klicks und No-JavaScript-Fallback auf vier Seiten;
- Skriptvergleich aller Quellenblöcke mit «Verwendet auf» und den Gruppenzählern; Volltextprüfung auf `tel:`-Links;
- Wortzählung der Fragmente;
- Bildschirmaufnahmen der neuen Elemente bei 320 und 1440 CSS-Pixel.
- nach dem Merge: Produktionstest gegen `https://borderline-angehoerige.netlify.app` (44 Chromium-Läufe, Suche, Texte, Sprungziele, No-JavaScript, 404, Header, Bytegleichheit der Nicht-HTML-Dateien) und Prüfung der fünf Codex-Befunde an den Primärquellen.

## Nicht ausgeführt oder nicht behauptet

- keine Prüfung durch den Rechtsdienst (Entscheid des Auftraggebers vom 14. Oktober 2026);
- keine Bildsprache-Prüfung R2 der neuen Abbildung;
- keine direkte Bestätigung der Angebote bei iks und ipw; ipw.ch war nur über ein Abrufwerkzeug lesbar;
- kein Merge und kein Deployment durch Claude;
- keine realen Screenreader-, Hardwaregeräte- oder Nutzendentests; keine Textvergrösserung über die Browsereinstellung;
- keine vollständige WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe.
