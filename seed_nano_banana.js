const fs = require('fs');
const path = require('path');

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

const names = {
  bridal: [
    "Royal Heritage Nakshi Bridal Choker Set",
    "Gilded Temple Kundan Haram Set",
    "Maharani Antique Gold Bridal Set",
    "Imperial Gold Filigree Bridal Haar",
    "Exquisite Lakshmi Kasulaperu Set",
    "Divine Temple South-Indian Bridal Haar"
  ],
  diamond: [
    "Sparkling Solitaire Diamond Choker",
    "Ethereal Emerald & Diamond Neckpiece",
    "Brilliant-Cut Floral Diamond Necklace",
    "Luxury Cascade Diamond Gold Choker",
    "Classic Teardrop Diamond Haram Set",
    "Luminous Gold Embedded Diamond Set"
  ],
  necklaces: [
    "Classic 22K Gold Filigree Choker",
    "Royal South-Indian Temple Haram",
    "Vibrant Ruby Embedded Gold Necklace",
    "Ornate Coin Necklace with Pearls",
    "Delicate Textured Gold Collar Choker",
    "Vintage Gold Leaf Statement Necklace"
  ],
  bangles: [
    "Peacock Antique Kada Pair",
    "Filigree Gold Bangle with Ruby Accents",
    "Solid Gold Temple Design Kada Pair",
    "Ornate Royal South-Indian Kada Set",
    "Dazzling Diamond Studded Gold Bangle",
    "Classic 22K Polished Gold Bangle Set"
  ],
  earrings: [
    "Royal Ruby & Pearl South-Indian Jhumkas",
    "Elegant Chandelier Pearl Drop Earrings",
    "Ornate Peacock Carved Gold Studs",
    "Modern Diamond Studded Gold Drop Earrings",
    "Classic 22K Gold Filigree Hoop Earrings",
    "Luxury Temple Style Gold Chandbalis"
  ],
  rings: [
    "Royal Floral Filigree Gold Ring",
    "Modern Brilliant Diamond Cluster Ring",
    "Antique South-Indian Temple Gold Ring",
    "Ornate Ruby Statement Gold Ring",
    "Classic 22K Twisted Gold Band Ring",
    "Luxurious Emerald Cabochon Ring"
  ],
  chains: [
    "Classic Heavy 22K Gold Rope Chain",
    "Highly Polished Box Chain Set",
    "Italian Design Gold Curb Link Chain",
    "Sleek Singapore Twist Gold Chain",
    "Ornate Franco Link Gold Chain Set",
    "Vintage Hexagonal Wheat Gold Chain"
  ],
  mangalsutra: [
    "Modern Circular Black Bead Mangalsutra",
    "Traditional Sacred Vat Mani Mangalsutra",
    "Teardrop Diamond Accent Mangalsutra",
    "Royal Antique Coin Pendant Mangalsutra",
    "Dainty Leaf Pattern Gold Mangalsutra",
    "Sleek Contemporary Double Chain Mangalsutra"
  ],
  anklets: [
    "Royal Anklets with Delicate Gold Bells",
    "Filigree Embossed 22K Gold Anklets",
    "Delicate Gold Bead Ghungroo Payal",
    "Traditional South-Indian Heavy Anklets",
    "Elegant Pearl Bordered Gold Anklets",
    "Modern Slim Gold Payal Pair"
  ],
  pendants: [
    "Lakshmi Prosperity Gold Coin Pendant",
    "Divine Ganesha Nakshi Carving Pendant",
    "Brilliant Floral Diamond Gold Pendant",
    "Ornate Peacock Patterned Temple Pendant",
    "Classic 22K Sacred Om Gold Pendant",
    "Timeless Filigree Teardrop Gold Pendant"
  ]
};

const basePrices = {
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

const categoriesKeys = Object.keys(names);
const newProducts = [];

categoriesKeys.forEach((category) => {
  const catNames = names[category];
  const catImages = categoryImages[category];
  const priceRange = basePrices[category];

  for (let i = 0; i < 6; i++) {
    // Generate a beautiful, distinct price within the category range
    const step = (priceRange[1] - priceRange[0]) / 5;
    const price = Math.round(priceRange[0] + step * i + Math.random() * 2000);
    const weight = (price / 6842).toFixed(2); // 22K weight calculation

    const hallmark = category === "diamond" ? "HUID & IGI Certified" : "HUID Certified";
    const purity = category === "diamond" ? "18K Gold & VS Diamond" : "22K Gold (91.6%)";

    const desc = `Bespoke handcrafted 22K gold piece from MGS Jewellery Davanagere. Inspiring premium aesthetics, meticulous attention to detail, BIS and HUID hallmarked for pristine quality.`;

    newProducts.push({
      name: catNames[i],
      price: price,
      description: desc,
      images: [catImages[i]],
      hallmark: hallmark,
      purity: purity,
      weight: `${weight}g`,
      category: category,
      tag: i === 0 ? "new" : (i === 1 ? "trending" : ""),
      _id: `prod_banana_${category}_${i}`
    });
  }
});

// Load existing database
const dbPath = path.join(__dirname, 'server', 'data.json');
let db = { products: [], collections: [], settings: [], offers: [] };

try {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (e) {
  console.log("Could not read server/data.json, creating a new file template");
}

// Set our new 60 nano-banana gold products as the product list!
db.products = newProducts;

// Write back to server/data.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log(`Successfully seeded ${newProducts.length} premium nano-banana gold jewellery products to server/data.json!`);
console.log("Each of the 10 sessions has exactly 6 unique gold-themed items.");
