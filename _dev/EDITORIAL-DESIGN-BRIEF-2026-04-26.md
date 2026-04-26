# Editorial Design Brief – Borderline-Angehörige

**Datum:** 26. April 2026
**Scope:** Stufenweise Übernahme editorialer Design-Sprache aus dem Schwesterprojekt _PUK Bipolar Angehörige_ in das bestehende Borderline-Site-Design.
**Ziel:** «Editoriale Würde ohne Tool-UX-Bruch» – Borderline behält seine interaktive Struktur, übernimmt aber die Ruhe, Wärme und typografische Klarheit der Editorial-Quelle.

---

## 1. Strategischer Rahmen

### 1.1 Was übertragen wird

- Heading-Schrift, warmer Cream-Hintergrund, editoriale Utility-Patterns (Kicker, Lede, Rule), reduziertere Border-Radien, ausgewählte Sektions-Patterns (Hero, Story, Invitation) auf textlastigen Seiten.

### 1.2 Was NICHT übertragen wird (Non-Goals)

- **Module-Row als Hauptarchitektur** – PUK ist um sieben nummerierte Module organisiert. Borderline ist anders strukturiert (thematische Bereiche mit eigenen Tiefen). Pattern darf punktuell genutzt werden, aber nicht als Leitstruktur.
- **Triage-Flow** – Borderline hat bereits Wegweiser und Selbsttest mit eigener UX. Doppelung wäre verwirrend.
- **Tweaks-Panel mit vier Paletten** – war bei PUK ein Entwicklungs-Werkzeug für A/B, in Borderline irrelevant.
- **Body-Schrift-Wechsel auf Source Serif 4** – Borderline ist ein scannbares Werkzeug, nicht eine Lese-Begleitung. Inter bleibt Body. (Ausführliche Begründung im Chat-Verlauf vom 26. April 2026.)
- **Komplette Layout-Verschmälerung auf einspaltig 60 ch** – würde Selbsttest, Notfallkarte, Soforthilfe und Materialien-Library funktional zerstören.

### 1.3 Seiten-Scope

**Editorial-Modus erhalten** (textlastige, prosaische Seiten):

- `Home.tsx`
- `Verstehen.tsx`
- `Genesung.tsx`
- `Kommunizieren.tsx`
- `Selbstfuersorge.tsx`

**App-Modus bleibt unverändert** (interaktiv, Card-Grid-getrieben):

- `Soforthilfe.tsx`
- `Notfallkarte.tsx`
- `SelbsttestPage.tsx` & `Selbsttest.tsx`
- `UnterstuetzenKrise.tsx`, `UnterstuetzenAlltag.tsx`, `UnterstuetzenTherapie.tsx`, `UnterstuetzenUebersicht.tsx`
- `Wegweiser.tsx`
- `Materialien.tsx` & `MaterialienLibrarySection.tsx`

**Globale Token-Layer-Änderungen wirken überall** (Background, Headings, Border-Radien) – das ist gewollt; auch App-Modus-Seiten profitieren von wärmerem Cream und ruhigerer Typo.

---

## 2. Token-Änderungen (Stufe 1)

Datei: `client/src/styles/tailwind-theme.css` und `client/src/index.css`.

### 2.1 Background – moderat wärmer

| Token          | Aktuell                                     | Neu                                  | Begründung                                                         |
| -------------- | ------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| `--background` | `oklch(0.985 0.003 200)` (kühles Off-White) | `oklch(0.97 0.02 85)` (warmer Cream) | Klinik-Weiss → Wohnzimmer-Cream. Reversibel über einen Token-Wert. |

**Hinweis:** Der bestehende Token `--color-cream` (`oklch(0.98 0.01 85)`) bleibt unverändert. Cards behalten ihren cremig-weissen Ton (`--card`), wodurch die Tiefenhierarchie zum neuen Background-Wert weiterhin funktioniert.

### 2.2 Heading-Schrift – Source Serif 4 statt DM Serif Display

| Token            | Aktuell                                                           | Neu                                                           |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------------- |
| `--font-heading` | `"DM Serif Display", "DM Serif Display fallback", Georgia, serif` | `"Source Serif 4 Variable", "Source Serif 4", Georgia, serif` |

**Begründung:** DM Serif Display hat dekorativen Magazin-Display-Charakter mit hohem Kontrast. Bei einem stigma-belasteten Thema wirkt das zu modisch. Source Serif 4 ist ruhiger, ernsthafter, würdevoller – und als Variable Font flexibler.

**Implementation:**

1. `@fontsource-variable/source-serif-4` als Dependency hinzufügen.
2. Import in `main.tsx` oder `bootstrap`.
3. `--font-heading` wechseln.
4. DM-Serif-Display-Imports und Fallback-Datei entfernen, falls vorhanden.

### 2.3 Border-Radius – kantiger

PUK arbeitet mit `--radius-sm: 4px`, `--radius-md: 8px`. Borderline hat aktuell `--radius: 0.75rem` (12 px) als Basis. Editorial-Modus bevorzugt kantigere Formen.

| Token      | Aktuell           | Neu             | Wirkung auf                                                  |
| ---------- | ----------------- | --------------- | ------------------------------------------------------------ |
| `--radius` | `0.75rem` (12 px) | `0.5rem` (8 px) | Gesamte Radius-Skala (`-sm`/`-md`/`-lg`/`-xl`) wird kantiger |

**Achtung:** Diese Änderung wirkt auf _alle_ shadcn-Komponenten. Vor Commit visuell prüfen, ob Cards, Buttons, Tabs, Dialoge nicht zu hart wirken. Falls ja: nur `--radius-sm` und `--radius-md` reduzieren, `--radius-lg` und `--radius-xl` belassen.

### 2.4 Rule-Linie als neue Utility

Schmaler horizontaler Strich als Sektionsteiler – feines Editorial-Detail.

```css
.rule {
  height: 1px;
  background: var(--color-border, oklch(0.9 0.02 85));
  margin: 2rem 0;
}

.rule-narrow {
  width: 4rem;
}

.rule-center {
  margin-left: auto;
  margin-right: auto;
}
```

Verwendung: Trenner zwischen Hero und Hauptinhalt, zwischen Story und Tools-Teaser, vor Schluss-Sektionen.

---

## 3. Typografie-Hierarchie

### 3.1 Headings (h1–h4)

Die bestehenden shadcn/Tailwind-Klassen bleiben. Source Serif 4 wirkt sich automatisch via `--font-heading` aus.

**Zusätzliche Empfehlung – globaler Style auf h1, h2:**

```css
@layer base {
  h1,
  h2 {
    font-family: var(--font-heading);
    font-weight: 400; /* nicht bold – bei Source Serif 4 wirkt 400 schon stark */
    letter-spacing: -0.018em;
    text-wrap: balance;
  }

  h1 em,
  h2 em {
    font-style: italic;
    font-weight: 400;
    color: inherit; /* Italic ist die Hervorhebung – keine Farbänderung nötig */
  }
}
```

### 3.2 Neue Utility – `.kicker`

Mini-Header in Caps, vor h1/h2 als Eyebrow-Text.

```css
@layer components {
  .kicker {
    font-family: var(--font-body);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted-foreground);
    display: block;
    margin-bottom: 0.875rem;
  }
}
```

**Achtung Naming-Konflikt:** Das Wort «kicker» existiert in Borderline bereits als Content-Feld in `handoutTextVersionContent.ts` (Stringwert «Textversion»). Das ist ein semantisches Datenfeld, kein CSS – kein Konflikt, aber als Hinweis vermerkt.

### 3.3 Neue Utility – `.lede`

Italic, grosser Lead-Absatz direkt nach h1.

```css
@layer components {
  .lede {
    font-size: 1.32rem;
    line-height: 1.55;
    color: var(--muted-foreground);
    font-style: italic;
    max-width: 44ch;
    text-wrap: pretty;
  }
}
```

---

## 4. Komponenten-Patterns (Stufe 2)

### 4.1 Home-Hero (Restyling)

**Aktuell:** Hero existiert in `Home.tsx` mit Tailwind-Klassen, gradient-Background (`home-hero-surface`).

**Neu:**

- Meta-Zeile oben (Sans, klein): «Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich»
- h1 mit Italic-Hervorhebung des Schlüsselbegriffs (z. B. _Borderline-Persönlichkeitsstörung_)
- Lede-Absatz als Untertitel
- Primärer CTA als gefüllter Button, sekundärer CTA als Inline-Link mit Pfeil

**Beispiel-Struktur** (Pseudocode, anzupassen an Borderline-Komponenten):

```tsx
<header className="hero">
  <div className="hero-inner">
    <p className="hero-meta">
      Fachstelle Angehörigenarbeit
      <span aria-hidden="true"> · </span>
      Psychiatrische Universitätsklinik Zürich
    </p>
    <h1>
      Wenn jemand, den Sie lieben, eine{" "}
      <em>Borderline-Persönlichkeitsstörung</em> hat – und Sie selbst dabei oft
      vergessen werden.
    </h1>
    <p className="lede">
      Eine Begleitung für Partnerinnen, Eltern, Geschwister und erwachsene
      Kinder.
    </p>
    <div className="hero-actions">
      <Button asChild>
        <Link href="/wegweiser">Wo soll ich anfangen? →</Link>
      </Button>
      <Link href="/verstehen" className="hero-cta-secondary">
        Direkt zu «Verstehen»
      </Link>
    </div>
  </div>
</header>
```

**H1-Wording:** Nicht 1:1 von PUK kopieren, sondern auf Borderline anpassen. Die emotionale Ausrichtung («Sie selbst werden oft vergessen») trägt – das ist genau die Lücke, die Angehörigenarbeit füllt.

### 4.2 Story-Sektion

**Aktuell:** `Erfahrungsberichte.tsx` (Karussell mit mehreren Berichten).

**Neu, additiv:** _Eine_ zentrale Story-Sektion auf der Home-Seite – eine ruhige, einzelne, anonymisierte Erzählung mit grossem Pull-Quote. Bestehende Karussell-Komponente bleibt für andere Seiten verfügbar.

**Pflicht:** Anonymisierungs-Hinweis sichtbar («S., 39, Partnerin seit 11 Jahren – anonymisiert, keine reale Person»).

### 4.3 Invitation-Sektion

Ruhige Schluss-Sektion auf Home, evtl. auch auf textlastigen Seiten.

```tsx
<section className="invitation">
  <span className="kicker">Sie dürfen anrufen</span>
  <h2>Sie müssen nicht wissen, was Sie sagen wollen.</h2>
  <p>
    Die Fachstelle Angehörigenarbeit berät auch Sie – nicht nur die erkrankte
    Person.
  </p>
  <div className="invitation-contact">
    <a href="tel:+41583843800">058 384 38 00</a>
    <a href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a>
  </div>
</section>
```

### 4.4 Editorial-Lesebreite auf Prosa-Seiten

Auf den fünf editorial-modus-Seiten (siehe 1.3): Reine Textabschnitte (Fliesstext, Absätze ohne Cards) bekommen `max-width: 60ch` für den Lesefluss. _Nicht_ Cards, _nicht_ Tabellen, _nicht_ Materialien-Listen.

```css
.prose-editorial {
  max-width: 60ch;
}

.prose-editorial-narrow {
  max-width: 44ch;
}
```

---

## 5. Verifikations-Kriterien

Jede Stufe muss vor Merge folgendes erfüllen:

1. **WCAG-AA-Kontrast** – Charcoal-Text auf neuem Cream-Background, Terracotta- und Sage-Akzente auf Cream, alle interaktiven Elemente. Tools: axe-DevTools im Browser, manuell mit echtem iPhone-Safari (nicht nur Chromium – siehe Lessons learned aus BipolarSite-Audit).
2. **Mobile-Check** – iPhone Safari, kleines Android. Source Serif 4 muss bei 14–16 px gut lesbar sein.
3. **Visual-Diff alt/neu** – Screenshots mindestens von Home, Verstehen, Genesung, Notfallkarte (App-Modus-Kontroll-Seite), Soforthilfe (App-Modus-Kontroll-Seite).
4. **Test-Suite grün** – `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build` müssen alle erfolgreich sein.
5. **Konsistenz-Check** – Wirkt das Gesamtbild nun _kohärenter_ als vorher, oder fragmentiert? Ein-Wort-Urteil.

---

## 6. Quelle und Referenz

- Quell-Repo: `angehoerige-bipolar-puk-main` (siehe ZIP-Upload vom 26. April 2026 im Chat).
- Schlüssel-Dateien der Quelle für Detail-Lookups: `src/styles.css` (Tokens und Patterns), `src/home.jsx` (Sektionsstruktur), `src/app.jsx` (Theme-System).

---

## 7. Phasen-Plan

| Phase | Inhalt                                                                              | Status                                     |
| ----- | ----------------------------------------------------------------------------------- | ------------------------------------------ |
| **0** | Inventar + Mapping-Bericht (kein Code-Change)                                       | ✅ abgeschlossen (PR #258)                 |
| **1** | Token-Layer: Background, Heading-Schrift, Border-Radien, Kicker/Lede/Rule-Utilities | ✅ abgeschlossen (PRs #259–265)            |
| **2** | Komponenten-Patterns auf Home, Verstehen, Genesung, Kommunizieren, Selbstfürsorge   | ✅ abgeschlossen (PRs #266–269)            |
| **3** | Verifikation und Release                                                            | ✅ abgeschlossen (PR #270, 26. April 2026) |

---

## 8. Verifikations-Ergebnis (26. April 2026)

### WCAG-AA-Kontrast-Audit (14 Kombinationen)

| Kombination                             | Ratio | Schwelle | Status  |
| --------------------------------------- | ----- | -------- | ------- |
| Charcoal-Text auf Cream-BG              | 16.58 | 4.5      | ✅ PASS |
| Charcoal-Text auf Card-BG               | 17.32 | 4.5      | ✅ PASS |
| Muted-Text auf Cream-BG                 | 5.49  | 4.5      | ✅ PASS |
| Muted-Text auf Card-BG                  | 5.73  | 4.5      | ✅ PASS |
| Terracotta auf Cream-BG (Grosstext)     | 4.74  | 3.0      | ✅ PASS |
| Terracotta auf Card-BG (Grosstext)      | 4.96  | 3.0      | ✅ PASS |
| Terracotta-Mid auf Cream-BG (Grosstext) | 5.85  | 3.0      | ✅ PASS |
| Sage-Dark auf Cream-BG (Grosstext)      | 7.48  | 3.0      | ✅ PASS |
| Sage-Mid auf Cream-BG                   | 4.82  | 4.5      | ✅ PASS |
| Weiss auf Sage-Dark (Invitation-Button) | 8.16  | 4.5      | ✅ PASS |
| Weiss auf Terracotta (CTA-Button)       | 5.17  | 4.5      | ✅ PASS |
| Weiss auf Alert-Rot (Krise-Sektion)     | 6.03  | 4.5      | ✅ PASS |
| Charcoal auf Sage-Pale (Story-BG)       | 16.22 | 4.5      | ✅ PASS |
| Muted auf Sage-Pale (Story-BG)          | 5.37  | 4.5      | ✅ PASS |

**Gesamt: 14/14 PASS – vollständige WCAG-AA-Konformität bestätigt.**

### Visual-Diffs (Screenshots)

Full-Page-Screenshots aller 5 Editorial-Seiten + 2 App-Modus-Kontrollseiten erstellt und in `_dev/screenshots/` abgelegt:
`home.png`, `verstehen.png`, `genesung.png`, `kommunizieren.png`, `selbstfuersorge.png`, `soforthilfe.png`, `notfallkarte.png`

### Konsistenz-Urteil

**Kohärenter.** Die fünf Editorial-Seiten teilen jetzt ein einheitliches Heading-Pattern (Kicker → h1/h2 mit `<em>` → Rule → Lede), einheitliche Pull-Quotes, einheitliche Invitation-Sektionen und einheitliche Prosa-Breiten. App-Modus-Seiten (Soforthilfe, Notfallkarte) bleiben funktional unverändert und profitieren nur vom wärmeren Cream-Background und der ruhigeren Heading-Schrift.

### Test-Suite

- `pnpm typecheck`: ✅ 0 Fehler
- `pnpm lint`: ✅ 0 Fehler
- `pnpm test`: ✅ 90/90 Tests grün
- `pnpm build`: ✅ Erfolgreich
