"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { specsData } from "@/data/iphone17ProMax";

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

export default function SpecsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<CategoryKey>("display");

  const activeData = specsData[active];

  return (
    <section id="specs" className="py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-400/70 text-sm font-medium tracking-[0.2em] uppercase block mb-4">
            Характеристики
          </span>
          <h2 className="text-section gradient-text">Всё о iPhone 17 Pro Max</h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background:
                  active === cat.key
                    ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                    : "rgba(255,255,255,0.05)",
                color: active === cat.key ? "white" : "rgba(255,255,255,0.5)",
                border:
                  active === cat.key
                    ? "1px solid rgba(59,130,246,0.5)"
                    : "1px solid rgba(255,255,255,0.06)",
                boxShadow:
                  active === cat.key ? "0 0 16px rgba(59,130,246,0.3)" : "none",
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Specs table */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/06">
            <h3 className="text-xl font-semibold text-white">{activeData.title}</h3>
          </div>

          <div className="divide-y divide-white/04">
            {activeData.items.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-start justify-between px-6 py-4 hover:bg-white/02 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <span className="text-white/40 text-sm flex-shrink-0 w-1/3">{item.label}</span>
                <span className="text-white text-sm text-right flex-1">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Full specs grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {[
            { label: "Диагональ", value: '6,9"' },
            { label: "Чип", value: "A19 Pro" },
            { label: "Камеры", value: "3 × 48МП" },
            { label: "Зум", value: "до 8x" },
            { label: "Автономность", value: "39 ч" },
            { label: "5G", value: "Да" },
            { label: "USB-C", value: "USB 3" },
            { label: "MagSafe", value: "Да" },
            { label: "Face ID", value: "Да" },
            { label: "iOS", value: "19" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4 text-center">
              <div className="text-white font-bold text-lg">{stat.value}</div>
              <div className="text-white/30 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
