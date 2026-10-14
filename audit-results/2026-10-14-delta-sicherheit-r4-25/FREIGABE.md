# Freigabe r4-25

Am 14. Oktober 2026 wurden dem Auftraggeber die konkreten Release-A-Fassungen zu M1.1 bis M1.9 und die Quellenänderungen zu M7.1 und M7.4 (Teil «Krisen begleiten») im Wortlaut vorgelegt, mit der Frage, ob sie im Namen der PUK freigegeben werden. Die Antwort lautete wörtlich:

> «ja, ich bin allen deinen korrekturen einverstanden»

Die Freigabe gilt für den Wortlaut der Inhaltsfragmente unter `authoring/content/` (verstehen, diagnose, krise, beziehungen, kommunizieren, rolle, quellen), wie er mit Commit `64d65ee` auf dem Branch `claude/release-a-sicherheit-r4-25-1791988026` vorgelegt wurde. Dieser Wortlaut ist im Release unverändert. Zuvor entschieden waren E1 (keine Zahl zu Suizidversuchen, Fachstelle) und E5 (Variante a, an Claude delegiert).

Nach der Bestätigung wurde `authoring/site.config.json` › `releaseApproval` auf `independentReview: bestaetigt`, `reviewedBy: PUK` und `reviewedAt: 2026-10-14` gesetzt. Der Prüfumfang steht in `reviewScope`.

Nicht von dieser Freigabe erfasst ist die technische Ergänzung R25-T01. Nach der Freigabe kamen Suchaliase in `site.config.json` dazu, für `krise #suizid-title` und `kommunizieren #worte-title`. Sie verändern keinen sichtbaren Text, nur die Auffindbarkeit in der Websitesuche. Sie sind im Pull Request zur Kenntnis zu nehmen. Ebenfalls nach der Freigabe ergänzt wurde ein Satz im internen Gestaltungsprotokoll `v-di-begleiterkrankungen` in `site.config.json`, der den ersetzten Block «Wenn Suizidgedanken dazukommen» nachführt; er wird nicht ausgegeben.

Die Freigabe ersetzt keine reale Nutzenden-, Screenreader- oder Hardwaregeräteprüfung und keine darüber hinausgehende WCAG-, ISO-, fachmedizinische oder rechtliche Gesamtfreigabe.
