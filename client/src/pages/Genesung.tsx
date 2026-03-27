import { useRef, useState } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Filter,
  HandHeart,
  Heart,
  Image as ImageIcon,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import ContentSection from "@/components/ContentSection";
import { TableOfContents } from "@/components/UXEnhancements";
import { genesungItems as genesungMaterialItems } from "@/content/genesung";
