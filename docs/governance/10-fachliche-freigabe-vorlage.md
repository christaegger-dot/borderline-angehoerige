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
- Darstellungen von Erleben, Beziehungen, Rollen oder Genesung
- zentralem Soforthilfeweg oder unveröffentlichten Sicherheitswerkzeugen

## Pflicht-Scope

Mindestens diese Stellen prüfen, wenn sie vom Release betroffen sind:

- `/soforthilfe`
- `/unterstuetzen/krise`
- `/diagnostik`
- `/begleiterkrankungen`
- `/grenzen`
- `/beratung`
- `/quellen`
- `client/src/data/kontakte.ts`
- ausgemusterte statische Notfallpfade und Assets
- betroffene Sicherheitsrouten und -werkzeuge `/notfallkarte`,
  `/notfallkarte/erstellen`, `/wegweiser` und der Krisenausgang von
  `/selbsttest`

## Copy/Paste-Vorlage

```md
## Fachliche Freigabe

- Release / PR:
- Commit / Deploy-Stand:
- Datum der Prüfung:
- Fachlich prüfende Person:
- Rolle / Funktion:
- Inhaltlich verantwortliche Person für /soforthilfe:
- Institutioneller Grundsatzentscheid dokumentiert: ja / nein
- Sicherheitsvariante /soforthilfe: direct
- Sicherheitsvariante nicht akute Seiten: persistent-subdued

### Geprüfter Scope

- [ ] /soforthilfe
- [ ] /unterstuetzen/krise
- [ ] /diagnostik
- [ ] /begleiterkrankungen
- [ ] /grenzen
- [ ] /beratung
- [ ] /quellen
- [ ] client/src/data/kontakte.ts
- [ ] ausgemusterte statische Notfallpfade und Assets
- [ ] betroffene Sicherheitsrouten und -werkzeuge

### Prüfgegenstände

- [ ] 144 und 117 gegen amtliche Primärquelle geprüft
- [ ] veränderliche PUK- und Beratungsangebote über offizielle Zielseiten
      geprüft
- [ ] Inhaltsverantwortung, Primärquelle, Prüfdatum und Status jedes Kontakts
      dokumentiert
- [ ] Parität zwischen Kontaktregister und `/soforthilfe` automatisiert geprüft
- [ ] Kontaktprüfung ist höchstens drei Monate alt und wurde vor diesem Release
      wiederholt
- [ ] rechtliche Begriffe korrekt und nicht missverständlich
- [ ] Quellen- und Krisenhinweise korrekt
- [ ] lokale Relevanz für Schweiz / Zürich gegeben
- [ ] `/soforthilfe` ist die einzige veröffentlichte operative Kontaktquelle
- [ ] ausserhalb von `/soforthilfe` keine Nummern- oder Kontaktkopien
- [ ] feste nummernfreie Zuständigkeitserklärung konsistent
- [ ] keine statische Notfallkarte, Soforthilfe-Druckseite oder
      Krisenplan-Ableitung mit kopierten operativen Kontakten veröffentlicht
- [ ] `/notfallkarte` leitet dauerhaft auf `/soforthilfe` um
- [ ] `/notfallkarte/erstellen` gibt in der öffentlichen Produktion `404`
- [ ] Werkzeuge nehmen keine automatische Triage vor
- [ ] keine neue fachliche Aussage ohne belastbare Quelle
- [ ] Anti-Stigma- und Perspektivenstandard in allen betroffenen Fassungen
      erfüllt
- [ ] keine Motive, Gewalt oder Gefährlichkeit aus einer Diagnose abgeleitet
- [ ] Angehörige nicht für Regulation, Behandlung oder Genesung verantwortlich
      gemacht
- [ ] Autonomie, Einwilligung und Vertraulichkeit gewahrt

### Erfahrungsperspektiven

- [ ] Review durch eine Person mit eigener Borderline-Erfahrung dokumentiert
- [ ] Review durch eine angehörige Person dokumentiert
- [ ] unterschiedliche Rückmeldungen und offene Punkte festgehalten
- [ ] noch offen und deshalb keine öffentliche Freigabe

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
Hochrisiko-Seiten nicht als vollständig freigegeben gelten. Für Krisen- und
Sicherheitsänderungen blockieren ausserdem eine fehlende namentliche
Inhaltsverantwortung, ein fehlender institutioneller Grundsatzentscheid oder
ein offener Review beider Erfahrungsperspektiven die öffentliche Freigabe.
