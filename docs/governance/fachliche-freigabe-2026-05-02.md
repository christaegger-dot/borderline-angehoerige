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

- Die technische Release-Vorbereitung ist gruen mit dokumentierten
  Resthinweisen aus der Browser-Matrix-Methodik.
- Die letzte inhaltliche Freigabe fuer Hochrisiko-Seiten muss bewusst durch
  eine fachlich verantwortliche Person erfolgen.
- Ohne dokumentiertes fachliches Sign-off soll das Release nicht als
  vollstaendig freigegeben gelten.

### Naechster Review-Termin

- ausstehend
