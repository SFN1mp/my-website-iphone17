"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/04">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-white/60 font-semibold mb-1">iPhone 17 Pro Max</div>
            <div className="text-white/20 text-xs">
              Информационный сайт · Не является официальным ресурсом Apple Inc.
            </div>
          </div>

          <div className="text-white/20 text-xs text-center">
            <p>Характеристики основаны на официальных данных Apple.</p>
            <p className="mt-1">
              Apple, iPhone, iOS — торговые марки Apple Inc.
            </p>
          </div>

          <div className="text-white/20 text-xs text-right">
            <p>© 2025–2026</p>
            <p className="mt-1">Все права защищены</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
