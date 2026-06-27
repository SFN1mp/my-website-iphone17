"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { batteryData } from "@/data/iphone17ProMax";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./ui/AnimatedSection";
import { CountUp } from "./ui/CountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function BatteryBar({
  stat, index, inView,
}: { stat: typeof batteryData.stats[0]; index: number; inView: boolean }) {
  const maxHours = 120;
  const pct = (stat.hours / maxHours) * 100;
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, x: -40, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-3xl p-6 group relative overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 20% 50%, ${stat.color}12 0%, transparent 70%)` }}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.span
            className="text-2xl"
            animate={reduced ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 2.5 + index * 0.5, repeat: Infinity }}
          >
            {stat.icon}
          </motion.span>
          <span className="text-white/70 font-medium">{stat.label}</span>
        </div>

        {/* Animated number counter */}
        <span className="text-2xl font-bold text-white font-mono">
          <CountUp end={stat.hours} duration={1800} suffix=" ч" />
        </span>
      </div>

      {/* Bar */}
      <div className="h-2 bg-white/04 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ delay: 0.4 + index * 0.15, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Moving shimmer on bar */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
            animate={reduced ? {} : { x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 2 + index * 0.4 }}
          />
        </motion.div>
      </div>

      {/* Percentage label */}
      <div className="mt-2 text-right">
        <span className="text-xs text-white/25 font-mono">{Math.round(pct)}% от макс. в тесте</span>
      </div>
    </motion.div>
  );
}

function AnimatedBatteryIcon({ inView }: { inView: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center" style={{ height: 320 }}>
      {/* Background glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200, height: 200,
          background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={reduced ? {} : { scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbit rings */}
      {[140, 190, 240].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: size, height: size, border: `1px solid rgba(16,185,129,${0.14 - i * 0.04})` }}
          animate={reduced ? {} : { scale: [1, 1.06, 1], rotate: [0, i % 2 === 0 ? 20 : -20, 0] }}
          transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Battery body */}
      <div className="relative">
        <div
          className="relative rounded-[20px] overflow-hidden"
          style={{
            width: 90, height: 180,
            border: "2px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.6)",
          }}
        >
          {/* Fill */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 rounded-b-[18px]"
            style={{
              background: "linear-gradient(to top, #10b981, #3b82f6)",
              boxShadow: "0 0 30px rgba(16,185,129,0.5), 0 -4px 20px rgba(16,185,129,0.3)",
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: "94%" } : { height: 0 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          />

          {/* Grid lines */}
          {[25, 50, 75].map((pct) => (
            <div
              key={pct}
              className="absolute left-0 right-0 h-px"
              style={{ bottom: `${pct}%`, background: "rgba(255,255,255,0.06)" }}
            />
          ))}

          {/* Percentage */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-white font-bold text-2xl">94%</span>
          </div>

          {/* Animated charge shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, transparent, rgba(255,255,255,0.06), transparent)",
            }}
            animate={reduced ? {} : { y: [100, -200] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Battery tip */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-t-sm"
          style={{ top: -10, width: 28, height: 10, background: "rgba(255,255,255,0.1)" }}
        />

        {/* Bolt */}
        <motion.div
          className="absolute -right-12 top-1/2 -translate-y-1/2 text-yellow-400 text-3xl"
          animate={reduced ? {} : { opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ⚡
        </motion.div>
      </div>
    </div>
  );
}

export default function BatterySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="battery" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.06) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection direction="clip" className="text-center mb-20">
          <span className="text-emerald-400/70 text-sm font-medium tracking-[0.25em] uppercase block mb-4">
            Автономность
          </span>
          <h2 className="text-section gradient-text mb-4">
            <CountUp end={39} suffix=" часов" className="gradient-text" />
          </h2>
          <p className="text-white/40 text-xl">{batteryData.subtitle}</p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-4 mb-10">
              {batteryData.stats.map((stat, i) => (
                <BatteryBar key={stat.label} stat={stat} index={i} inView={inView} />
              ))}
            </div>

            {/* Charging */}
            <AnimatedSection direction="up" delay={0.4}>
              <div className="glass rounded-3xl p-6">
                <h3 className="text-white font-semibold mb-5">Зарядка</h3>
                <div className="grid grid-cols-3 gap-4">
                  {batteryData.charging.map((ch, i) => (
                    <motion.div
                      key={ch.label}
                      className="text-center p-3 rounded-2xl"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                      whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.06)" }}
                    >
                      <div className="text-white font-bold text-lg">{ch.value}</div>
                      <div className="text-white/35 text-xs mt-1">{ch.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Battery visual */}
          <AnimatedSection direction="scale" delay={0.3}>
            <AnimatedBatteryIcon inView={inView} />
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8, duration: 0.7 }}
            >
              <div className="text-6xl font-black gradient-text">39</div>
              <div className="text-white/35 mt-1 text-sm">часов видео без зарядки</div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
