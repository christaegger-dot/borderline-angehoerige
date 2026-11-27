**Bereit zum Merge: ja** (vierte Nachkontrolle von Kopf `2bf11b5`, 27.11.2026, 05:00 UTC). Kein blockierender Befund mehr offen; die verbleibenden Hinweise stehen in Abschnitt 8. Frühere Urteile: Kopf `deadba9` nein (N855-12), `64593de` nein (N855-11), `6d9428d` nein (N855-9), `6210121` nein (N855-1, N855-2).

# Nachprüfung der Härtung des Suchrasters (PR #855)

**Geprüft:** [PR #855](https://github.com/christaegger-dot/borderline-angehoerige/pull/855) «Suchraster gehärtet (N847-2 bis N847-8, G846-2); Entscheide zu N848-1 bis N848-3 eingetragen», Entwurf, Branch `claude/sharp-mendel-6ecwbi`, Kopf `6210121`, Basis `main` = `3209df7`. Geprüft am 27.11.2026 zwischen 01:50 und 03:00 UTC.

**Wer:** eine eigene Prüfsitzung, die den PR nicht gebaut hat. Auftrag: Prüfung vor dem Merge, Leitfrage «Kann das gehärtete Raster noch falsch bestehen?». Die Prüfung ändert nichts an `site/`, nichts an `authoring/` und nichts am PR #855.

**Ändert die Website nicht.** Der PR ändert nur das Werkzeug, die Rasterdaten, den CI-Workflow, die Pendenzendatei und seinen Nachweis.

## Ergebnis in Kürze

Die Härtung tut, was ihr Bericht sagt, und sie ist ein klarer Fortschritt gegenüber `main`. Alle Messungen des Berichts habe ich nachgerechnet. Sie stimmen auf die Zahl: K1 313, K2 1, K3 474, K5 157, K9 130, r4-76 → r4-77 428 Fälle (die Liste ist identisch). Auch die Abdeckung stimmt. Die CI ist grün; der volle Lauf dauert auf GitHub 6 min 21 s.

**Das Raster kann aber weiter falsch bestehen.** Zwei Wege sind nicht geschlossen:

1. **Darstellung (N855-1):** Das Raster liest die Reihenfolge aus dem DOM, nicht vom Bildschirm. Ausgeblendet erkennt es nur, was `display:none`, `visibility`, `opacity:0` oder eine Fläche null hat. Eine einzige CSS-Zeile mit `order` setzt den Suizidtreffer auf dem Bildschirm ans Ende; das Raster meldet 0. Dasselbe gilt für ein einziges Attribut, das die Website schon kennt (`data-puk-sr-only` oder die Klasse `puk-sr`). Es macht den Suizidtreffer oder die Sicherheitszeile der Leermeldung unsichtbar, und das Raster meldet ebenfalls 0. K1 und K2 erkennt das Raster nur in ihrer genauen Form.
2. **Workflow (N855-2):** Der PR bringt seinen eigenen Workflow mit, denn GitHub führt bei `pull_request` die Workflow-Datei des PR aus. Ein PR kann also die Variante «Werkzeug der Basis» umschreiben oder streichen, und alle Jobs bleiben grün. Der Job `suchraster-ausnahmen` zeigt eine Änderung am Workflow nicht an. Der Kommentar im Workflow sagt dagegen: «Ein Pull Request kann das Raster also nicht abschwächen». Das stimmt so nicht.

## 1 Prüfpunkte

### 1.1 N847-2: Werkzeug und Proben der Basis in der CI

| Frage | Befund |
|---|---|
| Läuft das Werkzeug der Basis wirklich? | **Ja.** Die Basis wird als Sparse-Checkout mit `site`, `authoring/tools` und `authoring/tests` nach `suchraster-basis/` geholt. Das Werkzeug findet seine Proben über `import.meta.url` (`here/../tests`), also die Proben der Basis. Im CI-Lauf von #855 lief tatsächlich das **alte** Werkzeug aus `suchraster-basis/`. Sein Kopf lautet «Suche unverändert: suche.html, js/interaktion.js und _headers …», ohne `css/`. Es endete nach 0,1 s über die Abkürzung. So hatte es der Bericht angekündigt. |
| Ausnahmen | Die Variante «Basis» gibt die Ausnahmen des PR ausdrücklich mit (`--ausnahmen=authoring/tests/suchraster-ausnahmen.tsv`). Das neue Werkzeug nimmt sie an. Das **alte Werkzeug überhört** `--ausnahmen` und liest die leere Liste der Basis. Das betrifft nur diesen PR. |
| Kann ein PR über Werkzeug, Proben oder Ausnahmen beide Läufe grün machen? | **Über Werkzeug und Proben nicht.** Die Basis-Variante bleibt mit Werkzeug und Proben der Basis rot. **Über Ausnahmen nur mit rotem Job `suchraster-ausnahmen`.** Jede neue oder geänderte Zeile lässt ihn scheitern. **Über den Workflow ja**, siehe N855-2. |
| Bindung an den Bezug | **Wirkt.** K6c scheitert mit «Ausnahme veraltet». Eine Ausnahme gilt nur, solange die Basis die gleiche Versionskennung hat. Bleibt eine gemergte Ausnahme stehen, scheitern spätere PRs: als «veraltet», mit «ohne Anwendung» (`--ungenutzt-scheitert`) oder über die Abkürzung, weil Ausnahmen bei unveränderter Suche als Fehler zählen. |
| Ablehnung zu breiter Muster | **Wirkt nur gegen die naiven Muster** (`/./` in K6b). Geprüft werden vier feste Sätze. Das Muster `/^(?!x$|heute|öffnungs).+/` trifft jede andere Anfrage und wird angenommen. Mit sechs solchen Zeilen besteht r4-73 → r4-75 in den Proben mit «44 als Ausnahme erlaubt» (`ergebnis/umgehung-ausnahmen-r4-73-r4-75.txt`). Siehe N855-4. |
| Höchstzahl je Ausnahme | **Wirkt je Zeile** (100). Ein Muster lässt sich aber in mehrere Zeilen aufteilen (`/^[a-m]…/`, `/^[n-z]…/`). Dann deckt jede Zeile weniger als 100 Anfragen. |
| Erlaubte Anfragen einzeln gelistet? | **Ja.** `ERGEBNIS.txt` listet alle, die Step-Summary die ersten 200; das Artefakt wird hochgeladen. |

### 1.2 N847-3: Anfragen ausserhalb des Rasters

- **K3 wiederholt:** Das Raster meldet jetzt **474 Verschlechterungen** (Menge «saetze»), davon 143 «Suizid nicht mehr zuoberst», alle bei den neuen Handelnden «mein grossvater», «meine grossmutter» und «mein opa». Das ist dieselbe Zahl wie im Bericht.
- **Dasselbe Muster mit anderen Handelnden (V9):** Ich habe eine Synonymgruppe für Kollegin, Kollege, Chefin, Chef und «arbeit» eingebaut, nach dem Vorbild von K3. Bei Sätzen mit diesen Handelnden verschlechtern sich **1 076 von 5 184** (1 060 verloren, 352 Suizid nicht mehr zuoberst, 8 RANG3; `ergebnis/v9-ausserhalb-des-rasters.txt`). Das gehärtete Raster meldet dazu **0 Verschlechterungen und 0 geänderte Anfragen** in allen 62 863 Anfragen (voller Lauf mit `--immer`). N847-3 ist damit für die Grosseltern behoben, der Mechanismus bleibt aber offen. Das Raster schützt nur, was es aufzählt.
- **Naheliegende Satzformen, die weiter fehlen oder nur vereinzelt vorkommen** (gezählt in `suchraster-proben.txt`, 1 037 Zeilen):
  - **Nebensätze mit dem Verb am Ende**, die typische Suchform «Was tun, wenn …»: 3 Proben. In «saetze» und «ichRahmen» gibt es sie gar nicht; der Rahmen setzt eine Aussage in Hauptsatzstellung ein.
  - Weitere Handelnde: Schwiegermutter, Schwiegervater (0), Stiefmutter und Stiefkinder (nur der Stiefvater, 1), Enkel (0), Kollegin, Kollege, Vorgesetzte (0), Mitbewohnende (0), Lehrpersonen (0), Mehrzahl wie «meine Eltern» (1), Vornamen (0).
  - Andere Zeitformen und Modalverben («wollte», «wird sich …», «könnte sich etwas antun»): 5.
  - Schreibweise ohne Umlaut («schlaegt», «lebensmuede»): 11. Mundart nur in den Gruppen K und ZF.

### 1.3 N847-4: Darstellung

**K1 und K2 wiederholt: erkannt.** K1 meldet 313 Fälle und die Leermeldung, K2 meldet 1 (Leermeldung). Weitere Arten, einen Treffer unsichtbar zu machen oder auf dem Bildschirm nach unten zu setzen, alle gegen r4-76 mit den Proben (1 158 Anfragen und die Leermeldung):

| Konstruktion | Änderung | Bildschirm bei «will sterben» bzw. Leermeldung | Raster |
|---|---|---|---|
| V1 | `…[data-search-target="krise.html#suizid"]{order:99}` (die Trefferliste ist ein Grid) | Suizidtreffer am Ende der Liste; zuoberst «Krisen begleiten» | **0** |
| V2 | `.puk-site-result-list{display:flex;flex-direction:column-reverse}` | ganze Liste umgekehrt; zuoberst Begriffe und Fragen | **0** |
| V3 | Suizidtreffer `max-height:0;overflow:hidden` | unsichtbar | **0** |
| V4 | Suizidtreffer `clip-path:inset(50%)` | unsichtbar | **0** |
| V5 | Suizidtreffer `position:absolute;left:-9999px` | ausserhalb des Bildschirms (im Bericht als Grenze genannt) | **0** |
| V6, V6b | Sicherheitszeile der Leermeldung mit `clip-path` bzw. ausserhalb | Sicherheitslink unsichtbar | **0** |
| **V7** | **nur Markup:** `<p class="puk-sr">` um den Sicherheitslink der Leermeldung (Klasse der Website für Bildschirmleser) | Sicherheitslink unsichtbar (Bild `ergebnis/sicht/v7-leer-sr-qqxzqvwxq.png`) | **0** |
| **V7b** | **nur Markup:** `data-puk-sr-only` am Suizidtreffer (Attribut der Website) | Suizidtreffer unsichtbar | **0** |
| zum Vergleich K1 | `display:none` | unsichtbar | 313 + Leermeldung |

Der Bildschirmbefund ist mit `werkzeug/sichtpruefung.cjs` gemessen (Treffpunkt `elementFromPoint` nach `scrollIntoView`, Reihenfolge nach Lage auf der Seite; `ergebnis/sicht/sichtpruefung.txt`) und auf Bildern geprüft. Die Prüfung `checkVisibility` mit Fläche grösser null erkennt kein Abschneiden durch `overflow`, `clip` oder `clip-path`. Eine Fläche von 1 × 1 Pixel (Bildschirmleser-Muster) gilt für sie als sichtbar. Die Reihenfolge nimmt das Raster aus dem DOM; CSS `order`, `*-reverse` und Rasterplatzierung ändern aber die Reihenfolge auf dem Bildschirm.

### 1.4 N847-5: RANG1 und RANG3

- **K9 wiederholt:** Proben 157 geändert, 130 gemeldet: 86 «Suizid nicht mehr zuoberst» und 44 verdrängt, wie im Bericht. Die **27 ungemeldeten** sind alle Anfragen mit einer Bedrohung durch Dritte. Bei ihnen stand vorher Gewalt vor Suizid, nach K9 steht Suizid vor Gewalt (`ergebnis/k9-ungemeldet.txt`). Der Suizidabschnitt rückt also nach oben. Nach R34-P01 ist das keine Verschlechterung, siehe aber N855-5.
- **RANG1** ist richtig umgesetzt: Suizid ist im Bezug zuoberst, im Prüfstand nicht. Gemeldet bei K1 (232) und K9 (86). Strenger als R34-P01: Auch «Kinder zuerst» wird gemeldet und bräuchte eine Ausnahme. Das scheitert in die sichere Richtung.
- **RANG3** ist richtig umgesetzt: Der Bezug hat keinen Sicherheitsabschnitt unter den ersten zwei, aber einen auf Rang 3; der Prüfstand hat keinen unter den ersten drei. Mit V8 nachgewiesen: Ist «Wenn Suizid angesprochen wird» ausgeblendet, meldet das Raster in den Proben genau 1 RANG3-Fall (`ergebnis/v8-rang3.txt`). Ein anderer Sicherheitsabschnitt auf Rang 3 gilt als Ersatz; das entspricht der Definition «letzter Sicherheitsabschnitt».

### 1.5 N847-6 bis N847-8: K5, Zeitlimit, Matrix, fester Bezug

- **K5 wiederholt:** **157 «Anheftung verloren»**, dazu 118 verloren und 39 verdrängt. N847-6 ist behoben: Angeheftet zählt nur, was oben sichtbar steht. Für die Reihenfolge gilt aber auch hier N855-1, denn «oben» heisst oben im DOM.
- **Zeitlimit und Matrix:** `timeout-minutes: 30` für `build-and-compare` und `suchraster`, 5 für `suchraster-ausnahmen`, `fail-fast: false`. Die drei Varianten laufen parallel zu `build-and-compare`. Bei `workflow_dispatch` läuft das Raster nicht; das ist dokumentiert. Der Pfadfilter bleibt, siehe N855-7.
- **Fester Bezug r4-73:** Die Variante lief auf GitHub voll: 62 863 Anfragen, 428 Verschlechterungen, grün (`--nur-bericht`), **6 min 21 s Rasterlauf, Job 7 min 2 s**. Das Ergebnis gleicht meinem lokalen Lauf r4-76 → r4-77, weil r4-76 bis auf die Kennung r4-73 ist (N840-1). Die Laufzeit liegt weit unter dem Limit von 30 Minuten. Lokal brauchte der volle Lauf 506 s bis 566 s auf 4 Kernen unter Last. Siehe N855-6.

### 1.6 G846-2: Abdeckung

Ich habe die Sätze aus `suchraster.json` des PR mit dem Skript `abdeckung.cjs` der Gegenprüfung #846 gezählt (`werkzeug/raster-aus-suchraster-json.cjs`, `ergebnis/abdeckung-cjs-r4-76-r4-77.txt`). Das Ergebnis ist **identisch** mit dem Raster, auf dieselben 37 584 Sätze:

| Thema | Sätze | r4-76 Raster / Skript | r4-77 Raster / Skript |
|---|---|---|---|
| Suizid | 17 400 | 43,7 % / 43,7 % | 67,5 % / 67,5 % |
| Selbstverletzung | 5 568 | 27,6 % / 27,6 % | 36,8 % / 36,8 % |
| Gewalt | 14 616 | 45,0 % / 45,0 % | 72,3 % / 72,3 % |

Einschränkung: Das Raster zählt nur sichtbare Treffer, das Skript alle nicht ausgeblendeten. Bei r4-76 und r4-77 macht das keinen Unterschied. Den Anteil leerer Ergebnisse (r4-77 Suizid: 3 867 von 17 400) zeigt nur das Skript.

### 1.7 Falsch scheitern

- **r4-76 → r4-77 ohne Ausnahmen:** 428 Verschlechterungen, alle VERDRAENGT. Die Fälle sind dieselben wie in der Liste des PR (Art, Menge und Anfrage, sortiert, mit `diff` verglichen). Sie bestätigen N848-1.
- **Unverändert:** r4-77 → r4-77 ohne Abkürzung (`--immer`), alle 62 863 Anfragen: **0 Verschlechterungen, 0 geändert**. Der Lauf ist deterministisch. Mit Abkürzung endet er sofort mit 0; so auch der CI-Lauf von #855. Die Versionskennung kommt in `site.css` und `_headers` nicht vor, in `interaktion.js` nur in Kommentaren mit festem Wortlaut. Ein neuer Release ohne Änderung an der Suche löst also keinen vollen Lauf aus.
- Strenger als R34-P01 und damit in die sichere Richtung: RANG1 auch bei «Kinder zuerst»; VERDRAENGT auch bei passendem Ersatz. r4-78 wird dafür enge Ausnahmen brauchen; der Bericht des PR sagt das.

### 1.8 Ablauf

- **CI auf `6210121`: alle Jobs grün.** `build-and-compare` 49 s; `suchraster-ausnahmen` 7 s («Keine neue Ausnahme»); `werkzeug-der-basis` 26 s und `werkzeug-des-pr` 44 s, beide über die Abkürzung; `fester-bezug-r4-73` 7 min 2 s.
- In diesem PR prüft die Variante «Basis» mit dem alten Werkzeug, ohne `css/` in der Abkürzung. Weil `site/` unverändert ist, spielt das keine Rolle.
- **Nicht beobachtet:** ein voller Lauf der beiden blockierenden Varianten auf GitHub. Er kommt erst mit r4-78. Nach der Laufzeit des festen Bezugs ist er unkritisch.
- Gates des PR: Nicht wiederholt. `site/` ist im PR unverändert, und `build-and-compare` ist grün.

## 2 Befunde

### N855-1 (hoch, vor dem Merge beheben): Das Raster misst die Darstellung nur teilweise

**Was:** Reihenfolge und Sichtbarkeit misst das Raster nicht auf dem Bildschirm. V1, V2, V3, V4, V6, V7 und V7b verschlechtern die Darstellung, und das Raster meldet jeweils 0 (Abschnitt 1.3). V7 und V7b brauchen nur ein Attribut, das es in der Website schon gibt.

**Warum blockierend:** N847-4 ist der Auftrag dieses PR («Treffer zählen nur, wenn sie sichtbar sind»). R34-P01 a) handelt vom Rang auf dem Bildschirm. Ein Merge mit dem Vermerk in der Pendenzendatei, ab jetzt gelte eine grüne CI als Freigabe, würde diese Lücke verdecken.

**Vorschlag (klein):**
1. Die Reihenfolge nach der Lage bestimmen (`getBoundingClientRect().top`, dann `left`), nicht nach dem DOM. Das kostet kaum etwas, weil das Rechteck ohnehin gemessen wird.
2. Als sichtbar zählt ein Element nur mit einer Mindestgrösse (z. B. 4 × 4 Pixel), ohne `clip` oder `clip-path` bei sich oder einem Vorfahren und nicht durch das `overflow` eines Vorfahren abgeschnitten (Schnitt der Rechtecke). Für die ersten drei Treffer und die Leermeldung kann zusätzlich der Treffpunkt geprüft werden (`elementFromPoint` nach `scrollIntoView`), wie in `werkzeug/sichtpruefung.cjs`.
3. Die Konstruktionen K1, K2, K5, K9 und V1 bis V8 als **Selbsttest des Rasters** aufnehmen: Jede muss gemeldet werden. Sonst kann eine spätere Änderung am Werkzeug die Härtung unbemerkt zurücknehmen.

Farbe gleich Hintergrund und Überdeckung bleiben als Grenze stehen. Die Überdeckung fängt der Treffpunkt aus Punkt 2 weitgehend ab.

### N855-2 (mittel; vor dem Merge in kleiner Form): Der Workflow ist Teil des PR

**Was:** Bei `pull_request` führt GitHub den Workflow aus dem PR aus. Ein PR kann also in `verify-authoring.yml` Folgendes tun, und alle Jobs bleiben grün:
- die Basis-Variante auf das Werkzeug des PR umstellen;
- `--nur-bericht` anhängen;
- den Job `suchraster-ausnahmen` ändern oder streichen.

Der Job `suchraster-ausnahmen` listet Änderungen an Werkzeug und Rasterdaten, nicht aber am Workflow. Der Kommentar im Workflow, die Pendenzendatei und der Bericht sagen dagegen, ein PR könne das Raster nicht über Werkzeug oder Proben abschwächen. Die Pendenzendatei folgert, nach dem Merge gelte eine grüne CI als Freigabe. Für den Workflow trifft das nicht zu.

**Vor dem Merge (klein):**
1. `.github/workflows/verify-authoring.yml` in die Liste «Geändert gegenüber der Basis» des Jobs `suchraster-ausnahmen` aufnehmen. Besser: Der Job scheitert bei jeder Änderung am Workflow, wie bei einer neuen Ausnahme. Workflow-Änderungen sind selten und brauchen ohnehin eine Prüfung.
2. Die Aussage im Kommentar, im Bericht und in der Pendenzendatei berichtigen: Werkzeug, Proben und Ausnahmen sind abgesichert, der Workflow nicht. Eine grüne CI ist eine Freigabe nach R34-P01 nur, wenn der PR den Workflow nicht ändert.

**Entscheid (Christa Egger), nicht blockierend:** Den Workflow ganz absichern kann nur eine Einstellung im Repository. Möglich ist ein eigener Workflow auf `pull_request_target`, der Werkzeug und Workflow der Basis nimmt und den PR nur als Daten liest. Möglich ist auch eine Pflicht-Prüfung von `.github/` durch eine zweite Person. Eine «erforderliche Prüfung» allein genügt nicht: Sie hängt am Namen des Jobs, und den Inhalt des Jobs bestimmt wieder der PR.

### N855-3 (mittel, nicht blockierend): Anfragen ausserhalb des Rasters

K3 erkennt das Raster jetzt. Derselbe Mechanismus mit anderen Handelnden (V9: Kollegin, Kollege, Chefin, Chef) verschlechtert 1 076 Sätze; das Raster meldet 0 von 62 863 Anfragen. Es fehlen weiter Nebensätze mit dem Verb am Ende («Was tun, wenn …»), weitere Handelnde, andere Zeitformen und Schreibweisen ohne Umlaut (Abschnitt 1.2). Vorschlag:
- Einen Rahmen für Nebensätze in Endstellung aufnehmen, mit eigenen Verbformen je Aussage.
- Eine Restklasse von Handelnden ergänzen.
- Im Job `suchraster-ausnahmen` warnen, wenn `interaktion.js` sich ändert und die Proben nicht. Der Grundsatz «Jede neue Suchregel bringt ihre Proben mit» steht bisher nur im Kopf des Werkzeugs.

### N855-4 (niedrig): Prüfung der Ausnahmen leicht zu umgehen

Die Ablehnung zu breiter Muster prüft vier feste Sätze. Ein Muster mit Verneinung genau dieser Sätze besteht (Abschnitt 1.1), und die Höchstzahl lässt sich durch Aufteilen umgehen. Wirksam bleibt der rote Job `suchraster-ausnahmen`. Er sperrt den Merge aber nur, wenn ihn jemand liest oder wenn er erforderlich ist; nach N855-2 schützt auch das nicht ganz. Vorschlag: Ein Muster ablehnen, das mehr als einen kleinen Anteil der Anfragen ohne Verlust trifft. Gegenprobe wären alle Rasteranfragen, deren Bezug keinen Sicherheitsabschnitt zeigt.

### N855-5 (niedrig, Entscheid): Reihenfolge bei Bedrohung durch Dritte nicht geschützt

Nach der Faustregel (R31-P05) steht bei einer Bedrohung durch Dritte Gewalt vor Suizid. Kehrt eine Änderung das um (K9, 27 Proben), meldet das Raster nichts, weil Suizid oben bleibt. Nach R34-P01 ist das zulässig; der Bericht nennt es als Grenze («RANG1 nur für Suizid»). Ob ein Rang-1-Verlust von Gewalt bei Fremdbedrohung gemeldet werden soll, entscheidet Christa Egger.

### N855-6 (Hinweis): Fester Bezug r4-73

- Die Variante zeigt bei jedem PR «VERSCHLECHTERUNG · 428» mit grünem Haken. Das sind die gewollten Verdrängungen von r4-77.
- Ob sich Verluste über mehrere PRs summieren, sieht man nur, wenn man die Zahlen von Lauf zu Lauf vergleicht.
- Vorschlag: den letzten bekannten Stand als Zahl in die Rasterdaten schreiben und die Abweichung davon ausweisen.

### N855-7 (Hinweis): Was das Raster nicht sieht

- Die Leermeldung wird mit einer einzigen Probe geprüft und nur auf das Ziel des Links, nicht auf seinen Text.
- Der Pfadfilter schliesst `netlify.toml` im Stamm aus. Dort könnten Header oder Weiterleitungen die Suche in der Produktion ändern, ohne dass die CI läuft.
- `_redirects` gehört nicht zur Abkürzung, und das Werkzeug liefert die Datei nicht aus.
- Das Raster prüft das Ziel eines Treffers (`href`), nicht, ob es auf der Zielseite existiert.

### N855-8 (Hinweis): Pendenzendatei

Der neue Eintrag sagt, bis zum Merge der Härtung gelte eine grüne CI nicht als Freigabe nach R34-P01. Daraus folgt, dass sie nach dem Merge als Freigabe gilt. Das sollte erst nach N855-1 und N855-2 so stehen. Die Zitierregel ist eingehalten: Die Pendenzendatei nennt keine Proben mit Töten, Suizidabsicht oder Gewalttat.

## 3 Was bestätigt ist

- **K1, K2, K3, K5, K9, K6, K6b, K6c:** wie im Bericht, gleiche Zahlen.
- **Liste r4-76 → r4-77:** identisch.
- **Abdeckung:** identisch mit `abdeckung.cjs`.
- **RANG1 und RANG3:** richtig.
- **Werkzeug der Basis:** läuft in der CI aus der Basis.
- **Determinismus:** gegeben.
- **Laufzeit:** unkritisch.

Kein Rückbau nötig: Der PR ändert die Website nicht.

## 4 Unterlagen

- `werkzeug/lauf.sh`: alle Läufe dieser Prüfung, Aufruf `A=<arbeitsordner> bash …/lauf.sh`.
- `werkzeug/sichtpruefung.cjs`: Sicht des Rasters gegen die Sicht auf dem Bildschirm.
- `werkzeug/raster-aus-suchraster-json.cjs`: Sätze des PR für `abdeckung.cjs`.
- `werkzeug/umgehung-ausnahmen.tsv`: die zu breiten Ausnahmen aus N855-4.
- `konstruktionen/v*.diff`: V1 bis V9 gegen `site/` von r4-76 (`b529695`), anzuwenden mit `patch -p2 -d <kopie>/site`.
- `ergebnis/`:
  - Übersicht aller Läufe;
  - Sichtprüfung mit Bildern;
  - r4-76 → r4-77 und r4-77 → r4-77;
  - Abdeckung;
  - K9 ungemeldet;
  - V8, V9;
  - Umgehung der Ausnahmen.

Die Wortlaute der Proben stehen nur hier unter `audit-results/`.

## 5 Nachkontrolle von Kopf `6d9428d` (27.11.2026)

Die bauende Sitzung hat #855 mit `6d9428d` nachgebessert («Suchraster: Nachbesserung nach der Nachprüfung #856») und um eine Nachkontrolle vor dem Merge gebeten. Ich habe ausdrücklich versucht, das neue Werkzeug falsch bestehen zu lassen.

### 5.1 Was jetzt hält

- **N855-1, bekannte Konstruktionen: behoben.** Neu ist der Selbsttest `suchraster-selbsttest.mjs`. Er meldet lokal auf r4-77 alle 15 Konstruktionen und den unveränderten Stand richtig (K1, K2, K5, K9, V1 bis V8, V10). In der CI läuft er als vierte Variante, grün in 3 min (`ergebnis/nachkontrolle/selbsttest-6d9428d.txt`).
- Die Reihenfolge kommt jetzt aus der Lage auf dem Bildschirm. Damit fällt auch eine Verschiebung mit `transform` auf (W8: 312 Fälle).
- **N855-2: behoben.** `suchraster-ausnahmen` scheitert bei jeder Änderung unter `.github/workflows/`. In #855 selbst ist der Job deshalb gewollt rot («Files .github/workflows/verify-authoring.yml … differ»). Die Freigabe-Aussage in Workflow, Bericht und Pendenzendatei ist berichtigt.
- **N855-4: behoben.** Meine `werkzeug/umgehung-ausnahmen.tsv` scheitert jetzt mit 6 × «Ausnahme zu breit … trifft 1 114 Anfragen ohne Verlust».
- **N855-3, N855-6 und N855-7:** umgesetzt wie in der Nachricht beschrieben: Warnung, wenn `interaktion.js` ohne neue Proben geändert wird; `festerBezug` in den Rasterdaten; `netlify.toml` im Pfadfilter, `_redirects` in der Abkürzung.
- **Falsch scheitern: nein.**
  - r4-77 → r4-77 voll mit `--immer`: 0 Verschlechterungen, 0 geändert; «Bildschirm anders als DOM» überall 0 (517 s lokal).
  - r4-76 → r4-77 ohne Ausnahmen: weiter genau 428 Fälle, Abdeckung unverändert (516 s lokal).

  Die Laufzeit ist trotz Prüfung des Treffpunkts nicht länger geworden.
- **CI auf `6d9428d`:**
  - grün: `build-and-compare`, `werkzeug-der-basis`, `werkzeug-des-pr` und `selbsttest`;
  - rot, gewollt: `suchraster-ausnahmen` (Workflow geändert);
  - beim Abschluss dieser Kontrolle noch laufend: `fester-bezug-r4-73`.

### 5.2 Was das neue Werkzeug weiter falsch bestehen lässt

Alle Konstruktionen sind gegen r4-76 gebaut und mit den Proben und der Leermeldung gelaufen (Werkzeug `6d9428d`, `ergebnis/nachkontrolle/konstruktionen-6d9428d.txt`). Die Fälle mit Bild sind zusätzlich auf dem Bildschirm geprüft (`ergebnis/nachkontrolle/sicht/`).

| Konstruktion | eine CSS-Zeile | Bildschirm | Raster |
|---|---|---|---|
| **W1** | weisses `::after` über dem Suizidtreffer, mit `pointer-events:none` | Suizidkarte leer (Bild) | **0** |
| **W2** | Suizidtreffer `filter:opacity(0)` | unsichtbar (Bild) | **0** |
| **W3** | Suizidtreffer `mask-image: linear-gradient(transparent,transparent)` | unsichtbar | **0** |
| W4 | Suizidtreffer `opacity:.11` | kaum lesbar | 0 (Schwelle 0,1 ist dokumentiert) |
| W5 | Suizidtreffer weiss auf weiss | unsichtbar | 0 (als Grenze dokumentiert) |
| **W6** | weisses `::after` über der Sicherheitszeile der Leermeldung, `pointer-events:none` | Sicherheitslink unsichtbar | **0** |
| **W7** | Sicherheitszeile der Leermeldung `filter:opacity(0)` | Sicherheitslink unsichtbar (Bild) | **0** |
| W8 | Suizidtreffer `transform:translateY(-400%)` | verschoben | 312, erkannt |

**N855-9 (hoch, vor dem Merge beheben):** Die Prüfung des Treffpunkts übersieht eine Überdeckung mit `pointer-events:none`. `elementFromPoint` überspringt solche Elemente; V10 wird nur erkannt, weil seine Überdeckung Mausereignisse annimmt. Wirkstoffe, die die Darstellung ausblenden, ohne `opacity`, `visibility` oder `clip` zu setzen, prüft das Werkzeug nicht: `filter` und `mask`. Damit bleibt der Kern von N855-1 offen: Mit einer einzigen CSS-Zeile verschwindet der Suizidtreffer oder die Sicherheitszeile der Leermeldung, und die CI ist grün.

Vorschlag (klein):
1. Während der Messung ein Stylesheet `*,*::before,*::after{pointer-events:auto!important}` einsetzen, damit jede Überdeckung den Treffpunkt belegt.
2. `filter` und `mask-image` (auch `-webkit-mask-image`) bei sich und allen Vorfahren prüfen: Nicht `none` zählt als unsichtbar, oder mindestens `opacity(…)` im Filter in die Deckkraft einrechnen.
3. Die Schwelle der Deckkraft auf mindestens 0,5 setzen.
4. W1, W2, W3, W6 und W7 in den Selbsttest aufnehmen.

Danach bleiben als dokumentierte Grenzen nur Farbe gleich Hintergrund (W5) und ein Pseudo-Element des Links selbst. Belastbar wäre auf Dauer ein Vergleich der Bildpunkte im Bereich des Links mit dem Bezug, für die ersten drei Treffer und die Leermeldung. Das ist ein Vorschlag, kein Merge-Hindernis.

**N855-10 (Hinweis):** Die berichtigte Aussage lautet: «Eine grüne CI ist eine Freigabe nach R34-P01 nur, wenn dieser Job grün ist.» Der Job steht aber selbst im Workflow des PR. Ein PR kann also die Prüfung auf Workflow-Änderungen streichen, und der Job wird grün. Genauer wäre: «… nur, wenn der PR nichts unter `.github/` ändert (im Diff zu prüfen).» Die volle Absicherung bleibt ein Entscheid von Christa Egger (N855-2).

### 5.3 Urteil

**Bereit zum Merge: nein.** Vorher zu beheben ist N855-9. Sind die Vorschläge 1 bis 4 umgesetzt und W1 bis W7 im Selbsttest gemeldet, ist aus meiner Sicht nichts Blockierendes mehr offen. N855-5 und die volle Absicherung des Workflows bleiben Entscheide von Christa Egger.

## 6 Zweite Nachkontrolle von Kopf `64593de` (27.11.2026)

Die bauende Sitzung hat N855-9 und N855-10 mit `64593de` nachgebessert:
- Während der Messung gilt `pointer-events:auto!important`, eingesetzt über `adoptedStyleSheets`.
- `filter` und `mask` gelten als unsichtbar.
- Die Deckkraft muss mindestens 0,5 sein.
- Die Textfarbe braucht einen Kontrast von mindestens 1,5:1, gemessen gegen den nächsten deckenden Hintergrund (auch `-webkit-text-fill-color`).
- Der Selbsttest hat 23 Konstruktionen.
- Der Job vergleicht ganz `.github/`.

### 6.1 Was jetzt hält

- **W1 bis W8 werden alle gemeldet:**
  - je 312 Verschlechterungen bei W1 bis W5 und W8;
  - je 1 «Sicherheitslink verloren» bei W6 und W7.

  Ergebnis: `ergebnis/nachkontrolle2/konstruktionen-64593de.txt`.
- **N855-10 ist behoben.** Die Aussage zur Freigabe ist richtig gefasst: Eine Freigabe nach R34-P01 gibt es nur, wenn der PR nichts unter `.github/` ändert.

### 6.2 Was weiter falsch besteht

Je eine CSS-Zeile, gegen r4-76, mit den Proben und der Leermeldung. Alle Fälle sind auf Bildern bestätigt (`ergebnis/nachkontrolle2/sicht/`).

| Konstruktion | Änderung | Bildschirm | Raster |
|---|---|---|---|
| **X1** | weisses `::after` über dem Suizidtreffer; `pointer-events:none!important` in einem `@layer` | Suizidkarte leer | **0** |
| **X3** | `mix-blend-mode:screen` im Suizidtreffer | Suizidkarte leer | **0** |
| **X4** | `mix-blend-mode:screen` am Sicherheitslink der Leermeldung | Sicherheitszeile leer | **0** |
| **X5** | wie X1, über der Sicherheitszeile der Leermeldung | Sicherheitszeile leer | **0** |
| X2 | Verlauf als Hintergrundbild, weisser Text | Suizidkarte leer | 0 (als Grenze dokumentiert, aber eine einzige Zeile) |

**N855-11 (hoch, vor dem Merge beheben):**
- **X1 und X5:** Wichtige Regeln in einer Kaskadenebene (`@layer`) gehen wichtigen Regeln ohne Ebene vor. Die neue Regel aus `adoptedStyleSheets` hat keine Ebene. Die Seite setzt deshalb `pointer-events:none` wieder durch, und der Treffpunkt übergeht die Überdeckung.
- **X3 und X4:** Die Prüfung von Farbe und Kontrast sieht keine Mischmodi.

Das ist dieselbe Klasse wie N855-1 und N855-9. Jede Runde schliesst die gemeldeten Fälle, und eine weitere CSS-Eigenschaft öffnet einen neuen.

**Vorschlag, der die Reihe beendet:** Die Prüfung der Bildpunkte ersetzt die Aufzählung von Eigenschaften.
- Für einen festen Satz von Anfragen wird je ein Ausschnitt um den Link aufgenommen, einmal normal und einmal mit `visibility:hidden` am Link, gesetzt über `element.style.setProperty(…, 'important')`. Sind beide Bilder gleich, ist der Link für eine Person unsichtbar. Das deckt Überdeckung, Mischmodi, Farbe, Verläufe, Filter und Masken auf einmal ab.
- Der Satz von Anfragen: die Proben, bei denen der Bezug einen Sicherheitsabschnitt unter den ersten drei zeigt, und die Leermeldung.
- Geprüft werden die ersten drei Treffer jeder dieser Anfragen.
- Weil eine Änderung am Stylesheet für alle Anfragen gleich wirkt, genügt dieser Satz. Die übrigen Mengen behalten die heutige, schnelle Prüfung.
- X1 bis X5 kommen in den Selbsttest.

Kleiner, aber nicht vollständig: die Regel für `pointer-events` als Inline-Stil mit `important` an jedes Element setzen statt über `adoptedStyleSheets`, und `mix-blend-mode` (nicht `normal`) bei sich oder einem Vorfahren als unsichtbar werten.

### 6.3 Urteil

**Bereit zum Merge: nein.** Vorher zu beheben ist N855-11. Mit der Prüfung der Bildpunkte (oder mindestens den kleinen Massnahmen) und X1 bis X5 im Selbsttest ist aus meiner Sicht nichts Blockierendes mehr offen. Die Grenze «Pseudo-Element des Links selbst» fiele mit der Prüfung der Bildpunkte ebenfalls weg.

## 7 Dritte Nachkontrolle von Kopf `deadba9` (27.11.2026)

Die bauende Sitzung hat N855-11 mit `deadba9` nachgebessert:
- **Prüfung der Bildpunkte:** Je Sicherheitsabschnitt und Rang, den die Proben erreichen, nimmt das Werkzeug einen Ausschnitt mit und ohne Link auf. Auf r4-77 sind das 18 Kombinationen, dazu kommt die Leermeldung.
- **Mischmodi:** `mix-blend-mode` gilt als unsichtbar.
- **Selbsttest:** 29 Konstruktionen.

### 7.1 Was jetzt hält

- **X1 bis X5 werden gemeldet:**
  - X1 und X2 über die Bildpunkte (je 3 Verschlechterungen, 6 UNSICHTBAR-Zeilen);
  - X3 über die Eigenschaften (312);
  - X4 und X5 über die Leermeldung (je 1).
- **Selbsttest:** lokal 29 von 29, unveränderter Stand besteht.
- **Kein Fehlalarm:** r4-77 → r4-77 zweimal mit `--immer`: 0 Verschlechterungen, Bildpunkte «unsichtbar 0». Der kleinste Unterschied eines sichtbaren Links liegt beide Male bei 2 064 Bildpunkten, die Schwelle bei 20. Der Abstand ist gross, die Prüfung ist stabil.

Ergebnis: `ergebnis/nachkontrolle3/konstruktionen-deadba9.txt`.

### 7.2 Was weiter falsch besteht

Das Raster misst nur in einer Umgebung: 1280 × 720 Pixel, Querformat, heller Modus. Eine Regel, die nur in einer anderen Umgebung greift, sieht keine Prüfung, weder die der Eigenschaften noch die der Bildpunkte. Gemessen gegen r4-76, je eine Zeile in `site.css`, auf dem simulierten Telefon (iPhone 13) bzw. im dunklen Modus geprüft (`werkzeug/sicht-umgebung.cjs`, `ergebnis/nachkontrolle3/sicht/`):

| Konstruktion | Änderung | Bildschirm | Raster |
|---|---|---|---|
| **Y1** | `@media (max-width:40rem){Suizidtreffer{display:none}}` | Telefon: Suizidtreffer fehlt, zuoberst «Krisen begleiten» | **0** |
| **Y2** | `@media (prefers-color-scheme:dark){…{display:none}}` | dunkler Modus: Suizidtreffer fehlt | **0** |
| **Y3** | `@media (max-width:40rem){Sicherheitszeile der Leermeldung{display:none}}` | Telefon: nur noch «häufige Fragen» | **0** |
| **Y4** | `@media (orientation:portrait){…{display:none}}` | Telefon: Suizidtreffer fehlt | **0** |

**N855-12 (hoch, vor dem Merge beheben):** Viele Angehörige suchen auf dem Telefon, und die Website hat schon heute Regeln für schmale Bildschirme (`max-width:760px` und andere) und eine für den dunklen Modus. Ein Fehler in einer solchen Regel ist realistisch, auch ohne Absicht, und das Raster würde ihn nicht melden. Der Bericht der bauenden Sitzung nennt «schmale Bildschirme» als Grenze; nach R34-P01 a) ist diese Grenze aber nicht hinnehmbar, weil sie den Suizidtreffer betrifft.

**Vorschlag (klein, weil die Stichprobe der Bildpunkte klein ist):**
- Die Prüfung der Bildpunkte und die Leermeldung zusätzlich in zwei Umgebungen ausführen:
  - Telefon (z. B. `devices['iPhone 13']`: 390 × 664, Hochformat, `isMobile`);
  - Desktop im dunklen Modus (`colorScheme:'dark'`).
- Die Reihenfolge der ersten drei Treffer ebenfalls in beiden Umgebungen vergleichen.
- Y1 bis Y4 in den Selbsttest aufnehmen.

Mit «forced-colors» (Kontrastmodus) gilt dasselbe. Den kann man als dritte Umgebung aufnehmen oder als Grenze dokumentieren.

Weitere Grenzen, als Hinweis, nicht blockierend:
- **Ungeprüfte Ränge:** Ränge, die keine Probe erreicht, prüft die Bildpunktprüfung nicht. Die bauende Sitzung nennt das selbst.
- **Unlesbar, aber sichtbar:** Ein Link, der noch Bildpunkte hat, aber nicht lesbar ist (z. B. `transform:scaleX(.05)`, `font-size` sehr klein oder ein ersetzter Text über ein Pseudo-Element des Links), gilt als sichtbar. Das ist eine Frage der Lesbarkeit, nicht der Sichtbarkeit; ich nehme sie nicht als Merge-Hindernis.

### 7.3 Urteil

**Bereit zum Merge: nein.** Vorher zu beheben ist N855-12. Mit Telefon und dunklem Modus in der Prüfung der Bildpunkte und Y1 bis Y4 im Selbsttest ist aus meiner Sicht nichts Blockierendes mehr offen.

## 8 Vierte Nachkontrolle von Kopf `2bf11b5` (27.11.2026)

Die bauende Sitzung hat N855-12 mit `2bf11b5` nachgebessert. Proben, Bildpunkte und Leermeldung laufen jetzt zusätzlich in drei Umgebungen:
- `telefon`: iPhone 13, Hochformat;
- `dunkel`: dunkler Modus, 1280 × 720;
- `kontrast`: erzwungene Farben und dunkler Modus.

Der Selbsttest hat 35 Konstruktionen.

### 8.1 Was jetzt hält

- **Y1 bis Y4:** Alle werden gemeldet (Y1 312, Y2 624, Y3 1, Y4 312). Eine Regel für Touch-Eingabe (`pointer:coarse`, T3) wird über die Telefon-Umgebung ebenfalls gemeldet (312).
- **Selbsttest:** lokal 35 von 35, unveränderter Stand besteht.
- **Kein Fehlalarm:** r4-77 → r4-77 mit `--immer` in allen vier Umgebungen: 0 Verschlechterungen. Kleinster Unterschied der Bildpunkte: 2 064 hell und dunkel, 13 802 Telefon. Die Schwelle liegt bei 20.
- **CI auf `2bf11b5`:**
  - grün: `build-and-compare`, `werkzeug-der-basis`, `werkzeug-des-pr`, `selbsttest` (7 min) und `fester-bezug-r4-73` (voller Lauf, 8 min 14 s, unter dem Limit von 30 min);
  - rot, gewollt: `suchraster-ausnahmen`, weil der PR den Workflow ändert (N855-2).

Ergebnis: `ergebnis/nachkontrolle4/konstruktionen-2bf11b5.txt`.

### 8.2 Verbleibende Hinweise (nicht blockierend)

**N855-13 (niedrig): Medienmerkmale ohne Umgebung.** Je eine Zeile gegen r4-76, das Raster meldet 0:
- T1: `@media (min-width:761px) and (max-width:1200px)` (Tablet-Breite);
- T2: `prefers-reduced-motion:reduce`;
- T4: `prefers-contrast:more`.

Die Tablet-Breite nennt die bauende Sitzung selbst als Grenze. Die Website hat Umbrüche bei 760 px und 1 200 px; eine Regel nur für den Bereich dazwischen ist denkbar, aber seltener als eine für schmale Bildschirme. T2 und T4 sind Einstellungen der Nutzenden; dass dort ein Sicherheitstreffer ausgeblendet wird, setzt eine sehr ungewöhnliche Änderung voraus. Vorschlag für später:
- eine vierte Umgebung mit z. B. 900 × 1 200 Pixeln, `reducedMotion:'reduce'` und `contrast:'more'` über `page.emulateMedia`;
- oder eine Warnung, wenn eine geänderte Regel in `site.css` ein `@media` mit einem Merkmal enthält, das keine Umgebung abdeckt.

**Weiter geltende Grenzen:**
- Ränge, die keine Probe erreicht.
- Sichtbare, aber unlesbare Links.
- Druck und Zoom.
- Die grossen Anfragemengen laufen nur in der Hauptumgebung.

Alle sind im Bericht der bauenden Sitzung genannt.

**Ablauf beim Merge:**
- `suchraster-ausnahmen` ist in #855 gewollt rot, weil der PR den Workflow ändert.
- Diese Nachprüfung ist die Prüfung, die der Job verlangt. Wer mergt, setzt sich bewusst über den roten Job hinweg.
- Für spätere PRs gilt: Eine grüne CI ist nur dann eine Freigabe nach R34-P01, wenn der PR nichts unter `.github/` ändert (N855-10).
- Die Entscheide zu N855-5 (Reihenfolge Gewalt vor Suizid bei Fremdbedrohung) und zur vollen Absicherung des Workflows (N855-2) liegen weiter bei Christa Egger.

### 8.3 Urteil

**Bereit zum Merge: ja.** Die Leitfrage «Kann das gehärtete Raster noch falsch bestehen?» beantworte ich so:
- Mit den bekannten und naheliegenden Änderungen an Suchregeln, Darstellung, Ausnahmen und Werkzeug nicht mehr.
- Möglich bleibt es über den Workflow selbst, nur sichtbar und mit rotem Job.
- Möglich bleibt es auch über die in 8.2 genannten seltenen Umgebungen.

Kein Merge durch diese Sitzung.
