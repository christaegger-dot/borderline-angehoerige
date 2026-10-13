# Prüfumfang Suchhotfix r4-20

Geprüft wurde Commit `6f3f5fa3caa39051e5fd9f9f652dd35430608e77` auf Branch `codex/search-safety-hotfix-2026-10-13`. Kanonische Quelle ist `authoring/`; `site/` wurde daraus neu erzeugt. Die Produktion blieb während des Delta-Tests auf r4-19.

Ausgeführt wurden Syntaxprüfung, Produktions-Build, Exportparität, Browserprüfung aller 22 Seiten, Laufzeit- und Ressourcenprüfung, 320-Pixel-Reflow, Tastaturbasis, No-JS-Fallback, Nulltreffer- und Leersuchzustand, 14 gezielte Safety-/Überlastungssuchen sowie ein Rankingvergleich von 36 Suchfragen zwischen r4-19 und r4-20.

Nicht ausgeführt wurden reale Screenreader-, Geräte-, Firefox-, Safari-, Windows-Hochkontrast- oder Nutzendentests. Das zugangsgeschützte Netlify-Preview wurde nicht umgangen. Ein Produktions-Smoke-Test von r4-20 ist erst nach Merge und Deployment möglich.
