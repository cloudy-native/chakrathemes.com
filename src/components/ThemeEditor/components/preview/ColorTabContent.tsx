import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ThemeValues } from "@/types";
import { ColorPalette, ComponentPreview } from ".";
import { useAnalytics } from "@/hooks/useAnalytics";

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
        const componentTypes = ["palette", "basics"];
        trackTab(`component-${componentTypes[index]}`);
      }}
    >
      <TabList>
        <Tab>Color Palette</Tab>
        <Tab>Basics</Tab>
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
          <ComponentPreview colorKey={colorKey} themeValues={themeValues} id="basics-tab" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ColorTabContent;
