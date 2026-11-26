# Nachprüfung PR #847 · Suchraster als Prüfwerkzeug · nachträglich

**Urteil (nachträglich, #847 war beim Abschluss dieser Prüfung schon gemergt): Das Suchraster tut, was sein Bericht sagt, ist deterministisch und ändert die Website nicht. Es kann aber falsch bestehen, am deutlichsten, weil ein Pull Request Werkzeug, Proben und Ausnahmen selbst mitbringt (N847-2). Empfehlung: #847 gemergt lassen, weil es nichts verschlechtert und r4-74 und r4-75 aufgehalten hätte. Vor Schritt 2 sollten N847-2 bis N847-5 behoben sein. Bis dahin gilt eine grüne CI nicht als Freigabe nach R34-P01; die Nachprüfung vor dem Merge bleibt nötig.**

Stand 26.11.2026, Prüfung ab etwa 23:00 UTC · geprüfter Kopf `0259793` (Baum identisch mit `main` `451b20f`) · Basis `d90e7ef`.

**Unabhängigkeit.** Diese Sitzung hat weder r4-74 bis r4-76 noch #847 gebaut. Sie hat #839, #841 und #844 nicht verfasst. Alle Zahlen hier stammen aus eigenen Läufen. Den Bericht der bauenden Sitzung hat sie gelesen, aber keine Zahl von dort übernommen.

**Zitierhinweis.** Dieser Ordner enthält Suchanfragen im Wortlaut, auch zu Suizid, Selbstverletzung und Gewalt. Sie gehören nicht in die Pendenzendatei.

## 1 Ablauf und Status

| Zeit (UTC) | Ereignis | Beleg |
|---|---|---|
| 23:03:36 | #847 eröffnet (Entwurf), Text: «Bitte nicht mergen, bevor die Nachprüfung vorliegt» | GitHub-API, PR #847 |
| 23:03:51–23:04:54 | CI `build-and-compare` grün, Suchraster über die Abkürzung | Job 140211372259, Protokoll |
| 23:05:38 | «bereit zur Prüfung», Konto christaegger-dot | Timeline |
| 23:05:45 | gemergt als `451b20f`, 7 Sekunden später | Timeline, Merge-Commit |
| 23:05:48 | Codex-Review, ohne Befund, nach dem Merge; Head-Branch gelöscht | Timeline |

Die Prüfung war beim Merge also noch nicht fertig. Auf Auftrag hat sie trotzdem zu Ende geprüft.

## 2 Befunde

| Kennung | Schweregrad | Kurz |
|---|---|---|
| N847-1 | hoch, Ablauf | Merge 7 s nach «bereit zur Prüfung», vor der Nachprüfung; Pendenzendatei nennt #847 «Entwurf, nicht gemergt» |
| N847-2 | hoch | Der geprüfte PR liefert Werkzeug, Proben und Ausnahmen selbst; 11 Zeilen `/./` lassen r4-75 bestehen |
| N847-3 | mittel | Anfragen ausserhalb des Rasters: eine plausible Regeländerung verschlechtert 171 Sätze, das Raster meldet 0 |
| N847-4 | mittel | Blind für die Darstellung: Ein Stylesheet blendet den Suizidtreffer aus, und die Leermeldung verliert ihre Sicherheitszeile. Das Raster meldet in beiden Fällen 0 |
| N847-5 | mittel | Rang 1 → 2 und Rang 3 sind nicht erfasst: 4 598 von 5 687 geänderten Anfragen ohne Meldung, wenn Gewalt vor Suizid rückt; N840-5 nur zur Hälfte abgedeckt |
| N847-6 | niedrig | Kriterium «Anheftung» misst `queryGroups`, nicht die Darstellung |
| N847-7 | niedrig | CI: Pfadfilter gegen «erforderliche Prüfung», kein Zeitlimit, Laufzeit auf GitHub nicht beobachtet |
| N847-8 | niedrig | Vergleich mit der Basis: Verluste mit Ausnahme werden zum neuen Bezug, die Liste veraltet still |
| N847-9 | Hinweis | Pendenzendatei: Zitierregel eingehalten, Zeiten stimmen; Status #847 veraltet |

### N847-1 (hoch, Ablauf) · Merge vor der Nachprüfung

Gleiches Muster wie bei #836, #838 und #840 (Pendenzendatei, Abschnitte r4-74 bis r4-76): Zwischen «bereit zur Prüfung» und Merge lagen 7 Sekunden, und das Codex-Review kam erst nach dem Merge. Einen Merge-Auftrag nennen weder der PR noch der Merge-Commit (R65-P01). Der PR selbst bat, nicht vor der Nachprüfung zu mergen. Nachgemessen: Der Abschnitt «Suchraster» der Pendenzendatei auf `main` sagt «Entwurf, nicht gemergt» und nennt die Nachprüfung als offen. Das ist seit 23:05:45 UTC überholt.

### N847-2 (hoch) · Der PR prüft sich mit seinen eigenen Regeln

**Messung.** Die CI ruft `node authoring/tools/suchraster.mjs suchraster-basis/site site` auf. Werkzeug, `suchraster.json`, `suchraster-proben.txt` und `suchraster-ausnahmen.tsv` kommen aus dem Merge-Stand des PR, nur `site/` aus der Basis. Ein PR, der die Suche verschlechtert, kann also im selben PR die Ausnahmen breit eintragen, Proben löschen oder das Werkzeug ändern. Konstruktion K6: Ausnahmenliste mit 11 Zeilen, Muster `/./`, Ersatz «–», je eine für die fünf Sicherheitsabschnitte, für `LEER` und für jede `ANHEFTUNG:`. Datei: `konstruktionen/k6-suchraster-ausnahmen.tsv`.

| Lauf (r4-73 → r4-75, Menge `proben`) | Ergebnis | Rückgabe |
|---|---|---|
| Ausnahmen leer (`k6ohne`) | 44 Verschlechterungen | 1 |
| Ausnahmen K6 (`k6`) | 0 Verschlechterungen, «als Ausnahme erlaubt 44» | 0 |

Hinzu kommt: Welche Anfragen eine Ausnahme erlaubt, steht nirgends einzeln, nur ihre Zahl. Die Liste «Ausnahmen ohne Anwendung» steht nur in `dist/suchraster/ERGEBNIS.txt`. Diese Datei lädt die CI nicht hoch, und weder Konsole noch Step-Summary zeigen sie. Wer den Lauf liest, sieht nur «als Ausnahme erlaubt 44». Das Werkzeug begrenzt die Muster nicht: `/./` ist zulässig, und «–» als Ersatz verlangt keinen Ersatz.

**Warum hoch:** Schritt 2 wird nach dem Bericht von #847 (Abschnitt 5) «viele Verdrängungen» melden, die «als begründete Muster in die Ausnahmen» gehören. Genau dort ist die Prüfung dann am schwächsten. Ob eine grüne CI etwas bedeutet, hängt dann ganz an der menschlichen Durchsicht der Ausnahmen.

**Vorschlag (Entscheid Christa Egger):** Werkzeug, Rasterdefinition und Proben aus der **Basis** ausführen, nur die Ausnahmen aus dem PR lesen. Jede erlaubte Anfrage mit Ausnahme in der Step-Summary auflisten. Muster ablehnen, die mehr als eine festzulegende Zahl Anfragen decken. Eine Ausnahme an die Kennung des Bezugs binden. Änderungen an `authoring/tests/suchraster*` und `authoring/tools/suchraster.mjs` brauchen ein eigenes Review.

**Reproduktion:** `werkzeuge/lauf.sh k6 tool6 r73 r75 --nur=proben` (Werkzeugkopie mit der K6-Liste) gegen `werkzeuge/lauf.sh k6ohne tool r73 r75 --nur=proben`. Ergebnis: `ergebnis/laeufe/k6.txt`, `k6ohne.txt`.

### N847-3 (mittel) · Anfragen ausserhalb des Rasters

**Messung.** Konstruktion K3 (`konstruktionen/k3.diff`): r4-76 mit einer neuen Synonymgruppe für Grosseltern. So etwas kann Schritt 3 («neue Begriffe») tatsächlich bringen. «oma» steckt als Teilwort in vielen Abschnittstexten (die Suche vergleicht mit `indexOf`). Darum findet die strenge Suche jetzt Treffer, und die lockere Suche, die bisher den Sicherheitsabschnitt lieferte, greift nicht mehr.

| Messung | Ergebnis |
|---|---|
| 1 134 naheliegende Sätze (7 Formen für Grosseltern × 54 Aussagen des Rasters × 3 Nachsätze), r4-76 → K3 | **171 Verschlechterungen** nach den Kriterien des Rasters, z. B. «mein grossvater hat suizidgedanken»: r4-76 `krise#suizid` zuerst, K3 kein Sicherheitsabschnitt in den ersten drei |
| Suchraster r4-76 → K3, voller Lauf, 45 603 Anfragen | **0 Verschlechterungen, Rückgabe 0** (286 s); «geändert» 1 (eine Probe mit «Grossmutter», ohne Sicherheitsverlust) |

Liste: `ergebnis/k3-verschlechterungen-ausserhalb-raster.txt`, Lauf: `ergebnis/laeufe/k3.txt`.

**Fehlende Satzformen.** Diese fehlen in allen 45 069 verschiedenen Anfragen (gezählt mit `werkzeuge/mengen.mjs`, Wort als Teilzeichenkette, gross/klein egal): «erhängen», «aufhängen», «springen», «Pulsadern», «vergiften», «erstechen», «Messer», «Waffe», «Pistole», «vergewaltigt», «Missbrauch», «Opa», «143», «147», «Notruf», «Dargebotene Hand». Die 18 Handelnden des Rasters decken die Liste `actors` in `interaktion.js` nicht ab, es fehlen etwa Ehemann, Stiefvater, Mama, Papa, Nachbar. r4-76 findet zu vielen dieser Sätze heute ohnehin keinen Sicherheitsabschnitt (Stichprobe in `werkzeuge/abfrage.mjs`, vgl. N840-4). Das Raster könnte sie also gar nicht schützen. Sobald Schritt 3 sie aber findet, verliert sie der nächste PR unbemerkt, wenn sie nicht im selben PR ins Raster kommen.

**Vorschlag:** Jede neue Suchregel bringt ihre Proben ins Raster mit. Die Handelnden des Rasters werden aus `actors` übernommen.

### N847-4 (mittel) · Blind für die Darstellung

**Messung.** Das Raster liest Treffer als `li:not([hidden])`. Die Abkürzung vergleicht nur `suche.html`, `js/interaktion.js` und `_headers`.

| Konstruktion | Wirkung im Browser (`werkzeuge/sichtbar.mjs`) | Raster |
|---|---|---|
| K1: eine Regel am Ende des Stylesheets (`konstruktionen/k1.diff`), blendet das Ergebnis `krise.html#suizid` und die Sicherheitszeile der Leermeldung aus | Anfragen mit Tötungswort zeigen sichtbar zuerst Gewalt, Suizid fehlt; die Leermeldung zeigt den Link zur Schnellorientierung nicht mehr | Abkürzung «Suche unverändert», Rückgabe 0; auch mit `--immer` (Menge `proben`) 0 |
| K2: Leermeldung in `suche.html` ohne Sicherheitszeile (`konstruktionen/k2.diff`) | Leermeldung ohne Hinweis auf Sicherheit | voller Lauf (Menge `proben`) 0, Rückgabe 0 |

Belege: `ergebnis/k1-k2-sichtbarkeit.txt`, `ergebnis/laeufe/k1-abkuerzung.txt`, `k1voll.txt`, `k2.txt`. Ausser über die Darstellung (Stylesheet) und die Leermeldung kann eine echte Änderung an der Suche nicht durch die Abkürzung rutschen. Der Suchindex steht in `suche.html`, und die Suche läuft nur auf `suche.html`, ohne Formulare oder Parameter auf anderen Seiten (geprüft mit `grep`). Die Ersetzung der Versionskennung greift nur auf den Wert.

**Vorschlag:** Sichtbarkeit messen (`checkVisibility()` oder `offsetParent`) statt nur `hidden` auswerten. Die Leermeldung als eigene Anfrage prüfen: Sicherheitslink vorhanden und sichtbar. `css/site.css` in die Abkürzung aufnehmen.

### N847-5 (mittel) · Rang 1 → 2 und Rang 3 sind nicht erfasst

**Messung.** Konstruktion K9 (`konstruktionen/k9.diff`) kehrt die Reihenfolge der Anheftung um. Bei Tötungsanfragen steht dann Gewalt vor Suizid, entgegen der Faustregel r4-32. Beispiel (`ergebnis/k9-beispiele.txt`): «Er will sich umbringen» liefert in r4-76 Suizid > Gewalt, in K9 Gewalt > Suizid.

| Lauf r4-76 → K9, voll | Ergebnis |
|---|---|
| geändert | 5 687 Anfragen |
| gemeldet | 1 089 (nur, wo ein dritter Sicherheitsabschnitt aus den ersten zwei fällt) |
| **ohne Meldung** | **4 598** |

Das ist mit R34-P01 a) vereinbar, denn Suizid bleibt unter den ersten zwei. Die Reihenfolge der Faustregel (R31-P05) schützt das Raster aber nicht. Mit `werkzeuge/rang3.cjs` über alle Ergebnisse (Werkzeugkopie, die zusätzlich alle Ergebnisse schreibt, nur im Arbeitsordner): Diese Fälle meldet das Raster nicht.

| Bezug r4-73 | Sicherheitsabschnitt nur auf Rang 3, danach keiner in den ersten drei | davon mit Tötungswort | Suizid bei Tötungswort von Rang 1 verdrängt |
|---|---|---|---|
| r4-74 | 102 | 7 | 4 |
| r4-75 | 63 | 0 | 0 |

Beleg: `ergebnis/nicht-gemeldet-rang3-und-rang1.txt`. **Zu N840-5:** Die Pendenzendatei schreibt, das Raster prüfe «jeden Treffer verloren» schon heute. Das stimmt (LEER). Die andere Hälfte von N840-5, der Verlust des **letzten** Sicherheitstreffers, ist nur abgedeckt, wenn dieser unter den ersten zwei stand. Für die 7 Tötungsanfragen aus r4-74 trifft das nicht zu.

**Vorschlag (Entscheid Christa Egger, zusammen mit N840-5):** Bei Anfragen mit Tötungswort zusätzlich «Suizid auf Rang 1 bleibt auf Rang 1» und «letzter Sicherheitsabschnitt in den ersten drei geht nicht verloren» prüfen.

### N847-6 (niedrig) · Die Messzeile für die Anheftung

Die Messzeile reicht `queryGroups` nach aussen, und das Werkzeug ruft die Funktion für jede Anfrage ein zweites Mal auf. Gemessen wird also, was angeheftet werden **soll**, nicht was angezeigt wird. Konstruktion K5 (`konstruktionen/k5.diff`): Die Anheftung in `renderSearch` ist abgeschaltet, `queryGroups` bleibt unverändert. Ergebnis: «Anheftung verloren 0» in allen Mengen. Die Änderung fällt trotzdem auf, über VERLOREN und VERDRAENGT, nämlich 5 687 Verschlechterungen mit Rückgabe 1 (`ergebnis/laeufe/k5.txt`). Das Kriterium ANHEFTUNG ist also eher schwach als gefährlich. Fehlt die Zeile `input.addEventListener('input', renderSearch);`, bricht das Werkzeug ab, statt zu bestehen. Es scheitert also sicher, nicht falsch. Ändert Schritt 2 die Bauweise, muss der PR das Werkzeug mitändern, und dann greift N847-2.

### N847-7 (niedrig) · CI

- **Checkout der Basis:** `ref: base.sha`, `path: suchraster-basis`, `sparse-checkout: site` sind richtig. Im Lauf zu #847 wurde `d90e7ef` ausgecheckt, die Basis des PR. Geprüft wird der Merge-Stand des PR, nicht sein Kopf. Das ist sinnvoll.
- **Bedingungen:** `!cancelled()` lässt das Raster auch nach einem roten früheren Schritt laufen. Das ist gut, der Job bleibt ohnehin rot. Bei `workflow_dispatch` entfallen beide Schritte, und der Job ist grün, ohne dass das Raster gelaufen ist. Nach dem Merge läuft auf `main` nichts.
- **Pfadfilter und erforderliche Prüfung:** Der Workflow läuft nur bei Änderungen unter `authoring/**`, `site/**` und am Workflow. Wird `build-and-compare` eine erforderliche Prüfung (offener Entscheid), warten PRs ohne solche Änderungen (z. B. nur Pendenzendatei oder `audit-results/`) auf einen Lauf, der nie kommt. Das gehört in den Entscheid.
- **Dauer:** Die Abkürzung braucht unter 1 s, der ganze Job zu #847 63 s. Ein voller Lauf dauerte lokal 281 bis 348 s (4 Kerne, zwei Läufe gleichzeitig). Jede Textänderung an der Website ändert den Suchindex in `suche.html` und löst den vollen Lauf aus (K7). Auf GitHub ist ein voller Lauf nicht beobachtet. Der Job hat kein `timeout-minutes`. Rund fünf Minuten je inhaltlichem PR sind vertretbar.

### N847-8 (niedrig) · Vergleich mit der Basis

Was mit einer Ausnahme gemergt ist, wird zum neuen Bezug. Die Ausnahme wirkt danach nicht mehr und erscheint nur in `ERGEBNIS.txt` als «ohne Anwendung», scheitern lässt sie nichts. Ein breites Muster wirkt dagegen weiter und deckt künftige, neue Verluste derselben Art. R34-P01 bezieht sich auf einen festen Stand (r4-32), das Raster auf die jeweilige Basis. **Vorschlag:** einen zweiten, nicht blockierenden Lauf gegen einen festen Stand (r4-73, `3764d45`) in der Step-Summary zeigen, damit sich Verluste über mehrere PRs nicht unbemerkt summieren.

### N847-9 (Hinweis) · Pendenzendatei

- **Zitierregel eingehalten:** Die neu eingefügten Zeilen enthalten keine Suchprobe, die ein Töten, eine Suizidabsicht oder eine Gewalttat ausdrückt (Diff `d90e7ef..451b20f`, alle Guillemets-Zitate und Suche nach Tötungs-, Gewalt- und Suizidwendungen).
- **Zeiten stimmen** mit den Merge-Commits überein: #839 `6f06888` 20:42:50, #841 `468dee5` 22:40:59, #843 `9f7f052` 22:07:59, #844 `46b42d8` 22:27:55 UTC. Die GitHub-API meldet `merged_at` für #839 und #841 eine Sekunde später (20:42:51, 22:41:00). Das ist eine Rundung, kein Fehler.
- **Status:** «Entwurf, nicht gemergt» für #847 ist überholt (N847-1). Die Links auf #839, #840, #841, #843, #844 und #847 führen auf die richtigen PRs.

## 3 Bestätigt

| Prüfpunkt | Ergebnis | Beleg |
|---|---|---|
| Website unverändert | Diff `d90e7ef..0259793` unter `site/`: leer. Baum `0259793` = `451b20f` | `git diff` |
| `--production --out=site --write-site` | 24 Seiten · 0 Blocker · 20 Hinweise; `git status` danach leer | `ergebnis/gates/write-site.txt`, `git-status-nach-write.txt` |
| `--production --verify-site` | Parität bestanden, 35 Dateien byte-gleich | `ergebnis/gates/verify-site.txt` |
| Selbsttest | 127/127 | `ergebnis/gates/selftest.txt` |
| Suchtest | 235 von 235, JS-Fehler 0 | `ergebnis/gates/suchtest.txt` |
| Sprach-/UI-Test | 74 bestanden, JS-Fehler 0 | `ergebnis/gates/sprachtest.txt` |
| r4-73 → r4-74 | scheitert, **4 955**, Rückgabe 1 (355 s) | `ergebnis/laeufe/r74.txt` |
| r4-73 → r4-75 | scheitert, **1 227**, Rückgabe 1; Aufschlüsselung je Menge gleich wie im Bericht #847 | `ergebnis/laeufe/r75a.txt` |
| r4-73 → r4-76 | besteht, Abkürzung (unter 1 s) und voll (`--immer`, 282 s): 0 | `ergebnis/laeufe/r76-abkuerzung.txt`, `r76voll.txt` |
| N840-2 erfasst | 5 der 12 Proben aus GC gemeldet, darunter die klaren Ich-Aussagen über Gewalt durch Mann oder Frau (VERLOREN, teils +LEER); GB 7 von 11; dazu `ichRahmen` 68 verloren, 28 leer | Auswertung aus `out/r75a/ERGEBNIS.json` |
| Fälle aus dem Nachweis zu r4-76 erfasst | ZZ 11 von 20 gemeldet («Mein Mann schlägt zu», «… unseren Sohn»: VERLOREN bzw. VERLOREN+LEER); Formen von «schneidet sich» mit Nachsatz gemeldet (z. B. «Mein Sohn schneidet sich seit Wochen») | dito |
| Deterministisch | zwei volle Läufe r4-73 → r4-75: Liste der Verschlechterungen identisch, `ERGEBNIS.txt` bis auf die Dauerzeile identisch | `r75a.txt`, `r75b.txt` |
| Kein falsches Scheitern bei harmlosen Änderungen | K8 Stylesheet: Abkürzung, 0. K7 Textänderung im Impressum (Suchindex): voller Lauf, 0 Änderungen, Rückgabe 0 (285 s) | `ergebnis/laeufe/k8-abkuerzung.txt`, `k7.txt` |
| 926 Einzelproben sauber übernommen | alle 926 stehen wortgleich in der Quelle, die ihre Gruppe nennt (A–P #839, Q–S #841, ZA–ZM Nachweis r4-74, ZX/ZY r4-75, ZZ r4-76, GA–GC #844). Umgekehrt stehen alle 745 Proben aus den Probendateien von #839, #841 und #844 im Raster | `ergebnis/proben-herkunft.txt`, `proben-vollstaendigkeit.txt` |
| Mengen | 45 603 Anfragen (23 328 / 4 416 / 4 320 / 1 125 / 5 622 / 6 792), 45 069 verschieden | `werkzeuge/mengen.mjs` |
| Testliste | nur eine Zeile geändert: «Lebensmut» `–` → `!krise.html#suizid` (heisst im Suchtest: erster Treffer nicht Suizid). r4-76 liefert keinen Treffer. Das entspricht einem der beiden Vorschläge der Gegenprüfung (N840-6) und ist richtig; `!sicher` wäre strenger | Diff, `suchtest.mjs` Zeile 49 |

## 4 Grenzen

- Die Konstruktionen K1 bis K9 sind Kopien von `site/` im Arbeitsordner, nicht im Repository. Sie sind als Diff abgelegt und nicht committet. K1, K2 und K6 liefen nur mit der Menge `proben`. Für K1 und K2 folgt das Ergebnis schon aus der Bauweise, weil die Treffer gleich bleiben.
- Die Hilfswerkzeuge `abfrage.mjs` und `sichtbar.mjs` liefern die Dateien ohne die Header aus `_headers` aus. Das Raster selbst setzt sie.
- Die Laufzeit eines vollen Laufs auf einem GitHub-Runner ist nicht gemessen.
- Ob «klare Ich-Aussage» eng oder weit zu lesen ist (N840-2), entscheidet Christa Egger. Das Raster prüft LEER für alle Anfragen und ist damit strenger als beide Lesarten.
- Ob K3 als Regel wirklich kommt, ist offen. Die Konstruktion zeigt nur die Art der Lücke. Echte Suchanfragen sind nicht bekannt.
- Chromium über Playwright aus `/opt/borderline-browser`; keine anderen Browser.

## 5 Reproduktion

```bash
export PLAYWRIGHT_MODULE=/opt/borderline-browser/node_modules/playwright
A=<arbeitsordner>; mkdir -p $A/st $A/tool
for p in r73:3764d45 r74:8d95e6a r75:e8efa78 r76:b529695; do mkdir -p $A/st/${p%%:*}; git archive ${p##*:} site | tar -x -C $A/st/${p%%:*}; done
git archive 0259793 authoring | tar -x -C $A/tool
cp audit-results/2026-11-26-nachpruefung-suchraster/werkzeuge/* $A/
# Konstruktion, z. B. K3:
cp -r $A/st/r76 $A/st/k3 && patch -d $A/st/k3 -p1 < audit-results/2026-11-26-nachpruefung-suchraster/konstruktionen/k3.diff
cd $A && ./lauf.sh r75a tool r73 r75 && ./lauf.sh k3 tool r76 k3
```

`lauf.sh` schreibt nach `out/<name>/` und `log-<name>.txt`. K6 braucht eine Werkzeugkopie `tool6` mit `konstruktionen/k6-suchraster-ausnahmen.tsv` als `authoring/tests/suchraster-ausnahmen.tsv`.
