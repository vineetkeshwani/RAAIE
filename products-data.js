// Raaie Saree Database
const RAAIE_PRODUCTS = [
  {
    id: 1,
    name: "Swarna Mayuri Golden Banarasi Silk Saree",
    category: "Banarasi Sarees",
    price: 6499,
    compareAtPrice: 8999,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      "images/banarasi_saree.png",
      "images/hero_banner.png",
      "images/banarasi_saree.png"
    ],
    fabric: "100% Premium Pure Katan Silk with gold zari weave. Traditional Banarasi brocade pattern.",
    description: "Our signature Swarna Mayuri saree is a masterpiece handcrafted in Varanasi. Woven with pure Katan silk, it features detailed floral patterns (Jaal work) in pure gold zari. Perfect for weddings, festivals, and monumental occasions, this saree embodies the rich legacy of Indian craftsmanship passed down through generations.",
    stock: 3,
    peopleBought: 28,
    reviews: [
      {
        author: "Anjali S.",
        rating: 5,
        title: "Absolutely Stunning Saree!",
        content: "The shine of the zari and the softness of the Katan silk is unparalleled. It looks incredibly royal, and I received endless compliments at my brother's wedding. Thank you, Raaie!",
        date: "May 25, 2026",
        verified: true
      },
      {
        author: "Meera K.",
        rating: 5,
        title: "Pure Luxury",
        content: "I was skeptical about buying high-value silk online, but Rishav and Vineet have done an incredible job. The product exceeds expectations. Beautifully packed, too.",
        date: "May 18, 2026",
        verified: true
      }
    ]
  },
  {
    id: 2,
    name: "Neelambari Mint Linen Saree",
    category: "Linen Sarees",
    price: 2499,
    compareAtPrice: 3499,
    rating: 4.8,
    reviewsCount: 96,
    images: [
      "images/linen_saree.png",
      "images/linen_saree.png",
      "images/cotton_saree.png"
    ],
    fabric: "Premium organic hand-spun linen-cotton blend. Light, breathable, with fine gold borders.",
    description: "The Neelambari Saree brings a fresh breath of pastel elegance to modern ethnic fashion. Meticulously hand-loomed with premium flax linen fibres, it offers a sophisticated linen drape with the absolute comfort of cotton. Ideal for summer luncheons, elegant daytime meetings, or formal office wear.",
    stock: 5,
    peopleBought: 14,
    reviews: [
      {
        author: "Pooja R.",
        rating: 5,
        title: "Extremely comfortable and elegant",
        content: "The pastel mint shade is exactly as pictured. It is perfect for summer heat, breathes well, and has a very classy gold border. Absolute favorite!",
        date: "June 01, 2026",
        verified: true
      }
    ]
  },
  {
    id: 3,
    name: "Maragatham Emerald Satin Saree",
    category: "Satin Sarees",
    price: 3299,
    compareAtPrice: 4599,
    rating: 4.9,
    reviewsCount: 88,
    images: [
      "images/satin_saree.png",
      "images/satin_saree.png",
      "images/satin_saree.png"
    ],
    fabric: "High-grade premium satin silk with a mirror-gloss finish. Hand-embroidered lace borders.",
    description: "Channel modern luxury with our Maragatham Satin Saree. Defined by a rich liquid-like gloss finish, this saree flows seamlessly around the silhouette, highlighting elegance with every move. Accented by a exquisite gold-threaded waist belt detail and detailed floral work, it is a perfect evening wear choice.",
    stock: 2,
    peopleBought: 32,
    reviews: [
      {
        author: "Riya M.",
        rating: 5,
        title: "Luxurious finish!",
        content: "This emerald green is to die for. The satin feels so premium, like liquid gold draping over me. Highly recommend buying it with the waist belt detail.",
        date: "May 29, 2026",
        verified: true
      }
    ]
  },
  {
    id: 4,
    name: "Sindhuri Indigo Ajrakh Saree",
    category: "Ajrakh Collection",
    price: 2899,
    compareAtPrice: 3999,
    rating: 4.7,
    reviewsCount: 74,
    images: [
      "images/ajrakh_saree.png",
      "images/ajrakh_saree.png",
      "images/ajrakh_saree.png"
    ],
    fabric: "100% pure modal silk / fine cotton. Hand-blocked Ajrakh printing with natural organic vegetable dyes.",
    description: "The Sindhuri Ajrakh Saree is a tribute to the desert craft of block printing. Colored using organic indigo and madder root dyes, each geometric print is stamped by hand by master craftsmen. The modal silk base gives it a beautiful, heavy, fluid drape that looks magnificent.",
    stock: 4,
    peopleBought: 19,
    reviews: [
      {
        author: "Devika G.",
        rating: 4,
        title: "Artistic and beautiful",
        content: "Love the traditional block printing. The colors are very earthy and rich. Highly recommended for art lovers.",
        date: "May 15, 2026",
        verified: true
      }
    ]
  },
  {
    id: 5,
    name: "Ksheera Ivory Handloom Cotton Saree",
    category: "Cotton Sarees",
    price: 1999,
    compareAtPrice: 2799,
    rating: 4.8,
    reviewsCount: 112,
    images: [
      "images/cotton_saree.png",
      "images/cotton_saree.png",
      "images/linen_saree.png"
    ],
    fabric: "100% Fine Handspun Cotton, textured weave with golden border details (Kasavu style).",
    description: "Elegant, crisp, and pure, our Ksheera Handloom Cotton Saree captures the essence of classic minimalism. Woven in fine white and gold borders, it is extremely breathable and light. Perfect for traditional pujas, temple visits, and ethnic workspace styling.",
    stock: 9,
    peopleBought: 11,
    reviews: [
      {
        author: "Radha V.",
        rating: 5,
        title: "Simplicity at its best",
        content: "So simple, yet so elegant. The cotton is high quality and drapes very neatly. It is perfect for formal occasions.",
        date: "June 02, 2026",
        verified: true
      }
    ]
  },
  {
    id: 6,
    name: "Rudra Crimson Festive Silk Saree",
    category: "Festive Collection",
    price: 5499,
    compareAtPrice: 7999,
    rating: 5.0,
    reviewsCount: 63,
    images: [
      "images/banarasi_saree.png",
      "images/hero_banner.png",
      "images/banarasi_saree.png"
    ],
    fabric: "Premium Georgette Silk with gold gota patti and zari borders. Intricate bridal motifs.",
    description: "Make a striking statement this wedding and festive season with the Rudra Crimson Saree. Woven with fluid georgette silk in a glowing crimson hue, it is adorned with extensive gold brocade work. Hand-finished details assure that you stand out in every wedding function.",
    stock: 2,
    peopleBought: 23,
    reviews: [
      {
        author: "Nandini J.",
        rating: 5,
        title: "Dream Wedding Saree!",
        content: "This red is gorgeous! The handwork borders are highly intricate and look very costly. Raaie has delivered exceptional quality.",
        date: "May 28, 2026",
        verified: true
      }
    ]
  }
];

// Helper functions for e-commerce logic
const ProductService = {
  getAll: () => RAAIE_PRODUCTS,
  getById: (id) => RAAIE_PRODUCTS.find(p => p.id === parseInt(id)),
  getByCategory: (category) => RAAIE_PRODUCTS.filter(p => p.category.toLowerCase().includes(category.toLowerCase())),
  getFeatured: () => RAAIE_PRODUCTS.slice(0, 4),
  getBestSellers: () => RAAIE_PRODUCTS.filter(p => p.rating >= 4.8),
  getRecommended: (currentId) => RAAIE_PRODUCTS.filter(p => p.id !== parseInt(currentId)).slice(0, 4)
};
