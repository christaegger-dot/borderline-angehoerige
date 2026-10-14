# Prüfumfang Audit 06 für r4-22

## Fixierter Prüfstand

Geprüft wurde `main`-Commit `160a42f92eb78e4a0af806fc74babea1ab712937`. Der Website-Release stammt aus Merge-Commit `7864dab6f48ef4e52db1e783387032a0c0de8e93`; der nachfolgende Commit ergänzt nur den Produktionsnachweis. `authoring/` und `site/` sind zwischen beiden Commits unverändert. Die öffentliche Website lieferte während des Abschlusslaufs den Buildmarker r4-22.

## Geprüft

- Produktionsbuild und Vertrag aller 22 Seiten;
- Byteparität der 33 generierten Exportdateien;
- alle 22 ausgelieferten HTML-Seiten bei 320, 375, 768, 1024 und 1440 CSS-Pixeln;
- 200 Prozent Basisschrift auf allen 22 Seiten;
- automatisierte axe-Prüfung bei 320, 768 und 1440 CSS-Pixeln;
- Laufzeit-, Ressourcen-, Struktur-, Fokus-, Tastatur-, Sprungziel-, Akkordeon-, Filter- und Suchzustände;
- No-JavaScript-Fallback und eigene 404-Antwort;
- 36 festgeschriebene Suchfragen, darunter Safety- und Überlastungsformulierungen;
- sechs realistische Nutzerreisen: akute Sorge, Schnellorientierung, Behandlung/Vertraulichkeit, Kinder, eigene Überlastung und Angehörigenberatung;
- CSP, HSTS, X-Content-Type-Options, X-Frame-Options, X-Robots-Tag, Referrer- und Permissions-Policy;
- `robots.txt` sowie drei repräsentative 301-Weiterleitungen;
- Status der älteren A06-Befunde und der aktuellen Pendenzen.

## Nicht geprüft

- reale Nutzung mit NVDA/Firefox oder VoiceOver/Safari;
- reale Hardwaretastatur, reale Touchgeräte und Windows-Hochkontrastmodus;
- Nutzendentests mit Angehörigen oder Menschen mit eigener Borderline-Erfahrung;
- formelle Gesamtprüfung von Impressum und Datenschutz durch den PUK-Rechtsdienst;
- externer funktionaler Browserlauf im Deploy-Preview, da dieser mit HTTP 401 durch Netlify-Teamzugang geschützt war.

Diese Punkte werden weder durch Chromium, axe noch durch simulierte Nutzerreisen ersetzt. Die Produktion selbst war vollständig erreichbar und wurde direkt geprüft.
