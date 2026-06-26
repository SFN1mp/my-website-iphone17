"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { heroData } from "@/data/iphone17ProMax";
import PhoneModel from "./PhoneModel";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const phoneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const phoneRotateY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);

  const scrollToFeatures = () => {
    document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSpecs = () => {
    document.querySelector("#specs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Главная секция"
    >
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Background glow orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "20%",
          left: "50%",
          x: "-50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          bottom: "10%",
          right: "10%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 pt-20">

        {/* Text */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-blue-400/80 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Только что появился
            </span>
          </motion.div>

          <motion.h1
            className="text-hero gradient-text mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroData.title}
          </motion.h1>

          <motion.p
            className="text-subsection text-white/60 mb-4 max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroData.subtitle}
          </motion.p>

          <motion.p
            className="text-white/40 text-lg mb-10 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroData.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              onClick={scrollToFeatures}
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-base transition-all duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              {heroData.ctaPrimary}
            </motion.button>
            <motion.button
              onClick={scrollToSpecs}
              className="px-8 py-4 rounded-full glass border border-white/10 text-white font-medium text-base hover:bg-white/08 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {heroData.ctaSecondary}
            </motion.button>
          </motion.div>

          {/* Key specs preview */}
          <motion.div
            className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {[
              { label: "Чип", value: "A19 Pro" },
              { label: "Камеры", value: "3 × 48 МП" },
              { label: "Дисплей", value: '6,9"' },
              { label: "Автономность", value: "39 ч" },
            ].map((item) => (
              <div key={item.label} className="text-center lg:text-left">
                <div className="text-xl font-semibold text-white">{item.value}</div>
                <div className="text-white/40 text-xs mt-0.5">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Phone model */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ scale: phoneScale, rotateY: phoneRotateY, y: phoneY }}
        >
          <PhoneModel animate={true} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: textOpacity }}
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Листайте</span>
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
