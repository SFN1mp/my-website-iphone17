"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { performanceCards } from "@/data/iphone17ProMax";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./ui/AnimatedSection";
import { GlowCard } from "./ui/GlowCard";
import { CountUp } from "./ui/CountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ChipVisual() {
  const reduced = useReducedMotion();

  const ORBIT_DATA = [
    { size: 170, duration: 6, color: "rgba(59,130,246,0.15)" },
    { size: 220, duration: 9, color: "rgba(139,92,246,0.1)" },
    { size: 270, duration: 13, color: "rgba(16,185,129,0.07)" },
  ];

  const PARTICLES = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * 360;
    const r = 85 + (i % 3) * 22;
    return {
      x: Math.cos((angle * Math.PI) / 180) * r,
      y: Math.sin((angle * Math.PI) / 180) * r,
      color: i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#8b5cf6" : "#10b981",
      delay: i * 0.18,
    };
  });

  return (
    <div className="relative flex items-center justify-center" style={{ height: 340 }}>
      {/* Pulsing glow behind chip */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 160, height: 160,
          background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(139,92,246,0.12) 50%, transparent 80%)",
          filter: "blur(20px)",
        }}
        animate={reduced ? {} : { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbit rings */}
      {ORBIT_DATA.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: o.size, height: o.size, border: `1px solid ${o.color}` }}
          animate={reduced ? {} : { scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: o.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}

      {/* Conic gradient spinning ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 160, height: 160,
          border: "1.5px solid transparent",
          backgroundImage:
            "linear-gradient(#000, #000), conic-gradient(from 0deg, #3b82f6 0%, #8b5cf6 33%, #10b981 66%, #3b82f6 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Counter-rotating inner ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 130, height: 130,
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(#000, #000), conic-gradient(from 180deg, #8b5cf6 0%, #3b82f6 50%, #8b5cf6 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          opacity: 0.5,
        }}
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Chip body */}
      <motion.div
        className="absolute rounded-[20px] flex flex-col items-center justify-center"
        style={{
          width: 110, height: 110,
          background: "linear-gradient(145deg, #1a1a2e 0%, #0d0d1a 100%)",
          boxShadow: "0 0 60px rgba(59,130,246,0.35), 0 0 120px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        whileHover={{ boxShadow: "0 0 80px rgba(59,130,246,0.55), 0 0 160px rgba(139,92,246,0.25)" }}
      >
        <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase mb-0.5">Apple</div>
        <div className="text-3xl font-black text-white tracking-tight">A19</div>
        <div
          className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1"
          style={{ background: "rgba(59,130,246,0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }}
        >
          Pro
        </div>
      </motion.div>

      {/* Data stream spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 1.5,
            height: 45,
            top: "50%",
            left: "50%",
            transformOrigin: "top center",
            transform: `rotate(${angle}deg) translateX(-50%)`,
            marginTop: 55,
          }}
          animate={
            reduced
              ? {}
              : {
                  opacity: [0.1, 0.8, 0.1],
                  scaleY: [0.3, 1, 0.3],
                  background: [
                    "linear-gradient(to bottom, rgba(59,130,246,0.8), transparent)",
                    "linear-gradient(to bottom, rgba(139,92,246,0.8), transparent)",
                    "linear-gradient(to bottom, rgba(16,185,129,0.8), transparent)",
                  ],
                }
          }
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
        />
      ))}

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: 3, height: 3, background: p.color, x: p.x, y: p.y }}
          animate={reduced ? {} : { opacity: [0, 1, 0], scale: [0, 2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: p.delay }}
        />
      ))}
    </div>
  );
}

export default function PerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const BARS = [
    { label: "CPU производительность", value: 95, color: "#3b82f6" },
    { label: "Графический процессор", value: 88, color: "#8b5cf6" },
    { label: "Neural Engine", value: 99, color: "#10b981" },
    { label: "Энергоэффективность", value: 92, color: "#f59e0b" },
  ];

  return (
    <section id="performance" className="py-32 px-6 relative overflow-hidden" ref={sectionRef}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 10% 50%, rgba(139,92,246,0.07) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left text */}
          <div>
            <AnimatedSection direction="left">
              <span className="text-violet-400/70 text-sm font-medium tracking-[0.25em] uppercase block mb-4">
                Производительность
              </span>
              <h2 className="text-section gradient-text mb-6">
                Чип, который переопределяет возможное
              </h2>
              <p className="text-white/50 text-xl leading-relaxed mb-10">
                A19 Pro: <CountUp end={35} suffix=" трлн" className="text-white font-bold" /> операций в секунду для нейронных задач. Console-уровень графики без перегрева.
              </p>
            </AnimatedSection>

            {/* Animated bars */}
            <div className="space-y-5">
              {BARS.map((bar, i) => (
                <motion.div
                  key={bar.label}
                  initial={reduced ? {} : { opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">{bar.label}</span>
                    <span className="text-white/40 font-mono">
                      <CountUp end={bar.value} suffix="%" />
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <motion.div
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ background: `linear-gradient(90deg, ${bar.color}, ${bar.color}80)` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${bar.value}%` } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Shimmer on bar */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                        }}
                        animate={reduced ? {} : { x: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 + i * 0.3, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chip visual */}
          <AnimatedSection direction="scale" delay={0.2}>
            <ChipVisual />
          </AnimatedSection>
        </div>

        {/* Performance cards */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {performanceCards.map((card) => (
            <StaggerItem key={card.title}>
              <GlowCard
                glowColor={`${card.color}25`}
                tiltAmount={8}
                className="glass rounded-3xl p-7 group relative overflow-hidden h-full"
              >
                {/* Gradient corner */}
                <div
                  className="absolute top-0 right-0 w-28 h-28 pointer-events-none rounded-tr-3xl opacity-25"
                  style={{ background: `radial-gradient(circle at 100% 0%, ${card.color}, transparent)` }}
                />

                {/* Hover bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${card.color}10 0%, transparent 70%)` }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="text-3xl mb-4 inline-block"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {card.icon}
                  </motion.div>
                  <div className="text-sm font-bold mb-2" style={{ color: card.color }}>
                    {card.title}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
