import { defaultTheme } from "@/hooks/useThemeValues";
import { usePaletteOperations } from "@/hooks/usePaletteOperations";
import { ColorSwatch, FontCombination, ThemePath, ThemeValues, ThemeValueType } from "@/types";
import { EventCategory, trackEvent } from "@/utils/analytics";
import { useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useReducer, useState, useCallback } from "react";
import { themeReducer } from "./ThemeReducer";

interface ThemeContextType {
  // Theme state
  themeValues: ThemeValues;
  setThemeValues: (theme: ThemeValues) => void;

  // Core theme management
  updateThemeValue: (path: ThemePath, value: ThemeValueType) => void;

  // Color management
  newColorName: string;
  setNewColorName: (name: string) => void;
  baseColor: string;
  setBaseColor: (color: string) => void;
  addNewColorPalette: (overwrite?: boolean) => void;
  updateColorPalette: (colorKey: string, newBaseColor: string) => void;
  updateColorValue: (colorCategory: string, shade: string, value: string) => void;
  renameColorPalette: (oldName: string, newName: string) => void;
  getColors: () => ColorSwatch[];

  // Typography management
  updateFont: (fontCategory: "heading" | "body" | "mono", fontFamily: string) => void;
  setFontCombination: (combination: FontCombination) => void;

  // UI state for theme preview
  themeString: string;
  setThemeString: (value: string) => void;
  showThemePreview: boolean;
  setShowThemePreview: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Core theme state using reducer
  const [themeValues, dispatch] = useReducer(themeReducer, defaultTheme);

  // UI state
  const [themeString, setThemeString] = useState("");
  const [showThemePreview, setShowThemePreview] = useState(false);

  // Color management state
  const [newColorName, setNewColorName] = useState("");
  const [baseColor, setBaseColor] = useState("#3182CE"); // Default blue color

  const toast = useToast();

  // Wrapper function to set the entire theme
  const setThemeValues = (theme: ThemeValues) => {
    dispatch({ type: "SET_THEME_VALUES", payload: theme });
  };

  // Update a specific theme value
  const updateThemeValue = (path: ThemePath, value: ThemeValueType) => {
    dispatch({ type: "UPDATE_THEME_VALUE", path, value });
  };

  // Initialize palette operations hook
  const paletteOps = usePaletteOperations({
    themeValues,
    setThemeValues: (theme: ThemeValues) => dispatch({ type: "SET_THEME_VALUES", payload: theme }),
  });

  // Add a new color palette from manual color picker
  const addNewColorPalette = useCallback(
    (overwrite = false) => {
      if (paletteOps.createPalette(newColorName, baseColor, overwrite)) {
        // Reset input only on success
        setNewColorName("");
      }
    },
    [paletteOps, newColorName, baseColor]
  );

  // Update an existing color palette with a new base color
  const updateColorPalette = useCallback(
    (colorKey: string, newBaseColor: string) => {
      paletteOps.updatePalette(colorKey, newBaseColor);
    },
    [paletteOps]
  );

  // Update a specific color value
  const updateColorValue = useCallback(
    (colorCategory: string, shade: string, value: string) => {
      dispatch({
        type: "UPDATE_COLOR_VALUE",
        colorCategory,
        shade,
        value,
      });

      // Track the event
      trackEvent(EventCategory.COLOR, "update_color", `${colorCategory}.${shade}`);
    },
    [dispatch]
  );

  // Rename a color palette
  const renameColorPalette = useCallback(
    (oldName: string, newName: string) => {
      paletteOps.renamePalette(oldName, newName);
    },
    [paletteOps]
  );

  // Extract colors from the theme
  const getColors = () => {
    const colors = themeValues.colors || {};
    return Object.keys(colors).map(colorKey => {
      const colorShades = typeof colors[colorKey] === "object" ? colors[colorKey] : {};
      return { colorKey, colorShades };
    });
  };

  // Typography management
  const updateFont = (fontCategory: "heading" | "body" | "mono", fontFamily: string) => {
    dispatch({
      type: "UPDATE_FONT",
      fontCategory,
      fontFamily,
    });

    // Track the event
    trackEvent(EventCategory.TYPOGRAPHY, "update_font", `${fontCategory}: ${fontFamily}`);

    toast({
      title: `Updated ${fontCategory} font to ${fontFamily}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const setFontCombination = (combination: FontCombination) => {
    dispatch({
      type: "SET_FONT_COMBINATION",
      combination,
    });

    // Track the event
    trackEvent(EventCategory.TYPOGRAPHY, "set_font_combination", combination.name);

    toast({
      title: `Applied font combination: ${combination.name}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const contextValue: ThemeContextType = {
    themeValues,
    setThemeValues,
    updateThemeValue,
    newColorName,
    setNewColorName,
    baseColor,
    setBaseColor,
    addNewColorPalette,
    updateColorPalette,
    updateColorValue,
    renameColorPalette,
    getColors,
    updateFont,
    setFontCombination,
    themeString,
    setThemeString,
    showThemePreview,
    setShowThemePreview,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
