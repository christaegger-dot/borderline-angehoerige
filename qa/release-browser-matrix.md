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
- Commit / Deploy-Stand: 3225022
- Datum: 2026-05-02
- Basis-URL: https://borderline-angehoerige.netlify.app

| Gerät          | Browser | Status                | Notizen                                                                                               |
| -------------- | ------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| iPhone         | Safari  | bestanden mit Hinweis | Playwright WebKit mit iPhone-13-Emulation; starke WebKit-Abdeckung, aber kein physisches iOS-Gerät    |
| optional macOS | Safari  | bestanden mit Hinweis | Playwright WebKit-Desktoplauf als Safari-Näherung; optionaler Zusatzcheck                             |
| iPhone         | Chrome  | bestanden mit Hinweis | mobile Chrome-Emulation in Chromium; kein echter iOS-Lauf, aber Pflichtpfade und Flows technisch grün |
| Android        | Chrome  | bestanden mit Hinweis | mobile Chrome-Emulation in Chromium; Pflichtpfade und Flows technisch grün                            |
| Desktop        | Chrome  | bestanden             | Playwright-Lauf gegen Production mit System-Chrome/Chromium                                           |
| Desktop        | Firefox | bestanden             | Playwright-Firefox-Lauf gegen Production                                                              |

### Kritische Befunde

- keine technischen Blocker im durchgeführten Scope

### Freigabeentscheidung

- [ ] Matrix vollständig grün
- [x] grün mit dokumentierten Resthinweisen
- [ ] nicht freigabefähig

### Methodik

- Desktop Chrome und Desktop Firefox wurden automatisiert über Playwright gegen Production geprüft, sofern die jeweiligen Browser-Binaries auf diesem Rechner verfügbar waren.
- iPhone Safari wurde als Playwright-WebKit-Profil mit iPhone-13-Emulation geprüft; das ist eine starke WebKit-Abdeckung, aber kein physischer iOS-Hardwarelauf.
- iPhone Chrome und Android Chrome wurden als mobile Chrome-Profile in Chromium emuliert und als technische Cross-Checks mitgeführt.
- Optionales macOS Safari wird als zusätzlicher WebKit-Desktoplauf geführt, wenn WebKit lokal verfügbar ist; es bleibt ein Zusatzcheck außerhalb der Pflichtmatrix.
