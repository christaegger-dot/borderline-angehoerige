import type {
  HandoutTextSection,
  HandoutTextVersion,
  HandoutVisualizationConfig,
} from "./handoutTextVersionTypes";

export const HANDOUT_VISUALIZATION_IDS = [
  "radikale-akzeptanz",
  "gespraeche-kippen",
  "beispiel-dialog",
] as const;

export type HandoutVisualizationId = (typeof HANDOUT_VISUALIZATION_IDS)[number];

export type VisualizationStep = {
  label: string;
  title: string;
  text: string;
};

type HandoutVisualizationBase = {
  id: HandoutVisualizationId;
  title: string;
  eyebrow: "PRAXISBLATT";
  lead: string;
  longDescription: string;
  keyStatement: string;
  nextStep: string;
  safetyTitle: string;
  safetyText: string;
  sourceLine: string;
  standLine: string;
  disclaimer: string;
};

export type AcceptanceVisualization = HandoutVisualizationBase & {
  kind: "acceptance-path";
  notAcceptance: string[];
  acceptance: string[];
  steps: VisualizationStep[];
};

export type ConversationVisualization = HandoutVisualizationBase & {
  kind: "conversation-path";
  steps: VisualizationStep[];
  pausePlan: string[];
};

export type DialogVisualization = HandoutVisualizationBase & {
  kind: "dialog-sequence";
  opening: string;
  steps: VisualizationStep[];
  adaptationNote: string;
};

export type HandoutVisualization =
  | AcceptanceVisualization
  | ConversationVisualization
  | DialogVisualization;

function requireSection(handout: HandoutTextVersion, title: string) {
  const section = handout.sections.find(item => item.title === title);
  if (!section) {
    throw new Error(
      `Missing visualization section for ${handout.id}: ${title}`
    );
  }
  return section;
}

function requireCallout(section: HandoutTextSection, handoutId: string) {
  if (!section.calloutText) {
    throw new Error(
      `Missing visualization callout for ${handoutId}: ${section.title}`
    );
  }
  return section.calloutText;
}

function requireCards(section: HandoutTextSection, handoutId: string) {
  if (!section.cards?.length) {
    throw new Error(
      `Missing visualization cards for ${handoutId}: ${section.title}`
    );
  }
  return section.cards;
}

function requireBullets(section: HandoutTextSection, handoutId: string) {
  if (!section.bullets?.length) {
    throw new Error(
      `Missing visualization bullets for ${handoutId}: ${section.title}`
    );
  }
  return section.bullets;
}

function requireSafetyBullet(
  bullets: string[],
  config: HandoutVisualizationConfig,
  handoutId: string
) {
  const safetyText = bullets.find(item =>
    item.startsWith(config.safetyBulletStartsWith)
  );
  if (!safetyText) {
    throw new Error(`Missing visualization safety text for ${handoutId}`);
  }
  return safetyText;
}

function toSteps(
  cards: ReturnType<typeof requireCards>,
  labelOffset = 0
): VisualizationStep[] {
  return cards.map((card, index) => ({
    label: String(index + 1 + labelOffset),
    title: card.title.replace(/^(?:Schritt\s+)?\d+[.:]\s*/, ""),
    text: card.text,
  }));
}

function baseVisualization(
  handout: HandoutTextVersion,
  config: HandoutVisualizationConfig
): HandoutVisualizationBase {
  const keySection = requireSection(handout, config.sections.keyStatement);
  const actions = requireBullets(
    requireSection(handout, config.sections.actions),
    handout.id
  );
  const nextStep = actions[config.nextStepBulletIndex ?? 0];
  if (!nextStep) {
    throw new Error(`Missing visualization next step for ${handout.id}`);
  }

  return {
    id: handout.id as HandoutVisualizationId,
    title: config.title ?? handout.title,
    eyebrow: "PRAXISBLATT",
    lead: config.lead ?? handout.summary,
    longDescription: config.longDescription,
    keyStatement: requireCallout(keySection, handout.id),
    nextStep,
    safetyTitle: config.safetyTitle,
    safetyText: requireSafetyBullet(actions, config, handout.id),
    sourceLine: handout.sourceLine,
    standLine: handout.standLine,
    disclaimer:
      handout.intro.find(text => text.startsWith("Dieses Blatt ersetzt")) ??
      "Dieses Blatt ersetzt keine persönliche Beratung oder Behandlung.",
  };
}

export function hasHandoutVisualization(id: string | undefined) {
  return Boolean(
    id && HANDOUT_VISUALIZATION_IDS.includes(id as HandoutVisualizationId)
  );
}

export function resolveHandoutVisualization(
  handout: HandoutTextVersion | null | undefined
): HandoutVisualization | null {
  if (!handout?.visualization || !hasHandoutVisualization(handout.id)) {
    return null;
  }

  const config = handout.visualization;
  const base = baseVisualization(handout, config);

  if (config.kind === "acceptance-path") {
    const notSection = requireSection(handout, config.sections.notAcceptance);
    const notCards = requireCards(notSection, handout.id);
    const safetyCard = notCards.find(
      card => card.title === config.sections.safetyCardTitle
    );
    if (!safetyCard) {
      throw new Error(`Missing visualization safety card for ${handout.id}`);
    }
    const acceptanceSection = requireSection(
      handout,
      config.sections.acceptance
    );
    const stepSection = requireSection(handout, config.sections.steps);

    return {
      ...base,
      kind: config.kind,
      safetyText: `${base.safetyText} ${safetyCard.text}`,
      notAcceptance: notCards.map(card => card.title),
      acceptance: requireCards(acceptanceSection, handout.id).map(
        card => card.title
      ),
      steps: toSteps(requireCards(stepSection, handout.id)),
    };
  }

  if (config.kind === "conversation-path") {
    return {
      ...base,
      kind: config.kind,
      steps: toSteps(
        requireCards(requireSection(handout, config.sections.steps), handout.id)
      ),
      pausePlan: requireBullets(
        requireSection(handout, config.sections.pausePlan),
        handout.id
      ),
    };
  }

  const dialogCards = requireCards(
    requireSection(handout, config.sections.dialog),
    handout.id
  );
  const opening = dialogCards[0]?.text;
  if (!opening) {
    throw new Error(`Missing visualization dialog opening for ${handout.id}`);
  }

  return {
    ...base,
    kind: config.kind,
    opening,
    steps: toSteps(dialogCards.slice(1)),
    adaptationNote: requireCallout(
      requireSection(handout, config.sections.adaptation),
      handout.id
    ),
  };
}
