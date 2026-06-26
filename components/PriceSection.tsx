"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { priceData } from "@/data/iphone17ProMax";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./ui/AnimatedSection";
import { GlowCard } from "./ui/GlowCard";

export default function PriceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="price" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 70% 50%, rgba(245,158,11,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection direction="clip" className="text-center mb-16">
          <span className="text-amber-400/70 text-sm font-medium tracking-[0.25em] uppercase block mb-4">
            Стоимость
          </span>
          <h2 className="text-section gradient-text mb-6">Средняя цена</h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Цена зависит от региона, магазина, курса валют и наличия акций. Данные ориентировочные.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10" stagger={0.1}>
          {priceData.map((item, i) => (
            <StaggerItem key={item.storage}>
              <GlowCard
                glowColor="rgba(245,158,11,0.15)"
                tiltAmount={6}
                className="relative glass rounded-3xl p-7 text-center overflow-hidden group h-full"
              >
                {i === 1 && (
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold z-20"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", color: "white" }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Популярный
                  </motion.div>
                )}

                {/* Top line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background:
                      i === 1
                        ? "linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent)"
                        : "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  }}
                />

                {/* Hover bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)" }}
                />

                <div className="relative z-10">
                  <div className="text-white/30 text-[10px] font-medium tracking-[0.25em] uppercase mb-3">
                    Память
                  </div>
                  <div className="text-3xl font-black text-white mb-5">{item.storage}</div>

                  <div className="space-y-1.5 mb-5">
                    <div className="text-xl font-semibold text-white">{item.priceEUR}</div>
                    <div className="text-white/35 text-sm">{item.priceUSD}</div>
                  </div>

                  <div className="h-px bg-white/05 mb-4" />
                  <div className="text-white/20 text-xs">Ориентировочная цена</div>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Disclaimer */}
        <AnimatedSection direction="up" delay={0.3}>
          <div className="glass rounded-2xl p-5 text-center">
            <p className="text-white/25 text-sm leading-relaxed">
              ⚠️ Цены указаны ориентировочно на основе стартовых розничных цен Apple в регионах EU/US.
              Фактическая стоимость может отличаться. Для точной цены — {" "}
              <span className="text-blue-400/70">apple.com</span>.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
