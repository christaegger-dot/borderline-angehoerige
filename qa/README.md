# Codex Audit Setup

Dieses Verzeichnis hält die repo-spezifische Audit-Arbeitsweise für
`borderline-angehoerige`.

## Grundregeln

- Audits laufen nie im bestehenden dirty Haupt-Worktree.
- Vor jedem Audit wird ein frischer Temp-Worktree von `origin/main` angelegt.
- Phase 1 und Phase 2 bleiben read-only fuer Produktcode.
- Audit-Artefakte duerfen in `qa/` und `qa/scripts/` entstehen.
- Die Standard-Verifikation fuer dieses Repo ist:
  - `npm test`
  - `npm run check`
  - `npm run build`
  - `npm run lint`

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
