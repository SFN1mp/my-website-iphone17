"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { whyProMaxCards } from "@/data/iphone17ProMax";
import { AnimatedSection } from "./ui/AnimatedSection";
import { CountUp } from "./ui/CountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const cardColors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"];
const cardCounters = [
  { end: 69, suffix: '″', label: "OLED дисплей" },
  { end: 39, suffix: " ч", label: "воспроизведение видео" },
  { end: 8, suffix: "×", label: "оптический зум" },
  { end: 19, suffix: " Pro", label: "чип поколения" },
];

function TiltCard({ card, index, inView }: { card: typeof whyProMaxCards[0]; index: number; inView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const color = cardColors[index];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 250, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springCfg);
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      className="relative cursor-default"
      initial={reduced ? {} : { opacity: 0, y: 70, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ delay: index * 0.13, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "900px" }}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="glass rounded-3xl p-8 relative overflow-hidden h-full group"
        style={
          reduced
            ? { border: `1px solid ${color}18` }
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                border: `1px solid ${color}18`,
              }
        }
        whileHover={{
          boxShadow: `0 30px 80px ${color}22, 0 0 0 1px ${color}25`,
          transition: { duration: 0.3 },
        }}
      >
        {/* Mouse-tracking glow */}
        {!reduced && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${color}15 0%, transparent 55%)`,
            }}
          />
        )}

        {/* Static bg glow */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-30"
          style={{ background: `radial-gradient(circle at 25% 25%, ${color}10 0%, transparent 60%)` }}
        />

        {/* 3D lift for content */}
        <div style={reduced ? {} : { transform: "translateZ(25px)" }} className="relative z-10">
          <motion.div
            className="text-5xl mb-5 inline-block"
            whileHover={{ scale: 1.2, rotate: [-5, 5, 0], transition: { duration: 0.4 } }}
          >
            {card.icon}
          </motion.div>

          {/* Animated counter stat */}
          <div className="mb-1">
            <span
              className="text-5xl font-black"
              style={{
                background: `linear-gradient(135deg, ${color}, white)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <CountUp
                end={cardCounters[index].end}
                suffix={cardCounters[index].suffix}
                duration={2000}
              />
            </span>
          </div>
          <div className="text-white/25 text-xs mb-5 uppercase tracking-wider">
            {cardCounters[index].label}
          </div>

          <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
          <p className="text-white/45 text-sm leading-relaxed">{card.description}</p>
        </div>

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-28 h-28 pointer-events-none rounded-tr-3xl opacity-20"
          style={{ background: `radial-gradient(circle at 100% 0%, ${color}, transparent)` }}
        />

        {/* Bottom accent bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] rounded-b-3xl"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.13, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: `linear-gradient(90deg, ${color}60, transparent)` }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function WhyProMaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-pro-max" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection direction="clip" className="text-center mb-16">
          <span className="text-blue-400/70 text-sm font-medium tracking-[0.25em] uppercase block mb-4">
            Почему Pro Max
          </span>
          <h2 className="text-section gradient-text mb-6">Максимум во всём</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Pro Max — это не просто большой размер. Это другой уровень во всех измерениях.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyProMaxCards.map((card, i) => (
            <TiltCard key={card.title} card={card} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
