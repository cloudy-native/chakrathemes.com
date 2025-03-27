import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";

// Import tabs
import BordersAndShadowsTab from "./tabs/BordersAndShadowsTab";
import ComponentsPreviewTab from "./tabs/ComponentsPreviewTab";
import PaletteManagementTab from "./tabs/PaletteManagementTab";
import SpacingTab from "./tabs/SpacingTab";
import TypographyTab from "./tabs/TypographyTab";

// Import context provider
import { ThemeProvider } from "@/context/ThemeContext";

export const ThemeEditor: React.FC = () => {
  // UI state
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Setup UI styling
  // Get primary color from ThemeContext for tabs and container
  const tabOrientation = useBreakpointValue({
    base: "vertical",
    md: "horizontal",
  }) as "horizontal" | "vertical" | undefined;

  return (
    <ThemeProvider>
      <Box p={5} borderWidth="1px">
        <Tabs
          isLazy
          orientation={tabOrientation}
          isFitted
          index={activeTabIndex}
          onChange={setActiveTabIndex}
        >
          <TabList mb="1em">
            <Tab>Palettes</Tab>
            <Tab>Theme Preview</Tab>
            <Tab>Typography</Tab>
            <Tab>Spacing</Tab>
            <Tab>Borders & Shadows</Tab>
          </TabList>

          <TabPanels>
            {/* Palette Management Tab */}
            <TabPanel>
              <PaletteManagementTab />
            </TabPanel>

            {/* Components Preview Tab */}
            <TabPanel>
              <ComponentsPreviewTab />
            </TabPanel>

            {/* Typography Tab */}
            <TabPanel>
              <TypographyTab />
            </TabPanel>

            {/* Spacing Tab */}
            <TabPanel>
              <SpacingTab />
            </TabPanel>

            {/* Borders & Shadows Tab */}
            <TabPanel>
              <BordersAndShadowsTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ThemeProvider>
  );
};

export default ThemeEditor;
