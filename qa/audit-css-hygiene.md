# audit/css-hygiene

## Meta

- Repo: `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
- Worktree: `/tmp/borderline-css-hygiene.uVnytF`
- Branch: `audit/css-hygiene`
- Basis: `origin/main`
- Prompt-Sammlung: im separaten Setup-Worktree erstellt, nicht Teil dieses Audit-Branches

## Status

- Phase 1: abgeschlossen
- Phase 2: abgeschlossen
- Phase 3: abgeschlossen
- Phase 4: abgeschlossen

## Notizen

- Produktcode bleibt in Phase 1 und 2 read-only.
- Audit-Artefakte duerfen unter `qa/` und `qa/scripts/` entstehen.
- `client/public/notfallkarte.html` und `client/public/fallback.css` werden bewusst separat vom App-Designsystem bewertet.

## Phase 1 - Inventur

### 1.1 Token-System erfassen

#### App-Designsystem

- Zentrale Styling-Datei der App: `client/src/index.css`
- Struktur:
  - `@theme inline` fuer Tailwind-v4-kompatible Design-Tokens
  - `:root` und `.dark` fuer semantische Basiswerte
  - `@layer base` und `@layer components`
  - Print-Block und wenige Utility-/Responsive-Regeln
- Relevante Styling-Dateien im App-System:
  - `client/src/index.css`
  - `client/src/pages/notfallkarte-print.css`
- Zaehlung in `client/src/index.css`:
  - `179` Custom-Property-Definitionen insgesamt
  - davon ca. `99` Farb-Tokens
  - `5` Radius-Tokens
  - `3` Font-Tokens
  - `8` Print-Tokens
  - zusaetzlich Sidebar-, Chart- und Alias-Tokens
- Es gibt keine separate dokumentierte Token-Referenz ausser den Kommentaren in `client/src/index.css`.

#### Statische Sonderflaechen

- `client/public/fallback.css`
  - eigenes kleines Hex-basiertes Token-System mit `13` Custom Properties
  - kein Bezug auf die App-Tokens aus `client/src/index.css`
- `client/public/notfallkarte.html`
  - komplett eigenstaendige Inline-CSS-Welt im Dokumentkopf
  - kein Token-Sharing mit App oder `fallback.css`
- Diese beiden Faecher sind funktional eher Microsites/Standalone-Flaechen als Teil desselben Designsystems.

### 1.2 Hardcodierte Werte finden

#### App-System

- `client/src/index.css` ist ueberwiegend tokenisiert, enthaelt aber weiterhin echte Hardcodes in Randzonen:
  - Print-Tokens mit Graustufen-Hexwerten in `client/src/index.css:318-325`
  - Layout-Hardcodes fuer `.container` in `client/src/index.css:265-289`
  - Print-Masse und Typo-Hardcodes mit `pt`/`cm` in `client/src/index.css:328-526`
  - Utility-Breakpoint-Hardcode bei `1023px` in `client/src/index.css:563-569`
- Zaehlen im App-CSS:
  - `client/src/index.css`: `131` `oklch()`-Werte, `13` Hexwerte, `12` `px`-Vorkommen, `7` `rem`-Vorkommen
  - `client/src/pages/notfallkarte-print.css`: keine Farb-Hardcodes, basiert auf Print-Kontext

#### Statische Sonderflaechen

- `client/public/fallback.css`
  - `16` Hexwerte, `1` `rgba()`, `38` `rem`-Vorkommen, `9` `px`-Vorkommen
  - Beispiele:
    - Farb-Tokenblock in `client/public/fallback.css:1-15`
    - konkrete Border-Hardcodes in `client/public/fallback.css:120-127`
    - direkte Weisswerte in `client/public/fallback.css:157-166`
- `client/public/notfallkarte.html`
  - `36` Hexwerte, `4` `rgba()`-Vorkommen
  - zahlreiche feste Druck-/Vorschauwerte in `mm`, `pt` und `px`
  - Beispiele:
    - `body`/Vorschau-Frame in `client/public/notfallkarte.html:20-27`
    - Rot-/Orange-/Gruen-/Lila-Sektionen in `client/public/notfallkarte.html:190-307`
    - Footer/Action-Buttons in `client/public/notfallkarte.html:309-379`

#### App-Komponenten mit eingebauten Sonderwerten

- Es gibt viele Arbitrary-Value-Klassen und Inline-Styles in TSX:
  - gesamt heuristisch: `851` Arbitrary-Value-Vorkommen, `47` Inline-Style-Bloecke
- Diese Zahl ist teilweise durch UI-Bibliothekscode ueberzeichnet; relevante App-Hotspots sind:
  - `client/src/pages/Home.tsx:106-110`
    - Inline-`oklch()`-Gradient und mehrere freie Groessen-/Radiuswerte
  - `client/src/pages/Home.tsx:202-207`, `289-292`, `347-352`, `395-399`
    - wiederholte Inline-Gradients ausserhalb des Token-Systems
  - `client/src/components/ContentSection.tsx:94-125`
    - `rounded-[10px]`, `text-[14.5px]`
  - `client/src/components/layout/RessourcenMenu.tsx:111-126`
    - `width: "min(680px, calc(100vw - 2rem))"` plus mehrere freie Textgroessen
  - `client/src/components/interactive/KommunikationsUebung.tsx:366-371`
    - `rgba(255,255,255,0.7)` als inline Farbe
- Zusaetzlich viele Arbitrary Values in `client/src/components/ui/*`, vor allem:
  - `sidebar.tsx`
  - `dropdown-menu.tsx`
  - `input-group.tsx`
  - `field.tsx`
  - `select.tsx`
- Diese UI-Dateien wirken eher wie komponenteninterne Shadcn-/Radix-Sonderlogik als wie bewusst kuratierte Designtoken-Nutzung.

### 1.3 Token-Nutzungs-Analyse

#### App-System

- Einfache Rohtext-Suche nach `var(--token)` ist fuer `@theme inline` nur eingeschraenkt aussagekraeftig:
  - viele Alias-Tokens werden nicht direkt im Quelltext referenziert
  - sie sind trotzdem Tailwind-Eingangspunkte und deshalb nicht automatisch `tot`
- Stark sichtbar genutzte semantische Tokens:
  - `--color-sage-dark`
  - `--color-sage-mid`
  - `--color-sage-wash`
  - mehrere `--color-sos-*`-Tokens auf der Soforthilfe-Seite
- Auffaellig:
  - Das System enthaelt sehr viele Farbtoken-Ebenen und Alias-Schichten.
  - Ohne separate Dokumentation ist die semantische Grenze zwischen Basis-, Alias- und Bereichstoken nicht sofort klar.

#### Statische Sonderflaechen

- In `client/public/fallback.css` ist mindestens ein echter ungenutzter Token sichtbar:
  - `--ok` wird im Stylesheet nicht referenziert
- Die anderen Fallback-Tokens werden direkt im selben Stylesheet benutzt.

### 1.4 CSS-Dateistruktur

- CSS-Dateien:
  - `client/src/index.css` (`570` Zeilen)
  - `client/src/pages/notfallkarte-print.css` (`44` Zeilen)
  - `client/public/fallback.css` (`209` Zeilen)
- Gesamt-CSS-Zeilen: `823`
- Zusaetzlich `23` statische HTML-Dateien in `client/public`, darunter:
  - viele Route-Fallback-Seiten
  - `client/public/notfallkarte.html` mit `649` Zeilen und grossem Inline-Style-Block
- Strukturell ergibt sich:
  - ein klares Hauptsystem in `client/src/index.css`
  - ein kleiner Print-Aufsatz
  - ein separates Fallback-System
  - ein vollstaendig eigenstaendiges Standalone-Dokument fuer die Notfallkarte

### 1.5 Tote CSS-Regeln

- Offensichtlich genutzte Custom-Klassen im App-System:
  - `.container` in vielen Seiten und Layout-Dateien
  - `.animate-breathe` in `client/src/pages/Soforthilfe.tsx`
  - `.scrollbar-none` in u. a. `KommunizierenMaterialsSection.tsx`, `MaterialienLibrarySection.tsx`, `UnterstuetzenUebersicht.tsx`
- In Phase 1 kein klarer Beleg fuer grosse Mengen toter Custom-Regeln im App-CSS.
- Einschraenkung:
  - Fuer Utility-Klassen in TSX und fuer statische HTML-Flaechen ist eine vollstaendige Dead-Rule-Bewertung ohne Build-/DOM-Abgleich nur begrenzt moeglich.

### 1.6 Gesamtbild

| Bereich                            | Beobachtung                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| Token-System App                   | zentral in `client/src/index.css`, stark tokenisiert, aber sehr gross und nur intern kommentiert |
| Statische Sonderflaechen           | `fallback.css` und `notfallkarte.html` bilden eigene Styling-Systeme                             |
| Hardcodierte Farben App            | vor allem in Print-Tokenbereich und einzelnen Inline-/Arbitrary-Stellen                          |
| Hardcodierte Farben Sonderflaechen | hoch, besonders `notfallkarte.html`                                                              |
| Layout-Hardcodes                   | vorhanden in `container`, Print-Regeln, Breakpoints und mehreren Komponenten                     |
| Arbitrary Values in TSX            | sehr hoch (`851` heuristisch), aber stark von UI-Bibliothekscode mitgetrieben                    |
| Tote Tokens/Regeln                 | keine grosse App-Leiche sichtbar; `fallback.css` hat mind. `--ok` ungenutzt                      |
| Dokumentation                      | kein separates Token-Handbuch                                                                    |

## Top-5 Hotspots

1. `client/public/notfallkarte.html`
   - Eigenes Inline-CSS-System mit vielen Hexfarben, festen Druckmassen und keiner Token-Anbindung.

2. `client/public/fallback.css`
   - Separates Hex-basiertes Mini-Designsystem, das bewusst nicht mit dem App-System integriert ist.

3. `client/src/index.css`
   - Sehr grosser Tokenblock mit vielen Aliasen; klare Basis, aber schwer zu ueberblicken und nur intern kommentiert.

4. `client/src/pages/Home.tsx`
   - Mehrere app-spezifische Inline-Gradients, freie Groessenwerte und visuelle Sonderfaelle ausserhalb der zentralen Tokens.

5. `client/src/components/ui/sidebar.tsx` und verwandte UI-Komponenten
   - Viele Arbitrary Values und Rechen-Ausdruecke; vermutlich technisch motiviert, aber hoher Wartbarkeitsdruck.

## Vorlaeufige Phase-1-Hauptbefunde

1. Das App-Designsystem ist grundsaetzlich vorhanden und zentralisiert, aber nicht das einzige Styling-System im Repo.
2. Die groessten CSS-Hygiene-Risiken sitzen nicht in `client/src/index.css`, sondern in den separaten statischen Flaechen und in app-spezifischen Inline-/Arbitrary-Werten.
3. `fallback.css` und `notfallkarte.html` muessen in Phase 2 und 3 bewusst separat behandelt werden; eine gemeinsame Token-Migration mit der SPA waere fachlich irrefuehrend.
4. Fuer die App selbst wird die naechste Triage wahrscheinlich zwischen `technisch akzeptierten UI-Sonderwerten` und `wirklich unnoetigen App-Hardcodes` unterscheiden muessen.

## Phase 2 - Massnahmenkatalog

### P1 - Hoher Nutzen, ueberschaubares Risiko

1. Dekorative Home-Gradienten und Halos als echte App-Tokens oder lokale CSS-Variablen ausdruecken
   - Fundorte:
     - `client/src/pages/Home.tsx:106`
     - `client/src/pages/Home.tsx:202-207`
     - `client/src/pages/Home.tsx:289-292`
     - `client/src/pages/Home.tsx:349-352`
     - `client/src/pages/Home.tsx:395-399`
   - Problem:
     - Relevante visuelle Leitwerte liegen als Inline-Gradient-Strings bzw. freie `oklch()`-Werte direkt im JSX.
   - Entscheidung:
     - `T2 - Neuen Token einfuehren`
   - Vorschlag:
     - Kleine Gruppe dekorativer Surface-/Glow-Tokens in `client/src/index.css`, z. B. fuer `section-divider`, `hero-mid`, `hero-halo`.
   - Erwarteter Gewinn:
     - Weniger visuelle Sonderlogik in JSX, bessere Wiederverwendbarkeit, klarere Designgrenze.
   - Aufwand:
     - `klein-mittel`
   - Risiko:
     - `niedrig`

2. Owned-App-Hardcodes bei Radius und Mikrotypografie auf vorhandene Skala zurueckfuehren
   - Fundorte:
     - `client/src/components/ContentSection.tsx:94-125`
     - `client/src/pages/Home.tsx:120`
     - `client/src/pages/Home.tsx:124`
     - `client/src/pages/Home.tsx:240`
     - `client/src/pages/Home.tsx:249`
     - `client/src/pages/Home.tsx:257`
   - Problem:
     - Werte wie `rounded-[10px]`, `text-[14.5px]`, `text-[13.5px]`, `text-[11px]`, `w-[18px]`, `lg:text-[52px]` umgehen die vorhandene Radius- und Utility-Skala.
   - Entscheidung:
     - Radius-Faelle: `T3 - Zu bestehendem Token migrieren`
     - Mikrotypografie: gemischt `T3` oder `T4` je nach visueller Rolle
   - Vorschlag:
     - `rounded-[10px]` -> `rounded-md` als klarer Sofortkandidat
     - `text-[13.5px]` / `text-[14.5px]` gegen `text-sm` bzw. bestehende Stufen pruefen
     - `lg:text-[52px]` nur migrieren, wenn nach Sichtkontrolle keine Hero-Verschiebung entsteht
   - Erwarteter Gewinn:
     - Weniger Magic Numbers in App-eigenen Komponenten
   - Aufwand:
     - `klein-mittel`
   - Risiko:
     - `niedrig-mittel`

3. Einfache Inline-Farbstyles auf vorhandene Utilities oder semantische Tokens zurueckfuehren
   - Fundorte:
     - `client/src/components/interactive/KommunikationsUebung.tsx:366-371`
     - weitere app-eigene Inline-Style-Faelle in `Home.tsx`, `FAQ.tsx`, `Selbsttest.tsx`, `ValidierungsStufenleiter.tsx`
   - Problem:
     - Einzelne Inline-Farbwerte sind nicht technisch noetig, sondern umgehen die vorhandenen Klassen/Tokens.
   - Entscheidung:
     - `T3 - Zu bestehendem Token migrieren`
   - Vorschlag:
     - z. B. `rgba(255,255,255,0.7)` durch Utility wie `bg-white/70` oder lokale Klassen ersetzen
   - Erwarteter Gewinn:
     - Kleinere JSX-Dateien, weniger visuelle Sonderlogik im Code
   - Aufwand:
     - `klein`
   - Risiko:
     - `niedrig`

### P2 - Sinnvoll, aber getrennt nach Styling-Welten

1. `fallback.css` als eigenes Mini-System lokal aufraeumen, aber nicht auf App-Tokens umstellen
   - Fundorte:
     - `client/public/fallback.css:1-15`
     - `client/public/fallback.css:120-127`
     - `client/public/fallback.css:157-166`
   - Problem:
     - Das Fallback-Stylesheet enthaelt ein eigenes Hex-basiertes Token-Set plus einzelne direkte Farben ausserhalb dieses Sets.
   - Entscheidung:
     - `T2 - Neuen Token einfuehren` fuer fehlende lokale Werte
     - `T4 - Als Sonderfall belassen` fuer das eigenstaendige System insgesamt
   - Vorschlag:
     - Direktwerte wie `#efc9c1`, `#cfe1d8`, `#fff` nur innerhalb von `fallback.css` nachtokenisieren
     - Kein App-weites Migrationsziel daraus machen
   - Erwarteter Gewinn:
     - Konsistenteres Fallback-Stylesheet ohne Vermischung mit der SPA
   - Aufwand:
     - `klein`
   - Risiko:
     - `niedrig`

2. `notfallkarte.html` separat als Standalone-Printflaeche refaktorieren
   - Fundorte:
     - `client/public/notfallkarte.html:13-379`
   - Problem:
     - Viele wiederholte Hexfarben, Grays und Blockdefinitionen, aber in einer Standalone-Datei mit A4-/Print-Logik.
   - Entscheidung:
     - `T2 - Neuen Token einfuehren` innerhalb der Datei
     - `T4 - Als Sonderfall belassen` gegenueber dem App-System
   - Vorschlag:
     - Lokale CSS-Variablen fuer Abschnittsfarben, Textgrauwerte und Action-Button-Farben
     - Keine erzwungene Kopplung an `client/src/index.css`
   - Erwarteter Gewinn:
     - Wartbarere Standalone-Datei ohne falsche Systemkopplung
   - Aufwand:
     - `mittel`
   - Risiko:
     - `mittel`, weil Print-/A4-Layout empfindlich ist

3. `manifest.json` gegen Markenbasis pruefen
   - Fundort:
     - `client/public/manifest.json:7-8`
   - Problem:
     - `background_color` und `theme_color` sind eigenstaendige Hexwerte ausserhalb der zentralen Tokenbeschreibung.
   - Entscheidung:
     - `T2 - Neuen Token einfuehren` oder `T3 - Zu bestehendem Token migrieren`, je nach Markenabgleich
   - Vorschlag:
     - Nur migrieren, wenn exakter Markenbezug gewuenscht ist; sonst als bewusstes PWA-Sonderpaar dokumentieren
   - Erwarteter Gewinn:
     - Kleinere visuelle Inkonsistenz am Browser-/Installationsrand beseitigt
   - Aufwand:
     - `klein`
   - Risiko:
     - `niedrig`

### P3 - Niedrige Prioritaet oder akzeptierter Sonderfall

1. Shadcn-/Radix-nahe UI-Komponenten nicht breit auf Arbitrary-Values migrieren
   - Fundorte:
     - `client/src/components/ui/sidebar.tsx`
     - `client/src/components/ui/dropdown-menu.tsx`
     - `client/src/components/ui/input-group.tsx`
     - `client/src/components/ui/field.tsx`
     - `client/src/components/ui/select.tsx`
   - Problem:
     - Diese Dateien treiben die Arbitrary-Value-Zahl stark hoch, aber viele Werte sind Layout- oder Bibliotheksmechanik.
   - Entscheidung:
     - `T4 - Als Sonderfall belassen`
   - Begruendung:
     - Breite Migration haette hohen Diff-Umfang bei fraglichem Wartbarkeitsgewinn.

2. Print-Hexwerte und Druckmasse im App-CSS bleiben eigener Regelraum
   - Fundorte:
     - `client/src/index.css:316-537`
   - Problem:
     - Graustufen-Hexwerte und `pt`/`cm`/`mm` sind im Print-Kontext bewusst nicht an die Screen-Tokens gekoppelt.
   - Entscheidung:
     - `T4 - Als Sonderfall belassen`
   - Begruendung:
     - Print-Kompatibilitaet ist hier wichtiger als vollstaendige Token-Abdeckung.

3. `.container`-Regel und Basis-Breakpoints nicht vorschnell tokenisieren
   - Fundorte:
     - `client/src/index.css:265-289`
   - Problem:
     - Enthalten feste `rem`- und `px`-Werte, sind aber eher Layout-Konstanten als Wildwuchs.
   - Entscheidung:
     - `T4 - Als Sonderfall belassen`
   - Begruendung:
     - Kein heisser Wartbarkeitsschmerz, solange das Layoutsystem stabil bleibt.

### Tote Tokens und Regeln

1. `client/public/fallback.css`
   - Fund:
     - `--ok` ist nach Phase-1-Pruefung offenbar ungenutzt
   - Vorschlag:
     - ersatzlos streichen, sofern keine geplante Erweiterung daran haengt
   - Prioritaet:
     - `P2`

2. `client/src/index.css`
   - Fund:
     - Rohtext-basierte `unused`-Signale sind fuer `@theme inline` nicht belastbar genug, um echte tote Tokens zu bestaetigen
   - Vorschlag:
     - vorerst nicht streichen
   - Entscheidung:
     - `akzeptiert bis zu einer genaueren, build-basierten Analyse`

### Spacing-/Radius-Hardcodes als Bundle?

- Ja, aber nur fuer app-eigene Dateien mit klaren Entsprechungen.
- Gute Bundle-Kandidaten fuer einen einzigen kleinen Commit:
  - `rounded-[10px]` -> `rounded-md`
  - `text-[13.5px]` / `text-[14.5px]` -> bestehende Textstufen, wo visuell tragfaehig
  - einzelne kleine `w-[18px]` / `text-[11px]` in Home/ContentSection nach Sichtpruefung
- Nicht in dasselbe Bundle:
  - `fallback.css`
  - `notfallkarte.html`
  - grosse `ui/*`-Bibliotheksdateien

## Priorisierung

| Prioritaet | Paket                                          | Empfohlene Richtung   |
| ---------- | ---------------------------------------------- | --------------------- |
| `P1`       | Home-Gradients und dekorative Surface-Werte    | `T2`                  |
| `P1`       | App-eigene Radius-/Mikrotypografie-Hardcodes   | `T3` / teilweise `T4` |
| `P1`       | Einfache Inline-Farbstyles in owned components | `T3`                  |
| `P2`       | `fallback.css` lokal nachtokenisieren          | `T2` + `T4`           |
| `P2`       | `notfallkarte.html` lokal refaktorieren        | `T2` + `T4`           |
| `P3`       | UI-Bibliotheks-Arbitrary-Values                | `T4`                  |
| `P3`       | Print-Sonderregeln                             | `T4`                  |

## Vorlaeufige Phase-2-Hauptbefunde

1. Das naechste sinnvolle Fix-Paket fuer die App ist klein und klar: dekorative Home-Werte plus app-eigene Radius-/Inline-Faelle.
2. Eine pauschale CSS-Hygiene-Migration ueber das ganze Repo waere irrefuehrend, weil die groessten Rohzahl-Ausreisser in Standalone- oder Bibliothekscode sitzen.
3. `fallback.css` und `notfallkarte.html` brauchen eher lokale Konsolidierung als Integration ins SPA-Designsystem.
4. Fuer Phase 3 sollte die App mit einem kompakten `P1`-Paket starten; die statischen Sonderflaechen kommen danach separat.

## Phase 3 - Umsetzung

### Umgesetztes P1-Paket

1. `f14e216` `audit(css): centralize home surface styles`
   - In `client/src/index.css` wurden `5` neue dekorative Home-Tokens eingefuehrt:
     - `--color-home-hero-mid`
     - `--color-home-hero-end`
     - `--color-home-divider`
     - `--color-home-orbit-inner`
     - `--color-home-orbit-outer`
   - Zusaetzlich wurden drei Home-spezifische Klassen zentral definiert:
     - `.home-hero-surface`
     - `.home-section-divider`
     - `.home-orbit-glow`
   - `client/src/pages/Home.tsx` nutzt diese Werte jetzt statt eines Hero-Arbitrary-Gradients, dreier wiederholter Divider-Gradients und eines radialen Inline-Halos.
   - Die Lagekarten im Home-Bereich wurden von Inline-Farbstyles auf semantische Utility-Klassen umgestellt.
   - `rounded-[10px]` wurde in diesen Karten auf `rounded-md` zurueckgefuehrt.
   - Der Beschreibungstext der Karten wurde von `text-[13.5px]` auf `text-sm` vereinheitlicht.

2. `a5a876c` `audit(css): align owned component utility usage`
   - `client/src/components/ContentSection.tsx`
     - `rounded-[10px]` -> `rounded-md`
     - `text-[14.5px]` -> `text-sm`
   - `client/src/components/interactive/KommunikationsUebung.tsx`
     - `rgba(255,255,255,0.7)` wurde durch `bg-white/70` ersetzt

### Bewusst offengelassen

1. `client/src/pages/Home.tsx`
   - `text-[11px]`, `lg:text-[52px]` und `w-[18px]` / `h-[18px]` bleiben vorerst `T4`, weil sie klar visuelle Rollen tragen und fuer dieses Paket nicht ohne Sichtabgleich veraendert werden sollten.

2. `client/public/fallback.css` und `client/public/notfallkarte.html`
   - bleiben absichtlich ausserhalb dieses P1-Pakets
   - naechster sinnvoller CSS-Schritt waere eine lokale Konsolidierung innerhalb ihrer eigenen Styling-Welten

3. `client/src/components/ui/*` und die Print-Regeln in `client/src/index.css`
   - bleiben unveraendert, weil sie im Audit als technischer Sonderfall mit hoeherem Risiko eingeordnet wurden

## Phase 4 - Verifikation

### Toolchain

- Der frische Temp-Worktree hatte initial keine lokale Toolchain.
- Verifikation wurde deshalb nach `npm install --no-package-lock --legacy-peer-deps` ausgefuehrt.

### Technische Verifikation

- `npm run lint` -> bestanden
- `npm run check` -> bestanden
- `npm run build` -> bestanden

### Scope-Verifikation

- `client/src/pages/Home.tsx` enthaelt im umgesetzten Bereich keine dekorativen Inline-`style`-Definitionen mehr.
- Die Zielmuster `rounded-[10px]`, `text-[13.5px]`, `text-[14.5px]` und `rgba(255,255,255,0.7)` sind im umgesetzten P1-Scope entfernt.
- Die urspruenglichen Farbwerte wurden wertgleich in CSS-Tokens bzw. zentrale Klassen uebernommen; beabsichtigte Farbverschiebungen wurden dabei nicht eingefuehrt.

### Einordnung nach Abschluss

- App-Kern:
  - spuerbar sauberer, weil dekorative Home-Werte und mehrere app-eigene Magic-Values jetzt zentraler bzw. utilitaetsbasiert abgebildet sind
- Repo-Gesamtlage:
  - weiterhin merkliche CSS-Hygiene-Restschuld in `fallback.css`, `notfallkarte.html` und in bibliotheksnahem `ui/*`-Code
- Gesamturteil:
  - `B` fuer das Gesamt-Repo
  - `A-` fuer den SPA-Kern nach diesem P1-Paket

## Stopp

- CSS-Audit ist fuer den umgesetzten Scope abgeschlossen.
- Wenn naechste CSS-Arbeit gewuenscht ist, dann getrennt als lokales Paket fuer `fallback.css` und `notfallkarte.html`.
