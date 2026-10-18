# Fachliche Freigabe · r4-38 · 18. Oktober 2026

Christa Egger hat im laufenden Chat am **18.10.2026 um 19:45 Uhr (Europe/Zurich)** ausdrücklich erklärt:

> Ich gebe die drei überarbeiteten Abbildungen und den neuen Akuthinweis von r4-38 fachlich frei.

Die Erklärung bezieht sich auf die zuvor vorgelegte unveränderte Fassung **r4-38**, Commit `43e954a0317055f7e529f2473e150d258dd202c7`, in [PR #706](https://github.com/christaegger-dot/borderline-angehoerige/pull/706). Die Nachricht wird hier als Freigabenachweis dokumentiert; sie ist keine durch die umsetzende Sitzung ersetzte oder ergänzte Erklärung.

## Freigegebener Umfang

| Gegenstand | Kanonische Quelle | Freigabe |
| --- | --- | --- |
| `v-bz-sichten` · Zwei mögliche Sichten im Beispiel | `authoring/content/beziehungen.html`, Abschnitt `zwei-sichten` | fachlich freigegeben |
| `v-gr-dear` · DEAR in vier Schritten | `authoring/content/grenzen.html`, Abschnitt `dear` | fachlich freigegeben |
| `v-ge-forschung` · Unterschiedliche Verläufe in einer Langzeitstudie | `authoring/content/genesung.html`, Abschnitt `forschung` | fachlich freigegeben |
| Neuer situationsbezogener Akuthinweis | `authoring/site.config.json`, `responsibility.inline` | fachlich freigegeben |

Die zugehörigen Aufnahmen stehen im [Überarbeitungsbericht](BERICHT.md#visuelle-belege).

### Freigegebener Akutwortlaut

> Bei unmittelbarer Lebensgefahr rufen Sie in der Schweiz den Rettungsdienst unter 144. Bei akuter Bedrohung oder Gewalt rufen Sie die Polizei unter 117. Wenn Sie die Dringlichkeit nicht einschätzen können, holen Sie sofort eine ärztliche Einschätzung. Warten Sie nicht auf eine Antwort der Fachstelle per E-Mail.

Die Telefonlinks bleiben `tel:144` und `tel:117`. Text, Rufnummern, Grafiktexte und Gestaltung wurden für die Dokumentation dieser Freigabe nicht verändert.

## Umsetzung und verbleibender Prüfpunkt

Die drei `approvalStatus`-Felder werden auf `freigegeben` und `responsibility.inline.reviewStatus` auf `geprueft` gesetzt. Name, Datum, Umfang und Verweis auf dieses Dokument sind bei den vier Einträgen festgehalten.

`releaseApproval.independentReview` bleibt **`ausstehend`**. Die Nachricht bescheinigt keine unabhängige Gesamtprüfung der Änderungsrunde und erteilt keinen Merge- oder Deploymentauftrag. Historische R3-Freigaben bleiben ihren damaligen Fassungen zugeordnet.

Nachtest nach dieser Statusänderung: [NACHTEST-FACHFREIGABE.txt](NACHTEST-FACHFREIGABE.txt).
