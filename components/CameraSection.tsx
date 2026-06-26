"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { camerasData, zoomLevels } from "@/data/iphone17ProMax";

function ZoomVisualizer({ zoom }: { zoom: number }) {
  const scale = 1 + (zoom - 0.5) * 0.06;
  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
      {/* Scene */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 40%), radial-gradient(ellipse at 70% 60%, rgba(139,92,246,0.2) 0%, transparent 40%), linear-gradient(160deg, #0d0d2b, #000000)",
        }}
      >
        {/* Simulated city grid */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${(i % 4) * 25}%`,
                top: `${Math.floor(i / 4) * 50}%`,
                width: "20%",
                height: "45%",
                background: `rgba(${60 + i * 10}, ${80 + i * 8}, ${200 + i * 5}, 0.15)`,
                borderRadius: 8,
                border: "1px solid rgba(100,120,255,0.1)",
              }}
            />
          ))}
        </div>

        {/* Center subject */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ scale: 1 / scale + 0.2 }}
          style={{
            width: 60,
            height: 60,
            background:
              "radial-gradient(circle, rgba(255,220,150,0.9), rgba(255,180,80,0.6))",
            boxShadow: "0 0 40px rgba(255,200,100,0.6)",
          }}
        />
      </motion.div>

      {/* Focus ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="border border-yellow-400/60 rounded-sm"
          animate={{ width: 48 + 4 / zoom, height: 48 + 4 / zoom }}
          style={{ margin: "auto" }}
        />
      </div>

      {/* Zoom label */}
      <div className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-xs text-white font-mono">
        {zoom}x
      </div>

      {/* Aperture info */}
      <div className="absolute bottom-3 right-3 glass px-3 py-1 rounded-full text-xs text-white/60 font-mono">
        f/1.78 · 1/120с · ISO 64
      </div>
    </div>
  );
}

export default function CameraSection() {
  const [activeCamera, setActiveCamera] = useState(0);
  const [activeZoom, setActiveZoom] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="camera" className="py-32 px-6 relative overflow-hidden">
      {/* Bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(16,185,129,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-emerald-400/70 text-sm font-medium tracking-[0.2em] uppercase block mb-4">
            Система камер
          </span>
          <h2 className="text-section gradient-text mb-6">Три камеры. Один шедевр.</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Каждая камера — 48 мегапикселей. Вместе они создают профессиональный результат при любом освещении.
          </p>
        </motion.div>

        {/* Camera cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {camerasData.map((cam, i) => (
            <motion.button
              key={cam.id}
              onClick={() => setActiveCamera(i)}
              className="glass rounded-2xl p-5 text-left relative overflow-hidden transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              style={{
                border:
                  activeCamera === i
                    ? `1px solid ${cam.color}60`
                    : "1px solid rgba(255,255,255,0.06)",
                background:
                  activeCamera === i
                    ? `rgba(${parseInt(cam.color.slice(1, 3), 16)}, ${parseInt(cam.color.slice(3, 5), 16)}, ${parseInt(cam.color.slice(5, 7), 16)}, 0.08)`
                    : "rgba(255,255,255,0.04)",
              }}
            >
              {/* Camera icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl"
                style={{ background: cam.color + "20" }}
              >
                📷
              </div>
              <div className="text-xs font-bold text-white/40 mb-1">{cam.zoom}</div>
              <div className="text-sm font-semibold text-white">{cam.title}</div>
              <div className="text-xs text-white/40 mt-1">{cam.subtitle}</div>

              {activeCamera === i && (
                <motion.div
                  layoutId="camera-active"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: cam.color }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Active camera details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCamera}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 mb-16"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
                  style={{
                    background: camerasData[activeCamera].color + "20",
                    color: camerasData[activeCamera].color,
                  }}
                >
                  {camerasData[activeCamera].zoom}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {camerasData[activeCamera].title}
                </h3>
                <p className="text-white/40 text-lg mb-4">
                  {camerasData[activeCamera].subtitle}
                </p>
                <p className="text-white/60 leading-relaxed">
                  {camerasData[activeCamera].description}
                </p>
              </div>

              {/* Visual */}
              <div
                className="w-full aspect-video rounded-2xl overflow-hidden relative"
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${camerasData[activeCamera].color}20 0%, transparent 60%), linear-gradient(135deg, #0a0a1a, #000)`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    key={activeCamera}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-8xl"
                  >
                    {["📸", "🌍", "🔭", "🤳"][activeCamera]}
                  </motion.div>
                </div>
                {/* Lens grid overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, transparent 20%, rgba(255,255,255,0.01) 100%)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Zoom switcher */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h3 className="text-2xl font-semibold text-white text-center mb-6">
            Интерактивный зум
          </h3>
          <p className="text-white/40 text-center mb-8">
            Нажмите на значение зума, чтобы увидеть разницу
          </p>

          {/* Zoom buttons */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {zoomLevels.map((z) => (
              <motion.button
                key={z.value}
                onClick={() => setActiveZoom(z.value)}
                className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background:
                    activeZoom === z.value
                      ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                      : "rgba(255,255,255,0.06)",
                  color: activeZoom === z.value ? "white" : "rgba(255,255,255,0.5)",
                  border:
                    activeZoom === z.value
                      ? "1px solid rgba(59,130,246,0.4)"
                      : "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    activeZoom === z.value
                      ? "0 0 20px rgba(59,130,246,0.3)"
                      : "none",
                }}
              >
                {z.label}
              </motion.button>
            ))}
          </div>

          {/* Zoom visualizer */}
          <div className="max-w-2xl mx-auto">
            <ZoomVisualizer zoom={activeZoom} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
