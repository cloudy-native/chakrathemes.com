import { useThemeContext } from "@/context/ThemeContext";
import { isLightColor } from "@/utils/colorUtils";
import {
  Box,
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  extendTheme,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ColorTabContent, ThemeDownloader } from "@/components/ThemeEditor/components/preview";

export const ComponentsPreviewTab: React.FC = () => {
  const { themeValues } = useThemeContext();
  const { trackTab } = useAnalytics();

  // Generate a preview theme based on current values
  const previewTheme = extendTheme(themeValues);

  // Use the first color palette as the primary color
  const colorKeys = Object.keys(themeValues.colors || {});

  // Tab state management
  const [colorTabIndex, setColorTabIndex] = useState(0);
  const [componentTabIndex, setComponentTabIndex] = useState(0);

  return (
    <Box>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={2} colSpan={4}>
          <Text mb={6} fontSize="sm">
            Preview how your theme will look with real UI components. Your palette names control
            which colors are used - &quot;primary&quot; for buttons and accents,
            &quot;background&quot; for surface colors, and &quot;accent&quot; for highlighting
            elements.
          </Text>
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <ThemeDownloader themeValues={themeValues} />
        </GridItem>
      </Grid>

      <ChakraProvider theme={previewTheme}>
        {/* Full-width Color Palette Cards Section */}
        <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" width="100%">
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
            <TabList flexWrap="wrap">
              {colorKeys.map(colorKey => (
                // Determine text color based on background color luminance
                <Tab
                  key={colorKey}
                  color={
                    themeValues.colors[colorKey][500] &&
                    isLightColor(themeValues.colors[colorKey][500])
                      ? "gray.800"
                      : "white"
                  }
                  bg={themeValues.colors[colorKey][500] || `#666666`}
                  _selected={{
                    color:
                      themeValues.colors[colorKey][500] &&
                      isLightColor(themeValues.colors[colorKey][500])
                        ? "gray.800"
                        : "white",
                    bg: themeValues.colors[colorKey][500] || `#666666`,
                    fontWeight: "extrabold",
                    transform: "translateY(-4px)",
                  }}
                  mb={2}
                  mr={2}
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
