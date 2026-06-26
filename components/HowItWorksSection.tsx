"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { howItWorksData } from "@/data/iphone17ProMax";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./ui/AnimatedSection";
import { GlowBorderCard } from "./ui/GlowCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const icons: Record<string, string> = {
  chip: "⚡",
  cooling: "🌡️",
  camera: "📸",
  display: "🖥️",
  battery: "🔋",
  ios: "✨",
};

const colors: Record<string, string> = {
  chip: "#3b82f6",
  cooling: "#f59e0b",
  camera: "#10b981",
  display: "#8b5cf6",
  battery: "#ec4899",
  ios: "#06b6d4",
};

function FeatureCard({ item, index }: { item: (typeof howItWorksData)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const color = colors[item.id];

  return (
    <motion.div
      ref={ref}
      initial={reduced ? {} : { opacity: 0, y: 60, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlowBorderCard
        color={color}
        className="glass rounded-3xl p-8 relative overflow-hidden group h-full"
      >
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}12 0%, transparent 65%)`,
          }}
        />

        {/* Animated top accent */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
          }}
        />

        <div className="relative z-10">
          {/* Animated icon */}
          <motion.div
            className="text-4xl mb-5 inline-block"
            animate={reduced ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {icons[item.id]}
          </motion.div>

          {/* Stat badge */}
          <motion.div
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold mb-4"
            style={{ background: color + "18", color, border: `1px solid ${color}30` }}
            whileHover={{ scale: 1.05, background: color + "28" }}
          >
            {item.detail}
          </motion.div>

          <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
          <p className="text-white/35 text-sm mb-3 font-medium uppercase tracking-wider">{item.subtitle}</p>
          <p className="text-white/55 text-sm leading-relaxed">{item.description}</p>
        </div>

        {/* Bottom progress bar reveal */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] rounded-b-3xl"
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ duration: 1.4, delay: index * 0.1 + 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}40, transparent)` }}
        />

        {/* Corner number */}
        <div
          className="absolute top-6 right-6 text-5xl font-black opacity-[0.04]"
          style={{ color }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </GlowBorderCard>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="how-it-works" className="py-32 px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title — clip-path reveal */}
        <AnimatedSection direction="clip" className="text-center mb-20">
          <span className="text-blue-400/70 text-sm font-medium tracking-[0.25em] uppercase block mb-5 inline-flex items-center gap-2">
            <motion.span
              className="inline-block w-6 h-[1px] bg-blue-400/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            Как это работает
            <motion.span
              className="inline-block w-6 h-[1px] bg-blue-400/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </span>
          <h2 className="text-section gradient-text mb-6">Инженерия без компромиссов</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Каждый компонент создан с единственной целью — дать вам самый совершенный опыт.
          </p>
        </AnimatedSection>

        {/* Cards — stagger grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howItWorksData.map((item, i) => (
            <FeatureCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
