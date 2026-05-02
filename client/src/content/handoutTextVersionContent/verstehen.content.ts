import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("leuchtturm", {
    kicker: "Textversion",
    summary:
      "Sie können die Krise nicht steuern, aber Sie können als Angehörige oder Angehöriger Orientierung geben: ruhig, klar und verlässlich.",
    intro: [
      "Der Leuchtturm verdichtet die wichtigste Haltung für Angehörige: Sie können Orientierung geben, ohne das Schiff steuern zu müssen. Die Bildidee macht die Kernaussage direkt zugänglich.",
      "Die Grafik stellt nicht die Gefühle der betroffenen Person in den Mittelpunkt, sondern Ihre Haltung als Angehörige oder Angehöriger: Zustände wechseln, Ihre Orientierung darf stabil bleiben.",
    ],
    sections: [
      {
        title: "Die Bildidee",
        intro:
          "Das Handout arbeitet mit einer einfachen Metapher: Krise und Alltag wechseln sich ab, der Leuchtturm bleibt trotzdem stehen.",
        cards: [
          {
            title: "Sturm",
            text: "Krise oder Überflutung: intensive Gefühle, hohe Anspannung, wenig Übersicht.",
          },
          {
            title: "Ruhe",
            text: "Stabilität oder Alltag: mehr Kontaktfähigkeit, mehr Orientierung, mehr Spielraum.",
          },
          {
            title: "Übergang",
            text: "Krisen kommen und gehen. Der Übergang erinnert daran, dass belastende Zustände nicht statisch bleiben.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Was der Leuchtturm meint",
        calloutText:
          "Sie können das Schiff nicht steuern – aber Sie können Orientierung geben: ruhig, klar, verlässlich.",
      },
      {
        title: "3 Schritte",
        cards: [
          {
            title: "1. Stabilität wahren",
            text: "Bewahren Sie möglichst innere Ruhe, auch wenn es im Gegenüber stürmisch wird.",
          },
          {
            title: "2. Orientierung geben",
            text: "Geben Sie mit wenigen klaren Sätzen Orientierung statt immer neuen Erklärungen.",
          },
          {
            title: "3. Verlässlich bleiben",
            text: "Bleiben Sie möglichst berechenbar, auch wenn sich Zustände schnell ändern.",
          },
        ],
      },
      {
        title: "Orientierung",
        calloutTitle: "Was der Leuchtturm nicht bedeutet",
        calloutText:
          "Der Leuchtturm steht nicht für Kontrolle, sondern für Haltung: ruhig bleiben, Richtung geben und nicht in jeden Sturm hineingezogen werden.",
      },
    ],
    sourceLine:
      "Quelle: Nach Mason & Kreger (2014), Angehörigen-Psychoedukation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("eisberg", {
    kicker: "Textversion",
    summary:
      "Was sichtbar wie Wut, Vorwürfe oder Lautwerden wirkt, hat oft eine verdeckte Unterseite aus Angst, Scham, Trauer, Einsamkeit und Stress.",
    intro: [
      "Der Eisberg macht sichtbar, dass Verhalten oft nur die Oberfläche ist. Darunter liegen häufig Angst, Scham, Überforderung, Bedürfnisse oder Verletzlichkeit.",
      "Für Angehörige ist die Grafik als Einordnungshilfe gedacht. Sie soll Wut nicht verharmlosen, aber helfen, Verhalten differenzierter zu lesen und die eigene Reaktion bewusster zu wählen.",
    ],
    sections: [
      {
        title: "Sichtbar",
        intro:
          "Die obere Spitze des Eisbergs steht für das, was im Alltag direkt auffällt und oft schnell eskaliert.",
        cards: [
          {
            title: "Wut",
            text: "Starke Gereiztheit oder explosive Reaktionen, die sofort als Problem sichtbar werden.",
          },
          {
            title: "Vorwürfe",
            text: "Anklagen, Schuldzuweisungen oder harte Botschaften, die bei Angehörigen schnell Abwehr auslösen.",
          },
          {
            title: "Laut werden",
            text: "Erhöhte Lautstärke oder scharfer Ton als sichtbares Verhalten an der Oberfläche.",
          },
        ],
      },
      {
        title: "Darunter",
        intro:
          "Unter der Wasserlinie zeigt die Grafik die verborgenen Gefühle und Bedürfnisse, die an der Oberfläche nicht sofort erkennbar sind.",
        cards: [
          {
            title: "Angst",
            text: "Unsicherheit, Bedrohungsgefühl oder Verlassensangst können sich hinter Wut verbergen.",
          },
          {
            title: "Scham",
            text: "Starke innere Beschämung wird oft nicht direkt gezeigt, sondern über Abwehr oder Angriff nach aussen geleitet.",
          },
          {
            title: "Trauer",
            text: "Verlust, Schmerz oder Enttäuschung können verdeckt bleiben und trotzdem das Verhalten prägen.",
          },
          {
            title: "Einsamkeit",
            text: "Das Gefühl, nicht erreicht oder verstanden zu werden, kann unterm sichtbaren Konflikt liegen.",
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
          "Was Sie sehen (Wut) ist oft nur die Spitze – darunter liegen Schmerz, Angst, Scham und Überforderung.",
      },
      {
        title: "3 Schritte",
        cards: [
          {
            title: "1. Erkennen",
            text: "Was sehe ich? Was könnte darunter liegen?",
          },
          {
            title: "2. Verstehen",
            text: "Welches Gefühl oder Bedürfnis steckt dahinter?",
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
          "Oben zeigt die Grafik sichtbares Verhalten. Unter der Oberfläche liegen oft Gefühle und Bedürfnisse, die im Streit leicht aus dem Blick geraten.",
      },
    ],
    sourceLine:
      "Quelle: Psychoedukation, Emotionsmodell nach DBT (Linehan, 1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("spaltung", {
    kicker: "Textversion",
    summary:
      "Unter Stress kippt die Bewertung oft in Extreme. Angehörige werden dann vorübergehend idealisiert oder entwertet, während die Grauzone schwer erreichbar wird.",
    intro: [
      "Die Pendel-Metapher zeigt, wie Wahrnehmung unter Belastung zwischen Idealisierung und Entwertung kippen kann. Ziel ist, den ganzen Menschen wieder besser im Blick zu behalten.",
      "Für Angehörige ist die Grafik als Orientierung gedacht. Sie erklärt, warum das Kippen so schmerzhaft und verwirrend wirkt, und zeigt, wie stabilisierende Reaktionen helfen können, die Grauzone wieder erreichbar zu machen.",
    ],
    sections: [
      {
        title: "Die drei Zustände",
        intro:
          "Das Handout stellt zwei verzerrte Bewertungszustände und die schwer erreichbare Grauzone dazwischen gegenüber.",
        cards: [
          {
            title: "Idealisierung",
            text: "«Du bist der beste Mensch der Welt!» So erleben Sie es: Ihr Angehöriger überhäuft Sie mit Lob und Zuneigung. Sie fühlen sich gebraucht und wichtig – aber auch unter Druck, diesem Bild gerecht zu werden.",
          },
          {
            title: "Grauzone",
            text: "«Du bist ein Mensch – mit Stärken und Schwächen.» Das Ziel: Ihr Angehöriger kann Sie als ganzen Menschen sehen – nicht nur als Retter oder Feind. Dieses Sowohl-als-auch ist das, was Therapie langfristig fördert.",
          },
          {
            title: "Entwertung",
            text: "«Du bist das Schlimmste. Du bist gegen mich!» So erleben Sie es: Plötzlich sind Sie der Feind – obwohl sich nichts geändert hat. Alles Gute scheint vergessen. Das tut weh und ist verwirrend.",
          },
        ],
      },
      {
        title: "Was das Pendel kippen kann",
        intro:
          "Die Grafik markiert kleine Auslöser, die von aussen oft banal wirken, unter Stress aber stark ins Gewicht fallen.",
        bullets: ["Stress", "Kritik", "Abstand", "Missverständnis"],
      },
      {
        title: "Wichtiger Hinweis",
        calloutTitle: "Warum das Kippen so irritierend ist",
        calloutText:
          "Diese Trigger sind oft winzig – für Aussenstehende kaum erkennbar. Das Kippen ist kein böser Wille Ihres Angehörigen, sondern ein erlerntes Muster der Emotionsregulation.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei der Spaltung geht",
        calloutText:
          "Unter Stress kippt die Bewertung Ihres Angehörigen leicht ins Extreme – die Grauzone wird schwer erreichbar. Weder die Idealisierung noch die Entwertung sind ein realistisches Bild von Ihnen. Beides sind Verzerrungen. Sie sind derselbe Mensch – vor und nach dem Kippen.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Worum es bei der Grauzone geht",
        calloutText:
          "Idealisierung und Entwertung sind beide verzerrte Stresszustände. Die Grauzone ist der realistischere Bereich, in dem Beziehung wieder differenzierter erlebt werden kann.",
      },
      {
        title: "3 Schritte zur Stabilisierung",
        cards: [
          {
            title: "1. Wahrnehmen",
            text: "Erkennen Sie das Muster – bei Ihrem Angehörigen und bei sich selbst. «Werde ich gerade idealisiert oder entwertet? Bin ich wirklich so gut oder so schlecht – oder ist das Pendel gekippt?» Allein dieses Erkennen schafft inneren Abstand.",
          },
          {
            title: "2. Pause",
            text: "Nicht sofort reagieren. Zeit gewinnen und Distanz schaffen. «Ich brauche einen Moment, bevor ich antworte.» Lassen Sie die erste Welle vorbeiziehen. Weder Gegenangriff noch Unterwerfung helfen.",
          },
          {
            title: "3. Integration",
            text: "Bleiben Sie konsistent – auch wenn die Bewertung schwankt. «Ich bin derselbe Mensch wie gestern. Ich habe dich lieb, auch wenn du gerade wütend auf mich bist.» Ihre Beständigkeit ist der Anker, der die Grauzone erreichbar macht. Sowohl-als-auch statt Entweder-oder.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Nach Linehan (2015), DBT Skills Training, Handouts 10, 15, 16. Gunderson et al. (2011), Family Psychoeducation for BPD.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 09.02.2026.",
  }),
  createHandoutTextVersion("alarm-modus", {
    kicker: "Textversion",
    summary:
      "Wenn der Alarm-Modus aktiv ist, ist Ihr Gegenüber vorübergehend schwer erreichbar. Erst beruhigen, dann klären: Die Brücke vom Alarm zum Denken braucht Sicherheit und weniger Druck.",
    intro: [
      "Alarm-Modus und Denk-Modus erklären, warum Gespräche unter hoher Anspannung so schnell eng werden. Unter Stress steht nicht dieselbe Denkfähigkeit zur Verfügung wie in ruhigeren Momenten.",
      "Für Angehörige ist das eine Entlastung und eine Handlungsorientierung zugleich. Nicht jede Eskalation ist böser Wille oder bewusste Verweigerung – oft ist sie Ausdruck eines neurobiologisch eingeengten Zustands.",
    ],
    sections: [
      {
        title: "Trigger",
        calloutTitle: "Was den Alarm auslösen kann",
        calloutText: "Kritik, Zurückweisung oder starke Überforderung.",
      },
      {
        title: "Die zwei Modi",
        intro:
          "Das Handout stellt einen hoch aktivierten Alarm-Zustand einem wieder zugänglichen Denk-Zustand gegenüber.",
        cards: [
          {
            title: "Alarm-Modus",
            text: "Der Körper geht in Kampf oder Flucht. Die Amygdala ist überaktiv, Denken eingeschränkt und Impulse werden schwerer steuerbar. Schuldgefühle kommen oft erst später.",
          },
          {
            title: "Denk-Modus",
            text: "Der präfrontale Kortex ist besser verfügbar. Zuhören, Abwägen und Planen werden wieder möglich, und erst dann trägt ein Gespräch eher.",
          },
          {
            title: "Übergang",
            text: "Erst beruhigen, dann klären. Die Brücke vom Alarm zum Denken entsteht nicht durch Druck, sondern durch Entlastung und Sicherheit.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es beim Alarm-Modus geht",
        calloutText:
          "Im Alarm-Modus ist Ihr Gegenüber vorübergehend nicht erreichbar. Das ist keine Lüge und kein böser Wille, sondern eine neurobiologische Alarmreaktion.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Was in welchem Modus hilft",
        calloutText:
          "Im Alarm-Modus helfen Druck und Logik wenig. Zuerst braucht es Beruhigung, dann einen Übergang, erst danach wieder Klärung.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Erkennen und Stopp",
            text: "Fragen Sie sich: Ist mein Gegenüber gerade im Alarm-Modus?",
          },
          {
            title: "2. Aktiv beruhigen",
            text: "Stimme senken, Tempo verlangsamen, Raum geben.",
          },
          {
            title: "3. Klärendes Gespräch",
            text: "Erst wenn der Denk-Modus zurück ist.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Porges (2011), Polyvagal-Theorie; Linehan (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("4-phasen", {
    kicker: "Textversion",
    summary:
      "Freundlichkeit, Verschlechterung, Explosion und Schweigen können sich als wiederkehrender Zyklus verstärken. Entscheidend ist, das Muster früh zu erkennen und in Phase 2 anders zu reagieren.",
    intro: [
      "Der 4-Phasen-Zyklus beschreibt ein wiederkehrendes Muster, das in belasteten Beziehungen immer wieder auftreten kann. Er hilft, Eskalationen früher einzuordnen.",
      "Die Grafik versteht den Zyklus nicht als fixes Schicksal, sondern als Muster, das erkannt und unterbrochen werden kann. Genau dort liegt der entlastende Kern für Angehörige.",
    ],
    sections: [
      {
        title: "Die 4 Phasen",
        intro:
          "Die Infografik beschreibt vier Zustände, die sich gegenseitig verstärken und im Kreis wiederholen können.",
        cards: [
          {
            title: "Phase 1: Freundlichkeit",
            text: "Alles scheint gut. Nähe, Harmonie.",
          },
          {
            title: "Phase 2: Verschlechterung",
            text: "Spannung steigt. Reizbarkeit, Rückzug, Misstrauen.",
          },
          {
            title: "Phase 3: Explosion",
            text: "Krise. Vorwürfe, Drohungen, Kontrollverlust.",
          },
          {
            title: "Phase 4: Schweigen",
            text: "Rückzug. Schuldgefühle. Erschöpfung.",
          },
        ],
      },
      {
        title: "Verstärkende Schleife",
        calloutTitle: "Warum sich das Muster so fest anfühlen kann",
        calloutText:
          "Die Grafik zeigt den Zyklus als verstärkende Schleife: Jede Phase bereitet oft schon den Boden für die nächste, wenn niemand das Muster bewusst unterbricht.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es beim 4-Phasen-Zyklus geht",
        calloutText:
          "Der Zyklus wiederholt sich, bis das Muster früher erkannt und unterbrochen wird. Dazu können Sie beitragen.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Wo Veränderung am ehesten möglich wird",
        calloutText:
          "Am meisten Spielraum entsteht meist schon in Phase 2, bevor aus Spannung wieder eine Explosion wird.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "Erkennen",
            text: "In welcher Phase sind wir gerade?",
          },
          {
            title: "Verstehen",
            text: "Der Zyklus ist ein Muster, kein Schicksal.",
          },
          {
            title: "Verändern",
            text: "Reagieren Sie in Phase 2 anders als früher.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("gehirn", {
    kicker: "Textversion",
    summary:
      "Bei emotionaler Überflutung übernimmt das Alarm-System. Das Denken kommt erst zurück, wenn der Körper wieder etwas ruhiger ist.",
    intro: [
      "Das Gehirn-Modell erklärt in einfacher Form, was bei emotionaler Überflutung passiert. Für Angehörige wird dadurch nachvollziehbarer, warum zuerst Beruhigung und erst danach Klärung hilft.",
      "Für Angehörige ist die Grafik vor allem als Einordnungshilfe gedacht: Überflutung ist keine Absicht, sondern eine neurobiologische Reaktion. Deshalb hilft zuerst Beruhigung und erst danach Klärung.",
    ],
    sections: [
      {
        title: "Die drei Bereiche der Grafik",
        intro:
          "Die Infografik stellt drei Hirn-Bereiche mit ihren Funktionen und ihrer Rolle unter Stress gegenüber.",
        cards: [
          {
            title: "Amygdala – Alarm-Zentrale",
            text: "Reagiert auf Bedrohung und löst Kampf oder Flucht aus. Bei einer Borderline-Persönlichkeitsstörung reagiert sie oft stärker und schneller.",
          },
          {
            title: "Hippocampus – Erinnerungsspeicher",
            text: "Ordnet Erlebnisse zeitlich ein. Unterscheidet Vergangenheit von Gegenwart. Bei Stress: Funktion eingeschränkt.",
          },
          {
            title: "Präfrontaler Kortex – Denk-Zentrale",
            text: "Planung, Impulskontrolle, Reflexion. Bei Überflutung: vorübergehend offline.",
          },
        ],
      },
      {
        title: "Was dann oft passiert",
        cards: [
          {
            title: "Überflutet",
            text: "Die Alarmreaktion übernimmt, und der innere Spielraum wird klein.",
          },
          {
            title: "Beruhigung fehlt",
            text: "Ohne Beruhigung bleibt das System in Alarm oder Übergang hängen.",
          },
          {
            title: "Beruhigung → Denken kommt zurück",
            text: "Wenn der Körper ruhiger wird, wird Denken wieder zugänglicher.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei der Überflutung geht",
        calloutText:
          "Emotionale Überflutung ist keine Absicht, sondern eine neurobiologische Reaktion. Das Gehirn braucht Zeit, um wieder klar zu denken.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Was die Grafik verständlich machen will",
        calloutText:
          "Wenn Alarm übernimmt, wird Denken enger. Mit Beruhigung kommt Schritt für Schritt wieder mehr Zugang zu Reflexion und Gespräch zurück.",
      },
      {
        title: "3 Schritte zur Beruhigung",
        cards: [
          {
            title: "1. Atmen und Wahrnehmen",
            text: "4 Sekunden ein, 6 Sekunden aus. Benennen Sie, was Sie spüren.",
          },
          {
            title: "2. Pausieren und Bewegen",
            text: "Raum wechseln, kurz gehen, Wasser trinken.",
          },
          {
            title: "3. Fokus und Einordnen",
            text: "Erst wenn der Körper ruhig ist, kann das Gespräch weitergehen.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Porges (2011); LeDoux (1996).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("kinder", {
    kicker: "Textversion",
    summary:
      "Kinder merken meist, dass etwas anders ist. Eine altersgerechte Erklärung schafft Sicherheit, nimmt Schuld und stärkt das Vertrauen.",
    intro: [
      "Wenn Kinder grosse Gefühle in der Familie miterleben, brauchen sie einfache Worte und verlässliche Entlastung. Diese Orientierung unterstützt Angehörige beim kindgerechten Erklären und Schützen.",
      "Sie finden zuerst die entlastende Grundhaltung, dann altersbezogene Erklärungen, Hinweise für Geschwisterkinder, Schutzfaktoren und einen Merksatz, der Kinder konsequent von Verantwortung entlastet.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Worum es im Handout geht",
        calloutText:
          "Kinder spüren, dass etwas anders ist – auch wenn niemand darüber spricht. Schweigen schützt sie nicht. Eine altersgerechte Erklärung gibt ihnen Sicherheit, nimmt ihnen die Schuld und stärkt das Vertrauen.",
      },
      {
        title: "So können Sie es erklären – nach Alter",
        cards: [
          {
            title: "4–7 Jahre: Bildsprache",
            text: "«Mama/Papa hat manchmal ganz grosse Gefühle – wie ein Sturm im Kopf. Das ist nicht deine Schuld. Wir sind für dich da.» Vermeiden Sie das Wort krank und sprechen Sie von grossen Gefühlen.",
          },
          {
            title: "8–12 Jahre: Einfache Erklärung",
            text: "«Das Gehirn verarbeitet Gefühle anders. Es gibt Fachleute, die helfen. Es ist nicht deine Aufgabe, Mama/Papa besser zu machen.» Benennen Sie klar: Das Kind trägt keine Verantwortung.",
          },
          {
            title: "13+ Jahre: Ehrliches Gespräch",
            text: "«Mama/Papa hat eine Diagnose, die Borderline heisst. Gefühle werden extrem stark erlebt. Es ist behandelbar. Du darfst Fragen stellen – jederzeit.» Bieten Sie an, gemeinsam verlässliche Infos zu lesen.",
          },
        ],
      },
      {
        title: "Wenn ein Geschwisterkind betroffen ist",
        bullets: [
          "Unter 12: Dein Bruder/deine Schwester braucht mehr Hilfe. Du bist genauso wichtig.",
          "12+: Du musst nicht die Rolle der Erwachsenen übernehmen. Deine Gefühle sind erlaubt.",
        ],
      },
      {
        title: "3 Schutzfaktoren für Kinder",
        cards: [
          {
            title: "Stabilität",
            text: "Verlässliche Bezugsperson. Routinen beibehalten.",
          },
          {
            title: "Offenheit",
            text: "Erklären statt schweigen. Gefühle aktiv erfragen.",
          },
          {
            title: "Entlastung",
            text: "Du bist nicht schuld. Eigene Freiräume geben.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Ein Satz, der immer wieder gesagt werden darf",
        calloutText:
          "«Du bist nicht schuld. Und du musst das nicht allein verstehen.» Dieser Satz darf in jeder Altersgruppe fallen – so oft wie nötig.",
      },
    ],
    sourceLine:
      "Quellen: [1] Lenz, A. (2014): Kinder psychisch kranker Eltern. Hogrefe. [2] Mattejat, F. & Lisofsky, B. (2008): Nicht von schlechten Eltern. Balance Verlag. [3] BApK: Geschwister psychisch erkrankter Menschen.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 09.02.2026.",
  }),
];
