# Archiviertes Stream-2B-Briefing

Status: **überholt / nicht als aktuelle Umsetzungsanweisung verwenden**

Dieses lokale Briefing dokumentiert einen Zwischenstand vom 5. Mai 2026. Die
endgültige Umsetzung wurde mit Commit `6ccda1c`
(`feat(stream-2b): krise-banner entschärft, dispatch-position auf abschluss`)
am 6. Mai 2026 abweichend festgelegt:

- Der zweite Krisenhinweis wurde in SOS-Amber gestaltet, nicht vollständig
  neutralisiert.
- Der Vertiefungsverteiler wurde als Abschluss-Verteiler hinter den
  Weiter-Hinweis verschoben, nicht zwischen Group C und Materialien.

Der aktuelle führende Projektstand folgt diesen späteren Entscheidungen.
Darunter steht der ursprüngliche, unveränderte Text ausschliesslich zur
Nachvollziehbarkeit.

---

## Ursprünglicher Text

---
Datum: 2026-05-05
Zweck: Implementierungs-Brief für Stream 2B — Krise-Banner-Doppelung + Übersicht-Dispatch-Position
Decisions: Punkt 1 = Variante A (Banner #2 entschärfen), Punkt 2 = Variante B (Dispatch ans Ende)
Scope: 2 Edits in 2 Dateien, keine neuen Komponenten
Tests: 178/178 müssen grün bleiben
PR-Titel: `feat(stream-2b): krise-banner entschärft, dispatch-position auf abschluss`
---

# Stream 2B — Implementierungs-Brief

## Decision-Recap

**Punkt 1 — Krise-Banner-Doppelung** → Variante A: Banner #2 entschärfen.
*Begründung: Alert-Code soll sparsam und exklusiv sein. Banner #1 (Notruf 144/143) ist echte Sofort-Aktion bei Lebensgefahr; Banner #2 ist eine edukative Verhaltens-Liste. Wenn beide rot sind, verliert rot Bedeutung.*

**Punkt 2 — Übersicht-Dispatch-Position** → Variante B: Dispatch ans Ende verschieben (zwischen Group C und Materialien).
*Begründung: Übersicht-Page hat eine eigene narrative Lesereise (Rolle → Ambivalenz → Tragfähigkeit). Schnellzugriff existiert bereits via `UnterstuetzenSubNav`. Dispatch wird zum Abschluss-Verteiler.*

---

## Edit 1 — `client/src/pages/UnterstuetzenKrise.tsx`

**Was:** Aside in ContentSection «Was Sie in der Krise vermeiden sollten» auf editorial-neutralen Stil reduzieren — Alert-Akzent (rot) entfernen, Header trägt die Funktion.

### Schritt 1.1 — Comment anpassen

**Suche:**
```tsx
          {/* ── ContentSection 4: vermeiden (sicherheitskritisch — Alert-Akzent bleibt) ── */}
```

**Ersetze durch:**
```tsx
          {/* ── ContentSection 4: vermeiden (editorial entschärft — Banner #1 bleibt einziger Alert-Pfad) ── */}
```

### Schritt 1.2 — Aside-Klassen reduzieren

**Suche:**
```tsx
            <aside className="mt-2 border border-alert/20 border-l-4 border-l-alert bg-alert/6 p-6">
```

**Ersetze durch:**
```tsx
            <aside
              className="mt-2 border-l-2 p-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
```

### Schritt 1.3 — List-Item-Symbole entschärfen

**Suche** (6× im Aside, alle Items haben das gleiche Pattern — `replace_all` möglich):
```tsx
                  <span className="text-alert" aria-hidden="true">
                    ✗
                  </span>
```

**Ersetze durch:**
```tsx
                  <span
                    aria-hidden="true"
                    style={{ color: "var(--fg-tertiary)" }}
                  >
                    ✗
                  </span>
```

**Hinweis:** Banner #1 (Z. 317, Sicherheits-Banner mit Notruf 144/143) bleibt komplett unverändert — das ist der einzige rote Pfad.

---

## Edit 2 — `client/src/pages/UnterstuetzenUebersicht.tsx`

**Was:** Dispatch-Sektion «Was möchten Sie vertiefen?» (aktuell #5, zwischen Group B und Group C) ans Ende der inhaltlichen Reise verschieben — neue Position zwischen Group C (#6) und Materialien (#7).

### Aktuelle Page-Sequenz

```
1. Hero (~Z. 62)
2. Intro (~Z. 132)
3. Group A — Rolle und Möglichkeit (~Z. 224)
4. Group B — Was es schwer macht (~Z. 306)
5. Dispatch  ← AKTUELLE POSITION (Z. 364–444)
6. Group C — Woran es tragfähig wird (~Z. 446–571)
7. Materialien (~Z. 573)
8. Pull-Quote (~Z. 694)
9. Weiter-Hinweis (~Z. 705)
```

### Soll-Sequenz

```
1. Hero
2. Intro
3. Group A
4. Group B
5. Group C        ← war #6, wird #5
6. Dispatch       ← war #5, wird #6 (verschoben)
7. Materialien
8. Pull-Quote
9. Weiter-Hinweis
```

### Implementation

**Schritt 2.1** — Den kompletten Dispatch-Block ausschneiden:

Suche den Block von Comment-Marker `{/* ── 5 Dispatch: Was möchten Sie vertiefen? ── */}` (~Z. 364) bis zum schliessenden `</EditorialSection>` (~Z. 444). Das ist genau eine `<EditorialSection variant="cream">`-Sektion mit MarginNote «Vertiefung», Eyebrow «Vertiefen», H2 «Was möchten Sie vertiefen?» und einer `<ul>`-Liste mit drei Sub-Page-Links (alltag / krise / therapie).

**Schritt 2.2** — Den Block einfügen zwischen Ende Group C und Materialien:

Direkt nach dem `</EditorialSection>` von Group C (~Z. 571), vor `{/* ── 7 Materialien ── ... */}` (~Z. 573).

**Schritt 2.3** — Comment-Nummern aktualisieren:

- `{/* ── 5 Dispatch: ... */}` → `{/* ── 6 Dispatch: Verteiler ans Ende verschoben (war #5) ── */}`
- `{/* ── 6 Group C: Woran es tragfähig wird ── ... */}` → `{/* ── 5 Group C: Woran es tragfähig wird ── ... */}`

(Die Sektionen #7–9 — Materialien / Pull-Quote / Weiter-Hinweis — behalten ihre Comment-Nummern, weil sie nach dem Dispatch ohnehin gleich bleiben.)

---

## Abnahme-Kriterien

- [ ] `npm run typecheck` clean
- [ ] `npm run lint` clean
- [ ] `npm run test -- --run` — 178/178 grün
- [ ] `/unterstuetzen/krise` — Banner #1 (Sicherheits-Notruf, rot, full-width) unverändert; Aside «Vermeiden»-Liste in editorial-neutralem Stil (kein `bg-alert`, kein `border-alert`, ✗-Symbole in `--fg-tertiary`)
- [ ] `/unterstuetzen/uebersicht` — Lesereise: Hero → Intro → Group A → Group B → Group C → **Dispatch** → Materialien → Pull-Quote → Weiter; Dispatch-Inhalt unverändert
- [ ] Visuelle Prüfung: Dispatch wirkt am Ende als logischer Abschluss-Verteiler, nicht als Lese-Bruch

## Was nicht im Scope

- Keine inhaltlichen Änderungen am Dispatch-Text (nur Position)
- Keine Änderungen an Banner #1 auf `/unterstuetzen/krise` (bleibt Sicherheits-Code)
- Keine Änderungen am ContentSection-Header «Was Sie in der Krise vermeiden sollten» (bleibt unverändert)
- Keine Strukturänderungen an `UnterstuetzenSubNav`
