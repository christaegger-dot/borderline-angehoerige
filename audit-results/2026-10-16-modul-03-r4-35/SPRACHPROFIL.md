# Sprach- und Tonalitätsprofil · Borderline – Orientierung für Angehörige

Fassung aus Audit 03, Lauf `2026-10-16-modul-03-r4-35`, Stand `ff5016b`. Das Profil konkretisiert die Leitlinie «Sprache und Ton» (`00-sprache-und-ton.md`) des PUK Website-Profils, Fassung `1792129173-abbb`, für diese Website. Wo es schweigt, gilt die Leitlinie. Die Beispiele stammen von der Website; «vorher» ist der Wortlaut auf `ff5016b`, «nachher» die Ersatzfassung aus `BEFUNDE.csv` (ID in Klammern).

## 1. Zweck und Geltung

Das Profil gilt für alle Texte der Website: Seitentexte, Navigation, Überschriften, Figuren (Kernaussage, Kurztext, Beschriftungen, Vertiefung), Gesprächsbeispiele, Seitenbeschreibungen (`description`), Linktexte, `aria-label`, Bedien- und Statustexte in `interaktion.js` und `search-index.mjs` sowie Texte nur für Screenreader. Wer einen Abschnitt neu schreibt oder überarbeitet, geht es Punkt für Punkt durch und prüft am Ende mit den Prüffragen in Abschnitt 16.

Status: Entwurf aus dem Audit. Verbindlich wird das Profil, wenn die Fachstelle Angehörigenarbeit PUK es freigibt. Die Entscheide E7 und E9, der Entscheid «Kein Krisenzugang» und freigegebene Wortlaute aus den Releases gehen ihm vor.

Nachbesserungen am 16.10.2026 nach dem Codex-Review von #700 und nach dem Review statt Codex zu #701: Regel zu Verbindlichkeit und Zuständigkeit (Abschnitte 4 und 12), Prüffrage 10, Hinweise zu den Beispielen in Abschnitt 10, 14 und 15.

## 2. Leserin und Leser

Es lesen Partnerinnen und Partner, Mütter und Väter, erwachsene Kinder, Geschwister, Freundinnen und Freunde von Menschen mit Borderline, dazu Fachpersonen, die Angehörige beraten. Viele lesen in einer belasteten Lage: nach einem Streit, spät am Abend, mit wenig Kraft, oft auf dem Handy. Viele steigen über die Suche mitten in einer Seite ein und haben den Anfang nicht gelesen. Psychologische, psychiatrische oder juristische Vorkenntnisse setzt die Website nicht voraus. Manche Leserinnen und Leser sind selbst erkrankt oder unsicher, ob sie es sind; die Website spricht sie als Angehörige an und urteilt nicht über sie.

## 3. Stimme und Haltung

Die Website klingt wie eine erfahrene Fachperson, die ruhig erklärt, was hilft, und offen sagt, was sie nicht weiss. Sie nimmt beide Seiten ernst: die Belastung der Angehörigen und das Erleben der betroffenen Person. Sie ist zugewandt, ohne sich anzubiedern, und klar, ohne Härte.

Sie klingt nicht wie ein Lehrbuch, ein Therapiemanual, ein Amtsschreiben oder ein Ratgeber mit Erfolgsversprechen. Sie dramatisiert nicht und beschwichtigt nicht. Zugewandtheit zeigt sich in brauchbarer Information und in Respekt vor eigenen Entscheidungen, nicht in Gefühlswörtern.

## 4. Anrede und Perspektive

- Fliesstext in der Sie-Anrede, aus Sicht der Lesenden: was sie verstehen, tun oder lassen können. Nicht aus Sicht der Institution («Die Fachstelle bietet …» nur, wo es um das Angebot geht).
- Gesprächsbeispiele in der Anrede der Beziehung, unter Angehörigen «du». Ein Kind wird mit «du» angesprochen, die Fachperson im Musterbrief mit «Sie».
- Allgemeine Aussagen über Angehörige stehen in der dritten Person oder mit «man»; sie dürfen den Lesenden kein Gefühl zuschreiben. Vorher: «Viele Angehörige erleben gemischte Gefühle: Sie wollen helfen und möchten zugleich weg …» Nachher: «… Man will helfen und möchte zugleich weg …» (A03-066).
- **«Sie» am Satzanfang** ist in einem Sie-Text zuerst Anrede. Nimmt der Satz ein Nomen im Plural oder eine dritte Person auf, steht das Nomen oder «Diese …». Vorher: «Die folgenden Anzeichen können bei Überlastung auftreten. Sie können aber auch andere körperliche oder psychische Ursachen haben.» Nachher: «Die folgenden Anzeichen können bei Überlastung auftreten, aber auch andere körperliche oder psychische Ursachen haben.» (A03-131)
- Wo eine Aufgabe ausdrücklich bei mehreren Personen liegt («Bei akuter Gefahr holen Erwachsene sofort Hilfe»), bleibt die dritte Person, auch wenn der Text sonst «Sie» sagt. Mit «Sie» übernähmen die Lesenden die Aufgabe allein; das entscheidet die Fachstelle (A03-122 bis A03-124, Prüfbedarf).

## 5. Satzbau und Rhythmus

**Richtwerte** (Fliesstext nach `kennzahlen_v2.py`; Prüfhilfen, keine Normwerte):

| Kennzahl | Stand der Website | Richtwert je Seite |
| --- | --- | --- |
| mittlere Satzlänge | 10,8 Wörter | 9 bis 14 Wörter; Kurzfassung, Linklisten und Buchangaben liegen darunter |
| Sätze über 25 Wörter | 2,0 % | höchstens etwa 3 %; nur, wenn Bedingung und Folge oder eine Aufzählung zusammengehören (Rechtssätze ausgenommen) |
| längster Satz | 40 Wörter (verstehen) | über 30 Wörter nur mit Begründung |
| Sätze bis 6 Wörter | 23,5 % | kein Zielwert; Ketten von drei und mehr Kurzsätzen im Fliesstext prüfen (Listen, Beispiele und Kurzfassungen ausgenommen) |
| Sätze mit Verneinung | 23,9 % | kein Zielwert; Abschnitte über 30 % genauer lesen |
| Doppelpunkte | 373 | höchstens einer je Satz |
| Gedankenstriche « – » | 28 | höchstens einer je Absatz |

**Gedanken verbinden.** Was zusammengehört, steht in einem Satz mit Bindewort («und», «aber», «weil», «wenn», «damit»). Kurze Sätze bleiben, wo sie Klarheit schaffen, etwa in der Kurzfassung, in Kernsätzen und in Beispielen. Vorher: «Kontakt und einfache Absprachen sind möglich. Alltagsschritte gelingen zumindest teilweise.» Nachher: «Sie können noch miteinander reden und einfache Absprachen treffen. Im Alltag gelingt zumindest manches.» (A03-114)

**Lange Sätze teilen**, wenn sie zwei Schritte enthalten. Vorher: «In zwei grossen Stichproben mit zusammen 2398 Personen waren Borderline-Merkmale nach Korrektur für multiples Testen mit keinem der 152 untersuchten Strukturmasse verbunden.» Nachher: «In zwei grossen Stichproben mit zusammen 2398 Personen wurden 152 Masse der Hirnstruktur untersucht. Nach statistischer Korrektur für die vielen gleichzeitigen Tests hing keines davon mit Borderline-Merkmalen zusammen.» (A03-191)

**Absätze** haben zwei bis fünf Sätze und einen Gedanken. Ein Handlungsabsatz beginnt mit dem Label «Was Sie tun können:» und einem ganzen Satz.

**Doppelpunkt.** Ein Doppelpunkt je Satz. Er leitet ein Zitat, eine Liste oder eine Erklärung ein, nicht einen zweiten Doppelpunkt. Vorher: «Was Sie tun können: Fragen Sie sich: «Was trägt unsere Beziehung – und wann gelingt der Kontakt?»» Nachher: «Was Sie tun können: Fragen Sie sich, was Ihre Beziehung trägt und wann der Kontakt gelingt.» (A03-052)

## 6. Wortwahl

**Alltagswort zuerst.** Ein Fachbegriff bleibt, wenn er gebraucht wird, und wird beim ersten Auftreten auf der Seite erklärt, weil viele über die Suche einsteigen. Abkürzungen werden beim ersten Auftreten ausgeschrieben. Begriffe, die nur fachlich klingen, entfallen.

**So schreiben wir, so nicht** (Beispiele von der Website):

| So nicht (vorher) | So (nachher) | Warum |
| --- | --- | --- |
| «Im DSM-5-TR ist sie eine eigenständige Persönlichkeitsstörung …» | «Im DSM-5-TR, dem Diagnosehandbuch der Amerikanischen Psychiatrischen Vereinigung, ist sie …» (A03-174) | Abkürzung beim Quereinstieg erklärt |
| «Das bedeutet häufig weniger Impulsdurchbrüche, weniger Instabilität …» | «Häufig zeigt sich das an weniger impulsiven Handlungen, mehr Stabilität …» (A03-138) | klinischer Jargon; dieselbe Seite sagt sonst «impulsive Handlungen» |
| «Die Auswahl ist kuratiert, nicht vollständig bibliografisch.» | «Sie ist eine bewusst getroffene Auswahl, keine vollständige Bibliografie.» (A03-190) | Fachwörter für Laien |
| «Frühinterventionsangebot bei Verdacht, Risiko oder bereits diagnostizierter Borderline-Persönlichkeitsstörung.» | «Angebot zur Frühintervention bei Verdacht auf eine Borderline-Persönlichkeitsstörung, bei einem Risiko dafür oder bei bereits gestellter Diagnose.» (A03-086) | Nominalkette aufgelöst |
| «Mitwirken können Erschöpfung, erlebte Kritik, …» | «Zu solchen Momenten können Erschöpfung, erlebte Kritik, … beitragen.» (A03-048) | Satzanfang mit dem Verb wirkt gestelzt |
| «Diagnose-, Krisen- oder Gewaltgespräche nicht dolmetschen müssen» | «bei Gesprächen über Diagnose, Krisen oder Gewalt nicht dolmetschen müssen» (A03-173) | Wortkette ohne Not |
| «Ob eine Aufnahme sinnvoll ist, braucht eine professionelle Einschätzung.» | «Ob eine Aufnahme sinnvoll ist, beurteilen Fachpersonen.» (A03-171) | sagt, wer handelt |
| «Mit eigenen Wörtern die Website durchsuchen» | «Website mit eigenen Worten durchsuchen» (A03-043) | «Worte» für Gesagtes, wie auf der Suchseite |
| «Der Review begründet keine sichere Rangfolge …» | «Die Übersichtsarbeit begründet keine sichere Rangfolge …» (A03-196) | deutsches Wort, einheitlich |

**Begriffsliste** (einheitliche Form auf allen Seiten und in Code-Texten):

| Begriff | Einheitliche Form | Nicht |
| --- | --- | --- |
| Person mit der Erkrankung | «die betroffene Person», «Menschen mit Borderline»; in Beziehungs- und Gesprächssituationen auch «die andere Person»; im Beispiel eine konkrete Person («mein Bruder») | «die erkrankte Person», «Borderliner», «Borderline-Patientin» |
| Diagnose | beim ersten Auftreten «Borderline-Persönlichkeitsstörung», danach «Borderline» | «BPS» ohne Erklärung |
| Angehörige | «Angehörige» (schliesst Bezugspersonen ein) | «Betroffene» für Angehörige |
| eigene Beratung | «eine eigene Angehörigenberatung», «Beratung für Angehörige» | «allgemeine Beratung» |
| Anbieterin | «Fachstelle Angehörigenarbeit PUK» | |
| Fachleute | «Fachpersonen», «Behandlungsteam» | «Profis», «Experten» |
| Hilfe bei Gefahr | «sofort Hilfe holen» | «Notruf wählen», «früh Hilfe holen» bei akuter Gefahr |
| Krisenplan | «Krisenplan», verlinkt auf `krise.html#krisenplan` | «Notfallplan» |
| Selbstverletzung | im Fliesstext «Selbstverletzung»; Glossarstichwort nach Entscheid Release C «Selbstverletzendes Verhalten (auch: Selbstverletzung)» | |
| Validierung | «anerkennen»; beim Einführen «Anerkennen, in der Fachsprache Validierung, heisst: …» | «validieren» ausserhalb der Stellen, die den Fachbegriff einführen |
| Reihenfolge | «keine feste Reihenfolge» | «Pflichtfolge» |
| Psychotherapie | «auf Borderline ausgerichtete Psychotherapie» | «störungsspezifisch» |
| Berechtigung | «berechtigt» | «legitim» |
| ruhige Zeit | «ruhigere Phase», «ruhigere Zeiten» | «stabile Phase» |
| Pausensatz | «Ob und wann wir weiterreden, entscheide ich später.» (nach Beruhigung: «… entscheiden wir später.») | «weitersprechen», «kläre ich später» |
| Behörde | beim ersten Auftreten «Kindes- und Erwachsenenschutzbehörde (KESB)» | «Jugendamt», «Vormundschaftsbehörde» |
| Unterbringung | «fürsorgerische Unterbringung (FU)»; im Fragetitel alltagssprachlich «Einweisung» | – |
| Urteilsfähigkeit | «urteilsfähig», beim ersten Auftreten verlinkt auf `begriffe.html#b-urteilsfaehigkeit` | |
| Remission | mit kurzer Erklärung («die Diagnosekriterien sind eine Zeit lang nicht mehr erfüllt») | ohne Erklärung |
| Studienart | «Übersichtsarbeit», «Metaanalyse» | «Review» |
| Belege | «wissenschaftlicher Stellenwert», «wissenschaftliche Belege» | «Evidenzstatus» |
| Bücher | «kommentierte Auswahl», «kritische Einordnung» | «mit kritischer Distanz lesen», «Eingeordnete Buchauswahl» |
| Suche | «mit eigenen Worten» | «Suchwörter», «mit eigenen Wörtern» |
| Prüfdatum | «Angaben und Link geprüft: …» | «redaktionelle Kontrolle» |
| Antwortwörter | «Ja», «Nein», wenn sie als Antwort zitiert werden | |
| Modalverb | «Sie können …»; «Sie dürfen …», wo Lesende sich etwas nicht erlauben oder die Rechtslage gemeint ist | «Sie dürfen» als blosse Ermunterung |
| Filterstatus | «Einträge» | «Treffer» für alle Einträge |

## 7. Empathie ohne Floskeln

Belastung wird anerkannt, indem der Text die Lage genau beschreibt und dann sagt, was hilft. Ein Satz wie «Schuldgefühle sind bei Angehörigen häufig und verständlich. Ein Schuldgefühl allein entscheidet nicht, ob Sie etwas falsch gemacht haben.» nimmt das Gefühl ernst und trennt es von der Frage nach Schuld. Mögliche Erfahrungen werden behutsam angesprochen («Vielleicht …»), nicht als Tatsache über die Lesenden.

Zu vermeiden sind:

- «Das ist völlig normal.», «Sie sind nicht allein.» als Formel;
- «Ich höre, dass …», «Ich halte deine Unsicherheit mit dir aus» und andere Sätze aus Gesprächstrainings;
- «Wichtig ist, …», «Denken Sie daran, …», «Es ist wichtig, dass …» als Einstieg;
- Gefühlswörter vor Kontaktangaben, Schaltflächen oder dem Zuständigkeitsverweis;
- unterstellte Gefühle («den Schmerz» der anderen Person in einer Bildbeschreibung, «Sie wollen helfen …»);
- Steigerungen wie «sehr», «wirklich», «unglaublich» als Ersatz für Inhalt;
- Erlaubnisformeln ohne Anlass («Sie dürfen …» als Trost).

## 8. Verneinung, Vorbehalte und Absicherungen

**Verneinung ist nötig**, wo sie eine naheliegende Fehldeutung abwehrt: bei Aussagen über die betroffene Person («Aus der Diagnose allein lassen sich Motive, Beziehungsfähigkeit oder eine Gefahr für andere nicht ableiten.»), bei Ursachen und Schuld, bei der Grenze der Diagnose (keine Selbst- oder Fremddiagnose), beim Verlauf (keine individuelle Prognose) und bei Sicherheits- und Rechtsgrenzen.

**Verneinung ist nicht nötig** in Handlungshinweisen. Dort steht zuerst, was man tun kann. Vorher: «Sicherheit hat Vorrang: Sie müssen weder die Vorschläge für das Gespräch der Reihe nach umsetzen noch erst ruhig werden, bevor Sie Hilfe holen.» Nachher: «Sicherheit hat Vorrang: Sie können jederzeit Hilfe holen, ohne zuerst ruhig zu werden oder die Vorschläge für das Gespräch der Reihe nach umzusetzen.» (A03-109)

**Gerüste aus Verneinung** werden aufgelöst: «Es geht nicht darum … Es geht darum …», «X ist nicht dasselbe wie Y», Reihen mit «kein … kein … kein». Ein einzelnes «nicht X, sondern Y» darf stehen, wenn die Gegenüberstellung den Inhalt trägt («ob ähnliche Muster nicht zu Borderline, sondern zu einer anderen Erkrankung gehören», A03-080).

**E9.** Höchstens ein Vorbehalt je Abschnitt, ausgenommen Sicherheits- und Rechtsgrenzen; dieselbe Regel gilt für Entlastungssätze; ein Kernsatz je Seite. Formeln, die schon oft vorkommen, werden nicht vermehrt: «nicht automatisch» (siebenmal), Garantie-Formeln wie «… garantiert keine …» (sechsmal), «keine individuelle Prognose» (fünfmal). Eine Grenze der Methode steht einmal und in Alltagssprache. Vorher: «DEAR garantiert keine Kooperation: Sie können klar sein und trotzdem auf Ablehnung stossen.» Nachher: «Sie können klar sein und trotzdem auf Ablehnung stossen.» (A03-070)

**Absicherungen** («kann», «möglicherweise», «oft») bleiben, wo sie fachlich stimmen; aus «kann» wird nie «wird». Sie werden nicht gestapelt: ein «kann» je Aussage genügt.

## 9. Handlungsempfehlungen und Selbstbestimmung

- Klare Handlungen stehen im Imperativ («Holen Sie sofort Hilfe.»). Möglichkeiten stehen mit «Sie können …».
- «Sie müssen» nur für echte Pflichten (Sorge für minderjährige Kinder, Schutz) oder verneint als Entlastung («Sie müssen nicht rund um die Uhr erreichbar sein.»). «Sie dürfen» steht, wo Lesende sich etwas nicht erlauben («Sie dürfen eine Pause machen und Unterstützung für sich suchen, auch wenn die andere Person keine Hilfe möchte.») oder wo die Rechtslage gemeint ist; sonst «Sie können».
- Wahlmöglichkeiten werden genannt, auch Abstand, Pause, weniger Beteiligung und eigene Beratung.
- Bedingungen bleiben stehen und werden konkret. Vorher: «Sie können auf Wunsch etwas anbieten …» Nachher: «Wenn die Person das möchte, können Sie etwas anbieten …» (A03-147)
- Fragen an sich selbst sind ein Angebot. Vorher: «Fragen Sie sich: Möchte und kann ich gerade da sein? …» Nachher: «Hilfreich sind Fragen wie: Möchte und kann ich gerade da sein? …» (A03-058)
- Grenzen sind Entscheidungen über den eigenen Beitrag, keine Erziehungsmittel. Sie entziehen niemandem Versorgung oder Sicherheit, für die die Lesenden zuständig sind.
- Was die betroffene Person entscheidet, bleibt ihr überlassen; der Text sagt, wo das Recht dabei Grenzen zieht (Urteilsfähigkeit, elterliche Sorge, FU).

## 10. Gesprächsbeispiele

- **Kennzeichnung.** «So könnte es klingen» oder «Zum Beispiel:»; Gegenüberstellungen in der Komponente `.puk-say` mit den Labels «Eher problematisch» und «Eher hilfreich». Auf «Genesung» stehen freigegeben «Weniger hilfreich» und «Tragfähiger»; auf einer Seite wird nur ein Paar verwendet.
- **Laut-Lese-Probe.** Jedes Beispiel wird laut gesprochen: Würde eine Mutter, ein Partner oder eine Schwester das in dieser Lage so sagen? Vorher: «Ich höre, dass du enttäuscht bist. Ich sehe die Situation anders.» Nachher: «Du klingst enttäuscht. Ich sehe die Situation anders.» (A03-104)
- **Keine Formeln.** Nicht «Ich höre, dass …», nicht «Das klingt … belastend» in jedem zweiten Beispiel, kein «– aber» zwischen Zuwendung und Grenze. Vorher: «Ich bin für dich da – aber ich kann das Problem nicht für dich lösen.» Nachher: «Ich bin für dich da. Lösen kann ich das Problem nicht für dich.» (A03-097)
- **Keine Amtswörter.** «Elternteil», «tragfähige Lösung» und das abstrakte «sich um Hilfe kümmern» gehören nicht in gesprochene Sätze. Vorher: «Du bist nicht schuld. Erwachsene kümmern sich um Hilfe und um dich.» Nachher: «Du bist nicht schuld. Wir Erwachsenen sorgen für Hilfe und kümmern uns um dich.» (A03-119). Mit «wir» sagt die sprechende Person selbst zu, sich zu kümmern; diese Fassung braucht die fachliche Bestätigung. Bis die Fachstelle entschieden hat, gilt vorläufig «Erwachsene sorgen für Hilfe und kümmern sich um dich.»: Die Fassung ersetzt nur das abstrakte Objekt und lässt die Zuständigkeit bei den Erwachsenen.
- **Konkrete Personen.** Im Beispiel spricht man von «meinem Bruder», nicht von «der anderen Person» (A03-133).
- **Zusagen nur im realen Umfang.** Ein Beispiel hebt die eigene Grenze nicht im nächsten Satz wieder auf. Vorher: «Nach 22 Uhr bin ich nicht mehr am Handy. Wenn es ernst wird, holen wir zusätzliche Hilfe dazu.» Nachher: «Nach 22 Uhr bin ich nicht mehr am Handy. Wenn es dir dann sehr schlecht geht, wende dich an die Stelle aus deinem Krisenplan.» (A03-130). Der Wortlaut ist auf «Grenzen setzen» freigegeben; hier legt er den nächsten Schritt neu fest und braucht deshalb die fachliche Bestätigung.
- **Keine Absicherung im Beispiel.** «Möglicher Wortlaut, keine Erfolgsgarantie» gehört nicht in den Beispielsatz.
- **Keine erfundenen Gewaltsätze.** Beispiele zu Gewalt, Töten oder Suizid werden nicht neu erfunden; wo nötig, wird Originaltext zitiert.

## 11. Nichtstigmatisierende Sprache

- Personen vor Diagnosen: «Menschen mit Borderline», «die betroffene Person». Eine Diagnose beschreibt mögliche Muster, nie den ganzen Menschen.
- Aus der Diagnose werden keine Motive, keine Beziehungsfähigkeit und keine Gefahr für andere abgeleitet. Verhalten wird beschrieben, nicht gedeutet («Bleiben Sie bei beobachtbarem Verhalten, …»).
- Keine Typologien und keine Etiketten für Angehörige («Co-Abhängigkeit» nur als Wort, das manchmal fällt, nicht als Diagnose). Bücher, die Menschen in feste Typen einteilen, werden so benannt (A03-161).
- Schuld und Verantwortung: Angehörige sind nicht verantwortlich für Beruhigung, Behandlung oder Verlauf. Niemand ist schuld an der Erkrankung. Eigene Fehler dürfen anerkannt werden, ohne Schuld für die Erkrankung zu übernehmen.
- Kinder tragen keine Erwachsenenaufgaben. Die Aussage steht auf einer Seite einmal deutlich, nicht sechsmal in gleicher Form.
- Rollenbilder: «Mutter oder Vater», «Partnerin oder Partner», «Tochter oder Sohn». Die Mutter ist nicht selbstverständlich die Pflegeperson. Beispiele wechseln die Rollen.

## 12. Sicherheit, Dringlichkeit und Zuständigkeit

- Sicherheitssätze sind ruhig, kurz und direkt, mit klarer Schwelle und klarer Handlung. Freundlichkeit schwächt die Dringlichkeit nicht ab. Musterbeispiel: «Bei tiefen, stark blutenden oder unklaren Verletzungen holen Sie ärztliche Hilfe, auch wenn die Person das nicht möchte.»
- **Kein Krisenzugang.** Keine Telefonnummern, keine `tel:`-Links, kein Notfallblock, keine Krisennummern als Ergänzung.
- Der Zuständigkeitsverweis (`responsibility`, `responsibility.inline`) ist geprüfter Wortlaut. Sprachliche Hinweise dazu sind Prüfbedarf an die Fachstelle; er wird nicht umformuliert.
- **E7.** Der Zuständigkeitssatz steht im Text höchstens einmal je Seite und nur auf Seiten zu Selbstgefährdung, Gewalt oder akuter Krise.
- Schutzhinweise stehen bei der Handlung, auf die sie sich beziehen, nicht gesammelt am Seitenende.
- Freigegebene Sicherheitswortlaute (etwa zu Suizidgedanken und Selbstverletzung auf «Krisen begleiten») werden nur mit Freigabe geändert, auch wenn es sprachlich glatter ginge.
- **Verbindlichkeit und Zuständigkeit bleiben.** In Sicherheits-, Schutz- und Rechtssätzen bleibt eine Erlaubnis eine Erlaubnis und eine Aufforderung eine Aufforderung. Aus «kann» wird keine Pflicht, und eine Aufgabe, die bei «Erwachsenen», bei Fachpersonen oder bei «wir» liegt, geht nicht stillschweigend an die Lesenden über. Auch eine sprachlich bessere Fassung kann das tun: «Bei Sorge um Suizidgedanken dürfen Sie ruhig danach fragen.» erlaubt, «… fragen Sie ruhig danach.» fordert auf (A03-108). Solche Änderungen gehen nur mit fachlicher Bestätigung; bis dahin bleibt die Verbindlichkeit des Originals.
- Einen Abschnitt zur eigenen Krise der Lesenden gibt es nicht; die Auftraggeberin hat ihn abgelehnt.

## 13. Schweizer Standarddeutsch

- «ss» statt «ß»; Anführungszeichen «…», innen ‹…›.
- **Satzzeichen nach Anführungszeichen.** Endet ein angeführter Satz oder Titel mit Frage- oder Ausrufezeichen, folgt kein Schlusspunkt. Vorher: «Mehr dazu: «Wann ist eine Einweisung nötig?».» Nachher: «Mehr dazu: «Wann ist eine Einweisung nötig?»» (A03-179). Wird ein Zitat im Satz weitergeführt, steht vor dem Komma kein Punkt: «… der Gedanke «Vielleicht kommt gleich eine Nachricht», über dem Buch …» (A03-129).
- Schweizer Begriffe und Institutionen: KESB, Grundversicherung, Krankenversicherung, Hausarztpraxis, Spital, Kanton, «innert zehn Tagen».
- Zu vermeiden sind bundesdeutsche Ausdrücke wie «Jugendamt», «Krankenhaus» (für Spital), «Vormundschaftsgericht», «Betreuer» im rechtlichen Sinn (für Beistand), «Abitur», «Bürgersteig».
- Daten als «13. Oktober 2026» im Fliesstext, «13.10.2026» in Standangaben; Prozent mit Abstand («50 %»).
- Rechtschreibung nach Duden mit Schweizer Varianten («wiedergutzumachen», A03-055).

## 14. Website-Elemente

- **Seitentitel und Navigation** sind kurz und bleiben über die Website gleich; Verweise nennen den Seitentitel wörtlich.
- **Seitenbeschreibungen** (`description`) erscheinen als Auszug in der Suche und in Linkvorschauen. Sie sind ein lesbarer Satz oder eine Reihe gleichartiger Glieder in derselben Satzart, mit den Wörtern der Überschriften, ohne Wörter, die nur die Website kennt («Bedeutungsschleife», «Einstiege»), und selten länger als etwa 40 Wörter. Vorher: «Während einer Krise, Suizidgedanken ansprechen, wenn Sie eine Selbstverletzung bemerken, was Sie sagen können, …» Nachher: «Was Sie während einer Krise tun und sagen können und was Sie vermeiden sollten, wie Sie Suizidgedanken ansprechen und auf eine Selbstverletzung reagieren, …» (A03-209). Wo die Beschreibung eine Überschrift aufnimmt, übernimmt sie auch deren Verbindlichkeit («vermeiden sollten», nicht «besser vermeiden»). Nach jeder Änderung läuft der Suchtest.
- **`primaryTask`** ist unsichtbar und steuert nur die Suche; es folgt dennoch der Begriffsliste.
- **Verweise** sind eigene, kurze Sätze mit dem Titel als Linktext in «»: «Mehr dazu auf der Seite «Wenn Ihr jugendliches Kind betroffen ist».» (A03-042). Ein Verweis hängt nicht nach Doppelpunkt oder in Klammern an einem Rechts- oder Sicherheitssatz und nennt höchstens ein Ziel je Satz.
- **Schaltflächen** nennen die Handlung («Offizielle Angebotsseite der PUK öffnen»).
- **Leere Zustände und Fehlermeldungen** sagen, was zu tun ist, und wiederholen nicht den Statussatz. Vorher: «Keine passenden Inhalte gefunden. Versuchen Sie ein allgemeineres Wort … Die häufigen Fragen bieten einen weiteren Einstieg.» Nachher: «Versuchen Sie ein allgemeineres Wort oder eine andere Formulierung. Oder schauen Sie auf der Seite «Fragen und Nachschlagen» nach.» (A03-198)
- **Statusmeldungen** sind ganze Sätze, und Zahl und Wort passen zusammen: «3 von 20 Einträgen sind sichtbar.», ohne Suchwort «Alle Einträge sind sichtbar.» (A03-218). Sie werden vorgelesen.
- **Figuren.** Die Kernaussage ist ein Satz. Der Kurztext sagt, was die Abbildung für Angehörige bedeutet, ohne das Bild zu beschreiben («links … rechts»). Der Text nur für Screenreader beschreibt das Bild und gibt die Sätze der Abbildung wörtlich wieder, mit denselben Satzzeichenregeln.
- **`aria-label`** nennt Ziel und Art eines Links verständlich, ohne Technikwörter wie «Fundstelle» (A03-220).
- **Prüfangaben** stehen einheitlich als «Angaben und Link geprüft: 13. Oktober 2026».

## 15. KI-Textmuster, die vermieden werden

| Muster | Vorher (Website) | Nachher |
| --- | --- | --- |
| Satzanfang «Wichtig ist, …» | «Wichtig ist, alltägliche Belastung, wiederholte Eskalation, eine mögliche Kindeswohlgefährdung und akute Gefahr auseinanderzuhalten.» | «Alltägliche Belastung, wiederholte Eskalation, eine mögliche Kindeswohlgefährdung und akute Gefahr verlangen unterschiedliche Schritte.» (A03-121; im Schutzabschnitt entfällt damit die Aufforderung zum Unterscheiden, deshalb nur mit fachlicher Bestätigung) |
| «Es geht nicht darum … Es geht darum …» | «Es geht nicht darum, eine Erkrankung von aussen zu «lösen». Es geht darum, wiederkehrende Abläufe besser einzuordnen, …» | «Diese Website möchte Angehörigen fachlich fundierte Orientierung geben, nicht eine Erkrankung von aussen «lösen». Sie soll helfen, wiederkehrende Abläufe besser einzuordnen, …» (A03-199) |
| «X ist nicht dasselbe wie Y» | «Beruhigung ist nicht dasselbe wie Klärung.» | «Wenn sich die Lage beruhigt hat, ist damit noch nicht alles geklärt.» (A03-098) |
| Doppelpunkt-Telegramm | «Was Sie tun können: Fragen Sie sich: «…»» | «Was Sie tun können: Fragen Sie sich, was Ihre Beziehung trägt und wann der Kontakt gelingt.» (A03-052) |
| Merksatz am Schluss | «… Ehrlichkeit mit Mitgefühl liegt zwischen verletzender Offenheit und Vermeidung.» | Satz entfällt (A03-168) |
| Garantie-Formel | «DEAR garantiert keine Kooperation: Sie können klar sein und trotzdem auf Ablehnung stossen.» | «Sie können klar sein und trotzdem auf Ablehnung stossen.» (A03-070) |
| Stakkato aus Nominalsätzen | «Kontakt und einfache Absprachen sind möglich. Alltagsschritte gelingen zumindest teilweise.» | «Sie können noch miteinander reden und einfache Absprachen treffen. Im Alltag gelingt zumindest manches.» (A03-114) |
| Gedankenstrich mit «aber» | «Ich bin für dich da – aber ich kann das Problem nicht für dich lösen.» | «Ich bin für dich da. Lösen kann ich das Problem nicht für dich.» (A03-097) |
| Trainingsformel im Beispiel | «Ich höre, dass es dir schlecht geht.» | «Es geht dir schlecht, und das nehme ich ernst.» (A03-103) |
| Überschriften als Beschreibung | «Zuhören und die eigene Sicht behalten, anerkennen ohne zuzustimmen mit den sechs Stufen der Validierung, der richtige Moment, wenn Gespräche kippen, wenn Worte treffen und Beispiele.» | «Zuhören und die eigene Sicht behalten, anerkennen, ohne zuzustimmen, den richtigen Moment finden und reagieren, wenn Gespräche kippen oder Worte treffen, dazu die sechs Stufen der Validierung und Beispiele.» (A03-208) |
| Beipackzettel-Infinitiv | «Krisenhinweise nicht als heutige Notfallanleitung verwenden. Mit kritischer Distanz lesen.» | «Verwenden Sie seine Krisenhinweise nicht als heutige Notfallanleitung.» (A03-158) |

Dreierreihen sind kein Fehler, wenn jedes Glied eine eigene Aufgabe trägt («Kinder brauchen verständliche Worte, verlässliche Erwachsene und Schutz vor Aufgaben, die Erwachsene tragen müssen.»). Sie werden geprüft, wenn mehrere in einem Absatz stehen.

## 16. Prüffragen vor der Freigabe

1. Versteht jemand den Abschnitt, der über die Suche mitten hinein springt (Fachwörter und Abkürzungen erklärt)?
2. Hat jeder Absatz einen Gedanken, und sind zusammengehörige Sätze verbunden?
3. Hat kein Satz zwei Doppelpunkte, und ist kein Satz ohne Grund länger als 25 Wörter?
4. Lässt sich ein «Sie» am Satzanfang als Anrede missverstehen?
5. Steht in Handlungshinweisen zuerst, was man tun kann?
6. Gibt es in diesem Abschnitt höchstens einen Vorbehalt und höchstens einen Entlastungssatz (E9)?
7. Klingt jedes Gesprächsbeispiel laut gesprochen wie die Person in dieser Beziehung, ohne Formel und Amtswort?
8. Verspricht ein Beispiel nur, was die Person wirklich geben kann?
9. Wird ein Gefühl, ein Motiv oder eine Verantwortung unterstellt?
10. Stehen alle Bedingungen, Einschränkungen und Warnungen des fachlichen Inhalts noch da? Ist aus «kann» kein «wird» geworden, aus einer Erlaubnis keine Aufforderung, und liegt jede Aufgabe noch bei denselben Personen?
11. Sind Sicherheitssätze klar und direkt, ohne Krisennummer und mit dem Zuständigkeitssatz nur nach E7?
12. Stimmen die Begriffe mit der Begriffsliste überein, auch in Beschreibung, Linktext und Code-Text?
13. Ist der Verweis ein eigener Satz mit dem genauen Seiten- oder Abschnittstitel?
14. Stimmen ss, Guillemets und die Satzzeichen nach Anführungszeichen?
15. Ist die Stelle vielleicht schon gut und braucht keine Änderung?

## 17. Musterstellen

Diese Passagen bleiben unverändert und dienen als Referenz. Zitiert nach `ff5016b`.

- **Übersicht › Haltung:** «Sie können Unterstützung anbieten und zugleich entscheiden, was für Sie tragbar ist. Grenzen, eigene Beratung und Kontaktpausen dürfen dazugehören. Sie sind nicht für die Genesung eines anderen Menschen verantwortlich.»
- **Das Wichtigste kurz:** «Nehmen Sie Ihre Belastung ernst. Sie dürfen eine Pause machen und Unterstützung für sich suchen, auch wenn die andere Person keine Hilfe möchte.»
- **Borderline verstehen › Anspannung:** «Bei hoher Anspannung dreht sich für einen Menschen häufig fast alles um den Schmerz oder Streit im Moment. Zwischentöne und die gemeinsame Geschichte geraten dann leichter aus dem Blick, und selbst ein neutraler Satz kann wie Kritik oder Bedrohung wirken. Das erklärt manches, ändert aber nichts an der Verantwortung für das eigene Verhalten. Bei Gefahr haben Abstand, Schutz und professionelle Hilfe Vorrang.»
- **Alltag und Beziehungen:** «Unklare Signale, etwa eine späte Antwort oder ein knapper Satz, können schnell wie Ablehnung oder drohender Verlust wirken. Für die betroffene Person ist dieses Erleben real, auch wenn Sie es anders gemeint haben. Und manchmal war die Zurückweisung tatsächlich da.»
- **Ihre Rolle klären › Schuld:** «Schuldgefühle sind bei Angehörigen häufig und verständlich. Ein Schuldgefühl allein entscheidet nicht, ob Sie etwas falsch gemacht haben.»
- **Grenzen setzen › Erkennen:** «Was liegt wirklich bei mir? «Dass ich dich angeschrien habe, tut mir leid. Meine Pause brauche ich trotzdem.»»
- **Grenzen setzen › Gewalt:** «Gewalt, ob körperlich, durch Drohungen, Kontrolle oder Stalking, ist kein Beziehungsproblem, sondern eine Sicherheitsfrage. Sie lässt sich nicht aus einer Borderline-Diagnose ableiten und wird dadurch nicht entschuldigt. Wenn Sie bedroht oder verletzt werden, hat Ihre Sicherheit Vorrang vor jedem Gespräch.»
- **Diagnose › Begleiterkrankungen:** «Komorbidität ist der medizinische Begriff für Begleiterkrankungen. Er bedeutet, dass eine Person gleichzeitig oder im Verlauf mehrere Erkrankungen hat.»
- **Behandlung › Rückschläge:** «Ich habe den Eindruck, dass die Therapie gerade schwierig für dich ist. Magst du mir sagen, was daran schwer ist?»
- **Zugewandt und klar sprechen › Moment:** «Was Sie tun können: Überlegen Sie in Ruhe, woran Sie merken, dass ein Gespräch kippt. Legen Sie sich einen Satz für eine Pause zurecht, der für Sie natürlich klingt und kein Versprechen enthält, zurückzukommen. Dann müssen Sie ihn unter Anspannung nicht erst suchen.»
- **Krisen begleiten › Suizidgedanken:** «Wenn Sie sich konkret sorgen, fragen Sie ruhig und direkt, ob die Person Suizidgedanken oder einen Plan hat. Das kann helfen, die Lage zu verstehen. Zum Beispiel: «Ich mache mir Sorgen um dich. Denkst du gerade daran, dir das Leben zu nehmen?»»
- **Wenn Kinder mitbetroffen sind:** «Kinder brauchen verständliche Worte, verlässliche Erwachsene und Schutz vor Aufgaben, die Erwachsene tragen müssen.»
- **Jugendliche:** «Holen Sie früh Unterstützung für sich selbst. Sie tragen Verantwortung für Ihr Kind, aber nicht allein.»
- **Auf sich achten, Kurztext Abbildung 1:** «Das Buch liegt bereit, der Tee wird kalt, und ein Teil der Aufmerksamkeit bleibt beim Telefon. Diese ständige Bereitschaft kann Kraft kosten, auch wenn nichts passiert.»
- **Genesung:** «Ihre Gesundheit zählt für sich, nicht erst als Beitrag zur Genesung einer anderen Person.» und «Lebensqualität und ein selbstbestimmter Alltag zählen auch dann, wenn die strengen Recovery-Kriterien einer Studie nicht erfüllt sind. Entwicklung darf am persönlichen Leben und an eigenen Zielen gemessen werden. Arbeit oder Partnerschaft sind kein Massstab für den Wert eines Menschen.»
- **Fragen und Nachschlagen › Schutz:** «Ja. Sie dürfen eine Beziehung beenden oder eine Situation verlassen, auch wenn die andere Person psychisch erkrankt oder akut belastet ist. Ihre Sicherheit und Selbstbestimmung haben Vorrang.»
- **Begriffe › Urteilsfähigkeit:** «Sie wird immer für eine bestimmte Frage beurteilt: Jemand kann für eine Entscheidung urteilsfähig sein und für eine andere nicht.»
- **Quellen › Blades et al.:** «Wurden Teilnehmende in Forschungsstudien nach Suizid gefragt, nahmen Suizidgedanken nicht zu, sondern leicht ab. Untersucht wurden Forschungssituationen, nicht Gespräche unter Angehörigen.»
- **Suche:** «Suchen Sie mit Ihren eigenen Worten.» und «Ihre Eingabe bleibt in Ihrem Browser. Sie wird weder übertragen noch gespeichert.»
- **Über diese Website:** «Prüfen Sie auch Anhänge und Bildschirmfotos auf solche Angaben.»
- **Datenschutz:** «Eine frühere Fassung dieser Website bot ein Werkzeug für persönliche Einträge an. Falls Sie es genutzt haben, können Ihre Einträge noch lokal im Browser auf Ihrem Gerät liegen. Sie wurden nicht an die Website übertragen. Entfernen können Sie sie in den Einstellungen Ihres Browsers.»
- **Seitenbeschreibung 404:** «Diese Seite gibt es nicht. Von der Startseite aus erreichen Sie alle Seiten.»

## 18. Vorschläge an das PUK-Profil

*Vorschlag, nicht Teil dieses Website-Profils.* Die folgenden Regeln haben sich auf dieser Website bewährt und könnten für alle Websites der Fachstelle in `00-sprache-und-ton.md` aufgenommen werden. Über eine Aufnahme entscheidet die Pflege des PUK-Profils.

1. **«Sie» am Satzanfang** (Abschnitt 1 der Leitlinie): In Texten mit Sie-Anrede beginnt kein Satz mit «Sie», wenn eine dritte Person oder ein Nomen im Plural gemeint ist.
2. **Satzzeichen nach Anführungszeichen** (Rahmen): kein Schlusspunkt nach einem angeführten Satz mit Frage- oder Ausrufezeichen; kein Punkt vor dem Komma bei eingebetteten Zitaten.
3. **Seitenbeschreibungen als Lesetext** (Abschnitt 6): `description` erscheint in Suche und Linkvorschau und folgt denselben Regeln wie Fliesstext; Themen in gleicher Satzart, keine Reihung von Überschriften.
4. **Statusmeldungen im Profilcode** (Abschnitt 6): Der Filterstatus in `interaktion.js` sollte ganze Sätze bilden, Zahl und Wort passend wählen und ohne Suchwort einen ganzen Satz zeigen, am besten den seitenspezifischen Text aus dem HTML (Alternative in der Begründung zu A03-218). Dasselbe gilt für die Trefferbeschriftung in `search-index.mjs` (A03-220). Beide Dateien sind Profilcode; die Änderung betrifft alle Websites mit diesem Kit.
5. **Formelliste für Gesprächsbeispiele** (Abschnitt 3): «Ich höre, dass …», «Das klingt … belastend» in Serie, «– aber» zwischen Zuwendung und Grenze, Amtswörter wie «Elternteil» im gesprochenen Satz.
6. **Ein Label-Paar für `.puk-say`**: Die Leitlinie nennt «eher problematisch / eher hilfreich»; auf dieser Website steht daneben «Weniger hilfreich / Tragfähiger». Das Profil könnte festlegen, ob beide Paare zulässig sind.
7. **Kennzahlen als Prüfhilfe**: Richtwerte wie in Abschnitt 5 dieses Profils, ausdrücklich ohne Normcharakter, mit dem Hinweis, dass Listen, Beispiele und Kurzfassungen die Werte verzerren.
