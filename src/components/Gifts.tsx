"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "./ui/SectionHeader";
import { AnimatedSection } from "./ui/AnimatedSection";
import { FloatingDecoration } from "./ui/FloatingDecoration";

export function Gifts() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <section className="relative py-12 md:py-16 px-4 bg-transparent flex flex-col items-center overflow-hidden w-full">

      {/* Soft Safari Ambient Halo */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-[#2E1E15]/3 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating Jungle Ornaments */}
      <FloatingDecoration
        src="/images/decorativas_v2/hojas.png"
        alt="Hojas Selva"
        className="top-[15%] -left-13 w-52 h-52 md:w-72 md:h-72 opacity-25 rotate-[-9deg] pointer-events-none z-0"
        animationStyle="float"
      />
      <FloatingDecoration
        src="/images/decorativas_v2/flor_dorada.png"
        alt="Flor Dorada"
        className="bottom-[10%] -right-14 w-48 h-48 md:w-64 md:h-64 opacity-40 pointer-events-none z-0"
        animationStyle="float"
      />

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">

        <AnimatedSection once className="text-center mb-6">
          <SectionHeader
            title="Regalos"
            subtitle="SUGERENCIAS"
            titleClassName="font-pinyon text-5xl md:text-7xl text-[#2E1E15]"
            subtitleClassName="text-[#C5A059] tracking-[0.4em] font-sans font-medium text-xs mb-4"
            className="mb-4"
          />
          <p className="font-sans text-[10px] md:text-xs text-[#8B7355] leading-relaxed tracking-[0.2em] font-light max-w-xl mx-auto uppercase px-4">
            El mejor regalo es tu presencia,<br /> pero si deseas tener un detalle conmigo:
          </p>
          <div className="w-8 h-px bg-[#C5A059]/30 mx-auto mt-6"></div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full mb-1 px-2 md:px-0">

          {/* Columna Izquierda: Opciones Físicas (Lista de Preferencias) */}
          <AnimatedSection once delay={0.2} className="flex flex-col items-center text-center card-glass p-6 md:p-10 rounded-3xl shadow-sm h-full relative overflow-hidden">

            {/* Línea superior dorada */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

            <h4 className="font-pinyon text-4xl md:text-5xl text-[#FAF4EA] mb-2">
              Lista de Preferencias
            </h4>
            <p className="font-sans text-[9px] md:text-[10px] text-[#FAF4EA]/80 leading-relaxed tracking-[0.2em] uppercase mb-6">
              Algunas ideas que me encantarían
            </p>

            <button
              onClick={() => setShowOptions(!showOptions)}
              className="w-full flex items-center justify-between px-6 py-3 bg-[#FAF4EA]/10 hover:bg-[#FAF4EA]/25 rounded-2xl border border-[#C5A059]/35 transition-all group cursor-pointer"
            >
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-[#FAF4EA] group-hover:text-[#C5A059] transition-colors">
                {showOptions ? 'Ocultar Sugerencias' : 'Ver Sugerencias'}
              </span>
              <motion.div animate={{ rotate: showOptions ? 180 : 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                <ChevronDown className="w-5 h-5 text-[#FAF4EA] group-hover:text-[#C5A059] transition-colors" />
              </motion.div>
            </button>

            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden w-full"
                >
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 w-full pt-8 pb-2">

                    {/* Opción 1 - Ropa */}
                    <div className="flex flex-col items-center group text-center">
                      <div className="w-14 h-14 relative mb-3 transition-transform duration-500 group-hover:-translate-y-1 bg-[#FAF4EA]/10 rounded-full p-3 border border-[#C5A059]/20 shadow-xs">
                        <Image src="/images/decorativas_v2/bolsa_regalo.png" alt="Ropa" fill className="object-contain p-2 opacity-95" />
                      </div>
                      <h5 className="font-sans text-[10px] md:text-xs text-[#FAF4EA] font-bold tracking-widest mb-1 uppercase">Ropa</h5>
                      <p className="font-sans text-[8px] text-[#C5A059] tracking-[0.2em] uppercase">Talla M</p>
                    </div>

                    {/* Opción 2 - Perfume Leopardo */}
                    <div className="flex flex-col items-center group text-center">
                      <div className="w-14 h-14 relative mb-3 transition-transform duration-500 group-hover:-translate-y-1 bg-[#FAF4EA]/10 rounded-full p-3 border border-[#C5A059]/20 shadow-xs">
                        <Image src="/images/decorativas_v2/perfume_ericka2.png" alt="Perfume" fill className="object-contain p-1 opacity-95" />
                      </div>
                      <h5 className="font-sans text-[10px] md:text-xs text-[#FAF4EA] font-bold tracking-widest mb-1 uppercase">Perfumes</h5>
                      <p className="font-sans text-[8px] text-[#C5A059] tracking-[0.2em] uppercase">Dulces</p>
                    </div>

                    {/* Opción 3 - Maquillaje */}
                    <div className="flex flex-col items-center group text-center">
                      <div className="w-14 h-14 relative mb-3 transition-transform duration-500 group-hover:-translate-y-1 bg-[#FAF4EA]/10 rounded-full p-3 border border-[#C5A059]/20 shadow-xs">
                        <Image src="/images/decorativas_v2/lips_leopardo.png" alt="Maquillaje" fill className="object-contain p-2.5 opacity-95 rounded-full" />
                      </div>
                      <h5 className="font-sans text-[10px] md:text-xs text-[#FAF4EA] font-bold tracking-widest mb-1 uppercase">Maquillaje</h5>
                      <p className="font-sans text-[8px] text-[#C5A059] tracking-[0.2em] uppercase">Rubor, rimmel, gloss, etc.</p>
                    </div>

                    {/* Opción 4 - Accesorios */}
                    <div className="flex flex-col items-center group text-center">
                      <div className="w-14 h-14 relative mb-3 transition-transform duration-500 group-hover:-translate-y-1 bg-[#FAF4EA]/10 rounded-full p-3 border border-[#C5A059]/20 shadow-xs">
                        <Image src="/images/decorativas_v2/accesorios_ericka.png" alt="Accesorios" fill className="object-contain p-1.5 opacity-95" />
                      </div>
                      <h5 className="font-sans text-[10px] md:text-xs text-[#FAF4EA] font-bold tracking-widest mb-1 uppercase">Accesorios</h5>
                      <p className="font-sans text-[8px] text-[#C5A059] tracking-[0.2em] uppercase">Dorados</p>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedSection>

          {/* Columna Derecha: Lluvia de Sobres */}
          <AnimatedSection once delay={0.4} className="flex flex-col items-center justify-center text-center card-glass p-6 md:p-12 rounded-3xl shadow-sm h-full relative overflow-hidden">

            {/* Línea superior dorada */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-28 h-28 md:w-36 md:h-36 mb-2 transition-transform duration-500 hover:scale-105 cursor-pointer z-10"
            >
              <Image
                src="/images/decorativas_v2/lluvia_sobre2.png"
                alt="Lluvia de Sobres"
                fill
                className="object-contain"
              />
            </motion.div>
            <h4 className="font-pinyon text-4xl md:text-5xl text-[#FAF4EA] mb-4">
              Lluvia de Sobres
            </h4>
            <p className="font-sans text-[10px] md:text-[11px] text-[#FAF4EA]/80 leading-loose tracking-[0.2em] uppercase max-w-sm">
              Es la tradición de regalar dinero en efectivo en un sobre el día del evento.
            </p>
          </AnimatedSection>

        </div>

      </div>
    </section>
  );
}
