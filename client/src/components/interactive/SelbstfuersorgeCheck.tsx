import {
  ArrowRight,
  CalendarDays,
  HandHelping,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Link } from "wouter";

const wege = [
  {
    title: "Abgeben",
    icon: HandHelping,
    text: "Eine konkrete Aufgabe mit jemandem teilen.",
    beispiel: "«Kannst du am Donnerstag den Fahrdienst übernehmen?»",
  },
  {
    title: "Begrenzen",
    icon: CalendarDays,
    text: "Eine freie Zeit oder eine kleinere Zusage ermöglichen.",
    beispiel:
      "«Am Samstag brauche ich Zeit für mich. Ich übernehme dann keine Besuche.»",
  },
  {
    title: "Beraten lassen",
    icon: MessageCircle,
    text: "Auch praktische Fragen zu Arbeit, Wohnen oder Geld ansprechen.",
    beispiel:
      "«Ich brauche einen Termin, bei dem meine eigene Situation im Mittelpunkt steht.»",
  },
  {
    title: "Eigenes Leben bewahren",
    icon: Heart,
    text: "Freundschaften, Interessen und Freude haben ihren eigenen Wert.",
    beispiel:
      "«Ich möchte wieder regelmässig mit meiner Freundin spazieren gehen.»",
  },
];

const fragen = [
  "Was belastet mich im Moment am stärksten?",
  "Was möchte ich abgeben, begrenzen oder anders organisieren?",
  "Wen spreche ich konkret an – und bis wann?",
  "Woran werde ich merken, dass die Entlastung tatsächlich stattfindet?",
];

export default function SelbstfuersorgeCheck() {
  return (
    <section id="eigene-unterstuetzung" className="scroll-mt-28 py-5">
      <h2 className="text-2xl font-medium leading-tight">
        Auch ich brauche Unterstützung
      </h2>
      <p className="mt-4 text-base leading-relaxed">
        Ihre Gesundheit, Ihre Beziehungen und Ihr eigenes Leben zählen. Sie
        müssen nicht erst völlig erschöpft sein, um Unterstützung zu suchen.
        Fragen Sie sich: Was müsste sich konkret verändern?
      </p>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Die folgenden Möglichkeiten sind eine Auswahl. Ein einzelner Schritt
        darf reichen; Sie müssen kein zusätzliches Programm erfüllen.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {wege.map(weg => (
          <article
            key={weg.title}
            className="border border-border bg-background p-5"
          >
            <weg.icon
              aria-hidden="true"
              className="mb-3 h-7 w-7 text-primary"
            />
            <h3 className="text-lg font-medium">{weg.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              {weg.text}
            </p>
            <p className="mt-4 border-l-2 border-primary pl-3 text-base leading-relaxed">
              {weg.beispiel}
            </p>
          </article>
        ))}
      </div>
      <details className="mt-5 border-y border-border py-1">
        <summary className="cursor-pointer py-4 text-base font-medium text-[color:var(--accent-primary)]">
          Wenn Schuldgefühle dazukommen
        </summary>
        <div className="space-y-3 pb-5 text-base leading-relaxed">
          <p>
            Sie können sich verbunden fühlen und zugleich wütend, traurig oder
            erschöpft sein. In einer Beratung müssen Sie sich nicht als
            besonders geduldig darstellen.
          </p>
          <p>
            Ein Schuldgefühl allein entscheidet nicht, ob Sie etwas falsch
            gemacht haben. Gibt es ein eigenes Verhalten, das Sie bedauern und
            verändern möchten? Oder fühlen Sie sich für etwas verantwortlich,
            das Sie nicht vollständig beeinflussen können? Beides kann
            nebeneinander bestehen.
          </p>
          <p>
            Sie können einen eigenen Fehler anerkennen, ohne die gesamte
            Verantwortung für die Erkrankung oder die Entscheidungen eines
            anderen Menschen zu übernehmen.
          </p>
        </div>
      </details>
      <details className="border-b border-border py-1">
        <summary className="cursor-pointer py-4 text-base font-medium text-[color:var(--accent-primary)]">
          Meinen nächsten Entlastungsschritt überlegen
        </summary>
        <p className="pb-4 text-base leading-relaxed text-muted-foreground">
          Sie können eine Frage für sich aufschreiben oder in ein Gespräch
          mitnehmen.
        </p>
        <ul className="list-disc space-y-3 pb-5 pl-5 text-base leading-relaxed">
          {fragen.map(frage => (
            <li key={frage}>{frage}</li>
          ))}
        </ul>
      </details>
      <p className="mt-5 text-base leading-relaxed">
        Eigene Beratung darf unabhängig davon beginnen, ob die andere Person
        Hilfe möchte. Die PUK-Angehörigenberatung ist kostenlos, ohne Vollmacht
        und nach Voranmeldung möglich.
      </p>
      <Link
        href="/fachstelle"
        className="editorial-link mt-3 inline-flex items-center gap-2 text-base"
      >
        Beratung für mich finden{" "}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </section>
  );
}
