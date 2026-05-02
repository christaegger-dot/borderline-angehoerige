import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("rolle-klaeren", {
    kicker: "Textversion",
    summary:
      "Sie können Orientierung, Hoffnung und klare Grenzen geben. Therapie ersetzen, Verhalten kontrollieren oder die Genesung tragen müssen Sie nicht.",
    intro: [
      "Rollenklarheit hilft, Unterstützung von Überverantwortung zu unterscheiden. Im Zentrum stehen drei Fragen: Was ist Ihr Beitrag, was ist nicht Ihre Aufgabe, und wann braucht es professionelle Hilfe?",
      "Das Handout hilft Angehörigen dabei, Unterstützung realistisch zu verstehen: zugewandt und stabil bleiben, ohne in Therapie, Kontrolle oder Selbstaufgabe abzurutschen.",
    ],
    sections: [
      {
        title: "Ihr Beitrag",
        intro:
          "Die linke Spalte des Handouts beschreibt, was Angehörige tatsächlich leisten können, ohne ihre Rolle zu überschreiten.",
        cards: [
          {
            title: "Verlässlicher Anker",
            text: "Berechenbar und stabil bleiben.",
          },
          {
            title: "Geduldige Begleitung",
            text: "Zuhören, ohne zu urteilen.",
          },
          {
            title: "Übungsbegleitung",
            text: "Neue Verhaltensweisen gemeinsam üben.",
          },
          {
            title: "Hoffnung geben",
            text: "Vermitteln, dass Besserung möglich ist.",
          },
          {
            title: "Grenzen halten",
            text: "Klar und konsequent bleiben.",
          },
        ],
      },
      {
        title: "Nicht Ihre Aufgabe",
        intro:
          "Die rechte Spalte grenzt bewusst ab, welche Rollen zwar verständlich erscheinen, aber Angehörige überfordern oder in problematische Dynamiken bringen.",
        cards: [
          {
            title: "Therapie übernehmen",
            text: "Die Therapie ersetzen oder kontrollieren.",
          },
          {
            title: "Retterrolle",
            text: "Alle Probleme lösen wollen.",
          },
          {
            title: "Kontrollinstanz",
            text: "Verhalten überwachen oder erzwingen.",
          },
          {
            title: "Sündenbock",
            text: "Schuld für alles übernehmen.",
          },
          {
            title: "Verantwortlich für Genesung",
            text: "Die Genesung liegt nicht in Ihrer Hand.",
          },
        ],
      },
      {
        title: "Professionelle Hilfe",
        calloutTitle: "Was Fachpersonen übernehmen",
        calloutText:
          "Therapie, Psychiatrie und Beratung – das ist Aufgabe der Fachpersonen.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es im Handout geht",
        calloutText:
          "Sie können unterstützen und Grenzen halten. Sie müssen nicht therapieren.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "Regelmässig prüfen",
            text: "Fragen Sie sich: Bin ich noch in meiner Rolle oder rutsche ich ab?",
          },
          {
            title: "Mit Fachpersonen sprechen",
            text: "Holen Sie sich Rücksprache, wenn Sie unsicher sind oder die Rollen verschwimmen.",
          },
          {
            title: "Sich erinnern",
            text: "Ihre Stabilität ist Ihr wichtigster Beitrag.",
          },
        ],
      },
      {
        title: "Legende der Grafik",
        bullets: [
          "Sage = Ihr Beitrag",
          "Terracotta = Nicht Ihre Aufgabe",
          "Slate = Professionelle Hilfe",
        ],
      },
    ],
    sourceLine:
      "Quelle: Gunderson et al., Family Guidelines; Mason & Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("im-krisenmodus", {
    kicker: "Textversion",
    summary:
      "In der Krise hilft weniger Logik, dafür mehr Ruhe, Präsenz und Orientierung. Ihre ruhige Haltung kann helfen, von Überforderung zu mehr Sicherheit zurückzufinden.",
    intro: [
      "Im Krisenmodus zählt weniger Erklärung und mehr Orientierung. Die Gegenüberstellung von Krise und beruhigtem Zustand zeigt, wie Ruhe und Präsenz wieder Handlungsspielraum öffnen können.",
      "Für Angehörige ist die Kernaussage klar: In akuter Überforderung bringt langes Erklären oft wenig. Wichtiger sind ein ruhiger Ton, Präsenz und das Verschieben schwieriger Diskussionen.",
    ],
    sections: [
      {
        title: "Von Krise zu Beruhigung",
        intro:
          "Die Infografik stellt zwei Zustände gegenüber und markiert den Übergang dazwischen.",
        cards: [
          {
            title: "Krise",
            text: "überwältigt, verängstigt, impulsiv",
          },
          {
            title: "Ihr Beitrag",
            text: "Ihre Ruhe + Präsenz",
          },
          {
            title: "Beruhigt",
            text: "orientiert, verbunden, sicherer",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es im Krisenmodus geht",
        calloutText:
          "In der Krise hilft weniger Logik – mehr Ruhe, Präsenz und Orientierung.",
      },
      {
        title: "Mini-Legende",
        bullets: [
          "Symbol = emotionaler Zustand",
          "Pfeil = Übergang durch Ihr Verhalten",
          "Herz = beruhigter Zustand",
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Atmen Sie durch",
            text: "Atmen Sie durch und sprechen Sie leise und langsam.",
          },
          {
            title: "2. Präsenzsatz sagen",
            text: "Sagen Sie einen Präsenzsatz: «Ich bin da. Wir schaffen das.»",
          },
          {
            title: "3. Diskussion verschieben",
            text: "Verschieben Sie Diskussionen: «Wir reden später – jetzt beruhigen wir uns.»",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Psychoedukation, Angehörigenarbeit (DBT-nah).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("drei-saeulen", {
    kicker: "Textversion",
    summary:
      "Präsenz, Stabilität und Grenze sind drei Säulen, die Angehörigen Halt geben und die Beziehung stärken. Hilfreiche Unterstützung braucht alle drei zusammen.",
    intro: [
      "Die drei Säulen beschreiben eine tragfähige Angehörigen-Haltung: Präsenz, Stabilität und Grenze. Sie geben Orientierung, wenn Unterstützung unübersichtlich wird.",
      "Die Grafik ist als praktische Orientierung gedacht: zugewandt bleiben, innerlich ruhig bleiben und gleichzeitig den eigenen Schutz nicht verlieren.",
    ],
    sections: [
      {
        title: "Die drei Säulen",
        intro:
          "Die Infografik beschreibt drei Haltungen, die sich ergänzen und zusammen tragfähige Unterstützung ermöglichen.",
        cards: [
          {
            title: "Präsenz – Ich bin da.",
            text: "Zugewandt und ansprechbar bleiben, ohne alles lösen zu müssen.",
          },
          {
            title: "Stabilität – Ich bleibe ruhig.",
            text: "Innerlich ruhiger und berechenbar bleiben, auch wenn es angespannt wird.",
          },
          {
            title: "Grenze – Ich schütze mich.",
            text: "Eigene Bedürfnisse ernst nehmen und Nein sagen können, wenn es nötig ist.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei den drei Säulen geht",
        calloutText:
          "Präsenz, Stabilität und Grenze – drei Säulen, die Angehörigen Halt geben und die Beziehung stärken.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Wählen",
            text: "Wählen Sie eine Säule, auf die Sie diese Woche besonders achten wollen.",
          },
          {
            title: "2. Üben",
            text: "Üben Sie sie bewusst in kleinen, alltäglichen Situationen.",
          },
          {
            title: "3. Reflektieren",
            text: "Fragen Sie sich am Abend: Welche Säule hat heute am meisten geholfen?",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Gunderson (2011).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("konsistenz-prinzip", {
    kicker: "Textversion",
    summary:
      "Wenn Angehörige ähnlich reagieren und gemeinsame Grenzen einhalten, entstehen mehr Sicherheit, Vertrauen und weniger Eskalationen.",
    intro: [
      "Das Konsistenz-Prinzip zeigt, wie ähnliche Reaktionen im Umfeld Sicherheit schaffen können. Es stellt einen hilfreichen und einen schwierigen Beziehungskreislauf gegenüber.",
      "Die Grundidee ist einfach: Gleiche Grenzen führen zu mehr Sicherheit. Widersprüchliche Reaktionen machen es leichter, Grenzen gegeneinander auszuspielen, und erhöhen Konflikte.",
    ],
    sections: [
      {
        title: "Zwei Kreisläufe im Vergleich",
        intro:
          "Die Infografik zeigt links einen hilfreichen Kreislauf und rechts einen schwierigen Kreislauf.",
        cards: [
          {
            title: "Konsistenz",
            text: "Vertrauen, weniger Ausspielen und ein hilfreicher Beziehungskreislauf.",
          },
          {
            title: "Gemeinsame Grenze",
            text: "Wenn Grenzen ähnlich formuliert und eingehalten werden, gibt es weniger Streit über die Grenze selbst.",
          },
          {
            title: "Inkonsistenz",
            text: "Widersprüchliche Reaktionen fördern Unsicherheit, Misstrauen und mehr Konflikte.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es beim Konsistenz-Prinzip geht",
        calloutText:
          "Wenn alle ähnlich reagieren, entsteht Sicherheit – und Eskalationen werden seltener.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Worum es bei Konsistenz wirklich geht",
        calloutText:
          "Nicht Härte macht den Unterschied, sondern Abstimmung: ähnliche Reaktionen, ähnliche Grenzen, weniger Ausspielen gegeneinander.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Kurze Absprachen",
            text: "Machen Sie kurze Absprachen: wer sagt was, wann Pause ist und welche Grenze gemeinsam gilt.",
          },
          {
            title: "2. Gemeinsam dranbleiben",
            text: "Wählen Sie ein oder zwei gemeinsame Grenzen und halten Sie sie möglichst gleich ein.",
          },
          {
            title: "3. Unterschiede privat besprechen",
            text: "Besprechen Sie Unterschiede privat – nicht im Streitmoment.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Familienleitlinien und Angehörigen-Psychoedukation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("beziehungs-achtsamkeit", {
    kicker: "Textversion",
    summary:
      "Innehalten, wahrnehmen, nicht bewerten und bewusst handeln helfen Angehörigen, aus dem Autopiloten auszusteigen und klarer zu reagieren.",
    intro: [
      "Beziehungs-Achtsamkeit übersetzt Achtsamkeit in vier konkrete Schritte für angespannte Beziehungssituationen: innehalten, wahrnehmen, nicht bewerten und bewusst handeln.",
      "Die Struktur ist bewusst alltagsnah: erst stoppen, dann wahrnehmen, nicht vorschnell bewerten und am Schluss bewusst einen nächsten Schritt wählen.",
    ],
    sections: [
      {
        title: "4 Schritte im Alltag",
        intro:
          "Die Grafik beschreibt eine Reihenfolge, die helfen soll, impulsive Reaktionen zu unterbrechen.",
        cards: [
          {
            title: "Innehalten",
            text: "Moment mal – Stopp.",
          },
          {
            title: "Wahrnehmen",
            text: "Was passiert gerade – in mir und im Gegenüber?",
          },
          {
            title: "Nicht bewerten",
            text: "Es ist, wie es ist. Eine Lösung muss nicht im selben Moment entstehen.",
          },
          {
            title: "Bewusst handeln",
            text: "Ich wähle bewusst: ein Satz, eine Grenze, eine Pause oder Hilfe.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es bei Beziehungs-Achtsamkeit geht",
        calloutText:
          "Innehalten – wahrnehmen – nicht bewerten – bewusst handeln.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Achtsamkeit als Reihenfolge",
        calloutText:
          "Die vier Schritte helfen vor allem deshalb, weil sie Tempo aus dem Autopiloten nehmen: erst stoppen, dann wahrnehmen, dann einordnen, dann handeln.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Täglich üben",
            text: "Üben Sie die ersten beiden Schritte täglich in kleinen Situationen.",
          },
          {
            title: "2. Als Anti-Streit-Regel nutzen",
            text: "Nutzen Sie Schritt 3 als Anti-Streit-Regel: nicht sofort bewerten und nicht sofort reagieren.",
          },
          {
            title: "3. Konkret entscheiden",
            text: "Machen Sie Schritt 4 konkret: ein Satz, eine Grenze oder ein nächster Schritt.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Achtsamkeitsbasierte Angehörigenarbeit, nach DBT (Linehan, 1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("6-leitlinien", {
    kicker: "Textversion",
    summary:
      "Sechs alltagsnahe Leitlinien helfen Angehörigen, ruhig, klar und gemeinsam zu unterstützen, ohne vorschnelle Erwartungen oder unnötige Eskalationen.",
    intro: [
      "Die sechs Leitlinien bündeln evidenzbasierte Empfehlungen nach Gunderson in konkrete Alltagshinweise. Sie helfen, Unterstützung klar, verlässlich und begrenzt zugleich zu gestalten.",
      "Die Aussagen bleiben bewusst praktisch: Erwartungen realistisch halten, Sicherheit fördern, zuhören, Selbstverletzung ernst nehmen, als Familie gemeinsam handeln und Grenzen durchhaltbar setzen.",
    ],
    sections: [
      {
        title: "Die 6 Leitlinien",
        intro:
          "Die Grafik zeigt sechs konkrete Empfehlungen, die Angehörige im Alltag Schritt für Schritt umsetzen können.",
        cards: [
          {
            title: "1. Veränderung braucht Zeit",
            text: "Halten Sie Erwartungen an schnelle Fortschritte bewusst realistisch.",
          },
          {
            title: "2. Ruhige Umgebung schaffen",
            text: "Routinen und Vorhersehbarkeit geben oft mehr Sicherheit als ständige neue Lösungen.",
          },
          {
            title: "3. Zuhören statt verteidigen",
            text: "Hören Sie zuerst zu, ohne sich sofort zu verteidigen, auch wenn Vorwürfe unfair wirken.",
          },
          {
            title: "4. Selbstverletzung ernst nehmen",
            text: "Nicht ignorieren, nicht dramatisieren, Hilfe anbieten.",
          },
          {
            title: "5. Gemeinsam handeln",
            text: "Handeln Sie als Familie gemeinsam – gleiche Regeln, weniger Konflikte.",
          },
          {
            title: "6. Klare Grenzen setzen",
            text: "Setzen Sie klare Grenzen – aber nur solche, die Sie auch durchhalten können.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es bei den Leitlinien geht",
        calloutText:
          "Nicht alles auf einmal: Wählen Sie eine Leitlinie pro Woche.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Lieber klein und verlässlich",
        calloutText:
          "Die Leitlinien wirken meist nicht als Gesamtprogramm, sondern dann, wenn Sie eine davon verlässlich in den Alltag bringen.",
      },
      {
        title: "Action",
        cards: [
          {
            title: "1. Leitlinie wählen",
            text: "Wählen Sie eine Leitlinie für diese Woche.",
          },
          {
            title: "2. Gemeinsam besprechen",
            text: "Besprechen Sie sie, wenn möglich, mit Familie oder Mitbeteiligten.",
          },
          {
            title: "3. Reflektieren",
            text: "Reflektieren Sie: Was hat sich verändert?",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Gunderson et al., Family Guidelines for Borderline Personality Disorder.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("4-alltags-tipps", {
    kicker: "Textversion",
    summary:
      "Kleine, konkrete Handlungen im Alltag helfen oft mehr als grosse Reden: mitüben, Fortschritte würdigen, verlässlich bleiben und gemeinsam Lösungen entwickeln.",
    intro: [
      "Die vier Alltags-Tipps fokussieren auf wenige Unterstützungsformen, die Angehörige direkt ausprobieren können. Der Schwerpunkt liegt auf kleinen, tragfähigen Schritten statt auf perfekten Lösungen.",
      "Das Handout bleibt praktisch: Sie müssen nicht alles übernehmen. Oft reicht es, verlässlich präsent zu sein, kleine Fortschritte sichtbar zu machen und hilfreiche Fragen zu stellen.",
    ],
    sections: [
      {
        title: "4 Alltags-Tipps",
        intro:
          "Die Grafik bündelt vier konkrete Handlungsfelder für den Alltag mit einer nahestehenden Person.",
        cards: [
          {
            title: "Übungspartner sein",
            text: "Unterstützen Sie beim Üben neuer Skills, ohne die Übung selbst zu übernehmen.",
          },
          {
            title: "Fortschritte anerkennen",
            text: "Würdigen Sie auch kleine Schritte und benennen Sie, was bereits gelingt.",
          },
          {
            title: "Vorhersehbar sein",
            text: "Klare Routinen, Absprachen und Verlässlichkeit entlasten oft mehr als spontane Rettungsversuche.",
          },
          {
            title: "Gemeinsam Probleme lösen",
            text: "Fragen Sie mit, statt sofort Lösungen vorzugeben. Unterstützen statt übernehmen.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es im Alltag geht",
        calloutText:
          "Kleine Handlungen im Alltag machen den grössten Unterschied.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Einen Tipp wählen",
            text: "Wählen Sie einen Tipp, den Sie diese Woche bewusst ausprobieren wollen.",
          },
          {
            title: "2. In Ruhe üben",
            text: "Probieren Sie ihn zuerst in ruhigen Momenten aus.",
          },
          {
            title: "3. Hilfreich fragen",
            text: "Fragen Sie: Was wäre jetzt hilfreich?",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: DBT-orientierte Angehörigenarbeit; Fruzzetti (2006), Family Psychoeducation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
];
