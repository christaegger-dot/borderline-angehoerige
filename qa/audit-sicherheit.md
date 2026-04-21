# audit/sicherheit

## Meta

- Repo: `/Users/christaegger/Documents/Webprojekte/borderline-angehoerige`
- Worktree: `/tmp/borderline-sicherheit.q1oaog`
- Branch: `audit/sicherheit`
- Basis: `origin/main`
- Prompt-Sammlung: `/tmp/borderline-sicherheit.q1oaog/qa/codex-audit-prompts.md`
- Audit-Datum: `2026-04-21`

## Status

- Phase 1: abgeschlossen
- Phase 2: abgeschlossen
- Phase 3: abgeschlossen
- Phase 4: abgeschlossen

## Notizen

- Produktcode blieb in Phase 1 read-only.
- Audit-Artefakte liegen unter `qa/`.
- Fuer Vulnerability-Checks wurde wegen `pnpm-lock.yaml` statt `package-lock.json`
  zusaetzlich `npm exec pnpm audit` verwendet. `npm audit` allein ist in diesem
  Repo technisch nicht das passende Werkzeug.

## Sofortmeldung

- Keine echten Secrets im aktuellen Tree gefunden.
- Keine echten `.env`-Dateien, Zertifikate oder Schluesseldateien im Repo
  gefunden; nur `.env.example`.

## Zusammenfassung

Gesamtrisiko Phase 1: **hoch**

Hauptgruende:

1. Die Live-Site antwortet aktuell auf `/` und `/soforthilfe` mit `HTTP 503`
   und JSON-Body `{"error":"usage_exceeded",...}` statt mit der Website.
2. `main` ist weder klassisch branch-protected noch durch Rulesets abgesichert.
3. Die aktuell konfigurierte CSP muss `unsafe-inline` fuer Skripte und Styles
   erlauben, weil mehrere Inline-Skripte, Inline-Handler und Inline-Styles
   vorhanden sind.

## 1.1 Secret-Scan

### Aktueller Tree

- Treffer im aktuellen Tree waren nur erwartbare Platzhalter oder rein
  textuelle Nennungen:
  - `.github/workflows/auto-merge-claude.yml` nutzt
    `${{ secrets.GITHUB_TOKEN }}` wie erwartet
  - `.env.example` enthaelt nur leere Platzhalter
  - die Audit-Prompt-Sammlung nennt Suchmuster nur dokumentarisch
- Keine realen Tokens vom Typ `sk-`, `ghp_`, `nfp_` gefunden.
- Keine URLs mit eingebetteten Credentials gefunden.

### Dateien mit Secret-Relevanz

- Nur `.env.example` ist vorhanden und historisch versioniert.
- Keine `.env`, `.env.local`, `.pem`, `.key`, `.crt`, `.p12`, `.cer`
  gefunden.

### Git-History

- `origin/main` enthaelt Historie fuer `.env.example`, aber keine Hinweise auf
  eingecheckte echte `.env`-Dateien.
- Suchlaeufe auf `origin/main` nach
  `VITE_FRONTEND_FORGE_API_KEY`, `VITE_ANALYTICS_ENDPOINT`,
  `VITE_ANALYTICS_WEBSITE_ID`, `ghp_`, `sk-`, `nfp_`, `password=` ergaben:
  - Treffer fuer Variablennamen und Platzhalter in `.env.example`
  - keine belegten echten Secret-Werte

### Relevante Stellen

- [.env.example](/tmp/borderline-sicherheit.q1oaog/.env.example:1)
- [Map.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/components/Map.tsx:89)

## 1.2 .gitignore-Pruefung

`.gitignore` ist insgesamt solide.

Vorhanden:

- `.env`, `.env.local`, `.env.development.local`, `.env.test.local`,
  `.env.production.local`
- `node_modules`, `dist`, `build`, Logs, temporäre Dateien
- zusaetzlich `package-lock.json`

Keine offenkundig versehentlich versionierten sensitiven Dateien im aktuellen
Tree.

Referenz:

- [.gitignore](/tmp/borderline-sicherheit.q1oaog/.gitignore:1)

## 1.3 HTTP-Security-Headers

### Code-Konfiguration

Im Code sind die wichtigsten Security-Header sowohl in Netlify als auch im
Express-Server gesetzt:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `Strict-Transport-Security`
- `Content-Security-Policy`

Referenzen:

- [netlify.toml](/tmp/borderline-sicherheit.q1oaog/netlify.toml:20)
- [server/index.ts](/tmp/borderline-sicherheit.q1oaog/server/index.ts:14)

### Live-Site

Die Live-Site war waehrend des Audits nicht normal verfuegbar:

- `curl -I https://borderline-angehoerige.netlify.app` -> `HTTP 503`
- `curl -I https://borderline-angehoerige.netlify.app/soforthilfe` ->
  `HTTP 503`
- `curl https://borderline-angehoerige.netlify.app` -> JSON:
  `{"error":"usage_exceeded","message":"Usage exceeded",...}`

Dadurch liessen sich die produktiven, an die App ausgelieferten Header nicht
vollstaendig gegen die eigentliche Seite verifizieren. Sichtbar im Netlify
Fehler-Response war nur:

- `Strict-Transport-Security`

### CSP-Bewertung

Die vorhandene CSP ist brauchbar, aber nicht streng, weil sie fuer Skripte und
Styles `unsafe-inline` zulaesst:

- [netlify.toml](/tmp/borderline-sicherheit.q1oaog/netlify.toml:28)
- [server/index.ts](/tmp/borderline-sicherheit.q1oaog/server/index.ts:21)

Diese Ausnahme ist aktuell real noetig, weil das Projekt Inline-Code enthaelt:

- `onload="this.media = 'all'"` fuer Font-Stylesheet
  in [client/index.html](/tmp/borderline-sicherheit.q1oaog/client/index.html:71)
- Inline-`<style>` fuer Font-Metrics
  in [client/index.html](/tmp/borderline-sicherheit.q1oaog/client/index.html:82)
- Inline-`style="..."` im `noscript`-Fallback
  in [client/index.html](/tmp/borderline-sicherheit.q1oaog/client/index.html:179)
- Inline-Analytics-`<script type="module">`
  in [client/index.html](/tmp/borderline-sicherheit.q1oaog/client/index.html:196)
- `onclick="window.print()"` in
  [client/public/notfallkarte.html](/tmp/borderline-sicherheit.q1oaog/client/public/notfallkarte.html:393)
- Inline-`<script>` fuer `scaleToFit()` in
  [client/public/notfallkarte.html](/tmp/borderline-sicherheit.q1oaog/client/public/notfallkarte.html:634)

Folge: Eine strikte CSP ohne `unsafe-inline` ist aktuell nicht moeglich.

## 1.4 Dependency-Vulnerabilities

### Werkzeughinweis

`npm audit` ist in diesem Repo nicht direkt nutzbar, weil kein
`package-lock.json` vorliegt:

- Ergebnis: `ENOLOCK`

Da das Repo `pnpm-lock.yaml` nutzt, wurde der passende Audit-Lauf ueber
`npm exec pnpm audit` durchgefuehrt.

### Ergebnis

`pnpm audit` ergab:

- `critical: 0`
- `high: 0`
- `moderate: 0`
- `low: 0`

Artefakt:

- `qa/pnpm-audit.json`

## 1.5 Inline-Scripts und Event-Handler

Gefunden:

- Inline-`onload` in [client/index.html](/tmp/borderline-sicherheit.q1oaog/client/index.html:75)
- Inline-`<style>` in [client/index.html](/tmp/borderline-sicherheit.q1oaog/client/index.html:82)
- Inline-`style="..."` im `noscript`-Block in
  [client/index.html](/tmp/borderline-sicherheit.q1oaog/client/index.html:179)
- Inline-Analytics-`<script type="module">` in
  [client/index.html](/tmp/borderline-sicherheit.q1oaog/client/index.html:196)
- Inline-`onclick` in
  [client/public/notfallkarte.html](/tmp/borderline-sicherheit.q1oaog/client/public/notfallkarte.html:393)
- Inline-`<script>` in
  [client/public/notfallkarte.html](/tmp/borderline-sicherheit.q1oaog/client/public/notfallkarte.html:634)

Bewertung:

- Kein unmittelbarer XSS-Beweis
- aber klare CSP-Haertebremse
- insbesondere fuer ein Sicherheitsziel mit strenger CSP ein
  **mittel-hoher Hygienebefund**

## 1.6 Formulare und User-Input

### Formulare / Eingabeflaechen

Gefunden wurden lokale UI-Eingaben, aber keine serverseitig verarbeiteten
Formulare im eigentlichen Sinn:

- Glossar-Suche
- globales Such-Overlay
- Notfallkarte-Editor
- `Feedback` ist ein `mailto:`-Flow, kein POST-Formular

Bewertung:

- klassischer CSRF-Angriffsvektor aktuell niedrig
- serverseitige Input-Validierung ist kaum relevant, weil praktisch kein
  serverseitiger User-Input verarbeitet wird

### XSS-Risiken

- Kein `dangerouslySetInnerHTML` gefunden
- Keine direkte `innerHTML = ...`-Nutzung gefunden
- Keine serverseitige HTML-Ausgabe aus User-Input gefunden

### Storage-Nutzung

Gefunden:

- Theme-Preference in
  [ThemeContext.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/contexts/ThemeContext.tsx:23)
- Notfallkarten-Daten in
  [Notfallkarte.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/pages/Notfallkarte.tsx:41)

Bewertung:

- Theme ist unkritisch
- `notfallkarte-data` speichert potenziell sensible Inhalte lokal im Browser:
  - persoenliche Kontakte
  - Telefonnummern
  - Notizen
- Das ist kein klassischer Secret-Leak, aber ein **Privacy-/Shared-Device-Risiko
  mittlerer Schwere**, weil Gesundheits-/Krisenkontext betroffen sein kann

## 1.7 Deployment-Konfiguration

### Netlify / Build

Die Netlify-Konfiguration ist grundsaetzlich konsistent:

- Build: `npx vite build`
- Publish: `dist/public`

Referenz:

- [netlify.toml](/tmp/borderline-sicherheit.q1oaog/netlify.toml:1)

### Live-Deployment

Der groesste operative Befund ist die aktuelle Nichtverfuegbarkeit der Live-Site:

- `HTTP 503`
- Body: `usage_exceeded`

Das ist in erster Linie ein Deployment-/Kontingent- oder Plattformproblem,
nicht ein Quellcode-Problem, aber fuer Deployment-Hygiene hoch relevant.

### GitHub-Repo-Hygiene

API-Pruefungen ergaben:

- klassische Branch Protection fuer `main`: nicht gesetzt (`404 Branch not protected`)
- branch rules fuer `main`: `[]`
- rulesets: `[]`
- `delete_branch_on_merge`: `false`
- `allow_auto_merge`: `false`

Bewertung:

- Fehlende Schutzregeln fuer `main` sind ein **hoher Hygienebefund**
- vorhandene CI-Workflows pruefen zwar `main` und PRs, sind aber ohne
  Branch-Protection nur beratend, nicht erzwungen

Referenzen:

- [.github/workflows/ci.yml](/tmp/borderline-sicherheit.q1oaog/.github/workflows/ci.yml:1)
- [.github/workflows/auto-merge-claude.yml](/tmp/borderline-sicherheit.q1oaog/.github/workflows/auto-merge-claude.yml:1)

### Dev-/Debug-Endpunkte

In der Vite-Dev-Umgebung existiert ein Debug-Collector:

- `POST /__manus__/logs`
- nur innerhalb `configureServer(...)` des Vite-Dev-Servers

Referenz:

- [vite.config.ts](/tmp/borderline-sicherheit.q1oaog/vite.config.ts:101)

Bewertung:

- in Produktion voraussichtlich nicht aktiv
- fuer Dev okay, aber ein Punkt fuer Wachsamkeit, falls Vite-Dev jemals
  oeffentlich exponiert werden sollte

## 1.8 Weitere sicherheitsrelevante Beobachtungen

### Potenziell client-exponierter API-Key

Die Google-Maps-Integration liest einen `VITE_`-konfigurierten API-Key direkt
im Client:

- [Map.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/components/Map.tsx:89)
- [.env.example](/tmp/borderline-sicherheit.q1oaog/.env.example:1)

Bewertung:

- `VITE_` bedeutet bei Vite: Wert ist fuer den Browser-Bundle bestimmt
- wenn dieser Key nur ein oeffentlich vorgesehener Browser-/Proxy-Key ist,
  ist das okay
- wenn dahinter ein eigentlich geheimer Dienstschluessel steckt, waere das ein
  Designproblem

Status in Phase 1:

- **zu validieren**, nicht als bestatigter Leak gewertet

### `window.open(..., "_blank")` ohne `noopener`

Gefunden:

- [MaterialienLibrarySection.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/sections/MaterialienLibrarySection.tsx:72)
- [VerstehenInfografikenSection.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/sections/VerstehenInfografikenSection.tsx:96)
- [VerstehenMaterialsSection.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/sections/VerstehenMaterialsSection.tsx:100)

Bewertung:

- kein Akutproblem
- aber unnötige Security-Hygiene-Luecke gegenueber der sonst sauberen Nutzung
  von `rel="noopener noreferrer"` bei normalen Links

## 1.9 Nicht-Befunde / positive Punkte

- Keine echten Secrets im aktuellen Tree
- Keine echten `.env`-Dateien oder Schluesseldateien im Repo
- `.gitignore` deckt typische Sensitive-Dateien gut ab
- `pnpm audit` aktuell ohne bekannte Vulnerabilities
- Keine direkte Nutzung von `dangerouslySetInnerHTML`
- `server/material-download.ts` nutzt keinen frei vom User bestimmbaren Upstream,
  sondern ein festes Mapping ueber `resolveMaterialDownload(id)`; damit aktuell
  kein offensichtlicher SSRF-Pfad

## 1.10 Uebersichtstabelle

| Bereich                                     | Ergebnis                                 |
| ------------------------------------------- | ---------------------------------------- |
| Exponierte Secrets im aktuellen Tree        | 0                                        |
| Echte `.env`-Dateien im Repo                | 0                                        |
| Zertifikate/Private Keys im Repo            | 0                                        |
| `pnpm audit`                                | 0 critical / 0 high / 0 moderate / 0 low |
| Live-Site-Verfuegbarkeit                    | `HTTP 503 usage_exceeded`                |
| Klassische Branch-Protection fuer `main`    | nicht gesetzt                            |
| Rulesets fuer `main`                        | keine                                    |
| Inline-Skripte / Inline-Handler             | ja                                       |
| CSP ohne `unsafe-inline` moeglich           | derzeit nein                             |
| localStorage mit potenziell sensiblen Daten | ja, Notfallkarte                         |

## Phase-1-Fazit

Die groessten Phase-1-Befunde liegen nicht bei klassischen Dependency-Leaks
oder Secrets, sondern bei **Deployment-Hygiene und Sicherheits-Haerte**:

1. Live-Site aktuell nicht verfuegbar (`503 usage_exceeded`)
2. `main` ohne erzwungene Schutzregeln
3. CSP durch Inline-Code nicht haertbar
4. lokale Speicherung sensibler Notfallkarten-Daten
5. zu validierende Client-Exposition eines Maps-/Forge-Keys

## Phase 2 - Triage und Massnahmenkatalog

### 2.1 Sofort-Fix im Repo

#### A. `window.open(..., "_blank")` um `noopener,noreferrer` haerten

- Schwere: niedrig
- Aufwand: klein
- Risiko: sehr niedrig
- Status: **Phase 3**

Vorschlag:

- Alle programmatischen `window.open`-Aufrufe mit drittem Argument
  `noopener,noreferrer` ausstatten
- alternativ, wo sinnvoll, auf normale `<a target="_blank" rel="noopener
noreferrer">`-Navigation zurueckbauen

Begruendung:

- schneller Hygienefix
- keine inhaltliche Verhaltensaenderung noetig

#### B. Inline-JavaScript aus `client/index.html` entfernen

- Schwere: mittel
- Aufwand: mittel
- Risiko: niedrig bis mittel
- Status: **Phase 3**

Vorschlag:

- Analytics-Bootstrap in modulare Client-Datei verschieben
- Font-Stylesheet nicht mehr ueber Inline-`onload` schalten
- dadurch `script-src 'unsafe-inline'` in CSP entfernbAR machen

Begruendung:

- unmittelbarer Sicherheitsgewinn durch strengere `script-src`
- klar lokalisierter Eingriff ohne externe Abhaengigkeiten

#### C. Inline-JavaScript aus `client/public/notfallkarte.html` entfernen

- Schwere: mittel
- Aufwand: mittel
- Risiko: niedrig bis mittel
- Status: **Phase 3**

Vorschlag:

- `onclick="window.print()"` auf normalen Button mit externer Script-Bindung
  umstellen
- `scaleToFit()` in separate `notfallkarte.js` auslagern

Begruendung:

- reduziert Inline-Skript-Flaeche
- hilft direkt bei CSP-Haertung

### 2.2 Follow-up-Ticket im Repo

#### D. Inline-CSS systematisch auslagern, damit CSP auch bei `style-src` haertbar wird

- Schwere: mittel
- Aufwand: mittel bis hoch
- Risiko: mittel
- Status: **Follow-up-Ticket**

Vorschlag:

- grosse Inline-Style-Bloecke aus `client/public/notfallkarte.html`
  in eine statische CSS-Datei verschieben
- Font-Fallback-Regeln aus `client/index.html` in regulare Stylesheets
  ueberfuehren
- `noscript`-Fallback mit CSS-Klasse statt Inline-`style`

Begruendung:

- fuer eine wirklich strikte CSP braucht es auch ein Ende von
  `style-src 'unsafe-inline'`
- wegen moeglicher visueller Nebenwirkungen besser als eigenes Paket

#### E. Privacy-Haertung fuer die Notfallkarte entscheiden

- Schwere: mittel
- Aufwand: mittel
- Risiko: produkt-/UX-abhaengig
- Status: **Follow-up-Ticket**

Vorschlag:

- mindestens Transparenzhinweis direkt an der Eingabeoberflaeche:
  Daten werden lokal auf diesem Geraet gespeichert
- optional: klarer "Daten loeschen"-CTA, Session-only-Variante oder
  export-/print-orientierter Flow ohne dauerhafte Speicherung

Begruendung:

- technischer Defekt ist das nicht, aber im Gesundheits- und Krisenkontext
  ein relevanter Shared-Device-/Privatsphaere-Befund
- braucht Produktentscheidung, nicht nur Code-Aktion

#### F. Maps-/Forge-Key-Modell validieren

- Schwere: mittel
- Aufwand: klein bis mittel
- Risiko: unklar bis hoch, falls eigentlich geheimer Key
- Status: **Follow-up-Ticket**

Vorschlag:

- bestaetigen, dass `VITE_FRONTEND_FORGE_API_KEY` bewusst ein oeffentlicher
  Browser-/Proxy-Key ist
- falls nein: auf serverseitigen Proxy oder restriktiv gebundenen Public-Key
  umstellen

Begruendung:

- Phase 1 zeigte kein bestaetigtes Secret-Leak, aber ein klares
  Architektur-Pruefzeichen

### 2.3 Externe Sofortmassnahmen ausserhalb des Repos

#### G. Live-Deployment `503 usage_exceeded` beheben

- Schwere: hoch
- Aufwand: unbekannt, vermutlich klein bis mittel
- Risiko: hoch
- Status: **extern sofort**

Vorschlag:

- Netlify-/Host-Kontingent, Billing oder Plattformsperre pruefen
- nach Freischaltung produktive Header noch einmal live gegenpruefen

Begruendung:

- aktuell ist die Seite operativ nicht verfuegbar
- das blockiert reale Nutzung staerker als jeder Repo-Hygienefund

#### H. Branch-Protection / Rulesets fuer `main` aktivieren

- Schwere: hoch
- Aufwand: klein
- Risiko: niedrig
- Status: **extern sofort**

Vorschlag:

- mindestens Require PR, Require passing checks, linear/geschuetzter Merge-Pfad
- optional zusaetzlich auto-delete merged branches aktivieren

Begruendung:

- vorhandene CI ist ohne erzwungene Schutzregeln nicht verbindlich

### 2.4 Akzeptiert / bewusst belassen

- Keine Phase-1-Befunde wurden derzeit als "akzeptiert" eingeordnet.

### 2.5 Priorisierung

- **P1:** Live-Deployment `503 usage_exceeded` beheben
- **P1:** Branch-Protection fuer `main` aktivieren
- **P1:** Inline-JavaScript entfernen und `script-src` haerten
- **P2:** `window.open`-Hygiene fixen
- **P2:** Privacy-Hinweis / Loeschstrategie fuer Notfallkarte entscheiden
- **P3:** Inline-CSS auslagern und `style-src` weiter haerten
- **P3:** Maps-/Forge-Key-Modell formell validieren

### 2.6 Arbeitsentscheidung fuer Phase 3

In Phase 3 werden nur die klar repo-seitig loesbaren und risikoarmen Pakete
umgesetzt:

1. `window.open` haerten
2. Inline-JavaScript aus `client/index.html` entfernen
3. Inline-JavaScript aus `client/public/notfallkarte.html` entfernen

Externe Plattform-Themen und produktstrategische Entscheidungen bleiben bewusst
ausserhalb dieser Umsetzungsrunde.

## Phase 3 - Umsetzung

Umgesetzt wurden die drei fuer diese Runde vorgesehenen Repo-Pakete:

1. `window.open`-Hygiene gehaertet
2. Inline-JavaScript aus `client/index.html` entfernt
3. Inline-JavaScript aus `client/public/notfallkarte.html` entfernt

### 3.1 App-Bootstrap statt Inline-Analytics

Der bisherige Inline-Analytics-Block in `client/index.html` wurde in regulären
Client-Code verschoben:

- neuer Bootstrap:
  [client/src/bootstrap/analytics.ts](/tmp/borderline-sicherheit.q1oaog/client/src/bootstrap/analytics.ts:1)
- Initialisierung in
  [client/src/main.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/main.tsx:1)

Zusätzlich wurden die verbliebenen kleinen Inline-JS-Reste im App-Shell-Markup
entfernt:

- Font-Stylesheet ohne Inline-`onload`
- `noscript`-Fallback ueber CSS-Klasse statt Inline-`style`
- Font-Fallback-Regeln nach
  [client/public/fallback.css](/tmp/borderline-sicherheit.q1oaog/client/public/fallback.css:1)

### 3.2 Notfallkarte-JavaScript ausgelagert

Die statische Notfallkarte nutzt kein Inline-JavaScript mehr:

- Print-Button jetzt ohne `onclick` in
  [client/public/notfallkarte.html](/tmp/borderline-sicherheit.q1oaog/client/public/notfallkarte.html:393)
- neues externes Script:
  [client/public/notfallkarte.js](/tmp/borderline-sicherheit.q1oaog/client/public/notfallkarte.js:1)

### 3.3 `window.open` gehaertet und CSP verschärft

Die programmatischen neuen Tabs wurden auf `noopener,noreferrer` gehaertet:

- [MaterialienLibrarySection.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/sections/MaterialienLibrarySection.tsx:72)
- [VerstehenInfografikenSection.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/sections/VerstehenInfografikenSection.tsx:97)
- [VerstehenMaterialsSection.tsx](/tmp/borderline-sicherheit.q1oaog/client/src/sections/VerstehenMaterialsSection.tsx:101)

Dadurch konnte `script-src 'unsafe-inline'` aus beiden Header-Definitionen
entfernt werden:

- [netlify.toml](/tmp/borderline-sicherheit.q1oaog/netlify.toml:28)
- [server/index.ts](/tmp/borderline-sicherheit.q1oaog/server/index.ts:21)

## Phase 4 - Verifikation

### Code-Checks

Erfolgreich ausgefuehrt:

- `npm run lint`
- `npm run build`
- `npm run check`

### Sicherheits-Re-Checks

- Keine Inline-Event-Handler oder Inline-`<script>`-Bloecke ohne `src` mehr in
  `client/` und `server/` gefunden
- `pnpm audit` aus Phase 1 bleibt bei `0 critical / 0 high / 0 moderate / 0 low`
- `script-src 'unsafe-inline'` ist im Repo-Header-Stand nicht mehr noetig

### Rest-Risiken nach Umsetzung

Nicht durch diese Repo-Runde geloest:

1. Live-Site weiterhin extern als `503 usage_exceeded` zu behandeln
2. `main` weiterhin ohne erzwungene Branch-Protection/Rulesets zu behandeln
3. `style-src 'unsafe-inline'` bleibt vorerst noetig, solange grosse
   Inline-CSS-Bloecke, insbesondere in `client/public/notfallkarte.html`,
   bewusst nicht ausgelagert wurden
4. Privacy-Risiko der lokal gespeicherten Notfallkarten-Daten bleibt offen
5. Maps-/Forge-Key-Modell bleibt fachlich zu validieren

## Phase-4-Fazit

Der Repo-Code ist nach dieser Runde **messbar haerter**:

- keine Inline-Skripte/Event-Handler mehr im geprueften App-/Server-Bereich
- `script-src` ohne `unsafe-inline`
- neue Tabs programmatisch gehaertet
- Build, Lint und Typecheck gruen

Die **Gesamtrisiko-Einstufung bleibt dennoch hoch**, weil die zwei gravierendsten
Punkte ausserhalb des Codes liegen:

1. aktuelles Live-Deployment nicht verfuegbar
2. fehlende Schutzregeln auf `main`

Naechster sinnvoller Schritt nach diesem Audit:

- externe Behebung von Netlify/Hosting und GitHub-Branch-Protection
- danach Audit 1 in frischem `origin/main`-basiertem Temp-Worktree
