import { createHandoutTextVersion } from "./shared";
import { AKUT_KONTAKT_IDS, kontaktByIdStrict } from "@/data/kontakte";

// Ziffern kommen aus der Single Source (kontakte.ts); Label/Beschreibung
// bleiben handgeschrieben. Beide Notfalllisten unten rendern aus demselben
// kanonischen AKUT_KONTAKT_IDS-Satz → identisch zusammengesetzt und sortiert.
const nr = (id: (typeof AKUT_KONTAKT_IDS)[number]) =>
  kontaktByIdStrict(id).nummer;

const AKUT_LABEL: Record<(typeof AKUT_KONTAKT_IDS)[number], string> = {
  ROT_144: "Sanität",
  ROT_117: "Polizei",
  INFO_AERZTEFON: "Ärztefon",
  GELB_PUK_ERW: "PUK Zürich Notfall Erwachsene",
  GELB_PUK_KJP: "PUK Kinder und Jugendliche",
  GELB_PUK_65: "PUK ab 65",
  GRUEN_143: "Dargebotene Hand",
};

// Ausführliche Beschreibungen (Liste «Wichtige Kontakte in einer Krise»).
const AKUT_TEXT_LANG: Record<(typeof AKUT_KONTAKT_IDS)[number], string> = {
  ROT_144:
    "Akute Lebensgefahr, laufende Suizidhandlung, schwere Selbstverletzung, Bewusstlosigkeit oder schwere Intoxikation.",
  ROT_117: "Gewalt, akute Bedrohung oder wenn sofort Schutz vor Ort nötig ist.",
  INFO_AERZTEFON:
    "Dringende medizinische oder psychiatrische Notfall-Triage, 24/7.",
  GELB_PUK_ERW: "Psychiatrische Krise ohne unmittelbare Lebensgefahr, 24/7.",
  GELB_PUK_KJP: "Psychiatrische Krise bis 18 Jahre, 24/7.",
  GELB_PUK_65: "Psychiatrische Krise ab 65 Jahren, 24/7.",
  GRUEN_143:
    "Entlastendes Gespräch für Angehörige und Betroffene. Bei akuter Gefahr kein Ersatz für den Notruf.",
};

// Kurze Beschreibungen (Liste «Kontaktübersicht – Kurzreferenz»).
const AKUT_TEXT_KURZ: Record<(typeof AKUT_KONTAKT_IDS)[number], string> = {
  ROT_144: "Akute Lebensgefahr.",
  ROT_117: "Bedrohung oder Gewalt.",
  INFO_AERZTEFON: "Triage 24/7.",
  GELB_PUK_ERW: "Psychiatrischer Notfall, 24/7.",
  GELB_PUK_KJP: "Bis 18 Jahre, 24/7.",
  GELB_PUK_65: "Ab 65 Jahren, 24/7.",
  GRUEN_143:
    "Entlastendes Gespräch, anonym und 24/7. Bei akuter Gefahr kein Ersatz für den Notruf.",
};

const akutCards = (texts: Record<(typeof AKUT_KONTAKT_IDS)[number], string>) =>
  AKUT_KONTAKT_IDS.map(id => ({
    title: `${nr(id)} – ${AKUT_LABEL[id]}`,
    text: texts[id],
  }));

export const handoutTextVersions = [
  createHandoutTextVersion("notfallplan-krise", {
    kicker: "Textversion",
    summary:
      "Konkrete Orientierung für Angehörige bei Suizidgedanken, Selbstverletzung oder akuter seelischer Krise: Beobachtungen ernst nehmen, direkt ansprechen und professionelle Hilfe einbeziehen.",
    intro: [
      "Diese Seite macht den «Notfallplan bei psychischer Krise» direkt lesbar. Die Orientierung bleibt bewusst nah am Notfallplan, damit wichtige Hinweise auch ohne PDF-Ansicht schnell zugänglich sind.",
      "Der Notfallplan richtet sich an Angehörige, wenn Suizidgedanken, Selbstverletzung oder eine akute psychische Krise im Raum stehen. Er ersetzt keine professionelle Beurteilung, soll aber helfen, in einer belastenden Situation klarer zu handeln.",
    ],
    sections: [
      {
        title: "Akute Gefahr? Sofort handeln.",
        intro: `Sofort ${nr("ROT_144")} anrufen, wenn unmittelbare Lebensgefahr besteht oder medizinische Hilfe vor Ort nötig ist, zum Beispiel wenn die Person:`,
        bullets: [
          "sich weiter selbst verletzt, eine schwere Verletzung hat, stark blutet oder dringend medizinisch versorgt werden muss",
          "eine Überdosis eingenommen hat oder eine schwere Intoxikation vermutet wird",
          "bewusstlos ist",
          "einen konkreten Suizidplan äussert oder unmittelbar in Gefahr ist",
        ],
      },
      {
        title: "Wichtige Kontakte in einer Krise",
        cards: akutCards(AKUT_TEXT_LANG),
      },
      {
        title: "Wichtiger Soforthinweis",
        calloutTitle: "Sicherheit vor Diskussion",
        calloutText:
          "Holen Sie bei möglicher unmittelbarer Gefahr zuerst professionelle Hilfe und folgen Sie den Anweisungen der Leitstelle. Bleiben Sie nur bei der Person oder in Kontakt, soweit dies für Sie sicher und möglich ist; daraus entsteht keine alleinige Überwachungs- oder Sicherungspflicht. Begrenzen Sie den Zugang zu Medikamenten, Alkohol oder gefährlichen Gegenständen nur ohne Eigengefährdung, möglichst gemeinsam und nach Anleitung der Leitstelle. Nehmen Sie nichts gegen Widerstand weg und greifen Sie nicht körperlich ein.",
      },
      {
        title:
          "4 Schritte in der Krise – wenn jemand Suizidgedanken äussert oder sich selbst verletzt",
        cards: [
          {
            title: "1. Eigenes Tempo reduzieren",
            text: "Ihre Angst ist verständlich. Wenn es Ihnen möglich ist, atmen Sie bewusst und sprechen Sie langsam. Das kann Ihnen helfen, Beobachtungen klar zu benennen und professionelle Hilfe einzubeziehen. Sie müssen weder vollkommen ruhig sein noch die Krise des anderen Menschen regulieren.",
          },
          {
            title: "2. Ernst nehmen und direkt ansprechen",
            text: "Jede Äusserung über Suizid oder Selbstverletzung sollte ernst genommen werden. Sprechen Sie das Thema offen und klar an – das erhöht das Risiko nicht, sondern kann entlastend sein. Beispiele: «Ich habe gehört, was du gesagt hast. Ich nehme das ernst.» und «Denkst du daran, dir etwas anzutun?»",
          },
          {
            title: "3. Zuhören und Gefühle anerkennen",
            text: "Hören Sie zu, ohne vorschnell zu beruhigen, zu argumentieren oder sofort Lösungen anzubieten. Es geht zuerst darum, die Not wahrzunehmen. Beispiele: «Ich sehe, dass es dir gerade sehr schlecht geht.» und «Du musst das gerade nicht allein aushalten.»",
          },
          {
            title: "4. Professionelle Hilfe einbeziehen",
            text: "Sie müssen diese Situation nicht allein tragen oder beurteilen. Ziehen Sie frühzeitig professionelle Hilfe bei, und folgen Sie in der Akutsituation den Anweisungen der Leitstelle. Informieren Sie wenn möglich die behandelnde Fachperson oder nutzen Sie die Notfallnummern. Suizidgedanken und akute Selbstgefährdung sollten nicht als Geheimnis mitgetragen werden.",
          },
        ],
      },
      {
        title: "Das hilft",
        bullets: [
          "früh professionelle Hilfe holen und klare Beobachtungen weitergeben",
          "den Anweisungen der Leitstelle folgen und nur dann dableiben, wenn es für Sie sicher und möglich ist",
          "direkt und klar nachfragen",
          "Gefühle ernst nehmen und anerkennen",
          "die professionelle Einschätzung einer möglichen Gefährdung veranlassen",
          "konkrete Sicherheit vor Diskussion stellen",
        ],
      },
      {
        title: "Das schadet eher",
        bullets: [
          "Panik, Vorwürfe oder Druck",
          "bagatellisieren oder ablenken",
          "lange Diskussionen, warum das Leben doch schön sei",
          "argumentieren oder überzeugen wollen",
          "drohen oder bestrafen",
          "versuchen, die Gefahr allein zu beurteilen oder die Person ohne professionelle Hilfe zu überwachen",
          "selbst in einer unsicheren oder bedrohlichen Situation bleiben",
          "Suizidgedanken als Geheimnis für sich behalten",
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Leitsatz für die Akutsituation",
        calloutText:
          "«Ich nehme dich ernst. Ich bin da. Und ich hole Hilfe – für dich und für mich.»",
      },
      {
        title: "Nach der akuten Situation",
        intro: `Nach einer akuten Situation kann fachliche Nachsorge nötig sein. Bei erneut möglicher unmittelbarer Lebensgefahr gilt weiterhin: ${nr("ROT_144")} anrufen. Angehörige müssen den Verlauf weder überwachen noch eine weitere Krise vorhersagen. Mögliche nächste Schritte sind:`,
        bullets: [
          "mit der betroffenen Person und, wenn sie einverstanden ist, mit der Fachperson klären, welche Nachsorge vorgesehen ist",
          "die betroffene Person fragen, welche Unterstützung jetzt gewünscht ist oder nicht",
          "eigene Unterstützung für Angehörige organisieren",
          "einen vereinbarten professionellen Hilfeweg für erneute Sorge griffbereit halten",
          "Beobachtungen oder Wünsche nur freiwillig festhalten; es besteht keine Pflicht, Warnzeichen zu überwachen oder einen Auslöser zu bestimmen",
        ],
      },
      {
        title: "Selbstfürsorge für Angehörige",
        intro:
          "Auch Sie brauchen Unterstützung. Krisen belasten Angehörige stark – das ist normal und kein Zeichen von Schwäche.",
        bullets: [
          "eigene Belastungsgrenze wahrnehmen",
          "Gespräch mit eigener Fachperson suchen",
          "nicht alles allein tragen müssen",
          "Fachstelle Angehörigenarbeit PUK kontaktieren",
          `Dargebotene Hand ${nr("GRUEN_143")} – auch für Angehörige`,
          "eigene Gefühle (Angst, Wut, Erschöpfung) zulassen",
        ],
      },
      {
        title: "Kontaktübersicht – Kurzreferenz",
        cards: [
          ...akutCards(AKUT_TEXT_KURZ),
          {
            // Angehörigen-Ergänzung (bewusst kein Akutblock-Eintrag).
            title: `${kontaktByIdStrict("INFO_FACHSTELLE").nummer} – Fachstelle Angehörigenarbeit PUK`,
            text: "Unterstützung für Angehörige.",
          },
        ],
      },
      {
        title: "Wichtiger Hinweis",
        calloutTitle: "Orientierung, kein Ersatz für Notfallbeurteilung",
        calloutText: `Dieser Notfallplan ersetzt keine professionelle Beurteilung und keine psychiatrische Diagnose. Er dient der Orientierung in einer akuten Situation. Bei akuter Lebensgefahr sofort ${nr("ROT_144")} anrufen.`,
      },
    ],
    sourceLine:
      "Quellen: Berkowitz, C. & Gunderson, J. G., BPD Family Guidelines (NEABPD); Project Air Strategy, Understanding Self-Harm & Suicidal Thinking for Families & Carers.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 10.03.2026.",
  }),
];
