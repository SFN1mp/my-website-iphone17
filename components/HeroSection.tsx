"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useRef } from "react";
import { heroData } from "@/data/iphone17ProMax";
import PhoneModel from "./PhoneModel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ─── background particles ─────────────────────────────────── */
function Particle({ x, y, color, delay }: { x: string; y: string; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: 3, height: 3, background: color, filter: "blur(1px)" }}
      animate={{ y: [0, -60, 0], opacity: [0, 1, 0], scale: [0, 1.8, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function LightStreak({ angle, delay, color }: { angle: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: "70vw", height: 1.5,
        top: "50%", left: "20%",
        transformOrigin: "left center",
        rotate: angle,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }}
      animate={{ opacity: [0, 0.6, 0], scaleX: [0, 1, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

export default function HeroSection() {
  /* The outer wrapper is tall (170vh) so scroll happens INSIDE it
     while the inner content stays sticky at the top of the viewport. */
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  /* ─── phone transforms driven by scroll ─── */
  const raw = {
    scale:   useTransform(scrollYProgress, [0, 0.5, 1], [1,    1.35,  1.5]),
    rotY:    useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 28, -15, 10]),
    rotX:    useTransform(scrollYProgress, [0, 0.5, 1], [0, -10, 4]),
    y:       useTransform(scrollYProgress, [0, 1], [0, -120]),
    glow:    useTransform(scrollYProgress, [0, 0.5], [0.45, 1.0]),
  };

  const springCfg = { stiffness: 60, damping: 16 };
  const phone = {
    scale: useSpring(raw.scale, springCfg),
    rotY:  useSpring(raw.rotY,  springCfg),
    rotX:  useSpring(raw.rotX,  springCfg),
    y:     useSpring(raw.y,     { stiffness: 70, damping: 18 }),
    glow:  raw.glow,
  };

  /* ─── parallax layers ─── */
  const bgY    = useTransform(scrollYProgress, [0, 1], [0,  140]);
  const orb1Y  = useTransform(scrollYProgress, [0, 1], [0,  90]);
  const orb2Y  = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOp = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const textY  = useTransform(scrollYProgress, [0, 0.32], [0, -55]);

  /* ─── particles / streaks data ─── */
  const particles = Array.from({ length: 24 }, (_, i) => ({
    x: `${4 + ((i * 19) % 92)}%`,
    y: `${8 + ((i * 27) % 84)}%`,
    color: i % 3 === 0 ? "rgba(99,162,255,0.9)" : i % 3 === 1 ? "rgba(168,118,255,0.9)" : "rgba(52,211,153,0.7)",
    delay: (i * 0.37) % 6,
  }));

  const scrollToFeatures = () =>
    document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
  const scrollToSpecs = () =>
    document.querySelector("#specs")?.scrollIntoView({ behavior: "smooth" });

  return (
    /* ── tall wrapper enables scroll-while-sticky ── */
    <div ref={wrapperRef} style={{ height: "170vh" }} aria-label="Hero секция">
      {/* ── sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: "1200px" }}>

        {/* ── Background layers at different parallax depths ── */}
        <motion.div className="absolute inset-0 animated-gradient" style={{ y: bgY }} />

        {/* Grid */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: useTransform(scrollYProgress, [0,1], [0, 50]), opacity: 0.22 }}
        >
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.07) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}/>
        </motion.div>

        {/* Orbs */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: orb1Y }}>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 800, height: 800, top: "5%", left: "38%",
              background: "radial-gradient(circle,rgba(59,130,246,0.16) 0%,rgba(139,92,246,0.08) 40%,transparent 70%)",
              filter: "blur(50px)",
            }}
            animate={reduced ? {} : { scale: [1,1.15,1], opacity: [0.6,1,0.6] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: orb2Y }}>
          <motion.div className="absolute rounded-full" style={{
            width: 600, height: 600, bottom: "-10%", right: "-5%",
            background: "radial-gradient(circle,rgba(139,92,246,0.14) 0%,transparent 70%)",
            filter: "blur(60px)",
          }} animate={reduced ? {} : { scale:[1,1.2,1] }} transition={{ duration:12,repeat:Infinity,ease:"easeInOut",delay:2 }} />
          <motion.div className="absolute rounded-full" style={{
            width: 400, height: 400, top: "15%", left: "-8%",
            background: "radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%)",
            filter: "blur(50px)",
          }} animate={reduced ? {} : { scale:[1,1.3,1] }} transition={{ duration:14,repeat:Infinity,ease:"easeInOut",delay:4 }} />
        </motion.div>

        {/* Light streaks */}
        {!reduced && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <LightStreak angle={-22} delay={0}   color="rgba(99,162,255,0.5)" />
            <LightStreak angle={18}  delay={2.5} color="rgba(168,118,255,0.4)" />
            <LightStreak angle={-44} delay={5}   color="rgba(52,211,153,0.35)" />
            <LightStreak angle={32}  delay={7.5} color="rgba(99,162,255,0.3)" />
          </div>
        )}

        {/* Particles */}
        {!reduced && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p, i) => <Particle key={i} {...p} />)}
          </div>
        )}

        {/* ── Main layout ── */}
        <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 pt-16">

          {/* Text */}
          <motion.div
            className="flex-1 text-center lg:text-left z-20"
            style={reduced ? {} : { opacity: textOp, y: textY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22,1,0.36,1] }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.28em] uppercase mb-5 px-4 py-2 rounded-full"
                style={{ background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.3)", color:"#60a5fa" }}>
                <motion.span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"
                  animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:1.5,repeat:Infinity }} />
                Только что появился
              </span>
            </motion.div>

            <motion.h1 className="text-hero gradient-text mb-6"
              initial={{ opacity:0, y:50, filter:"blur(14px)" }}
              animate={{ opacity:1, y:0, filter:"blur(0px)" }}
              transition={{ duration:1.1, delay:0.35, ease:[0.22,1,0.36,1] }}>
              {heroData.title}
            </motion.h1>

            <motion.p className="text-subsection text-white/55 mb-3 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity:0, y:30, filter:"blur(8px)" }}
              animate={{ opacity:1, y:0, filter:"blur(0px)" }}
              transition={{ duration:0.9, delay:0.5, ease:[0.22,1,0.36,1] }}>
              {heroData.subtitle}
            </motion.p>

            <motion.p className="text-white/35 text-lg mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.8, delay:0.65, ease:[0.22,1,0.36,1] }}>
              {heroData.description}
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.8, ease:[0.22,1,0.36,1] }}>

              <motion.button onClick={scrollToFeatures}
                className="relative overflow-hidden px-9 py-4 rounded-full text-white font-semibold text-base"
                style={{ background:"linear-gradient(135deg,#3b82f6,#6366f1,#8b5cf6)", boxShadow:"0 0 40px rgba(99,102,241,0.5),0 0 80px rgba(59,130,246,0.2)" }}
                whileHover={{ scale:1.06, boxShadow:"0 0 60px rgba(99,102,241,0.7),0 0 120px rgba(59,130,246,0.35)" }}
                whileTap={{ scale:0.95 }}>
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background:"linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.22) 50%,transparent 65%)" }}
                  animate={reduced ? {} : { x:["-120%","220%"] }}
                  transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut", repeatDelay:1 }} />
                {heroData.ctaPrimary}
              </motion.button>

              <motion.button onClick={scrollToSpecs}
                className="px-9 py-4 rounded-full font-semibold text-base text-white/75 hover:text-white"
                style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.14)", backdropFilter:"blur(20px)" }}
                whileHover={{ scale:1.04, background:"rgba(255,255,255,0.09)", borderColor:"rgba(255,255,255,0.28)" }}
                whileTap={{ scale:0.96 }}>
                {heroData.ctaSecondary}
              </motion.button>
            </motion.div>

            {/* Spec pills */}
            <motion.div className="flex flex-wrap gap-3 mt-11 justify-center lg:justify-start"
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ duration:1, delay:1.1 }}>
              {[
                { label:"Чип",      value:"A19 Pro", color:"#3b82f6" },
                { label:"Камеры",   value:"3×48МП",  color:"#10b981" },
                { label:"Дисплей",  value:'6,9"',    color:"#8b5cf6" },
                { label:"Батарея",  value:"39 ч",    color:"#f59e0b" },
              ].map((s,i) => (
                <motion.div key={s.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full cursor-default"
                  style={{ background:`${s.color}12`, border:`1px solid ${s.color}28` }}
                  initial={{ opacity:0, scale:0.75 }} animate={{ opacity:1, scale:1 }}
                  transition={{ delay:1.15+i*0.08, ease:[0.22,1,0.36,1] }}
                  whileHover={{ scale:1.08, background:`${s.color}22` }}>
                  <span className="text-base font-bold" style={{ color:s.color }}>{s.value}</span>
                  <span className="text-white/28 text-xs">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Phone — scroll-driven 3D */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Glow halos */}
            <motion.div className="absolute rounded-full pointer-events-none"
              style={{
                width:380, height:380,
                background:"radial-gradient(circle,rgba(59,130,246,0.45) 0%,rgba(139,92,246,0.25) 35%,transparent 70%)",
                filter:"blur(50px)",
                opacity: phone.glow,
              }}
              animate={reduced ? {} : { scale:[1,1.18,1] }}
              transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }} />

            <motion.div className="absolute rounded-full pointer-events-none"
              style={{
                width:500, height:220, bottom:"-20px",
                background:"radial-gradient(ellipse,rgba(59,130,246,0.35) 0%,rgba(139,92,246,0.15) 40%,transparent 70%)",
                filter:"blur(35px)",
              }}
              animate={reduced ? {} : { opacity:[0.4,0.9,0.4], scaleX:[0.85,1.1,0.85] }}
              transition={{ duration:5, repeat:Infinity, ease:"easeInOut", delay:1 }} />

            <motion.div
              initial={{ opacity:0, scale:0.72, y:60 }}
              animate={{ opacity:1, scale:1, y:0 }}
              transition={{ duration:1.2, delay:0.45, ease:[0.22,1,0.36,1] }}
              style={reduced ? {} : {
                scale:  phone.scale,
                rotateY: phone.rotY,
                rotateX: phone.rotX,
                y:       phone.y,
                transformStyle:"preserve-3d",
              }}>
              <PhoneModel animate={!reduced} />
            </motion.div>
          </div>
        </div>

        {/* Scroll cue — fades out as user scrolls */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          style={reduced ? {} : { opacity: textOp }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}>
          <span className="text-white/22 text-[10px] tracking-[0.38em] uppercase">Листайте вниз</span>
          <div className="relative w-5 h-8 rounded-full border border-white/14 flex justify-center pt-1.5">
            <motion.div className="w-1 h-1.5 rounded-full bg-white/40"
              animate={{ y:[0,14,0], opacity:[0.9,0.2,0.9] }}
              transition={{ duration:1.9, repeat:Infinity, ease:"easeInOut" }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
