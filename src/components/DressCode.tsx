"use client";

import React from "react";
import { SparkleField } from "./ui/SparkleField";
import { motion } from "framer-motion";
import { siteConfig } from "../config/invitation";
import { SectionHeader } from "./ui/SectionHeader";
import { FloatingDecoration } from "./ui/FloatingDecoration";

export function DressCode() {
  return (
    <div className="relative w-full bg-transparent overflow-hidden">
      <section className="relative py-12 md:py-16 px-6 md:px-10 flex flex-col items-center overflow-hidden w-full">

        {/* Ambient Glow */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.06)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none z-0" />

        {/* Decorative jungle elements */}
        <FloatingDecoration
          src="/images/decorativas_v2/hojas.png"
          alt="Hojas Selva"
          className="top-[5%] left-[-5%] w-40 h-40 md:w-60 md:h-60 opacity-20 pointer-events-none z-0"
          animationStyle="float"
        />
        <FloatingDecoration
          src="/images/decorativas_v2/leopardo_mirando_costado.png"
          alt="Leopardo"
          className="bottom-[2%] right-[-5%] w-44 h-44 md:w-64 md:h-64 opacity-85 pointer-events-none z-0"
          animationStyle="float"
        />

        <SparkleField mobileCount={4} desktopCount={12} />

        <div className="relative z-10 max-w-4xl text-center w-full flex flex-col items-center pt-4">
          <SectionHeader
            title={siteConfig.dressCode.mainTitle}
            subtitle={siteConfig.dressCode.topLabel}
            titleClassName="font-pinyon text-5xl md:text-6xl text-[#2C4A3E]"
            subtitleClassName="text-[#C5A059] tracking-[0.5em] font-sans font-bold text-[10px] md:text-xs mb-2"
            className="mb-0"
          />

          {/* Card Marfil Esmerilado */}
          <div className="flex flex-col items-center w-full mt-2 card-glass max-w-2xl p-4 md:p-10 rounded-3xl">

            {/* Sello Central VIP estilo Safari Gold */}
            <div className="mb-2 md:mb-4 relative flex items-center justify-center w-[160px] h-[160px] md:w-[220px] md:h-[220px]">

              {/* Aro dorado exterior */}
              <div className="absolute w-[150px] h-[150px] md:w-[208px] md:h-[208px] rounded-full border border-[#C5A059]/20 blur-[2px] pointer-events-none" />
              <div className="absolute w-[138px] h-[138px] md:w-[190px] md:h-[190px] rounded-full border border-[#C5A059]/10 pointer-events-none" />

              {/* Línea punteada giratoria dorada */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
                className="absolute w-[144px] h-[144px] md:w-[200px] md:h-[200px] rounded-full border border-dashed border-[#C5A059]/35 pointer-events-none"
              />

              {/* Sello Metalizado Oro */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center justify-center w-28 h-28 md:w-38 md:h-38 rounded-full bg-gradient-to-b from-[#C5A059] via-[#E6D5B8] to-[#9A7B3E] p-[1.5px] shadow-[0_10px_25px_rgba(197,160,89,0.15)] transition-transform duration-700 ease-out z-10"
              >
                <div className="w-full h-full bg-[#2E1E15] rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-[5px] md:inset-[8px] border border-[#C5A059]/20 rounded-full pointer-events-none" />
                  <span className="font-serif text-lg md:text-2xl tracking-[0.25em] text-[#FAF4EA] font-bold uppercase text-center z-10 ml-1.5">
                    {siteConfig.dressCode.type}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Colores Reservados */}
            <div className="flex flex-col gap-2 text-center max-w-xl w-full mx-auto px-2">
              <div className="flex flex-col items-center gap-2.5">

                {/* Círculos Blanco y Dorado */}
                <div className="flex items-center justify-center gap-4 mb-1">
                  <div className="w-7 h-7 rounded-full bg-white shadow-xs border border-[#C5A059]/40" />
                  <div className="w-px h-5 bg-[#C5A059]/20" />
                  <div className="w-7 h-7 rounded-full bg-[#C5A059] shadow-xs border border-white/20" />
                </div>

                <p className="font-sans text-[10px] md:text-[11px] text-[#FAF4EA]/80 leading-relaxed tracking-[0.2em] uppercase max-w-sm">
                  {siteConfig.dressCode.reservedColorsText.prefix}{" "}
                  <strong className="text-[#C5A059] font-black tracking-[0.22em]">
                    {siteConfig.dressCode.reservedColorsText.color1}
                  </strong>{" "}
                  Y{" "}
                  <strong className="text-[#C5A059] font-black tracking-[0.22em]">
                    {siteConfig.dressCode.reservedColorsText.color2}
                  </strong>
                  <br />
                  <span className="mt-1.5 block text-[8px] tracking-[0.18em] text-[#C5A059]">
                    ESTÁN RESERVADOS EXCLUSIVAMENTE PARA LA QUINCEAÑERA.
                  </span>
                </p>
              </div>

              <div className="w-12 h-px bg-[#C5A059]/20 mx-auto mt-2" />

              {/* Notas extra */}
              <p className="font-sans text-[9px] md:text-[10px] text-[#FAF4EA]/80 leading-relaxed tracking-[0.2em] uppercase max-w-xs mx-auto">
                {siteConfig.dressCode.extraNotes.prefix}{" "}
                <strong className="text-[#C5A059] font-bold">
                  {siteConfig.dressCode.extraNotes.highlight}
                </strong>{" "}
                {siteConfig.dressCode.extraNotes.suffix}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
