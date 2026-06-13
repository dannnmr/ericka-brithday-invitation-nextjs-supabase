"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FloatingDecoration } from "./ui/FloatingDecoration";
import { siteConfig } from "../config/invitation";

export function Footer() {
  return (
    <footer className="relative py-6 md:py-8 bg-transparent flex flex-col items-center justify-center overflow-hidden border-t border-[#C5A059]/20 w-full">

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.01)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none z-0 opacity-60" />

      {/* Background Glows */}
      <div className="absolute top-0 right-[5%] w-32 h-32 bg-[#C5A059]/5 rounded-full blur-2xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-[5%] w-32 h-32 bg-[#2C4A3E]/3 rounded-full blur-2xl pointer-events-none z-0" />

      {/* Decorative Ornaments */}
      <FloatingDecoration
        src="/images/decorativas_v2/hojas.png"
        alt="Hojas Selva Fondo"
        className="top-[10%] left-[25%] w-12 h-12 opacity-25 rotate-[12deg] pointer-events-none z-0"
        animationStyle="float"
      />
      <FloatingDecoration
        src="/images/decorativas_v2/flor_dorada.png"
        alt="Flor Dorada Fondo"
        className="bottom-[15%] right-[30%] w-14 h-14 opacity-30 pointer-events-none z-0"
        animationStyle="float"
      />
      <FloatingDecoration
        src="/images/decorativas_v2/leopardo_rugiendo.png"
        alt="Leopardo Fondo"
        className="bottom-[-12%] right-[-6%] w-36 h-36 md:w-48 md:h-48 opacity-40 pointer-events-none z-0"
        animationStyle="float"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Left: Quinceañera Name */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-0.5">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[8px] md:text-[9px] text-[#C5A059] tracking-[0.35em] uppercase font-bold">
              Exclusive Pass
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          </div>

          <h2 className="font-pinyon text-5xl sm:text-5xl text-[#2C4A3E] leading-none my-0.5 select-none">
            {siteConfig.client.name}
          </h2>

          <p className="font-sans text-[9px] md:text-[10px] text-[#6E7E75] tracking-[0.25em] font-bold uppercase mt-0.5">
            no dejes que te lo cuenten
          </p>
        </div>

        {/* Right: Contact Designer minimal glass card */}
        <a
          href="https://wa.me/59168183484?text=Hola%20Daniela!%20Me%20gustaría%20saber%20más%20sobre%20tus%20diseños%20de%20invitaciones%20digitales."
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-between gap-5 py-3 px-5 bg-[#2E1E15]/85 backdrop-blur-md border border-[#C5A059]/25 hover:border-[#C5A059]/50 rounded-2xl transition-all duration-300 group shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer max-w-sm w-full md:w-auto shrink-0 select-none overflow-hidden"
        >
          {/* Ticket Info */}
          <div className="flex flex-col text-left pl-1">
            <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#C5A059] font-extrabold">Digital Invitation Design</span>
            <span className="text-xs md:text-sm font-sans text-[#FAF4EA] font-black uppercase mt-0.5 tracking-widest block">Daniela Miranda</span>
            <span className="text-[8px] md:text-[9px] font-sans text-[#FAF4EA]/50 font-medium tracking-normal mt-0.5">¿Quieres una invitación como esta?</span>
          </div>

          {/* Action Button */}
          <div className="bg-[#FAF4EA] text-[#2E1E15] px-4 py-2 rounded-xl text-[9.5px] uppercase tracking-wider font-extrabold shadow-xs group-hover:bg-[#C5A059] group-hover:text-[#2E1E15] transition-all shrink-0 flex items-center gap-1.5 border border-white/5">
            <span>Contacto</span>
            <svg
              className="w-2.5 h-2.5 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </a>

      </div>
    </footer>
  );
}
