# Claude Code – Projektkonventionen

## Branch-Naming

Branch-Namen immer mit Timestamp enden lassen, um doppelte Namen zu vermeiden:

```
claude/<beschreibung>-$(date +%s)
```

Beispiel: `claude/fix-notfallkarte-1741553200`

GitHub erlaubt keine zweite PR vom selben Branch-Namen nach einem Merge.
Einzigartige Namen verhindern dieses Problem.

## iCloud-Sync-Artefakte

macOS/iCloud erzeugt gelegentlich « 2.ext»-Kopien beim Sync-Konflikt. Diese sind immer überholte Snapshots, nie gewünschte Branches. Beim Aufräumen: gezielt per rm-Liste löschen, nie per Wildcard, und git status danach prüfen.
