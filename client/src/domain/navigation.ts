import {
  BookMarked,
  BookOpen,
  Building2,
  Download,
  Heart,
  HelpCircle,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import type { NavigationItem } from "@/domain/content-types";

export const primaryNavigationItems: NavigationItem[] = [
  { href: "/verstehen", label: "Verstehen", icon: BookOpen },
  { href: "/unterstuetzen/uebersicht", label: "Unterstützen", icon: Heart },
  { href: "/kommunizieren", label: "Kommunizieren", icon: MessageCircle },
  { href: "/grenzen", label: "Grenzen", icon: Shield },
  { href: "/selbstfuersorge", label: "Selbstfürsorge", icon: Sparkles },
];

export const resourceNavigationItems: NavigationItem[] = [
  { href: "/materialien", label: "Materialien & Handouts", icon: Download },
  { href: "/beratung", label: "Beratung & Netzwerke", icon: Heart },
  { href: "/fachstelle", label: "Fachstelle & Kontakt", icon: Building2 },
  { href: "/faq", label: "Häufige Fragen (FAQ)", icon: HelpCircle },
  { href: "/glossar", label: "Glossar", icon: BookMarked },
  { href: "/buchempfehlungen", label: "Buchempfehlungen", icon: BookOpen },
  {
    href: "/unterstuetzen/therapie#therapieangebote",
    label: "Therapieangebote Zürich",
    icon: Stethoscope,
  },
  { href: "/soforthilfe", label: "Soforthilfe", icon: Phone },
];
