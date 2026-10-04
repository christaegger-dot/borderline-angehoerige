import { createHandoutTextVersion } from "./shared";
import { kontaktByIdStrict } from "@/data/kontakte";

// Krisennummern aus der Single Source (kontakte.ts); umgebender Text bleibt
// die eigene Stimme dieses Handouts. Nur die Ziffern werden gebunden.
const n = (id: string) => kontaktByIdStrict(id).nummer;

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
        title: "5. Wenn es nicht mehr Gespräch, sondern Krise ist",
        cards: [
          {
            title: "Akut / unmittelbare Gefahr",
            text: `Bei Lebensgefahr, laufender Selbstgefährdung, schwerer Verletzung oder schwerer Intoxikation: ${n("ROT_144")}. Bei Gewalt oder akuter Bedrohung: ${n("ROT_117")}.`,
          },
          {
            title: "Psychiatrische Krise ohne unmittelbare Lebensgefahr",
            text: `PUK Zürich 24/7: Erwachsene ${n("GELB_PUK_ERW")}, Kinder/Jugendliche ${n("GELB_PUK_KJP")}, ab 65 Jahren ${n("GELB_PUK_65")}.`,
          },
          {
            title: "Entlastung / Beratung",
            text: `Die Dargebotene Hand ${n("GRUEN_143")} ist für ein entlastendes Gespräch da. Pro Mente Sana ${n("INFO_PROMENTE")} ist Beratung und Information, kein akuter Einsatzdienst.`,
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Mason, P. T. & Kreger, R. (2014); Linehan, M. M. (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("anspannungskurve", {
    kicker: "Textversion",
    summary:
      "Die Anspannungskurve hilft einzuschätzen, wann ein Gespräch möglich ist und wann zuerst Ruhe, weniger Druck oder eine Pause hilfreicher sind.",
    intro: [
      "Nicht jedes Gespräch ist in jedem Moment möglich. Wenn Anspannung steigt, wird Zuhören schwerer, Denken enger und Perspektivwechsel seltener erreichbar.",
      "Die Kurve unterscheidet Rückzug, Gesprächsfähigkeit und zu viel Alarm. Sie unterstützt Angehörige dabei, nicht weiter zu drücken, wenn gerade wenig ankommt.",
    ],
    sections: [
      {
        title: "Merksatz",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText: "Wenn die Anspannung steigt, kommen weniger Worte an.",
      },
      {
        title: "Rückzug",
        calloutTitle: "Gerade kommt wenig an",
        calloutText:
          "Schweigen, Leere, Wegsehen, Erstarren oder innerer Rückzug können zeigen: Mehr Druck hilft jetzt nicht.",
      },
      {
        title: "Im Gespräch",
        calloutTitle: "Wir können sprechen",
        calloutText:
          "Zuhören, kurze Sätze, Perspektivwechsel und Absprachen sind eher erreichbar.",
      },
      {
        title: "Zu viel Alarm",
        calloutTitle: "Es ist gerade zu viel",
        calloutText:
          "Druck, Vorwürfe, laute Stimme, Drängen oder körperliche Anspannung können ein Gespräch verengen.",
      },
      {
        title: "Was Angehörigen hilft",
        bullets: [
          "Nicht weiterargumentieren.",
          "Langsamer sprechen.",
          "Kurze Sätze verwenden.",
          "Eine Pause mit Rückkehrzeit anbieten.",
          "Auch auf die eigene Anspannung achten.",
          "Das Gespräch später wieder aufnehmen.",
        ],
      },
      {
        title: "Drei Sätze für die Kurve",
        cards: [
          {
            title: "Bei Rückzug",
            text: "«Ich lasse dir Raum. Ich bin um [Uhrzeit] wieder ansprechbar.»",
          },
          {
            title: "Im Gespräch",
            text: "«Ich möchte verstehen. Lass uns bei einer Sache bleiben.»",
          },
          {
            title: "Bei Alarm",
            text: "«Ich merke, es ist gerade zu viel. Ich spreche langsamer.»",
          },
        ],
      },
      {
        title: "Warum Pausen helfen",
        bullets: [
          "Pausen senken Anspannung und öffnen wieder mehr Spielraum für Zuhören und Denken.",
          "Ein klarer Rückkehrzeitpunkt gibt Sicherheit und schützt die Beziehung.",
          "Eine Pause ist kein Rückzug aus der Beziehung, sondern eine Investition in sie.",
        ],
      },
      {
        title: "Schutzsatz",
        calloutTitle: "Erst wieder ansprechbar werden",
        calloutText: "Erst wieder ansprechbar werden – dann klären.",
      },
    ],
    sourceLine:
      "Quellen: Linehan, M. M.; Carpenter/Trull; NICE CG78; Hoffman, P. D. et al. (2005), Family Connections; Siegel/Ogden als didaktisches Modell; Stand by You / Sotomo (2024).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 25.05.2026.",
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
            text: "Dahinter stehen oft Verlustangst und Verzweiflung. Mögliche Antwort: «Ich höre, wie verzweifelt du bist. Ich bleibe damit nicht allein und hole jetzt Hilfe dazu.» Solche Sätze immer ernst nehmen: Bei unmittelbarer Gefahr nicht weiterdiskutieren, sondern professionelle Hilfe einbeziehen.",
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
      "Quellen: [1] Berkowitz, C. & Gunderson, J. G., BPD Family Guidelines (NEABPD). [2] American Psychiatric Association, DSM-5-TR (2022). [3] Linehan, M. M. (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 09.02.2026.",
  }),
  createHandoutTextVersion("gespraeche-kippen", {
    kicker: "Textversion",
    summary:
      "Wenn Gespräche kippen, können kurze Schritte helfen: das eigene Tempo senken, vorsichtig Kontakt anbieten und die eigene Grenze schützen.",
    intro: [
      "Wenn Gespräche kippen, kann eine kurze Struktur hilfreicher sein als eine lange Erklärung. Die drei Schritte sind Wahlmöglichkeiten, kein festes Rezept: Sie dürfen einzelne Schritte auslassen, eine Pause machen oder das Gespräch beenden.",
      "Sie finden drei mögliche Schritte, einen Pausenplan mit freier Rückkehrentscheidung, eine Kernaussage und alltagsnahe Hinweise.",
    ],
    visualization: {
      kind: "conversation-path",
      title: "Wenn Gespräche kippen",
      lead: "Drei mögliche Schritte können helfen, ein angespanntes Gespräch zu verlangsamen und die eigene Grenze zu schützen.",
      longDescription:
        "Die eigene didaktische Darstellung zeigt drei wählbare Schritte: das eigene Tempo senken, das Erleben des Gegenübers vorsichtig spiegeln und die eigene Grenze benennen. Angehörige dürfen Schritte auslassen, eine Pause ohne Rückkehrversprechen machen oder das Gespräch beenden. Bei Bedrohung oder Gewalt gilt Schutz vor Gesprächstechnik. Bei vermuteter akuter Selbstgefährdung soll professionelle Hilfe beigezogen werden; Angehörige bleiben nur bei der Person, wenn ihre eigene Sicherheit gewährleistet ist.",
      safetyTitle: "Schutz und Akuthilfe vor Gesprächstechnik",
      safetyBulletStartsWith: "Bei Bedrohung oder Gewalt",
      sections: {
        keyStatement: "Kernaussage",
        steps: "Die 3 Schritte",
        pausePlan: "Wenn es kippt: Mini-Plan",
        actions: "Was können Sie tun?",
      },
    },
    sections: [
      {
        title: "Die 3 Schritte",
        cards: [
          {
            title: "Schritt 1: Beruhigen",
            text: "Wenn es Ihnen möglich ist: Atmen Sie durch, sprechen Sie langsamer oder sagen Sie zunächst nichts.",
          },
          {
            title: "Schritt 2: Verbinden",
            text: "Spiegeln Sie vorsichtig, ohne ein Gefühl als Tatsache festzulegen: «Das klingt gerade sehr belastend. Verstehe ich dich richtig?»",
          },
          {
            title: "Schritt 3: Begrenzen oder beenden",
            text: "«Ich möchte so nicht weiterreden. Ich beende das Gespräch jetzt.» Ein neues Gespräch ist nur eine Möglichkeit, keine Pflicht.",
          },
        ],
      },
      {
        title: "Wenn es kippt: Mini-Plan",
        bullets: [
          "Benennen Sie knapp, dass Sie jetzt Abstand oder eine Pause brauchen.",
          "Entscheiden Sie später in Ruhe, ob und wann ein neuer Kontakt für Sie möglich und sicher ist.",
          "Nur wenn Sie es wirklich möchten, können Sie einen Rückkehrzeitpunkt anbieten. Ein Versprechen ist nicht erforderlich.",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Kurze, ruhige Sätze können unter Anspannung leichter ankommen als lange Argumente. Keine Formulierung garantiert eine bestimmte Reaktion.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Die Reihenfolge zählt",
        calloutText:
          "Die drei Schritte sind ein Angebot, keine Pflichtfolge. Wählen Sie, was in der Situation möglich ist; Schutz und Ihre eigene Grenze gehen vor.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Üben Sie die drei Schritte in ruhigen Momenten, damit sie unter Anspannung verfügbarer sind.",
          "Halten Sie Sätze so kurz, dass Sie sie im Stress wiederholen können.",
          "Bereiten Sie einen Pausensatz ohne Rückkehrversprechen vor: «Ich beende das Gespräch jetzt und entscheide später, ob und wann ich wieder ansprechbar bin.»",
          "Bei Bedrohung oder Gewalt: Beenden Sie das Gespräch, schaffen Sie Abstand und bringen Sie sich in Sicherheit. Bei vermuteter akuter Selbstgefährdung: Beenden Sie die Gesprächstechnik und ziehen Sie umgehend professionelle Hilfe bei; bleiben Sie nur bei der Person, wenn Ihre eigene Sicherheit gewährleistet ist.",
        ],
      },
    ],
    sourceLine:
      "Fachliche Bezugspunkte: Mason, P. T. & Kreger, R. (2014); Linehan, M. M. (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 04.10.2026.",
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
          "Nicht in lange Rechtfertigungen gehen. Nicht in Streitlogik einsteigen. Klar sagen, was ist, welche Grenze gilt und was als Nächstes passiert.",
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
          "Bei Gewalt oder Bedrohung braucht es keine Gesprächsformel, sondern Abstand, Schutz und Hilfe.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason, P. T. & Kreger, R. (2014).",
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
        calloutText:
          "Bei Gewalt, akuter Selbstgefährdung oder unmittelbarer Gefahr keine Pausenverhandlung führen, sondern Hilfe holen. Lassen Sie eine akut gefährdete Person nicht ohne Hilfe oder professionelle Einschätzung allein, sofern Sie selbst sicher bleiben können.",
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
      "Quelle: Deeskalation nach DBT, Linehan, M. M. (1993); Mason, P. T. & Kreger, R. (2014).",
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
          "Ich kann zuhören, ohne allem zuzustimmen. Wenn das Gespräch kippt, mache ich eine Pause und komme wieder. Bei Gefahr gilt Schutz vor Gespräch.",
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
          "Sie dürfen gleichzeitig zuhören und Grenzen setzen; Validieren heisst nicht, verletzendes Verhalten gutzuheissen.",
        ],
      },
    ],
    sourceLine:
      "Quelle: Mason, P. T. & Kreger, R. (2014); Fruzzetti, A. E. (2006).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("beispiel-dialog", {
    kicker: "Textversion",
    summary:
      "Ein kurzer Beispiel-Dialog zeigt mögliche Sätze für vorsichtiges Spiegeln, eine klare Grenze und einen optionalen Wiedereinstieg.",
    intro: [
      "Der Beispiel-Dialog zeigt mögliche Sätze, kein Gesprächsrezept. Sie dürfen einzelne Schritte auslassen, das Gespräch beenden und selbst entscheiden, ob und wann ein neuer Kontakt möglich ist.",
      "Sie finden einen anpassbaren Dialogverlauf, eine Kernaussage und Hinweise für das eigene Üben.",
    ],
    visualization: {
      kind: "dialog-sequence",
      lead: "Ein möglicher Gesprächsweg: wahrnehmen, vorsichtig spiegeln, begrenzen – und nur wenn es passt wieder einsteigen.",
      longDescription:
        "Die eigene didaktische Darstellung beginnt mit dem Vorwurf «Du bist nie für mich da». Darauf folgen fünf mögliche Bewegungen: die Anspannung wahrnehmen, das Erleben vorsichtig und als Frage spiegeln, eine Grenze setzen, eine Pause ohne Rückkehrpflicht nehmen und – nur wenn es sicher und gewollt ist – einen neuen Kontakt anbieten. Das Blatt ist ein anpassbares Beispiel, kein Rezept; keine Formulierung garantiert den Verlauf. Bei Bedrohung oder Gewalt gilt Schutz vor Gesprächstechnik. Bei vermuteter akuter Selbstgefährdung soll professionelle Hilfe beigezogen werden.",
      safetyTitle: "Schutz und Akuthilfe vor Gesprächstechnik",
      safetyBulletStartsWith: "Bei Bedrohung oder Gewalt",
      sections: {
        keyStatement: "Kernaussage",
        dialog: "Dialogverlauf",
        adaptation: "Was der Dialog zeigt",
        actions: "Was können Sie tun?",
      },
    },
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
            text: "«Ich merke, dass unser Gespräch gerade sehr angespannt ist.»",
          },
          {
            title: "Vorsichtig spiegeln",
            text: "«Das klingt gerade sehr belastend. Verstehe ich dich richtig?»",
          },
          {
            title: "Grenze",
            text: "«Ich möchte nicht angeschrien werden. Ich beende das Gespräch jetzt.»",
          },
          {
            title: "Pause",
            text: "«Ich brauche jetzt Abstand. Ob und wann wir weiterreden, kläre ich später.»",
          },
          {
            title: "Optionaler Wiedereinstieg",
            text: "«Ich möchte wieder sprechen. Passt es für dich gerade?»",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Kurz und ruhig kann unter Anspannung leichter verständlich sein. Keine Formulierung garantiert eine bestimmte Reaktion.",
      },
      {
        title: "Was der Dialog zeigt",
        calloutTitle: "Nicht perfekt, sondern klar",
        calloutText:
          "Der Ablauf ist eine Auswahl möglicher Sätze, keine Pflichtfolge. Passen Sie die Sätze an, lassen Sie Schritte aus oder beenden Sie das Gespräch. Es gibt keine Rückkehrpflicht.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Lesen Sie den Dialog laut und markieren Sie die Sätze, die zu Ihrer Sprache passen.",
          "Üben Sie besonders einen klaren Grenz- und Pausensatz, der kein Rückkehrversprechen enthält.",
          "Ein späterer Wiedereinstieg ist nur sinnvoll, wenn er für Sie sicher und gewollt ist.",
          "Bei Bedrohung oder Gewalt: Beenden Sie den Dialog, schaffen Sie Abstand und bringen Sie sich in Sicherheit. Bei vermuteter akuter Selbstgefährdung: Beenden Sie die Gesprächstechnik und ziehen Sie umgehend professionelle Hilfe bei; bleiben Sie nur bei der Person, wenn Ihre eigene Sicherheit gewährleistet ist.",
        ],
      },
    ],
    sourceLine:
      "Fachliche Bezugspunkte: Mason, P. T. & Kreger, R. (2014); Fruzzetti, A. E. (2006).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 04.10.2026.",
  }),
];
