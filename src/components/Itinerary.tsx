"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SparkleField } from "./ui/SparkleField";
import { siteConfig } from "../config/invitation";
import { SectionHeader } from "./ui/SectionHeader";
import { AnimatedSection } from "./ui/AnimatedSection";

// Helper to override default party/disco icons with botanical safari icons
const getItineraryIcon = (imagePath: string) => {
  if (imagePath.includes("boladisco2.png")) return "/images/decorativas_v2/champagne.png";
  if (imagePath.includes("flor.png")) return "/images/decorativas_v2/flor_dorada.png";
  if (imagePath.includes("coctail.png")) return "/images/decorativas_v2/martini_ericka.png";
  if (imagePath.includes("fiesta.png")) return "/images/decorativas_v2/bola_disco_dorada.png";
  if (imagePath.includes("megafon.png")) return "/images/decorativas_v2/leopardo_rugiendo.png";
  return imagePath;
};

export function Itinerary() {
  return (
    <section className="relative py-12 px-6 flex flex-col items-center overflow-hidden bg-transparent w-full">

      <SparkleField mobileCount={6} desktopCount={18} />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,var(--color-background)_100%)] pointer-events-none" />

      {/* Background Texture Image on the Right */}
      <div className="absolute top-0 right-0 w-full sm:w-[48%] h-full z-0 pointer-events-none opacity-[0.30] mix-blend-multiply">
        <Image
          src="/images/decorativas_v2/textura_flores_leopardo.png"
          alt="Textura Flores Leopardo"
          fill
          className="object-cover object-right"
        />
        {/* Soft fade-out to the left to blend into the ivory background */}
        <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#FAF4EA] to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
        <AnimatedSection once>
          <SectionHeader
            title={siteConfig.itinerary.mainTitle}
            subtitle={siteConfig.itinerary.topLabel}
            titleClassName="lg:text-[6rem] text-[#2C4A3E]"
            subtitleClassName="text-[#C5A059]"
          />
        </AnimatedSection>

        <div className="w-full relative mt-6">
          {/* Subtle Golden Timeline Central Line */}
          <div className="absolute top-0 bottom-0 left-[24px] md:left-1/2 w-px bg-linear-to-b from-transparent via-[#C5A059]/40 to-transparent"></div>

          <div className="flex flex-col gap-6 md:gap-8 w-full max-w-3xl mx-auto">
            {siteConfig.itinerary.schedule.map((item, index) => {
              const isEven = index % 2 === 0;
              const displayImage = getItineraryIcon(item.image);

              return (
                <AnimatedSection
                  key={index}
                  once
                  delay={index * 0.05}
                  className={`flex-row! relative items-center w-full ${isEven ? "md:flex-row!" : "md:flex-row-reverse!"
                    }`}
                >
                  {/* Timeline Gold Dot */}
                  <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-linear-to-br from-[#E6D5B8] to-[#C5A059] z-10 shadow-[0_0_8px_rgba(197,160,89,0.5)] border border-[#C5A059]/30"></div>

                  {/* Empty Spacer for desktop grid */}
                  <div className="hidden md:block w-1/2"></div>

                  {/* Text + Image Row inside Card */}
                  <div className={`w-full md:w-1/2 pl-8 min-[380px]:pl-12 md:pl-0 flex items-center gap-3 md:gap-4 ${isEven ? "md:pr-10 lg:pr-14 md:flex-row-reverse md:text-right" : "md:pl-10 lg:pl-14 md:text-left"
                    }`}>

                    {/* Decorative Botanical Image */}
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: isEven ? 8 : -8 }}
                      className="relative w-10 h-10 min-[350px]:w-12 min-[350px]:h-12 md:w-16 md:h-16 shrink-0 z-10"
                    >
                      <Image
                        src={displayImage}
                        alt={item.title}
                        fill
                        className="object-contain opacity-95 drop-shadow-[0_2px_8px_rgba(197,160,89,0.2)]"
                      />
                    </motion.div>

                    {/* Text Block (No card background, clean floating design) */}
                    <div className="flex flex-col flex-1 min-w-0 z-20">
                      <div className={`flex items-baseline w-full justify-between md:justify-normal md:w-auto mb-1 ${isEven ? 'flex-row-reverse md:gap-2' : 'flex-row-reverse md:flex-row md:gap-2'}`}>
                        {/* Time */}
                        <span className="font-sans text-[13px] min-[350px]:text-[15px] md:text-xl font-bold text-[#5C3E2B] italic tracking-wider shrink-0 mr-1 min-[380px]:mr-3 md:mr-0 z-10">
                          {item.time}
                        </span>

                        {/* Desktop Line Divider */}
                        <div className="hidden md:block w-4 h-px bg-linear-to-r from-transparent via-[#C5A059]/40 to-transparent shrink-0"></div>

                        {/* Mobile Line Divider */}
                        <div className="md:hidden flex-1 border-b border-dotted border-[#231710]/30 mx-1 min-[380px]:mx-3 relative top-[-4px] min-[380px]:top-[-6px] min-w-[3px]"></div>

                        {/* Title */}
                        <h4 className="font-sans text-[10px] min-[350px]:text-[11px] min-[380px]:text-xs md:text-base uppercase tracking-widest md:tracking-[0.15em] font-extrabold text-[#231710] shrink min-w-0 wrap-break-word">
                          {item.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className={`font-sans text-[#231710]/75 text-[9px] min-[350px]:text-[10px] md:text-xs leading-normal tracking-wide mt-0.5 text-left ${isEven ? "md:text-right" : "md:text-left"} md:max-w-xs wrap-break-word`}>
                        {item.description}
                      </p>
                    </div>

                  </div>

                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
