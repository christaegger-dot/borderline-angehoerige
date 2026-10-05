# Entscheid zu Krisenwegen und Soforthilfe vom 06.10.2026

## Status

Dieser Text ist ein verbindlicher projektinterner Arbeitsentscheid für die
weitere Redaktion und Entwicklung von `borderline-angehoerige`. Er verhindert
bis zum institutionellen Grundsatzentscheid, dass widersprüchliche ältere
Projektregeln zu Soforthilfe, Notfallnummern und Notfallkarten weiter umgesetzt
werden.

Der Entscheid ist **keine institutionelle Publikationsfreigabe** und keine
klinische Fachfreigabe. Vor einer öffentlichen Freigabe bleiben die in diesem
Dokument genannten Prüfungen und eine namentlich verantwortete Freigabe nötig.

- Entscheiddatum: 06.10.2026
- Designgrundlage: PUK Zürich Website-Profil 1.10.1
- Variantenwahl: `/soforthilfe` = `direct`; alle nicht akuten Seiten =
  `persistent-subdued`
- Umsetzungsstatus: als projektinterne Grundlage bestätigt; Codeänderung folgt
  separat
- Inhaltsverantwortung: noch nicht namentlich zugeordnet; dies blockiert die
  öffentliche Veröffentlichung
- Freigabestatus: institutioneller Grundsatzentscheid, klinische Freigabe und
  Publikationsfreigabe offen; Issue #631 bleibt bis dahin offen

## Ausgangspunkt

Die Website ist ein psychoedukatives Informations- und Orientierungsangebot der
Fachstelle Angehörigenarbeit. Die Fachstelle bietet keine Krisenintervention an.
Ein ständig hervorgehobener Notfallauftritt auf allen Seiten kann die
psychoedukative Aufgabe überlagern und Menschen mit Borderline unnötig mit
Gefahr oder Krise verknüpfen. Zugleich muss ein sicherer Weg zu aktueller Hilfe
auffindbar bleiben.

Darum sollen Information und akute Hilfe klar getrennt werden: Die Lesestrecken
erklären und orientieren. Eine einzige, app-unabhängige Webseite soll die
fachlich geprüften Wege für akute Situationen bündeln.

## Verbindlicher Entscheid

### 1. Aufgabe und Sicherheitszugang

- Die Website nimmt keine Diagnose, Risikoeinschätzung oder Triage vor.
- `/soforthilfe` bleibt unter derselben Domain als technisch eigenständige,
  app-unabhängige Sicherheitsseite bestehen. Für diese Seite gilt die Variante
  `direct`. Die Seite vermittelt zu zuständigen Akutdiensten; die Fachstelle
  selbst bietet keine Krisenintervention.
- Auf psychoedukativen Seiten gilt die Variante `persistent-subdued` des
  PUK-Websiteprofils 1.10.1: ein stabiler, nummernfreier und visuell
  nachgeordneter Zugang zu `/soforthilfe` bleibt erreichbar.
- Der feste Hinweis mit Link im Footer ist die verbindliche Mindestplatzierung.
  Ein zusätzlicher normaler Textlink in der Navigation ist zulässig. Der Zugang
  darf nicht als roter oder gefüllter Hauptbutton erscheinen und nicht den
  ersten inhaltlichen Einstieg der Startseite bilden.
- Sicherheitshinweise dürfen nicht erst nach einer Auswahl, in einem Dialog,
  Filter oder geschlossenen Akkordeon erscheinen.

### 2. Fester Zuständigkeitshinweis

Der folgende Wortlaut wird als zentrale, wiederverwendete Fassung geführt:

> Die Fachstelle Angehörigenarbeit bietet Beratung und Orientierung, aber keine
> Krisenintervention. Bei akuter Gefahr oder wenn Sie die Dringlichkeit nicht
> sicher einschätzen können, wenden Sie sich an den zuständigen Notfalldienst.
> Hinweise zu passenden Anlaufstellen finden Sie unter «Akute Hilfe und
> Notfallkontakte».

«Akute Hilfe und Notfallkontakte» verlinkt auf `/soforthilfe`. Der Hinweis
enthält selbst keine Telefonnummer.

### 3. Telefonnummern und offizielle Links

- `client/src/data/kontakte.ts` ist die kanonische strukturierte Datenquelle für
  freigegebene Kontakte. `/soforthilfe` ist der einzige nutzerseitige
  Publikationsort für operative Notfall- und Krisenkontakte dieser Website.
  Generierung oder ein automatischer Paritätstest müssen Drift zwischen beiden
  verhindern.
- Auf psychoedukativen Seiten, in deren Textversionen, in Selbsttests und in
  Orientierungswerkzeugen werden keine Telefonnummern oder Kontaktlisten
  wiederholt. Sie verwenden bei Bedarf den festen Zuständigkeitshinweis oder
  einen nummernfreien Link zu `/soforthilfe`.
- Die staatlichen Notrufnummern `144` und `117` dürfen auf `/soforthilfe`
  direkt stehen. Für beide müssen eine amtliche Primärquelle und das Datum der
  letzten Prüfung sichtbar dokumentiert sein.
- Für veränderliche Angebote wie PUK-Dienste, Ärztefon, Telefonberatung oder
  Opferhilfe werden nach Möglichkeit die offiziellen Angebotsseiten verlinkt,
  statt Telefonnummern zu kopieren. Eine Nummer darf nur ausnahmsweise ergänzt
  werden, wenn Verantwortlichkeit, Primärquelle, Prüfdatum und Status im
  Kontaktregister vollständig sind.
- Ein überfälliger oder nicht belegbarer Kontakt wird bis zur erneuten Prüfung
  entfernt; er wird nicht aus Erinnerung ersetzt.
- Als bewusst strenge Projektregel werden alle auf `/soforthilfe`
  veröffentlichten Kontakte und Angebotslinks vor jedem öffentlichen Release
  und mindestens alle drei Monate geprüft. Eine überfällige Prüfung blockiert
  die Veröffentlichung.

### 4. Gewalt, Bedrohung und Opferhilfe

- Gewalt und Bedrohung werden anhand beobachtbarer Situationen beschrieben,
  nicht als Eigenschaft einer Diagnose oder Personengruppe.
- Bei unmittelbarer Gefahr gilt der zentrale Sicherheitsweg; bei medizinischer
  Dringlichkeit der zuständige Rettungsweg.
- Opferhilfe, Gewaltberatung und Forensic-Nursing-Angebote sind spezialisierte
  Schutz- und Beratungsangebote. Sie werden nicht als allgemeine
  Notrufkategorie bezeichnet.
- Gewaltbezogene psychoedukative Seiten erläutern Schutz und Abstand
  nummernfrei und verlinken auf die offizielle Angebotsseite beziehungsweise
  auf `/soforthilfe`.

### 5. Werkzeuge und Notfallkarten

- Der Situations-Wegweiser und der Krisenausgang des Selbsttests dürfen keine
  automatische Risikoeinstufung suggerieren. Vor einer öffentlichen Freigabe
  werden sie nummernfrei gestaltet und auf genau einen primären nächsten Weg
  reduziert.
- Die bisherige allgemeine Seite `/notfallkarte` wird im Folgepaket dauerhaft
  auf `/soforthilfe` umgeleitet. Sie bleibt weder eigenständige Kontaktquelle
  noch normaler Navigationseintrag.
- Das persönliche Werkzeug `/notfallkarte/erstellen` bleibt bis zu einer
  separaten klinischen, datenschutzrechtlichen und nutzerbezogenen Prüfung
  aus der öffentlichen Produktionsauslieferung ausgeschlossen und gibt dort
  `404` zurück. Es darf nur in einer geschützten Prüfumgebung direkt erreichbar
  sein. Es gibt keine zu migrierenden bereits gespeicherten Krisenpläne.
- Die statische Notfallkarte bleibt dauerhaft ausgemustert. Es werden keine
  PDF-, WebP-, Thumbnail- oder sonstigen herunterladbaren Ableitungen neu
  erstellt.
- `soforthilfe-print.html` und die aktuellen statischen Notfallplan-Assets mit
  kopierten operativen Kontakten sind zusätzliche Veraltungsvektoren. Sie
  werden im Folgepaket aus der Veröffentlichung entfernt. Eine nummernfreie
  psychoedukative Text- oder Visualfassung kann nach separater fachlicher
  Prüfung neu beurteilt werden.

## Inhaltsverantwortung und Freigabe

Vor einer Veröffentlichung von `/soforthilfe` müssen dokumentiert sein:

- namentlich verantwortete fachliche Prüfung;
- technische Pflegeverantwortung;
- Primärquelle, Prüfdatum und Status jedes veröffentlichten Kontakts;
- Prüfung der nicht stigmatisierenden Wirkung aus betroffener und angehöriger
  Perspektive;
- Link-, Tastatur-, Screenreader- und Geräteprüfung.

Bis diese Angaben vollständig sind, ist der Projektstand nicht öffentlich
freigegeben.

## Verhältnis zu älteren Dokumenten

Dieser Arbeitsentscheid setzt widersprechende Projektanweisungen bis zum
institutionellen Grundsatzentscheid ausser Kraft, insbesondere:

- die pauschale Pflicht, auf jeder Krisenseite Soforthilfe oder Nummern zu
  wiederholen;
- die Führung von `/notfallkarte` als zusätzliche operative Kontaktoberfläche;
- Freigabe- oder Prüflisten, die lokale Notfall-PDFs voraussetzen;
- ältere Kontaktinventare als Beleg für aktuelle Erreichbarkeit.

Weiterhin gültig bleiben:

- Sicherheit vor Erklärung;
- keine Ableitung von Gewalt, Gefährlichkeit oder Motiven aus einer Diagnose;
- keine alleinige Überwachungs-, Rettungs- oder Behandlungsverantwortung für
  Angehörige;
- Schutz, Abstand und professionelle Hilfe bei Gewalt oder Bedrohung;
- keine neue statische Notfallkarte.

Historische Protokolle bleiben als Nachweis erhalten und werden mit einem
Hinweis auf diesen neueren Entscheid versehen.

## Getrenntes Folgepaket

Die Umsetzung in Navigation, Seiten, Werkzeugen, Kontaktregister, Assets und
Tests erfolgt in einem eigenen Issue und PR. Dieser Governance-Entscheid ändert
noch keinen Code und ist kein Publikationsentscheid.
