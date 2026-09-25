import { Link } from "wouter";

const fragen = [
  {
    title: "Was wird mir zu viel?",
    frage: "Welche Situation möchte ich nicht weiter in dieser Form mittragen?",
    impuls:
      "Vielleicht geht es um häufige Anrufe, Geld, Besuche oder eine Aufgabe. Eine Grenze darf auch erst im Nachhinein deutlich werden.",
    beispiel: "«Abends brauche ich Zeit ohne Telefonate.»",
  },
  {
    title: "Wie kann ich es sagen?",
    frage: "Was kann ich anbieten – und was kann ich nicht übernehmen?",
    impuls:
      "Ein kurzer Satz über Ihr eigenes Handeln kann reichen. Sie müssen nicht vollkommen ruhig sein oder die passende Formulierung finden, damit Ihre Grenze berechtigt ist.",
    beispiel: "«Morgen kann ich dich begleiten. Heute kann ich nicht kommen.»",
  },
  {
    title: "Was macht die Grenze schwer?",
    frage: "Was bräuchte ich, damit meine Grenze im Alltag möglich wird?",
    impuls:
      "Wenn eine Grenze nicht umsetzbar war, ist das ein Anlass zum Anpassen oder zum Hilfeholen. Vielleicht braucht es eine andere Aufgabenverteilung, eine kleinere Zusage oder Unterstützung von aussen.",
    beispiel: "«Den Fahrdienst kann ich nicht weiter allein übernehmen.»",
  },
  {
    title: "Was liegt wirklich bei mir?",
    frage:
      "Bedauere ich ein eigenes Verhalten – oder fühle ich mich für alles verantwortlich?",
    impuls:
      "Ein Schuldgefühl allein entscheidet das nicht. Sie können einen eigenen Fehler anerkennen, ohne die Verantwortung für die Erkrankung oder alle Entscheidungen eines anderen Menschen zu übernehmen.",
    beispiel:
      "«Dass ich dich angeschrien habe, tut mir leid. Meine Pause brauche ich trotzdem.»",
  },
  {
    title: "Habe ich Angst vor der Reaktion?",
    frage: "Brauche ich Schutz oder Unterstützung, bevor ich etwas anspreche?",
    impuls:
      "Wenn Sie Bedrohung oder Gewalt befürchten, müssen Sie eine Grenze nicht allein im direkten Gespräch durchsetzen. Holen Sie sich Unterstützung. Auch eine gut formulierte Grenze garantiert keine sichere Reaktion.",
    beispiel:
      "«Ich möchte mit einer Beratungsstelle überlegen, wie ich mich schützen kann.»",
  },
];

export default function GrenzenCheck() {
  return (
    <div className="mt-6 space-y-5">
      <p className="text-base leading-relaxed text-muted-foreground">
        Wählen Sie eine Frage, die gerade zu Ihnen passt. Sie müssen nichts
        vollständig beantworten. Die Fragen sind Gesprächsanregungen und
        bewerten weder Ihre Fähigkeiten noch die Sicherheit Ihrer Situation.
      </p>
      <div className="divide-y divide-border border-y border-border">
        {fragen.map(punkt => (
          <details key={punkt.title} className="py-1">
            <summary className="cursor-pointer py-4 text-base font-medium text-[color:var(--accent-primary)]">
              {punkt.title}
            </summary>
            <div className="space-y-3 pb-5 text-base leading-relaxed">
              <p className="font-medium">{punkt.frage}</p>
              <p className="text-muted-foreground">{punkt.impuls}</p>
              <p className="border-l-2 border-primary pl-4">{punkt.beispiel}</p>
            </div>
          </details>
        ))}
      </div>
      <p className="text-base leading-relaxed">
        Eigene Beratung ist unabhängig von Ihren Antworten möglich.{" "}
        <Link className="editorial-link" href="/fachstelle">
          Kostenlos und ohne Vollmacht beraten lassen
        </Link>
        . Bei akuter Gefahr oder Unsicherheit:{" "}
        <Link className="editorial-link" href="/soforthilfe">
          Soforthilfe
        </Link>
        .
      </p>
    </div>
  );
}
