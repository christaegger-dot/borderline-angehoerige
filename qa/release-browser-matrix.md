# Release Browser Matrix

Diese Matrix ist die operative Vorlage für den Release-Gate
`Voller Geräte- und Browser-Release-Test`.

Sie ist bewusst kurz gehalten und soll pro Release einmal vollständig
abgehakt werden.

## Pflicht-Matrix

| Gerät          | Browser | Status   | Getestet am | Getestet von | Notizen |
| -------------- | ------- | -------- | ----------- | ------------ | ------- |
| iPhone         | Safari  | offen    |             |              |         |
| iPhone         | Chrome  | offen    |             |              |         |
| Android        | Chrome  | offen    |             |              |         |
| Desktop        | Chrome  | offen    |             |              |         |
| Desktop        | Firefox | offen    |             |              |         |
| optional macOS | Safari  | optional |             |              |         |

Status-Empfehlung:

- `offen`
- `bestanden`
- `bestanden mit Hinweis`
- `nicht bestanden`

## Pflicht-Pfade pro Lauf

Diese Pfade und Interaktionen sollten in jedem Matrix-Lauf mindestens
einmal geprüft werden:

### 1. Start und Navigation

- `/`
- Mobile Menu öffnen und schließen
- Suche öffnen und schließen
- Sticky Header über längere Scrollstrecke prüfen

### 2. Krisenpfade

- `/soforthilfe` direkt öffnen
- zentrale CTAs und `tel:`-Links prüfen
- `/notfallkarte` direkt öffnen
- `/notfallkarte/erstellen` direkt öffnen

### 3. Notfallkarte-Flow

- Eingaben erfassen
- Reload prüfen
- Löschen prüfen
- Zurück / Vorwärts prüfen
- Druckpfad bzw. Druckansicht prüfen

### 4. Materialien und Handouts

- `/materialien`
- Kategorien filtern
- mindestens ein PDF inline öffnen
- mindestens ein PDF herunterladen
- mindestens eine Textversion öffnen

### 5. Hochrisiko-Lesestrecken

- `/diagnostik`
- `/grenzen`
- `/beratung`
- `/quellen`

Dabei prüfen:

- Layout stabil
- keine abgeschnittenen CTAs
- Fokus sichtbar
- keine überdeckten Klickziele
- keine offensichtlichen Scroll- oder Schriftprobleme

## Release-Protokoll

```md
## Browser-Matrix

- Release / PR:
- Datum:

| Gerät          | Browser | Status | Notizen |
| -------------- | ------- | ------ | ------- |
| iPhone         | Safari  |        |         |
| iPhone         | Chrome  |        |         |
| Android        | Chrome  |        |         |
| Desktop        | Chrome  |        |         |
| Desktop        | Firefox |        |         |
| optional macOS | Safari  |        |         |

### Kritische Befunde

-

### Freigabeentscheidung

- [ ] Matrix vollständig grün
- [ ] grün mit dokumentierten Resthinweisen
- [ ] nicht freigabefähig
```

## Letzter Lauf

## Browser-Matrix

- Release / PR: main
- Commit / Deploy-Stand: eb4e07e
- Datum: 2026-05-02
- Basis-URL: https://borderline-angehoerige.netlify.app

| Gerät          | Browser | Status          | Notizen                                                                                                                 |
| -------------- | ------- | --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| iPhone         | Safari  | offen           | offen – kein echter iOS/WebKit-Lauf auf diesem Rechner ohne zusätzliche Browser-Binaries oder Hardware                  |
| iPhone         | Chrome  | nicht bestanden | mobile Chrome-Emulation in Chromium; kein echter iOS-Lauf, aber Pflichtpfade und Flows technisch grün                   |
| Android        | Chrome  | nicht bestanden | mobile Chrome-Emulation in Chromium; Pflichtpfade und Flows technisch grün                                              |
| Desktop        | Chrome  | nicht bestanden | Playwright-Lauf gegen Production mit System-Chrome/Chromium                                                             |
| Desktop        | Firefox | offen           | offen – Firefox ist auf diesem Rechner nicht installiert; Installation wurde in diesem Lauf bewusst nicht vorausgesetzt |
| optional macOS | Safari  | optional        | optional – in diesem Lauf nicht automatisiert abgedeckt                                                                 |

### Kritische Befunde

- iPhone Chrome: Notfallkarte Druckansicht: persönliche Daten fehlen in der Druckansicht
- Android Chrome: Notfallkarte Druckansicht: persönliche Daten fehlen in der Druckansicht
- Desktop Chrome: Notfallkarte Druckansicht: persönliche Daten fehlen in der Druckansicht

### Freigabeentscheidung

- [ ] Matrix vollständig grün
- [ ] grün mit dokumentierten Resthinweisen
- [x] nicht freigabefähig

### Methodik

- Desktop Chrome wurde automatisiert über Playwright gegen Production geprüft.
- iPhone Chrome und Android Chrome wurden als mobile Chrome-Profile in Chromium emuliert; ohne den gemeinsamen Druck-Befund wären sie als `bestanden mit Hinweis` einzuordnen.
- iPhone Safari und Desktop Firefox bleiben offen, weil auf diesem Rechner weder ein echter iOS/WebKit-Lauf noch Firefox-Automation ohne zusätzliche Softwareinstallation verfügbar war.
- Optionales macOS Safari wurde in diesem Lauf nicht automatisiert erfasst und bleibt separat optional.
