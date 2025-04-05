// Utility functions for color handling in the theme editor using chroma.js
import chroma from "chroma-js";
import { ThemeValues, RGBColor, HSLColor, ColorPalette } from "@/types";

/**
 * Calculates the luminance of a color to determine if it's light or dark
 * Based on W3C accessibility guidelines for contrast
 * Returns true if the color is light (should use dark text)
 */
export const isLightColor = (color: string): boolean => {
  // Skip calculation for non-hex values and defaults
  if (!color || !color.startsWith("#")) {
    // For named colors, you could add a lookup table here
    // For now, default to using white text for non-hex colors
    return false;
  }

  try {
    // Use chroma's luminance method (returns value between 0-1)
    const luminance = chroma(color).luminance();

    // Color is considered light if luminance is > 0.5
    return luminance > 0.5;
  } catch (error: unknown) {
    console.error(
      "Error calculating color luminance:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
};

/**
 * Normalize hex color (#fff -> #ffffff)
 */
export const normalizeHex = (hex: string): string => {
  // Validate input
  if (!hex) {
    throw new Error("Color value cannot be empty");
  }

  try {
    // Let chroma handle the normalization
    return chroma(hex).hex();
  } catch (error: unknown) {
    throw new Error(
      `Invalid color format: ${hex}. ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

/**
 * Calculate luminance according to WCAG standards
 */
export const calculateLuminance = (r: number, g: number, b: number): number => {
  try {
    return chroma(r, g, b).luminance();
  } catch (error: unknown) {
    console.error("Error calculating luminance:", error instanceof Error ? error.message : error);
    return 0;
  }
};

/**
 * Converts hex color to RGB object
 */
export const hexToRgb = (hex: string): RGBColor => {
  try {
    const [r, g, b] = chroma(hex).rgb();
    return { r, g, b };
  } catch (error: unknown) {
    console.error("Error converting hex to RGB:", error instanceof Error ? error.message : error);
    return { r: 0, g: 0, b: 0 };
  }
};

/**
 * Converts RGB values to hex string
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  try {
    return chroma(r, g, b).hex();
  } catch (error: unknown) {
    console.error("Error converting RGB to hex:", error instanceof Error ? error.message : error);
    return "#000000";
  }
};

/**
 * Converts RGB to HSL
 */
export const rgbToHsl = ({ r, g, b }: RGBColor): HSLColor => {
  try {
    const [h, s, l] = chroma(r, g, b).hsl();
    return {
      h: isNaN(h) ? 0 : Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  } catch (error: unknown) {
    console.error("Error converting RGB to HSL:", error instanceof Error ? error.message : error);
    return { h: 0, s: 0, l: 0 };
  }
};

/**
 * Converts HSL to RGB
 */
export const hslToRgb = ({ h, s, l }: HSLColor): RGBColor => {
  try {
    // Normalize HSL values for chroma
    const [r, g, b] = chroma.hsl(h, s / 100, l / 100).rgb();
    return {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
    };
  } catch (error: unknown) {
    console.error("Error converting HSL to RGB:", error instanceof Error ? error.message : error);
    return { r: 0, g: 0, b: 0 };
  }
};

/**
 * Lightens a color by a specified amount
 */
export const lighten = (hex: string, amount: number): string => {
  try {
    const color = chroma(hex);
    const hsl = color.hsl();
    const baseL = hsl[2]; // Lightness value in 0-1 range

    // Calculate remaining lightness room and scale the amount
    const remainingRoom = 1 - baseL;
    const scaledAmount = amount * remainingRoom;

    // Create a new color with adjusted lightness
    return chroma(hex)
      .set("hsl.l", baseL + scaledAmount)
      .hex();
  } catch (error: unknown) {
    console.error("Error lightening color:", error instanceof Error ? error.message : error);
    return hex;
  }
};

/**
 * Darkens a color by a specified amount
 */
export const darken = (hex: string, amount: number): string => {
  try {
    const color = chroma(hex);
    const hsl = color.hsl();
    const baseL = hsl[2]; // Lightness value in 0-1 range

    // Calculate available darkness and scale the amount
    const scaledAmount = amount * baseL;

    // Create a new color with adjusted lightness
    return chroma(hex)
      .set("hsl.l", baseL - scaledAmount)
      .hex();
  } catch (error: unknown) {
    console.error("Error darkening color:", error instanceof Error ? error.message : error);
    return hex;
  }
};

/**
 * Generates a full color palette from a single base color
 */
export const generateColorPalette = (baseColor: string): ColorPalette => {
  try {
    // Ensure we have a valid color
    const normalizedBase = normalizeHex(baseColor);

    // Get the lightness value to adjust the palette generation
    const baseL = chroma(normalizedBase).get("hsl.l"); // 0-1 scale

    // Adjust scaling factors based on base lightness
    // This creates better distribution for very light or dark colors
    const lightScalingFactor = Math.max(0.8, 1.2 - baseL); // Higher for darker colors
    const darkScalingFactor = Math.max(0.8, 0.2 + baseL); // Higher for lighter colors

    return {
      50: lighten(normalizedBase, 0.9 * lightScalingFactor), // Very light
      100: lighten(normalizedBase, 0.75 * lightScalingFactor), // Lighter
      200: lighten(normalizedBase, 0.55 * lightScalingFactor), // Light
      300: lighten(normalizedBase, 0.35 * lightScalingFactor), // Somewhat light
      400: lighten(normalizedBase, 0.15 * lightScalingFactor), // Slightly light
      500: normalizedBase, // Base color
      600: darken(normalizedBase, 0.15 * darkScalingFactor), // Slightly dark
      700: darken(normalizedBase, 0.35 * darkScalingFactor), // Somewhat dark
      800: darken(normalizedBase, 0.55 * darkScalingFactor), // Dark
      900: darken(normalizedBase, 0.75 * darkScalingFactor), // Very dark
    };
  } catch (error: unknown) {
    console.error(
      "Error generating color palette:",
      error instanceof Error ? error.message : error
    );
    // Return a default gray palette as fallback
    return {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    };
  }
};

/**
 * Calculates contrast ratio between two colors (for accessibility checks)
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  try {
    return chroma.contrast(color1, color2);
  } catch (error: unknown) {
    console.error(
      "Error calculating contrast ratio:",
      error instanceof Error ? error.message : error
    );
    return 1;
  }
};

// Helper function to get a lighter shade of the theme color
export const getLightShade = (themeValues: ThemeValues, colorKey: string): string => {
  // Try to get a light shade (50, 100, or 200)
  if (themeValues.colors && themeValues.colors[colorKey]) {
    if (themeValues.colors[colorKey]["50"]) {
      return `${colorKey}.50`;
    } else if (themeValues.colors[colorKey]["100"]) {
      return `${colorKey}.100`;
    } else if (themeValues.colors[colorKey]["200"]) {
      return `${colorKey}.200`;
    }
  }
  return `${colorKey}.100`;
};

// Helper function to get a darker shade of the theme color
export const getDarkShade = (themeValues: ThemeValues, colorKey: string): string => {
  // Try to get a dark shade (800, 700, or 600)
  if (themeValues.colors && themeValues.colors[colorKey]) {
    if (themeValues.colors[colorKey]["800"]) {
      return `${colorKey}.800`;
    } else if (themeValues.colors[colorKey]["700"]) {
      return `${colorKey}.700`;
    } else if (themeValues.colors[colorKey]["600"]) {
      return `${colorKey}.600`;
    }
  }
  return `${colorKey}.800`;
};

// Helper function to get a primary shade of the theme color
export const getPrimaryShade = (themeValues: ThemeValues, colorKey: string): string => {
  // Try to get a medium shade (500)
  if (themeValues.colors && themeValues.colors[colorKey]) {
    if (themeValues.colors[colorKey]["500"]) {
      return `${colorKey}.500`;
    } else if (themeValues.colors[colorKey]["400"]) {
      return `${colorKey}.400`;
    } else if (themeValues.colors[colorKey]["600"]) {
      return `${colorKey}.600`;
    }
  }
  return `${colorKey}.500`;
};

/**
 * Additional color utility functions enabled by chroma.js
 */

/**
 * Creates a color scale with a specified number of steps
 */
export const createColorScale = (color1: string, color2: string, steps: number): string[] => {
  try {
    return chroma.scale([color1, color2]).mode("lch").colors(steps);
  } catch (error: unknown) {
    console.error("Error creating color scale:", error instanceof Error ? error.message : error);
    return [color1, color2];
  }
};

/**
 * Returns a color that has sufficient contrast with the background
 * for accessibility (WCAG AA requires 4.5:1 for normal text)
 */
export const getAccessibleTextColor = (backgroundColor: string, minContrast = 4.5): string => {
  try {
    const black = "#000000";
    const white = "#FFFFFF";

    const blackContrast = chroma.contrast(backgroundColor, black);
    const whiteContrast = chroma.contrast(backgroundColor, white);

    return blackContrast >= minContrast && blackContrast >= whiteContrast ? black : white;
  } catch (error: unknown) {
    console.error(
      "Error determining accessible text color:",
      error instanceof Error ? error.message : error
    );
    return "#FFFFFF";
  }
};

/**
 * Creates analogous colors (adjacent on color wheel)
 */
export const getAnalogousColors = (baseColor: string, count = 3, angle = 30): string[] => {
  try {
    const baseHue = chroma(baseColor).get("hsl.h");
    const colors = [];

    const startAngle = baseHue - ((count - 1) / 2) * angle;

    for (let i = 0; i < count; i++) {
      const hue = (startAngle + i * angle) % 360;
      colors.push(chroma(baseColor).set("hsl.h", hue).hex());
    }

    return colors;
  } catch (error: unknown) {
    console.error(
      "Error generating analogous colors:",
      error instanceof Error ? error.message : error
    );
    return [baseColor];
  }
};

/**
 * Creates complementary color (opposite on color wheel)
 */
export const getComplementaryColor = (baseColor: string): string => {
  try {
    const baseHue = chroma(baseColor).get("hsl.h");
    return chroma(baseColor)
      .set("hsl.h", (baseHue + 180) % 360)
      .hex();
  } catch (error: unknown) {
    console.error(
      "Error generating complementary color:",
      error instanceof Error ? error.message : error
    );
    return baseColor;
  }
};

/**
 * Creates triadic colors (three colors equidistant on color wheel)
 */
export const getTriadicColors = (baseColor: string): string[] => {
  try {
    const baseHue = chroma(baseColor).get("hsl.h");
    return [
      baseColor,
      chroma(baseColor)
        .set("hsl.h", (baseHue + 120) % 360)
        .hex(),
      chroma(baseColor)
        .set("hsl.h", (baseHue + 240) % 360)
        .hex(),
    ];
  } catch (error: unknown) {
    console.error(
      "Error generating triadic colors:",
      error instanceof Error ? error.message : error
    );
    return [baseColor];
  }
};

/**
 * Creates a monochromatic palette (same hue, different saturation/lightness)
 */
export const getMonochromaticColors = (baseColor: string, count = 5): string[] => {
  try {
    const base = chroma(baseColor);
    const [h, s, _l] = base.hsl(); // Prefix unused variable with underscore
    const colors = [];

    // Create variations with different lightness
    for (let i = 0; i < count; i++) {
      const newL = 0.1 + (0.8 * i) / (count - 1);
      colors.push(chroma.hsl(h, s, newL).hex());
    }

    return colors;
  } catch (error: unknown) {
    console.error(
      "Error generating monochromatic colors:",
      error instanceof Error ? error.message : error
    );
    return [baseColor];
  }
};

/**
 * Checks if a palette name already exists in the theme and shows an error toast if it does
 * @param paletteName The palette name to check
 * @param colors The existing colors object from themeValues
 * @param toast The toast function to show errors
 * @returns True if palette name is available, false if it already exists
 */
export const isPaletteNameAvailable = (
  paletteName: string,
  colors: Record<string, any> | undefined,
  toast: any
): boolean => {
  if (!paletteName.trim()) {
    toast({
      title: "Palette name is required",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    return false;
  }

  const formattedName = paletteName.trim().toLowerCase().replace(/\s+/g, "-");
  const existingColors = colors || {};

  if (existingColors[formattedName]) {
    toast({
      title: `Palette "${formattedName}" already exists`,
      description: "Please choose a different name for your palette",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return false;
  }

  return true;
};
