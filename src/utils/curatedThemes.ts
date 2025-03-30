// Simplified Theme palette interface with only base colors (500)
export interface ThemePalette {
  name: string;
  description: string;
  colors: {
    primary: string; // Used for most UI components
    background: string; // For page and panel backgrounds
    secondary: string; // For minor UI contrast like tab text
    accent: string; // For occasional emphasis
  };
}

// Group interface
export interface ThemeGroup {
  groupName: string;
  description: string;
  palettes: ThemePalette[];
}

// 1. Corporate/Business
const corporateBusinessGroup: ThemeGroup = {
  groupName: "Corporate/Business",
  description:
    "Professional themes suitable for business applications, dashboards, and enterprise software",
  palettes: [
    {
      name: "Executive Blue",
      description: "Traditional blue tones with vibrant orange accents for established enterprises",
      colors: {
        primary: "#3182CE",
        background: "#718096",
        secondary: "#718096",
        accent: "#DD6B20",
      },
    },
    {
      name: "Modern Slate",
      description: "Sophisticated grays with teal accents for contemporary business environments",
      colors: {
        primary: "#718096",
        background: "#ADB5BD",
        secondary: "#6C757D",
        accent: "#319795",
      },
    },
    {
      name: "Financial Green",
      description:
        "Professional greens with magenta accents for finance and growth-oriented applications",
      colors: {
        primary: "#38A169",
        background: "#718096",
        secondary: "#6C757D",
        accent: "#D53F8C",
      },
    },
    {
      name: "Corporate Burgundy",
      description: "Rich reds with teal accents for legal, consulting, and premium services",
      colors: {
        primary: "#E53E3E",
        background: "#718096",
        secondary: "#6C757D",
        accent: "#319795",
      },
    },
    {
      name: "Enterprise Indigo",
      description: "Deep indigo with amber accents for innovative enterprise solutions",
      colors: {
        primary: "#5A67D8",
        background: "#718096",
        secondary: "#6C757D",
        accent: "#D69E2E",
      },
    },
    {
      name: "Professional Navy",
      description: "Deep navy blues with gold accents for legal, financial, and insurance sectors",
      colors: {
        primary: "#0967D2",
        background: "#718096",
        secondary: "#6C757D",
        accent: "#F1C93D",
      },
    },
  ],
};

// 2. CreativeBlog
export const creativeBlogGroup: ThemeGroup = {
  groupName: "Creative/Blog",
  description: "Expressive themes for content creation, writing platforms, and personal websites",
  palettes: [
    {
      name: "Writerly",
      description: "Classic serif-inspired palette with warm tones for literary and book blogs",
      colors: {
        primary: "#A67C52",
        background: "#E4D7C5",
        secondary: "#6C757D",
        accent: "#D33030",
      },
    },
    {
      name: "Minimalist",
      description: "Clean whites with black text and subtle blue accents for minimalist blogs",
      colors: {
        primary: "#6C757D",
        background: "#DEE2E6",
        secondary: "#9E9E9E",
        accent: "#3182CE",
      },
    },
    {
      name: "Artist Studio",
      description: "Creative purples with vibrant yellow accents for artistic portfolios",
      colors: {
        primary: "#805AD5",
        background: "#CABFFD",
        secondary: "#6C757D",
        accent: "#D69E2E",
      },
    },
    {
      name: "Cozy Café",
      description: "Rich browns with warm accent tones for food, lifestyle, and coffee blogs",
      colors: {
        primary: "#795548",
        background: "#D3C1AF",
        secondary: "#6C757D",
        accent: "#CDDC39",
      },
    },
    {
      name: "Monochrome",
      description: "Classic black and white with subtle gray tones for timeless editorial design",
      colors: {
        primary: "#9E9E9E",
        background: "#E0E0E0",
        secondary: "#757575",
        accent: "#00BCD4",
      },
    },
    {
      name: "Dreamy",
      description: "Soft pinks and lavenders for lifestyle, fashion, and beauty blogs",
      colors: {
        primary: "#D53F8C",
        background: "#F0B6D3",
        secondary: "#805AD5",
        accent: "#38B2AC",
      },
    },
  ],
};

// 3. E-commerce/Shopping
const ecommerceShoppingGroup: ThemeGroup = {
  groupName: "E-commerce/Shopping",
  description: "Conversion-focused themes for retail, product showcases, and shopping platforms",
  palettes: [
    {
      name: "Marketplace",
      description: "Vibrant blues with orange accents for general e-commerce platforms",
      colors: {
        primary: "#3182CE",
        background: "#BDBDBD",
        secondary: "#718096",
        accent: "#DD6B20",
      },
    },
    {
      name: "Flash Sale",
      description: "Bold reds with action-oriented accents for sales and promotions",
      colors: {
        primary: "#E53E3E",
        background: "#BDBDBD",
        secondary: "#718096",
        accent: "#FFEC3D",
      },
    },
    {
      name: "Luxury",
      description: "Deep blacks with gold accents for premium and luxury products",
      colors: {
        primary: "#6C757D",
        background: "#BDBDBD",
        secondary: "#718096",
        accent: "#F1C93D",
      },
    },
    {
      name: "Fresh Market",
      description: "Vibrant greens with coral accents for food, organic, and natural products",
      colors: {
        primary: "#38A169",
        background: "#BDBDBD",
        secondary: "#718096",
        accent: "#FF6B6B",
      },
    },
    {
      name: "Tech Store",
      description: "Deep teals with electric blue accents for electronics and gadgets",
      colors: {
        primary: "#319795",
        background: "#BDBDBD",
        secondary: "#718096",
        accent: "#2196F3",
      },
    },
    {
      name: "Boutique",
      description: "Soft pinks with emerald accents for fashion and lifestyle products",
      colors: {
        primary: "#D53F8C",
        background: "#BDBDBD",
        secondary: "#718096",
        accent: "#00A36C",
      },
    },
  ],
};

// 4. Technology/SaaS
const technologySaasGroup: ThemeGroup = {
  groupName: "Technology/SaaS",
  description: "Modern themes for tech products, developer tools, and cloud services",
  palettes: [
    {
      name: "Cyberspace",
      description: "Dark mode with neon blue accents for tech-forward applications",
      colors: {
        primary: "#0894E6",
        background: "#14181F",
        secondary: "#5783BC",
        accent: "#0892FF",
      },
    },
    {
      name: "Code",
      description: "Dark theme with vibrant green for developer tools",
      colors: {
        primary: "#38A169",
        background: "#12151C",
        secondary: "#4A5568",
        accent: "#30C85E",
      },
    },
    {
      name: "Quantum",
      description: "Deep violets with electric blue accents for cutting-edge tech",
      colors: {
        primary: "#7C3AED",
        background: "#11042D",
        secondary: "#6C757D",
        accent: "#0CC0DF",
      },
    },
    {
      name: "Clean Interface",
      description: "Minimalist whites with blue accents for modern SaaS platforms",
      colors: {
        primary: "#4299E1",
        background: "#FFFFFF",
        secondary: "#718096",
        accent: "#E2308D",
      },
    },
    {
      name: "Terminal",
      description: "Console-inspired dark theme with green and amber highlights",
      colors: {
        primary: "#A0AEC0",
        background: "#1A202C",
        secondary: "#718096",
        accent: "#68D391",
      },
    },
    {
      name: "Digital Blueprint",
      description: "Technical blues and cyans for data and analytics tools",
      colors: {
        primary: "#2B6CB0",
        background: "#EDF2F7",
        secondary: "#4A5568",
        accent: "#00B5D8",
      },
    },
  ],
};

// 5. Wellness/Health
const wellnessHealthGroup: ThemeGroup = {
  groupName: "Wellness/Health",
  description: "Calming themes for healthcare, fitness, meditation, and wellbeing applications",
  palettes: [
    {
      name: "Healing",
      description: "Soothing greens with lavender accents for healthcare applications",
      colors: {
        primary: "#48BB78",
        background: "#F0FFF4",
        secondary: "#718096",
        accent: "#9F7AEA",
      },
    },
    {
      name: "Mindfulness",
      description: "Serene blues with soft orange accents for meditation and mental health",
      colors: {
        primary: "#4299E1",
        background: "#EBF8FF",
        secondary: "#718096",
        accent: "#F6AD55",
      },
    },
    {
      name: "Fitness",
      description: "Energetic teals with coral accents for fitness and activity tracking",
      colors: {
        primary: "#319795",
        background: "#E6FFFA",
        secondary: "#718096",
        accent: "#FC8181",
      },
    },
    {
      name: "Natural",
      description: "Earthy browns with forest green accents for holistic wellness",
      colors: {
        primary: "#A67C52",
        background: "#FAF5F1",
        secondary: "#718096",
        accent: "#38A169",
      },
    },
    {
      name: "Tranquil",
      description: "Calming lavenders with soft teal accents for relaxation apps",
      colors: {
        primary: "#805AD5",
        background: "#FAF5FF",
        secondary: "#718096",
        accent: "#4FD1C5",
      },
    },
    {
      name: "Vitality",
      description: "Fresh yellows with blue accents for nutrition and wellness tracking",
      colors: {
        primary: "#ECC94B",
        background: "#FFFFF0",
        secondary: "#718096",
        accent: "#3182CE",
      },
    },
  ],
};

// 6. Entertainment/Media
const entertainmentMediaGroup: ThemeGroup = {
  groupName: "Entertainment/Media",
  description: "Vibrant themes for gaming, streaming, social media, and content consumption",
  palettes: [
    {
      name: "Gaming",
      description: "Dark background with neon green and purple accents for gaming platforms",
      colors: {
        primary: "#5A67D8",
        background: "#1A202C",
        secondary: "#A0AEC0",
        accent: "#39D06E",
      },
    },
    {
      name: "Streaming",
      description: "Deep purples with vibrant pink accents for video and music streaming",
      colors: {
        primary: "#6B46C1",
        background: "#2D3748",
        secondary: "#A0AEC0",
        accent: "#F687B3",
      },
    },
    {
      name: "Social",
      description: "Bright blues with coral accents for social media and community platforms",
      colors: {
        primary: "#3182CE",
        background: "#EBF8FF",
        secondary: "#718096",
        accent: "#FC8181",
      },
    },
    {
      name: "Cinematic",
      description: "Dark mode with gold accents for movie and entertainment apps",
      colors: {
        primary: "#2D3748",
        background: "#171923",
        secondary: "#A0AEC0",
        accent: "#F6E05E",
      },
    },
    {
      name: "Arcade",
      description: "Retro-inspired with bright primary colors for casual gaming",
      colors: {
        primary: "#E53E3E",
        background: "#2A2A2A",
        secondary: "#E2E8F0",
        accent: "#0BC5EA",
      },
    },
    {
      name: "Festival",
      description: "Vibrant pinks and purples for events and entertainment discovery",
      colors: {
        primary: "#D53F8C",
        background: "#FED7E2",
        secondary: "#4A5568",
        accent: "#6B46C1",
      },
    },
  ],
};

// 7. Education/Learning
const educationLearningGroup: ThemeGroup = {
  groupName: "Education/Learning",
  description: "Engaging themes for educational platforms, e-learning, and knowledge sharing",
  palettes: [
    {
      name: "Academic",
      description: "Traditional navy with gold accents for higher education and scholarly content",
      colors: {
        primary: "#2C5282",
        background: "#F7FAFC",
        secondary: "#718096",
        accent: "#F6E05E",
      },
    },
    {
      name: "Elementary",
      description: "Playful primary colors for K-12 and child-focused learning platforms",
      colors: {
        primary: "#3182CE",
        background: "#FFFFFF",
        secondary: "#718096",
        accent: "#F6AD55",
      },
    },
    {
      name: "Library",
      description: "Warm browns with green accents for knowledge repositories and references",
      colors: {
        primary: "#A67C52",
        background: "#F8F5F0",
        secondary: "#4A5568",
        accent: "#48BB78",
      },
    },
    {
      name: "Digital Classroom",
      description: "Clean blues with coral accents for modern digital learning environments",
      colors: {
        primary: "#4299E1",
        background: "#EBF8FF",
        secondary: "#718096",
        accent: "#F56565",
      },
    },
    {
      name: "Science Lab",
      description: "Vibrant teals with purple accents for STEM and scientific applications",
      colors: {
        primary: "#38B2AC",
        background: "#E6FFFA",
        secondary: "#718096",
        accent: "#805AD5",
      },
    },
    {
      name: "Language Learning",
      description: "Soft greens with orange accents for language and communication platforms",
      colors: {
        primary: "#68D391",
        background: "#F0FFF4",
        secondary: "#718096",
        accent: "#ED8936",
      },
    },
  ],
};

// 8. Finance/Banking
const financeBankingGroup: ThemeGroup = {
  groupName: "Finance/Banking",
  description:
    "Secure and trustworthy themes for financial services, banking, and investment platforms",
  palettes: [
    {
      name: "Banking Blue",
      description: "Deep blues with gold accents for traditional banking applications",
      colors: {
        primary: "#2B6CB0",
        background: "#F7FAFC",
        secondary: "#4A5568",
        accent: "#ECC94B",
      },
    },
    {
      name: "Investment",
      description: "Forest greens with blue accents for investment and wealth management",
      colors: {
        primary: "#276749",
        background: "#F7FAFC",
        secondary: "#4A5568",
        accent: "#3182CE",
      },
    },
    {
      name: "Fintech",
      description: "Modern purples with green accents for financial technology platforms",
      colors: {
        primary: "#6B46C1",
        background: "#F7FAFC",
        secondary: "#4A5568",
        accent: "#38A169",
      },
    },
    {
      name: "Analytics",
      description: "Slate grays with teal accents for financial analytics and reporting",
      colors: {
        primary: "#4A5568",
        background: "#F7FAFC",
        secondary: "#A0AEC0",
        accent: "#319795",
      },
    },
    {
      name: "Insurance",
      description: "Trustworthy navy with subtle red accents for insurance and protection services",
      colors: {
        primary: "#1A365D",
        background: "#F7FAFC",
        secondary: "#718096",
        accent: "#E53E3E",
      },
    },
    {
      name: "Crypto",
      description: "Technical blacks with electric green accents for cryptocurrency platforms",
      colors: {
        primary: "#1A202C",
        background: "#F7FAFC",
        secondary: "#718096",
        accent: "#68D391",
      },
    },
  ],
};

// 9. Travel/Hospitality
const travelHospitalityGroup: ThemeGroup = {
  groupName: "Travel/Hospitality",
  description: "Inviting themes for travel, hospitality, and tourism platforms",
  palettes: [
    {
      name: "Tropical",
      description: "Ocean blues with sunset orange accents for beach and resort destinations",
      colors: {
        primary: "#4299E1",
        background: "#EBF8FF",
        secondary: "#718096",
        accent: "#ED8936",
      },
    },
    {
      name: "Adventure",
      description: "Forest greens with vibrant red accents for outdoor and adventure travel",
      colors: {
        primary: "#38A169",
        background: "#F0FFF4",
        secondary: "#718096",
        accent: "#E53E3E",
      },
    },
    {
      name: "Luxury Travel",
      description: "Deep navy with gold accents for luxury travel and premium hospitality",
      colors: {
        primary: "#2A4365",
        background: "#F7FAFC",
        secondary: "#718096",
        accent: "#D69E2E",
      },
    },
    {
      name: "Urban Escape",
      description: "Slate grays with vibrant purple accents for city breaks and urban exploration",
      colors: {
        primary: "#4A5568",
        background: "#F7FAFC",
        secondary: "#A0AEC0",
        accent: "#805AD5",
      },
    },
    {
      name: "Culinary",
      description: "Warm terracotta with olive accents for food tourism and culinary experiences",
      colors: {
        primary: "#C05621",
        background: "#FFFAF0",
        secondary: "#718096",
        accent: "#68D391",
      },
    },
    {
      name: "Wellness Retreat",
      description: "Calming aqua with lavender accents for spa and wellness destinations",
      colors: {
        primary: "#4FD1C5",
        background: "#E6FFFA",
        secondary: "#718096",
        accent: "#B794F4",
      },
    },
  ],
};

// 10. Food/Culinary
const foodCulinaryGroup: ThemeGroup = {
  groupName: "Food/Culinary",
  description: "Appetizing themes for food delivery, recipes, and culinary content",
  palettes: [
    {
      name: "Farm Fresh",
      description: "Vibrant greens with tomato red accents for fresh produce and farm-to-table",
      colors: {
        primary: "#48BB78",
        background: "#F0FFF4",
        secondary: "#718096",
        accent: "#E53E3E",
      },
    },
    {
      name: "Spice Market",
      description: "Warm turmeric with deep red accents for global cuisine and spices",
      colors: {
        primary: "#DD6B20",
        background: "#FFFAF0",
        secondary: "#718096",
        accent: "#9B2C2C",
      },
    },
    {
      name: "Bakery",
      description: "Soft creams with chocolate brown accents for bakery and dessert content",
      colors: {
        primary: "#E2E8F0",
        background: "#FFFFFF",
        secondary: "#718096",
        accent: "#5D4037",
      },
    },
    {
      name: "Bistro",
      description: "Deep burgundy with olive accents for restaurant and dining experiences",
      colors: {
        primary: "#9B2C2C",
        background: "#FFF5F5",
        secondary: "#718096",
        accent: "#68D391",
      },
    },
    {
      name: "Cocktail Bar",
      description: "Deep navy with vibrant lime accents for beverages and bar culture",
      colors: {
        primary: "#2C5282",
        background: "#2D3748",
        secondary: "#A0AEC0",
        accent: "#9AE6B4",
      },
    },
    {
      name: "Comfort Food",
      description: "Warm oranges with butter yellow accents for comfort food and home cooking",
      colors: {
        primary: "#DD6B20",
        background: "#FFFAF0",
        secondary: "#718096",
        accent: "#F6E05E",
      },
    },
  ],
};

// 11. Nature/Environmental
export const natureEnvironmentalGroup: ThemeGroup = {
  groupName: "Nature/Environmental",
  description: "Earthy themes for environmental causes, conservation, and outdoor activities",
  palettes: [
    {
      name: "Forest",
      description: "Rich greens with earth brown accents for woodland and conservation",
      colors: {
        primary: "#2F855A",
        background: "#F0FFF4",
        secondary: "#718096",
        accent: "#A67C52",
      },
    },
    {
      name: "Ocean",
      description: "Deep blues with teal accents for marine life and ocean conservation",
      colors: {
        primary: "#2C5282",
        background: "#EBF8FF",
        secondary: "#718096",
        accent: "#38B2AC",
      },
    },
    {
      name: "Desert",
      description: "Warm sand tones with sunset orange accents for arid ecosystems",
      colors: {
        primary: "#D6BCFA",
        background: "#FFFAF0",
        secondary: "#718096",
        accent: "#DD6B20",
      },
    },
    {
      name: "Mountain",
      description: "Slate grays with pine green accents for mountain and alpine themes",
      colors: {
        primary: "#718096",
        background: "#F7FAFC",
        secondary: "#4A5568",
        accent: "#276749",
      },
    },
    {
      name: "Rainforest",
      description: "Vibrant greens with exotic flower accents for tropical ecosystems",
      colors: {
        primary: "#38A169",
        background: "#F0FFF4",
        secondary: "#718096",
        accent: "#D53F8C",
      },
    },
    {
      name: "Arctic",
      description: "Icy blues with subtle purple accents for polar and tundra regions",
      colors: {
        primary: "#90CDF4",
        background: "#EBF8FF",
        secondary: "#718096",
        accent: "#B794F4",
      },
    },
  ],
};

// 12. Kids/Children
export const kidsChildrenGroup: ThemeGroup = {
  groupName: "Kids/Children",
  description: "Playful themes for children's apps, games, and educational content",
  palettes: [
    {
      name: "Primary Play",
      description: "Bright primary colors with yellow accents for early childhood",
      colors: {
        primary: "#3182CE",
        background: "#FFFFFF",
        secondary: "#718096",
        accent: "#ECC94B",
      },
    },
    {
      name: "Storybook",
      description: "Soft pastel greens with pink accents for children's stories and reading apps",
      colors: {
        primary: "#9AE6B4",
        background: "#F0FFF4",
        secondary: "#718096",
        accent: "#FBB6CE",
      },
    },
    {
      name: "Adventure Quest",
      description: "Bold purples with lime green accents for interactive adventures",
      colors: {
        primary: "#805AD5",
        background: "#FAF5FF",
        secondary: "#718096",
        accent: "#68D391",
      },
    },
    {
      name: "Imagination",
      description: "Vibrant pinks with teal accents for creative play and imaginative experiences",
      colors: {
        primary: "#ED64A6",
        background: "#FFF5F7",
        secondary: "#718096",
        accent: "#4FD1C5",
      },
    },
    {
      name: "Animal Kingdom",
      description: "Jungle greens with tiger orange accents for animal and nature themes",
      colors: {
        primary: "#38A169",
        background: "#F0FFF4",
        secondary: "#718096",
        accent: "#DD6B20",
      },
    },
    {
      name: "Space Explorer",
      description: "Deep space blues with star yellow accents for cosmic discovery",
      colors: {
        primary: "#2A4365",
        background: "#1A202C",
        secondary: "#A0AEC0",
        accent: "#F6E05E",
      },
    },
  ],
};

// Neutral/Default Theme Group
export const neutralThemeGroup = {
  groupName: "Neutral/Default",
  description:
    "Basic themes with neutral colors and grayscale options, including variations of the default Chakra UI theme",
  palettes: [
    {
      name: "Chakra Default",
      description: "Similar to the default Chakra UI blue theme",
      colors: {
        primary: "#3182CE", // Chakra blue.500
        background: "#FFFFFF",
        secondary: "#718096", // Chakra gray.500
        accent: "#ED8936", // Chakra orange.500
      },
    },
    {
      name: "Grayscale",
      description: "Pure grayscale palette with blue accent for essential interfaces",
      colors: {
        primary: "#4A5568", // Chakra gray.600
        background: "#F7FAFC", // Chakra gray.50
        secondary: "#A0AEC0", // Chakra gray.400
        accent: "#3182CE", // Chakra blue.500
      },
    },
    {
      name: "Chalk",
      description: "Soft whites and light grays with minimal contrast",
      colors: {
        primary: "#A0AEC0", // Chakra gray.400
        background: "#FFFFFF",
        secondary: "#CBD5E0", // Chakra gray.300
        accent: "#4A5568", // Chakra gray.600
      },
    },
    {
      name: "Charcoal",
      description: "Dark grays with white accent for dark mode interfaces",
      colors: {
        primary: "#2D3748", // Chakra gray.700
        background: "#1A202C", // Chakra gray.800
        secondary: "#4A5568", // Chakra gray.600
        accent: "#FFFFFF",
      },
    },
    {
      name: "Warm Neutral",
      description: "Warm beige and tan tones with brown accent",
      colors: {
        primary: "#B6A397", // Warm mid-tone
        background: "#F9F6F2", // Warm off-white
        secondary: "#D9CFC6", // Light tan
        accent: "#8A6D5A", // Brown
      },
    },
    {
      name: "Cool Neutral",
      description: "Cool gray tones with subtle blue undertones",
      colors: {
        primary: "#91A3B0", // Cool mid-tone
        background: "#F7FAFB", // Cool off-white
        secondary: "#CFD8DC", // Light cool gray
        accent: "#546E7A", // Steel blue-gray
      },
    },
  ],
};

// Collection of all theme groups
export const themeGroups: ThemeGroup[] = [
  neutralThemeGroup,
  corporateBusinessGroup,
  creativeBlogGroup,
  ecommerceShoppingGroup,
  technologySaasGroup,
  wellnessHealthGroup,
  entertainmentMediaGroup,
  educationLearningGroup,
  financeBankingGroup,
  travelHospitalityGroup,
  foodCulinaryGroup,
  natureEnvironmentalGroup,
  kidsChildrenGroup,
];
