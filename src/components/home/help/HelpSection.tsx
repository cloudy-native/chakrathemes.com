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
import { textHeading, backgroundLight, textSecondary } from "@/theme/themeConfiguration";
import React from "react";
import { BookOpen, Palette, Zap } from "lucide-react";
import ColorScienceTab from "./ColorScienceTab";
import DeepDiveTab from "./DeepDiveTab";
import QuickStartTab from "./QuickStartTab";

/**
 * TabData Interface
 *
 * Defines the structure for each tab in the HelpSection.
 *
 * @param {string} name - The name of the tab.
 * @param {React.ElementType} icon - The icon to display for the tab.
 * @param {string} description - A brief description of the tab's content.
 */
interface TabData {
  name: string;
  icon: React.ElementType;
  description: string;
}

/**
 * tabData Array
 *
 * An array of TabData objects defining the tabs in the HelpSection.
 */
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

/**
 * HelpSection Component
 *
 * This component provides a tabbed interface for accessing different help sections,
 * including Quick Start, Deeper Dive, and Color Science.
 */
const HelpSection: React.FC = () => {
  // State to manage the currently active tab index.
  const [tabIndex, setTabIndex] = React.useState(0);

  // Color values for the component, dynamically adjusted based on the color mode.
  const cardBg = useColorModeValue(backgroundLight.light, backgroundLight.dark);
  const textColor = useColorModeValue(textSecondary.light, textSecondary.dark);
  const headingColor = useColorModeValue(textHeading.light, textHeading.dark);

  return (
    // Main container for the HelpSection with rounded corners and a shadow.
    <Box borderRadius="xl" boxShadow="xl">
      {/* Chakra UI Tabs component for creating the tabbed interface. */}
      <Tabs
        orientation="vertical"
        variant="line"
        colorScheme="blue"
        isLazy // Enables lazy loading of tab content.
        index={tabIndex} // Controls the active tab.
        onChange={setTabIndex} // Callback to update the active tab index.
      >
        {/* Grid layout for the sidebar and content area. */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} bg={cardBg}>
          {/* Sidebar navigation */}
          <GridItem
            borderRightWidth={{ base: 0, lg: "1px" }} // Add a border on the right for larger screens.
            bg={useColorModeValue(backgroundLight.light, backgroundLight.dark)} // Set background based on color mode.
          >
            {/* Sidebar content */}
            <Box p={6}>
              {/* Sidebar heading */}
              <Heading size="md" color={headingColor} mb={2}>
                Designer&apos;s Guide
              </Heading>
              {/* Sidebar description */}
              <Text color={textColor} mb={6}>
                Master the art of theme creation with our comprehensive guide
              </Text>

              {/* Tab List */}
              <TabList border="none">
                {/* Map through the tabData array to create each tab. */}
                {tabData.map(tab => (
                  <Tab key={tab.name} justifyContent="flex-start" textAlign="left" py={3}>
                    {/* Tab icon */}
                    <Icon as={tab.icon} mr={3} boxSize={5} />
                    {/* Tab text and description */}
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
            {/* Tab Panels */}
            <TabPanels>
              {/* Quick Start Tab Panel */}
              <TabPanel p={0}>
                <QuickStartTab />
              </TabPanel>
              {/* Deep Dive Tab Panel */}
              <TabPanel p={0}>
                <DeepDiveTab />
              </TabPanel>
              {/* Color Science Tab Panel */}
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
