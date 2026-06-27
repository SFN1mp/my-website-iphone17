"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

const navLinks = [
  { href: "#how-it-works", label: "Обзор" },
  { href: "#camera", label: "Камера" },
  { href: "#performance", label: "Мощность" },
  { href: "#display", label: "Дисплей" },
  { href: "#specs", label: "Характеристики" },
  { href: "#price", label: "Цена" },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  // Smooth blur/opacity on scroll
  const rawBg = useTransform(scrollY, [0, 80], [0, 1]);
  const bgOpacity = useSpring(rawBg, { stiffness: 100, damping: 20 });
  const navHeight = useTransform(scrollY, [0, 100], [64, 52]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{ height: navHeight }}
      >
        {/* Animated glass background */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: bgOpacity,
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.055)",
          }}
        />

        {/* Thin progress line at bottom of nav */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            width: useTransform(scrollY, [0, 5000], ["0%", "100%"]),
            opacity: bgOpacity,
          }}
        />

        {/* Logo */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="relative z-10 text-white/90 text-sm font-semibold tracking-tight flex items-center gap-1.5"
          style={{ scale: logoScale }}
          whileHover={{ opacity: 0.75 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white">iPhone 17</span>
          <motion.span
            className="text-blue-400"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Pro Max
          </motion.span>
        </motion.button>

        {/* Desktop nav links */}
        <ul className="relative z-10 hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <li key={link.href} className="relative">
                <button
                  onClick={() => scrollTo(link.href)}
                  className="relative px-3 py-1.5 text-sm transition-colors duration-200 rounded-full"
                  style={{ color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA button */}
        <motion.button
          onClick={() => scrollTo("#price")}
          className="relative z-10 hidden md:block text-xs font-semibold px-4 py-2 rounded-full"
          style={{
            background: "rgba(255,255,255,0.9)",
            color: "black",
          }}
          whileHover={{
            scale: 1.05,
            background: "rgba(255,255,255,1)",
            boxShadow: "0 0 20px rgba(255,255,255,0.3)",
          }}
          whileTap={{ scale: 0.96 }}
        >
          Цена
        </motion.button>

        {/* Mobile burger */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-10 md:hidden text-white p-2"
          aria-label="Меню"
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-5 flex flex-col gap-[5px]">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-[1.5px] bg-white rounded-full origin-center"
                animate={
                  menuOpen
                    ? i === 0
                      ? { rotate: 45, y: 6.5 }
                      : i === 1
                      ? { opacity: 0, scaleX: 0 }
                      : { rotate: -45, y: -6.5 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
        </motion.button>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(40px)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-16" />
            <ul className="flex flex-col items-center justify-center flex-1 gap-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white text-3xl font-semibold tracking-tight hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => scrollTo("#price")}
                  className="mt-4 px-8 py-3 rounded-full bg-white text-black font-semibold text-lg"
                >
                  Посмотреть цену
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
