"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import PhoneModel from "./PhoneModel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(50px)",
        translateX: "-50%", translateY: "-50%",
      }}
      animate={{ scale: [1, 1.4, 0.9, 1.2, 1], opacity: [0.3, 0.7, 0.4, 0.8, 0.3] }}
      transition={{ duration: 10 + delay * 2, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const phoneScale = useSpring(useTransform(scrollYProgress, [0, 0.6], [0.7, 1]), { stiffness: 80, damping: 20 });
  const phoneRotateY = useSpring(useTransform(scrollYProgress, [0, 0.6], [-30, 0]), { stiffness: 60, damping: 18 });

  const scrollToSpecs = () => document.querySelector("#specs")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-32 px-6 relative overflow-hidden min-h-[80vh] flex items-center" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Orbs */}
      {!reduced && (
        <>
          <FloatingOrb x="20%" y="30%" size={500} color="rgba(59,130,246,0.12)" delay={0} />
          <FloatingOrb x="80%" y="70%" size={400} color="rgba(139,92,246,0.1)" delay={2} />
          <FloatingOrb x="60%" y="20%" size={300} color="rgba(16,185,129,0.08)" delay={4} />
        </>
      )}

      {/* Light grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center w-full">
        {/* Phone */}
        <motion.div
          className="flex justify-center mb-16 relative"
          style={reduced ? {} : { scale: phoneScale, rotateY: phoneRotateY }}
        >
          {/* Under-glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 300, height: 80, bottom: -20,
              background: "radial-gradient(ellipse, rgba(59,130,246,0.4) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={reduced ? {} : { opacity: [0.4, 0.9, 0.4], scaleX: [0.8, 1.1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <PhoneModel animate={!reduced} />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 50, filter: "blur(12px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-bold mb-6"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #ffffff 30%, #a0a0b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            iPhone 17 Pro Max — максимум технологий в одном корпусе
          </h2>

          <p className="text-white/35 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Каждая деталь продумана. Каждый компонент — лучший в своём классе. Это не просто телефон — это стандарт.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={scrollToSpecs}
              className="relative overflow-hidden px-10 py-4 rounded-full text-white font-semibold text-lg"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                boxShadow: "0 0 50px rgba(59,130,246,0.4)",
              }}
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 80px rgba(59,130,246,0.65), 0 0 160px rgba(139,92,246,0.3)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Shimmer */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
                }}
                animate={reduced ? {} : { x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              />
              Изучить характеристики
            </motion.button>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-10 py-4 rounded-full font-semibold text-lg text-white/70"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
              }}
              whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.96 }}
            >
              В начало
            </motion.button>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-white/15 text-xs mt-16 tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 1 }}
        >
          iPhone 17 Pro Max · iOS 19 · A19 Pro · © 2026
        </motion.p>
      </div>
    </section>
  );
}
