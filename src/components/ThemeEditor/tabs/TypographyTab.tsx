import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
  VStack,
  useToast,
  Link,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { FONT_WEIGHT_VARIANTS } from "@/hooks/useTypographyManagement";
import { GoogleFont, GoogleFontsResponse } from "@/types";
import { ExternalLinkIcon } from "@chakra-ui/icons";

// Default font sizes for reset functionality
const DEFAULT_FONT_SIZES = {
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
};

// Default font weights for reset functionality
const DEFAULT_FONT_WEIGHTS = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

// Default font families
const DEFAULT_FONT_FAMILIES = {
  body: "sans-serif",
  heading: "sans-serif",
  mono: "monospace",
};

// Default letter spacing values
const DEFAULT_LETTER_SPACINGS = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

// Default line height values
const DEFAULT_LINE_HEIGHTS = {
  normal: "normal",
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: 2,
};

export const TypographyTab: React.FC = () => {
  const { themeValues, updateThemeValue } = useThemeContext();
  const toast = useToast();

  // Typography state
  const [googleFonts, setGoogleFonts] = useState<GoogleFont[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFont, setSelectedFont] = useState<GoogleFont | null>(null);
  const [availableVariants, setAvailableVariants] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyLoaded, setApiKeyLoaded] = useState<boolean>(false);

  // Try to get the API key from environment variables
  const apiKey =
    typeof window !== "undefined"
      ? (window as any).___GATSBY_GOOGLE_FONTS_API_KEY ||
        process.env.GATSBY_GOOGLE_FONTS_API_KEY ||
        process.env.GOOGLE_FONTS_API_KEY
      : null;

  // Handle font family change
  const handleFontChange = (fontType: string, value: string) => {
    updateThemeValue(["fonts", fontType], value);
  };

  // Handle font size change
  const handleFontSizeChange = (sizeKey: string, value: string) => {
    updateThemeValue(["fontSizes", sizeKey], value);
  };

  // Handle font weight change
  const handleFontWeightChange = (weightKey: string, value: number) => {
    updateThemeValue(["fontWeights", weightKey], value);
  };

  // Handle letter spacing change
  const handleLetterSpacingChange = (spacingKey: string, value: string) => {
    updateThemeValue(["letterSpacings", spacingKey], value);
  };

  // Handle line height change
  const handleLineHeightChange = (
    lineHeightKey: string,
    value: string | number
  ) => {
    updateThemeValue(["lineHeights", lineHeightKey], value);
  };

  // Fetch Google Fonts with optional key parameter
  const fetchGoogleFonts = async (providedApiKey?: string) => {
    // Use provided API key or the one from environment variables
    const keyToUse = providedApiKey || apiKey;

    if (!keyToUse) {
      setError(
        "No Google Fonts API key found. Please add it to your .env file as GOOGLE_FONTS_API_KEY or provide it directly."
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${keyToUse}&sort=popularity`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch fonts");
      }
      const data: GoogleFontsResponse = await response.json();
      setGoogleFonts(data.items);
      setApiKeyLoaded(true); // Mark that we've successfully loaded fonts
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching Google Fonts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-load fonts if API key is available in environment variables
  useEffect(() => {
    if (apiKey && !apiKeyLoaded && !isLoading && googleFonts.length === 0) {
      fetchGoogleFonts();
    }
  }, [apiKey, apiKeyLoaded, isLoading, googleFonts.length]);

  // Select a Google Font
  const selectGoogleFont = (fontFamily: string) => {
    const font = googleFonts.find((f) => f.family === fontFamily);
    if (font) {
      setSelectedFont(font);
      setAvailableVariants(font.variants);

      // Load the font for preview only
      loadGoogleFont(font.family, font.variants);
    }
  };

  // Load Google Font
  const loadGoogleFont = (family: string, variants: string[]) => {
    const variantsStr = variants.join(",");
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${variantsStr}&display=swap`;
    link.rel = "stylesheet";

    // Remove existing font links for this font (to avoid duplicates)
    document.head
      .querySelectorAll(`link[href*="${family.replace(/ /g, "+")}"]`)
      .forEach((el) => el.remove());

    // Add the new link
    document.head.appendChild(link);
  };

  // Get numeric weight from variant
  const getNumericWeight = (variant: string): number => {
    // Handle variants like "regular", "italic", "700italic", etc.
    if (variant === "regular") return 400;
    if (variant === "italic") return 400;

    // Extract numeric part from variants like "700" or "700italic"
    const numericMatch = variant.match(/^(\d+)/);
    if (numericMatch) return parseInt(numericMatch[1], 10);

    return 400; // Default weight
  };

  // Sample text to preview fonts
  const sampleText = "The quick brown fox jumps over the lazy dog";
  const sampleParagraph =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  // Font sizes for preview
  const previewSizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"];

  return (
    <Box>
      <Text mb={6} fontSize="sm">
        Adjust typographic elements here.
      </Text>
      <Alert status="warning" mb={4}>
        <AlertIcon />
        <Text>
          This interface is incomplete and confusing. We connect to{" "}
          <Link href="https://fonts.google.com/" isExternal>
            Google Fonts <ExternalLinkIcon />
          </Link>
          , but to be perfectly honest, you might be a better off testing ideas
          on Google Fonts directly than trying to use this clunky interface.
        </Text>
      </Alert>
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Fonts
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack spacing={4} align="stretch">
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              {isLoading ? (
                <Flex justify="center" py={4}>
                  <Spinner />
                  <Text ml={3}>Loading Google Fonts...</Text>
                </Flex>
              ) : googleFonts.length > 0 ? (
                <>
                  <FormControl>
                    <FormLabel>Select Google Font</FormLabel>
                    <Select
                      placeholder="Choose a font family"
                      onChange={(e) =>
                        selectGoogleFont && selectGoogleFont(e.target.value)
                      }
                      value={selectedFont?.family || ""}
                    >
                      {googleFonts.map((font) => (
                        <option key={font.family} value={font.family}>
                          {font.family}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  {selectedFont && (
                    <Box mt={4}>
                      <Heading size="sm" mb={2}>
                        Font Preview: {selectedFont.family}
                      </Heading>

                      <Card variant="outline" mb={4}>
                        <CardBody>
                          <Heading
                            as="h3"
                            size="md"
                            mb={2}
                            fontFamily={`"${selectedFont.family}", ${
                              selectedFont.category === "serif"
                                ? "serif"
                                : selectedFont.category === "monospace"
                                  ? "monospace"
                                  : "sans-serif"
                            }`}
                          >
                            {selectedFont.family}
                          </Heading>

                          {/* Font weights preview */}
                          <Box mb={4}>
                            <Text fontSize="sm" color="gray.500" mb={2}>
                              Available Weights
                            </Text>
                            <SimpleGrid columns={[1, 2, 3]} spacing={3}>
                              {FONT_WEIGHT_VARIANTS.filter((variant) =>
                                availableVariants.some(
                                  (v) => getNumericWeight(v) === variant.value
                                )
                              ).map((weight) => (
                                <Text
                                  key={weight.value}
                                  fontFamily={`"${selectedFont.family}", ${
                                    selectedFont.category === "serif"
                                      ? "serif"
                                      : selectedFont.category === "monospace"
                                        ? "monospace"
                                        : "sans-serif"
                                  }`}
                                  fontWeight={weight.value}
                                >
                                  {weight.name} ({weight.value})
                                </Text>
                              ))}
                            </SimpleGrid>
                          </Box>

                          <Divider my={4} />

                          {/* Font sizes preview */}
                          <Box>
                            <Text fontSize="sm" color="gray.500" mb={2}>
                              Size Variations
                            </Text>
                            {previewSizes.map((size) => (
                              <Text
                                key={size}
                                fontSize={size}
                                fontFamily={`"${selectedFont.family}", ${
                                  selectedFont.category === "serif"
                                    ? "serif"
                                    : selectedFont.category === "monospace"
                                      ? "monospace"
                                      : "sans-serif"
                                }`}
                                mt={1}
                              >
                                {size}: {sampleText}
                              </Text>
                            ))}
                          </Box>

                          <Divider my={4} />

                          {/* Paragraph preview */}
                          <Box>
                            <Text fontSize="sm" color="gray.500" mb={2}>
                              Paragraph Preview
                            </Text>
                            <Text
                              fontFamily={`"${selectedFont.family}", ${
                                selectedFont.category === "serif"
                                  ? "serif"
                                  : selectedFont.category === "monospace"
                                    ? "monospace"
                                    : "sans-serif"
                              }`}
                            >
                              {sampleParagraph}
                            </Text>
                          </Box>
                        </CardBody>
                      </Card>

                      {/* Apply to Theme buttons */}
                      <Box mt={4}>
                        <Heading size="sm" mb={3}>
                          Apply Font to Theme
                        </Heading>
                        <HStack spacing={3} flexWrap="wrap">
                          <Button
                            colorScheme="blue"
                            onClick={() => {
                              // Apply to body font only
                              const fontValue = `"${selectedFont.family}", ${
                                selectedFont.category === "serif"
                                  ? "serif"
                                  : selectedFont.category === "monospace"
                                    ? "monospace"
                                    : "sans-serif"
                              }`;
                              handleFontChange("body", fontValue);
                            }}
                          >
                            Set as Body Font
                          </Button>
                          <Button
                            colorScheme="purple"
                            onClick={() => {
                              // Apply to heading font only
                              const fontValue = `"${selectedFont.family}", ${
                                selectedFont.category === "serif"
                                  ? "serif"
                                  : selectedFont.category === "monospace"
                                    ? "monospace"
                                    : "sans-serif"
                              }`;
                              handleFontChange("heading", fontValue);
                            }}
                          >
                            Set as Heading Font
                          </Button>
                          <Button
                            colorScheme="teal"
                            onClick={() => {
                              // Apply to mono font
                              const fontValue = `"${selectedFont.family}", ${
                                selectedFont.category === "monospace"
                                  ? "monospace"
                                  : "monospace"
                              }`;
                              handleFontChange("mono", fontValue);
                            }}
                            // Highlight if this is a monospace font
                            variant={
                              selectedFont.category === "monospace"
                                ? "solid"
                                : "outline"
                            }
                          >
                            Set as Mono Font{" "}
                            {selectedFont.category === "monospace" && "✓"}
                          </Button>
                        </HStack>
                      </Box>
                    </Box>
                  )}
                </>
              ) : (
                <Box>
                  <Text mb={4}>
                    No Google Fonts API key found in environment variables.
                    Please add a GOOGLE_FONTS_API_KEY entry to your .env file.
                  </Text>
                  <Alert status="info">
                    <AlertIcon />
                    <Box>
                      <Text fontWeight="bold">Quick setup instructions:</Text>
                      <Text>1. Create a .env file in the project root</Text>
                      <Text>
                        2. Add: GOOGLE_FONTS_API_KEY=your_api_key_here
                      </Text>
                      <Text>3. Restart the development server</Text>
                    </Box>
                  </Alert>
                </Box>
              )}
            </VStack>
          </AccordionPanel>
        </AccordionItem>

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
            <Box mb={4}>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  Object.entries(DEFAULT_FONT_FAMILIES).forEach(
                    ([fontType, fontValue]) => {
                      handleFontChange(fontType, fontValue);
                    }
                  );
                }}
              >
                Reset to Default Fonts
              </Button>
            </Box>

            <VStack spacing={5} align="stretch">
              {Object.entries(themeValues.fonts || {}).map(
                ([fontType, fontValue]) => (
                  <Box
                    key={fontType}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    boxShadow="sm"
                  >
                    <FormControl>
                      <FormLabel fontWeight="bold">{fontType} Font</FormLabel>
                      <Input
                        value={fontValue as string}
                        onChange={(e) =>
                          handleFontChange(fontType, e.target.value)
                        }
                        mb={3}
                      />
                      <Box p={3}>
                        {fontType === "mono" ? (
                          <Text fontFamily={fontValue as string} fontSize="md">
                            console.log("My theme", JSON.stringify(theme, null,
                            2));
                          </Text>
                        ) : (
                          <> </>
                        )}
                        {fontType === "body" ? (
                          <Text fontFamily={fontValue as string} fontSize="md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </Text>
                        ) : (
                          <> </>
                        )}
                        {fontType === "heading" ? (
                          <Heading
                            fontFamily={fontValue as string}
                            fontSize="md"
                          >
                            This is a Preview Heading
                          </Heading>
                        ) : (
                          <> </>
                        )}
                      </Box>
                    </FormControl>
                  </Box>
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
            <Box mb={4}>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  Object.entries(DEFAULT_FONT_SIZES).forEach(
                    ([sizeKey, sizeValue]) => {
                      handleFontSizeChange(sizeKey, sizeValue);
                    }
                  );
                }}
              >
                Reset to Default Sizes
              </Button>
            </Box>

            <VStack spacing={6} align="stretch">
              {Object.entries(themeValues.fontSizes || {})
                .sort(([aKey], [bKey]) => {
                  // Custom sort function to order font sizes properly (xs, sm, md, etc.)
                  const sizes = [
                    "xs",
                    "sm",
                    "md",
                    "lg",
                    "xl",
                    "2xl",
                    "3xl",
                    "4xl",
                    "5xl",
                    "6xl",
                    "7xl",
                    "8xl",
                    "9xl",
                  ];
                  return sizes.indexOf(aKey) - sizes.indexOf(bKey);
                })
                .map(([sizeKey, sizeValue]) => {
                  // Parse rem value for slider
                  let remValue = 1;
                  if (typeof sizeValue === "string") {
                    const match = sizeValue.toString().match(/([0-9.]+)rem/);
                    if (match && match[1]) {
                      remValue = parseFloat(match[1]);
                    }
                  }

                  return (
                    <Box
                      key={sizeKey}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      <HStack justify="space-between" mb={2}>
                        <FormLabel mb={0} fontSize="sm" fontWeight="bold">
                          {sizeKey}
                        </FormLabel>
                        <Input
                          value={sizeValue as string}
                          onChange={(e) =>
                            handleFontSizeChange(sizeKey, e.target.value)
                          }
                          size="sm"
                          width="100px"
                        />
                      </HStack>

                      <Slider
                        min={0.5}
                        max={8}
                        step={0.125}
                        value={remValue}
                        onChange={(val) =>
                          handleFontSizeChange(sizeKey, `${val}rem`)
                        }
                        mb={3}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>

                      <Box p={2} borderWidth="1px" borderRadius="md" mt={2}>
                        <Text fontSize={sizeValue as string}>
                          Sample text ({sizeKey})
                        </Text>
                      </Box>
                    </Box>
                  );
                })}
            </VStack>
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
            <Box mb={4}>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  Object.entries(DEFAULT_FONT_WEIGHTS).forEach(
                    ([weightKey, weightValue]) => {
                      handleFontWeightChange(weightKey, weightValue);
                    }
                  );
                }}
              >
                Reset to Default Weights
              </Button>
            </Box>

            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {Object.entries(themeValues.fontWeights || {})
                .sort(([aKey], [bKey]) => {
                  const weights = [
                    "hairline",
                    "thin",
                    "light",
                    "normal",
                    "medium",
                    "semibold",
                    "bold",
                    "extrabold",
                    "black",
                  ];
                  return weights.indexOf(aKey) - weights.indexOf(bKey);
                })
                .map(([weightKey, weightValue]) => (
                  <Box
                    key={weightKey}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    boxShadow="sm"
                  >
                    <FormControl>
                      <HStack justify="space-between" mb={2}>
                        <FormLabel mb={0} fontSize="sm" fontWeight="bold">
                          {weightKey}
                        </FormLabel>
                        <Input
                          type="number"
                          value={weightValue as number}
                          onChange={(e) =>
                            handleFontWeightChange(
                              weightKey,
                              parseInt(e.target.value)
                            )
                          }
                          size="sm"
                          width="80px"
                        />
                      </HStack>
                      <Box
                        p={2}
                        borderWidth="1px"
                        borderRadius="md"
                        borderStyle="dashed"
                        borderColor="gray.300"
                        mt={2}
                        bg="gray.50"
                      >
                        <Text fontWeight={weightValue as number}>
                          Sample text ({weightKey})
                        </Text>
                      </Box>
                    </FormControl>
                  </Box>
                ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Letter Spacing
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box mb={4}>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  Object.entries(DEFAULT_LETTER_SPACINGS).forEach(
                    ([spacingKey, spacingValue]) => {
                      handleLetterSpacingChange(spacingKey, spacingValue);
                    }
                  );
                }}
              >
                Reset to Default Letter Spacing
              </Button>
            </Box>

            <VStack spacing={6} align="stretch">
              {Object.entries(
                themeValues.letterSpacings || DEFAULT_LETTER_SPACINGS
              )
                .sort(([aKey], [bKey]) => {
                  const order = [
                    "tighter",
                    "tight",
                    "normal",
                    "wide",
                    "wider",
                    "widest",
                  ];
                  return order.indexOf(aKey) - order.indexOf(bKey);
                })
                .map(([spacingKey, spacingValue]) => {
                  // Parse em value for slider (convert from string like "-0.05em" to number like -0.05)
                  let emValue = 0;
                  if (typeof spacingValue === "string") {
                    const match = spacingValue
                      .toString()
                      .match(/([+-]?[0-9.]+)em/);
                    if (match && match[1]) {
                      emValue = parseFloat(match[1]);
                    }
                  }

                  return (
                    <Box
                      key={spacingKey}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      <HStack justify="space-between" mb={2}>
                        <FormLabel mb={0} fontSize="sm" fontWeight="bold">
                          {spacingKey}
                        </FormLabel>
                        <Input
                          value={spacingValue as string}
                          onChange={(e) =>
                            handleLetterSpacingChange(
                              spacingKey,
                              e.target.value
                            )
                          }
                          size="sm"
                          width="100px"
                        />
                      </HStack>

                      <Slider
                        min={-0.1}
                        max={0.2}
                        step={0.005}
                        value={emValue}
                        onChange={(val) =>
                          handleLetterSpacingChange(spacingKey, `${val}em`)
                        }
                        mb={3}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>

                      <Box
                        p={2}
                        borderWidth="1px"
                        borderRadius="md"
                        borderStyle="dashed"
                        borderColor="gray.300"
                        mt={2}
                      >
                        <Text letterSpacing={spacingValue as string}>
                          {sampleText} ({spacingKey})
                        </Text>
                      </Box>
                    </Box>
                  );
                })}
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Line Heights
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box mb={4}>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  Object.entries(DEFAULT_LINE_HEIGHTS).forEach(
                    ([lineHeightKey, lineHeightValue]) => {
                      handleLineHeightChange(lineHeightKey, lineHeightValue);
                    }
                  );
                }}
              >
                Reset to Default Line Heights
              </Button>
            </Box>

            <VStack spacing={6} align="stretch">
              {Object.entries(themeValues.lineHeights || DEFAULT_LINE_HEIGHTS)
                .sort(([aKey], [bKey]) => {
                  const order = [
                    "none",
                    "normal",
                    "shorter",
                    "short",
                    "base",
                    "tall",
                    "taller",
                  ];
                  return order.indexOf(aKey) - order.indexOf(bKey);
                })
                .map(([lineHeightKey, lineHeightValue]) => {
                  // Parse numeric value for slider
                  let numValue =
                    typeof lineHeightValue === "number"
                      ? lineHeightValue
                      : lineHeightValue === "normal"
                        ? 1.5
                        : 1.5; // Default value for slider

                  return (
                    <Box
                      key={lineHeightKey}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      <HStack justify="space-between" mb={2}>
                        <FormLabel mb={0} fontSize="sm" fontWeight="bold">
                          {lineHeightKey}
                        </FormLabel>
                        <Input
                          value={lineHeightValue as string | number}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            handleLineHeightChange(
                              lineHeightKey,
                              newValue === "normal"
                                ? "normal"
                                : parseFloat(newValue)
                            );
                          }}
                          size="sm"
                          width="100px"
                        />
                      </HStack>

                      {lineHeightKey !== "normal" && (
                        <Slider
                          min={1}
                          max={3}
                          step={0.05}
                          value={numValue}
                          onChange={(val) =>
                            handleLineHeightChange(lineHeightKey, val)
                          }
                          mb={3}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      )}

                      <Box
                        p={2}
                        borderWidth="1px"
                        borderRadius="md"
                        borderStyle="dashed"
                        borderColor="gray.300"
                        mt={2}
                        bg="gray.50"
                      >
                        <Text lineHeight={lineHeightValue as string | number}>
                          {sampleText}
                          <br />
                          {sampleText}
                          <br />
                          {sampleText}
                          <Text fontSize="sm" mt={1} color="gray.600">
                            ({lineHeightKey})
                          </Text>
                        </Text>
                      </Box>
                    </Box>
                  );
                })}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default TypographyTab;
