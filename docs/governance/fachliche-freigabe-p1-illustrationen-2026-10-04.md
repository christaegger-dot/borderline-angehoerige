# Fachredaktionelle Freigabe · P1-Illustrationspaket

> **Dokumentiertes KI-gestütztes redaktionelles Review – keine institutionelle Fachfreigabe.**
> Dieses Dokument bewahrt den unabhängigen V2-Prüfentscheid und dokumentiert
> separat den daraufhin umgesetzten V3-Korrekturstand. Die verantwortete
> Fachfreigabe bleibt offen. Kein Blatt darf aufgrund dieses Protokolls als
> `approved` gekennzeichnet werden.

## Korrekturstand V3 – bereit zur unabhängigen Nachprüfung

- **Implementierungscommit:** `b451f8e1fe2bd95a07bd14241da95b930a8d48f2`
- **Status:** Die zwei verlangten redaktionellen Korrekturen und die technische
  Reparatur der PDF-Auslieferung sind umgesetzt. Das Paket bleibt ein Entwurf
  und muss erneut unabhängig geprüft werden.

| Blatt                 | Asset-Version               | Webpfad                                | PDF                                                                   |
| --------------------- | --------------------------- | -------------------------------------- | --------------------------------------------------------------------- |
| Radikale Akzeptanz    | `puk-radikale-akzeptanz-v3` | `/materialien/text/radikale-akzeptanz` | [PDF](../../client/public/infografiken/puk-radikale-akzeptanz-v3.pdf) |
| Wenn Gespräche kippen | `puk-gespraeche-kippen-v3`  | `/materialien/text/gespraeche-kippen`  | [PDF](../../client/public/infografiken/puk-gespraeche-kippen-v3.pdf)  |
| Beispiel-Dialog       | `puk-beispiel-dialog-v3`    | `/materialien/text/beispiel-dialog`    | [PDF](../../client/public/infografiken/puk-beispiel-dialog-v3.pdf)    |

### Umgesetzte Befunde

1. **R1 – Radikale Akzeptanz:** Unter «Was Radikale Akzeptanz nicht ist»
   stehen nun die einfachen Bezeichnungen «Aufgeben», «Gutheissen»,
   «Passivität» und «Resignation». Die beanstandete gestapelte Verneinung ist
   in semantischer Webdarstellung, Textbeschreibung, PDF, Vollbild-WebP und
   Thumbnail entfernt.
2. **R2 – Beispiel-Dialog:** Der situationsunabhängige Grenzsatz lautet nun:
   «Ich möchte dieses Gespräch so nicht weiterführen. Ich beende es jetzt.»
   Er setzt kein Anschreien mehr voraus und ist in allen Formaten synchron.
3. **Wenn Gespräche kippen:** Inhaltlich unverändert, aber gemeinsam als V3
   exportiert, damit das erneut vorzulegende Paket einen eindeutigen,
   zusammengehörigen Stand hat.
4. **PDF-Auslieferung:** Lokale PDFs werden direkt als Same-Origin-Assets
   geöffnet und heruntergeladen. Alte `/api/material-download/...`-Links
   leiten mit HTTP 307 auf das statische Asset um. Dadurch muss die
   Serverfunktion keine geschützte Deploy-Preview ohne Browser-Sitzung mehr
   selbst abrufen.

### Technische Nachweise für V3

- Manifest: genau drei V3-Einträge und neun Artefakte; SHA-256, Dateigrössen
  und Abmessungen stimmen vollständig.
- PDFs: je eine vollständige A4-Seite, `Tagged: yes`, ohne sichtbaren Überlauf,
  Clipping, Überlagerungen oder Exportartefakte.
- WebP: Vollbilder je 1600 × 2263 px; Thumbnails je 600 × 849 px; visuell und
  inhaltlich mit den PDFs synchron.
- Lokale PDF-Links: alle drei Öffnen- und Downloadpfade liefern direkt
  `application/pdf`; der frühere Funktionspfad wird im UI nicht mehr verwendet.
- Automatische Prüfung: Typprüfung, Lint, Produktionsbuild, 424 Tests,
  P1-Illustrationsaudit und zwölf Browser-/Viewport-Fälle bestanden.
- Browser-Druckregeln: in den zwölf lokalen Browserfällen bleiben Kopf und
  Inhalt der Visualisierung sichtbar; die Seitennavigation wird ausgeblendet.
- Geschützte Deploy-Preview #617: Am 04.10.2026 wurde der Netlify-Deploy
  `6ac2186bb2199f0008a2bd85` zum Commit
  `445bdc6d2eadd3f1b83f245a87ba99e471a0d5f7` nach Anmeldung interaktiv
  geprüft. Alle drei Textseiten zeigen die V3-Inhalte und verlinken Öffnen und
  Herunterladen direkt auf das jeweilige V3-PDF. Alle drei PDF-Ansichten wurden
  ohne Fehlermeldung geladen; alle drei Download-Aktionen starteten. Die drei
  bisherigen API-Routen leiten auf die korrekten statischen V3-PDFs weiter.
  «Download derzeit nicht verfügbar» trat nicht mehr auf.

### Weiterhin offen

- unabhängiger redaktioneller Gesamtentscheid für den V3-Stand;
- verantwortete institutionelle Fachfreigabe;
- reale Screenreader- und Nutzendentests;
- PDF-UA-/Matterhorn-Prüfung und Prüfung der semantischen PDF-Lesereihenfolge;
- unabhängige Prüfung im nativen Browser-Druckdialog sowie auf realen Druckern.

## Prüfstand des V2-Reviews

- **PR:** [#617 · P1-Illustrationspaket für Borderline](https://github.com/christaegger-dot/borderline-angehoerige/pull/617)
- **Commit:** `fff12445fd01fb1f2a1a82f1e58b4cc0d86a9ba0`
- **Status:** Korrekturen erforderlich; anschliessend Gesamtprüfung vervollständigen und erneut vorlegen.
- **PR-Head vor Dokumentation der Live-Nachprüfung:** `c34e3f662027145046d9a3f73eb277af489721e5`.
  Der Vergleich mit dem genannten Inhaltscommit zeigt zwei spätere Commits,
  die ausschliesslich diese Freigabevorlage verändern. Die geprüften Inhalte und Assets sind unverändert.

| Blatt                 | Asset-Version               | Webpfad                                | PDF                                                                   |
| --------------------- | --------------------------- | -------------------------------------- | --------------------------------------------------------------------- |
| Radikale Akzeptanz    | `puk-radikale-akzeptanz-v2` | `/materialien/text/radikale-akzeptanz` | [PDF](../../client/public/infografiken/puk-radikale-akzeptanz-v2.pdf) |
| Wenn Gespräche kippen | `puk-gespraeche-kippen-v2`  | `/materialien/text/gespraeche-kippen`  | [PDF](../../client/public/infografiken/puk-gespraeche-kippen-v2.pdf)  |
| Beispiel-Dialog       | `puk-beispiel-dialog-v2`    | `/materialien/text/beispiel-dialog`    | [PDF](../../client/public/infografiken/puk-beispiel-dialog-v2.pdf)    |

Der Sollumfang umfasst Webfassung, aufklappbare Textbeschreibung, PDF,
Vollbild-WebP und Thumbnail. Geprüft wurden die Web-Inhaltsquellen, alle drei
Live-Webfassungen mit tatsächlich aufgeklappten Textbeschreibungen sowie alle
neun PDF-/WebP-/Thumbnail-Dateien aus dem Repository. Die PDF-Auslieferung über
die Preview und die Browser-Druckausgabe sind nicht abschliessend bestätigt;
siehe Prüfnachweise.

## Prüfende Person

- **Name:** ChatGPT (KI-System)
- **Rolle / Funktion:** Redaktionelles Review mit fachlicher Plausibilitätsprüfung; keine vertretungsberechtigte Fachperson der PUK
- **Datum:** 04.10.2026
- **Geprüfter Commit oder Deploy-Stand:** Inhalts- und Assetstand `fff12445fd01fb1f2a1a82f1e58b4cc0d86a9ba0`; ergänzende direkte Prüfung der Deploy-Preview #617 am 04.10.2026. Die sichtbaren Inhalte entsprechen den geprüften V2-Quellen. Die Preview zeigt keinen separat verifizierten Deploy-Commit an.

Die folgenden Häkchen bezeichnen nur die ausdrücklich genannten, aus den
Inhaltsquellen, Dateien und der beschriebenen Liveprüfung beurteilbaren Kriterien. Sie sind kein klinisches,
kommunikatives, rechtliches oder barrierefreiheitsbezogenes Sign-off.

## Paketweite Prüfung

- [ ] Fachlich korrekt, verständlich und ruhig formuliert
- [x] Angehörige werden validiert, ohne Schuld oder übermässige Verantwortung
- [x] Beispiele sind keine Garantien, Rezepte oder Pflichtabläufe
- [x] Eigene Sicherheit und Grenzen der Angehörigen bleiben sichtbar
- [x] Bedrohung oder Gewalt und vermutete akute Selbstgefährdung sind klar
      getrennt
- [ ] Quellenlage oder fachliche Herleitung trägt die Aussagen und ist
      dokumentiert
- [x] Die Bezeichnung als eigene didaktische Darstellung ist korrekt
- [x] Webfassung, Textbeschreibung und PDF vermitteln dieselben Kernaussagen
      (PDF-Dateien aus dem Repository; Auslieferung über die Preview separat offen)

## Einzelentscheide

### 1. Radikale Akzeptanz

- [x] Klar von Aufgeben, Gutheissen, Passivität und Resignation abgegrenzt
- [x] Als freiwilliges Angebot bezeichnet; gegenwärtige Realität wird nicht
      mit unveränderbarer Zukunft gleichgesetzt
- [x] Gefühle, Grenzen, Handeln und Unterstützung bleiben berechtigt; die
      Schwierigkeit der Übung wird nicht als persönliches Versagen dargestellt
- [x] Vier Schritte fachlich tragfähig; keine sichere Entlastung versprochen
- [x] Beispiel ohne akute Gefährdung ist verständlich und verallgemeinert
      nicht auf Krisensituationen
- [x] «Schutz geht vor» verhindert ein Missverständnis als Bleiben, Schweigen
      oder Tolerieren von Gewalt
- [ ] freigegeben wie vorliegend
- [x] Korrekturen erforderlich; erneut vorlegen
- [ ] nicht freigegeben
- **Korrekturen oder Begründung:** Die wesentlichen fachlichen Anliegen des ersten
  Reviews sind umgesetzt. Kleine redaktionelle Korrektur R1: Die Überschrift
  «Akzeptanz ist nicht» wird mit «Nicht Aufgeben», «Nicht Gutheissen» usw.
  kombiniert. Diese doppelte Verneinung beim Lesen von Überschrift und Liste
  vermeiden. Vorschlag: unter «Akzeptanz bedeutet nicht» nur «Aufgeben»,
  «Gutheissen», «Passivität» und «Resignation» aufführen. Die eigenständigen
  Erläuterungen dürfen ihre bisherigen, sinnvoll verneinten Überschriften behalten.
  Kein grundlegender Einwand gegen das Akzeptanzkonzept oder die Übung.

### 2. Wenn Gespräche kippen

- [x] Drei Schritte sind Wahlmöglichkeiten, keine Pflichtfolge
- [x] Spiegeln bleibt vorsichtig; Pause und Rückkehr bleiben freiwillig
- [x] Schutztext zu Gewalt und vermuteter akuter Selbstgefährdung ist korrekt
- [x] 117 und 144 sind richtig zugeordnet; Eigenschutz und die Grenze
      eigenständiger Risikobeurteilung sind klar
- [ ] freigegeben wie vorliegend
- [ ] Korrekturen erforderlich; erneut vorlegen
- [ ] nicht freigegeben
- [x] Redaktionell inhaltlich unbeanstandet; endgültiger Freigabeentscheid offen
- **Korrekturen oder Begründung:** In den geprüften Inhaltsquellen, Dateien und
  der Live-Webfassung mit aufgeklappter Textbeschreibung keine zwingende
  inhaltliche Korrektur festgestellt. Wahlfreiheit,
  vorsichtiges Spiegeln, Beenden ohne Rückkehrversprechen, fehlende
  Wirkungsgarantie und Eigenschutz sind klar. Die Nummern 117 und 144 sind
  passend zugeordnet. Die direkte Webprüfung bestätigt diese Bewertung.
  Die institutionelle Fachfreigabe und die noch offenen formatübergreifenden
  Prüfungen werden durch diese positive Inhaltsbewertung nicht ersetzt.

### 3. Beispiel-Dialog

- [x] Klar als anpassbares Beispiel und nicht als Gesprächsrezept bezeichnet
- [ ] Grenze, Pause und optionaler Wiedereinstieg sind realistisch und sicher
- [x] Schutztext zu Gewalt und vermuteter akuter Selbstgefährdung ist korrekt
- [x] 117 und 144 sind richtig zugeordnet; Dableiben wird nur ohne
      Eigengefährdung empfohlen
- [ ] freigegeben wie vorliegend
- [x] Korrekturen erforderlich; erneut vorlegen
- [ ] nicht freigegeben
- **Korrekturen oder Begründung:** Wahlfreiheit, Sicherheit und optionaler
  Wiedereinstieg sind angemessen umgesetzt. Kleine redaktionelle Korrektur R2:
  Der Ausgangspunkt nennt einen Vorwurf, der Grenzsatz setzt jedoch
  tatsächliches Anschreien voraus. Die Bedingung muss erkennbar werden,
  damit ein Vorwurf nicht automatisch mit Anschreien gleichgesetzt wird.
  Vorschlag: den Grenzsatz mit «Wenn Sie angeschrien werden: …» einleiten;
  alternativ eine beobachtungsunabhängige Formulierung wie «Mir wird das
  Gespräch gerade zu viel. Ich beende es jetzt.» verwenden. Die bewusste
  Auswahl möglicher Sätze und die fehlende Rückkehrpflicht beibehalten.

## Gesamtentscheid

- [ ] Paket freigegeben wie vorliegend
- [x] Paket nach dokumentierten Korrekturen erneut vorlegen
- [ ] Nur folgende Einzelblätter freigegeben:
- [ ] Paket nicht freigegeben

**Redaktionell erforderliche Korrekturen und offene Voraussetzungen:**

1. R1 und R2 der Fachverantwortung zur Bestätigung vorlegen; in diesem Review
   wurden die Handout-Inhalte nicht verändert.
2. Nach bestätigten Inhaltsänderungen Web, Textbeschreibung, PDF, WebP und
   Thumbnail gemeinsam aktualisieren und erneut prüfen.
3. Live-Webprüfung mit geöffneten Textbeschreibungen ist abgeschlossen.
   PDF-Auslieferung klären und erneut prüfen (T1 unten); die Browser-Druckausgabe
   im aktuellen Stand bleibt unabhängig zu bestätigen.
4. Verantwortete fachliche Bestätigung sowie die vorgesehenen realen
   Screenreader-, Nutzenden- und Matterhorn-Prüfungen bleiben offen.
5. Entwurfsstatus beibehalten; keine `approvedVersion` oder
   `approvalStatus: approved` aus diesem KI-Review ableiten.

**Nachweis des Entscheids**

- Nachweis: diese versionierte Datei in PR #617; keine Signatur einer verantwortlichen Fachperson.
- Verantwortliche Fachperson / Bestätigung / Datum: noch offen.
- Nächster fachlicher Review: nach Korrekturen und vor Freigabe;
  anschliessend gemäss Risikoklasse (mittlere Risikostufe jährlich,
  sicherheitsrelevante Inhalte zusätzlich nach den geltenden Reviewregeln).

## Nach dem Entscheid

1. Nur dokumentierte Korrekturen umsetzen.
2. Bei Inhaltsänderungen Webfassung, Textbeschreibung, PDF, WebP und Thumbnail
   gemeinsam neu erzeugen, neu versionieren und erneut prüfen.
3. Nur unverändert freigegebene `assetVersion` als `approvedVersion`
   übernehmen und `approvalStatus` auf `approved` setzen.
4. Erst nach erneuten Tests den Draft-PR als bereit zur Prüfung markieren. Eine
   Freigabe oder ein Merge veröffentlicht die Website nicht automatisch.

## Prüfnachweise und Grenzen dieses Reviews

### Inhalte und Formate

| Gegenstand                                                | Eigenständig geprüft | Ergebnis / Grenze                                                                                                                                                                                                                                                       |
| --------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web-Inhaltsquellen der drei V2-Blätter                    | Ja                   | Texte, Schrittfolgen, Quellenhinweise und sämtliche hinterlegten `longDescription`-Texte gelesen; R1/R2 siehe oben                                                                                                                                                      |
| Aufklappbare Textbeschreibung im Browser                  | Ja                   | Alle drei Aufklapper tatsächlich geöffnet und vollständig gelesen; Kernaussagen stimmen mit Darstellung und hinterlegtem Text überein                                                                                                                                   |
| Drei separate PDF-Handouts                                | Ja                   | Alle Seiten gerendert und visuell gelesen; jedes PDF eine vollständige A4-Seite, kein sichtbarer Überlauf                                                                                                                                                               |
| Drei Vollbild-WebP                                        | Ja                   | Je 1600 × 2263 Pixel, visuell mit den PDFs abgeglichen                                                                                                                                                                                                                  |
| Drei Thumbnail-WebP                                       | Ja                   | Je 600 × 849 Pixel, als verkleinerte Vorschau geprüft; keine eigenständige Lesefassung                                                                                                                                                                                  |
| Assetidentität                                            | Ja                   | SHA-256 und Dateigrössen aller neun Dateien stimmen mit `handouts/p1-illustrations/manifest.json` am Prüfcommit überein                                                                                                                                                 |
| Live-Webdarstellung                                       | Ja                   | Nach erfolgreicher Anmeldung alle drei Seiten nacheinander gelesen und anhand vollständiger Screenshots visuell geprüft; keine fehlenden Handout-Abschnitte erkannt, R1/R2 bestätigt                                                                                    |
| Weitere Viewports / Browser-Druckdialog                   | Nein                 | Keine Wiederholung des berichteten Viewport-Audits. Der Druckaufruf lieferte in dieser Browserumgebung keine auswertbare Druckvorschau; kein eigener Nachweis der reparierten Druckausgabe                                                                              |
| PDF-Auslieferung über die Preview                         | Nicht bestätigt      | Beim Beispiel-Dialog zeigte «PDF öffnen» die Meldung «Download derzeit nicht verfügbar». Downloadversuche bei Radikaler Akzeptanz wurden abgebrochen; ein späterer Navigationsversuch wurde vom Browser blockiert. Ursache und Verbreitung nicht festgestellt; siehe T1 |
| Reparatur der Druckregeln                                 | Nur Quellprüfung     | Die globale Ausblendung aller `header` ist in `client/public/print.css` entfernt. Die Wirksamkeit im aktuellen Deploy wurde in diesem Review nicht selbst getestet                                                                                                      |
| PDF/UA, Matterhorn, reale Screenreader und Nutzendentests | Nein                 | Keine Konformitäts- oder Nutzungsgarantie aus Sichtprüfung, Textauszug oder vorhandenen Tags ableiten                                                                                                                                                                   |

Die Kernaussagen der geprüften Live-Webfassungen, Textbeschreibungen,
Web-Inhaltsquellen und exportierten Dateien stimmen überein. Die Dateien sind nicht wortgleich: Die Webfassung enthält
zusätzliche Erläuterungen. Die aufklappbaren Beschreibungen ordnen die
Darstellung zusammenfassend ein; die vollständigen Handlungs- und Beispielsätze
stehen zusätzlich als semantischer Webtext bereit.

Die im ersten Review beobachteten fehlenden Gesprächsschritte bezogen sich auf
die damals hochgeladenen Browser-Druckfassungen. In den jetzt tatsächlich
geprüften separaten V2-Handout-PDFs sind die Schritte und Beispielsätze
vollständig enthalten. Eine damalige Prüfung der V1-Originalhandouts wird
dadurch nicht nachträglich behauptet.

### Live-Nachprüfung am 04.10.2026

Nach erfolgreicher Anmeldung konnten die drei vorgesehenen Routen in der
Deploy-Preview #617 nacheinander direkt geprüft werden:

- `/materialien/text/radikale-akzeptanz`
- `/materialien/text/gespraeche-kippen`
- `/materialien/text/beispiel-dialog`

Die sichtbaren Darstellungen enthalten die zentralen Inhalte vollständig.
Freiwilligkeit, fehlende Rückkehrpflicht, vorsichtiges Spiegeln sowie die
Unterscheidung zwischen Gewalt und vermuteter unmittelbarer Selbstgefährdung
sind auch in den aufgeklappten Textbeschreibungen erhalten. Die Sichtprüfung
liefert keinen Ersatz für die vorgesehenen realen Screenreader- und Nutzendentests.

**T1 – PDF-Auslieferung erneut prüfen:** Beim Klick auf «PDF öffnen» auf der
Seite Beispiel-Dialog öffnete sich die Route
`/api/material-download/kommunizieren-beispiel-dialog?disposition=inline`
mit der sichtbaren Meldung «Download derzeit nicht verfügbar». Dies ist ein
zusätzlicher funktionaler Prüfpunkt vor Kennzeichnung oder Freigabe des Pakets.
Die geprüfte PDF-Datei im Repository ist vorhanden und vollständig; aus der
Meldung lässt sich weder eine fehlende Originaldatei noch die technische
Ursache ableiten. Ob andere Nutzer oder alle drei PDF-Routen betroffen sind,
wurde nicht nachgewiesen.

Bei Radikaler Akzeptanz waren zwei Downloadversuche erfolglos. Ein anschliessender
Navigationsversuch zur PDF-Route wurde durch die Browserumgebung blockiert.
Diese Beobachtungen werden nicht als weiterer bestätigter Websitefehler gewertet.
Die PDF-Auslieferung aller drei Blätter ist deshalb nach Klärung regulär
nachzuprüfen. Die separaten Original-PDFs wurden weiterhin anhand des geprüften
Repository-Commits bewertet; ein erfolgreicher Download aus der Live-Preview
wird nicht behauptet.

Die anfängliche Anmeldesperre ist für die Webprüfung überwunden. Der frühere
Vermerk «Deploy-Inhalt nicht eingesehen» ist durch diese Nachprüfung überholt.
Die Browser-Druckausgabe konnte in dieser Umgebung weiterhin nicht unabhängig
visuell geprüft werden. Es wurden ausschliesslich die Prüfnachweise ergänzt;
Inhalte, Assets und Freigabekennzeichen bleiben unverändert.

### Technische Nachweise

Zum geprüften PR-Head `47796aff30c69b43a0a6537e3c2fb8e6ea7a8541` wurden über
GitHub folgende Ergebnisse gelesen:

- [CI, Lauf 37169918865](https://github.com/christaegger-dot/borderline-angehoerige/actions/runs/37169918865): abgeschlossen, erfolgreich.
- [Visual Regression, Lauf 37169918867](https://github.com/christaegger-dot/borderline-angehoerige/actions/runs/37169918867): abgeschlossen, erfolgreich.
- Status `netlify/borderline-angehoerige/deploy-preview`: erfolgreich.
- PR #617: offen, Draft, nicht gemergt.

Die im PR genannten 424 Tests, zwölf Browserfälle und 414 interaktiven Elemente
wurden in diesem redaktionellen Review nicht erneut ausgeführt. Grüne Statuswerte
sind kein Nachweis einer fachlichen Freigabe oder einer eigenen Liveprüfung.

Das vorhandene VoiceOver-Protokoll nennt den älteren Commit
`5f1116db214177b6139c17794cf3a4c869b6bf31` und schliesst unter anderem die
menschliche auditive Bestätigung aus. Es ist kein erneuter realer
Screenreader-Nachweis für den hier geprüften V2-Inhaltsstand.

Die Behauptung, dass kein Produktionsdeployment stattgefunden hat, wurde hier
nicht durch eine separate Prüfung der Netlify-Produktionshistorie bestätigt.
Der PR ist nachweislich nicht gemergt; dieses Review führt keinen Merge und
keine Produktionsveröffentlichung aus.

### Fachliche Referenzen und Abgrenzung

Die Zuordnung der Notrufnummern und die Empfehlung, akute Suizidgefährdung
professionell beurteilen zu lassen, wurden am 04.10.2026 abgeglichen mit:

- [Kanton Zürich: Notfall & Rettung](https://www.zh.ch/de/gesundheit/notfall-rettung.html)
- [Kanton Zürich: Stopp Häusliche Gewalt](https://www.zh.ch/de/sicherheit-justiz/delikte-praevention/gewalt-extremismus/haeusliche-gewalt.html)
- [Suizidprävention Kanton Zürich: Notfallnummern Erwachsene](https://www.suizidpraevention-zh.ch/notfallnummern-erwachsene)

Die Akzeptanzdarstellung wurde zusätzlich gegen die im ersten Review
eingesehenen [Originalmaterialien zu Linehans DBT Skills Training Manual](https://www.guilford.com/add/linehan7_old/lin-p-4teaching.pdf?t=1)
plausibilisiert. Die angegebenen Bücher von Mason/Kreger und Fruzzetti wurden
in dieser Wiederprüfung nicht vollständig eingesehen. Es wird keine
seitengetreue Herleitung der konkreten Gesprächssätze aus diesen Büchern
bescheinigt. Die Kennzeichnung als eigene didaktische Darstellung ist deshalb
wesentlich; die endgültige fachliche Quellenbestätigung bleibt bei der
zuständigen Fachperson.

## Optionale redaktionelle Verfeinerungen

Diese Punkte sind keine zusätzlichen Freigabeblocker:

- Bei «Radikale Akzeptanz» überschneiden sich «Kraft für Handlungsspielraum
  bewahren» und «Mehr Handlungsspielraum gewinnen». Eine knappe Präzisierung
  könnte die Gegenüberstellung anschaulicher machen.
- Beim Beispiel-Dialog wäre «Wahrnehmen» als Bezeichnung des ersten Satzes
  genauer als «Verbinden». «Mögliche Gesprächssätze» würde zudem deutlicher
  machen, dass keine vollständig ausgespielte Unterhaltung mit Antworten des
  Gegenübers gezeigt wird.
- Bei «Wenn Gespräche kippen» könnte «Eigenes Tempo senken» die beabsichtigte
  Selbstregulation deutlicher benennen als das alleinstehende «Beruhigen».
