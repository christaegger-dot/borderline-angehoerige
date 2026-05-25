# Handout Asset Blocker Report

Stand: 2026-05-23  
Basis: Web-Textversionen nach Content-Härtung auf `main`  
Zweck: Sichtbar machen, bei welchen Handouts die editierbare Web-Textversion inzwischen fachlich weiter ist als das flach gerenderte PDF/WebP-Asset.

## Kurzurteil

Die Web-Textversionen sind die aktuell fachlich gehärtete Ebene. Die bestehenden PDF-/WebP-Handouts wurden dadurch nicht automatisch neu gesetzt. Dieser Report markiert deshalb alle Handouts, bei denen Textversion und gerendertes Asset auseinanderlaufen können.

Wichtig: Dieser Report ersetzt keine visuelle PDF-Prüfung. Er ist ein Reexport-/Review-Backlog für die Design-/Asset-Ebene.

## Legende

| Stufe    | Bedeutung                                                                                                                  | Release-Entscheid                                                         |
| -------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| P0       | Sicherheits-, Krisen-, Telefonnummern- oder Suizid-/Gewaltlogik kann im PDF/WebP veraltet sein.                            | Vor formaler Veröffentlichung des Assets prüfen und ggf. neu exportieren. |
| P1       | Fachliche Kernaussage, Quellenlogik oder Prognose-/Neuro-/DBT-Formulierung wurde in der Textversion substanziell geändert. | Vor aktiver Bewerbung des Assets prüfen und bei Drift neu exportieren.    |
| P2       | Tonalitäts-, Entlastungs-, Caveat- oder Überverantwortungspräzisierung wurde ergänzt.                                      | In den nächsten Asset-Pass aufnehmen.                                     |
| Resolved | Ersatzasset ist geliefert und produktiv referenzierbar.                                                                    | Asset bleibt trotzdem im normalen Fidelity-Audit.                         |

## Resolved: Ersatzassets geliefert

| ID                         | Aktuelle produktive Assets                                                                                                                                                                                | Erwartung | Status                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------ |
| `zuhoeren-ohne-zustimmen`  | `/infografiken/validierung-die-validierungs-treppe-v9.pdf`, `/infografiken/validierung-die-validierungs-treppe-v9.webp`, `/infografiken/extras/thumbnails/validierung-die-validierungs-treppe-v9.webp`    | erfüllt   | v9-Assets liegen vor und ersetzen die produktiven v5-Referenzen.         |
| `krisenkommunikation`      | `/infografiken/deeskalation-der-deeskalations-pfad-v10.pdf`, `/infografiken/deeskalation-der-deeskalations-pfad-v10.webp`, `/infografiken/extras/thumbnails/deeskalation-der-deeskalations-pfad-v10.webp` | erfüllt   | v10-Assets liegen vor und ersetzen die produktiven v9-Referenzen.        |
| `wenn-worte-treffen`       | `/infografiken/manus-wenn-worte-treffen-v2.pdf`, `/infografiken/manus-wenn-worte-treffen-v2.webp`, `/infografiken/extras/thumbnails/manus-wenn-worte-treffen-v2.webp`                                     | erfüllt   | v2-Assets liegen vor und ersetzen die produktiven v1-Referenzen.         |
| `pause-statt-streit`       | `/infografiken/manus-pause-statt-streit-v2.pdf`, `/infografiken/manus-pause-statt-streit-v2.webp`, `/infografiken/extras/thumbnails/manus-pause-statt-streit-v2.webp`                                     | erfüllt   | v2-Assets liegen vor und ersetzen die produktiven v1-Referenzen.         |
| `grenzen-ohne-eskalation`  | `/infografiken/manus-grenzen-ohne-eskalation-v2.pdf`, `/infografiken/manus-grenzen-ohne-eskalation-v2.webp`, `/infografiken/extras/thumbnails/manus-grenzen-ohne-eskalation-v2.webp`                      | erfüllt   | v2-Assets liegen vor und ersetzen die produktiven v1-Referenzen.         |
| `spiegeln-statt-aufsaugen` | `/infografiken/manus-spiegeln-statt-aufsaugen-v2.pdf`, `/infografiken/manus-spiegeln-statt-aufsaugen-v2.webp`, `/infografiken/extras/thumbnails/manus-spiegeln-statt-aufsaugen-v2.webp`                   | erfüllt   | v2-Assets liegen vor und ersetzen die produktiven v1-Referenzen.         |
| `rolle-klaeren`            | `/infografiken/manus-rolle-klaeren-v2.pdf`, `/infografiken/manus-rolle-klaeren-v2.webp`, `/infografiken/extras/thumbnails/manus-rolle-klaeren-v2.webp`                                                    | erfüllt   | v2-Assets liegen vor und ersetzen die produktiven Sphären-v3-Referenzen. |
| `warnsignale`              | `/infografiken/manus-warnsignale-v2.pdf`, `/infografiken/manus-warnsignale-v2.webp`, `/infografiken/extras/thumbnails/manus-warnsignale-v2.webp`                                                          | erfüllt   | v2-Assets liegen vor und ersetzen die produktiven v1-Referenzen.         |
| `eisberg`                  | `/infografiken/eisberg-der-eisberg-v7.pdf`, `/infografiken/eisberg-der-eisberg-v7.webp`, `/infografiken/extras/thumbnails/eisberg-der-eisberg-v7.webp`                                                    | erfüllt   | v7-Assets liegen vor und ersetzen die produktiven v6-Referenzen.         |
| `spaltung`                 | `/infografiken/pendel-das-bewertungs-pendel-v15.pdf`, `/infografiken/pendel-das-bewertungs-pendel-v15.webp`, `/infografiken/extras/thumbnails/pendel-das-bewertungs-pendel-v15.webp`                      | erfüllt   | v15-Assets liegen vor und ersetzen die produktiven v14-Referenzen.       |

## P0: Sicherheits- und Kriseninhalte

Diese Assets zuerst öffnen, gegen die Web-Textversion vergleichen und bei Abweichung neu exportieren.

| ID                  | PDF                          | WebP/Preview                          | Möglicher Drift                                                                                                                                                             |
| ------------------- | ---------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `notfallplan-krise` | `/notfallplan-krise-v03.pdf` | `/notfallplan-krise-v03-preview.webp` | Textversion trennt jetzt 144, 117, PUK 058er-Nummern, 143 und Selbstschutz-Caveat klarer. PDF kann eine ältere Hierarchie oder weniger präzise Selbstschutzlogik enthalten. |

## P1: Fachliche Kernaussagen

Diese Assets vor einer aktiven Bewerbung oder Neuverlinkung als fachlich autoritatives PDF prüfen.

| ID                       | PDF                                                        | WebP/Preview                                                | Möglicher Drift                                                                                                                      |
| ------------------------ | ---------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `genesung-zahlen`        | `/infografiken/manus-genesung-zahlen-v1.pdf`               | `/infografiken/manus-genesung-zahlen-v1.webp`               | Textversion kontextualisiert Prozentzahlen stärker, trennt Remission/Recovery und vermeidet isolierte Prognosewirkung.               |
| `alarm-modus`            | `/infografiken/alarm-der-alarm-modus-v3.pdf`               | `/infografiken/alarm-der-alarm-modus-v3.webp`               | Textversion entschärft harte Neuro-/Polyvagal-Sprache zugunsten von Stress- und Emotionsregulationssprache.                          |
| `gehirn`                 | `/infografiken/manus-gehirn-v1.pdf`                        | `/infografiken/manus-gehirn-v1.webp`                        | Textversion vermeidet deterministische Gehirnregionen-Aussagen und nutzt alltagsnähere Stresssprache.                                |
| `radikale-akzeptanz`     | `/infografiken/manus-radikale-akzeptanz-v1.pdf`            | `/infografiken/manus-radikale-akzeptanz-v1.webp`            | Textversion stellt klar: Akzeptanz heisst nicht gutheissen, bleiben, schweigen oder Gewalt tolerieren.                               |
| `dear`                   | `/infografiken/manus-dear-v1.pdf`                          | `/infografiken/manus-dear-v1.webp`                          | Textversion erklärt DEAR als Struktur ohne Wirksamkeitsgarantie und nimmt Sicherheitsfälle aus.                                      |
| `gespraeche-kippen`      | `/infografiken/manus-gespraeche-kippen-v1.pdf`             | `/infografiken/manus-gespraeche-kippen-v1.webp`             | Textversion ergänzt Sicherheitshinweis bei Bedrohung, Gewalt oder akuter Selbstgefährdung.                                           |
| `beispiel-dialog`        | `/infografiken/manus-beispiel-dialog-v1.pdf`               | `/infografiken/manus-beispiel-dialog-v1.webp`               | Textversion betont: Beispiel nicht als einzig richtige Sprache verstehen; bei Gefahr Dialog abbrechen und Hilfe holen.               |
| `kinder`                 | `/infografiken/manus-kinder-v1.pdf`                        | `/infografiken/manus-kinder-v1.webp`                        | Textversion ergänzt Schutzverantwortung der Erwachsenen und fachliche Hilfe, wenn Kinder Angst/Gewalt/Überverantwortung erleben.     |
| `im-krisenmodus`         | `/infografiken/ampel-das-ampel-system-v3.pdf`              | `/infografiken/ampel-das-ampel-system-v3.webp`              | Textversion präzisiert Ampellogik: Rot = Einsatzdienst/akute Gefahr, Gelb = psychiatrische Notfallhilfe, Grün = Entlastung/Gespräch. |
| `remission-heilung`      | `/infografiken/manus-remission-heilung-v1.pdf`             | `/infografiken/manus-remission-heilung-v1.webp`             | Textversion unterscheidet Remission, Recovery und Heilung vorsichtiger und vermeidet Heilsversprechen.                               |
| `fortschritt-paradox`    | `/infografiken/fortschritt-das-fortschritt-paradox-v4.pdf` | `/infografiken/fortschritt-das-fortschritt-paradox-v4.webp` | Textversion formuliert Rückschritte als mögliches, aber ernst zu nehmendes Veränderungselement ohne Beschönigung.                    |
| `5-faktoren-genesung`    | `/infografiken/manus-5-faktoren-genesung-v1.pdf`           | `/infografiken/manus-5-faktoren-genesung-v1.webp`           | Textversion vermeidet Kausalitäts-/Garantieformulierung und betont individuelle, nichtlineare Genesung.                              |
| `rolle-genesungsprozess` | `/infografiken/manus-rolle-genesungsprozess-v1.pdf`        | `/infografiken/manus-rolle-genesungsprozess-v1.webp`        | Textversion entlastet Angehörige stärker: Sie können Rahmen und Beziehung mitgestalten, Genesung aber nicht machen.                  |

## P2: Tonalität, Caveats und Überverantwortung

Diese Assets sollten im nächsten Design-/Asset-Pass mitgezogen werden, damit die PDF/WebP-Ebene dieselbe entlastende Sprache spricht wie die Web-Textversion.

| ID                       | PDF                                                    | WebP/Preview                                            | Möglicher Drift                                                                                                    |
| ------------------------ | ------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `leuchtturm`             | `/infografiken/manus-leuchtturm-v1.pdf`                | `/infografiken/manus-leuchtturm-v1.webp`                | Textversion ergänzt: Auch ein Leuchtturm braucht Wartung; Angehörige dürfen Hilfe und Pausen brauchen.             |
| `drei-saeulen`           | `/infografiken/manus-drei-saeulen-v1.pdf`              | `/infografiken/manus-drei-saeulen-v1.webp`              | Textversion ergänzt Tragbarkeit für Angehörige und vermeidet Stabilitäts-Überverantwortung.                        |
| `konsistenz-prinzip`     | `/infografiken/manus-konsistenz-prinzip-v1.pdf`        | `/infografiken/manus-konsistenz-prinzip-v1.webp`        | Textversion grenzt Konsistenz von Starrheit ab und erlaubt in Gefahr/Krise Hilfe statt Regel-Treue.                |
| `beziehungs-achtsamkeit` | `/infografiken/manus-beziehungs-achtsamkeit-v1.pdf`    | `/infografiken/manus-beziehungs-achtsamkeit-v1.webp`    | Textversion betont eigene Warnsignale und vermeidet dauernde Selbstkontrolle.                                      |
| `6-leitlinien`           | `/infografiken/manus-6-leitlinien-v1.pdf`              | `/infografiken/manus-6-leitlinien-v1.webp`              | Textversion entschärft Pflicht-/Muss-Ton und stärkt Selbstschutz als Leitlinie.                                    |
| `4-alltags-tipps`        | `/infografiken/manus-4-alltags-tipps-v1.pdf`           | `/infografiken/manus-4-alltags-tipps-v1.webp`           | Textversion macht klar: Alltagstipps gelten nicht als Krisenintervention.                                          |
| `sauerstoffmaske`        | `/infografiken/sauerstoff-die-sauerstoffmaske-v4.pdf`  | `/infografiken/sauerstoff-die-sauerstoffmaske-v4.webp`  | Textversion entlastet stärker: Auch kleine Entlastungen zählen; keine Beschämung, wenn Selbstfürsorge schwerfällt. |
| `stopp-technik`          | `/infografiken/manus-stopp-technik-v1.pdf`             | `/infografiken/manus-stopp-technik-v1.webp`             | Textversion ordnet STOPP als Skill für ansprechbare Situationen ein, nicht als Notfalllösung.                      |
| `energie-konto`          | `/infografiken/manus-energie-konto-v1.pdf`             | `/infografiken/manus-energie-konto-v1.webp`             | Textversion betont Selbstbeobachtung statt Messinstrument oder perfekter Bilanz.                                   |
| `erlaubnis-karte`        | `/infografiken/manus-erlaubnis-karte-v1.pdf`           | `/infografiken/manus-erlaubnis-karte-v1.webp`           | Textversion ergänzt Sicherheitscaveat: Pausen sind erlaubt, bei akuter Gefahr aber Hilfe holen.                    |
| `schuld-verantwortung`   | `/infografiken/manus-schuld-verantwortung-v1.pdf`      | `/infografiken/manus-schuld-verantwortung-v1.webp`      | Textversion trennt Schuld, Verhalten, Grenzen und Selbstschutz deutlicher.                                         |
| `4-arten-von-grenzen`    | `/infografiken/grenzen-die-4-arten-von-grenzen-v4.pdf` | `/infografiken/grenzen-die-4-arten-von-grenzen-v4.webp` | Textversion ergänzt konkrete Alltagssätze und priorisiert körperliche Sicherheit.                                  |
| `grenzen-erkennen`       | `/infografiken/manus-grenzen-erkennen-v1.pdf`          | `/infografiken/manus-grenzen-erkennen-v1.webp`          | Textversion entlastet bei Erschöpfung und markiert Warnsignale als Hinweise, nicht Diagnose.                       |
| `lmk`                    | `/infografiken/manus-lmk-v1.pdf`                       | `/infografiken/manus-lmk-v1.webp`                       | Textversion erklärt LMK deutlicher und ergänzt Sicherheitshinweis bei Gewalt/Bedrohung.                            |
| `grenzen-spickzettel`    | `/infografiken/manus-grenzen-spickzettel-v1.pdf`       | `/infografiken/manus-grenzen-spickzettel-v1.webp`       | Textversion ergänzt realistisch haltbare Grenzen und nimmt Gewalt/Bedrohung aus Gesprächsformeln aus.              |

## Nicht als Drift-Blocker markiert

| ID                     | Grund                                                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `4-phasen`             | In der letzten Content-Härtung wurde keine spezifische Textversionsänderung markiert. Das Asset bleibt trotzdem Teil des normalen PDF-/Textversion-Fidelity-Audits. |
| `notfallkarte-zuerich` | Kein `HANDOUT_TEXT_VERSION_IDS`-Eintrag. Die Notfallkarte hat eigene HTML/PDF-Sync- und Kontaktprüfungen.                                                           |

## Operative Reexport-Regeln

1. Für jedes P0-Asset zuerst die PDF-Datei und das WebP öffnen und gegen die Web-Textversion unter `/materialien/text/:id` vergleichen.
2. Wenn Text im PDF/WebP abweicht: nicht im flachen PDF punktuell patchen, sondern aus editierbarer Quelle neu exportieren.
3. Bei Versionssprung neue Assetnamen verwenden oder das bestehende Versionierungsmodell bewusst aktualisieren.
4. Danach Referenzen in `client/src/content/*.ts`, `client/src/content/materialien.ts` und ggf. `client/src/content/homeFeaturedInfografiken.ts` aktualisieren.
5. Nach Asset-Austausch ausführen:
   - `pnpm test`
   - `pnpm build`
   - `pnpm audit:release-http-gates`

## Nächster sinnvoller Schritt

Für einen kleinen, sicheren Folge-PR zuerst nur die P0-Gruppe behandeln:

1. `notfallplan-krise`
2. `zuhoeren-ohne-zustimmen`, `krisenkommunikation`, `wenn-worte-treffen` und `pause-statt-streit` im normalen Fidelity-Audit prüfen, aber die Asset-Blocker sind geschlossen
