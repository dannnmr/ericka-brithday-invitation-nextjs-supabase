"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, Image as ImageIcon, UploadCloud, RotateCw, X, Plus, Heart, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/lib/supabase";
import { compressImage } from "@/lib/imageCompressor";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import { FloatingDecoration } from "./ui/FloatingDecoration";

type Photo = {
  id: string;
  foto_url: string;
  creado_en: string;
};

export function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadError, setUploadError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('left');

  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x > 80) {
      setExitDirection('right');
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.x < -80) {
      setExitDirection('left');
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('fotos')
        .select('*')
        .order('creado_en', { ascending: false });

      if (!error && data) {
        setPhotos(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();

    const channel = supabase
      .channel('public:photos')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'fotos' },
        (payload) => {
          setPhotos(prev => {
            const exists = prev.some(p => p.id === payload.new.id);
            if (exists) return prev;
            return [payload.new as Photo, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const rawFile = acceptedFiles[0];
    if (!rawFile) return;

    setIsUploading(true);
    setUploadError("");

    try {
      const file = await compressImage(rawFile);

      if (file.size > 5 * 1024 * 1024) {
        setUploadError("La imagen excede el límite (Max: 5MB)");
        setIsUploading(false);
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('invitation_assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('invitation_assets')
        .getPublicUrl(filePath);

      const { error: dbError, data: insertedData } = await supabase
        .from('fotos')
        .insert([{ foto_url: publicUrl }])
        .select()
        .single();

      if (dbError) throw dbError;

      if (insertedData) {
        setPhotos(prev => {
          const exists = prev.some(p => p.id === insertedData.id);
          if (exists) return prev;
          return [insertedData as Photo, ...prev];
        });
        setCurrentIndex(0);
      }

      submitToGoogleSheets("foto", { foto_url: publicUrl })
        .catch(gsError => console.error("Error syncing photo to Google Sheets:", gsError));
    } catch (err) {
      console.error(err);
      setUploadError("Error al procesar la imagen. Intenta nuevamente.");
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    disabled: isUploading
  });

  return (
    <section className="relative py-12 px-6 bg-transparent flex flex-col items-center overflow-hidden w-full">

      {/* Decorative foliage floating in background */}
      <FloatingDecoration
        src="/images/decorativas_v2/flor_cafe.png"
        alt="Hojas Selva"
        className="top-[20%] left-[-8%] w-60 h-60 md:w-80 md:h-80 opacity-20 pointer-events-none z-0"
        animationStyle="float"
      />
      <FloatingDecoration
        src="/images/decorativas_v2/flor_dorada.png"
        alt="Flor Dorada"
        className="bottom-[1%] right-[-16%] w-72 h-72 md:w-[450px] md:h-[450px] opacity-25 pointer-events-none z-0"
        animationStyle="float"
      />
      <FloatingDecoration
        src="/images/decorativas_v2/jirafa.png"
        alt="Flor Dorada"
        className="top-[1%] right-[-20%] w-72 h-72 md:w-[450px] md:h-[450px] opacity-25 pointer-events-none z-0"
        animationStyle="float"
      />

      {/* Subtle Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#2C4A3E]/3 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 w-full flex flex-col items-center"
        >
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#C5A059] mb-2 font-bold">
            Captura el Momento
          </p>
          <h3 className="font-pinyon text-5xl md:text-8xl text-[#2C4A3E] leading-none mb-4">
            Galería Live
          </h3>
          <p className="font-sans text-xs md:text-sm text-[#6E7E75] tracking-[0.15em] font-light max-w-lg mx-auto uppercase px-4">
            Sube tus fotos favoritas de la fiesta. ¡Construyamos el álbum de recuerdos juntos!
          </p>

          {/* UPLOAD ZONE */}
          <div
            {...getRootProps()}
            className={`mt-8 max-w-md w-full mx-auto p-8 border-2 border-dashed rounded-[2.5rem] cursor-pointer transition-all duration-300 ${isDragActive
              ? "border-[#2C4A3E] bg-[#2C4A3E]/5 shadow-sm"
              : "border-[#C5A059]/35 bg-white/70 backdrop-blur-md hover:bg-white hover:border-[#2C4A3E]/50 shadow-xs"
              } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              {isUploading ? (
                <>
                  <RotateCw className="w-10 h-10 text-[#2C4A3E] animate-spin" />
                  <p className="font-sans text-[#2C4A3E] font-bold tracking-wide text-sm">Subiendo foto...</p>
                </>
              ) : (
                <>
                  <UploadCloud className="w-10 h-10 text-[#C5A059] drop-shadow-xs" />
                  <div>
                    <p className="font-sans text-[#2C4A3E] font-extrabold text-base mb-1">Toca aquí o arrastra una foto</p>
                    <p className="font-sans text-[9px] md:text-[10px] text-[#6E7E75] uppercase tracking-widest">JPG, PNG, WEBP (Max 5MB)</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <AnimatePresence>
            {uploadError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[#8B7355] text-xs font-bold tracking-widest uppercase mt-6"
              >
                {uploadError}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* STACKED CARD SWIPER */}
        <div className="w-full relative z-10 flex flex-col items-center">
          {isLoading ? (
            <div className="w-full py-20 flex justify-center text-[#2C4A3E]">
              <RotateCw className="w-10 h-10 animate-spin mx-auto block" />
            </div>
          ) : photos.length === 0 ? (
            <div className="w-full py-20 text-center text-[#6E7E75] font-sans tracking-widest uppercase text-xs md:text-sm">
              El mural interactivo está vacío. ¡Haz los honores!
            </div>
          ) : currentIndex >= photos.length ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <p className="text-[#6E7E75] font-sans text-[10px] md:text-xs tracking-widest uppercase mb-4 font-medium">¡Has visto todas las fotos!</p>
              <button
                onClick={() => setCurrentIndex(0)}
                className="px-5 py-2.5 bg-[#2C4A3E] text-[#FAF7F2] rounded-full font-sans uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-[#2C4A3E]/90 transition-all flex items-center justify-center gap-2 mx-auto hover:scale-105 shadow-xs cursor-pointer"
              >
                <RotateCw className="w-3 h-3 md:w-4 md:h-4" /> Volver a ver galería
              </button>
            </motion.div>
          ) : (
            <>
              <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[360px] h-[340px] sm:h-[400px] md:h-[480px] mt-2">
                <AnimatePresence>
                  {photos.slice(currentIndex, currentIndex + 3).reverse().map((photo, reversedIndex, arr) => {
                    const isTop = reversedIndex === arr.length - 1;
                    const visualIndex = arr.length - 1 - reversedIndex;

                    return (
                      <motion.div
                        key={photo.id}
                        layout
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{
                          scale: 1 - visualIndex * 0.05,
                          y: visualIndex * 15,
                          x: visualIndex === 0 ? -4 : visualIndex === 1 ? 8 : -12,
                          rotate: visualIndex === 0 ? -3 : visualIndex === 1 ? 4 : -7,
                          opacity: 1 - visualIndex * 0.15
                        }}
                        exit={{
                          x: exitDirection === 'left' ? -300 : 300,
                          opacity: 0,
                          rotate: exitDirection === 'left' ? -20 : 20,
                          transition: { duration: 0.3 }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={`absolute top-0 left-0 w-full h-full bg-[#fdfbf7] p-3.5 pb-14 md:pb-16 shadow-md rounded-xs border border-neutral-200/60 flex flex-col ${isTop ? 'cursor-grab active:cursor-grabbing' : 'cursor-default pointer-events-none'}`}
                        style={{ zIndex: photos.length - currentIndex - visualIndex }}
                        drag={isTop ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDragEnd={isTop ? handleDragEnd : undefined}
                      >
                        {/* Polaroid Clip */}
                        <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 w-14 h-20 z-50 pointer-events-none select-none">
                          <Image
                            src="/images/decorativas_v2/clip_polaroid.png"
                            alt="Polaroid Clip"
                            width={56}
                            height={56}
                            priority
                          />
                        </div>

                        <div
                          className={`relative overflow-hidden w-full h-full bg-[#f3f3f3] border border-neutral-200 group/img transition-all ${
                            isTop ? 'cursor-zoom-in pointer-events-auto' : 'pointer-events-none'
                          }`}
                          onClick={(e) => {
                            if (isTop) {
                              e.stopPropagation();
                              setSelectedImage(photo.foto_url);
                            }
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.foto_url}
                            alt="Party memory"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                            draggable="false"
                          />
                          {/* Overlay for hovering on desktop */}
                          {isTop && (
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-opacity duration-300 pointer-events-none">
                              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg scale-90 group-hover/img:scale-100 transition-transform duration-300">
                                <Maximize2 className="w-4 h-4" />
                              </div>
                              <span className="font-sans text-[8px] text-white tracking-[0.2em] uppercase font-bold">Ver Imagen</span>
                            </div>
                          )}
                          {/* Indicator for mobile */}
                          {isTop && (
                            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white md:hidden border border-white/20 shadow-xs pointer-events-none">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                        <div className="mt-3.5 flex justify-between items-center px-1">

                          {/* Heart Icon (Gold) */}
                          <Heart className={`w-5 h-5 md:w-6 md:h-6 text-[#C5A059] transition-colors ${isTop ? 'fill-[#C5A059]/20' : 'fill-transparent'}`} />

                          <span className="font-sans text-[8px] md:text-[9px] text-neutral-500 tracking-[0.12em] font-black uppercase pointer-events-none text-center flex-1 px-1">
                            {isTop ? 'Toca para ampliar' : ''}
                          </span>

                          <Maximize2
                            className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isTop ? 'text-neutral-500 hover:text-neutral-900 cursor-pointer pointer-events-auto' : 'text-neutral-300'}`}
                            onClick={(e) => {
                              if (isTop) {
                                e.stopPropagation();
                                setSelectedImage(photo.foto_url);
                              }
                            }}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Action buttons (Chevron Navigation & Counter) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 md:gap-10 mt-6 md:mt-8 relative z-20"
              >
                <button
                  onClick={() => {
                    if (currentIndex > 0) {
                      setExitDirection('right');
                      setCurrentIndex(prev => prev - 1);
                    }
                  }}
                  disabled={currentIndex === 0}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FAF7F2] shadow-xs flex items-center justify-center transition-all border border-[#C5A059]/20 ${
                    currentIndex === 0
                      ? 'opacity-40 cursor-not-allowed text-neutral-400'
                      : 'text-[#2C4A3E] hover:bg-white hover:scale-110 active:scale-95 cursor-pointer'
                  }`}
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Contador de Fotos */}
                <span className="font-sans text-[10px] md:text-xs text-[#2C4A3E] tracking-[0.25em] uppercase font-black min-w-[80px] text-center">
                  {currentIndex + 1} / {photos.length}
                </span>

                <button
                  onClick={() => {
                    if (currentIndex < photos.length) {
                      setExitDirection('left');
                      setCurrentIndex(prev => prev + 1);
                    }
                  }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FAF7F2] shadow-xs flex items-center justify-center text-[#2C4A3E] hover:bg-white hover:scale-110 active:scale-95 transition-all border border-[#C5A059]/30 cursor-pointer"
                  aria-label="Siguiente foto"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Cinematic Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-[#FAF7F2]/95 backdrop-blur-xl flex justify-center items-center p-4 md:p-10 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 right-6 text-[#2C4A3E] hover:text-[#C5A059] transition-colors bg-white shadow-md p-4 rounded-full border border-[#C5A059]/20 z-50 hover:scale-110 cursor-pointer"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center pointer-events-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Fullscreen view"
                className="max-w-full max-h-[90vh] object-contain shadow-md bg-white p-2 border border-[#C5A059]/20 pointer-events-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}