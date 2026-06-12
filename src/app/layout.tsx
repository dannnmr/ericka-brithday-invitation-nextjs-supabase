import type { Metadata } from "next";
import { Outfit, Great_Vibes, Pinyon_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  variable: "--font-pinyon",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

import { siteConfig } from "@/config/invitation";

const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback to the production Vercel deployment URL for Ericka's invitation
  return "https://ericka-invitation-xv.vercel.app";
};

const siteUrl = getSiteUrl();
const formattedDate = `${siteConfig.event.date.day} de ${siteConfig.event.date.month} de ${siteConfig.event.date.year}`;
const formattedTime = siteConfig.event.time;
const descriptionText = `Acompáñame a celebrar mis XV Años el ${formattedDate} a las ${formattedTime}. Una noche mágica llena de amor, música y recuerdos. ¡Espero verte allí!`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `Mis XV Años de ${siteConfig.client.name} — ¡Estás Invitado!`,
  description: descriptionText,
  icons: {
    icon: "/images/decorativas_v2/logo_brochev4.png",
    shortcut: "/images/decorativas_v2/logo_brochev4.png",
    apple: "/images/decorativas_v2/logo_brochev4.png",
  },
  openGraph: {
    title: `Mis XV Años de ${siteConfig.client.name} — ¡Estás Invitado!`,
    description: descriptionText,
    url: siteUrl,
    siteName: `Mis XV - ${siteConfig.client.name}`,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/invitation/metadata.jpg",
        width: 1200,
        height: 630,
        alt: `Invitación a los XV Años de ${siteConfig.client.name}`,
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Mis XV Años de ${siteConfig.client.name} — ¡Estás Invitado!`,
    description: descriptionText,
    images: ["/images/invitation/metadata.jpg"],
  }
};


import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} ${greatVibes.variable} ${pinyonScript.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
