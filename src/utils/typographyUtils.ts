import { GoogleFont } from "@/types";
import { googleFonts } from "./curatedFonts";

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
