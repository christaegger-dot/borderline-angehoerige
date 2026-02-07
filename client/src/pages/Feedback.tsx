import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageSquare, Send, CheckCircle2, Heart, Star, ThumbsUp, AlertCircle, Mail } from "lucide-react";
import { emailById } from "@/data/kontakte";

const emailAngehoerigen = emailById("EMAIL_ANGEHOERIGEN")!;
import { useState } from "react";

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [message, setMessage] = useState("");
  const [foundHelpful, setFoundHelpful] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Da dies eine statische Website ist, speichern wir das Feedback im localStorage
    // In einer Produktionsumgebung würde dies an einen Server gesendet werden
    const feedback = {
      rating,
      feedbackType,
      message,
      foundHelpful,
      timestamp: new Date().toISOString()
    };
    
    // Feedback im localStorage speichern (für Demo-Zwecke)
    const existingFeedback = JSON.parse(localStorage.getItem('website-feedback') || '[]');
    existingFeedback.push(feedback);
    localStorage.setItem('website-feedback', JSON.stringify(existingFeedback));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-20 md:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl mx-auto text-center"
            >
              <div className="w-20 h-20 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-sage-dark" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Herzlichen Dank!
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Ihr Feedback hilft uns, diese Ressource für Angehörige weiter zu verbessern. 
                Wir schätzen es sehr, dass Sie sich die Zeit genommen haben.
              </p>
              
              <Card className="bg-sage-lighter/20 border-sage/30">
                <CardContent className="p-6">
                  <Heart className="w-8 h-8 text-sage mx-auto mb-3" />
                  <p className="text-foreground">
                    Denken Sie daran: Sie sind nicht allein. Viele Angehörige gehen einen ähnlichen Weg.
                  </p>
                </CardContent>
              </Card>
              
              <Button 
                className="mt-8 bg-terracotta hover:bg-terracotta-mid"
                onClick={() => window.location.href = '/'}
              >
                Zurück zur Startseite
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-slate-light/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-light flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-slate-dark" />
              </div>
              <span className="text-sm font-medium text-slate-dark">Anonym & vertraulich</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Ihr Feedback
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Ihre Rückmeldung hilft uns, diese Website für andere Angehörige noch hilfreicher zu gestalten. 
              Alle Angaben sind freiwillig und vollständig anonym.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Gesamtbewertung */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Wie hilfreich fanden Sie diese Website?
                    </h2>
                    <div className="flex gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-2 rounded-lg transition-all ${
                            rating && rating >= star
                              ? 'text-sand-accent scale-110'
                              : 'text-muted-foreground/40 hover:text-sand-accent/60'
                          }`}
                        >
                          <Star className={`w-10 h-10 ${rating && rating >= star ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-3">
                      {rating === 1 && "Nicht hilfreich"}
                      {rating === 2 && "Wenig hilfreich"}
                      {rating === 3 && "Teilweise hilfreich"}
                      {rating === 4 && "Hilfreich"}
                      {rating === 5 && "Sehr hilfreich"}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Was war besonders hilfreich? */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Was war für Sie besonders hilfreich?
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'verstehen', label: 'Borderline verstehen' },
                        { id: 'kommunikation', label: 'Kommunikationstipps' },
                        { id: 'grenzen', label: 'Grenzen setzen' },
                        { id: 'selbstfuersorge', label: 'Selbstfürsorge' },
                        { id: 'notfall', label: 'Krisenressourcen' },
                        { id: 'materialien', label: 'Materialien & Handouts' },
                        { id: 'genesung', label: 'Hoffnung & Genesung' },
                        { id: 'selbsttest', label: 'Selbsttest' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFoundHelpful(foundHelpful === item.id ? '' : item.id)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            foundHelpful === item.id
                              ? 'border-sage bg-sage-light/50 text-foreground'
                              : 'border-border hover:border-sage/50 text-muted-foreground'
                          }`}
                        >
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Art des Feedbacks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Was möchten Sie uns mitteilen?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {[
                        { id: 'lob', label: 'Lob', icon: ThumbsUp, color: 'var(--color-sage)' },
                        { id: 'verbesserung', label: 'Verbesserungsvorschlag', icon: MessageSquare, color: 'var(--color-slate-mid)' },
                        { id: 'fehler', label: 'Fehler melden', icon: AlertCircle, color: 'var(--color-terracotta)' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFeedbackType(type.id)}
                          className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                            feedbackType === type.id
                              ? `border-[${type.color}] bg-[${type.color}]/10`
                              : 'border-border hover:border-muted-foreground/50'
                          }`}
                        >
                          <type.icon className={`w-6 h-6 ${feedbackType === type.id ? `text-[${type.color}]` : 'text-muted-foreground'}`} />
                          <span className={`text-sm font-medium ${feedbackType === type.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ihre Nachricht (optional)..."
                      className="w-full h-32 p-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-sage resize-none"
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Datenschutz-Hinweis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-sand border-sand-subtle">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Hinweis zur Anonymität:</strong> Dieses Feedback-Formular 
                      sammelt keine persönlichen Daten. Ihre IP-Adresse wird nicht gespeichert. 
                      Das Feedback wird nur lokal in Ihrem Browser gespeichert und nicht an einen Server übertragen.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Direkter Kontakt */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-sage-light/30 border-sage/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-sage-dark" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Möchten Sie uns direkt erreichen?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Für persönliche Rückfragen oder ausführlicheres Feedback können Sie uns gerne per E-Mail kontaktieren.
                    </p>
                    <a 
                      href={`mailto:${emailAngehoerigen.adresse}`}
                      className="inline-flex items-center gap-2 text-sage-dark hover:text-sage-darker font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {emailAngehoerigen.adresse}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-terracotta hover:bg-terracotta-mid text-white px-8"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Feedback absenden
                </Button>
              </motion.div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
