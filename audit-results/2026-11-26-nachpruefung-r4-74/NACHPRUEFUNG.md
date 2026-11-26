# Nachprüfung r4-74 · PR #836 (Suchregeln aus PR #713, zweiter Teil)

**Urteil: Blockiert nach R34-P01: ja, nach Kriterium a) und c). PR #836 ist allerdings schon gemergt (26.11.2026, 19:33:31 UTC, `8d95e6a`), bevor diese Nachprüfung vorlag; Empfehlung: r4-74 nicht so stehen lassen, sondern rasch nachbessern (mindestens die vier Füllwörter «sagt», «immer», «wieder», «oft» zurücknehmen) oder zurücknehmen, Entscheid bei Christa Egger.**

Stand 26.11.2026 · geprüft von einer Sitzung, die PR #836 nicht gebaut hat · Vorher `main` `9d0d237` (r4-73) · Nachher PR-Kopf `b87535b` (r4-74).

Dieser Bericht und die Dateien dieses Ordners enthalten Suchanfragen im Wortlaut, auch solche zu Suizid, Selbstverletzung und Gewalt. Sie gehören nicht in die Pendenzendatei.

## Kurzfassung

- Alle Gates laufen auf dem PR-Kopf wie berichtet. Sichtbarer Wortlaut ist unverändert. Die Zahlen des Berichts der bauenden Sitzung lassen sich nachrechnen; ihre Ergebnisdateien entstehen beim Nachlauf byte-gleich.
- **Die Stopp-Regel ist trotzdem verletzt.** Die bauende Sitzung hat sie nur über ihre eigenen Anfragemengen geprüft. Mit eigenen Proben finde ich zwei Arten von Verschlechterung, beide durch die 13 neuen Füllwörter:
  - **a)** Sätze mit Tötungswort, in denen «sagt», «immer wieder» oder «oft» vorkommt und nach dem Verb noch etwas folgt («… bringt sich um wegen mir»): vorher stand «Wenn Suizidgedanken ein Thema sind» zuoberst, nachher gibt es keinen Treffer oder einen sachfremden (N836-1).
  - **c)** Klare Ich-Aussagen über Gedanken ans Sterben mit denselben Füllwörtern («Ich denke sehr oft ans Sterben»): vorher der Suizidabschnitt, nachher kein Treffer (N836-2).
- Die Ursache ist eingegrenzt: Der Suchtext des Suizidabschnitts enthält «sagt», «immer», «wieder» und «oft». Vor r4-74 fing er über diese Wörter viele Umschreibungen auf, die die Regeln nicht erkennen. r4-74 übergeht die vier Wörter und nimmt dieses Netz weg, ohne die Erkennung zu ergänzen.
- Die Ergänzung gegenüber #713 (Wortstamm-Regel und fünf Begriffe) ist an beiden Befunden nicht beteiligt. Empfehlung dazu: drin lassen (N836-8).
- Die übrigen Regeln aus #713 tun, was der Bericht sagt, haben aber Fehlreihenfolgen und Lücken, die nicht blockieren (N836-4 bis N836-7, N836-9, N836-10).
- Zum Ablauf: Der PR wurde gemergt, obwohl PR-Beschreibung, Commit-Nachricht, Pendenzendatei und `releaseApproval` die Nachprüfung vor dem Merge verlangen (N836-3).

## Befunde

| Kennung | Schweregrad | Befund |
|---|---|---|
| N836-1 | hoch, blockiert nach R34-P01 a) | Tötungswort zusammen mit neuen Füllwörtern: Suizidabschnitt fällt aus den ersten zwei Treffern |
| N836-2 | hoch, blockiert nach R34-P01 c) | Klare Ich-Aussagen über Gedanken ans Sterben mit Füllwort: kein Treffer mehr |
| N836-3 | hoch (Ablauf) | Merge vor der Nachprüfung; Status in der Pendenzendatei und in `releaseApproval` stimmt nicht mehr |
| N836-4 | mittel | Kinder-Regel: Kinderschutz zuerst, auch wenn das Kind Täter ist oder die eigene Kindheit gemeint ist |
| N836-5 | mittel | Regel «Gewalt gegen die eigene Person»: verdrängt Selbstverletzung, greift bei Verneinung |
| N836-6 | mittel | Regel für Anfragen des Nicht-mehr-Wollens: Lücken, verdrängter bisheriger Treffer, Aufblitzen beim Tippen |
| N836-7 | niedrig | Neue Begriffe mit Fehltreffern (Trauer, Alltagsgebrauch von «schneiden», Nasenbluten); Ich-Form der Selbstverletzung schwächer als die dritte Person |
| N836-8 | niedrig | Ergänzung gegenüber #713: korrekt und trennbar, wenige harmlose Fehltreffer; Empfehlung: drin lassen |
| N836-9 | niedrig | Tippfehlerregel: kein Alltagswort wird zu einem Suizidwort; ein Wortanfang blitzt beim Tippen auf |
| N836-10 | niedrig | Quellenblock (SU-05), «FU» und «IV»: wie berichtet; 31 Wörter ganz aus dem Suchindex |
| N836-11 | niedrig (Nachweis) | Bericht der bauenden Sitzung: zwei Ungenauigkeiten; Aussage zur Stopp-Regel gilt nur für die dort geprüften Mengen |
| N836-12 | Hinweis, vorbestehend | Lücken, die schon vor r4-74 bestanden und erst durch N836-1 sichtbar werden |

### N836-1 · Tötungswort mit Füllwort: Suizidabschnitt fällt weg (hoch, R34-P01 a)

**Messung.** 45 eigene, natürlich formulierte Sätze mit Tötungswort und einem neuen Füllwort, ohne Satzzeichen (`proben-toetungswort-fuellwort.txt`, Gruppe N). Bei 20 stand «Wenn Suizidgedanken ein Thema sind» vorher unter den ersten zwei Treffern und nachher nicht mehr; 7 Anfragen der Gruppe hatten vorher einen Treffer und haben nachher keinen (`ergebnis/proben-toetungswort-fuellwort-ergebnis.txt`).

Beispiele (vorher → nachher, erster Treffer):

| Anfrage | r4-73 | r4-74 |
|---|---|---|
| Sie sagt immer wieder sie bringt sich um wegen mir | `krise.html#suizid` | kein Treffer |
| Mein Sohn sagt immer wieder ich bring mich um Mama | `krise.html#suizid` | `fragen.html#f-einweisung` |
| Meine Tochter sagt immer wieder sie bringt sich um mit Tabletten | `krise.html#suizid` | `behandlung.html#rollen` |
| Er sagt immer wieder er bringt sich um was soll ich tun | `krise.html#suizid` | `behandlung.html#kontakt` |
| Er sagt immer wieder er bringt sich um ist das ernst | `krise.html#suizid` | kein Treffer |
| Sie sagt immer wieder sie well sich umbringä (Mundart) | `krise.html#suizid` | kein Treffer |
| Er sagt immer wieder er will sich umbrigen (Tippfehler) | `krise.html#suizid` | `behandlung.html#keine-behandlung` |
| Sie sagt immer wieder sie erhängt sich | `krise.html#suizid` | kein Treffer |

Dazu der Kombinationslauf: 50 eigene Sätze mit Tötungswort mal 40 Zusätze und Schreibweisen, 2000 Anfragen. Kriterium a) trifft 11-mal zu, immer bei einem trennbaren Verb mit angehängtem Zusatz (sechsmal «immer wieder», dreimal ein Zusatz an einen Satz mit «immer wieder», zweimal ein Gewaltbegriff mit zweitem «um»); Anheftung verloren 0-mal (`ergebnis/kombination-toetungswort.txt`). Diese elf sind künstlich zusammengesetzt; die natürlichen Sätze stehen oben. Beim Tippen fällt der Treffer auch in Zwischenstufen weg («Sie redet immer wieder davon, sich umzub…» bis das Wort fertig ist; `ergebnis/tippen-zwischenstufen.txt`).

**Ursache.** Die Regel für Tötungsverben erkennt «bring… um» nur, wenn «um» am Satzende, vor einem Satzzeichen oder vor einem Bindewort steht. Folgt etwas anderes, gilt die Anfrage nicht als Tötungsanfrage; das war schon vor r4-74 so (Gruppe O: dieselben Sätze ohne Füllwort haben vorher und nachher keinen Suizidtreffer). Vorher fing die Ersatzsuche solche Sätze auf, weil «sagt», «immer», «wieder» und «oft» im Suchtext des Suizidabschnitts stehen. r4-74 übergeht diese Wörter; übrig bleibt «bringt», das nur in sachfremden Abschnitten vorkommt. Dasselbe gilt für Mundart- und Tippformen des Tötungsverbs und für Wörter wie «erhängt».

**Einordnung.** Anfragen, die die Regel selbst als Tötungsanfrage erkennt, sind nicht betroffen: Die neue Logik greift nur, wenn keine Tötungsanfrage erkannt ist, und im ganzen Lauf geht keine Anheftung verloren. Betroffen sind Anfragen, die für Lesende ein Tötungswort enthalten, für die Regel aber nicht. R34-P01 a) spricht von einer «Anfrage mit Tötungswort», nicht von einer erkannten; die Nutzerin sah vorher den Suizidabschnitt und sieht ihn nachher nicht. Ich werte das als blockierend. Wer die Regel enger liest (nur erkannte Tötungswörter), kommt zu «blockiert nicht nach a)»; N836-2 bleibt davon unberührt.

**Eingrenzung, keine Korrektur.** Kopien von `site/` ausserhalb des Repositorys mit je einer geänderten Zeile (`ergebnis/varianten.txt`):

| Variante | Suchtest | Gruppe N: Suizid verloren | Gruppe P: Suizid verloren |
|---|---|---|---|
| PR-Kopf r4-74 | 253 von 253 | 20 von 45 | 14 von 60 |
| V1: alle 13 Füllwörter entfernt | 252 von 253 | 0 | 0 |
| V2: nur «sagt», «immer», «wieder», «oft» entfernt | 253 von 253 | 0 | 0 |
| V3: nur «immer», «wieder», «oft» entfernt | 253 von 253 | 8 | 4 |
| V5: Wortstamm-Regel entfernt, Füllwörter wie im PR | 247 von 253 | 20 | 14 |

V2 besteht den Suchtest vollständig und hat in den Gruppen N und P keine Verschlechterung. Im Kombinationslauf bleiben mit V2 drei künstliche Fälle nach a) (ein angehängtes «FU», zweimal ein angehängter Gewaltbegriff mit zweitem «um»). V2 ist eine Messung, kein geprüfter Vorschlag: Die neun übrigen Füllwörter stehen nicht im Suizidabschnitt, können aber bei anderen Abschnitten denselben Effekt haben. Dauerhaft hilft nur, die Erkennung selbst zu ergänzen (N836-12).

**Reproduktion.**

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
git worktree add /tmp/vorher 9d0d237 && git worktree add /tmp/nachher b87535b
cd audit-results/2026-11-26-nachpruefung-r4-74
node lauf.cjs /tmp/vorher/site /tmp/nachher/site proben proben-toetungswort-fuellwort.txt /tmp/n.txt
node kombinationen.cjs /tmp/vorher/site /tmp/nachher/site /tmp/ausgabe
```

### N836-2 · Ich-Aussagen über Gedanken ans Sterben: kein Treffer mehr (hoch, R34-P01 c)

**Messung.** 60 eigene Aussagen zu Suizidgedanken, Selbstverletzung und Gewalt ohne Tötungswort, mit Füllwort in natürlicher Wortstellung (`proben-fuellwort-sicherheit.txt`, Gruppe P). Bei 14 stand der Suizidabschnitt vorher unter den ersten zwei und nachher nicht; 5 haben nachher keinen Treffer.

| Anfrage | r4-73 | r4-74 |
|---|---|---|
| Ich denke sehr oft ans Sterben | `krise.html#suizid` | kein Treffer |
| Ich denke immer öfter ans Sterben | `krise.html#suizid` | kein Treffer |
| Ich denke immer wieder an den Tod | `krise.html#suizid` | kein Treffer |
| Ich denke oft daran nicht mehr zu leben | `krise.html#suizid` | `fragen.html#eigenes-leben` |
| Er sagt immer wieder ohne ihn wären alle besser dran | `krise.html#suizid` | kein Treffer |
| Sie sagt immer wieder das Leben hat keinen Sinn | `krise.html#suizid` | `genesung.html#einfluesse` |
| Sie sagt immer wieder sie tut sich etwas an | `krise.html#suizid` | `grenzen.html#erkennen` |
| Er hat mir wieder gedroht | `krise.html#suizid` | kein Treffer |

Die ersten drei sind klare Ich-Aussagen mit Treffer vorher und ohne Treffer nachher. Das ist Kriterium c).

Breiter gemessen: 4416 Ich-Aussagen aus Bausteinen (92 Kerne, 8 Füllungen, 6 Satzrahmen). 330 verlieren ihren einzigen Treffer, 65 davon im schlichten Rahmen «Ich …» (`ergebnis/kombination-ich-aussagen.txt`). Die meisten sind Alltagssätze («Ich streite immer wieder», «Ich schäme mich immer wieder»), deren Treffer vorher zufällig der Suizidabschnitt war; dort ist der Verlust kein Sicherheitsproblem, aber die Leermeldung statt eines Treffers.

**Gegenrechnung.** r4-74 verbessert auch vieles: In den Bausteinen erhalten 886 Ich-Aussagen neu einen Treffer. In Gruppe P führen 10 von 60 Anfragen neu zuerst auf einen Sicherheitsabschnitt («Ich werde immer wieder geschlagen», «Sie redet oft vom Sterben», «Er schreibt immer wieder Abschiedsbriefe»), weitere wechseln vom Suizidabschnitt auf den passenderen Abschnitt zur Selbstverletzung («Ich ritze mich immer wieder»); 11 verlieren einen Sicherheitsabschnitt als ersten Treffer. Die Stopp-Regel fragt nach Verschlechterungen, nicht nach der Bilanz.

**Ursache und Eingrenzung** wie N836-1. Mit V2 verliert in Gruppe P keine Anfrage den Suizidabschnitt; in den Bausteinen verlieren mit V2 noch 57 statt 330 ihren Treffer.

### N836-3 · Merge vor der Nachprüfung (hoch, Ablauf)

- PR #836: erstellt 19:26:40 UTC als Entwurf, gemergt 19:33:31 UTC als `8d95e6a` über das Konto von Christa Egger. Die PR-Beschreibung beginnt mit «Bitte nicht mergen, bevor die Nachprüfung vorliegt»; dasselbe steht in der Commit-Nachricht von `c441e42`, im Abschnitt «r4-74» der Pendenzendatei und in `releaseApproval.independentReviewWaiver.appliedTo`.
- Der Merge-Commit enthält keinen Merge-Auftrag im Wortlaut, die PR-Beschreibung auch nicht. R65-P01 verlangt ihn an einer der beiden Stellen. Ob ein Auftrag in einer Sitzung erteilt wurde, kann ich nicht sehen.
- Der Codex-Review meldet «Completed» um 19:33:58 UTC ohne Befund, also 27 Sekunden nach dem Merge. PR-Reviews: keine.
- Folge: `main` sagt seit dem Merge an drei Stellen etwas, das nicht mehr stimmt: Kopfzeile «In Arbeit: r4-74 … Entwurf», Abschnitt «r4-74 … Entwurf, nicht gemergt», Zeile zu #713 («offen, Nachprüfung vor dem Merge»). Ob r4-74 live ist, habe ich nicht geprüft (Grenze).

### N836-4 · Kinder-Regel ohne Tötungswort (mittel)

Die Regel setzt «Bei Eskalation, Gewalt oder fehlender Betreuung» zuerst, sobald «Kind» oder «Kinder» ohne eines der Schutzwörter davor in einer Gewaltanfrage steht. Sie unterscheidet nicht, wer betroffen ist. Der Gewaltabschnitt bleibt in allen Fällen an zweiter Stelle.

| Anfrage | r4-73 zuerst | r4-74 zuerst |
|---|---|---|
| Mein Kind schlägt mich | Kinderschutz | Kinderschutz, angeheftet |
| Mein erwachsenes Kind bedroht mich | Gewalt | Kinderschutz |
| Ich wurde als Kind geschlagen | Begriffe | Kinderschutz |
| Das Kind würgt die Katze | Kinderschutz | Kinderschutz, angeheftet |

Nicht erfasst sind «Kindern», «Tochter», «Sohn» und Mundart («Mini Frau schlaat d Chind» führt auf einen Quelleneintrag; «Mein Sohn (8) wird von der Mutter geschlagen» zeigt den Gewaltabschnitt vorher und nachher nicht unter den ersten drei). Gruppe F in `ergebnis/proben-auswertung.txt`.

### N836-5 · Regel «Gewalt gegen die eigene Person» (mittel)

Ein Gewaltwort und «mich» genügen für die Anheftung des Gewaltabschnitts; die Suche wertet dann nur noch die Gewaltbegriffe.

- Selbstverletzung wird verdrängt: «Sie ritzt sich und schlägt mich» zeigte vorher «Wenn Selbstverletzung ein Thema ist» an dritter Stelle, nachher nicht mehr unter den ersten drei. «Er schlägt sich selbst, das macht mich fertig» führt neu auf den Gewaltabschnitt.
- Verneinungen: «Er hat mich nie geschlagen» und «Mich hat niemand geschlagen» heften den Gewaltabschnitt an.
- Zusammen mit einer Anfrage des Nicht-mehr-Wollens («Er schlägt mich, ich will nicht mehr»): Gewaltabschnitt und Kinderschutz zuoberst, der Suizidabschnitt nicht unter den ersten fünf (gemessen). Das nennt der Bericht der bauenden Sitzung selbst (Abschnitt 7, Punkt 3); vorher stand keiner der Sicherheitsabschnitte oben.

Gruppe G und D in `ergebnis/proben-auswertung.txt`.

### N836-6 · Anfragen des Nicht-mehr-Wollens (mittel)

- Die Regel greift nur bei der Wortfolge am Ende der Anfrage. Nicht erkannt: Nebensatzstellung («Was tun wenn sie nicht mehr will», «Er sagt dass er nicht mehr mag»), ein eingeschobenes Wort («Mein Sohn will einfach nicht mehr»), «Sie will nicht mehr weiter», Mundart ausser «wott» («Ich mag nümm», «Ich will nimmer»), und eine Fortsetzung, die die Sorge verstärkt («Er hat gesagt er will nicht mehr und hat Tabletten gesammelt» führt weiter zuerst auf «Wenn die Person keine Behandlung möchte oder abbricht»).
- Wo sie greift, wertet die Suche nur noch die Suizidbegriffe. Der bisherige Ersttreffer «Wenn die Person keine Behandlung möchte oder abbricht» steht dann nicht mehr unter den ersten drei, auch wenn die Anfrage die Behandlung nennt («Therapie abgebrochen, sie will nicht mehr», «Medikamente: er will nicht mehr»).
- Beim Tippen: Jeder Satz, der mit einer Ergänzung weitergeht, zeigt für die Dauer des Zwischenstands den Suizidabschnitt zuoberst und wechselt dann («Er will nicht mehr zur Schule»); 16 von 208 getippten Sätzen (`ergebnis/tippen-zwischenstufen.txt`).
- Die Reihenfolge ist, wie der Bericht sagt, eine Sicherheitsabwägung und fachlich anzusehen. Aus Prüfsicht spricht nichts gegen sie.

### N836-7 · Neue Begriffe mit Fehltreffern (niedrig)

- «vom Sterben», «redet / spricht / schreibt vom Tod» führen auch im Trauerfall auf den Suizidabschnitt («Sie spricht vom Tod ihrer Mutter», «vom Sterben der Grossmutter»). Mit einem Wort dazwischen greift die Wendung nicht («Sie schreibt in Nachrichten vom Tod», «Er redet nie vom Tod»).
- «geschnitten», «schneidet», «es blutet»: «Haare geschnitten», «Er schneidet mir das Wort ab», «Nasenbluten, es blutet» führen auf den Abschnitt zur Selbstverletzung.
- Die Ich-Form ist schwächer als die dritte Person: «Er hat sich geschnitten» führt auf den Abschnitt zur Selbstverletzung, «Ich habe mich geschnitten» auf «Suizidgedanken und Suizidalität» der Diagnoseseite, der Abschnitt zur Selbstverletzung steht nicht unter den ersten drei.
- «Er sagt er liebt mich nicht» führt auf zwei Bücherabschnitte (im Bericht genannt), «Was habe ich getan» neu auf die Diagnoseseite.

### N836-8 · Ergänzung gegenüber #713 (niedrig) · Empfehlung: drin lassen

**Korrekt.** Die ganze Wortliste (1 680 838 Wörter) läuft durch die Umschreibung der Suche: Die Wortstamm-Regel schreibt 298 verschiedene Wörter um, alle enthalten einen der zehn Stämme; zusammen mit den 22 schon aufgezählten Formen sind das die 320 des Berichts (`ergebnis/wortliste-umschreibungen.txt`). Mit `STEM` auf die zehn Stämme gibt `wortstamm.cjs` 320 Wörter, vorher 22 zuerst, 294 ohne Treffer, 4 anderer Ersttreffer, nachher 320 zuerst; die Datei ist byte-gleich mit der eingecheckten.

**Eingriff in andere Regeln.** Die Regel ändert nur den Text, aus dem Suizidsignal, Wendungen und Suchgruppen gebildet werden. Die Regel für Tötungsverben erhält weiter die ursprüngliche Eingabe. Wendungen bleiben erhalten, weil kein Wort einer Wendung umgeschrieben wird. Folge für die Reihenfolge: Ein Wort mit Suizid-Wortstamm zählt als Suizidsignal, deshalb steht bei «suizidgefährdet und droht mich umzubringen» neu der Suizidabschnitt vor dem Gewaltabschnitt (vorher umgekehrt); beide bleiben unter den ersten zwei. Im Kombinationslauf ändert sich die Reihenfolge der Anheftung 81-mal, immer von Gewalt zuerst auf Suizid zuerst und immer, weil die Anfrage neu ein Suizidsignal enthält (Wortstamm, Tippfehler oder neuer Begriff aus #713); verloren geht keine. Verneinungen: «nicht suizidgefährdet» und «kein Suizidrisiko» führen auf den Suizidabschnitt, so wie «nicht suizidal» schon vorher.

**Fehltreffer.** «Selbstmordattentäter», «Suizidprävention», «Suizidforschung», «Suizidrate», «Suizidhilfe», «Freitodbegleitung», «Überdosierung», «überdosiert». Alle führen auf den Suizidabschnitt statt auf nichts. «Medikament überdosiert, Nebenwirkungen» bleibt ohne Treffer. Gegenproben ohne Wortstamm bleiben unberührt («Spritze», «Fritz», «kritzeln», «Lebensmittel», «Abschiedsfeier», «Überdruss»).

**Trennbarkeit.** Sauber: eine Liste, eine Funktion, ein Aufruf in `fixTypos`, fünf Einträge in den Begriffslisten, zwölf Zeilen der Testliste. Ohne den Aufruf (V5) scheitern genau die sechs Erwartungen zur Wortstamm-Regel, sonst ändert sich in meinen Gruppen N und P nichts.

**Empfehlung.** Drin lassen. Die Ergänzung schliesst eine echte Lücke, verschlechtert in meinen Läufen keine Anfrage und ist an N836-1 und N836-2 nicht beteiligt. Der Entscheid bleibt bei Christa Egger; die Ergänzung war nicht Teil ihres Entscheids zu #713.

### N836-9 · Tippfehlerregel (niedrig)

- Ganze Wortliste: Die Tippfehlerregel schreibt fünf Wörter um («Borderliner», «Medikamentes», «Selbstversetzung», «selbstverletzend», «therapier»). Kein Alltagswort wird zu einem Suizidwort; «Selbstversetzung» führt auf den Abschnitt zur Selbstverletzung, wie im Bericht genannt. Die übrigen Kandidaten des Berichts erledigt die Wortstamm-Regel, bevor die Tippfehlerregel greift.
- Wortanfänge (Tippen): Aus 3 742 519 verschiedenen Wortanfängen ab fünf Zeichen schreibt die Suche 610 um. Fast alle gehören zum Schlüsselwort selbst. Ausnahmen: «selbstmod» (beim Tippen von «Selbstmodell») zeigt kurz den Suizidabschnitt, «krisenlan» («Krisenland») den Krisenplan, «therape» («Therapeut») die Therapie (`ergebnis/wortliste-wortanfaenge.txt`).
- Eigene Gegenproben (Gruppe E): «schlafen», «Schlagzeug», «Meditation», «Medikation», «Lebensmittel», «Todeswunde», «Abschiedsfeier», «Überdruss», «Selbstmode» bleiben unverändert.
- Die Regel korrigiert keine Tötungsverben («umbrigen»); siehe N836-1.

### N836-10 · Quellenblock, «FU», «IV» (niedrig)

- Suchindex: 215 Einträge vorher und nachher, gleiche Ziele. 15 Abschnitte verlieren den Text des Quellenblocks, 3 erhalten neue Suchbegriffe; der sichtbare Text aller 215 Einträge ist gleich. 31 Wörter kommen nachher in keinem Eintrag mehr vor (`ergebnis/suchindex-verschwundene-woerter.txt`), vor allem aus den Angaben «Verwendet in» («Akuthinweis», «Risikostufen», «Sicherheitsplans») und zwei Zahlen.
- Der neue Suchbegriff zu `fragen.html#f-einweisung` nennt eine Frist in Tagen. Er ist nicht sichtbar; die Angabe steht auch im sichtbaren Text der Website («zehn Tage» führte schon vorher auf den Begriff «FU» und diese Frage).
- «FU»: vorher 192 Treffer (jedes «für»), nachher 8, zuerst der Begriff «FU». «IV»: allein noch ein Quelleneintrag; «IV Rente», «IV-Rente» und «IV Anmeldung» haben nachher keinen Treffer (vorher zufällige). Die Website behandelt das Thema nicht.

### N836-11 · Bericht der bauenden Sitzung (niedrig)

- Nachgerechnet: `vergleich.cjs` gegen `9d0d237` und `b87535b` ergibt dieselben Zahlen (253 / 42, 205 / 147, 5046 / 348, 27 / 25; Stopp-Regel 0, 16, 26, 105; 0 JS-Fehler). Alle sieben Ergebnisdateien sind byte-gleich mit den eingecheckten.
- Der Aufruf von `wortstamm.cjs` im Bericht reicht nicht: Ohne die Umgebungsvariable `STEM` prüft das Skript 1716 Wörter (auch «selbstverletz» und «ritz»), nicht 320.
- «Geändert in `site/`: … `assets/interaktion.js`»: Die Datei heisst `site/js/interaktion.js`.
- Die Einordnung der 16 Fälle unter b) und der 26 unter c) ist für diese Fälle haltbar: Es sind Einzelwörter aus Quellenblöcken, «Selbstverletzungen» und Zufallstreffer. Der Schluss «kein blockierender Fall» gilt aber nur für die vier geprüften Mengen. Zwei der Fälle («Rückfall immer wieder», «immer wieder Krisen») zeigen den Mechanismus von N836-1 und N836-2 schon; der Bericht nennt ihn («weil die beiden Füllwörter dort vorkommen»), prüft ihn aber nicht mit Sicherheitsanfragen.

### N836-12 · Vorbestehende Lücken (Hinweis)

Nicht durch r4-74 entstanden, aber Voraussetzung für N836-1 und für eine dauerhafte Lösung:

- «bring… um» mit Fortsetzung ohne Satzzeichen wird nicht als Tötungsanfrage erkannt («Er bringt sich um wegen mir», «Sie bringt sich um heute Nacht»: kein Treffer, vorher und nachher).
- «Sie hat gesagt sie bringt erst die Kinder und dann sich um»: kein Treffer, vorher und nachher.
- «Ich habe eine Überdosis genommen» führt auf «Krisenplan» und «Nach der Krise», «Ich habe Suizidgedanken» zuerst auf die Diagnoseseite; der Abschnitt «Wenn Suizidgedanken ein Thema sind» steht nicht zuoberst.
- Mundart: «Si het gseit si well stärbe», «Er het mi gschlage» ohne Treffer.

## Was ich geprüft habe

**1 Gates auf dem PR-Kopf `b87535b`** (`ergebnis/gates/`)

| Gate | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise; `git status` danach leer |
| `build.mjs --production --verify-site` | Parität bestanden, 35 Dateien byte-gleich |
| `selftest.mjs` | 127 von 127 |
| `suchtest.mjs site` | 253 von 253, 0 JS-Fehler |
| `sprachtest.mjs site` | 74 Prüfungen bestanden, 0 JS-Fehler |
| `layouttest.cjs` | 240 Seitenzustände, 38 Bedienproben, 2 Abweichungen (2 bekannt, 0 neu); Rückgabewert 1 wegen der bekannten Abweichungen |

**2 Diff gegen `main`.** `site/`: 24 HTML-Dateien unterscheiden sich nur in der Kennung; `suche.html` zusätzlich im Suchindex; `js/interaktion.js`; Dateiliste gleich. Sichtbarer Text von `suche.html` und sichtbarer Text aller 215 Einträge im Browser gleich. Die Behauptung «kein sichtbarer Wortlaut geändert» stimmt. Testliste: 216 bisherige Zeilen, davon eine geändert («Geheimnis»), 37 neu.

**3 bis 5 Stopp-Regel und Regeln** mit eigenen Anfragen im Browser gegen beide Stände, Anheftung direkt gelesen:

| Menge | Anfragen | Datei |
|---|---|---|
| Eigene Proben, 13 Gruppen A bis M | 479 | `proben.txt`, `ergebnis/proben-ergebnis.txt`, `ergebnis/proben-auswertung.txt` |
| Tötungswort mit Füllwort, natürliche Sätze, und Kontrolle | 54 | `proben-toetungswort-fuellwort.txt` |
| Aussagen mit Füllwort ohne Tötungswort | 60 | `proben-fuellwort-sicherheit.txt` |
| Tötungswort mal Zusätze | 2000 | `ergebnis/kombination-toetungswort.txt` |
| Suizid und Gewalt mal Zusätze | 680 | `ergebnis/kombination-suizid-gewalt.txt` |
| Ich-Aussagen aus Bausteinen | 4416 | `ergebnis/kombination-ich-aussagen.txt` |
| Zwischenstufen beim Tippen | 5452 | `ergebnis/tippen-zwischenstufen.txt` |
| Ganze Wortliste und ihre Wortanfänge | 1 680 838 und 3 742 519 | `ergebnis/wortliste-*.txt` |

Ergebnis je Kriterium:

- **a)** Erkannte Tötungsanfragen: kein Fall; die Anheftung bleibt in allen Läufen, auch mit Satzzeichen, Grossschreibung, Verneinung und in Kombination mit jeder neuen Regel. Nicht erkannte Tötungswörter mit Füllwort: 20 Fälle in natürlichen Sätzen, 11 im Kombinationslauf (N836-1).
- **b)** Anheftung verloren: 0 in allen Läufen. Suizid und Gewalt zusammen: 680 Anfragen, keine verliert die Anheftung oder den Suizidabschnitt.
- **c)** Ich-Aussagen ohne Treffer: N836-2. In den 479 eigenen Proben sonst vier Fälle ohne Sicherheitsbezug («IV Rente», «IV-Rente», «IV Anmeldung», «Sie ruft immer wieder an»).

**6 Nachrechnen des Berichts:** siehe N836-11.

**7 Tippen, JS-Fehler, 375 px und 200 % Schrift.** 0 JS-Fehler in allen Läufen. Bei 375 px Breite und 100 % sowie 200 % Schrift, mit echter Tastatureingabe, vorher und nachher: kein waagrechter Überlauf, Suchfeld 295 × 44 px (200 %: 295 × 88 px) mit 16 px (32 px) Schrift, kein Treffer breiter als das Fenster, erster Treffer mit der Tabulatortaste erreichbar, Statuszeile und Leermeldung wie vorher (`ergebnis/bedienung-375.txt`, zwei Bilder). Das Stylesheet ist byte-gleich. Zwischenstufen: N836-1, N836-6, N836-9.

**8 Pendenzendatei auf dem PR-Kopf.** Der Abschnitt «r4-74» hält die Zitierregel ein: Er umschreibt die Proben («Formulierung des Nicht-mehr-Wollens», «eine dritte Wendung für das Reden vom Tod», «ein Alltagssatz mit einem Wort für Schneiden») und nennt nur Einzelbegriffe. PR #833: gemergt als `3764d45` am 26.11.2026, 19:06:39 UTC, stimmt mit GitHub. Links auf #836, #833 und #713 stimmen; #713 ist offen und Entwurf. Der Status von #836 war beim Schreiben richtig und ist seit dem Merge überholt (N836-3). Die Angaben zum Live-Stand habe ich nicht geprüft.

**9 Release-Felder.** `BUILD = 'r4-74'` in `authoring/tools/contract.js`, `assetVersion` «r4-74», `data-puk-site-build="r4-74"` und `interaktion.js?v=r4-74` in `site/`. `releaseApproval`: `pendingScope` beschreibt r4-74 zutreffend, einschliesslich der Ergänzung; `independentReview` «entfaellt», `independentReviewWaiver.version` «r4-74». `appliedTo` sagt «vor dem Merge eine Nachprüfung durch eine Sitzung, die nicht gebaut hat»; das ist nach dem Merge nicht mehr erfüllt.

## Empfehlung

1. **Jetzt:** Entscheid von Christa Egger, ob r4-74 zurückgenommen oder nachgebessert wird. Nachbessern heisst mindestens: «sagt», «immer», «wieder», «oft» aus der Füllwortliste nehmen (Messung V2) und die Sätze aus N836-1 und N836-2 als Erwartungen festschreiben. Die Nachbesserung braucht wieder eine Prüfung vor dem Merge.
2. **Danach:** die Erkennung ergänzen, statt auf Zufallstreffer zu bauen: «bring… um» mit Fortsetzung, Mundart- und Tippformen des Tötungsverbs, «denke … ans Sterben / an den Tod» mit Wörtern dazwischen (N836-12).
3. **Ergänzung gegenüber #713:** drin lassen (N836-8).
4. **Pendenzendatei und `releaseApproval` nachführen:** Merge von #836, dieser Befund, Status von #713 (N836-3).
5. **In einen nächsten Patch:** N836-4 bis N836-7, N836-11.

## Grenzen dieser Prüfung

- Chromium über Playwright (`/opt/borderline-browser`), ein Rechner. Keine echten Geräte, keine Screenreader, kein zweiter Browser. 200 % Schrift ist über die Schriftgrösse des Wurzelelements nachgestellt, nicht über die Einstellung des Betriebssystems.
- Kein axe-core-Lauf; die Zahl der bauenden Sitzung (96 Läufe, 0 Verstösse) ist nicht nachgerechnet.
- Der Live-Stand und die Netlify-Vorschau sind nicht geprüft; ich habe keine fremden Adressen abgerufen.
- Die Proben habe ich selbst gewählt. Sie sind keine Stichprobe echter Suchanfragen; wie häufig die Fälle aus N836-1 und N836-2 vorkommen, kann ich nicht sagen. Die Wortliste ist allgemeines Deutsch, kein Schweizerdeutsch.
- Die Anheftung lese ich über eine Messzeile, die `queryGroups` der Website nach aussen reicht; sonst läuft das Skript der Website unverändert. Die Varianten V1 bis V5 sind Messkopien ausserhalb des Repositorys, keine geprüften Korrekturen.
- Keine fachliche Beurteilung der Reihenfolgen. Ob R34-P01 a) auch nicht erkannte Tötungswörter meint, ist eine Lesart; ich habe sie offengelegt.
- Ob für den Merge von #836 ein Auftrag vorlag, ist auf GitHub nicht belegt und für mich nicht einsehbar.

## Dateien in diesem Ordner

- `proben.txt`, `proben-toetungswort-fuellwort.txt`, `proben-fuellwort-sicherheit.txt`: eigene Proben im Wortlaut.
- `lauf.cjs` (Vorher-Nachher-Lauf), `auswertung.cjs` (Stopp-Regel je Ergebnisdatei), `kombinationen.cjs`, `wortliste.cjs`, `bedienung.cjs`.
- `ergebnis/`: alle Ergebnisse, `gates/` mit den Ausgaben der Gates, `varianten.txt` mit den Messvarianten.

Wortliste: `npm install all-the-german-words@1.1.0` in einem Ordner ausserhalb des Repositorys; `node wortliste.cjs <vorher-site> <nachher-site> <woerter.json> <ausgabeordner>`.
