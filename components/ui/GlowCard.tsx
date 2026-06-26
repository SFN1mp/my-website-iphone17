"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tiltAmount?: number;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(59,130,246,0.3)",
  tiltAmount = 10,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "800px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      {/* Moving glow spot */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor} 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

// Glow border that tracks the mouse
export function GlowBorderCard({
  children,
  className = "",
  color = "#3b82f6",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      className={`group relative ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3 }}
    >
      {/* Border glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(200px circle at ${mouseX}px ${mouseY}px, ${color}40, transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
