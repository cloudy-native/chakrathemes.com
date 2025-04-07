import { ThemeValues } from "@/types";
import { trackPaletteAction } from "@/utils/analytics";
import { generateColorPalette } from "@/utils/colorUtils";
import { showError, showSuccess } from "@/utils/notificationUtils";
import {
  addNewPalette,
  deletePalette,
  formatPaletteName,
  renamePalette,
} from "@/utils/paletteUtils";
import { addPaletteToTheme } from "@/utils/themeUtils";
import { useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";

export interface PaletteOperationsHookProps {
  /**
   * Current theme values
   */
  themeValues: ThemeValues;

  /**
   * Function to update the theme values
   */
  setThemeValues: (theme: ThemeValues) => void;
}

/**
 * Interface for palette management state
 */
export interface PaletteState {
  /**
   * Current palette name being edited
   */
  paletteName: string;

  /**
   * Current base color for new palette generation
   */
  baseColor: string;
}

/**
 * Interface representing all palette operations
 */
export interface PaletteOperations {
  /**
   * Current palette name for new palette creation
   */
  paletteName: string;

  /**
   * Set the palette name for new palette creation
   */
  setPaletteName: (name: string) => void;

  /**
   * Current base color for new palette generation
   */
  baseColor: string;

  /**
   * Set the base color for new palette generation
   */
  setBaseColor: (color: string) => void;

  /**
   * Check if a palette name is available
   * @param name Palette name to check
   * @returns True if the name is available, false otherwise
   */
  isPaletteNameAvailable: (name: string) => boolean;

  /**
   * Format a palette name according to naming conventions
   * @param name Raw palette name
   * @returns Formatted palette name
   */
  formatPaletteName: (name: string) => string;

  /**
   * Create a new palette with validation, notification, and tracking
   * @param name Palette name
   * @param color Base color
   * @param overwrite Whether to overwrite an existing palette
   * @returns True if successful, false otherwise
   */
  createPalette: (name: string, color: string, overwrite?: boolean) => boolean;

  /**
   * Update an existing palette with a new base color
   * @param name Palette name
   * @param color New base color
   * @returns True if successful, false otherwise
   */
  updatePalette: (name: string, color: string) => boolean;

  /**
   * Rename an existing palette
   * @param oldName Current palette name
   * @param newName New palette name
   * @returns True if successful, false otherwise
   */
  renamePalette: (oldName: string, newName: string) => boolean;

  /**
   * Delete an existing palette
   * @param name Palette name to delete
   * @returns True if successful, false otherwise
   */
  deletePalette: (name: string) => boolean;

  /**
   * Check if a palette exists in the theme
   * @param name Palette name to check
   * @returns True if the palette exists, false otherwise
   */
  paletteExists: (name: string) => boolean;

  /**
   * Reset the palette name and base color to defaults
   */
  resetPaletteState: () => void;
}

/**
 * Hook for centralized palette operations
 *
 * Provides a comprehensive API for managing theme palettes with consistent
 * validation, notifications, error handling, and analytics tracking.
 */
export const usePaletteOperations = ({
  themeValues,
  setThemeValues,
}: PaletteOperationsHookProps): PaletteOperations => {
  // State for new palette creation
  const [paletteName, setPaletteName] = useState("");
  const [baseColor, setBaseColor] = useState("#3182CE"); // Default blue color

  // Toast for notifications
  const toast = useToast();

  /**
   * Check if a palette name is available in the theme
   */
  const checkPaletteNameAvailable = useCallback(
    (name: string): boolean => {
      const formattedName = formatPaletteName(name);

      // Empty name is not valid
      if (!formattedName) return false;

      // Check if name exists in theme colors
      const existingColors = themeValues.colors || {};
      return !existingColors[formattedName];
    },
    [themeValues.colors]
  );

  /**
   * Check if a palette exists in the theme
   */
  const paletteExists = useCallback(
    (name: string): boolean => {
      const existingColors = themeValues.colors || {};
      return !!existingColors[name];
    },
    [themeValues.colors]
  );

  /**
   * Reset palette creation state
   */
  const resetPaletteState = useCallback(() => {
    setPaletteName("");
    setBaseColor("#3182CE");
  }, []);

  /**
   * Create a new palette with validation
   */
  const createPalette = useCallback(
    (name: string, color: string, overwrite = false): boolean => {
      try {
        // Use the utility function for creating a new palette
        const result = addNewPalette(name, color, themeValues, toast, overwrite);

        if (result.success && result.updatedTheme) {
          // Update theme and reset state
          setThemeValues(result.updatedTheme);
          return true;
        }

        return false;
      } catch (error) {
        // Handle unexpected errors
        console.error("Error creating palette:", error);
        showError(
          toast,
          "Error creating palette",
          error instanceof Error ? error.message : "An unexpected error occurred"
        );
        return false;
      }
    },
    [themeValues, setThemeValues, toast]
  );

  /**
   * Update an existing palette with a new base color
   */
  const updatePalette = useCallback(
    (name: string, color: string): boolean => {
      try {
        // Validate the palette exists
        if (!paletteExists(name)) {
          showError(toast, "Palette not found", `The palette "${name}" does not exist`);
          return false;
        }

        // Generate the new palette
        const palette = generateColorPalette(color);

        // Update the theme
        const updatedTheme = addPaletteToTheme(themeValues, name, palette);
        setThemeValues(updatedTheme);

        // Track and notify
        trackPaletteAction("update", name);
        showSuccess(toast, `Updated palette: ${name}`);

        return true;
      } catch (error) {
        console.error("Error updating palette:", error);
        showError(
          toast,
          "Error updating palette",
          error instanceof Error ? error.message : "An unexpected error occurred"
        );
        return false;
      }
    },
    [themeValues, setThemeValues, toast, paletteExists]
  );

  /**
   * Rename an existing palette
   */
  const renamePaletteOperation = useCallback(
    (oldName: string, newName: string): boolean => {
      try {
        // Use the utility function for renaming a palette
        const result = renamePalette(oldName, newName, themeValues, toast);

        if (result.success && result.updatedTheme) {
          // Update theme
          setThemeValues(result.updatedTheme);
          return true;
        }

        return false;
      } catch (error) {
        console.error("Error renaming palette:", error);
        showError(
          toast,
          "Error renaming palette",
          error instanceof Error ? error.message : "An unexpected error occurred"
        );
        return false;
      }
    },
    [themeValues, setThemeValues, toast]
  );

  /**
   * Delete an existing palette
   */
  const deletePaletteOperation = useCallback(
    (name: string): boolean => {
      try {
        // Use the utility function for deleting a palette
        const result = deletePalette(name, themeValues, toast);

        if (result.success && result.updatedTheme) {
          // Update theme
          setThemeValues(result.updatedTheme);
          return true;
        }

        return false;
      } catch (error) {
        console.error("Error deleting palette:", error);
        showError(
          toast,
          "Error deleting palette",
          error instanceof Error ? error.message : "An unexpected error occurred"
        );
        return false;
      }
    },
    [themeValues, setThemeValues, toast]
  );

  return {
    // State
    paletteName,
    setPaletteName,
    baseColor,
    setBaseColor,

    // Validation helpers
    isPaletteNameAvailable: checkPaletteNameAvailable,
    formatPaletteName,
    paletteExists,

    // Operations
    createPalette,
    updatePalette,
    renamePalette: renamePaletteOperation,
    deletePalette: deletePaletteOperation,
    resetPaletteState,
  };
};

export default usePaletteOperations;
