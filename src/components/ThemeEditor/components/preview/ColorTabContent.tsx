import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Box, SimpleGrid } from "@chakra-ui/react";
import { ThemeValues } from "@/types";
import { ColorPalette } from ".";
import { useAnalytics } from "@/hooks/useAnalytics";
import ButtonStyles from "./ButtonStyles";
import BorderElements from "./BorderElements";
import ShadowElements from "./ShadowElements";
import BasicElements from "./BasicElements";
import InputElements from "./InputElements";
import InteractiveElements from "./InteractiveElements";
import AlertElements from "./AlertElements";
import ProgressElements from "./ProgressElements";
import AvatarElements from "./AvatarElements";

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

  const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

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
        <Tab>Color Palette</Tab>
        <Tab>Visual Elements</Tab>
        <Tab>User Controls</Tab>
        <Tab>Feedback & Display</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ColorPalette
            colorKey={colorKey}
            themeValues={themeValues}
            onCopy={handleCopyToClipboard}
          />
        </TabPanel>
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
