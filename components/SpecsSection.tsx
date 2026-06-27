"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { specsData } from "@/data/iphone17ProMax";
import { AnimatedSection } from "./ui/AnimatedSection";
import { CountUp } from "./ui/CountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const categories = [
  { key: "display", label: "Дисплей", icon: "📺" },
  { key: "chip", label: "Чип", icon: "⚡" },
  { key: "cameras", label: "Камеры", icon: "📸" },
  { key: "materials", label: "Корпус", icon: "🔩" },
  { key: "connectivity", label: "Связь", icon: "📡" },
  { key: "battery", label: "Батарея", icon: "🔋" },
  { key: "storage", label: "Память", icon: "💾" },
  { key: "dimensions", label: "Размеры", icon: "📐" },
  { key: "colors", label: "Цвета", icon: "🎨" },
  { key: "os", label: "ОС", icon: "🍎" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

const keyStats = [
  { label: "Диагональ", value: 69, suffix: '″', display: '6,9"', color: "#3b82f6" },
  { label: "Камеры", value: 48, suffix: "МП", display: "48 МП", color: "#10b981" },
  { label: "Автономность", value: 39, suffix: " ч", display: "39 ч", color: "#f59e0b" },
  { label: "Зум", value: 8, suffix: "×", display: "8×", color: "#8b5cf6" },
  { label: "Нит", value: 2000, suffix: "", display: "2000", color: "#ec4899" },
];

export default function SpecsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<CategoryKey>("display");
  const reduced = useReducedMotion();

  const activeData = specsData[active];

  return (
    <section id="specs" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection direction="clip" className="text-center mb-16">
          <span className="text-blue-400/70 text-sm font-medium tracking-[0.25em] uppercase block mb-4">
            Характеристики
          </span>
          <h2 className="text-section gradient-text">Всё о iPhone 17 Pro Max</h2>
        </AnimatedSection>

        {/* Animated key stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
          {keyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-5 text-center group relative overflow-hidden"
              initial={reduced ? {} : { opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                scale: 1.06,
                boxShadow: `0 0 30px ${stat.color}25`,
                border: `1px solid ${stat.color}30`,
              }}
            >
              {/* Hover bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}10 0%, transparent 70%)` }}
              />

              <div className="relative z-10">
                <div className="text-2xl font-black text-white" style={{ color: stat.color }}>
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/30 text-xs mt-1">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium overflow-hidden transition-colors duration-200"
              style={{
                color: active === cat.key ? "white" : "rgba(255,255,255,0.45)",
                border: active === cat.key ? "1px solid rgba(59,130,246,0.45)" : "1px solid rgba(255,255,255,0.06)",
                background: "transparent",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {active === cat.key && (
                <motion.div
                  layoutId="specs-tab-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat.icon}</span>
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Specs table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="px-6 py-5 border-b border-white/05 flex items-center gap-3">
              <span className="text-xl">
                {categories.find((c) => c.key === active)?.icon}
              </span>
              <h3 className="text-lg font-semibold text-white">{activeData.title}</h3>
            </div>

            <div className="divide-y divide-white/04">
              {activeData.items.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center justify-between px-6 py-4 hover:bg-white/02 transition-colors duration-200"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
                  <span className="text-white/35 text-sm w-2/5">{item.label}</span>
                  <span className="text-white text-sm text-right flex-1 font-medium">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
