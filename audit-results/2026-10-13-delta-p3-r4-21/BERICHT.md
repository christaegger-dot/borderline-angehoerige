# Delta-Nachprüfung P3 und Altersinklusion r4-21

## Ergebnis

Der geprüfte Implementierungsstand ist Commit `a61a602fdc2e108a9e289e4bbc81e174940f2ff6` auf Branch `codex/p3-optimierungen-2026-10-13`.

- Die 22 ausgelieferten Seiten und die kanonischen Quellen enthalten keine Aussage, welche die Angehörigenberatung der Fachstelle auf Erwachsene begrenzt.
- Der institutionell bestätigte Satz steht im Footer als eigener vollständiger Satz: «Die Fachstelle Angehörigenarbeit der PUK berät Angehörige kostenlos und vertraulich.»
- Altersangaben an anderen Stellen betreffen den Geltungsbereich von Studien oder Leitlinien, Behandlungsentscheidungen beziehungsweise konkrete Familienrollen. Sie begrenzen nicht den Zugang zur Angehörigenberatung.
- A03-010 bis A03-018 und A04-005 bis A04-007 erfüllen die im Bestandsaudit formulierten Akzeptanzkriterien.
- Die Browsermatrix aus 22 Seiten, vier Breiten und zwei Textgrössen bestand 1150 von 1150 Einzelprüfungen; es traten keine JavaScript-, Konsolen- oder Ressourcenfehler auf.
- Alle 36 Such-Ersttreffer sind gegenüber der Produktion r4-20 unverändert. Sechs Safety- und drei Überlastungsformulierungen führen weiterhin zu den vorgesehenen Inhalten.
- Die drei geänderten Wissensdarstellungen wurden bei 320 und 1440 CSS-Pixel visuell geprüft. Sie sind lesbar, ohne horizontalen Überlauf und inhaltlich kongruent.
- Produktions-Build und Exportvergleich melden 22 Seiten, 0 Blocker, 0 Hinweise und 33 bytegleiche Dateien.

## Einordnung der Altersfundstellen

Die Formulierung «Diese Hinweise richten sich an Angehörige erwachsener Personen» unter `genesung.html#freiwillig` begrenzt ausdrücklich nur die dort erläuterten Vertretungs- und Behandlungsrollen. Im selben Abschnitt werden urteilsfähige Minderjährige und Eltern Minderjähriger gesondert eingeordnet. Die Aussage betrifft nicht das Beratungsangebot der Fachstelle.

Die Bezeichnungen «Erwachsenes Kind», «Leitlinie für Erwachsene» und Angaben zu erwachsenen Studiengruppen beschreiben Rollen beziehungsweise Evidenzgrenzen. Auch daraus ergibt sich keine Zugangsbeschränkung der Beratung.

## Evidenzgrenzen

A03-H01 bleibt eine nicht empirisch überprüfte Wirkungshypothese. Der Titel «Krisen begleiten» wurde nicht geändert. Ohne reale Nutzendentests wird keine Wirkung des Titels behauptet.

Nicht durchgeführt wurden reale Screenreader-, Hardwaregeräte-, Firefox-, Safari-, Windows-Hochkontrast- oder Nutzendentests. Der Lauf belegt daher keine vollständige WCAG- oder ISO-Konformität. Die Produktion liefert weiterhin r4-20; r4-21 benötigt nach einem Merge einen Produktions-Smoke-Test.

## Status

**Lokal und im PR vollständig nachgeprüft; Merge, Deployment und Produktionsnachtest ausstehend.** PR #674 ist mergebar. GitHub-Build sowie Netlify Header-, Redirect- und Preview-Checks sind erfolgreich. Das Preview antwortet ausserhalb des Netlify-Teamzugangs mit HTTP 401; diese Sperre wurde nicht umgangen.
