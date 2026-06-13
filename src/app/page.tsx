import { Intro } from "@/components/Intro";
import { Hero } from "@/components/Hero";
import { Parents } from "@/components/Parents";
import { Location } from "@/components/Location";
import { Itinerary } from "@/components/Itinerary";
//import { Memories } from "@/components/Memories";
import { DressCode } from "@/components/DressCode";
import { Gifts } from "@/components/Gifts";
import { RSVP } from "@/components/RSVP";
import { Music } from "@/components/Music";
//import { Wishes } from "@/components/Wishes";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { Passes } from "@/components/Passes";
import Image from "next/image";

export default function Home() {
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
    </main>
  );
}

