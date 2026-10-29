# Korrektur · r4-47 · 29.10.2026 · Kontrast im gelben Sicherheitshinweis

**Auftrag von Christa Egger, 29.10.2026:** «behebe den Kontrast gleich». Anlass ist ein Zwischenbefund der Prüfsitzung «Nachprüfung r4-43 bis r4-46», die noch läuft. Ausgangsstand `main` = `b220994` (r4-46).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung), keine unabhängige Prüfung.

## Befund und Ursache

Der Link im gelben Sicherheitshinweis «Zu Ihrer Sicherheit» zuoberst auf «Grenzen setzen» und auf «Wenn es riskant oder bedrohlich wird» erschien in Blau 100 (`#3C64FF`) auf Gelb (`#F8F5CB`). Das ergibt **4,24 : 1** statt mindestens 4,5 : 1 (WCAG 1.4.3).

Ursache war eine Regel für Links im Einstieg, `.puk-longform__hero a.puk-link--inline{color:var(--blau)}`, Spezifität 0,2,1. Sie überstimmte die Regel für Links im Hinweis, `.puk-longform__boundary a{color:var(--blau-125)}`, Spezifität 0,1,1. Der Fehler bestand seit r4-43. Damals kam die neue Einstiegsregel dazu, der Hinweis stand aber schon im Einstieg.

## Korrektur

`authoring/css/site.css`: Die Regel für Links im Hinweis gilt zusätzlich mit gleicher Spezifität als `.puk-longform__boundary:not(.puk-site-inline-ref) a.puk-link--inline`. Sie steht nach der Einstiegsregel und setzt sich deshalb durch. Der rote Akuthinweis (`.puk-site-inline-ref`) ist ausgenommen, damit 144 und 117 rot bleiben. Ein erster Entwurf ohne diese Ausnahme hätte die Nummern blau gefärbt; das zeigte die Nachmessung, und die Ausnahme behebt es.

Kein Wortlaut geändert. Build-Kennung r4-47.

## Messung (Chromium, berechnete Farben)

| Stelle | vorher | nachher |
|---|---|---|
| Link im gelben Hinweis, «Grenzen setzen» und «Wenn es riskant oder bedrohlich wird» | Blau 100 auf Gelb, 4,24 : 1 | Blau 125 (`#2B4FE0`) auf Gelb, **5,74 : 1** |
| 144/117 im roten Akuthinweis (6 Seiten) | Rot-Text auf Rot-Fläche, 6,51 : 1 | unverändert, 6,51 : 1 |

Prüflauf über alle 24 Seiten bei 1280 und 390 px, Vertiefungen geöffnet: 1645 Links und Kastenetiketten in Kopf, Inhalt und Fusszeile. Unter dem Grenzwert liegt nur `404.html`. Dort fehlt beim Laden über `file://` das Stylesheet, weil die Fehlerseite absolute Pfade nutzt (`/css/site.css`), wie es für Netlify nötig ist. Das ist eine Eigenheit der Messung, kein Befund.

## Prüfungen

- Selbsttest 84/84
- Produktionsgate: 24 Seiten, 0 Blocker, 20 Hinweise
- Parität: 35 Dateien
- Suchtest 216/216
- Sprach-/UI-Test 73/73
- Layouttest: 240 Zustände, 25 Bedienproben, 1 Abweichung (bekannte Ausnahme B2c)
