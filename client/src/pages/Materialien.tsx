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
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/zUJsXECPDUPuIxKP.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/CCbAzKmVsoRDnJWi.pdf",
  },
  {
    id: "1-2-eisberg",
    title: "Der Eisberg – Wut ist oft die Spitze",
    description: "Stock-&-Flow-Diagramm: Was Sie sehen (Wut) ist oft nur die Spitze – darunter liegen Schmerz, Angst, Scham.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ZwsWnqLofvcvpMaZ.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MmowkXEvMBxLRKtw.pdf",
  },
  {
    id: "1-3-spaltung",
    title: "Spaltung – das Pendel zwischen Extremen",
    description: "Zustandsdiagramm: Unter Stress kippt die Bewertung leicht ins Extreme – die Grauzone wird schwer erreichbar.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BwqZmzcxPLdpGBOL.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qgYallUbPGueIXcU.pdf",
  },
  {
    id: "1-4-alarm-denk-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description: "Zustandsdiagramm: Im Alarm-Modus ist Logik oft nicht erreichbar – erst beruhigen, dann klären.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/UwkFCuhnGKuGlfxd.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/zPdmrwRLcRWKxynE.pdf",
  },
  {
    id: "1-5-vier-phasen-zyklus",
    title: "Der 4-Phasen-Zyklus – das vorhersehbare Muster",
    description: "Kausal-Loop: Krisen wirken chaotisch – folgen aber oft einem wiederkehrenden Ablauf.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BVJkEshGOYQYPKXY.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/kOMGyISvDZXihWxO.pdf",
  },
  {
    id: "1-6-gehirn-verstehen",
    title: "Das Gehirn verstehen – Neurobiologie einfach erklärt",
    description: "Sequenzdiagramm: Bei starkem Stress dominiert Alarm – erst danach wird klares Denken wieder möglich.",
    category: "verstehen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/lrvRCgtlqzJxXloX.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/HfyQjNxvthksLpbU.pdf",
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 2: KOMMUNIZIEREN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "2-1-drei-schritte",
    title: "Wenn Gespräche kippen: 3 Schritte, die helfen",
    description: "Timeline mit Reset-Loop: In Hochstress hilft ein Standardablauf – beruhigen, verbinden, begrenzen + Plan.",
    category: "kommunizieren",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/iozawzMBMWEAosrn.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/gGsRoFAZIZBfLwmf.pdf",
  },
  {
    id: "2-2-standardsatz",
    title: "Der Standardsatz: 2 Sätze, die deeskalieren",
    description: "Copy-ready Sätze zum Ablesen: Erst Gefühl anerkennen, dann Grenze + Plan – ohne Diskussion.",
    category: "kommunizieren",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qDElFLTOpRzEEAOz.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/kRytgldypavAUJDr.pdf",
  },
  {
    id: "2-3-grenzen-setzen",
    title: "Grenzen setzen, ohne zu eskalieren",
    description: "3-Kacheln-Formel: Fakt + Ich-Grenze + nächster Schritt – kurz und klar.",
    category: "kommunizieren",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/jhoTZqSrvikwyDRw.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/eLoMJrpVlKhOueFR.pdf",
  },
  {
    id: "2-4-pause-exit",
    title: "Pause statt Streit: so beenden Sie ein Gespräch sicher",
    description: "Ampel-Zustandsdiagramm: Wenn Respekt nicht möglich ist, ist eine Pause die beste Deeskalation.",
    category: "kommunizieren",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NgZFpDxatDgLaEQK.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/kPmrXWJQbTNpJbSA.pdf",
  },
  {
    id: "2-5-zuhoeren-ohne-zustimmen",
    title: "Zuhören ohne Zustimmen – so geht das konkret",
    description: "2-Spalten mit Brücke: Sie können Gefühle anerkennen, ohne Verhalten gutzuheissen.",
    category: "kommunizieren",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/awvjvWAYWJkviuMK.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/eMYmpdECocTQbVet.pdf",
  },
  {
    id: "2-6-beispiel-dialog",
    title: "Beispiel-Dialog: kurz bleiben, ruhig bleiben",
    description: "Chat-Sequenzdiagramm: Kurz + ruhig + wiederholbar wirkt in Krisen stärker als Argumente.",
    category: "kommunizieren",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NCdekDCZFVeQSMtM.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/meEvvJarNxmPJExY.pdf",
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // SPICKZETTEL (A4, laminierbar)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "spickzettel-krisenkommunikation",
    title: "Spickzettel Krisenkommunikation (A4)",
    description: "Laminierbarer 1-Seiter mit allen Standardsätzen für die Krise – zum Ablesen in akuten Situationen.",
    category: "kommunizieren",
    type: "Spickzettel",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/jSGtEkuvzMQpgWWa.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KvmohTCDARNXkHIY.pdf",
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 3: UNTERSTÜTZEN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "k3-1-krisenmodus",
    title: "Im Krisenmodus – Orientierung geben",
    description: "Zustandsdiagramm: Wie ein verlorenes Kind braucht Ihr Gegenüber in der Krise Ruhe und Orientierung – nicht Argumente.",
    category: "unterstuetzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/gOumJSiPiJFGkSFy.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FOZYnweFmVcMXYyr.pdf",
  },
  {
    id: "k3-2-rolle-klaeren",
    title: "Ihre Rolle klären – Was Sie sein können (und was nicht)",
    description: "2-Spalten-Vergleich: Sie sind Angehörige/r – nicht Therapeut/in. Diese Klarheit entlastet beide Seiten.",
    category: "unterstuetzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/mTlmmrXfScSCxoiC.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/LEKuHRVBIRdTClYJ.pdf",
  },
  {
    id: "k3-3-drei-saeulen",
    title: "Drei Säulen hilfreicher Unterstützung",
    description: "3-Kacheln: Präsenz zeigen, Gefühle validieren, Stabilität bieten – das Fundament guter Begleitung.",
    category: "unterstuetzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/TaDXhEgHiyBeiQsT.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/bWugGxMdeykNGBUW.pdf",
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
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/UYzFtDygMzdBJaVD.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GaQLbgKUokbWwUUi.pdf",
  },
  {
    id: "k3-6-achtsamkeit",
    title: "Beziehungs-Achtsamkeit – 4 Schritte im Alltag",
    description: "Timeline: Innehalten → Wahrnehmen → Nicht bewerten → Bewusst handeln – weniger Autopilot, mehr Klarheit.",
    category: "unterstuetzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xwVvAHgRQPALOgcm.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/umhOiOvEhETLRqtq.pdf",
  },
  {
    id: "k3-7-alltags-tipps",
    title: "Was Sie konkret tun können – 4 Alltags-Tipps",
    description: "4-Kacheln-Checkliste: Übungspartner sein, Fortschritte anerkennen, Vorhersehbar sein, Gemeinsam Probleme lösen.",
    category: "unterstuetzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/rnwlrkNLwFQsLjnU.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/IokELYIzmFREYEyL.pdf",
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
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/sHAAizMXNqAZSlEn.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/paQhPvSEeVFldFly.pdf",
  },
  {
    id: "k4-2-spiegeln-aufsaugen",
    title: "Spiegeln statt Aufsaugen – Mitfühlen ohne Übernehmen",
    description: "Split-Screen-Vergleich: Schwamm vs. Spiegel. Sie können Gefühle anerkennen, ohne sie zu Ihren eigenen zu machen.",
    category: "grenzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/dbTRALbBXTpWdIFc.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/vonZwVksXmKubcoV.pdf",
  },
  {
    id: "k4-3-vier-arten-grenzen",
    title: "Die 4 Arten von Grenzen – Wissen, was Sie schützen",
    description: "4-Quadranten: Physische, emotionale, zeitliche und materielle Grenzen – mit konkreten Beispielsätzen.",
    category: "grenzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DRIOXYdXxPGeVnra.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/HYXOHsOYKkirFsAw.pdf",
  },
  {
    id: "k4-4-grenzen-erkennen",
    title: "Grenzen erkennen – 5 Warnsignale Ihres Körpers",
    description: "Körper-Silhouette mit 5 Signalen: Bauch, Brust, Nacken, Erschöpfung, Fluchtimpuls. Lernen Sie, auf Ihren Körper zu hören.",
    category: "grenzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ygTqOQYNTBmkEaim.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/SRxYofCvmJLaNrJq.pdf",
  },
  {
    id: "k4-5-warum-grenzen-helfen",
    title: "Warum Grenzen bei Borderline sowohl Angehörigen als auch der betroffenen Person helfen",
    description: "5-Säulen-Modell: Identität, Struktur, Sicherheit, Intimität, Vorbild – Grenzen sind kein Liebesentzug.",
    category: "grenzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/skjcpJqOmcldYXbm.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OqhEzMeLpTbBtWJK.pdf",
  },
  {
    id: "k4-6-lmk-exit-strategie",
    title: "L.M.K. (Lebe Mit Konsequenzen) – Wenn Grenzen nicht respektiert werden",
    description: "Entscheidungsbaum mit Anwendungskontext: Grenze → Reaktion → Konsequenz. Keine Strafe – sondern Selbstschutz.",
    category: "grenzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/aAHNYbmetQXpdBOS.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xPwKbMxFXGMwUeIx.pdf",
  },
  {
    id: "k4-7-grenzen-kommunizieren",
    title: "Grenzen kommunizieren – Beispielsätze für den Alltag",
    description: "4 Situationen mit fertigen Sätzen: Bei Beschimpfungen, Schuldzuweisungen, Forderungen, Drohungen.",
    category: "grenzen",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/dfwRqrujZwwwPRJo.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WCKlwBXhspmnwAsS.pdf",
  },
  {
    id: "k4-8-spickzettel-grenzen",
    title: "Spickzettel Grenzen – Die wichtigsten Sätze",
    description: "A4-Spickzettel zum Laminieren: DEAR-Technik, L.M.K.-Formel, Spiegeln statt Aufsaugen – alle wichtigen Sätze auf einen Blick.",
    category: "grenzen",
    type: "Spickzettel",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tahWXflXNFEcSrog.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/fpiWoEEuimfWEknU.pdf",
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
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tpAIcOfgaoOyBsXq.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MsnEWTYKhKjWlcWT.pdf",
  },
  {
    id: "k5-2-sauerstoffmaske",
    title: "Die Sauerstoffmaske – Warum Selbstfürsorge keine Selbstsucht ist",
    description: "Kreislauf-Diagramm: Teufelskreis ohne Selbstfürsorge vs. positiver Kreislauf mit Selbstfürsorge – setzen Sie zuerst Ihre eigene Maske auf.",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/SRRUMsKJubrsepfQ.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PBsmQYlZQEoWHNQn.pdf",
  },
  {
    id: "k5-3-radikale-akzeptanz",
    title: "Radikale Akzeptanz – Aufhören zu kämpfen, anfangen zu handeln",
    description: "2-Spalten-Vergleich: Was Radikale Akzeptanz NICHT ist vs. was sie IST, plus 4-Schritte-Übung zum sofortigen Anwenden.",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qJdMwWgUcXMyAvka.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BqXdCJCcYGtIAWvl.pdf",
  },
  {
    id: "k5-4-stopp-technik",
    title: "Die STOPP-Technik – 5 Schritte aus der Stressspirale",
    description: "Stufen-Modell: Stopp, Tief atmen, Orientieren, Perspektive, Plan – in 30 Sekunden anwendbar bei akuter Belastung.",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BnWHSnpWkkqoKOIi.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GaLovONlhqYHGIlm.pdf",
  },
  {
    id: "k5-5-energie-konto",
    title: "Ihr Energie-Konto – Was füllt, was leert",
    description: "Stock-&-Flow-Diagramm: Welche Aktivitäten füllen Ihre Batterie auf, welche leeren sie? Achten Sie auf die Balance, bevor Burnout droht.",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tLphIwdMNjFIjltr.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DJTAFcqMvbRpGaBP.pdf",
  },
  {
    id: "k5-6-erlaubnis-karte",
    title: "Erlaubnis-Karte – Was Sie sich erlauben dürfen",
    description: "Checkliste: 9 Erlaubnisse, die sich Angehörige oft nicht geben – gültig ab sofort, unbefristet, ausgestellt von Ihnen selbst.",
    category: "selbstfuersorge",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YuJEhBgjQWuztswb.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ttTtLWeYiUiQaBnR.pdf",
  },
  // === K6 GENESUNG ===
  {
    id: "k6-1-genesung-in-zahlen",
    title: "Genesung in Zahlen – Was die Forschung zeigt",
    description: "Orientierungs-Tracker: 85–93 % erreichen symptomatische Remission, 50 % vollständige Genesung – belegt durch Langzeitstudien (Zanarini et al.).",
    category: "genesung",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ItokRaWotdNKpoEx.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/HxKACGuyOnlrGyHX.pdf",
  },
  {
    id: "k6-2-fortschritt-paradox",
    title: "Das Fortschritt-Paradox – Warum Rückfälle zum Weg gehören",
    description: "Aufwärts-Spirale: Genesung verläuft nicht linear. Rückfälle bedeuten nicht Scheitern – sie sind Teil des Weges nach oben.",
    category: "genesung",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xjUbWjBdgOfAOBSO.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/EajEIAEeOKqxFrTB.pdf",
  },
  {
    id: "k6-3-remission-vs-heilung",
    title: "Remission vs. Heilung – Was Besserung wirklich bedeutet",
    description: "2-Spalten-Vergleich: Was Remission NICHT bedeutet vs. was sie tatsächlich bedeutet – realistische Erwartungen statt Perfektionsanspruch.",
    category: "genesung",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tbZXsVZHQhEaDQKT.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/vAIgOqKhoorEdMbu.pdf",
  },
  {
    id: "k6-4-fuenf-faktoren-genesung",
    title: "5 Faktoren, die Genesung fördern",
    description: "Säulen-Modell: Spezialisierte Therapie, stabile Beziehungen, strukturierter Alltag, Begleiterkrankungen behandeln und eigene Motivation – auf dem Fundament von Zeit und Geduld.",
    category: "genesung",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VIpkSYqaeNUrJASc.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/zwrhfhOYAmpNBsHP.pdf",
  },
  {
    id: "k6-5-ihre-rolle-genesungsprozess",
    title: "Ihre Rolle im Genesungsprozess",
    description: "Waage-Modell: Was Sie tun können (Konsistenz, realistische Hoffnung, eigene Grenzen, Fortschritte benennen, professionelle Hilfe unterstützen) vs. was nicht Ihre Aufgabe ist.",
    category: "genesung",
    type: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/nFoVeLJURBcMhQBT.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/JviFfFHCaSIpsKDF.pdf",
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // NOTFALLKARTE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "notfallkarte-zuerich",
    title: "Notfallkarte Zürich – Psychische Krise",
    description: "Ampel-Logik (ROT / GELB / GRÜN) mit Schnell-Entscheid: Alle wichtigen Nummern für Angehörige auf einer A4-Seite.",
    category: "soforthilfe",
    type: "Notfallkarte",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/mSoGIXZAiMAbFAFL.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FTdjCPHRXUSxwbVS.pdf",
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
                    Alle 40 Materialien verfügbar
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
                      onClick={() => setPreviewImage(item.url)}
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
                Bei Weitergabe bitte die Quelle angeben: <strong>eiertanz.manus.space</strong> – 
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
              alt="Vorschau" 
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
