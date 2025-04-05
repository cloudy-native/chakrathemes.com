import { ThemePath, ThemeValueType, ThemeValues } from "@/types";

/**
 * Updates a deeply nested property in a theme object
 * @param theme Original theme object
 * @param path Path to the property as an array of keys
 * @param value New value to set
 * @returns A new theme object with the updated property
 */
export const updateThemeProperty = (
  theme: ThemeValues,
  path: ThemePath,
  value: ThemeValueType
): ThemeValues => {
  // Create a deep clone to avoid mutating the original
  const newTheme = JSON.parse(JSON.stringify(theme));
  let current: Record<string, unknown> = newTheme;

  // Navigate to the nested property
  for (let i = 0; i < path.length - 1; i++) {
    if (!(path[i] in current) || !current[path[i]]) {
      current[path[i]] = {};
    }
    current = current[path[i]] as Record<string, unknown>;
  }

  // Set the value at the final path
  current[path[path.length - 1]] = value;
  return newTheme;
};

/**
 * Gets a value from a deeply nested property in a theme object
 * @param theme Theme object
 * @param path Path to the property as an array of keys
 * @param defaultValue Default value to return if path doesn't exist
 * @returns The value at the specified path or the default value
 */
export const getThemeProperty = <T>(theme: ThemeValues, path: ThemePath, defaultValue: T): T => {
  let current: Record<string, unknown> = theme as unknown as Record<string, unknown>;

  // Navigate through the path
  for (let i = 0; i < path.length; i++) {
    if (current === undefined || current === null || !(path[i] in current)) {
      return defaultValue;
    }
    current = current[path[i]] as Record<string, unknown>;
  }

  return current as unknown as T;
};

/**
 * Merges two theme objects together
 * @param base Base theme object
 * @param override Theme object with properties to override
 * @returns A new merged theme object
 */
export const mergeThemes = (base: ThemeValues, override: Partial<ThemeValues>): ThemeValues => {
  return {
    ...JSON.parse(JSON.stringify(base)),
    ...JSON.parse(JSON.stringify(override)),
  };
};

/**
 * Adds or updates a color palette in a theme
 * @param theme Current theme object
 * @param name Name of the palette to add or update
 * @param palette Color palette object
 * @returns Updated theme with the new palette
 */
/**
 * Create a deep clone of a theme object
 * @param theme Theme to clone
 * @returns A new deep copy of the theme
 */
export const cloneTheme = <T extends object>(theme: T): T => {
  return JSON.parse(JSON.stringify(theme));
};

/**
 * Adds or updates a color palette in a theme
 * @param theme Current theme object
 * @param name Name of the palette to add or update
 * @param palette Color palette object
 * @returns Updated theme with the new palette
 */
export const addPaletteToTheme = (
  theme: ThemeValues,
  name: string,
  palette: Record<string, string>
): ThemeValues => {
  // Create a deep clone to avoid mutating the original
  const newTheme = cloneTheme(theme);

  // Initialize colors object if it doesn't exist
  if (!newTheme.colors) {
    newTheme.colors = {};
  }

  // Add the palette
  newTheme.colors[name] = palette;

  return newTheme;
};

/**
 * Renames a color palette in a theme
 * @param theme Current theme object
 * @param oldName The current name of the palette
 * @param newName The new name for the palette
 * @returns Updated theme with the renamed palette, or original if oldName doesn't exist
 */
export const renamePaletteInTheme = (
  theme: ThemeValues,
  oldName: string,
  newName: string
): ThemeValues => {
  if (oldName === newName || !theme.colors || !theme.colors[oldName]) {
    return theme;
  }

  const newTheme = cloneTheme(theme);
  const newColors = { ...newTheme.colors };

  // Copy palette to new name
  newColors[newName] = { ...newColors[oldName] };

  // Remove old name
  delete newColors[oldName];

  // Update the theme
  newTheme.colors = newColors;

  return newTheme;
};

/**
 * Removes a color palette from a theme
 * @param theme Current theme object
 * @param paletteName Name of the palette to remove
 * @returns Updated theme with the palette removed
 */
export const removePaletteFromTheme = (theme: ThemeValues, paletteName: string): ThemeValues => {
  if (!theme.colors || !theme.colors[paletteName]) {
    return theme;
  }

  const newTheme = cloneTheme(theme);
  const { [paletteName]: _, ...remainingColors } = newTheme.colors;
  newTheme.colors = remainingColors;

  return newTheme;
};
