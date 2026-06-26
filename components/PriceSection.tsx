"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { priceData } from "@/data/iphone17ProMax";

export default function PriceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="price" className="py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(245,158,11,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-amber-400/70 text-sm font-medium tracking-[0.2em] uppercase block mb-4">
            Стоимость
          </span>
          <h2 className="text-section gradient-text mb-6">Средняя цена</h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Цена зависит от региона, магазина, курса валют и наличия акций.
            Данные являются ориентировочными.
          </p>
        </motion.div>

        {/* Price cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {priceData.map((item, i) => (
            <motion.div
              key={item.storage}
              className="glass rounded-3xl p-6 text-center relative overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                scale: 1.04,
                transition: { duration: 0.3 },
              }}
            >
              {/* Popular badge */}
              {i === 1 && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white",
                  }}
                >
                  Популярный
                </div>
              )}

              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <div className="text-white/40 text-xs font-medium tracking-widest uppercase mb-3">
                  Память
                </div>
                <div className="text-3xl font-bold text-white mb-4">{item.storage}</div>

                <div className="space-y-2 mb-4">
                  <div className="text-lg font-semibold text-white">{item.priceEUR}</div>
                  <div className="text-white/40 text-sm">{item.priceUSD}</div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/06 mb-4" />

                <div className="text-white/30 text-xs">
                  Ориентировочная цена
                </div>
              </div>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(${i === 1 ? "59,130,246" : "255,255,255"},0.3), transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          className="glass rounded-2xl p-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <p className="text-white/30 text-sm leading-relaxed">
            ⚠️ Цены указаны ориентировочно на основе стартовых розничных цен Apple в регионах EU/US.
            Фактическая стоимость может отличаться в зависимости от страны, официального магазина Apple,
            авторизованных ретейлеров, курса валют и специальных предложений.
            Для точной цены обращайтесь на официальный сайт{" "}
            <span className="text-blue-400">apple.com</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
