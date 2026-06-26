"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

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
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-14"
        style={{}}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: bgOpacity,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        />

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="relative z-10 text-white/90 text-sm font-semibold tracking-tight"
        >
          iPhone 17 <span className="text-blue-400">Pro Max</span>
        </button>

        {/* Desktop links */}
        <ul className="relative z-10 hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="text-white/60 hover:text-white text-sm transition-colors duration-200"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => scrollTo("#price")}
          className="relative z-10 hidden md:block text-xs font-medium px-4 py-2 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-200"
        >
          Купить
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-10 md:hidden text-white p-2"
          aria-label="Меню"
        >
          <div className="w-5 flex flex-col gap-1">
            <motion.span
              className="block h-[1.5px] bg-white rounded"
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-[1.5px] bg-white rounded"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-[1.5px] bg-white rounded"
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            />
          </div>
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden flex flex-col pt-14"
        style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(40px)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex flex-col items-center justify-center flex-1 gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => scrollTo(link.href)}
                className="text-white text-2xl font-medium"
              >
                {link.label}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}
