# Delta-Nachtest und Umsetzungsstand r4-19

## Ergebnis

Die vereinbarten P1-Korrekturen, die fachlichen/rechtlichen/sprachlichen P2-Korrekturen und die für diese Website relevanten Entscheidungen aus AR3-5 sind lokal umgesetzt. Der Produktions-Build umfasst 22 Seiten und meldet 0 Blocker sowie 0 Hinweise. Der neu erzeugte Ordner `site/` ist mit 33 Dateien bytegleich zum verifizierten Build.

Die wichtigsten Nachweise:

- 20 von 20 realistischen Suchfragen führen direkt zum vorgesehenen ersten Treffer; die fünf ursprünglichen Fehlfälle sind behoben.
- Der sicherheitsbezogene Einstieg ist von der Startseite in einem Schritt erreichbar.
- Die Datenschutzerklärung ist auf das Zürcher IDG ausgerichtet; die interne Rechts-/Datenschutzfreigabe bleibt als Nachweis offen.
- Die korrigierten Forschungsbelege lösen über DOI beziehungsweise PMID eindeutig auf; die neun Quellen der Beziehungsseite sind claimspezifisch zugeordnet.
- Alle neun P2-Sprachbefunde sind im Zieltext behoben.
- 176 Browserfälle auf allen 22 Seiten bestehen ohne Überlauf, Laufzeitfehler, zu kleine Boundary-Schrift oder zu kleine Beratungs-E-Mail-Zielfläche.
- Die Erklärungstexte der Figuren verwenden den Lesegrad; der Marker skaliert von 28 auf 56 px und bleibt zentriert.
- Ohne JavaScript sind keine funktionslosen Such-/Filterfelder sichtbar oder fokussierbar; Fallback-Inhalte bleiben erreichbar.
- 44 Browser-PDFs enthalten keine Leerseite. Die Quellenfassung ist vor und nach Scrollen textgleich.
- Die Metadatenentfernung am Logo ist bei DPR 1, 2 und 3 pixelneutral. Die vergrösserte E-Mail-Zielfläche ist bei 390 und 1440 px ebenfalls pixelneutral.

## AR3-5

P-1 bis P-7, P-9 bis P-11, P-14 und P-15 sind für diese Website lokal übernommen. P-8 ist hier nicht anwendbar. P-12 verlangt bewusst keine Änderung. P-13 wird aufgrund des bestätigten Institutionsentscheids websitespezifisch nicht übernommen: `noindex, nofollow` und `robots.txt: Disallow /` bleiben bestehen. Das gemeinsame Profilrepository und die Depressions-Website wurden nicht verändert; deren Übernahme ist nicht durch diesen lokalen Nachweis erledigt.

## Noch offen

1. Die P3-Befunde A03-010 bis A03-018 sowie A04-005 bis A04-007 waren nicht Teil der ausdrücklich vereinbarten Reihenfolge und bleiben als Optimierungen offen. A03-H01 bleibt eine nicht empirisch geprüfte Hypothese.
2. A02-001 und A02-004 sind textlich korrigiert, aber ihre Akzeptanzkriterien verlangen zusätzlich eine nachgewiesene interne Rechts-/Datenschutzprüfung. Diese wurde nicht erfunden und nicht als erledigt markiert.
3. Firefox/Safari, reale Screenreader und Geräte sowie physischer Druck wurden nicht getestet. Die früher beschlossene Grenze zu Nutzendentests bleibt bestehen.
4. Das Korrekturpaket ist weder committed noch gemergt noch deployed. Die öffentliche Website zeigt weiterhin r4-18.

## Audit 06

Audit 06 ist jetzt fachlich vorbereitet, aber formal noch nicht zulässig. Website-Audit V1.2 verlangt dafür einen fixierten korrigierten Commit und ein eindeutig zugeordnetes Deployment. Empfehlung: Korrekturstand reviewen, committen und als Preview oder Produktion deployen; danach Deployment-SHA/Artefaktparität prüfen und Audit 06 im Modus `abschluss` durchführen. Bis dahin lautet die Freigabeaussage nicht «GO», sondern: **Korrekturpaket lokal verifiziert; Abschlussfreigabe ausstehend.**
