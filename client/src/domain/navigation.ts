import {
  BookMarked,
  BookOpen,
  Building2,
  ClipboardCheck,
  Compass,
  Download,
  FileText,
  FlaskConical,
  Heart,
  HelpCircle,
  MessageCircle,
  Shield,
  Sparkles,
  Stethoscope,
  TrendingUp,
} from "@/icons/root-icons";
import type { NavigationItem } from "@/domain/content-types";
import { learningSteps } from "@/content/learningArchitecture";

const learningIcons: Record<string, NavigationItem["icon"]> = {
  verstehen: BookOpen,
  rolle: Heart,
  kommunikation: MessageCircle,
  grenzen: Shield,
  "eigene-gesundheit": Sparkles,
  genesung: TrendingUp,
};

export const primaryNavigationItems: NavigationItem[] = learningSteps
  .filter(step => step.navigationLabel)
  .map(step => ({
    href: step.href,
    label: step.navigationLabel!,
    icon: learningIcons[step.id],
  }));

export const resourceNavigationItems: NavigationItem[] = [
  // Gruppe: Sofortige Hilfe
  {
    href: "/soforthilfe",
    label: "Soforthilfe",
    icon: FileText,
    group: "Sofortige Hilfe",
  },
  {
    href: "/wegweiser",
    label: "Situations-Wegweiser",
    icon: Compass,
    group: "Sofortige Hilfe",
  },
  {
    href: "/selbsttest",
    label: "Inhalte finden",
    icon: ClipboardCheck,
    group: "Sofortige Hilfe",
  },
  // Gruppe: Wissen & Materialien
  {
    href: "/materialien",
    label: "Materialien & Handouts",
    icon: Download,
    group: "Wissen & Materialien",
  },
  {
    href: "/faq",
    label: "Häufige Fragen (FAQ)",
    icon: HelpCircle,
    group: "Wissen & Materialien",
  },
  {
    href: "/glossar",
    label: "Glossar",
    icon: BookMarked,
    group: "Wissen & Materialien",
  },
  {
    href: "/buchempfehlungen",
    label: "Buchempfehlungen",
    icon: BookOpen,
    group: "Wissen & Materialien",
    secondary: true,
  },
  {
    href: "/quellen",
    label: "Quellen & Literatur",
    icon: FlaskConical,
    group: "Wissen & Materialien",
    secondary: true,
  },
  // Gruppe: Beratung & Netzwerke
  {
    href: "/beratung",
    label: "Beratung & Netzwerke",
    icon: Heart,
    group: "Beratung & Netzwerke",
  },
  {
    href: "/fachstelle",
    label: "Fachstelle & Kontakt",
    icon: Building2,
    group: "Beratung & Netzwerke",
  },
  {
    href: "/unterstuetzen/therapie#therapieangebote",
    label: "Therapieangebote Zürich",
    icon: Stethoscope,
    group: "Beratung & Netzwerke",
  },
];

function normalizeNavigationLocation(location: string) {
  return location.split("#")[0];
}

export function isPrimaryNavigationItemActive(
  itemHref: string,
  location: string
) {
  const normalizedLocation = normalizeNavigationLocation(location);

  if (itemHref === "/unterstuetzen/uebersicht") {
    return normalizedLocation.startsWith("/unterstuetzen/");
  }

  return (
    normalizedLocation === itemHref ||
    normalizedLocation.startsWith(`${itemHref}/`)
  );
}

export function isResourceNavigationItemActive(
  itemHref: string,
  location: string
) {
  const normalizedHref = normalizeNavigationLocation(itemHref);
  const normalizedLocation = normalizeNavigationLocation(location);

  return (
    normalizedLocation === normalizedHref ||
    normalizedLocation.startsWith(`${normalizedHref}/`)
  );
}

export function hasHeaderNavigationCurrent(location: string) {
  return (
    normalizeNavigationLocation(location) === "/" ||
    primaryNavigationItems.some(item =>
      isPrimaryNavigationItemActive(item.href, location)
    ) ||
    resourceNavigationItems.some(item =>
      isResourceNavigationItemActive(item.href, location)
    )
  );
}
