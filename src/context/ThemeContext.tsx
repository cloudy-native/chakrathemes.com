import React, { createContext, useContext, useState } from "react";
import { ThemeValues } from "@/types";
import { defaultTheme } from "@/hooks/useThemeValues";
import { generateColorPalette } from "@/utils/colorUtils";
import { useToast } from "@chakra-ui/react";

interface ThemeContextType {
  // Theme state
  themeValues: ThemeValues;
  setThemeValues: React.Dispatch<React.SetStateAction<ThemeValues>>;

  // Core theme management
  updateThemeValue: (path: string[], value: any) => void;

  // Color management
  newColorName: string;
  setNewColorName: (name: string) => void;
  baseColor: string;
  setBaseColor: (color: string) => void;
  addNewColorPalette: () => void;
  updateColorPalette: (colorKey: string, newBaseColor: string) => void;
  updateColorValue: (colorCategory: string, shade: string, value: string) => void;
  getColors: () => Array<{ colorKey: string; colorShades: { [key: string]: string } }>;

  // UI state for theme preview
  themeString: string;
  setThemeString: (value: string) => void;
  showThemePreview: boolean;
  setShowThemePreview: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Core theme state
  const [themeValues, setThemeValues] = useState<ThemeValues>(defaultTheme);

  // UI state
  const [themeString, setThemeString] = useState("");
  const [showThemePreview, setShowThemePreview] = useState(false);

  // Color management state
  const [newColorName, setNewColorName] = useState("");
  const [baseColor, setBaseColor] = useState("#3182CE"); // Default blue color

  const toast = useToast();

  // Update a deep nested property in themeValues
  const updateThemeValue = (path: string[], value: any) => {
    setThemeValues(prev => {
      const newTheme = JSON.parse(JSON.stringify(prev));
      let current = newTheme;

      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }

      current[path[path.length - 1]] = value;
      return newTheme;
    });
  };

  // Add a new color palette from manual color picker
  const addNewColorPalette = () => {
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

    // Generate the palette from the base color
    const palette = generateColorPalette(baseColor);

    // Update theme with the new color palette
    setThemeValues(prev => {
      const newTheme = { ...prev };
      if (!newTheme.colors) {
        newTheme.colors = {};
      }
      newTheme.colors[colorName] = palette;
      return newTheme;
    });

    // Reset inputs
    setNewColorName("");

    toast({
      title: `Added color palette: ${colorName}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Update an existing color palette with a new base color
  const updateColorPalette = (colorKey: string, newBaseColor: string) => {
    const palette = generateColorPalette(newBaseColor);
    setThemeValues(prev => {
      const newTheme = { ...prev };
      if (!newTheme.colors) {
        newTheme.colors = {};
      }
      newTheme.colors[colorKey] = palette;
      return newTheme;
    });

    toast({
      title: `Updated color palette: ${colorKey}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Update a specific color value
  const updateColorValue = (colorCategory: string, shade: string, value: string) => {
    updateThemeValue(["colors", colorCategory, shade], value);
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
