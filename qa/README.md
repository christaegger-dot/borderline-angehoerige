# Codex Audit Setup

Dieses Verzeichnis hält die repo-spezifische Audit-Arbeitsweise für
`borderline-angehoerige`.

## Grundregeln

- Audits laufen nie im bestehenden dirty Haupt-Worktree.
- Vor jedem Audit wird ein frischer Temp-Worktree von `origin/main` angelegt.
- Phase 1 und Phase 2 bleiben read-only fuer Produktcode.
- Audit-Artefakte duerfen in `qa/` und `qa/scripts/` entstehen.
- Die Standard-Verifikation fuer dieses Repo ist:
  - `pnpm test`
  - `pnpm check`
  - `pnpm build`
  - `pnpm lint`

## Empfohlene Reihenfolge

1. `sicherheit`
2. `a11y-interaktion`
3. `performance`
4. `content-sprache`
5. `seo-ia`
6. `modul-dramaturgie`
7. `css-hygiene`
8. `pdf-materialien`
9. `test-qualitaet`
10. `release-readiness`

## Content-Zielgruppe

Fuer den Content-Audit gilt explizit:

`Angehoerige von Menschen mit Borderline-Persoenlichkeitsstoerung in der Schweiz`

## Nutzung

- Repo-spezifische Prompt-Sammlung: [codex-audit-prompts.md](./codex-audit-prompts.md)
- Vollstaendiger Repo-Plan: [audit-plan.md](./audit-plan.md)
- Infografik-Inventar und Asset-Workflow:
  [../docs/infografik-workflow.md](../docs/infografik-workflow.md)
- Release-Matrix fuer echte Geraete-/Browser-Tests:
  [release-browser-matrix.md](./release-browser-matrix.md)
- Audit-Worktree-Helfer: [`_dev/create-audit-worktree.sh`](../_dev/create-audit-worktree.sh)

## Abgedeckte Audit-Spuren

Bereits dokumentierte oder vorbereitete Audit-Spuren:

- Sicherheit / Deployment
- Accessibility / Interaktion
- Performance / Bundle-Hygiene
- Content / Sprache
- SEO / IA
- Modul- / Dramaturgie-Logik
- CSS / Design-Token / UX-Konsistenz
- PDF / Materialien
- Test- / Qualitaetsnetz
- Release-Readiness

Beispiel:

```sh
_dev/create-audit-worktree.sh sicherheit
_dev/create-audit-worktree.sh a11y-interaktion
```

Der Helper kopiert `qa/README.md` und `qa/codex-audit-prompts.md` in jeden
neu angelegten Audit-Worktree, damit jeder Audit-Lauf fuer sich
selbstbeschreibend bleibt.

## Asset-Inventar (`qa/scripts/audit-infografik-inventory.ts`)

Das Repo fuehrt den produktiven Infografik-Bestand ueber die echten Content-
Referenzen in `client/src/content/**`. Der Snapshot wird so aktualisiert:

```sh
pnpm audit:infografiken
```

Der Lauf:

- prueft, dass jede referenzierte Datei unter `client/public/infografiken`
  wirklich existiert
- aktualisiert [infografik-inventory.json](./infografik-inventory.json)
- trennt aktive Produktdateien, Support-Dateien und unreferenzierte Kandidaten

## Browser-Matrix (`qa/scripts/release-browser-matrix.mjs`)

Der aktuelle Release-Lauf gegen Production wird so geschrieben:

```sh
pnpm audit:browser-matrix
```

Der Lauf:

- aktualisiert [release-browser-matrix.json](./release-browser-matrix.json)
- schreibt den letzten dokumentierten Matrix-Stand nach
  [release-browser-matrix.md](./release-browser-matrix.md)
- markiert ehrlich, welche Browser hier technisch geprueft wurden und welche
  ohne zusaetzliche Software oder echte Geraete offen bleiben

## A11y-Skripte (`qa/scripts/*.mjs`)

Voraussetzungen: `pnpm install` (zieht `playwright` + `@axe-core/playwright`)
und ein laufender Vite-Preview-Server:

```sh
pnpm build && pnpm preview --host 127.0.0.1 --port 4173 &
node qa/scripts/axe-routes.mjs
node qa/scripts/click-reachability.mjs
node qa/scripts/interaction-overlap.mjs
node qa/scripts/page-structure.mjs
node qa/scripts/z-stack.mjs
```

Override mit `AUDIT_BASE_URL` fuer Audits gegen Live-Site oder anderen
Server. Auf macOS nutzen die Skripte System-Chrome
(`/Applications/Google Chrome.app/...`); auf Linux/CI:
`PLAYWRIGHT_EXECUTABLE_PATH` oder `playwright install chromium`.

**`/soforthilfe`-Sonderfall:** Die Page ist Static-HTML, nicht React-SPA.
Der lokale Vite-Dev-/Preview-Server emuliert repo-intern den Direktzugriff
auf `/soforthilfe` fuer Smoke- und Navigationschecks. Fuer ehrliche
a11y-Audits dieser Page trotzdem immer gegen Production testen:

```sh
AUDIT_BASE_URL=https://borderline-angehoerige.netlify.app \
  node qa/scripts/axe-routes.mjs
```

Details siehe [audit-a11y-interaktion.md](./audit-a11y-interaktion.md)
Abschnitt «Reaktivierung 2026-04-28».
