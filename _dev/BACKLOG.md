---
Datum: 2026-05-05
Zweck: Living-Backlog für Streams, Items und Polish-Punkte
Konvention:
  - Jeder Eintrag bekommt einen Datums-Stempel beim Eröffnen
  - Beim Merge: Status auf «erledigt» mit PR-Nummer + Merge-Datum schieben (NICHT löschen)
  - Bei Verschiebung: «vertagt» mit Begründung
  - So bleibt die Geschichte rekonstruierbar und Doppel-Listings fallen auf
---

# Backlog — borderline-angehoerige

## Offen

### Beobachtungen (kein P0–P3 — neuer Scope)

- **Optionale `/mythen`-Page mit dedizierter MarginNote**
  Eröffnet 2026-05-05 (im Cluster-4-Abschluss-Bericht). Status: neuer Scope, kein Restposten —
  Mythen-Inhalte sind bereits im Verstehen-Mythen-Block (8 Mythen) abgedeckt. Eine eigene
  Page wäre nur dann sinnvoll, wenn die Mythen-Botschaft prominenter eingestiegen werden soll
  (z.B. von Home oder Selbsttest-Result-Bucket «verstehen»).

## Live-Audit 2026-05-06 — als unbegründet identifiziert

Diese Befunde wurden bei der Reality-Check-Verifikation als nicht-zutreffend gegenüber
dem aktuellen Code identifiziert und werden NICHT als offene Punkte geführt:

- **Notfallkarte 3 Buttons gleichwertig** — Code (`Notfallkarte.tsx:747-753`) zeigt
  tatsächlich nur **2** Buttons («Drucken / Als PDF» Primary + «Daten löschen» Secondary)
  mit klarer Hierarchie. «Persönlich ausfüllen» ist die Page selbst, kein Button.

- **Materialien-Tile keine Direktdownload-Option** —
  `MaterialienLibrarySection.tsx:151-160` rendert pro Tile bereits einen «Herunterladen»-Link
  mit `downloadHref` und `download=""`-Attribut, neben «Öffnen» und ggf. «Textversion lesen».

## Erledigt — 2026-05-05 / 06

- **Phase 3 Stream 2a — Materialien-Hub Migration**
  Editorial-Section-Migration der Materialien-Page + Filter-Tab-Konsolidierung NEU-Pattern.
  Erledigt durch PR #412 (commit 28633c2, gemerged 2026-05-05).

- **Stream 2C Item 1 — Bibliothek-Counts «Soforthilfe·0/Unterstützen·0»**
  Counter-Korrektur durch neues `showInLibrary`-Flag auf 3 Core-Tiles (Notfallkarte,
  Notfallplan, Rolle klären). Counts: Soforthilfe·2, Unterstützen·1.
  Erledigt durch PR #413 (gemerged 2026-05-05).

- **Stream 2C Item 3 — Suchoverlay Backdrop-Blur**
  Backdrop hinter Suchoverlay erhält `backdrop-blur-sm` (8px) + `bg-black/30` für visuelle
  Isolation des Such-Modus. Erledigt durch PR #413 (gemerged 2026-05-05).

- **Stream 2C Item 2 — Grenzen-Page Ladezeit-Flackern**
  Hero-Container auf 5 Pages (Grenzen / Selbstfürsorge / Genesung / Kommunizieren / Verstehen)
  von `min-h-[…]` auf `aspect-square` umgestellt. CLS-Score 0.0000 (3 Ladevorgänge verifiziert).
  Erledigt durch PR #414 (commit 2864574, gemerged 2026-05-05).

- **Krise-Disclaimer-Polish**
  Hairline + Sage-Akzent für visuelle Differenzierung. Erledigt durch PR #411
  (commit 2cc5f49, gemerged 2026-05-05).

- **Cluster 4 Sitzung 1 — Recovery-Zeit, Aguirre, Sprachregelung, Geschlecht**
  5 Edits: Genesung-Recovery-Zeit, Aguirre-Buchempfehlung, Home-Sprachregelung,
  Verstehen-Geschlecht-Satz, neues `_dev/STYLE-SPRACHREGELUNG.md`.
  Erledigt durch PR #416 (commit 67707bd, gemerged 2026-05-05).

- **Cluster 4 Sitzung 2 — Mythen-Ergänzung, DSM-5-Glossar, Selbsttest-Intensität**
  4 Edits: Verstehen Trauma-Mythos, Glossar BPS-Eintrag mit DSM-5-Kriterien-Aufklapp,
  Selbsttest Frage 3 von Dauer auf Intensität (4 Optionen).
  Erledigt durch PR #418 (commit d4848a5, gemerged 2026-05-05).

- **Stream 2B — Krise-Banner-Doppelung + Übersicht-Dispatch-Position**
  Vermeiden-Aside auf sos-amber-Tokens (Banner #1 bleibt einziger Alert-Pfad).
  Übersicht-Dispatch-Position von #5 auf #9 (zwischen Weiter-Hinweis und VERWANDT).
  Erledigt durch PR #419 (commit 6ccda1c, gemerged 2026-05-06).

- **Stream 2C Item 4 — Innenräume-Illustration v2**
  Variante B: Atmosphäre-Schichtung (Cream + Sage Haze + 7 Mikro-Partikel),
  Membran-Strichstärke variiert (Rückseite 2.2 / Berührungsseite 0.9), Permeabilitäts-Punkte
  differenziert (3 Größen, 7 Opazitätsstufen).
  Erledigt durch PR #420 (commit e920873, gemerged 2026-05-06).

- **Sprachregelung-Nachtrag — Begleiterkrankungen + Selbsthilfegruppen-Ausnahmen**
  3 Stellen in Begleiterkrankungen.tsx normalisiert (Z. 510, 514, 586).
  2 Stellen in Selbsthilfegruppen.tsx als Ausnahmen dokumentiert (Z. 204 Phrasenformel,
  Z. 339 historischer VASK-Verbandsname). Memo `STYLE-SPRACHREGELUNG.md` erweitert.
  Erledigt durch PR #421 (commit d5ec60c, gemerged 2026-05-06).

- **P0 — Wegweiser-Ergebnis sofort sichtbar nach Klick**
  `useRef` + `scrollIntoView` im `navigate`/`goBack`-Callback in `SituationsWegweiser.tsx`,
  wrapper-Div mit `scroll-mt-24 md:scroll-mt-28` Header-Offset. Auto-Scroll greift bei
  jedem Choice-Click, auch beim Zurücknavigieren.
  Erledigt durch PR #425 (commit e90ab63, gemerged 2026-05-06).

- **P1 — Selbsttest-Result Antwort-Profil-Spiegelung**
  Neue Helper-Map `intensityReflections` in `Selbsttest.tsx` mit 4 Phrasen
  (limit / hoch / mittel / niedrig). Im Render zwischen H2-Title und description ein
  optional kursiver Spiegel-Satz; Override bei `answers[1]==="akut"` mit Krisen-Spezialphrase.
  Erledigt durch PR #425 (commit e90ab63, gemerged 2026-05-06).

- **P2 — FAQ Volltextsuche innerhalb der Page**
  Suchfeld am Page-Anfang von `FAQ.tsx`, client-seitiger Filter auf Frage-Text, Antwort
  und Bullets. ContentSections automatisch geöffnet bei aktivem Filter via key-change +
  `defaultOpen={!!query.trim()}`. Empty-State mit Link auf Fachstelle.
  Erledigt durch PR #426 (commit c7df7b4, gemerged 2026-05-06).

- **P2 — Selbstfürsorge-Sofort-Block am Anfang**
  Neue Sektion #2 in `Selbstfuersorge.tsx` zwischen Hero und Pull-Quote mit MarginNote
  «JETZT SOFORT». Drei Quick-Items (Atmen / 5-4-3-2-1 Grounding / STOPP) mit Anker-Links
  auf den vollen Übungs-Block (`#sofort-uebungen`). Sektions-Nummerierung darunter +1.
  Erledigt durch PR #426 (commit c7df7b4, gemerged 2026-05-06).

- **P3 — Breadcrumb-Label-Konsistenz**
  `pageNames`-Mapping in `Breadcrumbs.tsx` und `UXEnhancements.tsx`:
  `/unterstuetzen/uebersicht` von «Grundlagen» auf «Übersicht» normalisiert. Konsistent
  mit `UnterstuetzenSubNav`-Label und Page-H1.
  Erledigt durch PR #427 (commit 81c9509, gemerged 2026-05-06).

- **P3 — Glossar Deep-Link auf DSM-5-Kriterien**
  `<details id="dsm-5-kriterien">` in `Glossar.tsx`. Neuer `useEffect` mit `hashchange`-
  Listener öffnet das Element via `(el as HTMLDetailsElement).open = true`, wenn der Hash
  auf eine details-id matcht. Pattern generisch für zukünftige `<details id=*>`.
  Erledigt durch PR #427 (commit 81c9509, gemerged 2026-05-06).

- **P3 — Beratung Kantons-Erwartung kalibrieren**
  Hero auf `/beratung` (= `Selbsthilfegruppen.tsx`) ergänzt um Regional-Hinweis nach der
  Lede mit externem Link auf Selbsthilfe Schweiz (`target="_blank"`,
  `rel="noopener noreferrer"`).
  Erledigt durch PR #427 (commit 81c9509, gemerged 2026-05-06).

- **P3 — Suche Smart-Suggestions bei 0 Treffern**
  Levenshtein-Distance-Funktion in `Search.tsx` gegen `normalizedTitle` aller Index-Entries.
  Threshold = `max(2, length/3)`. Bis zu 3 «Haben Sie das gemeint?»-Vorschläge bei Match;
  bei keinem Match Inline-Link auf `/wegweiser` für akute Lagen.
  Erledigt durch PR #427 (commit 81c9509, gemerged 2026-05-06).

- **P3 — Ressourcen-Dropdown stärker akzentuieren**
  `RessourcenMenu.tsx`: Group-Header mit `border-b border-border/30` + `mb-1` für
  visuelle Trennung; Group-Header-Text in `var(--fg-primary)` + tracking `0.1em`;
  Spalten-Trenner von `border-border/40` auf `border-border/60` für mehr Kontrast.
  Erledigt durch PR #427 (commit 81c9509, gemerged 2026-05-06).

- **Versions-Drift Soforthilfe-Quellen — Sync-Test-Mitigation**
  `client/src/__tests__/soforthilfe-sync.test.ts`: bidirektionaler Set-Vergleich der
  PDF/HTML-Pfade zwischen `client/public/soforthilfe/index.html` und Materialien-Tiles
  mit `category="soforthilfe"`. Aktuell synchron (3 Pfade); Test schlägt bei künftigem
  Drift fehl. Mitigiert das im Backlog dokumentierte latente Risiko ohne invasives
  Refactoring.
  Erledigt durch PR #428 (commit b1795fe, gemerged 2026-05-06).

## Backlog-Korrekturen 2026-05-05 / 06

Diese Punkte waren irrtümlich als offen geführt:

- **«Soforthilfe-Bibliothek-Inkonsistenz»** — bereits durch PR #413 erledigt (Counter-Korrektur via `showInLibrary`-Flag).
- **«Stream 2B»** — heute erledigt (PR #419), wurde im Tagesabschluss-Backlog versehentlich nochmal als offen gelistet.
- **«Item 4 Innenräume»** — heute erledigt (PR #420), wurde im Tagesabschluss-Backlog versehentlich nochmal als offen gelistet.
