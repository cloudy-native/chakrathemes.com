// Utility functions for color handling in the theme editor

import { ThemeValues } from "@/types";

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

  // Normalize short hex format (#fff -> #ffffff)
  let hexColor = color;
  if (hexColor.length === 4) {
    hexColor = `#${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}`;
  }

  // Convert to RGB and calculate luminance
  const { r, g, b } = hexToRgb(hexColor);

  // Calculate luminance using the formula from WCAG 2.0
  // https://www.w3.org/TR/WCAG20-TECHS/G17.html
  const luminance =
    0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

  // Color is considered light if luminance is > 0.5
  return luminance > 0.5;
};

/**
 * Converts hex color to RGB object
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

/**
 * Converts RGB values to hex string
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/**
 * Lightens a color by a specified amount
 */
export const lighten = (hex: string, amount: number): string => {
  const { r, g, b } = hexToRgb(hex);
  const newR = Math.round(r + (255 - r) * amount);
  const newG = Math.round(g + (255 - g) * amount);
  const newB = Math.round(b + (255 - b) * amount);
  return rgbToHex(newR, newG, newB);
};

/**
 * Darkens a color by a specified amount
 */
export const darken = (hex: string, amount: number): string => {
  const { r, g, b } = hexToRgb(hex);
  const newR = Math.round(r * (1 - amount));
  const newG = Math.round(g * (1 - amount));
  const newB = Math.round(b * (1 - amount));
  return rgbToHex(newR, newG, newB);
};

/**
 * Generates a full color palette from a single base color
 */
export const generateColorPalette = (
  baseColor: string
): { [key: string]: string } => {
  return {
    50: lighten(baseColor, 0.85), // Very light
    100: lighten(baseColor, 0.7), // Lighter
    200: lighten(baseColor, 0.5), // Light
    300: lighten(baseColor, 0.3), // Somewhat light
    400: lighten(baseColor, 0.1), // Slightly light
    500: baseColor, // Base color
    600: darken(baseColor, 0.15), // Slightly dark
    700: darken(baseColor, 0.3), // Somewhat dark
    800: darken(baseColor, 0.45), // Dark
    900: darken(baseColor, 0.6), // Very dark
  };
};

// Helper function to get a lighter shade of the theme color
export const getLightShade = (
  themeValues: ThemeValues,
  colorKey: string
): string => {
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
export const getDarkShade = (
  themeValues: ThemeValues,
  colorKey: string
): string => {
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
export const getPrimaryShade = (
  themeValues: ThemeValues,
  colorKey: string
): string => {
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
