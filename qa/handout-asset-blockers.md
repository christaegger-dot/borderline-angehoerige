# Handout Asset Blocker Report

Stand: 2026-06-02  
Basis: `main` nach dem Handout-Governance-PR  
Quelle der Wahrheit: `client/src/content/handoutGovernance.ts`

## Zweck

Dieser Report zeigt, welche Handout-Assets auf der gerenderten PDF-/WebP-Ebene
noch einen Reexport- oder Fidelity-Review brauchen können. Seit dem
Handout-Governance-PR ist nicht mehr die höchste vorhandene Datei automatisch
produktiv, sondern die pro Handout freigegebene `approvedVersion`.

Wichtig: Dieser Report ersetzt keine visuelle PDF-Prüfung und keine
fachliche Schlussfreigabe. Er ist ein Arbeitsraster für die Design-/Asset-Ebene.

## Kurzurteil

Die frühere Versionsdrift im produktiven Register ist technisch geschlossen:

- Jedes Handout hat einen Dokumenttyp und eine `approvedVersion`.
- Produktive PDF-Quellen müssen per Test exakt auf diese `approvedVersion`
  zeigen.
- Orientierungs- und Praxisblätter dürfen keine Krisennummern tragen.
- Orientierungs- und Praxisblätter müssen den Standard-Disclaimer enthalten.

Offen bleibt die eigentliche Asset-Fidelity: flach gerenderte PDFs/WebPs können
fachlich oder sprachlich älter sein als die Web-Textversion. Genau diese
verbleibenden Kandidaten sind unten priorisiert.

## Legende

| Stufe    | Bedeutung                                                                                                      | Release-Entscheid                                                         |
| -------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| P0       | Sicherheits-, Krisen-, Telefonnummern- oder Suizid-/Gewaltlogik kann im PDF/WebP veraltet sein.                | Vor formaler Veröffentlichung des Assets prüfen und ggf. neu exportieren. |
| P1       | Fachliche Kernaussage, Quellenlogik oder Prognose-/Neuro-/DBT-Formulierung kann von der Textversion abweichen. | Vor aktiver Bewerbung des Assets prüfen und bei Drift neu exportieren.    |
| P2       | Tonalitäts-, Entlastungs-, Caveat- oder Überverantwortungspräzisierung kann fehlen.                            | In den nächsten Asset-Pass aufnehmen.                                     |
| Approved | Produktive Register zeigen auf die aktuell freigegebene `approvedVersion`.                                     | Kein Versionsblocker; bleibt Teil des normalen Fidelity-Audits.           |

## Aktuell freigegebene neue Asset-Versionen

Diese Einträge waren im alten Report veraltet oder noch als ältere Versionen
dokumentiert. Sie sind jetzt mit der Governance synchronisiert.

| ID                         | Dokumenttyp          | Freigegebene Version                      | Status   |
| -------------------------- | -------------------- | ----------------------------------------- | -------- |
| `zuhoeren-ohne-zustimmen`  | `PRAXISBLATT`        | `validierung-die-validierungs-treppe-v10` | approved |
| `krisenkommunikation`      | `KRISEN-HANDOUT`     | `deeskalation-der-deeskalations-pfad-v11` | approved |
| `wenn-worte-treffen`       | `PRAXISBLATT`        | `manus-wenn-worte-treffen-v3`             | approved |
| `pause-statt-streit`       | `PRAXISBLATT`        | `manus-pause-statt-streit-v3`             | approved |
| `grenzen-ohne-eskalation`  | `PRAXISBLATT`        | `manus-grenzen-ohne-eskalation-v3`        | approved |
| `spiegeln-statt-aufsaugen` | `PRAXISBLATT`        | `manus-spiegeln-statt-aufsaugen-v3`       | approved |
| `rolle-klaeren`            | `ORIENTIERUNGSBLATT` | `manus-rolle-klaeren-v3`                  | approved |
| `warnsignale`              | `ORIENTIERUNGSBLATT` | `manus-warnsignale-v3`                    | approved |
| `eisberg`                  | `ORIENTIERUNGSBLATT` | `eisberg-der-eisberg-v8`                  | approved |
| `spaltung`                 | `ORIENTIERUNGSBLATT` | `pendel-das-bewertungs-pendel-v16`        | approved |
| `schuld-verantwortung`     | `ORIENTIERUNGSBLATT` | `manus-schuld-verantwortung-v3`           | approved |
| `bruecke-gelaender`        | `ORIENTIERUNGSBLATT` | `manus-bruecke-gelaender-v2`              | approved |
| `anspannungskurve`         | `ORIENTIERUNGSBLATT` | `manus-anspannungskurve-v2`               | approved |
| `garten`                   | `ORIENTIERUNGSBLATT` | `manus-garten-v2`                         | approved |
| `im-krisenmodus`           | `KRISEN-HANDOUT`     | `ampel-das-ampel-system-v4`               | approved |
| `sauerstoffmaske`          | `ORIENTIERUNGSBLATT` | `sauerstoff-die-sauerstoffmaske-v5`       | approved |
| `fortschritt-paradox`      | `ORIENTIERUNGSBLATT` | `fortschritt-das-fortschritt-paradox-v5`  | approved |
| `4-arten-von-grenzen`      | `ORIENTIERUNGSBLATT` | `grenzen-die-4-arten-von-grenzen-v5`      | approved |
| `grenzen-spickzettel`      | `PRAXISBLATT`        | `manus-grenzen-spickzettel-v2`            | approved |

## P0: Sicherheits- und Kriseninhalte

Diese Assets zuerst öffnen, gegen die Web-Textversion vergleichen und bei
Abweichung neu exportieren.

| ID                  | Freigegebene Version    | Asset                                                                  | Möglicher Drift                                                                                                                                      |
| ------------------- | ----------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `notfallplan-krise` | `notfallplan-krise-v03` | `/notfallplan-krise-v03.pdf` und `/notfallplan-krise-v03-preview.webp` | **Drift bestätigt am 2026-06-02.** PDF/WebP enthalten ältere Selbstschutz- und Kurzreferenzlogik. Details: `qa/notfallplan-krise-fidelity-audit.md`. |

## P1: Fachliche Kernaussagen

Diese Assets vor aktiver Bewerbung oder Neuverlinkung als fachlich autoritatives
PDF prüfen.

| ID                       | Dokumenttyp          | Freigegebene Version              | Möglicher Drift                                                                                                                        |
| ------------------------ | -------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `genesung-zahlen`        | `ORIENTIERUNGSBLATT` | `manus-genesung-zahlen-v1`        | Textversion kontextualisiert Prozentzahlen stärker, trennt Remission/Recovery und vermeidet isolierte Prognosewirkung.                 |
| `gehirn`                 | `ORIENTIERUNGSBLATT` | `manus-gehirn-v1`                 | Textversion vermeidet deterministische Gehirnregionen-Aussagen und nutzt alltagsnähere Stresssprache.                                  |
| `radikale-akzeptanz`     | `PRAXISBLATT`        | `manus-radikale-akzeptanz-v1`     | Textversion stellt klar: Akzeptanz heisst nicht gutheissen, bleiben, schweigen oder Gewalt tolerieren.                                 |
| `dear`                   | `PRAXISBLATT`        | `manus-dear-v1`                   | Textversion erklärt DEAR als Struktur ohne Wirksamkeitsgarantie und nimmt Sicherheitsfälle aus.                                        |
| `gespraeche-kippen`      | `PRAXISBLATT`        | `manus-gespraeche-kippen-v1`      | Textversion ergänzt die Abgrenzung: bei Bedrohung, Gewalt oder akuter Selbstgefährdung nicht weiterdiskutieren, sondern Hilfe holen.   |
| `beispiel-dialog`        | `PRAXISBLATT`        | `manus-beispiel-dialog-v1`        | Textversion betont: Beispiel nicht als einzig richtige Sprache verstehen; bei Gefahr Dialog abbrechen und Hilfe holen.                 |
| `kinder`                 | `ORIENTIERUNGSBLATT` | `manus-kinder-v1`                 | Textversion ergänzt Schutzverantwortung der Erwachsenen und fachliche Hilfe, wenn Kinder Angst, Gewalt oder Überverantwortung erleben. |
| `remission-heilung`      | `ORIENTIERUNGSBLATT` | `manus-remission-heilung-v1`      | Textversion unterscheidet Remission, Recovery und Heilung vorsichtiger und vermeidet Heilsversprechen.                                 |
| `5-faktoren-genesung`    | `ORIENTIERUNGSBLATT` | `manus-5-faktoren-genesung-v1`    | Textversion vermeidet Kausalitäts-/Garantieformulierung und betont individuelle, nichtlineare Genesung.                                |
| `rolle-genesungsprozess` | `ORIENTIERUNGSBLATT` | `manus-rolle-genesungsprozess-v1` | Textversion entlastet Angehörige stärker: Sie können Rahmen und Beziehung mitgestalten, Genesung aber nicht machen.                    |

## P2: Tonalität, Caveats und Überverantwortung

Diese Assets sollten im nächsten Design-/Asset-Pass mitgezogen werden, damit die
PDF/WebP-Ebene dieselbe entlastende Sprache spricht wie die Web-Textversion.

| ID                       | Dokumenttyp          | Freigegebene Version              | Möglicher Drift                                                                                        |
| ------------------------ | -------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `leuchtturm`             | `ORIENTIERUNGSBLATT` | `manus-leuchtturm-v1`             | Textversion ergänzt: Auch ein Leuchtturm braucht Wartung; Angehörige dürfen Hilfe und Pausen brauchen. |
| `drei-saeulen`           | `ORIENTIERUNGSBLATT` | `manus-drei-saeulen-v1`           | Textversion ergänzt Tragbarkeit für Angehörige und vermeidet Stabilitäts-Überverantwortung.            |
| `konsistenz-prinzip`     | `PRAXISBLATT`        | `manus-konsistenz-prinzip-v1`     | Textversion grenzt Konsistenz von Starrheit ab und erlaubt in Gefahr/Krise Hilfe statt Regel-Treue.    |
| `beziehungs-achtsamkeit` | `PRAXISBLATT`        | `manus-beziehungs-achtsamkeit-v1` | Textversion betont eigene Warnsignale und vermeidet dauernde Selbstkontrolle.                          |
| `6-leitlinien`           | `ORIENTIERUNGSBLATT` | `manus-6-leitlinien-v1`           | Textversion entschärft Pflicht-/Muss-Ton und stärkt Selbstschutz als Leitlinie.                        |
| `4-alltags-tipps`        | `PRAXISBLATT`        | `manus-4-alltags-tipps-v1`        | Textversion macht klar: Alltagstipps gelten nicht als Krisenintervention.                              |
| `stopp-technik`          | `PRAXISBLATT`        | `manus-stopp-technik-v1`          | Textversion ordnet STOPP als Skill für ansprechbare Situationen ein, nicht als Notfalllösung.          |
| `energie-konto`          | `PRAXISBLATT`        | `manus-energie-konto-v1`          | Textversion betont Selbstbeobachtung statt Messinstrument oder perfekter Bilanz.                       |
| `erlaubnis-karte`        | `PRAXISBLATT`        | `manus-erlaubnis-karte-v1`        | Textversion ergänzt Sicherheitscaveat: Pausen sind erlaubt, bei akuter Gefahr aber Hilfe holen.        |
| `grenzen-erkennen`       | `ORIENTIERUNGSBLATT` | `manus-grenzen-erkennen-v1`       | Textversion entlastet bei Erschöpfung und markiert Warnsignale als Hinweise, nicht Diagnose.           |
| `lmk`                    | `PRAXISBLATT`        | `manus-lmk-v1`                    | Textversion erklärt LMK deutlicher und ergänzt Sicherheitshinweis bei Gewalt/Bedrohung.                |

## Nicht als Drift-Blocker markiert

| ID                     | Grund                                                                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `notfallkarte-zuerich` | Kein `HANDOUT_TEXT_VERSION_IDS`-Eintrag. Die Notfallkarte hat eigene HTML/PDF-Sync- und Kontaktprüfungen.                                                   |
| `4-phasen`             | In den letzten Content-Härtungen wurde kein spezifischer Asset-Drift markiert. Bleibt Teil des normalen PDF-/Textversion-Fidelity-Audits.                   |
| `alarm-modus`          | Die produktive Quelle ist auf `alarm-der-alarm-modus-v4` gehoben. Aktuell kein eigener Asset-Blocker, aber weiterhin normaler Fidelity-Audit.               |
| `fortschritt-paradox`  | Die produktive Quelle ist auf `fortschritt-das-fortschritt-paradox-v5` gehoben. Aktuell kein eigener Asset-Blocker, aber weiterhin normaler Fidelity-Audit. |
| `sauerstoffmaske`      | Die produktive Quelle ist auf `sauerstoff-die-sauerstoffmaske-v5` gehoben. Aktuell kein eigener Asset-Blocker, aber weiterhin normaler Fidelity-Audit.      |

## Operative Reexport-Regeln

1. Für jedes P0-/P1-/P2-Asset zuerst PDF und WebP öffnen und gegen die
   Web-Textversion unter `/materialien/text/:id` vergleichen.
2. Wenn Text im PDF/WebP abweicht: nicht im flachen PDF punktuell patchen,
   sondern aus editierbarer Quelle neu exportieren.
3. Bei Versionssprung neue Assetnamen verwenden oder das bestehende
   Versionierungsmodell bewusst aktualisieren.
4. Danach `approvedVersion` in `client/src/content/handoutGovernance.ts` und
   die produktiven Referenzen in den Content-Registern aktualisieren.
5. Nach Asset-Austausch ausführen:
   - `pnpm test -- handout-governance`
   - `pnpm build`
   - `pnpm audit:release-http-gates`

## Nächster sinnvoller Schritt

Für einen kleinen, sicheren Folge-PR zuerst nur die P0-Gruppe behandeln:

1. `notfallplan-krise-v04` gemäss
   `qa/notfallplan-krise-v04-asset-brief.md` aus editierbarer Quelle
   exportieren.
2. Danach `approvedVersion`, Materialregister und Release-Gates aktualisieren.
