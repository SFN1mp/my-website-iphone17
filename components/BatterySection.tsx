"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { batteryData } from "@/data/iphone17ProMax";

function BatteryBar({ stat, index, inView }: { stat: typeof batteryData.stats[0]; index: number; inView: boolean }) {
  const maxHours = 120;
  const pct = (stat.hours / maxHours) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.7 }}
      className="glass rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{stat.icon}</span>
          <span className="text-white/70 font-medium">{stat.label}</span>
        </div>
        <motion.span
          className="text-2xl font-bold text-white font-mono"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.15 }}
        >
          {stat.hours} ч
        </motion.span>
      </div>

      {/* Bar */}
      <div className="h-2 bg-white/05 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${stat.color}, ${stat.color}99)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ delay: 0.5 + index * 0.15, duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function AnimatedBatteryIcon({ inView }: { inView: boolean }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 300 }}>
      {/* Battery body */}
      <div className="relative">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            width: 100,
            height: 200,
            border: "2px solid rgba(255,255,255,0.15)",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          {/* Battery fill */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 rounded-b-3xl"
            style={{
              background: "linear-gradient(to top, #10b981, #3b82f6)",
              boxShadow: "0 0 20px rgba(16,185,129,0.5)",
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: "94%" } : { height: 0 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          />

          {/* Charge lines */}
          {[25, 50, 75].map((pct) => (
            <div
              key={pct}
              className="absolute left-0 right-0 h-px"
              style={{
                bottom: `${pct}%`,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          ))}

          {/* Percentage text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <span className="text-white font-bold text-xl z-10">94%</span>
          </motion.div>
        </div>

        {/* Battery tip */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-t-md"
          style={{
            top: -10,
            width: 30,
            height: 10,
            background: "rgba(255,255,255,0.12)",
          }}
        />

        {/* Lightning bolt */}
        <motion.div
          className="absolute -right-10 top-1/2 -translate-y-1/2 text-yellow-400 text-2xl"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚡
        </motion.div>
      </div>

      {/* Orbit rings */}
      {[140, 190, 240].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            border: `1px solid rgba(16,185,129,${0.12 - i * 0.03})`,
          }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </div>
  );
}

export default function BatterySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="battery" className="py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-emerald-400/70 text-sm font-medium tracking-[0.2em] uppercase block mb-4">
            Автономность
          </span>
          <h2 className="text-section gradient-text mb-4">
            {batteryData.headline}
          </h2>
          <p className="text-white/40 text-xl">{batteryData.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-4 mb-10">
              {batteryData.stats.map((stat, i) => (
                <BatteryBar key={stat.label} stat={stat} index={i} inView={inView} />
              ))}
            </div>

            {/* Charging info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="glass rounded-3xl p-6"
            >
              <h3 className="text-white font-semibold mb-4">Зарядка</h3>
              <div className="grid grid-cols-3 gap-4">
                {batteryData.charging.map((ch) => (
                  <div key={ch.label} className="text-center">
                    <div className="text-white font-bold text-lg">{ch.value}</div>
                    <div className="text-white/40 text-xs mt-1">{ch.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <AnimatedBatteryIcon inView={inView} />

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
            >
              <div className="text-6xl font-bold gradient-text">39</div>
              <div className="text-white/40 mt-1">часов видео без зарядки</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
