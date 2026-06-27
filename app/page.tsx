"use client";

import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CameraSection from "@/components/CameraSection";
import PerformanceSection from "@/components/PerformanceSection";
import DisplaySection from "@/components/DisplaySection";
import BatterySection from "@/components/BatterySection";
import SpecsSection from "@/components/SpecsSection";
import PriceSection from "@/components/PriceSection";
import WhyProMaxSection from "@/components/WhyProMaxSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

function SectionDivider() {
  return (
    <div className="relative py-1 overflow-hidden">
      <motion.div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(59,130,246,0.15) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <LoadingScreen />
      <Navigation />
      <HeroSection />
      <SectionDivider />
      <HowItWorksSection />
      <SectionDivider />
      <CameraSection />
      <SectionDivider />
      <PerformanceSection />
      <SectionDivider />
      <DisplaySection />
      <SectionDivider />
      <BatterySection />
      <SectionDivider />
      <SpecsSection />
      <SectionDivider />
      <PriceSection />
      <SectionDivider />
      <WhyProMaxSection />
      <SectionDivider />
      <FinalCTA />
      <Footer />
    </main>
  );
}
