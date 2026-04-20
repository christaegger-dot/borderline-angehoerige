# Ressourcen-Management Audit (20.04.2026)

## Ziel

Audit der Laufzeit-Ressourcenverwaltung im Frontend/Server mit Fokus auf:

- Listener/Timer/Animation-Cleanup,
- unnötige Re-Render- und Scroll-Kosten,
- Bundle-/Code-Splitting-Indikatoren,
- Risikoabschätzung für CPU/Memory auf Mobile.

## Prüfumfang

- Statischer Code-Review in `client/src` und `server/index.ts`.
- Build-Lauf zur Größen- und Chunk-Orientierung.
- Testlauf zur Laufzeit-Warnungsprüfung.

## Durchgeführte Checks

1. `rg -n "setInterval|setTimeout|addEventListener|removeEventListener|IntersectionObserver|MutationObserver|ResizeObserver|requestAnimationFrame|cancelAnimationFrame|localStorage|sessionStorage|clearInterval|clearTimeout" client/src server/index.ts`
2. `pnpm build`
3. `pnpm test`

## Befunde

### 1) `useCountUp`: fehlende `requestAnimationFrame`-Cancellation beim Unmount (Mittel)

**Beleg:** `client/src/hooks/useCountUp.ts:73-85, 93`

- Der Hook startet `requestAnimationFrame(step)`, hält aber kein `rafId` und ruft beim Cleanup nur `observer.disconnect()`.
- Bei Unmount während laufender Animation kann `setDisplayValue(...)` noch auf einen bereits unmounteten Tree feuern (unnötige Arbeit, potenziell Warnungen in Debug-Szenarien).

**Empfehlung:**

- `rafId` in `useRef<number | null>` speichern.
- Im Cleanup `cancelAnimationFrame(rafId)` ausführen.
- Optional: `isMountedRef` Guard für zusätzliche Robustheit.

---

### 2) `Search`-Modal: Fokus-`setTimeout` ohne Cleanup (Niedrig)

**Beleg:** `client/src/components/Search.tsx:24-28`

- Beim Öffnen wird ein Timeout gesetzt, aber nicht gecleart.
- Bei schnellem Open/Close oder Routewechsel kann der Callback verspätet laufen.

**Empfehlung:**

- Timeout-ID speichern und im Effect-Cleanup `clearTimeout(...)` ausführen.

---

### 3) Inhaltsverzeichnis: doppelte Scroll-Listener + per-Scroll Layout-Messungen (Mittel)

**Beleg:** `client/src/components/UXEnhancements.tsx:240-277` und `:290-295`

- In `TableOfContents` laufen zwei Scroll-Listener parallel.
- Einer davon traversiert bei jedem Scroll-Event alle Headings und ruft `getBoundingClientRect()` auf.
- Das ist funktional korrekt, aber bei langen Seiten und schwachen Geräten potentiell kostenintensiv.

**Empfehlung:**

- Zusammenführung in einen Scroll-Handler oder zentralen Scroll-Store.
- Passive Listener bleiben gut; zusätzlich Throttling (`requestAnimationFrame`-Throttle) prüfen.
- Optional zurück auf `IntersectionObserver` für aktive Sektion, um Layout-Reads zu reduzieren.

---

### 4) Suchlogik: vollständiges Filtern/Sortieren bei jedem Keystroke ohne Debounce (Niedrig–Mittel)

**Beleg:** `client/src/components/Search.tsx:47-79`

- Für jede Eingabe wird `searchableContent` komplett gescannt und anschließend sortiert.
- Bei aktuellem Umfang vermutlich unkritisch, aber bei Wachstum der Indexmenge steigt CPU-Last linear.

**Empfehlung:**

- Debounce (z. B. 120–200 ms) einführen.
- Vor-normalisierten Suchtext cachen (`useMemo`) statt pro Item pro Keystroke neu zu joinen/lowercasen.

---

## Positive Befunde

1. **Konsequentes Code-Splitting über Route-Lazy-Loading**
   - `client/src/app/routes.ts:10-41` lädt Seiten lazy.
   - Ressourcenschonend für Initial Load.

2. **Event-Listener-Cleanup überwiegend sauber implementiert**
   - Beispielhaft in `Search`, `UXEnhancements`, `useComposition`, `useRessourcenMenuA11y` werden Listener/Timer i. d. R. entfernt bzw. gecleart.

3. **Build-Artefakte zeigen sinnvolle Chunk-Aufteilung**
   - Route-Chunks vorhanden; große Vendor-Chunks (`vendor-motion`, `vendor-utils`, `vendor-radix`) sind erwartbar für die verwendeten Bibliotheken.

## Priorisierte Maßnahmen (Backlog-Vorschlag)

1. **P1 (kurz):** `useCountUp` um `cancelAnimationFrame` ergänzen.
2. **P2 (kurz):** `Search` Fokus-Timeout cleanupen.
3. **P2 (mittel):** TOC-Scroll-Logik throttlen/vereinheitlichen.
4. **P3 (mittel):** Suchindex-Vorverarbeitung + Debounce.

## Kurzfazit

Das Projekt ist insgesamt solide im Ressourcen-Management (insb. Lazy Loading und Cleanup-Hygiene). Die Haupthebel liegen in kleinen, gezielten Verbesserungen bei Animation-Cleanup, Scroll-Workload und Such-CPU-Pfaden.
