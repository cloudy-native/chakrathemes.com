import React, { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  SimpleGrid,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  useToast,
  Code,
  Textarea,
  Select,
  InputGroup,
  InputRightElement,
  Divider,
} from '@chakra-ui/react';
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Utility function to generate a color palette from a single color
const generateColorPalette = (baseColor: string): { [key: string]: string } => {
  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  // Helper function to convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  // Helper function to lighten a color
  const lighten = (hex: string, amount: number): string => {
    const { r, g, b } = hexToRgb(hex);
    const newR = Math.round(r + (255 - r) * amount);
    const newG = Math.round(g + (255 - g) * amount);
    const newB = Math.round(b + (255 - b) * amount);
    return rgbToHex(newR, newG, newB);
  };

  // Helper function to darken a color
  const darken = (hex: string, amount: number): string => {
    const { r, g, b } = hexToRgb(hex);
    const newR = Math.round(r * (1 - amount));
    const newG = Math.round(g * (1 - amount));
    const newB = Math.round(b * (1 - amount));
    return rgbToHex(newR, newG, newB);
  };

  // Generate the palette
  return {
    50: lighten(baseColor, 0.85),  // Very light
    100: lighten(baseColor, 0.7),  // Lighter
    200: lighten(baseColor, 0.5),  // Light
    300: lighten(baseColor, 0.3),  // Somewhat light
    400: lighten(baseColor, 0.1),  // Slightly light
    500: baseColor,                // Base color
    600: darken(baseColor, 0.15),  // Slightly dark
    700: darken(baseColor, 0.3),   // Somewhat dark
    800: darken(baseColor, 0.45),  // Dark
    900: darken(baseColor, 0.6),   // Very dark
  };
};

// Define the default theme structure based on your existing theme
const defaultTheme = {
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

interface ColorSwatch {
  colorKey: string;
  colorShades: { [key: string]: string };
}

const ThemeEditor: React.FC = () => {
  const [themeValues, setThemeValues] = useState(defaultTheme);
  const [themeString, setThemeString] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showThemePreview, setShowThemePreview] = useState(false);
  const [newColorName, setNewColorName] = useState('');
  const [baseColor, setBaseColor] = useState('#3182CE'); // Default blue color
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Generate a preview of the theme
  const previewTheme = () => {
    try {
      const themeObj = extendTheme(themeValues);
      setThemeString(JSON.stringify(themeObj, null, 2));
      setShowThemePreview(true);
      toast({
        title: 'Theme preview generated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error generating theme',
        description: 'Check your theme configuration',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Download theme as a file
  const downloadTheme = () => {
    try {
      const themeObj = extendTheme(themeValues);
      const themeStr = `import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme(${JSON.stringify(themeValues, null, 2)});

export default theme;`;

      const blob = new Blob([themeStr], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'theme.js';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Theme downloaded',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error downloading theme',
        description: 'Check your theme configuration',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
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

  // Update a color value
  const updateColorValue = (colorCategory: string, shade: string, value: string) => {
    updateThemeValue(['colors', colorCategory, shade], value);
  };

  // Handle font change
  const handleFontChange = (fontType: string, value: string) => {
    updateThemeValue(['fonts', fontType], value);
  };

  // Handle font size change
  const handleFontSizeChange = (sizeKey: string, value: string) => {
    updateThemeValue(['fontSizes', sizeKey], value);
  };

  // Handle spacing change
  const handleSpacingChange = (spaceKey: string, value: string) => {
    updateThemeValue(['space', spaceKey], value);
  };

  // Handle border radius change
  const handleRadiiChange = (radiusKey: string, value: string) => {
    updateThemeValue(['radii', radiusKey], value);
  };

  // Generate and add a new color palette
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
      const newTheme = JSON.parse(JSON.stringify(prev));
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

  // Extract colors from the theme
  const getColors = (): ColorSwatch[] => {
    const colors = themeValues.colors || {};
    return Object.keys(colors).map(colorKey => {
      const colorShades = typeof colors[colorKey] === 'object' ? colors[colorKey] : {};
      return { colorKey, colorShades };
    });
  };

  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      bg={bgColor}
      borderColor={borderColor}
      boxShadow="md"
    >
      <Tabs isFitted variant="enclosed" index={activeTabIndex} onChange={setActiveTabIndex}>
        <TabList mb="1em">
          <Tab>Colors</Tab>
          <Tab>Typography</Tab>
          <Tab>Spacing</Tab>
          <Tab>Border Radius</Tab>
          <Tab>Theme Code</Tab>
        </TabList>

        <TabPanels>
          {/* Colors Panel */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              {/* Add new color palette */}
              <Box 
                p={4} 
                borderWidth="1px" 
                borderRadius="md" 
                bg={useColorModeValue("blue.50", "blue.900")}
              >
                <Text fontWeight="bold" mb={4}>Generate New Color Palette</Text>
                
                <HStack spacing={4} mb={4}>
                  <FormControl>
                    <FormLabel>Color Name</FormLabel>
                    <Input 
                      placeholder="e.g. primary, accent, etc." 
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Base Color (500)</FormLabel>
                    <InputGroup>
                      <Input 
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                      />
                      <InputRightElement width="3.5rem">
                        <input
                          type="color"
                          value={baseColor}
                          onChange={(e) => setBaseColor(e.target.value)}
                          style={{ 
                            width: "30px", 
                            height: "30px", 
                            padding: 0,
                            border: "none" 
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </HStack>
                
                <Button 
                  colorScheme="blue" 
                  onClick={addNewColorPalette}
                  leftIcon={<span>🎨</span>}
                >
                  Generate Palette
                </Button>
                
                {/* Preview of the generated palette */}
                <Box mt={4}>
                  <Text fontSize="sm" mb={2}>Preview of generated palette:</Text>
                  <SimpleGrid columns={10} spacing={1}>
                    {Object.entries(generateColorPalette(baseColor)).map(([shade, color]) => (
                      <Box 
                        key={shade}
                        bg={color}
                        height="20px"
                        borderRadius="sm"
                        position="relative"
                        _hover={{
                          _after: {
                            content: `"${shade}"`,
                            position: "absolute",
                            bottom: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            bg: "gray.700",
                            color: "white",
                            fontSize: "xs",
                            p: 1,
                            borderRadius: "sm",
                            whiteSpace: "nowrap",
                            zIndex: 10
                          }
                        }}
                      />
                    ))}
                  </SimpleGrid>
                </Box>
              </Box>
              
              <Divider />
              
              {/* Existing color palettes */}
              <Accordion defaultIndex={[0]} allowMultiple>
                {getColors().map((colorSwatch, idx) => (
                  <AccordionItem key={idx}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {colorSwatch.colorKey}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {/* Auto-generate button */}
                      <Box mb={4} p={3} bg={useColorModeValue("gray.50", "gray.700")} borderRadius="md">
                        <Text fontWeight="medium" mb={2}>Regenerate Entire Palette</Text>
                        <HStack>
                          <InputGroup size="sm">
                            <Input 
                              type="text"
                              placeholder="Base color (hex)" 
                              defaultValue={colorSwatch.colorShades['500'] || '#000000'}
                              id={`base-color-${colorSwatch.colorKey}`}
                            />
                            <InputRightElement width="2.5rem">
                              <input
                                type="color"
                                value={colorSwatch.colorShades['500'] || '#000000'}
                                onChange={(e) => {
                                  const input = document.getElementById(`base-color-${colorSwatch.colorKey}`) as HTMLInputElement;
                                  if (input) input.value = e.target.value;
                                }}
                                style={{ width: "20px", height: "20px" }}
                              />
                            </InputRightElement>
                          </InputGroup>
                          <Button 
                            size="sm" 
                            colorScheme="blue"
                            onClick={() => {
                              const input = document.getElementById(`base-color-${colorSwatch.colorKey}`) as HTMLInputElement;
                              if (input) updateColorPalette(colorSwatch.colorKey, input.value);
                            }}
                          >
                            Generate
                          </Button>
                        </HStack>
                      </Box>
                      
                      {/* Individual color shades */}
                      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                        {Object.entries(colorSwatch.colorShades).map(([shade, colorValue]) => (
                          <FormControl key={shade}>
                            <FormLabel>{shade}</FormLabel>
                            <HStack>
                              <Input
                                value={colorValue as string}
                                onChange={(e) => updateColorValue(colorSwatch.colorKey, shade, e.target.value)}
                              />
                              <Popover>
                                <PopoverTrigger>
                                  <Button
                                    size="sm"
                                    bg={colorValue as string}
                                    h="40px"
                                    w="40px"
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                  />
                                </PopoverTrigger>
                                <PopoverContent p={0} width="200px">
                                  <PopoverBody p={2}>
                                    <input
                                      type="color"
                                      value={colorValue as string}
                                      onChange={(e) => updateColorValue(colorSwatch.colorKey, shade, e.target.value)}
                                      style={{ width: "100%", height: "40px" }}
                                    />
                                  </PopoverBody>
                                </PopoverContent>
                              </Popover>
                            </HStack>
                          </FormControl>
                        ))}
                      </SimpleGrid>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </VStack>
          </TabPanel>

          {/* Typography Panel */}
          <TabPanel>
            <Accordion defaultIndex={[0, 1]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Font Families
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack spacing={4} align="stretch">
                    {Object.entries(themeValues.fonts || {}).map(([fontType, fontValue]) => (
                      <FormControl key={fontType}>
                        <FormLabel>{fontType}</FormLabel>
                        <Input
                          value={fontValue as string}
                          onChange={(e) => handleFontChange(fontType, e.target.value)}
                        />
                      </FormControl>
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Font Sizes
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {Object.entries(themeValues.fontSizes || {}).map(([sizeKey, sizeValue]) => (
                      <FormControl key={sizeKey}>
                        <FormLabel>{sizeKey}</FormLabel>
                        <Input
                          value={sizeValue as string}
                          onChange={(e) => handleFontSizeChange(sizeKey, e.target.value)}
                        />
                      </FormControl>
                    ))}
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Font Weights
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {Object.entries(themeValues.fontWeights || {}).map(([weightKey, weightValue]) => (
                      <FormControl key={weightKey}>
                        <FormLabel>{weightKey}</FormLabel>
                        <Input
                          type="number"
                          value={weightValue as number}
                          onChange={(e) => updateThemeValue(['fontWeights', weightKey], parseInt(e.target.value))}
                        />
                      </FormControl>
                    ))}
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>

          {/* Spacing Panel */}
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {Object.entries(themeValues.space || {}).map(([spaceKey, spaceValue]) => (
                <FormControl key={spaceKey}>
                  <FormLabel>{spaceKey}</FormLabel>
                  <Input
                    value={spaceValue as string}
                    onChange={(e) => handleSpacingChange(spaceKey, e.target.value)}
                  />
                </FormControl>
              ))}
            </SimpleGrid>
          </TabPanel>

          {/* Border Radius Panel */}
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {Object.entries(themeValues.radii || {}).map(([radiusKey, radiusValue]) => (
                <FormControl key={radiusKey}>
                  <FormLabel>{radiusKey}</FormLabel>
                  <Input
                    value={radiusValue as string}
                    onChange={(e) => handleRadiiChange(radiusKey, e.target.value)}
                  />
                </FormControl>
              ))}
            </SimpleGrid>
          </TabPanel>

          {/* Theme Code Panel */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <HStack>
                <Button colorScheme="blue" onClick={previewTheme}>
                  Generate Theme Code
                </Button>
                <Button colorScheme="green" onClick={downloadTheme}>
                  Download Theme
                </Button>
              </HStack>
              
              {showThemePreview && (
                <Box>
                  <Text mb={2} fontWeight="bold">
                    Theme Preview:
                  </Text>
                  <Box 
                    borderWidth="1px" 
                    borderRadius="md" 
                    p={2} 
                    bg={useColorModeValue("gray.50", "gray.900")}
                  >
                    <Textarea
                      value={themeString}
                      isReadOnly
                      minH="400px"
                      fontFamily="mono"
                      fontSize="sm"
                    />
                  </Box>
                </Box>
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ThemeEditor;