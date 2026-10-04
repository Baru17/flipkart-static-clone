/* ==========================================================================
   Mock data layer — stands in for the MongoDB/Express API in the original
   MERN project. All product/category data lives here as plain JS.
   ========================================================================== */

// simple deterministic placeholder "product photo" as an inline SVG data URI
function placeholderImg(label, bg, fg) {
  bg = bg || "#f0f4f8";
  fg = fg || "#2874f0";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <rect width="100%" height="100%" fill="${bg}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="26" font-weight="600"
      fill="${fg}" text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
}

const CATEGORIES = [
  { name: "Mobiles", icon: "assets/images/phone.png" },
  { name: "Fashion", icon: "assets/images/fashion.png" },
  { name: "Electronics", icon: "assets/images/electronics.png" },
  { name: "Home", icon: "assets/images/home.png" },
  { name: "Travel", icon: "assets/images/travel.png" },
  { name: "Appliances", icon: "assets/images/appliances.png" },
  { name: "Furniture", icon: "assets/images/furniture.png" },
  { name: "Beauty,Toys & more", icon: "assets/images/beauty.png" },
  { name: "Grocery", icon: "assets/images/grocery.png" },
];

const BANNERS = [
  "assets/images/gadget-sale.jpg",
  "assets/images/kitchen-sale.jpg",
  "assets/images/poco.webp",
  "assets/images/fashionsale.jpg",
  "assets/images/realme.webp",
  "assets/images/oppo.webp",
];

// palette per category, used for placeholder thumbnails
const CAT_COLORS = {
  Mobiles: ["#eaf1ff", "#2874f0"],
  Fashion: ["#fff0f4", "#d6336c"],
  Electronics: ["#eefbf1", "#14be47"],
  Home: ["#fff8e6", "#ff9f00"],
  Travel: ["#f1f0ff", "#5b4fd6"],
  Appliances: ["#eafcfb", "#0aa89e"],
  Furniture: ["#fbf1e9", "#a9642a"],
  "Beauty,Toys & more": ["#fdeef7", "#c2298a"],
  Grocery: ["#eefbea", "#388e3c"],
};

function makeProduct(id, name, category, brand, price, cuttedPrice, ratings, numOfReviews, stock, highlights, description) {
  const [bg, fg] = CAT_COLORS[category] || ["#f0f4f8", "#2874f0"];
  const label = brand || name.split(" ")[0];
  return {
    _id: "p" + id,
    name,
    category,
    brand,
    price,
    cuttedPrice,
    ratings,
    numOfReviews,
    stock,
    highlights,
    description,
        images: [{ url: `assets/images/products/p${id}.jpg` }],
  };
}

const PRODUCTS = [
  // Mobiles
  makeProduct(1, "Redmi Note 13 Pro 5G (Midnight Black, 128 GB)", "Mobiles", "Redmi", 21999, 27999, 4.3, 18452, 34,
    ["8 GB RAM | 128 GB ROM", "16.94 cm (6.67 inch) Full HD+ Display", "200MP + 8MP + 2MP Triple Camera", "5000 mAh Battery", "1 Year Manufacturer Warranty"],
    "Experience next-level performance with the Redmi Note 13 Pro 5G, featuring a stunning AMOLED display, flagship-grade camera and all-day battery life."),
  makeProduct(2, "Samsung Galaxy S23 Ultra 5G (Green, 256 GB)", "Mobiles", "Samsung", 89999, 124999, 4.6, 9210, 12,
    ["12 GB RAM | 256 GB ROM", "17.3 cm (6.8 inch) QHD+ Dynamic AMOLED", "200MP Quad Camera with S Pen", "5000 mAh Battery with 45W Fast Charging"],
    "The Galaxy S23 Ultra redefines the smartphone camera experience with a 200MP sensor and the precision of the built-in S Pen."),
  makeProduct(3, "Apple iPhone 15 (Blue, 128 GB)", "Mobiles", "Apple", 65999, 79900, 4.6, 22103, 21,
    ["128 GB ROM", "15.4 cm (6.1 inch) Super Retina XDR Display", "48MP + 12MP Dual Camera", "A16 Bionic Chip", "USB Type-C"],
    "iPhone 15 brings Dynamic Island, a 48MP main camera and USB-C to a gorgeous color-infused glass design."),
  makeProduct(4, "OnePlus Nord CE 4 (Celadon Marble, 128 GB)", "Mobiles", "OnePlus", 24999, 27999, 4.2, 6421, 40,
    ["8 GB RAM | 128 GB ROM", "16.9 cm (6.7 inch) 120Hz AMOLED", "50MP OIS Rear Camera", "5500 mAh Battery, 100W SuperVOOC"],
    "Nord CE 4 combines a flagship-level Snapdragon chip with super-fast 100W charging in a sleek, lightweight body."),
  makeProduct(5, "realme 12 Pro+ 5G (Submarine Blue, 256 GB)", "Mobiles", "realme", 27999, 29999, 4.1, 3872, 27,
    ["8 GB RAM | 256 GB ROM", "6.7 inch Curved AMOLED Display", "50MP Periscope Telephoto Camera", "5000 mAh Battery"],
    "Shoot like a pro with a periscope telephoto lens, wrapped in a striking curved-glass design."),
  makeProduct(6, "vivo T3x 5G (Crystal Flake, 128 GB)", "Mobiles", "vivo", 15999, 18999, 4.0, 2891, 55,
    ["6 GB RAM | 128 GB ROM", "6.72 inch Full HD+ 120Hz Display", "50MP Rear Camera", "6000 mAh Massive Battery"],
    "A massive 6000mAh battery and a smooth 120Hz display make the T3x built for endurance."),

  // Fashion
  makeProduct(7, "Men Slim Fit Checkered Cotton Casual Shirt", "Fashion", "Roadster", 899, 1999, 4.1, 4521, 120,
    ["100% Cotton", "Slim Fit", "Machine Wash"],
    "A breathable cotton casual shirt with a modern checkered print, perfect for everyday wear."),
  makeProduct(8, "Women Floral Printed A-Line Midi Dress", "Fashion", "H&M", 1299, 2499, 4.3, 3012, 80,
    ["Polyester Blend", "A-Line Fit", "Machine Wash Cold"],
    "A flattering floral midi dress with a flowing A-line silhouette, ideal for summer outings."),
  makeProduct(9, "Unisex Running Shoes - Lightweight Mesh", "Fashion", "Puma", 1799, 3499, 4.4, 8234, 65,
    ["Breathable Mesh Upper", "EVA Sole for Cushioning", "Lace-Up Closure"],
    "Engineered for comfort on long runs, with a lightweight mesh upper and responsive cushioning."),
  makeProduct(10, "Men Leather Analog Wrist Watch", "Fashion", "Fossil", 2999, 5999, 4.5, 1988, 30,
    ["Genuine Leather Strap", "Water Resistant 50m", "Quartz Movement"],
    "A timeless analog watch with a genuine leather strap and a minimal dial design."),
  makeProduct(11, "Women Quilted Sling Handbag", "Fashion", "Caprese", 1099, 2199, 4.2, 2456, 90,
    ["Vegan Leather", "Adjustable Strap", "Multiple Compartments"],
    "A chic quilted sling bag that pairs effortlessly with both casual and formal outfits."),
  makeProduct(12, "Kids Cotton Printed T-Shirt (Pack of 3)", "Fashion", "H&M Kids", 599, 1199, 4.0, 1765, 150,
    ["100% Cotton", "Pack of 3", "Machine Washable"],
    "Soft, breathable cotton tees in fun prints — a wardrobe staple for active kids."),

  // Electronics
  makeProduct(13, "boAt Rockerz 450 Bluetooth Headphone", "Electronics", "boAt", 1299, 3490, 4.2, 132045, 200,
    ["Up to 15 Hours Playback", "40mm Dynamic Drivers", "Bluetooth v5.0"],
    "Immersive sound with deep bass and up to 15 hours of playtime on a single charge."),
  makeProduct(14, "Dell 24 inch Full HD IPS Monitor", "Electronics", "Dell", 8999, 12999, 4.4, 4521, 45,
    ["23.8 inch Full HD IPS Panel", "75Hz Refresh Rate", "AMD FreeSync"],
    "Crisp visuals and wide viewing angles make this monitor great for work and casual gaming."),
  makeProduct(15, "HP Pavilion 15 Laptop (Ryzen 5, 16GB, 512GB SSD)", "Electronics", "HP", 54999, 69999, 4.3, 3210, 18,
    ["AMD Ryzen 5 7530U", "16 GB RAM | 512 GB SSD", "15.6 inch FHD Display", "Windows 11"],
    "A powerful everyday laptop with a fast SSD, ample RAM and a vivid full-HD display."),
  makeProduct(16, "Canon EOS 1500D DSLR Camera with 18-55mm Lens", "Electronics", "Canon", 33999, 41999, 4.5, 2765, 15,
    ["24.1 MP Sensor", "18-55mm Zoom Lens Kit", "Full HD Video Recording"],
    "Step into photography with a beginner-friendly DSLR that delivers crisp, detailed images."),
  makeProduct(17, "JBL Flip 6 Portable Bluetooth Speaker", "Electronics", "JBL", 8999, 11999, 4.6, 15230, 60,
    ["30W Powerful Sound", "IP67 Waterproof", "12 Hours Playtime"],
    "Take the party anywhere with punchy JBL sound in a fully waterproof, portable design."),
  makeProduct(18, "Mi Smart Band 8 Fitness Tracker", "Electronics", "Mi", 2499, 3499, 4.1, 42310, 300,
    ["1.62 inch AMOLED Display", "150+ Watch Faces", "SpO2 & Heart Rate Monitor"],
    "Track your fitness goals in style with a vibrant AMOLED display and 16-day battery life."),

  // Home
  makeProduct(19, "Cotton King Size Bedsheet with 2 Pillow Covers", "Home", "Spaces", 899, 1999, 4.2, 3421, 100,
    ["100% Cotton, 210 TC", "King Size 90x100 inch", "Includes 2 Pillow Covers"],
    "Soft, breathable cotton bedsheet set that brings a cosy, hotel-like feel to your bedroom."),
  makeProduct(20, "Non-Stick Cookware Set (5 Pieces)", "Home", "Prestige", 1499, 2999, 4.3, 5210, 70,
    ["5 Piece Set", "Induction Compatible", "PFOA Free Coating"],
    "A versatile non-stick cookware set built for everyday cooking, from sautéing to simmering."),
  makeProduct(21, "LED Table Lamp with Wooden Base", "Home", "Philips", 999, 1799, 4.0, 1120, 85,
    ["Warm White LED", "Touch Dimmer Control", "Wooden Base"],
    "A warm, ambient table lamp with a touch-dimmer for reading nooks and bedside tables."),
  makeProduct(22, "Memory Foam Bathroom Mat (Set of 2)", "Home", "Spaces", 499, 999, 4.1, 2310, 140,
    ["Memory Foam", "Anti-Skid Base", "Machine Washable"],
    "Plush, quick-drying memory foam mats that keep your bathroom floor soft underfoot."),
  makeProduct(23, "Wall Mounted Wooden Shelf (Set of 3)", "Home", "Home Sparkle", 1199, 2299, 4.2, 987, 55,
    ["Engineered Wood", "Easy Wall Mount", "Set of 3 Floating Shelves"],
    "Stylish floating shelves that add storage and display space without eating up floor area."),
  makeProduct(24, "Scented Soy Candle Gift Set (Pack of 4)", "Home", "Bella Casa", 699, 1299, 4.4, 1543, 200,
    ["Soy Wax", "4 Assorted Fragrances", "25 Hours Burn Time Each"],
    "A relaxing set of soy candles in four calming scents, perfect for gifting or unwinding."),

  // Travel
  makeProduct(25, "8 Wheeler Hard Sided Cabin Luggage (22 inch)", "Travel", "American Tourister", 2499, 4999, 4.3, 5621, 60,
    ["Polycarbonate Shell", "8 Spinner Wheels", "TSA Lock"],
    "A durable hard-shell cabin bag with smooth-gliding spinner wheels for effortless travel."),
  makeProduct(26, "Anti-Theft Travel Backpack with USB Port", "Travel", "Fur Jaden", 1299, 2599, 4.2, 4123, 90,
    ["Water Resistant Fabric", "Built-in USB Charging Port", "Laptop Compartment up to 15.6 inch"],
    "Stay charged on the go with a secure, water-resistant backpack built for daily commutes and travel."),
  makeProduct(27, "Inflatable Neck Pillow with Travel Pouch", "Travel", "Wildcraft", 349, 699, 4.0, 2145, 250,
    ["Soft Velour Cover", "Compact & Inflatable", "Includes Travel Pouch"],
    "A compact, inflatable neck pillow that packs down small but keeps you comfortable on long journeys."),
  makeProduct(28, "Waterproof Duffel Bag (50L)", "Travel", "Wildcraft", 1599, 2999, 4.3, 1876, 75,
    ["50 Litre Capacity", "Waterproof Fabric", "Reinforced Handles"],
    "A rugged, spacious duffel bag ready for treks, gym sessions or weekend getaways."),
  makeProduct(29, "Travel Toiletry Kit Organizer Pouch", "Travel", "Nasher Miles", 399, 799, 4.1, 1320, 180,
    ["Water Resistant Lining", "Multiple Compartments", "Hanging Hook"],
    "Keep toiletries organised and leak-free with this compact hanging travel pouch."),
  makeProduct(30, "Universal Travel Adapter with 4 USB Ports", "Travel", "Portronics", 899, 1499, 4.2, 3654, 130,
    ["Works in 150+ Countries", "4 USB Charging Ports", "Compact & Lightweight"],
    "A single universal adapter that keeps every device charged, wherever your travels take you."),

  // Appliances
  makeProduct(31, "5 Star Inverter Split AC (1.5 Ton)", "Appliances", "LG", 32999, 45999, 4.4, 6210, 25,
    ["1.5 Ton, 5 Star Rating", "Dual Inverter Compressor", "HD Filter with Anti-Virus Protection"],
    "Cool your room faster while saving on electricity with a dual-inverter 5-star AC."),
  makeProduct(32, "8 kg Fully Automatic Front Load Washing Machine", "Appliances", "Bosch", 27999, 34999, 4.5, 3421, 20,
    ["8 kg Capacity", "1200 RPM Spin Speed", "In-built Heater"],
    "Gentle yet powerful washing with a range of programs tailored to every fabric type."),
  makeProduct(33, "253 L 3 Star Double Door Refrigerator", "Appliances", "Samsung", 26999, 32999, 4.3, 2987, 22,
    ["253 Litre Capacity", "3 Star Energy Rating", "Digital Inverter Compressor"],
    "Spacious double-door cooling with a digital inverter compressor for quiet, efficient performance."),
  makeProduct(34, "Microwave Oven Convection 28L", "Appliances", "IFB", 12999, 16999, 4.2, 2456, 40,
    ["28 Litre Capacity", "Convection + Grill + Microwave", "Auto Cook Menus"],
    "Bake, grill and reheat with one versatile convection microwave built for Indian kitchens."),
  makeProduct(35, "1200W Mixer Grinder (3 Jars)", "Appliances", "Bajaj", 2499, 3999, 4.1, 5120, 95,
    ["1200 Watt Motor", "3 Stainless Steel Jars", "Overload Protector"],
    "A powerful, durable mixer grinder ready to handle everyday grinding and blending tasks."),
  makeProduct(36, "7 kg Top Load Washing Machine", "Appliances", "Whirlpool", 13999, 17999, 4.2, 4321, 35,
    ["7 kg Capacity", "6th Sense Technology", "Hard Water Wash"],
    "Efficient top-load washing designed to tackle even hard water conditions with ease."),

  // Furniture
  makeProduct(37, "3 Seater Fabric Sofa", "Furniture", "Urban Ladder", 18999, 28999, 4.3, 1210, 12,
    ["Solid Wood Frame", "High-Density Foam Cushions", "Removable Fabric Cover"],
    "A cosy, sturdy 3-seater sofa built on a solid wood frame with plush foam cushioning."),
  makeProduct(38, "Engineered Wood Study Table", "Furniture", "Nilkamal", 3499, 5999, 4.1, 987, 35,
    ["Engineered Wood", "Built-in Storage Drawer", "Easy Assembly"],
    "A compact study table with smart storage, perfect for home offices and student rooms."),
  makeProduct(39, "Queen Size Bed with Hydraulic Storage", "Furniture", "Durian", 15999, 24999, 4.4, 1543, 15,
    ["Engineered Wood", "Hydraulic Storage Mechanism", "Queen Size 60x75 inch"],
    "Maximise bedroom storage with a sturdy hydraulic-lift bed frame in a warm walnut finish."),
  makeProduct(40, "Ergonomic Mesh Office Chair", "Furniture", "GreenSoul", 5499, 8999, 4.2, 3210, 50,
    ["Breathable Mesh Back", "Adjustable Lumbar Support", "360° Swivel"],
    "All-day comfort for work-from-home setups, with adjustable lumbar support and a breathable mesh back."),
  makeProduct(41, "2 Door Wardrobe with Mirror", "Furniture", "Nilkamal", 8999, 13999, 4.0, 765, 20,
    ["Engineered Wood", "Full-Length Mirror", "Hanging Rod + Shelves"],
    "A practical two-door wardrobe combining hanging space, shelving and a full-length mirror."),
  makeProduct(42, "Bookshelf Cum Display Unit (5 Tier)", "Furniture", "Home Centre", 4499, 6999, 4.1, 654, 40,
    ["5 Tier Open Shelving", "Engineered Wood", "Easy Wall Anchoring"],
    "Show off your favourite reads and décor pieces on this airy, five-tier open shelf."),

  // Beauty
  makeProduct(43, "Vitamin C Brightening Face Serum (30ml)", "Beauty,Toys & more", "Minimalist", 549, 799, 4.3, 8210, 220,
    ["10% Vitamin C", "Reduces Dark Spots", "Suitable for All Skin Types"],
    "A lightweight brightening serum that fades dark spots and evens out skin tone over time."),
  makeProduct(44, "Matte Liquid Lipstick Combo (Set of 3)", "Beauty,Toys & more", "Sugar Cosmetics", 599, 1197, 4.2, 4521, 160,
    ["Long Lasting Matte Finish", "Transfer-Proof", "Set of 3 Shades"],
    "Bold, transfer-proof matte shades that stay put from morning meetings to night outs."),
  makeProduct(45, "Building Blocks Construction Set (250 Pieces)", "Beauty,Toys & more", "Funskool", 899, 1499, 4.4, 3120, 130,
    ["250 Interlocking Pieces", "Boosts Creativity", "Ages 4+"],
    "A colourful building-block set that keeps young minds busy building and imagining."),
  makeProduct(46, "Remote Control Racing Car", "Beauty,Toys & more", "Hot Wheels", 1299, 2199, 4.1, 2765, 90,
    ["2.4GHz Remote Control", "Rechargeable Battery", "High Speed Racing"],
    "A rechargeable RC racing car built for speed, with responsive 2.4GHz remote control."),
  makeProduct(47, "Herbal Hair Growth Oil (200ml)", "Beauty,Toys & more", "Indulekha", 399, 649, 4.0, 6210, 300,
    ["Ayurvedic Formula", "Reduces Hair Fall", "200 ml Bottle"],
    "A traditional ayurvedic hair oil formulated to strengthen roots and reduce hair fall."),
  makeProduct(48, "Educational Learning Tablet for Kids", "Beauty,Toys & more", "Chimp & Zee", 1499, 2499, 4.2, 1876, 70,
    ["80+ Learning Activities", "Kid-Safe Design", "Ages 3-8"],
    "A durable, kid-friendly learning tablet packed with games that make early learning fun."),

  // Grocery
  makeProduct(49, "Premium Basmati Rice (5 kg)", "Grocery", "India Gate", 599, 799, 4.5, 9210, 400,
    ["Long Grain Basmati", "Aged for Aroma", "5 kg Pack"],
    "Aromatic, long-grain basmati rice aged to perfection for fluffy, fragrant meals."),
  makeProduct(50, "Cold Pressed Groundnut Oil (1L)", "Grocery", "Fortune", 249, 329, 4.3, 4521, 350,
    ["Cold Pressed", "Rich in Nutrients", "1 Litre Pack"],
    "Naturally extracted groundnut oil that retains its nutrients and rich, nutty aroma."),
  makeProduct(51, "Mixed Dry Fruits Gift Pack (1 kg)", "Grocery", "Nutraj", 899, 1299, 4.4, 3210, 180,
    ["Almonds, Cashews & Raisins", "Premium Quality", "1 kg Assorted Pack"],
    "A generous assortment of premium dry fruits, ready to gift or snack on any time."),
  makeProduct(52, "Organic Honey (500g)", "Grocery", "Dabur", 249, 349, 4.2, 5120, 260,
    ["100% Pure & Natural", "No Added Sugar", "500g Jar"],
    "Pure, unadulterated honey sourced naturally, with no added sugar or preservatives."),
  makeProduct(53, "Whole Wheat Atta (10 kg)", "Grocery", "Aashirvaad", 449, 549, 4.5, 8765, 500,
    ["100% Whole Wheat", "Stone Ground", "10 kg Pack"],
    "Stone-ground whole wheat atta that makes soft, wholesome rotis every single time."),
  // Additional Mobiles
  makeProduct(55, "Poco X6 Pro 5G (Racing Yellow, 256 GB)", "Mobiles", "Xiaomi", 25999, 29999, 4.4, 5210, 15,
    ["8 GB RAM | 256 GB ROM", "6.67 inch 1.5K AMOLED", "64MP OIS Camera", "MediaTek Dimensity 8300-Ultra"],
    "Unleash extreme gaming performance with the Poco X6 Pro, featuring a hyper-fast processor and vibrant AMOLED screen."),
  makeProduct(56, "Nothing Phone (2a) (White, 128 GB)", "Mobiles", "Nothing", 23999, 25999, 4.3, 3421, 25,
    ["8 GB RAM | 128 GB ROM", "6.7 inch Flexible AMOLED", "50MP Dual Rear Camera", "Custom MediaTek Dimensity 7200 Pro"],
    "Experience the unique Glyph Interface and clean Nothing OS with the beautifully designed Phone (2a)."),
  makeProduct(57, "Motorola Edge 50 Pro 5G (Luxe Lavender, 256 GB)", "Mobiles", "Motorola", 31999, 35999, 4.5, 2150, 10,
    ["12 GB RAM | 256 GB ROM", "6.7 inch 1.5K 144Hz pOLED", "50MP OIS + 13MP + 10MP", "125W TurboPower Charging"],
    "Premium design meets incredible performance. Fully charged in minutes with 125W TurboPower."),

  // Additional Fashion
  makeProduct(58, "Levi's Men 511 Slim Fit Jeans", "Fashion", "Levi's", 1999, 3999, 4.4, 8540, 60,
    ["Cotton Blend", "Slim Fit", "Machine Wash"],
    "Classic Levi's 511 slim fit jeans, a versatile staple for any casual wardrobe."),
  makeProduct(59, "Biba Women Printed Kurta Set", "Fashion", "Biba", 1499, 2999, 4.2, 3210, 45,
    ["Cotton Fabric", "Printed Pattern", "Includes Kurta, Pant & Dupatta"],
    "Elegant and comfortable ethnic wear perfect for festive occasions or daily wear."),
  makeProduct(60, "Nike Air Max 90 Sneakers", "Fashion", "Nike", 8999, 10999, 4.6, 2105, 30,
    ["Leather & Mesh Upper", "Max Air Cushioning", "Rubber Waffle Outsole"],
    "Iconic style and legendary comfort. The Air Max 90 remains a streetwear staple."),

  // Additional Electronics
  makeProduct(61, "Sony WH-1000XM5 Noise Cancelling Headphones", "Electronics", "Sony", 29990, 34990, 4.7, 14200, 18,
    ["Industry Leading ANC", "Up to 30 Hours Battery", "Multipoint Connection"],
    "The best just got better. Exceptional noise cancellation and pristine audio quality from Sony."),
  makeProduct(62, "Apple iPad Air (5th Gen, 64GB, Wi-Fi)", "Electronics", "Apple", 54900, 59900, 4.8, 8520, 22,
    ["10.9-inch Liquid Retina Display", "Apple M1 Chip", "12MP Ultra Wide Front Camera"],
    "Supercharged by the M1 chip, the iPad Air brings incredible performance to a thin and light design."),
  makeProduct(63, "Samsung 43 inch Crystal 4K UHD Smart TV", "Electronics", "Samsung", 32990, 47900, 4.4, 5630, 15,
    ["4K Ultra HD Resolution", "Crystal Processor 4K", "Tizen Smart TV"],
    "Vibrant colors and sharp details with Crystal 4K resolution, plus all your favorite streaming apps."),

  // Additional Home
  makeProduct(64, "Wakefit Orthopedic Memory Foam Mattress", "Home", "Wakefit", 12999, 18999, 4.6, 12450, 40,
    ["Queen Size (78x60x6 inches)", "Orthopedic Support", "Removable Cover"],
    "Wake up refreshed with adaptive memory foam that contours to your body for perfect spinal alignment."),
  makeProduct(65, "Godrej Interio 3 Door Steel Wardrobe", "Home", "Godrej", 24999, 32999, 4.3, 1120, 12,
    ["Premium Steel Construction", "Secure Locking Mechanism", "Ample Storage Space"],
    "Durable and secure storage solution for your bedroom, built with Godrej's trusted steel quality."),
  makeProduct(66, "Bombay Dyeing Premium Cotton Bath Towel", "Home", "Bombay Dyeing", 499, 999, 4.1, 4520, 150,
    ["100% Cotton", "High Absorbency", "Large Size (70x140 cm)"],
    "Wrap yourself in luxury with this ultra-soft, highly absorbent premium cotton bath towel."),

  // Additional Travel
  makeProduct(67, "Safari Ray Polycarbonate 65 cm Luggage", "Travel", "Safari", 2999, 6999, 4.2, 8540, 55,
    ["Polycarbonate Shell", "4 Spinner Wheels", "Scratch Resistant"],
    "Lightweight and tough medium-sized suitcase, perfect for week-long trips."),
  makeProduct(68, "Victorinox Swiss Army Knife (Huntsman)", "Travel", "Victorinox", 1999, 2499, 4.8, 3210, 80,
    ["15 Functions", "Stainless Steel", "Lifetime Warranty"],
    "The ultimate pocket tool for travel, camping, and everyday problem solving."),
  makeProduct(69, "Tommy Hilfiger 15.6 inch Laptop Backpack", "Travel", "Tommy Hilfiger", 1899, 3999, 4.4, 2100, 65,
    ["Padded Laptop Sleeve", "Water Repellent Fabric", "Ergonomic Straps"],
    "Stylish and functional backpack to keep your tech safe while commuting or travelling."),

  // Additional Appliances
  makeProduct(70, "Dyson V12 Detect Slim Vacuum Cleaner", "Appliances", "Dyson", 54900, 59900, 4.7, 1250, 8,
    ["Laser Dust Detection", "Up to 60 Mins Fade-Free Power", "Lightweight Design"],
    "Reveals invisible dust with laser illumination. Deep cleans your home with ease."),
  makeProduct(71, "Eureka Forbes Aquaguard Aura Water Purifier", "Appliances", "Eureka Forbes", 15999, 21999, 4.3, 5420, 30,
    ["RO+UV+UF+MTDS", "7 Litre Storage", "Active Copper Technology"],
    "Advanced multi-stage purification ensures safe, healthy, and sweet-tasting drinking water."),
  makeProduct(72, "Morphy Richards 2 Slice Pop Up Toaster", "Appliances", "Morphy Richards", 1499, 2199, 4.2, 3210, 45,
    ["Variable Browning Control", "Removable Crumb Tray", "Defrost & Reheat Functions"],
    "Enjoy perfectly crisp toast every morning with this easy-to-use and easy-to-clean toaster."),

  // Additional Furniture
  makeProduct(73, "IKEA Billy Bookcase (White)", "Furniture", "IKEA", 5499, 6999, 4.5, 4520, 25,
    ["Adjustable Shelves", "Particleboard Finish", "Classic Minimalist Design"],
    "The world's most popular bookcase. Simple, versatile, and fits anywhere."),
  makeProduct(74, "Pepperfry Solid Wood Dining Set (4 Seater)", "Furniture", "Pepperfry", 22999, 35999, 4.3, 850, 10,
    ["Sheesham Wood", "4 Upholstered Chairs", "Walnut Finish"],
    "Bring elegance to your dining room with this beautifully crafted solid wood dining set."),
  makeProduct(75, "Sleepyhead Recliner Sofa (Single Seater)", "Furniture", "Sleepyhead", 18999, 25999, 4.4, 1240, 15,
    ["Manual Reclining Mechanism", "Plush Fabric Upholstery", "Lumbar Support"],
    "Kick back and relax in ultimate comfort with this plush, generously padded recliner."),

  // Additional Beauty,Toys & more
  makeProduct(76, "L'Oreal Paris Revitalift Hyaluronic Acid Serum", "Beauty,Toys & more", "L'Oreal", 899, 1099, 4.4, 6520, 110,
    ["1.5% Hyaluronic Acid", "Intense Hydration", "Reduces Fine Lines"],
    "Plump your skin and reduce fine lines with this top-selling hydrating serum."),
  makeProduct(77, "LEGO City Police Station Building Set", "Beauty,Toys & more", "LEGO", 4999, 5999, 4.7, 2100, 35,
    ["668 Pieces", "Includes 3 Vehicles", "Ages 6+"],
    "Action-packed role play awaits with this detailed police station and vehicle set."),
  makeProduct(78, "Philips Norelco Multigroom Trimmer Series 5000", "Beauty,Toys & more", "Philips", 2499, 3299, 4.5, 8540, 90,
    ["18 Attachments", "Self-Sharpening Blades", "Washable"],
    "All-in-one trimmer for face, head, and body styling with precise control."),

  // Additional Grocery
  makeProduct(79, "Tata Salt, Iodized (1 kg)", "Grocery", "Tata", 25, 28, 4.6, 12540, 500,
    ["Vacuum Evaporated", "Added Iodine", "1 kg Pack"],
    "Desh ka namak. Pure, iodized salt for your everyday cooking needs."),
  makeProduct(80, "Maggi 2-Minute Noodles (Pack of 12)", "Grocery", "Maggi", 168, 180, 4.5, 25410, 300,
    ["Masala Flavour", "Quick Snack", "Pack of 12"],
    "The classic 2-minute snack that everyone loves. Perfect for anytime hunger pangs."),
  makeProduct(81, "Amul Pure Ghee (1 L Pouch)", "Grocery", "Amul", 599, 649, 4.7, 15420, 200,
    ["100% Pure Cow Ghee", "Rich Aroma", "1 Litre Pack"],
    "Add authentic flavor and aroma to your meals with pure, traditional Amul Ghee.")
];

function getProductById(id) {
  return PRODUCTS.find((p) => p._id === id);
}
