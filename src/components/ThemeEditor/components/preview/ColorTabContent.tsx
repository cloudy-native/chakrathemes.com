import { useAnalytics } from "@/hooks/useAnalytics";
import { ThemeValues } from "@/types";
import { Box, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import AlertElements from "./AlertElements";
import AvatarElements from "./AvatarElements";
import BasicElements from "./BasicElements";
import BorderElements from "./BorderElements";
import ButtonStyles from "./ButtonStyles";
import InputElements from "./InputElements";
import InteractiveElements from "./InteractiveElements";
import ProgressElements from "./ProgressElements";
import ShadowElements from "./ShadowElements";

interface ColorTabContentProps {
  colorKey: string;
  themeValues: ThemeValues;
  componentTabIndex: number;
  setComponentTabIndex: (index: number) => void;
}

/**
 * Component tab content for a specific color
 */
export const ColorTabContent: React.FC<ColorTabContentProps> = ({
  colorKey,
  themeValues,
  componentTabIndex,
  setComponentTabIndex,
}) => {
  const { trackTab } = useAnalytics();

  return (
    <Tabs
      isLazy
      isFitted
      index={componentTabIndex}
      onChange={index => {
        setComponentTabIndex(index);
        const componentTypes = ["palette", "visual-elements", "user-controls", "feedback-display"];
        trackTab(`component-${componentTypes[index]}`);
      }}
    >
      <TabList>
        {/* <Tab>Color Palette</Tab> */}
        <Tab>Visual Elements</Tab>
        <Tab>User Controls</Tab>
        <Tab>Feedback & Display</Tab>
      </TabList>
      <TabPanels>
        {/* <TabPanel>
          <ColorPalette
            colorKey={colorKey}
            themeValues={themeValues}
            onCopy={handleCopyToClipboard}
          />
        </TabPanel> */}
        <TabPanel>
          <Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
              <ButtonStyles colorKey={colorKey} />
              <BorderElements themeValues={themeValues} colorKey={colorKey} />
              <ShadowElements themeValues={themeValues} colorKey={colorKey} />
            </SimpleGrid>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
              <BasicElements colorKey={colorKey} />
              <InputElements colorKey={colorKey} />
              <InteractiveElements colorKey={colorKey} />
            </SimpleGrid>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <AlertElements colorKey={colorKey} />
              <ProgressElements colorKey={colorKey} />
              <AvatarElements colorKey={colorKey} />
            </SimpleGrid>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ColorTabContent;
