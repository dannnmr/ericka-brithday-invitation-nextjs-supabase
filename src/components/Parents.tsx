"use client";

import React from "react";
import Image from "next/image";
import { FloatingDecoration } from "./ui/FloatingDecoration";
import { siteConfig } from "../config/invitation";

export function Parents() {
  return (
    <div className="relative w-full bg-transparent overflow-hidden">
      <section className="relative py-6 md:py-16 px-6 flex flex-col items-center justify-center overflow-hidden w-full">

        {/* Soft Golden Ambient Glows */}

        {/* Crocodile Texture Background */}
        {/* <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-100 overflow-hidden">
          <Image
            src="/images/decorativas_v2/brown_cocodril.png"
            alt="Cocodrilo Marrón"
            fill
            className="object-cover blur-[0.5px] scale-105"
            priority
          />
        </div> */}

        {/* Decorative Jungle Leaves & Golden Flowers */}
        <FloatingDecoration
          src="/images/decorativas_v2/hojas.png"
          alt="Hojas Selva Izquierda"
          className="bottom-[5%] left-[2%] w-24 h-24 md:w-36 md:h-36 opacity-30 rotate-[15deg] pointer-events-none z-0"
          animationStyle="float"
        />
        <FloatingDecoration
          src="/images/decorativas_v2/flor_dorada.png"
          alt="Flor Dorada Derecha"
          className="top-[10%] right-[2%] w-20 h-20 md:w-28 md:h-28 opacity-45 pointer-events-none z-0"
          animationStyle="float"
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-4">
          <div className="mb-6">
            <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-[#C5A059] font-bold">
              {siteConfig.parents.topLabel}
            </p>
            <div className="w-12 h-[1.5px] bg-[#C5A059] mx-auto mt-2.5" />
          </div>

          {/* Glassmorphism Card */}
          <div
            className="w-full max-w-2xl p-6 md:p-10 rounded-3xl relative overflow-hidden border border-[#C5A059]/35"
            style={{
              background: "linear-gradient(135deg, rgba(35, 23, 16, 0.82) 0%, rgba(20, 13, 9, 0.88) 100%)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              boxShadow: "0 20px 45px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
            }}
          >

            {/* Elegant Golden Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-linear-to-r from-transparent via-[#C5A059] to-transparent z-10" />

            {/* Parents Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-6 mb-4 md:mb-5 relative z-10">
              <div className="text-center group cursor-default">
                <h2 className="font-pinyon text-3xl md:text-5xl text-[#FAF4EA] tracking-wide transition-all duration-300 group-hover:text-[#C5A059]">
                  {siteConfig.parents.fatherName}
                </h2>
              </div>

              <div className="flex items-center justify-center py-1 md:py-0">
                <span className="font-pinyon text-3xl md:text-4xl text-[#C5A059] font-light">&amp;</span>
              </div>

              <div className="text-center group cursor-default">
                <h2 className="font-pinyon text-3xl md:text-5xl text-[#FAF4EA] tracking-wide transition-all duration-300 group-hover:text-[#C5A059]">
                  {siteConfig.parents.motherName}
                </h2>
              </div>
            </div>

            {/* Godparents Section */}
            {siteConfig.parents.godparents && (
              <>
                <div className="w-full h-px bg-[#C5A059]/20 my-4 md:my-5" />
                <div className="text-center group cursor-default mb-4 md:mb-5 relative z-10">
                  <p className="font-sans text-[8px] md:text-[9px] tracking-[0.4em] text-[#C5A059] uppercase mb-2 font-bold">
                    Y mis padrinos
                  </p>
                  {Array.isArray(siteConfig.parents.godparents) ? (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 max-w-2xl mx-auto">
                      {siteConfig.parents.godparents.map((godparent, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && (
                            <span className="text-[#C5A059]/55 text-[10px] md:text-[12px] my-1 md:my-0 select-none">✦</span>
                          )}
                          <div className="text-center px-0.2">
                            <h3 className="font-pinyon text-2xl md:text-3xl text-[#FAF4EA] transition-all duration-300 group-hover:text-[#C5A059] leading-relaxed">
                              {godparent}
                            </h3>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <h3 className="font-pinyon text-2xl md:text-4xl text-[#FAF4EA] transition-all duration-300 group-hover:text-[#C5A059]">
                      {siteConfig.parents.godparents}
                    </h3>
                  )}
                </div>
              </>
            )}

            <div className="w-full h-px bg-[#C5A059]/20 my-4 md:my-5" />

            {/* Invitation Text */}
            <div className="relative z-10 px-4">
              <p className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] text-[#FAF4EA]/80 uppercase leading-relaxed max-w-lg mx-auto">
                {siteConfig.parents.invitationText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
