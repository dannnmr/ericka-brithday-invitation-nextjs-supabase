"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { siteConfig } from "../config/invitation";
import { SectionHeader } from "./ui/SectionHeader";
import { AnimatedSection } from "./ui/AnimatedSection";
import { FloatingDecoration } from "./ui/FloatingDecoration";
import { submitToGoogleSheets } from "@/lib/googleSheets";

export function RSVP() {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Por favor, ingresa tu nombre.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { error: sbError } = await supabase
        .from('invitados')
        .insert([{ nombre: name.trim() }]);

      if (sbError) throw sbError;

      // Sync with Google Sheets in the background
      submitToGoogleSheets("guest", { nombre: name.trim() })
        .catch(gsError => console.error("Error syncing with Google Sheets:", gsError));

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError("Hubo un error al guardar tu confirmación. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-8 px-6 bg-transparent flex flex-col items-center overflow-hidden w-full">

      {/* Decorative Jungle Leaves */}
      <FloatingDecoration
        src="/images/decorativas_v2/hojas.png"
        alt="Selva"
        className="top-[10%] left-[-15%] w-72 h-72 md:w-[450px] md:h-[450px] opacity-15"
        animationStyle="slideLeft"
      />

      <FloatingDecoration
        src="/images/decorativas_v2/flor_dorada.png"
        alt="Flor"
        className="bottom-[-5%] right-[-10%] w-60 h-60 md:w-[350px] md:h-[350px] opacity-25"
        animationStyle="slideRight"
      />

      <AnimatedSection once className="relative z-10 max-w-md w-full mx-auto px-1">
        {/* card-glass container */}
        <div className="card-glass p-5 min-[350px]:p-6 md:p-10 rounded-3xl relative overflow-hidden">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center py-4 text-center"
            >
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 shadow-xs flex items-center justify-center mb-5 relative"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute inset-0 border-2 border-dashed border-[#C5A059]/50 rounded-full animate-spin-slow"
                />
                <Check className="w-10 h-10 text-[#C5A059]" strokeWidth={2.5} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#C5A059] mb-2 font-bold"
              >
                ¡Te esperamos!
              </motion.p>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-script text-4xl min-[350px]:text-5xl min-[380px]:text-6xl md:text-7xl bg-gradient-to-b from-[#FAF4EA] via-[#FAF4EA] to-[#C5A059] bg-clip-text text-transparent py-4 leading-normal mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              >
                Confirmado
              </motion.h4>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-sans text-xs md:text-sm text-[#FAF4EA]/80 tracking-widest font-light"
              >
                Tu respuesta ha sido guardada.
              </motion.p>
            </motion.div>
          ) : (
            <>
              <SectionHeader
                subtitle="Lista de Invitados"
                title="RSVP"
                className="mb-4 min-[380px]:mb-3 w-full overflow-visible px-1"
                titleClassName="text-4xl min-[350px]:text-5xl min-[380px]:text-6xl md:text-7xl break-words leading-normal py-4 mb-1 w-full bg-gradient-to-b from-[#FAF4EA] via-[#FAF4EA] to-[#C5A059] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] font-script"
                subtitleClassName="text-[#C5A059] font-bold text-[10px] min-[380px]:text-[12px] tracking-[0.4em] min-[380px]:tracking-[0.5em] mb-1 min-[380px]:mb-2"
              />
              <div className="text-center mb-6 w-full -mt-4">
                <p className="font-sans text-[9px] min-[380px]:text-[10px] md:text-xs text-[#FAF4EA]/80 tracking-widest min-[380px]:tracking-[0.15em] font-light max-w-sm mx-auto uppercase leading-relaxed px-2 min-[380px]:px-4">
                  Por favor, confírmanos tu presencia antes del {siteConfig.event.rsvpDeadline}.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                {/* Name Field */}
                <div className="relative border-b border-[#C5A059]/30 focus-within:border-[#C5A059] transition-colors pb-1.5 mb-3">
                  <label htmlFor="name" className="block font-sans text-[9px] md:text-[10px] text-[#C5A059] mb-1.5 uppercase tracking-[0.3em] font-bold">
                    Nombre Completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Jennifer Hernandez"
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 font-sans text-sm min-[380px]:text-base md:text-xl text-[#FAF4EA] placeholder-[#FAF4EA]/30 tracking-wider font-medium"
                    disabled={isSubmitting}
                    autoComplete="name"
                  />
                </div>

                {error && (
                  <p className="text-rose-300 text-[10px] text-center font-bold bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl tracking-widest uppercase mt-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 min-[380px]:mt-4 w-full flex items-center justify-center gap-2 min-[380px]:gap-3 px-4 min-[380px]:px-8 py-4 min-[380px]:py-5 bg-[#2C4A3E] border border-[#2C4A3E] text-[#FAF4EA] rounded-full font-sans tracking-[0.2em] min-[380px]:tracking-[0.3em] uppercase text-[9.5px] min-[380px]:text-[11px] md:text-xs font-extrabold transition-all duration-300 disabled:opacity-50 group shadow-xs hover:bg-[#2C4A3E]/90 hover:scale-[1.01] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin relative z-10 text-[#FAF4EA]" />
                      <span className="relative z-10 text-[#FAF4EA]">Enviando...</span>
                    </>
                  ) : (
                    <span className="relative z-10 text-[#FAF4EA]">Confirmar Asistencia</span>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
