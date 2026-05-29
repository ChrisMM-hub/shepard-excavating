// Central content + business data for the Shepard Excavating homepage prototype.
// All facts pulled from the project brief. Items flagged PLACEHOLDER need Janele to confirm.

export const business = {
  name: 'Shepard Excavating and Septic Service, LLC',
  shortName: 'Shepard Excavating',
  alternateName: 'Shepherd Excavating', // captures the 170/mo misspelling search via schema only
  owner: 'Brian Shepard',
  tagline: "We're #1 in the #2 business",
  founded: 1997,
  years: 29,
  phone: '(218) 224-2754',
  phoneHref: 'tel:+12182242754',
  email: 'Shepardexcavating@gmail.com',
  emailHref: 'mailto:Shepardexcavating@gmail.com',
  domain: 'https://www.shepardexcavating.com',
  address: {
    street: '42554 County 45',
    city: 'Laporte',
    region: 'MN',
    zip: '56461', // PLACEHOLDER: confirm with Janele
  },
  geo: { lat: 47.2167, lng: -94.75 },
  hours: 'Mon–Fri 7:00am – 5:00pm · 24/7 Emergency Service', // PLACEHOLDER: confirm
  facebook: 'https://www.facebook.com/ShepardExcavating/',
  bbb:
    'https://www.bbb.org/us/mn/laporte/profile/excavating-contractors/shepard-excavating-septic-service-0704-96159257',
  gbpReview: '#', // PLACEHOLDER: drop in the Google review link
};

// Plain-language service-area towns (location pages get built later).
export const towns = [
  'Bemidji',
  'Laporte',
  'Park Rapids',
  'Walker',
  'Cass Lake',
  'Hackensack',
  'Longville',
];
export const counties = ['Beltrami', 'Hubbard', 'Cass'];

// Six featured (money) services shown as large cards on the homepage.
export const featuredServices = [
  {
    slug: 'septic-pumping',
    title: 'Septic Pumping & Maintenance',
    blurb: 'Routine pumping, inspections, and cleaning that keep your system healthy and out of trouble.',
    img: 'svc-septic-pumping',
    bucket: 'Septic',
  },
  {
    slug: 'septic-system',
    title: 'Septic System Installation',
    blurb: 'Mound and conventional systems, designed and installed to code. Licensed in Hubbard and Beltrami counties.',
    img: 'svc-septic-install',
    bucket: 'Septic',
  },
  {
    slug: 'excavating',
    title: 'Excavating',
    blurb: 'Basements, foundations, site prep, grading, and road building for homes and cabins.',
    img: 'svc-excavating',
    bucket: 'Site Work',
  },
  {
    slug: 'land-clearing',
    title: 'Land Clearing',
    blurb: 'Lot clearing, tree and stump removal to open up a lake lot or get a new build started.',
    img: 'svc-land-clearing',
    bucket: 'Site Work',
  },
  {
    slug: 'demolition',
    title: 'Demolition',
    blurb: 'Cabin teardowns, old garages, and small commercial structures, hauled away clean.',
    img: 'svc-demolition',
    bucket: 'Site Work',
  },
  {
    slug: 'aggregate',
    title: 'Sand, Gravel & Aggregate',
    blurb: 'Sand, gravel, fill, and crushed rock. Picked up at the pit or delivered to your site.',
    img: 'svc-aggregate',
    bucket: 'Materials',
  },
];

// The rest of the lineup, shown as a compact secondary row so all 10 services are covered.
export const moreServices = [
  { slug: 'septic-emergency', title: 'Septic Emergency', blurb: 'Frozen lines and backups, 24/7.', img: 'svc-emergency' },
  { slug: 'snow-removal', title: 'Snow Removal', blurb: 'Driveways and commercial lots.', img: 'svc-snow' },
  { slug: 'fisher-snowplows', title: 'Fisher Snowplow Dealer', blurb: 'Sales, parts, and service.', img: 'svc-fisher' },
  { slug: 'roll-off-boxes', title: 'Roll-Off Dumpsters', blurb: 'Cleanouts and job debris.', img: 'svc-dumpster' },
];

// Trust-bar stats.
export const stats = [
  { value: '29', label: 'Years in business' },
  { value: '10', label: 'Services, one call' },
  { value: '24/7', label: 'Septic emergencies' },
  { value: '3', label: 'Counties served' },
];

export const whyUs = [
  {
    title: 'Family-owned since 1997',
    body: 'Brian Shepard has run this outfit for 29 years. You deal with the people whose name is on the truck.',
  },
  {
    title: 'One call does it all',
    body: 'Septic, dirt work, gravel, demolition, dumpsters, and snow. Skip juggling four contractors for one job.',
  },
  {
    title: 'Licensed septic installer',
    body: 'Licensed installer and maintainer in Hubbard and Beltrami counties. Permitted, inspected, done right.',
  },
  {
    title: 'We know lake country',
    body: 'Tight cabin lots, rural drives, and Northern Minnesota winters. We have worked this country for three decades.',
  },
];

// PLACEHOLDER reviews — replace with live Google Business Profile reviews before launch.
export const reviews = [
  {
    quote:
      'Brian and his crew put in our new mound system and had it inspected and backfilled faster than we expected. Fair price, no surprises.',
    name: 'Mark D.',
    town: 'Park Rapids, MN',
  },
  {
    quote:
      'Called on a Sunday with a backed-up septic and they walked me through it and were out the next morning. Lifesavers.',
    name: 'Janet R.',
    town: 'Walker, MN',
  },
  {
    quote:
      'Cleared our lake lot, dug the basement, and brought in gravel for the drive. One company, one bill, zero headaches.',
    name: 'Steve & Lori K.',
    town: 'Cass Lake, MN',
  },
];

export const faqs = [
  {
    q: 'Is it Shepard or Shepherd Excavating?',
    a: 'Our family name is Shepard, but folks often write it as Shepherd Excavating. Both point to the same business: Shepard Excavating and Septic Service, LLC, based in Laporte, MN.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We work across Beltrami, Hubbard, and Cass counties, including Bemidji, Laporte, Park Rapids, Walker, Cass Lake, Hackensack, and Longville.',
  },
  {
    q: 'Do you handle septic emergencies after hours?',
    a: 'Yes. Frozen lines and backups do not wait for business hours, and neither do we. Call (218) 224-2754 any time.',
  },
  {
    q: 'Can one company really do all of this?',
    a: 'That is the whole idea. Septic, excavating, land clearing, demolition, gravel, dumpsters, and snow removal, all under one roof since 1997.',
  },
];
