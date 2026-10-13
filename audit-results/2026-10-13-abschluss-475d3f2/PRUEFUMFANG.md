# Prüfumfang Audit 06

Audit 06 wurde auf dem fixierten Korrekturcommit `475d3f2e29b595c9614cdd208c25bec0a98a5777` durchgeführt. Der zugehörige PR #672 besitzt ein erfolgreiches Netlify Deploy Preview sowie bestandene GitHub-, Header- und Redirect-Checks. Der echte PR-Preview antwortet ausserhalb des Netlify-Teamzugangs mit HTTP 401 und wurde nicht umgangen.

Für tatsächliche Browserinteraktionen wurde zusätzlich ein temporärer, passwortgeschützter Netlify-Draft aus dem sauberen `site/`-Artefakt desselben Commits erstellt. Die Zugangsdaten sind nicht Bestandteil der Auditdateien. Anonyme Drafts übernehmen keine projektspezifischen Header-/Redirectregeln; diese wurden deshalb getrennt über den echten PR-Check und lokal reproduzierbare Regeln bewertet.

Geprüft: alle 22 Seiten, fünf Breiten, 100/200 Prozent Text, natürliche Suche, sechs Nutzerreisen, No-JS, Tastaturbasis, 404, Produktionsgate, Buildparität, geänderte Quellen, visuelle Regressionen, Drucknachweise und alle früheren P1/P2-IDs.

Nicht geprüft: reale Screenreader und Geräte, Firefox/Safari, Windows-Hochkontrast, physischer Druck, Nutzendentests und interne Rechts-/Datenschutzfreigabe. Produktion blieb auf r4-18.
