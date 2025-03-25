import React, { useState } from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ThemeValues } from "@/types";
import { ColorPalette, ComponentPreview, CardLayouts, TableLayouts } from ".";
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
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const { trackTab } = useAnalytics();

  const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);

    // Reset after 2 seconds
    setTimeout(() => {
      setCopiedValue(null);
    }, 2000);
  };

  return (
    <Tabs
      isLazy
      isFitted
      index={componentTabIndex}
      onChange={index => {
        setComponentTabIndex(index);
        const componentTypes = ["palette", "basics", "cards", "tables"];
        trackTab(`component-${componentTypes[index]}`);
      }}
    >
      <TabList>
        <Tab>Color Palette</Tab>
        <Tab>Basics</Tab>
        <Tab>Cards</Tab>
        <Tab>Tables</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ColorPalette
            colorKey={colorKey}
            themeValues={themeValues}
            copiedValue={copiedValue}
            onCopy={handleCopyToClipboard}
          />
        </TabPanel>
        <TabPanel>
          <ComponentPreview colorKey={colorKey} themeValues={themeValues} id="basics-tab" />
        </TabPanel>
        <TabPanel>
          <CardLayouts colorKey={colorKey} themeValues={themeValues} />
        </TabPanel>
        <TabPanel>
          <TableLayouts colorKey={colorKey} themeValues={themeValues} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ColorTabContent;
