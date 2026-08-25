// Service-page content. Plain-spoken voice, details grounded in the client's original site.
// Copy is editable in TinaCMS (content/services/*.json overlays the values here);
// structure (slugs, buckets, related, galleries) stays in this file only.
import { contentJson } from '../lib/content';

export interface ServiceFaq { q: string; a: string; }
export interface Service {
  slug: string;
  navLabel: string;
  bucket: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  heroImage: string;          // basename in src/assets/photos or src/assets/gallery
  lead: string;
  includedHeading: string;
  included: string[];
  factors?: string[];
  timeline?: string;
  expect?: string;
  faqs: ServiceFaq[];
  related: string[];          // sibling service slugs
  gallery: string[];          // gallery image basenames
  emphasizePhone?: boolean;
  heroUpload?: string;        // CMS-uploaded hero override (path under /uploads)
  photos?: { image: string }[]; // CMS photo strip override; replaces gallery when non-empty
}

const baseServices: Service[] = [
  {
    slug: 'septic-pumping',
    navLabel: 'Septic Pumping & Maintenance',
    bucket: 'Septic',
    h1: 'Septic Pumping & Maintenance in Northern Minnesota',
    metaTitle: 'Septic Pumping in Northern Minnesota | Shepard',
    metaDesc:
      'Septic tank pumping, inspections, and line cleaning across Northern Minnesota. Septic professionals since 1997. Call (218) 224-2754.',
    heroImage: 'svc-septic-pumping.jpg',
    lead:
      'Routine pumping, inspections, and line cleaning that keep your system healthy and out of trouble. With proper maintenance, a system can last for years, so most folks have theirs pumped every two to three years.',
    includedHeading: "What's included",
    included: [
      'Septic tank pumping',
      'Tank, lid, and baffle inspection',
      'Sewer rooter and line cleaning',
      'Septic and water line steaming for frozen lines',
      'Bringing your manhole up to grade (a newer state code that makes service faster)',
      'Maintenance scheduling so you do not have to keep track',
    ],
    factors: [
      'Tank size and how long it has been since the last pump',
      'How easy the tank and lid are to find and reach',
      'Whether the manhole is up to grade',
      'Travel distance to your property',
      'Anything we find that needs repair',
    ],
    timeline:
      'A routine pump-and-inspect visit is usually a couple of hours. Backups and line issues are scheduled as soon as a truck is available during business hours.',
    expect:
      'We locate and uncover the tank, pump it down, and check the lid and baffles. If we spot something that needs attention, we tell you straight and what it will cost. Then we leave the site clean.',
    faqs: [
      { q: 'How often should I have my tank pumped?', a: 'Most experts recommend every two to three years. If you are not sure when yours was last done, give us a call and we will get you on the schedule.' },
      { q: 'Why bring the manhole up to grade?', a: 'It is a newer state code, and it makes maintaining and inspecting your tank faster and easier every time, with no digging to find the lid.' },
      { q: 'Can you clear a frozen line?', a: 'Yes. We steam frozen septic and water lines to thaw them out the right way, which matters in a Northern Minnesota winter.' },
      { q: 'My septic alarm is going off. What do I do?', a: 'Call us at (218) 224-2754. We will walk you through a couple of things to check and help you schedule the right service.' },
    ],
    related: ['septic-system', 'septic-education'],
    gallery: ['septic-1.jpg', 'septic-2.jpg', 'septic-4.jpg'],
  },
  {
    slug: 'septic-system',
    navLabel: 'Septic System Installation',
    bucket: 'Septic',
    h1: 'Septic System Installation in Northern Minnesota',
    metaTitle: 'Septic Installation in Northern Minnesota | Shepard',
    metaDesc:
      'MPCA-certified septic installer with 20+ years. Mound and conventional systems designed, permitted, and installed across Northern Minnesota.',
    heroImage: 'svc-septic-install.jpg',
    lead:
      'New mound and conventional systems, designed, permitted, and installed to code. We are an MPCA-certified installer with more than 20 years putting systems in the ground, and we are here for you from the first drawing to the final inspection.',
    includedHeading: "What's included",
    included: [
      'Site evaluation and system design',
      'County permit applications',
      'Full installation: tank, lines, and drain field or mound',
      'Conventional systems, mound systems, and holding tanks',
      'System replacements',
      'Final inspection',
    ],
    factors: [
      'System type (conventional, mound, or holding tank)',
      'Your soil and site conditions',
      'Size of the home and number of bedrooms',
      'Site access and how much dirt work is needed',
      'County permit and inspection requirements',
    ],
    timeline:
      'Design and permitting run on the county’s clock. Once we are approved and scheduled, the install itself is usually a few days.',
    expect:
      'We walk the site with you, handle the design and the county paperwork, install the system, and stay with it through the final inspection. Because we also pump and maintain systems, we see what fails and why, so we build yours to last.',
    faqs: [
      { q: 'Are you a licensed installer?', a: 'Yes. We are an MPCA-certified septic installer with more than 20 years of experience, licensed in Hubbard and Beltrami counties.' },
      { q: 'Mound or conventional, which do I need?', a: 'It depends on your soil, water table, and site. We evaluate the property and recommend the right system instead of guessing.' },
      { q: 'Do you handle the permits?', a: 'Yes. We take care of the septic design and the county permit applications and stay with the job through the final inspection.' },
      { q: 'How long does a system last?', a: 'A well-built system that is pumped and maintained can last for decades. The drain field is the part you have to protect, and we will show you how.' },
    ],
    related: ['septic-pumping', 'septic-education', 'excavating'],
    gallery: ['septic-3.jpg', 'septic-5.jpg', 'septic-6.jpg'],
  },
  {
    slug: 'septic-education',
    navLabel: 'Septic Education',
    bucket: 'Septic',
    h1: 'Septic System Care & Education',
    metaTitle: 'Septic System Care & Education | Shepard Excavating',
    metaDesc:
      'Septic system care from an MPCA-certified installer: pumping schedules, drain field tips, and what not to flush. Shepard Excavating, Laporte, MN.',
    heroImage: 'gal-septic.jpg',
    lead:
      'A healthy septic system can last for decades. Here is how to get the most out of yours and steer clear of an expensive surprise.',
    includedHeading: 'Caring for your system',
    included: [
      'Keep the drain field mowed and clear, and do not let trees grow on it. Roots get into the pipes and cause the field to fail.',
      'Do not park, drive on, or build over the drain field. Compacting it can ruin the system.',
      'Watch for PVC pipes sticking up out of the ground. They are easy to hit with a mower, and they should be replaced if they break.',
      'Keep an eye out for gophers in the drain field. They can cause failures too.',
      'Be careful what you flush. Wipes, grease, and chemicals are hard on a septic system.',
      'Have the tank pumped every two to three years so solids do not reach the drain field.',
    ],
    expect:
      'Once a drain field fails, a new one has to be installed, and that is a big bill. A little care and a regular pumping schedule go a long way. If you ever are not sure how your system is doing, give us a call.',
    faqs: [
      { q: 'How often should the tank be pumped?', a: 'Every two to three years for most households. Pumping keeps solids from building up and reaching the drain field, which is the part you really want to protect.' },
      { q: 'What should I keep out of the system?', a: 'Wipes (even the flushable kind), grease, paint, harsh chemicals, and anything that does not break down. They clog lines and stress the system.' },
      { q: 'Why can I not park on the drain field?', a: 'The weight compacts the soil and can crush the pipes, and once the field fails it has to be replaced. Keep vehicles and structures off of it.' },
      { q: 'How do I know if my system is failing?', a: 'Slow drains, odors, soggy spots or lush grass over the drain field, or an alarm. If you notice any of those, call us before it gets worse.' },
    ],
    related: ['septic-pumping', 'septic-system'],
    gallery: ['septic-5.jpg', 'septic-6.jpg'],
  },
  {
    slug: 'excavating',
    navLabel: 'Excavating',
    bucket: 'Site Work',
    h1: 'Excavating in Northern Minnesota',
    metaTitle: 'Excavating in Northern Minnesota | Shepard',
    metaDesc:
      'Basements, foundations, site prep, grading, and road building across Northern Minnesota. Licensed and bonded since 1997. Call (218) 224-2754.',
    heroImage: 'svc-excavating.jpg',
    lead:
      'Basements, foundations, site prep, grading, and road building, large or small, handled by a licensed and bonded team that takes the job from the first cut to final grade.',
    includedHeading: 'What we do',
    included: [
      'Excavation and grading',
      'Residential and commercial site development',
      'Building pads and basements',
      'Road building and driveways',
      'Ponds and parking lots',
      'Trenching and water lines',
      'Land clearing, tree and stump removal',
    ],
    factors: [
      'Size and depth of the dig',
      'Soil and site conditions',
      'Access for trucks and equipment',
      'How much material has to be hauled in or out',
      'Any permits the job requires',
    ],
    timeline:
      'It depends on the scope. We will give you a realistic window once we have looked at the job and the site.',
    expect:
      'We show up with the right iron, do the work, and leave the site graded and cleaned up. One company from the first cut to the final grade, instead of lining up three different outfits.',
    faqs: [
      { q: 'Do you do both residential and commercial?', a: 'Yes. Whether it is a cabin pad on a lake lot or a commercial site, we handle the dirt work either way.' },
      { q: 'Can you prep a site for a new build?', a: 'Absolutely. Building pads, basements, driveways, and grading are everyday work for us.' },
      { q: 'Can you bring in fill and gravel?', a: 'Yes. We sell and haul our own sand, gravel, and fill, so it all comes from one call.' },
      { q: 'Are you licensed and insured?', a: 'Yes, we are a licensed and bonded business and have been at it since 1997.' },
    ],
    related: ['land-clearing', 'aggregate', 'septic-system', 'demolition'],
    gallery: ['excavating-1.jpg', 'excavating-3.jpg', 'excavating-8.jpg'],
  },
  {
    slug: 'land-clearing',
    navLabel: 'Land Clearing',
    bucket: 'Site Work',
    h1: 'Land Clearing in Northern Minnesota',
    metaTitle: 'Land Clearing in Northern Minnesota | Shepard',
    metaDesc:
      'Lot clearing, tree and stump removal for lake lots and new builds across Northern Minnesota. Family-owned since 1997. Call Shepard at (218) 224-2754.',
    heroImage: 'svc-land-clearing.jpg',
    lead:
      'Opening up a lake lot or getting a building site ready? We clear lots, drop and remove trees, and pull stumps so you can get started.',
    includedHeading: 'What we do',
    included: [
      'Lot and building-site clearing',
      'Tree and stump removal',
      'Brush and debris removal',
      'Grading after clearing',
      'Hauling the debris away',
    ],
    factors: [
      'Size of the area being cleared',
      'How heavily wooded it is',
      'Number and size of stumps',
      'What you want done with the debris (haul, pile, or burn)',
      'Access to the site',
    ],
    timeline:
      'A small lot can be a day or two. Bigger clearing jobs depend on the trees and the terrain, and we will give you a window up front.',
    expect:
      'We clear what you mark, haul off or pile the debris, and leave the lot ready for the next step. Lake-lot work is something we do a lot of around here.',
    faqs: [
      { q: 'Do you clear lake lots?', a: 'Yes, all the time. Tight lots and tree-lined shorelines are common around here and we know how to work them.' },
      { q: 'Do you haul the debris away?', a: 'We can haul it off, pile it, or work with however you want it handled.' },
      { q: 'Do you grade the lot after clearing?', a: 'Yes. We can leave it rough or graded and ready to build on, whichever you need.' },
      { q: 'Do you remove stumps?', a: 'Yes, stump removal is part of clearing a site properly.' },
    ],
    related: ['excavating', 'demolition', 'aggregate'],
    gallery: ['landclearing-1.jpg', 'landclearing-2.jpg', 'landclearing-4.jpg'],
  },
  {
    slug: 'demolition',
    navLabel: 'Demolition',
    bucket: 'Site Work',
    h1: 'Demolition in Northern Minnesota',
    metaTitle: 'Demolition in Northern Minnesota | Shepard',
    metaDesc:
      'Cabin teardowns, garages, and small commercial demolition, hauled away clean, across Northern Minnesota. Call Shepard at (218) 224-2754.',
    heroImage: 'svc-demolition.jpg',
    lead:
      'Old cabins, garages, sheds, and small commercial structures, torn down and hauled away clean. We handle the equipment, hauling, and disposal, so it is all one call.',
    includedHeading: 'What we do',
    included: [
      'Cabin and house teardowns',
      'Garage and outbuilding demolition',
      'Small commercial demolition',
      'Concrete and old foundation removal',
      'Debris haul-off with our own trucks and containers',
      'Grading the site afterward',
    ],
    factors: [
      'Size and type of the structure',
      'What it is built of',
      'Whether there is concrete or a foundation to remove',
      'Debris volume and disposal needs',
      'Site access',
    ],
    timeline:
      'Most residential teardowns are a few days, including cleanup and haul-off.',
    expect:
      'We knock it down, load it out with our own equipment, and grade the spot back so you would hardly know it was there. One crew handles the teardown, hauling, and cleanup.',
    faqs: [
      { q: 'Do you tear down cabins and garages?', a: 'Yes. Cabin teardowns, old garages, sheds, and small commercial buildings are regular work for us.' },
      { q: 'Can you remove an old foundation?', a: 'Yes. We remove concrete slabs and block foundations and bring in fill to grade the site back. Have a look at the before and after on our homepage.' },
      { q: 'Do you haul the debris?', a: 'We do. Our trucks and containers stay with our demolition crew, so one call covers the teardown and the cleanup.' },
      { q: 'Do I need a permit?', a: 'Some demolition needs a permit. We will let you know what your job requires and help you sort it out.' },
    ],
    related: ['excavating', 'land-clearing'],
    gallery: ['demolition-1.jpg', 'demolition-2.jpg', 'demolition-3.jpg'],
  },
  {
    slug: 'aggregate',
    navLabel: 'Sand, Gravel & Aggregate',
    bucket: 'Materials',
    h1: 'Sand, Gravel & Aggregate in Northern Minnesota',
    metaTitle: 'Sand & Gravel in Northern Minnesota | Shepard',
    metaDesc:
      'Fill, sand, Class 5 gravel, washed rock, and boulders, delivered or picked up across Northern Minnesota. Call Shepard for pricing today.',
    heroImage: 'svc-aggregate.jpg',
    lead:
      'Fill, sand, gravel, and rock, delivered to your site or picked up at the pit. We can spread it for you too.',
    includedHeading: 'Materials we carry',
    included: [
      'Fill sand',
      'Screened topsoil',
      'Class 5 gravel',
      'Crushed concrete',
      '1½-inch washed rock',
      'Boulders',
      'Delivery and spreading',
    ],
    factors: [
      'Material type and quantity',
      'Delivery distance',
      'Whether you want it spread',
      'Site access for the truck',
    ],
    timeline:
      'Delivery is usually quick once we know what you need and where it is going. Call for current pricing and availability.',
    expect:
      'Tell us the material, the amount, and where it goes. We will get it there and spread it if you want. If you need something that is not on the list, we can usually source it.',
    faqs: [
      { q: 'Do you deliver, or do I pick it up?', a: 'Either one. We deliver across the area, or you can pick up at the pit.' },
      { q: 'Can you spread it for me?', a: 'Yes. We can deliver and spread it in one trip.' },
      { q: 'What gravel is best for a driveway?', a: 'Class 5 is the usual pick for driveways. Tell us about your drive and we will point you the right way.' },
      { q: 'Do you carry materials not on the list?', a: 'This is what we commonly sell, but if you need something particular, we can usually get it for you.' },
    ],
    related: ['excavating', 'land-clearing', 'snow-removal'],
    gallery: ['aggregate-1.jpg', 'aggregate-3.jpg', 'aggregate-5.jpg'],
  },
  {
    slug: 'snow-removal',
    navLabel: 'Snow Removal',
    bucket: 'Seasonal',
    h1: 'Snow Removal in Northern Minnesota',
    metaTitle: 'Snow Removal in Northern Minnesota | Shepard',
    metaDesc:
      'Driveway and commercial snow plowing across Northern Minnesota all winter. Seasonal routes fill up, so call (218) 224-2754 early.',
    heroImage: 'svc-snow.jpg',
    lead:
      'Driveways and commercial lots cleared through the long Northern Minnesota winter. Reliable plowing so you can get where you are going.',
    includedHeading: 'What we do',
    included: [
      'Residential driveway plowing',
      'Commercial lot plowing',
      'Seasonal and per-storm service',
      'Loader work for big piles',
      'Ice dam removal',
    ],
    factors: [
      'Size of the driveway or lot',
      'How often you want it cleared (per storm or seasonal)',
      'Where the snow gets stacked',
      'Distance',
    ],
    timeline:
      'We run routes during and after storms. Get on the list before the season fills up.',
    expect:
      'We plow it clean and stack the snow out of your way. Long lake-country drives and commercial lots are no problem.',
    faqs: [
      { q: 'Do you plow residential and commercial?', a: 'Both. Driveways, long rural drives, and commercial lots are all on our routes.' },
      { q: 'Can I sign up for the whole season?', a: 'Yes. Seasonal service means you do not have to call after every storm. Sign up early before the routes fill.' },
      { q: 'Do you handle ice dams?', a: 'Yes, we remove ice dams as part of our winter work.' },
      { q: 'When should I get on the list?', a: 'Before the snow flies. Routes fill up, so the earlier you call, the better.' },
    ],
    related: ['fisher-snowplows', 'aggregate'],
    gallery: ['snow-1.jpg', 'snow-3.jpg'],
  },
  {
    slug: 'fisher-snowplows',
    navLabel: 'Fisher Snowplow Dealer',
    bucket: 'Seasonal',
    h1: 'Fisher Snowplow Dealer in Northern Minnesota',
    metaTitle: 'Fisher Snowplow Dealer in Northern Minnesota | Shepard',
    metaDesc:
      'Fisher snowplow sales, parts, installation, and service across Northern Minnesota. We run Fisher on our own trucks. Call (218) 224-2754.',
    heroImage: 'svc-fisher.jpg',
    lead:
      'We are a Fisher snowplow dealer, so we sell, install, and service the plows we trust on our own trucks.',
    includedHeading: 'What we offer',
    included: [
      'Fisher snowplow sales',
      'Plow installation',
      'Parts',
      'Service and repair',
      'Help picking the right plow for your truck',
    ],
    expect:
      'Whether you need a new plow, parts, or a repair before the next storm, we can help. We run Fisher gear ourselves, so we know it inside and out.',
    faqs: [
      { q: 'Do you install the plows you sell?', a: 'Yes. We sell and install Fisher plows and can set you up right.' },
      { q: 'Do you stock parts and do repairs?', a: 'We do. Parts, service, and repairs are all part of being a Fisher dealer.' },
      { q: 'Which plow is right for my truck?', a: 'Bring us your truck details and we will help you spec the right Fisher plow for it.' },
      { q: 'Do you service plows you did not sell?', a: 'Give us a call. We will let you know what we can do for your setup.' },
    ],
    related: ['snow-removal'],
    gallery: ['snow-2.jpg', 'snow-4.jpg'],
  },
];

// CMS overlay: copy edited in TinaCMS (content/services/*.json) wins over the
// TS fallback above. See src/lib/content.ts.
export const services: Service[] = baseServices.map((s) => ({
  ...s,
  ...(contentJson<Partial<Service>>(`services/${s.slug}`) ?? {}),
}));

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
