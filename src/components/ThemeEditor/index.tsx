import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
  Flex,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { accentColor } from "@/theme/themeConfiguration";
import React, { useState, useEffect } from "react";

// Import tabs
import BordersAndShadowsTab from "./tabs/BordersAndShadowsTab";
import ComponentsPreviewTab from "./tabs/ComponentsPreviewTab";
import PaletteManagementTab from "./tabs/PaletteManagementTab";
import SpacingTab from "./tabs/SpacingTab";
import TypographyTab from "./tabs/TypographyTab";

// Import context provider and utils
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import { urlParamsToTheme } from "@/utils/urlThemeUtils";
import ShareThemeButton from "./components/ShareThemeButton";
import { ThemeDownloader } from "./components/preview";

const Desktop = () => {
  const { themeValues } = useThemeContext();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <Box id="theme-editor-section">
      {/* Action buttons at the top */}
      <Flex justifyContent="flex-end" mb={4} gap={2}>
        <ThemeDownloader themeValues={themeValues} />
        <ShareThemeButton variant="button" size="sm" label="Share" />
      </Flex>
      <Divider mb={4} />

      <Tabs isLazy isFitted index={activeTabIndex} onChange={setActiveTabIndex}>
        <TabList>
          <Tab>Palettes</Tab>
          <Tab>Typography</Tab>
          <Tab>Spacing</Tab>
          <Tab>Borders & Shadows</Tab>
          <Tab position="relative">
            Preview Theme
            <Box
              position="absolute"
              top="-8px"
              right="20px"
              bg={useColorModeValue(accentColor.light, accentColor.dark)}
              color="white"
              fontSize="md"
              fontWeight="bold"
              px={2}
              py={0.5}
              borderRadius="full"
              boxShadow="md"
              zIndex={1}
            >
              NEW
            </Box>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PaletteManagementTab />
          </TabPanel>

          <TabPanel>
            <TypographyTab />
          </TabPanel>

          <TabPanel>
            <SpacingTab />
          </TabPanel>

          <TabPanel>
            <BordersAndShadowsTab />
          </TabPanel>

          <TabPanel>
            <ComponentsPreviewTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const Mobile = () => {
  const { themeValues } = useThemeContext();

  return (
    <Box>
      {/* Action buttons at the top for mobile */}
      <Flex justifyContent="center" mb={4} gap={2}>
        <ThemeDownloader themeValues={themeValues} />
        <ShareThemeButton variant="button" size="sm" label="Share" />
      </Flex>
      <Divider mb={4} />

      <PaletteManagementTab />
    </Box>
  );
};

const ChooseUI = () => {
  const compactScreen = useBreakpointValue({ base: true, md: false });

  return compactScreen ? <Mobile /> : <Desktop />;
};

export const ThemeEditor: React.FC = () => {
  // Accessing ThemeContext would be handled inside ThemeURLHandler
  return (
    <ThemeProvider>
      <ThemeURLHandler>
        <Box p={5} borderWidth="0px">
          <ChooseUI />
        </Box>
      </ThemeURLHandler>
    </ThemeProvider>
  );
};

// Component to handle URL parameters for themes
const ThemeURLHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setThemeValues } = useThemeContext();

  // Parse URL parameters when the component mounts
  useEffect(() => {
    // In Next.js, we need to use window.location in client-side code
    if (typeof window !== "undefined") {
      // Get URL search params
      const searchParams = new URLSearchParams(window.location.search);

      // Convert to a key/value record for our utility function
      const queryParams: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });

      // Only apply theme if there are actually parameters to process
      if (Object.keys(queryParams).length > 0) {
        const themeFromUrl = urlParamsToTheme(queryParams);
        setThemeValues(themeFromUrl);
      }
    }
  }, [setThemeValues]);

  return <>{children}</>;
};

export default ThemeEditor;
