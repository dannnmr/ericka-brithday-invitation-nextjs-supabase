"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "../config/invitation";
import { SectionHeader } from "./ui/SectionHeader";
import { AnimatedSection } from "./ui/AnimatedSection";

export function Passes() {
  return (
    <section className="relative w-full py-12 px-4 bg-transparent overflow-hidden flex flex-col items-center">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-2 md:px-4 flex flex-col items-center gap-1 relative z-10 w-full">

        {/* Section Header */}
        <SectionHeader
          title={siteConfig.passes.mainTitle}
          subtitle={siteConfig.passes.topLabel}
          titleClassName="font-pinyon text-5xl md:text-6xl text-[#2C4A3E]"
          subtitleClassName="text-[#C5A059] tracking-[0.4em] font-sans font-medium text-xs mb-1"
        />

        {/* Boarding Pass Safari Card Wrapper */}
        <AnimatedSection once className="w-full">
          <div className="relative w-full pt-10 md:pt-16">
            {/* Lying Leopard sitting on top of the boarding pass (Position adjusted by User) */}
            <div className="absolute top-[-26px] sm:top-2 md:top-2 left-[-10] -translate-x-2 w-48 sm:w-64 md:w-80 h-56 sm:h-24 md:h-65 z-50 pointer-events-none select-none rotate-5">
              <Image
                src="/images/decorativas_v2/leopardo_acostado.png"
                alt="Leopardo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full flex rounded-2xl md:rounded-3xl overflow-hidden shadow-md relative bg-[#1B2A22] text-[#FAF4EA] border border-[#C5A059]/40 max-w-[95vw] md:max-w-none mx-auto"
            >
              {/* Left Main Body */}
              <div className="flex-1 flex p-2.5 min-[350px]:p-3 md:p-6 relative justify-between items-center gap-2 min-[350px]:gap-4 md:gap-6">
                {/* Gold Filigree Background details */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.08)_0%,transparent_80%)] pointer-events-none z-0" />

                <div className="flex-1 flex flex-col justify-between py-1 md:py-4 relative z-10">
                  {/* Header: VIP PASS + Compass Icon */}
                  <div>
                    <div className="flex items-center gap-1.5 min-[350px]:gap-2 md:gap-4 mb-0.5 md:mb-4">
                      <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-tight text-[#C5A059] leading-none z-50">
                        VIP PASS
                      </h2>
                      <Compass className="w-3.5 h-3.5 md:w-8 md:h-8 text-[#C5A059] shrink-0" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 min-[350px]:gap-3 mt-1 md:mt-2">
                      <span className="inline-flex items-center gap-1 bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-serif font-bold uppercase tracking-widest text-[8px] min-[350px]:text-[10px] md:text-sm px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                        {siteConfig.passes.quantity} {siteConfig.passes.unitText}
                      </span>
                      <span className="font-sans text-[7.5px] min-[350px]:text-[9px] md:text-xs text-neutral-400 uppercase tracking-widest whitespace-nowrap">por invitación</span>
                    </div>
                  </div>

                  {/* Data Grid */}
                  <div className="grid grid-cols-2 gap-2 md:gap-6 mt-3 md:mt-10 mb-2 md:mb-8 w-full max-w-[150px] min-[350px]:max-w-[200px] md:max-w-md">
                    <div className="flex flex-col items-start">
                      <span className="font-serif font-bold text-[7.5px] min-[350px]:text-[9px] md:text-xs uppercase tracking-wider text-[#C5A059]">DATE</span>
                      <span className="font-sans font-bold text-[8.5px] min-[350px]:text-[10.5px] md:text-base mt-0.5 text-white whitespace-nowrap">
                        {siteConfig.event.date.day}, {siteConfig.event.date.month}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-serif font-bold text-[7.5px] min-[350px]:text-[9px] md:text-xs uppercase tracking-wider text-[#C5A059] text-right">HOUR</span>
                      <span className="font-sans font-bold text-[8.5px] min-[350px]:text-[10.5px] md:text-base mt-0.5 text-white whitespace-nowrap text-right">
                        {siteConfig.event.time}
                      </span>
                    </div>
                  </div>

                  {/* Invitation Text / I am coming */}
                  <div>
                    <h1 className="text-[13px] min-[350px]:text-[15px] min-[380px]:text-lg md:text-3xl font-pinyon text-[#C5A059] whitespace-nowrap">
                      ¡Te espero para celebrar!
                    </h1>
                  </div>
                </div>

                {/* Circular Vintage Compass Seal (Safari style adapted to Gold/Imperial colors) */}
                <div className="flex flex-col items-center justify-center p-1.5 min-[350px]:p-3 border border-dashed border-[#C5A059]/40 rounded-full w-16 h-16 min-[350px]:w-20 min-[350px]:h-20 md:w-24 md:h-24 shrink-0 relative select-none bg-white/5 shadow-xs z-10">
                  <span className="text-[4px] min-[350px]:text-[5px] md:text-[6px] font-sans font-extrabold tracking-[0.25em] text-[#C5A059] uppercase absolute top-1.5 min-[350px]:top-2 md:top-3">
                    ERICKA
                  </span>
                  <div className="w-9 h-9 min-[350px]:w-12 min-[350px]:h-12 md:w-14 md:h-14 rounded-full border border-dashed border-[#C5A059]/30 flex flex-col items-center justify-center bg-black/10">
                    <Compass className="w-4.5 h-4.5 min-[350px]:w-6 min-[350px]:h-6 md:w-7 md:h-7 text-[#C5A059] stroke-[1.2]" />
                  </div>
                  <span className="text-[4px] min-[350px]:text-[5px] md:text-[6px] font-sans tracking-[0.2em] text-neutral-400 uppercase absolute bottom-1 min-[350px]:bottom-1.5 md:bottom-3">
                    19 junio
                  </span>
                </div>
              </div>

              {/* Perforated Separator */}
              <div className="relative w-3 md:w-6 flex flex-col items-center justify-between bg-transparent shrink-0">
                <div className="absolute top-[-8px] md:top-[-12px] w-4 h-4 md:w-8 md:h-8 rounded-full bg-[#050505] border-b border-[#C5A059]/20 z-10" />
                <div className="h-full w-0 border-l border-dashed border-[#C5A059]/30 my-4" />
                <div className="absolute bottom-[-8px] md:bottom-[-12px] w-4 h-4 md:w-8 md:h-8 rounded-full bg-[#050505] border-t border-[#C5A059]/20 z-10" />
              </div>

              {/* Stub (Right Side) */}
              <div className="w-16 sm:w-20 md:w-48 relative bg-white/5 flex flex-col items-center justify-center overflow-hidden shrink-0 border-l border-white/5">
                {/* Grayscale Leopard background */}
                <div className="absolute inset-0 w-full h-full opacity-30">
                  <Image
                    src="/images/decorativas_v2/leopardo_acostado.png"
                    alt="Leopardo"
                    fill
                    className="object-cover object-center grayscale opacity-80 mix-blend-multiply"
                  />
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 md:h-4 bg-[#C5A059]" />

                {/* Vertical text "XV" */}
                <div className="absolute top-[-20px] md:top-4 right-1.5 md:right-6 z-10 flex h-[80%] items-center justify-center">
                  <span
                    className="font-serif font-black text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#C5A059]"
                    style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
                  >
                    XV
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
