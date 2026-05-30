// Location-page content. Each town gets genuine local detail so the pages are distinct.
// Pages render from this data via src/pages/[slug].astro.

export interface Location {
  slug: string;       // e.g. 'bemidji-mn'
  name: string;       // 'Bemidji'
  county: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  heroImage: string;
  intro: string;
  local: string;      // local landmarks / lakes color
  mapQuery: string;   // for the Google Maps embed
}

export const locations: Location[] = [
  {
    slug: 'bemidji-mn',
    name: 'Bemidji',
    county: 'Beltrami County',
    h1: 'Excavating, Septic & More in Bemidji, MN',
    metaTitle: 'Excavating & Septic in Bemidji, MN | Shepard',
    metaDesc:
      'Septic, excavating, land clearing, demolition, gravel, and snow removal in Bemidji, MN and the surrounding lakes. Family-owned since 1997. Call (218) 224-2754.',
    heroImage: 'hero.jpg',
    intro:
      'Shepard Excavating has worked the Bemidji area for years. From septic systems out on the lake to basements, driveways, gravel, and winter plowing around town, we are the one call for dirt work and septic in Beltrami County.',
    local:
      'We work all around Bemidji, from lake places on Lake Bemidji and Lake Irving to lots out past the university and along the Paul Bunyan Trail. It is a short run from our shop in Laporte, so Bemidji is right in our backyard.',
    mapQuery: 'Bemidji, MN',
  },
  {
    slug: 'laporte-mn',
    name: 'Laporte',
    county: 'Hubbard County',
    h1: 'Excavating, Septic & More in Laporte, MN',
    metaTitle: 'Excavating & Septic in Laporte, MN | Shepard',
    metaDesc:
      'Septic, excavating, gravel, demolition, and snow removal in Laporte, MN, our home base. Family-owned and MPCA-certified since 1997. Call (218) 224-2754.',
    heroImage: 'whyus-septic.jpg',
    intro:
      'Laporte is home. Our shop sits right here, so when you need septic work, excavating, gravel, or snow removal in town or out on the lakes, we are just down the road.',
    local:
      'We have worked the Laporte area and the lakes around it for decades, from new septic systems and basements to driveways, clearing, and winter plowing. Being based here means quick response and a name you already know.',
    mapQuery: 'Laporte, MN 56461',
  },
  {
    slug: 'park-rapids-mn',
    name: 'Park Rapids',
    county: 'Hubbard County',
    h1: 'Excavating, Septic & More in Park Rapids, MN',
    metaTitle: 'Excavating & Septic in Park Rapids, MN | Shepard',
    metaDesc:
      'Septic, excavating, land clearing, demolition, sand and gravel, and snow removal in Park Rapids, MN. Licensed in Hubbard County since 1997. Call (218) 224-2754.',
    heroImage: 'svc-excavating.jpg',
    intro:
      'Park Rapids is home turf. As a licensed installer in Hubbard County, we handle septic systems, excavating, land clearing, gravel, and more for homes, cabins, and businesses across the area.',
    local:
      'We work the lakes and woods all around Park Rapids, from places along the Heartland Trail to cabins out toward the Mississippi headwaters at Itasca. Laporte is just up the road, so we are never far.',
    mapQuery: 'Park Rapids, MN',
  },
  {
    slug: 'walker-mn',
    name: 'Walker',
    county: 'Cass County',
    h1: 'Excavating, Septic & More in Walker, MN',
    metaTitle: 'Excavating & Septic in Walker, MN | Shepard',
    metaDesc:
      'Septic, excavating, land clearing, demolition, gravel, and snow removal around Walker and Leech Lake, MN. Family-owned since 1997. Call (218) 224-2754.',
    heroImage: 'svc-land-clearing.jpg',
    intro:
      'Out on Leech Lake, Shepard Excavating handles the septic and dirt work that lake-country property needs. Installs, pumping, excavating, land clearing, and snow removal for Walker and the surrounding shoreline.',
    local:
      'We do a lot of work on tight lake lots around Walker and the Leech Lake shoreline, where access and grading take a careful hand. Clearing a cabin lot or putting in a new system near the water is right up our alley.',
    mapQuery: 'Walker, MN',
  },
  {
    slug: 'cass-lake-mn',
    name: 'Cass Lake',
    county: 'Cass County',
    h1: 'Excavating, Septic & More in Cass Lake, MN',
    metaTitle: 'Excavating & Septic in Cass Lake, MN | Shepard',
    metaDesc:
      'Septic, excavating, land clearing, demolition, gravel, and snow removal in Cass Lake, MN and the Chippewa National Forest area. Since 1997. Call (218) 224-2754.',
    heroImage: 'svc-aggregate.jpg',
    intro:
      'Around Cass Lake and the Chippewa National Forest, we take care of septic systems, excavating, gravel, land clearing, and winter plowing. One local outfit for the whole job, wherever your place sits.',
    local:
      'The lakes and forest land around Cass Lake make for plenty of cabin and shoreline work, from new septic systems to clearing and grading. We know how to work this country and leave a site clean.',
    mapQuery: 'Cass Lake, MN',
  },
  {
    slug: 'hackensack-mn',
    name: 'Hackensack',
    county: 'Cass County',
    h1: 'Excavating, Septic & More in Hackensack, MN',
    metaTitle: 'Excavating & Septic in Hackensack, MN | Shepard',
    metaDesc:
      'Septic, excavating, land clearing, demolition, gravel, and snow removal around Hackensack and the Woman Lake chain, MN. Since 1997. Call (218) 224-2754.',
    heroImage: 'svc-septic-install.jpg',
    intro:
      'Hackensack and the Woman Lake chain are lake country through and through, and that means septic and dirt work done right. We install and pump systems, excavate, clear lots, haul gravel, and plow all winter.',
    local:
      'From places on Birch Lake and Ten Mile Lake to the cabins scattered through the woods around town, we handle the kind of lake-lot work that keeps a property in good shape for years.',
    mapQuery: 'Hackensack, MN',
  },
  {
    slug: 'longville-mn',
    name: 'Longville',
    county: 'Cass County',
    h1: 'Excavating, Septic & More in Longville, MN',
    metaTitle: 'Excavating & Septic in Longville, MN | Shepard',
    metaDesc:
      'Septic, excavating, gravel, demolition, and snow removal around Longville and the Woman Lake area, MN. Family-owned since 1997. Call (218) 224-2754.',
    heroImage: 'fleet-1.jpg',
    intro:
      'Up around Longville and the Woman Lake area, we are the one call for septic systems, excavating, land clearing, gravel, and snow removal. Lake-country work is what we do.',
    local:
      'Longville sits right in the lakes, and we work the cabins and properties all around it, from new drain fields to driveways, clearing, and winter plowing. It is a bit of a drive from Laporte, and we are glad to make it.',
    mapQuery: 'Longville, MN',
  },
];

export const locationBySlug = Object.fromEntries(locations.map((l) => [l.slug, l]));
