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
  let current: Record<string, any> = newTheme;

  // Navigate to the nested property
  for (let i = 0; i < path.length - 1; i++) {
    if (!current[path[i]]) {
      current[path[i]] = {};
    }
    current = current[path[i]];
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
  let current: any = theme;

  // Navigate through the path
  for (let i = 0; i < path.length; i++) {
    if (current === undefined || current === null || !current[path[i]]) {
      return defaultValue;
    }
    current = current[path[i]];
  }

  return current as T;
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
