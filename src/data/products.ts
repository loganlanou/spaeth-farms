import { Product } from '@/types';

export const products: Product[] = [
  // Steaks
  {
    id: '1',
    slug: 'ribeye-steak',
    name: 'Ribeye Steak',
    description: 'Premium marbled ribeye, dry-aged for exceptional flavor and tenderness.',
    longDescription: 'Our ribeye steaks are cut from the rib section of our grass-fed, grain-finished cattle. Each steak is hand-selected for optimal marbling and dry-aged to develop deep, complex flavors. The perfect choice for grilling or pan-searing.',
    price: 34.99,
    weight: '12 oz',
    category: 'steaks',
    image: '/images/ribeye.jpg',
    inStock: true,
    featured: true,
    details: [
      'Hand-cut from premium rib section',
      'Dry-aged 21 days minimum',
      'USDA inspected',
      'Individually vacuum sealed',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '2',
    slug: 'ny-strip-steak',
    name: 'New York Strip Steak',
    description: 'Classic NY Strip with bold beef flavor and firm texture.',
    longDescription: 'The New York Strip is a steakhouse favorite for good reason. Cut from the short loin, it offers a perfect balance of tenderness and robust beef flavor. Our strips feature a satisfying chew with excellent marbling throughout.',
    price: 29.99,
    weight: '12 oz',
    category: 'steaks',
    image: '/images/nystrip.jpg',
    inStock: true,
    featured: true,
    details: [
      'Cut from the short loin',
      'Excellent marbling',
      'USDA inspected',
      'Individually vacuum sealed',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '3',
    slug: 'filet-mignon',
    name: 'Filet Mignon',
    description: 'The most tender cut, buttery smooth with delicate flavor.',
    longDescription: 'Our Filet Mignon is cut from the tenderloin, the most tender muscle on the animal. This lean, elegant cut practically melts in your mouth. Perfect for special occasions or when you want the ultimate in tenderness.',
    price: 39.99,
    weight: '8 oz',
    category: 'steaks',
    image: '/images/filet.jpg',
    inStock: true,
    featured: true,
    details: [
      'Cut from center of tenderloin',
      'Exceptionally tender',
      'USDA inspected',
      'Individually vacuum sealed',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '4',
    slug: 'sirloin-steak',
    name: 'Top Sirloin Steak',
    description: 'Lean and flavorful, excellent value for everyday grilling.',
    longDescription: 'Our Top Sirloin offers excellent beef flavor at an accessible price point. Leaner than ribeye but still tender and juicy when cooked properly. A versatile steak that works great on the grill, in stir-fries, or sliced for fajitas.',
    price: 18.99,
    weight: '10 oz',
    category: 'steaks',
    image: '/images/sirloin.jpg',
    inStock: true,
    featured: false,
    details: [
      'Lean and flavorful',
      'Great for everyday meals',
      'USDA inspected',
      'Individually vacuum sealed',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '5',
    slug: 't-bone-steak',
    name: 'T-Bone Steak',
    description: 'Two steaks in one - NY Strip and tenderloin divided by the bone.',
    longDescription: 'The T-Bone gives you the best of both worlds: a New York Strip on one side and a portion of tenderloin on the other, separated by the characteristic T-shaped bone. A true steakhouse classic that delivers variety in every bite.',
    price: 36.99,
    weight: '16 oz',
    category: 'steaks',
    image: '/images/tbone.jpg',
    inStock: true,
    featured: false,
    details: [
      'Strip and tenderloin combined',
      'Bone-in for extra flavor',
      'USDA inspected',
      'Individually vacuum sealed',
      'Flash frozen for freshness'
    ]
  },

  // Roasts
  {
    id: '6',
    slug: 'chuck-roast',
    name: 'Chuck Roast',
    description: 'Perfect for slow cooking, becomes incredibly tender and flavorful.',
    longDescription: 'Our Chuck Roast is the ultimate comfort food cut. When braised low and slow, the marbling melts into the meat, creating fork-tender beef with rich, beefy flavor. Perfect for pot roast, beef stew, or shredded beef tacos.',
    price: 12.99,
    weight: 'per lb',
    category: 'roasts',
    image: '/images/chuck-roast.jpg',
    inStock: true,
    featured: false,
    details: [
      'Ideal for braising and slow cooking',
      'Rich marbling throughout',
      'USDA inspected',
      'Vacuum sealed',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '7',
    slug: 'prime-rib-roast',
    name: 'Prime Rib Roast',
    description: 'The king of roasts, perfect for holiday gatherings and special occasions.',
    longDescription: 'Our bone-in Prime Rib Roast is the centerpiece your special occasion deserves. Cut from the same premium rib section as our ribeye steaks, this impressive roast features exceptional marbling and develops a beautiful crust when roasted.',
    price: 24.99,
    weight: 'per lb',
    category: 'roasts',
    image: '/images/prime-rib.jpg',
    inStock: true,
    featured: true,
    details: [
      'Bone-in for superior flavor',
      'Premium rib section',
      'Perfect for special occasions',
      'USDA inspected',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '8',
    slug: 'brisket',
    name: 'Whole Brisket',
    description: 'The BBQ king - smoke it low and slow for incredible results.',
    longDescription: 'Our whole packer brisket includes both the flat and point, giving you everything you need for authentic Texas-style BBQ. With proper smoking technique, this cut transforms into tender, smoky perfection with a beautiful bark.',
    price: 10.99,
    weight: 'per lb',
    category: 'roasts',
    image: '/images/brisket.jpg',
    inStock: true,
    featured: false,
    details: [
      'Whole packer cut (flat and point)',
      'Perfect for smoking',
      'Average weight 12-14 lbs',
      'USDA inspected',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '9',
    slug: 'rump-roast',
    name: 'Rump Roast',
    description: 'Lean and economical, great for pot roast and slicing.',
    longDescription: 'Our Rump Roast is a lean, economical choice for everyday cooking. It responds beautifully to braising, becoming tender and flavorful. Excellent for pot roast or sliced thin for sandwiches.',
    price: 9.99,
    weight: 'per lb',
    category: 'roasts',
    image: '/images/rump-roast.jpg',
    inStock: true,
    featured: false,
    details: [
      'Lean and economical',
      'Great for braising',
      'USDA inspected',
      'Vacuum sealed',
      'Flash frozen for freshness'
    ]
  },

  // Ground Beef
  {
    id: '10',
    slug: 'ground-beef-80-20',
    name: 'Ground Beef 80/20',
    description: 'Our most popular grind, perfect balance of flavor and juiciness.',
    longDescription: 'Our 80/20 ground beef is the perfect all-purpose grind. With 20% fat content, it delivers maximum flavor and stays juicy whether you\'re making burgers, meatballs, or taco meat. Ground fresh from whole muscle cuts.',
    price: 8.99,
    weight: 'per lb',
    category: 'ground',
    image: '/images/ground-beef.jpg',
    inStock: true,
    featured: false,
    details: [
      '80% lean, 20% fat',
      'Ground from whole muscle',
      'Perfect for burgers',
      'USDA inspected',
      'Sold in 1 lb packages'
    ]
  },
  {
    id: '11',
    slug: 'ground-beef-90-10',
    name: 'Ground Beef 90/10',
    description: 'Leaner option for health-conscious cooking without sacrificing flavor.',
    longDescription: 'Our 90/10 ground beef offers a leaner option for those watching their fat intake. Still plenty flavorful for everyday cooking, it\'s ideal for dishes where you\'ll drain the fat, like tacos or meat sauces.',
    price: 9.99,
    weight: 'per lb',
    category: 'ground',
    image: '/images/ground-lean.jpg',
    inStock: true,
    featured: false,
    details: [
      '90% lean, 10% fat',
      'Heart-healthy option',
      'Great for sauces and tacos',
      'USDA inspected',
      'Sold in 1 lb packages'
    ]
  },
  {
    id: '12',
    slug: 'ground-beef-bulk',
    name: 'Ground Beef Bulk Pack (10 lbs)',
    description: 'Stock your freezer and save with our bulk ground beef package.',
    longDescription: 'Our bulk ground beef pack gives you 10 pounds of our premium 80/20 grind at a discounted price. Perfect for families or anyone who wants to stock their freezer with quality beef. Packaged in convenient 1 lb portions.',
    price: 79.99,
    weight: '10 lbs',
    category: 'ground',
    image: '/images/ground-bulk.jpg',
    inStock: true,
    featured: true,
    details: [
      '10 individual 1 lb packages',
      '80% lean, 20% fat',
      'Save $10 vs individual',
      'USDA inspected',
      'Flash frozen for freshness'
    ]
  },

  // Bundles
  {
    id: '13',
    slug: 'grill-masters-bundle',
    name: 'Grill Master\'s Bundle',
    description: 'Everything you need for the perfect backyard cookout.',
    longDescription: 'Our Grill Master\'s Bundle gives you a premium selection of our best grilling cuts. Includes 4 ribeye steaks, 4 NY strips, 4 sirloin steaks, and 5 lbs of ground beef for burgers. Perfect for summer entertaining or stocking up for the season.',
    price: 299.99,
    weight: 'Approx. 15 lbs',
    category: 'bundles',
    image: '/images/grill-bundle.jpg',
    inStock: true,
    featured: true,
    details: [
      '4 Ribeye Steaks (12 oz each)',
      '4 NY Strip Steaks (12 oz each)',
      '4 Top Sirloin Steaks (10 oz each)',
      '5 lbs Ground Beef 80/20',
      'Save over $50 vs individual prices'
    ]
  },
  {
    id: '14',
    slug: 'family-essentials-bundle',
    name: 'Family Essentials Bundle',
    description: 'Everyday cuts to feed your family for weeks.',
    longDescription: 'Our Family Essentials Bundle provides a variety of versatile cuts perfect for everyday family meals. Includes roasts for Sunday dinner, steaks for the grill, and ground beef for quick weeknight meals. Exceptional value for quality beef.',
    price: 199.99,
    weight: 'Approx. 20 lbs',
    category: 'bundles',
    image: '/images/family-bundle.jpg',
    inStock: true,
    featured: false,
    details: [
      '2 Chuck Roasts (3 lbs each)',
      '4 Sirloin Steaks (10 oz each)',
      '8 lbs Ground Beef 80/20',
      '2 lbs Stew Meat',
      'Save over $40 vs individual prices'
    ]
  },
  {
    id: '15',
    slug: 'quarter-beef',
    name: 'Quarter Beef Share',
    description: 'The ultimate value - a quarter of a whole beef, custom processed.',
    longDescription: 'Our Quarter Beef Share gives you approximately 100+ lbs of premium beef including steaks, roasts, ground beef, and more. Each share is custom cut to your specifications. The best value for serious beef lovers who want to fill their freezer.',
    price: 899.99,
    weight: 'Approx. 100+ lbs',
    category: 'bundles',
    image: '/images/quarter-beef.jpg',
    inStock: true,
    featured: false,
    details: [
      'Approximately 100+ lbs of beef',
      'Custom cut to your preferences',
      'Includes steaks, roasts, ground, and more',
      'Best per-pound value',
      'Requires 5+ cubic feet freezer space'
    ]
  },

  // Specialty
  {
    id: '16',
    slug: 'beef-short-ribs',
    name: 'Beef Short Ribs',
    description: 'Rich, meaty, and perfect for braising or smoking.',
    longDescription: 'Our beef short ribs are loaded with rich, beefy flavor. Whether you braise them Korean-style, smoke them Texas-style, or slow-cook them in red wine, these meaty ribs deliver incredible depth of flavor.',
    price: 14.99,
    weight: 'per lb',
    category: 'specialty',
    image: '/images/short-ribs.jpg',
    inStock: true,
    featured: false,
    details: [
      'Meaty bone-in ribs',
      'Perfect for braising or smoking',
      'Rich beefy flavor',
      'USDA inspected',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '17',
    slug: 'beef-stew-meat',
    name: 'Beef Stew Meat',
    description: 'Pre-cut cubes ready for your favorite stew or curry recipe.',
    longDescription: 'Our beef stew meat is cut from quality chuck and round, pre-cubed for your convenience. These 1-inch cubes are perfect for stews, curries, kebabs, or any recipe calling for bite-sized beef.',
    price: 11.99,
    weight: 'per lb',
    category: 'specialty',
    image: '/images/stew-meat.jpg',
    inStock: true,
    featured: false,
    details: [
      'Pre-cut 1-inch cubes',
      'Cut from chuck and round',
      'Ready for stews and curries',
      'USDA inspected',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '18',
    slug: 'beef-liver',
    name: 'Beef Liver',
    description: 'Nutrient-dense organ meat, a traditional superfood.',
    longDescription: 'Beef liver is nature\'s multivitamin, packed with iron, B vitamins, and protein. Our liver is sourced from healthy, well-raised cattle. Perfect for classic liver and onions or added to ground beef for extra nutrition.',
    price: 5.99,
    weight: 'per lb',
    category: 'specialty',
    image: '/images/liver.jpg',
    inStock: true,
    featured: false,
    details: [
      'Nutrient-dense superfood',
      'High in iron and B vitamins',
      'From healthy cattle',
      'USDA inspected',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '19',
    slug: 'beef-bones',
    name: 'Beef Marrow Bones',
    description: 'Make rich, collagen-filled bone broth at home.',
    longDescription: 'Our beef marrow bones are perfect for making nutrient-rich bone broth at home. Loaded with collagen, minerals, and flavor, these bones simmer down into liquid gold. Also great for roasting and spreading the marrow on toast.',
    price: 4.99,
    weight: 'per lb',
    category: 'specialty',
    image: '/images/bones.jpg',
    inStock: true,
    featured: false,
    details: [
      'Perfect for bone broth',
      'Rich in collagen',
      'Great roasted for marrow',
      'USDA inspected',
      'Flash frozen for freshness'
    ]
  },
  {
    id: '20',
    slug: 'flank-steak',
    name: 'Flank Steak',
    description: 'Lean and flavorful, ideal for fajitas and stir-fry.',
    longDescription: 'Flank steak is a lean, flavorful cut from the abdominal muscles. When sliced thin against the grain, it\'s incredibly tender. Perfect for fajitas, stir-fries, London broil, or marinated and grilled.',
    price: 16.99,
    weight: 'per lb',
    category: 'specialty',
    image: '/images/flank.jpg',
    inStock: true,
    featured: false,
    details: [
      'Lean and flavorful',
      'Perfect for fajitas',
      'Slice against the grain',
      'USDA inspected',
      'Flash frozen for freshness'
    ]
  }
];

export const categories = [
  { id: 'steaks', name: 'Premium Steaks', description: 'Hand-cut, dry-aged steaks' },
  { id: 'roasts', name: 'Roasts', description: 'Perfect for slow cooking' },
  { id: 'ground', name: 'Ground Beef', description: 'Fresh ground from whole muscle' },
  { id: 'bundles', name: 'Bundles & Shares', description: 'Stock your freezer and save' },
  { id: 'specialty', name: 'Specialty Cuts', description: 'Unique cuts for adventurous cooks' }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}
