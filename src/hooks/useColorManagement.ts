import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ThemeValues, ColorSwatch, ThemePath, ThemeValueType } from "@/types";
import { generateColorPalette } from "@/utils/colorUtils";
import { EventCategory, trackEvent } from "@/utils/analytics";

interface UseColorManagementProps {
  themeValues: ThemeValues;
  updateThemeValue: (path: ThemePath, value: ThemeValueType) => void;
  setThemeValues: React.Dispatch<React.SetStateAction<ThemeValues>>;
}

export const useColorManagement = ({
  themeValues,
  updateThemeValue,
  setThemeValues,
}: UseColorManagementProps) => {
  const [newColorName, setNewColorName] = useState("");
  const [baseColor, setBaseColor] = useState("#3182CE"); // Default blue color
  const toast = useToast();

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

    // Track the event
    trackEvent(EventCategory.COLOR, "add_palette", colorName);

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
    updateThemeValue(["colors", colorCategory, shade], value);
    
    // Track the event
    trackEvent(EventCategory.COLOR, "update_color", `${colorCategory}.${shade}`);
  };

  // Extract colors from the theme
  const getColors = (): ColorSwatch[] => {
    const colors = themeValues.colors || {};
    return Object.keys(colors).map(colorKey => {
      const colorShades = typeof colors[colorKey] === "object" ? colors[colorKey] : {};
      return { colorKey, colorShades };
    });
  };

  // Remove a color palette
  const removeColorPalette = (colorKey: string) => {
    setThemeValues(prev => {
      const newTheme = { ...prev };
      if (newTheme.colors && newTheme.colors[colorKey]) {
        const { [colorKey]: _, ...remainingColors } = newTheme.colors;
        newTheme.colors = remainingColors;
      }
      return newTheme;
    });

    // Track the event
    trackEvent(EventCategory.COLOR, "remove_palette", colorKey);

    toast({
      title: `Removed color palette: ${colorKey}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return {
    newColorName,
    setNewColorName,
    baseColor,
    setBaseColor,
    addNewColorPalette,
    updateColorPalette,
    updateColorValue,
    getColors,
    removeColorPalette,
  };
};
