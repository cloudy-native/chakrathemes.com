import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Center,
  Image as ChakraImage,
  Divider,
  extendTheme,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Vibrant } from "node-vibrant/browser";
import React, { useRef, useState } from "react";

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
    50: lighten(baseColor, 0.85), // Very light
    100: lighten(baseColor, 0.7), // Lighter
    200: lighten(baseColor, 0.5), // Light
    300: lighten(baseColor, 0.3), // Somewhat light
    400: lighten(baseColor, 0.1), // Slightly light
    500: baseColor, // Base color
    600: darken(baseColor, 0.15), // Slightly dark
    700: darken(baseColor, 0.3), // Somewhat dark
    800: darken(baseColor, 0.45), // Dark
    900: darken(baseColor, 0.6), // Very dark
  };
};

// Define the default theme structure based on your existing theme
const defaultTheme = {
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      50: "#E6F6FF",
      100: "#BCDEFA",
      200: "#91C5F5",
      300: "#66ACF0",
      400: "#3B94EB",
      500: "#1A7AD4",
      600: "#1460A7",
      700: "#0F477A",
      800: "#092D4D",
      900: "#041421",
    },
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
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
    px: "1px",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem",
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
};

interface ColorSwatch {
  colorKey: string;
  colorShades: { [key: string]: string };
}

interface ExtractedColor {
  name: string;
  color: string;
}

const ThemeEditor: React.FC = () => {
  const [themeValues, setThemeValues] = useState(defaultTheme);
  const [themeString, setThemeString] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showThemePreview, setShowThemePreview] = useState(false);
  const [newColorName, setNewColorName] = useState("");
  const [baseColor, setBaseColor] = useState("#3182CE"); // Default blue color

  // Image extraction related state
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [extractionLoading, setExtractionLoading] = useState(false);
  const [selectedColorFromImage, setSelectedColorFromImage] = useState<
    string | null
  >(null);
  const [newPaletteNameFromImage, setNewPaletteNameFromImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Generate a preview of the theme
  const previewTheme = () => {
    try {
      const themeObj = extendTheme(themeValues);
      setThemeString(JSON.stringify(themeObj, null, 2));
      setShowThemePreview(true);
      toast({
        title: "Theme preview generated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error generating theme",
        description: "Check your theme configuration",
        status: "error",
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

      const blob = new Blob([themeStr], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "theme.js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Theme downloaded",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error downloading theme",
        description: "Check your theme configuration",
        status: "error",
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
  const updateColorValue = (
    colorCategory: string,
    shade: string,
    value: string
  ) => {
    updateThemeValue(["colors", colorCategory, shade], value);
  };

  // Handle font change
  const handleFontChange = (fontType: string, value: string) => {
    updateThemeValue(["fonts", fontType], value);
  };

  // Handle font size change
  const handleFontSizeChange = (sizeKey: string, value: string) => {
    updateThemeValue(["fontSizes", sizeKey], value);
  };

  // Handle spacing change
  const handleSpacingChange = (spaceKey: string, value: string) => {
    updateThemeValue(["space", spaceKey], value);
  };

  // Handle border radius change
  const handleRadiiChange = (radiusKey: string, value: string) => {
    updateThemeValue(["radii", radiusKey], value);
  };

  // Generate and add a new color palette
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
    setThemeValues((prev) => {
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
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Extract colors from the theme
  const getColors = (): ColorSwatch[] => {
    const colors = themeValues.colors || {};
    return Object.keys(colors).map((colorKey) => {
      const colorShades =
        typeof colors[colorKey] === "object" ? colors[colorKey] : {};
      return { colorKey, colorShades };
    });
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setImageUrl("");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image URL input
  const handleImageUrlSubmit = () => {
    if (!imageUrl) {
      toast({
        title: "URL is required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Simple URL validation
    if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|bmp)$/i)) {
      toast({
        title: "Invalid image URL",
        description: "Please enter a valid image URL",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Use a CORS proxy to avoid cross-origin issues
    const corsProxyUrl = "https://api.allorigins.win/raw?url=";
    const proxiedUrl = corsProxyUrl + encodeURIComponent(imageUrl);

    // Show loading toast
    toast({
      title: "Loading image",
      description: "Fetching image through CORS proxy...",
      status: "loading",
      duration: 3000,
      isClosable: true,
    });

    // Load the image via proxy
    const testImg = document.createElement("img");
    testImg.crossOrigin = "anonymous";
    testImg.onload = () => {
      setUploadedImage(proxiedUrl);
    };
    testImg.onerror = () => {
      toast({
        title: "Error loading image",
        description:
          "There was an error loading the image. This may be due to CORS restrictions. Try downloading the image and uploading it directly instead.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    };
    testImg.src = proxiedUrl;
  };

  // Extract colors from the uploaded image
  const extractColorsFromImage = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image found",
        description: "Please upload an image first",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setExtractionLoading(true);

    try {
      // Create a new image with cross-origin attributes for handling the uploaded image
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous";

      // Use a promise to handle the image loading
      const imageLoaded = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = uploadedImage;
      });

      // Wait for the image to load
      await imageLoaded;

      const vibrant = Vibrant.from(img);
      const palette = await vibrant.getPalette();

      console.log("Extracted Palette:", palette);

      const extractedColorsArray: ExtractedColor[] = [];

      if (palette.Vibrant) {
        extractedColorsArray.push({
          name: "Vibrant",
          color: palette.Vibrant.hex,
        });
      }

      if (palette.DarkVibrant) {
        extractedColorsArray.push({
          name: "Dark Vibrant",
          color: palette.DarkVibrant.hex,
        });
      }

      if (palette.LightVibrant) {
        extractedColorsArray.push({
          name: "Light Vibrant",
          color: palette.LightVibrant.hex,
        });
      }

      if (palette.Muted) {
        extractedColorsArray.push({
          name: "Muted",
          color: palette.Muted.hex,
        });
      }

      if (palette.DarkMuted) {
        extractedColorsArray.push({
          name: "Dark Muted",
          color: palette.DarkMuted.hex,
        });
      }

      if (palette.LightMuted) {
        extractedColorsArray.push({
          name: "Light Muted",
          color: palette.LightMuted.hex,
        });
      }

      setExtractedColors(extractedColorsArray);

      if (extractedColorsArray.length > 0) {
        setSelectedColorFromImage(extractedColorsArray[0].color);
      }

      toast({
        title: "Colors extracted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error extracting colors:", error);
      toast({
        title: "Error extracting colors",
        description: "There was an error processing the image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setExtractionLoading(false);
    }
  };

  // Generate palette from extracted color
  const generatePaletteFromExtractedColor = () => {
    if (!selectedColorFromImage) {
      toast({
        title: "No color selected",
        description: "Please select a color from the extracted colors",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!newPaletteNameFromImage) {
      toast({
        title: "Palette name is required",
        description: "Please enter a name for the new palette",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const colorName = newPaletteNameFromImage
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
    const palette = generateColorPalette(selectedColorFromImage);

    // Update theme with the new color palette
    setThemeValues((prev) => {
      const newTheme = { ...prev };
      if (!newTheme.colors) {
        newTheme.colors = {};
      }
      newTheme.colors[colorName] = palette;
      return newTheme;
    });

    toast({
      title: `Added color palette: ${colorName}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    // Reset inputs
    setNewPaletteNameFromImage("");
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
      <Tabs
        isFitted
        variant="enclosed"
        index={activeTabIndex}
        onChange={setActiveTabIndex}
      >
        <TabList mb="1em">
          <Tab>Colors from Picker</Tab>
          <Tab>Colors from Image</Tab>
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
                <Text fontWeight="bold" mb={4}>
                  Generate New Color Palette
                </Text>

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
                            border: "none",
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
                  <Text fontSize="sm" mb={2}>
                    Preview of generated palette:
                  </Text>
                  <SimpleGrid columns={10} spacing={1}>
                    {Object.entries(generateColorPalette(baseColor)).map(
                      ([shade, color]) => (
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
                              zIndex: 10,
                            },
                          }}
                        />
                      )
                    )}
                  </SimpleGrid>
                </Box>
              </Box>

              <Divider />

              {/* Existing color palettes */}
              {getColors().map((colorSwatch, idx) => (
                <Box
                  key={idx}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor={borderColor}
                  mb={4}
                  overflow="hidden"
                >
                  {/* Custom Accordion Header with Color Preview */}
                  <Box
                    as="button"
                    onClick={() => {
                      const contentId = `color-content-${idx}`;
                      const content = document.getElementById(contentId);
                      if (content) {
                        const isVisible = content.style.display !== "none";
                        content.style.display = isVisible ? "none" : "block";

                        // Toggle icon rotation
                        const iconId = `color-icon-${idx}`;
                        const icon = document.getElementById(iconId);
                        if (icon) {
                          icon.style.transform = isVisible
                            ? "rotate(0deg)"
                            : "rotate(180deg)";
                        }
                      }
                    }}
                    width="full"
                    textAlign="left"
                    py={3}
                    px={4}
                    display="flex"
                    alignItems="center"
                    bg={useColorModeValue("gray.100", "gray.700")}
                    _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
                    transition="all 0.2s"
                  >
                    <Box flex="1">
                      <HStack spacing={3}>
                        <Text fontWeight="medium">{colorSwatch.colorKey}</Text>

                        {/* Color swatch preview */}
                        <Flex
                          height="24px"
                          flex={1}
                          borderRadius="md"
                          overflow="hidden"
                        >
                          {Object.entries(colorSwatch.colorShades)
                            .sort(([a], [b]) => parseInt(a) - parseInt(b))
                            .map(([shade, color]) => (
                              <Box
                                key={shade}
                                bg={color as string}
                                flex={1}
                                title={`${shade}: ${color}`}
                              />
                            ))}
                        </Flex>
                      </HStack>
                    </Box>
                    <Box
                      id={`color-icon-${idx}`}
                      transition="transform 0.2s"
                      transform={idx === 0 ? "rotate(180deg)" : "rotate(0deg)"}
                    >
                      ▼
                    </Box>
                  </Box>

                  {/* Accordion Content */}
                  <Box
                    id={`color-content-${idx}`}
                    p={4}
                    style={{ display: idx === 0 ? "block" : "none" }}
                  >
                    {/* Auto-generate button */}
                    <Box
                      mb={4}
                      p={3}
                      bg={useColorModeValue("gray.50", "gray.700")}
                      borderRadius="md"
                    >
                      <Text fontWeight="medium" mb={2}>
                        Regenerate Entire Palette
                      </Text>
                      <HStack>
                        <InputGroup size="sm">
                          <Input
                            type="text"
                            placeholder="Base color (hex)"
                            defaultValue={
                              colorSwatch.colorShades["500"] || "#000000"
                            }
                            id={`base-color-${colorSwatch.colorKey}`}
                          />
                          <InputRightElement width="2.5rem">
                            <input
                              type="color"
                              value={
                                colorSwatch.colorShades["500"] || "#000000"
                              }
                              onChange={(e) => {
                                const input = document.getElementById(
                                  `base-color-${colorSwatch.colorKey}`
                                ) as HTMLInputElement;
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
                            const input = document.getElementById(
                              `base-color-${colorSwatch.colorKey}`
                            ) as HTMLInputElement;
                            if (input)
                              updateColorPalette(
                                colorSwatch.colorKey,
                                input.value
                              );
                          }}
                        >
                          Generate
                        </Button>
                      </HStack>
                    </Box>

                    {/* Individual color shades */}
                    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                      {Object.entries(colorSwatch.colorShades)
                        .sort(([a], [b]) => parseInt(a) - parseInt(b))
                        .map(([shade, colorValue]) => (
                          <FormControl key={shade}>
                            <FormLabel>{shade}</FormLabel>
                            <HStack>
                              <Input
                                value={colorValue as string}
                                onChange={(e) =>
                                  updateColorValue(
                                    colorSwatch.colorKey,
                                    shade,
                                    e.target.value
                                  )
                                }
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
                                      onChange={(e) =>
                                        updateColorValue(
                                          colorSwatch.colorKey,
                                          shade,
                                          e.target.value
                                        )
                                      }
                                      style={{ width: "100%", height: "40px" }}
                                    />
                                  </PopoverBody>
                                </PopoverContent>
                              </Popover>
                            </HStack>
                          </FormControl>
                        ))}
                    </SimpleGrid>
                  </Box>
                </Box>
              ))}
            </VStack>
          </TabPanel>
          {/* Image Colors Panel */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg={useColorModeValue("blue.50", "blue.900")}
              >
                <Text fontWeight="bold" mb={4}>
                  Extract Colors from Image
                </Text>

                {/* Image Upload Options */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Upload from your device
                    </Text>
                    <HStack>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        colorScheme="blue"
                        variant="outline"
                      >
                        Choose File
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                      {uploadedImage && !imageUrl && (
                        <Text fontSize="sm">Image uploaded</Text>
                      )}
                    </HStack>
                  </Box>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Or paste an image URL
                    </Text>
                    <HStack>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                      <Button colorScheme="blue" onClick={handleImageUrlSubmit}>
                        Load
                      </Button>
                    </HStack>
                  </Box>
                </SimpleGrid>

                {/* Image Preview */}
                {uploadedImage && (
                  <Box mb={4}>
                    <Text fontWeight="medium" mb={2}>
                      Image Preview
                    </Text>
                    <Center
                      borderWidth="1px"
                      borderRadius="md"
                      p={2}
                      bg={useColorModeValue("white", "gray.700")}
                      maxH="300px"
                      overflow="hidden"
                    >
                      <ChakraImage
                        src={uploadedImage}
                        maxH="280px"
                        objectFit="contain"
                        borderRadius="md"
                      />
                    </Center>

                    <Button
                      mt={4}
                      colorScheme="teal"
                      onClick={extractColorsFromImage}
                      isLoading={extractionLoading}
                      loadingText="Extracting Colors"
                      width="full"
                    >
                      Extract Colors from Image
                    </Button>
                  </Box>
                )}

                {/* Extracted Colors */}
                {extractedColors.length > 0 && (
                  <Box mt={6}>
                    <Text fontWeight="bold" mb={3}>
                      Extracted Colors
                    </Text>

                    <SimpleGrid
                      columns={{ base: 2, md: 3, lg: 6 }}
                      spacing={4}
                      mb={6}
                    >
                      {extractedColors.map((color, idx) => (
                        <Box
                          key={idx}
                          borderWidth={
                            selectedColorFromImage === color.color
                              ? "2px"
                              : "1px"
                          }
                          borderRadius="md"
                          overflow="hidden"
                          cursor="pointer"
                          onClick={() => setSelectedColorFromImage(color.color)}
                          position="relative"
                          borderColor={
                            selectedColorFromImage === color.color
                              ? "blue.500"
                              : borderColor
                          }
                        >
                          <Box h="60px" bg={color.color} />
                          <Box p={2}>
                            <Text fontSize="sm" fontWeight="medium">
                              {color.name}
                            </Text>
                            <Text fontSize="xs">{color.color}</Text>
                          </Box>
                          {selectedColorFromImage === color.color && (
                            <Badge
                              position="absolute"
                              top={2}
                              right={2}
                              colorScheme="blue"
                              borderRadius="full"
                            >
                              Selected
                            </Badge>
                          )}
                        </Box>
                      ))}
                    </SimpleGrid>

                    {selectedColorFromImage && (
                      <Box>
                        <Text fontWeight="medium" mb={2}>
                          Generate Palette from Selected Color
                        </Text>

                        <HStack spacing={4} mb={4}>
                          <FormControl>
                            <FormLabel>Palette Name</FormLabel>
                            <Input
                              placeholder="e.g. 'image-palette'"
                              value={newPaletteNameFromImage}
                              onChange={(e) =>
                                setNewPaletteNameFromImage(e.target.value)
                              }
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Selected Color</FormLabel>
                            <HStack>
                              <Input
                                value={selectedColorFromImage}
                                isReadOnly
                              />
                              <Box
                                w="40px"
                                h="40px"
                                bg={selectedColorFromImage}
                                borderRadius="md"
                                borderWidth="1px"
                                borderColor={borderColor}
                              />
                            </HStack>
                          </FormControl>
                        </HStack>

                        <Button
                          colorScheme="blue"
                          onClick={generatePaletteFromExtractedColor}
                        >
                          Generate Palette
                        </Button>

                        {/* Preview of the generated palette */}
                        <Box mt={4}>
                          <Text fontSize="sm" mb={2}>
                            Preview of generated palette:
                          </Text>
                          <SimpleGrid columns={10} spacing={1}>
                            {selectedColorFromImage &&
                              Object.entries(
                                generateColorPalette(selectedColorFromImage)
                              ).map(([shade, color]) => (
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
                                      zIndex: 10,
                                    },
                                  }}
                                />
                              ))}
                          </SimpleGrid>
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
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
                    {Object.entries(themeValues.fonts || {}).map(
                      ([fontType, fontValue]) => (
                        <FormControl key={fontType}>
                          <FormLabel>{fontType}</FormLabel>
                          <Input
                            value={fontValue as string}
                            onChange={(e) =>
                              handleFontChange(fontType, e.target.value)
                            }
                          />
                        </FormControl>
                      )
                    )}
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
                    {Object.entries(themeValues.fontSizes || {}).map(
                      ([sizeKey, sizeValue]) => (
                        <FormControl key={sizeKey}>
                          <FormLabel>{sizeKey}</FormLabel>
                          <Input
                            value={sizeValue as string}
                            onChange={(e) =>
                              handleFontSizeChange(sizeKey, e.target.value)
                            }
                          />
                        </FormControl>
                      )
                    )}
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
                    {Object.entries(themeValues.fontWeights || {}).map(
                      ([weightKey, weightValue]) => (
                        <FormControl key={weightKey}>
                          <FormLabel>{weightKey}</FormLabel>
                          <Input
                            type="number"
                            value={weightValue as number}
                            onChange={(e) =>
                              updateThemeValue(
                                ["fontWeights", weightKey],
                                parseInt(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                      )
                    )}
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>

          {/* Spacing Panel */}
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {Object.entries(themeValues.space || {}).map(
                ([spaceKey, spaceValue]) => (
                  <FormControl key={spaceKey}>
                    <FormLabel>{spaceKey}</FormLabel>
                    <Input
                      value={spaceValue as string}
                      onChange={(e) =>
                        handleSpacingChange(spaceKey, e.target.value)
                      }
                    />
                  </FormControl>
                )
              )}
            </SimpleGrid>
          </TabPanel>

          {/* Border Radius Panel */}
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {Object.entries(themeValues.radii || {}).map(
                ([radiusKey, radiusValue]) => (
                  <FormControl key={radiusKey}>
                    <FormLabel>{radiusKey}</FormLabel>
                    <Input
                      value={radiusValue as string}
                      onChange={(e) =>
                        handleRadiiChange(radiusKey, e.target.value)
                      }
                    />
                  </FormControl>
                )
              )}
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
