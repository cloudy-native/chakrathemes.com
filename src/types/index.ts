// Common type definitions for the theme editor

export interface ThemeValues {
  config: {
    initialColorMode: string;
    useSystemColorMode: boolean;
  };
  colors: {
    [key: string]: {
      [key: string]: string;
    };
  };
  space: {
    [key: string]: string;
  };
  radii: {
    [key: string]: string;
  };
  shadows: {
    [key: string]: string;
  };
  letterSpacings?: {
    [key: string]: string;
  };
  lineHeights?: {
    [key: string]: string | number;
  };
  fonts?: {
    heading?: string;
    body?: string;
    mono?: string;
  };
  fontWeights?: {
    hairline?: number;
    thin?: number;
    light?: number;
    normal?: number;
    medium?: number;
    semibold?: number;
    bold?: number;
    extrabold?: number;
    black?: number;
  };
  fontSizes?: {
    [key: string]: string;
  };
}

export interface ColorSwatch {
  colorKey: string;
  colorShades: { [key: string]: string };
}

export interface ExtractedColor {
  name: string;
  color: string;
}

export interface ColorManagementState {
  newColorName: string;
  baseColor: string;
}

// Theme path and update types
export type ThemePath = string[];
export type ThemeValueType = string | number | boolean | Record<string, unknown>;

// Event tracking types
export interface TrackingEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// Color utility types
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface ColorShade {
  shade: string;
  value: string;
}

export type ColorPalette = Record<string, string>;

// Typography types
export interface GoogleFont {
  family: string;
  category: string;
  variants: string[];
}

export interface FontCombination {
  name: string;
  description: string;
  heading: string;
  body: string;
  mono: string;
}

export interface FontCategory {
  name: string;
  description: string;
  combinations: FontCombination[];
}

// Theme context action types
export type ThemeAction =
  | { type: "SET_THEME_VALUES"; payload: ThemeValues }
  | { type: "UPDATE_THEME_VALUE"; path: ThemePath; value: ThemeValueType }
  | { type: "ADD_COLOR_PALETTE"; name: string; baseColor: string }
  | { type: "UPDATE_COLOR_PALETTE"; colorKey: string; newBaseColor: string }
  | { type: "UPDATE_COLOR_VALUE"; colorCategory: string; shade: string; value: string }
  | { type: "RENAME_COLOR_PALETTE"; oldName: string; newName: string }
  | { type: "UPDATE_FONT"; fontCategory: "heading" | "body" | "mono"; fontFamily: string }
  | { type: "SET_FONT_COMBINATION"; combination: FontCombination };

/**
 * Interface for AI-generated theme data
 */
export interface AITheme {
  heading: string;
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

// Export all modal-related types
export * from "./modals";
