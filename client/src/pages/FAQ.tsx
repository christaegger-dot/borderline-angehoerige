import { useCallback, useMemo, useState } from "react";
import ContentSection from "@/components/ContentSection";
import ClaimEvidence from "@/components/ClaimEvidence";
import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import SEO, { FAQSchema } from "@/components/SEO";
import { Link } from "wouter";

interface FAQItem {
  claimIds: string[];
  question: string;
  answer: string;
  bullets?: string[];
  links?: { text: string; url: string }[];
}

interface FAQCategory {
  title: string;
  questions: FAQItem[];
}

/** Slugifiziert für stabile Anker-IDs. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "und")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Öffnet eine ContentSection via Custom Event. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

export const faqCategories: FAQCategory[] = [
  {
    title: "Diagnose & Krankheitsverständnis",
    questions: [
      {
        claimIds: ["faq-diagnose-ansprechen"],
        question: "Soll ich die Diagnose ansprechen?",
        answer:
          "Das hängt von der Situation ab. Wenn die betroffene Person die Diagnose kennt und darüber sprechen möchte, kann ein offenes Gespräch hilfreich sein. Fragen Sie, welche Begriffe für sie passen und was sie von Ihnen braucht. Verwenden Sie die Diagnose nicht als Erklärung für jedes Verhalten oder als Argument im Konflikt («Das ist wieder deine Borderline»). Wenn keine Diagnose gestellt wurde oder die Einordnung nicht geteilt wird, bleiben Sie bei konkreten Beobachtungen und Ihrem eigenen Erleben: «Ich merke, dass unser Gespräch gerade sehr angespannt ist.»",
        links: [
          { text: "Mehr zur Kommunikation", url: "/kommunizieren" },
          { text: "Kommunikation üben", url: "/uebungen" },
        ],
      },
      {
        claimIds: ["faq-remission", "faq-verlauf-individuell"],
        question: "Ist Borderline heilbar?",
        answer:
          "Der Begriff «heilbar» ist dafür zu ungenau. Remission bedeutet, dass die Diagnosekriterien nicht mehr erfüllt sind; Recovery umfasst darüber hinaus persönliche Lebensqualität, Beziehungen und Teilhabe. Viele Menschen erreichen im Verlauf eine deutliche Besserung oder Remission, doch Zeitpunkt, Ausmass und persönliche Genesung unterscheiden sich. Therapie kann den Prozess unterstützen, macht ihn aber nicht vollständig planbar.",
        links: [{ text: "Verlauf & Prognose im Detail", url: "/genesung" }],
      },
      {
        claimIds: [
          "faq-multifaktorielle-entstehung",
          "faq-keine-diagnostische-schuld",
        ],
        question: "Ist Borderline erblich? Bin ich schuld?",
        answer:
          "Borderline wird nicht auf eine einzelne Ursache zurückgeführt. Genetische Einflüsse können die Anfälligkeit mitbestimmen; das bedeutet keine sichere Weitergabe einer Diagnose. Belastende Erfahrungen können ebenfalls eine Rolle spielen. Aus einer Diagnose lässt sich keine persönliche Schuld ableiten. Verantwortung für konkrete verletzende oder gewalttätige Handlungen bleibt davon getrennt. Angehörige müssen weder die Behandlung noch die Genesung allein tragen. Kinder sind nicht für die Erkrankung oder Behandlung ihrer Eltern verantwortlich.",
        links: [{ text: "Borderline verstehen", url: "/verstehen" }],
      },
      {
        claimIds: ["faq-beziehungskontext"],
        question:
          "Warum verhält sich mein Angehöriger bei anderen regulierter und stabiler?",
        answer:
          "Verwenden Sie unterschiedliches Verhalten in verschiedenen Beziehungen nicht als Beweis für Manipulation. Fragen Sie nach, wie die Person die jeweilige Situation erlebt und welche Erwartungen oder Bedürfnisse dabei eine Rolle spielen. Bleiben Sie bei beobachtbarem Verhalten und benennen Sie Ihre eigene Grenze, statt ein Motiv als sicher anzunehmen.",
        links: [{ text: "Beziehungsmuster verstehen", url: "/verstehen" }],
      },
      {
        claimIds: ["faq-diagnostische-qualifikation"],
        question: "Wer kann eine Borderline-Diagnose stellen?",
        answer:
          "Eine vertiefte Borderline-Abklärung wird häufig von Fachärzt:innen für Psychiatrie und Psychotherapie oder entsprechend qualifizierten psychologischen Psychotherapeut:innen durchgeführt. Hausärzt:innen können Beschwerden einordnen, andere Ursachen mitprüfen und an geeignete Fachpersonen überweisen. Wer die diagnostische Gesamtbeurteilung übernimmt und wie viele Termine nötig sind, hängt von Qualifikation, Fragestellung und Setting ab; entscheidend ist eine sorgfältige Beurteilung über mehr als einen Momenteindruck.",
        links: [
          {
            text: "Diagnostik-Seite — Wer & Wie",
            url: "/verstehen/diagnostik#wer",
          },
        ],
      },
      {
        claimIds: ["faq-diagnose-autonomie"],
        question:
          "Was, wenn die betroffene Person die Diagnose nicht teilt oder unsicher ist?",
        answer:
          "Eine Diagnose kann hilfreich sein, muss sich für die betroffene Person aber nicht stimmig anfühlen. Es können fachliche Fragen, andere Erklärungen, frühere Erfahrungen im Versorgungssystem oder Sorge vor Stigmatisierung dahinterstehen. Drängen, Beweisen oder das Etikett im Konflikt einzusetzen hilft nicht. Fragen Sie, was unklar ist, sprechen Sie über konkrete Beobachtungen und respektieren Sie die Entscheidung der Person. Wenn sie das möchte, können das Behandlungsteam oder eine zweite fachliche Einschätzung offene Fragen klären. Eigene Angehörigenberatung ist auch ohne Diagnose möglich. Bei akuter Gefahr ist die Diagnose-Frage nachrangig — dann zählt die Soforthilfe.",
        links: [
          {
            text: "Diagnostik-Seite — offene Fragen und Zweitmeinung",
            url: "/verstehen/diagnostik#ablehnung",
          },
          { text: "Soforthilfe", url: "/soforthilfe" },
        ],
      },
      {
        claimIds: ["faq-diagnostik-dauer"],
        question: "Wie lange dauert es, bis eine Diagnose feststeht?",
        answer:
          "Dafür gibt es keine feste Dauer. Anamnese, strukturierte Gespräche, Differenzialdiagnostik und Informationen zum Verlauf können je nach Fragestellung in unterschiedlich vielen Terminen zusammengeführt werden. Entscheidend ist, dass die Einordnung nicht nur auf einem Momenteindruck beruht und verbleibende Unsicherheit offen benannt wird.",
        links: [
          {
            text: "Diagnostik-Seite — Wie läuft eine Diagnostik ab",
            url: "/verstehen/diagnostik#wie",
          },
        ],
      },
      {
        claimIds: ["faq-komorbiditaet"],
        question:
          "Was bedeutet es, wenn mehrere Diagnosen gleichzeitig genannt werden?",
        answer:
          "Begleiterkrankungen wie Depression, Angststörungen oder PTBS kommen bei Borderline häufig vor, aber nicht bei allen Menschen. Fachpersonen sprechen dann von Komorbidität. Das bedeutet nicht «doppelt schlimm», sondern beschreibt eine Kombination, die in der Behandlung mitberücksichtigt wird. Welche Beschwerden gemeinsam oder nacheinander behandelt werden, wird individuell mit der betroffenen Person entschieden; akut bedrohliche Situationen brauchen zuerst Sicherheit und passende Hilfe.",
        links: [
          {
            text: "Begleiterkrankungen",
            url: "/verstehen/begleiterkrankungen",
          },
          { text: "Glossar — Komorbidität", url: "/glossar" },
        ],
      },
      {
        claimIds: ["faq-depression-suizidalitaet"],
        question:
          "Mein Angehöriger hat zusätzlich zur Borderline auch eine Depression — was bedeutet das?",
        answer:
          "Depressive Beschwerden oder eine depressive Erkrankung können zusätzlich zu Borderline auftreten, aber nicht bei allen Menschen. Dauer oder Wechsel einer Stimmung reichen für Angehörige nicht aus, um die Ursache einzuordnen; das ist Aufgabe einer fachlichen Abklärung. Bei Depression gehört auch Suizidalität zur fachlichen Abklärung. Wenn Sie anhaltende Hoffnungslosigkeit oder konkrete Aussagen mit suizidalem Inhalt wahrnehmen, nehmen Sie diese ernst und holen Sie professionelle Hilfe — unabhängig von einer bestehenden Diagnose.",
        links: [
          {
            text: "Begleiterkrankungen — Depression",
            url: "/verstehen/begleiterkrankungen#depression",
          },
          { text: "Soforthilfe", url: "/soforthilfe" },
        ],
      },
    ],
  },
  {
    title: "Kommunikation & Konflikte",
    questions: [
      {
        claimIds: ["faq-suizidaeusserung", "faq-bedrohung-schutz"],
        question: "Wie reagiere ich auf bedrohlich wirkende Aussagen?",
        answer:
          "Suizidäusserungen immer ernst nehmen und professionelle Hilfe einschalten – sagen Sie klar: «Wenn du sagst, du willst dir etwas antun, hole ich Hilfe.» Bei anderen bedrohlich wirkenden Aussagen bleiben Sie bei dem, was Sie tatsächlich wahrnehmen: Fragen Sie nach der Bedeutung, achten Sie auf konkrete Hinweise auf Gefahr und benennen Sie Ihre Grenze. Ein Motiv lässt sich von aussen nicht sicher ableiten. Bei Bedrohung oder Gewalt haben Abstand und Schutz Vorrang vor dem Gespräch.",
        links: [{ text: "Krisenszenarien-Anleitungen", url: "/soforthilfe" }],
      },
      {
        claimIds: ["faq-beschuldigung-gespraech"],
        question: "Was sage ich, wenn mein Angehöriger mich beschuldigt?",
        answer:
          "Rechtfertigungen oder Gegenangriffe können ein angespanntes Gespräch weiter verschärfen. Versuchen Sie zunächst zu klären, was die andere Person erlebt: «Ich höre, dass dich das verletzt hat.» Damit erkennen Sie ihr Erleben an, ohne einer Beschuldigung zuzustimmen. Wenn Sie angeschrien werden, können Sie eine Grenze benennen: «Ich möchte darüber sprechen, aber nicht, solange wir schreien.» Eine Pause kann helfen; Sie dürfen auch sagen, wenn Sie das Gespräch heute nicht fortsetzen. Sie müssen sich nicht für etwas entschuldigen, das Sie nicht getan haben.",
        links: [
          { text: "Gesprächshilfen kennenlernen", url: "/kommunizieren" },
          { text: "Gespräche üben →", url: "/uebungen" },
        ],
      },
      {
        claimIds: ["faq-wechselnde-bewertungen"],
        question: "Was hilft bei stark wechselnden Bewertungen?",
        answer:
          "Unter hoher Anspannung kann es vorübergehend schwerer sein, widersprüchliche Gefühle und Eindrücke gleichzeitig wahrzunehmen. Das kann sich als stark wechselnde Bewertung einer Person oder Situation zeigen, tritt aber nicht bei allen Menschen mit Borderline auf und sagt nichts Sicheres über Absicht oder Charakter. Bleiben Sie bei Ihrer Wahrnehmung und fragen Sie nach: «Gestern haben wir uns nah gefühlt; gerade erlebe ich viel Distanz. Wie ist es für dich?» Sie dürfen zugleich Ihre eigene Sicht und Ihre Grenzen behalten.",
        links: [{ text: "Borderline verstehen", url: "/verstehen" }],
      },
      {
        claimIds: ["faq-ehrlichkeit-privatsphaere"],
        question: "Soll ich lügen, um Konflikte zu vermeiden?",
        answer:
          "Ehrlichkeit und ein Recht auf Privatsphäre sind in jeder Beziehung wichtig. Frühere Verletzungen, aktuelle Unsicherheit oder Erfahrungen mit Stigmatisierung können Vertrauen erschweren; das ist individuell verschieden und nicht allein durch eine Diagnose erklärt. Sprechen Sie ehrlich und respektvoll, verwenden Sie «Ich»-Aussagen und teilen Sie nur, was Sie verantworten können. Wenn ein Gespräch belastet, können Sie das Erleben anerkennen, ohne etwas Unwahres zu sagen. Ehrlichkeit mit Mitgefühl liegt zwischen verletzender Offenheit und Vermeidung.",
        links: [{ text: "Kommunikation & Validierung", url: "/kommunizieren" }],
      },
    ],
  },
  {
    title: "Grenzen & Selbstschutz",
    questions: [
      {
        claimIds: [
          "faq-fu-voraussetzungen",
          "faq-fu-zustaendigkeit",
          "faq-aufnahme-einschaetzung",
        ],
        question: "Wann ist eine Einweisung nötig?",
        answer:
          "Eine stationäre Aufnahme und eine fürsorgerische Unterbringung (FU) sind unterschiedliche Fragen. Ob eine Aufnahme sinnvoll ist, braucht eine professionelle Einschätzung. Eine FU setzt die gesetzlichen Voraussetzungen voraus: Eine Person darf wegen einer psychischen Störung, geistigen Behinderung oder schweren Verwahrlosung in einer geeigneten Einrichtung untergebracht werden, wenn die notwendige Behandlung oder Betreuung nicht anders erfolgen kann. Eine Diagnose oder die Belastung von Angehörigen allein genügt dafür nicht. Zuständig ist grundsätzlich die KESB; kantonal bezeichnete Ärzt:innen können ebenfalls befugt sein. Angehörige ordnen keine FU an. Bei akuter Gefahr oder Unsicherheit finden Sie passende Anlaufstellen auf der Soforthilfe-Seite.",
        links: [
          { text: "Akute Hilfe und Notfallkontakte", url: "/soforthilfe" },
        ],
      },
      {
        claimIds: ["faq-trennung-sicherheit"],
        question: "Darf ich meinen Angehörigen verlassen?",
        answer:
          "Ja. Eine Krise verpflichtet Sie nicht, in einer Beziehung oder an einem Ort zu bleiben. Ihre Sicherheit und Selbstbestimmung haben Vorrang; Sie dürfen eine Beziehung beenden oder eine Situation verlassen, auch wenn die andere Person psychisch erkrankt oder akut belastet ist. Wenn es für Sie sicher und gewünscht ist, können Vorbereitung, Schutzplanung oder fachliche Beratung helfen. Bei Drohungen, Gewalt, betroffenen Kindern oder Suizidankündigungen holen Sie zusätzliche Hilfe, ohne die Verantwortung allein zu übernehmen. Sie können gehen und trotzdem Mitgefühl behalten.",
        links: [{ text: "Grenzen setzen", url: "/grenzen" }],
      },
      {
        claimIds: [
          "faq-kind-alltag",
          "faq-kind-beratung",
          "faq-kesb-melderecht",
          "faq-kesb-meldepflicht",
          "faq-kindesschutz-massnahmen",
          "faq-kind-akute-gefahr",
        ],
        question: "Wie schütze ich meine Kinder?",
        answer:
          "Wichtig ist, alltägliche Belastung, wiederholte Eskalation, Kindeswohlgefährdung und akute Gefahr auseinanderzuhalten. Nicht jede überforderte Familie braucht sofort eine Meldung – aber Kinder brauchen Schutz vor Gewalt, massiver Alarmstimmung und Krisensituationen, die sie nicht einschätzen können. Erklären Sie altersgerecht, dass starke Gefühle nicht die Schuld des Kindes sind, und schützen Sie Kinder aktiv vor Eskalationen.",
        bullets: [
          "Im Alltag helfen Routinen, verlässliche Bezugspersonen, Schlaf, Schule, Freunde und eine einfache Sprache: «Bei uns ist es gerade schwer. Du hast daran keine Schuld.»",
          "Bei wiederholten Eskalationen holen Sie früh fachliche Beratung dazu. Anlaufstellen finden Sie auf der Soforthilfe-Seite.",
          "Wenn ein Kind selbst stark belastet ist, können der schulpsychologische Dienst, die Kinder- und Jugendpsychiatrie oder die örtliche Mütter-/Väterberatung passende Unterstützung bieten.",
          "Jede Person kann der KESB melden, wenn die körperliche, psychische oder sexuelle Integrität eines Kindes gefährdet erscheint. Sie müssen eine Gefährdung nicht selbst beweisen. Eine Kindesschutzberatung kann beim Einordnen helfen; bei akuter Gefahr nicht auf eine Beratung oder Meldungsbearbeitung warten.",
          "Für bestimmte berufliche und amtliche Rollen gelten Meldepflichten bei konkreten Hinweisen, wenn im eigenen Tätigkeitsrahmen keine Abhilfe möglich ist. Berufsgeheimnis und zusätzliche kantonale Pflichten können relevant sein; lassen Sie Ihre konkrete Rolle fachlich klären.",
          "Bei akuter Gefahr bringen Sie sich und das Kind in Sicherheit und holen Sie professionelle Hilfe.",
        ],
        links: [
          { text: "Grenzen setzen", url: "/grenzen" },
          { text: "Selbstfürsorge als Elternteil", url: "/selbstfuersorge" },
          {
            text: "Jugendliche & Diagnostik",
            url: "/verstehen/diagnostik#jugendliche",
          },
          { text: "Akute Hilfe und Notfallkontakte", url: "/soforthilfe" },
        ],
      },
      {
        claimIds: ["faq-co-abhaengigkeit"],
        question: "Woran merke ich, dass mein eigenes Leben zu kurz kommt?",
        answer:
          "Verwenden Sie «Co-Abhängigkeit» nicht, um sich oder andere Angehörige zu diagnostizieren. Hilfreicher sind konkrete Fragen: Vernachlässigen Sie Schlaf, Gesundheit, Freundschaften oder Arbeit? Fühlen Sie sich für Gefühle und Entscheidungen der anderen Person verantwortlich? Übernehmen Sie mehr, als Sie wollen oder tragen können? Diese Fragen sind keine Diagnoseliste. Beratung, eigene Therapie oder eine Angehörigengruppe können Möglichkeiten bieten, Bedürfnisse, Verantwortung und Grenzen zu besprechen.",
        links: [
          { text: "Selbstfürsorge", url: "/selbstfuersorge" },
          { text: "Glossar: Co-Abhängigkeit einordnen", url: "/glossar" },
        ],
      },
    ],
  },
  {
    title: "Therapie & Behandlung",
    questions: [
      {
        claimIds: ["faq-therapie-autonomie"],
        question: "Was, wenn die nahestehende Person keine Therapie möchte?",
        answer:
          "Ob jemand eine Therapie beginnt, entscheidet die betroffene Person. Sprechen Sie Unterstützung als Möglichkeit an, ohne zu drängen: «Ich mache mir Sorgen. Möchtest du gemeinsam nach Angeboten schauen?» Fragen Sie, was gegen eine Behandlung spricht und welche Form von Hilfe vorstellbar wäre. Eigene Grenzen dienen Ihrem Schutz und Ihren Bedürfnissen, nicht als Druckmittel für eine Behandlung. Holen Sie sich selbst Unterstützung, unabhängig davon, wie die andere Person entscheidet. Bei akuter Gefährdung gelten die beschriebenen Notfallwege; eine notwendige Intervention beurteilen die zuständigen Fachpersonen.",
        links: [
          {
            text: "Therapieangebote Zürich",
            url: "/unterstuetzen/therapie#therapieangebote",
          },
        ],
      },
      {
        claimIds: ["faq-strukturierte-psychotherapie"],
        question: "Welche Therapie ist am besten?",
        answer:
          "Es gibt keine einzelne Therapie, die für alle Menschen am besten ist. Empfohlen wird eine strukturierte Psychotherapie, die auf die zentralen Schwierigkeiten der Borderline-Persönlichkeitsstörung ausgerichtet ist. Dazu gehören zum Beispiel DBT, MBT, Schematherapie oder TFP; auch strukturierte generalistische Behandlungen können wirksam sein. Methode, Qualifikation der Fachperson, gemeinsam vereinbarte Ziele, verlässlicher Rahmen, Zugänglichkeit und therapeutische Zusammenarbeit sind gemeinsam wichtig.",
        links: [
          { text: "Therapieformen erklärt", url: "/unterstuetzen/therapie" },
        ],
      },
      {
        claimIds: [
          "faq-medikamente-kernbehandlung",
          "faq-medikamente-zeitbegrenzung",
          "faq-medikamente-aenderung",
        ],
        question: "Helfen Medikamente bei Borderline?",
        answer:
          "Es gibt keine etablierte medikamentöse Kernbehandlung der Borderline-Persönlichkeitsstörung; strukturierte Psychotherapie steht im Zentrum. Medikamente können für klar benannte Begleiterkrankungen oder in einzelnen Situationen zeitlich begrenzt erwogen werden. Ziel, erwarteter Nutzen, Risiken, Dauer und Überprüfung sollten ärztlich festgelegt werden; unwirksame oder nicht mehr nötige Medikamente gehören überprüft. Einnahme, Umstellung oder Absetzen erfolgen ärztlich begleitet. Angehörige müssen nicht zum Medikamenten-Management werden.",
        links: [
          {
            text: "Begleiterkrankungen",
            url: "/verstehen/begleiterkrankungen",
          },
          {
            text: "Therapie und Angehörigenrolle",
            url: "/unterstuetzen/therapie",
          },
        ],
      },
      {
        claimIds: ["faq-therapie-einbezug"],
        question: "Soll ich an der Therapie teilnehmen?",
        answer:
          "Wenn die betroffene Person und die behandelnde Fachperson Sie einladen und alle Beteiligten zustimmen, können Angehörigensitzungen oder Familiengespräche Verständnis und Zusammenarbeit fördern. Klären Sie vorab Ziel, Rolle und Vertraulichkeit. Bringen Sie Ihre eigene Perspektive ein und hören Sie auch die anderen Sichtweisen an; es geht nicht darum, Schuld oder Recht zu verteilen. Wenn Sie nicht eingeladen werden, respektieren Sie die Entscheidung und den geschützten Therapieraum. Eigene Angehörigenberatung bleibt unabhängig davon möglich.",
        links: [
          {
            text: "Therapie und Angehörigenrolle",
            url: "/unterstuetzen/therapie",
          },
        ],
      },
      {
        claimIds: ["faq-behandlungsdauer"],
        question: "Wie lange dauert die Behandlung?",
        answer:
          "Dauer und Setting einer Borderline-Behandlung werden individuell vereinbart. Belastung, Begleiterkrankungen, Ziele und verfügbare Angebote spielen dabei eine Rolle. Ambulante und stationäre Behandlungen können unterschiedliche Aufgaben haben; aus der Diagnose lässt sich weder eine feste Zahl von Wochen noch ein sicherer Erfolgszeitpunkt ableiten. Verläufe unterscheiden sich; schwierigere Phasen sind kein Zeichen von Versagen.",
        links: [{ text: "Genesung & Prognose", url: "/genesung" }],
      },
    ],
  },
  {
    title: "Alltag & Beziehung",
    questions: [
      {
        claimIds: ["faq-privatsphaere-information"],
        question: "Wie erkläre ich die Situation Freunden/Familie?",
        answer:
          "Sie müssen nicht alles erklären und sollten die Privatsphäre der betroffenen Person mitbedenken. Sagen Sie nur so viel, wie für Ihre eigene Unterstützung nötig ist: «Eine mir nahestehende Person erlebt gerade psychische Belastungen. Ich möchte ihre Privatsphäre wahren, brauche aber selbst etwas Unterstützung.» Sie können Grenzen setzen: «Ich möchte nicht ins Detail gehen.» Wählen Sie sorgfältig aus, wem Sie was erzählen, und bitten Sie um konkrete Hilfe, zum Beispiel: «Könntest du nächste Woche auf die Kinder aufpassen?»",
      },
      {
        claimIds: ["faq-sprache-dolmetschung", "faq-sprache-schutz"],
        question:
          "Was, wenn Deutsch nicht die Hauptsprache ist oder psychische Erkrankung in unserer Familie tabuisiert ist?",
        answer:
          "Hilfe kann auch dann sinnvoll sein, wenn das Wort «Borderline» in der Familie noch gar nicht fällt. Als Gesprächseinstieg können Sie über das Beobachtbare sprechen: Schlaf, starke Anspannung, Rückzug, laut geführte Konflikte, Selbstverletzung, Angst, Schule, Arbeit oder Sicherheit.",
        bullets: [
          "Verwenden Sie kurze, konkrete Sätze statt Fachsprache. Nicht jede Familie muss zuerst die Diagnose akzeptieren, bevor Unterstützung beginnen darf.",
          "Fragen Sie in Praxis, Klinik oder Beratungsstelle ausdrücklich nach professioneller Dolmetschung, wenn Deutsch nicht für alle sicher genug ist. Gerade bei Diagnose-, Krisen- oder Gewaltgesprächen sollten Kinder diese Rolle nicht übernehmen müssen.",
          "Wenn Scham, Angst vor Stigmatisierung oder Unsicherheit gegenüber Behörden gross sind, benennen Sie zuerst das Ziel: Schutz, Entlastung, weniger Eskalation, mehr Schlaf oder Sicherheit für die Kinder.",
          "Bei akuter Gefahr gilt trotzdem: Sicherheit geht vor. Dann lieber früh Hilfe holen, auch wenn noch nicht alle Begriffe, Hintergründe oder Familienkonflikte geklärt sind.",
        ],
        links: [
          {
            text: "Therapie und Angehörigenrolle",
            url: "/unterstuetzen/therapie",
          },
          { text: "Soforthilfe", url: "/soforthilfe" },
        ],
      },
      {
        claimIds: ["faq-kontrolle-grenzen"],
        question: "Wie gehe ich mit Eifersucht und Kontrolle um?",
        answer:
          "Eifersucht und kontrollierendes Verhalten können viele Ursachen haben; aus einer Borderline-Diagnose lässt sich das Motiv nicht ableiten. Unterscheiden Sie zwischen einem nachvollziehbaren Gefühl und einem Verhalten, das Ihre Privatsphäre oder Sicherheit verletzt. Sie können Unsicherheit anerkennen und zugleich eine Grenze benennen: «Ich sehe, dass dich das verunsichert. Mein Handy bleibt privat.» Die Grenze schützt Ihre Privatsphäre; sie soll die andere Person weder bestrafen noch zu einer Veränderung zwingen. Wenn die betroffene Person das möchte, kann sie solche Situationen in einer Therapie oder einem gemeinsamen Beratungsgespräch bearbeiten.",
        links: [{ text: "Grenzen setzen", url: "/grenzen" }],
      },
      {
        claimIds: ["faq-eigene-beduerfnisse"],
        question: "Wie kann ich mein eigenes Leben behalten?",
        answer:
          "Eigene Freundschaften, Interessen und Erholungszeiten sind kein Verrat, sondern gehören zu Ihrem Leben. Unter hoher Belastung braucht es manchmal bewusste Entscheidungen, damit diese Bereiche nicht vollständig verschwinden. Ein tragfähiger Alltag darf Beziehung, Selbstschutz, Freude und eigene Ziele nebeneinander enthalten. Beratung oder Austausch mit anderen Angehörigen kann helfen, dafür wieder Raum zu schaffen.",
        links: [
          { text: "Selbstfürsorge-Strategien", url: "/selbstfuersorge" },
          { text: "Beratung & Netzwerke", url: "/beratung" },
        ],
      },
      {
        claimIds: ["faq-besserung-zeitplan"],
        question: "Wann wird es besser?",
        answer:
          "Das ist für viele Angehörige eine schwierige Frage. Der Verlauf bleibt begrenzt vorhersehbar: Manche Menschen erleben nach Monaten deutliche Fortschritte, bei anderen dauert es länger, und Genesung kann unterschiedlich aussehen. Sie sind nicht für Zeitpunkt, Tempo oder Erfolg der Genesung verantwortlich. Entscheiden können Sie über Ihre eigenen Reaktionen, Grenzen und Unterstützung. Hilfreich ist meist, Entwicklungen über längere Zeit zu betrachten statt einzelne Tage oder Krisen.",
        links: [{ text: "Genesung & Prognose", url: "/genesung" }],
      },
    ],
  },
];

export default function FAQ() {
  const [query, setQuery] = useState("");
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      // Categories: scroll. Questions (ContentSection ids): openSection() also scrolls.
      if (sectionId.startsWith("cat-")) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        openSection(sectionId);
      }
    },
    []
  );

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqCategories;
    return faqCategories
      .map(cat => ({
        ...cat,
        questions: cat.questions.filter(faq => {
          const haystack = [faq.question, faq.answer, ...(faq.bullets ?? [])]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        }),
      }))
      .filter(cat => cat.questions.length > 0);
  }, [query]);

  const totalMatches = filteredCategories.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );

  const labelStyle = {
    fontSize: "var(--text-xs)",
    letterSpacing: "var(--tracking-caps)",
    color: "var(--fg-tertiary)",
    fontWeight: 500,
  } as const;

  return (
    <Layout>
      <SEO
        title="Häufige Fragen"
        description="Häufige Fragen von Angehörigen zu Borderline: Verhalten in Krisen, Grenzen setzen, Kommunikation und Selbstschutz – klar und ohne Umschweife beantwortet."
        path="/faq"
      />
      <FAQSchema
        questions={faqCategories.flatMap(c =>
          c.questions.map(q => ({ question: q.question, answer: q.answer }))
        )}
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-16 pt-12 md:pb-24 md:pt-16">
          <EyebrowLabel spacing="compact">Häufige Fragen</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Häufig gestellte Fragen
          </DisplayHeading>
          <Lede className="mt-6">
            Antworten auf häufige Fragen von Angehörigen. Die FAQ sollen
            Orientierung geben, ohne schwierige Situationen zu stark zu
            vereinfachen oder eine individuelle Einschätzung zu ersetzen.
          </Lede>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Alle Antworten zusammen ca. 18 Min · Einzelne Fragen sind direkt
            über das Inhaltsverzeichnis erreichbar.
          </p>
          <LastVerifiedBadge path="/faq" className="mt-6" />
        </header>

        {/* ── Hinweis (vorher Card) ── */}
        <EditorialSectionBlock rule>
          <EditorialProse>
            <p>
              Manche Fragen lassen sich nicht allgemein beantworten, weil
              Sicherheit, Kinder, Gewalt, Trennung oder akute Suizidalität eine
              eigene Einschätzung brauchen. Nutzen Sie diese Seite als
              Orientierung und holen Sie bei Bedarf zusätzliche Beratung dazu.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        {/* ── Filter-Eingabe ── */}
        <div className="mt-12">
          <label
            htmlFor="faq-filter"
            className="block uppercase"
            style={labelStyle}
          >
            Fragen durchsuchen
          </label>
          <input
            id="faq-filter"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="z.B. Kinder, Einweisung, Medikamente"
            className="mt-2 w-full border-b bg-transparent py-2 outline-none focus:border-[color:var(--accent-primary)]"
            style={{
              borderColor: "var(--rule-color)",
              fontSize: "var(--text-md)",
              color: "var(--fg-primary)",
            }}
            aria-describedby="faq-filter-status"
          />
          {query.trim() && (
            <p
              id="faq-filter-status"
              className="mt-2"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--fg-tertiary)",
              }}
              aria-live="polite"
            >
              {totalMatches === 0
                ? "Keine Treffer."
                : `${totalMatches} ${totalMatches === 1 ? "Treffer" : "Treffer"}.`}
            </p>
          )}
        </div>

        {/* ── Kategorie-Sprungleiste ── */}
        {!query.trim() && (
          <nav
            aria-label="Kategorie-Sprungleiste"
            className="mt-8 border-t border-b py-4"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p
              className="flex flex-wrap gap-x-5 gap-y-2 uppercase"
              style={labelStyle}
            >
              {faqCategories.map(category => {
                const catId = `cat-${slugify(category.title)}`;
                return (
                  <a
                    key={catId}
                    href={`#${catId}`}
                    className="editorial-link"
                    onClick={e => handleAnchorClick(e, catId)}
                  >
                    {category.title}
                  </a>
                );
              })}
            </p>
          </nav>
        )}

        {/* ── FAQ-Kategorien ── */}
        {filteredCategories.length === 0 && query.trim() && (
          <p
            className="mt-12"
            style={{
              fontSize: "var(--text-md)",
              color: "var(--fg-secondary)",
            }}
          >
            Keine passenden Fragen gefunden. Versuchen Sie einen anderen
            Suchbegriff oder kontaktieren Sie die{" "}
            <Link href="/fachstelle" className="editorial-link">
              Fachstelle Angehörigenarbeit
            </Link>
            .
          </p>
        )}
        {filteredCategories.map(category => {
          const catId = `cat-${slugify(category.title)}`;
          return (
            <section key={category.title} id={catId}>
              <EditorialSectionBlock label="Themenfeld" title={category.title}>
                <div className="mt-2">
                  {category.questions.map(faq => {
                    const faqId = `faq-${slugify(faq.question)}`;
                    return (
                      <ContentSection
                        key={`${faqId}-${query.trim() ? "filtered" : "default"}`}
                        variant="editorial"
                        title={faq.question}
                        id={faqId}
                        defaultOpen={!!query.trim()}
                      >
                        <div data-faq-id={faqId}>
                          <EditorialProse>
                            <p>{faq.answer}</p>
                            {faq.bullets && faq.bullets.length > 0 && (
                              <ul
                                className="mt-4 space-y-2"
                                style={{
                                  fontSize: "var(--text-md)",
                                  lineHeight: "var(--lh-relaxed)",
                                  color: "var(--fg-secondary)",
                                }}
                              >
                                {faq.bullets.map(bullet => (
                                  <li key={bullet}>{bullet}</li>
                                ))}
                              </ul>
                            )}
                            {faq.links && faq.links.length > 0 && (
                              <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                                {faq.links.map(link => (
                                  <Link
                                    key={link.url + link.text}
                                    href={link.url}
                                    className="editorial-link"
                                  >
                                    {link.text.replace(/\s*→\s*$/, "")}
                                  </Link>
                                ))}
                              </p>
                            )}
                          </EditorialProse>
                          <ClaimEvidence claimIds={faq.claimIds} />
                        </div>
                      </ContentSection>
                    );
                  })}
                </div>
              </EditorialSectionBlock>
            </section>
          );
        })}

        {/* ── Quellen ── */}
        <div className="mt-12">
          <EvidenceNote
            variant="editorial"
            title="Quellen zu Prognose- und Therapieaussagen"
            definition="Kurzdefinition: Remission = Diagnosekriterien werden über längere Zeit nicht mehr erfüllt; Recovery = Remission plus stabiles soziales/berufliches Funktionsniveau."
            sources={[
              {
                label:
                  "Zanarini et al. (2010), Time to attainment of recovery from BPD",
                href: "https://pubmed.ncbi.nlm.nih.gov/20395399/",
              },
              {
                label:
                  "Zanarini et al. (2012), Sustained remission and recovery in BPD",
                href: "https://pubmed.ncbi.nlm.nih.gov/22737693/",
              },
              {
                label: "Gunderson et al. (2011), Ten-year course of BPD (CLPS)",
                href: "https://pubmed.ncbi.nlm.nih.gov/21464343/",
              },
              {
                label:
                  "Storebø et al. (2020), Psychological therapies for BPD (Cochrane)",
                href: "https://pubmed.ncbi.nlm.nih.gov/32368793/",
              },
            ]}
          />
        </div>

        {/* ── Weitere Fragen ── */}
        <EditorialSectionBlock
          label="Weiter"
          title="Ihre Frage ist nicht dabei?"
          rule
        >
          <EditorialProse>
            <p>
              Nutzen Sie die Suchfunktion oder kontaktieren Sie die{" "}
              <Link href="/fachstelle" className="editorial-link">
                Fachstelle Angehörigenarbeit
              </Link>{" "}
              der PUK Zürich für individuelle Beratung. Begriffe nachschlagen im{" "}
              <Link href="/glossar" className="editorial-link">
                Glossar
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSectionBlock>
      </EditorialLayout>
    </Layout>
  );
}
