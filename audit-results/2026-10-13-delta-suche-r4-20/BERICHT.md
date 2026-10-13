# Delta-Smoke-Test Suchhotfix r4-20

## Ergebnis

Der im Produktions-Smoke-Test von r4-19 bestätigte P1-Befund ist im fixierten Commit `6f3f5fa3caa39051e5fd9f9f652dd35430608e77` behoben. Mehrwort-Intentionen werden vor der Zerlegung in Einzelwörter erkannt; die längste passende Phrase erhält Vorrang. Dadurch wird beispielsweise «will nicht mehr leben» als Safety-Frage und nicht als allgemeine Ablehnung bewertet.

- 14 von 14 gezielten Safety- und Überlastungsformulierungen führen zum vorgesehenen Ersttreffer.
- «Mein Kind will nicht mehr leben», «Sie möchte nicht mehr leben», «Er will sterben» und verwandte Formulierungen führen zu «Wenn Suizidgedanken ein Thema sind».
- «Ich kann nicht mehr», «Keine Kraft» und «Am Ende» führen zu «Warnsignale für Überlastung».
- Im Vergleich von 36 Suchfragen bleiben 31 Ersttreffer gegenüber r4-19 unverändert; fünf problematische Ersttreffer ändern sich gezielt.
- Der technische Delta-Smoke-Test besteht 134 von 134 Prüfungen.
- Produktions-Build und Exportvergleich melden 22 Seiten, 0 Blocker, 0 Hinweise sowie 33 bytegleiche Dateien.
- GitHub-Build, Netlify Header-/Redirect-Prüfungen und Deploy-Preview-Status für PR #673 sind erfolgreich.

## Status

**Hotfix lokal und im PR verifiziert; Produktionsnachtest ausstehend.** PR #673 ist noch nicht gemergt. Die öffentliche Website liefert weiterhin r4-19. Das Netlify-Preview antwortet ausserhalb des Teamzugangs mit HTTP 401; diese Zugriffssperre wurde nicht umgangen.

Nach Merge und Produktionsdeployment müssen mindestens Buildmarker r4-20, das JavaScript-Asset r4-20 und die 14 festgeschriebenen Suchformulierungen auf der öffentlichen URL erneut geprüft werden.
