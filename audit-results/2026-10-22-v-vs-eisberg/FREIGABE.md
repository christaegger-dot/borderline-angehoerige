# Fachliche Freigabe · Beispielsätze `v-vs-eisberg` · 22. Oktober 2026

Christa Egger hat im laufenden Chat am **22.10.2026 um 09:14 Uhr (Europe/Zurich)** ausdrücklich erklärt:

> ich gebe beide sätze frei

Die Erklärung bezieht sich auf die zuvor vorgelegte Fassung in Commit `176444c` auf dem Branch `gestaltung/2026-10-21`, [PR #708](https://github.com/christaegger-dot/borderline-angehoerige/pull/708). Die Nachricht wird hier als Freigabenachweis dokumentiert; sie ist keine durch die umsetzende Sitzung ersetzte oder ergänzte Erklärung.

## Vorgeschichte am selben Tag

- F1 «Du willst mich doch nur provozieren.»: Rückmeldung «OK».
- F2 «Deine Stimme wird lauter. Wie ist es gerade für dich?»: Rückmeldung «nicht ok, bitte formuliere es natürlicher, menschlicher». Aus drei vorgelegten Fassungen gewählt: «Ich höre, dass du lauter wirst. Magst du mir sagen, was gerade in dir vorgeht?» (Commit `176444c`). Die Wahl allein galt nicht als Freigabe; diese folgte mit der obigen Erklärung.

## Freigegebener Umfang

| Gegenstand | Kanonische Quelle | Freigabe |
| --- | --- | --- |
| Beispiel «Gedanken lesen»: «Du willst mich doch nur provozieren.» | `authoring/content/verstehen.html`, Abschnitt `eisberg` | fachlich freigegeben |
| Beispiel «Beobachten und nachfragen»: «Ich höre, dass du lauter wirst. Magst du mir sagen, was gerade in dir vorgeht?» | `authoring/content/verstehen.html`, Abschnitt `eisberg` | fachlich freigegeben |

## Umsetzung

- Planzeile `v-vs-eisberg` in `authoring/site.config.json`: `approvalStatus` auf `freigegeben`, dazu `approvedBy`, `approvedAt`, `approvalRef` (dieses Dokument) und `approvalScope`.
- Das Etikett «Musterentwurf, nicht fachlich geprüft» über den Beispielsätzen ist entfernt. Die Sätze selbst, die Bezeichnungen «Gedanken lesen» und «Beobachten und nachfragen» und der übrige Abschnitt bleiben unverändert.
- Nicht Teil dieser Freigabe: die übrigen Gestaltungspunkte von PR #708 (F3, F4, W6), die fünf ausstehenden Abbildungen aus r4-39 und die offene unabhängige Nachprüfung des PR. Kein Merge- oder Deploymentauftrag.
