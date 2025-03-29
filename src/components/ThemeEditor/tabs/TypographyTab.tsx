import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Badge,
  Link,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { useThemeContext } from "@/context/ThemeContext";
import FontSelector from "../components/FontSelector";
import FontCombinationSelector from "../components/FontCombinationSelector";
import FontPreview from "../components/FontPreview";
import GoogleFontsLoader from "../components/GoogleFontsLoader";
import {
  fontCombinations,
  getHeadingFonts,
  getBodyFonts,
  getMonoFonts,
} from "@/utils/typographyUtils";
import { EventCategory, trackEvent } from "@/utils/analytics";

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

  // Keep track of which combination was last selected
  useEffect(() => {
    const matchingCombination = fontCombinations.find(
      combo => combo.heading === headingFont && combo.body === bodyFont && combo.mono === monoFont
    );

    setSelectedCombination(matchingCombination?.name);
  }, [headingFont, bodyFont, monoFont]);

  // Handle font selection
  const handleHeadingFontChange = (font: string) => {
    setHeadingFont(font);
    updateFont("heading", font);
    trackEvent(EventCategory.TYPOGRAPHY, "change_heading_font", font);
  };

  const handleBodyFontChange = (font: string) => {
    setBodyFont(font);
    updateFont("body", font);
    trackEvent(EventCategory.TYPOGRAPHY, "change_body_font", font);
  };

  const handleMonoFontChange = (font: string) => {
    setMonoFont(font);
    updateFont("mono", font);
    trackEvent(EventCategory.TYPOGRAPHY, "change_mono_font", font);
  };

  // Handle combination selection
  const handleCombinationSelect = (combo: any) => {
    setHeadingFont(combo.heading);
    setBodyFont(combo.body);
    setMonoFont(combo.mono);
    setFontCombination(combo);
    setSelectedCombination(combo.name);
  };

  return (
    <Box>
      {/* Load Google Fonts */}
      <GoogleFontsLoader headingFont={headingFont} bodyFont={bodyFont} monoFont={monoFont} />

      <Tabs isLazy variant="enclosed">
        <TabList mb={4}>
          <Tab>Curated Combinations</Tab>
          <Tab>Custom Selection</Tab>
          <Tab>Preview</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text mb={4}>
              Choose from our curated font combinations for different brand styles and design needs.
              Each combination pairs complementary heading, body, and monospace fonts.
            </Text>

            <FontCombinationSelector
              combinations={fontCombinations}
              onSelect={handleCombinationSelect}
              selectedCombination={selectedCombination}
            />
          </TabPanel>

          <TabPanel>
            <Text mb={4}>
              Customize your typography by selecting individual fonts for headings, body text, and
              code.
            </Text>

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
              previewText="function example() { return 'Hello world'; }"
            />
          </TabPanel>

          <TabPanel>
            <Text mb={4}>Preview how your selected fonts will look together in real content.</Text>

            <Flex justify="space-between" align="center" mb={4}>
              <Box>
                <Text fontWeight="medium">
                  Current Selection
                  {selectedCombination && (
                    <Badge ml={2} colorScheme="blue">
                      {selectedCombination}
                    </Badge>
                  )}
                </Text>
              </Box>
              <Link
                href="https://fonts.google.com"
                isExternal
                textDecoration="underline"
                fontSize="sm"
              >
                View on Google Fonts <Icon as={ExternalLink} boxSize={3} />
              </Link>
            </Flex>

            <FontPreview headingFont={headingFont} bodyFont={bodyFont} monoFont={monoFont} />

            <Divider my={6} />

            <Text fontSize="sm" color="gray.500">
              These fonts are loaded from Google Fonts. To use them in your project, you'll need to
              add them to your theme configuration. Check the{" "}
              <Link
                href="https://chakra-ui.com/docs/styled-system/theming/theme"
                isExternal
                textDecoration="underline"
              >
                Chakra UI theming documentation <Icon as={ExternalLink} boxSize={3} />
              </Link>{" "}
              for more details.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TypographyTab;
