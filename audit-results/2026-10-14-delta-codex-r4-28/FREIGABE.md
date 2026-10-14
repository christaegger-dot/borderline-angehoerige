# Freigabe r4-28

Am 14. Oktober 2026 wurden dem Auftraggeber die fünf korrigierten Fassungen im Wortlaut vorgelegt, je mit dem Codex-Befund, dem Ergebnis der Prüfung an den Primärquellen und der bisherigen Fassung. Beim Gewaltschutz war vermerkt, dass Codex nur beim Fristbeginn recht hat und die Höchstdauer im Gesetzeswortlaut übernommen wird. Gefragt wurde: «Gibst du diese fünf Fassungen frei?» Die Antwort vom 14. Oktober 2026, 23:00 Uhr (UTC+2), lautete wörtlich:

> «Freigegeben»

Der freigegebene Wortlaut steht in `FREIGABE-VORLAGE.md`. Vorgelegt wurde er als Entwurfscommit `1845c6b` auf dem Branch `claude/codex-befunde-r4-27-entwurf-1792011571`; in r4-28 ist er unverändert übernommen (Commit `dceb91188763f96e90efaa5727ae7c1a9b37ad01`, Testmatrix R28-004).

## Unabhängige Prüfung

Die fünf Korrekturen gehen auf das Codex-Review von PR #684 zurück und wurden an den Primärquellen geprüft. Das Codex-Review von PR #685 prüfte r4-28 (Commit `df746e7`, abgeschlossen am 14. Oktober 2026 um 21:15 UTC) unabhängig von der bauenden Sitzung. Es meldete keinen Befund zu den fünf Inhaltskorrekturen, aber drei zur Dokumentation: den veralteten Abschlussstand im Pendenzendokument, den nur über einen Entwurfscommit belegten Freigabewortlaut und `independentReview`, das bei Beginn der Runde schon auf `bestaetigt` stand, bevor eine unabhängige Prüfung vorlag. Die ersten beiden sind eingearbeitet, diese Vorlage ist eine davon. Zum dritten: `independentReview` steht auf der Grundlage dieses Reviews auf `bestaetigt`, wie bei PR #102 (`authoring/PRUEFBERICHT.md`). Ein erneutes Codex-Review auf dem letzten Stand ist angefordert.

## Umsetzung der Freigabe

`authoring/site.config.json` › `releaseApproval` nennt in `reviewScope` den Umfang von r4-28. Die Freigabe von r4-27 gilt für alle übrigen Inhalte weiter, Paket 3 weiterhin ohne Prüfung durch den Rechtsdienst.

Die Freigabe ersetzt keine juristische Prüfung der Rechtstexte (R27-O01) und keine reale Nutzenden-, Screenreader- oder Hardwaregeräteprüfung sowie keine darüber hinausgehende WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe.
