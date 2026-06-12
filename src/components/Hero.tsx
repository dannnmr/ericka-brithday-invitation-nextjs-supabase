"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparkleField } from "./ui/SparkleField";
import Image from "next/image";
import { siteConfig } from "../config/invitation";

export function Hero() {
  return (
    <section className="relative min-h-svh w-full flex flex-col items-center justify-center overflow-hidden bg-background">

      {/* Background Jungle Image (Full Opacity) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/images/decorativas_v2/jungle_background.png"
          alt="Jungle Safari Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Rich Darkening Overlays for Premium Contrast and Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/80" />
        <div className="absolute inset-0 bg-black/15" />
      </div>


      {/* Gold Sparkles */}
      <SparkleField mobileCount={10} desktopCount={25} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Soft Gold/Beige Ambient Vignette */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(197,160,89,0.08)_140%)] pointer-events-none" />

        {/* Foliage/Leaves Ornaments - Background Layer (z-10) */}
        <div className="absolute top-[-6%] left-[-15%] w-80 h-80 md:w-80 md:h-80 z-10 pointer-events-none opacity-70 rotate-55">
          <Image src="/images/decorativas_v2/rama_serpiente3.png" alt="Selva" fill className="object-contain" />

        </div>

        <div className="absolute top-[1%] right-[-25%] w-55 h-55 md:w-80 md:h-80 z-5 pointer-events-none opacity-70 rotate-40">
          <Image src="/images/decorativas_v2/hojas_elechos.png" alt="Flor Dorada" fill className="object-contain" />
        </div>
        <div className="absolute top-[-10%] right-[10%] w-55 h-55 md:w-80 md:h-80 z-2 pointer-events-none opacity-50 rotate-40">
          <Image src="/images/decorativas_v2/hojas_elechos.png" alt="Flor Dorada" fill className="object-contain" />
        </div>

        {/* Leopardo Mirando Costado - Centro Inferior (z-20) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[480px] h-[68vh] md:h-[50vh] z-20 md:z-40 pointer-events-none flex items-end justify-center opacity-61">
          <div className="relative w-full h-full">
            <Image
              src="/images/decorativas_v2/leopardo_mirando_costado.png"
              alt="Leopardo"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>

        {/* Hojas del primer plano para el efecto de profundidad (z-30) */}
        {/* Hojas inferiores2 encima del leopardo */}
        <div className="absolute bottom-[-3%] left-0 w-full z-30 md:z-20 pointer-events-none opacity-75">
          <img
            src="/images/decorativas_v2/hojas_inferior.png"
            alt="Hojas Primer Plano"
            className="w-full h-auto object-contain object-bottom"
          />
        </div>

        {/* Contenido Principal (z-40) */}
        {/* Middle Section (Name + Monogram): perfectly centered vertically and horizontally */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[95%] md:max-w-xl z-40 text-center pointer-events-none flex flex-col items-center justify-center">

          <div className="relative flex items-center justify-center w-full py-12">

            {/* Top section: eventType badge (50px separation from middle content) */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="relative inline-block bg-white/90 border border-[#C5A059] px-6 py-2 rounded-full shadow-sm">
                <h2 className="relative text-[#2E1E15] tracking-[0.4em] font-sans font-bold text-[10px] md:text-xs uppercase z-10">
                  {siteConfig.client.eventType}
                </h2>
              </div>
            </div>

            {/* Monograma de fondo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] z-0 pointer-events-none flex items-center justify-center select-none opacity-30">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 md:w-[320px] md:h-[320px] rounded-full border border-[#C5A059]/20 flex items-center justify-center"
              >
                {[0, 35, 70, 105, 140, 175, 210, 245, 280, 315].map((deg, idx) => (
                  <div
                    key={idx}
                    className="absolute w-1 h-1 bg-[#C5A059] rounded-full"
                    style={{
                      transform: `rotate(${deg}deg) translate(clamp(130px, 1vw, 170px))`,
                    }}
                  />
                ))}
              </motion.div>

              <svg viewBox="0 0 300 200" className="w-[110%] h-[110%] md:w-[420px] md:h-[420px] select-none">
                <defs>
                  <linearGradient id="xvGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B38F4D" />
                    <stop offset="50%" stopColor="#E6D5B8" />
                    <stop offset="100%" stopColor="#9A7B3E" />
                  </linearGradient>
                </defs>

                <circle cx="150" cy="100" r="92" stroke="url(#xvGoldGrad)" strokeWidth="0.5" strokeDasharray="0.4" opacity="4.4" />
                <line x1="20" y1="20" x2="280" y2="20" stroke="url(#xvGoldGrad)" strokeWidth="0.75" opacity="4.3" />
                <line x1="20" y1="180" x2="280" y2="180" stroke="url(#xvGoldGrad)" strokeWidth="0.75" opacity="4.3" />

                <text
                  x="50%"
                  y="58%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="none"
                  stroke="url(#xvGoldGrad)"
                  strokeWidth="1.3"
                  className="font-serif text-[150px] font-light tracking-[0.08em]"
                  style={{
                    fontFamily: "var(--font-serif), Didot, Cinzel, Georgia, serif",
                  }}
                >
                  XV
                </text>
              </svg>
            </div>

            {/* Nombre Quinceañera (con leading-none/py-6 para evitar cortes de la 'E') */}
            <motion.h1
              animate={{ opacity: [0.95, 1, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative text-[5.2rem] min-[380px]:text-[6.5rem] md:text-[9rem] lg:text-[11rem] font-pinyon bg-gradient-to-b from-[#FAF4EA] via-[#FAF4EA] to-[#C5A059] bg-clip-text text-transparent leading-none py-6 z-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]"
            >
              {siteConfig.client.name}
            </motion.h1>
          </div>
        </div>

        {/* Bottom section: Frase en Tarjeta Clara Esmerilada */}
        <div className="absolute bottom-[18vh] min-[380px]:bottom-[15vh] left-1/2 -translate-x-1/2 w-full max-w-[90%] md:max-w-md px-4 flex justify-center pointer-events-auto z-50">
          <div
            className="liquid-glass-card relative w-full px-4 py-3 min-[380px]:px-6 min-[380px]:py-5 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
          >
            {/* Specular highlight (iOS glass reflection) */}
            <div className="absolute top-0 left-0 right-0 h-[38%] rounded-t-[20px] rounded-b-[10px] bg-gradient-to-b from-[rgba(255,255,255,0.16)] to-transparent pointer-events-none z-10" />

            <p className="relative font-sans text-[10.5px] min-[380px]:text-xs md:text-sm font-light italic text-center leading-relaxed text-[#FAF4EA] tracking-wide z-20">
              "{siteConfig.client.finalPhrase}"
            </p>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
