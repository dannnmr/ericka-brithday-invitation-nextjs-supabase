"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "../config/invitation";

// Replace with the actual party date
const TARGET_DATE = new Date(siteConfig.event.isoDate).getTime();
console.log("TARGET_DATE", TARGET_DATE);

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch on initial render

  return (
    <div className="relative w-full py-12 md:py-10 px-4 flex flex-col items-center text-center overflow-hidden bg-[#050505]">
      {/* Fondo nocturno VIP (adaptado a tono dorado) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12)_0%,rgba(5,5,5,1)_80%)] z-0 pointer-events-none" />

      {/* Imagen de fondo de ojos de leopardo (ocupa todo el espacio vertical y horizontal) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/images/decorativas_v2/ojos_leopardo.webp"
          alt="Ojos de Leopardo"
          fill
          className="object-cover opacity-30 object-center"
          sizes="100vw"
          priority
        />
        {/* Difuminar bordes izquierdo y derecho */}
        <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-[#050505] to-transparent" />
        {/* Difuminar bordes superior e inferior */}
        <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Liquid Glassmorphism background color blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blob 1: Green/Teal */}
        <motion.div
          animate={{
            x: [-30, 40, -20, -30],
            y: [-40, 30, -10, -40],
            scale: [1, 1.2, 0.85, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[25%] w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#2C4A3E]/20 blur-[70px] md:blur-[90px]"
        />

        {/* Blob 2: Gold */}
        <motion.div
          animate={{
            x: [40, -30, 30, 40],
            y: [30, -40, 20, 30],
            scale: [1, 0.8, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[20%] right-[25%] w-60 h-60 md:w-80 md:h-80 rounded-full bg-[#C5A059]/15 blur-[80px] md:blur-[100px]"
        />

        {/* Blob 3: Soft Sage */}
        <motion.div
          animate={{
            x: [-20, 30, -40, -20],
            y: [30, 20, -30, 30],
            scale: [0.85, 1.15, 0.9, 0.85],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[35%] right-[35%] w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#8E9F93]/15 blur-[60px] md:blur-[80px]"
        />
      </div>

      {/* Imágenes Decorativas (Brillos) */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[5%] w-12 h-12 md:w-20 md:h-20 opacity-20 pointer-events-none mix-blend-screen"
      >
        <Image src="/images/decorativas_v2/flor_dorada.png" alt="Star" fill className="object-contain" />
      </motion.div>
      <motion.div
        animate={{ y: [6, -6, 6], rotate: [3, -3, 3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[15%] right-[8%] w-14 h-14 md:w-24 md:h-24 opacity-15 pointer-events-none mix-blend-screen"
      >
        <Image src="/images/decorativas_v2/flor_dorada.png" alt="Stars" fill className="object-contain" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4 md:mb-6 relative flex flex-col items-center"
        >
          <p className="font-sans text-[8px] min-[380px]:text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-[#C5A059] mb-1 font-black">
            El Gran Día
          </p>
          <h3 className="font-pinyon text-4xl min-[380px]:text-5xl md:text-6xl text-white">
            Falta muy poco...
          </h3>
        </motion.div>

        <div className="flex items-center justify-center gap-1.5 min-[380px]:gap-3 md:gap-6 px-1 md:px-0">
          {[
            { label: "Días", value: timeLeft.days },
            { label: "Horas", value: timeLeft.hours },
            { label: "Minutos", value: timeLeft.minutes },
            { label: "Segundos", value: timeLeft.seconds },
          ].map((item, index, array) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-center group">
                {/* iOS-style liquid glassmorphism card */}
                <div
                  className="liquid-glass-card relative w-14 h-15 min-[380px]:w-16 min-[380px]:h-18 sm:w-20 sm:h-22 md:w-24 md:h-26 lg:w-26 lg:h-28 flex flex-col items-center justify-center mb-3 overflow-hidden"
                >
                  {/* Specular highlight (iOS glass reflection) */}
                  <div className="absolute top-0 left-0 right-0 h-[38%] rounded-t-[20px] rounded-b-[10px] bg-gradient-to-b from-[rgba(255,255,255,0.16)] to-transparent pointer-events-none z-10" />

                  {/* Horizontal split-flap line */}
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-black/40 z-20 shadow-[0_1px_0_rgba(255,255,255,0.08)]" />

                  {/* Value container with flip effect */}
                  <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "400px" }}>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={item.value}
                        initial={{ rotateX: 85, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: -85, opacity: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="absolute text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-white leading-none tracking-tighter origin-center"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        {item.value.toString().padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/5 rounded-tl-sm pointer-events-none" />
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/5 rounded-tr-sm pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/5 rounded-bl-sm pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/5 rounded-tr-sm pointer-events-none" />
                </div>

                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 group-hover:text-[#C5A059] transition-all duration-300">
                  {item.label}
                </span>
              </div>

              {index < array.length - 1 && (
                <div className="flex flex-col items-center justify-start h-full -mx-0.5 md:-mx-1">
                  <div className="flex items-center justify-center h-15 min-[380px]:h-18 sm:h-22 md:h-26 lg:h-28 mb-3">
                    <span className="text-sm sm:text-lg md:text-2xl text-[#C5A059]/60 drop-shadow-[0_0_8px_rgba(197,160,89,0.5)] animate-[pulse_1.5s_infinite] relative -top-0.5 font-bold">
                      •
                    </span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
