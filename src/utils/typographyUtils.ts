import { FontCombination, GoogleFont } from "@/types";

// Popular Google Fonts to offer to users
export const googleFonts: GoogleFont[] = [
  // Sans-serif fonts
  { family: "Roboto", category: "sans-serif", variants: ["300", "400", "500", "700"] },
  { family: "Open Sans", category: "sans-serif", variants: ["300", "400", "600", "700"] },
  { family: "Lato", category: "sans-serif", variants: ["300", "400", "700", "900"] },
  { family: "Montserrat", category: "sans-serif", variants: ["300", "400", "500", "700"] },
  { family: "Source Sans 3", category: "sans-serif", variants: ["300", "400", "600", "700"] },
  { family: "Raleway", category: "sans-serif", variants: ["300", "400", "500", "700"] },
  { family: "Poppins", category: "sans-serif", variants: ["300", "400", "500", "700"] },
  { family: "Inter", category: "sans-serif", variants: ["300", "400", "500", "700"] },
  { family: "Work Sans", category: "sans-serif", variants: ["300", "400", "500", "700"] },
  { family: "DM Sans", category: "sans-serif", variants: ["400", "500", "700"] },

  // Serif fonts
  { family: "Merriweather", category: "serif", variants: ["300", "400", "700", "900"] },
  { family: "Playfair Display", category: "serif", variants: ["400", "500", "700", "900"] },
  { family: "Lora", category: "serif", variants: ["400", "500", "700"] },
  { family: "Source Serif 4", category: "serif", variants: ["300", "400", "600", "700"] },
  { family: "Crimson Text", category: "serif", variants: ["400", "600", "700"] },

  // Monospace fonts
  { family: "Roboto Mono", category: "monospace", variants: ["300", "400", "500", "700"] },
  { family: "Source Code Pro", category: "monospace", variants: ["300", "400", "500", "700"] },
  { family: "IBM Plex Mono", category: "monospace", variants: ["300", "400", "500", "700"] },
  { family: "Fira Code", category: "monospace", variants: ["300", "400", "500", "700"] },
  { family: "JetBrains Mono", category: "monospace", variants: ["300", "400", "500", "700"] },
];

// Font combinations for different brand styles
export const fontCombinations: FontCombination[] = [
  {
    name: "Modern Professional",
    description: "Clean and professional for business and corporate sites",
    heading: "Montserrat",
    body: "Source Sans 3",
    mono: "Source Code Pro",
  },
  {
    name: "Classic Elegance",
    description: "Timeless elegance for luxury and high-end brands",
    heading: "Playfair Display",
    body: "Lora",
    mono: "JetBrains Mono",
  },
  {
    name: "Tech Startup",
    description: "Contemporary and cutting-edge for tech companies",
    heading: "Inter",
    body: "Inter",
    mono: "Fira Code",
  },
  {
    name: "Creative Agency",
    description: "Bold and creative for design studios and agencies",
    heading: "Poppins",
    body: "Work Sans",
    mono: "IBM Plex Mono",
  },
  {
    name: "Publication",
    description: "Reader-friendly for blogs and publications",
    heading: "Merriweather",
    body: "Source Serif 4",
    mono: "Roboto Mono",
  },
  {
    name: "E-commerce",
    description: "Clean and accessible for online stores",
    heading: "Raleway",
    body: "Open Sans",
    mono: "Source Code Pro",
  },
  {
    name: "Minimal",
    description: "Understated and minimal for clean interfaces",
    heading: "DM Sans",
    body: "DM Sans",
    mono: "JetBrains Mono",
  },
  {
    name: "Corporate",
    description: "Professional and trustworthy for established companies",
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto Mono",
  },
];

// Helper to get sorted headings fonts (serif and sans-serif)
export const getHeadingFonts = (): GoogleFont[] => {
  return googleFonts.filter(font => font.category === "serif" || font.category === "sans-serif");
};

// Helper to get sorted body fonts (mainly sans-serif)
export const getBodyFonts = (): GoogleFont[] => {
  return googleFonts.filter(font => font.category === "sans-serif" || font.category === "serif");
};

// Helper to get monospace fonts
export const getMonoFonts = (): GoogleFont[] => {
  return googleFonts.filter(font => font.category === "monospace");
};

// Helper to generate Google Fonts URL for the current font selection
export const generateGoogleFontsUrl = (
  headingFont: string,
  bodyFont: string,
  monoFont: string
): string => {
  const fonts = new Set<string>([headingFont, bodyFont, monoFont]);
  const fontWithVariants: string[] = [];

  fonts.forEach(fontFamily => {
    const font = googleFonts.find(f => f.family === fontFamily);
    if (font) {
      fontWithVariants.push(
        `family=${font.family.replace(/ /g, "+")}:wght@${font.variants.join(";")}`
      );
    }
  });

  return `https://fonts.googleapis.com/css2?${fontWithVariants.join("&")}&display=swap`;
};

// Helper for generating a Chakra UI theme fonts object
export const generateFontsThemeObject = (heading: string, body: string, mono: string) => {
  return {
    heading: `'${heading}', sans-serif`,
    body: `'${body}', sans-serif`,
    mono: `'${mono}', monospace`,
  };
};
