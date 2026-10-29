# E10 · r4-46 · 29.10.2026 · Umsetzung und Selbstprüfung

**Auftrag von Christa Egger, 29.10.2026:** «mach weiter mit E10». Ausgangsstand `main` = `352c716` (r4-45 mit PR #717, Pendenzen mit PR #718). Branch `claude/dazzling-cerf-n6ci1w`, neu von `main` aufgesetzt.

E10 im Gestaltungssystem «Borderline Angehörige» hat zwei Teile:

1. «Grenzen setzen» teilen.
2. «Das Wichtigste» auf den Themenseiten ergänzen, die noch keinen Schnelleinstieg haben.

Beides berührt Struktur und Wortlaut. **Die neuen Titel und die angepassten Sätze (Liste unten) brauchen die Fachfreigabe von Christa Egger.** Akut- und Sicherheitswortlaut ist nicht neu formuliert.

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine fachliche, juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

## Teil 1 · «Grenzen setzen» geteilt

### Neue Seite «Wenn es riskant oder bedrohlich wird» (`gefahr.html`)

Die Seite gehört zum Bereich «Krisen», neben «Krisen begleiten». Damit hat dieser Bereich wieder eine Liste «Weiter im Bereich». Die Brotkrumen lauten «Übersicht / Krisen / Wenn es riskant oder bedrohlich wird».

- **Abschnitte:** «Wenn Entscheidungen oder Verhalten riskant werden» (`#riskant`) und «Wenn Gewalt oder Bedrohung vorkommt» (`#gewalt`). Sie sind **wortgleich** übernommen, samt Akuthinweis (Platzhalter `data-responsibility-inline`), Links und Unterabschnitt «Wenn Kinder mitbetroffen sind». Die Sprungziele heissen gleich.
- **Einstieg:**
  - Seitentitel und Einleitung, siehe Liste.
  - Derselbe gelbe Sicherheitshinweis wie auf «Grenzen setzen», wortgleich.
  - Ein Satz mit Link zurück auf «Grenzen setzen».
- **Quellen zu dieser Seite:** die sieben Angaben, die diese zwei Abschnitte stützen. Das sind Kanton Zürich Notfall und Rettung (Akuthinweis), EBG Häusliche Gewalt, Gewaltschutzgesetz Kanton Zürich, Forensic Nurses, NICE CG78, Opferhilfe Schweiz und ZGB Art. 390.
- **Konfiguration:** Plan der Darstellungen (`v-gr-riskant`, `v-gr-gewalt` mit ihren Freigabeständen, neu `v-gf-quellen`), Suchbegriffe und Suchausschnitt der zwei Abschnitte, `sensitiveTopics` wie bisher bei «Grenzen setzen».

**Titel:** Das Gestaltungssystem schlug «Wenn es riskant oder gefährlich wird» vor. Mit diesem Titel lieferte die Suche bei «gefährlich» die neue Seite statt «Krisen begleiten» › «Während einer Krise». Das ist eine festgeschriebene Erwartung. Der Titel ist deshalb «Wenn es riskant oder **bedrohlich** wird». Aus demselben Grund steht in der Beschreibung der Seite nicht «Polizei»: Sonst wäre «Polizei» vor «Krisen begleiten» › «Wenn Sie sich jetzt Sorgen machen» gelandet.

### «Grenzen setzen» danach

- **Inhalt:** Neun Abschnitte statt elf. «Auf dieser Seite» hat neun Einträge.
- **Sicherheitshinweis oben:** Er ist wortgleich und führt jetzt auf `gefahr.html#gewalt`, mit sprechender Beschriftung für Screenreader.
- **Verweis «Mehr zu Geld»:** Er steht in «Grenzen in verschiedenen Angehörigenrollen» und führt auf `gefahr.html#riskant`.
- **Quellen zu dieser Seite:** sieben statt dreizehn Angaben. Bei NICE CG78 ist die Verwendung in «Wenn Gewalt oder Bedrohung vorkommt» entfernt.
- **Beschreibung (Konfiguration):** Sie nennt die neue Seite.
- **144 und 117:** «Grenzen setzen» zeigt die beiden Nummern nicht mehr selbst. Der Akuthinweis stand im Abschnitt «Wenn Gewalt oder Bedrohung vorkommt» und ist mit ihm umgezogen. Der Sicherheitshinweis zuoberst führt mit einem Klick dorthin. Das entspricht der Regel «Notrufnummern nur an den thematischen Stellen» (A03-231). Soll «Grenzen setzen» die Nummern trotzdem selbst zeigen, ist das ein eigener Entscheid.

### Verweise, Suche und alte Links

- **Links auf anderen Seiten:** neun Links auf `grenzen.html#gewalt` bzw. `#riskant` zeigen auf die neue Adresse. Betroffen sind Beziehungen, Fragen, Jugendliche, Kinder, Kommunizieren, Krise, Rolle (2) und Auf sich achten. Die Beschriftung auf «Fragen» ist nachgeführt.
- **Quellenseite:** Bei sieben Angaben ist «Verwendet auf» nachgeführt. Bei sechs ersetzt die neue Seite «Grenzen setzen», bei NICE CG78 ist sie ergänzt.
- **Sicherheitssuche:**
  - Das Ziel für Gewaltanfragen in `authoring/js/interaktion.js` (`safetyTargets.gewalt`) ist `gefahr.html#gewalt` statt `grenzen.html#gewalt`.
  - Die festgeschriebenen Erwartungen in `authoring/tests/suche-ersttreffer.tsv` sind auf die neue Adresse umgestellt: 76 Stellen `#gewalt`, 6 Stellen `#riskant`.
  - Die Menge der Sicherheitsabschnitte in `suchtest.mjs` ist nachgeführt.
  - **Logik, Wörter und Rangfolge der Suche sind unverändert.** Alle 216 Erwartungen treffen genau so ein wie vorher, nur unter der neuen Adresse.
- **Alte Lesezeichen und externe Links:** `grenzen.html#gewalt` und `grenzen.html#riskant` leiten per Skript auf die neue Seite weiter. Gesteuert wird das über `movedAnchors` in der Seitenkonfiguration und `data-moved-anchors`. Das ist geprüft: Laden, Hashwechsel, Fokus auf dem Ziel; andere Sprungziele bleiben auf «Grenzen setzen». Ohne Skript zeigt der Sicherheitshinweis zuoberst den Weg. Netlify-Weiterleitungen können keine Sprungziele umleiten; in `_redirects` zeigte keine Regel auf die zwei Abschnitte.
- **Sprachtest:** Die Prüfung «Akuthinweis mit 144 und 117 vorhanden» läuft für `gefahr` statt für `grenzen`, weil der Hinweis mit dem Abschnitt umgezogen ist.

## Teil 2 · «Das Wichtigste» auf fünf weiteren Seiten

Es ist derselbe Kasten wie auf den sechs bisherigen Seiten: Etikett «Das Wichtigste», ein Titel, eine kurze Liste. Er steht unter dem Einstieg. Die Sätze stammen von derselben Seite. Nach dem Abgleich mit Skript stehen 19 von 26 Satzteilen wörtlich auf derselben Seite, bei «Genesung» als verschobene Kernsätze. Die übrigen 7 sind unten aufgeführt.

| Seite | Titel des Kastens | Punkte |
|---|---|---|
| Borderline verstehen | Wenn ein Moment gerade schwierig ist | 3 |
| Alltag und Beziehungen | Wenn es zwischen Ihnen gerade schwierig ist | 3 |
| Grenzen setzen | Wenn Sie nur die nächsten Schritte brauchen | 3 |
| Diagnose und Begleiterkrankungen | Wenn vieles noch unklar ist | 4 |
| Genesung | In drei Sätzen | 3 (die drei Kernsätze des bisherigen Einstiegs, wortgleich verschoben) |

**Ohne Kasten bleiben:**

- **«Unterstützung finden» und «Bücher für Angehörige»:** Beide sind Verzeichnisseiten, eine Kurzfassung würde nur «Auf dieser Seite» wiederholen.
- **Die neue Seite «Wenn es riskant oder bedrohlich wird»:** Sie hat zwei Abschnitte und den Sicherheitshinweis gleich oben.

## Zur Fachfreigabe: neuer oder angepasster Wortlaut

**Neu:**

- Seitentitel: «Wenn es riskant oder bedrohlich wird»
- Titel der Kästen: «Wenn ein Moment gerade schwierig ist» · «Wenn es zwischen Ihnen gerade schwierig ist» · «Wenn vieles noch unklar ist» · «In drei Sätzen». «Wenn Sie nur die nächsten Schritte brauchen» steht schon auf drei Seiten.
- «Wie Sie im Alltag eigene Grenzen finden und aussprechen, steht auf der Seite «Grenzen setzen».» (Einstieg der neuen Seite)
- «Mehr dazu: «Suizidgedanken und Selbstverletzung».» (Linkzeile im Kasten «Diagnose»)

**Angepasst** (zusammengezogen oder gekürzt; der Bestand steht in Klammern):

- Einstieg der neuen Seite: «Bei Bedrohung oder Gewalt hat Ihre Sicherheit Vorrang.» Der Satz steht wortgleich im bisherigen Suchausschnitt des Abschnitts «Gewalt».
- Verstehen: «Wenn ein Gespräch möglich und sicher ist, beschreiben Sie zuerst nur, was Sie wahrnehmen, und fragen Sie offen: «Wie ist es gerade für dich?»» (zwei Sätze aus «Beobachten, nicht Gedanken lesen» zusammengezogen)
- Verstehen: «Verstehen bedeutet nicht, alles auszuhalten.» (ohne «aber») und «Sprechen Sie mit einer Person, der Sie vertrauen, oder holen Sie sich Beratung.» (ohne «darüber»)
- Diagnose: «… führen die Abklärung durch.» (statt «führen sie durch»)
- Diagnose: «Eine Diagnose ist weder Voraussetzung für jede Hilfe noch eine Festlegung für immer.» (aus «Sie ist aber weder Voraussetzung für jede Hilfe noch eine vollständige Erklärung …» und «Eine Diagnose ist keine Festlegung für immer.»)
- Diagnose: «Suizidale Aussagen oder Hinweise auf konkrete Pläne brauchen eine professionelle Einschätzung.» (ohne «, unabhängig davon, welcher Diagnose man sie zuordnet»)

Alle übrigen Sätze in den Kästen stehen wörtlich auf derselben Seite.

## Ausgeführte Prüfungen

Lokal ausgeführt mit Node 22.22.0, Chromium und Playwright 1.63.0:

| Prüfung | Ergebnis |
|---|---|
| Selbsttest | 84/84 bestanden |
| Produktionsgate | **24 Seiten** · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| Parität `--verify-site` | bestanden, **35 Dateien** byte-gleich mit `site/` |
| Suchtest | 216 von 216 Erwartungen (Adressen wie oben umgestellt) |
| Sprach-/UI-Test | 73 Prüfungen bestanden, JS-Fehler 0 |
| Layouttest | **240 Zustände** (neue Seite eingeschlossen), 25 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, Ausnahme B2c), Titelumbrüche ohne Befund |
| Weiterleitung alter Sprungziele | `grenzen.html#gewalt` → `gefahr.html#gewalt`, `#riskant` → `gefahr.html#riskant`, `#dear` bleibt; auch beim Hashwechsel |
| Sichtprüfung | neue Seite 1440 und 390 px, «Grenzen setzen» 1440 px, «Genesung» 1440 px, Kasten «Diagnose» 390 px |

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.

## Bildschirmfotos

- `neu-gefahr-1440.png`: neue Seite, erster Bildschirm
- `neu-grenzen-1440.png`: «Grenzen setzen» mit Sicherheitshinweis und «Das Wichtigste»
- `neu-genesung-1440.png`: «Genesung» mit den Kernsätzen im Kasten
- `neu-diagnose-kasten-390.png`: Kasten «Diagnose» auf dem Handy
