"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Intro } from "@/components/Intro";
import Image from "next/image";

// Dynamically import heavy sections below the fold to reduce the initial JS bundle size
const Hero = dynamic(() => import("@/components/Hero").then(mod => mod.Hero), { ssr: false });
const Parents = dynamic(() => import("@/components/Parents").then(mod => mod.Parents), { ssr: false });
const Itinerary = dynamic(() => import("@/components/Itinerary").then(mod => mod.Itinerary), { ssr: false });
const DressCode = dynamic(() => import("@/components/DressCode").then(mod => mod.DressCode), { ssr: false });
const Gifts = dynamic(() => import("@/components/Gifts").then(mod => mod.Gifts), { ssr: false });
const RSVP = dynamic(() => import("@/components/RSVP").then(mod => mod.RSVP), { ssr: false });
const Music = dynamic(() => import("@/components/Music").then(mod => mod.Music), { ssr: false });
const Location = dynamic(() => import("@/components/Location").then(mod => mod.Location), { ssr: false });
const Passes = dynamic(() => import("@/components/Passes").then(mod => mod.Passes), { ssr: false });
const Gallery = dynamic(() => import("@/components/Gallery").then(mod => mod.Gallery), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer").then(mod => mod.Footer), { ssr: false });

export default function Home() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay rendering of heavy invitation components to allow the envelope/intro to load instantly.
    // The delay of 800ms ensures the intro is fully interactive, and the browser then fetches
    // the rest of the chunks and assets in the background while the user is viewing the envelope cover.
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen relative bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      <Intro />

      {/* Decorative Jungle Leaves floating on the background */}
      <div className="absolute top-[20%] -left-10 w-48 h-48 md:w-80 md:h-80 z-0 pointer-events-none opacity-[0.07] mix-blend-multiply">
        <Image src="/images/decorativas_v2/hojas.png" alt="Selva" fill className="object-contain" />
      </div>
      <div className="absolute top-[50%] -right-10 w-48 h-48 md:w-80 md:h-80 z-0 pointer-events-none opacity-[0.06] mix-blend-multiply">
        <Image src="/images/decorativas_v2/flor_dorada.png" alt="Flor" fill className="object-contain" />
      </div>
      <div className="absolute top-[80%] -left-12 w-48 h-48 md:w-80 md:h-80 z-0 pointer-events-none opacity-[0.07] mix-blend-multiply">
        <Image src="/images/decorativas_v2/hojas.png" alt="Selva" fill className="object-contain rotate-90" />
      </div>

      {/* 
        The content below Intro will be visible once the user interacts with the envelope 
        and the Intro component fades out.
      */}
      {shouldRender && (
        <div className="relative z-10 w-full flex flex-col items-center">
          <Hero />
          <Parents />
          <Itinerary />
          {/* <Memories /> */}
          <DressCode />
          <Gifts />
          <RSVP />
          <Music />
          <Location />
          <Passes />
          {/* <Wishes /> */}
          <Gallery />
          <Footer />
        </div>
      )}
    </main>
  );
}

