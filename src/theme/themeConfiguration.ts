export type ColorPair = {
  light: string;
  dark: string;
};

// Background Colors
export const panelBackground: ColorPair = {
  light: "background.50",
  dark: "background.900",
};

// Consolidated gray.50/gray.700 backgrounds
export const backgroundLight: ColorPair = {
  light: "gray.50",
  dark: "gray.700",
};

// We'll use this for backgroundCode as well
export const backgroundCode = backgroundLight;

// Consolidated gray.100 backgrounds
export const backgroundMedium: ColorPair = {
  light: "gray.100",
  dark: "gray.800",
};

// Border Colors
export const borderLight: ColorPair = {
  light: "gray.200",
  dark: "gray.600",
};

export const emptyStateBorder = borderLight;

export const borderHighlight: ColorPair = {
  light: "blue.400",
  dark: "blue.400",
};

// Text Colors
export const textPrimary: ColorPair = {
  light: "gray.900",
  dark: "gray.100",
};

// Same value for both modes
export const textMuted: ColorPair = {
  light: "gray.500",
  dark: "gray.500",
};

export const textSecondary: ColorPair = {
  light: "gray.600",
  dark: "gray.400",
};

export const textHeading: ColorPair = {
  light: "gray.800",
  dark: "white",
};

// Icon Colors
export const iconMuted = textMuted;

export const iconAccent: ColorPair = {
  light: "accent.500",
  dark: "accent.300",
};

export const iconSecondary: ColorPair = {
  light: "secondary.600",
  dark: "secondary.400",
};

// Special Colors
export const linkDefault: ColorPair = {
  light: "blue.500",
  dark: "blue.500",
};

export const accentColor: ColorPair = {
  light: "accent.600",
  dark: "accent.300",
};

export const errorColor: ColorPair = {
  light: "red.500", // Same as accentColor
  dark: "red.300",
};

// Primary/Accent Background Colors
export const primaryBackground: ColorPair = {
  light: "primary.100",
  dark: "primary.800",
};

// Consolidated primary accent colors
export const primaryAccent: ColorPair = {
  light: "primary.500",
  dark: "primary.500",
};

export const accentLight: ColorPair = {
  light: "accent.50",
  dark: "accent.900",
};

// Status colors for success, error, warning states
export const successColor: ColorPair = {
  light: "green.500",
  dark: "green.300",
};

export const successBackground: ColorPair = {
  light: "green.100",
  dark: "green.800",
};

export const errorBackground: ColorPair = {
  light: "red.100",
  dark: "red.800",
};

// Feature and Section Colors
export const featureHeading: ColorPair = {
  light: "secondary.500",
  dark: "secondary.300",
};

// Card Background Colors (all follow same pattern)
export const blueCardBackground: ColorPair = {
  light: "blue.50",
  dark: "blue.900",
};

export const greenCardBackground: ColorPair = {
  light: "green.50",
  dark: "green.900",
};

export const redCardBackground: ColorPair = {
  light: "red.50",
  dark: "red.900",
};

export const purpleCardBackground: ColorPair = {
  light: "purple.50",
  dark: "purple.900",
};

// UI Element Colors
export const tooltipBackground: ColorPair = {
  light: "gray.700",
  dark: "gray.700", // Same value for both modes
};
