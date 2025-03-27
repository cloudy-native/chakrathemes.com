import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import React from "react";
import ColorScienceTab from "./ColorScienceTab";
import DeepDiveTab from "./DeepDiveTab";
import QuickStartTab from "./QuickStartTab";

const HelpSection: React.FC = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <VStack spacing={8} align="stretch">
        <Tabs>
          <TabList>
            <Tab>Quick Start</Tab>
            <Tab>Deep Dive</Tab>
            <Tab>Color Science</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <QuickStartTab />
            </TabPanel>

            <TabPanel>
              <DeepDiveTab />
            </TabPanel>

            <TabPanel>
              <ColorScienceTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default HelpSection;
