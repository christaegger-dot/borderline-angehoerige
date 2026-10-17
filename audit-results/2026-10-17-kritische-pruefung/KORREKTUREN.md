# Konkrete Korrekturvorschläge · Borderline – Orientierung für Angehörige

Bezugsstand `6ac0255c23d09e63aeb4b2485fdf417b701839de`. Dies sind prüfbare Vorschläge, keine bereits vorgenommenen Produktänderungen. Bei Export-Repositories immer die kanonische Quelle bearbeiten, danach kontrolliert bauen und nachtesten.

## A03-178 · P1 · Im Glossar fehlt die schriftliche Form für die gerichtliche Eingabe

**Fundstelle:** authoring/content/begriffe.html – #b-fu, Beispiel; Zeile 4

**Ist:** Das Beispiel sagt nur «Sie kann das Gericht anrufen; die Frist von zehn Tagen ist kurz.» Die ausführliche Antwort auf fragen.html nennt dagegen ausdrücklich «schriftlich». Art. 439 Abs. 1 ZGB verlangt eine schriftliche Anrufung.

**Auswirkung:** «Das Gericht anrufen» kann als Telefonat verstanden werden; unter Zeitdruck droht eine unwirksame Eingabe. Das ist ein bereits bekannter, weiterhin vorhandener Befund.

**Änderung:** Den bereits vorbereiteten Ersatz übernehmen und das Vorgehen sprachlich eindeutig als schriftliche Eingabe erklären; den Fristbeginn anhand der Rechtsmittelbelehrung klären lassen.

**Original:**

> Beispiel: Nach einer ärztlich angeordneten FU erhält eine nahestehende Person, wenn möglich, eine schriftliche Mitteilung. Sie kann das Gericht anrufen; die Frist von zehn Tagen ist kurz.

**Konkreter Textvorschlag:**

> Beispiel: Nach einer ärztlich angeordneten FU erhält eine nahestehende Person, wenn möglich, eine schriftliche Mitteilung. Diese Person kann innert zehn Tagen schriftlich das Gericht anrufen; die Frist ist kurz.

**Abnahme:** Glossar und Fragen nennen dieselbe schriftliche Form; ein Telefonat wird nicht als Rechtsmittel dargestellt; Bezug der handelnden Person eindeutig. Vor Veröffentlichung gezielte Gegenprüfung der Rechtsformulierung.

**Quelle:** Q-ZGB Art. 439 Abs. 1/2; fragen.html#f-einweisung; audit-results/2026-10-16-modul-03-r4-35/BEFUNDE.csv A03-178

**Einordnung:** Die Form ist am Gesetzestext belegt. Die Vorlage ist keine juristische Einzelfallberatung; für den konkreten Fristbeginn nicht allein auf den eigenen Posteingang abstellen.

## A01-1001 · P2 · Telefonverbot widerspricht der aktuellen Nutzervorgabe

**Fundstelle:** authoring/tools/contract.js – Zeilen 502–505; PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md, «Keine Krisenintervention»

**Ist:** Eine in-memory ergänzte gewöhnliche Beratungsnummer mit tel:-Link erzeugt zwei crisis-number-Blocker. Der unveränderte Ausgangsstand hat null Blocker. Die Regel untersagt alle Telefonnummern, nicht nur automatische Krisenkontakte.

**Auswirkung:** Nützliche reguläre Kontakte können nicht ergänzt werden, obwohl die Auftraggeberin sie ausdrücklich erlaubt.

**Änderung:** Aktuelle Regeln und Gate auf die Nutzervorgabe umstellen: reguläre Telefonnummern und tel:-Links erlauben; Krisenkontakte und ihre Platzierung je Thema bewusst wählen. Historische Entscheide als Herkunft erhalten, neue Vorgabe eindeutig vorrangig festhalten.

**Abnahme:** Gewöhnliche Beratungstelefone bestehen den Gate-Test ohne Notfall-Ausnahme; themenspezifische Krisenkontakte werden nur bei bewusst konfiguriertem Inhalt ausgegeben; keine automatisch ergänzten Notrufnummern.

**Quelle:** Q-NUTZER; authoring/tools/contract.js; scratch/audit4/borderline-angehoerige-phone.json

## A04-1001 · P2 · Globale Krisen- und Abgrenzungstexte machen die Fusszeile schwer

**Fundstelle:** authoring/site.config.json – footer Zeile 53; responsibility Zeile 74; Fusszeile jeder Seite

**Ist:** Die Fusszeile enthält auf jeder Seite den Akutwortlaut mit Polizei sowie zusätzlich «Die Fachstelle Angehörigenarbeit bietet keine Krisenintervention.» Bei 375 px ist sie rund 801 px hoch und umfasst 102 Wörter.

**Auswirkung:** Die wiederholten Krisenhinweise prägen auch ruhige Wissensseiten und passen schlecht zum gewünschten dezenten, psychoedukativen Auftritt.

**Änderung:** Eine kurze Fusszeile mit Fachstelle, Kontakt, Stand und rechtlichen Links entwerfen. Krisenhinweise gezielt in den zugehörigen Abschnitten belassen; den unnötigen globalen Abgrenzungssatz im Rahmen der neuen Wortlautentscheidung entfernen.

**Original:**

> Die Fachstelle Angehörigenarbeit bietet keine Krisenintervention.

**Konkreter Textvorschlag:**

> Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich
> Kontakt · Impressum und Datenschutz · Stand: Oktober 2026

**Abnahme:** Fusszeile enthält keine automatisch wiederholte Krisenanleitung; Kontakt und rechtliche Links bleiben gut erreichbar; die bestehenden akuten Handlungsanleitungen bleiben auf ihren Themenseiten erhalten.

**Quelle:** Q-NUTZER; authoring/site.config.json; visuelle Prüfung und footer.json

**Einordnung:** Gestaltungs- und Anforderungsbefund. Die Akuttexte selbst werden nicht als fachlich falsch bewertet. Der Ersatz ist ein Footer-Entwurf, kein neuer institutioneller Leistungsnachweis.

## R3C-A11 · P2 · Gate-Selbsttest ist noch auf fremde Seiten zugeschnitten

**Fundstelle:** authoring/tools/contract.js – selftest, ab Zeile 669; .github/workflows/verify-authoring.yml

**Ist:** Der aktuelle unveränderte Stand besteht 29 von 76 Selbsttestfällen. 44 weitere Mutationen sind wegen alter Seitenbezüge nicht anwendbar; drei weitere Fälle bestehen ebenfalls nicht. Die PR-CI führt nur den positiven Build-/Paritätslauf aus.

**Auswirkung:** Ein grüner Export prüft nicht zuverlässig, ob typische Fehler absichtlich zurückgewiesen werden. Die 47 Fälle sind kein Nachweis von 47 Fehlern der veröffentlichten Website.

**Änderung:** Mutationsfälle auf aktuelle Borderline-Seiten, Abschnitte und Freigabekonfiguration umstellen, fehlende negative Fälle eindeutig prüfen und den Selbsttest in die CI aufnehmen.

**Abnahme:** Jeder vorgesehene Mutationsfall verändert den richtigen aktuellen Ausgangsstand, erkennt die behauptete Fehlerklasse und läuft in CI; «nicht anwendbar» ist kein bestandener Schutztest. Positiver Build und 216 Suchfälle bleiben grün.

**Quelle:** PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md R3C-A11/R29-P11; gate-selftest.json

**Einordnung:** Bereits bekannt und bis 13.11.2026 terminiert; diese Frist ist heute nicht verletzt. Der Produktionsbuild selbst hat null Blocker und stimmt in 34 Dateien mit site/ überein.

## R29-P12 · P3 · Mobiler Kopfbereich beansprucht viel Platz

**Fundstelle:** authoring/css/site.css – mobiler Kopf und Navigation; R29-P12

**Ist:** Bei 375 px erscheint der Hauptinhalt erst etwa 454 px unter dem Seitenanfang. Die sechs Navigationspunkte und Absenderangaben benötigen viel Höhe. «Kurz und klar» und die Suche sind allerdings bereits im Kopf erreichbar.

**Auswirkung:** Längere wiederholte Navigation verdrängt den Lesestart. Es liegt keine vollständige Blockade des schnellen Einstiegs vor.

**Änderung:** Den kompakten mobilen Navigationsstil der Depression-Website als Variante prüfen; Kurzorientierung, Suche und Beratung gut erreichbar halten.

**Abnahme:** Kompakter mobiler Kopf bei 320/375 px und 200 % Text, bedienbares Menü mit Tastatur; keine verlorenen Einstiege. Keine Übernahme ohne Prüfung der unterschiedlichen Seitenstruktur.

**Quelle:** PENDENZEN-UND-ENTSCHEIDE-2026-10-13.md R29-P12; visuelle Prüfung

**Einordnung:** Bekannte, nicht blockierende Gestaltungsentscheidung; wird nicht als neue Pflicht zur Profilmigration eröffnet.

