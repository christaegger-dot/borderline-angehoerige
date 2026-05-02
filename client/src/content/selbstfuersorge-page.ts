export interface WarningSignalGroup {
  title: string;
  icon: "brain" | "heart" | "users";
  items: string[];
}

export interface LongTermStrategy {
  title: string;
  icon: "clock" | "heart" | "users" | "shield";
  intro: string;
  checklist?: string[];
  noteTitle?: string;
  noteText?: string;
  cards?: { title: string; text: string }[];
}

export interface RoleNote {
  title: string;
  icon: "heart" | "users" | "user-circle";
  text: string;
}

export const warningSignalGroups: WarningSignalGroup[] = [
  {
    title: "Emotional",
    icon: "brain",
    items: [
      "Gereiztheit",
      "Hoffnungslosigkeit",
      "Emotionale Taubheit",
      "Schuldgefühle",
      "Kontrollverlust-Angst",
    ],
  },
  {
    title: "Körperlich",
    icon: "heart",
    items: [
      "Erschöpfung",
      "Schlafprobleme",
      "Appetitveränderung",
      "Kopfschmerzen",
      "Infektanfälligkeit",
    ],
  },
  {
    title: "Sozial",
    icon: "users",
    items: [
      "Rückzug",
      "Hobbys vernachlässigt",
      "Isolationsgefühl",
      "Vermeidung",
      "Nur noch Angehöriger",
    ],
  },
];

export const longTermStrategies: LongTermStrategy[] = [
  {
    title: "Tägliche Mini-Auszeiten",
    icon: "clock",
    intro:
      "Versuchen Sie, im Alltag regelmässig kurze Zeiten nur für sich zu reservieren. An manchen Tagen sind 15 bis 30 Minuten realistisch, an anderen vielleicht nur 5. Entscheidend ist die Verlässlichkeit, nicht Perfektion.",
    checklist: [
      "Morgens: 10 Min. Kaffee in Ruhe",
      "Mittags: Kurzer Spaziergang",
      "Abends: Entspannungsübung",
      "Vor dem Schlaf: Lesen oder Musik",
    ],
    noteTitle: "Tipp:",
    noteText:
      "Tragen Sie diese Zeiten in Ihren Kalender ein wie einen wichtigen Termin.",
  },
  {
    title: "Bewegung und Körper",
    icon: "heart",
    intro:
      "Körperliche Aktivität baut Stresshormone ab und setzt Endorphine frei. Schon 20 Minuten machen einen Unterschied.",
    checklist: [
      "Spaziergang in der Natur",
      "Yoga oder Stretching",
      "Schwimmen",
      "Tanzen (auch alleine zuhause)",
      "Gartenarbeit",
      "Radfahren",
    ],
    noteTitle: "Evidenz:",
    noteText:
      "Studien zeigen, dass regelmässige Bewegung bei der Prävention und Behandlung von Depressionen ähnlich wirksam sein kann wie Antidepressiva.",
  },
  {
    title: "Soziale Kontakte pflegen",
    icon: "users",
    intro:
      "Isolation ist einer der grössten Risikofaktoren für Angehörige. Halten Sie aktiv Kontakt zu Menschen ausserhalb der Betreuungssituation.",
    checklist: [
      "Verabreden Sie sich regelmässig mit Freunden",
      "Pflegen Sie mindestens eine Freundschaft, in der Borderline kein Thema ist",
      "Treten Sie einer Gruppe bei (Sport, Hobby, Chor)",
      "Nutzen Sie Selbsthilfegruppen für Angehörige",
    ],
  },
  {
    title: "Professionelle Unterstützung",
    icon: "shield",
    intro:
      "Auch Sie dürfen sich Hilfe holen – das ist kein Zeichen von Schwäche, sondern von Stärke und Selbstfürsorge.",
    cards: [
      {
        title: "Eigene Therapie",
        text: "Eine eigene Psychotherapie kann Ihnen helfen, mit der Belastung umzugehen und eigene Muster zu erkennen.",
      },
      {
        title: "Angehörigenberatung",
        text: "Spezialisierte Beratungsstellen bieten Unterstützung speziell für Angehörige von Menschen mit psychischen Erkrankungen.",
      },
      {
        title: "Selbsthilfegruppen",
        text: "Der Austausch mit anderen Angehörigen kann enorm entlastend sein. Sie sind nicht allein.",
      },
    ],
  },
];

export const permissionList = [
  "Auch mal wütend, frustriert oder traurig sein",
  "Nicht immer die Lösung haben",
  "Ihre eigenen Bedürfnisse ernst nehmen",
  "Nein sagen, ohne sich schuldig zu fühlen",
  "Freude empfinden, auch wenn es Ihrem Angehörigen schlecht geht",
  "Professionelle Hilfe für sich selbst suchen",
  "Pausen machen und auftanken",
  "Grenzen setzen, die Ihre Gesundheit schützen",
  "Manchmal nicht wissen, was richtig ist",
];

export const roleNotes: RoleNote[] = [
  {
    title: "Als Partner/in",
    icon: "heart",
    text: "Ihre Beziehung ist nicht Ihre einzige Identität. Pflegen Sie Freundschaften und Hobbys ausserhalb der Partnerschaft. Es ist kein Verrat, Zeit für sich zu beanspruchen – es ist Überlebensstrategie.",
  },
  {
    title: "Als Elternteil",
    icon: "users",
    text: "Elterliche Schuldgefühle sind normal, aber oft unbegründet. Borderline hat komplexe Ursachen – Sie haben nicht «versagt». Erlauben Sie sich, auch stolz auf das zu sein, was Sie richtig gemacht haben. Und: Sie dürfen auch mal wütend sein.",
  },
  {
    title: "Als erwachsenes Kind",
    icon: "user-circle",
    text: "Sie mussten früh erwachsen werden und Verantwortung übernehmen, die nicht Ihre war. Selbstfürsorge kann sich fremd anfühlen – üben Sie sie trotzdem. Sie haben ein Recht auf ein eigenes Leben, ohne ständig verfügbar zu sein.",
  },
];
