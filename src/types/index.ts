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
  fonts: {
    [key: string]: string;
  };
  fontSizes: {
    [key: string]: string;
  };
  fontWeights: {
    [key: string]: number;
  };
  space: {
    [key: string]: string;
  };
  radii: {
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

export interface GoogleFont {
  family: string;
  variants: string[];
  category: string;
}

export interface GoogleFontsResponse {
  items: GoogleFont[];
}