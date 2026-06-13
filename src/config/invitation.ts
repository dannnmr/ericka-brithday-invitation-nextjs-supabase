export interface ClientConfig {
  name: string;
  eventType: string; // e.g., "MIS XV AÑOS"
  finalPhrase: string;
}

export interface ParentsConfig {
  topLabel: string; // e.g., "Con la bendición de mis padres"
  fatherName: string;
  motherName: string;
  godparents?: string;
  invitationText: string;
}

export interface EventConfig {
  date: {
    day: string; // e.g., "04"
    month: string; // e.g., "Abril"
    year: string; // e.g., "2026"
  };
  time: string; // e.g., "16:30 hrs"
  isoDate: string; // format: "YYYY-MM-DDTHH:mm:ss"
  rsvpDeadline: string; // e.g., "1 de Abril"
  topLabel: string; // e.g., "Agenda la fecha"
}

export interface LocationConfig {
  topLabel: string; // e.g., "El Lugar"
  venueName: string;
  address: string;
  mapLink: string;
  buttonText: string;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  image: string; // Path to the image
}

export interface ItineraryConfig {
  topLabel: string; // e.g., "Nuestra Noche"
  mainTitle: string; // e.g., "Itinerario"
  schedule: ItineraryItem[];
}

export interface DressCodeConfig {
  topLabel: string; // e.g., "Sugerencia de Estilo"
  mainTitle: string; // e.g., "Dress Code"
  type: string; // e.g., "Formal"
  highlight: {
    line1: string; // e.g., "Todos"
    line2: string; // e.g., "De"
    line3: string; // e.g., "Blanco"
  };
  reservedColorsText: {
    prefix: string;
    color1: string; // e.g., "ROSA"
    color2: string; // e.g., "DORADO"
    suffix: string;
  };
  extraNotes: {
    prefix: string;
    highlight: string; // e.g., "TRAJE DE BAÑO"
    suffix: string;
  };
}

export interface PassesConfig {
  topLabel: string; // e.g., "Control de Asistencia"
  mainTitle: string; // e.g., "Tus Pases"
  ticketLabel: string; // e.g., "Boleto Oficial"
  admitText: string; // e.g., "Admitir"
  quantity: string; // e.g., "1"
  unitText: string; // e.g., "Persona"
}

export interface GoogleSheetsConfig {
  webhookUrl: string;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    card: string;
    textMuted: string;
  };
}

export interface DecorationItem {
  src: string;
  alt: string;
  className?: string;
  animation?: any; // Framer motion variants or custom logic
  position?: string; // Descriptive position for logic
}

export interface VisualsConfig {
  hero: {
    background: string;
    decorations: DecorationItem[];
  };
  itinerary: {
    background?: string;
  };
}

export interface SiteConfig {
  client: ClientConfig;
  parents: ParentsConfig;
  event: EventConfig;
  location: LocationConfig;
  itinerary: ItineraryConfig;
  dressCode: DressCodeConfig;
  passes: PassesConfig;
  googleSheets?: GoogleSheetsConfig;
  theme: ThemeConfig;
  visuals: VisualsConfig;
}

export const siteConfig: SiteConfig = {
  client: {
    name: "Ericka",
    eventType: "MIS XV AÑOS",
    finalPhrase:
      "Los momentos más hermosos de la vida se vuelven inolvidables cuando se comparten con las personas que queremos. Por eso, hoy que celebro mis XV años, quiero que seas parte de esta noche tan especial y llena de emociones.",
  },
  parents: {
    topLabel: "Junto a mis padres y padrinos",
    fatherName: "Enrique Dominguez",
    motherName: "Ericka Ayma",
    godparents: "Brandy Siles y Oliver Morón",
    invitationText:
      "Acompáñame a celebrar una noche mágica e inolvidable al cumplir mis XV años.",
  },
  event: {
    date: {
      day: "19",
      month: "Junio",
      year: "2026",
    },
    time: "19:30 hrs",
    isoDate: "2026-06-19T19:30:00",
    rsvpDeadline: "16 de Junio",
    topLabel: "Agenda la fecha",
  },
  location: {
    topLabel: "El Lugar",
    venueName: "Novotel Patuju Hall",
    address: "Santa Cruz de la Sierra",
    mapLink: "https://maps.app.goo.gl/iPJEwkmoujtgmYsPA?g_st=ic",
    buttonText: "¿Cómo llegar?",
  },
  itinerary: {
    topLabel: "Nuestra Noche",
    mainTitle: "Itinerario",
    schedule: [
      {
        time: "19:30",
        title: "Recepción",
        description: "Inicio oficial de nuestra noche de gala.",
        image: "/images/decorativas_v2/champagne.png",
      },
      {
        time: "21:00",
        title: "Ceremonia",
        description: "El momento especial: vals y brindis.",
        image: "/images/decorativas/coctail.png",
      },
      {
        time: "21:30",
        title: "Fiesta a bailar",
        description: "Apertura oficial de la pista de baile.",
        image: "/images/decorativas/fiesta.png",
      },
      {
        time: "23:00",
        title: "Hora Loca",
        description: "¡Máxima energía y sorpresas en la pista!",
        image: "/images/decorativas/megafon.png",
      },
    ],
  },
  dressCode: {
    topLabel: "Sugerencia de Estilo",
    mainTitle: "Dress Code",
    type: "Formal",
    highlight: {
      line1: "Código",
      line2: "De",
      line3: "Gala",
    },
    reservedColorsText: {
      prefix: "LOS COLORES",
      color1: "GOLD ROSE",
      color2: "DORADO",
      suffix: "ESTÁN RESERVADOS EXCLUSIVAMENTE PARA LA QUINCEAÑERA.",
    },
    extraNotes: {
      prefix: "¡PREPÁRATE PARA UNA",
      highlight: "NOCHE INOLVIDABLE",
      suffix: "!",
    },
  },
  passes: {
    topLabel: "Control de Asistencia",
    mainTitle: "Boarding Pass",
    ticketLabel: "VIP Flight",
    admitText: "Pasajero",
    quantity: "1",
    unitText: "Persona",
  },
  googleSheets: {
    webhookUrl:
      process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbzQTqfTwaHMbbNasswGecuqDyk3XKnSz0qRl7YAHYz_FyydWJj8vLRcZzVTLZ_Xu9F9/exec",
  },
  theme: {
    colors: {
      primary: "#C5A059",
      secondary: "#2E1E15",
      accent: "#8B7355",
      background: "#FAF4EA",
      foreground: "#2E1E15",
      card: "rgba(35, 23, 16, 0.92)",
      textMuted: "#8B7355",
    },
  },
  visuals: {
    hero: {
      background: "/images/decorativas/grupo_bolas_disco.png",
      decorations: [],
    },
    itinerary: {
      background: "#0f111a",
    },
  },
};
