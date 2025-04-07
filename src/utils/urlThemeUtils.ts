import { defaultTheme } from "@/hooks/useThemeValues";
import { ThemeValues } from "@/types";
import { generateColorPalette } from "./colorUtils";

/**
 * Generates a URL query string from a theme object with custom palette names
 */
export const themeToUrlParams = (theme: ThemeValues): string => {
  const { colors, fonts } = theme;

  // Get all user-defined color palettes with their base colors (typically shade 500)
  const colorParams = Object.entries(colors || {})
    .map(([name, shades]) => {
      // Get the base color (usually 500) or fallback to first available shade
      const baseColor = shades[500] || Object.values(shades)[0];
      if (baseColor) {
        return `${encodeURIComponent(name)}:${baseColor.replace("#", "")}`;
      }
      return null;
    })
    .filter((entry): entry is string => entry !== null) // TypeScript type guard to remove nulls
    .join(",");

  // Add fonts if set - extract only first font from comma-separated lists
  // Extract the first font from a comma-separated list and clean it
  const getFirstFont = (fontStr?: string): string | undefined => {
    if (!fontStr) return undefined;
    // Split by comma, take first one, and trim whitespace
    return fontStr.split(",")[0].trim();
  };

  const headingFont = getFirstFont(fonts?.heading);
  const bodyFont = getFirstFont(fonts?.body);
  const monoFont = getFirstFont(fonts?.mono);

  // Build the font parameter string
  let fontParam = "";

  // Helper function to encode font safely
  const encodeFontSafely = (font?: string) => (font ? encodeURIComponent(font) : "");

  // Create font string parts - empty string for missing fonts
  const parts = [
    encodeFontSafely(headingFont),
    encodeFontSafely(bodyFont),
    encodeFontSafely(monoFont),
  ];

  // Remove trailing empty parts to keep the URL clean
  while (parts.length > 0 && parts[parts.length - 1] === "") {
    parts.pop();
  }

  // Only add the font parameter if we have at least one font
  if (parts.some(part => part !== "")) {
    fontParam = `&f=${parts.join(",")}`;
  }

  // Create query string
  const queryParts = [];
  if (colorParams) queryParts.push(`colors=${colorParams}`);
  if (fontParam) queryParts.push(fontParam.substring(1)); // Remove leading '&'

  return queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
};

/**
 * Parses URL query parameters into a theme object
 */
export const urlParamsToTheme = (
  queryParams: Record<string, string | string[] | undefined>
): ThemeValues => {
  // Start with a copy of the default theme structure with required objects
  const newTheme: ThemeValues = {
    ...defaultTheme,
    colors: { ...(defaultTheme.colors || {}) },
    fonts: {
      heading: defaultTheme.fonts?.heading || "",
      body: defaultTheme.fonts?.body || "",
      mono: defaultTheme.fonts?.mono || "",
    },
    config: { ...(defaultTheme.config || {}) },
  };

  // Process colors parameter
  const colorParam = queryParams.colors;
  if (colorParam && typeof colorParam === "string" && colorParam.trim() !== "") {
    // Process each color palette
    const colorPairs = colorParam.split(",");
    for (const pair of colorPairs) {
      const parts = pair.split(":");
      if (parts.length !== 2) continue;
      const [name, hexColor] = parts;
      if (!name || !hexColor) continue;
      try {
        // Generate the full palette from the base color
        const fullPalette = generateColorPalette(`#${hexColor}`);
        // Add it to the theme with the original name
        const decodedName = decodeURIComponent(name);
        newTheme.colors[decodedName] = fullPalette;
      } catch (error) {
        console.error(`Failed to generate palette for ${name}:${hexColor}`, error);
      }
    }
  }

  // Process font parameter
  const fontParam = queryParams.f;
  if (fontParam && typeof fontParam === "string") {
    const fontParts = fontParam.split(",");
    // Map font parts to heading, body, mono
    const [heading, body, mono] = fontParts.map(font =>
      font ? decodeURIComponent(font) : undefined
    );

    // Apply fonts only if they exist (fonts object is guaranteed to exist from our initialization)
    if (heading) newTheme.fonts!.heading = heading;
    if (body) newTheme.fonts!.body = body;
    if (mono) newTheme.fonts!.mono = mono;
  }

  return newTheme;
};

/**
 * Creates a shareable URL for the current theme
 */
export const generateShareableUrl = (theme: ThemeValues, baseUrl?: string): string => {
  const urlParams = themeToUrlParams(theme);
  const base = baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}${urlParams}`; // Removed the extra slash between base and params
};
