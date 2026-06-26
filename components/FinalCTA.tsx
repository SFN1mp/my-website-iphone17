"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PhoneModel from "./PhoneModel";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSpecs = () => {
    document.querySelector("#specs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 animated-gradient" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.08) 30%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Phone animation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <PhoneModel animate={true} />

            {/* Halo ring */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 100%, rgba(59,130,246,0.4) 0%, transparent 60%)",
                filter: "blur(30px)",
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-bold mb-6 gradient-text"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            iPhone 17 Pro Max — максимум технологий в одном корпусе
          </h2>

          <p className="text-white/40 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Каждая деталь продумана. Каждый компонент — лучший в своём классе. Это не просто телефон — это стандарт.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={scrollToSpecs}
              className="px-10 py-4 rounded-full text-white font-semibold text-lg"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                boxShadow: "0 0 40px rgba(59,130,246,0.4)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 60px rgba(59,130,246,0.6)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Изучить характеристики
            </motion.button>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-10 py-4 rounded-full glass border border-white/10 text-white font-semibold text-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              В начало
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          className="text-white/20 text-sm mt-16 tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          iPhone 17 Pro Max · iOS 19 · Apple A19 Pro
        </motion.p>
      </div>
    </section>
  );
}
