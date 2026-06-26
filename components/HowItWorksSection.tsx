"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { howItWorksData } from "@/data/iphone17ProMax";

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
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-3xl p-8 relative overflow-hidden group"
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors[item.id]}15 0%, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors[item.id]}60, transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="text-4xl mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
        >
          {icons[item.id]}
        </motion.div>

        {/* Stat badge */}
        <div
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold mb-4"
          style={{
            background: colors[item.id] + "20",
            color: colors[item.id],
            border: `1px solid ${colors[item.id]}30`,
          }}
        >
          {item.detail}
        </div>

        <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
        <p className="text-white/40 text-sm mb-3">{item.subtitle}</p>
        <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
      </div>

      {/* Animated bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-3xl"
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : {}}
        transition={{ duration: 1, delay: index * 0.1 + 0.4, ease: "easeOut" }}
        style={{ background: `linear-gradient(90deg, ${colors[item.id]}, transparent)` }}
      />
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-blue-400/70 text-sm font-medium tracking-[0.2em] uppercase block mb-4">
            Как это работает
          </span>
          <h2 className="text-section gradient-text mb-6">
            Инженерия без компромиссов
          </h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Каждый компонент создан с единственной целью — дать вам самый совершенный опыт.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howItWorksData.map((item, i) => (
            <FeatureCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
