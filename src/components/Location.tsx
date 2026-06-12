"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navigation, CalendarPlus } from "lucide-react";
import { Countdown } from "./Countdown";
import { siteConfig } from "../config/invitation";
import { SectionHeader } from "./ui/SectionHeader";
import { AnimatedSection } from "./ui/AnimatedSection";
import { FloatingDecoration } from "./ui/FloatingDecoration";
import { getCalendarLinks } from "../lib/calendar";

export function Location() {
  const handleAddToCalendar = () => {
    const isApple =
      /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const { googleUrl, icsUrl } = getCalendarLinks();

    if (isApple) {
      const link = document.createElement("a");
      link.href = icsUrl;
      link.download = `xv-${siteConfig.client.name.toLowerCase().replace(/\s+/g, "-")}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(googleUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="relative py-12 bg-transparent w-full flex flex-col items-center overflow-hidden">

      {/* Safari Theme Corner Ornaments */}
      <FloatingDecoration
        src="/images/decorativas_v2/leopardo_acostado2.png"
        alt="Hojas Selva Izquierda"
        className="bottom-[-5%] left-0 w-full h-85 md:h-72 opacity-70"
        imgClassName="object-cover object-bottom"
        animationStyle="float"
      />
      <FloatingDecoration
        src="/images/decorativas_v2/leopardo_mirando_alfrente.png"
        alt="Leopardo"
        className="top-[10%] -right-18 md:right-[5%] w-60 h-60 md:w-80 md:h-80 opacity-80"
        animationStyle="float"
      />

      <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col items-center">

        {/* Save The Date Event Card */}
        <AnimatedSection
          once
          className="flex flex-col items-center justify-center text-center w-full mb-2"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl mx-auto mb-10 md:mb-14 relative px-0"
          >
            {/* Soft Ambient Glows */}
            <div className="absolute -top-10 left-1/4 w-40 h-40 bg-[#C5A059]/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-6 right-1/4 w-32 h-32 bg-[#FAF4EA]/3 rounded-full blur-[50px] pointer-events-none" />

            {/* Main Date Card */}
            <div className="relative rounded-3xl overflow-hidden card-glass p-0 shadow-sm border border-[#C5A059]/25">

              {/* Elegant Gold Top Border */}
              <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent relative z-10" />

              <div className="relative flex flex-col px-0 pt-0 pb-0 overflow-hidden z-10">

                {/* Day Watermark + Layout */}
                <div className="relative flex items-center justify-between px-2 min-[350px]:px-6 md:px-10 pt-4 min-[350px]:pt-5 md:pt-6 pb-2">

                  {/* Watermark Big Number */}
                  <span
                    className="absolute -right-2 md:right-4 top-1/2 -translate-y-1/2 font-serif font-black select-none pointer-events-none leading-none opacity-20"
                    style={{
                      fontSize: "clamp(6rem, 20vw, 12rem)",
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(197, 160, 89, 0.18)",
                    }}
                  >
                    {siteConfig.event.date.day}
                  </span>

                  {/* Left Side: Save the Date Badge + Real Date */}
                  <div className="flex flex-col gap-1 md:gap-2 z-10 text-left">
                    <span className="font-sans text-[7.5px] min-[350px]:text-[9px] md:text-[10px] text-[#C5A059] tracking-[0.5em] uppercase font-bold">
                      {siteConfig.event.topLabel || "Save the Date"}
                    </span>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                      className="flex items-end gap-1.5 md:gap-3"
                    >
                      <span className="font-serif font-black text-5xl min-[350px]:text-6xl md:text-7xl lg:text-[6.5rem] text-[#FAF4EA] leading-none tracking-tighter">
                        {siteConfig.event.date.day}
                      </span>
                      <div className="flex flex-col items-start pb-0.5 md:pb-3">
                        <span className="font-sans text-base min-[350px]:text-xl md:text-3xl text-[#FAF4EA]/90 uppercase tracking-[0.08em] font-extrabold leading-tight">
                          {siteConfig.event.date.month}
                        </span>
                        <span className="font-sans text-[8px] min-[350px]:text-[9px] md:text-xs text-[#C5A059] tracking-[0.5em] font-medium mt-0.5">
                          {siteConfig.event.date.year}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Side: Hour script */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="flex flex-col items-end gap-0.5 md:gap-1 z-10 pr-1 min-[350px]:pr-2 md:pr-4"
                  >
                    <span className="font-sans text-[7px] min-[350px]:text-[8px] md:text-[9px] text-[#C5A059] tracking-[0.5em] uppercase font-bold">
                      Hora
                    </span>
                    <span className="font-pinyon text-2xl min-[350px]:text-3xl min-[380px]:text-4xl md:text-[4rem] text-[#FAF4EA] leading-none text-right">
                      {siteConfig.event.time}
                    </span>
                    <span className="font-sans text-[7px] min-[350px]:text-[8px] md:text-[9px] text-[#C5A059] tracking-[0.4em] uppercase font-bold mt-1">
                      XV AÑOS
                    </span>
                  </motion.div>
                </div>

                {/* Subtitle Divider line */}
                <div className="relative mx-4 min-[350px]:mx-6 md:mx-10 mb-3 md:mb-4">
                  <div className="w-full h-px bg-[#C5A059]/20" />
                </div>

                {/* Add to Calendar Section */}
                <div className="flex flex-col items-center gap-2.5 px-4 min-[350px]:px-6 md:px-10 pb-4 min-[350px]:pb-6 md:pb-8">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ willChange: "opacity" }}
                      className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"
                    />
                    <span className="font-sans text-[8px] min-[350px]:text-[9px] md:text-[10px] text-[#FAF4EA]/80 tracking-[0.45em] uppercase font-bold">
                      Viernes
                    </span>
                  </div>

                  <motion.button
                    onClick={handleAddToCalendar}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3 md:py-3.5 px-4 min-[350px]:px-6 rounded-2xl bg-[#2C4A3E] text-[#FAF4EA] hover:bg-[#2C4A3E]/90 transition-all duration-300 group cursor-pointer shadow-xs"
                  >
                    <CalendarPlus
                      className="w-3.5 h-3.5 min-[350px]:w-4 min-[350px]:h-4 text-[#FAF4EA] shrink-0"
                      strokeWidth={2}
                    />
                    <span className="font-sans text-[8.5px] min-[350px]:text-[10px] md:text-xs text-[#FAF4EA] tracking-[0.25em] uppercase font-bold transition-colors">
                      Añadir al Calendario
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>

      <div className="w-full relative z-10">
        <Countdown />
      </div>

      <div className="relative z-10 max-w-6xl w-full px-5 flex flex-col items-center mt-6">
        <AnimatedSection
          once
          delay={0.2}
          className="w-full flex flex-col items-center"
        >
          {/* Novotel Detail card */}
          <div className="flex flex-col items-center text-center px-4 w-full max-w-3xl mb-4">
            <SectionHeader
              title={siteConfig.location.venueName}
              subtitle={siteConfig.location.topLabel}
              className="mb-4 mt-8 overflow-visible"
              titleClassName="leading-normal py-3 px-1 text-[#2E1E15]"
              subtitleClassName="text-[#C5A059] font-bold mb-2"
            />

            <p className="font-sans text-sm md:text-base tracking-[0.2em] text-[#8B7355] uppercase leading-relaxed max-w-md">
              {siteConfig.location.address}
            </p>

            <div className="w-16 h-px bg-[#C5A059]/30 mt-6" />
          </div>

          {/* Interactive Button */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 w-full max-w-2xl justify-center mb-6 mt-2">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-sans text-lg md:text-xl font-bold uppercase tracking-widest text-[#2E1E15]">
                {siteConfig.location.buttonText}
              </span>
            </div>

            <a
              href={siteConfig.location.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-30 h-30 md:w-32 md:h-32 group cursor-pointer shrink-0"
            >
              <div className="absolute inset-0 rounded-full border border-[#C5A059]/30 scale-90 group-hover:scale-100 transition-transform duration-700" />

              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
                className="absolute inset-0 w-full h-full text-[#2E1E15] opacity-80 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 100 100"
              >
                <path
                  id="textPathOut"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="transparent"
                />
                <text
                  fontSize="8.5"
                  letterSpacing="2.5"
                  className="font-sans uppercase font-bold tracking-widest fill-current"
                >
                  <textPath href="#textPathOut" startOffset="0%">
                    MAPA • RUTA AL EVENTO • GPS UBICACIÓN •
                  </textPath>
                </text>
              </motion.svg>

              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#2E1E15] shadow-md border border-[#C5A059]/20 flex items-center justify-center group-hover:bg-[#C5A059] transition-colors duration-500 relative z-10">
                <Navigation className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:-rotate-45 transition-all duration-500" />
              </div>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
