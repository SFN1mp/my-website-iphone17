"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { whyProMaxCards } from "@/data/iphone17ProMax";

function TiltCard({ card, index, inView }: { card: typeof whyProMaxCards[0]; index: number; inView: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setTilt({ x: x * 8, y: y * 8 });
  };

  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"];

  return (
    <motion.div
      className="relative cursor-default"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="glass rounded-3xl p-8 relative overflow-hidden h-full"
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
          border: `1px solid ${colors[index]}20`,
        }}
        whileHover={{ boxShadow: `0 20px 60px ${colors[index]}20, 0 0 0 1px ${colors[index]}20` }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-40 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${colors[index]}10 0%, transparent 60%)`,
          }}
        />

        {/* 3D floating element */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
          <div className="text-5xl mb-5">{card.icon}</div>

          <div
            className="text-4xl font-black mb-1"
            style={{
              background: `linear-gradient(135deg, ${colors[index]}, white)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {card.stat}
          </div>
          <div className="text-white/30 text-xs mb-4 uppercase tracking-wider">{card.statLabel}</div>

          <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
        </div>

        {/* Corner decoration */}
        <div
          className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-tr-3xl"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${colors[index]}15, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function WhyProMaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-pro-max" className="py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 60%)",
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
            Почему Pro Max
          </span>
          <h2 className="text-section gradient-text mb-6">Максимум во всём</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Pro Max — это не просто большой размер. Это другой уровень во всех измерениях.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyProMaxCards.map((card, i) => (
            <TiltCard key={card.title} card={card} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
