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

// Theme context action types
export type ThemeAction =
  | { type: "SET_THEME_VALUES"; payload: ThemeValues }
  | { type: "UPDATE_THEME_VALUE"; path: ThemePath; value: ThemeValueType }
  | { type: "ADD_COLOR_PALETTE"; name: string; baseColor: string }
  | { type: "UPDATE_COLOR_PALETTE"; colorKey: string; newBaseColor: string }
  | { type: "UPDATE_COLOR_VALUE"; colorCategory: string; shade: string; value: string };
