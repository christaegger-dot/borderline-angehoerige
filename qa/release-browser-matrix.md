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
- Commit / Deploy-Stand: b50dc18
- Datum: 2026-10-02
- Basis-URL: https://borderline-angehoerige.netlify.app

| Gerät          | Browser | Status          | Notizen                                                                                               |
| -------------- | ------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| iPhone         | Safari  | nicht bestanden | Playwright WebKit mit iPhone-13-Emulation; starke WebKit-Abdeckung, aber kein physisches iOS-Gerät    |
| optional macOS | Safari  | nicht bestanden | Playwright WebKit-Desktoplauf als Safari-Näherung; optionaler Zusatzcheck                             |
| iPhone         | Chrome  | nicht bestanden | mobile Chrome-Emulation in Chromium; kein echter iOS-Lauf, aber Pflichtpfade und Flows technisch grün |
| Android        | Chrome  | nicht bestanden | mobile Chrome-Emulation in Chromium; Pflichtpfade und Flows technisch grün                            |
| Desktop        | Chrome  | nicht bestanden | Playwright-Lauf gegen Production mit System-Chrome/Chromium                                           |
| Desktop        | Firefox | nicht bestanden | Playwright-Firefox-Lauf gegen Production                                                              |

### Kritische Befunde

- iPhone Safari: Suche öffnen und schließen: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for locator('button[aria-label="Suche öffnen"]').first() to be visible[22m
  [2m 45 × locator resolved to hidden <button type="button" aria-label="Suche öffnen" class="site-header__icon-button sm:hidden">…</button>[22m

- iPhone Safari: /begleiterkrankungen#depression öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Depression bei Borderline' }) to be visible[22m

- iPhone Safari: /grenzen#gewalt öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Wenn der Angehörige körperlich übergriffig wird' }) to be visible[22m

- optional macOS Safari: /begleiterkrankungen#depression öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Depression bei Borderline' }) to be visible[22m

- optional macOS Safari: /grenzen#gewalt öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Wenn der Angehörige körperlich übergriffig wird' }) to be visible[22m

- iPhone Chrome: Suche öffnen und schließen: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for locator('button[aria-label="Suche öffnen"]').first() to be visible[22m
  [2m 45 × locator resolved to hidden <button type="button" aria-label="Suche öffnen" class="site-header__icon-button sm:hidden">…</button>[22m

- iPhone Chrome: /begleiterkrankungen#depression öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Depression bei Borderline' }) to be visible[22m

- iPhone Chrome: /grenzen#gewalt öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Wenn der Angehörige körperlich übergriffig wird' }) to be visible[22m

- Android Chrome: /begleiterkrankungen#depression öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Depression bei Borderline' }) to be visible[22m

- Android Chrome: /grenzen#gewalt öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Wenn der Angehörige körperlich übergriffig wird' }) to be visible[22m

- Desktop Chrome: /begleiterkrankungen#depression öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Depression bei Borderline' }) to be visible[22m

- Desktop Chrome: /grenzen#gewalt öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Wenn der Angehörige körperlich übergriffig wird' }) to be visible[22m

- Desktop Firefox: /begleiterkrankungen#depression öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Depression bei Borderline' }) to be visible[22m

- Desktop Firefox: /grenzen#gewalt öffnet Zielabschnitt: locator.waitFor: Timeout 20000ms exceeded.
  Call log:
  [2m - waiting for getByRole('button', { name: 'Abschnitt Wenn der Angehörige körperlich übergriffig wird' }) to be visible[22m

### Freigabeentscheidung

- [ ] Matrix vollständig grün
- [ ] grün mit dokumentierten Resthinweisen
- [x] nicht freigabefähig

### Methodik

- Desktop Chrome und Desktop Firefox wurden automatisiert über Playwright gegen Production geprüft, sofern die jeweiligen Browser-Binaries auf diesem Rechner verfügbar waren.
- iPhone Safari wurde als Playwright-WebKit-Profil mit iPhone-13-Emulation geprüft; das ist eine starke WebKit-Abdeckung, aber kein physischer iOS-Hardwarelauf.
- iPhone Chrome und Android Chrome wurden als mobile Chrome-Profile in Chromium emuliert und als technische Cross-Checks mitgeführt.
- Optionales macOS Safari wird als zusätzlicher WebKit-Desktoplauf geführt, wenn WebKit lokal verfügbar ist; es bleibt ein Zusatzcheck außerhalb der Pflichtmatrix.
