import {
  Box,
  Divider,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PaletteActionsContainer } from "./components/palette";
import { StepTab } from "./components/ui";

// Import tabs
import ComponentsPreviewTab from "./tabs/ComponentsPreviewTab";
import PaletteManagementTab from "./tabs/PaletteManagementTab";
import TypographyTab from "./tabs/TypographyTab";

// Import components for preview
import { ThemeDownloader } from "./components/preview";

// Import context provider and utils
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import { urlParamsToTheme } from "@/utils/urlThemeUtils";
import { Eye, Palette, Type } from "lucide-react";

const Desktop = () => {
  const { themeValues } = useThemeContext();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <Box id="theme-editor-section">
      {/* All actions in one row now managed by PaletteActionButtons */}
      <Box mb={4}>
        <PaletteActionsContainer onNavigateToPreview={() => setActiveTabIndex(2)} />
      </Box>
      <Divider mb={4} />

      <Tabs isLazy isFitted index={activeTabIndex} onChange={setActiveTabIndex}>
        <Box mb={8} overflow="visible" px={2} py={3}>
          {/* TabList without all the extra containers */}
          <TabList width="100%" border="none">
            <StepTab
              step={1}
              title="Palettes"
              description="Choose colors"
              isActive={activeTabIndex === 0}
              isCompleted={activeTabIndex > 0}
              icon={Palette}
              showArrow={true}
            />

            <StepTab
              step={2}
              title="Typography"
              description="Select fonts"
              isActive={activeTabIndex === 1}
              isCompleted={activeTabIndex > 1}
              icon={Type}
              showArrow={true}
            />

            <StepTab
              step={3}
              title="Preview your theme"
              description="See it in action!"
              isActive={activeTabIndex === 2}
              icon={Eye}
              isCompleted={activeTabIndex > 2}
            />
          </TabList>
        </Box>

        <TabPanels>
          <TabPanel>
            <PaletteManagementTab />
          </TabPanel>

          <TabPanel>
            <TypographyTab />
          </TabPanel>

          <TabPanel>
            <ComponentsPreviewTab />
            <Flex justifyContent="flex-end" mt={6}>
              <ThemeDownloader themeValues={themeValues} size="lg" />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const Mobile = () => {
  return (
    <Box>
      {/* Actions for mobile view - now managed by PaletteActionButtons */}
      <Box mb={4}>
        <PaletteActionsContainer />
      </Box>
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
