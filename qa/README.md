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
3. `content-sprache`
4. `css-hygiene`
5. `performance`

## Content-Zielgruppe

Fuer den Content-Audit gilt explizit:

`Angehoerige von Menschen mit Borderline-Persoenlichkeitsstoerung in der Schweiz`

## Nutzung

- Repo-spezifische Prompt-Sammlung: [codex-audit-prompts.md](./codex-audit-prompts.md)
- Audit-Worktree-Helfer: [`_dev/create-audit-worktree.sh`](../_dev/create-audit-worktree.sh)

Beispiel:

```sh
_dev/create-audit-worktree.sh sicherheit
_dev/create-audit-worktree.sh a11y-interaktion
```

Der Helper kopiert `qa/README.md` und `qa/codex-audit-prompts.md` in jeden
neu angelegten Audit-Worktree, damit jeder Audit-Lauf fuer sich
selbstbeschreibend bleibt.
