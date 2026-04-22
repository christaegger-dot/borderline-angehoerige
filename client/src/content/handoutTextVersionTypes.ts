import type { MaterialCategory, MaterialItem } from "./materialien";

export interface HandoutTextCard {
  title: string;
  text: string;
}

export interface HandoutTextSection {
  title: string;
  intro?: string;
  cards?: HandoutTextCard[];
  bullets?: string[];
  calloutTitle?: string;
  calloutText?: string;
}

export interface HandoutTextVersionMeta {
  id: string;
  path: string;
  title: string;
  description: string;
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
}

export interface HandoutTextVersion
  extends HandoutTextVersionMeta, HandoutTextVersionContent {}
