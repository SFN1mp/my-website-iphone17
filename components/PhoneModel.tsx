"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface PhoneModelProps {
  rotateY?: number;
  scale?: number;
  className?: string;
  animate?: boolean;
}

// Псевдо-3D телефон без WebGL — чистый CSS + SVG
export default function PhoneModel({
  rotateY = 0,
  scale = 1,
  className = "",
  animate = true,
}: PhoneModelProps) {
  return (
    <motion.div
      className={`relative select-none ${className}`}
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
    >
      <motion.div
        style={{
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        animate={animate ? { rotateY: [rotateY - 5, rotateY + 5, rotateY - 5] } : undefined}
        transition={animate ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <PhoneShape />
      </motion.div>
    </motion.div>
  );
}

function PhoneShape() {
  return (
    <div className="relative" style={{ width: 280, height: 560 }}>
      {/* Phone body */}
      <div
        className="absolute inset-0 rounded-[44px] overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1c1c1e 0%, #2c2c2e 40%, #1a1a1c 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.12), 0 40px 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.4), 20px 0 60px rgba(59,130,246,0.06), -20px 0 60px rgba(139,92,246,0.06)",
        }}
      >
        {/* Screen */}
        <div
          className="absolute rounded-[36px] overflow-hidden"
          style={{
            top: 12,
            left: 12,
            right: 12,
            bottom: 12,
            background: "linear-gradient(160deg, #0a0a1a 0%, #000000 60%, #050510 100%)",
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black z-20"
            style={{ top: 14, width: 110, height: 32 }}
          />

          {/* Screen content — gradient wallpaper */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.25) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.2) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 60%)",
            }}
          />

          {/* iOS-like UI elements */}
          <div className="absolute inset-0 flex flex-col pt-16 px-4">
            {/* Time */}
            <div className="text-center mb-4">
              <div className="text-white text-4xl font-thin tracking-tight">09:41</div>
              <div className="text-white/50 text-xs mt-1">Четверг, 26 июня</div>
            </div>

            {/* Widgets row */}
            <div className="flex gap-2 mb-3">
              <div
                className="flex-1 rounded-2xl p-3"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}
              >
                <div className="text-white/40 text-[9px] mb-1">ПОГОДА</div>
                <div className="text-white text-lg font-light">23°</div>
                <div className="text-white/50 text-[9px]">Ясно</div>
              </div>
              <div
                className="flex-1 rounded-2xl p-3"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}
              >
                <div className="text-white/40 text-[9px] mb-1">БАТАРЕЯ</div>
                <div className="text-white text-lg font-light">94%</div>
                <div className="text-white/50 text-[9px]">Не заряжается</div>
              </div>
            </div>

            {/* App icons grid */}
            <div className="grid grid-cols-4 gap-3 px-1">
              {[
                { color: "#007AFF", label: "Фото" },
                { color: "#34C759", label: "Телефон" },
                { color: "#FF3B30", label: "Почта" },
                { color: "#FF9500", label: "Safari" },
                { color: "#5AC8FA", label: "Карты" },
                { color: "#AF52DE", label: "Музыка" },
                { color: "#FF6B6B", label: "Камера" },
                { color: "#30B0C7", label: "Сообщ." },
              ].map((app, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-2xl flex items-center justify-center"
                  style={{ background: app.color + "20", border: "1px solid " + app.color + "30" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div
                    className="w-6 h-6 rounded-xl"
                    style={{ background: app.color + "60" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reflection overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Side buttons */}
        {/* Volume up */}
        <div
          className="absolute rounded-r-sm"
          style={{
            left: -3,
            top: 130,
            width: 3,
            height: 32,
            background: "linear-gradient(to right, #3a3a3c, #2c2c2e)",
          }}
        />
        {/* Volume down */}
        <div
          className="absolute rounded-r-sm"
          style={{
            left: -3,
            top: 170,
            width: 3,
            height: 32,
            background: "linear-gradient(to right, #3a3a3c, #2c2c2e)",
          }}
        />
        {/* Power button */}
        <div
          className="absolute rounded-l-sm"
          style={{
            right: -3,
            top: 150,
            width: 3,
            height: 72,
            background: "linear-gradient(to left, #3a3a3c, #2c2c2e)",
          }}
        />

        {/* Action button */}
        <div
          className="absolute rounded-r-sm"
          style={{
            left: -3,
            top: 100,
            width: 3,
            height: 22,
            background: "linear-gradient(to right, #5e5ce6, #4a48d4)",
          }}
        />

        {/* Camera module */}
        <div
          className="absolute rounded-[20px]"
          style={{
            top: 20,
            right: 20,
            width: 88,
            height: 88,
            background: "linear-gradient(135deg, #1a1a1c, #2c2c2e)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {/* Camera lenses */}
          {[
            { top: 12, left: 12, size: 26, color: "#0d0d0f" },
            { top: 12, left: 50, size: 26, color: "#0a0a10" },
            { top: 50, left: 12, size: 26, color: "#0c0c0e" },
          ].map((lens, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: lens.top,
                left: lens.left,
                width: lens.size,
                height: lens.size,
                background: lens.color,
                boxShadow:
                  "inset 0 0 0 2px rgba(255,255,255,0.06), 0 0 0 1px rgba(0,0,0,0.8), inset 0 2px 4px rgba(59,130,246,0.15)",
              }}
            >
              {/* Lens reflection */}
              <div
                className="absolute rounded-full"
                style={{
                  top: 4,
                  left: 4,
                  width: 6,
                  height: 6,
                  background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent)",
                }}
              />
            </div>
          ))}
          {/* Flash */}
          <div
            className="absolute rounded-full"
            style={{
              top: 52,
              left: 52,
              width: 20,
              height: 20,
              background:
                "radial-gradient(circle, rgba(255,220,100,0.6), rgba(255,180,50,0.3))",
              boxShadow: "0 0 8px rgba(255,200,50,0.4)",
            }}
          />
        </div>
      </div>

      {/* Body shine lines */}
      <div
        className="absolute inset-0 rounded-[44px] pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(255,255,255,0.03) 100%)",
        }}
      />

      {/* Bottom reflection / shadow */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2"
        style={{
          width: 200,
          height: 30,
          background: "radial-gradient(ellipse, rgba(59,130,246,0.25) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}
