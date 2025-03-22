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
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { ThemeValues } from "../hooks/useColorManagement";

interface TypographyTabProps {
  themeValues: ThemeValues;
  handleFontChange: (fontType: string, value: string) => void;
  handleFontSizeChange: (sizeKey: string, value: string) => void;
  handleFontWeightChange: (weightKey: string, value: number) => void;
  // Added props from useTypographyManagement
  fetchGoogleFonts?: (apiKey: string) => Promise<void>;
  selectGoogleFont?: (fontFamily: string) => void;
  googleFonts?: { family: string; variants: string[]; category: string }[];
  isLoading?: boolean;
  selectedFont?: {
    family: string;
    variants: string[];
    category: string;
  } | null;
  availableVariants?: string[];
  getNumericWeight?: (variant: string) => number;
  error?: string | null;
  FONT_WEIGHT_VARIANTS?: { name: string; value: number }[];
}

export const TypographyTab: React.FC<TypographyTabProps> = ({
  themeValues,
  handleFontChange,
  handleFontSizeChange,
  handleFontWeightChange,
  fetchGoogleFonts,
  selectGoogleFont,
  googleFonts = [],
  isLoading = false,
  selectedFont = null,
  availableVariants = [],
  getNumericWeight = () => 400,
  error = null,
  FONT_WEIGHT_VARIANTS = [],
}) => {
  // Sample text to preview fonts
  const sampleText = "The quick brown fox jumps over the lazy dog";
  const sampleParagraph =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  // Font sizes for preview
  const previewSizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"];

  return (
    <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Google Fonts
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

                    {/* Apply to Theme button */}
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        // Apply to both body and heading fonts
                        const fontValue = `"${selectedFont.family}", ${
                          selectedFont.category === "serif"
                            ? "serif"
                            : selectedFont.category === "monospace"
                              ? "monospace"
                              : "sans-serif"
                        }`;
                        handleFontChange("body", fontValue);
                        handleFontChange("heading", fontValue);
                      }}
                    >
                      Apply to All Theme Fonts
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <Box>
                <Text mb={4}>
                  No Google Fonts API key found in environment variables. Please
                  add a GOOGLE_FONTS_API_KEY entry to your .env file.
                </Text>
                <Alert status="info">
                  <AlertIcon />
                  <Box>
                    <Text fontWeight="bold">Quick setup instructions:</Text>
                    <Text>1. Create a .env file in the project root</Text>
                    <Text>2. Add: GOOGLE_FONTS_API_KEY=your_api_key_here</Text>
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
          <VStack spacing={4} align="stretch">
            {Object.entries(themeValues.fonts || {}).map(
              ([fontType, fontValue]) => (
                <FormControl key={fontType}>
                  <FormLabel>{fontType}</FormLabel>
                  <Input
                    value={fontValue as string}
                    onChange={(e) => handleFontChange(fontType, e.target.value)}
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
                      handleFontWeightChange(
                        weightKey,
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
  );
};

export default TypographyTab;
