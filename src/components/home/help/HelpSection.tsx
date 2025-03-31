import {
  Box,
  Text,
  Heading,
  Icon,
  useColorModeValue,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import React from "react";
import { BookOpen, Palette, Zap } from "lucide-react";
import ColorScienceTab from "./ColorScienceTab";
import DeepDiveTab from "./DeepDiveTab";
import QuickStartTab from "./QuickStartTab";

interface TabData {
  name: string;
  icon: React.ElementType;
  description: string;
}

const tabData: TabData[] = [
  {
    name: "Quick Start",
    icon: Zap,
    description: "Get up and running with our theme editor in minutes",
  },
  {
    name: "Deeper Dive",
    icon: BookOpen,
    description: "Understand the advanced features for perfect themes",
  },
  {
    name: "Color Science",
    icon: Palette,
    description: "Learn about color theory behind theme design",
  },
];

const HelpSection: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  // Color values
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "white");

  return (
    <Box borderRadius="xl" boxShadow="xl">
      <Tabs
        orientation="vertical"
        variant="line"
        colorScheme="blue"
        isLazy
        index={tabIndex}
        onChange={setTabIndex}
      >
        <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} bg={cardBg}>
          {/* Sidebar navigation */}
          <GridItem
            borderRightWidth={{ base: 0, lg: "1px" }}
            borderColor={borderColor}
            bg={useColorModeValue("gray.50", "gray.900")}
          >
            <Box p={6}>
              <Heading size="md" color={headingColor} mb={2}>
                Designer&apos;s Guide
              </Heading>
              <Text color={textColor} mb={6}>
                Master the art of theme creation with our comprehensive guide
              </Text>

              {/* Tab List */}
              <TabList border="none">
                {tabData.map(tab => (
                  <Tab key={tab.name} justifyContent="flex-start" textAlign="left" py={3}>
                    <Icon as={tab.icon} mr={3} boxSize={5} />
                    <Box>
                      <Text fontWeight="medium">{tab.name}</Text>
                      <Text fontSize="xs" display={{ base: "none", md: "block" }} color={textColor}>
                        {tab.description}
                      </Text>
                    </Box>
                  </Tab>
                ))}
              </TabList>
            </Box>
          </GridItem>

          {/* Content area */}
          <GridItem p={{ base: 4, md: 6 }}>
            <TabPanels>
              <TabPanel p={0}>
                <QuickStartTab />
              </TabPanel>
              <TabPanel p={0}>
                <DeepDiveTab />
              </TabPanel>
              <TabPanel p={0}>
                <ColorScienceTab />
              </TabPanel>
            </TabPanels>
          </GridItem>
        </Grid>
      </Tabs>
    </Box>
  );
};

export default HelpSection;
