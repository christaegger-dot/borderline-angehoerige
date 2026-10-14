# Freigabe r4-27

Am 14. Oktober 2026 wurden dem Auftraggeber die konkreten r4-27-Fassungen zu den Paketen 2, 3, 5 und 7 sowie zu M6.7 im Wortlaut vorgelegt (`FREIGABE-VORLAGE.md`, Wortlaut aus Commit `9a07502`), zusammen mit dem Ergebnis der unabhängigen Prüfung, den Abweichungen vom Massnahmenplan, der beabsichtigten Änderung des Such-Ersttreffers «Gewalt» und der Wortbilanz. Gefragt wurde, ob die Fassungen im Namen der PUK freigegeben werden, einschliesslich der Rechtstexte ohne Prüfung durch den Rechtsdienst. Die Antwort lautete wörtlich:

> «Freigabe»

Die Freigabe gilt für den Wortlaut aus Commit `9a07502` auf dem Branch `claude/release-b-r4-27-1792000693`. Dieser Wortlaut ist im Release unverändert (Testmatrix R27-005).

## Vorausgehende Entscheide vom 14. Oktober 2026

| Nr. | Entscheid | Entschieden von |
| --- | --- | --- |
| E2 | Erblichkeit mit «rund 40 bis 50 %» und Einordnung nennen | Auftraggeber |
| E3 | ICD-10-GM-Wortlaut zu F60.31 ergänzen (Neuentscheid zu V-1) | Auftraggeber |
| E6 | Nicht zitierte Quellen ins interne Prüfprotokoll verschieben | Claude, vom Auftraggeber delegiert («Bitte entscheide alles selbstständig») |
| E8 | A03-019 nach «Behandlung» verschieben (M3.4), A03-025 nur ergänzen (M3.5), A03-026 nicht öffnen | Claude, vom Auftraggeber delegiert |
| E10 | Abbildung 2 auf «Genesung» ersetzen | Claude, vom Auftraggeber delegiert |
| Paket 3 | in Release B umsetzen, ohne Rechtsdienst, Freigabe durch den Auftraggeber («In Release B, ich gebe frei») | Auftraggeber |

## Umsetzung der Freigabe

Nach der Bestätigung wurde `authoring/site.config.json` › `releaseApproval` auf `independentReview: bestaetigt`, `reviewedBy: PUK` und `reviewedAt: 2026-10-14` gesetzt; der Prüfumfang steht in `reviewScope`. Die vier betroffenen Zeilen im `visualPlan` (`v-vs-eisberg`, `v-be-kontakt`, `v-ge-forschung`, `v-ge-einfluesse`) stehen auf `freigegeben`.

Die Freigabe ersetzt keine juristische Prüfung der Rechtstexte (R27-O01), keine Bildsprache-Prüfung R2 der neuen Abbildung (R27-O02) und keine reale Nutzenden-, Screenreader- oder Hardwaregeräteprüfung sowie keine darüber hinausgehende WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe.
