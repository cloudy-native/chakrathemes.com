// Define the type for our color palette structure
export type ColorPalette = {
  concept: string;
  description: string;
  colors: {
    [colorName: string]: string; // colorName: hexValue
  };
};

// Array of color palettes with different concepts
const inspirationPalettes: ColorPalette[] = [
  {
    concept: "Summer Breeze",
    description: "Light, airy colors reminiscent of warm summer days",
    colors: {
      "Cotton Candy": "#FFCFD2",
      Lemonade: "#FEF7A5",
      "Ocean Mist": "#A3D9FF",
      "Mint Julep": "#B6EFD4",
      "Sunset Glow": "#FFC988",
      "Lavender Field": "#D9C4F8",
    },
  },
  {
    concept: "Autumn Harvest",
    description: "Rich, earthy tones inspired by fall foliage",
    colors: {
      "Pumpkin Spice": "#D35400",
      "Maple Leaf": "#CB4154",
      "Golden Wheat": "#DAA520",
      "Forest Floor": "#5D4037",
      "Cinnamon Stick": "#8B4513",
      "Cranberry Sauce": "#9A0F22",
    },
  },
  {
    concept: "Winter Frost",
    description: "Cool, icy tones for a crisp winter feel",
    colors: {
      "Arctic Blue": "#6B8E9F",
      "Silver Thaw": "#D3E0EA",
      "Midnight Pine": "#2C3E50",
      "Frozen Berry": "#9B5DE5",
      Snowdrift: "#F4F9FF",
      Icicle: "#A5D8DD",
    },
  },
  {
    concept: "Spring Bloom",
    description: "Fresh, vibrant colors of a garden in bloom",
    colors: {
      "Tulip Pink": "#FF7B9C",
      Daffodil: "#FFDA22",
      "New Leaf": "#7ED957",
      "Robin's Egg": "#5BC0EB",
      "Lilac Bud": "#C8A2C8",
      "Morning Dew": "#E6F7FF",
    },
  },
  {
    concept: "Cosmic Voyage",
    description: "Deep, mysterious colors of the universe",
    colors: {
      "Nebula Pink": "#FF61D2",
      Stardust: "#7986CB",
      "Black Hole": "#1A1A2E",
      "Solar Flare": "#FF9E00",
      "Alien Glow": "#39FF14",
      "Deep Space": "#2C3968",
    },
  },
  {
    concept: "Retro Wave",
    description: "Bold, electric colors inspired by 80s aesthetics",
    colors: {
      "Neon Pink": "#FE53BB",
      "Electric Blue": "#09FBD3",
      "Cyber Purple": "#B537F2",
      "Digital Black": "#101010",
      "Grid Yellow": "#F5D300",
      "Miami Sunset": "#F2709C",
    },
  },
  {
    concept: "Jewel Box",
    description: "Rich, luxurious jewel tones",
    colors: {
      "Ruby Sparkle": "#E0115F",
      "Emerald Dream": "#046307",
      "Sapphire Glow": "#0F52BA",
      "Amethyst Haze": "#9966CC",
      "Topaz Fire": "#FFC87C",
      "Onyx Shadow": "#353935",
    },
  },
  {
    concept: "Desert Mirage",
    description: "Warm, earthy tones of arid landscapes",
    colors: {
      "Cactus Flower": "#FF6F61",
      Adobe: "#CB8E69",
      Sandstorm: "#ECD5A9",
      "Turquoise Mine": "#5FCFCA",
      "Twilight Mesa": "#525174",
      "Burnt Earth": "#8B3A3A",
    },
  },
  {
    concept: "Zen Garden",
    description: "Calming, muted tones for balance and harmony",
    colors: {
      "Stone Path": "#928E85",
      "Moss Bed": "#757F65",
      Bamboo: "#C8AD7F",
      "Koi Pond": "#698AAB",
      "Cherry Blossom": "#FADDE1",
      "Weathered Wood": "#967969",
    },
  },
  {
    concept: "Candy Shop",
    description: "Sweet, vibrant colors that pop",
    colors: {
      "Bubblegum Pop": "#FF85FB",
      "Lollipop Red": "#FF5252",
      "Sour Apple": "#4CD964",
      "Blue Raspberry": "#1F9BFF",
      "Lemon Drop": "#FFEF00",
      "Grape Fizz": "#9933FF",
    },
  },
  {
    concept: "Deep Sea",
    description: "Mysterious colors from ocean depths",
    colors: {
      "Coral Reef": "#FF7F50",
      "Abyssal Blue": "#000C66",
      Bioluminescence: "#7BFFC4",
      "Squid Ink": "#1F2833",
      Seaweed: "#2E8B57",
      "Pearl Shimmer": "#F0EAD6",
    },
  },
  {
    concept: "Urban Jungle",
    description: "Contemporary mix of city and nature",
    colors: {
      Concrete: "#95A5A6",
      "Traffic Signal": "#F72C25",
      "Graffiti Gold": "#FFC857",
      Skyscraper: "#2C3E50",
      Parkland: "#2ECC71",
      "Neon Sign": "#FF00FF",
    },
  },
];

export default inspirationPalettes;
