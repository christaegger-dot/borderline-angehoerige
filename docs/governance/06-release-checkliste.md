# Release-Checkliste

Diese Checkliste ist vor jedem Release zwingend zu prüfen.

## Technisch

- [ ] pnpm run test erfolgreich
- [ ] pnpm run check erfolgreich
- [ ] pnpm run build erfolgreich
- [ ] pnpm run lint erfolgreich

## Inhaltlich

- [ ] Keine neue medizinische Aussage ohne Quellenprüfung
- [ ] EvidenceNotes konsistent
- [ ] Anti-Stigma- und Perspektivenstandard auf Seite, Suche, Textversion,
      Visualisierung und PDF geprüft
- [ ] Keine Motiv-, Gewalt- oder Gefährlichkeitszuschreibung aus der Diagnose
- [ ] Angehörige nicht für Regulation, Behandlung oder Genesung verantwortlich
      gemacht
- [ ] Autonomie, Einwilligung und Vertraulichkeit gewahrt

## Hochrisiko-Seiten

- [ ] `/soforthilfe` fachlich, technisch und gegen amtliche Primärquellen geprüft
- [ ] keine operativen Kontaktkopien ausserhalb von `/soforthilfe`
- [ ] feste nummernfreie Zuständigkeitsaussage konsistent
- [ ] Diagnostik geprüft
- [ ] Grenzen geprüft

## Datenschutz

- [ ] Datenschutzerklärung konsistent
- [ ] Analytics geklärt

## Freigabe

- [ ] Fachlich geprüft
- [ ] Erfahrungsperspektiven geprüft; bei Krisen- und Sicherheitsänderungen ist
      ein offener Review ein Release-Blocker
- [ ] Inhaltsverantwortung für `/soforthilfe` namentlich zugeordnet
- [ ] institutioneller Grundsatz- und Publikationsentscheid dokumentiert
- [ ] Release freigegeben

## Release-Gates

### Fach- und Kontakt-Audit

Für diese Site ist das der wichtigste Gate.

Prüfen:

- staatliche Notrufnummern `144` und `117` gegen amtliche Primärquelle
- offizielle Zielseiten veränderlicher PUK- und Beratungsangebote
- Inhaltsverantwortung, Primärquelle, Prüfdatum und Status jedes Kontakts
- Parität zwischen `client/src/data/kontakte.ts` und `/soforthilfe` durch
  Generierung oder automatischen Test
- rechtliche Begriffe
- Quellen- und Krisenhinweise
- lokale Relevanz für Schweiz / Zürich
- keine Nummern oder Kontaktlisten in psychoedukativen Seiten, Textversionen
  und Werkzeugen

Pflicht-Scope:

- `/soforthilfe`
- `/unterstuetzen/krise`
- `/diagnostik`
- `/begleiterkrankungen`
- `/grenzen`
- `/beratung`
- `/quellen`
- `client/src/data/kontakte.ts`
- gesperrte Pfade und Assets der statischen Notfallkarte
- Redirect `/notfallkarte` nach `/soforthilfe`
- öffentlicher `404`-Status von `/notfallkarte/erstellen`
- `/wegweiser` und der Krisenausgang des Selbsttests, solange deren Folgereview
  nicht abgeschlossen ist

Zusätzliche Kontaktregel:

- vor jedem öffentlichen Release und mindestens alle drei Monate prüfen
- überfällige Prüfung blockiert den Release
- gebrochene oder unbelegbare variable Kontakte entfernen, nicht aus
  Erinnerung ersetzen
- `/soforthilfe-print.html` und statische Notfallplan-Ableitungen mit kopierten
  operativen Kontakten dürfen nicht produktiv ausgeliefert werden
- der feste Footer-Hinweis ist auf jeder psychoedukativen Seite vorhanden; ein
  allfälliger Header-Link ist ein nachgeordneter Textlink, kein Krisenbutton

Dieses Gate soll vor Release von einer fachlich verantwortlichen Person
gegengelesen und ausdrücklich freigegeben werden.

Dokumentation:

- `docs/governance/10-fachliche-freigabe-vorlage.md`

### Produktions-Crawl- und Link-Audit

Vor Release systematisch prüfen:

- interne Links
- Anker-Sprünge
- Redirects
- `tel:`- und `mailto:`-Links
- externe Beratungslinks
- PDF-Links
- direkte Sonderpfade
- 404-Verhalten

Besonderes Augenmerk:

- SPA-Routen
- die statische Sonderseite `/soforthilfe`
- ausgemusterte oder unveröffentlichte Sonderpfade müssen den dokumentierten
  404-, Redirect- oder Zugriffszustand zeigen
- Material-Download-Proxy `/api/material-download/:id`

### PDF- und Download-Audit

Die Site hängt stark an PDFs, Downloads und Textversionen. Operative
Notfallkontakte werden jedoch nicht als statische PDF-, WebP- oder
Thumbnail-Fassung veröffentlicht.

Vor Release explizit prüfen:

- Datei vorhanden
- korrekter Dateiname
- richtiger CTA
- Inline-Öffnen vs. Download
- Proxy-Verhalten
- Preview vorhanden und korrekt
- A4- bzw. Seitenformat plausibel
- `verifiedAt`-Angaben aktuell
- Konsistenz zwischen Content-Metadaten und real ausgelieferter Datei

Relevante Quellen:

- `client/src/content/materialien.ts`
- `client/src/content/handouts.ts`
- `client/src/content/handoutTextVersions.ts`
- `server/material-download.ts`

Zusätzlich prüfen:

- gibt es für priorisierte Materialien eine zugängliche Textversion
- image-only PDFs nur zusammen mit sichtbarer Textversion und aktuellem
  `verifiedAt`
- entspricht der PDF-Textlayer bzw. die Suchbarkeit dem erwarteten
  Qualitätsniveau
- eine formale PDF/UA-Prüfung ist derzeit kein Pflicht-Gate; falls sie
  gewünscht ist, muss sie als eigener Zusatzcheck dokumentiert werden

### Indexierungs-, SEO- und Metadaten-Audit auf Produktion

Prüfen:

- `robots.txt`
- `sitemap.xml`
- Canonicals
- Open Graph
- Twitter-Metadaten
- JSON-LD
- Seitentitel und Descriptions
- Redirect-Konsistenz

Relevante Stellen:

- `client/src/components/SEO.tsx`
- `client/index.html`
- `client/public/soforthilfe/index.html`
- `client/public/robots.txt`
- `client/public/sitemap.xml`

Drift-Check:

- Stimmen `lastReviewed`- und Prüfdatum-Angaben in JSON-LD,
  Review-Badges, `pageGovernance.ts` und statischen Krisenseiten noch
  mit dem tatsächlichen Inhaltsstand überein?

### Interaktions- und Zustandsaudit der Tools

Vor Release bewusst testen:

- `/notfallkarte` leitet dauerhaft auf `/soforthilfe` um
- `/notfallkarte/erstellen` gibt in der öffentlichen Produktion `404` zurück
- Wegweiser und Selbsttest enthalten keine operative Nummernkopie, behaupten
  keine Triage und führen zu genau einer primären nächsten Aktion
- falls das persönliche Notfallkarten-Werkzeug später freigegeben wird:
  Speichern, Reload, Löschen, Druckansicht und Shared-Device-Hinweis
- Zurück / Vorwärts
- Fokus nach Dialog oder Menü
- Such-Overlay
- Mobile Menu
- Selbsttest-Navigation
- interaktive Komponenten unter `client/src/components/interactive`

Bei Hochrisiko-Flows gilt: keine automatische Triage, keine versteckte
Sicherheitsinformation und kein stilles Fehlverhalten bei Storage-, Print-
oder Fokuswechseln.

### Voller Geräte- und Browser-Release-Test

Verbindliche Release-Matrix:

- iPhone Safari
- iPhone Chrome
- Android Chrome
- Desktop Chrome
- Desktop Firefox
- optional zusätzlich macOS Safari

Das ist hier release-relevant wegen langer Lesestrecken, sticky
Navigation, Fokus-Management, Druckpfaden, lokaler Speicherung und den
Soforthilfe- und Notfallpfaden.

Dokumentation:

- `qa/release-browser-matrix.md`

## Zusätzliche Audits mit hohem Nutzen

### Config- und Doku-Drift-Audit

Vor Release prüfen, ob Governance, QA-Doku und tatsächliche
Repo-Realität noch zusammenpassen.

Beispiele in diesem Repo:

- historische `npm`-Referenzen in älteren Audit- oder `_dev`-Dokumenten
  vs. aktuelle operative `pnpm`-Nutzung
- Abgleich zwischen Hochrisiko-Seiten in Governance und
  `client/src/data/pageGovernance.ts`
- Konsistenz zwischen Audit-Doku, Sonderpfad-Architektur und realen
  Scripts / Checks

### Security- und Caching-Audit

Vor Release gegen die echte Produktion prüfen:

- Security-Header
- CSP
- Cache-Regeln für HTML
- Cache-Regeln für Assets
- Cache-Regeln für PDFs
- Cache-Regeln für Proxy-Responses
- keine unerwarteten externen Requests
- keine Preview- oder Dev-Metadaten auf Production
- konsistente Auslieferung statischer Sonderseiten und Download-Pfade
