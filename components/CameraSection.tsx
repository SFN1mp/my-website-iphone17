"use client";

import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { camerasData, zoomLevels } from "@/data/iphone17ProMax";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./ui/AnimatedSection";
import { GlowBorderCard } from "./ui/GlowCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ZoomVisualizer({ zoom }: { zoom: number }) {
  const scale = Math.pow(zoom / 0.5, 0.35);
  const reduced = useReducedMotion();

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
      {/* Background scene */}
      <motion.div
        className="absolute inset-0"
        animate={reduced ? {} : { scale }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.25) 0%, transparent 40%), radial-gradient(ellipse at 70% 60%, rgba(139,92,246,0.15) 0%, transparent 40%), linear-gradient(160deg, #080820, #000)",
          transformOrigin: "center center",
        }}
      >
        {/* City grid */}
        <div className="absolute inset-0 opacity-25">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-lg"
              style={{
                left: `${(i % 4) * 25 + 2}%`,
                top: `${Math.floor(i / 4) * 33 + 5}%`,
                width: "18%",
                height: "28%",
                background: `rgba(${60 + i * 8},${80 + i * 6},${180 + i * 5},0.2)`,
                border: "1px solid rgba(100,120,255,0.1)",
              }}
            />
          ))}
        </div>

        {/* Subject */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={reduced ? {} : { scale: 1 / scale }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 60, height: 60,
            background: "radial-gradient(circle, rgba(255,230,140,0.95), rgba(255,175,60,0.7))",
            boxShadow: "0 0 40px rgba(255,200,80,0.7), 0 0 80px rgba(255,200,80,0.3)",
          }}
        />
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)" }}
      />

      {/* Focus bracket */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative"
          animate={reduced ? {} : { width: 44 + 8 / zoom, height: 44 + 8 / zoom }}
          transition={{ duration: 0.5 }}
        >
          {/* Corner brackets */}
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((cls, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 border-yellow-400/70 ${cls}`}
            />
          ))}
        </motion.div>
      </div>

      {/* HUD overlays */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className="glass px-2.5 py-1 rounded-full text-xs text-white font-mono font-bold">
          {zoom}×
        </div>
        <motion.div
          className="glass px-2.5 py-1 rounded-full text-xs text-white/50 font-mono"
          animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AF ●
        </motion.div>
      </div>
      <div className="absolute bottom-3 right-3 glass px-2.5 py-1 rounded-full text-xs text-white/40 font-mono">
        f/1.78 · 1/120s · ISO 64
      </div>

      {/* Zoom transition flash */}
      <motion.div
        key={zoom}
        className="absolute inset-0 rounded-2xl bg-white pointer-events-none"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export default function CameraSection() {
  const [activeCamera, setActiveCamera] = useState(0);
  const [activeZoom, setActiveZoom] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="camera" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 80% 50%, rgba(16,185,129,0.06) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <AnimatedSection direction="up" className="text-center mb-16">
          <span className="text-emerald-400/70 text-sm font-medium tracking-[0.25em] uppercase block mb-4">
            Система камер
          </span>
          <h2 className="text-section gradient-text mb-6">Три камеры. Один шедевр.</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Каждая камера — 48 мегапикселей. Вместе они создают профессиональный результат при любом освещении.
          </p>
        </AnimatedSection>

        {/* Camera selector tabs */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12" stagger={0.08} delayChildren={0.1}>
          {camerasData.map((cam, i) => (
            <StaggerItem key={cam.id}>
              <motion.button
                onClick={() => setActiveCamera(i)}
                className="glass rounded-2xl p-5 text-left relative overflow-hidden w-full transition-all duration-300"
                style={{
                  border: activeCamera === i ? `1px solid ${cam.color}50` : "1px solid rgba(255,255,255,0.06)",
                  background:
                    activeCamera === i
                      ? `rgba(${parseInt(cam.color.slice(1, 3), 16)},${parseInt(cam.color.slice(3, 5), 16)},${parseInt(cam.color.slice(5, 7), 16)},0.08)`
                      : "rgba(255,255,255,0.03)",
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-lg"
                  style={{ background: cam.color + "18" }}
                >
                  📷
                </div>
                <div className="text-xs font-bold mb-1" style={{ color: cam.color }}>
                  {cam.zoom}
                </div>
                <div className="text-sm font-semibold text-white">{cam.title}</div>
                <div className="text-xs text-white/35 mt-0.5">{cam.subtitle}</div>

                {activeCamera === i && (
                  <motion.div
                    layoutId="cam-active-bar"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: cam.color }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Active camera details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCamera}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 mb-16"
            style={{ border: `1px solid ${camerasData[activeCamera].color}25` }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4"
                  style={{
                    background: camerasData[activeCamera].color + "18",
                    color: camerasData[activeCamera].color,
                    border: `1px solid ${camerasData[activeCamera].color}30`,
                  }}
                >
                  {camerasData[activeCamera].zoom}
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {camerasData[activeCamera].title}
                </h3>
                <p className="text-white/40 text-lg mb-4">{camerasData[activeCamera].subtitle}</p>
                <p className="text-white/60 leading-relaxed">{camerasData[activeCamera].description}</p>

                {/* Spec pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {["48 МП", "OIS", "Автофокус", "HDR"].map((spec) => (
                    <span
                      key={spec}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <motion.div
                className="w-full aspect-video rounded-2xl overflow-hidden relative flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${camerasData[activeCamera].color}18 0%, transparent 60%), linear-gradient(135deg, #0a0a1a, #000)`,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  key={activeCamera}
                  initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-8xl"
                >
                  {["📸", "🌍", "🔭", "🤳"][activeCamera]}
                </motion.div>

                {/* Scan lines */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${camerasData[activeCamera].color}04 3px, ${camerasData[activeCamera].color}04 4px)`,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Zoom switcher */}
        <AnimatedSection direction="up" delay={0.15}>
          <h3 className="text-2xl font-semibold text-white text-center mb-3">Интерактивный зум</h3>
          <p className="text-white/35 text-center mb-8">Нажмите на значение зума, чтобы увидеть изменение кадра</p>

          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {zoomLevels.map((z) => (
              <motion.button
                key={z.value}
                onClick={() => setActiveZoom(z.value)}
                className="relative px-5 py-2.5 rounded-full text-sm font-semibold overflow-hidden"
                style={{
                  background: activeZoom === z.value ? "transparent" : "rgba(255,255,255,0.05)",
                  color: activeZoom === z.value ? "white" : "rgba(255,255,255,0.45)",
                  border: activeZoom === z.value
                    ? "1px solid rgba(59,130,246,0.5)"
                    : "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
              >
                {activeZoom === z.value && (
                  <motion.div
                    layoutId="zoom-active-bg"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{z.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <ZoomVisualizer zoom={activeZoom} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
