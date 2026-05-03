# Workflow — Home-Redesign Phase 1 ans Repo übergeben

Diese Anleitung führt dich von «Mockup ist abgenommen» bis «Claude Code
beginnt mit der Arbeit». Etwa 10 Minuten Arbeit für dich.

## Überblick

```
1. Workflow-Paket ins Repo entpacken                 (≈2 Min)
2. Commit + Push auf einen Branch                    (≈1 Min)
3. Claude Code starten und den Prompt geben          (≈1 Min Setup, dann läuft es)
4. STOP-Gates abhaken nach jedem Schritt             (≈ während Claude Code arbeitet)
5. Final-PR mergen                                   (≈ nach Abnahme)
```

## Schritt 1 — Workflow-Paket ins Repo entpacken

Das ZIP `home-redesign-phase1-workflow.zip` enthält ein `docs/`-Verzeichnis,
das sich in deine bestehende Struktur einfügt (du hast bereits
`docs/redesign/` mit `editorial-design-inventur.md` etc.).

```bash
cd ~/path/to/borderline-angehoerige
unzip ~/Downloads/home-redesign-phase1-workflow.zip
```

Resultat:

```
docs/redesign/
  home-redesign-pain-points.md          ← Diagnose, persistent im Repo
  home-redesign-bildsprache.md          ← Drei-Schichten-Doktrin
  home-redesign-implementierung.md      ← Der Prompt für Claude Code
  home-redesign-mockup/
    01-hero-fold-desktop.png            ← Visueller Referenz-Screenshots
    02-aubergine-block.png
    03-header-detail.png
    04-vollseite.png
    mockup-variant-b.html               ← Lauffähiger Mockup (lokal öffnen)
    mockup-img/                         ← Thumbnails für den HTML-Mockup
```

## Schritt 2 — Commit auf separaten Branch

Wir wollen die Doku-Dateien als eigenständigen Commit, nicht vermischt
mit der späteren Implementierung. Das macht später den Code-Review
sauber.

```bash
git checkout -b docs/home-redesign-phase1-context
git add docs/redesign/home-redesign-*
git commit -m "docs(redesign): Phase 1 context — pain-points, Bildsprache, Mockup-Referenz"
git push -u origin docs/home-redesign-phase1-context
```

Du kannst den Branch entweder direkt mergen lassen (durch deinen
`claude/**`-Workflow oder manuell) oder als offenen PR stehen lassen,
während Claude Code parallel auf einem `claude/...`-Branch arbeitet.

**Empfehlung:** Erst diesen Doku-Branch mergen, **bevor** Claude Code
startet. So liest Claude Code immer aus `main` und hat den vollen
Kontext.

## Schritt 3 — Claude Code starten

Du nutzt das Pattern bereits — der Befehl ist im Wesentlichen wie bei
deinen vorherigen Sessions (Notfallkarte, Audit-Sprints).

### Option A: Claude Code im Terminal

```bash
cd ~/path/to/borderline-angehoerige
claude
```

Sobald der Prompt erscheint, gib Folgendes ein:

```
Bitte lies zuerst:
- CLAUDE.md
- docs/redesign/home-redesign-pain-points.md
- docs/redesign/home-redesign-bildsprache.md
- docs/redesign/home-redesign-implementierung.md

Implementiere dann Phase 1 — Editorial Redesign Home + Header
(Variante B) gemäss `home-redesign-implementierung.md`. Beginne mit
Schritt 1 (Tokens und Header) und stoppe am STOP-Gate 1 für meine
Freigabe.
```

### Option B: Claude Code im VS Code

Öffne das Repo in VS Code mit der Claude-Code-Extension, dann gib im
Chat-Fenster den gleichen Prompt wie oben ein.

### Option C: Claude Code für Slack

Falls du das Claude-Code-für-Slack-Setup nutzt, kannst du dort auf
denselben Repo verweisen. Gleicher Prompt.

## Schritt 4 — STOP-Gates abhaken

Der Prompt definiert **sechs STOP-Gates**. Nach jedem Gate stoppt Claude
Code, pusht den Branch, und wartet auf deine Freigabe. Du prüfst:

- Auf Netlify (Preview-Deploy für den Branch)
- Auf der Branch-Vorschau in GitHub
- Im lokalen `pnpm dev`

Dann sagst du Claude Code: «Sieht gut aus, weiter mit Schritt N» — oder
«Bitte Folgendes anpassen, bevor du weitermachst…».

Die Gates sind:

1. Tokens und Header
2. Hero-Komponente und Leuchtturm-Illustration
3. EditorialColorBlock und Aubergine-Sektion
4. VisualOrientationGrid
5. Testimonial-Sektion und Ornament-Komponente
6. Konsolidierung und Tests

## Schritt 5 — Final-Akzeptanz und Merge

Vor dem finalen Merge in `main` prüfst du die sechs Pain-Points
nochmal explizit (Liste am Ende von `home-redesign-implementierung.md`).
Wenn alle abgehakt sind, mergst du den `claude/editorial-home-phase1-...`
Branch in `main`.

## Hinweise

### Was Claude Code automatisch hat

Sobald der Branch erstellt ist, hat Claude Code Zugriff auf:

- Die 33 Infografiken in `client/public/infografiken/`
- Die 3 React-Visualisierungen in `client/src/components/visualizations/`
- Die 6 interaktiven Tools in `client/src/components/interactive/`
- Die Content-Listen in `client/src/content/`
- Die Tokens in `client/src/index.css`
- Die Test-Setups in `client/src/__tests__/`

Du musst nichts davon explizit hochladen oder verlinken.

### Was Claude Code aus den Doku-Dateien lernt

- Die Diagnose (warum es nicht ansprechend ist)
- Die drei Bildsprache-Schichten und die Wahl Variante B
- Den visuellen Referenz-Mockup (Screenshots + lauffähiges HTML)
- Den Phase-1-Prompt mit STOP-Gates und Akzeptanzkriterien

### Wenn Claude Code etwas falsch macht

Du kannst ihm jederzeit sagen:

- «Bitte zurück zu Schritt N und nochmal so umsetzen, dass …»
- «Halt, das verletzt Pain-Point 4 — Aubergine ist hier wieder
  unsichtbar geworden.»
- «Schau dir nochmal `02-aubergine-block.png` an — die Lede-Texte
  müssen Cream auf Aubergine sein, nicht dunkel.»

Claude Code respektiert diese Korrekturen, ohne neuen Schaden anzurichten,
weil die Pain-Points-Datei und der Mockup persistent im Repo liegen.

### Phase 2 später

Phase 2 (Photographie ergänzen, Pattern auf Tier-1-Pages tragen) wird
ein separater Prompt mit eigenem Workflow-Paket. Phase 1 ist so gebaut,
dass Phase 2 nichts umbauen muss — nur ergänzen.
