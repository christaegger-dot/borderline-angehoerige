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

- **Optionale `/mythen`-Page mit dedizierter MarginNote**
  Eröffnet 2026-05-05 (im Cluster-4-Abschluss-Bericht). Status: neuer Scope, kein Restposten —
  Mythen-Inhalte sind bereits im Verstehen-Mythen-Block (8 Mythen) abgedeckt. Eine eigene
  Page wäre nur dann sinnvoll, wenn die Mythen-Botschaft prominenter eingestiegen werden soll
  (z.B. von Home oder Selbsttest-Result-Bucket «verstehen»).

- **Versions-Drift Static-HTML `/soforthilfe` vs. React-Materialien-Tiles**
  Eröffnet 2026-05-05 (bei Inventur des Soforthilfe-Backlog-Eintrags entdeckt).
  Beobachtung: Die App hat zwei Soforthilfe-Quellen — `client/public/soforthilfe/index.html`
  (Static, App-unabhängig) und Materialien-Filter «Soforthilfe» (React, 2 Tiles).
  Static-HTML linkt explizit `notfallplan-krise-v03.pdf` und `Notfallkarte-Zuerich-Psychische-Krise.pdf`.
  Materialien-Tiles linken auf dieselben Files. **Aktuell kein konkreter Drift bestätigt** —
  wenn aber zukünftig PDF-Versionen aktualisiert werden, müssen beide Quellen synchronisiert werden.
  Status: ungeprüft / latentes Risiko, kein Akut-Fix nötig.

- **Wegweiser-Ergebnis sofort sichtbar nach Klick** [Priorität HOCH, Aufwand klein]
  Eröffnet 2026-05-06 (Live-Audit). Nach Klick auf eine Situation (z.B. «Suiziddrohung») bleibt
  der Viewport auf der Situations-Liste — der Nutzer muss scrollen, um die Antwort zu sehen.
  In akuten Situationen kritisch. Code: `client/src/pages/Wegweiser.tsx` hat keinen
  `scrollIntoView`/`scrollTo`-Aufruf nach Auswahl. Fix: Auto-Scroll auf Ergebnis-Block
  analog zum `scrollToResults`-Pattern in `MaterialienLibrarySection.tsx`.

- **Selbsttest-Result mehr Substanz** [Priorität HOCH, Aufwand mittel]
  Eröffnet 2026-05-06 (Live-Audit). Result-Block in `Selbsttest.tsx` zeigt nur Title + 1 Satz
  Description + 1 Primary + 2-3 Secondary-Links. Keine Spiegelung des Antwort-Profils
  («Sie haben angegeben, dass …»). Fix: Result-Komponente um einen kontextuellen Einleitungssatz
  erweitern, der die Top-2-Weights des Users zurück-spiegelt, bevor die Empfehlungs-Links kommen.

- **FAQ Volltextsuche innerhalb der Page** [Priorität MITTEL, Aufwand mittel]
  Eröffnet 2026-05-06 (Live-Audit). FAQ hat 26 Fragen in 5 Kategorien, aber keinen
  In-Page-Filter. Wer «Kinder», «Einweisung» oder «Medikamente» sucht, muss alle Kategorien
  manuell durchgehen. Code: `FAQ.tsx` hat keinen `useState query`/`<input>`. Fix: schmales
  Filter-Eingabefeld am Page-Anfang, das Q&A-Texte client-seitig filtert (analog Materialien
  Filter-Tab-Pattern, aber als Volltext).

- **Selbstfürsorge-Sofort-Block am Anfang** [Priorität MITTEL, Aufwand mittel]
  Eröffnet 2026-05-06 (Live-Audit). Page beginnt mit Hero → Pull-Quote → konzeptueller Intro.
  Wer in akuter Erschöpfung kommt, braucht zuerst eine «Was-jetzt-sofort?»-Orientierung
  (3-4 Mini-Massnahmen) bevor Konzepte. Fix: Quick-Block-Sektion nach Hero, vor Pull-Quote,
  mit 3-4 Sofort-Übungen aus `SelbstfuersorgeExercisesSection`.

- **Beratung Kantons-Erwartung kalibrieren** [Priorität NIEDRIG, Aufwand klein]
  Eröffnet 2026-05-06 (Live-Audit). `Selbsthilfegruppen.tsx` (`/beratung`) listet primär
  Zürich-zentrische Angebote (PUK, VASK Zürich). Nutzer aus anderen Kantonen finden den
  «Selbsthilfe Schweiz»-Hinweis nur klein. Fix: prominenter Orientierungs-Satz oben auf
  der Page («Diese Angebote sind primär für Zürich — für andere Kantone empfehlen wir…»).

- **Glossar Deep-Link auf DSM-5-Kriterien** [Priorität NIEDRIG, Aufwand klein]
  Eröffnet 2026-05-06 (Live-Audit). Neuer `<details>`-Block für DSM-5-Kriterien im
  BPS-Eintrag (PR #418) ist standardmässig geschlossen. Bei Deep-Link `/glossar#bps-kriterien`
  oder ähnlich klappt der Block nicht automatisch auf. Fix: Hash-Listener in `Glossar.tsx`,
  der bei passendem Hash das `<details>`-Element via `setAttribute("open", "")` öffnet.

- **Breadcrumb-Label-Konsistenz** [Priorität NIEDRIG, Aufwand klein]
  Eröffnet 2026-05-06 (Live-Audit). Beobachtung: auf `/unterstuetzen/uebersicht` zeigt
  Breadcrumb «Grundlagen» statt «Übersicht» (Live-Site). Code: `Breadcrumbs.tsx` hat festes
  Label-Mapping; Inkonsistenz nicht direkt im Code sichtbar — Live-Test nötig zur
  Reproduktion. Fix: einheitliche Label-Sprache zwischen SubNav und Breadcrumb.

- **Ressourcen-Dropdown stärker akzentuieren** [Priorität NIEDRIG, Aufwand mittel]
  Eröffnet 2026-05-06 (Live-Audit). 14 Items in `resourceNavigationItems`, bereits in 3
  Gruppen kategorisiert (Sofortige Hilfe / Wissen & Materialien / Beratung & Netzwerke).
  User-Befund war «zu breit gefächert» — die Gruppierung existiert technisch, aber visuell
  evtl. nicht prominent genug. Fix: stärkere visuelle Trennung der Gruppen im Dropdown,
  oder schmalerer Hover-State, damit «Werkzeuge vs. Wissen» auf einen Blick klar ist.

- **Suche-Empty-State um Smart-Suggestions erweitern** [Priorität NIEDRIG, Aufwand mittel]
  Eröffnet 2026-05-06 (Live-Audit). `Search.tsx` Z. 319-328 zeigt bei `results.length === 0`
  bereits «Keine Ergebnisse für \"{query}\"» + «Versuchen Sie andere Suchbegriffe oder
  schauen Sie in der Navigation». Fehlt: Fuzzy-Match-Vorschlag («Haben Sie X gemeint?») oder
  direkter Hinweis auf den Situations-Wegweiser für Nutzer in akuter Lage. Fix: Levenshtein-
  basierter Suggestion bei 0 Treffern, plus Inline-Link auf `/wegweiser`.

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

## Backlog-Korrekturen 2026-05-05 / 06

Diese Punkte waren irrtümlich als offen geführt:

- **«Soforthilfe-Bibliothek-Inkonsistenz»** — bereits durch PR #413 erledigt (Counter-Korrektur via `showInLibrary`-Flag).
- **«Stream 2B»** — heute erledigt (PR #419), wurde im Tagesabschluss-Backlog versehentlich nochmal als offen gelistet.
- **«Item 4 Innenräume»** — heute erledigt (PR #420), wurde im Tagesabschluss-Backlog versehentlich nochmal als offen gelistet.
