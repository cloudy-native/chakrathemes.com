import React, { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';

// Import hooks
import { useColorManagement, ThemeValues } from './hooks/useColorManagement';
import { useImageColorExtraction } from './hooks/useImageColorExtraction';
import { useTypographyManagement } from './hooks/useTypographyManagement';
import { useSpacingAndRadius } from './hooks/useSpacingAndRadius';

// Import tabs
import ColorPickerTab from './tabs/ColorPickerTab';
import ImageColorTab from './tabs/ImageColorTab';
import TypographyTab from './tabs/TypographyTab';
import SpacingTab from './tabs/SpacingTab';
import BorderRadiusTab from './tabs/BorderRadiusTab';
import ComponentsPreviewTab from './tabs/ComponentsPreviewTab';

// Default theme structure
const defaultTheme: ThemeValues = {
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BCDEFA',
      200: '#91C5F5',
      300: '#66ACF0',
      400: '#3B94EB',
      500: '#1A7AD4',
      600: '#1460A7',
      700: '#0F477A',
      800: '#092D4D',
      900: '#041421',
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    mono: 'Menlo, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
};

export const ThemeEditor: React.FC = () => {
  // Theme state and related values
  const [themeValues, setThemeValues] = useState<ThemeValues>(defaultTheme);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [themeString, setThemeString] = useState('');
  const [showThemePreview, setShowThemePreview] = useState(false);

  // Setup UI styling
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Initialize hooks
  const {
    newColorName,
    setNewColorName,
    baseColor,
    setBaseColor,
    addNewColorPalette,
    updateColorPalette,
    updateThemeValue,
    updateColorValue,
    getColors,
  } = useColorManagement(themeValues, setThemeValues);

  const {
    imageUrl,
    setImageUrl,
    uploadedImage,
    setUploadedImage,
    extractedColors,
    extractionLoading,
    selectedColorFromImage,
    setSelectedColorFromImage,
    newPaletteNameFromImage,
    setNewPaletteNameFromImage,
    fileInputRef,
    handleImageUpload,
    handleImageUrlSubmit,
    extractColorsFromImage,
    generatePaletteFromExtractedColor,
  } = useImageColorExtraction(themeValues, setThemeValues);

  const {
    handleFontChange,
    handleFontSizeChange,
    handleFontWeightChange,
    handleLetterSpacingChange,
    handleLineHeightChange,
    fetchGoogleFonts,
    selectGoogleFont,
    googleFonts,
    isLoading: fontsLoading,
    selectedFont,
    availableVariants,
    getNumericWeight,
    error: fontsError,
    FONT_WEIGHT_VARIANTS
  } = useTypographyManagement(themeValues, updateThemeValue);

  const {
    handleSpacingChange,
    handleRadiiChange,
  } = useSpacingAndRadius(themeValues, updateThemeValue);

  return (
    <Box
      p={5}
      borderWidth="1px"
      bg={bgColor}
      borderColor={borderColor}
    >
      <Tabs 
        isFitted 
        variant="line" 
        index={activeTabIndex} 
        onChange={setActiveTabIndex}
      >
        <TabList mb="1em">
          <Tab>Colors from Picker</Tab>
          <Tab>Colors from Image</Tab>
          <Tab>Typography</Tab>
          <Tab>Spacing</Tab>
          <Tab>Border Radius</Tab>
          <Tab>Your Theme</Tab>
        </TabList>

        <TabPanels>
          {/* Colors from Picker Tab */}
          <TabPanel>
            <ColorPickerTab
              newColorName={newColorName}
              setNewColorName={setNewColorName}
              baseColor={baseColor}
              setBaseColor={setBaseColor}
              addNewColorPalette={addNewColorPalette}
              updateColorPalette={updateColorPalette}
              updateColorValue={updateColorValue}
              colors={getColors()}
            />
          </TabPanel>

          {/* Colors from Image Tab */}
          <TabPanel>
            <ImageColorTab
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              uploadedImage={uploadedImage}
              extractedColors={extractedColors}
              extractionLoading={extractionLoading}
              selectedColorFromImage={selectedColorFromImage}
              setSelectedColorFromImage={setSelectedColorFromImage}
              newPaletteNameFromImage={newPaletteNameFromImage}
              setNewPaletteNameFromImage={setNewPaletteNameFromImage}
              fileInputRef={fileInputRef}
              handleImageUpload={handleImageUpload}
              handleImageUrlSubmit={handleImageUrlSubmit}
              extractColorsFromImage={extractColorsFromImage}
              generatePaletteFromExtractedColor={generatePaletteFromExtractedColor}
            />
          </TabPanel>

          {/* Typography Tab */}
          <TabPanel>
            <TypographyTab
              themeValues={themeValues}
              handleFontChange={handleFontChange}
              handleFontSizeChange={handleFontSizeChange}
              handleFontWeightChange={handleFontWeightChange}
              handleLetterSpacingChange={handleLetterSpacingChange}
              handleLineHeightChange={handleLineHeightChange}
              fetchGoogleFonts={fetchGoogleFonts}
              selectGoogleFont={selectGoogleFont}
              googleFonts={googleFonts}
              isLoading={fontsLoading}
              selectedFont={selectedFont}
              availableVariants={availableVariants}
              getNumericWeight={getNumericWeight}
              error={fontsError}
              FONT_WEIGHT_VARIANTS={FONT_WEIGHT_VARIANTS}
            />
          </TabPanel>

          {/* Spacing Tab */}
          <TabPanel>
            <SpacingTab
              themeValues={themeValues}
              handleSpacingChange={handleSpacingChange}
            />
          </TabPanel>

          {/* Border Radius Tab */}
          <TabPanel>
            <BorderRadiusTab
              themeValues={themeValues}
              handleRadiiChange={handleRadiiChange}
            />
          </TabPanel>

          {/* Components Preview Tab */}
          <TabPanel>
            <ComponentsPreviewTab 
              themeValues={themeValues}
              themeString={themeString}
              setThemeString={setThemeString}
              showThemePreview={showThemePreview}
              setShowThemePreview={setShowThemePreview}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ThemeEditor;