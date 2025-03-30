// Simplified Theme palette interface with only base colors (500)
interface ThemePalette {
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
interface ThemeGroup {
  groupName: string;
  description: string;
  palettes: ThemePalette[];
}

// Collection of all theme groups
export const themeGroups: ThemeGroup[] = [
  // 1. Corporate/Business
  {
    groupName: "Corporate/Business",
    description:
      "Professional themes suitable for business applications, dashboards, and enterprise software",
    palettes: [
      {
        name: "Executive Blue",
        description:
          "Traditional blue tones with vibrant orange accents for established enterprises",
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
        description:
          "Deep navy blues with gold accents for legal, financial, and insurance sectors",
        colors: {
          primary: "#0967D2",
          background: "#718096",
          secondary: "#6C757D",
          accent: "#F1C93D",
        },
      },
    ],
  },

  // 2. Creative/Blog
  {
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
  },

  // 3. E-commerce/Shopping
  {
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
  },

  // 4. Technology/SaaS
  {
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
  },

  // 5. Wellness/Health
  {
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
  },

  // 6. Entertainment/Media
  {
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
  },
];
