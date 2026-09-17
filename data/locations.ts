/**
 * data/locations.ts
 * A single source of truth for every place shown on the map.
 * Keeping the data here (and out of the component) means the map component
 * only worries about drawing, and adding a new place is a one-line edit.
 */

/**
 * Category
 * The set of categories a location may belong to, written as a union of
 * exact strings rather than plain `string`. TypeScript will now reject a
 * typo such as "Hospitl" at compile time, and this same type drives the
 * colour lookup (Step 4) and the filter checkboxes (Step 5).
 */
export type Category =
  | "Landmark"
  | "Market"
  | "Hospital"
  | "Transit"
  | "Tech Hub"
  | "Education"
  | "Recreation";

/**
 * CATEGORIES
 * Every category in one array, in the order the filter panel should list
 * them. Listing them here lets the UI loop over categories instead of
 * hard-coding them inside a component.
 */
export const CATEGORIES: Category[] = [
  "Landmark",
  "Market",
  "Hospital",
  "Transit",
  "Tech Hub",
  "Education",
  "Recreation",
];

/**
 * LagosLocation
 * The shape every place on the map must have. Because `category` is typed
 * as Category (not string), a place with an unknown category becomes a
 * build error rather than a marker that silently fails to appear.
 */
export interface LagosLocation {
  id: number;
  name: string;
  category: Category;
  description: string;
  address: string;
  lat: number;
  lng: number;
}

/**
 * locations
 * 26 real places across Lagos, spread over all seven categories.
 * Coordinates place each pin in the correct street or neighbourhood.
 */
export const locations: LagosLocation[] = [
  // ---------- Landmarks ----------
  {
    id: 1,
    name: "National Arts Theatre",
    category: "Landmark",
    description:
      "Nigeria's iconic cultural centre, built in 1976 and shaped like a military cap.",
    address: "Iganmu, Surulere, Lagos",
    lat: 6.4781,
    lng: 3.362,
  },
  {
    id: 2,
    name: "Freedom Park",
    category: "Landmark",
    description:
      "A former colonial-era prison transformed into an open-air arts, culture and music venue.",
    address: "1 Hospital Road, Broad Street, Lagos Island",
    lat: 6.4498,
    lng: 3.3977,
  },
  {
    id: 3,
    name: "Tafawa Balewa Square",
    category: "Landmark",
    description:
      "The ceremonial square where Nigeria's independence was declared in 1960.",
    address: "Onikan, Lagos Island",
    lat: 6.4531,
    lng: 3.3958,
  },
  {
    id: 4,
    name: "Nike Art Gallery",
    category: "Landmark",
    description:
      "A five-storey gallery holding thousands of works by Nigerian artists.",
    address: "2 Elegushi Road, Lekki Phase 1",
    lat: 6.4419,
    lng: 3.4735,
  },

  // ---------- Markets ----------
  {
    id: 5,
    name: "Balogun Market",
    category: "Market",
    description:
      "A sprawling street market famous for textiles, fabrics and wholesale trade.",
    address: "Balogun Street, Lagos Island",
    lat: 6.4552,
    lng: 3.3903,
  },
  {
    id: 6,
    name: "Computer Village",
    category: "Market",
    description:
      "West Africa's largest hub for phones, laptops and electronics repair.",
    address: "Otigba Street, Ikeja",
    lat: 6.5966,
    lng: 3.3376,
  },
  {
    id: 7,
    name: "Lekki Arts and Crafts Market",
    category: "Market",
    description:
      "An open-air market selling Nigerian art, carvings, beads and handmade crafts.",
    address: "Ozumba Mbadiwe Avenue, Victoria Island",
    lat: 6.4291,
    lng: 3.4263,
  },
  {
    id: 8,
    name: "Mile 12 Market",
    category: "Market",
    description:
      "The city's main wholesale food market, supplying produce across Lagos.",
    address: "Ikorodu Road, Kosofe",
    lat: 6.5851,
    lng: 3.3899,
  },

  // ---------- Hospitals ----------
  {
    id: 9,
    name: "Lagos University Teaching Hospital (LUTH)",
    category: "Hospital",
    description:
      "A major federal teaching hospital and one of Nigeria's largest medical centres.",
    address: "Idi-Araba, Surulere, Lagos",
    lat: 6.5162,
    lng: 3.3543,
  },
  {
    id: 10,
    name: "Lagos State University Teaching Hospital (LASUTH)",
    category: "Hospital",
    description:
      "The Lagos State government's flagship teaching and referral hospital.",
    address: "1-5 Oba Akinjobi Way, Ikeja GRA",
    lat: 6.5951,
    lng: 3.3449,
  },
  {
    id: 11,
    name: "Reddington Hospital",
    category: "Hospital",
    description:
      "A private multi-specialist hospital serving the Victoria Island area.",
    address: "12 Idowu Martins Street, Victoria Island",
    lat: 6.4302,
    lng: 3.4204,
  },
  {
    id: 12,
    name: "General Hospital Lagos",
    category: "Hospital",
    description:
      "The oldest hospital in Nigeria, founded in 1893 and still serving Lagos Island.",
    address: "Broad Street, Lagos Island",
    lat: 6.4534,
    lng: 3.3921,
  },

  // ---------- Transit hubs ----------
  {
    id: 13,
    name: "Murtala Muhammed International Airport",
    category: "Transit",
    description:
      "Nigeria's busiest airport and the main international gateway into Lagos.",
    address: "Airport Road, Ikeja",
    lat: 6.5774,
    lng: 3.3212,
  },
  {
    id: 14,
    name: "MMA2 Domestic Terminal",
    category: "Transit",
    description:
      "The privately run domestic terminal handling flights across Nigeria.",
    address: "Ikeja, Lagos",
    lat: 6.5745,
    lng: 3.3305,
  },
  {
    id: 15,
    name: "Oshodi Transport Interchange",
    category: "Transit",
    description:
      "A three-terminal bus interchange linking BRT and intercity routes.",
    address: "Oshodi, Lagos",
    lat: 6.5556,
    lng: 3.3402,
  },
  {
    id: 16,
    name: "CMS Bus Terminal",
    category: "Transit",
    description:
      "A central BRT terminal on Lagos Island, beside the Marina ferry jetty.",
    address: "Marina, Lagos Island",
    lat: 6.4501,
    lng: 3.3952,
  },

  // ---------- Tech hubs ----------
  {
    id: 17,
    name: "Co-Creation Hub (CcHUB)",
    category: "Tech Hub",
    description:
      "Nigeria's best-known innovation centre and startup incubator, opened in 2011.",
    address: "294 Herbert Macaulay Way, Sabo, Yaba",
    lat: 6.5095,
    lng: 3.3711,
  },
  {
    id: 18,
    name: "The Workstation",
    category: "Tech Hub",
    description:
      "A co-working space widely used by Lagos startups and remote workers.",
    address: "630 Adeyemo Alakija Street, Victoria Island",
    lat: 6.429,
    lng: 3.4231,
  },
  {
    id: 19,
    name: "Impact Hub Lagos",
    category: "Tech Hub",
    description:
      "Part of a global network of hubs supporting social entrepreneurs.",
    address: "Ikeja GRA, Lagos",
    lat: 6.582,
    lng: 3.351,
  },
  {
    id: 20,
    name: "Zone Tech Park",
    category: "Tech Hub",
    description:
      "A technology park in Gbagada hosting startups, offices and tech events.",
    address: "Gbagada Expressway, Gbagada",
    lat: 6.556,
    lng: 3.388,
  },

  // ---------- Education ----------
  {
    id: 21,
    name: "University of Lagos (UNILAG)",
    category: "Education",
    description:
      "A leading federal university on a lagoon-front campus in Akoka.",
    address: "Akoka, Yaba, Lagos",
    lat: 6.5158,
    lng: 3.3966,
  },
  {
    id: 22,
    name: "Yaba College of Technology",
    category: "Education",
    description:
      "Nigeria's first higher-education institution of technology, founded in 1947.",
    address: "Herbert Macaulay Way, Yaba",
    lat: 6.518,
    lng: 3.376,
  },
  {
    id: 23,
    name: "Lagos State University (LASU)",
    category: "Education",
    description: "The main state-owned university, on a large campus in Ojo.",
    address: "Lagos-Badagry Expressway, Ojo",
    lat: 6.472,
    lng: 3.198,
  },

  // ---------- Recreation ----------
  {
    id: 24,
    name: "Lekki Conservation Centre",
    category: "Recreation",
    description:
      "A nature reserve with a long canopy walkway, protecting coastal wetlands.",
    address: "Lekki-Epe Expressway, Lekki",
    lat: 6.4406,
    lng: 3.5385,
  },
  {
    id: 25,
    name: "Landmark Beach",
    category: "Recreation",
    description:
      "A private beach and leisure resort on the Victoria Island waterfront.",
    address: "Water Corporation Road, Oniru, Victoria Island",
    lat: 6.4272,
    lng: 3.4553,
  },
  {
    id: 26,
    name: "Elegushi Beach",
    category: "Recreation",
    description:
      "A busy private beach in Lekki known for weekend nightlife and live music.",
    address: "Lekki Phase 1, Lagos",
    lat: 6.438,
    lng: 3.503,
  },
];
