# Ergänzender Kontaktabgleich vom 06.10.2026

Geprüft wurde das zentrale Register `client/src/data/kontakte.ts` auf Basis von
`a56ed27`. Es enthält **26** Telefonkontakte: 11 Nummernabgleiche waren bereits
dokumentiert, 15 waren offen. Die frühere Inventarangabe von 27 war ein Zählfehler.

Dieser Durchlauf bestätigt sechs weitere veröffentlichte Nummern anhand direkt
gelesener offizieller Primärseiten. Damit sind **17 Nummernabgleiche dokumentiert,
neun weiterhin offen**. Alle namentlichen fachlichen Zuständigkeiten bleiben
`null`. Telefonnummern und `tel`-Werte wurden unverändert belassen.

## Neue Belege

Alle folgenden Quellen antworteten am 06.10.2026 mit HTTP 200. Der Prüfstatus
`number-confirmed` bestätigt die veröffentlichte Nummer innerhalb des jeweils
dokumentierten Umfangs. Er ist keine Bestätigung der tatsächlichen Erreichbarkeit,
keine fachliche oder institutionelle Freigabe und keine Prüfung aller Angaben
zum Dienst.

| Kontakt-ID                  | Nummer        | Primärquelle und Fundstelle                                                                                                                                                                                                                                              |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ROT_144`                   | 144           | [ch.ch: Gefahren und Notfälle](https://www.ch.ch/de/sicherheit-und-recht/gefahren-und-notfalle/), «Weitere Notfallnummern»: «Ambulanz 144».                                                                                                                              |
| `ROT_117`                   | 117           | [ch.ch: Gefahren und Notfälle](https://www.ch.ch/de/sicherheit-und-recht/gefahren-und-notfalle/), «Weitere Notfallnummern»: «Polizei 117».                                                                                                                               |
| `ROT_112`                   | 112           | [ch.ch: Gefahren und Notfälle](https://www.ch.ch/de/sicherheit-und-recht/gefahren-und-notfalle/), «Schweizer Notfallnummern»: 112 als allgemeine Notrufnummer mit Verbindung zur Alarmzentrale der Polizei. SIM-Voraussetzungen wurden nicht als verifiziert übernommen. |
| `GRUEN_ELTERN`              | 0848 35 45 55 | [Elternnotruf](https://www.elternnotruf.ch/), «Rufen Sie uns an» und «Direkt anrufen».                                                                                                                                                                                   |
| `INFO_OPFERHILFE_ZH_24_7`   | 044 455 21 42 | [Kanton Zürich: Notfall & Rettung](https://www.zh.ch/de/gesundheit/notfall-rettung.html), Abschnitt «Opfer von Gewalt», Link «Dringende Hilfe: 24/7-Telefon» mit Ziel `tel:0444552142`. Die Nummer steht im Linkziel, nicht im sichtbaren Linktext.                      |
| `INFO_SANATORIUM_KILCHBERG` | 044 716 42 42 | [Sanatorium Kilchberg: Kontakt](https://www.sanatorium-kilchberg.ch/kontakt/), «Empfang 044 716 42 42». Die gesonderte Triage-Nummer auf der Seite wird damit nicht als identisch ausgegeben.                                                                            |

Öffnungszeiten, Altersgrenzen, Einzugsgebiete, Kosten, Therapieangebote und
Zugangsbedingungen wurden in diesem Durchlauf nicht als verifiziert übernommen.
Es wurden keine Testanrufe durchgeführt.

## Weiter offene Nachweise

| Kontakt-ID           | Registerwert  | Ergebnis und Grund                                                                                 |
| -------------------- | ------------- | -------------------------------------------------------------------------------------------------- |
| `GELB_PUK_KJP`       | 058 384 66 66 | PUK-Primärseiten nicht unabhängig lesbar; `pending`.                                               |
| `GELB_PUK_ERW`       | 058 384 20 00 | PUK-Primärseiten nicht unabhängig lesbar; `pending`.                                               |
| `GELB_PUK_65`        | 058 384 46 82 | PUK-Primärseiten nicht unabhängig lesbar; `pending`.                                               |
| `INFO_KIZ`           | 058 384 65 00 | PUK-Primärseite nicht lesbar; zusätzlich abweichende Nummer auf der kantonalen Seite, siehe unten. |
| `INFO_PUK_ZENTRALE`  | 058 384 21 11 | PUK-Primärseiten nicht unabhängig lesbar; `pending`.                                               |
| `INFO_PUK_KJPP_HYPE` | 058 384 66 00 | PUK-KJPP-Primärseite nicht unabhängig lesbar; `pending`.                                           |
| `INFO_FACHSTELLE`    | 058 384 38 00 | PUK-Primärseiten nicht unabhängig lesbar; `pending`.                                               |
| `INFO_PUK_DBT`       | 058 384 94 91 | PUK-Primärseiten nicht unabhängig lesbar; `pending`.                                               |
| `INFO_IPW`           | 052 264 34 00 | IPW-Primärseite nicht unabhängig lesbar; `pending`.                                                |

Direkt getestete Abrufe mit **HTTP 403**:

- <https://www.pukzh.ch/>
- <https://www.pukzh.ch/unsere-angebote/kinder-und-jugendpsychiatrie/behandlungsschwerpunkte/persoenlichkeitsstoerungen/>
- <https://www.ipw.ch/>

Die acht PUK-Nummern bleiben ohne aktuell lesbaren Primärbeleg offen; es wurden
keine erfolgreichen Abrufe weiterer PUK-Unterseiten behauptet. Ein zusätzlicher
Abruf der BAKOM-Kurznummernseite unter
<https://www.bakom.admin.ch/bakom/de/home/telekommunikation/nummerierung-telefonie/nummerierung/kurznummern.html>
antwortete mit HTTP 503. Für die allgemeinen Notrufnummern wurde deshalb die
erfolgreich direkt gelesene Behördenquelle ch.ch verwendet. Proxy und
TLS-Prüfung blieben erhalten; die Zugriffsausfälle wurden nicht umgangen.

### KIZ-Quellenkonflikt

Die aktuell direkt gelesene
[kantonale Notfallübersicht](https://www.zh.ch/de/gesundheit/notfall-rettung.html)
nennt «Kriseninterventionszentrum Zürich (KIZ) 044 296 73 10». Im Register steht
`058 384 65 00`; die historische Governance-Dokumentation beschreibt bereits
abweichende PUK- und Kantonsangaben und eine PUK-Durchwahl.

Der aktuelle Abruf löst diesen Konflikt nicht. Es wurde weder eine Nummer ersetzt
noch eine der Angaben als aktuell kanonisch freigegeben. Der Abgleich von
Nummer, Durchwahl und Zuständigkeit muss anhand eines lesbaren aktuellen
PUK-Belegs oder durch eine verantwortliche Fachperson geklärt werden.

Bis zu dieser Klärung zeigt die öffentliche statische Soforthilfe beim KIZ
«Telefonangabe derzeit nicht geklärt» und verweist auf die offizielle kantonale
Notfallübersicht. Der direkte KIZ-Telefonlink ist zurückgehalten; keine der beiden
konkurrierenden Nummern wurde als Ersatz veröffentlicht. Registerwert und
historische Dokumentation bleiben unverändert. Die sichtbare Quellenübersicht
nennt zusätzlich ch.ch und den auf die veröffentlichten Nummern 144/117/112
begrenzten Abgleich vom 06.10.2026.

## Gemeinsames Fachstellenprofil

Die Fachstellenansicht, die Beratungsübersicht und die zugehörigen Hinweise in
Diagnostik und Selbstfürsorge verwenden nun dasselbe Profil mit den bisher
erfassten Telefon-, E-Mail-, Adress- und Anbieterangaben. Diese Werte wurden nicht
als neu bestätigt ausgegeben. Der offene aktuelle Abgleich der Kontaktangaben
und Angebotsbedingungen ist sichtbar; Zugang, Kosten, Termin und Umgang mit
vertraulichen Informationen werden als Fragen an den Anbieter formuliert.
Unbestätigte Zusagen zu Kostenfreiheit, Vollmacht und PUK-unabhängigem Zugang
werden damit nicht als aktuelle Leistungsgarantie weitergeführt. Der gemeinsame
Profilstatus bleibt `pending`, Prüfdatum und verantwortliche Fachperson bleiben
`null`.
