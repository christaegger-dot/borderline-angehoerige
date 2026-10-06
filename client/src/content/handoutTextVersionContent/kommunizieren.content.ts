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
            text: "«So kann ich nicht weiterreden. Ich beende das Gespräch jetzt.»",
          },
        ],
      },
      {
        title: "2. Der Standardsatz",
        calloutTitle: "Standardsatz",
        calloutText:
          "Ich sehe, dass du gerade sehr angespannt bist. Und gleichzeitig gilt: So kann ich nicht weiterreden. Ich beende das Gespräch jetzt.",
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
            text: "Benennen Sie den nächsten Schritt, den Sie selbst verantworten können: eine Pause, das Gesprächsende oder – nur wenn es für Sie sicher und gewollt ist – ein späteres Kontaktangebot.",
          },
        ],
      },
      {
        title: "4. Ausstiegssätze",
        calloutTitle: "Exit-Sätze",
        calloutText:
          "Ich beende das Gespräch jetzt. Ich entscheide später, ob und wann ich wieder ansprechbar bin. Bei Bedrohung oder Gewalt gehe ich auf Abstand und hole Hilfe.",
      },
      {
        title: "5. Wenn es nicht mehr Gespräch, sondern Krise ist",
        cards: [
          {
            title: "Akute Hilfe und Notfallkontakte",
            text: "Diese Textversion enthält keine Kontaktdaten. Bei akuter Gefahr oder wenn Sie die Dringlichkeit nicht sicher einschätzen können, finden Sie passende Anlaufstellen unter «Akute Hilfe und Notfallkontakte».",
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
      "Die Anspannungskurve ist eine redaktionelle Orientierung für Gespräche unter Belastung. Ob ein Gespräch gerade möglich und gewünscht ist, lässt sich daraus nicht sicher ablesen.",
    intro: [
      "Nicht jedes Gespräch ist in jedem Moment möglich. Hohe Anspannung kann Zuhören, Abwägen und Perspektivwechsel erschweren. Wie sich das zeigt, ist individuell und von aussen nicht sicher erkennbar.",
      "Die Kurve stellt Rückzug, Gespräch und Alarm beispielhaft dar. Sie ist kein validiertes Messinstrument und keine Beurteilung des Zustands einer Person. Fragen Sie nach, wenn es möglich und sicher ist, und beachten Sie auch Ihren eigenen Gesprächswunsch und Ihre Grenze.",
    ],
    sections: [
      {
        title: "Merksatz",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Bei hoher Anspannung können Worte schwerer ankommen. Sie dürfen eine Pause machen oder das Gespräch beenden.",
      },
      {
        title: "Rückzug",
        calloutTitle: "Gerade kommt wenig an",
        calloutText:
          "Schweigen, Wegsehen oder Erstarren können unterschiedliche Gründe haben. Sie erlauben keine sichere Einschätzung der Anspannung oder Gesprächsfähigkeit. Sie dürfen Druck vermeiden und Raum lassen.",
      },
      {
        title: "Im Gespräch",
        calloutTitle: "Wir können sprechen",
        calloutText:
          "Wenn beide Seiten möchten und ein respektvolles Gespräch möglich ist, können kurze Sätze, Zuhören und Absprachen hilfreich sein. Ruhiges Auftreten allein zeigt nicht sicher, wie es einer Person geht.",
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
          "Eine Pause oder ein Gesprächsende ohne Rückkehrversprechen benennen.",
          "Auch auf die eigene Anspannung achten.",
          "Später nur dann neuen Kontakt anbieten, wenn es für Sie sicher und gewollt ist.",
        ],
      },
      {
        title: "Drei Sätze für die Kurve",
        cards: [
          {
            title: "Bei Rückzug",
            text: "«Ich lasse dir Raum. Ob und wann wir wieder sprechen, können wir später neu entscheiden.»",
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
        title: "Was eine Pause ermöglichen kann",
        bullets: [
          "Eine Pause kann entlasten und Raum zum Zuhören und Denken schaffen. Ihre Wirkung ist individuell; sie kann zunächst auch Unsicherheit auslösen.",
          "Eine Pause kann Selbstschutz sein. Sie braucht weder ein Rückkehrversprechen noch eine Rechtfertigung.",
          "Ein späterer Kontakt ist möglich, wenn beide Seiten ihn möchten und er sicher erscheint.",
        ],
      },
      {
        title: "Schutzsatz",
        calloutTitle: "Ein Gespräch braucht Bereitschaft und Sicherheit",
        calloutText:
          "Klären Sie später, wenn beide Seiten sprechen möchten und können. Sie müssen keine Beruhigung erreichen oder einen neuen Kontakt versprechen.",
      },
    ],
    sourceLine:
      "Fachliche Bezugspunkte: Linehan, M. M.; Carpenter/Trull; NICE CG78; Hoffman, P. D. et al. (2005), Family Connections; Siegel/Ogden als didaktisches Modell; Stand by You / Sotomo (2024). Kurve und Beispiele: eigene redaktionelle Orientierung, kein validiertes Messinstrument.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Redaktionell aktualisiert: 06.10.2026; fachlich-redaktionelle Freigabe ausstehend.",
  }),
  createHandoutTextVersion("wenn-worte-treffen", {
    kicker: "Textversion",
    summary:
      "Harte oder vorwurfsvolle Aussagen können treffen. Diese Web-Version bleibt bei Wortlaut und Wirkung, bietet mögliche Antworten an und trennt ein suizidbezogenes Sicherheitssignal klar vom Gesprächskonflikt.",
    intro: [
      "Harte Vorwürfe können Angehörige stark verunsichern. Die Beispiele zeigen mögliche Antworten, ohne festzulegen, ob eine Aussage stimmt oder welches Motiv dahintersteht.",
      "Die Sätze sind Beispiele und nicht typisch für alle Menschen mit Borderline. Belastung anzuerkennen bedeutet nicht, einer Behauptung zuzustimmen oder verletzende Sprache hinzunehmen.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Bei Aussage und Wirkung bleiben",
        calloutText:
          "Von aussen lässt sich nicht sicher erkennen, was hinter einem Satz steht. Sie können Belastung wahrnehmen, die Aussage anders beurteilen und zugleich Ihre Grenze benennen.",
      },
      {
        title: "4 belastende Aussagen – mögliche Antworten",
        cards: [
          {
            title: "«Du bist schuld, dass es mir so schlecht geht.»",
            text: "Sie müssen diese Zuschreibung nicht übernehmen. Mögliche Antwort: «Ich höre, dass es dir schlecht geht. Ich sehe die Ursache anders. Wir können darüber sprechen, wenn wir respektvoll bleiben.»",
          },
          {
            title: "«Du verstehst mich sowieso nicht.»",
            text: "Mögliche Antwort: «Vielleicht verstehe ich nicht alles. Wenn du möchtest, sag mir, was dir gerade besonders wichtig ist.» Sie dürfen zugleich entscheiden, wie viel Sie in diesem Moment aufnehmen können.",
          },
          {
            title: "«Du bist genau wie alle anderen.»",
            text: "Mögliche Antwort: «Ich höre, dass du enttäuscht bist. Ich bin ich und erlebe die Situation anders.» Sie müssen die Aussage weder widerlegen noch als Diagnosemerkmal deuten.",
          },
          {
            title: "«Ohne dich wäre alles besser.»",
            text: "Dieser Satz kann verletzen. Mögliche Antwort: «Das ist ein harter Satz. Ich beende das Gespräch jetzt. Wir können später weiterreden, wenn ein respektvolles Gespräch möglich ist.»",
          },
        ],
      },
      {
        title: "Separates Sicherheitssignal",
        calloutTitle: "Wenn Suizid angesprochen wird",
        calloutText:
          "Eine Aussage wie «Wenn du gehst, bringe ich mich um» gehört nicht in eine Liste von Vorwürfen. Nehmen Sie sie ernst und holen Sie eine professionelle Einschätzung oder Hilfe dazu. Versuchen Sie nicht, Motiv oder Gefährdung allein zu beurteilen; nutzen Sie bei akuter Gefahr die separat ausgewiesenen Krisen- und Notfallwege. Ihre eigene Sicherheit bleibt wichtig.",
      },
      {
        title: "Merksatz",
        calloutTitle: "Anerkennen, ohne Motive festzulegen",
        calloutText:
          "Eine Aussage ist keine verlässliche Auskunft über ein verborgenes Motiv. Sie dürfen Belastung anerkennen, anders denken und sich gleichzeitig schützen.",
      },
    ],
    sourceLine:
      "Fachliche Bezugspunkte: Berkowitz, C. & Gunderson, J. G., BPD Family Guidelines (NEABPD); Linehan, M. M. (1993). Beispiele und Antwortsätze: eigene didaktische Darstellung.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 04.10.2026.",
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
      lead: "Drei mögliche Schritte können helfen, ein angespanntes Gespräch zu verlangsamen und die eigene Grenze zu schützen. Sie sind ein Angebot, keine Pflichtfolge: Schritte dürfen ausgelassen und Gespräche beendet werden.",
      longDescription:
        "Die eigene didaktische Darstellung zeigt drei wählbare Schritte: das eigene Tempo senken, das Erleben des Gegenübers vorsichtig spiegeln und die eigene Grenze benennen. Angehörige dürfen Schritte auslassen, eine Pause ohne Rückkehrversprechen machen oder das Gespräch beenden. Bei Bedrohung oder Gewalt gilt Schutz vor Gesprächstechnik. Die Website nimmt keine Risikoeinschätzung vor; Angehörige müssen die Dringlichkeit nicht allein beurteilen oder bewältigen. Hinweise zu passenden Anlaufstellen finden Sie unter «Akute Hilfe und Notfallkontakte».",
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
            title: "Schritt 1: Eigenes Tempo senken",
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
          "Kurze, ruhige Sätze können unter Anspannung leichter ankommen als lange Argumente. Die Schritte sind ein Angebot, keine Pflichtfolge; keine Formulierung garantiert eine bestimmte Reaktion.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Sie entscheiden, welche Schritte gerade passen",
        calloutText:
          "Die drei Schritte sind ein Angebot, keine Pflichtfolge. Wählen Sie, was in der Situation möglich ist; Schutz und Ihre eigene Grenze gehen vor.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Wenn Sie möchten, üben Sie in ruhigen Momenten einen oder mehrere passende Schritte, damit sie unter Anspannung verfügbarer sind.",
          "Halten Sie Sätze so kurz, dass Sie sie im Stress wiederholen können.",
          "Bereiten Sie einen Pausensatz ohne Rückkehrversprechen vor: «Ich beende das Gespräch jetzt und entscheide später, ob und wann ich wieder ansprechbar bin.»",
          "Bei Bedrohung oder Gewalt: Beenden Sie das Gespräch, schaffen Sie Abstand und bringen Sie sich in Sicherheit. Bei Sorgen um Sicherheit oder Unsicherheit finden Sie passende Anlaufstellen unter «Akute Hilfe und Notfallkontakte». Sie müssen die Dringlichkeit nicht allein beurteilen oder bewältigen.",
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
            text: "Nennen Sie den nächsten Schritt konkret und in Ihrer Kontrolle. Beispiel: «Ich beende das Gespräch jetzt und entscheide später, ob ich wieder ansprechbar bin.»",
          },
        ],
      },
      {
        title: "Beispielsatz",
        calloutTitle: "Kurzform des Handouts",
        calloutText:
          "Es eskaliert gerade. Ich beende das Gespräch jetzt. Ob und wann ein neuer Kontakt möglich ist, kläre ich später.",
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
      "Das Handout zeigt Beispiele für ruhigere und belastete Gespräche. Sie dürfen ein Gespräch unterbrechen oder beenden, wenn Sie eine Pause oder Schutz brauchen.",
    intro: [
      "Die Begriffe «stabil», «Warnstufe» und «Eskalation» sind eine redaktionelle Orientierung. Sie beschreiben keine verbindlichen Stufen und erlauben keine sichere Beurteilung des inneren Zustands einer Person. Eine Pause kann entlasten; ihre Wirkung ist individuell.",
      "Sie finden beispielhafte Beobachtungen, die Kernaussage und praktische Hinweise. Sie dürfen auch bei einem ruhig wirkenden Gespräch auf Ihre eigene Belastung, Bereitschaft und Grenze achten.",
    ],
    sections: [
      {
        title: "Stabil",
        bullets: [
          "Gespräch möglich.",
          "Zuhören funktioniert.",
          "Körper entspannt.",
          "Wenn beide Seiten möchten, können Sie das Gespräch fortsetzen.",
          "Sie dürfen auch eine Pause machen oder es beenden, bevor es eskaliert.",
          "«Ich brauche jetzt eine Pause und unterbreche das Gespräch.»",
          "Nutzen Sie klare, kurze Sätze.",
        ],
      },
      {
        title: "Warnstufe",
        bullets: [
          "Stimme wird lauter.",
          "Vorwürfe beginnen.",
          "Körper spannt sich an.",
          "Kündigen Sie früh an: «Ich merke, es wird schwierig. Ich unterbreche das Gespräch jetzt.»",
        ],
      },
      {
        title: "Eskalation",
        bullets: [
          "Schreien, Beschimpfungen, Drohungen oder anderes grenzüberschreitendes Verhalten.",
          "Ein respektvolles Gespräch ist in diesem Moment nicht möglich.",
          "Jetzt stoppen und Abstand schaffen.",
          "«Ich unterbreche das Gespräch jetzt. Ob und wann ich wieder ansprechbar bin, entscheide ich später.»",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Ich stoppe jetzt. Ich darf ein Gespräch unterbrechen oder beenden, wenn ich eine Pause oder Abstand brauche.",
      },
      {
        title: "Zusatzhinweis",
        calloutTitle: "Bei Gefahr",
        calloutText:
          "Bei Gewalt oder Bedrohung schaffen Sie Abstand und bringen sich in Sicherheit. Bei Sorgen um Sicherheit oder Unsicherheit finden Sie passende Anlaufstellen unter «Akute Hilfe und Notfallkontakte». Sie müssen die Dringlichkeit nicht allein beurteilen und tragen nicht allein die Verantwortung für Überwachung oder Sicherung.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Was in welcher Stufe hilft",
        calloutText:
          "Stabil: sprechen, solange es für beide Seiten möglich ist. Warnstufe: Pause ankündigen. Eskalation: Gespräch stoppen und Abstand schaffen. Ein späterer Kontakt ist keine Pflicht.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Definieren Sie Ihre persönliche Warnstufe: Woran merken Sie, dass es kippt?",
          "Üben Sie einen Stopp-Satz, der für Sie natürlich klingt.",
          "Planen Sie einen Ausstiegssatz ohne Rückkehrversprechen, damit Sie ihn unter Stress nicht erst suchen müssen.",
        ],
      },
    ],
    sourceLine:
      "Quelle: Deeskalation nach DBT, Linehan, M. M. (1993); Mason, P. T. & Kreger, R. (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Redaktionell aktualisiert: 06.10.2026; fachlich-redaktionelle Freigabe ausstehend.",
  }),
  createHandoutTextVersion("zuhoeren-ohne-zustimmen", {
    kicker: "Textversion",
    summary:
      "Anerkennen heisst nicht automatisch zustimmen. Sie können Gefühle wahrnehmen, ohne pauschale Schuld zu übernehmen oder eine Deutung teilen zu müssen.",
    intro: [
      "Zuhören ohne Zustimmen zeigt, wie Anerkennung möglich ist, ohne die eigene Sicht aufzugeben. So kann ein Gespräch respektvoller werden, ohne dass Grenzen verschwimmen.",
      "Sie finden anerkennende Sätze, Beispiele für pauschale Schuldübernahme, eine Grenze mit Plan, die Kernaussage und kurze Übungshinweise.",
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
        title: "Pauschale Schuld nicht übernehmen",
        intro:
          "Sie müssen keine pauschale Schuldzuweisung übernehmen. Wenn Sie selbst etwas Verletzendes gesagt oder getan haben, können Sie dafür Verantwortung übernehmen und sich entschuldigen. Das bedeutet nicht, für die Erkrankung oder Genesung der anderen Person verantwortlich zu sein.",
        bullets: [
          "Du hast recht, ich bin an allem schuld.",
          "Okay, dann mache ich es so, wie du willst.",
        ],
      },
      {
        title: "Grenze + Plan",
        calloutTitle: "Kombination aus Respekt und Selbstschutz",
        calloutText:
          "Ich kann zuhören, ohne allem zuzustimmen. Wenn das Gespräch kippt, beende ich es. Ob und wann ein neuer Kontakt möglich ist, entscheide ich später. Bei Gefahr gilt Schutz vor Gespräch.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Sie können Gefühle anerkennen, ohne die Interpretation zu übernehmen. Das ist keine Lüge, sondern Respekt.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Gefühl anerkennen, Deutung offenlassen",
        calloutText:
          "Sie können sagen, dass der Schmerz real ist, ohne automatisch die ganze Erklärung zu teilen oder pauschale Schuld zu übernehmen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Üben Sie Sätze wie: «Ich sehe, dass es dir nicht gut geht.» und lassen Sie diesen Satz erst einmal stehen.",
          "Trennen Sie Gefühl und Deutung: Das Gefühl ist real; die Deutung müssen Sie nicht teilen.",
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
        "Die eigene didaktische Darstellung beginnt mit dem Vorwurf «Du bist nie für mich da». Darauf folgen fünf mögliche Bewegungen: die Anspannung wahrnehmen, das Erleben vorsichtig und als Frage spiegeln, eine Grenze setzen, eine Pause ohne Rückkehrpflicht nehmen und – nur wenn es sicher und gewollt ist – einen neuen Kontakt anbieten. Das Blatt ist ein anpassbares Beispiel, kein Rezept; keine Formulierung garantiert den Verlauf. Bei Bedrohung oder Gewalt gilt Schutz vor Gesprächstechnik. Die Website nimmt keine Risikoeinschätzung vor; Angehörige müssen die Dringlichkeit nicht allein beurteilen oder bewältigen. Hinweise zu passenden Anlaufstellen finden Sie unter «Akute Hilfe und Notfallkontakte».",
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
            text: "«Ich möchte dieses Gespräch so nicht weiterführen. Ich beende es jetzt.»",
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
          "Bei Bedrohung oder Gewalt: Beenden Sie den Dialog, schaffen Sie Abstand und bringen Sie sich in Sicherheit. Bei Sorgen um Sicherheit oder Unsicherheit finden Sie passende Anlaufstellen unter «Akute Hilfe und Notfallkontakte». Sie müssen die Dringlichkeit nicht allein beurteilen oder bewältigen.",
        ],
      },
    ],
    sourceLine:
      "Fachliche Bezugspunkte: Mason, P. T. & Kreger, R. (2014); Fruzzetti, A. E. (2006).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 04.10.2026.",
  }),
];
