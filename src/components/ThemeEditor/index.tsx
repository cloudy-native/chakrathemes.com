import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Info } from "lucide-react";
import React, { useState } from "react";

// Import tabs
import BordersAndShadowsTab from "./tabs/BordersAndShadowsTab";
import ComponentsPreviewTab from "./tabs/ComponentsPreviewTab";
import PaletteManagementTab from "./tabs/PaletteManagementTab";
import SpacingTab from "./tabs/SpacingTab";
import TypographyTab from "./tabs/TypographyTab";

// Import context provider
import { ThemeProvider } from "@/context/ThemeContext";

const HelpSection = () => {
  return (
    <Alert status="info" mb={4} borderRadius={"md"}>
      <Text fontSize="sm">
        Work left to right. Add colors in the <strong>Palettes</strong> tab from a color picker, an
        image, or curated color inspiration. Name your palettes "primary", "secondary", "accent",
        and "background" if you want the preview tab to use them. Select fonts in the{" "}
        <strong>Typography</strong> tab. Change <strong>Spacing</strong> and{" "}
        <strong>Borders & Shadows</strong> if you need, but the defaults are plenty good enough. Now{" "}
        <strong>Preview & Download </strong> your theme using your colors and fonts.{" "}
      </Text>
    </Alert>
  );
};

const Desktop = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <Box>
      <HelpSection />
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
      <Box p={5} borderWidth="1px">
        <ChooseUI />
      </Box>
    </ThemeProvider>
  );
};

export default ThemeEditor;
