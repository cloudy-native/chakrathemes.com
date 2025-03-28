import React, { createContext, useContext, useReducer, useState } from "react";
import { ThemeValues, ThemePath, ThemeValueType, ColorSwatch, ThemeAction } from "@/types";
import { defaultTheme } from "@/hooks/useThemeValues";
import { useToast } from "@chakra-ui/react";
import { themeReducer } from "./ThemeReducer";
import { EventCategory, trackEvent } from "@/utils/analytics";

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

  // Add a new color palette from manual color picker
  const addNewColorPalette = (overwrite = false) => {
    if (!newColorName) {
      toast({
        title: "Color name is required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const colorName = newColorName.trim().toLowerCase().replace(/\s+/g, "-");
    
    // Check if a palette with this name already exists
    const existingColors = themeValues.colors || {};
    if (existingColors[colorName] && !overwrite) {
      // If we're not in overwrite mode, this should be handled by the AddPaletteModal component
      return;
    }

    // Dispatch the action
    dispatch({ type: "ADD_COLOR_PALETTE", name: colorName, baseColor });

    // Reset inputs
    setNewColorName("");

    // Track the event
    const eventAction = overwrite ? "overwrite_palette" : "add_palette";
    trackEvent(EventCategory.COLOR, eventAction, colorName);

    toast({
      title: overwrite 
        ? `Overwrote existing palette: ${colorName}` 
        : `Added color palette: ${colorName}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Update an existing color palette with a new base color
  const updateColorPalette = (colorKey: string, newBaseColor: string) => {
    // Dispatch the action
    dispatch({ type: "UPDATE_COLOR_PALETTE", colorKey, newBaseColor });

    // Track the event
    trackEvent(EventCategory.COLOR, "update_palette", colorKey);

    toast({
      title: `Updated color palette: ${colorKey}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Update a specific color value
  const updateColorValue = (colorCategory: string, shade: string, value: string) => {
    dispatch({
      type: "UPDATE_COLOR_VALUE",
      colorCategory,
      shade,
      value,
    });

    // Track the event
    trackEvent(EventCategory.COLOR, "update_color", `${colorCategory}.${shade}`);
  };
  
  // Rename a color palette
  const renameColorPalette = (oldName: string, newName: string) => {
    if (!newName.trim()) {
      toast({
        title: "Palette name is required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    
    const formattedNewName = newName.trim().toLowerCase().replace(/\s+/g, "-");
    
    // Check if the new name already exists
    const existingColors = themeValues.colors || {};
    if (existingColors[formattedNewName] && oldName !== formattedNewName) {
      toast({
        title: `Palette name "${formattedNewName}" already exists`,
        description: "Please choose a different name",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Dispatch the action
    dispatch({ type: "RENAME_COLOR_PALETTE", oldName, newName: formattedNewName });
    
    // Track the event
    trackEvent(EventCategory.COLOR, "rename_palette", `${oldName} to ${formattedNewName}`);
    
    toast({
      title: `Renamed palette: ${oldName} → ${formattedNewName}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Extract colors from the theme
  const getColors = () => {
    const colors = themeValues.colors || {};
    return Object.keys(colors).map(colorKey => {
      const colorShades = typeof colors[colorKey] === "object" ? colors[colorKey] : {};
      return { colorKey, colorShades };
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
