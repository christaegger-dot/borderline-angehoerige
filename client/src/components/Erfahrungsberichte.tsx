import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote, Heart, Users, User } from "lucide-react";

interface Erfahrungsbericht {
  text: string;
  autor: string;
  beziehung: string;
  icon: "partner" | "eltern" | "geschwister";
  highlight?: string;
}

const berichte: Erfahrungsbericht[] = [
  {
    text: "Am Anfang dachte ich, ich mache alles falsch. Jeder Versuch zu helfen schien die Situation zu verschlimmern. Erst als ich lernte, dass ich nicht für seine Gefühle verantwortlich bin – aber für meine Reaktion darauf – begann sich etwas zu verändern. Heute, nach drei Jahren, haben wir eine Beziehung, die ich mir damals nicht vorstellen konnte.",
    autor: "Sandra, 42",
    beziehung: "Partnerin",
    icon: "partner",
    highlight: "Ich bin nicht für seine Gefühle verantwortlich – aber für meine Reaktion darauf."
  },
  {
    text: "Als Mutter einer Tochter mit Borderline habe ich jahrelang versucht, sie zu 'retten'. Ich habe mich selbst dabei verloren. Der Wendepunkt kam, als mir eine Therapeutin sagte: 'Sie können ein Leuchtturm sein, aber nicht das Schiff steuern.' Heute setze ich Grenzen – aus Liebe, nicht aus Ablehnung. Und unsere Beziehung ist ehrlicher als je zuvor.",
    autor: "Monika, 58",
    beziehung: "Mutter",
    icon: "eltern",
    highlight: "Sie können ein Leuchtturm sein, aber nicht das Schiff steuern."
  },
  {
    text: "Mein Bruder wurde mit 25 diagnostiziert. Die ersten Jahre waren eine Achterbahn – Krisen, Klinikaufenthalte, Funkstille. Was mir geholfen hat: Eine Selbsthilfegruppe für Angehörige. Zu merken, dass ich nicht allein bin. Und zu akzeptieren, dass Heilung kein gerader Weg ist. Er macht Fortschritte, in seinem Tempo. Und ich habe gelernt, dabei zu sein, ohne mich aufzugeben.",
    autor: "Thomas, 34",
    beziehung: "Bruder",
    icon: "geschwister",
    highlight: "Heilung ist kein gerader Weg."
  },
  {
    text: "Nach der Diagnose meiner Frau war ich wütend – auf die Ärzte, auf sie, auf mich selbst. Warum hat niemand das früher erkannt? Dann kam die Trauer. Und irgendwann die Akzeptanz. Heute weiss ich: Borderline ist ein Teil von ihr, aber nicht alles. Sie ist auch die Frau, die ich liebe, mit all ihrer Tiefe und Intensität.",
    autor: "Marco, 47",
    beziehung: "Ehemann",
    icon: "partner",
    highlight: "Borderline ist ein Teil von ihr, aber nicht alles."
  }
];

const iconMap = {
  partner: Heart,
  eltern: Users,
  geschwister: User
};

interface ErfahrungsberichteProps {
  maxBerichte?: number;
  showTitle?: boolean;
  variant?: "full" | "compact";
}

export default function Erfahrungsberichte({ 
  maxBerichte = 3, 
  showTitle = true,
  variant = "full" 
}: ErfahrungsberichteProps) {
  const displayBerichte = berichte.slice(0, maxBerichte);
  
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Stimmen von Angehörigen
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sie sind nicht allein. Andere Angehörige teilen ihre Erfahrungen – 
              die Herausforderungen, aber auch die Hoffnung.
            </p>
          </motion.div>
        )}
        
        <div className={`grid gap-6 ${variant === "full" ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {displayBerichte.map((bericht, index) => {
            const Icon = iconMap[bericht.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:border-[oklch(0.65_0.10_55)] transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[oklch(0.92_0.05_55)] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[oklch(0.55_0.15_55)]" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{bericht.autor}</p>
                        <p className="text-sm text-muted-foreground">{bericht.beziehung}</p>
                      </div>
                    </div>
                    
                    <Quote className="w-8 h-8 text-[oklch(0.85_0.05_55)] mb-3" />
                    
                    <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                      {bericht.text}
                    </p>
                    
                    {bericht.highlight && (
                      <div className="bg-[oklch(0.95_0.03_55)] rounded-lg p-3 border-l-2 border-[oklch(0.65_0.10_55)]">
                        <p className="text-sm font-medium text-foreground italic">
                          "{bericht.highlight}"
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          * Alle Namen wurden zum Schutz der Privatsphäre geändert.
        </motion.p>
      </div>
    </section>
  );
}
