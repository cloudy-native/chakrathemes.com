// Utility functions for color handling in the theme editor

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

  // Normalize short hex format (#fff -> #ffffff)
  let hexColor = normalizeHex(color);

  // Convert to RGB and calculate luminance
  const { r, g, b } = hexToRgb(hexColor);

  // Calculate luminance using the formula from WCAG 2.0
  // https://www.w3.org/TR/WCAG20-TECHS/G17.html
  const luminance = calculateLuminance(r, g, b);

  // Color is considered light if luminance is > 0.5
  return luminance > 0.5;
};

/**
 * Normalize hex color (#fff -> #ffffff)
 */
export const normalizeHex = (hex: string): string => {
  // Validate input
  if (!hex) {
    throw new Error("Color value cannot be empty");
  }
  
  // Remove # if present
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  
  // Check for valid hex format
  const isShortHex = /^[0-9A-F]{3}$/i.test(color);
  const isLongHex = /^[0-9A-F]{6}$/i.test(color);
  
  if (!isShortHex && !isLongHex) {
    throw new Error(`Invalid hex color format: ${hex}. Use #RGB or #RRGGBB format.`);
  }
  
  // Convert 3-digit hex to 6-digit
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  
  return `#${color}`;
};

/**
 * Calculate luminance according to WCAG standards
 */
export const calculateLuminance = (r: number, g: number, b: number): number => {
  // Convert RGB to relative luminance values
  const sRed = r / 255;
  const sGreen = g / 255;
  const sBlue = b / 255;
  
  // Apply gamma correction
  const rLinear = sRed <= 0.03928 ? sRed / 12.92 : Math.pow((sRed + 0.055) / 1.055, 2.4);
  const gLinear = sGreen <= 0.03928 ? sGreen / 12.92 : Math.pow((sGreen + 0.055) / 1.055, 2.4);
  const bLinear = sBlue <= 0.03928 ? sBlue / 12.92 : Math.pow((sBlue + 0.055) / 1.055, 2.4);
  
  // Calculate and return luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

/**
 * Converts hex color to RGB object
 */
export const hexToRgb = (hex: string): RGBColor => {
  const normalizedHex = normalizeHex(hex);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);
  
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
  // Ensure values are in the correct range
  const validR = Math.max(0, Math.min(255, Math.round(r)));
  const validG = Math.max(0, Math.min(255, Math.round(g)));
  const validB = Math.max(0, Math.min(255, Math.round(b)));
  
  return `#${((1 << 24) + (validR << 16) + (validG << 8) + validB).toString(16).slice(1)}`;
};

/**
 * Converts RGB to HSL
 */
export const rgbToHsl = ({ r, g, b }: RGBColor): HSLColor => {
  // Normalize RGB values
  const normR = r / 255;
  const normG = g / 255;
  const normB = b / 255;
  
  const max = Math.max(normR, normG, normB);
  const min = Math.min(normR, normG, normB);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case normR: h = (normG - normB) / d + (normG < normB ? 6 : 0); break;
      case normG: h = (normB - normR) / d + 2; break;
      case normB: h = (normR - normG) / d + 4; break;
    }
    
    h /= 6;
  }
  
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

/**
 * Converts HSL to RGB
 */
export const hslToRgb = ({ h, s, l }: HSLColor): RGBColor => {
  // Normalize HSL values
  const normH = h / 360;
  const normS = s / 100;
  const normL = l / 100;
  
  let r, g, b;
  
  if (normS === 0) {
    r = g = b = normL; // Grayscale
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = normL < 0.5 ? normL * (1 + normS) : normL + normS - normL * normS;
    const p = 2 * normL - q;
    
    r = hue2rgb(p, q, normH + 1/3);
    g = hue2rgb(p, q, normH);
    b = hue2rgb(p, q, normH - 1/3);
  }
  
  return { 
    r: Math.round(r * 255), 
    g: Math.round(g * 255), 
    b: Math.round(b * 255) 
  };
};

/**
 * Lightens a color by a specified amount
 */
export const lighten = (hex: string, amount: number): string => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  
  // For lighter colors, scale the lightening effect to prevent white-out
  // Base lightness ranges from 0-100, we need to adjust the amount accordingly
  const baseL = hsl.l / 100; // Convert to 0-1 scale
  
  // Calculate remaining lightness room and scale the amount
  const remainingRoom = 1 - baseL;
  const scaledAmount = amount * remainingRoom;
  
  // Apply the scaled lightening effect (0-100 scale)
  hsl.l = Math.min(100, hsl.l + Math.round(scaledAmount * 100));
  
  const newRgb = hslToRgb(hsl);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
};

/**
 * Darkens a color by a specified amount
 */
export const darken = (hex: string, amount: number): string => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  
  // For darker colors, scale the darkening effect to prevent black-out
  // Base lightness ranges from 0-100, we need to adjust the amount accordingly
  const baseL = hsl.l / 100; // Convert to 0-1 scale
  
  // Calculate available darkness and scale the amount
  const scaledAmount = amount * baseL;
  
  // Apply the scaled darkening effect (0-100 scale)
  hsl.l = Math.max(0, hsl.l - Math.round(scaledAmount * 100));
  
  const newRgb = hslToRgb(hsl);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
};

/**
 * Generates a full color palette from a single base color
 */
export const generateColorPalette = (baseColor: string): ColorPalette => {
  try {
    // Ensure we have a valid hex color
    const normalizedBase = normalizeHex(baseColor);
    
    // Get the lightness value to adjust the palette generation
    const hsl = rgbToHsl(hexToRgb(normalizedBase));
    const baseL = hsl.l / 100; // 0-1 scale
    
    // Adjust scaling factors based on base lightness
    // This creates better distribution for very light or dark colors
    const lightScalingFactor = Math.max(0.8, 1.2 - baseL);  // Higher for darker colors
    const darkScalingFactor = Math.max(0.8, 0.2 + baseL);   // Higher for lighter colors
    
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
  } catch (error) {
    console.error("Error generating color palette:", error);
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
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const luminance1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
  const luminance2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  // Ensure the lighter color is always divided by the darker one
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
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
