import type { ComponentType, SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  absoluteStrokeWidth?: boolean;
}

export interface NavigationItem {
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
  group?: string;
}

export interface SelectableCategory<TId extends string = string> {
  id: TId;
  label: string;
}

export interface ResourceFilter<TValue extends string = string> {
  value: TValue;
  label: string;
}

export interface PageSection {
  id: string;
  title: string;
  description?: string;
}

export interface ResourceCard {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  type?: string;
  tags?: string[];
}

export interface EvidenceSource {
  label: string;
  href?: string;
  type?: "wissenschaft" | "versorgung";
  note?: string;
}
