import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
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
    <Tabs isLazy isFitted index={activeTabIndex} onChange={setActiveTabIndex}>
      <TabList mb="1em">
        <Tab>Palettes</Tab>
        <Tab>Typography</Tab>
        <Tab>Spacing</Tab>
        <Tab>Borders & Shadows</Tab>
        <Tab>Preview & Download</Tab>
      </TabList>

      <TabPanels>
        {/* Palette Management Tab */}
        <TabPanel>
          <PaletteManagementTab />
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

        {/* Components Preview Tab */}
        <TabPanel>
          <ComponentsPreviewTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
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
      <Box p={5} borderWidth="1px">
        <ChooseUI />
      </Box>
    </ThemeProvider>
  );
};

export default ThemeEditor;
