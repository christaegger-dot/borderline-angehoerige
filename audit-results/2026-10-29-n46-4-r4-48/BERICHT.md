# N46-4 · r4-48 · 29.10.2026 · Umsetzung und Selbstprüfung

**Anlass:** Befund N46-4 der Nachprüfung r4-43 bis r4-46 (`audit-results/2026-10-29-nachpruefung-r4-43-r4-46/NACHPRUEFUNG.md`, gemergt mit [PR #723](https://github.com/christaegger-dot/borderline-angehoerige/pull/723)). Der Befund: «Grenzen setzen» schreibt sichtbar «im Abschnitt», der Abschnitt liegt seit r4-46 aber auf der Seite «Wenn es riskant oder bedrohlich wird». Ausgangsstand `main` = `0ce60ea` (r4-47).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung). Sie ist keine juristische oder institutionelle Freigabe und keine unabhängige Prüfung.

## Fachfreigabe

Christa Egger hat am 29.10.2026 gegen 17:53 UTC in der bauenden Sitzung über die zwei vorgeschlagenen Sätze entschieden.

**Freigegeben** («Ja»):

> Im Sicherheitshinweis auf «Grenzen setzen» und auf «Wenn es riskant oder bedrohlich wird»: «Bei Bedrohung oder Gewalt geht Schutz vor jedem Gespräch. Mehr dazu auf der Seite «Wenn es riskant oder bedrohlich wird».»

**Nicht freigegeben** («nein»):

> Im Abschnitt zu den Rollen auf «Grenzen setzen»: «Mehr zu Geld auf der Seite «Wenn es riskant oder bedrohlich wird»

Die Freigabe gilt für genau den ersten Satz. Ändert er sich, gilt sie nicht mehr.

## Umsetzung

| Ort | vorher | nachher |
|---|---|---|
| «Grenzen setzen», gelber Sicherheitshinweis im Einstieg | «Bei Bedrohung oder Gewalt geht Schutz vor jedem Gespräch. Mehr dazu im Abschnitt «Wenn Gewalt oder Bedrohung vorkommt».» | «Bei Bedrohung oder Gewalt geht Schutz vor jedem Gespräch. Mehr dazu auf der Seite «Wenn es riskant oder bedrohlich wird».» |
| «Wenn es riskant oder bedrohlich wird», gelber Sicherheitshinweis | «… Mehr dazu im Abschnitt «Wenn Gewalt oder Bedrohung vorkommt».» | **unverändert**, siehe unten |
| «Grenzen setzen», «Grenzen in verschiedenen Angehörigenrollen», Geld und Unterstützung | «Mehr zu Geld im Abschnitt «Wenn Entscheidungen oder Verhalten riskant werden».» | **unverändert**, Entscheid «nein» |

- **Link:** Der Link im Hinweis heisst jetzt «Wenn es riskant oder bedrohlich wird». Er führt wie bisher direkt auf den Abschnitt `gefahr.html#gewalt` mit dem Akuthinweis. Das `aria-label` ist entfernt, weil der sichtbare Text die Zielseite jetzt selbst nennt. Der zugängliche Name ist damit gleich dem sichtbaren Text (WCAG 2.5.3).
- **Hinweis auf «Wenn es riskant oder bedrohlich wird» nicht geändert:** Der Abschnitt «Wenn Gewalt oder Bedrohung vorkommt» steht dort auf derselben Seite. «Mehr dazu im Abschnitt …» ist dort richtig; das hält auch die Nachprüfung fest (N46-4, «Beleg»). Der freigegebene Satz würde auf dieser Seite auf sich selbst verweisen. Der bisherige Wortlaut bleibt deshalb stehen; er ist mit der Freigabe von r4-46 belegt (`audit-results/2026-10-29-e10-r4-46/FREIGABE.md`). Das ist ein Entscheid der bauenden Sitzung. Soll der freigegebene Satz auch dort stehen, ist das eine kleine Folgeänderung.
- **Verweis «Mehr zu Geld»:** Er bleibt wie er ist. Sichtbar steht weiter «im Abschnitt», das `aria-label` nennt die andere Seite. Damit bleibt dieser Teil von N46-4 bestehen, auf Entscheid von Christa Egger.
- **Build-Kennung r4-48:** `contract.js` `BUILD`, `assetVersion`, `independentReviewWaiver.version`, `pendingScope` und `appliedTo`.

## Ausgeführte Prüfungen

Lokal ausgeführt mit Node 22.22.0, Chromium und Playwright 1.63.0:

| Prüfung | Ergebnis |
|---|---|
| Selbsttest | 86/86 bestanden |
| Produktionsgate | 24 Seiten · 0 Blocker · 20 Hinweise (`crisis-number-check`, Zahl unverändert) |
| Parität `--verify-site` | bestanden, 35 Dateien byte-gleich mit `site/` |
| Suchtest | 216 von 216 Erwartungen |
| Sprach-/UI-Test | 73 Prüfungen bestanden, JS-Fehler 0 |
| Layouttest | 240 Zustände, 25 Bedienproben, 1 Abweichung (`tension core exceeds 1800px`, Ausnahme B2c) |
| Link im Hinweis, gemessen | Blau 125 `rgb(43, 79, 224)` auf Gelb `rgb(248, 245, 203)`: 5,74 : 1; Ziel `gefahr.html#gewalt`; kein `aria-label` |
| Sichtprüfung | Hinweis bei 390 px (vier Zeilen, Kastenhöhe 188 px) und 1440 px (138 px) |

`site/` ändert sich nur in `grenzen.html` (Hinweis) und in der Build-Kennung aller Seiten.

**Nicht geprüft:** Screenreader, Safari und Firefox, reale Geräte.

## Bildschirmfoto

- `grenzen-sicherheitshinweis-390.png`: Sicherheitshinweis auf «Grenzen setzen» bei 390 px
