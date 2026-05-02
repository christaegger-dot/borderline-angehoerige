# Fachliche Freigabe 2026-05-02

Vorbereiteter Sign-off-Entwurf fuer das Release-Gate
`Fach- und Kontakt-Audit`.

Wichtig: Diese Datei dokumentiert den vorbereiteten Freigabestand, ersetzt
aber **kein** fachliches Sign-off. Die finale Freigabe muss durch eine
fachlich verantwortliche Person erfolgen.

## Fachliche Freigabe

- Release / PR: `main`
- Commit / Deploy-Stand bei Vorbereitung: `043a4ff`
- Datum der technischen Vorbereitung: `2026-05-02`
- Fachlich pruefende Person: ausstehend
- Rolle / Funktion: ausstehend

### Gepruefter Scope

- [ ] /soforthilfe
- [ ] /notfallkarte
- [ ] /notfallkarte/erstellen
- [ ] /unterstuetzen/krise
- [ ] /diagnostik
- [ ] /begleiterkrankungen
- [ ] /grenzen
- [ ] /beratung
- [ ] /quellen
- [ ] lokale Notfall-PDFs
- [ ] client/src/data/kontakte.ts

### Technischer Vorlauf bereits erledigt

- [x] Produktions-Crawl / Link-Audit
- [x] SEO- / Metadaten-Audit
- [x] Security- / Caching-Audit
- [x] PDF- / Download-Audit fuer lokale und kanonische Materialien
- [x] Browser-Matrix technisch gruen mit Hinweisen dokumentiert unter
      `qa/release-browser-matrix.md`

### Technischer Gate-Stand am Vorbereitungsdatum

- [x] keine offenen technischen Release-Blocker im geprueften Scope
- [x] Notfallkarten-Druckpfad auf Production verifiziert
- [x] PDF- / Download-Pfade auf Production verifiziert
- [x] Browser-Matrix Pflichtteil auf Production bestanden

### Unterlagen fuer die fachliche Pruefung

- `docs/governance/10-fachliche-freigabe-vorlage.md`
- `qa/release-browser-matrix.md`
- `qa/audit-pdf-handouts.md`
- `client/src/data/kontakte.ts`

### Empfohlene fachliche Pruefreihenfolge

1. Akute Krisen- und Notfallinhalte:
   `/soforthilfe`, `/notfallkarte`, lokale Notfall-PDFs
2. Kontakt- und Beratungsinhalte:
   `client/src/data/kontakte.ts`, `/beratung`, `/unterstuetzen/krise`
3. Medizinisch / fachlich sensible Lesestrecken:
   `/diagnostik`, `/begleiterkrankungen`, `/grenzen`, `/quellen`

### Konkrete fachliche Fokusfragen

- Stimmen Notfallnummern, PUK-Daten und Beratungsangaben in Website,
  Notfallkarte und Kontaktregister inhaltlich ueberein?
- Sind rechtliche und medizinische Begriffe fuer Angehoerige korrekt und
  nicht missverstaendlich formuliert?
- Passen Krisenhinweise, Eskalationslogik und lokale Einordnung fuer
  Schweiz / Zuerich?
- Sind Quellen- und Review-Hinweise fuer Hochrisiko-Seiten fachlich
  plausibel und aktuell genug?

### Pruefgegenstaende

- [ ] Notfallnummern korrekt
- [ ] PUK- und Beratungsdaten korrekt
- [ ] rechtliche Begriffe korrekt und nicht missverstaendlich
- [ ] Quellen- und Krisenhinweise korrekt
- [ ] lokale Relevanz fuer Schweiz / Zuerich gegeben
- [ ] Soforthilfe-Logik intakt
- [ ] keine neue fachliche Aussage ohne belastbare Quelle

### Ergebnis

- [ ] fachlich freigegeben
- [ ] freigegeben mit Auflagen
- [x] noch nicht fachlich freigegeben

### Hinweise / Auflagen

- Externe Web-Quellenpruefung vom `2026-05-02` ist technisch eingearbeitet,
  aber bewusst noch **kein** fachliches Sign-off. Ohne telefonische
  Verifikation und ohne Freigabe durch die verantwortliche Person bleibt das
  Release fachlich offen.
- Korrigiert im technischen Vorbereitungspaket:
  `AERZTEFON 0800 33 66 55` nur noch als nicht lebensbedrohliche Triage,
  `Opferhilfe 142`, `Opferhilfe Zuerich 24/7 044 455 21 42`,
  `Opferberatung Zuerich 044 299 40 50`,
  `Forensic Nurses Zuerich 0800 09 09 09`, statische Notfallkarte und
  `Notfallkarte-Zuerich-Psychische-Krise.pdf` inkl. Linkziele und Vorschau.
- Quellenlage Stand `2026-05-02`:
  `AERZTEFON 0800 33 66 55`, `SOS AERZTE 044 360 44 44`,
  `Opferhilfe national 142`, `Opferhilfe Zuerich 24/7 044 455 21 42`,
  `Opferberatung Zuerich 044 299 40 50`,
  `Forensic Nurses 0800 09 09 09`,
  PUK-Notfallnummern `058 384 66 66`, `058 384 20 00`, `058 384 46 82`,
  Fachstelle Angehoerigenarbeit `058 384 38 00`,
  Stand-by-You-HelpLine `0800 840 400`.
- Offener Quellenkonflikt:
  Das KIZ wird auf der PUK-Seite mit `058 384 65 00` und Hinweis
  `Durchwahlnummer 4` gefuehrt, auf `Notfall & Rettung` des Kantons
  Zuerich dagegen weiter mit `044 296 73 10`. Vor fachlicher Freigabe muss
  bewusst festgelegt werden, welche Quelle hier als kanonisch gilt.
- Offene Pflegeauflagen:
  Stand by You publiziert aktuell
  `Montag 09:30-19:00`, `Dienstag 10:00-18:00`,
  `Mittwoch 09:00-11:00`, `Donnerstag 10:00-12:00 / 16:00-18:00`,
  `Freitag 08:30-14:00`, ausgenommen oeffentliche Feiertage.
  VASK Zuerich publiziert aktuell fuer das Beratungstelefon
  `Dienstag 10:00-14:00` und `Donnerstag 15:00-18:00` unter
  `044 240 48 68`. Diese driftanfaelligen Angaben sollten weiterhin
  zentral gepflegt und reviewpflichtig bleiben.
- Die technische Release-Vorbereitung ist gruen mit dokumentierten
  Resthinweisen aus der Browser-Matrix-Methodik.
- Die letzte inhaltliche Freigabe fuer Hochrisiko-Seiten muss bewusst durch
  eine fachlich verantwortliche Person erfolgen.
- Ohne dokumentiertes fachliches Sign-off soll das Release nicht als
  vollstaendig freigegeben gelten.

### Naechster Review-Termin

- ausstehend
