import { useEffect, useMemo, useRef, useState } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import MaterialCard from "@/sections/materialien/MaterialCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Eye,
  Filter,
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "wouter";
import { materials, quickStarts } from "@/content/materials";
import MaterialienHeroSection from "@/sections/materialien/MaterialienHeroSection";
