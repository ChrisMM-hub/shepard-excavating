// Central content + business data for the Shepard Excavating homepage prototype.
// All facts pulled from the project brief. Items flagged PLACEHOLDER need Janele to confirm.
// Reviews and FAQs are editable in TinaCMS (content/site/*.json overlays the values here).
import { contentJson } from '../lib/content';

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
  // Owner-confirmed hours (2026-08-19). Do not advertise weekend availability.
  hours: 'Monday–Friday: 7:00am–5:00pm · Saturday–Sunday: Closed',
  facebook: 'https://www.facebook.com/ShepardExcavating/',
  bbb:
    'https://www.bbb.org/us/mn/laporte/profile/excavating-contractors/shepard-excavating-septic-service-0704-96159257',
  gbpReview: '#', // PLACEHOLDER: drop in the Google review link
};

// "Watch us work" video section.
// Leave both empty to show the placeholder. To go live, set ONE of:
//   youtubeId: 'XXXXXXXXXXX'           (a YouTube video id)
//   mp4: '/video/shepard-reel.mp4'      (a file placed in public/video/)
export const video = {
  youtubeId: '',
  mp4: '',
};

// Same-origin lead endpoint. The Vercel function keeps the HighLevel webhook out of
// the browser, validates submissions, and only
// reports success after HighLevel accepts the request.
export const leadEndpoint = '/api/lead';

// GA4 measurement ID. Property "Shepard Excavating" (account "Shepard Excavating")
// under admin@minnesotamarketing.com, created 2026-08-11. Stream: Shepard Excavating
// Website -> https://www.shepardexcavating.com. Only loads in production builds, so
// `npm run dev` never pollutes the client's analytics. Empty string disables the tag.
export const ga4Id = 'G-TC5EQEJWTB';

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

// The rest of the lineup, shown as a compact secondary row so all eight services are covered.
export const moreServices = [
  { slug: 'snow-removal', title: 'Snow Removal', blurb: 'Driveways and commercial lots.', img: 'svc-snow' },
  { slug: 'fisher-snowplows', title: 'Fisher Snowplow Dealer', blurb: 'Sales, parts, and service.', img: 'svc-fisher' },
];

// Trust-bar stats.
export const stats = [
  { value: '29', label: 'Years in business' },
  { value: '8', label: 'Services, one call' },
  { value: '7', label: 'Towns served' },
  { value: '3', label: 'Counties served' },
];

export const whyUs = [
  {
    title: 'Family-owned since 1997',
    body: 'Brian Shepard has run this outfit for 29 years. You deal with the people whose name is on the truck.',
  },
  {
    title: 'One call does it all',
    body: 'Septic, dirt work, gravel, demolition, and snow. Skip juggling four contractors for one job.',
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

// Real reviews: Google Business Profile + recommendations from the Facebook page.
const baseReviews = [
  {
    quote:
      'Todd from Shepard Excavating is the best! He dug out the manhole cover and pumped the tank clean. He explained everything thoroughly and we are permanent customers now. Thank you Shepard for such fantastic service. We will spread the word.',
    name: 'Faith Bammer',
    date: 'August 2026',
    source: 'google',
  },
  {
    quote:
      'My septic alarm was going off last Saturday so I called them. They walked me through a few things I could check myself. We came to the conclusion my pump was not working and the tank was full. They came out right away Monday and fixed us up. Great service, fair price.',
    name: 'Chuck Savage',
    date: 'March 2020',
    source: 'facebook',
  },
  {
    quote:
      "Amazing work. They truly care about what you want and need. Highly recommend. Great people. Do good at what they do. It's so cool that it's a family. We will always support them!",
    name: 'Jaime Duffy',
    date: 'October 2021',
    source: 'facebook',
  },
  {
    quote:
      'Shepard Excavating recently removed an old concrete slab and block foundation for us and brought in fill to make this old foundation a thing of the past.',
    name: 'Marcus C. Curtis',
    date: 'April 2020',
    source: 'facebook',
  },
];

export const reviews =
  contentJson<{ reviews: typeof baseReviews }>('site/reviews')?.reviews ?? baseReviews;

// Answers use real details pulled from the client's original site for accuracy.
const baseFaqs = [
  {
    q: 'Is it Shepard or Shepherd Excavating?',
    a: 'Our family name is Shepard, but folks often write it as Shepherd Excavating. Both point to the same business: Shepard Excavating and Septic Service, LLC, based in Laporte, MN.',
  },
  {
    q: 'How often should I have my septic tank pumped?',
    a: 'Most experts recommend having your septic system pumped every two to three years. Give us a call and we will get you on the schedule at a fair rate.',
  },
  {
    q: 'Are you a licensed septic installer?',
    a: 'Yes. We are an MPCA-certified septic installer with more than 20 years of experience. We handle the whole process: drawing up the septic design, applying for county permits, the installation, and the final inspection.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Northern Minnesota across Beltrami, Hubbard, and Cass counties, including Bemidji, Laporte, Park Rapids, Walker, Cass Lake, Hackensack, Longville, and the surrounding lake country.',
  },
  {
    q: 'Can you thaw frozen septic and water lines?',
    a: 'Yes. We steam frozen septic and water lines and clear sewer backups with our rooter and line-cleaning service. Call (218) 224-2754 during business hours to schedule service.',
  },
  {
    q: 'What kinds of sand and gravel do you sell?',
    a: 'Fill sand, screened topsoil, Class 5 gravel, crushed concrete, 1½-inch washed rock, and boulders. We can deliver it and spread it for you, and we will source other materials on request.',
  },
  {
    q: 'Can one company really handle all of this?',
    a: 'That is the whole idea. Septic, excavating, land clearing, demolition, sand and gravel, and snow removal, all under one roof since 1997. One call instead of juggling four contractors.',
  },
];

export const faqs = contentJson<{ faqs: typeof baseFaqs }>('site/faqs')?.faqs ?? baseFaqs;

// Homepage copy, editable in TinaCMS (content/site/homepage.json overlays these
// fallbacks). Structure stays in the components: feature-band order, photos,
// button destinations, and section layout are not editable.
const baseHomepage = {
  hero: {
    title: 'Top Quality Work\nwith Honesty and Integrity',
    phonePill: 'Give us a call today 218-224-2754',
  },
  features: [
    {
      key: 'excavating',
      heading: 'Helping you make room',
      // Paragraphs are {text} objects (not bare strings) so the CMS can give
      // each paragraph its own textarea; see the homepage collection in tina/.
      paragraphs: [
        { text: 'We have the equipment and expertise to help with any and all of your excavation and demolition projects. From making room for your new dream home to driveway building we got you covered.' },
        { text: 'Work with us and we will handle all of your land clearing done in a timely fashion.' },
      ],
      btnLabel: 'Excavating',
      photoUpload: '',
    },
    {
      key: 'septic',
      heading: 'Septic pumping & maintenance',
      paragraphs: [
        { text: 'Routine pumping, inspections, and line cleaning help keep your system healthy and out of trouble.' },
        { text: 'We also steam frozen septic and water lines and can help you get on a regular maintenance schedule.' },
      ],
      btnLabel: 'Septic Pumping',
      photoUpload: '',
    },
    {
      key: 'fisher',
      heading: 'Fisher Snowplows',
      paragraphs: [
        { text: 'Come check out our line up of Fisher snowplows for sale. We have a variety of snowplows on hand or can order anything you need.' },
        { text: "We can get v-plows or straight blades for 1/2 ton vehicles. Meaning we can set you up to push snow with just about anything! As well as ATV's! We also sell a variety of salters." },
        { text: 'We can order snow plows year round. So you are prepared before winter hits.' },
      ],
      btnLabel: 'Fisher Snowplows',
      photoUpload: '',
    },
  ],
  calculator: {
    heading: 'How much material will your project need?',
    body: 'Use our free Material Calculator for a quick cubic-yard estimate on fill, gravel, sand, or topsoil before you order. No guesswork, no coming up short.',
  },
};

export const homepage = (() => {
  const copy = contentJson<Partial<typeof baseHomepage>>('site/homepage');
  if (!copy) return baseHomepage;
  return {
    hero: { ...baseHomepage.hero, ...(copy.hero ?? {}) },
    // Merge by key so a reordered or partial CMS list can never break the bands.
    features: baseHomepage.features.map((f) => ({
      ...f,
      ...(copy.features?.find((c) => c && c.key === f.key) ?? {}),
    })),
    calculator: { ...baseHomepage.calculator, ...(copy.calculator ?? {}) },
  };
})();
