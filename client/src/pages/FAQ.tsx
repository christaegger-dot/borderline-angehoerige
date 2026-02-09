import SEO from "@/components/SEO";
import { FAQSchema } from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, Shield, Heart, Users, Clock, AlertTriangle, Lightbulb, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "wouter";

interface FAQItem {
  question: string;
  answer: string;
  links?: { text: string; url: string }[];
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  questions: FAQItem[];
}

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState<string | null>("diagnose");

  const faqCategories: FAQCategory[] = [
    {
      title: "Diagnose & Krankheitsverständnis",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "var(--color-slate-mid)",
      questions: [
        {
          question: "Soll ich die Diagnose ansprechen?",
          answer: "Das hängt von der Situation ab. Wenn Ihr Angehöriger die Diagnose bereits kennt und akzeptiert, kann ein offenes Gespräch hilfreich sein – es zeigt, dass Sie sich informieren und verstehen wollen. Vermeiden Sie jedoch, die Diagnose als «Waffe» zu benutzen («Du verhältst dich wieder so borderline-mässig»). Wenn die Diagnose noch nicht gestellt oder nicht akzeptiert wurde, konzentrieren Sie sich besser auf konkrete Verhaltensweisen und Gefühle statt auf Labels. Sagen Sie zum Beispiel: «Ich merke, dass du gerade sehr aufgewühlt bist» statt «Das ist deine Borderline».",
          links: [{ text: "Mehr zur Kommunikation", url: "/kommunizieren" }]
        },
        {
          question: "Ist Borderline heilbar?",
          answer: "Ja, die Prognose ist deutlich besser als früher angenommen. Langzeitstudien zeigen, dass 85–93% der Betroffenen nach 10 Jahren eine symptomatische Remission erreichen – das heisst, sie erfüllen nicht mehr die diagnostischen Kriterien. Etwa 50% erreichen eine vollständige Genesung (Remission plus gute soziale und berufliche Funktionsfähigkeit). Die Symptome werden mit zunehmendem Alter oft milder, besonders die Impulsivität. Therapie beschleunigt diesen Prozess erheblich.",
          links: [{ text: "Zur Genesung-Seite", url: "/genesung" }]
        },
        {
          question: "Ist Borderline erblich? Bin ich schuld?",
          answer: "Borderline entsteht durch ein Zusammenspiel von genetischer Veranlagung (ca. 40–60% Erblichkeit) und Umweltfaktoren. Genetisch wird eine erhöhte emotionale Sensibilität vererbt – nicht die Störung selbst. Umweltfaktoren wie Traumata, Vernachlässigung oder invalidierendes Umfeld spielen eine Rolle, aber: Viele Menschen mit schwierigen Kindheiten entwickeln keine Borderline, und manche Betroffene hatten keine offensichtlichen Traumata. Sie sind nicht «schuld» an der Erkrankung Ihres Angehörigen. Schuldgefühle sind verständlich, aber nicht hilfreich – weder für Sie noch für Ihren Angehörigen."
        },
        {
          question: "Warum verhält sich mein Angehöriger bei anderen «normal»?",
          answer: "Dieses Phänomen ist typisch und kein Zeichen von Manipulation. Menschen mit Borderline haben oft die grössten Schwierigkeiten in engen Beziehungen, weil dort die Verlassensangst am stärksten aktiviert wird. Bei Fremden oder in oberflächlichen Kontakten ist diese Angst geringer, daher können sie sich besser regulieren. Es ist paradox: Je wichtiger Sie Ihrem Angehörigen sind, desto intensiver können die Symptome sein. Das ist keine bewusste Entscheidung, sondern ein Muster, das in der Therapie bearbeitet wird."
        }
      ]
    },
    {
      title: "Kommunikation & Konflikte",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "var(--color-sage-mid)",
      questions: [
        {
          question: "Wie reagiere ich auf Drohungen?",
          answer: "Unterscheiden Sie zwischen Suiziddrohungen und anderen Drohungen. Bei Suiziddrohungen: Nehmen Sie diese immer ernst, aber lassen Sie sich nicht erpressen. Sagen Sie: «Ich höre, dass du gerade sehr leidest. Wenn du sagst, du willst dir etwas antun, muss ich den Notruf rufen.» Und tun Sie das auch – jedes Mal. Bei anderen Drohungen (z.B. «Dann verlasse ich dich»): Bleiben Sie ruhig, validieren Sie das Gefühl («Ich höre, dass du wütend bist»), aber geben Sie nicht nach. Drohungen sind oft ein verzweifelter Versuch, Kontrolle zu gewinnen, wenn sich jemand machtlos fühlt.",
          links: [{ text: "Krisenszenarien-Anleitungen", url: "/soforthilfe" }]
        },
        {
          question: "Was sage ich, wenn mein Angehöriger mich beschuldigt?",
          answer: "Vermeiden Sie Rechtfertigungen oder Gegenangriffe – das eskaliert die Situation. Nutzen Sie stattdessen Validierung: «Ich verstehe, dass du dich gerade verletzt fühlst» (validiert das Gefühl, nicht die Beschuldigung). Dann setzen Sie eine Grenze: «Ich möchte mit dir darüber sprechen, aber nicht, wenn du mich anschreist.» Wenn möglich, bieten Sie eine Pause an: «Lass uns in 20 Minuten weitersprechen, wenn wir beide ruhiger sind.» Wichtig: Sie müssen sich nicht für Dinge entschuldigen, die Sie nicht getan haben.",
          links: [{ text: "SET-Kommunikation lernen", url: "/kommunizieren" }]
        },
        {
          question: "Wie gehe ich mit dem Schwarz-Weiss-Denken um?",
          answer: "Das «Splitting» (Idealisierung und Abwertung) ist ein Kernmerkmal von Borderline. In einem Moment sind Sie der beste Mensch der Welt, im nächsten der schlimmste. Wichtig: Nehmen Sie weder die Idealisierung noch die Abwertung persönlich. Beide sind Verzerrungen. Bleiben Sie konsistent in Ihrem Verhalten, auch wenn die Bewertung schwankt. Sagen Sie zum Beispiel: «Ich bin derselbe Mensch wie gestern. Ich liebe dich, auch wenn du gerade wütend auf mich bist.» Mit der Zeit und Therapie lernen Betroffene, Grautöne zu sehen."
        },
        {
          question: "Soll ich lügen, um Konflikte zu vermeiden?",
          answer: "Nein. Kurzfristig mag eine Lüge Frieden bringen, aber langfristig zerstört sie Vertrauen – und Vertrauen ist für Menschen mit Borderline ohnehin schwierig. Stattdessen: Seien Sie ehrlich, aber taktvoll. Nutzen Sie «Ich»-Aussagen statt Vorwürfe. Wenn die Wahrheit schmerzhaft ist, validieren Sie zuerst das Gefühl: «Ich weiss, das ist nicht das, was du hören wolltest, und ich verstehe, dass dich das verletzt.» Ehrlichkeit mit Mitgefühl ist der Mittelweg zwischen brutaler Offenheit und Vermeidung."
        }
      ]
    },
    {
      title: "Grenzen & Selbstschutz",
      icon: <Shield className="w-5 h-5" />,
      color: "var(--color-terracotta-mid)",
      questions: [
        {
          question: "Wann ist eine Einweisung nötig?",
          answer: "Eine psychiatrische Einweisung (freiwillig oder unfreiwillig) ist angezeigt bei: akuter Suizidalität mit konkreten Plänen oder Mitteln, schwerer Selbstverletzung, die medizinische Versorgung erfordert, Fremdgefährdung, oder wenn die Person so dekompensiert ist, dass sie sich nicht mehr selbst versorgen kann. In der Schweiz kann eine fürsorgerische Unterbringung (FU) durch einen Arzt angeordnet werden, wenn eine ernsthafte Selbst- oder Fremdgefährdung vorliegt. Rufen Sie im Zweifelsfall den psychiatrischen Notdienst an – die können die Situation einschätzen.",
          links: [{ text: "Notfallnummern", url: "/soforthilfe" }]
        },
        {
          question: "Darf ich meinen Angehörigen verlassen?",
          answer: "Ja. Eine Beziehung zu beenden ist immer eine legitime Option – auch wenn Ihr Angehöriger psychisch krank ist. Borderline erklärt Verhalten, entschuldigt es aber nicht. Wenn die Beziehung Ihre eigene psychische oder physische Gesundheit gefährdet, ist Trennung manchmal der richtige Schritt. Wichtig: Trennen Sie sich nicht impulsiv während einer Krise, sondern planen Sie sorgfältig. Informieren Sie den Therapeuten Ihres Angehörigen. Und: Sie können gehen und trotzdem Mitgefühl haben. Beides schliesst sich nicht aus.",
          links: [{ text: "Grenzen setzen", url: "/grenzen" }]
        },
        {
          question: "Wie schütze ich meine Kinder?",
          answer: "Kinder brauchen Stabilität und Vorhersehbarkeit. Erklären Sie altersgerecht, dass Mama/Papa manchmal sehr starke Gefühle hat und das nicht die Schuld des Kindes ist. Schützen Sie Kinder vor eskalierenden Situationen – verlassen Sie mit ihnen den Raum, wenn nötig. Sorgen Sie für «Normalität»: Routinen, Freunde, Hobbys. Achten Sie auf Warnsignale beim Kind (Rückzug, Angst, Verhaltensänderungen) und holen Sie bei Bedarf professionelle Hilfe. Und: Kümmern Sie sich um sich selbst – ein stabiler Elternteil ist der beste Schutz für das Kind."
        },
        {
          question: "Bin ich co-abhängig?",
          answer: "Co-Abhängigkeit bedeutet, dass Ihr eigenes Wohlbefinden übermässig vom Zustand des anderen abhängt und Sie Ihre eigenen Bedürfnisse vernachlässigen, um den anderen zu «retten». Warnsignale: Sie entschuldigen ständig das Verhalten Ihres Angehörigen, Sie haben Ihr soziales Leben aufgegeben, Sie fühlen sich verantwortlich für seine Gefühle, Sie können nicht «Nein» sagen ohne Schuldgefühle. Wenn Sie sich wiedererkennen: Das ist kein Charakterfehler, sondern ein erlerntes Muster. Eigene Therapie oder eine Gruppe für Angehörige kann helfen, gesündere Grenzen zu entwickeln.",
          links: [{ text: "Selbstfürsorge", url: "/selbstfuersorge" }, { text: "Glossar: Co-Abhängigkeit", url: "/glossar" }]
        }
      ]
    },
    {
      title: "Therapie & Behandlung",
      icon: <Heart className="w-5 h-5" />,
      color: "var(--color-slate-mid)",
      questions: [
        {
          question: "Mein Angehöriger will keine Therapie – was tun?",
          answer: "Sie können niemanden zur Therapie zwingen (ausser bei akuter Gefährdung). Was Sie tun können: Informieren Sie sich selbst über Borderline und ändern Sie Ihr eigenes Verhalten – das kann indirekt helfen. Sprechen Sie Therapie als Möglichkeit an, ohne zu drängen. Nutzen Sie «Ich»-Aussagen: «Ich mache mir Sorgen und wünsche mir, dass du Unterstützung bekommst.» Setzen Sie Grenzen für inakzeptables Verhalten – manchmal motiviert das zur Veränderung. Und: Holen Sie sich selbst Unterstützung, unabhängig davon, ob Ihr Angehöriger Therapie macht.",
          links: [{ text: "Therapieangebote Zürich", url: "/unterstuetzen/therapie#therapieangebote" }]
        },
        {
          question: "Welche Therapie ist am besten?",
          answer: "Für Borderline gibt es mehrere evidenzbasierte Therapien: DBT (Dialektisch-Behaviorale Therapie) ist am besten erforscht und besonders wirksam bei Selbstverletzung und Suizidalität. MBT (Mentalisierungsbasierte Therapie) fokussiert auf das Verstehen eigener und fremder Gedanken/Gefühle. Schematherapie arbeitet an frühen Prägungen und Beziehungsmustern. TFP (Übertragungsfokussierte Therapie) nutzt die therapeutische Beziehung zur Veränderung. Alle sind wirksam – wichtiger als die Methode ist oft die Passung zwischen Therapeut und Patient.",
          links: [{ text: "Therapieformen erklärt", url: "/unterstuetzen/therapie" }]
        },
        {
          question: "Soll ich an der Therapie teilnehmen?",
          answer: "Wenn Sie eingeladen werden: Ja, das kann sehr hilfreich sein. Familientherapie oder Angehörigensitzungen verbessern nachweislich die Behandlungsergebnisse. Sie lernen, wie Sie unterstützen können, ohne zu schaden, und der Therapeut kann Kommunikationsmuster beobachten. Wichtig: Gehen Sie nicht hin, um sich zu beschweren oder Recht zu bekommen. Ziel ist gemeinsames Lernen. Wenn Sie nicht eingeladen werden: Respektieren Sie das. Ihr Angehöriger braucht einen geschützten Raum. Sie können trotzdem eigene Beratung suchen."
        },
        {
          question: "Wie lange dauert die Behandlung?",
          answer: "Borderline-Therapie ist keine Kurzzeitbehandlung. Rechnen Sie mit mindestens 1–3 Jahren regelmässiger Therapie für deutliche Verbesserungen. Stationäre Aufenthalte (z.B. auf einer DBT-Station) dauern typischerweise 8–12 Wochen und sind oft der Einstieg in eine längere ambulante Behandlung. Fortschritte sind nicht linear – es gibt Rückschläge, besonders bei Stress. Das ist normal und kein Zeichen von Versagen. Die gute Nachricht: Die meisten Betroffenen zeigen mit der Zeit deutliche Verbesserungen."
        }
      ]
    },
    {
      title: "Alltag & Beziehung",
      icon: <Users className="w-5 h-5" />,
      color: "var(--color-terracotta-mid)",
      questions: [
        {
          question: "Wie erkläre ich die Situation Freunden/Familie?",
          answer: "Sie müssen nicht alles erklären. Sagen Sie so viel, wie Sie möchten: «Er/sie hat eine psychische Erkrankung, die starke Stimmungsschwankungen verursacht. Wir arbeiten daran.» Sie können auch Grenzen setzen: «Ich möchte nicht ins Detail gehen, aber ich schätze eure Unterstützung.» Wählen Sie sorgfältig aus, wem Sie was erzählen – nicht jeder muss alles wissen. Und: Bitten Sie um konkrete Hilfe statt allgemeinem Mitleid («Könntest du nächste Woche auf die Kinder aufpassen?»)."
        },
        {
          question: "Wie gehe ich mit Eifersucht und Kontrolle um?",
          answer: "Eifersucht bei Borderline wurzelt oft in Verlassensangst, nicht in Misstrauen. Verstehen Sie das, ohne es zu akzeptieren. Setzen Sie klare Grenzen: «Ich werde mein Handy nicht zeigen. Ich habe nichts zu verbergen, aber ich brauche Privatsphäre.» Geben Sie nicht nach, um Ruhe zu haben – das verstärkt das Muster. Gleichzeitig: Seien Sie transparent, wo es Ihnen möglich ist, ohne sich zu verbiegen. Ermutigen Sie Ihren Angehörigen, die Eifersucht in der Therapie zu bearbeiten."
        },
        {
          question: "Kann ich noch ein normales Leben führen?",
          answer: "Ja, aber es erfordert bewusste Anstrengung. Pflegen Sie Ihre eigenen Freundschaften, Hobbys und Interessen – das ist kein Verrat, sondern notwendig. Planen Sie «Auszeiten» ein, auch wenn es nur ein Spaziergang ist. Akzeptieren Sie, dass Ihr Leben anders aussieht als das anderer – aber «anders» bedeutet nicht «schlechter». Viele Angehörige berichten, dass sie durch die Erfahrung empathischer, geduldiger und selbstbewusster geworden sind. Suchen Sie sich Unterstützung (Therapie, Gruppen), damit Sie nicht allein tragen.",
          links: [{ text: "Selbstfürsorge-Strategien", url: "/selbstfuersorge" }, { text: "Beratung & Netzwerke", url: "/beratung" }]
        },
        {
          question: "Wann wird es besser?",
          answer: "Das ist die schwierigste Frage. Die ehrliche Antwort: Es ist unvorhersehbar. Manche Betroffene zeigen nach wenigen Monaten Therapie deutliche Fortschritte, bei anderen dauert es Jahre. Was Sie beeinflussen können: Ihr eigenes Verhalten, Ihre Grenzen, Ihre Selbstfürsorge. Was Sie nicht beeinflussen können: Den Zeitpunkt der Besserung Ihres Angehörigen. Fokussieren Sie sich auf das, was in Ihrer Macht liegt. Und: «Besser» bedeutet nicht «perfekt». Lernen Sie, Fortschritte zu sehen, auch wenn sie klein sind."
        }
      ]
    }
  ];

  return (
    <Layout>
      <SEO title="Häufige Fragen" description="Antworten auf die häufigsten Fragen von Angehörigen zu Borderline." path="/faq" />
      <FAQSchema questions={faqCategories.flatMap(c => c.questions.map(q => ({ question: q.question, answer: q.answer })))} />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-slate-lighter/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-mid flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Häufig gestellte Fragen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Antworten auf die Fragen, die Angehörige am häufigsten stellen – ehrlich, praktisch und evidenzbasiert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, ease: "easeOut" }}
                className="mb-8"
              >
                <div 
                  className="flex items-center gap-3 mb-4 cursor-pointer"
                  onClick={() => setOpenCategory(openCategory === category.title ? null : category.title)}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    {category.title}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border rounded-lg bg-card hover:bg-accent/5 transition-colors"
                    >
                      <AccordionTrigger className="px-5 py-4 hover:no-underline text-left">
                        <span className="font-medium text-foreground pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-5">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        {faq.links && faq.links.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {faq.links.map((link, linkIndex) => (
                              <Link key={linkIndex} href={link.url}>
                                <span 
                                  className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
                                  style={{ 
                                    backgroundColor: `${category.color}15`,
                                    color: category.color
                                  }}
                                >
                                  {link.text}
                                  <ChevronRight className="w-3 h-3" />
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}

            {/* Weitere Fragen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Card className="bg-terracotta-wash border-terracotta">
                <CardContent className="p-6 text-center">
                  <Lightbulb className="w-8 h-8 text-terracotta-mid mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Ihre Frage ist nicht dabei?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Nutzen Sie die Suchfunktion oder kontaktieren Sie die Fachstelle Angehörigenarbeit der PUK Zürich für individuelle Beratung.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/impressum">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-sage-mid hover:underline">
                        Zur Beratung
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </Link>
                    <Link href="/glossar">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-mid hover:underline">
                        Zum Glossar
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
