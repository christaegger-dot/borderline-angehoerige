/**
 * Schnelleinstieg – Interaktives Element #6
 * „Ich brauche gerade…" – 4 Buttons auf der Startseite leiten zur passenden Seite.
 * Einfügepunkt: / (Home) → nach Hero, vor Crisis Matrix
 * Design: Tokens only, Inter only, mobile-first (375px safe)
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Wind, Shield, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const needs = [
  {
    label: "Verstehen",
    sublabel: "Was passiert hier?",
    href: "/verstehen",
    icon: BookOpen,
    color: "var(--color-sage)",
    bgColor: "var(--color-sage-wash)",
    borderColor: "var(--color-sage-mid)",
  },
  {
    label: "Ruhig bleiben",
    sublabel: "Ich bin angespannt",
    href: "/selbstfuersorge#sofort-uebungen",
    icon: Wind,
    color: "var(--color-slate-dark)",
    bgColor: "var(--color-slate-wash)",
    borderColor: "var(--color-slate-mid)",
  },
  {
    label: "Grenzen setzen",
    sublabel: "Ich brauche Abstand",
    href: "/grenzen",
    icon: Shield,
    color: "var(--color-terracotta-mid)",
    bgColor: "var(--color-terracotta-wash)",
    borderColor: "var(--color-terracotta-mid)",
  },
  {
    label: "Akute Hilfe",
    sublabel: "Es ist dringend",
    href: "/soforthilfe",
    icon: Phone,
    color: "var(--color-alert)",
    bgColor: "var(--color-alert-wash)",
    borderColor: "var(--color-alert)",
  },
];

export default function Schnelleinstieg() {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
            Ich brauche gerade…
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Wählen Sie, was jetzt am meisten hilft – Sie landen direkt beim passenden Inhalt.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
          {needs.map((need, index) => {
            const Icon = need.icon;
            return (
              <motion.div
                key={need.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link href={need.href}>
                  <Card
                    className="group h-full cursor-pointer border-2 border-dashed transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-solid"
                    style={{
                      borderColor: need.borderColor,
                      backgroundColor: need.bgColor,
                    }}
                  >
                    <CardContent className="p-4 md:p-5 text-center flex flex-col items-center gap-2">
                      <div
                        className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: need.color }}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <p
                          className="font-semibold text-sm md:text-base"
                          style={{ color: need.color }}
                        >
                          {need.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                          {need.sublabel}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
