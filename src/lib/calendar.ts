import { siteConfig } from "../config/invitation";

export function getCalendarLinks() {
  // Parse isoDate dynamically in Bolivia timezone (UTC-4)
  const startDate = new Date(`${siteConfig.event.isoDate}-04:00`);
  // End date is 8 hours after start
  const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000);

  const formatUTC = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const start = formatUTC(startDate);
  const end   = formatUTC(endDate);
  
  const title    = encodeURIComponent(`XV Años — ${siteConfig.client.name}`);
  const location = encodeURIComponent(siteConfig.location.address);
  const details  = encodeURIComponent(`¡Estás invitado/a a los XV años de ${siteConfig.client.name}! Hora: ${siteConfig.event.time}`);

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//XV Invitation//ES",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:XV Años — ${siteConfig.client.name}`,
    `LOCATION:${siteConfig.location.address}`,
    `DESCRIPTION:¡Estás invitado/a! A los XV Años de ${siteConfig.client.name} en ${siteConfig.location.venueName}. ¡Que no te lo cuenten! `,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  
  const icsUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;

  return { googleUrl, icsUrl };
}
