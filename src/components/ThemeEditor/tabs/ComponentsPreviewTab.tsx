import { useThemeContext } from "@/context/ThemeContext";
import { isLightColor } from "@/utils/colorUtils";
import { ArrowForwardIcon, ExternalLinkIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Link,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  extendTheme,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  CardLayouts,
  ColorPalette,
  ComponentPreview,
  NuclearDashboard,
  TableLayouts,
} from "../components/preview";

export const ComponentsPreviewTab: React.FC = () => {
  const { themeValues } = useThemeContext();

  // Generate a preview theme based on current values
  const previewTheme = extendTheme(themeValues);

  // Use the first color palette as the primary color
  const colorKeys = Object.keys(themeValues.colors || {});

  // Tab state management
  const [colorTabIndex, setColorTabIndex] = useState(0);
  const [componentTabIndex, setComponentTabIndex] = useState(0);

  // Clipboard functionality
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);

    // Reset after 2 seconds
    setTimeout(() => {
      setCopiedValue(null);
    }, 2000);
  };

  // Download theme as a file
  const downloadTheme = () => {
    try {
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

  return (
    <Box>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={2} colSpan={4}>
          <Text mb={4} fontSize="sm">
            Select a color below to preview how the theme will look in your application. Start with
            Color Palette and Basics. There are also styled samples of Cards, Tables, and a
            magnificently over-engineered Nuclear Power Station Dashboard. Make sure to drill down
            and explore all the variations.{" "}
          </Text>
          <Text mb={4} fontSize="sm">
            When you're ready, download the theme and add it to your project. Review{" "}
            <Link href="https://v2.chakra-ui.com/docs/styled-system/customize-theme" isExternal>
              Customize Theme <ExternalLinkIcon />
            </Link>{" "}
            in the ChakraUI documentation for details.
          </Text>
        </GridItem>
        <GridItem>
          <Flex align="flex-end">
            <Spacer />
            <Button
              colorScheme="green"
              onClick={downloadTheme}
              leftIcon={<ArrowForwardIcon />}
              mb={4}
            >
              Download Theme
            </Button>
          </Flex>
        </GridItem>
      </Grid>

      <ChakraProvider theme={previewTheme}>
        {/* Theme Code Buttons */}

        {/* Full-width Color Palette Cards Section */}
        <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" width="100%">
          <Text fontSize={"sm"} mb={4}>
            <InfoIcon /> Add more colors in the 'Colors' tab above and select them here.
          </Text>

          <Tabs isLazy index={colorTabIndex} onChange={setColorTabIndex}>
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
            <TabPanels mt={4}>
              {colorKeys.map(colorKey => (
                <TabPanel key={colorKey} p={0}>
                  <Tabs isLazy isFitted index={componentTabIndex} onChange={setComponentTabIndex}>
                    <TabList>
                      <Tab>Color Palette</Tab>
                      <Tab>Basics</Tab>
                      <Tab>Cards</Tab>
                      <Tab>Tables</Tab>
                      <Tab>Power Station</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <ColorPalette
                          colorKey={colorKey}
                          themeValues={themeValues}
                          copiedValue={copiedValue}
                          onCopy={handleCopyToClipboard}
                        />
                      </TabPanel>
                      <TabPanel>
                        <ComponentPreview colorKey={colorKey} themeValues={themeValues} />
                      </TabPanel>
                      <TabPanel>
                        <CardLayouts colorKey={colorKey} themeValues={themeValues} />
                      </TabPanel>
                      <TabPanel>
                        <TableLayouts colorKey={colorKey} themeValues={themeValues} />
                      </TabPanel>
                      <TabPanel>
                        <NuclearDashboard colorKey={colorKey} themeValues={themeValues} />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
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
