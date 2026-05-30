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

// Ausführliche Beschreibungen (Liste «Wichtige Nummern im Akutfall»).
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
    "Entlastendes Gespräch für Angehörige und Betroffene. Kein Einsatzdienst.",
};

// Kurze Beschreibungen (Liste «Notfallnummern – Kurzreferenz»).
const AKUT_TEXT_KURZ: Record<(typeof AKUT_KONTAKT_IDS)[number], string> = {
  ROT_144: "Akute Lebensgefahr.",
  ROT_117: "Bedrohung oder Gewalt.",
  INFO_AERZTEFON: "Triage 24/7.",
  GELB_PUK_ERW: "Psychiatrischer Notfall, 24/7.",
  GELB_PUK_KJP: "Bis 18 Jahre, 24/7.",
  GELB_PUK_65: "Ab 65 Jahren, 24/7.",
  GRUEN_143: "Anonym, 24/7.",
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
      "Konkrete Orientierung für Angehörige bei Suizidgedanken, Selbstverletzung oder akuter seelischer Krise: Gefahr einschätzen, ruhig bleiben, direkt ansprechen und Hilfe einbeziehen.",
    intro: [
      "Diese Seite macht den «Notfallplan bei psychischer Krise» direkt lesbar. Die Orientierung bleibt bewusst nah am Notfallplan, damit wichtige Hinweise auch ohne PDF-Ansicht schnell zugänglich sind.",
      "Der Notfallplan richtet sich an Angehörige, wenn Suizidgedanken, Selbstverletzung oder eine akute psychische Krise im Raum stehen. Er ersetzt keine professionelle Beurteilung, soll aber helfen, in einer belastenden Situation klarer zu handeln.",
    ],
    sections: [
      {
        title: "Akute Gefahr? Sofort handeln.",
        intro: `Sofort ${nr("ROT_144")} anrufen, wenn medizinische Hilfe oder Rettung vor Ort nötig ist, zum Beispiel wenn die Person:`,
        bullets: [
          "sich gerade verletzt",
          "eine Überdosis eingenommen hat oder eine schwere Intoxikation vermutet wird",
          "bewusstlos ist",
          "einen konkreten Suizidplan äussert oder unmittelbar in Gefahr ist",
        ],
      },
      {
        title: "Wichtige Nummern im Akutfall",
        cards: akutCards(AKUT_TEXT_LANG),
      },
      {
        title: "Wichtiger Soforthinweis",
        calloutTitle: "Sicherheit vor Diskussion",
        calloutText:
          "Die Person nach Möglichkeit nicht ohne Hilfe, Notfallplan oder professionelle Einschätzung allein lassen – sofern Sie selbst sicher bleiben können. Gefährliche Gegenstände, Medikamente, Alkohol oder andere Mittel wenn möglich entfernen. Bei Unsicherheit lieber einmal zu viel Hilfe holen als einmal zu wenig.",
      },
      {
        title:
          "4 Schritte in der Krise – wenn jemand Suizidgedanken äussert oder sich selbst verletzt",
        cards: [
          {
            title: "1. Ruhe bewahren",
            text: "Ihre Angst ist verständlich. Panik, hektisches Sprechen oder Druck verstärken die Krise oft zusätzlich. Atmen Sie bewusst, sprechen Sie langsam und bleiben Sie so ruhig wie möglich. Ihre Ruhe kann der betroffenen Person vorübergehend Halt geben.",
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
            text: "Sie müssen diese Situation nicht allein tragen. Ziehen Sie frühzeitig professionelle Hilfe bei. Informieren Sie wenn möglich die behandelnde Fachperson oder nutzen Sie die Notfallnummern. Suizidgedanken und akute Selbstgefährdung sollten nicht als Geheimnis mitgetragen werden.",
          },
        ],
      },
      {
        title: "Das hilft",
        bullets: [
          "ruhig bleiben und, wenn es für Sie sicher ist, dableiben",
          "direkt und klar nachfragen",
          "Gefühle ernst nehmen und anerkennen",
          "Gefährdung einschätzen und Hilfe holen",
          "Fachpersonen oder Notfallstellen einbeziehen",
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
          "die Person trotz akuter Gefahr ohne Hilfe, Sicherheitsplan oder professionelle Einschätzung allein lassen",
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
        intro:
          "Auch wenn sich die Lage zunächst beruhigt hat, ist die Krise oft noch nicht vorbei. Wichtig ist danach:",
        bullets: [
          "behandelnde Fachperson informieren",
          "gemeinsam überlegen, was jetzt Sicherheit gibt",
          "Unterstützung auch für Angehörige organisieren",
          "nächste Stunden und Nacht nicht dem Zufall überlassen",
          "Warnzeichen und Auslöser festhalten",
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
        title: "Notfallnummern – Kurzreferenz",
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
      "Quellen: Gunderson & Berkowitz, BPD Family Guidelines (NEABPD); Project Air Strategy, Understanding Self-Harm & Suicidal Thinking for Families & Carers.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 10.03.2026.",
  }),
];
