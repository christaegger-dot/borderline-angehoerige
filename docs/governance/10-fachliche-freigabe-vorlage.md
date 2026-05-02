# Fachliche Freigabe-Vorlage

Diese Vorlage ist für das formale Sign-off des Release-Gates
`Fach- und Kontakt-Audit` gedacht.

Sie kann:

- in einen PR-Kommentar
- in ein Release-Issue
- in ein internes Freigabeprotokoll

kopiert und dort ausgefüllt werden.

## Wann verwenden

Vor jedem Release mit Änderungen an:

- Hochrisiko-Seiten
- Kontakt- und Kriseninhalten
- Diagnostik-, Quellen- oder Beratungsinhalten
- lokalen Notfall-PDFs

## Pflicht-Scope

Mindestens diese Stellen prüfen, wenn sie vom Release betroffen sind:

- `/soforthilfe`
- `/notfallkarte`
- `/notfallkarte/erstellen`
- `/unterstuetzen/krise`
- `/diagnostik`
- `/begleiterkrankungen`
- `/grenzen`
- `/beratung`
- `/quellen`
- lokale Notfall-PDFs
- `client/src/data/kontakte.ts`

## Copy/Paste-Vorlage

```md
## Fachliche Freigabe

- Release / PR:
- Commit / Deploy-Stand:
- Datum der Prüfung:
- Fachlich prüfende Person:
- Rolle / Funktion:

### Geprüfter Scope

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

### Prüfgegenstände

- [ ] Notfallnummern korrekt
- [ ] PUK- und Beratungsdaten korrekt
- [ ] rechtliche Begriffe korrekt und nicht missverständlich
- [ ] Quellen- und Krisenhinweise korrekt
- [ ] lokale Relevanz für Schweiz / Zürich gegeben
- [ ] Soforthilfe-Logik intakt
- [ ] keine neue fachliche Aussage ohne belastbare Quelle

### Ergebnis

- [ ] fachlich freigegeben
- [ ] freigegeben mit Auflagen
- [ ] nicht freigegeben

### Hinweise / Auflagen

-

### Nächster Review-Termin

-
```

## Minimalregel

Ohne dokumentiertes fachliches Sign-off soll ein Release mit Änderungen an
Hochrisiko-Seiten nicht als vollständig freigegeben gelten.
