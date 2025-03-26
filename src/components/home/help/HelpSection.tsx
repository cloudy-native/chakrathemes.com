import React from "react";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import QuickStartTab from "./QuickStartTab";
import DeepDiveTab from "./DeepDiveTab";
import ColorScienceTab from "./ColorScienceTab";

const HelpSection: React.FC = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} bg={useColorModeValue("white", "gray.800")}>
      <VStack spacing={8} align="stretch">
        <Tabs colorScheme="blue">
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
