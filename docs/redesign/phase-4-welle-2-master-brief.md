# Phase 4 Welle 2 — Tier-1-Migration (10 Pages)

> **Stand 27.04.2026 (nach Welle-2-Page-2):** Brief angepasst nach Welle-2-Erfahrung mit Kommunizieren (PR #287) und Grenzen (PR #288). Die Konvention bildet jetzt gelebte Praxis ab — Variante-B-Backup und Screenshot-URLs sind aus den Anforderungen gestrichen, beide wurden in der Praxis nie genutzt bzw. waren technisch nicht herstellbar. Siehe Schritt 3 und Verifikations-Block unten.

## Vorgeschichte

`Verstehen.tsx` wurde in Phase 4 Welle 1 als Referenz-Implementation migriert (PR #286, Squash 7e65e10). Diese Welle 2 rollt dasselbe Pattern auf zehn weitere Pages aus. Das migrierte `Verstehen.tsx` ist die kanonische Vorlage für alle folgenden Migrationen — bei Unklarheiten gilt: «mach es so wie in Verstehen.tsx».

## Reihenfolge (strikt einzuhalten)

1. Kommunizieren
2. Grenzen
3. Selbstfürsorge
4. Unterstützen-Übersicht
5. Unterstützen-Alltag
6. Unterstützen-Therapie
7. Unterstützen-Krise
8. Genesung
9. Fachstelle
10. Über uns

Eine Page nach der anderen. Pro Page: eigener Branch, eigener PR, STOP-Gate, Christas Freigabe, dann nächste.

## Branch- und PR-Konvention

- Branch-Pattern: `claude/editorial-tier1-<page-slug>` — z.B. `claude/editorial-tier1-kommunizieren`, `claude/editorial-tier1-unterstuetzen-krise`
- Auto-Merge ist durch das `claude/editorial-*`-Pattern unterdrückt; PRs warten auf manuelle Freigabe
- Pro PR genau eine Page-Datei (plus minimale Unterstützungsänderungen, falls zwingend nötig)

## Pro-Page-Migrationsschritte

Identisch zur Verstehen-Migration (siehe `client/src/pages/Verstehen.tsx` als Referenz):

1. **Layout umstellen.** Innerer Layout-Wrapper-Hauptteil zu `EditorialLayout width="narrow"`. `<Layout>` selbst bleibt für Header/Footer.

2. **Hero ersetzen.** Lösche bestehenden Hero (motion.div, Gradient, Icon-Box). Editorialer Hero mit:
   - Caps-Kicker mit dem aktuellen Eyebrow-Label
   - `<h1>` in Source Serif 4, weight 400, `--text-3xl` mobile / `--text-4xl` desktop
   - Lead in `--text-lg` / `--fg-secondary`
   - Lesezeit-Hinweis in `--text-sm` / `--fg-tertiary`, Format: `"Vollständig ca. X Min · Auch abschnittweise lesbar."`
   - **Kein** CTA-Button, **kein** Icon, **kein** Gradient-Background

3. **Intro-Card-Trio aufbrechen.** Die farbigen Intro-Karten (typischerweise als Konstante `<page>IntroCards` oder ähnlich) durch einen Fliesstext-Absatz ersetzen, der die Card-Inhalte prosaisch verbindet. Falls die Card-Inhalte sich inhaltlich nicht prosaisch tragen lassen (z.B. weil drei klar getrennte Konzepte gleichgewichtig nebeneinander stehen müssen): im PR-Body als alternativen Vorschlag mit kurzer Begründung dokumentieren — ungeordnete Liste mit fettem H4-Lead-In pro Punkt, ohne Karten-Wrapper, ohne Icons. Christa entscheidet im Review.

4. **Quick-Link-Karten ersetzen.** «Direkt einsteigen»-Block oder ähnliches: durch Inline-Link-Absatz ersetzen. Anchor-Klicks müssen `e.preventDefault()` plus `openSection()` aufrufen, damit das Akkordeon aufgeht (siehe Verstehen-Implementation als Referenz).

5. **ContentSection-Akkordeon anpassen.** Pro Vorkommen:
   - `icon`-Prop **entfernen**
   - Hintergrund auf `var(--bg-primary)`
   - Border-Radius auf `4px` oder `0`
   - Trennung über Hairline (`border-t` mit `--rule-color`)

6. **Inline-Karten zu Spalten-Fliesstext.** Box-Paare (z.B. «Was sichtbar / Was darunter liegt») zu zwei Spalten Fliesstext mit `<h4>`-Titeln, ohne Karten-Hintergrund. Mobile: gestackt.

7. **Pull-Quotes migrieren.** Alle `blockquote.pull-quote` zu `<EditorialPullQuote>`. Inhalt bleibt wörtlich.

8. **EvidenceNote entschärfen.** Hintergrund weg, Hairline oben/unten, Fliesstext-Stil. `sources`-Prop auf `<EditorialFootnotes>` umstellen, falls möglich.

9. **Buttons im Lesefluss zu Inline-Links.** `<Button asChild>`-mit-`<Link>`-Patterns durch `<Link>` mit `className="editorial-link"`. Ausnahme: Akkordeon-Aufklapp-Element bleibt.

10. **Motion-Wrapper entfernen.** Alle `motion.*`-Wrapper, deren einzige Funktion Fade-In oder Slide-In ist, ersatzlos. Behalten: funktionale Animationen.

11. **RelatedLinks am Seitenende.** Verwende `RelatedLinksEditorial` (in Welle 1 erstellt), nicht das alte `RelatedLinks`. Keine Karten-Optik mehr, sondern Liste mit Inline-Titel + Beschreibung, getrennt durch Hairlines.

## Was NICHT angefasst wird

Auf jeder Page strikt:

- Inhaltstext (kein Wort umformulieren, ausser Lesezeit-Hinweis und prosaische Verbindungssätze in Punkt 3)
- `TableOfContents`-Funktion
- Akkordeon-Open-Section-Custom-Event
- SEO-Meta, Schema.org-Markup
- Anchor-IDs der Sektionen
- Cross-Page-Links (sonst brechen sie auf den noch-nicht-migrierten Pages)

## Page-spezifische Sonderregeln

**Genesung.tsx (Page 8):** Diese Page erbt drei Statistiken (93% Remission, 50% Recovery, 10 Jahre Horizont), die in Welle 1 aus `Home.tsx` entfernt wurden, weil sie thematisch nach `/genesung` gehören. Prüfe:

1. Stehen die drei Statistiken bereits inhaltlich auf `/genesung`? Wenn ja: nichts zusätzlich tun, nur das normale Editorial-Treatment.
2. Wenn nein: integriere die Statistik-Inhalte (Werte, Quellen, Begleittext aus dem alten `AnimatedStat`-Markup auf Home) editorial in einen passenden Abschnitt — als Fliesstext mit hervorgehobenen Versalziffern, **nicht** als animierte Counter, **nicht** als Karten-Trio. Die Werte werden einmalig literal genannt, mit Quellenfussnoten via `EditorialFootnotes`.

`AnimatedStat`-Komponente bleibt im Repo bis Phase 7 (Cleanup). Sie wird auf Genesung **nicht** importiert.

**Fachstelle.tsx (Page 9):** Telefon- und E-Mail-Daten ausschliesslich aus `client/src/data/kontakte.ts` ziehen (`INFO_FACHSTELLE`, `EMAILS`-Konstante). Keine Hardcoding. Pattern wie in der Home-Sektion 6 «Beratungseinladung».

**Über uns.tsx (Page 10):** Falls die Page Team-Vorstellungen oder Bilder enthält — visuell entschärfen, aber Bilder dürfen bleiben (Editorial verträgt Bild). Bildern eine Caption in `--fg-tertiary` geben, falls bisher keine vorhanden.

## Verifikation pro Page

Vor PR-Erstellung:

- `pnpm typecheck` ohne Fehler
- `pnpm lint` ohne Fehler
- `pnpm test` alle bestehenden Tests grün
- `pnpm build` ohne Fehler
- Manueller Smoke-Test der Anchor-IDs: mindestens 3 Cross-Page-Links zur migrierten Page testen, alle müssen das Akkordeon aufklappen
- Inhalts-Diff: bestätige im PR-Body, dass kein Wort verloren ging

PR-Body soll enthalten:

- Diff-Statistik (Zeilen entfernt / hinzugefügt)
- Falls aus Schritt 3 nötig: alternativer Listen-Vorschlag mit kurzer Begründung
- Liste aller `motion.*`-Wrapper, die entfernt wurden
- Liste aller Buttons, die zu Inline-Links wurden
- Bei Genesung zusätzlich: Bestätigung, ob Statistiken bereits auf der Page waren (Punkt 1) oder neu integriert wurden (Punkt 2)
- Deploy-Preview-URL aus Netlify im PR-Body verlinken (`deploy-preview-NNN--borderline-angehoerige.netlify.app`)

## Mehrfach-Agent-Konvention

Falls Manus oder ein anderer Agent während des Review-Fensters Polish-Commits auf den Branch pusht (siehe Beispiel Phase 4 Welle 1: Anchor-Fix mit `openSection()`, EditorialTest-Cleanup):

1. Diese Polish-Commits bleiben drin, **nicht** rebasen oder verwerfen
2. Beim nächsten `git pull` von Claude Code: kurz im PR-Body kommentieren («Manus-Polish auf X gesehen, übernommen»), bevor STOP-Gate freigegeben wird
3. Falls ein Polish-Commit dem Brief widerspricht: Christa darauf aufmerksam machen, sie entscheidet

## STOP-Disziplin

Nach jedem PR: STOP. Nicht die nächste Page beginnen, bevor:

- der vorherige PR gemergt ist
- Christa explizit «nächste Page» oder «weiter mit <name>» sagt

Ausnahme: wenn Christa schreibt «alle 10 hintereinander, ich review am Schluss», dann ohne STOP-Gates durchziehen. Dieser Modus muss aber explizit angefordert werden — er ist nicht der Default.

## Reihenfolge-Erinnerung

Nach jedem Merge die nächste Page der Reihe nach. Bei Unsicherheit, welche dran ist, in `git log --oneline | grep editorial-tier1` schauen — die Page, die in `claude/editorial-tier1-<slug>` noch nicht vorkommt, ist die nächste.
