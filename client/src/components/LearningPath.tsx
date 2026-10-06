import AppLink from "@/components/AppLink";
import { DisplayHeading, EditorialSection } from "@/components/editorial";
import { getHandoutTextVersionMeta } from "@/content/handoutTextMetas";
import { getHandoutApprovalStatus } from "@/content/handoutGovernance";
import {
  canonicalTopics,
  getLearningStep,
  getLearningTransition,
  learningModels,
  learningExtensions,
  learningSteps,
  modelClassificationLabels,
} from "@/content/learningArchitecture";

export function LearningGoal({ path }: { path: string }) {
  const step =
    getLearningStep(path) ??
    learningExtensions.find(item => item.href === path);
  if (!step) return null;
  const model = learningModels.find(
    item => item.id === ("baseModelId" in step ? step.baseModelId : undefined)
  );
  return (
    <section
      aria-label="Ziel dieser Seite"
      data-learning-goal
      className="mt-6 max-w-[45em] border-l-2 border-sage pl-4 text-base"
    >
      <p>
        <strong>Worum es hier geht:</strong> {step.purpose}
      </p>
      <p className="mt-2">
        <strong>Das können Sie mitnehmen:</strong> {step.goal}
      </p>
      {model && (
        <p className="mt-2 text-sm">
          <strong>Orientierung auf dieser Seite:</strong> {model.title} ·{" "}
          {modelClassificationLabels[model.classification]}.{" "}
          <AppLink
            href={`/materialien#modell-${model.id}`}
            className="editorial-link"
          >
            Einordnung und Grenzen des Modells
          </AppLink>
        </p>
      )}
    </section>
  );
}

export function LearningExtensionNav({ path }: { path: string }) {
  const extension = learningExtensions.find(item => item.href === path);
  if (!extension) return null;
  const transition = getLearningTransition(extension.parentHref)!;
  const topics = canonicalTopics.filter(topic =>
    (extension.topicIds as readonly string[]).includes(topic.id)
  );
  return (
    <EditorialSection variant="cream-deep" density="compact">
      <EditorialSection.Body>
        <nav aria-label="Von der Vertiefung zum Lernweg" className="text-base">
          <p>
            Diese Seite vertieft «{transition.current.title}». Sie ist kein
            zusätzlicher Pflichtschritt.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            <AppLink
              href={transition.current.href}
              className="editorial-link inline-flex min-h-11 items-center"
            >
              Zurück zum Lernschritt: {transition.current.title}
            </AppLink>
            {transition.next && (
              <AppLink
                href={transition.next.href}
                className="editorial-link inline-flex min-h-11 items-center"
              >
                Weiter im Lernweg: {transition.next.title}
              </AppLink>
            )}
          </div>
          <p className="mt-3">
            Grundlagen zum Nachlesen:{" "}
            {topics.map((topic, index) => (
              <span key={topic.id}>
                {index > 0 && " · "}
                <AppLink href={topic.href} className="editorial-link">
                  {topic.title}
                </AppLink>
              </span>
            ))}
          </p>
          <p className="mt-4 text-sm">
            Bei akuter Gefahr oder Unsicherheit:{" "}
            <AppLink href="/soforthilfe" className="editorial-link">
              Akute Hilfe und Notfallkontakte
            </AppLink>
            .
          </p>
        </nav>
      </EditorialSection.Body>
    </EditorialSection>
  );
}

export default function LearningPath() {
  return (
    <EditorialSection variant="cream" density="compact">
      <EditorialSection.Body>
        <DisplayHeading level={2}>Ein möglicher Lernweg</DisplayHeading>
        <p className="mt-3 max-w-[45em]">
          Beginnen Sie dort, wo Ihr Anliegen liegt. Die Reihenfolge ist ein
          Angebot; Beratung, eigene Entlastung und akute Hilfe sind jederzeit
          erreichbar.
        </p>
        <nav
          aria-label="Lernweg im Überblick"
          data-learning-path-overview
          className="mt-5"
        >
          <ol className="grid gap-4 sm:grid-cols-2">
            {learningSteps.map((step, index) => (
              <li key={step.id} className="border-l-2 border-sage pl-4">
                <AppLink href={step.href} className="editorial-link">
                  <span className="font-medium">
                    {index + 1}. {step.title}
                  </span>
                </AppLink>
                <p className="mt-1 text-base">{step.purpose}</p>
              </li>
            ))}
          </ol>
        </nav>
      </EditorialSection.Body>
    </EditorialSection>
  );
}

export function LearningPathNav({ path }: { path: string }) {
  const transition = getLearningTransition(path);
  if (!transition) return null;
  const { index, current, previous, next } = transition;
  const topics = canonicalTopics.filter(topic =>
    current.canonicalTopics.includes(topic.id)
  );
  return (
    <EditorialSection variant="cream-deep" density="compact">
      <EditorialSection.Body>
        <nav aria-label="Im Lernweg weitergehen" data-learning-path-nav>
          <p className="text-sm">
            Schritt {index + 1} von {learningSteps.length} · {current.title}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {previous && (
              <AppLink
                href={previous.href}
                className="editorial-link inline-flex min-h-11 items-center"
                data-learning-back
              >
                Zurück: {previous.title}
              </AppLink>
            )}
            {next && (
              <AppLink
                href={next.href}
                className="editorial-link inline-flex min-h-11 items-center"
                data-learning-next
              >
                Weiter: {next.title}
              </AppLink>
            )}
          </div>
          {topics.length > 0 && (
            <p className="mt-4 text-base">
              Grundlagen dieser Seite:{" "}
              {topics.map((topic, topicIndex) => (
                <span key={topic.id}>
                  {topicIndex > 0 && " · "}
                  <AppLink href={topic.href} className="editorial-link">
                    {topic.title}
                  </AppLink>
                </span>
              ))}
            </p>
          )}
          {current.furtherLinks.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-base">
              {current.furtherLinks.map(link => (
                <li key={link.href}>
                  <AppLink href={link.href} className="editorial-link">
                    {link.title}
                  </AppLink>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-sm">
            Bei akuter Gefahr oder Unsicherheit:{" "}
            <AppLink href="/soforthilfe" className="editorial-link">
              Akute Hilfe und Notfallkontakte
            </AppLink>
            .
          </p>
        </nav>
      </EditorialSection.Body>
    </EditorialSection>
  );
}

export function LearningMaterials() {
  return (
    <EditorialSection variant="cream" density="compact">
      <EditorialSection.Body>
        <DisplayHeading level={2} id="lernweg-materialien">
          Materialien entlang des Lernwegs
        </DisplayHeading>
        <p className="mt-3 max-w-[45em]">
          Pro Anliegen finden Sie eine kleine Auswahl lesbarer Webtexte. Sie
          müssen keine Materialsammlung durcharbeiten. Textfassungen und ältere
          Grafiken können unterschiedliche Bearbeitungsstände haben; diese
          Auswahl bestätigt keine fachliche oder grafische Freigabe.
        </p>
        <ol className="mt-6 grid gap-6 md:grid-cols-2" data-learning-materials>
          {learningSteps.map((step, index) => (
            <li key={step.id}>
              <h3 className="font-medium">
                <AppLink href={step.href} className="editorial-link">
                  {index + 1}. {step.title}
                </AppLink>
              </h3>
              <p className="mt-2 text-base">{step.purpose}</p>
              {step.materials.length > 0 ? (
                <ul className="mt-3 space-y-3">
                  {step.materials.map(material => {
                    const meta = getHandoutTextVersionMeta(material.id);
                    if (!meta) return null;
                    return (
                      <li key={material.id}>
                        <AppLink href={meta.path} className="editorial-link">
                          {meta.title} – Webtext lesen
                        </AppLink>
                        {getHandoutApprovalStatus(material.id) ===
                          "draft-editorial-review-pending" && (
                          <p className="mt-1 text-sm font-medium">
                            Redaktioneller Entwurf · Prüfung ausstehend
                          </p>
                        )}
                        <p className="mt-1 text-sm">{material.purpose}</p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-3 text-sm">
                  Die Startseite und ihre direkten Einstiege genügen hier; ein
                  Handout ist nicht nötig.
                </p>
              )}
            </li>
          ))}
        </ol>
      </EditorialSection.Body>
    </EditorialSection>
  );
}

export function ModelCatalogue() {
  return (
    <EditorialSection variant="cream-deep" density="compact">
      <EditorialSection.Body>
        <DisplayHeading level={2} id="modellkatalog">
          Modelle und ihre Reichweite
        </DisplayHeading>
        <p className="mt-3 max-w-[45em]">
          Ein Bild ist eine mögliche Orientierung, keine vollständige Erklärung
          einer Person. «Basis» bezeichnet die Auswahl für diesen Lernschritt;
          «Vertiefung» bietet eine freiwillige Alternative. Sie müssen mehrere
          Bilder weder kombinieren noch auf eine Person anwenden.
        </p>
        <p className="mt-3 max-w-[45em]">
          Wissenschaftlicher Theoriebezug benennt einen fachlichen
          Ausgangspunkt. Klinische Heuristiken sind vereinfachte
          Gesprächshilfen. Eigene didaktische Darstellungen ordnen oder
          veranschaulichen; ihre Kategorien sind keine validierten
          Messinstrumente. Quellen belegen nicht automatisch die Grafik oder
          ihre Wirkung. Die fachliche Prüfung dieses Katalogs ist offen.
        </p>
        <ul className="mt-6 space-y-6" data-learning-models>
          {learningModels.map(model => (
            <li
              key={model.id}
              id={`modell-${model.id}`}
              className="scroll-mt-28 border-t pt-4"
            >
              <h3 className="font-medium">{model.title}</h3>
              <p className="mt-1 text-sm">
                {modelClassificationLabels[model.classification]} ·{" "}
                {model.role === "basis"
                  ? "Basis im Lernschritt"
                  : model.role === "vertiefung"
                    ? "Freiwillige Vertiefung oder Alternative"
                    : "Fachlicher Bezugspunkt"}
              </p>
              <p className="mt-2 text-base">{model.purpose}</p>
              <p className="mt-2 text-base">
                <strong>Grenze:</strong> {model.limitation}
              </p>
              <p className="mt-2 text-sm">{model.sourceRole}</p>
              <p className="mt-2 text-sm">
                Fachliche Prüfung des aktuellen Katalogeintrags: offen.
              </p>
              <p className="mt-3">
                <AppLink
                  href={model.explanationHref}
                  className="editorial-link"
                >
                  Erklärung lesen: {model.title}
                </AppLink>
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {model.sources.map(source => (
                  <li key={source.href}>
                    <AppLink href={source.href} className="editorial-link">
                      {source.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </EditorialSection.Body>
    </EditorialSection>
  );
}
