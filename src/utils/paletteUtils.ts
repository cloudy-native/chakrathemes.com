import { isPaletteNameAvailable } from "./colorUtils";
import { addPaletteToTheme, removePaletteFromTheme, renamePaletteInTheme } from "./themeUtils";
import { generateColorPalette } from "./colorUtils";
import { trackPaletteAction } from "./analytics";
import { ThemeValues } from "@/types";
import { showSuccess, showError } from "./notificationUtils";

/**
 * Format a color name according to palette naming conventions
 * Converts spaces to hyphens, lowercases, and removes special characters
 *
 * @param name Raw palette name input
 * @returns Formatted palette name
 */
export const formatPaletteName = (name: string): string => {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
};

/**
 * Add a new palette to the theme with proper validation, tracking, and notifications
 *
 * @param paletteName The name for the new palette
 * @param baseColor The base color for generating the palette
 * @param themeValues Current theme values
 * @param toast Chakra toast function
 * @param overwrite Whether to overwrite an existing palette with the same name
 * @returns Object containing success flag and updated theme (if successful)
 */
export const addNewPalette = (
  paletteName: string,
  baseColor: string,
  themeValues: ThemeValues,
  toast: any,
  overwrite = false
): { success: boolean; updatedTheme?: ThemeValues } => {
  // Validate palette name
  if (!paletteName.trim()) {
    showError(toast, "Palette name required", "Please provide a name for the palette");
    return { success: false };
  }

  // Format the palette name
  const formattedName = formatPaletteName(paletteName);

  // Check if the palette name is available (unless overwriting)
  if (!overwrite && !isPaletteNameAvailable(formattedName, themeValues.colors, toast)) {
    return { success: false };
  }

  // Generate the palette
  const palette = generateColorPalette(baseColor);

  // Add to theme
  const updatedTheme = addPaletteToTheme(themeValues, formattedName, palette);

  // Track the action
  trackPaletteAction(overwrite ? "overwrite" : "add", formattedName);

  // Show success notification
  showSuccess(
    toast,
    overwrite ? `Updated palette: ${formattedName}` : `Added palette: ${formattedName}`
  );

  return { success: true, updatedTheme };
};

/**
 * Rename a palette with proper validation, tracking, and notifications
 *
 * @param oldName Current palette name
 * @param newName New palette name
 * @param themeValues Current theme values
 * @param toast Chakra toast function
 * @returns Object containing success flag and updated theme (if successful)
 */
export const renamePalette = (
  oldName: string,
  newName: string,
  themeValues: ThemeValues,
  toast: any
): { success: boolean; updatedTheme?: ThemeValues } => {
  // Validate new name
  if (!newName.trim()) {
    showError(toast, "Palette name required", "Please provide a new name for the palette");
    return { success: false };
  }

  // Format the new name
  const formattedNewName = formatPaletteName(newName);

  // Check for no change case
  if (oldName === formattedNewName) {
    return { success: false };
  }

  // Check if the new name is available (unless it's the same as the old name)
  if (oldName !== formattedNewName && themeValues.colors && themeValues.colors[formattedNewName]) {
    showError(
      toast,
      `Palette "${formattedNewName}" already exists`,
      "Please choose a different name"
    );
    return { success: false };
  }

  // Rename the palette
  const updatedTheme = renamePaletteInTheme(themeValues, oldName, formattedNewName);

  // Track the action
  trackPaletteAction("rename", oldName, formattedNewName);

  // Show success notification
  showSuccess(toast, `Renamed palette: ${oldName} → ${formattedNewName}`);

  return { success: true, updatedTheme };
};

/**
 * Delete a palette with proper validation, tracking, and notifications
 *
 * @param paletteName Name of palette to delete
 * @param themeValues Current theme values
 * @param toast Chakra toast function
 * @returns Object containing success flag and updated theme (if successful)
 */
export const deletePalette = (
  paletteName: string,
  themeValues: ThemeValues,
  toast: any
): { success: boolean; updatedTheme?: ThemeValues } => {
  // Validate palette exists
  if (!themeValues.colors || !themeValues.colors[paletteName]) {
    showError(toast, "Palette not found", `The palette ${paletteName} does not exist`);
    return { success: false };
  }

  // Remove the palette
  const updatedTheme = removePaletteFromTheme(themeValues, paletteName);

  // Track the action
  trackPaletteAction("delete", paletteName);

  // Show success notification
  showSuccess(toast, `Deleted palette: ${paletteName}`);

  return { success: true, updatedTheme };
};
