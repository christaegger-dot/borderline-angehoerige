# Borderline · Hilfe für Angehörige

Psychoedukatives Informationsangebot für Angehörige von Menschen mit
Borderline-Muster / Borderline-Persönlichkeitsstörung in der Schweiz.

## Zielgruppe

Die Website richtet sich an Angehörige, nahestehende Personen und
Mitbetroffene, die Orientierung zu Krise, Kommunikation, Grenzen,
Selbstfürsorge, Diagnostik und Unterstützungsangeboten im Schweizer
Kontext suchen.

## Technischer Stack

- React 19 + Vite
- TypeScript
- Wouter
- Tailwind CSS 4
- Express
- Vitest, Playwright, ESLint, Prettier

## Lokales Setup

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Qualitätschecks

```sh
pnpm lint
pnpm check
pnpm test
pnpm build
```

Weiterführende QA-Dokumentation:

- [qa/README.md](./qa/README.md)

## Governance und fachliche Freigabe

Medizinische, krisenbezogene und kontaktkritische Inhalte dürfen nicht
ohne fachliche Prüfung veröffentlicht werden. Hochrisiko-Seiten werden
zentral in
[client/src/data/pageGovernance.ts](./client/src/data/pageGovernance.ts)
geführt.

Wichtige Referenzen:

- [docs/governance/06-release-checkliste.md](./docs/governance/06-release-checkliste.md)
- [docs/governance/10-fachliche-freigabe-vorlage.md](./docs/governance/10-fachliche-freigabe-vorlage.md)

## Release-Gates

Vor einem Release müssen mindestens die dokumentierten technischen,
inhaltlichen und fachlichen Gates geprüft werden. Dazu gehören
insbesondere:

- die Release-Checkliste unter
  [docs/governance/06-release-checkliste.md](./docs/governance/06-release-checkliste.md)
- die Geräte- und Browser-Matrix unter
  [qa/release-browser-matrix.md](./qa/release-browser-matrix.md)

## Datenschutz

Die persönliche Notfallkarte kann sensible Angaben enthalten und speichert
diese lokal im Browser auf dem Gerät der Nutzer:innen. Die Inhalte werden
nicht an einen Server der Website übertragen. Details stehen in
[client/src/pages/Datenschutz.tsx](./client/src/pages/Datenschutz.tsx).

Die Website verzichtet bewusst auf Analyse- und Tracking-Tools; maßgeblich
ist die aktuelle Datenschutzerklärung im Produkt.
