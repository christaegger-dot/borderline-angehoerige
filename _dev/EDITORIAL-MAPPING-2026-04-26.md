# Editorial Mapping Bericht – Borderline-Angehörige

**Datum:** 26. April 2026
**Bezug:** `_dev/EDITORIAL-DESIGN-BRIEF-2026-04-26.md`

Dieser Bericht dokumentiert den aktuellen Stand der Codebase (Phase 0) als Vorbereitung für die stufenweise Übernahme der editorialen Design-Sprache. Es wurden keine Code-Änderungen vorgenommen.

---

## 1. Aktueller Stand der Token

Die relevanten Design-Token in `client/src/styles/tailwind-theme.css` und `client/src/index.css` sind wie folgt definiert:

*   **`--background`**: Aktuell `oklch(0.985 0.003 200)` (kühles Off-White) in `index.css`.
*   **`--font-heading`**: Aktuell `"DM Serif Display", "DM Serif Display fallback", Georgia, serif` in `tailwind-theme.css`.
*   **`--radius`**: Aktuell `0.75rem` (12px) in `index.css`.

**Border-Radius-Verwendungen in shadcn-Komponenten:**
Die Skala (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`) wird in `tailwind-theme.css` dynamisch aus `--radius` berechnet.
In `client/src/components/ui/` wird `--radius` indirekt über Tailwind-Klassen wie `rounded-md`, `rounded-sm`, `rounded-lg`, `rounded-xl` genutzt.

## 2. DM-Serif-Display-Inventar

Die Schriftart `DM Serif Display` wird aktuell wie folgt eingebunden und referenziert:

*   **Referenzen:**
    *   `client/src/styles/tailwind-theme.css`: `--font-heading`
    *   `client/public/startup-shell.css`: Inline-Style für `.route-prerender-title`
    *   `client/public/fallback.css`: `@font-face` für `"DM Serif Display fallback"`
*   **Import:**
    *   Die Schrift wird **nicht** über ein lokales npm-Paket (wie `@fontsource`) geladen.
    *   Stattdessen wird sie über das Google Fonts CDN geladen. Der Import befindet sich in `client/public/route-prerender.js`:
        `"https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"`

## 3. Source-Serif-4-Migrationspfad

*   **Aktuelle Version:** Das Paket `@fontsource-variable/source-serif-4` ist aktuell nicht in der `package.json` installiert. Die neueste verfügbare Version auf npm ist `5.2.9`.
*   **Import-Schritt:**
    1.  Installation: `pnpm add @fontsource-variable/source-serif-4`
    2.  Import in `client/src/main.tsx` (oder `bootstrap`): `import "@fontsource-variable/source-serif-4";`
*   **Anpassungen:**
    1.  In `client/src/styles/tailwind-theme.css` den Token `--font-heading` auf `"Source Serif 4 Variable", "Source Serif 4", Georgia, serif` ändern.
    2.  In `client/public/route-prerender.js` den Google Fonts CDN-Link anpassen (DM Serif Display entfernen).
    3.  In `client/public/startup-shell.css` die `font-family` für `.route-prerender-title` anpassen.
    4.  In `client/public/fallback.css` die `@font-face`-Definition für `"DM Serif Display fallback"` entfernen.

## 4. Border-Radius-Risikoanalyse

*   **Reaktion auf `--radius`:** Fast alle shadcn-Komponenten (z.B. `button.tsx`, `card.tsx`, `select.tsx`, `sidebar.tsx`) reagieren auf die `--radius`-Skala über Tailwind-Klassen (`rounded-md`, `rounded-lg`, etc.).
*   **Hartcodierte Radien:** Es gibt einige hartcodierte Radien in shadcn-Komponenten, die nicht direkt von `--radius` abhängen:
    *   `client/src/components/ui/progress.tsx`: `rounded-full`
    *   `client/src/components/ui/scroll-area.tsx`: `rounded-full`
    *   `client/src/components/ui/card.tsx`: `rounded-xl` (wird nicht über `--radius-xl` gesteuert, sondern ist hartcodiert auf 12px/0.75rem in Tailwind 4, was dem aktuellen `--radius` entspricht, aber bei Änderung von `--radius` nicht mitzieht).
    *   `client/src/components/ui/sidebar.tsx`: `rounded-xl`
*   **Risiko bei Reduktion auf `0.5rem`:**
    *   Die Reduktion von `0.75rem` auf `0.5rem` macht die Standard-Elemente (Buttons, Inputs) kantiger.
    *   **Risiko:** Komponenten mit hartcodiertem `rounded-xl` (wie `Card`) oder `rounded-2xl` (in Seiten-Layouts) könnten im Kontrast zu den kantigeren Standard-Elementen unharmonisch wirken.
    *   **App-Modus-Seiten:** In `Soforthilfe.tsx` gibt es 6 Stellen mit `rounded-2xl`. In `Notfallkarte.tsx` keine. Diese runden Formen könnten mit dem neuen, kantigeren `--radius` kollidieren.
    *   **Empfehlung:** Nach der Änderung von `--radius` müssen insbesondere Cards und die Soforthilfe-Seite visuell geprüft werden. Ggf. müssen hartcodierte `rounded-xl`/`rounded-2xl` Klassen in den App-Modus-Seiten manuell angepasst werden, um Konsistenz zu wahren.

## 5. Editorial-Pattern-Inventar

*   **Home (`Home.tsx`):**
    *   **Hero:** Existiert (`<section className="home-hero-surface...">`). Muss restyled werden (Meta-Zeile, Italic-Hervorhebung, Lede-Absatz).
    *   **Story:** Existiert als Karussell (`<Erfahrungsberichte />`). Eine neue, zentrale, einzelne Story-Sektion muss additiv hinzugefügt werden.
    *   **Invitation:** Existiert aktuell nicht in der gewünschten Form. Muss neu gebaut werden.
*   **Verstehen (`Verstehen.tsx`):**
    *   **Hero:** Existiert (`<section className="py-12 md:py-20 bg-gradient-to-b from-sage-light/30 to-background wave-divider">`). Muss restyled werden.
*   **Genesung (`Genesung.tsx`):**
    *   **Hero:** Existiert (`<section className="py-10 md:py-14 bg-gradient-to-b from-sage-wash/60 to-background relative overflow-hidden">`). Muss restyled werden.
*   **Kommunizieren (`Kommunizieren.tsx`):**
    *   **Hero:** Existiert (`<section className="py-12 md:py-20 bg-gradient-to-b from-slate-light/30 to-background wave-divider">`). Muss restyled werden.
*   **Selbstfürsorge (`Selbstfuersorge.tsx`):**
    *   **Hero:** Existiert (`<section className="py-12 md:py-20 bg-gradient-to-b from-sage-lighter/30 to-background wave-divider">`). Muss restyled werden.

## 6. Naming-Konflikte

*   **`.kicker`:** Wird aktuell nicht als CSS-Klasse verwendet. Es existiert lediglich als Content-Feld in `handoutTextVersionContent.ts` (wie im Brief erwartet). **Kein Konflikt.**
*   **`.lede`:** Wird aktuell nicht als CSS-Klasse verwendet. **Kein Konflikt.**
*   **`.rule`:** Wird aktuell nicht als CSS-Klasse verwendet. **Kein Konflikt.**

## 7. Empfehlung

**Risikoarme Reihenfolge der Phase-1-Schritte:**

1.  **Branch erstellen:** Alle Änderungen sollten auf einem neuen Branch (z.B. `feature/editorial-design-phase1`) durchgeführt werden.
2.  **Schritt 1: Font-Migration (Geringes Risiko).** `@fontsource-variable/source-serif-4` installieren, in `main.tsx` importieren, `--font-heading` in `tailwind-theme.css` anpassen und CDN-Links/Fallback-CSS bereinigen.
3.  **Schritt 2: Background & Utilities (Geringes Risiko).** `--background` in `index.css` anpassen. Die neuen Utility-Klassen (`.kicker`, `.lede`, `.rule`) in `index.css` hinzufügen.
4.  **Schritt 3: Border-Radius (Mittleres Risiko).** `--radius` in `index.css` auf `0.5rem` reduzieren. Anschliessend lokaler visueller Check der shadcn-Komponenten und der App-Modus-Seiten (insb. `Soforthilfe.tsx` wegen `rounded-2xl`).

---

**Bereit für Phase 1?**

Hier sind drei konkrete erste Schritte, die freigegeben werden können:

1.  Neuen Branch `feature/editorial-design-phase1` erstellen.
2.  `@fontsource-variable/source-serif-4` installieren und DM Serif Display vollständig entfernen (inkl. CDN-Links).
3.  `--background` auf den wärmeren Cream-Ton ändern und die neuen Utility-Klassen (`.kicker`, `.lede`, `.rule`) in `index.css` einfügen.
