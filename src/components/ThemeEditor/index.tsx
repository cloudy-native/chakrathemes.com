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

const Desktop = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <Box id="theme-editor-section">
      <Tabs isLazy isFitted index={activeTabIndex} onChange={setActiveTabIndex}>
        <TabList>
          <Tab>Palettes</Tab>
          <Tab>Typography</Tab>
          <Tab>Spacing</Tab>
          <Tab>Borders & Shadows</Tab>
          <Tab>Preview & Download</Tab>
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
  return <PaletteManagementTab />;
};

const ChooseUI = () => {
  const compactScreen = useBreakpointValue({ base: true, md: false });

  return compactScreen ? <Mobile /> : <Desktop />;
};

export const ThemeEditor: React.FC = () => {
  return (
    <ThemeProvider>
      <Box p={5} borderWidth="0px">
        <ChooseUI />
      </Box>
    </ThemeProvider>
  );
};

export default ThemeEditor;
