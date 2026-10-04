import type { MaterialCategory, MaterialItem } from "./materialien";
import type {
  HandoutApprovalStatus,
  HandoutDocumentType,
} from "./handoutGovernance";

export interface HandoutTextCard {
  title: string;
  text: string;
  example?: string;
}

export interface HandoutTextSection {
  title: string;
  intro?: string;
  cards?: HandoutTextCard[];
  bullets?: string[];
  calloutTitle?: string;
  calloutText?: string;
}

type HandoutVisualizationBaseConfig = {
  title?: string;
  lead?: string;
  longDescription: string;
  safetyTitle: string;
  safetyBulletStartsWith: string;
  nextStepBulletIndex?: number;
};

export type HandoutVisualizationConfig =
  | (HandoutVisualizationBaseConfig & {
      kind: "acceptance-path";
      sections: {
        keyStatement: string;
        notAcceptance: string;
        safetyCardTitle: string;
        acceptance: string;
        steps: string;
        example: string;
        actions: string;
      };
    })
  | (HandoutVisualizationBaseConfig & {
      kind: "conversation-path";
      sections: {
        keyStatement: string;
        steps: string;
        pausePlan: string;
        actions: string;
      };
    })
  | (HandoutVisualizationBaseConfig & {
      kind: "dialog-sequence";
      sections: {
        keyStatement: string;
        dialog: string;
        adaptation: string;
        actions: string;
      };
    });

export interface HandoutTextVersionMeta {
  id: string;
  path: string;
  title: string;
  description: string;
  documentType: HandoutDocumentType;
  assetVersion: string;
  approvalStatus: HandoutApprovalStatus;
  topicLabel: string;
  topicHref: string;
  category: Exclude<MaterialCategory, "alle">;
  kind: MaterialItem["kind"];
  previewImageUrl: string;
  pdfSourceUrl: string;
}

export interface HandoutTextVersionContent {
  kicker: string;
  summary: string;
  intro: string[];
  sections: HandoutTextSection[];
  sourceLine: string;
  standLine: string;
  visualization?: HandoutVisualizationConfig;
}

export interface HandoutTextVersion
  extends HandoutTextVersionMeta, HandoutTextVersionContent {}
