# Phase 9.3 — Asymmetrie-Diagnose

## Ergebnis Schritt 1: Drei Viewport-Screenshots

Die Screenshots mit DevTools-Ruler (rote Linie = Viewport-Mitte) liegen im Ordner `outputs/phase-9-3-diagnose/`:

- `verstehen-1280x800-ruler.png`
- `verstehen-1600x900-ruler.png`
- `verstehen-2000x1200-ruler.png`

## Ergebnis Schritt 2: Computed-Styles-Kette Verstehen

### Viewport 1280x800

| Element                       | left | right | width | padding-left | padding-right | margin-left | margin-right | max-width | position |
| ----------------------------- | ---- | ----- | ----- | ------------ | ------------- | ----------- | ------------ | --------- | -------- |
| `body`                        | 0    | 1280  | 1280  | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `main#main-content`           | 0    | 1280  | 1280  | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `div` (EditorialLayout-outer) | 0    | 1280  | 1280  | 40px         | 40px          | 0px         | 0px          | none      | static   |
| `div` (EditorialLayout-inner) | 336  | 944   | 608   | 0px          | 0px           | 296px       | 296px        | 608px     | static   |
| `header`                      | 336  | 944   | 608   | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `h1`                          | 336  | 944   | 608   | 0px          | 0px           | 0px         | 0px          | none      | static   |

### Viewport 1600x900

| Element                       | left | right | width | padding-left | padding-right | margin-left | margin-right | max-width | position |
| ----------------------------- | ---- | ----- | ----- | ------------ | ------------- | ----------- | ------------ | --------- | -------- |
| `body`                        | 0    | 1600  | 1600  | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `main#main-content`           | 0    | 1600  | 1600  | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `div` (EditorialLayout-outer) | 0    | 1600  | 1600  | 40px         | 40px          | 0px         | 0px          | none      | static   |
| `div` (EditorialLayout-inner) | 496  | 1104  | 608   | 0px          | 0px           | 456px       | 456px        | 608px     | static   |
| `header`                      | 496  | 1104  | 608   | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `h1`                          | 496  | 1104  | 608   | 0px          | 0px           | 0px         | 0px          | none      | static   |

### Viewport 2000x1200

| Element                       | left | right | width | padding-left | padding-right | margin-left | margin-right | max-width | position |
| ----------------------------- | ---- | ----- | ----- | ------------ | ------------- | ----------- | ------------ | --------- | -------- |
| `body`                        | 0    | 2000  | 2000  | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `main#main-content`           | 0    | 2000  | 2000  | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `div` (EditorialLayout-outer) | 0    | 2000  | 2000  | 40px         | 40px          | 0px         | 0px          | none      | static   |
| `div` (EditorialLayout-inner) | 696  | 1304  | 608   | 0px          | 0px           | 656px       | 656px        | 608px     | static   |
| `header`                      | 696  | 1304  | 608   | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `h1`                          | 696  | 1304  | 608   | 0px          | 0px           | 0px         | 0px          | none      | static   |

## Ergebnis Schritt 3: Computed-Styles-Kette Home

### Viewport 1280x800

| Element                       | left | right | width | padding-left | padding-right | margin-left | margin-right | max-width | position |
| ----------------------------- | ---- | ----- | ----- | ------------ | ------------- | ----------- | ------------ | --------- | -------- |
| `body`                        | 0    | 1280  | 1280  | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `main#main-content`           | 0    | 1280  | 1280  | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `div` (EditorialLayout-outer) | 0    | 1280  | 1280  | 40px         | 40px          | 0px         | 0px          | none      | static   |
| `div` (EditorialLayout-inner) | 336  | 944   | 608   | 0px          | 0px           | 296px       | 296px        | 608px     | static   |
| `header`                      | 336  | 944   | 608   | 0px          | 0px           | 0px         | 0px          | none      | static   |
| `p`                           | 336  | 944   | 608   | 0px          | 0px           | 0px         | 0px          | none      | static   |

## Ergebnis Schritt 4: Sticky-Elemente

**Verstehen (1280px):**

- `header` (Navbar): `sticky`, left=0, right=1280, width=1280
- `div` (TOC-Sidebar): `fixed`, left=0, right=0, width=0 (unsichtbar durch `hidden`)

**Home (1280px):**

- `header` (Navbar): `sticky`, left=0, right=1280, width=1280

**Verstehen (2000px):**

- `header` (Navbar): `sticky`, left=0, right=2000, width=2000
- `div` (TOC-Sidebar): `fixed`, left=96, right=336, width=240

## Asymmetrie-Ursache

Der Inhalt ist auf allen Viewports mathematisch exakt zentriert (z.B. auf 2000px: `left=696`, `right=1304` → Mitte bei `1000px`), aber die ab 1800px sichtbare, `fixed` positionierte TOC-Sidebar füllt den linken Leerraum (`left=96` bis `right=336`), wodurch eine optische Illusion entsteht, die den Inhalt als nach rechts verschoben erscheinen lässt.

## Empfohlene Fix-Strategie

Da es sich um keinen technischen Layout-Bug handelt (der Inhalt ist zentriert), sondern um ein Design-Problem (die Sidebar füllt nur den linken Rand, der rechte bleibt leer), gibt es zwei Lösungsansätze:

1. **Sidebar näher an den Inhalt rücken:**
   In `client/src/components/UXEnhancements.tsx` (Zeile 422) die Formel anpassen, sodass die Sidebar nicht am linken Viewport-Rand klebt, sondern einen festen Abstand zum zentrierten Inhalt hat.
   _Vorher:_ `left-[max(0.75rem,calc((100vw-1280px)/2-15rem-1.5rem))]`
   _Nachher:_ `left-[calc(50vw-304px-15rem-2rem)]` (50vw = Mitte, -304px = halbe Inhaltsbreite, -15rem = Sidebar-Breite, -2rem = Abstand)

2. **Asymmetrie als Design-Entscheidung akzeptieren:**
   Da die Sidebar `fixed` ist und den Lesefluss nicht stört, kann die optische Asymmetrie auf sehr großen Bildschirmen (>1800px) als akzeptables Verhalten für ein Editorial-Layout gewertet werden.
