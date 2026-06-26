"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PhoneModelProps {
  rotateY?: number;
  scale?: number;
  className?: string;
  animate?: boolean;
}

export default function PhoneModel({
  rotateY = 0,
  scale = 1,
  className = "",
  animate = true,
}: PhoneModelProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 200, damping: 25 };
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springCfg);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springCfg);
  const glowOpacity = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    glowOpacity.set(1);
  };
  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative select-none ${className}`}
      style={{ perspective: "1200px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={
          reduced
            ? { scale }
            : {
                rotateY: animate ? tiltY : rotateY,
                rotateX: animate ? tiltX : 0,
                scale,
                transformStyle: "preserve-3d",
              }
        }
        animate={
          animate && !reduced
            ? { rotateY: [rotateY - 5, rotateY + 5, rotateY - 5] }
            : undefined
        }
        transition={
          animate && !reduced
            ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <PhoneShape glowOpacity={glowOpacity} reduced={reduced} />
      </motion.div>
    </motion.div>
  );
}

function PhoneShape({
  glowOpacity,
  reduced,
}: {
  glowOpacity: ReturnType<typeof useSpring>;
  reduced: boolean;
}) {
  return (
    <div className="relative" style={{ width: 280, height: 560 }}>
      {/* Body */}
      <div
        className="absolute inset-0 rounded-[44px] overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #202022 0%, #2c2c2e 50%, #1a1a1c 100%)",
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.13)",
            "0 50px 140px rgba(0,0,0,0.85)",
            "inset 0 1px 0 rgba(255,255,255,0.18)",
            "inset 0 -1px 0 rgba(0,0,0,0.5)",
            "20px 0 60px rgba(59,130,246,0.07)",
            "-20px 0 60px rgba(139,92,246,0.07)",
          ].join(", "),
        }}
      >
        {/* Screen area */}
        <div
          className="absolute rounded-[36px] overflow-hidden"
          style={{ top: 12, left: 12, right: 12, bottom: 12 }}
        >
          {/* Wallpaper gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #0a0a1a 0%, #000000 60%, #050510 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.28) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.22) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.07) 0%, transparent 60%)",
            }}
          />

          {/* Dynamic Island */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black z-20 overflow-hidden flex items-center justify-center"
            style={{ top: 14, width: 110, height: 32 }}
            animate={reduced ? {} : { width: [110, 118, 110] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            {/* Camera dot inside Dynamic Island */}
            <div
              className="absolute right-3 rounded-full"
              style={{ width: 10, height: 10, background: "radial-gradient(circle, #1a1a1a, #000)", border: "1px solid rgba(255,255,255,0.05)" }}
            />
          </motion.div>

          {/* Clock */}
          <div className="absolute inset-0 flex flex-col pt-16 px-4">
            <div className="text-center mb-4">
              <div className="text-white text-4xl font-thin tracking-tight">09:41</div>
              <div className="text-white/40 text-[11px] mt-0.5">Четверг, 26 июня</div>
            </div>

            {/* Widgets */}
            <div className="flex gap-2 mb-3">
              {[
                { title: "ПОГОДА", value: "23°", sub: "Ясно" },
                { title: "БАТАРЕЯ", value: "94%", sub: "Не заряжается" },
              ].map((w) => (
                <div
                  key={w.title}
                  className="flex-1 rounded-2xl p-3"
                  style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
                >
                  <div className="text-white/30 text-[8px] mb-1 tracking-wider">{w.title}</div>
                  <div className="text-white text-base font-light">{w.value}</div>
                  <div className="text-white/40 text-[8px]">{w.sub}</div>
                </div>
              ))}
            </div>

            {/* App grid */}
            <div className="grid grid-cols-4 gap-2.5 px-0.5">
              {[
                "#007AFF", "#34C759", "#FF3B30", "#FF9500",
                "#5AC8FA", "#AF52DE", "#FF6B6B", "#30B0C7",
              ].map((color, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-[14px] flex items-center justify-center"
                  style={{ background: color + "22", border: "1px solid " + color + "28" }}
                  animate={reduced ? {} : { scale: [1, 1.04, 1] }}
                  transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                >
                  <div className="w-5 h-5 rounded-lg" style={{ background: color + "55" }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Screen reflection */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(140deg, rgba(255,255,255,0.055) 0%, transparent 45%)",
            }}
          />

          {/* Animated scan line */}
          {!reduced && (
            <motion.div
              className="absolute left-0 right-0 h-[1px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
                opacity: 0.6,
              }}
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Buttons */}
        {[
          { side: "left", top: 100, height: 22, color: "#5e5ce6", style: "rounded-r-sm" },
          { side: "left", top: 132, height: 32, color: "#3a3a3c", style: "rounded-r-sm" },
          { side: "left", top: 172, height: 32, color: "#3a3a3c", style: "rounded-r-sm" },
          { side: "right", top: 150, height: 72, color: "#3a3a3c", style: "rounded-l-sm" },
        ].map((btn, i) => (
          <div
            key={i}
            className={`absolute ${btn.style}`}
            style={{
              [btn.side]: -3,
              top: btn.top,
              width: 3,
              height: btn.height,
              background: `linear-gradient(to ${btn.side === "left" ? "right" : "left"}, ${btn.color}, #2c2c2e)`,
            }}
          />
        ))}

        {/* Camera module */}
        <div
          className="absolute rounded-[20px]"
          style={{
            top: 20, right: 20, width: 90, height: 90,
            background: "linear-gradient(135deg, #181818, #2a2a2c)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07), 0 4px 12px rgba(0,0,0,0.6)",
          }}
        >
          {/* Lenses */}
          {[
            { top: 12, left: 12, size: 27 },
            { top: 12, left: 51, size: 27 },
            { top: 51, left: 12, size: 27 },
          ].map((lens, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: lens.top, left: lens.left, width: lens.size, height: lens.size,
                background: "radial-gradient(circle at 35% 35%, #0e0e12, #080808)",
                boxShadow:
                  "inset 0 0 0 2px rgba(255,255,255,0.07), 0 0 0 1px rgba(0,0,0,0.9), inset 0 2px 6px rgba(59,130,246,0.2)",
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  top: 4, left: 4, width: 7, height: 7,
                  background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent)",
                }}
              />
              {!reduced && (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    top: 3, right: 3, width: 4, height: 4,
                    background: "radial-gradient(circle, rgba(59,130,246,0.5), transparent)",
                  }}
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 2 + i * 0.7, repeat: Infinity }}
                />
              )}
            </div>
          ))}

          {/* Flash */}
          <motion.div
            className="absolute rounded-full"
            style={{
              top: 53, left: 53, width: 20, height: 20,
              background: "radial-gradient(circle, rgba(255,225,100,0.7), rgba(255,180,50,0.35))",
            }}
            animate={reduced ? {} : { boxShadow: ["0 0 6px rgba(255,200,50,0.3)", "0 0 16px rgba(255,200,50,0.7)", "0 0 6px rgba(255,200,50,0.3)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Body edge shine */}
      <div
        className="absolute inset-0 rounded-[44px] pointer-events-none"
        style={{
          background:
            "linear-gradient(108deg, rgba(255,255,255,0.07) 0%, transparent 35%, rgba(255,255,255,0.02) 100%)",
        }}
      />

      {/* Mouse-following glow overlay */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 rounded-[44px] pointer-events-none"
          style={{
            opacity: glowOpacity,
            background:
              "radial-gradient(circle at 50% 30%, rgba(59,130,246,0.08) 0%, transparent 60%)",
          }}
        />
      )}

      {/* Floor reflection */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2"
        style={{
          width: 220, height: 40,
          background: "radial-gradient(ellipse, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}
