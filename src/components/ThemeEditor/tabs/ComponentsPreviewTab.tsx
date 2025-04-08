import { useThemeContext } from "@/context/ThemeContext";
import { isLightColor } from "@/utils/colorUtils";
import {
  textPrimary,
  backgroundLight,
  borderLight,
  textHeading,
  textSecondary,
} from "@/theme/themeConfiguration";
import {
  Box,
  ChakraProvider,
  Divider,
  Grid,
  GridItem,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  extendTheme,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ColorTabContent } from "@/components/ThemeEditor/components/preview";

export const ComponentsPreviewTab: React.FC = () => {
  const { themeValues } = useThemeContext();
  const { trackTab } = useAnalytics();

  // Pre-compute color mode values to avoid hook rule violations
  const borderLightColor = useColorModeValue(borderLight.light, borderLight.dark);
  const backgroundLightColor = useColorModeValue(backgroundLight.light, backgroundLight.dark);
  const textHeadingColor = useColorModeValue(textHeading.light, textHeading.dark);
  const textSecondaryColor = useColorModeValue(textSecondary.light, textSecondary.dark);

  // Generate a preview theme based on current values
  const previewTheme = extendTheme(themeValues);

  // Use the first color palette as the primary color
  const colorKeys = Object.keys(themeValues.colors || {});

  // Tab state management
  const [colorTabIndex, setColorTabIndex] = useState(0);
  const [componentTabIndex, setComponentTabIndex] = useState(0);

  return (
    <Box>
      <Divider mb={6} />
      <Heading as="h3" size="md" mb={4}>
        Live Theme Preview
      </Heading>
      <Grid templateColumns="repeat(1, 1fr)" gap={4}>
        <GridItem>
          <Text mb={6} fontSize="sm" color={useColorModeValue(textPrimary.light, textPrimary.dark)}>
            {" "}
            Preview how your theme will look with real UI components. Your palette names control
            which colors are used. <strong>primary</strong> for buttons, <strong>secondary</strong>{" "}
            for selective UI contrast, <strong>background</strong> for surface colors, and{" "}
            <strong>accent</strong> for highlighting elements.{" "}
          </Text>
        </GridItem>
      </Grid>

      <ChakraProvider theme={previewTheme}>
        {/* Full-width Color Palette Cards Section */}
        <Box
          p={{ base: 3, md: 5 }}
          borderWidth="1px"
          borderColor={borderLightColor}
          borderRadius="lg"
          boxShadow="md"
          width="100%"
          bg={backgroundLightColor}
          overflowX="hidden"
        >
          {colorKeys.length === 0 && (
            <Box
              textAlign="center"
              p={6}
              borderWidth="2px"
              borderColor={borderLightColor}
              borderRadius="md"
              mb={4}
            >
              <Text fontSize="lg" fontWeight="bold" mb={2} color={textHeadingColor}>
                No color palettes found
              </Text>
              <Text fontSize="sm" color={textSecondaryColor}>
                Go to the &quot;Palettes&quot; tab and add a primary, secondary, accent, or
                background palette. Then come back here to see it in action.
              </Text>
            </Box>
          )}
          <Tabs
            isLazy
            index={colorTabIndex}
            onChange={index => {
              setColorTabIndex(index);
              const selectedColor = colorKeys[index];
              trackTab(`color-${selectedColor}`);
            }}
          >
            {/* Color tabs */}
            <TabList flexWrap="wrap" maxW="100%" overflowX="auto">
              {colorKeys.map(colorKey => (
                // Determine text color based on background color luminance
                <Tab
                  key={colorKey}
                  color={
                    themeValues.colors[colorKey][500] &&
                    isLightColor(themeValues.colors[colorKey][500])
                      ? textHeading.light
                      : "white"
                  }
                  bg={themeValues.colors[colorKey][500] || `#666666`}
                  _selected={{
                    color:
                      themeValues.colors[colorKey][500] &&
                      isLightColor(themeValues.colors[colorKey][500])
                        ? textHeading.light
                        : "white",
                    bg: themeValues.colors[colorKey][500] || `#666666`,
                    fontWeight: "extrabold",
                    transform: "translateY(-4px)",
                    boxShadow: "md",
                  }}
                  mb={2}
                  mr={2}
                  fontSize={{ base: "sm", md: "md" }}
                  py={{ base: 1, md: 2 }}
                  px={{ base: 2, md: 3 }}
                  borderRadius="md"
                >
                  {colorKey}
                </Tab>
              ))}
            </TabList>

            {/* Content panels for each color */}
            <TabPanels mt={4}>
              {colorKeys.map(colorKey => (
                <TabPanel key={colorKey} p={0}>
                  <ColorTabContent
                    colorKey={colorKey}
                    themeValues={themeValues}
                    componentTabIndex={componentTabIndex}
                    setComponentTabIndex={setComponentTabIndex}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </ChakraProvider>
    </Box>
  );
};

export default ComponentsPreviewTab;
