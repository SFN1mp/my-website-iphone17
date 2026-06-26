"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./ui/AnimatedSection";
import { GlowBorderCard } from "./ui/GlowCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const displayFeatures = [
  { title: "Super Retina XDR", description: "Максимальная чёткость: каждый пиксель отточен до совершенства.", color: "#3b82f6", icon: "💎" },
  { title: "OLED", description: "Истинный чёрный цвет, бесконечный контраст, живые насыщенные цвета.", color: "#8b5cf6", icon: "🌑" },
  { title: "ProMotion 120 Гц", description: "От 1 до 120 Гц автоматически — идеальная плавность без лишних затрат заряда.", color: "#10b981", icon: "⚡" },
  { title: "Always-On Display", description: "Время, уведомления и виджеты — всегда на экране при минимальном потреблении.", color: "#f59e0b", icon: "🕐" },
  { title: "До 2000 нит", description: "Читайте экран в самый яркий солнечный день — без бликов и напряжения глаз.", color: "#ec4899", icon: "☀️" },
  { title: "Ceramic Shield 2", description: "Второе поколение защитного покрытия — вдвое прочнее обычного стекла смартфонов.", color: "#06b6d4", icon: "🛡️" },
];

function MockIOSScreen({ hz }: { hz: 60 | 120 }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[28px] bg-black flex flex-col">
      {/* Animated scroll list */}
      <motion.div
        className="w-full pt-4"
        animate={reduced ? {} : { y: [0, -220, 0] }}
        transition={{
          duration: hz === 120 ? 3 : 7,
          repeat: Infinity,
          ease: hz === 120 ? [0.22, 1, 0.36, 1] : "linear",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="mx-4 my-2 rounded-xl p-3.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl shrink-0"
                style={{ background: `hsl(${i * 30}, 70%, 50%)30` }}
              />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 bg-white/15 rounded-full" style={{ width: `${55 + ((i * 17) % 35)}%` }} />
                <div className="h-2 bg-white/08 rounded-full" style={{ width: `${35 + ((i * 13) % 30)}%` }} />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Overlay labels */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full z-10">
        <span className="text-white text-xs font-mono font-bold">{hz} Гц</span>
      </div>
    </div>
  );
}

export default function DisplaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedHz, setSelectedHz] = useState<60 | 120>(120);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="display" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale: bgScale }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection direction="clip" className="text-center mb-20">
          <span className="text-blue-400/70 text-sm font-medium tracking-[0.25em] uppercase block mb-4">
            Дисплей
          </span>
          <h2 className="text-section gradient-text mb-6">6,9 дюйма совершенства</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Super Retina XDR OLED с ProMotion — экран, которому веришь с первого взгляда.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Phone screen */}
          <motion.div
            className="relative mx-auto"
            style={{ maxWidth: 340, y: reduced ? 0 : phoneY }}
          >
            {/* Outer glow */}
            <motion.div
              className="absolute -inset-8 rounded-[52px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Phone frame */}
            <motion.div
              className="relative rounded-[44px] p-3 overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #1c1c1e, #2c2c2e)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.1), 0 50px 100px rgba(0,0,0,0.8), 0 0 80px rgba(59,130,246,0.12)",
                height: 560,
              }}
              initial={reduced ? {} : { opacity: 0, scale: 0.85, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Dynamic Island */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black z-20"
                style={{ top: 14, width: 110, height: 32 }}
              />
              <MockIOSScreen hz={selectedHz} />
            </motion.div>

            {/* Hz toggle */}
            <div className="flex gap-3 justify-center mt-6">
              {([60, 120] as const).map((hz) => (
                <motion.button
                  key={hz}
                  onClick={() => setSelectedHz(hz)}
                  className="relative px-6 py-2.5 rounded-full text-sm font-semibold overflow-hidden"
                  style={{
                    background: selectedHz === hz ? "transparent" : "rgba(255,255,255,0.05)",
                    color: selectedHz === hz ? "white" : "rgba(255,255,255,0.4)",
                    border: selectedHz === hz ? "1px solid rgba(59,130,246,0.5)" : "1px solid rgba(255,255,255,0.07)",
                  }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  {selectedHz === hz && (
                    <motion.div
                      layoutId="hz-bg"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{hz} Гц</span>
                </motion.button>
              ))}
            </div>
            <motion.p
              key={selectedHz}
              className="text-center text-white/25 text-xs mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {selectedHz === 120 ? "ProMotion — плавность без компромиссов" : "Стандартная частота"}
            </motion.p>
          </motion.div>

          {/* Features list */}
          <StaggerContainer className="space-y-3" stagger={0.07} delayChildren={0.2}>
            {displayFeatures.map((feat) => (
              <StaggerItem key={feat.title}>
                <GlowBorderCard
                  color={feat.color}
                  className="flex items-start gap-4 glass rounded-2xl p-5 group"
                >
                  <motion.div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl"
                    style={{ background: feat.color + "18", border: `1px solid ${feat.color}20` }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    {feat.icon}
                  </motion.div>
                  <div>
                    <div className="text-white font-semibold mb-1">{feat.title}</div>
                    <div className="text-white/45 text-sm leading-relaxed">{feat.description}</div>
                  </div>
                </GlowBorderCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
