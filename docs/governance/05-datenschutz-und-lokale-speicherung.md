# Datenschutz und lokale Speicherung

## Grundsatz

Datenschutz ist Teil der Vertrauensbasis des Angebots. Besonders bei Hochrisiko-Seiten müssen Datennutzung, lokale Speicherung und externe Dienste klar, sparsam und verständlich geregelt sein.

## Analytics

- Keine stillschweigende Aktivierung von Tracking oder Analytics
- Externe Mess- oder Marketingdienste nur nach bewusster Entscheidung und mit konsistenter Datenschutzerklärung
- Wenn Analytics deaktiviert oder entfernt wurde, muss dies in Technik und Kommunikation übereinstimmen

## Lokale Speicherung

Lokale Speicherung im Browser ist nur dort zulässig, wo sie einen klaren Nutzwert hat und keine Serververarbeitung nötig ist.

Besonders relevant:

- persönliche Notfallkarte, falls das Werkzeug nach separater Prüfung
  veröffentlicht wird
- Theme- oder Komforteinstellungen

## Anforderungen an lokale Speicherung

- klarer Hinweis, wenn Daten auf dem Gerät bleiben
- keine irreführende Formulierung wie «bleibt bei Ihnen», wenn gemeinsam genutzte Geräte ein Risiko darstellen
- Möglichkeit, lokale Daten wieder zu löschen
- vorsichtiger Umgang mit gemeinsam genutzten Geräten

## Unveröffentlichtes Hochrisiko-Werkzeug Notfallkarte

`/notfallkarte/erstellen` bleibt gemäss
`12-krisenwege-und-soforthilfe-entscheid-2026-10-06.md` aus der öffentlichen
Produktionsauslieferung ausgeschlossen und gibt dort `404` zurück, bis eine
separate klinische, datenschutzrechtliche und nutzungsbezogene Prüfung
abgeschlossen ist. In einer geschützten Prüfumgebung darf es direkt erreichbar
sein. Es gibt keine bereits gespeicherten Krisenpläne, für die eine Migration
behauptet oder vorgesehen werden müsste.

Falls das Werkzeug später freigegeben wird, gilt zusätzlich:

- persönliche Einträge verlassen das Gerät nicht
- ein Löschpfad für lokale Daten muss vorhanden sein
- Druck- und PDF-Export dürfen nur die bewusst eingegebenen Inhalte ausgeben
- es ist klar, wem die Karte gehört und auf welche Person sich ein Eintrag
  bezieht
- Gesundheitsangaben, Behandlungsinformationen und persönliche Strategien
  einer anderen Person werden nach Möglichkeit gemeinsam und nur mit deren
  Einverständnis eingetragen
- gemeinsam genutzte Geräte, Ausdrucke und die Weitergabe einer Karte werden
  als eigenständige Vertraulichkeitsrisiken benannt
- Standardkontakte werden nicht als zweite, möglicherweise veraltete Kopie der
  zentralen Seite `/soforthilfe` geführt

## Release-Regel

Änderungen mit Datenschutzfolgen dürfen erst freigegeben werden, wenn:

- die Datenschutzerklärung weiterhin stimmt
- technische Speicherung zur sichtbaren Kommunikation passt
- bei Hochrisiko-Seiten ein Shared-Device-Risiko mitgedacht wurde
