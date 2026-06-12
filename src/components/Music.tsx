"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, RotateCw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import { FloatingDecoration } from "./ui/FloatingDecoration";

export function Music() {
  const [song, setSong] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!song.trim()) {
      setError("Por favor, escribe una canción.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { error: sbError } = await supabase
        .from('canciones')
        .insert([{ cancion: song.trim() }]);

      if (sbError) throw sbError;

      // Sync with Google Sheets in the background
      submitToGoogleSheets("song", { cancion: song.trim() })
        .catch(gsError => console.error("Error syncing song to Google Sheets:", gsError));

      setIsSuccess(true);
      setSong("");
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err: any) {
      console.error("Supabase error:", err);
      setError("Error al enviar la sugerencia. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const visualizerBars = Array.from({ length: 24 });

  return (
    <section className="relative pt-12 pb-6 md:pb-16 px-6 bg-transparent flex flex-col items-center overflow-hidden w-full">

      {/* Background Soft Glows */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[#2C4A3E]/3 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Safari Leopard decoration */}
      <FloatingDecoration
        src="/images/decorativas_v2/leopardo_rugiendo.png"
        alt="Leopardo"
        className="bottom-[-5%] left-[-10%] w-72 h-72 md:w-[450px] md:h-[450px] opacity-45 pointer-events-none z-0"
        animationStyle="slideLeft"
      />

      <div className="relative z-10 max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">

        {/* Vinyl interactive widget */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 group flex items-center justify-center shrink-0">

          {/* Record player base (white/scrapbook style) */}
          <div className="absolute inset-[-8px] bg-[#FAF7F2] border-[1.5px] border-[#C5A059]/30 rounded-3xl shadow-sm pointer-events-none rotate-[-2.5deg]">
            {/* Corners screws */}
            <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-[#C5A059]/40" />
            <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[#C5A059]/40" />
            <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-[#C5A059]/40" />
            <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-[#C5A059]/40" />
          </div>

          {/* Tape decor */}
          <div className="absolute -top-4 -left-2.5 w-9 h-3.5 bg-white/40 backdrop-blur-xs border-x border-dashed border-[#C5A059]/10 rotate-[-15deg] shadow-xs z-20 pointer-events-none" />

          {/* Vinyl */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform" }}
            className="relative w-22 h-22 md:w-26 md:h-26 rounded-full bg-neutral-950 border-[5px] border-neutral-900 flex items-center justify-center shadow-md z-10"
          >
            {/* Grooves */}
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.02)_60deg,transparent_120deg,rgba(255,255,255,0.03)_180deg,transparent_240deg,rgba(255,255,255,0.03)_300deg,transparent_360deg)] pointer-events-none" />

            {/* Label Central (Gold) */}
            <div className="w-8 h-8 rounded-full bg-[#C5A059] flex flex-col items-center justify-center relative shadow-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A22] z-10" />
              <span className="absolute text-[3.5px] tracking-[0.25em] text-white font-black font-sans top-1.5 uppercase">PLAYLIST</span>
              <span className="absolute text-[3px] tracking-[0.15em] text-white/80 font-semibold font-sans bottom-1.5 uppercase">SAFARI</span>
            </div>
          </motion.div>

          {/* Tonearm */}
          <div className="absolute -top-2 right-0 w-8 h-16 origin-top-left transition-transform duration-1000 -rotate-12 group-hover:-rotate-3 pointer-events-none z-20">
            {/* Pivot */}
            <div className="absolute top-0 left-3 w-4 h-4 rounded-full bg-[#FAF7F2] border border-[#C5A059]/30 shadow-xs flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            </div>
            {/* Metal arm */}
            <div className="w-0.5 h-11 bg-gradient-to-b from-neutral-400 to-neutral-600 rounded-full ml-[17px] mt-2 shadow-xs" />
            {/* Needle */}
            <div className="absolute bottom-2.5 right-[8px] w-1.5 h-2 bg-neutral-900 border border-neutral-800 rounded-sm shadow-xs flex flex-col items-center justify-center">
              <div className="w-0.5 h-0.5 bg-[#C5A059] rounded-full" />
            </div>
          </div>
        </div>

        {/* Right side form */}
        <div className="flex-1 max-w-md w-full flex flex-col items-center md:items-start card-glass p-6 rounded-3xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-4 relative z-10 w-full"
          >
            <p className="font-sans text-[8px] min-[380px]:text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-[#C5A059] mb-1 font-bold">
              Playlist
            </p>
            <h3 className="font-pinyon text-4xl min-[380px]:text-5xl md:text-6xl bg-gradient-to-b from-[#FAF4EA] via-[#FAF4EA] to-[#C5A059] bg-clip-text text-transparent mb-1 py-3 leading-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              Música
            </h3>
            <p className="font-sans text-[8px] min-[380px]:text-[9px] md:text-[10px] text-[#FAF4EA]/80 tracking-[0.15em] font-light uppercase">
              ¿Qué canción no puede faltar en la pista?
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full relative"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full relative z-20">

              {/* Input pill */}
              <div className="relative flex items-center w-full p-1 bg-[#FAF7F2]/80 border border-[#C5A059]/25 rounded-full shadow-xs focus-within:border-[#2C4A3E]">

                <input
                  id="song"
                  name="song"
                  type="text"
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  placeholder="Escribe el nombre o artista..."
                  className="flex-1 min-w-0 bg-transparent border-none focus:outline-none focus:ring-0 px-4 md:px-5 font-sans font-medium text-[10px] min-[380px]:text-xs text-[#2C4A3E] placeholder-[#2C4A3E]/50 tracking-wide h-8 min-[380px]:h-10"
                  disabled={isSubmitting || isSuccess}
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="flex items-center justify-center shrink-0 w-8 h-8 min-[380px]:w-10 min-[380px]:h-10 md:w-auto md:px-6 bg-[#2C4A3E] border border-[#2C4A3E] text-white rounded-full transition-all duration-300 disabled:opacity-50 group cursor-pointer shadow-xs hover:bg-[#2C4A3E]/90"
                >
                  {isSubmitting ? (
                    <RotateCw className="w-3.5 h-3.5 animate-spin text-white" />
                  ) : isSuccess ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-white" />
                  ) : (
                    <>
                      <Send className="w-3 h-3 md:w-3.5 md:h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="hidden md:block ml-2 font-sans tracking-[0.25em] uppercase text-[8px] font-bold text-white">Sugerir</span>
                    </>
                  )}
                </button>
              </div>

              {/* EQ animation */}
              <div className="flex items-end justify-center md:justify-start gap-[2px] h-4 mt-1 overflow-hidden pointer-events-none select-none px-2">
                {visualizerBars.map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-[2.5px] h-4 bg-[#C5A059]/20 rounded-full origin-bottom"
                    style={{ willChange: "transform" }}
                    animate={{
                      scaleY: isSubmitting
                        ? [0.125, 1, 0.125]
                        : isSuccess
                          ? [0.375, 0.375, 0.375]
                          : [0.1875, (Math.floor(Math.random() * 11) + 3) / 16, 0.1875],
                      backgroundColor: isSuccess ? "#22c55e" : "#C5A059"
                    }}
                    transition={{
                      duration: isSubmitting ? 0.3 : 0.6 + (i % 5) * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-[#8B7355] text-[8px] text-center md:text-left font-bold tracking-widest uppercase mt-0.5"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Success Message */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="text-green-600 text-[8px] text-center md:text-left font-bold tracking-widest uppercase mt-0.5"
                  >
                    ¡Canción añadida con éxito!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
