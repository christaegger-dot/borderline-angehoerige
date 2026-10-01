import { Link } from "wouter";

const bereiche = [
  {
    title: "Was kostet mich Kraft?",
    items: [
      ["Ständige Bereitschaft", "Auch nachts auf den nächsten Anruf warten."],
      [
        "Zu viele Aufgaben",
        "Fahrten, Haushalt oder Betreuung allein organisieren.",
      ],
      ["Sorgen und Konflikte", "Gedanklich kaum Abstand finden."],
      ["Praktischer Druck", "Belastungen bei Arbeit, Wohnen oder Geld."],
    ],
  },
  {
    title: "Was könnte mich entlasten?",
    items: [
      [
        "Eine Aufgabe abgeben",
        "Mit jemandem konkret vereinbaren, wer was übernimmt.",
      ],
      [
        "Verfügbarkeit begrenzen",
        "Eine Zeit vereinbaren, in der Sie nicht erreichbar sind.",
      ],
      [
        "Eigene Unterstützung",
        "Vertraulich über Ihre Situation sprechen oder Beratung nutzen.",
      ],
      [
        "Raum für Ihr Leben",
        "Zeit für Freunde, Interessen oder Erholung ermöglichen.",
      ],
    ],
  },
];

export default function EnergieHaushaltVisualisierung() {
  return (
    <section
      className="my-6 border-y border-border py-5"
      aria-label="Belastung und Entlastung im Alltag"
    >
      <h3 className="text-xl font-medium">
        Was braucht im Alltag Veränderung?
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Diese Beispiele können beim Sortieren helfen. Was wie schwer wiegt, ist
        persönlich. Eine Pause gleicht dauerhafte Überlastung nicht automatisch
        aus; manchmal müssen sich Aufgaben oder Bedingungen ändern.
      </p>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {bereiche.map(bereich => (
          <div key={bereich.title} className="border-t-2 border-primary pt-4">
            <h4 className="text-lg font-medium">{bereich.title}</h4>
            <ul className="mt-3 space-y-4">
              {bereich.items.map(([title, text]) => (
                <li key={title} className="text-base leading-relaxed">
                  <p className="font-medium">{title}</p>
                  <p className="text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-border pt-4 text-base">
        Womit möchten Sie beginnen?{" "}
        <Link
          className="editorial-link"
          href="/selbstfuersorge#eigene-unterstuetzung"
        >
          Einen eigenen Entlastungsschritt überlegen
        </Link>
      </p>
    </section>
  );
}
