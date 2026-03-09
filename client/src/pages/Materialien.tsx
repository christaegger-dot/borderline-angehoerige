import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, ExternalLink, Filter, BookOpen, Heart, MessageCircle, Shield, AlertTriangle, CheckCircle2, Image as ImageIcon, TrendingUp, ZoomIn, Eye } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "wouter";


// ═══════════════════════════════════════════════════════════════════════════
// MATERIALIEN-SEITE – ÜBERARBEITUNG IN PROGRESS
// Stand: 06.02.2026
// ═══════════════════════════════════════════════════════════════════════════

// Kategorie 1: Verstehen (6 Infografiken)
const infografiken: Array<{
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  url: string;
  downloadUrl?: string;
}> = [
  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 1: VERSTEHEN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "1-1-leuchtturm",
    title: "Der Leuchtturm – Ihre Rolle als Angehörige/r",
    description: "Zustandsdiagramm: Stabil bleiben trotz Sturm. Sie können das Schiff nicht steuern – aber Orientierung geben.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GbFCyQhEWIKomzXw.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DNGijMOYFghXAsLm.pdf",
  },
  {
    id: "1-2-eisberg",
    title: "Der Eisberg – Wut ist oft die Spitze",
    description: "Stock-&-Flow-Diagramm: Was Sie sehen (Wut) ist oft nur die Spitze – darunter liegen Schmerz, Angst, Scham.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MLLwefeyaKvtThbK.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/RNKtfQQMvhlSyiIp.pdf",
  },
  {
    id: "1-3-spaltung",
    title: "Spaltung – das Pendel zwischen Extremen",
    description: "Zustandsdiagramm: Unter Stress kippt die Bewertung leicht ins Extreme – die Grauzone wird schwer erreichbar.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WRORriPmZftmvKTL.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/RtdVgflJuCNAhEKk.pdf",
  },
  {
    id: "1-4-alarm-denk-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description: "Zustandsdiagramm: Im Alarm-Modus ist Logik oft nicht erreichbar – erst beruhigen, dann klären.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/sSUJoOUTiuWgrkiZ.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tlKAOpYHdCNAtovE.pdf",
  },
  {
    id: "1-5-vier-phasen-zyklus",
    title: "Der 4-Phasen-Zyklus – das vorhersehbare Muster",
    description: "Kausal-Loop: Krisen wirken chaotisch – folgen aber oft einem wiederkehrenden Ablauf.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BYDbBJaIhetrjHRq.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PBYpNxZamAxjOHYd.pdf",
  },
  {
    id: "1-6-kinder-erklaerung",
    title: "Wenn Mama oder Papa grosse Gefühle hat",
    description: "Borderline altersgerecht erklären (4–7, 8–12, 13+ Jahre) – und Kinder schützen. Mit 3 Schutzfaktoren und Geschwister-Abschnitt.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PrnKdbomSunLKPVv.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/birikKPATMlHGPWf.pdf",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 2: KOMMUNIZIEREN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "spickzettel-krisenkommunikation",
    title: "Spickzettel Krisenkommunikation (A4)",
    description: "Laminierbarer 1-Seiter mit allen Standardsätzen für die Krise – zum Ablesen in akuten Situationen.",
    category: "kommunizieren",
    type: "Spickzettel",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tgVHTaXVryVEuEss.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YvXkEbRmwIcCFtsj.pdf",
  },
  {
    id: "checkliste-validieren-60sek",
    title: "Validieren in 60 Sekunden – Checkliste (A4)",
    description: "Die 6 Stufen nach Linehan mit Beispielsätzen, Mini-Leitfaden für Eskalation und 3 Universalsätzen – zum Ausdrucken und Üben.",
    category: "kommunizieren",
    type: "Checkliste",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/mORKPLGTfHhGEMau.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/skHsKXRHdjFPuonb.pdf",
  },
  {
    id: "2-6-beispiel-dialog",
    title: "Beispiel-Dialog: kurz bleiben, ruhig bleiben",
    description: "Chat-Sequenzdiagramm: Kurz + ruhig + wiederholbar wirkt in Krisen stärker als Argumente.",
    category: "kommunizieren",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YZGoCcmXszaQGVtV.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WZdsgoAKaJwvMCjp.pdf",
  },
  {
    id: "wenn-worte-treffen",
    title: "Wenn Worte treffen – 5 häufige Schuldzuweisungen",
    description: "Was hinter Sätzen wie ‹Du bist schuld› oder ‹Ohne dich wäre alles besser› steckt – und wie Sie ruhig und klar reagieren können. Mit 5 konkreten Antwortbeispielen.",
    category: "kommunizieren",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/azZbLPyPkSupQskI.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/hEXKCmWYeiyUnwXr.pdf",
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 3: UNTERSTÜTZEN
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "k3-2-rolle-klaeren",
    title: "Ihre Rolle klären – Was Sie sein können (und was nicht)",
    description: "2-Spalten-Vergleich: Sie sind Angehörige/r – nicht Therapeut/in. Diese Klarheit entlastet beide Seiten.",
    category: "unterstuetzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WUiQpUWjKIjpSRDC.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/JMOjSacqrnDcAkoB.pdf",
  },

  {
    id: "k3-4-konsistenz",
    title: "Konsistenz-Prinzip – als Team wird es leichter",
    description: "Kausal-Loop: Wenn alle ähnlich reagieren, entsteht Sicherheit – und Eskalationen werden seltener.",
    category: "unterstuetzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MCMaGcrhifsekEqb.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/vfDYZzjEwJsEhzch.pdf",
  },
  {
    id: "k3-5-leitlinien",
    title: "6 Leitlinien für Angehörige – So können Sie unterstützen",
    description: "Evidenzbasierte Empfehlungen nach Gunderson: 6 konkrete Leitlinien zum Abhaken und Umsetzen.",
    category: "unterstuetzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OfOPUMQpHXrpSPgw.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/IIcvvdvSlDcXqwbL.pdf",
  },
  {
    id: "k3-6-achtsamkeit",
    title: "Beziehungs-Achtsamkeit – 4 Schritte im Alltag",
    description: "Timeline: Innehalten → Wahrnehmen → Nicht bewerten → Bewusst handeln – weniger Autopilot, mehr Klarheit.",
    category: "unterstuetzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/toOMoXhzHiaZUlBg.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/oPRapPNKMLHWEior.pdf",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 4: GRENZEN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "k4-1-dear-technik",
    title: "Die DEAR-Technik – Grenzen setzen ohne Vorwürfe",
    description: "4-Stufen-Treppe: Beschreiben → Äussern → Behaupten → Verstärken. Die DBT-Methode für respektvolle Grenzsetzung.",
    category: "grenzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/yBSkvBJGSeNvxINq.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DDkqUiaNJwizEtPv.pdf",
  },
  {
    id: "k4-2-spiegeln-aufsaugen",
    title: "Spiegeln statt Aufsaugen – Mitfühlen ohne Übernehmen",
    description: "Split-Screen-Vergleich: Schwamm vs. Spiegel. Sie können Gefühle anerkennen, ohne sie zu Ihren eigenen zu machen.",
    category: "grenzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/rbDvjxTUWJMXQCPj.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/jJFieYXEiIxbrazO.pdf",
  },
  {
    id: "k4-3-vier-arten-grenzen",
    title: "Die 4 Arten von Grenzen – Wissen, was Sie schützen",
    description: "4-Quadranten: Physische, emotionale, zeitliche und materielle Grenzen – mit konkreten Beispielsätzen.",
    category: "grenzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/otBFiwevLwWQsinR.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KiiZJfLHYOlNVTsn.pdf",
  },
  {
    id: "k4-4-grenzen-erkennen",
    title: "Grenzen erkennen – 5 Warnsignale Ihres Körpers",
    description: "Körper-Silhouette mit 5 Signalen: Bauch, Brust, Nacken, Erschöpfung, Fluchtimpuls. Lernen Sie, auf Ihren Körper zu hören.",
    category: "grenzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/pPRcjWVKERfSWUPL.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FftUeWuOzmxjrUEi.pdf",
  },



  {
    id: "k4-8-spickzettel-grenzen",
    title: "Spickzettel Grenzen – Die wichtigsten Sätze",
    description: "A4-Spickzettel zum Laminieren: DEAR-Technik, L.M.K.-Formel, Spiegeln statt Aufsaugen – alle wichtigen Sätze auf einen Blick.",
    category: "grenzen",
    type: "Spickzettel",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/avGqFKFuKFfFYANu.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/obwIZiRPiVPphIUX.pdf",
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 5: SELBSTFÜRSORGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "k5-1-warnsignale",
    title: "Warnsignale der Überlastung",
    description: "Ampel-Stufenmodell: Erkennen Sie rechtzeitig, wann es zu viel wird – von Grün (noch im Rahmen) über Gelb (Achtung) bis Rot (Hilfe suchen).",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OEUNVdTyojBBYTic.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VdAxPxngFzgNImxg.pdf",
  },

  {
    id: "k5-3-radikale-akzeptanz",
    title: "Radikale Akzeptanz – Aufhören zu kämpfen, anfangen zu handeln",
    description: "2-Spalten-Vergleich: Was Radikale Akzeptanz NICHT ist vs. was sie IST, plus 4-Schritte-Übung zum sofortigen Anwenden.",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OmxdguWaaXAkElDp.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/SkBpjnDHfNmPbmnd.pdf",
  },
  {
    id: "k5-4-stopp-technik",
    title: "Die STOPP-Technik – 5 Schritte aus der Stressspirale",
    description: "Stufen-Modell: Stopp, Tief atmen, Orientieren, Perspektive, Plan – in 30 Sekunden anwendbar bei akuter Belastung.",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qvJDZrQvvOlErFQu.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VnQKfkkQbPunhDed.pdf",
  },

  {
    id: "k5-6-erlaubnis-karte",
    title: "Erlaubnis-Karte – Was Sie sich erlauben dürfen",
    description: "Checkliste: 9 Erlaubnisse, die sich Angehörige oft nicht geben – gültig ab sofort, unbefristet, ausgestellt von Ihnen selbst.",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OMXnbczdvCPBRNTA.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DSOVugQyCvvOACIO.pdf",
  },
  {
    id: "k5-7-schuld-verantwortung",
    title: "Schuld, Verantwortung und was dazwischen liegt",
    description: "Warum Schuldgefühle bei Angehörigen so häufig sind: Was die Forschung zu den Ursachen von BPD zeigt, Schuld vs. Verantwortung im Vergleich, und 5 innere Schuld-Sätze – was wirklich stimmt.",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/TgzrtmiUbRscTBlg.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/jPuhxPHHtFSjOTly.pdf",
  },
  {
    id: "k5-8-raus-aus-dem-schuldspiel",
    title: "Raus aus dem Schuld-Spiel – nach Fruzzetti",
    description: "Warum Schuldzuweisungen in Familien niemanden weiterbringen: Die 4-Sackgassen-Matrix, der No-Blame-Ausweg (Beschreiben statt Beschuldigen) und 4 Grundannahmen für den Alltag.",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/pcOEhDaZzFxmXWZB.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DUSGEGpxuOpweDVP.pdf",
  },
  // === K6 GENESUNG ===
  {
    id: "k6-1-genesung-in-zahlen",
    title: "Genesung in Zahlen – Was die Forschung zeigt",
    description: "Orientierungs-Tracker: 85–93 % erreichen symptomatische Remission, 50 % vollständige Genesung – belegt durch Langzeitstudien (Zanarini et al.).",
    category: "genesung",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tyFTHNjsUagqrXiS.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MunlHDCNqnsOhBFn.pdf",
  },
  {
    id: "k6-2-fortschritt-paradox",
    title: "Das Fortschritt-Paradox – Warum Rückfälle zum Weg gehören",
    description: "Aufwärts-Spirale: Genesung verläuft nicht linear. Rückfälle bedeuten nicht Scheitern – sie sind Teil des Weges nach oben.",
    category: "genesung",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DPkqytVYFcreeBlC.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/UFLdEEGIDxKdRUZO.pdf",
  },

  {
    id: "k6-4-fuenf-faktoren-genesung",
    title: "5 Faktoren, die Genesung fördern",
    description: "Säulen-Modell: Spezialisierte Therapie, stabile Beziehungen, strukturierter Alltag, Begleiterkrankungen behandeln und eigene Motivation – auf dem Fundament von Zeit und Geduld.",
    category: "genesung",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/mFhtxtPMBkCEVPII.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qgrRYtMKOvwWmuah.pdf",
  },
  {
    id: "k6-5-ihre-rolle-genesungsprozess",
    title: "Ihre Rolle im Genesungsprozess",
    description: "Waage-Modell: Was Sie tun können (Konsistenz, realistische Hoffnung, eigene Grenzen, Fortschritte benennen, professionelle Hilfe unterstützen) vs. was nicht Ihre Aufgabe ist.",
    category: "genesung",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GhgPDkJhqlqJkYzE.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/CZdiDaadpIWNOBFb.pdf",
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // SOFORTHILFE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "notfallkarte-zuerich",
    title: "Notfallkarte Zürich – Psychische Krise",
    description: "5-Block-Ampel (ROT / ORANGE / GRÜN / LILA / GRAU): Alle wichtigen Nummern für Angehörige auf einer A4-Seite. Inkl. 145 Tox Info Suisse und PUK 24/7 altersdifferenziert. v04 · 2026-03-09",
    category: "soforthilfe",
    type: "Notfallkarte",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031008193/8YuwaCAyupr6X8wELZoKnq/notfallkarte_zuerich_v04_preview_b01d4df3.webp",
    downloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031008193/8YuwaCAyupr6X8wELZoKnq/notfallkarte_zuerich_v04_b7630148.pdf",
  },
  {
    id: "notfallplan-krise",
    title: "Notfallplan Krise – Suizidgedanken & Selbstverletzung",
    description: "4-Schritte-Anleitung für Angehörige bei Suizidgedanken oder Selbstverletzung: Ruhe bewahren, ernst nehmen, zuhören, Hilfe holen. Mit Notfallnummern und Do's & Don'ts.",
    category: "soforthilfe",
    type: "Notfallplan",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ABTIHsyOeyMuCAIZ.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tabbTidhzMGGKDDp.pdf",
  },
];

const categories = [
  { id: "alle", label: "Alle Materialien", icon: Filter },
  { id: "verstehen", label: "Verstehen", icon: BookOpen },
  { id: "unterstuetzen", label: "Unterstützen", icon: Heart },
  { id: "kommunizieren", label: "Kommunizieren", icon: MessageCircle },
  { id: "grenzen", label: "Grenzen", icon: Shield },
  { id: "selbstfuersorge", label: "Selbstfürsorge", icon: AlertTriangle },
  { id: "genesung", label: "Genesung", icon: TrendingUp },
  { id: "soforthilfe", label: "Soforthilfe", icon: AlertTriangle },
];

export default function Materialien() {
  const [activeCategory, setActiveCategory] = useState("alle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("Vorschau");
  const gridRef = useRef<HTMLElement>(null);
  
  const filteredInfografiken = activeCategory === "alle" 
    ? infografiken 
    : infografiken.filter(i => i.category === activeCategory);

  // Zähler für Statistik
  const pngCount = infografiken.length;

  return (
    <Layout>
      <SEO title="Materialien" description="Herunterladbare Materialien, Infografiken und Arbeitsblätter für Angehörige." path="/materialien" />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-sage-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                <Download className="w-6 h-6 text-sage-darker" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Materialien & Infografiken
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Alle Infografiken und Handouts zum Herunterladen, Ausdrucken und Teilen. 
              Ideal für Beratungsgespräche, Selbsthilfegruppen oder zur persönlichen Vertiefung.
            </p>
            
            {pngCount > 0 && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" />
                  {pngCount} Materialien
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Überarbeitungs-Hinweis */}
      <section className="py-8 wave-divider-top">
        <div className="container">
          <Card className="bg-sage-wash border-sage-light">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-sage-dark" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground mb-2 text-lg">
                    Alle 31 Materialien verfügbar
                  </h2>
                  <p className="text-muted-foreground">
                    Sämtliche Materialien stehen zum Herunterladen bereit – sortiert nach den Kategorien: Verstehen · Unterstützen · Kommunizieren · Grenzen · Selbstfürsorge · Genesung
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Filter – Sticky mit horizontalem Scroll auf Mobile */}
      {infografiken.length > 0 && (
        <section className="py-4 md:py-6 border-b border-border/60 sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-20 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] transition-shadow">
          <div className="container">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const count = cat.id === "alle" 
                  ? infografiken.length 
                  : infografiken.filter(i => i.category === cat.id).length;
                return (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      // Sanft zum Anfang der Karten scrollen
                      setTimeout(() => {
                        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 50);
                    }}
                    className={`whitespace-nowrap shrink-0 ${activeCategory === cat.id ? "bg-sage-dark hover:bg-sage-dark text-white" : ""}`}
                  >
                    <Icon className="w-4 h-4 mr-1.5" />
                    {cat.label}
                    <span className="ml-1.5 text-xs opacity-90">({count})</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Grid oder Platzhalter */}
      <section ref={gridRef} className="py-12 md:py-16">
        <div className="container">
          {/* Erwartungsmanagement */}
          <div className="mb-6 p-3 rounded-lg bg-sand border border-sand-subtle flex items-center gap-2">
            <Eye className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Vorschau = Web-Bild.</strong> «PDF öffnen» öffnet die A4-Druckversion im neuen Tab – Download im PDF-Viewer oben rechts.
            </p>
          </div>
          {filteredInfografiken.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInfografiken.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:border-sage-mid/30 overflow-hidden">
                    {/* Vorschaubild mit Hover-Overlay */}
                    <div 
                      className="relative aspect-[4/3] bg-muted cursor-pointer group overflow-hidden"
                      onClick={() => { setPreviewImage(item.url); setPreviewTitle(item.title); }}
                    >
                      <img 
                        src={item.url} 
                        alt={item.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading={index < 4 ? "eager" : "lazy"}
                        width={400}
                        height={300}
                        decoding={index < 4 ? "sync" : "async"}
                      />
                      {/* Hover-Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                          <ZoomIn className="w-4 h-4 text-foreground" />
                          <span className="text-sm font-medium text-foreground">Vergrössern</span>
                        </div>
                      </div>
                      {/* Typ-Badge */}
                      <div className="absolute top-2 left-2 bg-background/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-muted-foreground">
                        {item.type}
                      </div>
                    </div>
                    
                    <CardContent className="p-5">
                      <h2 className="font-semibold text-foreground mb-2 text-lg">
                        {item.title}
                      </h2>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-end">
                        <a
                          href={item.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 bg-sage-dark hover:bg-sage-dark/90 text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          PDF öffnen
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                Die neuen Infografiken werden gerade erstellt.
              </p>
              <p className="text-sm text-muted-foreground">
                In der Zwischenzeit finden Sie hilfreiche Informationen auf unseren Themenseiten:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Link href="/verstehen">
                  <Button variant="outline" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Verstehen
                  </Button>
                </Link>
                <Link href="/kommunizieren">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Kommunizieren
                  </Button>
                </Link>
                <Link href="/grenzen">
                  <Button variant="outline" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Grenzen
                  </Button>
                </Link>
                <Link href="/selbstfuersorge">
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Selbstfürsorge
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Nutzungshinweis */}
      <section className="py-12 bg-muted/30 wave-divider-top">
        <div className="container">
          <Card className="bg-sand-muted border-sand-mid">
            <CardContent className="p-6">
              <h2 className="font-semibold text-foreground mb-2 text-lg">
                Nutzungshinweis
              </h2>
              <p className="text-sm text-muted-foreground">
                Alle Materialien dürfen für private und nicht-kommerzielle Zwecke frei verwendet werden. 
                Bei Weitergabe bitte die Quelle angeben: <strong>borderline-angehoerige.manus.space</strong> – 
                erstellt von Christa Egger, Angehörigenarbeit PUK Zürich.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lightbox für Bildvorschau */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl max-h-[90vh] overflow-auto"
          >
            <img 
              src={previewImage} 
              alt={`Vorschau: ${previewTitle}`} 
              className="w-full h-auto rounded-lg shadow-2xl" width={1600} height={892} loading="lazy" decoding="async"
            />
            <p className="text-center text-white mt-4 text-sm">
              Klicken Sie irgendwo, um zu schliessen
            </p>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
