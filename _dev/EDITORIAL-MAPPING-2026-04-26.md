# Editorial Design – Mapping-Bericht (Phase 0)

**Datum:** 27. April 2026 (zur Brief-Cohort 2026-04-26)
**Brief-Referenz:** `_dev/EDITORIAL-DESIGN-BRIEF-2026-04-26.md`
**Scope:** Inventar aktueller Code-Stand, Brief-Annahmen verifizieren, Risiken & Konflikte identifizieren. **Keine Code-Änderungen**.

---

## 1. Aktueller Stand der Token

### 1.1 `--background`

`client/src/index.css:25` (Light) und `:59` (Dark)

```css
:root {
  --background: oklch(0.985 0.003 200); /* Kühles Off-White ≈ SA #FAFAF7 */
}
.dark {
  --background: oklch(0.18 0.02 250);
}
```

✓ Brief-Annahme bestätigt: Light-Wert ist exakt wie im Brief beschrieben. Dark-Mode-Wert wird im Brief nicht erwähnt — vermutlich keine Änderung nötig (die Wärme-Verschiebung ist nur Light-relevant).

**Indirekte Background-Verwendung:** `--wave-color` in `index.css:248/265` und 4 Page/Section-Dateien fällt auf `var(--background)` zurück. Wave-Divider (geschwungene Sektionsübergänge) übernehmen die Hintergrundfarbe automatisch — keine separate Änderung nötig.

### 1.2 `--font-heading`

`client/src/styles/tailwind-theme.css:145-146`

```css
--font-heading: "DM Serif Display", "DM Serif Display fallback", Georgia, serif;
```

✓ Brief-Annahme bestätigt.

### 1.3 `--radius`

`client/src/index.css:18`

```css
--radius: 0.75rem;
```

Mit Konventions-Kommentar (Zeilen 19-24):

```
rounded-sm  (4px)  = Tags, Badges, kleine Chips
rounded-md  (6px)  = Buttons, Inputs
rounded-lg  (12px) = Standard-Elemente, Listen-Items, kleine Cards
rounded-xl  (16px) = Karten, Content-Boxen, Hero-Icon-Boxen
rounded-2xl (20px) = Spezial-Blöcke (Soforthilfe Ampel-Blöcke)
```

⚠️ **Diskrepanz: Konventions-Kommentar vs. tatsächliche Computed Values.** Die Konvention nennt 4/6/12/16/20 px, aber die tatsächliche Skala in `tailwind-theme.css:5-8` rechnet anders:

```css
--radius-sm: calc(var(--radius) - 4px); /* = 8px bei --radius: 12px */
--radius-md: calc(var(--radius) - 2px); /* = 10px */
--radius-lg: var(--radius); /* = 12px */
--radius-xl: calc(var(--radius) + 4px); /* = 16px */
```

Tatsächlich aktuell: **8 / 10 / 12 / 16 px** — nur `-lg` matched die Konvention.

**Wichtig für Brief:** `rounded-2xl` ist NICHT in unserem `@theme inline` redefiniert → fällt auf Tailwind-Default-Token `--radius-2xl: 1rem` (16px) zurück und ist **immun gegen `--radius`-Änderungen**. Soforthilfe-Ampel-Blöcke etc. mit `rounded-2xl` bleiben gleich.

### 1.4 Border-Radius-Verwendungen in shadcn-Komponenten

**`rounded-*` Token-Klassen in `client/src/components/ui/` (29 Dateien gescannt):**

| Komponente                                                                                                                                                                                                                                                                                                        | Wichtigste Radius-Verwendung                   | Token                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------- |
| `card.tsx`                                                                                                                                                                                                                                                                                                        | `rounded-xl` (Card-Container)                  | `--radius-xl` (= 16px / 12px nach Reduktion) |
| `button.tsx`                                                                                                                                                                                                                                                                                                      | `rounded-md` (sm/lg/default)                   | `--radius-md` (= 10px / 6px)                 |
| `input.tsx`                                                                                                                                                                                                                                                                                                       | `rounded-md`                                   | `--radius-md`                                |
| `dialog.tsx`                                                                                                                                                                                                                                                                                                      | `rounded-lg` (Modal)                           | `--radius-lg` (= 12px / 8px)                 |
| `badge.tsx`                                                                                                                                                                                                                                                                                                       | `rounded-md`                                   | `--radius-md`                                |
| `alert.tsx`, `accordion.tsx`, `popover.tsx`, `tabs.tsx`, `tooltip.tsx`, `select.tsx`, `dropdown-menu.tsx`, `progress.tsx`, `skeleton.tsx`, `kbd.tsx`, `field.tsx`, `item.tsx`, `empty.tsx`, `toggle.tsx`, `toggle-group.tsx`, `button-group.tsx`, `textarea.tsx`, `scroll-area.tsx`, `sidebar.tsx` (10 Vorkommen) | `rounded-md` / `rounded-lg` / `rounded-xl` mix | abhängig vom Token                           |

**Hardcoded Radius-Werte (NICHT durch `--radius` betroffen):**

```text
client/src/components/ui/input-group.tsx:38   rounded-[calc(var(--radius)-5px)]   ← skaliert MIT
client/src/components/ui/input-group.tsx:85   rounded-[calc(var(--radius)-5px)]   ← skaliert MIT
client/src/components/ui/input-group.tsx:88   rounded-[calc(var(--radius)-5px)]   ← skaliert MIT
client/src/components/ui/scroll-area.tsx:19   rounded-[inherit]                   ← erbt vom Parent
client/src/components/ui/tooltip.tsx:53       rounded-[2px]                       ← FIX (Arrow)
client/src/components/ui/checkbox.tsx:15      rounded-[4px]                       ← FIX (Checkbox-Box)
```

`rounded-2xl` in shadcn ui: 2× Vorkommen — beide via Tailwind-Default 1rem.

**Outside ui/ (Page-/Section-Level):** 51 Vorkommen von `rounded-2xl` und `rounded-3xl`. Diese sind **immun gegen `--radius`-Änderung**. Beispiele aus Stichprobe:

- `Selbstfuersorge.tsx:136/164/197/216` — Icon-Shells, Buttons, Card-Wraps
- `Home.tsx:334/343/372/388` — Stat-Cards, Info-Boxen
- `Verstehen.tsx:124/151` — Icon-Shells, Card-Wraps

Heisst: Die Hauptseiten behalten ihre weichen 2xl-Radii (16px), während die zugrundeliegenden shadcn-Komponenten kantiger werden. **Visuelle Konsequenz:** Inneneinrichtung kantiger, Aussenrahmen weich. Das _kann_ den Editorial-Effekt erzielen oder als inkonsistent wirken — entscheidet der visuelle Test.

---

## 2. DM-Serif-Display-Inventar

**4 Stellen** referenzieren DM Serif Display:

| #   | Datei                                          | Stelle                                                                         | Art                                                                                           |
| --- | ---------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| 1   | `client/src/styles/tailwind-theme.css:145-146` | `--font-heading` Token                                                         | **Hauptdefinition**                                                                           |
| 2   | `client/public/route-prerender.js:3`           | `fontStylesheetHref` Konstante                                                 | **Lazy-Loaded Google-Fonts-CSS** (postPaint via `requestIdleCallback`, eingeführt in PR #258) |
| 3   | `client/public/startup-shell.css:87`           | `.route-prerender-title { font-family: ... }`                                  | **Pre-Hydration-Heading** der Skeleton-Seite                                                  |
| 4   | `client/public/fallback.css:51-58`             | `@font-face { font-family: "DM Serif Display fallback"; ... size-adjust ... }` | **CLS-Fallback** (Georgia mit metrischen Override-Werten, mimt DM-Serif-Metriken)             |

**Keine `@fontsource*`-Pakete installiert** (`package.json` enthält keine `@fontsource`-Dependencies). DM Serif Display wird ausschliesslich über Google-Fonts-CDN geladen (lazy via route-prerender.js seit PR #258).

**Inter** (Body-Schrift) wird im selben Google-Fonts-CSS-Aufruf geladen (`route-prerender.js:3`):

```
…&family=Inter:wght@400;500;600;700&display=swap
```

---

## 3. Source-Serif-4-Migrationspfad

### 3.1 Empfohlene NPM-Dependency

```text
@fontsource-variable/source-serif-4 (aktuelle Version: 5.1.x – siehe https://fontsource.org)
```

Variable Font, axes: `wght` (200-900), `opsz`. Lizenz: SIL Open Font License — gut.

### 3.2 Schritt-für-Schritt

1. `pnpm add @fontsource-variable/source-serif-4`
2. **Neue Datei** `client/src/bootstrap/fonts.ts`:
   ```ts
   import "@fontsource-variable/source-serif-4";
   ```
3. **In `client/src/main.tsx`** (vor `import "./index.css"`):
   ```ts
   import "./bootstrap/fonts";
   ```
4. **In `client/src/styles/tailwind-theme.css:145-146`** (Token-Update):
   ```css
   --font-heading: "Source Serif 4 Variable", "Source Serif 4", Georgia, serif;
   ```
5. **In `client/public/route-prerender.js:3`** den `&family=DM+Serif+Display:ital@0;1`-Teil aus der URL entfernen (Inter bleibt).
6. **In `client/public/startup-shell.css:87`** (Pre-Hydration-Title) `font-family` auf den neuen Stack ändern. Das ist klassisches CSS, **kein Bundle-Pfad** — Source-Serif-4 muss hier per Google Fonts oder Fontsource-CDN-URL eingebunden werden, da `fonts.ts` (npm) erst nach Hydration verfügbar ist. **Alternative:** `.route-prerender-title` mit Georgia-Fallback laufen lassen, um die kritische HTML-Pfad-Schlankheit zu erhalten.
7. **In `client/public/fallback.css:51-58`** den `"DM Serif Display fallback"`-`@font-face` durch `"Source Serif 4 fallback"` ersetzen. Die `size-adjust`/`ascent-override`/`descent-override`-Werte müssen für Source Serif 4 **neu berechnet werden** (Tools: `https://screenspan.net/fallback`). **Das ist Detail-Arbeit, nicht trivial** — bei falschen Override-Werten gibt's CLS während Font-Swap.

### 3.3 Was zu löschen ist

- DM-Serif-Display-Teil der Google-Fonts-URL in `route-prerender.js` (Schritt 5)
- `"DM Serif Display fallback"` `@font-face` in `fallback.css` (Schritt 7, durch neuen ersetzen)
- DM-Serif-Display-Referenz in `startup-shell.css` (Schritt 6)

**Inter bleibt komplett unangetastet.** Brief-Aussage "Inter exklusiv" für Body ist mit aktuellem Code konsistent (siehe `tailwind-theme.css:142-144`).

### 3.4 Offene Frage zu Schritt 6 (Pre-Hydration-Pfad)

Wenn die startup-shell vor JS-Hydration mit Source Serif 4 angezeigt werden soll, brauchen wir entweder:

- **(a)** Source Serif 4 auch via Google Fonts URL einbinden (preconnect + stylesheet im `<head>` von `index.html`) — ABER widerspricht der Performance-Optimierung aus PR #258, die explizit Fonts aus dem kritischen Pfad genommen hat.
- **(b)** Source Serif 4 selbst-hosten (Fontsource-Files in `client/public/` kopieren) und im startup-shell-CSS direkt einbinden — komplexer Build-Pfad.
- **(c)** Pre-Hydration-Title mit Georgia (Fallback) anzeigen, der Wechsel zu Source Serif 4 passiert nach Hydration — einfachster Pfad, kleiner FOUC akzeptabel im Skeleton.

**Empfehlung in Phase 1:** (c). Begründung: Skeleton sieht Nutzer wenige hundert ms, Wechsel innerhalb der Seite — die DOM-Stabilität ist wichtiger als Font-Konsistenz im Skeleton.

---

## 4. Border-Radius-Risikoanalyse

### 4.1 Was ändert sich bei `--radius: 0.75rem → 0.5rem`

| Token         | Computed jetzt           | Computed neu | Konvention im Code-Kommentar | Match?                                 |
| ------------- | ------------------------ | ------------ | ---------------------------- | -------------------------------------- |
| `--radius-sm` | 8 px                     | 4 px         | 4 px                         | ✓ neu matched, alt nicht               |
| `--radius-md` | 10 px                    | 6 px         | 6 px                         | ✓ neu matched, alt nicht               |
| `--radius-lg` | 12 px                    | 8 px         | 12 px                        | ✗ neu **bricht** Konvention            |
| `--radius-xl` | 16 px                    | 12 px        | 16 px                        | ✗ neu **bricht** Konvention            |
| `rounded-2xl` | 16 px (Tailwind-Default) | 16 px        | 20 px                        | ✗ unverändert (immer schon Diskrepanz) |

**Konvention-Kommentar in `index.css:19-24` ist heute schon teilweise inkorrekt** — die Brief-Reduktion bringt `-sm` und `-md` _näher_ an die Konvention, entfernt `-lg` und `-xl` _weiter_ davon.

### 4.2 Visuelle Konsequenz

**Problematisch:**

- **Cards** (shadcn `card.tsx` `rounded-xl` → 12 px statt 16 px) werden kantiger — der Brief-Hinweis "Falls visuell zu hart: nur `-sm`/`-md` reduzieren" zielt genau darauf.
- **Buttons** (`rounded-md` → 6 px statt 10 px) werden deutlich kantiger. Bei den vielen "soft pill"-Patterns auf der Site ein wahrnehmbarer Bruch.

**Unproblematisch:**

- **Soforthilfe-Ampel-Blöcke** (`rounded-2xl` Page-Level): unverändert.
- **Filter-Chips** in Glossar/Buchempfehlungen (`rounded-2xl`): unverändert.
- **Icon-Shells** auf Pages (`rounded-2xl` 51 Stellen): unverändert.

### 4.3 Empfehlung

**Konservativer Pfad:** Brief-Empfehlung folgen, aber als **Sub-Variante**:

```css
--radius: 0.5rem; /* sm/md werden 4/6 px wie Konvention */
--radius-lg: 0.75rem; /* override: bleibt 12 px wie Konvention */
--radius-xl: 1rem; /* override: bleibt 16 px wie Konvention */
```

Effekt: Buttons/Inputs/Badges (kleinere Komponenten) werden kantiger (Editorial-Charakter), Cards/Modals (grössere Container) bleiben weich. **Das ist genau das Brief-Fallback "nur `-sm`/`-md` reduzieren"** — und gleichzeitig korrigiert es den Konventions-Kommentar.

Der reine `--radius: 0.5rem`-Wechsel ohne `-lg`/`-xl`-Overrides ist machbar, riskiert aber visuelle Härte bei Cards. Vorschlag: in Phase 1 zwei Varianten als kommentierte Alternativen liefern, im Deploy-Preview vergleichen, dann committen.

---

## 5. Editorial-Pattern-Inventar (5 Ziel-Seiten)

### 5.1 Hero-Sektionen — aktuelle Strukturen

| Page                     | Hero-Pattern                                                                                | Komponente extrahiert?                                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Home.tsx:134`           | `<section className="home-hero-surface ...">` Navy-Gradient, weisser Text                   | nein (inline)                                                                                                                                     |
| `Verstehen.tsx:85`       | `<section className="...bg-gradient-to-b from-sage-light/30 to-background wave-divider">`   | nein (aber `client/src/sections/verstehen/VerstehenHeroSection.tsx` existiert separat — von `Verstehen.tsx` referenziert oder nicht? siehe unten) |
| `Genesung.tsx:181`       | `<section className="...bg-gradient-to-b from-sage-wash/60 to-background ...">`             | nein (inline)                                                                                                                                     |
| `Kommunizieren.tsx:87`   | `<section className="...bg-gradient-to-b from-slate-light/30 to-background wave-divider">`  | nein (inline)                                                                                                                                     |
| `Selbstfuersorge.tsx:88` | `<section className="...bg-gradient-to-b from-sage-lighter/30 to-background wave-divider">` | nein (inline)                                                                                                                                     |

**Anmerkung Hero-Komponenten:** Es existieren `client/src/sections/verstehen/VerstehenHeroSection.tsx` und `client/src/sections/unterstuetzen/UnterstuetzenHeroSection.tsx`. Der `Verstehen.tsx` Hero in Zeile 85 ist _nicht_ der Use-Case dieser separaten Komponente — die separate Komponente wird vermutlich von Sub-Pages verwendet (Page-Inventar-Analyse hat dies in der A11y-Audit-Session gezeigt: UnterstuetzenUebersicht nutzt UnterstuetzenHeroSection für ihre H1).

### 5.2 Welche Hero-Restyles brauchen welchen Aufwand

**Home (heavy):** `home-hero-surface` ist eine **eigene CSS-Klasse** in `index.css:169-176` (Navy-Gradient für gross-skalige Akzent-Box mit weissem Text). Brief-Hero-Beispiel ist Cream/Light mit Serif-h1 + Lede + zwei CTAs. Komplette Hero-Replacement, nicht ein Restyle. Inkl. Anpassung des `.home-hero-surface`-Custom-CSS oder Entfernung.

**Verstehen / Genesung / Kommunizieren / Selbstfuersorge (light):** Bereits Light-Gradient zu `--background`. Restyle = neuer Heading-Stack + Italic-Hervorhebung + Lede-Absatz. Strukturell kleinerer Eingriff.

### 5.3 Story-Sektion (Brief 4.2)

Aktueller Stand:

- `Erfahrungsberichte.tsx` (Karussell, mehrere Berichte) — wird **nur in `Home.tsx:519`** verwendet (1 echter Usage; ein Treffer in `Buchempfehlungen.tsx:196` ist nur ein Buch-Titel-String).
- **Kein `<blockquote>`-Pattern**, kein Pull-Quote im Code.

Brief-Vorgabe: Eine zentrale ruhige Story-Sektion auf Home, _additiv_ zur Karussell-Komponente. **Es gibt nichts, was umgebaut werden müsste — nur ergänzen.**

### 5.4 Invitation-Sektion (Brief 4.3)

Aktueller Stand:

- Kein invitation-ähnliches Pattern auf den 5 Ziel-Seiten gefunden.
- `tel:`-Links existieren (z.B. `Notfallkarte.tsx`), aber nicht in einer ruhigen Schluss-Sektion mit Heading + Kontaktmail-Kombination.
- Auf Home gibt es einen Footer-Block in `Layout.tsx:86+` (Themen / Ressourcen / Hinweis) — das ist Footer, kein invitation-Pattern.

**Komplette Neueinführung.** Skeleton-Box im Brief sieht klar aus, übersetzbar.

### 5.5 Editorial-Lesebreite (`max-width: 60ch` / `44ch`)

Aktueller Stand: Pages benutzen `container` + `max-w-3xl mx-auto` (≈ 48 rem ≈ ~80 ch bei 16 px). Keine 60-ch-Klasse vorhanden.

**Neue Utilities — keine Konflikte mit existierendem CSS** (siehe Punkt 6). Anwendung NUR auf reine Prosa-Blöcke (Brief explizit: nicht Cards, nicht Tabellen, nicht Materialien-Listen).

---

## 6. Naming-Konflikte

### 6.1 `.kicker`

**CSS-Klasse `.kicker`:** existiert nicht im Code.

**Daten-Feld `kicker`:** ja, in 3 Stellen:

- `client/src/content/handoutTextVersionTypes.ts:31` — TypeScript-Property `kicker: string`
- `client/src/content/handoutTextVersionContent.ts` — 10× Wert `"Textversion"`
- `client/src/pages/HandoutTextPage.tsx:120` — Render: `{handout?.kicker ?? "Textversion"}`

✓ **Kein Konflikt** zwischen Datenfeld und CSS-Klasse — sind verschiedene Namespaces.

⚠️ **Aber semantisch verwandt:** Das Daten-Feld `kicker` rendert einen Eyebrow-Text (genau das, was die neue `.kicker`-Utility stylen wird). Wenn wir konsistent sein wollen, sollte `HandoutTextPage.tsx:120` die neue `.kicker`-CSS-Klasse anwenden — dadurch bekommt der "Textversion"-Eyebrow das neue Editorial-Styling automatisch.

**Korrektur (nachträglich, vor Phase-1-Implementation):** Die obige Einschätzung «sinnvolle Nebenwirkung in Phase 1» war zu optimistisch. Beim Lesen der konkreten JSX-Struktur in `HandoutTextPage.tsx:118-130` zeigt sich, dass der `kicker`-Datenwert dort als **Pill in einer dreigliedrigen Chip-Reihe** gerendert wird (Kicker-Pill + Topic-Chip + Kind-Chip), nicht als eigenständiger Eyebrow über der h1. Die richtige Anwendung der neuen `.kicker`-Utility ist daher **kein simpler className-Swap**, sondern erfordert ein strukturelles Refactor: den Kicker aus der Chip-Reihe rausnehmen und als eigenständiges `<p className="kicker">` über der h1 platzieren — Brief-konforme Architektur.

Das ist eine **Komponenten-Architektur-Entscheidung, kein Token-Layer-Schritt**. Sie wird in Phase 2 zusammen mit den Hero-/Story-/Invitation-Patterns auf den 5 Ziel-Seiten getroffen, wo das Eyebrow-Muster mehrfach erscheint und einheitlich entschieden werden kann.

**Verschoben nach Phase 2.**

### 6.2 `.kicker` vs `.route-prerender-kicker`

`startup-shell.css:?` definiert eine `.route-prerender-kicker` (pillförmig, Sage-Background, weisse Schrift, Caps). Komplett unterschiedliche Optik vom Brief-`.kicker` (Inter, klein, Caps, muted color, kein Pill).

✓ **Kein direkter Klassen-Konflikt** (unterschiedliche Namen).

⚠️ **Visuelle Inkonsistenz:** Pre-Hydration zeigt der Skeleton-Server eine pillförmige Kicker-Pille; nach Hydration der editoriale Caps-Eyebrow. Pre-Hydration-Skeleton kann optional auf den neuen Stil migriert werden, aber das ist **out-of-scope für Brief Stufe 1**.

### 6.3 `.lede` und `.rule`

Beide CSS-Klassen: existieren nicht im Code. ✓ **Keine Konflikte.**

⚠️ Hinweis zu `.rule`: Tailwind hat KEINE eingebaute Klasse mit diesem Namen (gut), und HTML hat `<hr>` als Element — die neue `.rule`-Klasse mit `height: 1px; background: ...` ist semantisch ein replace für `<hr>`. Falls jemand später `<hr>` mit `className="rule"` schreibt, könnten Browser-Default-Borders der `<hr>`-Resets stören. Anwendung auf `<div className="rule" />` ist sauberer. **Kein Blocker, nur Nutzungs-Hinweis.**

---

## 7. Empfehlung — Risikoarme Phase-1-Reihenfolge

### 7.1 Branch-Strategie

**Empfehlung: Editorial-Phase 1 auf separatem Branch entwickeln**, z.B. `feat/editorial-tokens-phase-1`. Begründung:

- Token-Layer-Änderungen wirken global, betreffen App-Modus-Seiten mit. Brief sagt: "das ist gewollt" — aber dann muss der Deploy-Preview komplett verifiziert werden.
- Visual-Diff-Anforderung des Briefs (Punkt 5.3) braucht Screenshot-Vergleich → Branch + Netlify-Preview ist exakt der Workflow.
- PR-Review-Format kennt ja die Codebase (siehe PR #258), passt zur Audit-Kultur.

### 7.2 Risikoarme Reihenfolge

**Schritt 1 (kleinster Eingriff, schnell verifizierbar):** Background-Token-Wechsel.

- 1 Zeile in `index.css:25`.
- Sofort visuell auf jeder Seite sichtbar.
- Reversibel.
- Zeigt früh, ob Cards-vs-Background-Tiefenhierarchie noch trägt.

**Schritt 2 (mittelgrosser Eingriff, klar testbar):** Border-Radius-Token-Reduktion mit konservativem Override-Approach (siehe Punkt 4.3).

- 1-3 Zeilen in `index.css`/`tailwind-theme.css`.
- Nicht jede Komponente sichtbar betroffen — `rounded-2xl`-Stellen bleiben gleich.
- Schnell visuell zu reverten.

**Schritt 3 (grösster Eingriff aber gut isoliert):** Source-Serif-4-Migration.

- Detail-Arbeit (Fallback-Override-Werte berechnen, 4 Stellen koordinieren).
- Performance-Implikationen (Bundle-Grösse +X KB für Variable Font, lokal vs. CDN).
- Empfehlung: separater **Mini-Sub-Branch von `feat/editorial-tokens-phase-1`**, damit Token-Änderungen isoliert verifizierbar bleiben falls Font-Migration scheitert.

**Schritt 4 (additiv, ohne Bestand zu zerstören):** Drei neue Utility-Klassen `.kicker`, `.lede`, `.rule` in `index.css` `@layer components` einführen + globale h1/h2-Typografie-Regel im `@layer base`.

- Keine Code-Stelle ändert sich automatisch — nur Verfügbarkeit der Klassen.
- Trivial reversibel.

**Schritt 5 (Bonus aus Mapping):** `.kicker`-Klasse auf `HandoutTextPage.tsx:120` anwenden — kleine Konsistenz-Verbesserung.

### 7.3 Drei konkrete erste Schritte zur Freigabe

1. **Background-Token wechseln** — `index.css:25`: `oklch(0.985 0.003 200)` → `oklch(0.97 0.02 85)`. Keine anderen Änderungen. Single-line commit.

2. **Border-Radius mit konservativem Override** — `index.css:18` auf `0.5rem` UND in `tailwind-theme.css:5-8` `--radius-lg: 0.75rem` und `--radius-xl: 1rem` als Override hinzufügen. Konventions-Kommentar in `index.css:19-24` mit aktualisieren.

3. **Drei Utility-Klassen + h1/h2-Base-Style** — neuer `@layer components`-Block in `index.css` mit `.kicker`, `.lede`, `.rule`/`.rule-narrow`/`.rule-center`. Plus globale `h1, h2 { font-family: var(--font-heading); font-weight: 400; letter-spacing: -0.018em; text-wrap: balance; }`-Regel im `@layer base`. **Kein Source-Serif-4-Wechsel** in diesem Schritt — Schritt 3 wartet auf Source-Serif-4-Migration in einem eigenen Commit.

**Source-Serif-4-Migration ist ein separater 4. Schritt** (siehe Punkt 3 oben), wegen Detail-Arbeit am Fallback-`size-adjust`. Nicht in den ersten drei Freigabe-Schritten.

---

## Bereit für Phase 1?

Drei konkrete Schritte, die du freigeben kannst:

- **(1)** Background-Token-Wechsel (1 Zeile)
- **(2)** Border-Radius-Reduktion mit konservativem Override (3-4 Zeilen)
- **(3)** Drei Utility-Klassen + h1/h2-Base-Style (≈ 30 Zeilen, additiv)

Source-Serif-4-Migration als **(4)** separat, weil:

- Brauchst Entscheidung zu Pre-Hydration-Pfad (Optionen a/b/c im Punkt 3.4)
- Fallback-Override-Werte müssen empirisch ermittelt werden
- npm-Dependency-Hinzufügung verdient eigenen Commit

**Offene Fragen, die ich stellen würde, bevor ich implementiere:**

- Schritt (2): Konservativer Override (`-lg` und `-xl` belassen) oder reine Brief-Linie (nur `--radius: 0.5rem`, alle Komponenten kantiger)?
- Schritt (3): Soll die `.kicker`-Klasse direkt auf `HandoutTextPage.tsx:120` angewandt werden (kleine Konsistenz-Verbesserung), oder nur die Klasse einführen ohne Anwendung?
- Branch oder direkt auf `main` für Schritt (1)? Schritt (1) ist trivial reversibel; Branch + PR + Visual-Diff via Netlify-Preview wäre aber konsistent mit Audit-Workflow.
