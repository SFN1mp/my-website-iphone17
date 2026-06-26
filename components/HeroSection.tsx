"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { heroData } from "@/data/iphone17ProMax";
import PhoneModel from "./PhoneModel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Floating glow blob
function GlowBlob({
  x, y, size, color, delay,
}: {
  x: string; y: string; size: number; color: string; delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)",
        translateX: "-50%", translateY: "-50%",
      }}
      animate={{
        scale: [1, 1.3, 0.9, 1.2, 1],
        opacity: [0.4, 0.8, 0.5, 0.9, 0.4],
        x: [0, 30, -20, 15, 0],
        y: [0, -20, 30, -10, 0],
      }}
      transition={{ duration: 12 + delay * 3, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// Animated light streak
function LightStreak({ angle, delay, color }: { angle: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: "60vw",
        height: 1,
        top: "50%",
        left: "50%",
        transformOrigin: "left center",
        rotate: angle,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0,
      }}
      animate={{ opacity: [0, 0.4, 0], scaleX: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

// Floating particle
function Particle({ x, y, color }: { x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: 2, height: 2, background: color }}
      animate={{ y: [0, -40, 0], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        delay: Math.random() * 5,
        ease: "easeInOut",
      }}
    />
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring transforms
  const rawPhoneScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.25]);
  const rawPhoneRotateY = useTransform(scrollYProgress, [0, 0.8], [0, 25]);
  const rawPhoneRotateX = useTransform(scrollYProgress, [0, 0.8], [0, -8]);
  const rawPhoneY = useTransform(scrollYProgress, [0, 0.8], [0, -80]);
  const rawPhoneZ = useTransform(scrollYProgress, [0, 0.8], [0, 60]);
  const phoneGlow = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  const phoneScale = useSpring(rawPhoneScale, { stiffness: 80, damping: 20 });
  const phoneRotateY = useSpring(rawPhoneRotateY, { stiffness: 60, damping: 18 });
  const phoneRotateX = useSpring(rawPhoneRotateX, { stiffness: 60, damping: 18 });
  const phoneY = useSpring(rawPhoneY, { stiffness: 80, damping: 20 });

  // Parallax layers at different depths
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -50]);
  const textScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);

  const scrollToFeatures = () =>
    document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
  const scrollToSpecs = () =>
    document.querySelector("#specs")?.scrollIntoView({ behavior: "smooth" });

  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: `${5 + ((i * 17) % 90)}%`,
    y: `${10 + ((i * 23) % 80)}%`,
    color: i % 3 === 0 ? "rgba(59,130,246,0.7)" : i % 3 === 1 ? "rgba(139,92,246,0.7)" : "rgba(16,185,129,0.5)",
  }));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Главная секция"
      style={{ perspective: "1000px" }}
    >
      {/* ── Parallax background layers ── */}
      <motion.div
        className="absolute inset-0 animated-gradient"
        style={{ y: bgY }}
      />

      {/* Deep background grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: orb3Y, opacity: 0.3 }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Glow blobs — parallax at different depths */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: orb1Y }}>
        <GlowBlob x="55%" y="35%" size={700} color="rgba(59,130,246,0.12)" delay={0} />
      </motion.div>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: orb2Y }}>
        <GlowBlob x="20%" y="70%" size={500} color="rgba(139,92,246,0.1)" delay={1.5} />
        <GlowBlob x="80%" y="25%" size={400} color="rgba(16,185,129,0.07)" delay={3} />
      </motion.div>

      {/* Light streaks */}
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <LightStreak angle={-25} delay={0} color="rgba(59,130,246,0.3)" />
          <LightStreak angle={15} delay={2} color="rgba(139,92,246,0.25)" />
          <LightStreak angle={-45} delay={4} color="rgba(16,185,129,0.2)" />
          <LightStreak angle={30} delay={6} color="rgba(59,130,246,0.2)" />
        </div>
      )}

      {/* Floating particles */}
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p, i) => (
            <Particle key={i} x={p.x} y={p.y} color={p.color} />
          ))}
        </div>
      )}

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 pt-20">

        {/* Text block */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          style={
            reduced ? {} : { opacity: textOpacity, y: textY, scale: textScale }
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-block text-blue-400/80 text-sm font-medium tracking-[0.25em] uppercase mb-5 px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              Только что появился
            </span>
          </motion.div>

          <motion.h1
            className="text-hero gradient-text mb-6"
            initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroData.title}
          </motion.h1>

          <motion.p
            className="text-subsection text-white/60 mb-4 max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroData.subtitle}
          </motion.p>

          <motion.p
            className="text-white/40 text-lg mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroData.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              onClick={scrollToFeatures}
              className="relative overflow-hidden px-8 py-4 rounded-full text-white font-medium text-base"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                boxShadow: "0 0 30px rgba(59,130,246,0.35)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 50px rgba(59,130,246,0.6), 0 0 100px rgba(139,92,246,0.3)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Shimmer overlay */}
              <motion.span
                className="absolute inset-0 opacity-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
                }}
                whileHover={{ opacity: 1, x: ["-100%", "200%"] }}
                transition={{ duration: 0.5 }}
              />
              {heroData.ctaPrimary}
            </motion.button>

            <motion.button
              onClick={scrollToSpecs}
              className="px-8 py-4 rounded-full font-medium text-base text-white/80 hover:text-white transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
              }}
              whileHover={{
                scale: 1.04,
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.25)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              {heroData.ctaSecondary}
            </motion.button>
          </motion.div>

          {/* Animated spec pills */}
          <motion.div
            className="flex flex-wrap gap-3 mt-12 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {[
              { label: "Чип", value: "A19 Pro", color: "#3b82f6" },
              { label: "Камеры", value: "3 × 48МП", color: "#10b981" },
              { label: "Дисплей", value: '6,9"', color: "#8b5cf6" },
              { label: "Батарея", value: "39 ч", color: "#f59e0b" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: `${item.color}10`,
                  border: `1px solid ${item.color}25`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.06, background: `${item.color}18` }}
              >
                <span className="text-base font-bold" style={{ color: item.color }}>
                  {item.value}
                </span>
                <span className="text-white/30 text-xs">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Phone — scroll-driven 3D transform ── */}
        <motion.div
          className="flex-1 flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.75, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={
            reduced
              ? {}
              : {
                  scale: phoneScale,
                  rotateY: phoneRotateY,
                  rotateX: phoneRotateX,
                  y: phoneY,
                  transformStyle: "preserve-3d",
                }
          }
        >
          {/* Dynamic glow that intensifies on scroll */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 320, height: 320,
              background:
                "radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)",
              filter: "blur(40px)",
              opacity: phoneGlow,
            }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Second glow layer */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 400, height: 200,
              bottom: -40,
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <PhoneModel animate={!reduced} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={reduced ? {} : { opacity: textOpacity }}
      >
        <span className="text-white/25 text-[10px] tracking-[0.35em] uppercase">Листайте вниз</span>
        <div className="relative w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-white/40"
            animate={{ y: [0, 12, 0], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
