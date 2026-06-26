"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { performanceCards } from "@/data/iphone17ProMax";

function ChipVisual() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 320 }}>
      {/* Outer glow rings */}
      {[180, 220, 260].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-500/10"
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      {/* Rotating ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 160,
          height: 160,
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(#000, #000), conic-gradient(from 0deg, #3b82f6, #8b5cf6, #10b981, #3b82f6)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Chip body */}
      <div
        className="absolute rounded-2xl flex flex-col items-center justify-center"
        style={{
          width: 120,
          height: 120,
          background:
            "linear-gradient(135deg, #1c1c2e 0%, #0d0d1a 100%)",
          boxShadow:
            "0 0 60px rgba(59,130,246,0.3), 0 0 120px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="text-xs text-white/40 tracking-widest uppercase mb-1">Apple</div>
        <div className="text-2xl font-bold text-white">A19</div>
        <div
          className="text-xs font-bold px-2 py-0.5 rounded-full mt-1"
          style={{ background: "rgba(59,130,246,0.2)", color: "#60a5fa" }}
        >
          Pro
        </div>
      </div>

      {/* Data streams */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 2,
            height: 40,
            top: "50%",
            left: "50%",
            transformOrigin: "top center",
            transform: `rotate(${angle}deg) translateX(-50%)`,
            background: `linear-gradient(to bottom, rgba(59,130,246,0.6), transparent)`,
            marginTop: 60,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.33 }}
        />
      ))}

      {/* Particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const r = 90 + Math.random() * 30;
        const x = Math.cos((angle * Math.PI) / 180) * r;
        const y = Math.sin((angle * Math.PI) / 180) * r;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#8b5cf6" : "#10b981",
              x,
              y,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
          />
        );
      })}
    </div>
  );
}

export default function PerformanceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="performance" className="py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-violet-400/70 text-sm font-medium tracking-[0.2em] uppercase block mb-4">
              Производительность
            </span>
            <h2 className="text-section gradient-text mb-6">
              Чип, который переопределяет возможное
            </h2>
            <p className="text-white/50 text-xl leading-relaxed mb-8">
              A19 Pro — самый мощный мобильный процессор. 35 триллионов операций в секунду для нейронных задач. Console-уровень графики. И всё это без перегрева — благодаря Vapor Chamber.
            </p>

            <div className="space-y-4">
              {[
                { label: "CPU", value: 95, color: "#3b82f6" },
                { label: "GPU", value: 88, color: "#8b5cf6" },
                { label: "Neural Engine", value: 99, color: "#10b981" },
                { label: "Энергоэффективность", value: 92, color: "#f59e0b" },
              ].map((bar, i) => (
                <motion.div
                  key={bar.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/60">{bar.label}</span>
                    <span className="text-white/40 font-mono">{bar.value}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: bar.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${bar.value}%` } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <ChipVisual />
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {performanceCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="glass rounded-3xl p-6 group cursor-default relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.7 }}
              whileHover={{
                scale: 1.03,
                rotateX: 3,
                rotateY: -3,
                transition: { duration: 0.3 },
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${card.color}12 0%, transparent 70%)`,
                }}
              />

              <div className="text-3xl mb-4">{card.icon}</div>
              <div
                className="text-sm font-bold mb-2"
                style={{ color: card.color }}
              >
                {card.title}
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-20 rounded-tr-3xl"
                style={{
                  background: `radial-gradient(circle at 100% 0%, ${card.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
