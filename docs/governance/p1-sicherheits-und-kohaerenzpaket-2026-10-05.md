# P1-Sicherheits- und Kohärenzpaket vom 05.10.2026

## Status und Zweck

Dieses Protokoll dokumentiert ein KI-gestütztes redaktionelles und technisches
Änderungspaket. Es ist **keine institutionelle oder klinische Fachfreigabe** und
kein Publikationsentscheid.

Das Paket bearbeitet vorrangig Sicherheitslogik, nicht stigmatisierende
Grenzziehung, Publikationshygiene veralteter Notfallmaterialien sowie klar
abgrenzbare Barrierefreiheits- und Reflow-Probleme.

## Umgesetzte Änderungen

### Krisen- und Soforthilfe

- Unbelegte Garantien zu Notrufverbindungen ohne SIM-Karte wurden entfernt.
- Aussagen zu Beratungsangeboten versprechen weder absolute Vertraulichkeit
  noch Folgenlosigkeit, wenn eine akute Gefährdung Hilfe von aussen erfordert.
- Selbstverletzung wird nach unmittelbarer Gefahr und medizinischer
  Dringlichkeit eingeordnet; eine professionelle Beurteilung wird ausdrücklich
  empfohlen.
- Hinweise nennen den Selbstschutz der angehörigen Person und übertragen ihr
  weder alleinige Überwachung noch alleinige Sicherheitsverantwortung.
- Die Notrufnummern `117` und `144` bleiben zentral gepflegt und werden in den
  betroffenen Darstellungen aus derselben Quelle übernommen.

### Grenzen, Verantwortung und Anti-Stigma

- Gewalt und Bedrohung werden von gewöhnlichen Grenz- und Alltagskonflikten
  getrennt. Schutz und Hilfe haben dort Vorrang vor Gesprächstechniken.
- Grenzen dürfen situationsabhängig angepasst werden; Verlässlichkeit wird
  nicht als stets identisches Verhalten missverstanden.
- Kritisch oder historisch einflussreiche Buchtitel werden von aktuellen
  Empfehlungen getrennt und nicht mit Kaufaufrufen versehen.

### Publikationshygiene der Notfallkarte

- Die aktuelle Webfassung unter `/notfallkarte` bleibt zugänglich.
- Die Notfallkarte wird dauerhaft ohne separat veröffentlichte PDF- oder
  Bildfassung geführt. Damit soll verhindert werden, dass ausserhalb der
  Website gespeicherte Kriseninformationen unbemerkt veralten und später
  weitergegeben werden.
- Das überholte PDF und die zugehörige WebP-Vorschau sind aus dem aktuellen
  Projektbestand und aus dem öffentlich ausgelieferten Verzeichnis entfernt.
  Prüfsummen und Herkunft sind unter
  `qa/retired-handouts/notfallkarte-static-2026-10-05/` dokumentiert; die
  Binärdateien bleiben ausschliesslich über die Git-Historie rekonstruierbar.
- Governance, Bibliothek, Downloadlogik und Prüfskripte behandeln
  `notfallkarte-zuerich` ausdrücklich als `web-only`. Die früheren Asset-Pfade
  bleiben dauerhaft gesperrt und werden automatisiert auf HTTP 404 geprüft.
- Datumsangaben unterscheiden nun zwischen redaktionellem Arbeitsstand,
  letzter dokumentierter Fachprüfung und der seit 31.07.2026 ausstehenden
  erneuten Fachprüfung.

### Barrierefreiheit und robuste Darstellung

- Eine verschachtelte Landmarke wurde durch einen eindeutig bezeichneten
  Sicherheitshinweis mit `role="note"` ersetzt.
- Die Überschriftenhierarchie der Energiehaushalt-Visualisierung wurde
  korrigiert.
- Lange Quellenlinks und Grid-Inhalte können bei schmalen Viewports umbrechen.
- Überfällige nächste Prüfzeitpunkte werden im Verifikationshinweis sichtbar
  benannt.

## Herangezogene Primärquellen

- BAKOM, Technische und administrative Vorschriften betreffend Leitweglenkung
  und Standortidentifikation der Notrufe, Ausgabe 20, gültig ab 01.07.2026:
  <https://www.bakom.admin.ch/dam/de/sd-web/pRgh7G-sbH2k/TAV%201.3%20Ausgabe%2020_DE_20260506_provisorisch.pdf>
- Pro Juventute 147, «Darum kannst du uns vertrauen»:
  <https://www.147.ch/de/info/darum-kannst-du-uns-vertrauen/>
- Kanton Zürich, Notfall und Rettung (`144`, `117`):
  <https://www.zh.ch/de/gesundheit/notfall-rettung.html>

Die Quellen stützen einzelne Sachangaben. Sie ersetzen nicht die verantwortete
fachliche Prüfung der gesamten Formulierungen und der lokalen Versorgungspfade.

## Reproduzierbare technische Prüfung

Geprüft wurden:

- vollständige Unit- und Komponententests;
- Lint, TypeScript und Produktions-Build;
- Prettier und Diff-Integrität;
- P1-Illustrations- und Web-Audits;
- PDF-Bestandsprüfung;
- 36 Browserfälle für neun betroffene Routen in `320`, `360`, `768` und
  `1440` Pixel Breite;
- Überschriftenstruktur, horizontaler Überlauf, Laufzeitfehler und relevante
  Linkzustände;
- automatisierte Axe-Prüfungen der geänderten React- und statischen Seiten bei
  schmaler und breiter Darstellung.

Automatisierte Prüfungen ersetzen keine reale assistive oder fachliche Prüfung.

## Vor einem Publikationsentscheid offen

1. Verantwortete fachliche Prüfung der geänderten Krisen- und
   Soforthilfeformulierungen einschliesslich lokaler Versorgungspfade.
2. Reale VoiceOver- und NVDA-Prüfung sowie Tests mit betroffenen Menschen und
   Angehörigen.
3. Prüfung der Deployment-Vorschau und der Release-HTTP-Gates im tatsächlichen
   Netlify-Kontext.
4. Ausdrücklicher Merge- und Publikationsentscheid durch die verantwortlichen
   Personen.
