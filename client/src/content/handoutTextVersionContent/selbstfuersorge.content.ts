import revisedHandouts from "@/content/revisedHandouts.json";
import { warningSignalGroups } from "@/content/selbstfuersorge-page";
import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("warnsignale", {
    kicker: "Textversion",
    summary:
      "Veränderungen von Körper, Gefühlen, Gedanken oder Alltag können Anlass sein, Entlastung oder eine fachliche Abklärung zu suchen. Sie dürfen Unterstützung nutzen, sobald Sie sie brauchen.",
    intro: [
      "Die folgenden Anzeichen sind unspezifisch. Sie können bei Überlastung auftreten, aber auch andere körperliche oder psychische Ursachen haben. Aus Beschwerden allein lässt sich keine Stressursache ableiten.",
      "Die fünf Bereiche sind eine redaktionelle Ordnung zur Selbstbeobachtung, keine festen Belastungs- oder Sicherheitsstufen und kein validiertes Testinstrument. Sie erlauben keine Einschätzung der Dringlichkeit. Fehlende Anzeichen bedeuten keine Entwarnung; Unterstützung ist auch ohne Zuordnung zu einem Bereich möglich.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Überlastung kommt oft nicht plötzlich. Wie sich Belastung zeigt und verändert, ist individuell. Warnsignale sind Orientierung, keine Diagnose und kein Beweis, dass Sie zu wenig für sich tun.",
      },
      ...warningSignalGroups.map(group => ({
        title: group.title,
        bullets: group.items,
      })),
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "Entlastung ermöglichen",
            text: "Pausen, weniger Aufgaben oder praktische Hilfe können entlasten. Was passt und verfügbar ist, hängt von Ihrer Situation ab; Sie müssen Belastung nicht durch mehr Disziplin ausgleichen.",
          },
          {
            title: "Unterstützung früh nutzen",
            text: "Sie dürfen Beratung, Begleitung oder ein Gespräch suchen, sobald Sie das brauchen. Sie müssen weder eine bestimmte Anzahl von Anzeichen haben noch warten, bis Beschwerden stärker werden.",
          },
          {
            title: "Beschwerden fachlich abklären",
            text: "Wenn Beschwerden anhalten, stark sind oder Ihren Alltag beeinträchtigen, sprechen Sie mit Ihrer Hausärzt:in oder einer passenden Fachperson. Dabei können auch andere körperliche oder psychische Ursachen abgeklärt werden.",
          },
        ],
      },
      {
        title: "Bei Sorge um Sicherheit",
        calloutTitle: "Professionelle Hilfe einbeziehen",
        calloutText:
          "Wenn Sie sich nicht mehr sicher fühlen oder die Dringlichkeit nicht einschätzen können, wenden Sie sich an professionelle Hilfe. Warten Sie nicht auf bestimmte Warnzeichen. Passende Anlaufstellen finden Sie unter «Akute Hilfe und Notfallkontakte».",
      },
    ],
    sourceLine:
      "Fachliche Bezugspunkte: WHO (2026), Stress: Questions and answers; NICE NG150 (2020), Supporting adult carers. Die fünf Bereiche sind eine eigene redaktionelle Ordnung zur Selbstbeobachtung, kein validiertes Testinstrument.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Redaktionell aktualisiert: 06.10.2026; erneute Fachprüfung ausstehend.",
  }),
  createHandoutTextVersion("sauerstoffmaske", {
    kicker: "Textversion",
    summary:
      "Ihre Gesundheit, Beziehungen, Interessen und Erholung haben einen eigenen Wert. Selbstfürsorge muss nicht damit begründet werden, später wieder besser helfen zu können.",
    intro: [
      "Die Sauerstoffmaske ist eine Metapher dafür, die eigene Sicherheit und Gesundheit ernst zu nehmen. Sie begründet keine Pflicht, danach wieder Unterstützung zu leisten.",
      "Die Textversion beschreibt mögliche Belastungssignale und persönliche Schutzräume. Sie vermeidet die Einteilung in einen negativen und einen angeblich richtigen Kreislauf.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei der Sauerstoffmaske geht",
        calloutText:
          "Ihre Bedürfnisse zählen. Sie dürfen zuerst oder ausschliesslich für die eigene Sicherheit und Gesundheit sorgen.",
      },
      {
        title: "Wenn eigene Bedürfnisse zu kurz kommen",
        intro:
          "Diese Hinweise können zeigen, dass die eigene Belastung zu viel Raum einnimmt. Sie sind keine Bewertung und kein persönliches Versagen.",
        cards: [
          {
            title: "Fast nur noch für andere da sein",
            text: "Der ganze Fokus liegt auf dem Gegenüber, nicht mehr auch auf Ihnen selbst.",
          },
          {
            title: "Eigene Bedürfnisse ignorieren",
            text: "Pausen, Schlaf oder Unterstützung werden aufgeschoben oder weggedrückt.",
          },
          {
            title: "Schuldgefühle",
            text: "Es entsteht das Gefühl, nie genug zu tun und trotzdem nicht zu genügen.",
          },
          {
            title: "Erschöpfung und Gereiztheit",
            text: "Die Belastung steigt und die eigene Lebensqualität, Gesundheit oder Sicherheit können leiden.",
          },
        ],
      },
      {
        title: "Eigene Schutzräume stärken",
        intro:
          "Selbstfürsorge darf als eigenes Recht verstanden werden – unabhängig davon, welche Angehörigenrolle Sie übernehmen.",
        cards: [
          {
            title: "Eigene Bedürfnisse ernst nehmen",
            text: "Sie schützen bewusst Zeit, Gesundheit, Beziehungen, Interessen und Erholung.",
          },
          {
            title: "Mit Schuldgefühlen umgehen",
            text: "Selbstfürsorge kann entlasten. Schuldgefühle können trotzdem bestehen bleiben oder zunächst stärker werden. Das ist kein Beweis, dass Sie etwas falsch machen.",
          },
          {
            title: "Energie und Klarheit",
            text: "Erholung kann Raum für eigene Bedürfnisse und Entscheidungen schaffen. Ihre Wirkung ist individuell; Sie müssen dadurch weder sofort ruhig werden noch besser Unterstützung leisten.",
          },
          {
            title: "Freier über Unterstützung entscheiden",
            text: "Mit mehr Klarheit können Sie neu entscheiden, ob, wie viel und welche Unterstützung Sie geben möchten.",
          },
        ],
      },
      {
        title: "Eigene Bedürfnisse ernst nehmen",
        calloutTitle: "Entlastung im eigenen Tempo",
        calloutText:
          "Was Sie entlastet, kann sich verändern. Auch kleine Entlastungen dürfen einen Platz haben. Nicht jede Belastung lässt sich durch persönliche Selbstfürsorge lösen; praktische Unterstützung und eine andere Aufgabenverteilung können nötig sein.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Zeit nur für sich reservieren",
            text: "Wenn es möglich ist, planen Sie etwas für Ihr eigenes Leben oder Ihre Erholung ein. Fehlt dafür Raum, dürfen Sie Hilfe oder eine andere Aufgabenverteilung suchen.",
          },
          {
            title: "2. Den eigenen Bedarf aussprechen",
            text: "Benennen Sie, was Sie für Ihre eigene Gesundheit und Erholung brauchen.",
          },
          {
            title: "3. Passende Unterstützung suchen",
            text: "Eigene Beratung oder praktische Hilfe kann entlasten, wenn sie verfügbar und für Sie passend ist. Schwierigkeiten beim Zugang oder Annehmen von Hilfe sind kein persönliches Versagen.",
          },
        ],
      },
    ],
    sourceLine:
      "Fachliche Bezugspunkte: NICE NG150 (2020), Supporting adult carers; Mason, P. T. & Kreger, R. (2014), Angehörigen-Psychoedukation. Die Sauerstoffmaske ist eine redaktionelle Reflexionsmetapher, kein validiertes Wirkungsmodell.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Redaktionell aktualisiert: 06.10.2026; erneute Fachprüfung ausstehend.",
  }),
  createHandoutTextVersion("stopp-technik", revisedHandouts["stopp-technik"]),
  createHandoutTextVersion("energie-konto", {
    kicker: "Textversion",
    summary:
      "Was Kraft kostet oder entlastet, ist individuell und kann sich verändern. Die Metapher hilft beim Beobachten; sie misst keine Energie und verlangt keine perfekte Balance.",
    intro: [
      "Angehörigen- oder Sorgearbeit kann psychisch, körperlich, sozial und finanziell belasten.",
      "Nicht jede Belastung lässt sich durch persönliche Selbstfürsorge ausgleichen. Auch praktische Entlastung und Unterstützung von aussen gehören in den Blick.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Eine Metapher, keine Bilanz",
        calloutText:
          "Das Energie-Konto ist eine Reflexionsmetapher, keine Skala, Diagnose oder Leistungsaufgabe. Ein niedriger Stand ist kein persönliches Versagen.",
      },
      {
        title: "Was entlasten kann",
        intro:
          "Die Beispiele sind Möglichkeiten, keine allgemeingültigen Energiegeber.",
        cards: [
          {
            title: "Pausen und Erholung",
            text: "Verlässliche Pausen oder Ruhezeiten können manchen Menschen Entlastung ermöglichen.",
          },
          {
            title: "Gewählte Kontakte",
            text: "Kontakt mit vertrauten Menschen oder einer Peer-Gruppe kann unterstützend sein, wenn er guttut.",
          },
          {
            title: "Eigene Interessen",
            text: "Angenehme Tätigkeiten, Bewegung oder Natur können Raum ausserhalb der Belastung schaffen, wenn sie zur Person passen.",
          },
          {
            title: "Praktische Entlastung",
            text: "Aufgaben zu teilen oder Unterstützung im Alltag zu erhalten, kann Belastung verringern.",
          },
          {
            title: "Beratung und Unterstützung",
            text: "Professionelle oder gemeinschaftliche Angebote können Information, Austausch oder Entlastung bieten.",
          },
          {
            title: "Zeit für das eigene Leben",
            text: "Eigene Beziehungen, Arbeit, Interessen und Erholung dürfen einen eigenständigen Platz behalten.",
          },
        ],
      },
      {
        title: "Was belasten kann",
        intro:
          "Auch diese Beispiele sind individuell und keine vollständige Liste.",
        cards: [
          {
            title: "Krisen und Unsicherheit",
            text: "Unvorhersehbare oder belastende Situationen können viel Aufmerksamkeit und Kraft beanspruchen.",
          },
          {
            title: "Ständige Erreichbarkeit",
            text: "Wenig planbare Unterbrechungen und fehlende Pausen können Erholung erschweren.",
          },
          {
            title: "Konflikte und Sorgen",
            text: "Wiederkehrende Auseinandersetzungen, Sorgen oder Grübeln können belastend sein.",
          },
          {
            title: "Isolation",
            text: "Mit Belastungen allein zu bleiben oder Kontakte zu verlieren, kann zusätzliche Kraft kosten.",
          },
          {
            title: "Arbeit, Wohnen und Finanzen",
            text: "Materielle und organisatorische Belastungen können Sorgearbeit zusätzlich erschweren.",
          },
          {
            title: "Zu viele Aufgaben, zu wenig Unterstützung",
            text: "Wenn Verantwortung dauerhaft nicht geteilt werden kann, kann der eigene Spielraum kleiner werden.",
          },
        ],
      },
      {
        title: "Fragen zur Selbstbeobachtung",
        bullets: [
          "Was hat heute Kraft gekostet?",
          "Was hat etwas entlastet – auch wenn es nur wenig war?",
          "Was kann ich selbst verändern?",
          "Wofür brauche ich Unterstützung oder Entlastung von aussen?",
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Beobachten",
            text: "Notieren Sie auf Wunsch eine Belastung und eine kleine Entlastung, ohne sich dafür zu bewerten.",
          },
          {
            title: "2. Einen machbaren Schritt wählen",
            text: "Wählen Sie nur eine Veränderung, die im Moment realistisch und freiwillig ist.",
          },
          {
            title: "3. Unterstützungsbedarf benennen",
            text: "Prüfen Sie, welche Belastung nicht allein durch Selbstfürsorge lösbar ist und wo Unterstützung nötig wäre.",
          },
        ],
      },
    ],
    sourceLine:
      "Quellen: NICE NG150, Supporting adult carers; WHO Europa, Caring for yourself while caring for others (2025); Bundesamt für Gesundheit, Psychische Gesundheit. Redaktionelle Reflexionsmetapher.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 05.10.2026.",
  }),
  createHandoutTextVersion("erlaubnis-karte", {
    kicker: "Textversion",
    summary:
      "Die Erlaubnis-Karte bündelt neun freiwillige Sätze zu eigenen Bedürfnissen, Grenzen und einem eigenen Leben.",
    intro: [
      "Die Sätze sind Angebote zum Auswählen, keine Pflichtliste.",
      "Selbstfürsorge, Grenzen und eigene Gefühle dürfen einen eigenständigen Platz haben.",
    ],
    sections: [
      {
        title: "Erlaubnis",
        intro:
          "Die Karte nennt neun Dinge, die Sie sich ausdrücklich erlauben dürfen.",
        bullets: [
          "Nein sagen, auch wenn dabei Schuldgefühle auftauchen.",
          "Eigene Bedürfnisse haben und äussern.",
          "Pausen machen, wenn es zu viel wird – bei akuter Gefahr aber Hilfe holen.",
          "Hilfe annehmen und um Hilfe bitten.",
          "Wütend, traurig oder überfordert sein.",
          "Grenzen setzen, auch wenn es Widerstand gibt.",
          "Sich zurückziehen, ohne eine spätere Erklärung oder Gesprächsfortsetzung versprechen zu müssen.",
          "Freude empfinden, auch wenn es dem Angehörigen schlecht geht.",
          "Ihr eigenes Leben leben.",
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Gültigkeit",
        calloutText: "Gültig ab sofort. Unbefristet.",
      },
      {
        title: "Wie Sie die Karte lesen können",
        calloutTitle: "Nicht Leistung, sondern Erlaubnis",
        calloutText:
          "Die Karte will nichts zusätzlich von Ihnen. Sie erinnert Sie daran, was auch unter Belastung erlaubt bleibt.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Einen Satz auswählen",
            text: "Wählen Sie heute genau die Erlaubnis aus, die Ihnen im Moment am schwersten fällt.",
          },
          {
            title: "2. Sichtbar notieren",
            text: "Schreiben Sie diesen Satz an einen Ort, den Sie im Alltag sehen.",
          },
          {
            title: "3. Im Alltag wiederholen",
            text: "Wenn Schuldgefühle auftauchen, erinnern Sie sich bewusst: Auch das ist erlaubt.",
          },
        ],
      },
    ],
    sourceLine:
      "Fachlicher Rahmen: NICE NG150; WHO Europa, Caring for yourself while caring for others (2025). Redaktionelle Reflexionskarte, kein validiertes Instrument.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 05.10.2026.",
  }),
  createHandoutTextVersion("schuld-verantwortung", {
    kicker: "Textversion",
    summary:
      "Schuldgefühle sind bei Angehörigen häufig und verständlich. Aus einer Diagnose lässt sich keine persönliche Schuld ableiten. Sie dürfen klären, was Sie heute beeinflussen können und wofür Sie konkret Verantwortung tragen.",
    intro: [
      "Schuldgefühle und konkrete Verantwortung können schwer auseinanderzuhalten sein. Diese Orientierung lädt dazu ein, Selbstvorwürfe zu hinterfragen und den eigenen Einfluss realistischer zu sehen.",
      "Sie finden zuerst eine Einordnung von Schuldgefühlen, dann den Blick auf Forschung, den Unterschied zwischen Schuld und Verantwortung und typische Selbstvorwürfe mit einer realistischeren Gegenperspektive.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentrale Entlastung",
        calloutText:
          "Schuldgefühle gehören zu den häufigsten Belastungen von Angehörigen. Das Gefühl allein ist kein Nachweis persönlicher Schuld. Eine Borderline-Persönlichkeitsstörung hat keine einfache einzelne Ursache. Aus der Diagnose lässt sich keine individuelle Schuldzuweisung ableiten; Verantwortung für konkrete verletzende oder gewalttätige Handlungen bleibt davon getrennt.",
      },
      {
        title: "Was die Forschung zeigt",
        intro:
          "Bei der Entwicklung einer Borderline-Persönlichkeitsstörung können mehrere Faktoren zusammenwirken. Forschung zu solchen Zusammenhängen erklärt nicht die Erkrankung einer einzelnen Person abschliessend.",
        cards: [
          {
            title: "Genetik und Temperament",
            text: "Genetische Einflüsse und Temperament können zur Verletzlichkeit beitragen. Sie bestimmen weder Erkrankung noch Verlauf allein.",
          },
          {
            title: "Zusammenspiel vieler Faktoren",
            text: "Temperament, Beziehungen, Erfahrungen und soziale Bedingungen können zusammenwirken. Eine Diagnose erlaubt keine einfache Zuordnung von Ursache oder Schuld zu einer Person.",
          },
          {
            title: "Entwicklung im Kontext",
            text: "Kindheitsbelastungen, etwa Misshandlung oder Vernachlässigung, stehen in Studien mit Borderline in Zusammenhang. Das beweist keine einfache individuelle Ursache und bedeutet nicht, dass jede betroffene Person solche Erfahrungen gemacht hat.",
          },
        ],
      },
      {
        title: "Selbstvorwürfe und konkrete Verantwortung",
        intro:
          "Selbstvorwürfe können sehr belastend sein. Konkrete Verantwortung bedeutet, eigene Handlungen anzuschauen, mögliche Verletzungen anzuerkennen und zu klären, was Sie heute verändern können.",
        cards: [
          {
            title: "Blickrichtung",
            text: "Statt sich pauschal zu verurteilen, können Sie fragen: «Was habe ich konkret getan? Was braucht Anerkennung oder Wiedergutmachung? Was kann ich jetzt tun?»",
          },
          {
            title: "Wirkung",
            text: "Anhaltende Selbstvorwürfe können Handlungsspielraum verengen. Eine konkrete Einordnung kann helfen, Verantwortung und Einfluss voneinander zu unterscheiden.",
          },
          {
            title: "Fokus",
            text: "Sie können Verantwortung für eigenes Verhalten übernehmen, ohne für die gesamte Erkrankung oder Genesung einer anderen Person verantwortlich zu sein.",
          },
          {
            title: "Ergebnis",
            text: "Entschuldigung, Wiedergutmachung und Veränderungen können sinnvoll sein. Gleichzeitig bleiben eigene Grenzen, Selbstschutz und Unterstützung berechtigt.",
          },
        ],
      },
      {
        title:
          "5 Sätze, die Angehörige sich oft sagen – und mögliche Einordnungen",
        cards: [
          {
            title: "«Ich hätte es früher merken müssen.»",
            text: "Angehörige müssen keine Diagnose stellen. Eine fachliche Beurteilung braucht Zeit und Informationen, die Ihnen damals vielleicht nicht zur Verfügung standen.",
          },
          {
            title:
              "«Wenn ich ein besserer Elternteil gewesen wäre, wäre das nicht passiert.»",
            text: "Aus der Diagnose folgt kein pauschales Urteil über Ihre Elternschaft. Belastende Erfahrungen können mitwirken; für konkrete verletzende Handlungen können Sie Verantwortung übernehmen. Das ist eine andere Frage als die persönliche Schuld an einer Erkrankung.",
          },
          {
            title: "«Ich tue nicht genug.»",
            text: "Sie dürfen prüfen, was für Sie möglich und freiwillig tragbar ist. Behandlung und Genesung müssen Sie nicht allein tragen.",
          },
          {
            title:
              "«Vielleicht bin ich der Grund, warum es nicht besser wird.»",
            text: "Genesung hängt von vielen persönlichen, sozialen und professionellen Faktoren ab. Sie sind nicht für den Verlauf einer anderen Person verantwortlich.",
          },
          {
            title: "«Andere Familien haben dieses Problem nicht.»",
            text: "Borderline betrifft Menschen mit unterschiedlichen Lebensgeschichten und in unterschiedlichen Familien. Ein Vergleich mit anderen Familien erklärt weder die Ursachen noch Ihre persönliche Verantwortung.",
          },
        ],
      },
      {
        title: "Kinder entlasten",
        calloutTitle: "Keine Verantwortung für die Erkrankung der Eltern",
        calloutText:
          "Kinder sind nicht für die Erkrankung oder Behandlung ihrer Eltern verantwortlich. Betreuung, Unterstützung und Sicherheit müssen Erwachsene organisieren; Kinder brauchen altersgerechte Informationen und verlässliche Bezugspersonen.",
      },
      {
        title: "Vertiefung",
        calloutTitle: "Wenn Schuldgedanken wieder auftauchen",
        calloutText:
          "Fragen Sie sich nicht nur, was damals falsch lief, sondern auch, was heute schützt, entlastet und in Ihrer Verantwortung liegt.",
      },
      {
        title: "Merksatz",
        calloutTitle: "Was Sie sich merken dürfen",
        calloutText:
          "Eine Diagnose weist Ihnen keine persönliche Schuld zu. Sie müssen die Erkrankung nicht heilen und weder Behandlung noch Genesung allein tragen. Verantwortung für eigene verletzende oder gewalttätige Handlungen bleibt bestehen. Grenzen, Schutz und eigene Unterstützung sind berechtigt.",
      },
    ],
    sourceLine:
      "Quellen: [1] Berkowitz, C. & Gunderson, J. G., BPD Family Guidelines (NEABPD). [2] Hoffman, P. D. et al. (2005), Family Connections (NEABPD). [3] Gunderson, J. G., Herpertz, S. C., Skodol, A. E., Torgersen, S. & Zanarini, M. C. (2018), Nature Reviews Disease Primers. [4] Porter, C. et al. (2020), Childhood adversity and borderline personality disorder: a meta-analysis. Die Metaanalyse beschreibt Zusammenhänge, keine individuelle Schuldzuweisung.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Redaktionell aktualisiert: 06.10.2026; fachlich-redaktionelle Freigabe ausstehend.",
  }),
  createHandoutTextVersion("radikale-akzeptanz", {
    kicker: "Textversion",
    summary:
      "Radikale Akzeptanz ist ein freiwilliges Angebot: die gegenwärtige Realität anerkennen, ohne sie gutzuheissen – und Handlungsspielraum für das Beeinflussbare finden.",
    intro: [
      "Radikale Akzeptanz bedeutet nicht Aufgeben. Sie kann Entlastung ermöglichen, indem Sie die gegenwärtige Realität anerkennen und Ihre Kraft auf das richten, was heute beeinflussbar ist. Das bedeutet nicht, dass die Zukunft unveränderbar ist.",
      "Die Gegenüberstellung zeigt, was radikale Akzeptanz nicht ist, was sie sein kann und wie eine vereinfachte Übung in Anlehnung an die DBT nach Linehan aussehen kann.",
    ],
    visualization: {
      kind: "acceptance-path",
      title: "Radikale Akzeptanz",
      lead: "Eine freiwillige Übung: die gegenwärtige Realität anerkennen, ohne aufzugeben – und Handlungsspielraum für das Beeinflussbare finden.",
      longDescription:
        "Die eigene didaktische Darstellung grenzt zuerst vier Missverständnisse ab: Radikale Akzeptanz ist weder Aufgeben noch Gutheissen, Passivität oder Resignation. Danach zeigt sie eine vereinfachte eigene Übung in Anlehnung an die DBT nach Linehan: die gegenwärtige Realität benennen, die eigene Reaktion spüren, die Realität anerkennen und den eigenen Handlungsspielraum klären. Ein Beispiel ohne akute Gefährdung verdeutlicht, wie Angehörige Unterstützung anbieten, ihre Grenze beachten und Beratung suchen können. Der Sicherheitshinweis stellt klar, dass Schutz vor der Akzeptanzübung geht und Akzeptanz niemals bedeutet, zu bleiben, zu schweigen oder Gewalt zu tolerieren.",
      safetyTitle: "Schutz geht vor",
      safetyBulletStartsWith: "Bei Gefahr",
      sections: {
        keyStatement: "Kernaussage",
        notAcceptance: "Was Radikale Akzeptanz nicht ist",
        safetyCardTitle: "Gutheissen",
        acceptance: "Was Radikale Akzeptanz ist",
        steps: "4-Schritte-Übung",
        example: "Beispiel ohne akute Gefährdung",
        actions: "Was können Sie tun?",
      },
    },
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Diese Übung ist ein Angebot: «So ist es gerade. Ich muss es nicht gut finden.» Das schreibt die Zukunft nicht fest. Sie machen nichts falsch, wenn Akzeptanz heute schwerfällt. Gefühle und Grenzen bleiben berechtigt; Sie dürfen handeln und Unterstützung suchen.",
      },
      {
        title: "Was Radikale Akzeptanz nicht ist",
        intro:
          "Die Gegenüberstellung grenzt bewusst Missverständnisse ab. Akzeptanz bedeutet nicht, Belastendes schönzureden oder sich selbst aufzugeben.",
        cards: [
          {
            title: "Aufgeben",
            text: "Radikale Akzeptanz ist kein Rückzug aus dem Leben.",
          },
          {
            title: "Gutheissen",
            text: "Sie müssen schwierige Realität nicht gut finden, um sie anzuerkennen. Akzeptanz heisst nicht bleiben, schweigen oder Gewalt tolerieren.",
          },
          {
            title: "Passivität",
            text: "Akzeptanz ersetzt Handeln nicht, sondern macht gezielteres Handeln wieder möglich.",
          },
          {
            title: "Resignation",
            text: "Es geht nicht darum, hoffnungslos zu werden, sondern den inneren Kampf einen Moment zu lösen.",
          },
        ],
      },
      {
        title: "Was Radikale Akzeptanz ist",
        intro:
          "Die folgenden Punkte beschreiben die Haltung: die gegenwärtige Realität anerkennen, Kräfte bündeln und den eigenen Handlungsspielraum wieder sehen.",
        cards: [
          {
            title: "Anerkennen, was im Moment tatsächlich ist",
            text: "Sie benennen die gegenwärtige Realität. Das bedeutet nicht, dass die Zukunft unveränderbar ist.",
          },
          {
            title: "Kraft für Handlungsspielraum bewahren",
            text: "Sie klären, was Sie entscheiden oder beeinflussen können und wobei Sie Unterstützung brauchen.",
          },
          {
            title: "Mehr Handlungsspielraum gewinnen",
            text: "Akzeptanz kann die Anspannung einen Moment mindern. Trauer, Wut oder Angst dürfen trotzdem da sein.",
          },
          {
            title: "Weniger gegen das Jetzt ankämpfen",
            text: "Sie müssen die Situation nicht gutheissen. Akzeptanz kann schwerfallen und viele Anläufe brauchen.",
          },
        ],
      },
      {
        title: "4-Schritte-Übung",
        cards: [
          {
            title: "1. Benennen",
            text: "Was ist im Moment tatsächlich so?",
          },
          {
            title: "2. Spüren",
            text: "Was löst das in mir aus?",
          },
          {
            title: "3. Anerkennen",
            text: "Kann ich mir sagen: «So ist es gerade. Ich muss es nicht gut finden»? Akzeptanz braucht manchmal viele Anläufe.",
          },
          {
            title: "4. Handlungsspielraum",
            text: "Was kann ich entscheiden oder beeinflussen? Wobei brauche ich Unterstützung? Was liegt nicht allein bei mir?",
          },
        ],
      },
      {
        title: "Beispiel ohne akute Gefährdung",
        calloutTitle: "Beispiel ohne akute Gefährdung",
        calloutText:
          "Die andere Person möchte heute keine Hilfe annehmen. Das enttäuscht mich, und ich mache mir Sorgen. Ich kann ihre Entscheidung nicht allein verändern. Ich kann sagen, was ich anbieten kann, meine Grenze beachten und mir selbst Beratung holen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Wenn Sie möchten, probieren Sie die vier Schritte zunächst an einer kleinen, sicheren Alltagssituation aus. Wählen Sie einen Satz, der Ihnen hilft.",
          "Sie machen nichts falsch, wenn Akzeptanz heute schwerfällt. Ihre Gefühle und Grenzen bleiben berechtigt.",
          "Prüfen Sie, was Sie entscheiden oder beeinflussen können, wobei Sie Unterstützung brauchen und was nicht allein bei Ihnen liegt.",
          "Bei Gefahr geht Schutz vor Akzeptanzübung.",
        ],
      },
    ],
    sourceLine:
      "Fachlicher Bezugspunkt: Linehan, M. M. (2015), DBT Skills Training Manual.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 04.10.2026.",
  }),
];
