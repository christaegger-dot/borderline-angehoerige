# Delta-Nachprüfung der visuellen Umsetzung r4-22

## Ergebnis

Die technische und redaktionelle Umsetzung der Befunde A04-008 bis A04-013 ist im kanonischen Ordner `authoring/` vollständig vorhanden. Der lokale Draft-Build erzeugt 22 Seiten mit 0 Blockern und genau vier erwarteten Freigabehinweisen.

- Die Tassen- und Abenddarstellung sind ohne zusätzliche Interaktion sichtbar. Nur die anschliessenden Vertiefungstexte bleiben geschlossen.
- Der erste Zuständigkeitsverweis auf der Krisenseite bleibt als deutlicher Sicherheitsblock gestaltet. Die sechs wortgleichen Wiederholungen sind als ruhigere Randhinweise dargestellt; Wortlaut und Erreichbarkeit bleiben unverändert.
- Das frühere Eisbergmodell behauptet keine verborgene Ursache mehr. Es trennt Beobachtbares, von aussen offene Bedeutung und eine mögliche Frage gleichwertig voneinander.
- Die Behandlungsdarstellung unterscheidet das Mitteilen eigener Beobachtungen vom Erhalten vertraulicher Auskunft und nennt die notwendige Einwilligung oder andere Rechtsgrundlage.
- Die Kinderdarstellung weist Schutz, Erklärung und Hilfe dem Kind zu, während Erwachsene und Fachpersonen die Erwachsenenaufgaben tragen.
- Die Genesungsdarstellung zeigt fünf gleichwertige Einflussbereiche ohne Kausalpfad, Rangfolge, Formel oder persönliche Prognose.

## Technischer Nachweis

Die Browsermatrix umfasste 140 Layoutzustände. Es gab keinen horizontalen Überlauf, kein sichtbar ausserhalb des Viewports liegendes Element und keinen Laufzeit- oder Konsolenfehler. 14 axe-Läufe meldeten keine automatisiert erkennbaren Verstösse im geprüften Regelumfang. Alle sieben Fokusprüfungen zeigten einen sichtbaren Fokusindikator.

Die beiden zuvor versteckten Figuren sind bei geschlossenem Ausgangszustand sichtbar. Auf der Krisenseite wurden bei 375 und 1440 CSS-Pixel exakt ein primärer und sechs reduzierte Hinweise mit identischem Wortlaut verifiziert. Die sechs Wissensdarstellungen wurden bei beiden Breiten visuell kontrolliert. Ein dabei festgestellter unschöner Wortumbruch von «Behandlungsteam» wurde vor dem finalen Regressionslauf korrigiert.

## Freigabe

Die unabhängige fachliche, rechtliche, sicherheitsbezogene und didaktische Delta-Prüfung vom 14. Oktober 2026 stellte für A04-009 bis A04-013 keinen Korrekturbedarf fest. Der Auftraggeber bestätigte anschliessend am selben Tag ausdrücklich im Namen der PUK die institutionelle Freigabe aller fünf Befunde. Die vier zuvor blockierenden Visualisierungsstatus dürfen damit auf `freigegeben` gesetzt werden.

## Evidenzgrenzen

Automatisierte Browser- und axe-Prüfungen belegen weder vollständige WCAG-Konformität noch fachliche, rechtliche oder didaktische Richtigkeit. Die dauerhaft akzeptierten Grenzen zu realen Nutzenden-, Screenreader- und Hardwaretests bleiben bestehen.

## Status

**Institutionell freigegeben und lokal releasebereit.** Der nach der Freigabe ausgeführte Produktionsbuild erzeugte 22 Seiten mit 0 Blockern und 0 Hinweisen; 33 Exportdateien sind bytegleich. Die Gesamtbrowsermatrix umfasste 110 Seiten-/Viewport-Läufe, 66 axe-Läufe und 22 zusätzliche 200-Prozent-Textprüfungen ohne blockierenden Befund. Die vertiefte Matrix der sieben betroffenen Seiten blieb in 140 Zustandsprüfungen ohne Überlauf oder Laufzeitfehler. Alle 36 Such-Ersttreffer blieben gegenüber r4-21 unverändert. CI, Preview und Produktion werden getrennt nach Push beziehungsweise Merge verifiziert.
