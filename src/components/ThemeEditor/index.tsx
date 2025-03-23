import React, { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';

// Import tabs
import ColorManagementTab from './tabs/ColorManagementTab';
import TypographyTab from './tabs/TypographyTab';
import SpacingTab from './tabs/SpacingTab';
import BordersAndShadowsTab from './tabs/BordersAndShadowsTab';
import ComponentsPreviewTab from './tabs/ComponentsPreviewTab';

// Import context provider
import { ThemeProvider } from '@/context/ThemeContext';

export const ThemeEditor: React.FC = () => {
  // UI state
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  // Setup UI styling
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <ThemeProvider>
      <Box
        p={5}
        borderWidth="1px"
        bg={bgColor}
        borderColor={borderColor}
      >
        <Tabs 
          isFitted 
          variant="line" 
          index={activeTabIndex} 
          onChange={setActiveTabIndex}
        >
          <TabList mb="1em">
            <Tab>Colors</Tab>
            <Tab>Typography</Tab>
            <Tab>Spacing</Tab>
            <Tab>Borders & Shadows</Tab>
            <Tab>Your Theme</Tab>
          </TabList>

          <TabPanels>
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

            {/* Components Preview Tab */}
            <TabPanel>
              <ComponentsPreviewTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ThemeProvider>
  );
};

export default ThemeEditor;