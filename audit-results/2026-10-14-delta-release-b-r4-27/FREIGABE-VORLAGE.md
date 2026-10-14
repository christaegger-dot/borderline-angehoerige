# Freigabevorlage Release B (r4-27)

Stand: 14. Oktober 2026, Branch `claude/release-b-r4-27-1792000693`, Commit `45ae850`, Vergleich mit `origin/main` (r4-26).

Diese Vorlage zeigt jeden neuen oder geänderten Wortlaut von Release B im sichtbaren Text der Website, je Seite in der Reihenfolge auf der Seite. Durchgestrichen steht der bisherige Wortlaut, darunter der neue. Listenpunkte erscheinen als eigene Zeilen. Ein Absatz mit Verweis enthält nur den Linktext, nicht die Linkadresse.

Für Paket 3 (Schweizer Recht) gibt es keine Prüfung durch den Rechtsdienst. Die Auftraggeberin hat am 14. Oktober 2026 entschieden, Paket 3 in Release B selbst freizugeben («In Release B, ich gebe frei»). Die rechtlichen Fassungen wurden gegen den Gesetzeswortlaut (ZGB Stand 1. Juli 2026, GSG und EG KESR Zürich) und in einer unabhängigen Prüfung kontrolliert. Das ersetzt keine juristische Prüfung.

Betroffene rechtliche Stellen: «Fragen und Nachschlagen» › «Wann ist eine Einweisung nötig?»; «Behandlung» › «Wann Sie Auskunft erhalten können» und die Ersatzformulierungen für «andere Rechtsgrundlage»; «Grenzen» › «Schutz durch die Polizei» und der Gewaltbegriff; «Ihre Rolle» › Beistandschaft; «Genesung» › Verweis; Glossar «Fürsorgerische Unterbringung (FU)», «Urteilsfähigkeit», «Vertrauensperson».

Weitere Änderungen ausserhalb des Wortlauts:

- Neue Abbildung 1 auf «Genesung» (Vergleich, `visualPlan` `v-ge-forschung`); die frühere Abbildung 2 «Verschiedene Einflüsse, ein individueller Weg» entfällt; «Ein neuer Trieb» heisst jetzt Abbildung 2. Die Abbildung braucht nach Profil zusätzlich R2.
- Suchaliase für neue Inhalte (Gewaltschutz, FU und Rechte, Auskunft und Beistandschaft, Häufigkeit, andere Kantone, Family Connections).
- Zwei neue Angebote mit Prüfdatum 14. Oktober 2026 (NAP, iks) in `serviceReview.requiredIds`; ipw neu geprüft.
- 16 nicht zitierte Einträge aus dem Quellenverzeichnis in `authoring/QUELLEN-HINTERGRUND.md` (nicht veröffentlicht).

## Borderline verstehen (`verstehen`)

**Bisher:**

> ~~Die Diagnose Borderline-Persönlichkeitsstörung kann unter anderem beschreiben: sehr starke oder schnell wechselnde Gefühle und Schwierigkeiten mit der inneren Stabilität, mit dem Bild von sich selbst oder mit Beziehungen. Manche zeigen starke Gefühle nach aussen. Andere erleben sie eher nach innen oder ziehen sich zurück. Kein einzelnes Merkmal trifft auf alle zu, und ähnliche Erfahrungen gibt es auch ohne diese Diagnose.~~

**Neu:**

> Die Diagnose Borderline-Persönlichkeitsstörung beschreibt ein anhaltendes Muster von Schwierigkeiten mit Gefühlen, Beziehungen, dem Bild von sich selbst und Impulsen. Häufig sind:
>
> grosse Angst, verlassen zu werden, und intensive, wechselhafte Beziehungen
>
> heftige, rasch wechselnde Gefühle und starke Wut
>
> ein unsicheres Bild von sich selbst und ein Gefühl innerer Leere
>
> impulsives Handeln, etwa beim Geldausgeben, beim Essen oder mit Alkohol oder Drogen
>
> Selbstverletzungen, Suizidgedanken oder Suizidversuche
>
> unter starkem Stress Misstrauen oder das Gefühl, neben sich zu stehen
>
> Manche zeigen starke Gefühle nach aussen, andere erleben sie eher nach innen oder ziehen sich zurück. Kein einzelnes Merkmal trifft auf alle zu, und ähnliche Erfahrungen gibt es auch ohne diese Diagnose. Für die Diagnose prüfen Fachpersonen neun Kriterien. Borderline betrifft etwa 1 bis 2 von 100 Erwachsenen.

**Bisher:**

> ~~Borderline hat nicht eine einzige Ursache. Mehrere Dinge wirken zusammen: eine biologische Empfindlichkeit, Erfahrungen in engen Beziehungen und beim Aufwachsen sowie Belastungen. Die Schuld bei der betroffenen Person oder bei Angehörigen zu suchen, ist zu einfach.~~

**Neu:**

> Borderline hat nicht eine einzige Ursache. Mehrere Dinge wirken zusammen: eine biologische Empfindlichkeit, Erfahrungen in engen Beziehungen und beim Aufwachsen sowie Belastungen. Niemand ist schuld an der Erkrankung: weder die betroffene Person noch ihre Angehörigen.

**Bisher:**

> ~~Eigene didaktische Darstellung; Bezug: Linehan (1993).~~

**Neu:**

> Eigene didaktische Darstellung; Bezug: Haltung des Nicht-Wissens nach Bateman und Fonagy (2013).

**Quellenblock «Quellen zu dieser Seite»:**

- neu oder geändert: American Psychiatric Association (2022), DSM-5-TR Verwendet in: «Was die Diagnose beschreiben kann» (Kernmerkmale in Alltagssprache, neun Kriterien)
- neu oder geändert: Bateman und Fonagy (2013) Verwendet in: «Beobachten, nicht Gedanken lesen» (Abbildung 1: Haltung des Nicht-Wissens, offen nachfragen)
- neu oder geändert: Ellison et al. (2018) Verwendet in: «Was die Diagnose beschreiben kann» (Häufigkeit in der Bevölkerung)
- neu oder geändert: Gunderson et al. (2018) Verwendet in: «Was die Diagnose beschreiben kann» (Häufigkeit in der Bevölkerung)
- neu oder geändert: Leichsenring et al. (2024) Verwendet in: «Was die Diagnose beschreiben kann» (Häufigkeit in der Bevölkerung)
- neu oder geändert: Linehan (1993) Verwendet in: «Was die Diagnose beschreiben kann», «Wenn die Anspannung steigt», «Wenn Bewertungen einseitiger werden»
- entfernt oder ersetzt: ~~Linehan (1993) Verwendet in: «Was die Diagnose beschreiben kann», «Beobachten, nicht Gedanken lesen», «Wenn die Anspannung steigt», «Wenn Bewertungen einseitiger werden»~~

## Diagnose und Begleiterkrankungen (`diagnose`)

**Bisher:**

> ~~Für die stationäre medizinische Statistik gilt in der Schweiz 2026 weiterhin die ICD-10-GM 2024. Deshalb kann in entsprechenden Unterlagen der Code F60.31 erscheinen. Das ist eine begrenzte Vorgabe für die stationäre Kodierung. Diese Vorgabe bedeutet nicht, dass ICD-10-GM, DSM-5-TR und ICD-11 inhaltlich gleich aufgebaut sind oder in jedem Behandlungsrahmen identisch verwendet werden.~~

**Neu:**

> Für die stationäre medizinische Statistik gilt in der Schweiz 2026 weiterhin die ICD-10-GM 2024. In Berichten kann deshalb «Emotional instabile Persönlichkeitsstörung, Borderline-Typ» mit dem Code F60.31 stehen; gemeint ist die Borderline-Persönlichkeitsstörung.

**Bisher:**

> ~~In Studien werden unter anderem diese Begleiterkrankungen beschrieben. Die Reihenfolge ist keine Rangfolge.~~

**Neu:**

> In Studien werden unter anderem diese Begleiterkrankungen beschrieben:

**Bisher:**

> ~~Häufigkeitsangaben unterscheiden sich je nach Stichprobe, Erhebungszeitraum und Diagnoseverfahren. Die Liste sagt deshalb nichts über die Wahrscheinlichkeit bei einer einzelnen Person aus.~~

**Neu:**

> Depressionen und Angststörungen gehören zu den häufigsten Begleiterkrankungen. In Studien mit Menschen, die stationär behandelt wurden, hatten fast alle im Lauf des Lebens auch eine Depression oder eine andere Stimmungserkrankung, die meisten auch eine Angststörung. Wenn sich Borderline bessert, gehen oft auch die Begleiterkrankungen zurück.

**Bisher:**

> ~~Depressive Erkrankungen werden in Studien zu Borderline häufig beschrieben. Die älteren Studien dazu untersuchten Menschen, die zu Beginn stationär behandelt wurden. Die Befunde dieser Studien zeigen nicht, wie häufig Depressionen bei allen Menschen mit Borderline sind, und sie sind keine persönliche Prognose.~~

**Quellenblock «Quellen zu dieser Seite»:**

- neu oder geändert: Bundesinstitut für Arzneimittel und Medizinprodukte (2023), ICD-10-GM Version 2024 Verwendet in: «Der Weg zur Abklärung» (Bezeichnung «Emotional instabile Persönlichkeitsstörung, Borderline-Typ», F60.31)
- neu oder geändert: Zanarini et al. (1998) Verwendet in: «Begleiterkrankungen» (Depressionen und Angststörungen gehören zu den häufigsten Begleiterkrankungen; im Lebensverlauf fast alle mit einer Stimmungserkrankung, die meisten mit einer Angststörung)
- neu oder geändert: Zanarini et al. (2004) Verwendet in: «Begleiterkrankungen» (Rückgang der Begleiterkrankungen, wenn sich Borderline bessert)
- entfernt oder ersetzt: ~~Zanarini et al. (1998) Verwendet in: «Begleiterkrankungen» (Depression)~~
- entfernt oder ersetzt: ~~Zanarini et al. (2004) Verwendet in: «Begleiterkrankungen» (Depression)~~

## Behandlung und Ihre Rolle darin (`behandlung`)

**Neu:**

> Borderline ist behandelbar. Mittel der Wahl ist eine auf Borderline ausgerichtete Psychotherapie.

**Bisher:**

> ~~Sie dürfen konkrete Beobachtungen mitteilen; vertrauliche Auskünfte setzen in der Regel eine Einwilligung oder andere Rechtsgrundlage voraus.~~

**Neu:**

> Sie dürfen konkrete Beobachtungen mitteilen; vertrauliche Auskünfte setzen in der Regel eine Einwilligung der betroffenen Person voraus.

**Bisher:**

> ~~Informationen über Diagnose, Sitzungen oder Verlauf dürfen grundsätzlich nur mit entsprechender Einwilligung oder einer anderen Rechtsgrundlage weitergegeben werden. Eine Mitteilung an das Team hebt die Schweigepflicht nicht auf. Besprechen Sie, welche Informationen für Ihre vereinbarte Unterstützung nötig sind und welche Einwilligung dafür vorliegt.~~

**Neu:**

> Informationen über Diagnose, Sitzungen oder Verlauf dürfen grundsätzlich nur weitergegeben werden, wenn die betroffene Person einwilligt oder das Gesetz es vorsieht. Welche Fälle das sind, steht unten unter «Wann Sie Auskunft erhalten können». Eine Mitteilung an das Team hebt die Schweigepflicht nicht auf. Besprechen Sie, welche Informationen für Ihre vereinbarte Unterstützung nötig sind und welche Einwilligung dafür vorliegt.

**Bisher:**

> ~~Grundsätzlich nur mit entsprechender Einwilligung oder einer anderen Rechtsgrundlage. Die konkrete Situation muss geklärt werden.~~

**Neu:**

> Grundsätzlich nur mit Einwilligung der betroffenen Person oder wenn das Gesetz es vorsieht.

**Bisher:**

> ~~Die Darstellung zeigt Grundsätze, keine abschliessende Beurteilung eines Einzelfalls. Einwilligung, Urteilsfähigkeit, gesetzliche Vertretung und andere Rechtsgrundlagen können relevant sein. Bei möglicher akuter Gefahr holen Sie sofort Hilfe und warten nicht auf eine E-Mail-Antwort.~~
>
> ~~Zwei getrennte Informationswege: Angehörige können dem Behandlungsteam konkrete eigene Beobachtungen und ihren Unterstützungsbedarf mitteilen. Vertrauliche Auskünfte vom Behandlungsteam an Angehörige setzen grundsätzlich eine entsprechende Einwilligung oder eine andere Rechtsgrundlage voraus. Eigene Angehörigenberatung ist unabhängig davon möglich.~~

**Neu:**

> Die Darstellung zeigt Grundsätze, keine abschliessende Beurteilung eines Einzelfalls. Wann Auskünfte möglich sind, steht unter «Wann Sie Auskunft erhalten können». Bei möglicher akuter Gefahr holen Sie sofort Hilfe und warten nicht auf eine E-Mail-Antwort.
>
> Zwei getrennte Informationswege: Angehörige können dem Behandlungsteam konkrete eigene Beobachtungen und ihren Unterstützungsbedarf mitteilen. Vertrauliche Auskünfte vom Behandlungsteam an Angehörige setzen grundsätzlich eine Einwilligung der betroffenen Person oder eine gesetzliche Grundlage voraus. Eigene Angehörigenberatung ist unabhängig davon möglich.

**Neu:**

> Wann Sie Auskunft erhalten können
>
> Vertrauliche Auskünfte über die Behandlung sind vor allem in diesen Fällen möglich:
>
> Mit Einwilligung: Die urteilsfähige Person entbindet das Behandlungsteam von der Schweigepflicht, ganz oder für bestimmte Fragen.
>
> Als Vertrauensperson: Wer fürsorgerisch untergebracht ist, kann eine Vertrauensperson beiziehen, zum Beispiel Sie. Die Ärztin oder der Arzt zieht sie bei der Erstellung des Behandlungsplans bei und informiert sie über die geplanten Massnahmen.
>
> Als vertretungsberechtigte Person: Ist die Person für eine medizinische Entscheidung nicht urteilsfähig und hat sie sich dazu nicht in einer Patientenverfügung geäussert, plant die Ärztin oder der Arzt die Behandlung mit der vertretungsberechtigten Person und informiert sie. Wer vertreten darf, legt das Gesetz in dieser Reihenfolge fest:
>
> eine in der Patientenverfügung oder im Vorsorgeauftrag bezeichnete Person
>
> eine Beiständin oder ein Beistand mit Vertretungsrecht bei medizinischen Massnahmen
>
> Ehe- oder eingetragene Partnerinnen und Partner, wenn sie mit der Person zusammenleben oder ihr regelmässig persönlich beistehen
>
> wer mit der Person zusammenlebt und ihr regelmässig persönlich beisteht, etwa eine Lebenspartnerin oder ein Lebenspartner
>
> die Nachkommen, danach die Eltern, danach die Geschwister, wenn sie der Person regelmässig persönlich beistehen
>
> Eine Ausnahme gilt, wenn eine nicht urteilsfähige Person wegen einer psychischen Störung in einer psychiatrischen Klinik behandelt wird: Dann gelten die Regeln der fürsorgerischen Unterbringung. Den Behandlungsplan erstellt die Ärztin oder der Arzt dann mit der Person und gegebenenfalls ihrer Vertrauensperson.
>
> Als Eltern eines minderjährigen Kindes: Ist das Kind für die konkrete Frage nicht urteilsfähig, vertreten Sie es im Rahmen der elterlichen Sorge. Ein urteilsfähiges Kind entscheidet selbst und hat ein Recht auf Vertraulichkeit, auch gegenüber den Eltern.
>
> Als Beiständin oder Beistand: Massgebend ist Ihr Auftrag von der KESB. Ist die Person urteilsfähig, entscheidet sie selbst, wer Auskunft erhält. Ist sie nicht urteilsfähig, erhalten Sie Auskünfte zur Behandlung, wenn Ihr Auftrag die Vertretung bei medizinischen Massnahmen umfasst.
>
> Fragen Sie das Behandlungsteam, welche Grundlage in Ihrer Situation gilt.

**Bisher:**

> ~~Bitten Sie mit Einwilligung der betroffenen Person um die Informationen, die Sie für Ihre vereinbarte Rolle brauchen. Ohne entsprechende Einwilligung oder andere Rechtsgrundlage besteht kein allgemeiner Anspruch auf vertrauliche Behandlungsinformationen oder den Austrittsbericht. Ihre eigene Belastungsgrenze dürfen Sie trotzdem benennen.~~

**Neu:**

> Bitten Sie mit Einwilligung der betroffenen Person um die Informationen, die Sie für Ihre vereinbarte Rolle brauchen. Ohne Einwilligung besteht, ausser in den unter «Wann Sie Auskunft erhalten können» genannten Fällen, kein allgemeiner Anspruch auf vertrauliche Behandlungsinformationen oder den Austrittsbericht. Ihre eigene Belastungsgrenze dürfen Sie trotzdem benennen.

**Bisher:**

> ~~Ich bin [Beziehung zu Vorname, z. B. Mutter, Vater oder Partnerin] von [Vorname]. Mir ist bewusst, dass Sie ohne entsprechende Einwilligung oder andere Rechtsgrundlage keine vertraulichen Behandlungsauskünfte weitergeben dürfen. Ich möchte meine eigenen Beobachtungen mitteilen und klären, welche Unterstützung ich anbieten kann. Ist dafür ein Gespräch möglich, oder können Sie mir eine Angehörigenberatung nennen? Bitte teilen Sie mir mit, welcher Kontaktweg dafür geeignet ist.~~

**Neu:**

> Ich bin [Beziehung zu Vorname, z. B. Mutter, Vater oder Partnerin] von [Vorname]. Mir ist bewusst, dass Sie ohne Einwilligung von [Vorname] keine vertraulichen Behandlungsauskünfte weitergeben dürfen. Ich möchte meine eigenen Beobachtungen mitteilen und klären, welche Unterstützung ich anbieten kann. Ist dafür ein Gespräch möglich, oder können Sie mir eine Angehörigenberatung nennen? Bitte teilen Sie mir mit, welcher Kontaktweg dafür geeignet ist.

**Bisher:**

> ~~Mehrere strukturierte Psychotherapien können bei Borderline helfen. Für viele Einzelvergleiche sind die Forschungsergebnisse nur begrenzt sicher, und es gibt keine Methode, die für alle Menschen die beste ist.~~

**Neu:**

> Borderline ist behandelbar. Mittel der Wahl ist eine strukturierte Psychotherapie, die auf Borderline ausgerichtet ist. Sie verringert in Studien die Schwere der Beschwerden. Keines der folgenden Verfahren hat sich dabei als klar überlegen erwiesen.

**Bisher:**

> ~~Nach der britischen Behandlungsleitlinie NICE sollen Medikamente nicht gezielt zur Behandlung von Borderline selbst oder ihrer einzelnen Kernsymptome eingesetzt werden. Bei einer zusätzlichen Depression kann eine Kombination aus einem Antidepressivum und psychologischer Behandlung erwogen werden. Ob ein Medikament passt, wird individuell mit der behandelnden ärztlichen Fachperson geklärt. Medikamente werden nur gemeinsam mit der behandelnden ärztlichen Fachperson geändert.~~

**Neu:**

> Es gibt kein Medikament, das Borderline selbst behandelt. Bei Begleiterkrankungen können Medikamente helfen, bei einer zusätzlichen Depression etwa ein Antidepressivum zusammen mit psychologischer Behandlung. Ob ein Medikament passt, klärt die behandelnde ärztliche Fachperson. Geändert oder abgesetzt wird es nur in Absprache mit ihr.

**Bisher:**

> ~~Psychoedukative Angehörigenprogramme vermitteln verständliche Informationen zur Erkrankung und zum Umgang damit. Diese Programme können entlastende Unterstützung bieten und sind fachlich beschrieben.~~
>
> ~~Family Connections ist ein solches Programm für Angehörige von Menschen mit Borderline. Dazu liegen inzwischen auch Daten aus einer randomisierten Studie vor: Die Studie von 2024 fand keinen statistisch signifikanten Vorteil gegenüber einer aktiven Vergleichsbehandlung. Daraus folgt weder gesicherte Überlegenheit noch Gleichwertigkeit. Eine Beobachtungsstudie aus Frankreich und der Schweiz berichtete Verbesserungen nach dem Programm, kann deren Ursache aber nicht eindeutig dem Programm zuordnen.~~
>
> ~~Ob ein Programm in Ihrer Nähe angeboten wird, ist getrennt von der Wirksamkeit zu klären. Angebote für Austausch mit anderen Angehörigen stehen auf der Seite «Unterstützung finden» im Abschnitt «Austausch mit anderen Angehörigen».~~

**Neu:**

> Psychoedukative Angehörigenprogramme vermitteln verständliche Informationen zur Erkrankung und zum Umgang damit. In Studien berichteten Teilnehmende danach oft weniger Belastung.
>
> Family Connections ist ein solches Programm für Angehörige von Menschen mit Borderline. Ob es besser wirkt als ähnlich aufgebaute Programme, ist noch offen. In der Schweiz wurde es bisher, soweit bekannt, nur auf Französisch angeboten, etwa in Genf und Freiburg.
>
> Deutschsprachige Angebote für Information und Austausch gibt es im Kanton Zürich zum Beispiel mit der Gruppe der PUK für Eltern von Jugendlichen mit Borderline und den Beratungs-Treffpunkten der VASK Zürich. Beide stehen auf der Seite «Unterstützung finden» im Abschnitt «Austausch mit anderen Angehörigen».

**Bisher:**

> ~~Psychotherapiestation für junge Erwachsene. Die aktuellen Alters- und Aufnahmebedingungen sind direkt beim Anbieter zu klären.~~

**Neu:**

> Psychotherapiestation für junge Erwachsene in Lebenskrisen, zum Beispiel bei Depressionen oder Persönlichkeitsstörungen. Zu den Schwerpunkten gehört der Umgang mit starken Gefühlen, Impulsen und innerer Leere; zum Angebot gehört ein DBT-Programm. Borderline wird nicht eigens genannt. Die aktuellen Alters- und Aufnahmebedingungen sind direkt beim Anbieter zu klären.

**Bisher:**

> ~~Stationäre Psychotherapie~~

**Neu:**

> Stationäre Psychotherapie mit DBT-Programm

**Bisher:**

> ~~Angaben und Link geprüft: 13. Oktober 2026~~

**Neu:**

> Angaben und Link geprüft: 14. Oktober 2026

**Quellenblock «Quellen zu dieser Seite»:**

- neu oder geändert: Bundesamt für Gesundheit (laufend), Neuregelung der psychologischen Psychotherapie Verwendet in: «Kein Therapieplatz oder lange Wartezeit» (ärztliche Anordnung für psychologische Psychotherapie)
- neu oder geändert: Cohen et al. (2024) Verwendet in: «Therapieformen» (Vertiefung «Programme für Angehörige»: Family Connections in Frankreich und der Schweiz, in der Schweiz auf Französisch)
- neu oder geändert: Guillén et al. (2021) Verwendet in: «Therapieformen» (Vertiefung «Programme für Angehörige»: systematische Übersicht, ermutigende Ergebnisse zur Belastung)
- neu oder geändert: Guillén et al. (2024) Verwendet in: «Therapieformen» (Vertiefung «Programme für Angehörige»: Vergleich mit einem ähnlich aufgebauten Programm, Überlegenheit offen)
- neu oder geändert: Hoffman et al. (2005) Verwendet in: «Therapieformen» (Vertiefung «Programme für Angehörige»: weniger Belastung nach Family Connections)
- neu oder geändert: Leichsenring et al. (2024) Verwendet in: «Therapieformen» (Psychotherapie als Behandlung der Wahl, kein Verfahren klar überlegen; kein Medikament für Borderline selbst)
- neu oder geändert: Schweizerisches Zivilgesetzbuch (ZGB, SR 210), Art. 19c, 304, 377, 378, 380, 432 und 433 Verwendet in: «Kontakt zum Behandlungsteam» (Zwischentitel «Wann Sie Auskunft erhalten können»)
- neu oder geändert: Storebø et al. (2020) Verwendet in: «Therapieformen» (Cochrane-Review: Psychotherapie verringert die Schwere der Beschwerden, keine klare Rangfolge der Verfahren)
- entfernt oder ersetzt: ~~Cohen et al. (2024) Verwendet in: «Therapieformen» (Vertiefung «Programme für Angehörige»: Beobachtungsstudie aus Frankreich und der Schweiz)~~
- entfernt oder ersetzt: ~~Guillén et al. (2021) Verwendet in: «Therapieformen» (Vertiefung «Programme für Angehörige»: systematische Übersicht zu Angehörigeninterventionen)~~
- entfernt oder ersetzt: ~~Guillén et al. (2024) Verwendet in: «Therapieformen» (Vertiefung «Programme für Angehörige»: Family Connections im randomisierten Vergleich mit aktiver Behandlung)~~
- entfernt oder ersetzt: ~~Hoffman et al. (2005) Verwendet in: «Therapieformen» (Vertiefung «Programme für Angehörige»: Family Connections)~~
- entfernt oder ersetzt: ~~Storebø et al. (2020) Verwendet in: «Therapieformen» (Cochrane-Review zu psychologischen Therapien bei Borderline)~~

## Genesung (`genesung`)

**Bisher:**

> ~~Die Zahlen sagen, wie viele Menschen irgendwann in den zehn Jahren eine solche Besserung erreicht haben. Sie sagen nicht, wie vielen es am Ende der Studie dauerhaft gut ging.~~

**Neu:**

> Die Zahlen sagen, wie viele Menschen irgendwann in den zehn Jahren eine solche Besserung erreicht haben. Nicht alle Beschwerden bessern sich gleich schnell, siehe Abbildung 1. Eine Besserung kann wieder verloren gehen. Über 24 Jahre ging in derselben Studie die Recovery häufiger wieder verloren als die Remission.

**Bisher:**

> ~~Eine zu Beginn stationär behandelte Gruppe bildet nicht alle Menschen mit Borderline ab.~~

**Neu:**

> Eine zu Beginn stationär behandelte Gruppe bildet nicht alle Menschen mit Borderline ab. In einer zweiten Langzeitstudie, auch mit ambulant behandelten Menschen, erreichten 85 % eine Remission.
>
> Abbildung 1 · Was sich oft zuerst bessert, was länger bleibt
>
> Oft bessern sich zuerst Selbstverletzungen und impulsive Handlungen. Belastende Gefühle wie Wut, Leere oder Einsamkeit bleiben häufig länger.
>
> Eine ruhigere Phase heisst deshalb nicht, dass alles überstanden ist, und schwierige Gefühle, die bleiben, heissen nicht, dass nichts erreicht wurde.
>
> Bessert sich oft früher
>
> Impulsive Handlungen
>
> Zum Beispiel
>
> Selbstverletzungen, Suizidversuche und andere impulsive Handlungen
>
> Im Verlauf
>
> gingen in der Studie am schnellsten zurück
>
> Bleibt oft länger
>
> Belastende Gefühle und Beziehungsängste
>
> Zum Beispiel
>
> Wut, Gefühle von Leere und Einsamkeit, Angst vor dem Verlassenwerden und Mühe, allein zu sein
>
> Im Verlauf
>
> gingen ebenfalls deutlich zurück, aber langsamer
>
> Grenzen der Darstellung
>
> Das Muster stammt aus der Zehnjahresstudie mit 290 zu Beginn stationär behandelten Menschen. Die zweite Langzeitstudie fand dagegen, dass alle neun Diagnosekriterien ähnlich schnell zurückgingen. Die Abbildung zeigt deshalb ein Muster aus einer Studie, keinen festen Ablauf und keine persönliche Prognose.
>
> Zwei Spalten. Links «Bessert sich oft früher»: Selbstverletzungen, Suizidversuche und andere impulsive Handlungen gingen in der Studie am schnellsten zurück. Rechts «Bleibt oft länger»: Wut, Gefühle von Leere und Einsamkeit, Angst vor dem Verlassenwerden und Mühe, allein zu sein, gingen ebenfalls deutlich zurück, aber langsamer.
>
> Eigene didaktische Darstellung nach Zanarini et al. (2007); Grenzen nach Gunderson et al. (2011).

**Bisher:**

> ~~Abbildung 1 · Ein neuer Trieb~~

**Neu:**

> Abbildung 2 · Ein neuer Trieb

**Bisher:**

> ~~Abbildung 2 · Verschiedene Einflüsse, ein individueller Weg~~
>
> ~~Genesung hängt nicht von einem einzelnen Bereich ab.~~
>
> ~~Die fünf Bereiche können unterschiedlich bedeutsam sein. Die Darstellung hat keine Rangfolge, ist keine Formel und erlaubt keine persönliche Prognose.~~
>
> ~~Individueller Weg~~

**Neu:**

> Mittel der Wahl ist eine auf Borderline ausgerichtete Psychotherapie, eingebettet in einen personenzentrierten Behandlungsplan.

**Bisher:**

> ~~Gewählte Beziehungen und Unterstützung~~
>
> ~~Lebensbedingungen und Teilhabe~~
>
> ~~Zeit und individueller Verlauf~~
>
> ~~Grenzen der Darstellung~~
>
> ~~Die Bereiche wirken nicht bei allen Menschen gleich und sind keine abgeschlossene Liste. Die betroffene Person bestimmt ihre Ziele. Angehörige müssen keinen Bereich herstellen oder Genesung absichern.~~
>
> ~~Um den Ausdruck «Individueller Weg» stehen fünf gleichwertige Bereiche ohne Pfeile und ohne Rangfolge: strukturierte Behandlung, körperliche und psychische Gesundheit, gewählte Beziehungen und Unterstützung, Lebensbedingungen und Teilhabe sowie Zeit und individueller Verlauf. Die Zusammenstellung ist keine Formel und keine persönliche Prognose.~~
>
> ~~Eigene didaktische Darstellung auf Grundlage der in diesem Abschnitt genannten Leitlinien.~~
>
> ~~Strukturierte Behandlung~~
>
> ~~Ein personenzentrierter Behandlungsplan und eine strukturierte Psychotherapie können zentrale Bestandteile der Behandlung sein.~~
>
> ~~Körperliche und psychische Gesundheit~~
>
> ~~Körperliche Beschwerden und weitere psychische Erkrankungen werden ebenfalls behandelt, bei Bedarf auch mit Medikamenten. Für Borderline selbst sind Medikamente keine Kernbehandlung. Medikamente werden nur gemeinsam mit der behandelnden ärztlichen Fachperson geändert.~~

**Neu:**

> Körperliche Beschwerden und weitere psychische Erkrankungen werden ebenfalls behandelt, bei Bedarf auch mit Medikamenten. Es gibt kein Medikament, das Borderline selbst behandelt. Medikamente werden nur gemeinsam mit der behandelnden ärztlichen Fachperson geändert.

**Bisher:**

> ~~Allgemeine Beratung ist auch ohne Zustimmung der betroffenen Person möglich. Vertrauliche Auskünfte über ihre Behandlung gibt es grundsätzlich nur mit ihrer Einwilligung oder einer anderen Rechtsgrundlage. Auch urteilsfähige Minderjährige haben ein eigenes Recht auf Vertraulichkeit. Ist eine Person für die konkrete Entscheidung nicht urteilsfähig, richten sich Information und Vertretung nach der gesetzlichen oder behördlich angeordneten Vertretungsbefugnis.~~

**Neu:**

> Allgemeine Beratung ist auch ohne Zustimmung der betroffenen Person möglich. Wann Sie vertrauliche Auskünfte über die Behandlung erhalten können, auch als Eltern eines minderjährigen Kindes oder bei einer Beistandschaft, steht auf der Seite «Behandlung und Ihre Rolle darin» unter «Wann Sie Auskunft erhalten können».

**Bisher:**

> ~~Eltern Minderjähriger und Beistandschaft~~
>
> ~~Für Minderjährige und bei einer Beistandschaft gelten zusätzliche Regeln. Klären Sie die konkrete Rolle mit den zuständigen Fachpersonen. Auch bei Minderjährigen sind Alter und Urteilsfähigkeit für die Vertraulichkeit entscheidend. Eine Pflicht zur Vertretung oder Koordination kann nur aus einer konkreten gesetzlichen oder behördlich angeordneten Aufgabe entstehen. Bei einer Beistandschaft ist der im Mandat festgelegte Auftrag massgebend. Angehörige ersetzen keine Behandlung.~~

**Quellenblock «Quellen zu dieser Seite»:**

- neu oder geändert: Gunderson et al. (2011) Verwendet in: «Was die Forschung zeigt» (zweite Langzeitstudie: 85 % Remission; alle Diagnosekriterien gingen ähnlich schnell zurück, Vertiefung zu Abbildung 1)
- neu oder geändert: Mason und Kreger (2014) Verwendet in: «Veränderung verläuft unterschiedlich» (als Praxisanregung, nicht als Beleg)
- neu oder geändert: Zanarini et al. (2007) Verwendet in: «Was die Forschung zeigt» (Abbildung 1: was sich zuerst bessert, was länger bleibt)
- neu oder geändert: Zanarini et al. (2024) Verwendet in: «Was die Forschung zeigt» (Recovery geht häufiger wieder verloren als Remission), «Remission, Alltag und persönliche Recovery»
- entfernt oder ersetzt: ~~Gunderson et al. (2011) Verwendet in: «Was die Forschung zeigt» ( Ten-year course of BPD , CLPS)~~
- entfernt oder ersetzt: ~~Mason und Kreger (2014) Verwendet in: «Veränderung verläuft unterschiedlich»~~
- entfernt oder ersetzt: ~~Zanarini et al. (2024) Verwendet in: «Remission, Alltag und persönliche Recovery»~~

## Fragen und Nachschlagen (`fragen`)

**Bisher:**

> ~~Borderline hat nicht eine einzige Ursache. Genetische Einflüsse können die Anfälligkeit mitbestimmen. Das bedeutet keine sichere Weitergabe einer Diagnose. Belastende Erfahrungen können ebenfalls eine Rolle spielen.~~

**Neu:**

> Borderline hat nicht eine einzige Ursache. Zwillings- und Familienstudien schätzen, dass Unterschiede in den Erbanlagen rund 40 bis 50 % der Unterschiede in der Anfälligkeit zwischen Menschen erklären. Das ist eine Aussage über grosse Gruppen, nicht über eine einzelne Person. Es heisst auch nicht, dass die Diagnose vererbt wird. Belastende Erfahrungen können ebenfalls eine Rolle spielen.

**Bisher:**

> ~~Für Borderline selbst sind Medikamente keine Kernbehandlung. Im Zentrum steht eine strukturierte Psychotherapie. Medikamente können für klar benannte Begleiterkrankungen oder in einzelnen Situationen zeitlich begrenzt erwogen werden. Ziel, erwarteter Nutzen, Risiken, Dauer und Überprüfung sollten ärztlich festgelegt werden. Unwirksame oder nicht mehr nötige Medikamente gehören überprüft. Medikamente werden nur gemeinsam mit der behandelnden ärztlichen Fachperson geändert. Die Verantwortung für Verordnung und fachliche Überprüfung liegt nicht bei Angehörigen.~~

**Neu:**

> Es gibt kein Medikament, das Borderline selbst behandelt. Im Zentrum steht eine strukturierte Psychotherapie. Bei Begleiterkrankungen können Medikamente helfen. In einzelnen Situationen können sie auch zeitlich begrenzt erwogen werden. Ziel, erwarteter Nutzen, Risiken, Dauer und Überprüfung sollten ärztlich festgelegt werden. Unwirksame oder nicht mehr nötige Medikamente gehören überprüft. Medikamente werden nur gemeinsam mit der behandelnden ärztlichen Fachperson geändert. Die Verantwortung für Verordnung und fachliche Überprüfung liegt nicht bei Angehörigen.

**Bisher:**

> ~~Eine FU setzt die gesetzlichen Voraussetzungen voraus: Eine Person darf wegen einer psychischen Störung, geistigen Behinderung oder schweren Verwahrlosung in einer geeigneten Einrichtung untergebracht werden, wenn die notwendige Behandlung oder Betreuung nicht anders erfolgen kann. Eine Diagnose oder die Belastung von Angehörigen allein genügt dafür nicht. Zuständig ist grundsätzlich die Kindes- und Erwachsenenschutzbehörde (KESB). Kantonal bezeichnete Ärztinnen und Ärzte können ebenfalls befugt sein. Angehörige ordnen keine FU an.~~

**Neu:**

> Eine FU setzt die gesetzlichen Voraussetzungen voraus: Eine Person darf wegen einer psychischen Störung, geistigen Behinderung oder schweren Verwahrlosung in einer geeigneten Einrichtung untergebracht werden, wenn die notwendige Behandlung oder Betreuung nicht anders erfolgen kann. Eine Diagnose oder die Belastung von Angehörigen allein genügt dafür nicht. Eine FU ordnet die Kindes- und Erwachsenenschutzbehörde (KESB) an. Im Kanton Zürich können auch Ärztinnen und Ärzte eine FU anordnen; sie dauert dann höchstens sechs Wochen. Angehörige ordnen keine FU an.
>
> Bei einer ärztlich angeordneten FU informiert die Ärztin oder der Arzt, wenn möglich, eine nahestehende Person schriftlich. Als nahestehende Person können Sie innert zehn Tagen schriftlich das Gericht anrufen. Die Frist beginnt mit der Mitteilung des Entscheids und kann schon laufen, bevor Sie selbst informiert werden. Zuständig ist im Kanton Zürich das Einzelgericht am Ort der Einrichtung. Sie können auch jederzeit um Entlassung ersuchen. Die untergebrachte Person kann eine Vertrauensperson beiziehen, die sie unterstützt und über die Behandlung informiert wird. Das können auch Sie sein, wenn die Person es wünscht.

**Quellenblock «Quellen zu dieser Seite»:**

- neu oder geändert: Distel et al. (2008) Verwendet in: «Ursachen, Begleiterkrankungen und Verlauf» (Erblichkeit rund 42 %, Zwillingsstudie)
- neu oder geändert: Kanton Zürich, Einführungsgesetz zum Kindes- und Erwachsenenschutzrecht (EG KESR, LS 232.3), § 27, § 29 und § 62 Verwendet in: «Therapie und Behandlung» (ärztliche FU im Kanton Zürich, höchstens sechs Wochen; zuständiges Gericht)
- neu oder geändert: Schweizerisches Zivilgesetzbuch (ZGB, SR 210), Art. 307, 314c, 314d, 426, 428, 429, 430, 432, 433, 439 und 450b Verwendet in: «Therapie und Behandlung» (FU: Information der nahestehenden Person, Gericht und Frist, Entlassung, Vertrauensperson), «Schutz, Kinder und Trennung»
- neu oder geändert: Skoglund et al. (2021) Verwendet in: «Ursachen, Begleiterkrankungen und Verlauf» (Erblichkeit rund 46 %, Registerstudie)
- entfernt oder ersetzt: ~~Schweizerisches Zivilgesetzbuch (ZGB, SR 210), Art. 307, 314c, 314d, 426, 428 und 429 Verwendet in: «Therapie und Behandlung», «Schutz, Kinder und Trennung»~~

## Grenzen setzen (`grenzen`)

**Bisher:**

> ~~Körperliche Gewalt ist kein Beziehungsproblem, sondern eine Sicherheitsfrage. Sie lässt sich nicht aus einer Borderline-Diagnose ableiten und wird dadurch nicht entschuldigt. Wenn Sie bedroht oder verletzt werden, hat Ihre Sicherheit Vorrang vor jedem Gespräch.~~

**Neu:**

> Gewalt, ob körperlich, durch Drohungen, Kontrolle oder Stalking, ist kein Beziehungsproblem, sondern eine Sicherheitsfrage. Sie lässt sich nicht aus einer Borderline-Diagnose ableiten und wird dadurch nicht entschuldigt. Wenn Sie bedroht oder verletzt werden, hat Ihre Sicherheit Vorrang vor jedem Gespräch.

**Neu:**

> Schutz durch die Polizei: Bei häuslicher Gewalt oder Stalking kann die Polizei im Kanton Zürich die gewaltausübende Person für 14 Tage aus der Wohnung weisen, ihr das Betreten bestimmter Gebiete verbieten und ein Kontaktverbot verfügen. Brauchen Sie länger Schutz, können Sie innert acht Tagen nach Erhalt der schriftlichen Verfügung beim Gericht eine Verlängerung beantragen. Das Gericht kann die Massnahmen um höchstens drei Monate verlängern. Mit der Verfügung informiert Sie die Polizei über das weitere Vorgehen.

**Quellenblock «Quellen zu dieser Seite»:**

- neu oder geändert: Eidgenössisches Büro für die Gleichstellung von Frau und Mann (EBG) (laufend), Häusliche Gewalt Verwendet in: «Wenn Gewalt oder Bedrohung vorkommt» (Formen häuslicher Gewalt: Drohungen, Kontrolle, Stalking; Informationsblatt A1)
- neu oder geändert: Kanton Zürich, Gewaltschutzgesetz (GSG, LS 351), § 2, § 3, § 4 und § 6 Verwendet in: «Wenn Gewalt oder Bedrohung vorkommt» (polizeiliche Schutzmassnahmen und Verlängerung beim Gericht)
- neu oder geändert: Mason und Kreger (2014) Verwendet in: «Kontakt halten, ohne immer verfügbar zu sein» (als Praxisanregung, nicht als Beleg)
- entfernt oder ersetzt: ~~Eidgenössisches Büro für die Gleichstellung von Frau und Mann (EBG) (laufend), Häusliche Gewalt Verwendet in: «Wenn Gewalt oder Bedrohung vorkommt»~~
- entfernt oder ersetzt: ~~Mason und Kreger (2014) Verwendet in: «Kontakt halten, ohne immer verfügbar zu sein»~~

## Ihre Rolle klären (`rolle`)

**Neu:**

> eine Budgetberatung oder, bei Schulden, eine Schuldenberatung nutzen; gemeinnützige Fachstellen finden Sie über Budgetberatung Schweiz und Schuldenberatung Schweiz
>
> wenn die Person ihre Angelegenheiten wegen ihrer Erkrankung nur teilweise oder gar nicht selbst besorgen kann: bei der KESB eine Beistandschaft beantragen; ob und für welche Aufgaben sie nötig ist, entscheidet die KESB

**Quellenblock «Quellen zu dieser Seite»:**

- neu oder geändert: Mason und Kreger (2014) Verwendet in: «Was Sie anbieten können und was nicht Ihre Aufgabe ist» (als Praxisanregung, nicht als Beleg)
- neu oder geändert: Schweizerisches Zivilgesetzbuch (ZGB, SR 210), Art. 390 Verwendet in: «Wenn Unterstützung an Grenzen kommt» (Vertiefung «Grosse Ausgaben und finanzielle Risiken»: Beistandschaft auf Antrag einer nahestehenden Person)
- entfernt oder ersetzt: ~~Mason und Kreger (2014) Verwendet in: «Was Sie anbieten können und was nicht Ihre Aufgabe ist»~~

## Wenn Kinder mitbetroffen sind (`kinder`)

**Neu:**

> Institut Kinderseele Schweiz (iks)
>
> Das Institut Kinderseele Schweiz berät kostenlos, wenn ein Elternteil psychisch erkrankt ist: die erkrankten Eltern, die Partnerin oder den Partner, andere Angehörige und Bekannte zum Wohlergehen der Kinder, aber auch Kinder und Jugendliche selbst. Die Beratung ist online und anonym, per Telefon, Zoom oder E-Mail oder vor Ort in Winterthur und Männedorf möglich.
>
> Website: www.kinderseele.ch
>
> Angaben und Link geprüft: 14. Oktober 2026

## Unterstützung finden (`unterstuetzung`)

**Bisher:**

> ~~Die Angebote auf dieser Seite sind vor allem für den Kanton Zürich gedacht. Für andere Kantone führt der schnellste Weg über Selbsthilfe Schweiz. Dort finden Sie kantonale Stellen. Sie können auch in der Hausarztpraxis oder in der psychiatrischen Praxis vor Ort nachfragen.~~

**Neu:**

> Die Angebote auf dieser Seite sind vor allem für den Kanton Zürich gedacht. Beratungsstellen für Angehörige in anderen Kantonen und an anderen Zürcher Kliniken finden Sie über das Netzwerk Angehörigenarbeit Psychiatrie.
>
> Netzwerk Angehörigenarbeit Psychiatrie (NAP)
>
> Die Website des Netzwerks zeigt auf einer Karte die Beratungsstellen für Angehörige an psychiatrischen Kliniken und Diensten in der Schweiz. Bei den Beratungsstellen des Netzwerks sind mindestens zwei Gespräche mit Fachpersonen kostenlos und auf Wunsch anonym. Die Beratung ist auch möglich, wenn die erkrankte Person nicht in Behandlung ist.
>
> Website: www.angehoerige.ch
>
> Angaben und Link geprüft: 14. Oktober 2026
>
> Selbsthilfegruppen in anderen Kantonen finden Sie über Selbsthilfe Schweiz, siehe «Selbsthilfegruppen finden». Sie können auch in der Hausarztpraxis oder in der psychiatrischen Praxis vor Ort nachfragen.

## Bücher für Angehörige (`buecher`)

**Bisher:**

> ~~Claudia Trasselli · Hogrefe, 2022~~

**Neu:**

> Claudia Trasselli, Anne Kristin von Auer und Hans Gunia · Hogrefe, 2022

**Neu:**

> Borderline-Störung im Jugendalter
>
> Gunilla Wewetzer und Martin Bohus · Hogrefe, 2016
>
> Ein Ratgeber für Jugendliche und Eltern. Informiert über Anzeichen, Ursachen und Behandlung und erklärt vor allem die Dialektisch-Behaviorale Therapie für Jugendliche (DBT-A). Mit Beispielen, Übungen und Arbeitsblättern.
>
> Für: Eltern von Jugendlichen, auch für Jugendliche selbst

**Bisher:**

> ~~Christiane Tilly und Anja Offermann · Psychiatrie-Verlag, 2012, 3. Aufl. 2025~~

**Neu:**

> Christiane Tilly und Anja Offermann · BALANCE buch + medien, 2012; Psychiatrie-Verlag, 3. Aufl. 2025

**Bisher:**

> ~~Ein englischsprachiger Titel, aufgenommen, weil es für Jugendliche mit Borderline keinen vergleichbaren deutschsprachigen Eltern-Ratgeber gibt.~~

**Neu:**

> Ein englischsprachiger Titel für Eltern von Jugendlichen, die tiefer einsteigen möchten.

## Krisen begleiten (`krise`)

**Bisher:**

> ~~Direkt nachzufragen, löst nach heutigem Wissensstand keine suizidale Handlung aus. Eine Übersicht über mehrere Studien (Dazzi et al., 2014) fand keine nachweisbare Zunahme von Suizidgedanken durch direktes Fragen. Das garantiert keine bestimmte Wirkung im einzelnen Gespräch.~~

**Neu:**

> Direkt nachzufragen, löst nach heutigem Wissensstand keine suizidale Handlung aus. Auswertungen mehrerer Studien fanden keine Zunahme von Suizidgedanken durch direktes Fragen, eher eine leichte Abnahme (Dazzi et al., 2014; Blades et al., 2018). Das garantiert keine bestimmte Wirkung im einzelnen Gespräch.

**Quellenblock «Quellen zu dieser Seite»:**

- neu oder geändert: Blades et al. (2018) Verwendet in: «Wenn Suizidgedanken ein Thema sind» (Metaanalyse von 18 Studien: Fragen nach Suizid verstärkte Suizidgedanken nicht, sie nahmen leicht ab)

## Auf sich achten (`selbstfuersorge`)

**Quellenblock «Quellen zu dieser Seite»:**

- neu oder geändert: Mason und Kreger (2014) Verwendet in: «Auch Sie brauchen Unterstützung» (als Praxisanregung, nicht als Beleg)
- neu oder geändert: WHO Europa (2025), Onlinekurs für pflegende Angehörige Verwendet in: «Auch Ihr eigenes Leben zählt», «Was Kraft kostet und was entlastet»
- entfernt oder ersetzt: ~~Mason und Kreger (2014) Verwendet in: «Auch Sie brauchen Unterstützung»~~
- entfernt oder ersetzt: ~~WHO Europa, Caring for yourself while caring for others (2025) Verwendet in: «Auch Ihr eigenes Leben zählt», «Was Kraft kostet und was entlastet»~~

## Zugewandt und klar sprechen (`kommunizieren`)

**Quellenblock «Quellen zu dieser Seite»:**

- neu oder geändert: Mason und Kreger (2014) Verwendet in: «Anerkennen, ohne zuzustimmen», «Der richtige Moment», «Wenn Gespräche kippen» (als Praxisanregung, nicht als Beleg)
- entfernt oder ersetzt: ~~Mason und Kreger (2014) Verwendet in: «Anerkennen, ohne zuzustimmen», «Der richtige Moment», «Wenn Gespräche kippen»~~

## Begriffe verständlich erklärt (`begriffe`)

**Neu:**

> Emotional instabile Persönlichkeitsstörung
>
> So heisst die Diagnose in der ICD-10-GM, die in der Schweiz für die stationäre Kodierung gilt. Die ICD-10-GM unterscheidet einen impulsiven Typ (F60.30) und den Borderline-Typ (F60.31). Mit dem Borderline-Typ ist die Borderline-Persönlichkeitsstörung gemeint.
>
> Beispiel: In einem Austrittsbericht steht «Emotional instabile Persönlichkeitsstörung, Borderline-Typ (F60.31)».
>
> Mehr dazu: «Der Weg zur Abklärung».
>
> Fürsorgerische Unterbringung (FU)
>
> Eine fürsorgerische Unterbringung ist die Unterbringung in einer Klinik oder einer anderen geeigneten Einrichtung, wenn nötig gegen den Willen der Person. Sie ist nur zulässig, wenn die nötige Behandlung oder Betreuung wegen einer psychischen Störung, einer geistigen Behinderung oder schwerer Verwahrlosung nicht anders erfolgen kann. Im Kanton Zürich ordnen sie die KESB oder Ärztinnen und Ärzte an; eine ärztlich angeordnete FU dauert höchstens sechs Wochen.
>
> Beispiel: Nach einer ärztlich angeordneten FU erhält eine nahestehende Person, wenn möglich, eine schriftliche Mitteilung. Sie kann das Gericht anrufen; die Frist von zehn Tagen ist kurz.
>
> Mehr dazu: «Wann ist eine Einweisung nötig?».

**Neu:**

> Schematherapie
>
> Die Schematherapie ist eine strukturierte Psychotherapie, die auch bei Borderline eingesetzt wird. Sie arbeitet mit frühen Prägungen und Beziehungsmustern (Schemata) und mit inneren Zuständen, die unter Stress ausgelöst werden. Ihre Wirksamkeit bei Borderline ist in Studien untersucht.
>
> Beispiel: In der Therapie wird untersucht, welche alte Erfahrung bei einer heutigen Kränkung mitschwingt.
>
> Mehr dazu: «Therapieformen».

**Neu:**

> Selbstverletzendes Verhalten
>
> Selbstverletzendes Verhalten heisst, sich absichtlich körperlich zu verletzen oder zu vergiften, unabhängig vom Motiv. Es geschieht oft ohne Todesabsicht, schliesst Suizidgedanken aber nicht aus. Bei Borderline kommt es häufig vor.
>
> Beispiel: Schnittwunden oder Verbrennungen auf der Haut oder eine absichtlich zu hohe Dosis eines Medikaments.
>
> Mehr dazu: «Wenn Suizidgedanken ein Thema sind».

**Neu:**

> Urteilsfähigkeit
>
> Urteilsfähig ist, wer vernunftgemäss handeln kann. Fehlen kann die Urteilsfähigkeit etwa wegen des Kindesalters, einer psychischen Störung oder eines Rausches. Sie wird immer für eine bestimmte Frage beurteilt: Jemand kann für eine Entscheidung urteilsfähig sein und für eine andere nicht.
>
> Beispiel: Eine 15-Jährige kann urteilsfähig sein, über ihre Therapie selbst zu entscheiden. Dann gilt die Schweigepflicht auch gegenüber den Eltern.
>
> Mehr dazu: «Wann Sie Auskunft erhalten können».

**Neu:**

> Vertrauensperson
>
> Wer fürsorgerisch untergebracht ist, kann eine Person des Vertrauens beiziehen. Sie unterstützt während des Aufenthalts und bis zum Abschluss aller damit verbundenen Verfahren. Die Ärztin oder der Arzt zieht sie bei der Erstellung des Behandlungsplans bei und informiert sie über die geplanten Massnahmen. Wer Vertrauensperson ist, wählt die untergebrachte Person selbst. Nicht gemeint ist die Person, die in einer Patientenverfügung als Vertretung bezeichnet ist.
>
> Beispiel: Ihr Sohn ist untergebracht und nennt Sie als Vertrauensperson. Dann werden Sie bei der Erstellung des Behandlungsplans beigezogen.
>
> Mehr dazu: «Wann Sie Auskunft erhalten können».

## Quellen (`quellen`)

**Bisher:**

> ~~Quellen dieser Gruppe anzeigen (33)~~

**Neu:**

> Quellen dieser Gruppe anzeigen (36)

**Neu:**

> Blades, C. A., Stritzke, W. G. K., Page, A. C. und Brown, J. D. (2018). The benefits and risks of asking research participants about suicide: A meta-analysis of the impact of exposure to suicide-related content. Clinical Psychology Review 64, 1–12. DOI: 10.1016/j.cpr.2018.07.001.
>
> Metaanalyse von 18 Studien. Wurden Teilnehmende in Forschungsstudien nach Suizid gefragt, nahmen Suizidgedanken nicht zu, sondern leicht ab. Untersucht wurden Forschungssituationen, nicht Gespräche unter Angehörigen.
>
> Verwendet auf: «Krisen begleiten»

**Bisher:**

> ~~Dazzi et al. (2014). Übersicht über mehrere Studien zur Frage, ob direktes Fragen nach Suizidgedanken diese verstärkt. PubMed.~~
>
> ~~Die Übersicht fand keine nachweisbare Zunahme von Suizidgedanken durch direktes Fragen. Das garantiert keine bestimmte Wirkung im einzelnen Gespräch.~~

**Neu:**

> Dazzi, T., Gribble, R., Wessely, S. und Fear, N. T. (2014). Does asking about suicide and related behaviours induce suicidal ideation? What is the evidence? Psychological Medicine 44(16), 3361–3363. DOI: 10.1017/S0033291714001299.
>
> Editorial mit einer Übersicht über Studien zur Frage, ob direktes Fragen nach Suizidgedanken diese verstärkt. Die Übersicht fand keine nachweisbare Zunahme. Die Metaanalyse von Blades et al. (2018) stützt den Befund.

**Neu:**

> Verwendet auf: «Verstehen»
>
> Distel, M. A., Trull, T. J., Derom, C. A., Thiery, E. W., Grimmer, M. A., Martin, N. G., Willemsen, G. und Boomsma, D. I. (2008). Heritability of borderline personality disorder features is similar across three countries. Psychological Medicine 38(9), 1219–1229. DOI: 10.1017/S0033291707002024.
>
> Zwillingsstudie mit Fragebogendaten aus den Niederlanden, Belgien und Australien. Erbanlagen erklärten 42 % der Unterschiede in Borderline-Merkmalen, individuelle Umwelteinflüsse den übrigen Anteil. Untersucht wurden Merkmale, keine gestellten Diagnosen.
>
> Verwendet auf: «Fragen und Nachschlagen»
>
> Ellison, W. D., Rosenstein, L. K., Morgan, T. A. und Zimmerman, M. (2018). Community and Clinical Epidemiology of Borderline Personality Disorder. Psychiatric Clinics of North America 41(4), 561–573. DOI: 10.1016/j.psc.2018.07.008.
>
> Übersicht zur Häufigkeit. In Bevölkerungsstudien liegt der Median bei rund 1 %, in ambulanter Behandlung bei etwa 10 bis 12 % und in stationärer Behandlung bei etwa 20 bis 22 %.

**Bisher:**

> ~~Gunderson, J. G. et al. (2011). Ten-year course of borderline personality disorder: Psychopathology and function from the Collaborative Longitudinal Personality Disorders study. Archives of General Psychiatry 68(8), 827–837.~~
>
> ~~Ergänzt die Studie von Zanarini: 85 % Remission und 12 % Rückfälle über zehn Jahre. Belegt zudem anhaltende Beeinträchtigungen im sozialen Funktionieren. Remission ist nicht gleichbedeutend mit voller funktioneller Genesung.~~

**Neu:**

> Gunderson, J. G. et al. (2011). Ten-year course of borderline personality disorder: Psychopathology and function from the Collaborative Longitudinal Personality Disorders study. Archives of General Psychiatry 68(8), 827–837. DOI: 10.1001/archgenpsychiatry.2011.37.
>
> Ergänzt die Studie von Zanarini: 85 % Remission und 12 % Rückfälle über zehn Jahre. Alle Diagnosekriterien gingen ähnlich schnell zurück. Belegt zudem anhaltende Beeinträchtigungen im sozialen Funktionieren. Remission ist nicht gleichbedeutend mit voller funktioneller Genesung.

**Bisher:**

> ~~Gunderson, J. G., Herpertz, S. C., Skodol, A. E., Torgersen, S. und Zanarini, M. C. (2018). Borderline personality disorder. Nature Reviews Disease Primers 4, 18029.~~
>
> ~~Übersichtsarbeit zu Diagnose, Verlauf, Behandlung und Versorgung.~~
>
> ~~Verwendet auf: «Fragen und Nachschlagen»~~

**Neu:**

> Gunderson, J. G., Herpertz, S. C., Skodol, A. E., Torgersen, S. und Zanarini, M. C. (2018). Borderline personality disorder. Nature Reviews Disease Primers 4, 18029. DOI: 10.1038/nrdp.2018.29.
>
> Übersichtsarbeit zu Diagnose, Verlauf, Behandlung und Versorgung. Sie schätzt die Häufigkeit in der Bevölkerung auf rund 1,7 %.
>
> Verwendet auf: «Verstehen», «Fragen und Nachschlagen»

**Neu:**

> Leichsenring, F., Fonagy, P., Heim, N., Kernberg, O. F., Leweke, F., Luyten, P., Salzer, S., Spitzer, C. und Steinert, C. (2024). Borderline personality disorder: a comprehensive review of diagnosis and clinical presentation, etiology, treatment, and current controversies. World Psychiatry 23(1), 4–25. DOI: 10.1002/wps.21156.
>
> Übersichtsarbeit. Die Lebenszeithäufigkeit in der Bevölkerung liegt in Studien bei 0,7 bis 2,7 %. Psychotherapie gilt als Behandlung der Wahl, ohne dass ein Verfahren klar überlegen ist. Für Medikamente gegen die Kernmerkmale fehlt eine verlässliche Wirksamkeit.
>
> Verwendet auf: «Verstehen», «Behandlung und Ihre Rolle darin»

**Bisher:**

> ~~Maslach, C. und Leiter, M. P. (2016). Understanding the burnout experience: recent research and its implications for psychiatry. World Psychiatry 15(2), 103–111.~~
>
> ~~Forschung zu Burnout, nicht spezifisch für Borderline. Beleg für soziale Unterstützung als Schutz vor Überlastung und Erschöpfung.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Bisher:**

> ~~Skodol, A. E. et al. (2005). The Collaborative Longitudinal Personality Disorders Study (CLPS): overview and implications. Journal of Personality Disorders 19(5), 487–504. DOI: 10.1521/pedi.2005.19.5.487.~~
>
> ~~Übersicht über die klinische Längsschnittstudie CLPS zu Verlauf, Beeinträchtigungen und Behandlung von Persönlichkeitsstörungen. Keine bevölkerungsbezogene Studie zur Häufigkeit.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Neu:**

> Skoglund, C., Tiger, A., Rück, C., Petrovic, P., Asherson, P., Hellner, C., Mataix-Cols, D. und Kuja-Halkola, R. (2021). Familial risk and heritability of diagnosed borderline personality disorder: a register study of the Swedish population. Molecular Psychiatry 26(3), 999–1008. DOI: 10.1038/s41380-019-0442-0.
>
> Registerstudie mit über 1,8 Millionen Menschen in Schweden. Die Erblichkeit diagnostizierter Borderline-Störungen wurde auf 46 % geschätzt, den übrigen Anteil erklärten individuelle Umwelteinflüsse.
>
> Verwendet auf: «Fragen und Nachschlagen»

**Bisher:**

> ~~Torgersen, S., Kringlen, E. und Cramer, V. (2001). The prevalence of personality disorders in a community sample. Archives of General Psychiatry 58(6), 590–596. DOI: 10.1001/archpsyc.58.6.590.~~
>
> ~~Bevölkerungsbezogene Untersuchung von 2053 Erwachsenen von 18 bis 65 Jahren in Oslo, erhoben 1994 bis 1997 nach DSM-III-R. Die Häufigkeit von Borderline lag in dieser Stichprobe bei 0,7 %. Dieser Wert ist keine allgemeingültige oder Schweizer Angabe.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Bisher:**

> ~~Zanarini, M. C., Frankenburg, F. R., Hein, K. E., Glass, I. V. und Fitzmaurice, G. M. (2024). Sustained Symptomatic Remission and Recovery and Their Loss Among Patients With Borderline Personality Disorder and Patients With Other Types of Personality Disorders: A 24-Year Prospective Follow-Up Study. Journal of Clinical Psychiatry 85(4), 24m15457. DOI: 10.4088/JCP.24m15457.~~
>
> ~~24-Jahres-Follow-up zu anhaltender symptomatischer Remission und Recovery sowie deren möglichem Verlust. Die spezialisierte Stichprobe erlaubt keine persönliche Prognose.~~
>
> ~~Verwendet auf: «Genesung» › «Remission, Alltag und persönliche Recovery»~~

**Neu:**

> Zanarini, M. C., Frankenburg, F. R., Dubo, E. D., Sickel, A. E., Trikha, A., Levin, A. und Reynolds, V. (1998). Axis I comorbidity of borderline personality disorder. American Journal of Psychiatry 155(12), 1733–1739.
>
> Klassische Studie zur Komorbidität über die Lebenszeit bei Borderline. Sie beschreibt sehr hohe Raten von Major Depression, Angststörungen und PTBS.
>
> Verwendet auf: «Diagnose und Begleiterkrankungen»
>
> Zanarini, M. C., Frankenburg, F. R., Hennen, J., Reich, D. B. und Silk, K. R. (2004). Axis I comorbidity in patients with borderline personality disorder: 6-year follow-up and prediction of time to remission. American Journal of Psychiatry 161(11), 2108–2114.
>
> Verlaufsstudie über sechs Jahre zur Komorbidität bei Borderline. Sie zeigt, dass die Komorbiditätsraten im Verlauf abnehmen. Das stützt die Perspektive auf Recovery.
>
> Verwendet auf: «Diagnose und Begleiterkrankungen»
>
> Zanarini, M. C., Frankenburg, F. R., Reich, D. B., Silk, K. R., Hudson, J. I. und McSweeney, L. B. (2007). The subsyndromal phenomenology of borderline personality disorder: a 10-year follow-up study. American Journal of Psychiatry 164(6), 929–935. DOI: 10.1176/ajp.2007.164.6.929.
>
> Zehnjahresverlauf von 24 Beschwerden bei 290 zu Beginn stationär behandelten Erwachsenen. Impulsive Beschwerden wie Selbstverletzung und Suizidversuche gingen am schnellsten zurück. Wut, Einsamkeit und Leere sowie Ängste vor dem Verlassenwerden blieben am längsten bestehen, nahmen aber ebenfalls deutlich ab. Spezialisierte Stichprobe, keine persönliche Prognose.
>
> Verwendet auf: «Genesung»

**Bisher:**

> ~~Zanarini, M. C., Frankenburg, F. R., Dubo, E. D., Sickel, A. E., Trikha, A., Levin, A. und Reynolds, V. (1998). Axis I comorbidity of borderline personality disorder. American Journal of Psychiatry 155(12), 1733–1739.~~
>
> ~~Klassische Studie zur Komorbidität über die Lebenszeit bei Borderline. Sie beschreibt sehr hohe Raten von Major Depression, Angststörungen und PTBS.~~
>
> ~~Verwendet auf: «Diagnose und Begleiterkrankungen»~~
>
> ~~Zanarini, M. C., Frankenburg, F. R., Hennen, J., Reich, D. B. und Silk, K. R. (2004). Axis I comorbidity in patients with borderline personality disorder: 6-year follow-up and prediction of time to remission. American Journal of Psychiatry 161(11), 2108–2114.~~
>
> ~~Verlaufsstudie über sechs Jahre zur Komorbidität bei Borderline. Sie zeigt, dass die Komorbiditätsraten im Verlauf abnehmen. Das stützt die Perspektive auf Recovery.~~
>
> ~~Verwendet auf: «Diagnose und Begleiterkrankungen»~~

**Neu:**

> Zanarini, M. C., Frankenburg, F. R., Hein, K. E., Glass, I. V. und Fitzmaurice, G. M. (2024). Sustained Symptomatic Remission and Recovery and Their Loss Among Patients With Borderline Personality Disorder and Patients With Other Types of Personality Disorders: A 24-Year Prospective Follow-Up Study. Journal of Clinical Psychiatry 85(4), 24m15457. DOI: 10.4088/JCP.24m15457.
>
> 24-Jahres-Follow-up zu anhaltender symptomatischer Remission und Recovery sowie deren möglichem Verlust. Remission wurde deutlich häufiger erreicht als Recovery, und Recovery ging häufiger wieder verloren als die Remission. Die spezialisierte Stichprobe erlaubt keine persönliche Prognose.
>
> Verwendet auf: «Genesung»

**Bisher:**

> ~~Quellen dieser Gruppe anzeigen (8)~~

**Neu:**

> Quellen dieser Gruppe anzeigen (5)

**Bisher:**

> ~~Bateman, A. und Fonagy, P. (2004). Psychotherapy for Borderline Personality Disorder: Mentalization-Based Treatment. Oxford University Press.~~
>
> ~~Grundlage der Mentalisierungsbasierten Therapie (MBT). Neuere Wirksamkeitsdaten: Bateman und Fonagy (2009), Abschnitt «Studien und Forschung».~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Neu:**

> Bateman, A. und Fonagy, P. (2013). Mentalization-Based Treatment. Psychoanalytic Inquiry 33(6), 595–613. DOI: 10.1080/07351690.2013.835170.
>
> Beschreibt die Mentalisierungsbasierte Therapie, darunter die Haltung des Nicht-Wissens: neugierig nachfragen, wie etwas erlebt wird, statt innere Zustände zu unterstellen.
>
> Verwendet auf: «Verstehen»

**Bisher:**

> ~~Linehan, M. M. (1996). Dialektisch-Behaviorale Therapie der Borderline-Persönlichkeitsstörung. CIP-Medien.~~
>
> ~~Deutsche Ausgabe. Standardwerk für die DBT-Behandlung.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Bisher:**

> ~~Paris, J. (2020). Treatment of Borderline Personality Disorder: A Guide to Evidence-Based Practice. Guilford Press, 2. Auflage.~~
>
> ~~Standardwerk zu Verlauf, Recovery und Modellen mit mehreren Einflussfaktoren. Didaktische Anregung für Darstellungen von Verlauf und Genesung, nicht als wörtliches Zitat.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~
>
> ~~Porges, S. W. (2011). The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-Regulation. W. W. Norton, New York.~~
>
> ~~In der klinischen Praxis breit verwendet, besonders in Trauma- und Körpertherapien. Die zugrunde liegenden neurobiologischen Mechanismen sind in der Forschung umstritten. Deshalb nur als didaktisches Modell mit Vorbehalt verwendbar.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Bisher:**

> ~~Quellen dieser Gruppe anzeigen (7)~~

**Neu:**

> Quellen dieser Gruppe anzeigen (5)

**Bisher:**

> ~~Guillén, V. et al. (2021). Interventions for Family Members and Carers of Patients with Borderline Personality Disorder: A Systematic Review. Family Process 60(1), 134–144.~~

**Neu:**

> Guillén, V. et al. (2021). Interventions for Family Members and Carers of Patients with Borderline Personality Disorder: A Systematic Review. Family Process 60(1), 134–144. DOI: 10.1111/famp.12537.

**Bisher:**

> ~~Hoffman, P. D. et al. (2005). Family Connections: A program for relatives of persons with borderline personality disorder. Family Process.~~
>
> ~~Psychoedukatives Programm für Angehörige. Studien berichten vielversprechende Verbesserungen bei Belastung, Trauer und Bewältigung. Wegen kleinerer Studien und begrenzter Vergleichsdaten bleibt die Evidenz vorläufig.~~

**Neu:**

> Hoffman, P. D., Fruzzetti, A. E., Buteau, E., Neiditch, E. R., Penney, D., Bruce, M. L., Hellman, F. und Struening, E. (2005). Family Connections: A program for relatives of persons with borderline personality disorder. Family Process 44(2), 217–225. DOI: 10.1111/j.1545-5300.2005.00055.x.
>
> Psychoedukatives Programm für Angehörige. Nach dem Programm berichteten die Teilnehmenden weniger Belastung und Trauer und mehr Zuversicht im Umgang. Die Studie hatte keine Kontrollgruppe; die Evidenz bleibt vorläufig.

**Bisher:**

> ~~Kreisman, J. J. und Straus, H. (2004). I Hate You – Don’t Leave Me: Understanding the Borderline Personality. Avery / Penguin. Deutsche Ausgabe: Kösel, 2012.~~
>
> ~~Historisch einflussreicher Ratgeber, keine wissenschaftliche Evidenzquelle. Das Buch kann Begriffe und Beziehungserleben anschaulich machen, verallgemeinert jedoch stellenweise. Nicht als diagnostische Grundlage oder pauschale Erklärung von Motiven verwenden.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Bisher:**

> ~~Historisch einflussreicher Ratgeber für Angehörige, keine wissenschaftliche Studie. Einzelne Beschreibungen verallgemeinern Beziehungsmuster und Motive. Krisenhinweise sind nicht als heutige Notfallanleitung zu verwenden. Als Erfahrungs- und Praxisquelle kritisch lesen.~~

**Neu:**

> Historisch einflussreicher Ratgeber für Angehörige, keine wissenschaftliche Studie. Einzelne Beschreibungen verallgemeinern Beziehungsmuster und Motive. Krisenhinweise sind nicht als heutige Notfallanleitung zu verwenden. Auf den Themenseiten nur als Praxisanregung verwendet, nicht als Beleg.

**Bisher:**

> ~~Mason, P. T. und Kreger, R. (2020, Abruf 13.10.2026). Stop Walking on Eggshells. Third Edition. New Harbinger Publications.~~
>
> ~~Englische 3. Auflage. Ratgeber- und Praxisliteratur, keine klinische Evidenzquelle und keine heutige Notfallanleitung.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Bisher:**

> ~~Quellen dieser Gruppe anzeigen (7)~~

**Neu:**

> Quellen dieser Gruppe anzeigen (8)

**Bisher:**

> ~~Verwendet auf: «Diagnose und Begleiterkrankungen»~~

**Neu:**

> Verwendet auf: «Verstehen», «Diagnose und Begleiterkrankungen»

**Neu:**

> Verwendet auf: «Diagnose und Begleiterkrankungen»
>
> Bundesinstitut für Arzneimittel und Medizinprodukte (2023, Abruf 14.10.2026). ICD-10-GM Version 2024, Block F60–F69. BfArM, Bonn. Stand 15. September 2023.
>
> Amtlicher Wortlaut: «F60.3- Emotional instabile Persönlichkeitsstörung» mit den Untergruppen «F60.30 Impulsiver Typ» und «F60.31 Borderline-Typ». Diese Fassung gilt in der Schweiz für die stationäre Kodierung 2026.

**Bisher:**

> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Neu:**

> Verwendet auf: «Behandlung und Ihre Rolle darin»

**Bisher:**

> ~~Pro Juventute (laufend, Abruf 13.10.2026). Wenn ein Elternteil psychisch krank ist. projuventute.ch/de/eltern/familie-gesellschaft/psychisch-kranke-eltern.~~
>
> ~~Verwendet auf: «Ihre Rolle»~~

**Neu:**

> Pro Juventute (laufend, Abruf 14.10.2026). Wenn ein Elternteil psychisch krank ist. Informationen für Eltern.
>
> Verwendet auf: «Ihre Rolle», «Wenn Kinder mitbetroffen sind»

**Bisher:**

> ~~Verwendet auf: «Ihre Rolle», «Behandlung und Ihre Rolle darin»~~

**Neu:**

> Verwendet auf: «Ihre Rolle», «Behandlung und Ihre Rolle darin», «Wenn Kinder mitbetroffen sind»

**Bisher:**

> ~~Quellen dieser Gruppe anzeigen (21)~~

**Neu:**

> Quellen dieser Gruppe anzeigen (14)

**Bisher:**

> ~~Bundesverband der Angehörigen psychisch erkrankter Menschen (BApK) (laufend, Abruf 13.10.2026). Medien des BApK: Informationsmaterialien für Angehörige, Kinder und Geschwister psychisch erkrankter Menschen. BApK, Bonn.~~
>
> ~~Deutsche Dachorganisation der Angehörigen psychisch erkrankter Menschen. Ergänzende Praxisquelle zu Kindern als Angehörige.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~
>
> ~~Carpenter, R. W. und Trull, T. J. (2013). Components of emotion dysregulation in borderline personality disorder: a review. Current Psychiatry Reports 15(1), 335.~~
>
> ~~Übersichtsarbeit, die die Schwierigkeiten mit der Emotionsregulation bei Borderline nach Linehans biosozialem Modell in vier Komponenten gliedert. Fachliche Grundlage für die Darstellung der Anspannungskurve.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~
>
> ~~LeDoux, J. E. (1996). The Emotional Brain: The Mysterious Underpinnings of Emotional Life. Simon & Schuster, New York.~~
>
> ~~Historisches Grundlagenwerk zur Verarbeitung von Angst und Bedrohung, nicht spezifisch für Borderline. Wegen der uneinheitlichen heutigen Befunde aus der Bildgebung wird es nicht mehr als zentrale Begründung für ein lokalisierendes Modell des Gehirns verwendet.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~
>
> ~~Lenz, A. (2014). Kinder psychisch kranker Eltern. Hogrefe, Göttingen, 2. Auflage.~~
>
> ~~Standardwerk zu Belastungen, Schutzfaktoren und Unterstützung von Kindern psychisch erkrankter Eltern, nicht spezifisch für Borderline.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~
>
> ~~Mattejat, F. und Lisofsky, B. (Hrsg.) (2014). Nicht von schlechten Eltern. Kinder psychisch Kranker. Balance Buch + Medien Verlag, 4. Auflage.~~
>
> ~~Niederschwelliges Fach- und Ratgeberwerk mit Fokus auf die Kinder psychisch erkrankter Eltern.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Bisher:**

> ~~Ogden, P., Minton, K. und Pain, C. (2006). Trauma and the Body: A Sensorimotor Approach to Psychotherapy. W. W. Norton, New York.~~
>
> ~~Überträgt das «Window of Tolerance» in die körperorientierte Traumatherapie. Wie Siegel (1999) ein didaktisches Modell für die Anspannungskurve, keine Quelle speziell zu Borderline.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~
>
> ~~Siegel, D. J. (1999). The Developing Mind: Toward a Neurobiology of Interpersonal Experience. Guilford Press, New York.~~
>
> ~~Prägt das Konzept des «Window of Tolerance», des Bereichs, in dem Menschen Belastung verarbeiten können. Didaktisches Modell für die Anspannungskurve, nicht spezifisch für Borderline.~~
>
> ~~Hintergrund, auf den Seiten nicht einzeln zitiert~~

**Bisher:**

> ~~WHO Europa (2025). Caring for yourself while caring for others. WHO Regionalbüro für Europa.~~

**Neu:**

> WHO Regionalbüro für Europa (2025, Abruf 14.10.2026). WHO launches new online course to support informal caregivers across Europe. Mitteilung vom 27. Oktober 2025.
>
> Stellt einen Onlinekurs für pflegende Angehörige vor. Er soll helfen, für andere und für sich selbst zu sorgen, und ermutigt, früh Hilfe von Fachpersonen, Familie, Freundinnen und Freunden oder anderen Angehörigen zu holen. Nicht spezifisch für Borderline.

**Bisher:**

> ~~Quellen dieser Gruppe anzeigen (6)~~

**Neu:**

> Quellen dieser Gruppe anzeigen (8)

**Bisher:**

> ~~Eidgenössisches Büro für die Gleichstellung von Frau und Mann (EBG) (laufend, Abruf 13.10.2026). Häusliche Gewalt. Mit den Informationsblättern B1 «Gewalt in Trennungssituationen» und B2 «Stalking» (2020).~~

**Neu:**

> Eidgenössisches Büro für die Gleichstellung von Frau und Mann (EBG) (2020 und laufend, Abruf 14.10.2026). Häusliche Gewalt. Mit den Informationsblättern A1 «Definition, Formen und Folgen häuslicher Gewalt» und B1 «Gewalt in Trennungssituationen» (2020).
>
> Das Blatt A1 zählt Drohungen und die Kontrolle von Kontakten und Finanzen zu den Formen häuslicher Gewalt. Auch Stalking in Paarbeziehungen gilt danach als häusliche Gewalt. Das Blatt B2 «Stalking» (2020) ist rechtlich überholt: Seit 1. Januar 2026 ist Nachstellung nach Art. 181b StGB strafbar.

**Bisher:**

> ~~Kanton Zürich, Gesundheitsdirektion, Amt für Gesundheit (laufend, Abruf 13.10.2026). Opferbetreuung durch Forensic Nurses. Website des Kantons Zürich.~~

**Neu:**

> Kanton Zürich (2006, Abruf 14.10.2026). Gewaltschutzgesetz (GSG, LS 351). Zürcher Gesetzessammlung, Stand 1. Januar 2025.
>
> § 2 umschreibt häusliche Gewalt und Stalking. Nach § 3 kann die Polizei die gefährdende Person aus der Wohnung weisen, ihr das Betreten bestimmter Gebiete und die Kontaktaufnahme verbieten; die Massnahmen gelten 14 Tage. Nach § 4 erhält auch die gefährdete Person die Verfügung mit einer Information über das weitere Verfahren. Nach § 6 kann sie innert acht Tagen nach Geltungsbeginn beim Gericht eine Verlängerung verlangen; die gerichtlich verfügten Massnahmen dürfen insgesamt drei Monate nicht übersteigen.

**Bisher:**

> ~~Opferhilfe Schweiz (laufend, Abruf 13.10.2026). «Schutz» und Für wen ist die Opferhilfe? Offizielle Informationsseiten der Opferhilfe Schweiz (SODK).~~

**Neu:**

> Kanton Zürich (2012, Abruf 14.10.2026). Einführungsgesetz zum Kindes- und Erwachsenenschutzrecht (EG KESR, LS 232.3). Zürcher Gesetzessammlung.
>
> § 27 legt fest, welche Ärztinnen und Ärzte im Kanton Zürich eine fürsorgerische Unterbringung anordnen dürfen. Nach § 29 dauert eine ärztlich angeordnete Unterbringung längstens sechs Wochen. Nach § 62 beurteilt das Einzelgericht am Ort der Einrichtung Beschwerden gegen ärztlich angeordnete Unterbringungen.
>
> Verwendet auf: «Fragen und Nachschlagen»
>
> Kanton Zürich, Gesundheitsdirektion, Amt für Gesundheit (laufend, Abruf 14.10.2026). Opferbetreuung durch Forensic Nurses. Website des Kantons Zürich.
>
> Verwendet auf: «Grenzen»
>
> Opferhilfe Schweiz (laufend, Abruf 14.10.2026). Schutz und Für wen ist die Opferhilfe? Offizielle Informationsseiten der Opferhilfe Schweiz (SODK).

**Bisher:**

> ~~Verwendet auf: «Grenzen», «Fragen und Nachschlagen»~~

**Neu:**

> Verwendet auf: «Grenzen», «Wenn Kinder mitbetroffen sind», «Fragen und Nachschlagen»

**Bisher:**

> ~~Art. 307, 314c und 314d betreffen Kindesschutzmassnahmen, Melderechte und Meldepflichten bestimmter Rollen. Art. 426, 428 und 429 betreffen Voraussetzungen und Zuständigkeit der fürsorgerischen Unterbringung. Einzelfall und kantonales Recht sind gesondert zu klären.~~
>
> ~~Verwendet auf: «Fragen und Nachschlagen»~~

**Neu:**

> Art. 19c und 304 betreffen die Rechte urteilsfähiger Minderjähriger und die Vertretung durch die Eltern. Art. 307, 314c und 314d betreffen Kindesschutzmassnahmen, Melderechte und Meldepflichten bestimmter Rollen. Art. 377 und 378 regeln die Vertretung bei medizinischen Massnahmen für urteilsunfähige Personen; Art. 380 verweist für die Behandlung einer psychischen Störung in einer psychiatrischen Klinik auf die Regeln der fürsorgerischen Unterbringung. Art. 390 regelt die Beistandschaft. Art. 426 bis 439 regeln die fürsorgerische Unterbringung, darunter die Information einer nahestehenden Person (Art. 430 Abs. 5), die Vertrauensperson (Art. 432), den Behandlungsplan (Art. 433) und die Anrufung des Gerichts (Art. 439, Frist nach Art. 450b). Einzelfall und kantonales Recht sind gesondert zu klären.
>
> Verwendet auf: «Ihre Rolle», «Behandlung und Ihre Rolle darin», «Wenn Kinder mitbetroffen sind», «Fragen und Nachschlagen»

