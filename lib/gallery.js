// Single source for every supplied photograph: the Gallery page and the archival frames read from here.
// alt describes only what is visible; captions are limited to text visible in the photograph or a neutral label.
// No photograph here establishes who is pictured, what an award was for, or that an event belongs to a timeline entry.
export const gallery = [
  { key: "portrait/profile.webp", width: 1200, height: 1174, alt: "Studio portrait of a man in a dark pinstriped suit, white shirt and purple striped tie, against a plain white background.", caption: null, position: "50% 32%" },
  { key: "hospitality/agrabad-01-facade.webp", width: 1403, height: 1121, alt: "Front of a cream-coloured multi-storey hotel with a tall latticed central tower and a folded-plate entrance canopy, with cars parked in the foreground under a blue sky.", caption: "Hotel Agrabad, Chattogram", position: "42% 40%" },
  { key: "hospitality/agrabad-02-signboard.webp", width: 1800, height: 828, alt: "Wide view of the hotel facade under a clear blue sky, with a black stone sign reading Hotel Agrabad Chattogram and the Bangladesh flag flying on the right.", caption: "Hotel Agrabad, Chattogram", position: "50% 50%" },
  { key: "hospitality/agrabad-03-aerial.webp", width: 1488, height: 1057, alt: "Aerial view of a white multi-storey hotel with a tall central tower, a landscaped forecourt with flagpoles, palm trees and a riverside road.", caption: "Hotel Agrabad, Chattogram, from above", position: "50% 45%" },
  { key: "events/toab-tita-2024-trophy.webp", width: 857, height: 1400, alt: "Two men in patterned and maroon shirts holding a gold trophy in front of a large screen for the TOAB International Tourism Award, TITA 2024.", caption: "Trophy photograph before a TITA 2024 (TOAB International Tourism Award) backdrop", position: "50% 30%" },
  { key: "events/bapa-plaque.webp", width: 1658, height: 949, alt: "Two men in dark suits holding an open framed plaque inscribed with the name of the Bangladesh Association of Public Administration (BAPA).", caption: "Plaque photograph; the plaque names the Bangladesh Association of Public Administration (BAPA)", position: "50% 30%" },
  { key: "events/amader-shomoy-anniversary.webp", width: 1429, height: 1101, alt: "Two men holding a bouquet with a card reading Happy 19th Anniversary to Daily Amader Shomoy, signed by the President of the Bangladesh Humanitarian Press Association.", caption: "Bouquet card: Happy 19th Anniversary to Daily Amader Shomoy", position: "50% 30%" },
  { key: "timeline/archival-couple.webp", width: 1536, height: 1024, alt: "Archival colour photograph of a man in a dark suit and red striped tie beside a smiling woman in a grey pinstriped jacket and pink scarf, in front of a brick house.", caption: "Archival photograph", position: "50% 30%" },
];

export const galleryMeta = Object.fromEntries(gallery.map((g) => [g.key, { alt: g.alt, caption: g.caption ?? undefined, position: g.position }]));
