# Korrektur · r4-47 · 29.10.2026 · Befunde der Nachprüfung r4-43 bis r4-46

**Auftrag von Christa Egger, 29.10.2026:** «behebe den Kontrast gleich». Anlass war ein Zwischenbefund der Prüfsitzung «Nachprüfung r4-43 bis r4-46». Ihr Bericht liegt inzwischen vor: [PR #723](https://github.com/christaegger-dot/borderline-angehoerige/pull/723), `audit-results/2026-10-29-nachpruefung-r4-43-r4-46/NACHPRUEFUNG.md`, Empfehlung «Nachbesserung nötig, ohne Blocker». Dieser Stand behebt die Befunde N46-1, N46-2, N46-5, N46-6 und N46-7. Die Entscheide dazu stützen sich auf «entscheide selbständig, du hast freie Hand». Ausgangsstand `main` = `b220994` (r4-46).

Diese Datei ist der Nachweis der bauenden Sitzung (Selbstprüfung), keine unabhängige Prüfung.

## N46-1 · Kontrast im gelben Sicherheitshinweis

### Befund und Ursache

Der Link im gelben Sicherheitshinweis «Zu Ihrer Sicherheit» zuoberst auf «Grenzen setzen» und auf «Wenn es riskant oder bedrohlich wird» erschien in Blau 100 (`#3C64FF`) auf Gelb (`#F8F5CB`). Das ergibt **4,24 : 1** statt mindestens 4,5 : 1 (WCAG 1.4.3).

Ursache war eine Regel für Links im Einstieg, `.puk-longform__hero a.puk-link--inline{color:var(--blau)}`, Spezifität 0,2,1. Sie überstimmte die Regel für Links im Hinweis, `.puk-longform__boundary a{color:var(--blau-125)}`, Spezifität 0,1,1. Der Fehler bestand seit r4-43. Damals kam die neue Einstiegsregel dazu, der Hinweis stand aber schon im Einstieg.

### Korrektur

`authoring/css/site.css`: Die Regel für Links im Hinweis gilt zusätzlich mit gleicher Spezifität als `.puk-longform__boundary:not(.puk-site-inline-ref) a.puk-link--inline`. Sie steht nach der Einstiegsregel und setzt sich deshalb durch. Der rote Akuthinweis (`.puk-site-inline-ref`) ist ausgenommen, damit 144 und 117 rot bleiben. Ein erster Entwurf ohne diese Ausnahme hätte die Nummern blau gefärbt; das zeigte die Nachmessung, und die Ausnahme behebt es.

Kein Wortlaut geändert. Build-Kennung r4-47.

### Messung (Chromium, berechnete Farben)

| Stelle | vorher | nachher |
|---|---|---|
| Link im gelben Hinweis, «Grenzen setzen» und «Wenn es riskant oder bedrohlich wird» | Blau 100 auf Gelb, 4,24 : 1 | Blau 125 (`#2B4FE0`) auf Gelb, **5,74 : 1** |
| 144/117 im roten Akuthinweis (6 Seiten) | Rot-Text auf Rot-Fläche, 6,51 : 1 | unverändert, 6,51 : 1 |

Prüflauf über alle 24 Seiten bei 1280 und 390 px, Vertiefungen geöffnet: 1645 Links und Kastenetiketten in Kopf, Inhalt und Fusszeile. Unter dem Grenzwert liegt nur `404.html`. Dort fehlt beim Laden über `file://` das Stylesheet, weil die Fehlerseite absolute Pfade nutzt (`/css/site.css`), wie es für Netlify nötig ist. Das ist eine Eigenheit der Messung, kein Befund.

Die Kontrastzeile im Bericht r4-43 ist berichtigt.

## N46-2 · E-Mail-Link der Absenderin

Die Regel `[data-sender-email]{min-height:44px}` aus r4-43 kam nicht zur Wirkung. `.puk-link--inline` steht weiter hinten im Stylesheet, hat dieselbe Spezifität und setzt `min-height:0`. Der Link war deshalb 213 × 22 px hoch. Bei 390 px stand er ohne Abstand über den Direkteinstiegen (axe `target-size` auf 23 Seiten). Jetzt gilt die Regel als `.puk-site-sender a[data-sender-email]` und setzt sich durch.

| Breite | E-Mail-Link | Kopf vorher → nachher |
|---|---|---|
| 320 px | 213 × 44 | 191 → 213 |
| 390 px | 213 × 44 | 169 → 191 |
| 768 px | 213 × 44 | 169 → 191 |
| 1280 px | 213 × 44 (neben den Direkteinstiegen) | 138 → 134 |

Der Kopf bleibt unter den Grenzen des Layouttests (220/250 px).

## N46-5 · Gate prüft umgezogene Sprungziele

`authoring/tools/contract.js`, neue Regel `moved-anchor`. Je Eintrag in `movedAnchors` prüft sie:

- Das Ziel hat die Form `seite.html#anker`.
- Das Ziel ist eine veröffentlichte Seite mit diesem Anker.
- Das Ziel leitet nicht selbst weiter.
- Der alte Anker besteht auf der Seite nicht mehr.

Zwei neue Fälle im Selbsttest decken das ab: Ziel fehlt, und alter Anker besteht noch. Der Selbsttest hat jetzt 86 statt 84 Fälle.

## N46-6 · Layouttest mit festen Namen

Die Probe ohne JavaScript vergleicht die sichtbaren Navigationslinks jetzt mit den fünf freigegebenen Namen («Verstehen», «Im Alltag», «Krisen», «Familie», «Für Sie»). Vorher verglich sie mit der Zahl aus dem Seitenvertrag. Die Probe ist damit wieder unabhängig von der Konfiguration.

## N46-7 · «Weiter im Bereich» auf «Wenn es riskant oder bedrohlich wird»

`showInSectionNav: false` bei `krise` stammt aus der Zeit, als «Krisen begleiten» eine Unterseite von «Alltag und Beziehungen» war (Migration `ee6b7af`, ohne Begründung). Seit r4-45 ist die Seite Einstieg ihres eigenen Bereichs. Das Merkmal ist entfernt. «Wenn es riskant oder bedrohlich wird» zeigt jetzt «Weiter im Bereich «Krisen»» mit «Krisen begleiten». Andere Listen ändern sich nicht.

## Nicht in diesem Stand

- **N46-3, fehlende Fachfreigabe:** inzwischen erledigt. Christa Egger: «Ich gebe den Wortlaut von r4-46 frei» (`audit-results/2026-10-29-e10-r4-46/FREIGABE.md`, PR #722). Die Prüfsitzung prüfte den Stand davor.
- **N46-4, «im Abschnitt» auf «Grenzen setzen»:** Die Korrektur wäre neuer Wortlaut im Sicherheitshinweis. Sie wird Christa Egger zur Freigabe vorgelegt.

## Prüfungen

- Selbsttest 86/86
- Produktionsgate: 24 Seiten, 0 Blocker, 20 Hinweise
- Parität: 35 Dateien
- Suchtest 216/216
- Sprach-/UI-Test 73/73
- Layouttest: 240 Zustände, 25 Bedienproben, 1 Abweichung (bekannte Ausnahme B2c)
