import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("warnsignale", {
    kicker: "Textversion",
    summary:
      "Überlastung baut sich oft schrittweise auf. Wer erste Warnzeichen ernst nimmt, kann früher gegensteuern und rechtzeitig Hilfe holen.",
    intro: [
      "Die Ampellogik hilft, eigene Überlastung früher wahrzunehmen. Grün, Gelb und Rot markieren unterschiedliche Belastungsstufen und zeigen, wann Gegensteuern nötig wird.",
      "Die Grafik ist als frühzeitige Orientierung gedacht, nicht als Selbstvorwurf. Entscheidend ist, Belastung ernst zu nehmen, bevor Erschöpfung oder Krisen eskalieren.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText: "Überlastung kommt nicht plötzlich – sie kündigt sich an.",
      },
      {
        title: "Noch im Rahmen",
        intro:
          "Die grüne Stufe beschreibt erste, noch gut beeinflussbare Belastungszeichen. Sie sind ernst zu nehmen, aber noch ein günstiger Moment zum Gegensteuern.",
        cards: [
          {
            title: "Gelegentliche Gereiztheit",
            text: "Die innere Spannung steigt schneller als sonst, beruhigt sich aber noch wieder.",
          },
          {
            title: "Leichte Schlafprobleme",
            text: "Ein- oder Durchschlafen fällt schwerer, ohne dass der ganze Alltag schon kippt.",
          },
          {
            title: "Weniger Lust auf Hobbys",
            text: "Freude, Interesse oder Erholung kommen zu kurz.",
          },
        ],
      },
      {
        title: "Achtung, handeln",
        intro:
          "Die gelbe Stufe zeigt, dass Belastung bereits deutlicher in Stimmung, Körper und Beziehungen eingreift. Jetzt reicht blosses Durchhalten meist nicht mehr.",
        cards: [
          {
            title: "Emotionale Taubheit oder Dauerfrust",
            text: "Sie fühlen sich abgestumpft, leer oder dauerhaft gereizt.",
          },
          {
            title: "Körperliche Beschwerden",
            text: "Stress zeigt sich bereits spürbar körperlich.",
          },
          {
            title: "Sozialer Rückzug beginnt",
            text: "Kontakte werden weniger, Austausch wird anstrengender oder vermieden.",
          },
        ],
      },
      {
        title: "Hilfe suchen",
        intro:
          "Die rote Stufe steht für deutliche Warnsignale. Hier braucht es Unterstützung von aussen und nicht nur mehr Disziplin im Alltag.",
        cards: [
          {
            title: "Hoffnungslosigkeit",
            text: "Die Belastung wirkt festgefahren und ohne Ausweg.",
          },
          {
            title: "Kontrollverlust-Angst",
            text: "Sie haben das Gefühl, sich selbst oder die Situation nicht mehr im Griff zu haben.",
          },
          {
            title: "Eigene Identität verloren",
            text: "Sie erleben sich fast nur noch in der Angehörigenrolle.",
          },
          {
            title: "Körperliche Dauerbeschwerden",
            text: "Stresssymptome halten an und werden zu einem dauerhaften Problem.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Grün: früh gegensteuern",
            text: "Planen Sie bewusst kleine Dinge ein, die Sie stabilisieren: Pause, Schlaf, Bewegung oder ein entlastendes Gespräch.",
          },
          {
            title: "2. Gelb: Unterstützung aktivieren",
            text: "Holen Sie sich Beratung oder Begleitung, bevor Überlastung zum Dauerzustand wird.",
          },
          {
            title: "3. Rot: Hilfe dazuholen",
            text: "Wenn Sie sich stark erschöpft, hoffnungslos oder nicht mehr sicher fühlen, holen Sie umgehend Hilfe von aussen.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Maslach/Leiter (2016), Burnout-Prävention; Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("sauerstoffmaske", {
    kicker: "Textversion",
    summary:
      "Selbstfürsorge ist keine Selbstsucht. Wer zuerst die eigene Maske aufsetzt, hat mehr Energie, weniger Schuldgefühle und kann verlässlicher unterstützen.",
    intro: [
      "Die Sauerstoffmaske erinnert daran, dass Selbstfürsorge kein Rückzug aus Verantwortung ist. Erst die eigene Maske aufsetzen, dann anderen helfen: Dieses Bild entlastet und klärt Prioritäten.",
      "Die Grafik stellt zwei Kreisläufe gegenüber. Links zeigt sie, wie Überforderung und Schuldgefühle entstehen, wenn Angehörige nur noch für andere da sind. Rechts zeigt sie den hilfreicheren Kreislauf, wenn Selbstfürsorge bewusst Platz bekommt.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei der Sauerstoffmaske geht",
        calloutText:
          "Im Flugzeug gilt: Erst die eigene Maske aufsetzen, dann anderen helfen. Für Angehörige gilt dasselbe.",
      },
      {
        title: "Negativer Kreislauf",
        intro:
          "Die linke Seite der Grafik beschreibt einen Kreislauf, in dem Selbstfürsorge ausfällt und die Belastung zunimmt.",
        cards: [
          {
            title: "Nur für andere da sein",
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
            text: "Die Belastung steigt, die Kraft sinkt und hilfreiche Unterstützung wird schwerer.",
          },
        ],
      },
      {
        title: "Hilfreicher Kreislauf",
        intro:
          "Die rechte Seite zeigt, was sich verändert, wenn Selbstfürsorge nicht als Egoismus, sondern als Voraussetzung verstanden wird.",
        cards: [
          {
            title: "Eigene Maske zuerst aufsetzen",
            text: "Sie nehmen Ihre Bedürfnisse ernst und sorgen bewusst für Stabilität.",
          },
          {
            title: "Weniger Schuldgefühle",
            text: "Selbstfürsorge entlastet innerlich und macht klarer, was realistisch möglich ist.",
          },
          {
            title: "Energie und Klarheit",
            text: "Mit mehr Kraft und Übersicht reagieren Sie ruhiger und gezielter.",
          },
          {
            title: "Bessere Unterstützung möglich",
            text: "Gerade weil Sie auf sich achten, können Sie verlässlicher für andere da sein.",
          },
        ],
      },
      {
        title: "Wendepunkt",
        calloutTitle: "Wo sich der Kreislauf verändert",
        calloutText:
          "Der entscheidende Wechsel passiert dort, wo Sie Selbstfürsorge nicht mehr verschieben, sondern als Voraussetzung für verlässliche Unterstützung behandeln.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Zeit nur für sich reservieren",
            text: "Planen Sie diese Woche bewusst etwas ein, das nicht dem Krisenmanagement gehört.",
          },
          {
            title: "2. Den eigenen Bedarf aussprechen",
            text: "Sagen Sie klar, was Sie brauchen, um zugewandt und verlässlich bleiben zu können.",
          },
          {
            title: "3. Hilfe annehmen üben",
            text: "Entlastung wird oft erst möglich, wenn Sie Unterstützung nicht nur anbieten, sondern auch selbst zulassen.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014), Angehörigen-Psychoedukation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("stopp-technik", {
    kicker: "Textversion",
    summary:
      "Die STOPP-Technik schafft in etwa 30 Sekunden Abstand zwischen Reiz und Reaktion. Das gibt Körper und Kopf wieder etwas mehr Handlungsspielraum.",
    intro: [
      "Die STOPP-Technik schafft eine kurze Pause zwischen Reiz und Reaktion. Die fünf Schritte sind alltagsnah formuliert, damit sie in angespannten Momenten schnell nutzbar bleiben.",
      "Die fünf Buchstaben geben eine feste Reihenfolge vor: stoppen, atmen, orientieren, Perspektive weiten und dann erst handeln.",
    ],
    sections: [
      {
        title: "Zentraler Satz",
        calloutTitle: "Worum es bei STOPP geht",
        calloutText:
          "Wenn die Emotionen überkochen: STOPP gibt Ihnen 30 Sekunden Abstand zwischen Reiz und Reaktion.",
      },
      {
        title: "Die 5 STOPP-Schritte",
        intro:
          "Die Grafik zeigt die Technik als kurze Folge von fünf Schritten, die Sie in hoher Anspannung abrufen können.",
        cards: [
          {
            title: "S = STOPP",
            text: "Halten Sie inne. Tun Sie nichts.",
          },
          {
            title: "T = TIEF ATMEN",
            text: "Drei tiefe Atemzüge. Nur atmen, noch nicht reagieren.",
          },
          {
            title: "O = ORIENTIEREN",
            text: "Was passiert gerade wirklich?",
          },
          {
            title: "P = PERSPEKTIVE",
            text: "Wie sehe ich das in einer Woche?",
          },
          {
            title: "P = PLAN",
            text: "Wählen Sie eine konkrete nächste Handlung.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Im ruhigen Moment üben",
            text: "Üben Sie STOPP mehrmals in ruhigen Situationen, damit die Reihenfolge unter Stress verfügbarer wird.",
          },
          {
            title: "2. Anker-Satz bereitlegen",
            text: "Ein kurzer Satz wie «Ich habe einen Moment» hilft, nicht sofort zu reagieren.",
          },
          {
            title: "3. Abends kurz zurückblicken",
            text: "Fragen Sie sich am Abend: Wo hätte mir STOPP heute gutgetan?",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Linehan (1993), DBT Skills Training.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("energie-konto", {
    kicker: "Textversion",
    summary:
      "Ihre Energie ist begrenzt. Wenn Sie im Blick behalten, was auftankt und was Energie kostet, können Sie früher gegensteuern statt erst im Leerlauf zu reagieren.",
    intro: [
      "Das Energie-Konto macht sichtbar, was Kraft gibt und was Kraft kostet. Die Batterie-Metapher hilft, Belastung früher zu bemerken, bevor Erschöpfung zum Dauerzustand wird.",
      "Die Grundidee ist bewusst praktisch. Statt nur über Belastung nachzudenken, hilft die Gegenüberstellung von Energiegebern und Energiefressern dabei, konkrete Veränderungen im Alltag zu planen.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Worum es beim Energie-Konto geht",
        calloutText:
          "Ihre Energie ist begrenzt. Achten Sie darauf, dass Sie regelmässig auftanken – bevor das Konto leer ist.",
      },
      {
        title: "Was füllt",
        intro:
          "Die linke Spalte nennt typische Energiegeber, die das Konto wieder auffüllen können.",
        cards: [
          {
            title: "Bewegung und Sport",
            text: "Körperliche Aktivität kann spürbar Energie zurückgeben.",
          },
          {
            title: "Soziale Kontakte pflegen",
            text: "Tragender Kontakt kann entlasten und verbinden.",
          },
          {
            title: "Hobbys und Interessen",
            text: "Eigene Interessen erinnern daran, dass Ihr Leben mehr umfasst als Belastung.",
          },
          {
            title: "Natur und Ruhe",
            text: "Rückzug, Stille und Natur können Nervensystem und Gedanken beruhigen.",
          },
          {
            title: "Professionelle Unterstützung",
            text: "Begleitung von aussen kann entlasten und strukturieren.",
          },
          {
            title: "Schlaf und Erholung",
            text: "Regeneration ist kein Luxus, sondern Grundversorgung.",
          },
        ],
      },
      {
        title: "Was leert",
        intro:
          "Die rechte Spalte zeigt typische Belastungen, die das Energie-Konto nach unten ziehen.",
        cards: [
          {
            title: "Krisen begleiten",
            text: "Akute Belastung kostet Kraft, auch wenn Hilfe nötig und sinnvoll ist.",
          },
          {
            title: "Ständige Erreichbarkeit",
            text: "Dauerbereitschaft verhindert echte Erholung.",
          },
          {
            title: "Schuldgefühle und Grübeln",
            text: "Innere Kreise ohne Lösung verbrauchen viel Energie.",
          },
          {
            title: "Konflikte und Vorwürfe",
            text: "Wiederholte Auseinandersetzungen ziehen Kraft und Ruhe ab.",
          },
          {
            title: "Isolation und Rückzug",
            text: "Allein mit allem zu bleiben entlastet selten dauerhaft.",
          },
          {
            title: "Eigene Bedürfnisse ignorieren",
            text: "Wer sich selbst ständig übergeht, leert das Konto weiter.",
          },
        ],
      },
      {
        title: "Orientierung",
        calloutTitle: "Die einfache Prüffrage",
        calloutText:
          "Fragen Sie nicht nur, was Kraft kostet, sondern auch, was Ihr Energie-Konto verlässlich wieder auffüllt.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Stand ehrlich einschätzen",
            text: "Fragen Sie sich ohne Beschönigung: Wie voll ist mein Energie-Konto gerade?",
          },
          {
            title: "2. Einen Energiegeber terminieren",
            text: "Planen Sie diese Woche eine konkrete Auftank-Aktivität fest ein.",
          },
          {
            title: "3. Einen Energiefresser begrenzen",
            text: "Wählen Sie genau eine Belastung, die Sie diese Woche verkleinern oder unterbrechen.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Maslach und Leiter (2016), Burnout-Prävention.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("erlaubnis-karte", {
    kicker: "Textversion",
    summary:
      "Die Erlaubnis-Karte bündelt neun Sätze, die Angehörigen oft guttun: eigene Bedürfnisse ernst nehmen, Grenzen setzen und ein eigenes Leben behalten.",
    intro: [
      "Die Erlaubnis-Karte sammelt Sätze, die Angehörige oft erst wieder lernen müssen. Sie ist nicht als Pflichtliste gemeint, sondern als entlastende Zusage zum Auswählen.",
      "Der Fokus ist entlastend. Die Grafik erinnert daran, dass Selbstfürsorge, Grenzen und eigene Gefühle nicht gegen die Beziehung stehen, sondern zu gesunder Angehörigenarbeit dazugehören.",
    ],
    sections: [
      {
        title: "Erlaubnis",
        intro:
          "Die Karte nennt neun Dinge, die Sie sich ausdrücklich erlauben dürfen.",
        bullets: [
          "Nein sagen, ohne sich schuldig zu fühlen.",
          "Eigene Bedürfnisse haben und äussern.",
          "Pausen machen, wenn es zu viel wird.",
          "Hilfe annehmen und um Hilfe bitten.",
          "Wütend, traurig oder überfordert sein.",
          "Grenzen setzen, auch wenn es Widerstand gibt.",
          "Sich zurückziehen, ohne Erklärung.",
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
      "Quelle: Selbstfürsorge-orientierte Angehörigenarbeit, nach Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("schuld-verantwortung", {
    kicker: "Textversion",
    summary:
      "Schuldgefühle sind bei Angehörigen häufig und verständlich. Hilfreicher als der Blick zurück ist die Frage, was Sie heute beeinflussen können, ohne sich die ganze Verantwortung aufzuladen.",
    intro: [
      "Schuld und Verantwortung geraten bei Angehörigen leicht durcheinander. Diese Orientierung hilft, Selbstvorwürfe zu entlasten und den eigenen Einfluss realistischer zu sehen.",
      "Sie finden zuerst eine Einordnung von Schuldgefühlen, dann den Blick auf Forschung, den Unterschied zwischen Schuld und Verantwortung und typische Selbstvorwürfe mit einer realistischeren Gegenperspektive.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentrale Entlastung",
        calloutText:
          "Schuldgefühle gehören zu den häufigsten Belastungen von Angehörigen. Diese Gedanken sind verständlich, aber sie helfen weder Ihnen noch der betroffenen Person. Eine Borderline-Persönlichkeitsstörung hat keine einzelne Ursache, und kein einzelner Mensch ist dafür verantwortlich.",
      },
      {
        title: "Was die Forschung zeigt",
        intro:
          "Das Handout fasst die Entlastung bewusst sachlich zusammen: Borderline entsteht nicht durch einen einzelnen Auslöser und nicht durch eine einzelne Person.",
        cards: [
          {
            title: "Genetik und Temperament",
            text: "Vererbt werden Temperamentszüge – diese allein führen noch nicht zur Erkrankung.",
          },
          {
            title: "Zusammenspiel vieler Faktoren",
            text: "Es gibt keine einzelne Ursache – und keinen einzelnen Schuldigen.",
          },
          {
            title: "Wechselseitige Beziehung",
            text: "Ein empfindsames Kind stellt andere Anforderungen – das macht niemanden schuldig.",
          },
        ],
      },
      {
        title: "Schuld vs. Verantwortung",
        intro:
          "Das Handout stellt beide Haltungen bewusst gegenüber. Schuld fixiert auf das Vergangene, Verantwortung öffnet wieder Handlungsspielraum im Hier und Jetzt.",
        cards: [
          {
            title: "Blickrichtung",
            text: "Schuld fragt rückwärts: «Was habe ich falsch gemacht?» Verantwortung fragt vorwärts: «Was kann ich jetzt tun?»",
          },
          {
            title: "Wirkung",
            text: "Schuld lähmt und macht hilflos. Verantwortung macht handlungsfähiger und klarer.",
          },
          {
            title: "Fokus",
            text: "Schuld fixiert Fehler und Versagen. Verantwortung richtet den Blick auf Möglichkeiten und Einfluss.",
          },
          {
            title: "Ergebnis",
            text: "Schuld begünstigt Rückzug oder Überanpassung. Verantwortung erleichtert klare Entscheidungen und gesunde Grenzen.",
          },
        ],
      },
      {
        title:
          "5 Sätze, die Angehörige sich oft sagen – und was wirklich stimmt",
        cards: [
          {
            title: "«Ich hätte es früher merken müssen.»",
            text: "Sie sind kein Diagnostik-Team. Eine Borderline-Persönlichkeitsstörung wird selbst von Fachpersonen oft erst spät erkannt.",
          },
          {
            title:
              "«Wenn ich ein besserer Elternteil gewesen wäre, wäre das nicht passiert.»",
            text: "Eine Borderline-Persönlichkeitsstörung entsteht nie durch eine einzelne Person. Dass Sie jetzt da sind, zeigt Ihre Fürsorge.",
          },
          {
            title: "«Ich tue nicht genug.»",
            text: "Sie tun bereits viel. Genug ist, was Sie leisten können, ohne sich selbst zu verlieren.",
          },
          {
            title:
              "«Vielleicht bin ich der Grund, warum es nicht besser wird.»",
            text: "Genesung hängt von vielen Faktoren ab. Sie sind ein wichtiger – aber nicht der einzige.",
          },
          {
            title: "«Andere Familien haben dieses Problem nicht.»",
            text: "Eine Borderline-Persönlichkeitsstörung kommt in allen Familien vor – unabhängig von Bildung, Einkommen oder Erziehungsstil.",
          },
        ],
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
          "Sie haben die Erkrankung nicht verursacht. Sie können sie nicht heilen. Aber Sie können einen Unterschied machen – wenn Sie sich selbst dabei nicht verlieren. (Angelehnt an die «3 C's» der Angehörigenarbeit.)",
      },
    ],
    sourceLine:
      "Quellen: [1] Gunderson & Berkowitz, BPD Family Guidelines (NEABPD). [2] Fruzzetti, Hoffman & Buteau, Family Connections (NEABPD, 2005). [3] Gunderson et al., Nature Reviews Disease Primers (2018).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 09.02.2026.",
  }),
  createHandoutTextVersion("radikale-akzeptanz", {
    kicker: "Textversion",
    summary:
      "Radikale Akzeptanz bedeutet nicht Aufgeben, sondern die Realität anzuerkennen und Energie für das Beeinflussbare zurückzugewinnen.",
    intro: [
      "Radikale Akzeptanz bedeutet nicht Aufgeben. Sie hilft, die Realität anzuerkennen und Kraft wieder auf das zu richten, was heute beeinflussbar ist.",
      "Die Gegenüberstellung zeigt, was radikale Akzeptanz nicht ist, was sie ist, wie Sie sie in vier Schritten üben und worauf Sie Ihre Energie stattdessen richten können.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Es ist, wie es ist – und trotzdem können Sie handeln. Radikale Akzeptanz gibt Ihnen Ihre Energie zurück.",
      },
      {
        title: "Was Radikale Akzeptanz nicht ist",
        intro:
          "Die Gegenüberstellung grenzt bewusst Missverständnisse ab. Akzeptanz bedeutet nicht, Belastendes schönzureden oder sich selbst aufzugeben.",
        cards: [
          {
            title: "Nicht Aufgeben",
            text: "Radikale Akzeptanz ist kein Rückzug aus dem Leben.",
          },
          {
            title: "Nicht Gutheissen",
            text: "Sie müssen schwierige Realität nicht gut finden, um sie anzuerkennen.",
          },
          {
            title: "Nicht Passivität",
            text: "Akzeptanz ersetzt Handeln nicht, sondern macht gezielteres Handeln wieder möglich.",
          },
          {
            title: "Nicht Resignation",
            text: "Es geht nicht darum, hoffnungslos zu werden, sondern inneren Widerstand zu lösen.",
          },
        ],
      },
      {
        title: "Was Radikale Akzeptanz ist",
        intro:
          "Die rechte Spalte fasst zusammen, worauf die Haltung zielt: Realität anerkennen, Kräfte bündeln und das Beeinflussbare wieder sehen.",
        cards: [
          {
            title: "Anerkennen, was nicht änderbar ist",
            text: "Sie benennen die Realität, statt gegen sie anzukämpfen.",
          },
          {
            title: "Energie sparen für Beeinflussbares",
            text: "Ihre Kraft bleibt nicht im inneren Widerstand stecken.",
          },
          {
            title: "Inneren Frieden finden",
            text: "Akzeptanz kann Anspannung senken und wieder mehr Boden unter die Füsse bringen.",
          },
          {
            title: "Loslassen von «Es sollte anders sein»",
            text: "Sie müssen nicht ständig gegen das kämpfen, was gerade faktisch da ist.",
          },
        ],
      },
      {
        title: "4-Schritte-Übung",
        cards: [
          {
            title: "1. Benennen",
            text: "Was ist die Realität?",
          },
          {
            title: "2. Spüren",
            text: "Was löst das in mir aus?",
          },
          {
            title: "3. Loslassen",
            text: "Ich höre auf zu kämpfen.",
          },
          {
            title: "4. Fokus",
            text: "Was kann ich beeinflussen?",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Üben Sie die 4 Schritte regelmässig in Ihrem Alltag. Starten Sie mit kleinen Situationen.",
          "Wiederholen Sie das Mantra «Es ist, wie es ist», wenn Sie sich gestresst fühlen.",
          "Richten Sie Ihre Energie bewusst auf Aufgaben, die Sie kontrollieren können, und lassen Sie den Rest los.",
        ],
      },
    ],
    sourceLine: "Quelle: Linehan (1993), DBT Skills Training.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
];
