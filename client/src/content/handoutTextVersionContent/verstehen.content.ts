import revisedHandouts from "@/content/revisedHandouts.json";
import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("leuchtturm", {
    kicker: "Textversion",
    summary:
      "Der Leuchtturm steht hier für Ihre eigene Orientierung: Was ist Ihnen wichtig, was können Sie übernehmen, wo liegt Ihre Grenze und welche Hilfe brauchen Sie?",
    intro: [
      "Die Metapher erinnert daran, dass Sie die Entscheidungen, Gefühle oder Genesung einer anderen Person nicht steuern können. Sie dürfen stattdessen den eigenen nächsten Schritt an Werten, Möglichkeiten und Sicherheit ausrichten.",
      "Angehörige müssen dabei nicht dauerhaft ruhig, stabil oder richtungsgebend sein. Auch Erschöpfung, Unsicherheit, Abstand und das Hilfeholen haben Platz.",
    ],
    sections: [
      {
        title: "Die Bildidee",
        intro:
          "Das Licht dient als Bild für eine eigene Orientierung in wechselnden Situationen, nicht als Auftrag, eine andere Person zu führen.",
        cards: [
          {
            title: "Situation wahrnehmen",
            text: "Was geschieht gerade konkret, und wie geht es Ihnen damit?",
          },
          {
            title: "Eigenen Spielraum klären",
            text: "Was möchten und können Sie im Moment anbieten — und was nicht?",
          },
          {
            title: "Unterstützung einbeziehen",
            text: "Welche Fachperson, Vertrauensperson oder Pause kann Sie und die Situation entlasten?",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Was der Leuchtturm meint",
        calloutText:
          "Sie können die Reise einer anderen Person nicht steuern. Sie dürfen sich am eigenen Kompass orientieren: Werte, Grenzen, Möglichkeiten und passende Unterstützung.",
      },
      {
        title: "3 Schritte",
        cards: [
          {
            title: "1. Bei sich einchecken",
            text: "Nehmen Sie wahr, was Sie fühlen, brauchen und sicher leisten können.",
          },
          {
            title: "2. Eigenen nächsten Schritt wählen",
            text: "Benennen Sie ein mögliches Angebot oder eine Grenze, ohne eine Wirkung beim Gegenüber versprechen zu müssen.",
          },
          {
            title: "3. Unterstützung nutzen",
            text: "Holen Sie Beratung oder Hilfe und nehmen Sie Abstand, wenn das nötig oder entlastend ist.",
          },
        ],
      },
      {
        title: "Orientierung",
        calloutTitle: "Was der Leuchtturm nicht bedeutet",
        calloutText:
          "Die Metapher verteilt keine festen Rollen: Die betroffene Person ist kein steuerloses Schiff, und Sie müssen kein dauernd ruhiger Anker sein. Genesung wird von der Person selbst mitgestaltet und zugleich von Behandlung, Beziehungen, materiellen Bedingungen und gesellschaftlicher Unterstützung beeinflusst.",
      },
    ],
    sourceLine:
      "Eigene didaktische Metapher zur Selbstorientierung von Angehörigen; recovery- und rechteorientiert überarbeitet.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 04.10.2026.",
  }),
  createHandoutTextVersion("eisberg", {
    kicker: "Textversion",
    summary:
      "Wut, Vorwürfe oder Lautwerden können mit Angst, Scham, Trauer, Einsamkeit, Stress oder anderen Erfahrungen zusammenhängen. Von aussen bleibt offen, was im konkreten Moment mitwirkt.",
    intro: [
      "Der Eisberg ist eine Metapher: Sichtbares Verhalten erklärt eine Situation nicht vollständig. Gefühle, Bedürfnisse, Erfahrungen und Lebensumstände können mitwirken, ohne dass Aussenstehende sie sicher kennen.",
      "Für Angehörige ist die Grafik als Einordnungshilfe gedacht. Sie soll Wut nicht verharmlosen und keine verborgene Ursache behaupten. Fragen Sie nach, wenn dies möglich ist, und behalten Sie Ihre eigene Wahrnehmung und Grenze im Blick.",
    ],
    sections: [
      {
        title: "Sichtbar",
        intro:
          "Die obere Spitze des Eisbergs steht beispielhaft für beobachtbares Verhalten. Ausdruck und Intensität unterscheiden sich von Person zu Person und lassen sich nicht aus einer Diagnose vorhersagen.",
        cards: [
          {
            title: "Wut",
            text: "Zum Beispiel hörbare Gereiztheit oder deutlich geäusserter Ärger.",
          },
          {
            title: "Vorwürfe",
            text: "Zum Beispiel eine konkrete Beschuldigung oder eine harte Aussage, die Angehörige belastet.",
          },
          {
            title: "Laut werden",
            text: "Erhöhte Lautstärke oder scharfer Ton als sichtbares Verhalten an der Oberfläche.",
          },
        ],
      },
      {
        title: "Mögliche Kontexte",
        intro:
          "Unter der Wasserlinie zeigt die Grafik mögliche Gefühle und Belastungen. Sie sind Beispiele, keine sichere Deutung einer konkreten Person.",
        cards: [
          {
            title: "Angst",
            text: "Unsicherheit, ein Bedrohungsgefühl oder Sorge vor Beziehungsverlust können gleichzeitig vorhanden sein.",
          },
          {
            title: "Scham",
            text: "Scham kann schwer auszusprechen sein. Ob sie eine Situation beeinflusst, lässt sich nur im Gespräch klären.",
          },
          {
            title: "Trauer",
            text: "Verlust, Schmerz oder Enttäuschung können eine Situation mitprägen, müssen es aber nicht.",
          },
          {
            title: "Einsamkeit",
            text: "Das Gefühl, nicht erreicht oder verstanden zu werden, ist ein möglicher Kontext eines Konflikts.",
          },
          {
            title: "Stress",
            text: "Überforderung und Anspannung verstärken sichtbare Reaktionen und engen den Handlungsspielraum ein.",
          },
        ],
      },
      {
        title: "Anspannung und Ventile",
        intro:
          "Die Grafik ergänzt den Eisberg um zwei Regler: mehr Trigger und Überforderung erhöhen den Druck, mehr Sicherheit, Skills und Erholung entlasten.",
        cards: [
          {
            title: "Anspannung",
            text: "Die Anzeige visualisiert, wie hoch die innere Aktivierung gerade ist.",
          },
          {
            title: "Mehr Trigger",
            text: "Stress, Überforderung und belastende Reize erhöhen den inneren Druck.",
          },
          {
            title: "Mehr Ventile",
            text: "Sicherheit, Skills und Erholung senken die Anspannung und schaffen wieder Spielraum.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es beim Eisberg geht",
        calloutText:
          "Was Sie sehen, ist ein Teil der Situation. Schmerz, Angst, Scham, Überforderung oder ganz andere Erfahrungen können mitwirken; aus dem Verhalten allein lässt sich das nicht sicher ableiten.",
      },
      {
        title: "3 Schritte",
        cards: [
          {
            title: "1. Erkennen",
            text: "Was wurde konkret gesagt oder getan? Was löst das bei mir aus?",
          },
          {
            title: "2. Verstehen",
            text: "Welche Erklärungen sind möglich, und was kann ich offen nachfragen?",
          },
          {
            title: "3. Handeln",
            text: "Wie kann ich darauf eingehen, ohne mich selbst zu verlieren?",
          },
        ],
      },
      {
        title: "Orientierung",
        calloutTitle: "Wie der Eisberg gelesen werden kann",
        calloutText:
          "Oben zeigt die Grafik sichtbares Verhalten. Unter der Oberfläche stehen beispielhaft mögliche Gefühle und Belastungen. Die Metapher lädt zum Nachfragen ein, nicht zum Gedankenlesen. Verstehen bedeutet nicht, Beschimpfungen, Drohungen oder Gewalt auszuhalten.",
      },
    ],
    sourceLine:
      "Fachlicher Bezugspunkt: Emotionsregulation nach Linehan, M. M. (1993). Eisberg-Metapher und Beispiele: eigene didaktische Darstellung.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("spaltung", {
    kicker: "Textversion",
    summary:
      "Unter hoher Anspannung kann die Bewertung eines Menschen vorübergehend einseitiger werden. Dann treten positive oder negative Aspekte stärker hervor, während ein differenzierter Blick schwerer zugänglich ist.",
    intro: [
      "Die Pendel-Metapher veranschaulicht eine mögliche Veränderung der Bewertung unter hoher Anspannung. Sie beschreibt weder eine feste Eigenschaft einer Person noch eine Absicht und lässt sich nicht aus einer Diagnose vorhersagen.",
      "Für Angehörige ist die Grafik als Einordnungshilfe gedacht. Sie kann helfen, eine belastende Situation genauer wahrzunehmen, ohne Motive zu unterstellen oder verletzende Aussagen zu verharmlosen.",
    ],
    sections: [
      {
        title: "Zwei Pole und eine differenziertere Mitte",
        intro:
          "Das Handout stellt zwei mögliche Pole und eine breitere, differenziertere Sicht dazwischen gegenüber.",
        cards: [
          {
            title: "Sehr positive Bewertung",
            text: "Nähe, Dankbarkeit oder Hoffnung können sehr gross werden. Das kann warm wirken und zugleich Erwartungen oder Druck erzeugen.",
          },
          {
            title: "Differenziertere Sicht",
            text: "Stärken, Grenzen, Nähe und Ärger können gleichzeitig wahr sein. Diese breitere Sicht lässt mehr als eine Bewertung zu, ohne schwierige Erfahrungen kleinzureden.",
          },
          {
            title: "Sehr negative Bewertung",
            text: "Kränkung, Angst oder Wut können den Blick stark färben. Harte Aussagen können verletzen und sind trotzdem nicht automatisch ein vollständiges Bild der Person oder Beziehung.",
          },
        ],
      },
      {
        title: "Was Bewertungen beeinflussen kann",
        intro:
          "Hohe Anspannung kann den Blick verengen. Was dabei ins Gewicht fällt und wie jemand reagiert, ist individuell und nicht sicher vorhersehbar.",
        bullets: [
          "Stress oder Erschöpfung",
          "erlebte Kritik",
          "Nähe oder Abstand",
          "Missverständnisse",
          "Scham oder Kränkung",
        ],
      },
      {
        title: "Wichtiger Hinweis",
        calloutTitle: "Eine Möglichkeit, keine Festlegung",
        calloutText:
          "Die Metapher beschreibt eine mögliche Stressreaktion, nicht den Charakter eines Menschen. Sie gilt nicht für alle Menschen mit Borderline und erklärt keine einzelne Situation abschliessend.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Wenn Bewertungen unter Stress einseitiger werden",
        calloutText:
          "Unter hoher Anspannung kann der Blick auf einen Menschen vorübergehend enger werden. Weder eine sehr positive noch eine sehr negative Momentaufnahme muss die ganze Beziehung oder Person beschreiben.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Verstehen heisst nicht hinnehmen",
        calloutText:
          "Eine mögliche Stressreaktion zu verstehen, bedeutet nicht, verletzende Aussagen, Drohungen oder Gewalt hinzunehmen. Ihre Wahrnehmung, Ihre Grenzen und Ihre Sicherheit bleiben wichtig.",
      },
      {
        title: "3 mögliche Schritte",
        cards: [
          {
            title: "1. Konkret wahrnehmen",
            text: "Fragen Sie sich: Was wurde gerade tatsächlich gesagt oder getan? Was löst das bei mir aus? Bleiben Sie bei Beobachtungen, ohne eine Absicht festzulegen.",
          },
          {
            title: "2. Pause oder Grenze",
            text: "Wenn es sicher ist, können Sie Zeit gewinnen: «Ich brauche einen Moment, bevor ich antworte.» Sie müssen sich weder sofort verteidigen noch zustimmen.",
          },
          {
            title: "3. Differenziert fortsetzen",
            text: "Wenn beide Seiten möchten und genügend Ruhe da ist, kann das Gespräch später weitergehen: «Ich sehe, dass du wütend bist, und ich erlebe die Situation anders.» Eine ruhige Antwort ist ein Angebot, keine Erfolgsgarantie und nicht Ihre Pflicht.",
          },
        ],
      },
    ],
    sourceLine:
      "Grundlage: Linehan, M. M. (1993); Hoffman, P. D. et al. (2005). Eigene didaktische Pendel-Darstellung.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 04.10.2026.",
  }),
  createHandoutTextVersion("alarm-modus", {
    kicker: "Textversion",
    summary:
      "Unter hoher Anspannung kann Denken enger werden. Weniger Druck, eine Pause oder Abstand können dann hilfreicher sein als weitere Argumente. Angehörige müssen die andere Person nicht beruhigen.",
    intro: [
      "Alarm-Modus und Denk-Modus sind eine vereinfachte Metapher dafür, dass Gespräche unter hoher Anspannung enger werden können. Sie ist keine Diagnose eines konkreten Moments und lässt sich einer Person nicht sicher von aussen zuordnen.",
      "Für Angehörige kann das entlasten: Sie dürfen das eigene Tempo senken, weniger sagen, eine Pause anbieten oder das Gespräch beenden. Ob und was dem Gegenüber hilft, entscheidet nicht allein die angehörige Person.",
    ],
    sections: [
      {
        title: "Mögliche Belastungen",
        calloutTitle: "Individuell und nicht von aussen ablesbar",
        calloutText:
          "Kritik, Konflikte, Reizüberflutung oder andere Belastungen können Anspannung erhöhen. Was gerade mitwirkt, lässt sich nur offen erfragen – und manchmal bleibt es unklar.",
      },
      {
        title: "Die zwei Modi",
        intro:
          "Das Handout stellt einen hoch aktivierten Alarm-Zustand einem wieder zugänglichen Denk-Zustand gegenüber.",
        cards: [
          {
            title: "Alarm-Modus",
            text: "Bei starker Aktivierung können Zuhören, Abwägen und Impulse steuern vorübergehend schwerer werden. Das ist eine Möglichkeit, keine sichere Erklärung für beobachtetes Verhalten.",
          },
          {
            title: "Denk-Modus",
            text: "Wenn Anspannung sinkt, werden Zuhören, Abwägen und Planen wieder besser zugänglich. Erst dann trägt ein klärendes Gespräch eher.",
          },
          {
            title: "Übergang",
            text: "Zeit, weniger Reize, selbst gewählte Unterstützung oder Abstand können helfen. Ein klärendes Gespräch ist erst sinnvoll, wenn beide Seiten es möchten und führen können.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es beim Alarm-Modus geht",
        calloutText:
          "Hohe Anspannung kann Denken, Perspektivwechsel und Selbststeuerung verengen. Daraus lässt sich weder ein Motiv noch der innere Zustand einer konkreten Person sicher ableiten.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Was in welchem Modus hilft",
        calloutText:
          "Wenn Argumente nicht mehr ankommen, dürfen Sie Druck reduzieren, eine Pause anbieten oder das Gespräch beenden. Sie müssen keine Beruhigung erreichen. Bei Gefahr haben Abstand, Schutz und professionelle Hilfe Vorrang.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Beobachten und innehalten",
            text: "Fragen Sie sich: Erreichen wir einander noch, oder wird das Gespräch gerade enger und belastender?",
          },
          {
            title: "2. Eigenen Druck reduzieren",
            text: "Weniger sprechen, das eigene Tempo senken, Raum lassen oder Abstand nehmen.",
          },
          {
            title: "3. Neu entscheiden",
            text: "Später nur dann klären, wenn beide Seiten es möchten und ein respektvolles Gespräch möglich ist.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Linehan, M. M. (1993/2015), DBT und Emotionsregulation; Stressmodell als didaktische Vereinfachung.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("gehirn", {
    kicker: "Textversion",
    summary:
      "Unter hoher Anspannung kann Denken enger werden. Das vereinfachte Modell bietet Einordnung, weist Angehörigen aber keine Beruhigungs- oder Regulationsaufgabe zu.",
    intro: [
      "Das Gehirn-Modell vereinfacht mögliche Vorgänge bei hoher Anspannung. Es bildet kein einzelnes Gehirn ab und erklärt das Verhalten einer konkreten Person nicht vollständig.",
      "Für Angehörige ist die Textversion eine Einordnungshilfe: Wenn ein Gespräch enger wird, dürfen Sie weniger Druck machen, pausieren, Abstand nehmen oder es beenden. Sie müssen den inneren Zustand einer anderen Person weder erkennen noch verändern.",
    ],
    sections: [
      {
        title: "Die drei Bereiche der Grafik",
        intro:
          "Die Infografik nutzt drei Bereiche als vereinfachte Orientierung dafür, was unter Stress oft schwerer zugänglich wird.",
        cards: [
          {
            title: "Alarm",
            text: "Der Körper reagiert auf Bedrohung, Stress oder Überforderung. Impulse können schneller und stärker werden.",
          },
          {
            title: "Einordnen",
            text: "Erinnern, Sortieren und Gegenwart von früheren Erfahrungen unterscheiden kann unter Stress schwerer werden.",
          },
          {
            title: "Abwägen",
            text: "Planen, Perspektivwechsel und Impulskontrolle sind bei hoher Anspannung oft weniger gut erreichbar.",
          },
        ],
      },
      {
        title: "Was unter Stress möglich ist",
        cards: [
          {
            title: "Überflutet",
            text: "Die Anspannung ist hoch, und der innere Spielraum wird klein.",
          },
          {
            title: "Anspannung bleibt hoch",
            text: "Zeit, Sicherheit, weniger Reize oder selbst gewählte Unterstützung können fehlen oder noch nicht wirksam sein.",
          },
          {
            title: "Mehr Spielraum kann zurückkehren",
            text: "Wenn Anspannung sinkt, können Abwägen und Gespräch wieder leichter werden. Der Verlauf ist individuell.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei der Überflutung geht",
        calloutText:
          "Hohe Anspannung kann Denken verengen. Daraus lässt sich keine Absicht ablesen. Zeit, weniger Druck oder selbst gewählte Unterstützung können helfen; Angehörige müssen keine Beruhigung erreichen.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Was die Grafik verständlich machen will",
        calloutText:
          "Wenn ein Gespräch unter Stress enger wird, können Pause, Abstand und der eigene Schutz sinnvoller sein als weitere Argumente. Ein späteres Gespräch ist nur eine Möglichkeit, keine Pflicht.",
      },
      {
        title: "3 freiwillige Schritte zur eigenen Orientierung",
        cards: [
          {
            title: "1. Atmen und Wahrnehmen",
            text: "Wenn es Ihnen guttut: langsamer ausatmen und wahrnehmen, was Sie selbst gerade brauchen.",
          },
          {
            title: "2. Pausieren und Bewegen",
            text: "Raum wechseln, kurz gehen, Wasser trinken oder Abstand schaffen – soweit dies sicher möglich ist.",
          },
          {
            title: "3. Fokus und Einordnen",
            text: "Später neu entscheiden, ob überhaupt und unter welchen Bedingungen ein Gespräch möglich ist.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Stress- und Emotionsregulation in Anlehnung an Linehan, M. M. (1993/2015); LeDoux (1996) als Hintergrund zur Angst- und Stressverarbeitung.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("kinder", revisedHandouts["kinder"]),
];
