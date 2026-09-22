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
      "Wählen Sie eine Pause, die gerade möglich und angenehm ist. Auch wenige Minuten können gut tun. Wenn dafür kein Raum bleibt, braucht es Entlastung oder eine andere Aufgabenverteilung – keine zusätzliche Disziplin.",
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
      "Bewegung kann Wohlbefinden und Erholung unterstützen. Wählen Sie etwas, das zu Ihrer Kraft, Gesundheit und Ihrem Alltag passt; eine feste Mindestdauer ist hier kein Ziel.",
    checklist: [
      "Spaziergang in der Natur",
      "Yoga oder Stretching",
      "Schwimmen",
      "Tanzen (auch alleine zuhause)",
      "Gartenarbeit",
      "Radfahren",
    ],
    noteTitle: "Bei anhaltender Belastung:",
    noteText:
      "Bewegung ist eine mögliche Ergänzung. Bei anhaltender Erschöpfung, Schlafproblemen oder depressiver Stimmung kann eine ärztliche oder psychotherapeutische Abklärung sinnvoll sein.",
  },
  {
    title: "Soziale Kontakte pflegen",
    icon: "users",
    intro:
      "Isolation ist einer der grössten Risikofaktoren für Angehörige. Halten Sie aktiv Kontakt zu Menschen ausserhalb der Betreuungssituation.",
    checklist: [
      "Verabreden Sie sich regelmässig mit Freunden",
      "Vielleicht tut ein Kontakt gut, bei dem auch andere Themen Platz haben",
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
  "Nein sagen, auch wenn dabei Schuldgefühle auftauchen",
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
    text: "Falls Sie früh Verantwortung übernehmen mussten, kann es ungewohnt sein, eigene Bedürfnisse ernst zu nehmen. Sie dürfen sich dabei unterstützen lassen. Sie haben ein Recht auf ein eigenes Leben, ohne ständig verfügbar zu sein.",
  },
];
