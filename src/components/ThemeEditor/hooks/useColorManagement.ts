import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { generateColorPalette, ColorSwatch } from '../utils/colorUtils';

export interface ColorManagementState {
  newColorName: string;
  baseColor: string;
}

export interface ThemeValues {
  config: {
    initialColorMode: string;
    useSystemColorMode: boolean;
  };
  colors: {
    [key: string]: {
      [key: string]: string;
    };
  };
  fonts: {
    [key: string]: string;
  };
  fontSizes: {
    [key: string]: string;
  };
  fontWeights: {
    [key: string]: number;
  };
  space: {
    [key: string]: string;
  };
  radii: {
    [key: string]: string;
  };
}

export const useColorManagement = (themeValues: ThemeValues, setThemeValues: React.Dispatch<React.SetStateAction<ThemeValues>>) => {
  const [newColorName, setNewColorName] = useState('');
  const [baseColor, setBaseColor] = useState('#3182CE'); // Default blue color
  const toast = useToast();

  // Add a new color palette from manual color picker
  const addNewColorPalette = () => {
    if (!newColorName) {
      toast({
        title: 'Color name is required',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    
    const colorName = newColorName.trim().toLowerCase().replace(/\s+/g, '-');
    
    // Generate the palette from the base color
    const palette = generateColorPalette(baseColor);
    
    // Update theme with the new color palette
    setThemeValues((prev) => {
      const newTheme = { ...prev };
      if (!newTheme.colors) {
        newTheme.colors = {};
      }
      newTheme.colors[colorName] = palette;
      return newTheme;
    });
    
    // Reset inputs
    setNewColorName('');
    
    toast({
      title: `Added color palette: ${colorName}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };
  
  // Update an existing color palette with a new base color
  const updateColorPalette = (colorKey: string, newBaseColor: string) => {
    const palette = generateColorPalette(newBaseColor);
    setThemeValues((prev) => {
      const newTheme = { ...prev };
      if (!newTheme.colors) {
        newTheme.colors = {};
      }
      newTheme.colors[colorKey] = palette;
      return newTheme;
    });
    
    toast({
      title: `Updated color palette: ${colorKey}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  // Update a deep nested property in themeValues
  const updateThemeValue = (path: string[], value: any) => {
    setThemeValues((prev) => {
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

  // Update a specific color value
  const updateColorValue = (colorCategory: string, shade: string, value: string) => {
    updateThemeValue(['colors', colorCategory, shade], value);
  };

  // Extract colors from the theme
  const getColors = (): ColorSwatch[] => {
    const colors = themeValues.colors || {};
    return Object.keys(colors).map(colorKey => {
      const colorShades = typeof colors[colorKey] === 'object' ? colors[colorKey] : {};
      return { colorKey, colorShades };
    });
  };

  return {
    newColorName,
    setNewColorName,
    baseColor,
    setBaseColor,
    addNewColorPalette,
    updateColorPalette,
    updateThemeValue,
    updateColorValue,
    getColors,
  };
};