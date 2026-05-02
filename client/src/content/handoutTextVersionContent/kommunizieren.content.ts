import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("krisenkommunikation", {
    kicker: "Textversion",
    summary:
      "Wenn Gespräche kippen, helfen Verbindung, kurze Orientierung und eine klare Grenze oft mehr als langes Argumentieren.",
    intro: [
      "Diese Seite macht den «Spickzettel Krisenkommunikation» such- und kopierbar. Die Struktur bleibt knapp und bildschirmfreundlich, damit Sie die Sätze in angespannten Momenten schnell finden.",
      "Die Grundidee ist bewusst knapp gehalten: zuerst Verbindung herstellen, dann Kontakt halten, dann Grenze und nächsten Schritt benennen.",
    ],
    sections: [
      {
        title: "1. Die 3 Schritte",
        cards: [
          {
            title: "Verbinden",
            text: "«Ich sehe, dass du gerade sehr aufgebracht bist.»",
          },
          {
            title: "Kontakt",
            text: "«Das klingt belastend. Ich bin hier.»",
          },
          {
            title: "Grenze + Plan",
            text: "«So kann ich nicht weiterreden. Pause 10 Min, dann weiter.»",
          },
        ],
      },
      {
        title: "2. Der Standardsatz",
        calloutTitle: "Standardsatz",
        calloutText:
          "Ich sehe, dass du gerade sehr angespannt bist. Und gleichzeitig gilt: So reden wir nicht. Pause 10 Minuten, dann weiter.",
      },
      {
        title: "3. Grenzen setzen",
        intro:
          "Die Grafik verdichtet Grenzsetzung auf drei Bausteine: erst benennen, was gerade passiert, dann Ihre Grenze, dann den nächsten Schritt.",
        cards: [
          {
            title: "Fakt",
            text: "Beschreiben Sie kurz und sachlich, was gerade geschieht, statt in Motive oder Gegenangriffe einzusteigen.",
          },
          {
            title: "Ich-Grenze",
            text: "Sagen Sie klar, was so für Sie nicht geht oder wo Sie das Gespräch unterbrechen müssen.",
          },
          {
            title: "Nächster Schritt",
            text: "Formulieren Sie, wie es konkret weitergeht: Pause, Uhrzeit oder nächster Kontaktpunkt.",
          },
        ],
      },
      {
        title: "4. Exit-Sätze",
        calloutTitle: "Exit-Sätze",
        calloutText:
          "Ich gehe nicht weg, ich mache nur eine Pause. Wir sprechen um [Uhrzeit] weiter. Ich bin wieder da.",
      },
      {
        title: "5. Notfallnummern",
        bullets: [
          "Dargebotene Hand 143",
          "Pro Mente Sana 0848 800 858",
          "Notfall PUK Zürich 044 384 21 11",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Linehan (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("wenn-worte-treffen", {
    kicker: "Textversion",
    summary:
      "Schuldzuweisungen treffen oft hart, sagen aber meist mehr über Schmerz, Angst oder Hilflosigkeit als über Ihren Wert. Die Web-Version zeigt fünf häufige Sätze und ruhigere Antworten darauf.",
    intro: [
      "Harte Vorwürfe können Angehörige stark verunsichern. Die fünf Schuldzuweisungen helfen, typische Sätze einzuordnen und innerlich etwas mehr Abstand zu behalten.",
      "Sie finden eine entlastende Grundhaltung, fünf typische Schuldzuweisungen mit möglicher Einordnung und Antwort sowie einen abschliessenden Merksatz, der Mitgefühl und Selbstschutz zusammenhält.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Worum es im Handout geht",
        calloutText:
          "Schuldzuweisungen sind keine Tatsachen. Sie sind Ausdruck von Schmerz, der keinen anderen Weg findet. Das zu wissen schützt Sie – ohne den Schmerz des anderen zu entwerten.",
      },
      {
        title: "5 häufige Schuldzuweisungen – und was dahintersteckt",
        cards: [
          {
            title: "«Du bist schuld, dass es mir so schlecht geht.»",
            text: "Dahinter stehen oft Überforderung und Hilflosigkeit. Mögliche Antwort: «Ich sehe, dass es dir schlecht geht. Ich bin nicht die Ursache – aber ich bin da.»",
          },
          {
            title: "«Wenn du gehst, bringe ich mich um.»",
            text: "Dahinter stehen oft Verlustangst und Verzweiflung. Mögliche Antwort: «Ich höre, wie verzweifelt du bist. Ich bleibe damit nicht allein und hole jetzt Hilfe dazu.» Solche Sätze immer ernst nehmen.",
          },
          {
            title: "«Du verstehst mich sowieso nicht.»",
            text: "Dahinter stehen oft Einsamkeit und Enttäuschung. Mögliche Antwort: «Vielleicht verstehe ich nicht alles. Aber ich versuche es. Erzähl mir mehr.»",
          },
          {
            title: "«Du bist genau wie alle anderen.»",
            text: "Dahinter stehen oft Angst vor Ablehnung und Spaltung. Mögliche Antwort: «Das tut mir weh. Ich bin hier, weil du mir wichtig bist – auch wenn es gerade schwierig ist.»",
          },
          {
            title: "«Ohne dich wäre alles besser.»",
            text: "Dahinter stehen oft Scham und nach aussen gerichteter Selbsthass. Mögliche Antwort: «Das ist ein harter Satz. Ich bleibe trotzdem. Aber ich brauche auch Respekt.»",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Mitfühlen und sich gleichzeitig schützen",
        calloutText:
          "Der Satz sagt etwas über den Schmerz – nicht über Sie. Sie dürfen mitfühlen und sich gleichzeitig schützen.",
      },
    ],
    sourceLine:
      "Quellen: [1] Gunderson & Berkowitz, BPD Family Guidelines (NEABPD). [2] APA, DSM-5. [3] Linehan (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 09.02.2026.",
  }),
  createHandoutTextVersion("gespraeche-kippen", {
    kicker: "Textversion",
    summary:
      "Wenn Gespräche kippen, helfen oft nicht mehr Erklärungen, sondern drei kurze Schritte: beruhigen, verbinden, begrenzen.",
    intro: [
      "Wenn Gespräche kippen, hilft eine kurze Struktur mehr als lange Erklärungen. Die Schritte unterstützen Angehörige dabei, früher zu verlangsamen und Eskalation zu vermeiden.",
      "Sie finden drei Schritte, einen kurzen Pausenplan für Kipppunkte, die Kernaussage des Blatts, eine kleine Merkhilfe und drei alltagsnahe Hinweise.",
    ],
    sections: [
      {
        title: "Die 3 Schritte",
        cards: [
          {
            title: "Schritt 1: Beruhigen",
            text: "Atmen Sie durch. Senken Sie Ihre Stimme. Verlangsamen Sie das Tempo.",
          },
          {
            title: "Schritt 2: Verbinden",
            text: "«Ich sehe, dass es dir gerade nicht gut geht. Ich bin da.» Benennen Sie das Gefühl, nicht das Verhalten.",
          },
          {
            title: "Schritt 3: Begrenzen + Plan",
            text: "«So kann ich nicht weiterreden. Pause 10 Minuten, dann sprechen wir weiter.»",
          },
        ],
      },
      {
        title: "Wenn es kippt: Mini-Plan",
        bullets: [
          "Kündigen Sie eine begrenzte Pause von 10 bis 30 Minuten an.",
          "Sagen Sie klar, dass Sie den Kontakt nicht abbrechen, sondern das Gespräch nur unterbrechen.",
          "Nennen Sie nach Möglichkeit schon jetzt, wann Sie wieder ansprechbar sind.",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Kurz, ruhig und wiederholbar wirkt in Krisen stärker als Argumente.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Die Reihenfolge zählt",
        calloutText:
          "Erst beruhigen, dann verbinden, dann begrenzen. In dieser Reihenfolge steigt die Chance, dass Ihr Satz überhaupt noch ankommt.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Üben Sie die drei Schritte in ruhigen Momenten, damit sie unter Anspannung verfügbarer sind.",
          "Halten Sie Sätze so kurz, dass Sie sie im Stress wiederholen können.",
          "Verbinden Sie jede Pause mit einer Rückkehr: «Wir sprechen um [Uhrzeit] weiter.»",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Linehan (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("grenzen-ohne-eskalation", {
    kicker: "Textversion",
    summary:
      "Die 3-Teile-Formel hält Grenzsetzung knapp: Fakt, Ich-Grenze, nächster Schritt. So bleiben Sie klar, ohne in Rechtfertigungen zu geraten.",
    intro: [
      "Die 3-Teile-Formel hilft, Grenzen klar anzusprechen, ohne in Streitlogik hineingezogen zu werden. Sie verbindet Anerkennung, Grenze und nächsten Schritt.",
      "Sie finden die Formel, ein knappes Beispiel, eine Kernaussage, eine kurze Merkhilfe und drei kurze Umsetzungshinweise.",
    ],
    sections: [
      {
        title: "Die 3-Teile-Formel",
        cards: [
          {
            title: "Fakt",
            text: "Beschreiben Sie kurz, was passiert. Objektiv, ohne Bewertung. Beispiel: «Es ist jetzt das dritte Mal, dass du mich anschreist.»",
          },
          {
            title: "Ich-Grenze",
            text: "Sagen Sie in einem Satz, was für Sie nicht geht. Beispiel: «So kann ich nicht weiterreden.»",
          },
          {
            title: "Nächster Schritt",
            text: "Nennen Sie den nächsten Schritt konkret und machbar. Beispiel: «Pause 10 Minuten, dann sprechen wir weiter.»",
          },
        ],
      },
      {
        title: "Beispielsatz",
        calloutTitle: "Kurzform des Handouts",
        calloutText:
          "Es eskaliert gerade. Ich bleibe ansprechbar, aber nicht im Streit. Pause 10 Min, dann weiter.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Nicht rechtfertigen. Nicht erklären. Nicht streiten. Einfach sagen, was ist.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Ein Satz pro Teil genügt",
        calloutText:
          "Je knapper Sie bleiben, desto eher bleibt Ihre Grenze hörbar: Fakt, Ich-Grenze, nächster Schritt.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Schreiben Sie zwei oder drei typische Grenzsätze vorab aus.",
          "Üben Sie die Formel laut in Ihrer eigenen Sprache.",
          "Bleiben Sie bei einem Satz pro Teil, auch wenn Gegenwind kommt.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("pause-statt-streit", {
    kicker: "Textversion",
    summary:
      "Nicht jede Anspannung ist noch gesprächsfähig. Das Handout unterscheidet stabil, Warnstufe und Eskalation und zeigt, wann Sie stoppen sollten.",
    intro: [
      "Pause statt Streit hilft, Kipppunkte früher zu erkennen. Der Schwerpunkt liegt darauf, rechtzeitig auszusteigen, bevor ein Gespräch beide Seiten weiter verletzt.",
      "Sie finden drei Zustände, die Kernaussage, eine kurze Orientierung und drei praktische Hinweise für den Alltag.",
    ],
    sections: [
      {
        title: "Stabil",
        bullets: [
          "Gespräch möglich.",
          "Zuhören funktioniert.",
          "Körper entspannt.",
          "Bleiben Sie im Gespräch.",
          "Nutzen Sie klare, kurze Sätze.",
        ],
      },
      {
        title: "Warnstufe",
        bullets: [
          "Stimme wird lauter.",
          "Vorwürfe beginnen.",
          "Körper spannt sich an.",
          "Kündigen Sie früh an: «Ich merke, es wird schwierig. Pause 10 Minuten.»",
        ],
      },
      {
        title: "Eskalation",
        bullets: [
          "Schreien, Beschimpfungen.",
          "Kontrolle geht verloren.",
          "Jetzt stoppen und Abstand schaffen.",
          "«Ich unterbreche das Gespräch jetzt. Wir sprechen um [Uhrzeit] weiter.»",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Ich stoppe jetzt – nicht weil ich aufgebe, sondern weil mir diese Beziehung wichtig ist.",
      },
      {
        title: "Zusatzhinweis",
        calloutTitle: "Bei Gefahr",
        calloutText: "Bei Gefahr: Notfallplan aktivieren.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Was in welcher Stufe hilft",
        calloutText:
          "Stabil: im Gespräch bleiben. Warnstufe: Pause ankündigen. Eskalation: Gespräch stoppen und Rückkehr vereinbaren.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Definieren Sie Ihre persönliche Warnstufe: Woran merken Sie, dass es kippt?",
          "Üben Sie einen Stopp-Satz, der für Sie natürlich klingt.",
          "Planen Sie Rückkehrsätze vorab, damit Sie sie unter Stress nicht erst suchen müssen.",
        ],
      },
    ],
    sourceLine:
      "Quelle: Deeskalation nach DBT, Linehan (1993); Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("zuhoeren-ohne-zustimmen", {
    kicker: "Textversion",
    summary:
      "Validieren ist nicht nachgeben. Sie können Gefühle anerkennen, ohne Schuld zu übernehmen oder der Interpretation zustimmen zu müssen.",
    intro: [
      "Zuhören ohne Zustimmen zeigt, wie Anerkennung möglich ist, ohne die eigene Sicht aufzugeben. So kann Verbindung entstehen, ohne dass Grenzen verschwimmen.",
      "Sie finden anerkennende Sätze, Beispiele für ungünstige Zustimmung, eine Grenze mit Plan, die Kernaussage und drei kurze Übungshinweise.",
    ],
    sections: [
      {
        title: "Anerkennen",
        bullets: [
          "Ich sehe, dass du gerade sehr leidest.",
          "Das klingt wirklich belastend für dich.",
          "Ich verstehe, dass du das so empfindest.",
        ],
      },
      {
        title: "Nicht zustimmen",
        intro:
          "Die folgenden Sätze wirken auf den ersten Blick beruhigend, kippen aber in Schuldübernahme oder Selbstaufgabe.",
        bullets: [
          "Du hast recht, ich bin schuld.",
          "Ja, ich hätte anders reagieren sollen.",
          "Okay, dann mache ich es so, wie du willst.",
        ],
      },
      {
        title: "Grenze + Plan",
        calloutTitle: "Kombination aus Respekt und Selbstschutz",
        calloutText:
          "Ich kann zuhören, ohne allem zuzustimmen. Wenn das Gespräch kippt, mache ich eine Pause und komme wieder.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Sie können Gefühle anerkennen, ohne die Interpretation zu übernehmen. Das ist keine Lüge, sondern Respekt.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Gefühl anerkennen, Deutung nicht schlucken",
        calloutText:
          "Sie können sagen, dass der Schmerz real ist, ohne automatisch die ganze Erklärung oder Schuld zu übernehmen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Üben Sie Sätze wie: «Ich sehe, dass es dir nicht gut geht.» und lassen Sie diesen Satz erst einmal stehen.",
          "Trennen Sie Gefühl und Inhalt: Das Gefühl ist echt, die Interpretation muss nicht stimmen.",
          "Bleiben Sie bei sich: Sie dürfen anderer Meinung sein, ohne das Gefühl abzuwerten.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Fruzzetti (2006).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("beispiel-dialog", {
    kicker: "Textversion",
    summary:
      "Ein kurzer Beispiel-Dialog zeigt, wie Verbinden, Kontakt, Grenze, Plan und Rückkehr in einem eskalierenden Gespräch zusammenspielen können.",
    intro: [
      "Der Beispiel-Dialog zeigt einen möglichen Gesprächsablauf Schritt für Schritt. Er ist hilfreich, wenn sich konkrete Sätze greifbarer anfühlen als reine Regeln.",
      "Sie finden einen kurzen Dialogverlauf, die Kernaussage und drei Hinweise für das eigene Üben.",
    ],
    sections: [
      {
        title: "Dialogverlauf",
        cards: [
          {
            title: "Vorwurf",
            text: "«Du bist nie für mich da! Du denkst nur an dich!»",
          },
          {
            title: "Verbinden",
            text: "«Ich sehe, dass du gerade sehr aufgebracht bist.»",
          },
          {
            title: "Kontakt",
            text: "«Das klingt wirklich belastend. Ich bin hier.»",
          },
          {
            title: "Grenze",
            text: "«So kann ich nicht weiterreden.»",
          },
          {
            title: "Plan",
            text: "«Ich mache jetzt 10 Minuten Pause. Wir sprechen um 15 Uhr weiter.»",
          },
          {
            title: "Rückkehr",
            text: "«Ich bin wieder da. Wie geht es dir jetzt?»",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Kurz, ruhig, wiederholbar. Nicht erklären, nicht rechtfertigen, nicht streiten.",
      },
      {
        title: "Was der Dialog zeigt",
        calloutTitle: "Nicht perfekt, sondern klar",
        calloutText:
          "Der Ablauf zeigt keine Zauberformel, sondern eine Richtung: erst wahrnehmen, dann Kontakt halten, dann Grenze und Rückkehr vereinbaren.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Lesen Sie den Dialog laut und markieren Sie die Sätze, die zu Ihrer Sprache passen.",
          "Üben Sie besonders Grenze und Rückkehr, weil genau diese beiden Schritte in Stress oft wegbrechen.",
          "Erinnern Sie sich: Es geht nicht um Perfektion, sondern um Richtung.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Fruzzetti (2006).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
];
