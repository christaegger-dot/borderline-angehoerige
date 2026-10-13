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

## Verbleibende Freigaben

Der Produktionsbuild blockiert r4-22 absichtlich an vier Stellen:

1. `v-vs-eisberg`: fachlich-didaktischer Delta-Review;
2. `v-be-kontakt`: Rechts- und Fachreview;
3. `v-ki-alltag`: Kinderschutz- und Fachreview;
4. `v-ge-einfluesse`: fachlicher Delta-Review.

Diese Sperren sind kein technischer Fehler, sondern die vorgesehene Trennung zwischen Umsetzung und institutioneller Freigabe. A04-009 benötigt zusätzlich die dokumentierte Safety-/Fachbestätigung der abgestuften Darstellung, auch wenn dafür keine eigene Visualisierungs-ID existiert.

## Evidenzgrenzen

Automatisierte Browser- und axe-Prüfungen belegen weder vollständige WCAG-Konformität noch fachliche, rechtliche oder didaktische Richtigkeit. Die dauerhaft akzeptierten Grenzen zu realen Nutzenden-, Screenreader- und Hardwaretests bleiben bestehen.

## Status

**Lokal technisch verifiziert, noch nicht veröffentlichungsfähig.** `site/`, Preview und Produktion wurden nicht verändert. Nach dokumentierter Freigabe der fünf Prüfpunkte sind Produktionsbuild, Exportparität, vollständiger Delta-Smoke-Test und erst danach ein Merge beziehungsweise Deployment zulässig.
