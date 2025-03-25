import { ThemeAction, ThemeValues } from "@/types";
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

    case "UPDATE_COLOR_VALUE": {
      // Update a specific color value
      return updateThemeProperty(
        state,
        ["colors", action.colorCategory, action.shade],
        action.value
      );
    }

    default:
      return state;
  }
};