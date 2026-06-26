"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "clip";
  once?: boolean;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
      scale: direction === "scale" ? 0.88 : 1,
      clipPath: direction === "clip" ? "inset(0 0 100% 0)" : undefined,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      clipPath: direction === "clip" ? "inset(0 0 0% 0)" : undefined,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// Stagger container — children cascade in
export function StaggerContainer({
  children,
  className = "",
  stagger = 0.1,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={
        reduced
          ? {}
          : {
              hidden: {},
              visible: {
                transition: { staggerChildren: stagger, delayChildren },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

// Individual stagger child
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
