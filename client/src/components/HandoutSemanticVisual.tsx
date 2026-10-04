import type {
  AcceptanceVisualization,
  ConversationVisualization,
  DialogVisualization,
  HandoutVisualization,
} from "@/content/handoutVisualizations";
import "@/styles/handout-visualizations.css";

type Props = {
  visualization: HandoutVisualization;
};

function FigureHeader({ visualization }: Props) {
  return (
    <header className="handout-visual__header">
      <p className="handout-visual__eyebrow">{visualization.eyebrow}</p>
      <h2 id={`${visualization.id}-visual-title`}>{visualization.title}</h2>
      <p className="handout-visual__lead">{visualization.lead}</p>
    </header>
  );
}

function KeyStatement({ children }: { children: string }) {
  return (
    <blockquote className="handout-visual__statement">
      <p>{children}</p>
    </blockquote>
  );
}

function SafetyNote({ visualization }: Props) {
  return (
    <aside
      className="handout-visual__safety"
      role="note"
      aria-label="Sicherheitshinweis"
    >
      <h3>{visualization.safetyTitle}</h3>
      <p>{visualization.safetyText}</p>
    </aside>
  );
}

function NextStep({ children, id }: { children: string; id: string }) {
  return (
    <section className="handout-visual__next" aria-labelledby={id}>
      <h3 id={id}>Ein nächster Schritt</h3>
      <p>{children}</p>
    </section>
  );
}

function AdditionalActions({ visualization }: Props) {
  if (!visualization.additionalActions.length) {
    return null;
  }

  const titleId = `${visualization.id}-additional-actions`;
  return (
    <section
      className="handout-visual__additional-actions"
      aria-labelledby={titleId}
    >
      <h3 id={titleId}>Weitere Handlungsmöglichkeiten</h3>
      <ul>
        {visualization.additionalActions.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function formatSourceReference(sourceLine: string) {
  return sourceLine
    .replace(
      /^(?:Quelle|Quellen|Fachlicher Bezugspunkt|Fachliche Bezugspunkte):\s*/,
      ""
    )
    .replace(/\.$/, "");
}

function AcceptanceVisual({
  visualization,
}: {
  visualization: AcceptanceVisualization;
}) {
  return (
    <>
      <KeyStatement>{visualization.keyStatement}</KeyStatement>
      <div className="handout-visual__contrast">
        <section aria-labelledby="not-acceptance-title">
          <h3 id="not-acceptance-title">Akzeptanz ist nicht</h3>
          <ul role="list">
            {visualization.notAcceptance.map(item => (
              <li key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="acceptance-title">
          <h3 id="acceptance-title">Akzeptanz kann heissen</h3>
          <ul role="list">
            {visualization.acceptance.map(item => (
              <li key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section
        className="handout-visual__path-block"
        aria-labelledby="acceptance-path-title"
      >
        <h3 id="acceptance-path-title">
          Vereinfachte Übung: vier mögliche Schritte
        </h3>
        <ol
          className="handout-visual__path handout-visual__path--four"
          role="list"
        >
          {visualization.steps.map(step => (
            <li key={step.label}>
              <span aria-hidden="true">{step.label}</span>
              <div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <aside
        className="handout-visual__example"
        aria-labelledby="acceptance-example-title"
      >
        <h3 id="acceptance-example-title">{visualization.example.title}</h3>
        <p>{visualization.example.text}</p>
      </aside>
      <SafetyNote visualization={visualization} />
      <NextStep id={`${visualization.id}-next-step`}>
        {visualization.nextStep}
      </NextStep>
      <AdditionalActions visualization={visualization} />
    </>
  );
}

function ConversationVisual({
  visualization,
}: {
  visualization: ConversationVisualization;
}) {
  return (
    <>
      <KeyStatement>{visualization.keyStatement}</KeyStatement>
      <section
        className="handout-visual__path-block"
        aria-labelledby="conversation-path-title"
      >
        <h3 id="conversation-path-title">Drei mögliche Schritte</h3>
        <ol
          className="handout-visual__path handout-visual__path--three"
          role="list"
        >
          {visualization.steps.map(step => (
            <li key={step.label}>
              <span aria-hidden="true">{step.label}</span>
              <div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section
        className="handout-visual__pause"
        aria-labelledby="pause-plan-title"
      >
        <h3 id="pause-plan-title">Eine Pause schafft Wahlraum</h3>
        <ul role="list">
          {visualization.pausePlan.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <SafetyNote visualization={visualization} />
      <NextStep id={`${visualization.id}-next-step`}>
        {visualization.nextStep}
      </NextStep>
      <AdditionalActions visualization={visualization} />
    </>
  );
}

function DialogVisual({
  visualization,
}: {
  visualization: DialogVisualization;
}) {
  return (
    <>
      <section
        className="handout-visual__opening"
        aria-labelledby="dialog-start-title"
      >
        <h3 id="dialog-start-title">Ausgangspunkt</h3>
        <blockquote>
          <p>{visualization.opening}</p>
        </blockquote>
      </section>
      <section
        className="handout-visual__dialog"
        aria-labelledby="dialog-flow-title"
      >
        <h3 id="dialog-flow-title">Ein möglicher Ablauf</h3>
        <ol role="list">
          {visualization.steps.map(step => (
            <li key={step.label}>
              <span aria-hidden="true">{step.label}</span>
              <div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <p className="handout-visual__adaptation">
        {visualization.adaptationNote}
      </p>
      <KeyStatement>{visualization.keyStatement}</KeyStatement>
      <SafetyNote visualization={visualization} />
      <NextStep id={`${visualization.id}-next-step`}>
        {visualization.nextStep}
      </NextStep>
      <AdditionalActions visualization={visualization} />
    </>
  );
}

export default function HandoutSemanticVisual({ visualization }: Props) {
  return (
    <figure
      className="handout-visual"
      aria-labelledby={`${visualization.id}-visual-title`}
    >
      <FigureHeader visualization={visualization} />
      <div className="handout-visual__body">
        {visualization.kind === "acceptance-path" ? (
          <AcceptanceVisual visualization={visualization} />
        ) : visualization.kind === "conversation-path" ? (
          <ConversationVisual visualization={visualization} />
        ) : (
          <DialogVisual visualization={visualization} />
        )}
      </div>
      <figcaption className="handout-visual__caption">
        <p>
          Eigene didaktische Darstellung der Fachstelle Angehörigenarbeit in
          Anlehnung an {formatSourceReference(visualization.sourceLine)}.
        </p>
        <p className="handout-visual__disclaimer">
          <strong>Hinweis:</strong> {visualization.disclaimer}
        </p>
        <details>
          <summary>Textbeschreibung der Darstellung</summary>
          <p>{visualization.longDescription}</p>
        </details>
      </figcaption>
    </figure>
  );
}
