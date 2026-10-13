# Prüfumfang

## Prüfstand und Modus

Geprüft wurde ausschliesslich `main` am Commit `13a7e4f62754ab3c1c68c49329d88be3e0845912`, Build `r4-18`, im Modus `bestand`. Das produktive Netlify-Deployment `6ace511614762f5a379993dd` verweist auf denselben Commit. `authoring/` ist die kanonische Quelle, `site/` das erzeugte Publikationsartefakt.

Bestehende Audits wurden versionsgebunden rekonstruiert. Wo der aktuelle Stand unverändert und der Nachweis reproduzierbar war, erfolgte eine Delta- oder Regressionsprüfung. Fachliche, sprachliche und visuelle Bereiche mit unzureichender älterer Evidenz wurden erneut vollständig oder gezielt vertieft geprüft.

## Seiteninventar

Geprüft wurden 21 reguläre Inhaltsseiten und die 404-Seite:

1. `/` – Startseite
2. `/kurz` – Kurz und klar
3. `/verstehen` – Borderline verstehen
4. `/beziehungen` – Alltag und Beziehungen
5. `/rolle` – Die eigene Rolle
6. `/grenzen` – Grenzen setzen
7. `/diagnose` – Diagnose und Abklärung
8. `/behandlung` – Behandlung
9. `/kommunizieren` – Zugewandt und klar sprechen
10. `/krise` – Krisen begleiten
11. `/kinder` – Wenn Kinder mitbetroffen sind
12. `/selbstfuersorge` – Auf sich achten
13. `/genesung` – Genesung und Perspektive
14. `/unterstuetzung` – Unterstützung finden
15. `/buecher` – Bücher
16. `/fragen` – Fragen und Nachschlagen
17. `/begriffe` – Begriffe
18. `/quellen` – Quellen
19. `/suche` – Suche
20. `/ueber` – Über diese Website
21. `/impressum-datenschutz` – Impressum und Datenschutz
22. `/404` beziehungsweise unbekannte Route – Fehlerseite

## Tatsächlich geprüft

- Repository, Branch, SHA, Buildmarker, Quell-/Buildstruktur und Arbeitsbaum.
- Tatsächliches Produktionsprojekt, Deploy-ID, Deploy-Commit, Status und URL.
- Historische Auditkette, Korrekturen, Pendenzen und institutionelle Entscheide.
- Vollständige Sitemap, Hierarchie, Querverweise, Redundanzen, Sackgassen und zehn Aufgabenwege.
- 897 interne Links, darunter 507 Fragmentlinks.
- Alle sichtbaren Inhalte und zentralen Begriffe; Schweizer Standarddeutsch, Empathie, Stigmatisierung, Handlungsnähe und didaktische Reihenfolge.
- Medizinische Kernaussagen, Safety-Logik, ausgewählte rechtliche Aussagen, Angebotsangaben und reproduzierbare Literaturmetadaten.
- 68 eindeutige externe URLs; HTTP-Antworten wurden nicht mit inhaltlicher Richtigkeit gleichgesetzt.
- Alle zehn Wissensdarstellungen sowie Typografie, Hierarchie, Weissraum, mobile Darstellung und Textalternativen.
- Produktionsbuild: 22 Seiten, 33 Dateien bytegleich, 0 Blocker, ein bekannter bibliografischer Hinweis `144`.
- 110 Browserläufe: 22 Seiten × 320, 375, 768, 1024 und 1440 CSS-Pixel.
- Axe 4.10.3 auf allen 110 Läufen, DOM-Struktur, doppelte IDs, Alternativtexte, horizontales Reflow, Laufzeit- und Ressourcenfehler. Für die lokale Axe-Injektion wurde die CSP im Testkontext umgangen; die produktive CSP wurde separat über die echten HTTP-Header geprüft.
- Skriptierte 200-Prozent-Textvergrösserung, JavaScript-aus-Fallback, automatisierte Tastaturbedienung, Deep Links, Fokus, Akkordeons, Suche, Filter, Nulltreffer und 404-Wiederherstellung.
- HTTP-Sicherheitsheader, Meta-/HTTP-`noindex,nofollow` und `robots.txt`.

## Standards und Bewertungsrahmen

- ISO 9241-110: Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Steuerbarkeit, Fehlertoleranz und Lernförderlichkeit.
- ISO 9241-210: menschenzentrierter Prozess und transparente Evidenzgrenzen.
- ISO 9241-11: Effektivität, Effizienz und Zufriedenheit im Nutzungskontext. Zufriedenheit und reale Effektivität konnten ohne Nutzende nicht empirisch bestimmt werden.
- WCAG 2.2 AA als Qualitätsziel. Automatisierte und manuelle Prüfungen begründen keine vollständige Konformitätserklärung.
- Nielsen-Norman-Heuristiken, insbesondere Sichtbarkeit des Systemstatus, Übereinstimmung mit der Lebenswelt, Konsistenz, Fehlervermeidung, Wiedererkennen statt Erinnern und minimalistisches Design.

## Nicht oder nur eingeschränkt geprüft

- Keine Tests mit Angehörigen, Menschen mit eigener Borderline-Erfahrung oder Personen in hoher emotionaler Belastung. Diese materielle Evidenzlücke ist im Projekt organisatorisch akzeptiert und wird nicht erneut als Rekrutierungsauflage formuliert.
- Keine realen Screenreader-Tests mit NVDA, JAWS, VoiceOver oder TalkBack.
- Keine physischen Hardwaretastaturen, Touchgeräte oder realen Mobilgeräte.
- Kein realer Firefox-, Safari-/WebKit- oder Windows-Hochkontrastlauf im aktuellen Audit.
- Kein echter Browserzoom; geprüft wurde Textvergrösserung und Reflow.
- Keine vollständige manuelle WCAG-2.2-AA-Konformitätsprüfung jedes Erfolgskriteriums.
- Keine formelle klinische, juristische, Datenschutz- oder institutionelle Freigabe.
- Keine vollständige Volltextanalyse paywallgeschützter Studien.
- Keine Prüfung von Netlify-Vertrag, Auftragsbearbeitungsvereinbarung, Log-Aufbewahrung oder Account-Innenkonfiguration.
- Keine realen Wartezeiten, freien Therapieplätze oder individuellen Kostenübernahmen.
- Kein physischer Druck auf realen Geräten; aktuelle Codeprüfung und versionsgleicher historischer Drucknachweis wurden verwendet.
- Keine Leistungsprüfung unter gedrosseltem Netzprofil und kein aktueller Lighthouse-Lauf.

## Abgrenzung

Audit 06 wurde nicht durchgeführt. Es wurde keine Website-, Code-, Netlify-, Zugangs-, Commit-, PR-, Merge- oder Veröffentlichungsänderung vorgenommen. Die erzeugten Dateien sind ausschliesslich Audit-Arbeitsartefakte.
