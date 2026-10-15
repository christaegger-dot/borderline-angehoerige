"""Vorschläge der Freigabevorlage Release C (r4-29) als exakte Ersetzungen.

Aufruf:
  python3 audit-results/2026-10-15-release-c-r4-29/ersetzungen.py authoring/content [ID ...]   # wendet die genannten IDs an (ohne IDs: alle)
Jede Ersetzung muss im Ausgangstext genau einmal vorkommen.
"""
import sys, pathlib

P = {
 'F1': [('jugendliche.html',
   'Als Mutter oder Vater eines minderjährigen Kindes tragen Sie die elterliche Sorge: Sie bleiben für Sicherheit und Versorgung Ihres Kindes verantwortlich.',
   'Als Mutter oder Vater eines minderjährigen Kindes bleiben Sie für Sicherheit und Versorgung Ihres Kindes verantwortlich, meist gemeinsam im Rahmen der elterlichen Sorge.')],
 'F2': [('jugendliche.html',
   'Diagnostik und Behandlung gehören in die Hände von Fachpersonen; Schutz und Betreuung organisieren Sie als Eltern.</p>',
   'Diagnostik und Behandlung gehören in die Hände von Fachpersonen. Ist Ihr Kind für eine Behandlungsfrage nicht urteilsfähig, entscheiden Sie als Eltern über die Einwilligung.</p>')],
 'F3': [('fragen.html',
   '<p>Ob jemand eine Therapie beginnt, entscheidet die betroffene Person. Sie können',
   '<p>Ob jemand eine Therapie beginnt, entscheidet die betroffene Person, bei einem nicht urteilsfähigen Kind die Eltern. Sie können'),
  ('fragen.html',
   'Wie Sie die Fachstelle erreichen, steht auf der Seite «Unterstützung finden» im Abschnitt «<a class="puk-link--inline" href="unterstuetzung.html#beratung" aria-label="Beratung für Angehörige auf der Seite Unterstützung finden">Beratung für Angehörige</a>».</p>',
   'Mehr dazu: «Unterstützung finden» › «<a class="puk-link--inline" href="unterstuetzung.html#beratung" aria-label="Beratung für Angehörige auf der Seite Unterstützung finden">Beratung für Angehörige</a>».</p>'),
  ('behandlung.html',
   '<p>Ob jemand eine Therapie beginnt oder weiterführt, entscheidet die betroffene Person. Zwiespältige',
   '<p>Ob jemand eine Therapie beginnt oder weiterführt, entscheidet die betroffene Person, bei einem nicht urteilsfähigen Kind die Eltern. Zwiespältige')],
 'F4': [('grenzen.html',
   '<li>wenn die Person ihre Angelegenheiten wegen ihrer Erkrankung',
   '<li>wenn eine erwachsene Person ihre Angelegenheiten wegen ihrer Erkrankung'),
  ('grenzen.html',
   'akzeptieren Sie, dass Sie die Entscheidung nicht verhindern können.',
   'akzeptieren Sie, dass Sie die Entscheidung einer erwachsenen Person nicht verhindern können.'),
  ('grenzen.html',
   'klar geregelte Verfügungsrechte nötig sind; bei Unsicherheit fachliche Beratung nutzen</li>',
   'klar geregelte Verfügungsrechte nötig sind</li>')],
 'F5': [('jugendliche.html',
   '<strong>Schweizerisches Zivilgesetzbuch (ZGB, SR 210), Art. 14, 19c, 296 und 304</strong><span class="puk-longform__source-use">Verwendet in: «Ihre Rolle als Mutter oder Vater» (elterliche Sorge), «Vertraulichkeit und Auskunft, auch ab 18» (Volljährigkeit, Ende der elterlichen Sorge)</span>',
   '<strong>Schweizerisches Zivilgesetzbuch (ZGB, SR 210), Art. 14, 16, 19c, 296, 301, 302 und 304</strong><span class="puk-longform__source-use">Verwendet in: «Ihre Rolle als Mutter oder Vater» (elterliche Sorge, Pflege und Schutz, Einwilligung), «Vertraulichkeit und Auskunft, auch ab 18» (Urteilsfähigkeit, Volljährigkeit, Ende der elterlichen Sorge), «Grenzen im Familienalltag»</span>'),
  ('quellen.html',
   'nach Art. 296 Abs. 2 stehen Kinder, solange sie minderjährig sind, unter elterlicher Sorge.',
   'nach Art. 296 Abs. 2 stehen Kinder, solange sie minderjährig sind, unter der gemeinsamen elterlichen Sorge von Vater und Mutter; Ausnahmen regeln Art. 296 Abs. 3 und Art. 298 ff. Art. 301 und 302 beschreiben Pflege, Erziehung und Schutz des Kindes.')],
 'F6': [('krise.html',
   'Bleiben Sie bei der Person nur, soweit dies für Sie sicher möglich ist.',
   'Bleiben Sie bei der Person, soweit das für Sie sicher möglich ist.')],
 'F7': [('diagnose.html',
   'unabhängig von ihrer diagnostischen Zuordnung.',
   'unabhängig davon, welcher Diagnose man sie zuordnet.')],
 'F8': [('krise.html',
   'eine nächste Krise vorherzusagen oder rechtzeitig zu melden.</p>',
   'eine nächste Krise vorherzusagen.</p>')],
 'F9': [('kommunizieren.html',
   'wie lange oder wann Sie sprechen, wirken am besten, wenn',
   'wie lange oder wann Sie sprechen, helfen eher, wenn')],
 'F10': [('kommunizieren.html',
   '«Unser Termin wurde schon wieder kurzfristig geändert. Da verstehe ich deine Enttäuschung. Bei meinem Nein bleibe ich trotzdem.»',
   '«Unser Treffen wurde schon zweimal verschoben, da ist deine Enttäuschung verständlich. Heute Abend kann ich trotzdem nicht kommen.»')],
 'F11': [('behandlung.html',
   'ob eine Intervention nötig ist, beurteilen Fachpersonen.',
   'ob und welche Hilfe nötig ist, beurteilen Fachpersonen.')],
 'F12': [('krise.html',
   '<p>Die drei Stufen ergänzen Stelle 2 «Es wird eng» und Stelle 3 «Es ist gerade zu viel» der <a class="puk-link--inline" href="verstehen.html#anspannung" aria-label="Anspannungskurve auf der Seite Borderline verstehen">Anspannungskurve</a> auf der Seite «Borderline verstehen».',
   '<p>Die drei Stufen ergänzen die <a class="puk-link--inline" href="verstehen.html#anspannung" aria-label="Anspannungskurve auf der Seite Borderline verstehen">Anspannungskurve</a> auf der Seite «Borderline verstehen», vor allem Stelle 2 «Es wird eng» und Stelle 3 «Es ist gerade zu viel».')],
 'F13': [('beziehungen.html', 'id="verantwortung-title">Verstehen ist keine Pflicht, alles auszuhalten</h2>', 'id="verantwortung-title">Verstehen heisst nicht, alles auszuhalten</h2>'),
  ('beziehungen.html', '«Verstehen ist keine Pflicht, alles auszuhalten»', '«Verstehen heisst nicht, alles auszuhalten»', 'all'),
  ('quellen.html', '«Verstehen ist keine Pflicht, alles auszuhalten»', '«Verstehen heisst nicht, alles auszuhalten»', 'all')],
 'F14': [('unterstuetzung.html',
   'Die Beratung ist kostenlos, wird nicht an Krankenkassen weitergegeben und untersteht der Schweigepflicht.',
   'Die Beratung ist kostenlos; Angaben daraus gehen nicht an Krankenkassen, und sie untersteht der Schweigepflicht.')],  # Ausweichfassung, siehe FREIGABE.md
}

def apply(root, ids):
    root = pathlib.Path(root)
    for pid in ids:
        for entry in P[pid]:
            f, old, new = entry[:3]
            multi = len(entry) > 3
            p = root / f
            s = p.read_text(encoding='utf-8')
            n = s.count(old)
            if (multi and n < 1) or (not multi and n != 1):
                raise SystemExit(f'{pid} {f}: {n} Treffer für {old[:60]!r}')
            p.write_text(s.replace(old, new), encoding='utf-8')
        print('angewendet', pid)

if __name__ == '__main__':
    apply(sys.argv[1], sys.argv[2:] or list(P))
