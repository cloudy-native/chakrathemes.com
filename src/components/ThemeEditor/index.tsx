import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  useBreakpointValue,
  TabProps,
} from "@chakra-ui/react";

// Import tabs
import ColorManagementTab from "./tabs/ColorManagementTab";
import TypographyTab from "./tabs/TypographyTab";
import SpacingTab from "./tabs/SpacingTab";
import BordersAndShadowsTab from "./tabs/BordersAndShadowsTab";
import ComponentsPreviewTab from "./tabs/ComponentsPreviewTab";

// Import context provider
import { ThemeProvider } from "@/context/ThemeContext";

export const ThemeEditor: React.FC = () => {
  // UI state
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Setup UI styling
  // Get primary color from ThemeContext for tabs and container
  const primaryColor = "primary";
  const bgColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue(`${primaryColor}.50`, `${primaryColor}.900`);
  const tabOrientation = useBreakpointValue({
    base: "vertical",
    md: "horizontal",
  }) as "horizontal" | "vertical" | undefined;

  return (
    <ThemeProvider>
      <Box p={5} borderWidth="1px" bg={bgColor} borderColor={borderColor}>
        <Tabs
          isLazy
          orientation={tabOrientation}
          isFitted
          index={activeTabIndex}
          onChange={setActiveTabIndex}
        >
          <TabList mb="1em">
            <Tab>Theme Preview</Tab>
            <Tab>Colors</Tab>
            <Tab>Typography</Tab>
            <Tab>Spacing</Tab>
            <Tab>Borders & Shadows</Tab>
          </TabList>

          <TabPanels>
            {/* Components Preview Tab */}
            <TabPanel>
              <ComponentsPreviewTab />
            </TabPanel>

            {/* Unified Color Management Tab */}
            <TabPanel>
              <ColorManagementTab />
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
