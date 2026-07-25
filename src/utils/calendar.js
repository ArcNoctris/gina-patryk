function toUTCStamp(isoString) {
  return new Date(isoString).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeICSText(text) {
  return text.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

export function googleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toUTCStamp(event.start)}/${toUTCStamp(event.end)}`,
    location: event.location,
    details: event.description || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsDataUrl(event) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gina & Patryk Wedding//DE',
    'BEGIN:VEVENT',
    `UID:${toUTCStamp(event.start)}-${event.title.replace(/\s+/g, '-')}@gina-patryk.web.app`,
    `DTSTAMP:${toUTCStamp(new Date().toISOString())}`,
    `DTSTART:${toUTCStamp(event.start)}`,
    `DTEND:${toUTCStamp(event.end)}`,
    `SUMMARY:${escapeICSText(event.title)}`,
    `LOCATION:${escapeICSText(event.location)}`,
    `DESCRIPTION:${escapeICSText(event.description || '')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines)}`;
}
