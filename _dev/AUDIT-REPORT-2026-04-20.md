# Audit-Report (20.04.2026)

## Scope

Technischer Schnell-Audit des aktuellen Repositories mit Fokus auf:

- statische Qualität (Lint + TypeScript),
- Teststabilität,
- Produktions-Build,
- Dependency-Sicherheitsprüfung.

## Durchgeführte Checks

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm test`
4. `pnpm build`
5. `pnpm audit --audit-level=moderate`

## Ergebnisse

### ✅ Linting

- `pnpm lint` erfolgreich.
- Hinweis aus Tooling: `baseline-browser-mapping` ist älter als zwei Monate.

### ✅ Typecheck

- `pnpm typecheck` erfolgreich.
- Keine TypeScript-Fehler.

### ✅ Tests

- `pnpm test` erfolgreich (5/5 Tests grün).
- Beobachtung: React-Warnung im Testlauf
  - `React does not recognize the whileInView prop on a DOM element.`
  - Das deutet auf ein Prop-Forwarding-Problem in einer Test-/Mock-Konstellation hin (Framer-Motion Props gelangen auf ein natives DOM-Element).

### ✅ Build

- `pnpm build` erfolgreich.
- Frontend und Server-Bundle wurden ohne Fehler erzeugt.

### ⚠️ Security-Dependency-Audit

- `pnpm audit --audit-level=moderate` konnte nicht ausgeführt werden.
- NPM Audit Endpoint antwortet mit `403 Forbidden`.
- Damit liegt aktuell kein verwertbares, automatisiertes Vulnerability-Ergebnis aus diesem Lauf vor.

## Festgestellte Risiken / Follow-ups

1. **Test-Warnung zu `whileInView` beheben**
   - Priorität: Mittel.
   - Empfehlung: Testsetup/Mock für Framer Motion prüfen, damit Motion-Props nicht auf native DOM-Elemente durchgereicht werden.

2. **Tooling-Hinweis `baseline-browser-mapping` aktualisieren**
   - Priorität: Niedrig.
   - Empfehlung: Dev-Dependency aktualisieren (`npm i baseline-browser-mapping@latest -D`) und Regression kurz gegenprüfen.

3. **Audit-Endpoint-Zugriff für Security-Audits klären**
   - Priorität: Mittel.
   - Empfehlung: Registry-/Auth-/Policy-Konfiguration prüfen, damit `pnpm audit` im CI/CD wieder nutzbar ist.

## Kurzfazit

Der Codebestand ist in diesem Audit-Lauf **buildbar**, **typisiert korrekt** und **testbar**. Es bestehen derzeit keine harten Blocker aus Lint/Typecheck/Test/Build. Offene Punkte betreffen primär die auditierbare Sicherheits-Transparenz (403 bei `pnpm audit`) und eine nicht-blockierende React-Testwarnung.
