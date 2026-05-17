const fs = require('fs');
const path = require('path');

// ==========================================
// Part 1: Logic to recreate original products (from seed_products.js)
// ==========================================

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const jpegImages = [
  'assets/images/1.jpeg', 'assets/images/2.jpeg', 'assets/images/3.jpeg',
  'assets/images/4.jpeg', 'assets/images/5.jpeg', 'assets/images/6.jpeg',
  'assets/images/7.jpeg', 'assets/images/8.jpeg', 'assets/images/9.jpeg',
  'assets/images/10.jpeg', 'assets/images/11.jpeg', 'assets/images/12.jpeg',
  'assets/images/13.jpeg', 'assets/images/14.jpeg', 'assets/images/15.jpeg',
  'assets/images/16.jpeg', 'assets/images/17.jpeg', 'assets/images/18.jpeg',
  'assets/images/19.jpeg', 'assets/images/20.jpeg', 'assets/images/21.jpeg',
  'assets/images/22.jpeg', 'assets/images/23.jpeg', 'assets/images/24.jpeg',
  'assets/images/25.jpeg'
];

const categoryAssets = {
  bridal: ['assets/kasumalai.png', 'assets/hero_necklace.png'],
  necklaces: ['assets/kasumalai.png', 'assets/mangalsutra.png', 'assets/hero_necklace.png'],
  bangles: ['assets/temple_bangles.png', 'assets/antique_bangles.png'],
  earrings: ['assets/diamond_earrings.png', 'assets/studs.png'],
  rings: ['assets/ring.png', 'assets/diamond_earrings.png'],
  chains: ['assets/gold_chain.png', 'assets/hero_necklace.png'],
  mangalsutra: ['assets/mangalsutra.png', 'assets/kasumalai.png'],
  anklets: ['assets/antique_bangles.png', 'assets/temple_bangles.png'],
  pendants: ['assets/kasumalai.png', 'assets/ring.png', 'assets/diamond_earrings.png']
};

function getImagesForCategory(catKey) {
  const assets = categoryAssets[catKey] || [];
  return [...assets, ...jpegImages];
}

const bridalNames = [
  'Royal Bridal Necklace Set', 'Temple Kasumalai', 'Antique Bridal Choker',
  'Gold Temple Necklace', 'Bridal Haar', 'South Indian Bridal Set',
  'Magnificent Bridal Set', 'Traditional Bridal Haar', 'Wedding Gold Set',
  'Antique Nakshi Set', 'Bridal Jwell', 'Classic Bridal Collection',
  'Ornate Bridal Set', 'Royal Bridal Jhumka Set', 'Maharani Bridal Set'
];

const necklaceNames = [
  'Lakshmi Pendant Necklace', 'Gold Chain with Pendant', 'Antique Ruby Necklace',
  'Modern Leaf Gold Necklace', 'Filigree Gold Necklace', 'Gold Rani Haar',
  'Pearl & Gold Necklace', 'Gemstone Pendant Set', 'Gold Mangalsutra',
  'Traditional Long Necklace', 'Kundan Necklace', 'Gold Choker',
  'Bejeweled Necklace', 'Designer Gold Necklace', 'Elegant Gold Set'
];

const bangleNames = [
  'Heritage Antique Bangles', 'Temple Design Bangles', 'Plain Kadas',
  'Peacock Enamel Bangles', 'Twisted Rope Bangle', 'Wedding Chooda',
  'Antique Temple Bangle', 'Gold Kada Set', 'Filigree Bangles',
  'Kundan Bangle Set', 'Royal Bangle Pair', 'Traditional Bangle Set',
  'Bracelet Gold Set', 'Antique Nagali', 'Designer Gold Bangles'
];

const earringNames = [
  'Diamond Drop Earrings', 'Gold Stud Earrings', 'Antique Jhumka Earrings',
  'Temple Chandbali', 'Pearl Drop Earrings', 'Gold Hoop Earrings',
  'Kundan Earrings', 'Ruby Jhumkas', 'Gold Dangle Earrings',
  'Traditional Jhumka Set', 'Antique Filigree Earrings', 'Bridal Ear Cuffs',
  'Gold Statement Earrings', 'Pearl Jhumka Set', 'Designer Gold Earrings'
];

const ringNames = [
  'Floral Emerald Ring', 'Diamond Solitaire Ring', 'Temple Toe Rings',
  'Ruby Cocktail Ring', 'Gold Band Ring', 'Kundan Ring',
  'Antique Signet Ring', 'Gemstone Gold Ring', 'Bridal Ring Set',
  'Wedding Gold Ring', 'Designer Finger Ring', 'Traditional Gold Ring',
  'Paisley Pattern Ring', 'Filigree Gold Ring', 'Statement Gold Ring'
];

const chainNames = [
  'Solid Gold Rope Chain', 'Franco Box Chain', 'Herringbone Flat Chain',
  'Singapore Twist Chain', 'Gold Curb Chain', 'Spiga Chain',
  'Rope Gold Chain', 'Miami Cuban Link', 'Gold Wheat Chain',
  'Venetian Chain', 'Singapore Chain', 'Box Chain Gold',
  'Snake Chain Gold', 'Mariner Chain', 'Figaro Chain'
];

const mangalsutraNames = [
  'Traditional Mangalsutra', 'Diamond Mangalsutra', 'Antique Gold Mangalsutra',
  'Black Bead Mangalsutra', 'Temple Pendant Mangalsutra', 'Modern Diamond Set',
  'Royal Mangalsutra', 'Bridal Mangalsutra Set', 'Antique Bead Mangalsutra',
  'Gold Temple Mangalsutra', 'Contemporary Mangalsutra', 'Traditional Bead Set',
  'Diamond Accent Mangalsutra', 'Ornate Gold Mangalsutra', 'Classic South Indian'
];

const ankletNames = [
  'Ghungroo Anklet', 'Flat Link Anklet', 'Gold Payal Set',
  'Bell Anklets', 'Traditional Payal', 'Antique Anklet',
  'Designer Gold Anklet', 'Pearl Anklet Set', 'Filigree Anklet',
  'Beaded Gold Anklet', 'Traditional Ghungroo', 'Wedding Payal',
  'Gold Paayal Set', 'Antique Paayal', 'Designer Payal'
];

const pendantNames = [
  'Ganesh Gold Pendant', 'Om Diamond Pendant', 'Lakshmi Coin Pendant',
  'Lord Murugan Pendant', 'Hanuman Pendant', 'Omkara Pendant',
  'Lakshmi Narayana Pendant', 'Trishul Pendant', 'Ganesha Gold Pendant',
  'Sacred Om Pendant', 'Temple Pendant', 'Gemstone Pendant',
  'Kundan Pendant', 'Diamond Pendant', 'Antique Coin Pendant'
];

const originalCategories = [
  { key: 'bridal', names: bridalNames },
  { key: 'necklaces', names: necklaceNames },
  { key: 'bangles', names: bangleNames },
  { key: 'earrings', names: earringNames },
  { key: 'rings', names: ringNames },
  { key: 'chains', names: chainNames },
  { key: 'mangalsutra', names: mangalsutraNames },
  { key: 'anklets', names: ankletNames },
  { key: 'pendants', names: pendantNames }
];

const originalProducts = [];

originalCategories.forEach((cat, catIdx) => {
  const catImages = getImagesForCategory(cat.key);
  const shuffledImages = shuffle(catImages);

  cat.names.forEach((name, nameIdx) => {
    let img;
    if (nameIdx < shuffledImages.length) {
      img = shuffledImages[nameIdx];
    } else {
      const reshuffled = shuffle(catImages);
      img = reshuffled[nameIdx % reshuffled.length];
    }

    let basePrice;
    switch(cat.key) {
      case 'bridal': basePrice = 85000 + Math.random() * 120000; break;
      case 'necklaces': basePrice = 45000 + Math.random() * 85000; break;
      case 'bangles': basePrice = 25000 + Math.random() * 55000; break;
      case 'earrings': basePrice = 15000 + Math.random() * 45000; break;
      case 'rings': basePrice = 12000 + Math.random() * 38000; break;
      case 'chains': basePrice = 35000 + Math.random() * 65000; break;
      case 'mangalsutra': basePrice = 55000 + Math.random() * 95000; break;
      case 'anklets': basePrice = 8000 + Math.random() * 22000; break;
      case 'pendants': basePrice = 5000 + Math.random() * 18000; break;
      default: basePrice = 20000 + Math.random() * 40000;
    }

    const weight = (basePrice / 6842).toFixed(2);

    originalProducts.push({
      name: name,
      price: Math.round(basePrice),
      description: `Exquisite 22K ${cat.key} from MGS Jewellery Davanagere. Handcrafted with traditional craftsmanship and BIS/HUID certified for purity.`,
      images: [img],
      hallmark: 'HUID',
      purity: '22K Gold (91.6%)',
      weight: `${weight}g`,
      category: cat.key,
      tag: catIdx === 0 ? 'bridal' : (nameIdx % 4 === 0 ? 'new' : ''),
      _id: `prod_original_${cat.key}_${nameIdx}`
    });
  });
});

console.log(`Generated ${originalProducts.length} original products.`);

// ==========================================
// Part 2: Generate nano-banana luxury products list
// ==========================================

const categoryImages = {
  bridal: [
    'assets/nano_banana/bridal_sets_1.png',
    'assets/nano_banana/bridal_sets_2.png',
    'assets/nano_banana/bridal_sets_1.png',
    'assets/nano_banana/bridal_sets_2.png',
    'assets/nano_banana/bridal_sets_1.png',
    'assets/nano_banana/bridal_sets_2.png'
  ],
  diamond: [
    'assets/nano_banana/diamond_1.png',
    'assets/nano_banana/diamond_2.png',
    'assets/nano_banana/diamond_1.png',
    'assets/nano_banana/diamond_2.png',
    'assets/nano_banana/diamond_1.png',
    'assets/nano_banana/diamond_2.png'
  ],
  necklaces: [
    'assets/nano_banana/necklaces_1.png',
    'assets/nano_banana/necklaces_2.png',
    'assets/nano_banana/necklaces_1.png',
    'assets/nano_banana/necklaces_2.png',
    'assets/nano_banana/necklaces_1.png',
    'assets/nano_banana/necklaces_2.png'
  ],
  bangles: [
    'assets/nano_banana/bangles_1.png',
    'assets/nano_banana/bangles_2.png',
    'assets/nano_banana/bangles_1.png',
    'assets/nano_banana/bangles_2.png',
    'assets/nano_banana/bangles_1.png',
    'assets/nano_banana/bangles_2.png'
  ],
  earrings: [
    'assets/nano_banana/earrings_1.png',
    'assets/nano_banana/earrings_2.png',
    'assets/nano_banana/earrings_1.png',
    'assets/nano_banana/earrings_2.png',
    'assets/nano_banana/earrings_1.png',
    'assets/nano_banana/earrings_2.png'
  ],
  rings: [
    'assets/nano_banana/rings_1.png',
    'assets/nano_banana/rings_2.png',
    'assets/nano_banana/rings_1.png',
    'assets/nano_banana/rings_2.png',
    'assets/nano_banana/rings_1.png',
    'assets/nano_banana/rings_2.png'
  ],
  chains: [
    'assets/nano_banana/chains_1.png',
    'assets/nano_banana/chains_2.png',
    'assets/nano_banana/chains_1.png',
    'assets/nano_banana/chains_2.png',
    'assets/nano_banana/chains_1.png',
    'assets/nano_banana/chains_2.png'
  ],
  mangalsutra: [
    'assets/nano_banana/mangalsutra_1.png',
    'assets/nano_banana/necklaces_1.png',
    'assets/nano_banana/mangalsutra_1.png',
    'assets/nano_banana/chains_2.png',
    'assets/nano_banana/mangalsutra_1.png',
    'assets/nano_banana/necklaces_2.png'
  ],
  anklets: [
    'assets/nano_banana/anklets_1.png',
    'assets/nano_banana/bangles_1.png',
    'assets/nano_banana/anklets_1.png',
    'assets/nano_banana/bangles_2.png',
    'assets/nano_banana/anklets_1.png',
    'assets/nano_banana/bangles_1.png'
  ],
  pendants: [
    'assets/nano_banana/pendants_1.png',
    'assets/nano_banana/rings_1.png',
    'assets/nano_banana/pendants_1.png',
    'assets/nano_banana/rings_2.png',
    'assets/nano_banana/pendants_1.png',
    'assets/nano_banana/rings_1.png'
  ]
};

const nanoNames = {
  bridal: [
    "Royal Heritage Nakshi Bridal Choker Set [Gilded Edition]",
    "Gilded Temple Kundan Haram Set [Gilded Edition]",
    "Maharani Antique Gold Bridal Set [Gilded Edition]",
    "Imperial Gold Filigree Bridal Haar [Gilded Edition]",
    "Exquisite Lakshmi Kasulaperu Set [Gilded Edition]",
    "Divine Temple South-Indian Bridal Haar [Gilded Edition]"
  ],
  diamond: [
    "Sparkling Solitaire Diamond Choker [Gilded Edition]",
    "Ethereal Emerald & Diamond Neckpiece [Gilded Edition]",
    "Brilliant-Cut Floral Diamond Necklace [Gilded Edition]",
    "Luxury Cascade Diamond Gold Choker [Gilded Edition]",
    "Classic Teardrop Diamond Haram Set [Gilded Edition]",
    "Luminous Gold Embedded Diamond Set [Gilded Edition]"
  ],
  necklaces: [
    "Classic 22K Gold Filigree Choker [Gilded Edition]",
    "Royal South-Indian Temple Haram [Gilded Edition]",
    "Vibrant Ruby Embedded Gold Necklace [Gilded Edition]",
    "Ornate Coin Necklace with Pearls [Gilded Edition]",
    "Delicate Textured Gold Collar Choker [Gilded Edition]",
    "Vintage Gold Leaf Statement Necklace [Gilded Edition]"
  ],
  bangles: [
    "Peacock Antique Kada Pair [Gilded Edition]",
    "Filigree Gold Bangle with Ruby Accents [Gilded Edition]",
    "Solid Gold Temple Design Kada Pair [Gilded Edition]",
    "Ornate Royal South-Indian Kada Set [Gilded Edition]",
    "Dazzling Diamond Studded Gold Bangle [Gilded Edition]",
    "Classic 22K Polished Gold Bangle Set [Gilded Edition]"
  ],
  earrings: [
    "Royal Ruby & Pearl South-Indian Jhumkas [Gilded Edition]",
    "Elegant Chandelier Pearl Drop Earrings [Gilded Edition]",
    "Ornate Peacock Carved Gold Studs [Gilded Edition]",
    "Modern Diamond Studded Gold Drop Earrings [Gilded Edition]",
    "Classic 22K Gold Filigree Hoop Earrings [Gilded Edition]",
    "Luxury Temple Style Gold Chandbalis [Gilded Edition]"
  ],
  rings: [
    "Royal Floral Filigree Gold Ring [Gilded Edition]",
    "Modern Brilliant Diamond Cluster Ring [Gilded Edition]",
    "Antique South-Indian Temple Gold Ring [Gilded Edition]",
    "Ornate Ruby Statement Gold Ring [Gilded Edition]",
    "Classic 22K Twisted Gold Band Ring [Gilded Edition]",
    "Luxurious Emerald Cabochon Ring [Gilded Edition]"
  ],
  chains: [
    "Classic Heavy 22K Gold Rope Chain [Gilded Edition]",
    "Highly Polished Box Chain Set [Gilded Edition]",
    "Italian Design Gold Curb Link Chain [Gilded Edition]",
    "Sleek Singapore Twist Gold Chain [Gilded Edition]",
    "Ornate Franco Link Gold Chain Set [Gilded Edition]",
    "Vintage Hexagonal Wheat Gold Chain [Gilded Edition]"
  ],
  mangalsutra: [
    "Modern Circular Black Bead Mangalsutra [Gilded Edition]",
    "Traditional Sacred Vat Mani Mangalsutra [Gilded Edition]",
    "Teardrop Diamond Accent Mangalsutra [Gilded Edition]",
    "Royal Antique Coin Pendant Mangalsutra [Gilded Edition]",
    "Dainty Leaf Pattern Gold Mangalsutra [Gilded Edition]",
    "Sleek Contemporary Double Chain Mangalsutra [Gilded Edition]"
  ],
  anklets: [
    "Royal Anklets with Delicate Gold Bells [Gilded Edition]",
    "Filigree Embossed 22K Gold Anklets [Gilded Edition]",
    "Delicate Gold Bead Ghungroo Payal [Gilded Edition]",
    "Traditional South-Indian Heavy Anklets [Gilded Edition]",
    "Elegant Pearl Bordered Gold Anklets [Gilded Edition]",
    "Modern Slim Gold Payal Pair [Gilded Edition]"
  ],
  pendants: [
    "Lakshmi Prosperity Gold Coin Pendant [Gilded Edition]",
    "Divine Ganesha Nakshi Carving Pendant [Gilded Edition]",
    "Brilliant Floral Diamond Gold Pendant [Gilded Edition]",
    "Ornate Peacock Patterned Temple Pendant [Gilded Edition]",
    "Classic 22K Sacred Om Gold Pendant [Gilded Edition]",
    "Timeless Filigree Teardrop Gold Pendant [Gilded Edition]"
  ]
};

const nanoBasePrices = {
  bridal: [145000, 265000],
  diamond: [110000, 280000],
  necklaces: [45000, 115000],
  bangles: [28000, 72000],
  earrings: [14000, 38000],
  rings: [9000, 28000],
  chains: [24000, 65000],
  mangalsutra: [22000, 78000],
  anklets: [12000, 35000],
  pendants: [7000, 22000]
};

const nanoProducts = [];

Object.keys(nanoNames).forEach((category) => {
  const catNames = nanoNames[category];
  const catImages = categoryImages[category];
  const priceRange = nanoBasePrices[category];

  for (let i = 0; i < 6; i++) {
    const step = (priceRange[1] - priceRange[0]) / 5;
    const price = Math.round(priceRange[0] + step * i + Math.random() * 2000);
    const weight = (price / 6842).toFixed(2);

    const hallmark = category === "diamond" ? "HUID & IGI Certified" : "HUID Certified";
    const purity = category === "diamond" ? "18K Gold & VS Diamond" : "22K Gold (91.6%)";

    const desc = `Bespoke handcrafted gold piece from MGS Jewellery Davanagere. Inspiring premium gold background aesthetics, BIS and HUID hallmarked for pristine quality.`;

    nanoProducts.push({
      name: catNames[i],
      price: price,
      description: desc,
      images: [catImages[i]],
      hallmark: hallmark,
      purity: purity,
      weight: `${weight}g`,
      category: category,
      tag: "exclusive",
      _id: `prod_banana_exclusive_${category}_${i}`
    });
  }
});

console.log(`Generated ${nanoProducts.length} premium nano-banana products.`);

// ==========================================
// Part 3: Merge and Write to server/data.json
// ==========================================

const dbPath = path.join(__dirname, 'server', 'data.json');
let db = { products: [], collections: [], settings: [], offers: [] };

try {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (e) {
  console.log("Could not read server/data.json");
}

// Combine both arrays (nano banana images are placed at the beginning for ultimate highlight!)
db.products = [...nanoProducts, ...originalProducts];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log(`\nSuccessfully merged collections database!`);
console.log(`Total active products in data.json: ${db.products.length}`);
console.log(`  - Newly generated gold-background products: ${nanoProducts.length}`);
console.log(`  - Restored original portfolio products: ${originalProducts.length}`);
