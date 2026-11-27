**Bereit zum Merge: nein.** Vorher zu beheben: N855-1 (hoch) und N855-2 (mittel, in der kleinen Form unten). Die übrigen Befunde blockieren nicht.

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
