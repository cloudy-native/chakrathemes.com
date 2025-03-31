import { useThemeContext } from "@/context/ThemeContext";
import { EventCategory, trackEvent } from "@/utils/analytics";
import { FontCombination } from "@/types";
import { getBodyFonts, getHeadingFonts, getMonoFonts } from "@/utils/typographyUtils";
import { FontSelector } from "../components";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ChevronRight, ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
import FontPreview from "../components/FontPreview";
import GoogleFontsLoader from "../components/GoogleFontsLoader";
import { fontCategories } from "@/utils/curatedFonts"; // Import the new data structure

export const TypographyTab: React.FC = () => {
  const { themeValues, updateFont, setFontCombination } = useThemeContext();

  // Default to the first fonts if not set yet
  const [headingFont, setHeadingFont] = useState(
    themeValues.fonts?.heading?.split(",")[0].replace(/['"]/g, "") || "Open Sans"
  );
  const [bodyFont, setBodyFont] = useState(
    themeValues.fonts?.body?.split(",")[0].replace(/['"]/g, "") || "Open Sans"
  );
  const [monoFont, setMonoFont] = useState(
    themeValues.fonts?.mono?.split(",")[0].replace(/['"]/g, "") || "Roboto Mono"
  );

  const [selectedCombination, setSelectedCombination] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  // Keep track of which combination was last selected and mode
  const [customizationMode, setCustomizationMode] = useState<"curated" | "custom">("curated");

  useEffect(() => {
    let matchingCombination: FontCombination | undefined;
    for (const category of fontCategories) {
      matchingCombination = category.combinations.find(
        combo => combo.heading === headingFont && combo.body === bodyFont && combo.mono === monoFont
      );
      if (matchingCombination) {
        setSelectedCategory(category.name);
        setCustomizationMode("curated");
        break;
      }
    }

    if (!matchingCombination && (selectedCombination || selectedCategory)) {
      setCustomizationMode("custom");
    }

    setSelectedCombination(matchingCombination?.name);
  }, [headingFont, bodyFont, monoFont, selectedCombination, selectedCategory]);

  // Handle font selection
  const handleHeadingFontChange = (font: string) => {
    setHeadingFont(font);
    updateFont("heading", font);
    setCustomizationMode("custom");
    trackEvent(EventCategory.TYPOGRAPHY, "change_heading_font", font);
  };

  const handleBodyFontChange = (font: string) => {
    setBodyFont(font);
    updateFont("body", font);
    setCustomizationMode("custom");
    trackEvent(EventCategory.TYPOGRAPHY, "change_body_font", font);
  };

  const handleMonoFontChange = (font: string) => {
    setMonoFont(font);
    updateFont("mono", font);
    setCustomizationMode("custom");
    trackEvent(EventCategory.TYPOGRAPHY, "change_mono_font", font);
  };

  // Handle combination selection
  const handleCombinationSelect = (combo: FontCombination, categoryName: string) => {
    setHeadingFont(combo.heading);
    setBodyFont(combo.body);
    setMonoFont(combo.mono);
    setFontCombination(combo);
    setSelectedCombination(combo.name);
    setSelectedCategory(categoryName);
    setCustomizationMode("curated");
    trackEvent(EventCategory.TYPOGRAPHY, "select_font_combination", combo.name);
  };

  const subtleColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box>
      {/* Header section with intro text */}
      <Grid templateColumns="repeat(5, 1fr)" gap={4} mb={6}>
        <GridItem rowSpan={2} colSpan={4}>
          <Text fontSize="sm">
            Typography defines the reading experience in your theme. Choose font pairs for headings
            and body text that complement each other and reflect your design style.
          </Text>
        </GridItem>
        <GridItem>
          <Flex justify="right" mb={2}>
            <Link href="https://fonts.google.com" isExternal fontSize="sm" color="primary.500">
              Browse Google Fonts <Icon as={ExternalLink} boxSize={3} ml="1" />
            </Link>
          </Flex>
        </GridItem>
      </Grid>

      {/* Load Google Fonts */}
      <GoogleFontsLoader headingFont={headingFont} bodyFont={bodyFont} monoFont={monoFont} />

      {/* Main content area */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Left Column - Font Selection */}
        <Box>
          {/* Selection Mode Toggle */}
          <Box mb={4}>
            <Flex borderBottom="1px solid" borderColor="gray.200" mb={4}>
              <Box
                as="button"
                py={2}
                px={4}
                borderBottom={customizationMode === "curated" ? "2px solid" : "none"}
                borderColor="primary.500"
                color={customizationMode === "curated" ? "primary.500" : "gray.600"}
                fontWeight={customizationMode === "curated" ? "semibold" : "normal"}
                onClick={() => setCustomizationMode("curated")}
              >
                Curated Combinations
              </Box>
              <Box
                as="button"
                py={2}
                px={4}
                borderBottom={customizationMode === "custom" ? "2px solid" : "none"}
                borderColor="primary.500"
                color={customizationMode === "custom" ? "primary.500" : "gray.600"}
                fontWeight={customizationMode === "custom" ? "semibold" : "normal"}
                onClick={() => setCustomizationMode("custom")}
              >
                Custom Fonts
              </Box>
            </Flex>
          </Box>

          {customizationMode === "curated" ? (
            /* Curated Font Combinations */
            <VStack spacing={4} align="stretch">
              {fontCategories.map(category => (
                <Card key={category.name} variant="outline" mb={4}>
                  <CardHeader pb={0}>
                    <Heading size="sm">{category.name}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text fontSize="sm" mb={4} color={subtleColor}>
                      {category.description}
                    </Text>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3}>
                      {category.combinations.map(combo => {
                        const isSelected = selectedCombination === combo.name;
                        return (
                          <Button
                            key={combo.name}
                            onClick={() => handleCombinationSelect(combo, category.name)}
                            variant={isSelected ? "solid" : "outline"}
                            colorScheme={isSelected ? "primary" : "gray"}
                            justifyContent="space-between"
                            width="100%"
                            p={3}
                            rightIcon={isSelected ? <ChevronRight size={16} /> : undefined}
                            fontWeight={isSelected ? "bold" : "normal"}
                            size="sm"
                          >
                            {combo.name}
                          </Button>
                        );
                      })}
                    </SimpleGrid>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          ) : (
            /* Custom Font Selection */
            <Card variant="outline">
              <CardHeader>
                <Heading size="sm">Custom Font Selection</Heading>
              </CardHeader>
              <CardBody>
                <Stack spacing={6}>
                  <FontSelector
                    label="Heading Font"
                    description="Used for titles and headings throughout your site"
                    fonts={getHeadingFonts()}
                    selectedFont={headingFont}
                    onChange={handleHeadingFontChange}
                    previewText="Main Heading Example"
                  />

                  <FontSelector
                    label="Body Font"
                    description="Used for paragraphs and general text content"
                    fonts={getBodyFonts()}
                    selectedFont={bodyFont}
                    onChange={handleBodyFontChange}
                  />

                  <FontSelector
                    label="Monospace Font"
                    description="Used for code blocks and technical content"
                    fonts={getMonoFonts()}
                    selectedFont={monoFont}
                    onChange={handleMonoFontChange}
                    previewText="function example() { return 'Hello'; }"
                  />
                </Stack>
              </CardBody>
            </Card>
          )}
        </Box>

        {/* Right Column - Live Preview */}
        <Box>
          <Card variant="outline" height="100%">
            <CardHeader>
              <Flex justify="space-between" align="center">
                <Heading size="sm">
                  Live Preview
                  {selectedCombination && (
                    <Badge ml={2} colorScheme="primary" fontSize="xs">
                      {selectedCombination}
                    </Badge>
                  )}
                </Heading>
                {customizationMode === "custom" && (
                  <Badge colorScheme="primary" variant="subtle">
                    Custom Selection
                  </Badge>
                )}
              </Flex>
            </CardHeader>
            <CardBody>
              <FontPreview headingFont={headingFont} bodyFont={bodyFont} monoFont={monoFont} />
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>

      <Divider my={6} />

      <Text fontSize="sm" color="gray.500">
        These fonts are loaded from Google Fonts. To use them in your project, you&apos;ll need to
        add them to your theme configuration. Check the{" "}
        <Link
          href="https://v2.chakra-ui.com/community/recipes/using-fonts"
          isExternal
          color="primary.500"
        >
          Chakra UI documentation <Icon as={ExternalLink} boxSize={3} />
        </Link>{" "}
        for more details.
      </Text>
    </Box>
  );
};

export default TypographyTab;
