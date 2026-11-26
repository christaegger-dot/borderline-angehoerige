# r4-73 · PR #713 neu aufgesetzt, erster Teil (ohne Suchregeln) · 26.11.2026 · Selbstprüfung

**Entscheid von Christa Egger, 26.11.2026 (Auswahl in der Sitzung) zu [PR #713](https://github.com/christaegger-dot/borderline-angehoerige/pull/713):** «Neu aufsetzen als Release». #713 ist ein Entwurf vom 23.10.2026 (Auftrag damals: «Einverstanden, leg los»), nie gemergt, mit der Kennung r4-43, die seither anders vergeben ist.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

- **Ausgangsstand:** `main` bei `046b6d4` (#830), Website r4-72.
- **Quelle:** `git diff a7f3073 69aa391` (Basis und Kopf von #713), je Datei per 3-Wege-Patch oder von Hand auf den heutigen Stand übertragen.
- **Unabhängigkeit:** Gebaut von der Sitzung, die r4-70 bis r4-72 gebaut hat. #713 hat eine andere Sitzung verfasst. Prüfen muss eine dritte Sitzung.
- **Umgebung:** Node 22.23.5, Playwright 1.64.0, Chrome Headless Shell 156.0.8078.4 (Revision 1248), axe-core 4.14.0 aus einem Ordner ausserhalb des Repositorys.

## Warum zwei Teile

Der grösste Teil von #713 sind neue Suchregeln für Sicherheitsanfragen, zum Beispiel wohin «will nicht mehr» oder ein Tippfehler in «Suizid» führt. #713 hielt dazu selbst fest, dass vor dem Merge eine Sitzung nachprüfen muss, die nicht gebaut hat. Für Änderungen an der Suchregel gilt ausserdem die Stopp-Regel R34-P01. Diese Sitzung hat die Neufassung deshalb geteilt:

- **Teil 1 (dieses Release):** alles ausser den Suchregeln.
- **Teil 2 (steht aus):** Suchregeln, Suchbegriffe und Testliste, als eigenes Release mit Nachprüfung vor dem Merge.

## Was aus #713 übernommen ist

| Befund in #713 | Änderung | Datei |
|---|---|---|
| S3 | Zehn Weiterleitungen der früheren Notfallkarte, des Notfallplans und von «Soforthilfe» führen auf `krise.html#krise-schnell` statt auf die Startseite | `authoring/_redirects` |
| NF-04 | Drei Kinder-Weiterleitungen führen auf `kinder.html` statt `rolle.html#kinder` | `authoring/_redirects` |
| S9 / KU-01 | Auf «Kurz und klar» steht «Sie sorgen sich um die Sicherheit» als erste von sechs Situationen, mit dem Akuthinweis. Wortlaut unverändert | `content/kurz.html` |
| KU-03 | Der Kinder-Link auf «Kurz und klar» führt auf `kinder.html#schnell` | `content/kurz.html` |
| FR-05 | «Mehr dazu» bei der Medikamentenfrage führt auf `behandlung.html#medikamente`. Linktext ist der Titel des Zielabschnitts, «Begleiterkrankungen und Medikamente» (vorher «Therapieformen») | `content/fragen.html` |
| S8 / FR-01 | Drei Antworten mit Handlungsanleitungen für akute Lagen sind offen statt eingeklappt: `f-kinder`, `f-verlassen`, `f-depression` | `site.config.json` (`openFaqIds`) |
| S4 / SU-03 | Die Leermeldung der Suche hat einen zweiten Link auf `krise.html#krise-schnell`. Linktext ist der freigegebene Einstieg der Startseite, «Ich sorge mich um Sicherheit, Selbstgefährdung oder Gewalt.» | `content/suche.html`, `tools/sprachtest.mjs` |
| BU-04 | Ein Sprungziel in einem Akkordeon öffnet dessen Eintrag, der Fokus liegt auf der Schaltfläche (zum Beispiel `buecher.html#kritisch`) | `js/interaktion.js` |
| X3 | Suchfelder in der Seitenschrift statt in der Browser-Vorgabe; Hinweistext mit festem Kontrast | `css/site.css` |

**Abweichung bei X3:** #713 setzte `font:inherit`, also die Grösse des Lesetexts (19 px am Telefon). Damit wäre der Hinweistext im Suchfeld am Telefon noch stärker abgeschnitten (458 von 269 px). Dieses Release setzt 1rem wie bei der übrigen Bedienung.

## Was nicht übernommen ist

- **Teil 2, steht aus:** S4/SU-01, SU-02, SU-06 und SU-09 (Suchregeln und Suchbegriffe in `js/interaktion.js`), SU-05 (`tools/search-index.mjs` und drei Aliase in `site.config.json`), 25 neue Sucherwartungen in `tests/suche-ersttreffer.tsv`.
- **X1 / KR-01 (Silbentrennung in schmalen Spalten über Container-Abfragen) samt Vermerk in `DARSTELLUNGSREGELN.md` und der Regel für den Zähler der Kapitelübersicht:** nicht übernommen. Die Gestaltung ist seit dem 23.10.2026 in r4-43 bis r4-72 stark verändert. Die Regel setzt `container-type` auf `.puk-web-main` und die Abschnittsraster und müsste am heutigen Stand neu entworfen und gemessen werden. Gemessen ist heute: kein waagrechter Überlauf bei 100, 200 und 300 % Schrift.
- Die Punkte, die #713 selbst offen liess (S1, S2, zweiter Teil von S3, KR-08, Profilpunkte), bleiben offen.

## Wirkung (vorher r4-72, nachher r4-73)

Messung mit `vergleich.cjs` (Ausgabe `vergleich-ausgabe.txt`, Bilder unter `bilder/`), dazu `weiterleitungen-ausgabe.txt`.

| Punkt | Vorher | Nachher |
|---|---|---|
| `/notfall`, `/notfallkarte`, `/soforthilfe` | Startseite | `krise.html#krise-schnell` |
| Weiterleitungen gesamt | 88 interne, alle Ziele vorhanden | 88, alle Ziele und Anker vorhanden; 10 auf `krise.html#krise-schnell`, 3 auf `kinder.html` |
| «Kurz und klar», erste Situation | «Ein Gespräch kippt» | «Sie sorgen sich um die Sicherheit»; ein Akuthinweis auf der Seite, wie vorher |
| «Fragen», offene Antworten | 2 von 27 (`f-bedrohlich`, `f-einweisung`) | 5 von 27 |
| Leermeldung der Suche | 1 Link | 2 Links |
| `buecher.html#kritisch` | Eintrag zugeklappt, Fokus auf der Überschrift | Eintrag aufgeklappt, Fokus auf der Schaltfläche |
| Suchfelder | 13,33 px Arial, Kontrast des Hinweistexts 4,61 : 1 | 16 px Rubik, 5,92 : 1; Höhe unverändert 44 px |

**Nebenwirkung bei X3:** Der Hinweistext im Suchfeld ist am Telefon stärker abgeschnitten.

| Seite, Breite | Vorher: Hinweis von Platz | Nachher |
|---|---|---|
| Suche, 375 px | 305 von 269 px | 385 von 269 px, sichtbar «Zum Beispiel Einweisung, Eltern o» |
| Suche, 320 px | 305 von 214 px | 385 von 214 px |
| Begriffe, 375 px | 207 von 269 px (passt) | 259 von 269 px (passt) |
| Begriffe, 320 px | 207 von 214 px (passt) | 259 von 214 px |
| Quellen, 320 px | 144 von 214 px (passt) | 180 von 214 px (passt) |

Das verschärft P4-3. Den Hinweistext zu kürzen wäre Wortlaut.

**Berichtigung zu r4-71:** Der Bericht zu r4-71 nennt «kein Text unter 16 px». Die Suchfelder standen weiter in 13,33 px; die Messung hat Eingabefelder nicht erfasst. Mit diesem Release sind es 16 px.

**Suche unverändert:** Der Suchtest besteht mit denselben 216 Erwartungen wie vorher.

## Ausgeführte Prüfungen

| Prüfung | Ergebnis |
|---|---|
| `build.mjs --production --out=site --write-site` | `Build production: 24 Seiten · 0 Blocker · 20 Hinweise · Ziel site` |
| `--verify-site` | `PARITÄT BESTANDEN: 35 Dateien byte-gleich mit site/` |
| Selbsttest | `127/127 bestanden` |
| Suchtest | `216 von 216 Erwartungen wie festgeschrieben · JS-Fehler 0` |
| Sprach-/UI-Test | `74 Prüfungen bestanden · JS-Fehler 0` (eine neue Prüfung für den zweiten Link der Leermeldung) |
| Layouttest | `240 Seitenzustände, 38 Bedienproben, 2 Abweichungen`, Exit 1: Sicherheitskarte bei 375 × 667 und 360 × 740, wie vorher |
| Überlauf bei 100, 200 und 300 % Schrift, 320, 375 und 768 px, alle Seiten | 0 von 216 Läufen, vorher wie nachher |
| Überlauf bei 12 bis 16 px Standardschrift, 560 bis 800 px (`kleinschrift.cjs` aus r4-72) | keiner |
| axe-core 4.14.0, 390 und 1280 px mit Standardschrift, 320 und 1440 px mit 200 % Schrift | `build r4-73 · Seiten: 24 · Läufe: 96 · Verstösse: 0` |

In `site/` ändern sich ausser der Kennung: `_redirects`, `css/site.css`, `js/interaktion.js`, `fragen.html`, `kurz.html` und `suche.html`.

## Offen

- Nachprüfung durch eine andere Sitzung; Merge nur auf Auftrag.
- Teil 2 (Suchregeln). #713 bleibt bis dahin offen.
- Ob die Weiterleitungen in der Produktion mit Sprungziel ankommen, zeigt erst der Stand nach dem Merge; lokal sind nur Ziel und Anker geprüft.
- P4-3: Hinweistext im Suchfeld (Wortlaut).
