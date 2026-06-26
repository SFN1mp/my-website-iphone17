"use client";

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

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <LoadingScreen />
      <Navigation />
      <HeroSection />
      <div className="section-divider" />
      <HowItWorksSection />
      <div className="section-divider" />
      <CameraSection />
      <div className="section-divider" />
      <PerformanceSection />
      <div className="section-divider" />
      <DisplaySection />
      <div className="section-divider" />
      <BatterySection />
      <div className="section-divider" />
      <SpecsSection />
      <div className="section-divider" />
      <PriceSection />
      <div className="section-divider" />
      <WhyProMaxSection />
      <div className="section-divider" />
      <FinalCTA />
      <Footer />
    </main>
  );
}
