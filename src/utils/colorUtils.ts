// Utility functions for color handling in the theme editor

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
export const generateColorPalette = (baseColor: string): { [key: string]: string } => {
  return {
    50: lighten(baseColor, 0.85),  // Very light
    100: lighten(baseColor, 0.7),  // Lighter
    200: lighten(baseColor, 0.5),  // Light
    300: lighten(baseColor, 0.3),  // Somewhat light
    400: lighten(baseColor, 0.1),  // Slightly light
    500: baseColor,                // Base color
    600: darken(baseColor, 0.15),  // Slightly dark
    700: darken(baseColor, 0.3),   // Somewhat dark
    800: darken(baseColor, 0.45),  // Dark
    900: darken(baseColor, 0.6),   // Very dark
  };
};