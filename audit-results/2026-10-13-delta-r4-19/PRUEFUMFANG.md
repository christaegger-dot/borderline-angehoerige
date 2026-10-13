# Prüfumfang des Delta-Nachtests r4-19

Geprüft wurde der lokale Korrekturstand auf Basis von `13a7e4f62754ab3c1c68c49329d88be3e0845912`. Kanonische Quelle ist `authoring/`; `site/` wurde daraus neu erzeugt. Das Produktionsdeployment blieb unverändert auf r4-18.

Einbezogen wurden alle 22 erzeugten HTML-Seiten, die geänderten Inhaltsfragmente, Suche und Suchindex, CSS, Interaktionsskript, Produktionsgate, Header, Logo, Fonts, Weiterleitungen, Robots-Steuerung sowie der generierte Export.

Tatsächlich ausgeführt wurden Produktions-Build und Exportvergleich, 176 Browserfälle aus 22 Seiten × vier Breiten × zwei Textgrössen, 20 natürliche Suchfragen, JavaScript-aus-Fallbacks, Skiplink und FAQ-Tastaturbedienung, Marker- und Textgrössenmessungen, Pixelvergleiche, 44 Browser-PDFs sowie Metadaten- und Zielprüfungen der korrigierten Quellen.

Nicht ausgeführt wurden reale Screenreader-, reale Geräte-, Firefox-, Safari-, Windows-Hochkontrast-, physische Druck- oder Nutzendentests. Diese Grenzen dürfen nicht als bestanden ausgelegt werden. Die interne Rechts-/Datenschutzprüfung ist nicht nachgewiesen.

Audit 06 wurde nicht durchgeführt: Dafür fehlen ein fixierter Korrekturcommit und ein diesem Commit eindeutig zugeordnetes Deployment.
