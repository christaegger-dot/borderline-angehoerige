# Editorial Redesign — Phase 0: Design-Inventur

**Datum:** 27. April 2026
**Branch:** keiner (Read-only)
**Auftraggeberin:** Christa Egger, Fachstelle Angehörigenarbeit, PUK Zürich
**Brief-Bezug:** Editorial-Redesign-Auftragsdokument vom 27.04.2026

---

## Zusammenfassung der Befunde

Das aktuelle Design-System (nach den am 26./27. April auf main gemergten Editorial-Phasen 1–6 aus dem Vorgänger-Brief, PRs #259–#270) hat **viele bereits passende Bausteine** für die neue editoriale Richtung — aber gleichzeitig **erhebliche strukturelle Hürden**, weil das aktuelle System Multi-Farb-Zonen, Card-Grids, dekorative Section-Icons und Tier-1-Page-CTAs als Kernkonzept etabliert hat.

**Vier zentrale Befunde:**

1. **Token-System ist gross und mehrheitlich überflüssig.** ~80 Farb-Tokens definiert, davon werden ~15 mit ≥20 Verwendungen genutzt (sage-wash 140, sand 139, sage-light 113, terracotta 96), die meisten sind dekorative Hintergründe, die im neuen Design wegfallen sollen.
2. **Multi-Farb-Hintergrund-Komposition ist tief verbaut.** 19 Dateien nutzen >3 verschiedene `bg-*`-Klassen, drei davon >10 (MaterialienLibrarySection 29, Selbsttest 17, Selbstfuersorge 15).
3. **Dekorative Section-Icons sind das dominante Pattern.** Alleine über `ContentSection.icon`-Prop sind 80+ Icons in Tier-1- und Tier-2-Pages eingebaut — alle dekorativ.
4. **Buttons im Lesefluss sind das Standard-Page-End-Muster** auf praktisch allen Tier-1-Seiten. ~36 `<Button>`-Verwendungen in 11 Tier-1+2-Pages (ohne Soforthilfe/Forms).

Daraus ergibt sich für die Phasen 1–7: das Token-Layer (Phase 1) ist klein, aber das Komponenten-Refactoring (Phasen 3–5) ist substantiell — viele Dateien werden angefasst, viele Pattern werden ersetzt.

---

## Auftrag 1 — Token-Inventar

### 1.1 Quelle

Tokens leben in zwei Dateien:

- `client/src/styles/tailwind-theme.css` — `@theme inline`-Block mit allen `--color-*`/`--radius-*`/`--font-*`-Tokens (Zeilen 1–157)
- `client/src/index.css` — `:root` und `.dark` Blöcke mit Mappings via `--background: var(...)` etc. (Zeilen 7–95)

### 1.2 Farb-Tokens (Auszug, mit Verwendungs-Anzahl)

| Token                        | OKLCH-Wert             | Verwendungen | Im neuen Brief                                        |
| ---------------------------- | ---------------------- | ------------ | ----------------------------------------------------- |
| `--color-terracotta`         | `oklch(0.55 0.15 55)`  | 96           | Ersetzt durch `--accent-primary: #5B3A4E` (Aubergine) |
| `--color-terracotta-mid`     | `oklch(0.55 0.15 55)`  | 36           | weg                                                   |
| `--color-terracotta-dark`    | `oklch(0.45 0.12 55)`  | 10           | weg                                                   |
| `--color-terracotta-light`   | `oklch(0.85 0.08 55)`  | 15           | weg                                                   |
| `--color-terracotta-lighter` | `oklch(0.92 0.05 55)`  | 2            | weg                                                   |
| `--color-terracotta-darker`  | `oklch(0.35 0.1 55)`   | 5            | weg                                                   |
| `--color-terracotta-wash`    | `oklch(0.95 0.02 55)`  | 19           | weg                                                   |
| `--color-sand`               | `oklch(0.96 0.02 85)`  | 139          | weg                                                   |
| `--color-sand-warm`          | `oklch(0.55 0.1 85)`   | 27           | weg                                                   |
| `--color-sand-mid`           | `oklch(0.6 0.1 85)`    | 28           | weg                                                   |
| `--color-sand-accent`        | `oklch(0.65 0.15 85)`  | 6            | weg                                                   |
| `--color-sand-border`        | `oklch(0.75 0.08 85)`  | 28           | weg                                                   |
| `--color-sand-subtle`        | `oklch(0.88 0.04 85)`  | 5            | weg                                                   |
| `--color-sand-muted`         | `oklch(0.94 0.02 85)`  | 39           | weg                                                   |
| `--color-cream`              | `oklch(0.98 0.01 85)`  | 22           | weg / ersetzt durch `--bg-primary`                    |
| `--color-sage-darker`        | `oklch(0.35 0.07 190)` | (s.u.)       | reduziert auf `--accent-label: #4F6B5E`               |
| `--color-sage-dark`          | `oklch(0.44 0.07 190)` | viele        | reduziert                                             |
| `--color-sage-mid`           | `oklch(0.52 0.09 190)` | viele        | reduziert                                             |
| `--color-sage-light`         | `oklch(0.88 0.04 190)` | 113          | weg                                                   |
| `--color-sage-lighter`       | `oklch(0.92 0.03 190)` | 27           | weg                                                   |
| `--color-sage-wash`          | `oklch(0.95 0.02 190)` | 140          | weg                                                   |
| `--color-sage-pale`          | `oklch(0.97 0.01 190)` | 8            | weg                                                   |
| `--color-navy`               | `oklch(0.25 0.04 250)` | 13           | weg (Hero-Hintergrund alt)                            |
| `--color-navy-light`         | `oklch(0.35 0.03 250)` | 6            | weg                                                   |
| `--color-charcoal`           | `oklch(0.3 0.02 250)`  | (s.u.)       | bleibt als `--fg-primary`                             |
| `--color-slate-blue`         | `oklch(0.45 0.05 250)` | (s.u.)       | wird zu Aubergine umfunktioniert                      |
| `--color-slate-dark`         | `oklch(0.45 0.08 250)` | (s.u.)       | weg                                                   |
| `--color-slate-mid`          | `oklch(0.55 0.1 250)`  | (s.u.)       | weg                                                   |
| `--color-slate-light`        | `oklch(0.9 0.03 250)`  | (s.u.)       | weg                                                   |
| `--color-slate-lighter`      | `oklch(0.92 0.04 250)` | (s.u.)       | weg                                                   |
| `--color-slate-wash`         | `oklch(0.95 0.02 250)` | 35           | weg                                                   |
| `--color-slate-pale`         | `oklch(0.97 0.01 250)` | 8            | weg                                                   |

### 1.3 Funktional bleibende Tokens (nicht anfassen)

| Token-Familie         | Zweck                                       | Verwendungen |
| --------------------- | ------------------------------------------- | ------------ |
| `--color-sos-rot*`    | Soforthilfe-Block Lebensgefahr              | 8            |
| `--color-sos-orange*` | Soforthilfe-Krise                           | 21           |
| `--color-sos-gruen*`  | Soforthilfe-Beratung                        | 19           |
| `--color-sos-lila*`   | Soforthilfe-Spezial                         | 14           |
| `--color-sos-amber*`  | Soforthilfe-Warn-Hinweis                    | 3            |
| `--color-alert*`      | Soforthilfe-Querverweise auf anderen Seiten | 57           |

### 1.4 Typografie-Tokens

| Token            | Wert                                                          | Im neuen Brief                                                                    |
| ---------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `--font-display` | `"Inter", "Inter fallback", sans-serif`                       | Kommentar sagt "Design-Lock: Inter exklusiv" — wird neu definiert (Display-Serif) |
| `--font-body`    | `"Inter", "Inter fallback", sans-serif`                       | bleibt Inter                                                                      |
| `--font-heading` | `"Source Serif 4 Variable", "Source Serif 4", Georgia, serif` | bleibt Serif (Source Serif 4 ist editorial-tauglich)                              |

Bestehende Editorial-Utility-Klassen in `index.css` `@layer components`:

| Klasse                                    | Definition                                                  | Bewertung                                            |
| ----------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| `.kicker`                                 | `0.72rem`, caps, `letter-spacing: 0.18em`, muted-foreground | passend, kann übernommen werden                      |
| `.lede`                                   | `1.32rem`, italic, max-width `44ch`                         | passend, evtl. nicht italic in der neuen Brief-Linie |
| `.rule` + `.rule-narrow` + `.rule-center` | 1px Hairline                                                | passend                                              |
| `.prose-editorial`                        | `max-width: 60ch`                                           | passend (Brief sagt 60–65ch)                         |
| `.prose-editorial-narrow`                 | `max-width: 44ch`                                           | passend                                              |
| `.pull-quote`                             | `border-left: 3px var(--color-sage)`, italic                | passend, Border-Farbe muss zu Aubergine wechseln     |
| `.home-hero-surface`                      | Navy-Gradient                                               | weg (Brief: kein Navy mehr)                          |
| `.home-section-divider`                   | sage-Gradient-Stripe                                        | weg                                                  |
| `.home-orbit-glow`                        | sage-Radial-Gradient                                        | weg                                                  |

### 1.5 Spacing-Skala

Aktuell **keine custom Spacing-Tokens** in tailwind-theme.css definiert — Tailwind-Defaults werden direkt verwendet (`mt-4`, `py-12`, `gap-6` etc.). Brief schlägt explizite `--space-1` bis `--space-8`-Skala vor, was eine Disziplin-Verschärfung wäre.

### 1.6 Border-Radius

| Token         | Wert                               | Brief-Vorgabe                                                              |
| ------------- | ---------------------------------- | -------------------------------------------------------------------------- |
| `--radius`    | `0.5rem`                           | Brief erwähnt Radius nicht direkt, Magazin-Charakter impliziert klein/null |
| `--radius-sm` | `calc(var(--radius) - 4px)` = 4px  | OK                                                                         |
| `--radius-md` | `calc(var(--radius) - 2px)` = 6px  | OK                                                                         |
| `--radius-lg` | `var(--radius)` = 8px              | evtl. reduzieren                                                           |
| `--radius-xl` | `calc(var(--radius) + 4px)` = 12px | evtl. weg (Karten-Radius irrelevant wenn keine Karten mehr)                |

### 1.7 Schatten

Keine zentral definierten `--shadow-*`-Tokens. Tailwind-Defaults (`shadow-sm`, `shadow-lg` etc.) werden direkt verwendet, häufig in Karten-Patterns. Brief fordert Magazin-Reduktion → Schatten weitgehend irrelevant nach Phase 4.

---

## Auftrag 2 — Files mit >3 distinct Background-Farben

19 Dateien überschreiten den Schwellwert. Sortiert absteigend:

| Datei                                                        | distinct `bg-*` | Charakter                                                                                                                                                            |
| ------------------------------------------------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client/src/sections/MaterialienLibrarySection.tsx`          | 29              | extreme: bg-alert, bg-alert-wash/95, bg-background/86, bg-black/80, bg-gradient-to-t, bg-muted/30, bg-sage-dark, bg-sage-dark/90, bg-sage-light, bg-sage-light/40, … |
| `client/src/components/Selbsttest.tsx`                       | 17              | bg-alert, bg-alert/90, bg-background, bg-muted, bg-muted/50, bg-sage, bg-sage-dark, bg-sage-light, bg-sage-lighter, bg-sage-mid, …                                   |
| `client/src/pages/Selbstfuersorge.tsx`                       | 15              | bg-cream/95, bg-gradient-to-b, bg-gradient-to-br, bg-muted/30, bg-sage-wash, bg-sage-wash/45, bg-sage-wash/75, bg-slate-light/20, bg-slate-wash, bg-terracotta, …    |
| `client/src/components/UXEnhancements.tsx`                   | 12              | bg-background, bg-background/60, bg-background/92, bg-black/30, bg-border, bg-muted, bg-muted/60, bg-navy, bg-navy-light, bg-sage-dark, …                            |
| `client/src/pages/UnterstuetzenUebersicht.tsx`               | 10              | bg-accent, bg-background, bg-cream, bg-muted, bg-sage-dark, bg-sage-light/20, bg-sage-mid, bg-sage-wash/20, bg-sage-wash/50, bg-sand-muted                           |
| `client/src/components/Search.tsx`                           | 9               | bg-background, bg-black/35, bg-muted, bg-muted/30, bg-muted/50, bg-muted/70, bg-muted/80, bg-sage-lighter, bg-transparent                                            |
| `client/src/pages/HandoutTextPage.tsx`                       | 8               | bg-background, bg-gradient-to-b, bg-muted/20, bg-sage-dark, bg-sage-mid, bg-sage-wash/50, bg-sage-wash/70, bg-white/90                                               |
| `client/src/sections/SelbstfuersorgeSignalsSection.tsx`      | 7               | bg-sand, bg-sand-mid, bg-slate-mid, bg-slate-pale, bg-terracotta-mid, bg-terracotta-mid/10, bg-terracotta-wash                                                       |
| `client/src/sections/SelbstfuersorgeRoleNotesSection.tsx`    | 6               | bg-sage-lighter, bg-sage-pale, bg-slate-lighter, bg-slate-pale, bg-terracotta-lighter, bg-terracotta-wash                                                            |
| `client/src/sections/SelbstfuersorgeExercisesSection.tsx`    | 6               | bg-gradient-to-br, bg-muted/30, bg-sage-dark, bg-sage-mid, bg-sage-mid/20, bg-terracotta/20                                                                          |
| `client/src/components/Layout.tsx`                           | 6               | bg-alert/10, bg-alert/15, bg-background, bg-navy, bg-sage-dark, bg-sage-wash/40                                                                                      |
| `client/src/components/Erfahrungsberichte.tsx`               | 6               | bg-sage, bg-sage-dark, bg-sage-light, bg-sage-lighter, bg-sage-wash, bg-white                                                                                        |
| `client/src/sections/VerstehenMaterialsSection.tsx`          | 5               | bg-accent, bg-background, bg-muted, bg-sage-dark, bg-sage-mid                                                                                                        |
| `client/src/sections/VerstehenInfografikenSection.tsx`       | 5               | (gleiches Pattern)                                                                                                                                                   |
| `client/src/sections/GenesungInfografikenSection.tsx`        | 5               | (gleiches Pattern)                                                                                                                                                   |
| `client/src/sections/KommunizierenMaterialsSection.tsx`      | 5               | bg-accent, bg-background, bg-muted, bg-terracotta-dark, bg-terracotta-mid                                                                                            |
| `client/src/sections/SelbstfuersorgeInfografikenSection.tsx` | 5               | (gleiches Pattern)                                                                                                                                                   |
| `client/src/sections/KommunizierenPatternSections.tsx`       | 4               | bg-sage-pale, bg-slate-pale, bg-terracotta-wash, bg-terracotta-wash/30                                                                                               |
| `client/src/components/InvitationSection.tsx`                | 4               | bg-background, bg-muted, bg-sage-dark, bg-sage-darker                                                                                                                |

**Cluster-Beobachtung:** Die Sections-Dateien sind systematisch betroffen. Sechs der neun `*Section.tsx`-Dateien nutzen denselben 5er-bis-7er-bg-Mix (background, muted, sage-dark, sage-mid, +Akzent) — das ist offenbar ein **Designsystem-Pattern**, das im neuen Brief komplett aufgelöst wird (single `--bg-primary` für alle Sektionen).

**Soforthilfe nicht in der Liste** — überraschend, weil dort die Ampel-Farben den Eindruck von Multi-BG-Komplexität vermitteln. Erklärung: dort stehen die SOS-Farben in CSS-Variablen mit `bg-[var(--color-sos-rot)]`-Pattern, nicht als `bg-*`-Tailwind-Utility.

---

## Auftrag 3 — Dekorative Icons im Lesefluss

### 3.1 Hauptkategorie: ContentSection `icon`-Prop (80+ Vorkommen)

Das `ContentSection`-Akkordeon-Element hat einen `icon`-Prop, der vor dem H2-Titel des Sektion-Headers gerendert wird. Diese sind alle **rein dekorativ** (kein funktionaler Klick, keine zusätzliche Information).

**Pro Page (alle Tier 1+2 betroffen):**

| Page                          | Anzahl `icon={<…/>}`-Props |
| ----------------------------- | -------------------------- |
| `Grenzen.tsx`                 | 10                         |
| `Datenschutz.tsx`             | 10                         |
| `UnterstuetzenTherapie.tsx`   | 8                          |
| `UnterstuetzenAlltag.tsx`     | 8                          |
| `Verstehen.tsx`               | 6                          |
| `UnterstuetzenUebersicht.tsx` | 6                          |
| `Genesung.tsx`                | 6                          |
| `UnterstuetzenKrise.tsx`      | 5                          |
| `Impressum.tsx`               | 5                          |
| `Selbstfuersorge.tsx`         | 4                          |
| `Kommunizieren.tsx`           | 3                          |
| `Selbsthilfegruppen.tsx`      | 3                          |

**Beispiel** (`Verstehen.tsx:233`):

```tsx
icon={<Heart className="w-7 h-7 text-sage-mid-mid" />}
```

Das ist genau das, was Brief 4 abschafft: "Icon-Prop entfernt (Icons aus Akkordeon-Headern raus)."

### 3.2 Ikonen direkt vor `<h*>`-Elementen (separater Block)

Stichprobe der direkt vor Headings stehenden Icons (in `<div>`/`<span>`-Wrappern):

| Datei                       | Zeile        | Icon                         | Kontext                             |
| --------------------------- | ------------ | ---------------------------- | ----------------------------------- |
| `Selbstfuersorge.tsx`       | 133          | `<Heart …/>`                 | direkt vor h1/h2 in einer Card      |
| `Selbstfuersorge.tsx`       | 476          | `<Sparkles …/>`              | gross zentriert vor Section-Heading |
| `UnterstuetzenTherapie.tsx` | 790          | `<Download …/>`              | vor Section-Heading                 |
| `Soforthilfe.tsx`           | 452          | `<AlertTriangle …/>`         | vor h2 (funktional — bleibt)        |
| `Selbsthilfegruppen.tsx`    | 92, 251, 430 | (Building2 / Heart / MapPin) | jeweils Section-Header              |

Im Tier 4 (Datenschutz, Impressum, Barrierefreiheit) sind dekorative Icons in legalen Page-Headers (5+5+2+ ähnlich). Brief sagt zu Tier 4: "nur Typografie-Update" — Icons könnten dort technisch bleiben, der editoriale Geist verlangt aber Konsistenz, also raus.

### 3.3 Icons in Listen (`<li>` mit `<Icon>`-Prefix)

Häufige Pattern: `<li className="flex items-center gap-2"><Icon … /> Text</li>` — dekorative Bullet-Ersetzung. Stichprobe:

- `UnterstuetzenUebersicht.tsx:125` — `<XCircle …/>` als Bullet vor Listen-Items
- `UnterstuetzenUebersicht.tsx:399` — `<Icon className="w-4 h-4 mr-1.5" />` pro Item in einer Tag-Liste
- weitere ~10–15 Stellen über Tier-1-Pages verteilt

### 3.4 Funktionale Icons (BLEIBEN, nicht in Auftrag-3-Scope)

- Soforthilfe-Notruf-Icons (Phone, Heart als Block-Marker)
- Header-Navigation Icons (Menü, Search-Lupe)
- Notfallkarte Trash/Save-Icons (UI-Action-Affordance)
- HandoutTextPage Library/FileText/Download (CTA-Markierung in Chip-Reihe — funktional, aber laut Phase-2-Diskussion wird die Chip-Reihe selbst zur Disposition stehen)

### 3.5 Methodologie-Hinweis

Eine vollständige Per-Zeile-Liste aller Icons-im-Lesefluss würde mehrere hundert Einträge umfassen. Praktischer Pfad: in Phase 4 wird **pro Page** beim Refactor der gesamte Icon-Bestand der Page neu evaluiert — die Icon-Imports am Datei-Anfang machen den Bestand pro Page leicht sichtbar.

---

## Auftrag 4 — `<Button>` im Lesefluss von Tier 1+2

### 4.1 Inventar (ohne Soforthilfe, Notfallkarte-Form, Selbsttest, Wegweiser, Feedback)

| Datei                         | `<Button>`-Anzahl | Wo                                                       |
| ----------------------------- | ----------------- | -------------------------------------------------------- |
| `Genesung.tsx`                | 7                 | Mix: Page-End-CTAs, Card-Action-Buttons, Inline-Triggers |
| `UnterstuetzenKrise.tsx`      | 5                 | Page-End-CTAs, Hero-CTAs, "weiter zu …"-Navigation       |
| `Grenzen.tsx`                 | 4                 | Inline-Card-Triggers, Page-End "Weiter:..."              |
| `UnterstuetzenUebersicht.tsx` | 4                 | Section-CTAs, Page-End                                   |
| `Home.tsx`                    | 4                 | Hero-CTAs (×2), Tool-Grid-Trigger, Page-End-CTA          |
| `UnterstuetzenTherapie.tsx`   | 3                 | Card-Detail, Page-End-Pair                               |
| `Verstehen.tsx`               | 2                 | Page-End "Weiter:..." (ghost + filled pair)              |
| `Kommunizieren.tsx`           | 2                 | Page-End-Pair                                            |
| `Selbstfuersorge.tsx`         | 2                 | Page-End-Pair                                            |
| `UnterstuetzenAlltag.tsx`     | 2                 | Page-End-Pair                                            |
| `Selbsthilfegruppen.tsx`      | 1                 | Card-Detail                                              |

**Total: ~36 Buttons.**

### 4.2 Wiederkehrendes Pattern: "Page-End Navigations-Pair"

8 von 11 Tier-1-Pages enden mit einem identischen 2-Button-Block:

```tsx
<Button variant="ghost" asChild>
  <Link href="/zurück">← Zurück: Vorheriger Topic</Link>
</Button>
<Button asChild className="bg-terracotta hover:bg-terracotta-mid text-white">
  <Link href="/weiter">Weiter: Nächster Topic →</Link>
</Button>
```

(Beispiele: `Verstehen.tsx:565+592`, `Kommunizieren.tsx:333+336`, `Selbstfuersorge.tsx:498+501`, `UnterstuetzenAlltag.tsx:1051+1056`, `UnterstuetzenKrise.tsx:1060+1063`, `UnterstuetzenTherapie.tsx:813+818`, `UnterstuetzenUebersicht.tsx:510+513`, `Grenzen.tsx:871+874`)

Brief 4.4 will diese durch Inline-Link-Absatz ersetzen ("Sie können auch direkt zu [Abschnitt A], [Abschnitt B] oder [Abschnitt C] springen.").

### 4.3 Wiederkehrendes Pattern: "Inline-Card-Trigger" (innerhalb ContentSection)

Pattern-Beispiel (`Selbstfuersorge.tsx:201`):

```tsx
<Button variant="ghost" size="sm" className="bg-white border ...">
  <Link href="/...">Detail-Page öffnen <ArrowRight ... /></Link>
</Button>
```

Diese sitzen innerhalb von Akkordeon-Cards und sind teilweise nicht-trivial zu Inline-Links umzubauen, weil sie als Card-Action mit visueller Hervorhebung gemeint sind. Brief 4.9 sagt: "Alle Buttons im Lesefluss zu Inline-Links."

### 4.4 Page-Hero-CTAs

`Home.tsx:163, 173` — die zwei Hero-CTAs der aktuellen Home-Seite (das übliche "primär + sekundär"-Paar). Werden in Phase 3 ersatzlos entfernt (Brief 3.1: "Kein Doppel-CTA").

### 4.5 Forms (NICHT in Tier 4-Scope)

Buttons in Forms (Notfallkarte add/remove, Selbsttest-Optionen, Feedback-Submit) sind funktional und bleiben. Diese sind hier nicht gelistet.

---

## Auftrag 5 — Komponenten ausschliesslich von Home importiert

| Komponente                                     | Status    | In neuer Home noch gebraucht?                              |
| ---------------------------------------------- | --------- | ---------------------------------------------------------- |
| `client/src/components/AnimatedStat.tsx`       | HOME-ONLY | nein (Brief 3.7 entfernt Stats)                            |
| `client/src/components/Erfahrungsberichte.tsx` | HOME-ONLY | nein (Brief 3.5 ersetzt Karussell durch Single Pull-Quote) |

**Keine weiteren Komponenten** sind exklusiv von Home importiert.

### 5.1 Verwandte Komponenten, die NICHT Home-only sind aber im neuen Brief wegfallen

| Komponente                                     | Andere Importer                      | Im neuen Brief                                                               |
| ---------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| `InvitationSection`                            | `Home.tsx` plus mind. 1 weitere Page | aus Home raus, evtl. anderswo behalten — Phase 7 prüfen                      |
| `RelatedLinks`                                 | mehrere Pages                        | bleibt strukturell, aber visuell entschärft (Brief 4.11)                     |
| `visualizations/EnergieHaushaltVisualisierung` | tier-1-Page                          | Brief sagt nichts explizit — vermutlich überleben (visuelles Inhaltselement) |
| `visualizations/KrisenampelVisualisierung`     | tier-1-Page                          | dito                                                                         |
| `visualizations/RollenOrbitVisualisierung`     | tier-1-Page                          | dito                                                                         |
| `interactive/GrenzenCheck`                     | Grenzen.tsx                          | bleibt (interaktiv, keine Karten-Auflösung)                                  |

### 5.2 Cleanup-Empfehlung für Phase 7

Wenn die neue Home wie im Brief Anhang A umgesetzt ist:

- `AnimatedStat.tsx` kann komplett gelöscht werden (Auf den Statistik-Werten 93%/50%/10J. wird im Brief explizit verzichtet — sie gehören laut Brief 3 thematisch nach `/genesung`, aber dort werden sie als Fliesstext rekonstruiert, nicht als animierte Counter)
- `Erfahrungsberichte.tsx` (Karussell) wird Phase 3 nicht mehr importiert. Bleibt sie irgendwo anders gebraucht? Bisher nein — kann komplett gelöscht werden
- `useCountUp.ts` (Hook hinter AnimatedStat) wird nach AnimatedStat-Löschung ebenfalls überflüssig

---

## Querschnitts-Beobachtungen für die Brief-Phasen

### A) Was bereits passt (Brückenkopf in main)

- `--bg-primary` Token ist faktisch schon da (`--background: oklch(0.97 0.02 85)` ≈ Brief's `#FAF7F2`)
- Editorial-Utility-Klassen `.kicker`, `.lede`, `.rule`, `.prose-editorial`, `.pull-quote` sind in `index.css` definiert
- Source Serif 4 ist als `--font-heading` aktiv
- Inter ist lokal eingebettet in `client/public/fonts/`
- WCAG-AA-Kontrast-Tokens (Phase 1 Fix) bereits angepasst
- Mobile-Heading-Optimierungen für Source Serif 4 vorhanden

### B) Wo das aktuelle System dem Brief direkt widerspricht

- Hero-Surface `home-hero-surface` (Navy-Gradient) muss weg
- Wave-Divider zwischen Sektionen (`home-section-divider`, `wave-divider`-Klassen) müssen weg
- Akkordeon-Header mit `icon`-Prop müssen Icon-frei werden — strukturelle Änderung an `ContentSection.tsx`
- Page-End-Button-Pair-Pattern muss durch Inline-Links ersetzt werden — 8+ Pages identisch
- Multi-Farb-Sections (besonders im Sections-Verzeichnis) müssen alle auf `--bg-primary` reduziert werden

### C) Brief-Aussagen mit Klärungsbedarf

1. **Brief Phase 1 erwähnt Schriften nur sekundär** — die aktuelle Heading-Schrift Source Serif 4 ist editorial-tauglich. Bleibt sie? Oder will der Brief eine andere Display-Serif?
2. **Brief Phase 4 sagt "Inhalt wird nicht neu geschrieben"** — aber für 6 von 11 Tier-1-Pages enthält der Tier-1-Auftrag (Punkt 3) "ersetze Intro-Card-Trios durch einen einzigen Fliesstext-Absatz" und "wenn nicht in zwei Sätze passt, ungeordnete Liste". Das ist ein Inhalts-Refactor, kein reines Layout. Soll Christa pro Page entscheiden, oder vorgegebene Regel?
3. **Brief Phase 5 (Tier 2)** sagt "alle funktionalen Komponenten bleiben strukturell". Aber für Wegweiser/Selbsttest/Notfallkarte gibt es jeweils Hero-Sektionen, die im Brief nicht detailliert sind. Wie tief geht "editorial integriert" hier?
4. **Brief Phase 7 erwähnt 149 MB stale Infografiken** — historisch war der Befund korrekt. Der Bestand unter `client/public/infografiken/` wurde seither bereinigt; siehe [Infografik-Workflow](../infografik-workflow.md) und `qa/infografik-inventory.json` fuer den aktuellen Gruen-Stand ohne unreferenzierte Produkt-Altversionen.
5. **Brief Anhang C "Aubergine-Links auf Cream"-Kontrast** — `#5B3A4E` auf `#FAF7F2` ergibt rechnerisch ca. 8.6:1 (WCAG AA bestanden für Body-Text 4.5:1, AAA für Body bei 7:1). Sollte safe sein.

### D) Aufwand-Schätzung pro Phase

| Phase                | Geschätzter Aufwand                                        | Hauptaufwand                                      |
| -------------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| 1 Token              | klein (1 Datei, ~30 Zeilen)                                | Token-Werte, keine Konsumer ändern                |
| 2 Primitive          | mittel (5 neue Dateien)                                    | EditorialLayout/Section/Prose/PullQuote/Footnotes |
| 3 Home               | gross (1 Datei vollständig neu, ~400 Zeilen → ~150 Zeilen) | komplette Home-Rewrite                            |
| 4 Tier 1 (×11 Pages) | sehr gross                                                 | jede Page einzeln, viele Icon-/Card-Removals      |
| 5 Tier 2 (×9 Pages)  | mittel-gross                                               | viele Pages, aber kleinere Eingriffe              |
| 6 Soforthilfe        | klein-mittel                                               | nur Hero und Footer-Action-Sektion                |
| 7 Cleanup            | mittel                                                     | Token-Removal, Component-Removal, asset cleanup   |

**Gesamtschätzung:** mehrere Wochen Arbeit über alle Phasen hinweg. Pro PR-Zyklus mit Christa-Review (visuell pro Page) ist 1 Page Tier-1 ein realistischer Tages-Scope.

---

## Verifikations-Disclaimer

- **Token-Verwendungs-Counts** sind regex-basiert (`grep -roE`). Sie zählen die Vorkommen, nicht semantisch unterschiedliche Verwendungs-Kontexte. Eine Klasse wie `bg-sage-wash` zählt jedes Mal, ob sie in einem aktiven Pattern oder in totem Code steckt.
- **Icon-Inventar** ist nicht erschöpfend — nur die Hauptkategorie (`ContentSection.icon`-Prop) und Stichproben. Eine vollständige Liste aller Lucide-Icon-Verwendungen wäre mehrere hundert Einträge.
- **Home-only Components** sind via Import-Path-Grep ermittelt. Indirekte Verwendungen (z.B. ein anderes Modul re-exportiert die Komponente) würden nicht erfasst — wären für die genannten Komponenten aber unüblich.
- **>3 BG colors** zählt distinct Tailwind-Klassen-Namen, nicht visuelle Farbenvielfalt — `bg-sage-dark` und `bg-sage-dark/90` zählen als zwei distinct, sind aber visuell die gleiche Farbe in zwei Opacities.

---

**Ende der Phase-0-Inventur. Auf Freigabe für Phase 1 warten.**
