// Collection of free-to-use Unsplash images organized by category
// These URLs follow Unsplash's format which allows for free linking with attribution

export interface ImageCollection {
  [category: string]: {
    title: string;
    description: string;
    images: Array<{
      url: string;
      alt: string;
      credit: string;
    }>;
  };
}

export const unsplashCollections: ImageCollection = {
  sofas: {
    title: "Comfortable Sofas",
    description: "Stylish sofas and living spaces for interior design inspiration",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        alt: "Green velvet sofa with throw pillows",
        credit: "Phillip Goldsberry",
      },
      {
        url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
        alt: "Minimalist gray sofa in modern living room",
        credit: "Sonnie Hiles",
      },
      {
        url: "https://images.unsplash.com/photo-1540574163026-643ea20ade25",
        alt: "Beige sectional sofa with cushions",
        credit: "Jonathan Borba",
      },
      {
        url: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea",
        alt: "Scandinavian style living room with light sofa",
        credit: "Kam Idris",
      },
      {
        url: "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
        alt: "Cozy apartment with brown leather sofa",
        credit: "Kari Shea",
      },
      {
        url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92",
        alt: "Blue sofa with yellow pillows in bright room",
        credit: "Sidekix Media",
      },
      {
        url: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a",
        alt: "Mustard yellow sofa with contemporary styling",
        credit: "Spacejoy",
      },
      {
        url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14",
        alt: "Pink sofa against white wall",
        credit: "Nathan Fertig",
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        alt: "White modern sofa with black coffee table",
        credit: "R ARCHITECTURE",
      },
    ],
  },
  landscape: {
    title: "Stunning Landscapes",
    description: "Beautiful natural scenery from around the world",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        alt: "Mountain range with lake reflection in Yosemite",
        credit: "Bailey Zindel",
      },
      {
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
        alt: "Foggy forest with sunlight breaking through trees",
        credit: "Dino Reichmuth",
      },
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        alt: "Sunset over mountainous landscape",
        credit: "Kees Streefkerk",
      },
      {
        url: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
        alt: "Rocky coastline with crashing waves",
        credit: "Luca Bravo",
      },
      {
        url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
        alt: "Rolling green hills under dramatic sky",
        credit: "Robert Lukeman",
      },
      {
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        alt: "Rugged mountain peaks at sunset",
        credit: "Kalen Emsley",
      },
      {
        url: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21",
        alt: "Calm lake with forest and mountains",
        credit: "Filip Zrnzević",
      },
      {
        url: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e",
        alt: "Tropical beach with turquoise water",
        credit: "Ishan",
      },
      {
        url: "https://images.unsplash.com/photo-1546587348-d12660c30c50",
        alt: "Aerial view of winding river through forest",
        credit: "Geran de Klerk",
      },
      {
        url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
        alt: "Snow-capped mountains with lake reflection",
        credit: "Saul Mercado",
      },
    ],
  },
  conference: {
    title: "Business Conferences",
    description: "Professional meetings, conferences, and corporate events",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
        alt: "Large audience at business conference",
        credit: "Headway",
      },
      {
        url: "https://images.unsplash.com/photo-1560439513-74b037a25d84",
        alt: "Speaker at podium addressing audience",
        credit: "Miguel Henriques",
      },
      {
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
        alt: "Conference room with long table and chairs",
        credit: "Benjamin Child",
      },
      {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978",
        alt: "Business people at networking event",
        credit: "Dylan Gillis",
      },
      {
        url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
        alt: "Team collaborating at conference table",
        credit: "Priscilla Du Preez",
      },
      {
        url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17",
        alt: "Modern conference hall with audience",
        credit: "Teemu Paananen",
      },
      {
        url: "https://images.unsplash.com/photo-1540317580384-e5d6509d21a2",
        alt: "Business workshop with people participating",
        credit: "Product School",
      },
      {
        url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
        alt: "People having discussion at conference table",
        credit: "Amy Hirschi",
      },
      {
        url: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
        alt: "Conference attendees listening to presentation",
        credit: "Austin Distel",
      },
      {
        url: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4",
        alt: "Empty modern conference room with chairs",
        credit: "Parabol",
      },
    ],
  },
  food: {
    title: "Delicious Cuisine",
    description: "Appetizing food photography from various culinary traditions",
    images: [
      {
        url: "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
        alt: "Breakfast spread with pancakes and fruits",
        credit: "Dan Gold",
      },
      {
        url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        alt: "Colorful pasta dish with vegetables",
        credit: "Ella Olsson",
      },
      {
        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        alt: "Fresh pizza with basil leaves",
        credit: "Chad Montano",
      },
      {
        url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        alt: "Healthy salad bowl with vegetables",
        credit: "Dan Gold",
      },
      {
        url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
        alt: "Gourmet burger with fries",
        credit: "Pablo Merchán Montes",
      },
      {
        url: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5",
        alt: "Assortment of sushi rolls",
        credit: "Mahmoud Fawzy",
      },
      {
        url: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c",
        alt: "Berry tart with mint leaves",
        credit: "Monika Grabkowska",
      },
      {
        url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
        alt: "Breakfast with eggs and avocado toast",
        credit: "Joseph Gonzalez",
      },
      {
        url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
        alt: "Chocolate cake with berry topping",
        credit: "Alana Harris",
      },
      {
        url: "https://images.unsplash.com/photo-1501959915551-4e8d30928317",
        alt: "Charcuterie board with cheeses and meats",
        credit: "Sebastian Coman",
      },
    ],
  },
  travel: {
    title: "Global Destinations",
    description: "Inspiring travel locations from around the world",
    images: [
      {
        url: "https://images.unsplash.com/photo-1531572753322-ad063cecc140",
        alt: "Colorful buildings in Positano, Italy",
        credit: "Jack Ward",
      },
      {
        url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
        alt: "Santorini, Greece with white buildings and blue domes",
        credit: "Heidi Kaden",
      },
      {
        url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
        alt: "Venice canal with gondolas",
        credit: "Henrique Ferreira",
      },
      {
        url: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713",
        alt: "Eiffel Tower in Paris",
        credit: "Anthony DELANOIX",
      },
      {
        url: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5",
        alt: "Bali rice terraces at sunset",
        credit: "Dino Reichmuth",
      },
      {
        url: "https://images.unsplash.com/photo-1542820893-f3d457c084c8",
        alt: "Machu Picchu ancient ruins in Peru",
        credit: "Simon Berger",
      },
      {
        url: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a",
        alt: "Golden Gate Bridge in San Francisco",
        credit: "Mark Boss",
      },
      {
        url: "https://images.unsplash.com/photo-1531169509526-f8f1fdaa4a67",
        alt: "Taj Mahal in Agra, India",
        credit: "Sylwia Bartyzel",
      },
      {
        url: "https://images.unsplash.com/photo-1528702748617-c64d49f918af",
        alt: "Sydney Opera House, Australia",
        credit: "Dan Freeman",
      },
      {
        url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        alt: "Colorful houses in Havana, Cuba",
        credit: "Augustin de Montesquiou",
      },
    ],
  },
};
