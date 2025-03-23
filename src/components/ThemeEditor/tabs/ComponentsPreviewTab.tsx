import { ArrowForwardIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  extendTheme,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ColorPalette, ComponentPreview } from "../components/preview";
import { useThemeContext } from "../../../context/ThemeContext";

export const ComponentsPreviewTab: React.FC = () => {
  const { themeValues } = useThemeContext();

  // Generate a preview theme based on current values
  const previewTheme = extendTheme(themeValues);

  // Use the first color palette as the primary color
  const colorKeys = Object.keys(themeValues.colors || {});
  
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
      <ChakraProvider theme={previewTheme}>
        {/* Theme Code Buttons */}
        <Button
          colorScheme="green"
          onClick={downloadTheme}
          leftIcon={<ArrowForwardIcon />}
          mb={4}
        >
          Download Theme
        </Button>

        {/* Full-width Color Palette Cards Section */}
        <Box
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          width="100%"
        >
          <Heading size="md" mb={4}>
            Theme Colors
          </Heading>
          <Tabs variant="line" isLazy>
            <TabList flexWrap="wrap">
              {colorKeys.map((colorKey) => (
                <Tab
                  key={colorKey}
                  color="white"
                  bg={themeValues.colors[colorKey][500]}
                  _selected={{
                    color: "white",
                    bg: themeValues.colors[colorKey][700],
                    boxShadow: "md",
                  }}
                  mb={2}
                  mr={2}
                >
                  {colorKey}
                </Tab>
              ))}
            </TabList>
            <TabPanels mt={4}>
              {colorKeys.map((colorKey) => (
                <TabPanel key={colorKey} p={0}>
                  <Tabs variant="line" isLazy>
                    <TabList>
                      <Tab>Color Palette</Tab>
                      <Tab>Components</Tab>
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
                        <ComponentPreview 
                          colorKey={colorKey} 
                          themeValues={themeValues} 
                        />
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