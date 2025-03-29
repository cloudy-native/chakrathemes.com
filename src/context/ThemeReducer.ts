import { FontCombination, ThemeAction, ThemeValues } from "@/types";
import { generateColorPalette } from "@/utils/colorUtils";
import { updateThemeProperty } from "@/utils/themeUtils";

/**
 * Reducer for theme state management
 */
export const themeReducer = (state: ThemeValues, action: ThemeAction): ThemeValues => {
  switch (action.type) {
    case "SET_THEME_VALUES":
      return action.payload;

    case "UPDATE_THEME_VALUE":
      return updateThemeProperty(state, action.path, action.value);

    case "ADD_COLOR_PALETTE": {
      // Format the color name
      const colorName = action.name.trim().toLowerCase().replace(/\s+/g, "-");

      // Generate the palette from the base color
      const palette = generateColorPalette(action.baseColor);

      // Create a new state with the added palette
      const newState = { ...state };
      if (!newState.colors) {
        newState.colors = {};
      }
      newState.colors[colorName] = palette;

      return newState;
    }

    case "UPDATE_COLOR_PALETTE": {
      // Generate the new palette
      const palette = generateColorPalette(action.newBaseColor);

      // Create a new state with the updated palette
      const newState = { ...state };
      if (!newState.colors) {
        newState.colors = {};
      }
      newState.colors[action.colorKey] = palette;

      return newState;
    }

    case "RENAME_COLOR_PALETTE": {
      // Get the formatted names
      const oldName = action.oldName.trim().toLowerCase();
      const newName = action.newName.trim().toLowerCase().replace(/\s+/g, "-");

      // If names are the same or old palette doesn't exist, return unchanged state
      if (oldName === newName || !state.colors || !state.colors[oldName]) {
        return state;
      }

      // Create a new state with renamed palette
      const newState = { ...state };
      const newColors = { ...newState.colors };

      // Copy the palette data from old name to new name
      newColors[newName] = { ...newColors[oldName] };

      // Remove the old palette
      delete newColors[oldName];

      // Update the state
      newState.colors = newColors;

      return newState;
    }

    case "UPDATE_COLOR_VALUE": {
      // Update a specific color value
      return updateThemeProperty(
        state,
        ["colors", action.colorCategory, action.shade],
        action.value
      );
    }

    case "UPDATE_FONT": {
      // Create a new state with updated font
      const newState = { ...state };
      if (!newState.fonts) {
        newState.fonts = {};
      }
      newState.fonts[action.fontCategory] = action.fontFamily;
      return newState;
    }

    case "SET_FONT_COMBINATION": {
      // Create a new state with the font combination
      const newState = { ...state };
      if (!newState.fonts) {
        newState.fonts = {};
      }

      const combination: FontCombination = action.combination;
      newState.fonts.heading = combination.heading;
      newState.fonts.body = combination.body;
      newState.fonts.mono = combination.mono;

      return newState;
    }

    default:
      return state;
  }
};
