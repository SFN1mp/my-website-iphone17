"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const displayFeatures = [
  {
    title: "Super Retina XDR",
    description: "Максимальная чёткость: каждый пиксель отточен до совершенства.",
    color: "#3b82f6",
    icon: "💎",
  },
  {
    title: "OLED",
    description: "Истинный чёрный цвет, бесконечный контраст, живые цвета.",
    color: "#8b5cf6",
    icon: "🌑",
  },
  {
    title: "ProMotion 120 Гц",
    description: "От 1 до 120 Гц автоматически — идеальная плавность без лишних затрат заряда.",
    color: "#10b981",
    icon: "⚡",
  },
  {
    title: "Always-On Display",
    description: "Время, уведомления и виджеты — всегда на экране при минимальном потреблении.",
    color: "#f59e0b",
    icon: "🕐",
  },
  {
    title: "До 2000 нит",
    description: "Читайте экран в самый яркий солнечный день — без бликов и напряжения.",
    color: "#ec4899",
    icon: "☀️",
  },
  {
    title: "Ceramic Shield 2",
    description: "Второе поколение защитного покрытия — вдвое прочнее обычного стекла.",
    color: "#06b6d4",
    icon: "🛡️",
  },
];

function MockIOSScreen({ hz }: { hz: 60 | 120 }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[28px] bg-black flex flex-col items-center justify-center">
      {/* Simulated smooth scroll */}
      <motion.div
        className="w-full"
        animate={
          hz === 120
            ? { y: [0, -200, 0] }
            : { y: [0, -200, 0] }
        }
        transition={{
          duration: hz === 120 ? 3 : 6,
          repeat: Infinity,
          ease: hz === 120 ? [0.22, 1, 0.36, 1] : "linear",
        }}
        style={{ willChange: "transform" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="mx-4 my-2 rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl shrink-0"
                style={{ background: `hsl(${i * 36}, 70%, 50%)` }}
              />
              <div className="flex-1">
                <div className="h-2.5 bg-white/20 rounded-full w-3/4 mb-1.5" />
                <div className="h-2 bg-white/10 rounded-full w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full">
        <span className="text-white text-xs font-mono">{hz} Гц</span>
      </div>
    </div>
  );
}

export default function DisplaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedHz, setSelectedHz] = useState<60 | 120>(120);

  return (
    <section id="display" className="py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-400/70 text-sm font-medium tracking-[0.2em] uppercase block mb-4">
            Дисплей
          </span>
          <h2 className="text-section gradient-text mb-6">6,9 дюйма совершенства</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Super Retina XDR OLED с ProMotion — экран, которому веришь с первого взгляда.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Phone screen mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto"
            style={{ maxWidth: 340 }}
          >
            {/* Phone frame */}
            <div
              className="relative rounded-[44px] p-3 overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #1c1c1e, #2c2c2e)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.1), 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(59,130,246,0.15)",
                height: 560,
              }}
            >
              {/* Dynamic Island */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black z-20"
                style={{ top: 14, width: 110, height: 32 }}
              />
              <MockIOSScreen hz={selectedHz} />
            </div>

            {/* Hz toggle */}
            <div className="flex gap-3 justify-center mt-6">
              {([60, 120] as const).map((hz) => (
                <button
                  key={hz}
                  onClick={() => setSelectedHz(hz)}
                  className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    background:
                      selectedHz === hz
                        ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                        : "rgba(255,255,255,0.06)",
                    color: selectedHz === hz ? "white" : "rgba(255,255,255,0.5)",
                    border:
                      selectedHz === hz
                        ? "1px solid rgba(59,130,246,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {hz} Гц
                </button>
              ))}
            </div>
            <p className="text-center text-white/30 text-xs mt-2">
              {selectedHz === 120
                ? "Максимальная плавность ProMotion"
                : "Стандартная частота обновления"}
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-4">
            {displayFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="flex items-start gap-4 glass rounded-2xl p-5 group"
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                  style={{ background: feat.color + "20" }}
                >
                  {feat.icon}
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">{feat.title}</div>
                  <div className="text-white/50 text-sm">{feat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
