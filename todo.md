# Interaktivitäts Quick-Wins

## Quick-Win 1: Animierte Statistik-Zähler (Homepage)

- [ ] CountUp-Hook erstellen (useCountUp) mit IntersectionObserver
- [ ] In Home.tsx die Statistik-Sektion (85-93%, 50%, 10 J.) mit animierten Zählern versehen
- [ ] Nur beim ersten Sichtbarwerden animieren (einmalig)

## Quick-Win 2: Aufklappbare Abschnitte

- [ ] Verstehen.tsx: Hauptabschnitte in Akkordeons verpacken
- [ ] Kommunizieren.tsx: Hauptabschnitte in Akkordeons verpacken
- [ ] Grenzen.tsx: Hauptabschnitte in Akkordeons verpacken
- [ ] Ersten Abschnitt standardmässig offen lassen

## Quick-Win 3: Testimonials als Karussell (Homepage)

- [ ] Erfahrungsberichte.tsx zu Karussell umbauen
- [ ] Auto-Rotation (z.B. alle 8 Sekunden)
- [ ] Manuelle Navigation (Pfeile + Dots)
- [ ] Pause bei Hover

---

## useCountUp – Refactor auf framer-motion useInView

**Stand:** 27. April 2026, identifiziert beim Race-Condition-Fix (PR #282).

Der manuell aufgebaute IntersectionObserver in `useCountUp` könnte durch
framer-motion's `useInView`-Hook ersetzt werden. Spart ~40 Zeilen, nutzt
bereits installierte Library, robusteres Sichtbarkeits-Tracking.

**Warum nicht jetzt:** Scope-Trennung — Bug-Fix darf nicht zum Refactor werden.

**Bei Implementation zu beachten:**

- Verifikations-Scope: nur 1 Konsumer (`AnimatedStat`), 3 Render-Stellen auf `Home.tsx` (Sektion "Was Forschung und Praxis zeigen") — Risiko-Oberfläche ist klein
- Edge-Case Anchor-Direkt-Link (Element initial im Viewport)
- SSR-Kompatibilität prüfen, falls relevant
